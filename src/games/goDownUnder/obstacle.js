class Obstacle {
    constructor(y, vel) {
        this.pos = createVector(0, y || 500);
        this.width = 400;
        this.height = 20;
        this.vel = createVector(0, obstacleSpeed);
        this.spawnedNew = false;
        this.gap = {
            width: 100,
            pos: floor(random(20, this.width - 100 - 20))
        }
    }
    render() {
        fill(255, 50, 70);
        noStroke();
        rect(this.pos.x, this.pos.y, this.gap.pos, this.height);
        rect(this.gap.pos + this.gap.width, this.pos.y, this.width - this.gap.pos - this.gap.width, this.height);
    }
    update() {
        this.pos.y += this.vel.y;
    }
    offScreen() {
        return this.pos.y <= -this.height;
    }
}
