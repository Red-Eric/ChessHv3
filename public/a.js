
(function() {

    window.addEventListener('message', (event) => {
        if (event.source !== window) return;

        if (event.data && event.data.type === 'GET_FEN') {
            const fen = window.game?.fen || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
            const side_ = window.game?.getPlayingAs() || 1;
            window.postMessage({ type: 'FEN_RESPONSE', fen, side_ }, '*');
        }
    });
})();
