let lastFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
let hookedSite = false;

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
      moveDelay = defaultMoveDelay,
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
        const isGameOver = game?.isGameOver?.() || false;
        window.postMessage(
          { type: "FEN_RESPONSE", fen, side_, isGameOver },
          "*",
        );
      }
      if (event.data?.type === "MOVE") {
        const { from, to, promotion, moveDelay } = event.data;
        movePiece(from, to, promotion, moveDelay);
      }
    });
  })();
}

if (window.location.hostname.includes("lichess.org")) {
  window._lichessSockets = [];

  function boardToFEN() {
    const board = document.querySelector("cg-board");
    if (!board) return null;

    const boardRect = board.getBoundingClientRect();
    const boardSize = boardRect.width; // width == height
    const squareSize = boardSize / 8;

    // matrice vide 8x8
    const grid = Array.from({ length: 8 }, () => Array(8).fill(null));

    const pieces = board.querySelectorAll("piece");

    pieces.forEach((piece) => {
      const style = piece.style.transform;
      const match = style.match(/translate\(([^p]+)px,\s*([^p]+)px\)/);
      if (!match) return;

      const x = parseFloat(match[1]);
      const y = parseFloat(match[2]);

      const file = Math.round(x / squareSize);
      const rank = Math.round(y / squareSize);

      const classes = piece.className.split(" ");
      const color = classes[0];
      const type = classes[1];

      const pieceMap = {
        pawn: "p",
        rook: "r",
        knight: "n",
        bishop: "b",
        queen: "q",
        king: "k",
      };

      let fenChar = pieceMap[type];
      if (color === "white") fenChar = fenChar.toUpperCase();

      // IMPORTANT :
      // Dans cg-board, Y=0 est en haut (rank 8)
      grid[rank][file] = fenChar;
    });

    // Construire FEN
    let fenRows = [];

    for (let r = 0; r < 8; r++) {
      let row = "";
      let empty = 0;

      for (let f = 0; f < 8; f++) {
        const piece = grid[r][f];
        if (!piece) {
          empty++;
        } else {
          if (empty > 0) {
            row += empty;
            empty = 0;
          }
          row += piece;
        }
      }

      if (empty > 0) row += empty;
      fenRows.push(row);
    }

    return fenRows.join("/");
  }

  (function () {
    const OrigWS = window.WebSocket;
    window._lichessSockets = [];
    window.WebSocket = function (...args) {
      const ws = new OrigWS(...args);
      window._lichessSockets.push(ws);
      return ws;
    };
    window.WebSocket.prototype = OrigWS.prototype;

  })();

  window.playMove = function (uci) {
    if (!window._lichessSockets || !window._lichessSockets.length) {
      return;
    }

    window._lichessSockets.forEach((ws, i) => {
      if (ws.readyState !== 1) return;

      try {
        ws.send(
          JSON.stringify({
            t: "move",
            d: { u: uci, a: 1 },
          }),
        );
      } catch (e) {
        // console.log("error");
      }
    });
  };

  let castling = "KQkq";

  const intervalId = setInterval(() => {
    if (site?.sound?.move) {
      const _move = site.sound.move;

      site.sound.move = function (x) {
        if (x && x.fen) {
          sideToMove = x.ply % 2 === 0 ? "w" : "b";

          if (
            sideToMove === "b" &&
            (x.san === "O-O" || x.san === "O-O-O" || x.san.includes("K"))
          ) {
            castling = castling.replaceAll("KQ", "");
          }

          if (sideToMove === "b" && x.uci.includes("a1")) {
            castling = castling.replaceAll("Q", "");
          }
          if (sideToMove === "b" && x.uci.includes("h1")) {
            castling = castling.replaceAll("K", "");
          }
          if (
            sideToMove === "w" &&
            (x.san === "O-O" || x.san === "O-O-O" || x.san.includes("K"))
          ) {
            castling = castling.replaceAll("kq", "");
          }

          if (sideToMove === "w" && x.uci.includes("a8")) {
            castling = castling.replaceAll("q", "");
          }
          if (sideToMove === "w" && x.uci.includes("h8")) {
            castling = castling.replaceAll("k", "");
          }

          if (castling === "") {
            castling = "-";
          }

          window.lastFEN = `${x.fen} ${sideToMove} - - 0 1`;
        }
        return _move.call(this, x);
      };
    }
  }, 100);

  function getFen() {
    let fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    if (window.lastFEN) {
      return window.lastFEN;
    }
    return fen;
  }

  (function () {
    window.addEventListener("message", (event) => {
      if (event.source !== window) return;

      if (event.data?.type === "FEN") {
        window.postMessage({ type: "FEN_RESPONSE", fen: getFen() }, "*");
      }
      if (event.data?.type === "MOVE") {
        const { uci, moveDelay } = event.data;
        if (window.lastFEN) {
          window.playMove(uci);
        }
      }
    });
  })();
}

// ///
