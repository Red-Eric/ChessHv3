fetch(chrome.runtime.getURL("lib/stockfish-17.1-asm-341ff22.js"))
  .then(r => r.text())
  .then(code => {
      const blob = new Blob([code], { type: "application/javascript" });
      const blobUrl = URL.createObjectURL(blob);
      const engine = new Worker(blobUrl);
      window.engine = engine;

      engine.onmessage = (msg) => console.log("Stockfish:", msg.data);

      engine.postMessage("uci");
  });
