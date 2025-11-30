let currentConfig = null;
let currentConfig2 = null;
///////////////////////////////////////////////////////////////////////////////////////////////////////


// YYYY - MM -DD
const expirationDate = "2026-01-01";
const timeAPI =
  "https://api.timezonedb.com/v2.1/list-time-zone?key=WPOK8LWQNYUI&format=json&country=FR";

////////////////////////////////////////////////////////////////////////////////////////////////////////



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

      for (let tabId of popupTabs) {
        chrome.tabs.sendMessage(tabId, { type: "config", config: currentConfig });
      }
      break;

    case "config2":
      currentConfig2 = message.config;
      console.log("Config Lichess reçue :", currentConfig2);

      sendConfigToSite("config2", currentConfig2, "*://*.lichess.org/*");
      sendConfigToSite("config2", currentConfig2, "*://*.worldchess.com/*");
      sendConfigToSite("config2", currentConfig2, "*://worldchess.com/*");
      sendConfigToSite("config2", currentConfig2, "*://worldchess.com/game/*");
      sendConfigToSite("config2", currentConfig2, "*://*.worldchess.com/game/*");


      for (let tabId of popupTabs) {
        chrome.tabs.sendMessage(tabId, { type: "config2", config: currentConfig2 });
      }
      break;

    case "checkExpiration":
      fetch(timeAPI)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          const timestamp = data?.zones?.[0]?.timestamp;
          const serverDate = timestamp ? new Date(timestamp * 1000) : new Date();
          const expiryDate = new Date(expirationDate);
          sendResponse({ expired: serverDate >= expiryDate });
        })
        .catch((err) => {
          console.error("Erreur API expiration :", err);
          sendResponse({ expired: true });
        });
      return true;

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
      console.log("Popup fullscreen créée", newWindow);

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


/// ServerSide engine

function sendFENToServer(fen) {
  fetch("http://localhost:8080/api/", {
    method: "POST",
    body: fen,
    headers: {
      "Content-Type": "text/plain"
    }
  })
    .then(res => res.json())
    .then(bestMoves => {
      console.log("Best moves:", bestMoves);

      // Envoie à content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {
            type: "komodo",
            data: bestMoves
          });
          console.log("Data sent to content script");
        }
      });
    })
    .catch(err => {
      console.error("Erreur HTTP:", err);
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "chess.com_fen") {
    console.log("Sending FEN to server:", message.data);
    sendFENToServer(message.data);
  }
});


// function simulateClick(tabId, x, y) {
//   chrome.debugger.sendCommand(
//     {tabId},
//     "Input.dispatchMouseEvent",
//     {
//       type: "mousePressed",
//       x: x,
//       y: y,
//       button: "left",
//       clickCount: 1   
//     },
//     () => {
//       chrome.debugger.sendCommand(
//         {tabId},
//         "Input.dispatchMouseEvent",
//         {
//           type: "mouseReleased",
//           x: x,
//           y: y,
//           button: "left",
//           clickCount: 1
//         }
//       );
//     }
//   );
// }

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status !== "complete") return;

//   if (tab.url && tab.url.startsWith("https://lichess.org")) {
//     chrome.debugger.attach({ tabId }, "1.3", () => {
//       if (chrome.runtime.lastError) {
//         console.log("Attach error:", chrome.runtime.lastError.message);
//         return;
//       }

//       console.log("Debugger attach -> lichess.org");
//       console.log(tabId);
//     });
//   }
// });

