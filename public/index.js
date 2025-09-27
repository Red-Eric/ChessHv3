// ----- Chess.com -----
const elo = document.getElementById("elo");
const lines = document.getElementById("lines");
const depth = document.getElementById("depth");
const delay = document.getElementById("delay");
const eloValue = document.getElementById("eloValue");
const linesValue = document.getElementById("linesValue");
const depthValue = document.getElementById("depthValue");
const delayValue = document.getElementById("delayValue");
const autoMove = document.getElementById("autoMove");
const autoMoveLabel = document.getElementById("autoMoveLabel");
const winningMove = document.getElementById("winningMove");
const winningMoveLabel = document.getElementById("winningMoveLabel");
const showEval = document.getElementById("showEval");
const showEvalLabel = document.getElementById("showEvalLabel");
const onlyShowEval = document.getElementById("onlyShowEval");
const onlyShowEvalLabel = document.getElementById("onlyShowEvalLabel");

const skillToElo = {
  0:1000,1:1200,2:1350,3:1450,4:1550,5:1650,
  6:1750,7:1850,8:1950,9:2050,10:2150,11:2250,
  12:2350,13:2450,14:2550,15:2650,16:2750,17:2850,
  18:2950,19:3050,20:3200
};

let chessConfig = JSON.parse(localStorage.getItem("chessConfig")) || {
  skill:20, lines:5, depth:10, delay:100,
  autoMove:false, winningMove:false,
  showEval:false, onlyShowEval:false
};

// ----- Init Chess.com -----
elo.value = chessConfig.skill;
lines.value = chessConfig.lines;
depth.value = chessConfig.depth;
delay.value = chessConfig.delay;
autoMove.checked = chessConfig.autoMove;
winningMove.checked = chessConfig.winningMove;
showEval.checked = chessConfig.showEval;
onlyShowEval.checked = chessConfig.onlyShowEval;

eloValue.textContent = `Skill: ${chessConfig.skill} (${skillToElo[chessConfig.skill]} Elo)`;
linesValue.textContent = chessConfig.lines;
depthValue.textContent = chessConfig.depth;
delayValue.textContent = chessConfig.delay;
autoMoveLabel.textContent = `Auto Move (${autoMove.checked ? "ON" : "OFF"})`;
winningMoveLabel.textContent = `Only Show Winning Move (${winningMove.checked ? "ON" : "OFF"})`;
showEvalLabel.textContent = `Show Eval Bar (${showEval.checked ? "ON" : "OFF"})`;
onlyShowEvalLabel.textContent = `Only Show Eval Bar (${onlyShowEval.checked ? "ON" : "OFF"})`;

function saveChessConfig() {
  localStorage.setItem("chessConfig", JSON.stringify(chessConfig));
  console.log("Chess.com config:", chessConfig);
  if (typeof chrome !== "undefined" && chrome.runtime) {
    chrome.runtime.sendMessage({ type:"config", config:chessConfig });
    
  }
}

// ----- Listeners Chess.com -----
elo.addEventListener("input", ()=>{
  chessConfig.skill = parseInt(elo.value);
  eloValue.textContent = `Skill: ${chessConfig.skill} (${skillToElo[chessConfig.skill]} Elo)`;
  saveChessConfig();
});
lines.addEventListener("input", ()=>{
  chessConfig.lines = parseInt(lines.value);
  linesValue.textContent = chessConfig.lines;
  saveChessConfig();
});
depth.addEventListener("input", ()=>{
  chessConfig.depth = parseInt(depth.value);
  depthValue.textContent = chessConfig.depth;
  saveChessConfig();
});
delay.addEventListener("input", ()=>{
  chessConfig.delay = parseInt(delay.value);
  delayValue.textContent = chessConfig.delay;
  saveChessConfig();
});
autoMove.addEventListener("change", ()=>{
  chessConfig.autoMove = autoMove.checked;
  autoMoveLabel.textContent = `Auto Move (${autoMove.checked ? "ON":"OFF"})`;
  saveChessConfig();
});
winningMove.addEventListener("change", ()=>{
  chessConfig.winningMove = winningMove.checked;
  winningMoveLabel.textContent = `Only Show Winning Move (${winningMove.checked ? "ON":"OFF"})`;
  saveChessConfig();
});
showEval.addEventListener("change", ()=>{
  chessConfig.showEval = showEval.checked;
  showEvalLabel.textContent=`Show Eval Bar (${showEval.checked ? "ON":"OFF"})`;
  if(!showEval.checked){
    chessConfig.onlyShowEval=false;
    onlyShowEval.checked=false;
    onlyShowEvalLabel.textContent=`Only Show Eval Bar (OFF)`;
  }
  saveChessConfig();
});
onlyShowEval.addEventListener("change", ()=>{
  if(!showEval.checked && onlyShowEval.checked){ onlyShowEval.checked=false; return; }
  chessConfig.onlyShowEval = onlyShowEval.checked;
  onlyShowEvalLabel.textContent=`Only Show Eval Bar (${onlyShowEval.checked?"ON":"OFF"})`;
  saveChessConfig();
});

// ----- Lichess (pas d'autoMove) -----
const elo2 = document.getElementById("elo2");
const lines2 = document.getElementById("lines2");
const depth2 = document.getElementById("depth2");
const winningMove2 = document.getElementById("winningMove2");
const winningMoveLabel2 = document.getElementById("winningMoveLabel2");
const showEval2 = document.getElementById("showEval2");
const showEvalLabel2 = document.getElementById("showEvalLabel2");
const onlyShowEval2 = document.getElementById("onlyShowEval2");
const onlyShowEvalLabel2 = document.getElementById("onlyShowEvalLabel2");

let lichessConfig = JSON.parse(localStorage.getItem("lichessConfig")) || {
  skill:20, lines:5, depth:10,
  winningMove:false, showEval:false, onlyShowEval:false
};

elo2.value = lichessConfig.skill;
lines2.value = lichessConfig.lines;
depth2.value = lichessConfig.depth;
winningMove2.checked = lichessConfig.winningMove;
showEval2.checked = lichessConfig.showEval;
onlyShowEval2.checked = lichessConfig.onlyShowEval;

eloValue2.textContent = `Skill: ${lichessConfig.skill} (${skillToElo[lichessConfig.skill]} Elo)`;
linesValue2.textContent = lichessConfig.lines;
depthValue2.textContent = lichessConfig.depth;
winningMoveLabel2.textContent = `Only Show Winning Move (${winningMove2.checked ? "ON" : "OFF"})`;
showEvalLabel2.textContent = `Show Eval Bar (${showEval2.checked ? "ON" : "OFF"})`;
onlyShowEvalLabel2.textContent = `Only Show Eval Bar (${onlyShowEval2.checked ? "ON" : "OFF"})`;

function saveLichessConfig() {
  localStorage.setItem("lichessConfig", JSON.stringify(lichessConfig));
  console.log("Lichess config:", lichessConfig);
  if(typeof chrome !== "undefined" && chrome.runtime){
    chrome.runtime.sendMessage({type:"config", config:lichessConfig});
  }
}

// ----- Listeners Lichess -----
elo2.addEventListener("input", ()=>{
  lichessConfig.skill=parseInt(elo2.value);
  eloValue2.textContent=`Skill: ${lichessConfig.skill} (${skillToElo[lichessConfig.skill]} Elo)`;
  saveLichessConfig();
});
lines2.addEventListener("input", ()=>{
  lichessConfig.lines=parseInt(lines2.value);
  linesValue2.textContent=lichessConfig.lines;
  saveLichessConfig();
});
depth2.addEventListener("input", ()=>{
  lichessConfig.depth=parseInt(depth2.value);
  depthValue2.textContent=lichessConfig.depth;
  saveLichessConfig();
});
winningMove2.addEventListener("change", ()=>{
  lichessConfig.winningMove=winningMove2.checked;
  winningMoveLabel2.textContent=`Only Show Winning Move (${winningMove2.checked?"ON":"OFF"})`;
  saveLichessConfig();
});
showEval2.addEventListener("change", ()=>{
  lichessConfig.showEval=showEval2.checked;
  showEvalLabel2.textContent=`Show Eval Bar (${showEval2.checked?"ON":"OFF"})`;
  if(!showEval2.checked){
    lichessConfig.onlyShowEval=false;
    onlyShowEval2.checked=false;
    onlyShowEvalLabel2.textContent=`Only Show Eval Bar (OFF)`;
  }
  saveLichessConfig();
});
onlyShowEval2.addEventListener("change", ()=>{
  if(!showEval2.checked && onlyShowEval2.checked){ onlyShowEval2.checked=false; return; }
  lichessConfig.onlyShowEval=onlyShowEval2.checked;
  onlyShowEvalLabel2.textContent=`Only Show Eval Bar (${onlyShowEval2.checked?"ON":"OFF"})`;
  saveLichessConfig();
});
