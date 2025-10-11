// background.js
let currentConfig = null;
let currentConfig2 = null; // pour lichess
const expirationDate = "2025-11-10";
const timeAPI =
  "https://api.timezonedb.com/v2.1/list-time-zone?key=WPOK8LWQNYUI&format=json&country=FR";

// Liste des tabs popup ouverts
let popupTabs = [];

// Fonction pour envoyer config à tous les tabs du site
function sendConfigToSite(type, config, urlPattern) {
  chrome.tabs.query({ url: urlPattern }, (tabs) => {
    for (let tab of tabs) {
      chrome.tabs.sendMessage(tab.id, { type, config });
    }
  });
}

// Listener pour les messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "config":
      currentConfig = message.config;
      console.log("Config Chess.com reçue :", currentConfig);

      // Envoi aux tabs Chess.com
      sendConfigToSite("config", currentConfig, "*://*.chess.com/*");

      // Envoi aux tabs popup ouverts
      for (let tabId of popupTabs) {
        chrome.tabs.sendMessage(tabId, { type: "config", config: currentConfig });
      }
      break;

    case "config2":
      currentConfig2 = message.config;
      console.log("Config Lichess reçue :", currentConfig2);

      // Envoi aux tabs Lichess
      sendConfigToSite("config2", currentConfig2, "*://*.lichess.org/*");

      // Envoi aux tabs popup ouverts
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
      // Renvoie les coups vers la popup
      for (let tabId of popupTabs) {
        chrome.tabs.sendMessage(tabId, { type: "TO_POPUP", data: message.data });
      }
      break;

    case "popupReady":
      // Le popup se signale prêt
      if (sender.tab?.id) {
        if (!popupTabs.includes(sender.tab.id)) popupTabs.push(sender.tab.id);

        // Envoi immédiat des configs si disponibles
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

// Création du popup fullscreen
chrome.action.onClicked.addListener(() => {
  chrome.windows.create(
    {
      url: "popup/index.html",
      type: "popup",
      state: "fullscreen",
    },
    (newWindow) => {
      console.log("Popup fullscreen créée", newWindow);
      if (newWindow?.tabs?.[0]?.id) {
        const tabId = newWindow.tabs[0].id;
        if (!popupTabs.includes(tabId)) popupTabs.push(tabId);

        // Envoi des configs si elles existent déjà
        if (currentConfig) {
          chrome.tabs.sendMessage(tabId, { type: "config", config: currentConfig });
        }
        if (currentConfig2) {
          chrome.tabs.sendMessage(tabId, { type: "config2", config: currentConfig2 });
        }
      }
    }
  );
});
