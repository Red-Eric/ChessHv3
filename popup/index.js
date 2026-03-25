document.addEventListener("DOMContentLoaded", () => {
  chrome?.runtime?.sendMessage({ type: "popupReady" });
});

/* ================= TABS ================= */
document.querySelectorAll(".tab").forEach((tab) => {
  tab.onclick = () => {
    document
      .querySelectorAll(".tab, .panel")
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
  stat: false,
  autoStart : false,
  winningMove: false,
  showEval: false,
  onlyShowEval: false,
  key: " ",
};

let chessConfig = { ...defaultChessConfig };

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

  ["autoMove", "stat", "winningMove","autoStart", "showEval", "onlyShowEval"].forEach(
    (k) => (el(k).checked = chessConfig[k]),
  );

  el("eloValue").textContent = chessConfig.elo;
  el("linesValue").textContent = chessConfig.lines;
  el("depthValue").textContent = chessConfig.depth;
  el("delayValue").textContent = chessConfig.delay;

  el("autoMoveLabel").textContent =
    `Auto Move (${chessConfig.autoMove ? "ON" : "OFF"})`;
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

["autoMove", "stat", "winningMove","autoStart", "showEval", "onlyShowEval"].forEach((k) => {
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
  position : "start"
}

let board = Chessboard('board1', config)
board.orientation("black")

function updateEval(scoreStr, color = 'white') {
  const top    = document.getElementById('evalTop');
  const bottom = document.getElementById('evalBottom');
  const text   = document.getElementById('evalScore');

  if (!top || !bottom || !text) return;

  let score = 0;
  let mate  = false;
  let percent = 50;

  if (scoreStr) {
    scoreStr = scoreStr.trim();
    if (scoreStr.startsWith('#')) {
      mate = true;
      score = parseFloat(scoreStr.slice(1).replace('+', '')) || 0;
    } else {
      score = parseFloat(scoreStr.replace('+', '')) || 0;
    }
  }

  if (mate) {
    const sign = score > 0 ? '+' : '-';
    text.textContent = '#' + sign + Math.abs(score);
    percent = ((score > 0 && color === 'white') || (score < 0 && color === 'black')) ? 100 : 0;
  } else {
    const sign = score > 0 ? '+' : '';
    text.textContent = sign + score.toFixed(1);
    const s = color === 'black' ? -score : score;
    percent = s >= 7 ? 90 : s <= -7 ? 10 : 50 + (s / 7) * 40;
  }

  if (color === 'white') {
    top.style.background    = '#312e2b';
    bottom.style.background = '#ffffff';
  } else {
    top.style.background    = '#ffffff';
    bottom.style.background = '#312e2b';
  }

  top.style.height    = (100 - percent) + '%';
  bottom.style.height = percent + '%';
}



