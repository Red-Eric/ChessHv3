
let lichessFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
let socketURL = null;

function isValidFEN(fen) {
    if (!fen || typeof fen !== 'string') return false;

    const parts = fen.trim().split(/\s+/);
    if (parts.length !== 6) return false;

    const [board, turn, castling, enPassant, halfmove, fullmove] = parts;

    const rows = board.split('/');
    if (rows.length !== 8) return false;

    const validPieces = /^[prnbqkPRNBQK1-8]+$/;
    for (const row of rows) {
        if (!validPieces.test(row)) return false;

        let count = 0;
        for (const c of row) {
            count += c >= '1' && c <= '8' ? parseInt(c) : 1;
        }
        if (count !== 8) return false;
    }

    if (turn !== 'w' && turn !== 'b') return false;

    if (!/^(K?Q?k?q?|-)$/.test(castling)) return false;

    if (!/^([a-h][36]|-)$/.test(enPassant)) return false;

    if (!/^\d+$/.test(halfmove) || !/^\d+$/.test(fullmove)) return false;

    return true;
}


(function () {
    const OriginalWebSocket = window.WebSocket;
    window.WebSocket = function (url, protocols) {
        // console.log("WebSocket URL:", url);
        const ws = new OriginalWebSocket(url, protocols);

        socketURL = url;

        ws.addEventListener("message", function (event) {
            // console.log(event.data);
            let message = event.data
            console.log(message)
            // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1

            let fen;

            try {
                const data = typeof message === "string" ? JSON.parse(message) : message;
                fen = data?.d?.fen;

                fen = `${fen} ${(data?.d?.ply % 2 === 0) ? "w" : "b"} KQkq - 0 1`

            } catch (e) {
                fen = typeof message === "string" ? message : undefined;
            }
            if (isValidFEN(fen)) {
                // console.log(fen)
                lichessFen = fen
            }
        });

        return ws;
    };
})();



(function () {
    window.addEventListener("message", (event) => {
        if (event.source !== window) return;

        if (event.data?.type === "FEN") {
            window.postMessage({ type: "FEN_RESPONSE", fen: lichessFen }, "*");
        }

        if (event.data?.type === "MOVE") {
            console.log("Move")
        }

    });
})();

