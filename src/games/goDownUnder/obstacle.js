class Obstacle {
    constructor(_y) {
        this.h = 30;
        this.y = _y || height + this.h / 2;
        this.gapWidth = width / 7;
        this.gapX = floor(random(20, width - this.gapWidth - 20));
        const options = {};
        options.isStatic = true;
        this.bodies = [];
        this.bodies.push(Bodies.rectangle(this.gapX / 2, this.y, this.gapX, this.h, options));
        this.bodies.push(Bodies.rectangle(width - ((width - this.gapX - this.gapWidth) / 2), this.y, width - this.gapX - this.gapWidth, this.h, options));
        console.log(this.bodies);
        World.add(engine.world, this.bodies);
        this.spawnedNew = false;
    }

    render() {
        fill(255, 50, 70);
        noStroke();
        this.bodies.forEach(body => {
            beginShape();
            body.vertices.forEach(v => vertex(v.x, v.y));
            endShape(CLOSE);
        });
    }
    offScreen() {
        return this.pos.y <= -this.height;
    }
}
