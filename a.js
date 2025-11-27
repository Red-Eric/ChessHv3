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

function isStartPosition(fen) {
  if (typeof fen !== "string") return false;
  const parts = fen.trim().split(/\s+/);
  if (parts.length < 6) return false;

  const board = parts[0];
  const sideToMove = parts[1];
  const castling = parts[2];
  const enPassant = parts[3];
  const halfmove = parts[4];
  const fullmove = parts[5];

  const rows = board.split("/");
  if (rows.length !== 8) return false;

  // rangées
  const row8 = rows[0];  // pièces noires
  const pawnBlack = rows[1]; // pions noirs
  const pawnWhite = rows[6]; // pions blancs
  const row1 = rows[7]; // pièces blanches

  // 1) pions intacts
  if (pawnBlack !== "pppppppp") return false;
  if (pawnWhite !== "PPPPPPPP") return false;

  // 2) pièces n'ont pas bougé (aucun pion dans rangée 1 et 8)
  if (!isMajorsRow(row8, false)) return false;
  if (!isMajorsRow(row1, true)) return false;

  // 3) aucun pion avancé => rangées 3,4,5,6 doivent avoir 8 cases vides
  if (![rows[2], rows[3], rows[4], rows[5]].every(r => r === "8")) return false;

  // 4) joueur à jouer = blanc
  if (sideToMove !== "w") return false;

  // 5) aucun en passant valide au début
  if (enPassant !== "-") return false;

  // 6) compteur de demi-coups et numéro de coup
  if (halfmove !== "0") return false;
  if (fullmove !== "1") return false;

  // 7) castling rights doivent exister si les pièces sont encore là
  if (!/^-|[KQkq]+$/.test(castling)) return false;

  // si Chess960, on doit vérifier cohérence roque (Roi entre les tours)
  if (!isValidCastlingFor960(row1, row8, castling)) return false;

  return true;
}

// vérifie la rangée de pièces majeures (pas de pions, 8 cases)
function isMajorsRow(row, isWhite) {
  let count = 0;
  for (let c of row) count += /\d/.test(c) ? parseInt(c) : 1;
  if (count !== 8) return false;
  if (/[pP]/.test(row)) return false;
  const allowed = isWhite ? /[KQRBN]/ : /[kqrbn]/;
  for (let c of row) {
    if (/[A-Za-z]/.test(c) && !allowed.test(c)) return false;
  }
  return true;
}

// vérifier cohérence roque en Chess960 (facultatif mais exact)
function isValidCastlingFor960(row1, row8, castling) {
  // pour simplifier, si castling = "-" on accepte (signifie pas de roque possible)
  if (castling === "-") return true;
  // si roi et tours existent, OK, les positions exactes seront vérifiées par ta logique ultérieure
  return true;
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

if (window.location.hostname.includes("lichess.org")) {
  console.log("HEHEHE")
  function getFen() {
    let fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    // el = document.querySelectorAll("kwdb") // document.querySelectorAll("move")

    let el = document.querySelectorAll("kwdb");

    // console.clear()


    if (el.length === 0) {
      el = document.querySelectorAll("move");
      let tempFEN = extractFEN(document.querySelector("cg-board"))
      if (isStartPosition(tempFEN)) {
        lastFEN = tempFEN
        console.log(lastFEN)
        return tempFEN
      }
    }

    let moves = []; // move list
    el.forEach((element) => {
      // console.log(element.innerText)
      if (element.innerText) {
        moves.push(element.innerText.split("\n")[0]);
      }
    });
    // [e2 , e4]


    const game = new Chess(lastFEN);
    moves.forEach((e) => game.move(e));

    fen = game.fen();
    //   console.log(fen)
    // console.log(fen)
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


