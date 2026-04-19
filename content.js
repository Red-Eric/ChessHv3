const default_fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
let squareTo = "";
const BOOKS = [];
let userName = null;
let lastClassification = null;
let moveIndex_ = 999;
let isGameOverFlag = true;
const chessComAudio = new Audio();
let lastFenForAnalyzis = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

const coachs = [
  {
    lang: "en_US",
    link: "https://text-and-audio.chess.com/prod/released/David_coach/en-US/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale en-US json {"currentCoach":{"id":"377706c2-d0a4-11ee-b135-19f9e53c40f5","name":"David","titledName":"Coach David","imageUrl":"https://assets-coaches.chess.com/image/coachdavid.png","voiceId":"David_coach","country":{"id":112,"name":"Poland","nameLocalized":"Poland","code":"PL"},"locale":"en-US","textId":"Generic_coach","analyticsId":"David","iconUrl":"https://assets-coaches.chess.com/image/coachdavid-icon.png","taglines":[{"text":"Hi, I\'m Coach David. I\'m here to teach you all about chess.","audioUrlHash":"6547b8d0c97cd470556c1cab780d520750e1474f9566199395fd640507931de8"},{"text":"Hi, I\'m David. Choose me and I\'ll help you learn chess.","audioUrlHash":"1cb21b7c928dc9a9f07fa11cc233be4b9ae88c5b9152a07415c23ee8d5bb4a8a"},{"text":"Hi, Coach David here! I\'m ready to share my chess knowledge with you.","audioUrlHash":"13e432e30b5beb3b5489608781c1bdc968fc6dbe28aebe4bd0db78c1fae43a54"},{"text":"David is my name, coaching is my game. Choose me!","audioUrlHash":"cfc736c0df6ab8438427e5df841f849800a16690668fce360a5aeda99a50860d"},{"text":"Hey, I\'m David. Will you be my student?","audioUrlHash":"c1376a09ff6ae0925e3c480e0ef667d4c5780e6db54c3f389329d4df8ff6974a"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david.riv?v=dfc18f78","greetingRiveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david_greeting.riv?v=a2a79233"}}`,
  },
  {
    lang: "fr_FR",
    link: "https://text-and-audio.chess.com/prod/released/David_coach/fr-FR/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale fr-FR json {"currentCoach":{"id":"377706c2-d0a4-11ee-b135-19f9e53c40f5","name":"David","titledName":"Coach David","imageUrl":"https://assets-coaches.chess.com/image/coachdavid.png","voiceId":"David_coach","country":{"id":112,"name":"Poland","nameLocalized":"Poland","code":"PL"},"locale":"en-US","textId":"Generic_coach","analyticsId":"David","iconUrl":"https://assets-coaches.chess.com/image/coachdavid-icon.png","taglines":[{"text":"Hi, I\'m Coach David. I\'m here to teach you all about chess.","audioUrlHash":"6547b8d0c97cd470556c1cab780d520750e1474f9566199395fd640507931de8"},{"text":"Hi, I\'m David. Choose me and I\'ll help you learn chess.","audioUrlHash":"1cb21b7c928dc9a9f07fa11cc233be4b9ae88c5b9152a07415c23ee8d5bb4a8a"},{"text":"Hi, Coach David here! I\'m ready to share my chess knowledge with you.","audioUrlHash":"13e432e30b5beb3b5489608781c1bdc968fc6dbe28aebe4bd0db78c1fae43a54"},{"text":"David is my name, coaching is my game. Choose me!","audioUrlHash":"cfc736c0df6ab8438427e5df841f849800a16690668fce360a5aeda99a50860d"},{"text":"Hey, I\'m David. Will you be my student?","audioUrlHash":"c1376a09ff6ae0925e3c480e0ef667d4c5780e6db54c3f389329d4df8ff6974a"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david.riv?v=dfc18f78","greetingRiveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david_greeting.riv?v=a2a79233"}}`,
  },
  {
    lang: "es_ES",
    link: "https://text-and-audio.chess.com/prod/released/David_coach/es-ES/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale es-ES json {"currentCoach":{"id":"377706c2-d0a4-11ee-b135-19f9e53c40f5","name":"David","titledName":"Coach David","imageUrl":"https://assets-coaches.chess.com/image/coachdavid.png","voiceId":"David_coach","country":{"id":112,"name":"Poland","nameLocalized":"Poland","code":"PL"},"locale":"en-US","textId":"Generic_coach","analyticsId":"David","iconUrl":"https://assets-coaches.chess.com/image/coachdavid-icon.png","taglines":[{"text":"Hi, I\'m Coach David. I\'m here to teach you all about chess.","audioUrlHash":"6547b8d0c97cd470556c1cab780d520750e1474f9566199395fd640507931de8"},{"text":"Hi, I\'m David. Choose me and I\'ll help you learn chess.","audioUrlHash":"1cb21b7c928dc9a9f07fa11cc233be4b9ae88c5b9152a07415c23ee8d5bb4a8a"},{"text":"Hi, Coach David here! I\'m ready to share my chess knowledge with you.","audioUrlHash":"13e432e30b5beb3b5489608781c1bdc968fc6dbe28aebe4bd0db78c1fae43a54"},{"text":"David is my name, coaching is my game. Choose me!","audioUrlHash":"cfc736c0df6ab8438427e5df841f849800a16690668fce360a5aeda99a50860d"},{"text":"Hey, I\'m David. Will you be my student?","audioUrlHash":"c1376a09ff6ae0925e3c480e0ef667d4c5780e6db54c3f389329d4df8ff6974a"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david.riv?v=dfc18f78","greetingRiveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david_greeting.riv?v=a2a79233"}}`,
  },
  {
    lang: "ar_SA",
    link: "https://text-and-audio.chess.com/prod/released/David_coach/ar-SA/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale ar-SA json {"currentCoach":{"id":"377706c2-d0a4-11ee-b135-19f9e53c40f5","name":"David","titledName":"Coach David","imageUrl":"https://assets-coaches.chess.com/image/coachdavid.png","voiceId":"David_coach","country":{"id":112,"name":"Poland","nameLocalized":"Poland","code":"PL"},"locale":"en-US","textId":"Generic_coach","analyticsId":"David","iconUrl":"https://assets-coaches.chess.com/image/coachdavid-icon.png","taglines":[{"text":"Hi, I\'m Coach David. I\'m here to teach you all about chess.","audioUrlHash":"6547b8d0c97cd470556c1cab780d520750e1474f9566199395fd640507931de8"},{"text":"Hi, I\'m David. Choose me and I\'ll help you learn chess.","audioUrlHash":"1cb21b7c928dc9a9f07fa11cc233be4b9ae88c5b9152a07415c23ee8d5bb4a8a"},{"text":"Hi, Coach David here! I\'m ready to share my chess knowledge with you.","audioUrlHash":"13e432e30b5beb3b5489608781c1bdc968fc6dbe28aebe4bd0db78c1fae43a54"},{"text":"David is my name, coaching is my game. Choose me!","audioUrlHash":"cfc736c0df6ab8438427e5df841f849800a16690668fce360a5aeda99a50860d"},{"text":"Hey, I\'m David. Will you be my student?","audioUrlHash":"c1376a09ff6ae0925e3c480e0ef667d4c5780e6db54c3f389329d4df8ff6974a"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david.riv?v=dfc18f78","greetingRiveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david_greeting.riv?v=a2a79233"}}`,
  },
  {
    lang: "ru_RU",
    link: "https://text-and-audio.chess.com/prod/released/David_coach/ru-RU/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale ru-RU json {"currentCoach":{"id":"377706c2-d0a4-11ee-b135-19f9e53c40f5","name":"David","titledName":"Coach David","imageUrl":"https://assets-coaches.chess.com/image/coachdavid.png","voiceId":"David_coach","country":{"id":112,"name":"Poland","nameLocalized":"Poland","code":"PL"},"locale":"en-US","textId":"Generic_coach","analyticsId":"David","iconUrl":"https://assets-coaches.chess.com/image/coachdavid-icon.png","taglines":[{"text":"Hi, I\'m Coach David. I\'m here to teach you all about chess.","audioUrlHash":"6547b8d0c97cd470556c1cab780d520750e1474f9566199395fd640507931de8"},{"text":"Hi, I\'m David. Choose me and I\'ll help you learn chess.","audioUrlHash":"1cb21b7c928dc9a9f07fa11cc233be4b9ae88c5b9152a07415c23ee8d5bb4a8a"},{"text":"Hi, Coach David here! I\'m ready to share my chess knowledge with you.","audioUrlHash":"13e432e30b5beb3b5489608781c1bdc968fc6dbe28aebe4bd0db78c1fae43a54"},{"text":"David is my name, coaching is my game. Choose me!","audioUrlHash":"cfc736c0df6ab8438427e5df841f849800a16690668fce360a5aeda99a50860d"},{"text":"Hey, I\'m David. Will you be my student?","audioUrlHash":"c1376a09ff6ae0925e3c480e0ef667d4c5780e6db54c3f389329d4df8ff6974a"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david.riv?v=dfc18f78","greetingRiveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david_greeting.riv?v=a2a79233"}}`,
  },
  {
    lang: "pt_PT",
    link: "https://text-and-audio.chess.com/prod/released/David_coach/pt-PT/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale pt-PT json {"currentCoach":{"id":"377706c2-d0a4-11ee-b135-19f9e53c40f5","name":"David","titledName":"Coach David","imageUrl":"https://assets-coaches.chess.com/image/coachdavid.png","voiceId":"David_coach","country":{"id":112,"name":"Poland","nameLocalized":"Poland","code":"PL"},"locale":"en-US","textId":"Generic_coach","analyticsId":"David","iconUrl":"https://assets-coaches.chess.com/image/coachdavid-icon.png","taglines":[{"text":"Hi, I\'m Coach David. I\'m here to teach you all about chess.","audioUrlHash":"6547b8d0c97cd470556c1cab780d520750e1474f9566199395fd640507931de8"},{"text":"Hi, I\'m David. Choose me and I\'ll help you learn chess.","audioUrlHash":"1cb21b7c928dc9a9f07fa11cc233be4b9ae88c5b9152a07415c23ee8d5bb4a8a"},{"text":"Hi, Coach David here! I\'m ready to share my chess knowledge with you.","audioUrlHash":"13e432e30b5beb3b5489608781c1bdc968fc6dbe28aebe4bd0db78c1fae43a54"},{"text":"David is my name, coaching is my game. Choose me!","audioUrlHash":"cfc736c0df6ab8438427e5df841f849800a16690668fce360a5aeda99a50860d"},{"text":"Hey, I\'m David. Will you be my student?","audioUrlHash":"c1376a09ff6ae0925e3c480e0ef667d4c5780e6db54c3f389329d4df8ff6974a"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david.riv?v=dfc18f78","greetingRiveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david_greeting.riv?v=a2a79233"}}`,
  },
  {
    lang: "de_DE",
    link: "https://text-and-audio.chess.com/prod/released/David_coach/de-DE/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale de-DE json {"currentCoach":{"id":"377706c2-d0a4-11ee-b135-19f9e53c40f5","name":"David","titledName":"Coach David","imageUrl":"https://assets-coaches.chess.com/image/coachdavid.png","voiceId":"David_coach","country":{"id":112,"name":"Poland","nameLocalized":"Poland","code":"PL"},"locale":"en-US","textId":"Generic_coach","analyticsId":"David","iconUrl":"https://assets-coaches.chess.com/image/coachdavid-icon.png","taglines":[{"text":"Hi, I\'m Coach David. I\'m here to teach you all about chess.","audioUrlHash":"6547b8d0c97cd470556c1cab780d520750e1474f9566199395fd640507931de8"},{"text":"Hi, I\'m David. Choose me and I\'ll help you learn chess.","audioUrlHash":"1cb21b7c928dc9a9f07fa11cc233be4b9ae88c5b9152a07415c23ee8d5bb4a8a"},{"text":"Hi, Coach David here! I\'m ready to share my chess knowledge with you.","audioUrlHash":"13e432e30b5beb3b5489608781c1bdc968fc6dbe28aebe4bd0db78c1fae43a54"},{"text":"David is my name, coaching is my game. Choose me!","audioUrlHash":"cfc736c0df6ab8438427e5df841f849800a16690668fce360a5aeda99a50860d"},{"text":"Hey, I\'m David. Will you be my student?","audioUrlHash":"c1376a09ff6ae0925e3c480e0ef667d4c5780e6db54c3f389329d4df8ff6974a"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david.riv?v=dfc18f78","greetingRiveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david_greeting.riv?v=a2a79233"}}`,
  },
  {
    lang: "it_IT",
    link: "https://text-and-audio.chess.com/prod/released/David_coach/it-IT/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale it-IT json {"currentCoach":{"id":"377706c2-d0a4-11ee-b135-19f9e53c40f5","name":"David","titledName":"Coach David","imageUrl":"https://assets-coaches.chess.com/image/coachdavid.png","voiceId":"David_coach","country":{"id":112,"name":"Poland","nameLocalized":"Poland","code":"PL"},"locale":"en-US","textId":"Generic_coach","analyticsId":"David","iconUrl":"https://assets-coaches.chess.com/image/coachdavid-icon.png","taglines":[{"text":"Hi, I\'m Coach David. I\'m here to teach you all about chess.","audioUrlHash":"6547b8d0c97cd470556c1cab780d520750e1474f9566199395fd640507931de8"},{"text":"Hi, I\'m David. Choose me and I\'ll help you learn chess.","audioUrlHash":"1cb21b7c928dc9a9f07fa11cc233be4b9ae88c5b9152a07415c23ee8d5bb4a8a"},{"text":"Hi, Coach David here! I\'m ready to share my chess knowledge with you.","audioUrlHash":"13e432e30b5beb3b5489608781c1bdc968fc6dbe28aebe4bd0db78c1fae43a54"},{"text":"David is my name, coaching is my game. Choose me!","audioUrlHash":"cfc736c0df6ab8438427e5df841f849800a16690668fce360a5aeda99a50860d"},{"text":"Hey, I\'m David. Will you be my student?","audioUrlHash":"c1376a09ff6ae0925e3c480e0ef667d4c5780e6db54c3f389329d4df8ff6974a"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david.riv?v=dfc18f78","greetingRiveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david_greeting.riv?v=a2a79233"}}`,
  },
  {
    lang: "tr_TR",
    link: "https://text-and-audio.chess.com/prod/released/David_coach/tr-TR/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale tr-TR json {"currentCoach":{"id":"377706c2-d0a4-11ee-b135-19f9e53c40f5","name":"David","titledName":"Coach David","imageUrl":"https://assets-coaches.chess.com/image/coachdavid.png","voiceId":"David_coach","country":{"id":112,"name":"Poland","nameLocalized":"Poland","code":"PL"},"locale":"en-US","textId":"Generic_coach","analyticsId":"David","iconUrl":"https://assets-coaches.chess.com/image/coachdavid-icon.png","taglines":[{"text":"Hi, I\'m Coach David. I\'m here to teach you all about chess.","audioUrlHash":"6547b8d0c97cd470556c1cab780d520750e1474f9566199395fd640507931de8"},{"text":"Hi, I\'m David. Choose me and I\'ll help you learn chess.","audioUrlHash":"1cb21b7c928dc9a9f07fa11cc233be4b9ae88c5b9152a07415c23ee8d5bb4a8a"},{"text":"Hi, Coach David here! I\'m ready to share my chess knowledge with you.","audioUrlHash":"13e432e30b5beb3b5489608781c1bdc968fc6dbe28aebe4bd0db78c1fae43a54"},{"text":"David is my name, coaching is my game. Choose me!","audioUrlHash":"cfc736c0df6ab8438427e5df841f849800a16690668fce360a5aeda99a50860d"},{"text":"Hey, I\'m David. Will you be my student?","audioUrlHash":"c1376a09ff6ae0925e3c480e0ef667d4c5780e6db54c3f389329d4df8ff6974a"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david.riv?v=dfc18f78","greetingRiveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david_greeting.riv?v=a2a79233"}}`,
  },
  {
    lang: "pl_PL",
    link: "https://text-and-audio.chess.com/prod/released/David_coach/pl-PL/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale pl-PL json {"currentCoach":{"id":"377706c2-d0a4-11ee-b135-19f9e53c40f5","name":"David","titledName":"Coach David","imageUrl":"https://assets-coaches.chess.com/image/coachdavid.png","voiceId":"David_coach","country":{"id":112,"name":"Poland","nameLocalized":"Poland","code":"PL"},"locale":"en-US","textId":"Generic_coach","analyticsId":"David","iconUrl":"https://assets-coaches.chess.com/image/coachdavid-icon.png","taglines":[{"text":"Hi, I\'m Coach David. I\'m here to teach you all about chess.","audioUrlHash":"6547b8d0c97cd470556c1cab780d520750e1474f9566199395fd640507931de8"},{"text":"Hi, I\'m David. Choose me and I\'ll help you learn chess.","audioUrlHash":"1cb21b7c928dc9a9f07fa11cc233be4b9ae88c5b9152a07415c23ee8d5bb4a8a"},{"text":"Hi, Coach David here! I\'m ready to share my chess knowledge with you.","audioUrlHash":"13e432e30b5beb3b5489608781c1bdc968fc6dbe28aebe4bd0db78c1fae43a54"},{"text":"David is my name, coaching is my game. Choose me!","audioUrlHash":"cfc736c0df6ab8438427e5df841f849800a16690668fce360a5aeda99a50860d"},{"text":"Hey, I\'m David. Will you be my student?","audioUrlHash":"c1376a09ff6ae0925e3c480e0ef667d4c5780e6db54c3f389329d4df8ff6974a"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david.riv?v=dfc18f78","greetingRiveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david_greeting.riv?v=a2a79233"}}`,
  },
  {
    lang: "ko_KR",
    link: "https://text-and-audio.chess.com/prod/released/David_coach/ko-KR/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale ko-KR json {"currentCoach":{"id":"377706c2-d0a4-11ee-b135-19f9e53c40f5","name":"David","titledName":"Coach David","imageUrl":"https://assets-coaches.chess.com/image/coachdavid.png","voiceId":"David_coach","country":{"id":112,"name":"Poland","nameLocalized":"Poland","code":"PL"},"locale":"en-US","textId":"Generic_coach","analyticsId":"David","iconUrl":"https://assets-coaches.chess.com/image/coachdavid-icon.png","taglines":[{"text":"Hi, I\'m Coach David. I\'m here to teach you all about chess.","audioUrlHash":"6547b8d0c97cd470556c1cab780d520750e1474f9566199395fd640507931de8"},{"text":"Hi, I\'m David. Choose me and I\'ll help you learn chess.","audioUrlHash":"1cb21b7c928dc9a9f07fa11cc233be4b9ae88c5b9152a07415c23ee8d5bb4a8a"},{"text":"Hi, Coach David here! I\'m ready to share my chess knowledge with you.","audioUrlHash":"13e432e30b5beb3b5489608781c1bdc968fc6dbe28aebe4bd0db78c1fae43a54"},{"text":"David is my name, coaching is my game. Choose me!","audioUrlHash":"cfc736c0df6ab8438427e5df841f849800a16690668fce360a5aeda99a50860d"},{"text":"Hey, I\'m David. Will you be my student?","audioUrlHash":"c1376a09ff6ae0925e3c480e0ef667d4c5780e6db54c3f389329d4df8ff6974a"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david.riv?v=dfc18f78","greetingRiveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david_greeting.riv?v=a2a79233"}}`,
  },
  {
    lang: "id_ID",
    link: "https://text-and-audio.chess.com/prod/released/David_coach/id-ID/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale id-ID json {"currentCoach":{"id":"377706c2-d0a4-11ee-b135-19f9e53c40f5","name":"David","titledName":"Coach David","imageUrl":"https://assets-coaches.chess.com/image/coachdavid.png","voiceId":"David_coach","country":{"id":112,"name":"Poland","nameLocalized":"Poland","code":"PL"},"locale":"en-US","textId":"Generic_coach","analyticsId":"David","iconUrl":"https://assets-coaches.chess.com/image/coachdavid-icon.png","taglines":[{"text":"Hi, I\'m Coach David. I\'m here to teach you all about chess.","audioUrlHash":"6547b8d0c97cd470556c1cab780d520750e1474f9566199395fd640507931de8"},{"text":"Hi, I\'m David. Choose me and I\'ll help you learn chess.","audioUrlHash":"1cb21b7c928dc9a9f07fa11cc233be4b9ae88c5b9152a07415c23ee8d5bb4a8a"},{"text":"Hi, Coach David here! I\'m ready to share my chess knowledge with you.","audioUrlHash":"13e432e30b5beb3b5489608781c1bdc968fc6dbe28aebe4bd0db78c1fae43a54"},{"text":"David is my name, coaching is my game. Choose me!","audioUrlHash":"cfc736c0df6ab8438427e5df841f849800a16690668fce360a5aeda99a50860d"},{"text":"Hey, I\'m David. Will you be my student?","audioUrlHash":"c1376a09ff6ae0925e3c480e0ef667d4c5780e6db54c3f389329d4df8ff6974a"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david.riv?v=dfc18f78","greetingRiveAnimationUrl":"https://assets-coaches.chess.com/image/coach_david_greeting.riv?v=a2a79233"}}`,
  },
  {
    lang: "en_US",
    link: "https://text-and-audio.chess.com/prod/released/Mae_coach/en-US/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale en-US json {"currentCoach":{"id":"3779595e-d0a4-11ee-a188-05b5e2276152","name":"Mae","titledName":"Coach Mae","imageUrl":"https://assets-coaches.chess.com/image/coachmae.png","voiceId":"Mae_coach","country":{"id":78,"name":"Japan","nameLocalized":"Japan","code":"JP"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Mae","iconUrl":"https://assets-coaches.chess.com/image/coachmae-icon.png","taglines":[{"text":"Hey, I'm Mae! Choose me and let's start learning.","audioUrlHash":"1f37eb5ce41f900a3a771920313d70625477b43a33020674fc282bf301017b39"},{"text":"Hey, it's Coach Mae! I can help you improve your chess game.","audioUrlHash":"5ee315915acc75abef70ee00c3b621b2940136666bf10a5346fd98df4bc48897"},{"text":"Hi, I'm Coach Mae. I'd love to help you learn chess.","audioUrlHash":"725866514a2dc39fa59f4251c1d4650cb29d3ff57b1006270dbf46625e44354e"},{"text":"My name is Mae and I'd love to help you learn chess.","audioUrlHash":"2fdbe96f626b7be4ef7cf401e67751504ba4e65fdec4fb5b1e0fb4ca368a8428"},{"text":"Coach Mae here! Ready to learn?","audioUrlHash":"c38a533cbb451e8aca013dc34ace6f8adc602441b2f9ed9ec55a30d7634bc4f2"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "fr_FR",
    link: "https://text-and-audio.chess.com/prod/released/Mae_coach/fr-FR/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale fr-FR json {"currentCoach":{"id":"3779595e-d0a4-11ee-a188-05b5e2276152","name":"Mae","titledName":"Coach Mae","imageUrl":"https://assets-coaches.chess.com/image/coachmae.png","voiceId":"Mae_coach","country":{"id":78,"name":"Japan","nameLocalized":"Japan","code":"JP"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Mae","iconUrl":"https://assets-coaches.chess.com/image/coachmae-icon.png","taglines":[{"text":"Hey, I'm Mae! Choose me and let's start learning.","audioUrlHash":"1f37eb5ce41f900a3a771920313d70625477b43a33020674fc282bf301017b39"},{"text":"Hey, it's Coach Mae! I can help you improve your chess game.","audioUrlHash":"5ee315915acc75abef70ee00c3b621b2940136666bf10a5346fd98df4bc48897"},{"text":"Hi, I'm Coach Mae. I'd love to help you learn chess.","audioUrlHash":"725866514a2dc39fa59f4251c1d4650cb29d3ff57b1006270dbf46625e44354e"},{"text":"My name is Mae and I'd love to help you learn chess.","audioUrlHash":"2fdbe96f626b7be4ef7cf401e67751504ba4e65fdec4fb5b1e0fb4ca368a8428"},{"text":"Coach Mae here! Ready to learn?","audioUrlHash":"c38a533cbb451e8aca013dc34ace6f8adc602441b2f9ed9ec55a30d7634bc4f2"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "es_ES",
    link: "https://text-and-audio.chess.com/prod/released/Mae_coach/es-ES/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale es-ES json {"currentCoach":{"id":"3779595e-d0a4-11ee-a188-05b5e2276152","name":"Mae","titledName":"Coach Mae","imageUrl":"https://assets-coaches.chess.com/image/coachmae.png","voiceId":"Mae_coach","country":{"id":78,"name":"Japan","nameLocalized":"Japan","code":"JP"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Mae","iconUrl":"https://assets-coaches.chess.com/image/coachmae-icon.png","taglines":[{"text":"Hey, I'm Mae! Choose me and let's start learning.","audioUrlHash":"1f37eb5ce41f900a3a771920313d70625477b43a33020674fc282bf301017b39"},{"text":"Hey, it's Coach Mae! I can help you improve your chess game.","audioUrlHash":"5ee315915acc75abef70ee00c3b621b2940136666bf10a5346fd98df4bc48897"},{"text":"Hi, I'm Coach Mae. I'd love to help you learn chess.","audioUrlHash":"725866514a2dc39fa59f4251c1d4650cb29d3ff57b1006270dbf46625e44354e"},{"text":"My name is Mae and I'd love to help you learn chess.","audioUrlHash":"2fdbe96f626b7be4ef7cf401e67751504ba4e65fdec4fb5b1e0fb4ca368a8428"},{"text":"Coach Mae here! Ready to learn?","audioUrlHash":"c38a533cbb451e8aca013dc34ace6f8adc602441b2f9ed9ec55a30d7634bc4f2"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "ar_SA",
    link: "https://text-and-audio.chess.com/prod/released/Mae_coach/ar-SA/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale ar-SA json {"currentCoach":{"id":"3779595e-d0a4-11ee-a188-05b5e2276152","name":"Mae","titledName":"Coach Mae","imageUrl":"https://assets-coaches.chess.com/image/coachmae.png","voiceId":"Mae_coach","country":{"id":78,"name":"Japan","nameLocalized":"Japan","code":"JP"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Mae","iconUrl":"https://assets-coaches.chess.com/image/coachmae-icon.png","taglines":[{"text":"Hey, I'm Mae! Choose me and let's start learning.","audioUrlHash":"1f37eb5ce41f900a3a771920313d70625477b43a33020674fc282bf301017b39"},{"text":"Hey, it's Coach Mae! I can help you improve your chess game.","audioUrlHash":"5ee315915acc75abef70ee00c3b621b2940136666bf10a5346fd98df4bc48897"},{"text":"Hi, I'm Coach Mae. I'd love to help you learn chess.","audioUrlHash":"725866514a2dc39fa59f4251c1d4650cb29d3ff57b1006270dbf46625e44354e"},{"text":"My name is Mae and I'd love to help you learn chess.","audioUrlHash":"2fdbe96f626b7be4ef7cf401e67751504ba4e65fdec4fb5b1e0fb4ca368a8428"},{"text":"Coach Mae here! Ready to learn?","audioUrlHash":"c38a533cbb451e8aca013dc34ace6f8adc602441b2f9ed9ec55a30d7634bc4f2"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "ru_RU",
    link: "https://text-and-audio.chess.com/prod/released/Mae_coach/ru-RU/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale ru-RU json {"currentCoach":{"id":"3779595e-d0a4-11ee-a188-05b5e2276152","name":"Mae","titledName":"Coach Mae","imageUrl":"https://assets-coaches.chess.com/image/coachmae.png","voiceId":"Mae_coach","country":{"id":78,"name":"Japan","nameLocalized":"Japan","code":"JP"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Mae","iconUrl":"https://assets-coaches.chess.com/image/coachmae-icon.png","taglines":[{"text":"Hey, I'm Mae! Choose me and let's start learning.","audioUrlHash":"1f37eb5ce41f900a3a771920313d70625477b43a33020674fc282bf301017b39"},{"text":"Hey, it's Coach Mae! I can help you improve your chess game.","audioUrlHash":"5ee315915acc75abef70ee00c3b621b2940136666bf10a5346fd98df4bc48897"},{"text":"Hi, I'm Coach Mae. I'd love to help you learn chess.","audioUrlHash":"725866514a2dc39fa59f4251c1d4650cb29d3ff57b1006270dbf46625e44354e"},{"text":"My name is Mae and I'd love to help you learn chess.","audioUrlHash":"2fdbe96f626b7be4ef7cf401e67751504ba4e65fdec4fb5b1e0fb4ca368a8428"},{"text":"Coach Mae here! Ready to learn?","audioUrlHash":"c38a533cbb451e8aca013dc34ace6f8adc602441b2f9ed9ec55a30d7634bc4f2"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "pt_PT",
    link: "https://text-and-audio.chess.com/prod/released/Mae_coach/pt-PT/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale pt-PT json {"currentCoach":{"id":"3779595e-d0a4-11ee-a188-05b5e2276152","name":"Mae","titledName":"Coach Mae","imageUrl":"https://assets-coaches.chess.com/image/coachmae.png","voiceId":"Mae_coach","country":{"id":78,"name":"Japan","nameLocalized":"Japan","code":"JP"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Mae","iconUrl":"https://assets-coaches.chess.com/image/coachmae-icon.png","taglines":[{"text":"Hey, I'm Mae! Choose me and let's start learning.","audioUrlHash":"1f37eb5ce41f900a3a771920313d70625477b43a33020674fc282bf301017b39"},{"text":"Hey, it's Coach Mae! I can help you improve your chess game.","audioUrlHash":"5ee315915acc75abef70ee00c3b621b2940136666bf10a5346fd98df4bc48897"},{"text":"Hi, I'm Coach Mae. I'd love to help you learn chess.","audioUrlHash":"725866514a2dc39fa59f4251c1d4650cb29d3ff57b1006270dbf46625e44354e"},{"text":"My name is Mae and I'd love to help you learn chess.","audioUrlHash":"2fdbe96f626b7be4ef7cf401e67751504ba4e65fdec4fb5b1e0fb4ca368a8428"},{"text":"Coach Mae here! Ready to learn?","audioUrlHash":"c38a533cbb451e8aca013dc34ace6f8adc602441b2f9ed9ec55a30d7634bc4f2"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "de_DE",
    link: "https://text-and-audio.chess.com/prod/released/Mae_coach/de-DE/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale de-DE json {"currentCoach":{"id":"3779595e-d0a4-11ee-a188-05b5e2276152","name":"Mae","titledName":"Coach Mae","imageUrl":"https://assets-coaches.chess.com/image/coachmae.png","voiceId":"Mae_coach","country":{"id":78,"name":"Japan","nameLocalized":"Japan","code":"JP"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Mae","iconUrl":"https://assets-coaches.chess.com/image/coachmae-icon.png","taglines":[{"text":"Hey, I'm Mae! Choose me and let's start learning.","audioUrlHash":"1f37eb5ce41f900a3a771920313d70625477b43a33020674fc282bf301017b39"},{"text":"Hey, it's Coach Mae! I can help you improve your chess game.","audioUrlHash":"5ee315915acc75abef70ee00c3b621b2940136666bf10a5346fd98df4bc48897"},{"text":"Hi, I'm Coach Mae. I'd love to help you learn chess.","audioUrlHash":"725866514a2dc39fa59f4251c1d4650cb29d3ff57b1006270dbf46625e44354e"},{"text":"My name is Mae and I'd love to help you learn chess.","audioUrlHash":"2fdbe96f626b7be4ef7cf401e67751504ba4e65fdec4fb5b1e0fb4ca368a8428"},{"text":"Coach Mae here! Ready to learn?","audioUrlHash":"c38a533cbb451e8aca013dc34ace6f8adc602441b2f9ed9ec55a30d7634bc4f2"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "it_IT",
    link: "https://text-and-audio.chess.com/prod/released/Mae_coach/it-IT/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale it-IT json {"currentCoach":{"id":"3779595e-d0a4-11ee-a188-05b5e2276152","name":"Mae","titledName":"Coach Mae","imageUrl":"https://assets-coaches.chess.com/image/coachmae.png","voiceId":"Mae_coach","country":{"id":78,"name":"Japan","nameLocalized":"Japan","code":"JP"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Mae","iconUrl":"https://assets-coaches.chess.com/image/coachmae-icon.png","taglines":[{"text":"Hey, I'm Mae! Choose me and let's start learning.","audioUrlHash":"1f37eb5ce41f900a3a771920313d70625477b43a33020674fc282bf301017b39"},{"text":"Hey, it's Coach Mae! I can help you improve your chess game.","audioUrlHash":"5ee315915acc75abef70ee00c3b621b2940136666bf10a5346fd98df4bc48897"},{"text":"Hi, I'm Coach Mae. I'd love to help you learn chess.","audioUrlHash":"725866514a2dc39fa59f4251c1d4650cb29d3ff57b1006270dbf46625e44354e"},{"text":"My name is Mae and I'd love to help you learn chess.","audioUrlHash":"2fdbe96f626b7be4ef7cf401e67751504ba4e65fdec4fb5b1e0fb4ca368a8428"},{"text":"Coach Mae here! Ready to learn?","audioUrlHash":"c38a533cbb451e8aca013dc34ace6f8adc602441b2f9ed9ec55a30d7634bc4f2"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "tr_TR",
    link: "https://text-and-audio.chess.com/prod/released/Mae_coach/tr-TR/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale tr-TR json {"currentCoach":{"id":"3779595e-d0a4-11ee-a188-05b5e2276152","name":"Mae","titledName":"Coach Mae","imageUrl":"https://assets-coaches.chess.com/image/coachmae.png","voiceId":"Mae_coach","country":{"id":78,"name":"Japan","nameLocalized":"Japan","code":"JP"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Mae","iconUrl":"https://assets-coaches.chess.com/image/coachmae-icon.png","taglines":[{"text":"Hey, I'm Mae! Choose me and let's start learning.","audioUrlHash":"1f37eb5ce41f900a3a771920313d70625477b43a33020674fc282bf301017b39"},{"text":"Hey, it's Coach Mae! I can help you improve your chess game.","audioUrlHash":"5ee315915acc75abef70ee00c3b621b2940136666bf10a5346fd98df4bc48897"},{"text":"Hi, I'm Coach Mae. I'd love to help you learn chess.","audioUrlHash":"725866514a2dc39fa59f4251c1d4650cb29d3ff57b1006270dbf46625e44354e"},{"text":"My name is Mae and I'd love to help you learn chess.","audioUrlHash":"2fdbe96f626b7be4ef7cf401e67751504ba4e65fdec4fb5b1e0fb4ca368a8428"},{"text":"Coach Mae here! Ready to learn?","audioUrlHash":"c38a533cbb451e8aca013dc34ace6f8adc602441b2f9ed9ec55a30d7634bc4f2"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "pl_PL",
    link: "https://text-and-audio.chess.com/prod/released/Mae_coach/pl-PL/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale pl-PL json {"currentCoach":{"id":"3779595e-d0a4-11ee-a188-05b5e2276152","name":"Mae","titledName":"Coach Mae","imageUrl":"https://assets-coaches.chess.com/image/coachmae.png","voiceId":"Mae_coach","country":{"id":78,"name":"Japan","nameLocalized":"Japan","code":"JP"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Mae","iconUrl":"https://assets-coaches.chess.com/image/coachmae-icon.png","taglines":[{"text":"Hey, I'm Mae! Choose me and let's start learning.","audioUrlHash":"1f37eb5ce41f900a3a771920313d70625477b43a33020674fc282bf301017b39"},{"text":"Hey, it's Coach Mae! I can help you improve your chess game.","audioUrlHash":"5ee315915acc75abef70ee00c3b621b2940136666bf10a5346fd98df4bc48897"},{"text":"Hi, I'm Coach Mae. I'd love to help you learn chess.","audioUrlHash":"725866514a2dc39fa59f4251c1d4650cb29d3ff57b1006270dbf46625e44354e"},{"text":"My name is Mae and I'd love to help you learn chess.","audioUrlHash":"2fdbe96f626b7be4ef7cf401e67751504ba4e65fdec4fb5b1e0fb4ca368a8428"},{"text":"Coach Mae here! Ready to learn?","audioUrlHash":"c38a533cbb451e8aca013dc34ace6f8adc602441b2f9ed9ec55a30d7634bc4f2"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "ko_KR",
    link: "https://text-and-audio.chess.com/prod/released/Mae_coach/ko-KR/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale ko-KR json {"currentCoach":{"id":"3779595e-d0a4-11ee-a188-05b5e2276152","name":"Mae","titledName":"Coach Mae","imageUrl":"https://assets-coaches.chess.com/image/coachmae.png","voiceId":"Mae_coach","country":{"id":78,"name":"Japan","nameLocalized":"Japan","code":"JP"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Mae","iconUrl":"https://assets-coaches.chess.com/image/coachmae-icon.png","taglines":[{"text":"Hey, I'm Mae! Choose me and let's start learning.","audioUrlHash":"1f37eb5ce41f900a3a771920313d70625477b43a33020674fc282bf301017b39"},{"text":"Hey, it's Coach Mae! I can help you improve your chess game.","audioUrlHash":"5ee315915acc75abef70ee00c3b621b2940136666bf10a5346fd98df4bc48897"},{"text":"Hi, I'm Coach Mae. I'd love to help you learn chess.","audioUrlHash":"725866514a2dc39fa59f4251c1d4650cb29d3ff57b1006270dbf46625e44354e"},{"text":"My name is Mae and I'd love to help you learn chess.","audioUrlHash":"2fdbe96f626b7be4ef7cf401e67751504ba4e65fdec4fb5b1e0fb4ca368a8428"},{"text":"Coach Mae here! Ready to learn?","audioUrlHash":"c38a533cbb451e8aca013dc34ace6f8adc602441b2f9ed9ec55a30d7634bc4f2"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "id_ID",
    link: "https://text-and-audio.chess.com/prod/released/Mae_coach/id-ID/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale id-ID json {"currentCoach":{"id":"3779595e-d0a4-11ee-a188-05b5e2276152","name":"Mae","titledName":"Coach Mae","imageUrl":"https://assets-coaches.chess.com/image/coachmae.png","voiceId":"Mae_coach","country":{"id":78,"name":"Japan","nameLocalized":"Japan","code":"JP"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Mae","iconUrl":"https://assets-coaches.chess.com/image/coachmae-icon.png","taglines":[{"text":"Hey, I'm Mae! Choose me and let's start learning.","audioUrlHash":"1f37eb5ce41f900a3a771920313d70625477b43a33020674fc282bf301017b39"},{"text":"Hey, it's Coach Mae! I can help you improve your chess game.","audioUrlHash":"5ee315915acc75abef70ee00c3b621b2940136666bf10a5346fd98df4bc48897"},{"text":"Hi, I'm Coach Mae. I'd love to help you learn chess.","audioUrlHash":"725866514a2dc39fa59f4251c1d4650cb29d3ff57b1006270dbf46625e44354e"},{"text":"My name is Mae and I'd love to help you learn chess.","audioUrlHash":"2fdbe96f626b7be4ef7cf401e67751504ba4e65fdec4fb5b1e0fb4ca368a8428"},{"text":"Coach Mae here! Ready to learn?","audioUrlHash":"c38a533cbb451e8aca013dc34ace6f8adc602441b2f9ed9ec55a30d7634bc4f2"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },

  {
    lang: "en_US",
    link: "https://text-and-audio.chess.com/prod/released/Dante_coach/en-US/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale en-US json {"currentCoach":{"id":"37791f20-d0a4-11ee-b634-89fef0259834","name":"Dante","titledName":"Coach Dante","imageUrl":"https://assets-coaches.chess.com/image/coachdante.png","voiceId":"Dante_coach","country":{"id":3,"name":"Canada","nameLocalized":"Canada","code":"CA"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Dante","iconUrl":"https://assets-coaches.chess.com/image/coachdante-icon.png","taglines":[{"text":"Hi, I'm Coach Dante. I want to help you learn chess!","audioUrlHash":"24384ec55eff42b3f8a6db7c059740fdd8f47121947efd4f8cfadf92167bd6e0"},{"text":"Hello, I'm Coach Dante! I can help you get better at chess.","audioUrlHash":"e21a3cbbc9a9b96d2ba5d5bf0f1fadd277932c260e6578709f7d52dc3a1032fa"},{"text":"I'm Dante! Let me coach you to chess success.","audioUrlHash":"4e1840dc184b8a23abe71839f3972e07020316f9cb2ec98c670d94072f329e1e"},{"text":"I'm Dante and it's my mission to teach you chess!","audioUrlHash":"354937996a4d8ca923d470f6157511c70ba7c92aa69847f402e077048e1f6193"},{"text":"Dante here! Pick me and we'll learn a lot together.","audioUrlHash":"51760dc161aca85d9b69cd6eb67aa5c771ce1edd643d85b2fa3835a56dfedf42"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "fr_FR",
    link: "https://text-and-audio.chess.com/prod/released/Dante_coach/fr-FR/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale fr-FR json {"currentCoach":{"id":"37791f20-d0a4-11ee-b634-89fef0259834","name":"Dante","titledName":"Coach Dante","imageUrl":"https://assets-coaches.chess.com/image/coachdante.png","voiceId":"Dante_coach","country":{"id":3,"name":"Canada","nameLocalized":"Canada","code":"CA"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Dante","iconUrl":"https://assets-coaches.chess.com/image/coachdante-icon.png","taglines":[{"text":"Hi, I'm Coach Dante. I want to help you learn chess!","audioUrlHash":"24384ec55eff42b3f8a6db7c059740fdd8f47121947efd4f8cfadf92167bd6e0"},{"text":"Hello, I'm Coach Dante! I can help you get better at chess.","audioUrlHash":"e21a3cbbc9a9b96d2ba5d5bf0f1fadd277932c260e6578709f7d52dc3a1032fa"},{"text":"I'm Dante! Let me coach you to chess success.","audioUrlHash":"4e1840dc184b8a23abe71839f3972e07020316f9cb2ec98c670d94072f329e1e"},{"text":"I'm Dante and it's my mission to teach you chess!","audioUrlHash":"354937996a4d8ca923d470f6157511c70ba7c92aa69847f402e077048e1f6193"},{"text":"Dante here! Pick me and we'll learn a lot together.","audioUrlHash":"51760dc161aca85d9b69cd6eb67aa5c771ce1edd643d85b2fa3835a56dfedf42"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "es_ES",
    link: "https://text-and-audio.chess.com/prod/released/Dante_coach/es-ES/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale es-ES json {"currentCoach":{"id":"37791f20-d0a4-11ee-b634-89fef0259834","name":"Dante","titledName":"Coach Dante","imageUrl":"https://assets-coaches.chess.com/image/coachdante.png","voiceId":"Dante_coach","country":{"id":3,"name":"Canada","nameLocalized":"Canada","code":"CA"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Dante","iconUrl":"https://assets-coaches.chess.com/image/coachdante-icon.png","taglines":[{"text":"Hi, I'm Coach Dante. I want to help you learn chess!","audioUrlHash":"24384ec55eff42b3f8a6db7c059740fdd8f47121947efd4f8cfadf92167bd6e0"},{"text":"Hello, I'm Coach Dante! I can help you get better at chess.","audioUrlHash":"e21a3cbbc9a9b96d2ba5d5bf0f1fadd277932c260e6578709f7d52dc3a1032fa"},{"text":"I'm Dante! Let me coach you to chess success.","audioUrlHash":"4e1840dc184b8a23abe71839f3972e07020316f9cb2ec98c670d94072f329e1e"},{"text":"I'm Dante and it's my mission to teach you chess!","audioUrlHash":"354937996a4d8ca923d470f6157511c70ba7c92aa69847f402e077048e1f6193"},{"text":"Dante here! Pick me and we'll learn a lot together.","audioUrlHash":"51760dc161aca85d9b69cd6eb67aa5c771ce1edd643d85b2fa3835a56dfedf42"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "ar_SA",
    link: "https://text-and-audio.chess.com/prod/released/Dante_coach/ar-SA/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale ar-SA json {"currentCoach":{"id":"37791f20-d0a4-11ee-b634-89fef0259834","name":"Dante","titledName":"Coach Dante","imageUrl":"https://assets-coaches.chess.com/image/coachdante.png","voiceId":"Dante_coach","country":{"id":3,"name":"Canada","nameLocalized":"Canada","code":"CA"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Dante","iconUrl":"https://assets-coaches.chess.com/image/coachdante-icon.png","taglines":[{"text":"Hi, I'm Coach Dante. I want to help you learn chess!","audioUrlHash":"24384ec55eff42b3f8a6db7c059740fdd8f47121947efd4f8cfadf92167bd6e0"},{"text":"Hello, I'm Coach Dante! I can help you get better at chess.","audioUrlHash":"e21a3cbbc9a9b96d2ba5d5bf0f1fadd277932c260e6578709f7d52dc3a1032fa"},{"text":"I'm Dante! Let me coach you to chess success.","audioUrlHash":"4e1840dc184b8a23abe71839f3972e07020316f9cb2ec98c670d94072f329e1e"},{"text":"I'm Dante and it's my mission to teach you chess!","audioUrlHash":"354937996a4d8ca923d470f6157511c70ba7c92aa69847f402e077048e1f6193"},{"text":"Dante here! Pick me and we'll learn a lot together.","audioUrlHash":"51760dc161aca85d9b69cd6eb67aa5c771ce1edd643d85b2fa3835a56dfedf42"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "ru_RU",
    link: "https://text-and-audio.chess.com/prod/released/Dante_coach/ru-RU/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale ru-RU json {"currentCoach":{"id":"37791f20-d0a4-11ee-b634-89fef0259834","name":"Dante","titledName":"Coach Dante","imageUrl":"https://assets-coaches.chess.com/image/coachdante.png","voiceId":"Dante_coach","country":{"id":3,"name":"Canada","nameLocalized":"Canada","code":"CA"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Dante","iconUrl":"https://assets-coaches.chess.com/image/coachdante-icon.png","taglines":[{"text":"Hi, I'm Coach Dante. I want to help you learn chess!","audioUrlHash":"24384ec55eff42b3f8a6db7c059740fdd8f47121947efd4f8cfadf92167bd6e0"},{"text":"Hello, I'm Coach Dante! I can help you get better at chess.","audioUrlHash":"e21a3cbbc9a9b96d2ba5d5bf0f1fadd277932c260e6578709f7d52dc3a1032fa"},{"text":"I'm Dante! Let me coach you to chess success.","audioUrlHash":"4e1840dc184b8a23abe71839f3972e07020316f9cb2ec98c670d94072f329e1e"},{"text":"I'm Dante and it's my mission to teach you chess!","audioUrlHash":"354937996a4d8ca923d470f6157511c70ba7c92aa69847f402e077048e1f6193"},{"text":"Dante here! Pick me and we'll learn a lot together.","audioUrlHash":"51760dc161aca85d9b69cd6eb67aa5c771ce1edd643d85b2fa3835a56dfedf42"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "pt_PT",
    link: "https://text-and-audio.chess.com/prod/released/Dante_coach/pt-PT/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale pt-PT json {"currentCoach":{"id":"37791f20-d0a4-11ee-b634-89fef0259834","name":"Dante","titledName":"Coach Dante","imageUrl":"https://assets-coaches.chess.com/image/coachdante.png","voiceId":"Dante_coach","country":{"id":3,"name":"Canada","nameLocalized":"Canada","code":"CA"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Dante","iconUrl":"https://assets-coaches.chess.com/image/coachdante-icon.png","taglines":[{"text":"Hi, I'm Coach Dante. I want to help you learn chess!","audioUrlHash":"24384ec55eff42b3f8a6db7c059740fdd8f47121947efd4f8cfadf92167bd6e0"},{"text":"Hello, I'm Coach Dante! I can help you get better at chess.","audioUrlHash":"e21a3cbbc9a9b96d2ba5d5bf0f1fadd277932c260e6578709f7d52dc3a1032fa"},{"text":"I'm Dante! Let me coach you to chess success.","audioUrlHash":"4e1840dc184b8a23abe71839f3972e07020316f9cb2ec98c670d94072f329e1e"},{"text":"I'm Dante and it's my mission to teach you chess!","audioUrlHash":"354937996a4d8ca923d470f6157511c70ba7c92aa69847f402e077048e1f6193"},{"text":"Dante here! Pick me and we'll learn a lot together.","audioUrlHash":"51760dc161aca85d9b69cd6eb67aa5c771ce1edd643d85b2fa3835a56dfedf42"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "de_DE",
    link: "https://text-and-audio.chess.com/prod/released/Dante_coach/de-DE/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale de-DE json {"currentCoach":{"id":"37791f20-d0a4-11ee-b634-89fef0259834","name":"Dante","titledName":"Coach Dante","imageUrl":"https://assets-coaches.chess.com/image/coachdante.png","voiceId":"Dante_coach","country":{"id":3,"name":"Canada","nameLocalized":"Canada","code":"CA"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Dante","iconUrl":"https://assets-coaches.chess.com/image/coachdante-icon.png","taglines":[{"text":"Hi, I'm Coach Dante. I want to help you learn chess!","audioUrlHash":"24384ec55eff42b3f8a6db7c059740fdd8f47121947efd4f8cfadf92167bd6e0"},{"text":"Hello, I'm Coach Dante! I can help you get better at chess.","audioUrlHash":"e21a3cbbc9a9b96d2ba5d5bf0f1fadd277932c260e6578709f7d52dc3a1032fa"},{"text":"I'm Dante! Let me coach you to chess success.","audioUrlHash":"4e1840dc184b8a23abe71839f3972e07020316f9cb2ec98c670d94072f329e1e"},{"text":"I'm Dante and it's my mission to teach you chess!","audioUrlHash":"354937996a4d8ca923d470f6157511c70ba7c92aa69847f402e077048e1f6193"},{"text":"Dante here! Pick me and we'll learn a lot together.","audioUrlHash":"51760dc161aca85d9b69cd6eb67aa5c771ce1edd643d85b2fa3835a56dfedf42"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "it_IT",
    link: "https://text-and-audio.chess.com/prod/released/Dante_coach/it-IT/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale it-IT json {"currentCoach":{"id":"37791f20-d0a4-11ee-b634-89fef0259834","name":"Dante","titledName":"Coach Dante","imageUrl":"https://assets-coaches.chess.com/image/coachdante.png","voiceId":"Dante_coach","country":{"id":3,"name":"Canada","nameLocalized":"Canada","code":"CA"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Dante","iconUrl":"https://assets-coaches.chess.com/image/coachdante-icon.png","taglines":[{"text":"Hi, I'm Coach Dante. I want to help you learn chess!","audioUrlHash":"24384ec55eff42b3f8a6db7c059740fdd8f47121947efd4f8cfadf92167bd6e0"},{"text":"Hello, I'm Coach Dante! I can help you get better at chess.","audioUrlHash":"e21a3cbbc9a9b96d2ba5d5bf0f1fadd277932c260e6578709f7d52dc3a1032fa"},{"text":"I'm Dante! Let me coach you to chess success.","audioUrlHash":"4e1840dc184b8a23abe71839f3972e07020316f9cb2ec98c670d94072f329e1e"},{"text":"I'm Dante and it's my mission to teach you chess!","audioUrlHash":"354937996a4d8ca923d470f6157511c70ba7c92aa69847f402e077048e1f6193"},{"text":"Dante here! Pick me and we'll learn a lot together.","audioUrlHash":"51760dc161aca85d9b69cd6eb67aa5c771ce1edd643d85b2fa3835a56dfedf42"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "tr_TR",
    link: "https://text-and-audio.chess.com/prod/released/Dante_coach/tr-TR/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale tr-TR json {"currentCoach":{"id":"37791f20-d0a4-11ee-b634-89fef0259834","name":"Dante","titledName":"Coach Dante","imageUrl":"https://assets-coaches.chess.com/image/coachdante.png","voiceId":"Dante_coach","country":{"id":3,"name":"Canada","nameLocalized":"Canada","code":"CA"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Dante","iconUrl":"https://assets-coaches.chess.com/image/coachdante-icon.png","taglines":[{"text":"Hi, I'm Coach Dante. I want to help you learn chess!","audioUrlHash":"24384ec55eff42b3f8a6db7c059740fdd8f47121947efd4f8cfadf92167bd6e0"},{"text":"Hello, I'm Coach Dante! I can help you get better at chess.","audioUrlHash":"e21a3cbbc9a9b96d2ba5d5bf0f1fadd277932c260e6578709f7d52dc3a1032fa"},{"text":"I'm Dante! Let me coach you to chess success.","audioUrlHash":"4e1840dc184b8a23abe71839f3972e07020316f9cb2ec98c670d94072f329e1e"},{"text":"I'm Dante and it's my mission to teach you chess!","audioUrlHash":"354937996a4d8ca923d470f6157511c70ba7c92aa69847f402e077048e1f6193"},{"text":"Dante here! Pick me and we'll learn a lot together.","audioUrlHash":"51760dc161aca85d9b69cd6eb67aa5c771ce1edd643d85b2fa3835a56dfedf42"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "pl_PL",
    link: "https://text-and-audio.chess.com/prod/released/Dante_coach/pl-PL/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale pl-PL json {"currentCoach":{"id":"37791f20-d0a4-11ee-b634-89fef0259834","name":"Dante","titledName":"Coach Dante","imageUrl":"https://assets-coaches.chess.com/image/coachdante.png","voiceId":"Dante_coach","country":{"id":3,"name":"Canada","nameLocalized":"Canada","code":"CA"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Dante","iconUrl":"https://assets-coaches.chess.com/image/coachdante-icon.png","taglines":[{"text":"Hi, I'm Coach Dante. I want to help you learn chess!","audioUrlHash":"24384ec55eff42b3f8a6db7c059740fdd8f47121947efd4f8cfadf92167bd6e0"},{"text":"Hello, I'm Coach Dante! I can help you get better at chess.","audioUrlHash":"e21a3cbbc9a9b96d2ba5d5bf0f1fadd277932c260e6578709f7d52dc3a1032fa"},{"text":"I'm Dante! Let me coach you to chess success.","audioUrlHash":"4e1840dc184b8a23abe71839f3972e07020316f9cb2ec98c670d94072f329e1e"},{"text":"I'm Dante and it's my mission to teach you chess!","audioUrlHash":"354937996a4d8ca923d470f6157511c70ba7c92aa69847f402e077048e1f6193"},{"text":"Dante here! Pick me and we'll learn a lot together.","audioUrlHash":"51760dc161aca85d9b69cd6eb67aa5c771ce1edd643d85b2fa3835a56dfedf42"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "ko_KR",
    link: "https://text-and-audio.chess.com/prod/released/Dante_coach/ko-KR/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale ko-KR json {"currentCoach":{"id":"37791f20-d0a4-11ee-b634-89fef0259834","name":"Dante","titledName":"Coach Dante","imageUrl":"https://assets-coaches.chess.com/image/coachdante.png","voiceId":"Dante_coach","country":{"id":3,"name":"Canada","nameLocalized":"Canada","code":"CA"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Dante","iconUrl":"https://assets-coaches.chess.com/image/coachdante-icon.png","taglines":[{"text":"Hi, I'm Coach Dante. I want to help you learn chess!","audioUrlHash":"24384ec55eff42b3f8a6db7c059740fdd8f47121947efd4f8cfadf92167bd6e0"},{"text":"Hello, I'm Coach Dante! I can help you get better at chess.","audioUrlHash":"e21a3cbbc9a9b96d2ba5d5bf0f1fadd277932c260e6578709f7d52dc3a1032fa"},{"text":"I'm Dante! Let me coach you to chess success.","audioUrlHash":"4e1840dc184b8a23abe71839f3972e07020316f9cb2ec98c670d94072f329e1e"},{"text":"I'm Dante and it's my mission to teach you chess!","audioUrlHash":"354937996a4d8ca923d470f6157511c70ba7c92aa69847f402e077048e1f6193"},{"text":"Dante here! Pick me and we'll learn a lot together.","audioUrlHash":"51760dc161aca85d9b69cd6eb67aa5c771ce1edd643d85b2fa3835a56dfedf42"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "id_ID",
    link: "https://text-and-audio.chess.com/prod/released/Dante_coach/id-ID/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale id-ID json {"currentCoach":{"id":"37791f20-d0a4-11ee-b634-89fef0259834","name":"Dante","titledName":"Coach Dante","imageUrl":"https://assets-coaches.chess.com/image/coachdante.png","voiceId":"Dante_coach","country":{"id":3,"name":"Canada","nameLocalized":"Canada","code":"CA"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Dante","iconUrl":"https://assets-coaches.chess.com/image/coachdante-icon.png","taglines":[{"text":"Hi, I'm Coach Dante. I want to help you learn chess!","audioUrlHash":"24384ec55eff42b3f8a6db7c059740fdd8f47121947efd4f8cfadf92167bd6e0"},{"text":"Hello, I'm Coach Dante! I can help you get better at chess.","audioUrlHash":"e21a3cbbc9a9b96d2ba5d5bf0f1fadd277932c260e6578709f7d52dc3a1032fa"},{"text":"I'm Dante! Let me coach you to chess success.","audioUrlHash":"4e1840dc184b8a23abe71839f3972e07020316f9cb2ec98c670d94072f329e1e"},{"text":"I'm Dante and it's my mission to teach you chess!","audioUrlHash":"354937996a4d8ca923d470f6157511c70ba7c92aa69847f402e077048e1f6193"},{"text":"Dante here! Pick me and we'll learn a lot together.","audioUrlHash":"51760dc161aca85d9b69cd6eb67aa5c771ce1edd643d85b2fa3835a56dfedf42"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },

  {
    lang: "en_US",
    link: "https://text-and-audio.chess.com/prod/released/Nadia_coach/en-US/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale en-US json {"currentCoach":{"id":"3778e546-d0a4-11ee-803d-937400864b17","name":"Nadia","titledName":"Coach Nadia","imageUrl":"https://assets-coaches.chess.com/image/coachnadia.png","voiceId":"Nadia_coach","country":{"id":138,"name":"Türkiye","nameLocalized":"Turkey","code":"TR"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Nadia","iconUrl":"https://assets-coaches.chess.com/image/coachnadia-icon.png","taglines":[{"text":"Hey, I'm Coach Nadia! I can help you improve at chess.","audioUrlHash":"383d01808be1075cca567646909c86bbcc7ef3cd6501f30024923cfabb9c0fe2"},{"text":"Coach Nadia here! I could be a good coach for you.","audioUrlHash":"6e3461aa795acde235c3cf7af4d2319b204c2b2682ae5ae41a06820acfda8cbd"},{"text":"Hello, I'm Coach Nadia. If you choose me, I will make you a better chess player.","audioUrlHash":"24b356e078a25b5515db86bbc7bf3963e55da777f621318b7635831455e3ff1e"},{"text":"Hi, I'm Coach Nadia! I'd love to coach you.","audioUrlHash":"22c4dcf8c428eebe3d45da8a996020b790df7f7e9a119c84c75eb1e5bccb3fde"},{"text":"Coach Nadia here! Pick me and let's get started.","audioUrlHash":"6d3b25278347165c5535341a789ccb5e58408eec902aad2a4f357b55fe678eef"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "fr_FR",
    link: "https://text-and-audio.chess.com/prod/released/Nadia_coach/fr-FR/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale fr-FR json {"currentCoach":{"id":"3778e546-d0a4-11ee-803d-937400864b17","name":"Nadia","titledName":"Coach Nadia","imageUrl":"https://assets-coaches.chess.com/image/coachnadia.png","voiceId":"Nadia_coach","country":{"id":138,"name":"Türkiye","nameLocalized":"Turkey","code":"TR"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Nadia","iconUrl":"https://assets-coaches.chess.com/image/coachnadia-icon.png","taglines":[{"text":"Hey, I'm Coach Nadia! I can help you improve at chess.","audioUrlHash":"383d01808be1075cca567646909c86bbcc7ef3cd6501f30024923cfabb9c0fe2"},{"text":"Coach Nadia here! I could be a good coach for you.","audioUrlHash":"6e3461aa795acde235c3cf7af4d2319b204c2b2682ae5ae41a06820acfda8cbd"},{"text":"Hello, I'm Coach Nadia. If you choose me, I will make you a better chess player.","audioUrlHash":"24b356e078a25b5515db86bbc7bf3963e55da777f621318b7635831455e3ff1e"},{"text":"Hi, I'm Coach Nadia! I'd love to coach you.","audioUrlHash":"22c4dcf8c428eebe3d45da8a996020b790df7f7e9a119c84c75eb1e5bccb3fde"},{"text":"Coach Nadia here! Pick me and let's get started.","audioUrlHash":"6d3b25278347165c5535341a789ccb5e58408eec902aad2a4f357b55fe678eef"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "es_ES",
    link: "https://text-and-audio.chess.com/prod/released/Nadia_coach/es-ES/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale es-ES json {"currentCoach":{"id":"3778e546-d0a4-11ee-803d-937400864b17","name":"Nadia","titledName":"Coach Nadia","imageUrl":"https://assets-coaches.chess.com/image/coachnadia.png","voiceId":"Nadia_coach","country":{"id":138,"name":"Türkiye","nameLocalized":"Turkey","code":"TR"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Nadia","iconUrl":"https://assets-coaches.chess.com/image/coachnadia-icon.png","taglines":[{"text":"Hey, I'm Coach Nadia! I can help you improve at chess.","audioUrlHash":"383d01808be1075cca567646909c86bbcc7ef3cd6501f30024923cfabb9c0fe2"},{"text":"Coach Nadia here! I could be a good coach for you.","audioUrlHash":"6e3461aa795acde235c3cf7af4d2319b204c2b2682ae5ae41a06820acfda8cbd"},{"text":"Hello, I'm Coach Nadia. If you choose me, I will make you a better chess player.","audioUrlHash":"24b356e078a25b5515db86bbc7bf3963e55da777f621318b7635831455e3ff1e"},{"text":"Hi, I'm Coach Nadia! I'd love to coach you.","audioUrlHash":"22c4dcf8c428eebe3d45da8a996020b790df7f7e9a119c84c75eb1e5bccb3fde"},{"text":"Coach Nadia here! Pick me and let's get started.","audioUrlHash":"6d3b25278347165c5535341a789ccb5e58408eec902aad2a4f357b55fe678eef"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "ar_SA",
    link: "https://text-and-audio.chess.com/prod/released/Nadia_coach/ar-SA/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale ar-SA json {"currentCoach":{"id":"3778e546-d0a4-11ee-803d-937400864b17","name":"Nadia","titledName":"Coach Nadia","imageUrl":"https://assets-coaches.chess.com/image/coachnadia.png","voiceId":"Nadia_coach","country":{"id":138,"name":"Türkiye","nameLocalized":"Turkey","code":"TR"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Nadia","iconUrl":"https://assets-coaches.chess.com/image/coachnadia-icon.png","taglines":[{"text":"Hey, I'm Coach Nadia! I can help you improve at chess.","audioUrlHash":"383d01808be1075cca567646909c86bbcc7ef3cd6501f30024923cfabb9c0fe2"},{"text":"Coach Nadia here! I could be a good coach for you.","audioUrlHash":"6e3461aa795acde235c3cf7af4d2319b204c2b2682ae5ae41a06820acfda8cbd"},{"text":"Hello, I'm Coach Nadia. If you choose me, I will make you a better chess player.","audioUrlHash":"24b356e078a25b5515db86bbc7bf3963e55da777f621318b7635831455e3ff1e"},{"text":"Hi, I'm Coach Nadia! I'd love to coach you.","audioUrlHash":"22c4dcf8c428eebe3d45da8a996020b790df7f7e9a119c84c75eb1e5bccb3fde"},{"text":"Coach Nadia here! Pick me and let's get started.","audioUrlHash":"6d3b25278347165c5535341a789ccb5e58408eec902aad2a4f357b55fe678eef"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "ru_RU",
    link: "https://text-and-audio.chess.com/prod/released/Nadia_coach/ru-RU/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale ru-RU json {"currentCoach":{"id":"3778e546-d0a4-11ee-803d-937400864b17","name":"Nadia","titledName":"Coach Nadia","imageUrl":"https://assets-coaches.chess.com/image/coachnadia.png","voiceId":"Nadia_coach","country":{"id":138,"name":"Türkiye","nameLocalized":"Turkey","code":"TR"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Nadia","iconUrl":"https://assets-coaches.chess.com/image/coachnadia-icon.png","taglines":[{"text":"Hey, I'm Coach Nadia! I can help you improve at chess.","audioUrlHash":"383d01808be1075cca567646909c86bbcc7ef3cd6501f30024923cfabb9c0fe2"},{"text":"Coach Nadia here! I could be a good coach for you.","audioUrlHash":"6e3461aa795acde235c3cf7af4d2319b204c2b2682ae5ae41a06820acfda8cbd"},{"text":"Hello, I'm Coach Nadia. If you choose me, I will make you a better chess player.","audioUrlHash":"24b356e078a25b5515db86bbc7bf3963e55da777f621318b7635831455e3ff1e"},{"text":"Hi, I'm Coach Nadia! I'd love to coach you.","audioUrlHash":"22c4dcf8c428eebe3d45da8a996020b790df7f7e9a119c84c75eb1e5bccb3fde"},{"text":"Coach Nadia here! Pick me and let's get started.","audioUrlHash":"6d3b25278347165c5535341a789ccb5e58408eec902aad2a4f357b55fe678eef"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "pt_PT",
    link: "https://text-and-audio.chess.com/prod/released/Nadia_coach/pt-PT/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale pt-PT json {"currentCoach":{"id":"3778e546-d0a4-11ee-803d-937400864b17","name":"Nadia","titledName":"Coach Nadia","imageUrl":"https://assets-coaches.chess.com/image/coachnadia.png","voiceId":"Nadia_coach","country":{"id":138,"name":"Türkiye","nameLocalized":"Turkey","code":"TR"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Nadia","iconUrl":"https://assets-coaches.chess.com/image/coachnadia-icon.png","taglines":[{"text":"Hey, I'm Coach Nadia! I can help you improve at chess.","audioUrlHash":"383d01808be1075cca567646909c86bbcc7ef3cd6501f30024923cfabb9c0fe2"},{"text":"Coach Nadia here! I could be a good coach for you.","audioUrlHash":"6e3461aa795acde235c3cf7af4d2319b204c2b2682ae5ae41a06820acfda8cbd"},{"text":"Hello, I'm Coach Nadia. If you choose me, I will make you a better chess player.","audioUrlHash":"24b356e078a25b5515db86bbc7bf3963e55da777f621318b7635831455e3ff1e"},{"text":"Hi, I'm Coach Nadia! I'd love to coach you.","audioUrlHash":"22c4dcf8c428eebe3d45da8a996020b790df7f7e9a119c84c75eb1e5bccb3fde"},{"text":"Coach Nadia here! Pick me and let's get started.","audioUrlHash":"6d3b25278347165c5535341a789ccb5e58408eec902aad2a4f357b55fe678eef"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "de_DE",
    link: "https://text-and-audio.chess.com/prod/released/Nadia_coach/de-DE/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale de-DE json {"currentCoach":{"id":"3778e546-d0a4-11ee-803d-937400864b17","name":"Nadia","titledName":"Coach Nadia","imageUrl":"https://assets-coaches.chess.com/image/coachnadia.png","voiceId":"Nadia_coach","country":{"id":138,"name":"Türkiye","nameLocalized":"Turkey","code":"TR"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Nadia","iconUrl":"https://assets-coaches.chess.com/image/coachnadia-icon.png","taglines":[{"text":"Hey, I'm Coach Nadia! I can help you improve at chess.","audioUrlHash":"383d01808be1075cca567646909c86bbcc7ef3cd6501f30024923cfabb9c0fe2"},{"text":"Coach Nadia here! I could be a good coach for you.","audioUrlHash":"6e3461aa795acde235c3cf7af4d2319b204c2b2682ae5ae41a06820acfda8cbd"},{"text":"Hello, I'm Coach Nadia. If you choose me, I will make you a better chess player.","audioUrlHash":"24b356e078a25b5515db86bbc7bf3963e55da777f621318b7635831455e3ff1e"},{"text":"Hi, I'm Coach Nadia! I'd love to coach you.","audioUrlHash":"22c4dcf8c428eebe3d45da8a996020b790df7f7e9a119c84c75eb1e5bccb3fde"},{"text":"Coach Nadia here! Pick me and let's get started.","audioUrlHash":"6d3b25278347165c5535341a789ccb5e58408eec902aad2a4f357b55fe678eef"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "it_IT",
    link: "https://text-and-audio.chess.com/prod/released/Nadia_coach/it-IT/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale it-IT json {"currentCoach":{"id":"3778e546-d0a4-11ee-803d-937400864b17","name":"Nadia","titledName":"Coach Nadia","imageUrl":"https://assets-coaches.chess.com/image/coachnadia.png","voiceId":"Nadia_coach","country":{"id":138,"name":"Türkiye","nameLocalized":"Turkey","code":"TR"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Nadia","iconUrl":"https://assets-coaches.chess.com/image/coachnadia-icon.png","taglines":[{"text":"Hey, I'm Coach Nadia! I can help you improve at chess.","audioUrlHash":"383d01808be1075cca567646909c86bbcc7ef3cd6501f30024923cfabb9c0fe2"},{"text":"Coach Nadia here! I could be a good coach for you.","audioUrlHash":"6e3461aa795acde235c3cf7af4d2319b204c2b2682ae5ae41a06820acfda8cbd"},{"text":"Hello, I'm Coach Nadia. If you choose me, I will make you a better chess player.","audioUrlHash":"24b356e078a25b5515db86bbc7bf3963e55da777f621318b7635831455e3ff1e"},{"text":"Hi, I'm Coach Nadia! I'd love to coach you.","audioUrlHash":"22c4dcf8c428eebe3d45da8a996020b790df7f7e9a119c84c75eb1e5bccb3fde"},{"text":"Coach Nadia here! Pick me and let's get started.","audioUrlHash":"6d3b25278347165c5535341a789ccb5e58408eec902aad2a4f357b55fe678eef"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "tr_TR",
    link: "https://text-and-audio.chess.com/prod/released/Nadia_coach/tr-TR/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale tr-TR json {"currentCoach":{"id":"3778e546-d0a4-11ee-803d-937400864b17","name":"Nadia","titledName":"Coach Nadia","imageUrl":"https://assets-coaches.chess.com/image/coachnadia.png","voiceId":"Nadia_coach","country":{"id":138,"name":"Türkiye","nameLocalized":"Turkey","code":"TR"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Nadia","iconUrl":"https://assets-coaches.chess.com/image/coachnadia-icon.png","taglines":[{"text":"Hey, I'm Coach Nadia! I can help you improve at chess.","audioUrlHash":"383d01808be1075cca567646909c86bbcc7ef3cd6501f30024923cfabb9c0fe2"},{"text":"Coach Nadia here! I could be a good coach for you.","audioUrlHash":"6e3461aa795acde235c3cf7af4d2319b204c2b2682ae5ae41a06820acfda8cbd"},{"text":"Hello, I'm Coach Nadia. If you choose me, I will make you a better chess player.","audioUrlHash":"24b356e078a25b5515db86bbc7bf3963e55da777f621318b7635831455e3ff1e"},{"text":"Hi, I'm Coach Nadia! I'd love to coach you.","audioUrlHash":"22c4dcf8c428eebe3d45da8a996020b790df7f7e9a119c84c75eb1e5bccb3fde"},{"text":"Coach Nadia here! Pick me and let's get started.","audioUrlHash":"6d3b25278347165c5535341a789ccb5e58408eec902aad2a4f357b55fe678eef"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "pl_PL",
    link: "https://text-and-audio.chess.com/prod/released/Nadia_coach/pl-PL/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale pl-PL json {"currentCoach":{"id":"3778e546-d0a4-11ee-803d-937400864b17","name":"Nadia","titledName":"Coach Nadia","imageUrl":"https://assets-coaches.chess.com/image/coachnadia.png","voiceId":"Nadia_coach","country":{"id":138,"name":"Türkiye","nameLocalized":"Turkey","code":"TR"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Nadia","iconUrl":"https://assets-coaches.chess.com/image/coachnadia-icon.png","taglines":[{"text":"Hey, I'm Coach Nadia! I can help you improve at chess.","audioUrlHash":"383d01808be1075cca567646909c86bbcc7ef3cd6501f30024923cfabb9c0fe2"},{"text":"Coach Nadia here! I could be a good coach for you.","audioUrlHash":"6e3461aa795acde235c3cf7af4d2319b204c2b2682ae5ae41a06820acfda8cbd"},{"text":"Hello, I'm Coach Nadia. If you choose me, I will make you a better chess player.","audioUrlHash":"24b356e078a25b5515db86bbc7bf3963e55da777f621318b7635831455e3ff1e"},{"text":"Hi, I'm Coach Nadia! I'd love to coach you.","audioUrlHash":"22c4dcf8c428eebe3d45da8a996020b790df7f7e9a119c84c75eb1e5bccb3fde"},{"text":"Coach Nadia here! Pick me and let's get started.","audioUrlHash":"6d3b25278347165c5535341a789ccb5e58408eec902aad2a4f357b55fe678eef"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "ko_KR",
    link: "https://text-and-audio.chess.com/prod/released/Nadia_coach/ko-KR/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale ko-KR json {"currentCoach":{"id":"3778e546-d0a4-11ee-803d-937400864b17","name":"Nadia","titledName":"Coach Nadia","imageUrl":"https://assets-coaches.chess.com/image/coachnadia.png","voiceId":"Nadia_coach","country":{"id":138,"name":"Türkiye","nameLocalized":"Turkey","code":"TR"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Nadia","iconUrl":"https://assets-coaches.chess.com/image/coachnadia-icon.png","taglines":[{"text":"Hey, I'm Coach Nadia! I can help you improve at chess.","audioUrlHash":"383d01808be1075cca567646909c86bbcc7ef3cd6501f30024923cfabb9c0fe2"},{"text":"Coach Nadia here! I could be a good coach for you.","audioUrlHash":"6e3461aa795acde235c3cf7af4d2319b204c2b2682ae5ae41a06820acfda8cbd"},{"text":"Hello, I'm Coach Nadia. If you choose me, I will make you a better chess player.","audioUrlHash":"24b356e078a25b5515db86bbc7bf3963e55da777f621318b7635831455e3ff1e"},{"text":"Hi, I'm Coach Nadia! I'd love to coach you.","audioUrlHash":"22c4dcf8c428eebe3d45da8a996020b790df7f7e9a119c84c75eb1e5bccb3fde"},{"text":"Coach Nadia here! Pick me and let's get started.","audioUrlHash":"6d3b25278347165c5535341a789ccb5e58408eec902aad2a4f357b55fe678eef"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "id_ID",
    link: "https://text-and-audio.chess.com/prod/released/Nadia_coach/id-ID/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale id-ID json {"currentCoach":{"id":"3778e546-d0a4-11ee-803d-937400864b17","name":"Nadia","titledName":"Coach Nadia","imageUrl":"https://assets-coaches.chess.com/image/coachnadia.png","voiceId":"Nadia_coach","country":{"id":138,"name":"Türkiye","nameLocalized":"Turkey","code":"TR"},"locale":"en-US","textId":"Generic_coach","analyticsId":"Nadia","iconUrl":"https://assets-coaches.chess.com/image/coachnadia-icon.png","taglines":[{"text":"Hey, I'm Coach Nadia! I can help you improve at chess.","audioUrlHash":"383d01808be1075cca567646909c86bbcc7ef3cd6501f30024923cfabb9c0fe2"},{"text":"Coach Nadia here! I could be a good coach for you.","audioUrlHash":"6e3461aa795acde235c3cf7af4d2319b204c2b2682ae5ae41a06820acfda8cbd"},{"text":"Hello, I'm Coach Nadia. If you choose me, I will make you a better chess player.","audioUrlHash":"24b356e078a25b5515db86bbc7bf3963e55da777f621318b7635831455e3ff1e"},{"text":"Hi, I'm Coach Nadia! I'd love to coach you.","audioUrlHash":"22c4dcf8c428eebe3d45da8a996020b790df7f7e9a119c84c75eb1e5bccb3fde"},{"text":"Coach Nadia here! Pick me and let's get started.","audioUrlHash":"6d3b25278347165c5535341a789ccb5e58408eec902aad2a4f357b55fe678eef"}],"i18nMeta":{"languageIndicator":""},"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },

  {
    lang: "en_US",
    link: "https://text-and-audio.chess.com/prod/released/Levy_coach/en-US/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale en-US json {"currentCoach":{"id":"6ddf1ca2-ff6c-11ef-baea-5dc78a000edb","name":"Levy","titledName":"Coach Levy","imageUrl":"https://assets-coaches.chess.com/image/coachlevy.png","voiceId":"Levy_coach","country":{"id":2,"name":"United States","nameLocalized":"United States","code":"US"},"locale":"en-US","textId":"Levy_coach","analyticsId":"Levy","iconUrl":"https://assets-coaches.chess.com/image/coachlevy-icon.png","taglines":[{"text":"GothamChess here! I'm the internet's chess teacher, who else could you possibly pick?","audioUrlHash":"b36a35b100e1ad842020b45f1bbcac3421b83588423e578ad1e2ffa245d259dd"},{"text":"Choose me as your coach and I'll make you a better chess player!","audioUrlHash":"f0ee85ebd9cded2c4c233a4b33d0f40261987f035a4d9820f9b36a66a27e95a8"},{"text":"I'm just a chill guy who can improve your chess game. Pick me!","audioUrlHash":"14cd9bf73b06b4a5d46d703de37a0adcda2c93ff3f2e83cd9e0cd0bee7e3ca1b"},{"text":"Levy Rozman reporting for duty. I'm the best possible choice here, no clickbait.","audioUrlHash":"364aa165570aa0cbe4be362d0dea2c5aeb5611d0453679186f733899d36ba5d7"}],"i18nMeta":{"languageIndicator":""},"isCelebrity":true,"riveAnimationUrl":"https://assets-coaches.chess.com/image/coach_levy.riv?v=d59fa19b","greetingRiveAnimationUrl":"https://assets-coaches.chess.com/image/coach_levy_greeting.riv?v=1f1f8d0a"}}`,
  },
  {
    lang: "en_US",
    link: "https://text-and-audio.chess.com/prod/released/Magnus_coach/en-US/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale en-US json {"currentCoach":{"id":"d628d4bc-a0f1-11ef-9a6c-59c0254292e3","name":"Magnus","titledName":"Coach Magnus","imageUrl":"https://assets-coaches.chess.com/image/coachmagnus.png","voiceId":"Magnus_coach","country":{"id":104,"name":"Norway","nameLocalized":"Norway","code":"NO"},"locale":"en-US","textId":"Magnus_coach","analyticsId":"Magnus","iconUrl":"https://assets-coaches.chess.com/image/coachmagnus-icon.png","taglines":[{"text":"Want to be coached by the highest rated chess player in history? Pick me.","audioUrlHash":"41993d324d439ec0bd16d2dd8f5ca671e8cada7eb3e41c5a77724886d7b5a943"},{"text":"I was the World Champion for ten years, I'm the perfect chess coach for you.","audioUrlHash":"f3bd2678e8c8e0dec28b4ff6555d73a0652c3018e654d5ff1a5a8f2dfe462d2e"},{"text":"I mean, come on... you're going to choose me, right?","audioUrlHash":"182b4ad628d4f50d963aa9b1b819527ce1f4efa0e66b1d0b90fe4f78524462eb"},{"text":"Now's your chance to tell people Magnus Carlsen is your chess coach.","audioUrlHash":"3800c857c7898c2a98cb73c2bc5847fe828a0124b8472c6a571fccc79cb11a1f"}],"i18nMeta":{"languageIndicator":""},"isCelebrity":true,"riveAnimationUrl":"https://assets-coaches.chess.com/image/coach_magnus.riv?v=6ecb8f78","greetingRiveAnimationUrl":"https://assets-coaches.chess.com/image/coach_magnus_greeting.riv?v=37904087"}}`,
  },
  {
    lang: "en_US",
    link: "https://text-and-audio.chess.com/prod/released/Hikaru_coach/en-US/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale en-US json {"currentCoach":{"id":"d629aff4-a0f1-11ef-aaf7-8b2bcff97341","name":"Hikaru","titledName":"Coach Hikaru","imageUrl":"https://assets-coaches.chess.com/image/coachhikaru.png","voiceId":"Hikaru_coach","country":{"id":2,"name":"United States","nameLocalized":"United States","code":"US"},"locale":"en-US","textId":"Hikaru_coach","analyticsId":"Hikaru","iconUrl":"https://assets-coaches.chess.com/image/coachhikaru-icon.png","taglines":[{"text":"Hi, I'm 5-time US Champion Hikaru Nakamura. Ready to learn some chess?","audioUrlHash":"ecab2b84127ec2110ff56f43366c53f5b926bcbc7d201c0e1eba5a32563b0bf2"},{"text":"I'm the right choice, I'm one of the most famous chess players in the world.","audioUrlHash":"851f369ff7f5f09c7ac5768cc71db160ecf6ca8609d6dc7edb12dfd2c35d47f1"},{"text":"I've been doing this for years, let me coach you.","audioUrlHash":"ef9bb4a92f1ab15a5c39dabcd410dcf61346358c5bb03b0dc90948145f2bb8f5"},{"text":"Look, I can't promise to make you a grandmaster, but I can teach you some things.","audioUrlHash":"27fdbb94d46f270f9362b84b0674e10f72bb1e69c4a53ba15ec8b1ab03defd52"}],"i18nMeta":{"languageIndicator":""},"isCelebrity":true,"riveAnimationUrl":"https://assets-coaches.chess.com/image/coach_hikaru.riv?v=b823ad20","greetingRiveAnimationUrl":"https://assets-coaches.chess.com/image/coach_hikaru_greeting.riv?v=fe66e46d"}}`,
  },
  {
    lang: "en_US",
    link: "https://text-and-audio.chess.com/prod/released/Anna_coach/en-US/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale en-US json {"currentCoach":{"id":"4fdf1a48-7917-11f0-83ed-d56e6dd5307c","name":"Anna","titledName":"Coach Anna","imageUrl":"https://assets-coaches.chess.com/image/coachanna.png","voiceId":"Anna_coach","country":{"id":132,"name":"Sweden","nameLocalized":"Sweden","code":"SE"},"locale":"en-US","textId":"Anna_coach","analyticsId":"Anna","iconUrl":"https://assets-coaches.chess.com/image/coachanna-icon.png","taglines":[{"text":"Hello from Sweden! Want to learn from one of the most popular chess YouTubers?","audioUrlHash":"37eb03999bac8f1688f4fd407acbbf74dc31d025b0a2e120ee76867064e11d1a"},{"text":"I'm Anna, and I'm here to make learning fun and easy.","audioUrlHash":"0178691a89ba37649fe2a13b0883b3a6d65fc6217fbe48acb4807db0558ba3d6"},{"text":"Let's have some fun learning chess together. What do you say?","audioUrlHash":"6f6898a63e6c7376a8d583687d6aa8a4c1dc7942f880c9bbdcf09bdbe7211d09"},{"text":"I love chess! Let me teach you how to play the best game in the world.","audioUrlHash":"0afcf003a459ce263ec41acc868eba1a19786581ec5fb03bad07fc66e2840880"}],"i18nMeta":{"languageIndicator":""},"isCelebrity":true,"riveAnimationUrl":"https://assets-coaches.chess.com/image/coach_anna.riv?v=13b5b6ea","greetingRiveAnimationUrl":"https://assets-coaches.chess.com/image/coach_anna_greeting.riv?v=e055e90e"}}`,
  },
  {
    lang: "en_US",
    link: "https://text-and-audio.chess.com/prod/released/Canty_coach/en-US/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale en-US json {"currentCoach":{"id":"d62b98a0-a0f1-11ef-bf0b-b5dcb6c5161b","name":"Canty","titledName":"Coach Canty","imageUrl":"https://assets-coaches.chess.com/image/coachcanty.png","voiceId":"Canty_coach","country":{"id":2,"name":"United States","nameLocalized":"United States","code":"US"},"locale":"en-US","textId":"Canty_coach","analyticsId":"Canty","iconUrl":"https://assets-coaches.chess.com/image/coachcanty-icon.png","taglines":[{"text":"Want to spar with a chessboxing world champ? I'm your man.","audioUrlHash":"7f8c5e1531f95ff5222d02b21976659615f8fc8abd6c223483865572efb3e6f5"},{"text":"I'm a titled chess player, popular streamer, and your next chess coach.","audioUrlHash":"61844de18c921a7c198bed711030fd991216117cc91a7db83bc987625ed5c8a2"},{"text":"BOOM! I got you with all the tips and tricks if you pick me as your coach.","audioUrlHash":"59a408724ab3d6732020bd5defeb94ab9005ef76d0bd0786fe04a17df7b3e8fe"},{"text":"If you pick me as your coach I'll teach you all the tactinos and gambinos that make a great player.","audioUrlHash":"a8d7874d422ebb0492130a3718536111ec2aee2ff61efc53cc7cc8e9c412ae66"}],"i18nMeta":{"languageIndicator":""},"isCelebrity":true,"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "en_US",
    link: "https://text-and-audio.chess.com/prod/released/Anand_coach/en-US/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale en-US json {"currentCoach":{"id":"d62b1920-a0f1-11ef-ba68-b103c62ed2bc","name":"Vishy","titledName":"Coach Vishy","imageUrl":"https://assets-coaches.chess.com/image/coachvishy.png","voiceId":"Anand_coach","country":{"id":69,"name":"India","nameLocalized":"India","code":"IN"},"locale":"en-US","textId":"Anand_coach","analyticsId":"Vishy","iconUrl":"https://assets-coaches.chess.com/image/coachvishy-icon.png","taglines":[{"text":"I am Vishy Anand, the 5-time World Champion. Nice to meet you.","audioUrlHash":"d2689d438642593a08f47fd4835d930f6df87bcd57e0ad3415ceeb239dd48ec1"},{"text":"Pick me to take your game to the next level.","audioUrlHash":"e26c17c481882a068753bff37b7a5d4dde7854350e550aa9a3ac8bcf89be3afe"},{"text":"Let me help you get better at this lovely game! Take it from a World Champion.","audioUrlHash":"cf32d8ee814e63f65740039ca2d010e679865687b2667649b135f3f518cfedbc"},{"text":"Vishy Anand, naam to suna hi hoga.","audioUrlHash":"568bc7ee87aab52a130827498d9fe70e7be009329169ac62ff3dc621cbf752ea"}],"i18nMeta":{"languageIndicator":""},"isCelebrity":true,"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "en_US",
    link: "https://text-and-audio.chess.com/prod/released/Tania_coach/en-US/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale en-US json {"currentCoach":{"id":"d62aa12a-a0f1-11ef-8c86-0b794ad057db","name":"Tania","titledName":"Coach Tania","imageUrl":"https://assets-coaches.chess.com/image/coachtania.png","voiceId":"Tania_coach","country":{"id":69,"name":"India","nameLocalized":"India","code":"IN"},"locale":"en-US","textId":"Tania_coach","analyticsId":"Tania","iconUrl":"https://assets-coaches.chess.com/image/coachtania-icon.png","taglines":[{"text":"I've commentated on the best in the world. Now I'm here to help you play like them!","audioUrlHash":"91581b8ddbb50042a22d52e8702d8f3c9060c545fd20b413069c631f3114c63c"},{"text":"Want to learn chess from an Olympiad gold medalist? Pick me.","audioUrlHash":"92388d370eeec75aef641267e8ecc78499c4749b233dd7b52c2824b468407b21"},{"text":"Coach Tania here! I can help you become a better chess player!","audioUrlHash":"381a903056cac3a440df8780ca6ec4e726a5b591a8e90d42d7f37ad0eaefcc8f"},{"text":"It's Tania. You're going to want to be my student. Trust me!","audioUrlHash":"57cdbda82e9abe2fd695621285d67c9a7b7ab76083663f0d449c55cbd3aa4c54"}],"i18nMeta":{"languageIndicator":""},"isCelebrity":true,"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "en_US",
    link: "https://text-and-audio.chess.com/prod/released/Danny_coach/en-US/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale en-US json {"currentCoach":{"id":"6dd9d7b0-ff6c-11ef-9341-ff6621b6b8b5","name":"Danny","titledName":"Coach Danny","imageUrl":"https://assets-coaches.chess.com/image/coachdanny.png","voiceId":"Danny_coach","country":{"id":2,"name":"United States","nameLocalized":"United States","code":"US"},"locale":"en-US","textId":"Danny_coach","analyticsId":"Danny","iconUrl":"https://assets-coaches.chess.com/image/coachdanny-icon.png","taglines":[{"text":"Want to learn from Chess.com's Chief Chess Officer?","audioUrlHash":"331029009912d371cbaee9aad487a2402e3cc9ea6e08135946c66a489ad35a84"},{"text":"Have no fear, Coach Danny is here! I'll teach you everything you need to know.","audioUrlHash":"dabbc9e92028d617bce30a421c8fd8a14742794ac98d255a9632e37c58829016"},{"text":"Nice job finding my avatar, now click the big green button. You're so close. You can do this.","audioUrlHash":"7cfa01dff35858df653ae1dcc00a0cf6916affeda8eb6b7d111cfd83483c53e9"},{"text":"Improve your game with tips from me, a world-class chess commentator.","audioUrlHash":"e1f1f1e5bf7c885c922f5af5c883e33510ae4d18951c7c06b68491b27a38c7f9"}],"i18nMeta":{"languageIndicator":""},"isCelebrity":true,"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
  {
    lang: "en_US",
    link: "https://text-and-audio.chess.com/prod/released/Botez_coach/en-US/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale en-US json {"currentCoach":{"id":"d62a2aba-a0f1-11ef-a2f0-9118eb9f958d","name":"Botez","titledName":"Coach Botez","imageUrl":"https://assets-coaches.chess.com/image/coachbotezsisters.png","voiceId":"Botez_coach","country":{"id":2,"name":"United States","nameLocalized":"United States","code":"US"},"locale":"en-US","textId":"Botez_coach","analyticsId":"Botez Sisters","iconUrl":"https://assets-coaches.chess.com/image/coachbotezsisters-icon.png","taglines":[{"text":"Recognize us from YouTube? We'll make you a better chess player!","audioUrlHash":"26d978719bebb2b2c0dd6c558932ce76b77aef5d5e700e8262c57a9ca28fc5a1"},{"text":"Double trouble! We can help you achieve chess glory.","audioUrlHash":"d9dbca669e1ecf98fdd9ca5e48c2fad9bbe44c19871d3393c0942086a571e83c"},{"text":"Want TWO chess coaches instead of one? We're the right choice.","audioUrlHash":"17f6652dcb38d254525c8e787589cbc1a927fb083353d954e56b32bf8854a83a"},{"text":"Alexandra and Andrea here! You'd be a FOOL not to pick us!","audioUrlHash":"0e9bbd8c90284fce7385adf07a745c340b29d88434f6feecc73b30bc3dd35446"}],"i18nMeta":{"languageIndicator":""},"isCelebrity":true,"riveAnimationUrl":"https://assets-coaches.chess.com/image/coach_botez.riv?v=b6f824d5","greetingRiveAnimationUrl":"https://assets-coaches.chess.com/image/coach_botez_greeting.riv?v=ec34f754"}}`,
  },
  {
    lang: "en_US",
    link: "https://text-and-audio.chess.com/prod/released/Ben_coach/en-US/",
    cmd: `load-and-set-coach-asset text_id Generic_coach locale en-US json {"currentCoach":{"id":"6dde8ddc-ff6c-11ef-a8d2-d5eb2eeec084","name":"Ben","titledName":"Coach Ben","imageUrl":"https://assets-coaches.chess.com/image/coachben.png","voiceId":"Ben_coach","country":{"id":2,"name":"United States","nameLocalized":"United States","code":"US"},"locale":"en-US","textId":"Ben_coach","analyticsId":"Ben","iconUrl":"https://assets-coaches.chess.com/image/coachben-icon.png","taglines":[{"text":"Hey, it's Ben. You can pick me if you want, but I'll probably make fun of your blunders.","audioUrlHash":"f97764e9163395c49e103ebc2366ddfacfa8ae12bf56428697789e02701fdb9f"},{"text":"If you pick me, you may learn a thing or two. I am a grandmaster after all.","audioUrlHash":"061e36df97a1e330252c842168034958803803af2173402815622e20e8c83903"},{"text":"Trust me, you'll want me as your coach. The horsey goes diagonally, right?","audioUrlHash":"b4f71b3595e0ec9c992edd91c1b4a1a0a75baf08dcfbdaaab12ff3b0ef994391"},{"text":"You're thinking about picking me? Think twice, bucko.","audioUrlHash":"03cf87a5f7572b20ffd3661e8064a0f599595ab48b1924cf9290f1a74d4a04ae"}],"i18nMeta":{"languageIndicator":""},"isCelebrity":true,"riveAnimationUrl":"","greetingRiveAnimationUrl":""}}`,
  },
];



const language = [
  { lang: "en_US", link: "en-US", name: "English" },
  { lang: "fr_FR", link: "fr-FR", name: "Français" },
  { lang: "es_ES", link: "es-ES", name: "Español" },
  { lang: "ar_SA", link: "ar-SA", name: "عربي" },
  { lang: "ru_RU", link: "ru-RU", name: "Русский" },
  { lang: "pt_PT", link: "pt-PT", name: "Português" },
  { lang: "de_DE", link: "de-DE", name: "Deutsch" },
  { lang: "it_IT", link: "it-IT", name: "Italiano" },
  { lang: "tr_TR", link: "tr-TR", name: "Türkçe" },
  { lang: "pl_PL", link: "pl-PL", name: "Polski" },
  { lang: "ko_KR", link: "ko-KR", name: "한국어" },
  { lang: "id_ID", link: "id-ID", name: "Indonesia" },
];

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

let lastUrl = window.location.pathname;

const swalThemeCSS = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap');
    :root {
      --olive-vivid:   #4a7c1f;
      --olive-mid:     #5a8a30;
      --olive-border:  rgba(74,124,31,0.30);
      --bg-panel:      #faf8f5;
      --bg-card:       #ffffff;
      --bg-hover:      #eeeae3;
      --border-strong: rgba(74,124,31,0.28);
      --grey-fish:     #1a1714;
      --text-main:     #2e2a24;
      --text-soft:     #7a7060;
      --text-dim:      #b0a898;
      --font-mono:     'Space Mono', monospace;
      --font-body:     'DM Sans', sans-serif;
    }
    .swal2-popup.swal-rederic {
      font-family: var(--font-body) !important;
      background: var(--bg-panel) !important;
      border: 1px solid var(--border-strong) !important;
      border-radius: 18px !important;
      padding: 32px 28px 24px !important;
      box-shadow: 0 0 0 1px rgba(74,124,31,0.04) inset, 0 24px 70px rgba(0,0,0,0.13) !important;
      max-width: 460px !important;
      width: 94% !important;
      position: relative;
    }
    .swal2-popup.swal-rederic::before {
      content: '';
      position: absolute;
      top: 0; left: 10%; right: 10%;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--olive-mid), transparent);
      border-radius: 0 0 4px 4px;
    }
    .swal2-popup.swal-rederic .swal2-title {
      font-family: var(--font-mono) !important;
      font-size: 13px !important;
      font-weight: 700 !important;
      letter-spacing: 3px !important;
      text-transform: uppercase !important;
      color: var(--grey-fish) !important;
    }
    .swal2-popup.swal-rederic .swal2-html-container {
      color: var(--text-soft) !important;
      font-size: 13.5px !important;
      line-height: 1.65 !important;
      margin: 0 !important;
    }
    .swal2-popup.swal-rederic .swal2-close {
      color: var(--text-dim) !important;
      font-size: 22px !important;
      border-radius: 6px !important;
      transition: all 0.2s !important;
    }
    .swal2-popup.swal-rederic .swal2-close:hover {
      color: var(--grey-fish) !important;
      background: var(--bg-hover) !important;
    }
    .swal2-popup.swal-rederic .swal2-confirm {
      font-family: var(--font-mono) !important;
      font-size: 11px !important;
      font-weight: 700 !important;
      letter-spacing: 1.5px !important;
      text-transform: uppercase !important;
      padding: 10px 26px !important;
      border-radius: 8px !important;
      background: rgba(74,124,31,0.12) !important;
      border: 1px solid var(--olive-mid) !important;
      color: var(--olive-vivid) !important;
      box-shadow: none !important;
      transition: all 0.2s ease !important;
    }
    .swal2-popup.swal-rederic .swal2-confirm:hover {
      background: rgba(74,124,31,0.22) !important;
      border-color: var(--olive-vivid) !important;
      color: var(--grey-fish) !important;
    }
    .swal2-popup.swal-rederic .swal2-cancel {
      font-family: var(--font-mono) !important;
      font-size: 11px !important;
      font-weight: 700 !important;
      letter-spacing: 1.5px !important;
      text-transform: uppercase !important;
      padding: 10px 26px !important;
      border-radius: 8px !important;
      background: transparent !important;
      border: 1px solid var(--border-strong) !important;
      color: var(--text-soft) !important;
      box-shadow: none !important;
      transition: all 0.2s ease !important;
    }
    .swal2-popup.swal-rederic .swal2-cancel:hover {
      background: var(--bg-hover) !important;
      color: var(--text-main) !important;
    }
    .swal2-popup.swal-rederic .swal2-actions {
      margin-top: 18px !important;
      gap: 10px !important;
    }
    .swal2-container.swal2-backdrop-show {
      background: rgba(26,23,20,0.55) !important;
      backdrop-filter: blur(4px) !important;
    }

    .chv3-loading-wrap {
      margin: 18px 0 8px;
    }
    .chv3-loading-label {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--text-dim);
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .chv3-bar-track {
      width: 100%;
      height: 6px;
      background: rgba(74,124,31,0.12);
      border-radius: 99px;
      overflow: hidden;
      border: 1px solid var(--olive-border);
    }
    .chv3-bar-fill {
      height: 100%;
      width: 0%;
      background: var(--olive-mid);
      border-radius: 99px;
      transition: width 0.35s ease;
    }
    .chv3-game-label {
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--text-dim);
      margin-top: 7px;
      min-height: 14px;
      text-align: left;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-bottom: 12px;
    }
    .stat-card {
      background: var(--bg-card);
      border: 1px solid var(--border-strong);
      border-radius: 10px;
      padding: 13px 10px;
      text-align: center;
    }
    .stat-card .s-label {
      font-family: var(--font-mono);
      font-size: 9px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--text-dim);
      display: block;
      margin-bottom: 5px;
    }
    .stat-card .s-value {
      font-family: var(--font-mono);
      font-size: 22px;
      font-weight: 700;
      color: var(--grey-fish);
    }
    .stat-card.s-win  .s-value { color: #3a7d1e; }
    .stat-card.s-lost .s-value { color: #b84040; }
    .stat-card.s-draw .s-value { color: #8a7040; }
    .stat-card.s-acc  .s-value { color: #4a7c1f; }

    .safety-row {
      background: var(--bg-card);
      border: 1px solid var(--border-strong);
      border-radius: 10px;
      padding: 13px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
    }
    .safety-row .s-label {
      font-family: var(--font-mono);
      font-size: 9px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--text-dim);
      display: block;
      margin-bottom: 4px;
    }
    .safety-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 5px 11px;
      border-radius: 6px;
    }
    .badge-legit   { background: rgba(58,125,30,0.13);  color: #3a7d1e; border: 1px solid rgba(58,125,30,0.3); }
    .badge-sus     { background: rgba(186,64,64,0.10);  color: #b84040; border: 1px solid rgba(186,64,64,0.3); }
    .badge-cheater { background: rgba(60,60,60,0.10);   color: #2e2a24; border: 1px solid rgba(60,60,60,0.25); }
    .dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; }
    .dot-legit   { background: #3a7d1e; }
    .dot-sus     { background: #b84040; }
    .dot-cheater { background: #888; }

    .swal-footer-note {
      padding: 11px 14px;
      background: rgba(74,124,31,0.06);
      border: 1px solid var(--olive-border);
      border-radius: 9px;
      font-family: var(--font-mono);
      font-size: 11px;
      line-height: 1.6;
      color: var(--text-dim);
      text-align: left;
      margin-bottom: 14px;
    }
    .swal-footer-note::before { content: '// '; color: var(--olive-vivid); font-weight: 700; }
    .swal-author {
      display: block;
      text-align: right;
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--text-dim);
    }
  </style>
`;

function classifySafety(avgAccuracy, win, lost, draw) {
  const total = win + lost + draw;
  const winRate = total > 0 ? (win / total) * 100 : 0;

  if (avgAccuracy > 92 && winRate > 88) return "cheater";
  if (avgAccuracy >= 85 && winRate >= 75) return "sus";
  return "legit";
}

// ─── FETCH 10 DERNIÈRES PARTIES ──────────────────────────────────────────

async function getLast10PGN(username) {
  if (window.location.host === "www.chess.com") {
    const archivesRes = await fetch(
      `https://api.chess.com/pub/player/${username}/games/archives`,
    );
    const { archives } = await archivesRes.json();

    const recentArchives = [...archives].reverse();
    let allGames = [];

    for (const url of recentArchives) {
      const res = await fetch(url);
      const data = await res.json();
      allGames = allGames.concat(data.games);
      if (allGames.length >= 10) break;
    }

    allGames.sort((a, b) => b.end_time - a.end_time);

    return allGames.slice(0, 10).map((game) => ({
      pgn: game.pgn,
      white: game.white.username,
      black: game.black.username,
      whiteResult: game.white.result,
      blackResult: game.black.result,
      whiteElo: game.white.rating,
      blackElo: game.black.rating,
    }));
  }

  if (window.location.host === "lichess.org") {
    const url = `https://lichess.org/api/games/user/${username}?max=10&moves=true&pgnInJson=true&sort=dateDesc`;

    const res = await fetch(url, {
      headers: { Accept: "application/x-ndjson" },
    });

    const text = await res.text();

    return text
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line))
      .slice(0, 10)
      .map((game) => {
        const pgn = game.pgn;

        const getTag = (tag) => {
          const m = pgn.match(new RegExp(`\\[${tag} "([^"]+)"\\]`));
          return m ? m[1] : null;
        };

        const result = getTag("Result");

        return {
          pgn,
          white: getTag("White"),
          black: getTag("Black"),
          whiteResult:
            result === "1-0"
              ? "win"
              : result === "0-1"
                ? "loss"
                : result === "1/2-1/2"
                  ? "draw"
                  : null,
          blackResult:
            result === "0-1"
              ? "win"
              : result === "1-0"
                ? "loss"
                : result === "1/2-1/2"
                  ? "draw"
                  : null,
          whiteElo: parseInt(getTag("WhiteElo")),
          blackElo: parseInt(getTag("BlackElo")),
        };
      });
  }
}

// ─── PGN → FEN HISTORY ───────────────────────────────────────────────────

function pgnToFenHistory(pgn) {
  try {
    const chess = new Chess();
    chess.load_pgn(pgn);
    const history = chess.history({ verbose: true });

    const fens = [];
    const chess2 = new Chess();
    fens.push(chess2.fen());

    for (const move of history) {
      chess2.move(move);
      fens.push(chess2.fen());
    }

    return fens;
  } catch (e) {
    console.warn("PGN parse error:", e);
    return [];
  }
}

// ─── EXTRACT WIN/LOST/DRAW FOR USERNAME ─────────────────────────────────

function extractResult(gameInfo, username) {
  const uLower = username.toLowerCase();
  const isWhite = gameInfo.white.toLowerCase() === uLower;
  const result = isWhite ? gameInfo.whiteResult : gameInfo.blackResult;

  if (result === "win") return "win";
  if (
    ["checkmated", "timeout", "resigned", "abandoned", "lose", "loss"].includes(
      result,
    )
  )
    return "lost";
  return "draw";
}

async function showChessHv3Prompt(username) {
  const isChessCom = window.location.host === "www.chess.com";
  const isLichess = window.location.host === "lichess.org";
  const isWorldChess = window.location.host === "worldchess.com";

  function getCookie(name) {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  }

  // ── Loading popup ──────────────────────────────────────────────
  Swal.fire({
    customClass: { popup: "swal-rederic" },
    title: "ChessHv3 Check",
    showCloseButton: true,
    showConfirmButton: false,
    showCancelButton: false,
    allowOutsideClick: false,
    html: `
      ${swalThemeCSS}
      <div style="text-align:center; margin:8px 0 4px;">
        <div style="
          width:52px;height:52px;border-radius:50%;
          background:rgba(74,124,31,0.10);
          border:1px solid rgba(74,124,31,0.30);
          display:flex;align-items:center;justify-content:center;
          margin:0 auto 14px;
          font-family:'Space Mono',monospace;
          font-size:22px;font-weight:700;color:#4a7c1f;
        ">♟</div>
        <div class="chv3-loading-wrap">
          <div class="chv3-loading-label">
            <span>Fetching stats…</span>
            <span id="chv3-pct">0%</span>
          </div>
          <div class="chv3-bar-track">
            <div class="chv3-bar-fill" id="chv3-bar"></div>
          </div>
          <div class="chv3-game-label" id="chv3-game-label">Connecting to API…</div>
        </div>
      </div>
    `,
  });

  function setBar(pct, label) {
    const bar = document.getElementById("chv3-bar");
    const pctEl = document.getElementById("chv3-pct");
    const lbl = document.getElementById("chv3-game-label");
    if (bar) bar.style.width = pct + "%";
    if (pctEl) pctEl.textContent = pct + "%";
    if (lbl) lbl.textContent = label;
  }

  let stats = null;

  try {
    setBar(20, "Requesting player data…");

    // ── Chess.com ────────────────────────────────────────────────
    if (isChessCom) {
      const statsRes = await fetch(
        `https://api.chess.com/pub/player/${username}/stats`,
      );
      setBar(60, "Parsing records…");
      const data = await statsRes.json();

      function fmt(record) {
        const win = record?.win || 0,
          draw = record?.draw || 0,
          loss = record?.loss || 0;
        const total = win + draw + loss;
        return {
          total,
          win,
          draw,
          loss,
          winRate: total ? ((win / total) * 100).toFixed(1) : "0.0",
          drawRate: total ? ((draw / total) * 100).toFixed(1) : "0.0",
          loseRate: total ? ((loss / total) * 100).toFixed(1) : "0.0",
        };
      }

      const rapid = fmt(data.chess_rapid?.record);
      const blitz = fmt(data.chess_blitz?.record);
      const bullet = fmt(data.chess_bullet?.record);

      const totalWin = rapid.win + blitz.win + bullet.win;
      const totalDraw = rapid.draw + blitz.draw + bullet.draw;
      const totalLoss = rapid.loss + blitz.loss + bullet.loss;
      const totalAll = totalWin + totalDraw + totalLoss;

      stats = {
        platform: "chess.com",
        total: {
          total: totalAll,
          win: totalWin,
          draw: totalDraw,
          loss: totalLoss,
          winRate: totalAll ? ((totalWin / totalAll) * 100).toFixed(1) : "0.0",
          drawRate: totalAll
            ? ((totalDraw / totalAll) * 100).toFixed(1)
            : "0.0",
          loseRate: totalAll
            ? ((totalLoss / totalAll) * 100).toFixed(1)
            : "0.0",
        },
      };
    }

    // ── Lichess ─────────────────────────────────────────────────
    else if (isLichess) {
      const res = await fetch(`https://lichess.org/api/user/${username}`);
      setBar(60, "Parsing records…");
      const data = await res.json();

      const win = data.count?.win || 0;
      const draw = data.count?.draw || 0;
      const loss = data.count?.loss || 0;
      const total = data.count?.all || win + draw + loss;

      stats = {
        platform: "lichess",
        total: {
          total,
          win,
          draw,
          loss,
          winRate: total ? ((win / total) * 100).toFixed(1) : "0.0",
          drawRate: total ? ((draw / total) * 100).toFixed(1) : "0.0",
          loseRate: total ? ((loss / total) * 100).toFixed(1) : "0.0",
        },
      };
    }

    // ── WorldChess ──────────────────────────────────────────────
    else if (isWorldChess) {
      const jwt = getCookie("jwt_master");
      if (!jwt) throw new Error("JWT not found in cookies");

      setBar(40, "Resolving player id…");

      const meRes = await fetch(`https://api.worldchess.com/api/me/`, {
        headers: { Authorization: `JWT ${jwt}` },
      });

      const meData = await meRes.json();
      const playerId = meData?.player?.player_id;
      if (!playerId) throw new Error("Player ID not found");

      setBar(70, "Parsing records…");

      const statsRes = await fetch(
        `https://api.worldchess.com/api/gaming/players/${playerId}/stats/games-by-board-type`,
        {
          headers: { Authorization: `JWT ${jwt}` },
        },
      );

      const data = await statsRes.json();

      let totalWin = 0,
        totalDraw = 0,
        totalLoss = 0;

      data.forEach((mode) => {
        totalWin += mode.wins || 0;
        totalLoss += mode.losses || 0;
        totalDraw += mode.draws || 0;
      });

      const totalAll = totalWin + totalDraw + totalLoss;

      stats = {
        platform: "worldchess",
        total: {
          total: totalAll,
          win: totalWin,
          draw: totalDraw,
          loss: totalLoss,
          winRate: totalAll ? ((totalWin / totalAll) * 100).toFixed(1) : "0.0",
          drawRate: totalAll
            ? ((totalDraw / totalAll) * 100).toFixed(1)
            : "0.0",
          loseRate: totalAll
            ? ((totalLoss / totalAll) * 100).toFixed(1)
            : "0.0",
        },
      };
    }

    setBar(90, "Building summary…");
    await new Promise((r) => setTimeout(r, 300));
    setBar(100, "Done.");
    await new Promise((r) => setTimeout(r, 200));
  } catch (e) {
    Swal.fire({
      customClass: { popup: "swal-rederic" },
      title: "ChessHv3 Check",
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: "Close",
      html: `${swalThemeCSS}
        <p style="color:#b84040;font-family:'Space Mono',monospace;font-size:12px;">
          Failed to fetch stats.<br>${e.message}
        </p>`,
    });
    return;
  }

  // ── UI stats block (design conservé) ──────────────────────────
  function statBlock(label, s) {
    const wr = parseFloat(s.winRate);
    const wrColor =
      wr >= 50 && wr <= 60 ? "#3a7d1e" : wr > 60 ? "#b84040" : "#8a7040";

    return `
      <div style="margin-bottom:10px;">
        <div style="
          font-family:'Space Mono',monospace;font-size:9px;letter-spacing:2px;
          text-transform:uppercase;color:#b0a898;text-align:left;margin-bottom:7px;
        ">${label}</div>

        <div class="stats-grid">
          <div class="stat-card s-win">
            <span class="s-label">Won</span>
            <span class="s-value">${s.win}</span>
          </div>
          <div class="stat-card s-lost">
            <span class="s-label">Lost</span>
            <span class="s-value">${s.loss}</span>
          </div>
          <div class="stat-card s-draw">
            <span class="s-label">Draw</span>
            <span class="s-value">${s.draw}</span>
          </div>
          <div class="stat-card">
            <span class="s-label">Total</span>
            <span class="s-value">${s.total}</span>
          </div>
        </div>

        <div style="display:flex;height:5px;border-radius:99px;overflow:hidden;margin-bottom:6px;gap:2px;">
          <div style="flex:${s.winRate};background:#3a7d1e;"></div>
          <div style="flex:${s.drawRate};background:#8a7040;"></div>
          <div style="flex:${s.loseRate};background:#b84040;"></div>
        </div>

        <div style="
          font-family:'Space Mono',monospace;font-size:10px;
          color:${wrColor};
          background:${wrColor}18;
          border:1px solid ${wrColor}40;
          border-radius:6px;
          padding:5px 10px;
          text-align:center;
        ">
          win rate recommended: 50–60% · yours: <strong>${s.winRate}%</strong>
        </div>
      </div>
    `;
  }

  const platformLabel =
    stats.platform === "chess.com"
      ? "Σ Total (Chess.com)"
      : stats.platform === "lichess"
        ? "Σ Total (Lichess)"
        : "Σ Total (WorldChess)";

  const statsHTML = statBlock(platformLabel, stats.total);

  // ── Final popup ───────────────────────────────────────────────
  Swal.fire({
    customClass: { popup: "swal-rederic" },
    title: "ChessHv3 Check",
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    html: `
      ${swalThemeCSS}
      <div style="text-align:left;">
        ${statsHTML}
        <div style="
          font-family:'Space Mono',monospace;font-size:11px;color:#b0a898;
          text-align:center;margin-top:4px;
        ">
          Do you want to run the full analysis of your last 10 games?
        </div>
      </div>
    `,
  }).then((result) => {
    if (result.isConfirmed) {
      runAnalysis(username);
    }
  });
}

function showLoadingDialog() {
  Swal.fire({
    customClass: { popup: "swal-rederic" },
    title: "ChessHv3 Check",
    showConfirmButton: false,
    showCloseButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    focusConfirm: false,
    html: `
      ${swalThemeCSS}
      <div style="text-align:center; margin-bottom:6px;">
        <p style="font-size:13px; color:#7a7060; margin:0 0 4px;">
          Analyzing your last 10 games...
        </p>
      </div>
      <div class="chv3-loading-wrap">
        <div class="chv3-loading-label">
          <span id="chv3-step">Fetching games</span>
          <span id="chv3-pct">0%</span>
        </div>
        <div class="chv3-bar-track">
          <div class="chv3-bar-fill" id="chv3-bar"></div>
        </div>
        <div class="chv3-game-label" id="chv3-game-label">—</div>
      </div>
      <span class="swal-author" style="margin-top:10px;">red-Eric</span>
    `,
  });
}

function updateLoadingBar(percent, stepLabel, gameLabel) {
  const bar = document.getElementById("chv3-bar");
  const pct = document.getElementById("chv3-pct");
  const step = document.getElementById("chv3-step");
  const glbl = document.getElementById("chv3-game-label");
  if (bar) bar.style.width = percent + "%";
  if (pct) pct.textContent = Math.round(percent) + "%";
  if (step && stepLabel) step.textContent = stepLabel;
  if (glbl && gameLabel) glbl.textContent = gameLabel;
}

function showStatsDialog({ accuracy, win, lost, draw, safety }) {
  const badgeMap = {
    legit: `<span class="safety-badge badge-legit"><span class="dot dot-legit"></span>Legit</span>`,
    sus: `<span class="safety-badge badge-sus"><span class="dot dot-sus"></span>Sus</span>`,
    cheater: `<span class="safety-badge badge-cheater"><span class="dot dot-cheater"></span>Cheater</span>`,
  };

  Swal.fire({
    customClass: { popup: "swal-rederic" },
    title: "ChessHv3 Check",
    showCloseButton: true,
    confirmButtonText: "Done",
    focusConfirm: false,
    html: `
      ${swalThemeCSS}

      <div class="stats-grid">
        <div class="stat-card s-acc">
          <span class="s-label">Avg. Accuracy</span>
          <span class="s-value">${accuracy.toFixed(1)}%</span>
        </div>
        <div class="stat-card s-win">
          <span class="s-label">Win</span>
          <span class="s-value">${win}</span>
        </div>
        <div class="stat-card s-lost">
          <span class="s-label">Lost</span>
          <span class="s-value">${lost}</span>
        </div>
        <div class="stat-card s-draw">
          <span class="s-label">Draw</span>
          <span class="s-value">${draw}</span>
        </div>
      </div>

      <div class="safety-row">
        <div>
          <span class="s-label">Safety rating</span>
          <span style="font-family:'Space Mono',monospace;font-size:13px;font-weight:700;color:#7a7060;">
            Account status
          </span>
        </div>
        ${badgeMap[safety] ?? badgeMap.legit}
      </div>

      <div class="swal-footer-note">
        Legit = clean player &nbsp;·&nbsp; Sus = suspicious activity &nbsp;·&nbsp; Cheater = engine use detected.
      </div>
      <span class="swal-author">red-Eric</span>
    `,
  });
}

async function runAnalysis(username) {
  // Ouvre le dialog de chargement
  showLoadingDialog();

  try {
    // ── Étape 1 : Fetch PGN ──────────────────────────────────────────
    updateLoadingBar(5, "Fetching games...", "Connecting to API...");
    const games = await getLast10PGN(username);
    updateLoadingBar(15, "Games fetched", `${games.length} games found`);

    // ── Étape 2 : Init engine ─────────────────────────────────────────
    updateLoadingBar(18, "Starting engine", "Initializing Stockfish...");
    const engine = new AnalyzeEngine({ depth: config.depth });
    await engine.init();
    updateLoadingBar(22, "Engine ready", "Stockfish is running");

    // ── Étape 3 : Analyser chaque partie ─────────────────────────────
    let totalWhiteAcc = 0;
    let totalBlackAcc = 0;
    let win = 0,
      lost = 0,
      draw = 0;
    let accCount = 0;

    const uLower = username.toLowerCase();

    for (let i = 0; i < games.length; i++) {
      const gameInfo = games[i];
      const pct = 22 + (i / games.length) * 68;
      updateLoadingBar(
        pct,
        `Analyzing game ${i + 1} / ${games.length}`,
        `vs ${gameInfo.white.toLowerCase() === uLower ? gameInfo.black : gameInfo.white}`,
      );

      // Résultat W/L/D
      const res = extractResult(gameInfo, username);
      if (res === "win") win++;
      else if (res === "lost") lost++;
      else draw++;

      // FEN history depuis PGN
      const fenHistory = pgnToFenHistory(gameInfo.pgn);
      if (fenHistory.length < 2) continue;

      const isWhite = gameInfo.white.toLowerCase() === uLower;

      try {
        const result = await engine.update(fenHistory, {
          whiteElo: gameInfo.whiteElo,
          blackElo: gameInfo.blackElo,
        });

        if (result) {
          const acc = isWhite ? result.white.accuracy : result.black.accuracy;
          if (acc !== null && !isNaN(acc)) {
            totalWhiteAcc += acc;
            accCount++;
          }
        }
      } catch (e) {
        console.warn(`Game ${i + 1} analysis error:`, e);
      }
    }

    updateLoadingBar(92, "Finishing up", "Computing final stats...");
    engine.terminate();

    // ── Étape 4 : Calculer les stats finales ─────────────────────────
    const avgAccuracy = accCount > 0 ? totalWhiteAcc / accCount : 0;
    const safety = classifySafety(avgAccuracy, win, lost, draw);

    updateLoadingBar(100, "Done!", "Analysis complete");

    // Petit délai pour que la barre atteigne 100% visuellement
    await new Promise((r) => setTimeout(r, 600));

    // ── Étape 5 : Afficher les résultats ─────────────────────────────
    showStatsDialog({ accuracy: avgAccuracy, win, lost, draw, safety });
  } catch (err) {
    console.error("ChessHv3 analysis error:", err);
    Swal.fire({
      customClass: { popup: "swal-rederic" },
      title: "ChessHv3 Check",
      showCloseButton: true,
      confirmButtonText: "Close",
      html: `
        ${swalThemeCSS}
        <p style="font-family:'Space Mono',monospace;font-size:12px;color:#b84040;text-align:center;margin:10px 0;">
          ⚠ Analysis failed.<br>
          <span style="color:#b0a898;font-size:10px;">${err.message}</span>
        </p>
      `,
    });
  }
}

class AnalyzeEngine {
  constructor({ depth = config.depth } = {}) {
    this.depth = depth;
    this.engine = null;
    this._resolveEval = null;
    this._currentLines = [];
    this._cache = new Map();
    this._queue = [];
    this._running = false;
  }

  async init() {
    this.engine = await this._createWorker();
    await this._waitReady();
  }
  _createWorker() {
    return new Promise((resolve, reject) => {
      try {
        const url = `${chrome.runtime.getURL("lib/torch.js")}`;
        const blob = new Blob([`importScripts("${url}");`], {
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
      // classification: pos.moveClassification,
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

  _enqueueAndWait(fens, onEach) {
    for (const fen of fens) {
      if (!this._cache.has(fen) && !this._queue.includes(fen)) {
        this._queue.push(fen);
      }
    }
    if (this._running) return this._waitUntilCached(fens);
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

  _attachPlayedMoves(positions, fenHistory) {
    const hasChessJs = typeof Chess !== "undefined";
    return positions.map((pos, i) => {
      if (i === 0) return { ...pos, playedWasBest: false };
      const fenBase = fenHistory[i].split(" ")[0];
      const isBook = typeof BOOKS !== "undefined" && BOOKS.includes(fenBase);
      if (isBook) return { ...pos, playedWasBest: false, isBook: true };
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
      if (pos.isBook)
        return { ...pos, moveClassification: MoveClassification.Book };
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
const classMoveClassification = "keokodd";
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
  if (!board) {
    console.log("no board");
    return;
  }

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
  review: false,
  elo: 3500,
  coach: 999,
  lines: 5,
  colors: ["#0000ff", "#00ff00", "#FFFF00", "#f97316", "#ff0000"],
  depth: 10,
  delay: 100,
  style: "Default",
  autoMove: false,
  autoMoveBalanced: false,
  stat: false,
  autoStart: false,
  winningMove: false,
  showEval: false,
  onlyShowEval: false,
  key: " ",
};

chrome.storage.local.get(["chessConfig"], (result) => {
  console.log("config storage ", result.chessConfig);
  config = result.chessConfig || {
    review: false,
    elo: 3500,
    coach: 999,
    lines: 5,
    colors: ["#0000ff", "#00ff00", "#FFFF00", "#f97316", "#ff0000"],
    depth: 10,
    delay: 100,
    style: "Default",
    autoMove: false,
    autoMoveBalanced: false,
    stat: false,
    autoStart: false,
    winningMove: false,
    showEval: false,
    onlyShowEval: false,
    key: " ",
  };

  engine.updateConfig(config.lines, config.depth, config.style, config.elo);
});

async function createWorkerKomodo() {
  const url = `${chrome.runtime.getURL("lib/komodo.js")}`;
  const blob = new Blob([`importScripts("${url}");`], {
    type: "application/javascript",
  });
  const blobUrl = URL.createObjectURL(blob);

  return new Worker(blobUrl);
}

class ChessAnalyzer {
  constructor({ depth = config.depth } = {}) {
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
        const url = `${chrome.runtime.getURL("lib/stockfish.js")}`;
        const blob = new Blob([`importScripts("${url}");`], {
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
      this.engine.postMessage(`go depth ${config.depth}`);
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

const analyzer = new ChessAnalyzer({ depth: config.depth });

(async () => {
  await analyzer.init();
})();

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
    this.worker = await createWorkerKomodo();
    this.worker.postMessage("uci");
    this.setOptions();
  }

  hardStop() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
  quit() {
    this.hardStop();
    this.worker.postMessage("quit");
  }

  async restartWorker() {
    this.hardStop();
    this.worker = await createWorkerKomodo();
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
    this.worker.postMessage(
      `setoption name Personality value ${this.personality}`,
    );
    this.worker.postMessage(`setoption name UCI Elo value ${this.elo}`);
    this.worker.postMessage(`setoption name MultiPV value ${this.multipv}`);
  }

  async getMovesByFen(fen, side) {
    this.worker.postMessage(
      `setoption name Personality value ${this.personality}`,
    );
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

        if (line.startsWith("bestmove")) {
          const parts = line.split(" ");

          if (line.split("ponder")[1] === " ") {
            const from = line.split(" ")[1].slice(0, 2);
            const to = line.split(" ")[1].slice(2);
            results.push({
              from: from,
              to: to,
              eval: "book",
              fen: fen,
              side: side,
            });

            this.worker.removeEventListener("message", onMessage);
            resolve(results);
            return;
          }
        }

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
}

const engine = new komodo({
  elo: config.elo,
  depth: config.depth,
  multipv: config.lines,
  threads: 2,
  hash: 128,
  personality: config.style,
});

let keyMove = [
  {
    from: "e2",
    to: "e4",
    eval: "+2.83",
    fen: "2rqr1k1/pp4pp/2n1bp2/8/3P4/P4NPP/1B2B1P1/2RQ1RK1 b - - 0 19",
    side: "white",
  },
  {
    from: "e2",
    to: "e3",
    eval: "+3.11",
    fen: "2rqr1k1/pp4pp/2n1bp2/8/3P4/P4NPP/1B2B1P1/2RQ1RK1 b - - 0 19",
    side: "white",
  },
  {
    from: "d2",
    to: "d4",
    eval: "+3.12",
    fen: "2rqr1k1/pp4pp/2n1bp2/8/3P4/P4NPP/1B2B1P1/2RQ1RK1 b - - 0 19",
    side: "white",
  },
  {
    from: "d2",
    to: "d3",
    eval: "+3.14",
    fen: "2rqr1k1/pp4pp/2n1bp2/8/3P4/P4NPP/1B2B1P1/2RQ1RK1 b - - 0 19",
    side: "white",
  },
  {
    from: "c2",
    to: "c4",
    eval: "+3.30",
    fen: "2rqr1k1/pp4pp/2n1bp2/8/3P4/P4NPP/1B2B1P1/2RQ1RK1 b - - 0 19",
    side: "white",
  },
];

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
      @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;600&display=swap');

      #acc-widget {
        position: fixed;
        z-index: 999999;
        top: 80px;
        left: 20px;
        display: flex;
        flex-direction: column;
        gap: 5px;
        cursor: grab;
        user-select: none;
        touch-action: none;
        font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
      }

      #acc-widget.dragging {
        cursor: grabbing;
        opacity: 0.85;
      }

      .acc-row {
        display: flex;
        align-items: center;
        gap: 7px;
      }

      .acc-card,
      .acc-segment,
      .acc-label,
      .acc-value,
      .acc-side-badge,
      .acc-threat-dot {
        pointer-events: none;
      }

      .acc-side-badge {
        writing-mode: vertical-rl;
        text-orientation: mixed;
        font-family: 'DM Mono', ui-monospace, monospace;
        font-size: 6px;
        font-weight: 500;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        padding: 6px 3px;
        border-radius: 3px;
        flex-shrink: 0;
        line-height: 1;
        width: 14px;
        text-align: center;
      }

      .acc-side-badge-white  { background: #e4e4e0; color: #999; }
      .acc-side-badge-black  { background: #1e1e1c; color: #4a4a48; }
      .acc-side-badge-you-white { background: #1a1a18; color: #c8c8c4; }
      .acc-side-badge-you-black { background: #f2f2ee; color: #666; }

      .acc-card {
        width: 210px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
      }

      .acc-card-white {
        background: #f7f7f5;
        outline: 1px solid #ddddd8;
        box-shadow: 0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
      }

      .acc-card-black {
        background: #0f0f0e;
        outline: 1px solid rgba(255,255,255,0.07);
        box-shadow: 0 2px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5);
      }

      .acc-card-active-white { outline: 1.5px solid #b8b8b2; }
      .acc-card-active-black { outline: 1.5px solid rgba(255,255,255,0.16); }

      .acc-segment {
        padding: 10px 12px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        position: relative;
      }

      .acc-segment:first-child {
        border-right-width: 1px;
        border-right-style: solid;
      }
      .acc-card-white .acc-segment:first-child { border-right-color: #ddddd8; }
      .acc-card-black .acc-segment:first-child { border-right-color: rgba(255,255,255,0.05); }

      .acc-label {
        font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.14em;
        white-space: nowrap;
      }
      .acc-card-white .acc-label { color: #8a8a84; }
      .acc-card-black .acc-label { color: #4a4a46; }

      .acc-value {
        font-family: 'DM Mono', ui-monospace, 'Courier New', monospace;
        font-size: 21px;
        font-weight: 500;
        letter-spacing: -0.05em;
        line-height: 1;
        transition: color 0.3s ease;
      }
      .acc-card-white .acc-value { color: #111110; }
      .acc-card-black .acc-value { color: #e8e8e6; }

      .acc-card-inactive .acc-value  { opacity: 0.38; }
      .acc-card-inactive .acc-label  { opacity: 0.45; }
      .acc-card-inactive .acc-threat-dot { opacity: 0.3; }

      .acc-threat-dot {
        display: inline-block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        flex-shrink: 0;
        margin-left: 2px;
        position: relative;
        top: -1px;
        transition: background 0.35s ease, box-shadow 0.35s ease;
      }

      .acc-threat-safe {
        background: #22c55e;
        box-shadow: 0 0 5px rgba(34,197,94,0.55);
      }

      .acc-threat-warn {
        background: #eab308;
        box-shadow: 0 0 5px rgba(234,179,8,0.55);
      }

      .acc-threat-sus {
        background: #f97316;
        box-shadow: 0 0 5px rgba(249,115,22,0.55);
      }

      .acc-threat-cheat {
        background: #ef4444;
        box-shadow: 0 0 6px rgba(239,68,68,0.7);
      }

      .acc-threat-hidden {
        background: transparent;
        box-shadow: none;
      }

      .acc-card-active-white .acc-value-cheat { color: #dc2626; }
      .acc-card-active-white .acc-value-sus   { color: #ea6c08; }
      .acc-card-active-white .acc-value-warn  { color: #ca8f00; }
      .acc-card-active-white .acc-value-safe  { color: #16a34a; }

      .acc-card-active-black .acc-value-cheat { color: #f87171; }
      .acc-card-active-black .acc-value-sus   { color: #fb923c; }
      .acc-card-active-black .acc-value-warn  { color: #fbbf24; }
      .acc-card-active-black .acc-value-safe  { color: #4ade80; }

      .acc-label-row {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    `;
    document.head.appendChild(style);
  }

  // ─── Threat level helper ──────────────────────────────────────────────────

  function threatLevel(acc) {
    const n = parseFloat(acc);
    if (isNaN(n) || n === 0) return null; // no data yet
    if (n >= 95) return "cheat";
    if (n >= 90) return "sus";
    if (n >= 88) return "warn";
    return "safe";
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
            <div class="acc-label-row">
              <span class="acc-label">Accuracy</span>
              <span class="acc-threat-dot acc-threat-hidden" id="acc-dot-${color}"></span>
            </div>
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

  // ─── Drag (mouse + touch) ─────────────────────────────────────────────────

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

  widget.addEventListener(
    "touchstart",
    (e) => {
      const touch = e.touches[0];
      isDragging = true;
      widget.classList.add("dragging");
      offsetX = touch.clientX - widget.getBoundingClientRect().left;
      offsetY = touch.clientY - widget.getBoundingClientRect().top;
      e.preventDefault();
    },
    { passive: false },
  );

  document.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      widget.style.left = `${touch.clientX - offsetX}px`;
      widget.style.top = `${touch.clientY - offsetY}px`;
      e.preventDefault();
    },
    { passive: false },
  );

  document.addEventListener("touchend", () => {
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

  function applyThreat(color, acc) {
    const level = threatLevel(acc);
    const dot = document.getElementById(`acc-dot-${color}`);
    const val = document.getElementById(`acc-val-acc-${color}`);
    if (!dot || !val) return;

    // Reset dot classes
    dot.className = "acc-threat-dot";
    // Reset value threat classes
    val.classList.remove(
      "acc-value-cheat",
      "acc-value-sus",
      "acc-value-warn",
      "acc-value-safe",
    );

    if (!level) {
      dot.classList.add("acc-threat-hidden");
      return;
    }

    dot.classList.add(`acc-threat-${level}`);
    val.classList.add(`acc-value-${level}`);
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

    applyThreat("white", whiteAcc);
    applyThreat("black", blackAcc);
  }

  render();
  update(initialWhiteAcc, initialWhiteElo, initialBlackAcc, initialBlackElo);
  return { update };
}

function extractNormalMove(moves, side = "white") {
  const factor = side === "white" ? 1 : -1;

  // 1. BOOK
  const book = moves.find((m) => m.eval === "book");
  if (book) return book;

  // 2. MATE CHECK
  const mates = moves.filter(
    (m) => typeof m.eval === "string" && m.eval.includes("#"),
  );

  if (mates.length > 0) {
    const allMate = mates.length === moves.length;

    if (allMate) {
      return mates.sort((a, b) => {
        const ma = Math.abs(parseInt(a.eval.replace("#", "")));
        const mb = Math.abs(parseInt(b.eval.replace("#", "")));
        return ma - mb;
      })[0];
    }

    const strong = moves
      .filter((m) => typeof m.eval === "string" && !m.eval.includes("#"))
      .map((m) => ({
        ...m,
        score: parseFloat(m.eval) * factor,
      }))
      .filter((m) => !isNaN(m.score));

    const filtered = strong.filter((m) => m.score > 2.5);

    if (filtered.length > 0) {
      return filtered[Math.floor(Math.random() * filtered.length)];
    }
  }

  const normal = moves
    .filter((m) => typeof m.eval === "string" && !m.eval.includes("#"))
    .map((m) => ({
      ...m,
      score: parseFloat(m.eval) * factor,
    }))
    .filter((m) => !isNaN(m.score));

  if (normal.length === 0) return moves[0];

  const sorted = normal.sort((a, b) => b.score - a.score);

  const zone12 = sorted.filter((m) => Math.abs(m.score - 1.0) <= 0.4);
  if (zone12.length > 0) {
    return zone12[Math.floor(Math.random() * zone12.length)];
  }

  const zone0 = sorted.filter((m) => Math.abs(m.score) <= 0.5);
  if (zone0.length > 0) {
    return zone0[Math.floor(Math.random() * zone0.length)];
  }

  const allWinning = normal.every((m) => m.score > 2.5);
  if (allWinning) {
    return normal.sort((a, b) => a.score - b.score)[0];
  }

  return sorted[0];
}

class CoachEngine {
  constructor() {
    this.engine = null;
  }

  async init() {
    const url = chrome.runtime.getURL("lib/torch.js");

    const blob = new Blob([`importScripts("${url}");`], {
      type: "application/javascript",
    });

    const blobUrl = URL.createObjectURL(blob);
    this.engine = new Worker(blobUrl);

    this.engine.onmessage = (e) => {
      let raw = e.data;
      let cleanRaw = raw;

      if (typeof cleanRaw === "string" && cleanRaw.startsWith("json ")) {
        cleanRaw = cleanRaw.slice(5).trim();
      }

      try {
        const data = JSON.parse(cleanRaw);
        const classificationName = data?.positions[data?.positions?.length-1]?.classificationName
        // const audioUrlHash = data?.sentences?.[0]?.audioUrlHash;
        lastFenForAnalyzis = data?.positions[data?.positions?.length-1]?.fen
        const audioUrlHash = data?.positions[data?.positions?.length-1]?.playedMove?.speech[0]?.audioUrlHash

        console.clear()
        // console.log(audioUrlHash)
        console.log(classificationName)

        if (!audioUrlHash) return;

        // const urlAudio = `https://text-and-audio.chess.com/prod/released/David_coach/${language[parseInt(config.coach)].link}/${audioUrlHash}.mp3`;
        const urlAudio = `${coachs[config.coach].link}${audioUrlHash}.mp3`
        console.log(urlAudio)
        // console.log(urlAudio)
        chessComAudio.src = urlAudio;
        chessComAudio.play();
      } catch (err) {}
    };

    this.setup();
  }

  setup() {
    this.send("setoption name UseDeclarativePositionCommand value true");
    this.send("setoption name BlackElo value 3200");
    this.send("setoption name WhiteElo value 3200");
    this.send("setoption name HandleContinuations value true");
    this.send(`setoption name HandleContinuationsDepth value ${config.depth}`);
    this.send("setoption name UserColor value white");
    this.send("setoption name BotChatPrioritizePlayerMove value true");
    this.send("setoption name SerializeSpeechDetails value true");
    this.send("setoption name AllowBoardEventsWithoutSpeech value true");
    this.send("setoption name Language value fr_FR");
    this.send("setoption name ServeCommandV2 value true");
    this.send("setoption name SpeechV3 value true");
    this.send("setoption name UCI_Chess960 value false");
    this.send("setoption name UseRatingRanges value true");
  }

  send(cmd) {
    if (this.engine) {
      this.engine.postMessage(cmd);
    }
  }

  getChat(movesString, side = "white") {
    if (!this.engine) {
      throw new Error("Engine non initialisé");
    }
    this.send(`setoption name UserColor value ${side}`);
    this.send(`setoption name HandleContinuationsDepth value ${config.depth}`);
    this.send(coachs[config.coach].cmd)

    this.send(movesString);
    // this.send("fetch coachchat");
    this.send("fetch analysis");
  }

  terminate() {
    if (this.engine) {
      this.engine.terminate();
      this.engine = null;
    }
  }
}

const coach = new CoachEngine();
coach.init();

const jj0xffffff = () => {
  if (window.location.host === "www.chess.com") {
    let lastFEN = "";
    let uciHistory = "";
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
      let w_ = boardContainer.offsetWidth;

      if (!boardContainer) return console.error("Plateau non trouvé !");

      // Conteneur principal
      const evalContainer = document.createElement("div");
      evalContainer.id = "customEval";
      evalContainer.style.zIndex = "9999";
      evalContainer.style.width = `${(w_ * 6) / 100}px`;
      evalContainer.style.height = `${boardContainer.offsetWidth}px`;
      evalContainer.style.background = "#eee";
      evalContainer.style.marginLeft = "10px";
      evalContainer.style.position = "relative";
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

    function inject() {
      window.addEventListener("message", (event) => {
        if (event.source !== window) return;
        if (event.data && event.data.type === "FEN_RESPONSE") {
          fen_ = event.data.fen;
          uciHistory = event.data.uciHistory;
          side_index = event.data.side_;
          userName = event.data.username;
          chessComFenHistory = event.data.fenHistory;
          const isGameOver = event.data.isGameOver;
          if (config.review) {
            if (isGameOver && userName) {
              if (isGameOverFlag) {
                isGameOverFlag = false;
                showChessHv3Prompt(userName);
              }
            }
          }
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
      if (!Array.isArray(moves)) return;
      if (
        !(
          (side === "w" && fen_.split(" ")[1] === "w") ||
          (side === "b" && fen_.split(" ")[1] === "b")
        )
      ) {
        return;
      }
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
          if (score === "book") {
            const foreignObject = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "foreignObject",
            );
            foreignObject.setAttribute("x", to.x + squareSize - 12);
            foreignObject.setAttribute("y", to.y - 12);
            foreignObject.setAttribute("width", "24");
            foreignObject.setAttribute("height", "24");

            const div = document.createElement("div");
            div.innerHTML = bookSVG;
            foreignObject.appendChild(div);
            svg.appendChild(foreignObject);
          } else {
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
        if (config.autoMoveBalanced) {
          const balancedMove = extractNormalMove(keyMove, getSide());
          requestMove(balancedMove.from, balancedMove.to, "q", true);
        } else {
          requestMove(keyMove[0].from, keyMove[0].to, "q", true);
        }
      }
    };

    async function checkAndSendMoves() {
      // fix refresh page

      if (lastUrl !== window.location.pathname) {
        lastUrl = window.location.pathname;
        isGameOverFlag = true;
      }

      // auto start game
      if (config.autoStart) {
        const startBtn =
          document.querySelector(".new-game-buttons-buttons") ||
          document.querySelector(
            ".game-over-secondary-actions-row-component",
          ) ||
          document.querySelector(".game-over-arena-button-component") ||
          document.querySelector(".arena-footer-component") ||
          null;

        if (startBtn) {
          if (startBtn.children[0].innerText.length > 0) {
            startBtn.children[0].click();
          }
        }
      }

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
        chessComAudio.pause();
        if (uciHistory) {
          if (
            !((getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
            (getSide()[0] === "b" && fen_.split(" ")[1] === "b"))
          ) {
            // coach.getChat(uciHistory, getSide());
          }
          coach.getChat(uciHistory, getSide());
        }
        clearHint();
        const whiteElo = getElo(getSide())?.white || null;
        const blackElo = getElo(getSide())?.black || null;

        if (config.stat && statObj) {
          const result = await analyzer.update(chessComFenHistory, {
            whiteElo: whiteElo,
            blackElo: blackElo,
          });
          if (result) {
            lastClassification = result.moves.at(-1);
            chrome.runtime.sendMessage({
              type: "FROM_CONTENT",
              result: {
                whiteAccuracy: result.white.accuracy,
                whiteElo: result.white.elo,
                blackAccuracy: result.black.accuracy,
                blackElo: result.black.elo,
              },
            });
            statObj.update(
              result.white.accuracy,
              result.white.elo,
              result.black.accuracy,
              result.black.elo,
              getSide(),
            );
          }
        }

        // fen
        lastFEN = fen_;
        chrome.runtime.sendMessage({ type: "FROM_CONTENT", fen: fen_ });

        clearHighlightSquares();

        if (
          (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
          (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
        ) {
          engine.getMovesByFen(fen_, getSide()).then((moves) => {
            chrome.runtime.sendMessage({ type: "FROM_CONTENT", data: moves });
            keyMove = moves;

            if (config.autoMove) {
              if (config.autoMoveBalanced) {
                const moveBalanced = extractNormalMove(moves, getSide());
                requestMove(moveBalanced.from, moveBalanced.to);
              } else {
                requestMove(moves[0].from, moves[0].to);
              }
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
          config.elo,
        );

        clearHighlightSquares();

        if (
          (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
          (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
        ) {
          engine.getMovesByFen(fen_, getSide()).then((moves) => {
            chrome.runtime.sendMessage({
              type: "FROM_CONTENT",
              data: moves,
            });
            keyMove = moves;

            if (config.autoMove) {
              if (config.autoMoveBalanced) {
                const moveBalanced = extractNormalMove(moves, getSide());
                requestMove(moveBalanced.from, moveBalanced.to);
              } else {
                requestMove(moves[0].from, moves[0].to);
              }
            }
            if (moves.length > 0 && evalObj) {
              evalObj.update(moves[0].eval, getSide());
            }
            highlightMovesOnBoard(moves, getSide()[0]);
          });
        }
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
      let w_ = boardContainer.offsetWidth;

      if (!boardContainer) return console.error("Plateau non trouvé !");

      // Conteneur principal
      const evalContainer = document.createElement("div");
      evalContainer.id = "customEval";
      evalContainer.style.zIndex = "9999";
      evalContainer.style.width = `${(w_ * 6) / 100}px`;
      evalContainer.style.height = `${boardContainer.offsetWidth}px`;
      evalContainer.style.background = "#eee";
      evalContainer.style.marginLeft = "10px";
      evalContainer.style.position = "relative";
      evalContainer.style.left = "-50px";
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

    function highlightMovesOnBoard(moves, side) {
      if (!Array.isArray(moves)) return;
      if (
        !(
          (side === "w" && fen_.split(" ")[1] === "w") ||
          (side === "b" && fen_.split(" ")[1] === "b")
        )
      ) {
        return;
      }
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
          if (score === "book") {
            const foreignObject = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "foreignObject",
            );
            foreignObject.setAttribute("x", to.x + squareSize - 12);
            foreignObject.setAttribute("y", to.y - 12);
            foreignObject.setAttribute("width", "24");
            foreignObject.setAttribute("height", "24");

            const div = document.createElement("div");
            div.innerHTML = bookSVG;
            foreignObject.appendChild(div);
            svg.appendChild(foreignObject);
          } else {
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
        if (config.autoMoveBalanced) {
          const balancedMove = extractNormalMove(keyMove, getSide());
          await movePiece(balancedMove.from, balancedMove.to, 0);
        } else {
          await movePiece(keyMove[0].from, keyMove[0].to, 0);
        }
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
          let fenTemp = event.data.fen;
          if (lichessFenHistory.length > 0) {
            fenTemp = lichessFenHistory.at(-1);
          }

          if (fenTemp !== fen_) {
            fen_ = fenTemp;
            chrome.runtime.sendMessage({ type: "FROM_CONTENT", fen: fen_ });

            clearHighlightSquares();

            if (
              (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
              (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
            ) {
              engine.getMovesByFen(fen_, getSide()).then(async (moves) => {
                highlightMovesOnBoard(moves, getSide()[0]);
                keyMove = moves;
                if (moves.length > 0 && evalObj) {
                  evalObj.update(moves[0].eval, getSide());
                }

                if (moves.length > 0 && config.autoMove) {
                  if (config.autoMoveBalanced) {
                    const balancedMove = extractNormalMove(moves, getSide());
                    await movePiece(
                      balancedMove.from,
                      balancedMove.to,
                      randomIntBetween(0, config.delay),
                    );
                  } else {
                    await movePiece(
                      moves[0].from,
                      moves[0].to,
                      randomIntBetween(0, config.delay),
                    );
                  }
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
      if (document.querySelector("#user_tag")) {
        userName = document.querySelector("#user_tag").innerText;
      }

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

      if (config.review) {
        if (document.querySelector("good") && document.querySelector("bad")) {
          if (userName && isGameOverFlag) {
            isGameOverFlag = false;
            showChessHv3Prompt(userName);
          }
        }
      }

      if (config.autoStart) {
        const startNewGameBtn =
          document.querySelector(".fbt.new-opponent") || null;
        if (startNewGameBtn) {
          startNewGameBtn.click();
          startNewGameBtn.remove();
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
          config.elo,
        );

        clearHighlightSquares();
        if (
          (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
          (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
        ) {
          engine.getMovesByFen(fen_, getSide()).then(async (moves) => {
            highlightMovesOnBoard(moves, getSide()[0]);
            keyMove = moves;
            if (moves.length > 0 && evalObj) {
              evalObj.update(moves[0].eval, getSide());
            }

            if (moves.length > 0 && config.autoMove) {
              if (config.autoMoveBalanced) {
                const balancedMove = extractNormalMove(moves, getSide());
                await movePiece(
                  balancedMove.from,
                  balancedMove.to,
                  randomIntBetween(0, config.delay),
                );
              } else {
                await movePiece(
                  moves[0].from,
                  moves[0].to,
                  randomIntBetween(0, config.delay),
                );
              }
            }

            chrome.runtime.sendMessage({
              type: "FROM_CONTENT",
              data: moves,
            });
          });
        }
      }
    });

    chrome.runtime.onMessage.addListener(async (message, sender) => {
      if (message.type === "history") {
        const whiteElo = getElo(getSide())?.white || null;
        const blackElo = getElo(getSide())?.black || null;
        lichessFenHistory = message.data;

        if (config.stat && statObj) {
          const result = await analyzer.update(lichessFenHistory, {
            whiteElo: whiteElo,
            blackElo: blackElo,
          });
          if (result) {
            lastClassification = result.moves.at(-1);
            chrome.runtime.sendMessage({
              type: "FROM_CONTENT",
              result: {
                whiteAccuracy: result.white.accuracy,
                whiteElo: result.white.elo,
                blackAccuracy: result.black.accuracy,
                blackElo: result.black.elo,
              },
            });
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
      }
    });
    let fen_ = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
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

      return side;
    }

    function highlightMovesOnBoard(moves, side) {
      if (!Array.isArray(moves)) return;
      if (
        !(
          (side === "w" && fen_.split(" ")[1] === "w") ||
          (side === "b" && fen_.split(" ")[1] === "b")
        )
      ) {
        return;
      }
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
          if (score === "book") {
            const foreignObject = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "foreignObject",
            );
            foreignObject.setAttribute("x", to.x + squareSize - 12);
            foreignObject.setAttribute("y", to.y - 12);
            foreignObject.setAttribute("width", "24");
            foreignObject.setAttribute("height", "24");

            const div = document.createElement("div");
            div.innerHTML = bookSVG;
            foreignObject.appendChild(div);
            svg.appendChild(foreignObject);
          } else {
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
        if (config.autoMoveBalanced) {
          const balancedMove = extractNormalMove(keyMove, getSide());
          movePiece(balancedMove.from, balancedMove.to, 0);
        } else {
          movePiece(keyMove[0].from, keyMove[0].to, 0);
        }
      }
    };

    setInterval(async () => {
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

      if (config.autoStart) {
        const startBtn = document.querySelector("#newGame");
        if (startBtn && startBtn.children[0]) {
          if (startBtn.children[0].innerText.length >= 1) {
            startBtn.click();
          }
        }
      }

      if (fen_ && fen_ !== currentFen) {
        currentFen = fen_;
        chrome.runtime.sendMessage({ type: "FROM_CONTENT", fen: fen_ });

        clearHighlightSquares();

        if (!config.showEval && document.querySelector("#customEval")) {
          document.querySelector("#customEval").remove();
          evalObj = null;
        }

        if (
          (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
          (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
        ) {
          engine.getMovesByFen(fen_, getSide()).then((moves) => {
            keyMove = moves;
            chrome.runtime.sendMessage({ type: "FROM_CONTENT", data: moves });
            highlightMovesOnBoard(moves, getSide()[0]);

            if (moves.length > 0 && evalObj) {
              evalObj.update(moves[0].eval, getSide());
            }

            if (moves.length > 0 && config.autoMove) {
              if (config.autoMoveBalanced) {
                const balancedMove = extractNormalMove(moves, getSide());
                movePiece(
                  balancedMove.from,
                  balancedMove.to,
                  randomIntBetween(0, config.delay),
                );
              } else {
                movePiece(
                  moves[0].from,
                  moves[0].to,
                  randomIntBetween(0, config.delay),
                );
              }
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
          config.elo,
        );

        clearHighlightSquares();
        if (
          (getSide()[0] === "w" && fen_.split(" ")[1] === "w") ||
          (getSide()[0] === "b" && fen_.split(" ")[1] === "b")
        ) {
          engine.getMovesByFen(fen_, getSide()).then((moves) => {
            keyMove = moves;
            chrome.runtime.sendMessage({
              type: "FROM_CONTENT",
              data: moves,
            });
            highlightMovesOnBoard(moves, getSide()[0]);

            if (moves.length > 0 && evalObj) {
              evalObj.update(moves[0].eval, getSide());
            }

            if (moves.length > 0 && config.autoMove) {
              if (config.autoMoveBalanced) {
                const balancedMove = extractNormalMove(moves, getSide());
                movePiece(
                  balancedMove.from,
                  balancedMove.to,
                  randomIntBetween(0, config.delay),
                );
              } else {
                movePiece(
                  moves[0].from,
                  moves[0].to,
                  randomIntBetween(0, config.delay),
                );
              }
            }
          });
        }
      }
    });

    chrome.runtime.onMessage.addListener(async (message, sender) => {
      if (message.type === "history") {
        const whiteElo = getElo(getSide())?.white || null;
        const blackElo = getElo(getSide())?.black || null;

        let fenHistory = message.data;
        if (fenHistory.length > 0) {
          fen_ = fenHistory.at(-1);
        }

        if (config.stat && statObj) {
          let historyMessage = message.data;
          const result = await analyzer.update(historyMessage, {
            whiteElo: whiteElo,
            blackElo: blackElo,
          });
          if (result) {
            lastClassification = result.moves.at(-1);
            chrome.runtime.sendMessage({
              type: "FROM_CONTENT",
              result: {
                whiteAccuracy: result.white.accuracy,
                whiteElo: result.white.elo,
                blackAccuracy: result.black.accuracy,
                blackElo: result.black.elo,
              },
            });
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

let downloadlink = "https://www.youtube.com/@Redson_Eric";
const expiration_ = "20365-54zdzd66";
const expiration_day = "20365-546dz6";
const expiration_min = "20365-54dz66";
const expiration_year = "20365zdz-5466";
const expiration_a = "20365-54z6fe6";
const expiration_b = "20365-fef5466";
const expiration_c = "203fef65-5466";
const expiration_d = "2035-5466";
const Ahlk = "2026-05-01"; // YYYY-MM-DD
const apikey = "fddzedezfzef";
const apikey1 = "dze22dezfzef";
const apikey2 = "dzedezfsazef";
const apikey3 = "dzede45zfzef";
const apikey4 = "dzederefeezfzef";
const apikey5 = "dzedezfzefdf";
const apikey6 = "dzedezfzdqdqdef";

async function mijery() {
  let url = null;

  if (window.location.host === "www.chess.com") {
    url = "https://www.chess.com";
  } else if (window.location.host === "lichess.org") {
    url = "https://lichess.org";
  } else if (window.location.host === "worldchess.com") {
    url = "https://worldchess.com/";
  }

  if (!url) return false;

  try {
    const res = await fetch(url, { method: "HEAD" });
    const serverDateHeader = res.headers.get("date");

    if (!serverDateHeader) return false;

    const serverDate = new Date(serverDateHeader);
    const expirationDate = new Date(Ahlk);

    return serverDate >= expirationDate;
  } catch (e) {
    console.error(e);
    return true;
  }
}

let x = 100;

mijery().then((e) => {
  if (e) {
    Swal.fire({
      customClass: { popup: "swal-rederic" },
      title: "ChessHv3 Info",
      focusConfirm: false,
      html: `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap');
      :root {
        --olive-vivid:   #4a7c1f;
        --olive-mid:     #5a8a30;
        --olive-glow:    rgba(74,124,31,0.15);
        --olive-border:  rgba(74,124,31,0.30);
        --bg-panel:      #faf8f5;
        --bg-card:       #ffffff;
        --bg-hover:      #eeeae3;
        --bg-deep:       #f4f1ec;
        --border-soft:   rgba(74,124,31,0.12);
        --border-strong: rgba(74,124,31,0.28);
        --grey-fish:     #1a1714;
        --text-main:     #2e2a24;
        --text-soft:     #7a7060;
        --text-dim:      #b0a898;
        --font-mono:     'Space Mono', monospace;
        --font-body:     'DM Sans', sans-serif;
      }
      .swal2-popup.swal-rederic {
        font-family: var(--font-body) !important;
        background: var(--bg-panel) !important;
        border: 1px solid var(--border-strong) !important;
        border-radius: 18px !important;
        padding: 32px 28px 24px !important;
        box-shadow: 0 0 0 1px rgba(74,124,31,0.04) inset, 0 24px 70px rgba(0,0,0,0.13), 0 0 80px rgba(74,124,31,0.06) !important;
        max-width: 480px !important;
        width: 94% !important;
        position: relative;
      }
      .swal2-popup.swal-rederic::before {
        content: '';
        position: absolute;
        top: 0; left: 10%; right: 10%;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--olive-mid), transparent);
        border-radius: 0 0 4px 4px;
      }
      .swal2-popup.swal-rederic .swal2-title {
        font-family: var(--font-mono) !important;
        font-size: 13px !important;
        font-weight: 700 !important;
        letter-spacing: 3px !important;
        text-transform: uppercase !important;
        color: var(--grey-fish) !important;
      }
      .swal2-popup.swal-rederic .swal2-html-container {
        color: var(--text-soft) !important;
        font-size: 13.5px !important;
        line-height: 1.65 !important;
        margin: 0 !important;
      }
      .swal2-popup.swal-rederic .swal2-close {
        color: var(--text-dim) !important;
        font-size: 22px !important;
        border-radius: 6px !important;
        transition: all 0.2s !important;
      }
      .swal2-popup.swal-rederic .swal2-close:hover {
        color: var(--grey-fish) !important;
        background: var(--bg-hover) !important;
      }
      .swal2-popup.swal-rederic .swal2-confirm {
        font-family: var(--font-mono) !important;
        font-size: 11px !important;
        font-weight: 700 !important;
        letter-spacing: 1.5px !important;
        text-transform: uppercase !important;
        padding: 10px 22px !important;
        border-radius: 8px !important;
        background: rgba(74,124,31,0.12) !important;
        border: 1px solid var(--olive-mid) !important;
        color: var(--olive-vivid) !important;
        box-shadow: none !important;
        transition: all 0.2s ease !important;
      }
      .swal2-popup.swal-rederic .swal2-confirm:hover {
        background: rgba(74,124,31,0.22) !important;
        border-color: var(--olive-vivid) !important;
        color: var(--grey-fish) !important;
        box-shadow: 0 0 12px var(--olive-glow) !important;
      }
      .swal2-popup.swal-rederic .swal2-cancel {
        font-family: var(--font-mono) !important;
        font-size: 11px !important;
        font-weight: 700 !important;
        letter-spacing: 1.5px !important;
        text-transform: uppercase !important;
        padding: 10px 22px !important;
        border-radius: 8px !important;
        background: transparent !important;
        border: 1px solid var(--border-strong) !important;
        color: var(--text-soft) !important;
        box-shadow: none !important;
        transition: all 0.2s ease !important;
      }
      .swal2-popup.swal-rederic .swal2-cancel:hover {
        background: var(--bg-hover) !important;
        color: var(--text-main) !important;
      }
      .swal2-popup.swal-rederic .swal2-actions {
        margin-top: 18px !important;
        gap: 10px !important;
      }
      .swal2-container.swal2-backdrop-show {
        background: rgba(26,23,20,0.55) !important;
        backdrop-filter: blur(4px) !important;
      }
      .swal-social {
        display: flex;
        gap: 10px;
        justify-content: center;
        margin: 14px 0 6px;
        flex-wrap: wrap;
      }
      .swal-social a {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 8px 16px;
        border-radius: 8px;
        border: 1px solid var(--border-strong);
        background: var(--bg-card);
        color: var(--text-main);
        font-family: var(--font-mono);
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1px;
        text-decoration: none;
        text-transform: uppercase;
        transition: all 0.2s ease;
      }
      .swal-social a:hover {
        border-color: var(--olive-vivid);
        background: var(--bg-hover);
        box-shadow: 0 0 10px var(--olive-glow);
        color: var(--grey-fish);
      }
      .swal-footer-note {
        margin-top: 14px;
        padding: 11px 14px;
        background: rgba(74,124,31,0.06);
        border: 1px solid var(--olive-border);
        border-radius: 9px;
        font-family: var(--font-mono);
        font-size: 11px;
        line-height: 1.6;
        color: var(--text-dim);
        text-align: left;
      }
      .swal-footer-note::before {
        content: '// ';
        color: var(--olive-vivid);
        font-weight: 700;
      }
      .swal-author {
        display: block;
        text-align: right;
        margin-top: 10px;
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: var(--text-dim);
      }
    </style>

    <div class="swal-social">
      <a href="https://www.youtube.com/@Redson_Eric" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
        </svg>
        YouTube
      </a>
      <a href="https://discord.gg/WtGDhSYCxE" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
        </svg>
        Discord
      </a>
    </div>

    <div class="swal-footer-note">
      If you encounter any issues with the extension, join the Discord server to discuss them and stay updated on future updates.
    </div>

    <span class="swal-author">red-Eric</span>
  `,
    });
  }
  if (x === 900) {
    console.log("zihdizhidhz");
  }
  if (x === 800) {
    console.log("zihdizhidhz");
  }
  if (x === 700) {
    console.log("zihdizhidhz");
  }
  if (x === 600) {
    console.log("zihdizhidhz");
  }
  if (x === 500) {
    console.log("zihdizhidhz");
  }
  if (x === 20505) {
    console.log("zihdizhidhz");
  } else {
    jj0xffffff();
  }
});

//security

const hsx = 10;

function _x1(v) {
  return v !== undefined && v !== null;
}

function _x2() {
  return Date.now();
}

let _flag = false;
let _cache = 0;

if (hsx) {
  _cache = hsx * 2;

  const tmp = (function () {
    return _cache > 0 ? true : false;
  })();

  if (tmp) {
    try {
      let a = new Date.now();

      _flag = _x1(a);

      if (_flag) {
        for (let i = 0; i < 3; i++) {
          if (i % 2 === 0) {
            let z = _x2();

            if (z) {
              console.log("");
            } else {
            }
          } else {
            let y = hsx + i;

            if (y > 0) {
              let k = y * 3;

              if (k > 20) {
                _flag = true;
              } else {
                _flag = false;
              }
            }
          }
        }
      } else {
      }
    } catch (e) {
      let fallback = Date.now();

      if (fallback) {
        _flag = true;
      } else {
        _flag = false;
      }
    }
  } else {
  }
} else {
  for (let j = 0; j < 5; j++) {
    let t = j * hsx;

    if (t > 10) {
      console.log("");
    } else {
      _cache += j;
    }
  }
}

(function finalStep() {
  let end = Date.now();

  if (end && _flag) {
    console.log("");
  } else {
  }
})();

let ghost = 0;
for (let i = 0; i < 10; i++) {
  ghost += i;
  if (ghost % 3 === 0) {
    continue;
  } else {
    ghost -= 1;
  }
}

if (ghost > -1) {
  let finalCheck = Date.now();
  if (finalCheck) {
    _flag = !_flag;
  }
}
