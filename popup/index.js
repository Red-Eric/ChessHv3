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
  review: false,
  elo: 3500,
  coach: 999,
  lines: 5,
  colors: ["#0000ff", "#00ff00", "#FFFF00", "#f97316", "#ff0000"],
  depth: 10,
  depth2: 10,
  delay: 100,
  style: "Default",
  autoMove: false,
  speach : false,
  autoMoveBalanced: false,
  moveClassification: false,
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

    if (chessConfig.coach === 999) {
      el("coach-container").style.display = "none";
    } else {
      el("coach-container").style.display = "";
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
  ["elo", "lines", "depth", "delay", "depth2"].forEach(
    (k) => (el(k).value = chessConfig[k]),
  );
  el("style").value = chessConfig.style;
  el("coach").value = chessConfig.coach;
  el("key").value = chessConfig.key;

  [
    "autoMove",
    "winningMove",
    "autoStart",
    "review",
    "showEval",
    "onlyShowEval",
    "autoMoveBalanced",
    "moveClassification",
    "speach"
  ].forEach((k) => (el(k).checked = chessConfig[k]));

  el("eloValue").textContent = chessConfig.elo;
  el("linesValue").textContent = chessConfig.lines;
  el("depthValue").textContent = chessConfig.depth;
  el("delayValue").textContent = chessConfig.delay;
  el("depth2Value").textContent = chessConfig.depth2;

  el("autoMoveLabel").textContent =
    `Auto Move (${chessConfig.autoMove ? "ON" : "OFF"})`;
  el("autoMoveBalancedLabel").textContent =
    `Balanced Auto Move (${chessConfig.autoMoveBalanced ? "ON" : "OFF"})`;
  el("autoStartLabel").textContent =
    `Auto Start Game (${chessConfig.autoStart ? "ON" : "OFF"})`;

  el("moveClassificationStartLabel").textContent =
    `MoveClassification (${chessConfig.moveClassification ? "ON" : "OFF"})`;
  
    el("speachStartLabel").textContent =
    `Coach voice  (${chessConfig.speach ? "ON" : "OFF"})`;

  el("reviewLabel").textContent =
    `ChessHv3 Check (${chessConfig.review ? "ON" : "OFF"})`;
  
  el("winningMoveLabel").textContent =
    `Only Moves That Gain Material (${chessConfig.winningMove ? "ON" : "OFF"})`;
  el("showEvalLabel").textContent =
    `Show Eval Bar (${chessConfig.showEval ? "ON" : "OFF"})`;
  el("onlyShowEvalLabel").textContent =
    `Hide Arrows and Accuracy Panel(${chessConfig.onlyShowEval ? "ON" : "OFF"})`;

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
["elo", "lines", "depth", "delay", "depth2"].forEach((k) => {
  el(k).oninput = (e) => {
    chessConfig[k] = +e.target.value;
    updateChessUI();
    saveChess();
  };
});

[
  "autoMove",
  "winningMove",
  "autoStart",
  "review",
  "showEval",
  "onlyShowEval",
  "autoMoveBalanced",
  "moveClassification",
  "speach"
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

el("coach").onchange = (e) => {
  chessConfig.coach = parseInt(e.target.value);
  if (chessConfig.coach === 999) {
    el("coach-container").style.display = "none";
  } else {
    el("coach-container").style.display = "";
  }
  updateChessUI();
  saveChess();
};

el("key").onchange = (e) => {
  chessConfig.key = e.target.value;
  updateChessUI();
  saveChess();
};

document.querySelector("#stream").onclick = () => {
  chrome.runtime.sendMessage({ type: "stream" });
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

el("reset").onclick = async () => {
  await chrome.storage.local.clear();
  location.reload();
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
