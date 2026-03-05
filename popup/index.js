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

/* ================= DEFAULT CONFIG ================= */
const defaultChessConfig = {
  elo: 2800,
  lines: 5,
  colors: ["#4f8cff", "#2ecc71", "#f1c40f", "#e67e22", "#e74c3c"],
  depth: 10,
  delay: 100,
  style: "Default",
  autoMove: false,
  winningMove: false,
  showEval: false,
  onlyShowEval: false,
  key: " ",
  stat: false,
  moveClassification: false,
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
    console.log("Config saved");
  });
}

function hideExtraColorInputs(lines) {
  const allInputs = document.querySelectorAll('input[type="color"]');
  allInputs.forEach((input, index) => {
    input.parentElement.style.display = index >= lines ? "none" : "";
  });
}

function setToggleState(id, value) {
  const stateEl = document.getElementById(id + "State");
  if (stateEl) {
    stateEl.textContent = value ? "ON" : "OFF";
    stateEl.classList.toggle("on", value);
  }
}

function updateChessUI() {
  ["elo", "lines", "depth", "delay"].forEach(
    (k) => (el(k).value = chessConfig[k]),
  );
  el("style").value = chessConfig.style;
  el("key").value = chessConfig.key;

  [
    "autoMove",
    "winningMove",
    "showEval",
    "onlyShowEval",
    "stat",
    "moveClassification",
  ].forEach((k) => {
    el(k).checked = chessConfig[k];
    setToggleState(k, chessConfig[k]);
  });

  el("eloValue").textContent = chessConfig.elo;
  el("linesValue").textContent = chessConfig.lines;
  el("depthValue").textContent = chessConfig.depth;
  el("delayValue").textContent = chessConfig.delay;

  const colorIds = ["colorBest", "color2", "color3", "color4", "color5"];
  colorIds.forEach((id, i) => {
    if (el(id)) el(id).value = chessConfig.colors[i] || "#ffffff";
  });

  hideExtraColorInputs(chessConfig.lines);
  console.clear();
  console.log(chessConfig);
}

loadChessConfig(updateChessUI);

/* ================= INPUT HANDLERS ================= */
["elo", "lines", "depth", "delay"].forEach((k) => {
  el(k).oninput = (e) => {
    chessConfig[k] = +e.target.value;
    updateChessUI();
    saveChessConfig();
  };
});

[
  "autoMove",
  "winningMove",
  "showEval",
  "onlyShowEval",
  "stat",
  "moveClassification",
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

el("key").onchange = (e) => {
  chessConfig.key = e.target.value;
  updateChessUI();
  saveChessConfig();
};

const allColorInputs = document.querySelectorAll('input[type="color"]');
allColorInputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    chessConfig.colors[index] = e.target.value;
    updateChessUI();
    saveChessConfig();
  });
});

/* ================= IMPORT / EXPORT ================= */

// EXPORT
document.getElementById("btnExport").onclick = () => {
  const json = JSON.stringify(chessConfig, null, 2);
  document.getElementById("exportJson").value = json;
  const s = document.getElementById("exportStatus");
  s.textContent = "✓ CONFIG EXPORTED";
  s.className = "io-status success";
  setTimeout(() => {
    s.textContent = "";
    s.className = "io-status";
  }, 3000);
};

// COPY
document.getElementById("btnCopy").onclick = () => {
  const box = document.getElementById("exportJson");
  const val = box.value;
  if (!val) return;
  navigator.clipboard.writeText(val).then(() => {
    const btn = document.getElementById("btnCopy");
    const s = document.getElementById("exportStatus");
    btn.classList.add("copied");
    btn.querySelector(".btn-icon").textContent = "✓";
    s.textContent = "✓ COPIED TO CLIPBOARD";
    s.className = "io-status success";
    setTimeout(() => {
      btn.classList.remove("copied");
      btn.querySelector(".btn-icon").textContent = "⎘";
      s.textContent = "";
      s.className = "io-status";
    }, 2500);
  });
};

// LOAD
document.getElementById("btnLoad").onclick = () => {
  const raw = document.getElementById("importJson").value.trim();
  const s = document.getElementById("importStatus");
  if (!raw) {
    s.textContent = "✕ EMPTY — PASTE A CONFIG FIRST";
    s.className = "io-status error";
    setTimeout(() => {
      s.textContent = "";
      s.className = "io-status";
    }, 3000);
    return;
  }
  try {
    const parsed = JSON.parse(raw);
    chessConfig = { ...defaultChessConfig, ...parsed };
    saveChessConfig();
    updateChessUI();
    s.textContent = "✓ CONFIG LOADED SUCCESSFULLY";
    s.className = "io-status success";
    document.getElementById("importJson").value = "";
    setTimeout(() => {
      s.textContent = "";
      s.className = "io-status";
    }, 3000);
  } catch (e) {
    s.textContent = "✕ INVALID JSON — CHECK FORMAT";
    s.className = "io-status error";
    setTimeout(() => {
      s.textContent = "";
      s.className = "io-status";
    }, 3500);
  }
};

// ===== Chessboard Panel =====

function createEvalBar(initialScore = "0.0", initialColor = "white") {
  const boardContainer = document.querySelector("#board1");
  let w_ = boardContainer.offsetWidth;

  if (!boardContainer) return console.error("Plateau non trouvé !");

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

  const midLine = document.createElement("div");
  midLine.style.position = "absolute";
  midLine.style.top = "50%";
  midLine.style.left = "0";
  midLine.style.width = "100%";
  midLine.style.height = "2px";
  midLine.style.background = "red";
  midLine.style.transform = "translateY(-50%)";
  evalContainer.appendChild(midLine);

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
      "marker",
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
      "path",
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
      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text",
      );

      text.setAttribute("x", to.x + squareSize);
      text.setAttribute("y", to.y);
      text.setAttribute("font-size", "9");
      text.setAttribute("font-weight", "bold");
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dominant-baseline", "middle");
      text.setAttribute("fill", color);

      let isNegative = false;
      let displayScore = score;

      const hasHash = score.startsWith("#");
      let raw = hasHash ? score.slice(1) : score;

      if (raw.startsWith("-")) {
        isNegative = true;
        raw = raw.slice(1);
      } else if (raw.startsWith("+")) {
        raw = raw.slice(1);
      }

      displayScore = hasHash ? "#" + raw : raw;
      text.textContent = displayScore;

      group.appendChild(text);
      svg.appendChild(group);

      requestAnimationFrame(() => {
        const bbox = text.getBBox();

        const paddingX = 2;
        const paddingY = 2;

        const rect = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect",
        );

        rect.setAttribute("x", bbox.x - paddingX);
        rect.setAttribute("y", bbox.y - paddingY);
        rect.setAttribute("width", bbox.width + paddingX * 2);
        rect.setAttribute("height", bbox.height + paddingY * 2);

        rect.setAttribute("rx", "8");
        rect.setAttribute("ry", "8");

        rect.setAttribute("fill", isNegative ? "#312e2b" : "#ffffff");
        rect.setAttribute("fill-opacity", "0.85");
        rect.setAttribute("stroke", isNegative ? "#000000" : "#cccccc");
        rect.setAttribute("stroke-width", "1");

        group.insertBefore(rect, text);
      });
    }

    parent.appendChild(svg);
  }

  parent.style.position = "relative";

  let filteredMoves = moves;

  filteredMoves.slice(0, maxMoves).forEach((move, index) => {
    const color = colors[index] || "red";
    drawArrow(move.from, move.to, color, move.eval);
  });
}
