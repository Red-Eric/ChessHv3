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

// ===== DOM Elements =====
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

  engineInfo.textContent = `${chessConfig.engine === "stockfish" ? "Default engine" : "Selected engine"}: ${chessConfig.engine.toUpperCase()}`;
}
updateChessUI();

function saveChessConfig() {
  localStorage.setItem("chessConfig", JSON.stringify(chessConfig));
  if (typeof chrome !== "undefined" && chrome.runtime)
    chrome.runtime.sendMessage({ type: "config", config: chessConfig });
}

// ===== Event Listeners =====
elo.addEventListener("input", () => {
  chessConfig.skill = parseInt(elo.value); // fix ici pour slider skill
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
// Même logique que Chess.com mais avec "_2" suffix pour ids
let lichessConfig = JSON.parse(localStorage.getItem("lichessConfig")) || {
  skill: 20, lines: 5, depth: 10,
  winningMove: false, showEval: false, onlyShowEval: false,
  engine: "stockfish", style: 0
};

// ... implémentation identique pour Lichess (_2)

var board1 = Chessboard("board1", "start");
board1.orientation("white");
