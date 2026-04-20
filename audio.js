const audio = new Audio()

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'audio') {
    audio.pause()
    audio.src = msg.src
    audio.play()
  }
});