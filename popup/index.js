document.addEventListener("DOMContentLoaded", () => {
  chrome?.runtime?.sendMessage({ type: "popupReady" });
});

var bookSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="" width="24" height="24" viewBox="0 0 18 19">
      <g id="book">
    <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
    <path class="icon-background" fill="#D5A47D" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    <g>
      <path class="icon-component-shadow" opacity="0.3" isolation="isolate" d="M8.45,5.9c-1-.75-2.51-1.09-4.83-1.09H2.54v8.71H3.62a8.16,8.16,0,0,1,4.83,1.17Z"></path>
      <path class="icon-component-shadow" opacity="0.3" isolation="isolate" d="M9.54,14.69a8.14,8.14,0,0,1,4.84-1.17h1.08V4.81H14.38c-2.31,0-3.81.34-4.84,1.09Z"></path>
      <path class="icon-component" fill="#fff" d="M8.45,5.4c-1-.75-2.51-1.09-4.83-1.09H3V13h.58a8.09,8.09,0,0,1,4.83,1.17Z"></path>
      <path class="icon-component" fill="#fff" d="M9.54,14.19A8.14,8.14,0,0,1,14.38,13H15V4.31h-.58c-2.31,0-3.81.34-4.84,1.09Z"></path>
    </g>
  </g>
    </svg>`;

/* ================= TABS ================= */
document.querySelectorAll(".tab").forEach((tab) => {
  tab.onclick = () => {
    document
      .querySelectorAll(".tab, .panel, #stream")
      .forEach((e) => e.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.panel).classList.add("active");
  };
});

const el = (id) => document.getElementById(id);

/* ================= CHESS.COM ================= */

const defaultChessConfig = {
  elo: 3500,
  lines: 5,
  colors: ["#0000ff", "#00ff00", "#FFFF00", "#f97316", "#ff0000"],
  depth: 10,
  delay: 100,
  style: "Default",
  autoMove: false,
  autoMoveBalanced : false,
  stat: false,
  autoStart: false,
  winningMove: false,
  showEval: false,
  onlyShowEval: false,
  key: " ",
};

var chessConfig = { ...defaultChessConfig };

function loadChessConfig(callback) {
  chrome.storage.local.get(["chessConfig"], function (result) {
    const savedConfig = result.chessConfig;

    if (savedConfig) {
      chessConfig = { ...defaultChessConfig, ...savedConfig };
    } else {
      chessConfig = { ...defaultChessConfig };
    }

    updateChessUI();

    if (callback) callback();
  });
}

function saveChessConfig() {
  chrome.storage.local.set({ chessConfig }, function () {
    console.log("Config sauvegardée !");
  });
}

function hideExtraColorInputs(lines) {
  const allInputs = document.querySelectorAll('input[type="color"]');
  allInputs.forEach((input, index) => {
    input.parentElement.style.display = index >= lines ? "none" : "";
  });
}

function updateChessUI() {
  ["elo", "lines", "depth", "delay"].forEach(
    (k) => (el(k).value = chessConfig[k]),
  );
  el("style").value = chessConfig.style;
  el("key").value = chessConfig.key;

  [
    "autoMove",
    "stat",
    "winningMove",
    "autoStart",
    "showEval",
    "onlyShowEval",
    "autoMoveBalanced",
  ].forEach((k) => (el(k).checked = chessConfig[k]));

  el("eloValue").textContent = chessConfig.elo;
  el("linesValue").textContent = chessConfig.lines;
  el("depthValue").textContent = chessConfig.depth;
  el("delayValue").textContent = chessConfig.delay;

  el("autoMoveLabel").textContent =
    `Auto Move (${chessConfig.autoMove ? "ON" : "OFF"})`;
  el("autoMoveBalancedLabel").textContent =
    `Balanced Auto Move (${chessConfig.autoMove ? "ON" : "OFF"})`;
  el("autoStartLabel").textContent =
    `Auto Start Game (${chessConfig.autoStart ? "ON" : "OFF"})`;
  el("statLabel").textContent =
    `Display accuracy and Elo estimation (${chessConfig.stat ? "ON" : "OFF"})`;
  el("winningMoveLabel").textContent =
    `Only Moves That Gain Material (${chessConfig.winningMove ? "ON" : "OFF"})`;
  el("showEvalLabel").textContent =
    `Show Eval Bar (${chessConfig.showEval ? "ON" : "OFF"})`;
  el("onlyShowEvalLabel").textContent =
    `Hide Arrows (${chessConfig.onlyShowEval ? "ON" : "OFF"})`;

  console.clear();
  console.log(chessConfig);
  hideExtraColorInputs(chessConfig.lines);
}

// Sauvegarder la config
function saveChess() {
  saveChessConfig();
}

// Charger la config et mettre à jour l'UI
loadChessConfig(updateChessUI);

/* ================= INPUT HANDLERS ================= */
["elo", "lines", "depth", "delay"].forEach((k) => {
  el(k).oninput = (e) => {
    chessConfig[k] = +e.target.value;
    updateChessUI();
    saveChess();
  };
});

[
  "autoMove",
  "stat",
  "winningMove",
  "autoStart",
  "showEval",
  "onlyShowEval",
  "autoMoveBalanced",
].forEach((k) => {
  el(k).onchange = (e) => {
    chessConfig[k] = e.target.checked;
    updateChessUI();
    saveChess();
  };
});

el("style").onchange = (e) => {
  chessConfig.style = e.target.value;
  updateChessUI();
  saveChess();
};

el("key").onchange = (e) => {
  chessConfig.key = e.target.value;
  updateChessUI();
  saveChess();
};

const allColorInputs = document.querySelectorAll('input[type="color"]');
allColorInputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    chessConfig.colors[index] = e.target.value;
    updateChessUI();
    saveChess();
  });
});

/* ================= LOAD SETTINGS TAB ================= */
el("loadBtn").onclick = () => {
  const raw = el("loadInput").value.trim();
  const feedback = el("loadFeedback");

  if (!raw) {
    feedback.textContent = "⚠ Paste a JSON config first.";
    feedback.className = "load-feedback error";
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    chessConfig = { ...defaultChessConfig, ...parsed };
    saveChessConfig();
    updateChessUI();
    feedback.textContent = "✓ Config loaded successfully!";
    feedback.className = "load-feedback success";
    el("loadInput").value = "";
  } catch (e) {
    feedback.textContent = "✗ Invalid JSON. Please check your config.";
    feedback.className = "load-feedback error";
  }
};

/* ================= EXPORT TAB ================= */
el("exportBtn").onclick = () => {
  const json = JSON.stringify(chessConfig, null, 2);
  el("exportOutput").textContent = json;
  el("exportOutput").style.display = "block";
  el("copyBtn").style.display = "inline-block";
};

el("copyBtn").onclick = () => {
  const text = el("exportOutput").textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = el("copyBtn");
    const original = btn.textContent;
    btn.textContent = "✓ Copied!";
    setTimeout(() => (btn.textContent = original), 1500);
  });
};

//// Board

let config = {
  position: "start",
};

var board = Chessboard("board1", config);
var dataTest = [
        {
                "from": "d8",
                "to": "d6",
                "eval": "+2.83",
                "fen": "2rqr1k1/pp4pp/2n1bp2/8/3P4/P4NPP/1B2B1P1/2RQ1RK1 b - - 0 19",
                "side": "white"
        },
        {
                "from": "g8",
                "to": "h8",
                "eval": "+3.11",
                "fen": "2rqr1k1/pp4pp/2n1bp2/8/3P4/P4NPP/1B2B1P1/2RQ1RK1 b - - 0 19",
                "side": "white"
        },
        {
                "from": "d8",
                "to": "b6",
                "eval": "+3.12",
                "fen": "2rqr1k1/pp4pp/2n1bp2/8/3P4/P4NPP/1B2B1P1/2RQ1RK1 b - - 0 19",
                "side": "white"
        },
        {
                "from": "e6",
                "to": "d5",
                "eval": "+3.14",
                "fen": "2rqr1k1/pp4pp/2n1bp2/8/3P4/P4NPP/1B2B1P1/2RQ1RK1 b - - 0 19",
                "side": "white"
        },
        {
                "from": "d8",
                "to": "c7",
                "eval": "+3.30",
                "fen": "2rqr1k1/pp4pp/2n1bp2/8/3P4/P4NPP/1B2B1P1/2RQ1RK1 b - - 0 19",
                "side": "white"
        }
]
var updateEval = (scoreStr, color = "white") => {
  const top = document.getElementById("evalTop");
  const bottom = document.getElementById("evalBottom");
  const text = document.getElementById("evalScore");

  if (!top || !bottom || !text) return;

  let score = 0;
  let mate = false;
  let percent = 50;

  if (scoreStr) {
    scoreStr = scoreStr.trim();
    if (scoreStr.startsWith("#")) {
      mate = true;
      score = parseFloat(scoreStr.slice(1).replace("+", "")) || 0;
    } else {
      score = parseFloat(scoreStr.replace("+", "")) || 0;
    }
  }

  if (mate) {
    const sign = score > 0 ? "+" : "-";
    text.textContent = "#" + sign + Math.abs(score);
    percent =
      (score > 0 && color === "white") || (score < 0 && color === "black")
        ? 100
        : 0;
  } else {
    const sign = score > 0 ? "+" : "";
    text.textContent = sign + score.toFixed(1);
    const s = color === "black" ? -score : score;
    percent = s >= 7 ? 90 : s <= -7 ? 10 : 50 + (s / 7) * 40;
  }

  if (color === "white") {
    top.style.background = "#312e2b";
    bottom.style.background = "#ffffff";
  } else {
    top.style.background = "#ffffff";
    bottom.style.background = "#312e2b";
  }

  top.style.height = 100 - percent + "%";
  bottom.style.height = percent + "%";
}

var clearHighlightSquares = () => {
  document.querySelectorAll(".customH").forEach((el) => el.remove());
}


var highlightMovesOnBoard = (moves, side) => {
      // console.log(side);
      if (!Array.isArray(moves)) return;
      if (
        !(
          (side === "w" && moves[0].fen.split(" ")[1] === "w") ||
          (side === "b" && moves[0].fen.split(" ")[1] === "b")
        )
      ) {
        return;
      }
      if (config.onlyShowEval) return;

      const parent = document.querySelector('[class^="chessboard"]');
      if (!parent) return;

      const squareSize = parent.offsetWidth / 8;
      const maxMoves = 5;
      let colors = chessConfig.colors;

      parent.querySelectorAll(".customH").forEach((el) => el.remove());

      function squareToPosition(square) {
        const fileChar = square[0];
        const rankChar = square[1];
        const rank = parseInt(rankChar, 10) - 1;

        let file;
        if (side === "w") {
          file = fileChar.charCodeAt(0) - "a".charCodeAt(0);
          const y = (7 - rank) * squareSize;
          const x = file * squareSize;
          return { x, y };
        } else {
          file = "h".charCodeAt(0) - fileChar.charCodeAt(0);
          const y = rank * squareSize;
          const x = file * squareSize;
          return { x, y };
        }
      }

      function drawArrow(fromSquare, toSquare, color, score) {
        const from = squareToPosition(fromSquare);
        const to = squareToPosition(toSquare);

        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg",
        );
        svg.setAttribute("class", "customH");
        svg.setAttribute("width", parent.offsetWidth);
        svg.setAttribute("height", parent.offsetWidth);
        svg.style.position = "absolute";
        svg.style.left = "0";
        svg.style.top = "0";
        svg.style.pointerEvents = "none";
        svg.style.overflow = "visible";
        svg.style.zIndex = "10";

        const defs = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "defs",
        );
        const marker = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "marker",
        );
        marker.setAttribute("id", `arrowhead-${color}`);
        marker.setAttribute("markerWidth", "3.5");
        marker.setAttribute("markerHeight", "2.5");
        marker.setAttribute("refX", "1.75");
        marker.setAttribute("refY", "1.25");
        marker.setAttribute("orient", "auto");
        marker.setAttribute("markerUnits", "strokeWidth");

        const arrowPath = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        arrowPath.setAttribute("d", "M0,0 L3.5,1.25 L0,2.5 Z");
        arrowPath.setAttribute("fill", color);
        marker.appendChild(arrowPath);
        defs.appendChild(marker);
        svg.appendChild(defs);

        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );
        line.setAttribute("x1", from.x + squareSize / 2);
        line.setAttribute("y1", from.y + squareSize / 2);
        line.setAttribute("x2", to.x + squareSize / 2);
        line.setAttribute("y2", to.y + squareSize / 2);
        line.setAttribute("stroke", color);
        line.setAttribute("stroke-width", "5");
        line.setAttribute("marker-end", `url(#arrowhead-${color})`);
        line.setAttribute("opacity", "0.6");
        svg.appendChild(line);

        if (score !== undefined) {
          if (score === "book") {
            const foreignObject = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "foreignObject",
            );
            foreignObject.setAttribute("x", to.x + squareSize - 12);
            foreignObject.setAttribute("y", to.y - 12);
            foreignObject.setAttribute("width", "24");
            foreignObject.setAttribute("height", "24");

            const div = document.createElement("div");
            div.innerHTML = bookSVG;
            foreignObject.appendChild(div);
            svg.appendChild(foreignObject);
          } else {
            const group = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "g",
            );

            const text = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "text",
            );

            text.setAttribute("x", to.x + squareSize);
            text.setAttribute("y", to.y);
            text.setAttribute("font-size", "9");
            text.setAttribute("font-weight", "bold");
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("dominant-baseline", "middle");
            text.setAttribute("fill", color);

            let isNegative = false;
            let displayScore = score;

            const hasHash = score.startsWith("#");
            let raw = hasHash ? score.slice(1) : score;

            if (raw.startsWith("-")) {
              isNegative = true;
              raw = raw.slice(1);
            } else if (raw.startsWith("+")) {
              raw = raw.slice(1);
            }

            displayScore = hasHash ? "#" + raw : raw;
            text.textContent = displayScore;

            group.appendChild(text);
            svg.appendChild(group);

            requestAnimationFrame(() => {
              const bbox = text.getBBox();

              const paddingX = 2;
              const paddingY = 2;

              const rect = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "rect",
              );

              rect.setAttribute("x", bbox.x - paddingX);
              rect.setAttribute("y", bbox.y - paddingY);
              rect.setAttribute("width", bbox.width + paddingX * 2);
              rect.setAttribute("height", bbox.height + paddingY * 2);

              rect.setAttribute("rx", "8");
              rect.setAttribute("ry", "8");

              rect.setAttribute("fill", isNegative ? "#312e2b" : "#ffffff");
              rect.setAttribute("fill-opacity", "0.85");
              rect.setAttribute("stroke", isNegative ? "#000000" : "#cccccc");
              rect.setAttribute("stroke-width", "1");

              group.insertBefore(rect, text);
            });
          }
        }

        parent.appendChild(svg);
      }

      parent.style.position = "relative";

      let filteredMoves = moves;
      if (config.winningMove) {
        filteredMoves = moves.filter((move) => {
          const evalValue = parseFloat(move.eval);
          if (side === "w") {
            return (
              evalValue >= 2 ||
              (move.eval.startsWith("#") && parseInt(move.eval.slice(1)) > 0)
            );
          } else {
            return (
              evalValue <= -2 ||
              (move.eval.startsWith("#-") && parseInt(move.eval.slice(2)) > 0)
            );
          }
        });
      }

      filteredMoves.slice(0, maxMoves).forEach((move, index) => {
        const color = colors[index] || "red";
        drawArrow(move.from, move.to, color, move.eval);
      });
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TO_POPUP") {
    if (message.fen) {
      board.position(message.fen);
    }

    if (message.data) {
      console.clear();
      const data = message.data;
      updateEval(data[0].eval, data[0].side);
      board.orientation(data[0].side);
      clearHighlightSquares()
      highlightMovesOnBoard(data, data[0].side[0])

    }
  }
});


