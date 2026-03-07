const default_fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const apiExpiration =
  "https://api.timezonedb.com/v2.1/list-time-zone?key=WPOK8LWQNYUI&format=json&country=FR";
const apiExpiration2 =
  "https://api.timezonedb.com/v2.1/list-time-zone?key=SWQMUAF4FWUB&format=json&country=FR";

const BOOKS = [
  "rn1qkbnr/ppp2ppp/8/3p4/5p2/6PB/PPPPP2P/RNBQK2R",
  "rnbqkbnr/pppppppp/8/8/8/7N/PPPPPPPP/RNBQKB1R",
  "rn1qkbnr/ppp2ppp/8/3p4/8/6PB/PPPPP3/RNBQ1RK1",
  "rnbqkbnr/ppp2ppp/8/3pp3/5P2/6PN/PPPPP2P/RNBQKB1R",
  "r1bqkb1r/ppp2ppp/2np1n2/4p3/2P5/1PN1P3/P2P1PPP/R1BQKBNR",
  "rnbqkbnr/pppppppp/8/8/8/P7/1PPPPPPP/RNBQKBNR",
  "rnbqkbnr/1ppppppp/8/p7/1P6/P7/2PPPPPP/RNBQKBNR",
  "rnbqkbnr/pppppppp/8/8/8/5P2/PPPPP1PP/RNBQKBNR",
  "rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR",
  "rnbqkbnr/ppp1pp1p/6p1/8/3Pp3/2P2P2/PP4PP/RNBQKBNR",
  "rnbqkbnr/ppppp1pp/8/8/4p3/2N2P2/PPPP2PP/R1BQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/8/5P2/PPPPPKPP/RNBQ1BNR",
  "rnbqkbnr/pppppppp/8/8/8/7P/PPPPPPP1/RNBQKBNR",
  "rnbqkbnr/ppppppp1/8/7p/6P1/7P/PPPPPP2/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/P6P/8/1PPPPPP1/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/8/3pp3/8/P6P/1PPPPPP1/RNBQKBNR",
  "r1bq1rk1/ppp2ppp/2nb1n2/3pp3/8/PPPPPPP1/7P/RNBQKBNR",
  "r1bq1rk1/ppp2ppp/2nb1n2/3pp3/8/P2PP1PP/1PPN1PB1/R1BQK1NR",
  "rnbqkbnr/pppp1ppp/8/4p3/8/P6P/1PPPPPP1/RNBQKBNR",
  "rnbqkbnr/pppppppp/8/8/6P1/8/PPPPPP1P/RNBQKBNR",
  "rnbqkbnr/ppppp1pp/8/5p2/6P1/8/PPPPPP1P/RNBQKBNR",
  "rnbqkbnr/pppppp1p/8/6p1/6P1/8/PPPPPP1P/RNBQKBNR",
  "rnbqkbnr/pppppp1p/8/6p1/5PP1/8/PPPPP2P/RNBQKBNR",
  "rnbqkbnr/ppp1pppp/8/3p4/6P1/8/PPPPPPBP/RNBQK1NR",
  "rnbqkbnr/pp2pppp/2p5/3p4/6P1/8/PPPPPPBP/RNBQK1NR",
  "rnbqkbnr/ppp1ppp1/8/3p3P/8/8/PPPPPPBP/RNBQK1NR",
  "rn1qkbnr/ppp1pppp/8/3p4/2P3b1/8/PP1PPPBP/RNBQK1NR",
  "q3kbnr/p1pnpppp/8/8/2Pp2b1/8/PP1PPP1P/RNBQK1NR",
  "rnbqkbnr/ppp2ppp/8/3p4/3p2P1/2P5/PP2PPBP/RNBQK1NR",
  "rnbqkbnr/pp2pppp/2p5/8/2p3P1/1P6/P2PPPBP/RNBQK1NR",
  "rnbqkbnr/pp3ppp/2p5/3pp3/6P1/7P/PPPPPPB1/RNBQK1NR",
  "rnbqk2r/pp2nppp/2pb4/3p4/2PPp1P1/2N4P/PP2PPB1/R1BQK1NR",
  "r1bqkbnr/pppp1ppp/2n5/4p3/6P1/7P/PPPPPP2/RNBQKBNR",
  "rn1qkbnr/ppp1pppp/8/8/2Pp2b1/8/PP1PPPBP/RNBQK1NR",
  "rnbqkbnr/pp2pppp/2p5/3p2P1/8/8/PPPPPPBP/RNBQK1NR",
  "rnbqkbnr/ppp2ppp/8/3pp3/2P3P1/8/PP1PPPBP/RNBQK1NR",
  "rnbqkbnr/ppp1pppp/8/8/4p1P1/2N5/PPPP1P1P/R1BQKBNR",
  "rnbqkbnr/ppp1ppp1/8/7p/4p1P1/2N5/PPPP1P1P/R1BQKBNR",
  "rnbqkbnr/ppp2ppp/8/4p3/4p1P1/2NP4/PPP2P1P/R1BQKBNR",
  "rnbqkbnr/pppppppp/8/8/8/6P1/PPPPPP1P/RNBQKBNR",
  "r1bqkbnr/ppp3pp/2n5/4Pp2/3pN3/6P1/PPP1PP1P/R1BQKBNR",
  "rnbqk1nr/ppp1bppp/8/3p4/4p2N/P2P2P1/1PP1PP1P/RNBQKB1R",
  "rnbqkbnr/ppp2ppp/8/3pp3/1P6/6P1/P1PPPPBP/RNBQK1NR",
  "rnbqkbnr/ppp2ppp/4p3/3p4/8/6P1/PPPPPPBP/RNBQK1NR",
  "rnbqkbnr/ppppp1pp/8/5p2/8/6P1/PPPPPP1P/RNBQKBNR",
  "rnbqkb1r/pppppppp/5n2/8/8/6P1/PPPPPP1P/RNBQKBNR",
  "rnbqkbnr/pppppp1p/8/6p1/8/6P1/PPPPPP1P/RNBQKBNR",
  "rnbqkbnr/ppppp2p/6p1/7Q/4p3/6P1/PPPP1P1P/RNB1KBNR",
  "rn1qkbnr/ppp2ppp/8/3p4/5p2/6PB/PPPPP2P/RNBQ1RK1",
  "rnbqkbnr/pppp1ppp/8/4p3/8/5NP1/PPPPPP1P/RNBQKB1R",
  "rnbqkb1r/pppp1ppp/5n2/8/1P2p3/6P1/P1PPPP1P/RNBQKBNR",
  "rnbqkbnr/pp2pppp/8/2pp4/8/6P1/PPPPPPBP/RNBQK1NR",
  "rnbqkbnr/pppp1ppp/8/8/4p2N/6P1/PPPPPP1P/RNBQKB1R",
  "rnbqkbnr/pp1ppppp/8/2p5/8/6P1/PPPPPP1P/RNBQKBNR",
  "rnbqkbnr/pp2pppp/2p5/3p4/8/6P1/PPPPPPBP/RNBQK1NR",
  "rnbqkbnr/pppppp1p/6p1/8/8/6P1/PPPPPP1P/RNBQKBNR",
  "rnbqkbnr/ppppppp1/8/8/7p/5NP1/PPPPPP1P/RNBQKB1R",
  "rnbqkbnr/ppp2ppp/8/4p3/2p5/1P4P1/P2PPPBP/RNBQK1NR",
  "rnbqkbnr/pppppppp/8/8/7P/8/PPPPPPP1/RNBQKBNR",
  "rnbqkbnr/ppp1pppp/8/3p4/7P/7R/PPPPPPP1/RNBQKBN1",
  "rnbqkbnr/pp1ppppp/8/2p5/1P5P/8/P1PPPPP1/RNBQKBNR",
  "rnbqkbnr/pp2pppp/8/3p4/3p3P/2P2N2/PP2PPP1/RNBQKB1R",
  "rnbqkbnr/pppp1ppp/8/8/3p3P/2P5/PP2PPP1/RNBQKBNR",
  "rnbqkbnr/pp2pppp/8/2pp4/3PP2P/8/PPP2PP1/RNBQKBNR",
  "rnbqkbnr/pppppp1p/8/6p1/7P/8/PPPPPPP1/RNBQKBNR",
  "rnbqkbnr/ppppp1pp/8/8/4p2P/3P4/PPP2PP1/RNBQKBNR",
  "rnbqkbnr/ppppppp1/8/7p/8/6P1/PPPPPP1P/RNBQKBNR",
  "rnbqkbnr/pppppppp/8/8/8/3P4/PPP1PPPP/RNBQKBNR",
  "rnbqkbnr/pppppp1p/6p1/8/6P1/3P4/PPP1PP1P/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/8/3P4/PPP1PPPP/RNBQKBNR",
  "rnbqkbnr/pppppppp/8/8/1P6/8/P1PPPPPP/RNBQKBNR",
  "rn1qkbnr/ppp1pppp/8/3p1b2/1P6/8/PBPPPPPP/RN1QKBNR",
  "rnbqkbnr/pp1ppppp/8/2p5/1P6/8/P1PPPPPP/RNBQKBNR",
  "rnbqkbnr/pppp2pp/5p2/1P2p3/8/8/PBPPPPPP/RN1QKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/1P6/P7/2PPPPPP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/3p4/4p3/1P6/8/PBPPPPPP/RN1QKBNR",
  "rnbqkbnr/ppppp1pp/8/5p2/1P6/8/P1PPPPPP/RNBQKBNR",
  "rnb1kbnr/ppp1pppp/3q4/3p4/1P6/8/PBPPPPPP/RN1QKBNR",
  "r1bqkbnr/pppppppp/2n5/8/1P6/8/P1PPPPPP/RNBQKBNR",
  "rnbqkb1r/pppppppp/7n/8/1P6/8/P1PPPPPP/RNBQKBNR",
  "rnbqkb1r/pppppp1p/5np1/8/1P6/8/PBPPPPPP/RN1QKBNR",
  "rnbqkb1r/pppppp1p/5np1/8/1P2P3/8/PBPP1PPP/RN1QKBNR",
  "rnbq1rk1/ppp1ppbp/3p1np1/8/1PPP4/4PN2/PB3PPP/RN1QKB1R",
  "rnbqkbnr/pp2pppp/2p5/3p4/PP6/8/1BPPPPPP/RN1QKBNR",
  "rnbqkbnr/pp1ppppp/2p5/8/1P6/8/P1PPPPPP/RNBQKBNR",
  "rnbqkb1r/p1pp1ppp/1p2pn2/1P6/8/8/PBPPPPPP/RN1QKBNR",
  "rnbqkb1r/1ppp1ppp/p3pn2/1P6/8/8/PBPPPPPP/RN1QKBNR",
  "1nbqkb1r/1ppp1ppp/4pn2/1P6/8/8/2PPPPPP/BN1QKBNR",
  "rnbqkb1r/ppp2ppp/4pn2/1P1p4/8/4P3/PBPP1PPP/RN1QKBNR",
  "rnbqkbnr/1p1ppppp/8/pp6/4P3/8/PBPP1PPP/RN1QKBNR",
  "rnbqkbnr/p1pppppp/8/1p6/1P6/8/P1PPPPPP/RNBQKBNR",
  "rnbqkbnr/pppp2pp/5p2/4p3/1P2P3/8/PBPP1PPP/RN1QKBNR",
  "rnbqkbnr/pp1p1ppp/8/2p1p3/1P6/8/PBPPPPPP/RN1QKBNR",
  "rnbqkbnr/pppppppp/8/8/8/2P5/PP1PPPPP/RNBQKBNR",
  "rnbqkbnr/pppppppp/8/8/8/N7/PPPPPPPP/R1BQKBNR",
  "rnbqkbnr/pppppp1p/6p1/8/6P1/N7/PPPPPP1P/R1BQKBNR",
  "r1bqkbnr/pppp2pp/2n5/4pp2/2N1P3/8/PPPP1PPP/R1BQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/8/3P4/PPPNPPPP/R1BQKBNR",
  "rnbqkbnr/pppppppp/8/8/8/2N5/PPPPPPPP/R1BQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/8/P1N5/1PPPPPPP/R1BQKBNR",
  "rnbqk1nr/pppp1ppp/8/2b1p3/8/2N2N2/PPPPPPPP/R1BQKB1R",
  "rnbqkbnr/pp2pppp/2p5/3p4/4P3/2N4P/PPPP1PP1/R1BQKBNR",
  "rnbqkbnr/ppp2ppp/8/3pp3/5P2/2N5/PPPPP1PP/R1BQKBNR",
  "rnbqkbnr/ppp1pppp/8/8/4p3/2N2P2/PPPP2PP/R1BQKBNR",
  "rnbqkbnr/ppp1pppp/8/8/4p3/2NP4/PPP2PPP/R1BQKBNR",
  "rnbqkbnr/pp1ppppp/8/2p5/1P6/2N5/P1PPPPPP/R1BQKBNR",
  "rnbqkbnr/ppp2ppp/8/4p3/4p3/1PNP4/P1P2PPP/R1BQKBNR",
  "rnbqkbnr/ppp1pppp/8/8/2B1p3/2N5/PPPP1PPP/R1BQK1NR",
  "r1bqkbnr/ppp2ppp/2np4/4P3/8/2N5/PPPPP1PP/R1BQKBNR",
  "rn1qkbnr/ppp2ppp/4b3/3pp2Q/8/2N1P3/PPPP1PPP/R1B1KBNR",
  "rnbqkb1r/pp2p1pp/5n2/2p2p2/1P1p1P2/5N2/P1PPPNPP/R1BQKB1R",
  "rnbqkbnr/ppppp1pp/8/8/4p3/2NP4/PPP2PPP/R1BQKBNR",
  "rnbqkbnr/p1pppppp/8/1p6/8/2N5/PPPPPPPP/R1BQKBNR",
  "rnbqkb1r/ppp2ppp/5n2/3pp2Q/8/2N1P3/PPPP1PPP/R1B1KBNR",
  "rnbqkbnr/pp2pppp/8/2p5/3pNP2/8/PPPPP1PP/R1BQKBNR",
  "rnbqkbnr/pppppp1p/6p1/8/7P/2N5/PPPPPPP1/R1BQKBNR",
  "r1bqkbnr/pppp1ppp/2n5/4p3/3P4/2N2N2/PPP1PPPP/R1BQKB1R",
  "r1bqkbnr/pp1ppppp/2n5/8/7Q/2N5/PPP1PPPP/R1B1KBNR",
  "rnbqkbnr/pppp1ppp/8/8/4Pp2/2N5/PPPP2PP/R1BQKBNR",
  "rnbqkbnr/ppp2ppp/8/4p3/3pNP2/8/PPPPP1PP/R1BQKBNR",
  "rnbqkbnr/ppp2ppp/8/4p3/3pNP2/5N2/PPPPP1PP/R1BQKB1R",
  "rnbqkbnr/pppp1ppp/8/4p3/8/2N5/PPPPPPPP/R1BQKBNR",
  "r1bqkbnr/pppp1ppp/2n5/8/Q7/2N5/PPP1PPPP/R1B1KBNR",
  "r1bqkbnr/pp1ppppp/2n5/8/3N4/2N5/PPP1PPPP/R1BQKB1R",
  "rnbqk1nr/ppp2ppp/8/3pp3/1b1P4/2N1P3/PPP2PPP/R1BQKBNR",
  "rnbqkbnr/pp1ppppp/8/2p5/8/2N5/PPPPPPPP/1RBQKBNR",
  "rnbqkb1r/pppppppp/5n2/8/6P1/2N5/PPPPPP1P/R1BQKBNR",
  "rnbqkb1r/ppp1pppp/5n2/3p4/8/2NP2P1/PPP1PP1P/R1BQKBNR",
  "rnbqkbnr/ppp1pp1p/8/3p2p1/5P2/2N5/PPPPP1PP/R1BQKBNR",
  "rnbqkbnr/pppppppp/8/8/8/4P3/PPPP1PPP/RNBQKBNR",
  "rnbqkbnr/p1pp1ppp/8/1p2p3/8/1B2P3/PPPP1PPP/RNBQK1NR",
  "rnbqkb1r/pppp1ppp/5n2/8/5p2/2N1PN2/PPPP2PP/R1BQKB1R",
  "r1bqkbnr/pppp1ppp/2n5/8/5p2/2N1PN2/PPPP2PP/R1BQKB1R",
  "rnbqkbnr/ppp2ppp/8/3p4/5p2/2N1PN2/PPPP2PP/R1BQKB1R",
  "r1bqkbnr/pp1ppppp/2n5/2p5/8/2NP2P1/PPP1PP1P/R1BQKBNR",
  "rnbqkbnr/pppppppp/8/8/P7/8/1PPPPPPP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/P7/R7/1PPPPPPP/1NBQKBNR",
  "rnbqkbnr/ppp3pp/P7/3ppp2/8/4P3/1PPP1PPP/RNBQKBNR",
  "rn1qkbnr/pbpppppp/8/1P6/8/8/1PPPPPPP/RNBQKBNR",
  "rnbqkbnr/pppppppp/8/8/8/1P6/P1PPPPPP/RNBQKBNR",
  "rnbqkbnr/ppp1pppp/8/3p4/8/1P6/P1PPPPPP/RNBQKBNR",
  "rnbqkbnr/ppppp1pp/8/5p2/8/1P6/P1PPPPPP/RNBQKBNR",
  "rnbqkbnr/pp1ppppp/8/2p5/8/1P6/P1PPPPPP/RNBQKBNR",
  "rnbqkbnr/ppp1pppp/8/3p4/8/BP6/P1PPPPPP/RN1QKBNR",
  "rnbqkb1r/pppppppp/5n2/8/8/1P6/P1PPPPPP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/8/1P6/P1PPPPPP/RNBQKBNR",
  "r1bqkbnr/pppp1ppp/2n5/4p3/8/1P6/PBPPPPPP/RN1QKBNR",
  "r1bqkbnr/pppp1ppp/2n5/4p3/8/1P2P3/PBPP1PPP/RN1QKBNR",
  "r1bqkbnr/pppp1ppp/2n5/4p3/5P2/1P6/PBPPP1PP/RN1QKBNR",
  "rnbqkbnr/p1pppppp/8/1p6/8/1P6/P1PPPPPP/RNBQKBNR",
  "rnbqkbnr/pppp2pp/4p3/5p2/4P3/1P6/PBPP1PPP/RN1QKBNR",
  "rnbqkb1r/pppppp1p/5np1/8/6P1/1P6/PBPPPP1P/RN1QKBNR",
  "rnbqkbnr/p1pppppp/1p6/8/8/1P6/P1PPPPPP/RNBQKBNR",
  "rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR",
  "rnbqkb1r/pppppppp/5n2/8/5P2/8/PPPPP1PP/RNBQKBNR",
  "rnbqkb1r/pppppp1p/5np1/8/1P3P2/5N2/P1PPP1PP/RNBQKB1R",
  "rnbqkbnr/ppp1p1pp/8/3p1p2/3P1P2/8/PPP1P1PP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/5P2/8/PPPPP1PP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/5P2/2N5/PPPPP1PP/R1BQKBNR",
  "rnbqkb1r/ppp2ppp/3P1n2/8/8/8/PPPPP1PP/RNBQKBNR",
  "rnbqk1nr/ppp2p1p/3b4/6p1/8/5N2/PPPPP1PP/RNBQKB1R",
  "rnbqk2r/ppp2ppp/3b3n/8/3P4/5N2/PPP1P1PP/RNBQKB1R",
  "rnbqkbnr/pppppp1p/8/6p1/5P2/8/PPPPP1PP/RNBQKBNR",
  "rnbqkbnr/pppppp2/7p/6p1/5P2/5N2/PPPPP1PP/RNBQKB1R",
  "rnbqkb1r/pppppppp/7n/8/5P2/8/PPPPP1PP/RNBQKBNR",
  "rnbqkbnr/pppp2pp/5p2/4P3/8/8/PPPPP1PP/RNBQKBNR",
  "rnbqkb1r/pppppppp/5n2/8/2P2P2/8/PP1PP1PP/RNBQKBNR",
  "rnbqkbnr/p1pppppp/8/1p6/5P2/8/PPPPP1PP/RNBQKBNR",
  "rnbqkb1r/ppppnppp/8/4P3/8/8/PPPPP1PP/RNBQKBNR",
  "r1bqkbnr/pppp1ppp/2n5/4P3/8/8/PPPPP1PP/RNBQKBNR",
  "rnbqkbnr/pp1p1ppp/8/2p5/3p1P2/2P2N2/PP2P1PP/RNBQKB1R",
  "rnbqkb1r/ppppp1pp/5n2/8/4pPP1/2N5/PPPP3P/R1BQKBNR",
  "rnbqkbnr/ppppp1pp/8/5p2/4PP2/8/PPPP2PP/RNBQKBNR",
  "rnbqkbnr/ppp1pppp/8/3p4/5P2/8/PPPPP1PP/RNBQKBNR",
  "rnbqkbnr/ppp1pppp/8/3p4/5PP1/8/PPPPP2P/RNBQKBNR",
  "rnbqkb1r/pp2pppp/5n2/2pp4/5P2/4PN2/PPPP2PP/RNBQKB1R",
  "rnbqkbnr/ppp1pppp/8/3p4/2P2P2/8/PP1PP1PP/RNBQKBNR",
  "rnbqkb1r/pp2pppp/5n2/2p5/3p1P2/1P2PN2/PBPP2PP/RN1QKB1R",
  "rnbqkbnr/ppp1pppp/8/3p4/4PP2/8/PPPP2PP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/5n2/8/4pP2/2N5/PPPPQ1PP/R1B1KBNR",
  "rnbqkb1r/ppp1pppp/5n2/8/4pP2/2N5/PPPPN1PP/R1BQKB1R",
  "rnb1k1nr/pp1pppbp/6p1/q1P5/8/4PN2/PPP2PPP/RNBQKB1R",
  "rnb1k1nr/pp1pppbp/1q4p1/2p5/2PPP3/5N2/PP3PPP/RNBQKB1R",
  "rnb1k1nr/pp1pppbp/6p1/q1p5/2PPP3/5N2/PP3PPP/RNBQKB1R",
  "rnb1k1nr/pp2ppbp/3p2p1/q1P5/2P1P3/5N2/PP3PPP/RNBQKB1R",
  "rnbqkb1r/pppppp1p/6pn/8/3P4/5N2/PPP1PPPP/RNBQKB1R",
  "r1bqkbnr/pp1ppppp/n7/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R",
  "rnbqkbnr/ppppp1pp/5p2/8/8/5N2/PPPPPPPP/RNBQKB1R",
  "rnbqkb1r/pppppnpp/5p2/8/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/ppppppp1/7p/8/8/5N2/PPPPPPPP/RNBQKB1R",
  "r1bqkbnr/pppppppp/2n5/8/8/5N2/PPPPPPPP/RNBQKB1R",
  "r1bqkb1r/pppppppp/n6n/8/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/ppppp1pp/8/5p2/8/5N2/PPPPPPPP/RNBQKB1R",
  "rnbqkbnr/pppppp1p/8/6p1/8/5N2/PPPPPPPP/RNBQKB1R",
  "rnbqkbnr/pppppp1p/6p1/8/8/5N2/PPPPPPPP/RNBQKB1R",
  "rnbqkbnr/ppppp1pp/8/5p2/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkb1r/ppppp1pp/5n2/5p2/4P3/3P1N2/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/ppp1pppp/3p4/8/8/5N2/PPPPPPPP/RNBQKB1R",
  "rnbqkbnr/p1pppppp/8/1p6/8/5N2/PPPPPPPP/RNBQKB1R",
  "rnbqkbnr/pppp1ppp/4p3/8/8/5N2/PPPPPPPP/RNBQKB1R",
  "rnbqkbnr/p1pppppp/1p6/8/8/5N2/PPPPPPPP/RNBQKB1R",
  "rnbqkbnr/pppp1ppp/8/4p3/8/5N2/PPPPPPPP/RNBQKB1R",
  "rnbqkbnr/3p1ppp/p3p3/1pp5/2P5/2N2NP1/PP1PPP1P/R1BQKB1R",
  "rnbqkbnr/pp1ppppp/8/2p5/8/5N2/PPPPPPPP/RNBQKB1R",
  "rnbqkbnr/pp1ppppp/2p5/8/8/5N2/PPPPPPPP/RNBQKB1R",
  "rnbqkbnr/pp1ppppp/8/8/3p4/4PN2/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/1ppppppp/p7/8/8/5N2/PPPPPPPP/RNBQKB1R",
  "r1bqkbnr/ppp2ppp/2p5/8/8/8/PPPPPPPP/RNBQKB1R",
  "rnbqkbnr/ppp2ppp/3p4/4p3/3P4/5N2/PPP1PPPP/RNBQKB1R",
  "rn1qkbnr/ppp1pppp/3p4/8/4P1b1/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/1ppppppp/8/p7/8/5N2/PPPPPPPP/RNBQKB1R",
  "rnbqkb1r/ppp1pppp/5n2/3p4/8/5NP1/PPPPPP1P/RNBQKB1R",
  "rnbqkb1r/pppppp1p/5np1/8/1P6/5NP1/P1PPPP1P/RNBQKB1R",
  "rnbqkb1r/p1pppppp/5n2/1p6/8/5NP1/PPPPPP1P/RNBQKB1R",
  "rnbqkb1r/pppppp1p/5np1/8/8/5NP1/PPPPPP1P/RNBQKB1R",
  "rnbq1rk1/ppp1ppbp/5np1/3p4/8/3P1NP1/PPP1PPBP/RNBQ1RK1",
  "rnbqkb1r/pppppppp/5n2/8/1P6/5N2/P1PPPPPP/RNBQKB1R",
  "rnbqkb1r/pppppppp/5n2/8/8/5N2/PPPPPPPP/RNBQKB1R",
  "r1bqkb1r/pppppppp/2n2n2/8/8/2N2N2/PPPPPPPP/R1BQKB1R",
  "rnbq1rk1/ppp1ppbp/3p1np1/8/8/1P3NP1/PBPPPPBP/RN1Q1RK1",
  "rnbqkb1r/pppppppp/5n2/8/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkb1r/pppppp1p/5np1/8/PP6/5N2/2PPPPPP/RNBQKB1R",
  "rnbqkb1r/pppppppp/5n2/8/8/1P3N2/P1PPPPPP/RNBQKB1R",
  "rnbqkb1r/pppppppp/5n2/8/8/4PN2/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/ppp1pppp/8/3p4/8/1P3N2/P1PPPPPP/RNBQKB1R",
  "rnbqkbnr/pp2pppp/8/2pp4/4P3/1P3N2/P1PP1PPP/RNBQKB1R",
  "rnbqkb1r/pp2pppp/5n2/2pp4/4P3/1P3N2/PBPP1PPP/RN1QKB1R",
  "rnbqkbnr/ppp1pppp/8/3p4/8/5N2/PPPPPPPP/RNBQKB1R",
  "rnbqkbnr/ppp1pppp/8/3p4/8/5N2/PPPPPPPP/RNBQKBR1",
  "rnbqkbnr/ppp1pppp/8/3p4/8/3P1N2/PPP1PPPP/RNBQKB1R",
  "rnbqkbnr/pp2pppp/8/2p5/2p5/1P2PN2/P2P1PPP/RNBQKB1R",
  "rnbqkbnr/pp2pppp/8/2p5/2p5/1PN2N2/P2PPPPP/R1BQKB1R",
  "rnbqkbnr/ppp1pppp/8/3p4/8/2N2N2/PPPPPPPP/R1BQKB1R",
  "rnbqkbnr/ppp1pppp/8/3p4/1P6/5N2/P1PPPPPP/RNBQKB1R",
  "rnbqkbnr/ppp1pppp/8/3p4/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/ppp1pppp/8/3p4/P7/5N2/1PPPPPPP/RNBQKB1R",
  "rnbqkbnr/ppp1pp1p/8/3p2p1/8/5NP1/PPPPPP1P/RNBQKB1R",
  "rnbqkbnr/ppp1pppp/8/3p4/8/5NP1/PPPPPP1P/RNBQKB1R",
  "rnbqkbnr/ppp1pp1p/6p1/3p4/8/5NP1/PPPPPP1P/RNBQKB1R",
  "rn1qkbnr/ppp1pppp/8/3p4/6b1/5NP1/PPPPPP1P/RNBQKB1R",
  "r2qkbnr/pppnpppp/8/3p4/6b1/5NP1/PPPPPPBP/RNBQK2R",
  "rnbqkbnr/ppp2ppp/8/3pp3/8/5NP1/PPPPPP1P/RNBQKB1R",
  "rnbqk2r/ppp1npbp/6p1/3pp3/8/3P1NP1/PPP1PPBP/RNBQ1RK1",
  "rnbqkbnr/pp2pppp/8/2pp4/8/5NP1/PPPPPP1P/RNBQKB1R",
  "rn1qkb1r/pp2pppp/2p2n2/3p4/6b1/5NP1/PPPPPPBP/RNBQ1RK1",
  "r1bqkbnr/pp2pppp/2n5/2pp4/8/5NP1/PPPPPPBP/RNBQK2R",
  "r1bq1rk1/pp2bppp/2n1pn2/2pp4/4P3/3P1NP1/PPPN1PBP/R1BQR1K1",
  "rnbqkbnr/pp2pppp/8/2pp4/8/5NP1/PPPPPPBP/RNBQK2R",
  "r1bqkbnr/pp3ppp/2n1p3/2pp4/3P4/5NP1/PPP1PPBP/RNBQ1RK1",
  "rnbqkbnr/ppp1pppp/8/3p4/2P5/5N2/PP1PPPPP/RNBQKB1R",
  "rnbqkbnr/ppp1pppp/8/8/2Pp4/5N2/PP1PPPPP/RNBQKB1R",
  "rnbqkbnr/pp2pppp/8/2p5/1PPp4/5N2/P2PPPPP/RNBQKB1R",
  "rnbqkbnr/ppp1pppp/8/8/2Pp4/5N2/PP1PPPPP/RNBQKBR1",
  "rnbqkbnr/pp2pppp/8/2p5/1PPp4/4PN2/P2P1PPP/RNBQKB1R",
  "rnbqkbnr/ppp1pppp/8/8/2p5/5N2/PP1PPPPP/RNBQKB1R",
  "rn1qkbnr/ppp1pppp/4b3/8/2p5/4PN2/PP1P1PPP/RNBQKB1R",
  "rnbqkbnr/p1p1pppp/8/1p1p4/2P5/5N2/PP1PPPPP/RNBQKB1R",
  "rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR",
  "rnbqkb1r/pppppppp/5n2/8/2P1P3/8/PP1P1PPP/RNBQKBNR",
  "rnbqkbnr/pppp1p1p/6p1/4p3/2P1P3/8/PP1P1PPP/RNBQKBNR",
  "rnbqkbnr/ppppp1pp/8/5p2/2P5/8/PP1PPPPP/RNBQKBNR",
  "rnbqkbnr/ppppp1pp/8/5p2/2P1P3/8/PP1P1PPP/RNBQKBNR",
  "rnbqkbnr/ppp1p1pp/3p4/5p2/2P1P3/5N2/PP1P1PPP/RNBQKB1R",
  "rnbqkb1r/ppppp1pp/5n2/5p2/2P1P3/2N5/PP1P1PPP/R1BQKBNR",
  "r1bqkbnr/pppppppp/2n5/8/2P5/8/PP1PPPPP/RNBQKBNR",
  "rnbqkbnr/ppp1pppp/8/3p4/2P5/8/PP1PPPPP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/4p3/3P4/8/8/PP1PPPPP/RNBQKBNR",
  "rnb1kbnr/ppp1pppp/8/q7/8/2N5/PP1PPPPP/R1BQKBNR",
  "rnbqkb1r/ppp1pppp/5n2/3P4/8/8/PP1PPPPP/RNBQKBNR",
  "rnbqkbnr/pppppp1p/6p1/8/2P5/8/PP1PPPPP/RNBQKBNR",
  "rnbqkbnr/p1pppppp/8/1p6/2P5/8/PP1PPPPP/RNBQKBNR",
  "rnbq1rk1/1p3pbp/p1pp1np1/4p3/2P1P3/2NP2P1/PP2NPBP/R1BQ1RK1",
  "rnbqkbnr/pppppp1p/8/6p1/2P5/8/PP1PPPPP/RNBQKBNR",
  "rnbqk1nr/ppppppbp/8/6p1/2PP4/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/ppppp1pp/5n2/8/2P1p1P1/2N5/PP1P1P1P/R1BQKBNR",
  "rnbqkbnr/ppppp1pp/8/5p2/2P3P1/8/PP1PPP1P/RNBQKBNR",
  "rnbqkbnr/pppp1p1p/8/4p1p1/2PP4/8/PP2PPPP/RNBQKBNR",
  "rnbqkbnr/pp1ppppp/2p5/8/2P5/8/PP1PPPPP/RNBQKBNR",
  "rnbqkb1r/pp2pp1p/2p2np1/3p4/2P5/1P3N2/PB1PPPPP/RN1QKB1R",
  "rnbqkbnr/pp2pppp/2p5/3p4/2P5/1P3N2/P2PPPPP/RNBQKB1R",
  "rn1qkbnr/pp2pppp/2p5/3p4/2P3b1/1P3N2/P2PPPPP/RNBQKB1R",
  "rnbqkb1r/pp2pppp/2p2n2/3p4/2P5/1P3N2/PB1PPPPP/RN1QKB1R",
  "rn1qkb1r/pp2pppp/2p2n2/3p4/2P3b1/1P3N2/PB1PPPPP/RN1QKB1R",
  "rn1qkb1r/pp2pppp/2p2n2/3p1b2/2P5/1P3NP1/P2PPP1P/RNBQKB1R",
  "rn1qkb1r/pp2pppp/2p2n2/3p1b2/2P5/1P3N2/PB1PPPPP/RN1QKB1R",
  "rn1qkb1r/pp2pppp/2p2n2/3p4/2P3b1/1P3NP1/P2PPP1P/RNBQKB1R",
  "rnbqkbnr/pppp1ppp/4p3/8/2P5/8/PP1PPPPP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/4p3/8/2P5/5N2/PP1PPPPP/RNBQKB1R",
  "rnbqkbnr/ppp2ppp/4p3/3p4/2P5/5N2/PP1PPPPP/RNBQKB1R",
  "rnbqk2r/ppp2ppp/3bpn2/3p4/2P5/5NP1/PP1PPPBP/RNBQK2R",
  "rn1qkbnr/pbp2ppp/1p2p3/3p4/2P5/5NP1/PP1PPPBP/RNBQ1RK1",
  "rnbqkbnr/pp3ppp/4p3/2pp4/2P5/5NP1/PP1PPP1P/RNBQKB1R",
  "rnbqkb1r/ppp2ppp/4pn2/8/2p5/5NP1/PP1PPPBP/RNBQK2R",
  "rnbqkb1r/pp3ppp/2p1pn2/3p4/2P5/5NP1/PP1PPPBP/RNBQK2R",
  "rnbqkbnr/pp3ppp/2p1p3/3p4/2P5/5NP1/PP1PPP1P/RNBQKB1R",
  "r1bqk2r/pp2bppp/2n1pn2/2pp4/2P5/1P3NP1/P2PPPBP/RNBQ1RK1",
  "rnbqkb1r/pp3ppp/4pn2/2pp4/2P5/1P2PN2/PB1P1PPP/RN1QKB1R",
  "rnbqkb1r/ppp2ppp/4pn2/3p4/2P5/5NP1/PP1PPP1P/RNBQKB1R",
  "rnbqk2r/ppp1bppp/4pn2/3p4/2P5/5NP1/PP1PPPBP/RNBQK2R",
  "rnbqkb1r/2pp1ppp/p3pn2/1p6/2P5/5NP1/PP1PPPBP/RNBQK2R",
  "r1bqk2r/pp2bppp/2n1p3/2pn4/8/2N2NP1/PP1PPPBP/R1BQ1RK1",
  "rnbqk2r/ppp1bppp/4pn2/3p4/2P5/5NP1/PP1PPPBP/RNBQ1RK1",
  "rnbq1rk1/pp2bppp/2p1pn2/3p4/2P5/1P3NP1/PB1PPPBP/RN1Q1RK1",
  "rnbqkb1r/pppppppp/5n2/8/2P5/8/PP1PPPPP/RNBQKBNR",
  "rnbqk2r/ppppppbp/5np1/8/2P1P3/2N2N2/PP1P1PPP/R1BQKB1R",
  "rnbqkb1r/ppp1pp1p/5np1/3p4/2P5/5NP1/PP1PPP1P/RNBQKB1R",
  "rnbqkb1r/pppppp1p/5np1/8/2P5/5N2/PP1PPPPP/RNBQKB1R",
  "rn1qkb1r/pbpppp1p/1p3np1/8/2P5/5NP1/PP1PPPBP/RNBQK2R",
  "rnbqkb1r/pppppppp/5n2/8/2P5/5N2/PP1PPPPP/RNBQKB1R",
  "rnbqkb1r/ppp1pppp/3p1n2/8/2P5/5N2/PP1PPPPP/RNBQKB1R",
  "rnbqkb1r/p1pppppp/1p3n2/8/2P5/5N2/PP1PPPPP/RNBQKB1R",
  "rn1qkb1r/pbpp1ppp/1p2pn2/8/2P5/5NP1/PP1PPPBP/RNBQK2R",
  "rnbqkb1r/1ppp1ppp/p3pn2/8/2P5/5NP1/PP1PPP1P/RNBQKB1R",
  "rnbqkb1r/ppp1pppp/5n2/3p4/2P5/5N2/PP1PPPPP/RNBQKB1R",
  "rnbqkb1r/ppp1pppp/8/3n4/8/5N2/PP1PPPPP/RNBQKB1R",
  "rnbqkb1r/pp1ppp1p/2p2np1/8/2P5/5NP1/PP1PPP1P/RNBQKB1R",
  "rnbqkb1r/pppppppp/5n2/8/1PP5/8/P2PPPPP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/5n2/3p4/2P5/2N5/PP1PPPPP/R1BQKBNR",
  "rnbqk2r/ppp2pbp/6p1/3np3/8/2N2NP1/PP1PPPBP/R1BQK2R",
  "rnbqkb1r/ppp1pppp/8/3n4/8/2N2N2/PP1PPPPP/R1BQKB1R",
  "rnbqkb1r/ppp1pp1p/1n4p1/8/8/2N3P1/PP1PPPBP/R1BQK1NR",
  "rnbqkb1r/ppp1pp1p/6p1/8/8/2n3P1/PP1PPPBP/R1BQK1NR",
  "rnbqkb1r/pppppppp/5n2/8/2P5/2N5/PP1PPPPP/R1BQKBNR",
  "rnbqkb1r/pppp1ppp/4pn2/8/2P5/2N5/PP1PPPPP/R1BQKBNR",
  "rnbqk2r/pppp1ppp/4pn2/8/1bP5/2N2N2/PP1PPPPP/R1BQKB1R",
  "rnbqkb1r/p1pp1ppp/1p2pn2/8/2P5/2N2N2/PP1PPPPP/R1BQKB1R",
  "rn1qkb1r/pbpp1ppp/1p2pn2/8/2P1P3/2NB1N2/PP1P1PPP/R1BQK2R",
  "rnbqk2r/pppp1ppp/4pn2/8/1bP3P1/2N2N2/PP1PPP1P/R1BQKB1R",
  "rnbqkb1r/pppp1ppp/4pn2/8/2P1P3/2N5/PP1P1PPP/R1BQKBNR",
  "r1bqkb1r/pppp1ppp/2n1pn2/8/2P1P3/2N5/PP1P1PPP/R1BQKBNR",
  "rnbqkb1r/ppp2ppp/4pn2/3pP3/2P5/2N5/PP1P1PPP/R1BQKBNR",
  "rnbqkbnr/pp1p1ppp/4p3/2p1P3/2P5/2N5/PP1P1PPP/R1BQKBNR",
  "rnbqkb1r/pp1p1ppp/4pn2/2p5/2P1P3/2N5/PP1P1PPP/R1BQKBNR",
  "rnbqkbnr/pppp1pp1/8/4p2p/2P5/6P1/PP1PPP1P/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/2P5/8/PP1PPPPP/RNBQKBNR",
  "rnbqkb1r/pppp1ppp/5n2/8/2P2p2/4PN2/PP1P2PP/RNBQKB1R",
  "rnbqkbnr/pppp1ppp/8/4p3/2P5/5N2/PP1PPPPP/RNBQKB1R",
  "rnbqkbnr/pppp1ppp/8/8/2P1p3/5N2/PP1PPPPP/RNBQKB1R",
  "rnbqkbnr/ppp2ppp/3p4/4p3/2P5/2N2N2/PP1PPPPP/R1BQKB1R",
  "rnbqkbnr/pp3ppp/2pp4/4p3/2P5/2N3P1/PP1PPP1P/R1BQKBNR",
  "rnbqk1nr/pppp1ppp/8/4p3/1bP5/2N5/PP1PPPPP/R1BQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/2P5/2N5/PP1PPPPP/R1BQKBNR",
  "rn1qkbnr/ppp2ppp/3p4/4p3/2P3b1/2N2N2/PP1PPPPP/R1BQKB1R",
  "r2qkbnr/ppp2ppp/2npb3/4p3/2P5/2N3P1/PP1PPPBP/R1BQK1NR",
  "rnbqkb1r/pppp1ppp/5n2/4p3/2P5/2N3P1/PP1PPP1P/R1BQKBNR",
  "rnbqkb1r/p1pp1ppp/5n2/1p4N1/2P1p3/2N5/PP1PPPPP/R1BQKB1R",
  "rnbqkb1r/pppp1ppp/5n2/4p3/2P5/2N5/PP1PPPPP/R1BQKBNR",
  "rnbqkb1r/ppp2ppp/5n2/3pp3/2P5/2N3P1/PP1PPP1P/R1BQKBNR",
  "rnbqk2r/pppp1ppp/5n2/4p3/1bP5/2N3P1/PP1PPP1P/R1BQKBNR",
  "rnbqkb1r/pppp1ppp/8/6N1/2P1p1n1/2N5/PP1PPPPP/R1BQKB1R",
  "rnbqkb1r/pppp1ppp/5n2/4p3/2P2P2/2N5/PP1PP1PP/R1BQKBNR",
  "rnbqkb1r/pp1p1ppp/2p2n2/4p3/2P5/2N3P1/PP1PPP1P/R1BQKBNR",
  "rnbqkb1r/pppp1p1p/5np1/4p3/2P5/2N3P1/PP1PPP1P/R1BQKBNR",
  "r1bqk2r/pppp1pbp/2n3pn/4p3/2P5/2N3P1/PP1PPPBP/1RBQK1NR",
  "r1bqk2r/ppp2pbp/2np2pn/4p3/2P5/2N1P1P1/PP1PNPBP/R1BQK2R",
  "r2qk1nr/ppp2pbp/2npb1p1/4p3/2P5/2N1P1P1/PP1PNPBP/R1BQK2R",
  "r1bqk1nr/pppp1pbp/2n3p1/4p3/2P5/2NP2P1/PP2PPBP/R1BQK1NR",
  "r1bqk1nr/pppp1pbp/2n3p1/4p3/2P5/2N3P1/PP1PPPBP/1RBQK1NR",
  "r1bqkbnr/pppp1ppp/2n5/4p3/2P5/2N5/PP1PPPPP/R1BQKBNR",
  "r1bqk1nr/pppp1pbp/2n3p1/4p3/2P5/2N3P1/PP1PPPBP/R1BQK1NR",
  "r1bqk1nr/ppp2pbp/2np2p1/4p3/2P1P3/2NP2P1/PP3PBP/R1BQK1NR",
  "r1bqk1nr/ppp2pbp/2np2p1/4p3/2P5/2NP2P1/PP2PPBP/R1BQK1NR",
  "r1bqkbnr/pppp1ppp/2n5/4p3/2P5/2N2N2/PP1PPPPP/R1BQKB1R",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/2P1P3/2N2N2/PP1P1PPP/R1BQKB1R",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/2P5/2N2N2/PP1PPPPP/R1BQKB1R",
  "r1bqk2r/pppp1pp1/5n1p/4n3/2PN3B/2P5/P3PPPP/R2QKB1R",
  "r1bqkb1r/pppp1ppp/2n2n2/8/2PPp3/2N2N2/PP2PPPP/R1BQKB1R",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/2P5/2NP1N2/PP2PPPP/R1BQKB1R",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/2P5/P1N2N2/1P1PPPPP/R1BQKB1R",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/2P5/2N1PN2/PP1P1PPP/R1BQKB1R",
  "r1bqk2r/pppp1ppp/2n2n2/4p3/2P5/2b1PN2/PPQP1PPP/R1B1KB1R",
  "r1bqr1k1/pppp1ppp/2n2n2/3NpQ2/1bP5/4PN2/PP1P1PPP/R1B1KB1R",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/2P5/2N2NP1/PP1PPP1P/R1BQKB1R",
  "rnbqkbnr/pp1ppppp/8/2p5/2P5/8/PP1PPPPP/RNBQKBNR",
  "rnbqkbnr/pp1ppppp/8/2p5/2P5/5N2/PP1PPPPP/RNBQKB1R",
  "rn1qk2r/pb1pbppp/1p2pn2/2p5/2P5/2N2NP1/PP1PPPBP/R1BQ1RK1",
  "rnbqkb1r/pp1ppppp/5n2/2p5/1PP5/5N2/P2PPPPP/RNBQKB1R",
  "r2qk2r/1b1nbppp/pp1ppn2/8/2PQ4/1PN2NP1/P3PPBP/R1BR2K1",
  "rnbqkbnr/pp1ppppp/8/2p5/1PP5/8/P2PPPPP/RNBQKBNR",
  "rnbqkb1r/pp1ppppp/5n2/2p5/2PP4/5N2/PP2PPPP/RNBQKB1R",
  "rnbqkb1r/pp1p1ppp/4pn2/8/2PN4/8/PP2PPPP/RNBQKB1R",
  "r1b1kb1r/pp1p1ppp/1qn1pn2/8/2PN4/2N3P1/PP2PP1P/R1BQKB1R",
  "r1bqkb1r/pp1p1ppp/2n1pn2/8/2PN4/2N5/PP2PPPP/R1BQKB1R",
  "rnbqkb1r/pp1ppppp/5n2/2p5/2P5/2N3P1/PP1PPP1P/R1BQKBNR",
  "rnbqkbnr/pp1ppppp/8/2p5/2P5/2N5/PP1PPPPP/R1BQKBNR",
  "rnbqkb1r/ppn1pppp/8/2p5/8/2N3P1/PP1PPPBP/R1BQK1NR",
  "rnbqkb1r/pp1ppppp/5n2/2p5/2P5/2N2N2/PP1PPPPP/R1BQKB1R",
  "r1bqkb1r/pp1ppppp/2n2n2/2p5/2P5/2N2N2/PP1PPPPP/R1BQKB1R",
  "r1bqkbnr/pp1ppppp/2n5/2p5/2P5/2N5/PP1PPPPP/R1BQKBNR",
  "r1bqk1nr/pp1pppbp/2n3p1/2p5/2P1P3/2N3P1/PP1P1PBP/R1BQK1NR",
  "r1bqk1nr/pp1p1pbp/2n3p1/2p1p3/2P5/2N1P1P1/PP1P1PBP/R1BQK1NR",
  "r1bqk1nr/pp1pppbp/2n3p1/2p5/2P5/2N3P1/PP1PPPBP/R1BQK1NR",
  "r1bqkbnr/pp1ppppp/2n5/2p5/2P5/2N3P1/PP1PPP1P/R1BQKBNR",
  "r1bqk1nr/pp1p1pbp/2n3p1/2p1p3/2P5/2N2NP1/PP1PPPBP/R1BQK2R",
  "r1bqk1nr/pp1pppbp/2n3p1/2p5/2P5/2N2NP1/PP1PPPBP/R1BQK2R",
  "r1bq1rk1/pp1pppbp/2n2np1/2p5/2P5/1PN2NP1/P2PPPBP/R1BQ1RK1",
  "r1bq1rk1/pp1pppbp/2n2np1/2p5/2P5/2NP1NP1/PP2PPBP/R1BQ1RK1",
  "r1bqk2r/pp1pppbp/2n2np1/2p5/2P5/2N2NP1/PP1PPPBP/R1BQK2R",
  "r1bq1rk1/pp1pppbp/2n2np1/2p5/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "r1bqkbnr/pppppppp/n7/8/3P4/8/PPP1PPPP/RNBQKBNR",
  "rnbqk2r/pp2npbp/3p2p1/2pP4/4P3/2N2N2/PP3PPP/R1BQKB1R",
  "rnbqkbnr/pppppp1p/8/6p1/3P4/8/PPP1PPPP/RNBQKBNR",
  "rnb1k1nr/pp1pppbp/6p1/q1p5/3P4/3BPN2/PPP2PPP/RNBQK2R",
  "rnb1k1nr/pp1pppbp/6p1/q7/3N4/3BP3/PPP2PPP/RNBQK2R",
  "rnbqkbnr/pppp2pp/4p3/5p2/3P1BP1/8/PPP1PP1P/RN1QKBNR",
  "rnbqk2r/pp4pp/2pbpn2/3p1p2/2PP4/5NP1/PP2PPBP/RNBQ1RK1",
  "rnbqkbnr/p1pppppp/1p6/8/3P4/8/PPP1PPPP/RNBQKBNR",
  "rnbqkbnr/p1pp1ppp/1p2p3/8/2PP4/8/PP2PPPP/RNBQKBNR",
  "rn1qkbnr/pbpp1ppp/1p6/4p3/2PP4/2N5/PP2PPPP/R1BQKBNR",
  "rn1qkb1r/pbpp2pp/1p2pn2/5P2/2PP4/2N5/PP3PPP/R1BQKBNR",
  "rn1qkbnr/pbpp2pp/1p2p3/3P1p2/2P1P3/2N5/PP3PPP/R1BQKBNR",
  "r2qkbnr/pbpp1ppp/1pn1p3/8/2PPP3/3B4/PP3PPP/RNBQK1NR",
  "rn1qkb1r/pbpp2pp/1p2p2n/5P2/2PP4/5P2/PP4PP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/3P4/8/PPP1PPPP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/3Pp3/8/8/PPP1PPPP/RNBQKBNR",
  "rnb1k1nr/pppp1ppp/8/2bPp3/4P2q/8/PPP2PPP/RNBQKBNR",
  "r1b1kbnr/ppppqppp/2n5/4P3/8/5N2/PPP1PPPP/RNBQKB1R",
  "r1bqk1nr/pppp1ppp/2n5/2b1P3/8/5N2/PPP1PPPP/RNBQKB1R",
  "rnbqkbnr/ppp2ppp/3p4/4P3/8/8/PPP1PPPP/RNBQKBNR",
  "rnb1kbnr/pppp1ppp/8/4P3/7q/8/PPP1PPPP/RNBQKBNR",
  "rnbqkbnr/pppp2pp/5p2/4P3/8/8/PPP1PPPP/RNBQKBNR",
  "r1bqkbnr/pppp2pp/2n2p2/4P3/8/5N2/PPP1PPPP/RNBQKB1R",
  "r1b1kbnr/ppppqppp/2n5/3QP3/8/5N2/PPP1PPPP/RNB1KB1R",
  "r1bqkb1r/ppppnppp/2n5/4P3/8/5N2/PPP1PPPP/RNBQKB1R",
  "rnbqkbnr/pppp1ppp/8/4p3/3P4/5N2/PPP1PPPP/RNBQKB1R",
  "rnbqkbnr/pppp1ppp/8/8/3Pp3/8/PPP1PPPP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/3P4/4P3/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/8/3Pp3/5N2/PPP1PPPP/RNBQKB1R",
  "rnbqkbnr/pppp1ppp/8/4N3/3Pp3/8/PPP1PPPP/RNBQKB1R",
  "rnbqkbnr/pppp1ppp/4p3/8/3P4/8/PPP1PPPP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/2PP4/8/PP2PPPP/RNBQKBNR",
  "rnbqk1nr/pppp1ppp/4p3/8/1bPP4/8/PP2PPPP/RNBQKBNR",
  "rnbqk1nr/pppp1ppp/4p3/8/1bPP4/2N5/PP2PPPP/R1BQKBNR",
  "r1bqkbnr/pppppppp/2n5/8/3P4/8/PPP1PPPP/RNBQKBNR",
  "r1bqkbnr/pppp1ppp/8/3Pp3/2Pn4/8/PP2PPPP/RNBQKBNR",
  "r1bqkbnr/ppppnppp/8/3Pp3/2P5/8/PP2PPPP/RNBQKBNR",
  "r1bqkbnr/pppp1ppp/8/8/2n5/2N5/PP2PPPP/R1BQKBNR",
  "rnbqk1nr/pp1pp2p/6p1/2pP1p2/2P5/2P5/P3PPPP/R1BQKBNR",
  "rnbqkb1r/pppppp1p/5np1/7P/3P4/8/PPP1PPP1/RNBQKBNR",
  "rnbqkbnr/pppppppp/8/3P4/8/8/PPP1PPPP/RNBQKBNR",
  "rnbqkbnr/p1pppppp/8/1p6/3P4/8/PPP1PPPP/RNBQKBNR",
  "rn1qkbnr/pbpppppp/8/1B6/3PP3/8/PPP2PPP/RNBQK1NR",
  "rnb1k1nr/pp2pp1p/3p2p1/q1pP4/2P1P3/2P5/P4PPP/R1BQKBNR",
  "rnb1k1nr/pp1pppbp/6p1/q1pP4/2P1P3/8/PP3PPP/RNBQKBNR",
  "rnb1k1nr/pp1pppbp/6p1/q1pP4/2P5/2N5/PP2PPPP/R1BQKBNR",
  "rnb1k1nr/pp1ppp1p/6p1/q1pP4/2P5/2P5/P3PPPP/R1BQKBNR",
  "rnb1k1nr/pp1pppbp/6p1/q1p5/3P4/5NP1/PPP1PPBP/RNBQK2R",
  "rnbqk1nr/pp1pppbp/6p1/2p5/2PP4/2N1P3/PP3PPP/R1BQKBNR",
  "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR",
  "rnbqkbnr/pp2pppp/2pp4/8/2PP4/8/PP2PPPP/RNBQKBNR",
  "rnbqkbnr/pppppp1p/6p1/8/3P4/8/PPP1PPPP/RNBQKBNR",
  "rnbqkb1r/p2ppppp/2p2n2/1p6/2PP4/5N2/PP2PPPP/RNBQKB1R",
  "rnbqkbnr/pppppppp/8/3PP3/8/8/PPP2PPP/RNBQKBNR",
  "rnbqk1nr/ppp1ppbp/3p2p1/8/2PP4/2N5/PP2PPPP/R1BQKBNR",
  "rnbqk1nr/pppp1pbp/6p1/4p3/2PPP3/8/PP3PPP/RNBQKBNR",
  "rnbqkbnr/ppp1pppp/3p4/8/2PP4/8/PP2PPPP/RNBQKBNR",
  "rnbqkbnr/ppp1pppp/3p4/8/3P4/8/PPP1PPPP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/3p4/4p3/2PP4/8/PP2PPPP/RNBQKBNR",
  "r1bqkbnr/ppp2ppp/2np4/4P3/2P5/8/PP2PPPP/RNBQKBNR",
  "rn1qkbnr/ppp2ppp/3pb3/4P3/2P5/8/PP2PPPP/RNBQKBNR",
  "rn1qk1nr/ppp1ppbp/3p2p1/8/2PPP1b1/5N2/PP3PPP/RNBQKB1R",
  "rn1qkbnr/ppp1pppp/3p4/8/3P2b1/5N2/PPP1PPPP/RNBQKB1R",
  "1r1qkbnr/pppnpppp/3p4/8/2PP2b1/1Q3N2/PP2PPPP/RNB1KB1R",
  "rnbqk1nr/ppp1ppbp/3p2p1/8/2PPP3/2N5/PP3PPP/R1BQKBNR",
  "rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/4BP2/PP4PP/RN1QKBNR",
  "r1bqk1nr/ppp1ppbp/2np2p1/8/2PPP3/2N5/PP3PPP/R1BQKBNR",
  "rnbqk1nr/ppp1p1bp/3p2p1/5p2/2PPP3/2N5/PP3PPP/R1BQKBNR",
  "rnb1k1nr/pp2ppbp/3p2p1/q1p5/2PPP3/2N2N2/PP3PPP/R1BQKB1R",
  "rnb1k1nr/pp2ppbp/3p2p1/q1p5/2PPP3/2N5/PP2NPPP/R1BQKB1R",
  "rnbqkbnr/pp1ppppp/8/2P5/8/8/PPP1PPPP/RNBQKBNR",
  "r1bqkbnr/pp1ppppp/n7/2P5/8/8/PPP1PPPP/RNBQKBNR",
  "rnbqkb1r/pp1ppppp/5n2/2pP4/8/8/PPP1PPPP/RNBQKBNR",
  "rnbqkb1r/pp1ppppp/5n2/2pP4/8/5N2/PPP1PPPP/RNBQKB1R",
  "rnbqkbnr/pp1pp1pp/8/2pP1p2/4P3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/p2ppppp/1p6/2P5/8/8/PPP1PPPP/RNBQKBNR",
  "rnbqkbnr/pp1p1ppp/4p3/2pP4/4P3/8/PPP2PPP/RNBQKBNR",
  "rnbqkb1r/pp1ppppp/5n2/3P4/2p5/5N2/PPP1PPPP/RNBQKB1R",
  "rnbqkbnr/pp1ppppp/8/2p5/3P4/8/PPP1PPPP/RNBQKBNR",
  "rnbqkbnr/pp1ppppp/8/2pP4/8/8/PPP1PPPP/RNBQKBNR",
  "rnbqkbnr/pp2pppp/3p4/2pP4/8/8/PPP1PPPP/RNBQKBNR",
  "rnbqkbnr/pp1pp1pp/8/2pP1p2/8/8/PPP1PPPP/RNBQKBNR",
  "rnbqkbnr/pp2pp1p/3p2p1/2pP4/8/2N5/PPP1PPPP/R1BQKBNR",
  "r1bqkbnr/pp1ppppp/n7/2pP4/8/8/PPP1PPPP/RNBQKBNR",
  "rnb1kb1r/pp1ppppp/5n2/q1pP4/8/2N5/PPP1PPPP/R1BQKBNR",
  "rnbqkbnr/pp1ppppp/8/2p5/1P1P4/8/P1P1PPPP/RNBQKBNR",
  "rnbqkbnr/pp1ppppp/8/8/1P1p4/5N2/P1P1PPPP/RNBQKB1R",
  "rnbqkbnr/pp1p1ppp/8/4p3/1P1p4/5N2/P1P1PPPP/RNBQKB1R",
  "rnbqkb1r/p2ppppp/5n2/1ppP4/8/5N2/PPP1PPPP/RNBQKB1R",
  "rnbqkbnr/pp1ppppp/8/8/2Pp4/4P3/PP3PPP/RNBQKBNR",
  "rnbqkbnr/pp1p1ppp/8/2pPp3/8/8/PPP1PPPP/RNBQKBNR",
  "rnbqkbnr/pp3ppp/3p4/2pPp3/4P3/8/PPP2PPP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/5n2/3p4/3P4/2NQ4/PPP1PPPP/R1B1KBNR",
  "rnbqkb1r/pppppppp/5n2/8/3P1P2/8/PPP1P1PP/RNBQKBNR",
  "rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/5n2/3p4/3P2P1/5P2/PPP1P2P/RNBQKBNR",
  "rnbqkb1r/pppppppp/5n2/8/3P2P1/8/PPP1PP1P/RNBQKBNR",
  "rnbqkb1r/pppppppp/8/8/3P2n1/8/PPP1PP1P/RNBQKBNR",
  "rnbqkb1r/pppppppp/5n2/8/3PP3/5P2/PPP4P/RNBQKBNR",
  "rnbqkb1r/pppp1ppp/5n2/4p3/3P2P1/8/PPP1PP1P/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/3p1n2/8/3PP3/2N5/PPP1BP1P/R1BQK1NR",
  "rnbqkb1r/pppp1ppp/5n2/4p3/3P4/8/PPPNPPPP/R1BQKBNR",
  "rnbqkb1r/pppp1ppp/5n2/4p3/3P4/2N5/PPP1PPPP/R1BQKBNR",
  "rnbqkb1r/pppppppp/5n2/8/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkb1r/pppppppp/5n2/6B1/3P4/3B4/PPP2PPP/RN1QK1NR",
  "rnbqkb1r/ppp1pppp/5n2/3p4/3PP3/5P2/PPP3PP/RNBQKBNR",
  "rnbqkb1r/pppppppp/5n2/3P4/8/8/PPP1PPPP/RNBQKBNR",
  "rnbqkb1r/pp1ppppp/5n2/2p5/3P4/2N5/PPP1PPPP/R1BQKBNR",
  "rnbqkb1r/pppppppp/5n2/8/3P4/6P1/PPP1PP1P/RNBQKBNR",
  "rnbqkb1r/pppppppp/5n2/8/3P4/5P2/PPP1P1PP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/5n2/3p4/3P4/2N5/PPP1PPPP/R1BQKBNR",
  "rnbqkb1r/ppp1pppp/5n2/3p4/3P4/2N2P2/PPP1P1PP/R1BQKBNR",
  "rnbqkb1r/pppppppp/5n2/6B1/3P4/8/PPP1PPPP/RN1QKBNR",
  "rnbqkb1r/pppppp1p/8/6p1/3PnB2/8/PPP1PPPP/RN1QKBNR",
  "rnbqkb1r/pppp1ppp/4pn2/6B1/3P4/8/PPP1PPPP/RN1QKBNR",
  "rnbqkb1r/pppp1ppp/4pn2/6B1/3PP3/8/PPP2PPP/RN1QKBNR",
  "rnbqkb1r/pppppppp/8/8/3Pn2B/8/PPP1PPPP/RN1QKBNR",
  "rnb1kb1r/pp2pppp/2p5/q2p4/3PP2B/2P5/PP1Q1PPP/R3KBNR",
  "rn1qkb1r/ppp1pppp/5n2/3p1b2/3PP2B/2N2P2/PPP3PP/R2QKBNR",
  "rnb1kb1r/pp1ppppp/1q3n2/2pP2B1/8/2N5/PPP1PPPP/R2QKBNR",
  "rnbqkb1r/pppppppp/8/6B1/3Pn2P/8/PPP1PPP1/RN1QKBNR",
  "rnbqkb1r/pppp1ppp/8/4p1P1/3P4/8/PPP1PPP1/RN1QKBNR",
  "rnbqkb1r/pppppppp/8/8/3Pn3/5N2/PPP1PPPP/RNBQKB1R",
  "rnbqkb1r/pp1ppppp/2p2n2/8/3P4/5N2/PPP1PPPP/RNBQKB1R",
  "rnbqkb1r/pppppppp/5n2/8/3P4/5N2/PPP1PPPP/RNBQKB1R",
  "rnbqkb1r/1ppppppp/p4n2/8/3P4/5N2/PPP1PPPP/RNBQKB1R",
  "rnbqkb1r/pppp1ppp/4pn2/8/3P1B2/5N2/PPP1PPPP/RN1QKB1R",
  "rnbqkb1r/p1pppppp/5n2/1p6/3P4/5N2/PPP1PPPP/RNBQKB1R",
  "rnbqkb1r/pp1ppppp/5n2/2p5/3P4/5N2/PPP1PPPP/RNBQKB1R",
  "rnbqkb1r/ppp1pppp/3p1n2/8/3P4/5N2/PPP1PPPP/RNBQKB1R",
  "rnb1kb1r/pp3ppp/1q2pn2/2pp2B1/3P4/2P1PN2/PP3PPP/RN1QKB1R",
  "rnbqkb1r/ppp2ppp/4pn2/3p2B1/3P4/2N2N2/PPP1PPPP/R2QKB1R",
  "rnbqkb1r/pppp1ppp/4pn2/6B1/3P4/5N2/PPP1PPPP/RN1QKB1R",
  "rnbqkb1r/pppp1pp1/4pn1p/6B1/3P4/5N2/PPP1PPPP/RN1QKB1R",
  "rnbqkb1r/p2p1ppp/1p2pn2/2pP2B1/8/4PN2/PPP2PPP/RN1QKB1R",
  "rnbqkb1r/pp1p1ppp/4pn2/2p3B1/3PP3/5N2/PPP2PPP/RN1QKB1R",
  "rnbqkb1r/pppp1ppp/4pn2/8/3P4/4PN2/PPP2PPP/RNBQKB1R",
  "rnbqkb1r/p1pp1ppp/1p3n2/4p3/3P4/2P2N2/PP2PPPP/RNBQKB1R",
  "rn1qkb1r/pb1ppppp/1p3n2/2p5/3P4/5NP1/PPP1PPBP/RNBQK2R",
  "rn1qkb1r/pb1ppppp/1p3n2/8/2PQ4/5NP1/PP2PPBP/RNB1K2R",
  "rnbqkb1r/p1pppppp/1p3n2/8/3P4/5N2/PPP1PPPP/RNBQKB1R",
  "rnbqkb1r/pppppp1p/5np1/8/3P4/5N2/PPP1PPPP/RNBQKB1R",
  "rnbqk2r/ppp1ppbp/3p1np1/8/3P4/3BPN2/PPP2PPP/RNBQK2R",
  "rnbqkb1r/pppppp1p/5np1/8/3P1B2/5N2/PPP1PPPP/RN1QKB1R",
  "rnbq1rk1/ppp1ppbp/5np1/3p4/3P1B2/2N1PN2/PPP1BPPP/R2QK2R",
  "rnbq1rk1/ppp1ppbp/5np1/3p2B1/3P4/4PN2/PPPN1PPP/R2QKB1R",
  "rnbqkb1r/pppppp1p/5np1/6B1/3P4/5N2/PPP1PPPP/RN1QKB1R",
  "rnbqk2r/pp1pppbp/5np1/2p3B1/3P4/5N2/PPPNPPPP/R2QKB1R",
  "rnbqkb1r/pppppp1p/5np1/8/3P4/5NP1/PPP1PP1P/RNBQKB1R",
  "rnbqkb1r/pppppp1p/5n2/6p1/2PP4/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/p1pppppp/5n2/1p6/2PP4/8/PP2PPPP/RNBQKBNR",
  "r1bqkb1r/pppppppp/2n2n2/8/2PP4/8/PP2PPPP/RNBQKBNR",
  "r1bqkb1r/pppppppp/5n2/3Pn3/2P2P2/8/PP2P1PP/RNBQKBNR",
  "rnbqkb1r/p1pppppp/1p3n2/8/2PP4/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/pp1ppppp/2p2n2/8/2PP4/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/pppp1ppp/5n2/4p3/2PP4/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/p1pp1ppp/1p6/4P3/2P1n3/P7/1P2PPPP/RNBQKBNR",
  "rnbqkb1r/pppp1ppp/8/4P3/2P1n3/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/pppp1ppp/8/4P3/2P1n3/8/PPQ1PPPP/RNB1KBNR",
  "rnbqkb1r/pppp1ppp/8/4P3/2P3n1/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/pppp1ppp/8/4P3/2P3n1/5N2/PP2PPPP/RNBQKB1R",
  "rnbqkb1r/pppp1ppp/8/4P3/2P1P1n1/8/PP3PPP/RNBQKBNR",
  "rnbqkb1r/pppp1ppp/2n5/8/2P1PP2/8/PP4PP/RNBQKBNR",
  "rnbqkb1r/ppp2ppp/3p4/4P3/2P1P1n1/8/PP3PPP/RNBQKBNR",
  "rnbqkb1r/pppp1ppp/8/4P3/2P2Bn1/8/PP2PPPP/RN1QKBNR",
  "rnbqkb1r/ppp1pppp/3p1n2/8/2PP4/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/3p1n2/8/2PP2P1/8/PP2PP1P/RNBQKBNR",
  "rnbqkb1r/pp2pppp/2pp1n2/8/2PP4/2N5/PP2PPPP/R1BQKBNR",
  "rnbqkb1r/pp2pppp/2pp1n2/8/2PP4/5N2/PP2PPPP/RNBQKB1R",
  "rn1qkb1r/ppp1pppp/3p1n2/5b2/2PP4/2N5/PP2PPPP/R1BQKBNR",
  "rn1qkb1r/ppp1pppp/3p1n2/5b2/2PP4/2N3P1/PP2PP1P/R1BQKBNR",
  "rn1qkb1r/ppp1pppp/3p1n2/5b2/2PPP3/2N5/PP3PPP/R1BQKBNR",
  "rn1qkb1r/ppp1pppp/3p1n2/5b2/2PP4/2N2P2/PP2P1PP/R1BQKBNR",
  "r1bqkb1r/pppn1ppp/3p1n2/4p3/2PP4/2NBP3/PP3PPP/R1BQK1NR",
  "rn1qkb1r/ppp1pppp/3p1n2/8/2PP2b1/5N2/PP2PPPP/RNBQKB1R",
  "rnbqkb1r/ppp2ppp/3p1n2/4p3/2PP4/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqkb1r/ppp2ppp/3p1n2/4p3/2PP4/2N5/PP2PPPP/R1BQKBNR",
  "r1bqkb1r/pppn1ppp/3p1n2/4p3/2PPP3/2N2N2/PP3PPP/R1BQKB1R",
  "rnbqkb1r/pp1ppppp/5n2/2p5/2PP4/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/pp1p1ppp/5n2/2pPp3/2P5/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/pp2pppp/3p1n2/2pP4/2P5/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/pp3p1p/3p1np1/2pPp3/2P1P3/2N5/PP3PPP/R1BQKBNR",
  "rnbqkb1r/pp1p1ppp/4pn2/2P5/2P5/8/PP2PPPP/RNBQKBNR",
  "r1bq1rk1/pp2ppbp/2n2np1/3p4/2PP4/2N2N2/PP2BPPP/R1BQ1RK1",
  "rnbqkb1r/pp1ppppp/8/2pP4/2P1n3/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/p2ppppp/5n2/1ppP4/2P5/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/3ppppp/p4n2/1PpP4/8/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/3ppppp/p4n2/1PpP4/8/5P2/PP2P1PP/RNBQKBNR",
  "rnbqkb1r/3ppppp/p4n2/1PpP4/8/4P3/PP3PPP/RNBQKBNR",
  "rnbqkb1r/3ppppp/pP3n2/2pP4/8/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/p2ppppp/5n2/1ppP2B1/2P5/8/PP2PPPP/RN1QKBNR",
  "rnbqkb1r/p2ppppp/5n2/1ppP4/2P1P3/8/PP3PPP/RNBQKBNR",
  "rnbqkb1r/p2ppppp/5n2/1ppP4/2P5/5N2/PP2PPPP/RNBQKB1R",
  "rnbqkb1r/p2ppppp/5n2/1ppP4/2P5/5P2/PP2P1PP/RNBQKBNR",
  "rnbqkb1r/p2ppppp/5n2/1ppP4/2P5/8/PP1NPPPP/R1BQKBNR",
  "rnbqkb1r/p2ppppp/5n2/1ppP4/P1P5/8/1P2PPPP/RNBQKBNR",
  "rnbqkb1r/p2ppppp/5n2/1ppP4/2P3P1/8/PP2PP1P/RNBQKBNR",
  "rnbqkb1r/4pppp/3p1n2/1NpP4/1pB1P3/8/PP3PPP/R1BQK1NR",
  "rnbqkb1r/3ppppp/p4n2/1PpP4/8/2N5/PP2PPPP/R1BQKBNR",
  "rnbqkb1r/3ppppp/5n2/1NpP4/1p2P3/8/PP3PPP/R1BQKBNR",
  "rn1qkb1r/3ppp1p/b4np1/2pP4/5P2/2N5/PP2P1PP/R1BQKBNR",
  "rn1qk2r/4ppbp/b2p1np1/2pP4/8/2N2NP1/PP2PPBP/R1BQK2R",
  "rnbqkb1r/3ppppp/P4n2/2pP4/8/8/PP2PPPP/RNBQKBNR",
  "rn1qkb1r/4pp1p/b2p1np1/2pP4/8/2N2NP1/PP2PP1P/R1BQKB1R",
  "rn1qkb1r/4pp1p/b2p1np1/2pP4/8/2N5/PP1NPPPP/R1BQKB1R",
  "rn1qkb1r/4pp1p/3p1np1/2pP4/4P3/2N3P1/PP3P1P/R1BQ1KNR",
  "rn1q1rk1/4ppbp/3p1np1/2pP4/4P3/2N2NP1/PP3PKP/R1BQ3R",
  "rn1qkb1r/4pppp/b2p1n2/2pP4/4P3/2N5/PP3PPP/R1BQKBNR",
  "rn1qkb1r/4pp1p/3p1np1/2pP4/4P3/2N5/PP2NPPP/R1BQ1K1R",
  "rnbqkb1r/pp1p1ppp/4pn2/2pP4/2P5/8/PP2PPPP/RNBQKBNR",
  "rnbqk2r/pp1p1ppp/3b1n2/2pP4/8/2N5/PP2PPPP/R1BQKBNR",
  "rnbqkb1r/pp3p1p/3p1np1/2pP4/8/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqkb1r/pp3p1p/3p1np1/2pP4/8/2N2NP1/PP2PP1P/R1BQKB1R",
  "rnbqkb1r/pp3p1p/3p1np1/2pP4/8/2N5/PP1NPPPP/R1BQKB1R",
  "rnbqkb1r/pp3p1p/3p1np1/2pP2B1/8/2N2N2/PP2PPPP/R2QKB1R",
  "rnbq1rk1/pp3pbp/3p1np1/2pP4/8/2N2NP1/PP2PPBP/R1BQK2R",
  "r1bq1rk1/pp1n1pbp/3p1np1/2pP4/8/2N2NP1/PP2PPBP/R1BQ1RK1",
  "r1bqr1k1/1p1n1pbp/p2p1np1/2pP4/P7/2N3P1/1P1NPPBP/R1BQ1RK1",
  "rnbqkb1r/pp3ppp/3p1n2/2pP4/4P3/2N5/PP3PPP/R1BQKBNR",
  "rnbqk2r/pp3pbp/3p1np1/2pPP3/5P2/2N5/PP4PP/R1BQKBNR",
  "rnbqkb1r/pp3p1p/3p1np1/2pP4/4PP2/2N5/PP4PP/R1BQKBNR",
  "rnbqk2r/pp3pbp/3p1np1/1BpP4/4PP2/2N5/PP4PP/R1BQK1NR",
  "rnbq1rk1/pp3pbp/3p1np1/2pP4/4PP2/2N2N2/PP4PP/R1BQKB1R",
  "rnbqr1k1/pp3pbp/3p1np1/2pP4/4PP2/2N2N2/PP2B1PP/R1BQK2R",
  "rnbqkb1r/pp3p1p/3p1np1/2pP4/4P3/2N2N2/PP3PPP/R1BQKB1R",
  "rnbqk2r/pp3pbp/3p1np1/2pP4/4P3/2N2N1P/PP3PP1/R1BQKB1R",
  "rnbqk2r/pp3pbp/3p1np1/2pP4/4P3/2N2N2/PP2BPPP/R1BQK2R",
  "rnbqk2r/pp3pbp/3p1np1/2pP2B1/4P3/2N2N2/PP3PPP/R2QKB1R",
  "rnbq1rk1/pp3pbp/3p1np1/2pP4/4P3/2N2N2/PP2BPPP/R1BQK2R",
  "rnbq1rk1/pp3pbp/3p1np1/2pP4/4P3/2N2N2/PP2BPPP/R1BQ1RK1",
  "rnbq1rk1/1p3pbp/p2p1np1/2pP4/P3P3/2N2N2/1P2BPPP/R1BQ1RK1",
  "rn1q1rk1/1p3pbp/p2p1np1/2pP4/P3P1b1/2N2N2/1P2BPPP/R1BQ1RK1",
  "rnbqr1k1/pp3pbp/3p1np1/2pP4/4P3/2N2N2/PP2BPPP/R1BQ1RK1",
  "rnbqr1k1/pp3pbp/3p1np1/2pP4/4P3/2N5/PP1NBPPP/R1BQ1RK1",
  "r1bqr1k1/pp3pbp/n2p1np1/2pP4/4P3/2N5/PP1NBPPP/R1BQ1RK1",
  "r1bqr1k1/pp3pbp/n2p1np1/2pP4/4P3/2N2P2/PP1NB1PP/R1BQ1RK1",
  "rnbqkbnr/ppppp1pp/8/5p2/3P4/8/PPP1PPPP/RNBQKBNR",
  "rnbqkbnr/ppppp1pp/8/5p2/3P4/3Q4/PPP1PPPP/RNB1KBNR",
  "rnbqkbnr/pppp2pp/8/4pp2/3P2P1/8/PPP1PP1P/RNBQKBNR",
  "rnbqkbnr/ppppp1pp/8/5pB1/3P4/8/PPP1PPPP/RN1QKBNR",
  "rnbqkb1r/ppppp1pp/5n2/5p2/3P2P1/7P/PPP1PP2/RNBQKBNR",
  "rnbqkbnr/ppp1p1pp/8/3p1p2/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkbnr/ppppp1pp/8/5p2/3P4/7P/PPP1PPP1/RNBQKBNR",
  "rnbqkbnr/ppppp1pp/8/5p2/3P2P1/8/PPP1PP1P/RNBQKBNR",
  "rnbqkbnr/ppp1p1pp/8/3p4/3PP1p1/2N5/PPP2P1P/R1BQKBNR",
  "rnbqkbnr/pppp2pp/4p3/5p2/3P2P1/3Q4/PPP1PP1P/RNB1KBNR",
  "rnbqkbnr/ppppp2p/6p1/5p2/3P2P1/3Q4/PPP1PP1P/RNB1KBNR",
  "rnbqkbnr/ppp1p1pp/3p4/5p2/3P2P1/3Q4/PPP1PP1P/RNB1KBNR",
  "rnbqkbnr/ppp1p1pp/8/3p1p2/3P2P1/3Q4/PPP1PP1P/RNB1KBNR",
  "rnbqkbnr/pppp2pp/8/4pp2/3P4/5N2/PPP1PPPP/RNBQKB1R",
  "rnbqkbnr/ppppp1pp/8/5p2/3P4/2N5/PPP1PPPP/R1BQKBNR",
  "rnbqkb1r/ppppp1pp/5n2/5p2/3P2P1/2N5/PPP1PP1P/R1BQKBNR",
  "rnbqkbnr/ppp1p1pp/8/3p1p2/3P4/2N5/PPP1PPPP/R1BQKBNR",
  "rnbqkb1r/pppp2pp/4pn2/5p2/3P4/6PN/PPP1PPBP/RNBQK2R",
  "rnbqkbnr/ppppp1pp/8/5p2/3P4/6P1/PPP1PP1P/RNBQKBNR",
  "rnbqk1nr/ppppp1bp/6p1/5p2/3P4/6PN/PPP1PPBP/RNBQK2R",
  "rnbqk2r/pp1pp1bp/2p3pn/5p2/3P4/5NP1/PPP1PPBP/RNBQ1RK1",
  "rnbqkb1r/ppppp2p/5np1/5p2/3P4/6P1/PPP1PPBP/RNBQK1NR",
  "rnbqkb1r/ppppp1pp/5n2/8/3Pp3/2N2P2/PPP3PP/R1BQKBNR",
  "rnbqkbnr/ppppp1pp/8/5p2/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/ppppp1pp/8/8/3Pp3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/ppppp1pp/8/8/3Pp3/8/PPPN1PPP/R1BQKBNR",
  "rnbqkb1r/ppppp1pp/5n2/8/3Pp1P1/2N5/PPP2P1P/R1BQKBNR",
  "rnbqkbnr/ppp1p1pp/3p4/5p2/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkb1r/ppppp1pp/5n2/6B1/3Pp3/2N5/PPP2PPP/R2QKBNR",
  "rnbqkb1r/ppppp2p/5np1/6B1/3Pp2P/2N5/PPP2PP1/R2QKBNR",
  "rnbqkb1r/pp1pp1pp/2p2n2/6B1/3Pp3/2N5/PPP2PPP/R2QKBNR",
  "rnbqkb1r/ppppp2p/5np1/6B1/3Pp3/2N2P2/PPP3PP/R2QKBNR",
  "rnbqkb1r/p1ppp1pp/1p3n2/6B1/3Pp3/2N5/PPP2PPP/R2QKBNR",
  "rnbqkbnr/ppppp1pp/8/5p2/2PP4/8/PP2PPPP/RNBQKBNR",
  "rnbqkbnr/pppp2pp/4p3/5p2/2PPP3/8/PP3PPP/RNBQKBNR",
  "rnbqkb1r/ppppp2p/6pn/5p2/2PP4/2N5/PP2PPPP/R1BQKBNR",
  "rnbqkbnr/pppp2pp/4p3/5p2/2PP4/8/PP2PPPP/RNBQKBNR",
  "r1bqkb1r/ppp1p1pp/2np1n2/5p2/2PP4/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqkb1r/ppppp1pp/5n2/5p2/2PP4/8/PP2PPPP/RNBQKBNR",
  "rnbqkbnr/pppp2pp/4p3/5p2/2PP4/2N5/PP2PPPP/R1BQKBNR",
  "rnbqkb1r/ppppp1pp/5n2/5p2/2PP4/2N5/PP2PPPP/R1BQKBNR",
  "rnbqkb1r/ppppp1pp/5n2/5p2/2PP4/6P1/PP2PP1P/RNBQKBNR",
  "rnb1kb1r/ppq1p1pp/2pp1n2/5p2/2PP4/2N3P1/PP2PPBP/R1BQK1NR",
  "rnbqkb1r/ppppp2p/5np1/5p2/2PP4/6P1/PP2PP1P/RNBQKBNR",
  "rnbqk2r/ppppp1bp/5np1/5p2/2PP4/5NP1/PP2PPBP/RNBQK2R",
  "rnbq1rk1/pp2p1bp/2pp1np1/5p2/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "r1bq1rk1/ppp1p1bp/2np1np1/5p2/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "rnbqkb1r/pppp2pp/4pn2/5p2/2PP4/6P1/PP2PPBP/RNBQK1NR",
  "rnbqk2r/pppp2pp/4pn2/5p2/1bPP4/6P1/PP2PPBP/RNBQK1NR",
  "rnbqk2r/ppppb1pp/4pn2/5p2/2PP4/6P1/PP1BPPBP/RN1QK1NR",
  "rnbqk2r/ppppb1pp/4pn2/5p2/2PP4/6P1/PP2PPBP/RNBQK1NR",
  "rnbqk2r/ppppb1pp/4pn2/5p2/2PP4/6PN/PP2PPBP/RNBQK2R",
  "rnbq1rk1/ppppb1pp/4p3/5p2/2PPn3/5NP1/PP2PPBP/RNBQ1RK1",
  "rnbq1rk1/ppppb1pp/4pn2/5p2/2PP4/5NP1/PP2PPBP/RNBQK2R",
  "rnbq1rk1/ppp1b1pp/4pn2/3p1p2/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "rnbq1rk1/ppp1b1pp/4pn2/3p1p2/2PP4/5NP1/PP2PPBP/RNBQ1RK1",
  "rnbq1rk1/ppp1b1pp/4pn2/3p1p2/2PP4/1P3NP1/P3PPBP/RNBQ1RK1",
  "rnbq1rk1/pp2b1pp/2p1pn2/3p1p2/2PP4/BP3NP1/P3PPBP/RN1Q1RK1",
  "rnbq1rk1/pp2b1pp/2p1pn2/3p1p2/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "rnb1qrk1/pp2b1pp/2p1pn2/3p1pB1/2PP4/2N2NP1/PPQ1PPBP/R4RK1",
  "rnbq1rk1/ppp1b1pp/3ppn2/5p2/2PP4/5NP1/PP2PPBP/RNBQ1RK1",
  "rnbq1rk1/1pp1b1pp/3ppn2/p4p2/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "rnbq1rk1/ppp1b1pp/3pp3/5p2/2PPn3/2N2NP1/PP2PPBP/R1BQ1RK1",
  "rnb1qrk1/ppp1b1pp/3ppn2/5p2/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "rnb1qrk1/ppp1b1pp/3ppn2/5p2/2PP4/2N2NP1/PP2PPBP/R1BQR1K1",
  "rnb1qrk1/ppp1b1pp/3ppn2/5p2/2PP4/2N2NP1/PPQ1PPBP/R1B2RK1",
  "rnb1qrk1/ppp1b1pp/3ppn2/5p2/2PP4/1PN2NP1/P3PPBP/R1BQ1RK1",
  "rnbqkbnr/ppppp1pp/5p2/8/4P3/8/PPPP1PPP/RNBQKBNR",
  "rnbqkbnr/pppppp1p/8/6p1/4P3/8/PPPP1PPP/RNBQKBNR",
  "rnbqk1nr/ppppppbp/8/6p1/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/pppppp2/7p/8/3PP1pP/8/PPP2PP1/RNBQKBNR",
  "rnbqkbnr/pppp1p1p/8/4p1p1/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/ppppppp1/7p/8/4P3/8/PPPP1PPP/RNBQKBNR",
  "rnbqkbnr/pppp1pp1/7p/4p3/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/ppppp1pp/8/5p2/4P3/8/PPPP1PPP/RNBQKBNR",
  "rnbq1bnr/pppppkpp/5p2/8/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/ppppppp1/8/7p/4P3/8/PPPP1PPP/RNBQKBNR",
  "rnbqkb1r/ppppppp1/5n2/7p/3PP3/8/PPP2PPP/RNBQKBNR",
  "rn1qkbnr/p1pppppp/bp6/8/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkb1r/pppppppp/7n/8/4P3/8/PPPP1PPP/RNBQKBNR",
  "rnbqkb1r/ppppp2p/5ppn/8/2PPP3/8/PP3PPP/RNBQKBNR",
  "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR",
  "r1bqkbnr/pppppppp/n7/8/4P3/8/PPPP1PPP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/3p1n2/8/3PP3/5P2/PPP3PP/RNBQKBNR",
  "r1bqkbnr/pppppppp/2n5/8/4P3/8/PPPP1PPP/RNBQKBNR",
  "r1bqkbnr/pppppppp/2n5/8/3PP3/8/PPP2PPP/RNBQKBNR",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "r1bqkbnr/ppppp1pp/2n5/5p2/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "r1bqkbnr/ppppp1pp/2n5/5P2/8/5N2/PPPP1PPP/RNBQKB1R",
  "r1bqkbnr/pppppppp/2n5/8/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "r1bqkb1r/pppppppp/2n5/4P3/6n1/5N2/PPPP1PPP/RNBQKB1R",
  "r1bqkb1r/ppp1pppp/2npP2n/8/3P4/5N1P/PPP2PP1/RNBQKB1R",
  "r1bqkb1r/ppp1pppp/2nP3n/8/3P4/5N1P/PPP2PP1/RNBQKB1R",
  "r1bqkb1r/ppp1pppp/2np3n/1B2P3/3P4/5N1P/PPP2PP1/RNBQK2R",
  "r1bqkbnr/pppp1ppp/2n1p3/8/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "r1bqkbnr/pppp1ppp/2n1p3/8/4P3/2N5/PPPP1PPP/R1BQKBNR",
  "r1bqkbnr/ppp1pppp/2n5/3p4/3PP3/4B3/PPP2PPP/RN1QKBNR",
  "r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/8/PPP2PPP/RNBQKBNR",
  "r1bqk1nr/pppp1ppp/2n5/2b1P3/4P3/8/PPP2PPP/RNBQKBNR",
  "r1bqkbnr/pppp2pp/2n2p2/4P3/4P3/8/PPP2PPP/RNBQKBNR",
  "r1b1kbnr/pppp1ppp/2n5/4P3/4P2q/8/PPP2PPP/RNBQKBNR",
  "r1bqkbnr/pppp1ppp/8/4n3/4P3/2N5/PPP2PPP/R1BQKBNR",
  "r1bqkbnr/pppp1ppp/2n5/3Pp3/4P3/8/PPP2PPP/RNBQKBNR",
  "r1bqkbnr/pppp1ppp/6n1/8/4PP2/8/PPP3PP/RNBQKBNR",
  "r1bqkbnr/pppp1ppp/8/4n3/4P3/5N2/PPP2PPP/RNBQKB1R",
  "r1bqkbnr/pppp1ppp/2n5/8/4PP2/8/PPP3PP/RNBQKBNR",
  "r1bqkbnr/ppp2ppp/2np4/4P3/4P3/8/PPP2PPP/RNBQKBNR",
  "r1bqkbnr/ppp1pppp/2np4/8/3PP3/8/PPP2PPP/RNBQKBNR",
  "r1bqkbnr/ppppp1pp/2n2p2/8/3PP3/8/PPP2PPP/RNBQKBNR",
  "r1bqkbnr/pppppp1p/2n3p1/8/4P3/2N5/PPPP1PPP/R1BQKBNR",
  "r1bqkbnr/pppppppp/2n5/1B6/4P3/8/PPPP1PPP/RNBQK1NR",
  "r1bqkbnr/ppp1pppp/2n5/3p4/3PP3/8/PPP2PPP/RNBQKBNR",
  "r1bqkbnr/ppp1pppp/8/3P4/1n1P4/8/PPP2PPP/RNBQKBNR",
  "r1bqkbnr/ppp1pppp/2n5/3pP3/3P4/8/PPP2PPP/RNBQKBNR",
  "r1bqkbnr/ppp1pppp/2n5/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "r1bqkbnr/ppp1pppp/2n5/8/3Pp3/2N5/PPP2PPP/R1BQKBNR",
  "r1bqkbnr/1pp1pppp/p1n5/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "r1bqkbnr/ppp1pp1p/2n3p1/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "r1bqkbnr/ppp2ppp/2n5/3pp3/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "r1bqkbnr/ppp1pppp/8/3Pn3/4p3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkbnr/ppp1pppp/8/3P4/4p3/2N2P2/PPP3PP/R1BQKBNR",
  "r1bqkb1r/ppp1pppp/2n2n2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "r1b1kbnr/ppp1pppp/2n5/3q4/3P4/8/PPP2PPP/RNBQKBNR",
  "r1b1kbnr/ppp1pppp/2n5/3q4/3P4/2N5/PPP2PPP/R1BQKBNR",
  "r1bqkbnr/pppppppp/2n5/8/1P2P3/8/P1PP1PPP/RNBQKBNR",
  "r1bqkbnr/ppp1pppp/2np4/8/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "r1bqkbnr/1ppppppp/p1n5/8/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/p1pppppp/1p6/8/4P3/8/PPPP1PPP/RNBQKBNR",
  "r1bqkbnr/p2ppppp/1pn5/2P5/4P3/8/PPP2PPP/RNBQKBNR",
  "rn1qkbnr/p1ppp2p/1p4p1/5P1Q/3P4/3B4/PPP2PbP/RNB1K1NR",
  "rn1qkbnr/pbpppppp/1p6/6B1/3PP3/8/PPP2PPP/RN1QKBNR",
  "rn1qkbnr/pbpppppp/1p6/8/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "rn1qkbnr/pbppp1pp/1p3p2/8/2PPP3/8/PP3PPP/RNBQKBNR",
  "rn1qkbnr/pbpp1ppp/1p6/4p3/3PP3/5P2/PPP3PP/RNBQKBNR",
  "rnbqkbnr/ppp1pppp/3p4/8/4P3/8/PPPP1PPP/RNBQKBNR",
  "rnbqkbnr/ppp1pppp/3p4/8/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/3p1n2/8/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/3p1n2/8/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "r1bqkbnr/pppnpppp/3p4/8/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/5n2/3P4/5P2/8/PPPP2PP/RNBQKBNR",
  "rnbqkbnr/ppp1pppp/3p4/8/4PP2/8/PPPP2PP/RNBQKBNR",
  "rnbqkbnr/ppp1pppp/3p4/8/4P2P/8/PPPP1PP1/RNBQKBNR",
  "rnbqkbnr/ppp1pppp/3p4/8/4P1P1/8/PPPP1P1P/RNBQKBNR",
  "rnbqkbnr/1ppppppp/p7/8/4P3/8/PPPP1PPP/RNBQKBNR",
  "rn1qkbnr/1bpp1ppp/p3p3/1p6/3PP3/3B1N2/PPP2PPP/RNBQK2R",
  "rn1qk1nr/1bp1ppbp/p2p2p1/1p6/3PP3/2PB1N2/PP3PPP/RNBQ1RK1",
  "rnbqkbnr/1ppp1ppp/p7/4p3/3PP3/8/PPP2PPP/RNBQKBNR",
  "r1bqkbnr/ppp1pppp/2n5/3P4/4p3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkbnr/1ppppppp/8/p7/4P3/8/PPPP1PPP/RNBQKBNR",
  "r1bqkbnr/1ppppppp/2n5/p7/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR",
  "rnbqkbnr/ppp1pppp/8/3p4/4P3/1P6/P1PP1PPP/RNBQKBNR",
  "rnb1kbnr/ppp2ppp/8/q3p3/3P4/2N5/PPP2PPP/R1BQKBNR",
  "rn2kbnr/ppp2ppp/8/q3p3/3P2b1/2N2N2/PPP2PPP/R1BQKB1R",
  "rnb1kbnr/ppp2ppp/8/q3p3/3P4/2N2N2/PPP2PPP/R1BQKB1R",
  "r1b1k1nr/ppp2ppp/2n5/q3P3/1b6/2N2N2/PPPB1PPP/R2QKB1R",
  "r1bqkbnr/pp2pppp/2n5/8/8/8/PPPP1PPP/RNBQKBNR",
  "rnbqkbnr/pp2pppp/2p5/3P4/8/8/PPPP1PPP/RNBQKBNR",
  "rn1qkbnr/ppp2ppp/4b3/8/8/8/PPPP1PPP/RNBQKBNR",
  "rnb1kb1r/1pp1pppp/p2q1n2/8/3P4/2N2N2/PPP2PPP/R1BQKB1R",
  "rn2kb1r/ppp1pppp/5n2/q4b2/3P4/2N2N2/PPP2PPP/R1BQKB1R",
  "rn2kb1r/pp2pppp/2p2n2/q3Nb2/3P2P1/2N5/PPP2P1P/R1BQKB1R",
  "rnb1kbnr/ppp1pppp/3q4/8/8/2N5/PPPP1PPP/R1BQKBNR",
  "rnbqkb1r/ppp2ppp/4pn2/3P4/2P5/8/PP1P1PPP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/8/8/1nPP4/8/PP3PPP/RNBQKBNR",
  "rnbqkbnr/pp3ppp/2P5/4p3/8/8/PPPP1PPP/RNBQKBNR",
  "rnbqkb1r/pp3ppp/2P2n2/4p3/3P4/8/PPP2PPP/RNBQKBNR",
  "rn2kb1r/ppp1pppp/5n2/q7/3P2b1/2N2N1P/PPP2PP1/R1BQKB1R",
  "rnb1kbnr/ppp1pppp/8/q7/8/2N5/PPPP1PPP/R1BQKBNR",
  "rnb1kbnr/ppp1pppp/8/q7/1P6/2N5/P1PP1PPP/R1BQKBNR",
  "rnb1kb1r/ppp1pppp/5n2/q7/3P4/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkb1r/ppp1pppp/8/3n4/3P4/8/PPP2PPP/RNBQKBNR",
  "rnb1kbnr/ppp1pppp/8/3q4/8/8/PPPP1PPP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/5n2/3P4/8/8/PPPP1PPP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/5n2/3P4/3P4/8/PPP2PPP/RNBQKBNR",
  "rn1qkb1r/ppp1pppp/8/3n4/3P2b1/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkb1r/p1p1pp1p/5np1/1p1P4/2PP4/8/PP3PPP/RNBQKBNR",
  "rnbqkb1r/pp2pppp/2p2n2/3P4/2P5/8/PP1P1PPP/RNBQKBNR",
  "rn1qkb1r/ppp1pppp/5n2/3P4/3P2b1/8/PPP2PPP/RNBQKBNR",
  "rn1qkb1r/ppp1pppp/5n2/3P1b2/2PP4/5P2/PP4PP/RNBQKBNR",
  "rn1qkb1r/ppp1pppp/5n2/3P4/3P2b1/5N2/PPP2PPP/RNBQKB1R",
  "rn1qkb1r/ppp1pppp/5n2/3P1b2/3P2P1/5P2/PPP4P/RNBQKBNR",
  "rn1qkb1r/pp2pppp/2p2n2/1B1P4/3P2b1/8/PPP2PPP/RNBQK1NR",
  "r2qkb1r/pppnpppp/5n2/1B1P1b2/2PP4/5P2/PP4PP/RNBQK1NR",
  "r2qkb1r/pppnpppp/5n2/3P4/3P2b1/8/PPP1BPPP/RNBQK1NR",
  "r2qkb1r/pppnpppp/5n2/1B1P1b2/3P4/2N2P2/PPP3PP/R1BQK1NR",
  "rn1qkb1r/ppp1pppp/5n2/3P4/3P2b1/8/PPP1BPPP/RNBQK1NR",
  "rnbqkb1r/ppp1pp1p/6p1/3n4/3P4/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkb1r/ppp1pp1p/5np1/3P4/3P4/8/PPP2PPP/RNBQKBNR",
  "rnb1kbnr/pp2pppp/2pq4/8/3P4/2N5/PPP2PPP/R1BQKBNR",
  "rn2kb1r/pp2pppp/2p2n2/5b2/1qBP1B2/2N5/PPP1NPPP/R2QK2R",
  "rnbqkbnr/ppp1pppp/8/8/8/2N5/PPPP1PPP/R1BQKBNR",
  "rnbqkb1r/pp2pppp/2p2n2/8/3P4/2N2N2/PPP2PPP/R1BQKB1R",
  "rn1qkb1r/ppp1pppp/5n2/8/3P2b1/2N2N2/PPP2PPP/R1BQKB1R",
  "rnbqkbnr/ppp1pppp/8/3p4/1P2P3/8/P1PP1PPP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/8/4p3/4N3/8/PPPP1PPP/R1BQKBNR",
  "rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR",
  "rnbqkbnr/pppppppp/8/4P3/8/8/PPPP1PPP/RNBQKBNR",
  "rnbqkbnr/ppppp1pp/8/4Pp2/3P4/8/PPP2PPP/RNBQKBNR",
  "rnbqkb1r/pppppppp/8/3nP3/8/N7/PPPP1PPP/R1BQKBNR",
  "rnbqkb1r/pppp1ppp/4p3/2PnP3/2B5/2N5/PP1P1PPP/R1BQK1NR",
  "rnbqkb1r/ppp1pppp/3p4/2P1P1B1/8/2P5/PP3PPP/R2QKBNR",
  "rnbqkb1r/ppp2ppp/3p4/2PBP3/8/8/PP1P1PPP/R1BQK1NR",
  "rnbqkb1r/pp1ppppp/1n6/2p1P3/8/1B1P4/PPP2PPP/RNBQK1NR",
  "rnbqkb1r/pppppppp/5n2/8/2B1P3/8/PPPP1PPP/RNBQK1NR",
  "rnbqkb1r/pppppBpp/8/8/4n3/8/PPPP1PPP/RNBQK1NR",
  "rnbqkb1r/pppppppp/5n2/8/4P3/3P4/PPP2PPP/RNBQKBNR",
  "rnbqkb1r/pppppppp/8/4P3/4n3/8/PPPP1PPP/RNBQKBNR",
  "rnbqkb1r/ppppp1pp/5p2/4P3/3Pn3/8/PPP2PPP/RNBQKBNR",
  "rnbqkb1r/pppp1ppp/4p3/4P3/3Pn3/8/PPP2PPP/RNBQKBNR",
  "rnbqkb1r/pppppppp/8/3nP3/8/8/PPPP1PPP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/5n2/3p4/4P3/2N5/PPPP1PPP/R1BQKBNR",
  "rnbqkb1r/pp2pppp/2p2n2/3P4/8/2N5/PPPP1PPP/R1BQKBNR",
  "rnbqkb1r/ppp1pppp/5n2/6B1/4p3/2NP4/PPP2PPP/R2QKBNR",
  "rnbqkb1r/pppnpppp/4P3/3p4/8/2N5/PPPP1PPP/R1BQKBNR",
  "rnbqkb1r/pppppppp/1n6/4P3/2P5/1P6/P2P1PPP/RNBQKBNR",
  "rnbqkb1r/pppppppp/8/3nP3/8/2N5/PPPP1PPP/R1BQKBNR",
  "rnbqkb1r/pppppppp/8/4P3/2P2n2/8/PP1P1PPP/RNBQKBNR",
  "rnbqkb1r/pppppppp/8/3nP3/2P5/8/PP1P1PPP/RNBQKBNR",
  "rnbqkb1r/pppppppp/1n6/2P1P3/8/8/PP1P1PPP/RNBQKBNR",
  "rnbqkb1r/ppp2ppp/3pp3/2PnP3/2B5/2N5/PP1P1PPP/R1BQK1NR",
  "rnbqkb1r/pppppppp/8/3nP3/8/1P6/P1PP1PPP/RNBQKBNR",
  "rnbqkb1r/pppppppp/8/3nP3/3P4/8/PPP2PPP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/3p4/3nP3/3P4/8/PPP2PPP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/3p4/3nP3/2PP4/8/PP3PPP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/3p4/3nP3/2BP4/8/PPP2PPP/RNBQK1NR",
  "rnbqkb1r/ppp1pppp/1n1P4/8/2PP4/8/PP3PPP/RNBQKBNR",
  "r2q1rk1/pp2ppbp/1nnp2p1/5b2/2PP1B2/2N2N1P/PP2BPP1/R2Q1RK1",
  "rnbq1rk1/pp2ppbp/1n1p2p1/8/2PP4/1PN1B3/P4PPP/2RQKBNR",
  "rnbqkb1r/ppp1pppp/1n1p4/4P3/2PP1P2/8/PP4PP/RNBQKBNR",
  "rnbqkb1r/ppp1pp1p/1n1p4/4P1p1/2PP1P2/8/PP4PP/RNBQKBNR",
  "rnbqkb1r/ppp1pp1p/1n1p2p1/4P3/2PP1P2/8/PP4PP/RNBQKBNR",
  "r2qkb1r/ppp1p1pp/1nn1p3/2P5/3P2b1/5N2/PP4PP/RNBQKB1R",
  "rn1q1rk1/ppp1b1pp/1n2pp2/4Pb2/2PP4/2N2N2/PP2B1PP/R1BQ1RK1",
  "r1bqkb1r/ppp1pppp/1nn5/4P3/2PP4/4B3/PP4PP/RN1QKBNR",
  "2kr3r/pppqbppp/1nn1p3/4Pb2/2PP4/2N1BN2/PP2B1PP/R2Q1RK1",
  "rn1qkb1r/ppp1pppp/1n1p4/4Pb2/2PP1P2/8/PP4PP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/1n1p4/2P1P3/3P4/8/PP3PPP/RNBQKBNR",
  "rn1qkb1r/ppp1pppp/1n1p4/4P3/2PP2b1/5N2/PP2BPPP/RNBQK2R",
  "rnbqkb1r/p1pppppp/8/1p1nP3/3P4/8/PPP2PPP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/3p4/3nP3/3P4/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkb1r/ppp1pp1p/3p2p1/3nP3/3P4/5N2/PPP2PPP/RNBQKB1R",
  "rnbqk2r/ppp1ppbp/1n1p2p1/4P3/P2P4/1B3N2/1PP2PPP/RNBQK2R",
  "rnbqkb1r/ppp1pppp/8/3np3/3P4/5N2/PPP2PPP/RNBQKB1R",
  "r1bqkb1r/ppp1pppp/2np4/3nP3/3P4/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkb1r/ppp1pppp/1n1p4/4P3/3P4/5N2/PPP2PPP/RNBQKB1R",
  "rn1qkb1r/ppp1pppp/3p4/3nP3/2PP2b1/5N2/PP3PPP/RNBQKB1R",
  "rn1qkb1r/pp2pppp/2pp4/3nP3/3P2b1/5N2/PPP1BPPP/RNBQK2R",
  "rn1qkb1r/ppp1pppp/3p4/3nP3/3P2b1/5N2/PPP2PPP/RNBQKB1R",
  "rn1qkb1r/ppp1pppp/3p4/3nP3/3P2b1/5N1P/PPP2PP1/RNBQKB1R",
  "rn1qkb1r/ppp1pppp/1n1p4/3PP3/2P3b1/5N2/PP3PPP/RNBQKB1R",
  "rnbqkbnr/pppppp1p/6p1/8/4P3/8/PPPP1PPP/RNBQKBNR",
  "rnbqk1nr/ppppppbp/6p1/8/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqk1nr/pp2ppbp/2pp2p1/8/2BPP3/2N5/PPP1QPPP/R1B1K1NR",
  "rnbqk1nr/ppppppbp/6p1/8/2BPP3/8/PPP2PPP/RNBQK1NR",
  "rnbqk1nr/p1ppppbp/6p1/1p6/2BPP3/8/PPP2PPP/RNBQK1NR",
  "rnbqk1nr/pppp1p1p/4p1p1/8/2BbP3/5Q2/PPP2PPP/RNB1K1NR",
  "rnbqk1nr/pp2pp1p/2P3p1/8/2Pb4/8/PP3PPP/RNBQKBNR",
  "rnbqkbnr/ppppp2p/6p1/5p2/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqk1nr/pp2ppb1/2p3p1/3pP2p/3P1P2/2N5/PPP3PP/R1BQKBNR",
  "rnbqk1nr/ppp1ppbp/6p1/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "rnbq1rk1/ppppp2p/6pb/5P2/3P4/2N5/PPP2PPP/R2QKBNR",
  "rnbqk1nr/pp1pppbp/6p1/2p5/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqk1nr/p1ppppbp/1p4p1/8/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqk1nr/p1ppppbp/1p4p1/8/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkb1r/pppppp1p/5np1/8/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkb1r/ppp1pp1p/3p2p1/4P2n/3P4/8/PPP1BPPP/RNBQK1NR",
  "rnbqk1nr/ppp1ppbp/3p2p1/8/3PPP2/2N5/PPP3PP/R1BQKBNR",
  "rnb1k1nr/pp2ppbp/3p2p1/q1p5/2PPP3/5N2/PP2BPPP/RNBQK2R",
  "rnbqk1nr/ppp1ppbp/3p2p1/8/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqk1nr/ppppppbp/6p1/8/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqk1nr/ppppppbp/6p1/8/3PPP2/8/PPP3PP/RNBQKBNR",
  "rnbqk1nr/ppp1ppbp/3p2p1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R",
  "rnbqk1nr/pp2ppbp/2pp2p1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R",
  "rnb1k1nr/pp2ppbp/2pp2p1/6B1/3PP3/2N2N2/PqPQ1PPP/R3KB1R",
  "rnbqk1nr/ppppppbp/6p1/8/3PP3/8/PPPB1PPP/RN1QKBNR",
  "rnbqk1nr/ppppppbp/6p1/8/3PP3/3B4/PPP2PPP/RNBQK1NR",
  "rnbqkb1r/ppppppnp/6p1/4P3/3P2P1/8/PPP2P1P/RNBQKBNR",
  "rnb1k1nr/pp1pppbp/6p1/q1p5/3PPP2/5N2/PPP3PP/RNBQKB1R",
  "rnb1k1nr/pp1pppbp/6p1/q1p5/4PP2/2N2N2/PPPP2PP/R1BQKB1R",
  "rnb1k1nr/pp1pppbp/6p1/q1p5/3PPP2/2P5/PP4PP/RNBQKBNR",
  "rnb1k1nr/pp2ppbp/3p2p1/q1p5/2PPP3/2N1B3/PP3PPP/R2QKBNR",
  "rnb1k1nr/pp2ppbp/3p2p1/q1pP4/2P1P3/2N5/PP3PPP/R1BQKBNR",
  "rnb1k1nr/pp2ppbp/3p2p1/q1P5/2P1P3/2N5/PP3PPP/R1BQKBNR",
  "rnbqk1nr/pp1pppbp/6p1/2p5/3PP3/2N1B3/PPP2PPP/R2QKBNR",
  "rnbqk1nr/pp1pppbp/6p1/2pP4/4P3/2N5/PPP2PPP/R1BQKBNR",
  "rnb1k1nr/pp1ppp1p/6p1/q1pP4/4P3/2P5/P1P2PPP/R1BQKBNR",
  "rnb1k1nr/pp1pppbp/6p1/q1pP4/4P3/2N5/PPP2PPP/R1BQKBNR",
  "rnb1k1nr/pp1ppp1p/6p1/q1P5/4P3/2P5/P1P2PPP/R1BQKBNR",
  "rnb1k1nr/pp1pppbp/6p1/q1P5/4P3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqk1nr/pp1pppbp/6p1/2P5/4P3/2N5/PPP2PPP/R1BQKBNR",
  "rnb1k1nr/pp1pppbp/6p1/q1p5/3PP3/5NP1/PPP2P1P/RNBQKB1R",
  "rnb1k1nr/pp1pppbp/6p1/q1P5/4P3/6P1/PPP2P1P/RNBQKBNR",
  "rnb1k1nr/pp2ppbp/3p2p1/q1p5/3PP3/2N2N2/PPP1BPPP/R1BQK2R",
  "rnb1k1nr/pp1pppbp/6p1/q1p5/2BPP3/2N2N2/PPP2PPP/R1BQK2R",
  "rnb1k1nr/pp1pppbp/6p1/q1p5/3PP3/4BN2/PPP2PPP/RN1QKB1R",
  "rnb1k1nr/pp1pppbp/6p1/q7/2BNP3/8/PPP2PPP/RNBQK2R",
  "rnbqkbnr/pp2pp1p/2pp2p1/8/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkb1r/pp2pppp/2pp1n2/8/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkbnr/ppp2ppp/3p4/4p3/3PP3/8/PPP2PPP/RNBQKBNR",
  "r1bqkb1r/pppnpppp/3p1n2/8/3PPP2/2N5/PPP3PP/R1BQKBNR",
  "r1bqkb1r/pppn1ppp/3p1n2/4p3/3PPP2/2N5/PPP3PP/R1BQKBNR",
  "r1bqkb1r/pp1n1ppp/2p2n2/3p4/2BQPP2/2N2N2/PPP3PP/R1B1K2R",
  "r1bqkb1r/pppnpppp/3p1n2/8/3PP1P1/2N5/PPP2P1P/R1BQKBNR",
  "rnbqk1nr/ppp1ppbp/3p2p1/8/3PP3/2P2N2/PP3PPP/RNBQKB1R",
  "rnbqkb1r/ppp1pp1p/3p1np1/8/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkb1r/pp2pp1p/2pp1np1/8/3PP3/2N1B3/PPPQ1PPP/R3KBNR",
  "rn1qkb1r/pp2pp1p/2pp1np1/8/3PP1b1/2N1B3/PPPQ1PPP/R3KBNR",
  "rnbqkb1r/pp2pp1p/2pp1np1/8/3PP3/2N1B2P/PPP2PP1/R2QKBNR",
  "rnbqk2r/ppp1ppbp/3p1np1/8/3PP2P/2N5/PPP1BPP1/R1BQK1NR",
  "rnbqkb1r/ppp1pp1p/3p1np1/6B1/3PP3/2N5/PPP2PPP/R2QKBNR",
  "rnbqk2r/ppp1ppbp/3p1np1/8/3PP1P1/2N5/PPP1BP1P/R1BQK1NR",
  "rnbqkb1r/ppp1pp1p/3p1np1/8/2BPP3/2N5/PPP2PPP/R1BQK1NR",
  "rnbqkb1r/ppp1pp1p/3p1np1/8/3PP3/2N3P1/PPP2P1P/R1BQKBNR",
  "rnbqkb1r/ppp1pp1p/3p1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R",
  "rnbqk2r/ppp1ppbp/3p1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R",
  "rnbqk2r/ppp1ppbp/3p1np1/8/3PP3/2N2N2/PPP1BPPP/R1BQK2R",
  "r1bq1rk1/ppp1ppbp/2np1np1/8/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1",
  "rnbq1rk1/pp2ppbp/2pp1np1/8/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1",
  "rn1q1rk1/ppp1ppbp/3p1np1/8/3PP1b1/2N2N2/PPP1BPPP/R1BQ1RK1",
  "rnbqk2r/ppp1ppbp/3p1np1/8/3PP3/2N2N1P/PPP2PP1/R1BQKB1R",
  "rnbqkb1r/ppp1pp1p/3p1np1/8/3PPP2/2N5/PPP3PP/R1BQKBNR",
  "rnbq1rk1/ppp1ppbp/3p1np1/8/3PPP2/2N2N2/PPP3PP/R1BQKB1R",
  "rnbqk2r/pp2ppbp/3p1np1/2p5/3PPP2/2N2N2/PPP3PP/R1BQKB1R",
  "rnbq1rk1/ppp1ppbp/3p1np1/8/3PPP2/2N1BN2/PPP3PP/R2QKB1R",
  "rnbqk2r/ppp1ppbp/3p1np1/8/2BPPP2/2N5/PPP3PP/R1BQK1NR",
  "rnbq1rk1/ppp1ppbp/3p1np1/4P3/3P1P2/2N2N2/PPP3PP/R1BQKB1R",
  "rnbq1rk1/pppnppbp/3p2p1/4P3/3P1P1P/2N2N2/PPP3P1/R1BQKB1R",
  "rnbq1rk1/ppp1ppbp/3p1np1/8/3PPP2/2NB1N2/PPP3PP/R1BQK2R",
  "rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR",
  "rnbqkbnr/pp1ppppp/2p5/8/4P3/2N5/PPPP1PPP/R1BQKBNR",
  "rnbqkbnr/pp2pppp/2p5/3p4/4P3/2N5/PPPP1PPP/R1BQKBNR",
  "rnbqkbnr/pp1ppppp/2p5/8/2P1P3/8/PP1P1PPP/RNBQKBNR",
  "rnbqkbnr/pp2pppp/2p5/3p4/2P1P3/8/PP1P1PPP/RNBQKBNR",
  "rnbqkb1r/pp2pppp/5n2/3P4/8/8/PP1P1PPP/RNBQKBNR",
  "rnbqkbnr/pp1p1ppp/2p5/4p3/2P1P3/8/PP1P1PPP/RNBQKBNR",
  "rnb1kbnr/pp2pppp/2p5/3q4/2P5/8/PP1P1PPP/RNBQKBNR",
  "rnbqkbnr/pp2pppp/8/3p4/4P3/1Q6/PP1P1PPP/RNB1KBNR",
  "rnbqkbnr/pp2pppp/8/3pN3/8/8/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/pp1ppppp/2p5/8/4P3/3P4/PPP2PPP/RNBQKBNR",
  "rnbq1rk1/pp2npbp/2p3p1/3pp3/1P2P3/3P1NP1/P1PN1PBP/R1BQ1RK1",
  "rnbqkbnr/pp1ppppp/2p5/8/4P3/1P6/P1PP1PPP/RNBQKBNR",
  "rnbqkbnr/pp2pppp/2p5/3p4/4P3/2N2Q2/PPPP1PPP/R1B1KBNR",
  "rnbqkbnr/pp2pppp/2p5/6N1/4p3/2N5/PPPP1PPP/R1BQKB1R",
  "rnbqkbnr/pp1ppppp/2p5/8/2B1P3/8/PPPP1PPP/RNBQK1NR",
  "rnbqkbnr/pp2pppp/2p5/7Q/4p3/1B6/PPPP1PPP/RNB1K1NR",
  "rnbqkbnr/pp1ppppp/2p5/8/1P2P3/8/P1PP1PPP/RNBQKBNR",
  "rnbqkbnr/pp2pppp/2p5/1P1p4/4P3/8/P1PP1PPP/RNBQKBNR",
  "rnbqkbnr/pp1p1ppp/2p5/4p3/1P2P3/8/PBPP1PPP/RN1QKBNR",
  "rnbqkbnr/pp2pppp/2p5/6B1/4p3/2NP4/PPP2PPP/R2QKBNR",
  "rnbqkbnr/pp1ppppp/2p5/8/4P1P1/8/PPPP1P1P/RNBQKBNR",
  "rnbqkbnr/pp2pppp/2p5/8/4p1P1/2NP4/PPP2P1P/R1BQKBNR",
  "rnbqkbnr/pp2pppp/2p5/3pP3/2P5/8/PP1P1PPP/RNBQKBNR",
  "rnbqkbnr/pp2pppp/2p5/3p4/4P3/2N2N2/PPPP1PPP/R1BQKB1R",
  "rn1qkbnr/pp2pppp/2p5/3p4/4P1b1/2N2N2/PPPP1PPP/R1BQKB1R",
  "rn1qkbnr/pp2pppp/2p5/3p4/4P3/2N2b1P/PPPP1PP1/R1BQKB1R",
  "rn1qkbnr/pp2pppp/2p5/3p3b/4P3/2N2N1P/PPPP1PP1/R1BQKB1R",
  "rnbqkbnr/pp1ppppp/2p5/8/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/pp2pppp/2p5/3pP3/3P4/8/PPP2PPP/RNBQKBNR",
  "rn1qkbnr/pp2pppp/2p5/3pPb2/3P2P1/8/PPP2P1P/RNBQKBNR",
  "rnbqkbnr/pp2pppp/8/2ppP3/3P4/8/PPP2PPP/RNBQKBNR",
  "rn1qkbnr/pp2pppp/2p5/3pPb2/3P4/8/PPP1NPPP/RNBQKB1R",
  "rn1qkbnr/pp2pppp/2p5/3pPb2/1P1P4/8/P1P2PPP/RNBQKBNR",
  "rn1qkbnr/pp2pppp/2p5/3pPb2/3P4/5N2/PPP2PPP/RNBQKB1R",
  "rn1qkbnr/pp2pppp/2p5/3pPb2/3P3P/8/PPP2PP1/RNBQKBNR",
  "rn1qkbnr/pp2pppp/2p5/3pPb2/3P4/2N5/PPP2PPP/R1BQKBNR",
  "rn1qkbnr/pp3ppp/4p1b1/2ppP3/3P2PP/2N5/PPP1NP2/R1BQKB1R",
  "rn2kbnr/pp2pppp/1qp5/3pPb2/3P4/2N5/PPP2PPP/R1BQKBNR",
  "rn1qkbnr/pp3ppp/2p1p3/3pPb2/3P4/2P5/PP2BPPP/RNBQK1NR",
  "r1bqkbnr/pp1ppppp/n1p5/8/3PP3/8/PPP2PPP/RNBQKBNR",
  "r1bqkbnr/ppnppppp/2p5/8/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "rnb1kbnr/pp2pppp/1qp5/3p4/3PP3/8/PPPN1PPP/R1BQKBNR",
  "rnbqkbnr/pp2pppp/2p5/3p4/3PP3/5P2/PPP3PP/RNBQKBNR",
  "rnbqkbnr/pp3ppp/2p5/8/2BpP3/5N2/PPP3PP/RNBQK2R",
  "rnbqkb1r/pp1ppppp/2p2n2/8/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/pp1pp1pp/2p5/5p2/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkb1r/pp1npppp/2p1P3/3p4/3P4/3B4/PPP2PPP/RNBQK1NR",
  "rnbqkbnr/pp2pppp/2p5/3p4/3PP3/4B3/PPP2PPP/RN1QKBNR",
  "rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPPN1PPP/R1BQKBNR",
  "rnbqkbnr/pp2pppp/2p5/6N1/3Pp3/8/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/pp2pppp/2p5/3P4/3P4/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/pp2pppp/8/3p4/3P2P1/8/PPP2P1P/RNBQKBNR",
  "r1bqkb1r/pp2pppp/2n2n2/3p4/3P1B2/2PB4/PP3PPP/RN1QK1NR",
  "rnbqkbnr/pp2pppp/8/3p4/2PP4/8/PP3PPP/RNBQKBNR",
  "rnbqkb1r/pp2pppp/5n2/3p4/2PP4/2N5/PP3PPP/R1BQKBNR",
  "rnbqkb1r/pp2pppp/5n2/2Pp4/3P4/8/PP3PPP/RNBQKBNR",
  "r1bqkb1r/pp2pppp/2n2n2/3p4/2PP4/2N5/PP3PPP/R1BQKBNR",
  "r1bqkb1r/pp3ppp/2n1pn2/3p2B1/2PP4/2N5/PP3PPP/R2QKBNR",
  "r1b1kb1r/pp2pppp/2n2n2/q2p2B1/2PP4/2N5/PP3PPP/R2QKBNR",
  "r2qkb1r/pp2pppp/2n2n2/3p4/2PP2b1/2N2N2/PP3PPP/R1BQKB1R",
  "r1b1kb1r/pp2pppp/1qn2n2/3p2B1/2PP4/2N5/PP3PPP/R2QKBNR",
  "r1bqkb1r/pp2pppp/5n2/n2P2B1/2p5/2N5/PP3PPP/R2QKBNR",
  "rnbqkb1r/pp3ppp/4pn2/3p4/2PP4/2N5/PP3PPP/R1BQKBNR",
  "rnbqkb1r/pp2pp1p/5np1/3p4/2PP4/2N5/PP3PPP/R1BQKBNR",
  "rnbqk2r/pp2ppbp/5np1/3P4/3P4/2N5/PP3PPP/R1BQKBNR",
  "rnbqk2r/pp3ppp/4pn2/3p4/1bPP4/2N2N2/PP3PPP/R1BQKB1R",
  "rnbqkbnr/pp2pppp/2p5/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkbnr/pp2pppp/2p5/8/3Pp3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkb1r/pp2pppp/2p2n2/8/3PN3/3B4/PPP2PPP/R1BQK1NR",
  "rnbqkb1r/pp2pppp/2p2n2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkb1r/pp3ppp/2p2p2/8/2BP4/8/PPP2PPP/R1BQK1NR",
  "rnbqkbnr/p3pppp/2p5/1p1p4/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkbnr/pp2pp1p/2p3p1/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkbnr/pp2pppp/2p5/8/3PN3/8/PPP2PPP/R1BQKBNR",
  "rnbqkbnr/pp2pppp/2p5/8/3Pp3/2N2P2/PPP3PP/R1BQKBNR",
  "rnbqkb1r/pp3ppp/2p2p2/8/3P4/8/PPP2PPP/R1BQKBNR",
  "rnbqkbnr/pp2pppp/2p5/8/2BPp3/2N5/PPP2PPP/R1BQK1NR",
  "rnbqkb1r/pp2pp1p/2p2p2/8/3P4/8/PPP2PPP/R1BQKBNR",
  "rnbqkbnr/pp2ppp1/2p4p/8/3PN3/8/PPP2PPP/R1BQKBNR",
  "r1bqkbnr/pp1npppp/2p5/8/3PN3/8/PPP2PPP/R1BQKBNR",
  "r1bqk2r/pp1n1pp1/2pbp2p/8/3PQ3/3B1N2/PPP2PPP/R1B1K2R",
  "r1bqkbnr/pp1npppp/2p5/6N1/3P4/8/PPP2PPP/R1BQKBNR",
  "r1bqkbnr/pp2pppp/2p2n2/6N1/3P4/8/PPP2PPP/R1BQKBNR",
  "r1bqkb1r/pp1npppp/2p2n2/8/3P4/5NN1/PPP2PPP/R1BQKB1R",
  "r1bqkb1r/pp3ppp/1np1pn2/6N1/2BP4/8/PPP1QPPP/R1B1K1NR",
  "r1bqkb1r/pp3ppp/1np1pn2/6N1/3P4/1B6/PPP1QPPP/R1B1K1NR",
  "r1bqkb1r/pp2pppp/2p2n2/8/2BP4/8/PPP2PPP/R1BQK1NR",
  "rn1qkbnr/pp2pppp/2p5/5b2/3PN3/8/PPP2PPP/R1BQKBNR",
  "rn1qkbnr/pp2pppp/2p3b1/8/3P4/6NN/PPP2PPP/R1BQKB1R",
  "rn1qkbnr/pp2pppp/2p3b1/8/3P3P/6N1/PPP2PP1/R1BQKBNR",
  "rn1qkbnr/pp2pppp/2p3b1/8/3P1P2/6N1/PPP3PP/R1BQKBNR",
  "r2qkbnr/pp1nppp1/2p3bp/8/3P3P/5NN1/PPP2PP1/R1BQKB1R",
  "r2qk2r/pp1nbpp1/2p1pn1p/7P/3P4/3Q1NN1/PPPB1PP1/2KR3R",
  "r2qk2r/pp1n1pp1/2pbpn1p/7P/3P4/3Q1NN1/PPPB1PP1/2KR3R",
  "r2qkbnr/pp1nppp1/2p3bp/7P/3P4/5NN1/PPP2PP1/R1BQKB1R",
  "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR",
  "rnbqkbnr/pp1ppppp/8/2p5/4P1Q1/8/PPPP1PPP/RNB1KBNR",
  "r1bqkbnr/pp2pppp/2np4/2p5/4PP2/2PP4/PP4PP/RNBQKBNR",
  "rnbqkbnr/pp1ppppp/8/2p5/2B1P3/8/PPPP1PPP/RNBQK1NR",
  "rnbqkbnr/pp1ppppp/8/2p5/4P3/7N/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/pp2pppp/8/2pp4/4P3/1P6/PBPP1PPP/RN1QKBNR",
  "r1bqkbnr/pp2ppp1/2np4/2p4p/2P1P3/2N3P1/PP1P1P1P/R1BQKBNR",
  "rnbqkbnr/pp1ppppp/8/2p5/4P1P1/8/PPPP1P1P/RNBQKBNR",
  "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPPNPPP/RNBQKB1R",
  "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPPKPPP/RNBQ1BNR",
  "rnbqkbnr/pp1ppppp/8/2p5/4P3/N7/PPPP1PPP/R1BQKBNR",
  "r1bqkbnr/pp1ppppp/2n5/8/2BpP3/N7/PPP2PPP/R1BQK1NR",
  "rnbqkbnr/pp1ppppp/8/2p5/4P3/6P1/PPPP1P1P/RNBQKBNR",
  "rnbqkbnr/pp1ppppp/8/2p5/4P3/P7/1PPP1PPP/RNBQKBNR",
  "rnbqkbnr/pp1ppppp/8/2p5/P3P3/8/1PPP1PPP/RNBQKBNR",
  "rnbqkbnr/pp1ppppp/8/2p5/4P2P/8/PPPP1PP1/RNBQKBNR",
  "rnbqkbnr/pp1ppppp/8/2p5/4P3/1P6/P1PP1PPP/RNBQKBNR",
  "rnbqkbnr/p2ppppp/1p6/2p5/4P3/1P6/P1PP1PPP/RNBQKBNR",
  "rnbqkbnr/pp1ppppp/8/2p5/2P1P3/8/PP1P1PPP/RNBQKBNR",
  "rnbqkbnr/pp1ppppp/8/2p5/1P2P3/8/P1PP1PPP/RNBQKBNR",
  "rnbqkbnr/pp1ppppp/8/8/1p2P3/8/PBPP1PPP/RN1QKBNR",
  "rnbqkbnr/pp1ppppp/8/8/4P3/p7/2PP1PPP/RNBQKBNR",
  "rnb1kbnr/pp2pppp/8/3q4/1p6/P7/1BPP1PPP/RN1QKBNR",
  "rnbqkbnr/pp1ppppp/8/8/1p2P3/P7/2PP1PPP/RNBQKBNR",
  "rnb1kbnr/pp3ppp/4q3/4p3/1pP5/P2B1N2/3P1PPP/RNBQK2R",
  "r1b1kbnr/pp3ppp/2n1q3/4p3/1pP5/P4N2/1B1P1PPP/RN1QKB1R",
  "rnbqkbnr/pp1ppppp/8/8/1pP1P3/8/P2P1PPP/RNBQKBNR",
  "rnbqkbnr/pp2pppp/8/2p5/4pP2/5N2/PPPP2PP/RNBQKB1R",
  "r1bqkb1r/pp1ppppp/2n2n2/8/2B1P3/8/PPP2PPP/RNBQK1NR",
  "rnbqkbnr/pp1ppppp/8/8/3pPP2/8/PPP3PP/RNBQKBNR",
  "rnbqkbnr/pp1ppppp/8/2p5/4PP2/8/PPPP2PP/RNBQKBNR",
  "rnbqkb1r/pp2pppp/5n2/2pP4/5P2/8/PPPP2PP/RNBQKBNR",
  "rnbqkbnr/pp1ppppp/8/8/3pP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/pp1p1ppp/8/4p3/3pP3/2P2N2/PP3PPP/RNBQKB1R",
  "rnbqkbnr/pp1ppppp/8/2p5/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/pp1ppppp/8/8/3pP3/2P5/PP3PPP/RNBQKBNR",
  "rnbqkb1r/1p3ppp/p2ppn2/8/2B1P3/2N2N2/PP3PPP/R1BQ1RK1",
  "r1bqkb1r/1p2pppp/p1np1n2/8/2B1P3/2N2N2/PP3PPP/R1BQ1RK1",
  "r1bqkbnr/pp1ppp1p/2n3p1/8/4P3/2N2N2/PP3PPP/R1BQKB1R",
  "rnbqk2r/1p2bppp/p2ppn2/8/2B1P3/2N2N2/PP2QPPP/R1B2RK1",
  "rnbqkbnr/1p1p1ppp/p3p3/8/4P3/2N2N2/PP3PPP/R1BQKB1R",
  "r1b1k1nr/1pqp1ppp/p1nbp3/8/2B1P3/2N2N2/PP2QPPP/R1B2RK1",
  "r1bqk1nr/pp1p1ppp/2n1p3/2b5/2B1P3/2N2N2/PP3PPP/R1BQK2R",
  "r1bqk1nr/3p1ppp/p1n1p3/1pb5/4P3/1BN2N2/PP3PPP/R1BQ1RK1",
  "r1bqkbnr/1p1p1ppp/p1n1p3/8/2B1P3/2N2N2/PP3PPP/R1BQK2R",
  "r1bqk1nr/pp1p1ppp/2n1p3/8/1bB1P3/2N2N2/PP3PPP/R1BQK2R",
  "r1bqkbnr/pp3ppp/2npp3/8/2B1P3/2N2N2/PP3PPP/R1BQK2R",
  "r1bqkbnr/5ppp/p1npp3/1p6/2B1P3/2N2N2/PP2QPPP/R1B2RK1",
  "rnbqkb1r/1p1pnppp/p3p3/8/2B1P3/2N2N2/PP3PPP/R1BQK2R",
  "rnbqkb1r/pp1ppppp/5n2/8/3pP3/2P5/PP3PPP/RNBQKBNR",
  "rnbqkbnr/pp1p1ppp/8/4p3/3pP3/2P5/PP3PPP/RNBQKBNR",
  "rnbqkbnr/pp1ppppp/8/8/2P1P3/3p4/PP3PPP/RNBQKBNR",
  "rnbqkbnr/pp1ppppp/8/8/4P3/2Pp4/PP3PPP/RNBQKBNR",
  "rnbqkbnr/pp2pppp/8/3p4/3pP3/2P5/PP3PPP/RNBQKBNR",
  "rnb1kbnr/pp1ppppp/8/q7/3pP3/2P5/PP3PPP/RNBQKBNR",
  "2bqkbnr/r4ppp/p1npp3/1p6/4P3/1BN2N2/PP2QPPP/R1B2RK1",
  "rnbqkbnr/pp1ppppp/8/8/4P3/2p2N2/PP3PPP/RNBQKB1R",
  "rnbqkbnr/pp1ppppp/8/2p5/4P3/2P5/PP1P1PPP/RNBQKBNR",
  "rnb1kbnr/pp2pppp/8/2pq4/8/2P5/PP1P1PPP/RNBQKBNR",
  "r3kbnr/pp2pppp/2n5/3q4/3P2b1/5N2/PP3PPP/RNBQKB1R",
  "r3kbnr/pp2pppp/8/8/3n4/2N2P2/PP3P1P/R1B1KB1R",
  "r1b1k1nr/pp3ppp/2n5/3qp3/1b1P4/2N2N2/PP2BPPP/R1BQK2R",
  "rn2kb1r/pp2pppp/5n2/2pq4/3P2b1/2P2N2/PP3PPP/RNBQKB1R",
  "rnbqkb1r/pp1ppppp/8/3nP3/3p4/2P5/PP3PPP/RNBQKBNR",
  "r1bqkb1r/pp1ppppp/1nn5/2p1P3/8/1BP2N2/PP1P1PPP/RNBQK2R",
  "r1b1kb1r/ppqppp1p/1nn5/4P1p1/2p5/2P2N2/PPBPQPPP/RNB1K2R",
  "r1bqkb1r/pp1ppppp/2n5/2pnP3/8/N1P2N2/PP1P1PPP/R1BQKB1R",
  "rnbqkbnr/pp1ppppp/8/2p5/4P3/2N5/PPPP1PPP/R1BQKBNR",
  "rnbqkbnr/pp1p1ppp/4p3/2p5/4P3/2N5/PPPP1PPP/R1BQKBNR",
  "rnbqkbnr/pp1p1ppp/4p3/2p5/4P3/2N3P1/PPPP1P1P/R1BQKBNR",
  "r1bqkbnr/pp1ppppp/2n5/2p5/4P3/2N5/PPPPNPPP/R1BQKB1R",
  "r1bqkbnr/pp1ppppp/2n5/2p5/4P1P1/2N5/PPPP1P1P/R1BQKBNR",
  "rnbqkbnr/pp3ppp/4p3/2pp4/4P3/2N3P1/PPPP1P1P/R1BQKBNR",
  "r1bqkbnr/pp1ppppp/2n5/2p5/4P3/2N5/PPPP1PPP/R1BQKBNR",
  "r1bqkbnr/pp1ppppp/2n5/2p5/4PP2/2N5/PPPP2PP/R1BQKBNR",
  "r1bqk1nr/pp1p1pbp/2n1p1p1/2p2P2/2B1P3/2N2N2/PPPP2PP/R1BQK2R",
  "r1bqkbnr/pp1ppp1p/2n3p1/2p5/4P3/2N3P1/PPPP1P1P/R1BQKBNR",
  "r1bqk1nr/pp1pppbp/2n3p1/2p5/4P3/2N3P1/PPPP1PBP/R1BQK1NR",
  "r1bqkbnr/pp1ppppp/2n5/2p5/4P3/2N3P1/PPPP1P1P/R1BQKBNR",
  "r1bqk1nr/pp1p1pbp/4p1p1/2p5/3nP3/3PB1P1/PPP1NPBP/R2QK1NR",
  "r1bqk1nr/pp2ppbp/2np2p1/2p5/4P3/2NP2P1/PPP2PBP/R1BQK1NR",
  "r1bqk1nr/pp2ppbp/2np2p1/2p5/4PP2/2NP2P1/PPP3BP/R1BQK1NR",
  "r1bqk2r/pp2npbp/2np2p1/2p1p3/4PP2/2NP2PN/PPP3BP/R1BQK2R",
  "r1bqk1nr/pp3pbp/2np2p1/2p1p3/4P3/2NP2P1/PPP1NPBP/R1BQK2R",
  "r1bqk1nr/pp3pbp/2np2p1/2p1p3/4PP2/2NP2P1/PPP3BP/R1BQK1NR",
  "r1bqk1nr/pp2ppbp/2np2p1/2p5/4P3/2NPB1P1/PPP2PBP/R2QK1NR",
  "rnb1k1nr/pp1pppbp/6p1/q1p5/3PP3/2N2N2/PPP2PPP/R1BQKB1R",
  "rnb1k1nr/pp1pppbp/6p1/q1p5/3PP3/2N1BN2/PPP2PPP/R2QKB1R",
  "rnb1k1nr/pp1pppbp/6p1/q1pP4/4P3/2N2N2/PPP2PPP/R1BQKB1R",
  "rnb1k1nr/pp1ppp1p/6p1/q1P5/4P3/2P2N2/P1P2PPP/R1BQKB1R",
  "rnb1k1nr/pp1pppbp/6p1/q1P5/4P3/2N2N2/PPP2PPP/R1BQKB1R",
  "rnb1k1nr/pp1pppbp/6p1/q1p5/3PP3/2N2N2/PPPB1PPP/R2QKB1R",
  "rnb1k1nr/pp1pppbp/6p1/q1p5/3PP3/2P2N2/PP3PPP/RNBQKB1R",
  "rnb1k1nr/pp1pppbp/6p1/q1P5/4P3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqk1nr/pp1ppp1p/6pb/2p5/2P1P3/5N2/PP1P1PPP/RNBQKB1R",
  "rnbqkbnr/pp1pp1pp/8/2p2p2/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/pp1pppp1/7p/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkb1r/pp1pp1pp/7n/2p2P2/8/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/pp1pp2p/6p1/2p2p2/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/pp1ppp1p/6p1/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/pp1ppp1p/6p1/2p5/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqk1nr/pp1pppbp/6p1/2p5/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "rnb1k1nr/pp1ppp1p/6p1/2P5/4P3/2q2N2/P1P2PPP/R1BQKB1R",
  "rnbqkbnr/pp1p1ppp/8/2p1p3/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/p2ppppp/1p6/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnb1kbnr/pp1ppppp/8/q1p5/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/p2ppppp/8/1pp5/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnb1kbnr/ppqppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/1p1ppppp/p7/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/1p1ppppp/p7/2p5/4P3/5N2/PPPPBPPP/RNBQK2R",
  "rnbqkbnr/1p1ppppp/p7/2p5/4P3/1P3N2/P1PP1PPP/RNBQKB1R",
  "rnbqkbnr/1p1ppppp/p7/2p5/2P1P3/5N2/PP1P1PPP/RNBQKB1R",
  "rnbqkbnr/1p1p1ppp/p3p3/2p5/2P1P3/5N2/PP1P1PPP/RNBQKB1R",
  "rnbqkbnr/1p2pppp/p2p4/2p5/2P1P3/5N2/PP1P1PPP/RNBQKB1R",
  "rnbqkbnr/1p1ppppp/p7/2p5/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/1p1ppppp/p7/8/2BpP3/5N2/PPP2PPP/RNBQK2R",
  "rnbqkbnr/1p1ppppp/p7/8/3pP3/2P2N2/PP3PPP/RNBQKB1R",
  "rnbqkbnr/1p1p1ppp/p7/4p3/3NP3/8/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/1p1ppppp/p7/8/3QP3/5N2/PPP2PPP/RNB1KB1R",
  "rnbqkbnr/1p1ppppp/p7/2p5/4P3/3P1N2/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/1p1ppppp/p7/2p5/4P3/5NP1/PPPP1P1P/RNBQKB1R",
  "rnbqkbnr/1p1ppppp/p7/2p5/4P3/2P2N2/PP1P1PPP/RNBQKB1R",
  "rnbqkb1r/1p1ppppp/p4n2/2p5/4P3/2P2N2/PP1P1PPP/RNBQKB1R",
  "rnbqkb1r/1p2pppp/p4n2/2pP4/8/2P2N2/PP1P1PPP/RNBQKB1R",
  "rnbqkbnr/3ppppp/p7/1pp5/4P3/2P2N2/PP1P1PPP/RNBQKB1R",
  "rnbqkbnr/1p2pppp/p2p4/2p5/4P3/2P2N2/PP1P1PPP/RNBQKB1R",
  "rnbqkbnr/1p1ppppp/p7/2p5/1P2P3/5N2/P1PP1PPP/RNBQKB1R",
  "rnbqkbnr/1p1ppppp/p7/2p5/4P3/2N2N2/PPPP1PPP/R1BQKB1R",
  "rnbqkb1r/pp1ppppp/5n2/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkb1r/pp1ppppp/5n2/2p1P3/8/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkb1r/pp1ppppp/5n2/2p5/4P3/2N2N2/PPPP1PPP/R1BQKB1R",
  "rnbqkb1r/pp1ppppp/8/2p1P3/8/2n2N2/PPPP1PPP/R1BQKB1R",
  "r1bqkb1r/pp1p1ppp/2n5/2ppP3/3P4/5N2/PPP2PPP/R1BQKB1R",
  "r1bqk1nr/pp3ppp/2np4/2p1p1b1/2B1P3/2NP4/PPPN1PPP/R1BQK2R",
  "r1bqkbnr/pp1ppppp/2n5/1Bp5/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/pp1ppppp/8/nBp5/1P2P3/5N2/P1PP1PPP/RNBQK2R",
  "r1bqkbnr/pp1ppppp/2n5/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "r1bqkbnr/pp1ppppp/2n5/2p5/1P2P3/5N2/P1PP1PPP/RNBQKB1R",
  "rnbqkbnr/pp1ppppp/8/1Bp5/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/pp1ppp1p/2n3p1/1Bp5/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqk1nr/pp1p1pbp/2n3p1/1Bp1p3/3PP3/2P2N2/PP3PPP/RNBQ1RK1",
  "r1bqk2r/pp1pppbp/2n2np1/1Bp5/3PP3/2P2N2/PP3PPP/RNBQ1RK1",
  "r1bqk2r/pp1pppbp/2n2np1/1Bp5/Q3P3/2P2N2/PP1P1PPP/RNB2RK1",
  "r1bqk1nr/pp1p1pbp/2n3p1/1Bp1p3/1P2P3/5N2/P1PP1PPP/RNBQR1K1",
  "r1bqkbnr/pp1ppp1p/2n3p1/8/3NP3/8/PPP2PPP/RNBQKB1R",
  "r1b1kbnr/ppqppppp/2n5/8/3NP3/8/PPP2PPP/RNBQKB1R",
  "r1bqkbnr/pp1p1ppp/2n1p3/2p5/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "r1b1kbnr/pp1ppppp/1qn5/8/3NP3/8/PPP2PPP/RNBQKB1R",
  "r1bqkbnr/pp3ppp/2np4/1N2p3/4P3/8/PPP2PPP/RNBQKB1R",
  "r1bqkbnr/pp1p1ppp/2n5/4p3/3NP3/8/PPP2PPP/RNBQKB1R",
  "r1bqkbnr/pp2pppp/2n5/3p4/3NP3/8/PPP2PPP/RNBQKB1R",
  "r1bqkbnr/1p1p1ppp/p1n5/4p3/2PNP3/8/PP3PPP/RNBQKB1R",
  "r1bqkbnr/pp1ppppp/2n5/2p5/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "r1bqkbnr/pp1ppppp/2n5/8/3pP3/5N2/PPP2PPP/RNBQKB1R",
  "r1bqkbnr/pp1ppppp/2n5/8/3NP3/8/PPP2PPP/RNBQKB1R",
  "r1bqk2r/pp1p1ppp/2n1pn2/1Nb5/4P3/2N5/PPP2PPP/R1BQKB1R",
  "r1bqkb1r/pp1p1ppp/2n2n2/4p3/3NP3/2N5/PPP2PPP/R1BQKB1R",
  "r2qkb1r/1p3ppp/p1npbn2/4p1B1/4P3/N1N5/PPP2PPP/R2QKB1R",
  "r1bqkb1r/pp1p1ppp/2N2n2/4p3/4P3/2N5/PPP2PPP/R1BQKB1R",
  "r1bqkb1r/pp1p1ppp/2n2n2/4p3/4P3/2N2N2/PPP2PPP/R1BQKB1R",
  "r1bqkb1r/pp1p1ppp/2n2n2/4p3/4P3/1NN5/PPP2PPP/R1BQKB1R",
  "r1bqkb1r/5ppp/p1np1n2/1p2p1B1/4P3/N1N5/PPP2PPP/R2QKB1R",
  "r1bqkb1r/5p1p/p1np4/1p1Npp2/4P3/N7/PPP2PPP/R2QKB1R",
  "r1bqkb1r/5ppp/p1np1n2/1p1Np1B1/4P3/N7/PPP2PPP/R2QKB1R",
  "r1bqk2r/5pbp/p1np1p2/1p1Np3/4P3/N7/PPP2PPP/R2QKB1R",
  "r1bqkb1r/5p1p/p1np4/1B1Npp2/4P3/N7/PPP2PPP/R2QK2R",
  "r1bqkb1r/pp1ppppp/2n2n2/8/3NP3/8/PPP2PPP/RNBQKB1R",
  "r1bqkbnr/pp1ppp1p/2N3p1/8/4P3/8/PPP2PPP/RNBQKB1R",
  "r1bqkbnr/pp1ppp1p/2n3p1/8/3NP3/2N5/PPP2PPP/R1BQKB1R",
  "r1bqk2r/pp1pppbp/2n2np1/8/2BNP3/2N1B3/PPP2PPP/R2QK2R",
  "r1bqk2r/pp2ppbp/2np1np1/8/2BNP3/2N1B3/PPP2PPP/R2QK2R",
  "r1bqkbnr/pp1ppp1p/2n3p1/8/2PNP3/8/PP3PPP/RNBQKB1R",
  "r1bqkb1r/pp2pp1p/3p1np1/8/2PQP3/2N5/PP3PPP/R1B1KB1R",
  "r1bqk1nr/pp1pppbp/2n3p1/8/2PNP3/8/PP3PPP/RNBQKB1R",
  "r1bqk2r/pp2ppbp/2np2pn/8/2P1P3/8/PPN1BPPP/RNBQK2R",
  "r1bqk1nr/pp1pppbp/2n3p1/8/2PNP3/4B3/PP3PPP/RN1QKB1R",
  "r1bqk2r/pp1pppbp/2n3p1/8/2PNP1n1/2N1B3/PP3PPP/R2QKB1R",
  "r1bqkb1r/pp1p1ppp/2n1p3/2pnP3/3P4/2P2N2/PP3PPP/RNBQKB1R",
  "rnbqkbnr/pp1p1ppp/4p3/2p5/4P3/2P2N2/PP1P1PPP/RNBQKB1R",
  "rnbqkbnr/1p1p1ppp/p3p3/2p5/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "r1bqkb1r/pp1p1ppp/2n1pn2/8/3NP3/2N5/PPP2PPP/R1BQKB1R",
  "r1bqkb1r/pp1p1ppp/2N1pn2/8/4P3/2N5/PPP2PPP/R1BQKB1R",
  "rnbqkbnr/pp1p1ppp/4p3/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkb1r/pp1p1ppp/4pn2/8/3NP3/8/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/pp1p1ppp/4p3/8/3pP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/pp1p1ppp/4p3/2p5/4P3/1P3N2/P1PP1PPP/RNBQKB1R",
  "rnb1kb1r/pp1p1ppp/1q2pn2/8/3NP3/2N5/PPP2PPP/R1BQKB1R",
  "rnbqkbnr/3p1ppp/p3p3/1p6/3NP3/2N3P1/PPP2P1P/R1BQKB1R",
  "rnbqkbnr/pp1p1ppp/4p3/2p5/2P1P3/5N2/PP1P1PPP/RNBQKB1R",
  "rnb1kbnr/pp1p1ppp/1q2p3/8/3NP3/8/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/pp3ppp/4p3/2pp4/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqk1nr/pp1p1ppp/4p3/2b5/3NP3/8/PPP2PPP/RNBQKB1R",
  "rnbqk2r/pp1p1ppp/4pn2/8/1b1NP3/2N5/PPP2PPP/R1BQKB1R",
  "rnbqk2r/pp1p1ppp/5n2/4p3/1b1NP3/2NB4/PPP2PPP/R1BQK2R",
  "rnbqk2r/pp1p1ppp/4pn2/4P3/1b1N4/2N5/PPP2PPP/R1BQKB1R",
  "rnbqkbnr/pp1p1ppp/4p3/8/3pP3/2P2N2/PP3PPP/RNBQKB1R",
  "rnbqkbnr/pp1p1ppp/4p3/2p5/1P2P3/5N2/P1PP1PPP/RNBQKB1R",
  "rnbqkbnr/1p1p1ppp/p3p3/8/3NP3/8/PPP2PPP/RNBQKB1R",
  "r1bqk2r/1p1p1ppp/p1n1pn2/8/1bPNP3/2NB4/PP3PPP/R1BQK2R",
  "r1bqk2r/1p1p1ppp/p1n1pn2/8/1bPNP3/2N5/PPB2PPP/R1BQK2R",
  "rnbqkbnr/1p1p1p1p/p3p1p1/8/2PNP3/8/PP3PPP/RNBQKB1R",
  "rnbqkbnr/1p1p1ppp/p3p3/8/2PNP3/8/PP3PPP/RNBQKB1R",
  "rnbqkb1r/1p3p1p/p2ppnp1/8/2PNP3/3B4/PP3PPP/RNBQ1RK1",
  "rnbqkbnr/1p1p1ppp/p3p3/8/3NP3/3B4/PPP2PPP/RNBQK2R",
  "rnbqk1nr/1p1p1ppp/p3p3/2b5/3NP3/3B4/PPP2PPP/RNBQK2R",
  "rnbqkbnr/1p1p1p1p/p3p1p1/8/3NP3/3B4/PPP2PPP/RNBQK2R",
  "rnbqkbnr/1p1p1ppp/p3p3/8/3NP3/2N5/PPP2PPP/R1BQKB1R",
  "rnbqkbnr/3p1ppp/p3p3/1p6/3NP3/2N5/PPP2PPP/R1BQKB1R",
  "rnb1k1nr/3p1ppp/pq2p3/1pb5/3NP1Q1/2NBB3/PPP2PPP/R3K2R",
  "rnb1kbnr/3p1ppp/pq2p3/1p6/4P3/2NB1N2/PPP2PPP/R1BQK2R",
  "r1bqkbnr/pp1p1ppp/2n1p3/8/3NP3/8/PPP2PPP/RNBQKB1R",
  "r1bqkb1r/1p3ppp/p1n1pn2/3p4/2P1P3/N1N5/PP3PPP/R1BQKB1R",
  "r1bq1rk1/4bppp/ppnppn2/8/2P1P3/N1N5/PP2BPPP/R1BQ1RK1",
  "r1bqkbnr/pp1p1ppp/2n1p3/1N6/4P3/8/PPP2PPP/RNBQKB1R",
  "r1bqk2r/pp1p1ppp/2nNpn2/8/1b2P3/2N5/PPP2PPP/R1BQKB1R",
  "r1bqkbnr/pp1p1ppp/2n1p3/8/3NP3/2N5/PPP2PPP/R1BQKB1R",
  "r1bqkbnr/1p1p1ppp/p1n1p3/8/3NP3/2N5/PPP2PPP/R1BQKB1R",
  "r1b1kbnr/ppqp1ppp/2n1p3/8/3NP3/2N5/PPP2PPP/R1BQKB1R",
  "rqb1kbnr/1p1p1ppp/pBn1p3/1N6/4P3/2N5/PPP2PPP/R2QKB1R",
  "r1b1kbnr/ppqp1ppp/2n1p3/8/3NP3/2N1B3/PPP2PPP/R2QKB1R",
  "r1b1kbnr/1pqp1ppp/p1n1p3/8/3NP3/2N1B3/PPP1BPPP/R2QK2R",
  "rnbqkbnr/pp2pppp/3p4/2p5/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/pp2pppp/3p4/8/3pP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/pp2pppp/3p4/2p5/4P3/2P2N2/PP1P1PPP/RNBQKB1R",
  "r1b1kb1r/pp2pppp/2np4/q2P4/8/2P2N2/P3BPPP/R1BQK2R",
  "r1bqkb1r/pp2pppp/2np4/8/3Pn3/5N2/PP2BPPP/RNBQK2R",
  "rnbqkbnr/pp2pppp/3p4/2p5/4P3/3B1N2/PPPP1PPP/RNBQK2R",
  "rnbqkbnr/p3pppp/3p4/1pp5/4P3/5NP1/PPPP1P1P/RNBQKB1R",
  "rnbqkbnr/pp2pppp/3p4/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkb1r/pp2pppp/3p1n2/2p5/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkb1r/pp2pppp/3p4/2P5/4n3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/pp2pppp/3p4/8/3pP3/2P2N2/PP3PPP/RNBQKB1R",
  "rnbqkbnr/pp2pppp/3p4/2p5/1P2P3/5N2/P1PP1PPP/RNBQKB1R",
  "rnbqkbnr/pp2pppp/3p4/1Bp5/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r2qkbnr/pp1bpp1p/2np2p1/1Bp1P3/8/5N2/PPPPQPPP/RNB2RK1",
  "r2qkb1r/1p2pppp/p2p1n2/2p3B1/3Pb3/2P2N2/PP3PPP/RN1QR1K1",
  "r3kb1r/pp1qpppp/2np1n2/2p5/3PP3/2P2N2/PP3PPP/RNBQ1RK1",
  "rn1qkbnr/pp1bpppp/3p4/1Bp5/4P3/5N2/PPPP1PPP/RNBQK2R",
  "rn2kbnr/pp1qpppp/3p4/2p5/2P1P3/5N2/PP1P1PPP/RNBQK2R",
  "rnbqkbnr/pp2pppp/3p4/8/3QP3/5N2/PPP2PPP/RNB1KB1R",
  "r1b1kbnr/pp1qpppp/2np4/1B6/3QP3/5N2/PPP2PPP/RNB1K2R",
  "rnbqkbnr/pp2pp1p/3p2p1/8/3NP3/8/PPP2PPP/RNBQKB1R",
  "rnbqkb1r/pp2pppp/3p1n2/8/2BNP3/8/PPP2PPP/RNBQK2R",
  "rnbqkb1r/pp2pppp/3p1n2/8/3NP3/8/PPP2PPP/RNBQKB1R",
  "rnbqkb1r/pp2pppp/3p1n2/8/3NP3/5P2/PPP3PP/RNBQKB1R",
  "rnbqkb1r/pp3ppp/3p1n2/1B2p3/3NP3/5P2/PPP3PP/RNBQK2R",
  "r1bqkb1r/pp2pppp/2np1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R",
  "r1bqkb1r/pp2pppp/2np1n2/8/3NP3/2N3P1/PPP2P1P/R1BQKB1R",
  "rn1qkb1r/pp1bpppp/3p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R",
  "r1bqkb1r/pp2pppp/2np1n2/8/4P3/2N5/PPP1NPPP/R1BQKB1R",
  "rnbqkb1r/pp3ppp/3p1n2/1B2p3/3NP3/2N5/PPP2PPP/R1BQK2R",
  "r1bqkb1r/pp2pppp/2np1n2/8/3NP3/2NB4/PPP2PPP/R1BQK2R",
  "r1b1kb1r/pp2pppp/1qnp1n2/8/2BNP3/2N5/PPP2PPP/R1BQK2R",
  "r1bqkb1r/pp2pppp/2np1n2/8/2BNP3/2N5/PPP2PPP/R1BQK2R",
  "r1bqkb1r/p3pp1p/2pp1np1/4P3/2B5/2N5/PPP2PPP/R1BQK2R",
  "r1bqkb1r/pp3ppp/2np1n2/4p3/3NP3/2N5/PPP1BPPP/R1BQK2R",
  "r1bqkb1r/pp3ppp/2Np1n2/4p3/4P3/2N5/PPP1BPPP/R1BQK2R",
  "r1bqkb1r/pp2pppp/2np1n2/8/3NP3/2N5/PPP1BPPP/R1BQK2R",
  "r1bqkb1r/pp2pp1p/3p1np1/8/3QP3/2N5/PPP1BPPP/R1B1K2R",
  "r1bqkb1r/pp3ppp/2np1n2/4p3/4P3/1NN5/PPP1BPPP/R1BQK2R",
  "r1bqkb1r/pp2pppp/2np1n2/6B1/3NP3/2N5/PPP2PPP/R2QKB1R",
  "r1bqkb1r/pp2pp1p/2np1np1/6B1/3NP3/2N5/PPP2PPP/R2QKB1R",
  "r2qkb1r/pp1bpppp/2np1n2/6B1/3NP3/2N5/PPP2PPP/R2QKB1R",
  "r2qkb1r/pp1bpppp/2np1n2/6B1/3NP3/2N5/PPPQ1PPP/R3KB1R",
  "r1bqkb1r/pp3ppp/2nppn2/6B1/3NP3/2N5/PPP2PPP/R2QKB1R",
  "r1bqkb1r/pp3ppp/2nppn2/6B1/3NP3/2NQ4/PPP2PPP/R3KB1R",
  "r1bqkb1r/pp3ppp/2Nppn2/6B1/4P3/2N5/PPP2PPP/R2QKB1R",
  "r1bqkb1r/pp3ppp/2nppn2/6B1/4P3/1NN5/PPP2PPP/R2QKB1R",
  "r1bqkb1r/pp3ppp/2nppn2/1B4B1/3NP3/2N5/PPP2PPP/R2QK2R",
  "r1bqk2r/pp2bppp/2nppn2/6B1/3NP3/2N5/PPPQ1PPP/R3KB1R",
  "r1bqk2r/4bppp/p2ppn2/1p4B1/3QPP2/2N5/PPP3PP/2KR1B1R",
  "r1b1kb1r/pp3ppp/1qnppn2/6B1/3NP3/2N5/PPPQ1PPP/R3KB1R",
  "r1bqkb1r/pp3ppp/2nppn2/6B1/3NP3/2N5/PPPQ1PPP/R3KB1R",
  "r1bq1rk1/pp2bppp/2np1n2/4p1B1/3NPP2/2N5/PPPQ2PP/2KR1B1R",
  "r1bq1rk1/pp2bppp/2nppn2/6B1/3NPP2/2N5/PPPQ2PP/2KR1B1R",
  "r1bq1rk1/pp2bppp/3ppn2/6B1/3QPP2/2N5/PPP3PP/2KR1B1R",
  "r1bq1rk1/pp2bppp/3ppn2/6B1/3nPP2/2N5/PPPQ2PP/2KR1B1R",
  "r1bqkb1r/1p3ppp/p1nppn2/6B1/3NP3/2N5/PPPQ1PPP/R3KB1R",
  "r2qkb1r/1p1b1ppp/p1nppn2/6B1/3NP3/2N5/PPPQ1PPP/2KR1B1R",
  "r2qk2r/1p1bbppp/p1nppn2/6B1/3NPP2/2N5/PPPQ2PP/2KR1B1R",
  "r2qk2r/3bbppp/p1nppB2/1p6/4PP2/2N2N2/PPPQ2PP/2KR1B1R",
  "rnbqkb1r/pp2pp1p/3p1np1/8/3NP3/2N5/PPP2PPP/R1BQKB1R",
  "rnbqkb1r/pp2pp1p/3p1np1/8/3NP3/2N5/PPP1BPPP/R1BQK2R",
  "rnbqkb1r/pp2pp1p/3p1np1/8/3NP3/2N3P1/PPP2P1P/R1BQKB1R",
  "rnbqkb1r/pp2pp1p/3p1np1/8/3NPP2/2N5/PPP3PP/R1BQKB1R",
  "r1bqkb1r/pp1npp1p/3p1np1/8/3NPP2/2N5/PPP3PP/R1BQKB1R",
  "rnbqkb1r/pp2pp1p/3p1np1/8/3NP3/2N1B3/PPP2PPP/R2QKB1R",
  "rnbqk2r/pp2ppbp/3p1np1/8/3NP3/2N1B3/PPP1BPPP/R2QK2R",
  "r1bqk2r/pp2ppbp/2np1np1/8/3NP3/2N1B3/PPP1BPPP/R2QK2R",
  "r1bqk2r/pp2ppbp/2np1np1/8/4P3/1NN1B3/PPP1BPPP/R2QK2R",
  "r1bqk2r/pp2ppbp/2np1np1/8/3NP3/2N1B3/PPPQBPPP/R3K2R",
  "r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1B3/PPPQBPPP/2KR3R",
  "r1bqk2r/pp2ppbp/2np1np1/8/3NP3/2N1B3/PPP1BPPP/R2Q1RK1",
  "r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1B3/PPPQBPPP/R4RK1",
  "r1b2rk1/pp2ppbp/1qnp1np1/4P3/3N1P2/2N1B3/PPP1B1PP/R2Q1RK1",
  "r1bq1rk1/1p2ppbp/2np1np1/p7/4P3/1NN1B3/PPP1BPPP/R2Q1RK1",
  "r2q1rk1/pp2ppbp/5np1/n2p1P2/4P3/1NNPB3/PP4PP/R2Q1RK1",
  "r2q1rk1/pp2ppbp/3pbnp1/n7/4PP2/1NN1B3/PPP1B1PP/R2Q1RK1",
  "r1bq1rk1/pp2ppbp/2np1np1/8/4P3/1NN1B3/PPP1BPPP/R2Q1RK1",
  "r2q1rk1/pp2ppbp/3p1np1/n4P2/2b1P3/1NNBB3/PPP3PP/R2Q1RK1",
  "r4rk1/pp2ppbp/3p1np1/q4P2/4P1P1/2N1B3/PPP1Q2P/R4RK1",
  "r1q2rk1/pp2ppbp/2npbnp1/8/4PP2/1NN1B3/PPP1B1PP/R2Q1RK1",
  "r1bqk2r/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPP3PP/R2QKB1R",
  "rnbqk2r/pp2ppbp/3p1np1/8/3NP3/2N1BP2/PPP3PP/R2QKB1R",
  "rnbq1rk1/pp2ppbp/3p1np1/8/3NP3/2N1BP2/PPP3PP/R2QKB1R",
  "r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R",
  "r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R",
  "r1bq1rk1/pp2ppbp/2np1np1/8/3NP1P1/2N1BP2/PPPQ3P/R3KB1R",
  "r2q1rk1/pp1bppbp/2np1np1/8/2BNP3/2N1BP2/PPPQ2PP/R3K2R",
  "r1bq1rk1/1p2ppbp/2np1np1/p7/2BNP3/2N1BP2/PPPQ2PP/R3K2R",
  "r2q1rk1/pp2ppbp/3pbnp1/8/2BBP3/2N2P2/PPPQ2PP/R3K2R",
  "r1bq1rk1/pp2ppbp/2np1np1/8/2BNP3/2N1BP2/PPPQ2PP/R3K2R",
  "r1bq1rk1/pp1nppbp/2np2p1/8/2BNP3/2N1BP2/PPPQ2PP/R3K2R",
  "r2q1rk1/pp1bppbp/2np1np1/8/2BNP3/2N1BP2/PPPQ2PP/2KR3R",
  "2rq1rk1/pp1bppbp/2np1np1/8/2BNP3/2N1BP2/PPPQ2PP/2KR3R",
  "r1r3k1/pp1bppbp/2np1np1/q7/3NP2P/1BN1BP2/PPPQ2P1/2KR3R",
  "r1r3k1/pp1bppb1/2np1np1/q6p/3NP2P/1BN1BP2/PPPQ2P1/2KR3R",
  "rnbqkb1r/pp3ppp/3ppn2/8/3NP3/2N5/PPP2PPP/R1BQKB1R",
  "rnbqkb1r/1p3ppp/p2ppn2/8/3NP3/2N1B3/PPPQ1PPP/R3KB1R",
  "rnbqkb1r/pp3ppp/3ppn2/8/3NP3/2N3P1/PPP2P1P/R1BQKB1R",
  "rnbqkb1r/pp3ppp/3ppn2/1B6/3NP3/2N5/PPP2PPP/R1BQK2R",
  "rnbqkb1r/pp3ppp/3ppn2/8/3NP1P1/2N5/PPP2P1P/R1BQKB1R",
  "rnbqkb1r/pp3ppp/3ppn2/8/3NPP2/2N5/PPP3PP/R1BQKB1R",
  "r1bqk2r/pp2bppp/2nppn2/8/3NPP2/2N1BQ2/PPP3PP/R3KB1R",
  "rnbqkb1r/pp3ppp/3ppn2/8/3NP3/2N5/PPP1BPPP/R1BQK2R",
  "r1bqkb1r/pp3ppp/2nppn2/8/3NP3/2N5/PPP1BPPP/R1BQK2R",
  "r1bq1rk1/pp2bppp/2nppn2/8/3NPP2/2N1B3/PPP1B1PP/R2Q1RK1",
  "r2q1rk1/pp1bbppp/2nppn2/8/4PP2/1NN1B3/PPP1B1PP/R2Q1RK1",
  "r1bqkb1r/1p1n1ppp/p2ppn2/8/3NP3/2N5/PPP1BPPP/R1BQ1RK1",
  "rnbqkb1r/1p3ppp/p2ppn2/8/3NP3/2N5/PPP1BPPP/R1BQK2R",
  "rnb1kb1r/1pq2ppp/p2ppn2/8/3NP3/2N5/PPP1BPPP/R1BQ1RK1",
  "r1b2rk1/1pq1bppp/p1nppn2/8/3NPP2/2N1B3/PPP1B1PP/R3QRK1",
  "r1b1kb1r/1pq2ppp/p1nppn2/8/3NPP2/2N5/PPP1B1PP/R1BQ1RK1",
  "r1b1kb1r/1pq2ppp/p1nppn2/8/3NPP2/2N1B3/PPP1B1PP/R2Q1RK1",
  "r1b1k2r/1pq1bppp/p1nppn2/8/P2NPP2/2N5/1PP1B1PP/R1BQ1R1K",
  "rnbqkb1r/pp3ppp/3ppn2/8/2BNP3/2N5/PPP2PPP/R1BQK2R",
  "rnbqkb1r/5ppp/p2ppn2/1p6/3NP3/1BN5/PPP2PPP/R1BQK2R",
  "r1bq1rk1/pp2bppp/2nppn2/8/3NPP2/1BN1B3/PPP3PP/R2QK2R",
  "r1bqkb1r/pp3ppp/2nppn2/8/2BNP3/2N5/PPP2PPP/R1BQK2R",
  "r1bqkb1r/pp3ppp/2nppn2/8/2BNP3/2N1B3/PPP2PPP/R2QK2R",
  "r1bq1rk1/p3bppp/1p1ppn2/n7/3NPP2/1BN1B3/PPP3PP/R2Q1RK1",
  "r1bqk2r/pp2bppp/2nppn2/8/2BNP3/2N1B3/PPP1QPPP/R3K2R",
  "rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R",
  "rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N4P/PPP2PP1/R1BQKB1R",
  "rnbqkb1r/1p2pppp/p2p1n2/8/3NP1P1/2N5/PPP2P1P/R1BQKB1R",
  "rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N1B3/PPP2PPP/R2QKB1R",
  "rnbqkb1r/1p2pppp/p2p4/8/3NP1n1/2N1B3/PPP2PPP/R2QKB1R",
  "rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKBR1",
  "rnbqkb1r/1p2pppp/p2p1n2/8/2BNP3/2N5/PPP2PPP/R1BQK2R",
  "rnbqkb1r/1p3ppp/p2ppn2/8/3NP1P1/2N1B3/PPP2P1P/R2QKB1R",
  "rnbqkb1r/1p3p1p/p2p1np1/4pNP1/4P3/2N1B3/PPP2P1P/R2QKB1R",
  "rnbqkb1r/1p3ppp/p2ppn2/8/3NP3/2N1BP2/PPP3PP/R2QKB1R",
  "rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N3P1/PPP2P1P/R1BQKB1R",
  "rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP1BPPP/R1BQK2R",
  "rn1qk2r/1p2bppp/p2pbn2/4p3/4P3/1NN5/PPP1BPPP/R1BQ1RK1",
  "rnbq1rk1/1p2bppp/p2p1n2/4p3/4P3/1NN5/PPP1BPPP/R1BQ1RK1",
  "rnbqkb1r/1p2pppp/p2p1n2/8/3NPP2/2N5/PPP3PP/R1BQKB1R",
  "rnbqkb1r/1p2pppp/p2p1n2/6B1/3NP3/2N5/PPP2PPP/R2QKB1R",
  "r3kb1r/1b3ppp/p2ppn2/qpn1P1B1/3N4/1BN5/PPPQ1PPP/2KRR3",
  "rnbqkb1r/1p3ppp/p2ppn2/6B1/3NP3/2N5/PPP2PPP/R2QKB1R",
  "rnbqkb1r/1p3ppp/p2ppn2/6B1/3NPP2/2N5/PPP3PP/R2QKB1R",
  "r1bqkb1r/1p3ppp/p1nppn2/6B1/3NPP2/2N5/PPP3PP/R2QKB1R",
  "rnbqkb1r/5ppp/p2ppn2/1p4B1/3NPP2/2N5/PPP3PP/R2QKB1R",
  "rnb1kb1r/2q2ppp/p3pn2/1p2P1B1/3N4/2N5/PPP1Q1PP/R3KB1R",
  "rnb1kb1r/1p3ppp/p2ppn2/6B1/3NPP2/q1N5/P1PQ2PP/1R2KB1R",
  "rnb1kb1r/1p3ppp/pq1ppn2/6B1/3NPP2/2N5/PPP3PP/R2QKB1R",
  "rnbqk2r/1p2bppp/p2ppn2/6B1/3NPP2/2N5/PPP3PP/R2QKB1R",
  "rnb1k2r/1pq1bpp1/p2ppn1p/8/3NPP1B/2N2Q2/PPP3PP/R3KB1R",
  "rnbqk2r/1p2bp2/p2ppn1p/6p1/3NPP1B/2N2Q2/PPP3PP/R3KB1R",
  "rnb1k2r/1pq1bppp/p2ppn2/6B1/3NPP2/2N2Q2/PPP3PP/R3KB1R",
  "r1b1k2r/1pqnbppp/p2ppn2/6B1/3NPP2/2N2Q2/PPP3PP/2KR1B1R",
  "rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/4B3/PPP2PPP/RN1QKBNR",
  "rnbqkbnr/p1pp1ppp/4p3/1p6/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/4p3/8/1P2P3/8/P1PP1PPP/RNBQKBNR",
  "rnbqk1nr/pppp1ppp/4p3/4P3/1b6/8/P1PP1PPP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/4p3/1B6/4P3/8/PPPP1PPP/RNBQK1NR",
  "rnbqkbnr/ppp2ppp/4p3/4N3/3Pp3/8/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPPQPPP/RNB1KBNR",
  "rnbqkbnr/ppp2ppp/4p3/3p4/2PPP3/8/PP3PPP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/4p3/8/2PPp3/8/PP3PPP/RNBQKBNR",
  "rnbqkbnr/pppp2pp/4p3/5p2/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/pppp2pp/4p3/5P2/3P4/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/pp1p1ppp/4p3/2p5/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/8/3p4/3PPp2/8/PPP1Q1PP/RNB1KBNR",
  "rnbqkbnr/pppp1ppp/4p3/8/4P3/1P6/P1PP1PPP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/4p3/3p4/4P3/1P6/PBPP1PPP/RN1QKBNR",
  "rnbqkbnr/pppp1ppp/4p3/8/4P3/3P4/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/pppp2pp/4p3/5p2/4P3/3P4/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/4p3/8/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/pppp2pp/4p3/5p2/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/pppp1ppp/4p3/8/4PP2/8/PPPP2PP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/4p3/8/4pP2/5N2/PPPP2PP/RNBQKB1R",
  "rnbqkb1r/pppp1ppp/4pn2/8/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/7N/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/pppp1ppp/4p3/8/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/8/3p4/4P3/1Q6/PP1P1PPP/RNB1KBNR",
  "rnbqkbnr/ppp2ppp/4p3/3p4/4PP2/2N5/PPPP2PP/R1BQKBNR",
  "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/pppp1ppp/4p3/8/4P3/2N5/PPPP1PPP/R1BQKBNR",
  "r1bqkb1r/ppp2ppp/2n1pn2/3p4/4P3/3P1N2/PPPNBPPP/R1BQK2R",
  "rnbqkbnr/pppp1ppp/4p3/8/4P3/6P1/PPPP1P1P/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/3B4/PPP2PPP/RNBQK1NR",
  "rnbqkbnr/1ppp1ppp/p3p3/8/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/2pp1ppp/p3p3/1p6/2PPP3/8/PP3PPP/RNBQKBNR",
  "rnbqkbnr/2pp1ppp/4p3/1p6/3PP3/8/PP3PPP/RNBQKBNR",
  "rnbqkbnr/1ppp1ppp/p3p3/8/2PPP3/8/PP3PPP/RNBQKBNR",
  "rn1qkb1r/1b1p1ppp/p3pn2/1pp5/3PP3/2PB1N2/PP3PPP/RNBQ1RK1",
  "rnbqkbnr/pppp1ppp/4p3/8/2P1P3/8/PP1P1PPP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/4p3/4P3/8/8/PPPP1PPP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/4p3/3p4/4P3/2N2N2/PPPP1PPP/R1BQKB1R",
  "rnbqkbnr/pp3ppp/4p3/2ppP3/1P6/5N2/P1PP1PPP/RNBQKB1R",
  "rnbqkbnr/ppp2ppp/3pp3/8/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/4p3/3P4/3P4/8/PPP2PPP/RNBQKBNR",
  "r1bqkb1r/ppp2ppp/2n2n2/3p2B1/3P4/2N5/PPP2PPP/R2QKBNR",
  "rnbqkbnr/ppp2ppp/8/3p4/2PP4/8/PP3PPP/RNBQKBNR",
  "rnbqkb1r/ppp2ppp/5n2/3p2B1/3P4/2N5/PPP2PPP/R2QKBNR",
  "rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/pp3ppp/4p3/2ppP3/3P4/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/pp3ppp/4p3/2ppP3/3P4/2P5/PP3PPP/RNBQKBNR",
  "r1bqkbnr/pp3ppp/2n1p3/2ppP3/3P4/2P5/PP3PPP/RNBQKBNR",
  "r2qkbnr/pp1b1ppp/2n1p3/2ppP3/3P4/2P2N2/PP3PPP/RNBQKB1R",
  "rn1qkbnr/pppb1ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/pp3ppp/4p3/2ppP3/1P1P4/8/P1P2PPP/RNBQKBNR",
  "r1b1kb1r/pp3ppp/1qn1p2n/2ppP3/3P4/P1P2N2/1P3PPP/RNBQKB1R",
  "r1b1kbnr/pp3ppp/1qn1p3/2ppP3/3P4/P1P2N2/1P3PPP/RNBQKB1R",
  "r1b1kbnr/pp3ppp/1qn1p3/2ppP3/3P4/2PB1N2/PP3PPP/RNBQK2R",
  "rnbqkbnr/pp3ppp/4p3/2ppP3/3P2Q1/8/PPP2PPP/RNB1KBNR",
  "rnbqkbnr/pp3ppp/4p3/3pP3/3p2Q1/5N2/PPP2PPP/RNB1KB1R",
  "rnbqkbnr/pp3ppp/4p3/2ppP3/3P4/5N2/PPP2PPP/RNBQKB1R",
  "r1bqkbnr/pp3ppp/2n1p3/2ppP3/3P4/2P2N2/PP3PPP/RNBQKB1R",
  "rnbqkbnr/pp3ppp/4p3/3pP3/3p4/3B1N2/PPP2PPP/RNBQK2R",
  "rnbqkbnr/pp3ppp/4p3/2PpP3/8/8/PPP2PPP/RNBQKBNR",
  "rn2kbnr/pp1b1ppp/1q2p3/2ppP3/3P4/2P2N2/PP3PPP/RNBQKB1R",
  "r1bqkbnr/ppp2ppp/2n5/4p3/3PN3/2P5/PP3PPP/R1BQKBNR",
  "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPPN1PPP/R1BQKBNR",
  "r1bqkbnr/ppp2ppp/2n1p3/3p4/3PP3/8/PPPN1PPP/R1BQKBNR",
  "rnbqkbnr/ppp3pp/4p3/3p1p2/3PP3/8/PPPN1PPP/R1BQKBNR",
  "rnbqkbnr/1pp2ppp/p3p3/3p4/3PP3/8/PPPN1PPP/R1BQKBNR",
  "rnbqk1nr/ppp1bppp/4p3/3p4/3PP3/8/PPPN1PPP/R1BQKBNR",
  "r1bqkb1r/ppp2ppp/2n1pn2/3p4/3PP3/5N2/PPPN1PPP/R1BQKB1R",
  "rnbqkb1r/p2n1ppp/1p2p3/2ppP3/3P4/2PB4/PP1N1PPP/R1BQK1NR",
  "rnbqkb1r/ppp2ppp/4pn2/3p4/3PP3/8/PPPN1PPP/R1BQKBNR",
  "r1bqkb1r/pp1n1ppp/2n1p3/2ppP3/3P4/2PB4/PP1N1PPP/R1BQK1NR",
  "rnbqkb1r/pppn1ppp/4p3/3pP3/3P1P2/8/PPPN2PP/R1BQKBNR",
  "r1bqkb1r/pp1n1ppp/2n1p3/3pP3/3P4/3B4/PP1NNPPP/R1BQK2R",
  "r1bqkb1r/pp3ppp/1nn1p3/3pP3/3P4/3B4/PP1NNPPP/R1BQK2R",
  "rnb1kbnr/pp3ppp/4p3/2pq4/3P4/8/PPPN1PPP/R1BQKBNR",
  "r1b1kb1r/1p3ppp/p2qpn2/8/2BN4/8/PPP2PPP/R1BQ1RK1",
  "rnbqkbnr/pp3ppp/4p3/8/2Bp4/5N2/PPPN1PPP/R1BQK2R",
  "rnbqkbnr/pp3ppp/4p3/2pp4/3PP3/8/PPPN1PPP/R1BQKBNR",
  "rnbqkbnr/pp3ppp/4p3/2pp4/3PP3/5N2/PPPN1PPP/R1BQKB1R",
  "rnbqkb1r/pp3ppp/4pn2/2pP4/3P4/8/PPPN1PPP/R1BQKBNR",
  "rnbqkbnr/pp3ppp/4p3/2pp4/3PP3/2P5/PP1N1PPP/R1BQKBNR",
  "rnbqkbnr/pp3ppp/8/2pp4/3P4/8/PPPN1PPP/R1BQKBNR",
  "rnbqkbnr/pp3ppp/8/3p4/2pP4/5N2/PPPN1PPP/R1BQKB1R",
  "r1bqkbnr/pp3ppp/2n5/2pp4/3P4/5N2/PPPN1PPP/R1BQKB1R",
  "r1bqkbnr/ppp2ppp/2n1p3/3P4/3P4/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkbnr/ppp2ppp/4p3/8/3Pp3/2N5/PPP2PPP/R1BQKBNR",
  "r1bqkbnr/pppn1ppp/4p3/8/3PN3/8/PPP2PPP/R1BQKBNR",
  "r1bqkb1r/ppp2ppp/4pn2/4N3/3P4/8/PPP2PPP/R1BQKB1R",
  "rnbqkbnr/ppp2ppp/8/4p3/3PN3/8/PPP2PPP/R1BQKBNR",
  "rn1qkbnr/ppp2ppp/2b1p3/8/3PN3/5N2/PPP2PPP/R1BQKB1R",
  "r1bqkb1r/ppp2ppp/4pn2/8/3P4/2P2N2/PP3PPP/R1BQKB1R",
  "rnb1kbnr/ppp2ppp/4p3/3q4/3PN3/8/PPP2PPP/R1BQKBNR",
  "rnbqkbnr/pp3ppp/4p3/2pp4/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkb1r/ppp2ppp/4pn2/3p2B1/3PP3/2N5/PPP2PPP/R2QKBNR",
  "rnbqkb1r/ppp2ppp/4pn2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "rnbq1rk1/ppp2ppp/4pb2/8/3PN3/5N2/PPP2PPP/R2QKB1R",
  "rnbqk2r/ppp1bp1p/4pp2/8/3PN3/8/PPP2PPP/R2QKBNR",
  "rnbqkb1r/ppp2ppp/4pn2/3P4/3P4/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkb1r/ppp2ppp/4pn2/3pP3/3P4/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkb1r/ppp2ppp/4pn2/3p4/3PP3/2NB4/PPP2PPP/R1BQK1NR",
  "rnbqkb1r/ppp2ppp/4pn2/3p4/3PP3/2N1B3/PPP2PPP/R2QKBNR",
  "r1bqkb1r/pp1n1ppp/2n1p3/2PpP3/5P2/2N5/PPP3PP/R1BQKBNR",
  "rnbqkb1r/pp1n1ppp/4p3/2ppP3/3P1P2/2N2N2/PPP3PP/R1BQKB1R",
  "r1bqkb1r/pp1n1ppp/2n1p3/2ppP3/3P1P2/2N1BN2/PPP3PP/R2QKB1R",
  "rnbqk2r/pp1n1ppp/4p3/2bpP3/5PQ1/2N5/PPP3PP/R1B1KBNR",
  "r1bq1rk1/pp1n2pp/2n1pp2/2bpP3/5PQ1/P1N2N2/1PP3PP/R1B1KB1R",
  "rnbqkb1r/pppn1ppp/4p3/3pP3/3P2Q1/2N5/PPP2PPP/R1B1KBNR",
  "rnbqk2r/ppp2ppp/4pn2/3p2B1/1b1PP3/2N5/PPP2PPP/R2QKBNR",
  "rnbqk2r/ppp2ppp/4pn2/3pP1B1/1b1P4/2N5/PPP2PPP/R2QKBNR",
  "rnbqk2r/ppp2pp1/4pn1p/3pP3/1b1P3B/2N5/PPP2PPP/R2QKBNR",
  "rnb1k2r/ppp2p1p/4pp2/q7/1b1P4/2N5/PPPQ1PPP/R3KBNR",
  "rnbqk2r/ppp2pp1/4pP1p/3p2B1/1b1P4/2N5/PPP2PPP/R2QKBNR",
  "rnbqk2r/ppp2pp1/4pn1p/3pP3/1b1P4/2N5/PPP2PPP/R1BQKBNR",
  "rnbq1k1r/ppp2pp1/4p2p/3pP3/3Pn1Q1/2P5/P1P2PPP/R1B1KBNR",
  "rnbqk2r/ppp2ppp/4pn2/3P2B1/1b1P4/2N5/PPP2PPP/R2QKBNR",
  "rnbqk1r1/ppp2pP1/4p3/3p4/1b1P2Qp/2N5/PPP2PP1/R3KBNR",
  "rnbqk2r/ppp2pp1/4pn1p/3pP3/1b1P4/2N1B3/PPP2PPP/R2QKBNR",
  "rnbqk2r/ppp2pp1/4pn1p/3pP3/3P4/2b5/PPPB1PPP/R2QKBNR",
  "rnbqk2r/ppp2p2/4p1pp/3pP3/3Pn1Q1/2P5/P1PB1PPP/R3KBNR",
  "rnbqk2r/pppn1pp1/4p2p/3pP3/1b1P4/2N5/PPPB1PPP/R2QKBNR",
  "rnbqk2r/pppnbppp/4p3/3pP1B1/3P3P/2N5/PPP2PP1/R2QKBNR",
  "rnb1k2r/pppn1ppp/4p3/3pP1q1/3P4/2N5/PPP2PP1/R2QKBNR",
  "rnbqk2r/pp1nbppp/4p3/2ppP1B1/3P3P/2N5/PPP2PP1/R2QKBNR",
  "rnbqk2r/1ppnbppp/p3p3/3pP1B1/3P3P/2N5/PPP2PP1/R2QKBNR",
  "rnbq1rk1/pppnbppp/4p3/3pP1B1/3P3P/2N5/PPP2PP1/R2QKBNR",
  "rnbqk2r/pppnb1pp/4pp2/3pP1B1/3P3P/2N5/PPP2PP1/R2QKBNR",
  "rnbqk1nr/p1p1bppp/1p2p3/3pP3/3P4/2N1B3/PPP2PPP/R2QKBNR",
  "rnbqk2r/ppp1bppp/4pn2/3p2B1/3PP3/2N5/PPP2PPP/R2QKBNR",
  "rnbqk2r/ppp1bppp/4pB2/3p4/3PP3/2N5/PPP2PPP/R2QKBNR",
  "rnbqk2r/ppp1bppp/4p3/3pP3/3P2Q1/2N5/PPP2PPP/R3KBNR",
  "rnbqk2r/ppp1bppp/4p3/3pP1B1/3Pn3/2N5/PPP2PPP/R2QKBNR",
  "rnbqk1nr/ppp1bppp/4p3/3pP1B1/3P4/2N5/PPP2PPP/R2QKBNR",
  "rnb1k2r/pppnqppp/4p3/3pP3/3P4/2N5/PPP2PPP/R2QKBNR",
  "rnb1k2r/pppnqppp/4p3/1N1pP3/3P4/8/PPP2PPP/R2QKBNR",
  "rnb1k2r/pppnqppp/4p3/3pP3/3P2Q1/2N5/PPP2PPP/R3KBNR",
  "rnb1k2r/pppnqppp/4p3/3pP3/3P4/2N5/PPPQ1PPP/R3KBNR",
  "r1b2rk1/pp1nqppp/2n1p3/3pP3/2pP1P2/2N2N2/PPPQ2PP/2KR1B1R",
  "rnb1k2r/pppnqppp/4p3/3pP3/3P1P2/2N5/PPP3PP/R2QKBNR",
  "rnb1k2r/pppnqppp/4p3/3pP3/3P4/2NB4/PPP2PPP/R2QK1NR",
  "rnbqk2r/ppp2ppp/4pn2/3p2B1/1b1PP3/2N5/PPP1NPPP/R2QKB1R",
  "rnbqk1nr/ppp2ppp/4p3/3p4/1b1PP3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqk1nr/ppp2ppp/4p3/8/3Pp3/P1b5/1PP1NPPP/R1BQKB1R",
  "r1bq1rk1/ppp1bppp/2n1pn2/8/3PN3/P5N1/1PP1BPPP/R1BQK2R",
  "r1bqk1nr/ppp2ppp/2n1p3/8/3Pp3/P1N5/1PP2PPP/R1BQKB1R",
  "rnbqk1nr/ppp2ppp/4p3/3p4/1b1PP3/2N5/PPP1NPPP/R1BQKB1R",
  "rnbqk1nr/ppp2ppp/4p3/3P4/1b1P4/2N5/PPP2PPP/R1BQKBNR",
  "rnbqk2r/ppp1nppp/8/3p3Q/1b1P4/2NB4/PPP2PPP/R1B1K1NR",
  "rnbqk1nr/ppp2ppp/4p3/3p4/1b1PP3/2N5/PPPB1PPP/R2QKBNR",
  "rnb1k1nr/ppp2ppp/4p3/8/1b1qp1Q1/2N5/PPPB1PPP/R3KBNR",
  "rnbqk1r1/ppp2p1p/4pn1Q/8/1b1Pp3/2N5/PPPB1PPP/R3KBNR",
  "rnbqk2r/ppp1nppp/4p3/3p4/1b1PP3/8/PPPB1PPP/RN1QKBNR",
  "rnb1k1nr/pp3ppp/4p3/2pq4/1b1P4/2NB4/PPPB1PPP/R2QK1NR",
  "rnbqk1nr/ppp2ppp/4p3/3p4/1b1PP3/P1N5/1PP2PPP/R1BQKBNR",
  "rnbqk1nr/ppp2ppp/4p3/3pP3/1b1P4/2N5/PPP2PPP/R1BQKBNR",
  "rnb1k1nr/pppq1ppp/4p3/3pP3/1b1P4/2N5/PPP2PPP/R1BQKBNR",
  "rnbqk1nr/pp3ppp/4p3/2ppP3/1b1P4/2N5/PPP2PPP/R1BQKBNR",
  "rnbqk1nr/pp3ppp/4p3/2ppP3/1b1P4/P1N5/1PP2PPP/R1BQKBNR",
  "rnbqk1nr/pp3ppp/4p3/3pP3/1P6/2p2N2/1PP2PPP/R1BQKB1R",
  "rnbqk1nr/pp3ppp/4p3/2ppP3/1b1P2Q1/2N5/PPP2PPP/R1B1KBNR",
  "rnbqk1nr/pp3ppp/4p3/2ppP3/1b1P4/2N5/PPPB1PPP/R2QKBNR",
  "rnbqk2r/pp2nppp/4p3/2ppP3/1b1P1P2/2N5/PPPB2PP/R2QKBNR",
  "rnbqk1nr/pp3ppp/4p3/3pP3/1P6/2p5/1PP2PPP/R1BQKBNR",
  "rnbqk1nr/pp3ppp/4p3/b1ppP3/3P4/P1N5/1PP2PPP/R1BQKBNR",
  "rnbqk1nr/pp3ppp/4p3/b2pP3/1P1p4/P1N5/2P2PPP/R1BQKBNR",
  "rnbqk1nr/pp3ppp/4p3/2ppP3/3P4/P1P5/2P2PPP/R1BQKBNR",
  "rnb1k1nr/ppq2ppp/4p3/2ppP3/3P4/P1P5/2P2PPP/R1BQKBNR",
  "rnb1k1nr/pp3ppp/4p3/q1ppP3/3P4/P1P5/2P2PPP/R1BQKBNR",
  "rnbqk2r/pp2nppp/4p3/2ppP3/3P4/P1P5/2P2PPP/R1BQKBNR",
  "rnbqk2r/pp2nppp/4p3/2ppP3/P2P4/2P5/2P2PPP/R1BQKBNR",
  "rnbqk2r/pp2nppp/4p3/2ppP3/3P2Q1/P1P5/2P2PPP/R1B1KBNR",
  "rnb1k1r1/ppq1np1Q/4p3/3pP3/3p4/P1P5/2P1NPPP/R1B1KB1R",
  "rnb1k1r1/ppq1np1Q/4p3/3pP3/3p4/P1P5/2P2PPP/R1BK1BNR",
  "rnbqk2r/pp2nppp/4p3/2ppP3/3P4/P1P2N2/2P2PPP/R1BQKB1R",
  "rnbqkb1r/pppp1ppp/5n2/4p3/2B1P3/5P2/PPPP2PP/RNBQK1NR",
  "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPPKPPP/RNBQ1BNR",
  "rnbqkbnr/pppp1ppp/8/4p3/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/2P1P3/8/PP1P1PPP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPPNPPP/RNBQKB1R",
  "rnbqkbnr/ppp2ppp/8/3pp3/2P1P3/8/PP1P1PPP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/8/3pp3/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/pppp2pp/8/4pp2/4P3/3P4/PPP2PPP/RNBQKBNR",
  "rnbqk2r/pppp1ppp/5n2/2b1p3/4PP2/3P4/PPP3PP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/4P3/5P2/PPPP2PP/RNBQKBNR",
  "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/2N2P2/PPPP2PP/R1BQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/4P3/3P4/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/4P3/2P5/PP1P1PPP/RNBQKBNR",
  "rnbqkbnr/pppp2pp/8/4pp2/4P3/2P5/PP1P1PPP/RNBQKBNR",
  "rnbqk1nr/ppp2ppp/3b4/3pp2Q/4P3/2P5/PP1P1PPP/RNB1KBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/4P3/P7/1PPP1PPP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/4P3/5Q2/PPPP1PPP/RNB1KBNR",
  "rn1qkbnr/pppb1ppp/3p4/4P3/4P3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/4P3/3B4/PPPP1PPP/RNBQK1NR",
  "rnbqkbnr/pppp1ppp/8/4p2Q/4P3/8/PPPP1PPP/RNB1KBNR",
  "rnbqkb1r/pppp1ppp/5n2/4p2Q/4P3/8/PPPP1PPP/RNB1KBNR",
  "r1bqkb1r/ppp4p/2n2ppn/3pp3/2B1P3/3P1Q2/PPP1NPPP/RNB1K2R",
  "r1bqkbnr/pp3ppp/2n5/4p3/8/3P4/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/4P3/1P6/P1PP1PPP/RNBQKBNR",
  "rnbqkb1r/pppp1ppp/5n2/4pQ2/4P3/8/PPPP1PPP/RNB1KBNR",
  "r1bqk2r/pppp1ppp/5n2/2b5/3nP3/5N2/PP2QPPP/RNB1KB1R",
  "rnbqkbnr/pppp1ppp/8/1B2p3/4P3/8/PPPP1PPP/RNBQK1NR",
  "rnbqk1nr/pppp1ppp/8/1Bb1p3/1P2P3/8/P1PP1PPP/RNBQK1NR",
  "rnbqkb1r/pppp1ppp/5n2/1B2p3/3PP3/8/PPP2PPP/RNBQK1NR",
  "rnbqkbnr/pppp1ppp/8/8/3QP3/8/PPP2PPP/RNB1KBNR",
  "rnbqkbnr/pppp1ppp/8/8/3pP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/8/3pPP2/8/PPP3PP/RNBQKBNR",
  "r1bqk1nr/pppp1ppp/2n5/2b5/3pPP2/2P2N2/PP4PP/RNBQKB1R",
  "rnbqkbnr/pppp1ppp/8/8/3pP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/pp1p1ppp/8/2p5/3pP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/pp1p1ppp/8/2p5/2BpP3/5N2/PPP2PPP/RNBQK2R",
  "rnbqkbnr/p2p1ppp/8/1pp5/2BpP3/5N2/PPP2PPP/RNBQK2R",
  "rnbqk1nr/pppp1ppp/8/2b5/3pP3/2P2N2/PP3PPP/RNBQKB1R",
  "rnbqk1nr/pppp1ppp/8/2b5/2B1P3/2p2N2/PP3PPP/RNBQK2R",
  "rnbqkbnr/pppp1ppp/8/8/3pP3/3B4/PPP2PPP/RNBQK1NR",
  "rnbqkbnr/pppp1ppp/8/8/2BpP3/8/PPP2PPP/RNBQK1NR",
  "rnbqkbnr/pppp1ppp/8/8/3pP3/2P5/PP3PPP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/8/2B1P3/8/PB3PPP/RN1QK1NR",
  "rnb1kbnr/ppppqppp/8/8/2B1P3/8/PB3PPP/RN1QK1NR",
  "rnbqkb1r/pppp1ppp/5n2/8/2B1P3/8/PB3PPP/RN1QK1NR",
  "rnbqk1nr/pppp1ppp/8/8/1bB1P3/8/PB3PPP/RN1QK1NR",
  "rnbqkbnr/ppp2ppp/8/3p4/2B1P3/8/PB3PPP/RN1QK1NR",
  "rnbqkb1r/ppppnppp/8/8/3pP3/2P5/PP3PPP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/8/3p4/3pP3/2P5/PP3PPP/RNBQKBNR",
  "r1bqkb1r/pppp1ppp/2n2n2/8/4P3/4Q3/PPP2PPP/RNB1KBNR",
  "r1bqk1nr/ppppbppp/2n5/8/4P3/2P1Q3/PP3PPP/RNB1KBNR",
  "r1bqkbnr/pppp1ppp/2n5/8/2Q1P3/8/PPP2PPP/RNB1KBNR",
  "r1bqr1k1/ppp2ppp/2np1n2/8/1bB1P3/2N1Q2N/PPPB1PPP/2KR3R",
  "r1bqkbnr/pppp1ppp/2n5/8/3QP3/8/PPP2PPP/RNB1KBNR",
  "r1bqkbnr/pppp1ppp/2n5/8/4P3/4Q3/PPP2PPP/RNB1KBNR",
  "r1bqkbnr/pppp2pp/2n5/5p2/4P3/4Q3/PPP2PPP/RNB1KBNR",
  "rnbqkbnr/pppp1ppp/8/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR",
  "rnbqkbnr/p2p1ppp/2p5/1B2p3/4P3/8/PPPP1PPP/RNBQK1NR",
  "rnbqk1nr/pppp1ppp/8/2b1p3/2B1P3/8/PPPP1PPP/RNBQK1NR",
  "rnbqkbnr/pppp2pp/8/4pp2/2B1P3/8/PPPP1PPP/RNBQK1NR",
  "rnbqkbnr/pppp2pp/8/4pp2/2B1P3/3P4/PPP2PPP/RNBQK1NR",
  "rnbqk1nr/pppp1ppp/8/8/2BPP2b/5N2/P1P4p/RNBQ1R1K",
  "rnbqkbnr/ppp2ppp/8/3pp3/2B1P3/8/PPPP1PPP/RNBQK1NR",
  "rnbqk1nr/ppp2ppp/8/2bpp3/2B1P3/2P5/PP1P1PPP/RNBQK1NR",
  "rnbqk2r/ppp2ppp/5n2/2bBp3/4P3/2P5/PP1P1PPP/RNBQK1NR",
  "rnbqk2r/ppp2ppp/5n2/2bBp3/3PP3/2P5/PP3PPP/RNBQK1NR",
  "rnbqk1nr/pppp1ppp/8/2b1p3/2BPP3/8/PPP2PPP/RNBQK1NR",
  "r2qkbnr/pp3ppp/8/3pn3/8/8/PPP1NPPP/RNBQK2R",
  "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1PP2/2P5/PP1PQ1PP/RNB1K1NR",
  "rnbqk1nr/pppp1ppp/8/2b1p3/2B1P3/8/PPPPQPPP/RNB1K1NR",
  "rnbqk2r/pppp1ppp/5n2/2b1p3/2B1PP2/8/PPPPQ1PP/RNB1K1NR",
  "rnbqk1nr/pppp1ppp/8/2b1p3/1PB1P3/8/P1PP1PPP/RNBQK1NR",
  "rnbqk1nr/pppp1ppp/8/4p3/1bB1P3/2P5/P2P1PPP/RNBQK1NR",
  "rnbqk1nr/pppp1ppp/8/4p3/1bB1PP2/8/P1PP2PP/RNBQK1NR",
  "rnbqkbnr/pp1p1ppp/2p5/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR",
  "rnbqk1nr/pppp1ppp/8/2b1p3/2B1P3/2P5/PP1P1PPP/RNBQK1NR",
  "rnbq1rk1/ppp2ppp/5P2/2b4Q/2pp4/2P5/PP3PPP/RNB1K1NR",
  "rnbqk1nr/pppp1ppp/8/2b1p3/2B1PP2/8/PPPP2PP/RNBQK1NR",
  "rnbqkbnr/p1pp2pp/8/1B2pp2/4P3/8/PPPP1PPP/RNBQK1NR",
  "rnb1k1nr/pppp1ppp/8/2b1p1q1/2B1P3/2P5/PP1P1PPP/RNBQK1NR",
  "rnbqkb1r/pppp1ppp/5n2/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR",
  "rnbqkb1r/pppp1ppp/5n2/4p3/2B1PP2/8/PPPP2PP/RNBQK1NR",
  "rnbq1rk1/ppppbppp/5n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R",
  "r1bqk2r/pppp1ppp/2n2n2/2b1p3/1PB1P3/5P2/P1PPN1PP/RNBQK2R",
  "rnbqkb1r/pppp1ppp/8/4p3/2B1n3/2N5/PPPP1PPP/RNBQK2R",
  "rnbqkb1r/pppp1ppp/5n2/4p3/2BPP3/8/PPP2PPP/RNBQK1NR",
  "rnb1k2r/ppp1qppp/5n2/3P4/1bBp4/2P2N2/PP3PPP/RNBQK2R",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2NP4/PPP2PPP/R1BQK1NR",
  "rnbqkb1r/pppp1ppp/5n2/8/2BpP3/2P5/PP3PPP/RNBQK1NR",
  "r1bqkbnr/pppp1ppp/2n5/4p3/4PP2/2N5/PPPP2PP/R1BQKBNR",
  "r1bqk1nr/ppppbppp/2n5/8/4Pp2/2N2N2/PPPP2PP/R1BQKB1R",
  "r1bqkbnr/pppp1p1p/2n5/6N1/4PppP/2N5/PPPP2P1/R1BQKB1R",
  "r1bqkbnr/ppp2p1p/2np4/6N1/4PppP/2N5/PPPP2P1/R1BQKB1R",
  "r1bq1bnr/pppp1k2/2n4p/8/3PPppP/2N5/PPP3P1/R1BQKB1R",
  "r1bqkbnr/pppp1p1p/2n5/8/2B1Pp2/2N2p2/PPPP2PP/R1BQ1RK1",
  "r1bqkbnr/pppp1ppp/2n5/8/4Pp2/2N2N2/PPPP2PP/R1BQKB1R",
  "r1bqkbnr/pppp1p1p/2n5/6p1/3PPp2/2N2N2/PPP3PP/R1BQKB1R",
  "r1bqk1nr/ppp2ppp/2np4/2b1P3/4P3/2N5/PPPP2PP/R1BQKBNR",
  "r1bqkbnr/pppp1ppp/2n5/8/3PPp2/2N5/PPP3PP/R1BQKBNR",
  "r1b1kbnr/p1pp1ppp/1pn5/8/3PPp1q/2N5/PPP1K1PP/R1BQ1BNR",
  "r1b1kbnr/pppp1ppp/2n5/8/3PPp1q/2N5/PPP1K1PP/R1BQ1BNR",
  "r1b1kbnr/ppp2ppp/2np4/8/3PPp1q/2N5/PPP1K1PP/R1BQ1BNR",
  "r1b1kbnr/pppp1p1p/2n5/6p1/3PPp1q/2N5/PPP1K1PP/R1BQ1BNR",
  "r1b1kbnr/ppp2ppp/2n5/3p4/3PPp1q/2N5/PPP1K1PP/R1BQ1BNR",
  "rnbqkbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR",
  "rnbqk1nr/pppp1ppp/8/2b1p3/4P3/2N5/PPPP1PPP/R1BQKBNR",
  "r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqk1nr/pppp1ppp/8/2b1p3/4P1Q1/2N5/PPPP1PPP/R1B1KBNR",
  "rnbqk1nr/pppp1ppp/8/2b1p3/N3P3/8/PPPP1PPP/R1BQKBNR",
  "r1bqkbnr/pppp1p1p/2n5/8/2B1Ppp1/2N2N2/PPPP2PP/R1BQ1RK1",
  "r1b1kbnr/pppp1p1p/5q2/4n3/2B1PQ2/2N5/PPPP2PP/R1B2RK1",
  "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR",
  "rnbqkbnr/ppp2ppp/3p4/4p3/4PP2/2N5/PPPP2PP/R1BQKBNR",
  "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/2N3P1/PPPP1P1P/R1BQKBNR",
  "r1bqk2r/ppp2ppp/2n2n2/2bpp3/4P3/2N3P1/PPPPNPBP/R1BQK2R",
  "r1bqk1nr/pppp1pp1/2n5/2b1p3/4P2p/2N2NP1/PPPP1PBP/R1BQK2R",
  "r1bqkbnr/pppp2pp/2n5/4pp2/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "r2qkbnr/ppp2p1p/2P5/8/2BP1pb1/2N2p2/PPP3PP/R1BQ1RK1",
  "r1b1k1nr/pppp1ppp/2n2q2/2bNp3/2B1P1Q1/8/PPPP1PPP/R1B1K1NR",
  "rnbqk2r/pppp1ppp/5n2/4p3/1b2P1Q1/2N5/PPPP1PPP/R1B1KBNR",
  "rnbqkb1r/p1pp1ppp/5n2/1p2p3/2B1P3/2N5/PPPP1PPP/R1BQK1NR",
  "rnbqk2r/pppp1ppp/5n2/2b1p3/2B1P3/2NP4/PPP2PPP/R1BQK1NR",
  "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR",
  "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/P1N5/1PPP1PPP/R1BQKBNR",
  "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/2N3P1/PPPP1P1P/R1BQKBNR",
  "rnbqkb1r/pp3ppp/2p2n2/3Pp3/8/2N3P1/PPPP1P1P/R1BQKBNR",
  "r1bqk2r/ppp2ppp/2n2n2/2bPp3/8/2N3P1/PPPPNPBP/R1BQK2R",
  "rnbqkb1r/pppp1ppp/5n2/4p3/2B1P3/2N5/PPPP1PPP/R1BQK1NR",
  "rnbqk2r/p1pp1ppp/5n2/1pb1p3/2B1P3/2N5/PPPPNPPP/R1BQK2R",
  "rnbqk2r/pppp1ppp/5n2/4p3/1bB1P3/2N5/PPPP1PPP/R1BQK1NR",
  "rnbqkb1r/pppp1ppp/8/4p3/2B1n3/2N2N2/PPPP1PPP/R1BQK2R",
  "rnbqkb1r/ppp2ppp/8/3pp3/2B1n3/2N2N2/PPPP1PPP/R1BQK2R",
  "r1bqkb1r/pppp1ppp/2nn4/4p2Q/3P4/1BN5/PPP2PPP/R1B1K1NR",
  "rnbqkb1r/pppp1ppp/8/4p3/2B1n3/2N5/PPPP1PPP/R1BQK1NR",
  "r1bqk2r/ppppbppp/2nn4/4N2Q/8/1BN5/PPPP1PPP/R1B1K2R",
  "N1bk1b1r/p2pq2p/1pnn2p1/3Qpp2/8/1B6/PPPP1PPP/R1B1K1NR",
  "rnbqk2r/ppppbppp/3n4/4p2Q/8/1BN5/PPPP1PPP/R1B1K1NR",
  "r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2NP4/PPP1NPPP/R1BQK2R",
  "r1bqkb1r/pppp1ppp/2n5/4p3/2B1nP2/2N2N2/PPPP2PP/R1BQK2R",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N5/PPPP1PPP/R1BQK1NR",
  "rnbqkb1r/ppp3pp/8/3pPp2/3Pn3/2N2Q2/PPP3PP/R1B1KBNR",
  "rnbqkb1r/pppp1ppp/5n2/4p3/4PP2/2N5/PPPP2PP/R1BQKBNR",
  "rnbqkb1r/ppp3pp/8/3pPp2/4n3/2N2Q2/PPPP2PP/R1B1KBNR",
  "rnbqk2r/ppp1bppp/8/3pP3/4n3/2N2N2/PPPP2PP/R1BQKB1R",
  "rn1qkb1r/ppp2ppp/8/3pP3/4n1b1/2N2N2/PPPPQ1PP/R1B1KB1R",
  "rnbqkb1r/ppp2ppp/5n2/3pp3/4PP2/2N5/PPPP2PP/R1BQKBNR",
  "rnbqkb1r/ppp2ppp/8/3pP3/4n3/2NP4/PPP3PP/R1BQKBNR",
  "rnbqkb1r/ppp2ppp/8/3pP3/4n3/2N2Q2/PPPP2PP/R1B1KBNR",
  "rnbqkb1r/ppp2ppp/5n2/3pp3/4PP2/2NP4/PPP3PP/R1BQKBNR",
  "rnb1kb1r/ppp2ppp/8/3NP2q/8/3P1Nn1/PPP4P/R1BQKB1R",
  "rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR",
  "rnbqk1nr/pppp1ppp/8/2b1p3/4PP2/8/PPPP2PP/RNBQKBNR",
  "rnbqk1nr/ppp2ppp/3p4/2b1p3/4PP2/2P2N2/PP1P2PP/RNBQKB1R",
  "rn1qk1nr/ppp2ppp/8/2b1p3/Q3P1b1/2P2N2/PP1P2PP/RNB1KB1R",
  "rnbqk1nr/ppp2ppp/3p4/2b1p3/1P2PP2/5N2/P1PP2PP/RNBQKB1R",
  "rnbqk1nr/ppp3pp/3p4/2b1pp2/4PP2/2P2N2/PP1P2PP/RNBQKB1R",
  "r1bqk1nr/pppn1ppp/3p4/2b1p3/4PP2/2N2N2/PPPP2PP/R1BQKB1R",
  "rnbqk1nr/ppp3pp/8/2b2p2/2BpP3/2P2N2/PP4PP/RNBQK2R",
  "rnbqk1nr/ppp2ppp/3p4/2b1P3/4P3/5N2/PPPP2PP/RNBQKB1R",
  "r2qk2r/ppp2ppp/2np1n2/2b5/2B1Pp2/2NP1Q1P/PPP3P1/R1B1K2R",
  "r1bqkbnr/pppp1p2/2n4p/4p1P1/4P3/5N2/PPPP2PP/RNBQKB1R",
  "rnb1kbnr/ppppqppp/8/4p3/4PP2/6P1/PPPP3P/RNBQKBNR",
  "rnb1kbnr/pppp1ppp/8/4p3/4PP1q/8/PPPP2PP/RNBQKBNR",
  "rnb1kbnr/pppp1ppp/8/4p3/4PP1q/6P1/PPPP3P/RNBQKBNR",
  "rnbqkbnr/pp1p1ppp/8/2p1p3/4PP2/8/PPPP2PP/RNBQKBNR",
  "r1bqkbnr/pppp2pp/2n5/4pp2/4PP2/5N2/PPPP2PP/RNBQKB1R",
  "rnb1kbnr/pppp1ppp/5q2/4p3/4PP2/8/PPPP2PP/RNBQKBNR",
  "rnb1k1nr/pppp1ppp/8/4p3/1bB1Pq2/2N2N2/PPPP2PP/R1BQK2R",
  "rnb1kbnr/pppp1ppp/8/4p3/3PPq2/2N5/PPP3PP/R1BQKBNR",
  "rnbqkbnr/pppp2pp/8/4pp2/4PP2/8/PPPP2PP/RNBQKBNR",
  "rnb1kbnr/pppp2pp/8/4pP2/5P1q/8/PPPP2PP/RNBQKBNR",
  "rnb1kbnr/ppppq2p/6P1/7Q/5p2/8/PPPP2PP/RNBK1BNR",
  "rnbqk1nr/pppp2pp/8/2b1pP2/5P2/8/PPPP2PP/RNBQKBNR",
  "rnbq1bnr/ppppk1pp/8/5P1Q/5p2/8/PPPP2PP/RNB1KBNR",
  "rnbqk1nr/ppp3pp/3b4/3p1P2/3P1p2/3B1N2/PPP3PP/RNBQK2R",
  "rnbqkb1r/pppp1ppp/5n2/4p3/4PP2/8/PPPP2PP/RNBQKBNR",
  "r1bqkbnr/pppp1ppp/2n5/4p3/4PP2/8/PPPP2PP/RNBQKBNR",
  "rnbqk1nr/pppp1p1p/8/2b1p1p1/4PP2/5N2/PPPP2PP/RNBQKB1R",
  "r1bqkbnr/pppp2pp/2n2p2/4P3/4P3/8/PPPP2PP/RNBQKBNR",
  "rnbqkbnr/pppp1p1p/8/4p1p1/4PP2/8/PPPP2PP/RNBQKBNR",
  "r1bqkbnr/pppp1p1p/2n5/4p1p1/4PP2/5N2/PPPP2PP/RNBQKB1R",
  "rnbqkbnr/ppp2ppp/8/3pp3/4PP2/8/PPPP2PP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/8/3Pp3/5P2/8/PPPP2PP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/8/1B1P4/4pP2/8/PPPP2PP/RNBQK1NR",
  "rnbqkbnr/ppp2ppp/8/3pp3/4PP2/5N2/PPPP2PP/RNBQKB1R",
  "rnbqkbnr/ppp2ppp/8/3P4/4pP2/3P4/PPP3PP/RNBQKBNR",
  "rnbqk2r/ppp2ppp/5n2/3P4/1b3P2/2NPp3/PPPB2PP/R2QKBNR",
  "rnbqkbnr/ppp2ppp/8/3pp3/3PPP2/8/PPP3PP/RNBQKBNR",
  "rnbqk1nr/ppp2ppp/8/2bPp3/5P2/8/PPPP2PP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/8/3pp3/4PP2/2N5/PPPP2PP/R1BQKBNR",
  "rnbqkbnr/ppp2ppp/8/3P4/5p2/8/PPPP2PP/RNBQKBNR",
  "rnbqkbnr/pp3ppp/2p5/3Pp3/5P2/8/PPPP2PP/RNBQKBNR",
  "rnbqk1nr/pp3ppp/2P5/2b1p3/5P2/8/PPPP2PP/RNBQKBNR",
  "rnbqkb1r/ppp2ppp/5n2/3P4/4pP2/2N5/PPPPQ1PP/R1B1KBNR",
  "rnbqkbnr/ppp2ppp/8/3P4/4pP2/8/PPPP2PP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/8/4p3/4NP2/8/PPPP2PP/R1BQKBNR",
  "rnb1k2r/ppp2ppp/8/3q4/4nP2/8/PPPNQbPP/RNBK1B1R",
  "rnbqkb1r/ppp2ppp/8/3P4/4nP2/8/PPP1Q1PP/RNB1KBNR",
  "rnbqkb1r/ppp2ppp/5n2/3P4/4PP2/8/PPP3PP/RNBQKBNR",
  "rnbqkb1r/ppp2ppp/5n2/3P4/4pP2/3P4/PPPN2PP/R1BQKBNR",
  "rn1qk2r/ppp2ppp/8/2bP1b2/4nP2/5N2/PPP1Q1PP/RNB1KB1R",
  "rnbqkb1r/ppp2ppp/5n2/3P4/4pP2/3P4/PPP1Q1PP/RNB1KBNR",
  "rnb1kb1r/ppp3pp/8/3q1p2/4nPP1/8/PPPNQ2P/R1B1KBNR",
  "rn1q1rk1/ppp2ppp/8/2bP1b2/4nPP1/5N2/PPP1Q2P/RNB1KB1R",
  "rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPP2PP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPPQ1PP/RNB1KBNR",
  "rnbqkbnr/pppp1ppp/8/8/2B1Pp2/8/PPPP2PP/RNBQK1NR",
  "rnbqkbnr/pppp1p1p/8/6p1/2B1Pp2/8/PPPP2PP/RNBQK1NR",
  "rnbqkbnr/pp3ppp/2p5/3B4/4Pp2/8/PPPP2PP/RNBQK1NR",
  "rnbqkb1r/ppp2ppp/5n2/3B4/4Pp2/8/PPPP2PP/RNBQK1NR",
  "rnbqkbnr/ppp2ppp/8/3p4/2B1Pp2/8/PPPP2PP/RNBQK1NR",
  "r1b1kbnr/pppp1ppp/2n5/8/2B1Pp1q/8/PPPP2PP/RNBQ1KNR",
  "rnbqkb1r/pp1p1ppp/2p2n2/8/2B1Pp2/2N5/PPPP2PP/R1BQK1NR",
  "rnbqkb1r/pppp1ppp/5n2/8/2B1Pp2/2N5/PPPP2PP/R1BQK1NR",
  "rnb1k1nr/ppp2ppp/3b4/3B4/4Pp1q/8/PPPP2PP/RNBQ1KNR",
  "rnb1kbnr/p1pp1ppp/8/1p6/2B1Pp1q/8/PPPP2PP/RNBQ1KNR",
  "rnb1kbnr/ppp2p1p/8/3B2p1/4Pp1q/6P1/PPPP3P/RNBQ1KNR",
  "rnb1k2r/ppppnpbp/8/6p1/2BPPp1q/2N5/PPP3PP/R1BQ1KNR",
  "rnb1kbnr/pppp1p1p/8/6p1/2B1Pp1q/5Q2/PPPP2PP/RNB2KNR",
  "rnbqkb1r/pppp1ppp/5n2/8/2B1Pp2/8/PPPP2PP/RNBQK1NR",
  "rnb1kbnr/ppp2ppp/3p4/8/2B1Pp1q/8/PPPP2PP/RNBQ1KNR",
  "rnb1kb1r/pppp1ppp/5n2/8/2B1Pp1q/8/PPPP2PP/RNBQ1KNR",
  "rnb1k1nr/pppp1pbp/8/6p1/2B1P2q/2N2Qp1/PPPP3P/R1B2KNR",
  "rnbqkbnr/pppp2pp/8/5p2/2B1Pp2/8/PPPP2PP/RNBQK1NR",
  "rnb1k1nr/pppp1ppp/8/2b5/2B1Pp1q/8/PPPP2PP/RNBQ1KNR",
  "rnb1k1nr/ppp2pbp/3p4/4P1p1/2BP1p1q/2N5/PPP3PP/R1BQ1KNR",
  "rnbqkbnr/p1pp1ppp/8/1p6/2B1Pp2/8/PPPP2PP/RNBQK1NR",
  "rnbqkbnr/pp1p1ppp/2p5/8/2B1Pp2/8/PPPP2PP/RNBQK1NR",
  "rnb1kbnr/pppp1p1p/8/6p1/2B1Pp1q/8/PPPP2PP/RNBQ1KNR",
  "r1bqkbnr/pppp1ppp/2n5/8/2B1Pp2/8/PPPP2PP/RNBQK1NR",
  "rnb1k2r/ppppnpbp/8/6p1/2BPPp1q/2N3P1/PPP4P/R1BQ1KNR",
  "rnb1k1nr/pppp1pbp/8/6p1/2B1Pp1q/2N3P1/PPPP3P/R1BQ1KNR",
  "rnbqk2r/pppp1ppp/5n2/4P3/1bB2p2/2N5/PPPP2PP/R1BQK1NR",
  "rnbqkb1r/ppppnppp/8/8/2B1Pp2/8/PPPP2PP/RNBQK1NR",
  "rnbqkbnr/pppp1ppp/8/8/4Pp2/5Q2/PPPP2PP/RNB1KBNR",
  "rnbqkbnr/pppp1ppp/8/7Q/4Pp2/8/PPPP2PP/RNB1KBNR",
  "rnbqkbnr/pppp1ppp/8/8/4PpQ1/8/PPPP2PP/RNB1KBNR",
  "rnbqkbnr/pppp1ppp/8/8/4Pp2/7N/PPPP2PP/RNBQKB1R",
  "rnbqkbnr/pppp1ppp/8/8/4Pp2/6P1/PPPP3P/RNBQKBNR",
  "rnbk1bnr/pppp2pp/8/8/2B1pp1q/2N5/PPPPQ1PP/R1BK2NR",
  "rnbqkbnr/pppp1ppp/8/8/4Pp2/2N5/PPPP2PP/R1BQKBNR",
  "rnbqkbnr/pppp1ppp/8/8/4Pp2/1P6/P1PP2PP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPPN1PP/RNBQKB1R",
  "rnbqkbnr/pppp1ppp/8/8/3PPp2/8/PPP3PP/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/1B6/4Pp2/8/PPPP2PP/RNBQK1NR",
  "rnbqkbnr/pppp1ppp/8/8/4Pp2/3B4/PPPP2PP/RNBQK1NR",
  "rnbqkbnr/pppp1ppp/8/8/4Pp1P/8/PPPP2P1/RNBQKBNR",
  "rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPPB1PP/RNBQK1NR",
  "rnbqkbnr/ppp3pp/3p4/5P2/5p2/8/PPPPB1PP/RNBQK1NR",
  "rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPP1KPP/RNBQ1BNR",
  "rnbqkbnr/pppp1pp1/7p/8/4Pp2/5N2/PPPP2PP/RNBQKB1R",
  "rnbqkb1r/ppppnppp/8/8/4Pp2/5N2/PPPP2PP/RNBQKB1R",
  "rnbqkbnr/ppp2ppp/3p4/8/4Pp2/5N2/PPPP2PP/RNBQKB1R",
  "rnbqkbnr/ppp2ppp/3p4/8/1P2Pp2/5N2/P1PP2PP/RNBQKB1R",
  "rnbqkb1r/ppp2ppp/3p1n2/8/3PPp2/3B1N2/PPP3PP/RNBQK2R",
  "rnbqkbnr/pppp2pp/8/5p2/4Pp2/5N2/PPPP2PP/RNBQKB1R",
  "rnbqk1nr/ppp2pb1/3p3p/6p1/2BPPp1P/5N2/PPP3P1/RNBQK2R",
  "rnbqkbnr/pppp1p1p/8/6p1/4Pp2/5N2/PPPP2PP/RNBQKB1R",
  "rnbqkbnr/pppp1ppp/8/8/4Pp2/5N2/PPPP2PP/RNBQKB1R",
  "r1bqkbnr/pppp1ppp/2n5/8/4Pp2/5N2/PPPP2PP/RNBQKB1R",
  "rnbqkb1r/pppp1ppp/5n2/8/4Pp2/5N2/PPPP2PP/RNBQKB1R",
  "rnbqkb1r/pppp1ppp/8/4P2n/5pP1/5N2/PPPP3P/RNBQKB1R",
  "rnbqkbnr/pppp1pp1/8/7p/4Pp2/5N2/PPPP2PP/RNBQKB1R",
  "rnbqk1nr/ppppbppp/8/8/4Pp2/5N2/PPPP2PP/RNBQKB1R",
  "rnbqk1nr/pppp1ppp/8/8/2B1Pp1b/5NP1/PPPP3P/RNBQK2R",
  "rnbqk1nr/pppp1ppp/8/8/2B1P2b/5N2/PPPP3p/RNBQ1R1K",
  "rnbqk2r/ppppbppp/5n2/8/2B1Pp2/5N2/PPPP2PP/RNBQK2R",
  "rnbqkb1r/ppp2ppp/5n2/3P4/5p2/5N2/PPPP2PP/RNBQKB1R",
  "rnbqkb1r/p4ppp/2p5/3n4/2B2p2/5N2/PPPP2PP/RNBQK2R",
  "rnbqkbnr/ppp2ppp/8/3p4/4Pp2/5N2/PPPP2PP/RNBQKB1R",
  "rnbqkbnr/ppp2ppp/8/3P4/5p2/5N2/PPPP2PP/RNBQKB1R",
  "rnbqkbnr/pppp1p1p/8/8/2B1PppP/5N2/PPPP2P1/RNBQK2R",
  "r1bqkbnr/pppp1p1p/2n5/6p1/2B1Pp2/5N2/PPPP2PP/RNBQK2R",
  "rnb1kbnr/pppp1B1p/8/4q3/5p2/5Q2/PPPP2PP/RNB2RK1",
  "rnb1kbnr/pppp1p1p/8/3N4/2q1Pp2/5Q2/PPPP2PP/R1B2R1K",
  "rnb1kbnr/pppp1p1p/5q2/8/2B1Pp2/2N2Q2/PPPP2PP/R1B2RK1",
  "r1b1k2r/ppppnp1p/2n4b/4q3/2B2p2/2NP1Q2/PPPB2PP/4RRK1",
  "rnb2bnr/pppp1k1p/5q2/8/4P3/2N1pQ2/PPP3PP/R4RK1",
  "rnbqkbnr/pppp1p1p/8/8/2BPPpp1/5N2/PPP3PP/RNBQK2R",
  "rnbqkbnr/pppp1p1p/8/8/2BPPp2/5Q2/PPP3PP/RNB1K2R",
  "rnbqkbnr/pppp1p1p/8/6p1/2B1Pp2/5N2/PPPP2PP/RNBQK2R",
  "rnbqkbnr/pppp1p1p/8/8/2BPPB2/5p2/PPP3PP/RN1QK2R",
  "rnbqkbnr/pppp1B1p/8/8/4Ppp1/5N2/PPPP2PP/RNBQK2R",
  "rnb2bnr/pppp1k1p/5q2/8/4Pp2/2N1BQ2/PPP3PP/R4RK1",
  "rnbqkbnr/pppp1p1p/8/8/2B1Ppp1/2N2N2/PPPP2PP/R1BQK2R",
  "rn1qkbnr/ppp2p2/3p4/6p1/2B1Ppp1/5N2/PPPP2P1/RNBQ1RK1",
  "rnb1kbnr/ppppqp1p/8/8/2B1Pp2/5Q2/PPPP2PP/RNB2RK1",
  "rnbqkbnr/ppp2p1p/8/3p4/2B1Ppp1/5N2/PPPP2PP/RNBQ1RK1",
  "r1bqkbnr/pppp1p1p/2n5/8/2B1Pp2/5Q2/PPPP2PP/RNB2RK1",
  "rnb1kbnr/ppppqp1p/8/8/2B1Ppp1/5N2/PPPP2PP/RNBQ1RK1",
  "rnb1kbnr/pppp1p1p/5q2/8/2B1Pp2/5Q2/PPPP2PP/RNB2RK1",
  "rnbqkbnr/pppp1p1p/8/8/2B1Ppp1/5N2/PPPP2PP/RNBQ1RK1",
  "rnbqkbnr/pppp1p1p/8/6p1/4Pp2/2N2N2/PPPP2PP/R1BQKB1R",
  "rnbqkbnr/pppp1p1p/8/6p1/3PPp2/5N2/PPP3PP/RNBQKB1R",
  "rnb1kbnr/pppp1p1p/8/4N3/3PPppq/6P1/PPP4P/RNBQKB1R",
  "rnbqkbnr/pppp1p1p/8/8/3PPpp1/2N2N2/PPP3PP/R1BQKB1R",
  "rnbqkbnr/pppp1p1p/8/8/3PPBp1/5N2/PPP3PP/RN1QKB1R",
  "rnbqkbnr/pppp1p1p/8/4N3/2B1Ppp1/8/PPPP2PP/RNBQK2R",
  "rnb1kb1r/ppp2p1p/3p3n/4N3/2BPPppq/8/PPP3PP/RNBQ1K1R",
  "rnb1kbnr/pppp1p1p/8/4N3/2B1P1pq/5p2/PPPP2PP/RNBQ1K1R",
  "rnb1kb1r/pppp1p1p/5n2/4N3/2B1Pppq/8/PPPP2PP/RNBQ1K1R",
  "rnb1kb1r/pppp1p1p/7n/4N3/2B1Pppq/8/PPPP2PP/RNBQ1K1R",
  "r1b1kbnr/pppp1p1p/2n5/4N3/2B1Pppq/8/PPPP2PP/RNBQ1K1R",
  "rnb1kb1r/pppp1p1p/7n/4N3/2BPP1pq/5p2/PPP3PP/RNBQ1K1R",
  "rnbqkbnr/pppp1p1p/8/4N3/3PPpp1/8/PPP3PP/RNBQKB1R",
  "rnbqk1nb/pp3p2/2pp4/4N1p1/2BPPp2/2N5/PPP3P1/R1BQK3",
  "rnbqk1nr/pppp1pbp/8/6p1/2B1Pp2/5N2/PPPP2PP/RNBQ1RK1",
  "rnbqk1nr/ppp2pbp/3p4/6p1/2BPPp2/2P2N2/PP4PP/RNBQK2R",
  "rnbqk1nr/pppp1pbp/8/6p1/2B1Pp1P/5N2/PPPP2P1/RNBQK2R",
  "rnbqk1nr/ppp2pb1/3p3p/6p1/2BPPp1P/3Q1N2/PPP3P1/RNB1K2R",
  "rnbqk1nr/pppp1pbp/8/6p1/2B1Pp2/5N2/PPPP2PP/RNBQK2R",
  "rnbqkbnr/pppp1p1p/8/6N1/4PppP/8/PPPP2P1/RNBQKB1R",
  "rnbq1bnr/pppp1k2/7p/8/3PPppP/8/PPP3P1/RNBQKB1R",
  "rnbq1bnr/pppp1k2/7p/8/2B1PppP/8/PPPP2P1/RNBQK2R",
  "rnbq1bnr/pppp1k2/7p/8/4PppP/2N5/PPPP2P1/R1BQKB1R",
  "rnbq1bnr/ppp3k1/7p/4B3/2BPp1pP/8/PPP3P1/RN1QK2R",
  "rnbq3r/pppp1k2/3b1n1p/8/4PQ1P/8/PPPP2P1/RNB1KB1R",
  "rnbqkb1r/pppp1p1p/5n2/6N1/4PppP/8/PPPP2P1/RNBQKB1R",
  "rnbq1bnr/ppp3k1/7p/3B4/3PPppP/8/PPP3P1/RNBQK2R",
  "rnbqkbnr/pppp1p1p/8/4N3/4PppP/8/PPPP2P1/RNBQKB1R",
  "rnbqk2r/ppp2p1p/3b1n2/3PN3/2B2ppP/8/PPPP2P1/RNBQK2R",
  "rnbqk2r/ppp2p1p/3b4/3PN3/2BP1npP/8/PPP3P1/RN1QK2R",
  "rnbqkb1r/pppp1p1p/5n2/4N3/4PppP/8/PPPP2P1/RNBQKB1R",
  "rnbqkb1r/pppp1p1p/5n2/4N3/3PPppP/8/PPP3P1/RNBQKB1R",
  "rnbqkb1r/ppp2p1p/5n2/3p4/4PpNP/8/PPPP2P1/RNBQKB1R",
  "rnbqkbnr/ppp2p1p/8/3pN3/4PppP/8/PPPP2P1/RNBQKB1R",
  "rnbqkb1r/ppp2p1p/5n2/3pN3/3PPBpP/8/PPP3P1/RN1QKB1R",
  "rnbqkb1r/ppp2p1p/8/3pN3/3PnBpP/8/PPPN2P1/R2QKB1R",
  "rnbqkbnr/pppp1N2/7p/8/4PppP/8/PPPP2P1/RNBQKB1R",
  "rnbqkbnr/ppp2p1p/3p4/4N3/4PppP/8/PPPP2P1/RNBQKB1R",
  "rnbqkbnr/pppp1p2/8/4N2p/4PppP/8/PPPP2P1/RNBQKB1R",
  "r1bqkbnr/pppp1p1p/2n5/4N3/4PppP/8/PPPP2P1/RNBQKB1R",
  "rnbqk1nr/pppp1pbp/8/4N3/4PppP/8/PPPP2P1/RNBQKB1R",
  "rnbqk2r/ppp2pbp/5n2/3PN3/2B2ppP/8/PPPP2P1/RNBQK2R",
  "rnbqk2r/ppp2p1p/5n2/3Pb3/2B2ppP/8/PPPP2P1/RNBQ1RK1",
  "rnb1kbnr/ppppqp1p/8/4N3/4PppP/8/PPPP2P1/RNBQKB1R",
  "rnbqk1n1/pppp1p1r/7b/4N2p/2BPPppP/2N5/PPP3P1/R1BQK2R",
  "rnbqk1nr/ppppbp1p/8/4N3/4PppP/8/PPPP2P1/RNBQKB1R",
  "rnbqk2r/ppp2p1p/3b1n2/3PN3/2B2ppP/8/PPPP2P1/RNBQ1RK1",
  "rnb1kbnr/ppppq2p/8/4Np2/2BPPppP/8/PPP3P1/RNBQK2R",
  "rnbqkbnr/pppp1p1p/8/6p1/4Pp1P/5N2/PPPP2P1/RNBQKB1R",
  "rnbqkbnr/ppp2ppp/8/3pp3/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqk1nr/ppp2ppp/3b4/3Pp3/8/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/ppp2ppp/8/3P4/4p3/5N2/PPPP1PPP/RNBQKB1R",
  "rnb1kbnr/ppp2ppp/8/4N1q1/2B1p3/8/PPPP1PPP/RNBQK2R",
  "rnb1kbnr/ppppqppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqk1nr/pppp1ppp/8/2b1p3/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "r1bqk1nr/pppp1ppp/2n5/2b1N3/4P3/8/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/pppp2pp/5p2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnb1kbnQ/ppppq2p/6p1/8/4P3/8/PPPP1PPP/RNB1KB1R",
  "rnb1kbnr/ppp1q1pp/5p2/3p4/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnb1kbnr/ppppq1pp/8/4pp2/2B1P3/5N2/PPPP1PPP/RNBQK2R",
  "rnbqkbnr/pp1p1ppp/2p5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnb1kbnr/pppp1ppp/6q1/4p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1",
  "rnb1kbnr/pppp1ppp/5q2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/pppp2pp/8/4pp2/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/pppp2pp/8/4pP2/8/5N2/PPPP1PPP/RNBQKB1R",
  "rnb1kbnr/ppp3pp/3p1q2/5p2/2NPP3/8/PPP2PPP/RNBQKB1R",
  "rnb1kbnr/ppp3pp/3p1q2/8/2NPp3/8/PPP1BPPP/RNBQK2R",
  "rnb1kbnr/ppp4p/3p1qp1/8/2NPp3/8/PPP1QPPP/RNB1KB1R",
  "rnb1kbnr/pppp2pp/5q2/8/2N1p3/3P4/PPP2PPP/RNBQKB1R",
  "rnb1kbnr/pppp2pp/5q2/5p2/2N1P3/8/PPPP1PPP/RNBQKB1R",
  "rnb1kbnr/pppp2pp/5q2/8/2N1p3/2N5/PPPP1PPP/R1BQKB1R",
  "rnb1kbnr/pppp2pp/5q2/4Np2/3PP3/8/PPP2PPP/RNBQKB1R",
  "rnb1kbnr/ppp3pp/3p1q2/8/3Pp3/4N3/PPP2PPP/RNBQKB1R",
  "rnb1kb1N/ppp3pp/5n2/3p4/2B1p3/8/PPPP1PqP/RNBQKR2",
  "rnbqkb1r/pppp2pp/5n2/4N3/2B1p3/8/PPPP1PPP/RNBQK2R",
  "rnb1kb1N/ppp1q1pp/5n2/3p4/2B1p3/8/PPPP1PPP/RNBQK2R",
  "rnbqkbnr/pppp2pp/8/4pp2/2P1P3/5N2/PP1P1PPP/RNBQKB1R",
  "r1bqkbnr/pppp2pp/2n5/4Np2/4P3/8/PPPP1PPP/RNBQKB1R",
  "rnb1kbnr/ppppq1pp/8/4Np2/4P3/8/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/pppp2pp/8/4pp2/4P1P1/5N2/PPPP1P1P/RNBQKB1R",
  "rnbqkbnr/pppp2pp/8/4pp2/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/pppp2pp/8/4pp2/2B1P3/5N2/PPPP1PPP/RNBQK2R",
  "rnbqkb1r/pppp2pp/5n2/4pp2/2B1P3/5N2/PPPP1PPP/RNBQK2R",
  "rnb1kbnr/pppp2pp/8/4N3/2BPp3/8/PPP2PqP/RNBQK2R",
  "rnbqkbnr/ppp3pp/8/3pN3/2B1p3/8/PPPP1PPP/RNBQK2R",
  "rnbqkbnr/p1pp2pp/8/1p2pp2/2B1P3/5N2/PPPP1PPP/RNBQK2R",
  "rnbqkbnr/pppp2pp/8/4pp2/4P3/2N2N2/PPPP1PPP/R1BQKB1R",
  "rnbqkbnr/pppp2pp/8/4pp2/1P2P3/5N2/P1PP1PPP/RNBQKB1R",
  "rnbqkbnr/ppp2ppp/3p4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkbnr/ppp2ppp/3p4/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/ppp2ppp/3p4/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R",
  "rnbqk1nr/ppp1bppp/3p4/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R",
  "r2qkbnr/pppn1ppp/3p4/4P3/4P1b1/5N2/PPP2PPP/RNBQKB1R",
  "r2q1rk1/pp2bppp/2npbn2/2p3B1/4P3/2N2N2/PPP1BPPP/R2QR1K1",
  "rnbqkbnr/ppp2ppp/3p4/8/3pP3/2P2N2/PP3PPP/RNBQKB1R",
  "rn1qkbnr/pppb1ppp/3p4/8/3QP3/5N2/PPP2PPP/RNB1KB1R",
  "rnbqkbnr/ppp2ppp/3p4/8/3pP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/ppp2ppp/3p4/8/3NP3/8/PPP2PPP/RNBQKB1R",
  "rnbqkb1r/ppp2ppp/3p1n2/8/3NP3/8/PPP2PPP/RNBQKB1R",
  "r1bqkbnr/pppn1ppp/3p4/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "r1bqkbnr/pp1n1ppp/2pp4/4p3/2BPP3/2P2N2/PP3PPP/RNBQK2R",
  "r1bqkbnr/pp1n1ppp/2pp4/4p3/2BPP3/5N2/PPP2PPP/RNBQ1RK1",
  "r1bqkbnr/pp1n1ppp/2pp4/4p3/2BPP3/2N2N2/PPP2PPP/R1BQK2R",
  "r1bqkbnr/ppp2ppp/1n1p4/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R",
  "r1bqk1nr/pp1nbppp/2pp4/4P3/2B1P3/5N2/PPP2PPP/RNBQ1RK1",
  "r1bqkbnr/pp1n1ppp/2pp4/4p1N1/2BPP3/8/PPP2PPP/RNBQK2R",
  "rnbqkbnr/ppp2p1p/3p2p1/8/3NP3/8/PPP2PPP/RNBQKB1R",
  "r1bqkb1r/pppn1ppp/3p1n2/4p3/3PP3/2N2N2/PPP2PPP/R1BQKB1R",
  "r1bqk2r/pppnbBpp/3p1n2/4p3/3PP3/2N2N2/PPP2PPP/R1BQK2R",
  "r1bqk2r/pppnbBpp/5n2/4p3/4P3/2N2N2/PPP2PPP/R1BQK2R",
  "r1bq2k1/pppnbrpp/3pNn2/4p3/3PP3/2N5/PPP2PPP/R1BQK2R",
  "r1bqk2r/pppnbpp1/3p1n1p/4p3/2BPP3/2N2N2/PPP2PPP/R1BQ1RK1",
  "r1bqk2r/pp1nbppp/2pp1n2/4p3/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1",
  "r1bqkb1r/pppn1ppp/3p1n2/4p3/3PP1P1/2N2N2/PPP2P1P/R1BQKB1R",
  "r1bq1rk1/pp1nbppp/2pp1n2/8/P1BpP3/2N2N2/1PP1QPPP/R1B2RK1",
  "rnbqkbnr/ppp3pp/3p4/4pp2/2B1P3/5N2/PPPP1PPP/RNBQK2R",
  "rnbqkb1r/ppp3pN/3p3n/5p2/2BpP3/8/PPP2PPP/RNBQK2R",
  "rnbqkbnr/ppp2ppp/3p4/8/2BpP3/5N2/PPP2PPP/RNBQK2R",
  "rnbqkb1r/ppp2ppp/3p1n2/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkb1r/ppp2ppp/3p1n2/4P3/4P3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkb1r/ppp2ppp/3p1n2/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R",
  "rnbqkb1r/ppp2ppp/3p4/3QP3/4n3/5N2/PPP2PPP/RNB1KB1R",
  "rnbqkb1r/ppp2ppp/3p4/4P3/4n3/5N2/PPPN1PPP/R1BQKB1R",
  "r1bq1rk1/pppnbBpp/3p1n2/4p1N1/3PP3/2N5/PPP2PPP/R1BQK2R",
  "rnbqkb1r/ppp2ppp/3p1n2/4p1N1/3PP3/8/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/ppp2ppp/8/3P4/3N4/8/PPP2PPP/RNBQKB1R",
  "rnbqkbnr/ppp3pp/3p4/4pp2/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqk1nr/ppp3pp/4P3/2bp2N1/4p3/2N5/PPP2PPP/R1BQKB1R",
  "rnbqkbnr/ppp3pp/3p4/4pp2/3PP3/2N2N2/PPP2PPP/R1BQKB1R",
  "rnbqkbnr/ppp3pp/4P3/3p2N1/4p3/8/PPP2PPP/RNBQKB1R",
  "rn1qkbnr/pppb1ppp/3p4/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqk1nr/ppp1bppp/3p4/4p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R",
  "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkb1r/pppp1ppp/5n2/4N3/4P3/8/PPPP1PPP/RNBQKB1R",
  "rnbqkb1r/ppp2ppp/3p1n2/4N3/4P3/8/PPPP1PPP/RNBQKB1R",
  "rnbqkb1r/ppp2ppp/3p1n2/8/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkb1r/ppp2ppp/3p4/8/4n3/5N2/PPPP1PPP/RNBQKB1R",
  "rnbqkb1r/ppp2ppp/3p4/8/3Pn3/5N2/PPP2PPP/RNBQKB1R",
  "r2qk2r/ppp1b1pp/2n5/3p1p2/3Pn1b1/2PB1N2/PP1N1PPP/R1BQR1K1",
  "r1bqk2r/ppp1bppp/2n5/3p4/3Pn3/3B1N2/PPP2PPP/RNBQR1K1",
  "r1bqk2r/ppp1bppp/8/3P4/1n1Pn3/3B1N2/PP3PPP/RNBQ1RK1",
  "r1bqk2r/ppp1bppp/8/3p4/1nPPn3/5N2/PP2BPPP/RNBQ1RK1",
  "rnbqkb1r/ppp2ppp/3p1n2/8/3P4/5N2/PPP2PPP/RNBQKB1R",
  "r1bqk2r/ppp1bppp/2n5/3p4/2PPn3/3B1N2/PP3PPP/RNBQ1RK1",
  "r2qk2r/ppp1b1pp/2n5/3p1p2/2PPn1b1/3B1N2/PP3PPP/RNBQR1K1",
  "rn1q1rk1/ppp3pp/8/3P1p2/3Pn1b1/3B1N2/PP3PPb/RNBQR1K1",
  "rnbqk2r/ppp2ppp/3b4/3p4/3Pn3/3B1N2/PPP2PPP/RNBQK2R",
  "rn1q1rk1/pp3ppp/2pb4/3p4/2PPn1b1/3B1N2/PP3PPP/RNBQR1K1",
  "r2qk2r/ppp3pp/2n5/3p1p2/2PPn1bb/3B1N2/PP3PPP/RNBQR1K1",
  "rnbq1rk1/ppp1bppp/8/3p4/3Pn3/3B1N2/PPP2PPP/RNBQ1RK1",
  "r1bqkb1r/ppp2ppp/2n5/3p4/3Pn3/3B1N2/PPP2PPP/RNBQK2R",
  "rnbq1rk1/pp3ppp/2pb4/3p4/2PPn3/3B1N2/PP3PPP/RNBQ1RK1",
  "rn1q1rk1/ppp2ppp/3b4/3p4/2PPn1b1/3B1N2/PP3PPP/RNBQ1RK1",
  "rnbqkb1r/ppp2Npp/3p1n2/8/4P3/8/PPPP1PPP/RNBQKB1R",
  "rnbq1b1r/ppp2kpp/3p1n2/8/2B1P3/8/PPPP1PPP/RNBQK2R",
  "rnbq1b1r/ppp2kpp/3p1n2/8/3PP3/8/PPP2PPP/RNBQKB1R",
  "rnbqkb1r/ppp2ppp/3p4/8/4n3/5N2/PPPPQPPP/RNB1KB1R",
  "rnbqkb1r/pppp1ppp/8/4N3/4n3/8/PPPP1PPP/RNBQKB1R",
  "rnb1kb1r/ppppqppp/8/4N3/4n3/8/PPPPQPPP/RNB1KB1R",
  "rnbqkb1r/ppp2ppp/3p4/8/4n3/3P1N2/PPP2PPP/RNBQKB1R",
  "rnbqkb1r/pppp1ppp/5n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R",
  "rnbqkb1r/ppp2ppp/3p1n2/8/4P3/3N4/PPPP1PPP/RNBQKB1R",
  "rnbqkb1r/ppp2ppp/3p4/8/2P1n3/5N2/PP1P1PPP/RNBQKB1R",
  "rnbqkb1r/ppp2ppp/3p4/8/4n3/3B1N2/PPPP1PPP/RNBQK2R",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/3PP3/5N2/PPP1QPPP/RNB1KB1R",
  "rnbqkb1r/ppp2ppp/3p4/8/4n3/2N2N2/PPPP1PPP/R1BQKB1R",
  "rnbqkb1r/ppp2ppp/3p1n2/8/2N1P3/8/PPPP1PPP/RNBQKB1R",
  "r1bqkb1r/pppp1ppp/2n2n2/4N3/4P3/8/PPPP1PPP/RNBQKB1R",
  "r1bqkb1r/ppp2ppp/2p2n2/8/4P3/8/PPPP1PPP/RNBQKB1R",
  "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R",
  "rnbqkb1r/pppp1ppp/5n2/8/2BpP3/5N2/PPP2PPP/RNBQK2R",
  "rnbqkb1r/pppp1ppp/8/8/2BQn3/5N2/PPP2PPP/RNB1K2R",
  "rnbqkb1r/pppp1ppp/5n2/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkb1r/pppp1ppp/5n2/8/3pP3/5N2/PPP2PPP/RNBQKB1R",
  "r1bqkb1r/pppp1ppp/2n5/2n1P3/3N4/8/PPP1QPPP/RNB1KB1R",
  "rnbqkb1r/pppp1ppp/8/4P3/3Qn3/5N2/PPP2PPP/RNB1KB1R",
  "rnbqkb1r/pppp1ppp/8/4p3/3Pn3/3B1N2/PPP2PPP/RNBQK2R",
  "r1bqkb1r/pppp1ppp/2n5/4p3/3Pn3/3B1N2/PPP2PPP/RNBQK2R",
  "rnbqkb1r/pppp1ppp/8/4P3/3pn3/5N2/PPP1QPPP/RNB1KB1R",
  "rnbqkb1r/ppp2ppp/5n2/3pp3/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "rnbqkb1r/pppp1ppp/8/1B2P3/3pn3/5N2/PPP2PPP/RNBQK2R",
  "rnbq1rk1/ppp2ppp/8/3pb3/2PPn3/3B4/PP3PPP/RNBQ1RK1",
  "r1bqkb1r/pppp1ppp/2n2n2/4N3/2P1P3/8/PP1P1PPP/RNBQKB1R",
  "r1bqkbnr/pppp1ppp/2n5/4N3/4P3/8/PPPP1PPP/RNBQKB1R",
  "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5NP1/PPPP1P1P/RNBQKB1R",
  "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R",
  "r1bqkbnr/pppp1ppp/2n5/4p3/2P1P3/5N2/PP1P1PPP/RNBQKB1R",
  "r1bqkbnr/pppp1ppp/2n5/4p3/1P2P3/5N2/P1PP1PPP/RNBQKB1R",
  "r1bqkbnr/pppp1ppp/8/4n3/3PP3/8/PPP2PPP/RNBQKB1R",
  "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPPBPPP/RNBQK2R",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/3PP3/5N2/PPP1BPPP/RNBQK2R",
  "r1bqkb1r/pppp1ppp/2n2n2/4P3/3p4/5N2/PPP1BPPP/RNBQK2R",
  "r1bqkb1r/ppp2ppp/2n2n2/3pp3/4P3/3P1N2/PPPNBPPP/R1BQK2R",
  "r1bqkbnr/pppp2pp/2n5/4pP2/8/3P1N2/PPP2PPP/RNBQKB1R",
  "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/2P2N2/PP1P1PPP/RNBQKB1R",
  "r2qkbnr/pppb1ppp/2n5/3pp3/Q3P3/2P2N2/PP1P1PPP/RNB1KB1R",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2P2N2/PP1P1PPP/RNBQKB1R",
  "r1bqkb1r/ppp2ppp/2n2n2/3pp3/Q3P3/2P2N2/PP1P1PPP/RNB1KB1R",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R",
  "r1bqkbnr/pppp2pp/2n5/4pp2/4P3/2P2N2/PP1P1PPP/RNBQKB1R",
  "r1bqkbnr/ppp3pp/2np4/3Ppp2/4P3/2P2N2/PP3PPP/RNBQKB1R",
  "r1bqk1nr/ppppbppp/2n5/4p3/4P3/2P2N2/PP1P1PPP/RNBQKB1R",
  "r1bqkb1r/ppppnppp/2n5/4p3/4P3/2P2N2/PP1P1PPP/RNBQKB1R",
  "r1bqkbnr/ppp2ppp/2n5/1B1pp3/4P3/2P2N2/PP1P1PPP/RNBQK2R",
  "r1b1kbnr/ppp2ppp/2n5/1B1qN3/Q3p3/2P5/PP1P1PPP/RNB1K2R",
  "r1bqkbnr/ppp3pp/2n2p2/3pp3/Q3P3/2P2N2/PP1P1PPP/RNB1KB1R",
  "r1bqk2r/pppp1ppp/2n5/2bPp3/4n3/2P2N2/PP3PPP/RNBQKB1R",
  "r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R",
  "r1bqkbnr/pppp1ppp/2n5/8/3pP3/5N2/PPP2PPP/RNBQKB1R",
  "r1bqk1nr/ppppbppp/2n5/8/2BpP3/5N2/PPP2PPP/RNBQK2R",
  "r1bqk1nr/pppp1ppp/2n5/b3P3/2B5/2P2N2/P4PPP/RNBQK2R",
  "r1bq3r/ppp2k1p/2n3p1/2Qp4/3pP3/8/PPP2PPP/RNB1K2R",
  "r1bqkbnr/pppp1ppp/2n5/8/3pP3/2P2N2/PP3PPP/RNBQKB1R",
  "r1bqk2r/pppp1ppp/2n2n2/8/1bB1P3/2N2N2/PP3PPP/R1BQK2R",
  "r1bqkbnr/pppp1ppp/2n5/8/2B1P3/2p2N2/PP3PPP/RNBQK2R",
  "r1bqk1nr/pppp1ppp/2n5/8/1b2P3/2N2N2/PP3PPP/R1BQKB1R",
  "r1bq1rk1/pppp1ppp/5n2/4n1N1/1bB5/8/PB3PPP/RN1Q1RK1",
  "r1bqk1nr/pppp1ppp/2n5/2b5/2BpP3/5N2/PPP2PPP/RNBQK2R",
  "r1bqkbnr/pppp1ppp/8/4p3/3nP3/5N2/PPP2PPP/RNBQKB1R",
  "r1bqkbnr/pppp1ppp/8/8/2BpP3/8/PPP2PPP/RNBQK2R",
  "r1bqkbnr/pppp1ppp/2n5/1B6/3pP3/5N2/PPP2PPP/RNBQK2R",
  "r1bqkbnr/pppp1ppp/2n5/8/2BpP3/5N2/PPP2PPP/RNBQK2R",
  "r1bqkb1r/pppp1ppp/2n2n2/4P3/2Bp4/5N2/PPP2PPP/RNBQK2R",
  "r2qk1nr/ppp2ppp/2np4/2b5/2BpP1b1/2P2N2/PP3PPP/RNBQ1RK1",
  "r1bqkb1r/pppp1ppp/2n2n2/8/2BpP3/5N2/PPP2PPP/RNBQK2R",
  "r1bqkbnr/ppp2ppp/2n5/3p4/3pP3/2P2N2/PP3PPP/RNBQKB1R",
  "r1bqkb1r/pppp1ppp/2n5/4P3/2Bp2n1/5N2/PPP2PPP/RNBQK2R",
  "r1bqk1nr/pppp1ppp/2n5/8/1bBpP3/5N2/PPP2PPP/RNBQK2R",
  "r1bqk1nr/pppp1ppp/2n5/2b3N1/2BpP3/8/PPP2PPP/RNBQK2R",
  "r2q1bnr/ppp1kBpp/3p4/3NN3/4P3/8/PP3PPP/R1Bb1RK1",
  "r1bqk2r/pppp1ppp/2n4n/2b3NQ/2BpP3/8/PPP2PPP/RNB1K2R",
  "r1bqkbnr/pppp1ppp/2n5/8/3NP3/8/PPP2PPP/RNBQKB1R",
  "r1b1k1nr/pppp1ppp/2n5/1N6/1b2P2q/8/PPPB1PPP/RN1QKB1R",
  "r1bqkb1r/pppp1ppp/2n2n2/4P3/3N4/8/PPP2PPP/RNBQKB1R",
  "r1b1k1nr/pppp1ppp/2n2q2/1Nb5/4P3/4B3/PPP2PPP/RN1QKB1R",
  "r1b1kbnr/pppp1ppp/2n5/8/3NP2q/4B3/PPP2PPP/RN1QKB1R",
  "r1bqk1nr/pppp1ppp/2n5/2b5/3NP3/8/PPP2PPP/RNBQKB1R",
  "r1b1k2r/ppppnppp/2n2q2/2b5/3NP3/2P1B3/PP1Q1PPP/RN2KB1R",
  "r1b1k1nr/pppp1ppp/2N2q2/2b5/4P3/8/PPP2PPP/RNBQKB1R",
  "r1b1k1nr/pppp1ppp/2n3q1/2b5/3NP3/2P1B3/PP3PPP/RN1QKB1R",
  "r1b1kbnr/pppp1ppp/2n5/8/4P2q/5N2/PPP2PPP/RNBQKB1R",
  "r1bqkbnr/ppp2ppp/3p4/8/3QP3/3B4/PPP2PPP/RNB1K2R",
  "1rb2rk1/pp3ppp/5q2/3P4/1n6/2P1Q3/PP3PPP/RN2KB1R",
  "r1b1kbnr/pppp1ppp/2n5/1N6/4P2q/8/PPP2PPP/RNBQKB1R",
  "r1bk2nr/pppp1ppp/2n5/1N6/4q3/8/PPPQBPPP/RN3RK1",
  "r1bqk1nr/pppp1ppp/2n5/8/1b1NP3/8/PPP2PPP/RNBQKB1R",
  "r1b1k2r/ppppnppp/2n2q2/2b5/4P3/2P1B3/PPN2PPP/RN1QKB1R",
  "r1bqkb1r/p1pp1ppp/2p2n2/4P3/8/8/PPP2PPP/RNBQKB1R",
  "r1b1k1nr/pppp1ppp/2n5/8/1b1NP2q/2N5/PPP2PPP/R1BQKB1R",
  "r1b1k2r/ppppnppp/2n2q2/1Bb5/3NP3/2P1B3/PP3PPP/RN1QK2R",
  "r1b1kbnr/pppp1ppp/2n5/5N2/4P2q/8/PPP2PPP/RNBQKB1R",
  "r1bnk2r/ppppnppp/5q2/1Bb5/3NP3/2P1B3/PP3PPP/RN1QK2R",
  "r1bqk1nr/pppp1ppp/2n5/2b5/4P3/1N6/PPP2PPP/RNBQKB1R",
  "r1bqk1nr/pppp1ppp/2n5/8/1b2P3/1N6/PPP2PPP/RNBQKB1R",
  "r1bk2nr/pppp1ppp/2n3q1/1N6/8/8/PPPNBPPP/R2Q1RK1",
  "r1bqkb1r/pppp1ppp/2n2n2/8/3NP3/8/PPP2PPP/RNBQKB1R",
  "r1b1kbnr/pppp1ppp/2n5/8/3NP2q/8/PPP2PPP/RNBQKB1R",
  "r1b1kbnr/pppp1ppp/2n5/8/3NP2q/2N5/PPP2PPP/R1BQKB1R",
  "r1bqkb1r/p1pp1ppp/2p2n2/8/4P3/8/PPPN1PPP/R1BQKB1R",
  "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R",
  "r1bqk1nr/pppp1ppp/2n5/4p3/1b2P3/2N2N2/PPPP1PPP/R1BQKB1R",
  "r1bqk2r/pppp1ppp/2n2n2/3Np3/1b2P3/5N2/PPPP1PPP/R1BQKB1R",
  "r1bqkbnr/pppp1p1p/2n3p1/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R",
  "r1bqkbnr/pppp1p1p/2n3p1/3N4/3pP3/5N2/PPP2PPP/R1BQKB1R",
  "r1bqkbnr/pppp2pp/2n5/4pp2/4P3/2N2N2/PPPP1PPP/R1BQKB1R",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/P1N2N2/1PPP1PPP/R1BQKB1R",
  "r1bqkb1r/pppp1ppp/2n2n2/4N3/4P3/2N5/PPPP1PPP/R1BQKB1R",
  "r1bqk1nr/pppp2pp/6n1/4Pp2/1bBP4/2N2Q2/PPP2PPP/R1B1K2R",
  "1rb1kbnr/pp1p1ppp/3P1qn1/1N6/5P2/8/PPP3PP/R1BQKB1R",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R",
  "r1bqkb1r/pppp1Bpp/2n5/4p3/4n3/2N2N2/PPPP1PPP/R1BQK2R",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/3PP3/2N2N2/PPP2PPP/R1BQKB1R",
  "r1bqkb1r/pppp1ppp/2n2n2/8/3pP3/2N2N2/PPP2PPP/R1BQKB1R",
  "r1bqkb1r/pppp1ppp/2n2n2/3N4/3pP3/5N2/PPP2PPP/R1BQKB1R",
  "r1bqkb1r/pppp2pp/2n5/3N1p2/3pn3/5N2/PPP1QPPP/R1B1KB1R",
  "r1bqk2r/pppp1ppp/2n2n2/4N3/1b1PP3/2N5/PPP2PPP/R1BQKB1R",
  "r1b1k2r/ppppqppp/2n2n2/4N3/1b1PP3/2N5/PPP2PPP/R1BQKB1R",
  "r1bqk2r/pppp1ppp/5n2/3Pp3/1b1nP3/2N2N2/PPP2PPP/R1BQKB1R",
  "r1bqkb1r/pppp1ppp/2n5/8/3Nn3/2N5/PPP2PPP/R1BQKB1R",
  "r1bq1rk1/pppp1ppp/2n2n2/1B2P3/1b1P1P2/2N5/PPP3PP/R1BQ1RK1",
  "r1bq1rk1/pppp1ppp/5n2/1Bb1N3/3nP3/2N5/PPPP1PPP/R1BQ1RK1",
  "r1bqkb1r/1ppp1ppp/p1B2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQK2R",
  "r1bqkb1r/pppp1ppp/5n2/4p3/3nP3/2N2N2/PPPPBPPP/R1BQK2R",
  "r1bqkb1r/pppp1ppp/5n2/1B2p3/3nP3/2N2N2/PPPP1PPP/R1BQ1RK1",
  "r1bq1rk1/ppp2ppp/1b1p1n2/4p3/N3P3/3P1B2/PPP2PPP/R1BQ1RK1",
  "r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/2N2N2/PPPP1PPP/R1BQK2R",
  "r1bqk2r/pppp1ppp/2n2n2/1Bb1p3/4P3/2N2N2/PPPP1PPP/R1BQK2R",
  "r1bq1rk1/pppp1ppp/5n2/2b1N3/B2nP3/2N5/PPPP1PPP/R1BQK2R",
  "r1bqkb1r/pppp1ppp/5n2/1B2p3/3nP3/2N2N2/PPPP1PPP/R1BQK2R",
  "r1b1kb1r/ppppqppp/5n2/1B2N3/3nPP2/2N5/PPPP2PP/R1BQK2R",
  "r1bqkb1r/pppp1ppp/5n2/1B2p3/3NP3/2N5/PPPP1PPP/R1BQK2R",
  "r3kb1r/1pp2ppp/p1p1b3/3q4/3PN3/8/PPP2PPP/R1BQR1K1",
  "r1b2rk1/ppp1qppp/2n2n2/1B1pp3/1b2P3/3P1N2/PPP1NPPP/R1BQ1RK1",
  "r1bqk2r/pppp1ppp/2n2n2/1B2p3/1b2P3/2N2N2/PPPP1PPP/R1BQK2R",
  "r1bq1rk1/pppp1ppp/2n2n2/1B2p3/1b2P3/2NP1N2/PPP2PPP/R1BQ1RK1",
  "r1bq1rk1/pppp1ppp/2n5/1B1P4/1b2p3/5N2/PPPP1PPP/R1BQ1RK1",
  "r1bq1rk1/ppp2ppp/2np1n2/1B2p3/4P3/2PP1N2/P1P2PPP/R1BQR1K1",
  "r1bq1rk1/pppp1ppp/2B2n2/4p3/1b2P3/2N2N2/PPPP1PPP/R1BQ1RK1",
  "r1bq1rk1/pppp1ppp/2n2n2/1B2p3/4P3/2bP1N2/PPP2PPP/R1BQ1RK1",
  "r1bq1rk1/ppp2ppp/2np1n2/1B2p3/1b2P3/2NP1N2/PPP2PPP/R1BQ1RK1",
  "r2n1rk1/ppp1qppp/3p1n2/1B2p1B1/3PP1b1/2P2N2/P1P2PPP/R2QR1K1",
  "r1bq1rk1/ppp1nppp/3p1n2/1B2p1B1/1b2P3/2NP1N2/PPP2PPP/R2Q1RK1",
  "r1bq1rk1/ppp2ppp/2np1n2/1B2p3/1b2P3/3P1N2/PPP1NPPP/R1BQ1RK1",
  "r1bq1rk1/ppp2ppp/2n2n2/1B1pp3/4P3/2PP1N2/P1P2PPP/R1BQ1RK1",
  "r1b2rk1/pp2nppp/2pq1n2/3pp1B1/1b2P2N/1BNP4/PPP2PPP/R2Q1RK1",
  "r1b2rk1/ppp1qppp/2np1n2/1B2p1B1/4P3/2PP1N2/P1P2PPP/R2Q1RK1",
  "r2q1rk1/ppp2ppp/2npbn2/1B2p1B1/1b2P3/2NP1N2/PPP2PPP/R2Q1RK1",
  "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R",
  "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/pppp1pp1/2n4p/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/pppp1ppp/8/4p3/2BnP3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQ1RK1",
  "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2BPP3/5N2/PPP2PPP/RNBQ1RK1",
  "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R",
  "r1bqk2r/ppp2ppp/2np1n2/2b1p1B1/2B1P3/2NP1N2/PPP2PPP/R2QK2R",
  "r1bqk1nr/pppp2pp/2n5/2b1p1N1/2B1Pp2/3P4/PPP2PPP/RNBQK2R",
  "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R",
  "r1bqk1nr/pppp2pp/2n5/2b1pp2/2B1P3/3P1N2/PPP2PPP/RNBQK2R",
  "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R",
  "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqk1nr/ppppbppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqk2r/ppppbppp/2n5/4P3/2Bpn3/2P2N2/PP3PPP/RNBQK2R",
  "r1bqk1nr/pppp1Bpp/2n5/2b1p3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/ppp2ppp/2np4/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqk1nr/pppp1ppp/2n5/2b1p3/2BPP3/5N2/PPP2PPP/RNBQK2R",
  "r1bqkbnr/pppp2pp/2n5/4pp2/2B1P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqk1nr/pppp1ppp/2n5/2b1p3/1PB1P3/5N2/P1PP1PPP/RNBQK2R",
  "r2qk1nr/ppp2ppp/1bnp4/8/2BPP1b1/2N2N2/P4PPP/R1BQ1RK1",
  "r1bqk1nr/pppp1ppp/2n5/4p3/1bB1P3/5N2/P1PP1PPP/RNBQK2R",
  "r1bqk1nr/pppp1ppp/1bn5/4p3/1PB1P3/5N2/P1PP1PPP/RNBQK2R",
  "r1bqk1nr/pppp1ppp/1bn5/4p3/PPB1P3/5N2/2PP1PPP/RNBQK2R",
  "r1bqk1nr/pppp1ppp/1bn5/4p3/1PB1P3/5N2/PBPP1PPP/RN1QK2R",
  "r1bk2nr/pppp1Qpp/1b6/nP2q3/2B1P3/8/PBPP1PPP/RN2K2R",
  "r1b1k1nr/pppp1ppp/1b6/nP2N1q1/2B1P3/8/P1PP1PPP/RNBQK2R",
  "r1bqk2r/pppp1ppp/1b5n/nP2N3/2B1P3/8/P1PP1PPP/RNBQK2R",
  "r1b3r1/ppp2k1p/1b6/nP2B1q1/3PP3/8/P1PN1PPP/R2QK2R",
  "r1bqk1nr/1ppp1ppp/pbn5/4p3/PPB1P3/2N2N2/2PP1PPP/R1BQK2R",
  "r1b3nr/ppppkBpp/1b6/nP2N1qQ/4P3/8/P1PP1PPP/RNB1K2R",
  "r1bqk1nr/ppppbppp/2n5/4p3/2B1P3/2P2N2/P2P1PPP/RNBQK2R",
  "r1bqk1nr/ppppbppp/8/n3p3/2BPP3/2P2N2/P4PPP/RNBQK2R",
  "r1bqk1nr/p1pp1ppp/2n5/1pb1p3/1PB1P3/5N2/P1PP1PPP/RNBQK2R",
  "r2qk1nr/ppp2ppp/1bnp4/8/Q1BPP1b1/2N2N2/P4PPP/R1B2RK1",
  "r2q1knr/pppb1Bpp/1b1p4/n7/3PP3/2N2N2/P1Q2PPP/R1B2RK1",
  "r1bqk1nr/ppp2ppp/1b1p4/n5B1/2BPP3/2N2N2/P4PPP/R2Q1RK1",
  "r1bqk1nr/pppp1ppp/2n5/8/1bBPP3/5N2/P2B1PPP/RN1QK2R",
  "r1bqk1nr/ppp2ppp/2n5/2bpp3/1PB1P3/5N2/P1PP1PPP/RNBQK2R",
  "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/2P2N2/P2P1PPP/RNBQK2R",
  "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/2P2N2/P2P1PPP/RNBQK2R",
  "r1bqk1nr/ppp2ppp/1bnp4/8/2BPP3/5N2/P4PPP/RNBQ1RK1",
  "r1bqk1nr/ppp2ppp/1bnp4/8/2BPP3/2N2N2/P4PPP/R1BQ1RK1",
  "r2q2nr/pppb1kpp/1b1p4/n7/3PP3/2N2N2/P1Q2PPP/R1B2RK1",
  "r1bqk2r/ppp1nppp/1b1p4/n2P4/2B1P3/5N2/PB3PPP/RN1Q1RK1",
  "r1bqk1nr/ppp3pp/1b1p1p2/n7/2BPP3/2N1BN2/P4PPP/R2Q1RK1",
  "r1bqk1nr/pppp1ppp/2nb4/4p3/2B1P3/2P2N2/P2P1PPP/RNBQK2R",
  "r1bqk1nr/ppp2ppp/1b1p4/n2P4/2B1P3/5N2/PB3PPP/RN1Q1RK1",
  "r1bqk1nr/ppp2ppp/2np4/b3p3/2B1P3/2P2N2/P2P1PPP/RNBQ1RK1",
  "r2qk1nr/ppp2ppp/2np4/b3p3/2BPP1b1/2P2N2/P4PPP/RNBQ1RK1",
  "r1bqk2r/pppp1ppp/2n2n2/b7/2BpP3/2P2N2/P4PPP/RNBQ1RK1",
  "r1bqk1nr/ppp2ppp/2np4/b3p3/2BPP3/2P2N2/P4PPP/RNBQK2R",
  "r1bqk1nr/pppp1ppp/2n5/b7/2B1P3/2p2N2/P4PPP/RNBQ1RK1",
  "r1b1k2r/ppppnppp/2n3q1/b3P3/2B5/BQN2N2/P4PPP/R4RK1",
  "r1b1k2r/ppppnppp/2n3q1/b3P3/2B5/1QN2N2/P4PPP/R1BR2K1",
  "r1bqk1nr/pppp1ppp/2n5/b7/2B1P3/2Pp1N2/P4PPP/RNBQ1RK1",
  "r1bqk1nr/p1pp1ppp/2n5/bp6/2BpP3/2P2N2/P4PPP/RNBQ1RK1",
  "r1bqk2r/pppp1ppp/2n2n2/b3p3/2BPP3/2P2N2/P4PPP/RNBQK2R",
  "r1bqk1nr/ppp2ppp/1bnp4/4p3/2BPP3/2P2N2/P4PPP/RNBQ1RK1",
  "r1bqk1nr/p1pp1ppp/2n5/bp2p3/2BPP3/2P2N2/P4PPP/RNBQK2R",
  "r1b1k1nr/pppq1ppp/1b6/n3N3/2B1P3/BQP5/P4PPP/RN3RK1",
  "r1bqk1nr/pppp1ppp/2n5/b3p3/2B1P3/2P2N2/P2P1PPP/RNBQK2R",
  "r1bqk2r/ppppnppp/2n5/b7/2BpP3/2P2N2/P4PPP/RNBQ1RK1",
  "r1bqk1nr/pppp1ppp/2n5/b7/2BpP3/2P2N2/P4PPP/RNBQK2R",
  "r1bq1rk1/pppp1ppp/2n2n2/b3N3/2BPP3/2P5/P4PPP/RNBQ1RK1",
  "r2qk1nr/pppb1ppp/2np4/b3p3/2BPP3/2P2N2/P4PPP/RNBQ1RK1",
  "r1bqk1nr/pppp1ppp/2n5/b3p3/2B1P3/2P2N2/P2P1PPP/RNBQ1RK1",
  "r1bqk1nr/ppp2ppp/2np4/b3p1B1/2BPP3/2P2N2/P4PPP/RN1QK2R",
  "r1bqk1nr/ppp2ppp/2np4/b3p3/2BPP3/1QP2N2/P4PPP/RNB1K2R",
  "r1bqk1nr/ppp2ppp/2np4/b7/2BpP3/1QP2N2/P4PPP/RNB2RK1",
  "r1bqk2r/pppp1ppp/2n2n2/2b1p3/1PB1P3/2P2N2/P2P1PPP/RNBQK2R",
  "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R",
  "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R",
  "r1bqk1nr/pppp2pp/2n5/2b1pp2/2B1P3/2P2N2/PP1P1PPP/RNBQK2R",
  "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2BPP3/2P2N2/PP3PPP/RNBQK2R",
  "r1b1k1nr/ppppqppp/1bn5/4p3/2BPP3/2P2N2/PP3PPP/RNBQK2R",
  "r1b1k1nr/ppppqppp/2n5/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R",
  "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2PP1N2/PP3PPP/RNBQK2R",
  "r1bq1rk1/bpp2ppp/p1np1n2/4p3/4P3/1BPP1N1P/PP3PP1/RNBQR1K1",
  "r1bqk2r/ppp2ppp/2n2n2/2bpP3/2Bp4/2P2N2/PP3PPP/RNBQK2R",
  "r1bqk2r/ppp2ppp/2n5/1B1pP3/1b1Pn3/5N2/PP3PPP/RNBQK2R",
  "r1bqk1nr/ppp2ppp/1bnp4/8/2BPP3/5N2/PP3PPP/RNBQK2R",
  "r1b1k2r/1pp1qppp/pbnp1n2/4p3/P1BPP3/2P2N1P/1P3PP1/RNBQR1K1",
  "rnb1k1nr/ppppqppp/1b1P4/4p3/2B1P3/2P2N2/PP3PPP/RNBQK2R",
  "r1bqk2r/pppp1ppp/2n5/2bBP3/8/2p2NK1/PP4PP/RNBQ3R",
  "r1b1k1nr/ppppqppp/1bn5/4p1B1/2BPP3/2P2N2/PP3PPP/RN1QK2R",
  "r1bqk2r/pppp1ppp/2n2n2/2b5/2BpP3/2P2N2/PP3PPP/RNBQ1RK1",
  "r1bqk2r/pppp1ppp/2n5/8/1bBP4/2n2N2/PP3PPP/R1BQ1RK1",
  "r1bqk2r/pppp1ppp/2n5/8/2BPn3/2b2N2/PP3PPP/R1BQ1RK1",
  "r1bqk2r/ppp1nppp/3p1b2/3P4/2B1R1P1/5N2/PP3P1P/R1BQ2K1",
  "r1bqk2r/pppp1ppp/2n5/3P4/2B1n3/2b2N2/PP3PPP/R1BQ1RK1",
  "r1bqk2r/pppp1ppp/2n2n2/2b5/2BPP3/5N2/PP3PPP/RNBQK2R",
  "r1bqk2r/pppp1ppp/2n5/8/2BP4/B1b2N2/P4PPP/R2Q1RK1",
  "r1bqk2r/ppp2ppp/2n5/3p4/2BP4/1Qb2N2/P4PPP/R1B2RK1",
  "r1bqk2r/pppp1ppp/2n2n2/8/1bBPP3/5N2/PP3PPP/RNBQ1K1R",
  "r1bqk2r/pppp1ppp/2n2n2/8/1bBPP3/2N2N2/PP3PPP/R1BQK2R",
  "r1bq3r/ppp3pp/5k2/3pN3/1n1Pn3/1Q3P2/PP4PP/RN2K2R",
  "r1bqk2r/ppp2ppp/2n5/3p4/2BPn3/B1P2N2/P4PPP/R2Q1RK1",
  "r1bq1rk1/ppp1nppN/3p4/3P4/2B1R3/8/PP3PPP/R2Q2K1",
  "r1bqk2r/ppp2ppp/3p1n2/4p1B1/2BnP3/8/PPP2PPP/RN1Q1RK1",
  "r1b1k2r/ppp1qppp/5n2/4p1B1/2BnP3/2N5/PPP3PP/R2Q1RK1",
  "r1bqk2r/pppp1p2/5n1p/4p1p1/2BnPP1B/8/PPP3PP/RN1Q1RK1",
  "r1bqkb1r/pppp1ppp/2n2n2/8/2BpP3/5N2/PPP2PPP/RNBQ1RK1",
  "r1bqkb1r/ppp2ppp/2np1n2/8/2BpP3/5N2/PPP2PPP/RNBQ1RK1",
  "r1bqk2r/pppp1ppp/2n2n2/2b5/2BpP3/5N2/PPP2PPP/RNBQ1RK1",
  "r2qk2r/ppp2pPp/2n1b3/2b5/2pp4/5N2/PPP2PPP/RNBQR1K1",
  "r3k2r/ppp2ppp/2n1bP2/2b2qN1/2ppN3/8/PPP2PPP/R1BQR1K1",
  "r1bqk2r/pppp1ppp/2n5/2b1P3/2Bp2n1/5N2/PPP2PPP/RNBQ1RK1",
  "r1bqk2r/ppppbppp/2n2n2/8/2BpP3/5N2/PPP2PPP/RNBQ1RK1",
  "r1bqkb1r/ppp2ppp/2np1n2/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkb1r/pppp1ppp/2n5/4p3/2BPn3/5N2/PPP2PPP/RNBQK2R",
  "r1b1k2r/ppp2ppp/2N5/1B1pP3/4n2q/8/PPP2bPP/RNBQ1K1R",
  "r1bqk2r/pppp1ppp/2n2n2/2b1P3/2Bp4/5N2/PPP2PPP/RNBQ1RK1",
  "2kr3r/ppp2ppp/1bn1bPq1/6N1/2ppNPP1/8/PPP4P/R1BQR1K1",
  "r1bqk2r/pppp1ppp/2n5/2b1P3/2Bp2n1/2P2N2/PP3PPP/RNBQ1RK1",
  "r2qk2r/ppp2p1p/2n1bPp1/2b3N1/2pp4/8/PPP2PPP/RNBQR1K1",
  "r3kb1r/ppp2ppp/2n1bP2/5qN1/2ppN3/8/PPP2PPP/R1BQR1K1",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R",
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R",
  "r1bqkb1r/pppp1ppp/2n2n2/6N1/2BpP3/8/PPP2PPP/RNBQK2R",
  "r1b1kb1r/ppp2ppp/2n5/3q4/3pn3/2N2N2/PPP2PPP/R1BQR1K1",
  "r3kb1r/ppp2ppp/2n1b3/3q2B1/3pN3/5N2/PPP2PPP/R2QR1K1",
  "r1bqkb1r/ppp2ppp/2n5/3p4/2Bpn3/2N2N2/PPP2PPP/R1BQR1K1",
  "r1bqkb1r/pppp1ppp/2n5/8/2Bpn3/5N2/PPP2PPP/RNBQ1RK1",
  "r1bqkb1r/pppp1ppp/2n5/8/2Bpn3/2N2N2/PPP2PPP/R1BQ1RK1",
  "r4b1r/ppp1kp2/2n1bN1p/q5p1/1P1p3B/5N2/P1P2PPP/R2QR1K1",
  "r1bq1b1r/ppn3pp/2p1k3/3np3/2BPQ3/P1N5/1PP2PPP/R1B1K2R",
  "r1bqkb1r/ppp2Npp/2n5/3np3/2B5/8/PPPP1PPP/RNBQK2R",
  "r1bqkb1r/ppp2ppp/5n2/3Pp1N1/2Bn4/8/PPPP1PPP/RNBQK2R",
  "r1bqkb1r/p1p2ppp/8/1p1np3/3nN3/2P5/PP1P1PPP/RNBQKB1R",
  "r1bqkb1r/ppp2ppp/5n2/3Pp1N1/1nB5/8/PPPP1PPP/RNBQK2R",
  "r1bqkb1r/pppp1ppp/2n2n2/4p1N1/2B1P3/8/PPPP1PPP/RNBQK2R",
  "r1bqkb1r/ppp2ppp/2n2n2/3pp1N1/2B1P3/8/PPPP1PPP/RNBQK2R",
  "r1bqkb1r/ppp2ppp/2n5/3np1N1/2BP4/8/PPP2PPP/RNBQK2R",
  "r1bqk2r/ppp2ppp/2n5/3np1N1/1bBP4/8/PPP2PPP/RNBQK2R",
  "r1bqkb1r/pppp1ppp/2n5/4p1N1/2B1n3/8/PPPP1PPP/RNBQK2R",
  "r1bqk2r/pppp1ppp/2n2n2/2b1p1N1/2B1P3/8/PPPP1PPP/RNBQK2R",
  "r1bqk2r/pppp1Bpp/2n2n2/2b1p1N1/4P3/8/PPPP1PPP/RNBQK2R",
  "r1bqk2r/pppp1Npp/2n5/4p3/2B1n3/4K3/PPPP2PP/RNBQ3R",
  "r1bqk2r/pppp1Npp/2n2n2/2b1p3/2B1P3/8/PPPP1PPP/RNBQK2R",
  "r1bq3r/ppppkBpp/2n2n2/2b1p1N1/3PP3/8/PPP2PPP/RNBQK2R",
  "r1bqkb1r/p1p2ppp/2n2n2/1p1Pp1N1/2B5/8/PPPP1PPP/RNBQK2R",
  "r1bqkb1r/p1p2Np1/2n2n1p/1p1Pp3/8/8/PPPP1PPP/RNBQKB1R",
  "r1bqkb1r/p4ppp/2p2n2/n3p1N1/8/8/PPPPBPPP/RNBQK2R",
  "r1bqkb1r/p4ppp/5n2/np2p1N1/8/5Q2/PPPP1PPP/RNB1K2R",
  "1rbqkb1r/p4ppp/2p2n2/nB2p1N1/8/5Q2/PPPP1PPP/RNB1K2R",
  "r1bqk2r/ppp1bpp1/5n1p/3P4/2P1p3/5N2/PPP1QPPP/RNB1K2R",
  "r1b1kb1r/p1q2ppp/2p2n2/n3p1N1/8/3B1Q2/PPPP1PPP/RNB1K2R",
  "r1bqkb1r/ppp2ppp/5n2/n2Pp1N1/2B5/8/PPPP1PPP/RNBQK2R",
  "r1bqkb1r/ppp2ppp/5n2/nB1Pp1N1/8/8/PPPP1PPP/RNBQK2R",
  "r1bqkb1r/p4ppp/2p2n2/nB2p1N1/8/5Q2/PPPP1PPP/RNB1K2R",
  "r1bqkb1r/ppp2ppp/5n2/n2Pp1N1/2B5/3P4/PPP2PPP/RNBQK2R",
  "r1bqk2r/ppp2pp1/5n1p/2bP4/2P1p3/8/PPPNQPPP/RNB1K2R",
  "r1b1k2r/p1q2pp1/2pb1n1p/n3N3/3Pp3/8/PPPBBPPP/RN1QK2R",
  "r1b1kb1r/p1q2pp1/2p2n1p/n3N3/4p3/8/PPPPBPPP/RNBQK2R",
  "r1bqkb1r/p4pp1/2p2n1p/n3p1N1/8/8/PPPPBPPP/RNBQK2R",
  "r1bqkb1r/p4pp1/2p2n1p/n3p3/8/7N/PPPPBPPP/RNBQK2R",
  "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqk1nr/pppp1ppp/2n5/1B2p3/1b2P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqk1nr/ppp2ppp/2p5/b3p3/4P3/2P2N2/PP1P1PPP/RNBQK2R",
  "r1bqkbnr/pppp1p1p/2n5/1B2p1p1/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/1ppp1ppp/2n5/pB2p3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkb1r/ppppnppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkb1r/ppppnp1p/2n3p1/1B2p3/4P3/2N2N2/PPPP1PPP/R1BQK2R",
  "r1bq1rk1/ppp1npbp/2n3p1/1B1p4/3NP3/2N1B3/PPPQ1PPP/R3K2R",
  "r1bqkbnr/pppp1p1p/2n3p1/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/pppp3p/2n3p1/1B2pp2/4P3/2P2N2/PP1P1PPP/RNBQK2R",
  "r1bqk1nr/ppppbppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/pppp2pp/2n2p2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/pppp1ppp/8/nB2p3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "rnbqkbnr/pppp1ppp/8/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/p1pp1ppp/1pn5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/ppp2ppp/2n5/1B1pp3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1b1kbnr/ppp2ppp/2n5/1B1pN1q1/4P3/8/PPPP1PPP/RNBQ1RK1",
  "r1b1kbnr/ppp2ppp/2N5/1B1p2q1/4P3/8/PPPP1PPP/RNBQK2R",
  "r1b1kbnr/ppppqppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/pppp1ppp/8/1B2p3/3nP3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkb1r/ppppnppp/8/1B6/3pP3/8/PPPP1PPP/RNBQ1RK1",
  "r2qkbnr/pppb1ppp/2np4/1B2p3/2PPP3/5N2/PP3PPP/RNBQK2R",
  "r1bqkbnr/ppp2ppp/2np4/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/ppp2ppp/2np4/1B6/3pP3/5N2/PPP2PPP/RNBQ1RK1",
  "r2qkb1r/pppb1ppp/2Bp1n2/4p3/3PP3/2N2N2/PPP2PPP/R1BQK2R",
  "r1bqkbnr/pppp2pp/2n5/1B2pp2/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1b1kbnr/ppp3pp/2N5/1B4q1/4p3/8/PPPP1PPP/R1BQK2R",
  "r1bqkbnr/pppp2pp/2n5/1B2pp2/4P3/2N2N2/PPPP1PPP/R1BQK2R",
  "r1bqkbnr/pppp2pp/2B5/4pp2/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/pppp2pp/2n5/1B2pP2/8/5N2/PPPP1PPP/RNBQK2R",
  "r1bqk1nr/ppppb1pp/2n5/1B2p3/4N3/5N2/PPPP1PPP/R1BQK2R",
  "r1b1kbnr/ppp3pp/2N5/1B1q4/4p3/8/PPPP1PPP/R1BQK2R",
  "r1bqkbnr/pppp2pp/2n5/1B2pp2/3PP3/5N2/PPP2PPP/RNBQK2R",
  "r1bqkb1r/pppp2pp/2n2n2/1B2p3/4N3/5N2/PPPP1PPP/R1BQK2R",
  "r1bq1rk1/pppp1ppp/1bn2n2/1B2p3/3PP3/2P2N2/PP3PPP/RNBQ1RK1",
  "r1b1k1nr/ppppqppp/2n5/1Bb1p3/4P3/2P2N2/PP1P1PPP/RNBQK2R",
  "r1bqk1nr/pppp1ppp/8/1Bb1p3/1P1nP3/5N2/P1PP1PPP/RNBQ1RK1",
  "r1bqk1nr/pppp1ppp/2n5/1Bb1p3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqk1nr/pppp1ppp/2n5/1Bb1p3/4P3/2P2N2/PP1P1PPP/RNBQK2R",
  "r1bqk1nr/pppp1ppp/1bn5/1B2p3/4P3/2P2N2/PP1P1PPP/RNBQK2R",
  "r1bqk1nr/pppp2pp/2n5/1Bb1pp2/4P3/2P2N2/PP1P1PPP/RNBQK2R",
  "r1bqk1nr/ppp2ppp/2n5/1Bbpp3/4P3/2P2N2/PP1P1PPP/RNBQK2R",
  "r1bq1rk1/pppp1ppp/1bn2n2/1B2p1B1/3PP3/2P2N2/PP3PPP/RN1Q1RK1",
  "r1bqk1nr/pppp1ppp/2n5/1Bb1p3/1P2P3/5N2/P1PP1PPP/RNBQK2R",
  "r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQ1RK1",
  "r1bqkb1r/ppp2ppp/2Bp1n2/4p3/4P3/3P1N2/PPP2PPP/RNBQK2R",
  "r1bqk2r/pppp1ppp/2n2n2/1Bb1p3/4P3/5N2/PPPP1PPP/RNBQ1RK1",
  "r1bqkb1r/ppp2ppp/2np1n2/1B2p3/2P1P3/3P1N2/PP3PPP/RNBQK2R",
  "r1bqkb1r/pppp1ppp/2n5/1B2p3/4P1n1/5N2/PPPP1PPP/RNBQ1RK1",
  "r1bqk2r/pppp1ppp/2n2n2/1Bb1p3/4P3/3PBN2/PPP2PPP/RN1QK2R",
  "r1bqkb1r/pp1pnppp/2p2n2/1B2N3/4P3/3P4/PPP2PPP/RNBQK2R",
  "r1bqkb1r/ppppnppp/5n2/1B2p3/4P3/3P1N2/PPP2PPP/RNBQK2R",
  "r1bqkb1r/pppp1ppp/2n2n2/1B6/3pP3/5N2/PPP2PPP/RNBQ1RK1",
  "r1bqk2r/pppp1ppp/2n2n2/1Bb1p3/4P3/2P2N2/PP1P1PPP/RNBQ1RK1",
  "r1bqkb1r/pppp1ppp/2n2n2/1B2N3/4P3/8/PPPP1PPP/RNBQK2R",
  "r2qk2r/pppbbppp/2np1n2/1B2p1B1/3PP3/2N2N2/PPP2PPP/R2Q1RK1",
  "r2qk2r/pppbbppp/2Bp1n2/4p3/3PP3/2N2N2/PPP2PPP/R1BQ1RK1",
  "r2qkb1r/pppb1ppp/2np1n2/1B6/3pP3/2N2N2/PPP2PPP/R1BQ1RK1",
  "r2qk2r/pppbbppp/2np1n2/1B2p3/3PP3/2N2N2/PPP2PPP/R1BQ1RK1",
  "r1bqkb1r/ppp2ppp/2np1n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQ1RK1",
  "r2q1rk1/pppbbppp/2np1n2/1B2p3/3PP3/2N2N2/PPP2PPP/R1BQR1K1",
  "r1bqkb1r/pppn1ppp/2np4/1B2p3/3PP3/5N2/PPP2PPP/RNBQ1RK1",
  "r2k1b1r/pppb1ppp/2p5/4Pn2/8/2N2N2/PPP2PPP/R1B2RK1",
  "r1bqk2r/p1ppbppp/2p5/4Pn2/8/5N2/PPP1QPPP/RNB2RK1",
  "r1bqk2r/ppppbppp/2n5/1B2P3/4n3/5N2/PPP2PPP/RNBQ1RK1",
  "r1bqk2r/pnppbppp/2p5/4P3/8/1P3N2/P1P1QPPP/RNB2RK1",
  "r1bqkb1r/pppp1ppp/2n5/1B2p3/4n3/5N2/PPPP1PPP/RNBQ1RK1",
  "r1bqk2r/ppppbppp/2n5/1B2p3/3Pn3/5N2/PPP2PPP/RNBQ1RK1",
  "r1bq1rk1/p1ppbppp/8/2p1P3/3B4/2N5/PPP1QPPP/R3R1K1",
  "r1bqkb1r/1ppp1ppp/p1n5/1B2p3/3Pn3/5N2/PPP2PPP/RNBQ1RK1",
  "r1bqk2r/ppp1bppp/2n5/1B1pp3/3Pn3/5N2/PPP1QPPP/RNB2RK1",
  "r1bqk2r/pnppbppp/2p5/4P3/3N4/8/PPP1QPPP/RNB2RK1",
  "r1bqk2r/pnppbppp/2p5/4P3/2P5/5N2/PP2QPPP/RNB2RK1",
  "r1bqkb1r/pppp1ppp/2nn4/1B2p3/3P4/5N2/PPP2PPP/RNBQ1RK1",
  "r1bk1b1r/ppp2ppp/2p5/4Pn2/8/5N2/PPP2PPP/RNB2RK1",
  "r1bqkb1r/ppp2ppp/2p5/4P3/4n3/5N2/PPP2PPP/RNBQ1RK1",
  "r1bqkb1r/pppp1ppp/2nn4/4p3/B2P4/5N2/PPP2PPP/RNBQ1RK1",
  "r1bqkb1r/pppp1ppp/2nn4/1B2P3/8/5N2/PPP2PPP/RNBQ1RK1",
  "r1bqkbnr/1ppp1ppp/p1B5/4p3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1b1k1nr/1pp2ppp/p1pb4/8/3NP3/8/PPP2PPP/RNB1K2R",
  "r1bqkbnr/1pp2ppp/p1p5/4p3/4P3/2N2N2/PPPP1PPP/R1BQK2R",
  "r1bqkbnr/2pp1ppp/p1p5/4p3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/1pp3pp/p1p2p2/4p3/4P3/2NP1N2/PPP2PPP/R1BQK2R",
  "r3kbnr/1ppb1ppp/p1p5/8/3NP3/8/PPP2PPP/RNB1K2R",
  "r2qkbnr/1pp2pp1/p1p5/4p2p/4P1b1/5N1P/PPPP1PP1/RNBQ1RK1",
  "r1b1kbnr/1pp2ppp/p1pq4/4p3/4P3/5N2/PPPP1PPP/RNBQ1RK1",
  "r1bqkbnr/1pp3pp/p1p2p2/4p3/4P3/5N2/PPPP1PPP/RNBQ1RK1",
  "r1bqk1nr/1pp2ppp/p1pb4/4p3/4P3/5N2/PPPP1PPP/RNBQ1RK1",
  "r1bqkbnr/1pp2ppp/p1p5/4p3/4P3/5N2/PPPP1PPP/RNBQ1RK1",
  "r1bqkbnr/1ppp1ppp/p7/4p3/B2nP3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqk1nr/1ppp1ppp/p1n5/4p3/Bb2P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/2pp1ppp/p1n5/1p2p3/B3P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqk1nr/1ppp1ppp/p1n5/2b1p3/B3P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkb1r/1pppnppp/p1n5/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/1ppp1p1p/p1n3p1/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqk1nr/2pp1ppp/p1n5/1pb1p3/4P3/1B3N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/2pp1ppp/p7/np2p3/4P3/1B3N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/2pp1Bpp/p7/np2p3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/1ppp2pp/p1n5/4pp2/B3P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/1ppp2pp/p1n5/4pP2/B7/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/1pp2ppp/p1np4/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkbnr/1pp2ppp/p1np4/4p3/B3P3/2N2N2/PPPP1PPP/R1BQK2R",
  "r1bqkbnr/1pp2ppp/p1np4/4p3/B1P1P3/5N2/PP1P1PPP/RNBQK2R",
  "r1bqkbnr/5ppp/p2p4/1pp5/3QP3/1B6/PPP2PPP/RNB1K2R",
  "r2qbrk1/1pp1bppp/p1np1n2/4p3/B2PP3/2P2N2/PP1N1PPP/R1BQR1K1",
  "r1bqkbnr/1pp2ppp/p1np4/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1",
  "r1bqkbnr/2p2ppp/p1pp4/4p3/3PP3/5N2/PPP2PPP/RNBQK2R",
  "r1bqkbnr/2p3pp/p1pp1p2/4p3/3PP3/5N2/PPP2PPP/RNBQK2R",
  "r1bqkbnr/1pp2ppp/p1np4/4p3/B3P3/2P2N2/PP1P1PPP/RNBQK2R",
  "r2qkbnr/1pp3pp/p1np4/4pb2/B7/2P2N2/PP1P1PPP/RNBQ1RK1",
  "r1bqkbnr/1pp3pp/p1np4/4pp2/B3P3/2P2N2/PP1P1PPP/RNBQK2R",
  "r2qkbnr/1ppb1ppp/p1np4/4p3/B3P3/2P2N2/PP1P1PPP/RNBQK2R",
  "r2qkb1r/1ppbnppp/p1np4/4p3/B2PP3/2P2N2/PP3PPP/RNBQK2R",
  "r2qkbnr/1ppb1p1p/p1np2p1/4p3/B2PP3/2P2N2/PP3PPP/RNBQK2R",
  "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/3P1N2/PPP2PPP/RNBQK2R",
  "r1bqkb1r/1ppp1ppp/p1B2n2/4p3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "r1bqkb1r/1pp2ppp/p1np1n2/4p3/B1P1P3/3P1N2/PP3PPP/RNBQK2R",
  "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/2P2N2/PP1P1PPP/RNBQK2R",
  "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B2PP3/5N2/PPP2PPP/RNBQK2R",
  "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/2N2N2/PPPP1PPP/R1BQK2R",
  "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPPQPPP/RNB1K2R",
  "r2qk2r/2p1bppp/p1np1n2/1p2p3/3PP1b1/1BP2N2/PP2QPPP/RNB1K2R",
  "r1bqkb1r/1ppp1p1p/p1n2np1/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1",
  "r1bqkb1r/1pp2ppp/p1n2n2/3pp3/B3P3/5N2/PPPP1PPP/RNBQ1RK1",
  "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1",
  "r1bqkb1r/2p2ppp/p1np1n2/1p2p3/4P3/1B3N2/PPPP1PPP/RNBQ1RK1",
  "r2qkb1r/1bpp1ppp/p1n2n2/1p2p3/4P3/1B3N2/PPPP1PPP/RNBQ1RK1",
  "r1bqk2r/1ppp1ppp/p1n2n2/2b1p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1",
  "r1bqk2r/2ppbppp/p1n2n2/1p2p3/P3P3/1B3N2/1PPP1PPP/RNBQ1RK1",
  "r1bq1k1r/2p2ppp/p4n2/1pbPR1N1/3n4/1B6/PPPP1PPP/RNBQ2K1",
  "r1bqkb1r/1pp2ppp/p1np1n2/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1",
  "r1bqkb1r/2p2ppp/p1pp4/4p3/3Pn3/5N2/PPP2PPP/RNBQ1RK1",
  "r1bqkb1r/2p3pp/p1p5/3pPp2/4n3/2N2N2/PPP2PPP/R1BQR1K1",
  "r2qkb1r/2p2ppp/p1pp1n2/4p3/3PP1b1/5N2/PPP2PPP/RNBQ1RK1",
  "r1bqkb1r/1ppp1ppp/p1n5/4p3/B3n3/5N2/PPPPQPPP/RNB2RK1",
  "r1bqkb1r/1ppp1ppp/p1n5/4p3/B3n3/5N2/PPPP1PPP/RNBQ1RK1",
  "r1bqkb1r/1ppp1ppp/p1n5/4p3/B2Pn3/5N2/PPP2PPP/RNBQ1RK1",
  "r1bqkb1r/2pp1ppp/p1n5/1p2p3/3Pn3/1B3N2/PPP2PPP/RNBQ1RK1",
  "r1bqkb1r/2p2ppp/p1n5/1p1pP3/4n3/1B3N2/PPP2PPP/RNBQ1RK1",
  "r1bqkb1r/2p2ppp/p7/1p1p4/P2pn3/1BN5/1PP2PPP/R1BQ1RK1",
  "r2qkb1r/2p2ppp/p1n1b3/1p1pP3/4n3/1B3N2/PPPN1PPP/R1BQ1RK1",
  "r2qk2r/2p2ppp/p1n1b3/1pbpP3/4n3/1B3N2/PPPN1PPP/R1B1QRK1",
  "r1bqkb1r/2pp1ppp/p1n5/1p2N3/B2Pn3/8/PPP2PPP/RNBQ1RK1",
  "r1bqkb1r/2p2ppp/p1n5/1p1pp3/2PPn3/1B3N2/PP3PPP/RNBQ1RK1",
  "r2qkb1r/2p2ppp/p1n1b3/1pn1P1N1/3p4/1BP5/PP1N1PPP/R1BQ1RK1",
  "r1bqkb1r/1ppp1ppp/p1n5/4p3/B3n3/2N2N2/PPPP1PPP/R1BQ1RK1",
  "r2qkb1r/2p2ppp/p1n1b3/1p1pP3/4n3/1B3N2/PPP2PPP/RNBQ1RK1",
  "r1bqkb1r/2pp1ppp/p1n5/1p1Pp3/B3n3/5N2/PPP2PPP/RNBQ1RK1",
  "r1bqkb1r/1ppp1ppp/p1n5/8/B2pn3/5N2/PPP2PPP/RNBQ1RK1",
  "r1bqkb1r/2p2ppp/p7/1p1pp3/P2nn3/1B3N2/1PP2PPP/RNBQ1RK1",
  "r1bqkb1r/1pp2ppp/p1n5/3pp3/B3n3/5N2/PPPP1PPP/RNBQR1K1",
  "r1bqkb1r/2p1nppp/p7/1p1pP3/4n3/1B3N2/PPP2PPP/RNBQ1RK1",
  "r2qkb1r/2p2ppp/p1n1b3/1p1pP3/4n3/1B3N2/PPP1QPPP/RNB2RK1",
  "r2qk2r/2p1bppp/p1n1b3/1p1pP3/2P1n3/1B3N2/PP2QPPP/RNB2RK1",
  "r4rk1/2pqbppp/p1n1b3/3pP3/2B1n3/5N2/PP2QPPP/RNBR2K1",
  "r2qkb1r/2p2ppp/p1n1b3/1p1pP3/4n3/1BP2N2/PP3PPP/RNBQ1RK1",
  "r2qkb1r/2p2ppp/p1n1b3/1pnpP3/8/1BP2N2/PP3PPP/RNBQ1RK1",
  "r2q1rk1/2p2ppp/p1n1b3/1pbpP3/8/2P2N2/PPBN1nPP/R1BQ1RK1",
  "r2qk2r/2p2ppp/p1n1b3/1pbpP3/4n3/1BP2N2/PP3PPP/RNBQ1RK1",
  "r2qk2r/2p2ppp/p1n1b3/1pbpP3/4n3/1BPQ1N2/PP3PPP/RNB2RK1",
  "r2qk2r/2p1nppp/p3b3/1pbpP3/4n3/1BPQ1N2/PP3PPP/RNB2RK1",
  "r2qk2r/2p2ppp/p1n1b3/1pbpP3/4n3/1BP2N2/PP1N1PPP/R1BQ1RK1",
  "r2q1rk1/2p1bppp/p3b3/1p1pn3/3Nn3/1BP5/PP3PPP/RNBQR1K1",
  "r2qk2r/2p1bppp/p1n1b3/1p1pP3/4n3/1BP2N2/PP3PPP/RNBQ1RK1",
  "r2qk2r/2p1bppp/p1n1b3/1p1pP3/4n3/1BP2N2/PP3PPP/RNBQR1K1",
  "r2q1rk1/2p1bppp/p1n1b3/1p1pP3/4n3/1BP2N2/PP1NQPPP/R1B2RK1",
  "r4rk1/2pqb1pp/p1n1p3/1p1pP3/4R3/1BP5/PP3PPP/RNBQ2K1",
  "r1bqk2r/1pppbppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1",
  "r1bqk2r/1pppbppp/p1n5/4P3/B2pn3/2P2N2/PP3PPP/RNBQ1RK1",
  "r1bqk2r/1pppbppp/p1n2n2/4p3/B2PP3/5N2/PPP2PPP/RNBQ1RK1",
  "r1bqk2r/1pppbppp/p1n5/4P3/B3n3/2p2N2/PP3PPP/RNBQ1RK1",
  "r1bqk2r/1pppbppp/p1n2n2/4p3/B3P3/3P1N2/PPP2PPP/RNBQ1RK1",
  "r1bqk2r/1pppbppp/p1n2n2/4p3/B3P3/2N2N2/PPPP1PPP/R1BQ1RK1",
  "r1bqk2r/1pppbppp/p1B2n2/4p3/4P3/5N2/PPPP1PPP/RNBQ1RK1",
  "r1bqk2r/1pppbppp/p1n2n2/4p3/B3P3/5N2/PPPPQPPP/RNB2RK1",
  "r1bq1rk1/2ppbppp/p1n2n2/1p2p3/4P3/1B3N2/PPPPQPPP/RNB2RK1",
  "r1bqk2r/2p1bppp/p1np1n2/1p2p3/4P3/1B3N2/PPPPQPPP/RNB2RK1",
  "r1bqk2r/1pp1bppp/p1np1n2/4p3/B3P3/5N2/PPPP1PPP/RNBQR1K1",
  "r1bqk2r/2ppbppp/p1n2n2/1p2p3/4P3/1B3N2/PPPP1PPP/RNBQR1K1",
  "r1bq1rk1/2ppbppp/p1n2n2/1p2p3/4P3/1B3N2/PPPP1PPP/RNBQR1K1",
  "r4rk1/2q1bppp/p2p1n2/npp1p3/3PP3/2P1NQ2/PPB2PPP/R1B1R1K1",
  "r1bq1rk1/2ppbppp/p1n2n2/1p2p3/P3P3/1B3N2/1PPP1PPP/RNBQR1K1",
  "r1b1k2r/2q1bppp/p2p1n2/npp1p3/P2PP3/2P2N2/1PB2PPP/RNBQR1K1",
  "rnb1k2r/2q1bp1p/p2p1n2/1ppPp1p1/4P3/2P2N1P/PPBN1PP1/R1BQR1K1",
  "r1bqk2r/2p1bppp/p1np1n2/1p2p3/3PP3/1B3N2/PPP2PPP/RNBQR1K1",
  "r2qk2r/1bppbppp/p1n2n2/1p2p3/4P3/1B3N2/PPPP1PPP/RNBQR1K1",
  "r1bqk2r/4bppp/p2p1n2/1pp5/3QP3/1B6/PPP2PPP/RNB1R1K1",
  "r1bq1rk1/2p1bppp/p1n2n2/1p1pp3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1",
  "r1bq1rk1/4bppp/p1p5/1p1nR3/3P4/1BP5/PP3PPP/RNBQ2K1",
  "5rk1/5ppp/p1pbr3/1p1n3q/P2P2b1/1BPQB1P1/1P1N1P1P/R3R1K1",
  "r1b2rk1/5ppp/p1pb4/1p1n4/3P4/1BP3Pq/PP3P1P/RNBQR1K1",
  "r1bq1rk1/4bppp/p1p5/1p1nR3/8/1BP5/PP1P1PPP/RNBQ2K1",
  "r1bq1rk1/2p1bppp/p4n2/1p2R3/8/1BP5/PP1P1PPP/RNBQ2K1",
  "r1bq1rk1/5ppp/p2b4/1p1p4/3P4/2P1R3/PP3PPP/RNBQ2K1",
  "r1bq1rk1/2p1bppp/p1n2n2/1p1P4/4p3/1BP2N2/PP1P1PPP/RNBQR1K1",
  "r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1",
  "r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/2P2N2/PPBP1PPP/RNBQR1K1",
  "r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BPP1N2/PP3PPP/RNBQR1K1",
  "r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/PBP2N2/1P1P1PPP/RNBQR1K1",
  "r2q1rk1/2p1bppp/p1np1n2/1p2p3/3PP1b1/1BP2N2/PP3PPP/RNBQR1K1",
  "r1bq1rk1/2p1bppp/p1np1n2/1p2p3/3PP3/1BP2N2/PP3PPP/RNBQR1K1",
  "r2q1rk1/2p1bppp/p1np1n2/1p2p3/P2PP1b1/1BP2N2/1P3PPP/RNBQR1K1",
  "r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1",
  "r2q1rk1/1bp1bppp/p1np1n2/1p2p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1",
  "r1bq1rk1/2pnbppp/p1np4/1p2p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1",
  "r2q1rk1/2p1bppp/p1npbn2/1p2p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1",
  "r2qrbk1/1bp2pp1/p1np1n1p/1p2p3/3PP3/PBP2N1P/1P1N1PP1/R1BQR1K1",
  "r1bqr1k1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1",
  "r1bq1rk1/2p1bpp1/p1np1n1p/1p2p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1",
  "rnbq1rk1/2p1bppp/p2p1n2/1p2p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1",
  "rnbq1rk1/2p1bppp/p2p1n2/1p2p3/4P3/1BPP1N1P/PP3PP1/RNBQR1K1",
  "rnbq1rk1/2p1bppp/p2p1n2/1p2p3/3PP3/1BP2N1P/PP3PP1/RNBQR1K1",
  "r2q1rk1/1b1nbppp/p2p1n2/1pp1p3/3PP3/2P2N1P/PPBN1PP1/R1BQR1K1",
  "r1bq1rk1/2pnbppp/p2p1n2/1p2p3/3PP2N/1BP4P/PP3PP1/RNBQR1K1",
  "r1bq1rk1/2pnbppp/p2p1n2/1p2p3/3PP3/1BP2N1P/PP3PP1/RNBQR1K1",
  "r1bq1rk1/4bppp/p1np1n2/1pp1p3/3PP3/2P2N1P/PPB2PP1/RNBQR1K1",
  "r1bq1rk1/2p1bppp/p2p1n2/np2p3/4P3/2P2N1P/PPBP1PP1/RNBQR1K1",
  "r1bq1rk1/4bppp/p2p1n2/npp1p3/4P3/2P2N1P/PPBP1PP1/RNBQR1K1",
  "r1bq1rk1/3nbppp/p2p4/npp1p3/3PP3/2P2N1P/PPB2PP1/RNBQR1K1",
  "r1b2rk1/2q1bppp/p1pp1n2/np2p3/3PP3/2P2N1P/PPB2PP1/RNBQR1K1",
  "r1bq1rk1/2p1bppp/p2p1n2/np2p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1",
  "r1b2rk1/2q1bppp/p2p1n2/npp1p3/3PP3/2P2N1P/PPB2PP1/RNBQR1K1",
  "r3r1k1/2qbbp1p/p2p1np1/npp1p3/3PP3/2P1NN1P/PPB2PP1/R1BQR1K1",
  "r1b2rk1/2q1bppp/p1np1n2/1pp1p3/3PP3/2P2N1P/PPBN1PP1/R1BQR1K1",
  "r1b2rk1/2q1bppp/p1np1n2/1pP1p3/4P3/2P2N1P/PPBN1PP1/R1BQR1K1",
  "r1b2rk1/2q1bppp/p2p1n2/np2p3/3PP3/5N1P/PPBN1PP1/R1BQR1K1",
  "rnbqkbnr/ppp1pppp/8/3p4/3P4/3Q4/PPP1PPPP/RNB1KBNR",
  "rnbqkbnr/ppp1pppp/8/3p4/3PP3/8/PPP2PPP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/5n2/8/3Pp3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkb1r/ppp1pppp/5n2/8/3P4/2N2p2/PPP3PP/R1BQKBNR",
  "rnbqkb1r/ppp1pp1p/5np1/8/3P4/2N2N2/PPP3PP/R1BQKB1R",
  "rnbq1rk1/ppp1ppbp/5np1/8/2BP4/2N2N2/PPP3PP/R1BQ1R1K",
  "rnbqk2r/ppp1ppbp/5np1/8/2BP3P/2N2N2/PPP3P1/R1BQK2R",
  "rnbqk2r/ppp1ppbp/5np1/4N3/2BP4/2N5/PPP3PP/R1BQK2R",
  "rnbq1rk1/ppp1ppbp/5np1/8/2BP4/2N2N2/PPP3PP/R1B1QRK1",
  "rnbqkb1r/ppp2ppp/4pn2/8/3P4/2N2N2/PPP3PP/R1BQKB1R",
  "r1bqk2r/ppp1bppp/4pn2/6B1/3n4/2NB1N2/PPP3PP/R2Q1R1K",
  "rn1qkb1r/ppp1pppp/5n2/5b2/3P4/2N2N2/PPP3PP/R1BQKB1R",
  "rn1qkb1r/ppp2ppp/4pn2/4N3/3Pb1P1/2N5/PPP4P/R1BQKB1R",
  "rnb1kb1r/ppp1pppp/3q1n2/8/3P4/2N2N2/PPP3PP/R1BQKB1R",
  "rnbqkb1r/pp2pppp/5n2/2p5/3P4/2N2N2/PPP3PP/R1BQKB1R",
  "r1bqkb1r/ppp1pppp/2n2n2/8/3P4/2N2N2/PPP3PP/R1BQKB1R",
  "rnbqkb1r/p1p1pppp/1p3n2/8/3P4/2N2N2/PPP3PP/R1BQKB1R",
  "rnbqkb1r/ppp1pppp/5n2/8/3P4/2N2Q2/PPP3PP/R1B1KBNR",
  "r1bqkb1r/pppnpppp/5n2/8/3P4/2N2N2/PPP3PP/R1BQKB1R",
  "rn1qkb1r/ppp1pppp/5n2/8/3P2b1/2N2N2/PPP3PP/R1BQKB1R",
  "rn1qkb1r/pp2pppp/2p2n2/8/3P4/2N4P/PPP2QP1/R1B1KB1R",
  "rn1qkb1r/pp2pppp/2p2n2/8/3P4/2N1BQ1P/PPP3P1/R3KB1R",
  "rn1qkb1r/pp2pppp/2p2n2/8/3P2P1/2N2Q1P/PPP5/R1B1KB1R",
  "rnbqkb1r/pp2pppp/2p2n2/8/3P4/2N2N2/PPP3PP/R1BQKB1R",
  "rnbqkb1r/pp2pppp/5n2/2p5/3Pp3/2N2P2/PPP3PP/R1BQKBNR",
  "rnbqkb1r/ppp2ppp/5n2/4p3/3Pp3/2N2P2/PPP3PP/R1BQKBNR",
  "rnbqkb1r/1pp1pppp/p4n2/8/3Pp3/2N2P2/PPP3PP/R1BQKBNR",
  "r1bqkb1r/ppp1pppp/2n2n2/8/3Pp3/2N2P2/PPP3PP/R1BQKBNR",
  "rnbqkb1r/ppp1pppp/5n2/8/3P4/2N1pP2/PPP3PP/R1BQKBNR",
  "rnbqkb1r/pp2pppp/2p2n2/8/3Pp3/2N2P2/PPP3PP/R1BQKBNR",
  "rn1qkb1r/ppp1pppp/5n2/5b2/3Pp3/2N2P2/PPP3PP/R1BQKBNR",
  "rnbqkb1r/ppp2ppp/4pn2/8/3Pp3/2N2P2/PPP3PP/R1BQKBNR",
  "rnbqkbnr/ppp1pppp/8/8/3Pp3/5P2/PPP3PP/RNBQKBNR",
  "rnbqkbnr/ppp1pppp/8/8/3Pp3/4B3/PPP2PPP/RN1QKBNR",
  "rnbqkbnr/ppp1pppp/8/8/2BPp3/8/PPP2PPP/RNBQK1NR",
  "rnbqkbnr/ppp2ppp/8/4p3/3Pp3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkbnr/ppp2ppp/8/4P3/4p3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkbnr/ppp2ppp/8/4p3/3PN3/8/PPP2PPP/R1BQKBNR",
  "rnbqkbnr/ppp2ppp/8/4p3/3Pp3/2N5/PPP1NPPP/R1BQKB1R",
  "rnbqkbnr/ppp2ppp/8/4p2Q/3Pp3/2N5/PPP2PPP/R1B1KBNR",
  "rnbqkbnr/ppp2ppp/8/4p3/3Pp3/2N1B3/PPP2PPP/R2QKBNR",
  "rnbqkbnr/ppp1p1pp/8/5p2/3Pp3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkb1r/ppp1pppp/5n2/8/3Pp3/2N1B3/PPP2PPP/R2QKBNR",
  "rnbqkbnr/pp2pppp/8/2p5/3Pp3/2N5/PPP2PPP/R1BQKBNR",
  "rn1qkbnr/ppp1pppp/8/5b2/3Pp3/2N5/PPP2PPP/R1BQKBNR",
  "rn1qkb1r/ppp1pppp/5n2/5b2/2BPp3/2N2P2/PPP3PP/R1BQK1NR",
  "rnbqkb1r/ppp1pppp/5n2/6B1/3Pp3/2N5/PPP2PPP/R2QKBNR",
  "rn1qk2r/ppp2ppp/5pb1/1Q6/1b1Pp1P1/2N5/PPP2P1P/R3KBNR",
  "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR",
  "rnbqkbnr/ppp1pppp/8/3p4/3P4/4P3/PPP2PPP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/5n2/3p4/3P4/4P3/PPP2PPP/RNBQKBNR",
  "rnbqkbnr/ppp1pppp/8/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR",
  "rnbqkbnr/pp2pppp/8/2pp4/3P1B2/8/PPP1PPPP/RN1QKBNR",
  "rnbqkbnr/pp2pppp/8/2Pp4/5B2/8/PPP1PPPP/RN1QKBNR",
  "rnbqkbnr/pp2pppp/8/2pp4/3PPB2/8/PPP2PPP/RN1QKBNR",
  "rnbqkbnr/pp2pppp/8/2p5/3PpB2/8/PPP2PPP/RN1QKBNR",
  "rnbqkbnr/ppp1pppp/8/3p4/3P4/2N5/PPP1PPPP/R1BQKBNR",
  "rn1qkbnr/ppp1pppp/8/3p1b2/3P4/2N5/PPP1PPPP/R1BQKBNR",
  "rn1qkbnr/ppp1pppp/8/3p4/3P2b1/2N5/PPP1PPPP/R1BQKBNR",
  "rnbqk1nr/ppp1ppbp/6p1/3p4/3P4/2N2N2/PPP1PPPP/R1BQKB1R",
  "rnbqkbnr/pp2pppp/8/2pp4/3P4/2N5/PPP1PPPP/R1BQKBNR",
  "rnbqkbnr/ppp2ppp/8/3pp3/3P4/2N5/PPP1PPPP/R1BQKBNR",
  "rnbqkbnr/ppp1ppp1/8/3p3p/3P4/2N5/PPP1PPPP/R1BQKBNR",
  "rnbqkb1r/ppp1pppp/5n2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR",
  "rnbqkbnr/ppp1pppp/8/3p2B1/3P4/8/PPP1PPPP/RN1QKBNR",
  "rn1qkbnr/ppp1pppp/8/3p2B1/3P2b1/8/PPP1PPPP/RN1QKBNR",
  "rnbqkbnr/ppp1pppp/8/3p4/3P1P2/8/PPP1P1PP/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/5n2/3p4/3P4/3BP3/PPP2PPP/RNBQK1NR",
  "rnbqkbnr/ppp1pppp/8/3p4/3P2P1/8/PPP1PP1P/RNBQKBNR",
  "rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/2N5/PPP1PPPP/R2QKBNR",
  "rnbqkb1r/ppp1pppp/5n2/3p2B1/3P4/2N5/PPP1PPPP/R2QKBNR",
  "rn1qkb1r/ppp1pppp/5n2/3p1bB1/3P4/2N5/PPP1PPPP/R2QKBNR",
  "rnbqkb1r/ppp1pppp/8/3p2B1/3Pn3/2N5/PPP1PPPP/R2QKBNR",
  "rnbqkb1r/pp2pp1p/5p2/2pP4/4p3/2N5/PPP2PPP/R2QKBNR",
  "rn1qkb1r/ppp1pppp/5n2/3p1bB1/3P4/2N2P2/PPP1P1PP/R2QKBNR",
  "r1bqkb1r/pppnpppp/5n2/3p2B1/3P4/2N2N2/PPP1PPPP/R2QKB1R",
  "r1bqkb1r/pppnpp1p/5np1/3p2B1/3P4/2N2N2/PPP1PPPP/R2QKB1R",
  "rn1qkb1r/ppp1pppp/5B2/3p1b2/3P4/2N5/PPP1PPPP/R2QKBNR",
  "rnb1kb1r/pp2pppp/1q3n2/2pp4/3P1B2/2N1PN2/PPP2PPP/R2QKB1R",
  "rn1qkbnr/pp3ppp/2p1p3/3p1b2/2PP4/2N2N2/PP2PPPP/R1BQKB1R",
  "rn1qkbnr/ppp1pppp/8/3p4/3P2b1/5N2/PPP1PPPP/RNBQKB1R",
  "rnbqkbnr/pp2pppp/8/3p4/3p4/5NP1/PPP1PPBP/RNBQK2R",
  "r1bqkbnr/ppp1pppp/2n5/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R",
  "rnbqkbnr/pp2pppp/8/2pp4/3P4/5N2/PPP1PPPP/RNBQKB1R",
  "rnb1kbnr/pp2ppp1/1qp4p/3p4/3P3B/5N2/PPP1PPPP/RN1QKB1R",
  "rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R",
  "rnb1k1nr/pp1pppbp/6p1/q7/3P1B2/5N2/PP2PPPP/RN1QKB1R",
  "rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R",
  "rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5NP1/PPP1PP1P/RNBQKB1R",
  "rnbqkb1r/p1p1pppp/5n2/1p1p4/2PP4/5N2/PP2PPPP/RNBQKB1R",
  "rnbqkbnr/ppp1pppp/8/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R",
  "rnbqkb1r/ppp1pppp/5n2/3p2B1/3P4/5N2/PPP1PPPP/RN1QKB1R",
  "rnbqkb1r/ppp1pppp/8/3p2B1/3Pn3/5N2/PPP1PPPP/RN1QKB1R",
  "rnbqkb1r/ppp1pp1p/5np1/3p2B1/3P4/5N2/PPP1PPPP/RN1QKB1R",
  "rnbqkb1r/ppp1pppp/5n2/3p4/3P4/4PN2/PPP2PPP/RNBQKB1R",
  "rn1qkb1r/ppp1pppp/5n2/3p1b2/3P4/4PN2/PPP2PPP/RNBQKB1R",
  "rnbqk2r/ppp1ppbp/5np1/3p4/3P4/3BPN2/PPP2PPP/RNBQK2R",
  "rnbqkb1r/ppp2ppp/4pn2/3p4/3P4/4PN2/PPP2PPP/RNBQKB1R",
  "rnbqkb1r/ppp2ppp/4pn2/3p4/3P4/3BPN2/PPP2PPP/RNBQK2R",
  "rnbqkb1r/pp3ppp/4pn2/2pp4/3P4/2PBPN2/PP3PPP/RNBQK2R",
  "rnbqkb1r/pp3ppp/4pn2/2pp4/3P4/1P2PN2/P1PN1PPP/R1BQKB1R",
  "rnbqkb1r/pp3ppp/4pn2/2pp4/3P4/1P1BPN2/P1P2PPP/RNBQK2R",
  "r1bq1rk1/pp3ppp/2nbpn2/2pp4/3P4/1P1BPN2/PBP2PPP/RN1Q1RK1",
  "r1bq1rk1/pp2bppp/2n1pn2/2pp4/3P4/1P1BPN2/PBP2PPP/RN1Q1RK1",
  "r1bq1rk1/pppn1ppp/3bpn2/3p4/3P4/1P1BPN2/PBP2PPP/RN1Q1RK1",
  "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR",
  "rnbqkbnr/pp2pppp/8/2P5/2Pp4/8/PP2PPPP/RNBQKBNR",
  "rnbqkbnr/pp2pppp/8/2pp4/2PP4/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/pp2pppp/5n2/2pP4/3P4/8/PP2PPPP/RNBQKBNR",
  "rnb1kb1r/pp2pppp/8/q1PP4/4n3/8/PP3PPP/RNBQKBNR",
  "rn1qkbnr/ppp1pppp/8/3p1b2/2PP4/8/PP2PPPP/RNBQKBNR",
  "r2qkbnr/pp2pppp/2n5/8/Q2P4/8/PP2PPPP/RbB1KBNR",
  "r2qkbnr/ppp2ppp/2n1p3/3p1b2/2PP4/2N2N2/PP2PPPP/R1BQKB1R",
  "rn1qkbnr/ppp1pppp/8/3p1b2/2PP4/1Q6/PP2PPPP/RNB1KBNR",
  "rn1qkbnr/ppp2ppp/4p3/3p1b2/2PP4/1QN5/PP2PPPP/R1B1KBNR",
  "rnbqkb1r/ppp1pppp/5n2/3p4/2PP4/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/pp2pppp/2p2n2/3P4/3P4/8/PP2PPPP/RNBQKBNR",
  "rnbqkbnr/p1p1pppp/8/1p1p4/2PP4/8/PP2PPPP/RNBQKBNR",
  "r1bqkbnr/ppp1pppp/2n5/3p4/2PP4/8/PP2PPPP/RNBQKBNR",
  "r1bqkbnr/ppp1pppp/2n5/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR",
  "r1bqkbnr/ppp1pppp/2n5/8/2pP4/2N5/PP2PPPP/R1BQKBNR",
  "r1b1kbnr/ppp1pppp/2n5/3q4/3P4/8/PP2PPPP/RNBQKBNR",
  "r1b1k1nr/ppp2ppp/2n5/3q4/3p4/2B1P3/PP2NPPP/R2QKB1R",
  "r1bqkbnr/ppp1pppp/2n5/8/2pP4/2N2N2/PP2PPPP/R1BQKB1R",
  "r1bqkbnr/ppp2ppp/2n5/3pp3/2PP4/5N2/PP2PPPP/RNBQKB1R",
  "r2qkbnr/ppp1pppp/2n5/3p4/2PP2b1/5N2/PP2PPPP/RNBQKB1R",
  "r2qkbnr/ppp1pppp/2n5/3p4/Q1PP2b1/5N2/PP2PPPP/RNB1KB1R",
  "r1bqkb1r/ppp1pppp/2n2n2/8/2pP4/2N2N2/PP2PPPP/R1BQKB1R",
  "r1bqkbnr/ppp2ppp/2n5/3pp3/2PP4/2N5/PP2PPPP/R1BQKBNR",
  "rnbqkbnr/ppp2ppp/8/3pp3/2PP4/8/PP2PPPP/RNBQKBNR",
  "r1b1kbnr/ppp1qppp/2n5/4P3/2Pp4/5N2/PP1NPPPP/R1BQKB1R",
  "r1bqkbnr/ppp3pp/2n2p2/4P3/2Pp4/5N2/PP1NPPPP/R1BQKB1R",
  "r3k1nr/ppp1qppp/2n5/4P3/1bPp4/5N1P/PP1BPPP1/R2QKB1R",
  "rnbqk1nr/ppp2ppp/8/4P3/1bP5/4p3/PP1B1PPP/RN1QKBNR",
  "r1bqkbnr/ppp2ppp/2n5/4P3/2Pp4/5N2/PP1NPPPP/R1BQKB1R",
  "rnbqkbnr/ppp2ppp/8/4P3/2Pp4/5N2/PP2PPPP/RNBQKB1R",
  "rnbqkbnr/pp3ppp/8/2p1P3/2Pp4/5N2/PP2PPPP/RNBQKB1R",
  "r1bqkbnr/ppp2ppp/2n5/4P3/2Pp4/5NP1/PP2PP1P/RNBQKB1R",
  "r2qkbnr/ppp2ppp/2n1b3/4P3/2Pp4/5NP1/PP2PP1P/RNBQKB1R",
  "r2qkbnr/ppp2ppp/2n5/4Pb2/2Pp4/5NP1/PP2PP1P/RNBQKB1R",
  "r2qkbnr/ppp2ppp/2n5/4P3/2Pp2b1/5NP1/PP2PP1P/RNBQKB1R",
  "rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR",
  "rnbqkbnr/pp2pppp/2p5/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR",
  "rnbqkbnr/pp2pppp/2p5/8/2pP4/2N5/PP2PPPP/R1BQKBNR",
  "rnbqkbnr/pp2pppp/2p5/3p4/2PPP3/8/PP3PPP/RNBQKBNR",
  "rnbqkbnr/pp2pppp/2p5/3P4/3P4/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/pp2pppp/5n2/3p4/3P4/2N2P2/PP2P1PP/R1BQKBNR",
  "rnbqkbnr/pp2pppp/2p5/8/2pPP3/2N5/PP3PPP/R1BQKBNR",
  "rnbqkbnr/pp3ppp/2p5/3pp3/2PP4/2N5/PP2PPPP/R1BQKBNR",
  "rnbqkbnr/pp3ppp/2p5/3pp3/2PPP3/2N5/PP3PPP/R1BQKBNR",
  "rnbqkb1r/pp2pppp/2p2n2/3p2B1/2PP4/5N2/PP2PPPP/RN1QKB1R",
  "rnbqkb1r/pp2pppp/2p2n2/3p4/2PP4/5N2/PP1NPPPP/R1BQKB1R",
  "rnbqkbnr/pp2pppp/2p5/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R",
  "rnbqkb1r/pp2pppp/2p2n2/3p4/2PP4/4PN2/PP3PPP/RNBQKB1R",
  "rn1qkb1r/pp2pppp/2p2n2/3p4/2PP2b1/4PN2/PP3PPP/RNBQKB1R",
  "rn1qkb1r/pp1n1ppp/4p3/3pNb2/3P4/2N1P3/PP3PPP/R1BQKB1R",
  "rnq1kb1r/pp3ppp/4pn2/3p1b2/3P4/NQ2PN2/PP1B1PPP/R3KB1R",
  "rn1qkb1r/pp2pppp/2p2n2/3p1b2/2PP4/4PN2/PP3PPP/RNBQKB1R",
  "rnbqkb1r/pp2pppp/5n2/3p4/3P4/5N2/PP2PPPP/RNBQKB1R",
  "rn1qkb1r/pp2pppp/5n2/3p1b2/3P4/2N1PN2/PP3PPP/R1BQKB1R",
  "r2qkb1r/pp2pppp/2n2n2/3p1b2/3P1B2/2N2N2/PP2PPPP/R2QKB1R",
  "r2qk2r/pp3ppp/2n1pn2/3p1b2/1b1P1B2/1QN1PN2/PP3PPP/R3KB1R",
  "rnbqkb1r/pp2pppp/2p2n2/8/2pP4/2N1PN2/PP3PPP/R1BQKB1R",
  "rnbqkb1r/1p2pppp/p1p2n2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqkb1r/1p2pppp/p1p2n2/2Pp4/3P4/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqkb1r/pp2pppp/2p2n2/8/2pPP3/2N2N2/PP3PPP/R1BQKB1R",
  "rnbqkb1r/p3pppp/2p2n2/1p2P3/2pP4/2N2N2/PP3PPP/R1BQKB1R",
  "rnbqkb1r/pp2pp1p/2p2np1/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R",
  "rnb1kb1r/pp2pppp/1qp2n2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqkb1r/pp2pppp/2p2n2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqkb1r/pp2pppp/2p2n2/8/2pP4/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqkb1r/pp2pppp/2p2n2/8/P1pP4/2N2N2/1P2PPPP/R1BQKB1R",
  "r1bqkb1r/pp2pppp/n1p2n2/8/P1pP4/2N2N2/1P2PPPP/R1BQKB1R",
  "rnbqkb1r/pp3ppp/2p1pn2/8/P1pP4/2N2N2/1P2PPPP/R1BQKB1R",
  "rn1qkb1r/pp2pppp/2p2n2/8/P1pP2b1/2N2N2/1P2PPPP/R1BQKB1R",
  "rn1qkb1r/pp2pppp/2p2n2/5b2/P1pP4/2N2N2/1P2PPPP/R1BQKB1R",
  "rn1qkb1r/pp2pppp/2p2n2/5b2/P1pP3N/2N5/1P2PPPP/R1BQKB1R",
  "r3kb1r/ppqn1ppp/2p2n2/4pb2/P1NP4/2N3P1/1P2PP1P/R1BQKB1R",
  "r3kb1r/ppqn1p1p/2p5/4nbp1/P1N2B2/2N3P1/1P2PPBP/R2QK2R",
  "rn1qkb1r/pp2pppp/2p2n2/4Nb2/P1pP4/2N5/1P2PPPP/R1BQKB1R",
  "r2qkb1r/pp2pppp/n1p2n2/4Nb2/P1pPP3/2N5/1P3PPP/R1BQKB1R",
  "rn1qkb1r/pp3ppp/2p1pn2/4Nb2/P1pP4/2N5/1P2PPPP/R1BQKB1R",
  "rn1qk2r/pp3ppp/2p1pn2/4Nb2/PbpPP3/2N2P2/1P4PP/R1BQKB1R",
  "rn1qkb1r/pp2pppp/2p2n2/5b2/P1pP4/2N1PN2/1P3PPP/R1BQKB1R",
  "r2qkb1r/pp2pppp/n1p2n2/5b2/P1pP4/2N1PN2/1P3PPP/R1BQKB1R",
  "rn1q1rk1/pp3ppp/2p1pn2/5b2/PbBP4/2N1PN2/1P2QPPP/R1B2RK1",
  "rn1qk2r/pp3ppp/2p1pn2/5b2/PbBP4/2N1PN2/1P3PPP/R1BQ1RK1",
  "rn1q1rk1/pp3ppp/2p1p3/5b2/PbBPn1P1/2N1PN2/1P2QP1P/R1B2RK1",
  "rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR",
  "rnbqkbnr/ppp1pppp/8/8/Q1pP4/8/PP2PPPP/RNB1KBNR",
  "rnbqkb1r/ppp1pppp/5n2/8/2pPP3/8/PP3PPP/RNBQKBNR",
  "rnbqkbnr/p1p1pppp/8/1p6/2pPP3/8/PP3PPP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/8/4p3/2pPP3/8/PP3PPP/RNBQKBNR",
  "rnbqkbnr/ppp2ppp/8/4p3/2BPP3/8/PP3PPP/RNBQK1NR",
  "r1bqkbnr/ppp1pppp/2n5/8/2pPP3/8/PP3PPP/RNBQKBNR",
  "rnbqkbnr/pp2pppp/8/2p5/2pPP3/8/PP3PPP/RNBQKBNR",
  "rnbqkbnr/p3pppp/8/1ppP4/2p1P3/8/PP3PPP/RNBQKBNR",
  "rnbqkb1r/p3pppp/5n2/1ppP4/2p1P3/2N5/PP3PPP/R1BQKBNR",
  "rnbqkbnr/ppp1pppp/8/8/2pP4/4P3/PP3PPP/RNBQKBNR",
  "rnb1kbnr/ppp1qppp/8/8/2Bp4/PQ2P3/1P3PPP/RNB1K1NR",
  "rnb1kbnr/ppp1qppp/8/8/2Bp4/1Q2PN2/PP3PPP/RNB1K2R",
  "rnb1kbnr/ppp1qppp/8/8/2Bp4/1Q2P3/PP3PPP/RNB2KNR",
  "rnb1kbnr/ppp1qppp/8/8/2Bp4/1Q2P3/PP1N1PPP/R1B1K1NR",
  "rnbqkbnr/ppp1pppp/8/8/2pPP3/8/PP3PPP/RNBQKBNR",
  "rnbqkbnr/ppp1p1pp/8/5p2/2pPP3/8/PP3PPP/RNBQKBNR",
  "rnbqkbnr/1pp1pppp/p7/8/2pPP3/5N2/PP3PPP/RNBQKB1R",
  "r1bqkbnr/pppnpppp/8/8/2pP4/5N2/PP2PPPP/RNBQKB1R",
  "rnbqkbnr/pp2pppp/8/2p5/2pP4/5N2/PP2PPPP/RNBQKB1R",
  "rnbqkbnr/ppp1pppp/8/8/2pP4/5N2/PP2PPPP/RNBQKB1R",
  "rnbqkbnr/ppp2ppp/4p3/8/2pP4/5N2/PP2PPPP/RNBQKB1R",
  "rnbqkbnr/p1p1pppp/8/1p6/2pP4/5N2/PP2PPPP/RNBQKB1R",
  "rnbqkbnr/1pp1pppp/p7/8/2pP4/5N2/PP2PPPP/RNBQKB1R",
  "rn1qkbnr/1pp2ppp/p3p3/3P4/2B3b1/4PN2/PP3PPP/RNBQK2R",
  "rnbqkbnr/2p1pppp/p7/1p6/2pP4/4PN2/PP3PPP/RNBQKB1R",
  "rnbqkb1r/ppp1pppp/5n2/8/2pP4/5N2/PP2PPPP/RNBQKB1R",
  "rnbqkb1r/ppp1pppp/5n2/8/Q1pP4/5N2/PP2PPPP/RNB1KB1R",
  "rnbqkb1r/1pp1pppp/p4n2/8/2pPP3/2N2N2/PP3PPP/R1BQKB1R",
  "rnbqkb1r/pp3ppp/5n2/2ppP3/2p5/2N2N2/PP3PPP/R1BQKB1R",
  "rnbqkb1r/ppp1pppp/5n2/8/2pP4/2N2N2/PP2PPPP/R1BQKB1R",
  "rn1qkb1r/ppp1pppp/5n2/8/2pP2b1/4PN2/PP3PPP/RNBQKB1R",
  "rnbqkb1r/ppp1pppp/5n2/8/2pP4/4PN2/PP3PPP/RNBQKB1R",
  "rnbqkb1r/ppp1pp1p/5np1/8/2pP4/4PN2/PP3PPP/RNBQKB1R",
  "rn1qkb1r/ppp1pppp/4bn2/8/2pP4/4PN2/PP3PPP/RNBQKB1R",
  "rnbqkb1r/pp3ppp/4pn2/2p5/2BP4/4PN2/PP3PPP/RNBQK2R",
  "rnbqkb1r/pp3ppp/4pn2/2p5/2BP4/4PN2/PP3PPP/RNBQ1RK1",
  "r1bqkb1r/pp3ppp/2n1pn2/2p5/2BP4/4PN2/PP3PPP/RNBQ1RK1",
  "rnbqkb1r/pp3ppp/4pn2/8/2Bp4/4PN2/PP3PPP/RNBQ1RK1",
  "r1bqk2r/5ppp/p1n1pn2/1pb1P3/2B5/5N2/PP2QPPP/RNB2RK1",
  "rnbqkb1r/ppp2ppp/4pn2/8/2pP4/4PN2/PP3PPP/RNBQKB1R",
  "rnbqkb1r/1p3ppp/p3pn2/2p5/2BP4/4PN2/PP3PPP/RNBQ1RK1",
  "rnbqkb1r/1p3ppp/p3pn2/2p5/P1BP4/4PN2/1P3PPP/RNBQ1RK1",
  "rnbqkb1r/1p3ppp/p3pn2/2p5/2BPP3/5N2/PP3PPP/RNBQ1RK1",
  "rnbqk2r/1p3ppp/p3pn2/2b5/2B5/4PN2/PP3PPP/RNBQ1RK1",
  "rnbqkb1r/1p3ppp/p3pn2/2p5/2BP4/4PN2/PP2QPPP/RNB2RK1",
  "rnbqkb1r/5ppp/p3pn2/1pp5/2BP4/4PN2/PP2QPPP/RNB2RK1",
  "r3kb1r/1bq2ppp/p3pn2/1p1P4/2p5/2N1PN2/PPQ2PPP/R1BR2K1",
  "rn1qkb1r/1b3ppp/p3pn2/1pp5/3P4/1B2PN2/PP2QPPP/RNB2RK1",
  "r2qk2r/1b1n1ppp/p2bpn2/1pp5/3P4/1BN1PN2/PP2QPPP/R1BR2K1",
  "rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/ppp2pp1/4pn1p/3p2B1/2PP4/5N2/PP2PPPP/RN1QKB1R",
  "r1bqkb1r/pp1n1ppp/2p1pn2/3p2B1/2PP4/4PN2/PP1N1PPP/R2QKB1R",
  "r1bqkb1r/pp1n1ppp/4pn2/2pp4/2PP4/3BPN2/PP1N1PPP/R1BQK2R",
  "rnbqkb1r/pp3p1p/2p1pnp1/3p4/2PP4/4PN2/PP1N1PPP/R1BQKB1R",
  "rnbqkb1r/pp4pp/2p1p3/3p1p2/2PPn3/3BPN2/PP1N1PPP/R1BQK2R",
  "rnbqkbnr/pp3ppp/4p3/2pp4/2PP4/5N2/PP2PPPP/RNBQKB1R",
  "rnbqkbnr/pp3ppp/8/2pp2B1/3P4/5N2/PP2PPPP/RN1QKB1R",
  "rnbqkb1r/ppp2ppp/4pn2/3p2B1/2PP4/5N2/PP2PPPP/RN1QKB1R",
  "rnbqk2r/ppp2ppp/4pn2/3p2B1/1bPP4/5N2/PP2PPPP/RN1QKB1R",
  "rnbqkb1r/pp3ppp/2p1pn2/3p4/2PP4/4PN2/PP1N1PPP/R1BQKB1R",
  "r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/4PN2/PP1N1PPP/R1BQKB1R",
  "rnbqkbnr/p1p2ppp/1p2p3/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR",
  "rnbqk1nr/ppp1bppp/4p3/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR",
  "rnbqk1nr/ppp1bppp/4p3/8/2PPp3/2N2P2/PP4PP/R1BQKBNR",
  "rnbqkbnr/1pp2ppp/p3p3/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR",
  "rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR",
  "rnbqk1nr/5ppp/2p1p3/pp6/PbpP4/2N1PN2/1P1B1PPP/R2QKB1R",
  "rnb1k1nr/p4ppp/1qp1p3/1p6/PbpP4/2N1PN2/1P1B1PPP/R2QKB1R",
  "rnb1k1nr/p3qppp/2p1p3/1p6/PbpP4/2N1PN2/1P1B1PPP/R2QKB1R",
  "rnbq1rk1/ppp1bpp1/4pn1p/8/2pP3B/2N2N2/PP2PPPP/2RQKB1R",
  "rnbqkbnr/pp3ppp/2p1p3/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR",
  "rnbqkbnr/pp4pp/2p1p3/3p1p2/2PP2P1/2N1P3/PP3P1P/R1BQKBNR",
  "rnbqkbnr/pp3ppp/2p1p3/8/2PPp3/2N2P2/PP4PP/R1BQKBNR",
  "rnbqkbnr/pp3ppp/2p1p3/3p4/2PPP3/2N5/PP3PPP/R1BQKBNR",
  "rnbqk1nr/pp3ppp/2p1p3/8/1bPP4/2N5/PP3PPP/R1BQKBNR",
  "rnbqk1nr/pp3ppp/2p1p3/8/1bPPN3/8/PP1B1PPP/R2QKBNR",
  "rnb1k1nr/pp3ppp/4p3/2B5/2P5/8/PP2BPqP/R2QK1NR",
  "rnbqkbnr/pp3ppp/2p1p3/8/2pP4/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqk1nr/p4ppp/4p3/1p6/2pP4/2P1PN2/5PPP/R1BQKB1R",
  "rnbqkbnr/pp3ppp/2p1p3/8/2pP4/2N2NP1/PP2PP1P/R1BQKB1R",
  "rnbqkbnr/pp3ppp/2p1p3/6B1/2pP4/2N2N2/PP2PPPP/R2QKB1R",
  "rnbqkbnr/pp4pp/2p1pp2/6B1/2pP4/2N2N2/PP2PPPP/R2QKB1R",
  "rnbqkbnr/pp3ppp/8/2pp4/3P4/2N5/PP2PPPP/R1BQKBNR",
  "rnbqkbnr/pp3ppp/4p3/2pp4/2PP4/2N5/PP2PPPP/R1BQKBNR",
  "r1bqkbnr/p4ppp/2n5/1pP5/N2p4/5N2/PP2PPPP/R1BQKB1R",
  "rnbqkbnr/pp3ppp/8/2pp4/3PP3/2N5/PP3PPP/R1BQKBNR",
  "rnbqkbnr/pp3ppp/4p3/3P4/3p4/2N5/PP2PPPP/R1BQKBNR",
  "r1bqkb1r/pp3ppp/2n1pn2/2pp4/2PP4/2N1PN2/PP3PPP/R1BQKB1R",
  "rnbqkbnr/p4ppp/8/1pP5/N2p4/8/PP2PPPP/R1BQKBNR",
  "rnbqkbnr/pp3ppp/8/2pp4/3P4/2N2N2/PP2PPPP/R1BQKB1R",
  "r2qkbnr/pp3ppp/2n1b3/3Q4/8/2N5/PP2PPPP/R1B1KBNR",
  "r1bqk2r/pp3ppp/2n2n2/2bp4/3N4/2N3P1/PP2PPBP/R1BQK2R",
  "r1bqkb1r/pp3ppp/2n2n2/2pp4/3P4/2N2NP1/PP2PP1P/R1BQKB1R",
  "r1bqkbnr/pp3ppp/2n5/2pp4/3P4/2N2NP1/PP2PP1P/R1BQKB1R",
  "r1bqkbnr/pp3ppp/2n5/3p4/2pP4/2N2NP1/PP2PP1P/R1BQKB1R",
  "r1bqkbnr/pp3ppp/2n5/3p4/2pPP3/2N2NP1/PP3P1P/R1BQKB1R",
  "r2qkb1r/pp3ppp/2n2n2/2pp4/3P2b1/2N2NP1/PP2PPBP/R1BQK2R",
  "r2q1rk1/p3bppp/1pn1bn2/2pp2B1/3P4/2N2NP1/PP2PPBP/2RQ1RK1",
  "r1bq1rk1/pp2bppp/2n2n2/2pp4/3P4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "r1bq1rk1/pp2bppp/2n2n2/3p2B1/2pP4/2N2NP1/PP2PPBP/R2Q1RK1",
  "r2q1rk1/pp2bppp/2n1bn2/3p2B1/2pP4/2N2NP1/PP2PPBP/2RQ1RK1",
  "r1bq1rk1/pp2bppp/2n2n2/2pp2B1/3P4/2N2NP1/PP2PPBP/R2Q1RK1",
  "r2qr1k1/pp2bpp1/2n1bn1p/3p4/3N4/2N1B1P1/PP2PPBP/2RQ1RK1",
  "r1bq1rk1/pp2bppp/2n2n2/2P5/3p4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "r2q1rk1/pp2bppp/2n1bn2/2pp2B1/3P4/2N2NP1/PP2PPBP/R2Q1RK1",
  "r1bqr1k1/pp2bpp1/2n2n1p/3p4/3N4/2N1B1P1/PP2PPBP/R2Q1RK1",
  "r1bqr1k1/pp2bppp/2n2n2/3p2B1/3N4/2N3P1/PP2PPBP/R2Q1RK1",
  "r1bq1rk1/pp3ppp/2n2n2/2bp4/N7/5NP1/PP2PPBP/R1BQ1RK1",
  "r2q1rk1/pp2bpp1/2n2n1p/3p4/3N2b1/2N1B1P1/PP2PPBP/R2Q1RK1",
  "r1bqk2r/pp2bppp/2n2n2/2pp4/3P4/2N2NP1/PP2PPBP/R1BQK2R",
  "rnbqkb1r/ppp2ppp/4pn2/3P4/3P4/2N5/PP2PPPP/R1BQKBNR",
  "r1bqrnk1/ppp1bppp/5n2/3p2B1/3P4/2NBP3/PPQ1NPPP/2KR3R",
  "rnbqkb1r/ppp2ppp/5n2/3p2B1/3P4/2N5/PP2PPPP/R2QKBNR",
  "rnbqkb1r/pp3ppp/2p2n2/3p2B1/3P4/2N5/PP2PPPP/R2QKBNR",
  "r1bqkb1r/pppn1ppp/5n2/3p4/3P1B2/2N2N2/PP2PPPP/R2QKB1R",
  "rnbqkb1r/ppp2ppp/4pn2/3p4/2PP1B2/2N5/PP2PPPP/R2QKBNR",
  "rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR",
  "rnbqkb1r/pp3ppp/2p2n2/3p2B1/3P4/2N5/PPQ1PPPP/R3KBNR",
  "r1bqkb1r/pppn1ppp/4pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqk2r/ppp1bppp/4pn2/3p4/2PP1B2/2N2N2/PP2PPPP/R2QKB1R",
  "r1b2rk1/pp3ppp/2n1pn2/q1bp4/2P2B2/P1N1PN2/1PQ2PPP/3RKB1R",
  "r1b2rk1/pp3ppp/2n1pn2/q1bp4/2P2B2/P1N1PN2/1PQ2PPP/2KR1B1R",
  "rnbq1rk1/p1p1bppp/1p2pn2/3p4/2PP1B2/2N1PN2/PP3PPP/R2QKB1R",
  "rnbq1rk1/pp3ppp/4pn2/2bp4/2P2B2/2N1PN2/PP3PPP/R2QKB1R",
  "rnbq1rk1/pp2bppp/2p1pn2/3p4/2PP1B2/2N1PN2/PP3PPP/R2QKB1R",
  "r1bq1rk1/pppnbppp/4pn2/3p4/2PP1B2/2N1PN2/PP3PPP/R2QKB1R",
  "r1bq1rk1/pppnbppp/4pn2/2Pp4/3P1B2/2N1PN2/PP3PPP/R2QKB1R",
  "r1bqkb1r/pppn1pp1/4pn1p/8/2pP3B/2N2N2/PP2PPPP/R2QKB1R",
  "rnbq1rk1/ppp1bppp/4pn2/3p2B1/2PP4/2N2N2/PPQ1PPPP/R3KB1R",
  "rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqkb1r/ppp2ppp/4pn2/8/2pP4/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqkb1r/ppp2ppp/4pn2/8/2pP4/2N1PN2/PP3PPP/R1BQKB1R",
  "rnbqk2r/ppp2ppp/4pn2/3p4/1bPP4/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqk2r/ppp2ppp/4pn2/3p4/QbPP4/2N2N2/PP2PPPP/R1B1KB1R",
  "r1bqk2r/pp1n1ppp/4pn2/2pp2B1/1bPP4/2N1PN2/PP3PPP/R2QKB1R",
  "rnbqk2r/ppp2ppp/4pn2/6B1/1bpP4/2N2N2/PP2PPPP/R2QKB1R",
  "rnbqkb1r/pp3ppp/4pn2/2pp4/2PP4/2N2N2/PP2PPPP/R1BQKB1R",
  "r1b2rk1/pp2qppp/2n1pn2/2bp4/2P1P3/2NB1N2/PP2QPPP/R1B2RK1",
  "rnbqkb1r/pp3ppp/4pn2/2pp2B1/2PP4/2N2N2/PP2PPPP/R2QKB1R",
  "r1bq1rk1/pp3ppp/2nbpn2/2pp4/2PP4/2NBPN2/PP3PPP/R1BQ1RK1",
  "rnbqkb1r/pp3ppp/4pn2/2pP4/3P4/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqkb1r/pp3ppp/4p3/2pn4/3PP3/2N2N2/PP3PPP/R1BQKB1R",
  "rnbq1rk1/pp3ppp/4p3/1B6/3PP3/5N2/P2Q1PPP/R3K2R",
  "rnbqkb1r/pp3ppp/4p3/2pn4/3P4/2N1PN2/PP3PPP/R1BQKB1R",
  "rnb1k2r/pp3ppp/4p3/q7/1b1PP3/5N2/P2B1PPP/R2QKB1R",
  "r1bqkb1r/pp3ppp/2n1p3/2pn4/3P4/2NBPN2/PP3PPP/R1BQK2R",
  "rnb1kb1r/pp3pp1/2p1pq1p/3p4/2PP4/1QN2N2/PP2PPPP/R3KB1R",
  "rnbqkb1r/pp3ppp/2p1pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqkb1r/pp3pp1/2p1pn1p/3p4/2PP3B/2N2N2/PP2PPPP/R2QKB1R",
  "rnbqkb1r/pp3ppp/2p1pn2/6B1/2pP4/2N2N2/PP2PPPP/R2QKB1R",
  "rnbqkb1r/pp3ppp/2p1pn2/6B1/2pPP3/2N2N2/PP3PPP/R2QKB1R",
  "rnbqkb1r/p4p2/2p1pn1p/1p2P1N1/2pP3B/2N5/PP3PPP/R2QKB1R",
  "rnbqkb1r/p4p2/2p1p2p/1p1nP1N1/2pP3B/2N5/PP3PPP/R2QKB1R",
  "rnbqkb1r/p4p2/2p1pP1p/1p2N3/2pP3p/2N5/PP3PPP/R2QKB1R",
  "r1bqkb1r/p2n1p2/2p1pn2/1p2P1B1/2pP4/2N3P1/PP3P1P/R2QKB1R",
  "r1bqkb1r/p2n1p2/2p1pn2/1p2P1B1/2pP4/2N2Q2/PP3PPP/R3KB1R",
  "rnbqkb1r/1p3ppp/p1p1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R",
  "rnbqkb1r/pp3ppp/2p1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R",
  "r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R",
  "r1bqkb1r/pp1n1ppp/2p1pn2/3pN3/2PP4/2N1P3/PP3PPP/R1BQKB1R",
  "r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/2N1PN2/PPQ2PPP/R1B1KB1R",
  "r1bqk2r/pp1n1ppp/2pbpn2/3p4/2PPP3/2N2N2/PPQ2PPP/R1B1KB1R",
  "r1bqk2r/pp1n1ppp/2pb4/4P3/2P1Q3/5N2/PP3PPP/R1B1KB1R",
  "r1bqk2r/pp1n1ppp/2pbpn2/3p4/2PP2P1/2N1PN2/PPQ2P1P/R1B1KB1R",
  "rnbqkb1r/pp4pp/2p1p3/3p1p2/2PPn3/2NBPN2/PP3PPP/R1BQK2R",
  "r1bqk2r/pp1nbppp/2p1pn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQK2R",
  "r1bqk2r/pp1n1ppp/2pbpn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQK2R",
  "r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQK2R",
  "r1bqk2r/pp1n1ppp/2p1pn2/3p4/1bPP4/2NBPN2/PP3PPP/R1BQK2R",
  "r1bqkb1r/p2n1ppp/2p1pn2/1p6/2BP4/2N1PN2/PP3PPP/R1BQK2R",
  "r1bqkb1r/p2n1ppp/2p1pn2/8/1p1P4/2NBPN2/PP3PPP/R1BQK2R",
  "r2qkb1r/pb1n1ppp/2p1pn2/1p6/3P4/2NBPN2/PP3PPP/R1BQK2R",
  "r2qkb1r/pb1n1ppp/4p3/3nP3/Np1N4/3B4/PP3PPP/R1BQ1RK1",
  "r2qkb1r/pb1n1ppp/4p3/2pnP3/Np1P4/3B1N2/PP3PPP/R1BQK2R",
  "r1bqkb1r/pp1n1ppp/2p1pn2/8/2BP4/2N1PN2/PP3PPP/R1BQK2R",
  "r1bqkb1r/3n1ppp/p1p1pn2/1p6/3P4/2NBPN2/PP3PPP/R1BQK2R",
  "r1bqkb1r/3n1ppp/p3pn2/1pp5/3PP3/2NB1N2/PP3PPP/R1BQK2R",
  "r1bqkb1r/3n1ppp/p3pn2/1pp1P3/3P4/2NB1N2/PP3PPP/R1BQK2R",
  "r1bqkb1r/3n1ppp/p1p1pn2/8/1p1PP3/2NB1N2/PP3PPP/R1BQK2R",
  "r1bqkb1r/3n1ppp/p3pn2/1ppP4/4P3/2NB1N2/PP3PPP/R1BQK2R",
  "r1bqkb1r/3n1ppp/p3pn2/1N2P3/3p4/3B1N2/PP3PPP/R1BQK2R",
  "r1bqkb1r/3n1ppp/p3p3/1N2P3/3p2n1/3B1N2/PP3PPP/R1BQK2R",
  "r3kb1r/5ppp/b3pn2/1p1qN1B1/3p4/3B4/PP2QPPP/R4RK1",
  "r1bqkb1r/5ppp/p3pn2/1N2n3/3p4/3B1N2/PP3PPP/R1BQK2R",
  "r1bqkb1r/5ppp/4pn2/1p2N3/3p4/3B4/PP3PPP/R1BQ1RK1",
  "r1bqkb1r/5ppp/4pn2/1p2N3/3p4/3B1Q2/PP3PPP/R1B1K2R",
  "rnbqkb1r/pp3ppp/4pn2/2pp2B1/2PP4/2N5/PP2PPPP/R2QKBNR",
  "rnbqkb1r/ppp2ppp/4pn2/3p2B1/2PP4/2N5/PP2PPPP/R2QKBNR",
  "rnbqkb1r/pp3ppp/4pn2/2pP2B1/3P4/2N5/PP2PPPP/R2QKBNR",
  "rnb1kb1r/pp3ppp/1q2pn2/2pP2B1/3P4/2N5/PP2PPPP/R2QKBNR",
  "rnbqkb1r/pp3ppp/4pn2/3p2B1/2PQ4/2N2N2/PP2PPPP/R3KB1R",
  "rnbqkb1r/1p3ppp/p4n2/1N1pp1B1/Q1P5/2N5/PP2PPPP/R3KB1R",
  "r1bqkb1r/pp1n1ppp/2p1pn2/3p2B1/2PPP3/2N2N2/PP3PPP/R2QKB1R",
  "r1bqkb1r/pp1n1ppp/2p1pn2/3p2B1/2PP4/P1N1P3/1P3PPP/R2QKBNR",
  "r1bqk2r/pppn1ppp/4pn2/3p2B1/1bPP4/2N1P3/PP3PPP/R2QKBNR",
  "r1bqkb1r/pppn1ppp/4pn2/3p2B1/2PP4/2N5/PP2PPPP/R2QKBNR",
  "r1bqkb1r/pppn1ppp/4pn2/3p2B1/2PP4/2N1P3/PP3PPP/R2QKBNR",
  "r1bqkb1r/pp1n1ppp/2p1pn2/3p2B1/2PP4/2N1P3/PP3PPP/R2QKBNR",
  "r1b1kb1r/pp1n1ppp/2p1pn2/q2p4/2PP4/2N2N2/PP1BPPPP/2RQKB1R",
  "r1bqkb1r/pp1n1ppp/2p1pn2/3p2B1/2PP4/2N1PN2/PP3PPP/R2QKB1R",
  "r1b1kb1r/pp1n1ppp/2p1pn2/q2p2B1/2PP4/2N1PN2/PP3PPP/R2QKB1R",
  "r1b1kb1r/pp1n1ppp/2p1pn2/q2P2B1/3P4/2N1PN2/PP3PPP/R2QKB1R",
  "r1b2rk1/pp1n1ppp/2p1pn2/q2p4/1bPP3B/2N1P3/PPQN1PPP/R3KB1R",
  "r1b1k2r/pp1n1ppp/2p1pn2/q2p2B1/1bPP4/2N1P3/PPQN1PPP/R3KB1R",
  "r1b1kb1r/pp1n1ppp/2p1pB2/q2p4/2PP4/2N1PN2/PP3PPP/R2QKB1R",
  "r1b1kb1r/pp1n1ppp/2p1pn2/q5B1/2pP4/2N1P3/PP1N1PPP/R2QKB1R",
  "r1b1kb1r/pp1n1ppp/2p1p3/q2n2B1/3P4/2N1PN2/PP3PPP/R2QKB1R",
  "rnbqk2r/ppp1bppp/4pn2/3p2B1/2PP4/2N5/PP2PPPP/R2QKBNR",
  "rnbqk2r/ppp1bppp/4p3/3p2B1/2PPn3/2N1P3/PP3PPP/R2QKBNR",
  "rnbqk2r/ppp1bppp/4pB2/3p4/2PP4/2N5/PP2PPPP/R2QKBNR",
  "rnbq1rk1/ppp1bppp/4pn2/3p2B1/2PP4/2N1P3/PP3PPP/2RQKBNR",
  "rnbq1rk1/ppp1bpp1/4pB1p/3p4/2PP4/2N1PN2/PP3PPP/R2QKB1R",
  "r1bq1rk1/pp1n1pp1/2p1pb1p/8/2BP4/2N1PN2/PP3PPP/2RQ1RK1",
  "rnbq1rk1/ppp1bppp/4pn2/3p2B1/2PP4/2N1PN2/PP3PPP/R2QKB1R",
  "rnbq1rk1/ppp1bpp1/4pn1p/3p2B1/2PP4/2N1PN2/PP3PPP/R2QKB1R",
  "rnbq1rk1/ppp1bpp1/4pn1p/3p4/2PP3B/2N1PN2/PP3PPP/R2QKB1R",
  "rn1q1rk1/pbp1bppp/1p3n2/3pN1B1/3P4/2NBP3/PP3PPP/R2QK2R",
  "rnbq1rk1/ppp1bpp1/4p2p/3p4/2PPn2B/2N1PN2/PP3PPP/R2QKB1R",
  "r4rk1/pp1bqpp1/2n1pn1p/2p5/2BP4/2N1PN2/PPQ2PPP/R2R2K1",
  "rnb2rk1/ppp1qpp1/4p2p/3p4/2PPn3/2N1PN2/PPQ2PPP/R3KB1R",
  "rnb2rk1/ppp2pp1/3q3p/3p4/3P4/1QP1PN2/P4PPP/R3KB1R",
  "rn1r2k1/ppp1qpp1/4b2p/3p4/2PP4/1Q2PN2/P4PPP/R3KB1R",
  "rnb2rk1/ppp1qpp1/4p2p/3P4/3P4/2P1PN2/P4PPP/R2QKB1R",
  "rnbq1rk1/p1p1bpp1/1p2pn1p/3p4/2PP3B/2N1PN2/PP3PPP/R2QKB1R",
  "rnbq1rk1/p1p1bpp1/1p3n1p/3p4/3P3B/2N1PN2/PP3PPP/R2QKB1R",
  "rn3rk1/p1p1qpp1/1p2b2p/3p4/3P4/4PN2/PP3PPP/2RQKB1R",
  "rnbq1rk1/p1p1bpp1/1p2p2p/3n4/3P3B/2N1PN2/PP3PPP/R2QKB1R",
  "r1bq1rk1/pppnbppp/4pn2/3p2B1/2PP4/2N1PN2/PP3PPP/R2QKB1R",
  "r1bq1rk1/pppnbppp/4pn2/3p2B1/2PP4/2NBPN2/PP3PPP/R2QK2R",
  "r1bq1rk1/pppnbppp/4pn2/3p2B1/2PP4/1QN1PN2/PP3PPP/R3KB1R",
  "r1bq1rk1/pppnbppp/4pn2/3p2B1/2PP4/2N1PN2/PPQ2PPP/R3KB1R",
  "r1bq1rk1/pp1nbppp/4pn2/2pP2B1/3P4/2N1PN2/PPQ2PPP/R3KB1R",
  "r1bq1rk1/p1pnbppp/1p3n2/1B1p2B1/3P4/2N1PN2/PP3PPP/2RQK2R",
  "r1bq1rk1/1ppnbppp/p3pn2/3p2B1/2PP4/2N1PN2/PP3PPP/2RQKB1R",
  "r1bq1rk1/pppnbppp/4pn2/3p2B1/2PP4/2N1PN2/PP3PPP/2RQKB1R",
  "r1bq1rk1/pp1nbppp/2p1pn2/3p2B1/2PP4/2N1PN2/PP3PPP/2RQKB1R",
  "r1bq1rk1/p1pnbppp/1p3n2/3p2B1/3P4/2NBPN2/PP3PPP/2RQK2R",
  "r1bq1rk1/1ppnbppp/p3pn2/3P2B1/3P4/2N1PN2/PP3PPP/2RQKB1R",
  "r1bq1rk1/1p1nbppp/p1p1pn2/3p2B1/2PP4/P1N1PN2/1PQ2PPP/2R1KB1R",
  "r1bq1rk1/pp1nbppp/2p1pn2/3p2B1/2PP4/2N1PN2/PPQ2PPP/2R1KB1R",
  "r1bq1rk1/1p1nbppp/p1p1pn2/3p2B1/2PP4/2N1PN2/PPQ2PPP/2R1KB1R",
  "r1bq1rk1/pp1nbppp/2p1p3/3p2B1/2PPn3/2N1PN2/PPQ2PPP/2R1KB1R",
  "r1bq1rk1/1p1nbppp/p1p1pn2/3P2B1/3P4/2N1PN2/PPQ2PPP/2R1KB1R",
  "r1bq1rk1/pp1nbppp/2p1pn2/3p2B1/2PP4/2NBPN2/PP3PPP/2RQK2R",
  "r1bq1rk1/p2nbppp/2p1pn2/1p4B1/2BP4/2N1PN2/PP3PPP/2RQK2R",
  "r1b2rk1/pp1nqppp/2p1p3/3n4/2BPN3/4PN2/PP3PPP/2RQK2R",
  "r1b2rk1/pp1nqppp/2p1p3/3n4/2BP4/2N1PN2/PP3PPP/2RQK2R",
  "r1bq1rk1/pp1nbppp/2p1p3/3n2B1/2BP4/2N1PN2/PP3PPP/2RQK2R",
  "r1bq1rk1/pp1nbppp/2p1p3/3n2B1/2BP3P/2N1PN2/PP3PP1/2RQK2R",
  "r1b2rk1/pp1nqppp/2p1p3/3n4/2BP4/2N1PN2/PP3PPP/2RQ1RK1",
  "r1b2rk1/pp1nqppp/2p5/4p3/2BP4/2R1PN2/PP3PPP/3Q1RK1",
  "r1b2rk1/pp1nqppp/2p5/4p3/2BP4/2R1PN2/PP3PPP/1Q3RK1",
  "r1b2rk1/pp1nqppp/2p5/4p3/2BP4/2R1PN2/PPQ2PPP/5RK1",
  "r1b2rk1/pp3ppp/2p5/4q3/2B5/2R1P3/PP3PPP/3Q1RK1",
  "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/5P2/PP2P1PP/RNBQKBNR",
  "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R",
  "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/6P1/PP2PP1P/RNBQKBNR",
  "rnbqk2r/ppp1ppbp/6p1/3n4/3P4/6P1/PP2PPBP/RNBQK1NR",
  "rnbq1rk1/ppp1ppbp/6p1/3n4/3P4/5NP1/PP2PPBP/RNBQ1RK1",
  "rnbq1rk1/pp2ppbp/6p1/2pn4/3P4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "rnbq1rk1/pp2ppbp/6p1/2Pn4/8/5NP1/PP2PPBP/RNBQ1RK1",
  "rnbq1rk1/ppp1ppbp/1n4p1/8/3P4/5NP1/PP2PPBP/RNBQ1RK1",
  "rnbq1rk1/ppp1ppbp/5np1/3p4/2PP4/5NP1/PP2PPBP/RNBQ1RK1",
  "rnbq1rk1/ppp1ppbp/5np1/8/2pP4/5NP1/PP2PPBP/RNBQ1RK1",
  "r1bq1rk1/ppp1ppbp/2n2np1/3p4/2PP4/5NP1/PP2PPBP/RNBQ1RK1",
  "rnbq1rk1/pp2ppbp/2p2np1/3p4/2PP4/5NP1/PP2PPBP/RNBQ1RK1",
  "rnbq1rk1/pp2ppbp/5np1/3p4/3P4/5NP1/PP2PPBP/RNBQ1RK1",
  "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR",
  "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP2P1/2N5/PP2PP1P/R1BQKBNR",
  "rnbqkb1r/pp2pp1p/6p1/2p3B1/2PPp3/8/PP1QPPPP/R3KBNR",
  "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/2N2P2/PP2P1PP/R1BQKBNR",
  "rnbqkb1r/pp2pp1p/6p1/2pn4/N2P4/5P2/PP2P1PP/R1BQKBNR",
  "rnbqkb1r/ppp1pp1p/5np1/3p2B1/2PP4/2N5/PP2PPPP/R2QKBNR",
  "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP3P/2N5/PP2PPP1/R1BQKBNR",
  "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/1QN5/PP2PPPP/R1B1KBNR",
  "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP1B2/2N5/PP2PPPP/R2QKBNR",
  "rnbq1rk1/ppp1ppbp/5np1/3p4/2PP1B2/2N1P3/PP3PPP/R2QKBNR",
  "rn1q1rk1/pp2ppbp/4bnp1/2Pp4/2P2B2/2N1P3/PP3PPP/2RQKBNR",
  "rnbq1rk1/ppp1ppbp/5np1/3p4/2PP1B2/2N1P3/PP3PPP/2RQKBNR",
  "rnb2rk1/pp2ppbp/5np1/q1Pp4/2P2B2/2N1P3/PP3PPP/2RQKBNR",
  "rnb2rk1/ppB1ppbp/6p1/3q4/3P4/4P3/PP3PPP/R2QKBNR",
  "rnbqkb1r/ppp1pp1p/6p1/3n4/3P4/2N5/PP2PPPP/R1BQKBNR",
  "rnbqk2r/ppp1ppbp/6p1/8/3PP3/2P2N2/P4PPP/R1BQKB1R",
  "rnbqk2r/pp2ppbp/6p1/2p5/3PP3/2P2N1P/P4PP1/R1BQKB1R",
  "r1bq1rk1/pp2pp1p/2n3p1/2pP4/4P3/2b2N2/P3BPPP/1RBQK2R",
  "rnbqkb1r/ppp1pp1p/6p1/3n4/N2P4/8/PP2PPPP/R1BQKBNR",
  "rnbqk2r/ppp1ppbp/6p1/8/2BPP3/2P5/P4PPP/R1BQK1NR",
  "rnb2rk1/pppqppbp/6p1/8/2BPP3/2P5/P3NPPP/R1BQK2R",
  "rnb2rk1/p1pqppbp/1p4p1/8/2BPP3/2P5/P3NPPP/R1BQ1RK1",
  "r1bq1rk1/ppp1ppbp/2n3p1/8/2BPP3/2P5/P3NPPP/R1BQK2R",
  "rnbq1rk1/p1p1ppbp/1p4p1/8/2BPP3/2P5/P3NPPP/R1BQK2R",
  "r2q1rk1/pp2pBbp/6p1/n1p5/3PP1b1/2P1BP2/P3N1PP/R2Q1RK1",
  "rnbq1rk1/pp2ppbp/6p1/2p5/2BPP3/2P5/P3NPPP/R1BQK2R",
  "r1bq1rk1/pp2ppbp/2n3p1/8/2BPP3/4B3/P3NPPP/R2Q1RK1",
  "r2q1rk1/pp2ppbp/4b1p1/n2P4/4P3/3BBP2/P3N1PP/R2Q1RK1",
  "r2q1rk1/pp2ppbp/4b1p1/n7/3PP3/3BBP2/P3N1PP/R2Q1RK1",
  "rnbqk2r/ppp1ppbp/5np1/3p4/Q1PP4/2N2N2/PP2PPPP/R1B1KB1R",
  "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqk2r/ppp1ppbp/5np1/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqk2r/ppp1ppbp/5np1/3p2B1/2PP4/2N2N2/PP2PPPP/R2QKB1R",
  "rnbqk2r/ppp1ppbp/5np1/3p4/2PP1B2/2N2N2/PP2PPPP/R2QKB1R",
  "rnbq1rk1/ppp1ppbp/5np1/3p4/2PP1B2/2N1PN2/PP3PPP/R2QKB1R",
  "rn1q1rk1/pp2ppbp/2p2np1/3p1b2/2PP4/2NBPN2/PP3PPP/R1BQ1RK1",
  "rnbq1rk1/ppp1ppbp/5np1/3p4/1PPP4/2N1PN2/P4PPP/R1BQKB1R",
  "rnbq1rk1/ppp1ppbp/5np1/3p4/2PP4/2N1PN2/PP1B1PPP/R2QKB1R",
  "rn1q1rk1/pp2ppbp/2p2np1/3p4/2PP2b1/2NBPN2/PP3PPP/R1BQ1RK1",
  "rnbqk2r/ppp1ppbp/5np1/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R",
  "rnbq1rk1/ppp1ppbp/5np1/3p4/2PP4/2NBPN2/PP3PPP/R1BQK2R",
  "rnbq1rk1/ppp2pbp/4pnp1/3p4/2PP4/1QN1PN2/PP3PPP/R1B1KB1R",
  "r1bq1rk1/pppnppbp/5np1/6N1/2BP4/1QN1P3/PP3PPP/R1B1K2R",
  "rnbq1rk1/ppp1ppbp/5np1/3p4/2PP4/1QN1PN2/PP3PPP/R1B1KB1R",
  "rnbqk2r/ppp1ppbp/5np1/3p4/2PP4/1QN2N2/PP2PPPP/R1B1KB1R",
  "rnbq1rk1/ppp1ppbp/5np1/8/2QPP3/2N2N2/PP3PPP/R1B1KB1R",
  "r1bq1rk1/ppp1ppbp/2n2np1/8/2QPP3/2N2N2/PP3PPP/R1B1KB1R",
  "rnbq1rk1/1pp1ppbp/p4np1/8/2QPP3/2N2N2/PP3PPP/R1B1KB1R",
  "rnbq1rk1/p1p1ppbp/1p3np1/8/2QPP3/2N2N2/PP3PPP/R1B1KB1R",
  "r1bq1rk1/ppp1ppbp/n4np1/8/2QPP3/2N2N2/PP3PPP/R1B1KB1R",
  "rnbq1rk1/pp2ppbp/2p2np1/8/2QPP3/2N2N2/PP3PPP/R1B1KB1R",
  "r2q1rk1/ppp1ppbp/1nn3p1/8/3PP1b1/2NQBN2/PP2BPPP/2KR3R",
  "rn1q1rk1/ppp1ppbp/5np1/8/2QPP1b1/2N2N2/PP3PPP/R1B1KB1R",
  "rn1q1rk1/pppnppbp/6p1/8/3PP1b1/1QN1BN2/PP3PPP/R3KB1R",
  "rn1q1rk1/pp1nppbp/6p1/2p5/3PP1b1/1QN1BN2/PP3PPP/R3KB1R",
  "rnbqkb1r/pppp1ppp/4pn2/8/2PP4/6P1/PP2PP1P/RNBQKBNR",
  "rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/6P1/PP2PP1P/RNBQKBNR",
  "rnbqkb1r/pppp1ppp/5n2/4p3/2PP4/6P1/PP2PP1P/RNBQKBNR",
  "rnbqkb1r/pppp1ppp/4pn2/8/2PP4/1Q6/PP2PPPP/RNB1KBNR",
  "rnbqkb1r/pppp1ppp/4pn2/8/2PP2P1/8/PP2PP1P/RNBQKBNR",
  "rnbqkb1r/pppp1ppp/4pn2/6B1/2PP4/8/PP2PPPP/RN1QKBNR",
  "rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/6P1/PP2PPBP/RNBQK1NR",
  "rnbqkb1r/ppp2ppp/4pn2/8/2pP4/6P1/PP2PPBP/RNBQK1NR",
  "r1bqkb1r/pppn1ppp/4pn2/8/2QP4/6P1/PP2PPBP/RNB1K1NR",
  "r1bqkb1r/1ppn1ppp/p3pn2/8/3P4/6P1/PPQ1PPBP/RNB1K1NR",
  "rnbqkb1r/ppp2ppp/4pn2/8/2pP4/5NP1/PP2PPBP/RNBQK2R",
  "r1bqk2r/ppp2ppp/2n1pn2/8/QbpP4/5NP1/PP2PPBP/RNB1K2R",
  "rnbqk2r/ppp1bppp/4pn2/8/2pP4/5NP1/PP2PPBP/RNBQK2R",
  "rnbqk2r/ppp1bppp/4pn2/3p4/2PP4/5NP1/PP2PPBP/RNBQK2R",
  "r1bq1rk1/pppnbppp/4pn2/3p4/2PP4/5NP1/PP2PPBP/RNBQ1RK1",
  "r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2NQ1NP1/PP2PPBP/R1B2RK1",
  "r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/1P3NP1/P1Q1PPBP/RNB2RK1",
  "r1bq1rk1/pppnbppp/4pn2/3p4/2PP4/5NP1/PPQ1PPBP/RNB2RK1",
  "r2q1rk1/pb1nbppp/2p1pn2/1p1p4/2PP4/1PN2NP1/P1Q1PPBP/R1BR2K1",
  "r1bq1rk1/p2nbppp/1pp1pn2/3p4/P1PP4/5NP1/1PQ1PPBP/RNBR2K1",
  "r1bq1rk1/p2nbppp/2p1pn2/1p1p4/2PP4/5NP1/PPQNPPBP/R1B2RK1",
  "r1bq1rk1/p2nbppp/1pp1pn2/3p4/2PP4/5NP1/PPQNPPBP/R1B2RK1",
  "r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/5NP1/PPQNPPBP/R1B2RK1",
  "r2q1rk1/3nbppp/bpp1pn2/p2p4/2PP4/1P3NP1/PBQNPPBP/R4RK1",
  "rnbqkb1r/p2p1ppp/4pn2/1ppP4/2P5/5N2/PP2PPPP/RNBQKB1R",
  "rnbqkb1r/p5pp/4pn2/1Ppp4/8/5N2/PP2PPPP/RNBQKB1R",
  "rnbqkb1r/p2p1ppp/4pn2/1ppP2B1/2P5/5N2/PP2PPPP/RN1QKB1R",
  "rnbqkb1r/p2p1pp1/5n1p/1ppP2B1/8/5N2/PP2PPPP/RN1QKB1R",
  "rnbqkb1r/pppp1ppp/4pn2/8/2PP4/5N2/PP2PPPP/RNBQKB1R",
  "rnbqkb1r/1ppp1ppp/p3pn2/8/2PP4/5N2/PP2PPPP/RNBQKB1R",
  "rnbqkb1r/pppp1ppp/4p3/8/2PPn3/5N2/PP2PPPP/RNBQKB1R",
  "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/5N2/PP2PPPP/RNBQKB1R",
  "rnbqk2r/pppp1ppp/4pn2/8/2PP4/5N2/PP1bPPPP/RN1QKB1R",
  "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/5N2/PP1NPPPP/R1BQKB1R",
  "r1bqk2r/pppp1ppp/2n1pn2/8/1bPP4/5N2/PP1BPPPP/RN1QKB1R",
  "rn1q1rk1/pbpp1ppp/1p2p3/6N1/2PP4/2n3P1/PPQ1PPBP/R3K2R",
  "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/8/PP1NPPPP/RNBQKB1R",
  "rnb1k2r/ppppqppp/4pn2/8/1bPP4/5N2/PP1BPPPP/RN1QKB1R",
  "rnbqk2r/ppppbppp/4pn2/8/2PP4/5N2/PP1BPPPP/RN1QKB1R",
  "rnbqk2r/pp1p1ppp/4pn2/2p5/1bPP4/5N2/PP1BPPPP/RN1QKB1R",
  "rnbqk2r/1ppp1ppp/4pn2/p7/1bPP4/5N2/PP1BPPPP/RN1QKB1R",
  "rnbqk2r/p1pp1ppp/1p2pn2/8/1bPP4/2N2N2/PP2PPPP/R1BQKB1R",
  "rn1qk2r/pbpp1ppp/1p2pn2/6B1/1bPP4/2N5/PP1NPPPP/R2QKB1R",
  "rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/5N2/PP2PPPP/RNBQKB1R",
  "rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/2N2N2/PP2PPPP/R1BQKB1R",
  "rn1qkb1r/pbpp1p2/1p2p2p/6pn/2PP4/2N2NB1/PP2PPPP/R2QKB1R",
  "rn1qkb1r/pbpp1ppp/1p2pn2/8/2PP4/P1N2N2/1P2PPPP/R1BQKB1R",
  "rn1qkb1r/pbpp1ppp/1p2p3/8/2PPn3/P1N2N2/1P2PPPP/R1BQKB1R",
  "rn1qkb1r/pbp2ppp/1p3n2/3p4/3P4/P1N2N2/1P2PPPP/R1BQKB1R",
  "rn1qkb1r/pbpp1p1p/1p2pnp1/8/2PP4/P1N2N2/1P2PPPP/R1BQKB1R",
  "rn1qkb1r/pbp2ppp/1p2p3/3n4/3P4/P1N2N2/1PQ1PPPP/R1B1KB1R",
  "rn1qkb1r/pbp2ppp/1p2pn2/3p4/2PP4/P1N2N2/1P2PPPP/R1BQKB1R",
  "rn1qk2r/pbppbppp/1p2pn2/8/2PP4/P1N2N2/1P2PPPP/R1BQKB1R",
  "rn1qkb1r/pbp2ppp/1p2p3/3n4/3P4/P1N2N2/1P2PPPP/R1BQKB1R",
  "rn1qkb1r/pbp2ppp/1p2p3/3n4/3P4/P1N1PN2/1P3PPP/R1BQKB1R",
  "rn1qkb1r/pbp2ppp/1p2p3/3n4/3PP3/P1N2N2/1P3PPP/R1BQKB1R",
  "rn1qkb1r/pbp2ppp/1p2p3/3n4/Q2P4/P1N2N2/1P2PPPP/R1B1KB1R",
  "rn1qkb1r/pbp2ppp/1p2p3/3n4/3P4/P1N2N2/1P1BPPPP/R2QKB1R",
  "rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP1B2/5N2/PP2PPPP/RN1QKB1R",
  "rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/P4N2/1P2PPPP/RNBQKB1R",
  "rn1qkb1r/pbpp1ppp/1p2pn2/8/2PP4/P4N2/1PQ1PPPP/RNB1KB1R",
  "rn1qk2r/pbpp1pp1/1p2pn1p/8/1bPP3B/2N2N2/PP2PPPP/R2QKB1R",
  "rn1q1rk1/pb1pbppp/1p2pn2/8/2PN4/1P1BP3/PB3PPP/RN1Q1RK1",
  "rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/4PN2/PP3PPP/RNBQKB1R",
  "rn1qkb1r/pb1p1ppp/1p3n2/2pp2N1/2P5/6P1/PP2PPBP/RNBQK2R",
  "rn1qkb1r/pbpp1ppp/1p2pn2/8/2PP4/5NP1/PP2PP1P/RNBQKB1R",
  "rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/5NP1/PP2PP1P/RNBQKB1R",
  "rn1qk2r/p1pp1ppp/bp2pn2/8/1bPP4/1P3NP1/P3PP1P/RNBQKB1R",
  "rn1qk2r/p1ppbppp/bp2pn2/8/2PP4/1P3NP1/P2BPP1P/RN1QKB1R",
  "rn2k2r/p1ppqppp/bp2pn2/8/1bPP4/1P3NP1/P2BPP1P/RN1QKB1R",
  "rn1qkb1r/p1pp1ppp/bp2pn2/8/2PP4/5NP1/PP2PP1P/RNBQKB1R",
  "rn1qkb1r/p1pp1ppp/bp2pn2/8/Q1PP4/5NP1/PP2PP1P/RNB1KB1R",
  "rn1qkb1r/p1pp1ppp/bp2pn2/8/2PP4/1P3NP1/P3PP1P/RNBQKB1R",
  "rn1qkb1r/p1pp1ppp/bp2pn2/8/2PP4/1Q3NP1/PP2PP1P/RNB1KB1R",
  "rn1qkb1r/pb1p1ppp/1p3n2/2pp4/2P4N/6P1/PP2PPBP/RNBQK2R",
  "rn1qkb1r/pb1p1ppp/1p2pn2/2p5/2PP4/5NP1/PP2PPBP/RNBQK2R",
  "rn1qk2r/pbpp1ppp/1p2pn2/8/1bPP4/5NP1/PP2PPBP/RNBQK2R",
  "rn1qk2r/pbppbppp/1p2pn2/8/2PP4/5NP1/PP1BPPBP/RN1QK2R",
  "rn1qk2r/1bpp1ppp/1p2pn2/p7/1bPP4/5NP1/PP1BPPBP/RN1QK2R",
  "rn1qk2r/pbppbppp/1p2pn2/8/2PP4/2N2NP1/PP2PPBP/R1BQK2R",
  "rn1qk2r/pbppbppp/1p2pn2/8/2PP4/5NP1/PP2PPBP/RNBQ1RK1",
  "rn1q1rk1/pbppbppp/1p3n2/3p4/2P4N/6P1/PP2PPBP/RNBQ1RK1",
  "rn1q1rk1/pbppbppp/1p3n2/3p4/2PN4/6P1/PP2PPBP/RNBQ1RK1",
  "rn1q1rk1/pbppbppp/1p2pn2/8/2PP4/1P3NP1/P3PPBP/RNBQ1RK1",
  "rn1q1rk1/pbppbppp/1p2pn2/8/2PP4/5NP1/PP2PPBP/RNBQR1K1",
  "rn1qk2r/pbppbppp/1p2p3/8/2PPn3/2N2NP1/PP1BPPBP/R2QK2R",
  "rn1qk2r/pbppbppp/1p2pn2/8/2PP4/5NP1/PP2PPBP/RNBQK2R",
  "r2q1rk1/pbppbppp/np2pn2/8/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "rn1q1rk1/pbppbppp/1p2pn2/8/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "rn1q1rk1/pbp1bppp/1p2pn2/3p4/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "rn1q1rk1/pbppbppp/1p2p3/8/2PP4/2Q2NP1/PP2PPBP/R1B2RK1",
  "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR",
  "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N2P2/PP2P1PP/R1BQKBNR",
  "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2NQ4/PP2PPPP/R1B1KBNR",
  "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N3P1/PP2PP1P/R1BQKBNR",
  "rnbq1rk1/pp1p1ppp/4pn2/2p5/1bPP4/2N2NP1/PP2PPBP/R1BQK2R",
  "rnbq1rk1/pp3ppp/4p3/3n4/1b1N4/2N3P1/PP2PPBP/R1BQK2R",
  "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqk2r/pp1p1ppp/4p3/2pP4/1bP1n3/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqk2r/pp1p1ppp/4pn2/2pP4/1bP5/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqk2r/p2p1ppp/4pn2/1ppP4/1bP5/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/1QN5/PP2PPPP/R1B1KBNR",
  "r1bqk2r/pp1p1ppp/2n1p3/2P5/1bP5/1QN2N2/PP1nPPPP/R3KB1R",
  "r1bqk2r/pp1p1ppp/2n1pn2/2P5/1bP5/1QN5/PP2PPPP/R1B1KBNR",
  "r1bqk2r/pp1p1ppp/2n1p3/2n5/1bP5/1QN2N2/PP1BPPPP/R3KB1R",
  "r1bqk2r/pp1p2pp/2n1p3/2n2p2/1bP5/2N2NP1/PPQBPP1P/R3KB1R",
  "rnbqk2r/pppp1ppp/4pn2/8/2PP4/P1P5/4PPPP/R1BQKBNR",
  "rnbq1rk1/pp3ppp/4p3/2pn4/3P4/P1P1PP2/6PP/R1BQKBNR",
  "rnbqk2r/pp3ppp/4pn2/2pP4/3P4/P1P2P2/4P1PP/R1BQKBNR",
  "rnbqk2r/pp3ppp/4p3/2Pn4/8/P1P2P2/4P1PP/R1BQKBNR",
  "rnbqk2r/pp4pp/4p3/2Pn1p2/8/P1P2P2/4P1PP/R1BQKBNR",
  "rnbqk2r/pp1p1ppp/4pn2/2p5/2PP4/P1P1P3/5PPP/R1BQKBNR",
  "rnbqk2r/p2p1ppp/1p2pn2/2p5/2PP4/P1P1P3/5PPP/R1BQKBNR",
  "rnbq1rk1/pppp1ppp/4pn2/8/2PP4/P1P5/4PPPP/R1BQKBNR",
  "rnbq1rk1/pppp1ppp/4pn2/8/2PP4/P1P1P3/5PPP/R1BQKBNR",
  "r1bq1rk1/pp1p1ppp/2n1pn2/2p5/2PP4/P1PBP3/5PPP/R1BQK1NR",
  "r1bqnrk1/p2p1ppp/1pn1p3/2p5/2PPP3/P1PB4/4NPPP/R1BQK2R",
  "rnbqk2r/pppp1ppp/4pn2/6B1/1bPP4/2N5/PP2PPPP/R2QKBNR",
  "rnbqk2r/p2p1pp1/4pn1p/1ppP4/1bP4B/2N5/PP2PPPP/R2QKBNR",
  "rnbqk2r/pp3pp1/3ppn1p/2pP4/1bP4B/2N5/PP2PPPP/R2QKBNR",
  "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PPQ1PPPP/R1B1KBNR",
  "rnbq1rk1/p1pp1ppp/1p2pn2/8/2PP4/P1Q5/1P2PPPP/R1B1KBNR",
  "rnbq1rk1/p1pp1ppp/4pn2/1p6/2PP4/P1Q5/1P2PPPP/R1B1KBNR",
  "r1bqk2r/ppp2ppp/2nppn2/8/1bPP4/2N2N2/PPQ1PPPP/R1B1KB1R",
  "r1bqk2r/pppp1ppp/2n1pn2/8/1bPP4/2N5/PPQ1PPPP/R1B1KBNR",
  "rnb1k2r/ppp2ppp/5n2/4pq2/1b1P4/2N2N2/PP2PPPP/R1BQKB1R",
  "rnbqk2r/ppp2ppp/4pn2/3p4/1bPP4/2N5/PPQ1PPPP/R1B1KBNR",
  "rnbqk2r/ppp2ppp/5n2/3p4/1b1P4/2N5/PPQ1PPPP/R1B1KBNR",
  "rnbqk2r/ppp2ppp/4pn2/3p4/1bPP4/P1N5/1PQ1PPPP/R1B1KBNR",
  "r1bqk2r/ppp2ppp/2n1pn2/3p4/2PP4/P1Q5/1P2PPPP/R1B1KBNR",
  "rnbqk2r/ppp2ppp/4p3/3p4/2PPn3/P1Q5/1P2PPPP/R1B1KBNR",
  "rnbqk2r/ppp2ppp/4p3/3p4/2PPn3/P7/1PQ1PPPP/R1B1KBNR",
  "r1bqk2r/ppp2ppp/2n5/3pp3/2PPn3/P3P3/1PQ2PPP/R1B1KBNR",
  "rnbqk2r/pp1p1ppp/4pn2/2p5/1bPP4/2N5/PPQ1PPPP/R1B1KBNR",
  "rnbqk2r/pp1p1ppp/4pn2/2P5/2P5/2b5/PPQ1PPPP/R1B1KBNR",
  "rnbq1rk1/p2p1ppp/1p2pn2/2b5/2P2B2/P1N2N2/1PQ1PPPP/R3KB1R",
  "rnbq1rk1/pp1p1ppp/4pn2/2P5/1bP5/2N5/PPQ1PPPP/R1B1KBNR",
  "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N1P3/PP3PPP/R1BQKBNR",
  "r1bqk2r/pppp1ppp/2n1pn2/8/1bPP4/2N1P3/PP3PPP/R1BQKBNR",
  "rnbqk2r/pp1p1ppp/4pn2/2p5/1bPP4/2N1P3/PP3PPP/R1BQKBNR",
  "r1bqk2r/pp3ppp/2nppn2/2p5/2PP4/2PBPN2/P4PPP/R1BQK2R",
  "rnbq1rk1/pp1p1ppp/4pn2/2p5/1bPP4/2N1PN2/PP3PPP/R1BQKB1R",
  "rnbqk2r/pp1p1ppp/4pn2/2p5/1bPP4/2N1P3/PP2NPPP/R1BQKB1R",
  "rnbq1rk1/pp1p1ppp/4pn2/8/1bPP4/P1N5/1P2NPPP/R1BQKB1R",
  "rnbq1rk1/pp1p1ppp/4pn2/2P5/1b1P4/2N5/PP2NPPP/R1BQKB1R",
  "rnbqk2r/p1pp1ppp/1p2pn2/8/1bPP4/2N1P3/PP3PPP/R1BQKBNR",
  "rnbqk2r/p1pp1ppp/1p2pn2/8/1bPP4/2N1P3/PP2NPPP/R1BQKB1R",
  "rn1qk2r/p1pp1ppp/bp2pn2/8/1bPP4/2N1P3/PP2NPPP/R1BQKB1R",
  "rnbq1rk1/pppp1ppp/4pn2/8/1bPP4/2N1P3/PP3PPP/R1BQKBNR",
  "rnbq1rk1/pppp1ppp/4pn2/8/1bPP4/2N1P3/PP2NPPP/R1BQKB1R",
  "rnbq1rk1/ppp2ppp/3bpn2/3p4/2PP4/P1N1P3/1P2NPPP/R1BQKB1R",
  "rnbq1rk1/pppp1ppp/4pn2/8/1bPP4/2NBP3/PP3PPP/R1BQK1NR",
  "rnbq1rk1/ppp2ppp/4pn2/3p4/1bPP4/2NBP3/PP3PPP/R1BQK1NR",
  "r1bq1rk1/ppp2ppp/2n1pn2/3p4/1bPP4/2NBPN2/PP3PPP/R1BQ1RK1",
  "rnbq1rk1/ppp2ppp/4pn2/3p4/2PP4/P1PBP3/5PPP/R1BQK1NR",
  "rnbq1rk1/pppp1ppp/4pn2/8/1bPP4/2N1PN2/PP3PPP/R1BQKB1R",
  "rnbq1rk1/ppp2ppp/4pn2/3p4/1bPP4/2N1PN2/PP3PPP/R1BQKB1R",
  "rnbq1rk1/ppp2ppp/4pn2/3p4/1bPP4/P1N1PN2/1P3PPP/R1BQKB1R",
  "r1bq1rk1/ppp2ppp/2n1pn2/8/1bpP4/2NBPN2/PP3PPP/R1BQ1RK1",
  "rnbq1rk1/p1p2ppp/1p2pn2/3p4/1bPP4/2NBPN2/PP3PPP/R1BQK2R",
  "rnbq1rk1/pp3ppp/4pn2/2pp4/1bPP4/2NBPN2/PP3PPP/R1BQK2R",
  "r1bq1rk1/pp1n1ppp/4pn2/2pp4/1bPP4/2NBPN2/PP3PPP/R1BQ1RK1",
  "rnbq1rk1/p4ppp/1p2pn2/2pp4/1bPP4/2NBPN2/PP3PPP/R1BQ1RK1",
  "rnbq1rk1/pp3ppp/4pn2/2p5/1bBP4/2N1PN2/PP3PPP/R1BQ1RK1",
  "rnb2rk1/pp2qppp/4pn2/2p5/1bBP4/2N1PN2/PP3PPP/R1BQ1RK1",
  "r1bq1rk1/pp1n1ppp/4pn2/2p5/1bBP4/2N1PN2/PP3PPP/R1BQ1RK1",
  "r1bq1rk1/pp3ppp/2n1pn2/2pp4/1bPP4/2NBPN2/PP3PPP/R1BQ1RK1",
  "r1bq1rk1/pp3ppp/2n1pn2/2pp4/2PP4/P1PBPN2/5PPP/R1BQ1RK1",
  "r1bq1rk1/pp3ppp/2n1pn2/2p5/2BP4/P1P1PN2/5PPP/R1BQ1RK1",
  "rnbqk2r/ppp1ppbp/5np1/3p4/2PP4/6P1/PP2PPBP/RNBQK1NR",
  "rnbqkb1r/p1pppp1p/5np1/1p1P4/2P5/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/pppppp1p/5np1/3P4/2P5/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/pppppp1p/5np1/8/2PP4/5P2/PP2P1PP/RNBQKBNR",
  "rnbqkb1r/pppp1p1p/5np1/4p3/2PP4/5P2/PP2P1PP/RNBQKBNR",
  "rnbqkb1r/pppppp1p/5np1/8/2PP3P/8/PP2PPP1/RNBQKBNR",
  "rnbqk2r/ppppppbp/5np1/8/2PP4/6P1/PP2PPBP/RNBQK1NR",
  "rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PP2PPPP/RNBQKBNR",
  "rnbqkb1r/pppppp1p/5np1/8/2PP4/6P1/PP2PP1P/RNBQKBNR",
  "rnb1k2r/pp1pppbp/5np1/q1p5/2PP4/5NP1/PP2PPBP/RNBQK2R",
  "rnbq1rk1/pp2ppbp/3p1np1/2p5/2PP4/5NP1/PP2PPBP/RNBQ1RK1",
  "rnbqkb1r/pppppp1p/5np1/8/2PP4/5N2/PP2PPPP/RNBQKB1R",
  "rnbqk2r/ppppppbp/5np1/8/1PPP4/5N2/P3PPPP/RNBQKB1R",
  "rnbq1rk1/pp2ppbp/2pp1np1/8/2PP4/2N1PN2/PP2BPPP/R1BQK2R",
  "r1bq1rk1/ppp1ppbp/2np1np1/8/2PP4/2N1PN2/PP2BPPP/R1BQK2R",
  "rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PPQ1PPPP/RNB1KBNR",
  "rnbqkb1r/pppppp1p/5np1/8/2PP4/2N5/PP2PPPP/R1BQKBNR",
  "rnb2rk1/pp2ppbp/1qpp1np1/8/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "rnbq1rk1/ppp1ppbp/3p1np1/8/2PP4/2N1PN2/PP2BPPP/R1BQK2R",
  "r1bq1rk1/pppn1pbp/5np1/4p3/2P5/2N1PN2/PP2BPPP/R1BQ1RK1",
  "r1bq1rk1/pppn1pbp/3p1np1/4p3/1PPP4/2N1PN2/P3BPPP/R1BQ1RK1",
  "rnbqk2r/ppp1ppbp/3p1np1/6B1/2PP4/2N2N2/PP2PPPP/R2QKB1R",
  "rnbqk2r/ppp1ppbp/3p1np1/8/2PP4/2N2NP1/PP2PP1P/R1BQKB1R",
  "r1bq1rk1/ppp1ppbp/2np1np1/8/2PP4/2N2NP1/PP2PPBP/R1BQK2R",
  "rnb2rk1/pp2ppbp/2pp1np1/q7/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "rn1q1rk1/pp2ppbp/2pp1np1/5b2/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "r2q1rk1/ppp1ppbp/2np1np1/5b2/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "r2q1rk1/ppp1ppbp/2np1np1/8/2PP2b1/2N2NP1/PP2PPBP/R1BQ1RK1",
  "r1bq1rk1/ppp2pbp/2np1np1/4p3/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "r1bq1rk1/1pp1ppbp/p1np1np1/8/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "r1bq1rk1/1p3pbp/p2p1np1/n1pPp3/2P5/2N3P1/PPQNPPBP/R1B2RK1",
  "1rbq1rk1/4pp1p/p2p1npb/n1pP4/2P5/2N3P1/PBQNPPBP/R4RK1",
  "1rbq1rk1/2p1ppbp/p1np1np1/1p6/2PP4/2N1B1PP/PP1NPPB1/R2Q1RK1",
  "rnbq1rk1/pp2ppbp/3p1np1/2p5/2PP4/2N2NP1/PP2PPBP/R1BQK2R",
  "rnbq1rk1/pp2ppbp/3p1np1/2p5/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "r1bq1rk1/pp2ppbp/2n2np1/2p5/2P5/2N2NP1/PP2PPBP/R1BQ1RK1",
  "r1bq1rk1/pp2ppbp/2np1np1/2pP4/2P5/2N2NP1/PP2PPBP/R1BQ1RK1",
  "r1bq1rk1/pppn1pbp/3p1np1/4p3/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "r1bq1rk1/pppnppbp/3p1np1/8/2PP4/2N2NP1/PP2PPBP/R1BQK2R",
  "r1bq1rk1/pppn1pbp/3p1np1/4p3/2PP4/1PN2NP1/P3PPBP/R1BQ1RK1",
  "r1bq1rk1/1ppnppbp/p2p1np1/8/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1",
  "r1bq1rk1/pppn1pbp/3p1np1/4p3/2PPP3/2N2NP1/PP3PBP/R1BQ1RK1",
  "r1bqr1k1/1pp2pbp/3p1np1/p1n5/2PNP3/2N3PP/PP3PB1/R1BQR1K1",
  "r1bq1rk1/pp1n1pbp/2pp1np1/4p3/2PPP3/2N2NPP/PP3PB1/R1BQ1RK1",
  "rnbqk2r/ppp1ppbp/3p1np1/6B1/2PPP3/2N5/PP3PPP/R2QKBNR",
  "rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N5/PP2NPPP/R1BQKB1R",
  "rnbqk2r/ppppppbp/5np1/8/2PPP3/2N5/PP3PPP/R1BQKBNR",
  "rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N5/PP3PPP/R1BQKBNR",
  "rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N4P/PP3PP1/R1BQKBNR",
  "rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N3P1/PP3P1P/R1BQKBNR",
  "rnbq1rk1/ppp2pbp/3p1np1/4p3/2PPP3/2N3P1/PP2NPBP/R1BQK2R",
  "rnbq1rk1/ppp1ppbp/3p1np1/6B1/2PPP3/2N5/PP2BPPP/R2QK1NR",
  "rnbq1rk1/ppp1ppb1/3p1npp/6B1/2PPP3/2N5/PP2BPPP/R2QK1NR",
  "r1bq1rk1/pppnppbp/3p1np1/6B1/2PPP3/2N5/PP2BPPP/R2QK1NR",
  "r1bq1rk1/ppp1ppbp/n2p1np1/6B1/2PPP3/2N5/PP2BPPP/R2QK1NR",
  "r1bq1rk1/pp2ppbp/n1pp1np1/6B1/2PPP3/2N5/PP1QBPPP/R3K1NR",
  "r1bq1rk1/ppp1ppbp/2np1np1/6B1/2PPP3/2N5/PP2BPPP/R2QK1NR",
  "rnbq1rk1/1pp1ppbp/p2p1np1/6B1/2PPP3/2N5/PP2BPPP/R2QK1NR",
  "rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N5/PP2BPPP/R1BQK1NR",
  "rnbq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N1B3/PP2BPPP/R2QK1NR",
  "rnbq1rk1/pp2ppbp/3p1np1/2p3B1/2PPP3/2N5/PP2BPPP/R2QK1NR",
  "rnbq1rk1/pp2ppbp/3p1np1/2pP2B1/2P1P3/2N5/PP2BPPP/R2QK1NR",
  "rnbq1rk1/pp2ppbp/3p1np1/2P3B1/2P1P3/2N5/PP2BPPP/R2QK1NR",
  "rnbq1rk1/pp3pbp/3ppnp1/2pP2B1/2P1P3/2N5/PP2BPPP/R2QK1NR",
  "rnbqk2r/ppp1ppbp/3p1np1/8/2PPPP2/2N5/PP4PP/R1BQKBNR",
  "rnbq1rk1/pp2ppbp/3p1np1/2pP4/2P1PP2/2N2N2/PP4PP/R1BQKB1R",
  "r1bqk2r/ppp1ppbp/n2p1np1/8/2PPPP2/2N5/PP4PP/R1BQKBNR",
  "rnbq1rk1/ppp1ppbp/3p1np1/8/2PPPP2/2N5/PP2B1PP/R1BQK1NR",
  "rnbq1rk1/pp3pbp/3p1np1/2ppP3/2P2P2/2N2N2/PP2B1PP/R1BQK2R",
  "rnbq1rk1/pp3pbp/3ppnp1/2pP4/2P1PP2/2N2N2/PP2B1PP/R1BQK2R",
  "r1bq1rk1/pp4bp/2nppnp1/2p5/2P1PPPP/2N5/PP2B3/R1BQK1NR",
  "rnbq1rk1/pp2ppbp/3p1np1/2p5/2PPPP2/2N2N2/PP2B1PP/R1BQK2R",
  "r1bq1rk1/pp2ppbp/2np1np1/8/2PNPP2/2N1B3/PP2B1PP/R2QK2R",
  "rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N2P2/PP4PP/R1BQKBNR",
  "rnbq1rk1/ppp1ppbp/3p1np1/6B1/2PPP3/2N2P2/PP4PP/R2QKBNR",
  "rnbq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N2P2/PP2N1PP/R1BQKB1R",
  "rnbq1rk1/1p2ppbp/p1pp1np1/8/2PPP3/2NBBP2/PP4PP/R2QK1NR",
  "rnbq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N2P2/PP4PP/R1BQKBNR",
  "rnbq1rk1/pp2ppbp/3p1np1/2p5/2PPP3/2N1BP2/PP4PP/R2QKBNR",
  "rnbq1rk1/p1p1ppbp/1p1p1np1/8/2PPP3/2N1BP2/PP4PP/R2QKBNR",
  "r1bq1rk1/1pp1ppbp/p1np1np1/8/2PPP3/2N1BP2/PP2N1PP/R2QKB1R",
  "1rbq1rk1/ppp1ppbp/2np1np1/8/2PPP3/2N1BP2/PP2N1PP/R2QKB1R",
  "r1bq1rk1/ppp1ppbp/2np1np1/8/2PPP3/2N1BP2/PP4PP/R2QKBNR",
  "1rbq1rk1/1pp1ppbp/p1np1np1/8/2PPP3/2N1BP2/PP1QN1PP/R3KB1R",
  "rnbq1rk1/ppp2pbp/3p1np1/4p3/2PPP3/2N1BP2/PP4PP/R2QKBNR",
  "rnbq1rk1/pp3pbp/2pp1np1/4p3/2PPP3/2N1BP2/PP2N1PP/R2QKB1R",
  "rnb2rk1/ppp2pbp/3p2p1/3Pp3/2P1P2Q/2N1nP2/PP2K2P/R5NR",
  "rnbq1rk1/ppp2pbp/3p1np1/3Pp3/2P1P3/2N1BP2/PP4PP/R2QKBNR",
  "rnb2rk1/ppp2pbp/3p2p1/3Pp3/2n1P2Q/2N2P2/PP2K2P/R5NR",
  "rnbq1rk1/pp3pbp/3p1np1/3pp3/2P1P3/2N1BP2/PP2N1PP/R2QKB1R",
  "rnbq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N1BN2/PP3PPP/R2QKB1R",
  "rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N2N2/PP3PPP/R1BQKB1R",
  "rnbq1rk1/ppp1ppbp/3p1np1/6B1/2PPP3/2N2N2/PP3PPP/R2QKB1R",
  "r1bq1rk1/ppp1ppbp/n2p1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQK2R",
  "rnbq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQK2R",
  "rnbq1rk1/ppp2pbp/3p1np1/4P3/2P1P3/2N2N2/PP2BPPP/R1BQK2R",
  "rnbq1rk1/ppp2pbp/3p1np1/4p3/2PPP3/2N2N2/PP2BPPP/R1BQK2R",
  "rnbq1rk1/ppp2pbp/3p1np1/4p3/2PPP3/2N1BN2/PP2BPPP/R2QK2R",
  "rnbq1rk1/ppp2pbp/3p1np1/3Pp3/2P1P3/2N2N2/PP2BPPP/R1BQK2R",
  "rnbq1rk1/1pp2pbp/3p1np1/p2Pp3/2P1P3/2N2N2/PP2BPPP/R1BQK2R",
  "r1bq1rk1/pppn1pb1/3p3p/3Pp1pn/2P1P2P/2N2NB1/PP2BPP1/R2QK2R",
  "r1bq1rk1/pppn1pbp/3p1np1/3Pp3/2P1P3/2N2N2/PP2BPPP/R1BQK2R",
  "rnbq1rk1/ppp2pbp/3p1np1/4p3/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1",
  "rnbq1rk1/pp3pbp/2pp1np1/4p3/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1",
  "r1bq1rk1/ppp2pbp/n2p1np1/4p3/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1",
  "r1bq1rk1/pppn1pbp/3p1np1/4p3/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1",
  "r1bq1rk1/pppn1pbp/3p1np1/3Pp3/2P1P3/2N2N2/PP2BPPP/R1BQ1RK1",
  "rnbq1rk1/1pp2pbp/3p1np1/p3p3/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1",
  "r1bq1rk1/pppn1pbp/3p1np1/4p3/2PPP3/2N2N2/PP2BPPP/R1BQR1K1",
  "r1bq1rk1/1p1n1pbp/2pp1np1/p3p3/2PPP3/2N2N2/PP3PPP/R1BQRBK1",
  "r1bq1rk1/ppp2pbp/2np1np1/4p3/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1",
  "r1bq1rk1/ppp1npbp/3p1np1/3Pp3/1PP1P3/2N2N2/P3BPPP/R1BQ1RK1",
  "r1bq1rk1/ppp1npbp/3p2p1/3Pp2n/1PP1P3/2N2N2/P3BPPP/R1BQR1K1",
  "r1bq1rk1/ppp1npbp/3p2p1/3Pp2n/1PP1P3/2N2N2/P1Q1BPPP/R1B2RK1",
  "r1bq1rk1/ppp1npbp/3p1np1/3Pp3/2P1P3/2N2N2/PP1BBPPP/R2Q1RK1",
  "r1bq1rk1/ppp1npbp/3p1np1/3Pp3/2P1P3/2N5/PP1NBPPP/R1BQ1RK1",
  "r1bq1rk1/ppp1npbp/3p1np1/3Pp3/2P1P3/2N5/PP2BPPP/R1BQNRK1",
  "r1bq1rk1/pppn2bp/3p2n1/2PPp1p1/4Pp2/2N2P2/PP2BBPP/2RQNRK1",
  "r1bq1rk1/pppnnpbp/3p2p1/3Pp3/2P1P3/2N1B3/PP2BPPP/R2QNRK1",
  "r1bq1rk1/pppnn1bp/3p2p1/3Ppp2/2P1P1P1/2N2P2/PP2B2P/R1BQNRK1",
  "r1bq1rk1/pppnn1bp/3p2p1/3Ppp2/2P1P3/2N2P2/PP2B1PP/R1BQNRK1",
];

let lastClassification = null;
let moveIndex_ = 999;

const MoveClassification = {
  Brilliant: "brilliant",
  Great: "great",
  Best: "best",
  Excellent: "excellent",
  Good: "good",
  Book: "book",
  Inaccuracy: "inaccuracy",
  Mistake: "mistake",
  Miss: "miss",
  Blunder: "blunder",
  Forced: "forced",
};

let debugEngine = false;

function randomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * chars.length);
    result += chars[index];
  }

  return result;
}

let url = window.location.href;
const classMoveClassification = randomString(10);
const BrillantSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <g id="Brilliant">
    <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
    <path class="icon-background" fill="#26c2a3" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    <g class="icon-component-shadow" opacity="0.2">
      <path d="M12.57,14.6a.51.51,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0h-2l-.13,0L10,14.84A.41.41,0,0,1,10,14.6V12.7a.32.32,0,0,1,.09-.23.39.39,0,0,1,.1-.08l.13,0h2a.31.31,0,0,1,.24.1.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13Zm-.12-3.93a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H10.35a.31.31,0,0,1-.34-.31L9.86,3.9A.36.36,0,0,1,10,3.66a.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0H12.3a.32.32,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path>
      <path d="M8.07,14.6a.51.51,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0h-2l-.13,0-.11-.08a.41.41,0,0,1-.08-.24V12.7a.27.27,0,0,1,0-.13.36.36,0,0,1,.07-.1.39.39,0,0,1,.1-.08l.13,0h2a.31.31,0,0,1,.24.1.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13ZM8,10.67a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H5.85a.31.31,0,0,1-.34-.31L5.36,3.9a.36.36,0,0,1,.09-.24.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0H7.8a.35.35,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path>
    </g>
    <g>
      <path class="icon-component" fill="#fff" d="M12.57,14.1a.51.51,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0h-2l-.13,0L10,14.34A.41.41,0,0,1,10,14.1V12.2A.32.32,0,0,1,10,12a.39.39,0,0,1,.1-.08l.13,0h2a.31.31,0,0,1,.24.1.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13Zm-.12-3.93a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H10.35a.31.31,0,0,1-.34-.31L9.86,3.4A.36.36,0,0,1,10,3.16a.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0H12.3a.32.32,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path>
      <path class="icon-component" fill="#fff" d="M8.07,14.1a.51.51,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0h-2l-.13,0-.11-.08a.41.41,0,0,1-.08-.24V12.2a.27.27,0,0,1,0-.13.36.36,0,0,1,.07-.1.39.39,0,0,1,.1-.08l.13,0h2A.31.31,0,0,1,8,12a.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13ZM8,10.17a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H5.85a.31.31,0,0,1-.34-.31L5.36,3.4a.36.36,0,0,1,.09-.24.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0H7.8a.35.35,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path>
    </g>
  </g>
    </svg>`;

const forcedSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <g id="forced">
    <g id="fast_win">
      <g>
        <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
        <path class="icon-background" fill="#96af8b" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
      </g>
    </g>
    <g class="icon-component-shadow" opacity="0.2">
      <path d="M14.39,9.07,9,4.31a.31.31,0,0,0-.3,0,.32.32,0,0,0-.13.1.29.29,0,0,0,0,.16V7.42H3.9a.58.58,0,0,0-.19,0,.5.5,0,0,0-.17.11.91.91,0,0,0-.11.16.63.63,0,0,0,0,.19v3.41a.58.58,0,0,0,0,.19.64.64,0,0,0,.11.16.39.39,0,0,0,.17.11.41.41,0,0,0,.19,0H8.5v2.74a.26.26,0,0,0,.16.26.3.3,0,0,0,.16,0A.34.34,0,0,0,9,14.79L14.39,10a.69.69,0,0,0,.16-.22.7.7,0,0,0,0-.52A.69.69,0,0,0,14.39,9.07Z"></path>
    </g>
    <path class="icon-component" fill="#fff" d="M14.39,8.57,9,3.81a.31.31,0,0,0-.3,0,.32.32,0,0,0-.13.1A.29.29,0,0,0,8.5,4V6.92H3.9a.58.58,0,0,0-.19,0,.5.5,0,0,0-.17.11.91.91,0,0,0-.11.16.63.63,0,0,0,0,.19v3.41a.58.58,0,0,0,0,.19.64.64,0,0,0,.11.16.39.39,0,0,0,.17.11.41.41,0,0,0,.19,0H8.5v2.74a.26.26,0,0,0,.16.26.3.3,0,0,0,.16,0A.34.34,0,0,0,9,14.29l5.42-4.76a.69.69,0,0,0,.16-.22.7.7,0,0,0,0-.52A.69.69,0,0,0,14.39,8.57Z"></path>
  </g>
    </svg>`;

const greatMoveSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <g id="great_find">
    <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
    <path class="icon-background" fill="#749BBF" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    <g>
      <g class="icon-component-shadow" opacity="0.2">
        <path d="M10.32,14.6a.27.27,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0H8l-.13,0-.11-.08a.41.41,0,0,1-.08-.24V12.7a.27.27,0,0,1,0-.13.36.36,0,0,1,.07-.1.39.39,0,0,1,.1-.08l.13,0h2a.31.31,0,0,1,.24.1.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13Zm-.12-3.93a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H8.1a.31.31,0,0,1-.34-.31L7.61,3.9a.36.36,0,0,1,.09-.24.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0h2.11a.32.32,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path>
      </g>
      <path class="icon-component" fill="#fff" d="M10.32,14.1a.27.27,0,0,1,0,.13.44.44,0,0,1-.08.11l-.11.08-.13,0H8l-.13,0-.11-.08a.41.41,0,0,1-.08-.24V12.2a.27.27,0,0,1,0-.13.36.36,0,0,1,.07-.1.39.39,0,0,1,.1-.08l.13,0h2a.31.31,0,0,1,.24.1.39.39,0,0,1,.08.1.51.51,0,0,1,0,.13Zm-.12-3.93a.17.17,0,0,1,0,.12.41.41,0,0,1-.07.11.4.4,0,0,1-.23.08H8.1a.31.31,0,0,1-.34-.31L7.61,3.4a.36.36,0,0,1,.09-.24.23.23,0,0,1,.11-.08.27.27,0,0,1,.13,0h2.11a.32.32,0,0,1,.25.1.36.36,0,0,1,.09.24Z"></path>
    </g>
  </g>
    </svg>`;

const bookSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <g id="book">
    <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
    <path class="icon-background" fill="#D5A47D" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    <g>
      <path class="icon-component-shadow" opacity="0.3" isolation="isolate" d="M8.45,5.9c-1-.75-2.51-1.09-4.83-1.09H2.54v8.71H3.62a8.16,8.16,0,0,1,4.83,1.17Z"></path>
      <path class="icon-component-shadow" opacity="0.3" isolation="isolate" d="M9.54,14.69a8.14,8.14,0,0,1,4.84-1.17h1.08V4.81H14.38c-2.31,0-3.81.34-4.84,1.09Z"></path>
      <path class="icon-component" fill="#fff" d="M8.45,5.4c-1-.75-2.51-1.09-4.83-1.09H3V13h.58a8.09,8.09,0,0,1,4.83,1.17Z"></path>
      <path class="icon-component" fill="#fff" d="M9.54,14.19A8.14,8.14,0,0,1,14.38,13H15V4.31h-.58c-2.31,0-3.81.34-4.84,1.09Z"></path>
    </g>
  </g>
    </svg>`;

const bestMoveSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <g id="best">
    <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
    <path class="icon-background" fill="#81B64C" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    <path class="icon-component-shadow" opacity="0.2" d="M9,3.43a.5.5,0,0,0-.27.08.46.46,0,0,0-.17.22L7.24,7.17l-3.68.19a.52.52,0,0,0-.26.1.53.53,0,0,0-.16.23.45.45,0,0,0,0,.28.44.44,0,0,0,.15.23l2.86,2.32-1,3.56a.45.45,0,0,0,0,.28.46.46,0,0,0,.17.22.41.41,0,0,0,.26.09.43.43,0,0,0,.27-.08l3.09-2,3.09,2a.46.46,0,0,0,.53,0,.46.46,0,0,0,.17-.22.53.53,0,0,0,0-.28l-1-3.56L14.71,8.2A.44.44,0,0,0,14.86,8a.45.45,0,0,0,0-.28.53.53,0,0,0-.16-.23.52.52,0,0,0-.26-.1l-3.68-.2L9.44,3.73a.46.46,0,0,0-.17-.22A.5.5,0,0,0,9,3.43Z"></path>
    <path class="icon-component" fill="#fff" d="M9,2.93A.5.5,0,0,0,8.73,3a.46.46,0,0,0-.17.22L7.24,6.67l-3.68.19A.52.52,0,0,0,3.3,7a.53.53,0,0,0-.16.23.45.45,0,0,0,0,.28.44.44,0,0,0,.15.23L6.15,10l-1,3.56a.45.45,0,0,0,0,.28.46.46,0,0,0,.17.22.41.41,0,0,0,.26.09.43.43,0,0,0,.27-.08l3.09-2,3.09,2a.46.46,0,0,0,.53,0,.46.46,0,0,0,.17-.22.53.53,0,0,0,0-.28l-1-3.56L14.71,7.7a.44.44,0,0,0,.15-.23.45.45,0,0,0,0-.28A.53.53,0,0,0,14.7,7a.52.52,0,0,0-.26-.1l-3.68-.2L9.44,3.23A.46.46,0,0,0,9.27,3,.5.5,0,0,0,9,2.93Z"></path>
  </g>
    </svg>`;

const excellentMoveSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <g id="excellent">
    <g>
      <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
      <path class="icon-background" fill="#81B64C" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    </g>
    <g class="icon-component-shadow" opacity="0.2">
      <path d="M13.79,11.34c0-.2.4-.53.4-.94S14,9.72,14,9.58a2.06,2.06,0,0,0,.18-.83,1,1,0,0,0-.3-.69,1.13,1.13,0,0,0-.55-.2,10.29,10.29,0,0,1-2.07,0c-.37-.23,0-1.18.18-1.7S11.9,4,10.62,3.7c-.69-.17-.66.37-.78.9-.05.21-.09.43-.13.57A5,5,0,0,1,7.05,8.23a1.57,1.57,0,0,1-.42.18v4.94A7.23,7.23,0,0,1,8,13.53c.52.12.91.25,1.44.33A11.11,11.11,0,0,0,11,14a6.65,6.65,0,0,0,1.18,0,1.09,1.09,0,0,0,1-.59.66.66,0,0,0,.06-.2,1.63,1.63,0,0,1,.07-.3c.13-.28.37-.3.5-.68S13.74,11.53,13.79,11.34Z"></path>
      <path d="M5.49,8.09H4.31a.5.5,0,0,0-.5.5v4.56a.5.5,0,0,0,.5.5H5.49a.5.5,0,0,0,.5-.5V8.59A.5.5,0,0,0,5.49,8.09Z"></path>
    </g>
    <g>
      <path class="icon-component" fill="#fff" d="M13.79,10.84c0-.2.4-.53.4-.94S14,9.22,14,9.08a2.06,2.06,0,0,0,.18-.83,1,1,0,0,0-.3-.69,1.13,1.13,0,0,0-.55-.2,10.29,10.29,0,0,1-2.07,0c-.37-.23,0-1.18.18-1.7s.51-2.12-.77-2.43c-.69-.17-.66.37-.78.9-.05.21-.09.43-.13.57A5,5,0,0,1,7.05,7.73a1.57,1.57,0,0,1-.42.18v4.94A7.23,7.23,0,0,1,8,13c.52.12.91.25,1.44.33a11.11,11.11,0,0,0,1.62.16,6.65,6.65,0,0,0,1.18,0,1.09,1.09,0,0,0,1-.59.66.66,0,0,0,.06-.2,1.63,1.63,0,0,1,.07-.3c.13-.28.37-.3.5-.68S13.74,11,13.79,10.84Z"></path>
      <path class="icon-component" fill="#fff" d="M5.49,7.59H4.31a.5.5,0,0,0-.5.5v4.56a.5.5,0,0,0,.5.5H5.49a.5.5,0,0,0,.5-.5V8.09A.5.5,0,0,0,5.49,7.59Z"></path>
    </g>
  </g>
    </svg>`;

const goodMoveSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <g id="good">
    <g>
      <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
      <path class="icon-background" fill="#95b776" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    </g>
    <g>
      <path class="icon-component-shadow" opacity="0.2" d="M15.11,6.81,9.45,12.47,7.79,14.13a.39.39,0,0,1-.28.11.39.39,0,0,1-.27-.11L2.89,9.78a.39.39,0,0,1-.11-.28.39.39,0,0,1,.11-.27L4.28,7.85a.34.34,0,0,1,.12-.09l.15,0a.37.37,0,0,1,.15,0,.38.38,0,0,1,.13.09l2.69,2.68,5.65-5.65a.38.38,0,0,1,.13-.09.37.37,0,0,1,.15,0,.4.4,0,0,1,.15,0,.34.34,0,0,1,.12.09l1.39,1.38a.41.41,0,0,1,.08.13.33.33,0,0,1,0,.15.4.4,0,0,1,0,.15A.5.5,0,0,1,15.11,6.81Z"></path>
      <path class="icon-component" fill="#fff" d="M15.11,6.31,9.45,12,7.79,13.63a.39.39,0,0,1-.28.11.39.39,0,0,1-.27-.11L2.89,9.28A.39.39,0,0,1,2.78,9a.39.39,0,0,1,.11-.27L4.28,7.35a.34.34,0,0,1,.12-.09l.15,0a.37.37,0,0,1,.15,0,.38.38,0,0,1,.13.09L7.52,10l5.65-5.65a.38.38,0,0,1,.13-.09.37.37,0,0,1,.15,0,.4.4,0,0,1,.15,0,.34.34,0,0,1,.12.09l1.39,1.38a.41.41,0,0,1,.08.13.33.33,0,0,1,0,.15.4.4,0,0,1,0,.15A.5.5,0,0,1,15.11,6.31Z"></path>
    </g>
  </g>
    </svg>`;

const inaccuracyMoveSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <g id="inaccuracy">
    <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
    <path class="icon-background" fill="#F7C631" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    <g class="icon-component-shadow" opacity="0.2">
      <path d="M13.66,14.8a.28.28,0,0,1,0,.13.23.23,0,0,1-.08.11.28.28,0,0,1-.11.08l-.12,0h-2l-.13,0a.27.27,0,0,1-.1-.08A.36.36,0,0,1,11,14.8V12.9a.59.59,0,0,1,0-.13.36.36,0,0,1,.07-.1l.1-.08.13,0h2a.33.33,0,0,1,.23.1.39.39,0,0,1,.08.1.28.28,0,0,1,0,.13Zm-.12-3.93a.31.31,0,0,1,0,.13.3.3,0,0,1-.07.1.3.3,0,0,1-.23.08H11.43a.31.31,0,0,1-.34-.31L10.94,4.1A.5.5,0,0,1,11,3.86l.11-.08.13,0h2.11a.35.35,0,0,1,.26.1.41.41,0,0,1,.08.24Z"></path>
      <path d="M7.65,14.82a.27.27,0,0,1,0,.12.26.26,0,0,1-.07.11l-.1.07-.13,0H5.43a.25.25,0,0,1-.12,0,.27.27,0,0,1-.1-.08.31.31,0,0,1-.09-.22V13a.36.36,0,0,1,.09-.23l.1-.07.12,0H7.32a.32.32,0,0,1,.23.09.3.3,0,0,1,.07.1.28.28,0,0,1,0,.13Zm2.2-7.17a3.1,3.1,0,0,1-.36.73A5.58,5.58,0,0,1,9,9a4.85,4.85,0,0,1-.52.49,8,8,0,0,0-.65.63,1,1,0,0,0-.27.7V11a.21.21,0,0,1,0,.12.17.17,0,0,1-.06.1.23.23,0,0,1-.1.07l-.12,0H5.53a.21.21,0,0,1-.12,0,.18.18,0,0,1-.1-.07.2.2,0,0,1-.08-.1.37.37,0,0,1,0-.12v-.35a2.68,2.68,0,0,1,.13-.84,2.91,2.91,0,0,1,.33-.66,3.38,3.38,0,0,1,.45-.55c.16-.15.33-.29.49-.42a7.84,7.84,0,0,0,.65-.64,1,1,0,0,0,.25-.67.77.77,0,0,0-.07-.34.67.67,0,0,0-.23-.27A1.16,1.16,0,0,0,6.49,6,1.61,1.61,0,0,0,6,6.11a3,3,0,0,0-.41.18,1.75,1.75,0,0,0-.29.18l-.11.09A.5.5,0,0,1,5,6.62a.31.31,0,0,1-.21-.13l-1-1.21a.3.3,0,0,1,0-.4A1.36,1.36,0,0,1,4,4.68a3.07,3.07,0,0,1,.56-.38,5.49,5.49,0,0,1,.9-.37,3.69,3.69,0,0,1,1.19-.17,3.92,3.92,0,0,1,2.3.75,2.85,2.85,0,0,1,.77.92A2.82,2.82,0,0,1,10,6.71,3,3,0,0,1,9.85,7.65Z"></path>
    </g>
    <g>
      <path class="icon-component" fill="#fff" d="M13.66,14.3a.28.28,0,0,1,0,.13.23.23,0,0,1-.08.11.28.28,0,0,1-.11.08l-.12,0h-2l-.13,0a.27.27,0,0,1-.1-.08A.36.36,0,0,1,11,14.3V12.4a.59.59,0,0,1,0-.13.36.36,0,0,1,.07-.1l.1-.08.13,0h2a.33.33,0,0,1,.23.1.39.39,0,0,1,.08.1.28.28,0,0,1,0,.13Zm-.12-3.93a.31.31,0,0,1,0,.13.3.3,0,0,1-.07.1.3.3,0,0,1-.23.08H11.43a.31.31,0,0,1-.34-.31L10.94,3.6A.5.5,0,0,1,11,3.36l.11-.08.13,0h2.11a.35.35,0,0,1,.26.1.41.41,0,0,1,.08.24Z"></path>
      <path class="icon-component" fill="#fff" d="M7.65,14.32a.27.27,0,0,1,0,.12.26.26,0,0,1-.07.11l-.1.07-.13,0H5.43a.25.25,0,0,1-.12,0,.27.27,0,0,1-.1-.08.31.31,0,0,1-.09-.22V12.49a.36.36,0,0,1,.09-.23l.1-.07.12,0H7.32a.32.32,0,0,1,.23.09.3.3,0,0,1,.07.1.28.28,0,0,1,0,.13Zm2.2-7.17a3.1,3.1,0,0,1-.36.73,5.58,5.58,0,0,1-.49.6A4.85,4.85,0,0,1,8.48,9a8,8,0,0,0-.65.63,1,1,0,0,0-.27.7v.22a.21.21,0,0,1,0,.12.17.17,0,0,1-.06.1.23.23,0,0,1-.1.07l-.12,0H5.53a.21.21,0,0,1-.12,0,.18.18,0,0,1-.1-.07.2.2,0,0,1-.08-.1.37.37,0,0,1,0-.12v-.35a2.68,2.68,0,0,1,.13-.84,2.91,2.91,0,0,1,.33-.66,3.38,3.38,0,0,1,.45-.55c.16-.15.33-.29.49-.42a7.84,7.84,0,0,0,.65-.64,1,1,0,0,0,.25-.67.77.77,0,0,0-.07-.34.67.67,0,0,0-.23-.27,1.16,1.16,0,0,0-.72-.24A1.61,1.61,0,0,0,6,5.61a3,3,0,0,0-.41.18A1.75,1.75,0,0,0,5.3,6l-.11.09A.5.5,0,0,1,5,6.12.31.31,0,0,1,4.74,6l-1-1.21a.3.3,0,0,1,0-.4A1.36,1.36,0,0,1,4,4.18a3.07,3.07,0,0,1,.56-.38,5.49,5.49,0,0,1,.9-.37,3.69,3.69,0,0,1,1.19-.17A3.92,3.92,0,0,1,8.93,4a2.85,2.85,0,0,1,.77.92A2.82,2.82,0,0,1,10,6.21,3,3,0,0,1,9.85,7.15Z"></path>
    </g>
  </g>
    </svg>`;

const mistakeSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <g id="mistake">
    <g>
      <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
      <path class="icon-background" fill="#FFA459" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    </g>
    <g>
      <g class="icon-component-shadow" opacity="0.2">
        <path d="M9.92,15a.27.27,0,0,1,0,.12.41.41,0,0,1-.07.11.32.32,0,0,1-.23.09H7.7a.25.25,0,0,1-.12,0,.27.27,0,0,1-.1-.08A.31.31,0,0,1,7.39,15V13.19A.32.32,0,0,1,7.48,13l.1-.07.12,0H9.59a.32.32,0,0,1,.23.09.61.61,0,0,1,.07.1.28.28,0,0,1,0,.13Zm2.2-7.17a3.1,3.1,0,0,1-.36.73,5.58,5.58,0,0,1-.49.6,6,6,0,0,1-.52.49,8,8,0,0,0-.65.63,1,1,0,0,0-.27.7v.22a.24.24,0,0,1,0,.12.17.17,0,0,1-.06.1.3.3,0,0,1-.1.07l-.12,0H7.79l-.12,0a.3.3,0,0,1-.1-.07.26.26,0,0,1-.07-.1.37.37,0,0,1,0-.12v-.35A2.42,2.42,0,0,1,7.61,10a2.55,2.55,0,0,1,.33-.66,3.38,3.38,0,0,1,.45-.55c.16-.15.33-.29.49-.42a7.73,7.73,0,0,0,.64-.64,1,1,0,0,0,.26-.67.77.77,0,0,0-.07-.34.75.75,0,0,0-.23-.27,1.16,1.16,0,0,0-.72-.24,1.61,1.61,0,0,0-.49.07,3,3,0,0,0-.41.18,1.41,1.41,0,0,0-.29.18l-.11.09a.5.5,0,0,1-.24.06A.31.31,0,0,1,7,6.69L6,5.48a.29.29,0,0,1,0-.4,1.36,1.36,0,0,1,.21-.2,3.07,3.07,0,0,1,.56-.38,5.38,5.38,0,0,1,.89-.37A3.75,3.75,0,0,1,8.9,4a4.07,4.07,0,0,1,1.2.19,4,4,0,0,1,1.09.56,2.76,2.76,0,0,1,.78.92,2.82,2.82,0,0,1,.28,1.28A3,3,0,0,1,12.12,7.85Z"></path>
      </g>
      <path class="icon-component" fill="#fff" d="M9.92,14.52a.27.27,0,0,1,0,.12.41.41,0,0,1-.07.11.32.32,0,0,1-.23.09H7.7a.25.25,0,0,1-.12,0,.27.27,0,0,1-.1-.08.31.31,0,0,1-.09-.22V12.69a.32.32,0,0,1,.09-.23l.1-.07.12,0H9.59a.32.32,0,0,1,.23.09.61.61,0,0,1,.07.1.28.28,0,0,1,0,.13Zm2.2-7.17a3.1,3.1,0,0,1-.36.73,5.58,5.58,0,0,1-.49.6,6,6,0,0,1-.52.49,8,8,0,0,0-.65.63,1,1,0,0,0-.27.7v.22a.24.24,0,0,1,0,.12.17.17,0,0,1-.06.1.3.3,0,0,1-.1.07l-.12,0H7.79l-.12,0a.3.3,0,0,1-.1-.07.26.26,0,0,1-.07-.1.37.37,0,0,1,0-.12v-.35a2.42,2.42,0,0,1,.13-.84,2.55,2.55,0,0,1,.33-.66,3.38,3.38,0,0,1,.45-.55c.16-.15.33-.29.49-.42a7.73,7.73,0,0,0,.64-.64,1,1,0,0,0,.26-.67.77.77,0,0,0-.07-.34A.75.75,0,0,0,9.48,6a1.16,1.16,0,0,0-.72-.24,1.61,1.61,0,0,0-.49.07A3,3,0,0,0,7.86,6a1.41,1.41,0,0,0-.29.18l-.11.09a.5.5,0,0,1-.24.06A.31.31,0,0,1,7,6.19L6,5a.29.29,0,0,1,0-.4,1.36,1.36,0,0,1,.21-.2A3.07,3.07,0,0,1,6.81,4a5.38,5.38,0,0,1,.89-.37,3.75,3.75,0,0,1,1.2-.17,4.07,4.07,0,0,1,1.2.19,4,4,0,0,1,1.09.56,2.76,2.76,0,0,1,.78.92,2.82,2.82,0,0,1,.28,1.28A3,3,0,0,1,12.12,7.35Z"></path>
    </g>
  </g>
    </svg>`;

const missSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <defs><style>.cls-1{fill:#f1f2f2;}.cls-2{fill:#FF7769;}.cls-3{opacity:.2;}.cls-4{opacity:.3;}</style></defs><g id="incorrect"><path class="cls-4" d="M9,.5C4.03,.5,0,4.53,0,9.5s4.03,9,9,9,9-4.03,9-9S13.97,.5,9,.5Z"></path><path class="cls-2" d="M9,0C4.03,0,0,4.03,0,9s4.03,9,9,9,9-4.03,9-9S13.97,0,9,0Z"></path><g class="cls-3"><path d="M13.99,12.51s.06,.08,.08,.13c.02,.05,.03,.1,.03,.15s-.01,.1-.03,.15c-.02,.05-.05,.09-.08,.13l-1.37,1.37s-.08,.06-.13,.08c-.05,.02-.1,.03-.15,.03s-.1-.01-.15-.03c-.05-.02-.09-.05-.13-.08l-3.06-3.06-3.06,3.06s-.08,.06-.13,.08c-.05,.02-.1,.03-.15,.03s-.1-.01-.15-.03c-.05-.02-.09-.05-.13-.08l-1.37-1.37c-.07-.07-.11-.17-.11-.28s.04-.2,.11-.28l3.06-3.06-3.06-3.06c-.07-.07-.11-.17-.11-.28s.04-.2,.11-.28l1.37-1.37c.07-.07,.17-.11,.28-.11s.2,.04,.28,.11l3.06,3.06,3.06-3.06c.07-.07,.17-.11,.28-.11s.2,.04,.28,.11l1.37,1.37s.06,.08,.08,.13c.02,.05,.03,.1,.03,.15s-.01,.1-.03,.15c-.02,.05-.05,.09-.08,.13l-3.06,3.06,3.06,3.06Z"></path></g><path class="cls-1" d="M13.99,12.01s.06,.08,.08,.13c.02,.05,.03,.1,.03,.15s-.01,.1-.03,.15c-.02,.05-.05,.09-.08,.13l-1.37,1.37s-.08,.06-.13,.08c-.05,.02-.1,.03-.15,.03s-.1-.01-.15-.03c-.05-.02-.09-.05-.13-.08l-3.06-3.06-3.06,3.06s-.08,.06-.13,.08c-.05,.02-.1,.03-.15,.03s-.1-.01-.15-.03c-.05-.02-.09-.05-.13-.08l-1.37-1.37c-.07-.07-.11-.17-.11-.28s.04-.2,.11-.28l3.06-3.06-3.06-3.06c-.07-.07-.11-.17-.11-.28s.04-.2,.11-.28l1.37-1.37c.07-.07,.17-.11,.28-.11s.2,.04,.28,.11l3.06,3.06,3.06-3.06c.07-.07,.17-.11,.28-.11s.2,.04,.28,.11l1.37,1.37s.06,.08,.08,.13c.02,.05,.03,.1,.03,.15s-.01,.1-.03,.15c-.02,.05-.05,.09-.08,.13l-3.06,3.06,3.06,3.06Z"></path></g>
    </svg>`;

const blunderSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="${classMoveClassification}" width="24" height="24" viewBox="0 0 18 19">
      <g id="blunder">
    <path class="icon-shadow" opacity="0.3" d="M9,.5a9,9,0,1,0,9,9A9,9,0,0,0,9,.5Z"></path>
    <path class="icon-background" fill="#FA412D" d="M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"></path>
    <g class="icon-component-shadow" opacity="0.2">
      <path d="M14.74,5.45A2.58,2.58,0,0,0,14,4.54,3.76,3.76,0,0,0,12.89,4a4.07,4.07,0,0,0-1.2-.19A3.92,3.92,0,0,0,10.51,4a5.87,5.87,0,0,0-.9.37,3,3,0,0,0-.32.2,3.46,3.46,0,0,1,.42.63,3.29,3.29,0,0,1,.36,1.47.31.31,0,0,0,.19-.06l.11-.08a2.9,2.9,0,0,1,.29-.19,3.89,3.89,0,0,1,.41-.17,1.55,1.55,0,0,1,.48-.07,1.1,1.1,0,0,1,.72.24.72.72,0,0,1,.23.26.8.8,0,0,1,.07.34,1,1,0,0,1-.25.67,7.71,7.71,0,0,1-.65.63,6.2,6.2,0,0,0-.48.43,2.93,2.93,0,0,0-.45.54,2.55,2.55,0,0,0-.33.66,2.62,2.62,0,0,0-.13.83V11a.24.24,0,0,0,0,.12.35.35,0,0,0,.17.17l.12,0h1.71l.12,0a.23.23,0,0,0,.1-.07.21.21,0,0,0,.06-.1.27.27,0,0,0,0-.12V10.8a1,1,0,0,1,.26-.7q.27-.28.66-.63A5.79,5.79,0,0,0,14.05,9a4.51,4.51,0,0,0,.48-.6,2.56,2.56,0,0,0,.36-.72,2.81,2.81,0,0,0,.14-1A2.66,2.66,0,0,0,14.74,5.45Z"></path>
      <path d="M12.38,12.65H10.5l-.12,0a.34.34,0,0,0-.18.29v1.82a.36.36,0,0,0,.08.23.23.23,0,0,0,.1.07l.12,0h1.88a.24.24,0,0,0,.12,0,.26.26,0,0,0,.11-.07.36.36,0,0,0,.07-.1.28.28,0,0,0,0-.13V13a.27.27,0,0,0,0-.12.61.61,0,0,0-.07-.1A.32.32,0,0,0,12.38,12.65Z"></path>
      <path d="M6.79,12.65H4.91l-.12,0a.34.34,0,0,0-.18.29v1.82a.36.36,0,0,0,.08.23.23.23,0,0,0,.1.07l.12,0H6.79a.24.24,0,0,0,.12,0A.26.26,0,0,0,7,15a.36.36,0,0,0,.07-.1.28.28,0,0,0,0-.13V13a.27.27,0,0,0,0-.12.61.61,0,0,0-.07-.1A.32.32,0,0,0,6.79,12.65Z"></path>
      <path d="M8.39,4.54A3.76,3.76,0,0,0,7.3,4a4.07,4.07,0,0,0-1.2-.19A3.92,3.92,0,0,0,4.92,4a5.87,5.87,0,0,0-.9.37,3.37,3.37,0,0,0-.55.38l-.21.19a.32.32,0,0,0,0,.41l1,1.2a.26.26,0,0,0,.2.12.48.48,0,0,0,.24-.06l.11-.08a2.9,2.9,0,0,1,.29-.19l.4-.17A1.66,1.66,0,0,1,6,6.06a1.1,1.1,0,0,1,.72.24.72.72,0,0,1,.23.26A.77.77,0,0,1,7,6.9a1,1,0,0,1-.26.67,7.6,7.6,0,0,1-.64.63,6.28,6.28,0,0,0-.49.43,2.93,2.93,0,0,0-.45.54,2.72,2.72,0,0,0-.33.66,2.62,2.62,0,0,0-.13.83V11a.43.43,0,0,0,0,.12.39.39,0,0,0,.08.1.18.18,0,0,0,.1.07.21.21,0,0,0,.12,0H6.72l.12,0a.23.23,0,0,0,.1-.07.36.36,0,0,0,.07-.1A.5.5,0,0,0,7,11V10.8a1,1,0,0,1,.27-.7A8,8,0,0,1,8,9.47c.18-.15.35-.31.52-.48A7,7,0,0,0,9,8.39a3.23,3.23,0,0,0,.36-.72,3.07,3.07,0,0,0,.13-1,2.66,2.66,0,0,0-.29-1.27A2.58,2.58,0,0,0,8.39,4.54Z"></path>
    </g>
    <g>
      <path class="icon-component" fill="#fff" d="M14.74,5A2.58,2.58,0,0,0,14,4a3.76,3.76,0,0,0-1.09-.56,4.07,4.07,0,0,0-1.2-.19,3.92,3.92,0,0,0-1.18.17,5.87,5.87,0,0,0-.9.37,3,3,0,0,0-.32.2,3.46,3.46,0,0,1,.42.63,3.29,3.29,0,0,1,.36,1.47.31.31,0,0,0,.19-.06L10.37,6a2.9,2.9,0,0,1,.29-.19,3.89,3.89,0,0,1,.41-.17,1.55,1.55,0,0,1,.48-.07,1.1,1.1,0,0,1,.72.24.72.72,0,0,1,.23.26.8.8,0,0,1,.07.34,1,1,0,0,1-.25.67,7.71,7.71,0,0,1-.65.63,6.2,6.2,0,0,0-.48.43,2.93,2.93,0,0,0-.45.54,2.55,2.55,0,0,0-.33.66,2.62,2.62,0,0,0-.13.83v.35a.24.24,0,0,0,0,.12.35.35,0,0,0,.17.17l.12,0h1.71l.12,0a.23.23,0,0,0,.1-.07.21.21,0,0,0,.06-.1.27.27,0,0,0,0-.12V10.3a1,1,0,0,1,.26-.7q.27-.28.66-.63a5.79,5.79,0,0,0,.51-.48,4.51,4.51,0,0,0,.48-.6,2.56,2.56,0,0,0,.36-.72,2.81,2.81,0,0,0,.14-1A2.66,2.66,0,0,0,14.74,5Z"></path>
      <path class="icon-component" fill="#fff" d="M12.38,12.15H10.5l-.12,0a.34.34,0,0,0-.18.29v1.82a.36.36,0,0,0,.08.23.23.23,0,0,0,.1.07l.12,0h1.88a.24.24,0,0,0,.12,0,.26.26,0,0,0,.11-.07.36.36,0,0,0,.07-.1.28.28,0,0,0,0-.13V12.46a.27.27,0,0,0,0-.12.61.61,0,0,0-.07-.1A.32.32,0,0,0,12.38,12.15Z"></path>
      <path class="icon-component" fill="#fff" d="M6.79,12.15H4.91l-.12,0a.34.34,0,0,0-.18.29v1.82a.36.36,0,0,0,.08.23.23.23,0,0,0,.1.07l.12,0H6.79a.24.24,0,0,0,.12,0A.26.26,0,0,0,7,14.51a.36.36,0,0,0,.07-.1.28.28,0,0,0,0-.13V12.46a.27.27,0,0,0,0-.12.61.61,0,0,0-.07-.1A.32.32,0,0,0,6.79,12.15Z"></path>
      <path class="icon-component" fill="#fff" d="M8.39,4A3.76,3.76,0,0,0,7.3,3.48a4.07,4.07,0,0,0-1.2-.19,3.92,3.92,0,0,0-1.18.17,5.87,5.87,0,0,0-.9.37,3.37,3.37,0,0,0-.55.38l-.21.19a.32.32,0,0,0,0,.41l1,1.2a.26.26,0,0,0,.2.12.48.48,0,0,0,.24-.06L4.78,6a2.9,2.9,0,0,1,.29-.19l.4-.17A1.66,1.66,0,0,1,6,5.56a1.1,1.1,0,0,1,.72.24.72.72,0,0,1,.23.26A.77.77,0,0,1,7,6.4a1,1,0,0,1-.26.67,7.6,7.6,0,0,1-.64.63,6.28,6.28,0,0,0-.49.43,2.93,2.93,0,0,0-.45.54,2.72,2.72,0,0,0-.33.66,2.62,2.62,0,0,0-.13.83v.35a.43.43,0,0,0,0,.12.39.39,0,0,0,.08.1.18.18,0,0,0,.1.07.21.21,0,0,0,.12,0H6.72l.12,0a.23.23,0,0,0,.1-.07.36.36,0,0,0,.07-.1.5.5,0,0,0,0-.12V10.3a1,1,0,0,1,.27-.7A8,8,0,0,1,8,9c.18-.15.35-.31.52-.48A7,7,0,0,0,9,7.89a3.23,3.23,0,0,0,.36-.72,3.07,3.07,0,0,0,.13-1A2.66,2.66,0,0,0,9.15,5,2.58,2.58,0,0,0,8.39,4Z"></path>
    </g>
  </g>
    </svg>`;

const classificationSVG = {
  [MoveClassification.Best]: bestMoveSVG,
  [MoveClassification.Blunder]: blunderSVG,
  [MoveClassification.Book]: bookSVG,
  [MoveClassification.Brilliant]: BrillantSVG,
  [MoveClassification.Excellent]: excellentMoveSVG,
  [MoveClassification.Forced]: forcedSVG,
  [MoveClassification.Good]: goodMoveSVG,
  [MoveClassification.Great]: greatMoveSVG,
  [MoveClassification.Inaccuracy]: inaccuracyMoveSVG,
  [MoveClassification.Miss]: missSVG,
  [MoveClassification.Mistake]: mistakeSVG,
};

let Chess = function (fen) {
  var BLACK = "b";
  var WHITE = "w";

  var EMPTY = -1;

  var PAWN = "p";
  var KNIGHT = "n";
  var BISHOP = "b";
  var ROOK = "r";
  var QUEEN = "q";
  var KING = "k";

  var SYMBOLS = "pnbrqkPNBRQK";

  var DEFAULT_POSITION =
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

  var POSSIBLE_RESULTS = ["1-0", "0-1", "1/2-1/2", "*"];

  var PAWN_OFFSETS = {
    b: [16, 32, 17, 15],
    w: [-16, -32, -17, -15],
  };

  var PIECE_OFFSETS = {
    n: [-18, -33, -31, -14, 18, 33, 31, 14],
    b: [-17, -15, 17, 15],
    r: [-16, 1, 16, -1],
    q: [-17, -16, -15, 1, 17, 16, 15, -1],
    k: [-17, -16, -15, 1, 17, 16, 15, -1],
  };

  // prettier-ignore
  var ATTACKS = [
    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20, 0,
     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
    24,24,24,24,24,24,56,  0, 56,24,24,24,24,24,24, 0,
     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20
  ];

  // prettier-ignore
  var RAYS = [
     17,  0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0, 15, 0,
      0, 17,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0, 15,  0, 0,
      0,  0, 17,  0,  0,  0,  0, 16,  0,  0,  0,  0, 15,  0,  0, 0,
      0,  0,  0, 17,  0,  0,  0, 16,  0,  0,  0, 15,  0,  0,  0, 0,
      0,  0,  0,  0, 17,  0,  0, 16,  0,  0, 15,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0, 17,  0, 16,  0, 15,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0,  0, 17, 16, 15,  0,  0,  0,  0,  0,  0, 0,
      1,  1,  1,  1,  1,  1,  1,  0, -1, -1,  -1,-1, -1, -1, -1, 0,
      0,  0,  0,  0,  0,  0,-15,-16,-17,  0,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0,-15,  0,-16,  0,-17,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,-15,  0,  0,-16,  0,  0,-17,  0,  0,  0,  0, 0,
      0,  0,  0,-15,  0,  0,  0,-16,  0,  0,  0,-17,  0,  0,  0, 0,
      0,  0,-15,  0,  0,  0,  0,-16,  0,  0,  0,  0,-17,  0,  0, 0,
      0,-15,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,-17,  0, 0,
    -15,  0,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,  0,-17
  ];

  var SHIFTS = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 };

  var FLAGS = {
    NORMAL: "n",
    CAPTURE: "c",
    BIG_PAWN: "b",
    EP_CAPTURE: "e",
    PROMOTION: "p",
    KSIDE_CASTLE: "k",
    QSIDE_CASTLE: "q",
  };

  var BITS = {
    NORMAL: 1,
    CAPTURE: 2,
    BIG_PAWN: 4,
    EP_CAPTURE: 8,
    PROMOTION: 16,
    KSIDE_CASTLE: 32,
    QSIDE_CASTLE: 64,
  };

  var RANK_1 = 7;
  var RANK_2 = 6;
  var RANK_3 = 5;
  var RANK_4 = 4;
  var RANK_5 = 3;
  var RANK_6 = 2;
  var RANK_7 = 1;
  var RANK_8 = 0;

  // prettier-ignore
  var SQUARES = {
    a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
    a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
    a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
    a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
    a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
    a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
    a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
    a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
  };

  var ROOKS = {
    w: [
      { square: SQUARES.a1, flag: BITS.QSIDE_CASTLE },
      { square: SQUARES.h1, flag: BITS.KSIDE_CASTLE },
    ],
    b: [
      { square: SQUARES.a8, flag: BITS.QSIDE_CASTLE },
      { square: SQUARES.h8, flag: BITS.KSIDE_CASTLE },
    ],
  };

  var board = new Array(128);
  var kings = { w: EMPTY, b: EMPTY };
  var turn = WHITE;
  var castling = { w: 0, b: 0 };
  var ep_square = EMPTY;
  var half_moves = 0;
  var move_number = 1;
  var history = [];
  var header = {};

  /* if the user passes in a fen string, load it, else default to
   * starting position
   */
  if (typeof fen === "undefined") {
    load(DEFAULT_POSITION);
  } else {
    load(fen);
  }

  function clear(keep_headers) {
    if (typeof keep_headers === "undefined") {
      keep_headers = false;
    }

    board = new Array(128);
    kings = { w: EMPTY, b: EMPTY };
    turn = WHITE;
    castling = { w: 0, b: 0 };
    ep_square = EMPTY;
    half_moves = 0;
    move_number = 1;
    history = [];
    if (!keep_headers) header = {};
    update_setup(generate_fen());
  }

  function reset() {
    load(DEFAULT_POSITION);
  }

  function load(fen, keep_headers) {
    if (typeof keep_headers === "undefined") {
      keep_headers = false;
    }

    var tokens = fen.split(/\s+/);
    var position = tokens[0];
    var square = 0;

    if (!validate_fen(fen).valid) {
      return false;
    }

    clear(keep_headers);

    for (var i = 0; i < position.length; i++) {
      var piece = position.charAt(i);

      if (piece === "/") {
        square += 8;
      } else if (is_digit(piece)) {
        square += parseInt(piece, 10);
      } else {
        var color = piece < "a" ? WHITE : BLACK;
        put({ type: piece.toLowerCase(), color: color }, algebraic(square));
        square++;
      }
    }

    turn = tokens[1];

    if (tokens[2].indexOf("K") > -1) {
      castling.w |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf("Q") > -1) {
      castling.w |= BITS.QSIDE_CASTLE;
    }
    if (tokens[2].indexOf("k") > -1) {
      castling.b |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf("q") > -1) {
      castling.b |= BITS.QSIDE_CASTLE;
    }

    ep_square = tokens[3] === "-" ? EMPTY : SQUARES[tokens[3]];
    half_moves = parseInt(tokens[4], 10);
    move_number = parseInt(tokens[5], 10);

    update_setup(generate_fen());

    return true;
  }

  /* TODO: this function is pretty much crap - it validates structure but
   * completely ignores content (e.g. doesn't verify that each side has a king)
   * ... we should rewrite this, and ditch the silly error_number field while
   * we're at it
   */
  function validate_fen(fen) {
    var errors = {
      0: "No errors.",
      1: "FEN string must contain six space-delimited fields.",
      2: "6th field (move number) must be a positive integer.",
      3: "5th field (half move counter) must be a non-negative integer.",
      4: "4th field (en-passant square) is invalid.",
      5: "3rd field (castling availability) is invalid.",
      6: "2nd field (side to move) is invalid.",
      7: "1st field (piece positions) does not contain 8 '/'-delimited rows.",
      8: "1st field (piece positions) is invalid [consecutive numbers].",
      9: "1st field (piece positions) is invalid [invalid piece].",
      10: "1st field (piece positions) is invalid [row too large].",
      11: "Illegal en-passant square",
    };

    /* 1st criterion: 6 space-seperated fields? */
    var tokens = fen.split(/\s+/);
    if (tokens.length !== 6) {
      return { valid: false, error_number: 1, error: errors[1] };
    }

    /* 2nd criterion: move number field is a integer value > 0? */
    if (isNaN(tokens[5]) || parseInt(tokens[5], 10) <= 0) {
      return { valid: false, error_number: 2, error: errors[2] };
    }

    /* 3rd criterion: half move counter is an integer >= 0? */
    if (isNaN(tokens[4]) || parseInt(tokens[4], 10) < 0) {
      return { valid: false, error_number: 3, error: errors[3] };
    }

    /* 4th criterion: 4th field is a valid e.p.-string? */
    if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
      return { valid: false, error_number: 4, error: errors[4] };
    }

    /* 5th criterion: 3th field is a valid castle-string? */
    if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
      return { valid: false, error_number: 5, error: errors[5] };
    }

    /* 6th criterion: 2nd field is "w" (white) or "b" (black)? */
    if (!/^(w|b)$/.test(tokens[1])) {
      return { valid: false, error_number: 6, error: errors[6] };
    }

    /* 7th criterion: 1st field contains 8 rows? */
    var rows = tokens[0].split("/");
    if (rows.length !== 8) {
      return { valid: false, error_number: 7, error: errors[7] };
    }

    /* 8th criterion: every row is valid? */
    for (var i = 0; i < rows.length; i++) {
      /* check for right sum of fields AND not two numbers in succession */
      var sum_fields = 0;
      var previous_was_number = false;

      for (var k = 0; k < rows[i].length; k++) {
        if (!isNaN(rows[i][k])) {
          if (previous_was_number) {
            return { valid: false, error_number: 8, error: errors[8] };
          }
          sum_fields += parseInt(rows[i][k], 10);
          previous_was_number = true;
        } else {
          if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
            return { valid: false, error_number: 9, error: errors[9] };
          }
          sum_fields += 1;
          previous_was_number = false;
        }
      }
      if (sum_fields !== 8) {
        return { valid: false, error_number: 10, error: errors[10] };
      }
    }

    if (
      (tokens[3][1] == "3" && tokens[1] == "w") ||
      (tokens[3][1] == "6" && tokens[1] == "b")
    ) {
      return { valid: false, error_number: 11, error: errors[11] };
    }

    /* everything's okay! */
    return { valid: true, error_number: 0, error: errors[0] };
  }

  function generate_fen() {
    var empty = 0;
    var fen = "";

    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      if (board[i] == null) {
        empty++;
      } else {
        if (empty > 0) {
          fen += empty;
          empty = 0;
        }
        var color = board[i].color;
        var piece = board[i].type;

        fen += color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
      }

      if ((i + 1) & 0x88) {
        if (empty > 0) {
          fen += empty;
        }

        if (i !== SQUARES.h1) {
          fen += "/";
        }

        empty = 0;
        i += 8;
      }
    }

    var cflags = "";
    if (castling[WHITE] & BITS.KSIDE_CASTLE) {
      cflags += "K";
    }
    if (castling[WHITE] & BITS.QSIDE_CASTLE) {
      cflags += "Q";
    }
    if (castling[BLACK] & BITS.KSIDE_CASTLE) {
      cflags += "k";
    }
    if (castling[BLACK] & BITS.QSIDE_CASTLE) {
      cflags += "q";
    }

    /* do we have an empty castling flag? */
    cflags = cflags || "-";
    var epflags = ep_square === EMPTY ? "-" : algebraic(ep_square);

    return [fen, turn, cflags, epflags, half_moves, move_number].join(" ");
  }

  function set_header(args) {
    for (var i = 0; i < args.length; i += 2) {
      if (typeof args[i] === "string" && typeof args[i + 1] === "string") {
        header[args[i]] = args[i + 1];
      }
    }
    return header;
  }

  /* called when the initial board setup is changed with put() or remove().
   * modifies the SetUp and FEN properties of the header object.  if the FEN is
   * equal to the default position, the SetUp and FEN are deleted
   * the setup is only updated if history.length is zero, ie moves haven't been
   * made.
   */
  function update_setup(fen) {
    if (history.length > 0) return;

    if (fen !== DEFAULT_POSITION) {
      header["SetUp"] = "1";
      header["FEN"] = fen;
    } else {
      delete header["SetUp"];
      delete header["FEN"];
    }
  }

  function get(square) {
    var piece = board[SQUARES[square]];
    return piece ? { type: piece.type, color: piece.color } : null;
  }

  function put(piece, square) {
    /* check for valid piece object */
    if (!("type" in piece && "color" in piece)) {
      return false;
    }

    /* check for piece */
    if (SYMBOLS.indexOf(piece.type.toLowerCase()) === -1) {
      return false;
    }

    /* check for valid square */
    if (!(square in SQUARES)) {
      return false;
    }

    var sq = SQUARES[square];

    /* don't let the user place more than one king */
    if (
      piece.type == KING &&
      !(kings[piece.color] == EMPTY || kings[piece.color] == sq)
    ) {
      return false;
    }

    board[sq] = { type: piece.type, color: piece.color };
    if (piece.type === KING) {
      kings[piece.color] = sq;
    }

    update_setup(generate_fen());

    return true;
  }

  function remove(square) {
    var piece = get(square);
    board[SQUARES[square]] = null;
    if (piece && piece.type === KING) {
      kings[piece.color] = EMPTY;
    }

    update_setup(generate_fen());

    return piece;
  }

  function build_move(board, from, to, flags, promotion) {
    var move = {
      color: turn,
      from: from,
      to: to,
      flags: flags,
      piece: board[from].type,
    };

    if (promotion) {
      move.flags |= BITS.PROMOTION;
      move.promotion = promotion;
    }

    if (board[to]) {
      move.captured = board[to].type;
    } else if (flags & BITS.EP_CAPTURE) {
      move.captured = PAWN;
    }
    return move;
  }

  function generate_moves(options) {
    function add_move(board, moves, from, to, flags) {
      /* if pawn promotion */
      if (
        board[from].type === PAWN &&
        (rank(to) === RANK_8 || rank(to) === RANK_1)
      ) {
        var pieces = [QUEEN, ROOK, BISHOP, KNIGHT];
        for (var i = 0, len = pieces.length; i < len; i++) {
          moves.push(build_move(board, from, to, flags, pieces[i]));
        }
      } else {
        moves.push(build_move(board, from, to, flags));
      }
    }

    var moves = [];
    var us = turn;
    var them = swap_color(us);
    var second_rank = { b: RANK_7, w: RANK_2 };

    var first_sq = SQUARES.a8;
    var last_sq = SQUARES.h1;
    var single_square = false;

    /* do we want legal moves? */
    var legal =
      typeof options !== "undefined" && "legal" in options
        ? options.legal
        : true;

    /* are we generating moves for a single square? */
    if (typeof options !== "undefined" && "square" in options) {
      if (options.square in SQUARES) {
        first_sq = last_sq = SQUARES[options.square];
        single_square = true;
      } else {
        /* invalid square */
        return [];
      }
    }

    for (var i = first_sq; i <= last_sq; i++) {
      /* did we run off the end of the board */
      if (i & 0x88) {
        i += 7;
        continue;
      }

      var piece = board[i];
      if (piece == null || piece.color !== us) {
        continue;
      }

      if (piece.type === PAWN) {
        /* single square, non-capturing */
        var square = i + PAWN_OFFSETS[us][0];
        if (board[square] == null) {
          add_move(board, moves, i, square, BITS.NORMAL);

          /* double square */
          var square = i + PAWN_OFFSETS[us][1];
          if (second_rank[us] === rank(i) && board[square] == null) {
            add_move(board, moves, i, square, BITS.BIG_PAWN);
          }
        }

        /* pawn captures */
        for (j = 2; j < 4; j++) {
          var square = i + PAWN_OFFSETS[us][j];
          if (square & 0x88) continue;

          if (board[square] != null && board[square].color === them) {
            add_move(board, moves, i, square, BITS.CAPTURE);
          } else if (square === ep_square) {
            add_move(board, moves, i, ep_square, BITS.EP_CAPTURE);
          }
        }
      } else {
        for (var j = 0, len = PIECE_OFFSETS[piece.type].length; j < len; j++) {
          var offset = PIECE_OFFSETS[piece.type][j];
          var square = i;

          while (true) {
            square += offset;
            if (square & 0x88) break;

            if (board[square] == null) {
              add_move(board, moves, i, square, BITS.NORMAL);
            } else {
              if (board[square].color === us) break;
              add_move(board, moves, i, square, BITS.CAPTURE);
              break;
            }

            /* break, if knight or king */
            if (piece.type === "n" || piece.type === "k") break;
          }
        }
      }
    }

    /* check for castling if: a) we're generating all moves, or b) we're doing
     * single square move generation on the king's square
     */
    if (!single_square || last_sq === kings[us]) {
      /* king-side castling */
      if (castling[us] & BITS.KSIDE_CASTLE) {
        var castling_from = kings[us];
        var castling_to = castling_from + 2;

        if (
          board[castling_from + 1] == null &&
          board[castling_to] == null &&
          !attacked(them, kings[us]) &&
          !attacked(them, castling_from + 1) &&
          !attacked(them, castling_to)
        ) {
          add_move(board, moves, kings[us], castling_to, BITS.KSIDE_CASTLE);
        }
      }

      /* queen-side castling */
      if (castling[us] & BITS.QSIDE_CASTLE) {
        var castling_from = kings[us];
        var castling_to = castling_from - 2;

        if (
          board[castling_from - 1] == null &&
          board[castling_from - 2] == null &&
          board[castling_from - 3] == null &&
          !attacked(them, kings[us]) &&
          !attacked(them, castling_from - 1) &&
          !attacked(them, castling_to)
        ) {
          add_move(board, moves, kings[us], castling_to, BITS.QSIDE_CASTLE);
        }
      }
    }

    /* return all pseudo-legal moves (this includes moves that allow the king
     * to be captured)
     */
    if (!legal) {
      return moves;
    }

    /* filter out illegal moves */
    var legal_moves = [];
    for (var i = 0, len = moves.length; i < len; i++) {
      make_move(moves[i]);
      if (!king_attacked(us)) {
        legal_moves.push(moves[i]);
      }
      undo_move();
    }

    return legal_moves;
  }

  /* convert a move from 0x88 coordinates to Standard Algebraic Notation
   * (SAN)
   *
   * @param {boolean} sloppy Use the sloppy SAN generator to work around over
   * disambiguation bugs in Fritz and Chessbase.  See below:
   *
   * r1bqkbnr/ppp2ppp/2n5/1B1pP3/4P3/8/PPPP2PP/RNBQK1NR b KQkq - 2 4
   * 4. ... Nge7 is overly disambiguated because the knight on c6 is pinned
   * 4. ... Ne7 is technically the valid SAN
   */
  function move_to_san(move, sloppy) {
    var output = "";

    if (move.flags & BITS.KSIDE_CASTLE) {
      output = "O-O";
    } else if (move.flags & BITS.QSIDE_CASTLE) {
      output = "O-O-O";
    } else {
      var disambiguator = get_disambiguator(move, sloppy);

      if (move.piece !== PAWN) {
        output += move.piece.toUpperCase() + disambiguator;
      }

      if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
        if (move.piece === PAWN) {
          output += algebraic(move.from)[0];
        }
        output += "x";
      }

      output += algebraic(move.to);

      if (move.flags & BITS.PROMOTION) {
        output += "=" + move.promotion.toUpperCase();
      }
    }

    make_move(move);
    if (in_check()) {
      if (in_checkmate()) {
        output += "#";
      } else {
        output += "+";
      }
    }
    undo_move();

    return output;
  }

  // parses all of the decorators out of a SAN string
  function stripped_san(move) {
    return move.replace(/=/, "").replace(/[+#]?[?!]*$/, "");
  }

  function attacked(color, square) {
    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      /* did we run off the end of the board */
      if (i & 0x88) {
        i += 7;
        continue;
      }

      /* if empty square or wrong color */
      if (board[i] == null || board[i].color !== color) continue;

      var piece = board[i];
      var difference = i - square;
      var index = difference + 119;

      if (ATTACKS[index] & (1 << SHIFTS[piece.type])) {
        if (piece.type === PAWN) {
          if (difference > 0) {
            if (piece.color === WHITE) return true;
          } else {
            if (piece.color === BLACK) return true;
          }
          continue;
        }

        /* if the piece is a knight or a king */
        if (piece.type === "n" || piece.type === "k") return true;

        var offset = RAYS[index];
        var j = i + offset;

        var blocked = false;
        while (j !== square) {
          if (board[j] != null) {
            blocked = true;
            break;
          }
          j += offset;
        }

        if (!blocked) return true;
      }
    }

    return false;
  }

  function king_attacked(color) {
    return attacked(swap_color(color), kings[color]);
  }

  function in_check() {
    return king_attacked(turn);
  }

  function in_checkmate() {
    return in_check() && generate_moves().length === 0;
  }

  function in_stalemate() {
    return !in_check() && generate_moves().length === 0;
  }

  function insufficient_material() {
    var pieces = {};
    var bishops = [];
    var num_pieces = 0;
    var sq_color = 0;

    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      sq_color = (sq_color + 1) % 2;
      if (i & 0x88) {
        i += 7;
        continue;
      }

      var piece = board[i];
      if (piece) {
        pieces[piece.type] = piece.type in pieces ? pieces[piece.type] + 1 : 1;
        if (piece.type === BISHOP) {
          bishops.push(sq_color);
        }
        num_pieces++;
      }
    }

    /* k vs. k */
    if (num_pieces === 2) {
      return true;
    } else if (
      /* k vs. kn .... or .... k vs. kb */
      num_pieces === 3 &&
      (pieces[BISHOP] === 1 || pieces[KNIGHT] === 1)
    ) {
      return true;
    } else if (num_pieces === pieces[BISHOP] + 2) {
      /* kb vs. kb where any number of bishops are all on the same color */
      var sum = 0;
      var len = bishops.length;
      for (var i = 0; i < len; i++) {
        sum += bishops[i];
      }
      if (sum === 0 || sum === len) {
        return true;
      }
    }

    return false;
  }

  function in_threefold_repetition() {
    /* TODO: while this function is fine for casual use, a better
     * implementation would use a Zobrist key (instead of FEN). the
     * Zobrist key would be maintained in the make_move/undo_move functions,
     * avoiding the costly that we do below.
     */
    var moves = [];
    var positions = {};
    var repetition = false;

    while (true) {
      var move = undo_move();
      if (!move) break;
      moves.push(move);
    }

    while (true) {
      /* remove the last two fields in the FEN string, they're not needed
       * when checking for draw by rep */
      var fen = generate_fen().split(" ").slice(0, 4).join(" ");

      /* has the position occurred three or move times */
      positions[fen] = fen in positions ? positions[fen] + 1 : 1;
      if (positions[fen] >= 3) {
        repetition = true;
      }

      if (!moves.length) {
        break;
      }
      make_move(moves.pop());
    }

    return repetition;
  }

  function push(move) {
    history.push({
      move: move,
      kings: { b: kings.b, w: kings.w },
      turn: turn,
      castling: { b: castling.b, w: castling.w },
      ep_square: ep_square,
      half_moves: half_moves,
      move_number: move_number,
    });
  }

  function make_move(move) {
    var us = turn;
    var them = swap_color(us);
    push(move);

    board[move.to] = board[move.from];
    board[move.from] = null;

    /* if ep capture, remove the captured pawn */
    if (move.flags & BITS.EP_CAPTURE) {
      if (turn === BLACK) {
        board[move.to - 16] = null;
      } else {
        board[move.to + 16] = null;
      }
    }

    /* if pawn promotion, replace with new piece */
    if (move.flags & BITS.PROMOTION) {
      board[move.to] = { type: move.promotion, color: us };
    }

    /* if we moved the king */
    if (board[move.to].type === KING) {
      kings[board[move.to].color] = move.to;

      /* if we castled, move the rook next to the king */
      if (move.flags & BITS.KSIDE_CASTLE) {
        var castling_to = move.to - 1;
        var castling_from = move.to + 1;
        board[castling_to] = board[castling_from];
        board[castling_from] = null;
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        var castling_to = move.to + 1;
        var castling_from = move.to - 2;
        board[castling_to] = board[castling_from];
        board[castling_from] = null;
      }

      /* turn off castling */
      castling[us] = "";
    }

    /* turn off castling if we move a rook */
    if (castling[us]) {
      for (var i = 0, len = ROOKS[us].length; i < len; i++) {
        if (
          move.from === ROOKS[us][i].square &&
          castling[us] & ROOKS[us][i].flag
        ) {
          castling[us] ^= ROOKS[us][i].flag;
          break;
        }
      }
    }

    /* turn off castling if we capture a rook */
    if (castling[them]) {
      for (var i = 0, len = ROOKS[them].length; i < len; i++) {
        if (
          move.to === ROOKS[them][i].square &&
          castling[them] & ROOKS[them][i].flag
        ) {
          castling[them] ^= ROOKS[them][i].flag;
          break;
        }
      }
    }

    /* if big pawn move, update the en passant square */
    if (move.flags & BITS.BIG_PAWN) {
      if (turn === "b") {
        ep_square = move.to - 16;
      } else {
        ep_square = move.to + 16;
      }
    } else {
      ep_square = EMPTY;
    }

    /* reset the 50 move counter if a pawn is moved or a piece is captured */
    if (move.piece === PAWN) {
      half_moves = 0;
    } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      half_moves = 0;
    } else {
      half_moves++;
    }

    if (turn === BLACK) {
      move_number++;
    }
    turn = swap_color(turn);
  }

  function undo_move() {
    var old = history.pop();
    if (old == null) {
      return null;
    }

    var move = old.move;
    kings = old.kings;
    turn = old.turn;
    castling = old.castling;
    ep_square = old.ep_square;
    half_moves = old.half_moves;
    move_number = old.move_number;

    var us = turn;
    var them = swap_color(turn);

    board[move.from] = board[move.to];
    board[move.from].type = move.piece; // to undo any promotions
    board[move.to] = null;

    if (move.flags & BITS.CAPTURE) {
      board[move.to] = { type: move.captured, color: them };
    } else if (move.flags & BITS.EP_CAPTURE) {
      var index;
      if (us === BLACK) {
        index = move.to - 16;
      } else {
        index = move.to + 16;
      }
      board[index] = { type: PAWN, color: them };
    }

    if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
      var castling_to, castling_from;
      if (move.flags & BITS.KSIDE_CASTLE) {
        castling_to = move.to + 1;
        castling_from = move.to - 1;
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        castling_to = move.to - 2;
        castling_from = move.to + 1;
      }

      board[castling_to] = board[castling_from];
      board[castling_from] = null;
    }

    return move;
  }

  /* this function is used to uniquely identify ambiguous moves */
  function get_disambiguator(move, sloppy) {
    var moves = generate_moves({ legal: !sloppy });

    var from = move.from;
    var to = move.to;
    var piece = move.piece;

    var ambiguities = 0;
    var same_rank = 0;
    var same_file = 0;

    for (var i = 0, len = moves.length; i < len; i++) {
      var ambig_from = moves[i].from;
      var ambig_to = moves[i].to;
      var ambig_piece = moves[i].piece;

      /* if a move of the same piece type ends on the same to square, we'll
       * need to add a disambiguator to the algebraic notation
       */
      if (piece === ambig_piece && from !== ambig_from && to === ambig_to) {
        ambiguities++;

        if (rank(from) === rank(ambig_from)) {
          same_rank++;
        }

        if (file(from) === file(ambig_from)) {
          same_file++;
        }
      }
    }

    if (ambiguities > 0) {
      /* if there exists a similar moving piece on the same rank and file as
       * the move in question, use the square as the disambiguator
       */
      if (same_rank > 0 && same_file > 0) {
        return algebraic(from);
      } else if (same_file > 0) {
        /* if the moving piece rests on the same file, use the rank symbol as the
         * disambiguator
         */
        return algebraic(from).charAt(1);
      } else {
        /* else use the file symbol */
        return algebraic(from).charAt(0);
      }
    }

    return "";
  }

  function ascii() {
    var s = "   +------------------------+\n";
    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      /* display the rank */
      if (file(i) === 0) {
        s += " " + "87654321"[rank(i)] + " |";
      }

      /* empty piece */
      if (board[i] == null) {
        s += " . ";
      } else {
        var piece = board[i].type;
        var color = board[i].color;
        var symbol =
          color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
        s += " " + symbol + " ";
      }

      if ((i + 1) & 0x88) {
        s += "|\n";
        i += 8;
      }
    }
    s += "   +------------------------+\n";
    s += "     a  b  c  d  e  f  g  h\n";

    return s;
  }

  // convert a move from Standard Algebraic Notation (SAN) to 0x88 coordinates
  function move_from_san(move, sloppy) {
    // strip off any move decorations: e.g Nf3+?!
    var clean_move = stripped_san(move);

    // if we're using the sloppy parser run a regex to grab piece, to, and from
    // this should parse invalid SAN like: Pe2-e4, Rc1c4, Qf3xf7
    if (sloppy) {
      var matches = clean_move.match(
        /([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/,
      );
      if (matches) {
        var piece = matches[1];
        var from = matches[2];
        var to = matches[3];
        var promotion = matches[4];
      }
    }

    var moves = generate_moves();
    for (var i = 0, len = moves.length; i < len; i++) {
      // try the strict parser first, then the sloppy parser if requested
      // by the user
      if (
        clean_move === stripped_san(move_to_san(moves[i])) ||
        (sloppy && clean_move === stripped_san(move_to_san(moves[i], true)))
      ) {
        return moves[i];
      } else {
        if (
          matches &&
          (!piece || piece.toLowerCase() == moves[i].piece) &&
          SQUARES[from] == moves[i].from &&
          SQUARES[to] == moves[i].to &&
          (!promotion || promotion.toLowerCase() == moves[i].promotion)
        ) {
          return moves[i];
        }
      }
    }

    return null;
  }

  /*****************************************************************************
   * UTILITY FUNCTIONS
   ****************************************************************************/
  function rank(i) {
    return i >> 4;
  }

  function file(i) {
    return i & 15;
  }

  function algebraic(i) {
    var f = file(i),
      r = rank(i);
    return "abcdefgh".substring(f, f + 1) + "87654321".substring(r, r + 1);
  }

  function swap_color(c) {
    return c === WHITE ? BLACK : WHITE;
  }

  function is_digit(c) {
    return "0123456789".indexOf(c) !== -1;
  }

  /* pretty = external move object */
  function make_pretty(ugly_move) {
    var move = clone(ugly_move);
    move.san = move_to_san(move, false);
    move.to = algebraic(move.to);
    move.from = algebraic(move.from);

    var flags = "";

    for (var flag in BITS) {
      if (BITS[flag] & move.flags) {
        flags += FLAGS[flag];
      }
    }
    move.flags = flags;

    return move;
  }

  function clone(obj) {
    var dupe = obj instanceof Array ? [] : {};

    for (var property in obj) {
      if (typeof property === "object") {
        dupe[property] = clone(obj[property]);
      } else {
        dupe[property] = obj[property];
      }
    }

    return dupe;
  }

  function trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
  }

  /*****************************************************************************
   * DEBUGGING UTILITIES
   ****************************************************************************/
  function perft(depth) {
    var moves = generate_moves({ legal: false });
    var nodes = 0;
    var color = turn;

    for (var i = 0, len = moves.length; i < len; i++) {
      make_move(moves[i]);
      if (!king_attacked(color)) {
        if (depth - 1 > 0) {
          var child_nodes = perft(depth - 1);
          nodes += child_nodes;
        } else {
          nodes++;
        }
      }
      undo_move();
    }

    return nodes;
  }

  return {
    /***************************************************************************
     * PUBLIC CONSTANTS (is there a better way to do this?)
     **************************************************************************/
    WHITE: WHITE,
    BLACK: BLACK,
    PAWN: PAWN,
    KNIGHT: KNIGHT,
    BISHOP: BISHOP,
    ROOK: ROOK,
    QUEEN: QUEEN,
    KING: KING,
    SQUARES: (function () {
      /* from the ECMA-262 spec (section 12.6.4):
       * "The mechanics of enumerating the properties ... is
       * implementation dependent"
       * so: for (var sq in SQUARES) { keys.push(sq); } might not be
       * ordered correctly
       */
      var keys = [];
      for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
        if (i & 0x88) {
          i += 7;
          continue;
        }
        keys.push(algebraic(i));
      }
      return keys;
    })(),
    FLAGS: FLAGS,

    /***************************************************************************
     * PUBLIC API
     **************************************************************************/
    load: function (fen) {
      return load(fen);
    },

    reset: function () {
      return reset();
    },

    moves: function (options) {
      /* The internal representation of a chess move is in 0x88 format, and
       * not meant to be human-readable.  The code below converts the 0x88
       * square coordinates to algebraic coordinates.  It also prunes an
       * unnecessary move keys resulting from a verbose call.
       */

      var ugly_moves = generate_moves(options);
      var moves = [];

      for (var i = 0, len = ugly_moves.length; i < len; i++) {
        /* does the user want a full move object (most likely not), or just
         * SAN
         */
        if (
          typeof options !== "undefined" &&
          "verbose" in options &&
          options.verbose
        ) {
          moves.push(make_pretty(ugly_moves[i]));
        } else {
          moves.push(move_to_san(ugly_moves[i], false));
        }
      }

      return moves;
    },

    in_check: function () {
      return in_check();
    },

    in_checkmate: function () {
      return in_checkmate();
    },

    in_stalemate: function () {
      return in_stalemate();
    },

    in_draw: function () {
      return (
        half_moves >= 100 ||
        in_stalemate() ||
        insufficient_material() ||
        in_threefold_repetition()
      );
    },

    insufficient_material: function () {
      return insufficient_material();
    },

    in_threefold_repetition: function () {
      return in_threefold_repetition();
    },

    game_over: function () {
      return (
        half_moves >= 100 ||
        in_checkmate() ||
        in_stalemate() ||
        insufficient_material() ||
        in_threefold_repetition()
      );
    },

    validate_fen: function (fen) {
      return validate_fen(fen);
    },

    fen: function () {
      return generate_fen();
    },

    board: function () {
      var output = [],
        row = [];

      for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
        if (board[i] == null) {
          row.push(null);
        } else {
          row.push({ type: board[i].type, color: board[i].color });
        }
        if ((i + 1) & 0x88) {
          output.push(row);
          row = [];
          i += 8;
        }
      }

      return output;
    },

    pgn: function (options) {
      /* using the specification from http://www.chessclub.com/help/PGN-spec
       * example for html usage: .pgn({ max_width: 72, newline_char: "<br />" })
       */
      var newline =
        typeof options === "object" && typeof options.newline_char === "string"
          ? options.newline_char
          : "\n";
      var max_width =
        typeof options === "object" && typeof options.max_width === "number"
          ? options.max_width
          : 0;
      var result = [];
      var header_exists = false;

      /* add the PGN header headerrmation */
      for (var i in header) {
        /* TODO: order of enumerated properties in header object is not
         * guaranteed, see ECMA-262 spec (section 12.6.4)
         */
        result.push("[" + i + ' "' + header[i] + '"]' + newline);
        header_exists = true;
      }

      if (header_exists && history.length) {
        result.push(newline);
      }

      /* pop all of history onto reversed_history */
      var reversed_history = [];
      while (history.length > 0) {
        reversed_history.push(undo_move());
      }

      var moves = [];
      var move_string = "";

      /* build the list of moves.  a move_string looks like: "3. e3 e6" */
      while (reversed_history.length > 0) {
        var move = reversed_history.pop();

        /* if the position started with black to move, start PGN with 1. ... */
        if (!history.length && move.color === "b") {
          move_string = move_number + ". ...";
        } else if (move.color === "w") {
          /* store the previous generated move_string if we have one */
          if (move_string.length) {
            moves.push(move_string);
          }
          move_string = move_number + ".";
        }

        move_string = move_string + " " + move_to_san(move, false);
        make_move(move);
      }

      /* are there any other leftover moves? */
      if (move_string.length) {
        moves.push(move_string);
      }

      /* is there a result? */
      if (typeof header.Result !== "undefined") {
        moves.push(header.Result);
      }

      /* history should be back to what is was before we started generating PGN,
       * so join together moves
       */
      if (max_width === 0) {
        return result.join("") + moves.join(" ");
      }

      /* wrap the PGN output at max_width */
      var current_width = 0;
      for (var i = 0; i < moves.length; i++) {
        /* if the current move will push past max_width */
        if (current_width + moves[i].length > max_width && i !== 0) {
          /* don't end the line with whitespace */
          if (result[result.length - 1] === " ") {
            result.pop();
          }

          result.push(newline);
          current_width = 0;
        } else if (i !== 0) {
          result.push(" ");
          current_width++;
        }
        result.push(moves[i]);
        current_width += moves[i].length;
      }

      return result.join("");
    },

    load_pgn: function (pgn, options) {
      // allow the user to specify the sloppy move parser to work around over
      // disambiguation bugs in Fritz and Chessbase
      var sloppy =
        typeof options !== "undefined" && "sloppy" in options
          ? options.sloppy
          : false;

      function mask(str) {
        return str.replace(/\\/g, "\\");
      }

      function has_keys(object) {
        for (var key in object) {
          return true;
        }
        return false;
      }

      function parse_pgn_header(header, options) {
        var newline_char =
          typeof options === "object" &&
          typeof options.newline_char === "string"
            ? options.newline_char
            : "\r?\n";
        var header_obj = {};
        var headers = header.split(new RegExp(mask(newline_char)));
        var key = "";
        var value = "";

        for (var i = 0; i < headers.length; i++) {
          key = headers[i].replace(/^\[([A-Z][A-Za-z]*)\s.*\]$/, "$1");
          value = headers[i].replace(/^\[[A-Za-z]+\s"(.*)"\]$/, "$1");
          if (trim(key).length > 0) {
            header_obj[key] = value;
          }
        }

        return header_obj;
      }

      var newline_char =
        typeof options === "object" && typeof options.newline_char === "string"
          ? options.newline_char
          : "\r?\n";

      // RegExp to split header. Takes advantage of the fact that header and movetext
      // will always have a blank line between them (ie, two newline_char's).
      // With default newline_char, will equal: /^(\[((?:\r?\n)|.)*\])(?:\r?\n){2}/
      var header_regex = new RegExp(
        "^(\\[((?:" +
          mask(newline_char) +
          ")|.)*\\])" +
          "(?:" +
          mask(newline_char) +
          "){2}",
      );

      // If no header given, begin with moves.
      var header_string = header_regex.test(pgn)
        ? header_regex.exec(pgn)[1]
        : "";

      // Put the board in the starting position
      reset();

      /* parse PGN header */
      var headers = parse_pgn_header(header_string, options);
      for (var key in headers) {
        set_header([key, headers[key]]);
      }

      /* load the starting position indicated by [Setup '1'] and
       * [FEN position] */
      if (headers["SetUp"] === "1") {
        if (!("FEN" in headers && load(headers["FEN"], true))) {
          // second argument to load: don't clear the headers
          return false;
        }
      }

      /* delete header to get the moves */
      var ms = pgn
        .replace(header_string, "")
        .replace(new RegExp(mask(newline_char), "g"), " ");

      /* delete comments */
      ms = ms.replace(/(\{[^}]+\})+?/g, "");

      /* delete recursive annotation variations */
      var rav_regex = /(\([^\(\)]+\))+?/g;
      while (rav_regex.test(ms)) {
        ms = ms.replace(rav_regex, "");
      }

      /* delete move numbers */
      ms = ms.replace(/\d+\.(\.\.)?/g, "");

      /* delete ... indicating black to move */
      ms = ms.replace(/\.\.\./g, "");

      /* delete numeric annotation glyphs */
      ms = ms.replace(/\$\d+/g, "");

      /* trim and get array of moves */
      var moves = trim(ms).split(new RegExp(/\s+/));

      /* delete empty entries */
      moves = moves.join(",").replace(/,,+/g, ",").split(",");
      var move = "";

      for (var half_move = 0; half_move < moves.length - 1; half_move++) {
        move = move_from_san(moves[half_move], sloppy);

        /* move not possible! (don't clear the board to examine to show the
         * latest valid position)
         */
        if (move == null) {
          return false;
        } else {
          make_move(move);
        }
      }

      /* examine last move */
      move = moves[moves.length - 1];
      if (POSSIBLE_RESULTS.indexOf(move) > -1) {
        if (has_keys(header) && typeof header.Result === "undefined") {
          set_header(["Result", move]);
        }
      } else {
        move = move_from_san(move, sloppy);
        if (move == null) {
          return false;
        } else {
          make_move(move);
        }
      }
      return true;
    },

    header: function () {
      return set_header(arguments);
    },

    ascii: function () {
      return ascii();
    },

    turn: function () {
      return turn;
    },

    move: function (move, options) {
      /* The move function can be called with in the following parameters:
       *
       * .move('Nxb7')      <- where 'move' is a case-sensitive SAN string
       *
       * .move({ from: 'h7', <- where the 'move' is a move object (additional
       *         to :'h8',      fields are ignored)
       *         promotion: 'q',
       *      })
       */

      // allow the user to specify the sloppy move parser to work around over
      // disambiguation bugs in Fritz and Chessbase
      var sloppy =
        typeof options !== "undefined" && "sloppy" in options
          ? options.sloppy
          : false;

      var move_obj = null;

      if (typeof move === "string") {
        move_obj = move_from_san(move, sloppy);
      } else if (typeof move === "object") {
        var moves = generate_moves();

        /* convert the pretty move object to an ugly move object */
        for (var i = 0, len = moves.length; i < len; i++) {
          if (
            move.from === algebraic(moves[i].from) &&
            move.to === algebraic(moves[i].to) &&
            (!("promotion" in moves[i]) ||
              move.promotion === moves[i].promotion)
          ) {
            move_obj = moves[i];
            break;
          }
        }
      }

      /* failed to find move */
      if (!move_obj) {
        return null;
      }

      /* need to make a copy of move because we can't generate SAN after the
       * move is made
       */
      var pretty_move = make_pretty(move_obj);

      make_move(move_obj);

      return pretty_move;
    },

    undo: function () {
      var move = undo_move();
      return move ? make_pretty(move) : null;
    },

    clear: function () {
      return clear();
    },

    put: function (piece, square) {
      return put(piece, square);
    },

    get: function (square) {
      return get(square);
    },

    remove: function (square) {
      return remove(square);
    },

    perft: function (depth) {
      return perft(depth);
    },

    square_color: function (square) {
      if (square in SQUARES) {
        var sq_0x88 = SQUARES[square];
        return (rank(sq_0x88) + file(sq_0x88)) % 2 === 0 ? "light" : "dark";
      }

      return null;
    },

    history: function (options) {
      var reversed_history = [];
      var move_history = [];
      var verbose =
        typeof options !== "undefined" &&
        "verbose" in options &&
        options.verbose;

      while (history.length > 0) {
        reversed_history.push(undo_move());
      }

      while (reversed_history.length > 0) {
        var move = reversed_history.pop();
        if (verbose) {
          move_history.push(make_pretty(move));
        } else {
          move_history.push(move_to_san(move));
        }
        make_move(move);
      }

      return move_history;
    },
  };
};

const chess2 = new Chess();

function getMoveFromFEN(fenBefore, fenAfter) {
  chess2.load(fenBefore);
  const moves = chess2.moves({ verbose: true });
  for (const move of moves) {
    chess2.move(move);
    if (chess2.fen() === fenAfter) {
      chess2.load(fenBefore);
      return move;
    }
    chess2.undo();
  }
  return null;
}

function placeSVGOnBoard(side, square, svgCode) {
  const board =
    document.querySelector("wc-chess-board") ||
    document.querySelector("cg-board");
  if (!board) return;

  const rect = board.getBoundingClientRect();
  const boardSize = rect.width;
  const squareSize = boardSize / 8;

  const file = square.charCodeAt(0) - 97;
  const rank = parseInt(square[1]);

  let x, y;

  if (side === "white") {
    x = file * squareSize;
    y = (8 - rank) * squareSize;
  } else {
    x = (7 - file) * squareSize;
    y = (rank - 1) * squareSize;
  }

  const squareContainer = document.createElement("div");
  squareContainer.style.position = "absolute";
  squareContainer.style.left = rect.left + x + squareSize + "px"; // coin droit
  squareContainer.style.top = rect.top + y + "px";
  squareContainer.style.pointerEvents = "none";

  const wrapper = document.createElement("div");
  wrapper.innerHTML = svgCode;

  const svg = wrapper.querySelector("svg");
  svg.style.position = "absolute";
  svg.style.zIndex = "9999";

  squareContainer.appendChild(svg);
  document.body.appendChild(squareContainer);

  requestAnimationFrame(() => {
    const box = svg.getBBox();
    svg.style.left = -box.width / 2 + "px";
    svg.style.top = -box.height / 2 + "px";
  });
}

// placeSVGOnBoard("white", "e2", blunderSVG)

function clickButtonsByText(text) {
  const buttons = Array.from(document.querySelectorAll("button"));
  const targetButtons = buttons.filter((btn) =>
    btn.innerText.trim().includes(text),
  );
  if (targetButtons.length === 0) return;
  targetButtons[0].click();
  targetButtons.shift();
  setTimeout(() => clickButtonsByText(text), 100);
}

function preInjection() {
  const s = document.createElement("script");
  s.src = chrome.runtime.getURL("a.js");
  (document.head || document.documentElement).appendChild(s);
  s.onload = () => s.remove();
}

preInjection();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function squareToPixels(square, boardInfo, orientation = "white") {
  const files = "abcdefgh";
  const file = files.indexOf(square[0]); // e = 4
  const rank = parseInt(square[1], 10) - 1; // 2 -> index 1

  const squareSize = boardInfo.width / 8;

  let x, y;

  if (orientation === "white") {
    x = boardInfo.left + file * squareSize + squareSize / 2;
    y = boardInfo.top + (7 - rank) * squareSize + squareSize / 2;
  } else {
    x = boardInfo.left + (7 - file) * squareSize + squareSize / 2;
    y = boardInfo.top + rank * squareSize + squareSize / 2;
  }

  return { x, y };
}

function countMoves(fenString) {
  const parts = fenString.split("moves");
  if (parts.length < 2) return 0;
  const movesPart = parts[1].trim();
  const movesArray = movesPart.split(/\s+/);
  return movesArray.length;
}

function randomIntBetween(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function clearHighlightSquares() {
  document.querySelectorAll(".customH").forEach((el) => el.remove());
}
function clearHint() {
  const className = "." + classMoveClassification;
  document.querySelectorAll(className).forEach((el) => el.remove());
}

const interval = 100;

let config = {
  elo: 3500,
  lines: 5,
  colors: ["#0000ff", "#00ff00", "#FFFF00", "#f97316", "#ff0000"],
  depth: 10,
  delay: 100,
  style: "Default",
  autoMove: false,
  moveClassification: false,
  stat: false,
  winningMove: false,
  showEval: false,
  onlyShowEval: false,
  key: " ",
};

chrome.storage.local.get(["chessConfig"], (result) => {
  config = result.chessConfig || {
    elo: 3500,
    lines: 5,
    colors: ["#0000ff", "#00ff00", "#FFFF00", "#f97316", "#ff0000"],
    depth: 10,
    delay: 100,
    style: "Default",
    autoMove: false,
    moveClassification: false,
    stat: false,
    winningMove: false,
    showEval: false,
    onlyShowEval: false,
    key: " ",
  };

  engine.updateConfig(config.lines, config.depth, config.style, config.elo);
});

async function createWorker() {
  const url = `${chrome.runtime.getURL("lib/engine.js")}`;
  const blob = new Blob([`importScripts("${url}");`], {
    type: "application/javascript",
  });
  const blobUrl = URL.createObjectURL(blob);

  return new Worker(blobUrl);
}

class ChessAnalyzer {
  constructor({ depth = 12 } = {}) {
    this.depth = depth;

    this.engine = null;
    this._resolveEval = null;
    this._currentLines = [];

    // Cache FEN → { lines, bestMove }
    this._cache = new Map();

    // Queue interne
    this._queue = [];
    this._running = false;
  }

  // ─── Init ─────────────────────────────────────────────────────────────
  async init() {
    this.engine = await this._createWorker();
    await this._waitReady();
  }

  _createWorker() {
    return new Promise((resolve, reject) => {
      try {
        const stockfishUrl = chrome.runtime.getURL("lib/stockfish.js");
        const blob = new Blob([`importScripts("${stockfishUrl}");`], {
          type: "application/javascript",
        });
        const blobUrl = URL.createObjectURL(blob);
        const worker = new Worker(blobUrl);
        URL.revokeObjectURL(blobUrl);
        resolve(worker);
      } catch (e) {
        reject(new Error("Failed to create Stockfish worker: " + e.message));
      }
    });
  }

  _waitReady() {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error("Stockfish readyok timeout")),
        10000,
      );

      const originalOnMessage = this.engine.onmessage;

      this.engine.onmessage = (e) => {
        if (e.data === "readyok") {
          clearTimeout(timeout);
          this.engine.onmessage = (ev) => this._handleMessage(ev.data);
          resolve();
          return;
        }
        originalOnMessage?.(e);
      };

      this.engine.postMessage("uci");
      this.engine.postMessage("ucinewgame");
      this.engine.postMessage("isready");
    });
  }

  terminate() {
    this.engine?.terminate();
    this.engine = null;
  }

  reset() {
    this._cache.clear();
    this._queue = [];
    this._running = false;
  }

  async update(fenHistory, { whiteElo, blackElo, onProgress } = {}) {
    if (fenHistory.length < 2) return;

    const newFens = fenHistory.filter((fen) => !this._cache.has(fen));

    if (newFens.length > 0) {
      await this._enqueueAndWait(newFens, () => {
        onProgress?.(this._cache.size / fenHistory.length);
      });
    }

    const positions = fenHistory.map((fen) => this._cache.get(fen));
    const withPlayed = this._attachPlayedMoves(positions, fenHistory);

    const classified = this._classifyMoves(withPlayed);

    const {
      white: whiteAcc,
      black: blackAcc,
      movesAccuracy,
    } = this._computeAccuracy(classified);

    const eloEst = this._computeEstimatedElo(classified, whiteElo, blackElo);

    const moves = classified.slice(1).map((pos, i) => ({
      moveIndex: i + 1,
      isWhite: i % 2 === 0,
      moveNumber: Math.ceil((i + 1) / 2),
      classification: pos.moveClassification,
      accuracy: movesAccuracy[i] ?? null,
      winPercent: this._getPositionWinPercentage(pos),
      cp: pos.lines[0]?.cp ?? null,
      mate: pos.lines[0]?.mate ?? null,
    }));

    return {
      white: {
        accuracy: parseFloat(whiteAcc.toFixed(1)),
        elo: eloEst?.white ?? null,
        acpl: eloEst?.whiteCpl ?? null,
      },
      black: {
        accuracy: parseFloat(blackAcc.toFixed(1)),
        elo: eloEst?.black ?? null,
        acpl: eloEst?.blackCpl ?? null,
      },
      moves,
      cached: fenHistory.length - newFens.length,
      computed: newFens.length,
    };
  }

  // ═══════════════════════════════════════════════════════════════════════
  // QUEUE
  // ═══════════════════════════════════════════════════════════════════════

  _enqueueAndWait(fens, onEach) {
    for (const fen of fens) {
      if (!this._cache.has(fen) && !this._queue.includes(fen)) {
        this._queue.push(fen);
      }
    }

    if (this._running) {
      return this._waitUntilCached(fens);
    }

    return this._drainQueue(onEach);
  }

  async _drainQueue(onEach) {
    this._running = true;
    while (this._queue.length > 0) {
      const fen = this._queue.shift();
      if (this._cache.has(fen)) continue;

      const result = await this._evalPosition(fen);
      this._cache.set(fen, result);
      onEach?.(fen);
    }
    this._running = false;
  }

  _waitUntilCached(fens) {
    return new Promise((resolve) => {
      const check = () => {
        if (fens.every((f) => this._cache.has(f))) resolve();
        else setTimeout(check, 50);
      };
      check();
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // STOCKFISH WRAPPER
  // ═══════════════════════════════════════════════════════════════════════

  _handleMessage(msg) {
    if (msg.startsWith("info") && msg.includes(" pv ")) {
      const depthMatch = msg.match(/\bdepth (\d+)/);
      const multiPvMatch = msg.match(/\bmultipv (\d+)/);
      const cpMatch = msg.match(/\bscore cp (-?\d+)/);
      const mateMatch = msg.match(/\bscore mate (-?\d+)/);
      const pvMatch = msg.match(/ pv (.+)/);
      if (!depthMatch || !multiPvMatch || !pvMatch) return;

      const multiPv = parseInt(multiPvMatch[1]);
      const pv = pvMatch[1].trim().split(" ");
      const line = { pv, depth: parseInt(depthMatch[1]), multiPv };
      if (cpMatch) line.cp = parseInt(cpMatch[1]);
      if (mateMatch) line.mate = parseInt(mateMatch[1]);
      this._currentLines[multiPv - 1] = line;
    }

    if (msg.startsWith("bestmove")) {
      const bestMove = msg.split(" ")[1];
      if (this._resolveEval) {
        this._resolveEval({
          lines: this._currentLines.filter(Boolean),
          bestMove,
        });
        this._resolveEval = null;
      }
    }
  }

  _evalPosition(fen) {
    return new Promise((resolve) => {
      this._currentLines = [];
      const whiteToPlay = fen.split(" ")[1] === "w";

      this._resolveEval = (result) => {
        if (!whiteToPlay) {
          result.lines = result.lines.map((line) => ({
            ...line,
            cp: line.cp !== undefined ? -line.cp : line.cp,
            mate: line.mate !== undefined ? -line.mate : line.mate,
          }));
        }
        resolve(result);
      };

      this.engine.postMessage(`position fen ${fen}`);
      this.engine.postMessage(`setoption name MultiPV value 2`);
      this.engine.postMessage(`go depth ${this.depth}`);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // DÉTECTION DU COUP JOUÉ
  // ═══════════════════════════════════════════════════════════════════════

  _attachPlayedMoves(positions, fenHistory) {
    const hasChessJs = typeof Chess !== "undefined";

    return positions.map((pos, i) => {
      if (i === 0) return { ...pos, playedWasBest: false };

      // ── Book move detection ──────────────────────────────────────────
      // const fenBase = fenHistory[i].split(" ").slice(0, 4).join(" ");
      // const isBook = BOOKS.some(
      //   (b) => b.split(" ").slice(0, 4).join(" ") === fenBase,
      // );
      // if (isBook) return { ...pos, playedWasBest: false, isBook: true };

      const fenBase = fenHistory[i].split(" ")[0]; // seulement le board

      const isBook = BOOKS.includes(fenBase);

      if (isBook) {
        return { ...pos, playedWasBest: false, isBook: true };
      }
      // ────────────────────────────────────────────────────────────────

      const prevBestMove = positions[i - 1]?.bestMove;
      if (!hasChessJs || !prevBestMove) return { ...pos, playedWasBest: false };

      try {
        const chess = new Chess(fenHistory[i - 1]);
        chess.move({
          from: prevBestMove.slice(0, 2),
          to: prevBestMove.slice(2, 4),
          promotion: prevBestMove[4] || undefined,
        });
        const fenAfterBest = chess.fen().split(" ").slice(0, 4).join(" ");
        const actualFen = fenHistory[i].split(" ").slice(0, 4).join(" ");
        return { ...pos, playedWasBest: fenAfterBest === actualFen };
      } catch {
        return { ...pos, playedWasBest: false };
      }
    });
  }


  _classifyMoves(positions) {
    const positionsWP = positions.map((p) => this._getPositionWinPercentage(p));

    return positions.map((pos, index) => {
      if (index === 0) return { ...pos, moveClassification: null };

      // ── Book move ────────────────────────────────────────────────────
      if (pos.isBook)
        return { ...pos, moveClassification: MoveClassification.Book };
      // ────────────────────────────────────────────────────────────────

      const prevPos = positions[index - 1];
      const isWhite = index % 2 === 1;
      const lastWP = positionsWP[index - 1];
      const wp = positionsWP[index];
      const isBestMove = pos.playedWasBest;
      const wpLoss = (lastWP - wp) * (isWhite ? 1 : -1);

      const altLine = prevPos.lines[1];
      const altWP = altLine ? this._getLineWinPercentage(altLine) : undefined;

      if (prevPos.lines.length === 1)
        return { ...pos, moveClassification: MoveClassification.Forced };

      if (isBestMove) {
        if (altWP !== undefined) {
          const gap = (wp - altWP) * (isWhite ? 1 : -1);
          if (gap >= 10)
            return { ...pos, moveClassification: MoveClassification.Brilliant };
          if (gap >= 5)
            return { ...pos, moveClassification: MoveClassification.Great };
        }
        return { ...pos, moveClassification: MoveClassification.Best };
      }

      if (wpLoss > 20)
        return { ...pos, moveClassification: MoveClassification.Blunder };

      if (wpLoss > 10) {
        const isMiss =
          altWP !== undefined ? (altWP - wp) * (isWhite ? 1 : -1) > 20 : false;
        return {
          ...pos,
          moveClassification: isMiss
            ? MoveClassification.Miss
            : MoveClassification.Mistake,
        };
      }

      if (wpLoss > 5)
        return { ...pos, moveClassification: MoveClassification.Inaccuracy };
      if (wpLoss <= 2)
        return { ...pos, moveClassification: MoveClassification.Excellent };
      return { ...pos, moveClassification: MoveClassification.Good };
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // ACCURACY
  // ═══════════════════════════════════════════════════════════════════════

  _computeAccuracy(positions) {
    const wp = positions.map((p) => this._getPositionWinPercentage(p));
    const weights = this._getAccuracyWeights(wp);
    const movesAccuracy = this._getMovesAccuracy(wp);
    return {
      white: this._getPlayerAccuracy(movesAccuracy, weights, "white"),
      black: this._getPlayerAccuracy(movesAccuracy, weights, "black"),
      movesAccuracy,
    };
  }

  _getPlayerAccuracy(movesAccuracy, weights, player) {
    const rem = player === "white" ? 0 : 1;
    const accs = movesAccuracy.filter((_, i) => i % 2 === rem);
    const wts = weights.filter((_, i) => i % 2 === rem);
    if (accs.length === 0) return 100;
    const wm = this._weightedMean(accs, wts);
    const hm = this._harmonicMean(accs.map((a) => Math.max(a, 10)));
    return (wm + hm) / 2;
  }

  _getAccuracyWeights(movesWP) {
    const windowSize = this._clamp(Math.ceil(movesWP.length / 10), 2, 8);
    const half = Math.round(windowSize / 2);
    const windows = [];
    for (let i = 1; i < movesWP.length; i++) {
      const s = i - half,
        e = i + half;
      if (s < 0) windows.push(movesWP.slice(0, windowSize));
      else if (e > movesWP.length) windows.push(movesWP.slice(-windowSize));
      else windows.push(movesWP.slice(s, e));
    }
    return windows.map((w) => this._clamp(this._stdDev(w), 0.5, 12));
  }

  _getMovesAccuracy(movesWP) {
    return movesWP.slice(1).map((wp, idx) => {
      const last = movesWP[idx];
      const isWhite = idx % 2 === 0;
      const diff = isWhite ? Math.max(0, last - wp) : Math.max(0, wp - last);
      const raw =
        103.1668100711649 * Math.exp(-0.04354415386753951 * diff) -
        3.166924740191411;
      return Math.min(100, Math.max(0, raw + 1));
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  // ELO ESTIMATION
  // ═══════════════════════════════════════════════════════════════════════

  _computeEstimatedElo(positions, whiteElo, blackElo) {
    if (positions.length < 2) return null;
    let prevCp = this._getPositionCp(positions[0]);
    let wLoss = 0,
      bLoss = 0;

    positions.slice(1).forEach((pos, i) => {
      const cp = this._getPositionCp(pos);
      if (i % 2 === 0) wLoss += cp > prevCp ? 0 : Math.min(prevCp - cp, 1000);
      else bLoss += cp < prevCp ? 0 : Math.min(cp - prevCp, 1000);
      prevCp = cp;
    });

    const n = positions.length - 1;
    const whiteCpl = wLoss / Math.ceil(n / 2);
    const blackCpl = bLoss / Math.floor(n / 2);

    return {
      white: Math.round(
        this._eloFromRatingAndCpl(whiteCpl, whiteElo ?? blackElo),
      ),
      black: Math.round(
        this._eloFromRatingAndCpl(blackCpl, blackElo ?? whiteElo),
      ),
      whiteCpl: Math.round(whiteCpl),
      blackCpl: Math.round(blackCpl),
    };
  }

  _eloFromAcpl(acpl) {
    return 3100 * Math.exp(-0.01 * acpl);
  }
  _acplFromElo(elo) {
    return -100 * Math.log(Math.min(elo, 3100) / 3100);
  }
  _eloFromRatingAndCpl(cpl, rating) {
    const base = this._eloFromAcpl(cpl);
    if (!rating) return base;
    const diff = cpl - this._acplFromElo(rating);
    if (diff === 0) return base;
    return diff > 0
      ? rating * Math.exp(-0.005 * diff)
      : rating / Math.exp(0.005 * diff);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // WIN% HELPERS
  // ═══════════════════════════════════════════════════════════════════════

  _getWinPercentageFromCp(cp) {
    const c = this._clamp(cp, -1000, 1000);
    return 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * c)) - 1);
  }
  _getLineWinPercentage(line) {
    if (line.cp !== undefined) return this._getWinPercentageFromCp(line.cp);
    if (line.mate !== undefined) return line.mate > 0 ? 100 : 0;
    throw new Error("No cp or mate in line");
  }
  _getPositionWinPercentage(pos) {
    return this._getLineWinPercentage(pos.lines[0]);
  }
  _getPositionCp(pos) {
    const l = pos.lines[0];
    if (l.cp !== undefined) return this._clamp(l.cp, -1000, 1000);
    if (l.mate !== undefined) return l.mate > 0 ? 1000 : -1000;
    throw new Error("No cp or mate");
  }

  // ═══════════════════════════════════════════════════════════════════════
  // MATH UTILS
  // ═══════════════════════════════════════════════════════════════════════

  _clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }
  _harmonicMean(arr) {
    return arr.length / arr.reduce((s, v) => s + 1 / v, 0);
  }
  _weightedMean(arr, w) {
    return (
      arr.reduce((s, v, i) => s + v * w[i], 0) /
      w.slice(0, arr.length).reduce((a, b) => a + b, 0)
    );
  }
  _stdDev(arr) {
    const m = arr.reduce((a, b) => a + b) / arr.length;
    return Math.sqrt(
      arr.map((x) => (x - m) ** 2).reduce((a, b) => a + b) / arr.length,
    );
  }
}

const analyzer = new ChessAnalyzer({ depth: 10 });

(async () => {
  await analyzer.init();
})();

async function createWorkerStockfish() {
  const url = `${chrome.runtime.getURL("lib/stockfish.js")}`;
  const blob = new Blob([`importScripts("${url}");`], {
    type: "application/javascript",
  });
  const blobUrl = URL.createObjectURL(blob);

  return new Worker(blobUrl);
}

class komodo {
  constructor({
    elo = config.elo,
    depth = config.depth,
    multipv = config.lines,
    threads = 2,
    hash = 128,
    personality = config.style,
  }) {
    this.elo = elo;
    this.depth = depth;
    this.multipv = multipv;
    this.threads = threads;
    this.hash = hash;
    this.personality = personality;
    this.ready = this.init();
  }

  async init() {
    this.worker = await createWorker();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  hardStop() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  async restartWorker() {
    this.hardStop();
    this.worker = await createWorker();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  setOptions() {
    this.worker.postMessage(
      `setoption name Personality value ${this.personality}`,
    );
    this.worker.postMessage("setoption name UCI LimitStrength value true");
    this.worker.postMessage(`setoption name UCI Elo value ${this.elo}`);
    this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);
  }

  updateConfig(lines, depth, style, elo) {
    this.depth = depth;
    this.elo = elo;
    this.personality = style;
    this.multipv = lines;
    this.worker.postMessage(`setoption name Personality value ${this.style}`);
    this.worker.postMessage(`setoption name UCI Elo value ${this.elo}`);
    this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);
  }

  async getMovesByFen(fen, side) {
    // await this.restartWorker();
    // if (this.multipv > 10) {
    //   await this.restartWorker();
    // }

    this.worker.postMessage(`setoption name Personality value ${this.style}`);
    this.worker.postMessage(`setoption name UCI Elo value ${this.elo}`);
    this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);

    const results = [];
    const seenMoves = new Set();
    const infoLines = [];
    let lastDepth = 0;
    const sideToMove = fen.split(" ")[1];

    return new Promise((resolve) => {
      const onMessage = (event) => {
        const line = event.data;
        if (debugEngine) {
          console.log(line);
        }
        //console.log(line);
        if (typeof line !== "string") return;

        /* ---------- BOOK MOVES ---------- */
        if (line.startsWith("info book move")) {
          const p = line.split(" ");
          if (p.length > 4) {
            const move = p[4];
            if (move.length >= 4 && !seenMoves.has(move)) {
              results.push({
                from: move.slice(0, 2),
                to: move.slice(2, 4),
                eval: "book",
                fen: fen,
                side: side,
              });
              seenMoves.add(move);
            }
          }
          return;
        }

        /* ---------- INFO LINES ---------- */
        if (line.startsWith("info")) {
          infoLines.push(line);

          const parts = line.split(" ");
          const depthIndex = parts.indexOf("depth");
          if (depthIndex !== -1 && depthIndex + 1 < parts.length) {
            const d = parseInt(parts[depthIndex + 1], 10);
            if (!isNaN(d)) lastDepth = d;
          }
          return;
        }

        /* ---------- END ---------- */
        if (line.startsWith("bestmove")) {
          this.worker.removeEventListener("message", onMessage);

          for (const infoLine of infoLines) {
            if (!infoLine.includes("multipv") || !infoLine.includes(" pv "))
              continue;
            if (!infoLine.includes(`depth ${lastDepth} `)) continue;

            const parts = infoLine.split(" ");

            const mpvIndex = parts.indexOf("multipv");
            const mpv = mpvIndex !== -1 ? parseInt(parts[mpvIndex + 1], 10) : 1;
            if (mpv > this.multipv) continue;

            /* ---------- SCORE ---------- */
            let evalScore = null;
            const scoreIndex = parts.indexOf("score");
            if (scoreIndex !== -1 && scoreIndex + 2 < parts.length) {
              const type = parts[scoreIndex + 1];
              let value = parseInt(parts[scoreIndex + 2], 10);

              if (!isNaN(value)) {
                if (sideToMove === "b") value = -value;

                if (type === "cp") {
                  const v = (value / 100).toFixed(2);
                  evalScore = value >= 0 ? `+${v}` : `${v}`;
                } else if (type === "mate") {
                  evalScore = `#${value}`;
                }
              }
            }

            /* ---------- MOVE ---------- */
            const pvIndex = parts.indexOf("pv");
            if (pvIndex !== -1 && pvIndex + 1 < parts.length) {
              const move = parts[pvIndex + 1];
              if (move.length >= 4 && !seenMoves.has(move)) {
                results.push({
                  from: move.slice(0, 2),
                  to: move.slice(2, 4),
                  eval: evalScore,
                  fen: fen,
                  side: side,
                });
                seenMoves.add(move);
              }
            }
          }

          resolve(results);
        }
      };

      this.worker.addEventListener("message", onMessage);

      this.worker.postMessage(`stop`);
      this.worker.postMessage(`position fen ${fen}`);
      this.worker.postMessage(`go depth ${this.depth}`);
    });
  }

  async getMovesByUCI(uciString, side, fen) {
    // if (this.multipv > 10) {
    //   await this.restartWorker();
    // }

    const results = [];
    const seenMoves = new Set();
    const infoLines = [];
    let lastDepth = 0;
    const sideToMove =
      uciString.split(" moves ")[1].trim().split(/\s+/).length % 2 === 0
        ? "w"
        : "b";

    return new Promise((resolve) => {
      const onMessage = (event) => {
        const line = event.data;
        if (debugEngine) {
          console.log(line);
        }
        if (typeof line !== "string") return;

        /* ---------- BOOK MOVES ---------- */
        if (line.startsWith("info book move")) {
          const p = line.split(" ");
          if (p.length > 4) {
            const move = p[4];
            if (move.length >= 4 && !seenMoves.has(move)) {
              results.push({
                from: move.slice(0, 2),
                to: move.slice(2, 4),
                eval: "book",
                side: side,
                fen: fen,
              });
              seenMoves.add(move);
            }
          }
          return;
        }

        /* ---------- INFO LINES ---------- */
        if (line.startsWith("info")) {
          infoLines.push(line);

          const parts = line.split(" ");
          const depthIndex = parts.indexOf("depth");
          if (depthIndex !== -1 && depthIndex + 1 < parts.length) {
            const d = parseInt(parts[depthIndex + 1], 10);
            if (!isNaN(d)) lastDepth = d;
          }
          return;
        }

        /* ---------- END ---------- */
        if (line.startsWith("bestmove")) {
          this.worker.removeEventListener("message", onMessage);

          for (const infoLine of infoLines) {
            if (!infoLine.includes("multipv") || !infoLine.includes(" pv "))
              continue;
            if (!infoLine.includes(`depth ${lastDepth} `)) continue;

            const parts = infoLine.split(" ");

            const mpvIndex = parts.indexOf("multipv");
            const mpv = mpvIndex !== -1 ? parseInt(parts[mpvIndex + 1], 10) : 1;
            if (mpv > this.multipv) continue;

            /* ---------- SCORE ---------- */
            let evalScore = null;
            const scoreIndex = parts.indexOf("score");
            if (scoreIndex !== -1 && scoreIndex + 2 < parts.length) {
              const type = parts[scoreIndex + 1];
              let value = parseInt(parts[scoreIndex + 2], 10);

              if (!isNaN(value)) {
                if (sideToMove === "b") value = -value;

                if (type === "cp") {
                  const v = (value / 100).toFixed(2);
                  evalScore = value >= 0 ? `+${v}` : `${v}`;
                } else if (type === "mate") {
                  evalScore = `#${value}`;
                }
              }
            }

            /* ---------- MOVE ---------- */
            const pvIndex = parts.indexOf("pv");
            if (pvIndex !== -1 && pvIndex + 1 < parts.length) {
              const move = parts[pvIndex + 1];
              if (move.length >= 4 && !seenMoves.has(move)) {
                results.push({
                  from: move.slice(0, 2),
                  to: move.slice(2, 4),
                  eval: evalScore,
                  side: side,
                  fen: fen,
                });
                seenMoves.add(move);
              }
            }
          }

          resolve(results);
        }
      };

      this.worker.addEventListener("message", onMessage);
      this.worker.postMessage(`stop`);
      this.worker.postMessage(`${uciString}`);
      this.worker.postMessage(`go depth ${this.depth}`);
    });
  }
}

const engine = new komodo({
  elo: config.elo,
  depth: config.depth,
  multipv: config.lines,
  threads: 2,
  hash: 128,
  personality: config.style,
});

let keyMove = {
  from: "e2",
  to: "e4",
};

function createSimpleAccuracyDisplay(
  initialWhiteAcc = 0,
  initialWhiteElo = 0,
  initialBlackAcc = 0,
  initialBlackElo = 0,
  side = "white",
) {
  // ─── Styles ───────────────────────────────────────────────────────────────

  if (!document.getElementById("acc-display-styles")) {
    const style = document.createElement("style");
    style.id = "acc-display-styles";
    style.textContent = `
      
      #acc-widget {
        position: fixed;
        z-index: 999999;
        top: 80px;
        left: 20px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        cursor: grab;
        user-select: none;
      }

      #acc-widget.dragging {
        cursor: grabbing;
        opacity: 0.8;
      }

      .acc-row {
        display: flex;
        align-items: center;
        pointer-events: none;
      }

      /* ── You marker ── */
      .acc-side-badge {
        writing-mode: vertical-rl;
        text-orientation: mixed;
        font-family: 'DM Mono', monospace;
        font-size: 6px;
        font-weight: 500;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        margin-right: 6px;
        padding: 5px 3px;
        border-radius: 2px;
        flex-shrink: 0;
        line-height: 1;
      }

      .acc-side-badge-white {
        background: #e8e8e6;
        color: #888;
      }

      .acc-side-badge-black {
        background: #222;
        color: #555;
      }

      .acc-side-badge-you-white {
        background: #1a1a1a;
        color: #d4d4d4;
      }

      .acc-side-badge-you-black {
        background: #f0f0ee;
        color: #555;
      }

      .acc-spacer { width: 17px; flex-shrink: 0; }

      /* ── Card ── */
      .acc-card {
        width: 206px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        border-radius: 6px;
        overflow: hidden;
      }

      .acc-card-white {
        background: #fafaf9;
        outline: 1px solid #e2e2de;
        box-shadow:
          0 1px 3px rgba(0,0,0,0.05),
          0 4px 16px rgba(0,0,0,0.04);
      }

      .acc-card-black {
        background: #111110;
        outline: 1px solid rgba(255,255,255,0.06);
        box-shadow:
          0 1px 3px rgba(0,0,0,0.6),
          0 4px 16px rgba(0,0,0,0.45);
      }

      /* Active card (your side) gets a subtle highlight */
      .acc-card-active-white {
        outline: 1.5px solid #c8c8c2;
      }

      .acc-card-active-black {
        outline: 1.5px solid rgba(255,255,255,0.14);
      }

      /* ── Segments ── */
      .acc-segment {
        padding: 9px 11px;
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      .acc-segment:first-child {
        border-right-width: 1px;
        border-right-style: solid;
      }
      .acc-card-white .acc-segment:first-child { border-right-color: #e2e2de; }
      .acc-card-black .acc-segment:first-child { border-right-color: rgba(255,255,255,0.05); }

      /* ── Label ── */
      .acc-label {
        font-family: 'DM Sans', 'DM Mono', sans-serif;
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        white-space: nowrap;
      }
      .acc-card-white .acc-label { color: #888882; }
      .acc-card-black .acc-label { color: #555550; }

      /* ── Value ── */
      .acc-value {
        font-family: 'DM Mono', 'Courier New', monospace;
        font-size: 22px;
        font-weight: 500;
        letter-spacing: -0.04em;
        line-height: 1;
      }
      .acc-card-white .acc-value { color: #111110; }
      .acc-card-black .acc-value { color: #ebebea; }

      /* Dim inactive card values slightly */
      .acc-card-inactive .acc-value {
        opacity: 0.45;
      }
      .acc-card-inactive .acc-label {
        opacity: 0.55;
      }
    `;
    document.head.appendChild(style);
  }

  // ─── HTML builder ─────────────────────────────────────────────────────────

  function rowHTML(color, isYou) {
    const badgeText = isYou ? "you" : "&nbsp;";
    const badgeClass = isYou
      ? `acc-side-badge acc-side-badge-you-${color}`
      : `acc-side-badge acc-side-badge-${color}`;

    const activeClass = isYou
      ? `acc-card-active-${color}`
      : `acc-card-inactive`;

    return `
      <div class="acc-row">
        <div class="${badgeClass}">${badgeText}</div>
        <div class="acc-card acc-card-${color} ${activeClass}" id="acc-card-${color}">
          <div class="acc-segment">
            <span class="acc-label">Accuracy</span>
            <span class="acc-value" id="acc-val-acc-${color}">—</span>
          </div>
          <div class="acc-segment">
            <span class="acc-label">Rating</span>
            <span class="acc-value" id="acc-val-elo-${color}">—</span>
          </div>
        </div>
      </div>
    `;
  }

  // ─── Widget mount ─────────────────────────────────────────────────────────

  const widget = document.createElement("div");
  widget.id = "acc-widget";
  document.body.appendChild(widget);

  chrome.storage.local.get("accWidgetPos", (result) => {
    if (result.accWidgetPos) {
      widget.style.left = result.accWidgetPos.left;
      widget.style.top = result.accWidgetPos.top;
    }
  });

  // ─── Render structure ─────────────────────────────────────────────────────

  function render() {
    if (side === "white") {
      widget.innerHTML = rowHTML("black", false) + rowHTML("white", true);
    } else {
      widget.innerHTML = rowHTML("white", false) + rowHTML("black", true);
    }
  }

  // ─── Drag ─────────────────────────────────────────────────────────────────

  let isDragging = false;
  let offsetX = 0,
    offsetY = 0;

  widget.addEventListener("mousedown", (e) => {
    isDragging = true;
    widget.classList.add("dragging");
    offsetX = e.clientX - widget.getBoundingClientRect().left;
    offsetY = e.clientY - widget.getBoundingClientRect().top;
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    widget.style.left = `${e.clientX - offsetX}px`;
    widget.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    widget.classList.remove("dragging");
    chrome.storage.local.set({
      accWidgetPos: { left: widget.style.left, top: widget.style.top },
    });
  });

  // ─── Helpers ──────────────────────────────────────────────────────────────

  function setVal(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  // ─── Update (never rebuilds DOM, only updates text nodes) ─────────────────

  function update(whiteAcc, whiteElo, blackAcc, blackElo, newSide) {
    if (newSide !== undefined && newSide !== side) {
      side = newSide;
      render();
    }

    setVal("acc-val-acc-white", `${whiteAcc}%`);
    setVal("acc-val-elo-white", whiteElo || "—");
    setVal("acc-val-acc-black", `${blackAcc}%`);
    setVal("acc-val-elo-black", blackElo || "—");
  }

  render();
  update(initialWhiteAcc, initialWhiteElo, initialBlackAcc, initialBlackElo);
  return { update };
}

const startCheat = () => {
  if (window.location.host === "www.chess.com") {
    let lastFEN = "";
    let isGameOver = false;
    let fen_ = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    let side_index = 1;
    let evalObj = null;
    let chessComFenHistory = [];
    let statObj = null;

    function getElo(side) {
      const players = document.querySelectorAll(".player-playerContent");
      if (players.length < 2) return null;

      const extractElo = (text) => {
        const match = text.match(/\((\d+)\)/);
        return match ? parseInt(match[1], 10) : null;
      };

      const topElo = extractElo(players[0].innerText);
      const bottomElo = extractElo(players[1].innerText);

      if (side.toLowerCase() === "white") {
        return { white: bottomElo, black: topElo };
      } else if (side.toLowerCase() === "black") {
        return { white: topElo, black: bottomElo };
      } else {
        return null;
      }
    }
    // chess.com — design identique à lichess
    function createEvalBar(initialScore = "0.0", initialColor = "white") {
      const boardContainer = document.querySelector(".board");
      if (!boardContainer) return console.error("Plateau non trouvé !");
      const w_ = boardContainer.offsetWidth;

      if (!document.getElementById("evalBarStyles")) {
        const style = document.createElement("style");
        style.id = "evalBarStyles";
        style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@500;700&display=swap');

      #customEval {
        position: relative;
        left: -10px;
        margin-left: 10px;
        border-radius: 3px;
        overflow: hidden;
        background: #000000;
        flex-shrink: 0;
      }

      #customEval .track {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
      }

      #customEval .seg-black {
        background: #000000;
        transition: height 0.3s ease;
        flex-shrink: 0;
      }

      #customEval .seg-white {
        background: #f0ede8;
        transition: height 0.3s ease;
        flex-shrink: 0;
      }

      #customEval .score-white {
        position: absolute;
        bottom: 4px;
        left: 50%;
        transform: translateX(-50%);
        font-family: 'Noto Sans', sans-serif;
        font-size: 9.5px;
        font-weight: 700;
        color: #302e2c;
        pointer-events: none;
        z-index: 5;
        letter-spacing: 0.02em;
        white-space: nowrap;
        transition: opacity 0.2s;
      }

      #customEval .score-black {
        position: absolute;
        top: 4px;
        left: 50%;
        transform: translateX(-50%);
        font-family: 'Noto Sans', sans-serif;
        font-size: 9.5px;
        font-weight: 700;
        color: #f0ede8;
        pointer-events: none;
        z-index: 5;
        letter-spacing: 0.02em;
        white-space: nowrap;
        transition: opacity 0.2s;
      }
    `;
        document.head.appendChild(style);
      }

      const evalContainer = document.createElement("div");
      evalContainer.id = "customEval";
      evalContainer.style.zIndex = "9999";
      evalContainer.style.width = `${(w_ * 6) / 100}px`;
      evalContainer.style.height = `${w_}px`;

      const track = document.createElement("div");
      track.className = "track";

      const segBlack = document.createElement("div");
      segBlack.className = "seg-black";

      const segWhite = document.createElement("div");
      segWhite.className = "seg-white";

      track.appendChild(segBlack);
      track.appendChild(segWhite);
      evalContainer.appendChild(track);

      const scoreLabelWhite = document.createElement("div");
      scoreLabelWhite.className = "score-white";

      const scoreLabelBlack = document.createElement("div");
      scoreLabelBlack.className = "score-black";

      evalContainer.appendChild(scoreLabelWhite);
      evalContainer.appendChild(scoreLabelBlack);

      boardContainer.parentNode.style.display = "flex";
      boardContainer.parentNode.insertBefore(evalContainer, boardContainer);

      function parseScore(scoreStr) {
        if (!scoreStr) return { score: 0, mate: false };
        scoreStr = scoreStr.trim();
        let mate = false;
        if (scoreStr.startsWith("#")) {
          mate = true;
          scoreStr = scoreStr.slice(1);
        }
        const score = parseFloat(scoreStr.replace("+", "")) || 0;
        return { score, mate };
      }

      function update(scoreStr, color = "white") {
        let { score, mate } = parseScore(scoreStr);
        let percent = 50;
        let displayText = "";

        if (mate) {
          const sign = score > 0 ? "+" : "-";
          displayText = "M" + Math.abs(score);
          percent =
            (score > 0 && color === "white") || (score < 0 && color === "black")
              ? 95
              : 5;
        } else {
          const rawScore = color === "black" ? -score : score;
          const sign = score > 0 ? "+" : "";
          displayText = sign + score.toFixed(1);
          if (rawScore >= 7) percent = 90;
          else if (rawScore <= -7) percent = 10;
          else percent = 50 + (rawScore / 7) * 40;
        }

        const blackPercent = 100 - percent;
        segBlack.style.height = blackPercent + "%";
        segWhite.style.height = percent + "%";

        const whiteIsBigger = percent >= 50;

        if (whiteIsBigger) {
          scoreLabelWhite.textContent = displayText;
          scoreLabelWhite.style.opacity = "1";
          scoreLabelBlack.textContent = "";
          scoreLabelBlack.style.opacity = "0";
        } else {
          scoreLabelBlack.textContent = displayText;
          scoreLabelBlack.style.opacity = "1";
          scoreLabelWhite.textContent = "";
          scoreLabelWhite.style.opacity = "0";
        }
      }

      update(initialScore, initialColor);
      return { update };
    }

    function inject() {
      window.addEventListener("message", (event) => {
        if (event.source !== window) return;
        if (event.data && event.data.type === "FEN_RESPONSE") {
          fen_ = event.data.fen;
          side_index = event.data.side_;
          isGameOver = event.data.isGameOver;
          chessComFenHistory = event.data.fenHistory;
        }
      });
    }
    inject();

    function requestFen() {
      window.postMessage({ type: "GET_FEN" }, "*");
    }
    function requestMove(from, to, promotion = "q", key = false) {
      key ? (moveDelay = 0) : (moveDelay = randomIntBetween(100, config.delay));
      window.postMessage(
        {
          type: "MOVE",
          from,
          to,
          promotion,
          moveDelay,
        },
        "*",
      );
    }

    function highlightMovesOnBoard(moves, side) {
      // console.log(side);
      if (!Array.isArray(moves)) return;
      if (config.onlyShowEval) return;

      const parent = document.querySelector("wc-chess-board");
      if (!parent) return;

      const squareSize = parent.offsetWidth / 8;
      const maxMoves = 5;
      let colors = config.colors;

      parent.querySelectorAll(".customH").forEach((el) => el.remove());

      function squareToPosition(square) {
        const fileChar = square[0];
        const rankChar = square[1];
        const rank = parseInt(rankChar, 10) - 1;

        let file;
        if (side === "w") {
          file = fileChar.charCodeAt(0) - "a".charCodeAt(0);
          const y = (7 - rank) * squareSize;
          const x = file * squareSize;
          return { x, y };
        } else {
          file = "h".charCodeAt(0) - fileChar.charCodeAt(0);
          const y = rank * squareSize;
          const x = file * squareSize;
          return { x, y };
        }
      }

      function drawArrow(fromSquare, toSquare, color, score) {
        const from = squareToPosition(fromSquare);
        const to = squareToPosition(toSquare);

        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg",
        );
        svg.setAttribute("class", "customH");
        svg.setAttribute("width", parent.offsetWidth);
        svg.setAttribute("height", parent.offsetWidth);
        svg.style.position = "absolute";
        svg.style.left = "0";
        svg.style.top = "0";
        svg.style.pointerEvents = "none";
        svg.style.overflow = "visible";
        svg.style.zIndex = "10";

        const defs = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "defs",
        );
        const marker = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "marker",
        );
        marker.setAttribute("id", `arrowhead-${color}`);
        marker.setAttribute("markerWidth", "3.5");
        marker.setAttribute("markerHeight", "2.5");
        marker.setAttribute("refX", "1.75");
        marker.setAttribute("refY", "1.25");
        marker.setAttribute("orient", "auto");
        marker.setAttribute("markerUnits", "strokeWidth");

        const arrowPath = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        arrowPath.setAttribute("d", "M0,0 L3.5,1.25 L0,2.5 Z");
        arrowPath.setAttribute("fill", color);
        marker.appendChild(arrowPath);
        defs.appendChild(marker);
        svg.appendChild(defs);

        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );
        line.setAttribute("x1", from.x + squareSize / 2);
        line.setAttribute("y1", from.y + squareSize / 2);
        line.setAttribute("x2", to.x + squareSize / 2);
        line.setAttribute("y2", to.y + squareSize / 2);
        line.setAttribute("stroke", color);
        line.setAttribute("stroke-width", "5");
        line.setAttribute("marker-end", `url(#arrowhead-${color})`);
        line.setAttribute("opacity", "0.6");
        svg.appendChild(line);

        if (score !== undefined) {
          const group = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g",
          );

          const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text",
          );

          text.setAttribute("x", to.x + squareSize);
          text.setAttribute("y", to.y);
          text.setAttribute("font-size", "9");
          text.setAttribute("font-weight", "bold");
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("dominant-baseline", "middle");
          text.setAttribute("fill", color);

          let isNegative = false;
          let displayScore = score;

          const hasHash = score.startsWith("#");
          let raw = hasHash ? score.slice(1) : score;

          if (raw.startsWith("-")) {
            isNegative = true;
            raw = raw.slice(1);
          } else if (raw.startsWith("+")) {
            raw = raw.slice(1);
          }

          displayScore = hasHash ? "#" + raw : raw;
          text.textContent = displayScore;

          group.appendChild(text);
          svg.appendChild(group);

          requestAnimationFrame(() => {
            const bbox = text.getBBox();

            const paddingX = 2;
            const paddingY = 2;

            const rect = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "rect",
            );

            rect.setAttribute("x", bbox.x - paddingX);
            rect.setAttribute("y", bbox.y - paddingY);
            rect.setAttribute("width", bbox.width + paddingX * 2);
            rect.setAttribute("height", bbox.height + paddingY * 2);

            rect.setAttribute("rx", "8");
            rect.setAttribute("ry", "8");

            rect.setAttribute("fill", isNegative ? "#312e2b" : "#ffffff");
            rect.setAttribute("fill-opacity", "0.85");
            rect.setAttribute("stroke", isNegative ? "#000000" : "#cccccc");
            rect.setAttribute("stroke-width", "1");

            group.insertBefore(rect, text);
          });
        }

        parent.appendChild(svg);
      }

      parent.style.position = "relative";

      let filteredMoves = moves;
      if (config.winningMove) {
        filteredMoves = moves.filter((move) => {
          const evalValue = parseFloat(move.eval);
          if (side === "w") {
            return (
              evalValue >= 2 ||
              (move.eval.startsWith("#") && parseInt(move.eval.slice(1)) > 0)
            );
          } else {
            return (
              evalValue <= -2 ||
              (move.eval.startsWith("#-") && parseInt(move.eval.slice(2)) > 0)
            );
          }
        });
      }

      filteredMoves.slice(0, maxMoves).forEach((move, index) => {
        const color = colors[index] || "red";
        drawArrow(move.from, move.to, color, move.eval);
      });
    }

    function squareToIndex(square) {
      const file = square.charCodeAt(0) - 96; // a=1 ... h=8
      const rank = parseInt(square[1], 10); // 1..8
      return file * 10 + rank;
    }

    function getSide() {
      return side_index === 1 ? "white" : "black";
    }

    // key press
    window.onkeyup = (e) => {
      if (e.key === config.key) {
        requestMove(keyMove.from, keyMove.to, "q", true);
      }
    };

    async function checkAndSendMoves() {
      requestFen();

      if (!config.showEval && document.querySelector("#customEval")) {
        document.querySelector("#customEval").remove();
        evalObj = null;
      }

      if (!document.querySelector("#customEval") && config.showEval) {
        const boardContainer = document.querySelector(".board");
        if (boardContainer) {
          evalObj = createEvalBar("0.0", getSide());
        }
      }

      if (config.stat && !document.querySelector("#acc-widget")) {
        statObj = createSimpleAccuracyDisplay(100, 1500, 100, 1500, getSide());
      }

      if (!config.stat && document.querySelector("#acc-widget")) {
        statObj = null;
        document.querySelector("#acc-widget").remove();
      }

      if (lastFEN !== fen_) {
        //accuracy
        clearHint();
        const whiteElo = getElo(getSide())?.white || null;
        const blackElo = getElo(getSide())?.black || null;

        if (config.moveClassification) {
          if (chessComFenHistory.at(-2) && chessComFenHistory.at(-1)) {
            const move = getMoveFromFEN(
              chessComFenHistory.at(-2),
              chessComFenHistory.at(-1),
            );

            const from = move.from;
            const to = move.to;

            if (lastClassification) {
              const moveIndexFromClassification = lastClassification.moveIndex;
              const classification = lastClassification.classification;

              console.clear()
              console.log(classification)

              let squaresMoves = document.querySelectorAll(".highlight");
              squaresMoves.forEach((e, i) => {
                if (e.getAttribute("class").includes(squareToIndex(to))) {
                  const svg = classificationSVG[classification];

                  if (svg) {
                    placeSVGOnBoard(getSide(), to, svg);
                  }
                }
              });
            }
          }
        }

        if (config.stat && statObj) {
          const result = await analyzer.update(chessComFenHistory, {
            whiteElo: whiteElo,
            blackElo: blackElo,
          });
          if (result) {
            lastClassification = result.moves.at(-1);
            statObj.update(
              result.white.accuracy,
              result.white.elo,
              result.black.accuracy,
              result.black.elo,
              getSide(),
            );
          }
        }

        //
        clearHighlightSquares();
        if (
          (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
          (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
        ) {
          lastFEN = fen_;
          engine.getMovesByFen(fen_, getSide()).then((moves) => {
            chrome.runtime.sendMessage({ type: "FROM_CONTENT", data: moves });
            keyMove.from = moves[0].from;
            keyMove.to = moves[0].to;
            if (config.autoMove) {
              requestMove(moves[0].from, moves[0].to);
            }
            if (moves.length > 0 && evalObj) {
              evalObj.update(moves[0].eval, getSide());
            }
            highlightMovesOnBoard(moves, getSide()[0]);
          });
        }
      }
    }

    setInterval(checkAndSendMoves, interval);

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes.chessConfig) {
        const newConfig = changes.chessConfig.newValue;
        config = newConfig;
        engine.updateConfig(
          config.lines,
          config.depth,
          config.style,
          config.elo + 700,
        );
      }
    });
  }

  if (window.location.host === "lichess.org") {
    chrome.runtime.sendMessage({ type: "ATTACH_DEBUGGER" }, (res) => {
      if (res?.success) {
        let ok = true;
      }
    });
    let fen_ = "";
    let evalObj = null;
    let statObj = null;
    let lichessFenHistory = [];

    function getElo(side) {
      const ratings = document.querySelectorAll("rating");
      if (ratings.length < 2) return null;

      const topElo = parseInt(ratings[0].innerText, 10);
      const bottomElo = parseInt(ratings[1].innerText, 10);

      if (side.toLowerCase() === "white") {
        return { white: bottomElo, black: topElo };
      } else if (side.toLowerCase() === "black") {
        return { white: topElo, black: bottomElo };
      } else {
        return null;
      }
    }

    function createEvalBar(initialScore = "0.0", initialColor = "white") {
      const boardContainer = document.querySelector("cg-board");
      if (!boardContainer) return console.error("Plateau non trouvé !");
      const w_ = boardContainer.offsetWidth;

      if (!document.getElementById("evalBarStyles")) {
        const style = document.createElement("style");
        style.id = "evalBarStyles";
        style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@500;700&display=swap');

      #customEval {
        position: relative;
        left: -50px;
        margin-left: 10px;
        border-radius: 3px;
        overflow: hidden;
        background: #1a1a1a;
        flex-shrink: 0;
      }

      #customEval .track {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
      }

      #customEval .seg-black {
        background: #302e2c;
        transition: height 0.3s ease;
        flex-shrink: 0;
      }

      #customEval .seg-white {
        background: #f0ede8;
        transition: height 0.3s ease;
        flex-shrink: 0;
      }

      #customEval .score-white {
        position: absolute;
        bottom: 4px;
        left: 50%;
        transform: translateX(-50%);
        font-family: 'Noto Sans', sans-serif;
        font-size: 9.5px;
        font-weight: 700;
        color: #302e2c;
        pointer-events: none;
        z-index: 5;
        letter-spacing: 0.02em;
        white-space: nowrap;
        transition: opacity 0.2s;
      }

      #customEval .score-black {
        position: absolute;
        top: 4px;
        left: 50%;
        transform: translateX(-50%);
        font-family: 'Noto Sans', sans-serif;
        font-size: 9.5px;
        font-weight: 700;
        color: #f0ede8;
        pointer-events: none;
        z-index: 5;
        letter-spacing: 0.02em;
        white-space: nowrap;
        transition: opacity 0.2s;
      }
    `;
        document.head.appendChild(style);
      }

      const evalContainer = document.createElement("div");
      evalContainer.id = "customEval";
      evalContainer.style.zIndex = "9999";
      evalContainer.style.width = `${(w_ * 6) / 100}px`;
      evalContainer.style.height = `${w_}px`;

      const track = document.createElement("div");
      track.className = "track";

      const segBlack = document.createElement("div");
      segBlack.className = "seg-black";

      const segWhite = document.createElement("div");
      segWhite.className = "seg-white";

      track.appendChild(segBlack);
      track.appendChild(segWhite);
      evalContainer.appendChild(track);

      // Two score labels: one on white side, one on black side
      const scoreLabelWhite = document.createElement("div");
      scoreLabelWhite.className = "score-white";

      const scoreLabelBlack = document.createElement("div");
      scoreLabelBlack.className = "score-black";

      evalContainer.appendChild(scoreLabelWhite);
      evalContainer.appendChild(scoreLabelBlack);

      boardContainer.parentNode.style.display = "flex";
      boardContainer.parentNode.insertBefore(evalContainer, boardContainer);

      function parseScore(scoreStr) {
        if (!scoreStr) return { score: 0, mate: false };
        scoreStr = scoreStr.trim();
        let mate = false;
        if (scoreStr.startsWith("#")) {
          mate = true;
          scoreStr = scoreStr.slice(1);
        }
        const score = parseFloat(scoreStr.replace("+", "")) || 0;
        return { score, mate };
      }

      function update(scoreStr, color = "white") {
        let { score, mate } = parseScore(scoreStr);
        let percent = 50;
        let displayText = "";

        if (mate) {
          const sign = score > 0 ? "+" : "-";
          displayText = "M" + Math.abs(score);
          percent =
            (score > 0 && color === "white") || (score < 0 && color === "black")
              ? 95
              : 5;
        } else {
          const rawScore = color === "black" ? -score : score;
          const sign = score > 0 ? "+" : "";
          displayText = sign + score.toFixed(1);
          if (rawScore >= 7) percent = 90;
          else if (rawScore <= -7) percent = 10;
          else percent = 50 + (rawScore / 7) * 40;
        }

        const blackPercent = 100 - percent;
        segBlack.style.height = blackPercent + "%";
        segWhite.style.height = percent + "%";

        // Show score on the dominant (larger) side only
        const whiteIsBigger = percent >= 50;

        if (whiteIsBigger) {
          scoreLabelWhite.textContent = displayText;
          scoreLabelWhite.style.opacity = "1";
          scoreLabelBlack.textContent = "";
          scoreLabelBlack.style.opacity = "0";
        } else {
          scoreLabelBlack.textContent = displayText;
          scoreLabelBlack.style.opacity = "1";
          scoreLabelWhite.textContent = "";
          scoreLabelWhite.style.opacity = "0";
        }
      }

      update(initialScore, initialColor);
      return { update };
    }

    function highlightMovesOnBoard(moves, side) {
      if (!Array.isArray(moves)) return;

      if (config.onlyShowEval) return;

      const parent = document.querySelector("cg-container");
      if (!parent) return;

      const squareSize = parent.offsetWidth / 8;
      const maxMoves = 5;
      let colors = config.colors;

      parent.querySelectorAll(".customH").forEach((el) => el.remove());

      function squareToPosition(square) {
        const fileChar = square[0];
        const rankChar = square[1];
        const rank = parseInt(rankChar, 10) - 1;

        let file;
        if (side === "w") {
          file = fileChar.charCodeAt(0) - "a".charCodeAt(0);
          const y = (7 - rank) * squareSize;
          const x = file * squareSize;
          return { x, y };
        } else {
          file = "h".charCodeAt(0) - fileChar.charCodeAt(0);
          const y = rank * squareSize;
          const x = file * squareSize;
          // console.log({x : x, y: y})
          return { x, y };
        }
      }

      function drawArrow(fromSquare, toSquare, color, score) {
        const from = squareToPosition(fromSquare);
        const to = squareToPosition(toSquare);

        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg",
        );
        svg.setAttribute("class", "customH");
        svg.setAttribute("width", parent.offsetWidth);
        svg.setAttribute("height", parent.offsetWidth);
        svg.style.position = "absolute";
        svg.style.left = "0";
        svg.style.top = "0";
        svg.style.pointerEvents = "none";
        svg.style.overflow = "visible";
        svg.style.zIndex = "10";

        const defs = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "defs",
        );
        const marker = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "marker",
        );
        marker.setAttribute("id", `arrowhead-${color}`);
        marker.setAttribute("markerWidth", "3.5");
        marker.setAttribute("markerHeight", "2.5");
        marker.setAttribute("refX", "1.75");
        marker.setAttribute("refY", "1.25");
        marker.setAttribute("orient", "auto");
        marker.setAttribute("markerUnits", "strokeWidth");

        const arrowPath = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        arrowPath.setAttribute("d", "M0,0 L3.5,1.25 L0,2.5 Z");
        arrowPath.setAttribute("fill", color);
        marker.appendChild(arrowPath);
        defs.appendChild(marker);
        svg.appendChild(defs);

        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );
        line.setAttribute("x1", from.x + squareSize / 2);
        line.setAttribute("y1", from.y + squareSize / 2);
        line.setAttribute("x2", to.x + squareSize / 2);
        line.setAttribute("y2", to.y + squareSize / 2);
        line.setAttribute("stroke", color);
        line.setAttribute("stroke-width", "5");
        line.setAttribute("marker-end", `url(#arrowhead-${color})`);
        line.setAttribute("opacity", "0.6");
        svg.appendChild(line);

        if (score !== undefined) {
          const group = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g",
          );

          const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text",
          );

          text.setAttribute("x", to.x + squareSize);
          text.setAttribute("y", to.y);
          text.setAttribute("font-size", "9");
          text.setAttribute("font-weight", "bold");
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("dominant-baseline", "middle");
          text.setAttribute("fill", color);

          let isNegative = false;
          let displayScore = score;

          const hasHash = score.startsWith("#");
          let raw = hasHash ? score.slice(1) : score;

          if (raw.startsWith("-")) {
            isNegative = true;
            raw = raw.slice(1);
          } else if (raw.startsWith("+")) {
            raw = raw.slice(1);
          }

          displayScore = hasHash ? "#" + raw : raw;
          text.textContent = displayScore;

          group.appendChild(text);
          svg.appendChild(group);

          requestAnimationFrame(() => {
            const bbox = text.getBBox();

            const paddingX = 2;
            const paddingY = 2;

            const rect = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "rect",
            );

            rect.setAttribute("x", bbox.x - paddingX);
            rect.setAttribute("y", bbox.y - paddingY);
            rect.setAttribute("width", bbox.width + paddingX * 2);
            rect.setAttribute("height", bbox.height + paddingY * 2);

            rect.setAttribute("rx", "8");
            rect.setAttribute("ry", "8");

            rect.setAttribute("fill", isNegative ? "#312e2b" : "#ffffff");
            rect.setAttribute("fill-opacity", "0.85");
            rect.setAttribute("stroke", isNegative ? "#000000" : "#cccccc");
            rect.setAttribute("stroke-width", "1");

            group.insertBefore(rect, text);
          });
        }

        parent.appendChild(svg);
      }

      parent.style.position = "relative";

      let filteredMoves = moves;
      if (config.winningMove) {
        filteredMoves = moves.filter((move) => {
          const evalValue = parseFloat(move.eval);
          if (side === "w") {
            return (
              evalValue >= 2 ||
              (move.eval.startsWith("#") && parseInt(move.eval.slice(1)) > 0)
            );
          } else {
            return (
              evalValue <= -2 ||
              (move.eval.startsWith("#-") && parseInt(move.eval.slice(2)) > 0)
            );
          }
        });
      }

      filteredMoves.slice(0, maxMoves).forEach((move, index) => {
        const color = colors[index] || "red";
        // drawArrow(move.from, move.to, color, move.eval);
        drawArrow(move.from, move.to, color, move.eval);
      });

      // console.log(fen_)
    }

    function getSide() {
      const board = document.querySelector(".cg-wrap");
      if (!board) return "white"; // si le plateau n'est pas trouvé

      if (board.classList.contains("orientation-black")) {
        return "black";
      } else if (board.classList.contains("orientation-white")) {
        return "white";
      } else {
        return "white";
      }
    }

    function requestFen() {
      // console.log("request fen called");
      window.postMessage({ type: "FEN" }, "*");
    }

    async function movePiece(from, to, delay) {
      const fromSquare = from;
      const toSquare = to;
      const moveDelay = delay;

      const board = document.querySelector("cg-board");
      const rect = board.getBoundingClientRect();

      const boardInfo = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };

      chrome.runtime.sendMessage({ type: "BOARD_INFO", boardInfo });
      const coordFrom = squareToPixels(fromSquare, boardInfo, getSide());
      const coordTo = squareToPixels(toSquare, boardInfo, getSide());

      await sleep(moveDelay);

      chrome.runtime.sendMessage({
        type: "DRAG_MOVE",
        fromX: coordFrom.x,
        fromY: coordFrom.y,
        toX: coordTo.x,
        toY: coordTo.y,
      });
    }

    window.onkeyup = async (e) => {
      if (e.key === config.key) {
        await movePiece(keyMove.from, keyMove.to, 0);
      }
    };

    /////////////////////////////////////////////   calculation /////////////////////////////////////////////
    function inject() {
      window.addEventListener("message", (event) => {
        if (config.stat && !document.querySelector("#acc-widget")) {
          statObj = createSimpleAccuracyDisplay(
            100,
            1500,
            100,
            1500,
            getSide(),
          );
        }

        if (!config.stat && document.querySelector("#acc-widget")) {
          statObj = null;
          document.querySelector("#acc-widget").remove();
        }

        if (event.source !== window) return;
        if (event.data && event.data.type === "FEN_RESPONSE") {
          if (event.data.fen !== fen_) {
            clearHighlightSquares();
            if (
              (getSide()[0] === "w" && event.data.fen.split(" ")[1] === "w") ||
              (getSide()[0] === "b" && event.data.fen.split(" ")[1] === "b")
            ) {
              fen_ = event.data.fen;
              engine.getMovesByFen(fen_, getSide()).then(async (moves) => {
                highlightMovesOnBoard(moves, getSide()[0]);
                keyMove.from = moves[0].from;
                keyMove.to = moves[0].to;
                if (moves.length > 0 && evalObj) {
                  evalObj.update(moves[0].eval, getSide());
                }

                if (moves.length > 0 && config.autoMove) {
                  await movePiece(
                    moves[0].from,
                    moves[0].to,
                    randomIntBetween(0, config.delay),
                  );
                }

                chrome.runtime.sendMessage({
                  type: "FROM_CONTENT",
                  data: moves,
                });
              });
            }
          }
        }
      });
    }

    inject();

    setInterval(() => {
      if (!config.showEval && document.querySelector("#customEval")) {
        document.querySelector("#customEval").remove();
        // customEval = null;
        evalObj = null;
      }

      if (!document.querySelector("#customEval") && config.showEval) {
        const boardContainer = document.querySelector("cg-container");
        if (boardContainer) {
          evalObj = createEvalBar("0.0", getSide());
          // customEval = document.querySelector("#customEval");
        }
      }

      requestFen();
    }, interval);

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes.chessConfig) {
        const newConfig = changes.chessConfig.newValue;
        config = newConfig;
        engine.updateConfig(
          config.lines,
          config.depth,
          config.style,
          config.elo + 700,
        );
      }
    });

    chrome.runtime.onMessage.addListener(async (message, sender) => {
      if (message.type === "history") {
        const whiteElo = getElo(getSide())?.white || null;
        const blackElo = getElo(getSide())?.black || null;

        if (config.stat && statObj) {
          lichessFenHistory = message.data;
          const result = await analyzer.update(lichessFenHistory, {
            whiteElo: whiteElo,
            blackElo: blackElo,
          });

          if (result) {
            statObj.update(
              result.white.accuracy,
              result.white.elo,
              result.black.accuracy,
              result.black.elo,
              getSide(),
            );
          }
        }
      }
    });
  }

  if (window.location.host === "worldchess.com") {
    chrome.runtime.sendMessage({ type: "ATTACH_DEBUGGER" }, (res) => {
      if (res?.success) {
        console.log("Debugger ready");
      }
    });
    let fen_ = "";
    let currentFen = "";
    let evalObj = null;
    let statObj = null;

    function getElo(side) {
      const allPlayerInfo = document.querySelectorAll(
        '[data-component="GamePlayerInfo"]',
      );
      if (allPlayerInfo.length < 2) return null;

      const extractElo = (text) => {
        const match = text.match(/\n(\d+)$/); // prend le nombre après le \n
        return match ? parseInt(match[1], 10) : null;
      };

      const topElo = extractElo(allPlayerInfo[0].innerText);
      const bottomElo = extractElo(allPlayerInfo[1].innerText);

      if (side.toLowerCase() === "white") {
        return { white: bottomElo, black: topElo };
      } else if (side.toLowerCase() === "black") {
        return { white: topElo, black: bottomElo };
      } else {
        return null;
      }
    }

    function getFEN() {
      const pTags = document.querySelectorAll("p");
      const result = [];

      const fenRegex =
        /^([rnbqkpRNBQKP1-8]+\/){7}[rnbqkpRNBQKP1-8]+\s[wb]\s(K?Q?k?q?-?)\s(-|[a-h][36])\s\d+\s\d+$/;

      pTags.forEach((p) => {
        const text = p.textContent.trim();
        if (fenRegex.test(text)) {
          result.push(text);
        }
      });

      return result[0];
    }

    function getSide() {
      const cgBoard = document.querySelector("cg-board");
      let side = "white";

      if (cgBoard) {
        const indicator = cgBoard.style.transform; // "rotate(180)"
        if (indicator === "rotate(180deg)") {
          side = "black";
        }
        if (indicator === "rotate(0deg)") {
          side = "white";
        }
      }

      // console.log("Getside called")
      // console.log("side")

      // console.log(side)

      return side;
    }

    function highlightMovesOnBoard(moves, side) {
      // console.log(side);
      if (!Array.isArray(moves)) return;

      // Si onlyShowEval est activé, on n'affiche rien
      if (config.onlyShowEval) return;

      const parent = document.querySelector("cg-board");

      if (!parent) return;

      const squareSize = parent.offsetWidth / 8;
      const maxMoves = 5;
      let colors = config.colors;

      // parent.querySelectorAll(".customH").forEach((el) => el.remove());

      function squareToPosition(square) {
        const fileChar = square[0];
        const rankChar = square[1];
        const rank = parseInt(rankChar, 10) - 1;

        let file;
        if (side === "w") {
          file = fileChar.charCodeAt(0) - "a".charCodeAt(0);
          const y = (7 - rank) * squareSize;
          const x = file * squareSize;
          return { x, y };
        } else {
          file = "h".charCodeAt(0) - fileChar.charCodeAt(0);
          const y = rank * squareSize;
          const x = file * squareSize;
          return { x, y };
        }
      }

      function drawArrow(fromSquare, toSquare, color, score) {
        const from = squareToPosition(fromSquare);
        const to = squareToPosition(toSquare);

        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg",
        );
        svg.setAttribute("class", "customH");
        svg.setAttribute("width", parent.offsetWidth);
        svg.setAttribute("height", parent.offsetWidth);
        svg.style.position = "absolute";
        svg.style.left = "0";
        svg.style.top = "0";
        svg.style.pointerEvents = "none";
        svg.style.overflow = "visible";
        svg.style.zIndex = "10";

        const defs = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "defs",
        );
        const marker = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "marker",
        );
        marker.setAttribute("id", `arrowhead-${color}`);
        marker.setAttribute("markerWidth", "3.5");
        marker.setAttribute("markerHeight", "2.5");
        marker.setAttribute("refX", "1.75");
        marker.setAttribute("refY", "1.25");
        marker.setAttribute("orient", "auto");
        marker.setAttribute("markerUnits", "strokeWidth");

        const arrowPath = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        arrowPath.setAttribute("d", "M0,0 L3.5,1.25 L0,2.5 Z");
        arrowPath.setAttribute("fill", color);
        marker.appendChild(arrowPath);
        defs.appendChild(marker);
        svg.appendChild(defs);

        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );
        line.setAttribute("x1", from.x + squareSize / 2);
        line.setAttribute("y1", from.y + squareSize / 2);
        line.setAttribute("x2", to.x + squareSize / 2);
        line.setAttribute("y2", to.y + squareSize / 2);
        line.setAttribute("stroke", color);
        line.setAttribute("stroke-width", "5");
        line.setAttribute("marker-end", `url(#arrowhead-${color})`);
        line.setAttribute("opacity", "0.6");
        svg.appendChild(line);

        if (score !== undefined) {
          const group = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g",
          );

          const text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text",
          );

          text.setAttribute("x", to.x + squareSize);
          text.setAttribute("y", to.y);
          text.setAttribute("font-size", "9");
          text.setAttribute("font-weight", "bold");
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("dominant-baseline", "middle");
          text.setAttribute("fill", color);

          let isNegative = false;
          let displayScore = score;

          const hasHash = score.startsWith("#");
          let raw = hasHash ? score.slice(1) : score;

          if (raw.startsWith("-")) {
            isNegative = true;
            raw = raw.slice(1);
          } else if (raw.startsWith("+")) {
            raw = raw.slice(1);
          }

          displayScore = hasHash ? "#" + raw : raw;
          text.textContent = displayScore;

          group.appendChild(text);
          svg.appendChild(group);

          requestAnimationFrame(() => {
            const bbox = text.getBBox();

            const paddingX = 2;
            const paddingY = 2;

            const rect = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "rect",
            );

            rect.setAttribute("x", bbox.x - paddingX);
            rect.setAttribute("y", bbox.y - paddingY);
            rect.setAttribute("width", bbox.width + paddingX * 2);
            rect.setAttribute("height", bbox.height + paddingY * 2);

            rect.setAttribute("rx", "8");
            rect.setAttribute("ry", "8");

            rect.setAttribute("fill", isNegative ? "#312e2b" : "#ffffff");
            rect.setAttribute("fill-opacity", "0.85");
            rect.setAttribute("stroke", isNegative ? "#000000" : "#cccccc");
            rect.setAttribute("stroke-width", "1");

            group.insertBefore(rect, text);
          });
        }

        parent.appendChild(svg);
      }

      parent.style.position = "relative";

      let filteredMoves = moves;
      if (config.winningMove) {
        filteredMoves = moves.filter((move) => {
          const evalValue = parseFloat(move.eval);
          if (side === "w") {
            return (
              evalValue >= 2 ||
              (move.eval.startsWith("#") && parseInt(move.eval.slice(1)) > 0)
            );
          } else {
            return (
              evalValue <= -2 ||
              (move.eval.startsWith("#-") && parseInt(move.eval.slice(2)) > 0)
            );
          }
        });
      }

      filteredMoves.slice(0, maxMoves).forEach((move, index) => {
        const color = colors[index] || "red";
        // drawArrow(move.from, move.to, color, move.eval);
        drawArrow(move.from, move.to, color, move.eval);
        if (side === "b") {
          document
            .querySelectorAll(".customH")
            .forEach((el) => (el.style.transform = "rotate(180deg)"));
        }
      });
    }

    function createEvalBar(initialScore = "0.0", initialColor = "white") {
      const boardContainer = document.querySelector("cg-board");

      if (!boardContainer) return console.error("Plateau non trouvé !");
      let w_ = boardContainer.offsetWidth;
      // Conteneur principal
      const evalContainer = document.createElement("div");
      evalContainer.id = "customEval";
      evalContainer.style.zIndex = "9999";
      evalContainer.style.width = `${(w_ * 6) / 100}px`;
      evalContainer.style.height = `${boardContainer.offsetWidth}px`;
      evalContainer.style.background = "#eee";
      evalContainer.style.marginLeft = "10px";
      evalContainer.style.position = "relative";
      evalContainer.style.left = "-10px";
      evalContainer.style.border = "1px solid #aaa";
      evalContainer.style.borderRadius = "4px";
      evalContainer.style.overflow = "hidden";

      const topBar = document.createElement("div");
      const bottomBar = document.createElement("div");

      [topBar, bottomBar].forEach((bar) => {
        bar.style.width = "100%";
        bar.style.position = "absolute";
        bar.style.transition = "height 0.3s ease";
      });

      topBar.style.top = "0";
      bottomBar.style.bottom = "0";

      evalContainer.appendChild(topBar);
      evalContainer.appendChild(bottomBar);

      // Texte en bas
      const scoreText = document.createElement("div");
      scoreText.style.position = "absolute";
      scoreText.style.bottom = "0";
      scoreText.style.left = "50%";
      scoreText.style.transform = "translateX(-50%)";
      scoreText.style.color = "red";
      scoreText.style.fontWeight = "bold";
      scoreText.style.fontSize = "12px";
      scoreText.style.pointerEvents = "none";
      evalContainer.appendChild(scoreText);

      boardContainer.parentNode.style.display = "flex";
      // boardContainer.parentNode.appendChild(evalContainer);
      boardContainer.parentNode.insertBefore(evalContainer, boardContainer);

      function parseScore(scoreStr) {
        if (!scoreStr) {
          return { score: 0, mate: false };
        }

        scoreStr = scoreStr.trim();
        let mate = false;
        let score = 0;

        if (scoreStr.startsWith("#")) {
          mate = true;
          scoreStr = scoreStr.slice(1);
        }

        score = parseFloat(scoreStr.replace("+", "")) || 0;
        return { score, mate };
      }

      function update(scoreStr, color = "white") {
        let { score, mate } = parseScore(scoreStr);
        let percent = 50;

        if (mate) {
          let sign = score > 0 ? "+" : "-";
          scoreText.textContent = "#" + sign + Math.abs(score);
          if (
            (score > 0 && color === "white") ||
            (score < 0 && color === "black")
          ) {
            percent = 100;
          } else {
            percent = 0;
          }
        } else {
          let sign = score > 0 ? "+" : "";
          scoreText.textContent = sign + score.toFixed(1);
          if (color === "black") score = -score;
          if (score >= 7) {
            percent = 90;
          } else if (score <= -7) {
            percent = 10;
          } else {
            percent = 50 + (score / 7) * 40;
          }
        }

        if (color === "white") {
          bottomBar.style.background = "#ffffff";
          topBar.style.background = "#312e2b";
        } else {
          bottomBar.style.background = "#312e2b";
          topBar.style.background = "#ffffff";
        }

        bottomBar.style.height = percent + "%";
        topBar.style.height = 100 - percent + "%";
      }

      update(initialScore, initialColor);
      return { update };
    }

    async function movePiece(from, to, delay) {
      const fromSquare = from;
      const toSquare = to;
      const moveDelay = delay;

      const board = document.querySelector("cg-board");
      const rect = board.getBoundingClientRect();

      const boardInfo = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };

      chrome.runtime.sendMessage({ type: "BOARD_INFO", boardInfo });
      const coordFrom = squareToPixels(fromSquare, boardInfo, getSide());
      const coordTo = squareToPixels(toSquare, boardInfo, getSide());

      await sleep(moveDelay);

      chrome.runtime.sendMessage({
        type: "DRAG_MOVE",
        fromX: coordFrom.x,
        fromY: coordFrom.y,
        toX: coordTo.x,
        toY: coordTo.y,
      });
    }

    window.onkeyup = async (e) => {
      if (e.key === config.key) {
        movePiece(keyMove.from, keyMove.to, 0);
      }
    };

    setInterval(() => {
      // eval bar

      if (config.stat && !document.querySelector("#acc-widget")) {
        statObj = createSimpleAccuracyDisplay(100, 1500, 100, 1500, getSide());
      }

      if (!config.stat && document.querySelector("#acc-widget")) {
        statObj = null;
        document.querySelector("#acc-widget").remove();
      }

      if (!document.querySelector("#customEval") && config.showEval) {
        const boardContainer = document.querySelector("cg-board");
        if (boardContainer) {
          evalObj = createEvalBar("0.0", getSide());
        }
      }

      // Fen
      fen_ = getFEN();
      if (fen_ && fen_ !== currentFen) {
        // console.log(fen_)
        currentFen = fen_;
        clearHighlightSquares();

        if (!config.showEval && document.querySelector("#customEval")) {
          document.querySelector("#customEval").remove();
          evalObj = null;
        }

        if (
          (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
          (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
        ) {
          engine.getMovesByFen(fen_, getSide()).then(async (moves) => {
            keyMove.from = moves[0].from;
            keyMove.to = moves[0].to;
            chrome.runtime.sendMessage({ type: "FROM_CONTENT", data: moves });
            highlightMovesOnBoard(moves, getSide()[0]);

            if (moves.length > 0 && evalObj) {
              evalObj.update(moves[0].eval, getSide());
            }

            if (moves.length > 0 && config.autoMove) {
              movePiece(
                moves[0].from,
                moves[0].to,
                randomIntBetween(0, config.delay),
              );
            }
          });
        }
      }
    }, interval);

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes.chessConfig) {
        const newConfig = changes.chessConfig.newValue;
        config = newConfig;
        engine.updateConfig(
          config.lines,
          config.depth,
          config.style,
          config.elo + 700,
        );
      }
    });

    chrome.runtime.onMessage.addListener(async (message, sender) => {
      if (message.type === "history") {
        const whiteElo = getElo(getSide())?.white || null;
        const blackElo = getElo(getSide())?.black || null;

        if (config.stat && statObj) {
          let historyMessage = message.data;
          const result = await analyzer.update(historyMessage, {
            whiteElo: whiteElo,
            blackElo: blackElo,
          });
          if (result) {
            statObj.update(
              result.white.accuracy,
              result.white.elo,
              result.black.accuracy,
              result.black.elo,
              getSide(),
            );
          }
        }
      }
    });
  }
};

const LOCAL_VERSION = "1.2";

let downloadlink = "https://www.youtube.com/@Redson_Eric";

async function checkUpdate() {
  try {
    const url =
      "https://api.github.com/repos/Red-Eric/ChessBot-CDP/contents/ChessKiller/update.json?ref=master";

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        Authorization:
          "Bearer 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",
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }

    const result = await response.json();
    const content = atob(result.content.replace(/\n/g, ""));
    const data = JSON.parse(content);

    if (data.version !== LOCAL_VERSION) {
      downloadlink = data.link;
      return true;
    }

    return false;
  } catch (err) {
    console.error("Erreur fetch:", err);
    return true;
  }
}

(async () => {
  const updateNeeded = await checkUpdate();
  if (!updateNeeded) {
    startCheat();
  }
  if (updateNeeded) {
    if (
      window.location.hostname.includes("chess.com") ||
      window.location.hostname.includes("lichess") ||
      window.location.hostname.includes("worldchess")
    ) {
      alert("Your ChessHv3 extension is outdated");
      window.open(downloadlink, "_blank");
    }
  }
})();

// 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

// (async () => {
//   await analyzer.init();

//   const result = await analyzer.update(fenHistory);
//   console.log(result.white.accuracy, result.moves.at(-1).classification);
//   console.log(result.black.accuracy, result.moves.at(-1).classification);
// })();
