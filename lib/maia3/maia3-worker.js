// credit : ashina cheat 
// 

const TAG = '[Maia3-Worker]';

let session = null;

self.onmessage = async (e) => {
  const msg = e.data;

  // console.log(e.data)

  if (msg.type === 'init') {
    await handleInit(msg);
    return;
  }

  if (msg.type === 'inference') {
    await handleInference(msg);
    return;
  }

  console.warn(`${TAG} Bilinmeyen mesaj tipi:`, msg.type);
};

async function handleInit({ modelUrl, ortBaseUrl, ortRuntimeUrl }) {
  try {
    self.postMessage({ type: 'status', status: 'loading', progress: 0 });

    // 1) ORT runtime'ı yükle (ortRuntimeUrl Mint.js'den blob URL olarak gelir)
    importScripts(ortRuntimeUrl);

    // 2) WASM path ayarla
    ort.env.wasm.wasmPaths = ortBaseUrl;

    self.postMessage({ type: 'status', status: 'loading', progress: 30 });

    // 3) Model fetch
    const resp = await fetch(modelUrl);
    if (!resp.ok) throw new Error(`Model fetch HTTP ${resp.status}`);
    const modelBuf = await resp.arrayBuffer();

    self.postMessage({ type: 'status', status: 'loading', progress: 70 });

    // 4) ONNX session oluştur
    session = await ort.InferenceSession.create(modelBuf, {
      executionProviders: ['wasm'],
      graphOptimizationLevel: 'all',
    });

    self.postMessage({ type: 'status', status: 'ready' });

  } catch (err) {
    console.error(`${TAG} init HATA:`, err.message);
    self.postMessage({ type: 'error', id: null, message: err.message });
  }
}

async function handleInference({ id, tokens, eloSelfs, eloOppos, batchSize }) {
  if (!session) {
    console.error(`${TAG} inference çağrıldı ama session yok! id: ${id}`);
    self.postMessage({ type: 'error', id, message: 'Session hazır değil' });
    return;
  }

  try {
    const B = batchSize ?? 1;

    const tokenFlat     = new Float32Array(tokens);
    const tokenTensor   = new ort.Tensor('float32', tokenFlat, [B, 64, 97]);
    const selfEloTensor = new ort.Tensor('int64', BigInt64Array.from(eloSelfs.map(BigInt)), [B]);
    const oppoEloTensor = new ort.Tensor('int64', BigInt64Array.from(eloOppos.map(BigInt)), [B]);


    const output = await session.run({
      tokens:   tokenTensor,
      self_elo: selfEloTensor,
      oppo_elo: oppoEloTensor,
    });

    const logitsMove = new Float32Array(output['logits_move'].data);

    const buf = logitsMove.buffer.slice(0);
    self.postMessage({ type: 'inference-result', id, logitsMove: buf }, [buf]);

  } catch (err) {
    console.error(`${TAG} inference HATA id:${id}:`, err.message);
    self.postMessage({ type: 'error', id, message: err.message });
  }
}
