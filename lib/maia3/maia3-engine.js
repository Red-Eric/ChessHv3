
// credit : ashina cheat 

const TAG = '[Maia3]';


let session = null;
let allMoves = null;
let allMovesDict = null;

try {
  ort.env.wasm.wasmPaths = chrome.runtime.getURL('lib/ort');
} catch (e) {
  console.error(`${TAG} HATA: ort.env.wasm.wasmPaths ayarlanamadı →`, e.message);
}

async function initEngine() {
  if (session) {
    return;
  }


  const modelUrl = chrome.runtime.getURL("lib/maia3/maia3-5m.onnx");
  const movesUrl = chrome.runtime.getURL("lib/maia3/all_moves.json");

  let modelBuf, movesJson;
  try {
    [modelBuf, movesJson] = await Promise.all([
      fetch(modelUrl).then(r => {
        if (!r.ok) throw new Error(`model fetch HTTP ${r.status}`);
        return r.arrayBuffer();
      }),
      fetch(movesUrl).then(r => {
        if (!r.ok) throw new Error(`all_moves fetch HTTP ${r.status}`);
        return r.json();
      }),
    ]);
  } catch (e) {
    console.error(`${TAG} HATA: dosya fetch başarısız →`, e.message);
    throw e;
  }

  allMoves = movesJson;
  allMovesDict = {};
  allMoves.forEach((m, i) => allMovesDict[m] = i);

  try {
    session = await ort.InferenceSession.create(modelBuf, {
      executionProviders: ['wasm'],
      graphOptimizationLevel: 'all',
    });
  } catch (e) {
    console.error(`${TAG} HATA: ONNX session oluşturulamadı →`, e.message);
    throw e;
  }

}

// FEN + elo → { bestmove, topMoves }
async function getBestMove(fen, selfElo = 1500, oppoElo = 1500, topN = 5) {

  try {
    await initEngine();
  } catch (e) {
    console.error(`${TAG} HATA: initEngine başarısız →`, e.message);
    throw e;
  }

  const turn = fen.split(' ')[1];

  // Tokenize
  let boardTokens, tokenFlat;
  try {
    boardTokens = tokenizeBoard(fen);
    tokenFlat = getHistoricalTokens([boardTokens], { history: 8, include_time_info: false });
  } catch (e) {
    console.error(`${TAG} HATA: tokenizasyon başarısız →`, e.message);
    throw e;
  }

  // Tensor oluştur
  let output;
  try {
    const tokenTensor   = new ort.Tensor('float32', tokenFlat, [1, 64, 97]);
    const selfEloTensor = new ort.Tensor('int64', BigInt64Array.from([BigInt(selfElo)]), [1]);
    const oppoEloTensor = new ort.Tensor('int64', BigInt64Array.from([BigInt(oppoElo)]), [1]);

    output = await session.run({
      tokens:   tokenTensor,
      self_elo: selfEloTensor,
      oppo_elo: oppoEloTensor,
    });
  } catch (e) {
    console.error(`${TAG} HATA: inference başarısız →`, e.message);
    throw e;
  }

  const logits = output['logits_move'].data;

  // Legal moves mask
  let mask;
  try {
    mask = getLegalMovesMask(fen, allMovesDict, turn);
    const legalCount = mask.filter(Boolean).length;
    if (legalCount === 0) {
      console.error(`${TAG} HATA: Legal hamle yok! FEN geçersiz olabilir`);
    }
  } catch (e) {
    console.error(`${TAG} HATA: getLegalMovesMask başarısız →`, e.message);
    throw e;
  }

  // Maskeleme
  const masked = new Float32Array(4352);
  for (let i = 0; i < 4352; i++) {
    masked[i] = mask[i] ? logits[i] : -Infinity;
  }

  // Softmax
  const finiteVals = masked.filter(v => isFinite(v));
  if (finiteVals.length === 0) {
    console.error(`${TAG} HATA: Tüm logitler -Infinity! Mask tamamen boş olabilir`);
    throw new Error('Tüm logitler masked, legal hamle üretilemedi');
  }
  const maxL = Math.max(...finiteVals);
  let expSum = 0;
  const probs = new Float32Array(4352);
  for (let i = 0; i < 4352; i++) {
    if (mask[i]) {
      probs[i] = Math.exp(masked[i] - maxL);
      expSum += probs[i];
    }
  }
  for (let i = 0; i < 4352; i++) probs[i] /= expSum;

  // Top-N
  const indexed = [];
  for (let i = 0; i < 4352; i++) {
    if (mask[i]) indexed.push({ idx: i, prob: probs[i] });
  }
  indexed.sort((a, b) => b.prob - a.prob);
  const top = indexed.slice(0, topN);

  const topMoves = top.map(({ idx, prob }) => ({
    move: indexToUci(idx, allMoves, turn),
    prob: Math.round(prob * 1000) / 1000,
  }));

  const bestmove = topMoves[0]?.move ?? '0000';

  return { bestmove, topMoves };
}

