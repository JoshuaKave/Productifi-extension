const inputEl = document.getElementById("input-url");

const blockedURLS = [];

function block(){
    blockedURLS.push(inputEl.value);
    console.log(blockedURLS);
}