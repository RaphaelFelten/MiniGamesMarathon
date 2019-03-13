class Obstacle {
    constructor(_y) {
        this.h = 30;
        this.y = _y || height + this.h / 2;
        this.gapWidth = width / 7;
        this.gapX = floor(random(20, width - this.gapWidth - 20));
        const options = {};
        options.isStatic = true;
        options.friction = 0.3;
        this.bodies = [];
        this.bodies.push(Bodies.rectangle(this.gapX / 2, this.y, this.gapX, this.h, options));
        this.bodies.push(Bodies.rectangle(width - ((width - this.gapX - this.gapWidth) / 2), this.y, width - this.gapX - this.gapWidth, this.h, options));
        World.add(engine.world, this.bodies);
        this.spawnedNew = false;
    }

    render() {
        fill(obstacleColor);
        noStroke();
        this.bodies.forEach(body => {
            image(imgObstacle, body.vertices[0].x, body.vertices[0].y, body.vertices[1].x - body.vertices[0].x, this.h);
            beginShape();
            body.vertices.forEach(v => vertex(v.x, v.y));
            endShape(CLOSE);
        });
    }
    offScreen() {
        return this.pos.y <= -this.height;
    }
}
