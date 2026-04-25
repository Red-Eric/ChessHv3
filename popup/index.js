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


const coachData = {
  "David":  { pic: "https://assets-coaches.chess.com/image/coachdavid.png" },
  "Mae":    { pic: "https://assets-coaches.chess.com/image/coachmae.png" },
  "Dante":  { pic: "https://assets-coaches.chess.com/image/coachdante.png" },
  "Nadia":  { pic: "https://assets-coaches.chess.com/image/coachnadia.png" },
  "Levy":   { pic: "https://assets-coaches.chess.com/image/coachlevy.png" },
  "Magnus": { pic: "https://assets-coaches.chess.com/image/coachmagnus.png" },
  "Hikaru": { pic: "https://assets-coaches.chess.com/image/coachhikaru.png" },
  "Anna":   { pic: "https://assets-coaches.chess.com/image/coachanna.png" },
  "Canty":  { pic: "https://assets-coaches.chess.com/image/coachcanty.png" },
  "Vishy":  { pic: "https://assets-coaches.chess.com/image/coachvishy.png" },
  "Tania":  { pic: "https://assets-coaches.chess.com/image/coachtania.png" },
  "Danny":  { pic: "https://assets-coaches.chess.com/image/coachdanny.png" },
  "Botez":  { pic: "https://assets-coaches.chess.com/image/coachbotezsisters-icon.png" },
  "Ben":    { pic: "https://assets-coaches.chess.com/image/coachben.png" },
};

const coachLangs = {
  0:"English",1:"Français",2:"Español",3:"عربي",4:"Русский",5:"Português",
  6:"Deutsch",7:"Italiano",8:"Türkçe",9:"Polski",10:"한국어",11:"Indonesia",
  12:"English",13:"Français",14:"Español",15:"عربي",16:"Русский",17:"Português",
  18:"Deutsch",19:"Italiano",20:"Türkçe",21:"Polski",22:"한국어",23:"Indonesia",
  24:"English",25:"Français",26:"Español",27:"عربي",28:"Русский",29:"Português",
  30:"Deutsch",31:"Italiano",32:"Türkçe",33:"Polski",34:"한국어",35:"Indonesia",
  36:"English",37:"Français",38:"Español",39:"عربي",40:"Русский",41:"Português",
  42:"Deutsch",43:"Italiano",44:"Türkçe",45:"Polski",46:"한국어",47:"Indonesia",
  48:"English",49:"English",50:"English",51:"English",52:"English",
  53:"English",54:"English",55:"English",56:"English",57:"English",
};

const coachNames = {
  0:"David",1:"David",2:"David",3:"David",4:"David",5:"David",6:"David",7:"David",8:"David",9:"David",10:"David",11:"David",
  12:"Mae",13:"Mae",14:"Mae",15:"Mae",16:"Mae",17:"Mae",18:"Mae",19:"Mae",20:"Mae",21:"Mae",22:"Mae",23:"Mae",
  24:"Dante",25:"Dante",26:"Dante",27:"Dante",28:"Dante",29:"Dante",30:"Dante",31:"Dante",32:"Dante",33:"Dante",34:"Dante",35:"Dante",
  36:"Nadia",37:"Nadia",38:"Nadia",39:"Nadia",40:"Nadia",41:"Nadia",42:"Nadia",43:"Nadia",44:"Nadia",45:"Nadia",46:"Nadia",47:"Nadia",
  48:"Levy",49:"Magnus",50:"Hikaru",51:"Anna",52:"Canty",53:"Vishy",54:"Tania",55:"Danny",56:"Botez",57:"Ben"
};

function updateCoachAvatar(coachId) {
  const none = document.getElementById("coachAvatarNone");
  const img  = document.getElementById("coachAvatarImg");
  const badge = document.getElementById("coachBadge");
  const nameEl = document.getElementById("coachDisplayName");
  const langEl = document.getElementById("coachDisplayLang");

  if (coachId === 999) {
    none.style.display = "flex";
    img.style.display  = "none";
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
    img.onerror = () => { img.style.display = "none"; none.style.display = "flex"; };
  } else {
    img.style.display = "none";
    none.style.display = "flex";
  }
}

const el = (id) => document.getElementById(id);

/* ================= CONFIG ================= */
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
  floatingBtn : false,
  speach: false,
  moveClassification: false,
  autoStart: false,
  winningMove: false,
  showEval: false,
  onlyShowEval: false,
  key: "a",
  key2: "z"
};


const infoCoach = [
  { name: "David", pictureUrl: "https://assets-coaches.chess.com/image/coachdavid.png", audioUrl: "https://text-and-audio.chess.com/prod/released/David_coach/en-US/6547b8d0c97cd470556c1cab780d520750e1474f9566199395fd640507931de8.mp3" },
  { name: "David", pictureUrl: "https://assets-coaches.chess.com/image/coachdavid.png", audioUrl: "https://text-and-audio.chess.com/prod/released/David_coach/en-US/1cb21b7c928dc9a9f07fa11cc233be4b9ae88c5b9152a07415c23ee8d5bb4a8a.mp3" },
  { name: "David", pictureUrl: "https://assets-coaches.chess.com/image/coachdavid.png", audioUrl: "https://text-and-audio.chess.com/prod/released/David_coach/en-US/13e432e30b5beb3b5489608781c1bdc968fc6dbe28aebe4bd0db78c1fae43a54.mp3" },
  { name: "David", pictureUrl: "https://assets-coaches.chess.com/image/coachdavid.png", audioUrl: "https://text-and-audio.chess.com/prod/released/David_coach/en-US/cfc736c0df6ab8438427e5df841f849800a16690668fce360a5aeda99a50860d.mp3" },
  { name: "David", pictureUrl: "https://assets-coaches.chess.com/image/coachdavid.png", audioUrl: "https://text-and-audio.chess.com/prod/released/David_coach/en-US/c1376a09ff6ae0925e3c480e0ef667d4c5780e6db54c3f389329d4df8ff6974a.mp3" },
  { name: "Mae", pictureUrl: "https://assets-coaches.chess.com/image/coachmae.png", audioUrl: "https://text-and-audio.chess.com/prod/released/Mae_coach/en-US/1f37eb5ce41f900a3a771920313d70625477b43a33020674fc282bf301017b39.mp3" },
  { name: "Mae", pictureUrl: "https://assets-coaches.chess.com/image/coachmae.png", audioUrl: "https://text-and-audio.chess.com/prod/released/Mae_coach/en-US/5ee315915acc75abef70ee00c3b621b2940136666bf10a5346fd98df4bc48897.mp3" },
  { name: "Mae", pictureUrl: "https://assets-coaches.chess.com/image/coachmae.png", audioUrl: "https://text-and-audio.chess.com/prod/released/Mae_coach/en-US/725866514a2dc39fa59f4251c1d4650cb29d3ff57b1006270dbf46625e44354e.mp3" },
  { name: "Mae", pictureUrl: "https://assets-coaches.chess.com/image/coachmae.png", audioUrl: "https://text-and-audio.chess.com/prod/released/Mae_coach/en-US/2fdbe96f626b7be4ef7cf401e67751504ba4e65fdec4fb5b1e0fb4ca368a8428.mp3" },
  { name: "Mae", pictureUrl: "https://assets-coaches.chess.com/image/coachmae.png", audioUrl: "https://text-and-audio.chess.com/prod/released/Mae_coach/en-US/c38a533cbb451e8aca013dc34ace6f8adc602441b2f9ed9ec55a30d7634bc4f2.mp3" },
  { name: "Dante", pictureUrl: "https://assets-coaches.chess.com/image/coachdante.png", audioUrl: "https://text-and-audio.chess.com/prod/released/Dante_coach/en-US/24384ec55eff42b3f8a6db7c059740fdd8f47121947efd4f8cfadf92167bd6e0.mp3" },
  { name: "Dante", pictureUrl: "https://assets-coaches.chess.com/image/coachdante.png", audioUrl: "https://text-and-audio.chess.com/prod/released/Dante_coach/en-US/e21a3cbbc9a9b96d2ba5d5bf0f1fadd277932c260e6578709f7d52dc3a1032fa.mp3" },
  { name: "Dante", pictureUrl: "https://assets-coaches.chess.com/image/coachdante.png", audioUrl: "https://text-and-audio.chess.com/prod/released/Dante_coach/en-US/4e1840dc184b8a23abe71839f3972e07020316f9cb2ec98c670d94072f329e1e.mp3" },
  { name: "Dante", pictureUrl: "https://assets-coaches.chess.com/image/coachdante.png", audioUrl: "https://text-and-audio.chess.com/prod/released/Dante_coach/en-US/354937996a4d8ca923d470f6157511c70ba7c92aa69847f402e077048e1f6193.mp3" },
  { name: "Dante", pictureUrl: "https://assets-coaches.chess.com/image/coachdante.png", audioUrl: "https://text-and-audio.chess.com/prod/released/Dante_coach/en-US/51760dc161aca85d9b69cd6eb67aa5c771ce1edd643d85b2fa3835a56dfedf42.mp3" },
  { name: "Nadia", pictureUrl: "https://assets-coaches.chess.com/image/coachnadia.png", audioUrl: "https://text-and-audio.chess.com/prod/released/Nadia_coach/en-US/383d01808be1075cca567646909c86bbcc7ef3cd6501f30024923cfabb9c0fe2.mp3" },
  { name: "Nadia", pictureUrl: "https://assets-coaches.chess.com/image/coachnadia.png", audioUrl: "https://text-and-audio.chess.com/prod/released/Nadia_coach/en-US/6e3461aa795acde235c3cf7af4d2319b204c2b2682ae5ae41a06820acfda8cbd.mp3" },
  { name: "Nadia", pictureUrl: "https://assets-coaches.chess.com/image/coachnadia.png", audioUrl: "https://text-and-audio.chess.com/prod/released/Nadia_coach/en-US/24b356e078a25b5515db86bbc7bf3963e55da777f621318b7635831455e3ff1e.mp3" },
  { name: "Nadia", pictureUrl: "https://assets-coaches.chess.com/image/coachnadia.png", audioUrl: "https://text-and-audio.chess.com/prod/released/Nadia_coach/en-US/22c4dcf8c428eebe3d45da8a996020b790df7f7e9a119c84c75eb1e5bccb3fde.mp3" },
  { name: "Nadia", pictureUrl: "https://assets-coaches.chess.com/image/coachnadia.png", audioUrl: "https://text-and-audio.chess.com/prod/released/Nadia_coach/en-US/6d3b25278347165c5535341a789ccb5e58408eec902aad2a4f357b55fe678eef.mp3" },
  { name: "Levy",   pictureUrl: "https://assets-coaches.chess.com/image/coachlevy.png",   audioUrl: "https://text-and-audio.chess.com/prod/released/Levy_coach/en-US/b36a35b100e1ad842020b45f1bbcac3421b83588423e578ad1e2ffa245d259dd.mp3" },
  { name: "Magnus", pictureUrl: "https://assets-coaches.chess.com/image/coachmagnus.png", audioUrl: "https://text-and-audio.chess.com/prod/released/Magnus_coach/en-US/41993d324d439ec0bd16d2dd8f5ca671e8cada7eb3e41c5a77724886d7b5a943.mp3" },
  { name: "Hikaru", pictureUrl: "https://assets-coaches.chess.com/image/coachhikaru.png", audioUrl: "https://text-and-audio.chess.com/prod/released/Hikaru_coach/en-US/ecab2b84127ec2110ff56f43366c53f5b926bcbc7d201c0e1eba5a32563b0bf2.mp3" },
  { name: "Anna",   pictureUrl: "https://assets-coaches.chess.com/image/coachanna.png",   audioUrl: "https://text-and-audio.chess.com/prod/released/Anna_coach/en-US/37eb03999bac8f1688f4fd407acbbf74dc31d025b0a2e120ee76867064e11d1a.mp3" },
];

var chessConfig = { ...defaultChessConfig };

function loadChessConfig(callback) {
  chrome.storage.local.get(["chessConfig"], function (result) {
    const savedConfig = result.chessConfig;
    chessConfig = savedConfig
      ? { ...defaultChessConfig, ...savedConfig }
      : { ...defaultChessConfig };

    el("coach-container").style.display = chessConfig.coach === 999 ? "none" : "";
    updateChessUI();
    if (callback) callback();
  });
}

function saveChessConfig() {
  chrome.storage.local.set({ chessConfig }, () => console.log("Config saved"));
}

function hideExtraColorInputs(lines) {
  document.querySelectorAll('input[type="color"]').forEach((input, i) => {
    input.parentElement.style.display = i >= lines ? "none" : "";
  });
}

function updateChessUI() {
  ["elo", "lines", "depth", "delay", "depth2"].forEach(
    (k) => (el(k).value = chessConfig[k])
  );
  el("style").value = chessConfig.style;
  el("coach").value = chessConfig.coach;
  el("key").value   = chessConfig.key;
  el("key2").value   = chessConfig.key2;

  ["autoMove","winningMove","autoStart","showEval","onlyShowEval","moveClassification","speach","floatingBtn"]
    .forEach((k) => (el(k).checked = chessConfig[k]));

  el("eloValue").textContent   = chessConfig.elo;
  el("linesValue").textContent = chessConfig.lines;
  el("depthValue").textContent = chessConfig.depth;
  el("delayValue").textContent = chessConfig.delay;
  el("depth2Value").textContent = chessConfig.depth2;

  el("autoMoveLabel").textContent           = `Auto Move (${chessConfig.autoMove ? "ON" : "OFF"})`;
  el("floatingBtnLabel").textContent           = `Android FLoating BTN (${chessConfig.autoMove ? "ON" : "OFF"})`;
  el("autoStartLabel").textContent          = `Auto Start Game (${chessConfig.autoStart ? "ON" : "OFF"})`;
  el("moveClassificationStartLabel").textContent = `MoveClassification (${chessConfig.moveClassification ? "ON" : "OFF"})`;
  el("speachStartLabel").textContent        = `Coach voice (${chessConfig.speach ? "ON" : "OFF"})`;
  el("winningMoveLabel").textContent        = `Only Moves That Gain Material (${chessConfig.winningMove ? "ON" : "OFF"})`;
  el("showEvalLabel").textContent           = `Show Eval Bar (${chessConfig.showEval ? "ON" : "OFF"})`;
  el("onlyShowEvalLabel").textContent       = `Hide Arrows and Accuracy Panel (${chessConfig.onlyShowEval ? "ON" : "OFF"})`;

  // Update coach avatar
  if (typeof updateCoachAvatar === "function") {
    updateCoachAvatar(chessConfig.coach);
  }

  hideExtraColorInputs(chessConfig.lines);
}

loadChessConfig(updateChessUI);

/* ================= INPUT HANDLERS ================= */
["elo", "lines", "depth", "delay", "depth2"].forEach((k) => {
  el(k).oninput = (e) => {
    chessConfig[k] = +e.target.value;
    updateChessUI();
    saveChessConfig();
  };
});

["autoMove","winningMove","autoStart","showEval","onlyShowEval","moveClassification","speach","floatingBtn"]
  .forEach((k) => {
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

document.querySelector("#stream").onclick = () => {
  chrome.runtime.sendMessage({ type: "stream" });
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
  await chrome.storage.local.clear();
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