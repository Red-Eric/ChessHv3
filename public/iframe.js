// ----- Charger Stockfish ----- 
fetch(chrome.runtime.getURL("lib/stockfish-17.1-asm-341ff22.js"))
  .then((r) => r.text())
  .then((code) => {
    const blob = new Blob([code], { type: "application/javascript" });
    const blobUrl = URL.createObjectURL(blob);
    const worker = new Worker(blobUrl);

    window.engineWorker = worker;

    // Relais direct des messages Stockfish vers le content script
    worker.onmessage = (msg) => {
      window.parent.postMessage(
        { type: "stockfishResponse", value: msg.data },
        "*"
      );
    };
  });

// ----- window.postMessage simplifiée ----- 
window.addEventListener("message", (event) => {
  const command = event.data;
  if (!command || typeof command !== "string") return;
  const worker = window.engineWorker;
  if (!worker) return;

  // Envoie simplement la commande à Stockfish
  worker.postMessage(command);
});
