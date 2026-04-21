let lastFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

function exportUciWithFen(history) {
  if (!history || history.length === 0) return "";
  const startFen = history[0].beforeFen;
  const moves = history
    .map((m) => m.from + m.to + (m.promotion || ""))
    .join(" ");

  return `position fen ${startFen} moves ${moves}`;
}

window.isGameOver = false;
function getStartFEN(fen) {
  const board = fen.split(" ")[0];
  const rows = board.split("/");

  const blackBackRank = rows[0];
  const whiteBackRank = blackBackRank.toUpperCase();

  return `${blackBackRank}/pppppppp/8/8/8/8/PPPPPPPP/${whiteBackRank} w KQkq - 0 1`;
}

if (window.location.host === "www.chess.com") {
  (function () {
    function getGameObject() {
      if (window.game) return window.game;
      const board = document.querySelector(".board");
      if (board && board.game) {
        return board.game;
      }
      return null;
    }

    const defaultMoveDelay = 10;

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
        let fenHistory = [];
        let uciHistory = null;
        if (game) {
          const fenInit = game.getHistoryFENs(1)[0];
          const startFen = getStartFEN(fenInit);
          fenHistory = game.getHistoryFENs(1);
          fenHistory.unshift(startFen);
          uciHistory = exportUciWithFen(game.getCurrentFullLine());
        }
        const fen =
          game?.getFEN() ||
          "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        const side_ = game?.getPlayingAs?.() || 1;
        const isGameOver = game?.isGameOver?.() || false;
        const username = window?.context?.user?.username || null;
        window.postMessage(
          {
            type: "FEN_RESPONSE",
            fen,
            side_,
            isGameOver,
            fenHistory,
            username,
            uciHistory,
          },
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

if (window.location.host === "lichess.org") {
  window._lichessSockets = [];
  let castling = "KQkq";

  const intervalId = setInterval(() => {
    if (site?.sound?.move) {
      const _move = site.sound.move;
      window._originalMove = _move;
      site.sound.move = function (x) {
        if (x && x.fen) {
          sideToMove = x.ply % 2 === 0 ? "w" : "b";

          if (x.status?.name === "draw" || x.status?.name === "mate") {
            window.isGameOver = true;
          } else {
            window.isGameOver = false;
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
        window.postMessage(
          {
            type: "FEN_RESPONSE",
            fen: getFen(),
            isGameOver: window.isGameOver,
          },
          "*",
        );
      }
      if (event.data?.type === "stop") {
        if (window._originalMove) {
          site.sound.move = window._originalMove;
          delete window._originalMove;
        }
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
