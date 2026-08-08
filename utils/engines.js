async function loadWorkerScript(path) {
  const url = chrome.runtime.getURL(path);
  const res = await fetch(url);
  const code = await res.text();
  const patched = code.replaceAll(
    'const EXTENSION_ID = "chesshV3ID"',
    `const EXTENSION_ID = "${chrome.runtime.id}"`,
  );

  return patched;
}

async function createWorkerStockfish6() {
  const code = await loadWorkerScript("lib/stockfish6.js");

  const blob = new Blob([code], {
    type: "application/javascript",
  });

  return new Worker(URL.createObjectURL(blob));
}

async function createWorkerStockfish11() {
  const code = await loadWorkerScript("lib/stockfish11.js");

  const blob = new Blob([code], {
    type: "application/javascript",
  });

  return new Worker(URL.createObjectURL(blob));
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


class CoachEngine {
  constructor() {
    this.worker = null;
    this.ready = this.init();
    
    // Garde en mémoire la promesse du calcul en cours et un ID unique
    this.currentRequestId = 0;
    this.activeReject = null;
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

    const requestId = ++this.currentRequestId;

    if (this.activeReject) {
      this.activeReject(new Error("CANCELLED"));
      this.activeReject = null;
    }

    return new Promise((resolve, reject) => {
      this.activeReject = reject;

      const onMessage = (e) => {
        if (requestId !== this.currentRequestId) {
          this.worker.removeEventListener("message", onMessage);
          return;
        }

        let raw = e.data;
        let cleanRaw = raw;

        if (typeof cleanRaw === "string" && cleanRaw.startsWith("json ")) {
          cleanRaw = cleanRaw.slice(5).trim();
        } else {
          if (cleanRaw.includes("ABORT")) {
            console.warn("Analyse interrompue par le worker");
          }
        }

        try {
          const data = JSON.parse(cleanRaw);

          

          const last = data?.positions?.[data.positions.length - 1];

          if (!last) return;

          const whiteAccuracy = data?.CAPS?.white?.all;
          const blackAccuracy = data?.CAPS?.black?.all;
          const blackEloRes = data?.reportCard?.black?.effectiveElo;
          const whiteEloRes = data?.reportCard?.white?.effectiveElo;
          
          // Mise à jour des variables globales si nécessaire
          if (typeof stat_0_white !== "undefined") stat_0_white = data?.tallies?.white;
          if (typeof stat_0_black !== "undefined") stat_0_black = data?.tallies?.black;

          const classificationName = last.classificationName;
          const fen = last.fen;
          const audioUrlHash = last?.playedMove?.speech?.[0]?.audioUrlHash;
          const moveLan = last?.playedMove?.moveLan;

          let show_ = false;
          const bestMove = last?.bestMove?.moveLan || "";
          const bestMove_classification = last?.bestMove?.classification;
          

          if (side !== last?.color) {
            show_ = true;
          }

          const res_data = {
            from: bestMove.slice(0, 2),
            to: bestMove.slice(2, 4),
            classification: bestMove_classification,
            show: show_,
            info : {
              tags : last?.bestMove?.insightsTags,
              mateIn : last?.bestMove?.mateIn,
              pv : last?.bestMove?.eval?.pv
            }
          };

          if (!audioUrlHash) return;

          const urlAudio = `${coachs[config.coach].link}${audioUrlHash}.mp3`;

          this.worker.removeEventListener("message", onMessage);
          this.activeReject = null;

          resolve({
            classificationName,
            fen,
            urlAudio,
            moveLan,
            whiteAccuracy,
            whiteElo: whiteEloRes,
            blackAccuracy,
            blackElo: blackEloRes,
            res_data
          });
        } catch (err) {
          // Ignorer les messages non-JSON émis pendant les étapes intermédiaires du worker
        }
      };

      this.worker.addEventListener("message", onMessage);

      // 3. Envoyer la commande Stop pour arrêter l'analyse précédente dans le Worker avant de relancer
      this.send("stop");

      // 4. Mettre à jour la configuration et demander la nouvelle analyse
      this.send(`setoption name UserColor value ${side}`);
      this.send(`setoption name HandleContinuationsDepth value ${config.depth2}`);
      this.send(`setoption name BlackElo value ${blackElo}`);
      this.send(`setoption name WhiteElo value ${whiteElo}`);

      this.send(movesString);
      this.send("fetch analysis");
    }).catch((err) => {
      if (err.message === "CANCELLED") {
        return null; // Annulation silencieuse lorsqu'un coup plus récent est joué
      }
      throw err;
    });
  }
}

class Stockfish6 {
  constructor() {
    this.ready = this.init();
  }

  async init() {
    this.worker = await createWorkerStockfish6();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  setOptions() {
    // this.worker.postMessage(
    //   `setoption name Mobility (Midgame) value ${this.mobilityMid}`,
    // );
    // this.worker.postMessage(
    //   `setoption name Mobility (Endgame) value ${this.mobilityEnd}`,
    // );
    // this.worker.postMessage(
    //   `setoption name Pawn Structure (Midgame) value ${this.pawnStructureMid}`,
    // );
    // this.worker.postMessage(
    //   `setoption name Pawn Structure (Endgame) value ${this.pawnStructureEnd}`,
    // );
    // this.worker.postMessage(
    //   `setoption name Passed Pawns (Midgame) value ${this.passedPawnsMid}`,
    // );
    // this.worker.postMessage(
    //   `setoption name Passed Pawns (Endgame) value ${this.passedPawnsEnd}`,
    // );
    // this.worker.postMessage(
    //   `setoption name King Safety value ${this.kingSafety}`,
    // );
    // this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);
  }

  updateConfig(cfg = {}) {
    Object.assign(this, cfg);
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
    this.worker?.postMessage("quit");
  }

  async restartWorker() {
    this.hardStop();
    this.worker = await createWorkerStockfish6();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  async getMovesByFen(fen, side) {
    await this.ready;

    this.worker.postMessage(
      `setoption name Mobility (Midgame) value ${config.st6_mobilityMid}`,
    );
    this.worker.postMessage(
      `setoption name Mobility (Endgame) value ${config.st6_mobilityEnd}`,
    );

    this.worker.postMessage(
      `setoption name Pawn Structure (Midgame) value ${config.st6_pawnStructureMid}`,
    );
    this.worker.postMessage(
      `setoption name Pawn Structure (Endgame) value ${config.st6_pawnStructureEnd}`,
    );

    this.worker.postMessage(
      `setoption name Passed Pawns (Midgame) value ${config.st6_passedPawnsMid}`,
    );
    this.worker.postMessage(
      `setoption name Passed Pawns (Endgame) value ${config.st6_passedPawnsEnd}`,
    );

    this.worker.postMessage(
      `setoption name King Safety value ${config.st6_kingSafety}`,
    );

    this.worker.postMessage(`setoption name MultiPV value ${config.lines}`);

    const results = [];
    const infoLines = [];
    const seenMoves = new Set();
    let lastDepth = 0;
    const sideToMove = fen.split(" ")[1];

    return new Promise((resolve) => {
      const onMessage = (event) => {
        const line = event.data;
        if (typeof line !== "string") return;

        if (line.startsWith("info")) {
          infoLines.push(line);

          const parts = line.split(" ");
          const depthIndex = parts.indexOf("depth");
          if (depthIndex !== -1) {
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
            if (!infoLine.includes(`depth ${lastDepth}`)) continue;

            const parts = infoLine.split(" ");

            const mpvIndex = parts.indexOf("multipv");
            const mpv = mpvIndex !== -1 ? parseInt(parts[mpvIndex + 1], 10) : 1;
            if (mpv > this.multipv) continue;

            let evalScore = null;
            const scoreIndex = parts.indexOf("score");
            if (scoreIndex !== -1) {
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
            if (pvIndex !== -1 && parts[pvIndex + 1]) {
              const move = parts[pvIndex + 1];

              if (move.length >= 4 && !seenMoves.has(move)) {
                seenMoves.add(move);

                results.push({
                  from: move.slice(0, 2),
                  to: move.slice(2, 4),
                  eval: evalScore,
                  fen,
                  side,
                });
              }
            }
          }

          resolve(results);
        }
      };

      this.worker.addEventListener("message", onMessage);

      this.worker.postMessage(`setoption name MultiPV value ${config.lines}`);

      this.worker.postMessage("stop");
      this.worker.postMessage(`position fen ${fen}`);
      this.worker.postMessage(`go depth ${config.depth}`);
    });
  }
}

class Stockfish11 {
  constructor() {
    this.depth = 5;
    this.multipv = 5;
    this.ready = this.init();
  }

  async init() {
    this.worker = await createWorkerStockfish11();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  setOptions() {
    this.worker.postMessage(`setoption name MultiPV value ${config.lines}`);
    this.worker.postMessage("setoption name Ponder value false");
  }

  updateConfig({ elo, depth, multipv, threads, hash, style }) {
    if (elo !== undefined) this.elo = elo;
    if (depth !== undefined) this.depth = depth;
    if (multipv !== undefined) this.multipv = multipv;
    if (threads !== undefined) this.threads = threads;
    if (hash !== undefined) this.hash = hash;
    if (style !== undefined) this.style = style;
    this.setOptions();
  }

  async getMovesByFen(fen, side = "white") {
    await this.ready;

    this.worker.postMessage(`setoption name MultiPV value ${config.lines}`);
    this.worker.postMessage("setoption name Ponder value false");

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
      this.worker.postMessage("stop");
      this.worker.postMessage(`go depth ${config.depth}`);
    });
  }
}

async function createWorkerMaia3() {
  const code = await loadWorkerScript("lib/maia3/maia3-worker.js");
  const blob = new Blob([code], { type: "application/javascript" });
  return new Worker(URL.createObjectURL(blob));
}

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;

  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

class Maia3 {
  constructor(selfElo = 1500, oppoElo = 1500) {
    this.selfElo = selfElo;
    this.oppoElo = oppoElo;
    this.topN = 5;
    this._inferenceId = 0;
    this._resolvers = {};
    this.ready = this.init();
  }

  async init() {
    // Worker
    this.worker = await createWorkerMaia3();

    // ORT blob URL
    const ortResp = await fetch(chrome.runtime.getURL("lib/ort/ort.min.js"));
    const ortText = await ortResp.text();
    const ortBlob = new Blob([ortText], { type: "application/javascript" });
    const ortRuntimeUrl = URL.createObjectURL(ortBlob);

    // all_moves cache
    const r = await fetch(chrome.runtime.getURL("lib/maia3/all_moves.json"));
    this._allMoves = await r.json();
    this._allMovesDict = {};
    this._allMoves.forEach((m, i) => (this._allMovesDict[m] = i));

    // Message handler permanent
    this.worker.addEventListener("message", (e) => {
      const msg = e.data;

      if (msg.type === "inference-result") {
        const resolve = this._resolvers[msg.id];
        if (resolve) {
          resolve(new Float32Array(msg.logitsMove));
          delete this._resolvers[msg.id];
        }
      }

      if (msg.type === "error" && msg.id != null) {
        const resolve = this._resolvers[msg.id];
        if (resolve) {
          resolve(null);
          delete this._resolvers[msg.id];
        }
      }
    });

    // Init worker engine
    await new Promise((resolve, reject) => {
      const onMsg = (e) => {
        if (e.data.type === "status" && e.data.status === "ready") {
          this.worker.removeEventListener("message", onMsg);
          resolve();
        }
        if (e.data.type === "error" && e.data.id == null) {
          this.worker.removeEventListener("message", onMsg);
          reject(new Error(e.data.message));
        }
      };
      this.worker.addEventListener("message", onMsg);

      this.worker.postMessage({
        type: "init",
        modelUrl: chrome.runtime.getURL("lib/maia3/maia3-5m.onnx"),
        ortBaseUrl: chrome.runtime.getURL("lib/ort/"),
        ortRuntimeUrl: ortRuntimeUrl,
      });
    });
  }

  async getMovesByFen(fen) {
    await this.ready;

    const turn = fen.split(" ")[1];

    // Tokenize
    const boardTokens = tokenizeBoard(fen);
    const tokenFlat = getHistoricalTokens([boardTokens], {
      history: 8,
      include_time_info: false,
    });

    // Inference
    const id = ++this._inferenceId;
    const buf = tokenFlat.buffer.slice(0);

    const logits = await new Promise((resolve) => {
      this._resolvers[id] = resolve;
      this.worker.postMessage(
        {
          type: "inference",
          id,
          tokens: buf,
          eloSelfs: [config.elo],
          eloOppos: [config.elo],
          batchSize: 1,
        },
        [buf],
      );
    });

    if (!logits) throw new Error("Inference échouée");

    // Mask + softmax
    const mask = getLegalMovesMask(fen, this._allMovesDict, turn);
    const masked = new Float32Array(4352);
    for (let i = 0; i < 4352; i++) masked[i] = mask[i] ? logits[i] : -Infinity;

    const finiteVals = masked.filter((v) => isFinite(v));
    const maxL = Math.max(...finiteVals);
    let expSum = 0;
    const probs = new Float32Array(4352);
    for (let i = 0; i < 4352; i++) {
      if (mask[i]) {
        probs[i] = Math.exp(masked[i] - maxL);
        expSum += probs[i];
      }
    }
    for (let i = 0; i < 4352; i++) probs[i] /= expSum;

    const indexed = [];
    for (let i = 0; i < 4352; i++) {
      if (mask[i]) indexed.push({ idx: i, prob: probs[i] });
    }
    indexed.sort((a, b) => b.prob - a.prob);

    return indexed.slice(0, config.lines).map(({ idx, prob }, rank) => {
      const uci = indexToUci(idx, this._allMoves, turn);
      const from = uci.slice(0, 2);
      const to = uci.slice(2, 4);
      return {
        from,
        to,
        eval: ordinal(rank + 1),
        fen,
        rank: rank + 1,
      };
    });
  }
}

class Lozza {
  constructor() {
    this.ready = this.init();
  }

  async init() {
    await this.createWorker();
  }

  async createWorker() {
    if (this.worker) this.worker.terminate();
    const url = chrome.runtime.getURL("lib/lozza.js");
    const blob = new Blob([`importScripts("${url}");`], {
      type: "application/javascript",
    });
    const blobUrl = URL.createObjectURL(blob);
    this.worker = new Worker(blobUrl);
    URL.revokeObjectURL(blobUrl);
  }

  stop() {
    if (this.worker) this.worker.terminate();
  }

  async getMovesByFen(fen, side) {
    await this.ready;
    await this.createWorker();

    return new Promise((resolve) => {
      const onMessage = (e) => {
        const msg = e.data;
        if (
          typeof msg === "string" &&
          msg.toLowerCase().startsWith("bestmove")
        ) {
          this.worker.removeEventListener("message", onMessage);
          const moveParts = msg.split(" ")[1];
          resolve([
            {
              from: moveParts.slice(0, 2),
              to: moveParts.slice(2, 4),
              eval: "1st",
              fen: fen,
              side: side,
            },
          ]);
        }
      };

      this.worker.addEventListener("message", onMessage);
      this.worker.postMessage(`position fen ${fen}`);
      this.worker.postMessage(`go depth ${config.depth}`);
    });
  }
}

class Wukong {
  constructor() {
    this.ready = this.init();
  }

  async init() {
    await this.createWorker();
  }

  async createWorker() {
    if (this.worker) this.worker.terminate();
    const url = chrome.runtime.getURL("lib/wukong.js");
    const blob = new Blob([`importScripts("${url}");`], {
      type: "application/javascript",
    });
    const blobUrl = URL.createObjectURL(blob);
    this.worker = new Worker(blobUrl);
    URL.revokeObjectURL(blobUrl);
  }

  stop() {
    if (this.worker) this.worker.terminate();
  }

  async getMovesByFen(fen, side) {
    await this.ready;
    await this.createWorker();

    return new Promise((resolve) => {
      const onMessage = (e) => {
        const { type, text } = e.data;
        if (type === "log" && text.startsWith("Best move:")) {
          this.worker.removeEventListener("message", onMessage);
          resolve([
            {
              from: text.slice(11, 13),
              to: text.slice(13, 15),
              eval: "1st",
              fen: fen,
              side: side,
            },
          ]);
        }
      };

      this.worker.addEventListener("message", onMessage);
      this.worker.postMessage({ command: `position fen ${fen}` });
      this.worker.postMessage({ command: `go depth ${config.depth}` });
    });
  }
}
