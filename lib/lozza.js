//
// https://github.com/op12no2/lozza
//

const BUILD = "8";

//{{{  dev/release
//
// See https://github.com/op12no2/lozza/wiki/Making-a-release.
//

const NET_LOCAL        = 1;
const NET_NAME         = '';
const NET_SB           = '';
const NET_WEIGHTS_FILE = '';
const TTSIZE           = 1 << 24;
const BENCH_DEPTH      = 10;

//}}}
//{{{  constants

const INT32_MAX =  2147483647;
const INT32_MIN = -2147483648;

const UINT32_MAX = 4294967295;

const NET_QA      = 255;
const NET_QB      = 64;
const NET_QAB     = NET_QA * NET_QB;
const NET_SCALE   = 400;
const NET_I_SIZE  = 768;
const NET_H1_SIZE = 256;

const IMAP = new Uint32Array(15 * 256);

const MATERIAL = new Int32Array([0,100,394,388,588,1207,10000]);
const ADJACENT = new Uint8Array(144);

ADJACENT[1]  = 1;
ADJACENT[11] = 1;
ADJACENT[12] = 1;
ADJACENT[13] = 1;

const MAX_PLY         = 128;                // limited by ttDepth bits
const MAX_MOVES       = 256;
const LMR_LOOKUP      = new Uint8Array(MAX_PLY * MAX_MOVES);
const INFINITY        = 30000;              // limited by ttScore bits
const MATE            = 20000;
const MINMATE         = (MATE - 2*MAX_PLY) | 0;
const TTSCORE_UNKNOWN = MATE + 1;
const EMPTY           = 0;

const WHITE = 0x0;
const BLACK = 0x8;

const PIECE_MASK  = 0x7;
const COLOR_MASK  = 0x8;
const COLOUR_MASK = 0x8;

const TTMASK = TTSIZE - 1;

const TT_EMPTY = 0;
const TT_EXACT = 1;
const TT_BETA  = 2;
const TT_ALPHA = 3;

const BASE_HASH       = UINT32_MAX;
const BASE_PROMOTES   = BASE_HASH       - 100;
const BASE_GOODTAKES  = BASE_PROMOTES   - 1000;
const BASE_EVENTAKES  = BASE_GOODTAKES  - 1000;
const BASE_EPTAKES    = BASE_EVENTAKES  - 100;
const BASE_MATEKILLER = BASE_EPTAKES    - 100;
const BASE_MYKILLERS  = BASE_MATEKILLER - 100;
const BASE_GPKILLERS  = BASE_MYKILLERS  - 100;
const BASE_CASTLING   = BASE_GPKILLERS  - 100;
const BASE_BADTAKES   = BASE_CASTLING   - 1000;
const BASE_HISSLIDE   = UINT32_MAX >>> 1;
const BASE_SLIDE      = 100;

const BASE_LMR = BASE_BADTAKES;

const MOVE_TO_BITS     = 0;
const MOVE_FR_BITS     = 8;
const MOVE_TOOBJ_BITS  = 16;
const MOVE_FROBJ_BITS  = 20;
const MOVE_PROMAS_BITS = 29;

const MOVE_TO_MASK      = 0x000000FF;
const MOVE_FR_MASK      = 0x0000FF00;
const MOVE_TOOBJ_MASK   = 0x000F0000;
const MOVE_FROBJ_MASK   = 0x00F00000;
const MOVE_LEGAL_MASK   = 0x01000000;
const MOVE_EPTAKE_MASK  = 0x02000000;
const MOVE_EPMAKE_MASK  = 0x04000000;
const MOVE_CASTLE_MASK  = 0x08000000;
const MOVE_PROMOTE_MASK = 0x10000000;
const MOVE_PROMAS_MASK  = 0x60000000;  // NBRQ

const MOVE_CLEAN_MASK   = (~MOVE_LEGAL_MASK & 0xFFFFFFFF) | 0;
const MOVE_SPECIAL_MASK = MOVE_CASTLE_MASK | MOVE_PROMOTE_MASK | MOVE_EPTAKE_MASK | MOVE_EPMAKE_MASK; // need extra work in make move
const KEEPER_MASK       = MOVE_CASTLE_MASK | MOVE_PROMOTE_MASK | MOVE_EPTAKE_MASK | MOVE_TOOBJ_MASK;  // futility etc
const MOVE_NOISY_MASK   = MOVE_TOOBJ_MASK | MOVE_EPTAKE_MASK;

const PAWN   = 1;
const KNIGHT = 2;
const BISHOP = 3;
const ROOK   = 4;
const QUEEN  = 5;
const KING   = 6;
const EDGE   = 7;
const NO_Z   = 8;

const W_PAWN   = PAWN;
const W_KNIGHT = KNIGHT;
const W_BISHOP = BISHOP;
const W_ROOK   = ROOK;
const W_QUEEN  = QUEEN;
const W_KING   = KING;

const B_PAWN   = PAWN   | BLACK;
const B_KNIGHT = KNIGHT | BLACK;
const B_BISHOP = BISHOP | BLACK;
const B_ROOK   = ROOK   | BLACK;
const B_QUEEN  = QUEEN  | BLACK;
const B_KING   = KING   | BLACK;

//
// E === EMPTY, X = OFF BOARD, - === CANNOT HAPPEN
//
//               0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15
//               E  W  W  W  W  W  W  X  -  B  B  B  B  B  B  -
//               E  P  N  B  R  Q  K  X  -  P  N  B  R  Q  K  -
//

const IS_O      = new Uint8Array([0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0]);
const IS_E      = new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const IS_OE     = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0]);

const IS_P      = new Uint8Array([0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]);
const IS_N      = new Uint8Array([0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
const IS_NBRQKE = new Uint8Array([1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0]);
const IS_RQKE   = new Uint8Array([1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0]);
const IS_QKE    = new Uint8Array([1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0]);
const IS_K      = new Uint8Array([0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0]);
const IS_KN     = new Uint8Array([0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0]);

const IS_W      = new Uint8Array([0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const IS_WNK    = new Uint8Array([0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const IS_WE     = new Uint8Array([1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const IS_WP     = new Uint8Array([0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const IS_WN     = new Uint8Array([0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const IS_WNBRQ  = new Uint8Array([0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const IS_WB     = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const IS_WBQ    = new Uint8Array([0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const IS_WRQ    = new Uint8Array([0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const IS_WQ     = new Uint8Array([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

const IS_B      = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0]);
const IS_BNK    = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0]);
const IS_BE     = new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0]);
const IS_BP     = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]);
const IS_BN     = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
const IS_BNBRQ  = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0]);
const IS_BB     = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]);
const IS_BBQ    = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0]);
const IS_BRQ    = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0]);
const IS_BQ     = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]);

const W_PROMOTE_SQ = new Uint8Array([0,26, 27, 28, 29, 30, 31, 32, 33]);
const B_PROMOTE_SQ = new Uint8Array([0,110,111,112,113,114,115,116,117]);

const A1 = 110, B1 = 111, C1 = 112, D1 = 113, E1 = 114, F1 = 115, G1 = 116, H1 = 117;
const A8 = 26,  B8 = 27,  C8 = 28,  D8 = 29,  E8 = 30,  F8 = 31,  G8 = 32,  H8 = 33;

const SQA1 = 110, SQB1 = 111, SQC1 = 112, SQD1 = 113, SQE1 = 114, SQF1 = 115, SQG1 = 116, SQH1 = 117;
const SQA2 = 98,  SQB2 = 99,  SQC2 = 100, SQD2 = 101, SQE2 = 102, SQF2 = 103, SQG2 = 104, SQH2 = 105;
const SQA3 = 86,  SQB3 = 87,  SQC3 = 88,  SQD3 = 89,  SQE3 = 90,  SQF3 = 91,  SQG3 = 92,  SQH3 = 93;
const SQA4 = 74,  SQB4 = 75,  SQC4 = 76,  SQD4 = 77,  SQE4 = 78,  SQF4 = 79,  SQG4 = 80,  SQH4 = 81;
const SQA5 = 62,  SQB5 = 63,  SQC5 = 64,  SQD5 = 65,  SQE5 = 66,  SQF5 = 67,  SQG5 = 68,  SQH5 = 69;
const SQA6 = 50,  SQB6 = 51,  SQC6 = 52,  SQD6 = 53,  SQE6 = 54,  SQF6 = 55,  SQG6 = 56,  SQH6 = 57;
const SQA7 = 38,  SQB7 = 39,  SQC7 = 40,  SQD7 = 41,  SQE7 = 42,  SQF7 = 43,  SQG7 = 44,  SQH7 = 45;
const SQA8 = 26,  SQB8 = 27,  SQC8 = 28,  SQD8 = 29,  SQE8 = 30,  SQF8 = 31,  SQG8 = 32,  SQH8 = 33;

const MOVE_E1G1 = MOVE_CASTLE_MASK | (W_KING << MOVE_FROBJ_BITS) | (E1 << MOVE_FR_BITS) | G1;
const MOVE_E1C1 = MOVE_CASTLE_MASK | (W_KING << MOVE_FROBJ_BITS) | (E1 << MOVE_FR_BITS) | C1;
const MOVE_E8G8 = MOVE_CASTLE_MASK | (B_KING << MOVE_FROBJ_BITS) | (E8 << MOVE_FR_BITS) | G8;
const MOVE_E8C8 = MOVE_CASTLE_MASK | (B_KING << MOVE_FROBJ_BITS) | (E8 << MOVE_FR_BITS) | C8;

const QPRO = (QUEEN-2)  << MOVE_PROMAS_BITS | MOVE_PROMOTE_MASK;
const RPRO = (ROOK-2)   << MOVE_PROMAS_BITS | MOVE_PROMOTE_MASK;
const BPRO = (BISHOP-2) << MOVE_PROMAS_BITS | MOVE_PROMOTE_MASK;
const NPRO = (KNIGHT-2) << MOVE_PROMAS_BITS | MOVE_PROMOTE_MASK;

const WHITE_RIGHTS_KING  = 0x00000001;
const WHITE_RIGHTS_QUEEN = 0x00000002;
const BLACK_RIGHTS_KING  = 0x00000004;
const BLACK_RIGHTS_QUEEN = 0x00000008;
const WHITE_RIGHTS       = WHITE_RIGHTS_QUEEN | WHITE_RIGHTS_KING;
const BLACK_RIGHTS       = BLACK_RIGHTS_QUEEN | BLACK_RIGHTS_KING;

const MASK_RIGHTS = new Int8Array([
  15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
  15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
  15, 15, ~8, 15, 15, 15, ~12,15, 15, ~4, 15, 15,
  15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
  15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
  15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
  15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
  15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
  15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
  15, 15, ~2, 15, 15, 15, ~3, 15, 15, ~1, 15, 15,
  15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
  15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15
]);

const RANK_VECTOR = new Uint8Array([0,1,2,2,4,5,6]);  // for move sorting

const B88 = new Uint8Array([
  26, 27, 28, 29, 30, 31, 32, 33,
  38, 39, 40, 41, 42, 43, 44, 45,
  50, 51, 52, 53, 54, 55, 56, 57,
  62, 63, 64, 65, 66, 67, 68, 69,
  74, 75, 76, 77, 78, 79, 80, 81,
  86, 87, 88, 89, 90, 91, 92, 93,
  98, 99, 100,101,102,103,104,105,
  110,111,112,113,114,115,116,117
]);

const COORDS = [
  '??', '??', '??', '??', '??', '??', '??', '??', '??', '??', '??', '??',
  '??', '??', '??', '??', '??', '??', '??', '??', '??', '??', '??', '??',
  '??', '??', 'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8', '??', '??',
  '??', '??', 'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7', '??', '??',
  '??', '??', 'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6', '??', '??',
  '??', '??', 'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5', '??', '??',
  '??', '??', 'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4', '??', '??',
  '??', '??', 'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3', '??', '??',
  '??', '??', 'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2', '??', '??',
  '??', '??', 'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1', '??', '??',
  '??', '??', '??', '??', '??', '??', '??', '??', '??', '??', '??', '??',
  '??', '??', '??', '??', '??', '??', '??', '??', '??', '??', '??', '??'
];

const NAMES    = ['-','P','N','B','R','Q','K','-'];
const PROMOTES = ['n','b','r','q'];                  // 0-3 encoded in move

const RANK = new Uint8Array([
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0,
  0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0,
  0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0,
  0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0,
  0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,
  0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
  0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0,
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);

const FILE = new Uint8Array([
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 0,
  0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 0,
  0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 0,
  0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 0,
  0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 0,
  0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 0,
  0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 0,
  0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

const NULL144 = new Uint8Array(144);

const MAP = Object.seal({
  'p': B_PAWN,
  'n': B_KNIGHT,
  'b': B_BISHOP,
  'r': B_ROOK,
  'q': B_QUEEN,
  'k': B_KING,
  'P': W_PAWN,
  'N': W_KNIGHT,
  'B': W_BISHOP,
  'R': W_ROOK,
  'Q': W_QUEEN,
  'K': W_KING
});

const UMAP = Object.seal({
  9:  'p',
  10: 'n',
  11: 'b',
  12: 'r',
  13: 'q',
  14: 'k',
  1:  'P',
  2:  'N',
  3:  'B',
  4:  'R',
  5:  'Q',
  6:  'K'
});

const RANK2W = new Uint8Array([
  0, 0, 0, 0,  0,  0,  0,  0,  0,  0, 0, 0,
  0, 0, 0, 0,  0,  0,  0,  0,  0,  0, 0, 0,
  0, 0, 7, 14, 21, 28, 28, 21, 14, 7, 0, 0,
  0, 0, 6, 12, 18, 24, 24, 18, 12, 6, 0, 0,
  0, 0, 5, 10, 15, 20, 20, 15, 10, 5, 0, 0,
  0, 0, 4, 8,  12, 16, 16, 12, 8,  4, 0, 0,
  0, 0, 3, 6,  9,  12, 12, 9,  6,  3, 0, 0,
  0, 0, 2, 4,  6,  8,  8,  6,  4,  2, 0, 0,
  0, 0, 1, 2,  3,  4,  4,  3,  2,  1, 0, 0,
  0, 0, 0, 0,  0,  0,  0,  0,  0,  0, 0, 0,
  0, 0, 0, 0,  0,  0,  0,  0,  0,  0, 0, 0,
  0, 0, 0, 0,  0,  0,  0,  0,  0,  0, 0, 0
]);

const RANK2B = new Uint8Array([
  0, 0, 0, 0,  0,  0,  0,  0,  0,  0, 0, 0,
  0, 0, 0, 0,  0,  0,  0,  0,  0,  0, 0, 0,
  0, 0, 0, 0,  0,  0,  0,  0,  0,  0, 0, 0,
  0, 0, 1, 2,  3,  4,  4,  3,  2,  1, 0, 0,
  0, 0, 2, 4,  6,  8,  8,  6,  4,  2, 0, 0,
  0, 0, 3, 6,  9,  12, 12, 9,  6,  3, 0, 0,
  0, 0, 4, 8,  12, 16, 16, 12, 8,  4, 0, 0,
  0, 0, 5, 10, 15, 20, 20, 15, 10, 5, 0, 0,
  0, 0, 6, 12, 18, 24, 24, 18, 12, 6, 0, 0,
  0, 0, 7, 14, 21, 28, 28, 21, 14, 7, 0, 0,
  0, 0, 0, 0,  0,  0,  0,  0,  0,  0, 0, 0,
  0, 0, 0, 0,  0,  0,  0,  0,  0,  0, 0, 0
]);

const CENTRE = new Uint8Array([
  0, 0, 0, 0,  0,  0,  0,  0,  0,  0, 0, 0,
  0, 0, 0, 0,  0,  0,  0,  0,  0,  0, 0, 0,
  0, 0, 1, 2,  3,  4,  4,  3,  2,  1, 0, 0,
  0, 0, 2, 4,  6,  8,  8,  6,  4,  2, 0, 0,
  0, 0, 3, 6,  9,  12, 12, 9,  6,  3, 0, 0,
  0, 0, 4, 8,  12, 16, 16, 12, 8,  4, 0, 0,
  0, 0, 4, 8,  12, 16, 16, 12, 8,  4, 0, 0,
  0, 0, 3, 6,  9,  12, 12, 9,  6,  3, 0, 0,
  0, 0, 2, 4,  6,  8,  8,  6,  4,  2, 0, 0,
  0, 0, 1, 2,  3,  4,  4,  3,  2,  1, 0, 0,
  0, 0, 0, 0,  0,  0,  0,  0,  0,  0, 0, 0,
  0, 0, 0, 0,  0,  0,  0,  0,  0,  0, 0, 0
]);

const SLIDE_SCORES = [
  NULL144,
  RANK2W, CENTRE, CENTRE, CENTRE, CENTRE, CENTRE,
  NULL144,
  NULL144,
  RANK2B, CENTRE, CENTRE, CENTRE, CENTRE, CENTRE
];

const ALIGNED = Array(144);

//{{{  bench fens

const BENCHFENS = [

"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkQ - 0 1",
"r3k2r/2pb1ppp/2pp1q2/p7/1nP1B3/1P2P3/P2N1PPP/R2QK2R w KQkq a6 0 14",
"4rrk1/2p1b1p1/p1p3q1/4p3/2P2n1p/1P1NR2P/PB3PP1/3R1QK1 b - - 2 24",
"r3qbrk/6p1/2b2pPp/p3pP1Q/PpPpP2P/3P1B2/2PB3K/R5R1 w - - 16 42",
"6k1/1R3p2/6p1/2Bp3p/3P2q1/P7/1P2rQ1K/5R2 b - - 4 44",
"8/8/1p2k1p1/3p3p/1p1P1P1P/1P2PK2/8/8 w - - 3 54",
"7r/2p3k1/1p1p1qp1/1P1Bp3/p1P2r1P/P7/4R3/Q4RK1 w - - 0 36",
"r1bq1rk1/pp2b1pp/n1pp1n2/3P1p2/2P1p3/2N1P2N/PP2BPPP/R1BQ1RK1 b - - 2 10",
"3r3k/2r4p/1p1b3q/p4P2/P2Pp3/1B2P3/3BQ1RP/6K1 w - - 3 87",
"2r4r/1p4k1/1Pnp4/3Qb1pq/8/4BpPp/5P2/2RR1BK1 w - - 0 42",
"4q1bk/6b1/7p/p1p4p/PNPpP2P/KN4P1/3Q4/4R3 b - - 0 37",
"2q3r1/1r2pk2/pp3pp1/2pP3p/P1Pb1BbP/1P4Q1/R3NPP1/4R1K1 w - - 2 34",
"1r2r2k/1b4q1/pp5p/2pPp1p1/P3Pn2/1P1B1Q1P/2R3P1/4BR1K b - - 1 37",
"r3kbbr/pp1n1p1P/3ppnp1/q5N1/1P1pP3/P1N1B3/2P1QP2/R3KB1R b KQkq b3 0 17",
"8/6pk/2b1Rp2/3r4/1R1B2PP/P5K1/8/2r5 b - - 16 42",
"1r4k1/4ppb1/2n1b1qp/pB4p1/1n1BP1P1/7P/2PNQPK1/3RN3 w - - 8 29",
"8/p2B4/PkP5/4p1pK/4Pb1p/5P2/8/8 w - - 29 68",
"3r4/ppq1ppkp/4bnp1/2pN4/2P1P3/1P4P1/PQ3PBP/R4K2 b - - 2 20",
"5rr1/4n2k/4q2P/P1P2n2/3B1p2/4pP2/2N1P3/1RR1K2Q w - - 1 49",
"1r5k/2pq2p1/3p3p/p1pP4/4QP2/PP1R3P/6PK/8 w - - 1 51",
"q5k1/5ppp/1r3bn1/1B6/P1N2P2/BQ2P1P1/5K1P/8 b - - 2 34",
"r1b2k1r/5n2/p4q2/1ppn1Pp1/3pp1p1/NP2P3/P1PPBK2/1RQN2R1 w - - 0 22",
"r1bqk2r/pppp1ppp/5n2/4b3/4P3/P1N5/1PP2PPP/R1BQKB1R w KQkq - 0 5",
"r1bqr1k1/pp1p1ppp/2p5/8/3N1Q2/P2BB3/1PP2PPP/R3K2n b Q - 1 12",
"r1bq2k1/p4r1p/1pp2pp1/3p4/1P1B3Q/P2B1N2/2P3PP/4R1K1 b - - 2 19",
"r4qk1/6r1/1p4p1/2ppBbN1/1p5Q/P7/2P3PP/5RK1 w - - 2 25",
"r7/6k1/1p6/2pp1p2/7Q/8/p1P2K1P/8 w - - 0 32",
"r3k2r/ppp1pp1p/2nqb1pn/3p4/4P3/2PP4/PP1NBPPP/R2QK1NR w KQkq - 1 5",
"3r1rk1/1pp1pn1p/p1n1q1p1/3p4/Q3P3/2P5/PP1NBPPP/4RRK1 w - - 0 12",
"5rk1/1pp1pn1p/p3Brp1/8/1n6/5N2/PP3PPP/2R2RK1 w - - 2 20",
"8/1p2pk1p/p1p1r1p1/3n4/8/5R2/PP3PPP/4R1K1 b - - 3 27",
"8/4pk2/1p1r2p1/p1p4p/Pn5P/3R4/1P3PP1/4RK2 w - - 1 33",
"8/5k2/1pnrp1p1/p1p4p/P6P/4R1PK/1P3P2/4R3 b - - 1 38",
"8/8/1p1kp1p1/p1pr1n1p/P6P/1R4P1/1P3PK1/1R6 b - - 15 45",
"8/8/1p1k2p1/p1prp2p/P2n3P/6P1/1P1R1PK1/4R3 b - - 5 49",
"8/8/1p4p1/p1p2k1p/P2npP1P/4K1P1/1P6/3R4 w - - 6 54",
"8/8/1p4p1/p1p2k1p/P2n1P1P/4K1P1/1P6/6R1 b - - 6 59",
"8/5k2/1p4p1/p1pK3p/P2n1P1P/6P1/1P6/4R3 b - - 14 63",
"8/1R6/1p1K1kp1/p6p/P1p2P1P/6P1/1Pn5/8 w - - 0 67",
"1rb1rn1k/p3q1bp/2p3p1/2p1p3/2P1P2N/PP1RQNP1/1B3P2/4R1K1 b - - 4 23",
"4rrk1/pp1n1pp1/q5p1/P1pP4/2n3P1/7P/1P3PB1/R1BQ1RK1 w - - 3 22",
"r2qr1k1/pb1nbppp/1pn1p3/2ppP3/3P4/2PB1NN1/PP3PPP/R1BQR1K1 w - - 4 12",
"2r2k2/8/4P1R1/1p6/8/P4K1N/7b/2B5 b - - 0 55",
"6k1/5pp1/8/2bKP2P/2P5/p4PNb/B7/8 b - - 1 44",
"2rqr1k1/1p3p1p/p2p2p1/P1nPb3/2B1P3/5P2/1PQ2NPP/R1R4K w - - 3 25",
"r1b2rk1/p1q1ppbp/6p1/2Q5/8/4BP2/PPP3PP/2KR1B1R b - - 2 14",
"6r1/5k2/p1b1r2p/1pB1p1p1/1Pp3PP/2P1R1K1/2P2P2/3R4 w - - 1 36",
"rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2",
"2rr2k1/1p4bp/p1q1p1p1/4Pp1n/2PB4/1PN3P1/P3Q2P/2RR2K1 w - f6 0 20",
"3br1k1/p1pn3p/1p3n2/5pNq/2P1p3/1PN3PP/P2Q1PB1/4R1K1 w - - 0 23",
"2r2b2/5p2/5k2/p1r1pP2/P2pB3/1P3P2/K1P3R1/7R w - - 23 93"
];

//}}}
//{{{  perft fens

const PERFTFENS = [
  ['fen rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR             w KQkq -  0 1', 2, 400,       'cpw-pos1-2'],
  ['fen 4k3/8/8/8/8/8/R7/R3K2R                                  w Q    -  0 1', 3, 4729,      'castling-2'],
  ['fen 4k3/8/8/8/8/8/R7/R3K2R                                  w K    -  0 1', 3, 4686,      'castling-3'],
  ['fen 4k3/8/8/8/8/8/R7/R3K2R                                  w -    -  0 1', 3, 4522,      'castling-4'],
  ['fen r3k2r/r7/8/8/8/8/8/4K3                                  b kq   -  0 1', 3, 4893,      'castling-5'],
  ['fen r3k2r/r7/8/8/8/8/8/4K3                                  b q    -  0 1', 3, 4729,      'castling-6'],
  ['fen r3k2r/r7/8/8/8/8/8/4K3                                  b k    -  0 1', 3, 4686,      'castling-7'],
  ['fen r3k2r/r7/8/8/8/8/8/4K3                                  b -    -  0 1', 3, 4522,      'castling-8'],
  ['fen rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR             w KQkq -  0 1', 0, 1,         'cpw-pos1-0'],
  ['fen rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR             w KQkq -  0 1', 1, 20,        'cpw-pos1-1'],
  ['fen rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR             w KQkq -  0 1', 3, 8902,      'cpw-pos1-3'],
  ['fen rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR             w KQkq -  0 1', 4, 197281,    'cpw-pos1-4'],
  ['fen rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR             w KQkq -  0 1', 5, 4865609,   'cpw-pos1-5'],
  ['fen rnbqkb1r/pp1p1ppp/2p5/4P3/2B5/8/PPP1NnPP/RNBQK2R        w KQkq -  0 1', 1, 42,        'cpw-pos5-1'],
  ['fen rnbqkb1r/pp1p1ppp/2p5/4P3/2B5/8/PPP1NnPP/RNBQK2R        w KQkq -  0 1', 2, 1352,      'cpw-pos5-2'],
  ['fen rnbqkb1r/pp1p1ppp/2p5/4P3/2B5/8/PPP1NnPP/RNBQK2R        w KQkq -  0 1', 3, 53392,     'cpw-pos5-3'],
  ['fen r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -  0 1', 1, 48,        'cpw-pos2-1'],
  ['fen r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -  0 1', 2, 2039,      'cpw-pos2-2'],
  ['fen r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -  0 1', 3, 97862,     'cpw-pos2-3'],
  ['fen 8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8                         w -    -  0 1', 5, 674624,    'cpw-pos3-5'],
  ['fen n1n5/PPPk4/8/8/8/8/4Kppp/5N1N                           b -    -  0 1', 1, 24,        'prom-1    '],
  ['fen 8/5bk1/8/2Pp4/8/1K6/8/8                                 w -    d6 0 1', 6, 824064,    'ccc-1     '],
  ['fen 8/8/1k6/8/2pP4/8/5BK1/8                                 b -    d3 0 1', 6, 824064,    'ccc-2     '],
  ['fen 8/8/1k6/2b5/2pP4/8/5K2/8                                b -    d3 0 1', 6, 1440467,   'ccc-3     '],
  ['fen 8/5k2/8/2Pp4/2B5/1K6/8/8                                w -    d6 0 1', 6, 1440467,   'ccc-4     '],
  ['fen 5k2/8/8/8/8/8/8/4K2R                                    w K    -  0 1', 6, 661072,    'ccc-5     '],
  ['fen 4k2r/8/8/8/8/8/8/5K2                                    b k    -  0 1', 6, 661072,    'ccc-6     '],
  ['fen 3k4/8/8/8/8/8/8/R3K3                                    w Q    -  0 1', 6, 803711,    'ccc-7     '],
  ['fen r3k3/8/8/8/8/8/8/3K4                                    b q    -  0 1', 6, 803711,    'ccc-8     '],
  ['fen r3k2r/1b4bq/8/8/8/8/7B/R3K2R                            w KQkq -  0 1', 4, 1274206,   'ccc-9     '],
  ['fen r3k2r/7b/8/8/8/8/1B4BQ/R3K2R                            b KQkq -  0 1', 4, 1274206,   'ccc-10    '],
  ['fen r3k2r/8/3Q4/8/8/5q2/8/R3K2R                             b KQkq -  0 1', 4, 1720476,   'ccc-11    '],
  ['fen r3k2r/8/5Q2/8/8/3q4/8/R3K2R                             w KQkq -  0 1', 4, 1720476,   'ccc-12    '],
  ['fen 2K2r2/4P3/8/8/8/8/8/3k4                                 w -    -  0 1', 6, 3821001,   'ccc-13    '],
  ['fen 3K4/8/8/8/8/8/4p3/2k2R2                                 b -    -  0 1', 6, 3821001,   'ccc-14    '],
  ['fen 8/8/1P2K3/8/2n5/1q6/8/5k2                               b -    -  0 1', 5, 1004658,   'ccc-15    '],
  ['fen 5K2/8/1Q6/2N5/8/1p2k3/8/8                               w -    -  0 1', 5, 1004658,   'ccc-16    '],
  ['fen 4k3/1P6/8/8/8/8/K7/8                                    w -    -  0 1', 6, 217342,    'ccc-17    '],
  ['fen 8/k7/8/8/8/8/1p6/4K3                                    b -    -  0 1', 6, 217342,    'ccc-18    '],
  ['fen 8/P1k5/K7/8/8/8/8/8                                     w -    -  0 1', 6, 92683,     'ccc-19    '],
  ['fen 8/8/8/8/8/k7/p1K5/8                                     b -    -  0 1', 6, 92683,     'ccc-20    '],
  ['fen K1k5/8/P7/8/8/8/8/8                                     w -    -  0 1', 6, 2217,      'ccc-21    '],
  ['fen 8/8/8/8/8/p7/8/k1K5                                     b -    -  0 1', 6, 2217,      'ccc-22    '],
  ['fen 8/k1P5/8/1K6/8/8/8/8                                    w -    -  0 1', 7, 567584,    'ccc-23    '],
  ['fen 8/8/8/8/1k6/8/K1p5/8                                    b -    -  0 1', 7, 567584,    'ccc-24    '],
  ['fen 8/8/2k5/5q2/5n2/8/5K2/8                                 b -    -  0 1', 4, 23527,     'ccc-25    '],
  ['fen 8/5k2/8/5N2/5Q2/2K5/8/8                                 w -    -  0 1', 4, 23527,     'ccc-26    '],
  ['fen rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR             w KQkq -  0 1', 6, 119060324, 'cpw-pos1-6'],
  ['fen 8/p7/8/1P6/K1k3p1/6P1/7P/8                              w -    -  0 1', 8, 8103790,   'jvm-7     '],
  ['fen n1n5/PPPk4/8/8/8/8/4Kppp/5N1N                           b -    -  0 1', 6, 71179139,  'jvm-8     '],
  ['fen r3k2r/p6p/8/B7/1pp1p3/3b4/P6P/R3K2R                     w KQkq -  0 1', 6, 77054993,  'jvm-9     '],
  ['fen 8/5p2/8/2k3P1/p3K3/8/1P6/8                              b -    -  0 1', 8, 64451405,  'jvm-11    '],
  ['fen r3k2r/pb3p2/5npp/n2p4/1p1PPB2/6P1/P2N1PBP/R3K2R         w KQkq -  0 1', 5, 29179893,  'jvm-12    '],
  ['fen 8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8                         w -    -  0 1', 7, 178633661, 'jvm-10    '],
  ['fen r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -  0 1', 5, 193690690, 'jvm-6     '],
  ['fen 8/2pkp3/8/RP3P1Q/6B1/8/2PPP3/rb1K1n1r                   w -    -  0 1', 6, 181153194, 'ob1       '],
  ['fen rnbqkb1r/ppppp1pp/7n/4Pp2/8/8/PPPP1PPP/RNBQKBNR         w KQkq f6 0 1', 6, 244063299, 'jvm-5     '],
  ['fen 8/2ppp3/8/RP1k1P1Q/8/8/2PPP3/rb1K1n1r                   w -    -  0 1', 6, 205552081, 'ob2       '],
  ['fen 8/8/3q4/4r3/1b3n2/8/3PPP2/2k1K2R                        w K    -  0 1', 6, 207139531, 'ob3       '],
  ['fen 4r2r/RP1kP1P1/3P1P2/8/8/3ppp2/1p4p1/4K2R                b K    -  0 1', 6, 314516438, 'ob4       '],
  ['fen r3k2r/8/8/8/3pPp2/8/8/R3K1RR                            b KQkq e3 0 1', 6, 485647607, 'jvm-1     '],
  ['fen 8/3K4/2p5/p2b2r1/5k2/8/8/1q6                            b -    -  0 1', 7, 493407574, 'jvm-4     '],
  ['fen r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1   w kq   -  0 1', 6, 706045033, 'jvm-2     '],
  ['fen r6r/1P4P1/2kPPP2/8/8/3ppp2/1p4p1/R3K2R                  w KQ   -  0 1', 6, 975944981, 'ob5       ']
];

//}}}

//}}}
//{{{  utilities

//{{{  seal

function seal (o) {
}

//}}}
//{{{  myround

function myround(x) {
  return Math.sign(x) * Math.round(Math.abs(x));
}

//}}}
//{{{  now

function now() {
  return performance.now() | 0;
}

//}}}

//}}}
//{{{  nodes

//{{{  nodeStruct

function nodeStruct () {

  this.ply             = 0;
  this.childNode       = null;
  this.parentNode      = null;
  this.grandparentNode = null;

  this.moves  = new Uint32Array(MAX_MOVES);
  this.ranks  = new Uint32Array(MAX_MOVES);
  this.moves2 = new Uint32Array(MAX_MOVES);
  this.ranks2 = new Uint32Array(MAX_MOVES);

  this.killer1     = 0;
  this.killer2     = 0;
  this.mateKiller  = 0;
  this.stage       = 0;
  this.numMoves    = 0;
  this.numMoves2   = 0;
  this.sortedIndex = 0;
  this.hashMove    = 0;
  this.hashEval    = 0;
  this.base        = 0;
  this.inCheck     = 0;
  this.ev          = 0;

  this.rights = 0;
  this.ep     = 0;
  this.repLo  = 0;
  this.repHi  = 0;
  this.loHash = 0;
  this.hiHash = 0;

  this.net_h1_a = new Int32Array(NET_H1_SIZE);
  this.net_h2_a = new Int32Array(NET_H1_SIZE);

  this.toZ = 0;
  this.frZ = 0;
  this.epZ = 0;

  this.pv    = new Uint32Array(MAX_MOVES);
  this.pvLen = 0;

}

//}}}

//{{{  initNode

function initNode (node) {

  node.killer1     = 0;
  node.killer2     = 0;
  node.mateKiller  = 0;
  node.numMoves    = 0;
  node.sortedIndex = 0;
  node.hashMove    = 0;
  node.base        = 0;
  node.inCheck     = 0;

  node.toZ = 0;
  node.frZ = 0;
  node.epZ = 0;

}

//}}}
//{{{  cache

function cache (node) {

  node.rights = bdRights;
  node.ep     = bdEp;
  node.repLo  = repLo;
  node.repHi  = repHi;
  node.loHash = loHash;
  node.hiHash = hiHash;

  node.net_h1_a.set(net_h1_a);
  node.net_h2_a.set(net_h2_a);

}

//}}}
//{{{  uncacheA

function uncacheA (node) {

  bdRights = node.rights;
  bdEp     = node.ep;
  repLo    = node.repLo;
  repHi    = node.repHi;
  loHash   = node.loHash;
  hiHash   = node.hiHash;

}

//}}}
//{{{  uncacheB

function uncacheB (node) {

  net_h1_a.set(node.net_h1_a);
  net_h2_a.set(node.net_h2_a);

}

//}}}
//{{{  getNextMove

function getNextMove (node) {

  switch (node.stage) {

    case 0: {
      //{{{  node.moves
      
      if (node.sortedIndex !== node.numMoves) {
      
        let maxM = 0;
      
        const moves = node.moves;
        const ranks = node.ranks;
        const next  = node.sortedIndex;
        const num   = node.numMoves;
      
        let maxR = -INFINITY;
        let maxI = 0;
      
        for (let i=next; i < num; i++) {
          if (ranks[i] > maxR) {
            maxR = ranks[i];
            maxI = i;
          }
        }
      
        maxM = moves[maxI]
      
        moves[maxI] = moves[next];
        ranks[maxI] = ranks[next];
      
        node.base = maxR;
      
        node.sortedIndex++;
      
        return maxM;
      
      }
      
      else {
      
        node.stage++;
        node.sortedIndex = 0;
      
        rankSlides(node);
      
      }
      
      //}}}
    }

    case 1: {
      //{{{  node.moves2
      
      if (node.sortedIndex !== node.numMoves2) {
      
        let maxM = 0;
      
        const moves = node.moves2;
        const ranks = node.ranks2;
        const next  = node.sortedIndex;
        const num   = node.numMoves2;
      
        let maxR = -INFINITY;
        let maxI = 0;
      
        for (let i=next; i < num; i++) {
          if (ranks[i] > maxR) {
            maxR = ranks[i];
            maxI = i;
          }
        }
      
        maxM = moves[maxI]
      
        moves[maxI] = moves[next];
        ranks[maxI] = ranks[next];
      
        node.base = maxR;
      
        node.sortedIndex++;
      
        return maxM;
      
      }
      
      else {
      
        return 0;
      
      }
      
      //}}}
    }

  }
}

//}}}
//{{{  rankSlides

function rankSlides (node) {

  for (let i=0; i < node.numMoves2; i++) {

    const move  = node.moves2[i];
    const to    = (move & MOVE_TO_MASK)    >>> MOVE_TO_BITS;
    const frObj = (move & MOVE_FROBJ_MASK) >>> MOVE_FROBJ_BITS;

    const hisScore = objHistory[(frObj << 8) + to];

    if (hisScore === BASE_HISSLIDE) {

      const fr          = (move & MOVE_FR_MASK) >>> MOVE_FR_BITS;
      const slideScores = SLIDE_SCORES[frObj];

      node.ranks2[i] = BASE_SLIDE + slideScores[to] - slideScores[fr];

    }

    else {

      node.ranks2[i] = hisScore;

    }
  }
}

//}}}
//{{{  addSlide

function addSlide (node, move) {

  const m = move & MOVE_CLEAN_MASK;

  if (m === node.hashMove) {
    node.moves[node.numMoves]   = move;
    node.ranks[node.numMoves++] = BASE_HASH;
  }

  else if (m === node.mateKiller) {
    node.moves[node.numMoves]   = move;
    node.ranks[node.numMoves++] = BASE_MATEKILLER;
  }

  else if (m === node.killer1) {
    node.moves[node.numMoves]   = move;
    node.ranks[node.numMoves++] = BASE_MYKILLERS + 1;
  }

  else if (m === node.killer2) {
    node.moves[node.numMoves]   = move;
    node.ranks[node.numMoves++] = BASE_MYKILLERS;
  }

  else if (node.grandparentNode !== null && m === node.grandparentNode.killer1) {
    node.moves[node.numMoves]   = move;
    node.ranks[node.numMoves++] = BASE_GPKILLERS + 1;
  }

  else if (node.grandparentNode !== null && m === node.grandparentNode.killer2) {
    node.moves[node.numMoves]   = move;
    node.ranks[node.numMoves++] = BASE_GPKILLERS;
  }

  else {
    node.moves2[node.numMoves2++] = move;  // defer ranking until later
  }

}

//}}}
//{{{  addCastle

function addCastle (node, move) {

  const m = move & MOVE_CLEAN_MASK;

  if (m === node.hashMove) {
    node.moves[node.numMoves]   = move;
    node.ranks[node.numMoves++] = BASE_HASH;
  }

  else if (m === node.mateKiller) {
    node.moves[node.numMoves]   = move;
    node.ranks[node.numMoves++] = BASE_MATEKILLER;
  }

  else if (m === node.killer1) {
    node.moves[node.numMoves]   = move;
    node.ranks[node.numMoves++] = BASE_MYKILLERS + 1;
  }

  else if (m === node.killer2) {
    node.moves[node.numMoves]   = move;
    node.ranks[node.numMoves++] = BASE_MYKILLERS;
  }

  else if (node.grandparentNode !== null && m === node.grandparentNode.killer1) {
    node.moves[node.numMoves]   = move;
    node.ranks[node.numMoves++] = BASE_GPKILLERS + 1;
  }

  else if (node.grandparentNode !== null && m === node.grandparentNode.killer2) {
    node.moves[node.numMoves]   = move;
    node.ranks[node.numMoves++] = BASE_GPKILLERS;
  }

  else {
    node.moves[node.numMoves]   = move;
    node.ranks[node.numMoves++] = BASE_CASTLING;
  }

}

//}}}
//{{{  addCapture

function addCapture (node, move) {

  const m = move & MOVE_CLEAN_MASK;

  if (m === node.hashMove) {
    node.moves[node.numMoves]   = move;
    node.ranks[node.numMoves++] = BASE_HASH;
  }

  else {

    const victim = RANK_VECTOR[((move & MOVE_TOOBJ_MASK) >>> MOVE_TOOBJ_BITS) & PIECE_MASK];
    const attack = RANK_VECTOR[((move & MOVE_FROBJ_MASK) >>> MOVE_FROBJ_BITS) & PIECE_MASK];

    if (victim > attack) {
      node.moves[node.numMoves]   = move;
      node.ranks[node.numMoves++] = BASE_GOODTAKES + (victim << 6) - attack;
    }

    else if (victim === attack) {
      node.moves[node.numMoves]   = move;
      node.ranks[node.numMoves++] = BASE_EVENTAKES + (victim << 6) - attack;
    }

    else {

      if (m === node.mateKiller) {
        node.moves[node.numMoves]   = move;
        node.ranks[node.numMoves++] = BASE_MATEKILLER;
      }

      else if (m === node.killer1) {
        node.moves[node.numMoves]   = move;
        node.ranks[node.numMoves++] = BASE_MYKILLERS + 1;
      }

      else if (m === node.killer2) {
        node.moves[node.numMoves]   = move;
        node.ranks[node.numMoves++] = BASE_MYKILLERS;
      }

      else if (node.grandparentNode !== null && m === node.grandparentNode.killer1) {
        node.moves[node.numMoves]   = move;
        node.ranks[node.numMoves++] = BASE_GPKILLERS + 1;
      }

      else if (node.grandparentNode !== null && m === node.grandparentNode.killer2) {
        node.moves[node.numMoves]   = move;
        node.ranks[node.numMoves++] = BASE_GPKILLERS;
      }

      else {
        node.moves[node.numMoves]   = move;
        node.ranks[node.numMoves++] = BASE_BADTAKES + (victim << 6) - attack;
      }

    }
  }
}

//}}}
//{{{  addPromotion

function addPromotion (node, move) {

  const m = move & MOVE_CLEAN_MASK;

  if ((m | QPRO) === node.hashMove) {
    node.moves[node.numMoves]   = move | QPRO;
    node.ranks[node.numMoves++] = BASE_HASH;
  }
  else {
    node.moves[node.numMoves]   = move | QPRO;
    node.ranks[node.numMoves++] = BASE_PROMOTES + QUEEN;
  }

  if ((m | RPRO) === node.hashMove) {
    node.moves[node.numMoves]   = move | RPRO;
    node.ranks[node.numMoves++] = BASE_HASH;
  }
  else {
    node.moves[node.numMoves]   = move | RPRO;
    node.ranks[node.numMoves++] = BASE_PROMOTES + ROOK;
  }

  if ((m | BPRO) === node.hashMove) {
    node.moves[node.numMoves]   = move | BPRO;
    node.ranks[node.numMoves++] = BASE_HASH;
  }
  else {
    node.moves[node.numMoves]   = move | BPRO;
    node.ranks[node.numMoves++] = BASE_PROMOTES + BISHOP;
  }

  if ((m | NPRO) === node.hashMove) {
    node.moves[node.numMoves]   = move | NPRO;
    node.ranks[node.numMoves++] = BASE_HASH;
  }
  else {
    node.moves[node.numMoves]   = move | NPRO;
    node.ranks[node.numMoves++] = BASE_PROMOTES + KNIGHT;
  }

}

//}}}
//{{{  addEPTake

function addEPTake (node, move) {

  const m = move & MOVE_CLEAN_MASK;

  if ((m | MOVE_EPTAKE_MASK) === node.hashMove) {
    node.moves[node.numMoves]   = move | MOVE_EPTAKE_MASK;
    node.ranks[node.numMoves++] = BASE_HASH;
  }

  else {
    node.moves[node.numMoves]   = move | MOVE_EPTAKE_MASK;
    node.ranks[node.numMoves++] = BASE_EPTAKES;
  }

}

//}}}
//{{{  addQMove

function addQMove (node, move) {

  const m = move & MOVE_CLEAN_MASK;
  const n = node.numMoves++;

  node.moves[n] = move;

  if (m === node.hashMove)
    node.ranks[n] = BASE_HASH;

  else if ((move & MOVE_PROMOTE_MASK) !== 0) {
    if ((move & MOVE_NOISY_MASK) !== 0)
      node.ranks[n] = BASE_PROMOTES + ((move & MOVE_PROMAS_MASK) >>> MOVE_PROMAS_BITS) + 8;  // QRBN capture
    else
      node.ranks[n] = BASE_PROMOTES + ((move & MOVE_PROMAS_MASK) >>> MOVE_PROMAS_BITS);      // QRBN slide (allowed in qs)
  }

  else if ((move & MOVE_EPTAKE_MASK) !== 0)
    node.ranks[n] = BASE_EPTAKES;

  else {
    const victim = RANK_VECTOR[((move & MOVE_TOOBJ_MASK) >>> MOVE_TOOBJ_BITS) & PIECE_MASK];
    const attack = RANK_VECTOR[((move & MOVE_FROBJ_MASK) >>> MOVE_FROBJ_BITS) & PIECE_MASK];

    if (victim > attack)
      node.ranks[n] = BASE_GOODTAKES + (victim << 6) - attack;

    else if (victim === attack)
      node.ranks[n] = BASE_EVENTAKES + (victim << 6) - attack;

    else
      node.ranks[n] = BASE_BADTAKES + (victim << 6) - attack;
  }

}

//}}}
//{{{  addQPromotion

function addQPromotion (node, move) {

  addQMove (node, move | (QUEEN-2)  << MOVE_PROMAS_BITS);
  addQMove (node, move | (ROOK-2)   << MOVE_PROMAS_BITS);
  addQMove (node, move | (BISHOP-2) << MOVE_PROMAS_BITS);
  addQMove (node, move | (KNIGHT-2) << MOVE_PROMAS_BITS);

}

//}}}
//{{{  addKiller

function addKiller (node, score, move) {

  move = move & MOVE_CLEAN_MASK;

  if (move === node.hashMove)
    return;

  if ((move & (MOVE_EPTAKE_MASK | MOVE_PROMOTE_MASK)) !== 0)
    return;  // before killers in move ordering.

  if ((move & MOVE_TOOBJ_MASK) !== 0) {

    const victim = RANK_VECTOR[((move & MOVE_TOOBJ_MASK) >>> MOVE_TOOBJ_BITS) & PIECE_MASK];
    const attack = RANK_VECTOR[((move & MOVE_FROBJ_MASK) >>> MOVE_FROBJ_BITS) & PIECE_MASK];

    if (victim >= attack)
      return; // before killers in move ordering.
  }

  if (score >= MINMATE && score <= MATE) {
    node.mateKiller = move;
    if (node.killer1 === move)
      node.killer1 = 0;
    if (node.killer2 === move)
      node.killer2 = 0;
    return;
  }

  if (node.killer1 === move || node.killer2 === move) {
    return;
  }

  if (node.killer1 === 0) {
    node.killer1 = move;
    return;
  }

  if (node.killer2 === 0) {
    node.killer2 = move;
    return;
  }

  const tmp    = node.killer1;
  node.killer1 = move;
  node.killer2 = tmp;

}

//}}}

//}}}
//{{{  search

//{{{  report

function report (units, value, depth) {

  let pvStr = 'pv';
  for (let i=rootNode.pvLen-1; i >= 0; i--)
    pvStr += ' ' + formatMove(rootNode.pv[i]);

  const tim     = now() - statsStartTime;
  const nps     = (statsNodes * 1000) / tim | 0;
  const nodeStr = 'nodes ' + statsNodes + ' time ' + tim + ' nps ' + nps;

  const depthStr = 'depth ' + depth + ' seldepth ' + statsSelDepth;
  const scoreStr = 'score ' + units + ' ' + value;
  const hashStr  = 'hashfull ' + (1000 * ttHashUsed / TTSIZE | 0);

  uciSend('info', depthStr, scoreStr, nodeStr, hashStr, pvStr);

}

//}}}
//{{{  go

function go (maxPly) {

  var lastScore   = 0;
  var lastDepth   = 0;
  var bestMoveStr = '';

  var alpha = 0;
  var beta  = 0;
  var score = 0;
  var delta = 0;
  var depth = 0;

  for (let ply=1; ply <= maxPly; ply++) {

    alpha = -INFINITY;
    beta  = INFINITY;
    delta = 10;

    if (ply >= 4) {
      alpha = Math.max(-INFINITY, score - delta);
      beta  = Math.min(INFINITY,  score + delta);
    }

    depth = ply;

    while (1) {

      score = rootSearch(rootNode, depth, bdTurn, alpha, beta);

      if (statsTimeOut !== 0)
        break;

      lastScore = score;
      lastDepth = depth;

      //{{{  better?
      
      if (score > alpha && score < beta) {
      
        report('cp',score,depth);
      
        if (statsBestMove && statsMaxNodes > 0 && statsNodes >= statsMaxNodes)
          statsTimeOut = 1;
      
        break;
      }
      
      //}}}
      //{{{  mate?
      
      if (Math.abs(score) >= MINMATE && Math.abs(score) <= MATE) {
      
        var mateScore = (MATE - Math.abs(score)) / 2 | 0;
        if (score < 0)
          mateScore = -mateScore;
      
        report('mate',mateScore,depth);
      
        break;
      }
      
      //}}}

      delta += delta/2 | 0;

      //{{{  upper bound?
      
      if (score <= alpha) {
      
        beta  = Math.min(INFINITY, ((alpha + beta) / 2) | 0);
        alpha = Math.max(-INFINITY, alpha - delta);
      
        //report('upperbound',score,depth);
      
        if (!statsMaxNodes)
          statsBestMove = 0;
      }
      
      //}}}
      //{{{  lower bound?
      
      else if (score >= beta) {
      
        beta = Math.min(INFINITY, beta + delta);
      
        //report('lowerbound',score,depth);
      
        depth = Math.max(1,depth-1);
      }
      
      //}}}
    }

    if (statsTimeOut !== 0)
      break;
  }

  bestMoveStr = formatMove(statsBestMove);

  //uciSend('info score cp', statsBestScore);
  uciSend('bestmove',bestMoveStr);

}

//}}}
//{{{  rootSearch

function rootSearch (node, depth, turn, alpha, beta) {

  //{{{  check time
  
  node.pvLen = 0;
  
  if (node.childNode === null) {
    statsTimeOut = 1;
    return 0;
  }
  
  //}}}

  statsNodes++;

  const nextTurn = turn ^ COLOR_MASK;
  const oAlpha   = alpha;
  const inCheck  = isKingAttacked(nextTurn);
  const doLMR    = (depth >= 3) | 0;

  var numLegalMoves = 0;
  var numSlides     = 0;
  var move          = 0;
  var bestMove      = 0;
  var score         = 0;
  var bestScore     = -INFINITY;
  var R             = 0;
  var E             = 0;

  score = ttGet(node, depth, alpha, beta);  // load hash move and hash eval

  node.inCheck = inCheck;
  node.ev      = node.hashEval !== INFINITY ? node.hashEval : evaluate(turn);

  ttUpdateEval(node.ev);
  cache(node);
  genMoves(node, turn);

  while ((move = getNextMove(node)) !== 0) {

    makeMoveA(node, move);

    //{{{  legal?
    
    if ((move & MOVE_LEGAL_MASK) === 0 && isKingAttacked(nextTurn) !== 0) {
    
      unmakeMove(node, move);
    
      uncacheA(node);
    
      continue;
    
    }
    
    //}}}

    makeMoveB();

    numLegalMoves++;
    if (node.base < BASE_LMR)
      numSlides++;

    //{{{  send current move to UCI?
    
    if (statsNodes > 10000000)
      uciSend('info currmove ' + formatMove(move) + ' currmovenumber ' + numLegalMoves);
    
    //}}}

    //{{{  extend/reduce
    
    E = 0;
    R = 0;
    
    if (inCheck !== 0) {
      E = 1;
    }
    
    else if (doLMR !== 0 && numLegalMoves > 4) {
      R = LMR_LOOKUP[(depth << 7) + numSlides];
    }
    
    //}}}

    const nullWindow = (numLegalMoves > 1 || R) | 0;

    score = alpha;

    if (nullWindow !== 0)
      score = -search(node.childNode, depth+E-R-1, nextTurn, -alpha-1, -alpha);

    if (statsTimeOut === 0 && (nullWindow === 0 || score > alpha))
      score = -search(node.childNode, depth+E-1, nextTurn, -beta, -alpha);

    //{{{  unmake move
    
    unmakeMove(node, move);
    
    uncacheA(node);
    uncacheB(node);
    
    //}}}

    if (statsTimeOut !== 0)
      return 0;

    if (score > bestScore) {

      bestScore = score;
      bestMove  = move;

      if (bestScore > alpha) {

        collectPV(node, move);

        alpha = bestScore;

        statsBestMove  = bestMove;
        statsBestScore = bestScore;

        if (bestScore >= beta) {
          addKiller(node, bestScore, bestMove);
          ttPut(TT_BETA, depth, bestScore, bestMove, node.ply, alpha, beta, INFINITY);
          if ((move & MOVE_NOISY_MASK) === 0)
            addHistory(Math.imul(Math.imul(depth,depth),depth), bestMove);
          return bestScore;
        }

        else {
          if ((move & MOVE_NOISY_MASK) === 0)
            addHistory(Math.imul(depth,depth), bestMove);
        }
      }
    }

    else {
      if ((move & MOVE_NOISY_MASK) === 0)
        addHistory(-depth, move);
    }
  }

  if (numLegalMoves === 1)
    statsTimeOut = 1;  // only one legal move so don't waste any more time

  if (numLegalMoves === 0) {
    statsTimeOut = 1;  // silly position
    statsBestMove = 0;
    statsBestScore = 0;
  }

  if (bestScore > oAlpha) {
    ttPut(TT_EXACT, depth, bestScore, bestMove, node.ply, alpha, beta, node.ev);
    return bestScore;
  }
  else {
    ttPut(TT_ALPHA, depth, bestScore, bestMove, node.ply, alpha, beta, node.ev);
    return bestScore;
  }

}

//}}}
//{{{  search

function search (node, depth, turn, alpha, beta) {

  //{{{  check time
  
  node.pvLen = 0;
  
  if (node.childNode === null) {
    statsTimeOut = 1;
    return 0;
  }
  
  checkTime();
  if (statsTimeOut !== 0)
    return 0;
  
  if (node.ply > statsSelDepth)
    statsSelDepth = node.ply;
  
  //}}}

  const nextTurn = turn ^ COLOR_MASK;
  const pvNode   = (beta !== (alpha + 1)) | 0;

  //{{{  mate distance pruning
  
  const matingValue1 = MATE - node.ply;
  
  if (matingValue1 < beta) {
     beta = matingValue1;
     if (alpha >= matingValue1)
       return matingValue1;
  }
  
  const matingValue2 = -MATE + node.ply;
  
  if (matingValue2 > alpha) {
     alpha = matingValue2;
     if (beta <= matingValue2)
       return matingValue2;
  }
  
  //}}}
  //{{{  check for draws
  
  if (isDraw() !== 0)
    return 0;
  
  //}}}

  const inCheck = isKingAttacked(nextTurn);

  //{{{  horizon
  
  if (inCheck === 0 && depth <= 0)
    return qSearch(node, -1, turn, alpha, beta);
  
  depth = Math.max(depth,0);
  
  //}}}

  var score = 0;

  //{{{  try tt
  
  score = ttGet(node, depth, alpha, beta);  // sets/clears node.hashMove and node.hashEval
  
  if (pvNode === 0 && score !== TTSCORE_UNKNOWN)
    return score;
  
  //}}}

  const doBeta = ((pvNode === 0 && inCheck === 0 && betaMate(beta) === 0)) | 0;

  var R = 0;
  var E = 0;

  const ev = node.hashEval !== INFINITY ? node.hashEval : evaluate(turn);

  //{{{  improving
  
  var improving = 0;
  
  if (inCheck === 0) {
    const n2 = node.grandparentNode;
    if (n2 !== null) {
      if (n2.inCheck === 0 && ev > n2.ev)
        improving = 1;
      else if (n2.inCheck !== 0) {
        const n4 = n2.grandparentNode;
        if (n4 !== null && n4.inCheck === 0 && ev > n4.ev)
          improving = 1;
      }
    }
  }
  
  //}}}
  //{{{  beta prune
  
  if (doBeta !== 0 && depth <= 8 && (ev - Math.imul(depth,100)) >= (beta - improving * 50))
    return ev;
  
  //}}}
  //{{{  alpha prune
  
  //if (pvNode === 0 && inCheck === 0 && alphaMate(alpha) === 0 && depth <= 4 && (ev + 3500) <= alpha)
    //return ev;
  
  //}}}

  node.inCheck = inCheck;
  node.ev      = ev;

  cache(node);

  //{{{  NMP
  
  R = 3 + improving;
  
  if (doBeta !== 0 && depth > 2 && ev > beta) {
  
    loHash ^= loEP[bdEp];
    hiHash ^= hiEP[bdEp];
  
    bdEp = 0;
  
    loHash ^= loEP[bdEp];
    hiHash ^= hiEP[bdEp];
  
    loHash ^= loTurn;
    hiHash ^= hiTurn;
  
    repLo = repHi;
  
    score = -search(node.childNode, depth-R-1, nextTurn, -beta, -beta+1);
  
    uncacheA(node);
    uncacheB(node);
  
    if (score >= beta) {
      if (betaMate(score) !== 0)
        score = beta;
      return score;
    }
  
    if (statsTimeOut !== 0)
      return 0;
  }
  
  R = 0;
  
  node.pvLen = 0;
  
  //}}}

  const oAlpha = alpha;
  const doFP   = (inCheck === 0 && depth <= 4) | 0;
  const doLMR  = (inCheck === 0 && depth >= 3) | 0;
  const doLMP  = (pvNode === 0 && inCheck === 0 && depth <= 2) | 0;
  const doIIR  = (node.hashMove === 0 && pvNode !== 0 && depth > 3) | 0;

  var bestScore     = -INFINITY;
  var move          = 0;
  var bestMove      = 0;
  var numLegalMoves = 0;
  var numSlides     = 0;

  //{{{  IIR
  //
  // https://www.talkchess.com/forum3/viewtopic.php?f=7&t=74769
  //
  
  if (doIIR !== 0) {
  
    depth -= 1;
  
  }
  
  //}}}

  ttUpdateEval(ev);
  genMoves(node, turn);

  statsNodes++;

  while ((move = getNextMove(node)) !== 0) {

    //{{{  prune
    
    const prune = (numLegalMoves > 0 && node.base < BASE_LMR && (move & KEEPER_MASK) === 0 && alphaMate(alpha) === 0) | 0;
    
    if (doLMP !== 0 && prune !== 0 && numSlides > Math.imul(depth,5))
      continue;
    
    if (doFP !== 0 && prune !== 0 && (ev + Math.imul(depth,120)) < alpha)
      continue;
    
    //}}}

    makeMoveA(node, move);

    //{{{  legal
    
    if ((move & MOVE_LEGAL_MASK) === 0 && isKingAttacked(nextTurn) !== 0) {
    
      unmakeMove(node, move);
    
      uncacheA(node);
    
      continue;
    
    }
    
    //}}}

    makeMoveB();

    numLegalMoves++;
    if (node.base < BASE_LMR)
      numSlides++;

    //{{{  extend/reduce
    
    E = 0;
    R = 0;
    
    if (inCheck !== 0 && (pvNode !== 0 || depth < 5)) {
      E = 1;
    }
    
    else if (doLMR !== 0 && numLegalMoves > 4) {
      R = LMR_LOOKUP[(depth << 7) + numSlides];
    }
    
    //}}}

    const nullWindow = ((pvNode !== 0 && numLegalMoves > 1) || R) | 0;

    score = alpha;

    if (nullWindow !== 0)
      score = -search(node.childNode, depth+E-R-1, nextTurn, -alpha-1, -alpha);

    if (statsTimeOut === 0 && (nullWindow === 0 || score > alpha))
      score = -search(node.childNode, depth+E-1, nextTurn, -beta, -alpha);

    //{{{  unmake move
    
    unmakeMove(node, move);
    
    uncacheA(node);
    uncacheB(node);
    
    //}}}

    if (statsTimeOut !== 0)
      return 0;

    if (score > bestScore) {

      bestScore = score;
      bestMove  = move;

      if (bestScore > alpha) {

        if (pvNode !== 0)
          collectPV(node, move);

        alpha = bestScore;

        if (bestScore >= beta) {
          addKiller(node, bestScore, bestMove);
          ttPut(TT_BETA, depth, bestScore, bestMove, node.ply, alpha, beta, ev);
          if ((move & MOVE_NOISY_MASK) === 0)
            addHistory(Math.imul(Math.imul(depth,depth),depth), bestMove);
          return bestScore;
        }

        else {
          if ((move & MOVE_NOISY_MASK) === 0)
            addHistory(Math.imul(depth,depth), bestMove);
        }
      }
    }

    else {
      if ((move & MOVE_NOISY_MASK) === 0)
        addHistory(-depth, move);
    }
  }

  //{{{  mate
  
  if (numLegalMoves === 0) {
  
    if (inCheck !== 0) {
      //ttPut(TT_EXACT, depth, -MATE + node.ply, 0, node.ply, alpha, beta, ev);
      return -MATE + node.ply;
    }
  
    else {
      //ttPut(TT_EXACT, depth, 0, 0, node.ply, alpha, beta, ev);
      return 0;
    }
  
  }
  
  //}}}

  if (bestScore > oAlpha) {
    ttPut(TT_EXACT, depth, bestScore, bestMove, node.ply, alpha, beta, ev);
    return bestScore;
  }
  else {
    ttPut(TT_ALPHA, depth, bestScore, bestMove, node.ply, alpha, beta, ev);
    return bestScore;
  }

}

//}}}
//{{{  qsearch

function qSearch (node, depth, turn, alpha, beta) {

  //{{{  check depth
  
  node.pvLen = 0;
  
  if (node.ply > statsSelDepth)
    statsSelDepth = node.ply;
  
  if (node.childNode === null)
    return evaluate(turn);
  
  //}}}

  const nextTurn = turn ^ COLOR_MASK;

  if (isDraw() !== 0)
    return 0;

  var score = ttGet(node, 0, alpha, beta);  // sets/clears node.hashMove and node.hashEval

  if (score !== TTSCORE_UNKNOWN)
    return score;

  const ev = node.hashEval !== INFINITY ? node.hashEval : evaluate(turn);

  if (ev >= beta)
    return ev;
  if (ev >= alpha)
    alpha = ev;

  node.inCheck = 0;  // but not used

  ttUpdateEval(ev);
  cache(node);
  genQMoves(node, turn);

  statsNodes++;

  var numLegalMoves = 0;
  var move          = 0;

  while ((move = getNextMove(node)) !== 0) {

    //{{{  prune?
    
    if ((wCount + bCount) > 6 && (move & MOVE_SPECIAL_MASK) === 0 && ev + 200 + MATERIAL[((move & MOVE_TOOBJ_MASK) >>> MOVE_TOOBJ_BITS) & PIECE_MASK] < alpha)
      continue;
    
    if (quickSee(turn, move) < 0)
      continue;
    
    //}}}

    makeMoveA(node, move);

    //{{{  legal?
    
    if (isKingAttacked(nextTurn) !== 0) {
    
      unmakeMove(node, move);
    
      uncacheA(node);
    
      continue;
    
    }
    
    //}}}

    makeMoveB();

    numLegalMoves++;

    score = -qSearch(node.childNode, depth-1, nextTurn, -beta, -alpha);

    //{{{  unmake move
    
    unmakeMove(node, move);
    
    uncacheA(node);
    uncacheB(node);
    
    //}}}

    //if (statsTimeOut !== 0)
      //return 0;

    if (score > alpha) {
      if (score >= beta) {
        ttPut(TT_BETA, 0, beta, 0, node.ply, alpha, beta, ev);
        return score;
      }
      alpha = score;
    }
  }

  ttPut(TT_ALPHA, 0, alpha, 0, node.ply, alpha, beta, ev);

  return alpha;

}

//}}}
//{{{  perft

function perft (node, depth, turn) {

  if (depth === 0)
    return 1;

  const nextTurn = turn ^ COLOR_MASK;
  const inCheck  = isKingAttacked(nextTurn);

  var totalNodes = 0;
  var move       = 0;

  node.inCheck = inCheck;

  node.rights = bdRights;
  node.ep     = bdEp;

  genMoves(node, turn);

  while ((move = getNextMove(node)) !== 0) {

    makeMoveA(node, move);

    //{{{  legal?
    
    if ((move & MOVE_LEGAL_MASK) === 0 && isKingAttacked(nextTurn) !== 0) {
    
      unmakeMove(node, move);
    
      bdRights = node.rights;
      bdEp     = node.ep;
    
      continue;
    
    }
    
    //}}}

    totalNodes += perft(node.childNode, depth-1, nextTurn);

    //{{{  unmake move
    
    unmakeMove(node, move);
    
    bdRights = node.rights;
    bdEp     = node.ep;
    
    //}}}

  }

  return totalNodes;

}

//}}}
//{{{  datagen
//
// Generate FENs in bullet text format.
// Assumes existence of ./data.
//

function datagen() {

  uciExec("bench warm 0");

  silentMode = 1;

  const nodesLimit     = 5000;  // hard limit is x100
  const gamesLimit     = 100000;
  const bufferSize     = 100000 + Math.random() * 100000;  // randomise writes
  const reportInterval = 10;

  const fileName = 'data/dg_' + BUILD + '_' + NET_NAME + '_' + NET_SB + '_' + Math.trunc(Math.random()*100000000000) + '.txt';

  let result = '';
  let o = '';
  let t = now();
  let totalFens = 0;

  fs.writeFileSync(fileName, o);

  for (let g=0; g < gamesLimit; g++) {
    //{{{  log
    
    if ((g % reportInterval) === 0) {
      console.log(fileName,g,'games',(totalFens/((now()-t)/1000)),'fens/sec');
      t = now();
      totalFens = 0;
    }
    
    //}}}
    //{{{  play game
    
    let randLimit   = 9;
    let reportLimit = 11;
    
    if (Math.random() >= 0.5) {
      randLimit--;
      reportLimit--;
    }
    
    uciExec('u');
    uciExec('p s');
    
    let moves = '';
    let hmc = 0;
    let ply = 0;
    let fens = [];
    let scores = [];
    
    while (true) {
    
      ply++;
    
      const turn     = bdTurn;
      const nextTurn = turn ^ BLACK;
    
      //{{{  get a move
      
      if (ply <= randLimit)
        randomEval = 1;
      else
        randomEval = 0;
      
      uciExec('go nodes ' + nodesLimit);
      
      if (ply <= randLimit)
        uciExec('u');
      
      if (statsBestMove === 0) {
        result = '0.5';
        break;
      }
      
      //}}}
    
      const move    = statsBestMove;
      const frObj   = (move & MOVE_FROBJ_MASK) >>> MOVE_FROBJ_BITS;
      const frPiece = frObj & PIECE_MASK;
      const moveStr = formatMove(move);
      const inCheck = isKingAttacked(nextTurn);
      const noisy   = move & MOVE_NOISY_MASK;
      const fen     = formatFen(turn);
      const score   = (turn === BLACK ? -statsBestScore : statsBestScore);
    
      if (ply > reportLimit && inCheck === 0 && noisy === 0) {
        fens.push(fen);
        scores.push(score);
      }
    
      //{{{  end of game?
      
      let rep = 0;
      for (let i=0; i < fens.length; i++) {
        if (fen == fens[i])
          rep++;
      }
      
      if (rep > 2) {
        result = '0.5';
        break;
      }
      
      if (score >= MINMATE) {
        result = '1.0';
        break;
      }
      else if (score <= -MINMATE) {
        result = '0.0';
        break;
      }
      
      if (noisy === 0 && (frPiece !== PAWN))
        hmc++;
      else
        hmc = 0;
      
      if (hmc > 60) {
        result = '0.5';
        break;
      }
      
      //}}}
    
      moves += ' ' + moveStr;
    
      uciExec('position fen ' + 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' + ' moves ' + moves)
    }
    
    //}}}
    //{{{  save it
    
    for (let i=0; i < fens.length; i++) {
    
      totalFens++;
    
      o += fens[i] + ' | ' + scores[i] + ' ' + ' | ' + result + '\r\n';
    
      if (o.length > bufferSize) {
        const flushStart = performance.now();
        fs.appendFileSync(fileName,o);
        console.log('flush',performance.now()-flushStart);
        o = '';
      }
    
    }
    
    //}}}
  }

  if (o.length) {
    fs.appendFileSync(fileName, o);
  }

  console.log('done');

}

//}}}
//{{{  collectPV

function collectPV(node, move) {

  const cNode = node.childNode;

  node.pv.set(cNode.pv.subarray(0, cNode.pvLen), 0);
  node.pvLen = cNode.pvLen;
  node.pv[node.pvLen++] = move;

}

//}}}

//}}}
//{{{  net

const net_h1_w_flat = new Int32Array(NET_I_SIZE * NET_H1_SIZE);  // us
const net_h2_w_flat = new Int32Array(NET_I_SIZE * NET_H1_SIZE);  // them
const net_h1_b      = new Int32Array(NET_H1_SIZE);
const net_o_w       = new Int32Array(NET_H1_SIZE*2);
let   net_o_b       = 0;
const net_h1_a      = new Int32Array(NET_H1_SIZE);
const net_h2_a      = new Int32Array(NET_H1_SIZE);
const net_a         = [[net_h1_a, net_h2_a], [net_h2_a, net_h1_a]];

let ueFunc  = myround;
let ueArgs0 = 0;
let ueArgs1 = 0;
let ueArgs2 = 0;
let ueArgs3 = 0;
let ueArgs4 = 0;
let ueArgs5 = 0;

//{{{  netEval
//
// squared relu.
//

function netEval(turn) {

  const w  = net_o_w;
  const a  = net_a[turn >>> 3];
  const a1 = a[0];
  const a2 = a[1];
  const N = NET_H1_SIZE | 0;

  let e = 0 | 0;
  let p1 = 0 | 0;
  let p2 = N | 0;

  while (p1 < N) {

    const x1 = a1[p1] | 0;
    const x2 = a2[p1] | 0;

    const y1 = (x1 + (x1 ^ (x1 >> 31)) - (x1 >> 31)) >> 1;
    const y2 = (x2 + (x2 ^ (x2 >> 31)) - (x2 >> 31)) >> 1;

    e = (e + Math.imul(w[p1], Math.imul(y1, y1)) + Math.imul(w[p2], Math.imul(y2, y2))) | 0;

    p1++; p2++;

  }

  let e2 = e;

  e2 = (e2 / NET_QA) | 0;
  e2 = (e2 + (net_o_b | 0)) | 0;
  e2 = Math.imul(e2, NET_SCALE | 0) | 0;
  e2 = (e2 / NET_QAB) | 0;

  return e2 | 0;

}

//}}}
//{{{  netLoad

//{{{  local weights

// xxd -p -c 64 quantised.bin > weights.hex
// 'weights.hex'

const WEIGHTS_HEX = `00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
fdff0800fffffdfffcff8fff00000c000000fdff0b00050000000d00f9ff0400feff0c000300010005000c00ffffcaff020008000b0004001100060099ff0500
0c00f9fffcfffdff0500bbff0d000000fcff1200000006000600e5ff04000500000000000500ebff01001400fefff8ffffff170003000600f2ff060001000100
1800fcff0700b1ff07000600faff09000c00000002000b00090000006ffff5ff17000e00020039ff0400100024009afffdff0700faffcaff09000800ffff0700
00000000fcff0400fdffdafff1ff1300fefffaff06000700d1ff0900feff120007001f0009000d000200ffff0a0003003200fbff02000a000400d2ff0800fbff
000005000700030035000b000a00fcff120009000800050006000000100000000000ffff1400fbff0f000200ffff040001000e00f9ffd4ff0300ffff0400fcff
21000100fdff00002100feffefff0900ddff9cffe0ff0200e6ffb7ff0b00e0ff0200faff0000f6ffdaff0a00160007000900080004000b00ecff1b0003001300
feffffffd5ff0a00060007000800baff0b000400f4ff050015002400feff19ffd0ff1400a4fff3ff1d001500f2ff0300050029ff0b0008000c000000ffff0600
0a000a00fafffdff1c001c001300ffffc1fffdff05000d0006000000f5ff06000b00000004000500ffff1000ffffe9ff0c0006000d000d000500070002001100
f9ff06000b001900f9ffddffeeff05000100f6ff09000c002400fbff01000300f7ff060003000000f9ff03000000cefff7ff02000700080025000900c1fffeff
0e00f1ffe7ff1d00faffadff0b00fffff0ff0a00feff0d0002002700020000000f00f8ff0000ebff0a0014000e00fbfff1ff150007000700f3fffbff01000000
0f00fffff7fff8ff1000fbff130034001100d6fffaff080013000000d0fff5ff06000200fdff0200030000001e009afff6ff0700f9ffbfff0200040006000900
0200f9fffeff0400f8ffd2fff2ff0500fafff7fff9ffa4ff36000600b5ff0d0000000f0005000e000a00e6ff050002006500f9ff00009d00fcffc5ff0600faff
0100030008001c00eefffdff0100f7ff0d000500050003001000e4fffcff0600000001000b00f6ff1b00f4ff0000f4fffeff0d00ecffe8fffcfff7ff00000300
2400000000000e002100050007000c00daff7effddfff9ffe8ff95ff0d00d3fffdffe2ff0100060000000b0013000e001100fdfffbff0900e3ff1c00f6fff0ff
fafffeffc7ff0e00000008000500c1fffbff06000b00ffff0900430000003900baff3f006bffe4ff26000700f5ff06000000f4ff0a0000000b00f5fffeff0800
0b000700fbff04002200faff1200f8ffb6ff00000a000c000500edffefff03000a00030000000f00fdff01000000fdff040006000500ebffedff120000001500
faff0c000000cbfffcfff3fffaff0400fbfffeff0500efff0800fafffcff0200fffffaff04000100ebff09000300d6ff0000f5ff0700e7ff1d000500acff0800
0300eeffebff0700faffb6ff0800270007001000020013000400f6ff00000000f8ff0000f6fff9ff73001800f7ffeffff1fffeffffff0800f1ff060001000100
2600efff2600010003000100fdff06000b00eeff0100f3ff0500f2ff0d00f1ff0b00fdfffbff01000e00fbff1f0099ffeeff0200f7ffdaff0d00fcff05000500
0300ffffedff0000f9ffcaffeffffffffdff0800f4ff0200d6fffdff0f00110003000800ffff0c00040004000200f3ff1200e9fffbffcdfffeffc4ff0b00fcff
0700030002000b000f00f2fffafffbfff8ff020005000500d2ffeeffc0ff08000000fbff0e00f5fff7ff0500fafffdff29000b00f5ffe8fff6fff1ffffff0c00
20000f00defff4ff0e000a00efff0b00d1ff83ffe8ff0400ebffafff0800d7ff0200ebff00000d00f4ff09001400060014001800ffff0500efff0c00efff5eff
fefffdffc6ff0800fdff06000700c8fff8ff0400fbff01000e000c00f3ff92ffd6ff140090ff0c002300fefff3ff0000fcff0600050001000800f6ff12000300
0b00fdfff9fff9ff1d00eeff0e00f8ffadffffff02000c000300f4ffefff01000d00effffeff0600fdff00000700effff8ff00001200f6ffe1ffffff04001700
0000000002001800f7ff0700f6ff0000e3fffbffffff0f00faff0c000100fbfff3fff0ff0300f6fffeffe7fffcffdbff1000f6fffdff380002000800b8fffdff
fffff3fff4ff0500f5ffb0ff07009bfed9fffdfff7ff0400080007000100f4fff9ffc3fff5fffbff01000d000900f7ffe8ff1500e8ff0b00e5ff0b00faff0200
fefff8ffe8fffeff10000a000400ffff0800d400f2ff0a00000005000f00e5fff6ffe8fff4fff7ff0b0010001800b5fff6ff0100faffd5ff0000f3ff02000000
00000100f6fffffff7ffc1fff9fffefff8ffffffecfff6ff0200a1fffbff050000000000f6ff0100f0ffe3ff71fffbfffbffedffffff0400fcffcffffbff0000
c3fffeff07000b00f0ffe0fff6ffdfffcdfffdff0600f3ff6200e8ff92ff0700f9ff06000600deff1200fafffcff0000dcff0a00e8ffbfffeefff1fffdff0700
1e00fafffbff09000800050021000800cbff93ffefff0100e0ff0b00f9ffe5ff0400f0fff7ff0100faff100014000f001000c9fff9ffebfff5ff00000c00ecff
f6fffaffceff0f00f5ff08000300c1fff5fffbfffdfffdff0f00f3ff0f000800f1ff000062fffaff1e000600eefffdfff5ff0900060007000e00fbff0000ffff
0f00e0ff02000500210011000f00e8ffc4ffeffffcff14000100effff2fffeffddfffdff04000400eeff000007000600f1ffffff0000f5ffd5ff4eff01000000
e3ffe6ff06000400feff160000000200f1fffcffddfff5fff5fffdff0100f9fff8ffe9ff0600f7ff0f0023000900d4fffeffc7fff8ffc9ff08000c00b7ff0600
0300fefffcfff6fffaffbaff02001a0004000400f3ff100008000200e8ffefff0100f9ff0200080006000b00f9fff2ffffff0000cfff0200f4fff9fffaffffff
fffffaff0b00fdff05000a00000004000500f7ff04000100ebff02001a00dcff0b00cffff1fffbff1400050024009bffe8fff4fffaffd9ff0200eaff0c000800
06001400f4ffe7ffefffd4fffafffcfffffffbff0a0000000300feff0a000900fcfffdff0b00f2ff08000f0043000000e1ffe6fffaff02000000beff1700fcff
08000800d8ff1a00ffffe8ffffff140000000d0008000c00dfff0400bfffdeffddfffdff0b00e5ff01000000fdff000007001000f4ffc1fffffff7ff28000200
1e00f3fff9fffdff12001400eeff1300d3ffb1ffd9fff8ffe2ff0100dffffcfffafffcfffcff0500fbff0d000d0009000b0017000700defff6fffdffefff0400
03000000c3ff0000f9fffeffd5ffcbff15000600f1ff14ff0f00dbff050000000900f7ffcdff1a001e001900fafff5fffcff00000a0051000400ffff21000e00
0f00f7fff5ff0d002200ffff0e00f0ffd8ff000007002000f8fff7fff0fff1ff90ffbeff04000d00fffffdff06000500fffffdfff1fffafff2fff6ff00000f00
0300e8ff07000500720005000200fbfffbfff7ffebff0000f0ff1d000100f5fff5fff3ff000013003400e1ff0400deffdeff1200dcff0400faff0600b7fffbff
0500f3fff6fff8fff4ffbbff0600f4ff01000400f0ff0e00feff0300b600f4fffdfffbfff5ff1000eeff1100eefff6fffaff1500d7ffffffecff0100faff0000
0500f8fff5ff020000000700fdfffaffd1fff5ff0200ffff0a0001001300eaff1e00fbfff1fff9ff0700f3ff170092fff5ff0100f9ffd7fffaffefff0200ffff
050003000000fdff0800c7fff4fffafff4fffcfffeff00000000fbff02000500f7ffffff0500cefff3ff000067fffefff1fffafffafff8fff4ffb0fff6fffcff
fefff6ff24001700fffffbff1400efff03000600f4ff05000c000200fefffdffd8ff0e000100e3ff0600fdff05000000fdff2900f6ffa4fff9ffe7ff05000400
2600fcffffff020015000f0000000700dcff82ffe0ff0000eaff0900e1ff0a00f7ff0000fcff03000700c5ff1500fbff15000000f6fefefff9ff03000400feff
08000100c0ff00001100edff1500d3ff07000800fbff02000700fbfffdff000008000f00ddff06002a002700fbff0c00f6ff030018008bffd0ff0000faff0000
60fff1fffbff0a0027000500f8fff1ffe6ffe4fffbff0d00f2fff7ffefff000090ff0100fdff0100f9fffbff07000400fcff2fff00000100f3fff8ff00001000
0400edff0c0005000600f7ff0800f4fffffff2fff0ff0400f3ff2c000d000000fbfffbff060000002200f7ff0900d1ffe7ff2b0021000100ecff0900b6ff0100
0c00fafffbfffffff6ffb6ff0500030007000000f3ff0900ffff0500feff1600fdfffaff79001100f4ff14001000f5ff03001700ebfffffff4fff2fffbffe2ff
0c00f9fffdff0600050000000100fcffdeff01000a000400fcff00000f00f6ff17000f000b00fdff1300faff230098fff6ffd5fffbffcaff0800f0ff0f00ffff
01000b000400d3ff0000d3ffeaff04000200fafffdff020005000300060014000200feff0200baff0500f6ff02000200f9ff0100feff00000200b8ff03000000
00000f00ddff0100ffff09001afffcff000008000e00040004000a000800fcffdcfff6ff0300e4ff0f00fdff0b0000000900acff0500a5fffcffecff15000000
2800fcff000000001d000200efff0100e4ff87ffd9ff1100e6ff0600bdff0e00fdffffff00000600fbffafff1a00feff1000060008000e00f7ff03000d000600
1800feffc5ff0b003500bfff45ffe0ff06000400f7fffcff0c00fbff0b0004000d000600d3ff10002900270002000600fbff030089ff5600befff5ffebff1400
2300fcfff0ff0a002f0008002600f4ffebfffefff7ff1000beff0000eeffefffccff050002001400fcfffcfffaffffff0000fdff0100fdfff6fffcffc5ff0200
feff02000f0001001200efff0b00f9ff000003000a000c00fbff15000c00f7ff0000fdff070008001c0003000a00c9ffeeff1200d7ff01000000050095ff0500
070000000e00f9fff7ffb8ff0b0001000700fffff3ff07000100ffff040014000100000000000b00f4ff18000700f9ff0200130000000200f0ffecfffeffffff
1300f9fff9ff0500000015000800f4ffd0ff05000a0003002500ffff0a00faff10000e00fafffeff0500feff26006dfff8fffafffbffd0ff0600f5ff00000100
04000b00fbfffeff0000c0fff4ff0b0005000000fdff01000900090007000800f1ff0000030067fffdff09000800040004000f00feff0000fbffc7fff7ff0000
ffffe6ff0500150000000a001500f4ff02000700ffff06000800070004000200ebff20000100e2ff0500ffff0c00fcff0300e5ff0400aaff0100f8ff0c00ecff
2000030001000c0024000300fbff7cffe4ff93ffd4ffffffe9ff0900edfffdfffcffffff0000f1ff1100d2ff1900d7ff0900010000000f00f7ff000011000700
4cff1b00d1ffcaff3a00f6ff2900d8ff0f00050003000000050008000600060008000800d1ff00001300130005000b0001000a001cff2000bbfff9fff2ff08ff
45ff0b00faff0c0022000300f7ffffffe4fffafff9ff0f004800fffff5fffcfff5ff030004000800fefffafffcfffbff12000a00fbff0500fdffffff9cff1200
fbff09000200fbfffeffcafffcff05000100fcff080000000000060009000400feff0a000200fdff09000600faffd0ff0100040007000f0010000300a0ff0700
0900fbfffdff1d000b00b8ff0d00f9ff04000a0000000d000500daff040001000000feff0600e1ff00000500fafffaff01002f000600f6ffeeff010000000100
fdff00000900b7ff0900f2ff79ffe5ff0d00fdff05000a00010003006ffff3ff24000c00040060ff0e0008001900a3fff6ff0300fcffd1ff060005000a000a00
0000f7fffeff0800fbffe1fff0ff1200feff0200000013002aff0c00b0ff120003001c000d00100007000c000e0000003400fdffffff10000000ceff0b00f3ff
020004000c00f4ff31000a000500fdff0e0003000900feff0500f7ff1100fcff0100f8ff1000fcfffbff0200fcff020000000e000000dcff0200feff03000b00
2300fffffcfff5ff2b000000f0ff0b00e7ffb6fff3fffdffe4ffe0ff0c00e0ff0500f2fffeff1200cbff0c0012000c000a000a0001000900ebff1e00ffff1400
0000feffd1ff0b00030007000300caff13000000efff040011002d00faff1100d3ff0000a7ff00002e001700f8ff01000200c0ff0c0004000d00020001000500
0a000a00fafffbff21001e000d00feffb4ff00000a000b000000f2fff3ff02000b00020000000000fcff1d000000f9ff12000900020003000200050002000b00
f9ff0a0007001300fbffdefffafffdfff8fff4ff020025000100faff0b000200fefffdfffeff000001000a00f7ffcdff0d00070006000b0023000500b7ff0300
0a00f5ffe6ff0e00eeffb6ff0900f7ffefff140000001000050037000100f5ff0b00fafffefff5ff03001b00fffff4fffeff0f000500fffff2fff6ff0000fdff
45000400a5fff6ff0f00f9ff2700ba000e000800fcff000013000500d3fff5ff20000400fbff1600f9fff5ff21007fffe8ff0600faffcefffdff000008000300
fbff0c00f5ff0500f6ffd7fff0ff0b00f7fffdfff8ff6bff42000e00a7ff0c00050007000d0010000200f8ff050001004f00f7fffaff0000fdffc7fffffff8ff
fcff030004001f00f8fff9ff0400fbff0f00fdff0400fcff0c00e9ff03000700000004000b00f4ff0400f1fffaffe3ff07001000f4ffefff0100f6fff6ff0a00
25000300faff0a001b0005000d000700dcff96ffecff0000f8ff52ff0c00d2ff0800ebfffcff21000b000a0012000a0015000e00ffff0a00e0ff2400fbffe9ff
fbfffbffc7ff0a00feff05000500ccff06000000140000000d001e00fdff760097ff290087ff030024000a00f6ff0f0000002800080002000d00f4ff09000300
08000300f6fff6ff2000d4ff0e00f9ffadff0000fffffaff0300faffeeff08000c00000000000b00fcfff5fffeffecff040003004800e0ffe9ff030000001600
faff11000500b8fffbffffffedff0500f8fffcfffeffccff100002001900ffffffff0200ffff000001000300fbffd9ff0c00f3ffffff14ff0a000400a2ff1700
0000f1ffe8ff1d00f7ffb5ff070053001400fdff00000c000500ecfffdff1200f9ff0000feffecff2d001000f2fff5ffcaff28000100ebfff0fff9ff01000100
0300f0ff2d00feff00000000a2ffeeff0d00f3fffeff90000a00f9ff0b00edff0e00f4fff9ff0100f9ff0000170091fff4ff0100f9ffdfff0800f9ff03000700
fffffeffefff0200feffcdfff2ff0700faff0900e9ff060050ffffffe5ff0700fbff000002000d00020011000400e6ff2400e7fffbff68fffbffc9ff16000000
2500fdff0c0019000a00b3fffefff4ffeafffaff0300feffd0ffe1ffdcff6fff000000000e00f4ff1300fffff8ff0000ffff0900f7ffe7fff3fff1fffaff0b00
2200fdffe3ffe5ff17000700deff0b00d2ff90ffe5ff0200f1fff5ff0700d7ff0000e5fffbff220008000a00080014001000fdffffff0000eeff0e00e9ff56ff
fafffbffc8ff0b00fdff0500fdffcffffcfffdfffbffffff1100fefff2ff0000d3fff7ff8bfff7ff20000b00f4ff0000fbff0700070000000900faff0500feff
07000800f0fff3ff1d000100fefff1ffa8ff050005000b000200e6ffefff03000d00ffff01000f00f4ff02000400f5fffdfffeff1000f9ffd7ff060007000f00
fbff030006002400f8ff0b00f1fffeffe6fffdffffff1700feffffff07000100f2fff5fffafff5ff04005afffbffdcff3000effffeff310002000900afffe8ff
f3fff1ffeefffafff1ffb6ff0700a0fedbff0a000000020001000a00feff0400efffbffff6ff020006001c001600f3ffefff1300e8fffefff2ff0700fcfffaff
0c00ffffbefffaff0c00fbff0000ffff0a002300fffff6fffcfffdff1400e8ff1600e5fff1fff8ff10000d001c008bffeefffefffaffe1ff0500f0ff09000300
faff0700f0fff7ffecffcbfff2ff0800feff0600fdfffbff040069ffefff1000fdfffeff11000200f1fff6ff0500f9ff0100e9fffafffbfffdffcafffbfffbff
cfff000000000f00fcffd4ff0100edffc7ff0300fdfffbff4d00deff96ff1e00f8ff01000400f3fffaffebfff9ff010011000e00fdffcefff9ffedfffaff0800
1f00f7fffcff0e00140010001c000700c6ff97fff1ff0200f7ff0c000500e1ff0d00f6fff4ff25001600030009000c00140093fefdffe7fff2ff05000c00f3ff
fbfffdffcaff0a00f9ff0000fbffc9ff0500f6fff6fffbff0d00ecfffcff0500eafff9ffafff17002000f5fff2ff0a00f8ff0b000700f9ff0900f7ff1400f9ff
0000d8fff4fff7ff200011000900ebffc3fff3fffeff1b00fffff1fff3ff01000000affffeff0f00f7ff00000500f0fff4ff00002100f3ffcdfffcfffdff0500
ecffddff0d000300eeff1500f7fffefff0fff4ffeafff4ffe5fffbff02000100f4fff8ff0400feff28003300fdffe2fff2ffc0fff7ff3cff00000a00a7ff1000
f1fff7fffcfff4fff5ffc0ff06004200fefff3fff3ff0f00f6fffdffe7ff0700fbfff7fffdff0900f9ff1b00f0fff3ffedff0300b5fffdffebffe6fffdffefff
0100f9fffcfffdff06000c00fdfffaff0100fafff5fff9fff4ff1e000f00e1ff1700e1fff3fffafffdff0000140084ffeeff0000faffe0fff8ffeaff07000a00
faff0e00f3fff6fff0ffccfff2ff0500fafffefff8fff9fffefff7fff7ffffff0500faff0a00f3ff12002f005700f9fff9ffd2fff9fff4fffeffc2ff1f00fcff
1f00f9ff0eff0b00fbffb8ff05000a00e3fffafffcfffaffd5fffeffd9ffb7ffdffffafff9ffe4ff1000f5fff7ff0100f3ff0f00f8ffcefff2ffedff1a000500
2500ebfff1ff070019000600e3ff0c00ceff8dffeefffbfff1ff0a00dbfffcffe3fffefffaff1d00fcff020001000a00150000000500dffffaff0300ebfffdff
fbfffcffc7ff0800f9ff01000a00d7ff1f000200f9ff58ff0600edff130003000000feffcbff010027001700f5ff0000fbff0a0008000400fefff1ff07000000
02000d00e7ff0200250006000f00e1ffe2fffaff010021000500f0fff1fffcff96fffdffffff0600f7fff9ff0000fdffebffdefff6fff8ffd9ff44ff0300fbff
fdffe3ff0900080026000f000200feffedfffcffe1ffffffecfff9ff1200fefff9fffcffffffdbff26005dff0000d9ffeaffe9ff40ff0800faff0a00cdfffeff
0000f5fff4ff0000f4ffbbff0b00fbffffff0400f0ff0a00fcff0100f6fff9fff6fff5fff6ff0a00f9ff1c006f00f1ff00001000b7fff8fff5ffecfffaff0b00
0500effffefffcff070003000000edffcdff06000000feff0a0000001400f0ff1700efffe1fff5ff1c00faff1a0081fff4ff0500fdffddff0200f0ff12000a00
ffff0f00f2ffb8fff3ffcafff0ff0600f2fffcfffaffffff0000040000001100f5fffaff1100d9ffdcff0100fffffeffffffedfff8fffcffefffb2ff0100fdff
f2fff0ff37000600fdff00001700efff010004000000feff11000200feff0200c4ffe9fffaffe5ff0000f3fffcff0000fdff0500ffff9efffbffe3ff04000500
230002000000110017000a000e001300d3ff87ffeafff3fff0ff0b00d6ff0c000200fbfffbff2100fefff2ff0400edff0e000100d8feebfff7ff00000a00feff
feffffffc5ff06000200f3fffaffe1ff0f00fffffaff06000500f5ff0600020008000b00deff10002b002c00f4ff0000faff0c00190071fec8fffdff01000000
f2ffe2fff3fff6ff23001500e3fff1fff0ffd4fff9ff1a00fdfff7fff1ff010093ff0100f6ff1c00f3fff6ff04000100feff0b00ffff0000e3fff4fffbff0600
0200ddff0c000600f2ff00000c00f3fffdffe8fff5ff0600faff2f001900feff0000fdff04006f00240000000000d9ffe1ff020042000400f7ff0600a3ff0200
0800f5fffefff9fff5ffbcff0400030009000900edff0600fdff0100fcff1500fbfffaffefff1200f7ff22000600f8ff04001600e9ff0000ebfff5fffaffe3ff
1700fcfffcfffdfff3ff11000200f9ffdeffffff13000100effffbff0f00f6ff1c0008000900feff0900eeff1e007afffaffdbfffbffd0ff0900f5ff0900fdff
00000e000100ffffffffd7ffe7ff0f000800fffffcff03000700010003000400fefffbff0a00c2ff08000700fbff0300fcffeefffaffffff0a00b2ff0300fbff
03000c002cff0d00fcff0b001a00f8ff000003009afffeff00000a000700feffdbffb9fefdffe4fff1fffbff040000000000b8ff0700adfffaffecfff8fffcff
2a00fdff0000ffff28000000fbfffbffdfff8affe8ff0300f5ff0900b1ff0e00fdff0000fbff22000100e9ff1400f0ff1000000007000b00f4ff00000c000400
1400feffc5ff13000e0065ff4500e9ff1e000000faffffff0500f9ff0c000a0006001600e1ff09003000f9fffefffcfff9ff0800dcffe0ff8dfff4fff7ff0100
52000100ecff0200310007002400f7fff1ff1500faff170055ff0500edfff0ffecff0100feff0f00f6fff9fffffffdff1000eefffcffffffeaff0000bdff0b00
fbff0d000c0006001500f8ff0c00f8fffeff03000f000c00ffff0c00130000000100fbff0300daff160009000600d5ffe8ff0f0007ff0200fcff0300acff0100
0900ffff0d00fefffcffc1ff0e00050008000100f1ff170005000000050015000000ffff03000e00f9ff2f000d00f7ff000015000200fdfff3ffe4fffeff2300
0d000000ffff0200090016000600f2ffc8fffeff0400030024000000110000000a000d00f3ffffff0c00f4ff2a0060ff0000e0fffcffdaff0b00f5ff07000000
00000c00fbfffefffeffcafff0ff06000200fffffcff050006000b0004000f00efff000008005aff000005000900050003001400feff0200f7ffbfff00000300
0100ecff0d00090001000c000900fcff01000100050002000600080006000000f4ff1000f9ffe7ff0300fdff0900feff0000f8ff0700a9ff0400f7ff0c00faff
220006000400130021000100feff99ffecffa0ffe7fffdfffbff0b00e9ff03000300feff00000c000e00f9ff1300e5ff09000500feff0d00f6ff000010000a00
f9fe2800d0ffebff1d00f8ff2500eaff170002000400fdff02000200040008000a000f00e2ffffff220024000c000000ffff0b0019ff2200aefff8fffcff01ff
0f000900f9ff020027000000f8fffefff4fff4fff8ff16006100fdfff3ff00000000020000000700fbfff8ff0000fbff0e00090000000000f9ff0400a4ff0600
fdff03000c00f3ff000074ff03000000000000000d00020020000c0003000300f9ff13000500000004000c00f9ffc6ff01000600080006001200020027ff0800
0c00fefff7ff07000b009eff0f00feff13001000ffff0f00060083ff060007000000ffff0300b9ff05001a00fbfff6ff0000220003000100f0fff4ff0000feff
efffffff0c00ecff09000a0025000f00090007000200090000000b0094fff2ff23000e0005001cfffeff0c00240095fff7ff0700faffcfffffff060005000a00
fdfff3fff7ff0400fcffd5ffecff1600fbff02000000faff10000e00f8ff1d000c005000100012000b000b00080000002300fafffeff0f00ffffcfff1f00fcff
0000040009000a00470009000e0000000d0002000700fdff090000000f000300fcffffff1b00feff0800fbfffcff220005000e000500e2ff0800fafffaff1000
23000b000000f8ff2c000b00f0ff0a00e4ffb2fff6fff6ffeeff0d000c00e2ff0200fdffffff2500d6ff12001000080009000b0000000300edff2f00f5ff0e00
fdfffeffd3ff120007000c000800ddff1000fefff1ff03000f002a0004000900efff0b00abff070033000b00f6ff01000100f0ff0c0008000c00ffff04000400
07000a00f6fff3ff1d002a000c000a008efffdff0200e5ff0500fdfff1ff07000400fbff0400070001004f000200b0ff090007001b0024000000040002001200
fdff000011001d000000eaffeefff5ffffffffff040008000d0008000f00fffff4ff09000000020009000a00f9ffc8ff0a00060006001100150004002bff0b00
0e00faffe1ff2d00ecffa9ff0b00ebff33ff0900faff1a0005008100080008000900feff0600dbfffdff2f00fdfffaff05001b0006000600f1ff0600fbff0000
fdff1a00f7ffeeff1700f6ff7cff110009000800fdff110014000000effff5ff2900040001001c00faff050020000afff4ff0500fcffd1fff7fffbff06000f00
fafffeff00000700fdffd0ffe8ff1a00faff0e00000076ff630012003b001f000800f5ff0f000f000d00020009000b004100eefffdff0a00fdffcefffffffcff
070000000a000700dbffebff0c00f8fffffffeff0800fbff0f00bfff0600feff000007001600fdff0f000a00feffdaff03001000fbffe8fffffff9fffdff0700
2800e5ff2100150021000d00f6ff0c00e0ff92fff1fffeffeeffe7ff0900d5fffefff0ff00003b00efff0e001000090011000d00fcff0700e4ff3a00fbfff1ff
fdfffaffcdff1300050008000700d4ff0f000000100005000e000300faff0f009afff5ff8eff0e0022001200f8ff0100fdff0a000d0007000800f8ff0700ffff
0b001100f6fffaff1f00fcff1500fcff96fffeff0500cfff0100ebfff0ff0c000400080000000200000013ff0400420009000500060005ffedff0a00f9ff1800
f9ff09001000ebfe0000fdfffbfffaff0200fcff07009afe0000050012000000feff03000000040000000b00fbffd1ff3000010008001400080004002aff1200
0000f3ffd8ff1400f9ffaeff0f001e004e000200000002000000a7ff0200fdfff6ff0400ffffdcff23001c00f6ffedfffbff230000000700f4ff120002000000
fbffd3fff0ff040007000100ffff00000800f2ff0400f4ff0e00fcff0900faff2700fbff00000400e4ff02001b0008fffeff0500fdffe0fff4fffdff02000000
fdff0600e6ff0300fdffcffff0ff0f00ffff2600f1fffdfffdff000002001500070001000e000a00120012000700eaff1700f8fffeff0000feffc9ff10000000
0c000100050003001100e3ff04000200f6fffeff0600f9fffeffb6fff6ff0400ffff03003300efff1400fffffdfffdff00000b000600e6ff0000f3ffe5ff0a00
24001c00daff02001a000900fbff0800daffb3fff5fff9fff5ff11000200d9ff0700fbffb6ff430012000c000800090012000b000200f3fff3ff1400100068ff
fefff9ffc9ff1000020007000000d3ff09000100f5ff07000e00f9fffcfffeffdcff0b007aff17001d00f6fff7fffdfffaff0b000a0005000300f7ff0b00ffff
09000900f6fff9ff20000c000b00f2ffa2fffeff0000f6ff0300fdffedff04000500acfffdff0700f8ff2b000a00a0ff000004006100f8ffd7ffffff01002300
6100f8ff09002400faff0e00deff0600ebfffefffbfffbfffdff04000500fefff5fffefffcff000006000d00fbffd7ff5200fbff0200e9ff0300040026ffb000
cfffeeffe8ff0800f4ffbcff080083fe31ff0a0002000900feff0c000000fcff0000d0fffaff0000fbff0b000000f6ffc9ff3400f2ff0700f0ffe8ff0200fdff
f8ffd7000200f8ff0500f9ff020000000800f6fffcfff3ff0500f2ff0800f1ff1a00f6fff5fffcff0e000800190005fff1ff0600fcffe5ff0200efff00000c00
feff04001400fffffbffccfff3ff0d00f9ff1500f8ff01000a0064fff5ff23000000fbff0e000200fbff04000400fdff0800fafffefff6fffbffc9ff0a00ffff
cdfefcff0600170000009ffe0200d6ffb3fffefffcfffdff1f00c6ffccffdafffbfffaff0500ebff03000400fffffcff1c0008000100cfffeaffebff09000900
2000e4ff1500290018000600faff0700caff9dfff0ff1600f0ff0e00feffe5ff4800f0fff7ff3f0002000e000200170012001b000000c5fffaff07000400f4ff
f3fffbffccff0e00fcff0000faffd3ff2600f7fffafffbff0700f2fffefffaffeafffcff9fff0f001d000600f9ff0800fbff0b00070008000200f5fffaff0000
0200e9fee7fffcff21000a000a00e8ffc7ff0500fbff09000600f3ffefff0900fdfffeff00000000e3ff06000b00f4fff7fff6fff7fff9ffbbff0800fcff1500
faffbaff06000000ecff1900f8ff0900f1fff8ff00000600fdff060000000200f4ff0a000400f7ff0c005e00fcffdaff1300e4ff06000d000000070022ff1200
d0fff5fffdfff9fff9ffc0ff0d0020001000e2ff0000f9ffefff0100fafffdfff5ff0400f7ff0700fbff2f00f6ffedffffff1600d8ff0000f4fffdff01000d00
fcffe2ff0b00fbff000017000400f6ff0000efff00000500ddff19000800e6ff1100f0fffbfffbfff7ff04001900fffefeff0900fbffe5ff0e00ebff09000400
feff0800e1ffa0ffeaffcdfff7ff1400010016000000ffff0400030000001900fffffbff0b00f4ff19000c00e6fffbffffffe7fffcfff8ffffffc0ff0b000000
0a00feff05000800f8ffedff0800dc00dbfffbff0500fffff6fff5fff4ff0700f2ff0000fbffe2ff0200eefffcff0300f9ff07000000cdff0900edffe5ff0200
27000400edff06001f000d0001000800cdff98fff0ff1000f2ff0e00edfff5ffc3fef6ff0000410005000b00fbff0500130000000600c1fffaff02001d000700
f6fffeffc8ff070000000200f9ffdcff24000100feff75fffefff7ff09000600fcff0300ceff190024000c00f5ff100000000a0009001b00fffff8ff0900ffff
f5ff3300f1ff000021000a001400f2ffe2fffbff00001c000200fdfff0ff0effe9ff030000000a001600fbff0400fcfff6fff1ff04000200d4ff0500ffff2000
4300d4ff0700030012000e00f8fffffffafffbffc6ff0000f6fff2ff0500fbfffcff0d0000000a0009000e00f6ffd9fffcffebff00000d00000005008aff1300
fffff4ff0300f9fff6ffb9ff0700edff0f000300f6ff0b00f5ff0500f2ff0d000100fbfff7ff0500f4ff2a000700f7ff05002200c4fffefff0fff8fffdff0000
1000040000000100d4ff28000400f5ffbeff0200f5ff05000b00f3ff0c00f7ff1d00fcffd3fff8ff0a00f1ff1500fcfe03000900fdffe1ff1d00f1ff03002300
00000700fafffdff0d00ccfff6ff1400fcff0e00fafffdff08000a00fbff0900abfffbff0700befff7ff1b000000feff0000e2fff8fffdff0d00b8fff8fffdff
00000d0063000e00faff00000b00d3ff02000500a4ffffff0b00040005000300d4ff0700f8ffe4fff8fffafffaff0000fffffaff0300a2ffeaffdffff8fffdff
24000000faff0b001c000700efff0700d4ff87fff5ff1500f3ff0b00bcff01004a00f7fff8ff4200feff0800feffeaff0e00050061ffa6fff9ff0200fdff0100
faff0500cbff09000400fdff0a00e3ff2700ffff02000900fdfffcff16000600f5ff1200dcff0d0025001700f3fffdfff9ff0b001200f8ffe9fff7ff00000900
f3ff1fffdefffeff1f0018000c00dcffeaffadfeebff1800f9fffdfff0ff2500e5fffffffeff0800f9fff2ff0400fdff0f00fafffbff0000e5ffd2fffeff1c00
fcffabfffefffdfff7ff05000e00f4ffffffceff07000600f4ff06000700feff00000a000600f7fffeff04000500d6fff3ff010069000c00ffff00001eff0b00
0f00faff0500f4fff8ffb9ff090005000700eafff0fff4fffbff0400070006000200f5ffffff0700fbff3d000100f3ff09001d00edff0200f4ff0d00faffd2fe
1a00fcff0500feff030019000800f0ffb0ff030005000600efff01001200fbfff1ff08000f00fdff0f000000210006ff00000800feffd0ff1500f9ff0d001200
fdff0e0001000000e5ffdbfff4ff19000100fcff0500030009000c00080007001100fbff0700b6ff24000100030005000800f9fffcff01001300beff00000000
0000ebff0100f9fff9ff1100050019000400feff0a00fcff00000c0007000b00e2ff4800faffe0fff7ff0100fefffefff1ffd4ff0600c2ff1200edffe8fff6ff
2b000500ffff000028000a000a00fdffdeff81fff7ff1000f7ff0c00cdff0600fffffeff02003400eeff03000d00f9ff0b0000000700fdfff6ff000006000a00
1500d5ffcaff04000b0079ff1800e8ff1e00ffff02000600f8fffdfffaff0500fbff1400e3fff7ff2b005c00f4fffbfffcff0b0009001100adfff5ff0800ffff
02000a00f7fffbff260009001b00f9fff1fff8fff7ff0c00e0fffefff0ffeefefdff020002000e00f0fff0fffffffdff1000f9fff9ff0000eeff0800dbff1d00
fbfffdff060003000d00f9ff0800f3fffdff10000d000b00faff17000f00fdff05000900ffff2c00070004000600d6fff4ff0b0013000800faff00001bff0400
090001000c00fcfffaffc1ff1100000008000e00f6ff0c000000feff0900270000000000fbff0300fbff2a000000faff05001d000000fefff2ffe8fffbff1200
0f00fdff0000040007001f000700f3ffadff0100030004002a0002001200030006000c00e6fffbff1600d5ff2a0055ff0500e7fffcffd6ff1700f9ff07000500
feff0d00fdff00000b00cbffedff120007000600feff070008000b000500feff96fffdff120063fff7ff02000500060001000000fbff00000900c5fffdfffeff
0100d3000c000600faff0a000300f7ff0200ffff0a0000000800050007000500feff1700feffe5ff050000000500fcffffff00000600bbff0c00f4ff0c00f1ff
1f00000001000f002c000200fcffcbffecff9dfff8ff0600f8ff0b00eaff0200ffff0500feff2500070002001400e2ff0800040009001200f8ff020017000c00
d2fe5b00d4fff2ff120005002200e7ff17000000feff0300fbff04000600050003001100e2ff0a0024000e001000fbff00000e009fff1c00cdfff2ff0000eaff
13001100eeff05002300030007000000f9ff1300fdff1c0081000100f4ff0a000400040011000b00fcfff6ff0100ffff11000600feff04000000070001001f00
fffffcff1400f1ff010040fffbfff3ff000000000d001d00190014000700040000001b000400fcff06000c00f7ffbbffffff0b0005000b000800000027ff0000
0f000000edff2600190098ff0f0000000f000d00f8ffc9ff0600edff080009001100fdff040076ff01002800fbfff5ff0400ffff0200faffedfff5fffeff0000
090005000600100015001b0002001500020007000d000f0013000500b9ffebff1c000f000400ecfe0600f5ff21009efffcff0900f9ffd1ff060008000c00fcff
e8ff0000faff02000000cdffecff1d000600fdff07000a0018000a00f4ff150005008b00150015000f0001000800f4ff1500faff06000700f9ffd3ff28001e00
0400020005003c005f000e000d00010010000100080000000c00f5ff09000000f3ff04002e00fafff1fff6fffcff7b00f5ff0c000500deff0500f7fffdff0f00
260013001700140032000000faff0900ebffc4fff5ff0600dcff04000900e6ffffff100000002b000300190010000e000a0010000000fdffe7ff3100f8ff1100
f8ff0000d3ff16000b0009000600d1ff0a00feffe0ff02000f00200003000b001f001600a0ffffff31000500f7ff00000800fbff080002000600070000000000
03000a00f6fff0ff220022000400080085ffffff0d00d1ff01000400f0ff0700fbff020004000100faff1b0005001a000e00040019005e000800070003001900
f7fff9ff120023000600e4ff0600e8fff7fffcff1000130007000f0000000300f7ff10000800020000000e00fbffc8ff0d00080008000100100002003aff0900
1000feffddff0e00edff94ff0f00f0ff13000b00feffebff0300b00009000800d9ff150006007bff000033000000f4ff05001c0003000300f6ff020000000000
00000f00f7ff29000e001000f2fff1ff04000a0007000e0018000f000500f5ff45000a0008001c000b0009002c00fcfefeff0a00fcffd1ff9dff0100f6fff6ff
feff00000d000a000100d0ffedff2000040021000c003fff01001100f8ff1f000900dbff1a000c001500160008000e001a00010007000c00f7ffd6fff6ff0700
070004000700190040ff0700090000000b0003000a00f7fffdffc1ff0500fefff8ff07003000fcff010029000000a9ff02000f00feffd7ff1000ecffe6ff0600
290036ff03001a002000fdfffbff0a00e4ff94fff1fff3fff5ff02000600d9ff09001b0003003900f7ff18000b0008001000130004000200e6ff3000ffff1100
faffffffd2ff12000a0008000400d4ff14000200200009000900fdfff8ff0600faffeeff81fff9ff1f000500f6fffdfffeff040008000c000200fbff04000200
0e000f00f8ff05001d00eeff0a0009007bff00000200aeff02000100eeff0300f8ffedff09000200feffeffe0f00c6ff0d000d001b003d00f3ff0600f2ff1f00
fbfffaff18000cff0200fcffeaffc6ff0b00f5ff09000600100007000700040000000b000000ffff04000b000000d0ff2c00080004000e00080001002aff2500
0600f8ffc4ff2600030093ff0c003e008d000c000500ffff0900d0ff0a00f2ff1b002f000000bdff0d000d000000f2ff04002900fdfffbfff0ff050001000200
d0ffeeff17001b0011000000e4ff0000030003001000ffff140000000200f7ff2700030001001c0014000d001f00fafef2ff0c000400defff8fff8ff00000900
f4ff0000caff02001300d1fff2ff1c0003001900f1ff080007000600f9ff51000100fcff0f0009000f0003000600e3ff0f00d8ff040011000400d5ffe9fff6ff
05000400040024001a00080008000600f1ffffff0500efff110046fff7ff0700f9ff0b006500ebff21002600ffffeafff3ff0b000100dcff0f00f7ffdfff0500
27006a0027ff33002100efffe6ff0600deff8ffff2ff0900e0ff01000700dcff08001200040038001d00100007001c0011000f000700f5ff03001700feffabff
fcfffdffd4ff140006000b000000d3ff0f00f4ffecff08000a00f5fff0ff0100fefff6ff79ff0e001b00f5fffefff2ff03000e00080009000000feff00000000
07000b00effff3ff180009001900f8ff72ffffff0700c0ff0300e9ffebff0600f9ff04000000eeff1200220019000600020005002a001f00dfff0f0003003100
1100040010003200fbff09000000f3ffa0fffbff040014000d00090000000300f6ff0f0005000200faff07000000dcff600002000700eeff0500000027ff0100
acfff6ffc8ff0b00feff97ff0c00bdff1a00f1ff1000f8ff0100060004001000feffcffffdfffcff00000b00f9ffe7ff07003400fcff0300f5fff5ff01000500
07002600f8ff0b000c000800060001000500040004000c000b00e5ff0a00f0ff340001000200feff0a00feff230001ff020007000200e6ff87fff3fff4ff0600
02001100c20095ff1100d0fffcff1c000300580000000c00070051ffffff6700020000000f00010011001b00080019000400fcff0b00fbfff5ffd2ffe9ff0000
000001000a0021000000fbff0a0001008dfff6fffefff4ff1400d3fffbffeafffaff05002600e4ff09001f000200fafff6ff0e000900d2ff38ffe8ffcaff0500
27003ffffaff2b001a00fcff00000b00d5ff7cffeaff2200f5ff0e00fbffe6ff2e0011008dff3a0007000d00fdff1a00100003000900c2ff0500080012001100
f8ff0300d4ff1000040000000a00d8ff19000600f4ff0500f9fff6fff4ff0200e9fff3ff6aff03001e000200fcfffdff07000e0008000800fdfff8ff06000300
03001100fcff04001900eeff1800afffabff0a00f8fffdff00001300ecff1a00ebff03000200f9ffbaff07001600e6ff080003000300f8ffb1ff050002001700
5300b5fffdffffffedff1600e1ff10000100030005000a00ffff0a000a000600f9ff1a00f4fff8fff2fff3fffdffdcff1200f3ff0a0003000400000025ff1c00
96fff9ff0e00fbfff9ffb4ff14002c00190017000b000900000001000500efff020024000000fefffcff27000700fcff81ff2100f1ffffffeeff040005001900
0400e5ff0a000100f2ff19000600f4fff3fffffffdff0400d5ff3a000900eaff1600fcfff5fffbfff6ff1c001f00fbfe00000f000000e7ff1f00f3ff05002f00
ffff1400a2ff040014ffd1fff9ff100018001000ffff060002000300faff4000080002000e00f6ff28001700f8ffffff090000000300fbfffbffc8ffeffffaff
0d00000004000300f8ff050006002b00e9fff0ffccff02000800f6fff8ff0200f6fffdff0000e8ff0000fcfffefffbfff7ff0000ffffbbff4f00efffefff0000
27001a00faff150023000400f9ff0900ceff8efff1ff2600e1ff0e00fafff0ff83fe0600fdff370002000800f2ff0b0012000f000e006eff010008000d000a00
f9ff0200d2ff0900fbff08000000dbff2400f6ff01008bfff7fffbffb8ff0300f7ff0600ceff080022001200ffffe6ff08000c0008001700fcff0500feff0500
0000890005ff0b001900ffff16004700e0ff0e00f8ff210004000300ecfff6ffe4fffeff06000000c300fdff0e00fdff0900f9ff03000700d1ff040000003200
1d0037fff6fff9fff5ff0f000a000700f1fffcffa2ff0a0000000b000300060009001c001700f4ffe6ff0c00f9ffd7ff0f00f6fffdff0b00fdfffdff24ff0600
090001001000f2ffffffb1ff0a00ecff080065ff0100eefff6ff080000004100faff0600f4fffcfffeff2c00fcffebff04002d00effffefff5ff0a00fdff1700
150004000300050020003b000900f5ffc5ff0e002b000b000000effffffffcff07000000b7fffbff0700faff2300fafefeff13000100dfff0e00fdff00000000
feff1500140006005a00d3fffeff1f00dbff0d000000050003000c0003001d00ebff03000d00c6ff2000e9ff070007000500dfff040001009400c8ffebfffcff
00001e000b000600fafff5ff0800f9ff0900fbff040002000600030001000200ecfffafffcfff3ffefff00000500f7fff1fff5ff02009dffeefef0ffdaff0100
26001800fcff26001d00eafff9ff0600dcff5dfff4ff3400fdff0800e1fff5ff20000a0008003900d0ff0d00f3fff1ff0700fcff79ffa3fffdff040003000600
f1ff0a00d8ff09000700f7ff0900e1ff1d000b0009000500f3ff000059000200ebff0100dbff0e0026002900f6ffe2ff05000f000d000500f7fffeff00001400
faff0f00feff02001700f9ff16009affe8ff090000002b00fdff0700eeff8affdfff060000000800c7fff2ff1200fdff2d00030004000800e4ff0e0007003900
0a0074ff00000000ffff02000200f0ff0000b2ff1f000700f2fffcff0800040002001200f9fffefff3ff00005100d0fff7fffeff06000c000300fcff27ff0200
1300ffff0e00f4fffeffb6ff0e00f8ff10002200feff1300fdff00000e00ceff0700030008000100fdff27000c00faff04002200f8fffefff1fff8fffcff3a00
18000000090007000f0018000500f1ff64ff0900ddff0500c7fffeff0900fcff10000e002f0003001e00f0ff1f00fdfee9ff2400feffd3ff0e0001000a00f8ff
fdff1a000200feff02ffd5fff7ff21002000feff040010000a000d000200160090ff00000d00afff1e00f2ff080007000a00070004000100beffc2fffbfffeff
0100060012000c00f2ff0700110008000f000500090005000600040004000c00efff1100feffe1ff05000400fcfffdfff4fff4fff6ff7fff1800f3ffe7fff3ff
2e00020005000d003500f5ff0900f7ffe5ff4ffff7ff1d00e7ff0800fcfffcfff8ff0a00feff36001c0012000400efff0b0004001400edfffaff0300f6ff0b00
2d008effccff020008005bff1600e9ff18000100fdff0a00f0ffffff08000000e7ff1400dcff0b002c0006000500f1ff00000d0006001d00e7fffcff0200fcff
01000b001fff0f00210012001a000e00f1ff0400f1ff1b00fcff0700eefff4fff3ff0100ffff02001600f9ff0600f2ff2c00f0fffaff0300ffff000017001a00
fcffeafff8fffdff0500f6ff0b00fcfffdff0f0012001600fdff0f001300ffff040013000000fbff050007000f00c5fffaff060014000800fdff00001cff0100
0c0001000800fdfffbffc1ff100003000500f1fffcff000004000000090006000300fdfffaff000000001b00f9fff8ff0000270001000000f4ff0000faff2400
2000fdff020007000300feff0300f8ffa1ffffff050004002a000e000f00fdfff9ff0a00defffeffffffd0ff2e005bfff1ffbbfffaffd4ff1300feff01000000
feff1800fefffeff1500c9fff5ff18001000040002000f0007000e00020002000600fdff0c0059ff0800f6ff0d00040001000a00070002007f00cfff07000000
0000270009000200f6ff0000110004000700feff0400faff0700fdff0700040006000a00f7ffe5fff9ff03000700fcff050000000000b7ff1200f5ff0600f7ff
24000000040017002b00f6fffeffeeffedffa9fffdff2200ffff0900effffcfffeff1000fcff310007000b000f00deff0b0001001400fbfff4ff030015000d00
dcfe8f00d7fff9ff08000d000a00e2ff1000fffffaff0a00f1ff0200fdff000007001400dfff0c00270023002700effffbff1100cbff0e00e3ff010007000900
05000e00ecff0100200008000b000100f9ff1600f3ff15003f00fcfff2ff0d00ffff040040000e00fdfff5ff0400ffff1b00000005000500000010001a002b00
1500e5ff2b00e9fffcff3eff0400ddffffff01001800170025000e003b000900170024000a00ffffffff0f00f8ffaffff7ff1100090002000a00000052ff0500
2400ffffe6fffdfff9ff7cff0a0000000d00fdfff8ff1900110020000e00f0ffb8ff0500000083ff00000900f8ffe9ff0b00fdfffffff0ffedff0500f3ff0a00
02001000fbfffafe200030000600f2fffeff0900120006001c001a001500e6ff080020000a0045fff8fff1ff3b00bbfffffffefffdffc3fffbff0c00f9ff1f00
05000500f7ff0c00ffffcfffedff1e00fcff0d0018004b0001000f00f1ff2b001000a1000f001900f5ff02000600fdff1200e1ff0e000000f2ffceffefff9600
ffff0200ffff32007400070007000900140008000d0003001b000600ffff0500ddff02004200f3ffe8fffdfff9ffbf00fcff0f00f8ffc6ff0a00f7ff03001400
2c001a00160022003900f0fff5ff0f00f1ffcffff6fff3ffdaff0c000300e7ff08002a0000002e00030024001600feff0e000900fdffefffc6ff2400ecff1c00
0000faffcbff120009001000fdffd3ff050003008eff07000f000200fafff1ff67002f0098fff3ff3c0000000300e6ff0d00faff0000faff00000b000c001100
0500f5fffeffeaff2700000018001e006cfff5ff05009efffcff0200f1ff0900f2ff0f000d00fffff5ff38000f002700040013000f00f4ff05000800e7ff0f00
1000e8ff330044000500dcfff6ffc1ff040008002500d0ff2300190038000a0011001b000d00fdff09000700faffbeff09000b00080000000a0006007cfffaff
20000f00a5ff3000130089ff0b00f6ff3100190006002f0000007a000f00eeff6c00fcff020058ff0c0008002300f2ff0400ecfffffff9fff7fff3fff6ff0000
0d0004000800240027002200e9fffdfffcff0b001a00090017001500fdfffdff22001f0007001d00f3ff16002e0012fff7ff08000800cbffeeff210005001c00
a1003100fbff07001300d2ffe1ff3300090010001a00e5fef6ff0e00ffff3200000021001d000b0005003500000040000d00090008000100f6ffdcfff9ff0f00
040009000600feff3cfffbff15001000290001001300f8fff4ffd4fffaff0400e9ff10005900feff1b00eefffcffbbfff1ff0f00eaffc1ff1d00efffd4ff0600
2f0001002d002e002f00d7ffd0ff0d00ecffd0feefff0c00bdff0500f3ffdbff1300620006003300ccff1e0013001800180006000300f3ffedff20003c003700
ffffffffd1ff0e0013000f000e00beff14000c0095000d000f00ffffefff04003b00260083ff11002b00fafff0fff6ff1700000001001f00f8ff0c000f000500
0f001900f3ff09002400f0ff2b00180067fffdff00007bfff9ff1900ebff0200e5ff07000d00fbff0000fcfe19000c002600120020001100fdff0300f4ff2700
0000e1ff31003bfff8ff00001b0095ff0a000500070022001a00120004001b00faff19000d000500f3ff1200fcffc8ffe8ff12000c00e7ff010001003dff1a00
100000007dff150018007dff15000b000000faff1e0027000500f8ff14002b00d0ff14000900cdff0100f3ff1700edff07000700f7ffeeffeaff0000fbff0400
0e0020000b003c001b00fefff9ffe9fff3ff08001b000a002c000f00ffff01003c0008000000240028000700350013ffe4ff05001200d5ffadfffcffd5ff2a00
00001d00e6ffc1ff1300dcffeeff19001c00e2ffe4ff4100f3ff0f0004003e000900130020000200e1fff1ff080006ff1100b5ff09000900f6ffddffc4ff0b00
210005000d0002002a0011000f000900060005001b00a700f4fff6fff3fffeffe4ff1b006e00edff3f00aa00fdffc5ff1d000f000300caff4000eefffeff0600
2900b0002e0001002200f1ffd4ff1900e5ffd7fef1ff6c00e8ff0000feffdcff08001e00020025004600180008001f00150010000f00020014001800d8ffe6ff
03000700d4ff0800100007001500c8ff1500020092ff1000030001000000f2ff33002c0050ff15001d00f7fffefff8ff1200fdff03000f00ffff03000a00ffff
0f0012001500dfff1d00e6ff28001f0059ff0a00050086ffffff0300e6fffcffe4ff0f000b00e2fff2ff53002500fcff2400070043000900c0ff0800f6ff0300
1400f9fffaff4b0014000a00ffffc7ff0900faff0600f3ff0f00000026001c0002001600110005000f000000feffcdff25000400070004000100faff2afffaff
a9ff6bffd0ff110000008fff1000ebff08000900340022001d00ecff0f00faff0b00c2fe0600f2ff0200ffff0f00f2ff08000300f9fff9fff3ff030000000100
0f000e0008001600e3ff1d00f8ff0300f1ff0700060001002800fbfffbfff9ff4e001100f3ff0f001e000500200017fff3ff13000c00defff9fffdff00002100
090015006900fdff1600deff0600170003004efff4ff1500060048fffcff5a0005000a001800ffff47001b0000000d00120021000e00fcfff3ffdcffd7ff0300
f7ff0600030014000c000b00080014005fff0800fcff0000edffe3fff9fff5ffecff09004900e9ff1400e0ff0400e2ff130010000000caff1200e5ffefff0400
22001700080061002800c7fff1ff1500dbffd9fef1ff3400c1ff0a00f7ffe9ff6d00630002001800b6ff1a0000001d00110013001200f9ff12000d0072002a00
fdff0a00d4ff0600020009000100c7ff0400a700ecff2600f6ff0700ffff01001000170055ff160023000c000800e4ff1200000000000200f3ffeaff09000100
f0ff0400f8ff2e001800edff0000170097ff0b00feffd5fff9ff8cffe4ff0200d7ff00000700d5ffe1ff0e001f0009002a000300fefffbffb6ff1200eaff2600
3a00deffe7ffecfff9ff18001f001500feff09001500190007001600e6ff1300f9ff24000400fffffbfff6ff0400dcff12000f00070000000600f4ff28ff1200
81ff3b002f00e5ff08009cff1200eefffdffd7ff27000c000d00fcff0f001200fcff10000b00f0fffcfff0ff0a00f2ff01001400f6ff1000f0ff000000001d00
2d00140000000b00dcff20000100f9ffe9ff0f002b000300dcff3d000300f2ff6b00100005001e0014003b0031000cfffaff12001300e3ff2200f7ffe3ff0100
02002a00e0ff04002900e0ff0000090020000700fdff0c000900fafff1ff450000000d000c00feff6d00210002000f001f00ccff0500fdfffeffc4ff0d00f6ff
2b000e00060015000100f9ff0e002000f0ffa000000014001c000000f5ff0600e9ff13002100d5ffebff15000400e4ff080002000c00c5ff7500f1ff1300faff
1a003200110024002b00beffe1ff1900d5ffd0fef0ff6700ebff04000200e3ff03fff9ffb1ff08001c001100f8ff0a0010000000220013fff2ff1100c1ff1700
dfff0600d5ff0a0004000d000000d1fffeff050017007fffe4ff00009cfff7ff0b001f004dffffff28003f000700d7ff0e000300fdff0900fafff3ff14000c00
0000e1ff3c0004001800ccffecff6700e0ff2f00fdffeaff02003200e7fff0ffceff02000600f3ff5f0001002500fbff10001300fdff1a00d6ff2100f9ff0200
260022ffc2ff0e00f0ff0c000c001700f8ff9aff7aff090020001a00f9ff160000002a00a4000500d7ff00001d00dbff18000100f1ff05000c00f4ff5aff1000
10007eff1600d6ff0800a6ff1500f8fffeff14001e0010001100f4ff0400faff07000c00feffe5ff0900f7ff0600f2ff24ff0600faff0200f6ff3400f4ff2900
120002000000170013002d000f00fcffdeff110042000c00f2ffdbfffbff0f0046000f00f0ff1e000e00edff210013fffeff09000800daff170014000e00f6ff
08001600f2ff00009d00daff05001500b3fe2100faff0d00050008001a005600d8ff06001700ecff6100f2fffeff20000200eaff1900fcff1700c9ffa9fff7ff
020016000c001f000000ffff0800fcff08000b0007000200fdff0200f6ff1000ecffe6ff0b00efffd2ff0e00faffeffffcff0100f7ff1efff2fffdff2000faff
2b0004000a002400360091ff09000700d5ffc7fef9ff0200cbfffdfffaffedff4a0025000e002900e8ff0300f6fff3ff07000b00d2fed1fff0ff100058000f00
eaff1200d6ffffff100000000b00dbff16001100f8ff3500f4ff050085000600d1ff1200c0ff0600340044001700e0ff1500040004002500f5ffd3ff15001500
eaff0f0093ff00000a00c7ff09003300e9ff080005002900edff0d00edffe4ffd3fffeff1a00eeffe8ff05001d001800450006000f000d00d1fff9ff02001100
eeffb3fffffff4fffdfffcff1000ffff0600d6ff3d000a00e1ff02002300130018001c001400e1ffffff18008700c9fff5ff0800f0ff0c00080000005dfffaff
250016000600ebfff6ffa8ff05000b00f0ffdfff1e002600fdffe4ff1500e8ff0d001a000f00ddfff9ffe4ff1d00f2ff05001c00f9ff0300e3ffc4fffeff2d00
20000c0004000200feff0e00fffffbff6fff0700d8000800dbff2700fcff0d000500200006001800f7ff2e0038001aff03001e000a00cbff1f000300e6ffffff
fbff3000efff01002300d4ff15002b002e00fdffe9ff1a00ffff130001001400d9ff0e000100a6ff25001000fcff220013002a001500f7ff1f00cfff0200faff
00002200faff0700f6ff0d001400feff03000b0007000d000800e7fffaff0000effff3fffeffe4ff19000300f4fffafff4ff0e00e2ff1bff2f00fbff0500eeff
2b00060004002c004300c1fff4fff7ffe0ffb9fefbff2500f7ff0400effff2ff01001c000d0024001000f8fff8ff04000f0007002e00fafff4ff0800d1ff1500
3a005affd7fffdff1a0045ff1000e1ff080001000b002500e9ff04000e000b00fcff1400c8ff100031002d003000e8ff080002000000eefff1ff76ff13001b00
e2ff0a002d0028001c00f0ff02000300efff300003004300e9ff0400e8ff0b00e6ff0a00370005000400feff1800ecff4d001900fcfff1fff8ff110005002800
0e000c00d7fff9fffaffefff0700ffff04008fff26000600fcff0e002c000800080019000500efff21000a004d00caff0f000e001000fffffaff00005efff3ff
18000a00fffff3fff6ffadff0e00f5ff0000100024000100fdffecff1000f1ff0b000b000200f5ff10000000f7ffffff0e000d00f7fffafff4ff2900f5ff2500
13000200f9ff0d000500ecff0000f8ffe1ff0f00090003001d001f000c00060002001b0039001500efffc0ff320091ffe4ff8fffffffbeffefff0c0001001900
08001000f9fffdff1e00ccffe9ff130016000c00f7ff1c0000000d0007001300e1ff0300050056ff23000d000800030003000c002300fafffaffccffecfffaff
f9ff09000300f5fff3ff0200150005000400fcff0b0011000500f2fffcfffeff030007000300edfff4ff09000600000005000b00eaffbdff07000300fdffddff
2b00f7ff0c001a003d00eeff2800fdffeeff95fffbff0e00deff0100ecffecfff7ff240004002d00f4fffdff0b00efff0a000d001c00f6fff7ff04001d001300
f3feb100d0fff4ff0a000c000800daff0a00080000001500efff0000fffffbfffaff1f00c9ff0f002c003e002c00e5ff05000d00e0ff0200eeff56ff1500fbff
f3ff0c00f1fff8ff2500f4ff13001000faff14001e00160024000900eeff0700f6ff0c008b000e000b0003000c0004000f0013000900000010000e0017003d00
0500f7ff4f001000e7ffc3fffeffd4ffecff1b001f00fdff0f0011003b001a00b9ff26001100feffd4ff0900f8ff93ffdfff0e0010001300110000009dfffeff
2c000f00eaff19003eff43ff0900b5ff2200b5ff33003900120026001200d8ff26000b000500afffedff1500feffe5ff0000f8ffe9ffedff5aff09000b000700
3d0006002e009a00280077000000f3ffffff12003a0003001b002400e6ffe1ffd1ff38003100e4fe1a0010003e00d5ff3400ebff0700b6ff3b00aeff0d000800
1d00fffff2ff08000f00d3ffecff26002f00caff1c006700f5ff0400ecfff1fff1ff61000c001200fbff010004004700030001001a00f2ff0600d2ffb3ff0c00
11001d00fafff4ff8400090010001e003100030018000800f8ffe2fff0ff1800c8ff20004400d2ff0300c0ffe7ff5b00f8ff0500f8ffb7ffd7fffeff8a000e00
370015001600050040002fff11001900f7ffc5fff4ff1000ffffffffeaffe2fff8ff7300ffff2200ccff2e00050010001400efff1700f3ffe0ff2400e9ff1200
0d00fdffc7ffe6ff1d0009001100c9fff8ff02000500fcff210000001300deff71003000a6ff1d004d00060011003a0002000700f1ff0300f8ff0b00fbff1600
0900ebfffdffd0ff350007002d00000079fff5ff1f005efff1ffeeffe6ff0d00e6ffefff1b00fcff00000f000f001500d7fe1d00f6ffb6ff13000b00bdffddff
0500caff4f002c00f4ffc1ffd2ffbbff000013001f00deff74001d003d002a00cfff240013000d00e9ff10001100abfff1fffdff0000e9fffffffbffa6fff7ff
20000c0083ffcfffa9ff72fff5fff5ff22003b0041001800f5ff28001c002a000e0015001300b1ff0a00e0ff21000e00f7ff0d00f9ff2400d1ffdeff09000a00
3b002b001200faff47006500e1ffe4ffe1fff9ff230009000d003e000700e9ffb6ff2a00e1ff2d001c00a8ff410066ffd2ff0d001a00b4ffe0ffb2ffedff1600
4c0172001d0008000e00cfff0a002e000e001b001b0040fff6ff120002004300ebff4400350003002f003800000040000b00bfff0600f7ffe1ffe1ff3d000f00
2500f9ff09000c0035ff0000180012005800040024000000e3ffeaff0000fcffb7ff08006900e8ff1700c2feeaffeeffd5ff0600edffb6ff1600f5ff6dfff9ff
340017003000d7ff38002bffe2ff1c00efffcdfef1fffbffd5ffffffe3ffd1ff28002100fcff0100e6ff3800feff12000b00edff0900fdffe3ff1e0060004c00
0800f0ffd5ffd5ff210015002c00aeffeffff8ffd20007001f00f4ff53002400720021003dff24002a00fcffeeff40000900c1fffafff7ffefff0d00fcff0d00
04002200eeff37002900e7ff2f00110072ffe9ff01002ffff9ff1800e9ff0300deff0b001f00f1ff0e005aff0d000600680014007700090018001700e3ffc2ff
f2ffe3ff1b0022ffeafff6fff1ff97ff09001100200028001600220039003200fdff0f0015000400e1ff00000d00a4ffdafffdff1000f5fffcfff7ffd4ff1500
1f001300b3ff310047005cfffeffc5ffccff1800230016001600caff14000700190037001100f1fff6ffecff0600e3ff0a000200f4ffeaff76ff0f0013001500
61002900e3ff1b0029001900faffddffffff09001500130032002000faff0400e4ff1f00feff30004b00e5ff1d00b6ffe6fff1ff1d00b8ff2900dafff4ff0100
14006500c6fff0fffbffd9ffe7ff1b0016002700dfff3b00daff0d001700f9ff150026001a000600f5ffacfffdffb3001b00b9ffeeff0a00e5ffe4ff75ffe6ff
f8ff0600190017003100eeff160009000500050028005601f4ffdafff1fff3ffc9ff0f006300d0ff0d007200edffa6fffdff0d00fcffabff3100f4ff4f00fdff
2600e3ffbfffe2ff35001dffdaff1500eaff54ffebff12000000f3ffe5ffdafff4ff47000400d8ff30002100f9ff1e000a000400f6ff020007001a00c2ff3f00
0700fbffd7ffccff19000e001d00bbff0e001b001f0015001500e3ffe7ffe4ff5300190041ff0f0032000400050025000000b2fff4fffaffeefff3fffdff0400
ffff02002d00c2fe33000a0016000b0080ffffff23006effe9ff0300e9fff8ffdcfffbff1400eafffeff39001c00e7ff33000b000900fcffe7ff0a00edffe1ff
f0fffafff4ff570003000d001400d1ff0a000900fffff5ff2d0021001a00280005000d0014001500300000001400a5ff0900f7ff050001000700e7ffdcffefff
67ff1600eefff4ff000078ff10000900fdffd6ff11002c00ffffe7ff1500d8ff2f00d8fffdff03002100fcff0f00faffdeffd7fffeffe2ffdefff3ff1e001600
0d002c001d00f4ffd2ff03000d00f3fff5ff14002300f9ff2300feffeeffd8ffdeff1000ffff0b002e00cfff2500bdff320012001a00b9fffbffc9fff4ff0c00
170006006c0014000e00e4ffecff000016006000e9ff1f00f3ff9efffcff3a00ebff10000b0000003f001600f4fff8ff2a000c00dfffdfffd3ffd7ffedff1900
15001000d8ff3400dcffceff1300ffffa2ff2c0012001400c6ffdbffeeff0000bdff1e004a00d3ff0b00d2fff3ffd6ff07000d000200b7ff0f00040021000100
25001c001e00eeff290013ffd7ff0b00e1ffd3fefaff3100d1fffdffecffdeff59001f000400eaffadff260003002100fefffeff06001500feff100092004300
ebfff5ffd3ffc4ff1700f0ff2300befff2ff6001f2ff37000200f1ff5200ebff35002f003efff7ff2400ffff0c003b00f8ffbafff3ffe1ffecffe7ffeaff1000
e2ffdeffe8ffb0002200f7ff06002a0092ff09000900a3ffecffd4ffebff0300ccff0a000100d0ffcdffcaff1700faff2e0010002200f8ffd8ff1b000200b0ff
42000000c5ffc1ff05000c00eaff13000f0009002c002800f2ff1f004a0027002e0019002000ebff2000d7fffdffadff1600fbff120000001200dcffb8ff0700
72ff11001100e3fffdff86ff170051fff5fffdff120033004200d9ff260010001b001a000b00edff000007000b00d9ff0700e1fff5ff180060ff000018001400
0d00f6ff0b00ffff1f00d9ff0000f3ffcaff1c0019000400f2ff3b00f8ffd1ff260011002f001f0025004500340098ffbfff15001800b8ff0b00efff0000fcff
0d005a0087fff6ff2500e1ffeafffeff650021000b00ebff0100e8fff0ffeeff1f001b00f7fffdff33001100280000000b00edffd9ffeefff6ffdffffafffeff
edff0b0000001300e6ffe6fffeff1f00300058010b003e001300f1fff9ff1a00deff15002c00a8ffdcffe4fff4ffebfff2ff0300000085ff2700f1ffeaffdbff
17001500e8ffefff3a002affe8ff1a00d2ffe1fef9ffdcff0600f9fff1ffc9ffe1fe01000a00dcff29001600e6fffafffeffecff30001800f7ff0d00caff1300
c1fffbffe4ffb5ff090019001100ccffe4ff30001000fafff2fff0ffddffefff0400210047ff060027003000f5ff4c00eaffcbffedff0800f2ffe9ff00000800
0f00dbff4600c3fe1f00e4ff08001a00d4ff08000600b7fff9ff47ffedff0700b9ffeeff080002004900fbff1400f3ff1b0008001f002000e5ff0800f8ffecff
f3ff85ff82ff0200ebfffbff13003a00f6ffceff47ff12001f002f0027001e0011002f0043010200fbffdfff1c00a9ff2800f1ffdcffecff0e00deffd2ffebff
2600e3ff4900490004007aff1000f7ffffffc8ffe7ff3400f9fffcff0a00bcff08002c001d00f0ff1900e3fffafff9ffc5ff0900faff0e00e9ff0f0014001a00
1200ffff27001d00d3ffebffd1fffaff1200160024000200ffff1800f2fffcff26002600030028000400c8ff390070ffb000dbff1300c0ff4e00000069ffd7ff
21002c00efff1600ecffdaffe7ff200087002f00b0fffaffe5ff0a0000003f00faff1400f4ff90ff63001500e1ff0e001300a8fffbfff0ff3000ebffb2ff0300
28001200d7ff1500e0fff2ff2200f6ff110026000000ffffaeffdeffeffffbffd7ffddff1400edff21001a00f3ffe2fff8ff0700230039ff0000150053000900
3200deff1000c6ff2e001cff0e001800d6ff3fff0000c8ffd6fff5ffedffceff370007000f000100d6ffe7fff5ff1900fefff2fffdff8efff6ff0e005f001e00
c2ff1800d1ffb3ff1d00fdff3e00daff07000200edff2900f8fff5ff1e001b00a3ff2900d0ffffff3800420033002300f4ffc7fff6fffcffe5ffc2fffbff0e00
cbffedfff0ff15000d00dbffe9ff2900edff27002c00dbffe5ff3b00faffe6ffddff1500feff0400b8ffffff01000c003a00080015000900f1ff0c000e009fff
cdffcfff5bff11000b00f4ff000019000000caff25002300daff1b0005003e00360020001900e0ff380014001901a4ff1e002000f0ff10001300f5ff79ff0600
28001f001a00b9ffe1ff8eff0e00f1fff8ff0b002a002e001800d6ff160031001b00e5ff060009000600e9ff1e00efffd7ff0000f5ff040064ffe4ff1d002f00
2f000b00060022001f00deff1f00feffe9ff0a007200f0ff0c0024000a000a0014001d000d001d0014002100fcff6fff0aff07001600acff6100070004002d00
20004f00f4fff7ff2800cbff6f0019006b002f00f0ff3400f6ff1b00fcff4200d1ff15000c00d3ff1f00efff0400fcff2a00370012000a00e6fffaffe9ff2400
19002d0000002600c9ff070015001100efff13000f00f5fffdffcaffebff1600e6ff06001000d4ff02001e00f4ff0000f8fff7ff64003dff1400f5ff0000c9ff
2a00fcff0200f9ff5500e9fe05001100e6ff5ffff9ffd5ff0c00fcffd6ffd9ffe0ff040002002000e4ffdbfffeff01000f0002002e00bbffe9ff09000600f4ff
38005affdcffc0ff0b00a7ff1700eaff0b000100f1ff1a00deff02003c000900c8ff0b00c7ff13002e005600e2ff36002300ceff00000f00ebff3dffddff2900
020004002900e7ff1d0025000000d8ffffffe8ffc3ffdbffdeffc8fff5ffe1ffd8fff5fffbff09002f000b00ecff0f001e001100ffff0600f4ff01001200f3ff
0400020035fffcffe2ffedff10001f000f00bb0034001100e9ff2400240015000c0016000a00bfff0f000c003900a5ff1300120005001d000300f7ff89fff0ff
2a00f0ff28002700f2ff88ff0000e4ffe3fff8ff87000c00fcfffbff160018002100efff1400faff2b000900eeff0100e2ff2900e0ff0900d2ff2100eafffcff
3500140017002b000b00ceffbafffcff08000a00320007000900250007000a00eeff2f0020003600e3ffc1ff36009aff4000ceff0300b6ff08001500e5ff3600
10002a00c6ff00001e00bdff94ff13003600fafff5ff1a00f1ff0500e7ff1d00fdff0600faff59ff4a002e00f5fffcff0b00baff220007002800d5ffd3fffdff
efffc2fffcff1f00cfff16002a000300250007000600faffdeffcbffe9fff2fffcff1100f9fff8ff3b00eeffebfffbffe4fff3fffeff3eff02000d0008000700
30000000f3ffe8ff2900fafe23000100f0ff99ff0200d0ffc4fff0ffe8ffe6ffeaff630004001a00d8fffbfff4ff04001500ffff0c00effff4ffffffd7ff1a00
10ffb800c7ff06001600f9ff1c00dbff0000f5fffcff0b00f6ffe1ffbdff0e00c4ff3000abff360045001e002dff1f00f8ffdbfff4ffdfffebff8dff0c001400
abff0a000a0005001d00eaff1b000200ebff06001800f8ffceffdffff7ff0a00ecff0f0050000000ecfffcfffafff1ff07002300020032002500f9ff2700fdff
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
e5fff8ff1c00fbffe4ff1800e0ff1100e3ffedfffcff0d000d0008000f00ccfffcff2400c8ff23002f002800f6ff80ff010012001f00f9ffedff13006cfffdff
0500ebffebfff7ffd8ffb0ff2000eeffe8ff2000c1ff0400f4ff04000a000100fcffeeff0300fdff40001100dbffd8ff07002100d0ff91ffe1ffe1ffebffdeff
f0fff7fffcffe5ff28000f000300f8fff9ffd7ff05001500d1ff1a00f3ff0400f3ff0e0007001200fcffe0ff1a0002ffefff1500ccff50ff3f00d8ff03000c00
cbfff4ffe7ff120000009fffdeff0c000300feffebff1a00f6ff1300f6ff00000c0001000f001f000300e5ff0100080013000b00d8fff6fff2ff1000fffff8ff
1600e9ff14001800ddff1300f7ffe9ff1400e8ff1300cfffe6fff9ffe5ffecfff3ff02000f00c5ff2200f6ffe5ffefffd8ff3300ccffb1ffe8fff9fff1ffbcff
d3fffeff13002b0080fff4ffeeff10003500dfffd6fffdffd1ff7bfff8ffbbfff6ffd8ffffff0700f8fff7ff0e00ebff52001400dbff2000fdff1200f7ffeaff
0100fdff1f0021000b0000001900b4ffc3ffd1fff9ffdfff1200ffffdafff0ffe8ff02009dffebffceff1600e1ffe8ffdbff83fef9ff0500fcff000025000500
0f002900f0ffe6ff1000d1fffbff0a00e3ffdbfff6ff05000600f4ffb1ff0d00f9ff000008001000ffff0700fcffe7ffcffffaffd1ffd3ffefffeeff02001600
e6ff18001000effff8ff2c00deffecfff3fffffffdffecffd2ff1c00e7ffe3fff7ff0a00e7ff11001f00f4ffe2ff7cfff3ff0b0015000b00f0ff280087ff1900
ddffedfffcffc7ffefffa7ff1b00f9ff11002e00f1ff0200f6fff8ff0900fbff0100e6ff04001700f6ff0500dfffdcff07001d00e9ff0e00e0ffe0ffe1ffeeff
fdffe0ff070001000e0004000b00f6ff0f00f3ff080002005dfffefffeff0a0009000b00feffe7ff0300ebff1b00fefef5ffffffcbff55ff1300e9fff9ff1200
cbfff5ffd4ff0800fbff97ffe9fffbfffbfff8ffeeffe6ff00001900fdff03000b00f0ff10001e000a00c9ff1300fcff1b00f4ffe9ffdfffddff1300f5fff2ff
0100ebff14000900e9ff1400ffffe0ff0300dcff1300d6fff5fff1ffc2ff1a00e2ff0100e7ffcbff1300e2ffd8fff7ffd9ff2600beff39fff0ff2b00f7ffb2ff
c0fffbffedfffdffccff140006001f002300f7ffd1fff3ff9bffd9ffc5ffa1fffeffc7ffedff0100edff19001d000a005d00f4ffd7ff2000eeff17000b00d2ff
dcff0f004b002300130018000600a1fffeffd2ff0100deff11000200f9ff0700c7ff14009aff0200cdff0a00ddffd4ffe1ff3a000f000300f4fff5ff1f000a00
1f000700e3fff3ff1e0004000700e1ffddfff6fff3ff19000500f2ffabff0e00c1ff0b00f3ff1300ddffe7ffe3ffdbffdcff1f00fcff0000fdff0500f8ff0c00
f9ff0b001600f2ffdfff2c00ddffedfff2fff3fff5ff0100f9ff0f000700e9ffeeff0500e6ff1d0027000500e3ff6dfff6ff15001000f9ff00001c0074ff1000
e9ffeeffe9ffdcffedffa8ff2300fefffcff3000edff0a00f8ff0500f7ff04000300f0ff00001100f5ff1800e5ffd6fffaff1800e5ff0e00d2ff0b00d9ffdfff
1000f1ff01000500090004001b000a0008000700fcff1200a3ffffffffff0000f0ff1300060001001400efff2000fefeebfffbffc9ff3dff2200e2fffeff1f00
cbffeefff3ff0a00f9ff98ffecffffffe8ff1800f4fffbff07002800faff13001100faff1e002400f9fffdff1300fdff10001400e7ffe6ffedff0e00effff7ff
1f00fafff9ff1f00eaff26000200ddff1400ccff2000d5ffdeffebffd4ff0800cefff5ffedffd1ff1100f1ffdffffcfff5ff3000ddff77fff8ff1100f4ffafff
c7fff9ff070026007fff1100e6ff29003300edffceff0000beffcdfff8ffc6fffbffe1ffedff0c000300fcff2000feff5d004e00e8ff1a00f5ff0f00ebffe9ff
efff070036001f000b0004000300a1ffeeffcbff0800d7ff15000900f1fff1ffe7ff02008bfff4ffbdff2300ebfffbffe7ffbbff02000000eafffbff2a00ffff
1400fdffe7ffebff0f00eefffdfff2ffd8ff1000f9ff11000400f4ffabff0900bdff0e00f8ff1700e0fff2fff0ffe6ffe3ff0600ccfff0ff0300fbfff6ff0500
ebff19000a00ecff02002800e5fff6fffdfff7fffffff8fff7ff0400feffe5fffbff0000e4ff17001000fdffe7ff68ff00000c00feff0000f3ff1b0076ff1400
efffe5ffe7ffeeffe4ff9dff1f000f0009001a00ebfffdfff9ff04000500f3fffafff3fff4ff1700f3ff1400edffe4fffaff1500e6ff1000c6fffcffdeff0c00
1100cfff1400fcff0f001e001000f2ff1000100000000700a0fff4ff17000d0004000900fbfff3ff1100faff260006fffaff0200ceff43ff0300e3fff4fff5ff
e4fffdffddff0200fcffa1ffe6fffcfffdfff9ffefffebff07001500f6ff01001500f6ff17002800ffffe2ffdcff03000b00f4ffeaffe5ffe0ff0a00eaffefff
fcfff0ff04001400f3ff0a00effff6ff0700e0ff0d00d7ff0200e3ffd2ff0a00ccff0400fbffcdff1c00e7ffdeff0000d9ff2f00f7ff2bfff3ff1a00fcffabff
c3fffcfff5ff010097ff1800010011002f00f4ffc1fffcffabffe0ffe2ffcdff0d00e1ffecff0a00efffe1ff1a0006004f000900e6ff0d00eaff1800fdffcbff
f2fffcff4000060001000c000200a1ffedffdaff0400ecff1700060000000c00fdff10009dff1500bcff1200edffeeffe2ff3000feff0200eefff6ff28000a00
13000800e0fffeff17000000f7fff6ffdbfff4fff8ff2f000a00f6ffa6ff0a00a9ff0b00f6ff1200f4fff6fff0ffe1ffecfff7ffecff0600feff0000feff0700
010009001500f4ffd5ff2000e4fff4ffebfff2ff0a00f4ffe2ff0700ffffeefff3ffdaffd5ff08000a000400dfff63fff3ff1300fdfff9ffe9ff220073ff0e00
ecfff3ffe6ffe9fff0ff98ff1a000100feff2d00edff0d00fcff0700060000000100e3ffebff140001001200ebffd3fff9ff0e00ddffb6ffd7ff0200d5fff3ff
0e00f0ff1000f5ff0f000f001400f2ff0b00040001000d00c4ff02001600000007000c000000f6ff0d00e9ff1a0007ffebfffeffccff4aff2a00e8fff6ff1100
e6fffeffe2fff9fff1ff9dffe3fff1fffcff0500e2ffecff00000b00010005000000f7ff220023000600f6ff0400040007000100e5fffeffe7ff1500ecfff1ff
1300f8ff05001600f1ff04000500d8ff0800deff0900d2ffedfff7ffd1ff0600b7ffe7ffefffcafff3ffefffe4ff0300fdff0f00f4ff3dffedff1900e6ffb8ff
bdfff5ffefff1a0095ff1400dfff1c003200faffcaff0200bdff0500f2ffdbfffcffd6ffedff0400f2ffcfff140009005c004900e1ff1900eaff0f00fbffe4ff
f2ff060047001900fffffaffe6ffa2ff0500d4fffeffdcff1300040000000600efff00008eff0900cdff1700eeffeeffe4ff0e000800dbffebfff2ff1a000900
1a00f0ffdffff3ff1800eefffbfff4ffcaff0000fdff2000fefff0ffa4ff1c00aaff0500f4ff0d00eefff4ffe7ffedffe6ff0400daff0100fbfffbff00000200
ebff32000a00dbfff0ff2700e9fff6fff7fff3fffbff0000f1ff0800f0fff1fff0ffebffe1ff00001c000000eeff6dfff4ff180006000b00ecff1e006dff1400
f6ffeafff1ffdffff2ff9cff1e00edff0a001200eeff0800ffff13000c00fffff9fff1fffaff0f00fbff0b00e6ffddff02001c00e0ff0000d1fff4ffd3ff0300
1700ebff0c00000016001d002200f8ff1200110004000d00c4fffbff2a00030010001800eefff3ff180001001e000dff0600e8ffcdff41fffcffe8fffafff4ff
e0ff0a00dafffefffeff94ffdeffedff0700fbffeefff3ff1100fbff0100faff1500fbff06002c000700ecffd3ff04000a00deffecffffffdeff0a00f6fff3ff
0600e4ff07001a00fbff12000800f9ff0400d4ffdeffd3ff0800f6ffd5ff1300beffe7fffcffc3ff1200e9ffe1fffeffdfff1900f7ff0effecff1500e4ffb1ff
befff7fff1ffffff4bff18000400f0ff2300f5ffc4ff0000bcff0000e3ffe6ff0c00dfffe8ff0800f2ffbbff1c00f8ff5100fdffefff1500deff08000800f6ff
f7fff3ff41000a00f1ff09000d00a4ff1000d5fffeffe7ff15000c00e9ff0000feff0f0082ff2600b7ff1000ddffdeffdfff0f00d5fffeffdcfff5ff15001200
e8ff0600eaff01001300f8ff1400fcffcfffebfffdff2e000000f4ffabff0900b4ff1600f2ff1500e1fffcffeeffebffe8fff8fff7fff7ff0b000600e9ff0e00
f4ff11000900f6ffe4ff1c00daffe1fff0fffdff0400f3ffdfff1900ecfff6fff2ffebfffeffdafffbff0b00e9ff6bffddff19000300edfff2ff24007bff0f00
edffecfff4ffcafff1ff9fff1c00010004002b00ebff1000fdff0300d1fff8ff0500eaffefff140002001000deffd8fffeff0f00deff1100daffddffddfffdff
0700f2ff1200ffff000029001f00f1ff05000c00feff0f00dfff01001600f9ff0a000f000400ecff0700fdff1f000dfffafff3ffcfff36ff1d00edff02000e00
dbff0200e3ff0a00f7ff94ffebfff5fff7ff0600e1ffeaff130015000400f6fff0fff1ff17002900f8ffe2ff230002000a000100f3fff9fff2ff1600ebfff2ff
0d00070000000b00e8ff0400feffdbff1000d5ff0800dfffeefffdfff2ff0c00c2ff0500e2ffc4ff0200e4ffdfffffffddfffeffe0ff0bfff4ff2700d0ffbdff
c1fffcfff0ff10007aff1800defffbff2200f9ffd7fffcffc7ff0f00bbffeffffdffd4fff3fffefffcff92ff1e0005005a000000d4ff3300e5ff05000000dfff
e5ff050047000500010009000200a1ff1900ceff0000e0ff13000e00f9ff0c00dfff0e0075ff0000c3ff1100d7ffc9ffe5ff3700c7ffe3ffe4ffdffffaff1c00
1100f4fff2fff2ff1b00efff1700eaffceff0c00f6ff3900fbfff2ffabff280094ff0200f2ff0900dcfff2ffedffdcffddff0900e1ff0000eaff05000400fbff
f2ff1400f0ffedff1b001100d0fff2ffdfffe2fffcfffaff0000ecffffffe2ffe1ffeaffdaff05000100ebffe8ff66ffffff0c000700faffe9ff1f0088ff0a00
88ffeaffeafff0fffeffaaff17000a00fcffc7ffe5ff0000f6ff0d000700f2fff1ff1600d6ff0e00f3ff2200e5ffe8fffeff0800f3ff2700e8ff0500a9ffd2ff
1300e3fff5ffe8ff22001700ffffc8ff0e000900f3ff1300cbffddff1f00defff2ff1d0002000c0005000c00040006ff0700d8ffd2ff1aff0f00e8ffdbff1900
f5ffffff010008000000a3fff9ffefffe0ff0200e7fffcfffdff2500f1ff0600180000000d0018000f00f0ff0200fdff1b00d9fff5ff0200d8ff0100e9fff8ff
ebffe7ffffff0d0000000900edffeffff2ffeeff0500e1ffecffffffdffffbff3fffefffe1ffd6ff1300e3ffefff1900d5ff1d00deff50ffe1ff1a00eaffc1ff
d0ffe8ffe5fffaff3dffeffff8ff04001400d2ffc9ff2800a5ff1100b4fffdff0300e7ffdfff1f00f9ff68ff1b00feff5a00f0ffbbff0400d3ff1100fdfff0ff
d0ffdeff2e00c1fe110019002300abffffffd8ffeeffe9ff1400f4ffeeff0b00eaff2100beff1000b3ff0800d7ffdaffdfff2100a4ff0e00c9ff01000b000d00
d8fffbffebffd7ff1a00f8ff1c00f8ffe1ffd7ffdbff2400e0ffd3ffa7fff1ffbaff0700f1ff2000e1ffdeffc0ffcbfff5ffd7fff5ffffff13000200e1ffffff
e4ff21000c001400f3ff1f00defff3fff3fffbff0200f8ff020011001c00d3fff1ff2200ddff150028000b00e8ff62ff050015001100fbfff6ff1c0062ff0e00
c8fff1ffeeffe0ffe9ffa7ff1f00fefff1ff1a00eeff0600fbfff9ff0000e8fff9ffd6fffcfffcff0000fbfff0ffdfffffff2500eafff1ffd1ff0100dfffeaff
1400dfff20000c0028001000e6ffdaffffff0500f1ff0000b5fffdffd8ff0700f6ff1d000a00c7ff1400faff1e000efff0ff0000caff32ff1a00e8fff1ff0400
bfffe7ffeaff0600fbff98ffebfffafff2fffffff5ff0a00b5ff1100e5ff01000800f8ff0c0021000300e7fffbfff9fffefff4fff2ffceffdbff1300f0fff5ff
0700f4fffeff0f00beff1200fffff0ff1000d5ff1900d3fff9fff3ffdefff5ffd9fffaffdbffc2fffcffe5ffdbffeeffd3ff3200ddff90fffdff2c00ecffa5ff
c2fff8fff1ff1b0086ff0500e6ff23002500e5ffd3ffedffb4ffe6ff0200afff0400d3fff1ff0e00dcff0f001600eeff5d001200e3ff0700efff0b00faffdfff
e9ffeaff4400240015000200f8ff9effdbffe2fff0fff6ff0d000500f5ff0700ccffd4ff93ff0000b7ff0600effffaffe7ff68ff0600f7ffedffedff2100fcff
11000000ecfff4ff0d000700f9fffaffd8ff0300eeff0d000600feffa8ff0c00ecff1700f4ff1800e1ffebfff5ffe7ffe5ff1d00d6ffe3ffffff0400fdff0500
020012001300e6fff7ff2c00d7fff7ffedfffafffdffe5ffe8ff08001200e2fffaff1400ddff110006000f00ebff67ff10001e0015000c000000160079ff1600
a3ffeffff7ffeefff9ffa3ff19000d000c001900e4ff0b00f1fffdff0a000400f6ffedff01002700eeff1d00e6ffdbff0c001100eaff0b00d8ff0a00e3fff7ff
1400daffeafff5ff00000b0027000100060015000d00150084fffcffeefffbff1b002100010006000700eaff1f0005ff0000f4ffc7ff52ff1900e2fff8ff0900
d6fff0ffd8ffffff0400a4ffe6ff02000800ffff0000acff1d0001000d0009000f00f8ff140023000200f4fff5fff5ff2200e3ffecff3c00d7ff0f00f1fffdff
0000f3ff09001300eafffffff3ffe7ff0a00e8ff1500dffff6ffefffc2ff0a00d7fffffff2ffd3fff6ffe1ffdefffcff08002200eeff3ffff4ff0400d6ffb8ff
c4ff0200f3ff08005fff1a00f2ff16002500e3ffc9ff0000bbffc4ffe1ffb5ff0b00eefff2ff1800e9ff08001700080064004000e8ff0700e9ff1e00e7ffddff
f4fffdff3f0027000800080000009cffe9ffd1ffffffeaff0f00110010001300eeff16008fff0f00dbff1000e7ffefffe4ff420007000200edffecff1f00fdff
1200e8ffe2ffecff1800e9ff0a00edffddff00000300f8ff0700f1ff9eff1d00dbff0500e9ff0700f6fffbfffffffcffeaff0b00f7ff00000b00000006000d00
f0ff0e000f000200e0ff2d00e8fff3fffcfffcfffbfffbffe6ff0c000f00e7fff6fff8ffefff0f001c001900e3ff5ffffeff0b000300c3ff0600200063ff0400
ffffe8ffe1ffeeffefff9bff1b00fbfffcff2600f2ff0b00faff05000900f1ff0700e1fff2ff040041000600deffddfff9ff3f00defffaffd1fff7ffe5fff9ff
060007001f000b001d000700dfffe1ff0a00070002001c0094fffaff090001000b000d00f8ff03000600edff210000fff6fff7ffc8ff38ff0900e1fffbff0600
dbfff1ffefff08000300a1ffeaffeeff00000d00f9fffaffd5ff0f00f6ff06000700fdff1b0025001200e9ffd5ffffff0e000800e1fffbffe1ff0f00faffe9ff
4100efff10001100f4ffedfffcffdfff1400e3ff0a00d8fff0fff8ffe5ffdcffd1fff7ff0400caff0e00e8ffe5fffeffd0ff1d00f6ff55ffe5ff1300eaffabff
c1ffe6ffecff160090ff1400e8ff25003100f4ffbeff0900b0fff9fff1ffc7fff4ffe1fff6ff0400eaff09001500feff5c000900ebff2100eeff1700f7ffb8ff
e6ff02004100160008000900feffa0fff0ffd2fffcffeaff12000100e0ff0800effffcffa1ff0700c4fffbfff5fff7ffe9fff8fe0600feffeefff9ff28000700
15000400defff1ff1900f0ff0700f3ffd8fff6ffefff0e000400f4ffa4ff1700bcff0700f8ff1100e3fff3fff7fffbffe4ff0300eefff6fffeff080000000e00
000020000d00f8fff2ff2800e0fff1ffe6fff9fff7ffe9ffc8ff11000300edfffefff7ffe3ff02002700cfffe9ff68fffcff0a000600fffff5ff21007bff1a00
faffeefff2ffe0ffebff93ff1500f1ff00002200eeff0900fcff07000b0000000000f6ff01001600f2ff1f000000d6ff00000d00e2ff0b00d2ffdcffdeffe7ff
1000ecffe5fffcff00000900230004000f002a00ffff120060fff6ff1500050013000000f9ff00000f00d4ff1f00edfef5fff1ffc7ff53ff0a00e7fff2ff0b00
e9fffaffd3fff8fff0ff9dffeaffeeff00000d00f6fff5ff11002200f9ff16000900f3ff110023000300edff0100f7ff0f00d7ffebfffaffdeff0600f1fff5ff
1100eaff18001000ebfffffff7fff7ff0100dbff0900cefff0fff5ffccff1700befffffffbffceff0500eaffe2fff6ffe7ff1c00e7ff26fff7ff1600ebffacff
c0ff0200feffffff6bff0e000b0014002b00f0ffc2ff0a00b1ffdbffd9ffccff0300e4ffebfffeff0500f7ff1900f8ff61000500dcff0500f0ff1000faffe8ff
effffdff3f00180006000700f7ff9cffffffcefffbffeeff19000a00f4ffebffebff090098ff1500c4ff0400eafff1ffe6ff0d00fbfff5ffe8fff3ff28000100
0d00f4ffdbfff7ff1c00e8fff7ffe6ffcdffedfff9ff1c000000f4ffa4ff0800b2ff0700f6ff1500e9fff2fffaffebffe5ff11000900f4ff0200e0fff5ff0c00
e7ff07000800faffe7ff2900e7fff5fffcfff5ff0000edff04000f000400e6fff9ffecffe5ff0f000a00fffff4ff66ff0700ffff1300c7fffdff24007aff0a00
0000ebfff0ffe6ffecff91ff14000500faff1600f4ff0300f9ff070001000b000000ebfffbff140005001200e3ffdcfff2ff2500e2ff0900d0fff4ffdeffedff
030003001100ffff080029001200f1ff0a000200feff0900b5ffeeff19000a000d00fafffdfffafffcfff4ff230006fff7fff5ffc7ff52ff1000eafffdff1500
defff7fff6ff0300010094ffeeffe6fffcff0700f3ffebff07001400f7ff01000000f4ff170025000100f8ff1100fbfffffffeffe6fff5fff5ff0500defff0ff
3a00f4ffd2ff1700f1fff3ff0300efff1600e1ff0200e6fff6ffefffe7fff4ffbfffe7fff7ffccff0b00e3ffe3ff0100c1ff1600e9ff0affe0ff1500ebffaeff
c2fff7ffefff10008fff1100e5ff0b002600f5ffbeff0200b7fffcffe2ffdcff0800d8ffeeff0000f7ffedff1b00faff5a00fdffe6ff1d00e7ff0d00faffe5ff
f3fff5ff3f0000000300f5ff08009cfff4ffdbff0000bcff1500feffe2ff0800f2ff060089fff5ffc9ff0500efffffffe5ff1400fbff0300ddfff1ff21000a00
eeff0200e0ffeeff210011001000e7ffcbff3e00f0ff2e000000f5ffa6ff1b00b2ff0a00fcff1400e1fff1fff9ffe2ffe6ff0000d6ffffff06000600f8ff1700
ffff32000300ffff0a002a00f0fff3ffeefffaff0200fcfffeff20000300edfffaffecfff5ff11000300cbffedff5bff00002000dcff0900eeff1f0087ff1700
fdffe8fff4ffe9ffe8ff99ff1500fcff03002400f0ff0800040010003e00f6fff7ff0300f7ff1400eeff20000900d9fffeff0100e7ff0800c4fff5ffd4ff3100
0d00eafffafff9ff150014001000e6ff02001300ffff0b009efff9ff2200f1ff0c000c00fcfffdff1600f0ff2300fafe0b00e3ffccff32ff2300eefff0ff1800
e2ff0700e4ff0000e1ff8fffe7ffe9ff0b001200eeffeaffffffeefff7ff11001200f4ff110028000700f4ff0000ffff0400ecffe9fffaffe4ff0600ddfff9ff
feffeaff08000700f3ff0300fdff00000f00ecff0500e0fffbffeeffcbff0d0081ffedfffaffc5fff6ffebffe2ff010006002300eaff18fff9ff1800e1ffb1ff
bfff030004001d003aff0c00fcfffcff2b00f0ffbeff0600b7ff0600d1ffe3ff0700edfff3ff0f00e7ffc6ff15000a0059002a00c8ff0700ebff0c00f2fff3ff
fffff4ff40000eff110008000a00a0fff9ffddfffbfff7ff17000d00f7ff0900eeff0e0084ff1400c0ff1400ebfff3ffedff2800d7ff0300d6fff8ff16001600
0700f3ffe0ffeaff1e00dafff1fff8ffd2ff0500efff1f001000f6ffa5fff7ffafff0800f0ff1c00f0ffeffff5ffe4ffebffe3ffdefffbff01000400effff1ff
ecff0a000200fdffe7ff1e00ecffe6fff8fff2ff0300fffff8ff1a000300eaffffffefffe7ff27000c000c00e7ff5fffffff170008000900ecff1f0073ff0300
85ffebffe1ffd7ffe9ff92ff1d00fcff0e000f00f9ff0a00f8ff0b00ffff0e00faffedff63000a00faff2200ceffd4fffaff1f00dafffdffccff0d00e2fff4ff
1f00ebff1300fdff040015001100edff1a00060006000a00bbfffaff2200ebff03002300f9fff6ff0f00e5ff210001fffafffcffcbff46ff0c00f1fff7fffaff
cafff9fff7ff11000c0098ffe9ffecfff2ff0600f0ffe5ff04000a00f9fffaffd7fff4ff1300260008000500d5ff00000500ecffe8ff0000fdff0200e6fff3ff
0e000500c4ff1500f1ff1100dbffe5ff0400e3ff0e00e7fff6fffaffe0ff160056ff0700e8ffb7fffbffedffe6ff0100f1ffffffdbff05ffe7ff0d00e2ffacff
bffffbffefff0c008cff0a00e6ff0e002600f7ffc3ff1400aeff1100c8ffe6fff8ffccfff3ff0b00ecff4fff1700fdff5a001100edff1f00e5ff0c00f5ffeeff
030000003f002a0018001000e2ff9bffffffd5fffcfff0ff10000800e3ff0c00edff0a006cff1100d5ff0e00ebffecffebff1e00f6ff0900d3fff2ff06000900
17000d00e7fff9ff1b000a001000f5ffc5ff4d00f8ff2400eafffeffa7ff1800b0ff0c00faff1500e0ffe9fff9ffebffdcfff3fff1fffcff0b000200f1ff1600
feff29000700dfffdcff1d00e8ffe6fff3fff7fffcfff6ffe9ff13000900f0fffbffeaffdeff000004000800ceff66fff8fffeffcafffbffebff1d006eff1000
8cffecffebffe3fff5ff99ff2000f2ff0a002e00ffff0d00f2ff10000300f6fffbfff4ffecff1100f8ff1d000c00d6fffcff0500e4ff0300dbffe4ffd6ff5200
0000e9ff14000200130015001e00ecff0b000f0003000e00afff00001800020008002a00f9fffeff1200f4ff1d0017ff02001700ceff2eff1000eafff1ff0400
d6fffcffe2fffeffe5ff93ffe1ffeaff06000000f2fff4ff0f001100fcff0a000c00fdff150028001800e6ff040009000e00f2ffedff0200ecff07000200f6ff
0500f0ff2000160004000a00f8ffe0fffdffe4ff0e00e1ff0100fbffeeff0c0042fff0ffd9ffc5ff0900f6ffe7ff0100ddfffeffe6ff18fffcff1700e1ffb2ff
bfff0000f0ff090052fffdfff7ffd8ff1b00edffcaff0900cbff0800d0ffeeff0500e8ffebff0500faff79ff1600010056000000d5ff0e00edff0600ffffe8ff
efff00004500190015001500fbffa1ff0800baff0100edff13001200f5ff0000eeff0a0088ff0800bcff1a00e9ffdcffe3ff20009effbdffd9fff1ff0c00f0ff
f3ffe9ffe5ffe9ff1400ecffe7fff9ffccffdafffdff2e000200faffa8ff040097ff0e00f8ff1900eeffeafff7ffe6ffd1ff0500eeff030000000f00ceff0400
f5ff150011000000e7ff2000d9fff7fff8fffdffffffe5ffd8ff1b000800edff00000e00e3ff15001b001200dcff66ff00000d000e00f2fff9ff22007aff1400
ecfff2ffffffdffff7ffa9ff1600faff1a001b00faff0000f1ffe7ff0700fcffecff0600ffff210017000900d7ffdbff02001300e3ff96ffd9ffe5ffe2fff6ff
0200fcfff2ff0a0012001800fbffecff10000700fdff11007fff0600eefff8ff130009000400e5ffe9ffe6ff1b0001ff0300faffc9ff4fff0c00e6fffaff0900
c8fff6ffe1ff0500fcffa4fff0fff0fff5fff9ff0500f2ffe7ff1500000003001300f4ff18001f000500d7ff0200fcff1300fbffe8fff3ffeaff1600fafff6ff
1100e6ff0f001200e7ff0300faffdeff0b00fcff0c00dcfff3fffcffddfffeffebfffcfff4ffd6ff0a00e7ffdbfffeffdcff2600e3ff68fff2ff0a00ecffb4ff
c1ffedffe8ff06007aff1000040024002600f3ffcbfffaffb4ffe4ffe3ffb4ff0000e5ffe9ff0900d5ff1a00170000005b00faffddff1600f3ff1500f5ffe8ff
e5ff0c00470021000f000d0005009ffff4ffc3ffffffe6ff0e000400eaff1000d3ff0c007bff1900c8ff0100e8ffffffedff100005000500f4fff0ff1800fbff
1e000900e1ffe6ff17000b000500f4ffd9fff7fff9fff4ff04000b00a6ff1300ddfffffffaff1a00e1ffe3ff0000f9ffd9ff0900190018000b000800fdff1300
f2ff11001c00feffe7ff2b00ecff0a00f5fff9fffffffbffeaff09000900f3fff2ff0700e3ff0f0021000200eeff5cfffeff11000f00c7ffffff1f007fff0000
fefff3ff0100eefff0ff9dff1900fbffc2ff1e00f4ff1b00f7ff03000700e8ff0400f4ff03001d0001001c00e2ffdefffcff1700e6ff0800cffff2ffe5fff4ff
d9fff8ffedffeeff100004003000d8ff0c00fffffcff110094ff01000300020004000700fdff22001100d1ff2900f3fee2ffffffc6ff4bff1c00defffdff1000
e9fff9ffe2ff0800f7ffa2fff1fff2fff9ff19000800d2ff25000800f3ff1d000b00ebff130023000f00e7ff0600feff0b000400f2ff0000e7ff0900f9fffaff
4500f2ff15001800d9ffdcff0000f5ff1400d4ff0e00d8ffe5ffeeffd8ffe4ffdefff6fffcffdbff1500ebffdbffe9ffebff2500eeff28fff2ff0b00e3ffb4ff
c4ff01005100130063ff1700f1ff1e002500f0ffc0ff0600b8ffb9ffe6ffbaff0800deffeaff0800fbff11001200060060001300eaff1500fcff1400f5ff0100
e9ff01003e00110005000800ffffa1ffeeffcffff3fff1ff13000d00f9ff3c00f0ff0a0086ff0700d5ff1000edff1600efffeffe0000fffff0fff1ff26000600
1000f6ffe3ffe6ff1800d4ff0100f9ffdafff3fff6fff6ff0600f5ffa2ff1500daff0600f7ff0f00eaff0700fcfffbffe9ff0500d2ffceff0d001000f6ff1400
ebff14000a00fefff1ff2a00e7fff8ff1d00fdfffcffeaff26000a000a00f0fffdff0000dcff0b000000d2ffeaff65ff14000c000a000100f9ff220080ff1400
0000eefffaffe9ffedff91ff160002000d002100fcfff5fffdffe7ff0800edfffbfffbfffeff1200ebff1200f3ffd9ff07002000e6ff0800d4ffcdffe2fff6ff
0800e5ff16000c00010016000f00f0ff0c000f0003008b005dffefff020005000b000000ffff07001b00f0ff2500fcfef2fff7ffc4ff4dff0d00eafff9ff0b00
e1ffe1fffafff6ff00009afff1ffecff070010000000f8fffaff060009000e000c00000011002500f4ffdeff0200fdff0b00f2ffe8ffd4ffedff0700e5fff2ff
1a00f0ff00000b00edff1e00feff0d001b00e8ff0d00e8ffe7ffe6ffe5fffdffd5fffcff0000d4ff1400e7ffe0ff0600efff2200e8ff0bffe8ff0500faffaeff
befff9fffcff130069ff0a00110019002900fbffc1fffcffb3fff0ffe9ffc4ff0400eafff2ff0c00f4ff01001400ffff5f000a00e2ff1600eeff1400f5ffbcff
ebfffaff4100150007000200fdff9affdfffddff0300e5ff07000e00f8ff0d00e5ff020096ff1300c9fffdfff1fffdffedffd2ff04000600ebffebff19000200
03001000e4fff6ff1b000e000300eeffd1ff0200fdff0e00fdfff9ffa6ff0900b8fffdfff5ff1600eeffeeff0000d7ffe1ff0e00e3ff150010000f00f9ff0700
1c00110011000400d8ff3100f4fff7fff4ffedfffefff6fff3ff08000900eafff5ff0000edff06000d00feffe1ff67ff0d00080004001800fdff1d0085ff1800
0000eafff5ffe1ffebff8eff1f00ddffceff0f00f6ff0500f6ff07000800feff0500e7fff7ff0c00fcff1a00e0ffe0fff9ff2000e2fffdffcfff3b00e6fffdff
0b00eafffdfff9ff0b001200f4fff2ff14002400020002008dff00001500fffffffffdff040001001500dbff220001fff8fffaffc6ff51ff1f00e7fffaff1600
e9ffe8fff6ff0000f2ff98fff3fff1ff0a002300f9fffdffe4ff1500f0ff21000400f1ff120027000f000c000800fbffffff0f00edfffcfff3ff0200ddfff9ff
0000f3ffe7ff1300e2ff0800feffd0ff0d00e5ff0300e0fff4ffe3ffc5ff2000bdfff4fff9ffcfff0900eeffe1fff8ffddff1e00f5ff0afff5ff0700ecffb0ff
c4fffbff3a0023005eff1800d9ff10002900f2ffc2ff0d00b3ffe9ffdaffccfffdffeafff3ff1300f6fff7ff130000005f003700f0ff0800f5ff1400e1ff0c00
f5fff9ff3900030003000000fdff9bfff3ffe3fffcfff2ff0b000200f6fffffff0ff090086ff1000ccff0700ecff0200e5ff0f00fbfffcffe9ffedff2b000300
0900c5ffebffdeff1c00e7ff0f00fbffd4ff2b00f7ff0e000300f0ff9fff1100baff0f00feff0f00f6fff5ff0100ebffe6fffbffd1fff2ff0f000e00fbff0c00
f4ff0c000700fcffecff2c00e7fff5ff1f0003000800f0ffe1ff0f000c00e9fff8fff7ffe9fffbfffcff1c00edff64ff0800fbffebfff6fff2ff1f0095ff1700
0000e6fff6ffe3ffeaff91ff19000a001000f7fff6fffdfffeff08000f00fcff00000100f1ff1b00f2ff2300e1ffd4fffcff1000e3ffc0ffcdfffdffdcff2b00
0f00dcff0100f8ff130018001200ecff0b00170004000600a5ffefff140002000a00fefff5fffdfff8ff070023000aff0700f4ffc5ff45fffeffefff01001100
d7ff0000fdfffefffbff98ffecffefff08000700fbfffdfffcff0100f6ff1b001100fbff100023001c00f2ff3900fbff0800ebfff5fff9fff7ff0100f6fff5ff
1700eefff8ff1600f1ff18000000f5ff0d00efff0800edffecffecffdafffeffbeff0000f2ffcbff0800dfffe4fffeffe4ff1900f6ff09ffdfff0f00f7ffb3ff
c5fff3ffe4ff130068ff0d000a0010002700f9ffc0ff1300b1fffcffe5ffdcff1200f1ffe3ff1000e5ffebff1100f7ff62000000faff0900e7ff0d00faffe3ff
f7fff9ff38001800fffff7fffeff9efff1ffddff0000c2ff0d000800e6ff0200f9fffdff8cff1c00caff1e00fbffeeffe7ff0400fcff0600dffff1ff2100fdff
02000c00e1fff4ff1f00f4ff0d000000d1fffeffffff2e000100f8ffa2ff0100b3ff0300f9ff1700fdfff5ff0500eeffecff0a000500f5ff1200e3ffebff1600
1c0018000700f3ffaaff2a00e9ffedfff0fff7ff0b00e1ffceff1900faffedfff7fff8ffeefffdff1600ffffebff60fff7ff0e00feffcdffeaff23007eff0300
0600eafff8ffdaffeeff8bff17000900faff1a00f5ff110000000b000000dfff0300f2fffeff0d00f8ff1100e1ffd9fff5ff0f00e2ff0400ceffcdffdfffffff
070006000000fdfff7ff21001300f8ff0a00030008000600befffbff190002000800fcfffffff8ff0600ceff250018ffe4ffefffc4ff40ff1600e7fff8ff0c00
e7ffefffe6ff0700e9ff8fffecffedffffff1200f3ffedff0700f8fff9ff0e00e2fff5ff0e0020001500e2ff110000000700f8ffe6fffafff1ff0500ebfff0ff
3800070013001c00f1ffe1ff0000e2ff0600eafff7ffdfffeefff7ffdfffecffb3fff5ffefffc8ff0500eeffe8fffeffe4ff1a00f2ff2bffedff0e00dbffacff
c1fffafff4ff050086ff0200d8ff07002600f5ffc6ff1600b7ff0100cdffdffffcffe1fff3ff0a00f5ffe6ff1500fcff64000000cfff0600e7ff0a00ffffeeff
00000a003f000b0009000300030098fffeffe3fffefff4ff12000b00e4ff0000f6ff000080ff0600c7ff0200f4fff7ffe8ff1900e3ff7dffdcffedff1a001000
1100c4fff6ffedff1e00f1ffeffff2ffd0fffafffaff1d00f1fff4ffa3ff180096ff0a00f0ff1200faffeeff0000efffeaff0700f1fffdff09000600efff0800
f2ff1c00f8fff2ffe7ff2700efffe7fff8fff4ff1000f6ff200022000400effff7ffe7ffe8ff3800e9ffd5ffecff5efffaff0d002000fbffebff210088ff1200
0000ebffecffddffefff8eff1600fbff06000600fbfffffffdff080007000a00ffff0000f4ff1200f7ff1900faffd6fffaff1500e6ff0600d0ffffffd9fffdff
0100ffff08000000190019001a00ecff08000c00feff0900c1fffbff1d00f8fffdff0300fffff3ff13000f00220009ff0400e6ffc9ff47ff1500f1fffdff0f00
eafffeffeffffaff030090fff1ffe2ff11000600f1fff1ff06000c00030014002400f4ff13001f001000e1fffcfffcff0900e4ffe7fffeff03000300e1fff4ff
1500e0fffbff1000efff03000b0010000f00efff0400e3fff2fff2ffe9ff0d0059ffb4fff1ffccff1100edffebfffbffdfffffffe7ff3bfff2ff1b00efffaeff
c1fffdfffcff070039ff06000d0000002200f5ffbcff1e00b5ff0500a4ffecff0900e3ffeaff0f00e4ffd9ff140004006000fafff6ff0000e1ff08000e00f1ff
ecffe7ff3a00e0fe0700faff140098fff4ffccfffbffeaff08000700cdff0700f0ff030077ff1300d1ff2b00e8ffeeffedff2200f4ff1200bffff6ff0e000000
3f000000e5ffe9ff1b00f4ff0b00f5ffcaff0c00feff2300e8ffedffa6fff5ffb4ff0000fcff2000e7fff2fffbffe9ffedff0500e9ff010013000e00e9ff1800
e5ff0c000000eaffebff2000eaffdefffbfff4ff0d00effff9ff0b00feffe8fffbffdeffe9ffecffeefffeffe2ff56fffbff1300e6ff0800efff210089ff1200
d1ffe9ffedffd6fff5ff94ff1d00020010001900fcff060003000700f0fffcffffffeffff1ff0e0002002800eaffddff02001000e8ff0a00d5fff9ffdbff0000
1e00eaff0a00fbff040020001600eaff19001400f7ff1100beff00002200000006001300fefffeff0600cbff1f00fbfef4ff1f00ccff2fff1200f2fffaff2100
cffff8ffe7ff0300dfff92ffeffff2ff02000b00ecfffdff1300170000000000b9fff6ff17001f0009000200060000000f00fcffeffffdfff7ff1100cbfff8ff
0000dfffdcff0700edff0c000500f9ff1400d4ffffffd3ff0000f3ffe3ff1d004bff1600e3ffbcff0700f6ffeefffefff7ff1600e5ff39fff8ff1600d9ffb7ff
c2fffcfff7ffffff7dff0300ecffdcff2300faffcdff1e00b3ff1200d2fff1ff0000d8fff0ff0c00ffffc2ff2100fdff58000b00e4ff3800e3ff0800f9fff2ff
e9ffe8ff470004001b00fdff1000a3fff8ffd7fff1fff5ff07000b00f6ff1200e0ff130067ff1900c6fff7ffe8ffddffe7ff1e00a2fff7ffd4ffd8ff0500fcff
0a00f7fffbffebff1d000000fefff4ffcfff4600f8ff10001600f0ffa8ff1e009bff0100e7ff1400e8ffe9fff9ffe5ffd9ffe8ffdeff01000a000900edffefff
ddff0d001700fdfff4ff2100f1ff18000000f5ff0700e1ff0b000800fbffecfffeff1400efff13000e000200e8ff66ff07001d001000fffff9ff1a0080ff1400
f2fff3ff0800f2fff6ff9fff1f00e9ffcaff1d00f0fff0fffaffd3ff0800f5fffaff050007003500fbff1700dfffe4ff00000c00e7ff0d00ccff1300e8fff5ff
eaffe0ff0c000f00120017001800f2ff10000f000900ffff97fffbfff6ff03000f0012000100e6ff1100ecff2100fffeeaff0100c4ff52ff1400e3fff2fffaff
ccffebffebff0c00ffffa2fff7fffeff0100f7ff2300ffff17001700fdff1b000e00fbff0c001f000d00deff0d00f1ff0e00d9fff5ffcaffdeff1500f2fff2ff
0d00eeff0d001c00e6ff02000600f5ff1300cfff0c00defffcffe3ffdffff6fff2ff0000fcffd3ff0c00fbffdfff0500eeff2a00e9ff1cffe9ff0c00d7ffaeff
c7ff22006c001d006fff0e00f1ff25002100faffc5ff0100b8ffd4ffe3ffafff0f00ffffeeff0d00040016001300faff5f001100e8ff080003001200e4fff1ff
e7fff8ff4300180013001a00feff9fffe7ffd4fff5fff7ff07001800110020000100fcff6bff0300d3fff5ffefff0300f0ff2d0008000900f3fff3ff1c000400
17001000e4ffefff1900ecff0800fbffdcfffcff0100f5ff0900ffffa3ff1300eeff0c00f0ff0200f6fffffff9fff3fff3ff1000e0ff28000f000e0003000500
f5ff150014000f00e4ff2a00e6ff0e002400fefffbff0c00e7ff0d000500f5fffdff0400e8ff0e000c000f00e6ff64ffffff10000b000300fbff1a007aff1100
faffefff0d00f1fff2ff92ff1a000500e7ff1c00effffeff070017000100e2ff3900e4fffdffffff17001600ecffd3ffffff1a00e4ffe0ffd7ff1900e6fff6ff
0800efff1e0013000f00060075fff3ff0b001c00ffff1a0086ffeeff0100f7ff0400050003001800120000002300fefeedffecffc6ff4fffedffe7fffdff1600
f1ffe9fffbfff1fff3ffa1ffe6fffcff04002a000600e4ff3d002100280021001c00f7ff210023000900effffeff19000f000700f5fff7ffe9ff0a00daffe7ff
1100f6ff09001100e1fff7ff0000ddff1800e9ff0f00cdffe5ffe6ffdcfffeffdbfff5fffaffd3ff0000f3ffe0ffe8fffdff2a00f5ff0fffdffffeffedffa7ff
c3ffc6ff25003c004fff0100eeff27002800eeffc4ff0f00b7ffe3ffedffbcfffffffbfff0ff1200dfff070013000e0062003700f8ff040008001500f4ff0d00
e9fff7ff3e0025000c000700fdff9affeeffe0ff0000f7ff0e000b00f8ff0b00faff060064ff1000ceff0c00000010000100d0ff0700f8ffefffeeff2a000000
0a00f7fff0ffd0ff1600e5ff0b000100d9fffdfffbffedff00001200a3ff0800d9fff3fffbff1700edfff8ff02000500ebff01000300e1ff25000a0006000f00
280011001300fafff5ff2e00edff0500fdfffeff030088ffc9ff0d00f9fff4fff4ff0600eeff06001b000400e4ff65ff13001300ffff0400f7ff1b0088ff1500
0800f1ff00000300f7ff92ff1b00e0ff2c001100f1ff0300f6fff3ff0a00110004004c0000002900fdff0b00e9ffdefff7ff0a00e7ff0200c9fff7ffe3ff0400
f0ffefff9fff0300000017002b00deff0600100002000e0074ff00000800fcff06000000fcff1d002000d4ff2500effe0000faffc5ff55ff2600ebfff5ff1300
dbff0700d6fffafff6ffa0ffeefffbff0800fcff110006000b000100000034000c00f9ff0f0025000a00ebffe5ffe6ff0600e5fffdff0200eeff03000d00feff
0f00f3ff11000f00e3ff08000600efff1700edfffaffeafff8fff2ffddff0900cdff0100fbffceff1500efffe8fffdffe0ff1d00ebff1aff04000000d8ffacff
c7ff1000efff050067ffffff06001a002900f3ffc2ff0300b3ffecffe5ffc6ff01000000e1ff1b00e9ff10000d00030065000600f8fff9fff3ff1600f6ffccff
f7ff0100390017000d000a00fbff9bffe9ffcbfffafffaff0e000900f2ff05000400020087ff0e00cdff0c00f7ff0c00feff280000000000ebffecff25000200
0a00e6ffe3fff3ff1e00cafff5ff0800d3fffdff0200fbff0200f0ff9fff1100c8fffefff6ff0a00f1ffffff02000800ebff03003100dfff17000e00fcff2000
fcff020013000100d8ff3300ecff0900deff02000700eaffe0ff0a000f00effff2fffbffe8ff090011000e00e6ff63ff200010000c000f00f6ff1e008cff6e00
0500eeff0300dffff2ff8fff2200f1ffe7ff0400f9fffdff0d00fbff0400fcff1600e6fffbff0b0008002500ffffd6ffffff1400e5ffd2ffcfffc5ffe9fff8ff
0a00fbff06000600230018000c00feff06001000060010008dffeaff1100fcff1500ffff02000c002200f3ff2c0029ffdafffeffc3ff4bffebffe8ff02001800
e8fff6fff3ff00001c0098fff3ffeefff5ff1400fcff0000fcff0400f9ff25000400fbff180021001300f7ff03000a0003002300fffff6ffeeff0100ddfff6ff
4b00f3ff06000f00e7fff8fefbfff5ff0c00d9ff0200dbffebfff2ffe0ff40ffcbfffffff5ffcfff0b00e4ffe5fff2fff6ff1b00f2ff02ffbdff0b00e2ffafff
c4ffd4ff05002c0067ff0800f2ff15002600fdffbcff1500b6ffe7ffddffd1ff0b00f5fffcff1200e0ff0a001200fdff68000b00fbff2300faff1300edff0300
eefff3ff3a00180009000800f6ff95ffedffebfffffffeff05001200ebffebfff8ff050097ff1000caff2800f6ff1b00fcfff8fffefffaffe9fff1ff1b000200
0700e7ffe7ffe1ff1d0002000000daffd1ff0200fbff0300fcfffdffa3ff1200b9fffcfffbff1300dbffefff0800eaffe8ff0c00ebff050011000b00f4ff1500
ebff2c000200f6ffe8ff3300f0ff0300faffffff0500f0ff300011001600f6fffeff0300eafffafffdff5800efff5fff08001d0000000600f3ff1a0082ff0f00
0200fafffbffe3ffeeff8cff1e00e8ffe6ff150003000c00f5ff00000800050000004b0000000c00fbff2600faffdeffffff1d00e2ff0800c1ffe0ffe0ff0a00
0800f6ff0d000400060014000e00f2fffaff0d000e000d0093ffffff1900fdff0e00fbff040004000700d2ff2000ebfe00000000c3ff52ff0f00effff5ff0100
e7ffecffd1fffeffd5ff94fff2fffcff42000a00010000001000050001002e00f0fff2ff0e0022002c00f5ff0500f6ff0300cfff0400f5fff3ff0400bcfffaff
1000f0ff11001400e9ff0100010001000800f1ff0300ecffedffddffdcff1000b9fff7fff6ffc5ff1100fafff2fff8fff4ff1400f1ff07ff0a000900e8ffabff
c7ff1b003b00130062fffaff100011002300fdffc0ff2900b8fff6ffdbffd7fffeff0000f2ff2100f2ff010011000100640004000d000400f2ff0e0000000200
0100f3ff3a00ebff0b000900000095fff3ffd9fffeffdaff06001100d5ff0500f3ff080083ff1b00caff0c00efff0200f5ff1c00fdff0600d9ffedff22000200
ebff1a00b7fff8ff1a00c5ff1000feffccff0d0007001300ffffeeff9fff07ffb0ff0900f4ff0400efffefff0700e9ffe5fffeffe7ff0e001c001600feff1400
f3fffcff0200faffe4ff2f00fbfff4ff1e00e8ff0f00feff0a0017000200ebfff6ff0400f3ff2200d8ff0900ecff5eff0300070006000200f6ff1f0086ff0b00
f9ffecfff0ffe6ffe7ff88ff18000000fcff050002000e0007000a00080000000700eafff1ff0b00fcff2900f1ffd8fff6ff2100deff0300cbff4b00dfff0000
1500f6ff0a00feff2c001c001600e8ff16000e0000000900b0ffe4ff1e00fbff19000000e7fffbff0e00deff2500f8fee8fff8ffc4ff52ff0200f1fffeff1b00
deff03000700feff11009bfff3fff0ff03001100f7ff060002001100f9ff0e000100f8ff1200230012002a0004000200030006000100f9ff06000000cafff6ff
1900eeff2e001900eefffbff0700fdff1500d8ff0a00defffbfff0ffe3fffdffafffffffefffd1fff7ffe9fff1fffcff08000d00f1ff11ffc4ff0800f4ffaaff
c6ffefff00001c0056fff8ffd9ff00002000f5ffc3ff3000aeff0500c5ffe1ff1000e6fffbff1f00f1fff9ff0f00f1ff63002700deff1f00e9ff1000ddfff9ff
feffe5ff3b0019000f00f3fffcff96fff9ffebff0000f9ff08000500e5ff0c00faff090078ff0e00c9ff2800f5ffeaffeeff1b00e8ff0500d6fff1ff18000e00
fffff5ffe8ffecff1e0034002400e2ffccff5a00f5ff1e00effffbffa4ff2b00b9ff040001000c00d7fff2ff0a00f0ffe3ff0200eafffcff1b00fffff9ff0d00
24002900dcffe8ffe6ff2e00f6fff3ff0200f4ff0d00f1ffeeff17000200effffefff5ffd5fff6ff00000700f3ff5eff01000e0032000300e8ff170089ff1900
0500f7ffe6ffdefff6ff8cff2200e6ff09001e0001000e00f4ff05000a00e8fffcff0300e7ff090006002c00e3ffe1fffcff1500e3ff0b00b9ff0900e1ff4f00
1100f5ff0d000000030018001c00edffffff140014000c00c8fff9ff1c00fcffffff00001000f8ff01002600210002ff1300eeffc9ff3fff1c00f1fffdff0300
e6ffe4ffeeff0100b6ff92ffefffeaff4f000a00ecff000006001d0005000f002000f4ff0a001d002700e8fff4ff03001600e8fffbfff8fff7ff0000edfff8ff
ffff0c0019000800e6ff1200fcffecff0100f4ff0700dbfff4ffeaffe0ff0400a4ff1a00eeffc2ff1600f4fff4fff8ffe8ff0800f1ff42ff0e001100f3ffafff
c4fffefff6ff0a0069ff0400fbff02002200f8ffc8ff3600c1ff0400c0ffe7fff0fffeffecff0c00f6fff0ff140000005d0010001600e5ffeaff08000000f4ff
0e00eeff3e000a0012000a0007009bfffaffe3fffafffcff06001400dcff0c0000000c0076ff1200c7ff1b00f6ffe1ffeaff1800dbfff4ffccfffcff29000c00
f7ffd2ffb9ffe0ff1f00c2fff7ff0900c6ff0d000a002500fefff2ffa2ff08ffaeff0600fcff0b00f7ffe8ff0900e4ffe5fff8fff3ff06001a001600e3ff1c00
0100eafff7ffecffc4ff2100eaffedffedffebff1600f1ff01001300f5ffeafff8fff7ffe5ff3a00ebff0600d9ff5aff0c000b000000f2ffe3ff19007fff0900
ecfff5ffe5ffd5fff4ff92ff1a000d000300effffafffbff070015000d00e6fffffffdffe6ff0800feff1f00feffd2ff02000900e2ff0500d1ff2700deff0200
0100ffff11000b0000001b001700e1ff1d000c00ffff1200c8ff05002100fcff12001300e8fff3ff0d00ebff240014ffd9ff2200c8ff4eff1e00f0ffeeff2c00
e4fff2ffeefffeff1e0099fff8ffeffff9ff0600ebfff0ff0b0015000d000000e1ffe8ff0a0025000c00f2fffcff07000c00f0fffaff020012000900f1fff2ff
100005000e000f00eafff7ff0400e4ff0700e9ff0b00e3ffe9ff0c00eaff0e005efffaffceffc5ffedfffbfff3fff8ffdfff0f00e7ff06ffe5ff1900d7ffa2ff
c5fffdffeeff0f0078ff0700f4ffecff1a00feffcbff2e00b0ff0900caffecff0600d8fff5ff0400c8ffd2ff1700fcff5e00fbfffbfffbffecff09000b00edff
daffebff3e0010001300f9fffdff99ffffffdafffefff9ff0e001500dfff0400f4ff16004fff1a00c2ff1700e9ffebffe6ff2100e6ffccffc7fff8ff06001100
1000fcfff6ffe8ff190001001300fdffceff190002001a002800f0ffa3ff0000afff0d00feff0a000400effffcfff1ffeeff0000ebff040015001100f4ff2a00
f7ff060027001500f1ff2400e4ff2300ebff00000000e9ffeaff06001400f8ff15001400f4ff1b0020001400ceff4efff9ff1e001000efff0100190077ff1000
feffeaff1b00cffff4ff9dff1b00feff08000900edff28000100e3ff0800ffff0e001000fdff110000001900f5ffdbfffbff0700ebfffdffcfffebfff2fff3ff
0a00f9ffc9ffefff1000fbff1500feff0d000600fcff090065fff7fffdfffeffedff1600f7ffe4ff1100cfff2300edfee7ff0300cbff4fffecffebfffdff0200
ccff0d00bcfff8fffeffabfff2fff8ff00001700070026001b001a00000032001400e8ff140019002600d9fff6ff13000300effffbff0700f1ff0c000900edff
1400f2ff15000000e7ff0000feffecff1200c5ff1200cbffe5fff9ffe8ff0200eafffdfffcffd0ff1400ffffe2fff5ffd8ff2500e4ff42fffcfffbffd2ffb6ff
c9fff7ff0d0031006ffffafff6ff1c002300eeffc7ff1c00b4ffceffe6ffb4fffffff1ffebff0c00faff180018000e0062000900e4ff000014000900f8ff1000
e9fffeff3c000a001c0016000200a7ffeeffdcff9afff4ff0c0008000300eeff1700290091ff0d00d2fffffffefffcff0000feff07000400ecfff9ff11000c00
0d00feffe3ffc3ff0e00d6ff0f000100ddffe3ff0c00e1ff020003009eff1000ebff060001000900edff0b00fafffafff1ff160016001a0018000f000f002000
feff050010000f00efff2a00f1ff22000100efff0800fdfff5ff11001800f4ff00000800e5ff120010000300d8ff59ff00001a001200d3fff7ff1b0068ff0200
000001000a00f5fff2ff90ff1700000017001200f9ff1700fcff10000c00f2ff140035000400e3ff08000200ecffe0ff00002500e6fffcffcfffb0ffe4fff5ff
08000a00060029000e001c001600eefffeff180004000d0097ff0200fefffdff0b00060004001100ffffe0ff1d0030fffefffeffc4ff4affe7ffe3fff4ff2000
eeffe2fff0fffdff050097ff0000f9ff0a0002001a00d5ff070015000900240002000300180022000600eeff0d0027000c0030000800f5fff7ff0e00d8ffe6ff
3e00f2ff18001200cbfff2ff030001001900ecffffffd1ffdfffe2ffe5ffd9ffe1fffcfffdffd0ff2000e2ffe3ffe9ffe9ff2400e1ff0effe9ff0c00f1ffa2ff
c6ffc5ff01001d0037ff000038001c002400f1ffc4ff0600b4ffecffefffbeff0e001500f9ff0000b7ff16000b00070063000000f9ff160006000e00d8ff0000
defffaff430015000f000f00080098fff2ffd4ff0400fdff10000d00dcfffdff0000090080ff18003bff1000f4ff050012001f0008000600f3ffedff1f000400
18000b00ebfff7ff1600faff0b00e6ffd9ff06000500ffff0200fdffa4ff0f00e0ffeafffdff0d00ceff90ff0500eaffebff0a00f9ff380024001100feff0d00
f6ff0a002100fafff0ff2d00e9ff1e00fffffbff1400eefffeff0d000a00f6fff6ff0500e4ff10001100ecffddff60ff2300190011000100f8ff1c0089ff2300
ffff01000e00d9ffecff90ff2400ecff35002100ffff0d001600faff0d00e5ff00000900faff0300e7ff1d00f4ffd4ff00000300e1ff0d00d1ff2e00effff2ff
0300deff08000c00120000000500f3ff0d0000000600080081ffe9ff0500fdff20000000030023001400d3ff2800ebfedbfff5ffc7ff5dff1300e0fffcff0f00
dbffe0ffe3fff7ff0000a4fff9fffbff1c0026000c001d0000001200f9ff42000900f1ff1c001f001b00d1ff1000faff0500d9ff0700fcffe6ff0700beff0500
0000edff04000f00e1fff2ff010009001200e2ff0700f7fff1ffd0ffdffffcffd7ff0000f2ffd1ff13000000e5ffecff13002600f4ff0effdbff0000e9ffacff
c7ff33006d0014005bff0000c7ff1e002900f3ffc0ff3200b5ffe2ffe1ffc4ff0d00f8fffbff1a001c0015000f00020069002f00f6ff070010001200d4ffd5ff
e5fffeff3700140011000900fdff99fff1ffd9ffc5ff070008000b00f4fff1ff0900230084ff0e00d1ff0b00e8ff030001000100feff0000ecfff0ff1a000500
0800f7fff1ffd6ff1c00cfff1200f4ffd5ff0700fefff0fffffff9ff9bff0c00e2fff2fff5ff0e00e8ffe6ff0b00e7ffe3ff0d00edff0600250015000300f3ff
f4ff0c0006000200eeff3000f8ff1a00adff02000b00fcff1c0015000300ebff00000600f3ff120008000200ecff63ff220017000400fafffaff1a0087ff0500
feffc7ffe7fffffffaff8aff1f00f5ff0900faff0c000900f9ffeeff0c00f1ff1800d8ff00000b0005002400eaffdafff8ff1a00e7fffbffc7ff2300e6ff0700
0500fcff140013000a000300fbffebff0500120007000d0076ffedff0a00f9ff2300f7fff6ff1e001b00fbff23002cfff3fff4ffc8ff51ffd3fff1fff7fffcff
e3ffe2ffc3fff2ffdeff96ffecfffbff3300240009000b00edff0000ebff16001200000018001b000b000100f2ff1e00010005000c00e9fff3ff0100d4fff0ff
0700fcffe8ff1a00ecff1c000900edff0e00e0ff0b00ddffebfff2ffe4ff0a00cafffffff9ffcbff1500ecfff2ff0000ecff1300e9ff0fffcaff0000ccffabff
c6ffc8fffbff2f0052ff020009001c001f00f9ffc4ff1600b7fffdffdbffcfff0c000500d8ff1100fcff09000a00fcff6700000012001100fdff130022000000
f3ffebff3d0014000c000700000096fffbffe9ff1000060005000d00dcff040004000c0086ffffffcdff1100f8ff070007001a000000fbffdffff1ff19000200
04001000cefff2ff1b00e4ffffff0800cfff2c001200ffff0100feff9aff1900c8ff0600fdfff8ffe8fff0ff0a000000e5fffefff3ff11002b00140000003800
640005000500f9ffd5ff3200eeff0900fafffeff0000e5ffdeff10000600f1ff02000c00e7fff8ffffff0500f1ff64ff08000600f3fff3ffeeff1b0087ff1100
0100f3ff0100e2fff5ff8bff2000f5fff5ff2600120001002100ffff0b00f7ff1f001100fdff1000f8ff2600f5ffd8ffe4ff0d00defffcffcbff0800e4ff2a00
1200eafff4ff0d00260022001000f4ff0a000e0009000a008aff0d001500f4ff26000500f8ff08001800daff2d0032ff1a00fbffc4ff56ff0800ecff02001600
e3ffe4ffe1fff7ffb8ff97fff1ffedff1b002000ffff0d00fbff0d00feff39000b00faff15001c004500e7fff6fff0ff070004000200faff00000500eeffe9ff
0d00fbff04000b00e3fffdff0200f8ff0700edff0000e9fff5ffe7ffdafffdffbefff5fffbffccfff2ffedfffcfff8ff09000e00f5ff21ff1f000000e3ffb0ff
c4ffe2fffeff030052ffedffc1ff0b002100feffc2ff3200afff0000d3ffd4ff6ffe0000f8ff1000eeff02000d00f7ff680027001800dcfffaff0d00d9ff0800
feff03003c0011000a000200f3ff99ff0800dbff0300e3ff0c0016002c0008000900210079ff0500ccff1800faffedff09001900faffe7ffe0fff2ff1f000d00
05004f000600d8ff1900daff13003d00cdff0300f9ff0700fffff9ff99ff1300d4fffdffffff0f00f5fff7ff0b00f4fff2fffeff0b00faff28000f00f4ffe1ff
0000e4ffe3fffcffedff2d00f0ff0100f8ff06000500f6ff0f0016001000f6fff5ff0b00f9fffdfff8ff0600eaff5dff050011000000dafff3ff19008eff0000
0700abfff9ffdcffe9ff8aff18000b000c00c0ff0d001a00f6ff000012001c0009003e00ecff0800ffff1800e9ffd9ffeeff3a00e4fff5ffc1ffebffe3ff0600
02000c000100fcff010017001100e8ff110011000b001200aefff0ff1a00faff06000200defffaff1b000600230008ffeafff9ffcbff44ff0d00ecfff6ff0d00
eaffe3ffd6fff7ff22009dffe6ffe7ff16001200f2ff07000300130000001d000c00f5ff0b001e002b00f6ffd5ff07000500faff0a00fefffbfffeffebfff7ff
3500fcff07000900e3ffe6fffdfff2ff0c00dfff0300e5ffe2ffe8ffe4fff3ffb6ff0600f2ffcaff0700edfff5fffdffddff0800f0ff17ffceff0200e7ffabff
cafffdffeeff220049fff6ff370001001f00fdffbfff2b00b5ff0200d2ffe4ff0c00fdfffaff1700b9ff05000200dfff6400f0fff5fff9fff1ff0d003000fcff
0600eaff390009000c000b000a009efff3ffe2fffdff0a0008000600d4ff0400f9ff080078ff0300cdff1100f5fff7fffaff0e00fbff0600d1ffeaff15000500
ecffffff0100e8ff1d00d7ff08002000c9fff8ff13001700edfff3ff9aff89ffcaff05000f001400f5fff5ff0300efffecfff9ffecfff9ff1f001f00f0ff5d00
ffff0200e5ffebffdbff2900fbffdffffcfff0ff1a00eaff020013001800f4fffeff0100ecff1200fcffe1fff9ff58fffdff0c000100f8ffedff18008dff0d00
fbfff9fff0ffe1fff8ff8cff1d00feff03002d00110008001b0006000900d3ff060011000000070004002e000000d4fff9ff1b00e3ff0900ccffcdffe6ff0c00
160008000a0003000b002e001500f5fffdff19001c00140055fffcff2100fdff47000c002200faff11009cff2200fefeddfff2ffc7ff34ff1a00f0fff9ff1300
d9fff0ffe1ff0100b1ff8dfff9fff3ff1e000600f6fffcff0d000e0004001e00d1fff4ff15001900320000000a0008001900e9ff0900fdff07000d00b4fff3ff
0e00f4ff0a000000e7fffcfff9ff11002300e0ff0f00edfff9fff3ffe5fffeffaeff0200e8ffcaff1300edfff9fffaffe6ff0b00eaff74ffd8ff0800d6ffacff
c9ff0a00060012005dffe8ffe9ff00001f00faffc4ff3400b7ff0500d0ffeaff0600efff0d001300030004000c000800600006001700f7ffe9ff0a00d3fffdff
f7fffbff3e0017000c00f0fffdff99ff0000e8fffaff120004000f00eaff0d00f5ff0e0074ff0300beff1700edffe7ffe8ff0a00e3fff1ffd5ffedff1c001f00
0600ebff1500e2ff1a00e2ff2300f2ffc2ff0300ecff1500f7fff0ffa0ff1a00bfff1500d6ff1400fefff5ff1300fcfff4ff0200f8fffdff19001400f7ffb9ff
ecfffaffddffe7ffe4ff2800fafff9ffffffe9ff1a0003001c0021000100e9fffbff0300e4ff1100e9fff8fff5ff63ff17000b000b000d00f4ff1b0084ff0900
feff0300dcffdcfff4ff8cff1d0001000a000700100005000e000c0010000700fdfff7fff8ff0300ffff2600ddffe1fff0ff1d00dfff0600c8ff2d00e2ff0900
1d00fbff0800f7ff12000a001300eaff03000d00ecff1200c4fffcff2700f9ffe6ff1400dbff0400ebff1900200010fffcff1700caff4affedfff7fff2ff0300
dbfff6fff4fffcffe7ffa1fffeffe9ff68000700e3fff4ff0d0024000b000d002d00f2ff17002700190013000500ffff1600f4ff0e00010010000100b7fff6ff
00000e00dbfff2fff0ff010012000b000b00e5ff0900dcfff9fff5ffedff1b007bffd9ffe4ffc9fff9ffeefff6fffaffdcff1100e7ff12fff7ff0600f6ffa3ff
c9ff0000050018006bffe9fffbff08001600ffffc4ff3400adff0a00c6ffe9ff2d00edfffcff08000200f8ff1800e9ff5c00feff16000700e9ff02001200fdff
e3fff0ff3d0017000900050016009ffffdffdefff9ffffffffff0800daff0900f5ff120053ff2200caff2b00f2ffd9fff8ff1c00eaffffffc2ffecff0f000300
ecff0100b6ffe9ff1800f3ff1100f5ffc7ff61000f001c00f9fff4ff9eff1b00cbff0d00f4ff0000cefff0ff0400e9ffdcfffeffe3ff0f001c001300f4ff1f00
f0ff150031001500f7ff2a0007002000f6ff110001001900fbfff1ff0a00fdffe9ff0900e0ff1300fbff1a00dbff4fff100010000e001300f7ff120089ff1e00
f8ff02000200f6ff34009fff2000e5ff5eff220005002000060000000f00d9ff0d00e3ff0c000d0005000300d6ffe1ff00000900ebff0f00b8ff2a00f0ff0000
1800daff25001f0026002000eaff0e0010000e0007001d00d1ff1400faffe7ff13000a000e00f5ff0d00f1ff240056ff0400f3ffceff4bffedfffefff2ff0a00
efffd3fff1ff0000f7ffaffff3ff0500030018003c002300dcff2a00d8ff25001c00d2ff1f0018001a00c0ff1e002b00fafffbff09001000ecff0b00bfffd5ff
0a00edff1d00fdffe4ff09001b00f4ff1200cfff0600cbffecffdaffecffd9ffe9fffeff0000cfff2100f6ffd8ff1000f7ff2800060022fff4ff0000e5ffb1ff
c6ff0e006c002a006bfff2ffd1ff1e002700f4ffc2ff2400a6ffedfff0ffb4ff1d000d00f6ff0500fbff1f00160009005f001100b4ff140009000700e0ff2c00
dcffebff420018001a000e001500a5fff1ffb9ff000002000a000200e1fff4ff18001b008bff0d00dbff0300ffffd8ff050019000c00fdfff1fffcff1e00ffff
10001c00fbffd7ff1300f6ff1200feffdafffeff0000dcff09000c009fff1d00edff2f00feff0600dffff4ff03001f00f6ff0f00e3ffedff12000d0004001400
fbfffbff14000b00f8ff2d00efff12002b00f4ff0400eaffe4ff13001a00eaff71001100fdff0200f1ff1000ceff50ff34001a0015000e00fbff1a008aff0f00
fbfff4ff0200f4ff1e0093ff1f00d9ff0e004600080006000a00f9ff0b00ecff1a000f000400f5ff14000800f3ffd6fff8ff2700e8ff1000d5fff5ffeeff0100
0c00e5fff3ff1a000e0023000a00fafffeff0f000f0016006aff0500fdfff4ff32001300f2ff0e00ebfffaff240015ffe4ff0000d4ff58ff1d001a00f7ff0300
ebffdefff0fffdfff8ff9bfff0ff030007001e002800adff0b001700ebff2e001d00030016001a0019000c000a00beffffffe4ff1400ebffecff0900feff4a00
0000f7ff18000500c0fff2ff0b00eaff2600d5ff1500feffefffe4ffeaff1d00e7fff8ff0100d2ff03000c00e4fffafffeff2200fdff4cfffaff0900bdffabff
c3ff0a000e00f7ff5dfff9ffebff1f002700f9ffc5ff2500b6fff1ffebffc3ff14001200edff0a00eaff1a0000000d006a000500fbfffeff0100100011000c00
dbfff6ff42000a00120011000100a6fff9ffddff4300050009000f00fdff0700fcff3c0078ff0200d8ffeeffeefff3ff0a002b0007000100eaffecff20000800
18000d00d6ff15001500cdff00000200d3fffcfffffff2fff9fffdff96ff1a00e7ff0200fbfff5fff9fff5ff06001f00e8ff12000d0015002b000a000500feff
210006002a000300e8ff2d00fcff0a00f5ff01001900deffe2ff0c001f00f8ffefff0f00f1ff1100faff1200e4ff57ff1c0026000c00d5ffffff160089ff1600
0a00a6fff8ffe4ff100094ff1300eeff0300f9ff04002f00fefff5fffefffaff730011000500140019000b00deffd7fffaff0800e7ff1000ccffcaffe9ff0500
0f000c0003001d00080008001500fcff080010000b00110091ffeaff0300f9ff11000000f2ff22002d000100230047ff1400fcffd4ff57ff83ff0000f3ff2900
f9ffedffc9ffe4ff0000a3ffe5ffffff09004f000f001200dfff1c00f9ff16000e00fdff1e001d004c0006000b001000fcff28001100fbffeaff0500caffc1ff
4000f5ff1900ffffd0ffeeff0000e6ff0b00e5ff0b00e9fff8fff2ffebffdaffddfff8fff8ffd5fff0ff1b00efffe7ffecff1f00fcff5bff00000100f3ffb0ff
c4ff580012003300a4ffe2fff3ff23002d00f1ffc4ff1500a7fff6ffddffc4fff5ff0c00edff1200dbff1b00090017006f000800060000000f001100c1ffe8ff
dffff6ff340010000e000a00feff9efff6ffebffbeff0e0006000d00250003000d00f4ff7fff0000cdff0000f7ff0600060018000600fbffe8ffe5ff29001700
1100dcffebff87fe1800e3ff00001700d1ffeaff0f00e1ff0500ffff9cff1300e6ff0000fcfffcfff0fff8ff00002100e7ff0700f5ffe5ff21000d0007001b00
00000f0000000000f7ff3400f1ff0400f5fffcff1600dcff170010004c00f3fffaff1100f4ff00000c00d6ffe5ff62ff13001d000d00f1fff3ff1a0088ff1000
010018001100d5ffd5ff8eff1900e8ff0400fdff09001b002100e7ff0d00fdff050035000600030008004700faffd3fffefff9ffe9ff0b00ccffbcffe0fffaff
f0ff0c00ffff0f00f8ff07000700ecfffcff16001600120077ff18001400f6ff2700fcfff9ff08000300e4ff270011ff0a000c00caff59ff2a00f5fff7ff2900
e8fff1ffe7fffbff0b009dff0f00f9ff0000e0ff090014000900f3fff7ff2700fefff6ff13001a003a00f6ff020077ff0600d9ff0f00f7ffe4ff0800e5ff0200
0400f6ff19001100e7ffefff00001100feff02000a00feff0000e2ffe6ff0c00c6fff6ff0000cfff1a000400f8fff1fffeff1e00020015fff4ff1500dbffb1ff
c4ff0b00fbff200051ffe8ff3a0020002600f9ffc0ff1b00b2ff0300e1ffccff1a00040000000f00bcff17000700f5ff7100f3ff140005000400130006000500
ebfff1ff3b00090014001400fbff9bfff7ffe9ffc9ff0e0013001500c5ff09000b00300081ff1000d5ff0f00fdff00000c001d000600f9ffe7ffe1ff10000b00
02000300daff14001700c3fff7ff0c00cefff1fff2fff7ff0300f1ff97ff0f00dfff0100ffffebffd4fff9ff0600defff6ff06001100fdff380012000b00edff
feff0300e3ff0600e6ff340007000d00effffcffeefff1ff00001b000f00edfffdff0c00fcff170007000b00f2ff58ff14001a001500d8fffbff0d008afffdff
fcff0c00feffc9fff0ff8aff2200e6ffd1ff27000f0017000300fdff0e0000000000100004000d000d001000f4ffe0ffeeff1900e6ff1100c4fffcffe5fff9ff
0a0001001c000500110019000f00e2ff0200100010000e00a7ff23001100f0ff19000100000006000a00cfff210016ffcbff0400d2ff4aff0000effffbff0d00
e2ff0c00dfffffff0a00a5fff2fff8ff13001c000e0006000d000c00ffff1600f9fff8ff1c0021003200ecff0000110020002d000d000000ecff0b00bdff0100
3800efffe6ff1700e0ffddffffff03001200f7ff0b00e8fff6ffe9ffe4ffe6ffc5fffefff6ffcffff9ffe8fff5fffaffe7ff1900f5ff88ff02000400dbffa9ff
beff02003f0023005fffedffc6ff1c002100f1ffc1ff3400adff0300d5ffd5fff7fff5ffcffff4ff03000f000200faff66001d001000ecfff8ff1000c5ff0f00
fafff5ff3c0019001b0002000f0099fff8fff9ff0500deff01000600c7ff0b00fcff1d0088ff1400d3ff1800f0fff9fffaff140004000b00e8ffd8ff1900fcff
0600feff0600eefe1b00010009001800c4ff3e000c000200fcffecff8dff1400d4ff06000500feff0000e5ff0800f4fff4ff0200e2ff020023001e00fafff2ff
0e000c00c1fff9ffe1ff2c00f8ff020021001600f9fffaff2e0017001b00f4ffebff0d00eeff03000000f3ffeeff51ff1c001500ddff0800eaff10007eff1100
03001300f1fff6fff6ff8fff2100edfff0ff1100180006001f00faff130003000700efff0700030003000f00f1ffd9ffd5ff0b00e4ff0d00cbff0c00dfff3400
0600e8fff8ff0f000c0018001d00e5fff7ff180021000e0066ff08001000eeff0e00f0ff2c000a00faff2000200011fff8ffebffd3ff53ff1900f1fffcff0100
d5ffcbffdfff030022009dffd7fff1ff61000300faff0100ffff1c0000003f00fdfff3ff200019002700e6ffffff04001400d1ff1900f6fffaff0c00a9ffe9ff
0900f7ff0700fbffebfffaff080005000f0006001a00dcfff7ffdeffe7ff1800bcffe5fff8ffc5fff6fff3ffedffffffe6ff0000edff0fff03000f00fdffacff
c9ff07000100fdff81fff3fffbff11001c00f3ffc9ff3c00b6ff0100d1ffe5ff2000ffffe2ff0b00f4fffaff0600ecff5e00f9fffdffefffe2ff0d0023000a00
0f00e4ff3f001a001a00e9ff04009eff0000dfff11000f0004001100d9ff0500fbff2d008aff0900bcff2000cfffe4ff04001800fdfff5ffd1fffdff0900f0ff
eefffcff9cff06001a0095ff09000e00c2ff0c00f5ff0600f5fff5ff97ff1600d3ff1000d0ff0900caffe9ff1600f9ffecff0e00e8ff12001d002100feff3500
3700ecffddffe3ffeeff28000900edfff2fffaff0d00ebfff5ff17000d00e8fff2ff0600feff100000001400dbff58ff0e00010008000300efff0d0090ff1600
0600b5ffebffdaffdfff93ff2300e1ff0a00090002002b001000060004000b000900f1ff0300060004000c00f2ffdbfff7ff2d00e6fffdffcdff1400e0fffcff
2500f3ff1300feff0d001b001500d9fff2ff080015000e00b8ffecff1600fbff17001a000700f9ff0900e2ff210015ffecfffcffd5ff55ff2f00effff3ff4000
ccffeafffefffaffffff9aff0600f2ff09001a00eefffeff07001d0004001100fcfff0ff19001e002a0003000000fcff13002c001300fdff03000600ebfffcff
04000f00e9ff1300e1ff01001000f1ff2c00edff0800e9ff0100f2ffe8fffeffbcff0400f7ffd2fff4fff8ffeafff9fff2ff1c00ffff6cff0000f6ffc8ffb4ff
c5fff2fffaff1a0060ffd9ffb1ff05002000ffffc8ff3300afff0400bdffe6ff1400f4fffcff0000f9ff02000600f6ff5e000c001200f0ffeaff0e00defffdff
0f00e9ff3e0027000d00feff0300a0fff6ffebff07002200f5fffbff03001200fcff1e005cff1c00dbff1e002a00eafffdff1900f4fff0ffe1fffefffcff1900
f8ffd6fff9ffdaff16000f0000001d00c6ff4c00efff0200f3ffd7ff8fff1d00d1ff0a004300f6fff2fff1ff0200e3fff7ff0100d5ffefff23001b00e1ff0b00
fcff180090ffd7ff00002400e5ffecffe5ffeaff2500ebff000007001400f4ff00000100e9ff1d0002001300efff4fff1100fcffe8ff0b00e8ff0e0092ff1800
feffefffd4fff0ffeeff95ff2500ffff030000000900fbff1c00ffff1600c6ff01000f00f9ff0100f9ff1900f4ffd5ffe1ff0a00ebff1700d5ffe8ffdaff5400
f2fff6ff1e001400120015000300d5ff0d0013003e002700bffff8ff1f00f8ff1e00150014000200000044001b0035ff1a000a00ceff41ff2c00effff1ff3400
ceffd1ffe6ff11001f009affe8fff0ff23000700defff6ff0d00290004001b00fcffeeff14001b005a000800000005000300deff180000001b001300f0fff7ff
090011000b00ffffeaffffff0000ffff0400e9ff1000c4fff6fff2ffebff260071fffafffeffcdff0400f3fff8fffbffe7ff1100e8ff1ffff2ff0400e2ffb2ff
ccfff8fff2ff1f008fffe0ff1a000d001a000400cbff2800b5ff0900d6ffeaff0b00ebffe1ff0e00d3ff05000200eeff5c00f7ff3800ebffddff0c001600ecff
f3fff2ff430028000900fcff0700a4fffeffd1ff07001400fcff0f00ecff0e00f5ff130062ff0300dcff2900fcffb5ffecff1d0001000400d4ffdeff05000600
f6fff0ffe3ffd9ff0f00b2ff1d001100c7fff7ff1a001a00ecff0100a0ff9bffd6ff17001800fcfffaffdaff0000f7ffaeff0600e6ff000023002200ffff0200
f5ff020027001700d6ff2400e0ff1700f9fff8ff0000fbff1600fdff130007000d002800c7ff20000b001600ceff58fff5ff2c00190000000700180086ff2200
0300f0ff1b00d3ffd2ff9eff0f00d9ff1b002100feff17001500e9fffaffe6ff3800f8ff0d00ffff2e002a00ccffd1fffcff0500e0ffedffd3ffabfff4fffeff
18001a00100000001a002a000f00fbffedff170007002300beff12000a00f5ff17001300f5ff070011001400110056ff03001100d5ff50ff34ff2d00ffff1700
ddffedffdcfffcff1000a1fffffffbff00002e000b000100ffff2700e3ff26001a00d3ff180017002400120013004400f6ff3c0018000b00d3ff1000d3ff0d00
1900edff15001600deff0b000100f1ff3c00ceff0d00f4ffecfff1fff4fffefff1fffeff0500dfff1000e1ffdcff0800f1ff2600d2ff7dfff7ffeefff4ffbdff
c6ff90fff4ff2b005fff00003f001b001e00fbffc4ff0100c0ffffffe7ffa6ff16001700f4ff0e00c4ff1d00160026006600fffff5ff04001e001000dbff3300
d9fff5ff44001700120016000d00a5ff0c00f1ff0f00fbff04001a001200130028001300a9ffffffe5ff0500f2fff0ff0f0029000e000000f7ffebff27000f00
1b001800cdfff7ff03000b0006000200d7fffbff0000f2ff09001400a8ff0600fdff1a000400e7ffdeffd5fff5ffe6fffaff18000200000009000c0017001a00
f4ff11001e00feffffff2a00f9ff1200effff1ff1100faff050001000400090004001a00e9ff1d000e000600deff51ff0000240019000f00060017007fff1e00
02001600f5ffdefff1ff9aff1400f5fff5ff290012001c000400f2ff0d00f0fff9ff7e000b001100faff1300e9ffe0fffdff0f00ecff1700cafff7ffedff0800
1200ecff1700ddff12000a003600ddff030015000a000e0074fffeff0400e9ffe6ff1100f2ff15001c00b8ff280055fffaff0d00cdff56ff12000000f6ff0b00
adfff5ffdefff0ff0c00a4ff15000a00050028001c00f4ff18001d00f5ff48000600faff180019003400dfff1100faff0600e3ff1100fdffe6ff1300e2ff0000
1d00eeff13000300d7fff5ff0b0006000a00e6ff0700d5fff7ffdcffe7ff1200e2fff0ff0200d0ff0f00f9ffe5fff6ff01002b0000006fff06000c000100a6ff
d0ff25006300160079fffaff090022002600ecffc3ff1e00aafff2ffe1ffb7ff1f000e00f1ff0100f2ff1800080010006d001900f6ff1600feff1000d8ff0200
ecfffdff39001d0022001b000700a8fff4fff1ff55000b001c000c00e8ffffff01000e008dff1700d7ff0500f8ffecff0a0017000a00fbfff1ffeeff13000900
09000c00eafff7fe0e00d0ff0300fbffd5fff4ff1100d6ff0600faffa5ff1b00eefffdff0400fcffe9ffe0fffcffd6ffe3ff0800dffff4ff2c0016000e000d00
f4ff07001000f5fff8ff3100feff06002f00f9ff12000c001e0022002100faff72001100fbff0b0001001400edff58fffdff0a0019000f00f1ff11009aff0c00
0d0006000000e0ff0b0092ff1f00f6ff090003000d0002001b00ddff1300e7ff2800f8ff1200050007003d00f6ffc9fffaff0500ecff1100d2fff5fff3fff9ff
0600f9ff11001b00240016001200f7ff0c00220002001e0081ffe2ff0500faff1f0007000e0023000100e3ff260056ff02000000d2ff57ff0d001300f3fff6ff
d2ffe2fff1fff3ff0100a4ff0500080012002100f9ff0300f1ff2400fcff0d000c00ffff16001d002000d8ff1600d1ff1200270005000000f0ff0e00b0ff0100
0c00f9ff08002000c4ff04000000ffff050007001800acffebffd5ffeaff1b00e6fff4fff3ffd0ff13001300e9ffecffefff2b00e8ff5bff7dff09009bfebcff
beff04001100240051ff0500fdff19002a00e7ffc5ff1e00adfffffff2ffc7ff180006000500eafff6ff19001c0004006a000200060000000d000f00c7fff3ff
deffefff460013001d0017000600aafff2ffd7ff2b00150012001700d1ff00000a000e0092ff1600dfff0100eefffcff02001f0008000700ecff00002b000300
16001b00faff0300130004001800bbffccff15001e00e0fffefff2ff9bff1f00e4ffecff0700f4ffb5ffdbff0600f3ffe5ff070000002500280017000d001300
26000d00efff0100f1ff330010001600f3ff0500fefff8ffedff0e001800fcffe3ff0b000000050001000700eeff5cff0b00240017000200faff09009aff1c00
04001c00e6ffeeff160090ff2500efffc1ff110010000f000600f3ff1400ebff1100faff06000e001b003700e3ffe1ff00000e00ecff0000c9ff2e00e8ff1800
0a00eafff1ff18000d00ebff0200f2ff0a0014001100080097ffffff0100f5ff000008001c000e001c00ffff29005fff00000000d3ff6dff0700fafffffff4ff
f8ffcbff000000009bffa7ffd8ff01004f00460012000700f2ff0b00eeff20001900efff1f0018003100a6ff0900f6ff080001000d00f8fff2ff0a00bcfff9ff
f0fff2ff0e002900dbfffdff0d00e3fff3ffe3ff1d00e2fff7ffc9ffe0ff0400d9ff0300f9ffcdffffffecfffbfff7ffeeff2a00060046fffeff0000d9ffb1ff
c4ff0d004b0000004fffe8ffc3ff22002400edffccff1400acff0000dbffd1ff00000700fcfffaff160019000600fbff6a0007000b00e9ff08001200e1ff0000
eefffcff3a00170027001c001100a0fff8ffa0ffedff09000e002200290006000500140090ff0300d9ff02000500e4ff050017000500f6ffe8ffe1ff11000600
0200e5ffbeffc8ff1500cfff08001600cbff0d000b00eeff0200ddff9bff1e00e6fff2fff6fff1fff9ffe6ff0d000300f7ff1100d4ff140029001600fefffaff
f5ffe8ffeeff0000f0ff3300eeff06002200f0ff1200e9ff0a0020001800f1ff11000f00eefffbfff8ff0000f4ff5dff1f00110007000800eaff0e00a0ff1300
fdffd0fffcffdcffe8ff90ff1900e4ff0200cbfff4ff07003b0003001900faff3800f5ff0400030014001900edffc7ffe5ff1900eeff1300cefff9ffe9ff0300
fafff3ff190000001a0002000e00ddff08000d0015001a0087fff7ff0b00faff2200140019000a0026004100270050ff0f00ffffd7ff61ffffff1200f9ff1600
f5ffe1fffefffaff1900a1ffe4fff9ff15002f000800050009001b00f2fffcff1500f7ff0c001a003600faff070010000500fbff0d00efff0d000700faffdeff
210001000b001900e9fff5ff0b00e8ff2700c1ff0600faffeefff6ffe9ff1800cbff0400fbffcbff0100ecff0000f4fff3ff1700000039fff1ff0900e4ffb9ff
c7ffcfffe3ff1b005bffedff090023001f00f3ffc5ff1100bbff0a00d2ffd6ff0000effff0fffdffd1ff18000300dfff6300ecff1400ebff0c0012001d000600
f4ffedff3a001a00140002000900a0ffdaffdcff0000040005001300e4ff0d00f2ff120087ff0b00dcff00001d000400ffff18000300f7ffe1ffe8ff0d000700
05000e000000e4ff0d00dfff1500f3ffc2ff0200020010000700f2ff9fff1600e2ff1700fffff6ff0f00e7ff02000e00ecff1200fdff12003e000d0002002600
2400daffd1ffe8ff0d002c00fffffeffeffff3fffeffe3ff04001f00f5ffeeffe5ff0900bdff200007000500e5ff57ff0e0013000a000700f9ff0d0095ff0e00
07001400edffd1ffe5ff91ff1b00edff0e002c00050018001800f7ff0900b2ff0f0073000d00050006000200fcffd8ffe9ff0800e5ff1200c8ffbaffe8ff1600
0400e9ff2000fafff4ff1a001300e5fffeff13001c00140089ff00001d00f3ff1b000400eeffe2fffdff9eff270038ff3a001900d9ff52ff3e00f1fff6ff5a00
ecffeeffb7ff050004009cff6200fdff1f003b001800ebff08001c0005001700eaffefff040018003500e6ff0c00f1ff1000d3ff11000600d1ff0a00e4ff0900
1a00000003001000e1fffffffcfffaffd6ffddff0600deff0d00dfffe9ff0700b8fff5fff3ffc8ff0300fafff9ffedffe8ff0c00f1ff4bff1300fdffb2ffbdff
c5ffffffebff0d005dfff1fff3ff16002600ffffc2ff0e00aeff0800d9ffdbfffcfff9fff0ffffffd0ff1c000e00e9ff66000f001600beffefff1100f5fff1ff
0100edff4300140015000f00f0ffa6fff4fffeffe8ff130004001d00f0ff16000700130095ff2200dcff17002f000800fdff090000000f00eafffaff1a000600
0d00fdff0e00c2fe0c00c3ff10003200c4fff3ff0c00f2ff0200faff96ff0f00daff01000c00e7ff0900dcff0000e8ffe1fff7fff1ff040026001d000600dcff
ebffdfffc0fff6fffeff2a000100e9fff8ff3c0016000a00100011001f000600daffffffe3ff2f0004001400cfff51ff37001d000e001c00f7ff0e009dff1500
f7fffcffeaffe2ff000093ff2300fbff0e004aff2000ffff31000d0008000c000a00f9ff0d000800f6ff3100f5ffd0ffa4ff2c00f1fffaffcbfff1ffe9ff0400
1e000000030008001200faff0e00cffffdff1f0016001300e1fff3ff1600f6ff08000900ebfff2ff1a000c001f001affeaff1900d5ff4aff0d00f9ffebff0600
f6fff4ffdcff0a002a00a8ff0000f9ff21001b000b00feff02001d00faff30000400ecff200027002300f3ff0b00fcff200001000900040000000b00d1fff9ff
0000eeff11000300e4ff19000c0002001500fafffaffe2ffe5ffebffefff2800b2fff3ffefffcbfff7ffe2fff5fff5ffbfff2200e4ff11ff62ffffff0300afff
cdff0a00fdff1f0053fffcff1b0004001a000200c1ff1e00a9ff1800e1ffe4ff1f00fdffe9ff0000f5ff1c000600e8ff6600edff1200eeffeaff0c000c00ecff
fdffe3ff3f001900180004001600a3ffedffddfffdff12000500feffcdff1500fdff0b007eff0700d7ff2e00e1ffdbfff6ff220000001e00ddffd0ff06000100
fbff1500000000001300f6ff1000ccffbdff1200f6ff050003000700a4ff0f00d9ff1100f5fffdffb8fff9fffbfff4ffd7ff0100ecfff4ff2d00190001002300
d3ff0900c1ffe1fff5ff20000000dfffeffff9ff0b001e00feff2b002900fffff8ff0a000c000f001000f1ffdfff52ffffff1c0003000a0006000d005eff1200
fbff3000acffd9fff2ff96ff1a00e3ff0a001100150008001c00000004000b000c00e0ff0200efff17000b00dbffe2fff1ff1d00e5ff0e00c9fff3ffe9ff0500
3d000e000a00feff19000b000600dcffcaff1a000800090055ff21002800e2fffcff1b003800fbff1100e7ff24002affc9ff1300deff4aff24000300f9ffc1ff
d4ffcaffcfff070010ffadffedff000051000d00eafffefff8ff250008003900adffe1ff200014003e0006001500ecff23000d001800fcffe2ff1d00a9ffeeff
0000feff1100eeffedff140016001c001400ddff1a00f5fffffff0ffe9ff2b00defff4ffe2ffbfff2500dcfff6ffedffb4ff1f00f2ff6bff0600fcffe4ffafff
cbff0f000e000d007fffdbffecff05001800faffc5ff1e00a8ff0e00e3ffe5ffeaff0900f2fffeff07001f00060011005300f5ff1100ecffcaff0a00f1fff8ff
e9ffffff49001f0004000a0008009dff0000b8ff13000f00f7ff000026001a0005000500a9fffeffd8ff1700a3ffcaffdcff1200fbff0600deffedff0000ffff
fcffe9ffbffff1ff0e00b1ffefff1300c2ff210011001d00ffffdaffa3ff1d00d2ff08003c00fbffedffdcffffff07007cff1500fafffaff1700250011001400
0d00fbff32000400eeff1400e9ff290005000e00170002001600f7ff18000b00ddff3a00bfff120018000f00000015ff19001c0019000a000000f3ff5cfff4ff
10001900f4ffd8ffb5ffb3fffeffd1ff07003300f5ff07000300d0ff0200ecfffbfff3ff040082ff0e000e00adffe9fffbff000004001b00dbff1d00dcff1500
1c00e3ff1c003c0034004b001d001900d4ff1d00f6ff1d00b1ff3a001a0003001200f8ff00002400e4ff0500230052fff1ff2e00eeff74ff0a000200f4fff1ff
e3fff6fff8ffefffeeffadff13002200070013001200120006002b00fcff06000400f4ff0e000200270008000f001f002300f1fffdfffdffefff0500e3ff2d00
1600feff1f001900c1ffe0ff18000d000c00b0fff9ffeeff0400ddfffeffe7ff0000fcff1700c9ff29000000f7fffdff0b002500f8ffa9fff6ff10002900d8ff
e9ff1c001700410082ff2a00fcff12003400f0fff3ff280088ff0100d7ffdeff11003a001000d3ffe6fffcfffeffeeff2d00effffbffaeff2900150005000e00
f3ff0200250010000a0023002200c3ffe4fffdff5b0018000a001100020016004b00e4ffbafff4fff1ff1700f3fff1ff0d002b001700feffe7ffd0ff1f00ddff
12000900eefffaffecffeaff17001600dbff2600060058fff4ff0000c7ff1b00e8ff06000c00c0ff0e0022000000f8ff1300fbffefff1900ebff1f0025001c00
f3ffebff3900f3ff05002000eaff1200cdff0b0009000400f2ffefffe9ff03001b002200e8ff160004000f00d1ff4dfffcfff1ff0f001800eeff1600bdfff7ff
140002000c00e1fffbffa6ff1c00ebfff4ff2d005dff0a000b00efff1700e8ff6b00d6ff0d00140000000c00b4ffd6ffeaff1100e7ff1b00cbff2c00eaffe1ff
1a00f7ff1700fcff22001700dffff1ff02000f00e9ff23009cffe8fff4fffeff0e001e0019001b00160002001f0068ffd1ffdcffdcff52ffa1ff0600f5fff3ff
64ffdeffc4ff0500efffb1fff9ffe5ff1d000c00f4ff1e0009002100e2ff28002d00f7ff1d000f003d00c8ff300020000f00ecfff2ff1500d0ff1400ccff0900
0a00e7ff1e000300ccff0a000f00d3ffc5ffeaff2800e6ffebfff2fff4ff2300ebfff1ff0a00ceff0b00e7ffbfffe9ffe6ff0c0009005ffffefff5ffc9ffcbff
d2ff170013002300a4ffffffbbff18002300ffffceff4800bbff1b00fbffbdff0d000500e1ff0c00f8ff2e001f00320064001200dbff0700feff0b00c2ff1800
cdffc8ff350005001c000000f0ffbafff7ffd5ff0c00f6ff0b0028001d00f5ff19001a00c6ff0900e4ff0b000e00d0ff15001a000f00f7fff0fffaff22001600
0900f4ff0100d7ff1e00cfff10002200d1fff5fffeffb4ff0b00eaff9cff1d00e5ff1100dbffe3ffe7ff11000900e9ffe5ff1a00ecffc1ff0f002500fdffdfff
e1ff1a001000f4ff07003a00e0ff1100060015000000ddffe1ff07001b000f00eeff2300f2ff1b0018001000eaff52fff9ff310021000300f0ff00008cff0e00
0a007cff1000e2ff36009eff1800f6ff20001c00eeff21000600f9ff0800f8ff1d005f001200f2ff0a001f00e1ffd1ff0a003200edff1200c8ffefffefff0700
1700edff0900e9ff0500110010000100faff1000120026009ffffeff1200eeff0c000700f4ff0d001200160026006fffe0fff5ffe3ff55fffefff9fff0ff0a00
e5fffdffeaff1300feffa9ffeafffeff07001c00d7ffdfff190014000b00fdff1c00f4ff1e001f004b00f1ff1600f8ff0100f2ffebfff8ffe6ff1000f7ffa8ff
1200080025002400ccff14000b000f001300ebfff8ff6fff0000f4fff4ff2c00e4ffe7ff0500d0ffe9ff0100f0fff0ff0f003a00fdff71ff0000fbffe2ffa3ff
caff0000f2ff3b0059fffcff250007002500e6ffc3ff2400a8ff0700e3ffc1ff13001c00f0ffe5ffc1ff1f00070026006a0000000400faff07000a00f0ff0f00
e7ffd8ff3000230014002e000600a9fff5ffedff1500150019000500f4ff16001900f7ffa1ff0200baff0c002500e1ff12001e000a00ecfff6ff04002f000900
14001100d2ff0e001000dfffe8ff1400ccfffffffaffe2fffaff0000a8ff1800e9ff10000300efffe0ff0700faff040010001e00e4fffaff2300f7ff0d002900
f3ffe1ff0b000800f2ff3400fcff0e00e6ffebff0600ebfff8ff23002800ffff01001900f6ff070017000800f0ff4fff0d001a001a000d00ffff08008dff0f00
13000e00e0ffc9ffffff91ff1b00f6fff8ff0a00daff15001a00e1ff1800bbff190010000c00000012001b00e5ffd2ffffff1500eeff2400d0fff1ffe1fff1ff
fbff05001700efff1d00eaff1300e9ff0d000c001a001200bdff04000b00f3ff2a002e00070009002800d4ff210067ffd4ff2100dcff5eff8dffdffff8ff2700
f5fffcffc8fff7ff1b00abff1500f9ff050022001f001f000b002f00050018000a00eeff1b001b004400dfff08000b000500e6fffcff0900e4ff0c00d5fff6ff
12000600ffff2300d8ffdafff4fff7ffc1fff5ff1e00e6fff3fffeff00000300d7fff4fff7ffcfffe1fffbfffcffe8ffdeff2b00e7ff75ffe4ff0900c4ffaaff
c3fffdfffeff42008aff0300d1ff16001e00e3ffceff2800a8ff0000e1ffccff0d00dbff1100fdfffeff1500f8ff08006e0006001200e0ff0c00140076ff0100
0a00e6ff3400130022000f00fdffa6fffdff8fff90ff160001002a00eeff09000b000300afff0c00d4ff13000800b2ff03001c000c000a00ebfff6ff19000f00
1800eaff000003001500ccff2e001900c1fff5fffcff09000200fcff9dff1900e9fffdff0c00eeffe9ffe8ff01001700080000000a00ffff25001d001e00aeff
fcffffffeaffedfff8ff3300feff100004000400090000002a001d001700010000000500efff080003000700fcff59ff1b00210006000000f2ff070098ff0f00
f5ff2200c7ffd1ff070090ff2900fcfffdff1200beff1b000d00eaff1d000e0007004d000e000500faff1700e1ffdbffe4ff1100e5fff3ffcefff2ffdaff0400
0b00fcff16001600f9ff92ff1600e8fff2ff170000001100abffffff0800e7fff7ff1e000800deff0000030021004afff7ffffffd4ff58ffccff0a00faffe5ff
d3ffd0ffe2ff14000c00a0ffd9ffeaff570000000300ffff06001700080022001300fcff190022002300d9ff2c001b000e000900ffff0000efff0e00b4ff0a00
e3ffe1ff04000f00edfffdfffffffbff1b009cff1200d0fffdffe3fff0ff2000ceffe4ffe5ffcdff1500e1ff0200f1ffe3ff2a00fbff61ff01000800cbffa1ff
c2fffcff01002a004dff1c002f0014001c00e9ffceff2000b2ffffffdeffd9ff1b00fdffedffeeffe2ff1900c5fff6ff6b0007001400deffd1ff1000e3ff1c00
f2ffe1ff3b001d001a0013000000a2fff6ffe4ffeaff230002000300c1ff0a00fbff17008dff2300c9ff1f001c00d4ff0800260005001a00e8ffe9ff1600f8ff
08001100b8fff8ff1900cbff0600f3ffbfff1c0018001500f8ffdcffa9ff0a00e7ff1b00f1fff7ffc6ffe1ff0700effffcff1300f4ff0b001400100003001400
0100f7ffc7ffecfffeff3000ecfff4fff0ff83ff0a00e2ff06003000f7fff3fffdffffff81fff1ff0c000600efff47ff1200060017002100fdfffbff9aff1e00
0a000300c0ffc0ff0d0091ff2a000000e9ffe7fff4fffcff2b00f9ff0200edff0d001a001700edff0b000c00e6ffd5ffe1ff1800e6ff2000dbff2400eeff0500
1000f9ff1b00f0ff0f00a9ff1c00e5fff9ff16000f001c0053ff0400feffd8ff4f00020033000d00f0ff0c000d007fff0b00f2ffdcff4bff06000b00ebff1e00
daffdaffd4ff15001500bcfffbff1f0030000f001a000d0013001700faff2d001200eeff11001e000e00feff2200e1ff1400dcfff5ffdbfff7ff0700d2ffefff
ecfff8fffbff0700ecfff3ff1e00f3ff2e00e7ff1200eaffefff0700f2ff1700d2ffffff0000d0ffeaff05000600effff1ff2a00eeff7bfff2fffeffe7ffb0ff
c8ff02000d00f8ff9eff07009aff20001800f2ffdbff42009dff0b00caffd8ff0300f8fffdfff5ff0e00030000000700620001002300ebffeeff0b00c3fff0ff
0c00ffff2d000c002700e3ff0500a4ff0000caffedff0f00e3ff0200bcff1700e4ff1600a8ff0100dbff0500f6ffecffe5ff1b0004000000e6ffffff20000800
1700f7ffd8ffdaff2300deff16000b00b3ff0400c4ff13000a00e5ffafff2f00e3ff070092ffe6ffe9fffeff060000000f001f00d1ff2a0023002f000800bcff
efffefffd5ffe7ff00002600f2ffc8fff5ff13001500ffff01003900fdfffeff0100f0fff7ffeeff06000e006bff42fffaff1f00efff1000e1ff1400dbff0f00
030056ff43ffe6ff0800a4ff3200f8ff01000c001f000b000f00e8ff16000c002000faffe9fffaff1b001b00d4ffe0ffe6ff0100e2ff0700c9ffe5ff7cff0500
1900e0ff0000f8ff0b00a6ff0500d2ffefff18005e001d005bffe0ff2100f4ff24000a00e4fff2ffe7ff5a001e0069fff0ff1800e0ff62ff16000a00faff2b00
f7ffd9ffe3ff1d002600a4fff6ffe2ff63000e00d6ff0b000e001e0008001800f4ffdaff1f001a002600f2ff20000000faffd4fff0fff3ffd4ff2400e3ffeeff
13000500f8ff1700e1ff0700fcff00000c00e1ff1000d8ff0e00e8fff1ff1f00d1fffaffe2ffd5ff0500e2fffbfff4fff8ffffffc7ff63ff0000f5ffeeffb2ff
cafff6fffaff280096fff4ff0b000f001400fbffc6ff1000a4fff9ffdcffe2ff2a000a0098fff6fff3ff15007bfff3ff7200e1ff2a00c8ffd1ff0b001500f6ff
0a00d6ff4800150002003b00eaffa7ff0300ecff01002000acff160008001500dfff0700aaff0600ddff14000c00aefffeff25000e001a00e1ff0d001700ffff
f7ffecffeefff2ff050082fff0ff0100bdff0c00ffff1500f0ff0b00a0ff1900ddff10001c00f7ff0500eafff2ff0500e9fffaffd7ff2d00fdff26001a001900
1e00f5ff83ffe3ffdaff1600d9fff4fff0ffbfff2d00efffc9ff1600feffeaffc9ff0a00d3ffa3ffffff0f00f3ff58ff2d002200f4ff2200eafffbffa3ff1200
000013005bffecff0000aeff1300f2ff11009fff42000600f4ffd3ff0000feff1b000c00d4fff5ffe9ff28001200c8ff190014000c000b00cfff2000cafffdff
0600e1ff0800f6ff1200f4ff1600a2ffadff10002d000c0049ff59001a00e4ff3b0000001600f7ff0a00e4ff060046ff0f003e00f6ff45ff69001600dcff2400
f0fff8ffd4ff0d000c00a7ff1e002500200026000400f3ff2600270023001400c4ffffffecff12003300f6ffdcfff9ff1600eaffe2ff0400e9ff0900e7ffc7ff
1d00090020000d00f0ffe1ff210003003000010008000e001b001700f5fff7ffe7fff8ff0f00b5ffeeff12000f00e0ff03001c00e1ffa1ff20000800ebffcaff
e6ff0000f0ff24005dffe4ffe9ff30002800f8ffdfff1b00c3ff1000c4ffe7ff00000c00ecff0800deff09000200dcff3a00070027000e00d8ff0300f4fff9ff
0b00f2ff3400f6fff7ff1800e9ffb5fff1fff1fff7ff1200c7ff2c00d8ff0a00edff0400b0ffe6ffecff2100b1fffbfff9fff3ff08002000eeffdcff1b000f00
1b0005002500d4fffefff4ff15002a00e2ff23001b002000d6ff0100b1ff1300edff0a005a00eeff0100d0ff0400fbffa7ff1500b1ff150016000d00f6ffa1ff
2800fffff4fff2ffeeff1d0081fff9ffe8fff0fffafff4ff150010000a00d8ff11000b00d2fff4ff19000e00daff69ff1200060012009effe6ff22007bffdcff
f5ffeeffdfff2900eaff92ff21000300fdff2800f3ff08002400fafff8fff8ff0200fdff03000800f9ff1700effff7ffefff0400eaff3200e3ffdfffd5fff0ff
11003f0008000a00120010001000f9fff8ff0a00fcff41ffe5fffeffe5ff050002001100000000000400e2ff3f0038ff0400eeffc7ff29ff1c00fdff55002500
e6fff0ffe8ff0700c7ffa0fff8fff0ff210027000400f9fff0ff0c00f6ff1600f3fff6ff0d002800f0ffe1ff02000b001b00e1fff7ffb8ffffff0800fefff3ff
3e00fffffbff1100e6fff3ffecff03000000e7ff0e00d2ffeeffe7ffd8fff2fee9ff0d000500c0ff1b00e4ffe8ffeeffcfff2800ebff46fff0ff0600f2ffabff
caff0300f2fffefff5ffd0fff3ff14002900f3ffbbff12008bffb4ffe5ffc5ff0900fdfff3ff1500f3ff06000c00000068000000efff1200e0ff1c00f2ffe1ff
fbfff7ff3c00340010000f0007009bffd0ffd2ff030005001500350007000000e6ff19009bff1f00fcfe1800e9ffedffd9ff90fe00000200deffefff15000200
0800b9fff3ffefff1e00e9ff1b000500c9ff0100c4ff1b000200eaff9fff1400eeff0200100020001f00feffdeffe0ffedfffcffd9fff0ff0000abfff9ff1a00
e2ff0700fafffffffeff34001300e1fff9ffdfffffffe5ffefff14001a00d5ff10000800ddff10001300c9ffd7ff31ff2600060000000900eaff250098ff1b00
d2ffefff0700bfffdeff9bff1f000c000f00f6ffeffffaffb5ff0700070000000800e1ffefffe8ff4f0016000200b7fffbff2500ddff8affedff0400e1ff1000
f0ffe5fffaffe3ff1e0002000b00f9ff03000c0006001900a0fff6ff0900fbff05001400f0ff0a000100efff50ff53ffe1ff0a00c3ff26ff0000fbffe4ff1900
ccfff7fff7ff0300faff98ffe1ffeefff4ff0700e3ffefff07001d00ffff04001300efff10001e00f0ffebff02000a00fafff7fffcff04000c000900e4fff0ff
f8ffe4ff0c000f00e5fff7ff080033000a00d5ff0a00c6ffe6ffddffbdff1100dffffcfff7ffb7ff2d00deffd7fffcff2a001900d8ff7effe9ff0e00f3ff44ff
cbffeefff4ff09005fffdcffe4ff19003c00f5ffc6ff2e002800c7ffc7ffc0ff0200c9ff2b003200ddff07000e0008006a003e00e7ffffffe8ff1b001400eeff
fdfff3ff3600310007000f0000009fffe0ffb5ffecffeeff04000a00d5ffebffdcff070073ff1e0089ff1800f3fffcffecff90ffecfffeffe6ffebff1e00fcff
10000d00efffe7ff1e00f0ff04000300d6fff3ff0e001300fefff0ffa0ffe1ffddffffffe5ff1f00efffdbffe0ffd8ffeeff0a001100fcffd7fffcfff2fff7ff
f7ff0b000000f1ffdfff26005affebffe7fff8fffaff0200d7ff1000fcffe2fffeff0400ebfff6ff0e001b00dcff63ffecff0b001200ffffefff290088fff8ff
f5ffe6ffe2ff2e00f2ff8bff2000f6ffedff3500f3ff01002400fbff03000400fbfff3ff00000600efff0a00d3fffffffaff1000ddff1d00e0fff9ffd9ffefff
150005000b00010010001a000300f8ff0100e6ff09000400e4ff1300f0ff010019000f000d00f9ff0000dfff410020fff2ff0400c4ff28ff1600e8ff48000a00
e4ffdcffd6ff0600e2ff94fff2fff4ff0e000f000000e9ffebff0c0005000400d1fffeff13002700efffe1ffafff01000900cbffe1fffbffe4ff0400feffeaff
0700fdffbeff0c00fdff0600f5ffe8ff0500d4ff0e00c7ff0400f0ffceff0a00d4ff04000100beff1f00e4ffddfff7ffd2ff2100e4ff6efffdff0100d7ffb2ff
c7fffffffdff0400f7fff3ff00001a002900faffcbff0700a2ffe7ffecffceff0000f2ffecff1f00e5ff0b00140000006c00fcffe4ff1700e5ff1a00eaffcaff
eefff4ff450027000b00120011009cffedffccff0500e1ff0d001a00fcff1600efff1f009fff2400f8fe0b00e8ffe3ffdfff06000000fbffe3fff8ff09000000
0d00fbfff4fff4ff2500e1ff1a000000c5ff1b008cff14000400f0ffa2ff0700a3ff0d000a001600fbfff5ffdcffe4ffe7fff5ffe0ff0000edffc500fbff0d00
ecff12000b000000f3ff2a000e00d8fffdffeaffffffe7fffdff1e000c00e4ff0100fcffc8ff05000900f5ffe0ff4ffffbff0600cfff0200f7ff2400aaff1c00
e5ffefff0d00b6ffe3ff91ff2100ffff0c000700f5ff0c008bfffbff0700efff0b00f1ffe9ff11002d0013000b00b9ffffff1300dcff92fff5ffeeffd2ff2200
0d00effff8fffdff13001a0014000c00080016000700130089ff0500f9fffbff11000e00fbff04000e00080062ff34ffe5fff5ffc5ff2bfff1ffe9ffe6ff0e00
d6fff9fffefff6ff0e009bffe9fff5fffaff0900e1fffaff10001500f0ff07001700fdff1d001e00f1ffdeff20000100fbfff7ffeffff7ff05000100e4ff0000
f0ffe0ff15001b00edfff6ff07001600fdffdfff1a00ccfffbffe7ffd8ff1600d2fff9fff1ffcaff1000e5ffdafff8fffcff1200e9ff5affe8ff0000f9ff3bff
c1ffe3ffe0ff0c0070ffe3ffe2ff0e002f00faffc1ff19001f00d3ffe4ffd0ffffffe8ff28002900e7fff0ff16000e0067001900edff1200ecff19000100f0ff
0400eeff3c0018000700fdffe1ff9cfff4ffcaffeeffe6ff09001200f3ffe0fffcff100073ff0c00a1ff3800f4ffeeffefff1e00eeffe3ffdffff1ff1f00feff
0e001100f0ffefff1b00fbffeeff0700d3ffe8ff19000f00f8fff7ffa3ff00009afffefff7ff2600edfff0ffd8fff6ffecff1b001a00fdffe3ff0000eefffcff
010013001a00f8ffeaff1c0075fff4ffe6fff9fff1ffeafff3ff0e000700ddfff6fff1ffdafff7ff17000e00e4ff5dffe1ff080005000200eeff230092fff1ff
f9ffe8ffe8ff2800f1ff95ff1c00f2ffecff2500f6ff1d0022000000f3ff0a00fbfff4fffdffffffe3ff0d00d0fffffffcff1f00e9ff3400d6ffefffd2ffe8ff
200000000800efff18002200e3fff1ff1300e9fff5fff1ffedff00000400f8ff1200160002000a000e00c9ff3e004efffafff2ffc4ff41ff2d00e8ff4e000000
e3ffefffe0ff0b00d6ff90fff0ff01000a0006001500feffc5fffdffedff0900e3fff6ff19002800f4fff9ffe9ff0600f3ffcffff0ffdcffd8ff0200f2ffe5ff
0700f6ffe6ff1900f0ff0000f5fff1ff0000d1ff0000e0ff0a00f1ffd1fff7ffdbfffefffcffc2ff0d00fdffdcfff2ffd1ff2600e9ff87fff7ff0200eeffb4ff
c9ff0200feffecfff4ff0200feff0f002a00fdffc3ff0800a2fffbffeeffcdff08000000ecff3100f4ffe5ff0e00fdff6b000400e1ff0800e8ff1900fdffeaff
f8fff9ff3b001900fcff00001b009cfff0ffd6ff0900eaff0f000700f9ff0e00f0ff07008fff0900fffe1700ebffdbffdbff0c00effffeffd9fff0ff1000fcff
e1ffe1ffecfff5ff1f00eeff0f000200d3ff06009dff0400e2ffebffa6ff0b009aff0d00070024000700e6ffd2ffecffefffe0ffdfffd4ffecffeffffdff2600
ebff110010000800000028000b00f5fffbffeefff8fffdfff4ff1a00fdffe4fffffff4ffe7ff15001100fbffdeff5aff00003600f9ff1700f6ff290082ff1800
dcffefff1200bdffecff8fff1f00030010001000f0ff0f008fffebff0500efff0e00e4ffc7ff0900f8ff1900fdffb4ff01001100dfff0b00faffecffd2ff0900
0300f5ffdfff090011001a0014000300000015000a000c006fffffff0800f2ff10001300f1ff0000feff05006bff35ffecffefffc1ff41ffe9ffe9ffe5ff1000
d7fff6fff8fff2ff0d0099ffebfff0fff5ff0d00e3fffbff12001000f5ff03000900fdff0e001f00f5ffdeff210000000200f3ffeaff0000f9ff0800e8ff0400
eafff3ff0d001c00f0fffcfff1ff19000a00e0ff1100e9fff8ffe5ffd9ff1100e0fffffffdffbdff0c00eeffd7fff0ff21000f00efff6bffedff0700eaff35ff
bcffeafff0ff130065fffeffdcff13002b00efffc4ff00002200f5ffe0ffd6ff0000e6ff31002200d4ffb7ff1f00080066003200d7ff1200f2ff1a000300e5ff
f3fff3ff43000800e8ffe7ffe4ff9eff0400d3fff1ffe2ff1100130000000500fbff1d0092ff240099ff1b00e7ffeafff1ff1f00c7ff0900defff1ff07001500
18000c00ecffedff2000030015000200cdffe9ff18000300f4fff9ffa2ff0000a7fffdffebff1300e3fffdffd9fff6fff0ff210036000500ebff0100f3ff0c00
0b001c001500f9ff5a001c00a7fffaffe2ff0000f3ff0500d3ff0500fcffdeff0900ffffd9ffeaffffff1900d5ff59ffdaff080000009effdaff1f0028ffdcff
0500e8ffe2ff2e00f9ff95ff280001009eff1800dcff17001f00f2ff41fff5ff07000300deffeeffedff2600c2fffaffedff2800dbffdaffcaffe2ffd2ffdfff
01001c00f4ff080022001e000500e5ff0000e7ff07000a00f7ff01000600f5ff15001000f4ff00000500f7ff24003cff0600f3ffcbff2cff1800e7ff50000100
d2fffdffdeff0600e4ff82fff0ffedfff8ff0c002400fbffffff0a00fcff0c00f3fff8ff13002200dcff0700a1ff0800f6ffe3fff1fff2ffe3ff0900ebffd6ff
2700f4ffd1ff1500e6fff8fff8fff0ff0000cbfff8ffd4ffdffffaffd1ffd8ff43ff100000009bff0a00f6ffdfffe6ffdcff2400f5ff70fff2ff0900d6ffacff
d0fffeff2a00f7fff4ffe7ffebfffeff2900f5ffbbfff3ff94ff0000e1ffdbfffeff0000f2ff3300faffb0ff0600f8ff6f00f3fff9ff2700ffff1500ddffe5ff
fbfff1ff4000fbffeaff0c00160093ff0500e3ff0900f2ff16000500ffff0a000a00120079ff360001ff0900edffeeffe1ff1700c6fff9ffd5ffeeff0f000000
fafff3fffaffefff1400f4ff06000b00d6fffefffcfe1200f1fffdffa6ff0600afff010000001f00f9fffcffe2fff4ffeafff5ffdafffffff3ff9dff06002900
f5ff14001100f5ffdeff29000a00ecff2b00fbff0600f4fff4ff0c001400ddff10000300d9ff230024009cffb3ff5fff0f001f00e7ff1600d8ff220040ff1800
e2fff1ff2a00c4ffdaff87ff25000b000000f2fffbff0600b0ff0200dcfff2ff1600edff2b0007000b001e005e00a0ff04000d00e1ff0000f8fffaffdeffffff
0200f9ff0b00fcff1f001a000f00f9ff0800130008000e001ffff8ff0c00e9ff13000700f5ff0b000200f5ff79ff1cffdeff0b00caff30ffd6fff6fff3ff0600
d5fffeff0800d9fffcff8cffe3fff5fffaff1500e5ff06001700280007001b001d00fbff1c001900d7ffd6fffbff0a000000e8ffe1fffdffffff0200f4ff0600
0400f4ff0e002600fcffefffcdff1e000600d8ff1c00d7fffdffe0ffdfff1200c9ff1700f7ffc6ff0c00e9ffd8ff0100f6ffffff060069ffecff0f00eeff33ff
c1ffd2ffebff0d005bffe9ffe0ff18002800e5ffb9fffaff2200feffd0ffcdff0f00e1ff16002100e4ff9aff0f00140060000f00e4ff0f00fdff1b000b00e8ff
f9ffd0ff400094fe1500e7ffa0ff9fff1300e5ffdcffe6ff0d000a00fafffcfff9ff19008dff1b00a8ff10000000ebffe0ff2c007fffcaffc9ffefff0c00e7ff
fbffffffe7ffeaff14000f00edff0700d5ffe6ff0200fcffe6ff050099ffffffaaff0200ecff1c00e0fffdffe9fff7ffecff240026001200fdff0400e9ff1300
f2ffffff02000600efff28001700e4ff2600e1ff0c00dfffffff1500fcffd7ff0a000e00e5ff12001100fdffdcff67ff38000a000b001a00fbff20008fff1a00
f6ffe6ff1300b8fff1ff96ff1b0001000400ebffffff0e00b1fffcff0d00d6fffcfff2fff3ff0900fcff2300f7ffa8fffaff1a00e9ff0f00f5fff6ffe3fff4ff
92fff1ff64fff6ff2a001000c8ff1b00f9ff050013000f001cffdfffdcff0900140014000100baff1100f7ff95ff37ffebff0700c6ff30ff07000300dcff1000
c9ff000022000700040093fff1ffedfffcff2100d4fffcff15001600d4ff0a000800f7ff060018000000f1ff06000d001300f6fff4ffeefff3ff0d00fffff9ff
fbfff0ff15001300d6ffd7ff0e0004001600e6ff1600cdfffeffe4ffddff2400e9fff3fffeffc3ff2100dfffd9ffddffecff1c00e9ff69ffd2ff1100f9ff45ff
cbffe6ffedff280058ffd0ffe3ff0e003200edffc7ff2a0025008bffd8ffbeff0900ddff8e002100e0ff130005000400700011000000f5ffecff20000400eeff
f0fff3ff3d002a000e000d00f4ff9cfff2ffbcfff7fffdff09000900fbffa9ffe6fffeff83ff14008eff0f00f5ff0400dfff6bfff4ffedffe3ffe8ff16000e00
0c001000f9ffe6ff2100deff10002600d5ffebff1e0012000100efff9bff0200e3ff0400eaff0f00e6ffe9ffe5ffe5ffe9ff0a004e00e7ffecff0500f8ffdcff
2800fffff3ffeeffe6ff250055fff0ffe7ffe9ff00000300030007001200e0ff03000400e4fffeff0f000c00deff69fffdff0f000c00c6ff0100260086ffe3ff
f6ffeaffdcff2a00f0ff8bff1f00ffffeeff2700f6ff18002100020003000000fefffaff02000100e1ff1800e3fff7ffefff0700e1ff0b00deffe0ffe6fff6ff
17002a000500feff1b000f000d00e7ff00000400feff86ffd8fffcffeaff0100120012000d00f8ff0800d8ff400034ff02000500beffc3fe2600ebff4f000b00
dbffd9ffe1ff0700beff91fff9fff1ff220013001500d4fff7ff1600f9ff1300effff6ff13002400f5ffe4fff1ff02003100d1ffebffcafff3ff0100fdffe7ff
3400f8fff7ff0f00e5ff0000f2fff2fffcffdbff0d00d3ffe6fff0ffd4ffb9ffe4fff8ff0100c2ff1800e4ffe7fff6ffd2ff2300f5ff83fff0ff0300dcffadff
cbfffdff0000f5fff3ffe0fff0ff21002700f2ffc6ff1500a1ffc3ffe3ffc4ff1400f4fff3ff1100deff0c000d00fcff7500fffff5ff0000dfff1c00f2ffdcff
f6fff8ff3f0012000800050008009affe8ffdcff0d00f7ff080016000a001100f3ff0b0096ff0a00fafe0400f5fff9ffe2ff09fff8fff4ffdbfff7ff1a00fdff
0500cefff0ffefff1e00eaff18000000c5ff0800acff04000000e8ff9cff0400dfff0a000d001d0015000000dfffe9ffe3fffaffd9fffffff3ff2900fcff1500
f1ff0a000200f1fff8ff2f001800ddfffbffe0ff0000f0fffdff10000e00daff08000300d0ff11000a00c9ffdaff48ff0f00fffffeff1600fdff2000adff1d00
edffecff0400b8ffe8ff8fff1c0001000800f3fff4ff0b009ffffdff0d00e8ff0600eeffefff06004c0024000000affff8ff2900ddff0900f6ff0600d9ff0e00
1000eaff0300ffff1c00120017000500010009000b00110088fff5fff1fffefff9ff0f00f6ff07000d00f1ff51ff50ffecff0600c3ff26fff0fff1ffe9ff1b00
deffe9fff9ff000000009bffe3fff3fff1ff1300ebfff9ff1e00f8ffe4ff05001600f8ff14002200e8ffe2ff130005000800f6ffe9ffffff13000300e4fff9ff
f6ffecff0e001100e7fff6ff010032000e00e5ff1100d1fff1ffebffcbff0500d8fff7fffdffc8ff1800e9ffe2ffefff1d001700f4ff40ffebff0300edff3cff
c8ffebffdfff230063ffedffebff14003000f1ffc0ff1d001e00caffddffcaff0700ddff33002300e7ff0900100006006a003300e8ff0200e5ff1a000400bfff
f6ffecff370019000000f7fff8ff9bffdfffc5ffeeffecff01000e00e8ffceffebff090079ff0f0096ff0f00f2fffbffeeff2300eefffcffdeffedff1d000200
0d000c00edffe6ff2000e3ff06000700d2ffe6ff0e0007000000f2ff9bffeaffcffff6ffdfff1800eefff0ffd8ffeaffe8ff0e001200f2ffe1ff0700f0fffaff
03000a000b00f3ffeaff220069ffecffe2ffeffff7fff4ffdeff09001c00defffefff0ffe7fff6ff1b001600e2ff57fff5ff090008000300f1ff260088fff6ff
0000efffedff3200efff90ff2000f0ffebff2900f7ff12002300030004000400fbffeffffeff0000e7ff1100cdfffdfff8fffdffddff0900dbffe2ffdfffe8ff
230002000700fbff0d003400dffff4ff08002b000000ebffe0ff0c00fcff02000800030003000f000e00d3ff420056fff3ff0000c0ff1cff2100e4ff4f00ffff
deffeaffdcff0700dfff8bfff4fff1ff0b0011000c00f5ffc0ff2400e3ff0c00ccfff2ff11002b00f1fff5ffb4ff0400faffc1ffeaffe7ffe9ff0200f8ffecff
0300f7ffbeff1a00e9fffafff2ffecfff8ffdcff0600dbfff9fff3ffc7ff0600d1fffbff0400c9ff1e00eaffe4ffefffc5ff2400e7ff92fff7fff5fff5ffb4ff
c5ff0300fdffedfff5ff000000001b002900fbffbcff0700a8fff3ffebffcefffcfff9ffe8ff1f00eefffdff1100faff6d000200e7ff1600ebff1800f5ffeaff
f4fff1ff40001a00fcff09000a009effe5ffdcff0300f1ff0100080000001200ecffffff93ff270002ff0c00e7ffeaffe8ff0f00fafffeffe0fff4ff1900fdff
0000f3fff7fff3ff2000f3ff0e000000ceff1c0092ff0800feffebffa0ff0200a8ff05000b001c000100e8ffdcffedffebfff4ffe6ffd2fff6ff9700f6ff1d00
e4ff0d000c000300f5ff2d000b00ebfffcffe9fffdfff7ffe6ff18000d00d9ff0000efffdeff08001600fdffe4ff49fffdfff7ffccff1700e9ff2400a1ff1100
eaffecff1a00c3ffe6ff8aff160006000b000300f7ff18008dffe8ff0a00efff0600e8ffedff0a00f3ff1a000400b2fffdff1500ddff0100f5ffecffdbff2300
f1ffefffd9ff0400070016000f00fdff03000d0009000b0015fffbff0200f7ff0f00fcfff5ff0200feff05005aff35ffe6fffbffbfff39ffdfffe9ffe4ff0400
d9fff6fffaffefff0c0098ffe8ffeafff5ff0a00e6fffbff0b00fbfff1ff0b001600f8ff10001d00efffddff1e00fffffefff8ffebfffcfff9ff0300e5ff0000
efffe8ff19002200e5fff8fff9ff14000c00e3ff1100e9ffecffe0ffdaff0d00d6fff5fffbffc1ff0500ecffdcffeeff02001100f9ff56ffe7fffcffe5ff31ff
bfffe6ffebff0d005ffff4ffe4ff18002700f1ffbeff09002000f4ffe7ffd6ff0800f2ff2f002000e2ffe9ff1c00030069001c00eeff0500f2ff1600fdffe7ff
0100e0ff3e000b000000faffdfff98fff2ffddffecffc6ff15000700edfff8fffbff110075ff1b009fff2b00edffecffecff2100ecffdcffdcffebff18000200
15000a00e5ffe4ff2400f8fff3ffffffd3ffeaff10000600fafff8ff9bfffeff81ffe7fff5ff1c00eafffaffe2fff7fff2ff1b003500fdffe6ff0200f7ff0600
11000a001800eefffeff1d0081ff0200e3fff2fff2fff6ffdeff25000000d6fff8fff1ffecfff8ff1a001c00e8ff53ffe2ff1d001000c3ffe1ff220095ffe5ff
fdffe5ffefff3100f6ff90ff1e000100bbff2000f7ff18002200fdff4d00fbfff7ff0000fafff9ffe4ff1100c4fffafff7ff1000defff7ffd5ffdaffdbffe2ff
04001d00010003002b0013000500f6ff0000f9ff03000600efff00001200f9ff1f00150000000000fdffddff3b005fff0100eaffc1ff38ff1700eeff4f00f6ff
d0fff5ffe6ff0300daff85fffafff3ff150010001d00fefff0ff0400efff0000d7fffeff0b00290002000400ccfffeffecffd5ffedffefffd9ff0000f7ffdfff
2900f3fff7ff1c00e2ffffff0300daff0000d1fff4ffd8fff0ffeeffdaffc9ffd1ffe9ffffffb1ff0600f2ffe3fff4ffd8ff2d00eeff64ffeeff0900cdffb1ff
cafffeff2500f9fff7ffeeffeaff03002700eeffbeff14009aff0000e8ffdaffffff0800eeff2f00e7ffabff1000f4ff6a000000bbff0f00f6ff1800e7ffe3ff
fcfffbff3c0017000700eeff1c0098ffebffdcfffdfff2ff1500070000000b000000ffff7dff1a0005ff0d00eefff3ffe9ff1600e7ff1200d7fff8ff1a000200
d4ffefffe9ffe9ff1d00edff0f000100d4fffbffeefe0500dcffefffa1ff00008eff060009001f00fbfffdffe1fff1ffedffc7ffe0ffffffe9ff0700e7ff1800
ffff16001c00feffeaff26000a00f4ff2300eefff6fff5fff8ff30000d00e5ff1200efffe8ff09000f00bcffe7ff59ff08001f00f6ff0b00e3ff240095ff1200
f9fff0ff2e00bdffe8ff91ff1700ffff0300f6fff4ff0b009dff02000600e1ff1b00efff93000d00f7ff1d002f00adfffcff1600e0fffefffaffe6ffe2fffaff
fafff9fff3ff0a00100016000800f7ff0d000b00100005003cfff0ff0b00ebff0c001500060003000d00110069ff2dffebffdaffc1ff36ffd9fff1ffe1ff0f00
d9fff6ff0d00ceff06008fffe9ffe1fffdff1600ecfffdff04000d00f0ff1c00170000000f001700efffdaff150006000100e8fff4fffbff0300feffe7fff9ff
fcffe6ff15002800e5ffe7ffbaff30000d00e4ff1300e2fff4ffdcffe3ff0700d0ff0c00ffffbaff1300f2ffe2fff8ff0200e4ff05004fffdeff0a00f6ff36ff
c1ffd4ffefff07003bffe6ffdbfff1ff2300e8ffafff0b001c00f9ffbaffdfff0a00eaff10000a00daff6dff15000f0069001f00efff0400f3ff1700fbfff0ff
f7ffedff3c001fff21000b009eff9cfff1ffdaffe6ffe6ff13000e00fdfffeff07000e007bff11009fff2800f2ffeafff1ff1d0088ffabffcaffecff00000300
0e000200e6ffe7ff2700f8ff0600ffffd8ffe6ff1c000a00f9fff8ff97fff5ffa2ff0000e9ff1500f5fffbffe2fff5fff1ff1b001900fafff4ff0000deff0200
3d0020000600e4fffbff210099ff0a00e4ff00000500e8ffeaff06000700caff01000200ccff41fffbff0e00deff7dffe5ff08001c000000ecff280077fff4ff
0000efffedff2600f6ff95ff2200f8ff01002700f8ff180024000300dbff130003002c00eefff3ffe1ff1700dcff0100f9ff0a00e8fff0ffd5ffffffd8ffdfff
1700fafffdff060051001d000d00ecff1000fdfff1ff0a00dcff00000800fcff000018000e000700e7ffdcff400044ff0c002000c9ff30ff1f00efff50001d00
edffecffdcff0700dcff82fff8ffebff180012003700f4ff00001900f2ff1400edffedff16001b00f0ff0c00f5ff2300f6ffeefff3fff5fff0fffafff1ffe2ff
1200e4ff84ff0c00e4fff9ff0300f2ff1400d4ffd7ffd1ffebff0400e3ff0700b1ffc6ff0700c3ff2c00e6ffe0ffeeffeeffeefff4ff6dfffbff0b00d4ffa7ff
c2ff010010001800f7ffeafff3fffbff2500fcffabff15009dff0400d7ffd7ff0a001900f2ff2d00f2ff97fff9ffeeff7300f6fff6ff1400f1ff1200ecfff8ff
e7ffdeff490096ff1b00f7ff3b009cff0400d6ff0800ffff0e00040004000b000d00190065ff200023ff1f00f6ffcafff1ff210075ff0600b4ffd8ff0600c9ff
bdffb2ff0100e9ff2100f8ffe1ff0f00d5ff2d0091ff0d00f2ff02009bff0f00c7ff1600130018002300e4ffeffff0ffebff0b00f1ff0600feffafffdaff1600
05001000fdff0700e3ff1c007dff0000edfff2fffbff0600e2ff13001100dcff05000c00f8fffaff11001100d3ff68fff6ff0f000a00f5fff9ff230083fff4ff
fbffe2ffedff2d00f2ff91ff2000f4ffacff1d00feff0900160002000900f2fff3ff2b0008001100ecff1b00dbfffdffffff2400e0ff1200dcfff6ffe2fff5ff
12001500070000001c000b00bfffedff00000000fcffffffc5ff0b00daff0f00050013000e00dfff1500d7ff410047fff4fffbffc0ff2eff1500f2ff4c001900
e1ffe0ffddff0e00e6ff8dfffefffdff1a000f001300f6ffbbff1c0039000b00f5fff4ff16002500faffe4fff6ff08000800cefff1ffe4ffeeff0500f1fff4ff
1800f2fff6ff0200eaffeffffafff2ff0900caff0a00c1ffebffe4ffd8fff1ffeaff00000800c2ff0500f3ffe0ffebffe6ff2400f1ff9dff01000a00e6ffabff
cbfffcff4100f4fff1ffdefffbff1e002200eaffc3ff0a00a7ffb4ffe8ffc7ff05001400f4ff1100d1ff09000d00020070000500feff0700ecff1a00f1fffdff
e2fff8ff460026000e0010000e00a0fff8ffd7ff090003000700110003001d00f4ff03005bff1b00f3fe0100eaff0500f9fff0fff8ff0200e5fff7ff1700f6ff
0800f5fffbffe8ff2100e2ff0e001000d2ff0500acff0400000000009aff0200d7ff0600110013001400efffe6ff0000f1ff0000e6ff020005001a00f7ff1b00
eefffdff09000100f3ff2b002500e0ff2c00e8ff0c00c3ff000012001000e0ff08000500d7ff0a000100f8ffe6ff4dff2a00140006001200faff24009cff1a00
feffefff1a00c1ffeaff91ff1900f6ff1e00f9fffbfffcffa6fff7ff1500c6ff1000f7fff8ff0f0028000e000000aefff8ff2800e9ffb1fff5fff2ffdcfffaff
21fff6ffd7fefaff0b0017003000cefffeff0b0012000d0014ffe6ffeafffdfffbff000007001a000e00f6ff5bff34ffdefffdffc7ff35fff7fff4ffefff0b00
d2fffeff220001000c0098ffecfff5fff8ff2d00deffd3ff1f000b00ddff08000700f9ff16001b00f8ffdeff06000e0011000b00f0ff020002000800fcfff2ff
0200f0ff15002f00cfffedff0a0019000600e8ff1800d5fff0ffe5ffd8ff0d00defffbfff6ffd0ff2700d6ffdffff2fff6ff1700e9ff5bffc7ff0900ffff3aff
c7ffe9fff1ff3d005bffddfff6ff13003500f4ffc7ff2800230001ffdeffc9ff0700eaff9600200003000d0010000b006d001d00f3fff6ffe5ff1b00f4ffefff
f9ffecff3800100005000000f6ff97ffe8ffccff0000fefffdff130000003200e9ff1c0071ff17009fff1100fcff0b00f6ffc7fff0fffaffe1ffe3ff23000400
0a001300f2ffedff2300adff0d002200d6fff5ff11000f00f7fff9ff98ff0600c7ff0000efff1700eaff0d00eaffe2ffecff120036001700f3ff0700edffe1ff
33000400f9ffe2ffe4ff1e004dffe7ffe6ffeefff9ff0400f0ff07000000e3fffefff6ffe3fffeff1d001b00dfff5aff08000f000900d5fff6ff23009affeaff
0100f1ffe7ff3a00ebff8fff1c00edfff8ff2200f8ff27001900050003000600fcff0000fdff0200e6ff0200e6fff9ffe4ff0600defff7ffd9ffd2ffe5ffefff
1a001c001d00feff0f000f00ecfff1ff00000d00fcffac00c2ff0300f2ff010001000200080012001700d8ff450058fffffffcffbfff1cff3000ebff56000900
eaffe7ffe2ff0400c7ff8ffffdfff6ff280014001100f3ffbcff000000001600eafff5ff0e002800f6ffe4ffeeff0000f2ffdcfff2ff96ffefff0000fbffedff
3600fcfff5ff1f00e2ff0c00eefffbff0300d5ff0800d4ffe9fff1ffc9ffcbffdbfff9ff0200ccff0500edffebffe1ffe6ff2600efff9bfff3fff8ffe8ffb0ff
c9ff0200f9fff2fff3ffe4ffebff18002e00fbffbfff1900a8ffd7ffe7ffcaff1a000000efff2100e1ff0400090002006f000e00f3ff1300e6ff1900faffc4ff
fafff7ff3c001800010004000a0099ffd7ffdeff0100fbff00000b0000000100e9ff000089ff2100f3fe0800f3fff8ffeaffebfefaff0000e1fff3ff14000000
fcffbeffecffedff2600f2ff0f000900ccff0e00a0ff1200f6ffebff9bff0000caff07000c001e001800ebffe5fff0ffebfff8ffd5ffd2ffffff1700f2ff2900
f9ff160009000200f4ff35001400e1ffe7ffedff0300e0ff050014000200e5ff0000f9ffddff0f001b00cdffe0ff4eff26000400f6ff1900f5ff2300a8ff1e00
f0ffeaff1800c1ffe7ff88ff1f00f5ff1500d2fff9ff0d007affe4ff0c0001000900d8ffeaff0600feff1300ffffaefff6ff1500e0ffdafff6ff1500e2ff0a00
e6ffefffdcff06000e002a000900ffff0a002e00100005006efff7ff040000001800f5ffefff0700f5ff000048ff56ffe4fff7ffbfff40ffeaffeeffeaff0400
d7ffe2fff1fff6ff0a009affe3fff0ffffff1000e2fffeff11001700f3ff09001300f8ff18002600e5fff6ff0900060000000e00f4ffffff19000600dcfffeff
f0fff0ff14000d00ddfffdfffeff31000000e7ff1500e4ffe9ffedffc2ff2a00d2fffdff0000c3ff2100e3ffdeffe8fff6ff1800f2ff26fff1fff7ffeaff31ff
c4ffe9ffe8ff170066ffeeffebff1c002900fbffc1ff0f002000e4ffcfffcdffffffedff34002600d1ff02001c0003006b007500f1ff0f00efff1b00f9ffedff
fcffe4ff3c00130001000400f5ff93ffedffd0ffeaffe8ffffff0900e4fffbfff3ff0c007eff0f0097ff0f00f0ff0900f4ff1c00effff5ffd8ffeeff2000fdff
07001f00ebffe9ff2100f1ff0b000000cefff0ff17001f000000f8ff9cffedffb6ffd5ffeaff1e00e3ffffffe8fff5fff8ff1a002f000500e3ff1100effffdff
020008000f00f8ffdeff220068fff1ffeafffcfff9fff6ffdbff00000e00d8fff6fffcffebfff7ff06001d00e3ff53fff3ff07001600cffff0ff270097ffe3ff
0400eaffefff3500f3ff8aff1d00f4ffbcff2d00faff07002100ffff0a000a00fcff0000fdff0200e9ff1000cefffafff4ff0300d6ff0f00ddffe7ffe0ffedff
17001800000003001c0029000100f1ff0600170006000000dcff0200050000000800ffff06000a00faffd9ff450061fffffff5ffbcff23ff2300e7ff53002400
dafff4ffe5ff0500e5ff8bfff4ffebff0f0010001f000000ebfff0fff6ff1700bcffffff13002e000d000e001e000100eeffcffff0fff6ffe9fffefff2ffdcff
3800f7ffb8ff0f00e5ff02000000f5ff0400d7ff0500d4ffebffebffcdffdbffd0ff02000700beff0a00f1ffe4fff2ffdeff2900eeff95fffffffafff3ffafff
c6ff00002300eefff4ffecffe5ff13002400f7ffbeff0300a4fff9ffeaffd9ff00000000ecff2800dbffdfff0e00f8ff71000700f1ff0f00f4ff1500dffff5ff
fdffedff3d000b000200010014009efff1ffdeff0400c4ff05000000feff0d000300ffff82ff1400f2fe0900edffe0ffeeff1000f1ff0600ddffeeff1b00ffff
fcfff8ffe9fff4ff2200efff1200fdffceff250086ff13000300f4ffa0ff110067ff02000c0020000600feffe9ffe6fff6ffd3ffdfff0000f3ff3500f5ff1300
f3ff15001100feffd6ff26001400f2ff2a00e9ff0100f3ff030013001e00e2ff1300f2ffe8ff09000400cdffedff4dff0a001800caff1700dfff2600abff1300
faffedff2e00b7ffe6ff8bff1900f3ff0d00fafff8ff070086fffcff0500e7ff1a00ebffc7ff0800000013001800aafffaff1500dafffcfff3fff3ffdeff2b00
f9fff9fff7ff040012001a000800f9ffffff11000c000b0012fff1ff0800feff0500fffff7ff04000f00030060ff46ffe8ffeeffc3ff33ffd0fff3ffe9ff0b00
d5fffbff0a00c3ff0a008efff1ffe6fff6ff1400efffffff06000500f3ff19001c00fbff18001c00f1ffddff0a0002000000f0fff4ffffff0300feffe4fffeff
ffffe5ff12002400daffedff050028000e00e9ff1800dbfff2ffddffdfff0700c8ff0400fcffc3ff0500e9ffd9fff7fff2ff0600fdff30ffe4ffffffeaff33ff
c3ffd9ffeeff13005cffe1fff6ff01002700eeffbbff09001d00f8ffd3ffe0ff0200f1ff15001f00e5ffcaff12000a006a000d00c7ff0a00f1ff1800fbfffaff
0300ddff3b001eff0800eaffd5ff99fff8ffdaffdbffeaff04000c00e6fffcff0400130074ff0900a3ff2c00f1fff1ffefff1d00c9ff51ffcdfff0ff0f000100
feff1f00f1ffedff1f000000f7ff0300dbfff1ff100000000000faff99fffdff5cfffefff6ff2400f0fff5ffe8fffeffeaff18001300fdfff1ff0a00f5ff0400
49001c000d00e5fffeff1e0069ff0300e7fff3ff0400e7fff8ff0e000f00d9fffdff0000e4ff4a00e0ff1f00e9ff61ffe6ff0b001b00f9ffdcff24008ffff5ff
0300edfff4ff3200f6ff92ff1800f1fff6ff1f00f1ff1a002200f9ff0a00fcfffdff2000edfff9fff1ff1800e4fff9fff9ff0800e2ff0d00d7ff0300dafff5ff
1800feffffffffff3f001b001500fdff0e000000fdff0400d6ff00000f00f4ff0b0010000f00ffff0900fbff43005aff1500bbffc1ff38ff3000f0ff5100efff
f9ffe9ffe5fffdffe2ff89fff8ffeaff0b00120039000000feff0f00fdff2800fcfff1ff110027000500fdfffbff1c00f7ffeffff5fff1ffe3fff6ffdeffeeff
10000b00b8ff0700e2fffeff0700ffff0e00c6ffc0ffcdff0000f0ffe4fff7ffd0ff3cfffeffb5ff2d00edffe8fff8ffecffebffedff8dfff6ff0000e1ffacff
c8ff020007001200f8ffe9ffecfffdff2800fbffc2ff0d00a3ff0200b2ffe1ff12001600e9ff2a00eeffa2ff0700faff6c000400e9ff0000e9ff1400f1fff9ff
fbfff2ff370026000400feff30009cfff5ffdafffffff2ff0c000500eeff0d0001000c0074ff36002dff0d00f1ffdfffedff1200a8ff0b00a5fff1ff13000d00
2500b7fff0ffd7ff2300faff12000400d3ff2f007eff1900baffe8ffa0ff0600a8ff0500040022001f00e4ffeeffeaffe9ffe1ffecfff5ff0300f2ffd0ff1d00
fbff23000e00f0ffe9ff2c000e00ecff0600e5fff8fff7ff000016000400e1ff08000400dafffcff0400f9ffecff63ff07001300ceff1200dfff2700a1ff1200
e6fff4ff3300bcffdaff8fff2700f7ff0a00d8fffdff0b005efffdff0e00deff1400eeffe3ff0e00f4ff31000f00a9ff0900eeffe7fffffffeff0100e6ff4f00
faffefff0a000400070000001300edff1d0013000e0015003fffe8ff1000f6ff20001b0004000c00f8ff240065ff38fff0ff1900c7ff2efff1ffedffe3ff1300
ceffedff0900f2ff01009efff2fff0ff01001c00ebfff2ff0b001e00f7ff26000300f4ff0e001900eaffceff140006001500eafffafffeff23000000fbff0400
f7ffe3ff13001a00f1fffaff090020002100e6ff0e00f1ff0100e3ffe6ff0d00cbff3400f7ffc6ff0f000000e6fff4fffefff3ffefff6cffbcff0100deff7dff
c5fff0fff3ff020099ffdbfff3fff5ff2500f2ffbdff3e001d00fdffbfffd5ff0d00ebff0f001800eaffa9ff110008006b001500f6ff0200efff0f00f6fffeff
dcfff6ff400016001300f1ffd8ff9ffffbffcbfff5fff8ff0a000c00e8fffbffedff1a007aff1700a8ff0a00edfffffff1ff19008bffe5ff9dffdeff09001500
10000700f4ffebff1e00f1fffeff0f00d4ffddff18001e00f9fff6ff96ffbdffc5ff0200e9ff0900edffeaffe0ffecffe4ff160016000500f8ff0b00f3fffaff
e8ff0a0009000500f6ff260020000200f4ffeaff0300c1ff100015001100e8ff10001300ceff13000d00f8ffd8ff4dff0500100005000000faff2400a2ff0f00
f5fffaff3900b1ffecff95ff220006001a00ffff0000fcff8affddff1000daff3000e9fff3ff360028002400f4ffa2fffefffdffe6ff9cfff2fff0ffe2fffbff
0ffff6fff4ff02000a0029002f001a000300110000001f0014fff8ffe9ff040003001600fcffeefff3ff00006aff4bffeffffcffc6ff29ffc6ffeaffe0ff0000
c7ffe9ff0500fcff0000a0ffe5fff8ffefff1e00e1ff060016000e00e0ff36001c00f9ff15001b00fdffd4ff150010001000f0fff8ff0600f4ff0100e5fffdff
f8ffe9ff1e001100d5ffe8ff10001f000600feff1700d2ffe3ffe5ffe2fffbffe6ffffff0100d1ff0b00faffd3ff0500feff1b00fdff6effe4ff1000efff3dff
caffb3ffe5ff0f0068ffe1fff2ff23002a00efffc7ff28001f00c2ffdfffcefffeffeeff34002100ecff00000c00000071001000eeff0800e9ff1b00cdffffff
f1ffe9ff3a000b0003001700f3ff9dfff7ffc3ff0f00fdff0a0021000200a9ff06001e0063ff0700a1ff0e00f3fff3ff05002100e7ff0000e2ffdeff1e000400
13000400f5fff7ff2000d1fffbff1e00deffedff1300edff0200faff97ff0300beff0300e9ff0f00e3ffeaffebff0800f8ff0f001a000800faff0a00fafff4ff
080010000100fdffeaff190058ff0000ecfff0fff8ff0c00ebff0b000200ebfff8ff0400f5ff00001e001100d2ff53fff4ff06001200fefff2ff230088fff7ff
0a00eaffebff3c00e8ff94ff2200e4ffbeff2000f1ff18001f000b000100f2fff7ff2a000300fcffecff0e00eefffffff9ff2900e5ff2500dfffe8ffe5ffedff
11000d00190000001600feff3cffedff06000f00f6ff0900c2ff0600e6ff0e00fcff0b0000001f000b00dfff440061ffdcfff6ffbdff1eff2300efff55001b00
dbffddffd8ff0700eaff8dfff7ff0300140007000700eaff2200010047002300f5fffdff190023000000c7fffaff0000ffffdafffbffd0ffe6fffdffecffe3ff
0f00fafff9ff1600e2ffeafff9fffdff0900cbff0600d5fff4ffe7ffd0fffeffe1fffbff0c00c3ff0600e9ffe2fff0ffdbff2a00f2ff95fff8ff0500f2ffabff
caff1b003600f5fff6ffefffebff1b002a00f6ffbcff0600a5ffe2ffe8ffc6ff00002100f5ff2700d6ff04000f000a007300fbfffbff0600f3ff1b00fafffaff
f2fff8ff3e001a000a00050013009affe7ffdaff11000900fcff1400faff0f00eeff14006eff2300f3fe0c00eefff5fffaff0200faff0200e1ffedff1600faff
fefff1fff6ffd9ff2100eaff13001100d4ff09009affeafff5ffeeff9bff0a00baff0d00080022000e000800e7fffdfff8fffdfff9ffb7ff04001500f4ff1c00
fbfffaffffffe9fffcff34001f00ecff3100eeff0b001fffd9ff11001d00e7ff05000a00e5ff09000900f0ffeeff48ff21000b0000000a00f8ff22009fff1c00
f7fff2ff2100b5ffe7ff8bff1b00f8ff1d00fbfffcff030090ffe6ff1800ddff0a00f2fff9ff040006001300f9ffa4ffffff1400e6ff0100f7ff0a00e2ff0d00
a5fff8ff86ff0a000f0016001700faff00000c0015000e0014ffe7ff06000000fdfffeff0c001700160000006eff49ffecfffdffbdff40ffefffe8ffe6ff1d00
dafff6ff1f00f9ff0e009cffe9fff6ff00000f00e1ff010004000a00f7ff0f000e00fdff18001e00fcffe9ff1300ffff03000200fdff0b00feff0700ecfffaff
0400ebff1b001200d0fffdff070019000800e7ff1900ddffe0ffecffd7ff1f00dcfffdff0600cdff2500f1ffe2ffe5ff0a001b00f0ff4affb9ff0900060033ff
c3fffdfff4ff18005dffe3fff6ff1b002d00f0ffc5ff2d002100c0ffe0ffc8ff0000f4ff91003100edff00001100feff6e0042001100f7fff0ff1d00faffbdff
f9ffecff3c000e0006000100f4ff96ffe4ffd9ffefffffff05000500fcffb1fff6ff030078ff0900a0ff1700f5ff0700f9ffb8ffeffffdffdeffe1ff22000200
0f001900f3fff1ff2700d9ff0b001800d1fff7ff23001200fcfff8ff99ff0200aaffd0ffefff1400f1ffedffecffe9ffebff180050000d00feff0d00f0ffe6ff
3500fafff7ffeeffe0ff250043fff9ffd7ffe4ff0500fcffd8ff0e001f00e3fff5ff0000e7ffecfffdff0100e4ff5eff120006000900f4ffe9ff1e0086ff7e00
0200ecffe7ff3f00f5ff88ff2500c4ffbbff2d00f8ff06001e00f3ff0a00f2fffdffdcfffffffffff8ff1100e8ff0000d1ff0e00ddff1f00d8ffd5ffe6fffaff
05003e00170008002b0004000100ecfffbff020002000c00c7ff0500000004000000030002000d002200e7ff460066ffeafffaffbdff3bff2300edff56000b00
d1ffe1ffe7ff0a00c2ff87ff0100f0ff3a00040017000000ecff1600f9ff0d00f0ffffff15002900e2ffecffb7ff0500eefff9ff0000c7fff5ff0000e5ffdcff
6d00feffe8ff1200d4ffbbfef7fff3ff1100d3ffffffd7fff0ffecffd9ff46ffd5fff4ff0300caff1400ecffeeffeeffefff2a00efff95ff07000300e9ffaeff
caff13002b001300fbffdfffddff1f002900f9ffb9ff100092ffd7ffe7ffcefffdff0600eeff2f00e8fff4ff0500fcff7200050001002800f8ff1b000700e5ff
fcfffcff3b000d000a000100060099ffecffe1fffefff4ff0100090005000700feff21008dff3900f2fe1a00fdff0900e9fff9fef3fff4ffdffff9ff0f00feff
0200bcffe4ffd7ff2300edff11000c00c6ff070083ff03000100f5ff99fffdffaaff0100120018001e00fefff3ffeaffe7ffeaffe1ff0d00fdff2300f3ff2300
efff0a000d00f8ffefff34001e00feff1e00f0fff6ffeeff180016001900e6ff21000000e6ff0900ecff4500e2ff55ff12001300f7ffffffe3ff1f00a0ff1000
fbfff4ff2300a0ffecff8bff1c00f0ff1800d4fff9ff0e007cfff5ff0400feff2700ecffd3ff04000e001d001200a1fffdff1000ddffd7fff2fff5ffe2ff0200
f2fffaff0c000600100023001100ffff0200030019000a0060fff2ff0a00fcff0800fffff4ff0b00efffe3ff4fff5cffe3ffeeffbdff30ffd1fff2ffe9ffedff
bfffe6ff0b00c0ff1b0090ffecfff0fff6ff1d00f3ff09000a000b0000000b000a00fdff13001b00fcfff5ff02001000f6ffe9fffffffcff14000000dafffdff
0200e9ff0c001f00daffeffff7ff4700feffe3ff1c00daffe0ffe3ffdbff1200ceffffff0500ccff0f00eeffe1fff4ff13000300f7ff01ffebff0800c7ff33ff
c8ffbfffebff10006dffe2fff3ff16002700f2ffbcff2f002000e6ffd7ffd1fffcffeeff15002c00e5ffedff1900f2ff70003900fcffeffffcff1b001300fdff
0500e9ff360009ff0c00f9ffdaff92fff3ffd5ffcdffd3fffdff0e00ebfff6fffaff08007aff230096ff1300fcff0900fbff1400d2ffe4ffd1ffefff2000f5ff
0e001b000100e9ff2000ddff17000300d6fff5ff1b000500f9fff1ff96fff2feaafffeffe7ff1600f5fff1fff2fff4ffedff0f0014000700f6ff1300eaff0300
3e00fcff0b00f1ffdeff2500fafefeffe6fff8ff0200f0ffeaff0a000600e5fffbff0600f0ff0b00e9ff1100e4ff5dffe7ff13000700f9ffe4ff240093fff5ff
0100effffaff3700f2ff8dff1f00e5fff9ff3e00f8ff25002a00feff00000000030028000000fafff3ff1d00e9fffbfff1ff1700d9ff0b00d6ff0900e7fff9ff
1c000800040006001b000e000900f0ff0e000f0006000b00d4ff0100090000000b0000000f0004000200e8ff450065ff1f00eaffbcff15ff2900f0ff55000d00
fbffdfffdeff0400e6ff8bfff7fff2ff19000f003b000400f8fffbffedff2b00d0fff4ff0e00280000002c00c7ff1800f7fff3ff0000f6ffe9fff9ffcaffe6ff
080000001c001000e0fffdfffeff00000b00daffd1ffcafffdffefffd8ff0100c1fff3ff0600c2ff2300f1ffe8fffafff1ff0d00e8ff98ff1000f5ffd1ffaaff
c7ff01000700f9fff6ffdfffddff0a002000f1ffc1ff1e009afff9ffccffdbff04000f00efff2c00fbffdcff0c00efff6f000400ceff1500f0ff1400f0fffeff
faffecff3b0015000700ffff140099ffeeffdaff0000f4ff02000600e9ff0c0006000b0072ff270035ff1400efffdffff3ff0e00bcff1600c6ffefff1a000500
c2ffcefff9ffddff2400070016000a00cfff700069ff1400ecffe9ff9dff1600a0ff04000c001e002500e7fff4ffe7fff5fff8ffecfff6ff09002800eaff2a00
030019000e00eeffe7ff23001600e6fff9ffd5fff4ffeeffffff18000c00eaff01000200e0ff0500effffcffe7ff48ff0b0018001e001100e5ff2200a9ff1f00
edfff8ff2c00b2ffd4ff8eff1c00ecff0900ccff0600f8ff3efffbff0700efff1200efffe7ff080004001c000f00a5fffaff1000dfff0300fefff7ffdbff6f00
1000feffffff0600120019001300f2fff5ff0a0019001a0010ffe2ff080000001800100010000b00010022006cff47ffefffe1ffc3ff2fffe8fff8ffe0ff1100
cbffe3ff0b00edff2a008cffedfffcff00001d00f0ff000010000800fbff20002300f1ff13001600f0ffe2ff1800fdff0d00e4fffffff9ff2600f8ffedff0100
effffcff18000100e4fffdfffbff1b001a00ddff1600f5fff9ffe1ffdbff1000c3ff2500f7ffbeff0d000000e0ffeeffe0ff0700e4ff76ffa5fffeffe4ff3aff
c3ffeefff1ff030091fff3ffebfffbff2b00f6ffc2ff4d001e00f3ffc9ffdaff0d00f1ff15001f00e0ffeaff1000f9ff720009000300f9ffe8ff1800efff0500
feffeeff37000d0000000700edff96fff3ffcffff4ffffff05000b00d8fffdfffcff24004cff020092ff3900e9ffe8fff3ff1e00bdffc0ffb4ffe1ff2a001100
fcff1b00f9ffeaff2300e7fff3fff8ffd3fff0ff1a000800e6ffefff97ff01ff9dff0000f6ff0f00e5ffd8ffeafff2ffd5ff1e001200080000000f00d3fff3ff
0c000a001100e2ffe2ff1c0078ff0000e4ffd0ff1300e9ff00000e000200daff00000200e6ff2f00d7ff0d00edff53fffbff10000000fbffeaff240088ffefff
f8ffe3ffedff1b00f3ff98ff2400f2fffbff200008000e001b0001001200ddff01001200f9fff1ffe8ff1100e5fff9ffffff0800eafffdffd7ff0300e2fff5ff
110002000a0003000b00dfff1f00e9ff2d000500fcff0900c6fffbff0d000800f1ff1c00020003001f00d5ff41004effd9ff1c00c1ff36ff2600efff50003b00
d8ffdeffceff0a00aeff91ff1800fcff48000c0013000100f8ff0900fcff14007cfff4ff0d0020001f000000e2ff0e00f5ffd8ff0000f4ffe7ff0100d2fff5ff
fdff1200e2ff0400e9ff05000200f7ff0a00ccffffffa6fff7fff9ffe1ff0200cfff9bfffbffb5ff0d00ffffe6fff3ffe7ff0c00d3ff85fff8fffaffe5ffafff
ceff010009000500edfff3ff0300edff24000100c4ff2800adff0000d8ffdaff00001500efff2c00fbffdfff050008007200f8ff11000900e6ff1400f9fff5ff
daffe9ff3d002c000000feff240099ff0100f5ff0a0003000c000a00ebff1200fbff0d006fff150004ff0a00dfffeaffecff0d00d0ff1000b1ffefff10000400
cbfff1ffe4ffa3ff2100eaff1d000a00d3ff1b0090ff0000edffe2ffa1fff4ffb2ff0a0016001400feffe9ffe9ffe9ffe3fff6ffd4ff01000e00b0fff0ff4c00
01000c001400ffffe5ff1f006bff0b00ebfff4ff08000500e5ff03001500dcfff9ff0000f5ff0c0022001500d8ff51ff0f001c001300fffff3ff240086fffbff
feff000000003700f0ff9bff1d00e2ffe7ff2900f4ff0b003000e6fffeff0000f6ff040009001300e7fffbffe7fffbfff8ff0000e4ff0f00dcffe3ffdfffecff
3f0001001300020015002300c9ffedff0f001500fdfffaffc2fff5ffebff0b000f0006000900e3ff1300e3ff460053fff1fffcffbfff29ff2b00e2ff5300f1ff
ddfff5ffc8fffaffe5ff82fff8ffffff13000d0048001300bdff0000fbff1400ecfff3ff150023000000f7fffcff1200eeffe4ff0700d0fff4ff0400f2ffefff
0f00f1fffdff0a00e2fffbff0000f5ff0300ccff0e00cafff7ffe7ffcfff0200e4ff05001000c9ff2c00f8ffdcfff8ffe0ff2300e7ff9ffff0ff0800d1ffaaff
cdff030002001700f7ffecffdfff1a002600f7ffc1ff2b00adfff5ffe6ffcbff07002000ebff1500e4ff0b0013000a0074000400edff0000f5ff140013000400
f0fff8ff3f001d000a0008000d0092ffeeff05001300f8ff02001f00e4ff1b00040010005dff14000dff1c00f5ffd9fffcfff8fffbff0a00e1fff6ff1300f5ff
0200fffff9ff94ff2000e4ff1200f8ffd7ff0e009effe5fff3fff4ff9eff0a00c2ff0a000a0011000600f1ffe9fff9ffe7ff0200d0ff13000400280000001f00
f5ff080010001800efff300018000b00f1ffecfff9ffc6ffeeff18001d00e8fffeff0a00daff11001100fbffddff47ff19000e00fdff0600fbff2200b1ff0f00
f7fffcff2b0099ffebff93ff200004000b00f9ffffff0b0070fffbff1200efff3b00f0fff8ffe4ff0b002400f2ffa3ff0300fbffe7fffffff3fff9ffdffffdff
f9fff3ffc6ff0f0009000d002200faff04001100100011001dff0300ebff060001000300fdff24000300fdff5bff48ffe8fff9ffc2ff41ffe1fee2ffe6ff0500
e1ffd9fffdfffcff19009bffe9ffffff01002900ebffdbff04001c00ecff44001400f4ff17001e00e8ffe8ff0e000f00030007000a000100fbfffcffc9fffbff
feffe4ff17001100c2fff0ffffff1400f4fffeff1700e1ffdeffe6ffe0ff1500ddff06000800c7fff1ff1000e0ffeeff15001c00eeff53ffebff0900f5ff33ff
c6ffa5fff5ff15006cfff6ff070020002b00e4ffbbff30002800e9ffddffc5ff040009003a002100f0ff0200130004006c002b00f6ff0b00f9ff1d00cfff0100
edffe6ff3c001a0005000b00f3ff93fffbffccff0000f7ff0c000e00fdfff9ff030022005cff1200b6ff2300eeff020010001d00f2fff5ffdcfff0ff1e00ffff
0e000100f3fff9ff2500ebff02001400d8ffe7ff1600edfffffff8ff97ff0200b2ffc4fff3ff0900dfffa2ffe1ffeefff9ff180046001f00f8ff0d00f0fff2ff
05000000feffd6ffe0ff210064ff0800ecfff2fffefff7ffe0ff0d002300e7fff6ff0300faff00000e001300d9ff56ff070000000600c3fff2ff20008bffeeff
0a00dcfff5ff4600f3ff93ff2300eaff15001f00ffff19001900e3ff0d00f0fff8ff2600feffebffe9fff9ffd4fffffff3ff2900e1ff0a00dbff0200e5ffedff
0b000700000017002a00ffffe6ffe2ff0100010000000900b9ff0800f4ff0e001c0007000a0010000400ccff420069ffe0fff2ffbfff34ff3e00efff5300f1ff
d0ffe1ffe2ff0700f8ff87ff0000fbff1b00240017000f00bdff0b00d3ff1c00f0ff0700150022000a00caffd7ff0b00e9ffeeff0000ecffeaff0000d1ffd0ff
3400f3fffaff1f00d2ffdffff6fff7ff0600ceff0700dafff3ffd7ffdbffceffdafffcff0e00bfff1200f4ffe2fff2fff3ff2800f2ffa9ff02000b00dcffa2ff
ceff1b006400fefffcffdbffe7ff1c002800f7ffb4ff02009effe8ffe6ffcdfff8ff1d00f4ff2800e9fffaff00000200770000000000fcfff7ff1a00fbffbeff
f4fff3ff3d000f0013000500100097ffebffe3ff0a00000001000800fdff16000a00030069ff2300f0fe0400e6fff5fffbff0000f8fffbffd8fff2ff1d00feff
0600eafff4ffcbff2100d2ff0d001300d1ff0b006bffedfff8ffd9ff93ff0a00b0ff0b000e0012000900eeffeeffe1ffedffe6ffcfff11000000e4fff3ff2500
010007000400fcffe9ff2f002800feffcafff4ff0800e8ffffff19000900e7ff34000a00e9ff10000d00c1ffebff5bff20001800fdffecffe4ff1d009dff0e00
0000fbff240092ffe9ff90ff1a00ffff0900f0ff0000200076fff9ff1000d5ff2300d9ffe7fff9ff0e0018001f0099fff6ff1100e2ff0000f8ffe7ffe0fffcff
ebffdcfff8ff10000a00f7ff0e00eeffffff0c001b000a0011ffceff0000f8ff14000000090020001a00fdff5eff41fff3fff5ffbfff33ff87ffecffeaff0700
c2ffefff1c00a7ff070083fff5ffecfff5ff2600dcff1e000f000a00f3ff2d001700fdff15001400ebffedff1b000d000000f1ff0a00f9fff0ffffffe1fffcff
efffe0ff13002700d8fff6ff000020000800e2ff1b00d3ffe2ffe3ffe5ff0700d0ffffff0100cbff0800faffeafff1fffdff0e00eeff52ff90ff0900e8ff33ff
c5ff9ffff2ff2a0067ffdffffbff18002d00edffb2ff2d002100c6ffdfffc9ff1400e6ff920029000d00f0ff0100f7ff7000fcff1800edff00001e00f5fff8ff
fcffe5ff360022ff0f00f7ffe0ff91fffeffd6ffbbfffcff01000d00deffc6ff0200ffff6fff0c0098ff060001000400f5ffc1ffd1ffe7ffd4ffd5ff1600fbff
00000b000900ecff2100d1ff1c002000d3ffe3ff19000a00f0ff08008cff0e00b6ff0200f2ff2600f1ffeafff4ffe4ffe5ff17004a00faff00001000f2ffccff
7000fbfff2ffe9ffdbff2a0005fffbfff2ffe3ff0300dcffe8ff0f002200ebfffcff0e00edff050005000600e9ff60ffecff07000f00bbffe6ff1e008affecff
0400f5ffe2ff3c00feff8fff2500e9ffecff3e00fafff7ff3800f9ff0900e2fffcff1f000300fafff5fffaffddfffdffa7ff0900dcff1200dafff3ffe5fff8ff
1100fdff06000d003b00fbff0600f2fff8ff0500f6ff1700c1ff1b0004000500fdfffeff03000600fefffbff460064ff2700ebffbcff26ff2500f4ff57001c00
f6ffd6ffdeffffffa1ff87ff1000e8ff4800240038001000edff0700f1ff1700f7fff6ff1c0024001200dffff1ff1700f6ff1f000900d9fffdfffeffc4ffe6ff
2e000100befffbffe1fff2fff8ffe7ff0b00ddffd3ffd1ffe8ffe0ffdaffe4ffd1fff0ff0500c9ff2f00f4fff2fff8ffe3ff0d00e5ffa8ff0400fcffd7ffa8ff
cbfffefffbffeefff8ffd9ffd4ff0b002500eeffb6ff1f008effddffdfffcfff67fe1900eaff2500ebfff2ff0600ebff740000001000e4fffbff19001a00f9ff
faffebff3a000a000a00f6ff150095fffeffdafffbffdbff00000b0018000900fdff24007dff0f00f8fe050003000400f4ff8dfec9fffcffd0fff0ff12000000
cfff3900efffc7ff2200edff12000f00c8ff310076ff0400e9ffefff92ff0500bdff05001f001d002900f6fff7ffd8ffedfff6ffe2fff6ff06000300e0ff2f00
f9ffd6fffeffe2fff7ff2f002200f3fff4fff6ff0700f0ff0f001b001100e9ff02001600ebff0900fcffc8ffdaff48ff1c000000c9ff1500e3ff1f00a3ff0f00
f0fff9ff3200b1ffd2ff8eff1500edff0300cefe0400010042fffdff0f000e001a00e8ffe1ff05000200110015009efffcff0100e2ffdcfff8fffdffd7ff2300
0200efff0000030000002b001800e7ffecff0a0014000a0010ffbaff0d00fbff22000700e1ff0b001f0010005dff5efff0fff3ffc1ff28fffffff7ffe5ff0800
d1ffddfffefffbff20008effe1fff6fffaff1a00f1ff030010000900f2ff2f001900f1ff17001700e7ffe9ff1a0000000000f3ff0f00f1ff31000200f8fffeff
f2fff2ff07000500e3ffedfff7ff16002600e7ff1200f8ffe8ffe8ffdcffffffcdfffaff0200cbff05000800e7fff6ff1400f5ffeeff6eff92ff0200e8ff40ff
c6fff8fff7ff15008effe6fffdff08002600f4ffbdff51002000e5ffb5ffd0ff0c00daff14002300dcff04000c00dfff76001900e0fff9ffedff1a00edff0000
0800f0ff3b0010000b000000f2ff92fff1ffc9fff8fffbff00000200d6ffebfff9ff210081ff11008fff1d00f1ffedff00001a00d4ffe8ffcdffdfff1a000c00
13000a000000f7ff2100d2ff19000100c8ffeaff1a0009000200ebff90ffd7ffc1ff0000c1ff1100f7ffddfff1fff1ffeaff180014000000fdff1000cffffbff
030005000700eaffe2ff22003ffff5fff1fff3ff0600f5ffe3ff10000b00e2fffbff0300f5ff0900faff1200f2ff54ffeaff1400fdfff8ffecff1e0095fff0ff
0300d3fff5ff2a00efff8eff2800ebfff6ff3a000c000d002100fcff0a00110004000a000100f6ffefff2000dafff9ffefff1200e0ff0300deffecffe1ff0300
1d000800070005001700d7ff0a00dcffdcff11000f000400d6fffeff06000900f7ff0500130002002600b1ff46003effc4ffefffc1ff27ff1a00f1ff56000000
ceffcdffe3ff0500acff91ff0700f5ff490014001e000900f2ff0100f7ff05001cfff8ff140027002400ffffcfff0b00f9ffe0ff0b00f3ff0b00fcffcdffedff
09000400beff1200dafff9ff000008000300ddff0200cdfff5fff3ffdbfffeffd7fff6fffeffb2ff0700eeffecfff9ffeeff1800cfffb5ff1600ebffe5ffa3ff
c9ff07000a00fefff8ffe4ffffff00002300edffbbff24009ffff6ffd3ffdbffeaff1500f1ff2700fbff07000700f8ff6e0000000a000000efff15000c00f3ff
0000e9ff3c00140001000000100096fff8ff01000500fbff05000400f2ff0c00f9ff130058ff1a00f3fe0600e4ffe5fff5ff1100edffffffc7fff1ff0d000e00
f2ffebffe3ffa3ff2500dbff06001000caff26006fff1200d3ffe8ff9cff0d00afff0a00070010000000efffedffeaffedfff3ffe7fffeff09003500f3ff5600
ecff01000000e7ffe2ff22001600e3ff0000ebff1b00fafff7ff28001100e3ff0a000000e4fffdfffaff0100f2ff4aff07001300caff1700e7ff210091ff1c00
e9ff00001300b3ffe8ff90ff1800f9ff1800e9ff13000d007bfff8ff0e00e6ff0800f8ffddff0400f2ff28000800b1fffaff2600e3fffffff2fff3ffe2ff5400
f8fff9ff030008001f000a000f00f7ff09000a000e00130013ff1a000500050011000b00affffbff190002008aff3effefff1a00c5ff41ffe1fff8ffe4ffe2ff
caffefff0c00f6ff1a0092ff0400f6ffeeff0e00e4ff15000c001500feff08001700f2ff190018001600f0ff0e00faff0d00e6ff0000fcff2b000000e2fff8ff
fdff050025000f00dcff000006001d00f3ff07001900d8fff0ffecffdbff2200cefff6fff8ffc5ff0500f1ffeffffbfffbff0700f6ff8cfffbffffff1400a2ff
c5ffe5ffeeff1a005effc6ffd1ff04002900f8ffc0ff51001e00f8ffdeffd2ff1d00f6ff12001600ccffeaff1f00efff6a000e001600f0ffdcff1400fafffcff
ebffe0ff3a001b000200fcffedff94fff3ffd7ffe5fff6ff04001100d7ff0000f2ff06004cff0300b5ff1900faffc9fff4ff1800daffc1ffcdffe8ff0b00f6ff
14001100000000002200eefff0ff2400cffff6ff340014000200efff95ff0d00aaff0000e2ff2100f2ffeeffe6fff6fff7ff1a0009000100f5ff10000800c3ff
f3ffedff18000d000400280014000e00e9ffdfff0300c4ff040008001d00eaff14000600d1ff14001a000000cdff53ff0c00200002001500feff1e0099ff1700
f4fffbff250095ffcaff95ff2400f7ff2300f1fff8ff2c0077ffcaff130003007400f5ffe7ff1c0002001500faffa2ff0600fcffe4ff2600f8ffd3ffdeff0b00
c8fff1fff3ff0e001c0021001a00eaff03001c000e0020001afff8fffcff0600ebff0d000000ecffecfff1ff77ff3ffff0fffcffcdff39ffeefeffffecff1a00
caffd1fff2fff3ff19008bff0000f6ff00000c00feff2a0018001f00efff10001a00e7ff18001b00f8ffedff1500160000001c000600fdfff9ff0900e3ffeeff
f0ffe9ff1c000b00d8fff2fff9ff1b000300caff1f00fbffeaffdcffdbff2100dbff00000700cbff00000400d9ff1100ecff1d00ddff53fffaff1200e5ff3eff
c1ffd4ff0900060064fff3ff07001f003000f0ffb8ff18002000efffdcffcafffefffcff34001b00e5ff00001f00feff75002000f0fff1ff00001d00eaff1100
f7ffedff3a00180007000c00f7ff97fff2ffd0ffbbfff2fffcff1f000000f9ff0c001f0070ff1500a9ff0100e8fff1ff05002000ebff0000d8fff0ff2e000100
12001700ecffffff1a00ecff17000000d4ffe4ff1f00e8fffffffdff9aff0100b0ffc1fff1ff0a00deffceffe5ff4900e8ff25005c000d00e4ff1200f5fff1ff
faff00001700f5fff0ff19001eff0700e4fffbff0e00fdffd5ff13001900ddfff2ff0500daff07000b000f00d4ff51ff0a001b000900ddffefff220070ffddff
0d000000f2ff4b00fbff96ff1e00ebffb4ff2e0010001b002a00fcff0f00f6ff00000100fbffc1fff1ff0100dffffcfff3fff0ffe1ff0700dafff4ffe0ffe6ff
18000300ecff030026000e001300e3ff08000700f6ff0d00ddff030007000d0022001100faff1900f8ffdbff450068fffeffedffbeff3fff3600eeff55000000
fafff9ffd1ff0300f5ff81fff4ff0000140007003b00d9ffefff0500ecff1800faff000015002200fefff8ffecff0900ecffecff0200e3ffe2ffffffdcff0600
3000ebfff2ff1100cbffdeff0500eefffaffbeff0100caffe6ffe1ffdeffbeffdcff00001100bbff21000600e5fff8ffe2ff2e00f2ffaafff1ff1100d4ffa8ff
cdff04004000f6fffeffecffe8ff15002c00f9ffb7ff0a00a1fffeffe2ffcffff7ff2d00f3ff2600e4fffeff0300070076000300dfff0000f7ff1d000f00f6ff
f9fffaff3b000d000d0000000c0093fffeff00002f00f5ff07001a00f4ff0e000a0011006eff1700f3fe0700ebffe5ff02000800f5ff0000dbffe3ff1b00fbff
fafffefff0ffd1fe2200d8ff1000f9ffceff080079ffddfff5fff9ff95ff0d00b5ff01000e0017000400e0ffeffff1ffe4ffe9ffd0ffddfffcff1100f6ff2100
fcfff4ff1600f6fff4ff2b002200feff2500dcff0200dbff07000d002e00e6ff3b000c00dcff1500fdffe2ffcbff49ff24001500ffff0900edff1e00a8ff1100
030015002e0084ff0f0096ff2100faff0000f4ff1400100042ffcdff0e000100b700f9ffdaff060011000100030097ff0200faffe5ff1c00f9ffd6ffdcfff6ff
d6ffe9fff0ff20001700240019000f00080009001100090013ff0200f3fffcfff7ff1000f9ff2000fafff9ff62ff56ffeefff4ffcfff3bff1affe7ffe5fff9ff
cbffe5ffd5ff76ff0a0093fff0fffefffbff1b00e9ff1e0008001400fbff56001c00ffff15001300edffe4ff0d000100f8ffffff0b00faffe2ff0000c2fffaff
f3ffd0ff1800f3ffdaffeaffefff11000c00ffff1d00fbffe0ffd4ffebff0f00d2fff4ff0300c2ffd5ff1800dfffe7ffeaff1000e5ff4efff1ff1900d8ff2fff
c1ff1e00f5fffcff76ffe5fffaff15002d00deffb7ff34002000eeffdbffcefffcfff1ff29002000f6fff5ff0f00190076000300f1ff090006001e00efffe1ff
ebffe7ff360021ff09000100dfff8dfff2ffc6ffb9ff030004000300fdffebff0c00200069ff0c009dfffcffedffe8ff0e002100ccffd6ffd1ffdeff1c00fcff
0f001400f9ff05001e00eaff05001700d4ffd8ff1b00bbfff7fffdff8dff0200bcff0800ecff0f00ddfffffff0fffaffe3ff110025001100f2ff1600e8ffecff
54000700f2fff7ffecff260065ff0000edfffbff0000eeffe2ff0b004d00e7fffcff1200fffff4ff01001900e1ff5efffcff06000d00f2ffebff230085ff0500
0100e1fff1ff3f00000093ff1e00ceffacff270011001a003300ebff08000d00030032000200fffff2ff0300d5fffcff0100feffe2ff0000d9fff5ffdbffebff
16000400000011001b000400f4ffeaff05000800f4ff0900bdfffdfff8ff0400200011000d000a000a00e5ff45006cff0500e6ffc0ff34ff3800edff52000400
f2ffd5ffe7ff0b00dcff7cfffbff04001800e3ff2b001500deffe8ffebff11000300faff1c002300feffdbfffbffdcfff6fffcff0900edffe1fffbffd0ffe1ff
fefff6ffe8fffeffd7fffcff0000e8ff1500dbffccffc9fff8ffdfffeafff2ffd2fff4ff0300c4ff2e000300f4fff7fff7ff1900efffa0fffeff0c00dcffa3ff
ccffffff2c002100fbffcbfffeff14002400e8ffb3ff28009cffeeffd7ffcfff17003600ebff2500c1ffedfff3fffdff7600fbff0300feff00001600feff0400
e8ffe5ff3b0013000a000700140093fff7fffcff01000e00feff0100d8ff1300050019007dff1a0008ff0300f9ffe6fffaff0700cfff0200d0ffdaff1600faff
d1ffb5ff0000c1ff2200d8ff0c000400cfff24006affe7ffefffb2ff8dff0f00c4ff05000e000500f3ff0100f7fff0fff6fff7ffc6fff7ff0100feffdaff3b00
feff07000300f5fff7ff30002700f3ff2000f4ff1100f4fff8ff14000d00e5fffaff1e00e5ff10000000e6ffedff4fff2600ffffdeff1c00e1ff200099ff0c00
fbfff1ff3d009affcfff95ff1f00f9ff0d00c3ff0d0001007bfff9ff1000ceff0600f3ffe3fffeff010000000300a2fffffff7ffecff1600fcffdcffdeff2500
ecffe4ff0f000700fdff08002000dbfffcff0d0025000f0012fff3fffbffffff2a001300feff1400080014006aff4afffcff0000c5ff33ffe0ffecffe6fff2ff
d0ffdbffefff050013007bffdaff000000002800eeff01000d000900eeff35000600f3ff200016001c00fdff0900feff0a00f0ff0f00f6ff05000600fffffcff
fbffe4ff18001a00defff6fffcff1e002300ffff1b00f7ffefffdbffe3ff1500ccfff3ff0600c8fffdff0200ebfff9fff8ff0300e2ff6dffcbff130000003cff
c3ffe2ffdbff20006affcfffdcff02002800e7ffb2ff4e002000c7ffd3ffc8fff8fff6ff93002400050004000500edff76000f001100d4ffeeff1500d6ff0000
f3ffebff3a0015001000f8ffedff8efff8ffbfffebffd5fff9ff0000cbffc2fff6ff220079ff16008dff1e00ffffd5ff0100caffccffe6ffceffc3ff20000400
0d000300faff0d002300c1ff13003800ceffe3ff20000e00f9fffcff87ff1700c2fff9ffefff0900f9ffdefffcfff6ffecff12003400f8ff01000900d6ffd0ff
4100dbffe2ffd9ffd5ff260027ffe9ffe7ffbffffeffe5ffeeff0e000200ddfff9ff0b00ffffe7ff03001500e7ff59fffcff00001100c7ffe4ff1c0082ff0000
0200f2ffe7ff3800f5ff92ff2300dcffe4ff42001b001e003500f8ff0d00100007000700feff0700f3fff7ffc6fff9ff8dff0400e7ff1a00ddffdcffd8ff0100
1000120003000a002f00ddff1000d9ffe8ff110030001200d2ffebff00000800eeff0a00eeff020011001600460053ffbfffeeffc7ff31ff2b00e6ff56001b00
bbffddffc6ff0c00100088ff4d00f7ff8e001f001d000300ecff0500fcff0700b8fff2ff1f0023002900e3fffaff0a00f3fffcff0c00bfffe4fffeffb7ffecff
1c000f00f1ff1c00d5ffe8ffeffffdff0100d6ff0f00c2ff0200e5ffe1ffe0ffdaffecff0100caff0b00dfffe7fff1ffd9ff1a00ddffaeff0500f0fffeffa5ff
c9ff060001000e00f3ffd1fff0ff13002600e9ffb6ff3500a1ffdeffd0ffccff00000b00f5ff2200fdff07000800d6ff7d000300e6ffefffe8ff18002200fbff
fbffe3ff390021000e000200110095fff9fffaff08000b000400070046000b00eeff05006aff0700f2fe05002100effffdfff6feebfff7ffd0ffd6ff10000000
f1ffa7ffdeff05ff1d0089ff09000a00c4fff5ff80ff0600e1ffe9ff8cff0c00c9ff0b00190013000700ebff0000d6fff6fff6ffd7fffafff8ffb6ffe9ff1e00
f5ff02000a00c8ff020026001700e5ffe8ffe2ff1600ebfff7ff17001f00dcfff6ff1100e3ff1400f9ffcfffcfff43ff1a001100f7ff0f00dcff220097ff0f00
000005003000adfff3ff94ff1a00f0ff0800b8ff1b001c0076fffeff1a0008000900e4fffefff9ff02001a000200adfff7ff1800e6ffd9fff4fffeffdaff0600
0a00f1ff0100f4ff0f002e000500edffd8ff09002d0009000aff0d000b0006000700fdff0b0003001000efffa0ff59fffafffaffc6ff50fffffffaffe3ff0100
a6fff1fffafffbff04008efff8ffeaff05000100f3ff090006001300faff13001300f0ff1a0013001700fcff0000faff020000000c00faff16000200d8fffdff
f6ffdeff18001700e1ff030005001400feff05001700c7ffd1fff4ffdeff1100e4ffffff0300c8fff7ffecffe4fff0ff02001e00000015fff4fffcff0400a4ff
c5ffecffe4ff02006dffdcffe4ff0e002d00f4ffbeff46002100ebffc6ffd2ff0600daff0a002600c5ff07001100eeff79001d0007000000dcff1200ecfff7ff
0400d4ff36002d000f000000f9ff95fff4ffc7ffe9ff020004001600dbfff5ffffff0e0078ff0600afff38000200e0fffcff1000f2ffe0ffd7ffe7ff14000900
04002300030011002100e3ff03001400d3ffefff2f001000f7ffedff91ffe4ffceff060016001c00daffe1fff4ffe6ff01002200fafff3fff1ff1d00ecffe5ff
f1ff0900d6ffe1ffe4ff1d00f1fedcffebff0300f8fffdffeeff14001000e4fffeff0b0004001c000c002200e6ff56fff1ff15002500fdffe1ff1e009cfff8ff
f2ff0400dbff2800f6ff94ff2300f6ffefff4f000d0007001a0000001000e6fffdff0400f9fffefff2ff0d00e5fffafff1ff0400e2ff1100d9fff4ffdefff4ff
180008000300f1ff1700efff0b00e8ff24001c005d001600ccff210006000300daff0500160005000000eeff460058ff2bff2900c8ff0dff2900f3ff5c001a00
dbfffeffdeff0d00dbff92ff0600ebff3000210010000400eaff0300faff0e00e2fef6ff110026000b00ecffd1ff0c00fdff15000200f1ffeaff0900e3fff3ff
0100feffbdff0200e3ff00000400f4ff0f00afff0600d3fff3ffedffd0ff0400caff0400f1ffb5ff1700f3ffeefffcffccff1a00f9ff9aff1000f7ffccffabff
caff000011000100f1fff4ff0c0014002900f2ffbbff2400adfffeffdfffd1ff02000900efff1800f6ff03000e00faff6b00f1ff13000e00e8ff0d00f0ffeeff
f2ffeaff3c001f0000000700130099fff3ffd9ff0000fafffeff0d0028000700fcff19003bff1b00f7fe15000000e7fff2ff0c00f3ff0000d7ffe6ff0400fdff
f8fff4ff0200d1ff1900deff1a001f00caff220084ff1800e9ffe1ff94ff1000b9ff0d0014001d001200f7ffedffe1ffd7fffeffe6ff0100feff2b00f9ff3200
05000f002400effff2ff1f0063ff0000d9ff0000f7ff0600b6ff0a002800e9ffd6ff0200d0ff020008001b00b7ff50ff0a001e000500d3fff2ff23007bffdcff
0800f3fff2ff4500fbff99ff2000d1ffc4ff1e00fdff2d003300fcff0d00c7ffacffeafffbff1100f8ff0000d2fffafffbff0e00dfff1400d9fff6ffe0fff4ff
26000b000700a2ff2e001f000400e2ff0b000800fdff0600e4fff3ff08000f00010014000d0015001900f9ff3e0048ff0400f6ffc2ff41ff4600eeff5000ffff
f6ffccffedff0000e7ff7bfff1fff9ff19000e003f001600f2fffeffebff0c000400f9ff190020000400fcffd6ff0400f2fff2fff6ffecffe2ff0000c5ff3700
3c00fcffe7ff0400f2fff6fff6ffecff3200cfff0d00bdffe3ff1800dcffddffdeff00000800b4ff1300f8ffd1ffeaffecff2b00d1ffa5ffeeff14000c00b6ff
c8ff1e0036000600f7ffe4ffd8ff1b002f000700a9ff0a009cfff3ffddffcffff9ff2a00f4ff1500e0fff8ff0a0004006b00ffffe0ff100001001e0009000800
f3ffecff45000c00170010000f0091fff9ffd6ff2a00f2ff03000a00efff15001b000b006cff14002fff09000100dcffedff0c00f4ff0600dcffe6ff1500f5ff
0800e7fff5ffd9ff1b00deff10000400cbff0e003bffedfffafffaffa1ff1400aeff0d0013000600fdff0100e0ffdaffe1ffeaffcbfff7fff7ffe7fff1ff1e00
dcffffff1700fbfff8ff29001d00f1ff2100dffffffff0ff16001e001b00e6ff66000800dbff1300ffffe6ffd3ff4fff10000e00f6ff0000e5ff1d009dff0c00
0000ffff2c0092ffc1ff95ff1d00e7ff130000000500030067fff8ff0f00f2ff4400feffdcff0100130017000b0091ff05000000e1ff1c00f9ffdeffceff0000
eaffe9ff1d00030017001f000000e1ff000004000600180017fffdff0d001200edff1500efff0d001100edff5fff43ffddfff5ffcfff2dfffdfe2200e7ffe7ff
b1ffdaff06009cfffbff84fff6fffcfff3ff2600defffdff10001700f2ff1e001c00f9ff10001400e4fffdff130027000400f3fff2fffcffeefffbffe5ff0800
fdffe2ff12002a00bdffeafff0ff1a000800d7ff1f00f1fff5ffe9ffeeff1800cfffeaff0a00c2ff17000800ddffccffe9ff0900e2ff4bffe8ff1800a5fe2fff
c3ffa7fff5ff230061ff0000e8ff17002c00e1ffadff0f001a00f4ffd8ffd3ff0900f2ff1f001c00f1ffe3ff0d0008006c001100fbfff5ff08001c00f3ff0300
effff1ff3a0017ff1100fdffd8ff92fff3ffc7ff2c00f8ff0b001100fffff0ff30000a0068ff0e00bfff0a00fdfffffffbff1f00c8ffc8ffd3ffeaff1f00f4ff
03001100eaff0d001b00e5ff09000400d4ffe6ff1000d3fff8ff010091fffaffb6ff0800faff0a00efffceffe0fffafff0ff18003a00f4ffe8ff0600e8fffeff
310003000800dfffe9ff240049fffdffe7fff6ff05000600e4ff14001c00e9ffeeff1300c5fffeff14001900c6ff53ffebff0b000800f0ffe4ff260084ff0900
03000000fbff44000a0097ff1f00d9fff4ff33001d000b003600edff0200130000003a0003000800f4ff0200d3fff4fffdff0100d8ff0e00ddffeeffd6ffe3ff
36000400f7ff0f002e0010001600e9ff09000800fbff0d00d3fff4ff0100120003001900f9ff1a000a00e0ff45005bff1d00efffc1ff38ff4600e5ff5200f3ff
e4ffddffd6ff0000ebff77fffffffdff19002b0026000c00f1ff0a00f0ff1b00f9fff5ff13002200f2ffe7ffffff2300edffedfff9ffedffeefffbffd5ffeaff
1100f0ffe5ff1a00d7ff0400fbfff0ffeeffccffd6ffb4ffecfff2ffe0ff0200d0ffeeff0800b4ff0f000700edfffaffe5ff1600e2ff9eff00001300f2ffa0ff
cdff0b00f2fff7ffffffe0fff9ff0d002900efffbaff1000a3fff7ffddffcffff4ff1d00f0ff2100f2ffecfffcfffeff7200f1ffebfff5fffbff1700f2fffaff
f1ffeeff3a001a000b000800100093fffbfff1ff0000f6ff10000700e1ff0e001400140082ff1d0016fffefffdffc6fff1ff0e00c4ff0200cfffdbff1b00feff
c6ffcffff8ffc8fe2100f2ff0d00f9ffccff250081ffd3ffeeffecff95ff0b00c5ff010002001500fffff8ffe3fff2ffebfff9ffcfffefff0300b1ffe1ff2400
dbff0a00f5ffeeffecff2d001e00ecffefffe2ffffffe5fffcfffaff1f00eeff01001300dfff1400f0fff7ffd6ff42ff06000900e4ff0600ebff1d00b4ff1600
f4ff0100260091ffdcff98ff2500e6ff0700cdff090003006dffe5ff0c00e9ff3400f3ffecffebff04001600f8ff9bfff8fff7ffe7ff0800feffd7ffdbff1e00
e3ffe8ff07000f000100f7ff1b00f4ffeeff070006000e0013ffe5ffe4fffefff3ff2500f8ff0b000800fdff7bff58ff0900faffc6ff32ff7dfff7ffe0ff0000
caffc1fffdff0b00150088ffe7ff0a00f2ff2800d9ff060003000200e9ff3e001300efff1d001600f3ffe6ff11001300080000000300f5ff0200fffff2ffffff
dcffe7ff0c001d00c7ffedfffeff1a00eafff1ff1700ddffddffe7ffecff0000d0ffffff0000bbfff8fff8ffe5fffcffd2ff0700e6ff72ff9cff1a00fcff37ff
c4ffc4ffecff01006effe7ffeaff0c002600e6ffb7ff23001e00f1ffd3ffc8ff1800faff1d002000eefffcff0900f9ff7a000400f4ffeeff01001700f7ff0200
ecffe4ff3600160005001500f0ff8cfffcffb3ffddfffbff05001100f8fff1ff0400200078ff0a00a2ff12000100effffcff1b00d2ffe5ffccffa5ff10000300
05000800efff19001e00f4ff0300e6ffcffff0ff1800defff0ffeeff8bff0a00bffff7ffe9ff0500dfffccffe3ffe7ffe4ff14002c00010006000700e4ffd1ff
0b000400efffedffeeff270010ffebffe3ffe1ff0200fdffe8ff13003000e6fff6ff1000e3fffaff00000e00e0ff58fff4ff0d000600e6ffefff240087ffffff
fbfff1fff6ff3100f8ff96ff2e00d3ffd3ff2800eaff21002c00f4ff10002a00f4ff29000000fcffe7ff0300d7fff7fffcff1c00e1ff1400e1ffeeffd8ffe8ff
140019001100e7ff2500e1ff0300dafff3ff0c00f9ff0a00ccfff8ffeeff040000001500130007002a00f6ff430069ffccfff1ffc4ff35ff230000005500fcff
ddffd5ffd6ff0400bdff7bff09000700540014002a000600d8ff0000e5ff0d00d9ffeeff190023000200c4ff0200f8ffeafff0fffbffcfffe4ff0000f2ffe6ff
04000500f1ff1c00d2ff0100fcfff8ff3f00b5ff0700bdfff4ffe7ffe4ff0d00e0fffbffffffbaff0500e9ffe4fffaffebff2200e8ffa7ff0e000300dcffa0ff
ceff07001d000300fdffd6fff8ff09002200e9ffb1ff0c00a4ffe7ffd5ffc8ffdcff1200efff2800f0ffffff0c0008008200fcfffffffdfff6ff18000900fdff
f4ffe7ff36001800130006001a008fffecffe3ff0700f9ff0000fbffdcff1600f4ff0b007dff1d00f9fe0200e4ffceffd9ff0400ebff0200ceffe1ff1b00f5ff
f5ffe6ffe8ffdbfe1c00d0ff0a00feffcbfffbff65ffffffe4ffc7ff93ff0200c4ff02000c0016000100ecffecffd9ffe6fffdffbdffeaff0f000e00dcff2100
dfffccff0700ecff050029002200e5ff1e00caffe7ffe1fff3ff28001c00e1fff7ff0f00c9ff1b000600edffe0ff4eff2100030001000f00e2ff1f009bff1200
fffffdff240093ffe9ff97ff1800ebff0b00d8fefcff0d008dffedff1700d4ff0900f5fff5ff070012000c00e5ffacffffff1f00effffffffcff0900d5ff0000
f8fffdff0d00faff1500f5ff1500ebff01000d0024000a0010ffe4fffbff0f0003001000ffffffff0b00dcff6cff43ff1a00f1ffc5ff3afffafff5ffe5ffe6ff
b6ffe7fff6ff0500080078ffdcff080001002400f0fffcff06001400e9ff18000600f6ff1c0019000d00eaff0e00ecff0000e4fffeff010014000000dcfff3ff
f4ffdbff18002500d0ff0000030018002100f8ff1200d7ffdaffebffe4ff1900e4fffeff0100c4fffdffeeffe7fff9ff00001400f1ff78ffaaff090006009dff
cdffe6ffe5ff0f0075ffd6ffdfff10002900e4ffb4ff28002100c0ffe1ffc2ff0600eaff93002700f1ff05001600dbff7200100007000100e0ff1200f1ffe9ff
f3ffddff370020001500d7fffaff91fff1ffc3ffe8fffeff07000600caffbafff5ff100062ff1000b2ff1d001100d2ffe6ffc0ffebffd7ffd9ffcbff17000400
060010000400f6ff1c00d4ff2100daffd4ffe8ff2f000700f4ffebff93ff2100cdff0500e8ff1c00e1ffd7ffefffd6ff0500170026000200f7ff1a00ddffcaff
2700eaffd3ffe4ffe1ff2a003fffd3ffedff1700fcffeeffe1ff28000400d6ffe2ff1300fcfffeff0b001c00deff5affe3ff16000800d4ffeeff1b0081ffd2ff
00001400e4ff1e00f7ff96ff3600d9ffe9ff2700070019001d00ecff06000b000200f4ff07000500f0ff0500d7fff9ffd6ff1700e4ff1400dbffd0ffd4fff1ff
0600feff1700f8ff1100cdff0b00daff010009002f001800bfff110005000c00d2ff17001700ffff10000700430059ffd2ff0900ccff23ff2100e2ff54003600
adffd5ffccff0e00a7ff7dff59000a004c001c0024000800edff0f00f9fff8ff0800f5ff09001d000f00d0fff1fffaffe9fffeffebffd1ffcaff0000defffcff
2b001300f9ff1700dbffeaff080002001b00d1ff0000b2ffe7ffdeffe1ffe8ffdffffaff0600b5ff1500f4ffd8fffdffcfff2b00f4ffa2ff0100f5ff97fea6ff
c7fff2ff1000fffff4ffdfffe2ff05002b00ecffb0ff1f009bffd9ffd5ffc7ffe5fff4fff7ff1100eeff07000d00e5ff7f0002000a00d5ffebff1700f0ffdeff
0100d5ff320013000f00faff0b0098fff9ffd9ff0000fffffcff0d002100fbffe3ff0d0038ff2e00f3fe1d0004001000020005fffaff1700dfffffff0b001100
0e00b4fff9ffc2ff1700cbff0e001300cffff5ff55ff0800ebffe2ff95ff0000d1ff05001b000f002700e7fff2ffcaffdafff0ffd1fff6fff4ff1800edff1f00
f2ff2600d7ffacfff6ff2b002300dcffefff0b002a00daff120034000d00e9fffaff1500d8ff1800f3fff8ffe1ff42ff1c002000feff1700f6ff22006cff1c00
f1fffdff0200beffedff93ff1e00f5ff020038ff1f000d0061fffaff11000d001b00ceffefff04000d000500e5ffaafff2ff0700d8ffebfff0ff0600daff0f00
edffeeff0a00040023002c001600eefff7ff0e0003000f0042ff060016000800f7ff0800c5ff0800210008005dff4aff04001800caff4fff2300f9ffebff0e00
bbffc8fff3fffaff1e0087ffe0fffdff0a001f00f0fffcff0c002600010004000e00f0ff180013000d00deff0b00e0fff7ffdcfff5ffffff00001200d2fffaff
fcffe9ff20000900e8ff0000160025000700e6ff1b00b7ffeaffecffd6ff2500d1ff0400eaffaaff0100d0ffe2fff7ff11001500eaff0dffeaff0600edffacff
caffe3fffbff0d00b7ffddfff3ff21002c00f7ffb8ff2e002200e4ffaeffcdff1000e9ff10001200caff0b001a00fcff69001f00f8ffe4ffd2ff1700f9ffe9ff
f1fff7ff44001d001100d1ff010099ffecffcbffe9ffebfff4ff0700ceffe6ffdcff090084ff1100aeff1100f3ffdefffdff1900e2fff6ffe3ffe1ff1c000d00
01001b00080006001800d8ff1b00f7ffcdfff2ff2c000100f3ffefffa3ffdeffcaff080033001100dbffebffedfff1ff82ff220013001900eeff230005000600
f8ff04001100eeffe8ff25001700e0ff38000f00f5ffe5ff0400fdfffdffeeff90ff0400d0ff2c001200e9ffbfff50ff1b001700eeff1000ceff260071ff0d00
edfffdff0b006bffd5ff9eff0d00dfff0f00e8fff2ff140098ffeeff080008001800f1ffcafff3ff270010001d0090ff0e001a00dfff1700f0fff0ffd6ffdeff
0500ecff15000400010011001200d9fffcff0800f7ff0f0048fff0ff080014000d00240008000f000900eeff6aff35ffc8fff1ffbcff22ff56ffe8ffeefffeff
d4ffeaff000061ffeeff81fff2fffffff5ff29000c000f0007002400ffff1b002500edff13001000d7ffecff0b001b00fdffddffbafffeffd3ff0c00e3fff2ff
efffdcff0d003400d8ffeeffdeff0e000b00e4ff0c00d7fff0fff3fff2ff0900c4ffeaff0200b6ff13001200d4ffe1fffbff0c00e6ff5cffefff0f00daff46ff
bfff76ffefff2600b0ffe5fff6ff11002300e6ffa8ff1d002200f3ffcbffd0fffcfff9ff1c002e00edffe9ff100015006f000100e6ff0a00f8ff1500ddfff9ff
faffeaff3f0025ff09000800e6ff8cfff3ffd9ffadfff4ff04000f000300f8ff1c00edff5afffcffa2ff0500eeff0000ffff2a00aeffc0ffcaffe3ff2b00f5ff
05000d000100d8ff1200d9fffeff0200daffddff0000cdfff8ff150097ff0100b8ff1b00e9ff1600d7ffe8ffeffff9fff2ff08002c00f8ffefff1400f0ff0000
2e0009000200e4ffe8ff200007ffefffd8ff18000c00e5ffe4fff1ff2800e5ffb1ff0c00e3fff0ff16000b00d4ff56ffebff09000500faffdfff2b008bfffaff
f0ff0000faff2a0005009dff2200eafff7ff0c00000014002500fbff0a000500ffff3800faffeafffaff0f00e8fffffffcff0300d8ff0f00ddfffaffd6ffe0ff
3500f8ff0e00eeff2a000b000300f3ff00000900efff1200daff0200fdff1f00faff25000500ffff0000dcff410051ff1c00d8ffbfff35ff1c00c9ff4e00eeff
5dffceffc7ff0100e0ff7bfffffffbff100006003a00080004000a00f1ff0e00f4fffbff16001f00eeffefffe7ffebffe5fff8ffdaffe4ffdefffbfff0ffb1ff
fcffe4ffd7fffeffdffff9ffeaffe9ff1100b1ffd3ffa9ffe6fffaffe8fffeffccffe2fffcffb4ff2600efffedffdcffe1ff2100e6ff9bfff7ff0f00b7ffa5ff
c7ff070011000800edff0500ecff0f002700eaffacff1800a3fffeffd5ffd1ffcfff0b00e8ff2200d9ffe0ff0700ecff7a00f4fff9ff0200d2ff1000f0fff4ff
eaffe5ff39001a000800feff0c0093ff0000deff1b00f8ffffff0c00000020001f001b0089ff1c0060ffebff0000c2fff5ff0b00affffbffccffeaff1a00f3ff
c1ffd1fff3ffbcff1d00f3fffafffaffd1ff21005dffd9fff2fffaff93fffaffb6ff0e0002001700e7ffe7ffe5ffdeffe9ff0d00c6ffe5ff0300c8ffdaff2100
c1fffaff0f00e8fffbff28000f00eaffe5fff3fff9fff3fff2ff13001400e3ff1f001100d7ff0e000600f1ffc6ff4aff0f000b00e7ffeeffe9ff2000acff0c00
e8fff6ff3100a0ffe1ff94ff2800d9ff0a00c2fff6ff13004efff4ff1100dcffffffe9fff1ffdeffecff0f00eaffa0ff02000100e7fffdfffffff1ffd3ff1000
e5ffdbff07000d000a0005000800c8fffcfffffffdff0e0018ffe2fff8ff1700fcff2c00f6ff12001300010067ff4bffe1fff5ffc7ff29ff9fffdbffe9fff1ff
bcffbeff0200f7fff5ff87ffe0fff8fffbff1b00cbff0f0000000d00e3ff33001500ecff17001700f3ffe7ff1e00f0ff0d00eeffe9ff0300f8fffefff1ff0700
d3ffe1ff00003000cdfff1ffddff0e000e00c4ff100085ffe3ffe7ffe0fffcffcafff2fffbffbaff0f000700daffe8ffeeff0900d9ff6cffabff130080ff33ff
c2ff0400f3ff1d0063ff0100e0ff10002600e5ffb3ff3b001c00e5ffcfffc7ff0f00eaffe3ff21000200f7ff0e00e3ff7e00ffffe5ff000005001600d1ff0100
f6ffecff39000700fcff1f00ffff95fff5ffcbff84fffeff0700fcffe7fffdff1000160078ff0500abff17000700f0ff01001e00bdffd7ffc8ffd8ff2b00f3ff
fcff1800f8ff00001a00daff0500e3ffcfffdeff1a00e2fff1fff8ff8fff0b00c1ff1300ebff0700dcffe5ffe5ffd3ffe9ff19001700f2ffe4ff0600cefff4ff
1c00f9ff0400dcffeeff2300fffef6ffe2ffeaff0700f4ffddff0f000800e5ffdfff0b00dbffdfff1a000c00ccff4fffe0ff05000d000200edff240087ffffff
f7ffedfffcff3d000a0095ff2800e0ffe5ff310002000e002300e6ff00001900f1ff1400ffff1300f2ff0c00d8fff5fff7ff0000e4ff0e00e6ffe7ffd0ffe7ff
2a00feff0100e8ff2e00b6ff2500d9ffe9ff0b00fafffdffd1fffefffcff130002002600feff03001d00dbff460051ffdaffe3ffc4ff37ff1400deff5100e3ff
cbffd9ffd9fffdffb0ff85fffefff2ff3b00010032000900eefffcffeefff8ffd9ffeeff1b002000fbffdafff4ff1500d6fff2ffffffe2ffe4ff0000eefffbff
0100f4ffedff2d00d5ffdfffebffe8ff1800d3ff1300b9fff6fff7ffe4ff0000dffffafffeffb3ff0e00dbffebff0000deff2a00d5ffabfff6ff000044ffa7ff
ceff0500f1ff0900fefff5ffefff12002300f5ffb6ff1c00a6fff8ffcaffc1fffdff0700ecff1600f8ff04000000f2ff7e00fcfffffff3ff010013001400fcff
f1fff4ff3b00210006000d000d008dfff4ff74ff00000e0006000700f0ff0e000000140086ff1100f7fe0600fcffc3fff5ffffffdefff7ffd0ffdeff1800ffff
deffd3ffdcff9bff1900d9ff04000300c7fffeff82ffecffe0fff4ff93fffbffc7ff07000e002000fcffd8ffe4ffe4ffebff0600e0ffdaffeeff0600e9ff2e00
c8ff07000000dffff6ff2d001800e9ffe3ffceff0100e2ffe8ff14001900effff1ff1400ccff070000000000d0ff42ff1a00fbfff9ff0000f5ff1d009dff0200
e9fffeff220092ff000096ff1e00e9ff0000f3ff53ff05006fffd8ff160000001f00e2ffe9ff000001001900eeff9dfff0ff1500e6fff2ff0000e2ffd3ff0300
f7ffe6ff0300fcfffbffdfff1400ffff0b0002001400100010fffcffebff0700f9ff3000010004000000edff63ff4bffedfff1ffc8ff4bff98fff3ffe1ffd8ff
c8ffc8ffedff0e0003008cffdafff3fff9fffcfff6fffeff04000800e5ff27001b00efff1e001700e7ffecff1500f3ff0000f5fffbfffdff0b000200f1ff0000
eeffc9ff14001e00ccffeefffaff0300100068ff1700d0ffdfffebffe6fff5ffe0fff9fff5ffbcfff2ffe9ffedfff6fff2ff2c00f1ff6afffaff0600e0ff3aff
c2ffb9ffecff01006afffcffdcfff9ff2600e3ffbaff4c001e00eaffd9ffc3fff9fff3ff1f001300edff03000400f5ff6f0011000e000500f9ff1500bdfff9ff
eeffd3ff3600280002001200f0ff92fffbffceffe7ff060004000700e4ffebfff8ff1c0077fffeffafff19000200c1ffedff2300e6ffe7ffd7ffdeff2200f6ff
0b001800f5fffeff1900efff10001900ceffecff1900d9fff1fff2ff8bff0e00d0ff1400f7ff1d00deffd1ffdbffdbfffaff100019001200e8ff1800f5ff8dff
18000e00bcffe9ffddff270007ffe5fff0ffeeffd6ffddffddff06000800dcff0e000d00a4ff000011000c00d2ff56ffdbff01000d00f3fff0ff1a00a6fff8ff
f8ffe1ffbcff3100f9ff98ff3500ddffd1ff2200c4ffffff1000e5ff0c001700faff2000fefff4ffeaff0600d5fffbfff8ff2200e2fffcffe2ffffffd6ffd0ff
0b00feff0f00f4ff2900d1ffffffd0ffffff0e0012001200b7ff1f00e8ff0d00110021001e0004000900e1ff43007affeefffbffc4ff35ff0f0009004f001800
c6ffc1ffcbfffbfffcff92fff9ff0b001a00f1ff2300faffe6fff7fff5ff13001100f2ff0d001f00e2ffadffd0ffe2ffdeffd4fff5ffd8ffc8fffeffe5ffe6ff
f1fffbff00001800d6fffdfff3fff3ff4900ccffffffd4ffe4ffe5ffe0fffeffdcfff2fffeffb4fffafff2fffbfff3fff4ff3a00ddffa4ff0000030070ff99ff
c8ffffff2600fcfff5fff3ffecff26002300e6ffacff1100a1ffe5ffd9ffc1fff6ff0700ebff2100e8fffdff0a0014008800ffff1900fbffeeff1400e9ffd7ff
f3ffeaff2e0018000400fdff150095ff0000c1fffffffafffbff0800ccff1500e8ff090064ff1f00f2fe0500f4fff4fffcfff6fff6ff0c00dcfffeff2100f2ff
fcffd7fff4ffd2ff1600d3ff1a000600c8fff8ff56ffeeffedfffdff90ff0600c5ff12001f0012000000f2ffe5ffd1fff9ff0300c1fffaffe7ff1500e0ff0d00
dcffedffe4ffe1fffcff27001600deff1d00d9fffbffd9ffe7ff2100faffe2fff4ff0700dbff06001c000300beff55ff1d0015000900efffe5ff1e0093ff1500
e5ffebff08008dfff3ffa5ff2e00f7ff000017fffdff0c0054fff2ff1a00afff0200dafff1ff04000200ffffebff90fff1ff0d00e9ff1000feffdfffd9fffdff
efffebff0000f6ff1700c5ff1500d9fff4ff070008000e002cffe7ffefff0900f0ff20001000f9ff0100faff78ff2dfff9fff4ffc0ff38ffdcfff0fff6ff1300
bfffe1ffdcff0000fdff7afff6ffddfffeff0e00e5fff0fffbff0e00e3ff00000a00f6ff15000c00edffdaff0900e5ff0200ebfffaffe6ff02000900f0fff0ff
e3ffe0ff13003200e2ffedfff7ff0c00f7ffddff1100c5ffecffdaffdfff1000d1fff5ffebffbbff0700e5fff3ff0000feff3700d6ff72ffb3fff8ffe3ff9bff
c7ffdfffedff0d0069ffeefff0ff15003200f5ffadff2c001c00acffc4ffc1ff0300d2ff9300250001000c000a00feff73000f000400e1ffdeff1300e5ffe2ff
f5ffeaff34001e000500f7ffe4ff95fff9ffe0ffe1ff0200fdff0500c8ffbfffe0ff110059ff2300b1ff0d00f1ffecffceffc0ffe3ffeaffdcffd9ff1b00fcff
000009000100e8ff1a00d2ff11000600d5ffe4ff08000c00eaffe9ff8bff0c00c1fffcff95ff1b00e3ffd9ffe0ffe1ffe4ff02002a00e4fffaff1300caffe1ff
3a001e00d5ffdcffd1ff2b0049ffccffeaffcbff1500e6ffffff0e001c00d7fff1ff1900d6ff0800edff1b00ddff50fffeff0b000c00d4ffe2ff260070ffdaff
05000700cbff2000eaff99ff1b00c9fffbff36002700f4ff0e00fbff080018000500e4fff4ff0300fbff2d00dbfff8ffe4ff0c00e9ff1800dcffe6ffd9fff4ff
0f00080017000d001000e0ff0b00ebfff0ff1800ffff0d00cbff0b000c001400e3ff1b001b00fbff0a00faff3a0054ffeeff0000b9ff23ff0800feff53001600
dbffe3ffc7ff100079ff7ffffbff00001f00fdff0c00d3ffecff1a00f9ff0400fbfff3ff0a001e00f9ffe9ff06000000dafff7ffe1ffbfffe3ff0500c0fff3ff
1f00f7ff0800f8ffd1ffe8fffefff0ff0900f9fffbffd8ffefffe2ffdeffdeffddffe7fffbffc4ff2000e8ffd8fff6ffe5ff2700cbff8dff0e00eaffcfffa5ff
c9ffe9fff9ff0400efff0600e5ff2d002400ecffb1ff1d00a8ffc9ffdaffc3ffd8ff0400f1ff3200faff0100fdff19007200f5ff0c000c00e8ff1100fdffd8ff
f4ffeaff3b00250001000a001d0094ffe9ffd1ff0100fbffefff06003e000a00d6ff0b0035ff0e000eff1500ceff1900f5fffefefbff1a00e2ffd6ff24000b00
ffffd2ff3a00e0ff1d00c8ff1c001700c7fff9ffb3ff0b00f1fff9ffa4ff1600d3ff0b0002000e002a00f3fff5ffe0ffcefffeffc7ff0400f5ffc1fff7ff3100
efff07000e00f8ffefff3500d8ff0000f6fff8ff0600f3fff2ff12001b00c5ffe9ff0300d3ff110014001700d4ff18ffd0ff24000f002200e1ff3100efff1800
1e00efff0000f2ffd4ff4eff2b00fcfffaff2300f1ff1100f4fffeff1300dcff0d00efffffff1600dcff0400f0ffd1ff24001400dfff3e00ccffebffcafff3ff
1200f5ffffff3a0011002600edff020008000d00feff1300070009001e0002000a0041000e0065000b00e7ffb9fff7fff5ff0c0097ff26ff1400e2ff0f001a00
ccffd8fff1ff1700f8ffd7ffdeff1a00f4ff0c00f8ff2300feff0600f5ff0e0011001a00f2ff34000000d4ff1e000800e0ffdcfffdfffafff3fff9ffe3ffeaff
0400f9ff0d001f00c4ff0f000400f3ff0f00cfff1900c6ffeefffdffdfff0900dbfff7fffbff92ff1d00efffc2ffe3ffebff4200f8ffa6ffefff0a00f1ffe6ff
fdfff7fff3ff1000cfff0a00d8ff31002400e4ffabff02008fffe1fff9ffb1fff7ff0300e5ff0d00f4ff00002200fcffa300060011001500f0ff2d00e9ff2300
fefff9ff040086ffe6ff130008005afff0ffc5fffaff16001c00d9ffddff0600f7ff140009001600fbff1e00ceff0e00daff7afec9fffcffd4ff01000d000900
1f000300e7ffe8ff1a00ddff0e00f3ffb7fffefff3ff1200fafffaff7bff0c00d6ff1000f6ff1d00eeff070045ff0500faff1800f6ffefffc3ff1100f8ff1000
f1ff05001400f5ffecff3400deff0b00fafff8ff08000200f0ff15002100c6ffecff0900ddff130021002000d2ff1fffccff24000a001a00deff3000eeff1500
2200f2ff0600f8ffd4ff4aff30000000f7ff1e00ebff1800fbfffcff0c00e1ff1100e9ffffff0000e1ff0c00fcffd5ff13001a00ddfffaffc9ffffffcffff9ff
0e00fbff0200250012002d00d7ff19000e001300f5ff120009000c0011000300130046000c0027000a00e8ffb6fffefff5ff0a009bff2efffcffddff0f001a00
f7ffd7fffaff1d00f7ffd8ffddff1c00fcff0c00faff6e0001000900f8ff18001100fffffdff39000a00eeff1a000700f6ffddff0700fafff5ffeffff1ffeaff
050000000d000a00d5ff0d000800fcff1000d3ff1900ccffeefffbffdcff0200e0fffafffaff8aff2900faffc5ffe1fff6ff3f000a00a9fff6ff0700eeffe2ff
fffff2fffcff030088ff0800dfff32002300e4ff9bff000092ffc9fffeffb3ff01000b00e6ff1800eeff05001f0000009800080017001400ffff2500e8ff2800
fdfff7ff00007dffedff150006005afff3ffcaffeeff1b0025000200f4fff9ff0c00000004003300f0ff2800d7ff2000e5ffb4ffc8ff0000d5ff0b0015000000
1b000000e9fff4ff2000d7ff09000000b9ff0100f2ff2a00fcff00007dff0e00d3ff1700fdff1800fbff000026ff170005001a00fdffe5ffd3ff1200f7ff0c00
f2ff09001300f3ffedff2e00daff0d00f8fffcff0900f2fffdff0d002700c7fff1ff0700d0ff140011001000d4ff1effd2ff20000b001700d7ff2d00f1ff0b00
2500f7ff0900f5ffd4ff4aff2900f8fff4ff2300e8ff0700f6fff8ff0d00e7ff1f00f1ffffff1b000e001200f1ffcfff10000f00dfffdfffccffe9ffc9fffcff
0f000000d6ff100010002400fdfffaff05000f00fefffbff0c000f000700fdff2f003c000c001b000700edfff5fff9fffcff080097ff35ff0800e4ff14001e00
d3ffddfffcff1200f4ffd1ffe0ff1a00fbff090009002500ffff0500f5ff0d001200fdffffff3b00fdffe0ff19001a00c9fff1fffffff4fffaffefffe4ffeaff
0400fcff17002b00d8ff03000500f6ff1600caff1500fcff0000ffffddfff7ffdffff4ff0a0095ff3300f4ffc7ffdffff6ff3c000600a9fff2ff0100fdffdcff
0000efff12001800d1ff0e00e0ff2f002800e1ff9aff110099ffe7ff0000b4ffffff0800e7ff1900f3ff04001d00ffff9f0006000f000900f2ff2200eaff6b00
0200f8fffcff82ffecff1100010059ffe2ffceff0000190021002e00e4ff0500ffff0d00feff2200efff3800d6ff0b00e8ff87ffc5fffdffd4ff080000000a00
17000300ebffebff1f00dcff0a000000b9ff0200fdff2200f9fffcff7bff0700d5ff1100f8ff1c00f9ff09003bff0a00f8ff19001400f9ffd4ff0e00f9ff1900
f7ff01000d00fcffe9ff2800deff0500180000000900f9ffedff14001000c3fff6ff0700daff0c0012000600dfff21ffd2ff1f0015001000dbff3200f9fffcff
2a00f4ff0600eeffdbff48ff25001900efff1200f7ff1600f2ff02000c00e6ff15001700fcff1300dbff1700fbffd1ff0d001900dfff0e00cffff1ffcaff0000
16000f00fdff150011001f000000f9ff0900f4ffffff1500080003000400fbff1e0027000b0017000800e8ffe3fff9ff0200020095ff33ff1a00eaff12001900
ceffd3fff3ff1300f4ffd7ffe2ff1a00fcff0a0000001e0004001a00f6ff06000a00000001003a000900efff17000e00c3ffe8ff0100f7fffdfff0ffeaffe3ff
1200fdff06001b00d9ff11000a0007001900e1ff1000d2fff5fffbffd3ffe1ffdefff8ff040084ff0900f8ffcbffe0ff28003b0007009bffeafffcffebffe1ff
0000f5fffcff0f00deff1100daff2c002600dfff95ff0d0098ffe2fff6ffbbfffaff1000e7ff1700ecfffcff1d0004009e00270015001100e1ff2400f6ff2000
0400f6fffeff80ffe5ff080008005affeefffcfffeff1b0021002b00edff0a000000180001001400f9ff3200d4ff0800e8ff7effc3fffdffd7ff080003000d00
0e00f5ffefffeaff2100d4fff9ff0000b6ff0100f8ff1c00f7fff4ff7aff0100daff1600faff1f00040006001afffdfff9ff1400f9fff3ffd7ff100000000a00
1c001100fbfff7ffeaff2300ddfffbfff8fffdff1600f6ff08001b001100c8fff6ff0000e1ff07000a000100d2ff1dffe0ff1c0004000c00e2ff3200f5ff0a00
2b00ecff0900f0ffe0ff49ff220000000000130000001500f3ffffff1800dcff0d00f8fffeff0e00daff1600f9ffcfff0d001e00e0ff4100cffff0ffcafffdff
18000600ffff11000e002500fffffaff05000d00fdff14001b00ddff0a00f2ff120020000a0018001d00ecffcafff7fffaff070094ff24ff1c00efff17001b00
d1ffd2ff00001100efffd4ffeaff1600feff1400fcff1f000c000000000016000c00040005003700feffd7ff07000500bbffd9ff0200fbfffeffebffdeffe1ff
0300010005001f00dbff120005001700100006001400d7fff4fffeffdffffdffd3fffeff000013ff1a00f5ffcfffdeffeaff3b0008009effe6fff2ff0400dfff
0100fbffffff0d00d4ff0e00d4ff2d002c00dfff94ff17009affe4fff5ffbefff6ff0e00e7ff1800f8ffffff15000200a000090013000500e1ff2400eeff1f00
0400f5fff8ff85ffe3ff0d00010059ffedffd6fffcff69001e001a00eaff030006002200f7ff1900f8ff2300dfff0d00dfff78ffc6ff0400d6ff070000000900
1b00f9fff7ffedff2200e1ffffff0a00b3ff0900ffff2100fffff5ff78fffbffd2ff1500faff1f000300faff2aff0200f3ff1500fafff7ffd9ff1400ffff1d00
f0ff0000f4fff5fff2ff2a00d5fff9fff9ffffff1200f1fffdff01001d00bfffeffff8ff0300060014000c00dcff1cffd8ff3d0002001500dfff3000f5ff0f00
1e00f4fff6fff4ffdbff45ff2d00f9fffefff8ff0500f9fff2ff0200f2ffebff0600f0fff8ff1300dfff13001100d4ff0c001000e1ff1000d0fff1ffcbff0200
1d00f6ffffff1200120022000000f9ff15000c00050010000f0000000900fcff12003a00070019002600e7ffc1fff8ff04000e0097ff2fff1b00e9ff13002500
d0ffdbfff3ff1200eaffd6ffe1ff110000000d00f8ff1b000500fdfffbff0900feff0200f4ff3b000b00deff1c000400c3ffecfffffff9ff0900f2ffdfffe2ff
0200020005001e00e1ff1100000006000f00d4ff0f00cffffbfff6ffdfff0600d4fffcfffdff35ff3200f5ffc8ffe2fff3ff4700f9ff9fffebffeeff0100ddff
fefff5fff8ff0c00d6ff1000d2ff2f002b00e7ff9cff000098ffe7ffeeffc0fffcfffcffe5ff0c00f2fff4ff1f00f8ff9f000b0062001800e3ff2500fcff1b00
0500f7fffdff90ffc5ff070007005afff7ffcafffaff1d0016001500ffff0500feff0b0000002800f1ff0800cdff0000d8ff76ffc3fffaffd6fffeff0a000900
1100f7fff1ffebff1f00cdff0e000100b0ff0700faff2800fafff7ff7bfff1ffd0ff3f00fbff1e000000faff22fff7fff2ff0c00f8fff7ffd1ff0f000200feff
fcff1300e5fff8fff1ff3200d8ffebfffcff03002000f3fffcff9eff1700befff4ff0200d5fff0ff00001400f6ff28ffecfffaff02002600dfff2e00f3ff1b00
2300edff0b00e0ffe3ff46ff3000ebff040010000b002400f6ff02001200f9ff0b00f8fffbff0e00e7ff29001000d1ff0f000100dcff0600c9ff0100ccff2300
1f00fdff10001100240025000e00f1ff0000180005001500050004000200feff00004300ecff19000b00e9ffcdfffcff05000700a0ff2bff2400efff17002100
d0ffd7fff4ff1700ecffd9ffd9ff1a00f6ff0700f5ff1d000700120001001200deff0000feff3d000000dfff18000d00cdffe9ff000000001c00f2ffe0ffebff
0e00160006001b00ddff1a001900faff0600ceff1f00cfff05000900ddff0b00cfffdefff3ff79ff0d00f6ffcdffe1ffedff0100e6ffa2fffeffe3ffffffdbff
0000fffff9ff1d0089ff1100daff28002b00e6ff9aff0e0094ffe6ff0300bdfffefffcffe9ff1300f1fff6ff1c00fbff9400070019000b00deff2000f9ff1e00
1500efffffffbfff72ff0e00030059fffdffc2fffeff140018001b00deff0900f2ff170003000e00edff1900c7ff1900d6ff70ffcfff0800d0ff11001a001100
05000c000000ecff1a00d8fff8ff0300abff040003002700ecfff7ff80fffcffdaff1d00fbff1600f9fffdff1cfff2ffeeff2f00eefff9ffd0ff190019001900
ebff0a00f2fffbfff4ff3c00d0fff1fff8ff00000e00f9fffdff25001700bbfff2ff0900d3fffbff16001d00d7ff2affe5ff010007001e00e0ff3200f3ff1a00
1c00eeff0100eeffe2ff48ff3000f5ff0000130009000b00f6ff02000800daff0500f1ffe5ff1d00e5ff1900fdffd2ff11000300daff1200c8ffe8ffd0ff0900
1c00f1ff0d000e00140033000800f1ff010018000600170009000300fdff000007003a000800190016000900fcfffbffffff09009eff2bff1e00e9ff13000e00
d1ffe4ffe9ff3100efffd6ffd2ff1600f7ff0d00f3ff15000300130000000a00edffffffecff3f001200f1ff1e000c00c7ffe9ff0400f8ff1b00f8ffddffe6ff
060026000c001300ddff1d001e00f9ff0b00cdff1c00cdff03000100e0ff0c00d7ff0700fcff7eff2300f2ffc1ffe4ffe4ff0100e9ff9efff1fff3fffcffe4ff
ffff0000f7ff170079ff0d00d4ffe2ff2700e9ffa8ff0a0091ffe9fffaffbcfff9fff2ffe4ff0f00e8ff06001a000f009900020013002200d8ff2900f1ff1600
f1ffe9ff030086fe7800110025005eff0000c4ff0200140019002800eeff0d00f4ff0600fcff1600f2ff1d00bdff0c00d6ff82ff8eff2000d6ff020025005800
14000600f3ffefff1a00d3ff1a00fdffb1ff000002002900eafff2ff82ff0a00d0ff1400ffff1700f8fffdff29ffeffff0ff1f00f4fffbffc5ff15002d000f00
e7ff00001800f4ffecff2b00dafff7fff4ffecff01000300fdff17002a00cbffe6fffcffd4ff18001b001500bcff23ffe7ff1f0009000f00d7ff2f00f4ff1000
1e00f2ff0c00f4ffc9ff50ff3100f6ff02001100e6ff0d00f8fff3ff0900e7ff1100ebfff6ff1d0005000e00f0ffd6ff0e001500ddffeaffc2ffe6ffc1fff8ff
0c00f2ff02003e001f001f00e0fffcff00000800f6ff1b0012001900170004001900390002006e000c00eaff9cfffdffffff0a009eff10ff0c00dbff10000900
c6ffd7fff2ff1800f8ffdbffe0ff1600f6ff0c00fcff1d0005000b00f0ff19001300140002003500fbffdeff14000d000600d9fffcff0000f9ffebffefffefff
0200f9ff07002800b0ff14000700f4ff1300bfff1c00bafff1ff0600dcfffeffd8fff9fff1ff8cff2700edffb6ffe2ffe7ff3a00f3ffa2fffdff0800f1ffe3ff
0100f8fff7ff2200e3ff1a00dcff29002600deffa1ff110096ffe7ff0100b6fffcff0900e1ff2100eafff1ff2500ffff9c00020006001000feff2800f6ff1b00
0600effffbff320002000900070059ffe6ffc4ff00000d001c00f1ffebff0300f8ff040004002100fdff2700d8ff0c00ceff16ffc7ff0000d8ff0c000e000600
13000000e4ffe8ff1f00eaff0d00ffffb7fffafff2ff2a00fcff020084ff0900cbff2000f9ff2500edff0b0057ff0e0001001700fbfff9ffc3ff0c00ebff0800
efff0d001f00efffedff2e00d2ff0900f5fff1ff0000fefffdff13002a00cbffecff0300d1ff190028001300b2ff1cffe5ff1b0013002000e0ff2a00f0ff1e00
2200f4ff0d000000daff4fff32000f00f5ff1500edff1700f2fff4ff0c00ddff1500fffff7fffdff10000700f8ffd6ff32001900deffcdffc9ffebffc0fff4ff
0a00fdff0400240026002d00cbff0d0006000d00fcff23000d00140003000e001a003d000f0021000f00e8ff99ff0200f9ff03009cfffffe1500dcff14001100
efffd4fff4ff1500f8ffdbffe3ff2300feff0800f7ff610003000500eeff1a001000fbff030039000b00efff16000700faffd3ff0300d5fff5ffeefff3ffe9ff
0800fcff0c002400dbff1400100006001100c6ff1f00befff3fffcffdbff1300e2fff7fffbff8aff2000f5ffbfffe7ffe4ff3800feffa8ffebff0c00ebffe7ff
0000f7fff7ff0b00ecff0f00e7ff25002900dcff9cff0e0095ffcfff0000b8fff9ff1b00deff2500e1fff4ff1d00ffff9e0009000c001000fcff2a00e2ff1f00
0200effffbff2b0005000a0005005bffe2ffc7fff8ff11001b003f00fafff3ff03000e0007001b00fdff3100e6ff1100e3ff3d00ccfffcffd7ff09000c000900
11000d00e9ffedff1c00d7ff09000100bbfffafff7ff2e00f3ff000081ff0e00cbff1c00f7ff1f00f9fff5ff3fff1400f9ff0d00f8ffeaffd0ff1100f1ff1400
edff10001c000500efff2600d7ff1000fbfff0ff0700e8ff030010002c00c5fff4ff0800d2ff150028000f00c3ff24ffebff1a0010001c00daff3100f3ff0d00
2600f5ff0e00f4ffd4ff4eff2400e9fff3ff1400f3ff1500f5fffbff0e00eaff2800f9ffefff1d0035000300f0ffd6ff0e003600dfff5100ccffdcffc7fffeff
1d000300eaff0b0025002900f3fff7ff1200f6ff0000faff08000b0006000a0004002f000c0016001300d9ff9eff0000010009009aff2afffaffeaff15001c00
c8ffd5fffeff1700f6ffd6ffdfff1a00f8ff110009001d000c000300ebff11001200f9ff01003f000a00e8ff1a001900d0ffebff0100ebfffbfff0fff0ffe3ff
0300f6ff0c002600d6ff1200090000001300c7ff1600f2fff5ff0000dffffaffdcfffdff050092ff3100fbffc8ffe4ffedff37000000a7fff1ff03000500e1ff
0000f5ff12002700e7ff2500e1ff23003100dcff95ff0a009dfff0ff0400b7fffbff0f00e4ff2800eeffe8ff1e0004009d00080014000c00ebff2600e8ff5a00
0d00f4fffcff21000000090006005dffdcffc9fffeff140016003700e6ff0600ffff200003001d00fdff2800ddfff6ffe4fffeffc8ffffffdcff0a000d000a00
0e000200e8ffebff1e00e1ff0d000700bfff0000f9ff1d00fdfff9ff80ff0b00d3ff1900f5ff2100faff010025ff0600f9ff10001a00eeffdaff0e00fdff0700
f5ff05000f000000f4ff2200deff02001c00fbff0800e9ffd8ff13002200cafff6ff0b00c8ff170024000a00cdff1bfff2ff150003000b00d7ff3300fdfff0ff
2f00f8ff0a00f4ffe1ff4fff21001200f0ff1a00f7ff0d00f6fffeff0700e1ff14001700efff1400f1ff1200ddffd3ff0a000900e1ffd7ffd1ffe4ffbffffdff
17001100000013000d0028000500f3ff0d00dafffeff1b000d00090006000a0001002000090012001e00d8ffbdff0200faff010098ff37ff1900eeff1b001700
c8ffd4ffefff0f00f8ffddffe5ff1d00f1ff1800070015000d001b00f5ff1b001300fbffffff3d001000fcff1d000d00c4ffccfffdfff2ff0000e9fff0ffe8ff
1500fdff13002400d9ff11000f0001000200d5ff1900d5ffe8fffeffd9ffd7ffdafff6ff01008fff2800f7ffc6ffe4ff3c0035000700a5ffe1fffeffecffe2ff
0200f6fffdff0700e9ff1400f1ff21002f00ddff91ff1e00a1ffe6ff0600beffefff1600e5ff2800f9fff5ff1d000900a000340018001d00e5ff2600f4ff1d00
0300f1fffaff22000200040009005bffe1fff7ffffff16001d002300e8ff0200feff07000500260000003900dfff0e00e5fffaffc8ff0300dbff07000f001000
0f00f5ffe7ffe6ff2100eaff0400faffbeff0100f7ff1f00fafff5ff7dfffeffdaff0f00fcff1e000500020055fffafffbff1200ecfffaffd9ffeeffefff1400
1e001c00fdfff9fff5ff2600daffedfff9fffaff1300fbffffff11001600c8fffdff0b00e5ff0f001e000000d4ff2affe8ff1e000b001c00d8ff3200f8ff0d00
2b00e5ff1000f8ffdfff50ff23000900fdff0100fcff1300f7ff01000800e9ff0900f6ffecff1400fcff1700fbffd5ff10002b00e0ffe8ffcbffe3ffb9ff0400
210002000e000300180028000300f6ff0900f8ff02001a001c00e3ff040000000e001f00040013002300ebffbcff0600f9fffcff9aff42ff1800f7ff18001000
c3ffcffffbff1200f6ffdcffedff1b00feff0a000000130008000800f0ff16001200f9ff00003900feffe4ff0a000e00bfffcffffcfff4ff0100e7ffe8ffe1ff
f9ff05000e003000d9ff21000a0013000d0001001200c9fff6fffbffddff0600d9fffcffffff8fff1e00f3ffcbffe4fff0ff3a000000a1ffe4fff8ffffffe5ff
02000200fdff1d00edff1c00daff2a003800dcff91ff10009fffe7fffaffc0ffe2ff1000e5ff27000300e5ff200002009b00080014000b00daff2500f9ff1400
0700f0fff8ff22000100000008005cffe4ffcdfffdff540016001800efff0800fbff1d000400230003001500e1ff0500dcfff7ffcbff0c00d8ff07000b001300
1300faffedfff1ff2100eeff01000800b7ff000002001b00fdfff5ff7fff0300d4ff4e00f6ff2100f4fff6ff4ffffcfffbff0800f8fff1ffdfff0c00f7ff0e00
f5ff0200f3fffbff09002400d8fff1fff8fffdff1400ecfff6ff1e001d00c4fffaff0900040012000e001200d1ff27ffe4ff33000e001a00d1ff2f00f9ff1e00
2200f4fff4fff3ffd3ff4dff2300faff060000000c001800f6ff0200fbffe9ff06000000e3ff1600edff0d002500d3ff10000400e1fff3ffcdffe9ffbffffdff
1600f8ff09000d002f002b00fefffaff1700080002001200110005000300feff07002d00060011000a00e1ffc8ff0400fffffcff9cff2fff1a00eeff1d000c00
ccffe4ffebff0a00e5ffdcffecff180006000f00f0ff0e000700fefff5ff0d00fafff8ff070038001400efff19000f00beffe7fffcfff6ff1600f0ffe3ffe5ff
04000000fcff2600d5ff1a00170006000500d1ff1500d2ff0b000100dcff0500d5fffaffeeff68ff1900f5ffcbffebfff8ff1500f8ffa4ffecfff2ff0100e6ff
0000f8fffcff2c00e6ff1f00c8ff24003000e7ff94ff15009fffecfffbffc6ff00000000e2ff2200ccffd8ff1e000b0098000e0053002300e2ff2600efff1700
1400effffeff2d0008000200f8ff5affe8ffc6fffcff190017001a00fcff0200efff0a00feff180001003000e3ffffffdbfffeffcaffe2ffd7fffeff0d001d00
0b00f1ffedffecff2000d2ff00001100b2ff050001002900fbfff8ff7effe8ffd4ff1c00faff20000400f3ff35fff4fffcfffefff1fff6ffd5ff1200fdfffaff
f2ff2000dbff0200fdff2900c7ffe6fff2fffbff1400effff7ff21001f00c9fff2ff0c00c5fff5ffedff1a00e9ff1cff03001c00fdff1300d3ff3000f3ff1600
2400edffedffe9ffe2ff43ff3000f9fffcffffff09001200eefffefff6fff9ff0d00faff56001000f4ff1a000500d6ff05001b00e1ff0e00cafff1ffc4ff2400
2600faff09001100190029000900f5ff08000f0011001400070000000100fffff5ff3d00e9ff12002500f0ff8bff080006000500a2ff1aff1600f7ff17002b00
d0ffd5fff2ff3200f3ffd9ffdaff1f00f7ff0e00f2ff13000b00140000000e00d9fff8ff16003e000700e7ff16000800c5ffdfff0100f8ff2300f2ffe3ffeaff
0100180013002f00d4ff1c00290007000600d3ff1700c9fffeff0500d9ff0b00cdffdfffe8ff82ff1e00f5ffccffe6fff0ffd7fff5ffa7fffbfff6ff0000e2ff
fffffaffefff1200efff1800d6ff0f002c00daff9aff100096ffeaff0200c3fff8fff9ffe3ff2300e6ffe8ff1b00fcff97000e0018000b00dbff2200f4ff1e00
1e00e8fffdff4d002b0000000d005dffecffaffff9ff0a0012001700d6ff0900edff140000001100faff1300d7ff0100d2fffaffd4ff1400d6ff0c0012000e00
0000fdfff5ffe7ff1a00ddfff9ff0100a5ff09000f003200ebfff4ff83fffaffdcff1300f8ff2300f2fff6ff1cfff3fff5fff7ffe4fffdffceff120008000b00
e9ff1200f1ff000010003700c9ffe1fff4fff7ff0f00f6ff0d00e0ff1d00cdffe8ff1100ceff0c0003001700c8ff20ffeeff010007001800d8ff2d00f7ff1b00
1b00edfffaffe9ffe3ff50ff3500dcff00001c000a000100f3fff7fff0ffdcff0a00fafff9ff0d00f8ff2000f8ffcbff0c001100dfffffffc6ffdfffc5ff0100
2200f0ff09000700300019000f00f6ff0a0017000b0019001500f0fffefff7ff04003300010009001900f8ffa2ff0500f6ff0300a4ff22ff1700f0ff1c001a00
c5ffe1ffdcff1100f3ffd9ffdaff2800f0ff0c00f7ff070008000b0001000000f6fffaffffff3d001000fbff15000800d4ffe3fffcfff9ff1c00f4ffdeffe9ff
0900340012001600daff1f002200fbff0b00c3ff3e00cdff0400feffdaff0800d6ff0400e5ff8eff0a00f5ffbdffeaffe1ffe0ffebff9effefffe7ff0000ecff
fffff3ffefff2700f3ff2200d9ffa6ff2b00e3ffa3ff07009affebffebffbfffeafff9ffe3ff2100e2fff1ff1e00feff92000b0019000000deff2100f0ff0a00
f3ffcdff00002a004300080008005fffebffc4fff9ff06001a001f00f5ff0300edff1e0000000d0000001b00cafff6ffc6ff000075ff2e00d5ff04002b006600
14001300eeffd9ff1900dcff0b00ffffb4ff03000c001f00d7fff5ff85ff0000d2ff1300fcff2100fafff8ff48ffecfff8ff0d00e8ffffffc4ff130011000b00
edff0a001a00f6fff5ff2e00d4fffffff1fff5ff0700f5ff080020002100d7ffebff0200d2ff09002c001000b3ff13fff6ff18000c001f00d6ff2c00efff1400
1d00f3ff0f00fbffd4ff50ff2a0004000a002500e1ff1400f6fffcff1600d1ff1100e5ff00002900edff1600e9ffd3ff11001e00deff3f00c5ffddffc6fff3ff
0400f3fffcff35001f000f00cbff20000f000c00eefffeff14000a0009000e0016003300090067001900e9ffa0ff0100eaff0a009dff12ff0d00dfff15001a00
c5ffd9fff2ff0e00f0ffdcffdcff1c00f4ff0b0000001c0001001700dcff130018001500110038000a00cbff12000b00ffffe6fff6ffe1ff0400e7ff0500e7ff
fbfff8ff09001a00afff17000c00f5ff0f00bcff1c00c1ffedff0000dbff0f00dafff8ffe6ff8dff2200ecffc7ffdbfff5ff3200f8ffa3fff7ff0e00fbffe8ff
0200fdffefff1900e6ff1400deff2b002f00deff9bff140097ffddfffaffb7ff01001100e2ff2400faff0900210000009800170008001500feff2600f0ff1100
fdfff1fffaff1f00050015000c005cffecffaeff010010001e002100e6fff5fff9ff160007001a0002002700cfff0100ebff6fffd6ff0400dbff0c0011000a00
09000500e4ffe4ff1900e6ff0f00feffbefff1fff2ff270003001c0083ff0900cdff1100f7ff2800efff130057ff0b0001001700f7ffe8ffccff1400dbff1800
ebff0e001d00ebffeeff2c00ddff1300f7fffbff02000000f8ff1e001a00d5ffedff0800d0ff0d0027001700bdff25fffcff1a000c002000ddff2f00edff1600
2000f4ff0c000000d9ff51ff2b00ffff17001800efff1a00fafff5ff1400c8ff0800fcff00000e00eeff1300ecffd6ff12001a00dffff7ffc3fffaffc9fff9ff
c6fff8fff8ff27001a001f008eff03000e001b00faffedff0e0011000300150007002d0011001f002400e0ffa3ff0000e2ff05009cff2cff0e00e0ff14000f00
efffd8fffeff1600eeffd7ffdbff2200fdff0e0000005500f1ff1200fcff1500160001000f003c001e00e4ff04000f00e5fff0ff0500d0fff4ffeaff0b00e5ff
0000feff0e001b00d6ff12000800fbff1400c4ff1b00beffeeff0100defff1ffd8fff9fff2ff8eff1400fdffcbffe5ffebff2b00fbffa6fffbff0900e4ffe4ff
0200fdffffff1800e9ff1b00e4ff2a003100d8ff97ff12009dffabfff7ffb3fffcff1e00e1ff2900e0ff0a001d0000009900230008001200ffff2700efff0d00
0000eefffaff220007001400150058ffe4ffbcffe5ff0f001b003500010026000000220004002d00f8ff2a00e1ff0600f1ff3500d6fff2ffdaff0d0012000f00
1000feffe0ffe8ff1a00caff0f000700c1fff9ffefff1d000100070083ff0900caff1900f7ff1600f7fff7ff52ff1700feff1500fafff6ffd5ff1400e4ff0900
e8ff0c001800fffff2ff2c00d8ff1f00f6fff6ff0c00d3fff3ff17001700d5fff9ff0f00d2ff04002c001800ccff18fffeff1c000f001100d7ff2c00efff1600
2300faff1f00f8ffe0ff4bff2500eafff8ff1a00e8ff2100f6fffeff1d00eeff1e00fcfff7ff2300efff2100eaffd0ff2c000a00deffacffc5ffd8ffcafff3ff
0800f6ff7dff140011001600ebfff5ff16001200fbff8c0008001300fdff11000c002a00140016002000ecffa1ff0000f4ff100099ff1fff0200f0ff1c001600
c3ffe3ff00000f00fbffd9ffd9ff2000fdff01000b001900fdff13001c0016001a00faff17003b000e00cfff08002400dbffedff0000ebfff6ffecfff0ffe6ff
fefff7ff0d001a00d4ff20000a00fbff2100c1ff1e00f6ffe8ff0700ddffedffd9fff8fffdff9bff1800fbffcbffddff0b0030000000a2fffbff0000f5ffe5ff
0300eeff1c001700ecff2200e2ff28003200d6ff95ff1800a1ffe6fff8ffb3ff03001b00e0ff2c00f1ff06001f0000009d002e000e001600f4ff2600f6ff3a00
0100f0fffaff22000900110007005bffd8ffc3ff000010001d003300f0ffecff01001a0005002f00feff3000d5ffe6fff0ff2300d6ff0300daff0d0003000f00
00000a00f2ffe1ff1b00e2ff11000300bffffdfffcff23000100070082ff0400d7ff1300f5ff19000000030062fffffffeff170020000100e4ff1700f0ff0700
00000f000f00f8ffe4ff2800e1ff0f001d0000000c00f8ffe9ff16000b00d5fff7ff1400c8ff0d001f001000caff14fffbff1e000a000600e2ff3100f6ffebff
2900f1ff0d00f4ffe2ff4cff2400000000000d00f9ff2100f3ff04001200ddff0a001500feff1000e3ff1000f6ffd3ff08002a00deff0f00c0fff7ffc2fff2ff
18001500eeff0a0017001f00070007001c002c00ffff06001700090005000f000f002200090011001300d9ffd1ff0100fdff060095ff2eff0300f7ff16000c00
b9ffc4fff1ff0f00f4ffdbffe2ff1f0006001900050015000e00feffffff23000d00f6ff06003e001900f2ff05001200cfff02000500f8fffdffe8fff7ffe8ff
170000000e001b00d8ff29001100f5ff0200ccff1200c7ffe5ffffffd5ffbbffd4ffebfffbff8fff2800fdffd1ffe4fff8ff2d00faff9fffeefff9ffd6ffe1ff
0400e8fffcff0000e4ff1700d1ff20003600dbff96ff1d00a1ffe3fffeffb9fff7ff1400e4ff2900dcff030020000b009f00530016002c00e9ff27000d001b00
0300ebfffaff200004001000060060ffe6fffaff000013001d002000e2ffecff01002d0004001500fcff1f00caffffffeaff1300ceff0000dbff0e0019000d00
fdff0000e9ffdaff2100d7ff0d00ffffbffff1fff7ff24000200feff81ff0300d7ff4a00feff1500faff090071fff5ff02000b00f8fffeffdeff1c00ebff0f00
2f002400fafff2ffecff2800e1fff3fff3fff1ff2000ffff060020001a00d7fff6ff0f00dcff0000fcfffaffc9ff2dfff0ff140011000a00e0ff2e00f5ff1300
2a00e7ff1000eeffdfff4cff2500f0ff0e00080003002200f6ff02000b00ebff0700feff00001700e3ff1c00f8ffccff0a001600e1ff3000c2ffe9ffbefff9ff
2300fcff020007001e0017000800fbff0f001400ffff0f001c00efff070006000a001a000e0011002300eaffd1ff0200f1ff090098ff25ff2400fcff1c002f00
c1ffd5fffdff0e00f2ffd9ffeeff18000600fbfff2ff170003000f00f9ff24001000f5ff0c003b000300dbff32000900d9ffdfff0400f5ff0600e8fff4ffe0ff
f9fffcff0f001300d6ff2c0013001f000c0000001100c6fff2ff0100dcfff7ffd2ffe7fff9ff9aff0c00f1ffceffe2ff02002400faff9dfff0fff0fffcffe1ff
0500f8fffcff0e00e6ff1500d4ff21003b00d9ff95ff1300a7ffe9fffbffbfffe9ff1b00e5ff2400ecfff6ff1c0004009a00330012001200ddff2800ecff1100
0c00effff6ff27000800080005005dffeeffd2fffaff400017001200eafff7ff06001600ffff060001003600deffebffe4ff1400d1fffeffd7ff0f000c001400
fbfff9ffe8fff0ff1f00e5ff0a000d00b5fffdfffaff1f000300f9ff82ff1200cbff0900feff20000000fcff4ffff5ffffff1300f9ffedffdfff0100eaff0a00
fbff1200dffff8ffdeff2c00e1ffe9ffe9fff4ff1700f3fff8ff25001c00d2fffaff11000100f3ffe3ff1000d8ff23ffeeff25000f002700dcff2d00f3ff1000
2200f4fff5ffefffe6ff4aff290015000000eeff0f001100f8ff0100230006000100fdffeeff1500f1ff2700d5ffd3ff09001e00e4ff1900befffeffc6ff0800
2500f8ff060007001e0018000100f9ff240009000b000d0013000d000200030008002200160001001d00eeffc9ff0200eeff12009bff31ff0f00faff16001700
c5ffc3fff0ff3c00ebffdcfff3ff1700140007000100110002001000fcff0b00fbfff8ff0d003b001900f0fffbff0c00d7ffe8ff0100f3ff2100e7ffe3ffe7ff
feff0400fcff2500d9ff1300190003000800cfff1100cafff9fff7ffdeff0500caffebffe8ff7fff1f00f1ffdcffe7fffcff1900eeff99ffeeffe7fff9ffe3ff
0400fbfff8ff1d00ebff1c00e1ff0f003900deff91ff26009dffecfff2ffbfff00000700e8ff2400e7ffe2ff1b00fcff9600180032002b00dcff280007001500
1100edfff5ff3a0003000f0015005dfff2ffc9fff8ff14000f001600fcfff8fffdff2600f8ff150000001c00cfffe3ffdaff1f00c7ffccffd2ff02000c001900
efff0700ecffe5ff1f00effffbff1100b3ff0f0001001000ffffffff83fff1ffc8ff1000feff1200fffff8ff2fffeefffeff0600f2fff3ffdeff1500fcffffff
f5ff2e00d0ffffffe7ff2800dbfff5fff6ffecff2800ebfff8ff29001700d5fff6ff0900bbfff9ffaaff1a00ecff25ffedff2300ffff1500d7ff2900efff0e00
1f00f2fff7fff1ffe7ff4aff2f000000ffff100015003800f8fffaff1100f1ff1200f6ffd2ff1c00f1ff26000800d3ff0d000a00e1ff0300c3fff7ffcbff4300
130000000c00fcff3b002b000c00fdff25001a000e000f000200180003000a0001002d00eeff1c002f00f1ff8dff0100f4ff0d00a0ff1eff180000001a000d00
bdffccfff3ff0900f6ffd8ffdcff1a0002000800f3ff17000700110003001000dffff5ff0e003c000f00e7ffffff1200d9ffdeff0000f9ff1c00f0fff2ffe4ff
ffff1b001b002200d9ff1900030002000f00d7ff2800c2ffffffffffdbff0500d1ff91ffe8ff88ff1500f2ffdfffe2ffeeffd6ffe2ff9cff0100eefffeffe3ff
0000ebfffaff2300e6ff1b00e0ff08003300d6ff95ff210095ffecfff8ffc5ff04000700e5ff2a00e0ffddff2000f7ff9000170011000700ddff2500feff0c00
1300ddfffcff28000700f0ff10005effebffcbfff6ff110013001000dffff3fff3ff1f00f6ff280000001d00dbffecffdbff1a00d3ffd9ffc7ff0c0008001800
420008000100e3ff1600e8ff93ff0700afff070007002c00effff6ff83ff0c00e1ff160000001e000000f3ff30ffeffff6ff1700f2fff3ffd4ff110000000f00
ebff2100dafffeffe0ff2d00cfffe6fff5ffeaff0e00f5fff3ff15000d00d9fffbff1000c9ff6fffefff1500d7ff27ffeeff280009001500dbff2c00f4ff1600
1d00ebfffaffedffe9ff4dff330000000000060011002500f8fffcff1000d3ff0300f5ffe7ff1600f2ff2200fdffd5ff0c001500deff1600c1ffe1ffccff0a00
1f00f1ff06001200120028000700f2ff2200140016000f00140000000000fbff1200270001000c002500efff9fff0400eeff1100a0ff0fff1700f6ff0f001300
c2ffd4ffe9ff0900f7ffddffd6ff190008000e00fbff130001001600fdff0200edfff9ff050040000500fdff04000a00dcffdbff0000f6ff3300f3ffebffe6ff
0500590014002200dbff18000000fbff0a00d0ff0800baff0200fdffddff0600d5ffc1ffe2ff9dff1400f6ffddffe7ffe4ff0000e1ff9fff0900f4ffe8ffe8ff
0000f4fffeff0b00ecff1b00e3ffb1ff2c00ddff98ff250097ffeafffeffc5ff0000feffe4ff2100e2fff6ff2100fdff8f000d0013001200dbff230011000200
0100d0fffdff71ff18000f00310060ffffffcaffe8ff03001b001000e2ff0000f3ff0f00faff1400ffff1c00cbfff6ffd8ff16008bffcdffd2ff060016002500
feff0600f5ffe2ff1a00e6ff03000600b5ff03000f002800c7fff8ff85ff0a00d9ff140005001e00fdffeeff58fff1fffaff1400f3ffffffbfff1c00f5ff1400
ecff12001700fbfff4ff2c00dfff0700f7fff6ff0a00e2ffe3ff15002c00daffecff1000c5ff100021000c00b2ff1cff0200180007001200deff2a00f3ff1100
1d00f5ff1200efffd5ff4bff2700f5ff00002100d7ff2d00f1fffbff1300ecffffffe8ff00004e00e7ff0c00f7ffd4ff0b002900e3ff0600bcffeaffd9ffffff
e8ff0a00dbff49001d000b00a1fff7ff1c001600f3ff250010000600fbff07002b002c00fbff5a001700e4ffc6ff0100ecff0b009bff1eff1100d3ff14001c00
c5ffd1fff1ff1900f3ffd9ffdaff1900f2fffdff04001400f6ff1400faff1f00100008000e0037000b00c7ff18000600edffdcff0000effff3ffe3fffaffe8ff
0c00f1ff0c0019009fff1c000500fdff0600c4ff1600c1fff2ff0600e7fff7ffd8ff0200e7ff95ff0c00fbffbfffceffecff35000200a2fff0ff0900e3ffe4ff
02001000f9ff1200deff2500d8ff25003200daff99ff080092ffe0fff6ffb2fff4ff2b00e2ff1200ecff0f00230002009a000b00feff140006001f00f4ff0c00
0600ecfffaff2400060012000c005afff0ffb7ff07000d001a003200e9ff0900f0ff110006001f0004002300d8ff0100e8ff76ffdaff0700d7ff100020000600
1400f9ffdaffdfff1d00fbff10000000bcfffcfff9ff1f00fcff070082ff0b00d4ff1600fbff2400f7ff180069ff2700090017000c00a3ffbdff0e00e8ff1200
e7ff12001c00fdfff1ff2f00ddff1d00fbfffeff1200ddffcaff20001b00d6ffe4ff0c00cbff06002c001400bbff1dff0f001a000f001300e6ff2800eeff1400
2000fbff1100f1ffd8ff4cff2400fffffcff0e00f0ff1c00f6fff5ff1500e3ff0600f3fffdff2100ebff25000400cfff0c001000e5ff3e00c2ffeeffd3ff0000
64ff1600eeff21001f001b00cfff0a0018001300feff220010000600fcff12001c002a00070017001b00e7ffefff0000e0ff0d009aff25fff9ffe0ff17001b00
eeffcdfff4ff0d00fbffd3ffd5ff1f0000000300050059001e0008001f00100013000000110035001400d3ff1b000900d9ffd2ff0800eaffebffecffedffeeff
0d00feff08001600d9ff0800080010001100baff1800bdffecfffcffe5ffd3ffd2ff0000f0ff98ff0b00f7ffc6ffeaffebff3300fdffa4ffe6ff0500dfffe3ff
03001400f7ff0600dbff1a00deff24003100d8ff98ff100095ffa1fff6ffafffebff2e00deff1c00e0ff11001c00faff9d000600fdff0d00feff2000f4ff0300
0a00e2fffbff29000e001700130056ffe7ffbdffeaff06001d003600fdffe3ff0900320000002200fdff1e00edff1200fcff2300dcff0400d8ff0e001b000800
1100faffdcffdaff2200f3ff1400fbffc0ff0800f7ff1b00f7ff170081ff0a00d7ff0d00fbff1f00ffffecff5eff2300000018001800e2ffccff0f00ecff1100
e7ff1c0018000e00f7ff2f00daff2100fbfff6ff100080ffe1ff19003300d8fff1ff1800caff020021000000bcff23ff0b001a0008001100deff2900f1ff0e00
2500f3ff0f00ebffdbff49ff2200e2ffd1ff1c00f6ff1d00f3fffdff1300f6ff2000e9fffeff3e00f8ff1f00f7ffcfff0c001700e4fff5ffc2ffe1ffd8ff1100
06001a00c6ffffff22001500e8ffedff25000c00f0ff15000c000a000200130016002100040013002100dcffcffffefff0ff0b0095ff2afff6fff6ff1c003200
b7ffdffffaff0c00f9ffd3ffdfff1e00f9fff8ff15001b00edff0b00e8ff20000e00f8ff09003c000b00ddff1c002700dcffd8ff0e00f3fff1ffe5ffe8ffe7ff
2000f7ff0d001000d7ff08000d000f001c00c2ff1800f6ffeeff0c00e0ffd8ffd8ff0000f9ff9aff2000fcffd1ffe0ffddff2d000d009fff04000200efffe4ff
0500ffff2e000800e3ff2500ddff2a003100d0ff97ff090097ffedfff5ffb1fff5ff1a00d4ff2900e9ff09001a0008009b0004000e000d00eaff260002001e00
0b00eafffbff1c000a000d00080054ffd8ffc8ff050011001c002200faff06000100120003000a0004003400ddff0700efff1e00dcff0300d9ff13001a000a00
0300fbffdfffd9ff2300ebff05001100befffafffbff1900fdff010081ff0900d9ff3f00fdff2300020002005dff1f00080012002600eeffd4ff1300e6ff0800
f8ff0c0012000000e6ff2900dcff10002700f6ff0c00ecffd9ff20003100d4fff4ff1e009dff0a001300f3ffbcff16ff1300170008002600dfff2c00faff5e00
2a00f8ff0f00ecffdfff4aff2700f5ffefff1e00fdff2100f5ff00001000e5ff0c001700fbff2000ebff26000b00cbff38001c00e3ff3b00c5ffdaffd2ff0900
25001e00e5ff09001e001500eeffecff23001e0001001a001a00feff00000b0010001b0008000a002a00d6ff81ff0000eaff090094ff31ff1100edff1f001800
b9ffccfff3ff0b000000d5ffdeff1d0002000d0007001500f4fffdffe9ff1f000800f9ff08003d000f00feff1a000500d6ffe3fffdfff4fffcffe7ffebffebff
3300fdffffff0e00daffccff0b0015000300d0ff1000dbfff5ff0b00d3ffb3ffd6fff9fff9ff9cff0400f0ffd1ffe5ff2b002800fbffa0fff1fffdffd8ffdeff
03000100f8ff1600dfff2400deff23003400cfff94ff1300a0ffe9fffaffb7ffeaff1a00e3ff2e00dcff050018000400a000240013002a00eaff250010001700
1200eefff9ff280005000e00040052ffecfffbff000012001a002000dbff0700020030000300310000003a00ddff0800f1ff1c00d9fffcffdcff140013000b00
0800f7ffecffceff2200e7ff10000900baff0c00f1ff1700f3fff9ff7dff0400ddff1000fdff1f00fdfffeff6fff0200fdff0a000f00eeffdaff1b00ebff1200
34002f00f2fff6ffe8ff2800e1fffcfff6fff5ff1300f1ff080022002c00d7fffaff2200e4ff1100f9ff4c00a2ff23ffeeff1e00fdff0700ebff2900f9ff0200
2b00e6ff0a00f2ffe9ff44ff1e00f1fff9ff070001003700eeff03000f00f0ff1100f6fffeff2600edff2800faffd1ff05001f00e1ff0a00c1ffe5ffc9ff1900
23001d00fbfffeff1c0013000100fdff24001700040014001900e6ff010003001c001b000b0007000900d3ffccff0000f1ff000093ff2dff2000ffff1800fbff
c1ffbefff6ff31000800d1ffe9ff1e00faff170007000c00ffff1400f3ff1d000000f8ff0b003d002400f5fff2ff0900d9ffd8ff0200f5fffaffe4ffe6ffdeff
24000600f9ff1d00d8ff1f0015002d00000000000300c5fff9ff0200defff1ffd0ff0100f9ff89ff1300efffdaffe2ffe7ff2100fdff91ffeeffedffd6ffe1ff
0600fefffbff0d00e1ff2900caff20003700cdff9aff250099fff0fff0ffb9ffb6ff1500e6ff1f00ecfffdff1600feff9c00150012001a00d8ff260006000900
0d00edfff5ff350005000a000a0058fff5ffd0ff05003f0015001500dbff050007002600f9ff110006002400d8fffbfff2ff1a00ddfffdffd4ff0a0017000e00
0e00f2ffecffe6ff2700e7ff12001200b2ff2a0002001900f5fff4ff7fff16ffccff0e0000001400f5fff2ff6efffaff020005000e00f5ffdfff1e00d6ff1600
fcff1f00e2fff5ffe4ff2400dcfff2fff6fff1ff0b00ecfff4ff25002500d4fffbff180001001f00b7fffdffcaff1dffefff2000ecff0b00dcff2000f6ff1400
23000000fbffeeffe1ff41ff2c00fcfffefffdff13003f00f5ff080016000b001300f8fffcff1f00eeff3d003000d1ffffff1200deff0d00c0ff0600c9ff3200
17001600f3ff060041000500ffffefff360018000b001b0014000500fffff9ff25001e000c0007002300dfffa9ff0400e6ff0c0097ff2dff1600ffff1c002300
b9ffabffe6ff1100e7ffdafff5ff18001800020000001300faff0800efff1d00f4fff8ff0b003a001200070012000600dcffe1ff0300f1ff1d00e4ffdeffeeff
0900130025002f00d2ff1900150022000c00d2ff1c00c3ff04000400e5ffeaffc4fffbffedff93ff1a00f7ffd6ffe6fffcff1c00f0ffa1fffbffdcffe5ffdfff
03000000f9ff0000dcff2600e3ff14003500cdff93ff32009effeeff4dffc0fffcff0900ecff2900f4ffe7ff1600faff91000c0032002500ddff2300ffff0000
0f00e4fff4ff2f000a0010000a005afff1ffbcff0100090011001b00efff040002000d00f7ff0b0002003000d1ffe9ffddff1a00daff0000c8ff11001a001300
0200f8ffe5ffdeff2100efff00001500b1ff5100fbff2100ecfffaff80ffbfffcaff0a0001001b000600f2ff70fff1ff000012000000f1ffd7ff0c00ecfff8ff
ffff2700cbfff3ffe4ff2800cefff2ffeefff0ff1500ebfff2ff30001b00d7ff00001d00b9ff1f00d8ff0100e4ff2dffe4ff24002c001a00d7ff2500f1ff1200
2300effff1ffeaffe8ff41ff2c00e2fffaff080012002d00e7fffbff130005001100f1ffe1ff2000ecff1f000c00d5ff07002300e7ff1600c9ffefffd4ff3f00
22001400f4ff03002b0022000200eaff32001f000d001a000f001300fdff00000e002d00ffff12001300d5ff88ff0200ebff00009dff2bff1900000019001600
afffa9fff7ff09000500d6ffddff15000000fcfffbff0f00ffff1200f5ff05008efff3ff05003b000400060021001000e1ffd2fffffff8ff1800e8ffd9ffe4ff
09001300faff1c00d4ff17000c0019000e00cdff1200c2ff01000000e0fff2ffc7ff0700edff85ff1100fbffe2ffdeffe5ffdbffe3ffa4ff0f00eaffe5ffe1ff
0000f9fffeff0800e4ff2b00dfff0a003400d2ff97ff2c0091fff4fffaffc0fff7ff0400e4ff1f00f1ffe2ff2200f3ff960002000c001100d4ff210006000300
1b00edfff9ff20000400f5ff1f005effedffd3fffdff040013001800d3ff0700ffff2200f1ff060008001400d0ffefffd5ff1500d2ffefffbcff11000d000200
ebfffafffcffdeff1d00f9ff11001100acff280008002200dafff5ff83ffaaffd5ff1200feff1c000500f7ff4bfff4fff3ff0700f8fffcffd6ff2200ecff1a00
f6ff0e00d3fff1ffe2ff2c00d5fff1fff2ffe5ff1400f6ffe9ff1b001d00d6fffbff2000c2ff2d00c1ff0d00d0ff1fffdcff120003001200d8ff2700faff1200
1c00f6ffeefff0ffe9ff45ff2c00f1fff7ff0d0010002e00fcff03000f00d2ff1200f3fff1ff1d00fdff27000600d3ff17001700e8ff1000c8fff1ffdcff5400
15000600f3ff0a00280026000000e9ff28001e0012000d0011000f000800f4ff1700270014000f003000e9ffd5ff0700e9ff0100a0ff1bff1800f9ff19003300
aaffc5ffe6ff0d001000dbffe8ff1f00f5ff0e00fdff100000001100f9ff0100ceffedff04003e000300150018000600dbffdafffefffdff2900e9ffd6ffe9ff
15004e00feff1900d4ff130008000f000a00c2ff0e00afff0300ffffe6fff8ffd7ff1c00e5ff96ff1200f6ffe1ffe8ffe4fffbffddff9afffcfff2ffe1ffe7ff
02000000f4ff0700e3ff2400e8ffddff3200d6ffa0ff290096fff1fff3ffbdff0100feffe5ff1900d9fff3ff190005009300ffff08001f00deff21001000fbff
0800b2fff9ff83ff00001100130062fffdffc1fffbfffeff14001600ceff0700f4ff2800fcff090004002400c6fff1ffd2ff170098ff0c00c3ff000013001b00
16000400f6ffe5ff1e00f3ffe5fff9ffb3ff180013001e001800f8ff84ff0300dcff120006002400fbfffbff54fff6ffe9ff15000100feffc5ff200001002400
fcff00001f00fffff4ff2d00dcff2b001400fcff1400ecffe2ff1c002300e1ffefff1600bbff0b0020000d00b3ff21fff4ff17000b001f00dbff2b00f7ff1f00
1c00f7ff1300eeffe3ff4bff2300f5ff00001300edff2400f6ffedff1700e7ff1600ecffffff4c00eeff1100e7ffd0ff0a002900e1ff0e00c2ffe0ffe2ff0200
f8fff5fff2ff4c001c0016000100030008000f000200190017000100e8ff0c001f002d00000050001300dbff8eff0400f4ff040099ff0cff0000d3ff19001e00
c6ffc9ff01000f000100d8ffd6ff1400fcff15000700040012001200e0ff15000300f4ff160033001700baff18000900e9fff2ff1400f3fffdffe7ffeaffdeff
0c00f7ff0c00feffcaff0c000c00f8ff0100caff1c00b4ffecff0300e5fffaffdbff0300deff9eff1d00faffbdffb2ffd9ff32000800a5fff4ff1300f5ffe3ff
0400020016001600dbff2c00f5ff24003400d1ff9aff110090ffe6fff6ffb3ffffff2600ebff0d00ffff10001e0006009b000900ffff070007001500ebff0c00
0500e4fffaff23000c00110009005bffefffb6ff1100030022003000e5ff0700fcff1b0007002d00ffff2a00d2fffafffaff67ffdbff0b00d7ff14001c000700
1a000200e4ffd9ff1e00f2ff17000b00bbfff8ff00001d000000fcff80ff0600d5ff0700f7ff2500fdff040040ff2d00faff1900e1ff2100c1ff1500f5ff1d00
0000fdff1f000100f7ff2c00d7ff30001a00f9ff15000100e7ff1e002000deffe6ff1a00d0ff0f0028000c00b5ff18ff0500180007002300e2ff2b00f4ff1f00
2200f4ff1a00f8ffdcff4bff26000500ebfffbffebff2800f7ffe6ff1800f5ff1100ecff00000f00eeff3300e0ffd4ff0c000300e1ff1f00bdffefffe0fffeff
0d00f1fffdff25001f002200feffe3ff0d00180000001a001e00f6fffaff150018002e0003001c001e00d2ff8dff0400efff090097ff1fffecffd8ff19001200
f8ffceff0d000f00f6ffd4ffd9ff2000fbff170004003f00eeff0c00e9ff24000600f9ff100034002100daff1d000700e3ffefff1b00e2fff3ffe2ffdcffeeff
0e00f2ff14002500dbff09000d00feff0100beff1d00c3ffe9ff0f00e4ffffffd5ff0800e8ff97ff1f000000c1ffe7ffe1ff34000100a6ffebff1100d8ffe3ff
0600e9ff34001000d4ff2200fbff28003100d5ff97ff0b008affb3fff6ffabffffff2100e5ff1100ecff1700170000009b00060001000a0008001d00f5ff0800
0b00e1fff8ff18000b00100012005bffebffcdfffdff0500220030000000d9ff11001f000500220000002700e9ff0d00f7ff1500dbff0600d7ff130015000400
1600f5ffeaffdeff2100e5ff14000f00befffcff00002300f4fffbff7fff0200d7ff3400f4ff1f000700cdff23ff1b00f4ff0e00deffebffd7ff1800f0ff1f00
0600050019000500eeff2600d5ff2f002b00f4ff1c00e3fff3ff19002d00e0fff5ff2400cdff06001f001000c7ff1dff000011000e001800e1ff2700f0ff2500
2600ffff2400fdffd3ff4bff2400fcff24000f00f4ff2600f4ffeaff1400f1ff3300e6ffffff3400ebff2200dcffcfff04000a00e0fff5ffbeffceffdcff0000
0500ecffe2fffaff190022000900f6ff0f001800010018001b00f6ff0000100023002300010015001a00d8ffb5ff020002000e008fff10ffe6ffe9ff1a001400
c4ffcfff0400f9fff7ffd3ffdeff1c0002001f0012000d00f4ff1400f0ff1d00fafff1ff130031002000c6ff18003000e0ffedff0d00f3fffbffe1ffc5ffe2ff
fdffebff0c001c00d6ff03000c00f6ff0500d6ff1a00f9fff9ff0500e0fff0ffd9ff0900ebffa0ff2e00edffc9ffd5ffd8ff2e000600a7fff9ff0900eeffdbff
0200d9ff48000a00dbff2400f8ff22003100caff96ff160093fff2fff5ffb0fffcff1000ecff0d00f8ff0a00100016009f00f6ff0900f9fff1ff1f00f4ff1700
0e00e5fff7ff1b00060011000c0053ffdaffd0ff0b00080021002900f6ff0500000021000100190002003400d5fff6ff01001900ddff0300d6ff140011000f00
1300fafff4ffcaff2500e6ff13000b00c0ffffff00001d00fbff19007efffdffdbff0300f7ff2a00ffff09001effffffffff1a000c00f0ffdfff1a00f4ff2300
3100f2ff09000b00f2ff2200dbff28009cff08001000e5fff8ff19000600e0fff2ff2300c6ff130021000600b0ff17fff0ff22000c00eaffdfff2a00f2ff0900
2c00fbff0400f1ffe0ff45ff21002000e4fff8fffbff2200f2fffdff0e00eaff1c001d0004001a00e5ff2100e0ffceff00001100e2ff2100c0ffeaffd9fffeff
20001800faff0800190000000c00eaff0b001400000013002100e7fffeff0c0014001b0009000b002600d4ffaaff090013000a0096ff22ffecfff0ff1b002a00
b8ffbcfff3ff2500f6ffd4ffeaff2000ffff380015000b000100e8fff2ff3300f9fff3ff110036001400f3ff17000900e2ffeeff0b00f1fffeffe4ffecffe8ff
0b00f4ff0c001800d9fff3ff0e00f7ffffffd6ff0a00caffdaff0300d1ffdeffd6fffffff3ff95ff11000900d5ffd9ff0f0029000000a1ffe9ff0500e3ffe0ff
0400deff2c00feffd0ff3100fdff22003400cbff99ff250096ffebfff2ffb1fff3ff0600c6ff1f00eaff0900130009009f00130009000600ecff220013000f00
1400e3fff8ff2b0008000e000a0055fff7fff9ff0e000a0020002100f8ff050007001c000000180000002700d5fffefff6ff2000e0ff0000d7ff180017000300
1300effffcffb4ff2600d8ff15002f00b8ff010000001200fbfff7ff7bfffbffd9ff0600f9ff260015000a0060fff8fffaff0d00ebffe3ffdfff2100f5ff1100
35000e00f7fff7ffecff2400dbff0700270008001c00f3ff040020003200defff4ff2500dfff09000700e5ffc6ff15fff7ff1c0018000400e1ff2800f4ff1f00
2a00dfff1400f1ffe6ff42ff2500e6ffeffff0ff09001b00f8ffffff1700fcff0900e4ff02002300e5ff2f00f4ffcbff22001f00dcff0b00bfffdaffd2ff0b00
1300f3fff1ff1300440018000e00e7ff02001c000b0018002000c3fff6ff07000a001d0002000a002500e6ffceff04000700040095ff1bff1b00f7ff1d002200
b7ffbbffffff0800dbffd2ffefff1a000000290002000d00fcff1000f0ff1800f1fff4ff150037001c00defff5ff0200e9fff6ff0d00f7ff0f00e1ffdcffe7ff
fbfff2ff0d001b00daff1e000d0017000b0000001d00cefff7ff0600e5ff0200d2ff0400f0ff99ff1900f4ffd6ffd7ffe8ff26000800a4ffdcfffdffe3ffdfff
0600f8ff1300feffd5ff2900e5ff15003500ccff96ff1f0094ffecfff0ffb6ff9bff0c00e5ff0b00020005001300f6ff9d0006001400fcffdaff250006000e00
0b00e1fff7ff24000900080009005affecffd7fffeff350018001800feff0700ffff2400f7ff010005002c00d8ff0400f9ff2100dfff0800d6ff100012000700
150027000c00d1ff2200e4ff0e002d00affffdff00001600fffff1ff79ff0300d2ff0600f9ff2300f0fffcff57fff9fffaff0c00ebffe4ffe0ff1a00f5ff1d00
2d00daffdffffcffdfff2300d7ff05001d0004001300effffbff26003b00daff00002400ffff0700e7ff0300cefff8fef5ff1e00ffff1700deff2400f3ff1400
2300faff0100eaffe5ff3bff28000600f6ff3eff0f002200eeff020015001f001000f1fff6ff2300efff2f00feffd2ff03001b00daff2400beffe1ffd7ff0000
1900e7fff9ff060020001f000500ebff15001300010018001700dffffdff020021002600f7ff03003800deffd3ff0700feff050097ff05ff0d00f7ff17001d00
c1ffaafff7ff1800bfffd9fffaff0f0033001b0011001400faff0e00f8ff1b00e6fff1ff110039002200fcff17000b00ecffe8ff0700faff1600e9ffd5ffe5ff
faffefffebff1800daff15000100f1ff0e00d6ff0000b7fff1fffeffe6fffbffc5fff4ffe9ff96ff2600ffffe3ffdaffe7ff1f00ffff9cffe4fff1fffeffe2ff
0300fbff17001600d6ff2500edff1b003700d1ff92ff25008effedffe0ffbefffcfffbffe8ff1700ddfff9ff0d00eeff9900030029002700d6ff240020000700
0900e6fff5ff290009000d0001005dfff6ffc9ff07000800110018000f000400f2ff1800f1ff100006001800cffff7ffd9ff1700d9ff0000d0ff190010000e00
0c00efff0100caff2700cbff18003200a5ff080002001100f7ffeeff7bffc0ffd3ff0d00edff23000b0003002bfff4ffeeff0f00e9ffe8ffe4ff1700f8ff0e00
05001900bafffaff00002700d0ff03000f000c001c00f2fff0ff25002d00dbfff6ff1f00c6ff2300c7ff1000dcff14fff9ff1c0004001100daff2600f4ff1600
2000f6fffbfff0ffe6ff3dff2e00e8fff3ffd0ff0f002300f1ff0200120020001900eeffeeff1b00efff2b00f5ffd1fffbff2600e3ff1b00beffe6ffe0ff2900
1b000900fdff14001f0010000e00ecff05001600090015000800f2fffdff040012002900d5ff13002f00c9ffbeff0500eeff0b009fff30ff1800000015001000
a4ffa8fffeff0f00e4ffdbffddff0c0003000e0005001b00feff1b00f5ff0200b9fff0ff11003a001c000c0019000b00e7ffe1ff0f00fdff3a00e7ffccffe3ff
0500d4ff14001c00d9ff1a001100feff1200bcff1000bbfff0ff0900e3ff0000cbffe4ffecff91ff0e00faffdfffdeffdcffecfffbffa8ff0800e9ffe2ffe3ff
0200ecff12000500d8ff2400efff0b003300c8ff99ff2e0090fff1fffbffbdfff3fff7ffe2ff0800e5ffefff1900e7ff990009001a000a00cbff200011000c00
0900dbfff9ff1b001300e8ff0e005bfff8ffb7fffeff02000d000e00e8ff0a00f6ff2400f4ff120004003400c9ff0200dbff1200d4fffaffbfff1d0010000700
e5ff00001600d6ff1f00e5ff25000600a8ff080016001a00ebfff0ff7dffdbffdcff1000f7ff1f0012000c003bfff4fff1ff2000e4ffdfffd4ff1800f1ff3c00
fefffeffb8ff0000fcff2b00d1fffbff1100080016000600e1ff2d001c00dcff00002200c5ff2600f5ff0c00d4ff23fffaff1d000f001100dcff2700f8ff1c00
1700e6fff1fff3ffe9ff43ff2c00f3fffdff000012002a000400feff0b00eeff1200fbfff1ff1f00f7ff2200e0ffd3fffdff1c00e6ff1900bdffe2ffe6ff1100
2300fbff000024001f0027000800eaff1c002000160012001800f7ff0000000016002c00eeff0b001b00d3ffa0ff0600f8fffdff9fff17ff2100ffff17001300
b2ffabfff1ff12000000dbffe7ff120000001700ffff160004000c00f6ff0200abfff5ff120037001400260013000f00e4ffdbff0e00f9ff5300eeffd8ffe3ff
080022000b001e00e0ff1400f9ff05001100c4ff0f00b7fffefff8ffe3ff0800d6fffeffe4ff98ff1a00feffe5ffe2ffd9ff0c00e9ff9cfff7fff9fff1ffe5ff
0000f5ff11000b00dfff3d00f8ffd8ff3500cfff9bff2a008fffedfff5ffb8ff00000100eaff1000f0ff03001900f7ff96000c0013001a00cdff1e0022000700
070097fffdff7dff0500ffff0c0060fff2ffb2fff8fffeff11001400f2ff0800f7ff1600f9ff100000001900bffff9ffd0ff16009cff0200ccff0e001600fdff
170008000200d3ff2300dcff0f00feffb0ff070013001d00fdffeaff81ffd7ffd9ff0b00f5ff1e000d000b004dfff6ffe7ff1300ebfff7ffcbff2600feff1e00
f4fffbff1700fffff2ff2e00dfff4300f9ff00000b00e8ffdeff27000e00e2fff1ff1c00caff08001c001200aeff1fffefff0f0010002100d6ff2d00fbff1100
1c0000001400f2ffeeff4aff2c0000000800feffe9ff2f000400f0ff1700f7ff3f00100001003600f1ff0c00f3ffd2ff07002e00e2ff1d00beffe8ffe4ff0600
19000000fcff410017000600fcff020008001500060014001d00ffffe0ff00001f002d00010038001800e8ffa4ff0500ebff030098ff17ffddffd3ff1a001900
c2ffceffffff0700f6ffd9ffe0ff0d000c0022001300f8ff17000900ebff27000300c8ff190034001200c2ff16000600f0ffedff3900f5fff5ffe3ffd5fff2ff
0c00f7ff1100feffcdff0700110002000800b9ff1100b9fff9fffbffe3ff1400d9ff0400d0ff9cff2a000e00bbffc5ffd0ff31000800aaffecff1800f4ffe3ff
0300fcff11003c00dcff3d00dfff26003100d6ff98ff0e0086ffe2fff9ffb2ff08003200e6ff0700e6ff1f00190007009e0007000400f7ff0e00140000000c00
0a00e7fff9ff19000e000c00050054fff3ffabff2600020028002900e9fff9ff0a00160007002b00ffff2a00efffecff0c0068ffd9ff0b00d7ff240015000c00
17000900e6ffdfff2100e9ff1d000e00b9ff080006001a00fefff5ff7bff0200d4ff2f00f4ff2100efff0e00e0fe2a00f5ff1000eaffd9ffccff1500f8ff0d00
f4fff8ff18000300faff3200ddff4b00faff07001300e2ffeeff29001f00dcffcdff1900c6ff05001e001200adff1ffff4ff1b0010001000dcff2d00faff1b00
230001001a00f2ffe6ff4aff3200040009000700e1ff21000000e3ff1b0007006a001200ffff0600fdff1800faffcbff05000d00e1ff1d00beffe7ffe7ff0600
f3ff050006001e0025001900e2fff6ff0500200002001d001f00f1fffdff0c0016002f000e0018001100e5ffc4ff0700e1ff02009dff20ffcaffd5ff16001f00
e8ffddff0100fffff2ffd7ffdbff14000c001e0000003100f1ff0400f7ff29000600faff130032002400d2ff1c000100e1ffd4ff3900edffeaffe5ffdcff0a00
fdfff3ff14002200dcff090013000c000c00bbff1d00b7fff2fffcffe2ffffffdeff0400d6ff93ff28001500c7ffd0ffd4ff2f001900acffedff1900dfffe6ff
0100e6ff09002500d3ff3200d4ff24002d00cdff99ff17008affaffff9ffafff04003600e8ff1100d1ff2200160003009e0001000700fcff0c001b000f00ffff
0600dffffaff1a0012000d00070054fff7ffb3ff00000a0024002b000000e8ff0e001d0005002400f7ff1a00f5ff05000c001500dcff0900d6ff260011000c00
1e000300ddffe5ff2300e1ff1d000600beff020000002200fafffaff77ff0300d8ff0200f4ff2000fbffe5ff0afffffff0ff1b00f5fff9ffe1ff1e0000001400
feff020018001000f3ff2e00d7ff4900f8ff09001600dcfff3ff23002400deffe1ff2500b9ff0f0014001700b1ff1afff5ff1e000f002100d8ff2c00f9ff1800
250000000800e9ffe2ff46ff2c00fbffe9fff3ffefff1900f9ffe9ff12000f006500220000002700f2ff1a00ebffcafffbff0c00deff1800beffd9ffe0ff0400
19000800eeff150025001000eefff3ff08001b00080016002200f1fffbff0e0017002300070013001700f4ffbeff0200f7ff040098ff1cffe5fff8ff1f002500
a3ffe0ffe7ff1500f2ffd6ffe3ff1200110024001000110003000f00faff0f000700f0ff170030002700d0ff22002000eaffdcff3b00edfff2ffe7ffc0ffe2ff
f1fff5ff16002100daff0b0014000600fcffc9ff1a00f3fff9ff0800deff0000dcfffcffd1ff99ff21000f00d7ffdaffdbff2f001300abfff4ff1900ebffe2ff
0000230031002900dbff3200daff27002f00cdff96ff26008bffebfff8ffadff03002c00ebff1300e5ff190010000a00a100ebff0900ffff06002000f1ff0a00
0900e0fff9ff1d000f000a000a0052ffefffc4fff4ff060022002b00f7ff020001001f0006001f00faff1400f7fff8ff00001300dbff0800d5ff2f0011000c00
14000900e7ffd8ff2600e0ff0c000800b9ff040004002000feffebff77ff0a00daff0f00f0ff2a00f2ff0900f4fe1500faff1b00f0ff0000e5ff1a00fbff0600
0f00f5ff03000900f6ff2900e4ff3f00260008001200e8ffeeff2b001800e0fff1ff2800c6ff0c0012000f00b1ff1eff030017000f00f9ffddff2c00fdff0b00
27000a000c00ecffe9ff42ff26001800ebff01000e000f000100f2ff1400120042003600feff1a00eeff1e00f4ffc7ff03000400e4ff0700bcffe0ffd6ff0500
0d00ebff06001100170010000400eeff080025000c0019002400dffffdff07001900190007000a002200deffbbff08000400050096ff2cfffeffefff1e001b00
a4ffcaff10000000f4ffd8ffe9ff0f00130025000f0011000500c4fffbff00000500f0ff110036001c00dfff1600fcffe0ffdaff3700f6fff1ffe2ffe9ffe8ff
0a00fbff0e002200daff040016000d00e0ffd3ff1c00c2fff0fff7ffd2ffebffdcfffcffe1ff96ff27000e00deffd8fffeff2e000f00a8ffe3ff1600eeffe4ff
0000e6ff03002200e0ff2800e3ff28002d00caff96ff370092ffeefff9ffb2ff10002c00ebff0600d0ff13000e000300a2000b000e000500faff230000001100
1000dffffbff21000b000500020051fff9fff4ff08000f0023002c00e0ff0000ffff1e0002001f00f5ff2100fbff020004001d00ddffffffd5ff240017000000
0e00f5ffedffc3ff2800d7ff16002000b4ff000003001700fdff030072ff0900d5ff0b00f2ff2100e8ff010025ff0100f7ff1000e8ff0900e3ff2000f0ff0900
44000000e0ff0100faff2000e1ff3900e8ff05001d00f1fffdff28001300ddfff4ff2200e1ff0b000200f0ffb5ff19fff9ff170010001f00deff2900fdff1000
2500e0ff1800effff3ff42ff2a00e3ff0400f5ff0e0020000000eeff1700190030002800f8ff1600edff1f00f9ffccfffeff0e00daff2c00beffecffd6ff0c00
1500f7ff060013000d00e8ff0800f1fff9ff21001c0010001f00edfff4ff05001b001e00fbff03001f00f2ffd0ff0600fbff08009aff1fff0600ffff20001400
9effccffe6ff0700f3ffdafff3ff05001a0021001800030008000d00fdff11000200efff160039002a00ddfff4ff1100eeffd8ff3200f1fff7ffe6ffe9ffe1ff
f9fffdff10002d00d7ff1600090007000600f8ff0600b5fff6fffbffdfff0000d7ff0200d7ff8cff18000100edffd4ffe3ff25000100a5fff4ff1500feffe2ff
0000f2ff04002c00dbff2900c2ff1c003200cbff95ff270090ffefffedffb5ffe0ff2100cdffefffe8ff0c000c000300a200000010000500e1ff2100f9ff0d00
0800e7fff9ff24000e000300070056fff1ffc9ff09001e0019002100b7ff080009002000fbff2000ffff1f00f5ff0c00ffff1100deff0600d1ff3c0010001300
1600e6fff4ffdfff2700d2ff06002d00acff000009001c000000e5ff73ff0100cbff0c00f8ff1f001100faff04ff0400faff1e00f1ff0400e5ff2600feff1700
10000200c3fffcffe8ff2a00d9ff2d00eeff2900f5fff0fff3ff34001800defff6ff1f00f2ff0e0001000b00b7ff1aff04001f000d001a00d5ff280000001d00
21000400effff1ffe7ff3cff2900fffffdff02001c001000fcfffaff150038001f001500f7ff1c00f6ff31000100ccff19000a00d9ff1100c0ffe5ffd7ff0300
1e00fafff7ff1b001500f1ff0000ebff17001a00280017001300daff0400050022002500deff0f001e000800a4ff0900fdff09009cff18ff1400feff1a002400
a6ffb4fff1ff10000f00dafffeff0b003400230010000f0003000f00feff1b00f2fff3ff150038002000f1ff10000300e4ffd8ff3b00f8ff0200e7ffdfffe6ff
fcfffdff05002000dcff0e0005000b00feffc8ff0f00befffdfffbffe4ff0b00ccfffbffdaff9bff28000200e6ffddffe9ff1f00f4ff9bffe6ff09000800e5ff
0000f8ff06002e00ddff3000beff13002f00ccff94ff31008afff1ffebffbcff13001700ecff0d00e0ff04000e00f9ff9f00020029000900d9ff21000b00f9ff
0d00e7fff9ff23001400fbfffbff56fffcffbcfffaff0a0015001b00f7ff060000000c00fcff170003000d00dcff0b00f4ff1600d2fff2ffccff420010000b00
0c000000d8ffd3ff2900b6ff0c003900a5ff010004001f00fdfffcff73ff1700d1ff0f00f4ff2a00e1fff9ff01ffffffe6ff1300f1ff0b00e4ff1a000500cbff
0000f7ffb4fffdfff6ff2c00d8ff2e00f5ff0a000f00ecffebff27001f00dbfff9ff2100bcff050007001100b9ff0eff02001a00eaff1a00d1ff2b00f5ff1500
2500ecfff8fff2fff1ff3dff2800fcff06000b0023001e00fdff01000f00400017000e00ebff1400f2ff2c000700d3fff7ff0f00dfff1d00c0ffd9ffe8ff1800
220003000a0021000600f7ff0300f5ff06001d00370013001500dafffaff0300180030002f000e002300feff89ff0800feff1300a6ff24ff10000a001c002200
a9ffa6fffbff0c00eeffdaffeeff070033001a000a00170006000d00fbff2900f8fff2ff11003c002b000b0009001000eeffdeff4500f8ffbcffe8ffdfffe3ff
fefff4ff14001e00d7ff15000f000b000900c4ff0e00b5fff9fff1ffe4ff1000d2ffefffd6ff92ff28000500e3ffdaffe1ff0500ebffa5fff2ff0d00f8ffe4ff
fefff3ffffff3500efff3400c4ff08002c00c2ff99ff270086fff4fffcffbcfffdff0b00eeff0800e6fffbff1300f4ff9c0008000e000b00dfff1e000d000e00
0d00e6fffaff11000e00ddff0b0053fff5ffa9fff7ff0f0015001500f6ff090001001a00f5ff0c0000001800e6ff1a00deff1200d1fff2ffc0ff410016000200
f6fffbff0700daff2a00cbff18001000a7fff0ff11002800fbffe3ff72ff0d00daff140026001f000400fdff14ffffffcfff2000e6fffafff4ff1b00f4ff1300
f2fffcffa9fffffff7ff2f00d8ff2400f8ff0f001400fcffddff2b001600e0ffffff1c00b3ff04000a001a00c1ff19fffaff080011001300d6ff2900fcff1100
1900ebffd7fff8ffedff46ff2e00f9ff0200feff27001e000300f7ff0c0016001c001800f2ff1c00f8ff2700efffd2ffffff1800e0ff0f00bcffe1ffe8ff0700
2200ffff05002a00200015000600f6fffeff1f00240013001a00f6ff0000f8ff1a0026008dff13001600ffff98ff070008000100a1ff26ff14000d001a002700
a1ffaaffebff0e00f5ffd9ff000006002600150002001d0005000d00faff1100e9ffefff110036001a001d0013001000e7ffd7ff3e00fdff0500ebffe3ffdeff
1100efff12001e00d7ff170009000e000b00c3ff0e00a1fffdfff1ffe4ff0500d8fff5ffd7ff8dff32000900ebffd9ffdbff1700ddff9dfff1ff1800faffe6ff
0000fcff01002c00dbff3a00daffdbff3000d0ff9bff340087fff2fff9ffbaff05000d00e1ff0f00dfff06001700f7ff9a00070003000a00d4ff1e001a000100
0500ceffffff80ff0800faff010057fffaffb3fffdff0b0010001800f9ff0d00ffff0c00f8ff170001001000d6ff0800dfff15009bfff7ffc9ff39001000fdff
0f0014000800ddff2600c8ff15001600aefffdff26002100fcfff3ff7aff0700d9ff1700ffff22000300040008fffefff2ff1a00e4ff0300d6ff1d0009000300
f3fff4ff23000400f4ff3000e2ff5400f3fffcff1200f6ffe2ff24001400e6ffdeff1900ceff1b0026001300b8ff20fff4ff18000f002400d9ff3100fdff1e00
2000f1ff0c00e9ffd3ff4cff3400e4ff0c000200050038000300ebff1900eeff5000ecffffff1700f0ff1100f1ffccff0e001f00e0ff0800c3ffe4ffe1ff0400
1c0002000000580014000f00f3fff7ff00001a001000190015000c00d5ff0600260036000a0020001500dbff4fff0800f1ff0d00a0ff13ff1800e4ff1b002300
cbffceff04000f000c00dbffe1ff030009000b000700040004000500ebff15000500d7ff150031001f00b9ff1a000800fcffebff6300faff0000e5ffd7ff0f00
0a00ffff0a000000c8ff03001500fcff1100ceff1d00befffafff0ffe3ff0a00ddff0100cbffa2ff36001b00c9ffb4ffdaff32000400aafffcff1a00efffddff
03000a0011003800d2ff3e00dfff21003200deff8bff2b0085ffdcfffbffb6fffeff2d00e8ff1400f0ff1f0017001200a20009001300faff0f00190008000e00
0800e5fffbff1600140002000a0052fff3ffb9ff16000d0034002e00fdfff9ff1600200007003000feff2b00fcffefff1c0069ffdcff0900d8ff31001e000400
13000500f9ffe9ff2400ecff14001e00bcff0d0008002300fffffbff75ff0300d3ff0f00f1ff140008000100eafe180003001600e1ffddffe5ff1800fffffaff
f9ffefff1e000200f8ff3400d5ff6100efff03000f00f0fff3ff24002b00deffcdff1c00cbff14001e001d00a3ff22ff01000c0011001f00dbff2e00fcff1b00
2900f4fffcfffbffe4ff4cff3000ddff1300fdff0e0024000400dfff1b00faff1c00fdff0300080000000e00f6ffcfff10000800e0ff0900c2ffecffe4ff0a00
0e00000015002d001f002500f0fff6ff02001d000d001e001f001600f7ff0a0013003a00160015001800d8ffdaff0a00f1ff0d00a1ff17ff0100d8ff1d002600
96ffd9ff040016000a00d7ffe4ff05000900010003002900f8ff0600f2ff0e0000000400180033002b00c3ff18000b00faffdfff6200f3fffbffedfff2ffcdff
0b00030012002400e0ff12001a0002000000c9ff1b00c5fff9fffdffdfff1000ddff0800d8ff9aff33003400daffe3ffc8ff33001200adff04002000e1ffe3ff
03000c0008003b00d6ff4000cbff2a003000d3ff92ff390088ffbafffbffb0ff00002700e8ff1300e9ff1e001b000900a00009001300020004001e000b000900
0c00e5fffcff190014000700140056fff3ffbcff4b000c0033002a000b00f4ff22002d0009002d00f8ff23000000f0ff19000400deff0800d7ff340015000600
16000900f9fff3ff2400f4ff1e002300bdff15000b002600fffffaff74ff0300d3ff0e00f2ff0e000500e4ffe9fefdfff6ff1800e7fffdfff2ff1800ffffe3ff
faffeeff11000a00f6ff3200e3ff5700eefffcff1700f7fffdff22003000daffdfff2600ceff09001d001500a2ff27fffeff160013001700d6ff2d00ffff1800
2a00f5ff0000f0ffe4ff47ff3000daffeeff000010002900fffff9ff18000e002e00f1ff00002000feff1400f6ffcaff04001500dfffedffc4ffd3ffe0ff0200
15000700eaff15001f001000f2fff2ff03001c000b0019001e001200ffff080007002300110013001900d9ffc4ff040007001500a0ff17fff9ffe4ff1c003700
abffd4ff0800ffff1100d4ffe3ff0b000600140003000d00f9ff0800f1ff1f000500f7ff130030002b00aeff1c002b00f8ffd5ff5d00f4ff0200eaffd7ffc7ff
fdfffcff15003200d1ff0e000d000300f5ffcaff240095fff7fff9ffdcff0f00ddff0000d2ffa3ff10003f00e4ffccffc8ff32001700abff0e001a00f0ffddff
0100020010002600d7ff3600d5ff26002f00d6ff90ff3f008cffe6fffbffb2ff01001c00eaff1200070015000d000d00a300f7ff1000f5ff0e002100fbff0800
0900edfffbff1600110003000a0051fff2ffc8ffefff10002b002c000c00fcff18002c000a002e00fbff1d00fcffebff13000800deff0600d7ff370015000e00
15000a000300e2ff2300f5ff12002800bdff0c0004002400f5fff8ff6fff0100d6ff0d00eaff17000d000100eefe0a0001001700edfffbfff8ff1800fdffd0ff
0000e4fffcff0f00f4ff2b00daff54001a0000001100f4ffeeff2d002600dafff0ff2400d2ff0f0022001200a8ff1fff0100100015000200d5ff3000feff1700
2900f4fffdffe7ffe2ff48ff29000b000400f9ff1e0026000600fbff1300f1ff10001b00ffff0e00f9ff0e00f8ffcdfffbff1000e2ff0700c2ffdeffe1ff0900
1900f2ff020013001300fcfffdfffdff06001f000f001c0020000200fdff0c000300270012000d001200d7ffe1ff0600180010009dff0efffbfff0ff20002c00
9bffc1ff03000a001000d4ffebff070006000200190007000000cdffecff1200f7fff4ff0c0036002200c5ff11001a00edffe1ff5600f4ff0200ebfff9ffddff
1100fdff0e003100d4ff03000f00fcffdaffd6ff0e00b1ffeafff4ffd1ffe3ffdcff0000e5ff9bff22001900ecffd4fff0ff2a001000a9fffdff2000e6ffe0ff
0000fafffeff1f00daff3a00cfff26003200dbff95ff2a008fffe3ff0000b5ff11002000ecff1300daff10000a001100a50010001700f7ffedff230020000800
0f00e6fffbff1f000c00feff0e004ffff3ff91ffedff100027002b00000005000f00300007003000f1ff1e00fdfffdff0a001400ddfffcffd5ff3c0012000a00
120002000100e9ff2700ecff16002500b6ff140000002100fbffe9ff6fffffffd3ff1700e5ff19000e00f3ffecfe000003000d00e7fff6fff7ff1d00f9ffb4ff
0300e9ffe1fff6fffaff2100e8ff5200eafff3ff18000100feff2c002b00dafff9ff2200d4ff08001300faffaaff21ff070014000a001b00daff2d00ffff1e00
2700f2ff0100defff6ff43ff2a00c7ff0200f3ff11002600fdffffff1d0001001000eefff6ff1700f5ff1a00fdffc9fffeff0400dbff0d00c7ffd5ffd4ff0300
10000000050018000400fdff0000effffeff1d0013001f001c00fcfff4ff05000d00290008000d001700ebffdeff0500100007009fff17ff0a0001001e003500
99ffb8fffdff0b001c00d8ffe1ff0000ffff16001f00fffffbff0000f3ff1700f2fff4ff140037000d00b9ff07001300f5ffd2ff5200f4ff0800ebffffffdbff
fafff8ff09002400cfff1b001000faff0f0091ff0300adfff8fff6ffddff1200d6ff0c00ddff9dff20001d00f5ffceffe1ff2b000500a7fff7ff1e00f2ffe0ff
0200faff02002500deff3b00c2ff1f003400daff92ff320092ffe9fff7ffb4ffe2ff0a00eefff9fff7ff0b0006000300a400020011000600e6ff2100ffff0c00
0800e7fff8ff20000c00f8ff0b0054fff0ffc7fff5ff1c0025002700dbff06001200330002001f00fbff1800efff0d0013000c00d8ff0e00d4ff370016000900
1d00f4ff0600deff2300e5ff1d000d00b2ff060005002600fdffffff6fff0000caff0f00ddff1f001200e7fff3fe060006001300ecff0700f9ff1500f9ffb6ff
0a00f1ffc9ff0400efff2800e5ff5200edff0000e8fff9fff4ff3a002100dbff04002700abff150017000c00b2ff15ff0800110006001c00deff2900feff1c00
2400eeffdcffe9ffefff3eff2f00e2ff0900e3ff240017000d0001001800fbff0c00f7fff8ff1700faff0b000200cdfffffffeffdbfff7ffc5ffe1ffdaffffff
1c00f6ff070022001000c5ff0300faff00001e00ffff1b0016000400fdff010027002e00ffff0f001300dbff83ff070019000400a5ff1cff0800050020002b00
94ffa2fffdff12000c00d8ffe4ff0400340012001e000c000000fefff7ff1900ecfff9ff180038000e00cbff13001700e6ffccff5f00f7ff0200eeffe7ffdfff
0b000000fbff1f00d9ff14000b0005000b00ceff1400a9ff0000f2ffdeff1500d2ff0500dcff98ff25002800f1ffd3ffddff1f00f0ff9ffffbff1f00f9ffe3ff
0100f8ff01002c00d6ff4200c1ff1e003100d5ff92ff2c0087ffefffebffbbfffcff0c00e1fffdfff8ff01000d0006009d00090025000000e4ff220025000b00
0900e8fffeff180016000600080057fffbffb5ffe7ff17001900230011000e000d002c00fcff2500feff0a00cffffdff0d000900cffffdffccff350012000900
0f000600eeffe7ff2200daff1c002300aaff1000faff2800fcffecff74ff0000cfff1800ddff18001400f3ffe8fe000001000b00f5ff0800eaff19000500d3ff
f4ff0000cdff010007002600d5ff4100eeff17000000f3ffebff38001c00dbfff3ff1d00cbff0d0017001a00b0ff17ff0a002700fcff2000ddff2d00f7ff1d00
2a00eeffb7fffaffedff42ff3000dfff0a00f1ff3e001a000400ffff18001a001500f5fff3ff1800f2ff1c001400cdff0d000300deff0100c2ffd3ffe8ff1100
3800040002001f000500effffdfff7fffdff1d000d001700f7ff0200fcfff9ff320039000a001a002100f5ffe8ff080019000500a6ff17ff2700000013002400
96ff9fff05000c001700d9ffbaff0100fdff0c001100110003000400f3ff3200cdfff7ff170037001e00eaff14002000e7ffdfff6800ffff1300eafff6ffdeff
1100f3ff03002400d2ff1a001d000300f3ffc3ff1600a6fff9fff5ffe4ff1600d1fff1ffdaff96ff2c002100eeffd2ffe5ff0e00e4ffa7ff0c001f00fbffdfff
0100fcfffaff2a00f1ff3d00c7ff19002f00cdff96ff340087fff5fffaffbcff06000500f2ff0400f6ff02001100ffff9e0000001a000800dbff190014000a00
1100e9fffafffbff1c0090ff0f0053ff0300b8ffecff0f001a001a00edff110012002200fdff160007001500cfff1800f1ff0c00d1ff0100c6ff4c000a000900
000016001600ebff2300deff22000f00aaff03000a002100f8ffebff78ff0900daff0e00cdff20001600f7ffddfefbfffdff1900eefffdfff3ff1900f2ffc3ff
f7ff050081ff0700feff3200e7ff3600f7ff460000000200e5ff2c001700e5fffbff2000cfff02001b001400c8ff25ff0300110008001f00d8ff2c00feff1800
2000e9ffcdfff7fff8ff43ff3100e8ff05000000380029001100ffff0f000a000f00fcfff1ff1300f7ff2700f3ffd0ff08000500deff1100c2ffcfffe6ff0000
2500faff030026001300efff0800f4fff4ff1a00330018001d001a000800edff25002a00deff13001200feffdeff070017001d00a2ff14ff0c00000018003300
a1ffa1fff7ff0f000d00defffcff11000a0015001000120008000300f5ff2300e7fff6ff160035001300060013001900e9ffd2ff6800fefffdffebfff3ffe3ff
0e00f9ff0d002300d3ff0e00060002000300ceff1500b3fffcffeeffe4ff0b00d6ff0000e0ff95ff37001b00fbffd7ffe2ff1600e7ffa4ffffff1e00f8ffe0ff
0200f7ff03002f00d0ff4400c1ffe5ff2c00daff94ff2b0087fff0fff3ffb8ff0c000f00e7ff1300f4ff08001000f9ff9c000e0011001300e2ff250023001200
0d00d2fffcff81ff1800fbff0b0056fffcffbeffefff14001b001a00040009000c002700fdff1f00ffff11008fff0700f1ff0a00a6ff0800d0ff5d001300ffff
120012001500dfff2300d2ff17001800aeff040015002900f7ffe4ff79ff0300d8ff1800400015001a00faff07fff7fff2ff0f00f2ffffffe8ff17000c00deff
e8ff040000001100faff2e00e3ff3b00f3ff00001d00e5ffdbff22000e00dfff06001f00f1ff10001e001400d2ff1afffeff13000f001900dbff320000002000
290003001300fcfff6ff50ff2d00deff0100fdff210025000600ecff1b00dfff2800ecfffcff1300f4ff0300e9ffc9ff0d002100e1ff1b00c1ffdefff0fffaff
1b00fbff17003a002d001800fdfff9ff10001c000300130009002100dcff17001d004800030025001200e9ffc2ff0500daff01009dff24ff1d0013001c002900
ffffadfffeff17000700dbffe7ff0800faff29000c00c7ff0100f4fff0ff1c000c00e5ff17002f001b00d1ff1000fcfff9ffd5ff3100f5fff1ffe7ffd9ffd6ff
130006000e002200c2ff0d00160001000b00f4ff1500faff0700f5ffe3ff0900d8fff8ffafff99ff1700ffffcaffddffdfff3300feffa7ffeeff1e00d3ffe1ff
010003000b001900f9fffdffdaff25003200e6ff93ff07008cffdafffaffb7fff2ff1c00f2ff0600d8ff1b000f000d009c000400fdff0b0012001d00fdff0600
1300d9fffdff050013000700080058fffffff2ff0500f3ff2d002200e5fff6ff12001d0009002d00f5ff25000300e9ff1f006dffd2ff0a00d6ff12001c000e00
11000500eeffe7ff2300e2ff1b001d00c0fffdff04000f00fcffe9ff78ff0b00cfff1500f9ff0f00fbff170007ff0f0021001600deffe9ffe6ff1c00f5fff6ff
ebff030007000d0000003100e4ff3e00f7ff0d001500eaffeaff2a002100dafffeff1e00efff0c001b001200cdff20fffbff03000f001a00deff3200fcff2000
2d00fffff6fff3fff5ff4fff3600e3ff0600f9ff1a001f000000f5ff1700edff1d00f5ff00000c0000001200f4ffcdff09000c00dfff0d00caffd6fff2ff0000
10000700160036002c002200f4fff8ff0f001d000700190017001a00eeff100007004400200015001f00e9ffd6ff0a00d4ff0500a1ff20ff060015001c002b00
52ffaafffbff0c000a00d8ffeeff080004001700f5ff3000f6fffbfff3ff1a000800f4ff0e0031001700daff0c001b00ecffd5ff3900e8fff3ffeafffbfff1ff
0500000016003300c5ff18001c0006000a00f3ff1c0001000000ffffe0ff0b00d9fff7ff75ff98ff26001b00d2ffe3ffdfff3600fbffadffefff1f001effe8ff
fdfff8ff05001000f0ff0700c7ff1b002c00ccff94ff190086ffc2fff9ffb7fff1ff0f00e7ff0800dbff1300110007009e000f000700120005001f00fdfff7ff
0c00e1fffeff07001a0003000f0057fff7fff7ff3300faff2b001800f4ffffff1b00320006003200ffff2400fdfff3ff17000100d5ff0400d3ff16000f000b00
1a001100f1ffeeff1e00e9ff19000500c0fffbff000005000000edff77ff0800d5ff0d00f8ff0d000000fcfffbfe0000f1ff2000fbfffaffedff1800f6fff6ff
edff0b00f8ff0700f5ff2d00ddff3600f3ff00002200efffe0ff36001400d7ff46001d00f6ff0f000a001700cbff22fff6ff080011001300d6ff2c00feff1b00
2a000200fafffeff1c004eff2f00dcffedff04001f001d000000f1ff1500f1ff2d00edff04001b00f1ff0c00e8ffc9ff01001f00ddff1700c8ffccffeaff0000
1a000800fcff280039001700faff0100160018000c00180009001d00f3ff0c000b003900110007002200d9ffebff0500e3ff0200a1ff21fffcff410022002f00
0000acfffbff05000c00d7ffe7ff0f0008001a0013000200f5ff0200faff18000a00fdff110032001f00b9ff0d00f5ffefffc0ff3a00f4fff2ffecffcbffd9ff
0a0001000f003000d2ff0e000d000400fffffaff180047fffefffbffddffffffddfff6ffbbff9aff1c000100e8ffd8ffdaff32000500abfffaff2100d2ffe5ff
0000e8ff14000100eeff0200cdff27002f00c8ff94ff2c008fffe7ff0000b5ffecff1000e7fff7ffe4ff110004000e009d0006000100120001002000eeff0900
0e00e0fffdff1200150003000d0058ffefff06000600000027001e00e4ff00001500230007002a0000002100fcffdbff0f001100d2ff0000d4ff180019000000
13000600f6ffdbff2000e9ff16001900beffffff11000100fdffe4ff75ff0a00d7ff1200f2ff11000a001600fbfe130004001f00defff6ffecff1e00f0ffedff
f5fff8ffeeff1700fdff2a00e3ff33001500f8ff1200e0ffe3ff2b001000d7ff36001e00fcff07000f000e00cdff1bfff5ff10000b000300dbff310001001400
28000300fcffefff04004aff2b0008000500fcff180018000000f5ff1500e5ff27000300ffff1b00fbff0f00f7ffd1ff04001c00e1ff1300c4ffd1ffe9ff0200
2000f0ff15001900210008000600f9ff11001b0000001d0019000d00f4ff1000180032001b0012002300deffdeff0500fcfffdff9dff1bff10003c0023002600
eeff40ff080008000f00d8ffe6ff0000000019000b0003000d00d2fff0ff25000b00f2ff100032001e00ddff05000c00e4ffdaff3700ebffeeffe7ffedffe7ff
110000000e002f00cfff0b0008000d00000004001700feffe6ff0000dbffe9ffd9fffdffe3ff9cff1a001000eaffdafff3ff36000000a7ffe9ff220085ffe7ff
fffffbfff3fffbffccff0000caff24002d00caff96ff210093ffe2ffffffb9ff00000500e7fffcffc9ff0a0004000500a10014000c000100fbff250013000500
1000ddfffdff0c0016000600080053fff5ff44fffaff08001f001e00f1fff7ff1600300006002d00feff2700fcfff0ff0d000e00d5ff0100d7ff13001a000100
0f00ffffeffffcff2300e1ff12000b00b8ffffff04000a00f6ffd9ff73ff0600d5ff1400efff0c000800fcffe2fe010005002200f0fffcffebff1900ecffefff
0000f8ffe5fff7ffffff2700dfff3100f2fff8ff1a00f8ffedff34001200d9ff35001e0008001f0009000000cfff19ff0100100012001600e0ff2e00ffff1700
2300fcff0200e9ff000049ff2900dcff0000f9ff15001f000e0001001800ebff1400ebff00002000f4ff1600eeffc8fffdff1100daff0d00c5ffceffe3ff0300
22000a0011002a001600eaff0a00f4ff1e0019001100150021000500f6ff1100090032001c0010002500f5ffc5ff0700efff09009fff25ff2c00440023001f00
f0ff9cff050017001500d9ffe6ff000000002a00150008000800fdfff4ff20000900f3ff170035001300d4ff0d001100e5ffceff3800eefff0ffe8fff2ffe7ff
0a0000000a003200d0ff13001100050018003fff0800eeff03000400e3ff0900d5ff0000e0ff9bff2400fefff1ffe0ffe9ff2f00fdffa7ffe9ff260071ffe7ff
fcff010000000200dcff0200c7ff1d002d00ccff98ff260090ffe9fff8ffb7ffe7ff0400e8fff6ffe5ff0200f9ff07009f000b0001000200eeff2500e8fffbff
0400e6fffeff18001600feff100056fffaff04000400290018001e00ddff05001300200005001f0003001700fbfff7ff16000d00d6ff0300d5ff130017000800
120003000000d2ff2200d6ff19000500b4fffaff03000500feffe8ff75ff0900d3ff1d00edff11000600f4fffcfefcff08001200f4fffbfff2ff1700f5ffd4ff
f8ff1900d0fffffff2ff2b00e7ff2600ebffdefff0ffeeffe9ff31001300d3ff49001a004aff020001000000e5ff1aff02001d0002001700e2ff2e00feff2200
2700fcfff9fff6fff2ff45ff2e00e2ff0600e7ff2a000c00060000001900e8ff1600ecfffbff1f00f6ff1900f6ffccfffdff0a00dbff0300c9ffceffe3ff0100
2000f6ff05002600230001000d00f2ff1100130011001c001f000200f7ff08001a003c000d000b002000d9ff83ff07001500fdffa1ff14ff0b0043001f002a00
eeff81fffdff0e00f1ffd9fff1ffaafff8ff2e0015000e000600fefffaff1e00fffff1ff160031001300d8fffaff0400dfffc6ff3b00f3fff5ffebffe6ffe8ff
0000010003002c00d0ff120007000b00120008001200eafff5fffcffe1ff1500d1fff7ffdbff9dff1a000300f4ffe1ffebff1d00f5ffa2ffecff1e0029ffeaff
ffffeefff5ff0a00caff0100c2ff12002f00cbff94ff1b008cfff0ffecffb8ff18000000e9ff0200ddff07000e0007009a000b0027001100e9ff27000a00fdff
0400dbfffdff16001600ffff05005bff0200eeff0400020012001000d8ff0a00fbff220003002600010010001500eeff08000600caff0200d0ff15001c000800
0900feffe4ffe0ff2000d8ff21000f00afff030002000a00f9ff010073ff0500d2ff1300eaff1600fcff0200e9fe0700f8ff1800ebfff6ffe2ff0d00f6ffb7ff
e5fff5ffc6ff0600f8ff2e00e7ff2100faffdcfff1ffe9ffdfff2e001c00daff3600190004000c0014001b004dff18ff0100260000001d00d2ff3100fbff2200
2e00f3ffd3fffbfff2ff46ff3000deff0c00fdff400019001300feff190008001f00f6fff4ff2200fbff1c00f9ffcaff00000a00ddfff6ffc7ffc9ffeaff1200
24000200130024000b00edff0200f9ff11001f000e00120017000800f9fff6ff040042000b000e001800f3ff37000500f3fff6ffa5ff1fff0f0048001e002100
e9ff82ffffff08000a00d9ffefff0c000a000c000100120004000000f5ff2000e8ffeeff110036001800c9ff0b001b00edffe6ff3c00f4ff0a00e6fffaffeaff
1500060011002600caff23001b000800fefff1ff1a00e8fffbff0500e4ff0a00d2ff0000d4ff9fff25001400edffe3ffe2ff0300dfffa5ffffff2100c3ffe1ff
fefff5ff00000a00fcff0c00d2ff06002d00c9ff97ff1e0091fff3fff7ffbbffecfffeffe3ff0b00d7ff00000600f8ff97000b0000000c00e9ff1f00fdff0e00
2400dcfffdfff6ff1200dbff170057ff0200daff020006001c001600ddff06000b0026000500270003001100e9ff0e0007000400d2ff0b00cdff230017000700
0d001000fbffe0ff1f00e8ff24001e00afff0100f7ff1600fafff2ff78ff0900d9ff1300f0ff1e001000f9ff11ff0500f5ff1e00f1fff7fff6ff1b00f0ffefff
f6ff0400dafffffff2ff2f00e0ff2000faff79000e00f4ffd6ff35001f00dcff3c001b00f7fff5ff07000f00d3ff19fffdff110002000b00daff2f0000001a00
2a00edffd2fffafff1ff49ff2300e1ff05000300500024000a000100180000001500fffff9ff1600f7ff2800edffcfff1c000d00e0ff0f00c3ffd7fff2ff0500
2900ffff020020001b00edfffffff6ff03001700230016001a002900fdffe8ff0f003f0015000a002700ebffbaff030002002a00a4ff1dff3900490018000d00
eaff8cfffcff08000400e0fff8ff0f0000002700f3ff20000000fdfffaff1900ecffefff0e0030001300f4ff0b000d00e8ffc4ff4400fbffe3ffe6ffe5ffe1ff
1300f8ff11001d00c4ff1c000f0003000e00fbff1700edffffff0000e6fffbffd6ffffffd5ff94ff2d000e00eeffdcffe8ff1900f2ffa6fffcff1f00b6ffe0ff
fefff8ff00000f007fff0f00d0ffd0ff2f00d2ff91ff18008cffeefff3ffb4fff7ff1000ddff0e00d2ff0800030000009c000600efff1200edff2400f7ff0400
1900d7fffdff85ff1600fcff0d0058ff0000e7ff0100f4ff1a001000d6ff0a0009002500020011008aff1900f3ff030002000c00afff0600d3ff14001b00faff
0e0011000100e3ff2100d3ff1a000c00b4fffdff18000b00f2ffeeff77ff0600d6ff1800caff1e000400fdff1eff0400ecff1e00f0fff7ffe7ff1e0003000500
1400fbffedff0000e4ffa1ffc1ff0200030011000400e7ffe8ff2c001c00cdff01000c00edff1c0023000900acff55ffebff440013000d0094ff61ffb9ff0300
2a00e8ff0b00feffc9ffd9feb8fff6ffeeff2d00f5ff2c00e4ffdbff1900ddff1900030000000f00dcff2a00eeffc4ff20000d00b8ff3700c0fff7ffbffff6ff
210020000600390013001900fbff0600f6ff23002f00fbffefff100008002a0023006200210058000e00e1ff0a00c9fff3fff9ff23005dff0200fbff38001400
adffe3fffaff2600f1ffa8ff03001c0016001d0022001e00f2ff1700faff20001d0025001a00b7ff0d00f3ff0f0008000800d5ffd6ff22000a002c00dbffe4ff
2600fdff110012009cff070004000b001300b6ff3500beffdeffd0ffb3ffdaffadfffeffceffebff1d00faffe0ffdffff1ff4c00250046ffeeff3000f7ff4d00
f9ffe8ff0d001a00f1fff7ffd2ff38004900b9ff3bff250087ffc8ffe5ff78ff14000d00faff3700dfff270005001c00e6ff1d001400eaff29003100ebfffcff
1a00c4ff0f00ceff1d0017000a00d2fe10009efff3ff21000500faffe7ff020004001b009aff2b000b002600dafff1ff0e00ebfebfffebff97ff370032001900
13000700f7ffe9ff1c00e1ff1d00160072ff1700ccff3200ebfff0ff1aff1900abff0900f5ff1f001300f2ff2dffffffe8ff27000f00ffffbbff1a000a003800
1100f6ffeeffeeffeaffa5ffcaffe1fffaff24001b00ecfff8ff38002c00d2fff6ff0900bbff1c0018000f00b1ff4dfff4ff2f000a001b00aeff6affb3ff2200
2600e7ff1400f1ffcfffd1fe86ffe7fff5ff0e00f9ff2300c6ffe7ff1e00e6ff1a00fcfffbfff3fff3ff1d00faffccff01001100b8ff8affbefff5ff9bff0400
14000a0005002a0012002300f9ff0500eaff21000f001600f9ff1100feff2700200056000d0021001400e4ff0800e1ffe6ff12002a006eff1800e8ff38003200
ecffdcfffbff1f00edffa9ffffff1d00000017000c004a00f2ff1d00f5ff19001e001d00ffff31001400f1ff0a000b000300e6ffd9ff000002001900e3ffe0ff
1d00f3ff15001f00b2ff0c00f6ff1d002000bdff3500b5fff2ffe0ffbbfff2ffacff0300fbffe9ff2c000000e4ffddff0d0047001e0061ffe0ff25000b004d00
faffe4ff0d000800f1fffaffd3ff3d003f00c8ff35ff25008dffc1ffddff70ff13000600feff3d00e9ff0b0001001c00e7ff29000f00fbff20003200e3ff0300
0900d1ff0e00b5ff180003000500e4fe1300adffebff200007003800dfffe5ff0a000b00adff29002b002900e9ffefff0400e5ffadffefff9dff35001800faff
1200f3ffe6ffefff2c00cbff130007007fff0f00ddff1f00edffeaff19ff06009dff0f00ecff24000400ecff3bff0600d2ff27000600f8ffc7ff140007000400
0f000500faffdcffe9ff95ffc9fff3fffbff1b001a00e9ffe1ff38001800d8ff04000a00feff19000c000500c9ff67fffeff370010001700b6ff68ffb3ff0900
3600ecff05000f00cbffd8fe91fff6ff00002b0001002000e4ffdfff2500f3ff24000000f9ff0f0003001600f3ffcdfffeff1c00baffabffc2fffeff9cff0200
1f000d000600240016000c00f5ff0300f9ff0f0032000600f1ff1b00edff340032004f0017001d001a00deff2200f0ffedff0500240069ff1100e5ff3b002000
c2ffddfffbff2400eaffacff04001e000e001b001c002a00ecff1000f5ff0b00fdff12000800c9ff0f00e9ff03001200dfffe8ffd1fff5ff0e001900dfffe2ff
210009000c001c00b8fffdff0d0018001200beff2e00e5ff0800d7ffc4fff3ffb3ff0d000300e1ff21000800f6ffc9fff8ff4700230051fff1ff1b00f8ff4e00
f4ffeeff11001b00f2ff0000e7ff3a004600baff33ff1f008dffc8ffd5ff74ff1f000b00f4ff3f00e9ff020002001e00daff100019000d0017004200ddff3600
0500b9ff1100dcff1c0005001600c8fe0800aefff0ff1d000d005400e0fff6ff07001e00c8ff340026002a00e6ffedfff8ffbbffb9fff5ff93ff330014000700
1a00f4fff5fff7ff2700d8ff2100140085ff1700d9ff1c00eaffebff1dff0a0098ff0e00f3ff1c000d00feff4cff0700d9ff24001200f3ffd7ff2f000d002900
09000f00f9fff7ffe4ff8dffbffffaff0d002b001a00ddffdcff49001500d6ff09000b00cfff13001200fcffd9ff69ff04002e000f000e00c4ff65ffb6ff1000
3900eaff0d00f9ffc7ffd5fedcff1200eaff130003002200d2fff0ff2600e3ff2b001100f5ff150000002600ffffc8fffcff1400bcffabffc8ffe9ff9eff1000
0b00140000001f00070010000000ffff040007001d001300e4ff0400f8ff3b002b004600100016001c00eeff2100cbffd8ff010029006aff0a00efff3a002900
acffd5ff00001600fbffa6ff0200190002001b0010001400ecff4300f5ff0e0007000f000500e5ff0300d6ff0e000700cfffdbffcafff1ff10001400d3ffdeff
2200f9ff0a001900abfffcff0500160039009dff2d00b4ffedffdcffc6fff9ffa9ff1200f9ffd2ff1a00fefff7ffd8fffcff3e0023005cffe8ff180000005300
f9ffe9ff06001300f8ff0000dfff37004c00b5ff20ff20009bffcdffdbff6eff10000100f7ff3900ecff1c00f0ff2600d9ff28001500090011004b00e6ff0000
1c00b2ff1400dcff1c0012000900d5fe1600d1ffeeff140014004c00e1ffe3ff0700220078ff1e002b002f00f1ffd1fff7ffdfffb7fff7ff97ff25000c000b00
2000fbfffafff4ff2500e1ff01000c0080ff1300e3ff1f00e5ffe4ff1aff100095ff0500eaff29000600eeff61ff0400efff27001000f8ffb7ff1d0007000700
1400fcfff1fffeffd7ff96ffbefffaff00001a001800dffff8ff3a000b00d0fffbff0d00bfff0e000b001000baff49fff8ff320003000a00b0ff6aff9eff0f00
3f00e5ff0500feffcfffcffeb3ffe1fff4ff1b0012002600ddffeeff2600f1ff22000300f4ff1500ddff2800fdffcbfffbff1900c2ff2400cdffe8ff9fff0d00
2e0012000900110017001c00fefff2ff0c00090015000c00ddff0500fbff38001a00460017001f001d00e9ff1800d8fff1ff010026006bff2600eaff3e001e00
bfffe4ffeeff1d00edffadfffeff15000b00160022001000f8ff0a00f9ff0d0008000f00b4ff48000400e0fff8ff0b00d8ffdbffd0fff9ff0e001c00d6ffe3ff
1b00ffff07002300b3ff070006001f001400e6ff2500d2ffeeffecffc3ffecffb0ff00000100d6ff1d000500f6ffdafff0ff45002a007fffedff0800fbff4900
f9fff1ff06000f00fafffeffdfff34004d00d3ff38ff1c0094ffd4ffd6ff79ff1000fffff3ff3e00e9ff020006002b00deff17001700f0ff0a004f00e1ff0100
1600cbff1500cbff0b0016001500dcfe0a00beffefff4f000f004400e6fff8ff06001d004dff290032002600ecffdeffefffe1ffb2ffefff9dff2a0024000800
04000800f6ffecff2900ddff1300290081ff1600e0ff1e00ebffe1ff21ff0800aaff0f00e5ff28000b00e8ff39ff1200d0ff16000200fbffd1ff1f0012002500
0c00edffebffdcffecff8fffcffffaffffff1f001a00dbffebff25001600befffbff1000fdff130006000700bbff52ff00004a0001001600abff6dff83ff1b00
3a00ebff0e00e2ffcdffd6fe95ffe5fff3ff00000d001400c1ffefff1700efff22000000ecff1a00deff2d000200cdfffeff1c00befff3ffc0fff8ff88ff0800
2300080000001c0020001c001200fcff0a00270016001d00cfff0c00f9ff370026004f001d0017001700faffd8ffe0ffefff050027006eff0800e4ff33001600
ccffeffff0ff1900f7ffa8fff8ff1d0008000c0024000f00fdff0e00f6ff0c00030018000b0052000800e6ff0b000a00e0ffebffd1fffaff1a001a00d3ffddff
1c0006001c002300bfff0c00f6ff12000c00cdff2900aeffeeffe1ffc8ff0700baff0900f8ffdaff2a000100eaffd7ff06003b00180085ffe8ff0500f8ff4300
f7fff0ff09001e00ebfff0ffd1ff3e005800b5ff3cff08009affdcfff0ff77ff0f000000f7ff3000d4fff3ff02002100efff26005400010011004000efff0400
1d00d1ff1400a8ff11000c000d00dffe0600a5fff5ff230014004100e7ff000006001e004fff21002e002600e5ffe7ffeeffe9ffb0fff8ff9bff24001c000c00
0600ffffeaffeeff1f00e2ff2400220072ff1300e6ff2200e2ffe4ff21fff9ffb8ff4000f4ff1700fafff9ff5bff0700d8ff290011000400ceff16001d000f00
1300fafffeffe4fff0ff8aff94fff2fff8ff24000900e6ffeeff08000900bdfff9ff1d00edff0700edff1100e5ff57ff1000140001000500abff68ffaeff1600
1800dfff1c00e4ffccffd9fec7ffe1ffffff0a0019001c00d3ffefff0e00f6ff1100dcffecfff6ffe5ff2200fbffc9ff04001700b4fff9ffbdff070076ff0c00
3e0005000700000029000e002200f0fff8ff21001f001c000f000e00f2ff16001b0052000e0020001300f5ffe1ffcbfffafffdff2d0067ff2400e4ff30001300
c2fff1fff5ff1a00eaffa3fff2ff2000fcff12001a0018000400060008001100edff0e0025004a000000e0fff9ff0c00ecffedffd7ffebff16001f00c9ffd4ff
2000020004001d00baff1f00020008001a00afff2200b0ffedffeaffc5ffecffa5fffcff48ffd7ff05000200f6ffc2ffebff18001d007cffedfff4ffeaff4300
fdffecff14002700e9ff0c00d9ff34005600c3ff3dff080096ffcfffddff82fffffff9fff5ff3a00e1ff0a000c002a00dbff0a002400f5fffdff4800e9ff0000
2800afff0500e8ff110026002600cffe0800c2ff0100120015003700e8ff0c00edff140050ff2a001a001100c8ffd9ffd7ffe2ffb3ff110098ff200034002100
ffffe9ffefffe9ff1900d4ff2700040079ff1100d4ff2600e0ffe5ff1dfffaffabff0a00eeff1600f4ffefff39fffeffe2ff1200f2ff0000c7ff100014001d00
0c00fafff5ffe3ffccff81ffc8ff0400110006001800edfff1ff15001900bdfff4ff0e00d0ff0400f2ff0a00d4ff49ffeaff1200feff1800bcff64ffa6ff1300
98ffe7ff0400deffd3ffcbfe7bffefff0a00120022000800beffcfff1400ecff2d00e5ff00000700eeff21000400beff06000e00b4fffbff94ffe3ffb1ff1400
3300eeff17000c00230011000c00dbff0b002d001e0022000f001900f1ff150007005100170002001c00e5fffbffdefff2ff2200340068ff0d00f9ff2c000300
98fff5ff03002700e9ffa9ffe2ff22000100280024000c00f1ff140005002900ecfff9ff170036000e00d5fff8ff0c00dfffe2ffbefff5ff1c001900daffdaff
0f000900f5ff23009afffeff26002900fcffc6ff4200d4ffe0ffdcffbeffe0ffaeffdffff3ffddff1d001700e7ffcaffe2ff0400f0ff6dffdbffecffe3ff4c00
0000e4ff06000e00f1ff0700d3ff17005800b7ff3afffdff85ffb3ffbeff7afff0fff3ffefff4100d6ff060000001d00f5ff12000300ffff00004100f2fff4ff
0100acff0800b3fe66001900f2ffe7feefffbbffe8ff1e0017004800dfff0d000d00240052ff0700ebff1c00d8ffd8ff6fffd6ffa9ff2200a0ff1e0038001000
f1ff0200f0fff0ff1c00d6ff2a0000006fff1000e3ff3200edffe4ff18ff0700aafff8fff8ff1a00f5fffaff3effe7ffccff3300fdff0d00a7ff18002c002300
0d00eaff0000fdffeaff91ffd4fffdff19001c000900e7ffedff3e002d00c6fff6ff0800d4ff32001e000000b3ff66ff0d0033001600130090ff75ff9cff1e00
2f00e5ff19000b00ccffd1fea0ffedffecff0c00e5ff1c00c8ffceff2700e0ff2200f4fff9ff1400e7ff3500e9ffc6ff0a001900b8ffdcffb6ffebffb7fff4ff
00001200dcff38002a001e00e6fffafff7ff1d0010001b00e7ff1400010023002f0054001a0039001200edffdeffcbffecff0d002d006fff1e00eeff34002500
c8ffe7ff0c001d00e9ff98ff0500180007002e0019001d0004000700e7ff2900190027001b0026000300f0ff060007002300daffd0fffbff0f002100e6ffe5ff
1d00f3ff07002100a5ff0100ffff10001f009dff3400d7ffd6ffd9ffbcfff8ffaaff0900a9ffe1ff2900fbffe5ffdbffecff4b00050054fff1ff2800f1ff4c00
0000e9fffbff2500fffff0ffdcff3e004400a5ff38ff21008cffbaffdaff7cff07001000ffff3600e4ffffff06001800f0ff1c00220006002d002c00f4fffbff
1500e3ff05001300200000000400e0fe0200b9fff7ff240007003600e4ffddffffff00009dff27002b002d00f1ffefff09004fffadfff4ffa3ff38003800f8ff
1100edffedffecff2400ceff2a0025007cfff7ffeeff1c00effff1ff1fff1200a8ff1500f1ff1b00ffffecff7eff0500ebff24002200f5ffc3ff170005000100
2b00f3fffcfffbffe6ffa4ffc2fff3ff00001a001b00f1ffedff38002c00d3ffffff100092ff18002c000000c3ff5eff0600320011001300c3ff5fffb4ff0d00
3d00e9ff12001700d1ffcefed5ff1000e7ff2100e5ff2f00e4ffe4ff2400e4ff1e000a00fcfff5fff4ff2800f2ffc3ff32001e00bfffaeffc7ffeaffa0ff0200
17001f00040029001a002d00ddff0d00f7ff190028000000f1ff0d00f0ff2f002e0041001b0026001600e5ff1f00abffe6ff0000280063ff1400e4ff3a003a00
eaffd5fffeff2200e9ff98ff0d00220011001d001f004000e7ff1500eeff1d001b0013000900deff0c00effff7ff07001a00d4ffd6ffd0ff13001600f1ffe8ff
2100feff10001f00a2ff1200040011000c00c0ff3000bdffdbffd7ffb5ffd6ffb8ff0b00f3ffeaff17000000f3ffd9ffebff46001d0057ffedff3300f9ff4e00
0000ebff06000d00e9ff0f00e6ff3a004f00bdff30ff1e0093ffd1ffd5ff80ff17001c0000003500dfff00000c001a00e0ff1b002200000029004800d4ff0300
0e00d1ff0b000300210007000a00e0fe0300a7fff1ff1d0004004200f7ffeeff1a000e009bff2b0034002a00e8ffeaff0a00adffc2fff9ff99ff30002b000000
20000400f9fff1ff2400d5ff1a001b0079ff0d00ccff0f00ecffebff1aff100097ff0b00e5ff24001900f6ff61ff1100d8ff1e000500f0ffd5ff240003002500
14000600fdffdaffe8ff96ffcfffe8ff020023001900defff0ff33002900c3ff09000d00cdff15002c00fcffdaff63ff09002b000b001b00c5ff66ffacff1200
4400edff14000400c8ffccfedffff7ffffff0a0003002200c9ffe3ff2300dbff2a000400fcff1a0024002b00f9ffcbff00003a00bfff0500bdffedff97ff0100
19001200fcff15001b001500fffffefffdff0c001b000200ecff1100f3ff370014003c00110014002900deff1f00c5ffe5ff0300250068ff0400e8ff30003000
bcffd1fffeff1500f3ff99fffdff1600080025001100140002000000e7ff19001c000d001300e5ff0a00e6ff03000f00e7fff2ffc9fff2ff14001200dfffdfff
1500feff06001500b3ff0800060022001900a3ff2800e0ffd7ffd7ffbdfff1ffb3ff0e000a00ddff33000c00f6ffdaff0100400023005cffebff1a0009004e00
fafff7ff10002a00ecff0400e7ff3a004500cdff2fff1d00a0ffd3ffc1ff7dff1800ffffffff4200e5fff7ff04001e00d8ff28001600000018004600d7ffffff
1e00d9ff0c001e0017000a000d00cffef9ffacfff4ff130005004d00d9ffe2ff070019009dff23002b002000f3ffd4ff08001300b6fff9ff9eff31001e000900
1900effff3ffeaff2900ccff190016007aff1900e0ff0b00ebffe0ff15ff0500a3ff0500e7ff1c000400eeff79ff0600daff21001900f0ffd5ff1a0011000500
16000900f7ff1100eaff90ffc3fff4ff08001c001400d7ffcdff35002a00cdff05000c00d8ff10001b000f00cdff71ff1900260001001800b3ff69ffb6ff0600
4500e6ff07000d00ceffcffeddff0200efff230003001c00e5ffe9ff2000e8ff21001200f0ff1700efff2800e6ffccffffff0100b7ffbbffc6ffdfffa4ff0800
27001200fcff1c0019002100f0fff0fffdffe5ff25001300f2ff0800f2ff2d0012003500140015002f00dcffbcffd0ffdbfff9ff2b0072ff1d00f1ff3f002700
b1ffe4fff5ff1600ecffa3ff010010000400240021001200eaff4a00efff1c00f8ff0d0013004f001200f2fff1ff0800e2ffc2ffc6fff4ff15001000d9ffdfff
2800040002002e00a4ff00000e0016002900cfff2900beffdbffdfffc0fff5ffb2ff06000000dbff2c00fdfffdffdcff08003d001b0049ffeaff180017005000
f6fff0ff0a000a00eeff0b00f5ff33005100cfff20ff210096ffcfffcdff84ff10000a00f2ff4500ffff000009002000d1ff340014000b0018004600dbff0800
1200d5ff0d002e00150005000e00d7fe0600d7ffefff20000c003c00e5ff02000c000900abff2f0037002800f1ffdfff02000c00bbfff2ffa2ff2d0024000d00
0f00f4fff9fffbff2100f3ff1a00170082ff1b00d6ff1f00e6ffe6ff18ff0c00a6ff0900eeff2c000c00e8ff79ff0300d9ff17000000f8ffdbfff0ff0c002a00
17000500e8fff6ffdaff8bffc9fff0ff030023001a00dfffdbff37001c00c1ff0c001d00d9ff06001b00fcffc6ff67fffdff2900ffff1f00a1ff68ffaeff1000
4600e3ff1900feffcaffd3febffffffff1ff000008002100c9ffeeff1e00ecff28000100f0ff0f00f4ff2e000100caff03002d00bcffddffc5ffdbff9aff1c00
1b000c00f6ff1a0010000d000f00f4ff02000a001f001900cffffdfff8ff2a001d002b00190015002300f2ff0d00c7ffdcfffbff280077ff0400f2ff3e001e00
b9ffd6ff00000d00f3ff9cff040011000200190010001400f3fffbffedff18000a0013000b0047000800ddfffaff0a00d9ffd9ffcffff5ff13001300c7ffddff
0c00050009002500aaff0800ffff1f000e00e6ff2500caffd1ffe1ffbcfff8ffaeff0a00f3ffdbff2000f8fffbffd7fffcff3800210059ffecff0a00feff4e00
fbfff2ff0d001500f7ff0b00ebff30004c00d3ff26ff170098ffd8ffd0ff79ff11000100f7ff3c00f5ffebff0f001d00d6ff1d001900f1ff14004700e6fffdff
1700daff0c001800110005000300d8fef6ffb6fff5ff29000d003a00e3fff6ff130025009dff29003a001300f5ffcafff0ff1100b3fff9ff99ff22001d000d00
1500f8ffedffe0ff2800ebff0100210084ff0b00ecff1900e1ffe2ff18fffeffc1ff2f00e8ff1f000900f2ff82ff0400e0ff14001400f7ffdbff180010001400
1800d9ffebfff0fff6ff90ffbdfff4fff8ff17003400e0ffefff41002000c3ff03001400f6ff0a00feff0a00ccff5bffffff39000a000e00afff66ffa8ff0d00
4500e8ff11000800c7ffd3feb6fff5fff2ff0b000e002100e8ffebff2800e8ff1c000000e9ff1300e6ff1b000b00cdff00001300b7ffecffc4ffdcff91ff0a00
2e00140003001400360011000400edff02000d0022001600eeff0600fdff2d0023003f0016001d001100e3ff1600ccffe9fff7ff2a006cff2700f0ff41001300
adfff1fff6ff1300f4ff97fffeff0f000f00220022001100feff0300eeff1f00e6ff150010003a001200efffeaff0600e3ffd7ffd1fff1ff1c000e00d1ffdbff
26000000faff2200b2ff10000b0014000400c5ff1e00c6ffe2ffe5ffc0ffe2ffc4ff0600f4ffd8ff16000000ffffdaffe5ff290018005cffe2ff0d00e7ff4000
fbfff2ff0d002300efff0700c9ff30005900d9ff3aff16008fffcffff9ff89ff15000400efff3c00d0fff4ff14002d00d8ff12003400000004004100e6ff0300
2000ceff08002600150003000000ddfeebffb4fff0ff160013003b00e9ff010003001400baff200030002500efffddfff5ff1000b5fff2ff96ff2d002d000e00
ecfff1ffedffe3ff2a00e0ff18001b007eff1e00dcff2800d9ffe5ff1dfffeffbbff0d00ebff1f000700e2ff89fffeffdbff0400f8fff8ffd9ff1c0005000900
08000400e1ffe8ffceff8effd0ff0a000d0014001c00e1ff020033002300c5ff0c001d00defff7ffdaff0200d9ff54ff0c002400f1ff0d00b5ff68ffc0ff2800
2700e3ff1100f7ffceffccfe96ffecfffaff05001b001f00c3ffeeff0f00e7ff250006007d001400f3ff34000700c5fffdff2000affff2ffadffeeff9fff2c00
1c00080014001a00120018001400eeff01001a0013001d00eaff0000fcff27000b004700000008002d00e6ff2000c3fff8ff0300310065ff0300f9ff20002a00
a0ffeafffbff2700eeff99ff04000d000000210022001500feff0600f5ff1e00eaff0700200031000400e2fff9ff0000deffd4ffccfffdff1c001800d7ffe0ff
0a001f000c002700baff0a00130027000900c2ff1e00a4ffe3ffdeffc2fffcffb1ffeaffe8ffcdff31000100faffdcffebff0000130073ffeeff0500ebff4200
f9fff3ff07002100f8fff3ffd1ff21005200c6ff38ff160093ffd2ffb7ff83ff1000f9fff0ff3600cbff09000c003b00e2ff19001500fffffeff3600f3ff0000
3000c5ff1100adff3b003300e5ffcefef6ffa4fff5ff12000f003400eaffffffe8ff1d0091ff08002e002100e2ffd3ffe8ff1200afff0d00a0ff34002b002100
fdfff2ffefffe5ff1d00e3ff0c0028006fff0e00efff2d00d1ffdeff18fff8ffaaff0000e6ff1f00f5fff3ff54fffdffdbff15000300fcffcbff170021000400
1c000700ecffe1ffe1ff99ffa7fffefffbff1c001f00e0fffeff2a000500bcfffdff3600beffc4ffedff0900d5ff4dff0900380000001600ccff75ffacff2300
0800eaff06000000cdffcdfed7ffe7ff030039001f000200e5ffeaff0400e2ff25000500e2fffeffeeff1b00faffc3ff02001500b8ff0500c0fffeffc5ff1100
3d000a001e00f9ff4e00f1ff1b00ebff0000280013002100dfff1200f5ff17000f004e001e0011001c00f2ffc1ffb1ffedff2c002f0061ff2c00f5ff2b001900
b4ffeafffcff1a00e9ffa1ff0600250003002e002b000e0004001c00fdff1900e2ff0a001e000d001300eefff0ff0700f5ffecffcefff8ff30001600dfffdcff
1e001400f6ff1c00b7ff13000b001d000800aeff4400c7ffebffe6ffbeff0200aaffcbffa2ffd8ff36000e00ffffd2ffebfff8ff090088ffeaff000001004c00
feffebff0b0016000000f8ffd1ff0e005600b1ff3bff190090ffd4ffc8ff7aff0c000700e4ff3400e0ff07000d003000f0ff1b001300e4fff4ff4900e0fff5ff
e3ffc1ff0500adff430012002100ddfefaff9dffeaff170008004100e2ff0b00ecff2a0092ff280014001600deffc5ffcbff130086ff280091ff1b0032002400
ecfffbfff9ffe2ff1a00dbff1600210074ff2100e6ff1d00d6fff0ff19fffeffacff0e00000020001f00dfff81fff8ffcbff2400fcff0100dbff1e000c002c00
1300f6fff6fff9ffe7ff9cffc0ffffff000019000e00f2ffebff39001d00c9ff04001100d6ff1c0036000100b3ff3fff180039000f0019009aff62ffb2ff0e00
3800edff12000d00ccffccfec9fff1ffefff1f00f4ff2700e1ffdaff2600caff1700200001002500e9ff2c00ddffc6ffffff1700b6ff0000c0ffecffd7ff0200
00000a000a00370020001a00adff1200f7ff20001600f2ffffff1400020026001800400018003f002400f7ffc7ff95ffd6fff8ff270068ff0600efff37002100
bdffd2fff6ff2500f4ff9bff06001a00130036003b002100ebff0f00f0ff14001c001e00170049001f00d1ff0a000d001600ddffd0ffe0ff04001d00f1ffe2ff
130002000b00160098ff010007001c00feff97ff2900bfffccffdbffb9fff3ffb5ff0500e0ffe9ff2400feffe8ffdffff7ff4500040042ffedff300003004c00
fcffe7ff1e000700edff0f00deff37004800b8ff36ff20008affbeffdeff73ff0c002a00f6ff3500d9ff240012001000e0ff2000120000002c003c00d6ff0600
0f00d5ff0e000600250025001400e8fefcff99fff9ff24000b004600defff8ff130018007cff290020001d00edfff7ff24007cffb0fff0ff9bff3f0040000100
1a00f6ffeeffe4ff1d00caff130016007bff1200ccff0900ebff1b0017ff1000a8ff0100edff1d001000efff62ff0f00e9ff26000a00e7ffe3ff220000001b00
0700fbff00000400efff8fffcdff030019001b001200e7ffe3ff39002800cbff04001300ceff16001c000100d5ff61ff350038000a001b00a8ff63ffbaff1800
3f00ebff1e001700d9ffc3fee6ff000009000300f4ff1d00bfffe5ff2a00c0ff1d000000fdff0100f8ff2700efffcbfffaff1e00b9ffafffbcffefffc5fff9ff
20ff1600d0ff27000f002600dfffdefff5ff1e001c00f9fff1ff0700f1ff26000e003a00170025002c00e6ff0e0081ffcdffffff2a0066ff1400e2ff2d001c00
dbffd8ff0b001800f4ff92ffffff1500fdff290022003800efff0700ddff210013001600160053000900d9ff03000e00fdfffbffd1ffedff14001a00fdffe6ff
1600fcff09002200a1ff0000000018001f00b5ff2f00b9ffd5ffdfffb6ffe9ffb1ff0100eeffeaff2b000000ecffdafffeff4100120067ffefff2400ffff4d00
fcffecff09002600e7ff0b00eaff3a004600b9ff37ff220092ffbdffd9ff78ff0b00150006003500e1ff1b000d001400dbff25002000f8ff27004600ddfffbff
1000e7ff0d0012001e0014000c00dbfefdff9affe7ff1b0010004d00f5ff0c0015002c0094ff240031002700edffe8ff1c000500b9fffdffa1ff340033000c00
1f00efffefffefff1e00a6ff24002a0078ff0d00e3ff0400e5ffedff18ff0c00b5ff0000eaff1d000a00faff84ff1200faff25001c00ffffdaff22000000ffff
2400faffedffecffeeff9affc9fffdffffff14001200e1ffe8ff33001900cbff07001700dbff17002d000600ccff5dff210033000d001f00b0ff68ffbeff0500
4a00f1ff21001200d8ffc9fed9fff6fff0ff1200f3ff3600dfffe1ff2100e5ff29000700f9ff0700d7ff2e00e4ffcaff25000e00b2ffb1ffc1ffd0ffbbff0500
15000e00dbff190010001b00e1fff8fff5ff15001b009e00daff1500ebff2e001a002800200026003500edff0c00a6ffe5ff00002c006aff1a00e8ff32001500
cbffe3fffcff1700eaff8cff090013000b0025002d001600e5ff1100fdff1e0013000c001f005d001300ddfff9ff1300edffe7ffbcfff7ff12001400ecffe6ff
1e0006000a001f00b5ff2000020014001b00b5ff2400eaffd0ffe2ffbbffd0ffb1ff05000000e8ff19000d00faffd8ff0b00400015005cffe9ff1f0005004900
f9fffdff1c002000ecff0f00deff35005000d6ff3bff260090ffc5ffceff81ff12001c00ffff3200e5ff11001b001500d6ff30002000080023004900eaff0b00
0d00d3ff080014001c0007000e00dcfefaffbdfff2ff270006004100fcffdcff11000e005fff3e002b001f00e3ffe8ff1200bdffbffffdffa2ff340034000b00
11000100f9ffe1ff2000dcff1c001e007aff1600cbff0700e8ffeeff16ff0500bcff0900e6ff1f001800dfff72ff0a00dbff1b000e00e8fff3ff1c0000002100
20000b00f3fffdffd8ff8effcefff6ff0f001f001800dbffeaff2f001f00cbff02002300d7ff11002500fcffcfff62ff2e002c00fbff1c00c0ff68ffa8ff1000
4500eaff1d000000ceffcafec8ffecff0500eeff03002000beffe1ff2300edff28000e00f8ff1400e5ff2200f9ffcdff00002a00b6ffb5ffc2fffaffbdff0d00
17001900eaff160020001e00ffff0200f4ff38001b001100efff0600edff2b0023002a00160018001f00ecff0200c4ffe8fffcff280079ff0200f6ff35002200
c5ffd4fff2ff1400f5ff9ffffeff12001000260013001800ffff4700f5ff25000600130017005a000e00edfffeff0c00dcff0100c7fff7ff18001500daffe0ff
2700050008001d00b7ff1c00040024002f00beff2900c7ffcfffe5ffb7fff8ffa8ff0600feffd9ff310002000000d5ffd0ff380016005fffe5ff1b00f5ff4c00
f8ffefff05000800f3ff1300e5ff35005400c8ff35ff150095ffcbffd0ff81ff1000080000002d00d6ff030011001500ceff73002300000018004600e2ff0100
0a00cfff0a00090019000c000700dbfe0100d9fff4ff140010003100dfffe7ff18001e004cff190034000800ebffddff06000600b4fffaff9bff300038000e00
09000400f1ffe8ff2300cfff1d001d007eff0c00e2ff2100eaffe7ff16ff0700b5ff2400eeff26000400ffff72ff0500e4ff18001000fbffe3ff29000b001100
20000500effffeffdbff8fffc1fffdfff7ff19002a00eefff7ff33002a00c9ff00001e00edff0700f4ff0100d0ff5eff1700230012000a00bfff68ffaeff0d00
4600e6ff13000b00cbffccfeadfff0fff9ff100005001e00dcffe7ff1b00f7ff1e000400fbff1100e6ff1b00f7ffcbff02000500b7ff0b00bdffebffbaff0a00
2600140007001100250012000500f1fff7ff180023001400e9fffdfff6ff2500110028001d0022001a00d3ff1900c6ffe2ff0200280079ff2900f4ff3d004700
bfffe9fffbff1700eeff9ffffcff120009001a0024001600efff0900f5ff2700e9ff140019005d001d00ebff0a000200e2ffe7ffd7fffaff18000f00e0ffdfff
2200030000001200a1ff16000e002a000c00deff1e00d7ffbeffddffb8ffdeffacff0200f2ffdaff0700ffff0500e0fff6ff34001c0043fff6ff1a0000004600
faffefff1c000d00eeff0d00d7ff2a005a00d2ff3cff0b008fffcfffd7ff7fffffff1200f9ff3500d5fff2ff1a001a00cbff2f001c00fdff14004700d8ff1000
1600d8ff07001500170012001100d5fe0900c0fffaff1e000d003500e7fff6ff0e00120097ff180039002900eeffc7fff6ff0d00abfffaff9eff2a003a001600
fbffedffeaffe5ff2200e4ff2500230081ff2300daff1b00ddffeaff1aff1800c0ff0300f2ff2e001800f2ff73ff0300e2ff03000800f4ffdfff060001002600
11000600e6ffddffc4ff8cffd4fff0ff0f001e004700e9fff5ff32001f00c9ff0d002100f7ff1000e0ffffffd3ff5bff0500380008001700baff67ffb4ff1d00
4a00e4ff21000000d3ffcffe87ff0400f3fffbff15000e00bbffebff2e00eaff2b000700e8ff0d00ebff2400b8ffcefff4ff1200befffdffb6fff6ffb6ff2300
260008000f001500160003000c00f4fff8ff1e001e001900fafffcfff4ff280003002e00130014002700f1ff0000c7ffe4ff0d00290074ff0400faff33001a00
b5ffdaff04002400f9ff9bff080011001a0023001a001600f2ff0800fcff2100f6ff110008005a001600dafffdff0c00e3ffdbffc9fffbff29001300c9ffdbff
0e00010000001c009dff0100070022001600c8ff2300b6ffd1ffe6ffbdfffcffb4fff3ff0200d7ff250004000700d8fffbff1d001b005fffe9ff1500efff4700
fafff9ff05001900ecff1000ecff27005300dbff32ff160097ffd4ffe2ff83ff0700fafff7ff3800dcfff1ff1e001e00cfff1c002700040006003f00fdff0600
2400daff0c00c9ff1c001000ffffdbfe0800bfffeeff120005003600e1fffbff1300270095ff1f0035001000e7ffc8fff9ff1100acffc4ff9cff250026001400
ecff0d00fcffe6ff2300f0ff09001e007dff2400eeff0500e4ffe2ff17fffdffbbfffeffe9ff1f00f9fff3ff53ff0100daff1b0013000100dbff19000f000600
30000b00e5ffe6ffdcff92ffbcfff9fffbff13003400d9ff06001f001600c5fffcff2b00e1ffffff7dff1200f5ff42ff06003100fcff11009aff64ffabff0e00
3e00edff26000d00d0ffc8febffff5fff5ff100025003400e1ffe6ff1f00efff2d000c00e5ff0700f2ff2100feffcafffeff0a00baff0400c4ff0100c0ff4100
1c000700150010005800f2ff1600eeff14001c000e001f00fdff1e00fbff2800010037000c0019002900eeff1200adfffbffffff2d006fff3500f6ff4100eeff
deffebfffcff0c00d8ff9ffffdff0d000500360022001900faff0c00f8ff3400ddff0d000b002e000e00e6ffe8ff0f00e8ffe4ffd3fffdff23001900d9ffd9ff
14001b0006001800a1fffefff7ff25000800c1ff1b00bcffdaffe0ffb8ff0000b2ff67ffe8ffd1ff3a0008000f00d9fff1ff0b000e0081ffe7ff0e00ebff4500
f9fff3ff0c002600f1ff1a00d6ff19005400c7ff39ff180087ffd6ffbeff81ff1d001800f3ff2700d7fff8ff1a002c00daff1d002600f6fff6ff4000eaff0b00
3000d2ff0d00160026003b001700dffef7ffa5fff4ff1c0008003200d8ff080005001300bfff400033002100f0ffe2ffe9ff1b00a1ffecffa4ff300020003000
0900f1ff0000d8ff1d00e7ff05001a0074ff2500c9ff1f00c1ffd2ff17ff0a00b3ff0400ecff27001300e3ff56ff0200ccff0d0000000100e5ff1f000e002900
1a000400ccffd2ffcaff82ffcafff9fffeff0d003100e6fff5ff2c001400c4ffffff3000d1ffacffaaff0d00d9ff4eff05003900f1ff1600bdff5effceff1e00
1f00edff2900f1ffceffc0fe8fff0400f6fff0ff2e001100ccffe8ff2200e8ff25000300e4ff0500edff30000c00c8ff01000000b8ff0a00c2fff4ffcfff4900
2b0005001600150019000c001300eeff1b00210019001b00d9ff0b00f3ff21001e004100080014002000fbff0700c4ffe1ff34002c0067ff2500f6ff24001c00
bfffe1fff9ff0e00ebff97ff0b001400100023001c001200fdff1700f7ff2000efff050000002300fdffe7ffffff0800fdffcfffcefffcff46002100dcffdbff
1300270010001b0099ff0d000e0022000200a7ff1900e6ffe0ffe7ffc1ff0100adffe3ffecffccff250010000e00deffedff0d00ffff6cfff6ff0e00dfff4400
faffeaff0a00f9ff02001500e6ff12004c00c9ff33ff310084ffdbffabff7dff14001100f9ff2d00d1ff1a001c003200d8ff1a002800effff2ff4500fdff0300
0000d0ff140081ff2b0012002000d8fef9ffa2ffdeff140004003a00d3fff3fffdff2300beff1c0027001b00e0ffe4ffdaff20008bffd8ff95ff2a002d002c00
0900e5ff0000e2ff1f00e4ffe7ff2b0075ff0600f7ff2200c0ffd8ff1bffe6ffb0ff0600f4ff20000d00e3ff26fff3ffd8ff180001000b00d6ff280011001900
07000800f7ff0e00eeff94ffc7ff0b00f9ff1c001d00d3ffecff3a002a00caff00001f00d2ff14003f000600b9ff55ff1300310012001a00a4ff62ffa2ff1400
3600f3ff16000400cdffc7feebfff5fffeff0200f1ff2c00b8ffdbff2a00d0ff37000800feff3700fdff3a00e8ffc5ff04000700baffabffbeffe2ffe3ff0300
8bff2400f4ff3d001e002600c7ff0900f2ff250010001e00bbff1400fdff2b001800450015002c001b00fcfff9ff60ffddff03002c006bff0700dbff1e002200
c8ffd0fffdff1d00ffffa1fffaff1600030013002f002700f1ff1d00e1ff330021002000110041000e00deff0e000c00f9fffeffd5fff0ff03001d00eaffefff
1200feff080021008cff0c000c001f00fafff1ff3000c5ffc3ffe0ffbbffedffbcff1300e9ffedff27000d00dbffdffff6ff460009006fffebff2b00f8ff4a00
fbfffbff0e001800f9ff1d00f8ff3c004b00c4ff31ff150083ffcbffd0ff70ff0200250003003700d9ff2d0011000d00e8ff16000f0008003d004b00bcff0600
1f00caff17000d0026001c001100e1feffffaefff3ff1a001b005300ebffd4ff1a001b0049ff230036002600f4ffdaff2e0091ffb5fffcffa7ff3b0048000700
2600f6ffedffebff2000c2ff1c001d0080ff1e00e8ff0400e4ffe7ff16ff1000abff0700e1ff16000400f5ff76ff3000f0ff31002800d5ffe4ff2300feff1600
1500fefff4ff0700ebff9cffbfff190003001d000d00daffccff33000b00cbfffcff1500d8ff22002d000d00bbff4dff2500340005001d009bff63ffa4ff0400
3d00f6ff24001000d9ffc9feefffdffff0ff1500f0ff2e00e8fff1ff2300deff19001800feff0900eeff2900f4ffc6ff06001000bdff0a00c5ffeeffe0ff0f00
0f001000eaff2b001d001e00cbff0100f7ff260020000c00ddff1700ecff2e001c003c001a003d002a00e5fff3ff70ffcdfff3ff2c006aff1700dfff41003300
dbffe6fffdff15000000a1ff0a001300100029003d00310000000b0008001e000d0018001b0058002600c9ff0a000c00fbffd8ffdbffe8ff0b001300e5ffe5ff
1e000e000d002800b2ff08000d0026001300acff2000c9ffceffe9ffb7ffdeffafff0e000000f0ff13000f00efffe0fff4ff460002005cffeaff2a00f6ff4b00
fbfffcff3d000100e5ff1000efff38005200c4ff35ff17008bffb4ffd5ff78ff0b003300ffff3900dcff26001c001300d3ff10001300feff2f004300e3ff0300
1300c7ff0d002200270011001600d8fef9ffa1fffeff23001a003e00defff4ff23002f004fff2d0035002c00edffebff31001700c0fffaffa1ff3d004e00fcff
1e00f8fff4ffe9ff1b00cfff2300190082ff0f00ccff0000dfff150019ff1800acff0800e5ff25001400f3ff81ff1700efff27002100e0ffeeff2a00faff2400
15000000f7ffe3fff1ff9bffd8ff0c002e001b001c008bffd8ff32002c00d2ff08002400e1ff16001400f9ffd9ff5aff2e00300007000e00adff68ffb1ff0c00
4a00eeff34000500dbffc5fee2fff0fffaff0400f7ff1800afffc1ff2500deff30000300feff1b00e9ff2f00f1ffcdff0c000500baffe9ffb2ff0000d6ff1100
dbff2100a3ff25001f002100e8fff0fff7ff270017001d00edff0000f1ff26001e00270027002f004600f2ff0d005affeafff8ff2d006fff0c00eeff32003f00
c3ffe4ff11001100f4ff9bff000011000b00130034001e00ecff1300efff29001300080026005b000d00d6ff0d001d00f0ffedffddfffcff01001200e0ffe6ff
2200ffff0e001600aeff1a00030028002400c0ff2700e3ffc2ffe5ffb9ffe8ffadff11000100e8ff38001400f9ffcdfffbff3e000e005ffffbff24000d004d00
fbfff5ff2c001400f1ff1300e5ff3c004e00cbff33ff240092ffc3ffc4ff78ff1100160003005900d9ff1c001e000600e1ff32002b00faff27004300fefff2ff
0c00dbff09001500240014001100d7fef3ffbffffbff220012003000f9ffe6ff1200150079ff0a0037002a00e8ffe6ff1d00fbffbdff0000a1ff390042000900
1800f8fff4ffe1ff1f00c7ff2d00400078ff1200eeff0100e8ffeeff15ff0900b2ff2700e6ff19000c00efff80ff2300eeff270017000200efff1a00ffff0200
3a00f8ffecff0300e2ff94ffc0ff1200100012001a00f1ffd2ff2f003200cdff00002000d8ff08000100f2ffcdff58ff32002e0003001900b2ff67ffbaff4100
4a00edff1e001f00cfffcafee1ffbfffe9ff0600ffff2200e0ffe3ff2300ddff22001700faff0700e5ff31000100ccff32001100b4ff0700beffe1ffe1ff1700
36001400e8ff19003e000600e7fff6ffebff27002a001f00e7ff1700f3ff240017001a002b002e003f00e1ff90ff4effe9fffeff2a0074ff0300eaff3f002500
bdffe0fffbff0b00f1ffa6ff0e0010001f00220033002500e0ff3700eaff210006000f0021005a000f00e8ffeaff0900eaffeaffeafff8ff18001100dcffe5ff
4f000a00f7ff0f0092ffd8ff080022003900d0ff1a00c3ffdbffe1ffb7ffdaffa9ff0c00fcffe2ff1600fdff0800d8ff1c003c000e0072fff0ff2000feff4900
f9ff06001b002900efff1a00d2ff32005700cbff3aff090092ffc7ffc4ff7aff0200260001002c00d9ff0c001b001300d4ff23001f000a002800410008000100
1000d9ff0c000c0021000d001400d3fe0500d3fffeff1b000a003400fdff0000120039008eff470038002f00e8ffeaff1300afffb6fffcff9fff33003b001100
0d00f2ff0200e1ff1d00deff2f0031007eff1800bbff0f00e5fff2ff18ff0d00b7ff0000f3ff28001f00edff6dff0700e7ff12001900fbffdfff270000003a00
2a00ffffe9ffefffdcff8dffdcff03001b0019002400e6ff01002a003100d4ff1c003000d6ff0800edff3f00c8ff4cff19002d00f5ff0a00bcff67ffb6ff1300
4a00e3ff2f000000cfffc8fed9ffe5fff8ffedff10003000a5ffdeff2000f7ff40000000f9ff0000f9ff17000200c9fffeff1700b8ffe8ffb8ffe6ffe0ff2400
1a0019000a00150017001300f9ff0a00ebff240024001c00f1fffefff2ff1d0019001b0023001d001500d6ff0f006bfffcff00002a007cfff4fffaff2e000a00
b4ffcfff0b001b000c009fff020011000800280027001200f1ff1200fcff1200f7ff10001f005f002700f5fff7ff1300e6ffedffe1fff9ff10000f00e1ffdeff
2a00fefffbff2c00a1ff1c0009002d001700e0ff1a00baffcdffe4ffb6ffeaffa6ff0000f9ffd6ff2a000c000b00d4fff6ff2500150056ffeeff1a00dcff4800
f9fffaff13000400f4ff1800dcff28005200c1ff41ff2d0091ffd0ffc2ff7bff0600190001004400e7ff050025001200dbff31002b00eeff10003a00f3ff0b00
1c00bcff0900bfff1e000e000300d6fe0300bcffefff16000c002d00e2fffbff0c0026009dff31003c001300e3ffe2ff0e000a00b2fff9ff96ff32004b000300
09000000fdffd9ff2200d2ff39002c007dff2400f4ff1800dbffd9ff14ffa8ffb5ff0500eeff1c001800ecff62ff0600e2ff130019000300eaff250002002d00
3400e9ffe8fff1ffdeff93ffc1fffffff8ff1b004700eafff5ff31001100d1ff01002200eeff18004fff0000d5ff48ff0a002700feff1000baff64ffaeff1100
4b00f3ff23000600c8ffcffeb2ffe1fff1ff13001f004300e4ffe3ff2200050031000f00f9ff1200fdff1c000c00ccfffeff0300bdff0600adff1700e1ff3300
2a002200010015006600ddfffcfff6ff0300260026001d00fdff1b00f3ff25001d0025003f0018002700e2ff0e00c3fff3ff0d002b0078ff1d00f8ff40001900
d0ffd0fffeff1500d3ffa5ff0c000c002c0020002e002900f1ff0b00ebff2d00d3ff14001a00510022000800f1ff0e00f6ffecffdafffaff20001200d2ffdeff
2200120005003300acff1100130034000b00cdff0b00acffe3ffeaffbcfff9ffb4fff3fffeffd7ff2c0013001400dafff4ff1f00120038fffeff0e00eeff4500
f9fff5ff11000b00efff0d00d8ff18005900ccff36ff1c008effd4ffb7ff83ff0e001c00fdff3f00f4fff3ff20002100d4ff17002400100000003a00e7ff1200
2800d8ff0a001400210012001b00d7fe0000abfff2ff1e0010003800e6ff00001500120097ff260033003600f3ffcafff7ff1100b7ff000090ff36004a001d00
ebfff8ff0700e6ff1e00f2ff180031007aff7400c9ff2000c7ffe3ff18ff0000beff0100f1ff22001700e9ff71ffffffc8ff17001500f5fff8ff1d000c001700
17000e00d8ffdbffd0ffc8ffd8ff010000001e003500e9ffedff3e001b00cffffdff2d00e0ff0800c6ff0000dfff4eff01003f00ffff1b00b7ff69ffb5ff1a00
4800e2ff2f00faffc4ffc3febfffdefff8fff9ff2b002000c5ffe5ff2600f3ff3b000b00f2ff0500feff1b001300ccfff5ff2000beff0800adfff1ffe1ff6400
2c00110008000a001800e5ff1100f6ff0c00260012002600fbff0d00f4ff2d0011003e0015001b001000efff0400adfffcff0d00300071ff2100f4ff3a002800
ccffd0ff000012000500a5ff0d000b001800230018002500fbff1500f3ff1d00e6ff180007004a00fdffe3ff07000d00f8ffd7ffe4fff8ff39001a00e0ffe4ff
2000120003001b00b4ff0d00090028000a00c4ff1f00e9ffe3ffe7ffbefff2ffb4ff1000faffd0ff280009001800e2ffedff1a000c0043fff8ff2400e0ff4500
faffeeff03000800f5ff1500e8ff13005400d6ff33ff29008bffd2ffc2ff7bff0e000500feff3600d3ff000024002100d8ff13003200eeffeaff3b00eeff0500
3800d2ff12000b002a002b001f00dffef6ffa8fff3ff220012003200c4fff2ff07002d00bdff1a0040002000f3ffdbffe8ff1400a1ffe9ff9cff2e003e002800
f1fffcfff9ffd9ff1e00dfff21002f0070ff1c00eaff2000afffd7ff16ffacffbcff0000e7ff21000d00e4ff65ff0a00d9ff21000f00fdffecff2f00ebff0e00
2000fdffd8ffccffd7ffc1ffabfffbfff6ff1a003100e7ffe6ff25001300c9ff0b001d00ceff1b00effe0b00c6ff25ff01002c0000001300a9ff61ffb5ff0d00
3100ffff1100f4ffd4ffc2fee0ffeaffedfffaff2f002000e7ffe8ff2a00c1ff25000400f1ff0a00f4ff04000700c7fffcff0700baff0e00c1ff0100edff5600
2700150015000c001b00d6ff0d00daff2b002a001e001a00ddff3300f3ff2b0015004900310017002d00e7ff0d0058ffcbff32002f006bff2f00010035003800
baffd5fff5ff1b000c009cff0a001e002b0029001b001400f7ff2300ebff0b00b9ff12001d003b002f00f9fff2ff0400f9ffd6ffdeffffff3a001600ceffd5ff
1a000a00f9ff1b008eff02000e0031000800b3ff1a00c9ffe1ffe4ffc3ff0200a7ffccfff4ffd3ff26000e001a00dfffd5ff1a0004002effe4ff2d00e5ff4200
fefff9fffdff1b00e9ff0e00e2ff0d004c00b9ff40ff2c0082ffd4ffa9ff76ff10000f00f6ff3800d0ff100012003300dbff05002e00f7fff4ff420008000000
0b00bcff0e00a5ff24001c002200d9fee1ffd3ffeaff1f000b003c00bdff0300ebff2100d0ff240027002500dcffe3ffc4fffeff99ff04009bff2a0027001f00
effff4ff0600d5ff2000e5ff0c00170066ff2900e6ff3000e2ffe4ff1cff0400a7ff0600020028000900ebff5aff0200beff1b000c000400daff2b0001005a00
1700f7ff11000000f2ffeeffbeff2500100025001c00eeffdfff32001800cfff00001b00cdff1c0030000e00c7ff52ff0f003f0013001400a1ff5effa5ff2200
2d00f7ff2500ffffe3ffcdfefbfff5fff7ff1200bfff3100e7ffc9ff2a00ddff1600050003004400e5ff1f00e3ffc6ff06001c00b9ff0900bdffdfffeefff6ff
2b0019000b00370026002e00cafffaffe3ff220011000100feff0800ffff2b00240045001d0041002d00f0ffdbff69ffd1fff1ff2c0060ff1000eaff3b001400
c1ffdbff02001f0001009dff00001100050013005d002000eaff1c00ebff08000e000e00180020002600e4ff0c001900eaffe6ffe8ffebff01002100d7ffe7ff
190000001a00110085ff15000d0019001300d5ff3100bbffc2ffdeffb7fff5ffbeff1f00ebfff8ff34000d00c4ffd5ffeaff4700ebff5bffe9ff3100f5ff4900
fbfffaff20002600f5ff0800f1ff37004a00b7ff38ff2f007cffc7ffd5ff72ff08003700f6ff2600efff2c0014001800ecff10001600fdff50003d00e1ff0900
0d00d1ff1500f9ff260014001400d0fef3ffd0fffbff25001e003c00ecff040020002e004aff310033003600eaffd2ff410093ffc1ff0000a0ff47004e00ffff
1a000700fdffd2ff1300dbff27001f0082ff1a00d8fff9ffe9fff4ff19ff0a00b8fffdffedff0e001100eaff31ff2900e9ff2f001700fdfff3ff200002002000
1400eeff00000500edff9effcdff24001a0024001300c5ffecff2f002700caff03002200e2ff1a001c000300cbff4cff1d002c0004001b00acff5fffa0ff1800
4100f3ff2500f0ffe6ffc9fef7fff9fff3ffeaffdeff2d00b0ffd1ff2900e2ff2d0010000400fcffedff3800f1ffc6ff06000500baffffffb6ffedffeffffdff
11000a00faff2d0015002b00f9ffecffdfff2e001e00220001000a00e6ff2500140034001f003f003000ebfffeff50ffddfff6ff2f006cffe1ffe0ff2f001300
daffd5ff09000f000600a3fffdff13000800210025002d00f0ff1600e6ff2e0012001400190041001500e2ff0e001a00f4ff0700f8fff5ff0e001a00deffe0ff
0f00faff0e002a009cff070008001900fcffe2ff2700bbffcaffe5ffbaffedffb3ff1c00f1fff1ff1e001300ddffd6ffedff3f00fbff59fff3ff2800f2ff4700
feffedff35002d00f9ff1f00070036005000beff42ff1a0086ffaeffb7ff78ff0d002a0008003000e7ff32001f000500e8ff1d002000f9ff45003d00b6ff0b00
1a00d2ff0800faff210018001700dcfef6ffacffe0ff1f001f0041000200e3ff26002a004eff210037003700eaffe7ff37000000bbff06009fff3b0047000400
1c000500edffecff1d00cdff1b0025007dff1000eaff0b00dbffecff1aff0800a8ff2d00eeff12000400b9ff79ff1f0000002b001700e9fff8ff2000fbff1000
2f00f0fff1ffd9fff3ff96ffbdff26001f0013002400d6ffe5ff30001f00d5ff01002200ecff140023000600ccff53ff1b0032000e000300abff63ffb1ff1200
4600f6ff24000a00e7ffc6fefdffd6fff5ff1e00f4ff3100e2ffb8ff2b00d6ff2f001f0000002100f9ff1c00ddffc9fffdff1400b5fffdffc1ffe9fff1ff0b00
29000c00f9ff220024001c00cdfff7ffe6ff260027001800f6ff0900eaff29002d002e00230041003400ddfffeff67ffedfff5ff27006cff1c00e8ff36001900
b4ffe1fff7ff0b00fdffa4ff0f001100170035004e002a00d3ff1200eeff0f0003000900210042002f00d3ff06003100eafff3ffefffedff11001b00c8ffdbff
210000000a001c009dff070007001c001b00b5ff1700e0ffcaffe8ffb4ffd6ffaeff16000700f4ff22002700faffc8fff5ff3f000b0072fff6ff2a0000004c00
fafffcff6c000f00e6ff1b00eaff30005300c7ff41ff19008bffbdffcdff75ff0a00380001002f00d4ff230021001300eaff10002100fbff2e004500f0fff6ff
1600c5ff10001500290009002000d1feecffb3ff0b0024001b003000e7fffcff1700380050ff270032003500e5ffcdff4200fcffb0ff0300a6ff3c004a000000
1100fdfffdffd2ff1800c8ff28001d0082ff1900cefffdffe5ff0b0016ff0b00b8ff0e00f1ff16001f00fcff68ff0d00e9ff17002300fefffeff250006002900
3500f8ffe5ff0100e2ff93ffddff2800b7ff19002300e1fff2ff3b001600dfff2e003100d1ff11000f00f2ffccff51ff1f0034000a000e00c7ff6bffaeff0e00
4900f0ff32000800ceffc6fefafff8ffe5ffffff080030009fffcfff2900d9ff53002500ffff0400e2ff1e00faffc8fff7ff0100b0ff0200abffebffeeff1500
16000f0002001e001e00fbfff7ffe8ffe8ff2b0026002100f4fff5ffe8ff27002d0022002e0036004a00ecff110063ff0b00f6ff2e006ffff3fffbff2f002400
acffcffff6ff0700f7ffa5ff09000b000c00350032002900f1ff2700f5ff3800020004001e0056001300e9ff0e001600f3ffecff0600fdff0f000e00e1ffdcff
1c0005000e0023009bff0f000d001b004200bfff1e00acffa7ffe4ffb8ffe3ffadff15000c00e4ff150026000a00cfff10003400040053ffe5ff2400f0ff4a00
fdffd9ff3e001000efff1a00ffff2f004f00cdff40ff20008fffb9ffc1ff74ff09001c00feff2d00e9ff18001a001600edff0d002f00e8ff2a00410007000600
1500baff0900bcff27000b001200e0fef6ffccfff9ff220016003000f9ffe6ff13001d006cff0e0037002800e8ffe8ff3300eeffb8fff0ff9bff32004900ffff
1500f1ff0100d7ff1a00c7ff41003e0077ff0c00f5ff1b00d2ffdfff11ff0500b3ff0a00daff1b000400f8ff71ff0400f8ff26001300f2ffedff27000d00f5ff
4100e3ffe9fff9ffe7ff9bffc0ff28001e0017003900ecffe7ff36002500d0fff4ff2900c0ff0600d2fffdffcfff4cff00002e000900f9ffbbff62ffc1ff0600
4700e4ff38001a00dcffc3fec9ffdbffebff00001e002100f2ffdaff2600e6ff3000170000000800efff0b000000cdff17001000acff0d00b7ffe8fff4ff1300
2c000d00fbff24007200e6ffeffff2ffe2ff260024002300d7ff1600f2ff24001c00180033002a003100ebff1d0066fffcff02002b007bff1300f1ff3f002500
d1ffc6fffcff1400d8ffa6ff2e00070034002f0044002f00eaff0c00f0ff0c00f3ff07001a0059001b00cafff2ff0b00f7fff0ff1500fdff26000f00d5ffd9ff
33001300e6ff1800b0ff0e000d0027000f00d0ff1200c7ffd0ffe6ffb1fffbffa6ff0a00ecffe0ff1f000c001700d4fff6ff2b001e003dfff3ff1c00fbff4600
f9fff4ff1d00fafff0ff1500c0ff20004f00cdff3aff090088ffcaffc8ff74ffc1ff2a0002003900f3ff04001b001300e9ff0f003c00d5ff1200480002001000
0f00d1ff0800f9ff260010001e00dffefbffb1fff8ff1500100036000500fcff0900420072ff290036002300d5ffecff1600baffb2ff070099ff2a003e000f00
010025002700deff1d00deff2d004b0076ff2e00b2ff1200caffebff12ff0500b3ff0800e7ff1c000b00e6ff7bff0c00f5ff1e001200f3fff9ff2b0000004100
37009efff9fffbffdcffafffddff1300160021004400f1fff7ff3a003700ddff0b002e00e7ff0c00e2fff3ffcaff48ff0c001f00edff0d00c0ff6bffa4ff1500
4d00edff37001d00cdffc5fed0fff2fff6ffb3ff26003500bbffedff2b000a0034001300f5ffffff04000d001200d4fff3ff0e00aeff0d00adfff4ffefff2400
2f000c000200140025000000f7fff5ffe1ff2c0019002000ebff0200f6ff2d0029002b002d0024003d00eaff23009ffffbff0e0030007cff1a00000025001800
c0ffc1fffbff1f00f4ff9aff18000300300023002d001c00eaff0c00f9ff2200f8ff02001e0052000f00eaff02000b00fbffefff0000fcff2a001100d2ffe1ff
1b00010000001900adff14000d0002001500b7ff1d00dbffcbffedffb8ffebffaffffefff5ffcdff2f000e002400d1ffefff1d000c0057ffe5ff2300eeff4600
fdfffbff24002200f3ff1400f8ff23004c00bcff41ff150082ffcfffc7ff7fff07001200f9ff3f00d2ff100020001400e1ff1b002100faff08004200eeff1e00
0f00c3ff0c0003002b000f001700dbfefaffbffff4ff250019003400f1fff6ff0b0031005eff240037001c00f7ffe0ff0400f1ffabfffbff8bff3a003f001500
1800efff0a00e0ff1e00caff3500400076ff1a00faff1900cdffd4ff10ffb1ffb6fffeffd8ff21000300ebff5bff2000f7ff22002000e6fff8ff2e00f6ffffff
27000b00cfffecfff4ffa7ffbdff1a0001002a003300ecffecff3b002600cbff02001600acff160021ff0200e7ff33ff0800280007000a00c5ff68ffa6ff1b00
4500efff15000500d3ffc6fec7ffecffeaffe7ff2d002b00e6ffeaff2a00edff2f00fbfffdff0800fdff06000000cafff9ff1000abff0b00bafffdfff5ff3100
2d002500190016002e00ccfffeffe6fff5ff220017002700eeff2a00f7ff2c00240039000a0018002f00afff2f00b4ffdbff240033007cff2300feff3e001f00
b2ffcefffdff0f00edffa6ff120010003600260024002600f7ff1400f4ff0a007fff0d001f0049002a00fafffdff0300faffdcffe7fff7ff4f000a00cbffdaff
21000c00f0ff2400beff0700190026000c00c2ff2100c0ffd5ffe4ffc0ff0000adfffaffe6ffd2ff210006002700dbffe0ff1f001b0020ff04002e00f3ff4400
fdfff4ff11001800f3fffdffe8ff16004d00c3ff3dff14008dffc8ffbdff7cfff3ff0c00f3ff3100deff130021002400ddff170040000700ebff4100fbff0e00
1300d6ff0a00fbff280033002400d8fef2ffc6fff6ff2a0015003400d1ff0300faff320094ff2c0039003a00e0ffe7ffd9fff8ffa5ff020089ff3b0038002300
f9fff5ff1800d4ff1a00e8ff2f00210061ff2700c7ff1d00bcffd8ff18ffe6ffb1ff0200f0ff23000d00f5ff53ff0600bcff29000c00fffffcff2a000f004800
1600ffffdbffd2ffd2ff9dffd5ff0000060038004700f4ffe3ff4e001100d3ff110023009dff0500dcff0800b8ff32ff1d003000fbff1800b9ff6dffb4ff2400
2b00e5ff1e00f3ffd1ffc2fed0fff6fff9ff0f003a001900cfffebff2b00efff2e000100f2ff0e0000002600fbffcfffefff0900b0ff0800adfff4fff8ff4c00
30001700140016001300cbff0600f0ff0500260026002700e0ff2b00fdff2d001f004200100015000c00daff1f0067ff00003c0030006aff300005002f000400
b5ffc9ff03001b00160099ff150014001d001d0018001f00f4ff1700f6ff1b00d4ff11001d0043002200e4ff02001500f5ffdbffdffffaff51001d00c3ffd3ff
1e001f0000000d00aaff0700070028000100dcff1f00b8ffd6ffecffbdff0c00a9ff0e00daffd0ff320011002500d5ffddff20000d0038fffaff3000feff4300
fafff9ff0b000d00f4ff0700f1ff09004800b2ff3aff34007cffc9ffb0ff74ff01000a00fbff1f00dbff23001f001b00e1ff1a0043000100f3ff3b0009000200
11006bff13009bff240007001a00d4fed6ffc3ffebff220009003600cdfff1fff6ff270082ff1c0036000700dcffd3ffcbfff9ff92fffbff97ff290031000600
1500f9fff8ffd2ff2200e9ff2e002a006cff1600f8ff2200bdffd0ff17ffeaffa5ff0700edff18001600070087ff0800c1ff1c001000fcffeeff31000a000200
1300ebff09000000fdff87ffc0ff210003001f001100c1fff3ff30002b00ceff12001700deff230015000a00bdff53ff030032000c001700b2ff69ffb8ff1f00
2400fbff1300f6ffe9ffc9fef5ffefff0200f7ffc8ff4400caffb6ff2900f1ff3700170009002c00e2ff2600feffcaff07001500b1ff0900baffe9fff8ff0000
26001c000d00340017002e00efff0000e3ff2c00200020001600fdfffdff2f000e0049002c003b003700ffffb9ffb1ffcdff0200310066ffcefff2ff32001500
acffcaffffff1600fcff9bff010013001a0020004b00220004001200e2ff2b000b0001001e002f000f00eeff15001700edff0200fefffdfffcff2200d8ffedff
1500ffff12000f0097ff0c000f001b001500a8ff3100ceffbeffdbffb6ff0000b0ff1300f1ffecff36001d00c9fff5ffd2ff4300eeff71fff6ff2d00f9ff4500
fdfff3ff1f002400f2ff0a00ecff3d004b00bbff4bff1e0082ffc4ffc6ff75ff1c003a00faff2000d1ff2c0019001900f2ff17002f00efff5b004100d5ff1d00
1e00d9ff1100120030000d001800dafef4ffb6fffeff1e0028004000defff3ff190027004cff23002b003200eeffddff42009effc2fff1ff9eff50004400f9ff
2200feffefffe7ff1600d6ff290019007aff0600ecfffdffe9ffeaff19ff0d00bdff1c00e2ff1900f6ffefff69ff1c00e5ff29002c00e1ffebff20000200faff
2300e9ff06000b00f3ff1a00c4ff3500f8ff2b001e00e8ffdfff24001f00cbff02001c00bfff220025001300d3ff5aff1f003e000b001300b1ff65ff92ff1500
4300020028000800f2ffc9fe0800d8ffe9ff1c00e0ff4500f0ffc2ff2e00e6ff35000d000000f4ffecff1c00edffc5ff05001d00b9fff9ffc1ffedfff5ff0200
160017000800100023003300ccffe1ffedff2f001b001a00f6fff5fff2ff2e0025003d00200040002e00f2ffedffa7ffcbffeaff2d006cfff2fff7ff3f001000
bdffe2ff050010000700a3ff02000b00150031004e001e00e8ff1400e8ff15000f001f0014003f001500e5ff04000b00eaffe4ff0f00e9fffdff1600e0ff3c00
220000000f00200092ff040002001a001d00d1ff2f00a9ffc6ffcfffadfffdffb3ff17000200faff23002d00f1ffa8ffddff4200f4ff65ffeeff1e00f7ff4500
fefff4ff2a002200f4ff1f00d5ff3a004900b3ff4cff1a0082ffa2ffc0ff78ff0d003e00f5ff4100cdff30001f001500f8ff11001c00eeff53003c00f9ff0e00
1f00bfff0400fcff2b0018001800d6fedaffc1ffeeff1e0018003e000200fdff1600340051ff2b003e003d00e7ffddff4c00f9ffbffffcff9cff4b0047000500
19000000f4ffc5ff1800c3ff3e00220082ff1400cfff0900defff4ff17ff0f00b5ff0300f3ff18001200f1ff52ff1100dcff2b000800e0ffecff250008001600
1200e1fffdffe9fff7ff99ffccff3c0015001d002900d9ff03002e002700dbff36002a00b9ff1b000f000d00d6ff42ff180039000a000c00b5ff6dffb2ff1c00
4a0006001900f5ffe7ffc6fefdffe2ffe9fff9ffefff3b009dffa6ff2c00f3ff7f001e0002001f00edff2300e4ffc8fffdff0800b0fff3ffb8ffd0fffbff0900
1f0014000100330030002100ffffeeffe5ff2c002d001e009cfffdffdfff2c0019002e0015002b004300faff17002cffe3ffe1ff320065ffebff0a0033001900
adffd4fff9fff1fff4ff9bff080008001700270057001e00f3ff0a0002000c0006000000230050001700e4ff0e002f00f2ffe9ff1800fbfff9ff1600c2ffe8ff
0300ffff0f002100a6ff04000e001d001500c5ff2b00cbffc4ffe8ffb9ffebffb3ff10000c00f8ff18003100f9ffb8fff0ff3a00fcff7afffcff2500e7ff4800
fbff06003f001800fbff2100e7ff35004b00d0ff4bff2e007fffbfffbaff73ff17003700faff3300d1ff27001c001c00fefffcff2a00dcff48004000d9ff0600
0f00cfff0600ccff250016000f00d9fee9ffb0ffe0ff24001b0033000500f7ff1800210052ff2a003d003000f9ffd4ff5900fdffbcffedff98ff44004800f3ff
1900f8ff0100faff1800d2ff2c002b0080ff0300f8fff4ffddffe5ff1bff1800a7ff0b00cdff13000800f4ff84ff1400feff30002c00eeffedff20000600f1ff
4c00feffe7ffeaffe3ff96ffc0ff3700180015003300edffe1ff29003100d3ff0c002f00c5ff0d0013000e00c6ff37ff05001900feff0700c2ff6bffabff0100
460000002c001000e2ffc6fefcfff2ffccfff7ff13001c00f2ffcdff2800fbff4b0027000000feffecff2200e9ffc7fff4fff9ffb2fff9ffb8fff9fffaff1000
2c00f9ff020034004a000c00f1ffe9ffdaff2e002f001e009efffeffe9ff28002c002d002e002b004100eaff17007cffe8ffe9ff2c0071ff0500fdff39001900
c8ffd4ff07001000feff95ff100008002d000f005b003000eaff0000e9ffe7ff0700090020004e002600d4ff0e000000f5ffd8ff1300f9ffffff0e00d9ffd5ff
0900050004002800adff14001a0024003900b0ff1200c8ffbdffd0ffb0ffc8ffb0ff09000300f0ff230024001100daff04002c0010006cffe1ff250000004700
faffdaff2d000800d2fffdffd8ff30004c00c1ff42ff2f0070ffc3ffc0ff73ffffff4500feff4300ccff14001b001d00fbff08003500feff2c004500f8ff1400
1700cdff0600000025000b002300d6fee9ffb1fff0ff29000b002900d4ff060008004c0074ff2200320031000300d8ff4c00fbffaffff6ff97ff41004400feff
0e00ecff0700d1ff1c00d7ff2c0037007bff1700cbff1400e2ff0a000dff0800acff0a00d6ff12000d00f7ff77ff1a00f4ff27000c000c00faff2900fbff2600
4f00eaffd2fff6ffe6ff92ffe0ff3800160022004600eaffe7ff31001e00d9ff05002f00ceff19000d00fcffc7ff47ff16002700f8ff0f00beff69ffa8ff0a00
3f00d8ff48001100d1ffbcfef3ffd9fff6ffebff2c002c00a4ffdcff3300e2ff43002000fffffefff0ff0300f3ffd2fff2ff0000a7fff8ffa8ffe1fff6ff2600
35000100090015002700deffeffff3ffeaff31002e001600f3ff0a00e3ff2a003a002a00260035003900fdff2800c8fff5fff1ff360074ff0f000c0031001a00
adffcaff00000b00e3ff9fff0e000000290024004b002700e9ff0e00f9ff1600eeff070025005b002a00ebfff6ff0d00f7ffd3ff1800faff11001100e9ffe2ff
1300000006002600b0ff000019000d002d00b4ff1e00c0ffc0fff0ffb3fffcffa7fffffff7ffe1ff0d0020002500daffe4ff27001d0053ffecff250005004200
f8fff8ff17000200f4ff1000d6ff2f004e00d1ff45ff12006bffbdffb3ff6cfff8ff2f0000004f00d8ff230015001800f2ff14004800b4ff13004900feff0f00
1100abff0800f7ff270022001400dafef1ff9efff2ff0a0001002e00f1fffdff0200390073ff1d003d003000f3fff8ff2200e6ffb5fffdff8eff41003e001200
1000e7ff0100f7ff2200d8ff3d005d0069ff0b0008000c00d6ffccff12ff0400bbff0700e1ff1c002400f1ff7eff2100040021002a00f4fff7ff2c000700daff
5300b6ffb2fff7ffe3fff0ffc6ff2600f9ff1b004200e1fff1ff32002900d6ff0d001f00baff0c00e4fff4ffd4ff28ff0a002300effffdffb1ff64ffb2ff1900
5000070029001100dfffc6fef5ffe5ffe8ff0a0040002200f1ffcaff2d00060044002900f4ff0600ffff0700fdffbbffffff0900abfff2ffb5ffdefff9ff1a00
28001c000d00280040008efffdfffcffebff230041001e00b2ff1c00f9ff28001e002f00310034002200edff3100b1ffe6ff1700330075ff1400f3ff38002a00
c5ffd7fff6ff1d0000009dff4c00ffff3f0032003c003400ecff0900f5ff0c00dbff00001e004f003900e2ffffff0800f3ffccff0300030022001300daffdaff
19001600ebff2400a1ffefff0e0030001400b4ff2100bcffc7ffdeffaeffe7ffadff0500e8ffd5ff1f0010002f00dcffe6ff2d00170069fff0ff230010004600
f8ffe7ff12000e00e6ff0200baff1c004c00caff41ff0e0088ffc5ffbeff7bff130020001a003b00d7ff0c0017001b00eaff0f003100f3fffcff4800feff0b00
1700b8ff0a00ecff260011001000e1feeeffb6ff00002b0001003700f5ffe9ffdcff40006cff290036002e00d3ff0000fdffb8ffafffebff85ff58003f001000
ffffe1fff2ffc0ff2000b6ff3300500065ff0700b9ff1f00c1ffe4ff17fffaffb7fffdffd6ff22000800f3ff5bff1500ddff1f0010000400060024000200fbff
1e00f7ffc1ff0200e2ffd4ffd4ff2000010035003400e0ffd6ff35003b00d1ffe4ff1200baff0500c6fffeffd2ff55ff0f002000fbff0c00baff6fff93ff2900
4c00ebff2c000700daffc4fedfffefffffffedff3b002c00cdffebff3500220042000c00fefff7fff9ff31000700c8ffe3ff2800a8ffe1ff9bfff9fffaff1c00
3500250004001d000e00cdff00000000d4ff320019002200d6ff1c0000003300240037001d0026001f00e9ff2a00b6ff1a002100330075ff1d0005002f000f00
b2ffdeff00001f00efff9bff2500fbff260010001f002900f3ff080010003100deff0c00230057002300effff3ff0f000000f5ff0b00f4ff0a001000cbffd7ff
0100faff0c002100b1ff02001b0030000500d1ff2900ccffc7fff6ffbaff0100a8fff4ffe9ffd4ff3f000f002e00d0ffeaff29000d0055fff7ff1b00feff3900
fdfff3ff00000300f9ff0100c9ff1b004200b6ff4eff08007fffcfffa9ff78ff0d001f0003002900d2ff150028002d00f7ff20004100efffeeff4700ebff1900
14009fff01000000200013002600d2fe0200b9ffe8ff2e0016003200c1fffaffe6ff320078ff2a003a003700e3ffeafff4fff1ff9dfff4ff82ff5b003e001900
0700f6ff0a00f9ff1e00e5ff39003e006dff090003002100b8ffc8ff1ffff9ffb1ff06004d001f000800fdff66ff2800e5ff2f001000f3fffcff2c000f00e8ff
0f00ebff89ffe3fff6ff8effb8fffaff00006e004200f1ffdfff37003200c0fffbff1500c9ff020012ff1200a7ff4cff1f002c0017001000c7ff6effa0ff1700
2100e4ff0c00ecffd6ffc7fee9ffecfffaff150048002000e2ffddff2c0000003400fdff01000b0002001b000000c7fff0fffcffaaff0700bafffdfffaff0900
2500000012001b001700e8ff0000e9ffd7ff350079002300efff1900feff2d0019004600fbff26000a00e6ff3300cfff0b00420033006fff2b00070030003e00
a4ffd6fff2ff1e00e9ff94ff41001000330015001f002600eeff1800fcfffefff2ff08001c0041003500000000000400fbffe3ffebfffdff4d002500dfffdcff
1e00fdfffaff2100a0fffaff1b0030000800aaff2b00acffdafffcffbfff0000a5ff0900c1ffdcff290016002500ddffeeff2f00f3ff64fff8ff4a00f5ff3d00
0200eaff07000f00f3ff0d00e9ff0b004500c1ff40ff1a007effd0ffa2ff7cff1600220004002900e9ff16001d002c00eaff11003c00f8fff3ff4200f6ffffff
0b00ccff1300afff210010001b00d7fedfffbdfff0ff2d0009003900c8fffafffbff1f00bfff240035004200dfffefffc7ffebffa2ff060099ff4e002b000b00
1600e9ff0500f1ff1300daff3100230075ff1600ecff2f00dbffd3ff1cff0e00b4ff0d00f6ff1c002100efff81ff0b00bbff2600fcff0600ecff31001c002100
1200e6ff0f00fbfff3ff3e00cdff3f00090033001400fbffe3ff36001a00dcff87ff2a00caff1f0027000800d5ff55fffeff4c0010001200b6ff69ff9cff0200
3000feff1d00f7ffe9ffc5fefaffa3ff03001b00c0ff5400f8ffc7ff2700cbff2800ffff01001300eaff2e00e1ffbeff13001a00baff0700bbffebfff5ff0800
340026001d003e002f004200f4ff0200f5ff36001b002600fdff1600eaff2e0032004c002a002c002f00fbffd1ff9effe7fffaff340055ff0c00faff38002100
d4ffcbff12001d00070098ff000012000c0015005e002c00f7ff1600e9ff190013000b00260026003f00ccff0f0013000300f8ff2400f5ff04002500d9ff3700
2a00070009001a0097ff07000d0020001b00beff3200a7ffcdffdeffb8fff6ffb8ff2500d8fffcff22002100e2ffd0ffe9ff4500e7ff68ffebff2b001e004200
feff10002b002a00fcff0a00dbff40005200ccff49ff230073ffbfffb1ff78ff0d004900f1ff3600d6ff210017001a00f7ff0e001d00f2ff55003c0003002100
1700c5ff13000800310019002100e3fef4ffacff0f0026001a004a00fcff02002e00370065ff3a0039002200fcffdcff4c00a1ffb5fff8ff9eff48005c00e5ff
1100effff4ffdcff1000deff3c003e0080ff1700d4ff0900e3fff2ff1aff1300b1ff0a00f9ff01001200fdff86ff0a00e3ff2e000f00e7ffefff2d00fcff0f00
1100efff03000500eefffdffc2ff5100ffff1d002300e8ffffff33000e00d3ff59002a00c5ff200022001700c4ff44ff09003b0003001200a4ff61ffb2ff1e00
400001000800f3ffe9ffc9fe0200f0fff7fff7ffd4ff3c00b6ff95ff2800f3ff4000170002000b00edff2b00fdffc4ff09001d00b1ff1300b3ffebfff7ff1700
20001b001b002a0015003c00c9ffd2ffebff2f0024002b00faff0e00edff290029003f0021002a003300ecffbeff4bffc5ff000037005fff1400560033000500
b8ffccff1000e2fffeff9cff09000c001a00100043001900f6ff1100f0ff050008000e0022002a002d00e3ff0f0030000400f1ff2200f6fffcff1e00e9ffdeff
18000c0015002100a2ff10001e0026001200c2ff2d00d6ffc5ffe1ffb1ff0400afff1600ecfffeff35003b00eeff9dffe4ff3e00f0ff60fff6ff2d00ddff4a00
faff07000600370003003d00d1ff3d004e00c0ff47ff1f0080ffb3ffb3ff77ff15004200ffff3b00d7ff2d0020001400f4ff0d002b00dcff36004500e2ff0300
1b00b7ff0900b7ff320017001a00e4fed7ffbaff250027001f003e00f6fffeff2300430051ff280039004d000500fbff5a00f6ffb9fff3ff95ff42005200eeff
1e000400fbff05001200cfff3700240080ff2000ebffe5ffd6ffedff12ff1200a3ff0800edff11000700dbff94ff0f00edff33002900defff1ff23000b00e4ff
3c00e3ff0300e5ffeeff3f00c3ff5000fdff25003b00f2fff5ff33001100cefff2ff3200e4ff18002a000f00daff40ff0d00420008001700a5ff67ffa0ff1c00
47000e002b000a00f5ffc6fe0d00f3ffedff1f00070032000000d1ff240018004c0019000300f5fffbff2400f0ffc1ff0e001b00a7ffe2ffb5ff1000faff0900
510024000b00250085002100fbffe8ffebff340018002200f4ff0800deff2d001e0046002f0034003400e9fff5ff3bffe3ffe7ff2c0063ff1a00f7ff3a002400
c1ffdbfffdff1b00090096ff060008001d0027005a002a00f7ff0200e9ff94ff0b000b00260029003c00b5ff10000c001100d3ff2400010001001800c8ffcfff
fbff0e000b003200a5ff1b0016000f001b00ccff260090ffc0ffe8ffb0ff0600b1fffcfffafff7ff110039000600bbffd4ff3300060071ff05002100e0ff4a00
f2ff00000f001d00e8ff2800c1ff35005100c7ff4aff370080ffb9ffc4ff72fffdff3c0002004a0007001f0010001f00faff08002600100048004700fcff0200
1800abff1000fbff2e0015002100eafee9ffd5ffbcff2b001b002d000d00feff2e00310070ff2d0039002a00ffffbfff4f00f7ffacff1400a0ff42005700f1ff
0700feff0b00b4ff1e00f0ff1a003f0081ff2500d5ff0d00d8ffeaff12ff1200b2ff0c00d9fffeff1700f2ff72ff2300faff2f002700feff01002000f7ff1200
2c00d3ffd5ffdafff2ff3900c8ff46001d002b004000f0ffddff27002700d2ff13002e00c4ff080001000000c6ff44ff0d00320000000c00abff75ffabff1600
4400fbff35000900d9ffbffe0b00d8fffaffd9ff2a003700bcffceff2900e3ff43001600fefffcffe8ff3200f4ffc6fff1ff1800aaff0700b7ffe4fffdff1e00
2600f6ff030025001000f3ff0000fbffe8ff35002a002200a8ff0800e5ff26002e003400280026003a00f1ff1800b5fff8fffcff33005aff1700180031001400
adffc1ff0400110012009bff06000a00050026004d001b00f0ffecfff0ffd0ff0100fdff1b0047002300d6ff090025000900e5ff2300f8ff13001400eaffe3ff
1800ffff100040009dff12000e0017001300d0ff2800c9ffbeffdeffabffdeffafff0f000800efff1b001e000d00b5ffe2ff2e00090070ffe6ff3a0004004800
fdffe4ff1c000600f0ff1c00d7ff32005000cfff4cfffeff6fffc9ffc4ff6dff15004200fbff5800d4ff20000a001e000c0002003f00c6ff270043000d000f00
0600bbff0200f2ff30001f002200e7fedaffa3ffc9ff2a0010002e00f2fff6ff2100330078ff2300360032000f00e4ff5000f0ffadfffeff94ff480042000a00
1a00f2fff9ff0c002000e8ff3900340077ff0800e8ff1800e1ffd0ff19ff0900b1ffffffd4ff1600fcffd9ff7dff1300060031001a00f6fff6ff2c00fcffd3ff
2f00c1ffbffff8ffe8ff2a00c8ff4c00feff32004200fdffe1ff37002400cbff13002400dcff090010000000c1ff33ff11002500fcff1800bdff69ffa8ff1d00
4000ddff35000a00eaffbffef5ffd0fff3ffe7ff31002900e6ffd2ff3200f0ff2900330000000800f5ff1700f3ffc5fff0ff1700aaff0600b6ffe4fffbff0c00
30001b0013001c003300e4ffe4ffe8ffe5ff3700380024007dff1300ebff280015003a0029002c002600f7ff330056ffe1ff0b0034006aff1800190036001a00
b4ffdefff2ff1b00ffff90ff0f0001003200230054003000d6ff0300e9ffe8ffe7ff00001c004d000b00d2ffedff1200feffc9ff1b00f0ff0a001400f3ffd3ff
13000f00fbff390097ff030017001100130089ff1f00ccffc5ffedffaffffaffacff1300f5ffe5ff2b0020002600caffe9ff3a001a0060fff8ff2d0009004a00
fafff8ff1a000600f2ff1500bdff25005100cbff37ff0e006dffc5ffb9ff71fff0ff39000a005c00e8ff150014002e00f3ff0a00460066ff06004a00f8ff0800
0c00adff0100fdff230016002d00e7fedaffb2fff1ff200013003600d1fffcff1c004a0061ff3d003d003f00e1ffdeff3b00e5ffacfffeff98ff4b004a000000
0e00f0ff1700c5ff1f00d6ff3c002f006cff1500d0ff1200b7ffecff12ff1300aaff0800ccff1b000b00dbff81ff1a000900280009000200feff2500f7fff0ff
4700e7ff7effd3ffe1ffa8ffc8ff490013003f007200dbffe0ff31001700cffffbff250091fff8ffccff1100c8ff3dff0d002200f9ff0f00c0ff5fffadff1f00
4200efff3d000800f1ffbefe0f00e1fff3ffa3ff38002400b5ffd8ff2900d7ff46001400f9ffedff0f000a00f9ffc1fff6fff5ffb8fffbffaefffbfffbff1c00
3c00faff20001200140084fe04000800e3ff400012002b000500e8fff0ff2c002c00420009003d000f00ceff250077ff2b0010002d0071ff430024002d004100
cbffd6ff1100240015008cff1500130024000c003f003e00f5ff2000f8ff200015000b0020004f003600e6fff9ff20000700aeff140005002b001900e1ffd4ff
2800f7ff08004300a0ff0700140017001c00c3ff2800d1ffc7ffdbffb4fff3ffb1ff0d00f4ffdbff220040002d00dcffefff2c00020039ffefff3b0014003a00
feff020000000f0000003400cfff29004f00c6ff42ffefff6fffc1ffadff77fff5ff1f00feff6000e2ff14001a002300fbff17001200d8ff110041001e001b00
0f0090ff0800edff29001e001f00e4fef6ffacffebff3e00fcff39000e00eeff0c003f0079ff31003e002700d6ffe8ff0700d8ffabfff1ff8bff45004500f4ff
0e00fbff100001002000d3ff5900f7ff67ff2600fdff0300baffe7ff19ff1f00bfff0900aafff9ff0300d4ff8eff0900faff2c000c000100feff3d000300c9ff
2b00a5ff97fffdff00003c00bbff2c0001001c002700efffdfff42001600caff03001800dbff0c00c9ffffffbbff38fff6ff440001001e00b8ff66ffa2ff0c00
3e000200fcff0a00e1ffbffeefffc5ff0100feff51002900eeffecff3a00f3ff39000c000700fcfffaff2f001700bfff0c00130097fffdffa7ffc7fff7ff0000
4b00150015001e002400cffefefff4ffefff36001b002500f3ff3300f4ff300022004400f5ff1f001000c6ffa7ffb9ff230017002e0067ff0d00150033003f00
c5ffcdffffff18001f0094ff3c001500dfff2b0036003e00f5ff0000e1ff1f00dcff1800110048000f00b3ff000009000800daff13001100140018000400e7ff
340002000100380083ff0c00080016002000d6ff2d00d2ffd1ffd5ffbefff6ffa7fffaffe9ffd5ff580020002600ecffddff2a00ddff59fff3ff3900d9ff4500
faffddff1f00000001001500bbff22004900b8ff3dff1b0077ffd0ffa0ff75ff2100300009004300ddff18001c001f00f6ff0d002d00dcfff6ff3b00f7ff1b00
1600a1ff0a0002002f0004001f00dffefcffc0ffeeff2f00f6ff4700eafffafff5ff270072ff380039003000c7ff2400f1ffceffb5ff1f009aff5c0040000800
0d000b003e00e9ff0d00e6ff5900360071ff0300bbff1d00bbffe1ff1bfff6ffa3ff0f00f7ff2c005800cbff5aff030071ff3b00faffedffedff3700e7fff2ff
2500ddff84ffd8ffe5ff90ffbcff2a00faff27004600fcfffeff40003900d0ff0f001800cdfff8ff48ff0700e9ff43ff21003500f8ff1000bfff70ffa3ff1f00
2a00ddff25001a00deffc0fe0e00d6fffaffe7ff5b001d00e8ffd9ff2a00f9ff3b001200f9fff5ff00003b001200c1ff0b001700b3fff7ffb8ffd6fff9ff1f00
40000a00080021000f009ffff1fff3ffe1ff300029002500efff47000000300038005500250026002500e6ff1a00c9ff3d00200034006cff1e0012003800f7ff
a1ffc6fffbff19001a0092ff180003000b00100007002f00e4ff2700f4ff3a00ddff0b001d0058003700ecff14000d00f9ffd7ff1b0002002e000a00dfffd0ff
2600fdff06001b00a3ff13000e0025001a009bff2f00aeffd3fffbffbffff5ff9cff1200c9ffddff3e0027001e00dbffe2ff2c00d2ff60ffefff4800ebff4100
fafff1ff2600fbff00001800d0ff1c004500b2ff3cff1a0083ffd2ff9dff78ff2300220010003b00dfff33000c003a00faff0e004d00d6fffdff4f0020000e00
efff94ff1000a5ff25000d002700defeefffd8fffcff3400ffff3f00e8fff8ffd8ff3b006dff2200390018008aff1200a9ffe2ffafff16009cff73003f002200
1500f3ff1b00f0ff0f00cdff3f002d006eff0c0016003d00c9ffd8ff1cfffdffaaff0e00220013002400d8ff87ff2d009bff2f001000fcffefff3600faffd7ff
0a00bcffecffffffeeffedffabff3a0006002b001300f4ffedff3e001200daff28003f00ebff1a0056001900d2ff35ffefff490004000600acff76ff9aff2c00
23000c000800f6ff0100bcfe400073ffe2ff2400bbff3900ecffd4ff3500d2ff24003f001a00f9fedfff0700daffbbff15003700adff0000a6ffe9ff0700feff
0400210030001f00420046000a00f8fff8ff3c001c002f00e1ff4c00e6ff3100eaff5e00260044002400f0ff9affb4ffdeff0c0029005bff6cff96ff3b003100
d4ffd7ff1400f5ffe5ff87ff10000b002d000d0070003a00f3ff2200ebff4b00ffff0800100002002a00dbff0700fcff0100d8ff2100e6fff1ff0f00d1ff1b00
26000f0002002d0099ffedff1c000d001a00dfff2e00eaffe6ffccffb1fff1ffb9ff0000eeffefff00ff3700b7ffc9ff01004000e3ff87ffefff2100ddff2c00
0700efff2200280009000000c2ff48003800d3ff45ff22007dffbeffe2ff70ff0f003f00fbff2900d1ff320024002200fcff1200240009ff4d00450012001600
180075ff0d00faff33002b001b00e6feeeffd3ff81ff240019003b00d9fff5ff170002004cff27003a002c00e6ffdeff5c0091ffb5fffbffa3ff42004200ecff
2d001000e1ffe8ff1400ddff6300130064ff0600f5ffebffd8ffecff15ff16009cff1000faffdeffeaff2b0097fff2ff190034000d000a00d8ff2500f7ffedff
1900f8fff6fff3ffe8ff3000baff4700feff27003500e4ffd1ff2f000b00d7ffd3ff2a00e3ff0b0021000400ddff2ffffdff2700fbff16009aff71ff93ff1e00
2a00fcff060000001800c2fe0b00d1fff7fffeffd9ff3000fdffc8ff2100f3ff36000c00fbfff3ffeaff2500e7ffb7ff10002200aeff0c00afff080008000600
2e001f001000380054000100b8fff3ffdbff330016001e00f5ff3800e6ff2c002f0057002e002b002700e7fff4ffaeffe7ffd8ff310061ff1900c2ff3b001000
65ffd5ff09001c00e3ff8dff1500ffff16002b005d003e00e9ff0e00e8ff0f00fbff130024000a002e00e7ff04000c00f5ffd7ff1f00eaff00001600d6ffdfff
0c000d001d002f00abfffdff110013002200d2ff0d00e4ffd6ffd4ffb6fffbffb1ff0b00c1fff6ff23002200f3ffb3ffe1ff3200f6ff82fff0ff1100dbff3600
fffffaff0d00080000001500d5ff3f003700baff44ff2b007effbbffcbff79fffbff3400f4ff3f00ddff24002d002500f9fffeff1c00d1ff32004a00e9ff1400
1b0082ff0c000e00300027001900d3feedffd2fff0ff280009003b000300feff3a00310051ff23002e0039000200adff5900ffffa5fffdff9eff42003e00edff
10001700fbff02002600e6ff40000e0070ff2100dcffefffc9ffefff0bff06009eff1a00e1ff01001000deffa0ff0800fbff31002800f3ffe3ff1e00e9fff9ff
1600e1ffedffe9fffbff3500ddff4500feff1c003d00edffe5ff36001300cdff42001900efff13000d00efffd4ff38ff06002000090014009eff70ff94ff1d00
2a00f6ff000003000200b9fe1900beffedff0b000c002300c8ffdbff2a00e6ff39000500feffe0fff7ff2800e8ffc2fff6ff2e00afff0000abfff6ff0b000600
3b001600040023002d00e5fffdff0600fdff370019001700e8ff1700e9ff2a0024004500390045003600f7ff0c00adffe5fff7ff310056fffaffe4ff32002600
d6ffcfff06000c00e5ff88ff12000b00170013004f002600e7ff1700edff000001000d001b0011002800c4fff0ffeefffaffb3ff2400efff14001900e0ffebff
1100fcff14003700afff0d00200019002000a1ff310061ffc5ffcaffaffff0ffb0ffffffdfffefff110019000300c2ffe9ff2600feff79fff0ff1700e5ff3b00
f8ffeaff1b00000006001f00c4ff35004100c8ff47ff22007cffb4ffcfff73ff16001900fbff3700d9ff260029002100ffff08001d00d1ff29004e00e0ff0700
0b00adff08001e0027002f002600e1fee2ffe3ff99ff1e0009003700f7ffe1ff170014005eff2d0045002a000300b9ff560004009bfff9ff9aff46002c00fdff
1700f4fff7ffebff2800d4ff4200370069ff0200efff0900ddffe4ff0ffff7ff9eff0800d1ff02000e00eaffa4ff150004002a000d00f0ffeeff2900f0ffd9ff
2000e4ffe2ffd0ffecff2900cfff340017001b003d00e8ffd7ff3b000f00cdff1d001f00d5ff0900f5fff9ffe4ff31ff0a002700f9ff1800aeff70ffa3ff0900
3100f7ff10001500e7ffbefe1400d6fff7ff0000fdff2900f8ffc9ff2d00ecff390019000100effff9ff2100eeffbefff8ff3400aefff0ffbcffedff06001300
22000e000f002d003600cefff8ff0100edff380019001e00bcff2b00daff2a0037004900240036002f00e2ff16008cffe4ffe2ff35004bff2f00130035002300
cbffcbfffaff1400050081ff1a00010016001e0064001f000100f2ffebffddffefff0a001d0026002200f0fff7ff1d00edffc1ff3600e9ff0e001700d4ffd6ff
15001f00feff43009bff100015002000faffe1ff2b00c9ffc1ffdaffb4ffe3ffadff0100fcffe8ff1c0019001b00d3fff6ff3200fdff62fff1ff2200d0ff3900
fbffe2ff0300feff01000600d1ff38004000bfff4aff0b0073ffbdffd1ff6eff0d002f00f1ff4a00caff21001500330002001300340092ff2a00480001000700
0b00b4ff08001d0027000f001d00dffee5ff22fffbff2c000b003600e6ffebff1200230061ff2a0038003c00f0ffd7ff5e000200a5ff00009cff37002e000600
1000ffff0500edff2700d9ff47000a0068ff1d00cdffe6ffd1ffe7ff15ff05009cff2100d4ff02001500eeff8cff1500010026001600f7ffe7ff2300d9ff0300
3500b0ffbeffe4ffe5ff2600dfff3f00f1ff10003d00e7ffe6ff39000400ceff1a001d00e5ff00000300ffffc1ff33ff13002e00fcff0e00aaff60ff94ff1a00
3a00ecff3100f8ffebffbafe0f009afff1ff0a009cff1300d1ffc3ff2900e3ff440007000000feffecff2500eaffcafffaff3800a5ff0700aeffe3ff0c001600
2a0015000b0022003300ceff0000f9ffd7ff310020001400b1ff0c00dcff2e00160047002b0049003600f7ff140096fffcfffeff38004cff200024002a001900
caffd3ff09001300f0ff84ff0b00fbff130023003b002c00e5ff0f00e7ff1c00fdff0500150020002100caffe9ff0800fbffb9ff4100ecff00001900d6ffdcff
1a000200ffff3a00b1fff9ff1c001300230055ff2300c8ffcaffe0ff9effeeffa7ff0e00f5ffdfff14001c002300dfffdfff3700110061fff2ff2300c6ff3400
f9ffeffffeffe8ff04001900c7ff3d004700c8ff49ff1b0063ffaaffbdff71fff9ff2d00fbff4400e1ff15001f002700f9fffdff3400deff11004900d2fff9ff
000072ff0800170026000e001b00ecfee2ffb4ffe9ff230010003e000200ecff0f001f0059ff1b0046002200effffdff4f00f6ffa3fff4ff90ff36003a00f8ff
0900f7ffffffeeff3000e4ff400032005fff0000f1ffffffc0ffd9ff1aff1c00acff0a00edff0300f7ffd4ffa5ff12001200280009000000f2ff2900dbffd5ff
360001008dffe0fff4ff2400d1ff3400feff3f001700e7ffdbff37000000c8ff2000160082fff0ff0300f7ffc8ff24ff02002e00ecff0d00b0ff6bff86ff1f00
3a00070011001100e7ffb8fe050043fff6ffe7ff3c000e00eaffd5ff3000ecff25001d0003000900f9ff2300efffc1ff0d002d00a5ff1b00b1fff5ff09000400
3400250011003e002f0083fff3ffe7ffd1ff2d000e001d00efff2600e3ff34002e005100210050001c00eaff1000abff09000f00340058ff1f001d002a001f00
d5ffd5ff00001100dbff8aff2300f7ff31003f004f003600e2ff2300e6ff0d00e6ff0100290001002b00ccffdaff1100f5ffbdff3700000003001100efffe2ff
0d000c0001003a0089ffd6ff1c0024000f00d1ff2e00d3ffc4ffe5ffadffe2ffaaff0400f5ffdbff1e0014002d00d9fff4ff3600020070ffeaff200034ff2f00
fffff7ff18000600f8ff0e00c7ff1a004500c4ff43ff120066ffb9ffccff70ff09002c001f003800cfff250020002700030022002a008fff0e004e00e2ff1600
fdffbcff06001c0028000b001200e7fee1ffc5ff0000280001003b00f0fffcff0f002d007cff2c003d002f000000efff3400ffffa1fff7ff94ff500035000500
feffe0ff0500edff2800d7ff3e0003005dff0200e2ffddffc5fff8ff1eff0c00b2fffffff8ff00000400dbff93ff1300f6ff17000100f9fff4ff3700f5ffe9ff
2e00e2ffc5ffeafff7ff0e00d3ff25000a0067000800ceffe1ff50000600d0ff01001400ffff0b0020000d0076ff43ff0c001d0004001300c1ff79ff9cff2600
2800e6ff1d000200f9ffb6fe1600b8ff00000b0071001400ddffd7ff3800e3ff3600100000000c00efff2f00fbffc2ffe4ff1300abffdcff9fffe1ff04001300
3a000b000e0030003b0057fff6fffdff10003f0000002200f0ff3800d3ff3c00230057002e003a000b000a002900b9ff29002000340059ff3d002d003b003200
e2ffd6ffefff11001f008aff2000100005001d002f002800edff2e00eaff3400e8ff0f00200001004200d4fffcfff7fff3ffb6ff2e00f0ff23001100e7ffd4ff
0300ebffedff30009cffeeff240026002400deff3300d0ffc9ffddffb4fff3ff9bff0300eaffdbff340005001800e4ffdcff2800c9ff63ffffff2b00b6ff3300
0000defff3ff0d000d003000d4ff1e004400bcff41ff390079ffc0ffc1ff75fff8ff220014001b00f0ff290029004200f5fff5ff3000d5ff070046001b001c00
0c0074ff0c0011002000e3ff2100defeffffdbff01002e00faff4100dbffd4ff0000150098ff1f0039002400f6fffeff9ffff8ffb1ff10009bff440042001200
fcffe5ff070012002b00e3ff56000a005bff0d00ffff0f00c6ffecff22ff1a00aaff1300e1ff10002300d0ffa8ff0700d7ff31000100faffedff4300d8ffe4ff
3100f3fea2ffebffddff0100c6ff2700fdff88002800cdffceff38001d00dafffcff2000e6fff2ff55ff0b00e4ff1bffefff1a0019001100c7ff82ff9aff1900
2500c9fff9ff1200ffffbffe1c00c6fff2ff3f00800008001a00e4ff3a00f3ff510017000100f8ff0e0048000900a8ff1a003b00a6fff7ff9dffdfff0d000800
490041001a00e4ff1c00a1fec0ffd1ff96ff31005f002000f0ff6c00e7ff3100f7ff58002f002c00250027000900b1ff6a00000035005dff5e002900380081ff
bfffdaff00002800490090ff11000c0004003f002c004100e1ff0300e5ff4200050002002200efff2800acfff3fffdff1100e4ff2c00faff32000600ccffe6ff
2e0006000b002a0096ffedff22002d004c00e9ff0c00caffc3ffceffb9fff3ff92fff9ffe7ffdcff4c001d001800e6ff03003500f4ff65ffffff2400f6ff3100
f6ffdeff0d00070009003100ccff20003d00c4ff40ff0b0072ffd0ffbcff70ff040007000f002100e3ff3c001a00590000000b002c00edfff0ff4d00ebff1f00
190087ff0d00adff1b0005002c00e1fe0500d2ff06002600070048002700f6ff02003300b8ffebff38002a00b2ffefffe8ffdaffa7ff0000a0ff3c003b002800
feff16001000ffff2400cdff60000c0059ff0300f3ff4300e0ffceff19ff1c008bff1c005800e6ff3800caff7aff1b00abff43000400f6fff4ff3e00d8ff0f00
faffedfff1ff1b00fcffefffeeff0000f7fff3fff6ff1900230091ff1400effff8ff47fff4ffd8fff9ffe8ffe7ff0100f8ffa5ffeaff0200200007008efff6ff
ebff0800ebff260011000400e0fffbff1300f7fff6ff00001800e7ff0b0003000000fefff1ff14001400d8fffaff0e0027002600000038001a000200fbfffbff
f7fffcff120016000000f0fffefff6ff0800ecfffcfffeff0400f5ff85ffbeffffff7aff0000e6ff1300f8ff00002f00fcfff7fff9ff230007000100feff2c00
feff14001500caffffff12001900ecff01001e0004000c002800f8fff7fffefff6fffdffb1ff0a00dbffebff06000d001d000900f5ff44ff020002002400faff
0600fafff6ff0000ecff0000bbff1100e3fff2ffa4fff6ff2200f1ff0500f1ff1c00fcfff6ffc9ff0c001b00edff0b001200eafeddffc2fffffff7ff03000f00
f6ff010009001700f0fff5ff200016ff1a00eeff1000f3ff0500abfff7ff71ffe6ff1a00f6ffedff0e00210093ffb7ffe1ff07000300efff0900120000001100
f3ff0500070003002effc6ffb8fffcffc8fffeff0000fdffe3ff27002800f5ffe2ff230081ff1500f7ffdfff0e000800fbff83fe15001100090000001900f6ff
eafff1ff0f001500e5fff5fff6ff07002a000b002100d9ff0000f9fffdffe1ff2000defff5ff09000b001c00ddffebff180070fff0ff0b001100e5ff0000faff
fcff0000f6ff1500150005000800f8fff9fff8ff03001000f5ff8fff13001200fcff3afffcffd9fff5ff0400fdff0700040095ffe6fff1ff4900feff95fff2ff
f1ff07001000130010001d00f1ff0300f9fffbfff6ff14000b000800ffff080004000500fafffaff0800f1ff05000a000b001000050071ff1900fffff3ff0200
0d00080003000700040012001300f0ff0300e0fff9fff8fff2ff0000c1ffccffd6ffafff0000f1ff1000fefff4ff3100fefffafffbff2f00160006000c001f00
04001c001c00d2fffeff1b000b00e1ffffff15000700ceff1500f6ff0d000800faff0500c9ff0500f7ff0700faff0d0024000200edffd2ff1200fcff1000f1ff
00000000f3ff0e00edff0600beff0700e0fff9ff1cfffcfffcfffefffafff3ff1500f1fff4ffc3ff11000d00f6ff04001100f1fed1ffdcfffffffcff13001100
f4ffffff10001000e8ffffff0900eafe1c00f5ff0b0001000300b7ff050077fffcff0c00faffedffffff180095ffa3ffdaff0f00fbfffbff03001700feff1700
000006000b000a002dffcfffa1ff0900e7ff010002000000e8ff19001700faffdaff0d0088fff9ffeaffe0ff11000e00fdff5fff11000100190008001b00f6ff
fefffbff15000c00effffefffaff10002f0007001100f5fff4fffdfff5ffe2ff1600eafffdff0c0017000900ecfff7ff1a0069fffaff0b001f00edff0d00faff
0000fcfffdff0100000011000200f2fff6fff5ff08001600e6ffb0ff0e001700fbff8ffff7ffedffe8fff8fff7ff10000e0080fff2fff8ff3700feffd8ffefff
ecff0800fdff0f000a001800f7fffeff0e000700fdff020009000200fbff1600feff0d00fcff0c001b000400100009000300fdff0500a1ff0e001200f0ff0000
0e000200f7fffbffffff17001700f8ffffff0000fdff0100f0ff0b00eaffe9fff0ffdafff6ff000000000c00eeff2d000f000300faff27001000080008001300
000013001900d1ff01001c000700e1ffffff0e000b00dcff1700eeff05000700f7ff010011000500f4fff7ff06000a001f000800ecfffaff0900f9ff0600f5ff
fdff00000d00130002000c00baff0b00dffff4ffa5fffdfffdfff8ffd1fff0ff1000f0ffe8ffe4ff18000700f8ff00001c00eefeeaffe0ff0000f4fff2ff0a00
f4ff0c0006001c00f0fffaff0d00dafe1500efff13000b000900c3ff0600c0fffffffcfff9ffefff0b0010009bff9affe9ff0d00f2ff0000fdff1000f4ffc4ff
f1ff030008000a0035ffe5ffb2ff0d00e3fff7ffffff0300edfff6ff18000a00cdfff6ff8cfff4ffe5ffd8ff0d000900fbffe0ff12000000120005001500fbff
080000000b000a00effffcff02001600190001000900edfff9ff0700efffe5fffdffe9fff9fffeff0d000700edfff5ff1400cfffe6ff0d000900fbff08000400
f9ff040003000a0005001700fffff3fff4fff6ff03000f000300aefff6ff2600f8ffe7fff5ff0300f6ff0500faff0f000200b8ff190001000e000500fcfffdff
ebff09000000000005001b000000000011000a00f0ff1d00f7ff0600f0ff0f0009000400fcff0900250009000e000800f6ff0400feff9aff0b000300f4fff9ff
0000fcff0400faff0a000f000900f8ff0100030003000000ebff17000000fbfff1fffdfffffffdfffaff0e00e3ff270011000800000019000800040008000900
fdff13000700e0ff01001e000800e9ff020003000300fbff040039000a00f1fff9ff030034000b0007000a000a00040001001500f2fffcff070002000800fcff
f4fffcff05000600080018008bff0900fffff4ff57fff3ff1d000000c8ff0e000c00f8ffe9fffdffe5ff0000f7ff03001f00fafeeeff02000b001b00eaff0c00
efff0900fbff1100ecff0b00f5ffdbfe1c00e5ff1a000d000e00edff0300fbfffdfff9fff6fff5ff110010009dff8cffdfff1500e9ff2000fcff020010000600
edff03000f0023008afff9fff9ff1000f9ffefff0200f7fff5ff86ff0a001200e6ff0500d4fff3ffe4ffebff0d00e3fff6ff260009000700050002001e000200
01000b000d001900e4ff0500f5ff0d00120001000b00fdfff9fffdfffdfffeffc6fff7ffffff050004000400f1fffbfff9ffbbfffaff04000c00f3ff0400fbff
edff1300fdfff7ff130010000800f1fffcfffcff0700080001000100eeff3000f8ff0000f4fff7fff6ff030003000e00ffffd6fef9fffeffecff0800dafffaff
e9ff06000000faff09001800edfff8ff0b001400fdff1100fbff0600dcff12000c000600f6ff0a00fefffdff18000a00fcff0100f6ff16000b001300f6fffcff
06000600fcff000000000f000700030008000a00fcffffffebff0b000e00fffff1fff6fffdfff4ff1100f4ffe6ff25001e000300fcff18000c00090006000f00
ffff12000600e1fffdff1d000700ebfff9ff09000800f8ff130002001200fdff0400000071000a00fffff6ffffff010008001a00f5ff10000300f5ff0300fbff
f9ff000004000c0007001100d0fffdfff0ffefffc9fffbff1300fdffdcfff9ff06000100dcff0e0012000600f3ff00001400b2fef0ff220009001500eeff0b00
eeff0000ffff0300f1ff0f00f6ff6eff1400dcff150001000b00070006001100fcff0000f8ffe7ff0b00e7ff9cffc3ffe7ff1300f8ff1100fefffeff0c000300
f8ff05000b00250084ffffffffff1100f6fff4ff0800cbff000011ff17000700ebff0f000f000600e6fffeff0c00d4fff7ff2600ffff0800fafff9ff0a001500
11000a0003000c00edfffcffffff0b000e00fdff0700020001000200f4ffeeff89fffdfff9fffbff0e00fafff6ff0800fdff2200f7ff09000300fffff8ff1100
f1ff0f000300f3ff100011001000edfff7fff4fffbff0c001c00f6fff9ff2700f4ff0600f1fff4fffdff09000c000e0000001b000b00f6ff88ff0700b8fffaff
f1ff0a000f00f7ff0c001d00f6fff6ff0800010000000200faff0900b4ffffff05000100dfff0300f4ff100011000c00f4ff0700f1ffe5ff0f000f00fbfff7ff
fdff06000200feff0c000000010000000500fbff03000000e1ff06001c00edff0c00e5fffcff00001e00ffffebff23001c000500feff1b000900090005000b00
fcff06000a00f9ff0d001b000d00effffdff06000400fafff9ff0d000a00fbff0200feffefff09000a0010000800010002000400f2ff06000100efff0400fbff
fbfffcff0d00faff080017001c000500e9fff3ffbdfffbff19000000f4ff0000f6ff0700d8ff150008000700f7ffffff0000e9fff1ff33000b001b00eeff0900
f0ff0000fffffafff1ff0200f5ffe0ff1100daff170002000c000c0002001e00f1ff0100f9ffefff0900cdffa4ffbfffe2ff1a00eeff0f00fffff7ff00000200
0e00ffff080019000300f3fff9ff1300f8fff6ff0a00fcff1f0040ff09000c00f6ff12001a001800ebfff1ff0c00f6fff6ff1400c3ff1300e8fffcff06000c00
0900010000000700efff02000d000a001200000003000700f8fffefff8fffcff9dff3100f7ff04000600f6fffeff0700f0ff1b00f6fff9ff1000fefffcff0300
f4ff0f000400ebff0b00f7ff1000f4fffefff6fffaff09000c00000001001d00feff0200feff0000f2fffcff10001100fcff1e000700feff47ff04009afff0ff
f0ff05000800fcff0a001700e5fffdfffffff6ff02000a000c000700defff5ff09000800caff0000faff03000b000600f9ff0100f9ffe0ff17001800fcff0300
fdff0800f8ff01000200f7fff8ff0200f8fff9fff5fff6ffedff04001500c4ff06006ffffcff020006000700ecff2b0021000000fcff2500f7ff0c0001001200
0600060013000100010019000a00e5ff050012000a00fcfff1fff9ff070003000c000200dcff02000500130003000200f8ff0600f5ff06000700e8ff0100f8ff
0200effffaff0c000a0000001f000600e6ffffffe8ff02001b00fbff0800effff9ff2700d8ff19000c00020000000700fdff0b000000300002000700fbff0000
f1ff000008000000f2ff05000700edff0500ecff0d0006000b001400faff1e00f8ff0200faffe1ff050003ff97fff4ffe9ff0500fbfff9ff0300f3fffbff0100
1b000000040088ff3b001c0015000500faffffff0c00fcff1d0042ff0400ffffeaff0a0014001800f1ff0a000c000200f8ff0300c0fe0900dcff0000e8ff2700
000004000f000800f3fff5fff5ff0e000d00fcff02000700f2fffefff1ffe7ffc6ffd7fffaff06001700fbfffcff0b00f5ff4800fdfff8ff14000100dfff0600
fbfff9ff0200ecfff8ffd0ff1000f8fffcfff2ff02000c000500f0fff6ff1e000000fcfffcff0000e5ff1300110009000500e4ff0b00ebffe7fe050090ffefff
eaff07000b00f5ff0f001200e4fff2fffdfff0ff0d0015000c000700e6fffeff0b000500caff0100020011001d000b00f2fffdfffdffd2ff1a001000ffff0a00
fbff0a000300feff10000800fdff05000000f6fffafff4ffe9ff0a001800c9ff0a0010ff00000300f5ff0700edff1c001f00100000001d00feff150000001a00
0400070018003200080013001300edff000018001100ffffecfffeff0d00f6ffffff0600caff140008001e00ffff02000700fdfffcff0a001100ebff1a00ffff
fefff9ff02000e000a0006003d000c00e7fffdffe4ff0000270000000d00f2ff00002400d9ff18000d00090002000e00f0ffedfffdff290003001300fcff0000
f4ff05000e000a00f3ff080001003b001000e8ff15000f00faff160008002300fafffefffbffebfffcfff7fe94fff9ffd7ff0400fbfffbff0500f6ff06000000
1c00fdff0600b0fe4700f9ff4c00e6ff030006000e00f7ff18003bff0700fdffe5ff0d0012001c00f5fffdff1500f8fff6ff0e0094fe1d00d6ff0200d3ff2c00
0a00070011000c00f5ff0b00ddff160012000b0015000b00fdfffffffcfff4ffdeffddfffeff12001c000000f2ff0700f8ffdbfefefff5ff25000300b9ff0100
feff0900faff1a000700ebff0f00faffeffff0fffeff2d00e7ff83ff14000500f2ff67fff7ffdcfff9fff4fffdff10000300cbffeefff6ff2d00ffffbfff0400
f6ff0800efff1f00f7ff1b00e3fff7fffbfffeffedff1a000f00efff0300f6ff0000f3ff0300fbffdfffd2ffefff05000a0015000b00daff1700fcfff6fffbff
e3fffcff02000c000900e9fff0fff7ffffffe5fffefffbffd9fffbff84ffc5ff0700befffcffa2ff21000c0000002500f5ffe3fff9ff26000400f6ff07001700
08001e001000c7ff000012001000e3fffbff1000090005000d00ddffeaff000000000900bcff0600e2ffe5fff1ff0d00f6ff0500f1ffcbfffbff030026000100
0000f4ffefff1500faff0800aafffcfff3fff9ff57ff00000000efff060003001500e8ff0300d3fff5ff0100ebff0100f4ffd8fec4ffa5ff15000500ffff0600
f5ff00000b001400f6ff0a000d0018ff1f0006000f00f6ff0400a5ff03006cfffcff1b00f4ffecff10000c00afff93ffdbff0000f4ff040007001d0000000e00
f0ff09000200dcff71ffcaff9ffff6ffc9fffffffcfff6ffdaff17002400b1ffe6ff120097ff0100f4ffdbff11000600ffff68ff12000a00170000001b00eeff
0000f7ff05001300ebff0000f2ff14003100f8ff0400d9ff02000600f9ffe7ff1e00f2fff6ff120000001500f6fffaff1c0080ff0e00fbff1a00e6ff0000feff
fafffdff0100140000000b00f7fff3fff7ffe5ff04001900f3ff93ff1c000800f0ff4cfff3ffebfff6fff7fffbff1000fcffbffffaff01004f000200aafffdff
f9fffffff6ff160001001400f8ff050000000800eeff12000a00090005000900fbff02000400fdfffcffe7ff06000b0035000d000a00bcff0f000000fbff0400
f9fffcfff7fffcff00000800f1fffbff0400f4fff7ff0f00fcff0800caffdaffeeffdeff0200040007000500f2ff29000000eefff7ff29000700feff04000b00
0a001d001500c8ff040010000a00e0fff9ff0d000100c9fffcffe8ff0700030001000800caff0800f8ffebff0300f9ff2a00f4ffeeff23ff0100f8ff1b00fbff
f7fff5ff02001500f1ff0300b1ff0600d9fff2ffbffffeffeffff0fff4ff00001500effffcffc3fffefff0ffefff06000500f1fecdff86ff0400070002000b00
f6ff000006001500f1ff0c000f0056ff1d00f2ff0f00f6ff000082ff07007ffff7ff0300f2ffefff02001300baff71ffe5ff0c00f0ff0000fcff1800f0fff1ff
f3ff08000500ebff77ffdbff9ffffdffbcfff9ff0700f6ffdbff07001900d3ffd9ff100089ffecfff1ffddff07000b00fdffb9fe12000200120000001700f1ff
04000f0007001500f1fff0fffdff0600200000001000e3ff08000a00f6ffedff1300dcfffaff0c0008001300e7fff9ff2600d1ff030000000500ebff13000100
f8fffeff00001300090014000100f4ffeffff4ff01001900f4ff51ff0a000c00f1ffa5fffafffbffecff0c00fdff0e000600c5ff040016003f000400ecfff2ff
f4ff0000fcff0600000014000000eeff16000300f9ff14000000faff070008000200030001000c004300feff0200080003000f0006000f001000f5fffcfff7ff
0e00fbfff0fff7ff09000d00010002000700f4fff9ff0400f5ff0800f2fff7ffd5ff0600000002000d00faffefff2b0012000600f8ff1f000500070008001d00
03001e00feffe9ff010016000100e9fffcff07000200faff1100eafff9fffeff040006000a000c00f5fff9ff0b00ffff08001800f0fffbff0600f8ff0d00f9ff
f9fffcff02000f0009001400a1ff0300e4fff8ff49fffefff4fff5ffcfff05000f00fdfff9ffe1ff10000000edff07001b0029ffe2ff82ff0500000014000d00
f4ff1100fdff2000f2ff0b000300e0fe1e00eaff0f00faff0800b0ff0a00c3fff8fffafff8fff4ff0d001100b6ff74ffe8ff1600f6ff1500f2ff110002009dff
f8ff05000500f3ff54fff0ffbfff0600cbfff9ff0400fdffe4ffc9ff0d00d8ffd3ff180095fff4fff2ffd8ff0800f1fffaffcfff0e00fbff0e00feff2200eeff
0b00020007000900ebfff1ff03000c00180002000100ebff0100fafff8fff5fffdfff4fffdff040007000200fafff6ff1a009ffffcfff9ff0a00f7ff1000ffff
feff100000000b00010018000100f2ffeffff0ffffff0100f9ffb2ff09001500f6ffedfff4fff7ffe5ff0b00feff0f0014005aff0500f9ff0f0007000b00ffff
efff080007000d000800130000002a000c001000f7ff020000000000f8ff00000400f6ffffff0c000f000200f6ff0c000000e3fffcffa7ff0b00fcfffdfff9ff
0300fafff8fff6fffdff11000200f7ff0000e3fff7ff0100f3ff1700feff0600e6ff1200ffff00000e00fbffefff2a0008000900f9ff0f00080011000d000f00
000014000800cdff080017000500e5fffbff0f00fffff7ff09003f00020008000700020015000c000200f7ffd4ff00000300f9ffedfffeff0400f5ff0800fdff
0000f7ff070008000b000c00adfffeff0000f7ffd8fffdfffbfff8ffaeff00000800fefff5ff02001200f9fff3ff00003500d5fef3ffecff0a000b0000000600
f4ff0b000100fefff8ff09000e003eff1a00d9ff100006000900e7ff0700f3fffffffefff0fff6ff10000700aeff53ffecff2a00f4ff1a00f9ff05000000feff
f9ff05000600fdff65fffaffc8ff0500e3fff7ff08000000f6ff8eff0b000900e1fff2ffddff0300efffe7ff0200fbfff5ff02000400fdff0300fcff2c00f6ff
1100050009001500f0ff0f0001000300130000000000faff02000900f4fffdffc4ffedfffcfffcff020003000100f6ff0800000003000c00020096ff03000d00
eaff150000000300f8ff18000900ebfff6fffcfffeff0b001b00d2fff1ff0f00efff0600f7ffecfffcfff6ff050015000b0020ff0c000f00d1ff06000200f8ff
eeff06000700000005001200fdff04000c000300f6ff0b00f6ff0800dffffeff0000fbfff2ff01000200080011000900f3ff0000edffdcff0b000600feffffff
f2fffdff0500fdff0200fbff0800f8ff06000000fffffbfff3ff0e001000040003001000f9ff020011000b00efff230009000400fdff0e0005000b000600ffff
0000fcfff7ffe9ff08001a000300e8fffaff04000100f5ff0200eeff0c00010003000100fcff0e00f8ff0100e7ff0500f6ff1000efff02000600f2fffcfffbff
f9ff03000e00060007001200cafffcfffbfff6ffbaff00000300fcffd0fffefff9ff0200e7ff150005000200f7ff00001d005afff4ff190012000900f6ff0900
f3ff0a0000000600f9ff1100f4ff81ff1300d7ff110005000b00fbfffcff0e00ffff0000f5fff3ff0d00f7ffafffbfffeaff1a00faff1200fdfffeff08000800
ffff0400060007007bfff9ffe6ff0800e7fff8ff0700d5ff0a001fff00000e00f4ff040011001700f4ffe7ff0300f3fff4ff0300ebff0400f6fff4ff1a00f6ff
0a00040001000400efff0f00f6ff06000f000000000004000300fdfff5fff6ff40ff3800f9fffcff0600fbff03000000f5fffaff000003000f00fafff8ffffff
f3ff0f000300f5ff05000d000800ecfff8ffecff010005002700eeff00001400f5ff0c00f8fff5ff090005000d0015000400d2ff0900f6ff5eff0600c5fffaff
efff0a000700fbfffcff0e00f7fffcff08000300faff070003000900eefff2ff0100ffffd6ff05000000080013000700fcfffbffedffd8ff0c000d00fdff0600
f2ff01000600fdff0f00f0ff00000400030002000000fffff0ff09001f00eeff0e00f5fffcff00000e00fafff2ff23001300fbfff9ff170004000c000600fcff
0000ffff0100eeff140018000100e4fff6ff0a00fffffcff0000f7ff02000500f6ffffffe6ff0a000e000500e6ff0500f7ff0b00eeff04000000e7ff0400f9ff
0100f1fffafffaff08000400fcfff8ffe9fff9fff2ffffff0a000200f5fff1ffe7ff1a00e1ff140007000100f7ff03000300f5fff7ff290008000300f4ff0500
f0ff0000ffff0400f8ff0900f5ffd3ff0d00dcff0b000d0009000d00fbff1d00f9ff0e00f3ffedfffeffdcffbdffe3ffedff1700e1ff1300fbfff8fff5ff0600
120004000400e9ff6affeafff7ff0b00e1fff9ff0400000017002cfff5ff0600fcff0f001b000f00f7ff0c000300fffff7fffeffafff0f00ddfff9ff0f00fdff
e9ff000008000a00f4ff0200f9ff05000c000800fcff1400f4ff0000f4fffdff7cffe3fffbff07000200f4ff00000400eaff2d00fdfffbff09000400f3ff0300
f0ff15000000f1fff5ff02000f00ebfff5fff1fff8ff03001900080006001300f3ff0700fdfff5ffefff060012001700f7fff9fffbfff3ffeffe0700a8fff4ff
f3ff05000800faff0b001200e8fff2ff0100f4ff03000c00fcff0a00d0fffaff000002006d000500000012001f000800f2ff0b00f9ffe0ff10000e00fdff0c00
f3ff0600fffffdff0500fafffdff02000400f9fff5fffbfff3ff07001b00d0ff0700c8fff9ff000017000800f3ff27001b00f9fff9ff1d00fcff0a00feff0e00
020002000d003600030017000100e3fffdff0c000100fafff6fff1ff0a000500ffff0100caff0c00100017001200020000000100f3ff0f00feffe3ff1200fdff
0000fdff0f00feff0a0009003f000500e5fffbffe8ffffff1800feff0500f5ffecff3100deff180010000b0002000400f5ff0200f4ff25000700faff0d000300
f1fffeff0400fefff6ff0800f8ffeaff0c00e8ff1000100004000c00f3ff2300f4fffcfff5ffeafff7ffdaffaaff0900e9ff0c00f7ff0600fdfff4ff00000000
200000000200c7fe66ff2c000e000000e9fffcff0c00fbff19002efffaff0100000011001b001800fcff1d000b00f4ffebfff2ff50ff1600cafff6fff6ff1600
d5ff010004000200f8ff0200e7ff08000d00080008001100e4fffbfff7fff7ffbcffe4fff7ff0d001000f6fff7ff0100e4ff0200f4fff9ff0f000600c1fff8ff
eeff04000100e9fff8ffe7ff0f00f7fffeffedfff9ff07000800fcff0c001500fcff0200feff1300dffff6ff10001700f7ffeeff0b00eeff62ff0500bcfff3ff
f1ff01000500faff12001000e6ffeafffbfffbff0100080014000700f2fff0ff04000000d0ff03000300120002000700effff9ffffffd8ff16001700fdff1100
04000100fffffbff1f00f2fffdff0000fdfffffff9fff5ffecff08001200bffff6ff06fff9ff050005000e00f0ff23002e001400fcff1e00fbff160001001900
070009000a0000000c001a001200e9ff010006000800f7ffecfff0ff0d00fafffcff0600baff0e0003001c001000060003000600faff0f000c00e7ff1700fcff
01000100140014000d00f8fffeff0400e6ffffff4a00feff1700fdff1100eafff2ff3300dcff21000b00060001000a00efffe9ff00002e000100000007000300
f3fffdff04000400f5ff0f00030033001000f9ff1300150008000f000e001e00ffff0100f9ffeaff05005cff8dff0300e4ff0600f5fff9fffffff2fffcff0100
2c0001000000a6ff8cff00002500f6fff5ff00000c00f1ff130029ff0000fffffbff12001b000b00020017000300f5ffe9fff2ffa5fe0b00caff0000e2ff3900
ccff1e000f000900f9ffffffd7ff16000b0000000c000b00e9fff8fffaffedffe3ffd3fffdff10001700f9fff8ff0400f0ffe4fff7ff000011000800a3fff8ff
e6ff0700060024000300f4ff0100f7fff0ffeafff6ff1800cbff6dff1600eeffe9ff73ffe8ffe7ff0a00f7fffbff0a00feffcfff000000002f000200ecff0100
f4ff0900e8ff1200f4ff1200f8ff0300faff0400e8ff15000500ebff09000300eefffaff0300f3ffecffd9fff7ff0700fbff120011002c000f000300f9fffeff
eafff0ffedfff4ff0100c9ffc5fff0ff0400f9fffcff00000900070089ffe9ff2400e2ff0c0053ff16002100faff2200ebfff1fff3ff26000000efff07001900
030004000800b8ff030016000a00e4fff6ff070002000700e4ffe2ffe7ffedff04000000dbff0500e5ffe0ff17000300fbfff4ffeaff0100e8ff050012000900
f9ffeafffbfff5fff4ff0a00a8fff3ffebffeeffc8fff4fffdffeaff0c0001001800ebfffeffbfffe7fffcffe3fffeffe7fff3fecdffb1ff0000070015001200
fcff0a0003001000fcff080011002eff1700ffff0a000100000085ff0d006affe8ff1100f8fff5ff01001000fcff8dffe5ffeaffe2ff0a00fcff1b00ffffefff
e3ff08000100e9ff86ffd1ff9aff0200eefffcff0e00f8ffc6fff7ff1300ecffe4ff120084fffafff9ffd7ff0500f1fffcff9dff10000e001700fbff2000e4ff
0c00040000000e00eeff0f000400fdff240000001000c8ff13002400f9fff9ff2100d8fff6ff0e00f9ff1400fdff06003800cbff0900d4ff0800e8ff15000500
ecff000002001a00070004000800f4fff5fff2fff9ff0d00d5ff88ff1800f0ffe0ff71ffedfff5ffe7ff0500f2ff0e000500dfff0100110037000100fefffcff
feff0100f3ff1a0007001300010005000c000000e6ff0800f3fffbff1300f7fffcff0000ffff0000f9ffe1fff2ff0c00f9ff19001000c9ff0c00f7ff0000f2ff
acfffaffe1fffeff0200f9ffedff6eff0b00f2fffdfff7ff06000600c5fffffffbfff6ff0800fdff0f000a00f8ff2500e5fff6fff2ff1c00f6fffaff00000600
f5ff1f000b00d6ff020014000300e2fffcff0e000400cbffffffe8ffdefffaff08000b00f3ff0800eaffddff0800faff02000300f2ff0000f8fffdff1600fdff
0a00f0fffeff0e00fdff07009fff0400fdfff6ff90fffffffafff3fff8fffcff1300f2ff0a00dbffeefff6ffe5ff0100f2fff0fee3ff8aff14000a001f001000
fbff050003000c00fcff0f0003002dff1b00fcff0a000000050010ff14009dffebff0600d7fff3ff0b001300ecff31ffeaff0000f1ff0e00f0ff1b000d00dfff
f3ff05000200e9ff2dffe3ffb5ffffffddfffbff0900f5ffd0ffdcff1f0087ffdfff0f008dff0000feffc1ff0400fefffdffb6ff100000001800fcff1500daff
12000d00ffff0800f2ffebff090007001d00f3ff0600ceff0d000f00f8fffeff1400e7fff9ff0900000029000000f5ff2f0097ff1300f6ff0c00f1ff1700f9ff
f7ff0600fdff180003001200fafff3ffedffeefff2ff1800eaff86ff0000eefff0ffbeffedfff7ffebff0300f5ff11001000c9ff0b00efff2600040005000000
faff0000feff0f0000000b0008002400ebff1100f0ff1600f4ffffff0f000c00fcffedff00000b00f7ffecfff2ff08002400fdff08009eff0b00dbff0200f4ff
f9ffeffff0ffeffffbfff5ffe0fffdff1000f4fff2ff690007000b00f5ff0800f6ff07000400020004000f00faff2600f1fffdfff3ff1600060001000900fcff
00001800fdffc3ff0d001000ffffe6fff8ff1000fafffeffebff0000fcff01000800040000000900f4ffe3ff0000f5ffffffffffefffe7fffafff9ff06000100
1b00eeff0d00050004000800a2fffeffecffecffecffecfff5ffefffd1ffe9ff1100e8ff0300e6fff7fff9ffe1ff05001d0002fff6ff59ff0200060005000c00
f9ff1500fcff0a00ffff0a000500d4fe1c00ecff0700020005009fff0600cdfff6ff0200eafff7fff5ff0c00fcff71fff1ff0900f2ff1900ebff150002008fff
f2ff06000200f6ff72ffe2ffadff0000defff7ff0000f9ffe1ff6cff1200eaffe2fffeff99ff0800fbffc9ff0000f5fff5ffc0ff0c00f9ff0f00f7ff2200daff
1a000c0009000500faff0a000a0002001100faff0500d6ff05001100f8ff00000000e9fff4ff0a00020009000900fbff3100e1ff1800faff0300f7ff10000300
08000f00ffff1600000018000500effff6fff3ffffffffff0800cefff6ffefffe9ffedfff4ffe9ffe8ffdcfffdff16002300a2ff0a00f7fffbff090016000400
f2fffcff050006000600090016003b000300f7ffeeff0500e9fffffffdff00000000e6ff01000b000800f0fff1ff0c00f2ff0e00fdffbdff070001000000f0ff
fefff0ffd4fff6ff0300f5ff0000ffff1000fcfffcfffaff0100070009000e00fbff1500fbff000001000100f8ff2500fdff0a00f0ff0a00f6ff0d0003000000
fbff0d00fcffd9ff0a0016000000e2ff00000b00f9fffaff0e002b00fbff0e0000000300ffff0f00fcffffffecfff6fff5ff2a00f1fff6ff0000f0fff9fffdff
2b00faff1300ffff0f00040094fff6ff1a00f3ff31fffafff1ff0000affff9ff0200f0ff000007001400f4ffeaff03001500eefefeffe7ff0a000600faff0a00
fbff08000600030003001600f6ff13ff1800e0ff030001000900e8ff0600f1ffffff0200f5fff9fff9ff0600f6ffaefff6ff1a00f7ff2200efff0a001200f3ff
faff04000000f6ff76ffeeffc5ff0400eeffeaff0200f9fff1ff2bff04000400e4fffefff4fff7fffdffc4fff5ff0900eefff3ff0500ffff0600f6ff2100ecff
1400030003000800fcff0000050000000c00fdfff9fffbff04000200f6fffdffdeff2d00feff0600faff05001000f7ff1700deff0d0008000000f8ff0800fdff
f7ff1a000000fefff5ff14000900eaffedffecfffaff05001900b6fffcfff2fff5ff0a00f1ffd9ffe0ffe6ff010016000f002fff0500d7ffd9ff0a001400f9ff
f4ff06000200feff0100070011001a00feff0d00f6ff0100feff0d00d9ff0700fffff3fff4ff0a00fdfff9ff13000700f6fff8fff4ff1000080002000000f8ff
0100fcfff3fff5ff0100f2ff0600f8ff1000f8ff0000faff0000020014000b00f8ff0700fdffffff0600fafffcff1f00fefffcfff3ff060002000d000a001400
fefffffff9ffe1ff0b0019000300e8fff8ff0700f5fff2ff0800f6fff8ff0d00fafffefffbff0d00000006001500fbfff4ff1800effff4ff0400ebff0100feff
1400efffeafffcff0c000200c1fff2fffdffeeffeefff4ffeaff0000d9ffc1fff1ff0a00eeff15000900f7fff3ff00002800a6ff01000b001400fdff03000700
f9ff0700feff020005001200fdff78ff1000d9ff0300060005000000f3ff0d0007000600edfff5fffffff2ff0a00fdfffbff1c00f6ff1a00eaff0300f0ff1100
03000600fdfff5ff5dffecffd6ff0800fafff3ff0700c2ffffff0cfff7ff1300ebfffbff15000000ffffeffff9fff0fff2fffbfff0ff0700fbffeaff2300f2ff
0800e9ff02000b0000000b000000faff07001e00f3ff010006000700f7ff050047ffe4fffeff06000300f7ff0e00fcfff1fffffffafffcfffaffc8ffffff0600
0200190001000000deff0f000d00e5ffedffebff070001001d00daff0300f4ffe9ff1600ecffdbfff4ffe6ff09001500060069ffe7ff01008eff0900f2fff5ff
f4ff03000500f9ff030005000900fcff0400f2fffcfff1fff1ff0900e8fffbfffefff3ffe1ff060004000000fbff0a00e8ff0500edffe0ff07001a0001002300
0100f3ff0300f8ff0400eaff0900f7ff0c00fafffcfff5fff9ff00001800fdfff6fffffff6ff02001000fefffaff2200f6fff5fff5ff0c00020010000000f6ff
fbffebfffeff2a0015001b000000eafff2ff0c00f6fff4ff0100f3ff06000400e8fffdffedff100007000300f1ff0000fbff0d00efff00000000e9ff0000f6ff
0400f3fff4fff6ff0b00fbff0700f4fff1fff3ffe9fff6ff0500fffff8fff0ffdaff1700dfff1b0002000100f1ff0100faffe0ff01001d000f00fcfffbff0900
f5ff0c0000000400020012000500e4ff0c00e1ff0600070006000e00e2ff1e00fefffdffeffff5ff0700ecff07000000f4ff0800cfff1200e7fffdff06000400
160000000000f0ff42fff6ffebff0d00f3ffefff0400f5ff090038ffe8ff0e00f9ff10001c0005000300fbff0000f6fff4fff6ffc6ffbbffdfffeaff0a00f4ff
ebff06001000080000001600efff050004003400f7ff0b00f8fffdfff8fff3ff57ffe4fffbff0f00fdffe8ff0800f7ffd8ffebffedfffdff0600feffebff0700
f0ff17000600e9ffebff03000d00e8fff4ffebfff9fffbff0900f0fffffffcfff2ff1300feff1500e7ff060009001400f0ff06fff4fff3ff45ff0500e3fff5ff
f3ff0a000600eeff04000600f9ff02000600fafffeff0a0008000a00ebff09000100f7ffdfff0a00ffff180009000700eafff0fffbffd8ff0d001e00ffff3500
fffff7ff0600f7ff2200e1ff0600ecff14000200fafffafff8ff01002000e3fff2ffdbfff6ff040012000500f9ff22001100e0fff4ff0e000b0010000500f0ff
fefff1ff0200ecff0f0019000400eafff3ff0000f2fffcfff8ffe7ff0a000b00eefffeffd3ff100013000d0008000600feff0a00f3ff02000000e5ff0e00faff
fbff0200d9ffffff0b000900fafff4ffddfff5ff4000f4ff1d0004000a00f1ffdeff47ffd3ff19000a000600f8ff0300ecfff9ff000022000800080004000300
f6fffbfffdff0000000010000e00f2ff0a00ebff0800080006000d00dfff240004000600eafff5ff1c00d8fff9ff3000f2ff0000fdffffffecfff6ff00000300
2400fefffffff1ffdbfe300010000a00f0fff3ff0700fcff11004affdfff0800faff0a001e001600050023000500f8ffecfff1ff5dff1b00c0ffe8fff4ff0100
8dfff7ff0e000c0001001100faff000003002a00eeff1f00dffffdfff8fffeffc7ffcefff7ff11000100ddff0100faffd4fff6ffe9fffaff0a000300d5ff0200
faff10000600eeffeffff4ff0f00ebfff8ffdfffedff0200f9fff8fffafff9fff0ff1500f8fff9ffd2fff9ff0c001300e6ffa1ffd2ffe8ff6cff0400d6fffaff
efff06000000ebff0f000900fcfff5fffeffeaff04000900fbfffdfff2fffeff0600f4ffc8ff0300f7ff1900f2ff0c00f0fffcff0100d4ff0c000c00fcff3500
faff03000000f8ff0600deff0700e8ff09000300efffffffeffffeff1a00d4ffe8ffbaffecff040005000800f8ff1f0009001c00f8ff1900ffff0b00f5ff0000
fcfff2ff0200faff02001f000000f3ff0100f6ff0000f4fff3ffdeff1000ffffd5fffcffb7ff1400f8ff18001200030000000000f5ff05000400edff1700f9ff
f7ff0a000e000300080004001300fdffe4fff1fffafff7ff220002001000f7ffe7ff4b00cfff1a00ffff110000000000d7ffe8ff070026001b000300feff0200
f4ffffff0400f8ff01001100080010000c00feff0a00090007000e00f5ff1c0001000400f0ffe8ff0d00d0fff4ff2c00edfff4fffdfff7fff5ffecff0500feff
310001000000ddffb3fe0f0016000c00fbfff4ff0700f8ff090017fff3ff0e00f5ff0a001b000f00030020000900e7ffedfff0ff09ff2200b4ffeefff1ff1600
dbff08000f000100faff0e00eeff0c0004000c0000001500c8fff3fff6fff7ffeaffeffffdff0f000c00dcfff2ffecffd2ffcdffe7fffaff12000d0062fffdff
efffffff03002b000d00f5ff11001100ebffeefff0ff0b00d9ff6fff0a00beffdaff84ffe9fffcffffff0300fbff0f00f1fffdff0d0007001e000500ffffffff
00000d00e4ff1a00fdff0d000300f1ff06001500ceff1700f5ffe0ff150008000500f1ff0c00ebffe2ffbbffdaff0c00d0ff0d001700e1ff0b00ebfff9fff0ff
b8ffd8fff9ffdeff0c00e4ffffffe8ff0700f0fff3fff1ff1a001d00aeff0f00240003001000b4ff09001500feff2000d2ffffffeaff1f00e1ffe3fff8ff1200
0200fafff8ffb5ff0f001200fcffdeffe9ff00000500f2ff1900f0ffceffddff0d00f3ffe9ff0000e0ffeafffbfff3ffefff0c00fdfff5ffedff010004001600
0500e0ffecfff6ffcfff1a00aefff6fffbffe9ff69fff8ffdefffeff0b00f9ff1100fcff1700ceffecfff5ffe4ffd0ffcaff7bffedffb8ff1c000f001f001200
ffff100002000700030016001f003aff1300fbff03000e000400c0ff0b0042ff03000e00d5ffefff0e0022001e006afff5ffd1ffe7ff1400f0ff1700f8fff6ff
f3ff09000200eaff6bffafffaaff0700f8ffe9ff1000f2ffc2ffe2ff1300e3ff1600050089ff05000300b7fff9fff0fffdfffdff1500ffff1f00f9ff1600daff
1c000c00fdff0c00f8ff2500140009001d00e7ff06009efe0e000e00faff09001800f5fffbff1100fcff2a000f0005003c00b9fff6fff9ff0500fcff21000100
e7ff0d0001002900fcff0000f8ff0600f7ffe1ffedff1900c7ffbbff0f00cbffd0ff86fff1ffe6ffdefff4fff5ff0a000200ebff1300f6ff1a00040012000800
ffff0200f1ff1200040005000b000000cdff1700ebff0c00fffff0ff100002000200f6ff0700f8ffe6ffc9ffeaff0100e8ff0100130010000a00f0ff0500e2ff
dbffe8ffe4fff6ff0100cfff1100f7ff1200f8fffdfffcff19000500dcff0d001f0008000600fbff04001d00fdff1b00e2ffeaffe5ff1300dbffeaff06000100
edff0700f4ffb6ff0a000b00faffd2fff1ff1e00feffd7ff1700e9fff4ffeaff1a000900f6ff0100e2ffc9ff0500f6ffedfffdfffafff9fff0ff0000f8ff0a00
0600e4fffeff0000ecfffdffabfff2ff1a00f2ffddfffeffdcfff2ff0600e8ff1200f2ff1600d8fff3fffdffd7fffdffe8ff27fff1ff76ff0d00010017001000
000011002800fdff0b00140026004bff1500fefff7ff0000feffcbff0e0078fffaff0900e1fff3ff070009001d000afff5ffdfffecff0900e7ff1500f3ffcdff
f4ff07000000f3ff81ffd0ff94fffdffeefff2ff0700e8ffd9ffb8ff0a00f6ff0800060087ff08000900c1fff5fff7fffeff08000f00ffff1a00efff1500cfff
040010000300060000001a00080002001800eaff0f00adff10002900f5ff0c001600e2fff1ff1200eeff2600100005003f00e1ff2500f0ff0e00f4ff20000700
0200040003002a00ffff0b0008000400ffffecfff9ffc8ffdfff7aff0c00c2ffdaffa5ffebffe9ffe7fff7fffaff0e000800e6ff1300f1ff050006001000feff
040000000a001500070002001a002200e7ff1100f4ff0100e6fff2ff0e0006000500e7ff0f000a00e7ffc0ffddff0900e8fff5ff0f00ebff0200f9ff0400eaff
d7ffe3fff3ff03000000e7fff4fff3ff1900f0fffeff03001400feff050011000f0011000d00040010001d0004001e00e8fffbffe9ff0a00d2fff7ff01000700
feff1600f7ffc7ff0a000a00f5ffd8fffeff2100fcfffdfff6fff9fff1fffaff13000800f6ff0700dfffe4ff0900fcffeeff1100f7fff4fff5fff8fffaff0700
0d00f1ff070000000000ecff88ffe6ff1d00f0ffb9ffe1ffccfff3ffe6ffecff1000f5ff1300e7ff0100fbffcfff0000fbff9dfffaffc9ff0300ffff1b001100
0000e4ff29000c000e0013001b002aff1800f0fff6ff00000400cfff1200d3ff0f000000b1fffbff13000b002600a8fffbfffffff5ff0e00ebff1000feff90ff
f9ff0600fdffecff7affd1ffabff0300effff6ff0200fdffe3ff2dff0e00edfffffff7ff9afff3ff0900a1fff5ff0f00f8fff1ff0f00f2ff1100eeff1900d0ff
0b000a000700f6ff08000d00040000001200f1ff0000c2ff12000300f6ff080008002200fbff0b00f8ff18001c00f9ff3800e0ff2a000f000200f5ff1a00fdff
13000d0009002400fbff1000ffff00001300e7ff03000b00f7ff8aff0600baffdfffd9ffeeffd9ffefffe8fffcff12001900b8ff1700eeffe6ff0b001b005200
0200ffff050004000100ffff2e001b00dbff0500f9fff7ffffff00000300fdfff8fff1ff07000e00e5ffc9fffcff01000200f4ff01000a000400e1ff0500e3ff
f8ff0000ddfff5ff1100d9fff9fff7ff1500f1ff0200ffff0d00edff120018000c000d000a00f6ff09000f0006001c00e7fffcffe7ff0200d8fff6ff0800faff
f7fffffffeffc7ff02000e000300d9ff03002800faff0200fdff2500effff0ff06000400f8ff0900eaffeeffeefffdffe9ff1600f3ffeeff0300f2fff2ff0500
1000ebfffefff6ff0900ddffaffff2ff2c00f0ffd6fff2ffd9fff5ffe5ffc9ff0700eaff0e0000000800fcffe6ff0100210078ff0900dbff0c00f7ff11000a00
fdff0c00170015000e0020000e0083ff1400e7ffdeff06000000fcff0500f1ff02000300e7fffcff100008002800e8ff0600f5fff0ff1d00ddff09000000faff
00000300fcffeeff87ffe6ffc0ff0700f5ffe4ff0000e5ffecff57ff08000d00f8ff0300f9ff11000a00cefff7ff0100f2fff7ff0600f4ff0b00f2ff1600d1ff
0800e2ff0c00fcff120014000400faff07000000f9ffccff16000600f0ff0400f8ffdffff6ff0800f5ff0d00200005000d00feff14000f00f8fff2ff0a000000
1f001a0007001400fcff11000400f8ff0900e8ff0b00080011009effefffc3ffd8fffbfff0ffd3ffe6ffeaff020015000b009ffffcffe1ffd6ff0d001c000000
0000feff090003000f00f8ff31002b000200daff05000400e3ff0a00f9ff1000faffe2ff03000e00e8ffe5fff4ff0b00effff5ffeeffe0fffbff00000600f9ff
fdffecfff2fffcfffffff4ff0a00f3ff1b00eaff0000faff0700daff1d001500000009000100f6fffcff0d0000001d00f0fff4ffe6ff0000fdff02000000e7ff
f5ffeafffaff0e000b0014000300d9fff9ff2900f2fffbff0b00faff00000000e4ff0200e7ff0f000600fbfffbfffefff4ff1700eefff3ff0600eefffefffeff
0a00f7fffefff6ff0d00ecffbeffe7ff0c00e1ffc4fff6ffd2ff0100e8ffe3fff4ffe4ff01001400f8ff0000efff00000600c0ff0b00fafff5fff4ff02000e00
fefff7fffcff10000e001e000900c3ff0e00edffedff050004000900ecff09001c00fdfff7fff7ff1300feff2f00070009000700e5ff0b00deff060002000b00
08000100fefffeff8affecffc1ff0c00f3fff0ff01009cff07001effffff0900f8fff6ff1800ffff0e00dbfff6ff2200f6fff4ff0000effffdffedff1b00e4ff
0c00e5ff0e00f7ff120002000000effffeff0f00f7fffbff0900fafff4ff1100ebffe3fff8ff0500f5fff4ff1c00fbffd9ffe9fff7ff0600fafff0ff0a000100
060009000200f3fffbff0b000900e9fff4ffecff0b000000f5ff92fffdffd0ffe1ff1000e1ffdbff0800eaff0b001500f1ff5cffeaffe3ffc3ff0b0018000000
ffff02000d00edff0900f7ff270006000500e1fffdff0500f8ff0d00f1ff1200fefff1ff03000a00ebfff1ff17000200eefff2ffefffe5ff0300150003001300
fdffe2fff5fff7ff1500d6ff0000e0ff0c00fbff0800f8ff0000d7ff28000a00f6ff0200f3ff01000e00feff03001d00f5ffe4ffe6ff0000000007000b00e0ff
f4ffd5fff3ffd6ffe8ff17000100edfff4ff0b00eefff7ff0300eefffbff0600ecfff9ffe5ff0e0005000c00e0fff9fffcff1a00f4fff1ff0b00e9fffcff0200
0700edffeffffeff0a000800c4fff2fff9fff0ff1300f1fffdff03000300ecffdfffe9ffe9ff1e00f9ff0000f4ff0100f0ffd9ff14000f001300eefffcff0a00
feff0600fafff6ff0f000f001400e3ff0800edfff1ff010002000900deff18002000fbffeffff2ff2400ecff310017000600f5ffc9ff0400d5fffdfffbff0700
1800f7fffcffeaff5ffffdffe4ff0f00efffeeff0000f2ff0b004afff7ff0500f5fffaff2100ffff10000d0003000500f6fff2ffeaff0800dfffe6ff1200f0ff
e4ffd3ff1200070017001d000200fdfff5ff1a00deff0c00f6ff0400f5ff0f00d2ffd0fffdff0f00f4ffe7ff1700f3ffb4fff0ffeafffcffffffd9fffeff0400
02000600feffe8ffe3ff03000c00e0ffefffe1fffbff0100ddff00000100caffe5ff0e00f3ffe4ff0100faff07001200e7fffcfeeefff9ffbbff080015000000
00000000f9ffe5ff0700f7ff1b00f1ff0500c5fffefff7ff00000900f5ff2f00fefff1fffeff0900eeff0200ffff0600e6ff0000fdffd7ff020005000200feff
0800eafff6fffbff1000daff0400eaff0800fbff0300fdff0600e4ff2300f4ffe1ffffffe0ff04000200050000001800feffe4ffeaff060012000a000000e1ff
fcffd6fffeffe3ff13001a00fbfff2ff00000000f7fff8ff0300e2ff05000600bdff0000d8ff15000a00000010000600ffff1200f5fffeff0300eeff0c00fdff
f7ffe0fff5fff3ff0d000500f0ffe4ffddffeafff3fff5ff090000000c00fcffe2ff1300ceff1900fdff0000f3ff0400d9ffe7ff09000b001000edff12000a00
fcff0c00f9fff9ff0a000e000f00e9ff0900fdfffafff7ff05000e00d7ff1f001100f5ffebfffbff1700efff2c002f00fcfff9ffecfff8ffe2fff8ff14000300
2e00e4fffbfff4ff1cff2b00fcff1100f3ffeefffeff01000a0056fff5fffefff6ff01002300fcff120006000500fdffedfff1ffbbfffeff88ffe9ff04000000
f2ff07001400040013000d000100fbfff5ff1a00f6ff1200f5fff8fff6ff1500eeffe1fffaff1000efffdcff0b00efffa3ffc4ffe1fff0ff0700fdffdefffeff
e2fffefffdffe9ffedfffaff0a00dcfff5ffeeffe1fffeffefff0100feffbeffeeff0d00f9ff1a00ddff08000f001600e7ff28ffe9fff5ffb4ff04000300fcff
f5ff0400fbffdeff1500ffff0e00f1ff0600e1ff0500feff0e000500fbff0100fffffeffebff0e00f8fff2ffe7ff0900ebfff0ff0300e5ff0f00050004002800
fdfff0ff0200f3ff0d00baff0700dfff0c000c00fafffefffaffecff2200eeffd4ffe3fff5ff050007000b00fcff1e00f7ff1200f2ff1200140009000700f8ff
fbffe3fffeffd0ff0b0020000200f0ff0500f8fffbfffbfffbffceff0a00fcffd6ff0100d4ff17000e0009000b00fefffeff0400fdfffcff0900edff0f00f7ff
f8fff0fff6ff010008000c00d4ffeeffe8fffcff0600efff0600070017000400f0fff2ffc5ff1e000b000d00fbff0b00e5ffefff0e001b001f00f0fffcff0900
f9ff0800fcfffeff0a0009001b000000070001000200020000000600ebff1d000b00fdffe8fff6ff1f00ceff22003b00f5fff2fff9fff5ffdffff0ff02000100
1e00bffffdff0900f6fe1b00fbff1600f7ffe7ff0000fdff040079ffe6ff0500eaff05002100110011001f000500e6ffeaffeeffa1ff0000aaffddfff9fff8ff
deff0d002400010009000e00f6fff8fffbff0b0001001900e8fff6fffdfffcff0300d3fff7ff0f00feffd6ff0000f0ffadff0500e4ff01001300feffb7fffdff
d4ff1e0014003a000100f6ff06004200e4ffe8ffeeff1b00d3ff66ff14009affe0ff70fffffff8fff8fff0fff7fffeffe9ff0d00f5ffeffff0ff05001800f5ff
00000e00dfff0d00010009000400f5ffefff1f00daff13000e00ceff100025004f00cfff1300edffe5ffadffecfff6ffe4ff00001a00c5ff1400f1fff9ffcfff
d0ffcaffe6ffd5ffffffdeff9dffdbff0e000100f7fff9ff26001200e5ff18001f0002000300bfff0f00140002001400ceffb1ffe7ff1c00c0ffadff03001600
f5ff1600edffd3ff07000e00e0ff97ffe0fff3ff0800d7ff1100e5ffe0ffb7ff1100e8ff1700f9ffd4ffcafff6ffdefff1ff0300ffffe4ffd6ff1400f2ff1d00
eaffddffe3ffecff9cff1900b5ffe0ff1900effff8fffeffd0ff05001800ecff15000a001900caff0100ebffe4ffc6ffd7ff2bffeaffc0ff0a00010097ff1400
01001000110008000f000c00160096ff0b000b00f0ff01000000f9ff0a004bff10000900d0fff3ff10001c0033008efff3ffddffedff1500daff0c00ffff1900
e6ff0d000000d1ff5dff97ff7cff0f000c00e2ff1500edffe4ffbcff0800edff34000800a0ff0e001100d4fffaff0d000f0006000f00f3ff1d00f4ff0000d1ff
03001500f2ff0a00000031001000f2ff2500d6ff0a0075ff0f002600f9ff00001e00edfffdff1500e2ff6f00160002005500eafffeff91ff0d00f8ff1e00e0ff
ecff010014004000faff000006003a00fbffecffebff0d00d4ffc4ff150096ff9cff77fff5fff0ffdbff0800f6ff0000e6ff0b0009000000060008001900fcff
14000300f4ff1700060000000b001c00eaff1100e6ff1800fefff8ff0e000c004800f0ff1100f5ffe1ffb3ffe0ff0000c1ffd6ff1c00fdff0500ebff0300daff
e5ffc9ffe6fff7ff0100c2ffecfff1ff2100fdff0100f8ff24000000f3ff17002d0013001e00000013001f0012000e00cbffaaffd7ff09007dffc1ff0100feff
e8ff0b00e0ff9eff09000500d8ff67fff0ff23000500f4ff0500c4fff9ffc1ff24000b00fdfffeffe4ffd9ff0700f5fff5fff8ff0900efffddff0d00e4ff2800
0600f3ffebfffeffbbff010097ffeaff2d00dfff90fff2ffd7ff01000d00f1ff180013002300c8fffaffeeffcefff0ffccffaffff7ffb2ff11000a001f001200
0200d4ff1800140019000000300039ff0a001100e9fffefff7ffecff1c0073ff0c000000daffe5ff030018003b009bfffbffd6fff6ff0d00e6ff0e00d4fff4ff
f1ff0a00feffe1ff81ffd0ffa6ff0400fcfff4ffe9fff0ffefffb2ff0f00f1ff2c000000a6ff05001a00acfffbff20000400f2ff0f00f4ff1b00e5ff0600daff
0e000100fcff0200090032001800f6ff2300d7ff190082ff0f000800f6ff14001a003200e8ff1500f0ff4100180005004700d3ff0d0001000600f6ff2600fdff
000005001400360000000f00000032000700e0fff4ff0600c6ffa5ff21008bffbeff7cfff1ffebffe3ff0000f3ff0000f9ffecff0e00f5ffebff0c0019000c00
150001000f0012000700fcff18001a00cfff0c00f2ff0b001400f9ff0d000e003200120013002000f7ff84fff0fff1ffc5ffe1ff0b00e2ff0700eaffffffdfff
c0ffc2ffddff0b00070098ffdfffedff19000300fcfffcff2400daff10001a00200012001700f1ffecff10000c000f00d5ffe4ffdaff0200c4ffd3ff0700f5ff
fbffffffd7ffc3ff12000000f2ffbafff4ff2200ffff1000f2ffd6ffe4ffd2ff2000100001000000e7ffd7ff0400fdffe6ff0600ffffedffe3ff0300efff2100
0a00f3fffbff1300feffe5ffa8ffe5ff3700f2ff0000d8ffcffff9fffbffc9ff1600f6ff1b00e5ff0b00fcffd6ff0400deff4aff0300d1ff0200fbff1c001000
0400fcff07000800170003001d00b1ff0c000900dffffafff5fff5ff0e00d5ff1e000200e2ffeeff040011003a0040ff0a00d5fffcff0000f7ff0d00eeffa8ff
eaff0300fbffe9ff64ffd6ffb0ff0300f4fff9ff0100fcfffaff35fff9ff05001d00070098ff04001400cbff00002100fcffe4ff0c00feff1000eeff0700ceff
0e00f7ff0300fcff180022000600f3ff1b00f3ff0e008cff0b000500eeff1b001600cdffecff0f00dfff4800220008003600e9ff19003300fbffe7ff1f00f5ff
2400170015003d001500100008002300b3ffd0ff1a000d00dfff6bff000086ffd5ff9efffaffe6fff9ffeafffeff0800fdfff6ff0c00caffd4ff0f001c000100
1300f9ff1f0001000700f7ff28002e00e7ffe7fffeff0c00f1ffebff0c000f002800fdff1f002100e5ffa8ff06000400c8ffecff0100f8fff2ffecff0800ddff
e2fffefff3fffcfff7ff65ffe3fff5ff0f00f0ff0400fbff1400b4ff190017001a0011001c00f7ffecff20000b001000d1ffeaffd5fffaffd3ffe5ff0000f7ff
f1fff6ffe2ff08000d0005000a00a1fff1ff2100fbff0f0000000800f6ffdbff0d000900f7ff09000000e8ff0b00f9ffe9ff0800faffd5fff3fffdffebff0900
f7ffefff0000f9ff0100e0ff90ffdcff3300f5fff3fff3ffd0fffffff5ffc8ff0d00f9ff1e0001000700f7ffdafffefffcff53ff0d00d6ffeefff9ff29000d00
0000d2ff0b00210015000f002200dbff0b000300cffff9fffaff02000600eeff3d00f7ff98ffe0ff13000f00410011000d00e2ffffff0800e8ff0500ceffecff
f4ff00000000f6ff80ffb3ffc6ff0900fbffddffffffe7ff01002bfff0ff0c001700eeffe0ff13001500b8fff6ff2600ffffeaff0e00d4ff0c00feff1b00c6ff
1000e6ff0400f0ff24001c00f5fff0ff0d00edfffbffa3ff0c00ffffeaff15001000dcfff0ff0d00c4ff1c00270004000000e0ff20001c00feffe6ff1b00e2ff
3d0001000f001700f9ff1100010005000d00e1ff26000600e7ffb6fffeff84ffdbffc0fff7ffd1ffedfffdff04000b00dfffc1ff0100e5ffc8ff14002100ffff
1200f7ff2b00f2ff0600f0ff29001f00f8ffd0ff07000000f1ff060002001e00fdff090018001600e1ffaeff0300fbfff1ffe8ffe3ffe3ff0000fcff0000eeff
f1ffa9ffecfff6ff03000aff0a00e2ff1600f5ff170000001000a5ff29001b00070011000b000000eeff1b0010001300eaffdeffdcfff7ffedfff2ff0800e8ff
efffe1ffd2ffb1ffe9ff0d000700d1ff1b001400f7fffffffefff2fff7ffc7ffe6ff0000f2ff0d001500eafffbfffffffaff0b00f5fff0fff6fff4ffffff0200
f8fff6ffebfffeff0600feffb8ff0a001f00e0ff0700eeffc6ffffffffffc3fffeffd4ff160016000c000400e1ff0700fcffd0ff1700e5fff8ffeaff29000d00
02000a00edff19001600fbff2000d2ff08000b00c2ff0500faff1300f1ff04003e00f9ffe9ff9eff1800030044001f001200e4ffe7ff0100d0ff0300f1ff0c00
00000200fcffdfff04ffdeffcbff0e00f0fff0fff6ff9bff0f0080ff0f0014000400fdff140001001b00e9fff5ff33000000f8ff0800f1ff000012001600cfff
0900e3ff0400f3ff2a001400fdffc8fff6fff9ffffffdeff0c00f6ffe9ff13000d00ccffe3ff1400e3fff3ff2700faffa6ffeeffeeff1f00fcffefff0a00deff
3900f1ff0400f9ff0e000b000800f4ffeffff4ff23000c00d5ff71ff100097ffddffd9ffdcfff5fff4ffeaff04000a00e9fffafeeaff0000bdff130025000200
1200f2ff2a00e2ff0800ecff29000a00f9ffd8fffbff0c00efffffff00003400efffe7ff0b001700deffd3ff18000800dcfff0ffe9ffeafff1fffeff00000100
0900c8fffafff4ffe8ff02ff0f00e6ff1000feff1c00faff0800a5ff24001000d8ff0a00dcff0000100013000e000f00ebffefffe1fff7ff1700fbff0200d2ff
fcffd7ffeaffd1fff5ff12001100e1ff21001200f8fffdfff6ffd4ff0900f9ffc5fffeffd3ff16000f00fcff0000f5ffebff0c00fcff00000d00faff0400feff
0100fafff8fffeff09001d00c1ffdbfffafff3ffcbffe9ffe5ff05000900edffecffdafffeff1b00f2fffbffe9ff0900e3ffdfff2800f8fff7ffe4ff1f001000
00002800e6ff05001100fbff0e00e4ff03001200daffe4ff00001200d6ff14004800eaffe8fff4ff1800000047001a000e00ebffacffddffc9fff7ffebff0d00
2100fcfffcffe1ff61fff5fff4ff1200f5fff0fffcffefff110026ff08001200f8fffaff2400fdff1c000500f4ff2a00f6ffecfffffff0ffe7ff18000f00edff
0300dbfff9ffffff2d000700fefff7ffe8ff0400000000001500eeffeeff36000a00dfff04001200d0ffc2ff1e00ecff55ffdfffe8ff09000400f9ff1300caff
0900eafff4ffdbffeeff0a000800d3ffe2ff11000f000700d5ffefff0b009bffd6ffccfff9ffd0ff0400040008000300d7ff9dfffffffdffb8ff090027000b00
0b00f7ff0600daff0f00efff1800f7ff0400b6fffcff04000c00000000002f00f8ff010005001600f9ffe8ffe7ff0000dafff3fffaffe5ff02000300fffffeff
1300d9fffdffe5ff0c0061ff0800dafff0fffeff4600f9ff0a00bcff26000400f3fffeff06000a0007000b0011000f00efffe6ffdffffcff1000feff0700c6ff
f9ffd0fff0ffc8ffe6ff16000a00e6ff2700f0fffafffffff9ffd6ff0200eeffdbff0200e0ff160024000a00f4ff0300faff02000c00feffccffeeff0800fcff
f8ffe5ffe7ff0e0008002800c0ffd3ff0700f3ffedfff1fff6ff08001400f8ffebffeaffdeff1b0000000200f1ff0900e3ffdcff1a00ecff1400ccff11000f00
03000e00efffe2ff1800f0ff1c00eeff01001a00e1ffe6fffcff1100e1ff17001c00f6ffdeffebff1e00f9ff4b003400fcfff2fffcffe2ffdffff6ff0c000800
4d00d3fff6ffe6ff54ff1f00dbff1200f8ffe9ffedffffff070050ff06000500faff09002300000022001a0010001400f4ffe6ffeefff3ffd6ff1b001300dcff
f3fff5ff0b00faff280002000100e6ffdfff0d00f8ff140003000000f8ff13000d0095ff06000b00d1ffc1ff1600f0ff2bff0500dfff04000a00eafffcffd2ff
e9ffc1fff7ffddfff3ffffff1100d2ffeaff0c00e3ff1400d5ff140005007affe5ffe3fff6ffdcfffbff0d0009000d00eaffc1fffbfff9ffa9ff050025000000
fcfff3fffdffddff0500f7ff1a00edffecffbcff090001001700fdff00002600f4fffcfffcff0b00f8ffd9fff6ff0d00cffff3ff0900b0ff07000100feff0600
0c00d7fffeffe6fff5ff9aff0400dfffeaff03003400fcff0600dbff2100f2ffe2ffe5ffa2ff0600f8ff2c000d00150012002200ebff0d001f00fffff9ffecff
e8ffe7ffedffe8ff1c001e000e00deff1a00050000000000f0ffb0ff0b00f2ffc1ffffffddff200016000c00effffefff4ff05001200f6ffdaff02001e00feff
f7ff0f000a000d000b002a008bffdefff7fff3ff7cfff6ff0700efff1c001200f5ffebffd1ff1e00feff0300f6ff0b00daffd6ff0f00f8ff1600e1ff0f001200
fcff1500fcfff2ff0f00f9ff0600030003001e00f2ffdfff0200140003001d000f00edffe0ffe2ff0600050042003600efffe5ff2500e2ffd2ffeffff5ff1a00
2a00a2fffeffffff13ff2700e6ff15000d00e7ffedff040004007fff0a000800e7ff000014000e001b00170007000000f1ffebffe8ffe1ffd3ff10000900e4ff
eaff0f001000070014000200fdfff5ffe5ff080013001f00f8ffeffffeff01001600efff0a001100f4ffacff1900eaff40fff2ffeefff9ff1000f9fffdffaaff
d9ff0f0038002a000d00f7ff15005d00f8ffebff1d001800d9ffc7ff21008dffc1ff1cffe5ff0000d0fff8ff0600fcffe1ff1f00030029ffcaff08001e002b00
06000c00e1ff0a00e4ff1400d1ff2800e5ff1600cbff12000c009fff0e000a002d00e8ff1400bffff3ff8bfff0ff0000d8ffeaff2a00d4ff0600e7ffe4ffc8ff
ebffd7ff0000a7ff09000a00b6ffe8ff1700feffeafff8ff20000c00d3ff1c00f1ff0f00f8ff78fff3fff9ff1700f2ff97ffb9ffccff1e005bff8ffff4ff0300
ecffe8ffd8fffcfffbfffcffdcff9dffe9ff030003002600f1ff43fffbff92ff0d00d6ff1d00f1ffe1ffd4ffe9ffdcff07000b001200feffd7ff1700fffffdff
f3ffd5ffeaff15007fff280086ffdeff4200f4ff00000000e5ff07001600deff170016001c00c4ff1600cfffceff2900e2ff65ff0600abff1f000c0035ff1100
0800f7ff060003001200e9ff21007cff03003800bcfff2ff05000f0013009aff0900f2fff0ffe1fffaff23004800deffeeffa6ff01002700e7ff0f00c9ff0b00
f6ff17000900d2ff46ff5cffd6ff0f001b00f7ffcffff2fffdfff0ff0a00e1ff44001f00cbff1f001200ccff000006000c00ffff0f00fdff1b00f5ff0300d1ff
0a000800e9ff0900ffff1700230003002900ddff120026ff0f000a00f1ff1a0021003d00ebff1400c7ff85000e00edff4a00d3ff0000d7ff0f00faff1c00d7ff
ecff0d0037004000fdff1200fcff66000400ffff01001a00c5ffd5ff28007effd4ff13fffcfff2ffe5fffbfff2ffebff080012000300f1ffebff0a0019001a00
1c000e00fbff1b00f8ff000000000000e8ff1900d3ff15001800beff1a000f005600b8ff1c00aeffffffb8fffdffe8ffdbffb8ff1a00d5fffbffedfff3ffceff
f3ffe8ffedffe0ff1e006fffbefff5ff1c00fbfffbfffaff27001500f5ff28001b001f00f9fff8fffcff06000a00e8ffcbffbfffc7ff0600aeffbbffffff0200
cafff9ffdcfffbff0a00f5ffd0ffb7ffdcff1500c5ff0a001100adfffeff80ff2a0012001300f0ffccfff3fff5fffdff08000c001100f8ffe4ff1600f5ff9dff
cafff6ff00002500abff1b009cffdbff4900effffeffecffd7ff06001400e8ff1e0023001d00c7ff1b00f5ffd4fff1ffd5ff49ff0100abff03000f00afff1900
050017000f000f002000daff220034ff00001700cefffefff1ff000011006efffffff5ffcaffebfff7ff1f005200fdfff8ffeafffaff1a00f5ff0800e6ff0f00
f0ff16000200d3ff4affa3ffbeff07001b000f00c0ff09000a00baff0800050055001500c3ff18002200d6ff04001e001300e9ff0a0001001e00e7fff4ffccff
02000a00f9fffaff110033001f00fbff2d00edff1d0043ff0500f3ffebff11002100ceffe1ff0300d5ff5700060002003100e3ffe9ffccff1100f1ff2f00f4ff
fdfffcff3d0044000b000c00010060000400e3fff8ff2400ddff87ff27006cffccff7cffe8fffeff0500fbffeffff8ffeaff0d0012000400c1ff110018001a00
2900fdfff5ff1a00e8fff9ff0a0021000200f4ffddff08000800d5ff050011003800efff20000d0013008cfff8fffbffc8ffcbff0b00e6fff5ffd7fffeffdeff
daffd4ffedff07000a0068ffb2fffcff1400fefffafff3ff2500c5ff0f002800370022001e00f5ffdfff12001900e9ffacffe0ffcfff0200bfffc6ff01001400
e3fff5ffccfff3ff0600f3ffe9ff85fff3ff0800dfff26000b00cfffeaffa8ff230018000d00ffffefffedfff3ff1500f1ff07000d00f1ffefff0b00f2ff2a00
e9fff0ff05001b00feff140094ffecff41000100f4ffc1ffd5ffffff0800d8ff1b000d002100d8ff18000000cfffebffdfff75fffbffb3ff0a00fdff31001100
03001900150007001700d6ff220058ffffff1b00c5fff5ffefff09002200d3ff1800f3ffeffffcff0c0018004b0015000100e0ff0c001b000500040068ffd5ff
e6ff0300fefff5ff0bffa6ffcdff08001600f2ffb8ff12001000cfff0200f5ff2b001b00b8ff19001b00c7ff05001400feffd4ff0d00f5ff1400e6fff4ffd6ff
0f00fdffefffefff1a002f000f00faff2500e0ff250067ff1200e2ffeaff1d002200d4fff6ff0700ddff59001e0000001200d7ff140021001100f7ff3100f1ff
34000300170033000a00140005003f000300ccff28000c00c4ff7cff120062ffcfff7dff0300f1ffcfff06000100ffffdafffbff0e001600b1ff170025001300
1f00e7ff380009000200f4ff1b002d00eeffcffff3ff0b000c00edff0e001b002200caff1d002d00fdff6fff0900f0ffc7ffe5ff0000c7fffcfff0ff0100e1ff
d5ffdcffe2fff5fffdff81fff1ff06000e00f8ff0200ffff2100caff1100270018001c002400faffe8ff0f001600f7ffb3ffa5ffcbfffaffd0ffd8ff00000400
e8ffd7fffaffb3fff9fffbff000093fffaff0e00e0ff16000900edfff6ffbdff15000800120003000400d7ffe6ff1600f8ff09000100e7ffe1fff9ff02001e00
d3fff8ff020008000400f6ffbbffd0ff2b00f5ff0f00ecffd2fff3ff0700f5ff1b00f0ff230000001c001000d1fff4fff1ffe1ff1b00d3fff5fff2ff41000d00
0000feffffff31001800ceff2500c0ff01001d00bbfffcfff3ff0a000f00f0ff5a00f4ffe7fff4ff03000c004e0020000400e2ff0500eaffeeff0000f8fff8ff
e1fffffffeffe0ffa0ff68ffc7ff0b000600ceff0000f6ff1b00b7ffe0ff0f001c00fcfff0ff0e001c00e5ff030023000300ddff0f00ebff100018000d00ccff
0600f4fffdff90ff1e001c000000eeff0e00eeff0e007bff0f00ffffe6ff1c002000cbffdfff1000b0ff160023000000e2ffddffd7ff1b001100ddff1700d0ff
4300fafff9ff0f0003000f00140013000700e4ff3d000800d0ff8eff10005fffd7ff2ffff6ffedffebfffcffffff0300d5ffa9ff18000800c5ff180026000500
2000e1ff5400efff0c00eeff1f0027000000d9fff3ff0500d1fff7ff00001e000200e8ff1e002500ecff6aff19001200cefff3fff9ffe2fff0fff0ffffffe4ff
e0ffb9ff00000500deff22ff0500f5ff0e00f8ff1600f7ff1400f5ff1c002900000021001200f5ff0c0029001700f7ffacffb4ffd8fff9ff0200dfff0000e1ff
f6ffc6ffd4ffb5fff3ff02000a00cdff14000300fbff0c00f5ffd3ff0400c1ffe3ff0200f8ff0d000300e0fff6ffebffe9fff3ff0000e0ffe1fff9ff0d000a00
e6fffcff0300140000000200c6ff01002700d8ffd0fff4ffd8ff0d000d00e0ff0900e6ff1f000b000b00f6ffcdff0000ecfff5ff1800dcff0c00f6ff3a001000
f6ff0500e7ff18001700bcff0700ddff00002b00b0fffbfff1ff12000400feff5d00eeffbffffdff13000500500021000300d9ff0500d4ffcdfff3ffc9ff0600
e8ff00000200daff7bff96ffc3ff0b001700f4ffe0ff9aff1b005bff00001d000a00f4ff13000b001f00deffedff1d000200e6ff0c00dbff01003e000200e0ff
0c00f6ffedffe9ff2b000e00ddfffafff0fff1ff000093ff0f00e9ffe5ff08001c00e2fff5ff0a00fbffe9ff2200020030ff98ff0b001c001a00efff1800a2ff
2d00daff0100e2fff3ff0d00f4ffe5ffeaff09000500f8ffc5ffdeff290069ffd0ff76ffd1fff5fff2fffcfffefff9ffa5ffb9ff1200fcffccff120027001600
2600eeff4200d9ff0100efff18001300f3ff85fff5ff1800f1ff060000002200e6ffe5ff0c001500e2ffb8ff00000100d0ffedffe8ffd0fffdffe2fff8ffebff
feffd8fff3fffeffe5ff03000000d9ff0000ffff1300f8ff0e00b5ff27002000010012001d00fcff0b0001001e00edffacffdeffc9fff7ff0d00edff0100e8ff
eaffb3ffdfffadff2e0003001700caff1e00f8ff0f00ffffeeffebff0700c2ff9bfffdffcfff14001f00ceffecfffbffe7ff08000200000078fff4ff0200fdff
d8ff03000a000a000c0022009effcfff1100f7ffeafff5ffd5ff170011000000f1ffc7ff0e001700fcfff4ffcdff0300e8ffb3ff2400e8ff0600e0ff29001400
04001700e8ffe9ff1900aaff0f00ebfffbff2b00b1ffddffedff1400f8ff07005700f5ffd6ffefff0c00040057002b00fcffddffb8ffa3ffbfffeeff0f000200
1900fafff5ffcdff60ffe7ffc4ff0b001f000000e1fff9ff0a0077ff27001100faff0e002300f9ff27000b00c8ff3500f4fff9fffefff9fff6ff4d00edffefff
0100f4ffd2ffe9ff3c000100faff0f00d7ffd6fff9ffeaff0e000800eeff0e001f00c7ffeeff1500afffcbff2300f2ff9effc6ffd4ff08001c00ddff150069ff
f4ffc0ffe8ffd3fff2ff05000d00cffff9ffeeff3400f6ffcaff1d00270032ffd6ff48fff0ffe1ff14000400e1fffdffc3ffa9ff04000700beff0d0028002400
1a00e9ff4200cfff1100eeff15000f00f0ffb6ffe6ff1100f1ff060006000a00dffff0ff0c001100e1ffc2fff9ff0800dfffddff00009ffff4ff1bfff6ffdbff
f9ffe7ffefffe5ffd9ff99ff0c00d1ffe9fffbff4300f6ff0c00adff27000800e5ff09000f00feff0b0029001f00ecffedff0200dafffeff2000fbfffbfff2ff
f0ffbffff7ff83ff170006001200dfff2200f4fffdfffbfff6ffc9ff0d00dbff6fff0700c8ff1a002100d9ffe9ffe6fffefff2ff1d00e4ff91fff7ff13000200
e2ff00001a0018000c001f00c5ffd0ffd6ff03007fffeeffe6fffdff1c001a00eaffcfffdbff1400fffff6ff7aff1300daffc9ff1a006aff1800e6ff14001300
05002300e0ffe7ff11007cfffeffe9ffffff2e00b7ff9efffaff120001000f002f00f7ffe8fffaff09000a0059002900e9ffdbffffffb3ffd4ffd8ffe7ff0600
4300e1fff6ffd4ff60fff9ffe1ff0e002e00ecffd1ff25000400e9ff03000600fdff0a002900080023002600e4ff2f00f1ffe2ff05001300f0ff3d00f0fffcff
ecff0000f3ff00003100100006000400c6ff070006000800fcffeaffecfff0ff2300d8ffd0ff1100cfffa5ff1300f3ff20ffc1ffe9fff2ff1e00e6ff1900c4ff
bfffb5ffe7ffc5ffebfffffffeffdffff4fffeff2700eeffe5ff1f00110040ffbcff5aff0700ddff13000f000000fffffbffefff0b000800c2ff0c0029002f00
ffffedff1000cbff1900fdff0400e3fff3ffc9ff1b00fbff1200fcfffcff09000000ecfffeff1100f1ffbaff08000600c3ffd0ff0c00e7ff0300bffff3ffd3ff
1100e4fff2ffe8fff7ff3dff0000e8ffd1ffe8ff3700fbff0b00f0ff1a001000d0ff030099ff0700f4ff2500070000001300e0ffe5ff0e00efff0d0004001500
f4ffb8ffc3ffaaff260014002700d1ff0500e0ff13001000e1ffe1ff0900e4ffc1ff0800dbff190025000e000700f9ffdfff0f000f00eeffd5ff0a0011000000
0700dbff06000d001600320073ffc7ff0b00f3ffd9ffe4ffe0fff9ff22001c00feffefffd6ff0d001c00feff60ff0500f8ff5aff2300e3ff1e00e1ffffff1800
01000500d8ffd2ff1100c8ff07000400fbff3100a0ffe5fffaff1300060010000f00ccffefffffff1100090054006000f1fff2ff2900d1ffe4ffd7fff7ff0000
5600d5fff8ff020066ff2000d0ff13003800e5ffd2ff0000fcffbdff1300fcffe8ff0b001900130022001600f2ff2600edffe3fff0fffdfff6ff4600f3ffe5ff
fbfffaff1300ebff16000b000400fdffd8ffd9fff2ff0f00fdfffbffeeff01002000deffbbff1300e0ffdfff0d00070043fffdffc2fff9ff0900daff1b0085ff
00003000280005000d00fcff1e005b00ecff05000a00240069ffb8ff1b0087fff1ff21ffddffe6ffe3fffeff10000500bdff22000e000000d9fffeff06002000
f4ff1800d0ff1f00f6ff1a00e0ff0e0006001100d9fffcff2700a0ff1900e3ff1500ccff0a0069ffd2ffccffa6ffc6ffa4ffe9ff1c00caff1a00c9fff4ffd6ff
f5ffc0ff0000ccff0d00fcffc7ffdbff20000800e5fff6ff26000600c0ff0d00a7fffcffe3ff0f000000c5ff0800ddfff6ffd6ffcdff2500d9ff7ffff0ff0900
82ff25ffc4fffdffc5fffafffcffb2ffdcffe3ff0a0015001e0037ffeeffd8ff230000003900ebffd4ffa0ffd4ffe0ff000019001300fbffd5ff23000b002900
f2fff6ff03000c002e001b00a5ffceff4d00deff0800dfffc3ff3c0016000d0015001a001d00d5ff0f0089ff93fffbff000055fffcffcdffebff1a0045000100
050002001300e7ff0300a5ff390057fffeff3d009aff03001000ffff0300a0ff1200e7ffd7ffe6fffcff22005600f0ffe8ffa4fffdff0f00e4ff0e00a8fffbff
e7ff1a001000d6ff7fff8aff7eff04002b00f1ffcfffd9ff0300faff1200130046001e00d3ff0b000400b3ffb4ff06000900ffff1300edff2000e8fff6fff9ff
01001000d0ffc8fff5ff28002800f5ff2900f8ff090097ff15005cffecffe8ff2b00f9fff3ff0a00b5ff6100f1fff6ff33000000c7ffeaff0f00f5ff1f009eff
dcfff4ff460040000f0013000b007100c5ffecff05003400a7ffafff33007bff4e0046ffdfff0e000c00fbff0000faffc0ff2c00fcffdeffccff00000e001600
29000700fcff2400e3ff0d00fcff06000b000000d7ff0b002200aaff0b0002004a00abff1400c5ff100065fffcffccff96ffadff1c00ccfffdff80ffe8ffedff
0300f0ff02009afffaff6fffa4fff4ff1e00feffffffefff2600f2ff0b001500eaff0e000500edff0d00e6ff1700c9ff8dff89ffc6ff0f006fffd3ffeefffdff
86ff27ffe5ffa0ff0500ecffd4ffa5ffd1ffffff73ff04000e00c7ffefff80ff1d0001001a00e9ff1dffffffddfff5fffbff2200fffff5ffe2ff27000b001300
ecfff1fff7ff2100a9ff24004cffd2ff4f00f3ffefffb6fff1ffdaff1d001b00200026001500ceff0300c8ffc7ffa5ff0100aeff0300bcff03001100e6ff0d00
0700f4ff0b002d000d00baff250047fffaff23006cffeeffffff1b001e00a5ffe9ffecffefff1200f0ff280057000800e1fff9ff0b002300e1ff0d00d8ff2500
e1ff11000b00ebff90ff9bffe4ff09003500f8ff66fff8ff0b00c8ff0b000c0046001a00d4ff16001400afff050010000700ecff13000b002200e4ffe0ffc9ff
01000800e9fff6ff0f002400220010003300e0ff170023ff1600cdfff5ff01002900d7ffdfff0100dcff6000fbff19001e00d1ff090000001f0007002500ddff
f3fff9ff46001f00ffff0d0000005200e1fff8ff02003700a2ffbaff2b0058fff3ff33ffe5fffffffefff4ff0000f3ffb1ff14000e00fdffbdff020010001b00
2a00040019001d00edfffffffbff1a001d00dbffd8ffeeff3400d4ff000015002d0019001900f9ff110090ff0400e6fff5ffadff1000d8fff8ffe0fff7ffd4ff
ecff09000200b1fff9ff52ffc1fff0ff180000000300eaff2700b8ff0f002300100019001500fafff3ffeeff0e00ccffa9ffbeffaeff0200c4ffb3fffcfff5ff
beff71ffd9ffdbff1300f1ffd6ff74fffaff240094ff26000000a4ffddff8dff1f000e002300f5ffcdffdfffedff3300f5ff0400f6ffebffdaff160006001b00
d5ffeeff0c002300ecff0d0099ffd1ff5900efff1200aeffdefff0ff1300ffff20001b001b00e2ff14001700b6fff3ffdbffcfff0700c1fffefffeff1e001100
04001500f4ff0d001500a8ff1f00b2fff9ff2b008bfff9fff8ff0a002600d8fffffff3ffe4ff2200f9ff170056001700e9ffefff08001e00faff030089ffe6ff
d6ff09000800d8ff73ff89ffcaff0e003c00daffb6ff04001c00e1ff1100fbff31001900d6ff0c001b00bbff1400edfffaffdeff0c0002001f00eafff7ffd6ff
21000900efff17ff1b0022002200ecff1f00dfff1d0060ff0d00e6ffe6ff08002300c1ffe2fff5ffb9ff2e00fbfff2fff7ffe2fffaff13001d00fbff2600c7ff
1d0002001b0025000d0009001b003400eeffc6ff2b000c00c1ff75ff1e006effaeff58ffeaff0600d5ff0400fefff9ffc5ff110019000700aeff0a001d001700
2c00ecff45000600e6fffbff13001d000b00ceffedfff5ff1c00f6ff170018002f00130019002300030073ff15000900cdffbbff0b00c3ffe1ffbefffbffddff
0e00f8fff7ffddffe2ff26ffdeff0e000b00f7ff1100efff2500b4ff0f002a000e0021002100eeff010007001600d0ffb1ff8cffb7ffffffd3ffc2fffffff7ff
daff7cffe8ffe2ff1c00f5fff6ff8eff00000900e2ff1e00fbff0300e7fff0fe15000b001c000200e7ffe7ffdaff0e00f7ff1600eeffd5ffe7ff040014001b00
faffecff0b00130002000400aaffefff3900dcffeeffcfffcefffaff1800deff21000d001f00f8ff0f00d5ffd5fff9fff2ffdfff1600c4fffbff05004b001000
fafff7fff5ff28001100a0ff0600e1fff6ff2c0095ffeafff2ff0d001f00f4ff4d00f6fff4ff2a00f3ff1c0056002800ecfff5ff1400eeffebfffbffdaff0d00
ccfff4ff0b00d5ffa3ffa7ffcdff0e003700b4ffdeff1e001700e4ff100011002500fefffcff09002000f3ff0000f9ffdaffe7ff0b00ecff18001000f3ffe8ff
10000000e4ff67ff17002b00fcff0e000a00e1ff2f0034ff0900e8ffebff16002000f1ffcdfffdffb5ff11000c000000f0ffbdff000012002c0000001f0079ff
2900cfffe8ffeaffe7ff0d001f000e00f1fff3ff0400f9ffbdff85ff10006bffbfff77ffedffffff0a000000edfff7ff94fff8ff0f00f9ffbcff030021001a00
2d00e4ff3e00eafffafff6ff1e00030010009dffc6fffdff1800fdfffaff0e00f9ff1f001a001600e8ff7bffffff0200c1ffc4ff0600c3fff7ffe2ffecffdaff
e6ffe7fffbffd6fff0ff80fffaffe5ff0600f1ff1f00f4ff1900c3ff1b002f000a0025000900f3fff2ff23001800ccffc4ffb9ffcafffffff3fff1ff0000e2ff
f2ffb3fff6ffb1fffafff9fff1ff70ff23000800f6ff1900000050fffcffb2ffebff060005000e00f6ffd0ff00001300e4fff9ffdfffe1ffd9ff070024000d00
c5fff3ff050010000600060092ff01001400b3ff0600e6ffdcff0100130006000e0005002000fbff1700f4ffc6ff0f00e4ffe7ff1900abff0a00e1ff3a000f00
eeff1100f0ff0a0014009aff1e00f1fffbff380078ffd7fff3ff0f001400f8ff5300e4ffecff1300030019005d003d00e5fff0fff0ffe7ffdcfff0ff81ffffff
d9ff08000700d4ff8dffdfffbcff0f003400cefffdffeeff1000bbfffffffeff030004001100f8ff2000fbff97ff2e00ddffe1ff0a00e4ff14003b00fffff0ff
11000400ecff1cff1f000c00ffffedffecffd1ff120088fffcff2500e8ff0d001d00bfffe2ff0b00bcffcbff0a00f3ff2affb4ffdeff0f003100faff1c0061ff
1e00b4ffefffccffdfff06001500fcfff2ff19002900f1fff2ffc4ff290071ffbcff5cffb2ffedff14000700defffbffb0ff63ff0c000a00cbff0a0020002300
2b00f2ff3800ceff0500f4ff1d001600f0ff11ff45ff1000d2ff0900f5ffd8fff5ffe4ff17001700e3ffadff00001100daffe4ff0600c1ffdfffbcfffdffd5ff
f0ffe6ff0500e3ffedff2800f2ffe7ffe9ffffff1800f2ff0e00ccff1400290004001800feffefff080000001c00cbffeffff8ffd4ff00001e0003000800e3ff
ebff90ffe0ffccff1f00faff0700ccff1f00fbff0c00fcffeaffdcff030088ffaeff0f00bdff18002f009dffedffebffe1fff2ffe2fff7ffd5ff07000f000500
d8fff7ff0500190014002900a2fff9ff1d00cdff9bffe9ffc1ff01001c001f00efffddff14000400feffebffcfff0000e3ffd3ff1200b7fff1ffe5ff33001500
05002800e2ffe9ff080083fffbffd2fff6ff3a006cffc6fff8ff0a00f8ff03004e00f2ffd5ffefff0300130058002a00e8ffeaffbeffb9ffdcff9eff1300f6ff
f8ffdfff0300dbff63ff87ffdcff10004600f1ffeaff0f00010095ff28000a00faff0c001e0000001e00ffff9eff1600daffe3ff0b00c4ff07005000d4fffaff
feff0400ebfff0ff2d002400f3ff1c00d7fff0fffaffadff0c0084ffeaff190018009bfff4ff0700bfffe3ff0500e9ffdbff9afff2ff06003500f4ff1200bfff
cdffc9ffd7ffcfffe9ff0500f8ffedfffdff34002e00e6ffccff0e001f006cffcbff24ffccfffbff18001400c0fffcff8affe2ff0e000c00dbff010017001400
1f000400e1ffb4ff0000fcff1900fcff14007fffc2ff0900f4ff0600feffc8ffddffcaff0e00faffddff8cff07000f008affcfff0400caffddff2fffecff0700
ffffe1ff1a00eeff0000c7ffffffd4ff62ffffff0600eefff1ffd3ff22001d00dfff02000700f6ff040039001000beffe2ffd0ffd1ff07001500fbfffffffeff
fdffacffe7ff9dff1200fdff1000c0ff3d00f4ff15000d00dfffe3ff0000dcff99ff0d00c3ff12002700a4ff01000300edff10000c00ecffcbff0b0023000600
f0ff00001400180012002000aaffd7ff0000efff75ffe7ffc0fff3ff2b00e6ffeeffdbff060002000500eeff61ff1800e3ffe1ff0b0076ff0a00d3fff4ff1700
03000f00e8ffecff100035fff1ffdafffcff380050ff47ffecff15000f000f003c00eaffedff17001100f4ff5f002f00e6ffe9fff4ffc1ffe1ffd8ffffff0000
3900d9fffaffe0ff3bffabffb1ff11005900edffeaff2400d3ffe7ff2100effff6ff040021001a0022001900a9ff2a00f2fffdff0900000001004a00e1fff6ff
eeff0c000600ebff2d002400feff0b00ceffcefffaff10000b00f6fff9ffeeff2300b4ffe1ff0500ddffcafff6ffe9ff67ffbdff83ffc7ff2100f7ff30009dff
a6ff8fffe6ffbfff0400f5ff0600e1fffaff08003e00f9ff10000f0018004effe9ff6cffe2ff7dff1800f8ffc9fffbffb4ffa7ff0b0099ff9eff04000b002e00
fffffaffe5fffbff0d0007000000edffdbffdbff06000f00fcff01000f00d7ffe5ffccff19000800d1ffd4ffcfff1300afffc1ff0900ceffc6ffeaffebfff4ff
2400c5ff0400b4fffcff85ff0b00eeff72fff8ff0900eeff0d00360010000300c0fff0ff0e00f1ff140019000100e9ff06003800eaff11001e000b000300e4ff
fdff75ffcaffbbff350011000200ecff0700000004001e00ecffcaff0a00f8ffbbff0200c3ff10001100b9fffafff8ffe2fff9ff0c00caffc2ff15000d00feff
fbffeeff10000f00120041009fffebff3700f8ff9dffecffd9ffdeff2200feff04000d0078ff00002700c8ffb2ff03000000d8ff42ff91ff1500e8ff2d001500
01001900d5ffc9ff0c0086fff4ffe9fff7ff41004dffcfff01000f0016000a000700cdffceffecff0100f3ff4f004a00edffcdff1f00c7ffe1ffdfffe9ff1a00
47000700fafff2ff79ffcaffbeff0a004500e8ffefff0c00daff0600f8ffffff0200fcff200003001a000300d2ff2300feffdcfffdff0100f9ff3200e0ff0d00
f7fffaff1900f7ff10000500e3ffceffd1ffbdff0a000f00fdffc6ffeefff7ff2800beff2f000400eaff9bffffffedff28ffcfffe5ffb8ff2300ebff4000c9ff
330081ff0f000100fbffcfff42001600c1ffdaff0e004b0076ff7eff110086ffcdff6affd0ffe9fffeff140008001c00a6ff24001400deffedfffefff4ff2600
f1ff0d000c00fcfff8ff370055ffdcfff1ff0f00bffff5ff3400d2ff0e00f1ff230068ff1a006effb3ffbaff93ffbcff71ff26001800ebff2c000f00e9ffcaff
f5fff4ff180032ff000085ffb0ffdeff0100000049fff8ff1d000b00a7ff1300c1fff3ff8cff4800e3ff6eff0200e6ffffffb2ff0b002d00edffd6ffebff2200
9cff21ffd4ff0e00eafffffff6fffbffcfffe3fff1ff51001500a0ffc2ff29001c00faff2800eeff000034ff0a00e2ff3aff0d002900f6ff93ff0f001c00dfff
f7ffbdffc2ff220081fff8ffb8ffafffe5ff17008cffd3ffbdff0b0017006cff0b001e001f00e4ff1f0084ff76ff2c00390059ff030080ff1a0000007fffffff
0a001e00edffa5ffdeffc4ff25006fff0600300091ff00000d0008001300d1ff24006bffe7ffeaff0c0007004b00e2ffb0ffe5ff160091ffe7ff0000b2ff1700
e3ff2a00ebffd5ff89fff4ff2300ffff4b000300b2ffd0ff7eff04000b000d0008001600e2ffedffdcff94ff34ff59001e00d4ff0800eaff1400efffd3ffefff
f4ff02000500a1ffd9ff1c000000f2ff3400d6ffecff07ffffff0f000100d6ff1a002700f6ff1f0019005d000f001f000800e6ffa4ffc1fffeffd4ffd9ffd2ff
d2ff1c002e0017000d00000008004b00c4fffdff13001500a5ffb8ff37005bff20005bffebfff2ffcdffc0fff1ff0e00a8ff1000faffbcffe1fffdff09009fff
160013000e002c00c5ff1900f0ffe3ffeeff01002bff0d003800ebff1a00fdff0800d9ff1800ddff0d00b2ffa6ffb5ffbaffbeff1d00caff1a005cffabffdcff
1100d2ffd4ff6effe5ff2dffaaffeeff00000e00e6ffcbff1300f6ff0e000a00d7ff0100f2ffe3ff0800eeff2000e4ffc4ff9effdaff2100cbffb3fff1ff1900
28ff9fffe9ffedfffcfff4ffb1ff83ffd0ffe9ff8bff0a001700bbffcbff2cff340008002400f2ff7cffc2fff0ff2400e9ff150003000900c8ff2b0018000300
fbffe5ffd4ff14005eff0d003cffd0ff3800fcff1c00bfffc9ff2300220016001b001f001200eaff3400a4fffeffe7ffe8ffe6ff1000bfff0a00f8ffdeff0e00
1300eaffedff1c00feff83ff2c009ffffdff26006eff02000b0023001100bafffafff4ffc9fff8fffeff1e005400e9ffccffd7ff05003900ebff0500c6ff3b00
030011000700bbff6fff0900c3ff0b004200030025ff01001e001300f3ff1c0043001e00caff030002005efff6ff4100fcffb6ff0900feff2500fbffeaffd9ff
260010000b00eaff1a0018002a00f8ff2600d3ff17006cff2900effff3ffe1ff1f000000f0fff9ffbfff3e00f9ff0400e6ffe5ffe0ffedff0e00fdfffdff81ff
d1fffdff38001600e8ff01000e003f00c7ff000015001200c9ffd5ff35002bff60ff3affc4ff0a002400f8fffbff0500c6ff0b000a00ecffcaffffff0f000d00
2200040043000b00e9ff0d00f1ffcfff0b001a00bfff02003100e8ff1500fbff2100fcff25000300edffa6ffb2ffd8ffc6ffdcff2100e6ff61fff1ffd0ffe1ff
0b000200f9ff63ffebff40ffc9fff3ff0600f6fff0ffd7ff2400c7ff0b002100e5ff1800f0ffe4ff0400ecff0d00e6ffa6ffc9ffbbff1300d1ffe2ffeffff5ff
c5ff82ffd6ffd0ff0d00faffebffa2ffeefffaffc8ff3800230094ffdfff0800190006000200fbffb4fff3ff5dff1f00e8fff0ff0d00e5fff9ff270008000600
e8ffe8ff06002400a2ffceff50ffc4ff5000f6ffcaff17ffedff0e0027002900250011001500e9ff1c00ddffdcfff2ff0800faff2100bdff0000f8ffafff0e00
0100d6fff8ff1600170079ff22008dffffff350060ff0400000014001c00c6ff0b00d3ffbdff0d0010001d0055001800eaffedff04001800d5ff0100b5ff1400
a6ff12000100ddff4eff0e00efff0b005400caffbaff08000a00f3ff1600030028000800d0ff0c001500b2ff09004500f8ffc8ff060003002400faffe5fff9ff
19000700edff67ff06001000310012001d00c8ff190056ff1a009afff4fffbff1300eeffddfff2ffe3ff2f00faff24000d00b5ff9cff0e001a00000013005aff
c1ff10002600f5fff7ff030009003c00d3ffe3ff31001400d6ffafff1b003effa5ff62fff4fffdff0800e4fff6ff0800a2ff0000f3ff0200b7ff01001b002000
2900e3ff2c00170009000300040029001a00c4ffc5ffedff1600eaff0c0017000100140018000900e0ffceff13000200bfffe8ff1800eaff64ffdfffd9ffc9ff
2000f7fffcffb7ffedff2effe1fffcff1300f2ffeefffcff1d00f2ff0b002a00f5ff16001200defffeff12001b00e1ffb8ffc8ffb6ff0f00d3ffdaff0100c9ff
d3ffadffb6ffb7ff0100fdfff5fff2fff7fff7ffe1ff24000400f5ff040052ff2c0005000000fbffd1ffc5ffe9ff3300ebff0600f8fff8ffd4ff2e000f000300
f8ffe3ff07000e000000010082ffe4ff4500c3ff0e00d7ffb4ff1d001e00190018000900230002001500c1ff77fff9ffebff82ff2a009cffedffecfffbff0900
feff1c00daff2200150041ff1600bdfff5ff250068ff0400fcff06002300ebff2600f9ffecff2500f1ff0f0056002300eefff2ff1000feffc1fff7ffbbff0c00
ebff06000e00deff6affdeff86ff1700340003ffefff17001000f0ffeaff030029000500d0ff11001200e4ff09001e000200bdff0200d0ff17000f00f4ffedff
06000000feffa1ff09001a0002000c000600ccff1d0072ff2500eaffedff0e000c00d3ffbdfffeffb5ff0300f7ff0500f9ffddff000026000200edff210068ff
2a000400e1fff2fff4ff00000d00faffcffff4ff42000000afff25000d0046ffa7ff5effe3fff3ff1000f3fff1ff050071fff9ff1d00feffbeff060020003000
29000a002a00f1ff0600feff0f003700ffffa0ff76ffeeff0100ffff0d00fefffbff1c001900feffedff8dffdbff1600dcfff3ff1500baff5dffc9ffdcffbfff
0e00d0ff0300dbffddff39ffcbffd7fff2fee3ff0b00ebff1f00e6ff0c002200e2ff1700e6ffe8fffdfffbff1600deffdbffe0ffc9ff0d002700fbfffbffd9ff
e4ffacff0500f4ff0500fbfffaff7bff0f00edff05002000f5ffecff0100d0fff3ff0000e3ff0800fbffcaff0f001000dafff5ffe4ff0e00d4ff320021000300
d9ffc1ff0d0012001a00fcff5afff6ff530014fffbffeaffefff130023001b001000feff2800f5ff0700d3ffe6ff0200f5ffe6ff1a0098fff9ffedff29001200
fdff0300feff1900110035fff0fff6fffcff290066ffe6fff1ff00000e00fbff4b00f8fff2ff0d000000150051003c00e9ffdfffe9ff0100d4ffefff75ff0400
cfff01000600daff7dfff8ffb7ff17003b00ccffe2ff09000f00ecff1e0001000e000d00effff5ff1900e4ffc8fff3ffe9ffd5ff0800c2ff14001e000500f1ff
0900f7ffd1ff87ff1100110004004a00eefff5ff000081ff2600fffffaff01000900edffd0ff0300bcffeeff08000d001500b9ff0e0007000500fbff200011ff
feff4afff1ffbfffedfffeff03000500f3ff18001600fbfffaff1c00feff41ff9fff67ff1fffe3ff1900f5ffe4ff0d00baff0a0014000a00a3ff020018002800
1a00d1ffd4ffd9ff1300faff200019001d0084ff70fff5ffeeff04000e00e3fffcfffaff29000600deffaeffe2ff0600d7ffdbff0f00caffefffb5ffd5ffbeff
0600d9ff140081ffe9ff83fffdffdbffebfff6ff2500f2ff1200e8ff1400250001000c001b00dbfffcff30001400d9ffc2ffa0ffd7ff14001c001a000100cbff
040085ff0d00bdffc1ff0300faffd3ff37000a000f001c00f6ffe8ff000073ffd3ff0b00dbff00000100bcffefff0c00f0ff2200f9ffe7ff0c0023001a000600
e2ffe8fffcff0f001c002100a3ffdfff2b00c9ff0900f8ffbbff16001a001400feff9aff2500fcfffcffd6ff69ff0c00feff75ff0c0091ff0f00bbff4dff1400
0f003000ccfff3ff0f002fff1200ebfffaff340060ff97fff0ff06001700feff6100ebffecff080013000a0053003d00effff1fff7ffe7ffe9ffcbff0900eeff
0c00c3fffeffdcff92ffc6ffc3ff17004800f3ffcfff1100f3ffe2ff0100e8ff07000300fdfff8ff1900050092ff4400edffe4ff080098ff16002f00f4ff1700
fdff02001600d3ff02001d00e9ff2100d7fff8ffedff56ff32001500fefff5ff0b00d5fff6ff1700aaffd7fff9ff03001f00ecff8dffc1ff1b00fbff160061ff
a5ff86ff0600a5ffcdfffeff0f00f7ffd7ff3f004200d1ff03001400220050ffbaff4cffc9ffb4ffe8ffecff59ff170073ff240004000a00e6ff000014002f00
0b000100fcffb7ff050009001d00ecff2400e9ffd4fff2ffdbff14000300d0ffd4ff2a0010000c00b3ffc7fff2ff1400c3fff3ff0a00f4ff7aff84ffcbffe3ff
1100f8fffeff8cffedff55ffd8ffdbffb0ffdafffffff7ff1000f9ff25001900d9ff0000f2ffc3fffcff0d001700d8ffe9ff50ffc4ff1900130012000000faff
ffffa9ffefffc1ffdbfffefff2fff6ff2f00cbff1400ddffd8ffecfffeffb0ffbffffcff9eff0c003200d3ff0100fcffe4ff1300f7fff8ffd9ff160027000200
fcffd0ff12001000210008005afff5ff2600070079ff0000d1fffcff2a00ebfff4ffa6ff1900fdff0500fcffc4ff1c00f4ff9cff90ffdaff0500c8ff3a001900
0c002700d1ffb7ff050027ffe5ff0900f9ff2c0051ffb8fff7ff0e00140009001800b4ffe4ffebfffcffe7ff54002f00cfffe3ffecff52fff0ffbcffe1ff0500
cbffb4fff2ffd0ff5dfff4ffe4ff0e003f00f0ffe0ff4500b1ff2300e5ff0100ebff0b001d00f8ff1900070094ff4800deffd3ff0c00ebff09004f00f8ff2b00
0b0008001c00a6ff1c000300efff0000ddfffbfffcffb3ff1500faff0700d9ff1800f8ffebff0500ddffc2fff0ffe1ff1affd8ff83fff4ff0b00efff23009dff
0e00c8ff2400d4fffcffeeffadfff0ffb4ff87ff0600190041000b00010035ffd5ff78ffe5ff9aff4d001400bbff1200c4ff9dff09001800edff040000001a00
6eff1f00afffd5fff4ff1600f9ff71ff0000e9ff77ff0100e2ff1b0013009affc6ffdeff18000300bfff98ffe4ffdfffb6ffdeff0700bfff0a002c00c9ff60ff
d7ffd2ffe8ff97ffdbffb6ff36000e00bbff01002300d9ff140068001d00e0ffe7ffd9fff7fed4fff1ff0400c4ffe8ffecff0000e2ff1e001b00fefff9ff7bff
d8ff60ffd1ff83ff2b000600060096ff08000600060034001e00d4ff0100160016001300bfffe9ffddffcdff1100edffc9fffdff1400ecffc3ff0e0007001400
edff08001100fdff31001900abffd2ff18000f001a00e9ffedffe3ff200017000600a4ff02000300f3ff0300abfff6ffb4ffddff3bffdfff2600d9ff2f001c00
0d002000f3fff1fff7ff52ff3400f8ffefff300055fffcffdaff1100c1ff0900f4ffa2ffd7ff28000a00bdff42004e00c6ffceff0d00a6ff0600e4ffdcff2200
3100a3fff0ff0000a0ff94ffb2ff03003200faffcfff2000a6ff4900e8ffffffe0ffd0ff1e00e7ff02001800c2ffa9ffbeffdbfff8ff2000feff1700ebfffdff
f8ffefff34000200fdffe4ffd6ff91ffeaff1100b5ffc8ff0f00cdff0100f0ff1200c6ffd6ff0f00d9ff95ff18000b0041ffd5ff05000900180015003100d4ff
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
f4ff0d000300ddff47002aff5900f5ff00000f0000001500b8ff01001100a9ff1800d1ffe6ff0b001f001200daff0b0032001100f3ff3d00e5fefaffd6fff6ff
d2ff1b0020001f00ebff0b00efffc6ff360005000800e2ff0700feff08003500fefff2ff26000a00bbffb8ff1c000a003a0063001200030071ff240016001d00
ccffe9ff18007200e8ffe6fff0ff3100fbfffaff0300e0ff65fff7ffdffef9ff3d0003001c003400e3ff1b00d6fff2fffcff1a00150009001b001900d5ff1800
caff0600f8ff0e00f2ffb1fff5ff2400ffff1600ebff0d000b0020003500f6ff1900ecff3200e5ffddff3e00f7ff0c00f8ff0e000f00bd0000004500fdff1800
15000400fdff00000d0021003300fffff1ffecff1500ceffedff0d00fdff32000b001800eeff80ffdeff1e0016000000edffe3fff8fffcff17001b00c3ffdaff
dfffefff0b002700b7ffd5ffecff1000d2ffddfff6ffd8ffeeff50001500b1ff0900f1ff240005000a0028000d001200fdffe1ff030000002600dcff65000700
cffff9ff3800f9ff37002700ffff2c007000ddffefff0f001400fdff11002500d6ff1200f8ffe4ffcefe2d000e0083ff0e0067011b000e001b001a0001001400
0000feff0000f7ffecff2a0026001700e5ffe8ffd8ffd5fffeff03002a000000140007000e00f5fff3ff16001d005900fcff0f0022003b002300e4ff2f002900
240000000100baff0900c9ff1a00fbff0800feff18000e005700edffbaff94ff1800a8ffe9ff30003b002b00e1ff110016000d0002001d0061fff0ffddff2e00
ceff0d00f6ff04000000fcffedffffff1a00e7fff9fff0ff0f002000f4ff2d000300110022006effbcffc5ff08000e0034000700140047000f00fdff1700eeff
0c0021003300ccff1f000b00f8ff0a00f7ffe8ff0700f0ff96fff1ff1e00fbff0c00faffefff04002d00150051ffdbfff3fffaff060013ffc6ff2500ecffaaff
ebffaaffd8ff1700faff36fffdff26000900cbff2900beff74ff08002600ecfff6fffdffeaffdaff1d005700faff0400310048000f00d600050048000f001c00
01000b000100a7ff4fffc8ff3a001000ffffe8ff0800d7ff4b001e00f4ff3a0019001700eaff6eff0800f2ff1b001e002f00ebffd1fffefffcff2700ceffc4ff
eaff0d00edfff1ffefffe8ff07000300ceff94ff0300d8ff1a007eff2100d9ff06002e00ffffe5ff59002d0014000e0007001c001300fbff0600d6ff11001f00
befff9ff3000e5ff45001400130025007200e0ffefff0f00feff1b00e9ff5700c1ff3300f3ff0000dcfeddff08009cff1000f2ff1300040020000c0022000c00
0d000000ebff0e00edff140006002200c5fff4ff3300ffff1100320028002300160007001000bfffe7ff5d00deff44000c00f7ff00002a000000dfff21001200
feffedff0d0089ff2500d2ff24001000100018001400ebff5200d5ff610062ff0b00c7ffd6ff2000f1ff0f00d9ff2f001700100007003e00bfffe8fff5ff0c00
ddff2300f0ff0d0004000b00edffffff27001400f5ffb3ff0000efff0c001b002100e9ff1700f2ff4d00f0ff0d000b00080021000e0076ff090021001d001b00
f5ffeaff43000300fdff140006002800e4ff0000ffff06008eff2600e8ffe4ff7000f1ff16002100e4ff1700e1ff0300e5ff0d000c0012ff27000e00cefff2ff
cbffa7ff0e000a00eaff3bfff7ff3700eeff0300eafff6ff15004600110004002d00f6ff3000e4ffd9ff230039001a00edff34000b00d4ff15003d0018001100
feff0e000a000a00ceff2000050010002000d7ff0200daff7400050039005a001b000100d8ffbaff310031001900e4ffa4fff3ffcaff0b0014001d001100caff
f1ff0b00e6ff2f00c3ff06000500faffccffadff00002500f0ff29000f00d5ffefff16000900c1ff39001d000a001e0008000a0016000e001300e3ff26005aff
b8fff5ff22003c002a00f3ffeaff1b006e00ddfffdff0100f2ffdffff8ff2d00ccffa4ff0400d7ffeafe050022008dff0d0007001d00f9ff23000f000a001200
04000b00f7ff1c00ebff0b0026002200d4ff1e00efffd3ff0c00200022001f0014000e000000e4fff3ff2a00e5ff3000f1fffdffe5ff43000800feff32000e00
030016001c00ebff1c00f1ff12000700dcfffeff09001500e6fff8ffbbff5aff2200ccffd9ff19002a001800d9ff18001d00ffff0d00f2fffeffecfff2ff3000
b8ff0600b1ffe9ff1f001100eaff2400eeff2000effff9ff2400ecfff1ff2400fbff36003300f1ff9bffddffe2ff0d00050035001e00e8ff1f004c0016000500
0400e3fff4ff2100d8ff0f00f5ff1900f8ff7b001e00140071ff2800f6ff48ff1a00e1ffe8ff1b00010015006dfffeff18001b00000022fff1ff1100e5ffd6ff
d7ffddffedff0d00e8ff68fff7ff2c00eeffeeff05000f0000003d000b00eeff0800fcff6d00e5ff34002e0019000f000e0014000a000500fcff480034001500
e5ff0900ffffe6ffe9ffc5ff0900deff3300caff0d00d5ff88001b0047003f000800faffc3ff92ff8bff35001000f6ffd1ff0100d7ff14000a0041003400aaff
f3ff0100edffb6fff7ff110035000900c8ffc4ff1b00f3fffbff05000e00c3ffffff2a00fdffaeff43001300110005000c00dfff18002c002600e6ffecff2400
d5fff3ff2a00f0ff2000f5ff13000b006f00e2fff1fff6ffe0ffdfff25000100e4fff6ffe3fff2ff02ff0c003a0086ff00001a002a000000110014002a000000
1000efffe8ff1600e1ff1b00ddff1100e6ff0d000c00080000001a0026001400300017000a00c9ff06000700c9fff8fff7ffe6ff13001700d1ff35ff31000a00
c3ffedff0a00d3ff1a00eaffeeff23000400f2ff2e00160081ff0a00f8ff38ff0100ffffd0ff100000000500c5ff20001500e4ff130036000500e2ffe6ff2200
c4ff0e00bbffefff0f00f9ffdaff89ff10001000eaff09000f00e3ffcfff28000d00d9ff230007003e00e7ffceff14000c001e00230013002e0022000d00feff
f5ff18001200efff1a004a00faff0f00e9fff3ff0500f0ff4cfffcff2d003dff0800ebff12000f001b003400ddfff6ff1a00340008001bff14000a00e6ffb7ff
c5ff1d00ffff0700f9ff36ffecff2f00f1fff4ffeeffe8ff16003f0013000f00f9ffe9ff9d00e8ffdbffeaff600002000e000c0006000d001900450025001000
ffff17002d00feffdcff3f0020001d002f00d5fffdffceff1e0014002f001b001400b5ffceff1300eaff0e000c0000008fff1700c6ffebff0b004a00e3ffbfff
fdffecffeefff5ffd2ff290024000000bcffd3ff1200fcffd6ff19003100fcff2200e6ff0f00bdff3f00fcff0300260007003400fdffd1ff3200e2ff3300e7ff
cdffffff2100fdff26001a00dfff1a005900c2fff4ffbaffeeffd6ff2900e8ffedffe6ff0900c0fff0fe0d001a0070ff0000ddff12004c0003001a000000f0ff
1b001700ffff0700d8fff2ff1e00f4ffd4ff0d002a0017002b0002001f001700500010000d00e7ff01001b00d5fff3fffefff1fff1ff1700e6ffe8ff2b001e00
0300f6ff1b00dbff0bffdcff2e001b000000f3ff410014008dff3f00050036fff8ff1b0004000c0006001d00ebff2400100035001d0008001200f2fff0ff0b00
e0ff0500f5ffefff28000300ddffdeff0f00e1ff0800a5ff0000f9ff69000000fdff0100000001000d000d00e3ff240013001a0016000300080006001400e2ff
feffe3ff0400fdff0a000e001f00050030000100ffff000073ff06000a0042ff2e00e9ff010002003800efff45ffdfff240034000d001eff19002a00e5ff0f00
d3ff1e00e1ff1900fbff39fff7ff3800cfffe6ff1b00f0fff1ff04002f0003002900edff83ffe9ff7000f4ff4b0007001800ffff0300e6fff7ff2e0033000800
dbfffbff0800d0ffebff1a00330010001800d9ffe0ffd5ff2e0030001b000300ebffe8ffe2ff3000120021001100fdff1c002100e2ff2500fbff5d00d4ffc3ff
f0fffbff0400a8ffffff1b002c00f5ffb7ffcdffffffd6ff0700160071fffdff01000000f8ffe6ff2200bcffffff4a000a00160096ff26003100deff26000400
e7ffecff2c00e7ff15001f0002002a006300cafff4ffc0ffd3ffd5ff18000e000500f3ff07002300e8fed8ff1300a4ff0200fdff1c003e001d000d002500fbff
3700feffeeff0400efffe9ff0400f3fff1ffd1fffbff0a002500faff1b000600560039000d00dbff04001d00a0ff0600d1ff1600f7ff12000500f7ff4400d1ff
1000e1ff0a00f2ffcbfebdff050011000100fbff0b000900eefff4ffd2ff68ff21001300edffd5fff6ffdbff000047001f00a300040040005500e7ffcdff1100
edff0f009eff90ff14000d00f9ffd5ff07001f00f1ff40000800e6ffb3ff16000000ffff3c000b002c001d00d1ff1d001a00d2ff1c00070003001c000c00d9ff
f2fff2ff0e00f9ff0d00f3ff0f002000b7ff0a00b9fffdffcfff5b00300002002b000000dbfffbffc7ff1f00d3ffe1ff240029000d00e2ff14000400deffeaff
ddff2c00e6ff1700f1ff3effeaff2a00feffebfff3fffaff03000b00270001002c00faff0900e6ff0600cdff2c002d00fdff14000a00f8ff0f00460015000700
f7ff1f002d00fafff1ff1700c20010000200e1ff2e00dfff5f0005000c002600fbffd8ffe6ff2f00a1ff17000500fbff4300bdffddff2cfff9ff6a00e5ffc2ff
e8ff050008001a00bffff3ff1b002900b7ffb3ff0b000e00fdff10006e000300f3fff7ff03000d000f007dff040001000200f2fff9ff34001700d2ff4f000700
0500ddff31007700e5ffd4ffefff1d005f00e0fff6ff0000e7ffbdff0800f1ff0b00d8ff1000cbffe6fe0f001300beff0100dcff200081002500f9ffa1ff2bff
14000700ecff0d00f5ff150028000c00f6ffffff45000000120015001300260037000b000000d8fff2ffe6ffc2fffbffd7ff3300e2ff0600160009000d004500
1b00f5ff2f00f1ff1f008dff23002200f4fffcfff9ff0b005200d2ffc6ff56ff14001100d2ff7e00daff2400edfff3fff1ffc7ff310021006400f8ffc8ff0a00
e2ff0e00bffff8ff270011000e0003000a000a00fdff05000800dfff06002800f6ff25000b00faffb4ff0d0008000a000900f4fff0fff1ff6aff15000f000c00
ebff04002100fdff1d0041000e00e0ff10000f001b00100094ff0e0022000c0020000d00e6fffdffedfff9ff4fffc2ffecffecff1400fdfffcff1800e3ffe0ff
d1ff1800f3ff2900fcff5fffffff2a00eafff3ff13000800faff00001200ddff3d00e8ff1700e0ff2e00bafff0ffffff16002c000900fcff240048002e000500
e3ff2100f8ff0700e2ffc9ffd7ff00003600dbfffbffe1ffd3ff0900110039002800e7ffefff2200f9ff2500320001000a0003001b001400f7ff5200bcffd0ff
dbfff6ff1d00d7fffcffecff2100dffec7ffc0ffd6fff0ff1200230028ff0b0004002000feff0100440095ff00001c00faff0f00fafff9ff1d00e4ff13000200
8fff8eff34006001a3ff4c00f2ff38004200dbfffdff0300e1ffc3ff16000b00f7ffeeff08000100e0fedbffe1ff9cff0f00e2ffa2002f002d000200c5ff8c00
48001100f9ff1400eefff9ffe5ff07000000fefff8fff8ff1b00eaff12000d002d000400edff04001d000e00edffeffffcff1500d4fffafff8ff030072ff1e00
00000700fefff8ff1a0096ff1d00040000001100080016004900feff0e00deff1500e0ff05000400fcff000005001a002d000d00feff1600cdfff7ff9aff0400
edff060003000500f6ff0800fcff0200110002000b00f9ff0b000700fcff0b00ffff0000130035001700eaff0b0008001b003f000200f8ff1100040015000700
0500120008005d00ffffdeffe0fffbff0100faff0a00f3ffb1ff0000a2feebff4f00f6ff00000000eeff0800e8ffdfff17000e001a00120011000400d0ff0000
00000300fcff04000800a9fff9ff02000b00f8ff0500060034001a00e7ffe6fffbffe6ff1d00f3fffcff1f000500f5ff3300fbff0900c1ff06003800f6fffdff
00000b00f9ffcbffeaff0b0009000100faff060000000b0002000a00f8ff2500ffff0700f4ffd1ffe7ff06001200f6ff1c00f5ffe9fffcfffeff1600f4ffdeff
e3ff0b0009000800bfff000007000000d6ffdeff1200f9ff11004800f4ff4dff0a0005001200140033000a000400feffeeff20000100feff0900e2ff20001200
e7fffcff280007000e000b00f6ff240025000800010007000e00deff11006d00deffc3ff56ff0300d8fe05001800f3ff0c00b90009000a0001001200f0ff0600
f9ffffff01000400e0ff0b00f8ff0800eaffeeff0200f3ff000027002200fbff07000a000800f6ff0000160016002f00effffdff190026000b0000001b000900
2700f6fff8ffdaff2700c7ff25000800040015000c0029002d00f7ffe6ffd2ff0d00ddff07001c000d0016000a000e002b00150001002500f0ffedffd5ff1400
ecff010009001e001200fffff9ff0b002300f2ff1100eaff1300f4fffffffbff0400feff1a00abff5d000a00160012002c00cdff070004001700310020000300
f2ff19002300f3fff6ffeeff7100a9ff0000f2ff09000f00b5fff8ff2c00fbff5500f4ff12001b000d000000daffd4ff11001c00180001ff03001500e9ffe5ff
0000d2fffbff0600080094fffcff11000c00f2ff0e0099ff2f0023001fff0200010000002200e5ff14003a000b000f00290006001000dffffbff330013000b00
100007000a00f6ffe0ffe4ff2900120000000900fbfffdffffff0c00090014001100fcfff4ff81ff02001e0018000900dcfff5ffd7fff0ff12001900e0ffbdff
e7ff0600f8fff2ffceff0000f3ff0100d5ffa4ff2000e6fffbffb000faff45ff0a001400080014000700080002000200f2ff34000d0000000200deff2f003000
e9fffbff300002000700000003001b0036000500f3ff11000800b9ff0e00a2fee7ff7000afffe9ffd3fee7ff1000eeff0800f9ff0c001a00040012000b000400
0200ffff00000b00e3ff0d0001000f00d9ff0800fbff0400fdff11002c000e00080004000600dcff06001000feff2000fdfff4ff080031000b00f8ff18003300
13000100faffadff2900dcff0800080000001300feff10001700f1ff1f00d3ff0300d8ff0600140003001c00080015002f00fbff0a001d00dcffe7ffb6ff2600
e7ff0f00e7ffeaff060010000100eeff1500fbff0600cbff20000d000000f6ff0700040021000a005000ecff080013001c0087000900deff1a00280020001300
e4ff1500510012003100e7ffd8ff2300fcff2a000200caffa4ff1100f5ffd9ff2700f4ff0f001d00eeff0b00d8ffefff1800130016000dffffff0e00bdff0900
0000dafffcff06000b0097fffeff2300f6ffd8ff0a000400efff3a00edffe8ff130008001600f0fff6ff3300050012002d00e8ff0b009ffffdff3f0026001300
08000d000700e7fff8ff5d000c0003001900ffff0000010011001f003f0028001300ffffdeff91ff260007001100f5ffbdfff9ffe0ffffff14001400f7ffccff
e5ff0f00feff4100c1ff0e002700ffffd2ffbfff1a00f8ff0e002b000700a4ff03001f00fcff0400200008000000f5fff9ff00000e00f4ff0800f2ff14002fff
d4ff02003200fdff0900fffffdff12003b00f6fffaff0e00faffe1ff28001800dbffe2ff84ffb0ffe0feebff1200fbff09000e0016000b0013001000ffff0000
0600050005002500d8ff3700feff1f00e1ff12000100e9ff0b000c0029001300130011000900e5ff01001000f3ff0800fdff050020001b00feff100014000500
0b0017000400edff2700e7fffdff0100edff0b000b001c00efffeafffcffbefffdffeeff05000700e9ff0100060019001e00f2ff04000800dbffeaff82fffeff
d3ff0800e8ff0300ffff14000400bffe16001400f9ffecff0400ebfff8ff0300f2fff0ff0600f9ff92000500feff18000300adff0d00faff19001a001b000000
09000b001e000100f0fff1fffdff2700f9ff5c001200070085ff09000700d5ff3300fefff9ff1f0021003100eaffe4ff0f001a00160011fff9ff0c00e6fffbff
0700e8ff0a000f00050086fff8ff220005000f00010009000d00c1fe10000600090001002400e9ff230017000d000a0014000a000c000d000e00400014000d00
eaff03001000d9fffefffefe1200f6ff2500ffffffff00000f000900790024000d00f2ffdfff9affc8ff07000b00f5ff42ff0400deff310000002900fcffbeff
edff0000eaffb8ffd2ff09001a000300ceffc1ff20000800edff03001200b6fff3ff14000200faff2f000000fcfffefff7ff89000d0016001300f6ff1d003200
edfff9ff2800fcff00001900feff060033000000fffffffff6ffecff03000000d9ffffff83ff1300e2fe03000200e5ff020006001d0015000c0016001f00ecff
13001d00f9ff0a00d5ff1b0000000f00efff0f001900efff07001e002a00fcff3300d2ff0e00d7ff04000500ffff060008000b00f4ff0200e6ff100022002100
e7ff1f000500eaff6b00ebff0a0014000600f7ff0f000a009fffbaffe6ffa4ff0a0014000200f6ff09002800040026000000b1ff19000000f5ffe1ffbfff0800
d5ff0100e1ffe5ff06001a000600daff0000f7ff000013001a00fdff3100fcff1700efff1f0003002a0000000000110009005d0022000d001c00e3ff16000d00
f1ff07000e0017001300010007000d00faff09000b00050080ff10001600c2ff13000a0018001500ffff2c00daffe7ff1c001b001600aefff6ff1800c3ffe8ff
08002200faff1000fdff8afff6ff3000f6fff0ff01000500fdff2e00f2fffcff0a0000002f00f0ffe9ff1f00d7fe05002000c9ff0c000b001700430017000800
300012000f00f6fff8ff69002800fdff0a00fbff000001002a000e0039000a000500f3ffdcff0a00faff0e0005000000d1ff1800f1ffd2ff040046000c00cdff
f0fffaff0c001000d9ff060037000900c3ffc6ff1f00f3ff16000f003b00f7ff12000700fbffefff3f000100f7ff0b00f8ff1500ffffccff2100f1ff08000100
ddfffaff2700fdff03001c00080010002600fdff070063ffebfffbff37000900f9fffaff0c00bafff9fe03001300b7ff0900ffff0c00f9ff0b000b00fdfffdff
00001600f1ff0900c7ff1d0022000a00ecff23000000f1ff23000c002b001d00670015000500e0ff06001000fcfff9ff0000d5ff050009000000b6ff0b001900
0500daff0700fbff3600e0ff01000d00ffff0a0020001300c0ffdcfff0ffbcff09002a00feff010001001200050031001400ebfffbff1b002200ebffc1ffedff
e6ff0400f2fffbfffeff1e000800f7ff090000000500cffffafffaff7600edfffdfff5ff7700fcff15000c0078ff17000700d2ff160007001100070012000a00
e9fffeff180007003b0017000e000d0050000a00fcff060022ff0d000700dfff3b00fefff6ff0b001a004500e1ffcaff1e002700150097ff17000d00f2fffcff
05002600f8ffe2ff1c008cff0a002900f3fffaff0c0003000c0020000400faff0e00faff0300e9ff5f00efff0a001b001800f7ff0a000b001e00310018000a00
f6ff1b001a00b7fffdfff5ff8bff0c000a00fcff07000a00090003001b00faffbffffeffe8ff2800fdff1c000500f5fff4ff2000f3ff3000f9ff4d009fffc1ff
f1ff0500fcffebffd6ff000012002b00c6ffc5ff22000800f4ff0d0064fffdffe2ffecff070007000000c9fff6ff1700f6ff2e00d0ff28002700f2ff03001b00
e1ffeeff2d00030017001d0096ff1a003f00fdff0a000200f7ffffff1400f9fffbfff2ff0000110018ff0e000b00e9ff0c00010008009bff21000c000d00f2ff
1b003600fbffefffd4ff3500f9ff0c0006001e003b000400190013002600eeff67001b000d00e3fffeff070000000000edfff1ff0d001200e5fffaff2100f1ff
0e0010000900e9ff4600e0ff19002200efff110016001800f6ff86ffe5ffcbff16002900fcffe4fffeff1f000d002d002c00b1ff220020003700e6ffdbfffdff
fbfffcffd9fff3ff050015000f00fbff0200f2fffaff1b000800fdff28009eff04001300c6ff040002000b00fbff1700050019001d000d00110014001800f0ff
15000b0006001300e4fff4fff4ff160095ff0000f2ffffff86ff10001600ecff0c00effff2ff0800e7ff1600d5ffdbff35000c001000d3ff0c001100c9ffe7ff
0b003200020016000a0038fff7ff1c000400eaff05000300fcff1b001500f7ff350000000000f0ff0f00c9ff0c0014001d000c000f001900100037002d000700
05001a0036000000fdfff8ffb90009000b00030001000700feff0a0005003300ceff76fff1ff3500e1ff1500fbff00000c00d1ff18002bff0b005400dbffc4ff
efff01000800ebffc7ff000013002d00c7ffb4ff230007001f00040097000700f3fff6ff03000900f8ff8bff0200d9ffeeff0c00040009001800f1fff8ff2000
f7ffe5ff2d00f3ff4b008fffdfff08003700010007001900edffffff220008000300e5ff1300d1ff01fffdff1900dfff0e0001001f0032004700feffdfff1fff
cffe1600edff0600d0ff0100b200120005001b000b00f5ff12000c002d0019004b001d000700e8ff12000300eefffcffd2ffc7ffeaff2600f7ffffffdcff3800
fbfffdff0c00faff0d00a5fffdff1e00fbff0a00fcff10003800d7ffdfffe5ff01001f0009004200e2ff1000050022002500e9ff2c000b002900f0ffafff0000
ebff0000e5fff4ff0f001b000000f6ff07001500040002000200f9ff0a00eafffeff0c004f00fbff14000100f9ff1a00fefff5fffdff05001700f5ff13002800
ecfff7ff1000040029002000f8ff03003c000900f9ff08007fff05001d00fdff2800f4ff07000200e5ff0e00d6ffb9ff1e0085ff1300070004000500e9ff1500
09002000ffff0800100081ff0c002900f8ff040000000100f8ff1f000100dbff210000001200e4ff1500efffffff040012000d000900120005003e0018000800
030042000600e9fff4ff070065fffdff0f0001001e000c00faff08000a00efff22001a00f1ff260009000a00040004001400e3ff09003d000c004a00e7ffcaff
e9ff050000001200d1ff0000feffbbfed5ffc0ff180000000d000a0045ff16000800fbff030011000b00d6ffffffe1ffedff07000300feff1800f4ff0d000d00
a0ffc5ff2900d3ff29002f000b0013002f000900feff0c00eeffd5ff06000500fbff10000f000600dffefcff0100fbff1000fcffbd00eeff30000a00c2ffae00
5c000e00fdff0200daff0900e1ff09000500ffff2100030095ff0100210003002f000a000200f4ff0b000b0011000500e8fffafff0ff06000000faff60ffecff
050000000100fcff0c0096ff1600060003000c0000000a002800fbfff3ff01001900eeff1000feffeaff00000d0023002000010000000500eafff4ff66ff0100
f9ff080008001e0001000600feff10001a00f9ff0e00f5ff0900fafffefff0ff0b000c0010003b000900f6ff00001100080026000100feff0600f8ff0b000900
1700040018000e00f1fff4fff4ff5cff030000000c00feffc4fff9ff89fef8ff3100f5ff0500dfff0c00fbffe4ffd9ff0100050018001100fbff0d00f2ff0b00
06001900050001000800a5fffdfffcff0a000000fdff1100110007000c00e9ff0100ceff0e00f4ff040020000100fcff07001e000b0001000b0032001d00e1ff
10000800ffffb5ff030000000f000d0007000e0000000c00faff0800fcff050001000c000000d9fff5ff0a000e00dcff0700faffedfff1ff0a000100f4ffeaff
e8ff06000700ecffe8ff07001a00fcffd4ffe3ff0e00f5ff0a00260000004eff0700feff090016002c000000faffffffe7ff07000900fdff0500e0ff0d000d00
fcff07002500ffffffff0700f9ff1800080009000900080011000c000c002300dbffd9ff5eff0200cfff050006000f000900deff0200000002000500f3ff0000
faff0100faff0900e4ffd6fff9ff0900ecff0600fcff030001001c0020000300fffffeff0500efff0500360013003100f4ffffff13000d001100fbff0b000000
0d000400f7ffd8ff1000cbff11000b000100090000001c00400000000e0009000500eaff13000000faff010010001b0031000400fdff1000fbfff5ffcaff0600
ffff0d000000ddfffaff0800f8ff02000600f3ff0a00fbff1300e0ff0000edff0f000f000f00d1ff01000000090010000c00f2ff0200f9ff1400f5ff14000b00
150019000b00faff0300feff7f004c00000004000700a1ffd6fffeff0900faff1300f6ff0b0020000e000c00e9ffd5ff040005001a0003ff0d000300d7fffdff
0600f7ff0a00000011009dff010002000a000500faff83ffa1fe0d00bb00fefffeff03000b00f1ff05001a00feffffff240012001100e1ff0b002e0020000d00
11000800fcff0700ebfff8ff0b000500fbff0c00ffff05000b00190003000d0006000300faffc6fffeff0d00100011000d00faffdbffedff09000200f9ffdeff
e4ff0b0012001300e1ff07000e00ffffceffc2ff0d00110019009a00f8ff42ff09001100070020001f00f7fff6ff0300eeff160008000700ffffd4ff0b002300
ffff06002900040001000600feff1b0005000a00070012000700eaff0b00efffedff22009afffeffc5ff08000d000b000a00faff0200ffffffff030000000200
01000600ffff0c00e4ffffff01001400daff1000fcff0500fbff070027000100ffff08000800e9ff0900b7ff08001900ebff040001000300020006000d000300
00000e00fdff97ff0500d9ff0d00040003000e000100e0ff4000f8ff2e000c000400e7ff0d00fefff4ff0800100017003600fbff00001800f7ffeeffb1ff1900
f1ff0c00ecff110005000f00fcffcaff1e0004000800e2ff0a00f9fffefff2fffeff010009002d003a00edff0f00120008001700020009001800350012000c00
51000e00af000b0003000200deff26ff0000260000001900c5ff0800feffeaff3d00f5fffdff1800f6ff0800e6ffe7ff09000300170005ffe3ff0800efff0e00
0400f9ff0c000400000090fff7ff07000900f3fff7ff0400fbff0c0004000200040010000600f0ff0600280000001000feff1a001400e5ff0e0034002e000900
0d0008000400f9ff05000c000d0012000c000b000200020010002500250010000b00fdffefffc0fff2ff00000d00050071fffbffe3ffdfff0d00fdff0600e0ff
e7ff0a00f8ffe1ffebff16000c000000ccffc3ff17000e0007000d00f6ff7aff0f001600ceff2100f6ff0000fdfffffff0ffeafe0c00fafffbfff2ff1f0047ff
f6ff060029000000fbff0300000016001b000500fdff12000300f4ff0b000f00e5ffebff78ffeaffccffeaffffff140006000d0004000a0002000200fbff0400
0000090002000e00e1ff0a0000001200dfff11000200f9ff03001200250000000700a0ff0800f8fffbff0a000e00fefff8ff0000f0ff2d00f2ff060007001a00
ffff06000400e5ff1a00e8ff05000f00ebff0500040016001300f7ff00000500feff04001300faff08000d00100016004200fdfffeff26fff6fff0ff81ffcaff
e7ff0600f3fff6ff00000f00fbff0bff0900f7ff050012000b00fffff6ff01000300e8ff0900f8ffe5ffebff28000f00beff0a001400fdff1c000a0013000800
0400b8ff1b000d00fefffffffdff0f0002000500020097ffa5ff1700fcffdcff2000f6ff000017000c000d00edffdbff0700020019000cfffaff0400d4ff0500
0f000d00f6ff090008009dfffaff0b000100f3fff5ff0f000000f4fef7fffaff0a000700fdffedff0d002e002500040003000f000e00f1ff00003d00feff0c00
8f0000000800fdff0400edfe08000b00f2ff0600feff0b003a001b0065006e0008000300f5ffebfff0ff04000a00ffff0c000300e6ff020013000700fdffe1ff
e6ff05000900f2ffecff12001d00fdffc5ffbeff100012000e000d000000baff11000500faff2200ecfff6fff5ff1000efff6400090023000800f9ff29001700
f8ff05002f00fafff6ff0000feff16001e000500f5fff8fff9fffbff0000ffffedff080080ff0000cbff0b000100e6ff090000000a00010004000200fbffffff
01000600faff1200deff1a00faff0700ecff1a00ffff00000000030027000a000700fcff0700f5ff0400080001000d00eeffebff10000f00efff070004000500
ecff43000e00fbff98ffebff09001100f9ff0400030008001a00f0ff0a000900f5ff170003000400210003ff080017000000ddff0b0011000b00efffa2ff0600
e2ff0400e9ffffff02001f000600c8ff080019000000f5fffbfffaff0a001400fcfffbff0700ffff1300edffd3fe1400ffff02003800f9ff1c00160010000b00
fdff0b00030004000b00f1ffeeff0f0006000b000200f8ffa1ff3500f5ffdaff1000effffeff0b0016000b00efffd6ff05000a00180012fff3ff0100f4ffe8ff
0900150002007fff1a009efffbff1100fcff070002000b00ffff0800ffff070019000600feffebff08001c00d2ff0000f4ff19000d00010005003f0020000300
25000100fffff7ff08001a000b00edff0200050007000a00f4ff0a002400ecfffdffe7fffdff0000faff0500fffff9ff7fff0c00f3ff88ff0a001000efffe3ff
e8fff9ff0e00fefff4ff0300f0ff0a00bbffcbff0d000000050000001c00f5ff07000800fdff1d00fdff0000f8ff1500eeff26ff0000dfff1300fcff0e000d00
fdff00003000f9fffbff0400f9ff180023000500000083fff3ff00000100ffffffffe9ff0600f7ffd0fffffffeff05000a00ffff0200b8ff09000200f3ff0e00
0400130009000d00daff000013000d00fdff1e000f0005000e000a002700f4ff510007000900f5fffcff0c000700fafff4ffeeff0f000000ebff130000000300
0a00b1ff150008002e00ddff070010000400fdffe2fffeff0100cbff14000600ffff23000000a3ff2f00120004001a00fffff3ff0d0007001400f0ffb6ffeaff
f8ff0500fdfffaff0400210006000e000500fbfffeffd8ff1000feff1200edff090006000f0003000d00e6fffeff12000900f9ff4000f3ff1a00210010000a00
fcff0b00fdff0100d7ff1900f3ff0b004b00f8fffafffeff8eff1300f8ffe8ff1900fdfff8ff060017002200e6ffbfff1100190016000dff09000900e4fff9ff
0e001800080005000d009aff07001e000300060004000400fdff05000100f5ff2d000600ffffe7ff1b000b0016000000010006000d000300faff3d0011000700
0f00140073fef4ff0600ffff0200220017000600a8ff0d0000000c0007000900aaffbcff01001900e6ff0800fdfffdff0f000e000c0025000c001a00faffe3ff
e9ffffff0400f5ffe5ff12000e000600cbffb6ff1900faff1800020038fffdff10000300fcff2300fdffe7fff4ff1b00f2ff19009fff49001300fbfff2ff0c00
f4ff00002f000b00faff0800eeff12001f000a0001000300fbff000002000200f9ff03000d00f1ffd1ffd9ff0500dbff0d00fbff030042002a000600e8ff0800
ffff0700feff0c00d4ff24002700190008007b00f9fff7ff220009002a0035004f00ffff0100ffff0f00feff03000a00fcfff1ff0900fdffeeffd1ff07001100
fcff2f0008000000e2ffdcff060015000100f7ff070009001b00f9fff0ff0500fdff1a000700590019001200f3ff20001100feffa3fe06001900efffd6ff0100
00000100f4fff7ff08001f000500080002000e00f8fff6fffefffeff0500c1ff01000700f6ff00001700e8ff65fe14000400fbff1c0000001b00110012007300
eeff03000700040018000300f3ff09007eff00000700fdff7eff01000000f8fff2fff5ff07000a00fdff0b00e6ffd7ff0a00080016000fff00000c00f3ffecff
0d002700080003000b0087fffcff07000000feff0700070003000b000000fbff4b0008000600e6ff3e00edff1c00040005000c000c0007000b00370014000a00
07001b000700f0ff0500f9ff07001a00130008000e000d00fbff0300fefffaffa1ffd8ffffff2200f6ff0800f9ff01001800d3ff12002eff0d001b00d8ffe0ff
e3ff08000c00fafff1ff0e0004000b00d0ffb0ff1600e5ff0900ffff6d0008000400fdff07001b00faffd1ff0000ddffeeff15000000f8ff1100faff13000500
e0fff1ff2e000600050067ff07000b001000080001000700f9fff7ff0d000200f9ffebff1800f7ffd2ff07000b00faff0d000000edffa7ff69001200edff62ff
02001400ffff0200d5ff14008c001b000d0014001600efff150007002500f4ff270000000500f9ff050006000a000700050000000d000f00f2fffaffa6ff1700
0100f7ff120007000f00c3ff17001b000300f0ff0300ffff3700dcfff7ff0000030011000900c4ff0a00050000001f000a0001002c0007001900f4ff8bff0000
f8ff0700f1ff04000c0021000900060008000800feff1c0006000000f1ffd4ff05000100000000000a00efff07000b000000fafffdff08000e0012000f002b00
f4ff06000200070004000f00fcff10003a000000feff0000b0fffdff0500f2ff0900f4ff00000d00e4ff1c00f2ffacff1a00e2fe1600ffff01000800e5ff0700
1300200008000400110091ff0c000600fcff0500ffff0900feff08000200f0ff140007000400e5ff0200efff0100ffff07000e0007000b000e003a0011000700
0900060025000a000000f9ffefff0a00070007000b000e00faff0200000000001500e0fefeff210004000700ffff06000b00000005003e00110025000900ddff
e8ffffff07000300e5ff000009006bffd5ffd1ff1600f8ff21000000e4ff0e000900000005001a000500f8fffcfff5ffebff0400040000000e00ffff08000a00
12ffc3ff2700e8ff0b00160000000c0010000c0003000800f4fff5fffffffbff0000f7ff1700f9ffc6ffe8ff10000b001000faff8900160046000900deff7900
1a000500fdff0f00d8ff1000150013000f001000fbfffbff9eff00001d000f0026000300f7fff7ff0b000c0015000700f3fffbff020006000600f6ff5cff0200
07000600fefff8ff0600aeff1b00050006000b0005000a002000f5ffdeff0b001e00eeff0e000400faff000011002b001a000000fcff0600f5fff7ff5bff0200
fcff02000e00e7ff1400f8fffcff15001300e7ff0d0018001100e2fffffff8ff0c000b0008003c000a00faff0f000b0001000500fffffcff0a000b0009000a00
31000900faff32fff4fff6ff4f00ffff0200fdff0c00f9ffd5fff7ff8efefaff1d00f7ff0000190019001200f4ffdbff020001001600140001001b00effffaff
090014000200ffff0c00a6ff0200f8ff0a00000000000c002e0005002b00f4fffcff85ff0700f5ff0b0010000100fefffcfffcff0b00000008002e001100d5ff
110007000000c9fff1fffeff0c00080005000d00ffff0a00faff0c00feff0600fdff07000100f1ff1a000d000e00d1ff1000fcffe8ffebff020000000300f1ff
e9ff0b000a00f7ffe1ff0e000300fdffd1ffd3ff0200feff1700f9fff9ff6fff0a000c00050013000d000100f8ff0200eaff04000800fffff6ffc5ff15000b00
0e0007002300fcfffdff0200faff0e0008000c000a000b0014000f0005000800e3fff8ff6fff0600d0ff09000c001d000300ecfffffffffffdff0600f5ff0000
f8ff000004000b00e9ff0900f8ff0c00e4ff0600fdff160001000c001d000200feff00000900f3ff090000001900f5fff3ffffff1300ecfe0d00feff0700ffff
02000a00f3ffd1ff0e00cdff16000600070008000400abff0e00f7fff4ff17000000f3ff1000fdfff2ff000011001d0023000300fdfffdfffbfff3ffaffffaff
00000600e7ff050003000a00faff00000000f9ff0e00f8ff00009afffbff0100250001000200edfeffffffff08001200ffff00000000080010001e000f000c00
34000e0039000d00f1fff2ff070023000000feff0500f6ffeafff6fff3fffdff0700f6ff020010000e000c00e5ffccff05000000180016ff1c000c00eeffffff
f3ff0a000f0001000800a6ff0200fdff0c00080000007fffdcff0500fafffaff010007000600f2ff0e000d00ffff0000070004001000f6ff0d0032001300f6ff
0c00050002000e00e3fff2ff0900090000000d0000000b0008001f000200fcff09000000fcffe3ff070003000f0005000e00f7fff4ffe7ff0b00f8ff0700e8ff
e2ff010003001e00e9ff0c000300f9ffcdffbeff0c00090013001500fbff81ff06000000faff2a00f6fff8fff7ff0200eaff14000c000500f0ffb2ff0f001200
110006002700fcfffbff0100fbff1a0001000b00fbff0b000400e1ff1100e1ffe2fff9ff9dfffaffd7ff08000c0015000000fbffffff0700f9ff0300f8ff0000
f7ff000009000700e6ff0200faff1200d5ff080006001300ffff03002300fafffbffb6ff0600f6ff09009eff0c009000ecffffffa5ff1900fffffefffefffcff
00001400000094ff0100dcff0400000004000200060015001e00fbff1a0013000000efff0b00f7fff4fff9ff0d00200035000000f9ff2e00fbfff4ff8fff7aff
f1ff0b00e4ffe4ff01001300ffffb6ffb5fe05001000ffff0c00f6fffaffeffff3ff0800000027001a00f1ff160010000800f9ff050000001000020009000900
1d00d2fe14000c000100f2ff2200e7ff0800fcff0300f3ffe3fffbfffafff0ff0b00f2ffffff1100f5ff0200eaffe4ff0500050018000cff04000a00e9ff0000
0b000100f3ff0100000089ff000000000400f7ffe3ff08000c000c000f00eaff03001800fbfff5ff0e001800faff0900faff15001300fcff0300330012000c00
3bff06000400160008006b0000000a00f7ff0b000300fcfffdff45000c0043000600ffffcfffeafff8ff18000e000400fafffaffe8ffdfff0700f3ff1600e9ff
deff24005d00edffe9ff0a000000feffc8ffd4ff0e0008001100f7ffffff9ffffbff1900fdff3300fdfffffff4ff0c00ecffecff0600f5fffbffe0ff28007aff
070005002800fefff9ff0100f9ff180001000d00fbff0d000000fbff0c000400d6fffaff7effffffd4ff00000900120002000200fdfffefffaff0000f2ffffff
fcffffff04000800e4ff1b00fbff0f00d5ff1200fbff0b000000c7ff2400faff0000fcff0400fbff0a00f7ff0600ebffe9ffefff38001c00eeff00000500f9ff
0b0000000800d1ff0800efff0f000f00a90007000300d1ff0d00faff00001200f0ff00001000fcff050034000b0022003b000200fdffbfff0500f1ff5fffe4ff
e3ff0200d0fffcff02001000faffc1fff0ff09000d00fcfff4ff0500f0ff0900fbffdafffcffebfff5ffecff02000f00fdff0100120001001700fcff0b000d00
1300240032000400f0fffefff2ff10000a00f4fffdfff2ffccff1400fdffeffffeffeefff3ff0e000800fcffe5ffd0ffffff0200150013fff0fffcffecffefff
0d001000b3ff1aff0f009ffffafff9fffbffeefff2ff0e00edff24fff8ffe3ff06000d00fafff1fff7ff240000000000f3ff03001300faff040039001a000500
3500fcfff8ff07000500eafe0300a2ffbbff0a00fcff0b0032002a003000f3ff0800fafffdfff8fff0ffdfff0b0003000700fdffebfff8ff0000eaff0000e8ff
e3fff1ff0a001900f0ff040005000000bbffc0ff1200f7ff120000000e00dbffe8fffaff99ff34001000f9fff6ff1100ebff130008002b000800fcff27000000
0a0005002800f8fff4fff9ffefff14000b00feffefffeffffdfffdfff0ffedffeafffbff91fffaffdcfffdfffeff0e000400fffffefffcfffeff0200f2ffffff
f9ff020003000e00e4fff5fff6ff1a00e7ff0b00faff09000000050027000400020008000300feffe9ff01000600f8ffe1fff6ff98ff0000dffffdfffbfffeff
dbff40000f000100e1fff1fffeff100004000800edff0a001c00f7ff02001000f6ff0e000a00f2ff2c00d3ff0d0023000300f1fff8ff24000700f0ff88ff50ff
dcff0200f6ff0000fdff1e000100caff06000c00010000000700ffff03000f00fbffffff01000a000000d7ff0300100070fff4ff2d00fdff19000c0009000700
f6ff52ff05000900b7fffcffffff00000000f1fff6ffeeffceff4500faffeeff0000ecfff3ff0a0008000900eeffc7ff0a000300140016ff0b00feffeaffe8ff
0d000f00ebfffdff0b009cfff9ff0000f3ff0100f7ff0b0002000300f4fff3ff18000a00f8ffecff1b002a00dfff0300f4ff10001100fbfff2ff400004000900
26fff8ff13000d000a004700f7ff3900f6fff4ff73ff0e00e8ff110014002a00f1fff4ff0400000000000700000002000300fbfff7ff93ff0f00ebfff9ffeaff
dfff09000c00f4ffecff14000f000200baffbaff0c0001000d0000001900f7ff9fff0000fcff32000a00fefff5ff0600e6fff9fffffffafe0f00000018000700
0d00040030000200f4ff0100faff0f0010000b00fbff8ffffffffdff1400fcfffffffcff0b00f6ffd6fff6ff01000b000a00ffff0100f4ff05000400e9ff0100
f2ff08fffeff0a00dfff2200f1ff0800fdff3dffecff0000090014002700e1ff1d00fbff0300fdffd4ff0a00000000000200f6ff1700fdffe8fff2fffbfff0ff
0a000dff0c0008000d00e5ff06000c000400feffbbff0a002100dafffaff1300fbff1400f1fff3ff3000210003002100fafff2fffbfff8ff0700f0ffa8fff3ff
f8ff02000800feff020022000000f7fffeff1000fcffe9fff0fffefff0ff1200f8ff0100050003000100effff7ff0e000200f0ff3500faff14000900080073ff
f2ff0e00fbff0900ecff0000f8ff0b003700edfff2fff9ffbaff2600f5fff1ff0600f5fff6ff080013000a00e3ffabff00000400110013fff3ff0500edfff6ff
0a000f001000090011009dff03000900fbfffcfffeff0700fbfffdfff7ffeeff0e000600ffffe2ff04001500fefffdfff9ff03000f00fffffaff3e0015000400
06000500e2ff0e000400fbfffdff59ff0e000800fbff0900090005000400eaffb7ffedff08000f00eeff0000f8ff00000c00fdff0e002800faffe7fffcffe9ff
e2ff000002000500eeff08000400f8ffc2ffbcff0f00e7ff1000fbff78fffefffbff0600000033000b00fbfff4ff0500eaff00007bff1e000e00ffff00000600
000007002e000400f6ffffffe7ff09000a0009000600fcfffeff0100fafff8ff0400eaff1400f8ffdafffefffdfffeff1200fbfffffffaff1b000a00e4ff0100
fbfffcff00000a00d8fffdff090022000f0039000b00ffff140001002500d7001f00fdff08000500fbff0e0005000a001300f3ff05000000ecfff9ff06000200
feff280011000500ebffdeff0c0014000100ebfff8ff06001f00f6ff0000120006000f000c00b6ff2f00f9ffe7ff25000000fdffe6ff01001100f3ffc8ff0200
ffff0700f5ff00000500250003000f00fcff1500f8ffedff05000000fdffadff00000700f7ff03000a00dffffeff12000800f4ff1700fdff120042000d004900
fbff0b00ffff05000e001100f8ff0d00cdfefaff0f00fbffc2fffffff6fffaff1100f6ff2c001000f4ff0400ebffcfffefff0300160021fffdff0c00f3ffd4ff
0a0012000900fbff0300a3ff0300fafffcff07000c0007000000fcfff9ff090076000b000000e8ff3c0031000000fdff010002000e0007000700400009000900
150019ff1c00f5ff0600fcff05000d001000050004000a00f2ff0000feff0000c2ffe3ff0800200000000900f7ff03000b00dcff110074ff0a00f3ffdfffe7ff
dfff01000b00fcffeaff0d001a00fbffcaffbaff0f00e8ff1600f9ff59000800f5ff0200020021000a00fbfffeffe9ffefff0500faffefff1200fdff03000000
d3ffd8ff30000a00feff68ff0200040000000900ffff0900f8ff00000600fbff0000fcff1e000100d3ffddff0d00fcff1300fbfff5fff5ff45000b00e5ffb7ff
f4ff01000d000800d7ff2e0012001a00160054fff7fffcff13000a002600dfff1000fdfffcff080007000b000b000c001700feff0f000300faffe4ffd7fff0ff
0100eaff150007000300d0ff000010000400e6ff080002001300fcfffeff0c0006000700090004001300ffff04002b0005000a000f0003000e00f7ff69ffffff
feff0a00fcff0d00070023000400070003001000faff0d0005000300f8fff1ff06000700020004000500e9ffffff0d00fbfff4ff01000400100016000b001aff
ecff01000300070005000500f9ff0e0032000000fffffdffc5fff8ff0000fdff1600f8ff04000d00edff0a00e6ffaefffffffafe14000300f7ff0300eeffecff
0e0012000a00fdff10009cff1700fdfff9ff0b000300080000000300fefffaff02000c000d00e9fffbff0600fcffffff0700f9ff070004000f003c0017000800
05003100feff0a000a000000000003000d00090002001000fdff0000fafffcff1600f8ff08001e000d000600feff07000b00fbff09003e000300fdffffffe0ff
e5ff060005000800edff03001300abffd5ffc6ff0700edff1600fffff7ff0c00070004000500110010000200fafffaffedff020003000200100002000e000700
7fff19002800fdff04000900fdff010003000b0005000600fcfff9ff0700fbff0800efff13000100d0ffddff190003001000fdff4f000e0035000a00e1ff3000
0300fbfffeff0500daff0e0015001400120009000e000100f2ff00001d000d001200fcffd8ff050007000c00190003000900feff080003000b00f9ff7ffffbff
01000900fcff00000200beff1200000005000600070005001700f6ffe4ff13002600eeff09000100f8ff00000b0032001400ffff00000000fbfff7ff8cff0000
fdff000003000c002d00feffffff1300ffffedff0f0018000b00e1fffcff090032000b0005003b000b00060007001300feff0a00000002000c00ffff05000800
260005000100cbfff2ffeaff04000a000800feff0b00fcffd7ffecff75ff00000100f9ff030006001500feffebffe7ff0c000400140014001c002200f1ff0200
0f000f000300feff1300b0ff0300feff0c000e0000000e000e0000000500fdff0000e5fe0a00f3ff0d0010000000fdfff4ff21000800030007002900180054ff
07000100ffffdcffddff0300050005000e000900feff1000faff04000000010003000900fbfff1ff21000c000c0036ff1200f9fff7fffcff090000000700f0ff
edff15000a000500ebff0e001c00fbffd6ffd2ff00000600080001000000bdff11000500020000000c00fefff9ff0a00ebff070008000300e7ffc2fffbff1800
100007001d00fefffeff0300fdff0e000700070007000b0014000c0000000500dcff0200dbff0500e0ff060006001600fdff020000000100feff0b00f5fffcff
f9ff030005000600ecff0b00fbff0a00e1ff0a00020024000000050019000000fefffaff0a00f2ff0700acff1a002900f3ffffff0400daff0b00ffff0700feff
05000a00e7ffbbff0000ccff0600ebff0600feff0300f8ff0600f1fff7ff1300feffefff0700fcffeafffaff0a001a0010000000fafffeff0400edffb9fff7ff
fdff0000f1ffcbff0a000400fcff0a002500f9ff1200c8ff0a00e9fff8fff7ff460000000400b1fef8ff1a0003001100f7fff7ff010004001100150001000a00
0e000700f7ff50000100eaffecff04000300f3ff0300faffeafff6ffefff0000fafff4ffffffddfff7ff0100eaffd0ff0c00feff17005afff5ff1200f2fff4ff
ddff0a000400fbff0c00aafffffffcff0400fdffecff4dffe2fffbff0200e6fffeffcbff0000f7ff08000200fafffbff000006000f00ffff04002f00f7ffe6ff
0600020000002400d0fff9ff000008000a000500fcff0a00090045000000000008000700dffff0ffe3fff9ff0e0019000c00f4fffcffe5ff0600faff0a00e7ff
e2fff6ff43fff6ffe4ff09000200fbffccffb9ff0a0008001b00f5ff0000b4ff0f00050002000f000800f6fff6ff0400e4fffcff05000300d7ffc7ff0900fcff
150009002300fafff5fffffff5ff170002000a00050008000900f3ff0000e5ff68fff7ffcefff1ffd4ff020008001700f9ff0000fbfffefffbff0000f5ff0000
f3ff060007000900e6fff2fff5ff0500d0ff090000002400020004002100fbfffcfffdff0600feffffffaeff06000200defff0fff9ff2a00000000000400fdff
fcff1600ffffc7fffbffe1ff1500e4ff61ff06000200e9ff2500f6ff17000d00f1fff2ff0900fbfff5fff8ff0b0021001d000000fbff07000200f9ff9affdeff
f1ff0000b2ffffff06000b00fcfffbffe8ffffff0f00fcfff5ff0000f9ff090012000500000023001900f7ffffff1000fcfffeff0000f8ff0d00faff01000400
1600dbfff1ff0d00fbfffcff0000fbff0800f2fffafff6ffe0fffaff0200f7ffe2fff5fff5ff0f0004000300e4ffdbff04000000160048ff5f000800edff0900
1a001a0049ffacfffdff9fff0000fcff0200dfffe5ff1200030004000500e2ff02001c000000f8ff13001900fcff2b00f3fffdff1200f6fffaff3200f9fffcff
e4ff000000000f00feff0b00ffff0000e3ff0f00fcffe4ffedff4c000a0006000a00feff7cffeefff0ff430010000d000300fcfff6ffdeff0a00f9ff0600efff
e3ff9afe3d00e8fff0ff00001400ffffc1ffb3ff170001001100faff0500b2fffbff0500f9ff12000d00fffff2ff0c00ecffffff0700f6fffdffdbff0900bfff
0c0008002100fafff7fffcfffaff0f00fbff1000ebff07000500f6ff04000000bcff0400a3ff0c00e1ff0000ffff2600f4ff0200fafff9fffaff0000fbff0300
f8fff9ff0100fdffe4ff0c00f4ff1200cffffeff000007000000f9ff2400feff000001000300ffff0100dfff00000800e8fffaff1b00faffddfffcffffffebff
a5fffeff0100b5ff0200e7ffeffffbff100004000200f5ff1000f0ff07000e00eafffdff0c00f9ff0000f8ff0d001e001e00f7fff6ffd4ff0500f7ff98ffc1ff
c2ff0000e5ffeefffdff0d00f3ffd8ff0000f5ff1300fdff0400fafff7ff0e00f6ff5900feffebfff2fffcfffeff1200030005000a00faff0f001900fdfffbff
f3ff0000fdff0a00d1fff9ffe2fffcff0c00f0ff0500ebffcdff0300fcfff5ffedffedfff3ff0b000500feffedffcfff1300fdff0f0048ffe8fff7ffecffecff
100015002900f3ff0600a6fffefff7fff6ffeffee3ff0c00e3ff50fff0fff9ff03000f00f5fff4fff5ff0e00fcfff5ffeeff0b001400f8fffeff330014000500
1800f7fff1ff16000300b5fff9ffeaff80ff0800d6ff1a00160042001300e5ff0500f7ffd1fff5fff8ffedff0a000c001500f8fff2ffe9fffeffecff1000eaff
e1fff3ff1fff0f00edffffff0200fdffb5ffa1ff0f00f1ff1100fbff0e00ddffadff0900f4ff14000c00fcfff0ff0a00eefffbff00003e001400fbff0300f7ff
0c0008002500fcffeefffdffefff0a000300e5fffafff1ff0000f7fffffff6fff2fffcffbaff0b00d9fffcff050018000200fffffdfff6fffefffcfff7ff0000
f4ff17000300fdffe2ff0100f7fffbffddfffffff6ff110006002bff2000efff0500fdff010004001afffefffbfffaffe8ffedffeeff0000d6fff4fffdfffdff
180043000a000300f3fff1ff11000c0084ff0a00dfff04002300f5ff0b000f00f4ff02001800f4ffffffdcff0f0025000100eaffe5ff00000000f3ffaeffd0ff
cdff08000000f6ff02002300fcfff0fff2ff31000600fbffedff0400f3ff0e00e7ff000007000500f9ffeefffeff0a00faffe9ff1900f8ff0f001100fdff0800
fcffd1fff6ff0700eeff1000000000000000effff7fff1ffd7ff6500f8fff3ff0700ecffe4ff0900f0fffdffe5ffccff1800fbff11004cfffefff8ffedfff1ff
09001a00d2fe0200f9ffa2fffdfffbfff8ffeafffaff0000fbff0600f9ffeafffdff0700fcffe5ff3c002000d3fffefff0ff0f000e00feffd5ff410016000300
d1fff7ff0000050005000e00fefffcffd9ffe0fff1ff0a00e5ff07000b00f5ff0000f4ff0b000100f1ff0000010009000800f2ff0400b6ffb0fee4ff1600f0ff
e0ff0d0000000c00ecfff9ff0f00feffbaffadff1500f7ff1100fcff1500f8ffacfff3ff9bff0e001500fbffeafffaffeafffdff000093fe0f00feff1e000400
0f0005002b000200f2fffafff0ff0900f8ff0f000c007cfffefffbffcbfff7fffcff010007000100deff000007001c000900faffffffe9ff01000200f2ff0100
f7ffcbff02000c00e0ff0000e0ffc5fe0400e1ff01000400070001002300ebff0b00fafffcff01001d000e00fefffaff0a00f9ff12000300cbfff2ff0000eeff
a4ffa7fe140017000000e8fffbff0a00ffffe6ff90ff05000800e9fffdff0e00fcff0600e1fff4ff1300fbff0d002200f5fff0fffcfff8ff0600f4ffd1ffdcff
f2ff000006000a0003002700000004000300f0fff6ff030001000300f5ff0f000200020000000a00fbffe7ff030011004efff8ff1300010010000100f9ffefff
f1ff0000fdff05000100fffff8ff04004300f0ffdffff2ffc3ff2200fefff1ff0d00efffeeff03000200f8ffefffb3ffeaff0400100019fff5ff0000f3ffdcff
07000b000800fbffbbfea0ff000000005d00f7ff01000500fefffafff8fff4ff2c0006000100e5ffd7ff2300fdfffffff7ff1a001500faff1b004300feff0500
0400faffe6ff15000400f3ff0400eaff04000c00f9ff0500ffff01000100f9ffe9ffeaff11001500f3fffaffe6ff01000d00f3ff16001f000400d2ff1000eaff
deff010004000b00e5ff04000a00efffc2ffb3ff0f00f3ff0c00fbffdbff0300a6ff0400f9ff10000b00fffff0fffdffe9fffaffa9ff4a001100ffff07000200
0300f7ff2f000800f7ff0200edff0a00fdff0700faffeefffefffdff1300fcff0300edff17000600d7fff1ff03001d001500fdff0100f1ff09000900e8fffbff
000021004a000d00d8ff0900f2fffcff17000600f5ff050008000f00260006000c00f8fffeff120013ff0f00080005003500f4ff0200ffffe4ffe6ff0000f3ff
ffff3e002b0009000100e2ff03000f000200dfffe2ff0d001c00e9fffeff1200fbff02000d00e7ff2000f8ff82ff2400f2ff0000f0fffcff0800f2ffc8fffeff
000003000400030004002d00fdff1400ffff5000edfffafffeff0400f1ff1d00fcff0300feff0a000400f7fff5ff13000000f7ff0b0000000e000b0001001200
f5ff010000000100fcff0100ffff0e002cfff5ff1800faffc2fff6fffbfffeff1700f7ff8b000a00f0ff0900e0ffcfffedffffff14007efff5fffffff3ffebff
06000c000000f8fffaffa6ff00000000ecff0200040001000100fafff9ff07000a000600ffffe3ff11001300fafffefff9ff060013000300c6fe440011000700
0000deffffff0400070003000d00f7ff0b000900fdff0400f1ff0100fdfffafff1fff1ff0e0020000000fdffe8ff05000d00d7ff14007bff0a00d9ff0000efff
e0ff010003000200ecffffff1500f5ffcdffbfff0f00e5ff1400fbff390009000300faff07000e00f7ff0000f4ffd1ffeaff0300f3fff3ff1500ffff0e00fbff
d3ffbcff2e000600000011ff00000600f2ff0700ffff0300fdfffffff8fff9ff0400feff1e000800ddffeeff220004000f0000000600fbff1c001500e4ffebff
ecfff2ff00000900ddff0400f7ff0c001a00e3ff0a0002000c000300270006000700fcfffbff0600feff0f000b000700280000000700fcfff5fff0fffbffe9ff
0000e1ff190009000600d3ff1400100002001f000c0009001300fcfff6ff1300000002000f00fbff0e00fcfffcff2b0003000700020000000b00f9ff9cffffff
feff0900fbff0f000800220007000c0002000300f0ff0d0005000500faffe4ff04000700060004000100efff000009000000f9ff0300040013000e000900eaff
edff06000500060000000600010007004b00faff2500feffc1ffecff0100fdff1600f8ff0f000a00e0ffe7fff1ffb7fff0ff6aff12000900f9ff0100eeff1a00
080013000700fdff130098ff1e000200f3ff13000900050003000000fefff5ff4a000c000700eefffcff2300fdfffeffffff0c000d00020028003b0007000900
08000300f9ff04000a000000000001001200040000000b00f7ff0200feffffff160001000a00180005000300f9ff04000900fbff100031000700ebff0300e8ff
e8ff060007000b00e2ff0c000e00c3ffd7ffc6ff0100fcff1700000003000b000a0000000200fbff15000900f6fff1ffedff04000300ffff1200020015000100
baffcaff2500010007000900fcff0000feff090000000300fcfff7ff0d00fcff0900f0ff06000c00cdffe7ff26000b001200ffff15000b001a002000e6ff0600
0600fffff6ff0700d9ff1200040010000f00020000000100f9ff01001b0003000b00fdff52ffffff060013001e0004000c00fbff070000000400ebffcdff0b00
00000900fbff08000300baff1100f0ff04000b00040005001500f6ffe4ff12003400f3ff07000200f7fffeff0b00300012000000ffff03000500fdff7bfffeff
fcff00000900e0ff1d00e7ffffff15000100eeff100016001300d9fffdff06000f000a00060043000c000d0008000e00ffff0400000000001200060005000800
16000800fefffefff6fff9ffffff08000300fdff0c00fbffd5fff5ff91fffcfffdfffcff0100160015000a00f0ffdcff060007001300120005002d00e4ff0d00
f8ff1900040000000d00a4ff0100ffff0d000d00fcff090004000200070007000000c8fe0600efff08000e0000000000fcff000004000000060024000000ae00
0a0004000100e5ffc5ff0000070005000e00060000000900f6ff0700feff020001000800eafff3ff1d000a000500b8fe1300f9ffeffffaff040000000a00e5ff
f1ff01000600fbffdeff0b000200ffffcbffc2ff030005001100fdff0000cdff0c0006000200e3ff06000400f2ff0800ecff060009000000d9ffc9ff13001400
0f0007001a000300fcff0500fbff040006000a0011000c001300070002000100b2ff0200d3ff0b00c9ff0d0008001a0000000600fffffeff00000b00f6fffeff
faff020008000700edff0000fdff0a00e1ff080002001b00020000001d000200010001000700f2ff0800e5ff1f000000f6fffeff0500e3ff0c00fcff0a00fbff
fdff0c00e0ffcdffffffc7ff1100ccff020001000200f6ff1900f2fff8ff1000ebfff3ff0400fbffe8fffdff0900240008000200ffff00000400f3ffb6ff0000
fcfffeffd1ff08003400fafffdff0c000400fbff0f00ecfff4ffe5fffbff0b00e3fe00000200a5feffff0f00ffff1300f6ff080001000b000d000d00fdff0800
11000200f4ff03000000f2fff2ff0d000500f7ff0200faffe6fff7ffedff0100fdfffcffffffe5ff0700fcffdfffcbff0c000200140081ff1c002500ebfffeff
1cff1600fefffeff0e00abff00000000080010000200e7ffe3ff00000b00f7ff010071ff0000f6ff00000800fbffeefff2ff0e00ecffffff04002a00f8ffe9ff
0100020000001f00b6ff0000faff000005000300fdff0800fdff2300010001000b000200b4ffecff0500cdff0a002a000800f6fff9fff5ff0f00f8ff1000e2ff
eaff2400d8ffe1ffe6ff05000900fdffcaffa5ff100001000f00f2ffffffbfff0c000900fffff3fffffffcfff2ff0900e4ff000008000100ccffd9ff0600e9ff
14000b001e000000f6fffefff6ff150002000700defe09000800f3ff0a00e9fff2ff0b00dcfff2ffd7ff020000001900e8ff03000000fbfffbff0200eeff0400
f6ff000002000400e8ff0500fbff0000d5ff0a00040034000300ffff2500feff020002000600f4ff0100b2ff0c000600e2fff4fff2ff1400fefffeff05000400
06001100e2ffd9ff0000d3fff9ffb4ffeafffaff0400fcff1000f6fffdff0b000400f3ff0500fefffbfff4ff08002300fffffffffeff0f000500f9ff97ffe5ff
eafffdffe0ffd9ff05000100fcfffffff2ffffff1b00eeff1000fafffbfffffffbff59ff01002b001500f9ff07001300fcff04000000ffff0f000f00f1ff0300
0800e4ffeaff0000f7ff03000500fcff0700f5fffdfff8ffe0fff8fffdfffbffe6fffbfff5ff090000000500edffd1ff0a00040016005bff07001200ebff0200
ffff1800d2ffffff0900aaff00000100030008009dff0400070001000700210001001600f8fff8ff00000700feffc700f8ff0f00c3fff3ffffff31000600feff
e7fffffffdff0d00f9ff0300fdfffafffaff0400f5ff4ffff6ff4600030007000500feffaeffefffe2ff6200110001000300f9fff5ffdafffffff1ff0500e8ff
e2ffd8ff2c00e0ffe2ff04001500ffffc3ff9fff1300eaff0c0001000100beff0000fefffffffdfff3fffafff1ff0500e9fffcff0500f2ff0300e3ff1900e7ff
0e00090022000400faff0100f9ff150000000c000c0007000b00fbff0300fdffdeffefffacffffffd6ff080000001400efff06000000faff00000000f4ff0300
fafffbff06001100e4ff0600ffff0000d5ff0600f5ff0e000400fbff2300feff0400000003000000fefff4ff04000500ddfff9ff18000200dffffaff0300f2ff
fffff4ffffffd0ff0600ddff0500d0ff160002000700fcff0600f4fff9fffffff7ffefff0c00fafff8fffeff0d0020000000fffff6ffd3ff0400f4ffaaffd8ff
acfffaffb0ff1000fdff0700f1ffd6ffeffff7ff1e00ebffe9fff7fff3ff1900eeff5100f7fff7ff0200000000000c00f9ff0a000100feff0b000700f3ff0000
f9ff0d00f4ff07000900f8fffbff04000b00fcff0300f2ffd3ff0e00f6fff1ff0100edfff3ff0c00fdfff7ffdaffd3ff090004000d005dfff8ff0100e6fff2ff
0d0021000300f4fffcffacfffdfffbfffdff85fef9ff0200f9ff3bff0400150002000b00f6fff4ffdcff0700f6ffe5fff3fffcffaefff7ff0700320009000e00
0900f8fff7ff1f000b00c8fffbffebff93ff0f00f5ff0a00170022000e00daff0b00f7ffa9fffaff0d00d4ff0e000d001a00f7fff1ffecff1300f5ff1e00daff
e5ff1800d0ffe6ffe2fff8ff0700ffffb6ff92ff1d00f2ff0300f7ff1000e0ffe5fffffff2fff6fffefff5ffeffffcffebff05000b002d001c00faffedffe5ff
1000030023000500efff0200ecff0b00fcff2dff0b0000000000f1ff0c00f9ffeefff9ffa0ff0d00cdff0000f9ff2800e1ff07000000feff0200f3fffdfffdff
f7fffbff0800f8ffe6ff020002001000dcff0000060007000100f5ff2000f6ff0700fbfffbfff0ffc3ff0000fdfffbffe7fff5fff1ff0800d0fff4ff07002000
110039000800f6ffe4ffe7ff0500fdffecffefffe5fffcff0e00f8ff0f000400f8ff0900f3fffaff0800d6ff06002e00f2fffafff5ff04001100faffb1ffd7ff
daff75000f0000000a001c000500f6fff5ff19000300faff0c00fefff8ff2300000078ff08000d00fffff4fffaff0b00feffeeff0f00fcff12000400ecfff3ff
0100d7fff9ff030000003a00f8ff05001500f7ff0300fbffceff6a00faff0000fffff2fffeff060005000900f5ffceff210000000a0058ff0c00f2ffe3ff0000
fbff1700e1ff01002100acfff0ff0400b3ff0b000b00000000000200fdff0a00f9ff0800f5ffe3ffe4ff0a00e2ff0300f4fffeff93ff0000f0ff3d0002001000
dfffffff060006000a000e0000000700f8ff2ffff7ff0600faff0c00090009000900f7ff0f00f9fff4ff0000fcff02000c00f9fffdff9cfff4ffefff1c00e5ff
e6ffffff0b00e5ffdfff00001900faffbdffb1ff0a00f7ff060000000f00f8ffb4fff0fff8fff5fffcff0600eefff3ffebfffcffe6ffeffe1300030000000800
0500080025000d00f3ff0200f9ff1200f4ff06000400aeff0000fcff0700fefff4fffeff05000900d5fff8ff09002a00100010000600e7ff0000c2fff9fffbff
f5ffcfff02001100e4ff01000200ddff0000e1ffeeff0e0008001cff2900f4ff0600000004000500f9ff17000000f7ff0400e9ff00000900d0ffeaff0600d8ff
fcff9afe1a0011000700e1ff02000600fdffe1ff67ff0c001100f6ffffff0b00f8fffeff2afffbff0a000000c9ff2c00f4fff4ff0200f9ff0500f5ffbbfffbff
ecfffeff2a00fdfffdff2300feff0a00ffff1300dfffffffedff0500f8ff1200f8ff0200ffff0700fefff6ff06001000ffff02000d00020012000900e6ffecff
f3fff5fff9ff0600ffff0500000002003c00f1fff5fffaffcaff300000000100f9fff9ff140002000400f9ffe5ffb2fffdff060015005bfffbfffaffeaffd9ff
00001300f9fffcffdbffa4fff5ff0400460000000000ffff0000fbfffcfff1ff060007000000dfffefff1500fafff9fff7ff1b00bcff0100030047000d000400
feff0000e3fff8ff0c000200fcffe1ff0a000a00f5fffdfff7ff00000200fcfffcfff3ff130011000100faffe8ff06000900f6ff1f001a001e00ecff0f00e6ff
e1ff0400fcfffdffe6ff07000000f3ffc9ffa5ff1100e0ff0b00fffff4ffffffe8fffaff89fff1ff14000100f1ffefffe6fffaffe1ff2d000d00ffff0a000100
0400f3ff2c000b00f7ff0700f1ff0000f5ffffff0200eaff0500f4ffe3fffaff0800f0ff0d00faffd6fff1ff100019001f0005000400ecff0d002fffe8fffaff
fbffffff10000500d6ff0300f4ff37001400fdff0c0009000e00fbff2800f4ff0b00fcff03000800d5ff0c00080004002c00f8ff00000000e2fff1ffffff3400
ffff2b003a000c00faffd7ff03000c0003003f00edff07001300efff00001200faff00000100f2ff1400fdffeffe2600f2ffffffecfffbff0300f6ffc6fffeff
02001600fbff0600000029000200110002000100f1fff7ff0b000600f3ff15000100ffff00000e000300ebfffcff0f000c0003000a00ffff0e00fbfff3ff0300
fbfffcfffcff0500feff11000200090058fff6fff0fefbffbcff0300020003001e00f9ff8400070003002f00ecffccffcffff9ff12007efffdfff8fff2fff6ff
040012000200f7ff1b00a8fff3ff020098ff00000b0004000500fcfffcff0e0012000700feffe0fffbff2200fffff9fffbff1100e5ff0500cbff430004000500
0400eeff01000100080001000a00f9ff08000200faff0100f4ff01000000fffff9fff9ff10002100f2fffcffdaff07000a00e4ff21008dfffdffdcff0700e4ff
e5ff020008000300e2ff03000c00f4ffd2ffbdff1000f2ff0900ffff2f000400070002000600f2ff0e000400efffd3ffe5ff0300d6fff6ff1000000016000000
dcffd6ff2a000a000000c3fefeff0800f6ff0000fcff0300000000003500feff0500faff13000900d1ffe8ff35001400200007000c00f8ff180003ffe1fff7ff
edfff5fffeff0700dfffeffff6ff06001600ebfff6ff0400030013002b0004000b00fcfff3ff0300f3ff0e000d0005001f00fdff030001000000e8fff5fff3ff
ffffe3ff170004000200c8ff0800070005001200110001000b000500f5ff1000010002000600f7ff0900fbffc3ff2f0003000800ffffffff0200fdff7cfffdff
fdff0c00fbff0d0002000a0005000c0001001200eeff060007000300f9ff190005000800070004000500ecffffff09000000f4ff01000500110003000600ecff
eeff020001000a0002000a00ffff0c003d00fbff1300ffffb6fff1ff0000f6ff1100faff21000b00ecff0100dfffb9fffbff2bff13000200faff0000e4ff2000
060010000900fbff030092ff37000000f8ff0d000700050002000100fffff4ff10000c000700eaff00000f00fffffbfffdff050006000100e9ff380009000900
04000500fcff04000b00feff0000fbff0e000300fdff0900f8ff0400fcfff8ff15000500070010000f000100f9ff06000d00f6ff0b002e000100ebff1200d0ff
eaff020006000500e4ff0b000400d3ffd2ffb1ff0500f4ff080000000e0000000800fdff0100deff07001200f5fff7fff1ff070002000000120002000e000400
b7ffa2ff2300030004001500f7ffeefffdff030001000500fcfffcff0c00faff0700eeffeeff1000c8fff4ff1e0015000a0003000f0005001400f0ffe5ff1500
0000fbfffaff1100e0ff090001000e00fffffeff1100fdfff2fffeff1e0004001300ffffb300000001000f001e000600fffffeff040003000500f6ffd1ff0f00
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
0400d6ffb4ffdcff0300d6ff2a00ffff020007000000f3ffeffffcfff5ffabff0300e6ff20001900fbff1600ffff230029002c001a00260050ffe0ff3dff0c00
f1ff1500f8ff000016002500efff7dff1900bdff05000e000e00e7fffaff0800260028001700e0ff4300d4ff110004002d00e1ff1b00bd000000240003001400
1700faff4400010000000a00e7ff0100f7ff1e000400edffb6ff2800e6ff0500fdff0e000d004800eeff0500cbff85ff380019002f002300fcff0000cbff0600
0400c5ff0c000300f7ffc7ff090028001c00f8ff3100f2ff27001e000600c5ff17000b00dfffdbffebff0e0000000800deff06002100efff1700f8ff0d000800
07000f00ecff020012001400faff00000d000b00f8ff0f0011000300ecff2400e2fff0ff08001e00f8ff0c000f00fffffaff09002c0045ff21001400daffe3ff
1600fbff0900c7ffcbff58ff1800d8ffeefff9ff31000a00d2fffbff99fffffffbff2000fcffa9ff2200dfffe3ffe1ffdcfffdff2c00f0ff1b0003001d000100
1a00f7fff1ffd3ff08000f000100ecff3500f4ff01002600caff14002500c800e4ffbfff62fff8ffc8ffd5ff1300a6ffffff56fff6fffaff07000f00fefff2ff
00001b000a001b00e5fffcff09000900faff2400f6fff7fff3ff06001a000100faff1400f4ffaeff060005002d00eeff2d00f2fffaff24000100f5ff0600f5ff
2500ecffe0ffe0ff3800deff2d00feff0c002b00f2ff0300ccff2700a5ffefff1800eeff1f00020000000b0019001b0001000a00e6ff0f0074ffcbffc4fff6ff
e5ff0f000b00edff0b003d00edffd2fff6ffd5ff2100eeff100004000b00f5ff0f00f9ffefffc8fff7ffe9ffc0ff0f00290007000000d2ff1600070028002700
fefffdfff3ff1100fdff2300dbff1900d9fffaff2200c0ff81ffefffedffebffecfff1ffe8ff2000d9ff2b00ccff86ff100032005a001900f1ff2a00cdfffeff
19000f00fffff3ff0600d7ff2800e3ff110001001b00ffffcdff240007001700e4ffffffebffe9ff300002001900ffff220006002000eaff1600f9ff0a000e00
0b002700dafffdffdaff18000e00ebffe4ff1f0097ff170023ff1c000c00daff0400eefff2ff14000e0024003100fdfffbffc7ff2a0048ffe0ff0900c1ffe8ff
32000e000e001f00a5ffecff100095ffe0ff03003a00e5ffe9ff08000c00f7ffdeff17001100cdff1f00e9ffd5ff53ffa6ff00000500aeff3400ddff28001300
f4ffceffc8ffcbff0f00c9ffbaffcaff2200290008001200b6ff9dff2c000600deff380081ffc7ffb7ffd5ff270042ff0d00e5ffd5ff0e000a000400eaff0f00
0400ddff1800f8ffe9ff320008000000f4ff0700f2ffc8ff14000e003d00e9ffe4ff12001d00d9ff0d00d4ff1f0024003300e3ff01001400e5ffe0ffffffe2ff
1d00dbffd3ffdbff0400e2ff1d0000001200090019001f000600e6ffe5ffdcff200016002900f9ff0900edff1d00210017000900f8ff1c00e4ffe2ffa8ffedff
d8ff19000300e2ff1f004200e9ff1bff2000fbff0100ecff1d00dafff2ff0e00060013001b00e7ff0f001b0009001d000400f3ff1d0019001d00140039001d00
2f00190000001e00f2ff2900e4ff1900eaff0d001500ddff88ff0800fcffd2ffb4fffcff0f000d00ffff1400c0ff82ff2d001d005c002900dbff2c00b5ff3f00
28000400f9ff0000f2ffdaff010004000300e8ff23000f00220018000f00f7fffeff0a00f1ffd4ff20002000f8ff08002c001a00210003001f00e4ff15000800
ddff36000e00daffdfffeeff18000e0000002600020032002b002c001d00fdff0600f4fff6ff1300f9ff0a002f00e6ff67fffaff3a0043ff0b000900deffddff
270017001700e6ffacffcdff1f00daffe3fff8ff3c00fbffddfffaff0500f5ff05001b00fbff9aff0d00f9ffebffe2ffd7ff07000d00f6ff2000e7ff2000f8ff
1b00fcffc0ffdaff1f00fdffe6fff2ffe6ff1a0013002200d4ff9cff2d004e00e2ffd5ff36ffddffaeffdcff280040ff1900cffff6ffd2fffcff0f0000001900
020005001200ebffdaff0000f2ff2b00f2ff1d00fcffcdffffff06004800e9ffc4ff17001000c0ff0e0000000e00260001001800eeff2a00e5ff24000500d5ff
1400ceffebffedff3000dcff1c00090009001f001500060004002500ebffdfff250023002200edff2a00eeff140017001000f1ff1c000000f3ffdbffb3ffe9ff
e4ff0d000000f1ff1b004600dcff1800f8fff5ff0800e0ff1a00e7ffd3ff1f00ffff32001100efff15001f000a0014001300ffff0a00d7ff2100f7ff2c001d00
1e000f00f4ff0b00e3ff0000d6ff0d00e2ff3b000800afff94fffeffefffd3ffd4ffe5ff0000faff1a001b00bfff86ff08001a005e001b00deff2500c1ff0600
1a000d00dcff2500fdffd8ff0200fbff0a00000014001e00f9fff4ff2d00f2ffe3ff07000f00d5ffeeff14007100feff1000100026000e001f00e7ff20000e00
feff20000800ddffdfffeffffaff210017002100d7ff2700170019000500edff0e000700f2ff190019001e002f00fcff3bffe4ff2e003aff00000d00a6ffe1ff
2f00fcff12001500a3ffcafff4ff0000dbfff9ff3f00edffe7fff7ff0a00f0ff0d0019001900b6ffe5ff0100fbff0600c1fff1fff1ffecff1c00e4ff00000900
1100f4ffb9ffe7ff0700f3ff0000e8ff12003200fcff2900d3ff08001300f5ffe0ff230094ff0700b4ff1b0014003eff2d00dbffecff1d000c00020001002000
f1fff9ff1f00feffd4ff0c00f5ff1400fafff7ff0800e1fff2fff3ff4500f9ffffff02000a00aaff1400e3ff1e0010002400060017001800d8fff9ff0f00e2ff
f7ffcdffefffddff0700e5ff0f0007001a002000150016000e00cfffc0ffdcff210032001f00c9ff0600f2ff150021000b001000000016000c00e9ffaaffedff
dfff0c00f7ff0c001b004d00e1fff5ff1900e7ff1b000a000f00f1fff9ff08000b00feff6300e2ff11000600daff24001400aeff16008000170018002e000700
f3ff1d00020005001f000b00e9ff1d00f5ff0300030005007fff1700e9ffe5ff1200effff1ff0a00deff1700c4ff72ff29002f005400270000003300b1ffc4ff
1f00fdff010025000900d0ff0b001b000000e4ff01000b001a0016001500fdfffeff0b00f7ffd8ff1000170028001500280009001800faff1e00edff0d000300
e7ff13002100ceffeeff0a00ddff190003003000ffff1a0026001a001000e5ff1000e3fff8ff1b00f5ff18003500e9ff2fff120026003eff01001f00cbffdfff
2c00eeff0f00ddffb1ffe9ff2e00fbffdaff00003f00f0ffe0ffe6ff1400eefffeff24001900a6ff09002600f9ff1300c6ff0900fdffe1ff2000e3ff0500ffff
0500eeffbbffe5fff3ff12003000f2ff0e002000fbff0d00dcffe3ff1500fcfff3ffe1ff71ff1400adff0a001b00c0ff2c00e1ffeefff2ff0a0012000a00f3ff
f6ff1e0000000500d4ff0a00eeff1b000300f9fff1ffe2ff32000d005800f2ffebff10000800c6ff0d00110018002a00170001000e000b00d0ff16001e00ceff
1900c5ffdffff2ff1800dbff17001600310029001d000a00f2ff3200abffd3ff100039003700fbff4e00190019001d0017000800190028003d00dfffaaffe6ff
d3ff1a00fdfff7ff29004800dbffefffe9ffe9ffffff08001a00d8ff0900fcff08002b00e5ffe6ff5f00edffceff0200120016000d00a1ff280009003b00ffff
09000800f9ff1f00e9fffdffcfff1600e7ff0a001600f4ff8ffffeffd7ffc3fffefff2ff2400f1fff0ff0900c1ff8dfffbff4c0054002c00d5ff3500b4ff1f00
31000c00eeff17000900e2ff23001f000200010005001400e4ff2000f8ff07000e001700f8ffc5fff3ff18006700e8ff0500f8ff2d0007000d00e1ff0c000000
fdff0f00ddff0100efff05003800f9ff1900320009002e000500fbfffeffc9ff1800fefff3ff17001a0004002700e1ffd6fff8ff300039fff9ff3e00d8ffe7ff
2600f9ff0500d8ffb2ffccff1000faffd8ff05004100d7ffddffeafffeffe9ff020011001400afff1a00150017000f00c6ff04002400e6ff3900edff19000f00
f3ffe6ffb8ffd1ff170011000300f7ff4200150000001700e7fff6ff0d000b0001000e005effdcffb6ff0300290079ff1b00d2ff030013000f000d00f8ff1700
5d0006000d000000dcff120000001a0008000b000800c8fff3ffffff3600e7ff0b000b00e6ffa1ff1b000300190010000f00a3ff0800e0fff3ff1e0033001a00
1a00e8ffe8ff03001f00e8ff22001c000800f0ff16000c00bcfff4ffcfffd9ff17003100150031ff1400f0ff08001700ffff5a00dfff41002b00c3ffd9fff9ff
e1ff1100dcfffeff20003f00dbffebff0f00d3ffffff0a000900fdff000008000a002700e8ffd2ff1a00f8ff94ff0f000000e1ff00000e001200000039001300
d9ff0e00fefff0ffd7ff0200f4fff5ffcdfff2ff0500ebff82ff0a00ebffeafff4ff0b001f00ffffd9ff1800b6ff7dff2000150057002500f3ff2d00c0ff1c00
1b001400edff2500f0ffcaff2100b9fffcff140004000a00f1ff0f001900d4fffdff1200e8ffbdff12000c000400f7ff17000b0019001b00e3ffe7ff1f000f00
0200fcff2700d2fff4fffbff41001c00000018002f001a000c00e1ff1700e0ff1c00e4fff7ff1200210010003200efffdbff0c003e0047fffdff3d0088ffefff
3500feff1500ebffa0ffcfff37000f00daff08003000ddffe1ffebff0100ecff140006000600abff18000e000600feffaefff1ff0300e3ff1d00e8ff22001a00
1d00d1ffc6fff7ff96ff2d002d00edffe9ff3b000c001f00d4ff0c0006000a00e7fff4ff5affc9ffb7fffdff2400fcfe2900d2fffcffbaff02001c0002000800
0a00e7ffffff0000d8ff1500fcffedff0e00f9ff0400d4ff2000fcff3700f5ff0300faff0f00dfff12000b00f7ff1700f8fffbff0e001d00e6ff050031000100
fbffbdff0700feff3000dafff1ff1c00f1ff1f001d000b00bdfff6ffebffa1ff00001f0005002e00f5ff1b00fcffffff0e0055001e0032003f00d3ffa0ffdfff
dbff1000eaff09000c002c00dfff000023000f002300eaff0d00c7ff4500dcff16002800bdffa3ff2e00ecffe9ff01000f00f2ff100008000f0003001a00f4ff
fffffaffcfff1800e1ff0f00ccff0900d3ff1000defff7ffc4ff0100cffff4fffeff18001b001d00c5ff1900c5ff77ff260049003300fdffecff0d00c7ff3600
1c00e9ff020025000100bdfff8ff2000ddff0e001b0050000000ffff0c00f0ff0f000e00e3ffacff1400e4fff2fff9ff00001e00160009000800130013000400
02000000ffff00000300e9ff40000a001b00faffa8ff0a001500e9ffddff10000f001100f4ff63ff08001000eeffd9ff0700200029003dff04004e00a6ffe9ff
220007001f00e3ffd0ffbdff17002100e9ffe3ff27000100dbff0e00f3fff0ff1b0003000900e3ffeeff27001700dcffd1ffeaff2300f2ff2500f9ffe8ff2400
1700f1ffecff3cffb9ff26000700beff2a001e001a001800edff0a001a00f9fff7fff4ff9bffd5ffc9ffd5ff3700c6ff1900d9ffd9ff1d0000000e00edff0e00
a9000a001c00ceffd1ff2500ddfff1ff0c0000000300e2ffaaff04000b001600faff1400d4ffe1ff0200000000000c00eeff0d0042001d0002001b004b001800
2800edffdcffcaff0500ceff22000b00f7ff130019002b0006000d00160006001d00f5ff1b00e2ff1900130017001b0010002100fcff0f00afffdcff99ff1400
d9ff1c00fcfff0ff0a004100eeffeaff1300d2ff070000001f00e7ff04000c00150008000800e2ffe7ffe9ff1800110033002a000d0007001e00180030002100
10000000feff31000100fcff16002f000000320016008dff99fffaffeeffcdffe3fffdff070027000a002200d4ff66ff160008004c00300010000500b7fff0ff
2400f8ff0000ecfff9ffd8ff130019000200ebff0d0021007a0005005e00e7ffd9fffcffe1ffdbff24001700dbff0200fcff1d001900ffff1b00efff0000faff
10000e00f4ffe4ffe8fffaff1f000a0029001b00fbff20004f0029000600ebfffcff1400e5ff1100e1ff3200270005000900d1ff2700d5ff1000fcfff3ffe4ff
3a0015000000beffb3ffe5ff2000f0ffd4ff06003500f8ffe7ff04001300fbfffbff13001800ceff0500d5ff0300ecffb6fffaff2600e1ff1f00e0ff17000e00
2400fbffc3ffdcfffefffbfff1fffcff23001300f4ff2400cfff0e003200e6ffc8ffdbff54ffcfffaaff06001900e5ff0a009dfff5fff1fffdff1100ebff0800
dffff5ff20001800d0fffdffeaff2200e4ff1f00fdffd2fffcff18004b00e2ff000008000e00c6ff08002b000c001700200006002a002400f4fff6ff0800d9ff
1100f2ffe8ffc5ff0a00d4ff13000000110010002000d0ff38000f00e0fff6ff1400f6ff1700eaffeafffaff1a001400f0ff0d00fafff8ffccffd8ff9afffaff
ddff1c000300d9ff11004100ebffffff1100d3ff0900e8ff2800ecfff3ff2000f7ff03000c00deff0100f8ff0c001d002000010018000c001b001a0030000600
4a00230020001100f4fff5ffe3ffe3fff6fff4ff01000e0093ff0700fdffdbffbdfffcff1800080017002000c7ff74ff0d000e0050002200e0ff1000beff0700
1b00ffff0600fefff4ffd3ff030019000700fdff0e001c0005000c001f000400eaff0300deffdaff0500110001000d00e1ff2500270048001e00f6ff0c00fcff
f8ff28000700dcffeafff3ff13001a0013001500f5ff1c0018002d000f0007000000f7ffecff1a00e2ff19003200ffff8fffe3ff2b0041ff000004001000e1ff
2f00000011002500bbffd8ff0800f4ffe0ffffff3a00edffdaffe5ff0600000003000f000400bdff0f00eaff0200e7ffadffb4ff2600ccff1100ddff02000c00
1700faffc8ffd2fff0ff1c001600faff1500190003002100dbff190016000400edff01007dff0800aefff6ff2300d6ff2500c3fffeff060004000800dfff1800
f7ff08001b000000dcff230008000e00e8ff1d000e00e2ff0f001d005500eefff5ff09000300c2fffeff03000d002d0010000000a5ff1900dfff0800faffd1ff
1a00deffebffebff2b00dfff0300000010000f0018001e001200c1ffe9ffe5ff14000300120008001100080018001e0008003000fcff5c00e0ffd8ffa6fffdff
d6ff1f00f7fff9fffcff4a00e7ffc3ff0b00e2ff1200ffff2700fdfffcff09001a0016001a00eaff1e00e2ff270016001500eaff2500bb001400230034000d00
1900e8ff050001001e00eeff2e002c00efff1b001200120082ff2400ffffd3ff120001000600e7ffd6ff1800c9ff6cff07001f0051002f00efff2500b8ffd5ff
1700fbfffdff0b00f3ffd1ff1f0015000e00deff1b000300470007003100f1ffedff0500e9ffd9ff2e00f9ff75001f00ecff0a001d000a001000ecff0d000d00
d1ff1500fbff0700deffe8fff1ff12001e002500f8ff1c002300070013002700f3ff0f00e9ff1a00240029002700fcffd4ffe9ff230041ff16000700fbffe5ff
3a0011001300d5ffb4ffd7ff1600f2ffe6ff05003d000700e4fffdff0700f6ff020013000c00a5ff1a00f3fffdff0500b9ff06001f00e7ff1400dcff1300d2ff
1900f9ffc3ffe2fff6ff09000b0007002d00100002000200d3ffeaff2600ebffe9ffbaff75ffd7ffaefffeff2700e6ff1600eefff6fff5ff0700040008000000
edff0b001c001900d7ff0a00faff1e00fcff0d000600fcff0b00190055000400f3ff17000600baff15000e001100200016000d0020001600e6fffaff1800d2ff
fefffdffedffdaff2b00dfff1f000000150014001400f9ff13000900a0ffddff1b001c002000ffff2500560015001800f6ffaffff6ff1800f2ffdeff9ffff4ff
d9ff1d00e8ffecff30005500e4ff0c000900fcff0a0028001000f4ff0b000200faff2300eafff1ff00001700d0ff25000f00ebff2300f3ff1f003e002e000a00
4c00130020001d00e9ff1500ebfffbffedff000011000c0065fffbffe3ffdefffdffedff07000300c8ff2100c3ff65ff1c001a0053002f00e6ff2f00bdff0000
28001400060026000200d6ff2b002700ffffeaff1800ddfffefffcff0f000200000004000f00d9fff2ff0e001200fcff130018001a00fdff0f00eaff1a000f00
f8ff2800effff7ffe1fff1ff1b00fcff22001300120024001c0011000300fbff0d00fdfff5ff1d00b2ff1b002800f4ffe5fe100025003bff07002100f2ffd8ff
330007000700f0ffb7ffddff1200f1ffdbff06004600fbffe2ff0e000b00f8ff100013000600b3ff1700140005000500baffedff0800e4ff1500e1ff18000c00
0f00edffb8ffc5ffddff1200200008002200260008002800d7ff0b0028005600effff1ff61ffbdffa5ff00001f00ffff2300ebff070002000d000d00faff1100
0c000c001700feffd3ffeefff6fff2ff03000f00fdfff2ff03000f005d00f6fffffffeff1200d9ff0100f4ff110018000600e3ffe3ff1b00b9ff20001e00f1ff
1400eaffedffdaff1600e1ff0c00feff0e00050025001000edff0000edffd9ff190022001a000c004b00280014001c00fdff010011005c000200e1ffa8fff3ff
d2ff1e000a00faff16004f00dbffe1ff0700feff0800d3ff1700f0fff5ff0400040007001200eeff2e00dcff11001700280019001d00f5ff2300390029001800
1c00fcff0a000c00ebff2400deff2700f2ff27000e00aeff73fffbfff1ffe0ffd5ffd3ff0e000700ebff2100bfff54ff130022004f002f00f1ff1e00bbff1a00
2e000e00030018000700d5ff18002800ffffecffffff2200f8ff06002f00defffbff01000100d0ff260016001300feff00001c0018000e001100dbff17000e00
f3ff28006100d7ffe7ffe0ff09001000160018001a001a003a001c000f0021001700e5fff0ff1c00080016002600fbfffdfff9ff2f0042ff1e001f007fffe3ff
330007000500cfffafffd5ff24001700d8ff00003f00d5ffe8fff7ffd9fff2ff0a0017001100bdff1d00170000001300c0ff09001900e3ff1600e6ff2200e8ff
1200f2ffc1ffe9fff4ff0a00e4ff0a001c001c00f4ff0200defff2ff0700f4fff2ff140076ff92ffa3ffeaff1700e4ff2b00defffeff05000800100005001600
6a00e5ff18001b00d8ff0a00feffedff0700dbffedffecff04000e0055000400f5fffdff0a00c8ff16000c00feff1c00feff040012000200e1fff3ff2400f5ff
0800cbfff1fff3ff0b00daff0f000b000e000e000d001500fcfff6fff5ffd1ff1100290025000500380053000b001d00ffff2400570011001d00deff9cfff4ff
d9ff18000200f2ff0f005000e2fff0ff060003000b00d9ff0f00eeff3100eeff0f001500d4ffe0ff0b000600ecff1c000b00f8ff0e00fbff190004003400fcff
14001500f4ff0e00fafffbfff4ff1100eefffcfffdfffcff81ff0500deffe0ffdfffe7ff07000a002d004800c6ff4cff2f002e004b002b00f4ff2200c2ff3900
270023000000f7ff1300ceff1600220000000b001200090004000d001f000e00fbff0900eaffccfffbff170005000a00f7ff2a0014000d002000ebff00000a00
020035000d00c8ffe7ffeaff2900ecff04000e0002001e002b0018000a00fcff1b002400feff1100fcff13002700f7ffc5ff1100210038ff02002500baffe5ff
3e000f000a000600afffdeff0e001100e0ff03003c00d3ffd8fffefffbffecff140011001200baff1300160005002200c3ffa1ff0e00d5ff3000eafff7ff0e00
feffe8ffc5ffe7fff0ff12002400f1ff2b002a000b001300deff07002400f6ff030000005fff0400affff0ff0c00e5ff2600d0ff06002a0009000000feffe9ff
edff0a001c00feffd1ffefff0b00f3ff0b001e001000b9fffbff11005600fffff6ffffff0a00a6fffbff070001001b0003002f0021002200d7ff0c001b00dfff
1900edfff0fffbff2100d6ff13001200090021001c001c000f008cfff7ffe3ff1f002400180000004f00fcff02002800f8ff5c00ffff1a001c00e1ffa1fff4ff
dbff1800ebff080017004700daffffff1300e3ff0800f6ff1600ebfffaff180016001d004400ecff0b000f001f000d001700e2ff160042001a00040033001600
03002500fcff0f001200faffceff1300e2ff1800f7fff3ff79ff1900ceffd3ff1100000011001e00d1ff1f00c6ff4dff29001f004d002f00f1ff2a00a8ffe0ff
2b0010000b0020001000d3ff08000e00faffe7ff0c001400f7ff01000200f0ff0b00090016ffcbff030016007c000e00ecff01001d0004000600eafffaff0400
220040006600daffe0ffecff580016000d001800d0ff2c001c0005001100ebff0b004e0000001e00eefff7ff3400faff0b000700240039ff0e002400edffe3ff
340005000a00feffbcffd1ff1e00e1ffd8ff09003c00e6ffdaffefff0200e9ff09000f000f00b7ff1200f8ff08000f00bafff2ff1900e7ff2400e3ff0a000a00
0f00f9ffc6ffcdff36000d00e2ffebff15002f0015000200f1ff12001000edfff6fffeff81fff7ffb0ffd0ff1200dfff3200cdfff2ff02000a001500f2ff1c00
130010000f001000d9ff1600140001000e00c1ff0500dfff39000f005300fcfffdfffdff0000b0fffdff090004001a00080015001b001000e9ff20002700f9ff
0500d7ff040007001700d0ff0e0018000700200021000a001b00e9ffe3ffd9ff090039001b00efff0e00ffff08001e00f8ffefff740020004700e9ff32fff2ff
e6ff1b00f8ff040022004a00d4ff0e001500f5ff0e004a001600e4ff02001b001b002b00d7ffebfffcff2a002bff1e001100f1ff1b0016001200120031002200
ebff0c00090009000c001600ccff2500d2ffedffffff08009dff0100cfffe3ff180000000a002800d9ff0700b8ff7aff2f0026003f001a00e3ff1e00bbfff7ff
1b00fcffffff1d00ffffd5ff1a002700fefffdff1b001700f1ff0700feff090005001500edff53ffceff0c00eefffcff030009002600faff1200eefffbff1100
f5ff1f00e1fff5fffdff0000010020001a00080002002300fcfffcff0f00110021004e0009001e00ecff0d003100feff3000080027003fff0e004100f2ffecff
340026001800d3ffc1ffbffff7fffcffddff03003a001500deffeeff0a00eaff0d001c000d00c7ff0e002a0004002c00ccff1e00cdffefff2d00e6ff1e000500
0b00eaffc8ffcffff0ff19004f00d3ff1d0038001c002a00efff1a001d00f8ffedff030090ffd4ffbcff24000e00f1ff21009fffe8ff18000f000a00e6ff1600
faff1d0008002000e0ff0000ffff0e00140005000f00ecff280009005300f4fffdff11001200cefff4fff6ff05002500170018001e001f00e8ff0f002f00feff
2000e8ffe6ffe2ff1200d8ff1500efff1a000500030015000200dbffcbfff6ff2000dbff1800effff3ff0c0015001400e8ff0300f2ff1b009affdeff91fffdff
dbff1700ebff03000f003c00e4fff8ffe3ffd1ff20000a000b003a00fcff0900080003000800e6ff2b00070028001e001700f7ff19005d001f001d0028000f00
faff090018000900eefff5ffeaff0400f8ff05001a00fbff2ffff6ffe0ffdfff2b00f6ff0e002200d8ff1600c2ff6eff090014004e001f000c001700bfffe4ff
2400e6ff2000feff0500dcff1a00feff0e00feff0a000f00f2fffbff1400ebffdcfffdffeaffdeff2e003000fffffaff26000f0019000c001e00f6ffffff0600
00001b00f3ffffffd1ff0000120019002000120006002100f8ff20000000fdfffeff1300e2ff0e00e7ff240038000c002100e8ff1700f5ff090005000700e3ff
3a000a001b000b00b8fff6ff1500dbffe1ff05003b00faffd4ff0c000b000200010000000300c4ff2900d0fff7ffe0ffb7ff08002100daff0000d4ff23000b00
2200f0ffc2ffe9ffe2fffdfff9ff01002700230000001800cbffd5ff0b000600b9fffdff8dfffaffb6fff1ff2400f2ff24000500f4fff9ff03000800d1fff4ff
eaffffff14000800dcff1000fbff0200e7ff12000c00dbff000017005700efffe6fff6ff0f00f2ffe8ffbdff000029001200f6ff48ff1200e4fff7ff1300f0ff
0a00e8ffe8ffbeff2500daff0b00f8ff0b0003000e000d000600edffbafff8ff1c00f7ff0500e9ff2300100018001000feff0500eeff6000dbffd4ff7fffecff
c7ff1800effffcff1a004700e6ff02005b00ceff0b001d001c00f8ff03000800fbff21001200e1ff1900290014001c001100faff17000b00230011002a001b00
2b00d2ff0a000e000000c7ffe6fffeffecfffbff100007005fff06000200dfffd5fffbff1400fbfff0ff0e00c8ff44ff0700180045002100deff2000c1ff1800
1300f6fffaff1300f6ffd1ff1f0020001b00e7ff0600ffff0e000e00edffe6ffedfff1ff0000d9ff22001b00e9fff3ff21000f001a0010000a00fdff1600fcff
d0ff19000000d8ffdaff000022000b0015001c00f3ff23003d0019001900240005000b00d5ff1700e3ff01002f00ffffe2ffe2ff17009dff120013000f00dfff
3a001800e0ffcfffa4ffc5ff1b00e8ffdeff05004300e7ffd8ffdcff0b00fdff0b002000f7ffc4ff4c00e0fffdfff6ffb3ffe4ff2800e9ff0500dfff1400f7ff
1d00faffc4ffd7ffeefffeff00000000170013000b002700d9fffaff11005600edffc9ff65ffa5ffa0ffe0ff1d0009001300ebfff5fffcff07001100ecff0800
0000f7ff13000a00ddff0a00f6ff0e00f4ff1000f7ff060011000d005e00feffe9ff0b000300dcff10000e00020027000a00fcff0b003000d7ffedff0f00f2ff
2700f6ffecffe1ff2300d9ff1000f3ffe9ff0d000f001f000600f0ffe2fff7ff130016001c00f9ff17004b000c001c00f6ff0d0006001000ecffdbff90ff0f00
cbff1e00f5ff030017004900e1ff2600f7ffd8ff1000d4ff11001300f0ff0b00010004000a00f2ff4200f7ff1700200015000e001b00f5ff240010002f001800
19000b001b00f3ff09001300eaff1000efff27000700eeff76ff18000100d3ffe2fffbff0800f2ffeeff1500c6ff4eff11001c004e0031000a002400baff2700
21000600010002000a00d0ff13002500f7ffefff11000900eeff05002300ddfff0ffffffe8ffd9ff18003f000200feff110013001900f4ff0f00f4ff16001200
0e0020000900f0ffe8ff01001700000016000e00ffff0d000c0020001000060008000300d9ff1500150008002b00feff2200f2ff23003fff0b00fdffe1ffdaff
3100030001000700baffe2ff0400fdffe3ff04003b00e3ffe0ff04000800fcff00002b000a00ccff2c00effffbfffcffb7ff14001d00e2fffeffdbff1600f9ff
2200f6ffc5ffd3fff4fff6fff1ff0f0014002500fdff1500d4ffe2ff1f00efffdeff520079ffb6ffabffebff2400f1ff1600d7fffaff03000a00feffecff0000
0a00e5ff0c000000d8ff0800f4ff1300f8ff06000d00defff4ff22006200feffebff0b001500d5ff0300fbff01001400120003001100edffcdfffeff12000100
e3fffdfff5ffdfff0a00d9ff0500fcfffeff1200170014001e00e6fff6fff0ff040016000600e6ff1a00f7ff0c001b00faff1c0011001d00f4ffdcff8dffffff
c4ff1a00feffe8ff08005100efff03003400f1ff0900eeff1000e6ffebff0500f9ff09001f00f0ff03000700180020001100e5ff19000300240001002d000b00
2800090007000e00f0ffd9ff0c001700f4ff3400ffff020064ff0f00f6ffd5ffbcfff9ff04000f00fcff3200c2ff14ff1f0017004b003300f1ff1000b6ff1600
1600f3ff00000800f7ffd8ff0c001e000200e5ff0b00fcff2d00bdff1000e6fffeff0200d5ffd5ff0000fdff0500fdff030018001600f4ff1d00f1ff1f001000
feff1e004600b7fff6ffe8ff0000100017001800f6ff200082001e0000000f0019001d00e5ff1d00c1ff17002400fdffdafee7ff250037ff0f000700f7ffe1ff
37000600d5fffbffb5ffd3ff0f00eaffdcff01004500e5ffe1ff02000c00fbfff7ff24000800cbff2c000e00ffff0600adff25000e00ebff0900daff0700f2ff
0a00f8ffc1ffe1fff7ff090016001800050006000f000000d8ff0d001600f3ffeeffdbff5aff0000a6fffbff1c0001001c00e0fffbff05000d000a00fdff1800
e9ff3a0017000e00d6ff2b00000002000000ccfffbffe0ff0d000c006400fbfff4fff1ff1500cbff07000e0004000e000f00050007000000bbff03001400eaff
0900e8fff4ffdbff0e00e1ff15001400f5ff05000f00f1fffeffdfffcaffddff0100230022000e002a0004000c001f00ffff23003d00f4ff0b00ddff95ffffff
d0ff2000f1fff9ff1e005600e8ffecfff4fff9ff050013000000f6ff5600f7ff0d000f004600e1ff0d000d00380025001b00e6ff16005500270007002600feff
fdff00001d000c00edfff4fff9ff2400f0ff2300fefff8ff8fff0800f2ffd9fff6fff4fffcff0b00d0ff1a00ccff28ff1f00310048003200ecff1900b4ff9cff
25000a00faff0d000300ddff26002900ecff03000a001d00050007000b00eafff8ff0500eeffd4ff000018006a000000fcfff5ff190009001700f8ff24000f00
0d001b000c00effff0ff0200f7ff0400190004000300140011000c000d00e7ff1400e3fff2ff2000f3ff1c0020000000120010001e003cfff8ff1500faffdfff
330008002000fcffbdffd6ff1900f7ffdaff04004800f8ffe4fffffffbfff0fff5ff2100f8ffabff0900180002001900b5fffbfffaffe3ff2000dfff0e000900
0100f9ffc1ffd7ffe4ff11001e00150022001e0000000900e6ff0d002f00f4ff0600f9ff69fffdffaefff7ff2600afff1b00d3fffdff100009000800ffff2500
000013000b000a00d0ff0300fdff02000d0002000800d4ff0f000f0062000600f0ff07000a00b2ff0300f4ff090019000c0022000000ffffc0ff14002200fcff
deffe9ff0300edff2b00dbff0d00ffff0e000f001a0000000800d6ffd0ffe1ff0a002c00fdfffeff1f000d000400300008000e00fdff3f001900e1ff7bffd8ff
cdff1b001100040017005400efffebfff7ffe4ff00000b000c00f0ff0a000d0003001a00edfffcff0e000d0012ff1f000e0008001600000029001a002f000300
0c00f9fff0ff0e000800f1ffe4ff1e00fdfff2ff0f00080076ff0d00d8ffdaff1200f7ff00000b00d2ff1600c0ff02ff14003c0045003c00faff1d00baffe4ff
1a00030000001f00e2ffd4ff19002f00fdffe1ff0e001000ffff1e000e00f4ff17000a00eaffd0ff04000f001700f8ff1000f6ff160003000800eaff05000d00
ccff1b000700d1fffbfffdffceff140014001600f6ff14002300150013001c000d001100feff1400030018001800faffdeff1600320038ff0a002e00e6ffe2ff
370013001100d0ffabffc7ff24000900d8ff01003e00ecffe2fffbfffefff3ffe6ff10000f00beff27001300fbff1f00b5ffe8ffe8ffddff2100e2ff11001200
0600eaffc2ffd9ffeeff1900120000002c001a001300f6ffe4ff16000a000400fcffe1ff56ffcbffa8ff0c0010000b002500d3ff0100a9ff0f000a0005000000
080045000b000600dbff1d001500f1ff170000000700e1ff2c0002006000faffffff15000200dbff0800030007001d000900000011000b00d1fffeff2400c8ff
1a00f9ffebffe1ff1e00dcff14000b001200110005001b0005000000daffe5ff06002e00220010002e005f00feff20000600f7ff1b001e001c00dfff95ff0600
d6ff1f000500f8ff1f005600e6ff0200feff00000800f7fffbfff8ff2100f2ff0e000f00d7ffe9ff0d00f8ff21001e000d00fdff1c0001002000eeff3300f5ff
e8ff1000edff1100e6fffdffd6ff1500e9fff5ff0000f7ff92ffecffd7ffdefffbffefff05001600bdff2900c4ff27ff30000f0045002e00dcff1c00beff1f00
1b001700040012001900cfff12002800fffff7ff11001400f1ff00000200f2ff12000a000400cbfff4ffffff0700fefffaff1900170002002200f1ff12000d00
040018001800e7fff5fff2ff5e00c2ff130005000100170008000a000d00ebff1a00affffbff1900b7ff08001900faff2800000013003cff04002200deffe1ff
3d0005000300dbffbeffd3ff04001400dbff02004100f1ffdcfff4ff0b00f3fffeff10001600bbff08000e00ffff0800bafffdffcaffddff2100e6ff34001a00
f4ffe8ffc0ffe9ff1700f3ff1800f3ff2400290008002500e6ff10002a000500f7ff080066ff91ffacff10001c00f2ff2700d3ff0c00320009000c0003000400
3f00fdff05001400d3ff00000900feff18000800f8ffd2ffdbff12005d000600080004000300cdff0e001700f9ff17000300230027000500d4ff02000f000000
1e00f8fffbfffcff4200d9ff1a000a000d001900200002001500e3ff0f00efff0b0029000700ccff10000800fcff190001000d00f7ff1f001f00e3ff98fff1ff
deff1c000a00f8ff14004c00d6fff2fffcfffbff0c00d4ff1400f0fff1ff0b0015001e000b00e9ff07001b0001001500f8ff0e001900c3ff1b00020039001a00
10001d00e3ff0800f5ff1100e4ff2100fdfff7ffeffffcff74fffbffe3ffe0fff5fff5ff05001200f8ff0800c9ff46ff1b001c004a002a0008001300b9ff3500
15000a000b001d00fbffcbff21002f00f1ff060013001100fcff00000f0007001e001200efffc7ffe9fff0fff3fff4fffaff2700160004001900edff15001300
0b00e2ff7800c9fff9fffafffdff260005001300ffff250014000e00fafff6ff26004b00fbff1b0009001d001f0004001300ffff20003bff13002600a4ffe4ff
3b0004001200eaffa9ffcaff0000fdffd6ff04003900ddffdcfff3ff0800f5ff15000d001400d6ff03002a0007001800b7fff8ff0a00ddff2d00e5fff5ff2100
0900f2ffc7fff2ff260022001b00fcff290016000d002200deff05000900e9ffeaff17006bffd8ffa6ffebff0b0007002c00c0ffdfff2f000b00fffff4ff4800
1000f3ff24000d00dbff09000e00f3ff1700a0fff9ffe4ff280008004b00f6fff4ff0000ffffc7ff13000d00feff17000100fcff1700fbffebff17001000cdff
1a000500e2ffd1ff1900d5ff1200eaff05001a00070004000900ffffe7ff0d000600dfff1f00e7fff3fffdff16001900f6fff8fff8fffcffc9ffdbff8afff6ff
ceff1700f9ffedff0f004200dfff1f005d00c1ff1200ceff1500fcffefff1c0007000100050005000300170012001e001a00ffff1300e5ff2700faff30001300
1c00060008000900f4ffd2ffeeff8afffeff0a000700bdff57fffdffe6ffd5ffe7fff6fffaff280000000d00d5ff32ff0a00060047002300dcff0700c4ff1500
1400f3ff0900f6ff0400d7ff0d0010000800fbff080006000000faff1d00deffe9fff3ffeeffdffff9ff2300f9ff01000f001500150014001200f5ff09000000
0b0016000100d3ffd0ff01000e000b0008000f00faff0100f4ff340000000c00f9ff0300b7ff170002001e002f0003001e00e3ff170040fffbfff5ff1d00dbff
3800eeffc3ff0d00a9ffd6ff0000d8ffd8ff010033000a00d9ff140014000300050016000a00c8fffeffd1fff7fff2ffa9fffbff1e00efff0300d3ff1f002600
1d000300c3ffccffecfffaffebff0a001c001a0013002000e0fffcff0d002600f7fff9ff55fffbffa2ff0e001e0016000e00f3fff2ff0000ffff0c00defffdff
f0ff090026000200daff2000f3ff0c00f1ff09001200d2ffe7ff07005700ecffefff03000700e4ff0600f5ff02002e001600fcff14000f00e6fffeff1000ecff
0e00f6ffe1ffd7ff1000d4ff1100e4fff3ff12000e0017000d00feff040002000400f5ff2000eeff0000fdff10001b00f1ff100001001200f0ffe1ff86ff0100
beff1800f1ff0f0008004900e9ff09000e00fbff0900e9ff0900f2fff8ff1700010007000600f3ffc8fffdff26001c000f00090017006600250026002d000c00
080012000e00fdfff5ffd5ff62002d00f2ff0b0002000a005aff0c00f8ffd3fffefffcff0200ebffe5ff0b00c9fff9fe1a0007004600360029001000b8ffeeff
0000f5ffeefff8ff0d00d6ff180021000400e3ff00000900940002002700eaffe2ffe6ffe2ffd8ff0e000b001000fbff13002e001b0006001c00f7fffbff0800
f1ff0f000800ecffd7fffbff0400060010001400f2ff0e001f0023001200f9ff02000800c0ff1100deff220030000b00c8ffdfff220041ff0f00f2ff0300dfff
3d0024000300caffb5ffdaff1900eaffd6fffbff40000200e8ff0b000f000000feff25000d00bcff1700d6ff0000f4ffa9ffcbff1d00f1ff0500ddff11000300
1d00fcffc6ffe4fff3ff0000090021001d00110004001e00e9fff7ff0800cdfff3ffcaff43fffcffa8ff0300170002000600c3fff3fffbff0b000900eafffbff
fcff100018000800e1ff0000e6ff0f00f7ff0e000a00edffffff08005b00f2fff4ff0f000500ccff10002000000019001200fdff1d00efffe0fffbff0200ffff
f5fff5ffe7ffe2ff2600d8ff0000f0ff12000e000900f2ff1700f1ffbffffdff0e0000000c00fbff020009000c001c00fdffffff08000500e8ffdaff82fffbff
bbff1b00ebfffaff0a004b00e6ff2800f6ffd5ff0f000e000e000700feff1100f4ffe2ff0e00faff2600030010001f000e002c001400f0ff2200040028000400
27001f004c000e00eaffc9ffeeff99fff2fff3ff0500120051fffbff0300d8ff0a00000000000000c6ff1400c6ff0dff1000110048003100efff1700bdffe2ff
0d00060018000b000500e1ff17001f000800060001000b00fcff0a00fdffeffff1fff3ffebffd7ff0400130046000300060018001a0016001500fdff1a000a00
04001500f4fff2ffeeffecfffaff1b00f6ff0900f5fffefff7ff1b001600feff09000e00cfff1b00c3ff12002b000900f8ffecff120042ff000004001b00e4ff
350003000a002a00b3ffecff0e00e9ffddff01004200e6ffe7ff13000f00fffffdff1b00ebffd2ff1300ebfffffff3ffa6ffd9ff1400f0fff5ffd7ff1300f0ff
1900eeffc5ffdefff5ff050007001a002200140002001800e3ff130002001600f2ff150085ff1500a7fff3ff1e0004000a00dbfff9fff5ff0d000400ddfffeff
0000380016001b00dcff210000000800f9ff1000fbffefff0b001b006200f8fff1ffd4ff0800e7fff0fff1ff020023000f00f9fff2ff1d00d8ff00000e00ecff
f1ffefffe9ffddff1700d7ff0a00f5ff07000700130011000800ecffc9fffdff020015000900f0ff1b0007000a001a0009000a00ffff7900f5ffdfff87ffe6ff
b4ff1900f0ff000018005000e5ffc4ff0600f0ff0800ffff06001000faff0e00fcffeaff0600ebff1100eefffdff1f00fcfffbff15005b002000180026001100
140002000d0005000c00f6ffdcff0100fbff0f00fdff0c0069ff1500f8ffdbff1900fbfff6fffdffbfff2400c5fffafe1e00170045003800ffff1f00bcfffdff
07000a00040012000200d9ff190025000300e5ff02000e000c00d3fff8ffe8fff1ffffffe4ffd3ff130018000800feff06000c00110008000000f7ff08000b00
3c000d000600ecfff0ff80ff17000b00040007000000080030001e001500590019000c00c8ff15000a0013001c0003002300f6ff1c003dff1b000900e9ffdeff
3d0011000a00b4ffbdffd6ff3200f9ffd7ff00004000f0ffe8ff05000100fffff3ff16000500c7ff3700000005000500a6ff1f001600e3ff0f00daff2300fbff
0800f4ffc6ffedfff9ff13001e0021002400060001000c00ebff05000e002c00e8ffc1ff76ffbbffa4fff4ff0d0008000a00ddfffdfff0ff1100070000000700
0f00060015001600ddfffdfff5ffdeff0300000003000c000e000a005f000900f4ff0b000300daff14000a0002001c001200fdff19000400c0fffbff1700f0ff
19000000f7ffdcff1a00d7ff0500feff00000e00fbff020005000000d8ffffff02001c000500f2ff30006b00f9ff2000f8fffbff0f0018000200e0ff81fff9ff
c3ff14000000faff0c005300deff28002600edff0000ddff0700feffe9ff0d000500ebfff0ffefff11001e00b0fe1e000d0026001700f3ff2700f8ff27000400
0d001700f9ff0500e9ff0200f1ff07000100ecfffdffe6ff73fff7ffebffd5fffcfff7ff01000500eaff1400c8fffefe05001e0045003900efff0f00c4ff4100
130005000300f5ff1900d6ff1e002400f2ffedff06000c00020007000500000024000400ebffcfffdcff0f00e2fffffffeff11000c0014001500f6ff17000d00
05000e000600cffff8ffe9ff03001c00fcfff5ff00000600f5ff18000f000b001a000000e3ff1800d6ff17001000ffff0000f1ff180039ff08000d000f00e0ff
3a000000e5fffcffb9ffccff02000200daff05003f00edffe5ff02000300fbff070013000a00c8ff0a000d0002001c00a6ffdbfff6fff1ff1400dfff15000a00
0900edffc4ffe1fffbff1100f8ff1d0013000b0007001600ecff060013000900eaff0e005bffbaffa5ffeeff170016001500cdff04001e000c000900ecff0000
3200fcff1d000800dcff10000600040009000b00f7fff0ffffff0f005f00eefff6ff08000400e3ff04000800fdff0e000e00ebff0f000d00d0ff01001b00f0ff
1500f0ff0000e9ff2700d5ff0c000200eeff0a000e001100fcffd2ff0700f4ff0a002f00ffff25003c000a00e0ff1f00feff04000c0013000f00e0ff92ffe8ff
bfff1d000400faff14004f00ddff14000800f5fffbffc5ff0800efff0600f9ff040009004400f5fffeff1700390021000f0000001600f3ff2300150029000600
09000f00fbff0500f9ff1a00f4ff0c00ffff0600eeffefff75ff1b00e3ffd5ffeffff1fff8ff0a00ddff1600c6ff00ff20002c0044003200fdff1b00b5ff0900
1f000300edff11000900d4ff14002700e9ff000005000200020000000f00dbff00000600eeffcdfffdff0b000400f8ff070022000f0004001500f2ff0a000a00
fbff22004800aefffdfff2ffd1ff1b0002000800e3ff14001a000e001500030010002100e9ff1800ddff01000b00ffffdcff100019003cff16000d00daffe0ff
3b0002000000ffffbaffccff23000b00daff00004100e8ffe5fffdffd8fff8fff8ff17000200d4ff15001b0000000c00afffd7fff1ffebff2200e2ff14000a00
f8ffefffc1ffe2ff05000d00ecff16001b000c000e000d00e6ff0200f2fff8ffebff120065ffe6ffa9ffe9ff0e0000002100dcfffafff8ff04000c00f7ff1400
1b00020022000e00d9fff8fffbffeaff19004e00ffffdeff170009006300fbfff7ff0d000600d5ff11001300fbff100005000c000f000500ccff14000e00f3ff
dafffefff7fff7ff0f00dcff06000e0008000a0000000d00f9ffedffe8fff7ff10002a000900040030000800f0ff2b00030001008b0006001a00e2ff94fff5ff
cdff1c000900f9ff0c005300e4ff0d000200eaffffff1d000900f0ffe9ff0d00110016000300eeff00002600eeff1e00fcff11001500060025000b0029005300
eaff130008000d00dcff2d00e8ff1400e5ffffffe5fff3ff85fffeffe7ffd9ff0700f2ff04000f0025000a00cbff0aff1c001e0040003a00f4ff1e00c4ffe7ff
1600080008000a002f00ccff27002300e6fffcff14001600fffffcff0200f2fffcff0500eeffceffdbff23004600020001001f000f0008001400f4ff09000a00
040036000900ecff0000030007001300050002001e002100070013001200f7ff1a003700f6ff1c00eeff1b00060000000d00eeff180039ff01001b00f6ffe8ff
3b0008000900ecffb9ffbcfffaff0c00d6fff8ff4200f1ffe9fff7ff1400f7fffdff12001100d1ffe8ff2f0007000700acff0400f5fff6ff2100e7ff00001200
0300edffc6ffbcfff8ffeeff0f0006001e00140002002000e4ff090011000100f7ffffff5bff1100afff16000d0023001d00dbff070015000c000a00f5ffd4ff
dcff510007001500e0fff6ff3500fcff1f0011000700f0ff08000e005b00f4ff000007000c00beffddff0c00030013002100f9ff19000b00d5ffffff15000100
f7fff9fffaff01003400daff16000c000600060012000e002400d1ffdaff0f000100270007001d0036000100c5ff26001b001000120012002100e2ff86fffaff
dfff12000b0000001a004e00e1ff00000500ffff0300e9ff0300f1ff1100e7ff110015005d00edff10002700cfff2700090000001500f7ff1d000a002e000c00
edff1500f1ff06001500e9ffdcff13000800feffebffebff7bff0800e1ffd5ff0400f0ff09001600d9ff3d00c9ff08ff360000003b003a0008001c00b5ffdeff
26001600feff2a00f1ffd6ff28002f00f4fff8ff14000d00f1fffeff0100e5fff9ff0800d3ffc6fff8ff15001b000600feff0a000c000000dbfff2fffeff0800
08008cff1700c9fff9ff040025ff0b001500180009001700060009001200fbff1a004b00faff2700e4ff1100100000001300110013003bff19002200e9ffe2ff
3c000b001600f0ffc5ffcaff1b00edffd1ff08003f00f8ffdffff2ff0000f1ffffff1e000e00c7ff10002800faff1a00aeff04001e00dcff2500e7fff4ff1200
0100ccffc3fff2ff09000e00250011001800280010001800eeff080002000000fbfff2ff6effecffacfffdff070021002600c7ffeeffd2ff03000d0003002a00
3a00180017000d00dbff0200e9ff1000170003001600e8ff6100080059000e00f9fffdffffffceff0a000d0003001c001200f6ff0e00fdffe2ff00002700dbff
0700f8ffe0ffc9ff1900daff1400bdff100017000700e6ff0e00f3ffc3ff0f000400f6ff1d00f7ff0600f9ff17001800e7fffdfffbff1100ebffddff89ffedff
ccff1600dfff08000c003c00e6ff0d000800cdff10000f001100f8fff9ff0000edff0e000d00f6ff1b00120017001f000900faff0e0000001d00190024001400
3c0007002200bdff0100ebffd4ffe3fff8fff0ff070006004afffffffcffd2ff1000effffeff3700e1ff0700caff0dff0800090044002700fdff0800c1fffcff
beff0900f8fffbfff3ffd6ff12001b001000efff0300f3ff1600e8fff3ffedffe6ffcbffe1ffddfff6ff1700fefff0fff5ff14000f0015000900f1ff22000d00
f6ff1900ebffe9ffc3ffeeff0c00130015001f00ebff0f000400270005000800f1ff0c009bff1300fcff1600330003001100e4ff1a005dff1000f2ff2200daff
3a0045001400e4ffbdffeeff1300e2ffdbff12003200e3ffe8ff090007000a0002001500f7ffd2ff1400d2fffefff7ffa7ffebff1b00f8fffeffdeff18001500
1c00f4ffc2ffc8fff7fffbff03000b000b0018000f001c00d7ff03001b007f000000cbff5cfff1ffa5fff4ff16001f000400e3fff2ff0900fdff0e00e0ffffff
f5ff0c0014001e00e5fffeff01000a00e8ff08000500dcfffbff08005500e2fff1fffcff0300ecff07001200010012001400fcfffeff7900d7fffeff1100ffff
20000000ddffd3ff1700d7ff0500dbff06000c00fcff44000300ecffd6ff11000e00e8ff1a00faff0400070011000d00ebff0600faff5100f6ffe3ff82fff7ff
bcff1500eafff6ff0c005000e4ff05000300caff0c00f2ff1300f9fff6ff18000c00f6ff0e00eefffeff070019001800120006000b00f9ff2500fdff21001300
eefff7ffebfff1fff0ffe9ffecff1500f4ff1200feffc1ff13ff0600efffd8ff0500f3fffdfff5ffcbff0800cdfffcfe0b00020048002d00edff0d00c3ff1200
1e000b001a00ebffffffdbff17001d000700fafffaff0400f1fff5ff12000d00dfffe4ffefffd9ff1d0009000300edfff8ff06000f0016001500f5ff02001300
dfff1200fbff0600e6ffe5ff0b00110014000100ebffdfff11001e000b00050000000d00b7ff1b00130024002f0007001f00e0ff250040ff0e00f7ff1f00e1ff
3b0006000a00e0ffbeffe1ff0f00e2ffdcff00003e00f0ffe9ff0f0000000400000020000c00cbff1600dbff0100eeffa8ff10001900f2ff0000ceff23000000
1e00fdffbbffe8fff0fffafffdff21000d0022000e001800e1fff3ff0200f5fff9ff06006bffebffa2fffbff1d000d000900c8fffcfff1ff0f000200eafffeff
f2fff7ff1a000b00e0ff0700f9ff0c00f4ff09000600d7fffeff030059000100ecffe6ff0800f1ff0900cdff02007f000a00f1fff8ff1a00e2fff2ff0e00fbff
1100f8ffe8ffd7ff1000d9ff1200dcff18000c000c000c002800faffeaff0b00fbfff9fffeffe5ff1800360009001a00faff0400fcff1200f7ffddff82fff9ff
a3ff1700fafff9ff10004e00e4ff20005100eaff0a00e2ff0000f1fff2ff2100f1ff0e000600f3ff0b002b000d001d000e00fcff1200eaff20000e0022000d00
2b002efff6ff0700f9ffe0ffd3fffcfff8fff8ff0100f4ff43ff1000fdffd9ffe7fffcff0700f8ffdeff0c00c3ff0aff06000b0046002e00efff0e00c0ff3600
dbff0a000f0002000b00d9ff160019000100e7ff0800e7ff0e00efffeafff7ffffffe4ffe0ffd8ffe4ff2700f3fffbfff9ff22000c0007000d00fbff1e000800
e7ff19000400d3ffdeff060003000400f6ff1100f6ff0f0006003300100004000f000d00a9ff1d00edff080028000d00dcffe2ff19003eff1b00f9ff0c00e3ff
380000004a00f4ffbbffd6ff1100ecffdeff00003d00f6ffe9ff0c0013000100feff2a000400d6ff1f00e1ff07000100a5ffc5ff1600f4ff0800deff08000e00
1300fcffc1ffeaffedfffefffbff1b000a00dbff0f001500e5fffbff0b003e00efffc2ff6bffe8ffa5ffffff18001400ffffdefffdff05000d00feffe9ff0100
f9ff110014001400deff0100f5ffe5fffcffffff0b00d8fffefff7ff5f00e7fff6ff08000800e9ff11000800feff0d000c00fbff2f001300d7ffffff06000900
1600fffff5ffe0ff2100daff0000f1ff96001200000032000100f3ff01000f00040004001900f7ff0400fdfff1ff14000700fdff0300dffffcffdfff8efff9ff
4cff1c00f7fff9ff0d005100e0ff1b000000e0ff0800c5ff09000100fcff3300fcff0e000a00fdff040019001700200005001600160001002600000020000b00
05002f00eefffefff1ff03000d001700ffff0800feffcaff55ff0400f2ffd4fff1fff8fff8fffeffddff1000c8fff1fe0d00110045003600f4ff1300c8ffdfff
20000a0065ffe3ff1700deff0c001900e4ff0800feff08002000c4ff1d00eeffedfffbffebffd2fff8ff15004800f7fff8ff0700070007001200f2ff0a000c00
0d0010003a00ddffeeff0000ffffb4ff0500daffeeffdaff1c001b001000e9ff15000d00c7ff1400f9ff1000160003001a00edff1b0040ff0000f7ff2200deff
3c0000000900fdffb3ffdfff0300f2ffddff02003d00f6ffeaff01000200020005001600deffd1ff1500f1ff04001500a1ff09001000efff0f00e0ff0200feff
1100f4ffbdffeafff2ff0000f9ff29001900120006000900eafffdff0100e5ffeeff10006aff0e009cffebff200002000d00d4fff9ff15000a00ffffe3fffdff
0200ffff15000700deff0900f6ff0c000900dbfff6ffe7ff03000e006100f0fff8fff7ff0200dcff0500070000000b000b00040004000500defff1ff11000500
6ffff2fff0ffe6ff0000d7ff1200eeff12000d000800fcff1800e8ffc7ff0f0009001c00cfffe0ff0700e5ffedff2000fefffeff190015000800dfff7eff0000
8dff18000700fbff0e005000e5ff27000600ecff04001900fbfff2fff6ff1e00f8ff02000700f5ff0c001e00f4ff1a00ebff07001400edff26002b001c00f7ff
010094ff1d000800caff0200f9ff1200f8fff7ffeffffbff68ff0000f4ffdcfff2fff7ff04000900e6ff2600cbfff5fe22001500430038001e001d00b5ffeaff
00000a000f000e000100d9ff15002200f5ff0200000007000d00f3ff0b00e8fff6fffeffdcffcdfff5ff1c00f9fffffffdff150003000e001500f7ff09000800
f0ff1a000900e2fff2ff000008002d0005000500edff1d00feff1c000d00040018002000cdff1600f5ff1e000d000700d9fff7ff1d003dff060000000900e2ff
3b001e000200ffffbcffccff1a00f7ffdbfffeff3b00fcffecff03001100fdffcdff1b00f7ffdcff0c00faff00000d00a4ffcffffaffc1ff1500e7ff18001700
0500f9ffc0ffe0fff3ff0b00200025001500e1ff02001000e5ff060012000400f4ffe7ff63ff0800a3ff07000d0010001000dcfffcffe1ff0d00fdfffafff4ff
e9ff3f001d001400dcff0d000a00f3ff1100f7ff0c00e2ff10000a005e00f2fff3ff08000800ddfff5ff0800000019000700f5ff03000800d3fffdff13000200
0500defff3fff4ff2b00d8ff0700f6ff08000d00000004001100efffcdff0e0008001d000400ebff21000900c1ff25001000fbff09003c001000e1ff81fff2ff
baff15000c00faff0e005300e1ff000000000000ffffcdff0e00fffff3ff26000200e8ff0900f4ff0600150016001e000e0002001800ffff260007001d00e5ff
f8fffaff07000d00f1ffffffe4ff0a000200fdffe7fffaff6dfffaffe2ffd5ffe9fff6fffaff0c00d0ff1100cdfff5fe11001f0040003a00e5ff1800c2ffe0ff
1c000c0010000c000700dbff17001f00f6fff2ff01000d000000faff0000feff00000100e4ffc8fffdff05004d00f7fff4ff170000000200f9fff1ff13000d00
e1ff1d00f8fff1fffafff2ffecffb8ff0400defff8ff01000e001100110015001800e6ffdcff2400e7ff1000030003002300f5ff190042ff080005001c00e3ff
390010001000d9ffbeffd0ff0d00f3ffd7fffdff3f00fdffe8fff2ff0000fefff4ff04000900ddff0700010000001600a5ff0900f5ffe4ff2100e4ff11000a00
fbfff0ffc2ffe0fff3ff0a00ebff1f000c00190008000f00eeff0b000200f8fff0ffe7ff73ffe1ffa9ff0a00140019001e00d2fffcfff9ff0f000300f7ff1900
470009001b001500e0ff1700eaff170018001f00fdfff8ff26000a005f001000fcfffdff0100d9ff1700110004000c001300f9ff0e000800d6fffaff1d00e6ff
0a00fafff7fff8ff0600dfff0f0000000c000e000a000c000c00deffd3ff0d0006001e00c9ffdffffeff4600d4ff27000000f5fff7ff14001700e6ff77ffefff
cdff14000e00fdff16004c00e4ff090009000800010002000400f1fff6ff00000f000e00eaffe9ff11002600b8ff2800000011001300e8ff1d000f0023002500
faff1500f7ff0a0000003300e9ff1900e4ffe6fff2fff0ff7bff0600e3ffdefff6fff1ff00000500f3ff2a00cbfffafe2600370041003700fcff1800bdff0c00
1c000a00fbff1d00ffffd0ff21002400f9fff7ff0e001400f7fffeff1200f9ff28000500e2ffc8ffe7ff1500fdfffefff7ff0500040004003300f9ff05000300
f3ff1bff1c00caff0000fbffe8ff0700f6ff0a00f7ff1a00000010000900f8ff1c000800f6ff1700f8ff0f000c000200030005001f003fff28000a00f1ffe0ff
3c0003000600d9ffc0ffd9ff1200f9ffdafff3ff3800f6ffebfff7ff1400f5ff0a0015000b00cdff0d001a0001000f00b0fff6ff0100e7ff2200e5ff11001100
0100ebffc3ffe1ffeefff0ff250017000b0001000b001a00e2ff0b00fefffaffe3fff2ff77ffdcffa3ffdaff11001b002700d1fff6ffedff0a000200faffe9ff
f1ff0f0030001400dcfffafff5ffc9ff1a0000000a0000000b0007005d000000f3fffeff0700e9ff15001200000016001900fcff11000f00d6ff16002200f2ff
0600fbfffeff03001d00d6ff0f00080005000b000200f7ff1200efff09000f00010016001e00e1ff43001100a2ff1f0000000a00110001001c00e2ff82ffefff
d0ff16000800fcff0e004d00e7ff0d000200ddff0300c8ff1400f0fffcff120015000e000c00f2ff0a00ebff16001d00020008001b00f6ff21000d002000e0ff
fbff0d00daff0500d2ff2200e9ff1e00f9fffbffe5fff4ff57ff0100e7ffcffff0ffe2ff08000f00f4ff1400d2ff02ff2600edff40003400e7ff1600b6ff2b00
2100fafffeff00003e00d1ff15001700c2ff03001e000e00f3fff6ff0000e3ffffff0800e9ffc1fff0ff14000a00f3ffdeff0e0007000600fbfff8ff07000c00
02003d007200e0fff5fff2ffffff110000000300080025000a000a000a00eeff1f00e6fff7ff2400d1ff1800060004001a00faff330046ff11000e000100ddff
3d00f9ff0a00e2ffc3ffe7ff0900f6ffd0fffeff4100f1ffe1fff7fff9fffbff0d000d001400c8ff16001b0001000c00aefff0ff0b00f9ff2000ebffefff1600
f1ffdbffbdffedfff0ff0600d8ff1100000022000d001200f7ff05000a00f5ffefff13006effc7ffa0ff21000b0026002200daff04000d000d00fbfffaff0d00
7b00ffff07000b00dfff1700e6ff00001f00bdffffffdbff190003005600ecfff5ff0000f2ffd7fff5ff0c00fdff19001700f8ff2000fdfff0ff000017000600
1900fdffe3ffd2ff0d00dfff1500aaff06000b00110012000e00f9ffefff18001700f9ff2300f0ff0000f6ff15001b00e0fffafff9ff0500fbffe3ff34ffefff
c0ff1700edffecff13003f00e2ff27005a00e0ff0900f7ff12001900fbff0a0014001100fffff4ff050009001d001400070003000e0009001700020018000d00
f6fff6ffe8ff0d00e5ffdcff2b001d00fdfff3ff0700f8ff2fff0d00faffcefffdffebffffff2000eeffffffd5ff07fffeff07003b002700f1ff0c00c6ff0100
2bff12000500eaffffffd3ff1f0015000600faffe5fff7ff5400deff1800e7ffedffa7ffdfffdeffeaff0000f7fff7ffdffffeff0e0002001b00ecfffeffedff
efff1100faffceffb1fffdfffdff080007001600edffc1ff060014000700effff9ff0c0084ff10001400e7ff2f00f3ff0d00e1ff270064ff1600ebff2200dcff
3e001500dcffe1ffbdffebff0c00e4ffe0ff04002900edffdaff0200ffff0b00fdff10001000d3ff2200d4fffeff0600adfff7ff2100ebfffeffe0ff0e001400
2000f9ffc1ffe0fff2fff9fffbff1400f9ff280010001600e5ffefff0e00fffffbffcdff50ffebffa8ff050019001900feffdeffffff000007001200dbfffcff
f1ff040022000500edff0800eaff0400efff05000400e8ffffff02004e00e3ffe8fff1ff0000edff0c0027000d002f001800faff2600f5ffebfff5ff0000fcff
0e000100eaffddff1800ddff1700beffebff06000900ecff0400f2ffd7ff1300f5fff6ff0700f0fff8fff4ff0d001d00e2fffffff8ffeefff1ffd9ff81fff5ff
beff1100f1ff02000f004400e0ff1f000900c8ff1300d6ff0a00feffefff0b0011000c000200e9ff0600fcff14001f00020004000e00f9ff1d000d001c001100
1a0011000f001d00f3fff0ffddfff2ff0000f3ff0900ecff3eff0400f8ffd1fff6ffeaff0100f7ffdcff0e00ccff00ff0c00ffff4100310004000600caffe8ff
070000000d00f2ff0500dbff15001800fcff080004001c00faffe1ff0200deffe9fff6ffeaffdefff8ff16000300f0ffedff0b00120007001700f8ff0c000900
14000f00f7fffeffdafffeff0000ffff05001800ebff38ffeaff27000800f0fffaff0500c4ff1e00eaff1b00320014002600e5ff1f00a4ff0000ebff2200e7ff
3b000300f3ff0b00b4ffebff0b00ecffdcff000034000500e9ff000012000700fbff2000feffccff0800daff0000f1ffa3fff7ff1700f6fffbffdcff15000d00
1300fdffc2ffebfff4fff8fff9ff17000300e3ff0f001800e8ff01001900f1fff6ff02005fff0e00a7ffefff22002100f8ffcffffaff010007000b00e0ffeeff
f0ff0e0017001000e5ff1300edff0c00f6ff07000d00dffffeff15005700ebff0000feffffffe4ff0a00fcff000026000700faffe7fff9ffe5fff7ff0900f8ff
eefff7ffdbffebff1200d6ff0700bfff0000120008000e00feffefffd4ff16000200f8ff0e00eefffcfff1ff03001b00fcfff9fffcff4e00fdffdeff8ffff7ff
5dff1100dffff0ff10004a00e3ff0c00faffe9ff1000f1ff1b000300fcff0c000d0017000200fefff9ff050025001f000200fbff0e0006002100fdff0d000900
f5ffefffeafff7ffebffefff1a001800f7fff6ff0300ffff4ffff9fff7ffe6ff1200f3fffaffedffe0ff1400c9ff01ff000004003e003100e8ff1b00c3fff2ff
4dff0900ceffe1ff0100dcff12001700fdfffcfffcff08003f00daff0a000900f2ffe2ffdeffd7fff5ff0600feff0f00efff1500080001000700f0ff16000900
c4ff1000f0fff8ffe9fff8fffbff14001300e2fff0ff09000c0016000a000d00120011009eff1a000e00050023000f001900e5ff25009cff1100eaff1d00e1ff
3e0030001f00c6ffb5ffe1ff1100e9ffe0ff00003500f0ffe9ff02000f000600e0ff16000900d1ff1c00dbff03000500a0fff8ff0f00f7ff0a00dfff25001200
1300fbffbcffddfff4fff5ffffff1f00f7ff6dff0b000900eafffcff0b000400ebffd1ff6affdbffa2ffedff18001c00fbffdffff7fff9ff06000000e0ff0000
f2ff3e0013000f00eaff2500f2ff0300fcff0200fdffe0ff050003005800f3fff6fffaff0200f0ff04002c00010013000e00feff1c001400d8fff9ff0600fbff
09000300e6ffedff1600d9ff0800d2ff1b000500fdfff7ff1200f1ffc4ff1300fffff4ffd4fff3ff09004000fbff1a00f7ff0400feffffff0200ddff88ffebff
a7ff1200e9fff0ff0e005300e7ff2000f9ffe4ff0a00f6ff01001600edff2000020055000400f0ff0500e9ff0d001f00040018001700fdff200009000e000300
feff14001600f5ffdcfffdffddff0300ffffeafff9fff3ff15fff9fff2ffdafff5fff4ff00000200e4ff0900cefff8fe0600020043003400f9ff0f00c3ff0500
d8ff0800190000000500dbff19001800f4ffcbff0b00f9ffedffadfffcff2300f6fffbffdfffd6ffedff1c000e00eaffe7ff03000a0014000e00f5ff16000e00
09001100f6fff1ffecffeaff0000e8ffdfff5dffe5ff53fffcff1b000e00e7ff16000800c2ff1c00f1ff1100190000000400e7ff13003cff0900f6ff0e00e2ff
3c000a00f9ff1700baffe1ff1000ebffe0fffaff3d00eaffecfffeff110006000c001d00fcffd1ff0700e6ff06000e00a2ffeeff010001001b00deff11000800
0f00f6ffbcffe5fff0fff9ff04002500040010000e000900ecff05000e00f8ffefffe8ff5bfffeff9fffebff120025000000d1fff8fff3ff0b000800effffdff
060011001e001500e3ff0500f2ff0900040017000a00e1ff0500e8ff5f00fafffbffefff0600f0ffe8feefff020010000500f6fff2ff1200ddfff9ff06000700
15000500faffecff1800d7ff0b00dbff050005000d0011000f00ebffe9ff1600ffff050065ffecff1100faffbfff1b00f8fffaffeeff41000d00e0ff97ffeeff
78ff1a00fafff4ff0f004e00e5ff03003000e2fffdffe3ff0e00f7fffeff1c00fdff0b000700f1fffdff0f001c001d000b00f0ff1400ffff2200050000001500
f6ffecfff8fffffffbff1c00eeff0d000500f1fffcfffaff5eff2000e9ffd7fff9ffecfff5ff0000d6ff1300cafffcfe0700150042003300edff1400caff0500
1600faffb7ff02000e00d8ff16001c00f7fff4ffffff0000faffeeff000002001000fcffe2ffd0fffdff1300f0ffedffecff0b000a0004000100f5ff01000b00
beff08004200d8fff2fff4fffcff18000500eeffefffe6ff0f001500130011001b001500bcff1900f6ffffff0b0006001400edff1a0042ff4b00f2ff1500e1ff
3b000900e8fff4ffbbffdeff1100ebffe0fffbff3500fcffe2fffeff08000500f6ff0700f2ffd2ff1c00f4ff07001200a2fffaff0d00dfff1a00deff1b00fbff
0600f6ffbfffdefff1ffedff02002500f9ff67ff08000400edff04000300ffffeaffe6ff6affd1ffa1fff0ff1d000e000b00e3fff7fffcff0b001100f3fffaff
fdfff1ff21000a00e6ff1800eeffacff1200c4fff3ff030002000b006000d5fffafffafffefff3ff27000600040009000e00fcff10000800d3fff6ff0200f8ff
0800dbfffafffaff0d00d8ff0e00e6ffe3ff0100e3ff0300fffff0ffe4ff1600ffff0900fafff3ff19003b0023ff2900f2fffcff3400f5ff0800daff85ffeeff
b7ff1300fdfffbff0e004c00e2ff21000500d6fffdfff4ff0000fafff5ff1200ffff00000000f8ff0000f6ff01002000e0ff0a001600fdff1f00f7fff8ffdfff
f8ff1600efff0000f3ff4200edff1400fcfff0fffbffebff76ff0500e7ffdafffbffeffff9ff060001000200ccff13ff17000b003d003d00fbff0b00c2ff1f00
15000000fbfff5ff4b00d7ff150015003600f9ff0b000200fcffdfff0400fbffe5ff0100e0ffcaffdcff22000300f7ffe5ff0900060005001c00fdff19000d00
01001c000700e8fff5fffbff0000f3fff4ff63fff6ff1a00f4ff0e000e00eaff12000800daff1c00ebff0900fcff05000f00e7ff220047ff0600fdff2300e7ff
3e000000fcfff9ffb7ffdaff0600f3ffdbfff5ff4200f7ffeefff8ff1100ffff1e0019000400ceff1100f8ff02000b009fffefff0f00feff1e00e4ff0f000a00
0a00fdffbfffe5fff3ffffff00001e000600e3ff03000600f9fffdff0800f5ffebfffbff61fffbffa5fff8ff1c0025001e00ddff0600030014000800e8fff9ff
010012005c001300e5ff0900edff0700150000000b00fbff00000b005a00e5fffbfff6ff0400e0ffe4ff0a00fdff0a001900ffff0c000400e3fff7ff14001600
ddfffdfffbff01001400d5ff0800f0ff06000000120001000700efffedff0e000600060053fff7ff3700f5ffaaff2600fdfffcfffaff03000c00d9ff91fff7ff
b7ff11000900ffff10004800dcff0a00faffdcfff1ffe4ff1400f5ff0400f7ffffff0f001000f6ff060010001c001c00ffff01000f00f9ff2100130002001700
02000400f6ff0500f8ff1200f2ff1400e5fff6ff0200f3ff6effefffe5ffddffedffedff00001100dfff2600caff04ff120023003d003c00fdff1700caffd1ff
1b00ffff030001000b00d4ff1e001600e4fff7ff07000600faffe8ff0100e7ff05000300dcffc7ffe7ff1f000500f6ffefff0d0016000500c0fefaff0a000800
f9ff14005a00d7fffdfffbffe4ff1300faffe1ffebff18000e000f000800f8ff19002000e0ff2300eaff0400f9ff00001e00f4ff1f003fff1100eefff6ffe7ff
3d000a000c000500c2ffdfff0e00ebffd9ffeaff35000000e2fff8ff0400f8ffe4ff11001100d4ff1f00fcff01000c009fffffff0700e3ff2400ebff01000d00
02000600bdffe2fff5ffccfff7ff2000e8ff1800ffff0800ecff0300fefff3ffe6fff9ff74fff2ffadfff4ff1d001e001d00e0fff6fff7ff0d001000e8ff0800
edff490022000d00e2ff1400f2fffaff1c00bbfffdfff8ff2b000f005a00e3ff0000fbfff9ffeeff04000200ffff10001b00f7ff0c000800e4fff4ff3500e6ff
06000400f2ffffff0b00dbff0b00050011001400feff0d000600f5ffd6ff1f000e000e00c3fff3ff1300faffe1fe1f00020007005300fcff1200deff95ffe4ff
c9ff1400f9ff120014004000e1ff1b00f9ff0e00fffff3ff05000100f3ff09000c000800fcfff3ff04000a0007002000f8ffffff0f00faff10001d002300d5ff
e3ff0d00f5ff0100e9ff0c00e7ff0f00fdfff2ff0d00f1ff7ffff1ffe1ffc0fff2ffebffffff1300fcff1600cbff02ff0e00f2ff37002c00e3ff1a00c8fffdff
28000300110000000900ceff1e001600f9ff040012001200f7ffeeff0200efffe2ff0a00e2ffbffffdff0e000f000100e9ff0500090006000e00f7ff09001000
05002000effff9ff0000f2fff5fff1ff05001100f6ff1b00f6ff0a000600edff15000600faff2000feff0d00070004001a00f2ff130044fffffff8ff1700e3ff
400008001400edffb9ffe1ff2600efffddfff0ff2c00f0ffdffff8ff0d00fafffaff11001000d4ff03000700feff1300a7fffffff5ffedff2800e8ff05001200
0000c4ffc2fffafff5fffcfffeff1300f0ff120006001f00eefffaff1800fafff1ffe4ff68fffdffa6fff9ff110019002000d7ffebfff0ff1300fbffe9fff2ff
0900ffff18001800e6ff0800feff0b001e0015001f00ecff0800feff4e000f00dffff7fff0ffdcff0a00030002000f00240004001b000600e8ff0a0026000900
1e00f2ffd0ffdbff1600dfff0f0046ff0b000d0014001800fafff8ffe2ff15001e00ebff2100e1ffedfff3ff1900f9fff4fffcfff3ff0500f9ffe6ff38fff0ff
caff1300cdff030003003e00ecff1800f0ffd4ff1800f5ff08003d00feff150009000a00f7ffe2ff040000001d0013000200f4ffffff00000e000b0006000f00
f5ff0c00ebff2200e7ffeeffedff0300e9fff9ff0f00eaff22fff8ffeeffdeff0200d5fffbff2d00cbff0b00c6ff07fffafffdff3f001c0017000400d0ff0000
2a000900f1fffbfff0ffc9ff13000d00030000000a0011000700e9ff0500efffe0ffb3ffe5ffdcffe8ff0200edffdeffd0ff0300260001000600f3ffeeff3000
ecff1000e5fff2ffbaffeefffeff150007002b00edff21fffdff0b000000f4fff4ff0f0094ff04001800e4ff2d00d7ff2d00e1ff17004fff0b00e1ff0b00dbff
3e0041002100e5ffc0ffefff1c00ebffe2ffeeff2900eaffdbfff0fffdff09000b0017000300cfff1b00e1ff0400ebffb8fffeff2600f7ffecffdfff0000f2ff
1f00feffbdffd3fffaffe6ffeeff1400f7ff1300f5ff1600f7ffeeff0300fdffebffe1ff6afffdffb2fff5ff10002a00f0ffe5ffefffefff06001200dcfff7ff
f0fff0ff24001400efff0c0004000e00e6ff1b000300d2fffeff03004b00deff0300f3ff0700e6ff0b00ecff00001d00fafff2ff01000d00e3ffecff0100e1ff
0800f5ffecffdfff0900e3ff09007bff2d0000000e00fefffdffe3ffe4ff1d00fefff3ff1c00f2fffcfffeff11000f00e6ff0100fafff1fffaffdfff3effe0ff
b9ff1300e3ff00002e003e00e6ff23005300d9ff120010000600ebffefff0a00f6fff1ff0400d9ff07000300130011000500f8ff0b00020018000600e6ff1900
0100ecfffbfffeffefffedffdafffbffecfff6ff0300f0ff18ff0700f3ffd9ffe6ffe6ff1000ddffe6ff0500ccff0fff00000b0048001d00edff0700c0ff1400
41ff0400fbffdeff0000d3ff0a0009000f00ecffefff3200f0ffdefff9ff00000600f5ffdfffe1ffd7ff1b00e3fff6ffeaff1c000a000e000400ebff06000000
faff2200dfffe8ff66ffddff0800160004000300f6ff1f00150017000100fcfff0ff0a00afff1700f5fff9ff340004001400e2ff1d0047ff0c00ecff2c00deff
3a001300c1fff5ffbaffdfff0c00daffdffff9ff2a00e6ffe3fff9ff08000d00090017001600dafff6ffe6fffaff0400aefff0ff1a0008000000e2ff0b000d00
16000400b6ffdfffebffe9fff5ff1300f4ff3dff00001400e9fff2ff18001600f8ffd1ff60ffe6ffa8fffaff12002f000100c0fffbff030004000900e2ff0000
faff000017000900eaff0000fdfff2fff0ff0700fcffe2ff070000005500ecfff6ff04001100e0fffcfffcff00000f00fcfffcff0f002e00edfff7fffffff4ff
19000000e2fff6ff1400d9ff14008fffe8ff08000a0014000500ebfff8ff1800feffefff1700f0ff0d00eeff0e001d00dbfffdfff9ff0400fdffdfff33ffebff
54ff1100f0fff8ff17004b00e2ff1c000600e9ff1000e7ff09002800f7ff17000f0006000a00fdff070004001c001900fdfff6ff0e0003001f000400e7ff0700
04001500eaffe8fff1ff0800faff1400fffff3fff5ffefff44ff0b00ecffd8ffeeffe1fff5fff3ffd9ff0100cafffafeffff06004000300007000f00c6ff0500
23000900f6fff9ff1200d9ff1d000f00feff0000f2ff16000800ebff0a00eeffe6ffd5ffe5ffdeff06001800f6ff3300ecff0500f8ff06001400fdfff9ff1600
eeff0c000300edffd7ff03000500f5ff000050ffe5ff3dfffcff23000900f3ff01000b0099ff1900110022002c000c002500e7ff240099ff3100edff1800e3ff
410004000700f4ffaeffefff2200e1ffe4fff9ff2b00ebffdfff000011000800f0ff04000600caff2400e2fffffffdffa3ff05001900fbff0100ddfff2ff2300
1b000000bdffe2fff5fff6fff9ff1e00f9ff2f0009000500f5fff4ff0600effffafffdff62fffbffa8fff1ff12002700fdffe0ff000006000b000f00e1fffbff
fafff8ff1e001700ecff0f00ecffd4ffffff04000700e8fffeff09005200e0fffafffaff0700eaff19000700faff21000e00feff13000000e8fff9ff01000300
e3fff6fff0ffeaff0900d4ff0500ccff0e001000ffff0000faffecffd9ff0e000700e7ff44ffebff0900000001001a00e7fffdffffffefff0200d3ff86ffe7ff
56ff1100f8fff8ff16004600e2ff20003600c7ff0b00eaff0e00f3fff2ffffff00001d00fffff3ff0900fcff13001d00f9fff6ff0a00f0ff1e001100ddff0c00
0b00e9fffcff0700d8ff0500e5ff0900fcffecff0100ebff1bfff9ffe9ffdffff2ffe8ff02000700efff0a00ccff06ff080000003e003000f1ff1b00befffeff
3afffcff1800faff2800deff1a000e00e6fffffffbfff6fff6ffaeff07000100eafff7ffdcffd1ffcaff0900f3fff4ffe6ff1d00fbff00001100f5fffeff0600
ffff0f00efffecfff1fff3fffbff1200d5ff2200f0ff2900030018000900edff09001100beff1b00f9ffe3ff20000a000f00e2ff1f00c2ff0b00eaff2c00e8ff
3e000f00d0ffecffb5ffe0fffdffeaffe3fff8ff2d001b00e5ffffff16000100f3ff14000c00c3ff1000e1fffcff00009effecff0c00fcff1600e3ff1f001b00
0d00ffffbfffe7fff4fff7ffffff1c00f5ff3bff13001900f3fff9ff25000000f8fff1ff5dfff5ffa5ff000011002f00fcffccfffdffffff0c00fdffe5fffbff
f3ff420012000d00e5fffefff0ff0c00010000000200e5fffdff04005400e2fffafff9ff0000e1fff1ff0300fcff0c000400f9ff16000b00ddfff5ff0a00f4ff
0c00f9ffe7fff8ff1600d5ff0900d1ffe6ff0900feff01000600edffeaff10000100f8ff2400edff0e00e9ff0eff1d00e5fff9fffeff01000700dbff85ffe8ff
58ff7200fdff000012004c00e3ff0e00edfff5ff0000dcff0500fafff4ff1600f4ff0c000500f9fffaff080019001b00feff01001300f4ff1e00fdffd9ff0600
fbff1200e7ff0000f4ff0900efff0d00f0fff4ff0200eaff53ff1200e9ffdffff2ffe8ff08000800daff1700ccfffefe140008003800370001000e00c3fffaff
1d000900ebfff7ffffffdbff14001000ffffffff190008000000e3ff0300ebffebfffeffe2ffcfffffff27000200efffebff0800fbff0100f2fff5ff02000b00
edff12000100f5fffafffafff8ffe0ff050028ffeaff45ff000014000b00f0ff16000d00a4ff2700f8ff1000110009002900eaff210044ff0600eeff0000e6ff
400025001a00dbffb7ffdcff1f00ebffdefff7ff2c00edffe9ffffff1200fbffeffffdff0c00c6ff1200effffeff0a009fff00001000f1ff1600e5fffcff0000
0b00faffbaffd8fff3fff5fff8ff2300f4ff300000001500f2fffbff0200f4fffeffeeff69ff0000a3fffbff1a0029000a00dcfffafff4ff0d00ffffe1ff0200
0400060022000d00e6ff1000e3ff12000f0000000500efff0900f2ff5700f8fffbfff6ff0200e1ff20001200ffff14001400f9ff03000200d9fff1ff0f00dbff
daffebfffdff13000d00d7ff0900daff18000400c9ff09000900e4ffe1ff26000600f8ff99fff0fff9ff0400eeff1b00f8fff5ff0200fbff0a00d9ff9effe9ff
48ff1300f9fffcff12004b00dcff1900faffd6fffeff06000700fcffefff0e000000d4fffffff2ff020009000c001e0002000f001700f5ff1c001200c2ff0700
f7fffafff9fffdffdcff0700e8ff16000600e2ffecffefff7aff0400e9ffdbfff3ffe7fffbff0600ebff0300cefff8fe0a000f003c002e00e5ff0e00c1ffe5ff
1900fbff0a000700ffffd6ff06000d000000eaff0f000500f3ffdeff0400f6ff12000300e3ffccffffff19000000fffff0ff1200faff05001300f8ff03000900
ffff0000f1ffecfffbfffbfffeff1300fcff0f00edff0f00ffff10000b00eeff14000900c9ff2100efff1000f6ff04001200f1ff1e0042ff0600f3ff0000e9ff
3f0002000900f9ffc0ffddff2000f2ffe7ffe5ff2d000600e4ffffff1700fdffe9ff0d00d9ffd5ff0000efff01000e00a3fff9ff2400f8ff1c00e8ff18001000
0900f0ffbeffeffff1fffeff01001b00ebff4bff01001200f3ff04001c00f7ffe6ffe3ff25ffefffa7fff4ff140021001e00dffffafff4ff0f00d0ffe8ffefff
f4ff40001b000500e8ff1a00ecff2a001800feff0300edff090003005600f3fffdfffbff1000f5fff0ff0b00f4ff0a001900f5ff17000000dbfff4ff0800d8ff
0d00f4ffedfff8ff0d00d7ff0f00f1ff13002300fbff01000700ffffefff1e00020001002400ecff1600fcff79ff1b00ecff0100fbff10000b00e1ff78ffedff
c6ff1c001b00f8ff11004900e5ff1800fffffbff0c00dbff0900fbfffeff27000b001700fdfff0fff6ffffff2d001e00d1fff1ff110005001500feffe6ffe2ff
efff1000e7ff0400f6ff0e00e4ff1e000c00e8ffdcfff7ff58ff1d00e2ffd2ffe7ffe6ff20001400d4ff2400c8fffdfe0000010039002d00e4ff0b00c8ff0700
28000a00f5ff00000e00daff14000f000400f8ff04000700ebfff0fff5ffffffefff0800e8ffc8ff07001600f4fffaffeaff0e00110000000100fbff12001000
e9ff0c000800ecfffaffe5fffdfff0fff0ff43fffcff2c00080015000f00f2ff16000d00eeff2500edff0400e9ff06002600e9ff170089ff3500e7ff1300e1ff
3d0000000b00ebffc2ffe0ff1200e3ffdffff1ff2f00e5ffe2fff0ff0200f4ffecff0f000b00d2ff0e00f9fffeff0f00afff01000b00fcff2900e7fff8ff0a00
f6ffb8ffbeffe0fff5ffcbffffff1500dfff17000a000900f6ff0300e3fff5fff0fff5ff69fff4ffa6ff0f0017001f002900e9fffcfffdff1300dbffe2ff0400
0b0000001f001100e9ff1100e7ffdfff1600f1fffcffffff0a0002005500f7ffdefff0fff0ffe9ff0b001400ffff14001200f8ff16000c00e1fff4ff1400eeff
03000000f3ff0e00fbffdffffcff03000b001800f2ff00000600eeffe9ff1e000a00f0ff01ffecff03000800cdff1b000100fcff040007002000e4ff36ffeaff
d3ff160019000d0013003d00e5ff1600f5ffdcff020003000b00f2fff3ff0c0005001400fefff6ff0a00000003001b00f4fff6ff0b00fdff190017000900f9ff
00001200f3ff0600faff2200ebff14000900e4ff0100ecff89ff0300e6ffdbfffaffe2ffedff0800f0fff4ffccff05ff0900c6ff3a003000ffff0c00cdff0900
1b00feff1600ffff4300d1ff2b001400d1ff0f0024000f00f5ffe2ff0000f9ff19000d00e3ffbeffe1ff2000f6fffbfff1ff0b001c0003000700f8ff03000600
0700fbff0000e7ff0300f0ffeeff0c00fbff1b00f1ff3400fbff0a000800f6ff19000b00f4ff1c00f9ff0200f2ff03001d00eeff1c0051ff0f00f2ff1300eaff
42000a000800f8ffb8ffe5ff1700ecffdcffdeff2300f5fff0fff5ff2200fcff0f000d000f00d0ff0d00edfffeff2300adfffafff7ffecff3300f0ff01001200
fdffb9ffbffffbffeeff0c00f7ff1800e3ff330007000e00f6fffdff0d00faffcffff2ff5dfff2ff9fffe8ff12001e002400caff0000f3ff1000f4ffdffff1ff
e8ff0b0000000a00eaff0800f5fff0ff1c00030006000200010002004a00ebffebfff3ff0b00e1ffecff1000ffff0b001b00f7ff1100feffe2fffeff1000f5ff
1600e3ffd8ff8eff1100d4ff05004afff4ff0c001500f9fffefff9ffdcff290082fff4ff3000f0fff9fff0ff1d003100dbfffaffe2fffbfffbffe7ff30ffd6ff
43ff1400ceffdbff03003800e5fffbfff1ffadff0700e4ff13001000f5ff1800150005000400f9fff3fff6ff08001100e0ffefff0500d9ff1700060002001300
1a000700e5ff0b000100eaffc5ff0700ddfff6ff1000eeff88ff0000f0ffd9ffe9ffedffe7ff0c00d2fffeffd5ff30ff11001400410038001c00d2ffd1ff0600
14001200f9ff01000600c4ff240008000b000600d9ff16000300e4fff6fff5ffe3ffa4ffe7ffeaff06000900fcffdefff7fffaff0a00eaff10002000dbff0300
04000300eeff0800a1ff01000500f5ff11002200eaffbdfffeff1e000600d7ff0500fbff9dff0700f6ff06001e0008002200ddff1000dbff1500ecff2300e5ff
2700e9fff4ffefffabffddff1500c1ffeaffe6ff1d00e6ffebffedff16000d00faff13001100d2ff1500f5ff0000f9ffb9ffeaff0800dcff0a00e7fff8ff0d00
2e00faffd6fff6fff6ffeaffdcff0d00f1ff2e0004001500fbfff1ff0a00f4ffe1ffecffc6ff0f00a3ff0100160035000300b8fff9ff010012001800d4ffd1ff
e7ffffff2000f3fff3ff0c00efff1300ecff0c001800beffe3fffdff4200d3fff7ffcfff0c00efff16000500170018002100ecfff5fff6fff1fffbff1700f7ff
0900ecffeaffeaff0f00e0ff090075ff0900140006000800ecfff1ffd4ff1c00400002002700ebfff6ffeaff1a001a00cafff7fffbff08000000dcff28ffe2ff
68ff1300e4ffecff0a003800e5ff28001500ddff0f00dfff0e00d7fff5ff0d00fbff23000300f6ff00000b0026001800fdff10000c00f5ff14000200d8ff1600
0200fdffe7ff0700e1ff0000f7ff1100fdfff4ff0b00f5ff1bff0c00e6ffe2ff0400e0ff01000800eeff0200ccff0cff0800010036001f0000002cffc8fff2ff
c3fe0400fbffe9ff1500cfff1b0012000000fbfff7ff12001200ccff1300fbffe5ffbfffd5ffddffe1ff0100f0ffecffecff0d000600ffff1e00efffebff0900
eeff1800edfffaffc9ffe1fffcff1800eaff3700f0ff2800f7ff0f00fdffe8ffebff130097ff1b0015007bff350013001c00daff2500a0ff0e00d3ff4400d6ff
44003900faffd6ffc0fff6ff1500e7ffdfff00001400f7ffe1fffaff12000700f7ff05001100cdff0f00e4fff9ffffffa3fff6ff2500eefff4ffe3ff10002000
1d00f6ffb9ffe3fff7fffdfff3ff0d00e0ffbfff1d001e00f0fff5ff2000f0ff0300dcff91ffebffa1ff0e0019001e000300e4ff0000feff08000700d9fffeff
f1ff160021001300f1ff0500edff1900e8ff0b000b00e2fffefffcff4800daffebfff4fffaffe1ff0b001900070023000600feff24001700dbfff4ff1200faff
1200faffd8fff0ff1c00e1ff090036ff08000b000a00fbfffefff3ffe2ff20001600edff1c00e8fff7ff010012000100f1fffbfff8fff1ff0000e7ff30ffedff
46ff0c00f1fff0ff23004000eaff0800e1ffd9ff1200e9ff21000900e3ff12000b00daff090000000400edff1f001100feff06000c00e9ff1700fbffeeff1300
05000c00efffd8fff0ff0200c4fffafff8ffefff1000ecff1ffffeffe3ffddffe5ffe4fff9fffdffeeff1300cbff00fffaff040041001700f3ffbcffcafffbff
2f000e00f9fff7ff0b00d6ff09000200fffffcfff3ff1300edffe9fff6ff0600eaffd9ffe2ffddff010008000200d4ffe5ff0100feff03000f000200f3ff0100
02001200f2fffdffe9ffe5fffbfffafff1ffecfff3ffdefe05001d00ffffefff01000800b8ff1500ebff05002d0004001d00e5ff1d0043ff0400fbff2300e2ff
370008000d00faffafffeaff1500e8ffecffe6ff26000000eeffecff11000800030015001000d5ff0000daff02000500b1fff7ff170000000e00e6ff0c000f00
1900f6ffc5ffeafff2ffebffe9ff1000eeff350013000800fbff05000700fbfff2ffe8ff51ff0700a3fff1ff1a003a00edffc8ff0000f2ff0e00f0ffe0fffaff
fbfff8ff20001200f2ff0300e6ff1500f9ff12000b00deff0000ffff4900e7ff0500e2ff0300ebff0700fefff7ff080014000200fffffeffe7fff4ff0f00e1ff
0600feffdfff02000b00d3ff1600a2ff12000c0008000200f5ffe1ffe7ff20000a00f5ffb5fff1ff0000efff0a001100f2fffcfffdff11000e00e3ff2effecff
4dff1100efff000019003f00eaff17000e00ecff1000fdff0800dcfff6ff1300fcff0900ffff00000400060020001c00fbff06000f00dbff15000200e7ff0d00
feff0000ecff0300f4ff1d00ebff0e000300f0ff0400ebff11ff0d00edffd8fff4ffddfffefffefff2ff0100cbff11ff140004003f002000efffe8ffc7fff5ff
cbff0800cefff7ff0100d8ff0e000e000d0001000b00e8ff0400daff0f00eaff01000200e2ffdbffdeff0f00efffefffecff0e00ffff00000200effffdff0800
ebff1200f6fff9ffeffff0fff8ff0d00faff2b00eaff2c00ffff16000400000009000900a0ff1f00ffffe4ff1e000b001700ecff0c0097ff3700f9ff1d00e3ff
400033000300dfffbcffe4ff1700e8ffe7fff8ff2900ebffe0fffdff0d000a00fbfffcff0900d4ff0e00f6ffffff0400b0fffbff0b00ecff1c00e3ff02000e00
0e00f8ffc0ffddfff3fff1ffffff1200e3ff04ff0c001800f4fffcff2700fbfff1ffe3ff61ffe8ffadffeeff1f002a00ebffd8fffcfffeff0400eaffddff0100
f6ff00001c003700eeff1400f1ffb8ff030001000c00fcffffff00005100dcffedfff0ff0500f1ff0c000b00f9ff12000e00f9ff19001400d9ffedff03000900
0a00f7ffdefff4ff1600d7ff0f00c1ff04000000f7ff00000800f6ffe8ff21000500f6ff2200eaff040009009eff1600e8ff0f00fbff02000c00d4ff2bffe4ff
54ff1c00e9fffdff14004400e9ff1c00f7ffdeff0600f3ff1a000a00fbff39001100d7ff0200f9fffdfff5ff19001800fcff0a001000f3ff19000100daffffff
f5ff1600f8ffffffd9ff2200efff0a00faffe6fff9ffeaff49ff0300e4ffd8ffe6ffddfffaff0500e2ff0600cdfffffe0d00feff3c002d00f6fff8ffc3ff0500
240005000b00f5ff2f00dfff19000a00e7ff0c0001000600faffe1ff0c001600e1ffffffeaffd2fffbff0100fdffeaffecff1000000004001700edfff3ff1300
04001500edffecfff9ffebff0200fbfff0ffe3fee5ffe4fff1ff0c000500e8ffeeff0b00aaff1b00ecff0500160008001100dfff290089ff1500f3ff1e00eeff
430006000e00f0ffa4ffeaff1800e2ffe9fff2ff2000f7ffebfff6ff0500f8fffafff8ff0c00ccff0600f1ff00000900a4fff8ff15000a001c00ebfffbff0100
1300f0ffb9ffd8fff5ffe6fff1ff1800efff33000c002200fdfffdff0600f1fffcffefff61ffffffa3fffcff2a0038000c00ceff01000a000d00efffd7fffaff
f7fff7ff1f000f00efff0900e4ff08000d000a000000e8ff010004004f00f0ff8cfff1fffdffe7ffdaff1100f4ff1a002200f4ff1a000700e8fff7ff0700fbff
06000c0000000b000700d8ff0b00e2ff0d000800f6fffffffbffe9ffe5ff1e000000e9fff5fedfff1500eeffc1ff1800f9ff0000f9ff06001300ddff2cffefff
bfff07000c00070013004500e4ff0f001500e0ffeffff3ff1700effffbff030009001c000b00f0ff0a0007001e001d00000009000300f9ff0a000600bbff0d00
fcff0200f5ff0000faff1500eeff1900feffedff0200efff81ff0e00eeffdbfff3ffdfff04001600deff0c00c6ff01ff2100110039002900eeff0600cfff0800
0c00feff0300fcff1600d7ff28000900fdff00001e000100f8ffdaff0400fafffaff0800e1ffd0ffdbff3000eafff4ffe3ff0c00ecfffeffecffe7ff00000500
f6ff04000400edfff7ffe2fff9ff1200eeff2a00ebff2100fdff0d000700f9ff12001900cfff1600f8ffeeff0c000b002300eaff2a00a1ff3600e3ff1600e9ff
420002000500f9ffc0ffecff0b00e9ffe2ffe7ff2400f9ffebfff8ff11000100f7ff0f000a00d1ff0b00ecfffcff0900a7fffcff2100ecff1a00e9ff00001100
0700faffb8ffe3fff3fff0ffffff1900e9ffd4ff05000b00f2fff5fff7fffeffe4fff1ff5efff6ffa5fffaff3c0035002100e3fffffffcff0a00feffd9fff5ff
e6ff0e0015001c00eeff0c00ecffccff1600f5ff0d00fcff030002005000d1ff0500f7fff1ffe6ff07001100fdff19001700f4ff13000b00d6fff0ff0800fdff
0e00d0ffe9fff1ff0c00dbff08000000f9ff0800e2ff0600fdfff9ffd6ff21001100ecff2300e5ff0f0005007ffe2400efff05001500f8ff0c00daff2bffe3ff
a9fff6ff0700000013003e00e3ff1500fafff4ff0600f4ff0f00f4fff7ff180004001c000000f7ff07000c000d001400f6ff08001800f6ff16000d00d2fff7ff
fdff1d00f0ff0700e9ff0900edff1b00fdfff3ffe8ffecff80ff0000e1ffd5fff6ffe3fffaff1200eeff1b00c8ff01ff0500fcff37002d00eeff1100cbff1700
2200feff1200f6ff3100d5ff72001400ecff060025001400fcffd5ff0c00fbfff1ff0e00d8ffc8ffefff1900f9fff2ffe4ff0d00040000000700e9fff5ff0a00
00001d00fcff0800f7fff4fffcff0200faffb7ffeaff0b00faff17000a00e4ff02001700daff2a00fcff0a0006000a002100e6ff2a00a1ff0000edff3400e9ff
42000f001400e6ff9bffebff1a00eaffdeffecff2200f5fff4fff4ff0800fcfff5fff5ff1400c8ff11000300f4ff1700a6ff00001000efff2600e8ffffff0d00
0100efffb6fffdfffcffe9fff8ff1700ecff1f000c0014000000feff1600f6ff0100efff52ff050099ff06002c001f002700edfff7fff1ff1000faffd4fffeff
fdfffdff0b001200e9fffcfffbff11001a0003001100f8ff020009004d00e6fff4fff2ffecffd0ff01000900120013003e00f9ff18000f00eefff1ff1000e5ff
efff1700e3ff0a00ffffd9ff0900edff0a001a0001000600e8ffecffebff22001000daffc4ffecff3500010091ff1f001f00f4fffaffebff0f00e4ff82fff5ff
aaffffff0a00e1ff11003800deff0300f1ffebfff7fff7fffcffe5fffcff170004000800f2ff08000500080018000600defff4ff1000e9ff0f000c0028001900
f6ff1700c9ff0d00e9ff0400cfff15001c000000ddffecff96ff0500f2ff17ffd7ffeaff0a000000e6fff6ffd0fffbfe1c00e0ff3a002700d9ff1300c5ffd9ff
10000b000d00fefff9ffe0ff1a001000f6ffecff17000800eeffc3ff0000f3ffe5ff1000d2ffc8ffe7ff2500f2ffedffe3ff0e00fbffebffb1fffbffefff0000
0a000b000b00daff0500f9ff0000110011002700f2ff3a00fdff0c000600e1fffeff1600f7ff1e00e9ffffff0e000000fdfff3ff2600c2ff0000d5ff1e00eaff
3800fdff05001000d5ffc8ff1500d5ffd7ffcaff2200ffffd9ffe9ff1800ffffe8ff19001a00edff05001600dbff1000b4ffeefffcff03002500e6ff02001000
0500c8ffc4ffd2fff8ff0d0008000d00e2ff1a000c001500f0ff02000f000600e7ffe8ffa8ffe3ffc1fffcffe3ff10003500fbff0200f9ff0200eeffe9ff0e00
eeff040007000700ebfffcffeaff3e002200e9ff2500f2ff090000004900dcffe2fff4ff0800f4ffecff1800d7ff2d002500f1ff0600f7fff3ffe4ff0d001200
e7ffd9ffc9ff19001500dbffe6ff09000c00f5fffbffeeff1700eaffe9ffeeff1400f6fff8ff13001700e7ffafff390002001a00fbff4800e9ffd3ff86ff2b00
d0ff03000f00f0ff0e005100deff17001300c1ffddffe5ff0000f0fff9ff12000d0008000800ccff0100d8fffeff1300e3ffffff0c001d00a2ffe4ff22000000
f9ffb6ff0f000700c7fffbfff0ff1600c6ff1200aeff3d0078ff0300f6ffe2ffdcffebffdbff0c00efff0c00defff2fe25000c003e003b00fbff1b00afffd1ff
0500e5ff010001001700cbffffff1e00e6ffedff00000c001100f7fffcffecffe0fff6ffbfffbffffcfff5ff0e00d1fffcff0f00030082ff0500070007001200
edff0000f8ffecffe6ffcffffaff1300f7ff130029002300150006000d0052000c002100d3ff170018001700150006001d00beff1f00d2ff0900efff0a00daff
30000700fdffe5ffbcffd7ff1000d2ffd6fff4ff4b00ffff5b00ffffc7ff0500dffffaff0d00edffdaffd4fff9ff0d00a5fff4ff1e00ddff2d00dfff10001c00
ffffdaffc6ffe6ff0a00eefff9ff2400e9ff0c0009000a00e1ffb2ff1400e6ffe9ffebff70ffc7ffa6fff4ff0a007cff1b0088ffe2fff4fffafff1fff1ffe4ff
f8ff34001500edffd9ff1d00e1ff1a001100dfffd9ffd6ffedff14003f00e4fff8ff0000e8ffe3ffe4fff6ff0b000d0007002e0014001a00effff6fff8ffdaff
0b00d0ffd2ffe7ff0200d9ff12000000faff0200feff1a00f0fff9ffe5fff0ff0e000d000f0003001e003e00b5ff3000ceffebffe9ff0100ecffddff97ffc8ff
c7ff1800f9ff09001b005100e9fff3fff3ff0100f7ffe7fff1fff9ff04000d00e9ff12000e00cdffc8fffdffe4ff9cfff3ffaaff0e00f3ff93ff00003400ebff
e3fff2ff0000e1ff0100ecffc6ff1200e6fff9ffeffffeff0ffffaffe1ffe3ffc1ffe7ff0c0022fff7ff040086fff3fe1400130044003a00e8ff16003600d8ff
2900efff0100d5ffe9ffd2ff11002500eeff07000b00ffffeaffe4fffffff2ffeaffe7fff9ffb6fffcff1900f0fff6ff0f0017000c000000dffff6ff1800f9ff
1a000500dbffecffe8fff5fff3ffe1fffeff0e0007000f00fbff1100fbff05000200fcffbeff1400eaff060022001200bbfff4ff200049ff17000000dcffcfff
3900fcff0b00edffd0ffd8ff0800d7ffddfff6ff4200ecffd3ffebffe0fffbfff1fffdff0a00dcff0d00dcfff9ffd1ffadffb5fff4ffe7ff2d00e0ff0c00e7ff
feffd3ffc5ffd2fff6ff03001c0030000000180008001600cbffb2ff1b000600f1ffd6ff7bfff1ffb3ff07000e001bff2200abfff0ff10000000f5fff4ffefff
efffe4ff11000f00d7ff1500fdfffaff110006001400d7fff2ff08004e00eefffaff3b000200e1ff04001100e8fff1ffe0ff08000c00f5ff0000faff0900f0ff
0400efffe6ff00001b00deff0000fbff1900d3ff0c0011000a00dbffd7ffeeff0d00fbffffff0a002000e9fff6ff3b00fcff1f00faff0f00d8ffd9ff9afff8ff
d5ff0b000600f3ff1e004d00d8ff1a00080093fffefffbfffeffe2ffecff04000a0000000000e4ff1600faff06000c00b1fffaff14000f0081fff6ff2e000500
fcffe6ffeffff6ffe1ff1900fdfffbffd0ff2600e1fffcff23ff0d00f5ffddffd8ffe6ffe3fff7ffebfff3ffdeff01ff1900050050003f00e1ff060094ffd1ff
0400f2ff0000faff1500d0ff00001400d9fff5ff0900090000001400f1ff00001d00f3ffe5ffc2ffe0ff01003400e2ff140006000b00f8ff0000fbff18001400
eefff0ff2b00f2ffd3ffe9ff0200f3ffcdff1a00170023000900f9ff100016000d001300e0ff2400f0ff1c0020000a000000e0ff1e00eaff00000300bfffddff
3000faff02001200b2ffe0ff2500f9ffd9ffedff4d00edff5b00fbffcafffefff7ff0c001000ddff0600ebfffdffe9ffabfff5ff1100dcff3200d8ff1400f1ff
f5ffdeffc3ffc2ff0000f4ffe2ff2900f0ff1100f5ff1400dfff0b0013000600fbffe7ff62ffd5ffa3ffd0ff0900c9fe2600c2ffeeff12000800e7ff0300f7ff
0000edff0000f7ffccff1f00e8ff16000a00cdffd8ffc1fff6ff1c004e00e8fffffff5ff0600dafff4ff00000c001f00e4ff3200feff0e00e6ffe1fff4ffceff
0400e2ffe9ffd8fffaffd7ff0f00000000000c0000001a000200effff4ffddff230002000400f3fffbfff9ffd0ff3900ebff07001f00ecfffcffd3ff93ffe3ff
c5ff0d00f7ff1b0010005100e6ffefffddff0500f6fff8ffe8fff2ff08000000ebff13001200dbff2200eeff7cff81ff0200afff1100feff99fff5ff2f00e4ff
270006000c00f8fff6ff0e00b2ff1500ebfffbfff7ff00008eff0500f2ffd8ffe1ff00000600fbffeeff130081fff4fe0800000049003c00b1ff0b003a00eaff
2100fafff1ffffffe5ffd4ff0b00f5fffbff07000f000100f6fff8fff0fff3ffe0ffeffff6ffb9ffe6ff1400f3fff7ffe6ff05001600e0ff1900e7ff2a000300
08000a00eefff0ffd6ffdfffe1ffecff1300f1fff0ff0c001f0015000800e8fffdff0000d3ff1000feff0f0032000a0040ff03001b003dff18001700ebffbfff
330013000800d9ffcfffcdff0000f7ffdaff06004500eeffd4fff7ffeafff6ffefff00001000cfff0b00e9ff0600e6ffb3ffdbff1200e2ff2500d7ff1000efff
e7ffdbffcbffbefff7fffcff31002c00e5ff1a000d001c00d4ff1e0011003800efffd5ff6ffff2ffadff0c0017005fff2800caffe6ff01000e000400fafffbff
daffe7ff0c001300d0ff18001300ebff0a00fbff0b00ecff000014005500fbff030013000700dcfffbff0f00f2ff1700edff00000100ebffecfffaff21000500
0100deffe8ff09000c00dbffe8ff00001300ecff07000400f2ffd3ffe7ffdbff1e00fffffafffeffefffeeff0500360000001500f3ff07000500d5ff8fff0a00
d1ff08000d00e9ff22005800d1fff6ff0a0094ff1600ebff0100f3ffdeff0b00f9fffefff2ffe5ff1b00f3ff02001000eeff090010000f0078fff9ff27000000
f7fffaffdbfff7ffe1fff6ff12001000d3ff1e00f7ffb4ff78fffbffefffd1ffe7fff1fffcfff3ffebff0400ddff0eff2300070048003900d1ff1c0096ffeaff
0a001400ffff01001a00d1ff0500eaffecfff7ff070000002d0002003000fbff1500e9ffd1ffbfffe3fffcff0000e5fff2fff8ff02001100fafff9ff29000800
f3ff19000000f5ffd6ffeeff0500fbffe5ff25002b001a000300080014001c000c00f6ffcaff1800ebff1100320006000000f4ff2400f2fffdff0f00feffddff
3100f6ffe6fffaffb4ffd8ff1600f6ffdbfff6ff5300e7ff5d00efffedff0200f6ff12001500d1ff0e00f5ff00000f00aeffe9ff1100cdff1900d1ff11001500
eefffaffc7ffd1ffe4ff0700d4ff1f00fbfffefff4ff0200d9fff5ff0800f1fffefff1ff5bffcaffabffceff1a005bff2200c4ffebff120009000300feff1400
250001000400f2ffd0ff1600e4ff10000f00ebffd7ffdfff0a0027004e00e0ff0300f9ff0100e1ff0200feff05000f00eeff3e000c001d00ecfffdff1000d0ff
0e00b6ffddffdaff0800daff0b000600f8ff0700eeff1200e4ff2400e2ffdaff1c000d001700fdff04000000efff3200ffff4400f6fffeff0a00d6ffa0ffe3ff
c9ff0900000027001f005600d7ffdfffe5ffedff0f00f2fff4ff0a00fcff0b00e5ff08004300d4ff2600ebffabff89ffe0ffd5ff09000000aeffebff2a000500
0000f4fffefff6ff0d00ecffbcfff9fff0ff0e00e3fffbff77fffcffceffd6ff0200f9ff0d00edffe8ff030074ff45fff4ff190055003a00f1ff19003200f6ff
17000100f4fff4ff0200d2ff0c0020000500ffff0d000900ebfff3ffedffd3ffd5ffc0fff8ffbfff1b000000fafff6ff000013001500feff1500efff15000b00
0c000c00edfff8ffddffe0ff66ff010017000a000c0001001f0007000600ffff02000c00c6fff9fff7ff190023001000b9ff020019003bff190010006affc2ff
2e001000f8ffe9ffc9ffd2ff03001900d9fff6ff4700fdffd1ffedfffdfffdfff2ff03001500defffbfff9ff07000c00aaffb2ff2f00cfff2200d4ff08000700
f4ffecffc7ffcfffd8ff0d0044001b00efff1900eeff1100d9ffd8ff05000d00edfffaff60fffbffaaff13000e0017ff1100a1fff1ff100009001a000700c9ff
f4ffccff14000700dbff12000700f1ff0e000b002200d9ffe6ff0c004100f0ff050085000000d1ff1100d4ffe5ff0a00eeffb5ffccfffbfff9fff6ff17001700
ebffeaffebfff3ff1c00ddffdcffe4ff1600e7ff0700030007001800e8ffd5fff9ff0000feffeaff1f00e5ff06002c00f6ff4200e9ff4a000900e0ff92fffaff
d3ff0c000600c4ff19005500deffecff2c00d0ff0c00eaff0500e0ff2b000e000600ffffe9ffe5ff1800f2ff090016000d000b001100dfff81fff3ff2900edff
fafffcfff7fff1ffdcffe5fff3ff0800e8ff0f00f6ffeeff8cff0600e6ffeaffe9fff1ff0000e7ffe9fff9ffe0ff0eff11001f0042003200c2ff0c00afffd9ff
eaff0600000001002100c3ff11002300e6ffe9fff6fffffff7fff9ff0000f7fff3ffc8ffe1ffc6ffd7fffeff2800e7fff9ff1c000b0010000800f9ff15001300
dbff10000b00ffffcdffd3ff4000fcfff9ff14002900160014001200fbff040011001400baff020005001a002c000b001a0000001a00e1fff7ff110084ffddff
3000f0ffd4ffe9ffb4ffd9ff14000200eafff1ff3e00f1ff5400f2fffbff0400e0fffdff0b00e4fff9ffe4fff1ff1200adffffffd8ffdaff2900d3ff17000000
0800edffc1ffb6ff0a00dfffe9ff1900f9ff0d00c8ff1000d8ff1100fafffafffeffeaff5effd4ffa4fff0ff21005dff1800bafff0fff7ff060005000b0049ff
000004001300f1ffd7ffffffe1ff01001000eaffe2ffeafffcff0f004d00d9ffffffe2fffcffe0ffecffeeffffff1000daff1e00ffff0500e2ffe9ff1300daff
2800c2ffe8fffcff1a00daff0200f2ffc8ff1f0004001c000000e3ffe1fffcff0100f8ff100007000b005f00faff2f00dbff09002c00e7ff1100d6ff7effe1ff
c1ff1100deff2e0002005a00e5ffe4ffedff19000500e8ffeeffd3ff05001800e5ff3100f3ffd4ff1500f9ffedfe8cff0000ddff130007009eff0a0018000200
01000300fbffdeff3400cfffc3fff1ffecfff7ffeffffdff78ff0e00d5ffe4ff0000f5fffcff1000edff120093ff14ff14002000400037000b00fbff3600dbff
d6ffe5ffdcff6b000b00c9ff1c002400f0fff5ff22000100e9ffddfffcffd5ffe1ffc3fffbffc9fffafff5ffd1fffcff14001e000e00f9ff2000090013000a00
faff0400cfffd9ffc4fff4ff36ffc8ff0d00f8ff0a00050008000400f8ffe1fffeff1c00b1ff1000d2ff0b001f00ffffffff19001c004eff0700190082ffc9ff
2f0022000400e7ffd1ffd4ff0000f8ffd9fff9ff42000500deffe1fffaffffffe9ff0d000800f6ff3100defff7ffedffacffebff3300e5ff1900d8ffeaff1900
0600f5ffd2ff60ffbafff8ff57002900ebff300030001e00e3fff5ffebfffbff1100f1ff5ffffbffb1fffcff2100efff0f00c7fff0ff25000e000200eeff0b00
f3ff050018001800daff1a00e2ff140010001e001b00e0ff04001b00420007000100d1ff0a00f0ffffff0b00f7fffffff9ffa6ff050001001200050007000300
1c00e7ffd9ffe5ff0c00d2ff20000200cfff2000efff1f000500d7ff0400feff0000f6ffd8ff0300faff0f00bcfe2100f7ff0000fbffe9ffd5ffe1ff8effe0ff
84ff1b00f7ff15001b005800e7fff2ff01000d000a00f8fff0fff5ff0b002500dfff2a001500eafff9ff0f000d00a1ff0e00faff150014007cff1a0027000000
4000080028000c00deffe2ff090057fffaffe6fffbfffeff82fffaffd4ffddfff1fff4ff0e004400d4ff0c0087fffffe1300100042002600f8ff0e003700e3ff
2200edfff2ff3900f3ffcfff0f000c00f5ff0b001400e0fff4ffecff4600dffff9ffeafff5ffc3fff3ff1900ddfff7ff000019000b0017000a00fbff19000500
07000800eeff0a00e6fffbff0200feff01000600feff0d0008000f000b00e7fffdff0100c5ff1300daff120027000c001400efff0f004bff24000b00e9ffc7ff
3e000f0022000200d5ffc3ffffffe5ffddff09003a000900d0ff0100ecfffeff03000f00b8ffdbff1100e6ff0500edffb0ffffff0500e8ff1d00daff02001500
0300ebffc9ffc4fff2ffefff34002f000b002a000e000d00dbfff2ff1c003a00ebffffff71ffefffb5ffe7ff0c00eeff200066fff5ff040004001700e1fffcff
e2ffefff11001f00daff23001000adff120008001900fbfff3ff19005a00f7ffecff2d000300efff09000900f0ff1500f9fff3ffeffe0a000600eeff16001600
eafff6ffd9ff03000a00e2fff3ffffff1600feff0000feff2700d9ffc6ffeeff0400f9ffecfffaff0500efffbbff3600f1ff0100f9ff3000e6ffd7ff9aff0600
d8ff0f000a00efff08005000daff0000fcff9fffeeffedff1200e2fff0ff0b000600f8ff0700f3fffcffe1ff0e0014003d00faff1400100090fffaff2d000e00
f0ffc2ff1600d2ff0e000b0000001100e4ff1100e0ff1b007bfffaff1300dcffc6ffe9ffe9ffeeff09002100e3fff4fe2d001b0048002e00daff0d0094ffdbff
fdffe8ff0c0002000e00d1ff01002000d7ffebff0700f5fffefff7ff1e00f4ffecfffaffd9ffc8ff04000e00feffe0ff090017000d0038000d00f3ff12001100
c0fffdff0b00e7ffe0ffe1ff16000600fdff12001c002300230023000300420012001600d2ff220000000e00100006001b00ceff2300f2ff0c00fbfffdffd5ff
3700f8fff6fffeffb5ffdfff0000f1ffdbfff3ff4b00f0ff5a000000e3ff0000020007001200d5ff0700e1fffbfffcffb3fff7ff0d00ebff2000d7ff2100f5ff
f7ffe7ffbdffc4ffe7ffeeffe2ff26000e000b00faff0f00d8ff1f001400f8fff3ff100069ffbeffa4ffddff0500aaff2400dafff8ffeaff0f00faff04000000
000031001c000600d7ff0e00eaff25000f00edffe1fff0ff020027005b00ebff0000f9fff9ffd8ffdeff050000002e0003001f001d002400030000000400bbff
1400ddffe8ffe1ff0b00d3ff1e00fdfff8ff2800faffffff2a00d9fff8ffebfff4ff04001600f5ff00003500aaff3200dbfff0ff0b00eefff4ffd9ff8fffe7ff
d0ff1900f8ff150017005400e2ffedfff3ff0d00f3ffdeffeefff1ff01000900eeff19001500e6ff03000c00faff9eff0900adff1b00e3ff9dff17003200ffff
35000d0013000600f7ff0000c9ff0e00e3ff0000f8fff9fffdfe0700fbffdfffdafff4ff1d00fefff4ff080087ff09ff0300060040003a00f0ff02003d00fdff
1b00f4ff0000fbfff1ffd0ff0f001d00f7ff02001500f4fff6fff0ff0a00f3ffefffebfff6ffbdffedff2000f1ff0600e1ff1c000b00f7ffffffefff26000200
0d000a00eafff3ffe5fff2fffdfff1ff0a00fbffffff140020001900130004000200f5ffdaff1800e6ff1b00260008008cffe8ff1d004bff1c000800fdffcaff
3a000f001200f5ffcfffc1ff0a00e4ffdefffeff3d00e4ffd2ff0200f1fffcfff6ff1100f7ffdeff1300d7ff03000000a7ffa3ff0e00e7ff1300dafff1ffebff
f9ffddffc9ffbdfff0fff5ff2f002f00fdff1f0004001a00d8ffd3ff1c004300f0ffc4ff74ffe7ffb9ff0b001500b9ff1300d3fff3ff16000b000200e8fffcff
dafff4ff11001200d9ff000003000500100006001100e0fffcff1a005700f8ff070032000900e1fffcff1600e3ff1200f0fff1fff6ff0200fbfffaff18000400
ffffecffebff0a001e00deffefffffff2000f5ff060010000a000100c4ffe1ff1900f9fff4fff1ff2700e1fffdff3500f4fff8fff4ff2000f8ffdcffa1ff0c00
d6ff0c000400e3ff23005300d3fffcff10009cfffffffaff0800eefff3ff0700f5ff1500fbffe8fff2fff2fffeff1400acffffff1800000069ff200029000100
fbfffbfff7ff1100f6fff0ff05001000d7ff4500f4ffbcff1ffffdffe9ffd9ffdeffecfff8ffeeffe8ff0700d7ff0fff1d00feff4c003a00cbff200098ffc9ff
0a000000000000001200d2ff00001b00f0ffebff070007002900ebff2d00f3ff2500eeffc9ffc2fff6ff0d003d00f7fff0ff020010000c00f6fff1ff25001300
f9fff7ff2b00e3ffddfff2ff0b000000f2ff1c0023001e001700f8ff0c0019000d000e00cdff1e00d1ff17002100fbfff2ffe3ff1f00e1fffefffcfffeffd7ff
3300f0ffebfff2ffaeffcbff1a00ecffdbfff2ff4b00d2ff5b00f4ffe9ff0000efff16000f00daff2500dcff07000600b0ffeaff1400ccff1100d1ff0100fcff
f1ffe9ffc3ffc6fff7fff2fff5ff2c000000fefff3fff8ffdaffe5ff1b00e6fffbff03006cffcdffa5ffd1ff1f00cdff2400c8ffeaff16000c00f7ff02000600
0400f2ff03000300d2ff2800e6ff03000e00c9ffdcffe3ff000029005300eeff0300f5fffcffd0fff5ff0b0000000c00f0ff410011001100e5ff04000300c1ff
1300c2fff6ffdbffebffd9ff16000300020010000b002000d9fff3fff5ffd0ff0800f7ff1100fbfff4ff0300f2ff3200f3ffc7ff1d0001000000daff8efff1ff
c9ff1b00f1ff28001c005a00e5ffefffe1ff11000e001600f2ff050000001600d8ff07000d00e0ff0600fbffa1ff8bff0700c8ff1700e2ff8fff2d002d00deff
f9ff03001900fbff0d00f8ffb8ff0000ddff09000000000087fffcffe3ffd7fff9fff8ff1600f2ffe4ff18007bfffdfe14001f0049003d00fcff16003c00e6ff
1a000400eeff1200ebffd4ff19000c00ffff000010001700f2ff0700f8fff9ffdbffc8ff0200bffff5ff120000000000f0ff1a001500f3ff1400e2ff1f001500
0b0018000200f2ffe2ffecffccfffcfffdfffbfffcff000024000c000e00070004000100cbff0f00f5ff15002900070052ff1000140046ff18000c0097ffc6ff
34001e001200ecffcbffcaff1300fdffdafffbff4b000000dbfff3ff0100fbff0e000a001000e3ff1500eeff0e000b00b6ff94ffe8ffd9ff0e00d7ff1b00f7ff
e1ffe8ffc7ffccfff8ff0f0041002f00ecff1c00f6ff0f00daffe6ff06001000fcffe3ff6bffe5ffb0ff17001300eaff2300b5fff5ff04000a00100009000100
e6ffdbff10002000d4fffbff0a00f2ff14000f001d00ddfff1ff19005b000c000b007f000100cbfffdffefffeaff1000edffe3ff0000f2ffeeff08001f001c00
f2ffe8fff1fffaff0500dafff6ffeeff1900020003000c00e7ff2b00f8ffddff0300fefff7fff7ff2f00efff09003400faff1700fdff32000900dbff98ff0a00
d1ff0a000800cdff0e005b00dbfffcff2a00baff1600d5ff0f00ebff5200050008001200ecffe7ff2000f8ff26001900bfff05001b00f5ff7ffffbff2a00feff
f6fffdfff8fff0ffd1ffe2ff01001f00dcff16000400f7ff91ff0b00e9ffd3fff9ffebff1200f4fff5ff1300e1fffdfe24001d0045003c00c7ff20009bffdeff
f8ff1500feff08001800c4ff08002000edffeefffaff09001000f3ff1c00e8ff1500dbffd5ffc8ffebffdeff3200f6ffe8ff10000f000800faff00001b001300
c4ff19000700fbffd7ffd7ff1f000b0010001d001f001c0009001b0008001c001100e7ffc5ff0a0018000c0026000900080011001400e5ff0e001b00bdffd9ff
3c000100d9ffd7ffbbffccff0a001600e0fff1ff3f00eaff5d00f3ffddff0800faff06001000e0ff0a00f6ff05001f00aeff0c000e00e0ff1500d5ff1d000300
fafff5ffcbffdafff9ffffffe5ff22001600f4ffeafff5ffd1fff9fff9ffeeff0100efff4effe2ffa8ffbaff1600e7ff1200cafff7ff06000a00000008000c00
4100ffff0c00f8ffd5ff0a00e6ff0d001200f2ffe9ffddff190007005500e6ff0600f1ff0200d9fffaff040008000900deff3a0013000d00ebfff9ff2300c6ff
2100d0ffecffe1ff1000dfff0500fbffcaff0c0000001a00110056ffe4ffdcff0b00fdff1000080005002600f6ff3100e3ff70000100fdff1600e2ff88ffe9ff
c2ff1400c5ff110018005800dffff5ffecff0d00fefff4ffebffefff13001100e4ff1e00f9ffe4ff0b00f2ff61ff87fffdffe1ff17002400cdffffff2e000100
edfffefffcfff3ff2f00adffcbff1900e9fff8ffeeff060091fff8ffe1ffd5fffcfff6ffffff0300d1ff2f008aff1fff28001d004c00390016000b003700eeff
e0ff0b00deff5900ffffc7ff110005000300eeff0d000600ebffeeff0600f2ffe7ffccfffdffc7ff0400f3fffeff0300ecff28001000e6ff1800e9ff00000400
05000400e9ffd7ffc8ff02006800eefffcfffeffeffffdff15000f000000f2ff0d002f00b7fff8ffd3ff1a0045000000feff20001a002eff0f002300b5ffc5ff
2f001c000900f2ffd2ffd5ff02000a00e0ffffff49000e00d3fff2ff09000200e1ff02000200d6ff150004001200f2ffbdffe9ff1700e5ff1d00daff1d001a00
e7fff0ffc3ffd9ff1600190064002900e4ff200021001b00e5ffddff160008001000f1ff41ffe2ffb4ff25001200a6ff1600c1fffcff3f001900ffff1200c3ff
efffedff15000c00d7ff0000f2ffeaff0f0014002400d9ffeaff1a0060000a000e0024000400e2ff0000fbffe6fff1fff4fffeffe5ff06001000faff31001000
dafff6ffe2ff05001700deffeeffe0ff27000a000800030036000f000800f2ff0f00fffffdffa8002500f8ff0b0032000300f5ffe8ff05001b00e2ff84ff0a00
b9ff1400f3ffe5ff1b005500dbffffff0800d8fff9ffc8ff1300e3ff00002a000500bafffaff00001800f5ff200019001b001b000b00f7ff8bff1f0033000400
0000feffe0fffbff5eff1a00ecff1a00fbff03000200fbff52fff6fff5ffdeff0800e9ff19000300e8fff6ffe0ff08ff1c001b0045003b00d1ff060094ffe9ff
21fff8ff130008001800c8ff0c003100f5ffdaff000005000a00e8ff0a0009001f00f6ffe2ffc6fff4ffccfff3ffd5ffecff1a000b0007000800020016001200
f9ff2c003b00feffd1ffd9ff59000d00feff1d004900e9ff1e0002000a00020019008200acff1d00f9ff15002d000c00330000001600c0ff13000d00feffdbff
3800f5fff9fffdffb0ffbdff18000b00dcff02004300fbff5d00fcfffbff0000100002000900d3ff2a00f4ff00000200b3ff00000e00d0ff1e00dbff13001e00
fdffeeffcfffe6ffaaff0200a5ff24000a00ffff01001c00ebfff4ff0a00e4ff0100f4ffa1ffe8ffa7ffa7ff1f00f3ff1300bfffe9ff15002600040014000900
42002b0016000800d5ff0300efff0b001700c2ffdcfff4ff16001a005400f1fffdff0000fcffe2fff4ff000009000d00e7ff420014000200fbff04000500e6ff
0d00efffe1fff4ff1400dfffeaffefff1d001100050006000b000100d3ff06001200ecff2afff7fffeff000000003700f0fffafffbffffffedffdaff8fff0100
c6ff1600fdffefff1d005000ddff18003900a6ff0900feff1400f4ffe8ff14000300cfff0300ebff2700f8ff220013000f001b001700e3ff6bff090021001700
ecfff2ffebff2f001600e8ff30002600deffffff0800050080ff0100fdffe2ffe1fff1fff7ff2500ffff1100e0ff02ff270010004c003800dfff11009bff0000
f9fffbff100000001d00d0ff14002300ecffdfff03000c004b00f8ff14000800f6fff4ffe4ffc4ff13001c000800e9ff0d00f7ff03001b0001000300fdff0900
eeff14001000dcffcafff1ff170017000700deff230029001c000e000e0013000a000900c0ff1d00dcff25001f0007002000d9ff1000e9fffeff00000900dcff
30000200b4ffffffb7ffddff0100f3ffdffffeff4200e7ff5d000000f8ff0600080005001500d7ff1500dafffafff0ffaefff6ff0e00e5ff1d00d4ff1f00ebff
0600f1ffc4ffc7fff3fff9ffe6ff2900fcff120000001500dbffecff1b00fbfffbff1d006fffe2ffa9ffe1ff1c00f3ff2400f4ffefffedff0e00080000000000
01000e002400f4ffd6ff1700e9ff05000a00fdffebffe7fffaff31005500f6fffcff01000500d0fffcfffbff0e0015001300140017002200f9ff00000200d5ff
0f00e0ffe8ffdaff0900d4ff2f000300d3ff2300f5ff2b002b00e6ffe3fff9fffafffdffe4fff2fffeff0300dcfe2e00e9ffffff0500f5fffeffdcff88fff6ff
c3ff1600f7ff230013005600e0fff1fffefffffffcfff8ffeefffcff03000100e6ff0a001600e4ff13000800fcffbbff0d00c1ff1800f8ff97ff1d002c00f4ff
660009003000d5ffecffe4ffb7fffcfff3ff0300fafffaff83ff0a001400d3ffebffeeff1400f8ffe3ff080089ff19ff0400100044003900eeff0d003a00e7ff
1f00edfff3ff2a00edffd5ff1b001f00fdfffeff06000f00edff0000f2fff3fff4ffebfff6ffc7fff5ff1700ebffeaffffff1200140000000e00fcff23000b00
12001100e3fff0ffe4ff0c000400f5ff0100f6fff3ff0f0020001c001700f9fffafff7ffd4ff1900e9ff0c0027001600e5ffeaff13005eff2a00fcff0000ccff
3f000e001f00e2ffd2ffc9ff0a00deffdaff0d004600e7ffd5ffe9ffedfffafff3ff040096ffe5ff0e00e7fffffff4ffaaffe9ff0c00edff0e00d3fffbff0b00
0500eeffcdffcdffebfffaff2a002e0006001d000a001100dfffdfff15003c00f4fff1ff7cfffeffbcffe7ff1800e6ff1800bbfff3ff23000c000f00ecfff9ff
e5ffeaff16001f00d7ff16001100ceff1200080012000600feff1b00620007000e003e000100dcff07000d00e7ff3900fbffebffcfff0500e7fffbff1c002d00
e1fff2ffe9ff04001000e0ffdeff00001200fdff0500ffffd7ffdfffcbffedff0e00efffedff0400e8fff6ffc0ff3600f4ff2000f2ff4100f1ffd6ff92ff1500
d6ff15000200f5ff24005300dafffdff0700adfff3ffdeff1600e2ffe6ff0e00fcff0000fffff7ff2800f8ff08001b00320012001d00000066fff4ff21000700
eeffc7ff0f00f1ff1100ebff2d001b00deff4900dcfff2ff74ff0a000a00d0fff0fff3fff2ffe1fff0ff0a00e1ff22ff24001b004a003300e4ff270095fffcff
0d000000000004001400d6ff06002b00e1ffe6ff01000a002a0000006a00e8fff8fff0ffbaffc7ff09001f000d00fdfff4fff4ff0e00e7fffefff8ff24001800
cfff0500fefff1ffebffe5ff1600000005001600230021000d001e001a003f000c000d00d1ff1900110010001a0007001d00e4ff1c00e0ff0000f8ffe3ffd9ff
33000300dfffffffacffccfff9ffeaffdefff4ff4c00efff5e000700e6ff0500f5ff27000f00daff3700e0fff3ffe6ffb4fff2ff0e00e5ff0900d1ff20000000
f6fff1ffc1ffc2fff1fffdfff2ff2900f9fffeffedfff9ffd7ffe4ff0f00ecfff7ff32006dff9bffa7ffddff1600eaff1b00e8ffe8ff09000e000200f9fffeff
feff1d000b00f7ffd5ff1d00eaff1a001100f2ffe4fffbfffbff21006100f7ff0000faff0000d6fff9ff0100070008000600210023002100e2fff4ff0300c9ff
0900e8ffe6ffe5ff0000d8ff2400fafff1ff20000200fbfff9ffd3ffe0ffedfff9ff01001200fefff9ff4800b0ff2d00f3ff03000600f1fff2ffdbff87ffeeff
d1ff1c00f0ff15001e005900ebffbdfff3ff0e0003000e00dfff0b0000001b00e1ff14000f00e5ff03001200f7ff9bff1000b1ff1f00faff8ffffeff28000200
05001000290004000000dfffd5ff1c00e3ff17000000f7ff2cff0c00efffe0fff0fff6ff1600f7ffe0ff070080ff15ff15001a0043003c00190013003c00efff
1b00eaff03002100fbffd4ff12002800ffff06001800f7fff7ffc5ff0100e9ffe3ffd3ff0700c3fff2ff1900f1fff0ff0c0025000b000500ffffedff29000f00
00000000f0ffeaffe6ffe2fff5ffc7ff0b00fcfff3ff0c004c002100130009000600ffffcbff12009eff100026000d00cafeefff0b0043ff1e00fbfff0ffceff
3c0010000e00ffffccffbeff1d00efffd8fffaff49000100d1ff03000300010002001000feffe1ff2100f5ff0100f0ffadff0400f0ffdffffeffd8ff24000d00
f6ffe7ffc5ffceffe8ff0900300034000200180002001a00deffe4ff03001100effff2ff66ffd0ffb9ff1e001200e1ff1a00cdfff9ff100011000700f3fffcff
f1fff6ff09001500d3ff0f00fcffffff110012001b00d0fff0ff1d006100faff070081000900e3ff0800eaffebff1200f2fff2ffe1fffcffebfffaff0d000800
eaff0200f3fffdff1300e1fff9ffeeff0b00ecff01000200e5ffe8ffdaffe1ff10000b000100f4ff4400f1ff01003300f5fff9fff8ff24000400dfff92ff0000
daff0800feffdeff10005700dcff02001e00b0ff0600f1ff0400ecff5d00f8ff0200f4ff0a00e0ff1900f5ff2f001d00fbff25002500edff81fffbff26000400
f0ffdbfff5ff0000e8ffecffdcff1c00e6ff3b00ebfffeff1effeafff0ffe2ffe1fff2ff0200fcfff6ff0100dbfffdfe17001e0046003a00ceff230097ffc5ff
f7ff050000000c000f00cfff15001f00e8ffecfff6ff110005000e000700f6ff2800d7ffe7ffcaffe7ff1a004c00f4ffe9ff0100120006000f00f5ff12001b00
c3fffaff2e00deffd9ffeeff1d000c00020017002500200014000f000c001e0015000900c1ff1900f6ff17001b0008002900faff0d00d5ff02000100f4ffdbff
37000600d6fff3ffa7ffc9ff12000900daffecff4a00daff5b00f7ffd4ff0000eeff1a000f00deff21000000faff1300b7fffbfff9ffbeff1300d5ff0000e6ff
f8ffdfffc3ffd5fffdff1300e6ff2a0009000300e9ff0000dafffbff0400fbff000018005effcbffa5ffe4ff1800ccff1c00c4fff4ff04000e0001000000ffff
0600eefffeff0f00d4ff2700f9ff01000f00a1ffd7ffd3ff100011005d00faff0200fcff0300c8fff2ff080004001200ffff500002000e00eaffcfff0b00d8ff
0d00e9fff2ffe1ff1500e0ff0300efffdbff140002002a000100e7ffdeffebff03000c000f00fcff16003f00f1ff3000f0ff00002f00f3ff0d00dcff93ffe7ff
c5ff1a00d6ff180010005700e6ffebffeeff180008000600e0fff4ff20001100dcff0d002000e2ff1400fefff1fe7fff0700cfff2200f0ffa6ff18002600acff
e1ff05001000e7ff2700d7ffd2ff1a00f5ffeafff7ff030091ff1200e3ffd7ff1900faff1c000600e9ff38008cfffafe1b001d00490034001b000d003a00e0ff
ddff0900f0ff4300ffffd1ff320033000b00edff07000900efff0600fffff5ffeeffd1fff1ffc6ff00000b00fdfffefff5fff8ff0d00f5ff1c00e8ff07000600
1a0011000100c2ffd7ff080098ffe0fffffff5ffedff010027000f000d00efff02001100b6ff0500faff0d002e00ffffccff1d00200035ff16001e0012ffc9ff
340029000100dcffd2ffc7ff0e002100ddffffff4b00f9ffd4fffbfff1fffaffebff15000500e3ff1c0013000400f3ffafffdeff1300d8ff1a00d7ff16000a00
ecffe9ffcbffdeff0c0012007c002c00ebff1b0020001a00e9ffe8fff1ff0d000000e1ff49fff1ffb4ff24001300f5ff1b00bcff0400eaff10000a000f00f4ff
f6ffefff15000600d2ff26001c00e0ff150005003500eaff130015006400090001000a000a00d4ff0200feffecff0700e5fffcff03000700f0ff070034000300
d3fffdfff5ff0a001200daffecfff2ff1a0002000e000800f7fff3ffffffe2ff0a000400f4ff42003300fcff09003e00f2fffcff000017001500d5ff93ff0800
c9ff0d00feffe1ff14005e00dbff03000800bdff0e00cfff0c00ebff3a00edff0500d9ffeffff8ff0a00fcff25001a000b000b001a00f3ff82ff1a0028000800
faff0100deff06004dfff9fffeff0e00e1ff0000f8fff7ff78fffdfff8ffdafffffff0ffeffff6ffcbfff9ffdeff22ff2500020045003f00ccff0d0099ffe7ff
1cfffcff0b0006001100cdff05002a000400edfffafffeff0a00f3ff1500eaff3500feffaeffc2fff7fff7ff0200dcfff1ff11000a0008000500010026000a00
f2ff1f004500eeffe8ffe3ff4f00f8fffcff11002c00ecff0f000d00140007001d00d2ffb0ff1700d7ff1f001e000e000e00f3ff0a00e7ff03001900f8ffdbff
3e00f5ffedffebffb9ffcfff03001d00e0ff02004c00dcff5e00feff0c000800f1ff04001000e0fffcff0d00fbff2c00a6fffbff0f00e2ff2400daff10000c00
f5fffaffc2ffb7ff0d00e6fff1ff23000700fffff5ff0500e4fffdff0700f0ff0800eaff29ffbfffafffcaff280000001300b7ffffff17001c0002000300faff
4c002e000500f8ffd3ff0000270004001d00a6ffddffddff040029005b00e2ff0f000400fcffd6ff0200050001000f00f2ff4f0016002800e3fff2ff3000ebff
1700ecfff6ffe8ff2800d5ff0d000300fdff1b0004001b000c00d7ffcbfff9ff100009001a002900f8fff6fffbff3200fcff00002d00f1ff1400dfff97ffecff
caff1900e0ff200016005b00defffbfffaff250010001900fbfff6ff19001400f6ff27005500f1ff0900fafffcff88ff0e00dfff1400f6ff91ff1400200091ff
f6ff07001200fcff1800eeffccff1200eefff5ffebfff7ff85ff1d00edffdeffecfffaff23000d00c1ff0f008bff28ff200005004200350008000b004000e1ff
1e00f9fff4ff28000300ceff1a002f000800faff11000400f0ffebff0100eefffdfff0fff8ffc7ff02000500edff0100fdff1a001000fdfffcfff6ff0f000b00
11000a00f8ffd2ffeafff7ffa1fffafff5ff0e00f5ff1aff1d0009001100f6ff0f00ecffc7ff0c00f0ff150023000300feff13000e003dff25001b00ccffc1ff
3b0022001000faffd0ffdbff0800eeffdfff030052000100dffff5ffedfffffff3ff0f000d00d9ff15001700fbff0200adffdeff0700e3ff2300deff12000000
f9fff4ffcaffecff2a002a0055002900ffffe9ff16001c00e7ffe3ff090004000200f8ff69ffe5ffb2ff4000140003001500b8ffe6fff9ff13000b00f1ff4300
fbfff3ff1c000f00daff05003200c9ff16001e002500e3ff000011005f00310005002e000100d1ff1300fdfff3ff0600e2ff0100fbfffeff0100f7ff3800faff
1900f0ffdaffdaff0200d4ff1c00e1ffeeff1e0002001a001300e4ffe2ff0000fdffffff1800f6ffddff0300dbff3400f5fff9ff0b00f5ffffffd6ff8efff7ff
cfff1600ebff230010005800dfffedfff2fffbff1100f1fffeff1f00faff0d00ddff19001900dfff29000a00f5ff8aff0c00ccff1300faff7cff18001800faff
570004000f00fffff7ff0000f1ff26fffcfffaff0300020077ff0000f4ffceff0600f5ff0a003900e2ff0a0094ff07ff1f00150042003d00fcff01003800eeff
2300f0ffebff4200f9ffceff110016000b00fbff0e00fffff4fffeff2b00faffe5ffdcffebffc3fff6ff1c00f2fff2ffe1ff2b001100faff0900f8ff20000100
04001200eeffe4ffe4ff00000800f1ff050028fff3ff05000f0023001800f5ffe3ff0100aaff1a0007000f002c00faffecffe9ff0f0046ff2400fcff0700c6ff
41003a002400d0ffd1ffd2ff1100e5ffd9ff07004800edffd7ff0800f6ff0300f1ff10000700d8ff0a00ebfffefff9ff9ffff9ff1f00e3ff0c00d2fff9ff0200
f9fff1ffcbffd4fff2fff2ff30002e000300d9ffffff0f00e0ff070007004700eeffe7ff74ffe9ffb6ffedff0f00f1ff0700e9fff2ff150008001000e7fffeff
e3fff2ff1a001700d9ff07001200faff0d0015001000f1fff5ff0c005e00000003005100ffffe0ff03000c00ebff09000600f2ff0000fdfff6fff4ff1e002500
08000100eafff2ff1a00e1fff0ffedff14000a000400fbfff5fff5ff020002000900fbff28ff0400fdff000000003600fcff0200fcff1600f8ffdbff9fff1b00
d1ff1a000500f2ff0f005900e2ff04004100d9ff0800e5ff1b00f6fff1ff0e001200d8ff0600edff0700f1ff12001600fdff32001900eaff6dffe9ff1e001500
faff060007001100fbffdbff5b001c00ebff1500fdffe4ff22ff02000c00e1ff0b00f7fffdffd4ffedff1000e0ff18ff1300130044003200e5ff0d00a1fffcff
010005000f0001002100d6ff0a002600f8ffe5fffcff0c0082000d004700fbfffaffefffcbffc9fff3fffbff0a00f6fffdfff0ff0c0011000800040010000500
f3ff0e000a00eeffd1ff010015000300f6ffd7ff24002200130017002100170009001800c1ff1f00e2ff17001d000d001600ddff0f00fdff0100fbff1a00dbff
3e000000b5ff0c00b3ffe2ff1d00e9ffdaff01004900edff67000e0000000900faff0b001600dfff2200ebfffcff0700a5ff04001600ecff0b00ccff19000f00
f2fffbffc6ffd9ffeffff5fff5ff35000000fcff00000600e2ff04000d00e2ffe6ffc5ff78ffd3ffacffe5ff160008001300c6fff4ff0b0013000000e7ff0a00
0400000016001300dbff1600f0ff0c000800f2ffe8fff3ff040022005f00e9ff010003000400cefff4ff0a00ffff0000050017000c003b00e2ffecff0200dfff
0700f1fff0ffcfff0e00d6ff2500f9ffc9ff1d00faff29001000e1fff2fff0ff0100feffd2ffefff0a000700aafe3300d7fff8ff0500fffffcffdaff92fff3ff
c8ff0f00ebff230013005700e7fffdfff7ff000004000f00e5ff0c000a000000dbff1100050000000c001500fdff92ff0600e2ff1900ffff79ff22001c00f7ff
590019006000d5ff0000deffeeff59fff2ff0000f9fffcff89ff0d00ebffdbfffafff6ff0000e7ffb4ff010085ff29ff0f00100045004000010010003900e7ff
1d00fcffeaff3f00feffcfff1b002c000000010012000e00fdfff5ff0e00deffe8ffc7ffffffc9ff1a002200fcfffcff01002800130008000f00f5ff22001200
0d000600effff1ffecfffcfffaff03000000f7ffefff0c001000210016000b00f6fffcffc8ff0b00c7ff0b002a001000acfff7ff0f0042ff2500fafff6ffd2ff
3f0014000000e8ffceffd3ff0a00e8ffd7ff0c004700f8ffd5ff0000f9ff0200f3ff0700bdffe4ff1300effff7fff2ffa9ffa3fffbffe4fff8ffd1ff1200fcff
0000edffcaffcbffeeff040033002d00ffff23000b000900d4fff0ff01002200ecff090074ff0700bbfff0ff140000001900c2fffaff1f000a000c00fcfff3ff
e6ffebff10000d00d7ff18000000e2ff0f0008001500e2fff9ff18006000fdff0e0094000600e4ff0f00e3ffe5ff2200f7fffeff19ff1000ebfff3ff0c002100
b9fffdffecffffff2e00dcffe7ffeeff0f000200060001002800c8ffdeffe8ff0800feffefff1d001500f9ffb5ff36000d00fbfff7ff5f00f9ffddff99ff2400
d0ff0c00f9ffe8ff12005700d7ffbcff3f00d5fffaffffff0900f2ffeeff00000300eaff0000ecfff9ff0100170020003c0019002100e8ff5cff120022000400
f1fff2ff1b00f8ffebffe7fff8ff1100eaff1000e5fffdff7dff01000000daffecffecfff9ffe9ffe9ff0c00e3fffefe3000100048003900eaff190098ffe3ff
f1ff0300020007002200d0ff0e002a00cdffe4fffbff03000300c7ff0f00e6ffeeffdaffd9ffc6ffeffffcff3500fafffdff0d00ffff3400020000000c001800
440008000700f6ffd5fff3fe13001200f0ff120026001600350024001400500014001400b7ff110017000f0008000a003500e6ff1200dbff0100fffff3ffdbff
3900f3ffc3ffe6ffaeffc9fffbfffeffe1fff8ff4400010060000a00ecff0600f2ff16000e00defffdff0000fbff0000a8ff08000300e0ff0800d3ff2c000a00
fcffedffc6ffd2fff3ffffffe8ff2e000f00faffe8ff0700e0ffebff1d00eeffffffe2ff6affa8ffa6ffdeff0700e6ff1800eefff7ff07001200ffff02000d00
00002b0017000c00d8fffcfff2ff07000f00edffdcfff7ffffff20006400fcff0200fcfffcffe0ffe7ff0100020004000400210022001600e9fff0fffeffceff
0f00f9ffe8ffe5fff0ffdeff1600f6ffceff1e00f1ff1e000300dcffe5fff5fff5ff0f0011000c0022007900b0ff3500d4fffeff0700fdfffdffdeff99fff0ff
c7ff1c00ddff0e0012005b00e3fff9fff2ff2000feffd8ffdafff0ff00001a00e6ff19003f00f1ff11001f00abfe85ff1300caff1e000e008bff1e001c00e7ff
efff17000600f6ff0000e4ffeaff1300faffeffffdff0c001dff0a00f0ffd9ff0e00eeff0f00fcfff4ff0c0094fffffe1900290046003b00210004003a00f2ff
d2fff7ffe8ff4d00f2ffdaff160024000800f3ff1200f5fffcfffbff0c00f1fffeffdbffffffc7ffe7ff2300eefff9ff070041000b00f9fffeffedff2b000f00
0f000900f4ffcdffddff00007ffffafffcfffbfff1ff020000001e001200120009000500b4ff1700bfff12001d000900cdff08000b003eff16000c00d6ffd2ff
3c001d001200eaffcfffbafff8fffeffd9ff01004900f0ffc7ff0000fbfffefff2ff0f00feffdeff08000d00fbff0000a5ffa5fffeffe8ff0e00d7ff10000600
e7ffdeffc6fff0fff4ff15003e0036000400220017002100e2ffedff15000a000500000064ffebffbcff09000c00ecff1600d4ff0600260015000500fcfff9ff
ecffeaff12000d00d7ff0e00f5ffe7ff160017002800ebfffeff19006400feff060024000d00e9ffffff0e00e7ff0300efffe5ff0f00fcfff4ff01001f00fbff
ddfff6fff1ffffff2000e0fff3ffeeff18000200f1fffafffdfff5ffe8fff2ff17001000feff31004700fdff08003b000700000004000c000700ddff98ff0d00
ccff0c00f9ffe3ff14005900d7ff0c000c00c8ff0500daff1100e8fff6fff7ff0500cffff6fff2ff110000001f00170013001c002200f6ff77ff0e002100feff
eeff0f00f1ff0a008cff0600ebff1400faff1500dcfffaff20fffefff2ffdefffafff1fffafffbffeeffefffdaff08ff19001e0048004400e0ff1f0097ffccff
1bfff4ff160001000e00d3ff09002c00ebfffafff0fff8ff040010001000eeff2d00f8ffd3ffc9ffd8ffebff3700e3ff02001b000d000c000300f8ff1a000e00
f5ff0d006800cfffebfff8ff1f001700f5ff1a003a00eaff0f00100017000b0016002900afff1d00c6ff2100140007002a00f7fff8ffdaff0a000d00ecffd8ff
3c00f5ffedff0e00adffceff2e000600d7fffbff4d00dfff5f00fbffd0fffdfff2ff11000600deff1700030002000f00abff04000a00d3ff1e00dcff0a00f3ff
f3fff4ffc4ffd0fffaff0e00c2ff31000f000100eeff0700e4fffdfffcfff2ff05001c0063ffc5ffa6ffbdff1400faff1d00d0ff03000f00190000000300e8ff
270029000a001e00d6ff0c001700020019002600cbffdeffffff2e005f00f8ff0a00fbfffeffcefff4ff0d0000001500ecff2a000f000700ebffe3ff1700e3ff
1800f6fff5ffe3fff7ffd7ff0100f6ffffff190002001e000100e5ffecfffcff0800090019001e0018000000f1ff3d00efff07007400fdff0600dbff9bffebff
d1ff1900f1ff160012005600e6fffcfff5ff22000100feffedff000000000f00efff15000400e9ff130000008fff63ff0800e3ff1f00000051ff1b0021002100
deff01000b00fdff31001300cfff0c00f5fff7fffcfffdffa1ff0a00eaffdfff0b000000fbff0600ffff1c0089ff23ff0800100043002f00f2ff11003c00faff
0d00fafff5ff1800feffcdff0f001d000800040014001500f2fffbff0000f3fff5ffeeffe6ffc3ff18001900e7fff7ff000001001000fbff0300ebff07000c00
05001e00f5ffe8fff2fffdffe5fffefff5fff9fff6ff30ff190010001500010009002600bdff0b00f0ff06001d000700fbff000007002aff21000d001300b0ff
3e001e000b00eaffd3ffd1ff0e00f1ffdaff04004600deffd4ffffff1300ffffffff03000900e1ff2b0004000200feffa5ffedff0e00e9ff1f00ddff2400f9ff
dfffdbffc6ffe5fff3fff8ff45002f00f7ffddff11001800f8fff7fffcff05000000f1ff78fff9ffa8ff270019000e001700d5fffbff0b0018000e00eeffe4ff
e8fff4ff1c001c00daff30004200ebff1f0010002e00010009001200620014000e002800faffd5ff03000f00dcff0d00fcffe5ff04000200e8fff9ff31001c00
0000f1ff010009003b00d1fffdfff9ff1400fbff1100040026000000fefff0ff07000800e7ff30002100f5ff02003d00f9ff0e0004000d001700d6ff85ff0f00
cdff0e000d00f9ff04005800e0fffeff1200c6ff0600ecff1b00f6ffecff17000700f5fff1ffebff19001c001f0018003b0008001b00010082ff1b001b001a00
0000ffffebff0500c1ff0100f7ff0f00e0ff0000e9fff5ff8efffeffeeffdaff0000f8fff8fffaffeaff1d00dfff0fff3500eeff40003d00e5ff17009dfff2ff
0f000a0007000d003200c8ff05002300eaffdfff02000f000600ffff0d00f7ff40000000d6ffc6ffe0fff4ff0a00f6fffdff150009000c000600020009000600
f7ffc4ff1200eeffedfff7ff290008000b00d7ff00001f0013000a0014000c001e003c00c1ff1200deff05000e0000000c00e3ff2100e7ff1000ffff0000daff
3a000400f3ff0400c2ffc7ff0000e6ffdeff04004b00f1ff5900f0fff3ff01000a000e001000d8ffe7ff0e0009001700a3ff02000400e7ff2000d8ff0a001700
f2ffd0ffc8ffe2fff0ff0c00bfff2300f7ff2aff00000500e7fffcff0a00f0fff9fff1ff6effcbffb0ffbeff19000d001e00befffbff1f000b00fcff02003200
51000200fbfff9ffd6fff7ff12001a001d00f2ffddfff4ff650021005d00e4ff05000200f6ffcffff4ff0100ffff13000100340005000800f6fff9ff1d00e9ff
fefffdffedff05001400ddfff4ffc3ff1000120008000d000f00eeffe9fffdff0500070008000e000100f6ff0a003a00f2ff1000faff1500f2ffdaff90ff0f00
d0ff1900fdffdcff11005700e1fffbff1200c9ff0e00d4ff1500f0ffeeff070027000000feffebff03000f00050013002900ffff1700efffb9fff5ff13001000
e4ff0400f6ffc5ff0600efff48001800e4ff15000300e5ff75ff0200f9ffdaff0f00fafff9ff4400dfff0700dcff28ff08001b0046003c00eeff1100a7fff8ff
06000f000d00fcff1400d0ff0a002800f2ffeefffefff7ff56000f000f00fcfffcffc1ffc0ffc8fff1fffeff0d00d5ffe4fff5ff08002500000000000e000700
f7ff0f000e000500b8ff010017000200feff20001a00c6ff0300150012001a0009001000aaff1500e6ff1e00260004001900deff0b00e7ff0300efff1100dfff
3b00f8ffe4ff0400b6ffd8ff1600e5ffd8ff04004300e5ff5a000e00eeff0d000b0006000e00e7ff2000e4fffaff1200abffebff2400e9ff0200c0ff1a000400
0100f2ffcbffe5fff2fff9fff6ff2600050032ff00000e00defffeff1c00fbfff2ffdbff6bffd5ffb2fff3ff220002001700d2ffe9ff03000c000d00e7ff0a00
feff0c0008000800e4ff1c00f0ff13001200f3ffedffd3ff000016005a00ecff0200feff0600dbfffdffffff050015000d00270010009e00f2ffeeff0900f4ff
1600edffdfffd7ff1100d7ff2100d7fff5ff1b00f8ff4300e3ffecffe4fff6fffffffeff0b00feff09000200f7ff3600e3ffffff0e00eefffdffdeff8afff4ff
cdff1600dcff28000e005400e9ff0300fcfff4ff1200ffffe8fff1ff03001c00cdff0f000c00c1ff00001400fdff9eff050001001a00e9ff93ff25002500f8ff
13000d0026001e00faffe0fff6ff0200efff01000500fcff28ff0800eeffd7ff0c00f8ff0a00deffc6ff100085ff11ff1700100045003c0023000e003a00eaff
1d000e00ffff4b00fbffd2ff18001e00020006000e000300f7fff6fffbffecffe8ffc2fff8ffc3ff0f000e00f4ffedfffdff04000d0004001400f8ff1c000900
18000c00e5fff5ffdafff2fff5ff0100fcff2cffefff04000b001b001b000000f2ff0500b4ff0800fcfff9ff2e001600c5fff2ff0a0043ff1e00f8ff0000cdff
3e004b000000ddffc6ffdcff0000f3ffd9ff06004500feffd2fffeff04000700f9ff10000800e9ff1a00f0fffffff3ffa6ffa3ff1700e5ff0100bfff2400feff
0200f3ffcbffd3ffecfffaff2d002f00feffd4ff08001c00d6fff4ff05000500e3ffefff78fff9ffb5ff00001d0009001100d1fffaff1e000b000200f4ffffff
edfff0ff19000900d8ff0d00f2ffe9ff0a0010001000d2fffdff120060000c000800a1000400e2ff0700e3ffe3ff8800f9fff4ffc3ff0500eefff0ff13001c00
f9fffbffedffe1ff2000e2ffe6ffd8ff1700080007001800f7ffd9fff8ff0000060003003eff0a000500f4ff04003900fbff0100fdff42000300dcff93ff1d00
c7ff14000400ceff0c005c00daff17007200d9ff0c00ecff1400faffeaff1200fcffd2ff0400f0ff14001000270019001c000b001c00f9ff76fffaff1e000d00
dbfff7fe0400efffe9ffe1ff1b002100f1fffdfffefffbff68fffefffaffe1ffe9fff0ff0400f2ffdfff1300e1ff27ff1e00110046003900e2ff0800a1ffedff
feff1100110008002300d7ff0b002500f1ffe5fffeff00003500fbff0b0003000400cfffdeffcbfff0ff0e003c00ebffffff170001000a000d0004001c001a00
d6ff13000c00feffe1ff060014000a00f7ffccff310015000c00290014003e0014001a00a2ff1800f7ff1600210007002000e7ff1500eeff030000001400deff
3a00f7ff1c000400b6ffd3ff1100f6ffdaff02004800000062000500f6ff0900f5ff1a001400eafff0fffcff00000400a3ff11000d00e6ff0a00d0ff17001400
0500f5ffc7ffdafff5ff0100ebff350001000900fcff1000e5fff8ff0500f7ffedffcdff80ffe4ffadffeaff1d0003000c00c8fff8ffffff1200f8fff5ff0600
0000060010000900deff1500f9ff06000e00f4ffddffdeff0a001e006200f2ff090000000100deff00000100fdfff3ff0400280031001600f5fff3ff0200dfff
0b00eeffe7ffdbff1300d5ff1b00e4ff9b001700f1ff28000200d5fff6ff0300f6ff0000dfff030005004400d6fe3600fdfff5ff1100dfff0500dcff99fff4ff
bbff0f00d8ff190015005c00e2ff0b00f9ff13000000e0ffdafff4ff0c001000dcfffcff2a00ecff09000b00c1ff77ff08001e001b00f1ff62ff00001b00f8ff
260027001700e3ff0700ebffddff0000f9ffeefff2fffeff77ff0700f7ffd8ffe9ffe7ff0200f1ffbdfffbff93fff9fe1b001d00450040000e0011003600eaff
d0ff0f00d0ff6a00f4ffdbff12002400000009000c00f9fff2ffbeff0700dcfff4ffdafff5ffcafffeff1300f6fff3fffdff04000900faff0a00fbff27000600
04000400f1ffe9ffe8ff0e00e3ffeefeeffffdfff0ff09001a002c000d00f7ff0100feffa8ff1200e6ff080022000500e8fff9ff11002eff2f000100f3ffd1ff
3c002f000900ddffcdffc4fff6fff2ffd8ff07004900f5ffd2ff0400fdff0000ecff0b00afffecff0a000d00fffffeffa4ffe9ff0400efff0300d4ff0500fbff
f8fff4ffc8fff3ffeeff0b0032003700010015000e000200e3ffe1ff0e002a00fdffefff69ff0000b8ffeaff1300feff0e00ceff0700230013000500fbfffdff
eafff2ff0d001d00d9ff0100fdffccff120021001e00f5ff0a001b00660006000d002c000300dfff0d000300eaff0800f9fff7ffd1ff0500ebfff3ff14001a00
1bff0500f0fffdff1500dfffe7ffe8ff10000300f5ff0b003500e3ffd4fffeff05000600ffff08001300ecffaeff3f000300fafff0ff3a000100dbff98ff3600
c6ff1600feffe7ff10005b00dbff29001400cbfff7ffeeff0e00f1ffefff22000400c6fffafff1ff0400f3ff1d001a005e000c001a00e4ff69ff170017000d00
ecffd4fe0200f4ff56ff160009000900f0ff0200daffecff65fff6ff0700dffff1ffe1fff7fff3ffe8ff1700e3ff21ff14001800470040000f0010009fffeaff
29fff2ff140006002500d2ff0a002b00d0fffdfff2fff7ff1200efff1400ffff0100f5ffcfffc4ffefff0500eeffe1ff01000200ffff2f000900f9ff19001000
bdff0c003e00e7ffeaff01000e00290001000d004000dfff09001b001b0037001e00feff9fff1500e8ff2100060006001600edff0f00e8fffcff03000b00d9ff
3900fcfff9fffdffb4ffcfff1d00f7ffd8fffbff4a00faff60000800eeff0900dcff10000b00e6ff0000f6ff000014009fff0800fbffb7ff1c00d9ff17000a00
f6fff3ffc3ffd1ffefff0300d3ff310008000200f4ff1900e5ffe9ff0600e6fffdfff0ff62ffd4ffabffd5ff1300f9ff1000f4ffffff11001500faff0400feff
2b004a0016000e00e0ff1700f9ff02001900baffe2ffe9ff000036006000f6ff0600f8fff7ffdfff7cfffdff00000b00fbff120011001300e7fff9ff0c00e7ff
2000c4fff3ffdcff1700d6ff1200eefff2ff1900e6ff17000800dcffd5ff0400000006000d00ffff00004100b3ff3b00f4fffcff1800f7ff0100dcff97ffecff
c7ff1100ffff130013005a00e6fff7fff8ff2600fcffc9ffe1ff050005001400ecff15001000f3ff05002700f6ff8bff1400d5ff1900030052ff0e001900bcff
ebff0c000d00fdfffbff0000e6ff1500fafffafff6fffcff6aff0d00ecffe1ffeafff9ff10000800eefff4ff93ff1eff1b001e0042003c000b000a003a00f2ff
1b00f0ff00001a00f0ffd3ff16002000f2ff02000f000400fcfff1ff0700eafff3ffecfff4ffc6ffffff2e00f6fff4ff0600250005000100f7fff4ff1c000c00
1a000d00f0ffe6fff4fff0ffefffd4fe01000600f5ff36ff1600190017000d0009000200c0ff1200d9ff070010000800c4fff9ff0b003bff2d00feff0800cdff
3e0014001100edffd0ffc8fff2fff1ffd2ffffff4600e4ffd0fffcff01000400f1ff10000100e9ff2c00ecffffff0b00a0ffb7ff0800e5ff1e00ddff00000600
eeffddffc8ffe8fff0ff0300230033000000daff0f000e00e4ffe6ff02000a00ffffecff6affeeffb9ff31000800fdff1600d3ff0100080014000200efffe3ff
f1fff8ff09001400d9ff09000200e3ff1e0025002a00f5ff02000b0062002f0007002f000d00e8ff15001400dcff0700f7ffefff0b000a00f1fff3ff28001100
00000500050009001b00dafff7fff3ff1800eafffbff0c000700f3ffe1fffbff07000600faffe6ff0f00f2ff02003a0006000c00ecff05000600d9ff9aff1000
d1ff12000c00eeff0d005500dcff03000f00cfff0900edff1200f8ffeaff11000a00fffffaffe8ff150012001b0015003e0015001f0003008eff2f001a001e00
ecff0800f9ff0f00d3ff2600e9ff0b00daff0a00cbfff6ff1cfffbfff3ffdefffdfffeffe9fffafffeff2300dcff0efffbff120043004100f0ff15009bffd4ff
1200f1fffdff00003e00cfff08002c00d4fff8ff0c000a000b00ffff1000faff4b00fcffdbffc5ffe8ff18004000f5fff6ff13000e0014001c00fdff13000f00
f6ff0dff4c00d7ffedfffeff17000900f9ffd3ff08001b001100070017000b0014001400cbff1c00dbff07000e0000001a00e3ff0c00d2ff0500f7ff0c00daff
3800fdfff1fffdffb5ffd2ff1c00f1ffd9fff9ff4800f3ff5e00feff03000600f6ff05000f00dfff0a00ecfffeff0d00a5fffbfff4ffd3ff2300deff0900fdff
edffc8ffc5ffe7fff1ffdefff0ff3200fbff3cfff3ff0d00e2fffeff0300ebffffff0b007bffd7ffa7ffcfff0f0003001f00bffffcff0e001700ecfff1ff0400
feff010000001100d6ff0800feff15001e00c1ffdcffeeff1b003f005f00f4ff0c00f7fffeffd9ffffff070001001a000b00240004000d00ebfff1ff1e00d3ff
0d0011000900e8ff0a00cfff0c00070000002a0014001800f3fff7ffe4fff5ff04000e00c0fff5ff0a000d00c9ff3a00fcff0c003f00fdff0800ddff8cffe9ff
c4ff1600ecff15000a005300eafffafff1ff06000000e0fffcffffff12000d00f7ff07001a00f7ff0b00f7ffaeff7bff0600efff1c00f1ffb2ffe6ff1e0087ff
f7fffbfff8ff000011000a00dfff0e00ecfff5ff040000001bfffffff5ffdcffd8fff9ff19000a00feff0f0093ff16ff1900e1ff40003a00eeff0d003700f6ff
1e00f3fff4ff1000f7ffceff0e001f00e5ffffff12001100f6fffdfffeffeffff3ffeaffe9ffc1ff0e000500eefff5fffdff13001500fafff5fff0ff0f000e00
09002c00ebffd3fff2ff02000900faff06001cffffff0e0014000d000d00feff0e00e7ffc6ff0d00f2ff19001100fffff1fffdff130040ff050004001900caff
40000e001500e2ffd2ffe3ff0200eaffd9ff0b004300e9ffcffffdff16000100fdff08000900f1ff3c000400f3ff0800a9ffe7fffffff2ff2000e1ff0e000c00
dfffd0ffc6ffe8fff5ff100038002d00000025001f001600ecfff1ff10000000fdffe8ff82ffedffbaff440012000a002300c5fff6ff0d0017000200f3ff0600
f7fff6ff22001800d9ff16002800eeff1b001d001d00e2ff200017005e000600060019000200e1ff05000c00e7ff03000900dfff03000100fdfff8ff24002100
0c00f2ffe6ffe1ff0f00d9ff2600d1fff7ff1800fbff2900f4ffe6ffe8fff8ff000006001600f9ff0300050006003700e3ff05000b00f4ff0400d6ff86fff0ff
d4ff0f00f0ff25001b005100e9ff0100f0ff000008000300f6ff21000a001700e5ff1f000900eeff0a0003000100baff0600f1ff1800f8ff6eff0f002a00f3ff
f5ff020045001700fbffd7ffdaff0f00edfffcfffcfff7ff82ff0200e2ffddff0500f7ff06002b00d0ff010091ff20ff1c000c003f003f0018000a003400e7ff
c9ff0500edff4700fdffcaff14001d00090005001900ebfff6fff6ff0900e9ffe6ff89fff5ffc6ffffff1700f3fff0fff3ff1d0006000700070000001a00f3ff
00001000fcffe6ffb8ff0c00edfffaff0b001100f3ff2dff12001f0011000b00f2ff0e00c1ff0200f8fffcff2f00feffc6ffedff0a0040ff2200ecff0000d6ff
41003d001900eaffceffdfff1800efffd3fffcff3f000400d4ff00000f000500ffff0e000000d8ff1f00fbfff7fffcffa0ffb5ff1800f4fffaffc4ff18000a00
0200f2ffceffd3ffeefffeff31002a00000020003d002100dafff8ff13000000ecffedff5fffe6ffb8fffcff040018000200dcfffeff15000c001100fdffffff
f4fff6ff10001200d8ff19000100f1ff070012001500effffeff1a00590004000400ab000500d8ff04001800ebffb7ff0200f6ffb0ff0900f4fff0ff15001600
f8ffefffe3fff7ff1200e1fff4ffafff16000500090018000b00deffeaff00000600050002000400fafff4ff06003e00d5ff0100000037000100d6ff94ff1d00
cfff12000000e3ff09005b00dfff03004a00d6ff1000b1ff0d00efffe4ff0900250000000100d2ff04000400160019000f00ecff1900f9ffa5ff00001d000300
dbffc8ff00001a00f1ffeefff5ff1b00f5ff02000500f4ff7fff0b00e6ffe4fffefff1ff0100c0ffe6ff0900deff2bff1600130043003900e1ff1000adffdbff
04000a000b0001001a00d2ff02002100f8fffaffefff05000400fcff0100f0fffdffb2ffd4ffcdffe4fff5ff2b00ccfff8ff1900040014000b00ffff02002200
d4ff0d0009001e00caff1d000d00060003001f002c00d4ff0d0017001400440014001800aaff1200d6ff10002a0030002200e6ff1200ebff0e00faff2200ddff
3800f8ffa9ff0100b4ffd2ff1a00f3ffe0ff00004300eeff6000fbfff3ff0d00f6ff15000e00e5ff0400f2ff00000d00a9ff03001600eefff1ffccff0600f4ff
0b00fcffc8ffd4fff2fff7ffe9ff2e00f6ff3dff0a001500e4fffdff1800e8ffecffdfff7affcfffadffe2ff1d000000feffd5fff5ff06000e00fcfff3ff0300
f8ff06000a000b00e3ff1400f7ff07000e00f5ffeeffddff06001b005d00f8ff0b00f7ff0200e6fff9ff010001000f00f9ff280003002100effff5ff0d00f6ff
0c00f9ffe3ffe4ff0f00d9ff1900a7ffdcff1000feff14001b00ddffe4ff0700ebfff8ff0a000a0000002a00fbff3300d8fff9ff0b00f3ff0600daffa0ffe7ff
bbff0c00c4ff200008005500e4ff0400f0ff0d001300ebffeaff130001000800f5ff0a002100effffcff0100cfff73ff04000b001c00ffff68ff12001b00f3ff
100005000a00f7ff0c00f4ffe3ff0900f7ffebfffbfff8ff7aff0400faffe1ff0300e9ff0700f9ffd7ff0a008cff22ff15001700420036001c000b003700f4ff
d9ff050089ff8a000000d4ff10001d000300faff1800ebfff5ffe5ff0200fdfff3ffcdffeaffc6ff07002200f3fffbfff6ff04000a00feff0500000021000100
18000900efffe6ffd2ff1800e5ffd6fff1ff42fff5fffaff07001e001600f8ff07000500f9fe0700090007002f0000000000f6ff0f0031ff2000fcfff3ffd3ff
3e0059001c00e0ffccffd3ff0900efffdaff02004300fcffdeff030005000700f4ff18000700e2ff03000000fcfff6ff9efff1ff1900edff0a00d3ff0e000d00
0000f6ffc9ffeaffeeff040030003400f4ffdaff2d000f00e3ffeefffefffbffecfff0ff73ffeeffbcff00000d001200faffd5ff0000240010000200f5fffeff
e9fffbff13001600daff1e00fcfff2ff0f000c001600d0ffffff130063000600010041000700ddff04000d00e1ff0c00fafff7fffafffdffedfff7ff16001b00
d2fffbfff1fffbff1200e1ffeaffc1ff1d000600080002001000e0fff2ff0a000500feff37ff1000f9fff5ff01003c00f6fffafff8ff05000800daffa2ffffff
b5ff10000000deff0b006100e2ff12002e00c3ff0900e8ff1e00f5fffbff1200fdff1a00fdffefff0000e5ff16001a00180019001c00f1ff6cff350012000800
eefffffff8fff8ff5cff040029001800fdfffefff3fff0ff46fffaff0600e2ffe9ffe4fff2fff3ffe8ff1900dfff25ff1c000f0043003f00d6ff0d00a5fff1ff
2dfffbff210002001d00daff08001f00edff9ffff3fff9ff2d00c4ff110048001100f5ffd2ffc6ffefff0b000800c4fff4ff0700040009000100000025000700
f3ff07002800f2ffecfff8ff07001100ddffdcff4d00efff17001300130012001c00080078ff1b00e6ff1a001a0001002100eeff1100f7ff070001001500dfff
3c00fbffb6ff3100bcffd8fff4fff3ffd5ff06004900ebff6000fdfffcff0a00010001001200e2ff2b00efff02001a009fff00000b00f3ff1b00d7ff0100f6ff
f6fffbffc7ffd2ffedfff5ffdcff3400e9fffcfffdff0000e7fff3ff2300f0fff3ffd7ff78fff1ffadffdbff15000c000800cafffbfffaff1600fafff2fffcff
1c0026001900ffffdfff1a00f7ffffff1300c7ffd6fff3ff00004f006000f3ff0a00f8ff0000e1ffeefefdff01000a000500190014000f00e3fff0ff0b00e8ff
2900eeffecffd7ff0f00d4ff2500f0ffddff1700f2ff1f00fdffe4ffe9ff1200f9fff8ffd7ff0000fafff7ff85fe3600e7fff5ff1f00edff0700dcffa0ffe7ff
c3ff1e00fdff1f000b005900e8ff0600f5ff22000000efffe2ff0100fcff0400efff10000e00f4ffffff0000f6ff7eff0d00f8ff1b00fbff56ff1b001700cdff
0c0006001f00f0ff05001800ebfffefff3ffecfffafff7ff80ff2a00f2ffdffff6ffedfffcfffdffd2ff21008eff31ff24000c0043003c00f2ff06003600eeff
1700f2ff08ff2800f5ffd1ff11001e00fafff9ff0a000600f6ffe2ff0200edfff3ffedffefffc5ff1a001600e4fff7fffbff00000d000000f2fff9ff37000a00
13000700eeffe8fff7ff0200f3fff1fff7fff2fff1ff3dfffaff15001100f3ff08000400c9ff1600f1ff100019000500fcfff6ff15003cff8400f2ff0500d8ff
400015001d00f1ffc9ffc7ff2000eeffd5ff03004400feffd9ff070005000a00f5ff0900b5ffe8ff0a00f5ffffff0400a0ffedffefffe0ff2000daff45000700
f7fff0ffc6ffe1fff5ffffff2d003300e9ffe4ff19000400e3ffebff12001e00e8ffebff78fffaffbafffcff0f0018000e00d1fffdff050015001000eeffedff
e7ffdbff10000f00dfff1200040021ff1d001d00210005000300140060000e00060024000300e9ff10000200e3ff01000200f0ffc3fffbffe1fff4ff1e002300
d3ffe4ff020007001600d8fff3fff2ff1600f7ffe7ff08001000ecffe4ff0b000500fdfff4fffaff0000e8ffb6ff38000700fbfff3ff1900f9ffd4ffa1ff1d00
c4ff03001100ebff0e005700ddff0f001500cbfff5ffebff1300fcfff1ff01000300f4ffffffeeff00000200220019008d00ffff1b00fdff9bfff7ff12001900
fdffddffffff0000ddff130005000500f4fffbffcafff4ff7dfff8fffdffe3ffeefff4fff5fff8ffedff0100dfff23ff170013003f003800f1ff0800a5ffd7ff
0a00f8ff0800feff6200ceff080019001c00f6ff000000000d00f8ff0c000d002b00faffd9ffc3ffe4ff11000700effffaff070001002b001000010029001100
c9ff01000100e1fff4ff13000e000e000200ddff16002000090017001d002a001700ffffcfff1800e0ff0000f9ff03001700ddff1600ebff0900f1ff0b00ddff
3d000400f4ff0400b5ffd9ffffffeaffd5fff1ff440006005c000200f7ff1000fcff02000a00defff6ffddfffbff18009bfff7ff1200f5ff2200dcff0a001a00
e1ffe9ffc4ffdefff1fff0ffe7ff2f00e5ff45fffeffffffebffedff0000f0ffeffff8ff6affe6ffacffe0ff040010001c00edfff8ff0c0014000800eaff0100
fcff350072000b00dcff1e00eeff0d002500efffe4fff8ff220034006100e9ff0400f6fff5ffe3ff63ff040000000f0016001d0011000c00ecfff6ff0d00dbff
15000500f7ffe0ff0c00d8ff0e00fbfffaff150004001000f2ffe8ffe4ff0c0000000200caffecff0f003f0082ff3900e9fff8ff0600f7fffaffd6ff8effe8ff
c5ff1700f5ff120010005800e2fff8fffbff0100e6ffdefff5ff0100ffff0a00f3ff07000a00f5ff09000b00f0ffa5ff0e00e0ff23000300a8fff0ff1000fdff
efff0300fefffbff06001100f1ff1300e7fff7fff2ffffff18fffffff3ffe6ffeafff8ff0e000800ebff0b008fff1bff28000b0040003700f0ff0b003800e7ff
2100e7ffffff0e00fcffd2ff11002000e1fffcff16000400f4ffeaff0300e0ffe4fff0ffeeffc5fff6ff2600f8fffcff0800180002000400cbfef7ff15000b00
10000f00efffe4fff3ff0000f5ffcfff000028fff0ff110012001b001400120005000300daff1b00ccff140000000500bbffe7ff0a004bff2100eefffdffc9ff
3b0012000a00e9ffd5ffc7ff1800daffd6ff000040000500dbffffff0400050006000f000000f0ff2d00ddfffefff7ff9effbaffe4ffe8ff2400deff15001600
fbffc2ffc6ffe8ffeeffd1ff2c003200ecff21000f000c00ebffddffeaff0500faffe8ff78ffecffb9ff0800060011002300d2fffdff1c0015001e00efffffff
e9fff5ff1a001700daffffff0000efff1e0025001e000900ffff1500640030000300a4ff0f00f5fff5ff1000edfffbff1b00eeff07000300f8fff0ff22002700
efff05000a0004001d00d9fff3ff01000e001200ffff0c000b00e0ffe2ff0800fffffdff21ffeeff1500f3ff9bff410012000900f6ff0600fcffdcff98ff0f00
d0ff05000400f2ff0a004e00e3ff0c000f00f3fffbffe7ff1400f0fff1ff2f000e0005000400f5ff0c0005000d001700470005001e00f1ffb8ff1a001f001700
f4ff0900f0ff0500f2ff2f00f5ff1500f9ff0400cdff010090ffebfff8ffe4fffcfffbff15000400fffffdffdeff29ff3200f6ff3d004100f0ff1300a8ffdcff
1f0002000d0000002800d0ff16002200e6fff2ff0a0010000e0006000c00fcff4c000000e1ffbffffaff05003e00fafff1ff23000e000e000e00030018001800
f2ff1e004900d1fff5fffaff0a000f000a001a000c00240004000e0011000e001f000500daff1600d5ff0300080000003800e6ff1300ebff1700fdff1e00e5ff
3f000000f9ff0600b0ffddff0e00edffd7fff6ff3e00f0ff5100fcff10000800010009001300dfff2200e1fffcff0c00a7ff00000700d6ff2100d9fffcff0400
f0ffadffccffe6fff7fff3ffedff2e00e2ff1100fbff1500e8fff7ff0900f6ffe1ff08007fffe1ffa7ffe0ff0b000c001f00c9ff0000fcff1500f5ffebfff8ff
feff150003001e00dbff2700eaff10001700beffe1fffaff000053005c00fcff0000f9fff5ffdffff4ff1000020013000200250006000400fbff05001400efff
f4fff9ffebff0d00fdffe1fff7ffabff17000e000c000e002000daffeefff9ff120009000e000a00fdfffcff0a003900e2ffe5fff7ff35000400e1ff8cff1f00
c5ff0d000000dcffffff5500d6ffffff4700c4ff1400e5ff05000400deff2b001e000900faffedff0300f0ff1b0017001b00ecff1900f1ffa6ff1a0016000b00
fcffb7fff5ff3100ebffe5ffffff2300eaff0600fdfff2ff80ffffffe4ffedfff7ffeefffaff2900dbfff8ffe9ff2aff22000b0049003b00dbff0d009effebff
19ff0f00f8ff02001000c4ff08001c00effff5fffdff0200000000000c00ddfff8ff8affe3ffc4ffdbff00003500f4ffefff0f00280013000100feff0c004000
c3ff00000c00f8ffafff230008000000070019002e0035000d00120015004c000b000c00b7ff0c00e1ffbbff2a00eaff2500e4ff0c00e8ff0b00effffbffdcff
38000500a0ff0f00afffc5ff1900f8ffdefff6ff3d00f0ff58000700e8ff08000900fbff1300e9ff0000f3fff3ff0e00b0ffedff1c00ecfff8ffd1ff0f000e00
0900ffffc8ffddfff7fff6fff2ff2200fbff1100f0ff1d00f5fff5ff1f00edffe4ffdbff60ffdcffabffeeff190016000e00cdfff9fff5ff08000900f8fff2ff
0000110010000900e1ff1300f8ff06000700fafff5ffeffffdff1d005400f0ff0600f4fff9ffe0fffcfffdff08001f00030031000d000000f7fff4ff0b00eaff
0700f4ffdbffe9ff0a00e2ff180093ffdbff1c00000012000e00defff6ff0c00f4ff07001a000500f9ff210006003400bafffcff0900f1ff0e00d2ff8cffe9ff
aeff0900ddff26001d005000e1ff0700ebff00000900f9ffefffe8ff0000feffbdff18002000ebff00000200d5ff86fffdfffaff1c00ffffbcff1f001500f9ff
f1fffcff0c00f5ff0600daffdbff0f00f7ffe8fff1fff0ff7bff0500e0ffe1ffedffe4ff0000e4ffc7ff0f0090ff21ff1e000b0041003b00340016003200f0ff
38fff7ffd3ff9500f9ffd0ff12001e000200f6ff13003300ecffeaff0500fefffdff7dffeeffc6fff3ff1300f2ffebfff2ff1600fcffffff0b00ffff07000000
00000900effff2ffb6ff1500d5ffd4ff05001700f7ff4aff05001d000e00fdff0900010099ff07000100ddff2f0008000e00f7ff070031ff23000400e6ffd6ff
40003f001900d2ffd3ffcfff0a00f1ffd1fff3ff4500f8ffd5fff2ff08000000efff1c000800d7ff00000000fbff040099ffe7ff2100edffebffd3fffbff0000
fffff5ffceffebffebff020035003000efff230063001200e5fff0ff0900f6ff000005006fffe1ffb9fff7ff0a001600f2ffe0ff040016000f000a00f2ff0000
edffedff0d000d00daff1800feffe9ff07000d001700e2ff02000b005c00070000004f000200cfff02001500e5ff0c000600f3fffcff0800eefff7ff19000d00
c6fff8ffe4ff02001500e1fff9ff87ff1700ffff000007001700d6fff5ff07000900f9ff020011000000f4ff08003900f0fffefff1ff09000a00daffacff0900
bcff0900f4ffd7ff0d005700e0ff17000200d3ff1a00dcff1200f3fff5ff19000000cbfffbfff5ff0d00eaff1f0018000200f9ff1500efff73ff150006000c00
ebfff8fff4ff060072fffcfffbff0c00fdfffcfff2fff1ff71fff1fff0ffe0ff0300e5ff0400dbffdfff0400d8ff29ff1000110044003900c5ff0800aaffe6ff
3dff06000e0000001c00d2ff05002000eaffccffe5fff2ff0500ebfffcff08001700e7ffd5ffc7ffdefffeff02004300ecfffffffbff0c00fdff02001d000a00
edff0c002200f4ffcffff0ff06000400000015005c003aff0300170018001b001c0007008fff0e00e5ff290023000e001300f5ff1400ffff0e00faff0c00dfff
3a00f8fff8ff1b00b3ffe0ff1300ecffdbfffaff4200e7ff5b00f8fffeff0b000700edff0c00e5ff0d00f1ffffff1200a4fff8ff1100fdff0c00d4ff04001000
0000f7ffcaffd5ffe8ffe7ffdeff2d00ecff43fff8ff1200edfffcff1e00edffe2ffd8ff75ffe0ffaeffe3ff1c0017000100d1fffafffbff14000400f2fff9ff
1a00270001001100e3ff1600f9fff4ff0e00d1ffe9ffe7ff01003e005e00f8ff0600e7fffeffe7ffdbff0b00f8ff0100fbff170024001900efffeeff0b00eaff
1200f5ffecffe5ff0b00daff1b00baff03001400f9ff13000800e8ffddff0d00fbfff6ff15000000f7ff0000feff3000e8ffffff1900e5ff0600d6ff95ffe6ff
c3ff0800edff2a0011005500e7ff0d00e7ff20001300e4fff2ff1c0000000e00ddff30001100f3ff0100daffefff80fffeff00001a00f5ff64ff05000700daff
0200000005000100efff0d00e8ff0700f8fff1fffbffefff8eff0d00f9ffdeff0400eeff0000fdffd0ff100098ff23ff0e0006004000380022000b003800e3ff
20000800ecff4500fcffd4ff0c0015000d00090011000900f0ffc0ff02000400ecffe8ffedffc4fff7ff0d00e6fff0ffedff1a00fcfffdfff6fff9ff08000e00
0a000900e7ffefffecfff1ffecffedffceff41ffecff41ff07001d001000e4ff0c000a00a5ff0a000000e1ff290006000a00f5ff0e0039ff2a00f2fff2ffd6ff
420040001a00d2ffc9ffd8ff2000ebffd7fffeff47000f00dfff000012000800f5ff0f000700e0fffdfff2fffeff05009dffecff1400faff1e00dbffe1fff7ff
f7fff3ffc7ffdffff0fff7ff27003100f3ff4dff19000a00eaffe9ff0500faffecffffff71ffefffb6ff000015002100f0ffd1fff8ff060013000700f2fff4ff
eeffe2ff16000a00dfff20000700d7ff120012001c00e1fffeff0c005b000d0004004100fdffdbff02001300dbff0a00fdfff4fff9ff0300ebffefff1e000600
0b000a00f3ff02001400dcfff8ffd8ff15000000ffff08000600e4fff2ff0c00f9fff9ff43ff07000200e4ff05003700fefff8ffefff0d000700d1ff9eff0a00
aeff7e000800e8ff0f005b00dcff0f002f00caff0300f0ff1400fbffebfffeff0700c1fffcfff4ff0e00f7ff180017003f0000001900f8ff70ff0c00fbff0700
f9fff5fff6fffeffd5ff140020000e00fbfff8fff2fff3ff79ff0800feffddfffeffebfff6fff6fff2fff9ffdaff2aff1f00080040003500e7ff0100a6ffe9ff
0a00f7ff1000fbff2f00d2ff02000f00d2ffe4ff0000ffff2500ecff15000f002b00fcffd8ffc1ffe5ff0800f6ffeefff6fff6fff3ff0b000000010009000e00
eeff0100fdffebffedfffdff0e000400fbff71ff1b002100030012001200100012000100beff1800d3ff0700140006000f00dfff1400f0ff0600f5ff1600e1ff
3e000800c1ff0200b3ffdbff0900eaffd5fffbff4300e6ff5a00fdff03000900efffddff0e00e0ffe9ffe6ff00000f0097fffaff0100edff1f00d9fffbff0f00
f1fff6ffc1ffe3ffecfff1ffe8ff2700e2ff4cffffff1000eafff2fffaffefffdeffe5ff7dffe4ffacffdbff150029001400c9fff4ffffff1400f6ffe8ff0200
f9fff6fff2ff1300e2ff1100ecff0a001c00f2ffebfff0ff150082005f00e6ff0700f5fff6ffd9ffe8ff0700f7ff040015001b0014001600ecffefff0a00daff
1b00f3fffbffdeff0100d6ff1f00f0ffd9ff0e00daff2600f9ffe1fff3ff0f00f9fff4ff5bfff2ff01000a00c6fe3400effff9ff0900edff0600d7ff99ffe7ff
aaff1100fdff240011005600deff0700f0ff0c00f5fff8fff6ff080002002000e3ff19001200f5ff0400fcfff4ff7eff0800fcff1c00faff8bff1d00f1ffe4ff
1000f9ff1400f7ffecff1400e2fffafffffff3ff0d00f6ff6eff2300faffe4fff7ffeeff0d00ffffd7ff120098ff22ff0400fcff41003a00f3ff03003200efff
2300fcffdaff1a00fcffd0ff10001a000300f6ff05000b00f0ffdeff0100dfffd6fff1fff0ffc8ff20001e00edfff7fff8ff1d00f3ff00000d00f3ff20000a00
07000400e4ffe7ffebff1800feffe4ff0c0039fff0ff0e00080022000c00f0fff5ff0000caff1500eeff070009000b00f1fff0ff110048ff3500f3ff0700d5ff
3d0018000c00ffffcfffd6ff1200dfffd6fff8ff3f00f5ffd6ff02000a000900f7ff0500b5fff1ff0f00edfff9ffefff9effe0ff2900ffff1c00e2ff0a000700
f3ffdfffc5ffe1ffefff02002a003200e8ff1f000c00f0ffedffe3ff18001500ebffefff84ffe8ffb9fffeff13001b002d00cbfff9ff11001600ddffebfffdff
e3ffe5ff0d000d00dfff1c00f3ffecff1e00070023000700010010006100f2ff050024000000e8ff00000e00e6ff03001000f0ffcbfffdffecfff0ff18000000
b1ff0b00000002001400dfffe6fff8ff13002800faff01000a00f1ffe3ff0a00f8fff7ff35fffeff0800f7ff27ff3b000100f9ffebff1800f8ffd0ff94ff1600
c1ff09000e00e6ff0b004f00dbff0a001400ddffedffdfff1400f5fff2ff1a00fdfff6fffdfff8ff0000e9ff15001600b100f6ff1d00f6ff84ff0000f1ff0400
f2ffe3fffafffcffe1ff0d0005000d00fffff8ff72fffbff8efff7ff0000e2fff6ffedff2800fdffe5ff2000dcff1eff29000f0040003b00eaff0100a6ffdeff
0900f8ff0600f9ff3100cdff0c001500cbffe8ff060003000f00efff0c00fbff0800fbffd9ffc6ffdeff04000400f3ffedff1000fdff240001000d001e000e00
c7ff12000800dcfff8ff0c000c00f9fffdff1f000f00230001001b001a0028000b001300d9ff1900bcfffdfff8ff08001f00dbff1b00e0ff0900edff0c00e1ff
3d00fffff2ff0700a7ffd4fffcffdeffcfffe8ff4600faff5400010005000b00060004001200d1ff0600eefffdff030097fff4fff4ff01001e00dcff08001100
f1ffd6ffc7ffebfff6ffc0ffe9ff2d00daff1100f8ff0b00f1ffeffffefff2fff1fff4ff92ffedffa4fff1ff090011002800f4fff9fffdff1500d3ffdeff0e00
f4ff3400dcff1100ddff1000ebff00001d00eaffebff0c00fbff48006300ecff0300f6fff9ffddffd3ff050000000f00240013000b000900f6fff1ff0c00f5ff
11001500eaffebff0f00daff1000010002002c0009002000f5ffe9ffeaff02000d00ffff2600e8ff110041008dfe3800e3ff01000c000c000000e4ff81fff5ff
ccff1a00f0ff0b000a005100e9ff0c00ffff2600f2ffe1fff0ff0400fbfff2fff5ff10000500deff00000a000000ddff1700d1ff2000090097ff17001f00f0ff
e8ff090018000d00eeff0b00eeff13000a0005000400f2ff26fff6ffe7ffdcffedfff5ff24000800dbff0d009cfffefe0600c1fe43004100eaff04003c00d6ff
1e00fcff09000800faffc7ff20002600fefff7ff17000a00f7ffe6ff0500dbffe0fff9ffedffbfff02001b00f5fffdff0500300010000400b0fff9ff26000400
13000d00f0ffe7ffedff1800f8ffb6ff0b000500f2ff23000b0018000c000d0007000e00f8ff1800e9ff040009001300caffe1fffdff9dff350005001f00d7ff
420012000b00f9ffe1ffd6ff1c00ebffd6ff09003900ecffcdffe9ff20000000e6ff14001000f8ff2400d6fff5ff0400aeffbbfffdfff7ff1c00daff16002000
ebff95ffc9ffe9fff9ff04001f002c00e2ff280019001700efffd7ffe8ff1100cdffe7ff6bfff0ffbdfffaff160016002200cbfffbfff8ff1700fdfff1ffe4ff
0400e7ff00001800d8ff1500faff08001400100023001900f2ff09005f003c000300b1ff3200eeff0a001900ebfffaff1f00eeff0c000c000200f9ff06001c00
0e00e1ffeaff04000f00e8ff0b00baffd3ff22000b000d001600e0ffe4ff0d000800000027000900fdff1f00ffff3600acfff9ff0700f9ff1000e0ff91ffebff
aaff100005003000f8ff5400eaff1200e5ff1100ffffe5ff0500f9ff08000a00e7ff0f002100f2fff9fff5ffcbff77ff010013002100fdff84ff1c001b000000
0400fbfffafff2fffaffe3ffe7fffffff8ffebfff4ffe7ff4efffbffe9ffe0ffffffe2ff04001f00dbff0e0098ff6bff1b000a003f003300570008003500f3ff
7cff0f00bfff9e000600ccff13001b000d00deff1600f3fff1ffe2fffffff4fffdff95ffeaffc6fffeff0000fcffd6fff4ff0c00050000001d0007001100f9ff
04001700f6fff6ff91ff1d00ceffd0ff0c001100f9ff1600faff230012000300f7ffffff9bff0e00fefff4fe26000e000100f6ff080037ff2a00fbffddffdeff
38006b001100c0ffccffcbff1c00eaffd6ff0a003e00eaffc9fff3ff01000300e1ff27001000dbff0900090000000000abffe7ff1a00f5ff0200d2fffbff0900
fffffbffd0fff0ffe9ff04002b002600e5ff3a0009002200f1fff3ff0b000500e4fff7ff65ffebffb7fff2ff080039000900e2ff0100280011001100fdfffcff
e8fff6ff16000d00daff1600f1ffecff110010001d00f4ff000000005c00030003001c000100e1fffeff0300f2fffcff0b00e8ff0c000700fffffaff1a000f00
c9fff5ffecfffdff0f00f0ff050099ff1300ffff02000e001700d4ffffff04004600ffff0e001700efffedff0d003e00ddfffbfff6fffcff0600d9ff91ff0300
77ff1000e6ffd5ff10005400e7ff12000800c9ff0d00d9ff0900e6ffeeff2000feffc5fff6fff9ff0300f4ff1e001900d2fff8ff1900faff80ff110003000800
e6fffbffd3ffe3ff68ffebfff6ff0900fefffcfff2fff6ff96ffebfff8ffe1fffeffe3ff0700f8fff3fffdffdfff39ff0b000a0044004200d6ff30ffa8ffe7ff
c2fefeffecfff3ff1500c6ffffff2600ebffc1fffeff27000200efff090000000f00d3ffd2ffc4ffe3ff02000c002b00f4ff160001000600f5ff000017001400
feff07002100f5ffe2ffebff0600030016001f006000c0ff0600feff1f0012000e0000009bff0500e2ff76ff2c001a001e00f7ff1500feff0700f4ff1100ddff
3500f6ffe4ff2600a0ffc9ff1c00f1ffe6ff00003c00e9ff6000fafff3ff0700110000001900f8ff02000400f1ff1a00a2ff00001b00f7ff1800d7ff0600eeff
0100f1ffcbffd2ffe4ffe6ffd8ff2700dcff250004001400e9fffcff0f00f1fffaffd6ff77ffdbffa2ffebff130028000000d3fffefff1ff0e000c00f5ffffff
240031000f001000e5ff1200ebfff9ff0800ccfff2ffdefffeff1b005900eeff0400ebfffbfff1ffb9fff7ff02000a00d7ff19001c001100e3fffcff0300f9ff
1b00f1fff5fff5ff0d00e0ff1f00b8ff01001b00faff1b00faffe5ffe7ff16001000fbff1f000000fefffcff04003600e2fff9ff1900eaff0700d3ff9bffe0ff
bcff1100e9ff1c0031005300e6ff1300e6ff1f000e00f3fff6fffaff00000e00f5ff27000d00f9fffeffefff00009bfffcff03001b00f5ff77ff2000fdffddff
f6ff0000fffff9ffeffff5ffddff0700f3ffedff0000f1ff65ff1f00e2ffdcfff3ffe7ff0400f6ffd4ff07009bff24ff0d00ffff39003c00130061ff3200f0ff
c3fff7ffe6ff3c00fcffd4ff0f001400060015001400e7ffe9ffd3ff0700fbffeaffbbffe5ffbfffeffff1ffe9ffeafff3ff0400fdfffdfffbfff8fff7ff0500
08001300ecffffffe6fff2ffe3ffedffeeff1300f1ffa6fefdff15000c00e7ff00000c00b6ff0c000100fcff2c0012000c00f4ff0e0038ff2f00f2ffebffdbff
430020000e00d6ffd0ffdaff0d00ebffd5ff050047000100d8fff9ff1400fefffcff09000800e2ff0a00effff7ff0300a0ffe9ff1e00fdff0f00dbffe4ff0c00
fcffedffc5ffd3fff1fff8ff20002900e5ffe0ff5c001900eaffeafffefffcfffcfff9ff68ffeaffb8fff6ff10001c00fdffe3fffbff0a0013000300ecfff7ff
ecffe4ff20001b00e1ff0d000600d1ff120017002300e5ff0000030054000b0007002a00f7ffc8ff01001900f0ff07000700f1ff03000f00eefff3ff22000e00
ffffffffeeff08001600dbff0800c4ff1a000a000d000a001100e0fff1ff1400fdfff8ffffff0a000200eeff060038000000f9ffefff0b000600dbffa4ff0800
caffeeff0800d9ff19005500deff18000700dbff1900e3ff1800fbfff1ff1c0009000400fdfff2ff0e000100230015003700f6ff1900f9ff97ff1000f1ff0600
f4fff6fff0ff1600d9ff0a0000000700fdfff6ffefffeeff86fffffff5ffd6fff9ffddffefffe0fff0ff0e00d8ff13ff0400060042003300e2ffe4ffadffe6ff
070001000a00f9ff3000d3fffcff1800d2ff0300feff04000900e7ff090013002700f2ffdaffc2ffe0fff4ff0d00f0fff7ff0d0000001000f8ff020007000b00
f3ff0b000300fbffeffffdff0f000500caffd4ff2800cafff2ff0e0016000e0011000c00a2ff1200ddffeeff1b0012000900e6ff0d0003000b00f9ff0800e2ff
3f000600eaff0300acffdcff0300ebffdfff00003700d7ff5900f3ff05000b00fbfff7ff1400ebff0900e0ff05001000a9fffaff0400e6ff1700d7ff16000200
0000f2ffc8ffdbffe7fff6ffe7ff2600e6ffd7fe01000900f2fff2ff0b00e8ffedffe7ff7bffdcffadffe0ff150021000000dafff5ffffff1800feffe5ff0000
faffffffeeff3900e7ff1200f8ff0b001700ebfff1fffbff14003e005900e7ff0f00ecfffbffe6ffedff0200f8ff0e000800230019002600eefff0ff0d00e8ff
1a00fdffe8ffebff0700d6ff1700e6ffffff14000d001900eeffe2fff2ff1300f9fff7ffbeffeefff9fffcffcdff3200f6ff03000b00eeff0400dbff95ffe6ff
beff0b00efff2a000d005300e1ff0900f1fffcff0300ecfffdff1c0000001f00e5ff10000c00fbff0700f7fffcff6bfffdffffff1c00f5ff96ff0f00fcffeeff
07000100ffff0000f3ff1200e2ff04000000edff0d00efff7cff1a00f6ffddffe9ffedff0900f8ffd4ff0700a0ff09ff2500010045003b001e00fbff3300d9ff
1f000300f4ff3600f8ffd9ff14000f000e0001000e000900ebffe5ff04000200dbffeeffedffc1fff3ff2200e7ffe6fff6ff1a00fcfffdff0400f8ff14000900
0f001100e3fff0ffe7ff0600fdfff5fffcff99fef1ff0b0003001d000f00e9fff7ff080098ff0a00ffffe9ff1b0006000400eeff140048ff2c00fefff7ffd3ff
3f0040000e00d9ffcfffd8ff1400e1ffdafffeff3900feffdbfffdff09000b00e5ffffff0700f2ff0000ebfff7fffeffa4ffe7ff0c00feff1c00daffdcff0200
eaffe9ffc6ffdcfff2fff2ff2e003200f2ffd4ff1d001700f9ffeaff15000000e4fff9ff73ffefffb7ff0300290020000e00c8fffbff0a000f00f8ffddff0000
e6ffeeff1d001000e1ff1100fcfff6ff130017002700e8fff8ff01005900ffff03002800f5ffeaff01001900dfff00001700f4fff8ff0b00f4ffedff1c001e00
07000300f2fffaff1700dffff1ffe8ff1700fcffe8ff0d000500edffe1ff0c000a00f3ffcdfe01000000eeffc1ff3e00fffffafff4ff0e000400d6ff92ff0b00
baff5cff0400ddff0b005f00dfff16003600d2ff0300e6ff1800f8fff3ff0c000b00c4ff0100f5ff0800e5ff230014002d000b001b00f8ff7bff1900edff0900
0000fafff7ff0300eaff010024001700fdfff7ff9efff6ff8eff0a000500daff0000ddff1600fbffebff0600dbff01ff330006003a003c00e9ff0b00a4fff2ff
0b00f0ff1d00fbff1f00d8ff22001000ebffebff010004002700e4ff1b0012001400faffd8ffc8fff1fffaff0100f6ffefff0300e7ff0c00ffff000013000d00
f1ff0b00fffff6ffeffff6ff10000c00f6ffe3ff1d001800f8ff16001500140008001700d1ff2500d8ff0b000f0002002800e2ff2700f7ff0000f0ff2e00e4ff
41000300c0ff0200a4ffd9ff1d00e6ffd6fffeff4000eaff5a00010006000500f6fff5ff1100e4ffeaffe7fffbff0d009bff04001000f0ff1c00dcff08000f00
f3fff8ffc0fff0ffeeffe9ffecff2300e5ff0e0003000d00ecfff4fff8ffeeffe6ffedff85fff5ffa4ffe9ff3a0021002700cefffbfff9ff1500e4ffe2ff0800
fdff000004001300e2ff1500f5ff15001c00e6fff5fff9ff0800a5005a00e5ff0200f5ff0000d2ffe7ff0c00fcff0f00190013001c001200fffff2ff0000e5ff
12000400eeffe3ff1100deff24000000c8ff1e0005002900ebffdaffe8ff05000500f1ffc4fff7ff0200ffff84fe3c00d3ff07000b00f9ff0100e8ff66ffeaff
b0ff0b00d6ff29000c005e00e8ff0900f3ff0300edffffffecff010001001a00e6ff02000d00f4ff0500f6fffcffa5ff0200f4ff1c00f3ff7fff0000e9fffcff
12000e000d00f9ff00000f00d6ff00001200f4ffe5fff9ff59ff0800f5ffd8ffddffe5ff0000e4ffd9fff5ff92ff0aff0c00010048004200efff06003300f0ff
22000600c1ff0900f6ffc9ff54001b001f00f4ff11000100e9ffefff0a00d9ffdffffeffe6ffd1ff15002400f5ffeefffaff0500f6ff07000b00000008000a00
0000f7fff3fff4ffffff1100fdfff1ffffff0f00e7ff1500faff17000700fbffeefffaffe6ff1f00eeff090013000d00e3ffedff09004dff3e00f6ff0b00d6ff
390014001800eaffd9ffd4ff1300d7ffd0ff05003b00f1ffc3ff090006000500f0ff14003400faff0500f9fff6fff5ffb3ffe4ff0200f5ff2300dbfff8ff0600
faffebffcdfffeffecfff8ff21002600d5ff270006000a00eafff2ff37002700d0ffe4ff84ff0000bdfff1ff1a0032003a00d5fffaff1c001100e8ffe7ffe6ff
f2ffdfff21001e00e8ff1a00e0ffdaff1a000a002d000e00f4ff22004600f2ff07001000f2ffeafff3ff0e00f1ff0b001300f3ffc1ff0b00fcffecff00003400
7eff0700e9fffdff1600dffff9ff070012001000fffffdff0b00e0fff4ff0a00fcffe6ff0a000000fbfff7ff84ff3d000800eefff7ff1f00f7ffd7ff81ff2c00
b9ff1d000f00faff04005a00e4ff0b000500c5ffddffebff1900f7fff4ff1400120000000000e3ff0100ecff14001400c900efff1900f3ff6aff090025000500
ebffeefff7fff6fff5ff0a0014000000ecfff0ff63fff5ffb2ff0c000800e7ff1600efff1200ffff00002100dcff04ff1e0004003f003d0015000600b6fff0ff
2300fdff040000005500c8ff03001b00b0fffeff13000f000f00fcff0a000600fafff6ffdaffcaffe2ff09000800f5ffecff0800f9ff2600f1ffedff12000e00
c6ff0900e4ffefff00000d0014000300fbff200003002f00010018001a002f000c001800ebff1e00caff00000b000b002a00d6ff1f00e0ff1700f0ff0e00e2ff
3b00fbff02000600a9ffe0ff0700f7ffd3fff7ff3400f7ff59000000dfff07000c000e001500e9ff0a00e9fff6ff0500a4ffedff0700ffff1700deff00002a00
e6ffbdffc0ffc5fff3fffcfff1ff2600e0ff210007000c00efffe9ffe7fff3ff0500e7ffb1ffe3ffa2ffebffe4ff28002900f4fff3ffeaff1400f3ffe8ff0a00
faff4500b9ff1e00deff1e00ebff00001200e3ffe2ffffff0300c3ff5700e8ff0000f9ffe4ffdbff94ff0700ffff170028001800140005000a00effffaffedff
0d00ecffe6fff3ff0600a9ff0600000014001600110007004400edffe7ff3cfff1ff2f00100003000700fefff8ff2b000c000d0004000800d1ffc5fff4fff0ff
d9ff2000ffffd8ff27008a00c3ff0f00fdff03001a00cbff2200e4fff4ff360000001200eefff8ff2400d2ff270027000a00f0ff210008000b0005004c001600
fcff0d000800ffffffffe3ff0300f7fff5ff0d00f9ff0c00b9ffe0ffe1ffa8ffc5ffe0ffe1ffffffdeff25008affa2ff1800120068002200f5ff2d00a4fff6ff
130021001b0012000d0024001a0027001300feff1c00fbff0700feff0f00fdffe8ffaeffbeffa1ffefff1500fdfff6ff1f0023001b002aff19001e002a001200
0b0002000200ffff0e00efff2700080003001400edff19003b0019002000ffff27002100e9ffcfffe7ff1500440012002700d4ff15002000130025002800c0ff
000006001400090082ffeeff1c00ecffbcff1800650007000d00f6ff03002200180032002000a7ff240016009aff160077fffbff1500e9ff4100c2ff1600faff
f6fffbff0a00ebff5b00170010007b003f001e0007000b0098ffa1ff26001300ecffe6ffecffd3ff7aff13002300d8ff280039ff00001f001d001300f0ff0100
f0ff06002a002100d5ff2500e6ff1a002c000400360019000f001c008c000700f1ff00000200c6ff04000a00daff1f00f9ffd9fff3ff22001300f6fff6ffdaff
1200f5ffe1fff0ff1c00b1ff1900f6ff0d001d00070010001f00f1ffdcff38fff9ff35001200080008000200fefff1ff0e00fbff080010009fffc2fff0fff5ff
dbff2600faffccff22008e00c6ff0f000500f8ff1c00c8ff20000400efff310001001500f7fffeff0500dcff34002a000b00e5ff2000fefff7ff1d004c000900
fcff1b001700fcffffffe5ff05000800f3ff0b00feff0200b7ffd7ff0400b4ffc5ffecfff0ffdbffe3ff2b0087ffa7ff14001e006900f9ffe4ff2300a3ffd6ff
70ff210019000a000d0024001a002d001100f5ff2700e7ff11000b001d00fdfff1ffceffcbffa8ffefff0f00fcfff3ff29001a00190007ff10001c0024000f00
0a0007000600e3ff0700eeff25000700eaff1700f2ff1e0015001d002600090023001600eaffa6ffdfff1900460005002200d7ff0d002f00190024000800bdff
ffff06000f00eeff84ffebff1900edffb5fffdff650006000f0008000600250019001e001f00acff22001800e7ff1a007aff0e000e00e0ff0e00c0ff2f00f9ff
f5ff00000900edff640010000c00790042001e0025000a009bff04002d001700f6ffd2ffe7ffe2ff7cff03002300a0ff3000fdffffff1d0020001200f2ff0700
ffff0a0027001e00d6ff2400edff1a002b00faff24002e0012000f008100fcffe5fffafffeffc0ff0b00fcffdeff1300f6fff1fffdff1c001c000700f8ffdeff
1600eaffe3ffe9ff1200adff1c00edff0c001b0009000e001a00f1ffe8ff25ff0700350014000200ffff0000fdffdbff1700170007000000ceffc9fff2fff7ff
d8ff2200feffd3ff2a008c00c5ff07001300fdff1700bfff2c00fbfff3ff3500faff0000fbfffaff1500eeff2d0028000000d7ff2500e6ff080020004d001400
ffff0b00fafffcfffeff060006000e00f7ff1200fcfffbffb7ffedfff2ffb0ffcaffeeffeefff2ffceff21008fffa6ff16001c006c00e3fffcff1f00aafff6ff
12001b0000000c000d0020001a001e000a00f4ff1b00fffffefff2ff1300f5fffaffceffd4ffa5fff6ff0400e6fff4ff37001a00190028000e00190029001300
00000c00fefff2ff1100ffff1f0007000e001100f4ff7dff120019001800130023001300e2ffb9fff5ff250048000b000800d1ff10002800140023001500beff
0000160004000b008effedff1f00fcffb9fff9ff6600fbff11000a00010023001c00220017009aff24001b00e7ff260080fffeff0e00e8ff2900c2ff1c00f1ff
f5ff00000600f0ff69001600180076004100230008000b0096ffe8ff1e00f9fff8ffd3ffe2ffcaff79ff0a002600e2ff2b00efffffff230022000a00f1ff0200
0200feff26000a00daff1b00efff20002e0010002e00100014000c008600fcffedfffdffffffcaff0500ffffe1ff1a00f0ffdbffe7ff12000c000300ffffddff
1300f3ffdeffecff1c00afff1800f2ff09000d000b000c001300f7ffcbff63ff0a002f001400f2ff0200feff00007bffffff0c0009000600d8ffc5fff8fffdff
d1ff1d00faffdcff2d008e00c8ff0300fcff02001900c7ff1b00f8ffebff3a00fcff1e00f3fff0ff2100e6ff2e002700fcffe3ff2300040001001c004a001b00
f3fffbff0b000a00f4fffafff9ff1f00f0ff200007000200b5ffe4fff0ffb1ffc4fff2ffe9ffffffdaff1f0085ffa3ff0e0021006900c4ffedff2500a6ffe0ff
170017001d0011000d0024001e0030000600efff1d00feff04001d002300f9fffbffdaffecffa6fff8ff0700f6fff5ff430028001600180018001f0028001300
000004000700f1ff1000ecff1100090002001b00fcff25000e0015001000f4ff23001700e6ffb8ffd0ff1d00460010000600f0ff13002f0010002f000600bdff
0100feff0800f0ff89ffefff18000300b7fffbff6200f4ff1500060001001b000e0029001d009cff1d001d00f0ff2d007cfff7ff0e00edff3200c6ff2600faff
f4ff04000400eeff6b00130013007600470082ff09000a009dfffbff1c000200f4ffe2ffe6ffd5ff76ff08001c007aff3000f0fffaff270021001000e8ff0300
0e00fdff22001e00dbff1d00f1ff1c002f0008002d00ffff1b0018008400faff0000f8ffffffbfff06000f00e5ff1700eaffe9fff7ff17001000f6ff0b00e3ff
f0fffdffd9fffbff1c00afff1c00f8ff0f001200180018001b00f0ffdeff81ff01003300180005000a000f00fcffc8ff1a00130006000000f5ffc9fff5ffefff
d2ff27000000d8ff28008c00bdff00000b00ffff1a00daff2100f5fff5ff3d00020008000100f0ff1700ecff190026000c00d6ff1a00fdff000021004b000c00
f2ff0d001000050001000800ffff2600f0ff060004000000b5ffe1fffbffb3ffc6ffebfffbfff7ffe2ff23008bffa5ff120018006b00dbfff9ff2000aaffd2ff
0b001900000010000900240020001a000400efff1c00fcfffdfff5ff18000300f6ffd4ffedffa7ffcdff1a00fcfff9ff41002300160002000a00180026000f00
02000e000000ebff120007001c00f6ff180083fffeff1d0029001f001d000d002d001900e9ffbaffe1ff2300370008001a00e6ff14002c00140031001700bbff
000004000900f4ff89fff4ff2600f9ffbaff00006200f9ff1100feff03001d001b002700260096ff27001800e9ff37007aff10000c00efff4200c8ff1a00f4ff
f6ff02000300fbff72001100110077003f001c000900faffa6ff02001f00f2fffeffc9ffecffcfff77ff0a001f00a1ff3300eeff0000210025000e00f2ffffff
09000d0023002300d8ff1600eafffcff2b000a001e00faff19001f008a000800effffffff9ffc2ff13001100e3ff1d00f9ffa7ff010020000500f5ff0700d5ff
09000600d3ff03000b00afff1300f8ff0f00170005001b002100fdffe2ff79ff0a00310088ffeeffe6fffcfff8ffc9ff0e00180001000b00f8ffc6fff2fff9ff
d7ff2200f8ffe9ff20008f00c1ff0400030002001200c3ff2900fdffc9ff3700fcff0800f6fffbff2b00e1ff02002600f2ffeaff1b00a4ff0700200047000700
ebff0700ffff07000000f7fffaff260001000100eaff0000b1ffe6ffecffb0ffd5ffe3fff0fffbffdeff230089ffa5ff1f0017006700e6ffe1ff2400a7ffe3ff
08002400070006000d00250018001800fdffedff2400f5fffcfffdff1600fcfffcffd9ffc0ffa4fffcff0f00f3ffffff3d0019000c0008000f00120029001100
feffffff1400efff130002001f0000000f00170000002000160013001f00f7ff2a001000ecffa1fff5ff1c0031000d001f00efff1400370008003100fbffbfff
000008000700e8ff84fffbff1a000200bcff00006500faff1200f8fff8ff1500140028002100a1ff20000e00eaff44007bff0a00dcffe3ff4100c8ff1d000000
edff00000400ebff62001300060074003b0022000d000000aafff9ff1c00ebfffeffe5ffe3ffe0ff78ff06001400cbff3100f0ff000028001f00120002000800
f9fff8ff15002000d8ff2c00e8ff0e002e00f8ff2b00ebff1d0015008700f2ffdbffecfffbffbfffffff1600ddff2000f6fff3ffffff14000500efff0e00dbff
1500f2ffd7ff00001d00b0ff2200040013001c001e0016002100eaffd1ff93ff140033001000fcfffaff100075ffcbff0b00600019000500feffc4fff4fff9ff
dbff2600f2ffe3ff2a009200bfff110003000e000e00e5ff3200fafff6ff2700feff09001300f6ff0800f2ff2a0023000100e3ff2700e5ff06002b004e00f9ff
e5ff1900000000000800f7fff6ff1600ffff0200f7fff4ffb2fff3fff7ffabfff0ffeafff7ff0100cfff230085ffa5ff0b002e006400f6fff0ff2500a8ffd9ff
08001c0009001b00050024001c0018000000f0ff1f00ffff0100f7ff1a00f6ffffffd9ffb4ffa2ffe9ff1700f1ff02004a001c00150013000000160036000b00
050000000000f7ff1200ecff4400070014001600d7ff1e00010011001800f9ff2a003900e6ffa3ffc8ff1e0037000c0021001200140030000b003c001400bfff
0000ffff0a00feff7bfffdff2e00f5ffb9ff0000680000001500fdff0d0015001a002d001900afff1e002400e0ff43006fff04001800e8ff3700c5ff0d00ffff
ecff06000400f0fffdff25000200720034001c0005000400b2ff0c002400edfff7ffe1ffe7ffd2ff7bff0d002500eeff2d00ebff0b000a0017000b00e1fffcff
1900feff26002a00dcff1300e6ff0b00300004002200f3ff05001c007f000400ebfffdfffdffc0ff0b000f00dbff2800fdff79ff06001b000600f7ff1700edff
0b00ffffd9fff6ff0e00aaff180000001400240019001c001f00d3ffdbff38ff100034001a001000f4ff0800d9ff14002600eaff07000300fbffc4fff4fff1ff
d9ff1a00feffe3ff19008d00c0ff00000d0000000500dcff2600efffeeff3800ffff1900fbfff2ff2300ebff2a002b000b00e2ff2100b5ff1500350048000000
e8ff07000300ffff0600f1fffbff3700fdfffdfffdfff8ffb3ffd7ffeeffb6ffe3ffe5fff7ff0000d2ff080088ffa5ff19001d0069000100e7ff2200a4ffc8ff
1300110011001300ffff2600210020000200ecff2100ffffffff0f002100f8ff0e00d8ffbdffa2ffe9ff1300f8fff8ff39001c0018000f00ffff190025000d00
fffff5ff1100fbff1400f6ff0e00ffff09001c0011001b00180010001e0000002d000d00e4ffd1ffdbff17004e00040020000a002a002a00130031000d00c1ff
02000c000900e7ff79ff050020002f00bbff0500690000000e000100f4ff1d00230027002000b2ff19001400ccff470077ff02001700e5ff3700c9ff20000b00
e7ff120005000aff3800e7ff150073002b001e000a000700bcff03002100f2fffeffe1ffdfffe3ff79fffcff1e0002003400edffebff1f001d000600efff2f00
10000e0022001d00d7ff2600000018002b000a002e00e8ff2c0019008d00faffe9fff9ff0000c7fffeff0800dcff2600f9ffe3ff06001c000b00f0fffdffe0ff
0d00f3ffeeffebff1b00acff0f00ffff170026000f0015001500eeffdfff25ff000039001800fdffefff09000300ecff16001f000d00070092ffc5fff7fffeff
d9ff1c000200d4ff12008f00beff00000d00faff1f00cfff2c00daffeeff1c00030014002000f5ff0000bcff1f0022001100efff2200efff000009004f001400
edff11000600effffeffe2ff00000700feff0800feff0c00b5ffdeffd4ff82ffc3ffe6ffe1fff3fff3ff230088ffa6ff1e0013006d00fafff3ff3000a5ffe1ff
0e002c000d0008001000240018003e000e00f4ff1e00ebfffcff0f001d00fbfff3ffa4ffd6ffa2ff01001800f7fff7ff000016001b00efff09001b0028001500
060007000500f5ff06000a001700030010001800ecff150008001e001700030024001e00edffc6ffe9ff11003d000f000d00ccff0d002f00180025001d00b4ff
00000a001100fbff86fffdff1a00ecffb8ff1400650004000900080015002100150029002a00b8ff0d003400f1ff090072ff00001200efff1d00bfff1e00f6ff
f3ff01000b0083ff18000f00feff70002b0019000600130094ffe3ff32000000e9fff4ffe7ffd3ff7bff21001f00d5ff2a0085ff0000230023001200edfff2ff
eaff0c0025001200d5ff3d00ffff0e002a0005002c002b00120013008d000500f8ffffff0500c8ff05000200e2ff1600fcfff1fff7ff2b001000ecfff2ffd2ff
1300fbfff4ffe6ff2000aeff1800f8ff11001e00150013001b00efffd2ff9bfffeff400016000500e8ff13000900e0ff0e00120013000a00a7ffc5fff4fffeff
dfff23000700cdff19009100c5ff0500fffff2ff1f00d0ff24000100eaff1c000900230025000300fbffc9ff250021000c00d8ff21000200fbff08004f001500
04000f0002000000f6fffcff1900240000000a0004000d00b2ffe5fff9ff9affbfffeefff5ffe4fff7ff30008cffa8ff1f0019006c00f4ffe4ff2c00a9ffd1ff
6fff2100130008001700230014003d001000efff2800caff1a0011003500fdfff7ffcfffd6ffa6fff9ff2000ebffebff1f0021001d000b000f001f001f001600
0b0014000000e1ff080003001100050001001500f0ff1d00fdff16001900090028001b00ebffc1ffe0ff0900440000001400d0ff1500340022002c001700b7ff
ffff09001400f3ff8effeeff2300f5ffb6ff00006800f4ff0e00eaff1100240015002c001c00bbff2d004500faff090079ff08001200e0ff1500beff2700fcff
f5ffffff100082ff2200170001007400360018002900120097ffcdff30003800fdffe0ffe5ffe2ff81ff10002800b8ff27008eff0000200025001200f3fffaff
eeff12001b001500d8ff34000200130029000d0032003600110017008e000000e9ff06000500bdff0b00f6ffe6ff1500f2fff8fff2ff21001100f4fff2ffe6ff
1000f3fff4ffddff2200acff1400f8ff0a001c0016000a003300f7ffddff98ff0200400016000a00f5ff0a000300ccff0a000e0013000400cbffc5fff5ff0600
ddff2000fcffd3ff1e009200c3ff05000f00efff1400ceff3800e5ffedff1e00000011002200f7ff0f00d5ff270020000900e0ff2500d7ff00000c004b001c00
eaff13000f0005000000160009000600faff1f00fefff7ffb6ffe9ffeeffafffaffff9fff1fff5ffd5ff2a0089ffa3ff16001e007000e6ffedff2400a6ffd9ff
12002300010008000c002000150039000600e5ff1d00fcff04000a002a00f8fffbffd0ffdfffa6ffffff1b00eafff0ff3800110018002300160021002c001f00
09000f000a00e6ff0f0005000e000b0008001400f6ff83ff080015001a0004002a001b00dfffc3ffe9ff2600430005000400d1ff1500330017002a001400b8ff
01001900fdffffff94fff9ff1c00f8ffb6ff01006a00f3ff110009001500230018002a001d00baff31004400f2ff0c0077fffaff1300e4ff2500c0ff1000daff
efffffff0c0081ff2200110007006f0022001c000a000f0097ff16002e00faffffffd3ffe4ffd4ff7fff20003400b1ff230083ff0000210027001200f0fffdff
eeff0a0017000b00d6ff2600f7ff18002f0008002b00200013001a008b000400f5ff07000b00cbff03000000e5ff1500eafffaffc6ff3000ffffebfff5ffd6ff
0d00f3ffedffeaff1f00abff2400f9ff020014000e0022002f00f4ffcaff4eff070037001a000400f5ff0a00070095ff02000e0017000c00e0ffc0fff8fffdff
d2ff1b00f2ffdaff1e009500c2ff0100010000001b00d6ff2600f4ffe0ff1c00f4ff0e002400f3ff0c00ceff18001f001100c3ff260006000b00240049001200
f6fff1ff03000400f1ff010006001800f5ff220001000900b2ffeafff2ff8effbbfffafff2fff3ffdeff27008affa4ff14001d006e00d4ffe9ff2300acffd0ff
170019001c000b0007002300210039000200f0ff1e00fbff010011002500fafffbffd6fff4ffa6fffbff1f00ebfff2ff390028001b000a000c00200032001c00
f1ff0f000100e9ff1000fdff0f00050012001400f7ff1f0013001900040000002b001500eaffc8ffd0ff1a003d000a00ecffcfff1000350010002f002700b8ff
0000f9ff0700e2ff95ff01002700fdffbaff04006e00f7ff1100060013001c000e0025002100c2ff1a004900f7ff120073ffe5ff1000edff2e00c4ff2000fbff
f3fffdff070081ff1e00140004007200340081ff09000400a0ff0d003200f7fffbffcaffe6fff6ff7fff1f002f00bbff280085fffbff1d0024001200f0fff8ff
efff03001b000c00d4ff2900f8ff15002f000d002f00faff140012008a00f6ffffff0b000700c3ff0c000c00e8ff1800f2fffdfff6ff1e00ffff0b00feffe1ff
edfffeffe5fffaff1500a6ff1a0003000d001f001e001f000c00fbffd3ff42ff02002f00130000000d0014000600d6ff130018000f000700f3ffc5fff7fffcff
d3ff2400fdffe1ff24008c00baff10000300f4ff0e00e1ff3500f1ffebff2200020015002f00edff1f00deff080023001400cfff1b00f1ff01001d0048001200
dcff11000a000f00faff040001001900e9ff08000000feffb1fff1fff0ff97ffc1ffefffeefff6ffdcff1c0082ffa4ff180014007000dbffdcff2500a5ffcbff
18002200f8ff1400090020001a002b00fcffefff24000a0000000a002000f8fff6ffddfff9ffa5ffe6ff25001300f6ff4900160017000c000a0018003e001b00
06000d000900dfff130012000c00060010007efffbff1300090015001c0004002f001700ecffc1ffecff1900300006000700d4ff10003000150030001100beff
fefffdff0b00eeff8cfffdff2500faffbcff05006900f8ff1500080017001c0019002e002400a4ff26004d00f7ff2c0073ff0400060007003600c7ff1400ffff
f2ffffff080081ff240015000f006f00390015000800deffb3ff0e001e00edff0100daffe5ffe3ff7fff1e003800c7ff2f007afffcff230026001200f1fffcff
fcff150019001e00d3ff1600f0fffdff2c000b001f00f9ff160016008f000c00f6fff8ff0900c3ff15000a00e9ff1e00fcff0000efff1900fdfffafff7ffe3ff
11000700e1fff6ff1200a8ff19000a001500220004001d001200f3ffe3ff7bff170035007eff1300f7ff0b000000c0ff1100360009000200fbffc4fff4fff3ff
d9ff2400f4ffdfff1d008f00b8ff06000600f5ff0d00cfff2a00f4ff1c002400000010003400e7ff3900dbff0c001e001200d0ff1d00f5ff0400160048001200
dfff0700ffff00001200f2ff07001e00feff0500effff7ffacfff6ffedffa0ffd2fff0fffaff0000e6ff1c0087ffa4ff1c001d006c00e6ffeaff2300a8ffd3ff
15002100fcff1b00160020001c002a00faffecff260002000600060029000500fdffddffecffa2ff02002a00effffbff44000f00160010000800190027001700
0700ffff1300dcff17000e000f00080019000700f5ff1b000b001c001800fbff2c002200f2ffc0fff7ff17002500010017000b0016003200070037000700bdff
000003000e00dcff90ff02002f00fbffb9ff01006900f8ff0d0000000600140011002b002100aaff20004b00f8ff35007cff0b00ccffe6ff3800caff21000800
efff00000a0088ff0c00150016006f0036000f0008000400b7ff13002500faff0600d1ffdbfff6ff81ff1f002800e8ff340082fffdff220021001400f7fff7ff
ebff060014001900d6ff3100f3ff0c002e00f3ff3200f1ff1800140089000100f0ff04000200bcff05000500e5ff1b00ffffceff0b001d000300f8ff0200e6ff
1700f7ffd9ff0000f5ffa8ff22000f0011001f001800140010000700deff9cff1c0036001200d4ff0d00070072ffd4ff130047002c000f000000c5fff6fff3ff
e2ff2a00f4ffe5ff1f008f00acff07000800ecff0200e4ff3900f7fff4ff220004001d003800ebff2300f1ff28001e001d00d7ff2300f5fffaff08004d00faff
e7ff1100faff09000f00ebfffcff1400fcff0900eafffaffb0fff1ffedff85fff4ffe7fff8ff0000deff110081ffa6ff01002f006a00eeffe7ff2900a0ffcbff
0f00190004000d0001002400210024000800f0ff1c0000000900080015000500feffddffe0ff9ffff4ff2000ecff080041000300170013000400130031000e00
0200f2fffdffe6ff1600fbff5f00060007000f00fdff1c0008000c001300fbff2c003500efffa1ffd1ff2300340005001400feff15002800090043001500bcff
000002000700daff7dff18002e000800b6fffaff6700060011000b000e0016001b0031001f00b3ff27005000f3ff3f0079fffbff1900eaff4100ceff1d00ffff
f2ff0100080081ff7cff2d00030074002c00140013000800bfff14002500f5ff0900dbffe0ffebff7fff10002800f4ff31007cff07001b0018001600ddffdfff
2900feff1a002f00ddff2f0015000c002f000a002800e4ff0a001c0084000200f5ff00000100b9ff06000500e3ff18000400edff03001f000700fcff0d00e8ff
14000100e4fff4ffffffaaff18000c001700220017001f001f00d1ffe1ff37ff08003600160009000d001700dfffd3ff170043000e0005000800c5fff6fffbff
deff2000faffeaff13009100abff0a000a00eeff0000ebff2900f0ffeeff1d00000014000b00f3ff2800e6ff2b001f000900d3ff2100030001001d004c000400
e8ff120003000c001100f0fff7ff2100fcff0700f4fff3ffadffe9fff8ff93fff1ffe8ff0000f8ffdcff110081ffa7ff0f002c006a00f0ffe6ff1d00a0ffc0ff
19001a000b0011000a00240022002a000900f4ff2300fdff010012001c0007001300dcffd3ffa5fff7ff3100f2fffbff31001400190015000b001c0026001800
0800f5ff1200eaff18001300f1fffeff16001000d8ff1500fbff10001800f6ff30001a00ebffa0ffd2ff14003a0000000f00100023003000090038000600beff
01000f000b00e8ff7eff140035002d00b4ff0a00680000000b0005000b00130008002e002200bbff19003d00ecff310077fff8ff0d00ecff3700cbff1a000200
dcff1200090069ff8fff130016006a001f00140013000600c3ff14002100f0ff0200d7ffe3fff3ff81ff1f001f00fcff360084ffdcff020017000600e0ff1100
fcff010018001b00daff3700000001002d000f003200e2ff480019008900f9ffeffffbff0900bdff05000d00dfff1c000e00e0ff08001f000000fbffecffd6ff
1300f1ffe8fff2ff0f00abff1d00faff1100230012000b003100edffcfffdaff00002e0011000100f0ff04000700e5ff0d00250004000200cdffc6fff5ffffff
d7ff18000000d1ff1c009000cdff0f000400feff2300d9ff2500dcfff0ff2500f6ff15000800f7ff0000c0ff0f0020000900f9ff20000300fbff10004d000d00
000010000600eafffbffceffeaffd5ffffff09000300fdffb6ffe3ffdcff94ffd2ffdfffebffe6fff1ff1f008bffa4ff190011006d00f1ffe5ff2900a4ffe3ff
190020000600020007002200170037000f00f5ff2100e3ffffff00003900edfff1ff9affcdffa4fff3ff20001100f7ff70ff20001a001d00060019001b001600
010002000000e5ff0a0005001f00080018001b00f5ff1c00140018001100ffff21001300ebffbaffedff090047001300feffceff0f003300110018002900b3ff
ffff07000b00f8ff86fffaff1100eeffb4ff0e006200f8ff0800f1ff10002200150024001e00abff07001800f6fffbff75ffedff1500f4ff1e00bfff2900ecff
f8fffeff0a0091ff09000f00020071002f00200004000b0088fff1ff1b003500d9ff0700e8ffcbff80ff20001d00fdff2f00f0fffaff0a001e000f00e5fff4ff
0200feff1b000c00d9ff3800f1ff0c00280005002c0025000d000f008e00fcffedfff8ff0000ccff0200faffe1ff1700f9ffecffeaff16001a00f8fffeffd6ff
1800f6ffecfff1ff1500acff1a00f9ff110025000e0014002c00fcffc5ffddfff7ff2e0010000000f8ff00000700d3ff0b001e000600fdffbcffc3fff2ff0300
dbff1d00fbffdbff1b009200d5ff1100f4fffdff1e00d4ff2f000600efff2d00010024000a000800eaffdaff160021000c00e4ff2200f3fffbff0d004d001100
1d000f000200fbff0900e9ff1f003500f8ff100001000b00b6ffe8fffcffa6ffc2ffedffeeffefffedff220086ffa6ff1f001d006c00eefff1ff2200a3ffe0ff
65ff1f00140005000e0021001b0035000e00eaff1f00a8ff27000e001700f3fff6ffd2ffd7ffa7fff2ff25000800efff10002d0019004b000b001e001d001c00
0b0007000800f6ff0e0003002500140007001700f8ff20000e000e00110004002a001500e9ffb4fff6ff0e0048000c00faffd5ff1100360012001c002700b5ff
0000fdff1400000087ffeeff1d00e9ffb0ff00006100edff0e00e7ff0d00250011001c003100b4ff16001c00f8fffbff75ffe4ff1700faff1100beff28000200
f3ff01000900a5ff0d001300feff7200390020002900080099fff1ff18003900ecff1200e3ffbcff81ff1a002200e2ff290081fff5ff100022000f00eeff0000
0600050016001a00d7ff2100fcff18002b00080025003b00080014008d00fcffedfffdff0000c0ff0600f6ffe3ff0f00eeffe8fff9ff15000f00f4ff0000eeff
1200f1fff1ffe0ff1300a8ff2500f2ff09002000130001001700faffcfffdefffbff2e0018000500f0ff08000200c7ff0600200003000900d7ffc4fff0ff0600
daff1c00faffd2ff16008e00d7ff0d000e00f6ff1e00ceff2b00e6fff2ff2400faff0a000600f6ff0900d7ff09001f000000d0ff2200f8ff04001c004b001500
0e000e003e00060002000400efff1300fbff1d00fbffb5ffb8ffe1fff8ff9effc3ffefffeeffe4ffd9ff1b0081ffa3ff1a0026007000d9ffedff2100adffeaff
1b0020000b00050008001d001a0037000a00d6ff1700fdffefff0e003200ebfff6ffd3ffdeffa5fff7ff23001600f2ff1200310018000e000c00200027001800
020005000900f0ff190006002500130008001700fdff76ff0b001c001100090029001600dfffc4fffcff2b0043000e00d9ffd9ff1b0038000f001c002600b7ff
feff1700fdffedff8dfff6ff1700ecffb4ff03006300deff0d00f9ff11002400120018000f00b3ff2c001a0001000b0076ffd6ff1800f7ff1d00c2ff2000b1ff
f5ffffff0a0097ff12001900010070003200270005000f009cff180016003300f5ff0700e3ffb6ff84ff2c002400d1ff260091fff4ff050022000e00f9fff9ff
0e00fdff13000900d7ff1300ebff13002c000c00230029000c0016009000f8ffecff03000700d3fffaff0100e5ff1600ebffe3ffefff13000400e8ff0900e8ff
0900f6ffeafff3ff1100a7ff25000100f7ff1600010015001c00f5ffbaffe7fffaff2500160000000100f3ff0c00b8ff1a0012000e001200dbffc1fff6ff0400
d1ff1a00f7ffdeff1e009000dfff1a00f7ff08001a00dcff2d00f6fff4ff2700fcffffff0400f8ff0d00d9fff4ff27000b00e4ff2400f8ff0200ffff4a001400
05000500feff04000a00f5ffd3ff1b00f8ff1600fffff5ffb4ffebfff3ffb5ffc7fff0ffeeffefffe3ff240082ffa6ff15001b007000d3ffe6ff2300aeffd7ff
1a001e002400130006001e001f0034000800e0ff1500fdffffff1f001c00f2ffffffdbffdeffa5ffebff16001d00f6ff1a001f0017001900090021002b001b00
deff02000900e5ff170004001a000d0000001c00feff210017001600fcff2e002b000600e6ffc1ffe6ff1a0045000e0061ffe1ff1c003a00070026002e00b5ff
0000fcff0900f2ff92fff6ff2c00f1ffb4ff00006800f1ff1300f7ff0f001f000e0026001d00a4ff21001f000c0015006cffe1ff1500ecff2700c4ff3300f8ff
f0ff010008009aff12001800faff6e003c0076ff15000100aaff130015001d00f4fff6ffe6ffd8ff82ff20001b00e9ff270083ffefff0a001f000d00f1fff8ff
1100f5ff16002300d3ff2700f4ff18002d000d0020000600150018008f00f9fff2ffe7ff0100bfff08000600e3ff1900e5fff0ffeaff14000400e8ff0900e0ff
e4ffefffeafff1ff0000a3ff1b0001000d001600170014001300f7ffd1ffdcfff9ff27001600f5ff0b0036000400c1ff16001d001100f6fffaffc2fff6fff8ff
d0ff1d000000e2ff23008800d9ff0800f3ff00001200e5ff2500f2ff3c002300feff14000f00efff0600e6ff000026000e00d1ff1d0005000000100048001600
01000b0008000c001000fdffebff180000001000fafff0ffb1fff6ffecffa7ffdcffe5fff9ffe9ffdfff28007dffa5ff14001d007000c2ffcaff2500aeffc4ff
2500250000001300feff1b001e002f000000eaff19000000fdfffdff1b00e2ff0800ddffdeffa3ffd7ff37002d00f9ff2700170013000e0008001d0026001500
faff0100faffe4ff150006001b000900150079ff04001c001a001f00130001002e000400ebffc5fffcff150039000500f2ffe7ff1f0036000e002b002000b8ff
feffffff0900f5ff8afff7ff1c00f7ffbbff01006200f9ff0d00faff170014000c001d001b007eff230025000700370076ffe1ff030016003400c9ff2000f8ff
e2ff05000700a3ff0c001400fbff6c002a0020001100d9ffadff0c001a001a000700f0ffe6ffcdff80ff33002d00eeff2f0085fff3ff11001d000c00f7ff0200
1e00120019001d00d5ff1f00f9ff01002b00ffff2c00f8ff1a0016009300fcfff5ff0600fdffb5ff20000b00e3ff1800f7fffcfff9ff1c00030005000b00d7ff
06000300e0fffaff1d00a7ff220009000c00210006001f0038000200ddffd9ff1300270071ff0f000800feff0100aeff1d000b00fdff00000700c7fff8ffecff
d6ff1f00f4ffdeff19008f00d2ff070007000d000c00ddff3600f6ffe5ff2b00feff11000500e9ff1000e9ffe0ff24000d00efff12000400feff29004700feff
07000800f4fff9fff9fffdfff7ff1f00ffff0500dcffedffaaffedfff3ff98ffedffe3fffdfff3ffdfff220084ffa5ff0f0025007300daffd0ff2300a6ffcdff
1b002d00feff080000001f001a002c00f9ffdcff180000000900fcff1300f0ff1f00dfffdbff9fffebff24001400fdff2b001d0014000c0004001f0027001100
fffffcff2100e1ff18000b000c0005000f0018000f001d001a000e001300faff2f000400efffb4fff7ff1700300002000000020028003000ffff34000c00baff
ffff00000d00daff8dff050024000500b7ff0000620005001200f7ff09001000100025002a00b1ff0e003b00fcff47007cffe7ffccfffcff3f00caff31000000
e6ff050007009cff0500200004006f00220022000e000600bdff1c001c000b000600e2ffe0ffd0ff83ff36001800f9ff3800a2fff0ff08001c000700feff0500
2e00f2ff0b001700d4ff1f00f7ff0c002f00fbff2600e4ff100020008d00ebffeaff0000faffc2ff0e000400dcff1600f5ff0000040019000300ebff1a00d2ff
0b000200e2fff7ff0200a8ff24000d0011001a000b0020001a001300dcffe1ff09002e000c00d9ff1300080062ffc8ff2500e7ff380009000900c6fff1fff5ff
dfff2500f1ffe1ff1c009000c7ff1600feff06000400e7ff1f00f4ff1f00140001001e003800e9ff0000e9ff050027000900efff2100e8ff00001a0049000800
02000b0001000a000e00faffefff190000000300e6ffeaffaeffecffeeffa7ff0b00e7fff0ff0000e7ff19008fffa4ffffff27006d00edffc9ff2000a5ffc6ff
1c001b000e001c00ecff2200230031000200dfff2b000000000003001700f1ff2300e1ffdbffa1fff4ff35000400030030001d0012000c00f9ff17002a000e00
0000e4ff0100eeff1a0004001d000d000c001700f0ff18000c0008000e00ffff2a002100f0ffadffdbff23003800050010000d001e003100feff3c000c00bcff
030006000900e4ff78ff0a0012000500b3fff8ff64000a000c00f8ff10000f00140023001d00a8ff0c003b00fcff4e007ffff8ff1500fbff3700cbff1b00f9ff
f2fffdff020098ff0d003800fbff6e002a0020000c001600bbff2600220011000c00e5ffedffd9ff81ff2c0009001400350093fffdff4e000b000800dcffe6ff
1e00f3ff18002b00ddff200027000900290012003000e1ff1f001b008e00feffeefff1ff0200b7ff0e000d00e3ff2200fcffe5ff0a001e000f00f6ff1700daff
1b00feffe2fffafffeffadff17000a000e00220015001e002d000600ddffe1ff0f00320016001d00f5ff0800e7ffcdff1b00f2ff0e0008000d00c9fff4fff1ff
d6ff1b00feffe6ff22008f00c5ff03000200f1fff7fff0ff3200f1fff7ff2700fdff1a00d1fff5ff1100fafffbff26000400e6ff20000600f9ff23004900f4ff
03000a00fcffffff16001300edff1a000500fdffedffe9ffabffeafff2ff8bfff5ffe9ff0900f5ffdeff080096ffa4ff140035006a00e3ffd6ff2000a4ffc4ff
19001c00140017000200220022002e000400e4ff1c00f9ff020007001c00feff1d00ddffceffa5ffe3ff36000700f9ff25001c00160016000600150020001100
0100efff1600f1ff16000f0035000e0010001700220021000f0010001200020030004d00e6ffc6ffe6ff1700420002001000000029003500090036001400bdff
00000f000c00eaff7dff0c0023003b00b7ffffff630000000b00fcff0d0012000e0033002000b2ff09003a00eaff3d0081ffe9ff1200f9ff3c00cbff27000400
ccff0a000700f2ffc7ff1800efff6d0017001e0011001000b9ff1b0014000d000500e2ffe3ffdaff81ff26001a001000330097ffccff2d0008000400e8ff1200
2d00feff15002300d7ff1b00f9ff0a002e0011003300e4ff5b00160090000800e3fff7ff0700b6ff01000100dcff1f00f8ffcaff0d0015000700f8ff0100c5ff
0f00f7ffe7fff3ff0c00acff1c00f8ff12002a00120016001a00f9fff1ff0800fdff18001000fcfffcff04000500ceffedff210008000000d0ffc2ffefff0300
d2ff16000300dcff20008c00cfff0f00fcfffbff1c00e0ff2d00e5ffebff2100000015000c00fcff0d00deff15002500070021001b00f9ff010018004d000100
f4fffdff1200cefff4ffbaff490092fffaff02000800feffb3ffeaffeaff74ff0600d6ffe6ffdafff2ff1a0090ffa5ff180010007100dafff0ff2600a5ffecff
180030001300ffff0b001f001d002c000e00f9ff1300eaff4500ffff2700e9fff4ff9bffd9ffa7ff00002200effff7ffc7ff1e0017000c000f00160024002000
080009000a00d0ff0b00f9ff1500000017001900f2ff1e0019001600180000001f001400ecffc5ffccff0f00470013000300d7ff0f002e00110010002b00b3ff
ffff08000c00dcff8ffff6ff1500e5ffb7ff09005d00f6ff05000700080027000f001e002200b1ff1100010001000e006effeeff1600fcff0f00bcff1b000100
faff00000a0099ffffff1600f9ff6e00160024000a001200a1fff8ff1f000c00ccffeaffe6ffd8ff7dff150014000f002700fefff5ff0c001c000f00d2fff4ff
eaff02001f001500d7ff1b00ebff0a002b0007002500240013001b008d00f7fffefff2ffffffccff0a000200e2ff1900f6ffebffd2ff2c001e00f2ff0300bfff
0000feffe6fff1ff1300adff2000f0ff0f001d00090021004200f1ffedff0600ecff190012000400feff07000300ccfff5ff1e000a00fdffc5ffc3ffeaff0800
dbff1700ffffe1ff19008b00d5ff0a00f7fff7ff1c00ddff1f001100ecff2900100019000a00ffff0500ebff1f00230008000e00190002000100fcff4d000000
3600fbff2400f0ff0200d0ff2c00b8fff9fffcff06001000b1ffe5ff030099fffaffdeffefffeaffebff22007dffa6ff140019006f00e4ff01002000a8ffdeff
60ff2a001800fbff0d001d00170028001100efff1c00dbff4d000d004000ecffefffd7ffddffaafff1ff2600edfff4ff0a00260018001f0012001e0021000b00
fbff07000e00e9ff0e00feff190003000d000f00f8ff26001800150019000a0024001000e9ffb7ffc1ff1400450011002200d9ff11003300170010000d00b7ff
040001001700f7ff86ffe5ff1400ecffb4ff04005e00f9ff0a000a00020027000d0015001a00b7ff1900fcff120001006eff01001500f1ff0900b9ff1f000a00
fcff050008009cff0200190005006d002800200026001300a4ffffff23003500d7ffdbffe2ffdcff7fff07002000feff2300b7fffaff13001a000f00dafff9ff
edff060018002200d4ff0800f0ff0c002700f6ff2e003d000e0007008f00fefff9fff4ff0000bdff0c000500ecff0500ecfff0ffa5ff0d001700f6ff0300e0ff
02000000ecffd4ff0c00a9ff1c00e5ff06001e000c0024003a00f3ffeeff020005000f000e00040004000d00ffffaafffaff330002001300daffc6ffe4ff1600
d7ff1900fcffd7ff17008500d7ff13001f00f2ff1100e7ff3200e8fff5ff1f00f4ff10000c000600fbffefff170024000a000b001600f9ff03001d004900ffff
1200f8ff45000000f6ffeaff1f00abfffeff0800ffff0000b3ffeeff0000a3fffaffe6ffe9fff5ffc5ff230081ffa2ff170014007700b6ff05001c00acffdeff
1f002300110003000f001b001c0020000b00eaff0900ffff3a0008003400f2fff8ffd6ffeaffa6ff03001d00f2fff3ff06002100170023001400210018000b00
00000e001300e2ff1700fcff12000b000a001600fcff70ff21001f001a00270026001600dcffd2ffc8ff320041001b000500d6ff11003000160007002000b7ff
01001c00e9ffdeff89ffeaff1500ebffb5fff9ff5800f4ff0b00020009002d00150010003400aeff1c0003001000050070fff1ff170004001b00beff0b00e5ff
f8ff04000800b7ff0600070001006a002400240002000e00acff01001700fdffe0fff9ffdeffd9ff80ff0b002200eeff2000aefff3ff14001d000f00dffff6ff
ecff010019000f00d2ff1700eeff0d002900050020003a00050011009400fdfffcffe3ff0100d5ff0f001100ecff2000e6fff0ffe1ff18000d00e5ff0600d4ff
00000b00e9fff3ff1500a2ff2c00faffeaff19000c000f003000f7ffd9ff0400feff110017000f0013002d00010064ff12001f0010002d00eeffc0ffebff0f00
cbff1800fcffdfff1e008900d6fffcfff6ff01001700edff1f00f5ffe9ff2700fdfffcff060001000000e7ff11002600f8ff10001d000100100029004d000000
0d0091ff220007000400ebff13000e000000effffdff1700adfff0fff1ffa1ffeeffe5ffe9fff8ffdbff140082ffa6ff18001b007200aafffcff2100b2ffd7ff
25002a002700020000001d0019002e000600ecff1500feff21002e002600f0fffdffdbffeaffa4fffdff2600f3ffffff10001a0014001a0006001d0022000900
24000c001500e0ff1800b4ff1400f9ff00001b00f8ff25000e0017001900250025001600e6ffc6ffd7ff1d003d0013000000deff1a0036000e000f002200b9ff
03000100ffffeeff91ffebff2300f1ffbafffbff5d00f2ff1100fcff03002500190017001400bdff180008000f0010006dffdcff0f00faff3000c7ff22000600
f3ff070005009aff03000b0003006c00290076ff09000500b8ff0c002200f6ffe1ffe7ffe3ffcdff83ff01001900f0ff2300a2fff4ff1c0018000b00e1fff8ff
f1ff000014002600d2ff0f00f6ff05002b00f8ff29001e0016000c009000f9ff0900f9fffaffc1ff0b000f00e8ff1500e7ffedffe1ff0c000e00eaff1000cbff
d9ff0200e1fffeff0a00aaff1a00030004001d000c001a001600faffe9ff0100080014001700150026002100000064ff10002500160017000300c5ffedff0300
ccff21000400e8ff16008900d8ff0d00030007000700e2ff2e00f4fff0ff380008001c000200f7ff090018001eff2c000e00eeff18000a0006002d004800fbff
fdff040014000400f9ff0e00020017000b00effff7ff0700aeffeefff4ff95fff7ffd9ffe7fff2ffdeff1a008fff9fff0f000e007300a3ffe9ff1700b1ffc4ff
210029000800eefffdff1b001b0023000c00e2ff11000700140007001d00ecff0d00dcffe4ffa3ffd1ff29001400fcff140020000f00080009001a0029000d00
f8ff0e002400c7ff1400f3ff130028000e007efffaff23000e001a001d001d0031001f00e9ffbfffdaff0f0031000b000000ebff1c0032000f001b002d00b9ff
050001000e00f4ff8dffeaff1000faffbcfffaff570001000e00feff0c001e000e0013002100a6ff1400020013002b006dffedff06000b003900cbff21000600
efff05000500afff0c00160004006c000d0024001300edffbdff15000b00edfff8ffebffe6ffd9ff7cff05002600fbff2d00b4fff8ff320017000f00e4fffaff
f1ff1b0021002200d3ff1b00efffedff2b00f2ff170018001e0011009200f5ff0600f7fff7ffc6ff24001600eaff0c00fbfff8ffe1ff12000a00f7ff1500c8ff
00001500e7ff00001200a5ff270007000f001c0010001b002500fcfffaff00000800210073ff430025003400010081ff1c0000003600f3ff1900c6ffecfffeff
d2ff23000400e3ff17008700d0ff050005001200feffe2ff2600f6ffebff1900000013000500f5ff14000900e6ff28000a00020015000b00060019004200e6ff
0300edff11000700fdff1d00020017000d00f1ffe9fffdffabffecfff1ffaeff0a00e2ffe8fff8ffedff080088ffa3ff1f0014007500ceffe4ff1c00aaffd1ff
1e002900110012000900200018002900f1fff3ff1e0001001200fcff1f00ebff0c00ddffe1ffa0ffe7ff2100e2fff6ff1f00150009000b00fdff1a001c000c00
feff18003900c7ff1800f1ff1100ddff16001700f5ff2200060017001600040033004400efffc4ffd1ff1300230008001a00f4ff2c00300001001e000f00c0ff
020010000400f0ff8bfff5ff15000200bdfffcff560000000d00f9ff09001000080022001c00beff060021000e003b006fff0200d6ffffff4000ceff32000600
f2ff0e00040094fffeff270000006d00110023000d000e00beff10002000f3fff9fff1ffdfffdaff81ff0c00130018003300a0fff7ff45001b000900edfffbff
f0ffffff11002e00d5ff0d0000000c002f0025002a0001002100150095001b000000f5fff8ffbeff0e000e00e4ff1800f8fff0ff03000b000a0013002100e2ff
fdff0c00defffcff1700a9ff2d0008000a00250013001d002a00edfff3fffdfffaff1e000e0030003200160062ffc0ff210003006600faff2300c6ffeefff9ff
d9ff1f00fdffe7ff1f008a00d1ff0d00fdff0b00efffe6ff3500f0ffeeff2900000013003000f0ff0f002400f2ff2a000c000a0019001500010021004300feff
ffff0900010009000600180000000e000100f5ffdefffbffb3ffd4ffefff91ff1200ddffdcfffdffe4fffbff8dffa2ff080026007000dfffe0ff1d00a2ffccff
1d001e000f001400030022001f002c000a00f0ff1c00030009000e002400efff4600dbffdbffa1ff00001f00e0ff000027001f000d000d00f2ff140014000600
0000feff3900d4ff1100feff0a00f3ff0a001c0000001800070012001100030032002600efffcdffbeff18002c000800160013001a002c0004002c000c00bcff
070010001100e2ff8bfffeff0c000e00b6fff7ff620005000a00faff0000120000001c001800aaff1e002300130049007bfff7ff1d0003003b00cfff32000500
f2fffaff0200b6fff0ff3800dbff6d0006001e000e001000c3ff09001200feff03000100e5ffd2ff7aff030009001d00300095ffffff250015000b00e3ffecff
2f00080020002e00d6ff1c0026000a002d0001001600f1ff390014008d00e1ffffffeefff9ffbdff0b001200e8ff20000000edffffff0f001a00fbff2400c6ff
ffff0d00e4ffffff1c00a6ff190007000a001c001b001f003000faffeaff020009001c001b00590013001200e9ffbfff190009004800f5ff1600c6ffeffff6ff
d1ff23000500ebff15008800c1ff00000100f4ffefff06002400e9ffebff17000a001500f4ffebff16001b002c0024000300ffff1600edff040034004900e0ff
faff0c000100ffff1d002200feff1a000800f1fff5fff2ffaaffddfff8ff8dfff9ffe3fffcfff9ffeaff050094ffa5ff120044006e00ccffecff1700a5ffcdff
1f00240010001200040025002e0022000400efff1b0006000c0001002300e7ff0e00dcffc9ffa4ffe3ff3600e9ff00001c001700120012000b0015001a000e00
0200ccff2a00eaff1800fdff0300e5ff16001a000c001b00060011001200f8ff31004100ebffd6ffd6ff20003800000010000700290031000a0023001700c0ff
05000e001400f0ff88ff0d0022003800b9fffcff6200f9ff0c00fcff020014000b0029002200bbff18001900070041007bfff4ff1500efff3a00ceff24000800
c6ff06000400f1ffedff1800cbff6b00f7ff23000f001500c7ff0c001900f8ff0500efffe5ffdcff80ff1c0018001a002e008ffff3ff1b0009000900d1ffd1ff
faff11001a002500d8ff20000d0008002c0015003400efff4f0007008f00f6fff6ffefff0300b6ff07000e00dfff2000faffdfffffff10001c0005000a00c1ff
0b00f9ffe5fff8ff0c00adff2100efff030020000e0027002a00e7ffeaff0e00060004001900eefff0fff1ff0200c1ffd8ff0900f9fff3ffd3ffc7ffebfff8ff
cbff16000800ecff13008c00ceff1f001200f3ff2400e2ff29001300e9ff1200ffff16000500f1ff07001200210025000000f8ff1800000008001d0049000d00
f7ff0d00fbffa5ffedffcaff23000b00f5fff5ff0100f3ffafffdefff9ff99fffcffd8ffe2fff6ffeeff1a008affa5ff17001b007200dbff03002100a9ffecff
270026001000f5ff0d001e0020001c000c0002001d00eaff0300fcff1400fafff1ff94ffd8ffa9fffcff1f00f1ffe5ffeaff1a0018000300070016001a003500
00000000e9ffe0ff0900fcff130008001d001d00f2ff230001000c001800000023001600e7ffb3fff6ff0800460013001c00d5ff110028000e0000002900b3ff
030014000400d9ff97ff00001800f0ffb6ff10005d00f4ff0a000900fbff2900180015002100c6ff1c00ecff0300ffff70ff02001200f6ff1b00c1ff15000000
fcff04000700a1fff7ff1300ffff6b000800270016001800aaffffff2300f8ffc4ffd6ffe2ffe5ff7dff120019001c002600ecfff7ff0a001e000a00cefff8ff
e9ff07001d002000ddff1b00e9ff0e002d0000002d0003000c0012008700fdfff9fff4ff0800d5ff02000400e0ffcefff2ffeaffe2ff52001c00f9ff0300ecff
0400f1ffdafff7ff0e00abff1a00ebfffdff250008004b001b00f4fff6ff0800e9ff07000b00f0ffe1fff5ff0300c9ffe9ff0d00fefff0ffcdffc4ffe4fffaff
d4ff2000f7ffd0ff26008900d2ff18002500f8ff2000deff27000800e9ff2c00fbff21000d00fbff09002c0031002400030008001800f7ff0c00110046001000
f5ff1000dbff0b00f5ffd0ff4700f1fff3fff5fff8fffaffaffff0fffeff93fff6ffdeffebffedffd5ff170090ffa4ff21000f007200daffecff1a00a8fff6ff
76ff33001400f8ff0f001a00210016000c0002001900ccff330008001600e3fff0ffc6ffe0ffaafff1ff1800f1ffe6ff03002200150019000a001a0026001000
02000700f8ffe4ff090002001700100016001800f9ff3200faff14001400080021001b00dfffb8ffdaff090046001a001600d8ff19002800150000002000b6ff
00000a00fbffd8ff91ffebff0d00e1ffb4ff03005c00f3ff0a001b00feff2b00170017002200caff2500f0ff0b00010073fffdff1800f5ff0b00c4ff2c000b00
fdff0500060094ffffff0700faff6b000f0024002b001200abfffdff1f002800c4ffd7ffdbffe9ff7cff0a00190010002400b3fff8ff08001c000b00d9ffffff
e6ff13001d001300daff0c00f1ff1a002a00fcff2b0025000a00180088000800f9ffe7ff0200c8ff07000200e7ff0f00e3ffecffe8ff32001f00f7ff0700f9ff
efff0500e3ffdcff0600aeff2800dffff7ff2100090042001e00faffebff0e00feff06001600f2ffedfff5fffeff9affd7ff1200f4ffe9ffe5ffc9ffe9ff1000
d1ff1a00fdffeaff24008d00d6ff35003300f0ff1900e8ff1e001600edff2100e2ff0b000900fbfffdff2d001b0022000200ffff1800efff1100170045001000
e6ff0dff2e000800efffd8ff00001b000100fbfff2ffe9ffa7ffebfff6ff8cffe5ffdfffeafff5ffb0ff1a0062ffa1ff200011007300aeff1d001700b2ffedff
2a002a000300ffff090018001d0023000c0000001100f9ff04000d00fffff2ff0000ccffe5ffabff03001800edffe3ff1900220019001e00160016002b001700
10000900f8ffddff120003001200120006001e00000080ff09001f002000fcff24000d00d3ffd1ffd6ff3200430018001900d2ff15002700120000001600b8ff
07001f001700e0ff97fffbff1f00efffb1ffffff5f00f4ff0e000e0000002c000b0017000e00d0ff3600efff0c00060072fff8ff1a00f9ff1d00c6ff1800eaff
f6ff07000400a4ff03000a00fdff6f0013002f000d000c00acfffcff1100f8ffc7ffe5ffdefff7ff83ff08001b000e000e00a9fff9ff07001e000700d6fff2ff
ebff0a0016001700dcff1300f0ff08002b00faff29000f000400fdff8a000b00f8fff2ff0300deff0c000900e2ff0500e2ffe5ff99ff29001000ecff0400ecff
dfff0700eafffaff0f00aaff1600eeff77001a0005003e000e00f2ffe9ff0b001100ffff1400f5ffe6fff1ff01009bfff3ff1400feff0000f1ffc2fff4ff1a00
c5ff1900f2ffe8ff1e008e00d9ff2800220008001d00dcff28000c00eaff2b00f8ffefff0600fcff13001c0019002600fbff12001600f7ff16000f0041000600
ebffd1fff5fffaffedffeafffeff1d00fefff8fff9fff8ffaaffe9fff6ff97ffdbffe0ffe9fffbffc1ff100084ffa4ff14000900720098fff7ff1900b2ffddff
220023002200dfff020019001e002000090001000d00f6ff02003f001300eeff0000dcffe7ffa5fff2ff1400f1fff6ff17001a0014000c000e00170023001400
fcff0300f3ffdeff170003000b0083ff08001f00fdff2e00f7ff16002000260025001600e2ffd1ffe7ff0d0039001a000500dfff21002f00100004003000b6ff
04000c00f1ffdaff96ffedff0d00fcffb8ff010059000a0015000400fcff27001e000f004300d8ff2200f6ff1100190066ffedff1600feff2d00ccff12000900
f4ff02000200aaff04000500f8ff6f000b0087ff10000900baff0b000d00fcffddffe5ffe4fff3ff7dff060022000a001c00a9fffaff13001c000600d5fff8ff
f8ff240019002600daff1100f2ff18002e000400190005000b000d008b0006000a00f8ff0700d0fffcff0600e7ff0c00dbfff2fff9ff1b001400faff0700f3ff
47ff1400dfff03000700abff3000fdfffcff2500130027003100ecffddff0a000000040020000000fcff1a00feffaeff0a001c00f3fff6ff0300c9ffeeff1600
c6ff27000100eaff23008900d5ff3b00140018000e00efff22000100e8ff2f0002000d000b00f6ff0c00360009002600f3fff0ff1b00ffff1600220042000800
e6ff21ff03000400cefff5fff5ff17000000f0fff7fffaffa7ffffffefffafffd5ffe5ffe9fff5ffc4ff140087ff9fff0c001500700092ff0d001900b0ffe8ff
21002b00f8ff04000d00160018002800feff05001c00fbfffbff07000c00f4ff1400d8ffdaffa8ffe9ff1a000900f7ff1a000b0012000b000800170024001100
fcfffdfff6ffd2ff14000500ffffd4ff130081ffe7ff26000c001b001800070031002200e8ffc6fff8ff150031000b000900eaff20002a00170005001f00bbff
03000a00feffdbff94ffeeff2f000100bafff9ff58000a000e00ffff05001e00f0ff17001d00c5ff1b00f4ff130027006efffbff0800feff3800d0ff22000a00
eeff08000000a9ff0500150000006d00f6ff2c0013000000bdff0a000800f5ffecffe0ffe5ffeaff7eff0e001e0017002a00b6ffffff18001e000100e1fffcff
e9ff22001d001e00dbff0a00edff02002e000000220000000800060091000e000b00fbff0300ccff23001100e8ff0f00f4ffefff070017001b0000000400f2ff
dfff0000e4ff0e000800a6ff2500ffff00001f00090028002400e0ffe0fffcff080005007cff0000f5fff0fff4ffbaff0b000500fbfff4ff1300c9ffeffffbff
d4ff1e000a00f9ff1e008a00d5ff17000b00fefff9ffd2ff34000300f1ff1c00020011001100f4ff16004200eeff2600fbff06000f00f8ff140015003600f7ff
f3ff1300f8fffcffefff1100f0ff14000c00f1ffe3fff8ffb2ffe2ffeeffafffd3ffddffe8ff0400d3fff3ff95ffa3ff21000c007100b9fffbff1800abffdaff
1d0028000f0004001a00200022002400f1fffdff20000100f9ff03001000e8ff2000dcffe1ffa2fff3ff1e00e9fff0ff16001f00100009000d0016001d001100
0800f6ff2500c9ff1700fdff07003cff13002000ffff240002000f001500030039001900ebffceffe6ff140014000d002500eeff1f002d00060014002b00bdff
030014000000deff8efffbfff2ff0800b7fffbff5e0016001000f5fff7ff1d0017001e002100d5ff330000001400370075ff0f00d9ffd7ff3a00cdff24000a00
e7ff05000400a3fff8ff1e000e006a00eeff280014001200bcff06001f00f7ffecffe8ffe1ffe3ff79ff210021001c002c00a8ff000026001e000900e4fffaff
f2ff2e000b002300dbff1500efff1a003400e3ff2300fcff0c0015008f0033000600f7fffdffcdfffdff0900e7ff1b00f3fff9ff190013001700f7ff1700f3ff
e1ff0b00e5ff04000d00abff1e00ffff0c0021001b0026002700f2ffd9ff0b0010000f001d0017000000f7ff60ffccff1900ffff2800f9ff1900c8ffe9fffcff
d6ff28000200f5ff1f008a00cfff2c00070017000100e7ff2a000000e9ff07000c001b002a00eeff08003e00040021000500fbff2000ecff0b002d003e00cfff
e1ff1400f9ff0600f0ff1500ebff1000f8fff7ffe3ffebffb1ffd8ffe9ff94fff0ffdcffe3ff0200ebff220091ffa1ff130027007000d1fff7ff1a00a8ffe6ff
1e001f0008000a00f5ff1b0024001e000700fcff1f000400faff02001000e9ff2c00dcffd8ffa6ff18001a00e5fff6ff260025000a0008001500140033000b00
fdff14ff0300e4ff1100f7fff3ff090009002200eeff1c00020006001300fbff35002000eeffcaffddff19001f00040018000d000e002b000b001b001c00baff
04000700ffffcfff8efffcff1b001400b7ff0000630009000b00edffe3ff1b001b0022002000ceff2200100010003d007afff1ff0e00f6ff3d00d1ff31000b00
f0ff04000300c2ffedff2f00eaff6a00f0ff260010001400c6ff0e000f00f2fffeffdfffe0ffdbff76ff17001b002d003000afff0d00150016000400deffeaff
230019002d002800ddff12001b001300310000002600eaff100007008d0015000200f1fffbffc9ff05000e00e3ff1e00f1ffefff0800100024001c001b00eaff
faff0700e5ff01000900a8ff1b00fcff0c0021001c0015001e00e7ffe2ff0b000300030017000d000000f5ffeeffcdff1b0002000a00f6ff1200c7fff1fffbff
ceff21000000ebff22008a00c8ff1c000a00fdffeeffebff3800fbffeaff0d00060017000a00e9ff1a00330021002500fdff0c001e00f0ff0a0027004000f2ff
f4ff1100edff0200ffff1000f0ff1b00f0ffe7ffddffe7ffa9ffd7fff8ffb2ffd9ffdbffe2ff0000dcff010097ffa8ff0f004d006d00cfffe8ff1300a9ffd3ff
1800110006000000170023002e001f000900f8ff27000f0000000b001400e9ff4d00dbffd4ffa9fff0ff1f00ecfff4ff1a00160015000c0004000e0026001300
0300c7ff0800e9ff1600ffff0400070018001d00ffff210000000f001200f7ff2a001300e7ffc7ffdeff1c00320009002300feff20002a00070011001900bcff
07000b000100cfff89fffcff11003b00b5ff030061000e000a00f5fffbff1c0016001b002100cbff1b0007000d00300077ffeeff1500eeff3c00cfff2a001300
c5ffffff0000e5ffe8ff1400f7ff6a00e4ff2a000b001500c5ff02001a00f2ff0300ebffe4ffd7ff79ff26000c0038003000a1ff1100fcff12000900ceffe6ff
e8ff1f0025001a00dcff1600ecff1700300008002700e6ff3f000e0088001e00fcfff2ff0800ceff03000500e4ff1600ffffedff100019002000feff0800cbff
16000100e1ffffff0f00b0ff1b00e4ff06001f00060015001400f8ffd5ff16001d00e9ff0c00f2ffe9fff3fff6ffa0ffecff0400f4fff8ffd5ffceffe3ffeeff
cdff1700f2ffd2ff0c008d00ceff0d00fcffedff2700beff2b00f4ffeaff23001a000c000700edff0300040021002500fdfffaff1c000000130008003e000e00
efff0d0001009dfff5ffd6ff0b00fdfff3fff7ff0600f0ffafffe2fffcff7fff0800ddffe6ffeefff4ff14008bffa6ff1d0016007100dfff01002300aaffdaff
350026000b00f9ff170020001f0018001000e6ff100000000500f7ff0a000a00e8ff88ffd7ffadfffcff1500eeffd8ff09001a00120003000e0016001e001e00
04000600f5ffedff0200ebff0c000b001e001d00f2ff2900ffff0f001800f9ff23001500e8ff9effe3ffeeff3b002f002300d6ff09002c001b00fbff3400b8ff
0b0025001000f0ff91fff9ff1d00edffb4ff15006100faff06000300ffff2d001c0013002500d1ff1700e2ff00000f0079ff0b001400f8ff0400cdff17000400
feff06000200b6fff5ff1800f6ff7000f9ff260016001500bdffffff1900f6ffc5ffdfffe2ffd8ff80ff00001a0026002100efff010000001d000200c9fff1ff
e0fffcff17001900e4ff0f00ebfffdff3000000027000400040010007c00f5fff4ffeefffeffd7fffbff1b00d3ff1e00e9ffecfffdff31002700f5ff0c00f6ff
1c00faffd1fff9ff1700aeff2500daff10001b000b0023001e00f3ffd2ff0b00f6fffbff0f00f3ffebfff6fff5ffb8fff5ff0f00fbfff9ffdbffc4ffe0ffffff
d4ff1a00f0ffe9ff1d008d00d6ff0e000000f5ff2200b0ff1a001100e9ff22000d0011000900ffff11000f00210023000600f1ff1900f9ff10000f003f001400
00001c00000017000000d4ff2200f3fff6fff8ff0000f8ffaeffe9fff7ff88ff0f00e1ffebffeeffedff190080ffa8ff1b0011006900daff28002300acffd5ff
71ff25000800f4ff0e001a0023001f000900ecff2100e2ff260008001400fefff4ffbfffdfffabfff5ff1a00f4ffd3ff0a002900170019000d00160019002700
0f000b00f7ff09000500ffff17000e0015001900eeff3800000017001300fbff22001100e1ffbeffd5ff040041002c002700d8ff16002900200005001b00bdff
090022000b00ffff91ffeaff2500f1ffb4ff06005c00ffff13001900000031001a0017001b00d3ff1500f2ff0b00070071ff07001800feff0a00ceff0e000700
f6ff09000200b2fffaff1100f8ff6f0007002c003e001300b9ff00001e001f00ccffd5ffdeffd5ff84fffaff17001c000f00bbff010003001b000000d7fffbff
e6ff030018002a00e1ff0e00effffbff2c00020033001200030010008300f7fff7fff9fffeffc2ff02002800e6fffeffddffebff060017002600f8ff07000d00
0e00f7ffdcffe1ff1100adff2400d3ff00002100150021001500fdffdcff0e00090000001100f6ffedfff8fff4ff99ffedff1900fbfff9ffedffcaffe4fffbff
d4ff1b00f0ffdbff1c008d00dbff15001a00f9ff1f00d6ff30000400ebff2400ffff03000d00fbfffaff09001a002600040002001b00f6ff100018003a001000
edff18001e000000f4ffe7fffdff0f00f5ff0000fbfff2ffaaffeafff0ff98ffeaffdeffeefff3ffdeff170094ffa5ff100013007100c1ffedff1300b0ffdcff
38001d00f1ffe6ff19001a00170024000200f1ff1000fbff0b00100012003100ecffc8ffe0ffa9ff06000b00f4ffc3ff1f000d0015001a000b0015001f001d00
09000900f8ffe3ff0d00f5ff0b000f001a001e00f4ff79ff10000e001800feff26001500d1ffbeffd0ff19003b001d001100dcff10002400210002003900bfff
0c002c00fcffecff8ffff8ff1c00f6ffb6ff0900640006000c000500faff2c00170009001800d8ff1c00edff08000a0072fff4ff120000002300c9ff2300eeff
fbff08000000c3ff04001b00f7ff7100030038001c001100b8ff09000b00fbffc5ffdfffdfffd6ff81ff050017000e001a00b5fff9ff080020000200c8ffeaff
edff000016001800e6ff1300eafff8ff2a00ffff23001000feff09008200fdfffbfff3ff0200d1ff05002800e5ff1700e1fff3ffd8ff1d001800fcff0700fcff
0600ffffe5ff07001000a9ff2800e3ffefff1f000f001b001600f1ffd2ff05000d00f9ff1000fdfff3fff2fff6ff7efff0ff1100f8ff0c00f4ffc5ffe8ff0b00
c5ff2000f5ffe7ff14009000daff23000300f9ff0b00d7ff2300f6ffe9ff2100eeff41000d00fdff0c00f9ff0d002a00020015001d00fdff1500290036000b00
eaff0b0002000600f5ffeefff5ff1700fefff7fff4fff6ffacfff0fff4ff86ffedffe3fff0fff8ffddff1e007effa6ff0f0016006e00b6ff11001800b2ffe3ff
28002200f4fff7ff16001a001b0021000000beff2500fcffffff46000a003100f7ffd3ffe1ffa9ff04002200f4ffeaff1600210014000800100015001f001600
08000600f6ffdfff150002000800080000002b00e7ff3a00e8ff13002300210023001c00e4ffc9ffefff140033001b000d00e4ff16002e001f0009002000c1ff
0c001f000400010091ffefff0f00f5ffbaff0e005d000a0014000200050028002f0022001a00d3ff2f00f2ff09001d006afff7ff0c00f5ff3800d0ff17000000
f4ff0500feffbcff04001800f7ff6e00fcff77ff1a000e00c1ff0b002d00faffc8ffd6ffe6fff3ff82fffcff20001a001200adfffeff0d001e000000d9ffebff
e8ff020018001900e2ff1600ebffd9ff320014002d0000000100f2ff8900f2ff0400fbff0500c8ff17ff1a00e4ff2000e3ffeeff00000d001900ffff11001c00
c5ff0100e2ff03000600a9ff1700ecff0e00250016001b001b00edffdaff10000d00edff2500fdffebff1f00ffff8dff07001c00fafff0ff0100c1ffe7fffcff
c5ff2900feffe5ff19008e00daff11000200f8ff1000e0ff3900f2ffeaff3400f4ff0a000c00fdff07001c0002002700ffffeeff150008000e000b0032001600
e4ff1d00f4ff0800ebff1b00efff1000fdfff5ffedfff2ffafff0000edff96fff4ffe7ffeafff8ffd4ff2b0083ffa3ff2f0018006a00b9ff01001700b4ffe1ff
18001c00defffaff2c001800140020000200ecff1800fbfffeff090008002500f8ffd2ffe1ffa9fffcff16001100ebff170019000f000600f2ff160018001500
02000300f5ffd8ff1700f1ff0700f5ff0e0064fff7ff2300110012001b0001002f001a00e3ffbeffe5ff0b0021000f001a00ebff17002e00640004002300bfff
090017001000040088ffe2ff2100feffbeff09005e002d001600fdffffff200037000e004500cfff1600eaff0c00260069fff2ff0400fcff3700d1ff2e000c00
f1ff0100ffffb1ff02001e00fbff7000f2ff31001600faffcbff09001a00f9ffe3ffcfffebffd8ff7ffffcff2b0029002400b5fffeff06002100fdffd6fff0ff
f0ff1c000a001f00e2ff0600f2ff96ff3100000015000b0000000e008b00fdff0d00f3ffffffc9ffe0ff1f00e4ff1400f1ffedff00000b001800feff1000dfff
0000ebffdfff05000000acff2700f4ff0b001c0016001c001b00eeffd4ff0e000700e8ff67ff0300edfff7ff1000acff090007000d00f7ff1100c4ffe5fff3ff
d0ff18000700f3ff15008c00d5ff150009001e00feffdbff2700f3fff6ff1c00f9ff04000d00ebff0f001600f3ff2600daff05001200fdff0e000c0033000700
dfff1200feff000005000b00fbff0b00fafff7ffe1fff6ffaffff9ffefffa9ffd8ffe1ffdefffbfff7ff0c008cffa4ff300008006c00c1ffe7ff1400afffdaff
1a0037000100ffff1e001a00210025003100f0ff2400000002000700080005000b00d6ffe2ffa7ff00002c00ebffe7ff1900190009000300e5ff150023001500
110007001100d4ff1500f3ffffff100018002600f8ff1e0002000e001900010035001f00e7ffbcffdcff0e00130012001b00f3ff27002e0025000c001700c5ff
090011000500f9ff8bffecff18000200bcff0c00610023001400fefff7ff1f00370018001f00d1ff0c000600070035006bfffbffe9ffddff3d00d2ff1d000500
e7ff09000000a2fffdff240009006e00e9ff2c0015001200caff04001000f8ffe7ffd0ffe2ffe3ff85ff030021002c002d00c1ff0500260021000f00d2fff8ff
faff040070002900deff2d00edffcdff320008003400f6ff090013008d001e000100f2ff0500ccffcfff1800e7ff1900f6fff3fff9ff06001400fdff17001900
0900f4ffe3ff07001d00aeff1800efff0b001b00110018002300f1ffd5ff12000400fcff24001a00faff010049ffbfff1b000100210001001600ccffe3fff3ff
d5ff2400fffff6ff1b008a00d2ff1900fffffdfff2ffe2ff2b00f2fff3ff1d00feff1b002a00f3ff0e001e000a002200ffff09001d0006000d0011002e00f0ff
e7ff0d00fdff000016003500ebff1100effff3ff44ffeeffb1ffeefff4ffbeff0a00e2ffb4fffaffeeff100092ffa4ff2d001f006900d8fff6ff1900aaffd0ff
19001900040001002b001a001e002200e5ffe2ff29000800feff0b000d00fcff4200d6ffdfffa5ff16000c00fafffdff270015000a000a00a4ff0e0018001600
0b00fefffbffe6ff1600f2fff3ff0e0014001f00f3ff1900030012001700010031002400e8ffb3ffcbff1a0013000a001d000d001a00220023001b000700bfff
0d0012000a00ecff93ffe5ff2a000500b8ff030061002a000900fbffc9ff1c0022001d002300daff190004000c00450079ff00000a00f8ff3e00ceff22000d00
fbff0700ffffcbfffaff3300e5ff6a00f5ff1d0014001300d0ff01000100effff9ffe2ffdfffdaff7cfff4fff9ff36003300a4ff0300160018001100dfffebff
2100feff08001800e3ff1b001900d4ff320011001f0000000e000d008700f9fffcfff0fffaffccff06001600eaff1f001800f5ff08000b001e0000001f00edff
10001400ecff04000000aaff1c00ffff0b0015001c0012001800f3ffceff10000400feff17000500fbffffff0600b2ff150008000500f7ff0f00c6ffe7fff2ff
d1ff2100f7ffedff19008c00cdff1400fcff1800dcfff4ff2500f6fff0ff2400ffff10000f00e3ff0f0009001f002500f7fff7ff1f00f5ff0f0026003c00fcff
eaff1300f2ff0100fdff2000eeff1700f8ffeaff0200e8ffb0ffe1ffe9ffafffe9ffe3ff0000ffffdfff090093ffa9ff140056006400d4ffecff1300a3fff3ff
1a001e001100faff2900210020001a000300f1ff27000a00fdff03000b00fcff0b00d6ffd2ffacffebff1e00dffff7ff170028000f000300c9ff0b000d001300
0f00ecfff3ffefff1200f0ffffff050028002900f7ff2300010013001500f5ff26002400ddffa1ffdbff1500240007002500feff1d00300012000d002700c2ff
0c0016000f00f4ff86fffaff11003400b2ff110058000e000c00f0ff00001c00260016002100d1ff2000ffff0300430074fff9ff1a00f3ff4000ceff10000c00
d9ff0400fcffe4fff1ff1900f0ff6d00e7ff2b000b001d00c3ff00001900f8fff5ffe0ffe3ffe5ff7eff1700010034002f00abff1700ebff1b001300cdffdbff
e8fff8ff0b002400e5ff2300e8ffdaff30000f003600f7ff170011008300fbffeeffe8ffdbffc7ff05001300e9ff22001700ecff0f0004001f0014000d00e6ff
1500ffffe8fffdff1400abff1d00e5ff0e001a0010000c001300efffeeff18002300f1ffedffebffe3fffcffeaff99ff05000000f5fffaffe4ffcaffe6ffecff
d3ff1a000700dbff0bff8d00cdff1700f9ffe7ff3c00d2ff2700f6ffeaff2500e4ff15000400f1fffdfff9ff22002800fcffe6ff1d00f7ff0b00250033000c00
e0ff0900f8ffc2fff8ffcfff0000f4fff8ffedff0a00f0ffacffdeff09009afffbffcfffdeff0100edff1d0086ffa2ff0a0000006e00d9ffffff0d00acffedff
340017001600f7ff0b001e00230014000d00ffff2600f1fff5ff12000a000600e6ff8cffdbffb0ffeaff0b00edffeaff0500ffffedff0400140015000a00fbff
0f000800f4ffd6fff6ffe8ff06000d000b00f7fff9fffdffefff0f001900fbff2a001700e0ff87ffeaffedff3b003a002700d4ff100029000f00f8ff1400b5ff
070009001000f4ff77ff00000a00e4ffb1ff17005500feff0b000000fdff26001a0013002300ceff2700dcff0100100075ffffff0c00f8fff4ffcbff25000000
f8ff00000200abffefff0d00fbff6a00efff06001c001500b6ffffff1100fdff6cffdfffe0ffcfff82ff0200210027001000e5ff040000001800eeffc6fff3ff
e5ff000024001e00e6ff0700f3ff05003100040034001c00030001008400f4fffdffeeff0200d1ff06002a00d0ff0700d6ffeefffcff1d001e00f6ff04000800
1600f3ffe2fffeff0c00afff1d00e1ff0d0025000b001a001000f3fff1ff12000900fbffdcfff6ffe1fffbffe8ffa4ff04000e00feff0300e2ffcaffe4fff4ff
d9ff1800ffffd6ff23009200d3ff15000200e7ff3800d0ff24001100e8ff330014001900010009000b0005002e002200ffffdbff1c00ffff0f00140039000500
e9ff0900fcfff6ff0000d8ff1700edff0000faff0900f8ffb2ffe1fff8ffa4fffdffd9ffe3ffedffd7ff22008cffa9ff190003007300e3fff5ff2300adffe9ff
2eff13000f00efff0a001d001a001d000d0002001a00080015000b0013002000ebffcfffebffafffe4ff1500f2ffe3ff0f002000ecff11000e00190018001300
06000800f8ffedff1500f3ff0a000e001600f3fff4ff3600fbff0a001400050024001600ecff8affe6ffdcff3a001c002000d4ff1e0026001200f7ff2900b6ff
090011001200eeff7affeaff0f00eeffafff16005c0005000a001b00feff2a001a001e002900d2ff1600d8ff03001b0073ffffff0e00f4ff0300cbff1f000900
f3fffdff0000b8fffcff1000f6ff6d00fbff00002f001000b8ff020015001a006affe9ffdfffd5ff83fffeff21001f000700c1fffffff5ff1800ecffccfff6ff
e4fffdff1a001b00e3ff1400feff0b00320000002900240000000a008400f8fff6ffeffffeffc4ff07002500e2fffcffdaffe9fffcff1e001f00f7ff0f000c00
1300fdffdfffe3ff0b00aaff2000ddff0a001e00100015001b00efffe2ff1200fffffeffeafff8ffe5fff4ffdbff92fffaff1000fbfffaffe9ffc9ffe8fffeff
d1ff11000100eaff1b008e00d6ff1f001d00f6ff3200d9ff1d00f8ffe8ff2200eaff080005000400ffffeeff23002000fcffd5ff1c00faff16001f0030000900
e2ff07001c00f2fffcffe0fff9ff0500fafffffffdfff5ffb4ffd3fffbffaaff0a00dfffdefff0ffcbff14007cffa6ff100012006b00d6ff0e001800aeffe7ff
37000c001100f3ff100018001d001d000600eeff1800ecff0000130013001a00f2ffc7ffe5ffaffff1ff0d00f5ff1d0011000700e5ff1600100017002a001800
00000600faffd3ff08000100090005000e00f8ffe9ff3dff08000e001f00010025001400d8ffbaffeefff6ff42001f001f00d8ff10001f001800feff3000bbff
0b0024000400f0ff78fff2ff1500edffb7ff0b00590007000c000c00faff2a000e000b001a00d3ff2400e3fffeff1b0070fff6ff0700fdff2500c9ff15000900
f1ff0400feffa0fffeff2000fcff6f00feff33001f001000b7ff00002800f6ffceffe7ffdfffdbff81ff06001e002b000700b8ff0400fcff1c00f1ffcdfff9ff
eeff01001a002d00e6ff0f00f7ff07003100080031001200fdff01008600fbff0000f6ffffffdeff15001e00d5ff0e00d8ffe4ffe5ff18001e00fbff04002000
00000400e8ff00000b00abff1c00dcfff1ff1b000b001d001e00ecffd6ff1700fafffeffe7fffcffe9fffaffe5ff68fff8ff090000000a00f6ffc8fff2ff1000
c5ff1200f8ffefff16009000dbff1200fffff9ff2700cfff3000f8ffebff3000feff1200050005001000e1ff21002700fdffe9ff1c00f7ff100015002e001000
f0ff0100f4fff9fff4fff2fff7ff11000100f6ff0500f9ffb2ffddfff8ff9afffcffdcffd5fff9ffd3ff100086ffa3ff180018006c00cefffeff1200b1ffd7ff
030017001100f6ff0e001c001d001c000b00d4ff0f00f2fffbff58000f005500f5ffcdffe4ffabffe9ff0500f0ffe1ff16001f00e1ff0d00060012001c001600
05000500f8ffc4ff120004000b0002002c002200f2ff3200e8ff100024001c0028001b00e8ffcdffdbfff4ff3a001b00f9ffddff11002700130007002c00b7ff
0d000d001100dcff74ffeeff1e00f1ffb5ff1100590036000e00090001002600230014002000d4ff1800e3ff000017006effecff010005003e00cfff39000d00
f9ff0100faffbafffaff2100faff6c00fcff3dff28000e00c2ff07001a00f9ffd1fffeffe7ffe1ff78fffcff270036001100b7ff050010001c00e9ffd6fff5ff
ebff03001f001800e5ff2900edff1400330000002300f6ff04000d008500f7ff1400efffffffcfff0b001b00d4ff0700dcffe9ff080019002800fbff07000c00
e0ff0600ddff03000400acff1d00e3ff0b0022001c0014000700eeffecff12000700f3ff1d00ffffebff1800ebff73ff0a001000fffffbffffffc0ffeafff9ff
c8ff65000700efff11009000d6ff1a000000f3ff0c00e4ff2400faffe6ff250008001c000200ffff0f00feff10002100fcffdeff1c00fdff14000e002d000600
e4ff1100eefffefff7ff0300eeff0e000300f3fffcfff6ffb3fff3fff0ff96fff1ffdbffd9fff7ffe4ff03008fffa4ff38000f006a00c9ffe9ff1000b3ffe4ff
0c001c000900f0ff0c001d00180019000b00f7ff1b00f4fffaff0c0000000100f3ffd1ffdeffafff050016001000e2ff15000800dcff0a000f00170012001100
f5ff0400fbffd4ff1100f7fffffff2ff1c004efff2fff3ff060010001600080031001e00e7ffb9ffe3ff0200210019001100e4ff14002a001c0004001b00bcff
0a0003001000fbff73ffdcff0600f1ffbcff0c0057001f000e000300070021003a0013001e00d3ff2400e5ff06001e0068fff1fff8ff02004300d0ff06000800
f2ff0500feffbcfffeff2000ffff7000f8ff2a001c001200c4ff08002e00faffdeffd4ffefffd8ff7eff0400230042002000bbff050008001f00e6ffdcfff6ff
e9ff170021003300e1ff2700edffc5ff3200f8ff3000feff0000f6ff880000001900f5fffbffccff0d001800d2ff0900e9ffecff060014001f00faff07002500
fafffcffdfff07000800abff1500e5ff0b001900170021002000f2ffefff13000000ebff6aff1200e5ff00000d00bbff03000d000500f9ff0e00c0ffedfff4ff
d5ff0900f9fff4ff10008f00daff060002000d000000deff2f00fbfff8ff3700ffff1c000b00f9ff0a000000fcff2400faffe7ff1c00f8ff0e0031002800f4ff
e9ff0900f7fffbffffff1600f6ff1a000000edfff8fff3ffb4fff3fff0ffb5ff0500d6ffccfff5ffe6ff2a008bffa5ff200016006900e5fff6ff1200b4ffcfff
ffff15001100f5ff2c001e0017001f000200f2ff0f00fcfff9ff0c000a001100faffd4ffe1ffa6ff00000900f3ffe9ff1a001800d4ff0600f6ff18001d001400
0100f8ff0200ccff100000000000feff18002900ebfffcfffaff14001600ffff32002700e9ffb5ffe2fffcff130017001f00ecff2e0027000a000b000d00c1ff
0c0012000500f6ff78ffe8ff1900f5ffb7ff1500580032000b00fefff1ff1e0020001b004000d0ff2300f6ff04002f0066fffdfffaffefff3d00d0ff34000600
efff0600feffaefff8ff2a00fcff6f00f2fffeff1b000b00caff01000f00f2ffeeffdaffecffcaff81ff0c001c0045004200b8ff020014001e00e2ffd5fff7ff
eeff0700f5ff1300e4ff2f00edff35003400f7ff2600060009001400870012000c00effff9ffd5ff14001500e1ff0f00f4fff6ff000012001900f5ff0c00f6ff
1b00fcffd6fffeff0d00b0ff2f00ebff0f00240027000c001300e9ffeeff1600feff000025000c00f2fffdffa4ffb2ff0900f4ff0c00fdff0a00c7ffebfff5ff
ddff1300fffff9ff18008d00d4ff0700fdff1500e5ffe6ff2a00f2fff3ff1e0001001e001900f8ff0f00f4ff17002400eeffeaff20000600140016003000ecff
ddff0900f0ff010015001f00eaff0c00f7ffeffff1fff2ffb9ffd2fff0ffaeffebffdeff39000200e2ff090080ffa5ff3a0027006600e5ffe5ff0c00adffdcff
0c0015000d00fcff09001e0029001a001000e6ff1300fdfff3ff05000b0000002d00cbffd3ffa6ff0d001900eeffebff1d000000e5ff000002001c001f001100
0c00f9fff8ffd3ff0b00f6fff7ff09001b00f4ffeeffebff030012001300f6ff2d002500e3ff99ffd3ff0800160016001800ffff250022000a0013001d00b8ff
0c000b000400d5ff7cfff4ff1200feffb2ff12005f0021000600faffd2ff140007002f002200d1ff1c0009000200360077fffafffcffebff3900d0ff0c000d00
f6ff14000000c7fff3ff5a00e5ff6c00eefff5ff19001500cbff00001600ecffe9ffdfffeaffd4ff81ffffffbcff25003e00b3ff050000002000b9ffd0ffebff
1000f5ff14002b00e5ff2300060015002a0000002600feff10000c008800ffff0700ebfff5ffd0ff05001600daff13000800f1ff000012002400f2ff15001400
12000000e5ff01000500b0ff1b00f1ff1200f6ff190005000f00f9ffe4ff0d0009000000e8ff0b00edfffaff0500c5ff0500f4fffafff4ff0800cdffeaffe9ff
d9ff1700f2fff8ff17008f00d7ff0e00ffffeeffcaffeeff2c00f1fff1ff2b00040020000500f1ff0e00e8ff24002500ffffe5ff1a00f0ff18001d003600f4ff
e1ff0b00e7fffbff0a001700daff0b00feffedffddffeeffafffd6fff0ffa1fff2ffd9ff0e00faffd1ff18009affa7ff2a0067006500efffd8ff1300afff1900
0a0014001900eeff0b001e003a0019001300eeff1a00f8ffefff09000f00f2ff1b00c8ffc8ffa8ffecff0800defff4ff080008000a000000e0ff150013001a00
0600eafff3ffe1ff0c00f0fffdff08001300f9ffe2fff9fff1ff14001900e0ff24002900e4ff86ffd9ff020024000e001c00f4ff2f003000030005001f00b9ff
0f0004000700d3ff68ffffff18002500b1ff130055002b000a00ffff0200170013001f001f00d0ff1100f8ff000031007bff02000500e3ff3a00ceff0f000700
d8ffedfffdffe5ffe1ff2200f1ff6f00eaffebff11001a00c3ff00001200f2ffffffe6ffe8fff2ff81ff080098ff38003e00b6ff1d00fbff2600b5ffcbffe3ff
e5fffaff20001300e9ff2300e3ff0e002b0005002300ecff15000e008500fdfffdffe8ffb7ffc2fffcff1400d5ff16001000edff12000c001200f4ff0e00f4ff
1600f3ffe6fff2ff0b00adff0c00f4ff11001f0018000f000a00f6ffebff1800ca00f0ff8dfff0ffd7fff4ff68ffd7fff2ff0100f9fff4ffebffbdffdefff8ff
cfff1500f6ffe1ff70ff8300d0ff1b00feffe9ff3800cdff2600eeffe9ff1d0005001d000200f5ff0400f0ff23001f00fdffdaff1d00f7ff110019002c001000
ecff0b00f8ffdefff3ffdeff0400fefff4ffeeff0600edffb7ffc5ff080044fff4ffd1ffd5ff0000e9ff15009affa2ff13001b006a00100000006500a5ffeeff
f5ff15001000efff0a0016001f0013000c00f1ff2a00f5ff00000a0013000500ebff93ffd8ffacffefff0c00efffeeff03000b001600050013000c000300f4ff
00000800f0ffd7fff6fff2ff03000c0026008cffebff7efff8ff0e001700000024001c00deffd7ffe2ff02003f0034001f00d2ff110018000a0000003c00c4ff
080008000900d1ff7affe7ff1600ecffb0ff15005800f6fffeff0700fbff260014000f002600b8ff1400e0fffaff180062fff7ff1500f1ff1700ccff11000300
edff0a00fdffd2fffaff2500f4ff6e00f1ff8aff1b001000b8fff9ff1a00f6ff94ffe4ffe0ffd4ff8dfffbff1a0032000b00f5ff0500ffff1f000400bafff3ff
e8ff00001f001500e5ff0b00eaff0300280009001d000900010008007a00f3ff0c00f0fffaffc4ff07001c00dcff0300d9ffebfffeff23001a00f3ff1b00f8ff
1300fefff8ffffff0c00a7ff1b00edff0d001d00180017001e00f3fff4ff10002a00f5ff87fffbffe5fffdff7dffd1ffffff0900ffff0200e4ffc5ffdefffdff
dbff19000000deff24ff8900d2ff10000900efff3b00d8ff1e000c00eaff3800f3ff1f000700080002000700290023000300d1ff1b00fcff0900190029000d00
f1ff0f00fcfffaff0000d9ff1e00edfff8fff4ff0700f5ffb7ffd2fffdff93fffbffd9ffe3fff1ffeaff0f0082ffa9ff0c001e006800fbff0c004400a8ffebff
97fe21000d00f8ff130015001f001a001000feff310000001800100019000500ebffcfffe6ffb0fff1ff1100f4fff0ff0b0013001300090013000f0027001000
05000900f5ffe5ff1d00feff0b000c001e0093ffe8fff9ff000010001800080029001100e8ffaaffe3ff0c00450013002100d8ff14001c00140003001d00beff
0c000b000600e7ff6cffdcff1900f0ffaaff18004d00f6ff09001b00fbff2900190012002700c3ff2400e1ffffff120068fff7ff1500f4ff1600c9ff16000f00
f3ff0600fdffbefffcff2400f7ff7000fdff99ff32001700b7ff05001900160087ffdeffddffd3ff8cfff1ff1a0035000400c6ff090003001d000400c9fffaff
ebff0c0016003100e5ff1100f4ff0b002b000f002f00220007000d008200f7ff0400f9fff7ffbeff0c002700e5fff4ffdaffeafff6ff1c001700fbff14001200
1100f3fff2ffe6ff0c00a7ff1200f0ff09001f00180017001600f0fff2ff16000600ffff88fffaffe1ffffff7affcafff7ff1500fcfff6ffe9ffc7ffe4fffcff
d1ff19000000e5ff24008300d6ff1c001300f2ff3900e1ff2200f6ffe9ff2a00f0ff13000800f8ffeefffaff1f0025000200d4ff1e00f4ff1100300023000f00
e0ff02001700f9ffeafff1ff01000300f9fff9ff0400f7ffb6ffccfffbffacffe9ffdfffd5fff8ffd1ff0c0084ffa2ff1e001b006f00f8ff0b00f8ffabffe4ff
ebff1d000a00f4ff0b00110018001a000d00f8ff0600f4ff0000100019000c00eeffc8ffe9ffadfffbfffdffeefffaff12001100130016000c0012000d000800
f9ff0300f7ffc9ff0600feff07000500230094ffecff9bfefbff090018000c0029001700daffc6ffddfff9ff420017001b00d7ff0b002000140000002800beff
0a001f00ffffddff7fffe2ff0800edffafff0f006800edff05000700feff2800160012001e00c2ff2200e4fffeff13006bffeeff1400f9ff3a00c8ff22001700
f8ff0300fbffc0ffffff2300f9ff70000600fdff0f001000baff01001400f5ffc1fff1ffd9ffd5ff8cfff9ff1b002600faffbcff0b0004001f000000b7fff2ff
efff00001d000800e3ff1500f2ff04002b00060020001500030007008300fcff0500f2fff7ffccff06002100d6ff0000dbffedffd7ff1f001200f5ff1900feff
0600feffeffffbff0e00a5ff1400edfffaff1a00170013001400f2ffe5ff1400fdfffeff89fffdffe8fffeff79ffbefff0ff1300ffff0d00f2ffc3ffebff0800
c9ff1000f8ffebff13008500d9ff0c000400fdff3600e6ff1700f6ffeaff2f00fbff10000500fbff0900eaff1d002400feffe2ff1f00f9ff1100170021000800
edfffafffafffbfff2fff7fff9ff0e00f9fff0ff0400f9ffb5ffcffff3ffa6ffecffe1ffdcfffbffe0ff1b0087ff9cff190021006b00ebfff9ffe9ffacffe6ff
8dff0c000100f3ff0b00150010001b000800edff1900faff0100640017000400f5ffd1ffe7ffa8fff0ff0a00f1fffaff120014001000090004000e000f000c00
00000400fdffccff150009000500feff5b00f2fff0fff6ffe6ff120023001f002b001e00e8ffb9ffe5ff11003e0012000500deff130022000f0007001700bcff
0b0009000200e0ff77ffdfff1000efffafff0d0059000d000a000500020022001a000c001e00c4ff1600e8fffdff1f0063ffeaff100000004a00ccff25000900
f3ff0400fcffc7ff00002500fbff7300f4ffa9fe0b000c00c8ff09001700faffcbffe5ffe0ffddff84ff0400290030000200c7ff060004002000fdffbbfff0ff
f1ff010019007f00e2ff1d00e8ffffff2e0007002200f4ff05000d008500fdff1100f3fff9ffc1ff04001a00d4ff0c00e1fff1fffcff17001500fcff0f000800
dcff0200defffaff0600a3ff1100f6ff08001e002f0013000d00edfffbff1400fcfff4fff7ff0600e7ff150079ffbbff04001e000100faff0500c2ffe3fffeff
c8fffefff9ffe8ff13007e00d8ff15000200f9ff1400e8ff2800f8ffeeff2c00000011000300f9ff08000e00120023000000cbff19000000120016001b000500
e5ff0400f3ffffffeeff0000f3ff0f000000f2ff0000f8ffb3ffe0ffedffa1ffd3ffe1ffddfff3ffd7ff1b0085ff9aff160022006900e6fff8fff2ffafffd9ff
88ff16000300f5ff0e00100017001a000900f0ff2000f7ff00000a0012000d00f5ffcbffe7ffa9fff9ff14000f00efff110016000c0009000500130014001100
f6ff0000f4ffc4ff130000000700e5ff300088feefff8cff0a001b0019000b0030001f00e5ffc0ffe0ff0300310014001700e2ff240028001a0009001500bdff
090005000000e3ff75ffdaff0f00f2ffb2ff09005f0005000900050003001d002f0016002100c4ff1600e7ff02001f0061ffefff0a0013004300ccff18000900
f3ff0800fcffcdfffcff2800ffff6f00f7fffcff13002200d2ff0e002000f8ffd1ffe6ffe3ffd2ff86fffdff180034002800caff08000e002100faffc3fff5ff
f2ff170012000300dfff1b00eeffdbff2b00f8ff1a00f7ff0e0013008a0007001e00f5fff6ffc4fff9ff1800d5ff1000f2fff0ff010017001b00f8ff1600ecff
08000200c9ff00000800a9ff1800f5ff0c001300630010001600f6fff9ff1400f7fff7ff08ff0800e8fff7ffd8ffd4fffaff0d00fdfff6ff0700c3ffeafff6ff
ceff1d000a00eeff1f008400d7ff140000000600ecfff0ff1600f7ffebff0e00feff13000a00fcff0400f1ff09002200fdffdfff1d00fcff0d0016001a00faff
e4ff0900f6fffafff7ff1d00f0ff0e00f5ffeaff0000efffb4ffc9ffecffb4ffd3ffd6ffd9fff9ffe4ff14008dffa1ff2d0014006b000100f2ffefffacffdfff
85ff14000500f6ff1c001400290014000400f6ff1700f7fffeff0f001000fafff5ffcbffd5ffa1fff7ff2900ebffefff0d00f8ff0900040005000b0009000f00
ffff02000100c6ff1400f4ff0600f7ff1f00f2ffe9ff8efff7ff13001b00000032001500e5ffaeffe6ff0400200016001d00e1ff3d0027000c0009003000c3ff
0a0007000900ddff74ffe1ff1a00f5ffb4ff1800620008000800fffffcff1900120016002400b7ff0e00f3fffaff290064fff5ffebfff4ff4000ceff27000500
f0ff0700fbffc8fffbff2f00f8ff6f00ebff8cff0b000b00cdff01000800f7ffcdffdcffe7ffd6ff8bfffeff12002f004400caff09000f002300f3ffbbfff4ff
efff040004002a00e4ff1500e2ff04002e0005002800e9ff01000c0083000c001900f0fff9ffc6fffcff1600dfff1100f4fff1ff060016000b00f2ff1a001000
0f00ffffc7fffbff1500acff1600feff12000c001e0019001300e9ffecff1700fdff0000efff1800e9ff050028ffc9ff0b0007001c00fcff0800c8ffe9fffbff
daff26000000f2ff16008900d6ff0e0000000000d4ffedff2a00f2fff1ff1b00080017001700efff0f00f5ff13001f000700e4ff1e0000000b0030002000eeff
e1ff0f00fdff00000a001900f3ff16000c00f0ffe5ffeeffb7ffcbffeeffa4fff0ffd3ff2c000500e6ffffff8affa2ff15002c006400ffffeeff0000a7ffeeff
88ff24000f0005001500170043001c000f00ebff15000200fcff09001200fdff3100ccffddff9eff1f000f00f4ff00001c001d000f000a00f9ff0d001e001200
0200fafff6ffd8ff1400edffeaff020024008bfff4ff84ff00000f001700f4ff31002200dfff8cffd9ff14002200110029000200170025000e000d002300c1ff
0e000a001000c9ff5fffe6ff1b000000b3ff1c005c000d0002000100e1ff1400160025004900bbff140003000300340070fffaff0a00edff4400cbff17001100
f2ff1200ffffdffff6ff7300e1ff6c00f4ff8cff0c001500cbff04001c00f6ffdfffe6ffeaffdeff8bfffbfff7fe37003800b9ff0a0003002000f5ffc5ffedff
190007001f001c00e6ff2e0001000a00270003001e00f0ff0b000a00810006000c00f1fffdffb9ff07001700e2ff0f00f7ffefff0a000f000f00faff1a00fbff
0f00f9ffd5ffffff0700a9ff1e00faff130020001e0012000b00f3ffe3ff1f00feff04008dff0f00e7fff4ffd2ffc2ff000000000200f8ff0600c4ffe8fff3ff
d4ff29000600fbff17008a00d8ff1900fdff0000cdfff1ff1d00f2ffedff2400040021000900edff0600efff250021000000d9ff2000f6ff110024003000f5ff
e9ff1600f1ff0100ffff1d00e6ff17000600ebfff6ffecffb5ffd1ffedff88ffebffceffddff0200e1ff1c008cffa2ff1700710063000400e8ff0100aaff1800
8dff0f001300feff1600170033ff1b001100f7ff1c000600f8ff0c000c00f5ff0b00cfffd6ffa1fff3ff1500edfffbff0a000e001d000500ecff09000c001200
0800f7fff9ffe0ff1300f0fffcff0000270089fff0ff93fff6ff0d001600f2ff25002600e0ff9bffe2ff1200380012002700eaff2900260006000c003400c4ff
0c0002000900d4ff7effe4ff19001d00b1ff150051000c000100faff03001400170030002f00b8ff1e00effffdff30006cfff8ff1800e2ff4a00ccff18000d00
d5fffeff0000ebfff6ff2e00f9ff6b00e4ff98ff07001a00c6fffdff1c00f7ffe9ffdeffe3fff3ff8cff050063ff38003900c2ff2000f9ff2500f9ffbbffe5ff
edff000020002800e9ff1200ebff1500290005002300efff12000e007800fbff0200f1ffeaffb3ff0d001900e3ff17000100eeff0b000b000600f2ff1500f1ff
0f00c7ffa0ff98ff2e0059ff20001c00ffff480029000d001500f5ffc2ffc3ff1f0055000700200044003800f7ff8cff3a004d0015001700b1ff72005cfffeff
a0ff3a001c00d8ff5d00de0057ffc9ff0000f0ff1700b6ff78ffccffe3ff4c000e00f5fff0ffbfff9000f1ff260022002000faff340054000c00420099001600
fdff08003100ccffdaff170008001b00e8ff27000500300076ff0d0011003e00f2ff0900edffe2fff9ff150099ff60ff22002300efff2c000d0048008dff0f00
0e00280004001f001b00deff220044003500edff2c000e0000001e002900d1fffcffb3ffc1ff5eff060021002a0000001b001200420045ff0000edff0e001e00
f1ff0c001300daff0300fbff2d000a002800130029000a0042003b0033005a003c004200a4fffcff35002700470013003700e5fff5ff0d00190038002dff6bff
17002d000c00f3ffb8ffb6ff2200160067ffedffa10009003100fffffbff1d00feff5300090088ff1f003b00460003002c00e9ff2700e7ff43008aff4000faff
d0ffe6ff0000ceff3a003d000f00a1000100120001000c0088ffeaff18001700bbffe2ff52ffe9ff64fffcff3e00adfe43002dfffeff0e002a001900f5ff0f00
fdff300040000700c4ff1600eeff22004d00f6ff2a00e2ff08004900b9000b0006001400fbff81ff0100feff4cfff4fff0ff3f00f9ff1f000c00f3fffbffc8ff
0f00b7ffa0ffa3ff22006bff03001100f9ff2e000c00210000001c00d5ffacff1100580006002500000035000000caff1e00350011002300eaff720035ff0200
a6ff3e001b00beff4300ec0078ffd4ff0e000c00fdffb4ff2000feffe3ff3900fcff1e000e00a9ff3200ebff180036001000d4ff3c00eaff2400210095001700
ddff1a002e00e5ffe3fff6ff0000f4fffdff17000100ffff7dff0500e5ff4700ddff1f00f9ffefffe7ff3700a3ff7bff2e004300e4ff37000500470099ffe6ff
abff1700f9ff27001300cdff320050000800daff2a00040016001a000700daff030099ffb6ff67fffaff19002b0014004d002b00440004001600f4ff1d001300
e8ff13000d00d3ffe1fffeff24000200030017001a00feff3e003900310049003a002200bcff0900dfff3c005500efff0800f4ff110000001b003d00ebff5eff
13001600faffdfffb0ffe2ff1c000f0069ffd6ffa70004002e002600dbff2800faff4b001e00a5ff110026003b000f002800ffff1a00d5ff390088ff42001400
c8ffcefffcffcbff3c003c002e00ab00fdff0e0011002c0088ff1b0023002f00c0ffe7ff6fffeaff5efff2ff25003eff4500adff06001c0024001a00d1ff0100
09000e002c00ffffceff3100ecff0a004c0002001700e5ff27002800ca000900000019000d00b6ff0800060037fffbfff4ff2e00080028000000e9ff0100cbff
efffe3ffafffbdff240077ff22000300edff32001e003f0023003400e4ffc4ff23004c0014002800f4ff1b0001009aff3e0046001d00faffecff76002cffffff
acff35001500b7ff4800fc006afffdff070007000500c0ff0900e9ffddff3c00f5ff0000f9ffe0ff4e00fbfff9ff33000400c7ff3d007cff1900160094001200
f4ff17000500e1fffcff1f001a000c00e9ff3600eeff0d007dffebffe7ff4d00e0ff1f000600eeffdbff40009cff76ff1e003600e7ff3f0007004f0087ffcaff
15000b00e7ff2e000e00cbff240046000400ecff21000200210027002800dfff1a00a1ffc4ff61ffeffffaff3800faff48002f003e0010001a00fbff1e001600
d2ff0b002b00e1fff4fff5ff2b00fcff0a000f002f00aeff270037002900370046002900c2ff0d00efff34006200ffff0a000100100016000c004500caff5fff
11001900edfff5ffc2fffaff2200200073ffe0ffa600feff2f000800f1ff2c00f4ff41001d0099ff15002f0034001c002c00e0ff1c00d6ff360082ff3d000900
c4ffd5fff2ffd2ff42003e001900af00f2ff1500120019009eff51001b000000dbffe5ff60ffdfff60ff01002b0036ff3800adff0800290034000e00cdff0c00
1700feff29000000d5ff2a00f5ffeeff4a000c002200cfff29002900ce0009000a001e000900abff1100f6ff55ff0600e5ff4300daff2300effffeff0000c1ff
0000c5ffbaffc2ff27007eff0a000b00daff2c000e0028001d002200e0ffb0ff2a00500009002a00ebff1900f5ffb3ff2f003b002e000d00ccff770044ff0700
adff33001100c2ff3c00f20069ffdcff1a0005001300caff1e00e8ffebff3200dfff12000d00abff5a00d2ff0c002a000800cbff3e001d0022002e008c001800
f8ff0d003100e5fff8ff06000000000004001b00f4ff040072fffcffddff5300d8ff24000500f2ffe6ff2e0099ff70ff1a003c00e0ff3f0005003e008cffe2ff
11000900f5ff290014007cff1f0047000100e2ff1d00060005001a002400efff0a00b1ffc8ff68fff2ff00000c00f6ff3f001d003f0009000b00f7ff35001100
ebffffff1400d6ffe0fff3ff1800fdff010017001c0009002d003d002600360037002f00b1ff1000e5ff2f005a000300e7ff18002200efff0c004d00fcff66ff
14001200f4ffcbffc2ffecff1f002d0074ffd5ffb200e5ff2300f8fff4ff3200edff38001900a7ff00002f00350021003300dbff1400dcff400078ff38001000
aeffd9fff4ffd6ff36003b004700ac000e00b5ff0a002a00b0ff3d001a001500e1ffe1ff73ffdaff64ff07001800c6fe3b00a9ff0e00270030001a00d3fff3ff
11000b002c000900d8ff2a00e9ff00004900f6ff0100d4ff2d001900c9000a0009001e000200aeff000006002cfffafff0ff340001000f000200deff1700d6ff
f0ffb9ffb0ffa7ff4c007bff19000000e4ff2f001400260003002200e7ffb3ff1500650010003b00e3ff2c00020097ff2700480017000e00cdff790045fffaff
afff2d001f00bcff4200e90069ffedff1400f9ff1100d3ff2400e9fff9ff1a00f5ff04000800b5ff5c00f6ff0c0037001900deff3b00e6ff0d001f0089000d00
f9ff10001a00e0ff0800070027000200fdff0f00eeff01006fffefffdfff4d00d6ff18000900ebffd3ff290097ff6cff17003300e0ff3b000200470078ffcfff
0c001800e8ff28001600a4ff27003f00f8ffd6ff1f000f002f0036003900f3ff1000afffc1ff6effdbffeaff350007004800240032000f000c00f5ff30001600
f7ff12000700dbffe9ff0a00410000001700bdff310008003f002d002600490035001200bbff1400e3ff3800570005000900f0ff0e00acff1700520082ff5fff
0d000600fbffd7ffc3ffffff32003c007effebffb100eeff2200f0ffd6ff2a00f5ff2b001c00adff0a004f00380021003a00ecff0900dbff460072ff39000700
a6ffddfff1ffd6ff1c0036003700a8000f00100005000600a9ff3e0025001200eeffc7ff69ffd3ff5bffe7ff290079ff3700c1ff0d0025002800ffffc9fffdff
1c001c002300fdffd4ff2500f4fff4ff4400dfff2900c0ff3a002600c5001300100024000700abff09000c003efff0ffefff5200f0ff2100e6fff6ff0800ceff
fcfff1ffa2ffc3ff4e0060ff1700feffeeff24001000130013002200060092ff26006200a1ff0400acff2a0002008cff32001c0016002200e1ff790042fffdff
a9ff26002900c7ff4500ee006cffc4ff110017000a00c7ff3500f7ffe9ff3600f2ff07001e00bcff4a00c3fff7ff33001f00e2ff4700030000001a008f00faff
120017001900f9fff6ffe4ff0e00ffff0e001200e8ff06006cfff8ffe0ff4a00bfff1e00f5fff2ffb0ff1f0095ff6aff29004200e6ff4100f2ff460087ffd3ff
0a001f00deff2d001c00d3ff260047000000d7ff1f0004000c0025001600defffcffa4ffdbff6efff1ff0100070000003d001b002f0000002700e9ff20000d00
e6ff05001200dbffdeff0700e0ff0300fcff1200190010003800320008004b002e002700b9ff1900c8ff3c0051000200fcff2900170009000d005100e1ff61ff
12001700fcffe9ffb5ffffff3100280079ffe6ff9f00030025000000c9ff1800dcff43001c0096ff12004d003f0010003700efff7dffd3ff44007dff3a002500
9bffd0fff6ffd7ff2e002b004a00a1000000130017002d009aff370023001900e4ffd5ff5effdeff52ff02002900d3ff3f00cbff1900310030001000d0fff6ff
feff140018000700d7ff1f00ebfffcff420007001b00a2ff23002300bf0008000a001b001400a3ff1a00030030fff9ffe9ff4d0001002100f4ff05000000daff
f7ffeaff9cffc0ff4a0068ff1e001400010039001f00120029004000d7ff68ff26006200faff2700b4ff1d0091ff93ff2a005d00250023000b0075004dffe6ff
a5ff36001000b9ff4200e5006affc4ff030016000c00ceff1900ddfff7ff2c00170024000f00b0ff4300cfffebff26000700fbff4300f6ff1a001c0096000a00
0c001f000b00bfff0200fcfff0fff9fff1ff2000f2fff4ff6cfff7ffe5ff4a00dcff2300f0ffebffc0ff2a009aff76ff18003c00e7ff3f00180040008bffdcff
0400feffffff1b001c00d8ff490029000400c6ff28000900170023002300dfff1300a9ffb5ff67ffddff2300140001005e0033003e00f5ff2c00f9ff2a001b00
1b00f9ff1100f8ffe9fff1ffd7ff1700270016003c0002003d0025002700290022002700aaff1700e7ff39005200d9ff020030001b0008001e006b00d4ff64ff
12001e001500c9ffbafff1ff2f002c007effd7ff990003003200fdffa1ff2100fcff49000c0088ff170051003f0043002e00f5ff0a00c1ff480091ff17002700
aeffccff0100b4ffa8002c003e00a600afff1a0021002400c6ff3d0023000200e4ffb5ff6cffd8ff64fff6ff3500c2ff3900c4ff13000a002e000700c6ffb5ff
20000b002300fcffc6ff1300e7fffeff420000000800c9ff2f002e00bf000300eaff1c001400a0ff0300f1ff43ffcfffd9ff6600e9ff3700e2ff0f00f2ffdaff
080094ffa8ffc1ff840073ffefff160008002f0033001a002100d2ffc5ffddff32004f000400e3ffc9ff4500fbffa5ff760017002b0009003600720058ff0a00
a4ff3b002600c6ff3900d90042ff90ff11000c002600fcff5400d1ff21003d0020002f002500e7ff6a00f7ff06ff26001b00d8ff45001b00190044009500fcff
09000e001200b5ff0700f6ffe9ff2b00ebff1500e4fffeff4fffffffe8ff4100d9ff22000700faffabff0100a4ff5aff2e003100e5ff33000f00470087ffc4ff
010070ffe9ff44001800eaff4c003400010000004600100013003e002f0000003100baffe2ff69ffdfff04001b00feff390034004a0015002c00edff1a002700
0100d2ff3800f9ffeaff0600dafffcff1f001000240005002a001200110030003000feffa1ff0d00e2ff31005d00efff2f0051004700010032006a00e2fe6aff
13002600fdffb5ffa8fff3ff32004c0083ffe8ff9e00080031000100dbff2000fbff4f0007007bff04005e003f003e003600e4ff0300c9ff470089fffaff1800
c2ff1500f9ff3eff8dff45008a00a100f1ff17001c002400dfff3f006000ddffe6ffc1ff74ffd7ff5effe7ff540012ff3500b1fffbff69002f000100e3ffa9ff
d4ff30002d002100caff20003900f5ff4100020064ffceff29001f00bc000d00f4ff320009007fff2400fdff65ff3500feff390010001400faff1000cfff0400
0b00f9ffb3ffbaff040069ff05001100000031002500290000002c00f0ffc5ff0b005000cfff1c0014003000cbff0d001f002a0015001a00a6ff8a003cff1000
a4ff38001a00b2ff4d00f9008ffff1ff160000001e00d7ff3100effff8ff390009001b002700b7ff1900d4ff26002b001a0000004e00bdff080020007d001600
e9ff07003b00efffe1fff0ff05000c00020014000c000b0081ff0100d3ff3f00d8ff1b000a001800f6ff3b004dff7aff12001e00e5ff3e00f9ff3a008effe9ff
fdff1c00f6ff21001a00d8ff2f004e001600e8ff3a00f5ff0f001f002700eafff7ffafffb4ff6bff0300300008000b00040020003200f8ff2900eeff2a001d00
efff19001a00e3fffeff1700320014001c0011000c0005001b00300036002d0050002600aeff0d00f1ff3e005d000c000700dfff0200e4ff2200120028006fff
18001d001100c8ffb7ffccff230004007dffffffb80010001b000a00d9ff4b00010045000400a2ff19003200410000003400ecff2f00d4ff390082ff20000c00
dafff3fff8ff90ff1e0033002200c300fbff200013001c0090ff4bff2a002900c5ffeaff73ffe1ff6dff0e001a0084ff3d0092ff130008001b002800e3ff0200
e2ff110029001800d1ff3500f6ffe5ff530006001f00feff10003100de000800f2ff1a001000c8ff1200ffff7bfffdffe8ff2900cfff31000800e9fffeffd3ff
0400d4ffc5ffafff1a0072ff12001900f8ff380027000c0008002200d2ffa3ff07005200f7ff1d0009002e00dbff39000f0030001f002600c1ff840066ff0400
aaff38001200b8ff4600f40083ffffff1800efff1700d6ff21000000eaff4900120014002b00abff0f00c7ff190027000e00ccff4100280017001a0080001800
d1fff3ff2f000200e7ff0d001300feff07001f00000028007bff0200ecff4500c4ff25000500e9ffffff3b0094ff73ff21002f00e6ff4e00e9ff40007effdcff
a1ff0e00f5ff15001800cdff23004a001d00e2ff2a00feff1e001c001c00e5ff0100a7ffceff69fff4ff1a00fafffdff61002a004000f1ff1e00ecff2e001100
f9ff11001800e3fff6fff6ff25000000200015001e00000023002f00390056004d002100c6ff1600efff40005c00ffff0000ebff1e00f7ff1e002d0019006cff
0d001600feffc7ffc6ffdfff1f0006007fffe8ffbc0006002d00e1ffd4ff48000b003d0007009fff240025004100f9ff3700ebff2600daff310080ff4600ffff
daff0900fbffb7ff310038001e00bb001000130010001b008ffff2ff19002d00e1ffd7ff5cffe6ff79ff1100130053ff3b00afff170014001a002200deff0000
f5ff280028000600caff3500deff01004c0009004200ffff19002f00dc000900f6ff1e000700bfff0e00f9ff5bffecfff5ff3f00ecff2b00fcfffbff0300cbff
0c00d4ffc3ffb8ff220082ff0d001600f2ff2c001f00120011002400dcffaaff08005f00efff1600e6ff3100d8ff2900100029002100ddffc3ff820041ff1100
a9ff3d000c00aaff4800010182fff3ff15000f001a00bdff3500f0ffeaff2c00100015002500c8ff3300e0ff2e002a001d00b9ff4a00b7ff0c00090077001800
eeff16001500f1fffaff14000000000006002c00f9ff130086fffeffeaff4f00d4ff3700f7fff6ffe7ff450098ff73ff0a002f00e0ff4800e1ff3b0096ffddff
f6ff0d00f1ff1a001100baff28004c000500e7ff3700fbff190027002300e3ff0000bfffceff6cffefff05001b00040030000c003d0019001f00f8ff34001300
e8ff1d002100d9fffcffeaff28000000150012001d00a8ff13002b002d001d0047002f00c3ff1b00f2ff3a005b000700dbfff3ff07000d0010003500210063ff
13001800fbffeaffb8ffe2ff24000f0080fff2ffc700faff2b001300e6ff4b00feff50000600afff2e001f002b0000002f00f5ff2000f1ff34006bff0e00e9ff
cdfffafffaffcaff2c003b002b00bd000d00040016002500a2ff3d003a003d00f9ffd0ff78ffe9ff61ff1f002f00bbfe390088ff110032002a001d00c6ff0100
f8ff1b0025001100cfff2f00f9ff13004b00ebff2e00edff32003000e0000600000009001200bdff0200060042ff0c00fbff3900dfff2a00ecffe8ff1600d0ff
ffffdbffbdffb9ff3c007fff18000500ecff2f001b0033002f002400ddff68ff17005300deff1c00fbff2600e5ff1b003e00460023001400c7ff810071ff0b00
adff2f002000b6ff4000010163ffe5ff1d0001000a00dcff2200f6ffefff3800fdff10002000c8ff2f00c4ff070029001b00c7ff470004000f002f0077001b00
e2ff00002100f4ff01000b0019000800eeff2300feff0e0085fffbffe1ff4d00d4ff31000100ebffdbff34007fff79ff12003000e1ff5000f8ff3a0081ffc5ff
feff0d00f5ff26001400d8ff2a0049000600deff3000120024000d002d00d8ff0d00b4ffceff61ffe6ff10003500060041003f003b0003000c00f3ff36001c00
e3fff9ff2c00ddff0500deff2a0003000b0004002a00ebff2c002f002800310045002000bcff1800c8ff420053000000d7ff0000ffffa1ff15003600260066ff
0c000f00f4ffcbffbffff3ff2b0013007fffefffc40000002700f9fff9ff4600000035001600beff1e00360038000d003600eaff0f00d3ff43006aff31000200
c8ffedfff8ffbcff360045002a00c4000700bbff19000600acff55002a000400f0ffe1ff5cffeeff63ff08003a008cff38009cff0e00150029001a00e4ffeeff
01001f002e00ffffd3ff2a00dbff0d004a00fdff2800c8ff2b002b00dc000a00050005000c00bbff03000b0039fffdffe1ff560004002b00f7ff0a001d00dfff
fcffc1ffc3ffb7ff3b007fff0e000200e9ff270011002100fdff2b00f7ff5aff0c005d00f3ff3300fbff2800deff2700210036003b001900d8ff83003dff0200
aaff2f002000cbff5000ff0074fff3ff0a000f001300e2ff2900f3ff00003400f8ff17001f00b7ff3e00b9fff4ff2d000f00d1ff4400e6ff0e001e0077000500
edff1c001c00faffeffff9ffe9ff09000a001c00f6ff080085ffe4ffeeff4e00c1ff30000d00e3ffdeff0f0092ff66ff1a003b00d9ff5100edff3b008affc8ff
f6ff0d00dfff2a001b00bfff24004800f7fff1ff31000800030038002800e9ffffffb3ffc5ff73ffd9ff15002500f8ff3e002000360007001500faff45001d00
f1ff06002100e7fff8ff0b001d0006000f00c1ff1900000035003000340046003e003000bfff1d00ecff3e0052000e00d5ff08000200a3ff0c0054000d0066ff
0d0004000400deffb9ffe7ff3300240081fff1ffc40000002e00fbff00003400030047001700c1ff22004000290031003800c2ff0200e3ff49006aff26000000
b8ffe7fffaffc1ff2f0031003e00c1001300f2ff0c001b00b8ff410018000b00f5ffd8ff74ffd5ff59ff14002f00a4ff3f00a8ff0b00200035001900d7ffebff
07001f0020000f00cbff1100fcfff5ff4c00f4ff1f00d8ff27001a00d40013000d000e001400beff0600070051ff0500f4ff460001001300ecfffcff0900e5ff
ffffb4ffc0ffcaff4d0071ff16000000f3ff1e0015002300200028000500d8ff00005f00a6ff3300f4ff2d00dcffdbff4e004e0035002200f3ff840038ffc7ff
aaff28003400b3ff4700f9006cff03003000ecff1d00b6ff1d00e0ff2a002d000d0016003900c0ff4800d3fff5ff2e001200d7ff410005001300110078001200
fafff6ff2500ddfffdffe8ff1b00000003002200f5fffdff70fff0ffe0ff5400d3ff33000500e8ffe6ff1c007bff7fff1a002e00d9ff4a00000036007cffd1ff
faff0500fbff3200200091ff33003f00f7ffe2ff2a0016001e0033003200f1ff1400b0ffc5ff71fff0ff0c003d00f8ff3e0028003c00f7fffdfffeff30002200
f7ff13002500d7ffe9ffe1ffe0ff15002b00f8ff4600f5ff28004e002a00460036002600bdff1d0002003e00450003001d0056000800000023005100ceff67ff
0c0027000400a9ffbcfff2ff4900390081ff0100be0002002d00eeffc6ff3800e2ff30001800c2ff200042001c00360039001000efffedff4f0083ff3b001500
9bffe6ff0400b6ff3e0025004800b4001400f9ff12001300aaff33002c000a00e2ffb2ffa1ffe5ff62ffe5ff1e00e6ff470083ff01001e002f001000eafff4ff
36001f002800f9ffcdff2900e6ffe9ff4a00e5ff2500c0ff28002c00d9001f00210010000800afff15000d0051ff0900dbff7f0019002700f9ff09000300d4ff
1200c8ffc1ffc2ff4d0074ff0a001100eeff05001c002600ffff3400e3ffb8ff16005500e1ff1800c1ff33009cff1d00180029004e002000faff870055ff0b00
abff32000900c1ff4e00f30053ffe6ff0e001a00f9ffe6ff4700fdff1d001a000c001d001a00daff4100dbffceff1f001f00e4ff3f000e000c0018007900edff
09002600d1ffebff1000e6fff0ff0800d4ff2200efff01007dffddffd6ff5200e2ff2d00fdffedffd4ff3000a3ff7cff16002b00eeff58000d00430083ffb9ff
e8ff1700f2ff22002400ceff2e0037000400f2ff32000b0004002c001500fdff1b00b6ffc3ff6aff000022002e0002004a0050003200ffff2c00efff39000f00
e4fffaff1c00eeff09001200e8ffeaff1e000f002000fdff1e002e00250015003c004b00aeff1e00caff2c005100f8ff0d0046002c00adff06005c00cbff5fff
14003000fdfff2ffb5ffe0ff4000200085ffdcffb600ffff31001000faff3c000d004e000900a9ff31004400360032003500efff1c00d5ff54007ffffeff0300
a1ffe2fffdff9eff900011005700be00e0ff110012001d00c2ff47003d001100d5ffceff9bffc7ff5fffedff3c00c3ff4000c0ff1800feff29000f00f4ffe7ff
160012002c001500cfff06000000ecff430009001a00baff0d002800d0000f000e001c000100c7ff1700f2ff9bff1000e9ff580006001e00e3fffdffe2fff5ff
0000d2ffcbffd3ff360068fffdff0e00ffff3f002300240015006d00dcffb1ff0e005a00f0ff5200c9ff3800baffbeff3d0066ff3d0016000900830074ff0e00
acff3d001b00b9ff3c00f00061fff2ff220005001200fcff0e00f1ff00002e000a001e002200ddff3800e8ff11002c001600efff460011000b0030008000e9ff
feff1d00fbfffeffe6ff110001000f00edff1b00effffeff78ff0100d9ff5800e1ff21001c00dfffdfff0c008bff70ff26001b00e6ff3700f2ff400086ffdcff
d0ffffff000034002000e6ff47002d000900ccff4000f7ff0f002b002a00d8ff2d00b7ffb6ff71ffd3ff09001300020036002d003a0001000100eeff3e002400
eaff01003400f6ff13001400caffebff2400f5ff5200ceff1700340027001a002c003700bfff1400e3ff26005f00e9ff280059001d0017001a008d00fbff5fff
13002700f9ffe5ffc5ffe8ff4300260089fff4ffbb0008002b000700eeff3c002a003f0013009dff2d0039002f0056003800ecfff6ffd8ff570091ff0c001c00
eaff1700fcffe3ff2e0038004900b00015000a0019002500c4ff37003200f2ffd7ffd9ff94ffceff66ffebff37001300340078fffeff150038001300e8ff1b00
3600220025001f00bcff0e000000e8ff490015002200dcff58002e00de001800050011000900b6ff0c000f008eff2d00d5ff5400ffff2300f2ff0f00dbffd9ff
1100eeffadffacff130060ff1500fdfffdff310014001f0011002900d9ffffff07004700cdff14000d001700edff9cff1300220018001500bbff8b0087ff1200
a7ff2a001300afff4600f40096ff04001c00daff2800e8ff0a00f9fff4ff3f00faff13002200beff2900dcff20002f001c00fcff4c00edff0d0025007d001600
d1ff12001800f6ffefffdcfff5ffefff040010001800000087ff0200f9ff3a00dcff1700100010000600320079ff69ff1d001f00e2ff3a00ebff310092fff2ff
08001b00060015001500e1ff220036001400c7ff3600feff28001b0003000800eaff95ffbfff66fff3ff27001400f5ffaaff2300430008001d00f4ff17001800
eaff0a001700deffe4ff0c00280012001a0002001a000a001a0031002a0042003e001200c6ff0e00d7ff2b00630009000500ecff110010001b001a0024006aff
15001d000000deffc2ffd3ff1800f9ff77ff0200bf00eeff2c001700b5ff480014002b001a008cff23000900300007003100e1ff3200e0ff2f008cff2e000500
e9ff0800fcffbdff1b0027001600c200eaff260002001c009dff280022002d00c6fff2ff9cffebff66fff3ff1d00dfff3a00b7ff1f000b0019001e00c9fffdff
000010002d000c00cfff2b00e6fff5ff5200feff3c00ecff1d002900e2000500f2ff0e000300cfff0f00eeff90ffeaffceff3600eeff2200fffffcff0200d0ff
0600e8ffb9ff9fff160070ff0b000900f6ff2e0025003c002e002700e4ffc9fffaff3900acff26000c001d00adff29000c002b001c000600d1ff84002bff1000
a9ff36001a00c2ff4700fc008dfff3ff1e00f7ff1a00d4ff3600f9fff1ff3000fbff0e002000b8ff1a00f5ff070029001800d8ff4c0007001d001e0077001600
2a0017002e00e9ffeeffe9ff13001e0007001400f8ff0a007fff0600f5ff4900caff2d000400fcffe3ff350081ff75ff2e002e00dfff4500e0ff310092ffd8ff
a6ff1700f0ff24001600daff2c003c001100e3ff310006001e002d001e00e7fffeffb1ffd4ff65ffedff18001a0004000d002800470015000f00f7ff26001600
e9ff0b000e00e7ffedff1c0026000a001c001100150009002200250032003e0044002d00c6ff18000c0037005d000800e4ffe1ff15001b00220022002e0061ff
0d001f000100deffb9ffc7ff1a00feff76fff7ffc70003002800e3fff3ff4d00ffff3b00feffabff130010002c0009002b00e5ff1f00e2ff300071ff2a000b00
cfffffff0000aeff210030002300b900030010000d001900a1ff310024005300dcfff0ff6dffdeff59ff0f002400bdff350081ff0f0015001c001f00d0fff0ff
0000140021001500caff3800fefff6ff500001001d000b000f002300e8000000faff10000b00c5ff0e00f4ff63ff0900efff3400fcff1e00eeffeafffefff2ff
fdffecffbaffbbff0c0075ff28000600f4ff250028002c00ffff2d00d4ffceff14003d00f9ff270002001c00c2ff350027003b0017002500a7ff840025ff1b00
a9ff2b001900c0ff4400fd007cfff3ff0f00ebff1700e1ff1a00e9ffedff3e00090000001a00c8ff3800d2ff0f0032001400c6ff490006000e003d0075000f00
e9ff05005700f1ff0100f9fff8ff1800f9ff4500f4fff4ff7ffffbffebff4c00d9ff33000900efffdcff230087ff63ff17002700dfff49000800330082ffe3ff
f1ff170004001e001f00c4ff260049001800c1ff24000000160027003100e1ff0200b5ffb1ff60ffefff1f002000010021002300460006001800f5ff36001b00
f0ff0a001800f2ff09000300240007000e000e002800b3ff280026004000490047002000c2ff1700faff480058000900fdffe8ff0900fdff180032001e0058ff
10002200eeffc9ffbbffe9ff24000b0077ff0000c400f6ff31001300d9ff4e00f7ff40000b009aff28001d00350003003400d7ff2000e4ff2b006bff28003100
d5ff0000feffc8ff2b0028002500c500ffff180013000d00a1ff340026003600e1ff000061ffc4ff5aff0f002800cfff3500b2ff20001e0023001b00e4ffffff
06001e0024000600d2ff1b00e3ff0900500001003200f1ff22002b00e5000d00f9ff14000900c9ff0200020062ff0600f5ff4600f4ff2f000000f0ff0800ddff
f9ffccffc2ffb0ff2e0076ff16000400e8ff27000d00230026002400d6ffe8ff0300450000001f00e3ff3800e5ffc8ff23002d0020003600b4ff85002dff0700
a8ff2e002200b9ff4000fc0071ffe8ff0f000f002300e7ff2d00fdff00003000f5ff12001e00ccff3900e4fff3ff2d001100d2ff5200edff19000a0074001100
efff07002c0007000100edffebff0900030025000500090083fff8ffefff5700d2ff40000d00e1ffebff2f00a0ff7bff16003400dfff4400f9ff2f0092ffe0ff
f3ff0d0002002600150067ff31004500fdffe2ff2e0000000d0001002b00d7ff1000b6ffddff5fffdbff13002c000100340020003e0007001a00f7ff35001d00
d7ff10001f00d6ff0400eeff2300f5ff1d0013001a00fcff370039002e005f0046003800bdff1f00bfff3e005700100013ff04000700a9ff14003c0025005bff
12001800f8ffe7ffbaffd1ff33000f0075fff8ffc50001002300fffff3ff4c0008003c000b00aaff380030002900ffff3300f6ff1300e0ff3a0078ff25000100
ccfff1fffbffbbff150035003000c1001c00b4ff19001e00b5ff3e001c002100e7fff8ff75ffd2ff55ff22002d00cfff3900a5ff140010002b001f00c0fffdff
1700040028001900c8ff2500e9ff06004a0016002000ccff1c003000e5000500130006000a00cdff0400feff47ff1200e7ff4200c6ff1100fdffe7ff1b00e5ff
d5ffcaffc4ffbaff2b007bff1a001100e8ff24001700240013002e00dfffc5ff17005700e4ff250003004a00dfff8dff3d003c002f001800e2ff850036ff1700
a9ff32001b00c0ff3c0003016aff05001e000a001c00e5ff1200f0ff26001400030002000e00c2ff3900d4ff1c003a001f00e3ff46000600100017007300fcff
e9ff09001d00f7ff0c00e2fffcff0c00ffff2200f5fff8ff6cffdfffe0ff4e00ceff38000500dbffe8ff310088ff7cff11001d00daff4900e3ff39007bffbdff
07001f00e4ff2d000d00dcff260052000200ddff2400f9ff170030002000dcff1d00b6ffbfff5fffd4ff09003000080032003a003c000a001100fbff21001700
d4ff00002800e2ffedfff0ff1b00f8ff1400bdff3b00f9ff41003400370048003e003400bcff1d00ebff39004700050009001a00010018000f004f001b0059ff
15002400f1ffddffb8ffe7ff2d0029007dff0d00c0000e002700f7fff4ff4000130039001500b6ff2b0036002a0048003d00d2ff1100edff470078ff1e000500
b1ffeefffaffc3ff240035003100c0000300060018001700b4ff340028001100e8fff5ff83ffc8ff50ffffff2f00e8ff41009bffffff1a0026001200d8ff0700
1e00100021000900cbff2000e9fff3ff4600e1ff3600bcff33003700dd00ffff240015000900b8ff0a0006005fff0200e9ff6800f7ff1f00ebff23000a00d2ff
fcffe4ffcdffbfff470070ff1000feffe7ff240012002e00260038000300b6ff03005500a7ff1f00e9ff3b00e7ff190035002e0038000600040085007bfffcff
a7ff32001900dbff3a00fd0059ffbaff110020000e00faff2700dcfffeff1a00f1ff17000100cdff3700c2ffe4ff33001400e1ff4200000010001f006e00efff
faff1a001c0006001900e8fff6ff030000001100e8ffffff7effdcffe6ff5100e8ff37000a00d7fffdff39009aff6dff1b002800d9ff5200e9ff38008cffd2ff
e4ff1900e1ff3c001100d3ff33004600f8ffe0ff3600f5ff170034002400f3ff2400baffd1ff77fff3ff1b003e00000027002d00310006001e00f5ff2c002100
eeffefff4300dafff4ff0a000500f6ff1300fbff3000e5ff390035003800360039003c00bfff2500efff37003f00fdfff1ff43001100cbff0f005c00020066ff
14001e00f6ffd4ffc0ffd8ff2400320082ff0000c600fdff2f00e9ffeaff3200f5ff36000f00a1ff200039002c0024003a00e7ff1600d6ff3f0080ff23000200
b9ffe4fffbffcaff070038006700c000e7ff180015002000c1ff300025001900ecffe7ffc7ffd1ff5dff28001e00ecff400097fffdff1a003b001c00e5fff1ff
2a0018001b000e00cfff1c00fafffaff460000001c00b7ff44003000e0000a001c001d00fbffbffffbff010045ff0a00f3ff4700fbff2000f4ffeeff0b00dfff
fdffadffc6ffc3ff2f0073ff01001600f3ff23001b002a00f5ff4100f1ffc6ff10005900f9ff5800faff160098ff280020004d0038000c000c008b003dff0200
a7ff2f002f00d5ff3c00f50064fff4ff2000fcff1100deff1700dcff2c000000ffff00001c00d7ff1a00e1ffd1ff2f000d00e5ff4e00ecff140025007500e7ff
03000f00fcfff2ff0200eefffbff0000feff0d00eefffdff68ffecffd6ff5400e6ff2b000a00e1ffd0ff220093ff68ff2e002e00d8ff5600e9ff380082ffcaff
c4ff150002002f001c00dfff36003c000300d1ff2600f3ff1b001d003700d9ff4600aaffadff6effebfffbff4000000033003500340004002200f2ff35002100
efffe0ff4600e9fff3fff5fff7fff9ff2200f8ff6200d4ff1b003b0025002c0040006200bdff2000d9ff39004200ecff02004500f9ff9aff20006700e6ff63ff
12001100ecffc8ffbfffcfff310044007ffff9ffc50012003200f7fff4ff3a00fbff38001c0097ff070047002f0038003f00e6ff0e00e1ff4f0080ff20001300
abffdffffaff97ff060018004f00b000dfff010019001500c2ff40003a001900d6ffcdffb8ffbdff58ffddff38000f00400095ff2400360023000e00fdffdeff
41001a001d001700d9ff09001f0000004700eaff3400c0ff3b002400e50017001c0009000000bdff0f00180078ff1600f9ff42000c002d00e8fff3fff1ffecff
0e00d9ffcfffe2ff1d0068fff3ff1400f0ff43002800240031002000e9ffebffffff4900e3ff350090ff1000b7fffaff4200080036001200f1ff8b007eff0800
9bff35001700c6ff5200ee006affe3ff100018001400f9ff3800d6fff2ff2400050018003500d3ff3000e9ffe2ff2a000700dcff4500f0ff1b0033007d00daff
07001700f9fff5ff12000f00e4ff1700fdff0900f1fff5ff86ff0400e2ff5300f6ff1d000a00eaffc8ff0c00a9ff55ff35004800deff3c00edff3a008dfff7ff
00002100efff41002b00f0ff3b0033000400dcff2d000000090026002000d8ff4600b8ffbeff60fff2ff1c001300fbff2d003400400001000900f5ff23001800
e0ffe0ff2a00ebff07000900e9ff00002d000a005f00ccff2d0039002300230044005700c0ff1800e3ff28004a00fcff1b005c002100130021006c000b006aff
18001c00f7ffe1ffb9ffdeff2f00560081ff0d00c100faff2200050002003c0001003700200088ff27003500390024003e00e0ff0b00c9ff500077ff12001900
c2fffcff0500a6fff2ff4e002b00a700f3ffdeff20002c00c9ff270033000300dbfff2ffabffc1ff5eff1a0023000d00410092fffeff1a003d000f00cffff6ff
55000d001a002b00d1ff0a001100e0ff45000b001400c8ff51001e00e1002f00f2ff13000d00aeffffff0d0090ff0200ebff2b00f5ff1f00f3ffffff2300baff
0a00f6ffc7ffc3ff0a005fff00000700f3ff33001c003a0026002800f4fff8ff0b00300000000c00fbff170002001000f1ff20001600fcffe6ff8d002cff0c00
a6ff33001500dbff4500f4009cfff8ff1000e7ff2c00e3ff32002100efff3400efff17002100c8ff2a00eeff1d002b001200ffff470008001800270077001200
0b0008002400f2fff1ffecff270094fff8ff0b001200030081ff010001003c00eeff260003002500edff200082ff80ff29001a00deff3d00fcff340093ffeeff
0e001900ffff20001500b2ff2c0030001900f3ff2000feff3d001b002b00f9ffe8ff95ffd4ff59fffeff2b000800f6ff01001d003f0006002600f2ff30001f00
edff14001e00d3fff8fff2ff1b0008002e00e3ff22000000190036002a001a0040002c00bbff1200e5ff2700660018000100efff0700e2ff20001500250063ff
160027000700d3ffbdffccff1300000075ffffffbe00f5ff1a000e00efff480001002c00100092ff2200feff25000a003100e7ff1e00f0ff2f0092ff31000b00
dcff0e00f9ffc0ff130020001e00b400f8ff000013001400a0ff3a001d004600bdffe0ff9dffe3ff68ff04001a00d2ff3300afff1c0009001e001f00ccfffaff
f1ff0e002f001700cfff2100eeff08004f0001001800f3ff26002c00e600feffedff0f000c00cdff1000030091fff6fff1ff3100ccff28000000e0ff0d00d6ff
0500e3ffc2ffb9ff200074ff1b000500f8ff2c0021002e0035002f00f4ff0b000d003100c5ff170015001c00edff2600010027001b000b00c3ff87002cff1c00
a8ff2b001b00c0ff3c00f1008eff05002600eaff2300deff1e000b00efff1b000f0004001d00c5ff2400e5ff10002f001c0009004600f1ff230003006e000e00
0c00100033000b000000e0ff2f00030005001c0006000e007cfffefffaff4300fcff31000000e2ffeeff340093ff75ff17002600dbff430007002d008dffe4ff
a0ff1d000c0014001800c8ff2b0033001400d3ff22001a005a0021002500fafff8ffa6ffc2ff5efff9ff0f000600f8ff05002c003e0010002500fcff25000c00
f0ff19001000dcffe1fff7ff1f0002001700f3ff290006003200290036003d0044002100baff1700ceff38005b0015001c00f4ff27000e0023002300290057ff
11001200f3ffe3ffc1ffdfff290006007afffcffc200eaff32000d00eaff49000c00280010009dff250003001e00feff3100f5ff2300e7ff2b007cff1d001500
defff9fffcffb7ff14001b001400c500fbff110013001600a9ff38002d002800bfffc0ff75ffe5ff5cfffdff2e00efff210096ff1e00210027002000c1fff8ff
fbff160027001200ceff2300e7ff05004d00feff3400faff21002600e8000500e6ff12000c00bfff0f00120076fffbffe1ff3b00beff4200feffeeff0e00d6ff
0000e4ffc1ffc4ff130076ff19000600e9ff2b002c0059002c002a00f1ffecff09003000caff19000a002400b4ff2a00e8ff270014001d00e7ff890026ff1900
a6ff2e002000d3ff4200fc0081fffcff2500faff2700faff2f000a00f0ff2c00eaff0e002500d6ff2100fcff0c0034000f00edff430004001c002e0066000900
19000c004900fdfff1ffd6ff0700e6ff01001100fcff00007ffffefff7ff4b00ebff38000000e3ffc3ff24008dff7fff28002100ddff4000080036008fffe5ff
feff0f00060029001500bcff2e002f000a00ebff2700f8ff31001f002e00f6ff0000b1ffdfff63ff07001b000600f2ff1e0026003f0012002300f5ff2d001b00
edff16001e00e0fffbff0900210004001d0015002500aeff260032003e004f0043002d00bfff2000d6ff3e005a000e00dfff01001800ddff260021001d0054ff
1a002d00f3ffb9ffbbffdfff1500050078ff0000c500000033001100f4ff4e000b003100090097ff1f0008002300fdff2c00dfff1b00ecff270076ff14003f00
cbfff5fffaffc7ff080030002f00c500020015001d001d00aaff30001a002b00e5ff020075ffefff55ff0a002500d4ff28009bff1800070027002000c6fffcff
f5ff140020000e00ceff1f00eaffefff500009001e00f7ff1f002600e8000c00050009000900cbff1300010073ff0400ecff3700b5ff1d00fdffe6ff1300edff
e1ffedffc2ffb6ff360072ff1d000400ecff28001c002a0034001f00cfffedff18003000e9ff2c0012004000b0ff23002400300026003900dfff840023ff1a00
adff2f002000b3ff3d00f9006cffceff290001001f00f5ff2500ecfff6ff1700030005001900daff1f00e4ff0a002f000000feff4400f6ff2100470065000600
f7ff8dff4000f3ff0800deff17001c0002001d00feff14006ffff7ffedff4d00d7ff36000400e2ffdeff240093ff7dff1a002b00dbff48000900360081ffe7ff
050022000c001e0017008bff310042000100d0ff20000400270017003400e4ff1500b7ffc8ff5affeeff090024000a001c002500320023001600f7ff27001800
1c000f002c00e1fff1ffd2ff2300faff150009003300f9ff3b002d002c0039003f002300b9ff1f00f5ff300040000700090004001a00d9ff1e003400300053ff
15001900e6ffc6ffb7ffd2ff3a00160077ff0000c700070037000500e4ff47000b0032000a008fff0c002300240017002f00edff1500e1ff360077ff1b000a00
c8fff9fffdffc5ff0f0031002600ca000d00b2ff0c000d00baff2a001d00fdffe7ffe3ff83ffc2ff4bffffff2800d2ff2e00c7ff1800240022001200cbfffdff
fbff26002a002700cdff1900e3fff8ff4b0006003600e1ff29002d00e50005000d000d000200c2fffeff060070fffaffdfff5800eeff1f000100f8ff1000cfff
ecffeeffc5ffc4ff38006fff0d000500d8ff24001c0027000a001f00e6ffe5ff14004900f1ff2f0017003b00d7ff230026003f0032002900e3ff89002aff0d00
abff37001000d9ff4000fd0069ff0600190014001500daff2f00f1ff09002700fcff0b002900d2ff250005000dff2f001100e9ff4600220022002d005f00faff
f5ff1a002d00feff0500d6ff040011000c00100000000d0074ffebffe7ff4900e7ff34000000e3ff000030008fff7aff24002e00ddff52000e00340096ffe4ff
e8ff1d00dcff270017008bff26004000fbffe1ff2500fbff210017002c00e6ff0100bbffc9ff68ffdaff16003700050031003d0031000c000f00f6ff29001c00
e0ff0c003800cffff9fffdffffffedff1500b1ff3000ecff230039003c004a003e004500b6ff2100dcff310038000800f2ff270019008fff130047002b005bff
15002100efffe9ffb6ffd3ff1700200077ffffffcb0005002e000400ffff48001d002d001300a4ff16001b00250027003200ebff0800e9ff3c007cff0c000400
b9fff2fffcffdbff090032005300c600ffff0c0023004400c3ff320028001300dffff1ff84ffc9ff4fff0a003900e4ff3900a1ff13002f0031001700cbfffaff
faff240022001b00cdff1d00f8ffe5ff4900f4ff2400cfff33002500e50000001e0011000300cffffeff08005aff0e00e5ff4700e9ff1900fafff9ff1300bdff
dfffedffcdffd8ff31006cff0c000c00f1ff25000c001e001a003b00fcffeaff1c004b00a0ff4f0009003100e2ff160028002f003f000b000400870032ff0400
a3ff2e001e00ddff3e00fe0067ff0700200010000500e4ff2200e2ff0200fbff010009000300d8ff3300f3ffe9ff37001c00faff40000000160024006600fdff
eaff08000f00f9ffe6ff0100edff080016001200d9ff080076fff5ffdfff4c00e4ff36000400e0ffe9ff27009cff79ff25002f00d8ff4c00f6ff37007effd4ff
c1ff1a00fbff22002800baff32003b00f3ffdfff2b00fdff0e0024002e00ebff2300b2ffb5ff6dffe0ffeaff3200ffff30003200340002000d00f0ff25001b00
eafffdff6100c7fff8fffeff1300faff1a00f9ff5400d1ff2f003f003600380048003a00c3ff1f00d4ff310025000300150030001100feff12005100130054ff
14001a00fbffd9ffbbffdcff38002c007cfff5ffca00000033000900e8ff480006003a001200a5ff130030002b003e003500f1ff2700e4ff450083ff28000c00
bdfff3fff9ffa5ff08003c001600c700dfff040018001300c2ff2d0006000f00d3fff9ffa1ffd0ff49ffe5ff360009004400bbff1b00300028001800d8fff6ff
4900340019001600c5ff0700f9fffaff4d0005003800c7ff47002a00e700210019000800ffffc2ff040013004cff0a00e6ff460003002100fbff2a001900ceff
f9fff1ffc5ffe0ff3d0073ff04001500f0ff2e0024001a0023002d000000fcff07004500d9ff3e00f5ff2500a4ff1c001e00340092000300feff890034fffdff
9dff30002f00d7ff4200f40073ff040011001b00060002003800e1ffe5ff040005000f003900cfff2f000500c4ff2f000e0003004d0008000c0019006c00d1ff
e5ff12001100feff1a000200efff0e00feff0000f3ffffff69ff0000e5ff4e00f9ff2b00efffe0fffdff2900aaff79ff25003e00d9ff4d00f7ff36008effe8ff
fcff1c00f3ff2b001700d1ff31003700fefff1ff2c00fdff110020002300eaff4d00b5ffc3ff60ff05001f000100f8ff29003200400007001d00f5ff13001700
edff09003e00d5ff0000f5ffe6fff1ff150005002e00c3ff280041002a0021003d003b00bcff1d00d6ff23003600f9ff150042001600d4ff1b005500070062ff
16002f000100cdffc4ffd2ff25003f007eff0000c50008002f00f0ff0700340003002b000e009cff2c001d0022002f003a00f5ff1700f1ff490086ff1b000200
b8ffe6fffcffa4fff5ff2e002400b500e9ffe9ff1f002100cfff230028000600d8fffdffacffc0ff51ff1b0027000a003d00aeff1e00180039001500c7fff3ff
2b00060028001f00c9ff22001f00eeff470004001200c4ff48002100e400120009001700f2ffc4ff07000a0089ff1200f0ff3300fbff2100ebfffeff4500d1ff
fbfff6ffc5ffccff38006cff11001b00f5ff31002800200027004c00f0fffbff00004100edff5f00e1ff2300d7fff3ff2b002a00560016000700900041ff0100
a5ff2c002700cfff3900f00074ff060016000c000a000b001400f1fff8ff080009000b001700d0ff2d0006000d002e001400f7ff3f00f7ff20004b007700f5ff
f3ff1500020000000f000000faff1e0008000b00f2fffaff8fff0900e5ff5000f7ff2a00fbffe6fffdff42009eff76ff33003800d3ff3900faff360091ffe8ff
0f00360008002d00320076ff4a0030000000e5ff3200040021001f002e00e4ff4a00c1ffb1ff65fff0ff00001800020020003700370006000900f3ff2c001c00
eaffceff2f00ecff1500faff0900f1ff1400e7ff440004002a0031002800280045005c00c0ff0f00d8ff28003c000200210037002100ccff2d005d00170062ff
19001700feffd3ffbdffd8ff35005e007dfff8ffc300fcff2a00fbffc3ff400005002c00150094ff12004400220043003b00f5ff2100f1ff490083ff02001500
e2ffecfffcffdefffdff3c009dffae00daffe3ff15001900cfff280023000600e2ffedff9dffc9ff55fff5ff2900faff3d00b5ff2300220014000e00caff1200
5500130003002200d6ff2a0009000b0041000f003a00ccff7d002a00e3001700f2ff0d00feffb6fffbff17007aff0600dfff3f0000001f00010007003000c1ff
0100e4ffc1ffc9ff18006aff19000500f4ff32001a002a001c002900dbff03001a001f0011000e000f000c00f7ffcaffe5ff210013000600dbff8d0038ff0800
9eff22001300c6ff3d00f0009aff14001900e2ff3700c5ff14002900f3ff21000a0000001400cfff1f00fcff210030000b00d9ff42000a002400200077001e00
f9ff12001700fcfff1fff3ff1700160006001700040001008efff5ff03004100ffff2900f6ff1700e3ff320064ff7aff14002000daff29001300370088ffe9ff
feff170001001600240092ff31001c001300e7ff1e00fbff390023001e000000e6ff8cffc9ff6dfff2ff0c000700e1fff1ff150041000900250000001f001f00
eaff1500fbfff4fffaff19001b000900100016001900edff120017003b0036002e002500b5ff0f00f2ff1e00630001001f00f3ff2300deff2600090021005cff
17002400e8ffcdffc6ffdbff1900020077ff1b00b700edff2b001500e7ff4b0015001d001800adff1d00ffff280019002f00ebff2a00eeff230091ff15001300
defffbfffaff9eff0b0018001600c100f4ffe5ff10001700abff39001f000100afffd2ff69ffe6ff66ff0b002600fdff2000beff14000d0030001c00c1ffe6ff
f8ff180025002100ceff2800d7ff06004f0001001e00caff22002300e100fdfff6ff12000d00ccff0e000d008bffc7ffecff2f00e7ff9100f6ffecff0e00faff
0700e2ffbdffbcff170068ff0e00fcffe6ff26001b006b000a002800e4ff010012002e0006000e0000001200e5ff1400daff15001200feffc8ff8b0025ff0d00
a8ff2e001400d5ff4100f30090fffdff2300f5ff2b00edff2b000900edff3000e4ff0d002400c6ff25000d0021002c001500f4ff4300f2ff1d0030006c001300
fcff230026001000ebffd7ff2500030004000e000300feff7cff090000003d00f1ff33000100e0ffcdff280091ff7dff1c001c00dcff3600f9ff350097fff8ff
a4ff2f00fbff2a00140097ff300023000b00f5ff2600150020001a001f00fcfff3ff95ffd4ff68ff130017000700f1ff10000d00450006002300f5ff33001600
f1ff17000500d7ff02001700150012002000ccff230008001b0030003c002a003d001d00bfff1900e9ff240064001e000300f8ff2a00f2ff1c0015002a0054ff
14003000f7ffcbffc3ffdeff120009007fff0700bf00edff2d002300f4ff470005002f000900acff2600fbff260005002b00f0ff2600ecff2b008aff41000f00
cdff0300f9ffacff090025001a00c500f5ffeaff1e001700b4ff2f001a002500b2ffe2ff71fffaff5eff0b002d00eaff1d00a6ff1a0011002e001f00ccfffdff
e7ff150029001300cdff1600e5ff05005200ffff2300e8ff1b002700e7001400fdff14000300ceff12000500c1ff4e00f3ff2b00bbff2e00ffffebff0900f9ff
f2ffe7ffb5ffceff200073ff2400faffe8ff240021003f0014001f00ecff040007002d00d0ff1100fdff0e00ecff2000f3ff210010001e00e6ff8a0037ff2a00
a7ff2d002000d0ff3c00f70083ff19004b00f6ff2700e5ff17001200faff2f00f1fffbff1a00deff18000600170033001300f9ff40000a00230016005c001100
dbfff9ff2b00f7fffcffd2ff0800200001001000f9ff000080fffdfff7ff3f00e7ff30000400e5ffc9ff310095ff75ff16001800dbff3f000800240088ffe7ff
05002a0003001c001d00a8ff300024000800d7ff1a00fdff260019000e000800f7ffb4ffc3ff6cfff7ff15001a00e6ff120037003a000b002400fbff33002100
f1ff18000b00e9fff7ff0200180009001100fbff3500b5ff1f002f0036003f0045002200b3ff1b00eeff2e00540018001e000000210000002500180023004cff
120024000600d2ffc1ffd8ff2a00090078ff0c00c900faff38000d00ffff4c000b0035000d00c6ff1800feff2d000e002e00fbff1e00e3ff250081ff13003e00
dffffdfffaffb9ff030021001d00d200eeff170018001300b4ff27000e000100ceffd9ff6fffefff4dfffdff3000fcff1c009dff21000c0031001300cdfff7ff
f5ff100027002100cbff2900e4ff01005000f7ff3600cfff1a001300e6000e0014000c000600d4ff11000c008cfff9ffe1ff4b00f3ff36000000efff0600e3ff
e4fff5ffcfffbdff270078ff1a00f0ff690024001700530017001c00f4ff0b0007002100e1ff160003003900a6ff260003001b0014000a00e0ff8b0036ff1000
a8ff2c001800d2ff3c00f90074ffffff2a00ffff2300e6ff2f000700fbff3100ecfffeff1e00ddff2d000a00fbff2f00080012004600f0ff2600160057000800
edff15001f00f3ff0000d5ff0800070000000500fcff060081fff7ffeeff4200d8ff34000300e2ffd5ff2b009cff73ff1e001a00daff4300070033009dffecff
ecff1f0001003100170081ff2b0023000100e8ff1800ffff0b0024002100e8ffffffbaffd2ff66fff6ff17000d0009001e001c00320004002200f7ff2f001900
eeff0e000700deffe4ff17000f00cbff0d000800270006001e0031003c00400038002d00b8ff2200efff250045001200fdff11001a0096ff31002200380053ff
14003b00efffcdffbeffd6ff0f0012007dff0d00ca00150039000d00f3ff4d0017002e001200a0ff1d001000260016002c00ecff1900f2ff310077ff06000500
cdfff6fffbffd6ff000032003a00d500f0ffa4ff18001200bbff220015002a00e5ffefff35ffecff4bfff1ff3200f0ff230099ff210018002f001400d1fff7ff
f3ff270020001f00d2ff2300e9ffe9ff500007001e00d9ff25002900ea000c00010014000e00d7ff0000ffffb6ff0300d4ff3500deff2700feffedff0500efff
8bfffbffc0ffd3ff1b0071ff1e000000e7ff290012002e002d002000d3ff0f0017002200ffff2c00f4ff2900b9ff0c001700280013002500e5ff880036ff2b00
a7ff31002c00c4ff3e00fc006cff1c00250014000f00f4ff2000fafff4ff2400fdffedff1500ddff2300faff050035000400eaff4800f6ff2300350052000200
effff1ff1000f6ffd1fff0ffffff11000a000b00ebff040078fffbffeeff4100d3ff3300f7ffdcffdeff22009fff5eff00002200dcff41001800380085fff5ff
c8ff270000001f00320089ff2b002a00fbffeaff1d00f4ff0d0014002100f6ff1100b5ffc0ff6dffe3ff11002500fbff1f0015002e001b000c00f8ff2b001d00
e8ff0f002800d8ff0700faff0700fbff1d00c7ff4c00eaff2900330034004c0047002900c2ff1d00f9ff370026000d000b00180015009eff1d0028001c0054ff
13001a00efffd3ffc2ffdbff3c0020007eff0d00c7000e003c001200f8ff4d000f002e000e00a8ff1a000e00250038002c00f3ff0200d2ff3f0080ff19000e00
ccfff7fff6ffb1ff040023001700d500c8ff100013003b00c4ff1a000f00fcffdcffebff86ffd3ff4dfff3ff3200fbff3100c3ff19001f0030000d00d6fff7ff
21003a0022002500ccff1f00fefff8ff4e00f7ff3700d3ff26003000ea0019000e000a00ffffd7ff13000b009fff0200eeff2a0004002c00feff01000000e2ff
e9ffdaffbcffd9ff12006bff14000d00ebff23000e00270024002800d8fffbff13001f00b7ff2700d7ff3600cfff1f001e0023002d000400f3ff8d006fff0700
9fff25001e00d4ff4500fa006affffff1d00f5ff0700d1ff3400fafffbfffdfffaff11001d00daff1b002500f4ff35000300eaff45000a0023000c005600daff
e7ff1c001000f2fff4fff4fffdff0f0016000500ecff00007bff0b00e2ff4600d8ff3100f7ffe5ffe8ff1600abff75ff32002500dcff450002003c0098fff8ff
0c002100fbff24003100dcff32001d00e7fff3ff2400f8ff130016002600ddff2200c0ffc7ff6affe5ff2a000c00fdff28002b00370008001100f7ff1c001d00
efff0f003200c4ff0b000500ffffd9ff1f000f002a00e0ff230034003200320042003000baff1900e9ff1f0020000200070022002700feff37003a0020005eff
11002500f5ffceffc4ffebff03002c0088ff1200c9001f0031000a00eaff4800060038000c00a6ff47000a002c0041003400fdff3300e5ff49008aff09000200
beff0400fbffa1fff9ff2f002300d400d7fffdff16001500b7ff1d0019001200eefff4ffc5ffddff5aff0b002a0000004200c2ff1600250039001400d0fffeff
10002d0019002300c8ff1f00fbffe4ff550008001f00d0ff27002c00e400300010000d000b00d1ff06000800b4ff0e00f7ff27000c002100f3fff7ff2300e9ff
f2fffdffc6ffdeff250072ff15001400fbff20002200270027002b00d8ff0c0011001f00f2ff2c00cfff1200a2ff03001c00330036000000f9ff890025ff0b00
9eff30002e00cbff3e00f80073ff0a0017000c000800f9ff2600fefff3ff0d00050008002500ddff2c001d00f9ff30001300f8ff5100f9ff230046005d000500
e9ff1b00fffffefff8ff0e00eeff1200feff1900ddfff9ff87ff0300e3ff4100ebff2f00f1ffe3ff00004e00a2ff74ff16003b00d8ff4200feff3a0094ffeeff
12002800040021002700ceff2f002300eaffe5ff2a00000011001c002d00e3ff2e00bfffc1ff66fff6fff6ff2700ffff1f00300035000a000c00f9ff30001a00
e9ffa3ff4500dfff0d000f0009000c001300dcff1d001f0024003800300024004c003200c1ff1a00d6ff2d0022000a00260030000e00c1ff160033000c005eff
16002300feffc7ffc1fff5ff3400330083ff1600c500fbff34000a00e1ff450017002e001200a0ff26001800210036003300f2ff0c00dcff50008dff14000b00
dcffe9fff8ffc3fff1ff2800f3ffc800b4ffe6ff1e001c00c8ff31001e000500edfff4ffb4ffceff52ffe7ff2e00f2ff4400afff19001a0026001500d2fff6ff
2f00240018002100cbff1b00030000004d0002002c00baff2f002c00e400230015000700f9ffc6ff0b00060096ff0f00e4ff360004002500f5ff2e002900d5ff
0500e8ffc2ffdeff100074fffcff1800f7ff3c001d0010001d003000e2fff7fffdff2000b1ff2200e4ff1100c3ff19002400190054000700f2ff8b0025ff0a00
9aff34002600d4ff3f00ef0082ff0d00160003000000f4ff3000f4ffe9ffedff0a000f002200d2ff3000070006002f000c000c003f00f2ff210007006e00f0ff
e4ff0d00f1fffcfffdff0600ecff1800fafffcffeafff8ff97ff0000e3ff5000deff2d00eaffe1ff03002400b2ff71ff1e003a00d9ff4000e7ff34008fffebff
10001200f6ff1c001a007dff3b000f00edffebff280013000a001c002100ddff4e00bcffbbff6affedff0d000d00faff1e00220041000700fbfffdff2b002000
deff0e001a00deff09000600f8fffaff0b00bfff3d001000200038002700110046000e00c0ff1100e9ff28003100000028002d002000c8ff1800560009005fff
120025000300c0ffc3ffe4ff2a00580082ff0700c100f8ff1700f8ffecff40000c002c001700a3ff37000800340047003900e1ff1500edff4b0090ff01000e00
e4ffdbff0100c1ffedff32000e00b400b3ff20001e001a00c2ff1f00240002000000feff8fffc8ff5cff3b001e000e004700a6ff1f0015002b001000bfff0d00
f9ff17001b002100c6ff24000000faff4c000b001300aeff4c002800e1001f0012000b00fbffd3fff4ff03009eff1100fbff2b00f6ff1800fbff01003400d9ff
1400ebffb8ffdcff020069ffd7ff0200efff2d00160030000e002900d4fffdff0f000f0008000c00fdff1700f0ff0800f7ff170001000b00d0ff900037ff0200
aaff29001400e7ff3e00ed008effecff0b00e4ff2f00d8ff26002000f0ff3200eeff09002800ecff1f000100270033000c00ebff4400f1ff1900150074001700
f2ff06002e000b00ecffdbfffaff0000ffff05000b00f3ff81ff050012003c00fcff2d00f7ff0900e4ff1c009fff79ff17001800d8ff3800050038008dfff2ff
06002700ebff260017009fff2b0013001600dfff2500fcff11000f000e00feffe0ff91ffd1ff6eff02001a000000e7ff060016003e00ffff2d0000002a002100
e1ff17000300d9fff1ff0b0018000900180011001c00cdff13002f003500300028001f00c7ff0200e2ff0b00640016000000f1ff18000e002a000c001b005aff
14003500fdffddffc4ffddff2700080078ff0500c300e3ff21001e00efff3f00040010000f00a6ff2f0004002e0000002e00eaff2700ecff1a008aff21001800
ddff0200feffb3ff050025001000c200f4ff190011001c00afff350012000a006dffdfff84ffe5ff64fffcff210003001900b3ff1400feff36001900c3fff6ff
edff0f002a002100d1ff1500d7fff7ff540004001b00cbff17002b00dd00f6ffe7ff1c000e00d8ff08001900b7ff0200efff2000bcff2100f2ffedff0700e7ff
0300f5ffb8ffc6ff1b0079ff1e00f3fff1ff2e001a002a0015002b00d0ff0b000b00230005000b00ffff0d00edffdeffeaff14000f001900cdff8a0041ff0c00
abff29000f00d6ff3a00ea0075ff00002c00e1ff3600abff0f001600f5ff20000200fdff1700d5ff1b00f4ff100031000500cfff490004001e00050067001500
defff9ff17000400eeffe0ff08000a0004000900feff000086fff8fff0ff3800faff2b000000d0ffddff270088ff6eff11001f00d6ff36000800300085ffe1ff
6fff120005001a001d008cff2d0012001600e2ff1d001f001d001b001500faffedff9dffc8ff66fffaff06001400d9ff0c00340032000a002c0001001e002000
f3ff0d000400f1ff0a000d00130006001b001f002600ffff21001c0037003e0036001c00bcff1400f5ff13005f0030002d00fdff210014002700110038004eff
10002700f4ffe4ffc2ffcaff2400000076fffcffc300f4ff38001a00fbff470007000c000e00aaff150000002b0011003000e9ff1b00eeff200094ff1a00fcff
e8fff5ff0000a6ff01001c001400c800e3ffd4ff29000f00bbff280006001a00b1ffd0ff6effdcff52ffebff210003000f00a5ff2400100038000d00c6ffe8ff
f2ff0c0020002600d4ff2600defff2ff510002002a00deff1a002000e1000500f6ff08000900d0ff08001300cbfff0ffe3ff3f00f7ff2300faffebff0e00efff
fdfff7ffbbfff0ff1d007dff1a00e7ffddff29001a002a0025001e00e0ff14000a001e0002000c00feff1c00e3ff1b00f1ff1a0003000c00dbff8e006bff0000
adff28000f00d3ff3800f0008dff09002400eeff3700d5ff2e001a00f4ff2200f8ff04001e00f3ff11000000000033000800edff4100040020001f0052001000
faff12002300e8ffecffe8ff0600050000000400fdff000081ff0000ffff3900f5ff32000700ddffdeff2c0095ff75ff14001700d9ff3d00e0ff2f0095ffefff
06001600f0ff3a001d0099ff2b0018000e00eeff2500fdff0b00130010002200f2ffb1ffc8ff6aff000026000b00ebff18001800360007001d00fbff2f001e00
f9ff10000c00d0fff4ffffff0600f0ff1e00e1ff250075ff140022003900330047002c00bbff1e00f8ff2e0052001a000b0009001e00000029001900310049ff
15004f00faffe4ffb9ffdaff230005007bff1100d000020035001300080049000b0017000800a4ff1800f9ff2e0014002d00f3ff1400f2ff250089ff24004300
e1ff0c00f6ffd5ff010023002800d300e6ff170034001600b7ff1c000c000700ccffe7ff6bffddff4eff020028000b000c00a4ff19001f003f001300ccffefff
e5ff0b0022001600cdff2700e1ffedff5600faff1300c2ff1b002300e5000400120004000800d6ff05001700b6ff0000e7ff2e00e3ff1a00fdffecff0000edff
dffffcffbeffd4ff170082ff2200ebffeeff25001e002d000c002600d5ff1c0011000b00c9ff2100f2ff1000eaff0600f4ff15000e001600e5ff91004bff0200
abff31002200c4ff3300f80076ff0a001900f1ff2700e4ff1a000200f2ff1100eeff21001f00dcff1700ebff12003200080007004500f7ff2400340042000a00
e7ff12000700eeffd5ffebff1800140002000500f6fffcff7aff0200eeff3e00daff2b00feffe0ffdeff3000a1ff78ff07002300d8ff43000d00340090fffeff
cfff1700fdff1c002600d8ff2f0010000100b7ff1700f5ff1b0025001f0034000000b9ffbfff70fff2ff1c000d00dcff15001b00310001001900f1ff2a001500
eaff12001c00e0ff0a00fcff0d000400ffff170047000c000c002c0037002e0042002200b3ff1900f0ff19003a000d00220010001600e4ff24001b00190052ff
14003200e7fff4ffbbffd0ff17000e007fff0e00d000010036000a00ffff4a001b001c0011009fff39000a002b0027003100f4ff1700fbff3b008afffeff0b00
d2fffffff1ffb6fffdff19000c00d500cfff74ff17000500c4ff200035000900d0ffd7ff51fff2ff4affe9ff28000b00230096ff1c000f0039000d00cefff4ff
130021002a000800cfff2900e2ffd7ff570006002400d1ff24000900e60002000a0007000300dbff0d001000d2ff0500d9ff2d00f8ff1c000100f5ff0c00f0ff
e8fffbffc5ffe3ff140072ff0600eeffeaff2a001800320022002800dcff1d0007000000f8ff1300e5ff1f00b7ff17000a00200019000100f6ff8c0050fffcff
a9ff3b001a00dcff3c00fd007cff03000d00f9ff1900e6ff2900fdffeeff1900f1ff02001700e1ff1b000600020037000600edff4300fbff1d001a003d00ffff
efff15000b00efffebfffcfff5ff05000700fefffafff9ff7dff1a00eeff3c00f1ff2d00feffe2ffe9ff2f00bdff76ff2a001500d9ff4700030034009efff8ff
13000f00ecff1d002900e6ff200013000500e8ff1e00f6ff08000e001a0008000300c1ffcaff6aff04001c001800f4ff1d000e00390007001000f3ff2f001700
f8ff0a000500d8ff0f000900fbfff6ff0b0084ff2700e5ff11003100390025003f002600c5ff1900edff1d0027000900120018002400ceff8f00250010005bff
12002800feffe8ffbdffd2ff37001a0081ff1100d000240034000f000600490012001b001500a2ff1100ffff2d0032002c00edff0700efff43008cff4a001200
cffff1fff5ffc3fff9ff24001a00de00c5ff16001a003f00c1ff1f003f001300d7ffe6ff76ffdbff4cffe2ff2c000a00320099ff160008003c000e00ccfff8ff
f7ff200018000c00cdff2000efff94ff590001001b00d5ff1f002c00e8000a00050000000300ddfff2ff0900e5ff0a00e3ff2100e0ff1000f8fff3ff1100d3ff
d8ffddffbbffebff15007bff2600fffffcff2c001200260009003400d0ff1b000600090078ff1900dcff1300cfff0300190016001e000f00f2ff8a0062ff0a00
a5ff1c002d00cfff3800f80066ff0a0010000800fbffeeff2000fcfff7fff7fffdfffcff1600e3ff2200eeff14003400fcffe5ff4300ffff14001b004b000b00
e7fffbff0400f3fff2ffe3ff0000120004000400dffffcff88ff0900e5ff4000d3ff2c00f6ffd8fffeff1800bdff6fff25001d00d6ff4700edff2a008cffeeff
16002800070013004100d9ff29000c001400eaff1d00fcff0e000c001800ebff2e00bfffbcff6dffe8ff0c001400faff170023002e000e000900f5ff36002000
fcff00002600dbff2200000000000600210015002d001800120035003700390047002700b2ff1800e4ff24000b000800230015002800feff33001d00030057ff
12001e00f1ffdeffc1ffd5ff2800240082ff1500ca001a003a000500f4ff4800220019000900a6ff17000700230036003000f2ff3700f4ff470093ff01000f00
c0ff0000faffbcfffdff23001300df00bdfff4ff1b000800c6ff16000f000000caffe0ffd6ffdbff4fffe5ff220007003c00c5ff1800290041001200c3fff5ff
050021008b002600ccff3f00eeffd5ff5700fcff2b00c3ff30003600df001400020005000400d1fffeff1300dbff0800ecff270007000f00f0fff8ff1200f3ff
01000200b9ffecff17007ffff7ff1000f8ff27001800260015003700d4ff180005001500ebff1c00ceff310074ffcfff2800260031000400fbff860054fffbff
98ff32001700e4ff3a00f20066fff9ff0e00f6fffbffecff1f00f2ffeffffcfffeff08002700e0ff2000f6fff9ff31000700f8ff4c0007001200feff5600f4ff
eaff04000900f6ff00000d00f6ff0c00fafffdffd8fffbff8fff0c00f1ff3900f8ff2d00daffe4ffffff3600c2ff7dff3c002a00daff4300ecff31009afff6ff
21001400f9ff15002300d3ff29000b00ebffe7ff2300ffff090007001800dcff3500beffbfff5dfffaff1a001500fdff270024001a000900dffff0ff1c001d00
e7ff12000a00d8ff1400fcffebffe6ff1f00e7ff17001f00160030003700210041003100b5ff1500d2ff2a001b000700f9ff25002600faff24002e00d6ff5dff
14003200f6ffd9ffc8ffd8ff3200260086ff0200c90024001d000800e5ff3b000f0022000e0099ff4000f8ff280046003200f3ff0a00f0ff480090ff19001200
e1fffafffaffbffff7ff2b000300c100c5ff1f0014001600c0ff1a001c000300fbffe8ffa9ffccff5cffe8ff0f001e004b00b0ff1800120036002700cbfff5ff
210003000c001900c7ff16000300c7ff54001e000c00d0ff0e002c00e2001500140007000200d8fffeff0a00ebff0d0020001e0000001200f5fffaff3600ebff
0b000000aeffe9ff0d0077ff06001c00eeff33001c001c0024002f00cfff070007002200bfff2400ddff1100d1ffacff28001b002b00f0fff0ff8b00adfff5ff
98ff38002800baff3400e90073ffffff0a001500e7fff0ff1c00faffecff1d00040014001900cbff2300f1ff0f0029001b00e9ff4b00eeff2c00370072000800
e8ff1b00f0fff6ff00001800f1ff1c0017000500d5fffbff91fff9ffdfff3c00e3ff2f000a00e7fff0ff1c00b3ff68ff2c004000d8ff3a00ebff300082ffedff
18002100100018002f00e3ff3c000f00f4ffe9ff2700fcff070012002100e1ff2f00c2ffb3ff5effedff05002b00feff1f003d0030000100fafff7ff13001e00
e4ffffff2e00d7ff1e00fdfff7ff0200190021002d0014001b003c003a000c004c002300b5fff9ffd9ff1f002400fdff230020001f0018001c0030000f005eff
14002900f5ffe8ffdeffe3ff200054007dff0800b900040027001200daff3e00050016001500a5ff2d000400320043003500ebff1900eaff4e007fff0f001f00
f5fffdfffdff94fff3ff25000b00be00aaff2b0018001700baff130012000300f3fff7ffb4ffd4ff6dfffcff17000f004600a3ff2b0004002b001a00bcfff8ff
0b0012000c002300cfff3400e9ffdaff46000c003300c9ff36003600d9000f00f9ff0000fbffcefffeffffffc4ff0a000d003700ffff1200deff2d003c00e7ff
ffff0100c4ffd9ff180070ff1900fdfff1ff36001100240014003500f1ff10001f001200effffdfff2ff0f00f0ffdcff06000b000a001c00e9ff8b0032ff1100
aeff25001f00c6ff57ffe400a3ff05001400e8ff3f00cfff22000b00fdff3000ebff00001600ebff1b00dfff100038000c00e3ff4500070023001f006a001900
e4ffe9ff0100fefff8ffd3ff06000a00faff0b000900f4ff82fffcff04003900fbff2500f1ff0700d5ff2b0079ff6cff06001100e1ff3600f1ff2e009efff4ff
ccff160005001a001400e3ff330004000d00e9ff2a00f6ff0e0012001c00fdffddffa4ffb5ff69fff6ff1700fbfff0ff0f001c002c00fdff2d00fdff19001700
f6ff0b000000d6ff02001200110007001100ebff21000b0014001e00340037003f001300aaff0500f4fff6ff5f000c002100fcff2500e2ff1a000f001f0065ff
08001900f1ffdfffc0ffc4ff1a00020078ffe9ffbe00f5ff2f001000efff4300080006001d00aeff1900f6ff30001c002b00e5ff2500ebff1c008eff21000d00
e3ff0200fdffaaff000009000c00c800e3ff100012002500bbff2e001000ffff84ffd4ff71ffd8ff60fff5ff210003001a00c1ff230014002a000c00c8fff0ff
e7ff0b002a002a00d1ff2300e0ff0000590005003300e1ff1e002000dc000700ecff0c00fcffd2ff1a002e00effffdffdfff4300eeff2900f5fff1ff0c00efff
0500eeffcaffd3ff110081fff0fff6fff7ff39001500260021002900f5ff220015001700c5ff000002002500ebfff1fffeff0a000a000700cdff910038ff0000
abff27001c00dcff4000e60095ff09000700e0ff3e00d6ff24001300edff2100efff0a001f00e8ff2400f3ff050035000100d9ff4d00f6ff0f001a005c001a00
e3ff00001100f4ffe8ffd2ff110000000000fcff0900f8ff7aff0800f8ff3c00efff2d00f6ffe0ffd2ff3500a2ff81ff24001800dbff3c00060044009afff8ff
93ff0b00f6ff4400110081ff2a0010001900f7ff1f002f001300150016001a00e4ffb4ffb9ff69fff3ff24000600f7ff0c002700300003002800fdff23001900
ebff18000100d6ff090012000300f5ff1e000b002400c0ff1500270038002e0044002400afff2300f3fff6ff5d000900180003002000ddff20000c0026005aff
13002100feffd9ffbfffddff1e000a007fff0200b800f4ff3000200006003b00160020001700a8ff1a00050032000e002d00e9ff2300fbff200089ff0d001000
eaff0800feffd6fffaff24002200b700e5ff0d0046001a00baff210016001b0087fff1ff5affddff5affeeff2d0005000a00a3ff190007003a000700cdfffcff
f7ff0f0026001700d2ff2200eefff7ff570001001200ebff23001d00e0000d00f0ff0d000200c4ff18001400dbfff1ffecff2300e6ff1e00f6ffecff0300eaff
deffffffbbfff0ff1b0091ff1e00e8fff9ff37002300270015002200daff1d000c000700e9ff0c0000001300affffbfff9ff0e000b000800e7ff940028ff0000
aeff20002000c9ff3d00ed0052ff1b001d00f6ff3d00d5ff04000c00efff2400ebfff1ff1900ebff1a00e9ff1a003400faffc4ff430000002b002f0049001100
e7ff07001700e7ffcfffd4fff6ff04000700fefffffffdff7effeffff4ff3e000a002900fcffd3ffccff1a009cff6dffffff2100d5ff42000600320093fff4ff
c1ff00000b001a001b00e1ff2e000c000c00d9ff0f00f1ff0a000a0011000900f9ffb3ffbbff65ffe4ff0c000b00e3ff0b000f001e0003001e00feff37001700
eaff13001300c7ff0800040008000100200007003d00b5ff1400240039002f003d002900cdff19000500f1ff550013002a0008001f00caff240020001f0054ff
15003300eefff2ffbbffd1ff1f0000007cff1300c100fdff3e0017000b004a00100005001500b5ff2100fdff33001f003900edff1800020030008dff03004500
e4ff0000fcffb1fffeff19000700c100ddffe3ff1d000f00b9ff23001a000a00c1ffe2ff47ffe3ff51fff6ff200019001400a2ff1e0008003a000400cbffedff
0900250016002200d5ff1700edffebff58000c001e00ceff12001d00e10003000a0007000500d9ff0b001800c3fff2ffedff2b0008001c00fbfff3ff0b00eeff
fbff0200beffd4ff100095ff0f00e4ffe6ff32001d00280016002800dbff270005000000f2ff180007001400c2ff0f00010007001c000d00eeff9a0086fff8ff
b1ff24001200d3ff3c00f6008bff04000d00fcff3100d2ff29001300edff1f00f0ff01001c00eeff1f00e3ff180035000500d9ff4400fbff1d001f004a000500
f7ff0e000500ecffdfffecfffdff0d00100000000500faff83ff1300f1ff3e00f8ff2700f8ffdbffd6ff2900b3ff72ff06001d00dbff3b0018003a009efff0ff
1f001000fdff1a001400e9ff27000a001000e1ff1500faff080034001f0036000000baffc6ff64ffebff16000c00edff14002500240000001900f1ff26001b00
f5ff0c000700c7ff0700fdff0300f5ff0600dcff2700dbfff9ff310041002d0042002500caff1500eeff05004a001200110013001d00d2ff2b002a001b005aff
17003700f9ffdaffbaffe0ff3500110082ff1b00ca00280030000c00110050000a0018001400b6ff16000000330027003b00f2ff1700f8ff46008eff1c000500
d5ff0600f2ffb9fffcff1f001900cf00ddffb3ff2c000a00c7ff1a0010000400d1fffbff73ffe1ff3dffecff2900200017008cff2300110042000a00d1ffedff
f4ff100024000c00d4ff3700e3ffefff5900ffff1500d7ff28002000d9000c000e000300feffd8ff07001200e2ff0c00c9ff2200ecff1d000300ecff0500e2ff
eeff0f00bbffe6ff0d0092ff1900effff6ff2c002000250003002c00d9ff2b000200fbffc3ff1900f7ff1800eeff01001100180013000700faff910060fffeff
aaff8a001d00d2ff3300f00092ff11001800eeff1500edff10000600edff1000fefff8ff1200e7ff2600f8ff0b0033000700deff4400feff25001a003f000800
ecff0100fefff7ffe8ffe9ff04000c0009000100fdfff7ff82ff2d00ebff3900edff2700f9ffd8fffbff1200beff6bff2e001400d6ff4500f0ff2b00a1ff0400
20001700060011002100e0ff260006000200e4ff1900f3ff1c0007001800f6ff1100c3ffc9ff6aff040017001300f2ff150013002c0004001100f8ff23001b00
e9ff0c000c00cdff120008000400fdff2300c6ff2a000c001400310037002b0047002600c0ff0d00d4ff120028000f00130010002d00dbff26002000180060ff
14001700f2ffe5ffc1ffd2ff1f0018007eff2000b4000b003600150003004a00130003000b00abff1b00fcff330029003100eaff0d00f9ff44008bff04000b00
d7ff0000faffa7fffdff1d000b00de00c4ffe7ff1d004300c3ff24002000ffffc9ffdfff76ffd5ff45ffdbff280012003300a2ff2000130035000600c9fff6ff
f7ff1d0014002500d2ff3300dfffdaff5400f8ff2500d1ff2a001c00de0009000f000400f4ffd2fffcff1600ebff0000ddff2900fdff1e00f2fff7ff02000900
eeff0000c5fff8ffffff81ff0000f3fff1ff300016002a0015002700edff2400fffff5ffbfff150001001300a4fff7ff1e000d0019000100ffff850032fff1ff
a6ff26001e00deff3500f60063ff0600100000000600ecff1f00fafff2ff2800f1ff14002000daff1800f9fffbff32000b00daff410003001f0028003c00f0ff
e9ff04000300fffff1ff0800f3ff08000b00f4fffefff5ff8aff1900edff3700f4ff2300fcffdeffedff3300c0ff72ff11001800d9ff4600fbff2500abfff8ff
09000f00fdff0b002500f0ff260009000600daff1e0002000500fbff1a00f9fff9ffc5ffc5ff66ff0a0025000000fdff10001d0032000c000800f7ff2b001a00
ecff09001400cbff16000f000500f3ff1b00e2ff1c000f0000003900350027003b002300b9ff1600edff14001f000c00250013002800000025002700080062ff
14002400f1ffe7ffc2ffd6ff2e001b008aff1800c200210025000300d7ff410007002b001400aeff2000feff340031002c00f0ff3d00f0ff48008bff27000700
c6ff0900f8ff9cfff9ff30001b00e000cfff110012000500ccff17001a001000eaffe1ff9effd4ff4dffe9ff14002b004e0090ff140026003c000c00c5fff6ff
f8ff0c0006000e00d5ff3700eefff7ff5a0003001500deff25002300e9000200020007000000dcff0e001000edff0d0009001700e6ff0b00ecfff1ff1700d1ff
e5ff0400c0ffe9ff060072ff1700f6fffbff3300240021000f002200dcff21000d000d00adff1e00faff0f0097ffc8ff26000a001a000c00ffff7f0085ff0700
a6ff29003900ddff3400ef0083ff060004001200ecfff8ff0c00f0ffebff0900f6ff00001f00e6ff2900dcff0f0029003f00dfff46000100240021004f000a00
d1fff0fff8fffffffcff0100f7ff12000d000000bdfff8ff86ffe7ffecff3100e0ff2c003100e4ffedff1400c7ff6eff2b002e00d8ff3f00e8ff2d009affefff
18001800120007001700dbff300006000300d0ff18000100060000001b00dbff2a00b7ffb0ff65fff4ff13000800f9ff06000a0038000b00fcfff6ff24001100
fcff05000300d0fffcff00000000fcff110002001a00eeff09003f002c002f004a002f00bcff0b00d2ff1b001800010029001f003000feff12001400f6ff5aff
14002600fdffdeffc7ffc8ff2a001f0081ff0e00ba00230027000400caff2d00060034000f00acff1a00f0ff2e0035002a00e7ff0900eaff490086ff0c000c00
bcff1400f8ffc7fffbff38000400d000cbff0a001b001500c8ff18000a00fefff3ffe6ffa4ffd3ff59ffe0ff0a0006005500c0ff140015003400f3ffbfffe8ff
14001b00feff1e00d2ff2c00faff01004a00f7ff2600d9ff15002c00d9000d00ecff0500f5ffd3ffdeff1a00ebff1300330024000f000800fafff2ff1600ebff
03000b00a7ffe9ff0c0073ff00000100000017002200210003001b00d8ffffff1a001300ecff24000400190099ffeaff20000c0022000100faff850030fff1ff
a1ff2b001100e1ff3900db007effffff0f001a00e9ffe6ff2000e5fff2ff1700020010001600ccff1700f1ff1c0032000700d5ff49000c00280023006700ddff
e2ff180000000000f4ffffffc3ff180013000400e9fff9ff90ffeeffe8ff3200e2ff29001600dfffe8ff2a00b8ff6cff30004d00dfff3400e6ff2f0094fffbff
1000160008000e001200d8ff37000c000200e5ff2c000400f9fff4ff0c00dbff1700b4ffabff64ffdeff14000c000b00180025003d000000e5ffffff27001700
ebff05001800c7ff2600effff0ffdaff1900f0ff11000e0015003e002f00090047003100afffecffeaff19002c000700090019002200ffff14002100feff6eff
0c000b00fcffcbffc7ffc5ff2100500088fffdffb1001b002300f8ffceff3700e2ff31001700aaff1b00e7ff300032003300f3ff1900f0ff48006cff1a001300
e1fffdff0000b6fff0ff35000200c500ceff05001b001700b9ff190005000a00f4ffe4ff61ffe2ff6dffefff56ff1100530089ff23000d0025000400bfffe0ff
f5fffeff17000c00c7ff2f00e9ff0300360008000800d3ff1e001a00dd00230003000500e5ffd0fff7ff0200f7ff14002c002d0014001b00edff00003000efff
0c00f2ffd2ffbfff110070ffdcfff3ffffff2f0019001f002a002c00fcff100087001300d0ff1c0000001300a7fff8ff0c000c0012000d00e6ff890032fffdff
a0ff27002f00ddffa6ffda0094ff15000900dcff4b00dbff29000000eeff2600f5ff09002600daff1e00efff0f0030000500e6ff4600f0ff1d00120065001a00
eaff08000b000d00dcffd3ff0300fbfffefff5ff1500efff7bfff8ff06003600e0ff1800f8fff9ffefff180098ff82ff0c002000ddff380017004f0096ffefff
e9ff0800f6ff3000170081ff270019001c00e7ff4700010002000c000f00fdffdcffafffb9ff65ffe6ff14000400fdff16001e004300f6ff2f00fdff22000100
f1ff13000500c3fffdff1100ffffecff1900d9ff0f0098ff04002d003c0024004b002600a1ff1b00f5ff130063001b001a00f9ff1f0008001d000e0018006eff
070027000000cdffbcffbeff1b0001007afffbffc100ecff24001800dcff3900ffff19002200abff1700fdff350023002700dfff3200e0ff29008bff16000a00
caff1400ffffc6fffbff17002300c200ddfffeff21001500b1ff2e001b000c008affe3ff9cffdfff67ffe6ff1f0018001600d7ff0d000a003a002300c3ffefff
ebff0e001f001800d4ff1c00f1fffbff4f0006001d00ddff1e001d00d9000100ebff1100f7ffcaff12001400d7fffcffddff2000f1ff22000000faff0a00dcff
f2ffe8ffcaffd0ff120082ff1900f1fff6ff35001900200013001e00f4ff1e0032000b00c6ff0e00f5ff1000afff1d00ffff040008000d00d8ff87003dffffff
a4ff27003500c1ff2900e400a5ff0f000f00e8ff4200dbff0e000b00f0ff2700f2ff01001600d9ff1200edff15003100faffd7ff3900f3ff1f0018005c001300
deff0d000600e3ffc9fff0ff0d000700f4fff9ff0100f2ff6dfff5ff00002f00d6ff2000f1ffe1ffdbff1d009eff6fff0a001900dcff390008001d00a0fff6ff
4eff0600010018001800e9ff27000a001100e3ff3b001f0011000a001b000e00ebffb0ffc8ff6dffebff1a00fcfff8ff06002300400003002c00020027002200
e9ff16001100cdff21000e00070004001f00d8ff3900060016002900320023003d002000b9ff2500e8ff0c00610018003200040023000b0017001d00270057ff
10001800eeffd2ffbeffb6ff2a00000074ff0f00ad00e6ff25001a00cfff3f00180001001e00b1ff1b00e3ff2c0020002700f1ff2c00fbff330088ff0f000d00
d8fff1fffbff56fff6ff11000100be00d4ffc9ff22001900b2ff220009001a0093ffe1ff86ffe0ff5bffebff260025000d009dff1a000c0039000f00c2ffffff
110025001d001a00d3ff2100d8fff1ff520005002800e6ff1e001900db00faff00000600ffffd5ff03001a00e4ffdbffdaff2700f7ff2200ebfff0ff0300e0ff
1000f0ffdbffefff010080fff7fff3fff0ff3a001c00210015002e00e9ff220019000b00e1ff0d00f7ff1300ccff050002000f001500fcffe6ff8d0084fff6ff
9fff27001e00edff4400da008eff0c001e00f0ff4600deff20000300ebff2a00f1ff0c002400d6ff0800f5ff1b0037000000d1ff470000001f0035004a000e00
ecff07001700e9ffdcffe3fffdff05000000fcff0900f5ff78ff0f00e7ff2f00eeff2200faffeaffdcff290091ff94ff0d001f00d3ff33000f000b00a2fff4ff
0c000a000c0015001000f7ff31000d001100f6ff2e00f4ff050013001b000f00f0ffb5ffbdff6affecff22000000010011001600380002002500f5ff22001a00
e3ff19000800c0ff0700f7ff020001001a00e0ff20006cff19002f003700220044002500c8ff1500f7fff9ff58000a002400170024000000290025000b005cff
18003200fdffd4ffbcffc5ff25000e007eff0b00b200ffff26000b00ecff5100170011001700acff1f0004003b0026002a00e7ff2800f4ff50009aff08003c00
befffbfff0ffb3ff000016001500cd00e7ff040031000f00bbff140012000e00b3ffeaff67ffd9ff4ffff4ff22001d000d0094ff1500060042001100b8fffcff
f4ff110027001100d7ff1d00ecffd4ff550006001500dcff1c001300d8001400e7ff0a00faffc2ff00001500cdfffdffecff1f00efff1d00f1fff0ff1600e8ff
fcfff6ffdaffd9ff0d008fff1600eafff1ff3a001e001e000c003400d7ff1e000d000a00b1ff140002001000bcff19000b0007000a000e00edff950035fffaff
b3ff17001300d1ff3200d100a7ff07001100ffff4700d8ff16000000f1ff2400f6fff4ff1500edff1f00e7ff20003100feffdfff4c00000029001d0041000d00
eeff07000500e6ffe5ffecff050008000a00fbff0f00f3ff7cff0500edff3700dbff1b00fdffcdffebff2f00a8ff82fff5ff1b00d1ff400009000a0095fff8ff
bcff06000500110021006fff270004000d00edff3100edff100045001e0008000200beffb9ff55ffcefffdff0400f8ff100022002e0000002400000018001a00
ecff16000600d8ff0900ffff010000001b000d0025001000000028003d002a003b002700c4ff1800deff1c004b0018001f0009001f001800240039000c005cff
18002100ebffdcffbbffd1ff27001d007dfffdffa00005002e000a000d004d001600feff1400a9ff1800feff380026003000f5ff2300f1ff540085ff07000200
defff4fffbffbafffdff22000800c800d7ff85ff17000700c8ff230009000300c6ffd9ff67ffdfff45ffdfff22001a000f00bcff150016003a000f00bdffefff
f6ff0f001d005e00dbff2700e7ffefff4e00f8ff1d00deff27001e00da000a00f9ff0200f2ffccff04001500f9fff8ffdcff2f00fdff2500f4fff2ff1500e0ff
0600f9ffb9ffe5ff08007bfffcfff0fff7ff3a003800210002002900eaff23001000ffffe8ff1400f8ff2100a5ff20000c00140011000600f0ff880025fffbff
acff14001600e2ff2d00e90093ff0d000b00eaff1d00f0ff20001100f5ff2700f8ff09001c00dfff1b00f3ff100035000700e2ff4600efff260027003f000500
edff09000100faffe9fffdfffcff0900040003001200f3ff86ff2700f1ff3300d9ff2500faffd9ffe4ff1a00bfff81ff0a001500d4ff470001001500aaffe5ff
f3ff0c00040014001600e1ff2a0009000000ecff27000800040005001e000a000100baffc4ff53fff5ff2c001a00f5ff15001500350006001900040025001800
e9ff15000500cbff070007000300fbff18006fff1a00d6ff0e0032003000290045002100a9ff1400dfff0c003f00130028001100330014001f003a00040062ff
1f002500f2ffcdffc6ffc3ff31001a007eff1700b7000a002c001600ecff44000c0024000f00afff1200f3ff320025002400e8ff14000000480091ff09000c00
defff1fff4ffccfffcff1f001700d100d1ff100014004b00ceff1d002100feffbeffedff73ffdfff4cffe9ff200015003600a8ff1d00120038000500bdfff0ff
ecff1f001d001200ddff2400e8ffebff5400faff1200c7ff1f003000da000b0018000700f3ffd3ff03001a00fdff0d00efff1e00faff1000f9ffefff0700e9ff
0000f4ffafff030009007aff1700f3fff3ff2a00410021000c002f00eaff27000f0001006fff1600f8ff0f00c7fffcff1600150005000a00feff85002ffffeff
a3ff1a002700d2ff2d00ee0092ff0b00180000000400f7ff0e00f3fff5ff1f00fbff06001800dbff2000e0ff15002d000600e0ff3f00ecff22001c003f000800
ebff120009000b00f1ff00000a00120002000400f3fff3ff84ff0000dfff3200d3ff1a00e9ffddfff7ff2a00b8ff86ff12001500daff2200faff2000a7fff8ff
eeff16000d0008001e00eaff3c000c000300e3ff1f00f9ff1a00feff200005000600bcffbbff65fffdff1a000b00faff01000c00360000002000e3ff27001a00
ebff12001200ceff0c00f2ff0000f8ff190013001f00e7fff2ff3b002f001e003a002000a0ff0a00e8ff14002a00060026000b0030002f0017002b0027005cff
18001d00f7ffd1ffc4ffb8ff2e001b008cff1100c400feff27000000efff360008001f001c00a2ff1e00e2ff380039002200f2ff2800edff450090ff17001400
d2ff0600eeffbcfffbff24000800d500d0fff2ff15001a00c7ff1c000d000200c7ffddffc7ffe1ff4bffeaff170022005200a3ff1a00140047000900bafff0ff
feff12001b002a00d7ff2c00dcfff8ff4c0010002a00cdff1b004b00df000200e8ff0000f9ffcdff0000130003000f0010002200f6ff0f00deffefff0d00e8ff
0b00e3ffaafff8ff07007cfff1fffeff040026002c00290003002900e2ff23000c000300d0ff0f00f4ff150069ff2b000c0009001e000000feff7d0088ffe5ff
9eff26003f00e8ff3900f1008dff10000900efffeeff02000e000800e1ff210004001d002700cdffffffdbff060029000d00d0ff4600f1ff1d00210044000100
e1fffcfffdff0f00f1ff0900f2ff17000900f6fffdffefff81fff6ffdfff2e00d5ff19001400e8ffefff0400a5ff78ff1f001600e6ff4100e1ff2100a7ffeaff
c8ff1d00f8ff07000e00e2ff480001000c00e2ff1c0009000000f8ff1a00e1fffaffbaffbaff64ff14002900f6ff030013001100490000000200e3ff14001300
f5fffcff0100caff1a00f7fff7fff4ff2400d2ff1b00e7fffeff45002c000e0042001a00bbff0500dcff2e002e0002002b0015002c0005001f001e00000072ff
120012000700aeffb5ffc6ff2e001b0088ff1300ba0004001d00fbff0c003600070038005600b1ff0800e4ff32002c002600f7ff0800e6ff4d008aff2100feff
b5ff1600f5ffe1fff6ff5c00feffd000cdff03000d001700c8ff16003e000c00cbffe4ffccffe1ff5dffdeffefff2200520092ff0300fdff39000700b3ffd6ff
0400040025001300deff3000efffe3ff4d00ffff2400cbff19001900d9000100e9ff07000700d3ffecff260005001c0045001400efff0a00f6ffebff1000fcff
fdffe6ff9dffd7ff0c0079ff0f000500000073ff1b001f000f002700e5fff9ff1000170099ff1f00dfff030060ff1300110019000700fcffedff830039ff0a00
a9ff31003700ddff1e00ee0090fffbff1100e9fff5ff06001800e7ffefff2f00ffff0b001100ccff1300ceff23002a001c00c7ff4a00fcff290017006e000000
f8fff6ffe2ff0d0001000400b9ff0f000500ffffcafffbff83fff0ffe3ff3400ecff2400f7ffebffe8ff0e00a9ff75ff23004f00ddff2c00e4ff200092ff2500
b5ff16001800f9ff1e00edff0d0007000600e0ff13000500e3ff01000500dfff050082ffa9ff61ffe1ff0500effff6ff010013006700fffff8ff08001f000f00
f6fff3fff6ffe2fff1ffe6fff5ff08001d00c1ff1600d1ff0400420025000b004f002200ccffefffd6ff22003d000d001d001200140004000f000e001b0060ff
0c001700eaffc6ffcdffc9ff220045008dff0c00af000c0011000000d1ff300008002b002000b6ff1c00e8ff320025003300f0ff1a00e4ff4a0092ff18002000
caff1f000000dffff1ff21000000cd00c3ffdeff10002d00c7ff1c000a000000aeffd6ffbeffefff63ffefff90ff1f004a00cdff220004002100eaffa8fff2ff
f9ff100014002300d0ff3000e0ff01003700edff2800caff1e001f00da000000daffe6ffbcffceffdcff1000eaff1b00ffff23000d000d00cefff3ff1600e7ff
f3fff3ffcbffd8ffdfff1a008bff2a001300e5ff1c00baff6b005cff05000a00aeffc6ffd4ffdcff3bffd1ffecff0400a9ffd0ffe4ff94ff5100edff08001e00
fefff9ff2300b0ffecffd3ffe8ff410023ff060048ff12002e00d9fffcffb4ff0400a2ffefff3a00dfff36000d002800cffff2ffedff33002a00c1ff54ff2a00
8eff3300f7ffafffc4ffbdffccff9fff0200e4ff0b0039001400470042001b00e2ff0b00c3ffc8fffbff7eff0d00e5ffc5ff0c009eff00000e00150026000d00
caffe0fff0ffb7ff04000a00d5ff3c000500e0ff120069fff5ffe0ffd7fffdffdaff0a001600fcff27000900b0ff1600f9ff1700e9ff6eff0600e8ff0f00ceff
faffc3ffccff1700040063ffacffcdffe3ffe8fff6ffd8ff12001f00efff23008fffceffe9ffd6ffd9fff9ff5eff1300290000003600d8ffd9ff18001e000200
e6ffafff17000900feffcaff0e00000015002d00040030ffefff4000c2ff20000600faff7cffb7ffc6ffeafff1fff0fff7ff010097ff030014001200b8fff6ff
2b0009000900dbffeeff14000400f2ff3900ddff270067ff90ff97ff0f001100e8ff1700140009002300a1fff1ffe8ff95ff05ffe9ffedffecffbeff0300b2ff
c7ffd5ffd9ff140015000e00c8ff2c00e4ff0d003900c4fff2ff2000e3ffc3ff0e00ffffe0ff1100efff5d00efff5700b4ff0600c5ffd9ff2100210023003200
f2ff2800c9ffc0ff1a00190015002500eeffbdff1b00fdff2900ffffc6ffcdfff4ffeaffe3ffa6ff1b00e4fff8ff0700deff63fffbff34000500f3ff21000400
0a000700f9ffa3ffc5ffeaffffff3600b6ff050053ff17002800c4ffe7ffb0fffeff5fffffff1200b0ff0600f6ff1400f6ffcdffceffe1ff0900fdff9fff0200
a8ff15000c00e0ff82ff1700ecff1d00fdffb1ff130000001300afff5d000400dbff0000d1ff0700fcfffdff0c00d0ffdfff1900b8ff0800e7ff3a000200c5ff
f7ff97ff0700d8ffddff0700dfff00001c00fcffb1ffd2ff130023002400dffff2ff1900c1ff000030003000f9ff0700beff33ff87ff200000001000f4ffdeff
0700dbff00001e0000000000e7ffe9ffe2ffdaffe0ffd5fff2ff280009002c006fffc1ff06000500eaff11005eff3f00d7ff92ff3500eefff2ff180010000100
d6ffe1ff0000d1ffedffb3fffdffdeff01002c00080038ff0d001700d8ff150011000600e7fffbfff9fffeffeeffbeffe2ff1c00c6ffe3fff3ff06003a002400
4200070018000700baff1400e0ff08002000e8fffaffc8ff8cffc8ff15002900f0fff0ff1400f3ff1200f5ffefffe0ff96ff9efffefff7fff2fff9ff1a000600
f6ffa6fff4ffdaff22001200b2ff0500dcff110064ffe1ff100000000e00dbff0e00e5ff0b0007000000e6ff09002100baffffff45ff01002300050036000f00
11001500b2ffc0ff26000f0017001c00f5ffddfff8ffdcff3300f6ffc5ffe7ffebffdfffdeffbdffc8ffe3fff7ff140083ffb1ff0200ccfffaff00001c00ffff
1600f8ff1f00a7fff5ffdfffefff2000dcff080044fffbff2000f7ff0000a9ffdcff92fff4ff0e00f1fffcff010012000e00cfffebff0a001d000b00c7ff1a00
bbff160015000700beff1c00d2ff2200b6fffcff2200fdff240004003a000100c7ff0000c3ff1a0009001a001800c5fff9ff0800e0ff130006003100feffeaff
eaffbcff1b00d9ff03000300050017001a001d00dcff86fff4ff18001300fcfff9ff0d00dbffffffe5ff1900060000000400f8ff7bff4b00faff17001a00e4ff
0100feffe4ff1600f8ff01000e000000f3ffdeffe9fff4fffbff14001a001100a9ffecff0000feffeeffffff87ff2400b1ffbaff3f000000f9ff1400f8ff0100
dcffd5fff9ff290002006cff0400f6fff7ff26000f0036ff06001300f4ff100018001700b5ff170006000d00ccffd0ffd5ff0f0088fff1fff9ff050018002200
21000a001200fbffc9ff2c00f3ff09002400d7ff0d0099ff76ffe8ff05000f00faff11002a000c002300edff0e0014008cffc0ff0e001500fdffd3ff08002d00
ecff71fff2ff200032000300f3ff1c00d5ff1b00dbff030000000f00f9ffdeff1400deff08000d00e0ffddffefff5200bbfff7ff9dffe9fffffffeff3800d8ff
e4ff1900e5ffffff25000b00fbff2500deffc2ff0400e9ffadfff6ffefffcefffbfff6ffdaffe8ff0900c6ff02001000d8ffc0ffdfff20001100feff2500fbff
10000f000700e2ff0a00e2ffebffeafff5ffecff5fffebff19000800d9ffcefffbfff0ffe5ffdcff0d000600adff1300160069ffefffd9ff20000100d9ff1f00
cefffbffe5ff1200f6ff97ffa5ff2c00dcff05001500fdff1f0079ff2e001000b1ff0000d6ff1b00fbff09001300d0ff72ff1600d5ff1000d2ff290007001c00
ceffdcff1b00f3ffc5ff0200e4ffc5ff1700030083fffefff6ff0200ffffc2ffccff040062ff00000b001f000e001700e5fff2ff51ff3e00eaff0e000600e8ff
1200ffffe3ff0b00fdff0e000000fcff0d00eeffd3ffdeff0c00000012002c000800ebfffafffffffffffdff5efffbff8dffc1ff3b00fdff00000c0020000000
d6ffd7fff6ff1200f0ff2eff1400f0fff9ff1f000e007cfffeff0900e7ff000003001800c9ff28001600dfffeaffd9ffcbff0400a5ff280000000a0015004000
120005000c000400ceff2400f7ff09001800fcffc8ffdaff88ffefff2c002300e0fffaff1f0003001300fbff1600e6ff4affdbfffffff8fff1ffd5ff1200feff
1d00e0ff0000fdff2d000500d1ff0a00e0fff7ff0f00dcffdfff1800f3ffd2ff220097ff01000b0000000900ceff1d00dbff1100d1ffc8ff0e00e2ff4400eaff
eefffeffe0ff2c0022000900170013000100b7ff1d00edff62ffecfff3fffffff1ffc0fffeffd4ffe6fff4fffcff10001000e5ffcbffcdff200000002700cfff
0e000c00fbffeeff0f00e5ffe2ffd0ffdbffe4ff4cfffbff1800fafff0ffe0ff0900adff0200c7fff6ffeeffadff18001000eefffaffabff1900e6ffe1ff1600
1d00e0ffe5ff91ffffffa4ff9dff3100f0fff9ff0d00efff1d00c8ff1b000300e1fffeffafff1800d5fffbff1000d7fff1ff0000ceff100007002c0000000000
ebffe6fff6ffe5fff2ff0300e5ffbbff2300fdff6effd6ffecff0b00f4ffecffd4ff0700e0fffeffa3ff19000e001100f1ffdcff80ff2c001c0010000900ecff
1200faffe7ff1500040002002400e0ff0a00f0ffe8ffdaff0c006aff1100feff1200d1ff060003000b00120058fffdff99ffc5ff47000a00e5ff2000f0ff0400
46ffd5fffcff2200ffff3cff0500dbffffff17001b00bdfff9ffe2fff8fff3ff0a000500bcff1300ffff2a00f2ff0b00daffe6ff9bff2200f3ff110011001100
070002000900d1ff90ff2d00150006001c00ecffd8ffcdffdbff46ff06000d00feff03000d0019001700f9ff2e000b008cff070008001c00f6ffdaff15000c00
1400e2ff000000002100090005001f00f2ffeaff2600c1ffeaff0d00eaff92ff230096fff4ff0000f8fff1ffd9ff0500e2fff5fffcffeeff0c00f2ff4200cfff
06000400ebff430037001000f1ff0d00f6ff99ff3f00f6ff7afff0ff0600cefff5ff2e0000000200d9ffb6ff020014002f00cafff6ff13002000050020001f00
0c000800e4ffc5ff0c00f2ffd3fff5ffe6ffe7ff95fff7ff1200caff0b0098ff1500feff1a00d1ff0b00b1ffc0ff0a000500d9ff0400edff1d000000e3ff0200
0a000800afffd5fff4ffd2ffddfffeffd7ffdafff9fff5ff1900daff0f00faffc4fff9ffc1ff1a00a0ffc7ff0b00dbfff8fffaffd5ff1800f1ff370004001300
f1ff0300e3ffbcff03000600e2fffbffd7ff1e0057ffb5ffdffffcfff3fff5ffd8ff0800edfff5ffd6ffceff060019000800e0ff62ff150017000a001500f0ff
e8ffdbff04000f00ffffdfffc2fffeff2500f7ffc9ffdeff0300fbfffeffdaff2400f5ff050007001100070077ffeafff4ffebff4400f8ffd8ff2300d0ff0700
d8ffdcff0f000400f8ff42ff12000100fcff220018000000fbfff4ffc6ffe7ff0b00f8ffbfff1000e8ff3100caff3000e7ffd7ff1a002100ecff0f00c8fff7ff
1100f1ff0d00c9ff64ff170005000c001500e8ffd8ffe7fff3ffcbff1500ffff00000800fcff040013001b002500e2ff9cff000002002700fcff92ff2c001300
1600f6ff0400caff1600e9ffdeff0700fdfff6ff2000f1ffe1ff0800efffbdff1d00c8ffe4ffeaff1800f1ffd6ff1400dcff0600f9ffb0ff1600ffff450058ff
feff0700e1ff3a0064001700140006001700c4ff4100f8ffb4ffccff0f00e5ffd4ff0700e8ffeffffdffdffffeff0100340048fff1ff18003600f9ff20000700
10000300a3fff0ffeffff9ffe2ffdcff1100e0ffddfffaff2300d1ff0a00a5ff0800060024003effe8ff11009bff17000000b8ffeaffd5fffaff0600e5ff1800
24000d00dcffbfffe8ffdeffd7ff24000000f1ffc2ffdbff2300e9ff24000300cbff0100beff1200beff89fffaffd6ff81ff1000a6ff0700c4ff350000001400
e7ff1800beffe9fff1ff0e00cbfff2ff02000d008bffd0ffc0ff0600f3ff0d00daff06003300ecfffffe76ffeeff1300effff4ff58fff8ff000018000800f6ff
2b00f5fffeff07001e00030084fffbfff5fff3ffb6ffcbff88ff98ffeaffb4ff1d00ebff0500fefff1ff1b0095fff1ff2500f0ff2a000f00d0ff2200deff0900
cbffadff0900e8ff18002bff05003800020010001000b0fff2fffaff1800cffff6fff2ffcbffeeffe2ff4d00e3ff1300dcff0800eaffacff42ff1b0013ffc9ff
02001e00150090ff3700e3ff120011002000e4ffccff3900feffdbfff4fffdfff8ff02000c000d002400cdff16000400a1ffffff09001300000077ff2a001400
1600f5ffe1ff00000f00e4ffe7ffd9ff0f00250041001400f0ffd3ffedffc9ff1400feff0700f3ff0100deffd9ffe6ffa4ff1800bdffdefffbff130065001300
bffff2fff1ff1c000b001e001700eaff19002900360016ff52ff86ff03000d000d002200d6ffebffafffceffe1ff09002c00f1ff040024003000fefffeffc9ff
0f00a6ff11ff0d00b6fff3fff4ff2800fbffe1ffdefff6ff3f000700c8ff8bff0400fcff5a00d2ff3f002600a1ff070002000c00d2ff9fff32000d00ccff1300
0a00cbff010007008eff3b00e4ff4b001500e1ffdeffc5ff33002bff0100f3fff3ff0400e9ff1c0097fff9ff1100daff000010009dff0600e5ff12000800f0ff
e0fffaff2700b7ffc7ff0a001800f4ff290001006dfffcffecffd9ff0b001e00bfff0b002c00edff0c0080ff0000eaff1500050056ff20001a00f0ff0100f3ff
f6ff0c001b00f6ff2b00c9ff34ffecffe2ffe2ffa2ffd5ff3d00cfffcaff5f002300e7ff17000b0032002d0089fff2fffbff00000f002600f2ff1d00e7ff0d00
d3fffbff1100f3ff1000adffdfffecff020020000e00e7ffbbffedff5dffcaff0700f5ffe5ff2f00c9ff1500f5ffe4ffefff3500210009007cff1d00ffffceff
4bff09001300fcfef7ff01003500f5ff2500e8ffd0ff3200f1ffc0ffd4fff4ff07001f00f1ff170026000b00fffff5ffa4fff3ffcdff38000900a7ff08007100
1100d3ff0400dbff0600dbffe7ffe8ff08001d0013003500fdffe9ffe3ffbdff1c0009000e00f2ffe4ffc2ffe1ff5f0075ff0200dfff090011000f00470037ff
e0ffe7ffebffceff0e001f00f0ff21000d00c2ff34000e005400f4fffafff3ffe7fff4ffdfff99ff4800e9ff0f001b00bfff12fff6ff00001700fcff21002c00
150012004c0085ffecfff6fff0ff3400c9ffe3ff69ff08003600b0fff4ff9cff2f0075fff5ff1b00a7ff1900ffff1900e2ff0100a2ffe0ff0d00e2ffceff2f00
d6ff3e0027008fffa6ff0a00d2ff1100cbfff1ff0e00f7fff9ff0e005d000200b0ffe1ffdbff1100060004001900f4fff0ff1800e4ff1400e6ff1800f9ff0900
deff91ff0b00d7ffd8ff0d00e4ff39001700e2fffaffd4ff140011001300bcffedfff6ffd9fffbff17004a00ecfffeff98ff1d0042ff0c000300ecfff7ff0100
0900e7ffeaff3000f8ff070004000200e5ffe9fff1ff02000d001500f7ff4400afffdbff16000700d2fff0ff53ff1a00fdffa7ff3500f4ffe1ff1d002e000900
fcffc9fffdff0a001200b9ff0600eeff01003f000d0004ff03003100f3ff21001e0018001000effff2ffdbffe5ff39ffe1ff0e00cdff0000feffffff19003f00
2c000e000600edffebff1d000200feff2200e7fffcff89ff88fff3fffaff4600e9ff11002c0005002000dcffdeffb8ff5effa8ffffff17000000feff0d000100
fcffddff09000f0021001800e1ff0b00dfff140097ffbeff030011000600b2fff2ffe2ff06000c00eeff1f00c3ff4400affff8ffecfff3ff2300c7ff3000c8ff
06001f00caffbcff1e001400420022000700b6ff180004003d00e5ffc7ffecff0400f5ffdfffcaff0e00e8ff03001400ebffceffe9ffd2ffddff05001d002300
160013003700c1ffe7fff3fff7ff2f00d0ffffff7cff19002e00eefff1ffd1fffbffe3fffaff19009afff4ff03001e00e7ffa9ffe0ff6bff1900faffdcff1000
b4ff29000c00b2ffaafff5ff15001100d7fffcff170018000300a7ff6900fbff99ffe8ffd3ffccff21001600ecffb9ffedff1500daff0800e9ff2800fcfff4ff
fbffa1ff1700ceffe1fff9ffd4ff05000e00f1ffd0ffc2ff030026002b00dcffe7ff1000d6ff0f002d005800f2fffcffe4ff020083ff4300fdff1a001200f8ff
0600fafff4ff1f00f8ff0c0004000f00effff1ffd5ffeaffecff200010001600eeffe7ff16000a00f9ff090046ff310085ffeeff5800fcfff8ff09001c000100
e4fff3ff17002300f6ffc7ff0b00dbfff7ff3100ffff57ff0500f8ff010024002f001600e1ff04001600e6ffdeffcaffdfff3600a1ffe3ff0900f8ff30002700
3e00190014000000e0ff060009000b001a00f1ffeeffb0ff7affeaff0f001d00efff2c002f00f8ff1600ddfff4ff030067ffbfff00000700000003001200f8ff
0200e6fff8ff07002b001800e0ff0600d5ff1d00dbff0900020022000a00e1ff0700d8ff1d001500e8ffc9ffecff2d00e2ff0f00abffeefffaff09003200ceff
0f00f9ffdfffc4ff2800080011001f00faffc4ff0e00ebff2900e5ffc5ffe9fff6ffe6ffe2ffbcff0500e5ff01001d00b3ffcdffe4ffd4ffeeff0b001c001500
13000f00110084fffaffe7ffefff0000f6fffaffa3ff0b002100f0ffe9ffc3ffedffe8fffaffe0ffffffecff0b0013000200b3fff6ffb8ff23000900daff2300
c0ff0d001600ebffc2ffe5ffffff2700e6ff08001f00f8ff0b00a5ff4900fcffb1ffe3ffcbff0c00160004000600ceffe6ff1600dcff1700f9ff1c00fffffeff
ebffc3ff1400c2ffd3fff7fff5ff00001300e5ffabffacfff6ff16002b00c3ffd5ff1700d3ff060004002f000400f6ffe1ffe4ff87ff4100070017001200f3ff
fcff0400e2ff1c000100310013001e00e7ffeaffcefffbfffcff100012000800f9fff3ff10000500fcfffcff60ff2b0053ffd7ff4b00fafff9fffaff0c000000
e9ffeeff0f0010000000b3ff0f00dbffeeff27000c004aff08001c00e6ff1d002e002a00d2ff18001100f3ffdeffe1ffd3ffe3ffbeff7dfffdff000027004400
1a0018001200ffffcdff1500feff0b000d00eaffdbffc6ff80ffe5ff20002500e7fff2ff270003001500d4ff0000080097ffdcff04000400faffe7ff05001100
0500e2ff0700feff2b001500fbff0500d7ff0e00ebfff1ffedff2600ffffc8ff0d00e7fffcff1200f8ffecfff5ff1d00b8ff000088ffe9fffbffb2ff3700d7ff
0f000200c4ffe1ff1d0005002e002000f4ffacff18000100c2fff7ffd7fff1ffe9ffe9ffe3ffd4ff0d00e4ff00001d00e9ffe6ffd5ffeaff0d0013001e000900
100013000300b5fff9ffeeffddff0f00edffefff28ff1400ffff0400dbffdeffe0ffebfffeffe0fff5ffe5ffc6ff1800120083ff0b00e1ff22001500e8ff1900
d7ff13000500ebfffbff8fffdcff1a00d8ff2a001f00e4ff0f00c1ff1f00040092ffedff9eff1200fdfffcff0300d4ffffff0d00d6ff23000d002b00faff0600
f4ffe7ff1200e9ffebfffeff06000b002700e7ffb7ffbbfff6ff02000a00b8fff1ff0c0079ff07000d00240016000100d7fff5ff91ff3d00090010001500fbff
e7ff0700030010000b001c000f001d00f7ffe2ffe0ffeeff2a00080014001d001100f9ff1000fffff8ff03005dff050069ffc3ff4e000000edff140005000a00
f8ffddfff1ff12000300ccfffeffdcfff0ff20001700a5fffdff1600f6ff0e0024003300bdff210016001000f7ff0e00d9ff0f00d9ff0000faff06001e001c00
22000d000900f0ffcbff1900fdff0d000a00f7ffddff6aff6effdaff2f001700fbff0d00210017001700f3ff1000170034fff4fffffff5fff6ffeaff0a000c00
1600c8ff0000130029001100f8fff4ffe8ff06001a00e4fff7ff1000fcffc3ff1700e0ffebff030001000400daff1500bffffeffdaffd9fff7ff06003e00e5ff
e2ff0500afff29002c000b00efff2000faff7aff0b00fbff74ffdfffe7ffeffff5fffafff1fffdffe9fff3fffdff1d00d6ffd4ffd9fff9ff20000b002300e3ff
0e001900f7ffd1ff0000f6ffdfffe3fff4ffdfff8eff0c001700f2ffe4ff02000600ddff0500bdffedffc0ffc2ff1c000b00b9ff0e00caff2b000c00e0ff0800
fcffe8ffffffccffe8ffa4ff8bff2600f0ff00001500e3ff1200f6ff16000400c1fff0fff2ff1900c4fff1ff0d00cfff0e001800d0ff2600deff2700f9ff0200
f2fffdfffeffd9ffecff0600feffeeff1d00e5ffa3ffaafff7ff0e00f5ffd8ffd4ff0d001000ffff9cff0e0026000700deffe5ff3cff20000e000a001300f9ff
040000000000120016001f00000012000700080098fffcff1e00eaff13001a002000ebff1600000004000d004dfffdff49ffaeff3d000a00ffff1900e0ff0500
faffd7fff8ff1200feffbbff1000c0fff8ff26001e00b4ff0100f7ff1000f6ff04001e00c8ff0c00faff3900f5ff1e00e0ff9bffe8ff1a00f1ff0a00d9ff1600
18000d000000fdff95ff2600f5ff12001a00deffe9ffcaffccffb3ff0e001300fbff0200180014000f00ffff1b004cff42fff5ff0e00fdfffeffd2ff1c000100
1a00f8ff0500000021000000e8ff0200f3fff7ff0f00e6ffebff0900f7ffd9ff2200e1fffbfff9ff1000f9ffe7ff0700dcff0500dafff8fff6fffaff4100d7ff
fcff0c00d0ff320026000a0003000800fdfff3fe0e00f6ff8efffdff1a00efffeeff2a0007000500e8fff2ff090018001f00dcfff8fffaff380007002300fbff
0f000a00d1ffd4fffafffaffcfffe5ffdbfffeff1effeafffaffe9ff2c00d3fff8ff07001d00dfff0f00b9ffd6ff18000600bcff0e00e6ff2100feffe8ff0c00
0d00ebffcaffcffff1ffb9ffb2ff0f00f9ffdbff2000fcff1200dfff0a000900f4fff3ffc7ff2000c1fffbfffeffd3ff02001000d0ff1e00e4ff250001002800
ecff1c00daffdbffeaff0600f4ffdeff0100fcff16ffc9fff6ff0d00e8ffa9ff00000a001200ffffd2ffb2ff03001800fefffaff2bff00000f0018001c000000
0700fdff00000c001700ceff98fff8ff0d00ecffc0ffe4ff0500dcff00000200270010001b000500fcff0d00f2ffebffcaff150016000e00f9ff2500dcff0b00
fcffceff090011000200cbfffbffb6fffbff27001700bafffeffefff1100e3ff0e000f00b8ffd7ff0c005700edff0c00e2fff8fff7ff1a00c5ff1400d9ffedff
0c00f8ff1000daff67ff1b000b001a002900e8ffe4ff97ffe9ff94ff0c00f9fffbfff8ff080019001400080020009aff44fff3ff070010001100b0ff1e001300
3000d5fff0ffe2ff1400e5ffd0ff03000200e5ff49000900eeffeffffdffdaff1f00f0ff0100f2ff0c00faffcafffcffd3ff3200e3ffecff0700e8ff5700dfff
1c001000d1ff25005e001000f3ff17000400ceff1c000100ddffffff0f00feffeaff2900f8ff02000e00c4ff0f00150022000f00d8ff0f00440006001e000000
16000a00c8ffcdff17000500d8ffceffe4ff1700e2ffffff2200dfff0d00a8ff1d000f001a00dcfffdffc7ff42ff1700f5ffebff0600ecff1a000b00ebff0300
1e00f7ffaaffe1fff9ffa1ffc6ff2a003400f0ffe4ffe6ff0c00ceff0b000900e2fffaffebff09009dfffaff0900ceffd9ff0900ddff1300e7ff2b00faff0300
e8ff1f001400daffedff0400d9fff2ffffffecff9dffd2fff5fffeffe9ff0f000b0012003100f5ff6fff87ffe1ff2200f1ff020044fff3ff140018001600f8ff
08000700020020001d00e3ff67fffeffe2fff4ff83ffe7ff0000dffff0ff1b003700e1ff18000b00f3ff1700f3ffe7ff21000300180057ffebff3400e6ff0300
e4ffd5fff8ff10000b00d0fff7ff0c00020023000f00bffff5ff00003200caff140001008cff0f00e2ff4200ebffffffe5ff0600dcffeaff2aff1900c9ffebff
c2ff02001000b3ffefff05000d000e001e00efffdcff0e00f5ffc5ff160003000500eeff020004001400f4ff06002dff46fffdff05004e001500bdff1d000000
2a00f8ff0800fbff1a00f8ffe8fff1ff1200190047001300f3fffbfff5ffeaff1700adff0400eaff0100fdffe2ff0900f1ff1f00e1ffeaff0900deff6500eaff
0a00ffffcfff130019001900180000000700050000000200d5ff81ff1d00ebfff0ff0a0000001a00d3ffc0fff5ff19003500d2fffbff1f00350003000a00f3ff
15000100fcff1500feff0600d0fff4ffe0ff0100b6ffddff2100e1ffdeff8eff1200f1ff2900d2fffbff8fffe7ff1000fbfffaffdeffc2ff12001a00eaff0500
1200f5ffe6ffe6fffaff0a00ecff2e001b00d9ff1e00dcff2100a7ff0d000d000c000000c0ff1900e3fff9fffeffe3ff89ffeaffeaff1600fbff220007000200
f8ff00001c00d7ffc0ff12000e00f3ff10001c007ffffcffe8fff2ff0000fbfffdff10002100e9ffdbff57fff9ff06000600170093fff3ff3800fafffdfffdff
13004b00fdff19001a00b9ff87ff08000f00f2ffc6ffddff0100d7ffe4ff34002600f2ff290000000a001500e5fffaff1600070019003400edff1e00c9ff1200
edffddffe8ff01000e00cffff5ff0d000a0036001b00e6fff8fff8ffc5ff99ff2500e2ffcbff0000dcff1900ecfff2fff5fffcff0200c4ff61ff2000f4ffbcff
befffbff0600dfffe0ff0300f4ff04001700eaffe4fffeff0a00f3ff0a00fcff1400f9ff060017002200f4fff9ff35ff8dffe8ffe7ff23001700c8ff0b006b00
3000b1ff110004002000d9ffcbffe3ff0f0035005f002d00feffe3fff4ffc6ff1f00cfff0b00f5ff02000300bcff2f0001001300eaff16000900c3ff6300bfff
0700e9ffc6fff7ff1300130034000d000400c1ff33000a004000dcff0600feffecffcbfffaffc2ff2000c9ff13002100d1ff0e00f7ffe4ffe8ff12002c002000
180013002f00d7fff6fff1ff02000a00efffeaff95ff05000d00fafff0ffdbff1d00b8ff01004500fefff2ff1f001000f6ffb6fffaffd7ff1000e0ffebffecff
eeff39000f00a0ffbfffe9ffebff1d00beffe3ff28000400edff03004f000600b4ffe8ffc1fffaff2b001b00feff0100fdff1a00f1ff1900f5ff1500faff1900
fbffa1ff1f0094fff7ff0700e6fff4ff03001000e4ff0e00f6ff1c001000f3ffe9fff2ffdaff1100feff4a00ecfff5ffafff110080ff1f001c00f3fff6fffdff
f7fffcffe1ff2800e8ff10000a001900e6fff0ffd2fffaffe2ff0800f6ff0000bfffe5ff160011000a00080057ff1f001400c1ff4700f5ffecfff4ff1a000900
f4ffd3ffefff17000800f2ff1100e7ffffff34000b008aff0b001000e9ff2600090000000500e1ff0500e5ffe6ffc7ffe9ff2a0055ffdfff0900e6ff2c002e00
2f0006000500edffefff0a00c5ff09001500f4ffe7ffb7ff55ffbaff12002300e6ff1d0021000d001700e1ff0c0047ff67ffcbff0b000b00fdff170017000700
f5fff1ff0200d8ff17002a00d6ff1700e3ff1a00d9ffe2fffdff08000200e3ffc2ffd8ff0b0010000300e0ffe8ff2600b7fff9ff0400f0ff1b00efff1700baff
0c00fbffb9ffcdff15000c002c0012000600afff3600ffff3e00d9ffe9fffeffdfffdfffddffceff1200eaff11001b00e2fff6fff2fffefff1ff0b0024001900
11000f002e00a0ffecfff8ffe8ff1800f6ff010097ff1b003000e4fff0ffdfff1700f5ff030039001100f1ff34001400120081ff0500c9ff1c00f8ffebff1f00
1e001b002700b7ffb8ffdefff7ff2400dcff0b0023000200ebffa1ff6100f9ffb2ffe1ffc7ffadff220003000200ecfffbff2400eeff1b000c00090003001500
feffc0ff2500daffd7fffefff1ff15000a00ebffbfffeafffeff24002600ecffd3ff0e00eeff0b0011004000efff0800f2ff060038ff1e0004001f002500f1ff
0d000400e9ff2700faff12000f001700d2ffe6ffdcfff2fff9ff27000e000600effffeff19000800eeffffff47ff1a00cdffd7ff5e000700f5ff0200f6ff0500
edffccff10001a00f9ffd5ff2200dffff5ff1f00070075ff0300caffe8ff2d002c0024003000dbffffffe8ffe3ffd7ffdcff2700a7ffd8ff0000e3ff13004600
330014001100fefff3ff0000fbff12001900e8ffe5ff89ff7fffdcff2b002200daff10002700ffff0e00f1ff09004bff97ffe0ff08001500020000001c00feff
e9ffecff0800ebff18000e00f0ff0700d3ff0600b5fffaffeeff1b000f00dcffdfffebff0b0010000000d1ff07002b00abff020085fffffff8ffe9ff1e00f9ff
0d00fbffd2ffdcff1e00020034000a00f6ffc3ff1800e2ff2300faffe5ff0000dcffe1ffe8ffd4ff0f00d9ff05001f00dcffffffdeffe8ff03000e0019001000
0a0014001400c6ffe6fff0ffe1ffdafffeffd7ffacff19000a00ecffeeffe8fffeffe0ffffff11000b0003001d001800fdffe6ff0100cbff19000200f3ff1100
070007003c000600e7ffe9ff27000600d2ff30002400dcffe5ffc4ff5500eeffccffc7ffb8fff3ff1f000000f3ffeeffffff1500f2ff250002000b00f7ff1f00
e3ffd4ff0800d5ffe8fffcfffcff0d001b00dbffccffceff05000c003900b1ffe4ff0700e7ff1200ffff3100feff0200d8fff8ff3aff17000e001f001f00f6ff
e6ff0b00ebff0000f1ff3d000c001e00e0ffe4ffdcff0000080027001700150001000a00140009000a00faff79ff160017ffccff51000400f0fff4ff00000700
eafff6ff15000000feffcaff1900e4ffefff18000f006bff02001000f7ff28001b003500d6ffeeff2a00dcffe8ffe5ffe0ff0d0092ffd3ff0100eaff08002100
260010000c00f3ffe3ff0200050017001300ebffd6ffd1ff75ffc7ff32002000deff2100190000001100f7ffffffb5ff5dffdbff0500f2fff5fff3ff06000700
f6ffedff0f0000001e001400defffdffdaff1100f0ff0600f8ff11000700d6ff0900eefffdff18000c00e7ff03001a0088ff0400efffe4ff0000f4ff2600a1ff
f2ffe4ffb7ffd7ff22000000fcff0c00f2ffcfff1700e9ffd3fff4ffdbff0500e1ffefffdbffd9ff0a00f5ff03002300daffe4ffe7fffcff03000a002000f2ff
02001000f9ffe2fffefff5ffe8fff1ffecffe5ffabff16001a00fbffedfff3fffbffe4fff2fff5ff1500f6ffd2ff190009007fff0a00c9ff2500f6fff5ff1400
deffffff2600edfff4ffa6fff8ff1800cbff00002200ecfffbff02001400faffceffd8ffd5ff1600120005000700fcfff9ff0f00e7ff29001c001200ffff1c00
f3ffefff0e00e5ffe3ff0500fcff00001500d0ffcaffadfff8ff67ff1800c2ffdfff0a00f9ff0600f0ff160010000600d9fffcff79ff2600120007001800fcff
04000700f5ff0f000700460005000f00f7ffe4ffdcfff1ff23001600150031001400faff150004000100f5ffa0fffaff5fffccff53000a00f4ff070017000900
f3ffeafffffffefffbffd3ff0d00e9fff5ff100019009dff02001400010014000e003400bbffe3ff1500f7fff7ff0a00daff0f0068ff1800fffffcff1e002c00
250009000100ecffe6ff0a00020012001200f4ffebffd1ff70ffe7ff14000700ecff2700140014000d00f5fff5ff2aff74fff5ff0000f5fff9ffe1ff0b000500
0800feff150012001e000e00e6ff1b00e7ff0200f4ffe9fffeff19000200b9ff1700e4fffcff0f000800ffff04000300a4ff1500b2ffe7ff0f00dfff3100d1ff
c2ff1200b5ff1d002100fbff03000c00eeffb8fff9ffe4ffa9fff6fff1ff0800f0ff1c00e9ff0b00fdff0400fbff2400e6fffbfff3fff6ff1f000a002100f0ff
00000c00ddffd9ff0000f9ffc6ffddfff1ffe3ffb6ff0e00f3ffebfff9ffeaffedffedfff8ffdaff0f00ceffd4ff13000500bfff1600c8ff25000200f2ff0600
fbfff1fff7ffd8ff0e009fffe3ff1f00faff1f002600f3ff07000000f6fff3ffdeffe1ffe0ff2800f8ff1000fefffcfffeff0e00e2ff2d000a001700f8ff1c00
f2ff0a000300d6ffd9ff0d00070000001b00dfffb9ff9cfffaff08000c00c2ff07000b00f5ff01009dff1900ebff1c00fefff6ff66ff0f001c000a000f00faff
e5ff110001000c0010002d00feff0d000700fdff0300dcff2500f8ff17001800220007001900080007000700f3ffe4ffcfffe6ff3a000e00f9ff150006000e00
feffe5fffbff0c000100ddfff6ffeafff7ff18001f00bbfffeffffff0700f8ff0400360098fff9ff1f002d00faff0c00e0ffe7ffd6ff3000f8ff0300e1ff0400
190002000000f0ffd8ff2e00fdff11000d00ecffe6ff7cffdfffa4ff0300060000001500140023000d00e9ff02002dff4cffefff0b0004000300d1ff0f000e00
1000e9ffffff0b001d000f00eeff0f00f4ffe8ff3300dcff0600ffff0900bcff1b00f8fff9fffbff0c000500fafff9ffc5ff1600dfffebff18000a004400ddff
f6ff2100b8ff190022000300dbff0a00e6ff8fffe5ff0800a6ff0a000b00fefffaff3000faff0900fffff7fffcff2200f0ffbfff0000feff340009002700f1ff
04000700cdff02000400fdffccffeaffe3ff09008cff0d000a00feffd6ffdaff0000edff0800d4ff1800cbffc9ff1400f7ffbaff1100dfff1e001600f2ff0700
f1ff0b00d8ffecfffbffc3ffcdff2b001100f4ff1300f7ff0c00f2ff0000fbfff7ffe0ffefff0b00dbff03000700f9ffd1ff0000e3ff2b00ebff1d00fbff0800
f4ff15000700d7ffcbff0b00f8fff8ff0d00f2ff6effbbffeeff1400edffceff22000e002000f6ffe0ffd2ff02001400fbffeeff2cff04000e0012002300f9ff
f9ff270015000d0019000300a7fff8fffbfff3ffc2ffe6ff1400d4ff0c000600270026001d001200160007000000eeffe9ffdbff18001100ebff3300baff0900
f6ffe0ff01000800f9ffe1fff7ff1300fcff1a001d00aafffefff3ff1800deff05001d0088ffeaffeeff5600f1ff0000d4ffe0fff2ff2100daff0b00defff0ff
faffecff0400c5ff82ff2100000013000c00dcffe3ffb2fffcffcbff0700ffff04000a00120010000500e9fffcff5aff57fff4ff0f00d1ff1400b5ff0b001f00
2c00e5ff0000f8ff1a00f7ffe0ff1a00050000003700e6ffe1ff01000000bfff1a00edffeaff0000080000000300f6ffe4ff2900e6fff3ff1f00eeff6c00f4ff
fbff1600e2ff1c003e000e00faff1300feffa4fff3ff1200beff010014000200efff3300f1ff3f001300edff09001d001f00cbfffcffd3ff320006002700f6ff
0f0005000000080014000a00bfffefffe0ffefffa2fffbffe5fff8ff210084ff0700f0ff1100fbff2d00e4ffb9ff1900e9ffd6ff1100e3ff15000e00f1fffcff
23000b00cbffcaffedffcfffe0ff21002e00d1ff1300f8ff0200e7ff0900f9ff1b00f3ff04000700e5ff0d00edfff9ffabffe9ffdfff1f00e6ff2600f5fffeff
00001700fbfffaffc3ff0e000c00fcff2100040055ffc3fff8ff1100f4ffe8ff22000a002600f1ffa9ffaffff9ff11000500feff39fffbff0500170022000100
eaff2a0019002b001700ceffa4ff0600f9ffe2ffbeffe3ff0300ceffecfff3ff2900480020001d000e000c000300f3ff2000f2ff06001c00f2ff4500adff0b00
f7ffeafffafff8ff0300cefffbff250002001c001400d0ff0300faff3200a5ff1200030088ff0100eaff6700e7fff3ffe2ff0600efffe0ff55ff1200b4ffafff
c6ffecff0800d6ffe1ff100009000f001100e5ffd5ffe6ff0c00dbff0f00060010000800090024000c00deff080048ff53fff6ff0c000c000d00b5ffffff1f00
1000d5ff0a00fdff1800f0ffd7ff05001500040051000f00e6fff5ff0b00c1ff1900effff0ff000006000e00eaff0b00efff1e00e8fff1ff1c00daff6b000000
1600cdffb9ff240011001a000d000f00fbffdbffe9fff6ffddfff3ff04000100f9ff290001002700caffe2ff040023003a0000000800f6ff41000d002400f7ff
130000000d00070017000b00eaff0000d9fff7ffcffff8ff2f00fefff4ffa5ff09001bff2700e2ff1b00ceffe1ff1c00eaffccfff2ff56ff0e000c00dafff4ff
ffff0a00d8fff8fff0ffbdffe7ff0700300005000000f1ff1300b8ff1e0007001800f3fffbffe2ffd9ffebff0900080081ff5efff5ff1d00d9ff26000500f6ff
f2ff01000800eaffd9ff0c001500dbff0f00150077ffb8ffe0ff0d00fbff060005000b000700e2ffe0ffacffdbff090015000c0090fff0ff210005001a00fdff
06000d00040009001600f2ff60ff18000500fbff0000f6ff1200d8ffe2fff5ff2f00000022001400100002000400f3ff25001b0007002f00dcff3a00bdff0d00
f4ffeeffe7ff08000100faff0b00d1ff08002a001200cafffefff9ff1a00bdff0e0012006eff0400eeff6f00eafff2fff2fffdff83ffbbff37ff1700f1ffe8ff
4bffc6ff0000cdffc1ff16003b000c00f9fff8ffbefff4ff1600beff0900f5ff18002c000e00160011002300000044ff94fff2ffdbff2400130091ff08006200
3200e9ff0b00f6ff1400f2ffc0ff0100180012004f001200f0fffafff5ffe9ff1200ddfff6fffaff1500f9fff2ff080007002100f3fff4ff1100eaff2b00f2ff
0b00fdffc8fff9ff140007001f000000f7ffd8ff3e0021001d00fbff09001700e2ffe9ffedffc9ff2200d7ff0e000d00c8ff1600f3ffecfffeff0e001d000900
100015001600aefff4fff3fffaffefff0400c3ff4dff1b002e00f6fff9fff1ff1000edfff7ff3b00f1ff1a0010000b001500e3ff0100f0ff1400e2ffeaff0a00
11001900f7ffbfffd3ffd2ff1800e7ffd6fff5ff16000200e2ffdeff34000b00e9ffdaffd3ff05002800090009001a00f0ff0c00faff0e000700060007002500
fcffdaff1900e0ffd7ff0f00e0ff15000b00fdffe7ff26000a001e0005001200e5ffd3ff0300170007002500feff060073ff0e008afffefffdfff3ff12000b00
f7ffeefff4ff21005bff1a0002001500d5ff0a00e5fffbffeeff1700f4ffe4ffe7ff080010000000070004003eff10000100c1ff52000b00dafff1ffe9ff0600
effff6ff070018000100ffff0600e4ff080017000700e6fefbff1a00f9ff2e0031001400e6ffe4fffdffebfffdffd2fff4ff000033ffecff0500c9ff29002500
20000e000200f2fffffffdffedff16001300f8ffdeff68ffbcfff9ff11005600ceff28002500f6ff0a00eaff10004affebffdaff03000000f3fffcff2400f2ff
e6fff3fffbffc8ff0b002600edff0300e4ff0a00cdffe9fff8ff1d000100ecffd7ffeaff130009000b00f8ff0c003100c3ff0300edfffeff0300f1ffe7ffb6ff
0800eaffc8ffd7ff130002003d00f2fff5ffb8ff2f00e7ff2400f7ff00000b00caffd9ff0000d2ff1d00e6ff07000f00dcfffdfff8ff0000f3ff0c0018000600
0c000e000d00cbfffefff9ffe9ffedff0800e5ff4eff16000a000500f2fff3ff1100e5fff6ff2c000700fbff210012000800f8fffcffcaff1000fafff3ff2100
2f0005002b00cdffe7ffc6ff09000100c9ff08002900f9ffd9ffdaff5600f3ffe7ffc6ffdaffd4ff2f00fcffedff1000ecff0b00f8ff16001400e2ff00002b00
0900d8ff0c00d4fffbff0800f5ff0f000d00d8fff4ff10000e0014000a00ddffe5fff4fffbff1600f0ff2400fdff1400afff09002eff0d000b0008001b00feff
04000100eeff1c00eaff15000a001a00efffeeffe8fff8ff030025000c000000efff0a00090003000200000042ff1700d1ffc1ff4b000800ebffebfffcff0a00
ecfff2ffe9ff20000400fcff0d00ecff01001c00090082ff05000c00edff2b001e002b00e9ffceff0800f6ffebffdbffe5ff0a005fffeaff0100bcff10002900
270013000900f7ffecfff1fff3ff13000500f5ffcdff52ff7affecff1a002900ceff27001e00faff0c000c00050021ffcdffedff03000a00fafffaff1a000800
fdffedff0400daff0f001100eaff0f00dcff1c00ddffe9fffcff19000300e8ffe7ffeeff0e0003000600e8ff15001f00affff7ffcbff00000700f0fff1ffd2ff
f2ffeaffc3ffc4ff1500ffff0900f2ffdaffadff2400f3ff1700f3fff8ff0900dcffe8ffe6ffeaff1900e7ff10001400d6fffffff3fffbfffcff0a001200fbff
ffff0b000700dafff8fff5ffebfffeff0300deff9fff21002b000300f3ffffff0000fbfff4ff0c0001000d000c0011000200d7ffffffccff1200fafff8ff1e00
490005002300f0fff0ffdeff20000700d5ff11001e00d8ffe5ffd3ff3700f2ffcfffe1ffd9fffbff1600000008000f00f3ff0b0000001a001d00efff02002000
f5ffe9ff1300c8fff1ff0400eaff01000e00f0ffd1fff9ff1d00feff2e00dfffdfff050004001100efff1b00f6ff0700d5ff07002aff0d000c00080005000b00
fafffaffe5ff1200f7ff3c0002001400e9fff2ffe5ff040013001e00160031000100000000000500fffffdff8aff0f00b5ffcdff47000d00ebffeffffaff0600
efffebfff2ffffff0200f9ff0a00dfff00000c000b006efffeff1700f9ff270012002e002700dbff2500ebffe9ffeeffe4ffd4ffb9ff0200fdffe6ff01002300
24000f000600f3ffedfffafff6ff18000100f5ffe4ffd1ff7bfffcff22002d00e5ff250010001e0009000200fcff40ffe0fff3ff04000000fbfff6ff19000300
fdfff0ff0c00e8ff11001b00f1ff1200dbff0100e0ff1100fdff19000000dbff0200cefffbff13001100e4ff23001a00a9ff060083ffe9ff1200d8fff9ffd1ff
efff0900c7fff0ff1e0001002b00fdffe9ffaeff1100eaffddfff4ffeeff0a00e9fff4ffecffefff2600fcff08001a00e6ffffffecffb3ff03000b000c000c00
f0ff0900f8ffecfff4fff9ffe9ffe4ff0000eeffb7ff1900fdfffaff0300fbfff6fff1ffeeff0600f4fff4ffdcff0f00f5ffe9ff0a00c9ff1300f2ffffff0c00
0f0031002100f6fffbffcdfff7ff0400eeff17001d00f4fff1ff0c001600e0ffd3ffdaffd3ff000021000c0000001200ffff1800fdff1f001d00fbfffaff2200
f6fffaff1100d5ffefff0500f1fff8ff0e00d8ffdfffd4fffcffaaff1100bdffeeff0f0006001100dfff130013000f00f2ff140024ff1500180004000f000000
d4ff0300f9ff170002003c00feff1b00f1fff8ffe8fff2ff37000a001400020011000100080008001d00fbffd9ff0200d7ffdbff3b000f00f4ff0400edff0c00
f3ffebffe7ff0e00070001000000d9ff000006000e00acff03000e0009001400f8ff2a00c7ffd1ff0d000000f2ff0900e2ffe3ffa2ff1600fdfff8ff04002800
18000a000300f0fff4ff07000200130007000000d9ffdeffd2ffcfff0200ffffffff1b00060013000d000400f6ff36ffabffedff0000f6fffeffdaff10000200
0000fbff0100000010001100f0ff1400e7ff0a001100fbff06000b000200d4ff1200efff00000a00100009001600f2ffb3ff0c00f8ff02000800e3ff0200c7ff
d6ff1b00ccff0300fbff0000f8ff0300c4ffbbfffdfffaffc5fffefff5ff1000fbff0b00f6ffe1ff1700f8ff04001b00e5fff6fff2ff060004000b001400f2ff
e9ff0200e6ff00000300feffe3ffeafff9ff010092ff0a001300ffffefff010004000500ecfff5fff8fffffff2ff16000000caff0d00ecff1400e3fffafff9ff
0400f7fffbfff7fff3ffd3ffe4ff1700faff03001b00f6ff040014000200e7ffd9ffdcffe9ff04000b000400060017000b000d00ffff2000faff030001000800
f4ff05000e00cfffd9ff0e00f2ffefff0d00e9ffd7ffbcfff4fffafffeffbaff0c0010000b000300cbff06000a001800feff020043ff0d001300050017000400
f8ff08000f00060014003900f4ff3500f9ff0000f6fff3ff1500ebff160028001e0001000e00140023000100f2fffdffd3ffe6ff31001100f3ff0d0002000900
f3fff4ff0400f5ff030002000000eeff00000a001100bbff0000feff1000f9ffeaff1d00c2ff76ff09000900eeff1700e1ffebffe2ff2500f3ff0300e6fffcff
0e0000000500dcfff6ff1a00f9ff0e00f5fff5ffe2ff1200f6ffceff0c00fdff0400130011002b0007000200000012ff98fff9ff080005000800c5ff0b000b00
040006000700f1ff11001700edff0900fefff2ff0700f7ff080001000000b0ff1d00fbfff6ff09000c000d001300f3ffceff1000dfffe2ff1000efff1800c1ff
e3ff2400d5ff16001400fdff00000b00e6ffa5ffcffff4ffbaff0c000b001500f6ff240002000a0009000900f8ff1900ffff0a001500f3ff180006001800f4ff
00000700e4ff0b000a000700d6ffdcfff7ff1000a2ff0400dcff00000d00cbff0100f4ffe4fff5ff1500e8ff03001200f5fff1ff0400e4ff0b00efffeeffe4ff
05001300e4ffe4ffe1ffe7ffeaff1a001d00ebff1100fdff0c000400f1ffe5ff0600ddffebff000005001b00f8ff1600eeff1f00faff1e00f0ff0600feff1500
03000b001100f2ffe3ff10000100eaff06000800c5ffc7ffeeff0200f3ffb7ff34000b001c00f7ff9effefff0a00140014000b0036ff0a0022000f0010000400
fbff1900000016001400f5ffe9ff0700fdfff7ffdaffeaff0c00d8ff0d000b001800240018001a001f00030007000200defff4ff11001600f5ff1d00b7ff0b00
f0fff0ff0400000001000c000200030003000e001100e1ff0900eeff1200e6ffeaff0300b6ffe8fff2ff2800e8fff8ffe2ff0200efff0100cbff0a00dcffd0ff
f5fffaff0c00edffe9ff140002001100faffefffdeffd4ffffffb0fffcfffdff0a001c0014001c000a00ebfffaff71ff2afff7ff0a00faff0d00adff03002200
31000200fafff8ff1000fbfffcff0800110015003b000800e8fffeffffffcdff1e00fbff0000fdff010011000900e4ffecff15000600e4ff100003004900ccff
f7ff0c00d7ff2100faff0a00d3ff0800f5ffb1ffe0ff1100ceff2100faff120002001e00fbff0400ebfff2ff0300190004000a00fafff5ff19000a002000f7ff
050000000300160016000c00e9ff0000deff14009bff1400fdfffbffffffb2ff0d00fbffe1ffedff1100ebffcfff0e00e2ffdcff0900ccff0e000000e4ff34ff
f1ff1900e7ffe0fff1fffcffebff19002d00f4fffeffebff0800f5fff0fff6ffffffe9ffe0fffaff09000f0003001c00e1ff0600f9ff1700d9ff1a00fffff7ff
eeff0d000300edffedff1200fbfff1fffbff1a0053ffb6fff3fff8fff3ffe1ff45000b000800e4fffeffddfffbff0e001000f9ff26ff0400220009001e00feff
ffff22000f0019001500f7ffc3ff08000000f9ffe1fff9ff1500ccff0000f4ff2200230018001d002200ffff0e00f6ff0800dcffe3ff1b00f3ff290099ff0400
f3fff5fff4fffbff040001000200ffff070014000d00cfff0400f2ff2c00d9ff0b000000c1ffe1ffe6ff3400eeffeaffe6ff0200ecfff0ff4eff1000c2ffcfff
ccffebff0a00ebffdafffcfff3ff0900f2ffe5ffcfffbfff0c00baff010000000b001600110020000400edfffdffb7ff32fffaff0400f9ff09009afff8ff0400
3000f8ff0d00f3ff12000500fcfffeff1c0001002f001400f3ffffff0200bfff1e00e9ffedff00000a0010000500efff0d0010000300daff1500f6ff4200c0ff
07000a00e2ff33000400150008000a00f4ffc5ffe5ff1400eeff1c0008002400f7ff200000002500d2fff1ff040015003100f9ff1600ecff0f0009001c000200
110002000900100013000b00e6ff0000e9ff0200c4ff1400c3ffeeff060074ff0200f3ffcfff06000c00ddffedff1200e2fff3fff5ffd0ff02000200dbffe4ff
1a000c00cdffe3fff0ff0200edff17004200e4fff7fff7ff0d00dcfffdfffcff0c00e9ffe6ffe6fff9ff1000feff2100cfff50fffaff0f00d7ff1f00fdff0f00
f5fffffff5ff0100f1ff13001900e0ff16001b0014ff73ffeaff0000f4ffe8ff220005000000dcffd7ffc0ffecff05000b000d001bffffff280001001b000200
050036000b002e000e00d8ffbdfffcff0200f2fff9ffefff0700beffe6ffe6ff24002c00200019000b000a001700eaff19000400ddff1d00fcff2400d5ff0800
f2ffe9ff0000fdff090002000300dbff0d0016000b00f0ff0700f1ff3200d5ff1500fdff7effd6ffebff3a00ebffd2ffecff0d00e0ffe6ff2dff1600c1ffbaff
d0ffedff0600d9ffd5ff0d00e7ff0b00f9ff0c00d2ffc0ff1100cfff0f00f3ff17001d00100022000d000c00090073ff41fff4ffe4ff1100150092ff0400d9ff
3f00efff0300f0ff0b00fafffbff04002300030038001700270002000000eaff1a00d9ff0000000017000b00fefffdff0f00f6ff0900e4ff040004002b00d4ff
0d00f3ff9bffe8ff0f0008003d00d4ffffffa3ff290001002300fdff21000d00f3ffe9fffcffebff2700f5ff1000feffbcff0000f5ffe7ff0c000d00f6fff5ff
12000b0004ffbeffebff03000400efff0200ccff55fffbffffff0c00f0fff5ff0800f7fff1ff4a00fcff1c000e000600fdfffafff3fff3ff0b00edfff0fffeff
07001300f6ffd5ffe3ffd7ff2400e9ffbffff1ff1100f7ffc0ffdbff23000f001c00e5ffd6ff1c0027001200f7ff2100f4ffecfffbff08001e00efff02000600
0a00efff0e00d8ffe4ff0f00dfff010019000c00ffff21004000f6ff2800e9ffceffa0ff03001b00ffff1700fdff0a00b6ff0200b0ff0600fdfff5ff0a00fcff
0d00f0fff8ff1f00d9fff7fff3ff1200ffff0a00f1ff0300f3ff1600fbffd2ffedff1800faffebff0d00f8ff33ff1e000200e4ff1c000200f2ffecfff9ff1000
f0fffdfffcff14000a0010000100eaff10000600f5ff77ff0b001200f0ff2f001a002100d4ffe7ff0600eafff6ffcbffefff18008efff6ff0500c8ff1700e6ff
14001a000800f7fff9ffeafffdff0e00feff1000faffbfffd9fff2ff0100f5ffc9ff16001b0001000d001000fdffa7fffaffe6fffefff3ffe6fff3ff19000100
0000f3ff0300dcfffeff1e00ecff1100d8ff0900d8ffd6fffbff0f000000f2ffd8ffecff0100f8ffeffff0ff0c000f00ddfffdffe5ff36000f00f4ffb1ffdcff
0000f7ffb0ffd1ff0400feff1800d4ffecffbbff30001c000900080009000d00ddffe0fff2ffe5ff2900faff13000300b7ff0400fcfff6fffdff0d0001000600
03000a00e2ffc7fffffffdfffdfffcff1300dcff8aff17002500ffffeefffefff9ff0100fbff3000ffff180019000600fdff1800fdffd6ff06000000f6ff0100
17000200feffebffe1ffe9ff2900ccffdcfffaff1200f9ffbdffddff270005000d00deffdbffe0ff0c00010004001b00e9fff5fffbff0b001700e8ff05000400
0000f4ff1700dbffe2ff0a00f2fffaff1200070000002700340007001900f8ffdbffb2ff07001700000011000300fdffc8ffffff3aff0100fcfffdff0d000b00
0f000000f9ff2200e0ff0c00f5ff1300e3ff0800e6fffffffcff17000600f0ffedff0f00d7fff8ff0700f1ff57ff1500f1ffe0ff27000c00ecffe7ff00000e00
f0ff1b00f3ff000006001100f8fff3ff0e000900faff7aff02000f00f5ff29001f001a00ddffe5ff1100e8fff3ffe7fff0fffaffadff0000fdffc5ff21000f00
1d0011000900f2fff5ffecfff9ff1100fafffcffecffaeffd0ffedff1300ffffd6ff14000d000d000e000b00f9ffb2fff9fff9fffdffedfff6ffefff1b00ecff
f5ffebff0600e3ff02000c00e3ff1100d0ff0200c9fff9fff9ff1600fefff6ffdfffd7ff00000000ffffe3ff1c004700c8ff0000d1fffbff0900ebffcbffd3ff
eeff0000c8ffd4ff0b0005002f00dcffddff92ff1a00f8ff0a00060008001100e8ffe4ff0100ebff2600f6ff0b000500cbff0500fcff070002000a00fbfff7ff
f8ff0600d1ffe6fff6fffefff5ffeaff0e00eaffacff1a00edff1200f7ff0700eeffcefffdff20000000170016000c00000016000300d0ff0400f7ff01000a00
0e001e001d00eaff0100d3ff0d00eaffd6fffcff1300fdffcbfff8ff2100f0fff4ffe3ffe9ffedff07000f00fcff1a00ffff0800feff10002a00ecff02001900
060007000f00e3ffedff0900effffbff1400fefffdff02002800eeff0a00eeffdeffebff0a001700f0ff1800f8ff0100e8ff220075fffaff0800f7ff03000500
eaff0000f5ff1e00f3ff1800fcff0400dffff3ffedffffff060014000f000900f7ff0e00bdfff7ff0900f2ff9fff0600e7ffe4ff1a000b00f0ffe6ff05001000
f4fff3ff0000180005000f000900e8ff0d00f9fff6ff9aff09000c00f9ff200012001b00d1ffecff0c00edfff1fff3ffeaff0d00d8ff0e00fbffe9ff0f002a00
180012000200f0fff7ffebfffbff1600f4ff0300ceffe5ffcdffe4ff0200f5ffedfff3ff02001c000f001a00feffd5fff0fff6fffdfffefff9ffe4ff1b00fdff
feffffff0200f7ff03000700efff0700d7ff1400f2fff4fff6ff0000feffeefff3ffedff040007000900f6ff1f000900c2fff6fff5ff05000c00f1ffe5ffdeff
ddff0200d7ffe5ff000006000c00e8ff49009aff0d000c00efffffff01000d00f4ffebfff4ffe6ff12000e0010000600c8ff0100000000000000030004000600
c8ff0300e3fffbfff4ff0000f5fff4ff1000f0ffc4ff00001a00feffefff0400eafff5fff5ff1700feff140000000f00f3ff17000a00dfff0600eeff02000a00
13000b000e00e4ff0100f1ff0900eeffe9ffedff0d00faffe9ff09000c00edffe6ffecffd9fffafff8ff040005001f00fcffffff030011000800f3ff05000100
f3ff04000f00adffe5ff0b00dfffe0ff16000000f2fff4ff0000c9ff0200daffe6ff03000d001100e2ff0c00efff0d00efff0a0038ff00000200f9ff01000400
eefff8fff5ff0d0008002500f9ff1f009eff0000effffdff0e00090012000c000200f6ffddff05001d00f7ffd6ff0700e1ffdaff18000c000000e8ff01000b00
f2ff0500e5ff010003001900f1ffe3ff0b00f0fff6ffc7ff0100000002001200f8ff03002200f0ff0800ecffe9ff0b00e4fff1ffebff2900eafffbff03001000
120008000000effff2fff3ffedff1600f2fffcffd7ffefffddfff5fffafff3fffcff0d000200270008000000fdffaaffeefff7ff0000ffff0000daff1800fcff
f9ff18000d00f3ffffff0100f3fff6ffeeff0900e3fffbff00000600fbffe5ff0400f8ff01001200070000002300eaffd0ff0000e5fff4ff1100e8ffe5ffd4ff
1d002e00e7ff0500f9ff030030000000e1ff9cffe3ff01000000f0fff8ff1400f6fffefffcfffefffcff0e00f9ff0a00eaff0300feff16000500050005000800
ceff0100d9ff030005000c00f3fff7ff09001800b1ff0f00d9fffbfff6ff05000000ecffeeff0800fbff0d00f8ff0d00d3ff0a001200dfff0500e8ff0000fcff
05002800fcfff2ffdffff4fffaff04000300f0fffbfffdffffff3100fbffe1ffe0ffdaffd6fffdff0c00190007002400f9ff0700020015000300fcffffff2100
000000000500ebfffeff1100f2ffe2fff8ff0b00e8ffe2fffffff0fffaffd5ff040007000c000b00e1ffeafff3ff0e0009000c0008fffdff0f00fdff0600feff
ecff01001e0006000b001c00f7ff1400fbfffeffe1fff4ff1100f6ff11000a0007000400f9ff11001e000200ffff0000e8ffdbff16000f00fafff6fff4ff0e00
f4fff4ff0100070007001b00ffffe3ff0800f4fffffff9ff0800f5ff07000100ebff0200c2ffe9fff5fff5ffecff0400e5ff0800f2ff0e00d5ff08000400f3ff
0700ffff0300edfff4ff060007001300ecff0000dbff2600faffeaffdffff3ff07000f0009001a000c00f2ff0200c9ffcefff6ff010010000900c1ff0f000500
fcffffff0500f4fffdff00000500f7ff0800daff13000a000100fafff8fff1ff0b00f7fff8ff0600fdff0d001b00eeffe8fffffff0fff1ff0800e3fffbffdaff
deff2400f7ff1600edff0500ecff0700f3ffb7ff6cff0100edfffefffaff1000fcff0400fdffefffebff0900e8ff0b00fffff6ff1d00fdff000005000000f3ff
f2fff2ff00000e000d000f00f8ff0500edff1f00cafff4ff0a00f9fff4ffe5ff03000a00e7fffbfffeff1d00efff0c00e5ff01001000deff0300f3ffffffdaff
f5fff4ffedffd5fffcfff3fff7ffffff1f00efffe5fffcff10000d00f9fff2ffd6ffe3ffdcff01001b00050004002300f9ff0e0002000e00d3ff030003000600
f8ff00000700e9ff01001100e8ffe1ffedff0d00b8ffd8fff8fff6fff3ffd0ff2c000c000c00f9ffd3ffe5ffefff1000090008003efff9ff0700fdff0c000000
0700f8ff2200010011000400f3ff1f00ffff0000f5fff6ff0f00dbff060000000d00ecff0c0016001100feff0200fafff0ffeaffffff11000700f3ffd7ff0800
f3fff2ff0300fdff08000b00e1fff0ff0600eeff000000000400f0ff0200f3ffe5fffbffbbffe8ff0200fdffe9fff9ffe7fffeff170012008cff0900d5ffeaff
f7ffe5ff0500f4fff2ff0500fbff0a00ebfff3ffdafff4ff0100e0fffffff9ff130011000e000d000a00e9fff8ffcfff36fff6ff0500f5ff1000d5ff00000d00
f8ff160008000200000000000b0001001a00e3fffbff1900fffffcfffaffe0ff1200f4fff7ff0c000e0015001500e2ff070002000000f0ff1800f3ff1500c2ff
f5ff27001f001f00f1ff0700f0ff0b000000acffbdff1300edff070000000e00f7ff0e00fdfff2ffcefffafffaff06002300f6ff3100f4fffcff05000000faff
0500feff15001c000f001100f2ffeefff4ff2800c6ff0900cafff7fff9ffd5ff03000100e1fff9ff00001200fdff0c00ecfff9ff0800e2ff00000b00f4ffd9ff
00000800ebffe1fffeff0100effffeff2000f1ffeefff6ff1200fcffebfffeff0b00e1fff4fff8ff2300180002002200e9ff0e00fbff0500e2ff0c00fcff0000
fbff00000300f5ff14001200faffe6ffe9ff100012ffd6fffafff3fff4ffd4ff08000d000700e3ffecffeafff6ff11000f0000008bff00000300000015000300
10003b00270020000f00effff1fff2ff0900fbfff0fff3ff0900c8fffcffe8ff1000e7ff190016000200ffff0e00f2ff1300deffd8ff1600f8fffdffcaff0600
ecfff3ff0e00f4ff06000b000b00f1ff0c00f9ff0400faff0800e8ff0f00eafff8ff0100b7fff1fff0fffeffecffe5ffe7ff0d000300f9ff11ff0e00d7ffd9ff
eeffa6ff0700f8fff3ffebfff0ff0700ecff0200e1ffd4ff0900e4ff1500f9ff14001500150017000800d2ff1600d0ff25fff7ff020005001300b3fffdff0500
f9ff08000400faff0000f9ff18000d002500dbff2a0017001400f2fffbffe2ff1300f2ff0000faff07001a000500ecff1d0002000c00f4ff14001f001100d4ff
02001d0022002400ebff0a00cfff14000200efffd8ff1000f6ff2800feff1400f6ff0a00fbff0f00d9ffebffeeff09002400ebff4300effffaff0600f5ff0100
1000fcff28001c001a0010000600f4fff0ff0100ceff0e000400f3fff1ffb8ff10000a00e1fff1ff0a000300feff0500f0fff9ff0200dfff06000300e3ffbcff
fcff0c00e7ffb2ff0300ebfff6ff05003600feffecfff7ff2600edffefff0500efffe2ffe9fff4ff0f00f9ff08002800ceff5afffeff0400d6ff110000000d00
fdfffeff0600f0ff000019000400d2fff6ff12001bffd1fff5fff7fffaffe2ff33000c000000ddffeeffcefffbff0f000f000900b5fffbfffbfffbff24000000
00002500030024000f00f5ffe9ff080018000e00f9fff3ff0400bbffebffdcff1300ddff19001a00feff16001200f5ff0e00f4ff95ff0d00f6ff000085ff0400
eefff2ff0d00f8ff0b0010000600edff1200fbff0000effff9ffe9ff0f00e7fff8ffffffc7fff1fffeff0a00f3ffe2fff0ff0d00f8ffeeff53ff1400c6ffd4ff
e1ff6cff0400ecffedff0600f0ff0500e8ff0000e3ffc7ff0c00f2ff1b00feff17000e00150019000400f3ff0600bdff2dfff8ffecffe2ff1b0072fff7ffdeff
f8fff1ff080000000000ffff18001f0029000800120023002e00fdfff2ffdeff0900f3fff4ff050015000b00feffefff1c00fbff0200efff230005001700d1ff
0f00edff90ffe7fffffffbff0700b5fff5ffa3ff2a001c00080003001c000c000d00f2fffefffdff2200fdff1100f7ffc0ffe0fffaffefff00000f00e2fff3ff
0f000300c1ffd0ffeeff1300070014000d00e5ff6dff11001f003c00f7ff00001d000700f8ff3200f9ff31000600f9fffbff1800ebfff2ff0000f1fff1ff0200
dfff0400feffe6ffe2ffbdff0e00f2ffd5ff00000600f8ffa9ffe1ff0c000c001100edffe9ff070019000000f8ff2600f2ffe0ffeeff0000fbfff2ff06000800
d4ff14000800eaffe8ff1300f9ffecff16001b00010011000600ecff02000f00dffff2fe0000170011000a000b00faffd4ff0300b4ffedffecfff5ff00000300
0100fbfff3ff1c0068fffafff7ff0800fdff09000300fcfff7ff0f00f3ffdfffe8ff2200cfffe0ff1400f8ff42ff28000900e2ff0500fafff2ffecff05001900
ecffffff15000b00100011000800f2ff120007008eff84fff8ff0400f5ff34001f001100defff2ff1100e6fff6ffeafffcff170083ff07000a00daff2b00e1ff
1a000d000800f7fff7ffeeff04000600fbff09002a00bfffddffeffffafff3ffe8fffcff0e00040015001300e9ffddff0b00f5fff8ff0000e2fff1ff0e00f4ff
fbffe3ff0000effffeff0e00e9ff1a00d4fff1ffd4ffdcfff9ff0800f7fffcffd8ffe4fffaff0300f1fff8ff02001900c9ff0000f1ff2e000e00ebffc0fff3ff
0e00f9ff99ffe1fff7ff07001f00b2fff5ff99ff220014000700090007000800edffe6fffcffedff1a0000000e00faffbdffeafff5fff6ff03000700e6fff3ff
070000005fffdaffeeff0d0005000a002f00e4ff73ffedffecff2200f2fffaff0200f4ff000015000800210006000200ffff0300f4ffd5fffffff6ff01000000
f3ff06000000f4ff0000e6ff0500f7ffe3fff7ff1100fdff97ffe7ff090012001300f0fff5ffe6ff08000900fbff2400f6fff6fff5ff04002300ecff0900eeff
ceff03000800effff8ff1200f4ffe9ff210019001f003a00fefffbfff3ff0a00daff20ffffff1d0010000000feffefffdfff1a00b8fff3ff0400f5fff1ff0300
0200f7ff00001600dafffaff00000500f4ff0400f9ffddffefff1f00feffeaffeeff1600adffe9ff0000feff43ff12000f00e1ff0200ffff0100e8ff1b001600
efff1900daff1100080010001200eaff14000400d6ffa4ff07000400f3ff2b0008000a00c9ffedff0b00e7fff6fff4fff1ff1400a0ff0700ffffe2ff0a00f3ff
1a0015000600fefff8fff1ff00000d00fffff8ff1600d6ffe0ffeaff0c00e7fff6fffbff0500050011001100fbffe4fffafffbfffcfffcffebffeeff1500f1ff
f9fff5ff0000f5fffaff1400ebff0d00d4ff0600e4ffe3fffaff0e00f8ff0600dffff3ff01000c00fdffebff0c000f00d2fff9fffcff16000200faffc6ff0500
f7fffeffacffe2fffbff0a001100bcffd1ff99ff100016000b00070003000c00ecffdbfffbfff2ff1a00faff0f00fbffc1fffaff0100f6ff03000400e7fff1ff
f3fffcff94fff0fffdff0900000012002500e3ff8bff050017002500f3ff0d00f8ffefff00001e00fcff25000e000300fdff2800feffddff0100fcff08000500
f1fffcfffefff0ff0800ffff0e00eaffeefff5ff0f00faff9efff6ff130007000900f2fff5fff5fffeff010000002200f4fffcfffcff0a001d00f2ff07000400
c4ff11000f00d2fff2ff1300f4ffd5ff1a0026001100f9ff0400f2fffdff1a00e2ffbeff0200160011000b00fafffcfff5ffffffb7fff3fffcfff0fffafffeff
0a00f4fffaff1500e9ff0000f5ffffffd1ffeffff0ffc8ffffff14000700fafff4ff10003effeeff1a00000095fffffffbffe1fffbff0700fdffdeff27001400
f1ff2000f4ff03000b0019000600ebff1400f2ffe5ffb6ff05000500f8ff1d000d00f3ffcaffefff0400ecfff5fff5ffeeff0d00d7ff0d000000f2ff20002200
19000a000000f4fffbffedfff1ff1300f8ffd9fffbffeaffddfff1ff0400f1ffdeffeffff9ff09000f001000f0ffeffffafffefffbff0400f2fff3ff1000f1ff
f2ff020007000000fcff1100f3ff1000d5ff0000d4ffdefffaff0c00f7fff8ffe4fff6ff04001100fefffbff1400faffd3fffafff6fff5ff0000f4ffd8fff1ff
deff0800d1ffeffff7ff0d002500ceffd7ff2cff09000d000300f9fffcff0e00f5ffe5ffe7fff2fff6fffdff01000000c9fff3fffffff5ff03000300f1ffeeff
9cff0500cafffafff9ff1000fcff03001e00fdffc8ff0700deff0300f6ff0c00e5ff1c0000000c0004001a000c000a00faff2a000600e7ffffff05000a000100
f6ffecff0000f5ff0100fcff0000f3fff7fff1ff1400fdffd1ff190008000200e2ffefffeefff7fff9ff1400060029000000fbfffdff0b002b00f5ff03001200
d6ff12000b00e7fffcff1300f0ffd7ff0c00eefffafff3ff0500dcfff4ff1e00eeffeeff01001500feff0900f9ffebff06000f0087fff2ff0b00ebff0500feff
f3fff0fffaff0600fdff0a00fffffffffdfed4ffdbffcbff06000d000500eafff9ff0e007ffff9ff1f00f9ffdafff8ff1600e4ffe9ff0b000400d9ff15001400
f7ff0a00d4ff280007002100ecffe9ff1000e3ffe5ffe4ff0a00fbff04001400fbfff4ffc9fff4ff1a00eaffedfffdffe7ff1900f5ff2100e4fffbff0800fbff
11000000fdfff8fffdfff7fff8ff1400ecffceffdefff3ffeffff6fff7fff3ff0000e8fff9ff26000a0000000600edfff3fffcfffafffffffcffedff1000edff
faff17000900ecfff9ff0b000500eefff1ff0000fbfff7fff9ffdefff3fff3ffedfff6ffffff140008000a001a00f0ffe2fff7fffcfffdff0800f8ffdbfffeff
e6ff1f00f3ff0400f8ff0c000300f7ffd8ffa8ffe7ff0d000600f8fff5ff1400feffebffceffe7ffe2fff8ffcfff0100ebfffafffdff000000000000f2fff3ff
76ff0400e1ff030001001400feff180000000900e9fff9ff0c00fcfff5ff08000000fafffdff0500fbff1f0000000600e9ff1d000a00defffdff05000800faff
0000fcfff8fff5ff0e000e000800f4fffafff2ff0400fefff8ff3a0000000300d4fff1ffedffffff01000b0008002c001000010000000800eefffbff06000f00
f7ff08000100eeff0e001200e6ffdafff9ff2000c1ffeffffdfffafffdff0000fdff050008000a00f3fffaffedffffff09000300b0fff7ff0100f1ff1000fcff
0300f8fffdfffbff0a000900fdffe5ffdbffe0fff2ffdbff0100faff05000000feff0100d7ff08001b00fbfffafffbff0400deffedff09001e00d9ff04000c00
f4ffffff0e000d000a0015000200f0ff0c00dfffe7ff24000200f5ff01000800ecffe8ff3400f0fffeffeffff0fffdffe6ff0f00ffff290087ff060014000300
0300f3fffefffbfff8fffefff1ff0d00ebffccffdfff36000000f6fffbfff9ff0a00f9ff01000d000900e4ff0100e7fff6fff9fffffffdff0400f2ff0800feff
fbff2a0016000200f7fff9ff090049ff0e000500e0ff0600fefffafff7fffbfff6fff0fffdff140008000c001500ebfff8fffdfff8fffcff0c00f8ffebfff2ff
d7ff17001c001700eeff0c0002000a00f8ff74fff0fe0600fcfffbfffaff0e00f1fff0ffcaffe5ffd0fff9ffb7ff00000600fcff0200fdffffff0300cefff3ff
eeffefff08001300fcff1a000200060000003000e4fffdffd2fff6fffdfffeff0d000000f0fffdffffff100011000800c5ff06000d00e3fffaff03000700f9ff
fbffedfff4fff1ff1100eeff0000f3ff1400f5ffcdff00001b001600f9ff0300e1ffe8ff0000f6ff200007000c00280002001000fcff0400f6ff0100ffff1000
feff0000fcfff6ff1d001400e4ffd8ff0e001800b6ffe4ff0100f6fff8ffeeff14000b000800fcffe6fff9fff9ff09000b000600bdfff4fff3fff5ff1c000000
0400f1ff000003000e000000fdfff5ff0700d8fff6fff9ff0800e2ff0000f2ff0000f8ff050011000f0001000200edff1000e7ffceff09001600e4fff4ff0b00
f2fffbff0900ffff050016000000f4ff0c00e6ffedff2f000400f0fffcfffcfff7ffefffc4fff1ff0800f4fff0fff0ffebff0c0038001a0022ff0b00eafff0ff
f5ffdcff00000000f8ff0300feff0700efffeaffe4ffeeff0800ecffebfff8ff150004000a0017000400dcff0300e9ffb1fffbff000005000b00f9fffefff9ff
fdff26005b000000f6ff03001500fdff2200e6ff0e0017000100fcfff8ffedfffefff0fff9ff1400050013001000e3ff1800f0fffefffbff0b00fbfff8ff0300
f8ff1d0037002000f6ff0b00dbff1200fbffc8ffb7ff0a00fdff0000f9ff0e00edfffaffd8ffdfffd3fff6ff99fffeff1a00f6ff0400fbffffff0500c3fffcff
0600f7ff1b00190005001a000500fafff4ff0a00c5fffbfffbfff0fffbffe9ff17000d00ecfff3fffdff110004000200ebff0a000d00e0ffffff07000000e9ff
f7fffdffebffe7ff02000200fcfff4ff1e00ffffd1fffaff29000000f9ff0c00dffff2ff0600fdff120003000c00260003000600fcffffffebff040000000400
fbfff6fffefff4ff12001300f2ffdcffd5ff0b0003ffe0fff9fffafffdffdaff34000f000400e8fff0ffecff0100150009000200c5fff3ffdefff8ff1500ffff
0300f5ff00000600110003000000f5ff0200edfff3fff6ff0100d9fff6ffebff0300e9ff15001000f5ff0b000400f3ffffffe8ff7fff07000700e5ffdfff0400
f3fff3ff0500f6ff08001c001200fcff0f00e8fff1ff1a00fdfff2ff0000f6fffefffbffbefff1ff1a00f8fff5fff1ffeeff0b0000000100dafe0f00e3ffebff
e5ff91ff01000100f3ffb9fff7ff0000f2fffcffe8ffe4ff0c00fbff090000001a0006000f00ffff0400e2fff9ffe1ff54fffeff050007001400f5fffafffcff
eeff0a001700fffff8fffaff14000b002a000500f8ff22000100f3fff6fff3ff0000f5ffe5ff1100050014000a00eaff2a00fafff8ffffff12000000f9fffdff
03000a0035001c00eeff0600d4ff1b00feffacffecff150000000600fcff0a00f7ff0200f8ffe0ffd6ff0000c0ff05001700e9ff0b00f9ff00000600c4fffaff
1100f6ff2d001f00080017000c000000f7ff0700c8ff0100d1fffbfff8ffe3ff09001b00f6fff2fffbfffaff12000600f8fff7ff0300dbfffeff0b00f4ffe6ff
f1ffffffebfff0ff1800fbfff5fff4ff3b00feffcefffbff3100dffff7ff10000000fcff0c00ebff08000d0006002a00f7ff7ffff9fffeffeaff0b00feff2100
f8fff3ff0300f8ff0c001400fdffddffecff0b001affdefff8fff2fff7ffdfff15000c000400d1ff04000600f8ff100006001800bafff3fffefff8ff14000500
f9ffddfff9ff18000a00f0fff8fffeff0a000200fcfff8fffeffb2fff5ffe9ff0700dfff1f001100f5ff0f001500effff4fffaff82ff0000fdfff7ffeaff0500
f1fffefffefff9ff050012000600f7ff1400faffefff0a000100f0fff4fff1ff0000feffa8ffebff1800fbfff3fff6fff2ff0400fdffedff0cff1100e4ffe7ff
e0ff7dff0000f7fff6fffffff4fff9ffecff0200e6ffd8ff0d00faff1f00fbff160010000d000e000100fcff0800deff25fff9ff040000001800f3fff3fff2ff
f6fff8ff04000300f7fffaff130008002700f9ff2c000e000f00f8fff2ffebfff8fff4ffdeff0c0009001500ffffe1ff2700f3fffffffaff1d002100e7ffe5ff
0900faffdefefdfff8fff7ff060002ffffffd3ff27000b0010000200180002000200f2fffafffcff090006000300fcffd4ffe0ff0200f3fffdff1200aefffdff
1700050014ffd3ffc7ff25001200fdff0500eaff6cff0500efff1400f3ff07000d00fdfff8ff1d00f0ff0f00fcfff8fffcffefffe8ffe5ffffff0100ebffe6ff
1600fdfff1ff2500ffffc7ff0000f4ffe6fff8ff0c000100aeffd2ff010013002b000600efff25001a000c00ebff2500f6fff1ffeffff0ff1200faff15000000
0dff1900fdfff6fffaff1300e9ffe7ff02000d00200009000400f4fffbfff2ffdeff33ff000018001c00fcff0c000100eeff0c00fafff7ffdbfff5ff04003300
0e00f3fff7ff0c0002ff08000000e6ff0100fdfffaff0b00f8ff1700fbffedffeeff1400a7ff85ff0700e3ff34ff2d000800fbffeaffcfff0700eafff5ff1700
f1ff13001b001e00150014001500f7ff1c000d0064ffb8ff05000900f8ff360018000300a6ffecff1d00eefff9ffecfffeff030086ffffff1600e4ff1400e7ff
0f000a000300ffff0000fcff0000c0ffebff0b004500ddfff4fff6ff0d000e00a9ff0900fafffdff1b000400e4ffe0ffffff0c0005001500e6ffc6ff1500f1ff
f7fff2fff3ff0000fbff2200e5ff0f00dcffeaffe3ffe1fff9ff0700ecff0700e0ffedfff7ff1600ddff060002001000dbfffeffedff0100fcfff4ffcbff0400
0c00f1ff8cff0000f5ff0400ffff2bfff8ffc5ff1d0012000000fcff0f000700e1ffe3ff000001000a0002001000efffd2fff6ff0300eefffdff060082ff0000
0800f8ff3bffdeff08001a000d00ffff0e00e1ff59ff020011000800f5ff08000c000c00fcff3c0007001200fdfffdfffcfffeffefffe7fff8ff0100f9fff6ff
eaff0100f3fff7fff8ffd7fffcfffaffe8fffbff0100fbff9affdeff090017001b000a00fafff5ff0a000800f5ff2700f2fff2fff4fffbff130000000600fcff
5dff0c000300eefffcff1500f5ffe5ff0c001c0031004700faffeffffdff1e00edff13fffbff1600130003000500d0ffedff15000900f4ffe8ffeaffecfff7ff
f6fff4ff02000d00e5ff0200fbfffbfffcff0700feff3bfffaff2000f6ffe7fff1ff120097ffe5ff0800f4ff38ff16001400fcffeafff7ff0c00e9ff1e001e00
f6ff16000b000b00100014001700f5ff1a00faffd5ffc8fffcfffefff6ff28000d00f9ffc8ffecff0000f1fff8ffeafff6ff0f00a4ffffff0600ecff0d00e5ff
12000d00fdfffcfffdfff3fffbff0400030000004500d5ffe7fff3ff1800f5ffe2ff09000200f7ff19000800ecffe4fff9ff03000000feffe8ffdaff0a00efff
fcfff1fff4ff0f00fbff1700f3ff0e00d8fff7ffcbfff8fffdff0100f4ff0100ddfff0fffcff0400faffeefff9ff1800d3ff0000f2fffeff0900faffdcfff3ff
0200fdff87ff0200f7ff0d00150089fff1ff7eff0e0004000900faff11000b00f4ffe7ff0500faff0a0002000e00f2ffcdfff6ff0200f3ff03000500c9ffe9ff
f7fff9ff86ffd7fffcff110011001b000a00f5ffa3ff0400e5ff0d00f3ff0200f8ffcdff02001b00000004000100feff0000fbfff5ffe2fffeff0b000400ffff
effffafff0ff0d00fffffffffefff1ffeefff8ff0700070068ffe6ff09000c002500fcff0000fbffecff0700feff2900fffff5fff6ff00001b0000000f00f4ff
d1fe1400fcfff2ff00001600f3ffdfff0f000b004300f9fffdfff8ffffff1100ecff84fffdff1b001800feff01001400f8fffdff0700f3fffeffecff0200f4ff
fcfff0ff0200faffd3fffffffcfff9ffe7fff2fff7ff22fff8ff25000000effff0ff1300f0fee6ff1d00f0ff59fff9ff1100f7ffddfffaff0d00deff13001c00
f7ff2200eeff21000e0018001100f4ff1a00efffd6ffbeff07000400f9ff1e000300e5ffb4ffefff1000eefff6fff2fff5ff0a00d7ff01000000f2ff06001b00
13000800fefffffffcfff6fffdff0b00ffff3bff0600eafff4fff1ff2600f2ffeefff1fffafffcff160013000200fefffaff0000ffff0100ecffdbff0d00f2ff
f6ff0100f1ff0700f9ff0c00fbff0600dbff1500edfff3fffeff0600f0ff0500dffff4ff03001600010001000c00ffffddff03000800020002000500e0ff0c00
00000200befffbfffbff12000800c8fff2ff93ff020014000e000400faff0a00ffffe3ffeefff2fff6ff00000900f9ffdefffaff0100f1ff06000000e6fff9ff
5dfffeffc0fffaff0f0014000f000800fdfffbfffcff03001600fefff8ff05000000eeff000009000200f2ff0e00feff05000300feffeafffffffcff03000500
ffff0600f1ff0a000d0010000400f8fff3fffcff0e00ffffbfff0d000100110009000200f1ff0000f3ff020003002e000800fbfff9ff030018000f000a000400
e2ff1d00fbfffbff08001400f2ffd6ff11002d00f6fffefffeffeaff00003c00f7ffe4ff01001300fcfff4fffcffe3ff01001d00f8fff8ff0000eafff8fffcff
0c00f7fff8fff6fff6fffbfffefff8ff80ff35fff7fff9fe00000a00feffeafff4ff0c0069fff3ff1000f3ffcefff6ff0800f6ffceff00001500deff1d001400
f8ff1d000a0007000b0012001100f1ff1700deffd6ff15000200fcfffeff16000700ddffccfff1fffaffeafff7fffdfff0ff1100f7ff1200cafffeff1300f6ff
0f00fcfffbfffffffcfff9fff7ff0e00f3ff4efff7ffedfffefff2fffcfff7ff11000e00f3ff01000e00fcff0300fcff0600fefffefffffff7fffdff1400f5ff
f9fffdff0e00fafffbff120004000100f5ff0800e0fff2fffeff0100effffdffe6fff6fffcff060000000c000c00fbffe9ffffff000005000c00f6ffe0ffedff
f8ff1200f7ff0b00f8ff11000b00f4fff1ff94ffd7ff08000600f3ff0f000a00f9ffe6ff17ffefffecfff0ffd7fff8fff7fff8ff0200feff07000000d7fff1ff
7aff6e00f0ff0a0000001b00060012000400040012000d00e4fffdfff5ff01000b00defffffffbff0100ffff07000000feff09000200f2fff9ff030002000100
f8fff9fff6ff05001f0008000100f7fff5fff6ff0900020000002b0002000d00e8fffaff0000fdff1100faff060030003900fcfffaff00000000000009002300
050007000300fcff18001600e0ffd3fff1ff1f00c3fffcff0000fbfffbff0200f7ff010002000f000700faffeefffeff0d000900fafff8ff0d00eaff09000300
0000f2fffcffffff0200fffffdff0000eeff2efff7ffe5fffffff1fffeffeefff9ff0c00cafffdff08000200fbfff7ff0a00f7ffc8ff02001d00dcff09001100
f9ff02000c001b0009001100f7fff7ff1300dcffd7ff29000700f8ffffff0c000300cfffc4ffefff0e00f0fff3ffebffeeff0d00f6ff28003bff0600edfffdff
0200effffbffffff0000fdfff9ff0b00f1ff1cffe8ff41000e00fdfff0fff6ff0e00f7fffcff0b000800ebff1a0007000000000000000200000004000d00f7ff
0000030016001300f8ff06000000e2ff1100060005000c00feffe1ffecffffffe9fff0fff5ff0200feff08000d00e9ff0000f8ff0400ffff01000200dcff3000
f4ff1a002e001000f7ff0c00e5ff0700f9ffbaff5bff07000b00f2ff10000900f1ffebff23ffe4ffdcfffdff7efef9ff0700fffff9fff9ff000002008dfffdff
f0fffeff19001200ffff1a000c000600feff0800f9ff01000600fafffcff110006000f00fefff7fffaff00000f00fefff4ff0d000300eefffbff1900ffffffff
fbfff5fffafffaff07000a000300f5ff0d00f7ffe2ffffff2a00180001001000dffff9ff0b00fdff14001d0008002c000b000400fafffcfff6fff5ff02001900
0000f7fffafffdff28001400e8ffdcffdcff0800c3fef7ff0100fcfffcfffcff03000b000900fdff0700fafffeff100007000f000400f7fff5ffeeff0f00fdff
fffffafff6fffdff0d000a000000f5ff06002ffffdff0000fbffe6fff9fff6fff6ff0000f9ff08000e000500fdfff4ff1200f3ffa8ff00001d00daff07000d00
faff01000b0009000c000f000100fcff1200e6ffd5ff3a00fffff6fff2ff02000900ddff3c00eaff1d00f5fffaffebffeeff0d003c000600b5fe0a00f8ff0000
eeffcdfffbff0600f8fffefff0ff0200f9fff0ffe4ffe6ff1800faffebfffbff1600ffff000006000700e1ff04000100ccffffff00000500070002000000f8ff
f9ff0c001e00fdfff9ff0000060002001f000e00e1ff1d000500fcfff1fffcfff0fffaffedff0f0006000d000b00ecff2900fcff000002000d00f9ffeafffaff
0000feff3d001500f8ff0500dfff1500ffffe7ffd4ff1500fefff1ff0d000400eeffeeff33fff3ffebff0200f5fefbff0d00fffffcfff9ff0300020046fff9ff
0600f3ff2e001d00feff1f000d00feff01000600b9ff0300d3fff9fff4ff050004000400f6fff5fffcfff0ff03000000f1ff01000700effff9ff1100fcff0400
fafff3fff8fff8ff190000000400f2ff2500fcffc0ffffff3000f5fffdff1900f2ff0a002700f3ff08000a000f002c0005000700f3fff8fff9fffeff01001100
fbfff5ff0400fcff24001200edffe2ffbdfffdff3bffeaff0100f6ffffffecff04000e000300dbff04000e0001001500040000000b00f7fff7fff4ff0b00fcff
0600f1ff030000000b0001000700f7ff0600f5fffafffcff0500dafff7fff0ffffffffff15000c00e5ff0c000200f5ff0500f2ff5eff00000f00e6fffdff0700
f7ff06000500fcff07000d00080002001500e7ffd2ff2d00fffff6ff0100ffff0600f3ffb2ffe8ff1200effff0fff4ffedff08000300fdfffbfe0e00f3fff1ff
e9ffc6fffdff0a00faffc4fffcfff7fffbff0100ecfff3ff1300fbff0f00fdff1e000a00060008000000f6ff0200efff16ff0400060000000f002a00fbfffdff
f3ffffff13000000f8fff2ff0200feff2900050005001100fefff5fff2ff0600f4fff5ffd6ff0a00060015000500e7ff3600f9ffffff050012000000ebff1300
fdfffbff27002000f5ff0400bfff110000000f00f6ff1200f1fff5ff0f000600f8fffdff0600faffd7ff0100cbfefbff1300ecff00000300ffff06009bff0200
1400f0ff2d001000000020001500fdff00000200a5ff0c00fffff5fff6ff150001000700f8fff1ff0200f6ff0500fcfff1fffeff0400f7fff9ff1100eeff0500
f5ffe8fff9fff0ff0c00feff0400f0ff1a000000cbff04003600e8ff04001d00f9ff0d00ffffefff04000f000c002b0004006bfff3fffcffedff0400fdff0000
f3ffeffff6ff0000060015003b00eefff1fffdff34ffe1fffffffcff0200d7ff0b000c000100cafff3ff09000100180004000a000100f4ffeafff6ff1c00ffff
f8fff1ff050009000e0007000000f0fffeff0b00fefff6fffeffdcfff8fff3ff0700010024001500f7ff0a000300f4ff0500feff4cfffbff0a00ecfff6ff0d00
f6ff0000f7fffbff10000c00150003001700f4ffd2ff0c00fbfffafff7fff9ff0800fcffc1ffe8ff0600fcfff4ff0100f2ff0900fffffbffecfe1400effff0ff
e7ffdafeffff0c00f8ff0300fdffe9ffffff0000eeffe7ff1b00fcff080002001c000d000b00080007000100b3ffe3fff9fe060008000400140031000100fbff
fdfffdff02000f00fdff040006000f0027001000f9ff0d000200f2ffefff0300effff9ff4500090009000f000500e4ff28000300fdff050019000000f3ffd8ff
0100f0ff68fff8ffe9ffe5ffe3ff0cff0b0099ff2d001200060007000c0003003e0002000e0001000800ffff2000d6ffd4fff9fffefff2ff05000a0098ff0a00
1300000065ffe5ffd4ff33001500fdfffdfff7ff64ff0600faff0300f6ff0a003400feff02001700f6fff3ff0100eeffffff0a00f2ffe1fff3ff08000000e0ff
0100f2fff1ffb7fffeffd5ff0200f7ffe9ff02000100f8ffbeffeaffecff010024000d00faff38001800f8ffe9ff2e00f5fffcffe7fff0ff0700bcfff9fff3ff
4fff26000700effff9ff0f00e2ffe1ffe5ff1600e8fff0ff05000000e5ff15000000f2fef5ff19001700feff0900daff01001100ecffeeffd3fff8ff0c00f0ff
fdfff2fff7ff120036ff1600fefff7ff09001700f6ff08000200f8fffbffe9ffefff1600c5ffdafff1ffc5ff48ff39000e00f6ffe2fff5ff0e00edff14001b00
f7ff0f00140008000a00ffff2f0000001b001100b3ffbffffcff0800fdff340009000700bffff1ff0d00ebfff9ff0500f9fffdffa3ff05001000f0fff5fff5ff
25000000feffe6fff9ff07000600edffe6ff2e005d00deffe4fffeff17000f00f8ff07001300f9ff0f001100daff0900f7fffbff01000000eaffc2ff1c00f9ff
fefff3ffecff0300ffff1b00f1ff0800e3ffeaffddffe9fffffff7ffedff0800e1fff0ff02001d00d5ff270000000a001e00fffffbffe1ff04000000d5ff0500
000006002aff0000f9fffeff0b00f2fef6ffacff16000d00fdff03000e0002004700f4ff19000500faff05002200f4ffe5ff00000900fdff010010005aff0300
1200f9ff6dffd0ff08001b001c0000000b00eeff63ff0b00ddff0900f9ff13001800f8ff02003800ffff02000300fbff0400e9fff8ffedff000000000900e4ff
0200f3fff0ff10000d00e0fffcfffffffdffffff0800ffffb0ffe4ff04000c001d000b00080009000d00f9fff4ff3400ecfff9fff3ff0300150000ff1500fcff
bdfe1e00f9fffafffeff1500e4ffecff020014002d002e000400f9ff05000f00feff11ff04001b001400fbff0900ccff00000b00fdfff3ffe1fff0fffafffcff
0300e6ff0800faffafff1300feffdfff05001400000055ff02000500fffff0ffedff140093ffe7ff0000edff18ff18000d000000d1ffe7ff0d00e4ff00002200
fcff10000d0001001900feff2600fcff1e000000c1ffd2ff0000fdfffdff2d001100e5ffb1fff0ff1000f4ff0000f8fffdff0300aeff06000b00f2ff0900e3ff
1b000300fdffffff0000f8ff0000fafff6ff0a005700e0fff7ff000019000300ffff03000b00fdff1e000500e6fff1fff4ff000001000c00ecffc2ff1200f1ff
00000900eaff0f00fcff2200feff0000e3fffaffe8fff7ff08000900eeff0f00dffff2ff04001a00e9ff040013000d00cdff0900f1fff8fff3ff0200d8ff0c00
fbff00009bff1300f5ff0d00f3ff06fff8ffa1ff0a000800fefffeff110002001700efff11000100feff0b001c00f7fff5fffcff0800f5ff00000300b4ff0000
fdfff1ff36ffeeff4600150015001200fcffedffadff150009000300faff02000e00faff030013000500feff0a00fdfffdffe7fff8fff1ffffff14000b00feff
f5fff3ffebff1800fffff8fffafffafff3fffcff080004005affeeff030008001c00070000000b000200fafff9ff2d00f8fffdfff9ff0600080002ff0c000000
3dff1b000000feff02001500e9ffdfffffff1b002b000300fbff000004000d00faffb7fffcff17000900eeff0b00bbfffcffffff0900f5ffe7ffedffdefff6ff
f9ffe8ff0400edffd8ff0a00ffffeefff5ff0400ffff6afefbff0400fdffedffeaff170085ffdeff1400e1ff5cfff3ff06000100d0fff5ff1000dcfffdff1e00
f8ff1000060007001400f5ff0500f5ff1700fcffc8ffd9ff0000fbfff6ff1d000b00d1ffccffeeff0400effffdfffefff9ffffffbeff0e000400f8ff07001500
17000000fdfff9fffefff6fffcfffcfffdff35ff2e00e9fff4fff2ff1400faff190004000500f1ff1800f9fff4fffeff0200fffffdff0b00edffd2ff1100f9ff
03000200f3ff0400fbff110005000800e1fffaffdaffe7ffffff0200f1ff0700d3fff3ff0200feffefff120004000200e3ff0a00fcfffeff0600fdffe4fff6ff
0100ecffa7ff0500f3ff15001600b6ff00007dff01000b000f00f9ff250007000200f1fffffff8fff4ff00001500fbfff4ff0400fffff5ff03000100dbfff8ff
67ffecffbbfff2ff1f00170018000d00ffff010031002000eeff0000feff0b000c00f1ff0000fcff0c00f8ff1400fefffcfff1fffcfff3fffbff05001100ffff
00000a00f9ff110012001500fdfffaffeafff5ff040000005eff0300fdff06001600040004000c00feff1700010038001c00f4fff2ff000012009bff10000800
fcff0200fcffffff08001100e1ffd7ff0a003100eeff0900fdfffeff06000600f5fff3ff050016001300fafffdffe5ff010014000900f6ff0500e8ffefff0300
0500f3fffcff0100e8fff3ff0000f9fff4fe4eff03003efff9fffefff7ffd2ffeeff1a008dffefff0c00e9ffc2ff0000feffffffd4fff2ff0b00e4ff01001a00
fbff08000b001e000e0000001100f0ff1a00eeffd3ffdeff0700fafff9ff12001000c5ffbcfff2ff0200e5fff7fff2fff7ff0600e5fff7ffbefffefffdff0300
1200f1fffafffffffefff6fffcfffefffbff63fef7ffecff0300f6ff1100f6ff2400fffff0fffeff14000d001c0010000d000300ffff0500f3fff6ff0c00f9ff
fefffbfffaff5a00fcff0700ffff0300fdff0500f3fffcfff9ffffffe6ff0400d4fff1fffaffffff0f000c000600fffff7ff06000c0005000800ffffe3ff0500
0200faffc8ff1100faff1000f7fff7fffeffd8ffe8ff0800f2fff8ff21000f00e9fff1ff4bfff9ffeffffcfff2fff7fffeffffff0000f6ff08000300aefffbff
60fffbffe3ff040002001b001e0014000100000041001600ffffffff00000b001c0006000000f8ff0800e9ff1000fcfff5ff0800fdfff2fffdff10000b000100
fffff4fff6ff08000a001700fffffaffeefff8ff0700040012002000f9ff0e00f3ff03000e000600feff0800030035002100edfff4fffefffdfff8ff0500e7ff
1f00faff0500fcff0f001300f8ffd9ff00001100fafe08000100f8ff05000c00f8ff0500040011001000e9fffbfff1ff070017000700f7ff0200e4fffbfffcff
0100f0fffefff0fffbff000000000100060084fef7fffffff5ffecfff5ffedffefff0c00c3fffcff0d00e9ffeafffdff0e00f5ffe2fff7ff0e00e6ff05001400
fbff0c000a00ffff0f0000000700f2ff1700ecffdaff0f000000f6fffaff09000f00b9ffd6ffe7fffbfff0fffbfff6fff0ff0500eaff0c00b8fe0700f9ff0800
0900e2fff9ff03000200f7ff0000fffffbff49fffcff31001e00ffff0300fbff14000e000200faff0b00fdff24000b0013000000fcff0700f9ff0f000400f4ff
feff05000000fffffeff0000f9ff0e0010000200eeffe8fff6fffcffefff0600d4fff3ffeeff060008000c000500f1ff14000a000a000d000800faffe1ff1300
feff09000b001100fbff0d00f6ff0d00fdffa5ff3aff0f00fbfff8ff1c000600fcffecff50fef4ffe2ffffffeafe00000c000200fdfff7ff0400060073fffaff
f5ffefff130014000000210012000200feff0a002c000800dbfffffffaff18000a000b00fefffafffdfff0ff1200fdff00000100f9ffeffff5ff030011000500
fcfffefff7ff07001d0011000200f3ff0800fbff000002003000fbfffdff0d00f4ff030028000200080016000f00340037000200f4ff0000fafff6ff0b001500
1d00f6ff0200fdff14000f00f2ffdbffe8ff170007fffeff0000feff0300f0fff1ff0d000b00050013000000fcff0e00060006000300f2ff0b00e9fffbff0000
fafff1fffcff0100030000000900000002004efffeff1700faffe5fff9ffeafff1fffefff6ff0300fdff0500f6fff5ff0d00f6ff86fff7ff1200e5ff02001000
fdff0500170005000300f6ff0b00f5ff1800e7ffbeff22000500f7fff6ff06000d00c1ffd0ffefff0c00f7fff9fff8fff4ff0a001d000900f5fe0b00ebffffff
f4ffc6fff7fffdfffbfff2fffffff4fffdfffcffeefff9ff1c000100e2ff000010000700f8ff0d00fdfff9ff4c000800c2fffcfffcff090000001b000100fbff
f5ff000002000100fdfff9ff0600faff1f0006000d000e000000fdffe3ff0300e5fff3ffecff070000000f001000ebff1e00fdff0a0009001200feffe0ff1c00
faff010031001700fbff0200cdff140000001300eaff1100f0fff7ff0d000400e6fff1ff41fffcffe3ff0500b7fe00000800030000000000faff020044ff0500
0e00e8ff19001900f9ff16001300fdff03000000dbff0a00f7ff0200f5ff1d000600fffffcfff7fffcffedff0b00fbfff7fffafffffff5fff5ff050006001100
faffe5fff9fff1ff0f00ecff0500eeff1d000000daff04003b00edff04001700ecff0e00fffff5ff030007000b0037000900f1fff5fff6fff9fff5ff00000700
0f00fffffaff00000c0010003c00e7fff3ff030021ffecff0100fbff0300e2fff3ff13000600ddff0700fcff0500130008001100f5fffafffbfff0ff0a000000
fefff2ff060001000a0010000500eaff04000000ffff0b000200e0fff8fff7fff6ff02001800060000000500effff7ff0400fdff49fffaff1100f3fff2ff1000
f9ff0400fffffdff0b00fbfffefffeff1300efffccff0700fbfffafff3ffffff1000e1ff4400e1ff0800fbfff7fff8ffeeff0200f2ff0600f4fe1100ebfff7ff
e4ff6effffff05000000c2ffffffc2ff06001400f2fff7ff1a000000faff040025000600f7ff00000200fdfffcfff4fff8fe04000400000004003200fdfff4ff
fbff0800ffff0c00fdff070000000a001e000000e7ff0300fcfff7fff3ff0a00effff9ffceff0500f3ff0b000c00e4ff1e000300f4ff08001000f9ffecff0900
faff050024001700f7fff0ffd3ff1f00f6ff2c00f7ff2300f6fff2ff11000000e2fff8ff03000a00daff100003fffcff1300f7ff0a000100f9ff0c0044fffeff
1600f3ff12001200f6ff20002000fbff0300020077ff0b00d7fffdffffff210001001300f7fff8fffdffe8ff00000000f7fff2ff0600f3fff8ff10000400ffff
f7ffe9fffdfff4ff2700f1ff0400ecff12000300ebff04003c00faff0700210014001200f8ffecff0d0006000a002a000800ccffeefff0ff0a00080006000b00
1300fdfff4ff06001200fcff3400f7fffdfff5ff37ffedff0300fcff0300e1fffeff12000400d3ff04000400010015000c000c00e4fff7fff0fff3ff0e000500
0200efff0b001a00010010000300eeff07002200ffff12000200dbfff7fff3ff0400feff24001100faff0a00fffff9ff1000020059fffaff0b00fdffecff0500
feff0c000500f9ff1900f8ff1f000b001a00f8ffbdff0400f5fff9fffcff040019000300beffedff0a000700faff0800faff0600f8ffffffd7fe1200f2fff7ff
ecffeafefefff9fffcff05000200d5ff02001e00f6fff5ff1d0005000000feff2d000e00fbff000002000900d8fff0ffd7fe030004000c0009003f000100fdff
feff010000001100ffff090013000400270003000c0001000400f8ffe7ff1500dffffdff59ff0500fdff12001a00dfff16000a00f0ff04002400f8ffe9ffe4ff
e7ff2e002d005f00000048003a003100beffc2ff22006200feffd4ff6b004600c5ffc6ffd0ffcdffbaffebff00005b00e4ffddff0200d0ff3c0027009500e7ff
39000f005500070030003a004d0019000200f9ffd3ff7f000900f0ffb6ff34003800ecffdbff2700ffffedff31002e00d2fff5ff0000abff30003100c2fff9ff
eeffd1ffd8ffcdff2d00e7fff8ffdbff2600d9ff0e00f1ff58000900c3003000e6ffe2fff1ffeaff5e005100f7ffb2002400e0ffbdff6e00120012000d004500
ccff24000100c7ff25009c00220071fffcff6c00ffffdefffeffd5ff0a00e6fffdff07001600460005000500edff0200faff6e00aaffe3fff2ffceff8f00eeff
f5ffbefffeff7f0003005000dfffd6ffe5ffc9ffc2ffc9ff1100e5ffffffcdff34002d000a0038006800ebffc8ffffff3400cffff1ff3d003600fdff01008600
c9ff1a000b0050003e0060006900ccffab00c700f2ff0e000500f3ff05005b005200edffb2ff27ff64002100b4ffcaff8cff3100c4ff3200d1ff1300ebff0600
6b00dbff0700b9ffcbffd6ffe1ff4a00ecffbeff0000ceff3a00cfff390001002f0063006d0092006900e4ff1c00c6ffbbffcbfff9ff14000f000b00cb00f1ff
ffff0400350046000f007300ecff2800640009001f000000eefff0ffb1ffceff1500a5ffc1ffba00faff3f008a00e3ff20000a00d7ffffffde00e0ff3b00f9ff
efff0a001400edffeeff9bffe7ffe5ff2500e7ffeffff4fff2ff1e001400e3ff1c00d6ff7e000f000d00eeff7e0089ffefff0f00f1ffefffe3ff82ff82ff1300
a8ffe5fff1ffe4ffe5ff82ff3200f7fff1ff0d0024001300ebffe4ff2500f3ff10001100e5ff0d00edff0f00f6ffb9ffe0ff0e00b2ffd9ffc4fff2ff7e000f00
0d00efff130012000f000c000e00f0ff0e001e00140017007e000e00100036000e00c9ff110013001400f1ff7e007e00efffedff7e007a000c00ebff87ff0f00
7e00e9ffeaffd6fff3ff7800e6ff300011000c001b001500efffebffeeff100010004f001e0082ff1000f0ffeeff1400eaffefff3900e9ffefff4400ecffeaff
1000f0fff0ff1500bfff0a001200edfff1ff7e00daff7e00ecffe4ffbdff13004f00f6ff58004b001000eaff7e00e3fff4ffc1ff1e007c00f1ff2800f3ff82ff
91fff2ff0f00100098ff1300ebffccff8aff380082ff10007c00d2ff26007900f6ffe5ff64009dfff0ff1800c0ffe7ff7e000d0020000b004e007e00f1ff0f00
eeffbcffa3ffe1ffdeffe8ffeaff82ffe4ff7e00edff1b0030001b00f3ffefffe2ff1200450015007e001100edfff2ff4900dcffb7fff6ffb1ff18001c001100
eefff2ffedfff1ff5500edff13000c007e000d00eaff0e00ecffe8ff7e0012009fffc1ffe9ff3100ecfff3ffe5fff1ff1300edfff2fff3ffe9ff1e0012000d00
1000f6ffecff12001300620018001c00ddff190010000c000e00e4ffecff1c00e7ff2b00dcfff0fff3ff1300d2ff7e001000f1ff100012001c007e007c00ecff
54001b000e001b001a007e00ceff09000f00f3ffe0ffedff15001c00daff0d00f0fff0ff1b00f3ff1300f0ff0b0049002000f2ff5500370040000e00d0fff2ff
f3ff1100edffeefff1fff4fff1ff1000f2ffe1ffecffe7ff84fff2ffefffc3fff1ff5700f0ffedffedff100083ff82ff1100130082ff82fff5ff16007800f3ff
dfff180015002c000d0089ff1800c9ffeefff5ffe7ffecff110017001200f0fff0ffc1ffe1ff7d00f0ff10001300ecff16001100c9ff17001000c0ff13001600
f1ff10001000ebff4300f6ffeeff12000f00ddff2800e0ff14001c004b00ecffafff0a00b0ffb2fff1ff1400adff1c000c004700e6ff82ff1000d9ff0d007d00
6f000e00f1fff0ff6200ecff14003a007600c7ff7e00efff82ff3800daff83ff0a001900a6ff63001100e9ff4e001a0082fff3ffe3fff4ffbbff90ff0e00f1ff
11003e005d007e0022001a0017007e001a00dfff1300e7ffd1ffe4ff0d0012001c00eeffbaffebff8bffeeff11000d00c6ff7e005e000a005600eaffe3ffeeff
13000f0012000f00aaff1300ecfff5ff82fff3ff1600f1ff1300190082ffedff6b0043001800ceff14000d001a000e00eeff15000e000d001500e2ffedfff4ff
1d0562756c6c657462756c6c657462756c6c657462756c6c657462756c6c657462756c6c657462756c6c657462756c6c657462756c6c657462756c6c65746275`;

//}}}
//{{{  getWeightsBuffer

function getWeightsBuffer() {

  if (NET_LOCAL === 0)
    return fs.readFileSync(NET_WEIGHTS_FILE);

  const hex = WEIGHTS_HEX.replace(/\s+/g, "");


  if (typeof Buffer !== 'undefined' && Buffer.from) {
    return Buffer.from(hex, 'hex');
  }

  const n = hex.length >> 1;
  const bytes = new Uint8Array(n);
  for (let i = 0, j = 0; j < n; i += 2, j++) {
    bytes[j] = parseInt(hex.slice(i, i + 2), 16);
  }

  return bytes;

}

//}}}

function netLoad () {

  let offset = 0;

  const buffer = getWeightsBuffer();

  const dataView = new Int16Array(
    buffer.buffer,
    buffer.byteOffset,
    buffer.byteLength >> 1
  );

  for (let i = 0; i < NET_I_SIZE; i++) {
    const lozIndex = bullet2lozza(i);
    const h = i * NET_H1_SIZE;
    for (let j = 0; j < NET_H1_SIZE; j++) {
      net_h1_w_flat[lozIndex            * NET_H1_SIZE + j] = dataView[h + j];  // us
      net_h2_w_flat[flipIndex(lozIndex) * NET_H1_SIZE + j] = dataView[h + j];  // them
    }
  }

  offset += NET_I_SIZE * NET_H1_SIZE;
  for (let i = 0; i < NET_H1_SIZE; i++) {
    net_h1_b[i] = dataView[offset + i];
  }

  offset += NET_H1_SIZE;
  for (let i = 0; i < NET_H1_SIZE * 2; i++) {
    net_o_w[i] = dataView[offset + i];
  }

  offset += NET_H1_SIZE * 2;
  net_o_b = dataView[offset];

}

//}}}

//{{{  netMove

function netMove () {

  const frObj = ueArgs0 << 8;
  const from  = ueArgs1 | 0;
  const to    = ueArgs2 | 0;

  const map = IMAP;
  const h1w = net_h1_w_flat, h2w = net_h2_w_flat;
  const h1a = net_h1_a, h2a = net_h2_a;

  const N = NET_H1_SIZE | 0;

  let h = 0;
  let p1 = map[frObj + from] | 0;
  let p2 = map[frObj + to]   | 0;

  while (h < N) {
    h1a[h] += h1w[p2] - h1w[p1];
    h2a[h] += h2w[p2] - h2w[p1];
    h++; p1++; p2++;
  }

}

//}}}
//{{{  netCapture

function netCapture () {

  const frObj = ueArgs0 << 8;
  const fr    = ueArgs1 | 0;
  const toObj = ueArgs2 << 8;
  const to    = ueArgs3 | 0;

  const map = IMAP;
  const h1w = net_h1_w_flat, h2w = net_h2_w_flat;
  const h1a = net_h1_a, h2a = net_h2_a;

  const N = NET_H1_SIZE | 0;

  let h = 0;
  let p1 = map[frObj + fr] | 0;
  let p2 = map[toObj + to] | 0;
  let p3 = map[frObj + to] | 0;

  while (h < N) {
    h1a[h] += h1w[p3] - h1w[p2] - h1w[p1];
    h2a[h] += h2w[p3] - h2w[p2] - h2w[p1];
    h++; p1++; p2++; p3++;
  }

}

//}}}
//{{{  netPromote

function netPromote () {

  const pawnObj    = ueArgs0 << 8;
  const pawnFr     = ueArgs1 | 0;
  const pawnTo     = ueArgs2 | 0;
  const captureObj = ueArgs3 << 8;
  const promoteObj = ueArgs4 << 8;

  const map = IMAP;
  const h1w = net_h1_w_flat, h2w = net_h2_w_flat;
  const h1a = net_h1_a, h2a = net_h2_a;

  const N = NET_H1_SIZE | 0;

  let h = 0;
  let p1 = map[pawnObj    + pawnFr] | 0;
  let p2 = map[promoteObj + pawnTo] | 0;

  if (captureObj !== 0) {
    let p3 = map[captureObj + pawnTo] | 0;
    while (h < N) {
      h1a[h] += h1w[p2] - h1w[p1] - h1w[p3];
      h2a[h] += h2w[p2] - h2w[p1] - h2w[p3];
      h++; p1++; p2++; p3++;
    }
  }
  else {
    while (h < N) {
      h1a[h] += h1w[p2] - h1w[p1];
      h2a[h] += h2w[p2] - h2w[p1];
      h++; p1++; p2++;
    }
  }

}

//}}}
//{{{  netEpCapture

function netEpCapture () {

  const pawnObj        = ueArgs0 << 8;
  const pawnFr         = ueArgs1 | 0;
  const pawnTo         = ueArgs2 | 0;
  const pawnCaptureObj = ueArgs3 << 8;
  const ep             = ueArgs4 | 0;

  const map = IMAP;
  const h1w = net_h1_w_flat, h2w = net_h2_w_flat;
  const h1a = net_h1_a, h2a = net_h2_a;

  const N = NET_H1_SIZE | 0;

  let h = 0;
  let p1 = map[pawnObj        + pawnFr] | 0;
  let p2 = map[pawnObj        + pawnTo] | 0;
  let p3 = map[pawnCaptureObj + ep] | 0;

  while (h < N) {
    h1a[h] += h1w[p2] - h1w[p1] - h1w[p3];
    h2a[h] += h2w[p2] - h2w[p1] - h2w[p3];
    h++; p1++; p2++; p3++;
  }

}

//}}}
//{{{  netCastle

function netCastle () {

  const kingObj = ueArgs0 << 8;
  const kingFr  = ueArgs1 | 0;
  const kingTo  = ueArgs2 | 0;
  const rookObj = ueArgs3 << 8;
  const rookFr  = ueArgs4 | 0;
  const rookTo  = ueArgs5 | 0;

  const map = IMAP;
  const h1w = net_h1_w_flat, h2w = net_h2_w_flat;
  const h1a = net_h1_a, h2a = net_h2_a;

  const N = NET_H1_SIZE | 0;

  let h = 0;
  let p1 = map[kingObj + kingFr] | 0;
  let p2 = map[kingObj + kingTo] | 0;
  let p3 = map[rookObj + rookFr] | 0;
  let p4 = map[rookObj + rookTo] | 0;

  while (h < N) {
    h1a[h] += h1w[p2] - h1w[p1] + h1w[p4] - h1w[p3];
    h2a[h] += h2w[p2] - h2w[p1] + h2w[p4] - h2w[p3];
    h++; p1++; p2++; p3++; p4++;
  }

}

//}}}

//{{{  flipIndex
//
// Slow. Only use during init.
//

function flipIndex (index) {

  const piece         = Math.floor(index / 64);
  const square        = index % 64;
  const flippedSquare = square ^ 56;
  const flippedPiece  = (piece + 6) % 12;
  const flippedIndex  = flippedPiece * 64 + flippedSquare;

  return flippedIndex;

}

//}}}
//{{{  bullet2lozza
//
// bullet index 0 is a1. Lozza index 0 is a8.
// The piece order is the same.
// Apply this when loading the weights from the bullet .bin file.
//
// Slow. Only use during init.
//

function bullet2lozza (index) {

  const piece        = Math.floor(index / 64);
  const bulletSquare = index % 64;
  const lozzaSquare  = bulletSquare ^ 56;          // map a1 to a8 etc
  const lozzaIndex   = piece * 64 + lozzaSquare;

  return lozzaIndex;

}

//}}}

//}}}
//{{{  board

const bdB = new Uint8Array(144);    // pieces
const bdZ = new Uint8Array(144);    // pointers to w|bList

let bdTurn   = 0;
let bdRights = 0;
let bdEp     = 0;

const wList = new Uint8Array(16);
const bList = new Uint8Array(16);

const wbList = [wList, bList];

const wCounts = new Uint8Array(7);
const bCounts = new Uint8Array(7);

let wCount = 0;
let bCount = 0;

const objHistory = new Uint32Array(15 * 256);

//{{{  zobrists

//{{{  prng
//
// https://en.wikipedia.org/wiki/Mersenne_Twister
//

let twisterList  = new Uint32Array(624);
let twisterIndex = 0;

function twisterInit(seed) {

  const mt = twisterList;

  mt[0] = seed >>> 0;

  for (let i = 1; i < 624; i++) {
    mt[i] = (0x6C078965 * (mt[i - 1] ^ (mt[i - 1] >>> 30)) + i) >>> 0;
  }
}

function twisterFill() {

  const mt = twisterList;

  for (let i = 0; i < 624; i++) {
    let y = (mt[i] & 0x80000000) + (mt[(i + 1) % 624] & 0x7FFFFFFF);
    mt[i] = mt[(i + 397) % 624] ^ (y >>> 1);
    if (y % 2 !== 0) {
      mt[i] ^= 0x9908B0DF;
    }
  }
}

function twisterRand() {

  const mt = twisterList;

  if (twisterIndex === 0)
    twisterFill();

  let y = mt[twisterIndex];
  y ^= y >>> 11;
  y ^= (y << 7)  & 0x9D2C5680;
  y ^= (y << 15) & 0xEFC60000;
  y ^= y >>> 18;

  twisterIndex = (twisterIndex + 1) % 624;

  return y >>> 0;
}

twisterInit(0x9E3779B9);

//}}}

let loTurn = twisterRand();
let hiTurn = twisterRand();

const loObjPieces = new Int32Array(15 * 256);
const hiObjPieces = new Int32Array(15 * 256);

for (let i=0; i < 15 * 256; i++) {
  loObjPieces[i] = twisterRand();
  hiObjPieces[i] = twisterRand();
}

const loRights = new Int32Array(16);
const hiRights = new Int32Array(16);

for (let i=0; i < 16; i++) {
  loRights[i] = twisterRand();
  hiRights[i] = twisterRand();
}

const loEP = new Int32Array(144);
const hiEP = new Int32Array(144);

for (let i=0; i < 144; i++) {
  loEP[i] = twisterRand();
  hiEP[i] = twisterRand();
}

//}}}
//{{{  tt

const ttLo    = new Int32Array(TTSIZE);
const ttHi    = new Int32Array(TTSIZE);
const ttType  = new Uint8Array(TTSIZE);
const ttDepth = new Int8Array(TTSIZE);
const ttMove  = new Uint32Array(TTSIZE);
const ttEval  = new Int16Array(TTSIZE);
const ttScore = new Int16Array(TTSIZE);

let ttHashUsed = 0;

//{{{  ttPut

function ttPut (type, depth, score, move, ply, alpha, beta, ev) {

  const idx = loHash & TTMASK;

  if (depth === 0 && ttType[idx] !== TT_EMPTY && ttDepth[idx] > 0)
    return;

  if (ttType[idx] === TT_EMPTY)
    ttHashUsed++;

  if (score <= -MINMATE && score >= -MATE)
    score -= ply;

  else if (score >= MINMATE && score <= MATE)
    score += ply;

  ttLo[idx]    = loHash;
  ttHi[idx]    = hiHash;
  ttType[idx]  = type;
  ttDepth[idx] = depth;
  ttScore[idx] = score;
  ttEval[idx]  = ev;

  if (move !== 0)
    ttMove[idx] = move & MOVE_CLEAN_MASK;

}

//}}}
//{{{  ttGet

function ttGet (node, depth, alpha, beta) {

  const idx   = loHash & TTMASK;
  const type  = ttType[idx];

  node.hashMove = 0;
  node.hashEval = INFINITY;

  if (type === TT_EMPTY)
    return TTSCORE_UNKNOWN;

  const lo = ttLo[idx];
  const hi = ttHi[idx];

  if (lo !== loHash || hi !== hiHash)
    return TTSCORE_UNKNOWN;

  //
  // Set the hash move before the depth check
  // so that iterative deepening works.
  //

  if (ttValidate(ttMove[idx]) !== 0)
    node.hashMove = ttMove[idx];

  node.hashEval = ttEval[idx];

  if (ttDepth[idx] < depth)
    return TTSCORE_UNKNOWN;

  var score = ttScore[idx];

  if (score <= -MINMATE && score >= -MATE)
    score += node.ply;

  else if (score >= MINMATE && score <= MATE)
    score -= node.ply;

  if (type === TT_EXACT)
    return score;

  if (type === TT_ALPHA && score <= alpha)
    return score;

  if (type === TT_BETA && score >= beta)
    return score;

  return TTSCORE_UNKNOWN;

}

//}}}
//{{{  ttUpdateEval

function ttUpdateEval (ev) {

  const idx = loHash & TTMASK;

  if (ttType[idx] !== TT_EMPTY && ttLo[idx] === loHash && ttHi[idx] === hiHash)
    ttEval[idx] = ev;

}

//}}}
//{{{  ttInit

function ttInit () {

  ttType.fill(TT_EMPTY);
  ttMove.fill(0);

  ttHashUsed = 0;

}

//}}}
//{{{  ttValidate

function ttValidate (move) {

  const b = bdB;

  const fr    = (move & MOVE_FR_MASK   ) >>> MOVE_FR_BITS;
  const frObj = (move & MOVE_FROBJ_MASK) >>> MOVE_FROBJ_BITS;

  if (b[fr] !== frObj)
    return 0;

  const to    = (move & MOVE_TO_MASK   ) >>> MOVE_TO_BITS;
  const toObj = (move & MOVE_TOOBJ_MASK) >>> MOVE_TOOBJ_BITS;

  if (b[to] !== toObj)
    return 0;

  return 1;

}

//}}}

//}}}
//{{{  hash

let loHash = 0;
let hiHash = 0;

let repLo = 0;
let repHi = 0;

const repLoHash = new Int32Array(1024);
const repHiHash = new Int32Array(1024);

//}}}

//{{{  position

function position (bd, turn, rights, ep, moves) {

  for (let i=0; i < nodes.length; i++)
    initNode(nodes[i]);

  loHash = 0;
  hiHash = 0;

  //{{{  turn
  
  if (turn == 'w')
    bdTurn = WHITE;
  
  else {
    bdTurn = BLACK;
    loHash ^= loTurn;
    hiHash ^= hiTurn;
  }
  
  //}}}
  //{{{  rights
  
  bdRights = 0;
  
  for (let i=0; i < rights.length; i++) {
  
    var ch = rights.charAt(i);
  
    if (ch == 'K') bdRights |= WHITE_RIGHTS_KING;
    if (ch == 'Q') bdRights |= WHITE_RIGHTS_QUEEN;
    if (ch == 'k') bdRights |= BLACK_RIGHTS_KING;
    if (ch == 'q') bdRights |= BLACK_RIGHTS_QUEEN;
  }
  
  loHash ^= loRights[bdRights];
  hiHash ^= hiRights[bdRights];
  
  //}}}
  //{{{  board
  
  bdB.fill(EDGE);
  
  for (var i=0; i < B88.length; i++)
    bdB[B88[i]] = 0;
  
  bdZ.fill(NO_Z);
  
  wCounts.fill(0);
  bCounts.fill(0);
  
  wList.fill(EMPTY);
  bList.fill(EMPTY);
  
  wCount = 1;
  bCount = 1;
  
  let sq = 0;
  
  for (let j=0; j < bd.length; j++) {
  
    const ch  = bd.charAt(j);
    const chn = parseInt(ch);
  
    while (bdB[sq] === EDGE)
      sq++;
  
    if (isNaN(chn)) {
  
      if (ch != '/') {
  
        const obj   = MAP[ch];
        const piece = obj & PIECE_MASK;
        const col   = obj & COLOR_MASK;
  
        bdB[sq] = obj;
  
        if (col === WHITE) {
          if (piece === KING) {
            wList[0] = sq;
            bdZ[sq] = 0;
            wCounts[KING]++;
          }
          else {
            wList[wCount] = sq;
            bdZ[sq] = wCount;
            wCounts[piece]++;
            wCount++;
          }
        }
  
        else {
          if (piece === KING) {
            bList[0] = sq;
            bdZ[sq] = 0;
            bCounts[KING]++;
          }
          else {
            bList[bCount] = sq;
            bdZ[sq] = bCount;
            bCounts[piece]++;
            bCount++;
          }
        }
  
        loHash ^= loObjPieces[(obj << 8) + sq];
        hiHash ^= hiObjPieces[(obj << 8) + sq];
  
        sq++;
      }
    }
  
    else {
  
      for (let k=0; k < chn; k++) {
        bdB[sq] = 0;
        sq++;
      }
    }
  
  }
  
  //}}}
  //{{{  ep
  
  if (ep.length === 2)
    bdEp = COORDS.indexOf(ep)
  else
    bdEp = 0;
  
  loHash ^= loEP[bdEp];
  hiHash ^= hiEP[bdEp];
  
  //}}}

  repLo = 0;
  repHi = 0;

  for (let i=0; i < moves.length; i++) {
    //{{{  play move
    
    const moveStr = moves[i];
    
    let move = 0;
    
    genMoves(rootNode, bdTurn);
    
    while ((move = getNextMove(rootNode)) !== 0) {
    
      const moveStr2 = formatMove(move);
    
      if (moveStr == moveStr2) {
        makeMoveA(rootNode, move);
        bdTurn ^= COLOR_MASK;
        break;
      }
    
    }
    
    //}}}
  }

  //{{{  compact
  
  const wList2 = new Uint8Array(16);
  const bList2 = new Uint8Array(16);
  
  let next = 0;
  
  for (let i=0; i < 16; i++) {
    const sq = wList[i];
    if (sq) {
      bdZ[sq] = next;
      wList2[next++] = sq;
    }
  }
  
  wList.set(wList2);
  
  next = 0;
  
  for (let i=0; i < 16; i++) {
    const sq = bList[i];
    if (sq) {
      bdZ[sq] = next;
      bList2[next++] = sq;
    }
  }
  
  bList.set(bList2);
  
  //}}}
  //{{{  ue
  
  net_h1_a.set(net_h1_b);
  net_h2_a.set(net_h1_b);
  
  for (let sq=0; sq < 64; sq++) {
  
    const fr    = B88[sq];
    const frObj = bdB[fr];
  
    if (frObj === 0)
      continue;
  
    const off1 = IMAP[(frObj << 8) + fr];
  
    for (let h=0; h < NET_H1_SIZE; h++) {
      const idx1 = off1 + h;
      net_h1_a[h] += net_h1_w_flat[idx1];
      net_h2_a[h] += net_h2_w_flat[idx1];
    }
  
  }
  
  //}}}

  initNode(rootNode);
  objHistory.fill(BASE_HISSLIDE);

}

//}}}
//{{{  genMoves

function genMoves (node, turn) {

  node.stage       = 0;
  node.numMoves    = 0;
  node.numMoves2   = 0;
  node.sortedIndex = 0;

  const b = bdB;
  const inCheck = node.inCheck;

  //{{{  colour based stuff
  
  if (turn === WHITE) {
  
    var offsetOrth  = -12;
    var offsetDiag1 = -13;
    var offsetDiag2 = -11;
    var homeRank    = 2;
    var promoteRank = 7;
    var rights      = bdRights & WHITE_RIGHTS;
    var pList       = wList;
    var theirKingSq = bList[0];
    var pCount      = wCount;
    var CAPTURE     = IS_BNK;
    var aligned     = ALIGNED[wList[0]];
  
    if (inCheck === 0 && rights !== 0) {
  
      if (((rights & WHITE_RIGHTS_KING) !== 0) && b[F1] === 0 && b[G1] === 0 && b[SQG2] !== B_KING && b[SQH2] !== B_KING && isAttacked(F1,BLACK) === 0)
        addCastle(node, MOVE_E1G1);
  
      if (((rights & WHITE_RIGHTS_QUEEN) !== 0) && b[B1] === 0 && b[C1] === 0 && b[D1] === 0 && b[SQB2] !== B_KING && b[SQC2] !== B_KING && isAttacked(D1,BLACK) === 0)
        addCastle(node, MOVE_E1C1);
    }
  
  }
  
  else {
  
    var offsetOrth  = 12;
    var offsetDiag1 = 13;
    var offsetDiag2 = 11;
    var homeRank    = 7;
    var promoteRank = 2;
    var rights      = bdRights & BLACK_RIGHTS;
    var pList       = bList;
    var theirKingSq = wList[0];
    var pCount      = bCount;
    var CAPTURE     = IS_WNK;
    var aligned     = ALIGNED[bList[0]];
  
    if (inCheck === 0 && rights !== 0) {
  
      if (((rights & BLACK_RIGHTS_KING) !== 0) && b[F8] === 0 && b[G8] === 0 && b[SQG7] !== B_KING && b[SQH7] !== B_KING && isAttacked(F8,WHITE) === 0)
        addCastle(node, MOVE_E8G8);
  
      if (((rights & BLACK_RIGHTS_QUEEN) !== 0) && b[B8] === 0 && b[C8] === 0 && b[D8] === 0 && b[SQB7] !== B_KING && b[SQC7] !== B_KING && isAttacked(D8,WHITE) === 0)
        addCastle(node, MOVE_E8C8);
    }
  
  }
  
  //}}}

  let next   = 0;
  let count  = 0;
  let to     = 0;
  let toObj  = 0;
  let myMove = 0;

  while (count < pCount) {

    const fr = pList[next];
    if (fr === 0) {
      next++;
      continue;
    }

    const frObj     = b[fr];
    const frPiece   = frObj & PIECE_MASK;
    const frMove    = (frObj << MOVE_FROBJ_BITS) | (fr << MOVE_FR_BITS);
    const frRank    = RANK[fr];
    const legalMask = inCheck === 0 && aligned[fr] === 0 ? MOVE_LEGAL_MASK : 0;

    switch (frPiece) {
      case 1: {
        //{{{  P
        
        //{{{  orth
        
        to    = fr + offsetOrth;
        toObj = b[to];
        
        if (toObj === 0) {
        
          if (frRank === promoteRank)
            addPromotion(node, frMove | to | legalMask);
        
          else {
            addSlide(node, frMove | to | legalMask);
        
            if (frRank === homeRank) {
        
              to += offsetOrth;
              if (b[to] === 0)
                addSlide(node, frMove | to | MOVE_EPMAKE_MASK | legalMask);
            }
          }
        
        }
        
        //}}}
        //{{{  diag1
        
        to    = fr + offsetDiag1;
        toObj = b[to];
        
        if (CAPTURE[toObj] !== 0) {
        
          if (frRank === promoteRank)
            addPromotion(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to | legalMask);
          else
            addCapture(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to | legalMask);
        }
        
        else if (toObj === 0 && to === bdEp)
          addEPTake(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        //}}}
        //{{{  diag2
        
        to    = fr + offsetDiag2;
        toObj = b[to];
        
        if (CAPTURE[toObj] !== 0) {
        
          if (frRank === promoteRank)
            addPromotion(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to | legalMask);
          else
            addCapture(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to | legalMask);
        }
        
        else if (toObj === 0 && to === bdEp)
          addEPTake(node, frMove | to);
        
        //}}}
        
        break;
        
        //}}}
      }
      case 2: {
        //{{{  N
        
        myMove = frMove | legalMask;
        
        to = fr + 25;
        if ((toObj = b[to]) === 0)
          addSlide(node, myMove | to);
        else if (CAPTURE[toObj] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 25;
        if ((toObj = b[to]) === 0)
          addSlide(node, myMove | to);
        else if (CAPTURE[toObj] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr + 23;
        if ((toObj = b[to]) === 0)
          addSlide(node, myMove | to);
        else if (CAPTURE[toObj] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 23;
        if ((toObj = b[to]) === 0)
          addSlide(node, myMove | to);
        else if (CAPTURE[toObj] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr + 14;
        if ((toObj = b[to]) === 0)
          addSlide(node, myMove | to);
        else if (CAPTURE[toObj] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 14;
        if ((toObj = b[to]) === 0)
          addSlide(node, myMove | to);
        else if (CAPTURE[toObj] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr + 10;
        if ((toObj = b[to]) === 0)
          addSlide(node, myMove | to);
        else if (CAPTURE[toObj] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 10;
        if ((toObj = b[to]) === 0)
          addSlide(node, myMove | to);
        else if (CAPTURE[toObj] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        break;
        
        //}}}
      }
      case 3: {
        //{{{  B
        
        myMove = frMove | legalMask;
        
        to = fr + 11;
        while (b[to] === 0)
          addSlide(node, myMove | to), to += 11;
        if (CAPTURE[toObj = b[to]] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 11;
        while (b[to] === 0)
          addSlide(node, myMove | to), to -= 11;
        if (CAPTURE[toObj = b[to]] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr + 13;
        while (b[to] === 0)
          addSlide(node, myMove | to), to += 13;
        if (CAPTURE[toObj = b[to]] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 13;
        while (b[to] === 0)
          addSlide(node, myMove | to), to -= 13;
        if (CAPTURE[toObj = b[to]] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        break;
        
        //}}}
      }
      case 4: {
        //{{{  R
        
        myMove = frMove | legalMask;
        
        to = fr + 1;
        while (b[to] === 0)
          addSlide(node, myMove | to), to += 1;
        if (CAPTURE[toObj = b[to]] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 1;
        while (b[to] === 0)
          addSlide(node, myMove | to), to -= 1;
        if (CAPTURE[toObj = b[to]] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr + 12;
        while (b[to] === 0)
          addSlide(node, myMove | to), to += 12;
        if (CAPTURE[toObj = b[to]] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 12;
        while (b[to] === 0)
          addSlide(node, myMove | to), to -= 12;
        if (CAPTURE[toObj = b[to]] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        break;
        
        //}}}
      }
      case 5: {
        //{{{  B
        
        myMove = frMove | legalMask;
        
        to = fr + 11;
        while (b[to] === 0)
          addSlide(node, myMove | to), to += 11;
        if (CAPTURE[toObj = b[to]] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 11;
        while (b[to] === 0)
          addSlide(node, myMove | to), to -= 11;
        if (CAPTURE[toObj = b[to]] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr + 13;
        while (b[to] === 0)
          addSlide(node, myMove | to), to += 13;
        if (CAPTURE[toObj = b[to]] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 13;
        while (b[to] === 0)
          addSlide(node, myMove | to), to -= 13;
        if (CAPTURE[toObj = b[to]] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        //}}}
        //{{{  R
        
        myMove = frMove | legalMask;
        
        to = fr + 1;
        while (b[to] === 0)
          addSlide(node, myMove | to), to += 1;
        if (CAPTURE[toObj = b[to]] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 1;
        while (b[to] === 0)
          addSlide(node, myMove | to), to -= 1;
        if (CAPTURE[toObj = b[to]] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr + 12;
        while (b[to] === 0)
          addSlide(node, myMove | to), to += 12;
        if (CAPTURE[toObj = b[to]] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 12;
        while (b[to] === 0)
          addSlide(node, myMove | to), to -= 12;
        if (CAPTURE[toObj = b[to]] !== 0)
          addCapture(node, myMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        break;
        
        //}}}
      }
      case 6: {
        //{{{  K
        
        to = fr + 11;
        if (ADJACENT[Math.abs(to-theirKingSq)] === 0) {
          if ((toObj = b[to]) === 0)
            addSlide(node, frMove | to);
          else if (CAPTURE[toObj] !== 0)
            addCapture(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        }
        
        to = fr - 11;
        if (ADJACENT[Math.abs(to-theirKingSq)] === 0) {
          if ((toObj = b[to]) === 0)
            addSlide(node, frMove | to);
          else if (CAPTURE[toObj] !== 0)
            addCapture(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        }
        
        to = fr + 13;
        if (ADJACENT[Math.abs(to-theirKingSq)] === 0) {
          if ((toObj = b[to]) === 0)
            addSlide(node, frMove | to);
          else if (CAPTURE[toObj] !== 0)
            addCapture(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        }
        
        to = fr - 13;
        if (ADJACENT[Math.abs(to-theirKingSq)] === 0) {
          if ((toObj = b[to]) === 0)
            addSlide(node, frMove | to);
          else if (CAPTURE[toObj] !== 0)
            addCapture(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        }
        
        to = fr + 1;
        if (ADJACENT[Math.abs(to-theirKingSq)] === 0) {
          if ((toObj = b[to]) === 0)
            addSlide(node, frMove | to);
          else if (CAPTURE[toObj] !== 0)
            addCapture(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        }
        
        to = fr - 1;
        if (ADJACENT[Math.abs(to-theirKingSq)] === 0) {
          if ((toObj = b[to]) === 0)
            addSlide(node, frMove | to);
          else if (CAPTURE[toObj] !== 0)
            addCapture(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        }
        
        to = fr + 12;
        if (ADJACENT[Math.abs(to-theirKingSq)] === 0) {
          if ((toObj = b[to]) === 0)
            addSlide(node, frMove | to);
          else if (CAPTURE[toObj] !== 0)
            addCapture(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        }
        
        to = fr - 12;
        if (ADJACENT[Math.abs(to-theirKingSq)] === 0) {
          if ((toObj = b[to]) === 0)
            addSlide(node, frMove | to);
          else if (CAPTURE[toObj] !== 0)
            addCapture(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        }
        
        break;
        
        //}}}
      }
    }

    next++;
    count++

  }
}

//}}}
//{{{  genQMoves

function genQMoves (node, turn) {

  node.stage       = 0;
  node.numMoves    = 0;
  node.numMoves2   = 0;
  node.sortedIndex = 0;

  const b = bdB;

  //{{{  colour based stuff
  
  if (turn === WHITE) {
  
    var offsetOrth  = -12;
    var offsetDiag1 = -13;
    var offsetDiag2 = -11;
    var promoteRank = 7;
    var pList       = wList;
    var theirKingSq = bList[0];
    var pCount      = wCount;
    var CAPTURE     = IS_BNK;
  
  }
  
  else {
  
    var offsetOrth  = 12;
    var offsetDiag1 = 13;
    var offsetDiag2 = 11;
    var promoteRank = 2;
    var pList       = bList;
    var theirKingSq = wList[0];
    var pCount      = bCount;
    var CAPTURE     = IS_WNK;
  
  }
  
  //}}}

  let next  = 0;
  let count = 0;
  let to    = 0;
  let toObj = 0;

  while (count < pCount) {

    const fr = pList[next];
    if (fr === 0) {
      next++;
      continue;
    }

    const frObj   = b[fr];
    const frPiece = frObj & PIECE_MASK;
    const frMove  = (frObj << MOVE_FROBJ_BITS) | (fr << MOVE_FR_BITS);
    const frRank  = RANK[fr];

    switch (frPiece) {
      case 1: {
        //{{{  P
        
        //{{{  orth
        
        to    = fr + offsetOrth;
        toObj = b[to];
        
        if (toObj === 0) {
        
          if (frRank === promoteRank)
            addQPromotion(node, MOVE_PROMOTE_MASK | frMove | to);
        
        }
        
        //}}}
        //{{{  diag1
        
        to    = fr + offsetDiag1;
        toObj = b[to];
        
        if (CAPTURE[toObj] !== 0) {
        
          if (frRank === promoteRank)
            addQPromotion(node, MOVE_PROMOTE_MASK | frMove | (toObj << MOVE_TOOBJ_BITS) | to);
          else
            addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        }
        
        else if (toObj === 0 && to === bdEp)
          addQMove(node, MOVE_EPTAKE_MASK | frMove | to);
        
        //}}}
        //{{{  diag2
        
        to    = fr + offsetDiag2;
        toObj = b[to];
        
        if (CAPTURE[toObj] !== 0) {
        
          if (frRank === promoteRank)
            addQPromotion(node, MOVE_PROMOTE_MASK | frMove | (toObj << MOVE_TOOBJ_BITS) | to);
          else
            addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        }
        
        else if (toObj === 0 && to === bdEp)
          addQMove(node, MOVE_EPTAKE_MASK | frMove | to);
        
        //}}}
        
        break;
        
        //}}}
      }
      case 2: {
        //{{{  N
        
        to = fr + 25;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 25;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr + 23;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 23;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr + 14;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 14;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr + 10;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 10;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        break;
        
        //}}}
      }
      case 3: {
        //{{{  B
        
        to = fr + 11;
        while (b[to] === 0)
          to += 11;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 11;
        while (b[to] === 0)
          to -= 11;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr + 13;
        while (b[to] === 0)
          to += 13;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 13;
        while (b[to] === 0)
          to -= 13;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        break;
        
        //}}}
      }
      case 4: {
        //{{{  R
        
        to = fr + 1;
        while (b[to] === 0)
          to += 1;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 1;
        while (b[to] === 0)
          to -= 1;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr + 12;
        while (b[to] === 0)
          to += 12;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 12;
        while (b[to] === 0)
          to -= 12;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        break;
        
        //}}}
      }
      case 5: {
        //{{{  B
        
        to = fr + 11;
        while (b[to] === 0)
          to += 11;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 11;
        while (b[to] === 0)
          to -= 11;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr + 13;
        while (b[to] === 0)
          to += 13;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 13;
        while (b[to] === 0)
          to -= 13;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        //}}}
        //{{{  R
        
        to = fr + 1;
        while (b[to] === 0)
          to += 1;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 1;
        while (b[to] === 0)
          to -= 1;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr + 12;
        while (b[to] === 0)
          to += 12;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 12;
        while (b[to] === 0)
          to -= 12;
        if (CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        break;
        
        //}}}
      }
      case 6: {
        //{{{  K
        
        to = fr + 11;
        if (ADJACENT[Math.abs(to-theirKingSq)] === 0 && CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 11;
        if (ADJACENT[Math.abs(to-theirKingSq)] === 0 && CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr + 13;
        if (ADJACENT[Math.abs(to-theirKingSq)] === 0 && CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 13;
        if (ADJACENT[Math.abs(to-theirKingSq)] === 0 && CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr + 1;
        if (ADJACENT[Math.abs(to-theirKingSq)] === 0 && CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 1;
        if (ADJACENT[Math.abs(to-theirKingSq)] === 0 && CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr + 12;
        if (ADJACENT[Math.abs(to-theirKingSq)] === 0 && CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        to = fr - 12;
        if (ADJACENT[Math.abs(to-theirKingSq)] === 0 && CAPTURE[toObj = b[to]] !== 0)
          addQMove(node, frMove | (toObj << MOVE_TOOBJ_BITS) | to);
        
        break;
        
        //}}}
      }
    }

    next++;
    count++
  }

}

//}}}
//{{{  makeMoveA

function makeMoveA (node, move) {

  const b = bdB;
  const z = bdZ;

  const fr      = (move & MOVE_FR_MASK   ) >>> MOVE_FR_BITS;
  const to      = (move & MOVE_TO_MASK   ) >>> MOVE_TO_BITS;
  const toObj   = (move & MOVE_TOOBJ_MASK) >>> MOVE_TOOBJ_BITS;
  const frObj   = (move & MOVE_FROBJ_MASK) >>> MOVE_FROBJ_BITS;
  const frPiece = frObj & PIECE_MASK;
  const frCol   = frObj & COLOR_MASK;

  //{{{  slide piece
  
  b[fr] = 0;
  b[to] = frObj;
  
  node.frZ = z[fr];
  node.toZ = z[to];
  
  z[fr] = NO_Z;
  z[to] = node.frZ;
  
  loHash ^= loObjPieces[(frObj << 8) + fr];
  hiHash ^= hiObjPieces[(frObj << 8) + fr];
  
  loHash ^= loObjPieces[(frObj << 8) + to];
  hiHash ^= hiObjPieces[(frObj << 8) + to];
  
  wbList[frCol >>> 3][node.frZ] = to;
  
  //}}}
  //{{{  clear rights?
  
  if (bdRights !== 0) {
  
    loHash ^= loRights[bdRights];
    hiHash ^= hiRights[bdRights];
  
    bdRights &= MASK_RIGHTS[fr] & MASK_RIGHTS[to];
  
    loHash ^= loRights[bdRights];
    hiHash ^= hiRights[bdRights];
  
  }
  
  //}}}
  //{{{  capture?
  
  if (toObj !== 0) {
  
    const toPiece = toObj & PIECE_MASK;
    const toCol   = toObj & COLOR_MASK;
  
    loHash ^= loObjPieces[(toObj << 8) + to];
    hiHash ^= hiObjPieces[(toObj << 8) + to];
  
    if (toCol === WHITE) {
  
      wList[node.toZ] = EMPTY;
  
      wCounts[toPiece]--;
      wCount--;
    }
  
    else {
  
      bList[node.toZ] = EMPTY;
  
      bCounts[toPiece]--;
      bCount--;
    }
  
    ueFunc  = netCapture;
    ueArgs0 = frObj;
    ueArgs1 = fr;
    ueArgs2 = toObj;
    ueArgs3 = to;
  
  }
  
  else {
  
    ueFunc  = netMove;
    ueArgs0 = frObj;
    ueArgs1 = fr;
    ueArgs2 = to;
  
  }
  
  //}}}
  //{{{  reset EP
  
  loHash ^= loEP[bdEp];
  hiHash ^= hiEP[bdEp];
  
  bdEp = 0;
  
  loHash ^= loEP[bdEp];
  hiHash ^= hiEP[bdEp];
  
  //}}}

  if ((move & MOVE_SPECIAL_MASK) !== 0) {
    //{{{  ikky stuff
    
    if (frCol === WHITE) {
    
      const ep = to + 12;
    
      if ((move & MOVE_EPMAKE_MASK) !== 0) {
    
        ueFunc  = netMove;
        ueArgs0 = frObj;
        ueArgs1 = fr;
        ueArgs2 = to;
    
        loHash ^= loEP[bdEp];
        hiHash ^= hiEP[bdEp];
    
        bdEp = ep;
    
        loHash ^= loEP[bdEp];
        hiHash ^= hiEP[bdEp];
      }
    
      else if ((move & MOVE_EPTAKE_MASK) !== 0) {
    
        ueFunc  = netEpCapture;
        ueArgs0 = frObj;
        ueArgs1 = fr;
        ueArgs2 = to;
        ueArgs3 = B_PAWN;
        ueArgs4 = ep;
    
        b[ep]    = 0;
        node.epZ = z[ep];
        z[ep]    = NO_Z;
    
        bList[node.epZ] = EMPTY;
    
        loHash ^= loObjPieces[(B_PAWN << 8) + ep];
        hiHash ^= hiObjPieces[(B_PAWN << 8) + ep];
    
        bCounts[PAWN]--;
        bCount--;
      }
    
      else if ((move & MOVE_PROMOTE_MASK) !== 0) {
    
        const pro = ((move & MOVE_PROMAS_MASK) >>> MOVE_PROMAS_BITS) + 2;  //NBRQ
        b[to]     = WHITE | pro;
    
        ueFunc  = netPromote;
        ueArgs0 = W_PAWN;
        ueArgs1 = fr;
        ueArgs2 = to;
        ueArgs3 = toObj;
        ueArgs4 = pro|WHITE;
    
        loHash ^= loObjPieces[(W_PAWN << 8) + to];
        hiHash ^= hiObjPieces[(W_PAWN << 8) + to];
        loHash ^= loObjPieces[((WHITE|pro) << 8) + to];
        hiHash ^= hiObjPieces[((WHITE|pro) << 8) + to];
    
        wCounts[PAWN]--;
        wCounts[pro]++;
    
      }
    
      else if (move === MOVE_E1G1) {
    
        ueFunc  = netCastle;
        ueArgs0 = W_KING;
        ueArgs1 = fr;
        ueArgs2 = to;
        ueArgs3 = W_ROOK;
        ueArgs4 = H1;
        ueArgs5 = F1;
    
        b[H1] = 0;
        b[F1] = W_ROOK;
        z[F1] = z[H1];
        z[H1] = NO_Z;
    
        wList[z[F1]] = F1;
    
        loHash ^= loObjPieces[(W_ROOK << 8) + H1];
        hiHash ^= hiObjPieces[(W_ROOK << 8) + H1];
        loHash ^= loObjPieces[(W_ROOK << 8) + F1];
        hiHash ^= hiObjPieces[(W_ROOK << 8) + F1];
    
      }
    
      else if (move === MOVE_E1C1) {
    
        ueFunc  = netCastle;
        ueArgs0 = W_KING;
        ueArgs1 = fr;
        ueArgs2 = to;
        ueArgs3 = W_ROOK;
        ueArgs4 = A1;
        ueArgs5 = D1;
    
        b[A1] = 0;
        b[D1] = W_ROOK;
        z[D1] = z[A1];
        z[A1] = NO_Z;
    
        wList[z[D1]] = D1;
    
        loHash ^= loObjPieces[(W_ROOK << 8) + A1];
        hiHash ^= hiObjPieces[(W_ROOK << 8) + A1];
        loHash ^= loObjPieces[(W_ROOK << 8) + D1];
        hiHash ^= hiObjPieces[(W_ROOK << 8) + D1];
    
      }
    }
    
    else {
    
      const ep = to - 12;
    
      if ((move & MOVE_EPMAKE_MASK) !== 0) {
    
        ueFunc  = netMove;
        ueArgs0 = frObj;
        ueArgs1 = fr;
        ueArgs2 = to;
    
        loHash ^= loEP[bdEp];
        hiHash ^= hiEP[bdEp];
    
        bdEp = ep;
    
        loHash ^= loEP[bdEp];
        hiHash ^= hiEP[bdEp];
      }
    
      else if ((move & MOVE_EPTAKE_MASK) !== 0) {
    
        ueFunc  = netEpCapture;
        ueArgs0 = frObj;
        ueArgs1 = fr;
        ueArgs2 = to;
        ueArgs3 = W_PAWN;
        ueArgs4 = ep;
    
        b[ep]    = 0;
        node.epZ = z[ep];
        z[ep]    = NO_Z;
    
        wList[node.epZ] = EMPTY;
    
        loHash ^= loObjPieces[(W_PAWN << 8) + ep];
        hiHash ^= hiObjPieces[(W_PAWN << 8) + ep];
    
        wCounts[PAWN]--;
        wCount--;
      }
    
      else if ((move & MOVE_PROMOTE_MASK) !== 0) {
    
        const pro = ((move & MOVE_PROMAS_MASK) >>> MOVE_PROMAS_BITS) + 2;  //NBRQ
        b[to]     = BLACK | pro;
    
        ueFunc  = netPromote;
        ueArgs0 = B_PAWN;
        ueArgs1 = fr;
        ueArgs2 = to;
        ueArgs3 = toObj;
        ueArgs4 = pro|BLACK;
    
        loHash ^= loObjPieces[(B_PAWN << 8) + to];
        hiHash ^= hiObjPieces[(B_PAWN << 8) + to];
        loHash ^= loObjPieces[((pro|BLACK) << 8) + to];
        hiHash ^= hiObjPieces[((pro|BLACK) << 8) + to];
    
        bCounts[PAWN]--;
        bCounts[pro]++;
    
      }
    
      else if (move === MOVE_E8G8) {
    
        ueFunc  = netCastle;
        ueArgs0 = B_KING;
        ueArgs1 = fr;
        ueArgs2 = to;
        ueArgs3 = B_ROOK;
        ueArgs4 = H8;
        ueArgs5 = F8;
    
        b[H8] = 0;
        b[F8] = B_ROOK;
        z[F8] = z[H8];
        z[H8] = NO_Z;
    
        bList[z[F8]] = F8;
    
        loHash ^= loObjPieces[(B_ROOK << 8) + H8];
        hiHash ^= hiObjPieces[(B_ROOK << 8) + H8];
        loHash ^= loObjPieces[(B_ROOK << 8) + F8];
        hiHash ^= hiObjPieces[(B_ROOK << 8) + F8];
    
      }
    
      else if (move === MOVE_E8C8) {
    
        ueFunc  = netCastle;
        ueArgs0 = B_KING;
        ueArgs1 = fr;
        ueArgs2 = to;
        ueArgs3 = B_ROOK;
        ueArgs4 = A8;
        ueArgs5 = D8;
    
        b[A8] = 0;
        b[D8] = B_ROOK;
        z[D8] = z[A8];
        z[A8] = NO_Z;
    
        bList[z[D8]] = D8;
    
        loHash ^= loObjPieces[(B_ROOK << 8) + A8];
        hiHash ^= hiObjPieces[(B_ROOK << 8) + A8];
        loHash ^= loObjPieces[(B_ROOK << 8) + D8];
        hiHash ^= hiObjPieces[(B_ROOK << 8) + D8];
    
      }
    
    }
    
    //}}}
  }

  //{{{  flip turn in hash
  
  loHash ^= loTurn;
  hiHash ^= hiTurn;
  
  //}}}
  //{{{  push rep hash
  //
  // Repetitions are cancelled by pawn moves, castling, captures, EP
  // and promotions; i.e. moves that are not reversible.  The nearest
  // repetition is 5 indexes back from the current one and then that
  // and every other one entry is a possible rep.  Can also check for
  // 50 move rule by testing hi-lo > 100 - it's not perfect because of
  // the pawn move reset but it's a type 2 error, so safe.
  //
  
  repLoHash[repHi] = loHash;
  repHiHash[repHi] = hiHash;
  
  repHi++;
  
  if ((move & (MOVE_SPECIAL_MASK | MOVE_TOOBJ_MASK)) || frPiece === PAWN)
    repLo = repHi;
  
  //}}}

}

//}}}
//{{{  makeMoveB
//
// If the ue* data is moved into nodes, this could be deferred and
// done in evaluate().
//

function makeMoveB  () {

  ueFunc();

}

//}}}
//{{{  unmakeMove

function unmakeMove (node, move) {

  const b = bdB;
  const z = bdZ;

  const fr    = (move & MOVE_FR_MASK)    >>> MOVE_FR_BITS;
  const to    = (move & MOVE_TO_MASK)    >>> MOVE_TO_BITS;
  const toObj = (move & MOVE_TOOBJ_MASK) >>> MOVE_TOOBJ_BITS;
  const frObj = (move & MOVE_FROBJ_MASK) >>> MOVE_FROBJ_BITS;
  const frCol = frObj & COLOR_MASK;

  b[fr] = frObj;
  b[to] = toObj;

  z[fr] = node.frZ;
  z[to] = node.toZ;

  wbList[frCol >>> 3][node.frZ] = fr;

  //{{{  capture?
  
  if (toObj !== 0) {
  
    const toPiece = toObj & PIECE_MASK;
    const toCol   = toObj & COLOR_MASK;
  
    if (toCol === WHITE) {
  
      wList[node.toZ] = to;
  
      wCounts[toPiece]++;
      wCount++;
    }
  
    else {
  
      bList[node.toZ] = to;
  
      bCounts[toPiece]++;
      bCount++;
    }
  
  }
  
  //}}}

  if ((move & MOVE_SPECIAL_MASK) !== 0) {
    //{{{  ikky stuff
    
    if ((frObj & COLOR_MASK) === WHITE) {
    
      const ep = to + 12;
    
      if (move & MOVE_EPTAKE_MASK) {
    
        b[ep] = B_PAWN;
        z[ep] = node.epZ;
    
        bList[node.epZ] = ep;
    
        bCounts[PAWN]++;
        bCount++;
    
      }
    
      else if (move & MOVE_PROMOTE_MASK) {
    
        const pro = ((move & MOVE_PROMAS_MASK) >>> MOVE_PROMAS_BITS) + 2;  //NBRQ
    
        wCounts[PAWN]++;
        wCounts[pro]--;
    
      }
    
      else if (move === MOVE_E1G1) {
    
        b[H1] = W_ROOK;
        b[F1] = 0;
        z[H1] = z[F1];
        z[F1] = NO_Z;
    
        wList[z[H1]] = H1;
      }
    
      else if (move === MOVE_E1C1) {
    
        b[A1] = W_ROOK;
        b[D1] = 0;
        z[A1] = z[D1];
        z[D1] = NO_Z;
    
        wList[z[A1]] = A1;
      }
    }
    
    else {
    
      const ep = to - 12;
    
      if (move & MOVE_EPTAKE_MASK) {
    
        b[ep] = W_PAWN;
        z[ep] = node.epZ;
    
        wList[node.epZ] = ep;
    
        wCounts[PAWN]++;
        wCount++;
      }
    
      else if (move & MOVE_PROMOTE_MASK) {
    
        const pro = ((move & MOVE_PROMAS_MASK) >>> MOVE_PROMAS_BITS) + 2;  //NBRQ
    
        bCounts[PAWN]++;
        bCounts[pro]--;
    
      }
    
      else if (move === MOVE_E8G8) {
    
        b[H8] = B_ROOK;
        b[F8] = 0;
        z[H8] = z[F8];
        z[F8] = NO_Z;
    
        bList[z[H8]] = H8;
      }
    
      else if (move === MOVE_E8C8) {
    
        b[A8] = B_ROOK;
        b[D8] = 0;
        z[A8] = z[D8];
        z[D8] = NO_Z;
    
        bList[z[A8]] = A8;
      }
    }
    
    //}}}
  }

}

//}}}
//{{{  isKingAttacked

function isKingAttacked (byCol) {

  const list = wbList[(byCol ^ COLOUR_MASK) >>> 3];

  return isAttacked(list[0], byCol);

}

//}}}
//{{{  isAttacked

function isAttacked (to, byCol) {

  const b = bdB;

  let fr;

  //{{{  colour stuff
  
  if (byCol === WHITE) {
  
    if (b[to+13] === W_PAWN || b[to+11] === W_PAWN)
      return 1;
  
    var RQ = IS_WRQ;
    var BQ = IS_WBQ;
  }
  
  else {
  
    if (b[to-13] === B_PAWN || b[to-11] === B_PAWN)
      return 1;
  
    var RQ = IS_BRQ;
    var BQ = IS_BBQ;
  }
  
  const knight = KNIGHT | byCol;
  const king   = KING   | byCol;
  
  //}}}

  //{{{  knights
  
  if (b[to + -10] === knight) return 1;
  if (b[to + -23] === knight) return 1;
  if (b[to + -14] === knight) return 1;
  if (b[to + -25] === knight) return 1;
  if (b[to +  10] === knight) return 1;
  if (b[to +  23] === knight) return 1;
  if (b[to +  14] === knight) return 1;
  if (b[to +  25] === knight) return 1;
  
  //}}}
  //{{{  queen, bishop, rook
  
  fr = to + 1;  while (b[fr] === 0) fr += 1;  if (RQ[b[fr]] !== 0) return 1;
  fr = to - 1;  while (b[fr] === 0) fr -= 1;  if (RQ[b[fr]] !== 0) return 1;
  fr = to + 12; while (b[fr] === 0) fr += 12; if (RQ[b[fr]] !== 0) return 1;
  fr = to - 12; while (b[fr] === 0) fr -= 12; if (RQ[b[fr]] !== 0) return 1;
  fr = to + 11; while (b[fr] === 0) fr += 11; if (BQ[b[fr]] !== 0) return 1;
  fr = to - 11; while (b[fr] === 0) fr -= 11; if (BQ[b[fr]] !== 0) return 1;
  fr = to + 13; while (b[fr] === 0) fr += 13; if (BQ[b[fr]] !== 0) return 1;
  fr = to - 13; while (b[fr] === 0) fr -= 13; if (BQ[b[fr]] !== 0) return 1;
  
  //}}}

  return 0;

}

//}}}
//{{{  evaluate

function evaluate (turn) {

  //{{{  init
  
  const numPieces = wCount + bCount;
  
  const wNumQueens  = wCounts[QUEEN];
  const wNumRooks   = wCounts[ROOK];
  const wNumBishops = wCounts[BISHOP];
  const wNumKnights = wCounts[KNIGHT];
  const wNumPawns   = wCounts[PAWN];
  
  const bNumQueens  = bCounts[QUEEN];
  const bNumRooks   = bCounts[ROOK];
  const bNumBishops = bCounts[BISHOP];
  const bNumKnights = bCounts[KNIGHT];
  const bNumPawns   = bCounts[PAWN];
  
  //}}}
  //{{{  draw?
  
  if (numPieces === 2)
    return 0;
  
  if (numPieces === 3 && (wNumKnights !== 0 || wNumBishops !== 0 || bNumKnights !== 0 || bNumBishops !== 0))
    return 0;
  
  if (numPieces === 4 && (wNumKnights !== 0 || wNumBishops !== 0) && (bNumKnights !== 0 || bNumBishops !== 0))
    return 0;
  
  if (numPieces === 4 && (wNumKnights === 2 || bNumKnights === 2))
    return 0;
  
  if (numPieces === 5 && wNumKnights === 2 && (bNumKnights !== 0 || bNumBishops !== 0))
    return 0;
  
  if (numPieces === 5 && bNumKnights === 2 && (wNumKnights !== 0 || wNumBishops !== 0))
    return 0;
  
  if (numPieces === 5 && wNumBishops === 2 && bNumBishops !== 0)
    return 0;
  
  if (numPieces === 5 && bNumBishops === 2 && wNumBishops !== 0)
    return 0;
  
  if (numPieces === 4 && wNumRooks !== 0 && bNumRooks !== 0)
    return 0;
  
  if (numPieces === 4 && wNumQueens !== 0 && bNumQueens !== 0)
    return 0;
  
  //}}}

  return netEval(turn);

}

//}}}
//{{{  hashCheck

function hashCheck (turn) {

  var loH = 0;
  var hiH = 0;

  if (turn) {
    loH ^= loTurn;
    hiH ^= hiTurn;
  }

  loH ^= loRights[bdRights];
  hiH ^= hiRights[bdRights];

  loH ^= loEP[bdEp];
  hiH ^= hiEP[bdEp];

  for (var sq=0; sq<144; sq++) {

    var obj = bdB[sq];

    if (obj === 0 || obj === EDGE)
      continue;

    var piece = obj & PIECE_MASK;
    var col   = obj & COLOR_MASK;

    loH ^= loObjPieces[(obj << 8) + sq];
    hiH ^= hiObjPieces[(obj << 8) + sq];

  }

  if (loH !== loHash)
    console.log('*************** LO',loH,loHash);

  if (hiH !== hiHash)
    console.log('*************** HI',hiH,hiHash);

}

//}}}
//{{{  formatFen

function formatFen (turn) {

  var fen = '';
  var n   = 0;

  for (var i=0; i < 8; i++) {
    for (var j=0; j < 8; j++) {
      var sq  = B88[i*8 + j]
      var obj = bdB[sq];
      if (obj === 0)
        n++;
      else {
        if (n) {
          fen += '' + n;
          n = 0;
        }
        fen += UMAP[obj];
      }
    }
    if (n) {
      fen += '' + n;
      n = 0;
    }
    if (i < 7)
      fen += '/';
  }

  if (turn === WHITE)
    fen += ' w';
  else
    fen += ' b';

  if (bdRights) {
    fen += ' ';
    if (bdRights & WHITE_RIGHTS_KING)
      fen += 'K';
    if (bdRights & WHITE_RIGHTS_QUEEN)
      fen += 'Q';
    if (bdRights & BLACK_RIGHTS_KING)
      fen += 'k';
    if (bdRights & BLACK_RIGHTS_QUEEN)
      fen += 'q';
  }
  else
    fen += ' -';

  if (bdEp)
    fen += ' ' + COORDS[bdEp];
  else
    fen += ' -';

  fen += ' 0 1';

  return fen;

}

//}}}
//{{{  quickSee

const WB_OFFSET_DIAG1 = new Int8Array([-13, 13]);
const WB_OFFSET_DIAG2 = new Int8Array([-11, 11]);

const QS = new Uint8Array([0,0,3,3,5,9,0]);

function quickSee (turn, move) {

  if ((move & MOVE_SPECIAL_MASK) !== 0)
    return 0;

  const frObj   = (move & MOVE_FROBJ_MASK) >>> MOVE_FROBJ_BITS;
  const frPiece = frObj & PIECE_MASK;

  if (frPiece === PAWN)
    return 0;

  const to    = (move & MOVE_TO_MASK   ) >>> MOVE_TO_BITS;
  const toObj = (move & MOVE_TOOBJ_MASK) >>> MOVE_TOOBJ_BITS;

  const cx = turn >>> 3;

  const nextTurn = turn ^ BLACK;

  const p1 = (bdB[to + WB_OFFSET_DIAG1[cx]] === (PAWN | nextTurn)) | 0;
  const p2 = (bdB[to + WB_OFFSET_DIAG2[cx]] === (PAWN | nextTurn)) | 0;

  if (toObj === 0 && (p1 !== 0 || p2 !== 0))
    return -1;

  const toPiece = toObj & PIECE_MASK;
  const dodgy   = (QS[frPiece] > QS[toPiece]) | 0;

  if (dodgy !== 0 && (p1 !== 0 || p2 !== 0))
    return -1;

  return 0;

}

//}}}
//{{{  addHistory

function addHistory (x, move) {

  objHistory[
    (((move & MOVE_FROBJ_MASK) >>> MOVE_FROBJ_BITS) << 8) +
    ((move & MOVE_TO_MASK) >>> MOVE_TO_BITS)
  ] += x;

}

//}}}
//{{{  betaMate

function betaMate (score) {

  return (score >= MINMATE && score <= MATE) | 0;

}

//}}}
//{{{  alphaMate

function alphaMate (score) {

  return (score <= -MINMATE && score >= -MATE) | 0;

}

//}}}
//{{{  isDraw

function isDraw () {

  if (repHi - repLo > 100)
    return 1;

  for (let i=repHi-5; i >= repLo; i -= 2) {

    if (repLoHash[i] === loHash && repHiHash[i] === hiHash)
      return 1;

  }

  const numPieces = wCount + bCount;

  if (numPieces === 2)
    return 1;

  const wNumBishops = wCounts[BISHOP];
  const wNumKnights = wCounts[KNIGHT];

  const bNumBishops = bCounts[BISHOP];
  const bNumKnights = bCounts[KNIGHT];

  if (numPieces === 3 && (wNumKnights !== 0 || wNumBishops !== 0 || bNumKnights !== 0 || bNumBishops !== 0))
    return 1;

  return 0;

}

//}}}
//{{{  formatMove

function formatMove (move) {

  let moveStr = 'NULL';

  if (move !== 0) {

    const fr = (move & MOVE_FR_MASK) >>> MOVE_FR_BITS;
    const to = (move & MOVE_TO_MASK) >>> MOVE_TO_BITS;

    moveStr = COORDS[fr] + COORDS[to];

    if ((move & MOVE_PROMOTE_MASK) !== 0)
      moveStr = moveStr + PROMOTES[(move & MOVE_PROMAS_MASK) >>> MOVE_PROMAS_BITS];

  }

  return moveStr;

}

//}}}
//{{{  flipFen
//
// flipFen is slow. Only use for init/test/datagen.
//

function flipFen (fen) {

  const [board, color, castling, enPassant, halfmove, fullmove] = fen.split(' ');

  const mirroredBoard = board.split('/').reverse().map(row => {
    return row.split('').map(char => {
      if (char === char.toUpperCase()) {
        return char.toLowerCase();
      } else if (char === char.toLowerCase()) {
        return char.toUpperCase();
      }
      return char;
    }).join('');
  }).join('/');

  const mirroredColor = color === 'w' ? 'b' : 'w';

  const mirrorCastling = castling.split('').map(right => {
    switch(right) {
      case 'K': return 'k';
      case 'Q': return 'q';
      case 'k': return 'K';
      case 'q': return 'Q';
      default: return right;
    }
  }).join('');

  const mirroredEnPassant = enPassant === '-' ? '-' :
    enPassant[0] + (9 - parseInt(enPassant[1]));

  const newFen = [
    mirroredBoard,
    mirroredColor,
    mirrorCastling || '-',
    mirroredEnPassant,
    halfmove,
    fullmove
  ].join(' ');

  return newFen;
};

//}}}

//}}}
//{{{  stats

let statsStartTime = 0;
let statsNodes     = 0;
let statsMoveTime  = 0;
let statsMaxNodes  = 0;
let statsTimeOut   = 0;
let statsSelDepth  = 0;
let statsBestMove  = 0;
let statsBestScore = 0;

//{{{  initStats

function initStats () {

  statsStartTime = now();
  statsNodes     = 0;
  statsMoveTime  = 0;
  statsMaxNodes  = 0;
  statsTimeOut   = 0;
  statsSelDepth  = 0;
  statsBestMove  = 0;
  statsBestScore = 0;

}

//}}}
//{{{  checkTime

function checkTime () {

  if (statsBestMove && statsMoveTime > 0 && ((now() - statsStartTime) >= statsMoveTime))

    statsTimeOut = 1;

  if (statsBestMove && statsMaxNodes > 0 && statsNodes >= statsMaxNodes * 100)

    statsTimeOut = 1;

}

//}}}

//}}}
//{{{  uci

//{{{  uciSend

function uciSend () {

  if (silentMode)
    return;

  var s = '';

  for (var i = 0; i < arguments.length; i++)
    s += arguments[i] + ' ';

  //fs.writeSync(1, s + '\n');

  if (nodeHost)
    console.log(s);
  else
    postMessage(s);

}

//}}}
//{{{  uciGetInt

function uciGetInt (tokens, key, def) {

  for (let i=0; i < tokens.length; i++)
    if (tokens[i] == key)
      if (i < tokens.length - 1)
        return parseInt(tokens[i+1]);

  return def;

}

//}}}
//{{{  uciGetStr

function uciGetStr (tokens, key, def) {

  for (let i=0; i < tokens.length; i++)
    if (tokens[i] == key)
      if (i < tokens.length - 1)
        return tokens[i+1];

  return def;

}

//}}}
//{{{  uciGetArr

function uciGetArr (tokens, key, to) {

  var lo = 0;
  var hi = 0;

  for (let i=0; i < tokens.length; i++) {
    if (tokens[i] == key) {
      lo = i + 1;  //assumes at least one item
      hi = lo;
      for (let j=lo; j < tokens.length; j++) {
        if (tokens[j] == to)
          break;
        hi = j;
      }
    }
  }

  return {lo:lo, hi:hi};

}

//}}}
//{{{  uciExec

function uciExec (commands) {

  const cmdList = commands.split('\n');

  for (let c=0; c < cmdList.length; c++ ) {

    let cmdStr = cmdList[c].replace(/(\r\n|\n|\r)/gm,"");

    cmdStr = cmdStr.trim();
    cmdStr = cmdStr.replace(/\s+/g,' ');

    const tokens = cmdStr.split(' ');

    let cmd = tokens[0];

    if (!cmd)
      continue;

    switch (cmd) {

      case 'isready': {
        //{{{  isready
        
        uciSend('readyok');
        
        break;
        
        //}}}
      }

      case 'position':
      case 'p': {
        //{{{  position
        
        let bd     = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
        let turn   = 'w';
        let rights = 'KQkq';
        let ep     = '-';
        
        let arr = uciGetArr(tokens, 'fen', 'moves');
        
        if (arr.lo > 0) {
          if (arr.lo <= arr.hi) bd     = tokens[arr.lo]; arr.lo++;
          if (arr.lo <= arr.hi) turn   = tokens[arr.lo]; arr.lo++;
          if (arr.lo <= arr.hi) rights = tokens[arr.lo]; arr.lo++;
          if (arr.lo <= arr.hi) ep     = tokens[arr.lo]; arr.lo++;
        }
        
        const moves = [];
        
        arr = uciGetArr(tokens, 'moves', 'fen');
        
        if (arr.lo > 0) {
          for (var i=arr.lo; i <= arr.hi; i++)
            moves.push(tokens[i]);
        }
        
        position(bd, turn, rights, ep, moves);
        
        break;
        
        //}}}
      }

      case 'go':
      case 'g': {
        //{{{  go
        
        initStats();
        
        let depth     = Math.max(uciGetInt(tokens, 'depth', 0), uciGetInt(tokens, 'd', 0));
        let moveTime  = uciGetInt(tokens, 'movetime', 0);
        let maxNodes  = uciGetInt(tokens, 'nodes', 0);
        let wTime     = uciGetInt(tokens, 'wtime', 0);
        let bTime     = uciGetInt(tokens, 'btime', 0);
        let wInc      = uciGetInt(tokens, 'winc', 0);
        let bInc      = uciGetInt(tokens, 'binc', 0);
        let movesToGo = uciGetInt(tokens, 'movestogo', 0);
        
        let totTime = 0;
        let movTime = 0;
        let incTime = 0;
        
        if (depth <= 0)
          depth = MAX_PLY;
        
        if (moveTime > 0)
          statsMoveTime = moveTime;
        
        if (maxNodes > 0)
          statsMaxNodes = maxNodes;
        
        if (moveTime === 0) {
        
          if (movesToGo > 0)
            movesToGo += 2;
          else
            movesToGo = 30;
        
          if (bdTurn === WHITE) {
            totTime = wTime;
            incTime = wInc;
          }
          else {
            totTime = bTime;
            incTime = bInc;
          }
        
          movTime = myround(totTime / movesToGo) + incTime;
          movTime = movTime * 0.95;
        
          if (movTime > 0)
            statsMoveTime = movTime | 0;
        
          if (statsMoveTime < 1 && (wTime || bTime))
            statsMoveTime = 1;
        }
        
        go(depth);
        
        break;
        
        //}}}
      }

      case 'ucinewgame':
      case 'u': {
        //{{{  ucinewgame
        
        ttInit();
        
        break;
        
        //}}}
      }

      case 'quit':
      case 'q': {
        //{{{  quit
        
        process.exit();
        
        break;
        
        //}}}
      }

      case 'stop': {
        //{{{  stop
        
        break;
        
        //}}}
      }

      case 'uci': {
        //{{{  uci
        
        uciSend('id name Lozza', BUILD);
        uciSend('id author Colin Jenkins');
        uciSend('uciok');
        
        break;
        
        //}}}
      }

      case 'perft': {
        //{{{  perft
        
        uciExec('b');
        
        const depth1 = uciGetInt(tokens, 'depth', 0);
        const depth2 = uciGetInt(tokens, 'to', depth1);
        const warm = uciGetInt(tokens, 'warm', 0);
        
        for (let w=0; w < warm; w++) {
          for (let depth=depth1; depth <= depth2; depth++) {
            const nodes = perft(rootNode, depth, bdTurn);
          }
        }
        
        for (let depth=depth1; depth <= depth2; depth++) {
          const start = now();
          const nodes = perft(rootNode, depth, bdTurn);
          const elapsed = now() - start;
          const nps = nodes / elapsed * 1000 | 0;
          uciSend('depth', depth, 'nodes', nodes, 'time', elapsed, 'nps', nps);
        }
        
        break;
        
        //}}}
      }

      case 'eval':
      case 'e': {
        //{{{  eval
        
        const e = netEval(bdTurn);
        
        uciSend(e);
        
        break;
        
        //}}}
      }

      case 'board':
      case 'b': {
        //{{{  board
        
        uciSend(formatFen(bdTurn));
        
        break;
        
        //}}}
      }

      case 'bench': {
        //{{{  bench
        
        silentMode = 1;
        
        const depth = uciGetInt(tokens, 'depth', BENCH_DEPTH);
        const warm  = uciGetInt(tokens, 'warm', 1);
        
        //{{{  warmup
        
        for (let w=0; w < warm; w++) {
        
          for (var i=0; i < BENCHFENS.length; i++) {
        
            const fen = BENCHFENS[i];
        
            uciExec('ucinewgame');
            uciExec('position fen ' + fen);
            uciExec('id bench' + i);
            uciExec('go depth ' + depth);
        
          }
        
        }
        
        //}}}
        
        let nodes = 0;
        let start = now();
        
        for (let i=0; i < BENCHFENS.length; i++) {
        
          const fen = BENCHFENS[i];
        
          process.stdout.write(i.toString() + '\r');
        
          uciExec('ucinewgame');
          uciExec('position fen ' + fen);
          uciExec('id bench' + i);
          uciExec('go depth ' + depth);
        
          nodes += statsNodes;
        
        }
        
        silentMode = 0;
        
        const elapsed = now() - start;
        const nps = nodes/elapsed * 1000 | 0;
        
        uciSend('warm', warm, 'depth', depth, 'nodes', nodes, 'time', elapsed, 'nps', nps);
        
        break;
        
        //}}}
      }

      case 'qb': {
        //{{{  quick bench
        
        uciExec('bench warm 0');
        
        break;
        
        //}}}
      }


      case 'pt': {
        //{{{  perft tests
        
        let n = uciGetInt(tokens, 'n', PERFTFENS.length);
        
        silentMode = 1;
        
        const t1 = now();
        
        let errors = 0;
        let tot    = 0;
        
        for (let i=0; i < n; i++) {
        
          const p = PERFTFENS[i];
        
          const fen   = p[0];
          const depth = p[1];
          const moves = p[2];
          const id    = p[3];
        
          uciExec('ucinewgame');
          uciExec('position ' + fen);
        
          const nodes = perft(rootNode, depth, bdTurn);
        
          tot += nodes;
        
          const t2     = now();
          const sec    = Math.round((t2-t1)/100)/10;
          const secStr = sec.toString().padStart(6, ' ');
        
          let diff = nodes - moves;
        
          if (diff) {
            errors += Math.abs(diff);
            diff = '\x1b[1m' + diff + '\x1b[0m';
          }
        
          silentMode = 0;
          uciSend(secStr, id, fen, depth, diff, nodes, moves);
          silentMode = 1;
        }
        
        silentMode = 0;
        
        const elapsed = now() - t1;
        const nps = tot/elapsed * 1000 | 0;
        
        uciSend('errors', errors, 'nodes', tot, 'nps', nps);
        
        break;
        
        //}}}
      }

      case 'et': {
        //{{{  eval tests
        
        for (let i=0; i < BENCHFENS.length; i++) {
        
          uciSend();
        
          const fen = BENCHFENS[i];
        
          uciExec('ucinewgame');
          uciExec('position fen ' + fen);
          uciSend(fen, 'fen')
          uciExec('e');
        
          const flippedFen = flipFen(fen);
        
          uciExec('ucinewgame');
          uciExec('position fen ' + flippedFen);
          uciSend(flippedFen, 'flipped fen')
          uciExec('e');
        
        }
        
        break;
        
        //}}}
      }

      case 'network':
      case 'n': {
        //{{{  network
        
        uciSend('weights file', NET_WEIGHTS_FILE);
        uciSend('i_size, h1_size', NET_I_SIZE, NET_H1_SIZE);
        uciSend('qa, qb', NET_QA, NET_QB);
        uciSend('scale', NET_SCALE);
        uciSend('local', NET_LOCAL);
        
        uciExec('u');
        uciExec('p s');
        uciExec('e');
        
        break;
        
        //}}}
      }

      case 'moves':
      case 'm': {
        //{{{  moves
        
        initNode(rootNode);
        
        rootNode.inCheck = 1;
        
        let move = 0;
        
        genMoves(rootNode, bdTurn);
        
        while(move = getNextMove(rootNode))
          console.log(formatMove(move));
        
        initNode(rootNode);
        
        break;
        
        //}}}
      }

      case 'datagen': {
        //{{{  datagen
        
        datagen();
        
        break;
        
        //}}}
      }

      default: {
        //{{{  ?
        
        uciSend('unknown command', cmd);
        
        break;
        
        //}}}
      }
    }
  }

}

//}}}

//}}}
//{{{  init

const nodeHost = (typeof process) != 'undefined';

if (!nodeHost) {
  onmessage = function(e) {
    uciExec(e.data);
  }
}

const fs = (nodeHost) ? require('fs') : 0;

const nodes = Array(MAX_PLY);

let silentMode = 0;
let randomEval = 0;

//{{{  initOnce

function initOnce () {

  //{{{  init net
  //
  // IMAP is used to map a piece+colour to an offset in the flat weights array.
  // Used when updating the accumulators.
  //
  
  for (let i = 0; i < 64; i++) {
  
    const j = B88[i];
  
    IMAP[(W_PAWN << 8) + j]    =   (0 + (PAWN-1)   * 64 + i) * NET_H1_SIZE;
    IMAP[(W_KNIGHT << 8) + j]  =   (0 + (KNIGHT-1) * 64 + i) * NET_H1_SIZE;
    IMAP[(W_BISHOP << 8) + j]  =   (0 + (BISHOP-1) * 64 + i) * NET_H1_SIZE;
    IMAP[(W_ROOK << 8) + j]    =   (0 + (ROOK-1)   * 64 + i) * NET_H1_SIZE;
    IMAP[(W_QUEEN << 8) + j]   =   (0 + (QUEEN-1)  * 64 + i) * NET_H1_SIZE;
    IMAP[(W_KING << 8) + j]    =   (0 + (KING-1)   * 64 + i) * NET_H1_SIZE;
  
    IMAP[(B_PAWN << 8) + j]    = (384 + (PAWN-1)   * 64 + i) * NET_H1_SIZE;
    IMAP[(B_KNIGHT << 8) + j]  = (384 + (KNIGHT-1) * 64 + i) * NET_H1_SIZE;
    IMAP[(B_BISHOP << 8) + j]  = (384 + (BISHOP-1) * 64 + i) * NET_H1_SIZE;
    IMAP[(B_ROOK << 8) + j]    = (384 + (ROOK-1)   * 64 + i) * NET_H1_SIZE;
    IMAP[(B_QUEEN << 8) + j]   = (384 + (QUEEN-1)  * 64 + i) * NET_H1_SIZE;
    IMAP[(B_KING << 8) + j]    = (384 + (KING-1)   * 64 + i) * NET_H1_SIZE;
  
  }
  
  netLoad();
  
  //}}}
  //{{{  init nodes
  
  for (let i=0; i < nodes.length; i++) {
    nodes[i] = new nodeStruct();
    seal(nodes[i]);
    nodes[i].ply = i;
  }
  
  for (let i=0; i < nodes.length-1; i++)
    nodes[i].childNode = nodes[i+1];
  
  for (let i=1; i < nodes.length; i++)
    nodes[i].parentNode = nodes[i-1];
  
  for (let i=2; i < nodes.length; i++)
    nodes[i].grandparentNode = nodes[i-2];
  
  //}}}
  //{{{  init LMR_LOOKUP
  
  for (let p=0; p < MAX_PLY; p++) {
    for (let m=0; m < MAX_MOVES; m++) {
      LMR_LOOKUP[(p << 7) + m] = (1 + p/5 + m/20) | 0;
    }
  }
  
  //}}}
  //{{{  init ALIGNED
  
  for (var i=0; i < 144; i++) {
    ALIGNED[i] = new Int8Array(144).fill(EDGE);
    for (let j=0; j < 64; j++) {
      ALIGNED[i][B88[j]] = 0;
    }
  }
  
  for (let i=0; i < 64; i++) {
  
    const to = B88[i];
    const a  = ALIGNED[to];
  
    let dir = 1;
    let from = to + dir;
    while (a[from] !== EDGE) {
      a[from] = dir;
      from += dir;
    }
  
    dir = -1;
    from = to + dir;
    while (a[from] !== EDGE) {
      a[from] = dir;
      from += dir;
    }
  
    dir = 12;
    from = to + dir;
    while (a[from] !== EDGE) {
      a[from] = dir;
      from += dir;
    }
  
    dir = -12;
    from = to + dir;
    while (a[from] !== EDGE) {
      a[from] = dir;
      from += dir;
    }
  
    dir = 13;
    from = to + dir;
    while (a[from] !== EDGE) {
      a[from] = dir;
      from += dir;
    }
  
    dir = -13;
    from = to + dir;
    while (a[from] !== EDGE) {
      a[from] = dir;
      from += dir;
    }
  
    dir = 11;
    from = to + dir;
    while (a[from] !== EDGE) {
      a[from] = dir;
      from += dir;
    }
  
    dir = -11;
    from = to + dir;
    while (a[from] !== EDGE) {
      a[from] = dir;
      from += dir;
    }
  
  }
  
  //}}}

}

initOnce();

//}}}

const rootNode = nodes[0];

//}}}

if (nodeHost && process.argv.length > 2) {
  for (let i=2; i < process.argv.length; i++)
    uciExec(process.argv[i]);
}

//{{{  stdio

if (nodeHost) {

  process.stdin.setEncoding('utf8');

  process.stdin.on('readable', function() {
    const chunk = process.stdin.read();
    process.stdin.resume();
    if (chunk !== null) {
      uciExec(chunk);
    }
  });

  process.stdin.on('end', function() {
    process.exit();
  });

}

//}}}

