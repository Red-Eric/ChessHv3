// credit : ashina cheat 


const TAG_TOK = '[Maia3-Tokenizer]';
// console.log(`${TAG_TOK} maia3-tokenizer.js yüklendi`);

const PIECE_MAP = { p: 1, n: 2, b: 3, r: 4, q: 5, k: 6 };

function mirrorSquare(sq) {
  return sq[0] + (9 - parseInt(sq[1]));
}

function mirrorMove(uci) {
  const promo = uci.length > 4 ? uci.slice(4) : '';
  return mirrorSquare(uci.slice(0, 2)) + mirrorSquare(uci.slice(2, 4)) + promo;
}

// FEN'i parse edip 64x12 float32 tensor döndürür (side-to-move perspektifinden)
function tokenizeBoard(fen) {
  const tokens = new Float32Array(64 * 12);
  const parts = fen.split(' ');
  const turn = parts[1];
  const ranks = parts[0].split('/');

  if (ranks.length !== 8) {
    console.error(`${TAG_TOK} HATA: FEN rank sayısı yanlış: ${ranks.length}, FEN: ${fen}`);
  }

  const boardRanks = turn === 'w' ? ranks : [...ranks].reverse();

  for (let rankIdx = 0; rankIdx < 8; rankIdx++) {
    const rank = boardRanks[7 - rankIdx];
    let fileIdx = 0;
    for (const ch of rank) {
      if (ch >= '1' && ch <= '8') {
        fileIdx += parseInt(ch);
      } else {
        if (fileIdx >= 8) {
          console.error(`${TAG_TOK} HATA: fileIdx sınır dışı: ${fileIdx}, rank: ${rank}`);
        }
        const square = rankIdx * 8 + fileIdx;
        const isWhite = ch === ch.toUpperCase();
        const isOurPiece = turn === 'w' ? isWhite : !isWhite;
        const pieceType = PIECE_MAP[ch.toLowerCase()];
        if (!pieceType) {
          console.error(`${TAG_TOK} HATA: Tanınmayan taş karakteri: '${ch}'`);
        }
        const tokenIdx = isOurPiece ? pieceType - 1 : pieceType + 5;
        tokens[square * 12 + tokenIdx] = 1;
        fileIdx++;
      }
    }
  }
  return tokens; // Float32Array(768)
}

// history: Float32Array dizisi, cfg: { history: 8, include_time_info: false }
// Döndürür: Float32Array(64 * 97)
function getHistoricalTokens(history, cfg) {
  const H = cfg.history;         // 8
  const feats = H * 12 + 1;     // 97

  if (history.length === 0) {
    console.error(`${TAG_TOK} HATA: history boş!`);
  }
  if (history[0].length !== 768) {
    console.error(`${TAG_TOK} HATA: history[0] boyutu yanlış: ${history[0].length}, beklenen: 768`);
  }

  const out = new Float32Array(64 * feats);

  // Pad: history'den az varsa ilkini tekrarla
  const padded = [];
  while (padded.length < H) padded.push(history[0]);
  for (const h of history) padded.push(h);
  const sliced = padded.slice(padded.length - H);

  for (let sq = 0; sq < 64; sq++) {
    for (let h = 0; h < H; h++) {
      const src = sliced[h];
      for (let f = 0; f < 12; f++) {
        out[sq * feats + h * 12 + f] = src[sq * 12 + f];
      }
    }
    out[sq * feats + H * 12] = 0.0; // clk_ponder
  }

  return out; // Float32Array(6208)
}

// FEN'den legal moves maskesi (4352 elemanlı Uint8Array)
function getLegalMovesMask(fen, allMovesDict, turn) {
  const mask = new Uint8Array(4352);

  let chess;
  try {
    chess = new Chess(fen);
  } catch (e) {
    console.error(`${TAG_TOK} HATA: Chess(fen) başarısız →`, e.message, '| FEN:', fen);
    return mask;
  }

  const legals = chess.moves({ verbose: true });
  // console.log(`${TAG_TOK} chess.js legal moves: ${legals.length} | turn: ${turn}`);

  let missCount = 0;
  for (const mv of legals) {
    let uci = mv.from + mv.to;
    if (mv.promotion) uci += mv.promotion;

    const uciOriginal = uci;
    if (turn === 'b') uci = mirrorMove(uci);

    const idx = allMovesDict[uci];
    if (idx !== undefined) {
      mask[idx] = 1;
    } else {
      missCount++;
      if (missCount <= 5) {
        console.warn(`${TAG_TOK} UYARI: Hamle all_moves'da bulunamadı | orijinal: ${uciOriginal} | mirror: ${uci}`);
      }
    }
  }

  if (missCount > 0) {
    console.warn(`${TAG_TOK} Toplam bulunamayan hamle: ${missCount}/${legals.length}`);
  }

  const maskedCount = mask.filter(Boolean).length;
  // console.log(`${TAG_TOK} Mask'ta işaretlenen: ${maskedCount}`);

  return mask;
}

// Hamle index'ini UCI'ya çevir
function indexToUci(idx, allMoves, turn) {
  if (idx < 0 || idx >= allMoves.length) {
    console.error(`${TAG_TOK} HATA: indexToUci idx sınır dışı: ${idx}`);
    return '0000';
  }
  let uci = allMoves[idx];
  if (turn === 'b') uci = mirrorMove(uci);
  return uci;
}
