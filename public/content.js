if (window.location.hostname.includes("chess.com")) {
  let lastFEN = "";
  let fen_ = "idjazdjaziodja";
  let side_index = 1;

  function createEvalBar(initialScore = "0.0", initialColor = "white") {
    const boardContainer = document.querySelector(".board");
    let w_ = boardContainer.offsetWidth
    if (!boardContainer) return console.error("Plateau non trouvé !");

    // Conteneur principal
    const evalContainer = document.createElement("div");
    evalContainer.style.width = `${(w_*6)/100}px`
    evalContainer.style.height = `${boardContainer.offsetWidth}px`;
    evalContainer.style.background = "#eee";
    evalContainer.style.marginLeft = "10px";
    evalContainer.style.position = "relative";
    evalContainer.style.border = "1px solid #aaa";
    evalContainer.style.borderRadius = "4px";
    evalContainer.style.overflow = "hidden";

    const topBar = document.createElement("div");
    const bottomBar = document.createElement("div");

    [topBar, bottomBar].forEach((bar) => {
      bar.style.width = "100%";
      bar.style.position = "absolute";
      bar.style.transition = "height 0.3s ease";
    });

    topBar.style.top = "0";
    bottomBar.style.bottom = "0";

    evalContainer.appendChild(topBar);
    evalContainer.appendChild(bottomBar);

    // Ligne médiane
    const midLine = document.createElement("div");
    midLine.style.position = "absolute";
    midLine.style.top = "50%";
    midLine.style.left = "0";
    midLine.style.width = "100%";
    midLine.style.height = "2px";
    midLine.style.background = "red";
    midLine.style.transform = "translateY(-50%)";
    evalContainer.appendChild(midLine);

    // Texte en bas
    const scoreText = document.createElement("div");
    scoreText.style.position = "absolute";
    scoreText.style.bottom = "0";
    scoreText.style.left = "50%";
    scoreText.style.transform = "translateX(-50%)";
    scoreText.style.color = "red";
    scoreText.style.fontWeight = "bold";
    scoreText.style.fontSize = "12px";
    scoreText.style.pointerEvents = "none";
    evalContainer.appendChild(scoreText);

    boardContainer.parentNode.style.display = "flex";
    boardContainer.parentNode.appendChild(evalContainer);

    function parseScore(scoreStr) {
      scoreStr = scoreStr.trim();
      let mate = false;
      let score = 0;

      if (scoreStr.startsWith("#")) {
        mate = true;
        scoreStr = scoreStr.slice(1);
      }

      score = parseFloat(scoreStr.replace("+", "")) || 0;
      return { score, mate };
    }

    function update(scoreStr, color = "white") {
      let { score, mate } = parseScore(scoreStr);
      let percent = 50;

      if (mate) {
        let sign = score > 0 ? "+" : "-";
        scoreText.textContent = "#" + sign + Math.abs(score);
        if (
          (score > 0 && color === "white") ||
          (score < 0 && color === "black")
        ) {
          percent = 100;
        } else {
          percent = 0;
        }
      } else {
        let sign = score > 0 ? "+" : "";
        scoreText.textContent = sign + score.toFixed(1);
        if (color === "black") score = -score;
        if (score >= 7) {
          percent = 90;
        } else if (score <= -7) {
          percent = 10;
        } else {
          percent = 50 + (score / 7) * 40;
        }
      }

      if (color === "white") {
        bottomBar.style.background = "#ffffff";
        topBar.style.background = "#000000";
      } else {
        bottomBar.style.background = "#000000";
        topBar.style.background = "#ffffff";
      }

      bottomBar.style.height = percent + "%";
      topBar.style.height = 100 - percent + "%";
    }

    update(initialScore, initialColor);
    return { update };
  }

  function inject() {
    const s = document.createElement("script");
    s.src = chrome.runtime.getURL("a.js");
    (document.head || document.documentElement).appendChild(s);
    s.onload = () => s.remove();

    window.addEventListener("message", (event) => {
      if (event.source !== window) return;
      if (event.data && event.data.type === "FEN_RESPONSE") {
        fen_ = event.data.fen;
        side_index = event.data.side_;
      }
    });
  }

  inject();

  function requestFen() {
    // console.log("request fen called")
    window.postMessage({ type: "GET_FEN" }, "*");
  }

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

  function getOppElo() {
    // ( 1920 )
    let elo = document.querySelector(".cc-text-medium")?.innerText;
    if (elo) {
      return parseInt(elo.slice(1, -1));
    } else {
      return 3500;
    }
  }

  function clearHighlightSquares() {
    const parent = document.querySelector("wc-chess-board");
    if (!parent) return;
    parent.querySelectorAll(".customH").forEach((el) => el.remove());
  }

  function getSide() {
    return side_index === 1 ? "white" : "black";
  }

  function checkAndSendMoves() {
    requestFen();
    if (lastFEN !== fen_) {
      lastFEN = fen_;
      _elo_ = getOppElo();

      if (getSide() === "white") {
        if (fen_.split(" ")[1] === "w") {
          chrome.runtime.sendMessage({
            fen: fen_,
            side: getSide(),
            type: "position",
            elo_: _elo_,
          });
        } else {
          clearHighlightSquares();
        }
      }
      // black
      else {
        if (fen_.split(" ")[1] === "b") {
          chrome.runtime.sendMessage({
            fen: fen_,
            side: getSide(),
            type: "position",
            elo_: _elo_,
          });
        } else {
          clearHighlightSquares();
        }
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
