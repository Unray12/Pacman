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
    draw: function(x=0, y=0) {
        // canvasContex.beginPath();
        // canvasContex.arc(x, y, this.radius, 0, 360*DEGREE);
        // canvasContex.fillStyle = "#FEB897";
        // canvasContex.fill();
        // canvasContex.lineWidth = 0;
        // canvasContex.strokeStyle = "#FEB897";
        // canvasContex.stroke();
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[0].length; j++) {
                if (map[i][j] == 2) {
                    //food.draw(j * oneBlockSize + oneBlockSize / 2, i * oneBlockSize + oneBlockSize / 2);
                    x = j * oneBlockSize + oneBlockSize / 2;
                    y = i * oneBlockSize + oneBlockSize / 2;
                    canvasContex.beginPath();
                    canvasContex.arc(x, y, this.radius, 0, 360*DEGREE);
                    canvasContex.fillStyle = "#FEB897";
                    canvasContex.fill();
                    canvasContex.lineWidth = 0;
                    canvasContex.strokeStyle = "#FEB897";
                    canvasContex.stroke();
                }
            }       
        }
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

spriteGhostLocation = [
    {x: 0, y: 0},
    {x: 176, y: 0},
    {x: 0, y: 121},
    {x: 176, y: 121},
]
///////////////// INIT /////////////////
let pacman = new Pacman(oneBlockSize, oneBlockSize, oneBlockSize, oneBlockSize);

let redGhost = new Ghost(pacman, 0, 0, oneBlockSize * 9, oneBlockSize * 11);
let orangeGhost = new Ghost(pacman, 176, 0, oneBlockSize * 10, oneBlockSize * 11);
let pinkGhost = new Ghost(pacman, 0, 121, oneBlockSize * 11, oneBlockSize * 11);
let blueGhost = new Ghost(pacman, 176, 121, oneBlockSize * 10, oneBlockSize * 10);
////////////////////////////////////////

function draw() {
    createRect(0, 0, canvasElement.width, canvasElement.height, "black");
    drawWalls();
    food.draw();
    pacman.draw();
    redGhost.draw();
    orangeGhost.draw();
    pinkGhost.draw();
    blueGhost.draw();

    
}

function updateImage() {
    pacman.updateImage();
    redGhost.updateImage();
    orangeGhost.updateImage();
    pinkGhost.updateImage();
    blueGhost.updateImage();
}

function gameLoop() {
    updateImage();
    draw();
    frames++; 
    requestAnimationFrame(gameLoop);
}


gameLoop();