class komodo {
  constructor({
    elo = 20,
    depth = 10,
    multipv = 5,
    threads = 2,
    hash = 128,
    personality = "Default",
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
    this.worker = new Worker(
      `${chrome.runtime.getURL("lib/engine.js")}#${chrome.runtime.getURL("lib/engine.wasm")}`,
    );
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

  // lines: 3,
  //   depth: 10,
  //   style: "Default",

  updateConfig(lines, depth, style, elo) {
    this.depth = depth;
    this.worker.postMessage(
      `setoption name Personality value ${style}`,
    );
    this.worker.postMessage(`setoption name UCI Elo value ${elo}`);
    this.worker.postMessage(`setoption name MultiPV value ${lines}`);
  }

  async getMoves(fen) {
    await this.ready;

    const results = [];
    const seenMoves = new Set();
    const infoLines = [];
    let lastDepth = 0;
    const sideToMove = fen.split(" ")[1];

    return new Promise((resolve) => {
      const onMessage = (event) => {
        const line = event.data;
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
                });
                seenMoves.add(move);
              }
            }
          }

          this.worker.postMessage("stop");
          resolve(results);
        }
      };

      this.worker.addEventListener("message", onMessage);

      this.worker.postMessage("stop");
      this.worker.postMessage(`position fen ${fen}`);
      this.worker.postMessage(`go depth ${this.depth}`);
    });
  }
}

const engine = new komodo({
  elo: 3500,
  depth: 10,
  multipv: 5,
  threads: 2,
  hash: 128,
  personality: "Default",
});

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.target === "offscreen") {
    if (engine) {
      if (msg.config) {
        let config = msg.config;
        engine.updateConfig(config.lines, config.depth, config.style, config.elo)
      }

      engine.getMoves(msg.fen).then((moves) => {
        // console.log(moves);
        chrome.runtime.sendMessage({
          type: "returnContent",
          moves: moves,
        });
      });
    }
  }
});
