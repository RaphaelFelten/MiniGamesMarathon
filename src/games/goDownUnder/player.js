const playerConfig = {
    startX: 400 / 2,
    startY: 50,
    size: 20
}

class Player {
    constructor() {
        this.pos = createVector(playerConfig.startX, playerConfig.startY);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0.2);
        this.size = playerConfig.size;
        this.horizontalSpeed = 5;
    }
    render() {
        fill(150, 200, 255);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size * 2);
    }
    update() {
        this.vel.add(this.acc);
        this.vel.limit(5);
        this.pos.add(this.vel);
    }
    collidesWith(obstacle) {
        let rectcoll = this.pos.y + this.size >= obstacle.pos.y && this.pos.y - this.size <= obstacle.pos.y + obstacle.height;
        let ingap = this.pos.x - this.size >= obstacle.gap.pos && this.pos.x - this.size <= obstacle.gap.pos + obstacle.gap.width;
        if (rectcoll && ingap) {
            this.acc.y = 0.2;
        } else if (rectcoll && !ingap) {
            this.acc.y = 0;
            this.vel.y = obstacle.vel.copy().y;
        }
    }
    move(dir) {
        this.pos.x += dir * this.horizontalSpeed;
    }
    gameOver() {
        return (this.pos.y <= 0 || this.pos.y >= 500);
    }
}
