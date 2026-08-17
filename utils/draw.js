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
  if (config.hideArrow) return;

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

function highlightMovesOnBoardLichess(moves, side) {
  if (config.hideArrow) return;

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

function highlightMovesOnBoardWorld(moves, side) {
  if (config.hideArrow) return;

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

/* HINT*/
function HintGlobal(from, to, side, tags, mateIn) {
  let parent = null;
  let platform = null;

  const wcChessCom = document.querySelector("wc-chess-board");
  if (wcChessCom) {
    parent = wcChessCom;
    platform = "chesscom";
  } else {
    const host = window.location.hostname;
    if (host.includes("lichess.org")) {
      parent = document.querySelector("cg-container");
      platform = "lichess";
    } else if (host.includes("worldchess.com")) {
      parent = document.querySelector("cg-board");
      platform = "worldchess";
    } else {
      const cgContainer = document.querySelector("cg-container");
      const cgBoard = document.querySelector("cg-board");
      if (cgContainer) {
        parent = cgContainer;
        platform = "lichess";
      } else if (cgBoard) {
        parent = cgBoard;
        platform = "worldchess";
      }
    }
  }

  if (!parent) return;

  const squareSize = parent.offsetWidth / 8;
  parent.querySelectorAll(".customHint").forEach((el) => el.remove());

  function squareToPosition(square) {
    const fileChar = square[0];
    const rankChar = square[1];
    const rank = parseInt(rankChar, 10) - 1;
    let file;
    if (side === "w") {
      file = fileChar.charCodeAt(0) - "a".charCodeAt(0);
      return {
        x: file * squareSize + squareSize / 2,
        y: (7 - rank) * squareSize + squareSize / 2,
      };
    } else {
      file = "h".charCodeAt(0) - fileChar.charCodeAt(0);
      return {
        x: file * squareSize + squareSize / 2,
        y: rank * squareSize + squareSize / 2,
      };
    }
  }

  const fromPos = squareToPosition(from);
  const toPos = squareToPosition(to);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "customHint");
  svg.setAttribute("width", parent.offsetWidth);
  svg.setAttribute("height", parent.offsetWidth);
  svg.style.position = "absolute";
  svg.style.left = "0";
  svg.style.top = "0";
  svg.style.pointerEvents = "none";
  svg.style.overflow = "visible";
  svg.style.zIndex = "13";

  const color = "rgba(159, 207, 63, 0.8)";

  const shaftHalfW = 0.11 * squareSize;
  const headHalfW = 0.26 * squareSize;
  const headLen = 0.36 * squareSize;
  const gap = 0.36 * squareSize;

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("style", `opacity: 0.8;`);
  svg.appendChild(g);

  function makePolygon(points) {
    const poly = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon",
    );
    poly.setAttribute("points", points.map((p) => `${p.x} ${p.y}`).join(", "));
    poly.setAttribute("style", `fill: ${color};`);
    poly.setAttribute("class", "arrow");
    g.appendChild(poly);
  }

  function makePath(points, width) {
    const d = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute(
      "stroke",
      color.replace(", 0.8)", ")").replace("rgba", "rgb"),
    );
    path.setAttribute("stroke-width", width);
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("stroke-linecap", "butt");
    path.setAttribute("class", "arrow");
    g.appendChild(path);
  }

  const dx = toPos.x - fromPos.x;
  const dy = toPos.y - fromPos.y;

  const fileDiff = Math.round(Math.abs(dx) / squareSize);
  const rankDiff = Math.round(Math.abs(dy) / squareSize);
  const isKnightMove =
    (fileDiff === 1 && rankDiff === 2) || (fileDiff === 2 && rankDiff === 1);

  if (!isKnightMove) {
    const D = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / D,
      uy = dy / D;
    const px = -uy,
      py = ux;

    const p = (t, w) => ({
      x: fromPos.x + ux * t + px * w,
      y: fromPos.y + uy * t + py * w,
    });

    makePolygon([
      p(gap, shaftHalfW),
      p(D - headLen, shaftHalfW),
      p(D - headLen, headHalfW),
      p(D, 0),
      p(D - headLen, -headHalfW),
      p(D - headLen, -shaftHalfW),
      p(gap, -shaftHalfW),
    ]);
  } else {
    const longAxisIsX = fileDiff === 2;
    const ulx = longAxisIsX ? Math.sign(dx) : 0;
    const uly = longAxisIsX ? 0 : Math.sign(dy);
    const usx = longAxisIsX ? 0 : Math.sign(dx);
    const usy = longAxisIsX ? Math.sign(dy) : 0;

    const longDist = longAxisIsX ? Math.abs(dx) : Math.abs(dy);
    const shortDist = longAxisIsX ? Math.abs(dy) : Math.abs(dx);
    const b1 = shortDist - headLen;

    const pt = (u, v) => ({
      x: fromPos.x + ulx * u + usx * v,
      y: fromPos.y + uly * u + usy * v,
    });

    makePath([pt(gap, 0), pt(longDist, 0), pt(longDist, b1)], shaftHalfW * 2);

    makePolygon([
      pt(longDist - headHalfW, b1),
      pt(longDist, shortDist),
      pt(longDist + headHalfW, b1),
    ]);
  }

  const arrowSolidColor = color.replace(", 0.8)", ")").replace("rgba", "rgb");
  const badgeGap = 4;

  const rightAnchorX = toPos.x + squareSize / 2;
  const leftAnchorX = toPos.x - squareSize / 2;
  const topAnchorY = toPos.y - squareSize / 2;

  function resolveColorsBySide() {
    return side === "w"
      ? { bg: "#ffffff", border: "#cccccc" }
      : { bg: "#312e2b", border: "#000000" };
  }

  function resolveColorsBySign(text) {
    let value = null;
    const match = text.match(/-?\d+(\.\d+)?/);
    if (match) value = parseFloat(match[0]);
    const isNegative = value !== null ? value < 0 : false;
    return isNegative
      ? { bg: "#312e2b", border: "#000000" }
      : { bg: "#ffffff", border: "#cccccc" };
  }

  function resolveLeftColors(text) {
    return text === "Game Over"
      ? resolveColorsBySide()
      : resolveColorsBySign(text);
  }

  const pendingBadges = [];

  function createBadgeText(text, anchorX, y, colorFn) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("class", "customHintBadge");

    const textEl = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text",
    );
    textEl.setAttribute("x", anchorX);
    textEl.setAttribute("y", y);
    textEl.setAttribute("font-size", "9");
    textEl.setAttribute("font-weight", "bold");
    textEl.setAttribute("text-anchor", "middle");
    textEl.setAttribute("dominant-baseline", "middle");
    textEl.setAttribute("fill", arrowSolidColor);
    textEl.textContent = text;

    group.appendChild(textEl);
    svg.appendChild(group);

    pendingBadges.push({ group, textEl, text, colorFn });
  }

  function layoutStack(items, anchorX, startY, colorFn) {
    let currentY = startY;
    items.forEach((text) => {
      createBadgeText(text, anchorX, currentY, colorFn);
      currentY += 14 + badgeGap;
    });
  }

  const rightTags = Array.isArray(tags) ? tags.map((t) => String(t)) : [];
  layoutStack(rightTags, rightAnchorX, topAnchorY, resolveColorsBySide);

  const leftItems = [];
  if (mateIn !== null && mateIn !== undefined) {
    if (mateIn === 0) {
      leftItems.push("Game Over");
    } else {
      let tempMateIn = mateIn;

      if (mateIn > 0) {
        tempMateIn++;
      } else if (mateIn < 0) {
        tempMateIn--;
      }

      leftItems.push(`mate in ${Math.abs(mateIn)}`);
    }
  }
  layoutStack(leftItems, leftAnchorX, topAnchorY, resolveLeftColors);

  parent.style.position = "relative";
  parent.appendChild(svg);

  if (platform === "worldchess" && side === "b") {
    svg.style.transform = "rotate(180deg)";
  }

  requestAnimationFrame(() => {
    pendingBadges.forEach(({ group, textEl, text, colorFn }) => {
      const bbox = textEl.getBBox();
      const paddingX = 2;
      const paddingY = 2;
      const { bg, border } = colorFn(text);

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
      rect.setAttribute("fill", bg);
      rect.setAttribute("fill-opacity", "0.85");
      rect.setAttribute("stroke", border);
      rect.setAttribute("stroke-width", "1");

      group.insertBefore(rect, textEl);
    });
  });
}

// get board width

function getBoardWidth() {
  let width = 480;
  const parent =
    document.querySelector("wc-chess-board") ||
    document.querySelector("cg-container") ||
    document.querySelector("cg-board") ||
    null;

  if (parent) {
    return parent.offsetWidth;
  } else {
    return width;
  }
}

function CreateEvalBar(initialScore = "0.0", initialColor = "white") {
  const host = window.location.host;
  let boardSelector = "";
  let offsetLeft = null;

  // Détection du site et configuration spécifique
  if (host === "www.chess.com" || host.includes("chess.com")) {
    boardSelector = ".board";
  } else if (host === "lichess.org" || host.includes("lichess.org")) {
    boardSelector = "cg-board";
    offsetLeft = "-50px";
  } else if (host === "worldchess.com" || host.includes("worldchess.com")) {
    boardSelector = "cg-board";
    offsetLeft = "-10px";
  } else {
    // Sélecteur par défaut
    boardSelector = "cg-board, .board";
  }

  const boardContainer = document.querySelector(boardSelector);
  if (!boardContainer) return console.error("Plateau non trouvé !");

  let w_ = boardContainer.offsetWidth;

  // Conteneur principal - Design modernisé
  const evalContainer = document.createElement("div");
  evalContainer.id = "customEval";
  evalContainer.style.zIndex = "9999";
  evalContainer.style.width = `${Math.max((w_ * 5.5) / 100, 24)}px`;
  evalContainer.style.height = `${w_}px`;
  evalContainer.style.background = "#1b1917";
  evalContainer.style.marginLeft = "12px";
  evalContainer.style.position = "relative";
  if (offsetLeft) {
    evalContainer.style.left = offsetLeft;
  }
  evalContainer.style.borderRadius = "8px";
  evalContainer.style.overflow = "hidden";
  evalContainer.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.25)";
  evalContainer.style.border = "1px solid rgba(255, 255, 255, 0.1)";

  // Ligne médiane (indique le 0.0)
  const midLine = document.createElement("div");
  midLine.style.position = "absolute";
  midLine.style.top = "50%";
  midLine.style.left = "0";
  midLine.style.width = "100%";
  midLine.style.height = "1px";
  midLine.style.backgroundColor = "rgba(150, 150, 150, 0.4)";
  midLine.style.zIndex = "2";
  midLine.style.pointerEvents = "none";
  evalContainer.appendChild(midLine);

  const topBar = document.createElement("div");
  const bottomBar = document.createElement("div");

  [topBar, bottomBar].forEach((bar) => {
    bar.style.width = "100%";
    bar.style.position = "absolute";
    bar.style.transition =
      "height 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease";
  });

  topBar.style.top = "0";
  bottomBar.style.bottom = "0";

  evalContainer.appendChild(topBar);
  evalContainer.appendChild(bottomBar);

  // Pilule de texte pour le score
  const scoreBadge = document.createElement("div");
  scoreBadge.style.position = "absolute";
  scoreBadge.style.bottom = "6px";
  scoreBadge.style.left = "50%";
  scoreBadge.style.transform = "translateX(-50%)";
  scoreBadge.style.zIndex = "3";
  scoreBadge.style.padding = "2px 4px";
  scoreBadge.style.borderRadius = "4px";
  scoreBadge.style.backgroundColor = "rgba(0, 0, 0, 0.55)";
  scoreBadge.style.backdropFilter = "blur(4px)";
  scoreBadge.style.pointerEvents = "none";
  scoreBadge.style.display = "flex";
  scoreBadge.style.alignItems = "center";
  scoreBadge.style.justifyContent = "center";

  const scoreText = document.createElement("span");
  scoreText.style.color = "#ffffff";
  scoreText.style.fontWeight = "700";
  scoreText.style.fontSize = "11px";
  scoreText.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  scoreText.style.lineHeight = "1";
  scoreText.style.letterSpacing = "-0.2px";

  scoreBadge.appendChild(scoreText);
  evalContainer.appendChild(scoreBadge);

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
      topBar.style.background = "#262421";
    } else {
      bottomBar.style.background = "#262421";
      topBar.style.background = "#ffffff";
    }

    bottomBar.style.height = percent + "%";
    topBar.style.height = 100 - percent + "%";
  }

  update(initialScore, initialColor);
  return { update };
}

(function () {
  const SITE_CONFIGS = {
    "www.chess.com": {
      parentSelector: "wc-chess-board",
      nativePieceSelector: ".piece",
      rotateOverlayForBlack: false,
    },
    "lichess.org": {
      parentSelector: "cg-container",
      nativePieceSelector: "piece",
      rotateOverlayForBlack: false,
    },
    "worldchess.com": {
      parentSelector: "cg-board",
      nativePieceSelector: "cg-piece",
      rotateOverlayForBlack: true,
    },
  };

  function getSiteConfig() {
    return SITE_CONFIGS[window.location.host] || null;
  }

  function clearPreviewPV() {
    document.querySelectorAll(".customPV").forEach((el) => el.remove());
    document.querySelectorAll(".customPV-hidden-native").forEach((el) => {
      el.style.visibility = "";
      el.classList.remove("customPV-hidden-native");
    });
  }

  const SVG_NS = "http://www.w3.org/2000/svg";

  function moveColor(moveSide) {
    return moveSide === "w" ? "#ffffff" : "#262421";
  }

  function sideToMoveFromFen(fen) {
    const parts = fen.trim().split(/\s+/);
    return parts[1] === "b" ? "b" : "w";
  }

  async function previewPV(side, startFen, pv) {
    if (!Array.isArray(pv) || pv.length === 0) return;

    const siteConfig = getSiteConfig();
    if (!siteConfig) {
      console.warn(`previewPV: site non supporté (${window.location.host})`);
      return;
    }

    const parent = document.querySelector(siteConfig.parentSelector);
    if (!parent) {
      console.warn(`previewPV: ${siteConfig.parentSelector} introuvable`);
      return;
    }

    clearPreviewPV();

    const squareSize = parent.offsetWidth / 8;
    parent.style.position = "relative";

    function squareToPosition(square) {
      const fileChar = square[0];
      const rank = parseInt(square[1], 10) - 1;
      let file;
      if (side === "w") {
        file = fileChar.charCodeAt(0) - "a".charCodeAt(0);
        return { x: file * squareSize, y: (7 - rank) * squareSize };
      } else {
        file = "h".charCodeAt(0) - fileChar.charCodeAt(0);
        return { x: file * squareSize, y: rank * squareSize };
      }
    }

    function squareCenter(square) {
      const pos = squareToPosition(square);
      return { x: pos.x + squareSize / 2, y: pos.y + squareSize / 2 };
    }

    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("class", "customPV");
    svg.setAttribute("width", `${parent.offsetWidth}px`);
    svg.setAttribute("height", `${parent.offsetWidth}px`);
    svg.setAttribute(
      "viewBox",
      `0 0 ${parent.offsetWidth} ${parent.offsetWidth}`,
    );
    svg.style.position = "absolute";
    svg.style.left = "0";
    svg.style.top = "0";
    svg.style.pointerEvents = "none";
    svg.style.zIndex = "11";

    const needsRotation = siteConfig.rotateOverlayForBlack && side === "b";
    if (needsRotation) {
      svg.style.transform = "rotate(180deg)";
      svg.style.transformOrigin = "center center";
    }

    parent.appendChild(svg);

    function pointAt(p1, p2, t) {
      return { x: p1.x + (p2.x - p1.x) * t, y: p1.y + (p2.y - p1.y) * t };
    }

    const pairCounts = {};

    function drawArrow(fromSquare, toSquare, color, label) {
      const s = squareSize;
      let p1 = squareCenter(fromSquare);
      let p2 = squareCenter(toSquare);

      const dx0 = p2.x - p1.x;
      const dy0 = p2.y - p1.y;
      const dist0 = Math.hypot(dx0, dy0);
      if (dist0 === 0) return;

      const key = [fromSquare, toSquare].sort().join("-");
      const dupIndex = pairCounts[key] || 0;
      pairCounts[key] = dupIndex + 1;
      if (dupIndex > 0) {
        const ux0 = dx0 / dist0;
        const uy0 = dy0 / dist0;
        const px0 = -uy0;
        const py0 = ux0;
        const sign = dupIndex % 2 === 1 ? 1 : -1;
        const mag = Math.ceil(dupIndex / 2) * s * 0.14 * sign;
        p1 = { x: p1.x + px0 * mag, y: p1.y + py0 * mag };
        p2 = { x: p2.x + px0 * mag, y: p2.y + py0 * mag };
      }

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dist = Math.hypot(dx, dy);
      if (dist === 0) return;
      const ux = dx / dist;
      const uy = dy / dist;
      const px = -uy;
      const py = ux;

      const headLen = s * 0.32;
      const headWidth = s * 0.24;
      const lineWidth = s * 0.1;
      const startOffset = s * 0.18;
      const endOffset = s * 0.12;

      const lineStart = {
        x: p1.x + ux * startOffset,
        y: p1.y + uy * startOffset,
      };
      const tip = { x: p2.x - ux * endOffset, y: p2.y - uy * endOffset };
      const headBase = { x: tip.x - ux * headLen, y: tip.y - uy * headLen };
      const leftPt = {
        x: headBase.x + px * (headWidth / 2),
        y: headBase.y + py * (headWidth / 2),
      };
      const rightPt = {
        x: headBase.x - px * (headWidth / 2),
        y: headBase.y - py * (headWidth / 2),
      };

      const line = document.createElementNS(SVG_NS, "line");
      line.setAttribute("x1", lineStart.x);
      line.setAttribute("y1", lineStart.y);
      line.setAttribute("x2", headBase.x);
      line.setAttribute("y2", headBase.y);
      line.setAttribute("stroke", color);
      line.setAttribute("stroke-width", lineWidth);
      line.setAttribute("stroke-linecap", "round");
      line.setAttribute("opacity", "0.9");
      svg.appendChild(line);

      const head = document.createElementNS(SVG_NS, "polygon");
      head.setAttribute(
        "points",
        `${tip.x},${tip.y} ${leftPt.x},${leftPt.y} ${rightPt.x},${rightPt.y}`,
      );
      head.setAttribute("fill", color);
      head.setAttribute("opacity", "0.9");
      svg.appendChild(head);

      const mid = pointAt(lineStart, headBase, 0.5);
      const labelGroup = document.createElementNS(SVG_NS, "g");
      if (needsRotation) {
        labelGroup.setAttribute("transform", `rotate(180 ${mid.x} ${mid.y})`);
      }

      const circle = document.createElementNS(SVG_NS, "circle");
      circle.setAttribute("cx", mid.x);
      circle.setAttribute("cy", mid.y);
      circle.setAttribute("r", s * 0.15);
      circle.setAttribute("fill", color);
      circle.setAttribute("stroke", "white");
      circle.setAttribute("stroke-width", "2");
      labelGroup.appendChild(circle);

      const text = document.createElementNS(SVG_NS, "text");
      text.setAttribute("x", mid.x);
      text.setAttribute("y", mid.y);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dominant-baseline", "central");
      text.setAttribute("fill", color === "#ffffff" ? "#262421" : "#ffffff");
      text.setAttribute("font-size", s * 0.18);
      text.setAttribute("font-weight", "bold");
      text.setAttribute("font-family", "sans-serif");
      text.textContent = label;
      labelGroup.appendChild(text);

      svg.appendChild(labelGroup);
    }

    const fenSide = sideToMoveFromFen(startFen);

    pv.forEach((uciMove, i) => {
      const from = uciMove.slice(0, 2);
      const to = uciMove.slice(2, 4);
      const moveSide = i % 2 === 0 ? fenSide : fenSide === "w" ? "b" : "w";
      const color = moveColor(moveSide);
      drawArrow(from, to, color, i + 1);
    });
  }

  window.previewPV = previewPV;
  window.clearPreviewPV = clearPreviewPV;
})();

/*
previewPV(
  "w",
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  ["","e2e4", "e7e5", "g1f3", "b8c6", "f1b5"]
);*/
