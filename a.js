if (window.location.hostname.includes("chess.com")) {
  (function () {
    function getGameObject() {
      if (window.game) return window.game;
      const board = document.querySelector(".board");
      if (board && board.game) {
        return board.game;
      }
      return null;
    }

    const defaultMoveDelay = 100;

    function movePiece(
      from,
      to,
      promotion = "q",
      moveDelay = defaultMoveDelay
    ) {
      const game = getGameObject();
      if (!game) return false;
      const legal = game.getLegalMoves();
      let move = legal.find((m) => m.from === from && m.to === to);
      if (!move) return false;
      if (promotion && move.promotionTypes) {
        move.promotionType = promotion;
      }
      setTimeout(() => {
        try {
          game.move({ ...move, animate: true, userGenerated: true });
        } catch (err) {
          console.log("err de deplacement");
        }
      }, moveDelay);
      return true;
    }

    window.addEventListener("message", (event) => {
      if (event.source !== window) return;
      if (event.data?.type === "GET_FEN") {
        const game = getGameObject();
        const fen =
          game?.getFEN() ||
          "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        const side_ = game?.getPlayingAs?.() || 1;
        // console.log(fen)
        // rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1
        window.postMessage({ type: "FEN_RESPONSE", fen, side_ }, "*");
      }
      if (event.data?.type === "MOVE") {
        const { from, to, promotion, moveDelay } = event.data;
        movePiece(from, to, promotion, moveDelay);
      }
    });
  })();
}

let lastFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"


function extractFEN(boardElement) {
  if (!boardElement) throw new Error("boardElement non fourni");

  // 1) calculer la taille d'une case depuis la bounding box du board
  const rect = boardElement.getBoundingClientRect();
  const squareSize = rect.width / 8;

  // utilitaire pour extraire translate(x,y) depuis style (translate, translate3d, matrix...)
  function parseTranslate(style) {
    if (!style) return null;
    // cherche translate(xpx, ypx) ou translate3d(xpx, ypx, zpx) ou matrix(a,b,c,d,tx,ty)
    const t = style.match(/translate3d?\(\s*([-\d.]+)px\s*,\s*([-\d.]+)px/);
    if (t) return { x: parseFloat(t[1]), y: parseFloat(t[2]) };
    const m = style.match(/matrix\([^\)]+\)/);
    if (m) {
      // matrix(a,b,c,d,tx,ty) -> tx,ty sont les 5e et 6e valeurs
      const nums = m[0].replace(/[^\d\.\-\s,]/g, "").split(",").map(s => parseFloat(s.trim()));
      if (nums.length >= 6) return { x: nums[4], y: nums[5] };
    }
    // fallback: cherche deux nombres dans parentheses
    const any = style.match(/([-]?\d+(\.\d+)?)px/g);
    if (any && any.length >= 2) {
      return { x: parseFloat(any[0]), y: parseFloat(any[1]) };
    }
    return null;
  }

  // 2) construire une grille vide 8x8 (null = vide)
  const board = Array.from({ length: 8 }, () => Array(8).fill(null));

  const pieces = Array.from(boardElement.querySelectorAll("piece"));

  // collecter y moyens de pions pour détecter orientation
  let whitePawnYs = [];
  let blackPawnYs = [];

  pieces.forEach(p => {
    const style = p.getAttribute("style") || p.style.cssText || "";
    const pos = parseTranslate(style);
    if (!pos) return;

    // colonne et rangée (arrondir proprement)
    let col = Math.round(pos.x / squareSize);
    let row = Math.round(pos.y / squareSize);

    col = Math.max(0, Math.min(7, col));
    row = Math.max(0, Math.min(7, row));

    const classes = (p.className || p.getAttribute("class") || "").trim().split(/\s+/);
    if (classes.length < 2) return;
    const color = classes[0].toLowerCase();
    const type = classes[1].toLowerCase();

    if (type === "pawn") {
      if (color === "white") whitePawnYs.push(pos.y);
      else blackPawnYs.push(pos.y);
    }

    const fenMap = { pawn: "p", knight: "n", bishop: "b", rook: "r", queen: "q", king: "k" };
    const base = fenMap[type] || "?";
    const pieceChar = (color === "white") ? base.toUpperCase() : base;

    board[row][col] = pieceChar;
  });

  // 3) détecter orientation automatiquement :
  // si la moyenne y des pions blancs est > moyenne y des pions noirs => blancs en bas (y augmente vers le bas)
  let whiteBottom = true; // valeur par défaut
  if (whitePawnYs.length && blackPawnYs.length) {
    const avg = arr => arr.reduce((s, v) => s + v, 0) / arr.length;
    whiteBottom = (avg(whitePawnYs) > avg(blackPawnYs));
  }

  // 4) construire la FEN : parcourt du top (y petit) au bottom (y grand)
  // si whiteBottom === true -> row 0 = rang 8 ... row 7 = rang 1 (normal)
  // si whiteBottom === false -> board retourné : row 0 = rang 1 ... row 7 = rang 8 -> on inverse les rangs
  let fenRanks = [];
  for (let r = 0; r < 8; r++) {
    const sourceRow = whiteBottom ? r : 7 - r;
    let empty = 0;
    let rankStr = "";
    for (let c = 0; c < 8; c++) {
      const cell = board[sourceRow][c];
      if (!cell) empty++;
      else {
        if (empty) { rankStr += String(empty); empty = 0; }
        rankStr += cell;
      }
    }
    if (empty) rankStr += String(empty);
    fenRanks.push(rankStr);
  }

  const piecePlacement = fenRanks.join("/");
  // renvoie un FEN complet basique (sans info d'état réel)
  return `${piecePlacement} w KQkq - 0 1`;
}

let hookedSite = false;

if (window.location.hostname.includes("lichess.org")) {
  console.log("HEHEHE")

  // let _move = site.sound.move;
  // let _move;
  let castling = "KQkq"

  const intervalId = setInterval(() => {
    if (site?.sound?.move) {
      const _move = site.sound.move;

      site.sound.move = function (x) {
        if (x && x.fen) {
          // window.lastFen = x.fen;
          sideToMove = (x.ply % 2 === 0) ? "w" : "b"

          if (sideToMove === "b" && (x.san === "O-O" || x.san === "O-O-O" || x.san.includes("K"))) {
            castling = castling.replaceAll("KQ", "")
          }
          if (sideToMove === "w" && (x.san === "O-O" || x.san === "O-O-O" || x.san.includes("K"))) {
            castling = castling.replaceAll("kq", "")
          }

          if (castling === "") {
            castling = "-"
          }

          window.lastFEN = `${x.fen} ${sideToMove} ${castling} - 0 1`
          // console.log(window.lastFEN)
        }
        return _move.call(this, x);
      };

      clearInterval(intervalId);
    }
    // console.log("In tha boucle")
  }, 200);



  function getFen() {
    let fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    if (window.lastFEN) {
      // console.log(window.lastFEN)
      return window.lastFEN
    }
    return fen;
  }

  (function () {
    window.addEventListener("message", (event) => {
      if (event.source !== window) return;

      if (event.data?.type === "FEN") {
        // console.log(getFen())
        window.postMessage({ type: "FEN_RESPONSE", fen: getFen() }, "*");
      }
    });
  })();
}

// ///


