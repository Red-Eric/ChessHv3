const engine = new Worker(
  chrome.runtime.getURL("lib/stockfish-17.1-lite-single-03e3232.js")
);

engine.onmessage = (e)=> {
  console.log(e.data)
}

engine.postMessage("uci")



