let lastFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
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

if (window.location.hostname.includes("lichess.org")) {

  let castling = "KQkq"

  let socket;

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
          
          if (sideToMove === "b" && x.uci.includes("a1")) {
            castling = castling.replaceAll("Q", "")
          }
          if (sideToMove === "b" && x.uci.includes("h1")) {
            castling = castling.replaceAll("K", "")
          }
          if (sideToMove === "w" && (x.san === "O-O" || x.san === "O-O-O" || x.san.includes("K"))) {
            castling = castling.replaceAll("kq", "")
          }

          if (sideToMove === "w" && x.uci.includes("a8")) {
            castling = castling.replaceAll("q", "")
          }
          if (sideToMove === "w" && x.uci.includes("h8")) {
            castling = castling.replaceAll("k", "")
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


