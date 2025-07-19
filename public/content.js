function getSide() {
  const coord = document.querySelector(".coordinate-light");
  if (!coord) return "none";

  const value = coord.innerHTML;
  if (value === "1") return "black";
  if (value === "8") return "white";
  return "none";
}

function generateFEN() {
  const pieceElements = document.querySelectorAll(".piece");

  if (pieceElements.length === 0) {
    return "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  }

  const boardArray = Array(8).fill(null).map(() => Array(8).fill(""));

  const pieceMap = {
    wp: "P", wr: "R", wn: "N", wb: "B", wq: "Q", wk: "K",
    bp: "p", br: "r", bn: "n", bb: "b", bq: "q", bk: "k",
  };

  pieceElements.forEach((piece) => {
    const classList = piece.className.split(" ");
    const pieceClass = classList.find(c => /^(w|b)[prnbqk]$/.test(c));
    const squareClass = classList.find(c => /^square-\d{2}$/.test(c));

    if (pieceClass && squareClass) {
      const square = squareClass.split("-")[1];
      const file = parseInt(square[0], 10) - 1;
      const rank = 8 - parseInt(square[1], 10);
      boardArray[rank][file] = pieceMap[pieceClass];
    }
  });

  const fenRows = boardArray.map((row) => {
    let fenRow = "";
    let empty = 0;
    for (const cell of row) {
      if (cell === "") {
        empty++;
      } else {
        if (empty > 0) {
          fenRow += empty;
          empty = 0;
        }
        fenRow += cell;
      }
    }
    if (empty > 0) fenRow += empty;
    return fenRow;
  });

  const position = fenRows.join("/");
  const turn = getSide()[0];
  return `${position} ${turn} - - 0 1`;
}

function sendMessage() {
  if (window.location.href.includes("chess.com")) {
    chrome.runtime.sendMessage({
      fen: generateFEN(),
      side: getSide(),
    });
  }
}

function observeChessBoard() {
  const board = document.querySelector("wc-chess-board");
  if (!board) {
    console.log("⛔ Chess board (wc-chess-board) not found.");
    return;
  }

  sendMessage();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
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

  console.log("♟️ MutationObserver started on <wc-chess-board>.");
}

// ✅ attendre que le DOM contienne le board
function waitForBoardAndObserve() {
  const checkInterval = setInterval(() => {
    const board = document.querySelector("wc-chess-board");
    if (board) {
      clearInterval(checkInterval);
      observeChessBoard();
    }
  }, 100);
}

if (window.location.hostname.includes("chess.com")) {
  waitForBoardAndObserve();
} else {
  console.log("Not on chess.com.");
}
