function getActiveColor() {
  const el = document.querySelector(".cc-coach-feedback-detail-text");
  if (!el) return "w";
  return el.textContent.includes("Black") ? "b" : "w";
}

function generateFEN() {
  const pieceElements = document.querySelectorAll(".piece");
  const boardArray = Array(8)
    .fill(null)
    .map(() => Array(8).fill(""));

  const pieceMap = {
    wp: "P",
    wr: "R",
    wn: "N",
    wb: "B",
    wq: "Q",
    wk: "K",
    bp: "p",
    br: "r",
    bn: "n",
    bb: "b",
    bq: "q",
    bk: "k",
  };

  pieceElements.forEach((piece) => {
    const classes = piece.className.split(" ");
    const pieceClass = classes.find(
      (c) => /^w[prnbqk]$/.test(c) || /^b[prnbqk]$/.test(c)
    );
    const squareClass = classes.find((c) => /^square-\d{2}$/.test(c));

    if (pieceClass && squareClass) {
      const square = squareClass.split("-")[1];
      const file = parseInt(square[0]) - 1;
      const rank = 8 - parseInt(square[1]);
      boardArray[rank][file] = pieceMap[pieceClass];
    }
  });

  const fenRows = boardArray.map((row) => {
    let fenRow = "";
    let emptyCount = 0;
    for (const cell of row) {
      if (cell === "") {
        emptyCount++;
      } else {
        if (emptyCount > 0) {
          fenRow += emptyCount;
          emptyCount = 0;
        }
        fenRow += cell;
      }
    }
    if (emptyCount > 0) fenRow += emptyCount;
    return fenRow;
  });

  const fenPosition = fenRows.join("/");
  const activeColor = getActiveColor(); // Assumption
  const castling = "KQkq"; // Could be improved
  const enPassant = "-"; // Could be calculated
  const halfmoveClock = "0"; // Assumption
  const fullmoveNumber = "1"; // Assumption

  return `${fenPosition} ${activeColor} ${castling} ${enPassant} ${halfmoveClock} ${fullmoveNumber}`;
}

function getSide() {
  const coord = document.querySelector(".coordinate-light");
  if (!coord) return "none";

  const value = coord.innerHTML;
  if (value === "1") return "black";
  if (value === "8") return "white";
  return "none";
}

function getMovelist() {
  let movelist = [];
  document.querySelectorAll("div.node").forEach((e) => {
    movelist.push(e.innerText.replaceAll(" ", ""));
  });
  return movelist;
}

function sendMessage() {
  let moves = getMovelist();
  if (moves && moves.length > 0 && window.location.href.includes("game")) {
    chrome.runtime.sendMessage({ movelist: moves, side: getSide() });
    console.log("partie")
  } 
  if(window.location.href.includes("puzzles")){
    chrome.runtime.sendMessage({ fen: generateFEN(), side: getSide() });
    console.log("puzzle")
    console.log(generateFEN())
    console.log(getSide())
  }
//   else {
//     console.error("No position defined");
//   }
}

if (window.location.hostname.includes("chess.com")) {
  setInterval(() => {
    console.log("Sending moves");
    try {
      sendMessage();
    } catch (error) {
      console.log(error);
    }
  }, 500);
} else {
  console.log("Not here hehe.");
}
