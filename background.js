let currentConfig = null;
let currentConfig2 = null;

let popupTabs = [];

function sendConfigToSite(type, config, urlPattern) {
  chrome.tabs.query({ url: urlPattern }, (tabs) => {
    for (let tab of tabs) {
      chrome.tabs.sendMessage(tab.id, { type, config });
    }
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "config":
      currentConfig = message.config;

      sendConfigToSite("config", currentConfig, "*://*.chess.com/*");
      sendConfigToSite("config", currentConfig, "*://*.lichess.org/*");
      sendConfigToSite("config", currentConfig, "*://*.worldchess.com/*");
      sendConfigToSite("config", currentConfig, "*://worldchess.com/*");
      sendConfigToSite("config", currentConfig, "*://worldchess.com/game/*");
      sendConfigToSite("config", currentConfig, "*://*.worldchess.com/game/*");

      for (let tabId of popupTabs) {
        chrome.tabs.sendMessage(tabId, {
          type: "config",
          config: currentConfig,
        });
      }
      break;

    case "FROM_CONTENT":
      for (let tabId of popupTabs) {
        chrome.tabs.sendMessage(tabId, {
          type: "TO_POPUP",
          data: message.data,
        });
      }
      break;

    case "popupReady":
      if (sender.tab?.id) {
        if (!popupTabs.includes(sender.tab.id)) popupTabs.push(sender.tab.id);

        if (currentConfig) {
          chrome.tabs.sendMessage(sender.tab.id, {
            type: "config",
            config: currentConfig,
          });
        }
        if (currentConfig2) {
          chrome.tabs.sendMessage(sender.tab.id, {
            type: "config2",
            config: currentConfig2,
          });
        }
      }
      break;
  }
});

let popupWindowId = null;

chrome.action.onClicked.addListener(() => {
  if (popupWindowId) {
    chrome.windows.update(popupWindowId, { focused: true });
    return;
  }

  chrome.windows.create(
    {
      url: "popup/index.html",
      type: "popup",
      state: "fullscreen",
    },
    (newWindow) => {
      popupWindowId = newWindow.id;

      const tab = newWindow.tabs?.[0];
      if (tab?.id) {
        const tabId = tab.id;
        if (!popupTabs.includes(tabId)) popupTabs.push(tabId);

        if (currentConfig)
          chrome.tabs.sendMessage(tabId, {
            type: "config",
            config: currentConfig,
          });
        if (currentConfig2)
          chrome.tabs.sendMessage(tabId, {
            type: "config2",
            config: currentConfig2,
          });
      }

      chrome.windows.onRemoved.addListener((id) => {
        if (id === popupWindowId) {
          popupWindowId = null;
          popupTabs = [];
        }
      });
    },
  );
});

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.action) {
    const offscreen = await chrome.offscreen.hasDocument();
    if (!offscreen) {
      await chrome.offscreen.createDocument({
        url: "offscreen.html",
        reasons: ["WORKERS"],
        justification: "Test",
      });
    }

    chrome.runtime.sendMessage({ ...msg, target: "offscreen" });
  }
});

function sendMovesToSite(type, moves, urlPattern) {
  chrome.tabs.query({ url: urlPattern }, (tabs) => {
    for (let tab of tabs) {
      chrome.tabs.sendMessage(tab.id, { type, moves });
    }
  });
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "returnContent") {
    sendMovesToSite("returnContent", msg.moves, "*://*.chess.com/*");
    sendMovesToSite("returnContent", msg.moves, "*://*.lichess.org/*");
    sendMovesToSite("returnContent", msg.moves, "*://*.worldchess.com/*");
    sendMovesToSite("returnContent", msg.moves, "*://worldchess.com/*");
    sendMovesToSite("returnContent", msg.moves, "*://worldchess.com/game/*");
    sendMovesToSite("returnContent", msg.moves, "*://*.worldchess.com/game/*");
    sendMovesToSite("returnContent", msg.moves, "*://*.chess.com/*");
  }
});


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
      const allowedDomains = ["lichess.org", "worldchess.com"];
      if (!allowedDomains.includes(urlTab.hostname)) {
        sendResponse({ success: false, error: "Domain not allowed" });
        return;
      }

      chrome.debugger.detach({ tabId }, async () => {
        chrome.debugger.attach({ tabId }, "1.3", async () => {
          if (chrome.runtime.lastError) {
            sendResponse({
              success: false,
              error: chrome.runtime.lastError.message,
            });
            return;
          }

          // Activer le debugger
          await chrome.debugger.sendCommand({ tabId }, "Debugger.enable");

          // Récupérer tous les scripts <script src> via scripting.executeScript
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
            try {
              const res = await fetch(url);
              const code = await res.text();

              const TARGET = "this.onMove=(e,t,n)=>{n||this.enpassant(e,t)";
              const index = code.indexOf(TARGET);
              if (index === -1) continue;
              found = true;
              // Calculer ligne et colonne du `n`
              const before = code.slice(0, index);
              const lineNumber = before.split("\n").length - 1;
              const columnNumber =
                before.split("\n").pop().length + TARGET.indexOf("n||");

              // Poser le breakpoint
              chrome.debugger.sendCommand(
                { tabId },
                "Debugger.setBreakpointByUrl",
                {
                  url,
                  lineNumber,
                  columnNumber,
                },
                (res) => {
                  console.log("Breakpoint posé sur n dans :", url, res);
                },
              );

              // On peut arrêter après avoir trouvé le script
              break;
            } catch (e) {
              console.log("Impossible de lire :", url, e);
            }
          }

          if (!found) console.log("Aucun script contenant this.onMove trouvé");

          // Écouter les pauses
          chrome.debugger.onEvent.addListener(
            async (source, method, params) => {
              if (method === "Debugger.paused") {
                try {
                  // Exécuter this.data.steps dans le contexte du callFrame
                  const evalRes = await chrome.debugger.sendCommand(
                    source,
                    "Debugger.evaluateOnCallFrame",
                    {
                      callFrameId: params.callFrames[0].callFrameId,
                      expression: "this.data.steps",
                      returnByValue: true,
                    },
                  );
                  console.log("this.data.steps =", evalRes.result.value);
                } catch (e) {
                  console.error(e);
                }

                // Reprendre l'exécution
                chrome.debugger.sendCommand(source, "Debugger.resume");
              }
            },
          );

          sendResponse({ success: true });
        });
      });
    });

    return true;
  } else if (message.type === "DETACH_DEBUGGER") {
    chrome.debugger.detach({ tabId }, () => {
      if (chrome.runtime.lastError) {
        sendResponse({
          success: false,
          error: chrome.runtime.lastError.message,
        });
        return;
      }
      console.log("Debugger detached from tab", tabId);
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

    // 3️⃣ Release
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
