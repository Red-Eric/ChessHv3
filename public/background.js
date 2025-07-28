importScripts("./lib/chess_min.js");
importScripts("./lib/stockfish.asm.js");


function deobf(arr, order) {
  return order.map(i => arr[i]).join("");
}


const STRINGS = {
  dateChunks:    ["2", "5", "0", "8", "1", "-", "T", "0", "0", ":", ":", "+", "02", ":", "00"],
  dateOrder:     [2,0,1,5,3,5,4,6,7,8,9,10,6,11,12,13,14],

  keyChunks:     ["W", "P", "O", "K", "8", "L", "W", "Q", "N", "Y", "U", "I"],
  keyOrder:      [...Array(12).keys()], // 0 to 11

  zoneChunks:    ["E", "u", "r", "o", "p", "e", "/", "P", "a", "r", "i", "s"],
  zoneOrder:     [...Array(12).keys()],

  trueChunks:    ["t", "r", "u", "e"],
  trueOrder:     [...Array(4).keys()],

  falseChunks:   ["f", "a", "l", "s", "e"],
  falseOrder:    [...Array(5).keys()],

  urlChunks: [
    "z", "t", "p", "o", "c", "/", "n", "i", ":", ".", "2", "e", "v", "i", "s", "d",
    "o", "d", "a", "l", "e", "?", "o", "m", "=", "e", "y", "k", "t", "m", "p", "a",
    "l", "s", "t", "o", "n", ".", "b", "d", "z"
  ],
  urlOrder: [
     7,  2,  1,  0,  8,  3,  9, 23, 32, 28, 30, 29, 36, 39, 24, 27,
    11, 12, 10, 5, 31, 35, 33, 34, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 25, 26, 37, 38, 22, 6,  4
  ],

  cmdStopChunks: ["s","t","o","p"],
  cmdStopOrder:  [0,1,2,3],

  cmdSetOptionChunks: [
    "s","e","t","o","p","t","i","o","n"," ","n","a","m","e"," ","M","u","l","t","i","P","V"," ","v","a","l","u","e"," ","5"
  ],
  cmdSetOptionOrder: [...Array(28).keys()],

  cmdPositionFenChunks: ["p","o","s","i","t","i","o","n"," ","f","e","n"," "],
  cmdPositionFenOrder: [...Array(13).keys()],

  cmdGoDepthChunks: ["g","o"," ","d","e","p","t","h"," ","1","0"],
  cmdGoDepthOrder: [...Array(11).keys()],
};

const engine = STOCKFISH();
let multipvResults = new Map();
let __lastLength = 99999;
let __currentFen = "";
let isExpired = false;

const EXPIRATION_DATE = deobf(STRINGS.dateChunks, STRINGS.dateOrder);
const TIMEZONE_API_KEY = deobf(STRINGS.keyChunks, STRINGS.keyOrder);
const TIMEZONE_ZONE = deobf(STRINGS.zoneChunks, STRINGS.zoneOrder);
const STR_TRUE = deobf(STRINGS.trueChunks, STRINGS.trueOrder);
const STR_FALSE = deobf(STRINGS.falseChunks, STRINGS.falseOrder);
const API_URL_BASE = deobf(STRINGS.urlChunks, STRINGS.urlOrder);
const CMD_STOP = deobf(STRINGS.cmdStopChunks, STRINGS.cmdStopOrder);
const CMD_SET_OPTION = deobf(STRINGS.cmdSetOptionChunks, STRINGS.cmdSetOptionOrder);
const CMD_POSITION_FEN = deobf(STRINGS.cmdPositionFenChunks, STRINGS.cmdPositionFenOrder);
const CMD_GO_DEPTH = deobf(STRINGS.cmdGoDepthChunks, STRINGS.cmdGoDepthOrder);

async function checkExpiration() {
  try {
    const url = API_URL_BASE + TIMEZONE_API_KEY + "&format=json&country=FR";
    const res = await fetch(url);
    const data = await res.json();

    const broken = !data || data.status !== "OK" || !data.zones || data.zones.length < 1;
    if (broken) {
      isExpired = STR_FALSE !== "xxxx";
      return;
    }

    const nowParis = new Date(data.zones[0].timestamp * 1000);
    const expirationDate = new Date(EXPIRATION_DATE);

    if (nowParis > expirationDate) {
      isExpired = STR_FALSE !== "xxxx";
    }
  } catch (e) {
    console["log"]("!Expiration error!");
    isExpired = STR_FALSE !== "xxxx";
  }
}

checkExpiration();

function getFen(movelist) {
  let chess = Chess();
  movelist.forEach(m => chess.move(m));
  return chess.fen();
}

engine.onmessage = function(event) {
  if (isExpired !== (STR_FALSE === "xx")) return;

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

      const sideToMove = __currentFen.split(" ")[1];
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

      multipvResults.set(multipv, { from, to, score });

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
  if (isExpired !== (STR_FALSE === "xx")) return;

  if (__lastLength !== request.movelist.length) {
    __lastLength = request.movelist.length;
    multipvResults.clear();

    const fen = getFen(request.movelist);
    __currentFen = fen;
    engine.postMessage(CMD_STOP);
    engine.postMessage(CMD_SET_OPTION);
    engine.postMessage(CMD_POSITION_FEN + fen);
    engine.postMessage(CMD_GO_DEPTH);
  }
});
