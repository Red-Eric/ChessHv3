function getSide() {
  const coord = document.querySelector(".coordinate-light");
  if (!coord) return "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

  const value = coord.innerHTML;
  if (value === "1") return "black";
  if (value === "8") return "white";
  return "none";
}
function generateFEN() {
  const pieceElements = document.querySelectorAll(".piece");
  const boardArray = Array(8).fill(null).map(() => Array(8).fill(""));

  const pieceMap = {
    wp: "P", wr: "R", wn: "N", wb: "B", wq: "Q", wk: "K",
    bp: "p", br: "r", bn: "n", bb: "b", bq: "q", bk: "k",
  };

  pieceElements.forEach((piece) => {
    const classes = piece.className.split(" ");
    const pieceClass = classes.find(c => /^w[prnbqk]$/.test(c) || /^b[prnbqk]$/.test(c));
    const squareClass = classes.find(c => /^square-\d{2}$/.test(c));

    if (pieceClass && squareClass) {
      const square = squareClass.split("-")[1];
      const file = parseInt(square[0]) - 1;
      const rank = 8 - parseInt(square[1]);
      boardArray[rank][file] = pieceMap[pieceClass];
    }
  });

  const fenRows = boardArray.map((row) => {
    let fenRow = "", emptyCount = 0;
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
  const activeColor = getSide()[0];
  return `${fenPosition} ${activeColor} - - 0 1`;
}

function sendMessage() {
  if (window.location.href.includes("chess.com")) {
    chrome.runtime.sendMessage({ fen: generateFEN(), side: getSide() });
  }
}

if (window.location.hostname.includes("chess.com")) {
  const board = document.querySelector("#board-primary");

  if (board) {
    sendMessage();
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList" || mutation.type === "attributes") {
          sendMessage();
          break;
        }
      }
    });

    observer.observe(board, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    console.log("♟️ MutationObserver started on chess board.");
  } else {
    console.log("⛔ Board element not found.");
  }
} else {
  console.log("Not on chess.com.");
}
