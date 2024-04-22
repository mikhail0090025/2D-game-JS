const mainCanvas = document.getElementById("mainCanvas");
const ButtonCreateGame = document.getElementById("ButtonCreateGame");
const nameField = document.getElementById("name");
const sizeField = document.getElementById("size");
const seedField = document.getElementById("seed");
ButtonCreateGame.onclick = function () {
    currentGame = new Game(parseInt(sizeField.value), Number.isInteger(parseInt(seedField.value)) ? parseInt(seedField.value) : seedField.value, nameField.value);
    console.log(currentGame);
}