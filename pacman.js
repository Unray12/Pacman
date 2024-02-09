class Pacman {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    speed = 1;
    source = "assets/images/animations.gif";
    frame = 0;
    animationImg = [];
    pacImg = new Image();
    direction = 0;
    rotation = 0;
    toleranceWallCollision = -0.001;
    nextDirection = DIRECTION_RIGHT;

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.pacImg.src = this.source;
        this.direction = DIRECTION_RIGHT;
        this.centerAnchor();
    }

    centerAnchor() {
        this.x += (this.width / 2);
        this.y += (this.height / 2);
    }
    

    checkWallCollision() {
        //check top right
        if (map[parseInt((this.y-this.height/2-this.toleranceWallCollision)/oneBlockSize)][parseInt((this.x+this.width/2+this.toleranceWallCollision)/oneBlockSize)] == 1)
            return true;
        //check bottom right
        if (map[parseInt((this.y+this.height/2+this.toleranceWallCollision)/oneBlockSize)][parseInt((this.x+this.width/2+this.toleranceWallCollision)/oneBlockSize)] == 1)
            return true;
        //check top left
        if (map[parseInt((this.y-this.height/2-this.toleranceWallCollision)/oneBlockSize)][parseInt((this.x-this.width/2-this.toleranceWallCollision)/oneBlockSize)] == 1)
            return true;
        //check bottom left
        if (map[parseInt((this.y+this.height/2+this.toleranceWallCollision)/oneBlockSize)][parseInt((this.x-this.width/2-this.toleranceWallCollision)/oneBlockSize)] == 1)
            return true;
        return false;
    }

    changeDirectionIfPossible() {
        if (this.direction == this.nextDirection) return;
        let temp = this.direction;
        this.direction = this.nextDirection;
        this.moveForward();
        if (this.checkWallCollision()) {
            this.moveBackward();
            this.direction = temp;
        }
        else 
            console.log("hello");
        
    }

    moveForward() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x += this.speed;
                this.rotation = 0;
                break;
            case DIRECTION_LEFT:
                this.x -= this.speed;
                this.rotation = 180;
                break;
            case DIRECTION_UP:
                this.y -= this.speed;
                this.rotation = -90;
                break;
            case DIRECTION_DOWN:
                this.y += this.speed;
                this.rotation = 90;
                break;
            default:
                console.log("moveForward error");
                break;
        }
    }

    moveBackward() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x -= this.speed;
                //this.rotation = 0;
                break;
            case DIRECTION_LEFT:
                this.x += this.speed;
                //this.rotation = 180;
                break;
            case DIRECTION_UP:
                this.y += this.speed;
                //this.rotation = -90;
                break;
            case DIRECTION_DOWN:
                this.y -= this.speed;
                //this.rotation = 90;
                break;
            default:
                console.log("moveBackward error error");
                break;
        }
    }

    moveProcess() {
        this.changeDirectionIfPossible();
        this.moveForward();
        if (this.checkWallCollision())
            this.moveBackward();
    }

    draw() {
        canvasContex.save();
        canvasContex.translate(this.x, this.y);
        canvasContex.rotate(this.rotation * DEGREE);
        canvasContex.drawImage(this.pacImg, this.frame * oneBlockSize, 0, this.width, this.height, 
            -this.width/2, -this.height/2, this.width, this.height);
        canvasContex.restore();
        // canvasContex.drawImage(this.pacImg, this.frame * oneBlockSize, 0, this.width, this.height, 
        //     this.x, this.y, this.width, this.height);
    }

    updateImage() {
        let periodUpdate = 5;
        this.frame += (frames % periodUpdate == 0) ? 1 : 0;
        this.frame = this.frame % 7;
        if (gameState.current == gameState.inGame) {
            this.moveProcess();
        }
    }
}