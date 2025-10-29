document.addEventListener("DOMContentLoaded", () => {
  if (typeof chrome !== "undefined" && chrome.runtime)
    chrome.runtime.sendMessage({ type: "popupReady" });
});

// ===== Tabs =====
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
const elo = document.getElementById("elo");
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

const eloValue = document.getElementById("eloValue");
const linesValue = document.getElementById("linesValue");
const depthValue = document.getElementById("depthValue");
const delayValue = document.getElementById("delayValue");
const autoMoveLabel = document.getElementById("autoMoveLabel");
const winningMoveLabel = document.getElementById("winningMoveLabel");
const showEvalLabel = document.getElementById("showEvalLabel");
const onlyShowEvalLabel = document.getElementById("onlyShowEvalLabel");

// ===== Update Chess.com UI =====
function updateChessUI() {
  elo.value = chessConfig.skill;
  lines.value = chessConfig.lines;
  depth.value = chessConfig.depth;
  delay.value = chessConfig.delay;
  autoMove.checked = chessConfig.autoMove;
  winningMove.checked = chessConfig.winningMove;
  showEval.checked = chessConfig.showEval;
  onlyShowEval.checked = chessConfig.onlyShowEval;
  styleSelect.value = chessConfig.style;
  engineSelect.value = chessConfig.engine;

  eloValue.textContent = `Skill: ${chessConfig.skill} (${skillToElo[chessConfig.skill]} Elo)`;
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
  elo.parentElement.style.display = hideIfNotStockfish ? "none" : "flex";
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
elo.addEventListener("input", () => {
  chessConfig.skill = parseInt(elo.value);
  updateChessUI();
  saveChessConfig();
});

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
const elo2 = document.getElementById("elo2");
const lines2 = document.getElementById("lines2");
const depth2 = document.getElementById("depth2");
const winningMove2 = document.getElementById("winningMove2");
const showEval2 = document.getElementById("showEval2");
const onlyShowEval2 = document.getElementById("onlyShowEval2");
const styleSelect2 = document.getElementById("styleSelect2");
const engineSelect2 = document.getElementById("engineSelect2");
const engineInfo2 = document.getElementById("engineInfo2");

const eloValue2 = document.getElementById("eloValue2");
const linesValue2 = document.getElementById("linesValue2");
const depthValue2 = document.getElementById("depthValue2");
const winningMoveLabel2 = document.getElementById("winningMoveLabel2");
const showEvalLabel2 = document.getElementById("showEvalLabel2");
const onlyShowEvalLabel2 = document.getElementById("onlyShowEvalLabel2");

// ===== Update Lichess UI =====
function updateLichessUI() {
  elo2.value = lichessConfig.skill;
  lines2.value = lichessConfig.lines;
  depth2.value = lichessConfig.depth;
  winningMove2.checked = lichessConfig.winningMove;
  showEval2.checked = lichessConfig.showEval;
  onlyShowEval2.checked = lichessConfig.onlyShowEval;
  styleSelect2.value = lichessConfig.style;
  engineSelect2.value = lichessConfig.engine;

  eloValue2.textContent = `Skill: ${lichessConfig.skill} (${skillToElo[lichessConfig.skill]} Elo)`;
  linesValue2.textContent = lichessConfig.lines;
  depthValue2.textContent = lichessConfig.depth;
  winningMoveLabel2.textContent = `Only Show Winning Move (${winningMove2.checked ? "ON" : "OFF"})`;
  showEvalLabel2.textContent = `Show Eval Bar (${showEval2.checked ? "ON" : "OFF"})`;
  onlyShowEvalLabel2.textContent = `Hide Arrows (${onlyShowEval2.checked ? "ON" : "OFF"})`;

  // engineInfo2.textContent = `${lichessConfig.engine === "stockfish" ? "Default engine" : "Selected engine"}: ${lichessConfig.engine.toUpperCase()}`;

  // === MASQUER LES ELEMENTS SI PAS STOCKFISH ===
  const hideIfNotStockfish = lichessConfig.engine !== "stockfish";
  elo2.parentElement.style.display = hideIfNotStockfish ? "none" : "flex";
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
elo2.addEventListener("input", () => {
  lichessConfig.skill = parseInt(elo2.value);
  updateLichessUI();
  saveLichessConfig();
});

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
var board1 = Chessboard("board1", "start");
board1.orientation("white");
