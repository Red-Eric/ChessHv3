async function createWorker() {
  const url = chrome.runtime.getURL("lib/stockfish.js");

  const blob = new Blob([`importScripts("${url}");`], {
    type: "application/javascript",
  });
  const blobUrl = URL.createObjectURL(blob);

  return new Worker(blobUrl);
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
  // const parent = document.querySelector("wc-chess-board");
  // if (!parent) return;
  document.querySelectorAll(".customH").forEach((el) => el.remove());
}

let config = {
  skill: 20,
  lines: 5,
  depth: 10,
  delay: 100,
  autoSkill: false,
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
    config = JSON.parse(saved);
  }
}

function loadConfig2() {
  // lichess
  const saved = localStorage.getItem("chessConfig2");
  if (saved) {
    config = JSON.parse(saved);
  }
}

class Engine {
  constructor({ elo = 20, depth = 10, multipv = 5, threads = 2, hash = 128 }) {
    this.elo = elo;
    this.depth = depth;
    this.multipv = multipv;
    this.threads = threads;
    this.hash = hash;
    this.ready = this.init();
  }

  async init() {
    this.worker = await createWorker();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  setOptions() {
    this.worker.postMessage(`setoption name Skill Level value ${this.elo}`);
    this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);
    this.worker.postMessage("setoption name Ponder value false");
  }

  updateConfig({ elo, depth, multipv, threads, hash }) {
    if (elo !== undefined) this.elo = elo;
    if (depth !== undefined) this.depth = depth;
    if (multipv !== undefined) this.multipv = multipv;
    if (threads !== undefined) this.threads = threads;
    if (hash !== undefined) this.hash = hash;
    this.setOptions();
  }

  async getMoves(fen, side = "white") {
    await this.ready;
    this.worker.postMessage("uci");

    const sideToMove = fen.split(" ")[1];

    return new Promise((resolve) => {
      const multipvResults = new Map();
      this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);
      this.worker.postMessage("stop");

      const onMessage = (event) => {
        const msg = event.data;
        console.log(msg)
        if (typeof msg !== "string") return;

        if (msg.includes(`info depth ${this.depth}`)) {
          const multipvMatch = msg.match(/multipv (\d+)/);
          const scoreMatch = msg.match(/score (cp|mate) (-?\d+)/);
          const pvMatch = msg.match(/pv ([a-h][1-8][a-h][1-8][qrbn]?)/);

          if (multipvMatch && scoreMatch && pvMatch) {
            const multipv = parseInt(multipvMatch[1], 10);
            const scoreType = scoreMatch[1];
            let scoreValueRaw = parseInt(scoreMatch[2], 10);

            if (sideToMove === "b") {
              scoreValueRaw = -scoreValueRaw;
            }

            const bestMove = pvMatch[1];
            let score;
            if (scoreType === "cp") {
              const value = +(scoreValueRaw / 100).toFixed(2);
              score = value > 0 ? `+${value}` : `${value}`;
            } else if (scoreType === "mate") {
              score =
                scoreValueRaw > 0
                  ? `#${scoreValueRaw}`
                  : `#-${Math.abs(scoreValueRaw)}`;
            }

            const from = bestMove.slice(0, 2);
            const to = bestMove.slice(2, 4);

            multipvResults.set(multipv, { from, to, eval: score, fen: fen, side : side });
          }
        }

        if (msg.startsWith("bestmove")) {
          this.worker.removeEventListener("message", onMessage);
          resolve(
            Array.from(multipvResults.entries())
              .sort(([a], [b]) => a - b)
              .map(([_, val]) => val)
          );
        }
      };

      this.worker.addEventListener("message", onMessage);
      this.worker.postMessage("stop");
      this.worker.postMessage(`position fen ${fen}`);
      this.worker.postMessage(`go depth ${this.depth}`);
    });
  }
}

let expired = true;

chrome.runtime.sendMessage({ type: "checkExpiration" }, (response) => {
  if (response?.expired) {
    expired = true;
    // console.log(expired);
    alert("If u see this , update chessHv3 (https://discord.gg/XbVsywukFU)");
    return;
  }

  expired = false;
  startCheat();
});

//// CHEATTTTTTTTTTTTTTTTTTTTTTTT

const startCheat = () => {
  // console.log("start")

  /*
  
        _                                        
   ___| |__   ___  ___ ___   ___ ___  _ __ ___  
  / __| '_ \ / _ \/ __/ __| / __/ _ \| '_ ` _ \ 
 | (__| | | |  __/\__ \__ \| (_| (_) | | | | | |
  \___|_| |_|\___||___/___(_)___\___/|_| |_| |_|
                                                 
  */
  if (window.location.hostname.includes("chess.com") && !expired) {
    loadConfig();
    let lastFEN = "";
    let fen_ = "";
    let side_index = 1;

    const engine = new Engine({
      elo: config.skill,
      depth: 10,
      multipv: config.lines,
      threads: 2,
      hash: 128,
    });

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

    if (!expired) {
      inject();
    }

    function requestFen() {
      // console.log("request fen called");
      if (!expired) {
        window.postMessage({ type: "GET_FEN" }, "*");
      }
    }

    function requestMove(from, to, promotion = "q") {
      moveDelay = randomIntBetween(100, config.delay);
      // console.log("request MOVE ");
      // console.log(moveDelay);
      window.postMessage(
        {
          type: "MOVE",
          from,
          to,
          promotion,
          moveDelay,
        },
        "*"
      );
    }

    function highlightMovesOnBoard(moves, side) {
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
          "svg"
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

      // Filtrage des coups si config.winningMove est actif
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

    function getOppElo() {
      // ( 1920 )
      let elo = document.querySelector(".cc-text-medium")?.innerText;
      if (elo) {
        return parseInt(elo.slice(1, -1));
      } else {
        return 3500;
      }
    }

    function getSide() {
      return side_index === 1 ? "white" : "black";
    }

    function checkAndSendMoves() {
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
        _elo_ = getOppElo();

        if (engine) {
          engine.getMoves(fen_, getSide()).then((moves) => {
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
                // console.log("try to auto move*******");
                // [0,2,3,4,5]
                randMove = getRandomElement(moves);
                requestMove(randMove.from, randMove.to);
              }
            }
          });
        }
      }
    }

    setInterval(checkAndSendMoves, 350);

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.config && message.type === "config" && engine) {
        config = message.config;
        saveConfig();
        clearHighlightSquares();
        engine.updateConfig({
          elo: config.skill,
          depth: config.depth,
          multipv: config.lines,
        });

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

        engine.getMoves(fen_, getSide()).then((moves) => {
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
              // console.log("try to auto move******* Config");
              randMove = getRandomElement(moves);
              requestMove(randMove.from, randMove.to);
            }
          }
        });
      }
    });
  }

  /*

  _     _      _                   
 | |   (_) ___| |__   ___  ___ ___ 
 | |   | |/ __| '_ \ / _ \/ __/ __|
 | |___| | (__| | | |  __/\__ \__ \
 |_____|_|\___|_| |_|\___||___/___/
                                   

*/

  if (window.location.hostname.includes("lichess")) {
    loadConfig2();
    let fen_ = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    let evalObj = null;
    let customEval = null;
    const engine = new Engine({
      elo: config.skill,
      depth: 10,
      multipv: config.lines,
      threads: 2,
      hash: 128,
    });

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
          return { x, y };
        }
      }

      function drawArrow(fromSquare, toSquare, color, score) {
        const from = squareToPosition(fromSquare);
        const to = squareToPosition(toSquare);

        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
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

      // Filtrage des coups si config.winningMove est actif
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
      if (!expired) {
        window.postMessage({ type: "FEN" }, "*");
      }
    }

    function inject() {
      const s = document.createElement("script");
      s.src = chrome.runtime.getURL("lib/chess_min.js");
      (document.head || document.documentElement).appendChild(s);
      s.onload = () => s.remove();

      const s2 = document.createElement("script");
      s2.src = chrome.runtime.getURL("b.js");
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
            // console.log(fen_);

            engine.getMoves(fen_, getSide()).then((moves) => {
              chrome.runtime.sendMessage({ type: "FROM_CONTENT", data: moves });
              highlightMovesOnBoard(moves, getSide()[0]);

              if (moves.length > 0 && evalObj) {
                evalObj.update(moves[0].eval, getSide());
              }
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
    }, 350);

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      // console.log(message)
      if (message.type === "config2" && engine) {
        config = message.config;
        // console.log(config)
        saveConfig2();
        clearHighlightSquares();
        engine.updateConfig({
          elo: config.skill,
          depth: config.depth,
          multipv: config.lines,
        });

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

        engine.getMoves(fen_, getSide()).then((moves) => {
          chrome.runtime.sendMessage({ type: "FROM_CONTENT", data: moves });
          highlightMovesOnBoard(moves, getSide()[0]);
          if (moves.length > 0 && evalObj) {
            evalObj.update(moves[0].eval, getSide());
          }
        });
      }
    });
  }
};


