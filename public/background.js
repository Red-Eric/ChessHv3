importScripts("./lib/chess_min.js");
importScripts("./lib/stockfish.asm.js");

const engine = STOCKFISH();
let multipvResults = new Map();
let xxxxx = 99999;
let currentFen = "";

const EXPIRATION_DATE = "2025-08-15";
const TIMEZONE_API_KEY = "WPOK8LWQNYUI";
let isExpired = false;

async function checkExpiration() {
  try {
    const response = await fetch(`http://api.timezonedb.com/v2.1/list-time-zone?key=${TIMEZONE_API_KEY}&format=json&country=FR`);
    const data = await response.json();

    if (data.status !== "OK") {
      return;
    }

    const zone = data.zones.find(z => z.zoneName === "Europe/Paris");
    if (!zone) {
      console.error("Zone Europe/Paris introuvable");
      return;
    }

    const nowParis = new Date(zone.timestamp * 1000);
    const expirationDate = new Date(`${EXPIRATION_DATE}T00:00:00+02:00`);

    if (nowParis > expirationDate) {
      isExpired = true;
    } else {

    }
  } catch (err) {
    console.error("Erreur expiration :", err);
  }
}

checkExpiration();

function getFen(movelist) {
  let chess = Chess();
  movelist.forEach((move) => {
    chess.move(move);
  });
  return chess.fen();
}

engine.onmessage = function (event) {
  if (isExpired) return;

  const msg = event;

  if (typeof msg === "string" && msg.includes("info depth 10")) {
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

      if (multipvResults.size >= 1) {
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (isExpired) return;

  if (xxxxx !== request.movelist.length) {
    xxxxx = request.movelist.length;
    multipvResults.clear();

    const fen = getFen(request.movelist);
    currentFen = fen;
    engine.postMessage("stop");
    engine.postMessage("setoption name MultiPV value 5");
    engine.postMessage(`position fen ${fen}`);
    engine.postMessage("go depth 10");
  }
});
