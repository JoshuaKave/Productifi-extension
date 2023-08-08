const inputEl = document.getElementById("input-url");
const blkBtnEl = document.getElementById("blk-btn");

const blockedURLS = [];

blkBtnEl.addEventListener("click", myFunction);

function myFunction(){
    //pushes input value to blocked urls array
    blockedURLS.push(inputEl.value);
    //console.log(blockedURLS);
    //updates localstorage to the most recent array
    localStorage.setItem("blocked", JSON.stringify(blockedURLS));  
    //console.log("hello");
};

//gets current tab info
function handleUpdated(tabId, changeInfo, tab){
  const blockedUrlsFetch = JSON.parse(localStorage.getItem("blocked"));
  for(let i = 0; i < blockedUrlsFetch.length; i++){  
    if(tab.url.includes(blockedUrlsFetch[i])){
      let updating = chrome.tabs.update({url: "https://youtube.com"});
    }
  }
}

chrome.tabs.onUpdated.addListener(handleUpdated);