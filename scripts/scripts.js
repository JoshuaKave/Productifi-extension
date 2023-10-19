const inputEl = document.getElementById("input-url");
const saveBtn = document.getElementById("save-btn");
const saveList = document.getElementById("save-list");
const clearBtn = document.getElementById("clear-btn");
const inputName = document.getElementById("input-name");
const inputDate = document.getElementById("input-date");
const saveForm = document.getElementById("save-form");
const saveUrlBtn = document.getElementById("save-url");

let saveArray = [];
const localArray = JSON.parse(localStorage.getItem("saved-urls"));

if (localArray) {
    saveArray = localArray;
    display(saveArray);
}


saveBtn.addEventListener("click", function(){
    saveForm.style.display = "block";
});

saveUrlBtn.addEventListener("click", function(){
    const name = inputName.value;
    const date = inputDate.value;
    if(name && date){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            const url = tabs[0].url;
            const data = {name, date, url};
            saveArray.push(data);
            localStorage.setItem("saved-urls", JSON.stringify(saveArray));
            display(saveArray);
        })
        inputName.value = "";
        inputDate.value = "";   
        saveForm.style.display="none";
    }
    else{
        saveForm.style.display="none";
    }
});

clearBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    saveArray = [];
    saveList.innerHTML = "";
});


function display(links){
    let saved = "";
    for(let i = 0; i < links.length; i++){
        const data = links[i];
        saved += `
        <li>
            <a target='_blank' href='${data.url}'>
                ${data.name} Due: ${data.date}
            </a>
        </li>
    `
    }

    saveList.innerHTML = saved;
};