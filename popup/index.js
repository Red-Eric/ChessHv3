document.addEventListener("DOMContentLoaded", () => {
  if (typeof chrome !== "undefined" && chrome.runtime)
    chrome.runtime.sendMessage({ type: "popupReady" });
});

// ===== Tabs =====//
let panelIndex = 0;
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    panelIndex = index;
    const streamPanel = document.querySelector("#stream");
    streamPanel.style.display = index === 2 ? "flex" : "none";

    tabs.forEach((t) => t.classList.remove("active"));
    panels.forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.panel).classList.add("active");
  });
});

if (panelIndex !== 2) document.querySelector("#stream").style.display = "none";

// ===== Skill to Elo Mapping =====
const skillToElo = {
  0: 1000, 1: 1200, 2: 1350, 3: 1450, 4: 1550, 5: 1650, 6: 1750,
  7: 1850, 8: 1950, 9: 2050, 10: 2150, 11: 2250, 12: 2350,
  13: 2450, 14: 2550, 15: 2650, 16: 2750, 17: 2850, 18: 2950,
  19: 3050, 20: 3200
};

// ===== Chess.com Config =====
let chessConfig = JSON.parse(localStorage.getItem("chessConfig")) || {
  skill: 20, lines: 5, depth: 10, delay: 100,
  autoMove: false, winningMove: false, showEval: false, onlyShowEval: false,
  engine: "stockfish", style: 0
};

// ===== DOM Elements Chess.com =====
// const elo = document.getElementById("elo");
const lines = document.getElementById("lines");
const depth = document.getElementById("depth");
const delay = document.getElementById("delay");
const autoMove = document.getElementById("autoMove");
const winningMove = document.getElementById("winningMove");
const showEval = document.getElementById("showEval");
const onlyShowEval = document.getElementById("onlyShowEval");
const styleSelect = document.getElementById("styleSelect");
const engineSelect = document.getElementById("engineSelect");
const engineInfo = document.getElementById("engineInfo");

// const eloValue = document.getElementById("eloValue");
const linesValue = document.getElementById("linesValue");
const depthValue = document.getElementById("depthValue");
const delayValue = document.getElementById("delayValue");
const autoMoveLabel = document.getElementById("autoMoveLabel");
const winningMoveLabel = document.getElementById("winningMoveLabel");
const showEvalLabel = document.getElementById("showEvalLabel");
const onlyShowEvalLabel = document.getElementById("onlyShowEvalLabel");

// ===== Update Chess.com UI =====
function updateChessUI() {
  // elo.value = chessConfig.skill;
  lines.value = chessConfig.lines;
  depth.value = chessConfig.depth;
  delay.value = chessConfig.delay;
  autoMove.checked = chessConfig.autoMove;
  winningMove.checked = chessConfig.winningMove;
  showEval.checked = chessConfig.showEval;
  onlyShowEval.checked = chessConfig.onlyShowEval;
  styleSelect.value = chessConfig.style;
  engineSelect.value = chessConfig.engine;

  // eloValue.textContent = `Skill: ${chessConfig.skill} (${skillToElo[chessConfig.skill]} Elo)`;
  linesValue.textContent = chessConfig.lines;
  depthValue.textContent = chessConfig.depth;
  delayValue.textContent = chessConfig.delay;
  autoMoveLabel.textContent = `Auto Move (${autoMove.checked ? "ON" : "OFF"})`;
  winningMoveLabel.textContent = `Only Show Winning Move (${winningMove.checked ? "ON" : "OFF"})`;
  showEvalLabel.textContent = `Show Eval Bar (${showEval.checked ? "ON" : "OFF"})`;
  onlyShowEvalLabel.textContent = `Hide Arrows (${onlyShowEval.checked ? "ON" : "OFF"})`;

  // engineInfo.textContent = `${chessConfig.engine === "stockfish" ? "Default engine" : "Selected engine"}: ${chessConfig.engine.toUpperCase()}`;

  // === MASQUER LES ELEMENTS SI PAS STOCKFISH ===
  const hideIfNotStockfish = chessConfig.engine !== "stockfish";
  // elo.parentElement.style.display = hideIfNotStockfish ? "none" : "flex";
  lines.parentElement.style.display = hideIfNotStockfish ? "none" : "flex";
  styleSelect.parentElement.style.display = hideIfNotStockfish ? "none" : "flex";
  winningMove.parentElement.style.display = hideIfNotStockfish ? "none" : "flex";
  winningMoveLabel.style.display = hideIfNotStockfish ? "none" : "inline";
}
updateChessUI();

function saveChessConfig() {
  localStorage.setItem("chessConfig", JSON.stringify(chessConfig));
  if (typeof chrome !== "undefined" && chrome.runtime)
    chrome.runtime.sendMessage({ type: "config", config: chessConfig });
}

// ===== Event Listeners Chess.com =====
// elo.addEventListener("input", () => {
//   chessConfig.skill = parseInt(elo.value);
//   updateChessUI();
//   saveChessConfig();
// });

[lines, depth, delay].forEach(el => el.addEventListener("input", () => {
  chessConfig[el.id] = parseInt(el.value);
  updateChessUI();
  saveChessConfig();
}));

[autoMove, winningMove, showEval, onlyShowEval].forEach(el =>
  el.addEventListener("change", () => {
    chessConfig[el.id] = el.checked;
    updateChessUI();
    saveChessConfig();
  })
);

styleSelect.addEventListener("change", () => {
  chessConfig.style = parseInt(styleSelect.value);
  saveChessConfig();
});

engineSelect.addEventListener("change", () => {
  chessConfig.engine = engineSelect.value;
  updateChessUI();
  saveChessConfig();
});

// ===== Lichess Config =====
let lichessConfig = JSON.parse(localStorage.getItem("lichessConfig")) || {
  skill: 20, lines: 5, depth: 10,
  winningMove: false, showEval: false, onlyShowEval: false,
  engine: "stockfish", style: 0
};

// ===== DOM Elements Lichess =====
// const elo2 = document.getElementById("elo2");
const lines2 = document.getElementById("lines2");
const depth2 = document.getElementById("depth2");
const winningMove2 = document.getElementById("winningMove2");
const showEval2 = document.getElementById("showEval2");
const onlyShowEval2 = document.getElementById("onlyShowEval2");
const styleSelect2 = document.getElementById("styleSelect2");
const engineSelect2 = document.getElementById("engineSelect2");
const engineInfo2 = document.getElementById("engineInfo2");

// const eloValue2 = document.getElementById("eloValue2");
const linesValue2 = document.getElementById("linesValue2");
const depthValue2 = document.getElementById("depthValue2");
const winningMoveLabel2 = document.getElementById("winningMoveLabel2");
const showEvalLabel2 = document.getElementById("showEvalLabel2");
const onlyShowEvalLabel2 = document.getElementById("onlyShowEvalLabel2");

// ===== Update Lichess UI =====
function updateLichessUI() {
  // elo2.value = lichessConfig.skill;
  lines2.value = lichessConfig.lines;
  depth2.value = lichessConfig.depth;
  winningMove2.checked = lichessConfig.winningMove;
  showEval2.checked = lichessConfig.showEval;
  onlyShowEval2.checked = lichessConfig.onlyShowEval;
  styleSelect2.value = lichessConfig.style;
  engineSelect2.value = lichessConfig.engine;

  // eloValue2.textContent = `Skill: ${lichessConfig.skill} (${skillToElo[lichessConfig.skill]} Elo)`;
  linesValue2.textContent = lichessConfig.lines;
  depthValue2.textContent = lichessConfig.depth;
  winningMoveLabel2.textContent = `Only Show Winning Move (${winningMove2.checked ? "ON" : "OFF"})`;
  showEvalLabel2.textContent = `Show Eval Bar (${showEval2.checked ? "ON" : "OFF"})`;
  onlyShowEvalLabel2.textContent = `Hide Arrows (${onlyShowEval2.checked ? "ON" : "OFF"})`;

  // engineInfo2.textContent = `${lichessConfig.engine === "stockfish" ? "Default engine" : "Selected engine"}: ${lichessConfig.engine.toUpperCase()}`;

  // === MASQUER LES ELEMENTS SI PAS STOCKFISH ===
  const hideIfNotStockfish = lichessConfig.engine !== "stockfish";
  // elo2.parentElement.style.display = hideIfNotStockfish ? "none" : "flex";
  lines2.parentElement.style.display = hideIfNotStockfish ? "none" : "flex";
  styleSelect2.parentElement.style.display = hideIfNotStockfish ? "none" : "flex";
  winningMove2.parentElement.style.display = hideIfNotStockfish ? "none" : "flex";
  winningMoveLabel2.style.display = hideIfNotStockfish ? "none" : "inline";
}
updateLichessUI();

function saveLichessConfig() {
  localStorage.setItem("lichessConfig", JSON.stringify(lichessConfig));
  if (typeof chrome !== "undefined" && chrome.runtime)
    chrome.runtime.sendMessage({ type: "config2", config: lichessConfig });
}

// ===== Event Listeners Lichess =====
// elo2.addEventListener("input", () => {
//   lichessConfig.skill = parseInt(elo2.value);
//   updateLichessUI();
//   saveLichessConfig();
// });

[lines2, depth2].forEach(el => el.addEventListener("input", () => {
  lichessConfig[el.id.replace('2','')] = parseInt(el.value);
  updateLichessUI();
  saveLichessConfig();
}));

[winningMove2, showEval2, onlyShowEval2].forEach(el =>
  el.addEventListener("change", () => {
    lichessConfig[el.id.replace('2','')] = el.checked;
    updateLichessUI();
    saveLichessConfig();
  })
);

styleSelect2.addEventListener("change", () => {
  lichessConfig.style = parseInt(styleSelect2.value);
  saveLichessConfig();
});

engineSelect2.addEventListener("change", () => {
  lichessConfig.engine = engineSelect2.value;
  updateLichessUI();
  saveLichessConfig();
});

// ===== Chessboard Panel =====

function createEvalBar(initialScore = "0.0", initialColor = "white") {
  const boardContainer = document.querySelector("#board1");
  let w_ = boardContainer.offsetWidth;

  if (!boardContainer) return console.error("Plateau non trouvé !");

  // Conteneur principal
  const evalContainer = document.createElement("div");
  evalContainer.id = "customEval";
  evalContainer.style.zIndex = "9999";
  evalContainer.style.width = `20px`;
  evalContainer.style.height = `400px`;
  evalContainer.style.marginRight = "10px";
  evalContainer.style.background = "#eee";
  evalContainer.style.marginLeft = "10px";
  evalContainer.style.position = "relative";
  evalContainer.style.border = "1px solid #aaa";
  evalContainer.style.borderRadius = "4px";
  evalContainer.style.overflow = "hidden";

  const topBar = document.createElement("div");
  const bottomBar = document.createElement("div");

  [topBar, bottomBar].forEach((bar) => {
    bar.style.width = "100%";
    bar.style.position = "absolute";
    bar.style.transition = "height 0.3s ease";
  });

  topBar.style.top = "0";
  bottomBar.style.bottom = "0";

  evalContainer.appendChild(topBar);
  evalContainer.appendChild(bottomBar);

  // Ligne médiane
  const midLine = document.createElement("div");
  midLine.style.position = "absolute";
  midLine.style.top = "50%";
  midLine.style.left = "0";
  midLine.style.width = "100%";
  midLine.style.height = "2px";
  midLine.style.background = "red";
  midLine.style.transform = "translateY(-50%)";
  evalContainer.appendChild(midLine);

  // Texte en bas
  const scoreText = document.createElement("div");
  scoreText.style.position = "absolute";
  scoreText.style.bottom = "0";
  scoreText.style.left = "50%";
  scoreText.style.transform = "translateX(-50%)";
  scoreText.style.color = "red";
  scoreText.style.fontWeight = "bold";
  scoreText.style.fontSize = "12px";
  scoreText.style.pointerEvents = "none";
  evalContainer.appendChild(scoreText);

  boardContainer.parentNode.style.display = "flex";
  // boardContainer.parentNode.appendChild(evalContainer);
  boardContainer.parentNode.insertBefore(evalContainer, boardContainer);

  function parseScore(scoreStr) {
    if (!scoreStr) {
      return { score: 0, mate: false };
    }

    scoreStr = scoreStr.trim();
    let mate = false;
    let score = 0;

    if (scoreStr.startsWith("#")) {
      mate = true;
      scoreStr = scoreStr.slice(1);
    }

    score = parseFloat(scoreStr.replace("+", "")) || 0;
    return { score, mate };
  }

  function update(scoreStr, color = "white") {
    let { score, mate } = parseScore(scoreStr);
    let percent = 50;

    if (mate) {
      let sign = score > 0 ? "+" : "-";
      scoreText.textContent = "#" + sign + Math.abs(score);
      if (
        (score > 0 && color === "white") ||
        (score < 0 && color === "black")
      ) {
        percent = 100;
      } else {
        percent = 0;
      }
    } else {
      let sign = score > 0 ? "+" : "";
      scoreText.textContent = sign + score.toFixed(1);
      if (color === "black") score = -score;
      if (score >= 7) {
        percent = 90;
      } else if (score <= -7) {
        percent = 10;
      } else {
        percent = 50 + (score / 7) * 40;
      }
    }

    if (color === "white") {
      bottomBar.style.background = "#ffffff";
      topBar.style.background = "#312e2b";
    } else {
      bottomBar.style.background = "#312e2b";
      topBar.style.background = "#ffffff";
    }

    bottomBar.style.height = percent + "%";
    topBar.style.height = 100 - percent + "%";
  }

  update(initialScore, initialColor);
  return { update };
}

function clearHighlightSquares() {
  document.querySelectorAll(".customH").forEach((el) => el.remove());
}

function highlightMovesOnBoard(moves, side, fen) {
  if (!Array.isArray(moves)) return;

  if (
    !(
      (side === "w" && fen.split(" ")[1] === "w") ||
      (side === "b" && fen.split(" ")[1] === "b")
    )
  ) {
    return;
  }

  const parent = document.querySelector("#board1");
  if (!parent) return;

  const squareSize = parent.offsetWidth / 8;
  const maxMoves = 5;
  let colors = ["blue", "green", "yellow", "orange", "red"];

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

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "customH");
    svg.setAttribute("width", parent.offsetWidth);
    svg.setAttribute("height", parent.offsetWidth);
    svg.style.position = "absolute";
    svg.style.left = "0";
    svg.style.top = "0";
    svg.style.pointerEvents = "none";
    svg.style.overflow = "visible";
    svg.style.zIndex = "10";

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const marker = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "marker"
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
      "path"
    );
    arrowPath.setAttribute("d", "M0,0 L3.5,1.25 L0,2.5 Z");
    arrowPath.setAttribute("fill", color);
    marker.appendChild(arrowPath);
    defs.appendChild(marker);
    svg.appendChild(defs);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
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
      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      text.setAttribute("x", to.x + squareSize - 4);
      text.setAttribute("y", to.y + 12);
      text.setAttribute("fill", color);
      text.setAttribute("font-size", "13");
      text.setAttribute("font-weight", "bold");
      text.setAttribute("text-anchor", "end");
      text.setAttribute("alignment-baseline", "hanging");
      text.setAttribute("opacity", "1");
      text.textContent = score;
      svg.appendChild(text);
    }

    parent.appendChild(svg);
  }

  parent.style.position = "relative";

  // Filtrage des coups si config.winningMove est actif
  let filteredMoves = moves;

  filteredMoves.slice(0, maxMoves).forEach((move, index) => {
    const color = colors[index] || "red";
    drawArrow(move.from, move.to, color, move.eval);
  });
}

var board1 = Chessboard("board1", "start");
board1.orientation("white");
var evalBar = createEvalBar();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  try {
    if (
      message.type === "TO_POPUP" &&
      Array.isArray(message.data) &&
      message.data.length > 0
    ) {
      const data = message.data[0];
      if (!data.fen || !data.side || !data.eval) return;

      if (board1) {
        board1.orientation(data.side);
        board1.position(data.fen);
      }

      clearHighlightSquares();
      highlightMovesOnBoard(message.data, data.side[0], data.fen);
      if (evalBar && typeof evalBar.update === "function") {
        evalBar.update(data.eval, data.side);
      }
    }
  } catch (err) {
    console.warn("Erreur message TO_POPUP ignorée :", err);
  }
});