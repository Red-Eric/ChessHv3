// background.js
let currentConfig = null;
const expirationDate = "2025-11-10";
const timeAPI =
  "https://api.timezonedb.com/v2.1/list-time-zone?key=WPOK8LWQNYUI&format=json&country=FR";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "config") {
    currentConfig = message.config;
    console.log("Config reçue dans background :", currentConfig);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      for (let tab of tabs) {
        chrome.tabs.sendMessage(tab.id, {
          type: "config",
          config: currentConfig,
        });
      }
    });
  }

  if (message.type === "config2") {
    currentConfig = message.config;
    console.log("Config reçue dans background :", currentConfig);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      for (let tab of tabs) {
        chrome.tabs.sendMessage(tab.id, {
          type: "config2",
          config: currentConfig,
        });
      }
    });
  }

  if (message.type === "checkExpiration") {
    fetch(timeAPI)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const timestamp = data?.zones?.[0]?.timestamp;
        const serverDate = timestamp ? new Date(timestamp * 1000) : new Date();
        const expiryDate = new Date(expirationDate);

        if (serverDate >= expiryDate) {
          sendResponse({ expired: true });
        } else {
          sendResponse({ expired: false });
        }
      })
      .catch((err) => {
        console.error("Erreur API expiration :", err);

        sendResponse({ expired: true });
      });

    return true;
  }



  // debug 


  if (message.type === "FROM_CONTENT") {
    // console.log("stream message")
    // console.log(message.data)
    chrome.runtime.sendMessage({ type: "TO_POPUP", data: message.data });
  }
});
