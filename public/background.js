importScripts("./lib/chess_min.js");
importScripts("./lib/stockfish.asm.js");

const engine = STOCKFISH();
let multipvResults = new Map();
let xxxxx = 99999;
let currentFen = "";
let line = 5;
let depth = 10;
let lineConfig = 5;
let autoSkill = false;
let winningMove = false;
let side = "white";

const skillToElo = {
  0: 1350,
  1: 1400,
  2: 1450,
  3: 1500,
  4: 1600,
  5: 1700,
  6: 1800,
  7: 1900,
  8: 2000,
  9: 2100,
  10: 2200,
  11: 2300,
  12: 2400,
  13: 2600,
  14: 2800,
  15: 3000,
  16: 3200,
  17: 3300,
  18: 3400,
  19: 3450,
  20: 3500,
};

const EXPIRATION_DATE = "2025-10-25";
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

function eloToSkill(elo) {
  let closestSkill = null;
  let closestElo = Infinity;

  for (const [skill, skillElo] of Object.entries(skillToElo)) {
    const diff = skillElo - elo;
    if (diff >= 0 && diff < closestElo) {
      // plus proche supérieur ou égal
      closestElo = diff;
      closestSkill = Number(skill);
    }
  }

  return closestSkill;
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
    line = lineConfig;
  } else {
    line = legalMoves;
  }

  return chess.fen();
}

/*
autoSkill =false
depth = 13
lines = 4
skill = 15
winningMove = false
*/

engine.onmessage = function (event) {
  if (isExpired) return;

  const msg = event;
  console.log(msg);

  if (
    typeof msg === "string" &&
    msg.includes(`info depth ${depth}`) &&
    !isExpired
  ) {
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

      // if (multipvResults.size === line) {
      //   if (winningMove) {
      //   } else {
      //     const bestMoves = Array.from(multipvResults.entries())
      //       .sort(([a], [b]) => a - b)
      //       .map(([_, val]) => val);

      //     console.log(bestMoves);
      //     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      //       if (tabs.length > 0) {
      //         chrome.tabs.sendMessage(tabs[0].id, { moves: bestMoves });
      //       }
      //     });
      //   }

      //   multipvResults.clear();
      // }

      if (multipvResults.size === line) {
        if (winningMove) {
          const bestMoves = Array.from(multipvResults.entries())
            .sort(([a], [b]) => a - b)
            .map(([_, val]) => val);

          const winningMoves = bestMoves.filter((move) => {
            const score = move.score;
            if (score.startsWith("#")) {
              const mateValue = parseInt(score.replace("#", ""), 10);
              if (side === "white") return mateValue > 0;
              if (side === "black") return mateValue < 0;
            } else {

              const numericScore = parseFloat(score);
              if (side === "white") return numericScore >= 2;
              if (side === "black") return numericScore <= -2;
            }
            return false;
          });

          console.log(winningMoves);
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
              chrome.tabs.sendMessage(tabs[0].id, { moves: winningMoves });
            }
          });
        } else {
          const bestMoves = Array.from(multipvResults.entries())
            .sort(([a], [b]) => a - b)
            .map(([_, val]) => val);

          console.log(bestMoves);
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
              chrome.tabs.sendMessage(tabs[0].id, { moves: bestMoves });
            }
          });
        }

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

/*
autoSkill =false
depth = 13
lines = 4
skill = 15
winningMove = false
[
{from: 'c2', to: 'c3', score: '+0.12'},
{from: 'b2', to: 'b3', score: '+0.09'},
{from: 'f1', to: 'd1', score: '+0.04'},
{from: 'h2', to: 'h3', score: '-0.42'},
{from: 'e5', to: 'c6', score: '-0.63'}
]


*/

let current_skill = 20;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (isExpired) return;

  if (request.type === "position" && !isExpired) {
    xxxxx = request.movelist.length;
    side = request.side;
    multipvResults.clear();
    const fen = getFen(request.movelist);
    currentFen = fen;
    engine.postMessage("stop");

    if (autoSkill) {
      skill_ = eloToSkill(request.elo_);
      console.log("Elo adaptatif");
      console.log(skill_);
      engine.postMessage(`setoption name Skill Level value ${skill_}`);
      engine.postMessage(`position fen ${fen}`);
      engine.postMessage(`go depth ${depth}`);
    } else {
      engine.postMessage(`setoption name Skill Level value ${current_skill}`);
      engine.postMessage(`position fen ${fen}`);
      engine.postMessage(`go depth ${depth}`);
    }
  }
  ////////////////////// COnfiggggggggggggggg

  if (request.type === "config" && !isExpired) {
    const config = request.config;
    lineConfig = config.lines;
    depth = config.depth;

    autoSkill = config.autoSkill;
    winningMove = config.winningMove;
    current_skill = config.skill;

    engine.postMessage(`setoption name Skill Level value ${current_skill}`);

    engine.postMessage(`setoption name MultiPV value ${request.config.lines}`);

    if (currentFen) {
      engine.postMessage("stop");

      engine.postMessage(`position fen ${currentFen}`);
      engine.postMessage(`go depth ${depth}`);
    }
  }
});
