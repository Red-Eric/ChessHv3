(function() {
    function getGameObject() {
        // 1. window.game si dispo
        if (window.game) return window.game;

        
        const board = document.querySelector(".board");
        if (board && board.game){
            return board.game
        }

        return null;
    }

    window.addEventListener('message', (event) => {
        if (event.source !== window) return;

        if (event.data?.type === 'GET_FEN') {
            const game = getGameObject();
            const fen = game?.getFEN() || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
            const side_ = game?.getPlayingAs?.() || 1;
            window.postMessage({ type: 'FEN_RESPONSE', fen, side_ }, '*');
        }
    });
})();
