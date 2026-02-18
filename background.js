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
      // console.log("Config Chess.com reçue :", currentConfig);

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

  // ===== ATTACH DEBUGGER =====
  if (message.type === "ATTACH_DEBUGGER") {

    chrome.debugger.attach({ tabId }, "1.3", () => {

      if (chrome.runtime.lastError) {
        console.error("Attach failed:", chrome.runtime.lastError.message);
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
        return;
      }

      console.log("Debugger attached to tab", tabId);
      sendResponse({ success: true });
    });

    return true; // obligatoire pour async sendResponse
  }

  // ===== CLICK EVENT =====
  if (message.type === "CLICK_AT") {

    chrome.debugger.sendCommand(
      { tabId },
      "Input.dispatchMouseEvent",
      {
        type: "mousePressed",
        x: message.x,
        y: message.y,
        button: "left",
        clickCount: 1
      }
    );

    chrome.debugger.sendCommand(
      { tabId },
      "Input.dispatchMouseEvent",
      {
        type: "mouseReleased",
        x: message.x,
        y: message.y,
        button: "left",
        clickCount: 1
      }
    );
  }

});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (!sender.tab || !sender.tab.id) return;
  const tabId = sender.tab.id;

  if (message.type === "DRAG_MOVE") {

    const { fromX, fromY, toX, toY } = message;

    // 1️⃣ Press
    chrome.debugger.sendCommand(
      { tabId },
      "Input.dispatchMouseEvent",
      {
        type: "mousePressed",
        x: fromX,
        y: fromY,
        button: "left",
        clickCount: 1
      }
    );

    // 2️⃣ Move (interpolation simple)
    const steps = 10;
    for (let i = 1; i <= steps; i++) {
      const x = fromX + (toX - fromX) * (i / steps);
      const y = fromY + (toY - fromY) * (i / steps);

      chrome.debugger.sendCommand(
        { tabId },
        "Input.dispatchMouseEvent",
        {
          type: "mouseMoved",
          x,
          y,
          button: "left"
        }
      );
    }

    // 3️⃣ Release
    chrome.debugger.sendCommand(
      { tabId },
      "Input.dispatchMouseEvent",
      {
        type: "mouseReleased",
        x: toX,
        y: toY,
        button: "left",
        clickCount: 1
      }
    );
  }

});
