importScripts("./lib/chess_min.js");
importScripts("./lib/stockfish.asm.js");

const engine = STOCKFISH();

let multipvResults = new Map();

function getFen(movelist) {
  let chess = Chess();
  movelist.forEach((move) => {
    chess.move(move);
  });
  return chess.fen();
}

engine.onmessage = function (event) {
  const msg = event;

  if (typeof msg === "string" && msg.includes("info depth 10")) {
    const multipvMatch = msg.match(/multipv (\d+)/);
    const scoreMatch = msg.match(/score (cp|mate) (-?\d+)/);
    const pvMatch = msg.match(/pv ([a-h][1-8][a-h][1-8][qrbn]?)/);

    if (multipvMatch && scoreMatch && pvMatch) {
      const multipv = parseInt(multipvMatch[1], 10);
      const scoreType = scoreMatch[1];
      const scoreValueRaw = parseInt(scoreMatch[2], 10);
      const bestMove = pvMatch[1];

      let score;
      if (scoreType === "cp") {
        const value = +(scoreValueRaw / 100).toFixed(2);
        score = value > 0 ? `+${value}` : `${value}`;
      } else if (scoreType === "mate") {
        score = `#${scoreValueRaw}`;
      } else {
        score = "?";
      }

      const from = bestMove.slice(0, 2);
      const to = bestMove.slice(2, 4);

      multipvResults.set(multipv, {
        from,
        to,
        score,
      });

      if (multipvResults.size === 5) {
        const bestMoves = Array.from(multipvResults.entries())
          .sort(([a], [b]) => a - b)
          .map(([_, val]) => val);

        console.log(bestMoves);

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id, { moves: bestMoves });
          }
        });

        multipvResults.clear();
      }
    }
  }
};

let xxxxx = 99999;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (xxxxx !== request.movelist.length) {
    xxxxx = request.movelist.length;
    multipvResults.clear();

    const fen = getFen(request.movelist);

    console.log(fen);
    console.log(request.movelist);

    engine.postMessage("uci");
    engine.postMessage("setoption name MultiPV value 5");
    engine.postMessage("isready");

    engine.postMessage(`position fen ${fen}`);
    engine.postMessage("go depth 10");
  } else {
    console.log("no ");
  }
});
