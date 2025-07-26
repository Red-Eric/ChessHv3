alert("Hello 😄");
alert(
  "Classement des couleurs (du meilleur au pire) :\n" +
    "💙 Bleu\n" +
    "💚 Vert\n" +
    "💛 Jaune\n" +
    "🧡 Orange\n" +
    "❤️ Rouge"
);
alert("Don't win every match, if you wanna get banned ⚠️🚫");
alert("Sometimes lose voluntarily, like 40% of the time 🤷‍♂️🎯");

if (window.location.hostname.includes("chess.com")) {

  function getSide() {
    const board = document.querySelector("wc-chess-board");
    if (!board) return "w";
    return board.getAttribute("orientation") === "black" ? "w" : "b";
  }

  function squareToCoord(square, side, squareSize) {
    const file = square.charCodeAt(0) - "a".charCodeAt(0);
    const rank = parseInt(square[1], 10) - 1;

    if (side === "b") {
      return {
        x: (7 - file) * squareSize + squareSize / 2,
        y: rank * squareSize + squareSize / 2,
      };
    } else {

      return {
        x: file * squareSize + squareSize / 2,
        y: (7 - rank) * squareSize + squareSize / 2,
      };
    }
  }

  function drawArrow(from, to, color, score, side, parent, squareSize) {
    const { x: x1, y: y1 } = squareToCoord(from, side, squareSize);
    const { x: x2, y: y2 } = squareToCoord(to, side, squareSize);

    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);

    const shorten = squareSize * 0.3; 

    const x2s = x2 - (dx / length) * shorten;
    const y2s = y2 - (dy / length) * shorten;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("customH");
    Object.assign(svg.style, {
      position: "absolute",
      left: "0",
      top: "0",
      width: `${parent.offsetWidth}px`,
      height: `${parent.offsetHeight}px`,
      pointerEvents: "none",
      overflow: "visible",
    });


    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
    marker.setAttribute("id", `arrowhead-${color}`);
    marker.setAttribute("markerWidth", "6");
    marker.setAttribute("markerHeight", "6");
    marker.setAttribute("refX", "0");
    marker.setAttribute("refY", "1.5");
    marker.setAttribute("orient", "auto");
    marker.setAttribute("markerUnits", "strokeWidth");

    const arrowPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arrowPath.setAttribute("d", "M0,0 L3,1.5 L0,3 Z");
    arrowPath.setAttribute("fill", color);
    arrowPath.setAttribute("fill-opacity", "0.6");

    marker.appendChild(arrowPath);
    defs.appendChild(marker);
    svg.appendChild(defs);

    const arrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
    arrow.setAttribute("x1", x1);
    arrow.setAttribute("y1", y1);
    arrow.setAttribute("x2", x2s);
    arrow.setAttribute("y2", y2s);
    arrow.setAttribute("stroke", color);
    arrow.setAttribute("stroke-width", "10");
    arrow.setAttribute("stroke-opacity", "0.6");
    arrow.setAttribute("marker-end", `url(#arrowhead-${color})`);
    svg.appendChild(arrow);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x2s + 5);
    text.setAttribute("y", y2s - 5);
    text.setAttribute("fill", color);
    text.setAttribute("font-size", "14");
    text.setAttribute("font-weight", "bold");
    text.setAttribute("fill-opacity", "0.6");
    text.textContent = score;
    svg.appendChild(text);

    parent.appendChild(svg);
  }


  function clearHighlightSquares() {
    const parent = document.querySelector("wc-chess-board");
    if (!parent) return;
    parent.querySelectorAll(".customH").forEach((el) => el.remove());
  }

  function getMovelist() {
    const list = [];
    document.querySelectorAll("div.node").forEach((e) => {
      list.push(e.innerText.replaceAll(" ", ""));
    });
    return list;
  }

  function sendMessage() {
    const moves = getMovelist();
    if (moves && moves.length > 0) {
      try {
        chrome.runtime.sendMessage({ movelist: moves, side: getSide() });
      } catch (error) {

      }
    }
  }

  function highlightMovesOnBoard(moves, side) {
    const parent = document.querySelector("wc-chess-board");
    if (!parent) return;

    const squareSize = parent.offsetWidth / 8;
    const maxMoves = 5;
    const colors = ["blue", "green", "yellow", "orange", "red"];

    clearHighlightSquares();

    moves.slice(0, maxMoves).forEach((move, index) => {
      const color = colors[index] || "red";
      drawArrow(move.from, move.to, color, move.score, side, parent, squareSize);
    });
  }

  setInterval(() => {
    try {
      sendMessage();
    } catch (error) {}
  }, 500);


  chrome.runtime.onMessage.addListener((message) => {
    highlightMovesOnBoard(message.moves, getSide());
  });
} else {
  // console.log("");
}
