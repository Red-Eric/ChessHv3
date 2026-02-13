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

  (function () {
    const OrigWS = window.WebSocket;
    window._lichessSockets = [];

    window.WebSocket = function (...args) {
      const ws = new OrigWS(...args);
      console.log("[WS]", ws.url);
      window._lichessSockets.push(ws);
      return ws;
    };

    window.WebSocket.prototype = OrigWS.prototype;
    // console.log("WebSocket hook OK");
  })();

  window.playMove = function (uci) {
    if (!window._lichessSockets || !window._lichessSockets.length) {
      // console.log("aucun socket");
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
        console.log("error");
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

      // clearInterval(intervalId);
    }
  }, 100);

  function getFen() {
    let fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    if (window.lastFEN) {
      // console.log(window.lastFEN)
      return window.lastFEN;
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
      if (event.data?.type === "MOVE") {
        const { uci, moveDelay } = event.data;
        window.playMove(uci)
      }
    });
  })();
}

// ///
