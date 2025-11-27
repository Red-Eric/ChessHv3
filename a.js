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

  

}

// ///
