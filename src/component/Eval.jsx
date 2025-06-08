
export const EvalBar = ({ eval: evalStr, side = "white" }) => {
    let evalValue = 0;
    let isMate = false;

    if (evalStr.startsWith("Mate in")) {
        isMate = true;
        evalValue = parseInt(evalStr.split("Mate in")[1].trim(), 10);
    } else if (evalStr.startsWith("Score:")) {
        evalValue = parseFloat(evalStr.split(":")[1]);
    }

    let percentWhite;
    if (isMate) {
        
        percentWhite = evalValue >= 0 ? 100 : 0;
    } else {
        const cappedEval = Math.max(-9, Math.min(9, evalValue));
        // Map score to 10%–90%
        percentWhite = 50 + (cappedEval / 18) * 80;
    }

    const percentBlack = 100 - percentWhite;
    const whiteOnBottom = side === "white";

    return (
        <div className="relative w-8 bg-gray-300 rounded overflow-hidden shadow h-[300px]">
            {whiteOnBottom ? (
                <>
                    <div
                        className="absolute top-0 left-0 w-full bg-black transition-[height] duration-700 ease-out"
                        style={{ height: `${percentBlack}%` }}
                    />
                    <div
                        className="absolute bottom-0 left-0 w-full bg-white transition-[height] duration-700 ease-out"
                        style={{ height: `${percentWhite}%` }}
                    />
                </>
            ) : (
                <>
                    <div
                        className="absolute top-0 left-0 w-full bg-white transition-[height] duration-700 ease-out"
                        style={{ height: `${percentWhite}%` }}
                    />
                    <div
                        className="absolute bottom-0 left-0 w-full bg-black transition-[height] duration-700 ease-out"
                        style={{ height: `${percentBlack}%` }}
                    />
                </>
            )}


            <div className="absolute left-0 w-full h-0.5 bg-red-500" style={{ top: "50%" }} />


            <div className="absolute top-2 left-10 bg-white text-black text-xs px-1 py-0.5 rounded shadow">
                {isMate ? `#${Math.abs(evalValue)}` : (evalValue > 0 ? `+${evalValue}` : evalValue)}
            </div>
        </div>
    );
};
