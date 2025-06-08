if (window.location.hostname.includes("chess.com")) {
    
    function getSide() {
        const coord = document.querySelector(".coordinate-light");
        if (!coord) return "none";

        const value = coord.innerHTML;
        if (value === "1") return "black";
        if (value === "8") return "white";
        return "none";
    }

    function getMovelist() {
        let movelist = [];
        document.querySelectorAll("div.node").forEach((e) => {
            movelist.push(e.innerText.replaceAll(" ", ""));
        });
        return movelist;
    }

    function sendMessage() {
        let moves = getMovelist();
        if (moves && moves.length > 0) {
            chrome.runtime.sendMessage({ movelist: moves, side: getSide() });
        } else {
            console.error("No position defined");
        }
    }

    setInterval(() => {
        console.log("Sending moves");
        try{
            sendMessage();
        }
        catch(error){
            console.log(error)
        }
        
    }, 500);

} else {
    console.log("ChessCom Only.");
}
