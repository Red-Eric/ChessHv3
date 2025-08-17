importScripts("./lib/chess_min.js");
importScripts("./lib/stockfish.asm.js");

const engine = STOCKFISH();
let multipvResults = new Map();
let xxxxx = 99999;
let currentFen = "";
let line = 5;
let depth = 10;

const EXPIRATION_DATE = "2025-08-05";
const TIMEZONE_API_KEY = "WPOK8LWQNYUI";
let isExpired = false;

async function checkExpiration() {
  try {
    const response = await fetch(
      `http://api.timezonedb.com/v2.1/list-time-zone?key=${TIMEZONE_API_KEY}&format=json&country=FR`
    );
    const data = await response.json();

    if (data.status !== "OK" || !data.zones || data.zones.length === 0) {
      isExpired = true;
      return;
    }

    const nowParis = new Date(data.zones[0].timestamp * 1000);
    const expirationDate = new Date(`${EXPIRATION_DATE}T00:00:00+02:00`);

    if (nowParis > expirationDate) {
      isExpired = true;
    }
  } catch (err) {
    console.error("Erreur expiration :", err);
    isExpired = true;
  }
}

checkExpiration();

let legalMoves = 0;

function getFen(movelist) {
  let chess = Chess();
  movelist.forEach((move) => {
    chess.move(move);
  });

  legalMoves = chess.moves().length;

  if (legalMoves >= 5) {
    line = 5;
  } else {
    line = legalMoves;
  }

  return chess.fen();
}

engine.onmessage = function (event) {
  if (isExpired) return;

  const msg = event;
  console.log(msg);

  if (typeof msg === "string" && msg.includes(`info depth ${depth}`)) {
    const multipvMatch = msg.match(/multipv (\d+)/);
    const scoreMatch = msg.match(/score (cp|mate) (-?\d+)/);
    const pvMatch = msg.match(/pv ([a-h][1-8][a-h][1-8][qrbn]?)/);

    if (multipvMatch && scoreMatch && pvMatch) {
      const multipv = parseInt(multipvMatch[1], 10);
      const scoreType = scoreMatch[1];
      let scoreValueRaw = parseInt(scoreMatch[2], 10);
      const bestMove = pvMatch[1];

      const sideToMove = currentFen.split(" ")[1];
      if (sideToMove === "b") {
        scoreValueRaw *= -1;
      }

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

      if (multipvResults.size === line) {
        const bestMoves = Array.from(multipvResults.entries())
          .sort(([a], [b]) => a - b)
          .map(([_, val]) => val);

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

// default option

engine.postMessage(`setoption name MultiPV value ${line}`);
engine.postMessage("setoption name Hash value 1024");
engine.postMessage("setoption name Threads value 16");
engine.postMessage("setoption name Ponder value false");
engine.postMessage("uci");

// {elo: 2800, lines: 5, depth: 15, showArrow: true}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (isExpired) return;

  if (request.type === "position") {
    xxxxx = request.movelist.length;
    multipvResults.clear();

    const fen = getFen(request.movelist);
    currentFen = fen;
    engine.postMessage("stop");

    engine.postMessage(`position fen ${fen}`);
    engine.postMessage(`go depth ${depth}`);
  }

  ////////////////////// COnfiggggggggggggggg

  if (request.type === "config") {
    const config = request.config;
    line = config.lines;
    depth = config.depth;

    engine.postMessage(`setoption name Skill Level value ${config.skill}`);

    engine.postMessage(`setoption name MultiPV value ${request.config.lines}`);
    depth = request.config.depth;

    if (currentFen) {
      engine.postMessage("stop");

      engine.postMessage(`position fen ${currentFen}`);
      engine.postMessage(`go depth ${depth}`);
    }
  }
});
