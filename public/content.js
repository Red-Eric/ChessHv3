if (window.location.hostname.includes("chess.com")) {
  function highlightMovesOnBoard(moves, side) {
    const parent = document.querySelector("wc-chess-board");
    if (!parent) return;

    const squareSize = parent.offsetWidth / 8;
    const maxMoves = 5;
    const colors = ["blue", "green", "yellow", "orange", "red"];


    parent.querySelectorAll(".customH").forEach((el) => el.remove());

    function squareToCoord(square) {
      const file = square[0].charCodeAt(0) - "a".charCodeAt(0);
      const rank = parseInt(square[1], 10) - 1;
      const x = file * squareSize + squareSize / 2;
      const y = (side === "w" ? 7 - rank : rank) * squareSize + squareSize / 2;
      return { x, y };
    }

    
    function drawArrow(from, to, color, score) {
      const { x: x1, y: y1 } = squareToCoord(from);
      const { x: x2, y: y2 } = squareToCoord(to);
    
      const squareSize = parent.offsetWidth / 8;
    
      const dx = x2 - x1;
      const dy = y2 - y1;
      const length = Math.sqrt(dx * dx + dy * dy);
    
      const extraLength = squareSize * 0.3;
    
      const x2_shortened = x2 - (dx / length) * extraLength;
      const y2_shortened = y2 - (dy / length) * extraLength;
    
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.classList.add("customH");
      svg.style.position = "absolute";
      svg.style.left = "0";
      svg.style.top = "0";
      svg.style.width = `${parent.offsetWidth}px`;
      svg.style.height = `${parent.offsetHeight}px`;
      svg.style.pointerEvents = "none";
      svg.style.overflow = "visible";
    
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
      marker.setAttribute("id", `arrowhead-${color}`);
      marker.setAttribute("markerWidth", "2"); // réduit de 50%
      marker.setAttribute("markerHeight", "2"); // réduit de 50%
      marker.setAttribute("refX", "0");
      marker.setAttribute("refY", "1"); // ajusté pour centrer
      marker.setAttribute("orient", "auto");
      marker.setAttribute("markerUnits", "strokeWidth");
    
      const arrowPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      arrowPath.setAttribute("d", "M0,0 L2,1 L0,2 Z"); // moitié taille
      arrowPath.setAttribute("fill", color);
      arrowPath.setAttribute("fill-opacity", "0.6");
    
      marker.appendChild(arrowPath);
      defs.appendChild(marker);
    
      const arrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
      arrow.setAttribute("x1", x1);
      arrow.setAttribute("y1", y1);
      arrow.setAttribute("x2", x2_shortened);
      arrow.setAttribute("y2", y2_shortened);
      arrow.setAttribute("stroke", color);
      arrow.setAttribute("stroke-width", 10);
      arrow.setAttribute("stroke-opacity", "0.6");
      arrow.setAttribute("marker-end", `url(#arrowhead-${color})`);
    
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", x2 + 5);
      text.setAttribute("y", y2 - 5);
      text.setAttribute("fill", color);
      text.setAttribute("font-size", "14");
      text.setAttribute("font-weight", "bold");
      text.textContent = score;
    
      svg.appendChild(defs);
      svg.appendChild(arrow);
      svg.appendChild(text);
      parent.appendChild(svg);
    }
    
    
    
    

    parent.style.position = "relative";

    moves.slice(0, maxMoves).forEach((move, index) => {
      const color = colors[index] || "red";
      drawArrow(move.from, move.to, color, move.score);
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
    if (value === "1") return "b";
    if (value === "8") return "w";
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
    }
  }

  setInterval(() => {
    try {
      sendMessage();
    } catch (error) {}
  }, 500);

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    clearHighlightSquares();
    const moves = message.moves;
    console.log(moves)
    highlightMovesOnBoard(moves, getSide());
  });
} else {
  console.log("ChessCom Only.");
}
