class Engine {
  constructor({ elo = 20, depth = 10, multipv = 5, threads = 2, hash = 128 }) {
    this.elo = elo;
    this.depth = depth;
    this.multipv = multipv;
    this.threads = threads;
    this.hash = hash;
    this.style = 0;
    this.ready = this.init();
  }

  async init() {
    this.worker = new Worker(
  chrome.runtime.getURL("lib/stockfish.js")
);
    this.worker.postMessage("uci");
    this.setOptions();
  }

  setOptions() {
    this.worker.postMessage(`setoption name UCI_Elo value ${this.elo}`);
    this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);
    this.worker.postMessage("setoption name Ponder value false");
    this.worker.postMessage("setoption name UCI_LimitStrength value true");
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

  async getMoves(fen, side = "white") {
    await this.ready;
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
      this.worker.postMessage(`go depth ${this.depth}`);
    });
  }
}

const engine = new Engine({
      elo: 2000,
      depth: 10,
      multipv: 5,
      threads: 2,
      hash: 128,
    });


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.target === "offscreen") {

      if(engine){
        
        engine.getMoves(msg.fen, msg.side).then((moves) => {
          console.log(moves)

          chrome.runtime.sendMessage({
            type : "returnContent",
            moves : moves
          })
        })
      }
        
    }
});


/*

Stockfish 17.1 Lite WASM by the Stockfish developers (see AUTHORS file)
(index):14 id name Stockfish 17.1 Lite WASM
(index):14 id author the Stockfish developers (see AUTHORS file)
(index):14 
(index):14 option name Threads type spin default 1 min 1 max 1
(index):14 option name Hash type spin default 16 min 1 max 33554432
(index):14 option name Clear Hash type button
(index):14 option name Ponder type check default false
(index):14 option name MultiPV type spin default 1 min 1 max 256
(index):14 option name Skill Level type spin default 20 min 0 max 20
(index):14 option name Move Overhead type spin default 10 min 0 max 5000
(index):14 option name nodestime type spin default 0 min 0 max 10000
(index):14 option name UCI_Chess960 type check default false
(index):14 option name UCI_LimitStrength type check default false
(index):14 option name UCI_Elo type spin default 1320 min 1320 max 3190
(index):14 option name UCI_ShowWDL type check default false
(index):14 option name EvalFile type string default nn-9067e33176e8.nnue
(index):14 option name EvalFileSmall type string default <empty>

*/