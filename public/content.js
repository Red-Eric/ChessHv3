if (window.location.hostname.includes(deobf(["c","e","h","s","s",".","c","o","m"], [3,0,1,2,8,5,6,7,4]))) {

  function deobf(arr, order) {
    return order.map(i => arr[i]).join("");
  }

  const STR = {
    parentSelectorChunks: ["w","c","-","c","h","e","s","s","-","b","o","a","r","d"],
    parentSelectorOrder: [0,1,2,3,4,5,6,7,8,9,10,11,12,13],

    classCustomHChunks: ["c","u","s","t","o","m","H"],
    classCustomHOrder: [...Array(7).keys()],

    colorsChunks: ["b","l","u","e","g","r","e","e","n","y","e","l","l","o","w","o","r","a","n","g","e","r","e","d"],
    colorsOrder: [0,1,2,3,7,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],

    arrowheadIdPrefixChunks: ["a","r","r","o","w","h","e","a","d","-"],
    arrowheadIdPrefixOrder: [...Array(10).keys()],

    svgNamespaceChunks: ["h","t","t","p",":","/","/","w","w","w",".","w","3",".","o","r","g","/","2","0","0","0","/","s","v","g"],
    svgNamespaceOrder: [...Array(27).keys()],

    coordinateLightSelectorChunks: [".","c","o","o","r","d","i","n","a","t","e","-","l","i","g","h","t"],
    coordinateLightSelectorOrder: [...Array(17).keys()],

    nodeSelectorChunks: ["d","i","v",".","n","o","d","e"],
    nodeSelectorOrder: [...Array(7).keys()],

    messagesendChunks: ["c","h","r","o","m","e",".","r","u","n","t","i","m","e",".","s","e","n","d","M","e","s","s","a","g","e"],
    messagesendOrder: [...Array(26).keys()],

    consoleLogChunks: ["c","o","n","s","o","l","e",".","l","o","g"],
    consoleLogOrder: [...Array(10).keys()],

    sendingMovesTextChunks: ["S","e","n","d","i","n","g"," ","m","o","v","e","s"],
    sendingMovesTextOrder: [...Array(13).keys()],

    blackStrChunks: ["b","l","a","c","k"],
    blackStrOrder: [...Array(5).keys()],

    whiteStrChunks: ["w","h","i","t","e"],
    whiteStrOrder: [...Array(5).keys()],

    zeroStrChunks: ["0"],
    zeroStrOrder: [0]
  };

  function deobf(arr, order) {
    return order.map(i => arr[i]).join("");
  }

  const PARENT_SELECTOR = deobf(STR.parentSelectorChunks, STR.parentSelectorOrder); 
  const CLASS_CUSTOM_H = deobf(STR.classCustomHChunks, STR.classCustomHOrder); 
  const COLORS = [
    "blue","green","yellow","orange","red"
  ]; 

  function highlightMovesOnBoard(moves, side) {
    const parent = document.querySelector(PARENT_SELECTOR);
    if (!parent) return;

    const squareSize = parent.offsetWidth / 8;
    const maxMoves = 5;

    parent.querySelectorAll("."+CLASS_CUSTOM_H).forEach(el => el.remove());

    function squareToPosition(square) {
      const fileChar = square[0];
      const rankChar = square[1];
      const rank = parseInt(rankChar, 10) - 1;

      let file;
      if (side === "w") {
        file = fileChar.charCodeAt(0) - "a".charCodeAt(0);
        const y = (7 - rank) * squareSize;
        const x = file * squareSize;
        return {x, y};
      } else {
        file = "h".charCodeAt(0) - fileChar.charCodeAt(0);
        const y = rank * squareSize;
        const x = file * squareSize;
        return {x, y};
      }
    }

    function drawArrow(fromSquare, toSquare, color, score) {
      const from = squareToPosition(fromSquare);
      const to = squareToPosition(toSquare);

      const svgNS = deobf(STR.svgNamespaceChunks, STR.svgNamespaceOrder);

      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("class", CLASS_CUSTOM_H);
      svg.setAttribute("width", parent.offsetWidth);
      svg.setAttribute("height", parent.offsetWidth);
      svg.style.position = "absolute";
      svg.style.left = "0";
      svg.style.top = "0";
      svg.style.pointerEvents = "none";
      svg.style.overflow = "visible";
      svg.style.zIndex = "10";

      const defs = document.createElementNS(svgNS, "defs");
      const marker = document.createElementNS(svgNS, "marker");

      const arrowHeadIdPrefix = deobf(STR.arrowheadIdPrefixChunks, STR.arrowheadIdPrefixOrder);
      marker.setAttribute("id", `${arrowHeadIdPrefix}${color}`);
      marker.setAttribute("markerWidth", "3.5");
      marker.setAttribute("markerHeight", "2.5");
      marker.setAttribute("refX", "1.75");
      marker.setAttribute("refY", "1.25");
      marker.setAttribute("orient", "auto");
      marker.setAttribute("markerUnits", "strokeWidth");

      const arrowPath = document.createElementNS(svgNS, "path");
      arrowPath.setAttribute("d", "M0,0 L3.5,1.25 L0,2.5 Z");
      arrowPath.setAttribute("fill", color);
      marker.appendChild(arrowPath);
      defs.appendChild(marker);
      svg.appendChild(defs);

      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", from.x + squareSize / 2);
      line.setAttribute("y1", from.y + squareSize / 2);
      line.setAttribute("x2", to.x + squareSize / 2);
      line.setAttribute("y2", to.y + squareSize / 2);
      line.setAttribute("stroke", color);
      line.setAttribute("stroke-width", "5");
      line.setAttribute("marker-end", `url(#${arrowHeadIdPrefix}${color})`);
      line.setAttribute("opacity", "0.6");
      svg.appendChild(line);

      if (score !== undefined) {
        const text = document.createElementNS(svgNS, "text");
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

    moves.slice(0, maxMoves).forEach((move, index) => {
      const color = COLORS[index] || "red";
      drawArrow(move.from, move.to, color, move.score);
    });
  }

  function clearHighlightSquares() {
    const parent = document.querySelector(PARENT_SELECTOR);
    if (!parent) return;
    parent.querySelectorAll("."+CLASS_CUSTOM_H).forEach(el => el.remove());
  }

  function getSide() {
    const coord = document.querySelector(deobf(STR.coordinateLightSelectorChunks, STR.coordinateLightSelectorOrder));
    if (!coord) return "w";
    const val = coord.innerHTML;
    if (val === deobf(STR.blackStrChunks, STR.blackStrOrder)) return "black";
    if (val === deobf(STR.whiteStrChunks, STR.whiteStrOrder)) return "white";
    return "w";
  }

  function getMovelist() {
    let movelist = [];
    document.querySelectorAll(deobf(STR.nodeSelectorChunks, STR.nodeSelectorOrder)).forEach(e => {
      movelist.push(e.innerText.replaceAll(" ", ""));
    });
    return movelist;
  }

  function sendMessage() {
    let moves = getMovelist();
    if (moves && moves.length > 0) {
      try {
        chrome.runtime.sendMessage({ movelist: moves, side: getSide()[0] });
      } catch (e) {}
    }
  }

  setInterval(() => {
    try {
      chrome && console.log && console.log(deobf(STR.sendingMovesTextChunks, STR.sendingMovesTextOrder));
      sendMessage();
    } catch (e) {}
  }, 500);

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    clearHighlightSquares();
    highlightMovesOnBoard(message.moves, getSide()[0]);
  });

} else {
  console.log("ChessCom Only.");
}
