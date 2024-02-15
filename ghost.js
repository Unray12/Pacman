class Ghost extends Monster {
    toleranceWallCollision = -0.001;
    direction = DIRECTION_RIGHT;
    nextDirection = DIRECTION_RIGHT;
    rotation = 0;
    speed = 1;
    activeRange = 50;
    nextDirectionMoveList = [];

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
        if (this.mainCharacter.getMapX() == this.getMapX() && this.mainCharacter.getMapY() == this.getMapY())
            gameState.current = gameState.gameOver;
    }

    pacmanInRange() {
        let xDistance = Math.abs(pacman.getMapX() - this.getMapX());
        let yDistance = Math.abs(pacman.getMapY() - this.getMapY());
        let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
        if (distance <= this.activeRange)
            return true;
        return false;
    }


    findNeighbours(graph, x, y) {
        const neighbours = [];
        if (graph[x - 1][y] !== 1) //left
            neighbours.push({x: x - 1, y: y});
        if (graph[x + 1][y] !== 1) //right
            neighbours.push({x: x + 1, y: y});
        if (graph[x][y - 1] !== 1) //up
            neighbours.push({x: x, y: y - 1});
        if (graph[x][y + 1] !== 1) //down
            neighbours.push({x: x, y: y + 1});
        
        return neighbours;
    }

    dijkstra(graph, source, target) {
        const visited = Array.from(Array(graph.length), () => Array(graph[0].length).fill(false));
        const distances = Array.from(Array(graph.length), () => Array(graph[0].length).fill(Infinity)); //init distance
        const path = [];
        distances[source.x][source.y] = 0;

        // Sử dụng priority queue để lưu trữ các ô cần thăm theo thứ tự khoảng cách
        const pq = new PriorityQueue();
        pq.enqueue(source, 0);
        
        while (!pq.isEmpty()) {
            let current = pq.dequeue();
            path.push(current);
            visited[current.x][current.y] = true;
            if (current === target) {
                break; //to reconstruct path;
            }
            const neighbours = this.findNeighbours(graph, current.x, current.y);
            for (const neighbour of neighbours) {
                if (visited[neighbour.x][neighbour.y])
                    continue;
                let alt = distances[current.x][current.y] + 1;
                if (alt < distances[neighbour.x][neighbour.y]) {
                    distances[neighbour.x][neighbour.y] = alt;
                    pq.enqueue(neighbour, alt);
                }
            }
        }
        return path;
    }

    findTargetPath() {
        const path = this.dijkstra(map, {x: this.getMapX(), y: this.getMapY()}, {x: this.mainCharacter.getMapX(), y: this.mainCharacter.getMapY()});
        for (let i = 1; i < path.length; i++) {
            if (path[i].x < path[i - 1].x)
                this.nextDirectionMoveList[i - 1] = DIRECTION_LEFT;
            else if (path[i].x > path[i - 1].x)
                this.nextDirectionMoveList[i - 1] = DIRECTION_RIGHT;
            else if (path[i].y < path[i - 1].y)
                this.nextDirectionMoveList[i - 1] = DIRECTION_UP;
            else if (path[i].y > path[i - 1].y)
                this.nextDirectionMoveList[i - 1] = DIRECTION_DOWN;
        }
    }
    updateImage() {
        // let periodUpdate = 5;
        // this.frame += (frames % periodUpdate == 0) ? 1 : 0;
        // this.frame = this.frame % 7;
        
        if (frames % 20 == 0)
            //this.nextDirection = Math.floor(Math.random() * (3 - 0 + 1) + 0);
            this.findTargetPath();
            this.nextDirection = this.nextDirectionMoveList[0];
            this.nextDirectionMoveList.shift();
        if (gameState.current == gameState.inGame) {
            this.moveProcess();
        }
        this.pacmanCollision();
    }
}