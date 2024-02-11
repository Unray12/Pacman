class Ghost extends Monster {

    constructor(sX, sY, x, y, sWidth=124, sHeight=116, width=oneBlockSize, height=oneBlockSize) {
        super(sX, sY, x, y, sWidth, sHeight, width, height);
        this.monsterSprite.src = "assets/images/ghost.png";
    }
}