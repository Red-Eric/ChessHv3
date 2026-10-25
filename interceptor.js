const queryChess_com = "wc-chess-board";
const queryLichess_org = "cg-container";
const queryWordChess_com = "div.cg-board";

function getGameObjectPuzzle() {
  if (window.game) return window.game;
  const board = document.querySelector(".board");
  if (board && board.game) {
    return board.game;
  }
  return null;
}

const defaultMoveDelay = 1000;

function movePiecePuzzle(
  from,
  to,
  promotion = "q",
  moveDelay = defaultMoveDelay,
) {
  const game = getGameObjectPuzzle();
  if (!game) {
    console.log("game not found");
    return false;
  }
  const legal = game.getLegalMoves();
  // let move = legal.find((m) => m.from === from && m.to === to);
  let move = {
    from: from,
    to: to,
    promotionTypes: promotion,
  };
  if (!move) {
    console.log("no legal move ?");
    return false;
  }
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

if (window.location.href.includes("https://www.chess.com/puzzles/rated")) {
  let res_ = [];

  (() => {
    const originalFetch = window.fetch;

    window.fetch = async function (...args) {
      const response = await originalFetch.apply(this, args);

      const url = args[0] instanceof Request ? args[0].url : String(args[0]);

      if (url.includes("/rpc/chesscom.puzzles.v1.PuzzleService/GetNextRated")) {
        try {
          const data = await response.clone().json();
          const puzzle = data?.userPuzzle?.puzzle;

          if (puzzle) {
            const moves = puzzle.moves || [];

            // Récupérer le côté à partir du FEN
            const fen = puzzle.pgn?.match(/\[FEN "([^"]+)"\]/)?.[1];
            const activeColor = fen?.split(/\s+/)[1];

            const side =
              activeColor === "w" ? "b" : activeColor === "b" ? "w" : null;

            // Garder uniquement les coups aux index impairs
            const solution = moves
              .filter((_, index) => index % 2 === 1)
              .map(({ move }) => ({
                from: move.from.replace("SQUARE_", "").toLowerCase(),
                to: move.to.replace("SQUARE_", "").toLowerCase(),
                promotion: move.promotionPieceType
                  ? move.promotionPieceType
                      .replace("PROMOTION_PIECE_TYPE_", "")
                      .toLowerCase()
                  : null,
              }));

            console.clear();

            res_ = {
              side: side,
              orientation: side,
              solution: solution,
            };
          }
        } catch (error) {
          console.error("[Chess.com] Erreur :", error);
        }
      }

      return response;
    };
  })();

  let flag__ = false;

  const interval = setInterval(() => {
    const fen = document.querySelector("wc-chess-board")?.game?.getFEN();

    if (
      fen &&
      !(fen?.includes("pppppppp/8/8/8/8/PPPPPPPP") && res_?.length === 0)
    ) {
      flag__ = true;
    }

    if (flag__ === true) {
      res_.solution.forEach((e) => {
        console.log(e);

        const prom_ = e.promotion?.toLocaleLowerCase()[0] || "q";

        movePiecePuzzle(e.from, e.to, prom_, 1000);
      });

      flag__ = false;
    }

    res = [];
  }, 500);
}
