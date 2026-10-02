document.addEventListener("DOMContentLoaded", () => {
  chrome?.runtime?.sendMessage({ type: "popupReady" });
});

/* ================= ENGINE HELPERS ================= */
// "auto" = Komodo Auto (accepte aussi "komodo_auto")
function isAutoEngine(engine) {
  return engine === "auto" || engine === "komodo_auto";
}

function hideAllSetting() {
  document.getElementById("main").style.display = "none";
}

function showAllSetting() {
  document.getElementById("main").style.display = "";
}

function hideEngineSettings() {
  showAllSetting();

  // Réinitialise les blocs éventuellement cachés par le mode Komodo Auto
  Array.from(document.getElementById("main").children).forEach((child) => {
    child.style.display = "";
  });

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

// Komodo Auto : on garde seulement ELO + Style + Auto Start Game
function showAutoSetting() {
  hideEngineSettings();

  const main = document.getElementById("main");

  // Cache tous les blocs de #main (depth, display, automation, ...)
  Array.from(main.children).forEach((child) => {
    child.style.display = "none";
  });

  // Réaffiche uniquement le bloc ELO et le bloc Style
  const eloBlock = document.getElementById("elo")?.closest(".komodo");
  const styleBlock = document.getElementById("style")?.closest(".komodo");
  if (eloBlock) eloBlock.style.display = "";
  if (styleBlock) styleBlock.style.display = "";

  // Réaffiche Auto Start Game (le toggle + son texte d'aide juste en dessous)
  const autoStartBlock = document.getElementById("autoStart")?.closest(".setting");
  if (autoStartBlock) {
    autoStartBlock.style.display = "";
    const help = autoStartBlock.nextElementSibling;
    if (help && help.classList.contains("setting-help")) {
      help.style.display = "";
    }
  }
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

  // Komodo Auto : on garde l'image (et l'elo affiché) de Komodo
  const isAuto = isAutoEngine(engineId);
  const data = isAuto ? engineData["komodo"] : engineData[engineId];
  if (!data) return;

  nameEl.className = "coach-name";
  nameEl.textContent = isAuto ? "Komodo Auto" : data.label;
  langEl.textContent = data.elo;
  badge.style.display = "flex";

  img.src = data.pic;
  img.alt = isAuto ? "Komodo Auto" : data.label;
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
  // Komodo Auto = pas d'automatisation, donc pas de filtre
  if (n < 2 || isAutoEngine(chessConfig.engine)) {
    wrap.style.display = "none";
    return;
  }
  wrap.style.display = "";

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
  chessConfig.percentage[0] = Math.max(
    0,
    chessConfig.percentage[0] + 100 - acc,
  );

  updateChessUI();
  saveChessConfig();
};

function applyEngineSettings(engine) {
  updateEngineAvatar(engine);

  hideAllSetting();

  // Komodo Auto : mêmes réglages de base que Komodo, mais affichage réduit
  if (isAutoEngine(engine)) {
    showAutoSetting();

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

    updateChessUI();
    return;
  }

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
    "opening",
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
    "special"
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
  el("specialLabel").textContent =
    `Special Swipe (${chessConfig.special ? "ON" : "OFF"})`;
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
  "opening",
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
  "special"
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

el("review").onclick = async () => {
  chrome.runtime.sendMessage({
    type: "open_review"
  });
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

/* ================= ACCOUNT GENERATOR ================= */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// état de validité de chaque champ
const accValid = { email: false, username: false, password: false };

// nombre max d'essais pour trouver un email / username disponible
const MAX_GEN_ATTEMPTS = 15;

function debounce(fn, delay = 500) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

function setAccStatus(statusId, inputId, state, message) {
  // state : "ok" | "bad" | "loading" | ""
  const status = el(statusId);
  const input = el(inputId);
  status.className = "acc-status" + (state ? " " + state : "");
  status.textContent = message || "";
  input.classList.toggle("ok", state === "ok");
  input.classList.toggle("bad", state === "bad");
}

function updateCreateBtn() {
  el("createAccBtn").disabled = !(
    accValid.email &&
    accValid.username &&
    accValid.password
  );
}

/* ---------- RANDOM GENERATORS ---------- */
function randomInt(min, max) {
  // entier aléatoire dans [min, max]
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomString(length, chars) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

// version cryptographiquement sûre (utilisée pour le mot de passe)
function secureRandomInt(max) {
  const buf = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / max) * max; // évite le biais modulo
  do {
    crypto.getRandomValues(buf);
  } while (buf[0] >= limit);
  return buf[0] % max;
}

function securePick(chars) {
  return chars[secureRandomInt(chars.length)];
}

const EMAIL_DOMAINS = [
  "aol.com",
  "arcor.de",
  "att.net",
  "free.fr",
  "zonnet.nl",
  "earthlink.net",
  "comcast.net",
  "sbcglobal.net",
  "neuf.fr",
  "uol.com.br",
  "orange.fr",
  "planet.nl",
  "terra.com.br",
  "juno.com",
  "live.com",
  "verizon.net",
  "wanadoo.fr",
];

function generateEmail() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const length = randomInt(12, 20);
  const domain = EMAIL_DOMAINS[Math.floor(Math.random() * EMAIL_DOMAINS.length)];
  return `${randomString(length, chars)}@${domain}`;
}

function generateUsername() {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const chars = letters + "0123456789_";
  const length = randomInt(15, 25);
  // commence toujours par une lettre
  return randomString(1, letters) + randomString(length - 1, chars);
}

function generatePassword() {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const all = lower + upper + digits;
  const length = 12 + secureRandomInt(5); // 12 à 16

  // au moins 1 minuscule, 1 majuscule, 1 chiffre
  const out = [securePick(lower), securePick(upper), securePick(digits)];
  while (out.length < length) out.push(securePick(all));

  // mélange Fisher-Yates
  for (let i = out.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out.join("");
}

/* ---------- CHESS.COM API CALLS ---------- */
// Retourne { ok, label?, error? }
async function validateEmailApi(value) {
  try {
    const res = await fetch(
      "https://api.chess.com/rpc/chesscom.authentication.v1.EmailValidationService/Validate",
      {
        method: "POST",
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US",
          "cache-control": "no-cache",
          "connect-protocol-version": "1",
          "content-type": "application/json",
          pragma: "no-cache",
        },
        body: JSON.stringify({ email: value }),
        mode: "cors",
        credentials: "include",
      },
    );
    const data = await res.json();
    if (data.status === "EMAIL_STATUS_AVAILABLE") return { ok: true };
    const label = String(data.status || "UNKNOWN")
      .replace("EMAIL_STATUS_", "")
      .replace(/_/g, " ")
      .toLowerCase();
    return { ok: false, label };
  } catch (err) {
    return { ok: false, error: true };
  }
}

// Retourne { ok, message?, suggestions?, error? }
async function validateUsernameApi(value) {
  try {
    const res = await fetch(
      "https://www.chess.com/callback/user/valid?username=" +
        encodeURIComponent(value),
      {
        method: "GET",
        headers: {
          accept: "application/json, text/plain, */*",
          "cache-control": "no-cache",
          pragma: "no-cache",
        },
        mode: "cors",
        credentials: "include",
      },
    );
    const data = await res.json();
    const message =
      Array.isArray(data.messages) && data.messages.length
        ? data.messages[0]
        : "";
    return {
      ok: data.valid === true,
      message,
      suggestions: Array.isArray(data.usernameSuggestions)
        ? data.usernameSuggestions
        : [],
    };
  } catch (err) {
    return { ok: false, error: true };
  }
}

/* ---------- EMAIL ---------- */
let emailReqId = 0;

const checkEmailRemote = debounce(async (value) => {
  // l'utilisateur a changé la valeur (ou un Generate est passé) entre-temps
  if (value !== el("accEmail").value.trim()) return;

  const myId = ++emailReqId;
  const r = await validateEmailApi(value);

  // une réponse plus récente a été lancée entre-temps -> on ignore
  if (myId !== emailReqId) return;

  if (r.ok) {
    accValid.email = true;
    setAccStatus("accEmailStatus", "accEmail", "ok", "✓ Email available");
  } else if (r.error) {
    accValid.email = false;
    setAccStatus("accEmailStatus", "accEmail", "bad", "✗ Could not verify email (network error)");
  } else {
    accValid.email = false;
    setAccStatus("accEmailStatus", "accEmail", "bad", `✗ Email not valid (${r.label})`);
  }
  updateCreateBtn();
}, 500);

el("accEmail").addEventListener("input", (e) => {
  const value = e.target.value.trim();
  emailReqId++; // invalide toute requête / génération en cours
  accValid.email = false;
  updateCreateBtn();

  if (!value) {
    setAccStatus("accEmailStatus", "accEmail", "", "");
    return;
  }
  if (!EMAIL_RE.test(value)) {
    setAccStatus("accEmailStatus", "accEmail", "bad", "✗ Invalid email format");
    return;
  }
  setAccStatus("accEmailStatus", "accEmail", "loading", "Checking…");
  checkEmailRemote(value);
});

// Génère des emails jusqu'à en trouver un disponible chez chess.com.
// Retourne true si un email valide a été placé dans le champ.
async function runGenerateEmail() {
  const token = ++emailReqId;
  accValid.email = false;
  updateCreateBtn();

  let networkErrors = 0;

  for (let i = 1; i <= MAX_GEN_ATTEMPTS; i++) {
    const candidate = generateEmail();
    el("accEmail").value = candidate;
    setAccStatus(
      "accEmailStatus",
      "accEmail",
      "loading",
      `Generating… (try ${i}/${MAX_GEN_ATTEMPTS})`,
    );

    const r = await validateEmailApi(candidate);
    if (token !== emailReqId) return false; // l'utilisateur a modifié le champ

    if (r.ok) {
      accValid.email = true;
      setAccStatus("accEmailStatus", "accEmail", "ok", "✓ Email available");
      updateCreateBtn();
      return true;
    }

    if (r.error && ++networkErrors >= 3) {
      setAccStatus("accEmailStatus", "accEmail", "bad", "✗ Network error, could not generate an email");
      updateCreateBtn();
      return false;
    }
  }

  setAccStatus("accEmailStatus", "accEmail", "bad", "✗ No available email found, try again");
  updateCreateBtn();
  return false;
}

/* ---------- USERNAME ---------- */
let usernameReqId = 0;

const checkUsernameRemote = debounce(async (value) => {
  if (value !== el("accUsername").value.trim()) return;

  const myId = ++usernameReqId;
  const r = await validateUsernameApi(value);

  if (myId !== usernameReqId) return;

  if (r.error) {
    accValid.username = false;
    setAccStatus("accUsernameStatus", "accUsername", "bad", "✗ Could not verify username (network error)");
  } else if (r.ok) {
    accValid.username = true;
    setAccStatus("accUsernameStatus", "accUsername", "ok", "✓ " + (r.message || "Username is valid"));
  } else {
    accValid.username = false;
    let text = "✗ " + (r.message || "Username not available");
    if (r.suggestions.length) {
      text += " — try: " + r.suggestions.slice(0, 3).join(", ");
    }
    setAccStatus("accUsernameStatus", "accUsername", "bad", text);
  }
  updateCreateBtn();
}, 500);

el("accUsername").addEventListener("input", (e) => {
  const value = e.target.value.trim();
  usernameReqId++;
  accValid.username = false;
  updateCreateBtn();

  if (!value) {
    setAccStatus("accUsernameStatus", "accUsername", "", "");
    return;
  }
  if (value.length < 3 || value.length > 25) {
    setAccStatus(
      "accUsernameStatus",
      "accUsername",
      "bad",
      "✗ Username must be 3–25 characters",
    );
    return;
  }
  setAccStatus("accUsernameStatus", "accUsername", "loading", "Checking…");
  checkUsernameRemote(value);
});

// Génère des usernames jusqu'à en trouver un valide chez chess.com.
async function runGenerateUsername() {
  const token = ++usernameReqId;
  accValid.username = false;
  updateCreateBtn();

  let networkErrors = 0;

  for (let i = 1; i <= MAX_GEN_ATTEMPTS; i++) {
    const candidate = generateUsername();
    el("accUsername").value = candidate;
    setAccStatus(
      "accUsernameStatus",
      "accUsername",
      "loading",
      `Generating… (try ${i}/${MAX_GEN_ATTEMPTS})`,
    );

    const r = await validateUsernameApi(candidate);
    if (token !== usernameReqId) return false;

    if (r.ok) {
      accValid.username = true;
      setAccStatus("accUsernameStatus", "accUsername", "ok", "✓ " + (r.message || "Username is valid"));
      updateCreateBtn();
      return true;
    }

    if (r.error && ++networkErrors >= 3) {
      setAccStatus("accUsernameStatus", "accUsername", "bad", "✗ Network error, could not generate a username");
      updateCreateBtn();
      return false;
    }
  }

  setAccStatus("accUsernameStatus", "accUsername", "bad", "✗ No valid username found, try again");
  updateCreateBtn();
  return false;
}

/* ---------- PASSWORD ---------- */
const PASSWORD_RULES = {
  len: (v) => v.length >= 8,
  lower: (v) => /[a-z]/.test(v),
  upper: (v) => /[A-Z]/.test(v),
  num: (v) => /[0-9]/.test(v),
};

function validatePasswordUI() {
  const value = el("accPassword").value;
  let allOk = true;

  document.querySelectorAll("#accPwRules li").forEach((li) => {
    const ok = PASSWORD_RULES[li.dataset.rule](value);
    li.classList.toggle("ok", ok);
    if (!ok) allOk = false;
  });

  accValid.password = allOk;
  el("accPassword").classList.toggle("ok", allOk && value.length > 0);
  el("accPassword").classList.toggle("bad", !allOk && value.length > 0);
  updateCreateBtn();
}

el("accPassword").addEventListener("input", validatePasswordUI);

function setPasswordVisible(show) {
  el("accPassword").type = show ? "text" : "password";
  el("accTogglePw").textContent = show ? "Hide" : "Show";
}

el("accTogglePw").onclick = () => {
  setPasswordVisible(el("accPassword").type === "password");
};

function runGeneratePassword() {
  el("accPassword").value = generatePassword();
  setPasswordVisible(true); // on l'affiche pour que l'utilisateur puisse le noter
  validatePasswordUI();
  return true;
}

/* ---------- GENERATE BUTTONS ---------- */
const genButtons = ["genEmailBtn", "genUsernameBtn", "genPasswordBtn", "genAllBtn"];

function setGenBusy(busy) {
  genButtons.forEach((id) => {
    const btn = el(id);
    btn.disabled = busy;
    btn.classList.toggle("loading", busy);
  });
}

async function withBusy(fn) {
  setGenBusy(true);
  try {
    return await fn();
  } finally {
    setGenBusy(false);
  }
}

el("genEmailBtn").onclick = () => withBusy(runGenerateEmail);
el("genUsernameBtn").onclick = () => withBusy(runGenerateUsername);
el("genPasswordBtn").onclick = () => withBusy(async () => runGeneratePassword());

el("genAllBtn").onclick = () =>
  withBusy(async () => {
    const feedback = el("accFeedback");
    feedback.textContent = "Generating…";
    feedback.className = "load-feedback";

    runGeneratePassword();

    // email et username sont cherchés en parallèle
    const [emailOk, usernameOk] = await Promise.all([
      runGenerateEmail(),
      runGenerateUsername(),
    ]);

    if (emailOk && usernameOk) {
      feedback.textContent = "✓ Email, username and password generated.";
      feedback.className = "load-feedback success";
    } else {
      feedback.textContent = "✗ Some fields could not be generated, try again.";
      feedback.className = "load-feedback error";
    }
  });

/* ---------- CREATE ---------- */
el("createAccBtn").onclick = () => {
  if (!(accValid.email && accValid.username && accValid.password)) return;

  chrome.runtime.sendMessage({
    type: "create",
    email: el("accEmail").value.trim(),
    password: el("accPassword").value,
    username: el("accUsername").value.trim(),
  });

  const feedback = el("accFeedback");
  feedback.textContent = "✓ Account creation request sent.";
  feedback.className = "load-feedback success";
};

updateCreateBtn();