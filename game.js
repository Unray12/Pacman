const canvasElement = document.getElementById("game-view");
const canvasContex = canvasElement.getContext("2d");
let frames = 0;
const DEGREE = Math.PI / 180; //DEGREE to radian
let oneBlockSize = 20; //map

const gameState = {
    getReady: 0,
    inGame: 1,
    gameOver: 2,
    current: 1,
}

const DIRECTION_RIGHT = 0;
const DIRECTION_LEFT = 1;
const DIRECTION_UP = 2;
const DIRECTION_DOWN = 3;
//CONTROL GAME STATE
let a="h";
window.addEventListener("keydown", function(event) {
    let k = event.key;
    switch (gameState.current) {
        case gameState.getReady:
            gameState.current = gameState.inGame;
            break;
        case gameState.inGame:
            if (k == 'a' || k == "ArrowLeft") {
                // left arrow or a
                pacman.nextDirection = DIRECTION_LEFT;
            } else if (k == 'w' || k == "ArrowUp") {
                // up arrow or w
                pacman.nextDirection = DIRECTION_UP;
            } else if (k == 'd' || k == "ArrowRight") {
                // right arrow or d
                pacman.nextDirection = DIRECTION_RIGHT;
            } else if (k == 's' || k == "ArrowDown") {
                // bottom arrow or s
                pacman.nextDirection = DIRECTION_DOWN;
            }
            break;
        case gameState.gameOver:
            break;
        default:
            console.log("error");
    }
});

let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const food = {
    radius: 2,
    draw: function(x, y) {
        canvasContex.beginPath();
        canvasContex.arc(x, y, this.radius, 0, 360*DEGREE);
        canvasContex.fillStyle = "#FEB897";
        canvasContex.fill();
        canvasContex.lineWidth = 0;
        canvasContex.strokeStyle = "#FEB897";
        canvasContex.stroke();
    }
}

function createRect(x, y, width, height, color="") {
    canvasContex.fillStyle = color;
    canvasContex.fillRect(x, y, width, height);
}

function drawWalls() {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] == 1) { 
                //createRect(j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize, "#342DCA");
                canvasContex.strokeStyle = "#342DCA";
                canvasContex.lineWidth = 2;
                canvasContex.strokeRect(j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize);
            }

        }
    }
    // canvasContex.strokeStyle = "#342DCA";
    // canvasContex.lineWidth = oneBlockSize;
    //canvasContex.strokeRect(0, 0, oneBlockSize*(map[0].length), oneBlockSize*(map.length));
}

///////////////// INIT /////////////////
let pacman = new Pacman(oneBlockSize, oneBlockSize, oneBlockSize, oneBlockSize);

////////////////////////////////////////

function draw() {
    createRect(0, 0, canvasElement.width, canvasElement.height, "black");
    drawWalls();
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] == 2)
                food.draw(j * oneBlockSize + oneBlockSize / 2, i *oneBlockSize + oneBlockSize / 2);
        }    
    }
    pacman.draw();

    
}

function updateImage() {
    pacman.updateImage();
}

function gameLoop() {
    updateImage();
    draw();
    frames++; 
    requestAnimationFrame(gameLoop);
}


gameLoop();