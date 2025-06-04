import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let trackerLength = 999;
const expirationDate = "2025-06-06";
const colors = ["#0000FF", "#00FF00", "#FFFF00", "#FF4D00", "#FF0000"];
const timeAPI = "http://api.timezonedb.com/v2.1/list-time-zone?key=WPOK8LWQNYUI&format=json&country=FR";

const adjustEval = (evalObj, fen) => {
  const sideToMove = fen.split(" ")[1];
  if (evalObj.type === "Eval" || evalObj.type === "mate") {
    return {
      ...evalObj,
      value: sideToMove === "b" ? -evalObj.value : evalObj.value,
    };
  }
  return evalObj;
};

const App = () => {
  const [posFen, setFenPos] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const [side, setSide] = useState("white");
  const [orient, setOrient] = useState("white");
  const [dataGame, setDataGame] = useState([]);
  const [positionEval, setPositionEval] = useState("0.0");
  const [arrows, setArrows] = useState([]);
  const [expired, setExpired] = useState(false);
  const [stateval, setStateVal] = useState(false);
  const reRender = () => setStateVal(!stateval);

  const engine = useRef(null);
  const currentFenRef = useRef(posFen);

  useEffect(() => {
    axios.get(timeAPI)
      .then((res) => {
        const timestamp = res.data?.zones?.[0]?.timestamp;
        if (timestamp) {
          const today = new Date(timestamp * 1000);
          const expiryDate = new Date(expirationDate);
          if (today >= expiryDate) {
            setExpired(true);
          }
        } else {
          setExpired(true);
        }
      })
      .catch(() => {
        setExpired(true);
      });
  }, []);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((request) => {
      setSide(request.side);
      if (trackerLength !== request.movelist.length) {
        trackerLength = request.movelist.length;
        let game = new Chess();
        request.movelist.forEach((e) => game.move(e));
        setFenPos(game.fen());
      }
    });
  }, []);

  useEffect(() => {
    setArrows([
      [dataGame[0]?.move.from, dataGame[0]?.move.to, colors[0]],
      [dataGame[1]?.move.from, dataGame[1]?.move.to, colors[1]],
      [dataGame[2]?.move.from, dataGame[2]?.move.to, colors[2]],
      [dataGame[3]?.move.from, dataGame[3]?.move.to, colors[3]],
      [dataGame[4]?.move.from, dataGame[4]?.move.to, colors[4]],
    ]);
  }, [dataGame]);

  useEffect(() => {
    engine.current = new Worker(new URL("./worker/stockfish.js", import.meta.url));
    const multipvResults = new Map();

    engine.current.onmessage = (event) => {
      const msg = event.data;
      if (typeof msg === "string" && msg.includes("info depth 10")) {
        const parts = msg.split(" ");
        const multipvIndex = parts.indexOf("multipv");
        const scoreIndex = parts.indexOf("score");
        const pvIndex = parts.indexOf("pv");

        if (multipvIndex !== -1 && scoreIndex !== -1 && pvIndex !== -1) {
          const multipv = parseInt(parts[multipvIndex + 1]);
          const scoreType = parts[scoreIndex + 1];
          const scoreValue = parts[scoreIndex + 2];
          const bestMove = parts[pvIndex + 1];

          const from = bestMove.slice(0, 2);
          const to = bestMove.slice(2, 4);

          let evalObj;
          if (scoreType === "cp") {
            evalObj = { type: "Eval", value: parseFloat((scoreValue / 100).toFixed(2)) };
          } else if (scoreType === "mate") {
            evalObj = { type: "mate", value: parseInt(scoreValue) };
          } else {
            evalObj = { type: "unknown", value: null };
          }

          multipvResults.set(multipv, {
            eval: adjustEval(evalObj, currentFenRef.current),
            move: { from, to },
          });

          if (multipvResults.has(1)) {
            const ordered = Array.from(multipvResults.entries())
              .sort(([a], [b]) => a - b)
              .map(([_, value]) => value);
            setDataGame(ordered);
            setPositionEval(ordered[0]);
          }
        }
      }
    };

    engine.current.postMessage("setoption name MultiPV value 5");

    return () => {
      engine.current.terminate();
      engine.current = null;
    };
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    currentFenRef.current = posFen;
    if (engine.current) {
      engine.current.postMessage(`position fen ${posFen}`);
      engine.current.postMessage("go depth 10");
    }
  }, [posFen]);

  if (expired) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <h1 className="text-red-600 text-4xl font-bold">Session expirée</h1>
      </div>
    );
  }

  return (
    <div className="w-96 border-solid bg-slate-600">
      <h1 className="text-white bg-slate-950 text-center text-2xl pt-2 pb-2 font-bold">Chess Cheat (expiration 6 June 2025)</h1>
      <div
        className="w-80 ml-auto mr-auto mt-3"
        onClick={() => setOrient(orient === "white" ? "black" : "white")}
        key={`xxx${stateval}`}
      >
        <Chessboard
          id="board1"
          position={posFen}
          boardOrientation={side}
          arePiecesDraggable={false}
          customArrows={arrows}
          customDarkSquareStyle={{ backgroundColor: "#779952" }}
          customLightSquareStyle={{ backgroundColor: "#edeed1" }}
        />
        <p className="text-white text-3xl text-center font-mono pt-3 pb-3 bg-slate-900 rounded-2xl mt-4">
          {positionEval && positionEval.eval
            ? positionEval.eval.type === "Eval"
              ? `Score: ${positionEval.eval.value}`
              : `Mate in ${positionEval.eval.value}`
            : "No eval"}
        </p>

        <div className="flex gap-2 mt-3">
          {dataGame.map((d, i) => (
            <div className="rounded-md px-2" style={{ backgroundColor: colors[i] }} key={i}>
              <h2 className="text-center font-bold font-mono">
                {d?.eval.type} : {d?.eval.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="flex justify-around mt-3">
          <h2
            className="cursor-pointer rounded-2xl text-white font-bold font-mono bg-stone-950 p-3"
            onClick={reRender}
          >
            Clear🔄
          </h2>
          <h2
            className="cursor-pointer rounded-2xl text-white font-bold font-mono bg-stone-950 p-3"
            onClick={() => {
              navigate("/tuto");
            }}
          >
            Info⚠️
          </h2>
        </div>
      </div>
    </div>
  );
};

export default App;
