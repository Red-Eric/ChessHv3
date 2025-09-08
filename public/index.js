const elo = document.getElementById("elo");
const lines = document.getElementById("lines");
const depth = document.getElementById("depth");
const eloValue = document.getElementById("eloValue");
const linesValue = document.getElementById("linesValue");
const depthValue = document.getElementById("depthValue");
const autoSkill = document.getElementById("autoSkill");
const autoSkillLabel = document.getElementById("autoSkillLabel");
const winningMove = document.getElementById("winningMove");
const winningMoveLabel = document.getElementById("winningMoveLabel");
const showEval = document.getElementById("showEval");
const showEvalLabel = document.getElementById("showEvalLabel");
const onlyShowEval = document.getElementById("onlyShowEval");
const onlyShowEvalLabel = document.getElementById("onlyShowEvalLabel");

// Mapping skill to Elo
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
  20: 3200
};

// Load config or default
let config = JSON.parse(localStorage.getItem("chessConfig")) || {
  skill: 20,
  lines: 5,
  depth: 10,
  autoSkill: false,
  winningMove: false,
  showEval: false,
  onlyShowEval: false
};

// Initialize inputs
elo.value = config.skill;
lines.value = config.lines;
depth.value = config.depth;
autoSkill.checked = config.autoSkill;
winningMove.checked = config.winningMove;
showEval.checked = config.showEval;
onlyShowEval.checked = config.onlyShowEval;

// Initialize display
eloValue.textContent = `Skill: ${config.skill} (${skillToElo[config.skill]} Elo)`;
linesValue.textContent = config.lines;
depthValue.textContent = config.depth;
autoSkillLabel.textContent = `Auto Skill Adjustment (${autoSkill.checked ? "ON" : "OFF"})`;
winningMoveLabel.textContent = `Only Show Winning Move (${winningMove.checked ? "ON" : "OFF"})`;
showEvalLabel.textContent = `Show Eval Bar (${showEval.checked ? "ON" : "OFF"})`;
onlyShowEvalLabel.textContent = `Only Show Eval Bar (${onlyShowEval.checked ? "ON" : "OFF"})`;

// Event listeners
elo.addEventListener("input", () => {
  config.skill = parseInt(elo.value);
  eloValue.textContent = `Skill: ${config.skill} (${skillToElo[config.skill]} Elo)`;
});

lines.addEventListener("input", () => {
  config.lines = parseInt(lines.value);
  linesValue.textContent = config.lines;
});

depth.addEventListener("input", () => {
  config.depth = parseInt(depth.value);
  depthValue.textContent = config.depth;
});

autoSkill.addEventListener("change", () => {
  if(config.winningMove && autoSkill.checked){
    autoSkill.checked = false;
    return; // block activation if winningMove is true
  }
  config.autoSkill = autoSkill.checked;
  autoSkillLabel.textContent = `Auto Skill Adjustment (${autoSkill.checked ? "ON" : "OFF"})`;
});

winningMove.addEventListener("change", () => {
  config.winningMove = winningMove.checked;
  winningMoveLabel.textContent = `Only Show Winning Move (${winningMove.checked ? "ON" : "OFF"})`;
  if(config.winningMove){
    config.autoSkill = false;
    autoSkill.checked = false;
    autoSkillLabel.textContent = `Auto Skill Adjustment (OFF)`;
  }
});

// Show Eval Bar toggle
showEval.addEventListener("change", () => {
  config.showEval = showEval.checked;
  showEvalLabel.textContent = `Show Eval Bar (${showEval.checked ? "ON" : "OFF"})`;
  if(!showEval.checked){
    // Disable onlyShowEval if showEval is turned off
    config.onlyShowEval = false;
    onlyShowEval.checked = false;
    onlyShowEvalLabel.textContent = `Only Show Eval Bar (OFF)`;
  }
});

// Only Show Eval Bar toggle
onlyShowEval.addEventListener("change", () => {
  if(!showEval.checked && onlyShowEval.checked){
    onlyShowEval.checked = false;
    return;
  }
  config.onlyShowEval = onlyShowEval.checked;
  onlyShowEvalLabel.textContent = `Only Show Eval Bar (${onlyShowEval.checked ? "ON" : "OFF"})`;
});

// Save button
document.getElementById("save").addEventListener("click", () => {
  localStorage.setItem("chessConfig", JSON.stringify(config));
  console.log(config);
  if (typeof chrome !== "undefined" && chrome.runtime) {
    chrome.runtime.sendMessage({ config: config, type: "config" });
  }
});
