(function () {
    const OriginalWebSocket = window.WebSocket;
    window.WebSocket = function (url, protocols) {
        console.log("WebSocket URL:", url);
        const ws = new OriginalWebSocket(url, protocols);


        ws.addEventListener("message", function (event) {
            // console.log(event.data);
            let message = event.data
            console.log(message)
            // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1

            // let fen;

            // try {
            //     const data = typeof message === "string" ? JSON.parse(message) : message;
            //     fen = data?.d?.fen;

            //     fen = `${fen} ${(data?.d?.ply % 2 === 0) ? "w" : "b"} KQkq - 0 1`
                
            // } catch (e) {
            //     fen = typeof message === "string" ? message : undefined;
            // }
            // if(fen){
            //     console.log(fen)
            // }
        });


        return ws;
    };
})();