const inputEl = document.getElementById("input-url");
const saveBtn = document.getElementById("save-btn");
const saveList = document.getElementById("save-list");
const localArray = JSON.parse(localStorage.getItem("saved-urls"));
const clearBtn = document.getElementById("clear-btn");

let saveArray = [];

if (localArray) {
    saveArray = localArray;
    display(saveArray);
    console.log(saveArray.length);
}

saveBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        saveArray.push(tabs[0].url);
        localStorage.setItem("saved-urls", JSON.stringify(saveArray));
        display(saveArray);
    })
});

clearBtn.addEventListener("click", function(){
    localStorage.clear();
    saveArray = [];
    saveList.innerHTML = "";
});


function display(links){
    let saved = "";
    for(let i = 0; i < links.length; i++){
        saved += `
        <li>
            <a target='_blank' href='${links[i]}'>
                ${links[i]}
            </a>
        </li>
    `
    }

    saveList.innerHTML = saved;
};