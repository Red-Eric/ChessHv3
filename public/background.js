// background.js
let currentConfig = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "config") {
    currentConfig = message.config;
    console.log("Config reçue dans background :", currentConfig);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      for (let tab of tabs) {
        chrome.tabs.sendMessage(tab.id, { type: "config", config: currentConfig });
      }
    });
  }
});