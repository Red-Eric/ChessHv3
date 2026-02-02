document.addEventListener("DOMContentLoaded", () => {
  chrome?.runtime?.sendMessage({ type: "popupReady" });
});

/* ================= TABS ================= */
document.querySelectorAll(".tab").forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll(".tab, .panel").forEach(e => e.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.panel).classList.add("active");
  };
});

const el = id => document.getElementById(id);

/* ================= CHESS.COM ================= */
let chessConfig = JSON.parse(localStorage.getItem("chessConfig")) || {
  elo: 3500,
  lines: 3,
  depth: 10,
  delay: 100,
  style: "Default",
  autoMove: false,
  winningMove: false,
  showEval: false,
  onlyShowEval: false
};

function updateChessUI() {
  ["elo","lines","depth","delay"].forEach(k => el(k).value = chessConfig[k]);
  el("style").value = chessConfig.style;

  ["autoMove","winningMove","showEval","onlyShowEval"].forEach(k => el(k).checked = chessConfig[k]);

  el("eloValue").textContent = chessConfig.elo;
  el("linesValue").textContent = chessConfig.lines;
  el("depthValue").textContent = chessConfig.depth;
  el("delayValue").textContent = chessConfig.delay;

  el("autoMoveLabel").textContent = `Auto Move (${chessConfig.autoMove ? "ON":"OFF"})`;
  el("winningMoveLabel").textContent = `Only Winning Move (${chessConfig.winningMove ? "ON":"OFF"})`;
  el("showEvalLabel").textContent = `Show Eval Bar (${chessConfig.showEval ? "ON":"OFF"})`;
  el("onlyShowEvalLabel").textContent = `Hide Arrows (${chessConfig.onlyShowEval ? "ON":"OFF"})`;

  console.clear()
  console.log(chessConfig)

}

function saveChess() {
  localStorage.setItem("chessConfig", JSON.stringify(chessConfig));
  chrome?.runtime?.sendMessage({ type: "config", config: chessConfig });
}

["elo","lines","depth","delay"].forEach(k => {
  el(k).oninput = e => {
    chessConfig[k] = +e.target.value;
    updateChessUI(); saveChess();
  };
});

["autoMove","winningMove","showEval","onlyShowEval"].forEach(k => {
  el(k).onchange = e => {
    chessConfig[k] = e.target.checked;
    updateChessUI(); saveChess();
  };
});

el("style").onchange = e => {
  chessConfig.style = e.target.value;
  updateChessUI(); saveChess();
};

updateChessUI();

/* ================= LICHESS ================= */
let lichessConfig = JSON.parse(localStorage.getItem("lichessConfig")) || {
  elo: 3500,
  lines: 3,
  depth: 10,
  style: "Default",
  winningMove: false,
  showEval: false,
  onlyShowEval: false
};

function updateLichessUI() {
  ["elo","lines","depth"].forEach(k => el(k+"2").value = lichessConfig[k]);
  el("style2").value = lichessConfig.style;

  ["winningMove","showEval","onlyShowEval"].forEach(k => el(k+"2").checked = lichessConfig[k]);

  el("eloValue2").textContent = lichessConfig.elo;
  el("linesValue2").textContent = lichessConfig.lines;
  el("depthValue2").textContent = lichessConfig.depth;

  el("winningMoveLabel2").textContent = `Only Winning Move (${lichessConfig.winningMove ? "ON":"OFF"})`;
  el("showEvalLabel2").textContent = `Show Eval Bar (${lichessConfig.showEval ? "ON":"OFF"})`;
  el("onlyShowEvalLabel2").textContent = `Hide Arrows (${lichessConfig.onlyShowEval ? "ON":"OFF"})`;
  console.clear()
  console.log(lichessConfig)
}

function saveLichess() {
  localStorage.setItem("lichessConfig", JSON.stringify(lichessConfig));
  chrome?.runtime?.sendMessage({ type: "config2", config: lichessConfig });
}

["elo","lines","depth"].forEach(k => {
  el(k+"2").oninput = e => {
    lichessConfig[k] = +e.target.value;
    updateLichessUI(); saveLichess();
  };
});

["winningMove","showEval","onlyShowEval"].forEach(k => {
  el(k+"2").onchange = e => {
    lichessConfig[k] = e.target.checked;
    updateLichessUI(); saveLichess();
  };
});

el("style2").onchange = e => {
  lichessConfig.style = e.target.value;
  updateLichessUI(); saveLichess();
};

updateLichessUI();


// ===== Chessboard Panel =====

function createEvalBar(initialScore = "0.0", initialColor = "white") {
  const boardContainer = document.querySelector("#board1");
  let w_ = boardContainer.offsetWidth;

  if (!boardContainer) return console.error("Plateau non trouvé !");

  // Conteneur principal
  const evalContainer = document.createElement("div");
  evalContainer.id = "customEval";
  evalContainer.style.zIndex = "9999";
  evalContainer.style.width = `40px`;
  evalContainer.style.height = `600px`;
  evalContainer.style.marginRight = "10px";
  evalContainer.style.background = "#eee";
  evalContainer.style.marginLeft = "10px";
  evalContainer.style.position = "relative";
  evalContainer.style.border = "1px solid #aaa";
  evalContainer.style.borderRadius = "4px";
  evalContainer.style.overflow = "hidden";

  const topBar = document.createElement("div");
  const bottomBar = document.createElement("div");

  [topBar, bottomBar].forEach((bar) => {
    bar.style.width = "100%";
    bar.style.position = "absolute";
    bar.style.transition = "height 0.3s ease";
  });

  topBar.style.top = "0";
  bottomBar.style.bottom = "0";

  evalContainer.appendChild(topBar);
  evalContainer.appendChild(bottomBar);

  // Ligne médiane
  const midLine = document.createElement("div");
  midLine.style.position = "absolute";
  midLine.style.top = "50%";
  midLine.style.left = "0";
  midLine.style.width = "100%";
  midLine.style.height = "2px";
  midLine.style.background = "red";
  midLine.style.transform = "translateY(-50%)";
  evalContainer.appendChild(midLine);

  // Texte en bas
  const scoreText = document.createElement("div");
  scoreText.style.position = "absolute";
  scoreText.style.bottom = "0";
  scoreText.style.left = "50%";
  scoreText.style.transform = "translateX(-50%)";
  scoreText.style.color = "red";
  scoreText.style.fontWeight = "bold";
  scoreText.style.fontSize = "12px";
  scoreText.style.pointerEvents = "none";
  evalContainer.appendChild(scoreText);

  boardContainer.parentNode.style.display = "flex";
  // boardContainer.parentNode.appendChild(evalContainer);
  boardContainer.parentNode.insertBefore(evalContainer, boardContainer);

  function parseScore(scoreStr) {
    if (!scoreStr) {
      return { score: 0, mate: false };
    }

    scoreStr = scoreStr.trim();
    let mate = false;
    let score = 0;

    if (scoreStr.startsWith("#")) {
      mate = true;
      scoreStr = scoreStr.slice(1);
    }

    score = parseFloat(scoreStr.replace("+", "")) || 0;
    return { score, mate };
  }

  function update(scoreStr, color = "white") {
    let { score, mate } = parseScore(scoreStr);
    let percent = 50;

    if (mate) {
      let sign = score > 0 ? "+" : "-";
      scoreText.textContent = "#" + sign + Math.abs(score);
      if (
        (score > 0 && color === "white") ||
        (score < 0 && color === "black")
      ) {
        percent = 100;
      } else {
        percent = 0;
      }
    } else {
      let sign = score > 0 ? "+" : "";
      scoreText.textContent = sign + score.toFixed(1);
      if (color === "black") score = -score;
      if (score >= 7) {
        percent = 90;
      } else if (score <= -7) {
        percent = 10;
      } else {
        percent = 50 + (score / 7) * 40;
      }
    }

    if (color === "white") {
      bottomBar.style.background = "#ffffff";
      topBar.style.background = "#312e2b";
    } else {
      bottomBar.style.background = "#312e2b";
      topBar.style.background = "#ffffff";
    }

    bottomBar.style.height = percent + "%";
    topBar.style.height = 100 - percent + "%";
  }

  update(initialScore, initialColor);
  return { update };
}

function clearHighlightSquares() {
  document.querySelectorAll(".customH").forEach((el) => el.remove());
}

function highlightMovesOnBoard(moves, side, fen) {
  if (!Array.isArray(moves)) return;

  if (
    !(
      (side === "w" && fen.split(" ")[1] === "w") ||
      (side === "b" && fen.split(" ")[1] === "b")
    )
  ) {
    return;
  }

  const parent = document.querySelector("#board1");
  if (!parent) return;

  const squareSize = parent.offsetWidth / 8;
  const maxMoves = 5;
  let colors = ["blue", "green", "yellow", "orange", "red"];

  parent.querySelectorAll(".customH").forEach((el) => el.remove());

  function squareToPosition(square) {
    const fileChar = square[0];
    const rankChar = square[1];
    const rank = parseInt(rankChar, 10) - 1;

    let file;
    if (side === "w") {
      file = fileChar.charCodeAt(0) - "a".charCodeAt(0);
      const y = (7 - rank) * squareSize;
      const x = file * squareSize;
      return { x, y };
    } else {
      file = "h".charCodeAt(0) - fileChar.charCodeAt(0);
      const y = rank * squareSize;
      const x = file * squareSize;
      return { x, y };
    }
  }

  function drawArrow(fromSquare, toSquare, color, score) {
    const from = squareToPosition(fromSquare);
    const to = squareToPosition(toSquare);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "customH");
    svg.setAttribute("width", parent.offsetWidth);
    svg.setAttribute("height", parent.offsetWidth);
    svg.style.position = "absolute";
    svg.style.left = "0";
    svg.style.top = "0";
    svg.style.pointerEvents = "none";
    svg.style.overflow = "visible";
    svg.style.zIndex = "10";

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const marker = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "marker"
    );
    marker.setAttribute("id", `arrowhead-${color}`);
    marker.setAttribute("markerWidth", "3.5");
    marker.setAttribute("markerHeight", "2.5");
    marker.setAttribute("refX", "1.75");
    marker.setAttribute("refY", "1.25");
    marker.setAttribute("orient", "auto");
    marker.setAttribute("markerUnits", "strokeWidth");

    const arrowPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    arrowPath.setAttribute("d", "M0,0 L3.5,1.25 L0,2.5 Z");
    arrowPath.setAttribute("fill", color);
    marker.appendChild(arrowPath);
    defs.appendChild(marker);
    svg.appendChild(defs);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", from.x + squareSize / 2);
    line.setAttribute("y1", from.y + squareSize / 2);
    line.setAttribute("x2", to.x + squareSize / 2);
    line.setAttribute("y2", to.y + squareSize / 2);
    line.setAttribute("stroke", color);
    line.setAttribute("stroke-width", "5");
    line.setAttribute("marker-end", `url(#arrowhead-${color})`);
    line.setAttribute("opacity", "0.6");
    svg.appendChild(line);

    if (score !== undefined) {
      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      text.setAttribute("x", to.x + squareSize - 4);
      text.setAttribute("y", to.y + 12);
      text.setAttribute("fill", color);
      text.setAttribute("font-size", "13");
      text.setAttribute("font-weight", "bold");
      text.setAttribute("text-anchor", "end");
      text.setAttribute("alignment-baseline", "hanging");
      text.setAttribute("opacity", "1");
      text.textContent = score;
      svg.appendChild(text);
    }

    parent.appendChild(svg);
  }

  parent.style.position = "relative";

  // Filtrage des coups si config.winningMove est actif
  let filteredMoves = moves;

  filteredMoves.slice(0, maxMoves).forEach((move, index) => {
    const color = colors[index] || "red";
    drawArrow(move.from, move.to, color, move.eval);
  });
}


var board1 = null
var evalBar = null

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  try {
    if (
      message.type === "TO_POPUP" &&
      Array.isArray(message.data) &&
      message.data.length > 0
    ) {
      const data = message.data[0];
      if (!data.fen || !data.side || !data.eval) return;

      const flag = (document.querySelector(".tab.active").innerText === "Stream")

      if (flag && !board1 && !evalBar) {
        board1 = Chessboard("board1", "start");
        board1.orientation("white");
        evalBar = createEvalBar();
      }

      if (board1 && flag) {
        board1.orientation(data.side);
        board1.position(data.fen);
      }

      clearHighlightSquares();
      highlightMovesOnBoard(message.data, data.side[0], data.fen);
      if (evalBar && typeof evalBar.update === "function") {
        evalBar.update(data.eval, data.side);
      }
    }
  } catch (err) {
    console.warn("Erreur message TO_POPUP ignorée :", err);
  }
});
