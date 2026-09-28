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

/* ================= AUTO MOVE FILTER (percentage) ================= */
// Garantit un tableau de 5 nombres entre 0 et 100
// (anciennes configs sauvegardées sans "percentage" -> valeurs par défaut)
function sanitizePercentage(arr) {
  const def = defaultChessConfig.percentage;
  const clean = def.map((d, i) => {
    const v = Array.isArray(arr) ? Number(arr[i]) : NaN;
    return Number.isFinite(v) ? Math.min(100, Math.max(0, Math.round(v))) : d;
  });
  return capPercentage(clean, clean.length);
}

// Le total des N premières valeurs ne doit jamais dépasser 100 :
// on remplit dans l'ordre (flèche 1 d'abord) jusqu'à épuisement du budget
function capPercentage(arr, n) {
  let remaining = 100;
  for (let i = 0; i < n; i++) {
    arr[i] = Math.min(arr[i], remaining);
    remaining -= arr[i];
  }
  return arr;
}

// Reconstruit les lignes seulement si le nombre de lignes change
// (sinon le slider en cours de drag serait détruit à chaque input)
function renderPercentageUI() {
  const wrap = el("pctFilter");
  const list = el("pctList");
  if (!wrap || !list) return;

  const n = chessConfig.lines;

  // Une seule flèche = rien à pondérer
  wrap.style.display = n < 2 ? "none" : "";
  if (n < 2) return;

  if (list.children.length !== n) {
    list.innerHTML = "";
    for (let i = 0; i < n; i++) {
      const row = document.createElement("div");
      row.className = "pct-row";
      row.innerHTML = `
        <span class="pct-dot"></span>
        <span class="pct-name">Move ${i + 1}</span>
        <input type="range" class="pct-range" min="0" max="100" step="1" value="0" />
        <span class="value-badge pct-value">0%</span>
      `;
      row.querySelector("input").oninput = (e) => {
        // somme des autres flèches affichées
        const others = chessConfig.percentage
          .slice(0, chessConfig.lines)
          .reduce((acc, v, idx) => (idx === i ? acc : acc + v), 0);
        const maxAllowed = Math.max(0, 100 - others);

        // le slider s'arrête quand le total atteint 100%
        const value = Math.min(+e.target.value, maxAllowed);
        e.target.value = value;
        chessConfig.percentage[i] = value;
        updateChessUI();
        saveChessConfig();
      };
      list.appendChild(row);
    }
  }

  // si on augmente "Arrows", des valeurs cachées peuvent faire dépasser 100
  const before = chessConfig.percentage.slice(0, n).join();
  capPercentage(chessConfig.percentage, n);
  if (chessConfig.percentage.slice(0, n).join() !== before) saveChessConfig();

  let total = 0;
  list.querySelectorAll(".pct-row").forEach((row, i) => {
    const v = chessConfig.percentage[i] ?? 0;
    total += v;

    // la couleur suit la flèche : colors[0] = meilleur coup, etc.
    row.style.setProperty("--c", chessConfig.colors[i]);

    const range = row.querySelector("input");
    if (+range.value !== v) range.value = v;
    row.querySelector(".pct-value").textContent = v + "%";
  });

  const totalEl = el("pctTotal");
  totalEl.textContent = total + "%";
  totalEl.classList.toggle("ok", total === 100);
  totalEl.classList.toggle("bad", total !== 100);
}

// Répartition égale sur les N flèches affichées
el("pctEqual").onclick = () => {
  const n = chessConfig.lines;
  const base = Math.floor(100 / n);
  for (let i = 0; i < n; i++) chessConfig.percentage[i] = base;
  chessConfig.percentage[0] += 100 - base * n;
  updateChessUI();
  saveChessConfig();
};

// Ramène la somme des N flèches affichées à 100 en gardant les proportions
el("pctNormalize").onclick = () => {
  const n = chessConfig.lines;
  const sum = chessConfig.percentage.slice(0, n).reduce((a, b) => a + b, 0);

  if (sum === 0) {
    el("pctEqual").onclick();
    return;
  }

  let acc = 0;
  for (let i = 0; i < n; i++) {
    chessConfig.percentage[i] = Math.round(
      (chessConfig.percentage[i] / sum) * 100,
    );
    acc += chessConfig.percentage[i];
  }
  // corrige l'arrondi sur la première flèche
  chessConfig.percentage[0] = Math.max(0, chessConfig.percentage[0] + 100 - acc);

  updateChessUI();
  saveChessConfig();
};

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

    chessConfig.percentage = sanitizePercentage(chessConfig.percentage);

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
    "depth3",
    "st6_mobilityMid",
    "st6_mobilityEnd",
    "st6_pawnStructureMid",
    "st6_pawnStructureEnd",
    "st6_passedPawnsMid",
    "st6_passedPawnsEnd",
    "st6_kingSafety",
    "opening"
  ].forEach((k) => (el(k).value = chessConfig[k]));
  el("style").value = chessConfig.style;
  el("preview").value = chessConfig.preview;
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
    "hideArrow",
    "onlyShowEval",
    "moveClassification",
    "accuracy",
    "speach",
    "floatingBtn",
  ].forEach((k) => (el(k).checked = chessConfig[k]));

  el("eloValue").textContent = chessConfig.elo;
  el("linesValue").textContent = chessConfig.lines;
  el("openingValue").textContent = chessConfig.opening;
  el("depthValue").textContent = chessConfig.depth;
  el("depth2Value").textContent = chessConfig.depth2;
  el("depth3Value").textContent = chessConfig.depth3;

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
    `Android FLoating BTN (${chessConfig.floatingBtn ? "ON" : "OFF"})`;
  el("autoStartLabel").textContent =
    `Auto Start Game (${chessConfig.autoStart ? "ON" : "OFF"})`;
  el("moveClassificationStartLabel").textContent =
    `Move Classification (${chessConfig.moveClassification ? "ON" : "OFF"})`;

  el("accuracyLabel").textContent =
    `Accuracy + Elo (${chessConfig.accuracy ? "ON" : "OFF"})`;

  el("speachStartLabel").textContent =
    `Coach voice (${chessConfig.speach ? "ON" : "OFF"})`;
  el("winningMoveLabel").textContent =
    `Only Moves That Gain Material (${chessConfig.winningMove ? "ON" : "OFF"})`;
  el("showEvalLabel").textContent =
    `Show Eval Bar (${chessConfig.showEval ? "ON" : "OFF"})`;

  el("hideArrowLabel").textContent =
    `Hide Arrow (${chessConfig.hideArrow ? "ON" : "OFF"})`;

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

  // Auto Move Filter
  renderPercentageUI();
}

loadChessConfig(updateChessUI);

/* ================= INPUT HANDLERS ================= */
[
  "elo",
  "lines",
  "depth",
  "depth2",
  "depth3",
  "st6_mobilityMid",
  "st6_mobilityEnd",
  "st6_pawnStructureMid",
  "st6_pawnStructureEnd",
  "st6_passedPawnsMid",
  "st6_passedPawnsEnd",
  "st6_kingSafety",
  "opening"
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
  "hideArrow",
  "onlyShowEval",
  "moveClassification",
  "accuracy",
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
el("preview").onchange = (e) => {
  chessConfig.preview = e.target.value;
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
    chessConfig.percentage = sanitizePercentage(chessConfig.percentage);
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