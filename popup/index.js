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

const audio = new Audio()

const infoCoach = [
  {
    name: "David",
    pictureUrl: "https://assets-coaches.chess.com/image/coachdavid.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/David_coach/en-FR/6547b8d0c97cd470556c1cab780d520750e1474f9566199395fd640507931de8.mp3"
  },
  {
    name: "David",
    pictureUrl: "https://assets-coaches.chess.com/image/coachdavid.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/David_coach/en-US/1cb21b7c928dc9a9f07fa11cc233be4b9ae88c5b9152a07415c23ee8d5bb4a8a.mp3"
  },
  {
    name: "David",
    pictureUrl: "https://assets-coaches.chess.com/image/coachdavid.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/David_coach/en-US/13e432e30b5beb3b5489608781c1bdc968fc6dbe28aebe4bd0db78c1fae43a54.mp3"
  },
  {
    name: "David",
    pictureUrl: "https://assets-coaches.chess.com/image/coachdavid.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/David_coach/en-US/cfc736c0df6ab8438427e5df841f849800a16690668fce360a5aeda99a50860d.mp3"
  },
  {
    name: "David",
    pictureUrl: "https://assets-coaches.chess.com/image/coachdavid.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/David_coach/en-US/c1376a09ff6ae0925e3c480e0ef667d4c5780e6db54c3f389329d4df8ff6974a.mp3"
  },

  {
    name: "Mae",
    pictureUrl: "https://assets-coaches.chess.com/image/coachmae.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/Mae_coach/en-US/1f37eb5ce41f900a3a771920313d70625477b43a33020674fc282bf301017b39.mp3"
  },
  {
    name: "Mae",
    pictureUrl: "https://assets-coaches.chess.com/image/coachmae.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/Mae_coach/en-US/5ee315915acc75abef70ee00c3b621b2940136666bf10a5346fd98df4bc48897.mp3"
  },
  {
    name: "Mae",
    pictureUrl: "https://assets-coaches.chess.com/image/coachmae.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/Mae_coach/en-US/725866514a2dc39fa59f4251c1d4650cb29d3ff57b1006270dbf46625e44354e.mp3"
  },
  {
    name: "Mae",
    pictureUrl: "https://assets-coaches.chess.com/image/coachmae.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/Mae_coach/en-US/2fdbe96f626b7be4ef7cf401e67751504ba4e65fdec4fb5b1e0fb4ca368a8428.mp3"
  },
  {
    name: "Mae",
    pictureUrl: "https://assets-coaches.chess.com/image/coachmae.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/Mae_coach/en-US/c38a533cbb451e8aca013dc34ace6f8adc602441b2f9ed9ec55a30d7634bc4f2.mp3"
  },

  {
    name: "Dante",
    pictureUrl: "https://assets-coaches.chess.com/image/coachdante.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/Dante_coach/en-US/24384ec55eff42b3f8a6db7c059740fdd8f47121947efd4f8cfadf92167bd6e0.mp3"
  },
  {
    name: "Dante",
    pictureUrl: "https://assets-coaches.chess.com/image/coachdante.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/Dante_coach/en-US/e21a3cbbc9a9b96d2ba5d5bf0f1fadd277932c260e6578709f7d52dc3a1032fa.mp3"
  },
  {
    name: "Dante",
    pictureUrl: "https://assets-coaches.chess.com/image/coachdante.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/Dante_coach/en-US/4e1840dc184b8a23abe71839f3972e07020316f9cb2ec98c670d94072f329e1e.mp3"
  },
  {
    name: "Dante",
    pictureUrl: "https://assets-coaches.chess.com/image/coachdante.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/Dante_coach/en-US/354937996a4d8ca923d470f6157511c70ba7c92aa69847f402e077048e1f6193.mp3"
  },
  {
    name: "Dante",
    pictureUrl: "https://assets-coaches.chess.com/image/coachdante.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/Dante_coach/en-US/51760dc161aca85d9b69cd6eb67aa5c771ce1edd643d85b2fa3835a56dfedf42.mp3"
  },

  {
    name: "Nadia",
    pictureUrl: "https://assets-coaches.chess.com/image/coachnadia.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/Nadia_coach/en-US/383d01808be1075cca567646909c86bbcc7ef3cd6501f30024923cfabb9c0fe2.mp3"
  },
  {
    name: "Nadia",
    pictureUrl: "https://assets-coaches.chess.com/image/coachnadia.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/Nadia_coach/en-US/6e3461aa795acde235c3cf7af4d2319b204c2b2682ae5ae41a06820acfda8cbd.mp3"
  },
  {
    name: "Nadia",
    pictureUrl: "https://assets-coaches.chess.com/image/coachnadia.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/Nadia_coach/en-US/24b356e078a25b5515db86bbc7bf3963e55da777f621318b7635831455e3ff1e.mp3"
  },
  {
    name: "Nadia",
    pictureUrl: "https://assets-coaches.chess.com/image/coachnadia.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/Nadia_coach/en-US/22c4dcf8c428eebe3d45da8a996020b790df7f7e9a119c84c75eb1e5bccb3fde.mp3"
  },
  {
    name: "Nadia",
    pictureUrl: "https://assets-coaches.chess.com/image/coachnadia.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/Nadia_coach/en-US/6d3b25278347165c5535341a789ccb5e58408eec902aad2a4f357b55fe678eef.mp3"
  },

  {
    name: "Levy",
    pictureUrl: "https://assets-coaches.chess.com/image/coachlevy.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/Levy_coach/en-US/b36a35b100e1ad842020b45f1bbcac3421b83588423e578ad1e2ffa245d259dd.mp3"
  },
  {
    name: "Magnus",
    pictureUrl: "https://assets-coaches.chess.com/image/coachmagnus.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/Magnus_coach/en-US/41993d324d439ec0bd16d2dd8f5ca671e8cada7eb3e41c5a77724886d7b5a943.mp3"
  },
  {
    name: "Hikaru",
    pictureUrl: "https://assets-coaches.chess.com/image/coachhikaru.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/Hikaru_coach/en-US/ecab2b84127ec2110ff56f43366c53f5b926bcbc7d201c0e1eba5a32563b0bf2.mp3"
  },
  {
    name: "Anna",
    pictureUrl: "https://assets-coaches.chess.com/image/coachanna.png",
    audioUrl: "https://text-and-audio.chess.com/prod/released/Anna_coach/en-US/37eb03999bac8f1688f4fd407acbbf74dc31d025b0a2e120ee76867064e11d1a.mp3"
  }
];


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
  audio.pause()

  if (chessConfig.coach === 999) {
    el("coach-container").style.display = "none";
  } else {
    audio.src = infoCoach[chessConfig.coach].audioUrl
    audio.play()
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
