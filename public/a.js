
(function() {

    window.addEventListener('message', (event) => {
        if (event.source !== window) return;

        if (event.data && event.data.type === 'GET_FEN') {
            const fen = window.game?.fen || null;
            const turn = window.game?.getTurn?.() || 1;
            window.postMessage({ type: 'FEN_RESPONSE', fen, turn }, '*');
        }
    });
})();
