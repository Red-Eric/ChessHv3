function getFen() {
  let fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  // el = document.querySelectorAll("kwdb") // document.querySelectorAll("move")

  let el = document.querySelectorAll("kwdb");

  if (el.length === 0) {
    el = document.querySelectorAll("move");
  }

  let moves = []; // move list
  el.forEach((element) => {
    // console.log(element.innerText)
    if(element.innerText){


        moves.push(element.innerText.split("\n")[0]);

    }
    
  });
  // [e2 , e4]
  const game = new Chess();
  moves.forEach((e) => game.move(e));

  fen = game.fen();
//   console.log(fen)
  // console.log(fen)
  return fen;
}

(function () {
  window.addEventListener("message", (event) => {
    if (event.source !== window) return;

    if (event.data?.type === "FEN") {
      window.postMessage({ type: "FEN_RESPONSE", fen: getFen() }, "*");
    }
  });
})();
