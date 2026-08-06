document.addEventListener("DOMContentLoaded", () => {
  chrome?.runtime?.sendMessage({ type: "popupReady" });
});

function hideAllSetting() {
  document.getElementById("main").style.display = "none";
}

function showAllSetting() {
  document.getElementById("main").style.display = "";
}

function hideEngineSettings() {
  showAllSetting();
  document
    .querySelectorAll(".komodo, .maia3, .stockfish6, .stockfish11")
    .forEach((el) => {
      el.style.display = "none";
    });
}

function showKomodoSetting() {
  hideEngineSettings();
  document.querySelectorAll(".komodo").forEach((el) => {
    el.style.display = "";
  });
}

function showMaiaSetting() {
  hideEngineSettings();
  document.querySelectorAll(".maia3").forEach((el) => {
    el.style.display = "";
  });
}

function showWukongSetting() {
  hideEngineSettings();
  document.querySelectorAll(".wukong").forEach((el) => {
    el.style.display = "";
  });
}
function showLozzaSetting() {
  hideEngineSettings();
  document.querySelectorAll(".lozza").forEach((el) => {
    el.style.display = "";
  });
}

function showStockfish6Setting() {
  hideEngineSettings();
  document.querySelectorAll(".stockfish6").forEach((el) => {
    el.style.display = "";
  });
}

function showStockfish11Setting() {
  hideEngineSettings();
  document.querySelectorAll(".stockfish11").forEach((el) => {
    el.style.display = "";
  });
}

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


function updateCoachAvatar(coachId) {
  const none = document.getElementById("coachAvatarNone");
  const img = document.getElementById("coachAvatarImg");
  const badge = document.getElementById("coachBadge");
  const nameEl = document.getElementById("coachDisplayName");
  const langEl = document.getElementById("coachDisplayLang");

  if (coachId === 999) {
    none.style.display = "flex";
    img.style.display = "none";
    badge.style.display = "none";
    nameEl.className = "coach-name-none";
    nameEl.textContent = "No Coach";
    langEl.textContent = "Select a coach to get started";
    return;
  }

  const name = coachNames[coachId] || "Coach";
  const lang = coachLangs[coachId] || "English";
  const data = coachData[name];

  nameEl.className = "coach-name";
  nameEl.textContent = name;
  langEl.textContent = lang;
  badge.style.display = "flex";

  if (data) {
    img.src = data.pic;
    img.alt = name;
    img.style.display = "block";
    none.style.display = "none";
    img.onerror = () => {
      img.style.display = "none";
      none.style.display = "flex";
    };
  } else {
    img.style.display = "none";
    none.style.display = "flex";
  }
}

const el = (id) => document.getElementById(id);

function updateEngineAvatar(engineId) {
  const none = document.getElementById("engineAvatarNone");
  const img = document.getElementById("engineAvatarImg");
  const badge = document.getElementById("engineBadge");
  const nameEl = document.getElementById("engineDisplayName");
  const langEl = document.getElementById("engineDisplayLang");

  if (engineId === "None" || !engineId) {
    none.style.display = "flex";
    img.style.display = "none";
    badge.style.display = "none";
    nameEl.className = "coach-name-none";
    nameEl.textContent = "No Engine";
    langEl.textContent = "Select an engine to get started";
    return;
  }

  const data = engineData[engineId];
  if (!data) return;

  nameEl.className = "coach-name";
  nameEl.textContent = data.label;
  langEl.textContent = data.elo;
  badge.style.display = "flex";

  img.src = data.pic;
  img.alt = data.label;
  img.style.display = "block";
  none.style.display = "none";
  img.onerror = () => {
    img.style.display = "none";
    none.style.display = "flex";
  };
}

var chessConfig = { ...defaultChessConfig };

function applyEngineSettings(engine) {
  updateEngineAvatar(engine);

  hideAllSetting();

  switch (engine) {
    case "komodo":
      showKomodoSetting();

      el("elo").min = 100;
      el("elo").max = 3500;
      el("elo").step = 10;
      chessConfig.lines = Math.max(chessConfig.lines, 2);

      el("lines").min = 2;
      el("lines").max = 5;
      el("lines").value = chessConfig.lines;

      if (chessConfig.elo > 3500 || chessConfig.elo < 100) {
        chessConfig.elo = 3500;
      }
      break;

    case "maia3":
      showMaiaSetting();

      el("elo").min = 600;
      el("elo").max = 2600;
      el("elo").step = 100;
      chessConfig.lines = Math.max(chessConfig.lines, 2);

      el("lines").min = 2;
      el("lines").max = 5;
      el("lines").value = chessConfig.lines;

      if (chessConfig.elo > 2600 || chessConfig.elo < 600) {
        chessConfig.elo = 2600;
      }
      break;

    case "stockfish6":
      showStockfish6Setting();
      chessConfig.lines = Math.max(chessConfig.lines, 2);

      el("lines").min = 2;
      el("lines").max = 5;
      el("lines").value = chessConfig.lines;
      break;

    case "stockfish11":
      showStockfish11Setting();
      chessConfig.lines = Math.max(chessConfig.lines, 2);

      el("lines").min = 2;
      el("lines").max = 5;
      el("lines").value = chessConfig.lines;

      break;
      
    case "lozza":
      showLozzaSetting();
      chessConfig.lines = 1;
      el("lines").value = 1;
      el("lines").min = 1;
      el("lines").max = 1;
      break;
    case "wukong":
      showWukongSetting();
      chessConfig.lines = 1;
      el("lines").value = 1;
      el("lines").min = 1;
      el("lines").max = 1;
      break;

    case "None":
    default:
      break;
  }

  updateChessUI();
}

function loadChessConfig(callback) {
  chrome.storage.local.get(["chessConfig"], function (result) {
    const savedConfig = result.chessConfig;

    chessConfig = savedConfig
      ? { ...defaultChessConfig, ...savedConfig }
      : { ...defaultChessConfig };

    el("coach-container").style.display =
      chessConfig.coach === 999 ? "none" : "";

    applyEngineSettings(chessConfig.engine);

    if (callback) callback();
  });
}

function saveChessConfig() {
  chrome?.storage?.local?.set({ chessConfig }, () =>
    // console.log("Config saved"),
    console.log(),
  );
}

function hideExtraColorInputs(lines) {
  document.querySelectorAll('input[type="color"]').forEach((input, i) => {
    input.parentElement.style.display = i >= lines ? "none" : "";
  });
}

/* ================= HINTS MULTI-SELECT ================= */
function updateHintsUI() {
  document.querySelectorAll("#hintsContainer .hint-chip").forEach((chip) => {
    const input = chip.querySelector('input[type="checkbox"]');
    const checked = chessConfig.hints.includes(input.value);
    input.checked = checked;
    chip.classList.toggle("checked", checked);
  });
}

document.querySelectorAll("#hintsContainer .hint-chip").forEach((chip) => {
  const input = chip.querySelector('input[type="checkbox"]');
  input.onchange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      if (!chessConfig.hints.includes(value)) {
        chessConfig.hints.push(value);
      }
    } else {
      chessConfig.hints = chessConfig.hints.filter((h) => h !== value);
    }
    updateHintsUI();
    saveChessConfig();
  };
});

function updateChessUI() {
  [
    "elo",
    "lines",
    "depth",
    "depth2",
    "st6_mobilityMid",
    "st6_mobilityEnd",
    "st6_pawnStructureMid",
    "st6_pawnStructureEnd",
    "st6_passedPawnsMid",
    "st6_passedPawnsEnd",
    "st6_kingSafety",
  ].forEach((k) => (el(k).value = chessConfig[k]));
  el("style").value = chessConfig.style;
  el("coach").value = chessConfig.coach;
  el("key").value = chessConfig.key;
  el("key2").value = chessConfig.key2;
  el("engine").value = chessConfig.engine;

  el("delayMin").value = chessConfig.delay0;
  el("delayMax").value = chessConfig.delay;

  [
    "autoMove",
    "winningMove",
    "autoStart",
    "showEval",
    "onlyShowEval",
    "moveClassification",
    "speach",
    "floatingBtn",
  ].forEach((k) => (el(k).checked = chessConfig[k]));

  el("eloValue").textContent = chessConfig.elo;
  el("linesValue").textContent = chessConfig.lines;
  el("depthValue").textContent = chessConfig.depth;
  el("depth2Value").textContent = chessConfig.depth2;

  el("delayMinValue").textContent = chessConfig.delay0;
  el("delayMaxValue").textContent = chessConfig.delay;

  el("st6_mobilityMidValue").textContent = chessConfig.st6_mobilityMid;
  el("st6_mobilityEndValue").textContent = chessConfig.st6_mobilityEnd;
  el("st6_pawnStructureMidValue").textContent =
    chessConfig.st6_pawnStructureMid;
  el("st6_pawnStructureEndValue").textContent =
    chessConfig.st6_pawnStructureEnd;
  el("st6_passedPawnsMidValue").textContent = chessConfig.st6_passedPawnsMid;
  el("st6_passedPawnsEndValue").textContent = chessConfig.st6_passedPawnsEnd;
  el("st6_kingSafetyValue").textContent = chessConfig.st6_kingSafety;

  el("autoMoveLabel").textContent =
    `Auto Move (${chessConfig.autoMove ? "ON" : "OFF"})`;
  el("floatingBtnLabel").textContent =
    `Android FLoating BTN (${chessConfig.autoMove ? "ON" : "OFF"})`;
  el("autoStartLabel").textContent =
    `Auto Start Game (${chessConfig.autoStart ? "ON" : "OFF"})`;
  el("moveClassificationStartLabel").textContent =
    `Move Classification + Accuracy + Elo (${chessConfig.moveClassification ? "ON" : "OFF"})`;
  el("speachStartLabel").textContent =
    `Coach voice (${chessConfig.speach ? "ON" : "OFF"})`;
  el("winningMoveLabel").textContent =
    `Only Moves That Gain Material (${chessConfig.winningMove ? "ON" : "OFF"})`;
  el("showEvalLabel").textContent =
    `Show Eval Bar (${chessConfig.showEval ? "ON" : "OFF"})`;
  el("onlyShowEvalLabel").textContent =
    `HIDE EVERYTHING (${chessConfig.onlyShowEval ? "ON" : "OFF"})`;

  // Update coach avatar
  if (typeof updateCoachAvatar === "function") {
    updateCoachAvatar(chessConfig.coach);
  }

  if (typeof updateEngineAvatar === "function") {
    updateEngineAvatar(chessConfig.engine);
  }

  // hideExtraColorInputs(chessConfig.lines);

  if (chessConfig.engine === "lozza" || chessConfig.engine === "wukong") {
    hideExtraColorInputs(1);
  } else {
    hideExtraColorInputs(chessConfig.lines);
  }

  updateDelayTrack();

  updateHintsUI();
}

loadChessConfig(updateChessUI);

/* ================= INPUT HANDLERS ================= */
[
  "elo",
  "lines",
  "depth",
  "depth2",
  "st6_mobilityMid",
  "st6_mobilityEnd",
  "st6_pawnStructureMid",
  "st6_pawnStructureEnd",
  "st6_passedPawnsMid",
  "st6_passedPawnsEnd",
  "st6_kingSafety",
].forEach((k) => {
  el(k).oninput = (e) => {
    chessConfig[k] = +e.target.value;
    updateChessUI();
    saveChessConfig();
  };
});

/* ================= DELAY DUAL RANGE (delayMin -> delay0, delayMax -> delay) ================= */
const DELAY_MIN_GAP = 50;

function updateDelayTrack() {
  const track = el("delayTrack");
  if (!track) return;
  const minInput = el("delayMin");
  const maxInput = el("delayMax");
  const range = maxInput.max - maxInput.min;
  const leftPct = ((chessConfig.delay0 - minInput.min) / range) * 100;
  const rightPct = ((chessConfig.delay - minInput.min) / range) * 100;
  track.style.left = leftPct + "%";
  track.style.right = 100 - rightPct + "%";
}

function handleDelayInput(e) {
  let minV = +el("delayMin").value;
  let maxV = +el("delayMax").value;

  if (maxV - minV < DELAY_MIN_GAP) {
    if (e.target.id === "delayMin") {
      minV = maxV - DELAY_MIN_GAP;
    } else {
      maxV = minV + DELAY_MIN_GAP;
    }
  }

  chessConfig.delay0 = minV;
  chessConfig.delay = maxV;

  updateChessUI();
  saveChessConfig();
}

el("delayMin").oninput = handleDelayInput;
el("delayMax").oninput = handleDelayInput;

[
  "autoMove",
  "winningMove",
  "autoStart",
  "showEval",
  "onlyShowEval",
  "moveClassification",
  "speach",
  "floatingBtn",
].forEach((k) => {
  el(k).onchange = (e) => {
    chessConfig[k] = e.target.checked;
    updateChessUI();
    saveChessConfig();
  };
});

el("style").onchange = (e) => {
  chessConfig.style = e.target.value;
  updateChessUI();
  saveChessConfig();
};

el("coach").onchange = (e) => {
  chessConfig.coach = parseInt(e.target.value);

  if (chessConfig.coach === 999) {
    el("coach-container").style.display = "none";
  } else {
    el("coach-container").style.display = "";
  }
  updateChessUI();
  saveChessConfig();
};

el("engine").onchange = (e) => {
  chessConfig.engine = e.target.value;

  applyEngineSettings(chessConfig.engine);

  saveChessConfig();
};

el("key").onchange = (e) => {
  chessConfig.key = e.target.value;
  updateChessUI();
  saveChessConfig();
};
el("key2").onchange = (e) => {
  chessConfig.key2 = e.target.value;
  updateChessUI();
  saveChessConfig();
};


document.querySelectorAll('input[type="color"]').forEach((input, index) => {
  input.addEventListener("input", (e) => {
    chessConfig.colors[index] = e.target.value;
    updateChessUI();
    saveChessConfig();
  });
});

/* ================= LOAD ================= */
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
  await chrome?.storage?.local?.clear();
  location.reload();
};

/* ================= EXPORT ================= */
el("exportBtn").onclick = () => {
  el("exportOutput").textContent = JSON.stringify(chessConfig, null, 2);
  el("exportOutput").style.display = "block";
  el("copyBtn").style.display = "inline-block";
};

el("copyBtn").onclick = () => {
  navigator.clipboard.writeText(el("exportOutput").textContent).then(() => {
    const btn = el("copyBtn");
    const original = btn.textContent;
    btn.textContent = "✓ Copied!";
    setTimeout(() => (btn.textContent = original), 1500);
  });
};