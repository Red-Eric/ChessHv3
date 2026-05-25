
// place move icon on the board

function placeSVGOnBoard(side, square, svgCode) {
  const board =
    document.querySelector("wc-chess-board") ||
    document.querySelector("cg-board").parentElement;

  if (!board) {
    console.log("no board");
    return;
  }

  const wrapperTmp = document.createElement("div");
  wrapperTmp.innerHTML = svgCode;

  let detectedColor = null;

  const bg = wrapperTmp.querySelector(".icon-background");
  if (bg) {
    detectedColor = bg.getAttribute("fill");
  }

  if (!detectedColor) {
    const anyFill = wrapperTmp.querySelector("[fill]");
    detectedColor = anyFill?.getAttribute("fill") || "#000";
  }

  const rect = board.getBoundingClientRect();
  const boardSize = rect.width;
  const squareSize = boardSize / 8;

  const file = square.charCodeAt(0) - 97;
  const rank = parseInt(square[1]);

  let x, y;

  if (side === "white") {
    x = file * squareSize;
    y = (8 - rank) * squareSize;
  } else {
    x = (7 - file) * squareSize;
    y = (rank - 1) * squareSize;
  }

  const squareContainer = document.createElement("div");
  squareContainer.style.position = "absolute";
  squareContainer.style.left = rect.left + x + squareSize + "px";
  squareContainer.style.top = rect.top + y + "px";
  squareContainer.style.pointerEvents = "none";

  const wrapper = document.createElement("div");
  wrapper.innerHTML = svgCode;

  const svg = wrapper.querySelector("svg");
  svg.style.position = "absolute";
  svg.style.zIndex = "9999";
  svg.style.borderRadius = "50%";
  svg.style.overflow = "visible";

  squareContainer.appendChild(svg);
  document.body.appendChild(squareContainer);

  requestAnimationFrame(() => {
    const box = svg.getBBox();
    const svgW = box.width;
    const svgH = box.height;
    svg.style.left = -svgW / 2 + "px";
    svg.style.top = -svgH / 2 + "px";

    const isBrilliant = detectedColor?.toLowerCase() === "#26c2a3";
    const isGreatFind = detectedColor?.toLowerCase() === "#749bbf";
    const isBlunder = detectedColor?.toLowerCase() === "#fa412d";

    // ─── BRILLIANT : double pulse inversé ────────────────────────────────────
    if (isBrilliant) {
      svg.animate(
        [
          { transform: "scale(1)", offset: 0 },
          { transform: "scale(1.45)", offset: 0.35, easing: "ease-out" },
          { transform: "scale(0.82)", offset: 0.65, easing: "ease-in-out" },
          { transform: "scale(1.1)", offset: 0.82, easing: "ease-out" },
          { transform: "scale(1)", offset: 1 },
        ],
        {
          duration: 700,
          easing: "ease-in",
          fill: "forwards",
        },
      );
    }

    // ─── GREAT FIND : respiration douce ──────────────────────────────────────
    if (isGreatFind) {
      svg.animate(
        [
          { transform: "scale(1)", offset: 0 },
          { transform: "scale(1.1)", offset: 0.2, easing: "ease-in-out" },
          { transform: "scale(1)", offset: 0.4, easing: "ease-in-out" },
          { transform: "scale(1.08)", offset: 0.6, easing: "ease-in-out" },
          { transform: "scale(1)", offset: 0.8, easing: "ease-in-out" },
          { transform: "scale(1.05)", offset: 0.9, easing: "ease-in-out" },
          { transform: "scale(1)", offset: 1 },
        ],
        {
          duration: 2800,
          easing: "ease-in-out",
          fill: "forwards",
        },
      );
    }

    // ─── BLUNDER : chute / bâtiment qui tombe ────────────────────────────────
    if (isBlunder) {
      svg.style.transformOrigin = "bottom center";

      svg.animate(
        [
          { transform: "rotate(0deg)", offset: 0 },
          { transform: "rotate(3deg)", offset: 0.3, easing: "ease-in" },
          { transform: "rotate(7deg)", offset: 0.6, easing: "ease-in" },
          { transform: "rotate(12deg)", offset: 0.8, easing: "ease-out" },
          { transform: "rotate(15deg)", offset: 0.92, easing: "ease-out" },
          { transform: "rotate(16deg)", offset: 1 },
        ],
        {
          duration: 1200,
          easing: "ease-in",
          fill: "forwards",
        },
      );
    }
  });

  if (window.location.host === "www.chess.com") {
    document.querySelectorAll('.highlight[class*="square-"]').forEach((el) => {
      el.style.backgroundColor = detectedColor;
      el.style.opacity = "0.6";
    });
  }

  if (window.location.host === "lichess.org") {
    document.querySelectorAll(".last-move").forEach((el) => {
      el.style.setProperty("background-color", detectedColor, "important");
      el.style.setProperty("opacity", "0.6", "important");
    });
  }
}


// Inject a.js

function preInjection() {
  const s = document.createElement("script");
  s.src = chrome.runtime.getURL("a.js");
  (document.head || document.documentElement).appendChild(s);
  s.onload = () => s.remove();
}

// pause the code for x ms

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


// square to screen position
function squareToPixels(square, boardInfo, orientation = "white") {
  const files = "abcdefgh";
  const file = files.indexOf(square[0]); // e = 4
  const rank = parseInt(square[1], 10) - 1; // 2 -> index 1

  const squareSize = boardInfo.width / 8;

  let x, y;

  if (orientation === "white") {
    x = boardInfo.left + file * squareSize + squareSize / 2;
    y = boardInfo.top + (7 - rank) * squareSize + squareSize / 2;
  } else {
    x = boardInfo.left + (7 - file) * squareSize + squareSize / 2;
    y = boardInfo.top + rank * squareSize + squareSize / 2;
  }

  return { x, y };
}



function randomIntBetween(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// clear the arrows on the board
function clearHighlightSquares() {
  document.querySelectorAll(".customH").forEach((el) => el.remove());
}

// clear move classification icon
function clearHint() {
  const className = "." + classMoveClassification;
  document.querySelectorAll(className).forEach((el) => el.remove());
}


function extractNormalMove(moves, side = "white") {
      const factor = side === "white" ? 1 : -1;

      // 1. BOOK
      const book = moves.find((m) => m.eval === "book");
      if (book) return book;

      // 2. MATE CHECK
      const mates = moves.filter(
        (m) => typeof m.eval === "string" && m.eval.includes("#"),
      );

      if (mates.length > 0) {
        const allMate = mates.length === moves.length;

        if (allMate) {
          return mates.sort((a, b) => {
            const ma = Math.abs(parseInt(a.eval.replace("#", "")));
            const mb = Math.abs(parseInt(b.eval.replace("#", "")));
            return ma - mb;
          })[0];
        }

        const strong = moves
          .filter((m) => typeof m.eval === "string" && !m.eval.includes("#"))
          .map((m) => ({
            ...m,
            score: parseFloat(m.eval) * factor,
          }))
          .filter((m) => !isNaN(m.score));

        const filtered = strong.filter((m) => m.score > 2.5);

        if (filtered.length > 0) {
          return filtered[Math.floor(Math.random() * filtered.length)];
        }
      }

      const normal = moves
        .filter((m) => typeof m.eval === "string" && !m.eval.includes("#"))
        .map((m) => ({
          ...m,
          score: parseFloat(m.eval) * factor,
        }))
        .filter((m) => !isNaN(m.score));

      if (normal.length === 0) return moves[0];

      const sorted = normal.sort((a, b) => b.score - a.score);

      const zone12 = sorted.filter((m) => Math.abs(m.score - 1.0) <= 0.4);
      if (zone12.length > 0) {
        return zone12[Math.floor(Math.random() * zone12.length)];
      }

      const zone0 = sorted.filter((m) => Math.abs(m.score) <= 0.5);
      if (zone0.length > 0) {
        return zone0[Math.floor(Math.random() * zone0.length)];
      }

      const allWinning = normal.every((m) => m.score > 2.5);
      if (allWinning) {
        return normal.sort((a, b) => a.score - b.score)[0];
      }

      return sorted[0];
    }

  
// For dev

async function findInScripts(search) {
    const scripts = [...document.scripts]
        .map(s => s.src)
        .filter(Boolean);

    for (const url of scripts) {
        try {
            const res = await fetch(url);
            const code = await res.text();

            let found = false;
            let index = -1;

            if (search instanceof RegExp) {
                const match = code.match(search);

                if (match) {
                    found = true;
                    index = match.index;
                }
            } else {
                index = code.indexOf(search);

                if (index !== -1) {
                    found = true;
                }
            }

            if (!found) continue;

            const before = code.slice(0, index);

            const line = before.split("\n").length;
            const column = before.split("\n").pop().length;

            console.log("FOUND");
            console.log("URL :", url);
            console.log("LINE :", line);
            console.log("COLUMN :", column);

            console.log(
                code.substring(
                    Math.max(0, index - 200),
                    index + 300
                )
            );

            return {
                url,
                line,
                column,
                index
            };
        } catch (e) {
            console.error(url, e);
        }
    }

    console.log("NOT FOUND");
}