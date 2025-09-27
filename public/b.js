function getFen(){
    let fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    el = document.querySelectorAll("kwdb")
    let moves = [] // move list
    el.forEach(element => {
        moves.push(element.innerText)  
    });
    // [e2 , e4]
    const game = new Chess()
    moves.forEach(e => game.move(e))

    fen = game.fen()
    // console.log(fen)
    return fen

}


(function () {  
  
    window.addEventListener("message", (event) => {
      if (event.source !== window) return;

      if (event.data?.type === "FEN") {
        window.postMessage({ type: "FEN_RESPONSE" , fen : getFen() }, "*");
      }
    });
  })();
  