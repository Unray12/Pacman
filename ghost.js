class Ghost extends Monster {
    toleranceWallCollision = -0.001;
    direction = DIRECTION_RIGHT;
    nextDirection = DIRECTION_RIGHT;
    rotation = 0;
    speed = 1;
    constructor(mainCharacter, sX, sY, x, y, sWidth=124, sHeight=116, width=oneBlockSize, height=oneBlockSize) {
        super(mainCharacter, sX, sY, x, y, sWidth, sHeight, width, height);
        this.monsterSprite.src = "assets/images/ghost.png";
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
    }

    moveProcess() {
        this.changeDirectionIfPossible();
        this.moveForward();
        if (this.checkWallCollision())
            this.moveBackward();
    }

    pacmanCollision() {
        
    }

    updateImage() {
        // let periodUpdate = 5;
        // this.frame += (frames % periodUpdate == 0) ? 1 : 0;
        // this.frame = this.frame % 7;
        if (frames % 50 == 0)
            this.nextDirection = Math.floor(Math.random() * (3 - 0 + 1) + 0);
        if (gameState.current == gameState.inGame) {
            this.moveProcess();
        }
    }
}