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
    Frame();
}

function Redraw() {
    mainCanvasCtx.clearRect(0,0,mainCanvas.clientWidth, mainCanvas.clientHeight);
    currentGame.Blocks.forEach(block => {
        var offsetX = block.Position.X - currentGame.Player.Position.X;
        var offsetY = block.Position.Y - currentGame.Player.Position.Y;
        if(block instanceof GrassBlock){
            mainCanvasCtx.fillStyle = "green";
            mainCanvasCtx.fillRect((mainCanvas.clientWidth/2)+(offsetX*blockSize)-(blockSize/2), (mainCanvas.clientHeight/2)-(offsetY*blockSize), blockSize, blockSize);
        }else if(block instanceof Land){
            mainCanvasCtx.fillStyle = "brown";
            mainCanvasCtx.fillRect((mainCanvas.clientWidth/2)+(offsetX*blockSize)-(blockSize/2), (mainCanvas.clientHeight/2)-(offsetY*blockSize), blockSize, blockSize);
        }else if(block instanceof Stone){
            mainCanvasCtx.fillStyle = "#999999";
            mainCanvasCtx.fillRect((mainCanvas.clientWidth/2)+(offsetX*blockSize)-(blockSize/2), (mainCanvas.clientHeight/2)-(offsetY*blockSize), blockSize, blockSize);
        }else if(block instanceof MetalOre){
            mainCanvasCtx.fillStyle = "#787878";
            mainCanvasCtx.fillRect((mainCanvas.clientWidth/2)+(offsetX*blockSize)-(blockSize/2), (mainCanvas.clientHeight/2)-(offsetY*blockSize), blockSize, blockSize);
            mainCanvasCtx.fillStyle = "#EFE";
            mainCanvasCtx.fillRect((mainCanvas.clientWidth/2)+(offsetX*blockSize)-(blockSize/3), (mainCanvas.clientHeight/2)-(offsetY*blockSize), blockSize / 5, blockSize / 5);
            mainCanvasCtx.fillRect((mainCanvas.clientWidth/2)+(offsetX*blockSize)+(blockSize/3), (mainCanvas.clientHeight/2)-(offsetY*blockSize), blockSize / 6, blockSize / 7);
            mainCanvasCtx.fillRect((mainCanvas.clientWidth/2)+(offsetX*blockSize)-(blockSize/4), (mainCanvas.clientHeight/2)-(offsetY*blockSize)+(blockSize/3), blockSize / 4, blockSize / 5);
        }
    });

    // PLAYER
    mainCanvasCtx.fillStyle = "red";
    mainCanvasCtx.fillRect((mainCanvas.clientWidth/2)-(blockSize/2), (mainCanvas.clientHeight/2)-blockSize, blockSize, blockSize*2);
}

function Frame() {
    var highAboveGround = currentGame.HighPlayerAboveGround();
    if(highAboveGround > 1) currentGame.Player.Position.Y -= 0.1;
    if(highAboveGround < 1) currentGame.Player.Position.Y += 1 - highAboveGround;
    Redraw();
    console.log(highAboveGround);
}

document.onkeydown = function (event) {
    console.log(event.key);
    switch (event.key) {
        case "r":
            Frame();
            break;
        case " ":
            if(currentGame.PlayerIsOnGround()) currentGame.Player.Position.Y++;
            break;
        default:
            break;
    }
}