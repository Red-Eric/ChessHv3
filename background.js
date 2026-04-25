importScripts("./lib/chess_min.js")

function getStartFEN(fen) {
  const board = fen.split(" ")[0];
  const rows = board.split("/");

  const blackBackRank = rows[0];
  const whiteBackRank = blackBackRank.toUpperCase();

  return `${blackBackRank}/pppppppp/8/8/8/8/PPPPPPPP/${whiteBackRank} w KQkq - 0 1`;
}

const game = Chess();

function pgnToFenArray(pgn) {
  const fenTag = pgn.match(/\[FEN\s+"([^"]+)"\]/);
  const initialFen = fenTag ? fenTag[1] : undefined;

  game.reset();
  if (initialFen) game.load(initialFen);

  const success = game.load_pgn(pgn);
  if (!success) {
    throw new Error("PGN invalide");
  }

  const moves = game.history({ verbose: true });

  game.reset();
  if (initialFen) game.load(initialFen);

  const fenArray = [game.fen()];

  for (let move of moves) {
    game.move(move);
    fenArray.push(game.fen());
  }

  return fenArray;
}

function pgnToUciString(pgn) {
  const fenTag = pgn.match(/\[FEN\s+"([^"]+)"\]/);
  const startFen = fenTag ? fenTag[1] : null;

  const game = new Chess();

  if (startFen) {
    game.load(startFen);
  } else {
    game.reset();
  }

  const success = game.load_pgn(pgn);
  if (!success) {
    throw new Error("PGN invalide");
  }

  const moves = game.history({ verbose: true });

  const uciMoves = moves.map(m => {
    // roque
    if (m.flags.includes("k")) {
      return m.color === "w" ? "e1g1" : "e8g8";
    }
    if (m.flags.includes("q")) {
      return m.color === "w" ? "e1c1" : "e8c8";
    }

    // promotion
    if (m.promotion) {
      return `${m.from}${m.to}${m.promotion}`;
    }

    // normal + en passant inclus automatiquement
    return `${m.from}${m.to}`;
  });

  const positionPart = startFen
    ? `position fen ${startFen}`
    : `position startpos`;

  return `${positionPart} moves ${uciMoves.join(" ")}`;
}

let popupTabs = [];

function sendConfigToSite(type, config, urlPattern) {
  chrome.tabs.query({ url: urlPattern }, (tabs) => {
    for (let tab of tabs) {
      chrome.tabs.sendMessage(tab.id, { type, config });
    }
  });
}

function sendMovesToSite(type, moves, urlPattern) {
  chrome.tabs.query({ url: urlPattern }, (tabs) => {
    for (let tab of tabs) {
      chrome.tabs.sendMessage(tab.id, { type, moves });
    }
  });
}

// Stockage global des listeners par tabId
const activeListeners = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!sender.tab || !sender.tab.id) return;
  const tabId = sender.tab.id;
  if (message.type === "ATTACH_DEBUGGER") {
    chrome.tabs.get(tabId, async (tab) => {
      if (!tab || !tab.url) {
        sendResponse({ success: false, error: "No tab URL" });
        return;
      }

      const urlTab = new URL(tab.url);
      const host = urlTab.hostname;

      const allowedDomains = ["lichess.org", "worldchess.com"];
      if (!allowedDomains.includes(host)) {
        sendResponse({ success: false, error: "Domain not allowed" });
        return;
      }

      let TARGET = "";
      let BREAK_SEARCH = "";

      if (host === "lichess.org") {
        TARGET = "this.onMove=(e,t,s)=>{s||this.enpassant(e,t)";
        BREAK_SEARCH = "s||";
      }

      if (host === "worldchess.com") {
        TARGET =
          'e.on("history",(i,n)=>{if(i.length===n.length){this.clearPremoves();';
        BREAK_SEARCH = "if(i.length===n.length";
      }

      let breakpointId = null;

      async function trySetBreakpoint(url) {
        try {
          const res = await fetch(url);
          const code = await res.text();

          const index = code.indexOf(TARGET);
          if (index === -1) return false;

          const before = code.slice(0, index);
          const lineNumber = before.split("\n").length - 1;
          const columnNumber =
            before.split("\n").pop().length + TARGET.indexOf(BREAK_SEARCH);

          const bpRes = await new Promise((resolve) => {
            chrome.debugger.sendCommand(
              { tabId },
              "Debugger.setBreakpointByUrl",
              { url, lineNumber, columnNumber },
              resolve,
            );
          });

          if (bpRes && bpRes.breakpointId) {
            breakpointId = bpRes.breakpointId;
            return true;
          }
        } catch (e) {
        }
        return false;
      }

      if (activeListeners[tabId]) {
        chrome.debugger.onEvent.removeListener(
          activeListeners[tabId].scriptParsed,
        );
        chrome.debugger.onEvent.removeListener(
          activeListeners[tabId].debuggerEvent,
        );
        delete activeListeners[tabId];
      }

      chrome.debugger.detach({ tabId }, () => {
        chrome.debugger.attach({ tabId }, "1.3", async () => {
          if (chrome.runtime.lastError) {
            sendResponse({
              success: false,
              error: chrome.runtime.lastError.message,
            });
            return;
          }

          await chrome.debugger.sendCommand({ tabId }, "Debugger.enable");

          let urls = [];
          try {
            const results = await chrome.scripting.executeScript({
              target: { tabId },
              func: () =>
                [...document.scripts].map((s) => s.src).filter(Boolean),
            });
            urls = results[0]?.result || [];
          } catch (err) {
            console.error(err);
          }

          let found = false;
          for (const url of urls) {
            if (await trySetBreakpoint(url)) {
              found = true;
              break;
            }
          }

          if (!found) console.log("");

          const scriptParsedListener = async (source, method, params) => {
            if (source.tabId !== tabId) return;
            if (method !== "Debugger.scriptParsed") return;
            if (!params.url) return;

            const newBp = await trySetBreakpoint(params.url);
            if (newBp) {
            }
          };

          const debuggerEventListener = async (source, method, params) => {
            if (source.tabId !== tabId) return;
            if (method !== "Debugger.paused") return;

            if (
              !params.hitBreakpoints ||
              !breakpointId ||
              !params.hitBreakpoints.includes(breakpointId)
            ) {
              chrome.debugger.sendCommand(source, "Debugger.resume");
              return;
            }

            if (!params.callFrames || params.callFrames.length === 0) {
              chrome.debugger.sendCommand(source, "Debugger.resume");
              return;
            }

            try {
              if (host === "lichess.org") {
                const evalRes = await chrome.debugger.sendCommand(
                  source,
                  "Debugger.evaluateOnCallFrame",
                  {
                    callFrameId: params.callFrames[0].callFrameId,
                    expression: "this.data.steps",
                    returnByValue: true,
                  },
                );

                const evalRes2 = await chrome.debugger.sendCommand(
                  source,
                  "Debugger.evaluateOnCallFrame",
                  {
                    callFrameId: params.callFrames[0].callFrameId,
                    expression: "({ e, t })",
                    returnByValue: true,
                  },
                );

                const { e, t } = evalRes2.result.value;
                const lastMove = e + t;
                const movesHistory = evalRes.result?.value || [];
                let fenhistory = [];

                let uciHistory = `position fen ${movesHistory[0]?.fen ?? ""} moves`;

                

                if (movesHistory.length > 0) {
                  game.load(movesHistory[0].fen);

                  for (let i = 1; i < movesHistory.length; i++) {
                    const move = movesHistory[i].san || movesHistory[i].uci;
                    if (!move) continue;
                    const result = game.move(move, { sloppy: true });
                    if (!result)
                      console.error(
                        "Impossible de jouer le coup:",
                        move,
                        "index",
                        i,
                      );
                  }

                  game.move(lastMove, { sloppy: true });
                  game.header(
                    "Variant",
                    "Chess960",
                    "SetUp",
                    "1",
                    "FEN",
                    movesHistory[0].fen,
                  );

                  fenhistory = pgnToFenArray(game.pgn());
                  uciHistory = pgnToUciString(game.pgn());

                


                  chrome.tabs.query({}, (tabs) => {
                    for (const tab of tabs) {
                      if (tab.url && tab.url.includes("lichess")) {
                        chrome.tabs.sendMessage(tab.id, {
                          type: "history",
                          data: fenhistory,
                          uci: uciHistory,
                          last: lastMove,
                        });
                      }
                    }
                  });
                }
              }

              if (host === "worldchess.com") {
                const evalRes = await chrome.debugger.sendCommand(
                  source,
                  "Debugger.evaluateOnCallFrame",
                  {
                    callFrameId: params.callFrames[0].callFrameId,
                    expression: "i",
                    returnByValue: true,
                  },
                );

                const movesHistory = evalRes.result?.value || [];
                const fenhistory = [];
                const fenInit = movesHistory[0].fen;
                const startFen = getStartFEN(fenInit);

                game.load(startFen);
                fenhistory.push(game.fen());

                movesHistory.forEach((e) => {
                  game.move(e.lan, { sloppy: true });
                  fenhistory.push(game.fen());
                });
                game.header(
                  "Variant",
                  "Chess960",
                  "SetUp",
                  "1",
                  "FEN",
                  startFen,
                );

                let uciHistory = pgnToUciString(game.pgn())

                chrome.tabs.query({}, (tabs) => {
                  for (const tab of tabs) {
                    if (tab.url && tab.url.includes("worldchess")) {
                      chrome.tabs.sendMessage(tab.id, {
                        type: "history",
                        data: fenhistory,
                        uci : uciHistory
                      });
                    }
                  }
                });
              }
            } catch (e) {
              console.error(e);
            } finally {
              chrome.debugger.sendCommand(source, "Debugger.resume");
            }
          };

          activeListeners[tabId] = {
            scriptParsed: scriptParsedListener,
            debuggerEvent: debuggerEventListener,
          };

          chrome.debugger.onEvent.addListener(scriptParsedListener);
          chrome.debugger.onEvent.addListener(debuggerEventListener);

          sendResponse({ success: true });
        });
      });
    });

    return true;
  }

  if (message.type === "DETACH_DEBUGGER") {
    if (activeListeners[tabId]) {
      chrome.debugger.onEvent.removeListener(
        activeListeners[tabId].scriptParsed,
      );
      chrome.debugger.onEvent.removeListener(
        activeListeners[tabId].debuggerEvent,
      );
      delete activeListeners[tabId];
    }

    chrome.debugger.detach({ tabId }, () => {
      if (chrome.runtime.lastError) {
        sendResponse({
          success: false,
          error: chrome.runtime.lastError.message,
        });
        return;
      }

      // console.log("Debugger detached from tab", tabId);
      sendResponse({ success: true });
    });

    return true;
  }
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type !== "DRAG_MOVE") return;

  const { fromX, fromY, toX, toY } = message;

  const tabs = await chrome.tabs.query({});

  const allowedDomains = ["lichess.org", "worldchess.com"];
  const targetTabs = tabs.filter((tab) => {
    if (!tab.url) return false;
    const url = new URL(tab.url);
    return allowedDomains.includes(url.hostname);
  });

  for (const tab of targetTabs) {
    const tabId = tab.id;

    if (!tabId) continue;

    await sendMouseEvent(tabId, {
      type: "mousePressed",
      x: fromX,
      y: fromY,
      button: "left",
      clickCount: 1,
    });

    const steps = 10;
    for (let i = 1; i <= steps; i++) {
      const x = fromX + (toX - fromX) * (i / steps);
      const y = fromY + (toY - fromY) * (i / steps);
      await sendMouseEvent(tabId, { type: "mouseMoved", x, y, button: "left" });
    }

    await sendMouseEvent(tabId, {
      type: "mouseReleased",
      x: toX,
      y: toY,
      button: "left",
      clickCount: 1,
    });
  }
});

function sendMouseEvent(tabId, params) {
  return new Promise((resolve, reject) => {
    chrome.debugger.sendCommand(
      { tabId },
      "Input.dispatchMouseEvent",
      params,
      (res) => {
        if (chrome.runtime.lastError) return reject(chrome.runtime.lastError);
        resolve(res);
      },
    );
  });
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "stream") {
    chrome.windows.create({
      url: chrome.runtime.getURL("dist/index.html"),
      type: "popup",
      state: "maximized",
    });
  }
  
});


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'FETCH_AUDIO') {
    fetch(msg.url)
      .then(r => r.arrayBuffer())
      .then(buffer => {
        sendResponse({ buffer: Array.from(new Uint8Array(buffer)) });
      })
      .catch(err => sendResponse({ error: err.message }));
    return true;
  }
});