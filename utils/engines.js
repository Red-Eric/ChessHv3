async function loadWorkerScript(path) {
  const url = chrome.runtime.getURL(path);
  const res = await fetch(url);
  const code = await res.text();
  const patched = code.replaceAll(
    'const EXTENSION_ID = "chesshV3ID"',
    `const EXTENSION_ID = "${chrome.runtime.id}"`
  );

  return patched;
}

// create webworker for komodo
async function createWorkerKomodo() {
  const code = await loadWorkerScript("lib/komodo.js");

  const blob = new Blob([code], {
    type: "application/javascript",
  });

  return new Worker(URL.createObjectURL(blob));
}

// create webworker for torch (coach)
async function createWorkerTorch() {
  const code = await loadWorkerScript("lib/torch.js");

  const blob = new Blob([code], {
    type: "application/javascript",
  });

  return new Worker(URL.createObjectURL(blob));
}

// Komodo instance
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
    this.worker = await createWorkerKomodo();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  hardStop() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
  quit() {
    this.hardStop();
    this.worker.postMessage("quit");
  }

  async restartWorker() {
    this.hardStop();
    this.worker = await createWorkerKomodo();
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
    this.worker.postMessage(
      `setoption name Personality value ${this.personality}`,
    );
    this.worker.postMessage(`setoption name UCI Elo value ${this.elo}`);
    this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);
  }

  async getMovesByFen(fen, side) {
    // this.worker.postMessage(`setoption name Auto Skill value true`);

    this.worker.postMessage(
      `setoption name Personality value ${this.personality}`,
    );
    this.worker.postMessage(`setoption name UCI Elo value ${config.elo}`);
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

        if (line.startsWith("bestmove")) {
          const parts = line.split(" ");

          if (line.split("ponder")[1] === " ") {
            const from = line.split(" ")[1].slice(0, 2);
            const to = line.split(" ")[1].slice(2);
            results.push({
              from: from,
              to: to,
              eval: "book",
              fen: fen,
              side: side,
            });

            this.worker.removeEventListener("message", onMessage);
            resolve(results);
            return;
          }
        }

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
}

// coach engine
class CoachEngine {
  constructor() {
    this.worker = null;
    this.ready = this.init();
  }

  async init() {
    this.worker = await createWorkerTorch();
    this.setup();
  }

  hardStop() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  async restartWorker() {
    this.hardStop();
    this.worker = await createWorkerTorch();
    this.setup();
  }

  send(cmd) {
    if (this.worker) {
      this.worker.postMessage(cmd);
    }
  }

  setup() {
    // default setting for analysis
    this.send("setoption name UseDeclarativePositionCommand value true");
    this.send("setoption name BlackElo value 3200");
    this.send("setoption name WhiteElo value 3200");
    this.send("setoption name HandleContinuations value true");
    this.send(`setoption name HandleContinuationsDepth value ${config.depth2}`);
    this.send("setoption name UserColor value white");
    this.send("setoption name BotChatPrioritizePlayerMove value true");
    this.send("setoption name SerializeSpeechDetails value true");
    this.send("setoption name AllowBoardEventsWithoutSpeech value true");
    this.send("setoption name ServeCommandV2 value true");
    this.send("setoption name SpeechV3 value true");
    this.send("setoption name ClassificationV3 value true");
    this.send("setoption name UCI_Chess960 value false");
    this.send("setoption name UseRatingRanges value true");
    this.send(`setoption name Language value ${coachs[config.coach].lang}`);
    this.send(coachs[config.coach].cmd);
    this.send(`setoption name Language value ${coachs[config.coach].lang}`);
  }

  async getChat(movesString, side = "white", whiteElo = 3200, blackElo = 3200) {
    if (config.coach === 999) return null;

    await this.ready;
    if (!this.worker) throw new Error("Engine non initialisé");

    return new Promise((resolve) => {
      const onMessage = (e) => {
        let raw = e.data;
        let cleanRaw = raw;

        if (typeof cleanRaw === "string" && cleanRaw.startsWith("json ")) {
          cleanRaw = cleanRaw.slice(5).trim();
        } else {
          console.clear();
          if (cleanRaw.includes("ABORD")) {
            alert("crash");
          }
        }

        try {
          const data = JSON.parse(cleanRaw);
          const last = data?.positions?.[data.positions.length - 1];
          const whiteAccuracy = data?.CAPS.white.all;
          const blackAccuracy = data?.CAPS.black.all;
          const blackElo = data?.reportCard.black.effectiveElo;
          const whiteElo = data?.reportCard.white.effectiveElo;
          stat_0_white = data?.tallies?.white;
          stat_0_black = data?.tallies?.black;

          if (!last) return;

          const classificationName = last.classificationName;
          const fen = last.fen;
          const audioUrlHash = last?.playedMove?.speech?.[0]?.audioUrlHash;
          const moveLan = last?.playedMove?.moveLan;
          if (!audioUrlHash) return;

          const urlAudio = `${coachs[config.coach].link}${audioUrlHash}.mp3`;

          this.worker.removeEventListener("message", onMessage);

          resolve({
            classificationName,
            fen,
            urlAudio,
            moveLan,
            whiteAccuracy,
            whiteElo,
            blackAccuracy,
            blackElo,
          });
        } catch (err) {}
      };

      this.worker.addEventListener("message", onMessage);

      this.send(`setoption name UserColor value ${side}`);
      this.send(
        `setoption name HandleContinuationsDepth value ${config.depth2}`,
      );
      this.send(`setoption name BlackElo value ${blackElo}`);
      this.send(`setoption name WhiteElo value ${whiteElo}`);

      this.send(movesString);
      this.send("fetch analysis");
    });
  }
}
