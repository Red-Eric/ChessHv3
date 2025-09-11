importScripts("./lib/chess_min.js");
importScripts("./lib/stockfish.asm.js");

const engine = STOCKFISH();
let multipvResults = new Map();
let xxxxx = 99999;
let currentFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
let line = 5;
let depth = 10;
let lineConfig = 5;
let autoSkill = false;
let winningMove = false;
let side = "white";
let showEval = false;
let onlyShowEval = false;

const skillToElo = {
  0: 1000,
  1: 1200,
  2: 1350,
  3: 1450,
  4: 1550,
  5: 1650,
  6: 1750,
  7: 1850,
  8: 1950,
  9: 2050,
  10: 2150,
  11: 2250,
  12: 2350,
  13: 2450,
  14: 2550,
  15: 2650,
  16: 2750,
  17: 2850,
  18: 2950,
  19: 3050,
  20: 3200,
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
    console.error(err);
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

engine.onmessage = function (event) {
  if (isExpired) return;

  const msg = event;
  // console.log(msg);

  if (
    typeof msg === "string" &&
    msg.includes(`info depth ${depth}`) &&
    !isExpired
  ) {
    console.log("**** inside ***** on message");
    console.log(msg);
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

          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
              chrome.tabs.sendMessage(tabs[0].id, {
                moves: winningMoves,
                score: winningMoves[0].score,
                showEval: showEval,
                onlyShowEval: onlyShowEval,
              });
              console.log("******** Winning Move *******");
              console.log(winningMove);
            }
          });
        } else {
          const bestMoves = Array.from(multipvResults.entries())
            .sort(([a], [b]) => a - b)
            .map(([_, val]) => val);

          // console.log(bestMoves);
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
              chrome.tabs.sendMessage(tabs[0].id, {
                moves: bestMoves,
                score: bestMoves[0].score,
                showEval: showEval,
                onlyShowEval: onlyShowEval,
              });

              console.log("******** Best Move *******");
              console.log(bestMoves);
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

let current_skill = 20;

const game = new Chess();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (isExpired) return;

  if (request.type === "position" && !isExpired) {
    console.log("*****************position")
    side = request.side;



    multipvResults.clear();
    const fen = request.fen;
    currentFen = fen;

    if (game.load(fen)) {
      legalMoves = game.moves().length; // 10
      if (legalMoves >= lineConfig) {
        // 2
        line = lineConfig;
      } else {
        line = legalMoves;
      }
    } else {
      console.log("FEN invalide !");
      line = 5
    }

    engine.postMessage("stop");

    if (autoSkill) {
      skill_ = eloToSkill(request.elo_);
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
    console.log("*****************Config")
    const config = request.config;
    console.table(config)
    lineConfig = config.lines;
    depth = config.depth;
    showEval = config.showEval;
    onlyShowEval = config.onlyShowEval;
    autoSkill = config.autoSkill;
    winningMove = config.winningMove;
    current_skill = config.skill;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, {
          showEval: showEval,
          onlyShowEval: onlyShowEval,
        });
      }
    });

    engine.postMessage(`setoption name Skill Level value ${current_skill}`);
    engine.postMessage(`setoption name MultiPV value ${request.config.lines}`);

    if (currentFen) {
      if (game.load(currentFen)) {
        l_ = game.moves().length; // 10
        console.log(game.moves())
        if (l_ >= lineConfig) {
          // 2
          line = lineConfig;
          
        } else {
          line = l_;
        }
      } else {
        console.log("FEN invalide !");
        line = 5
      }
      engine.postMessage("stop");

      engine.postMessage(`position fen ${currentFen}`);
      engine.postMessage(`go depth ${depth}`);
    }
  }
});
