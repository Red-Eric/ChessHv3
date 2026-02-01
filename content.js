const default_fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const apiExpiration =
  "https://api.timezonedb.com/v2.1/list-time-zone?key=WPOK8LWQNYUI&format=json&country=FR";

function clickButtonsByText(text) {
  const buttons = Array.from(document.querySelectorAll("button"));
  const targetButtons = buttons.filter((btn) =>
    btn.innerText.trim().includes(text),
  );
  if (targetButtons.length === 0) return;
  targetButtons[0].click();
  targetButtons.shift();
  setTimeout(() => clickButtonsByText(text), 100);
}

function randomIntBetween(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function clearHighlightSquares() {
  document.querySelectorAll(".customH").forEach((el) => el.remove());
}

const interval = 100;

let config = {
  elo: 3190,
  lines: 5,
  depth: 10,
  delay: 100,
  autoMove: false,
  winningMove: false,
  showEval: false,
  onlyShowEval: false,
};

function saveConfig() {
  localStorage.setItem("chessConfig", JSON.stringify(config));
  // console.log("saved chess.com");
}

function saveConfig2() {
  // lichess
  localStorage.setItem("chessConfig2", JSON.stringify(config));
  // console.log("saved lichess");
}

function loadConfig() {
  const saved = localStorage.getItem("chessConfig");
  if (saved) {
    // config = JSON.parse(saved);
    config = { ...config, ...JSON.parse(saved) };
  }
}

function loadConfig2() {
  // lichess
  const saved = localStorage.getItem("chessConfig2");
  if (saved) {
    // config = JSON.parse(saved);
    config = { ...config, ...JSON.parse(saved) };
  }
}

const startCheat = () => {
  if (window.location.hostname.includes("chess.com")) {
    loadConfig();
    let lastFEN = "Bomboclat";
    let fen_ = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    let side_index = 1;
    let lastAutoPlay = config.autoMove;
    let evalObj = null;
    let customEval = null;

    function createEvalBar(initialScore = "0.0", initialColor = "white") {
      const boardContainer = document.querySelector(".board");
      let w_ = boardContainer.offsetWidth;

      if (!boardContainer) return console.error("Plateau non trouvé !");

      // Conteneur principal
      const evalContainer = document.createElement("div");
      evalContainer.id = "customEval";
      evalContainer.style.zIndex = "9999";
      evalContainer.style.width = `${(w_ * 6) / 100}px`;
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
      // boardContainer.parentNode.appendChild(evalContainer);
      boardContainer.parentNode.insertBefore(evalContainer, boardContainer);

      function parseScore(scoreStr) {
        if (!scoreStr) {
          return { score: 0, mate: false };
        }

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
          topBar.style.background = "#312e2b";
        } else {
          bottomBar.style.background = "#312e2b";
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
      window.postMessage({ type: "GET_FEN" }, "*");
    }
    function requestMove(from, to, promotion = "q", key = false) {
      key
        ? (moveDelay = randomIntBetween(100, 101))
        : (moveDelay = randomIntBetween(100, config.delay));
      window.postMessage(
        {
          type: "MOVE",
          from,
          to,
          promotion,
          moveDelay,
        },
        "*",
      );
    }

    function highlightMovesOnBoard(moves, side) {
      // console.log(side);
      if (!Array.isArray(moves)) return;

      if (
        !(
          (side === "w" && fen_.split(" ")[1] === "w") ||
          (side === "b" && fen_.split(" ")[1] === "b")
        )
      ) {
        return;
      }

      if (config.onlyShowEval) return;

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

        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg",
        );
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
          "defs",
        );
        const marker = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "marker",
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
          "path",
        );
        arrowPath.setAttribute("d", "M0,0 L3.5,1.25 L0,2.5 Z");
        arrowPath.setAttribute("fill", color);
        marker.appendChild(arrowPath);
        defs.appendChild(marker);
        svg.appendChild(defs);

        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
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
            "text",
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

      let filteredMoves = moves;
      if (config.winningMove) {
        filteredMoves = moves.filter((move) => {
          const evalValue = parseFloat(move.eval);
          if (side === "w") {
            return (
              evalValue >= 2 ||
              (move.eval.startsWith("#") && parseInt(move.eval.slice(1)) > 0)
            );
          } else {
            return (
              evalValue <= -2 ||
              (move.eval.startsWith("#-") && parseInt(move.eval.slice(2)) > 0)
            );
          }
        });
      }

      filteredMoves.slice(0, maxMoves).forEach((move, index) => {
        const color = colors[index] || "red";
        drawArrow(move.from, move.to, color, move.eval);
      });
    }

    function getSide() {
      return side_index === 1 ? "white" : "black";
    }

    function checkAndSendMoves() {
      if (config.autoMove && document.querySelector("#board-single")) {
        clickButtonsByText("Nouvelle");
        clickButtonsByText("New");
      }

      requestFen();

      if (!customEval && config.showEval) {
        const boardContainer = document.querySelector(".board");
        if (boardContainer) {
          evalObj = createEvalBar("0.0", getSide());
          customEval = document.querySelector("#customEval");
        }
      }

      if (lastFEN !== fen_) {
        clearHighlightSquares();
        lastFEN = fen_;
        chrome.runtime.sendMessage({
          action: "ping",
          fen: fen_,
          side: getSide(),
        });
      }
    }

    setInterval(checkAndSendMoves, interval);

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === "returnContent") {
        let moves = message.moves;
        chrome.runtime.sendMessage({ type: "FROM_CONTENT", data: moves });
        highlightMovesOnBoard(moves, getSide()[0]);
        if (moves.length > 0 && evalObj) {
          evalObj.update(moves[0].eval, getSide());
        }

        if (
          (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
          (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
        ) {
          if (config.autoMove) {
            requestMove(moves[0].from, moves[0].to);
          }
        }
      }

      if (message.config && message.type === "config") {
        // config = message.config;
        config = { ...config, ...message.config };

        // console.log("message from backgound js ", message);
        saveConfig();
        clearHighlightSquares();
        if (lastAutoPlay != config.autoMove) {
          lastAutoPlay = config.autoMove;
          lastFEN = "";
        }
        if (!config.showEval && customEval) {
          customEval.remove();
          customEval = null;
          evalObj = null;
        }

        if (config.showEval && !customEval) {
          const boardContainer = document.querySelector(".board");
          if (boardContainer) {
            evalObj = createEvalBar("0.0", getSide());
            customEval = document.querySelector("#customEval");
          }
        }
      }
    });
  }

  if (window.location.hostname.includes("lichess")) {
    loadConfig2();
    let fen_ = "";
    let evalObj = null;
    let customEval = null;

    function createEvalBar(initialScore = "0.0", initialColor = "white") {
      const boardContainer = document.querySelector("cg-board");
      let w_ = boardContainer.offsetWidth;

      if (!boardContainer) return console.error("Plateau non trouvé !");

      // Conteneur principal
      const evalContainer = document.createElement("div");
      evalContainer.id = "customEval";
      evalContainer.style.zIndex = "9999";
      evalContainer.style.width = `${(w_ * 6) / 100}px`;
      evalContainer.style.height = `${boardContainer.offsetWidth}px`;
      evalContainer.style.background = "#eee";
      evalContainer.style.marginLeft = "10px";
      evalContainer.style.position = "relative";
      evalContainer.style.left = "-50px";
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
      // boardContainer.parentNode.appendChild(evalContainer);
      boardContainer.parentNode.insertBefore(evalContainer, boardContainer);

      function parseScore(scoreStr) {
        if (!scoreStr) {
          return { score: 0, mate: false };
        }

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
          topBar.style.background = "#312e2b";
        } else {
          bottomBar.style.background = "#312e2b";
          topBar.style.background = "#ffffff";
        }

        bottomBar.style.height = percent + "%";
        topBar.style.height = 100 - percent + "%";
      }

      update(initialScore, initialColor);
      return { update };
    }

    function highlightMovesOnBoard(moves, side) {
      // console.log(side);
      if (!Array.isArray(moves)) return;

      if (
        !(
          (side === "w" && fen_.split(" ")[1] === "w") ||
          (side === "b" && fen_.split(" ")[1] === "b")
        )
      ) {
        return;
      }

      // Si onlyShowEval est activé, on n'affiche rien
      if (config.onlyShowEval) return;

      const parent = document.querySelector("cg-container");
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
          // console.log({x : x, y: y})
          return { x, y };
        }
      }

      function drawArrow(fromSquare, toSquare, color, score) {
        const from = squareToPosition(fromSquare);
        const to = squareToPosition(toSquare);
        // console.log("from")
        // console.log(from)
        // console.log("to")
        // console.log(to)

        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg",
        );
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
          "defs",
        );
        const marker = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "marker",
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
          "path",
        );
        arrowPath.setAttribute("d", "M0,0 L3.5,1.25 L0,2.5 Z");
        arrowPath.setAttribute("fill", color);
        marker.appendChild(arrowPath);
        defs.appendChild(marker);
        svg.appendChild(defs);

        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
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
            "text",
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

      let filteredMoves = moves;
      if (config.winningMove) {
        filteredMoves = moves.filter((move) => {
          const evalValue = parseFloat(move.eval);
          if (side === "w") {
            return (
              evalValue >= 2 ||
              (move.eval.startsWith("#") && parseInt(move.eval.slice(1)) > 0)
            );
          } else {
            return (
              evalValue <= -2 ||
              (move.eval.startsWith("#-") && parseInt(move.eval.slice(2)) > 0)
            );
          }
        });
      }

      filteredMoves.slice(0, maxMoves).forEach((move, index) => {
        const color = colors[index] || "red";
        // drawArrow(move.from, move.to, color, move.eval);
        drawArrow(move.from, move.to, color, move.eval);
      });

      // console.log(fen_)

      if (bookMove) {
        // {from : , to : }
        console.log(fen_);
        console.log(bookMove);

        drawArrow(bookMove.from, bookMove.to, "#000000", "book");
      }
    }

    function getSide() {
      const board = document.querySelector(".cg-wrap");
      if (!board) return "white"; // si le plateau n'est pas trouvé

      if (board.classList.contains("orientation-black")) {
        return "black";
      } else if (board.classList.contains("orientation-white")) {
        return "white";
      } else {
        return "white";
      }
    }

    function requestFen() {
      // console.log("request fen called");
      window.postMessage({ type: "FEN" }, "*");
    }

    /////////////////////////////////////////////   calculation /////////////////////////////////////////////
    function inject() {
      const s = document.createElement("script");
      s.src = chrome.runtime.getURL("lib/chess_min.js");
      (document.head || document.documentElement).appendChild(s);
      s.onload = () => s.remove();

      const s2 = document.createElement("script");
      s2.src = chrome.runtime.getURL("a.js");
      (document.head || document.documentElement).appendChild(s2);
      s2.onload = () => s2.remove();

      window.addEventListener("message", (event) => {
        if (event.source !== window) return;
        if (event.data && event.data.type === "FEN_RESPONSE") {
          // code here

          // console.log(event.data.fen)
          if (event.data.fen !== fen_) {
            clearHighlightSquares();
            fen_ = event.data.fen;
            chrome.runtime.sendMessage({
              action: "ping",
              fen: fen_,
              side: getSide(),
            });
          }
        }
      });
    }

    inject();

    setInterval(() => {
      if (!customEval && config.showEval) {
        const boardContainer = document.querySelector("cg-container");
        if (boardContainer) {
          evalObj = createEvalBar("0.0", getSide());
          customEval = document.querySelector("#customEval");
        }
      }

      requestFen();
    }, interval);

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === "returnContent") {
        const moves = message.moves;
        chrome.runtime.sendMessage({ type: "FROM_CONTENT", data: moves });
        highlightMovesOnBoard(moves, getSide()[0]);

        if (moves.length > 0 && evalObj) {
          evalObj.update(moves[0].eval, getSide());
        }
      }

      if (message.type === "config2") {
        config = message.config;
        // console.log(config)
        saveConfig2();
        clearHighlightSquares();

        if (!config.showEval && customEval) {
          customEval.remove();
          customEval = null;
          evalObj = null;
        }

        if (config.showEval && !customEval) {
          const boardContainer = document.querySelector("cg-container");
          if (boardContainer) {
            evalObj = createEvalBar("0.0", getSide());
            customEval = document.querySelector("#customEval");
          }
        }
      }

      if (message.type === "komodo") {
        if (config.server) {
          highlightMovesOnBoard(message.data, getSide()[0]);
          chrome.runtime.sendMessage({
            type: "FROM_CONTENT",
            data: message.data,
          });
          if (message.data.length > 0 && evalObj) {
            evalObj.update(message.data[0].eval, getSide());
          }
        }
      }
    });
  }

  if (window.location.hostname.includes("worldchess")) {
    let fen_ = "";
    let currentFen = "";
    let evalObj = null;
    let customEval = null;
    loadConfig2();

    function getFEN() {
      const pTags = document.querySelectorAll("p");
      const result = [];

      const fenRegex =
        /^([rnbqkpRNBQKP1-8]+\/){7}[rnbqkpRNBQKP1-8]+\s[wb]\s(K?Q?k?q?-?)\s(-|[a-h][36])\s\d+\s\d+$/;

      pTags.forEach((p) => {
        const text = p.textContent.trim();
        if (fenRegex.test(text)) {
          result.push(text);
        }
      });

      return result[0];
    }

    function getSide() {
      const cgBoard = document.querySelector("cg-board");
      let side = "white";

      if (cgBoard) {
        const indicator = cgBoard.style.transform; // "rotate(180)"
        if (indicator === "rotate(180deg)") {
          side = "black";
        }
        if (indicator === "rotate(0deg)") {
          side = "white";
        }
      }

      // console.log("Getside called")
      // console.log("side")

      // console.log(side)

      return side;
    }

    function highlightMovesOnBoard(moves, side) {
      // console.log(side);
      if (!Array.isArray(moves)) return;

      if (
        !(
          (side === "w" && fen_.split(" ")[1] === "w") ||
          (side === "b" && fen_.split(" ")[1] === "b")
        )
      ) {
        return;
      }

      // Si onlyShowEval est activé, on n'affiche rien
      if (config.onlyShowEval) return;

      const parent = document.querySelector("cg-board");

      if (!parent) return;

      const squareSize = parent.offsetWidth / 8;
      const maxMoves = 5;
      let colors = ["blue", "green", "yellow", "orange", "red"];

      // parent.querySelectorAll(".customH").forEach((el) => el.remove());

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

        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg",
        );
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
          "defs",
        );
        const marker = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "marker",
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
          "path",
        );
        arrowPath.setAttribute("d", "M0,0 L3.5,1.25 L0,2.5 Z");
        arrowPath.setAttribute("fill", color);
        marker.appendChild(arrowPath);
        defs.appendChild(marker);
        svg.appendChild(defs);

        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
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
            "text",
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

      let filteredMoves = moves;
      if (config.winningMove) {
        filteredMoves = moves.filter((move) => {
          const evalValue = parseFloat(move.eval);
          if (side === "w") {
            return (
              evalValue >= 2 ||
              (move.eval.startsWith("#") && parseInt(move.eval.slice(1)) > 0)
            );
          } else {
            return (
              evalValue <= -2 ||
              (move.eval.startsWith("#-") && parseInt(move.eval.slice(2)) > 0)
            );
          }
        });
      }

      filteredMoves.slice(0, maxMoves).forEach((move, index) => {
        const color = colors[index] || "red";
        // drawArrow(move.from, move.to, color, move.eval);
        drawArrow(move.from, move.to, color, move.eval);
        if (side === "b") {
          document
            .querySelectorAll(".customH")
            .forEach((el) => (el.style.transform = "rotate(180deg)"));
        }
      });
    }

    // function clearHighlightSquares() {
    //   document.querySelectorAll(".customH").forEach((el) => el.remove());
    // }

    function createEvalBar(initialScore = "0.0", initialColor = "white") {
      const boardContainer = document.querySelector("cg-board");
      let w_ = boardContainer.offsetWidth;

      if (!boardContainer) return console.error("Plateau non trouvé !");

      // Conteneur principal
      const evalContainer = document.createElement("div");
      evalContainer.id = "customEval";
      evalContainer.style.zIndex = "9999";
      evalContainer.style.width = `${(w_ * 6) / 100}px`;
      evalContainer.style.height = `${boardContainer.offsetWidth}px`;
      evalContainer.style.background = "#eee";
      evalContainer.style.marginLeft = "10px";
      evalContainer.style.position = "relative";
      evalContainer.style.left = "-10px";
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
      // boardContainer.parentNode.appendChild(evalContainer);
      boardContainer.parentNode.insertBefore(evalContainer, boardContainer);

      function parseScore(scoreStr) {
        if (!scoreStr) {
          return { score: 0, mate: false };
        }

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
          topBar.style.background = "#312e2b";
        } else {
          bottomBar.style.background = "#312e2b";
          topBar.style.background = "#ffffff";
        }

        bottomBar.style.height = percent + "%";
        topBar.style.height = 100 - percent + "%";
      }

      update(initialScore, initialColor);
      return { update };
    }

    setInterval(() => {
      // eval bar
      if (!customEval && config.showEval) {
        const boardContainer = document.querySelector("cg-board");
        if (boardContainer) {
          evalObj = createEvalBar("0.0", getSide());
          customEval = document.querySelector("#customEval");
        }
      }

      // Fen
      fen_ = getFEN();
      if (fen_ && fen_ !== currentFen) {
        // console.log(fen_)
        currentFen = fen_;
        clearHighlightSquares();
        chrome.runtime.sendMessage({
          action: "ping",
          fen: fen_,
          side: getSide(),
        });
      }
    }, interval);

    // PArametre chessARENA

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === "returnContent") {
        const moves = message.moves;
        chrome.runtime.sendMessage({ type: "FROM_CONTENT", data: moves });
        highlightMovesOnBoard(moves, getSide()[0]);

        if (moves.length > 0 && evalObj) {
          evalObj.update(moves[0].eval, getSide());
        }
      }
      if (message.type === "config2") {
        config = message.config;
        // console.log(config)
        saveConfig2();
        clearHighlightSquares();

        if (!config.showEval && customEval) {
          customEval.remove();
          customEval = null;
          evalObj = null;
        }

        if (config.showEval && !customEval) {
          const boardContainer = document.querySelector("cg-container");
          if (boardContainer) {
            evalObj = createEvalBar("0.0", getSide());
            customEval = document.querySelector("#customEval");
          }
        }
      }
    });
  }
};

const LOCAL_VERSION = "1.1";

let downloadlink = "https://www.youtube.com/@Redson_Eric";

async function checkUpdate() {
  try {
    const url =
      "https://api.github.com/repos/Red-Eric/ChessBot-CDP/contents/ChessKiller/update.json?ref=master";
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("HTTP error " + response.status);

    const result = await response.json();
    const content = atob(result.content.replace(/\n/g, ""));
    const data = JSON.parse(content);

    console.log(data);

    if (data.version !== LOCAL_VERSION) {
      downloadlink = data.link;
      return true;
    }

    return false;
  } catch (err) {
    console.error("Erreur fetch:", err);
    return false;
  }
}

(async () => {
  const updateNeeded = await checkUpdate();
  if (!updateNeeded) {
    startCheat();
  }
  if (updateNeeded) {
    if (
      window.location.hostname.includes("chess.com") ||
      window.location.hostname.includes("lichess") ||
      window.location.hostname.includes("worldchess")
    ) {
      alert("You need to update your ChessHv4 extension");
      window.open(downloadlink, "_blank");
    }
  }
})();
