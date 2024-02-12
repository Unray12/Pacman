class Monster {
    sX = 0;
    sY = 0;
    x = 0;
    y = 0;
    sWidth = 0;
    sHeight = 0;
    width = 0;
    height =0;
    monsterSprite = new Image();

    constructor(mainCharacter, sX, sY, x, y, sWidth, sHeight, width, height) {
        this.sX = sX;
        this.sY = sY;
        this.x = x;
        this.y = y;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
        this.width = width;
        this.height = height;
        this.mainCharacter = mainCharacter;
    }

    draw() {
        canvasContex.drawImage(this.monsterSprite, this.sX, this.sY, this.sWidth, this.sHeight, 
            this.x, this.y, this.width, this.height);
    }
}