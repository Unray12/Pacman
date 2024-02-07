class Pacman {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    speed = 0;
    source = "assets/images/animations.gif";
    frame = 0;
    animationImg = [];
    pacImg = new Image();

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.pacImg.src = this.source;
    }
    draw() {
        canvasContex.drawImage(img, this.frame * oneBlockSize, 0, oneBlockSize, oneBlockSize, 
            this.x, this.y, oneBlockSize, oneBlockSize);
    }
    updateImage() {
        let periodUpdate = 5;
        this.frame += (frames % periodUpdate == 0) ? 1 : 0;
        this.frame = this.frame % 7;
    }
}