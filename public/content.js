if (window.location.hostname.includes("chess.com")) {
  function highlightMovesOnBoard(moves, side) {
    const parent = document.querySelector("wc-chess-board");
    if (!parent) return;

    const squareSize = parent.offsetWidth / 8;
    const maxMoves = 5;
    const colors = ["blue", "green", "yellow", "orange", "red"];

    parent.querySelectorAll(".customH").forEach((el) => el.remove());

    function squareToPosition(square) {
      const fileChar = square[0];
      const rankChar = square[1];
      const rank = parseInt(rankChar, 10) - 1;

      let file;
      if (side === "w") {
        // Blancs : a=0 ... h=7
        file = fileChar.charCodeAt(0) - "a".charCodeAt(0);
        // rang inversé : 7 - rank pour que 8 soit en haut
        const y = (7 - rank) * squareSize;
        const x = file * squareSize;
        return { x, y };
      } else {
        // Noirs : h=0 ... a=7
        file = "h".charCodeAt(0) - fileChar.charCodeAt(0); // inversion de la colonne
        // rang normal : 0 en haut (1) vers 7 en bas (8)
        const y = rank * squareSize;
        const x = file * squareSize;
        return { x, y };
      }
    }

    function drawSquare(square, color, score) {
      const pos = squareToPosition(square);
      const el = document.createElement("p");
      el.className = "customH";
      el.style.border = `solid ${color} 3px`;
      el.style.width = `${squareSize}px`;
      el.style.height = `${squareSize}px`;
      el.style.position = "absolute";
      el.style.left = `${pos.x}px`;
      el.style.top = `${pos.y}px`;
      el.style.pointerEvents = "none";
      el.style.boxSizing = "border-box";
      el.style.margin = "0";
      el.style.fontSize = "10px";
      el.style.color = color;
      el.style.display = "flex";
      el.style.justifyContent = "flex-end";
      el.style.alignItems = "flex-end";
      el.style.padding = "2px";
      el.style.fontWeight = "bold";
      el.textContent = score !== undefined ? score : "";
      parent.appendChild(el);
    }

    parent.style.position = "relative";

    moves.slice(0, maxMoves).forEach((move, index) => {
      const color = colors[index] || "red";
      drawSquare(move.from, color, move.score);
      drawSquare(move.to, color, move.score);
    });
  }

  function clearHighlightSquares() {
    const parent = document.querySelector("wc-chess-board");
    if (!parent) return;

    parent.querySelectorAll(".customH").forEach((el) => el.remove());
  }

  function getSide() {
    const coord = document.querySelector(".coordinate-light");
    if (!coord) return "w";

    const value = coord.innerHTML;
    if (value === "1") return "black";
    if (value === "8") return "white";
    return "w";
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
    if (moves && moves.length > 0) {
      try {
        chrome.runtime.sendMessage({ movelist: moves, side: getSide() });
      } catch (error) {
        // console.log(error)
      }
    } else {
      // console.error("No position defined");
    }
  }

  setInterval(() => {
    console.log("Sending moves");
    try {
      sendMessage();
    } catch (error) {
      //   console.log(error);
    }
  }, 500);

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message.moves);
    clearHighlightSquares();
    const moves = message.moves;
    highlightMovesOnBoard(moves, getSide()[0]);
  });
} else {
  console.log("ChessCom Only.");
}
