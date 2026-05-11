function createSimpleAccuracyDisplay(
  initialWhiteAcc = 0,
  initialWhiteElo = 0,
  initialBlackAcc = 0,
  initialBlackElo = 0,
  side = "white",
  statW = null,
  statB = null,
  displayMode = 2,
) {
  // ─── Styles ───────────────────────────────────────────────────────────────

  if (!document.getElementById("acc-display-styles")) {
    const style = document.createElement("style");
    style.id = "acc-display-styles";
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;600&display=swap');

      #acc-widget {
        position: fixed;
        z-index: 999999;
        top: 80px;
        left: 20px;
        display: flex;
        flex-direction: column;
        gap: 5px;
        cursor: grab;
        user-select: none;
        touch-action: none;
        font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
        transition: opacity 0.2s ease;
      }

      #acc-widget.acc-hidden { opacity: 0; pointer-events: none; }
      #acc-widget.dragging   { cursor: grabbing; opacity: 0.85; }

      .acc-row { display: flex; align-items: center; gap: 7px; }

      .acc-card, .acc-segment, .acc-label, .acc-value,
      .acc-side-badge, .acc-threat-dot { pointer-events: none; }

      .acc-side-badge {
        writing-mode: vertical-rl;
        text-orientation: mixed;
        font-family: 'DM Mono', ui-monospace, monospace;
        font-size: 6px;
        font-weight: 500;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        padding: 6px 3px;
        border-radius: 3px;
        flex-shrink: 0;
        line-height: 1;
        width: 14px;
        text-align: center;
      }
      .acc-side-badge-white        { background: #e4e4e0; color: #999; }
      .acc-side-badge-black        { background: #1e1e1c; color: #4a4a48; }
      .acc-side-badge-you-white    { background: #1a1a18; color: #c8c8c4; }
      .acc-side-badge-you-black    { background: #f2f2ee; color: #666; }

      .acc-mode1 .acc-side-badge { font-size: 5px; padding: 5px 2px; width: 12px; }

      .acc-card {
        width: 210px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        border-radius: 8px;
        overflow: hidden;
      }
      .acc-mode1 .acc-card { width: 160px; border-radius: 6px; }

      .acc-card-white {
        background: #f7f7f5;
        outline: 1px solid #ddddd8;
        box-shadow: 0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
      }
      .acc-card-black {
        background: #0f0f0e;
        outline: 1px solid rgba(255,255,255,0.07);
        box-shadow: 0 2px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5);
      }
      .acc-card-active-white { outline: 1.5px solid #b8b8b2; }
      .acc-card-active-black { outline: 1.5px solid rgba(255,255,255,0.16); }

      .acc-segment {
        padding: 10px 12px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .acc-mode1 .acc-segment { padding: 7px 10px; gap: 3px; }

      .acc-segment:first-child { border-right-width: 1px; border-right-style: solid; }
      .acc-card-white .acc-segment:first-child { border-right-color: #ddddd8; }
      .acc-card-black .acc-segment:first-child { border-right-color: rgba(255,255,255,0.05); }

      .acc-label {
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.14em;
        white-space: nowrap;
      }
      .acc-card-white .acc-label { color: #8a8a84; }
      .acc-card-black .acc-label { color: #4a4a46; }

      .acc-value {
        font-family: 'DM Mono', ui-monospace, 'Courier New', monospace;
        font-size: 21px;
        font-weight: 500;
        letter-spacing: -0.05em;
        line-height: 1;
        transition: color 0.3s ease;
      }
      .acc-mode1 .acc-value { font-size: 16px; }
      .acc-card-white .acc-value { color: #111110; }
      .acc-card-black .acc-value { color: #e8e8e6; }

      .acc-card-inactive .acc-value      { opacity: 0.38; }
      .acc-card-inactive .acc-label      { opacity: 0.45; }
      .acc-card-inactive .acc-threat-dot { opacity: 0.3; }

      .acc-threat-dot {
        display: inline-block;
        width: 7px; height: 7px;
        border-radius: 50%;
        flex-shrink: 0;
        margin-left: 2px;
        position: relative; top: -1px;
        transition: background 0.35s ease, box-shadow 0.35s ease;
      }
      .acc-threat-safe   { background: #22c55e; box-shadow: 0 0 5px rgba(34,197,94,0.55); }
      .acc-threat-warn   { background: #eab308; box-shadow: 0 0 5px rgba(234,179,8,0.55); }
      .acc-threat-sus    { background: #f97316; box-shadow: 0 0 5px rgba(249,115,22,0.55); }
      .acc-threat-cheat  { background: #ef4444; box-shadow: 0 0 6px rgba(239,68,68,0.7); }
      .acc-threat-hidden { background: transparent; box-shadow: none; }

      .acc-card-active-white .acc-value-cheat { color: #dc2626; }
      .acc-card-active-white .acc-value-sus   { color: #ea6c08; }
      .acc-card-active-white .acc-value-warn  { color: #ca8f00; }
      .acc-card-active-white .acc-value-safe  { color: #16a34a; }
      .acc-card-active-black .acc-value-cheat { color: #f87171; }
      .acc-card-active-black .acc-value-sus   { color: #fb923c; }
      .acc-card-active-black .acc-value-warn  { color: #fbbf24; }
      .acc-card-active-black .acc-value-safe  { color: #4ade80; }

      .acc-label-row { display: flex; align-items: center; gap: 5px; }
    `;
    document.head.appendChild(style);
  }

  // ─── Internal state ───────────────────────────────────────────────────────

  let whiteAcc = initialWhiteAcc;
  let whiteElo = initialWhiteElo;
  let blackAcc = initialBlackAcc;
  let blackElo = initialBlackElo;

  // ─── Threat level ─────────────────────────────────────────────────────────

  function threatLevel(acc) {
    const n = parseFloat(acc);
    if (isNaN(n) || n === 0) return null;
    if (n >= 95) return "cheat";
    if (n >= 90) return "sus";
    if (n >= 88) return "warn";
    return "safe";
  }

  // ─── HTML builder ─────────────────────────────────────────────────────────

  function rowHTML(color, isYou) {
    const badgeText = isYou ? "you" : "&nbsp;";
    const badgeClass = isYou
      ? `acc-side-badge acc-side-badge-you-${color}`
      : `acc-side-badge acc-side-badge-${color}`;
    const activeClass = isYou
      ? `acc-card-active-${color}`
      : `acc-card-inactive`;

    return `
      <div class="acc-row">
        <div class="${badgeClass}">${badgeText}</div>
        <div class="acc-card acc-card-${color} ${activeClass}" id="acc-card-${color}">
          <div class="acc-segment">
            <div class="acc-label-row">
              <span class="acc-label">Accuracy</span>
              <span class="acc-threat-dot acc-threat-hidden" id="acc-dot-${color}"></span>
            </div>
            <span class="acc-value" id="acc-val-acc-${color}">—</span>
          </div>
          <div class="acc-segment">
            <span class="acc-label">Rating</span>
            <span class="acc-value" id="acc-val-elo-${color}">—</span>
          </div>
        </div>
      </div>`;
  }

  // ─── Widget mount ─────────────────────────────────────────────────────────

  const widget = document.createElement("div");
  widget.id = "acc-widget";
  document.body.appendChild(widget);

  chrome.storage.local.get("accWidgetPos", (result) => {
    if (result.accWidgetPos) {
      widget.style.left = result.accWidgetPos.left;
      widget.style.top = result.accWidgetPos.top;
    }
  });

  function applyDisplayMode() {
    widget.classList.toggle("acc-hidden", displayMode === 0);
    widget.classList.toggle("acc-mode1", displayMode === 1);
  }

  function render() {
    widget.innerHTML =
      side === "white"
        ? rowHTML("black", false) + rowHTML("white", true)
        : rowHTML("white", false) + rowHTML("black", true);
    applyDisplayMode();
  }

  // ─── Drag — mouse ─────────────────────────────────────────────────────────

  let isDragging = false,
    offsetX = 0,
    offsetY = 0;

  widget.addEventListener("mousedown", (e) => {
    if (displayMode === 0) return;
    isDragging = true;
    widget.classList.add("dragging");
    offsetX = e.clientX - widget.getBoundingClientRect().left;
    offsetY = e.clientY - widget.getBoundingClientRect().top;
    e.preventDefault();
  });
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    widget.style.left = `${e.clientX - offsetX}px`;
    widget.style.top = `${e.clientY - offsetY}px`;
  });
  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    widget.classList.remove("dragging");
    chrome.storage.local.set({
      accWidgetPos: { left: widget.style.left, top: widget.style.top },
    });
  });

  // ─── Drag — touch ─────────────────────────────────────────────────────────

  widget.addEventListener(
    "touchstart",
    (e) => {
      if (displayMode === 0) return;
      const t = e.touches[0];
      isDragging = true;
      widget.classList.add("dragging");
      offsetX = t.clientX - widget.getBoundingClientRect().left;
      offsetY = t.clientY - widget.getBoundingClientRect().top;
      e.preventDefault();
    },
    { passive: false },
  );
  document.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      const t = e.touches[0];
      widget.style.left = `${t.clientX - offsetX}px`;
      widget.style.top = `${t.clientY - offsetY}px`;
      e.preventDefault();
    },
    { passive: false },
  );
  document.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    widget.classList.remove("dragging");
    chrome.storage.local.set({
      accWidgetPos: { left: widget.style.left, top: widget.style.top },
    });
  });

  // ─── DOM helpers ──────────────────────────────────────────────────────────

  function setVal(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function applyThreat(color, acc) {
    const level = threatLevel(acc);
    const dot = document.getElementById(`acc-dot-${color}`);
    const val = document.getElementById(`acc-val-acc-${color}`);
    if (!dot || !val) return;
    dot.className = "acc-threat-dot";
    val.classList.remove(
      "acc-value-cheat",
      "acc-value-sus",
      "acc-value-warn",
      "acc-value-safe",
    );
    if (!level) {
      dot.classList.add("acc-threat-hidden");
      return;
    }
    dot.classList.add(`acc-threat-${level}`);
    val.classList.add(`acc-value-${level}`);
  }

  function flushDOM() {
    setVal("acc-val-acc-white", whiteAcc ? `${whiteAcc}%` : "—");
    setVal("acc-val-elo-white", whiteElo || "—");
    setVal("acc-val-acc-black", blackAcc ? `${blackAcc}%` : "—");
    setVal("acc-val-elo-black", blackElo || "—");
    applyThreat("white", whiteAcc);
    applyThreat("black", blackAcc);
  }

  // ─── Update ───────────────────────────────────────────────────────────────

  function update(changes = {}) {
    const sideChanged = changes.side !== undefined && changes.side !== side;
    const modeChanged =
      changes.displayMode !== undefined && changes.displayMode !== displayMode;

    if (changes.whiteAcc !== undefined) whiteAcc = changes.whiteAcc;
    if (changes.whiteElo !== undefined) whiteElo = changes.whiteElo;
    if (changes.blackAcc !== undefined) blackAcc = changes.blackAcc;
    if (changes.blackElo !== undefined) blackElo = changes.blackElo;
    if (sideChanged) side = changes.side;
    if (modeChanged) displayMode = changes.displayMode;

    if (sideChanged || modeChanged) {
      render();
    } else {
      applyDisplayMode();
    }

    flushDOM();
  }

  render();
  flushDOM();
  return { update };
}

function highlightMovesOnBoardChessCom(moves, side) {
  if (!Array.isArray(moves)) return;
  if (
    !(
      (side === "w" && fen_.split(" ")[1] === "w") ||
      (side === "b" && fen_.split(" ")[1] === "b")
    )
  ) {
    return;
  }
  if (config.onlyShowEval) return;

  const parent = document.querySelector("wc-chess-board");
  if (!parent) return;

  const squareSize = parent.offsetWidth / 8;
  const maxMoves = 5;
  let colors = config.colors;

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
      if (score === "book") {
        const foreignObject = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "foreignObject",
        );
        foreignObject.setAttribute("x", to.x + squareSize - 12);
        foreignObject.setAttribute("y", to.y - 12);
        foreignObject.setAttribute("width", "24");
        foreignObject.setAttribute("height", "24");

        const div = document.createElement("div");
        div.innerHTML = bookSVG;
        foreignObject.appendChild(div);
        svg.appendChild(foreignObject);
      } else {
        const group = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "g",
        );

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
    }

    parent.appendChild(svg);
  }

  parent.style.position = "relative";

  let filteredMoves = moves;
  if (config.winningMove) {
    filteredMoves = moves.filter((move) => {
      const evalValue = parseFloat(move.eval);
      if (side === "w") {
        return (
          evalValue >= 2 ||
          (move.eval.startsWith("#") && parseInt(move.eval.slice(1)) > 0)
        );
      } else {
        return (
          evalValue <= -2 ||
          (move.eval.startsWith("#-") && parseInt(move.eval.slice(2)) > 0)
        );
      }
    });
  }

  filteredMoves.slice(0, maxMoves).forEach((move, index) => {
    const color = colors[index] || "red";
    drawArrow(move.from, move.to, color, move.eval);
  });
}

function createEvalBarChessCom(initialScore = "0.0", initialColor = "white") {
  const boardContainer = document.querySelector(".board");
  let w_ = boardContainer.offsetWidth;

  if (!boardContainer) return console.error("Plateau non trouvé !");

  // Conteneur principal
  const evalContainer = document.createElement("div");
  evalContainer.id = "customEval";
  evalContainer.style.zIndex = "9999";
  evalContainer.style.width = `${(w_ * 6) / 100}px`;
  evalContainer.style.height = `${boardContainer.offsetWidth}px`;
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

function highlightMovesOnBoardLichess(moves, side) {
  if (!Array.isArray(moves)) return;
  if (
    !(
      (side === "w" && fen_.split(" ")[1] === "w") ||
      (side === "b" && fen_.split(" ")[1] === "b")
    )
  ) {
    return;
  }
  if (config.onlyShowEval) return;

  const parent = document.querySelector("cg-container");
  if (!parent) return;

  const squareSize = parent.offsetWidth / 8;
  const maxMoves = 5;
  let colors = config.colors;

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
      if (score === "book") {
        const foreignObject = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "foreignObject",
        );
        foreignObject.setAttribute("x", to.x + squareSize - 12);
        foreignObject.setAttribute("y", to.y - 12);
        foreignObject.setAttribute("width", "24");
        foreignObject.setAttribute("height", "24");

        const div = document.createElement("div");
        div.innerHTML = bookSVG;
        foreignObject.appendChild(div);
        svg.appendChild(foreignObject);
      } else {
        const group = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "g",
        );

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
    }

    parent.appendChild(svg);
  }

  parent.style.position = "relative";

  let filteredMoves = moves;
  if (config.winningMove) {
    filteredMoves = moves.filter((move) => {
      const evalValue = parseFloat(move.eval);
      if (side === "w") {
        return (
          evalValue >= 2 ||
          (move.eval.startsWith("#") && parseInt(move.eval.slice(1)) > 0)
        );
      } else {
        return (
          evalValue <= -2 ||
          (move.eval.startsWith("#-") && parseInt(move.eval.slice(2)) > 0)
        );
      }
    });
  }

  filteredMoves.slice(0, maxMoves).forEach((move, index) => {
    const color = colors[index] || "red";
    // drawArrow(move.from, move.to, color, move.eval);
    drawArrow(move.from, move.to, color, move.eval);
  });
}

function createEvalBarLichess(initialScore = "0.0", initialColor = "white") {
  const boardContainer = document.querySelector("cg-board");
  let w_ = boardContainer.offsetWidth;

  if (!boardContainer) return console.error("Plateau non trouvé !");

  // Conteneur principal
  const evalContainer = document.createElement("div");
  evalContainer.id = "customEval";
  evalContainer.style.zIndex = "9999";
  evalContainer.style.width = `${(w_ * 6) / 100}px`;
  evalContainer.style.height = `${boardContainer.offsetWidth}px`;
  evalContainer.style.background = "#eee";
  evalContainer.style.marginLeft = "10px";
  evalContainer.style.position = "relative";
  evalContainer.style.left = "-50px";
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

function createEvalBarWorld(initialScore = "0.0", initialColor = "white") {
  const boardContainer = document.querySelector("cg-board");

  if (!boardContainer) return console.error("Plateau non trouvé !");
  let w_ = boardContainer.offsetWidth;
  // Conteneur principal
  const evalContainer = document.createElement("div");
  evalContainer.id = "customEval";
  evalContainer.style.zIndex = "9999";
  evalContainer.style.width = `${(w_ * 6) / 100}px`;
  evalContainer.style.height = `${boardContainer.offsetWidth}px`;
  evalContainer.style.background = "#eee";
  evalContainer.style.marginLeft = "10px";
  evalContainer.style.position = "relative";
  evalContainer.style.left = "-10px";
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

function highlightMovesOnBoardWorld(moves, side) {
  if (!Array.isArray(moves)) return;
  if (
    !(
      (side === "w" && fen_.split(" ")[1] === "w") ||
      (side === "b" && fen_.split(" ")[1] === "b")
    )
  ) {
    return;
  }
  if (config.onlyShowEval) return;

  const parent = document.querySelector("cg-board");

  if (!parent) return;

  const squareSize = parent.offsetWidth / 8;
  const maxMoves = 5;
  let colors = config.colors;

  // parent.querySelectorAll(".customH").forEach((el) => el.remove());

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
      if (score === "book") {
        const foreignObject = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "foreignObject",
        );
        foreignObject.setAttribute("x", to.x + squareSize - 12);
        foreignObject.setAttribute("y", to.y - 12);
        foreignObject.setAttribute("width", "24");
        foreignObject.setAttribute("height", "24");

        const div = document.createElement("div");
        div.innerHTML = bookSVG;
        foreignObject.appendChild(div);
        svg.appendChild(foreignObject);
      } else {
        const group = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "g",
        );

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
    }

    parent.appendChild(svg);
  }

  parent.style.position = "relative";

  let filteredMoves = moves;
  if (config.winningMove) {
    filteredMoves = moves.filter((move) => {
      const evalValue = parseFloat(move.eval);
      if (side === "w") {
        return (
          evalValue >= 2 ||
          (move.eval.startsWith("#") && parseInt(move.eval.slice(1)) > 0)
        );
      } else {
        return (
          evalValue <= -2 ||
          (move.eval.startsWith("#-") && parseInt(move.eval.slice(2)) > 0)
        );
      }
    });
  }

  filteredMoves.slice(0, maxMoves).forEach((move, index) => {
    const color = colors[index] || "red";
    // drawArrow(move.from, move.to, color, move.eval);
    drawArrow(move.from, move.to, color, move.eval);
    if (side === "b") {
      document
        .querySelectorAll(".customH")
        .forEach((el) => (el.style.transform = "rotate(180deg)"));
    }
  });
}
