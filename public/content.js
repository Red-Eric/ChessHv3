function getSide(){
  if(document.querySelector(".coordinate-light").innerHTML == "1"){
      return "black"
  }
  else if(document.querySelector(".coordinate-light").innerHTML == "8"){
      return "white"
  }
  else{
      return "none"
  }
}

function getMovelist(){
  let movelist = []
  Array.from(document.querySelectorAll("div.node")).forEach((e, i)=>{
      movelist.push(e.innerText.replaceAll(" ",""))
  })
  return movelist;
}

function sendMessage(){
  let moves = getMovelist()
  if(moves != undefined){
      chrome.runtime.sendMessage({movelist : moves, side: getSide()});
  }
  else{
      console.error("No position definied")
  }
  
}

setInterval(() => {
  console.log("send")
  sendMessage()
}, 500);