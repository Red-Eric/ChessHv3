if (window.location.hostname.includes("chess.com")) {
  function highlightMovesOnBoard(moves, side) {
    const parent = document.querySelector("wc-chess-board");
    if (!parent) return;

    const squareSize = parent.offsetWidth / 8;
    const maxMoves = 5;
    let colors = ["blue", "green", "yellow", "orange", "red"];

    parent.querySelectorAll(".customH").forEach((el) => el.remove());

    function squareToPosition(square) {
      const fileChar = square[0];
      const rankChar = square[1];
      const rank = parseInt(rankChar, 10) - 1;

      let file;
      if (side === "w") {
        file = fileChar.charCodeAt(0) - "a".charCodeAt(0);
        const y = (7 - rank) * squareSize;
        const x = file * squareSize;
        return { x, y };
      } else {
        file = "h".charCodeAt(0) - fileChar.charCodeAt(0);
        const y = rank * squareSize;
        const x = file * squareSize;
        return { x, y };
      }
    }

    function drawArrow(fromSquare, toSquare, color, score) {
      const from = squareToPosition(fromSquare);
      const to = squareToPosition(toSquare);

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "customH");
      svg.setAttribute("width", parent.offsetWidth);
      svg.setAttribute("height", parent.offsetWidth);
      svg.style.position = "absolute";
      svg.style.left = "0";
      svg.style.top = "0";
      svg.style.pointerEvents = "none";
      svg.style.overflow = "visible";
      svg.style.zIndex = "10";

      const defs = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "defs"
      );
      const marker = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "marker"
      );
      marker.setAttribute("id", `arrowhead-${color}`);
      marker.setAttribute("markerWidth", "3.5");
      marker.setAttribute("markerHeight", "2.5");
      marker.setAttribute("refX", "1.75");
      marker.setAttribute("refY", "1.25");
      marker.setAttribute("orient", "auto");
      marker.setAttribute("markerUnits", "strokeWidth");

      const arrowPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      arrowPath.setAttribute("d", "M0,0 L3.5,1.25 L0,2.5 Z");
      arrowPath.setAttribute("fill", color);
      marker.appendChild(arrowPath);
      defs.appendChild(marker);
      svg.appendChild(defs);

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", from.x + squareSize / 2);
      line.setAttribute("y1", from.y + squareSize / 2);
      line.setAttribute("x2", to.x + squareSize / 2);
      line.setAttribute("y2", to.y + squareSize / 2);
      line.setAttribute("stroke", color);
      line.setAttribute("stroke-width", "5");
      line.setAttribute("marker-end", `url(#arrowhead-${color})`);
      line.setAttribute("opacity", "0.6");
      svg.appendChild(line);

      if (score !== undefined) {
        const text = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        text.setAttribute("x", to.x + squareSize - 4);
        text.setAttribute("y", to.y + 12);
        text.setAttribute("fill", color);
        text.setAttribute("font-size", "13");
        text.setAttribute("font-weight", "bold");
        text.setAttribute("text-anchor", "end");
        text.setAttribute("alignment-baseline", "hanging");
        text.setAttribute("opacity", "1");
        text.textContent = score;
        svg.appendChild(text);
      }

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
    const board = document.querySelector("wc-chess-board");
    if (!board) {
      return "white";
    }
    return board.classList.contains("flipped") ? "black" : "white";
  }

  function getMovelistText() {
    let movelist = [];
    document.querySelectorAll("div.node").forEach((e) => {
      movelist.push(e.innerText.replaceAll(" ", ""));
    });
    return movelist;
  }

  function getMovelistFigurine() {
    const nodes = document.querySelectorAll("span.node-highlight-content");
    const moves = [];

    nodes.forEach((e) => {
      if (e.children.length === 0) {
        moves.push(e.innerText.trim());
      } else {
        const figurine = e.children[0]?.getAttribute("data-figurine") || "";
        const moveText = e.innerText.trim().replace(/\s+/g, "");
        moves.push(figurine + moveText);
      }
    });

    return moves;
  }

  function getOppElo() {
    // ( 1920 )
    let elo = document.querySelector(".cc-text-medium").innerText;
    if (elo) {
      return parseInt(elo.slice(1, -1));
    } else {
      return 3500;
    }
  }

  let lastMovesSerialized = "";

  function checkAndSendMoves() {
    let figure = document.querySelector("span[data-figurine]");
    let moves = [];

    if (figure === null) {
      moves = getMovelistText();
    } else {
      moves = getMovelistFigurine();
    }

    const currentSerialized = JSON.stringify(moves);
    if (currentSerialized !== lastMovesSerialized && moves.length > 0) {
      lastMovesSerialized = currentSerialized;
      try {
        side_ = getSide();
        _elo_ = getOppElo();

        if (side_ === "white") {
          moves.length % 2 === 0
            ? chrome.runtime.sendMessage({
                movelist: moves,
                side: getSide(),
                type: "position",
                elo_: _elo_,
              })
            : clearHighlightSquares();
        } else {
          moves.length % 2 === 1
            ? chrome.runtime.sendMessage({
                movelist: moves,
                side: getSide(),
                type: "position",
                elo_: _elo_,
              })
            : clearHighlightSquares();
        }
      } catch (error) {
        console.warn("SendMessage error:", error);
      }
    }
  }

  setInterval(checkAndSendMoves, 350);

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // console.log(message.moves);
    clearHighlightSquares();
    const moves = message.moves;
    highlightMovesOnBoard(moves, getSide()[0]);
  });
}
