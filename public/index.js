const elo = document.getElementById("elo");
const lines = document.getElementById("lines");
const depth = document.getElementById("depth");

const eloValue = document.getElementById("eloValue");
const linesValue = document.getElementById("linesValue");
const depthValue = document.getElementById("depthValue");


const skillToElo = {
  0: 1350, 1: 1400, 2: 1450, 3: 1500, 4: 1600,
  5: 1700, 6: 1800, 7: 1900, 8: 2000, 9: 2100,
  10: 2200, 11: 2300, 12: 2400, 13: 2600, 14: 2800,
  15: 3000, 16: 3200, 17: 3300, 18: 3400, 19: 3450,
  20: 3500
};


let config = JSON.parse(localStorage.getItem("chessConfig")) || {
  skill: 20,
  lines: 3,
  depth: 10
};


elo.value = config.elo;
lines.value = config.lines;
depth.value = config.depth;

eloValue.textContent = `Skill: ${config.elo} (${skillToElo[config.elo]} Elo)`;
linesValue.textContent = config.lines;
depthValue.textContent = config.depth;

// Slider Skill
elo.addEventListener("input", () => {
  config.elo = parseInt(elo.value);
  eloValue.textContent = `Skill: ${config.elo} (${skillToElo[config.elo]} Elo)`;
});

// Slider Lines
lines.addEventListener("input", () => {
  config.lines = parseInt(lines.value);
  linesValue.textContent = config.lines;
});

// Slider Depth
depth.addEventListener("input", () => {
  config.depth = parseInt(depth.value);
  depthValue.textContent = config.depth;
});

// Bouton Save
document.getElementById("save").addEventListener("click", () => {
  localStorage.setItem("chessConfig", JSON.stringify(config));
  console.log(config)
  chrome.runtime.sendMessage({ config: config, type: "config" });
});
