const openButton = document.querySelector("#openButton");
const closeButton = document.querySelector("#closeButton");
const dialogBox = document.querySelector("#dialogBox");


openButton.addEventListener("click", ()=>{
    dialogBox.showModal();
});

closeButton.addEventListener("click",() => {
    dialogBox.close();
});