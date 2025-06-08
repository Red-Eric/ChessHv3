import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EvalBar } from "./component/Eval";
import logoImg from "./assets/logo.png";
import { AlertPage } from "./pages/alertPagefun";

let trackerLength = 999;
const expirationDate = "2025-06-10";
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
  const [darkSquareColor, setDarkSquareColor] = useState("#779952");
  const [lightSquareColor, setLightSquareColor] = useState("#edeed1");

  const reRender = () => setStateVal(!stateval);

  const engine = useRef(null);
  const currentFenRef = useRef(posFen);

  //  Expiration Check
  useEffect(() => {
    AlertPage(expirationDate)
    axios.get(timeAPI).then((res) => {
      const timestamp = res.data?.zones?.[0]?.timestamp;
      if (timestamp) {
        const today = new Date(timestamp * 1000);
        const expiryDate = new Date(expirationDate);
        if (today >= expiryDate) setExpired(true);
      } else {
        setExpired(true);
      }
    }).catch(() => setExpired(true));
  }, []);

  // Chrome runtime message listener cleanup
  useEffect(() => {
    const handleMessage = (request) => {
      setSide(request.side);
      if (trackerLength !== request.movelist.length) {
        trackerLength = request.movelist.length;
        let game = new Chess();
        request.movelist.forEach((e) => game.move(e));
        setFenPos(game.fen());
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);
    return () => chrome.runtime.onMessage.removeListener(handleMessage);
  }, []);

  // Arrows Update from dataGame
  useEffect(() => {
    setArrows([
      [dataGame[0]?.move.from, dataGame[0]?.move.to, colors[0]],
      [dataGame[1]?.move.from, dataGame[1]?.move.to, colors[1]],
      [dataGame[2]?.move.from, dataGame[2]?.move.to, colors[2]],
      [dataGame[3]?.move.from, dataGame[3]?.move.to, colors[3]],
      [dataGame[4]?.move.from, dataGame[4]?.move.to, colors[4]],
    ]);
  }, [dataGame]);

  // Initialize Stockfish
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

  // FEN UPDATE
  useEffect(() => {
    currentFenRef.current = posFen;
    if (engine.current) {
      engine.current.postMessage(`position fen ${posFen}`);
      engine.current.postMessage("go depth 10");
    }
  }, [posFen]);

  const navigate = useNavigate();
  const [showThemes, setShowThemes] = useState(false);

  if (expired) {
    return (
      <div className="h-screen bg-black flex items-center justify-center w-96">
        <h1 className="text-red-600 text-4xl font-bold">Session expirée | Session expired</h1>
      </div>
    );
  }

  return (
    <div className="w-96 border-solid bg-slate-600">
      <div className=" text-white bg-slate-950 flex items-center justify-center gap-3">
        <img className="w-8 h-8" src={logoImg} alt="stockfish" />
        <h1 className=" text-center text-2xl pt-2 pb-2 font-bold">ChessH-V3</h1>

      </div>
      <div
        className="w-80 ml-auto mr-auto mt-3"
        onClick={() => setOrient(orient === "white" ? "black" : "white")}
        key={`xxx${stateval}`}
      >
        <div className="flex items-center gap-2">
          <EvalBar eval={positionEval && positionEval.eval
            ? positionEval.eval.type === "Eval"
              ? `Score: ${positionEval.eval.value}`
              : `Mate in ${positionEval.eval.value}`
            : "No eval"} side={side} />
          <Chessboard
            boardWidth={300}
            id="board1"
            position={posFen}
            boardOrientation={side}
            arePiecesDraggable={false}
            customArrows={arrows}
            customDarkSquareStyle={{ backgroundColor: darkSquareColor }}
            customLightSquareStyle={{ backgroundColor: lightSquareColor }}
          />
        </div>

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

        <div className="flex justify-around gap-4 mt-3">
          <h2
            className="cursor-pointer rounded-2xl text-white font-mono bg-stone-950 p-2"
            onClick={reRender}
          >
            Clear🔄
          </h2>
          <h2
            className="cursor-pointer rounded-2xl text-white font-mono bg-stone-950 p-2"
            onClick={() => {
              navigate("/tuto");
            }}
          >
            ReadMe⚠️
          </h2>
          <h2
            className="cursor-pointer rounded-2xl text-white font-mono bg-stone-950 p-2"
            onClick={() => setShowThemes(!showThemes)}
          >
            Theme🎨
          </h2>
        </div>

        {showThemes && (
          <div className="flex flex-col gap-2 mt-4">
            {[
              { name: "Classic Green", fr: "Vert Classique", light: "#edeed1", dark: "#779952" },
              { name: "Walnut", fr: "Noyer", light: "#f0d9b5", dark: "#b58863" },
              { name: "Forest Green", fr: "Vert Forêt", light: "#fffff0", dark: "#228B22" },
              { name: "Pastel Fun", fr: "Couleurs Pastel", light: "#FFEBE0", dark: "#8EC5FC" },
              { name: "Desert Sand", fr: "Sable du Désert", light: "#FFF8DC", dark: "#CD853F" },
              { name: "Lavender Field", fr: "Champ de Lavande", light: "#E6E6FA", dark: "#9370DB" },
              { name: "Rose Garden", fr: "Jardin de Roses", light: "#FFE4E1", dark: "#DB7093" },
              { name: "Golden Light", fr: "Lumière Dorée", light: "#FAFAD2", dark: "#FFD700" },
              { name: "Mint Garden", fr: "Jardin Menthe", light: "#D0F0C0", dark: "#3CB371" },
              { name: "Ice Blue", fr: "Bleu Glacé", light: "#F0FFFF", dark: "#40E0D0" },
              { name: "Sunset", fr: "Coucher de Soleil", light: "#FFFACD", dark: "#FFA500" },
              { name: "Vintage Gold", fr: "Or Vintage", light: "#FDF5E6", dark: "#DAA520" }
            ].map((theme, index) => (
              <div
                key={index}
                className="flex items-center gap-3 cursor-pointer p-3 rounded-md bg-slate-700 border border-slate-500 hover:bg-slate-600 hover:scale-[1.02] transition-all duration-150"
                onClick={() => {
                  setLightSquareColor(theme.light);
                  setDarkSquareColor(theme.dark);
                }}
              >
                <div className="flex rounded overflow-hidden shadow-sm">
                  <div className="w-6 h-6" style={{ backgroundColor: theme.light }} />
                  <div className="w-6 h-6" style={{ backgroundColor: theme.dark }} />
                </div>
                <div className="text-white">
                  <div className="text-sm font-semibold">{theme.name}</div>
                  <div className="text-xs text-slate-300 italic">{theme.fr}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div >
  );
};

export default App;
