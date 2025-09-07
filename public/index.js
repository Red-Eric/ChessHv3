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

// Mapping skill to Elo
const skillToElo = {
  0: 1350, 1: 1400, 2: 1450, 3: 1500, 4: 1600,
  5: 1700, 6: 1800, 7: 1900, 8: 2000, 9: 2100,
  10: 2200, 11: 2300, 12: 2400, 13: 2600, 14: 2800,
  15: 3000, 16: 3200, 17: 3300, 18: 3400, 19: 3450,
  20: 3500
};

// Load config or default
let config = JSON.parse(localStorage.getItem("chessConfig")) || {
  skill: 20,
  lines: 3,
  depth: 10,
  autoSkill: false,
  winningMove: false
};

// Initialize inputs
elo.value = config.skill;
lines.value = config.lines;
depth.value = config.depth;
autoSkill.checked = config.autoSkill;
winningMove.checked = config.winningMove;

// Initialize display
eloValue.textContent = `Skill: ${config.skill} (${skillToElo[config.skill]} Elo)`;
linesValue.textContent = config.lines;
depthValue.textContent = config.depth;
autoSkillLabel.textContent = `Auto Skill Adjustment (${autoSkill.checked ? "ON" : "OFF"})`;
winningMoveLabel.textContent = `Only Show Winning Move (${winningMove.checked ? "ON" : "OFF"})`;

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
    // Disable autoSkill if winningMove is true
    config.autoSkill = false;
    autoSkill.checked = false;
    autoSkillLabel.textContent = `Auto Skill Adjustment (OFF)`;
  }
});

// Save button
document.getElementById("save").addEventListener("click", () => {
  localStorage.setItem("chessConfig", JSON.stringify(config));
  console.log("Config saved:", config);
  if (typeof chrome !== "undefined" && chrome.runtime) {
    chrome.runtime.sendMessage({ config: config, type: "config" });
  }
});
