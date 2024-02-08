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
    toleranceWallCollision = -0.1;
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
    
    checkCollisionLeft(toleranceCollision=this.toleranceWallCollision) {
        if (//this.direction == DIRECTION_LEFT &&
            map[parseInt(this.y/oneBlockSize)][parseInt((this.x-this.width/2-toleranceCollision)/oneBlockSize)] == 1) {
                return true;
            }
        return false;
    }

    checkCollisionRight(toleranceCollision=this.toleranceWallCollision) {
        if (//this.direction == DIRECTION_RIGHT &&
            map[parseInt(this.y/oneBlockSize)][parseInt((this.x+this.width/2+toleranceCollision)/oneBlockSize)] == 1) {
                return true;
            }
        return false;    
    }

    checkCollisionUp(toleranceCollision=this.toleranceWallCollision) {
        if (//this.direction == DIRECTION_UP &&
            map[parseInt((this.y-this.height/2-toleranceCollision)/oneBlockSize)][parseInt(this.x/oneBlockSize)] == 1) {
                return true;
            }
        return false;
    }

    checkCollisionDown(toleranceCollision=this.toleranceWallCollision) {
        if (//this.direction == DIRECTION_DOWN &&
            map[parseInt((this.y+this.height/2+toleranceCollision)/oneBlockSize)][parseInt(this.x/oneBlockSize)] == 1) {
                return true;
            }
        return false;
    }

    checkWallCollision(toleranceCollision=this.toleranceWallCollision) {
        let result = this.checkCollisionLeft(toleranceCollision) || this.checkCollisionRight(toleranceCollision) ||
        this.checkCollisionUp(toleranceCollision) || this.checkCollisionDown(toleranceCollision);
        return result;
    }

    changeDirectionIfPossible() {
        if (this.direction == this.nextDirection) return;
        let temp = this.direction;
        this.direction = this.nextDirection;
        if (this.checkWallCollision())
            this.direction = temp;
    }
    setRotation(angle) {
        this.rotation = angle;
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
                console.log("moveProcess error");
                break;
        }
    }

    moveBackward() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x -= this.speed;
                this.rotation = 0;
                break;
            case DIRECTION_LEFT:
                this.x += this.speed;
                this.rotation = 180;
                break;
            case DIRECTION_UP:
                this.y += this.speed;
                this.rotation = -90;
                break;
            case DIRECTION_DOWN:
                this.y -= this.speed;
                this.rotation = 90;
                break;
            default:
                console.log("moveProcess error");
                break;
        }
    }

    moveProcess() {
        this.moveForward();
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
            this.changeDirectionIfPossible();
            if (!this.checkWallCollision())
                this.moveProcess();
        }
    }
}