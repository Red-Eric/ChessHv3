let squareTo = "";

let isMobile = false;

const audioLichess = new Audio();

// old code

let stat_0_white = {
  best: 0,
  blunder: 0,
  blunderGP0: 0,
  blunderGP1: 0,
  blunderGP2: 0,
  book: 0,
  brilliant: 0,
  excellent: 0,
  forced: 0,
  good: 1,
  greatFind: 0,
  inaccuracy: 0,
  inaccuracyGP0: 0,
  inaccuracyGP1: 0,
  inaccuracyGP2: 0,
  miss: 0,
  missGP0: 0,
  missGP1: 0,
  missGP2: 0,
  mistake: 0,
  mistakeGP0: 0,
  mistakeGP1: 0,
  mistakeGP2: 0,
};
let stat_0_black = {
  best: 0,
  blunder: 0,
  blunderGP0: 0,
  blunderGP1: 0,
  blunderGP2: 0,
  book: 0,
  brilliant: 0,
  excellent: 0,
  forced: 0,
  good: 1,
  greatFind: 0,
  inaccuracy: 0,
  inaccuracyGP0: 0,
  inaccuracyGP1: 0,
  inaccuracyGP2: 0,
  miss: 0,
  missGP0: 0,
  missGP1: 0,
  missGP2: 0,
  mistake: 0,
  mistakeGP0: 0,
  mistakeGP1: 0,
  mistakeGP2: 0,
};

let userName = null;
let lastClassification = null;
let isGameOverFlag = true;
const chessComAudio = new Audio();
let lastUrl = window.location.pathname;
let debugEngine = false;
let url = window.location.href;

const chess2 = new Chess();
// Inject a.js
preInjection();

const interval = 100;

chrome.storage.local.get(["chessConfig"], (result) => {
  console.log("config storage ", result.chessConfig);
  config = result.chessConfig || {
    elo: 3500,
    coach: 999,
    lines: 5,
    colors: ["#0000ff", "#00ff00", "#FFFF00", "#f97316", "#ff0000"],
    depth: 10,
    depth2: 10,
    delay: 100,
    style: "Default",
    autoMove: false,
    floatingBtn: false,
    speach: false,
    moveClassification: false,
    autoStart: false,
    winningMove: false,
    showEval: false,
    onlyShowEval: false,
    key: "a",
    key2: "z",
  };

  (() => {
    const engine = new komodo({
      elo: config.elo,
      depth: config.depth,
      multipv: config.lines,
      threads: 2,
      hash: 128,
      personality: config.style,
    });

    // variable for key press Move
    let keyMove = [
      {
        from: "e2",
        to: "e4",
        eval: "+2.83",
        fen: "2rqr1k1/pp4pp/2n1bp2/8/3P4/P4NPP/1B2B1P1/2RQ1RK1 b - - 0 19",
        side: "white",
      },
      {
        from: "e2",
        to: "e3",
        eval: "+3.11",
        fen: "2rqr1k1/pp4pp/2n1bp2/8/3P4/P4NPP/1B2B1P1/2RQ1RK1 b - - 0 19",
        side: "white",
      },
      {
        from: "d2",
        to: "d4",
        eval: "+3.12",
        fen: "2rqr1k1/pp4pp/2n1bp2/8/3P4/P4NPP/1B2B1P1/2RQ1RK1 b - - 0 19",
        side: "white",
      },
      {
        from: "d2",
        to: "d3",
        eval: "+3.14",
        fen: "2rqr1k1/pp4pp/2n1bp2/8/3P4/P4NPP/1B2B1P1/2RQ1RK1 b - - 0 19",
        side: "white",
      },
      {
        from: "c2",
        to: "c4",
        eval: "+3.30",
        fen: "2rqr1k1/pp4pp/2n1bp2/8/3P4/P4NPP/1B2B1P1/2RQ1RK1 b - - 0 19",
        side: "white",
      },
    ];

    // based on torch

    let coach = null;

    if (config.coach < 988) {
      coach = new CoachEngine();
    }

    function onCoachChanged(newCoach) {
      location.reload(true);
    }

    const start = () => {
      if (window.location.host === "www.chess.com") {
        lastFEN = "";
        uciHistory = "";
        fen_ = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        side_index = 1;
        evalObj = null;
        chessComFenHistory = [];
        statObj = null;

        function getElo(side) {
          const players = document.querySelectorAll(".player-playerContent");
          if (players.length < 2) return null;

          const extractElo = (text) => {
            const match = text.match(/\((\d+)\)/);
            return match ? parseInt(match[1], 10) : null;
          };

          const topElo = extractElo(players[0].innerText);
          const bottomElo = extractElo(players[1].innerText);

          if (side.toLowerCase() === "white") {
            return { white: bottomElo, black: topElo };
          } else if (side.toLowerCase() === "black") {
            return { white: topElo, black: bottomElo };
          } else {
            return null;
          }
        }

        function inject() {
          window.addEventListener("message", (event) => {
            if (event.source !== window) return;
            if (event.data && event.data.type === "FEN_RESPONSE") {
              fen_ = event.data.fen;
              uciHistory = event.data.uciHistory;
              side_index = event.data.side_;
              userName = event.data.username;
              chessComFenHistory = event.data.fenHistory;
              const isGameOver = event.data.isGameOver;
            }
          });
        }
        inject();

        function requestFen() {
          window.postMessage({ type: "GET_FEN" }, "*");
        }
        function requestMove(from, to, promotion = "q", key = false) {
          key
            ? (moveDelay = 0)
            : (moveDelay = randomIntBetween(100, config.delay));
          window.postMessage(
            {
              type: "MOVE",
              from,
              to,
              promotion,
              moveDelay,
            },
            "*",
          );
        }

        function squareToIndex(square) {
          const file = square.charCodeAt(0) - 96; // a=1 ... h=8
          const rank = parseInt(square[1], 10); // 1..8
          return file * 10 + rank;
        }

        function getSide() {
          return side_index === 1 ? "white" : "black";
        }

        // key press
        window.onkeyup = (e) => {
          if (e.key === config.key) {
            requestMove(keyMove[0].from, keyMove[0].to, "q", true);
          }
          if (e.key === config.key2) {
            const balancedMove = extractNormalMove(keyMove, getSide());
            requestMove(balancedMove.from, balancedMove.to, "q", true);
          }
        };

        async function checkAndSendMoves() {
          // fix refresh page

          // Floating Button for Android 
          if (config.floatingBtn) {
            if (!document.getElementById("rederic-float-wrap")) {
              const wrap = document.createElement("div");
              wrap.id = "rederic-float-wrap";

              Object.assign(wrap.style, {
                position: "fixed",
                right: "18px",
                bottom: "18px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                zIndex: "999999",
              });

              const makeBtn = (label, variant) => {
                const btn = document.createElement("button");
                btn.textContent = label;

                const isBest = variant === "best";
                Object.assign(btn.style, {
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(4px)",
                  background: isBest
                    ? "rgba(74,124,31,0.15)"
                    : "rgba(0,0,0,0.05)",
                  border: isBest
                    ? "1px solid #4a7c1f"
                    : "1px solid rgba(74,124,31,0.3)",
                  color: isBest ? "#4a7c1f" : "#7a7060",
                });

                btn.onmouseenter = () =>
                  Object.assign(btn.style, {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                  });
                btn.onmouseleave = () =>
                  Object.assign(btn.style, {
                    transform: "translateY(0)",
                    boxShadow: "none",
                  });

                return btn;
              };

              const playBest = makeBtn("Play Best", "best");
              const playBalanced = makeBtn("Play Balanced", "balanced");

              playBest.onclick = () => {
                console.log("playBest clicked");
                requestMove(keyMove[0].from, keyMove[0].to, "q", true);
              };

              playBalanced.onclick = () => {
                const { from, to } = extractNormalMove(keyMove, getSide());
                requestMove(from, to, "q", true);
              };

              wrap.append(playBest, playBalanced);
              document.body.appendChild(wrap);
            }
          } else {
            document.getElementById("rederic-float-wrap")?.remove();
          }

          if (lastUrl !== window.location.pathname) {
            lastUrl = window.location.pathname;
            isGameOverFlag = true;
          }

          // auto start game
          if (config.autoStart) {
            const startBtn =
              document.querySelector(".new-game-buttons-buttons") ||
              document.querySelector(
                ".game-over-secondary-actions-row-component",
              ) ||
              document.querySelector(".game-over-arena-button-component") ||
              document.querySelector(".arena-footer-component") ||
              null;

            if (startBtn) {
              if (startBtn.children[0].innerText.length > 0) {
                startBtn.children[0].click();
              }
            }
          }

          requestFen();

          if (!config.showEval && document.querySelector("#customEval")) {
            document.querySelector("#customEval").remove();
            evalObj = null;
          }

          if (!document.querySelector("#customEval") && config.showEval) {
            const boardContainer = document.querySelector(".board");
            if (boardContainer) {
              evalObj = createEvalBarChessCom("0.0", getSide());
            }
          }

          if (config.coach < 998 && !document.querySelector("#acc-widget")) {
            statObj = createSimpleAccuracyDisplay(
              100,
              1500,
              100,
              1500,
              getSide(),
            );
          }

          if (
            (config.coach === 999 && document.querySelector("#acc-widget")) ||
            (config.coach === 999 && document.querySelector("#acc-widget"))
          ) {
            statObj = null;
            document.querySelector("#acc-widget").remove();
          }

          if (lastFEN !== fen_) {
            //accuracy
            clearHint();
            lastFEN = fen_;

            chessComAudio.pause();
            if (uciHistory) {
              const whiteElo = getElo(getSide())?.white || 3200;
              const blackElo = getElo(getSide())?.black || 3200;

              if (coach) {
                // console.clear()
                // console.log(uciHistory)
                coach
                  .getChat(uciHistory, getSide(), whiteElo, blackElo)
                  .then((result) => {
                    // console.log(result);
                    if (lastFEN === result.fen) {
                      // console.log(result)

                      if (config.speach) {
                        chessComAudio.src = result.urlAudio;
                        chessComAudio.play();
                      }

                      if (statObj) {
                        statObj.update({
                          side: getSide(),
                          whiteAcc: result.whiteAccuracy,
                          blackAcc: result.blackAccuracy,

                          whiteElo: result.whiteElo,
                          blackElo: result.blackElo,

                          statW: stat_0_white,
                          statB: stat_0_black,
                          displayMode: 2,
                        });

                        chrome.runtime.sendMessage({
                          type: "FROM_CONTENT",
                          result: {
                            whiteAccuracy: result.whiteAccuracy,
                            whiteElo: result.whiteElo,
                            blackAccuracy: result.blackAccuracy,
                            blackElo: result.blackElo,
                          },
                        });
                      }

                      if (config.moveClassification) {
                        const classification_ = result.classificationName;
                        const svg = classificationSVG[classification_];
                        placeSVGOnBoard(
                          getSide(),
                          result.moveLan.slice(2),
                          svg,
                        );
                      }
                    }
                  });
              }
            }
            const whiteElo = getElo(getSide())?.white || null;
            const blackElo = getElo(getSide())?.black || null;

            // fen
            chrome.runtime.sendMessage({ type: "FROM_CONTENT", fen: fen_ });
            clearHighlightSquares();

            if (
              (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
              (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
            ) {
              engine.getMovesByFen(fen_, getSide()).then((moves) => {
                chrome.runtime.sendMessage({
                  type: "FROM_CONTENT",
                  data: moves,
                });
                keyMove = moves;

                if (config.autoMove) {
                  if (config.autoMoveBalanced) {
                    const moveBalanced = extractNormalMove(moves, getSide());
                    requestMove(moveBalanced.from, moveBalanced.to);
                  } else {
                    requestMove(moves[0].from, moves[0].to);
                  }
                }
                if (moves.length > 0 && evalObj) {
                  evalObj.update(moves[0].eval, getSide());
                }
                highlightMovesOnBoardChessCom(moves, getSide()[0]);
              });
            }
          }
        }

        setInterval(checkAndSendMoves, interval);

        chrome.storage.onChanged.addListener((changes, area) => {
          if (area === "local" && changes.chessConfig) {
            const oldConfig = changes.chessConfig.oldValue;
            const newConfig = changes.chessConfig.newValue;

            if (!oldConfig || oldConfig.coach !== newConfig.coach) {
              onCoachChanged(newConfig.coach);
            }

            config = newConfig;
            engine.updateConfig(
              config.lines,
              config.depth,
              config.style,
              config.elo,
            );

            clearHighlightSquares();

            if (
              (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
              (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
            ) {
              engine.getMovesByFen(fen_, getSide()).then((moves) => {
                chrome.runtime.sendMessage({
                  type: "FROM_CONTENT",
                  data: moves,
                });
                keyMove = moves;

                if (config.autoMove) {
                  if (config.autoMoveBalanced) {
                    const moveBalanced = extractNormalMove(moves, getSide());
                    requestMove(moveBalanced.from, moveBalanced.to);
                  } else {
                    requestMove(moves[0].from, moves[0].to);
                  }
                }
                if (moves.length > 0 && evalObj) {
                  evalObj.update(moves[0].eval, getSide());
                }
                highlightMovesOnBoardChessCom(moves, getSide()[0]);
              });
            }
          }
        });
      }

      if (window.location.host === "lichess.org") {
        chrome.runtime.sendMessage({ type: "ATTACH_DEBUGGER" }, (res) => {
          if (res?.success) {
            let ok = true;
          }
        });

        function getElo(side) {
          const ratings = document.querySelectorAll("rating");
          if (ratings.length < 2) return null;

          const topElo = parseInt(ratings[0].innerText, 10);
          const bottomElo = parseInt(ratings[1].innerText, 10);

          if (side.toLowerCase() === "white") {
            return { white: bottomElo, black: topElo };
          } else if (side.toLowerCase() === "black") {
            return { white: topElo, black: bottomElo };
          } else {
            return null;
          }
        }

        function getSide() {
          const board = document.querySelector(".cg-wrap");
          if (!board) return "white"; // si le plateau n'est pas trouvé

          if (board.classList.contains("orientation-black")) {
            return "black";
          } else if (board.classList.contains("orientation-white")) {
            return "white";
          } else {
            return "white";
          }
        }

        function requestFen() {
          window.postMessage({ type: "FEN" }, "*");
        }

        async function movePiece(from, to, delay) {
          const fromSquare = from;
          const toSquare = to;
          const moveDelay = delay;

          const board = document.querySelector("cg-board");
          const rect = board.getBoundingClientRect();

          const boardInfo = {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
          };

          chrome.runtime.sendMessage({ type: "BOARD_INFO", boardInfo });

          const coordFrom = squareToPixels(fromSquare, boardInfo, getSide());
          const coordTo = squareToPixels(toSquare, boardInfo, getSide());

          await sleep(moveDelay);

          chrome.runtime.sendMessage({
            type: "DRAG_MOVE",
            fromX: coordFrom.x,
            fromY: coordFrom.y,
            toX: coordTo.x,
            toY: coordTo.y,
          });
        }

        window.onkeyup = async (e) => {
          if (e.key === config.key) {
            await movePiece(keyMove[0].from, keyMove[0].to, 0);
          }
          if (e.key === config.key2) {
            const balancedMove = extractNormalMove(keyMove, getSide());
            await movePiece(balancedMove.from, balancedMove.to, 0);
          }
        };

        /////////////////////////////////////////////   calculation /////////////////////////////////////////////
        function inject() {
          window.addEventListener("message", (event) => {
            if (config.coach < 998 && !document.querySelector("#acc-widget")) {
              statObj = createSimpleAccuracyDisplay(
                100,
                1500,
                100,
                1500,
                getSide(),
              );
            }

            if (
              (config.coach === 999 && document.querySelector("#acc-widget")) ||
              (config.onlyShowEval && document.querySelector("#acc-widget"))
            ) {
              statObj = null;
              document.querySelector("#acc-widget").remove();
            }

            if (event.source !== window) return;
            if (event.data && event.data.type === "FEN_RESPONSE") {
              let fenTemp = event.data.fen;

              if (lichessFenHistory.length > 0) {
                fenTemp = lichessFenHistory.at(-1);
                window.postMessage({ type: "stop" }, "*");
              }

              if (fenTemp !== fen_) {
                fen_ = fenTemp;
                chrome.runtime.sendMessage({ type: "FROM_CONTENT", fen: fen_ });

                clearHighlightSquares();

                if (
                  (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
                  (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
                ) {
                  engine.getMovesByFen(fen_, getSide()).then(async (moves) => {
                    highlightMovesOnBoardLichess(moves, getSide()[0]);
                    keyMove = moves;
                    if (moves.length > 0 && evalObj) {
                      evalObj.update(moves[0].eval, getSide());
                    }

                    if (moves.length > 0 && config.autoMove) {
                      if (config.autoMoveBalanced) {
                        const balancedMove = extractNormalMove(
                          moves,
                          getSide(),
                        );
                        await movePiece(
                          balancedMove.from,
                          balancedMove.to,
                          randomIntBetween(0, config.delay),
                        );
                      } else {
                        await movePiece(
                          moves[0].from,
                          moves[0].to,
                          randomIntBetween(0, config.delay),
                        );
                      }
                    }

                    chrome.runtime.sendMessage({
                      type: "FROM_CONTENT",
                      data: moves,
                    });
                  });
                }
              }
            }
          });
        }

        inject();

        setInterval(() => {
          if (document.querySelector("#user_tag")) {
            userName = document.querySelector("#user_tag").innerText;
          }

          if (!config.showEval && document.querySelector("#customEval")) {
            document.querySelector("#customEval").remove();
            // customEval = null;
            evalObj = null;
          }

          if (!document.querySelector("#customEval") && config.showEval) {
            const boardContainer = document.querySelector("cg-container");
            if (boardContainer) {
              evalObj = createEvalBarLichess("0.0", getSide());
              // customEval = document.querySelector("#customEval");
            }
          }

          if (config.autoStart) {
            const startNewGameBtn =
              document.querySelector(".fbt.new-opponent") || null;
            if (startNewGameBtn) {
              startNewGameBtn.click();
              startNewGameBtn.remove();
            }
          }

          if (config.floatingBtn) {
            if (!document.getElementById("rederic-float-wrap")) {
              const wrap = document.createElement("div");
              wrap.id = "rederic-float-wrap";

              Object.assign(wrap.style, {
                position: "fixed",
                right: "18px",
                bottom: "18px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                zIndex: "999999",
              });

              const makeBtn = (label, variant) => {
                const btn = document.createElement("button");
                btn.textContent = label;

                const isBest = variant === "best";
                Object.assign(btn.style, {
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(4px)",
                  background: isBest
                    ? "rgba(74,124,31,0.15)"
                    : "rgba(0,0,0,0.05)",
                  border: isBest
                    ? "1px solid #4a7c1f"
                    : "1px solid rgba(74,124,31,0.3)",
                  color: isBest ? "#4a7c1f" : "#7a7060",
                });

                btn.onmouseenter = () =>
                  Object.assign(btn.style, {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                  });
                btn.onmouseleave = () =>
                  Object.assign(btn.style, {
                    transform: "translateY(0)",
                    boxShadow: "none",
                  });

                return btn;
              };

              const playBest = makeBtn("Play Best", "best");
              const playBalanced = makeBtn("Play Balanced", "balanced");

              playBest.onclick = () => {
                console.log("playBest clicked");
                movePiece(keyMove[0].from, keyMove[0].to, 0);
              };

              playBalanced.onclick = () => {
                const balancedMove = extractNormalMove(keyMove, getSide());
                movePiece(balancedMove.from, balancedMove.to, 0);
              };

              wrap.append(playBest, playBalanced);
              document.body.appendChild(wrap);
            }
          } else {
            document.getElementById("rederic-float-wrap")?.remove();
          }

          requestFen();
        }, interval);

        chrome.storage.onChanged.addListener((changes, area) => {
          if (area === "local" && changes.chessConfig) {
            const oldConfig = changes.chessConfig.oldValue;
            const newConfig = changes.chessConfig.newValue;

            if (!oldConfig || oldConfig.coach !== newConfig.coach) {
              onCoachChanged(newConfig.coach);
            }

            config = newConfig;
            engine.updateConfig(
              config.lines,
              config.depth,
              config.style,
              config.elo,
            );

            clearHighlightSquares();
            if (
              (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
              (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
            ) {
              engine.getMovesByFen(fen_, getSide()).then(async (moves) => {
                highlightMovesOnBoardLichess(moves, getSide()[0]);
                keyMove = moves;
                if (moves.length > 0 && evalObj) {
                  evalObj.update(moves[0].eval, getSide());
                }

                if (moves.length > 0 && config.autoMove) {
                  if (config.autoMoveBalanced) {
                    const balancedMove = extractNormalMove(moves, getSide());
                    await movePiece(
                      balancedMove.from,
                      balancedMove.to,
                      randomIntBetween(0, config.delay),
                    );
                  } else {
                    await movePiece(
                      moves[0].from,
                      moves[0].to,
                      randomIntBetween(0, config.delay),
                    );
                  }
                }
                chrome.runtime.sendMessage({
                  type: "FROM_CONTENT",
                  data: moves,
                });
              });
            }
          }
        });

        chrome.runtime.onMessage.addListener(async (message, sender) => {
          if (message.type === "history") {
            lichessFenHistory = message.data;
            let uciH_ = message.uci;
            let last = message.last;

            clearHint();

            const whiteElo_ = getElo(getSide())?.white || 3200;
            const blackElo_ = getElo(getSide())?.black || 3200;

            if (coach) {
              coach
                .getChat(uciH_, getSide(), whiteElo_, blackElo_)
                .then((result) => {
                  // console.log(result);
                  const urlAudio_ = result.urlAudio;

                  if (config.speach) {
                    playAudio(result.urlAudio);
                  }

                  if (statObj) {
                    statObj.update({
                      side: getSide(),
                      whiteAcc: result.whiteAccuracy,
                      blackAcc: result.blackAccuracy,

                      whiteElo: result.whiteElo,
                      blackElo: result.blackElo,

                      statW: stat_0_white,
                      statB: stat_0_black,
                      displayMode: 2,
                    });

                    chrome.runtime.sendMessage({
                      type: "FROM_CONTENT",
                      result: {
                        whiteAccuracy: result.whiteAccuracy,
                        whiteElo: result.whiteElo,
                        blackAccuracy: result.blackAccuracy,
                        blackElo: result.blackElo,
                      },
                    });
                  }

                  if (config.moveClassification) {
                    const classification_ = result.classificationName;

                    const svg = classificationSVG[classification_];

                    placeSVGOnBoard(getSide(), result.moveLan.slice(2), svg);
                  }
                });
            }
          }
        });
      }

      if (window.location.host === "worldchess.com") {
        chrome.runtime.sendMessage({ type: "ATTACH_DEBUGGER" }, (res) => {
          if (res?.success) {
            let ok = true;
          }
        });

        function getElo(side) {
          const allPlayerInfo = document.querySelectorAll(
            '[data-component="GamePlayerInfo"]',
          );
          if (allPlayerInfo.length < 2) return null;

          const extractElo = (text) => {
            const match = text.match(/\n(\d+)$/);
            return match ? parseInt(match[1], 10) : null;
          };

          const topElo = extractElo(allPlayerInfo[0].innerText);
          const bottomElo = extractElo(allPlayerInfo[1].innerText);

          if (side.toLowerCase() === "white") {
            return { white: bottomElo, black: topElo };
          } else if (side.toLowerCase() === "black") {
            return { white: topElo, black: bottomElo };
          } else {
            return null;
          }
        }

        function getSide() {
          const cgBoard = document.querySelector("cg-board");
          let side = "white";

          if (cgBoard) {
            const indicator = cgBoard.style.transform; // "rotate(180)"
            if (indicator === "rotate(180deg)") {
              side = "black";
            }
            if (indicator === "rotate(0deg)") {
              side = "white";
            }
          }

          return side;
        }

        async function movePiece(from, to, delay) {
          const fromSquare = from;
          const toSquare = to;
          const moveDelay = delay;

          const board = document.querySelector("cg-board");
          const rect = board.getBoundingClientRect();

          const boardInfo = {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
          };

          chrome.runtime.sendMessage({ type: "BOARD_INFO", boardInfo });

          const coordFrom = squareToPixels(fromSquare, boardInfo, getSide());
          const coordTo = squareToPixels(toSquare, boardInfo, getSide());

          await sleep(moveDelay);

          chrome.runtime.sendMessage({
            type: "DRAG_MOVE",
            fromX: coordFrom.x,
            fromY: coordFrom.y,
            toX: coordTo.x,
            toY: coordTo.y,
          });
        }

        window.onkeyup = async (e) => {
          if (e.key === config.key) {
            movePiece(keyMove[0].from, keyMove[0].to, 0);
          }
          if (e.key === config.key2) {
            const balancedMove = extractNormalMove(keyMove, getSide());
            movePiece(balancedMove.from, balancedMove.to, 0);
          }
        };

        setInterval(async () => {

          if (config.floatingBtn) {
            if (!document.getElementById("rederic-float-wrap")) {
              const wrap = document.createElement("div");
              wrap.id = "rederic-float-wrap";

              Object.assign(wrap.style, {
                position: "fixed",
                right: "18px",
                bottom: "18px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                zIndex: "999999",
              });

              const makeBtn = (label, variant) => {
                const btn = document.createElement("button");
                btn.textContent = label;

                const isBest = variant === "best";
                Object.assign(btn.style, {
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(4px)",
                  background: isBest
                    ? "rgba(74,124,31,0.15)"
                    : "rgba(0,0,0,0.05)",
                  border: isBest
                    ? "1px solid #4a7c1f"
                    : "1px solid rgba(74,124,31,0.3)",
                  color: isBest ? "#4a7c1f" : "#7a7060",
                });

                btn.onmouseenter = () =>
                  Object.assign(btn.style, {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                  });
                btn.onmouseleave = () =>
                  Object.assign(btn.style, {
                    transform: "translateY(0)",
                    boxShadow: "none",
                  });

                return btn;
              };

              const playBest = makeBtn("Play Best", "best");
              const playBalanced = makeBtn("Play Balanced", "balanced");

              playBest.onclick = () => {
                console.log("playBest clicked");
                movePiece(keyMove[0].from, keyMove[0].to, 0);
              };

              playBalanced.onclick = () => {
                const balancedMove = extractNormalMove(keyMove, getSide());
                movePiece(balancedMove.from, balancedMove.to, 0);
              };

              wrap.append(playBest, playBalanced);
              document.body.appendChild(wrap);
            }
          } else {
            document.getElementById("rederic-float-wrap")?.remove();
          }

          if (config.coach < 998 && !document.querySelector("#acc-widget")) {
            statObj = createSimpleAccuracyDisplay(
              100,
              1500,
              100,
              1500,
              getSide(),
            );
          }

          if (
            config.coach === 999 &&
            document.querySelector("#acc-widget") &&
            config.coach === 999 &&
            document.querySelector("#acc-widget")
          ) {
            statObj = null;
            document.querySelector("#acc-widget").remove();
          }

          if (!document.querySelector("#customEval") && config.showEval) {
            const boardContainer = document.querySelector("cg-board");
            if (boardContainer) {
              evalObj = createEvalBarWorld("0.0", getSide());
            }
          }

          if (config.autoStart) {
            const startBtn = document.querySelector("#newGame");
            if (startBtn && startBtn.children[0]) {
              if (startBtn.children[0].innerText.length >= 1) {
                startBtn.click();
              }
            }
          }

          if (fen_ && fen_ !== currentFen) {
            currentFen = fen_;
            chrome.runtime.sendMessage({ type: "FROM_CONTENT", fen: fen_ });

            clearHighlightSquares();

            if (!config.showEval && document.querySelector("#customEval")) {
              document.querySelector("#customEval").remove();
              evalObj = null;
            }

            if (
              (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
              (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
            ) {
              engine.getMovesByFen(fen_, getSide()).then((moves) => {
                keyMove = moves;

                chrome.runtime.sendMessage({
                  type: "FROM_CONTENT",
                  data: moves,
                });
                highlightMovesOnBoardWorld(moves, getSide()[0]);

                if (moves.length > 0 && evalObj) {
                  evalObj.update(moves[0].eval, getSide());
                }

                if (moves.length > 0 && config.autoMove) {
                  if (config.autoMoveBalanced) {
                    const balancedMove = extractNormalMove(moves, getSide());
                    movePiece(
                      balancedMove.from,
                      balancedMove.to,
                      randomIntBetween(0, config.delay),
                    );
                  } else {
                    movePiece(
                      moves[0].from,
                      moves[0].to,
                      randomIntBetween(0, config.delay),
                    );
                  }
                }
              });
            }
          }
        }, interval);

        chrome.storage.onChanged.addListener((changes, area) => {
          if (area === "local" && changes.chessConfig) {
            const oldConfig = changes.chessConfig.oldValue;
            const newConfig = changes.chessConfig.newValue;

            if (!oldConfig || oldConfig.coach !== newConfig.coach) {
              onCoachChanged(newConfig.coach);
            }

            config = newConfig;
            engine.updateConfig(
              config.lines,
              config.depth,
              config.style,
              config.elo,
            );

            clearHighlightSquares();
            if (
              (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
              (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
            ) {
              engine.getMovesByFen(fen_, getSide()).then((moves) => {
                keyMove = moves;

                chrome.runtime.sendMessage({
                  type: "FROM_CONTENT",
                  data: moves,
                });
                highlightMovesOnBoardWorld(moves, getSide()[0]);

                if (moves.length > 0 && evalObj) {
                  evalObj.update(moves[0].eval, getSide());
                }

                if (moves.length > 0 && config.autoMove) {
                  if (config.autoMoveBalanced) {
                    const balancedMove = extractNormalMove(moves, getSide());
                    movePiece(
                      balancedMove.from,
                      balancedMove.to,
                      randomIntBetween(0, config.delay),
                    );
                  } else {
                    movePiece(
                      moves[0].from,
                      moves[0].to,
                      randomIntBetween(0, config.delay),
                    );
                  }
                }
              });
            }
          }
        });

        chrome.runtime.onMessage.addListener(async (message, sender) => {
          if (message.type === "history") {
            clearHint();
            const whiteElo = getElo(getSide())?.white || null;
            const blackElo = getElo(getSide())?.black || null;

            const whiteElo_ = getElo(getSide())?.white || 3200;
            const blackElo_ = getElo(getSide())?.black || 3200;

            const uci__ = message.uci;

            if (coach) {
              coach
                .getChat(uci__, getSide(), whiteElo, blackElo)
                .then((result) => {
                  if (config.speach) {
                    chessComAudio.src = result.urlAudio;
                    chessComAudio.play();
                  }

                  if (statObj) {
                    statObj.update({
                      side: getSide(),
                      whiteAcc: result.whiteAccuracy,
                      blackAcc: result.blackAccuracy,

                      whiteElo: result.whiteElo,
                      blackElo: result.blackElo,

                      statW: stat_0_white,
                      statB: stat_0_black,
                      displayMode: 2,
                    });
                    chrome.runtime.sendMessage({
                      type: "FROM_CONTENT",
                      result: {
                        whiteAccuracy: result.whiteAccuracy,
                        whiteElo: result.whiteElo,
                        blackAccuracy: result.blackAccuracy,
                        blackElo: result.blackElo,
                      },
                    });
                  }

                  if (config.moveClassification) {
                    const classification_ = result.classificationName;
                    const svg = classificationSVG[classification_];
                    placeSVGOnBoard(getSide(), result.moveLan.slice(2), svg);
                  }
                });
            }

            let fenHistory = message.data;
            if (fenHistory.length > 0) {
              fen_ = fenHistory.at(-1);
            }
          }
        });
      }
    };

    start();
  })();
});
