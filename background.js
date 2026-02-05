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

// (async () => {
//   await chrome.offscreen.createDocument({
//     url: "offscreen.html",
//     reasons: ["WORKERS"],
//     justification: "Test",
//   });
// })();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "config":
      currentConfig = message.config;
      // console.log("Config Chess.com reçue :", currentConfig);

      sendConfigToSite("config", currentConfig, "*://*.chess.com/*");

      for (let tabId of popupTabs) {
        chrome.tabs.sendMessage(tabId, { type: "config", config: currentConfig });
      }
      break;

    case "config2":
      currentConfig2 = message.config;

      sendConfigToSite("config2", currentConfig2, "*://*.lichess.org/*");
      sendConfigToSite("config2", currentConfig2, "*://*.worldchess.com/*");
      sendConfigToSite("config2", currentConfig2, "*://worldchess.com/*");
      sendConfigToSite("config2", currentConfig2, "*://worldchess.com/game/*");
      sendConfigToSite("config2", currentConfig2, "*://*.worldchess.com/game/*");

      for (let tabId of popupTabs) {
        chrome.tabs.sendMessage(tabId, { type: "config2", config: currentConfig2 });
      }
      break;

    case "FROM_CONTENT":
      for (let tabId of popupTabs) {
        chrome.tabs.sendMessage(tabId, { type: "TO_POPUP", data: message.data });
      }
      break;

    case "popupReady":
      if (sender.tab?.id) {
        if (!popupTabs.includes(sender.tab.id)) popupTabs.push(sender.tab.id);

        if (currentConfig) {
          chrome.tabs.sendMessage(sender.tab.id, { type: "config", config: currentConfig });
        }
        if (currentConfig2) {
          chrome.tabs.sendMessage(sender.tab.id, { type: "config2", config: currentConfig2 });
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
          chrome.tabs.sendMessage(tabId, { type: "config", config: currentConfig });
        if (currentConfig2)
          chrome.tabs.sendMessage(tabId, { type: "config2", config: currentConfig2 });
      }

      chrome.windows.onRemoved.addListener((id) => {
        if (id === popupWindowId) {
          popupWindowId = null;
          popupTabs = [];
        }
      });
    }
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

