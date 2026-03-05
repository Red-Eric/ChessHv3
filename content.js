const default_fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const apiExpiration =
  "https://api.timezonedb.com/v2.1/list-time-zone?key=WPOK8LWQNYUI&format=json&country=FR";

let debugEngine = false;

let url = window.location.href;

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

function preInjection() {
  const s = document.createElement("script");
  s.src = chrome.runtime.getURL("a.js");
  (document.head || document.documentElement).appendChild(s);
  s.onload = () => s.remove();
}

preInjection();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function squareToPixels(square, boardInfo, orientation = "white") {
  const files = "abcdefgh";
  const file = files.indexOf(square[0]); // e = 4
  const rank = parseInt(square[1], 10) - 1; // 2 -> index 1

  const squareSize = boardInfo.width / 8;

  let x, y;

  if (orientation === "white") {
    x = boardInfo.left + file * squareSize + squareSize / 2;
    y = boardInfo.top + (7 - rank) * squareSize + squareSize / 2;
  } else {
    x = boardInfo.left + (7 - file) * squareSize + squareSize / 2;
    y = boardInfo.top + rank * squareSize + squareSize / 2;
  }

  return { x, y };
}

function countMoves(fenString) {
  const parts = fenString.split("moves");
  if (parts.length < 2) return 0;
  const movesPart = parts[1].trim();
  const movesArray = movesPart.split(/\s+/);
  return movesArray.length;
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
  elo: 3500,
  lines: 5,
  colors: ["#0000ff", "#00ff00", "#FFFF00", "#f97316", "#ff0000"],
  depth: 10,
  delay: 100,
  style: "Default",
  autoMove: false,
  winningMove: false,
  showEval: false,
  onlyShowEval: false,
  key: " ",
};

chrome.storage.local.get(["chessConfig"], (result) => {
  config = result.chessConfig || {
    elo: 3500,
    lines: 5,
    colors: ["#0000ff", "#00ff00", "#FFFF00", "#f97316", "#ff0000"],
    depth: 10,
    delay: 100,
    style: "Default",
    autoMove: false,
    winningMove: false,
    showEval: false,
    onlyShowEval: false,
    key: " ",
  };

  engine.updateConfig(config.lines, config.depth, config.style, config.elo);
});

async function createWorker() {
  const url = `${chrome.runtime.getURL("lib/engine.js")}`;
  const blob = new Blob([`importScripts("${url}");`], {
    type: "application/javascript",
  });
  const blobUrl = URL.createObjectURL(blob);

  return new Worker(blobUrl);
}

async function createWorkerStockfish() {
  const url = `${chrome.runtime.getURL("lib/stockfish.js")}`;
  const blob = new Blob([`importScripts("${url}");`], {
    type: "application/javascript",
  });
  const blobUrl = URL.createObjectURL(blob);

  return new Worker(blobUrl);
}

class Stockfish {
  constructor({
    elo = 3190,
    depth = 10,
    multipv = 5,
    threads = 2,
    hash = 128,
  }) {
    this.elo = elo;
    this.depth = depth;
    this.multipv = multipv;
    this.threads = threads;
    this.hash = hash;
    this.ready = this.init();
  }

  async init() {
    this.worker = await createWorkerStockfish();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  setOptions() {
    this.worker.postMessage(`setoption name UCI_Elo value ${this.elo}`);
    this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);
    this.worker.postMessage(`setoption name UCI_LimitStrength value true`);
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

  hardStop() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  async restartWorker() {
    this.hardStop();
    this.worker = await createWorker();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  async getMovesByFen(fen, side = "white") {
    // await this.ready;
    if (this.multipv > 10) {
      await this.restartWorker();
    }
    const sideToMove = fen.split(" ")[1];

    return new Promise((resolve) => {
      const multipvResults = new Map();
      this.worker.postMessage("uci");

      const onMessage = (event) => {
        const msg = event.data;
        // console.log(msg);
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

            const bestMove = pvMatch[1]; // best Move
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

            multipvResults.set(multipv, {
              from,
              to,
              eval: score,
              fen: fen,
              side: side,
            });
          }
        }

        if (msg.startsWith("bestmove")) {
          this.worker.removeEventListener("message", onMessage);
          resolve(
            Array.from(multipvResults.entries())
              .sort(([a], [b]) => a - b)
              .map(([_, val]) => val),
          );
        }
      };

      this.worker.addEventListener("message", onMessage);
      this.worker.postMessage(`position fen ${fen}`);
      // this.worker.postMessage("stop");
      this.worker.postMessage(`go depth ${this.depth}`);
    });
  }

  async getMovesByUCI(uciString, side, fen) {
    // await this.ready;
    if (this.multipv > 10) {
      await this.restartWorker();
    }
    const sideToMove =
      uciString.split(" moves ")[1].trim().split(/\s+/).length % 2 === 0
        ? "w"
        : "b";

    return new Promise((resolve) => {
      const multipvResults = new Map();
      this.worker.postMessage("uci");

      const onMessage = (event) => {
        const msg = event.data;
        // console.log(msg);
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

            const bestMove = pvMatch[1]; // best Move
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

            multipvResults.set(multipv, {
              from,
              to,
              eval: score,
              fen: fen,
              side: side,
            });
          }
        }

        if (msg.startsWith("bestmove")) {
          this.worker.removeEventListener("message", onMessage);
          resolve(
            Array.from(multipvResults.entries())
              .sort(([a], [b]) => a - b)
              .map(([_, val]) => val),
          );
        }
      };

      this.worker.addEventListener("message", onMessage);
      this.worker.postMessage(`${uciString}`);
      // this.worker.postMessage("stop");
      this.worker.postMessage(`go depth ${this.depth}`);
    });
  }
}

class komodo {
  constructor({
    elo = config.elo,
    depth = config.depth,
    multipv = config.lines,
    threads = 2,
    hash = 128,
    personality = config.style,
  }) {
    this.elo = elo;
    this.depth = depth;
    this.multipv = multipv;
    this.threads = threads;
    this.hash = hash;
    this.personality = personality;
    this.ready = this.init();
  }

  async init() {
    this.worker = await createWorker();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  hardStop() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  async restartWorker() {
    this.hardStop();
    this.worker = await createWorker();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  setOptions() {
    this.worker.postMessage(
      `setoption name Personality value ${this.personality}`,
    );
    this.worker.postMessage("setoption name UCI LimitStrength value true");
    this.worker.postMessage(`setoption name UCI Elo value ${this.elo}`);
    this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);
  }

  updateConfig(lines, depth, style, elo) {
    this.depth = depth;
    this.elo = elo;
    this.personality = style;
    this.multipv = lines;
    this.worker.postMessage(`setoption name Personality value ${this.style}`);
    this.worker.postMessage(`setoption name UCI Elo value ${this.elo}`);
    this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);
  }

  async getMovesByFen(fen, side) {
    // await this.restartWorker();
    // if (this.multipv > 10) {
    //   await this.restartWorker();
    // }

    this.worker.postMessage(`setoption name Personality value ${this.style}`);
    this.worker.postMessage(`setoption name UCI Elo value ${this.elo}`);
    this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);

    const results = [];
    const seenMoves = new Set();
    const infoLines = [];
    let lastDepth = 0;
    const sideToMove = fen.split(" ")[1];

    return new Promise((resolve) => {
      const onMessage = (event) => {
        const line = event.data;
        if (debugEngine) {
          console.log(line);
        }
        //console.log(line);
        if (typeof line !== "string") return;

        /* ---------- BOOK MOVES ---------- */
        if (line.startsWith("info book move")) {
          const p = line.split(" ");
          if (p.length > 4) {
            const move = p[4];
            if (move.length >= 4 && !seenMoves.has(move)) {
              results.push({
                from: move.slice(0, 2),
                to: move.slice(2, 4),
                eval: "book",
                fen: fen,
                side: side,
              });
              seenMoves.add(move);
            }
          }
          return;
        }

        /* ---------- INFO LINES ---------- */
        if (line.startsWith("info")) {
          infoLines.push(line);

          const parts = line.split(" ");
          const depthIndex = parts.indexOf("depth");
          if (depthIndex !== -1 && depthIndex + 1 < parts.length) {
            const d = parseInt(parts[depthIndex + 1], 10);
            if (!isNaN(d)) lastDepth = d;
          }
          return;
        }

        /* ---------- END ---------- */
        if (line.startsWith("bestmove")) {
          this.worker.removeEventListener("message", onMessage);

          for (const infoLine of infoLines) {
            if (!infoLine.includes("multipv") || !infoLine.includes(" pv "))
              continue;
            if (!infoLine.includes(`depth ${lastDepth} `)) continue;

            const parts = infoLine.split(" ");

            const mpvIndex = parts.indexOf("multipv");
            const mpv = mpvIndex !== -1 ? parseInt(parts[mpvIndex + 1], 10) : 1;
            if (mpv > this.multipv) continue;

            /* ---------- SCORE ---------- */
            let evalScore = null;
            const scoreIndex = parts.indexOf("score");
            if (scoreIndex !== -1 && scoreIndex + 2 < parts.length) {
              const type = parts[scoreIndex + 1];
              let value = parseInt(parts[scoreIndex + 2], 10);

              if (!isNaN(value)) {
                if (sideToMove === "b") value = -value;

                if (type === "cp") {
                  const v = (value / 100).toFixed(2);
                  evalScore = value >= 0 ? `+${v}` : `${v}`;
                } else if (type === "mate") {
                  evalScore = `#${value}`;
                }
              }
            }

            /* ---------- MOVE ---------- */
            const pvIndex = parts.indexOf("pv");
            if (pvIndex !== -1 && pvIndex + 1 < parts.length) {
              const move = parts[pvIndex + 1];
              if (move.length >= 4 && !seenMoves.has(move)) {
                results.push({
                  from: move.slice(0, 2),
                  to: move.slice(2, 4),
                  eval: evalScore,
                  fen: fen,
                  side: side,
                });
                seenMoves.add(move);
              }
            }
          }

          resolve(results);
        }
      };

      this.worker.addEventListener("message", onMessage);

      this.worker.postMessage(`stop`);
      this.worker.postMessage(`position fen ${fen}`);
      this.worker.postMessage(`go depth ${this.depth}`);
    });
  }

  async getMovesByUCI(uciString, side, fen) {
    // if (this.multipv > 10) {
    //   await this.restartWorker();
    // }

    const results = [];
    const seenMoves = new Set();
    const infoLines = [];
    let lastDepth = 0;
    const sideToMove =
      uciString.split(" moves ")[1].trim().split(/\s+/).length % 2 === 0
        ? "w"
        : "b";

    return new Promise((resolve) => {
      const onMessage = (event) => {
        const line = event.data;
        if (debugEngine) {
          console.log(line);
        }
        if (typeof line !== "string") return;

        /* ---------- BOOK MOVES ---------- */
        if (line.startsWith("info book move")) {
          const p = line.split(" ");
          if (p.length > 4) {
            const move = p[4];
            if (move.length >= 4 && !seenMoves.has(move)) {
              results.push({
                from: move.slice(0, 2),
                to: move.slice(2, 4),
                eval: "book",
                side: side,
                fen: fen,
              });
              seenMoves.add(move);
            }
          }
          return;
        }

        /* ---------- INFO LINES ---------- */
        if (line.startsWith("info")) {
          infoLines.push(line);

          const parts = line.split(" ");
          const depthIndex = parts.indexOf("depth");
          if (depthIndex !== -1 && depthIndex + 1 < parts.length) {
            const d = parseInt(parts[depthIndex + 1], 10);
            if (!isNaN(d)) lastDepth = d;
          }
          return;
        }

        /* ---------- END ---------- */
        if (line.startsWith("bestmove")) {
          this.worker.removeEventListener("message", onMessage);

          for (const infoLine of infoLines) {
            if (!infoLine.includes("multipv") || !infoLine.includes(" pv "))
              continue;
            if (!infoLine.includes(`depth ${lastDepth} `)) continue;

            const parts = infoLine.split(" ");

            const mpvIndex = parts.indexOf("multipv");
            const mpv = mpvIndex !== -1 ? parseInt(parts[mpvIndex + 1], 10) : 1;
            if (mpv > this.multipv) continue;

            /* ---------- SCORE ---------- */
            let evalScore = null;
            const scoreIndex = parts.indexOf("score");
            if (scoreIndex !== -1 && scoreIndex + 2 < parts.length) {
              const type = parts[scoreIndex + 1];
              let value = parseInt(parts[scoreIndex + 2], 10);

              if (!isNaN(value)) {
                if (sideToMove === "b") value = -value;

                if (type === "cp") {
                  const v = (value / 100).toFixed(2);
                  evalScore = value >= 0 ? `+${v}` : `${v}`;
                } else if (type === "mate") {
                  evalScore = `#${value}`;
                }
              }
            }

            /* ---------- MOVE ---------- */
            const pvIndex = parts.indexOf("pv");
            if (pvIndex !== -1 && pvIndex + 1 < parts.length) {
              const move = parts[pvIndex + 1];
              if (move.length >= 4 && !seenMoves.has(move)) {
                results.push({
                  from: move.slice(0, 2),
                  to: move.slice(2, 4),
                  eval: evalScore,
                  side: side,
                  fen: fen,
                });
                seenMoves.add(move);
              }
            }
          }

          resolve(results);
        }
      };

      this.worker.addEventListener("message", onMessage);
      this.worker.postMessage(`stop`);
      this.worker.postMessage(`${uciString}`);
      this.worker.postMessage(`go depth ${this.depth}`);
    });
  }
}

const engine = new komodo({
  elo: config.elo,
  depth: config.depth,
  multipv: config.lines,
  threads: 2,
  hash: 128,
  personality: config.style,
});

let keyMove = {
  from: "e2",
  to: "e4",
};

const startCheat = () => {
  if (window.location.hostname.includes("chess.com")) {
    let lastFEN = "";
    let isGameOver = false;
    let fen_ = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    let side_index = 1;
    let evalObj = null;

    function createAccuracyDisplay(
      side = "white",
      initialWhiteAcc = 0,
      initialWhiteElo = 0,
      initialBlackAcc = 0,
      initialBlackElo = 0,
    ) {
      const board = document.querySelector("wc-chess-board");
      if (!board) return console.error("Board non trouvé !");

      const lowerSide = side.toLowerCase();
      const upperSide = lowerSide === "white" ? "black" : "white";

      // Inject styles once
      if (!document.getElementById("accuracyStyles")) {
        const style = document.createElement("style");
        style.id = "accuracyStyles";
        style.textContent = `
            #accuracyContainer {
                position: relative;
                width: 100%;
                z-index: 9999;
                pointer-events: none;
                font-family: 'Rajdhani', sans-serif;
            }

            .accuracy-bar {
                position: absolute;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0px;
                padding: 4px 0;
                box-sizing: border-box;
            }

            .accuracy-bar.lower { bottom: 0; }
            .accuracy-bar.upper { top: 0; }

            .accuracy-pill {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 5px 14px;
                border-radius: 4px;
                backdrop-filter: blur(6px);
            }

            .accuracy-pill.side-white {
                background: rgba(255, 255, 255, 0.12);
                border: 1px solid rgba(255, 255, 255, 0.22);
            }

            .accuracy-pill.side-black {
                background: rgba(49, 46, 43, 0.75);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .accuracy-stat {
                display: flex;
                flex-direction: column;
                align-items: center;
                line-height: 1;
            }

            .accuracy-label {
                font-size: 9px;
                font-weight: 700;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                opacity: 0.6;
            }

            .accuracy-value {
                font-size: 15px;
                font-weight: 700;
                letter-spacing: 0.04em;
            }

            .accuracy-pill.side-white .accuracy-label,
            .accuracy-pill.side-white .accuracy-value {
                color: #ffffff;
            }

            .accuracy-pill.side-black .accuracy-label,
            .accuracy-pill.side-black .accuracy-value {
                color: #ffffff;
            }

            .accuracy-divider {
                width: 1px;
                height: 28px;
                background: rgba(255,255,255,0.2);
                margin: 0 2px;
            }

            .accuracy-icon {
                font-size: 13px;
                opacity: 0.7;
                margin-right: 2px;
            }

            .accuracy-value .unit {
                font-size: 10px;
                opacity: 0.7;
                font-weight: 600;
            }

            .acc-glow {
                text-shadow: 0 0 8px rgba(255,255,255,0.3);
            }
        `;
        document.head.appendChild(style);
      }

      const container = document.createElement("div");
      container.id = "accuracyContainer";
      container.style.height = board.offsetHeight + "px";

      function createBar(id, position, colorSide) {
        const bar = document.createElement("div");
        bar.className = `accuracy-bar ${position}`;
        bar.id = id;

        bar.innerHTML = `
            <div class="accuracy-pill side-${colorSide}">
                <span class="accuracy-icon">${colorSide === "white" ? "♔" : "♚"}</span>
                <div class="accuracy-stat">
                    <span class="accuracy-label">Accuracy</span>
                    <span class="accuracy-value acc-glow acc-val">0<span class="unit">%</span></span>
                </div>
                <div class="accuracy-divider"></div>
                <div class="accuracy-stat">
                    <span class="accuracy-label">Est. Elo</span>
                    <span class="accuracy-value elo-val">—</span>
                </div>
            </div>
        `;
        return bar;
      }

      const lowerBar = createBar(`accuracy_${lowerSide}`, "lower", lowerSide);
      const upperBar = createBar(`accuracy_${upperSide}`, "upper", upperSide);

      lowerBar.style.position = "relative";
      lowerBar.style.top =
        document.querySelector("wc-chess-board").offsetHeight + "px";

      window.test = upperBar;
      upperBar.style.position = "relative";
      upperBar.style.top = "-100px";

      container.appendChild(lowerBar);
      container.appendChild(upperBar);
      board.appendChild(container);

      function setBar(bar, acc, elo) {
        bar.querySelector(".acc-val").innerHTML =
          `${acc}<span class="unit">%</span>`;
        bar.querySelector(".elo-val").textContent = elo;
      }

      function update(whiteAcc, whiteElo, blackAcc, blackElo) {
        if (lowerSide === "white") {
          setBar(lowerBar, whiteAcc, whiteElo);
          setBar(upperBar, blackAcc, blackElo);
        } else {
          setBar(lowerBar, blackAcc, blackElo);
          setBar(upperBar, whiteAcc, whiteElo);
        }
      }

      update(
        initialWhiteAcc,
        initialWhiteElo,
        initialBlackAcc,
        initialBlackElo,
      );
      return { update };
    }

    //     const accDisplay = createAccuracyDisplay("white", 85.05, 1250, 78.3, 1200);
    // accDisplay.update(87.2, 1260, 79.5, 1210);

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
      // const s = document.createElement("script");
      // s.src = chrome.runtime.getURL("a.js");
      // (document.head || document.documentElement).appendChild(s);
      // s.onload = () => s.remove();

      window.addEventListener("message", (event) => {
        if (event.source !== window) return;
        if (event.data && event.data.type === "FEN_RESPONSE") {
          fen_ = event.data.fen;
          side_index = event.data.side_;
          isGameOver = event.data.isGameOver;
        }
      });
    }
    inject();

    function requestFen() {
      window.postMessage({ type: "GET_FEN" }, "*");
    }
    function requestMove(from, to, promotion = "q", key = false) {
      key ? (moveDelay = 0) : (moveDelay = randomIntBetween(100, config.delay));
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
      if (config.onlyShowEval) return;

      const parent = document.querySelector("wc-chess-board");
      if (!parent) return;

      const squareSize = parent.offsetWidth / 8;
      const maxMoves = 5;
      let colors = config.colors;

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
          const group = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g",
          );

          const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text",
          );

          text.setAttribute("x", to.x + squareSize);
          text.setAttribute("y", to.y);
          text.setAttribute("font-size", "9");
          text.setAttribute("font-weight", "bold");
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("dominant-baseline", "middle");
          text.setAttribute("fill", color);

          let isNegative = false;
          let displayScore = score;

          const hasHash = score.startsWith("#");
          let raw = hasHash ? score.slice(1) : score;

          if (raw.startsWith("-")) {
            isNegative = true;
            raw = raw.slice(1);
          } else if (raw.startsWith("+")) {
            raw = raw.slice(1);
          }

          displayScore = hasHash ? "#" + raw : raw;
          text.textContent = displayScore;

          group.appendChild(text);
          svg.appendChild(group);

          requestAnimationFrame(() => {
            const bbox = text.getBBox();

            const paddingX = 2;
            const paddingY = 2;

            const rect = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "rect",
            );

            rect.setAttribute("x", bbox.x - paddingX);
            rect.setAttribute("y", bbox.y - paddingY);
            rect.setAttribute("width", bbox.width + paddingX * 2);
            rect.setAttribute("height", bbox.height + paddingY * 2);

            rect.setAttribute("rx", "8");
            rect.setAttribute("ry", "8");

            rect.setAttribute("fill", isNegative ? "#312e2b" : "#ffffff");
            rect.setAttribute("fill-opacity", "0.85");
            rect.setAttribute("stroke", isNegative ? "#000000" : "#cccccc");
            rect.setAttribute("stroke-width", "1");

            group.insertBefore(rect, text);
          });
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

    // key press
    window.onkeyup = (e) => {
      if (e.key === config.key) {
        requestMove(keyMove.from, keyMove.to, "q", true);
      }
    };

    function checkAndSendMoves() {
      requestFen();

      if (!config.showEval && document.querySelector("#customEval")) {
        document.querySelector("#customEval").remove();
        evalObj = null;
      }

      if (!document.querySelector("#customEval") && config.showEval) {
        const boardContainer = document.querySelector(".board");
        if (boardContainer) {
          evalObj = createEvalBar("0.0", getSide());
          // customEval = document.querySelector("#customEval");
        }
      }

      if (lastFEN !== fen_) {
        clearHighlightSquares();
        if (
          (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
          (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
        ) {
          lastFEN = fen_;
          engine.getMovesByFen(fen_, getSide()).then((moves) => {
            chrome.runtime.sendMessage({ type: "FROM_CONTENT", data: moves });
            keyMove.from = moves[0].from;
            keyMove.to = moves[0].to;
            if (config.autoMove) {
              requestMove(moves[0].from, moves[0].to);
            }
            if (moves.length > 0 && evalObj) {
              evalObj.update(moves[0].eval, getSide());
            }
            highlightMovesOnBoard(moves, getSide()[0]);
          });
        }
      }
    }

    setInterval(checkAndSendMoves, interval);

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes.chessConfig) {
        const newConfig = changes.chessConfig.newValue;
        config = newConfig;
        engine.updateConfig(
          config.lines,
          config.depth,
          config.style,
          config.elo + 700,
        );
      }
    });
  }

  if (window.location.hostname.includes("lichess")) {
    chrome.runtime.sendMessage({ type: "ATTACH_DEBUGGER" }, (res) => {
      if (res?.success) {
        console.log("Debugger ready");
      }
    });
    let fen_ = "";
    let evalObj = null;
    let accuracyObj = null;

    function createAccuracyDisplay(
      side = "white",
      initialWhiteAcc = 0,
      initialWhiteElo = 0,
      initialBlackAcc = 0,
      initialBlackElo = 0,
    ) {
      const board = document.querySelector("cg-board");
      if (!board) return console.error("Board non trouvé !");

      const lowerSide = side.toLowerCase();
      const upperSide = lowerSide === "white" ? "black" : "white";

      // Inject styles once
      if (!document.getElementById("accuracyStyles")) {
        const style = document.createElement("style");
        style.id = "accuracyStyles";
        style.textContent = `
            #accuracyContainer {
                position: relative;
                width: 100%;
                z-index: 9999;
                pointer-events: none;
                font-family: 'Rajdhani', sans-serif;
            }

            .accuracy-bar {
                position: absolute;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0px;
                padding: 4px 0;
                box-sizing: border-box;
            }

            .accuracy-bar.lower { bottom: 0; }
            .accuracy-bar.upper { top: 0; }

            .accuracy-pill {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 5px 14px;
                border-radius: 4px;
                backdrop-filter: blur(6px);
            }

            .accuracy-pill.side-white {
                background: rgba(255, 255, 255, 0.12);
                border: 1px solid rgba(255, 255, 255, 0.22);
            }

            .accuracy-pill.side-black {
                background: rgba(49, 46, 43, 0.75);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .accuracy-stat {
                display: flex;
                flex-direction: column;
                align-items: center;
                line-height: 1;
            }

            .accuracy-label {
                font-size: 9px;
                font-weight: 700;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                opacity: 0.6;
            }

            .accuracy-value {
                font-size: 15px;
                font-weight: 700;
                letter-spacing: 0.04em;
            }

            .accuracy-pill.side-white .accuracy-label,
            .accuracy-pill.side-white .accuracy-value {
                color: #ffffff;
            }

            .accuracy-pill.side-black .accuracy-label,
            .accuracy-pill.side-black .accuracy-value {
                color: #ffffff;
            }

            .accuracy-divider {
                width: 1px;
                height: 28px;
                background: rgba(255,255,255,0.2);
                margin: 0 2px;
            }

            .accuracy-icon {
                font-size: 13px;
                opacity: 0.7;
                margin-right: 2px;
            }

            .accuracy-value .unit {
                font-size: 10px;
                opacity: 0.7;
                font-weight: 600;
            }

            .acc-glow {
                text-shadow: 0 0 8px rgba(255,255,255,0.3);
            }
        `;
        document.head.appendChild(style);
      }

      const container = document.createElement("div");
      container.id = "accuracyContainer";
      container.style.height = board.offsetHeight + "px";

      function createBar(id, position, colorSide) {
        const bar = document.createElement("div");
        bar.className = `accuracy-bar ${position}`;
        bar.id = id;

        bar.innerHTML = `
            <div class="accuracy-pill side-${colorSide}">
                <span class="accuracy-icon">${colorSide === "white" ? "♔" : "♚"}</span>
                <div class="accuracy-stat">
                    <span class="accuracy-label">Accuracy</span>
                    <span class="accuracy-value acc-glow acc-val">0<span class="unit">%</span></span>
                </div>
                <div class="accuracy-divider"></div>
                <div class="accuracy-stat">
                    <span class="accuracy-label">Est. Elo</span>
                    <span class="accuracy-value elo-val">—</span>
                </div>
            </div>
        `;
        return bar;
      }

      const lowerBar = createBar(`accuracy_${lowerSide}`, "lower", lowerSide);
      const upperBar = createBar(`accuracy_${upperSide}`, "upper", upperSide);

      lowerBar.style.position = "relative";
      lowerBar.style.top =
        document.querySelector("cg-board").offsetHeight + "px";

      window.test = upperBar;
      upperBar.style.position = "relative";
      upperBar.style.top = "-100px";

      container.appendChild(lowerBar);
      container.appendChild(upperBar);
      board.appendChild(container);

      function setBar(bar, acc, elo) {
        bar.querySelector(".acc-val").innerHTML =
          `${acc}<span class="unit">%</span>`;
        bar.querySelector(".elo-val").textContent = elo;
      }

      function update(whiteAcc, whiteElo, blackAcc, blackElo) {
        if (lowerSide === "white") {
          setBar(lowerBar, whiteAcc, whiteElo);
          setBar(upperBar, blackAcc, blackElo);
        } else {
          setBar(lowerBar, blackAcc, blackElo);
          setBar(upperBar, whiteAcc, whiteElo);
        }
      }

      update(
        initialWhiteAcc,
        initialWhiteElo,
        initialBlackAcc,
        initialBlackElo,
      );
      return { update };
    }

    //     const accDisplay = createAccuracyDisplay("white", 85.05, 1250, 78.3, 1200);
    // accDisplay.update(87.2, 1260, 79.5, 1210);

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
      if (!Array.isArray(moves)) return;

      if (config.onlyShowEval) return;

      const parent = document.querySelector("cg-container");
      if (!parent) return;

      const squareSize = parent.offsetWidth / 8;
      const maxMoves = 5;
      let colors = config.colors;

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
          const group = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g",
          );

          const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text",
          );

          text.setAttribute("x", to.x + squareSize);
          text.setAttribute("y", to.y);
          text.setAttribute("font-size", "9");
          text.setAttribute("font-weight", "bold");
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("dominant-baseline", "middle");
          text.setAttribute("fill", color);

          let isNegative = false;
          let displayScore = score;

          const hasHash = score.startsWith("#");
          let raw = hasHash ? score.slice(1) : score;

          if (raw.startsWith("-")) {
            isNegative = true;
            raw = raw.slice(1);
          } else if (raw.startsWith("+")) {
            raw = raw.slice(1);
          }

          displayScore = hasHash ? "#" + raw : raw;
          text.textContent = displayScore;

          group.appendChild(text);
          svg.appendChild(group);

          requestAnimationFrame(() => {
            const bbox = text.getBBox();

            const paddingX = 2;
            const paddingY = 2;

            const rect = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "rect",
            );

            rect.setAttribute("x", bbox.x - paddingX);
            rect.setAttribute("y", bbox.y - paddingY);
            rect.setAttribute("width", bbox.width + paddingX * 2);
            rect.setAttribute("height", bbox.height + paddingY * 2);

            rect.setAttribute("rx", "8");
            rect.setAttribute("ry", "8");

            rect.setAttribute("fill", isNegative ? "#312e2b" : "#ffffff");
            rect.setAttribute("fill-opacity", "0.85");
            rect.setAttribute("stroke", isNegative ? "#000000" : "#cccccc");
            rect.setAttribute("stroke-width", "1");

            group.insertBefore(rect, text);
          });
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

    async function movePiece(from, to, delay) {
      const fromSquare = from;
      const toSquare = to;
      const moveDelay = delay;

      const board = document.querySelector("cg-board");
      const rect = board.getBoundingClientRect();

      const boardInfo = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };

      chrome.runtime.sendMessage({ type: "BOARD_INFO", boardInfo });
      const coordFrom = squareToPixels(fromSquare, boardInfo, getSide());
      const coordTo = squareToPixels(toSquare, boardInfo, getSide());

      await sleep(moveDelay);

      chrome.runtime.sendMessage({
        type: "DRAG_MOVE",
        fromX: coordFrom.x,
        fromY: coordFrom.y,
        toX: coordTo.x,
        toY: coordTo.y,
      });
    }

    window.onkeyup = async (e) => {
      if (e.key === config.key) {
        await movePiece(keyMove.from, keyMove.to, 0);
      }
    };

    /////////////////////////////////////////////   calculation /////////////////////////////////////////////
    function inject() {
      window.addEventListener("message", (event) => {
        if (event.source !== window) return;
        if (event.data && event.data.type === "FEN_RESPONSE") {
          if (event.data.fen !== fen_) {
            clearHighlightSquares();
            if (
              (getSide()[0] === "w" && event.data.fen.split(" ")[1] === "w") ||
              (getSide()[0] === "b" && event.data.fen.split(" ")[1] === "b")
            ) {
              fen_ = event.data.fen;
              engine.getMovesByFen(fen_, getSide()).then(async (moves) => {
                highlightMovesOnBoard(moves, getSide()[0]);
                keyMove.from = moves[0].from;
                keyMove.to = moves[0].to;
                if (moves.length > 0 && evalObj) {
                  evalObj.update(moves[0].eval, getSide());
                }

                if (moves.length > 0 && config.autoMove) {
                  await movePiece(
                    moves[0].from,
                    moves[0].to,
                    randomIntBetween(0, config.delay),
                  );
                }

                chrome.runtime.sendMessage({
                  type: "FROM_CONTENT",
                  data: moves,
                });
              });
            }
          }
        }
      });
    }

    inject();

    setInterval(() => {
      if (!config.showEval && document.querySelector("#customEval")) {
        document.querySelector("#customEval").remove();
        // customEval = null;
        evalObj = null;
      }

      if (!document.querySelector("#customEval") && config.showEval) {
        const boardContainer = document.querySelector("cg-container");
        if (boardContainer) {
          evalObj = createEvalBar("0.0", getSide());
          // customEval = document.querySelector("#customEval");
        }
      }

      requestFen();
    }, interval);

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes.chessConfig) {
        const newConfig = changes.chessConfig.newValue;
        config = newConfig;
        engine.updateConfig(
          config.lines,
          config.depth,
          config.style,
          config.elo + 700,
        );
      }
    });
  }

  if (window.location.hostname.includes("worldchess")) {
    chrome.runtime.sendMessage({ type: "ATTACH_DEBUGGER" }, (res) => {
      if (res?.success) {
        console.log("Debugger ready");
      }
    });
    let fen_ = "";
    let currentFen = "";
    let evalObj = null;

    function createAccuracyDisplay(
      side = "white",
      initialWhiteAcc = 0,
      initialWhiteElo = 0,
      initialBlackAcc = 0,
      initialBlackElo = 0,
    ) {
      const board = document.querySelector("cg-board").parentNode.parentNode;
      if (!board) return console.error("Board non trouvé !");

      const lowerSide = side.toLowerCase();
      const upperSide = lowerSide === "white" ? "black" : "white";

      // Inject styles once
      if (!document.getElementById("accuracyStyles")) {
        const style = document.createElement("style");
        style.id = "accuracyStyles";
        style.textContent = `
            #accuracyContainer {
                position: relative;
                width: 100%;
                z-index: 9999;
                pointer-events: none;
                font-family: 'Rajdhani', sans-serif;
            }

            .accuracy-bar {
                position: absolute;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0px;
                padding: 4px 0;
                box-sizing: border-box;
            }

            .accuracy-bar.lower { bottom: 0; }
            .accuracy-bar.upper { top: 0; }

            .accuracy-pill {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 5px 14px;
                border-radius: 4px;
                backdrop-filter: blur(6px);
            }

            .accuracy-pill.side-white {
                background: rgba(255, 255, 255, 0.12);
                border: 1px solid rgba(255, 255, 255, 0.22);
            }

            .accuracy-pill.side-black {
                background: rgba(49, 46, 43, 0.75);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .accuracy-stat {
                display: flex;
                flex-direction: column;
                align-items: center;
                line-height: 1;
            }

            .accuracy-label {
                font-size: 9px;
                font-weight: 700;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                opacity: 0.6;
            }

            .accuracy-value {
                font-size: 15px;
                font-weight: 700;
                letter-spacing: 0.04em;
            }

            .accuracy-pill.side-white .accuracy-label,
            .accuracy-pill.side-white .accuracy-value {
                color: #ffffff;
            }

            .accuracy-pill.side-black .accuracy-label,
            .accuracy-pill.side-black .accuracy-value {
                color: #ffffff;
            }

            .accuracy-divider {
                width: 1px;
                height: 28px;
                background: rgba(255,255,255,0.2);
                margin: 0 2px;
            }

            .accuracy-icon {
                font-size: 13px;
                opacity: 0.7;
                margin-right: 2px;
            }

            .accuracy-value .unit {
                font-size: 10px;
                opacity: 0.7;
                font-weight: 600;
            }

            .acc-glow {
                text-shadow: 0 0 8px rgba(255,255,255,0.3);
            }
        `;
        document.head.appendChild(style);
      }

      const container = document.createElement("div");
      container.id = "accuracyContainer";
      container.style.height = board.offsetHeight + "px";

      function createBar(id, position, colorSide) {
        const bar = document.createElement("div");
        bar.className = `accuracy-bar ${position}`;
        bar.id = id;

        bar.innerHTML = `
            <div class="accuracy-pill side-${colorSide}">
                <span class="accuracy-icon">${colorSide === "white" ? "♔" : "♚"}</span>
                <div class="accuracy-stat">
                    <span class="accuracy-label">Accuracy</span>
                    <span class="accuracy-value acc-glow acc-val">0<span class="unit">%</span></span>
                </div>
                <div class="accuracy-divider"></div>
                <div class="accuracy-stat">
                    <span class="accuracy-label">Est. Elo</span>
                    <span class="accuracy-value elo-val">—</span>
                </div>
            </div>
        `;
        return bar;
      }

      const lowerBar = createBar(`accuracy_${lowerSide}`, "lower", lowerSide);
      const upperBar = createBar(`accuracy_${upperSide}`, "upper", upperSide);

      lowerBar.style.position = "relative";
      lowerBar.style.top =
        document.querySelector("cg-board").offsetHeight + "px";

      window.upper = upperBar;
      window.lower = lowerBar;
      upperBar.style.position = "relative";
      upperBar.style.top = "-100px";

      container.appendChild(lowerBar);
      container.appendChild(upperBar);
      board.appendChild(container);

      function setBar(bar, acc, elo) {
        bar.querySelector(".acc-val").innerHTML =
          `${acc}<span class="unit">%</span>`;
        bar.querySelector(".elo-val").textContent = elo;
      }

      function update(whiteAcc, whiteElo, blackAcc, blackElo) {
        if (lowerSide === "white") {
          setBar(lowerBar, whiteAcc, whiteElo);
          setBar(upperBar, blackAcc, blackElo);
        } else {
          setBar(lowerBar, blackAcc, blackElo);
          setBar(upperBar, whiteAcc, whiteElo);
        }
      }

      update(
        initialWhiteAcc,
        initialWhiteElo,
        initialBlackAcc,
        initialBlackElo,
      );
      return { update };
    }

    // const accDisplay = createAccuracyDisplay("white", 85.05, 1250, 78.3, 1200);
    // accDisplay.update(87.2, 1260, 79.5, 1210);

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

      // Si onlyShowEval est activé, on n'affiche rien
      if (config.onlyShowEval) return;

      const parent = document.querySelector("cg-board");

      if (!parent) return;

      const squareSize = parent.offsetWidth / 8;
      const maxMoves = 5;
      let colors = config.colors;

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
          const group = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g",
          );

          const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text",
          );

          text.setAttribute("x", to.x + squareSize);
          text.setAttribute("y", to.y);
          text.setAttribute("font-size", "9");
          text.setAttribute("font-weight", "bold");
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("dominant-baseline", "middle");
          text.setAttribute("fill", color);

          let isNegative = false;
          let displayScore = score;

          const hasHash = score.startsWith("#");
          let raw = hasHash ? score.slice(1) : score;

          if (raw.startsWith("-")) {
            isNegative = true;
            raw = raw.slice(1);
          } else if (raw.startsWith("+")) {
            raw = raw.slice(1);
          }

          displayScore = hasHash ? "#" + raw : raw;
          text.textContent = displayScore;

          group.appendChild(text);
          svg.appendChild(group);

          requestAnimationFrame(() => {
            const bbox = text.getBBox();

            const paddingX = 2;
            const paddingY = 2;

            const rect = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "rect",
            );

            rect.setAttribute("x", bbox.x - paddingX);
            rect.setAttribute("y", bbox.y - paddingY);
            rect.setAttribute("width", bbox.width + paddingX * 2);
            rect.setAttribute("height", bbox.height + paddingY * 2);

            rect.setAttribute("rx", "8");
            rect.setAttribute("ry", "8");

            rect.setAttribute("fill", isNegative ? "#312e2b" : "#ffffff");
            rect.setAttribute("fill-opacity", "0.85");
            rect.setAttribute("stroke", isNegative ? "#000000" : "#cccccc");
            rect.setAttribute("stroke-width", "1");

            group.insertBefore(rect, text);
          });
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

    function createEvalBar(initialScore = "0.0", initialColor = "white") {
      const boardContainer = document.querySelector("cg-board");

      if (!boardContainer) return console.error("Plateau non trouvé !");
      let w_ = boardContainer.offsetWidth;
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

    async function movePiece(from, to, delay) {
      const fromSquare = from;
      const toSquare = to;
      const moveDelay = delay;

      const board = document.querySelector("cg-board");
      const rect = board.getBoundingClientRect();

      const boardInfo = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };

      chrome.runtime.sendMessage({ type: "BOARD_INFO", boardInfo });
      const coordFrom = squareToPixels(fromSquare, boardInfo, getSide());
      const coordTo = squareToPixels(toSquare, boardInfo, getSide());

      await sleep(moveDelay);

      chrome.runtime.sendMessage({
        type: "DRAG_MOVE",
        fromX: coordFrom.x,
        fromY: coordFrom.y,
        toX: coordTo.x,
        toY: coordTo.y,
      });
    }

    window.onkeyup = async (e) => {
      if (e.key === config.key) {
        movePiece(keyMove.from, keyMove.to, 0);
      }
    };

    setInterval(() => {
      // eval bar

      if (!document.querySelector("#customEval") && config.showEval) {
        const boardContainer = document.querySelector("cg-board");
        if (boardContainer) {
          evalObj = createEvalBar("0.0", getSide());
        }
      }

      // Fen
      fen_ = getFEN();
      if (fen_ && fen_ !== currentFen) {
        // console.log(fen_)
        currentFen = fen_;
        clearHighlightSquares();

        if (!config.showEval && document.querySelector("#customEval")) {
          document.querySelector("#customEval").remove();
          evalObj = null;
        }

        if (
          (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
          (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
        ) {
          engine.getMovesByFen(fen_, getSide()).then(async (moves) => {
            keyMove.from = moves[0].from;
            keyMove.to = moves[0].to;
            chrome.runtime.sendMessage({ type: "FROM_CONTENT", data: moves });
            highlightMovesOnBoard(moves, getSide()[0]);

            if (moves.length > 0 && evalObj) {
              evalObj.update(moves[0].eval, getSide());
            }

            if (moves.length > 0 && config.autoMove) {
              movePiece(
                moves[0].from,
                moves[0].to,
                randomIntBetween(0, config.delay),
              );
            }
          });
        }
      }
    }, interval);

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes.chessConfig) {
        const newConfig = changes.chessConfig.newValue;
        config = newConfig;
        engine.updateConfig(
          config.lines,
          config.depth,
          config.style,
          config.elo + 700,
        );
      }
    });
  }
};

const LOCAL_VERSION = "1.2";

let downloadlink = "https://www.youtube.com/@Redson_Eric";

async function checkUpdate() {
  try {
    const url =
      "https://api.github.com/repos/Red-Eric/ChessBot-CDP/contents/ChessKiller/update.json?ref=master";

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        Authorization:
          "Bearer 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",
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }

    const result = await response.json();
    const content = atob(result.content.replace(/\n/g, ""));
    const data = JSON.parse(content);

    if (data.version !== LOCAL_VERSION) {
      downloadlink = data.link;
      return true;
    }

    return false;
  } catch (err) {
    console.error("Erreur fetch:", err);
    return true;
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
      alert("Your ChessHv3 extension is outdated");
      window.open(downloadlink, "_blank");
    }
  }
})();

// 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
