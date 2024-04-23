// ITEMS
const mainCanvas = document.getElementById("mainCanvas");
const mainCanvasCtx = mainCanvas.getContext("2d");
const ButtonCreateGame = document.getElementById("ButtonCreateGame");
const nameField = document.getElementById("name");
const sizeField = document.getElementById("size");
const seedField = document.getElementById("seed");

// BLOCKS
const MainMenu = document.getElementById("MainMenu");
const NewGameBlock = document.getElementById("NewGameBlock");
const GameBlock = document.getElementById("Game");

// MAIN CONSTANTS
const blockSize = 20;
ButtonCreateGame.onclick = function () {
    currentGame = new Game(parseInt(sizeField.value), seedField.value === "" ? new Date().toString() : (Number.isInteger(parseInt(seedField.value)) ? parseInt(seedField.value) : seedField.value), nameField.value);
    console.log(currentGame);
    MainMenu.style.display = "none";
    NewGameBlock.style.display = "none";
    GameBlock.style.display = "block";
    Redraw();
}

function Redraw() {
    mainCanvasCtx.fillStyle = "red";
    mainCanvasCtx.fillRect((mainCanvas.clientWidth/2)-(blockSize/2), (mainCanvas.clientHeight/2)-blockSize, blockSize, blockSize*2);
    currentGame.Blocks.forEach(block => {
        var offsetX = block.Position.X - currentGame.Player.Position.X;
        var offsetY = block.Position.Y - currentGame.Player.Position.Y;
        if(block instanceof GrassBlock){
            mainCanvasCtx.fillStyle = "green";
            mainCanvasCtx.fillRect((mainCanvas.clientWidth/2)-(blockSize/2)-(offsetX*blockSize), (mainCanvas.clientHeight/2)-blockSize-(offsetY*blockSize), blockSize, blockSize);
        }else if(block instanceof Land){
            mainCanvasCtx.fillStyle = "brown";
            mainCanvasCtx.fillRect((mainCanvas.clientWidth/2)-(blockSize/2)-(offsetX*blockSize), (mainCanvas.clientHeight/2)-blockSize-(offsetY*blockSize), blockSize, blockSize);
        }
    });
}