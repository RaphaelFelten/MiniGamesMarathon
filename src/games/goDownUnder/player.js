class Player {
    constructor() {
        this.r = 20;
        const options = {};
        options.restitution = 0.5;
        this.body = Bodies.circle(width / 2, this.r * 2, this.r, options);
        World.add(engine.world, this.body);
    }
    render() {
        fill(150, 200, 255);
        noStroke();
        ellipse(this.body.position.x, this.body.position.y, this.r * 2);
    }
    move(dir) {
        //this.pos.x += dir * this.horizontalSpeed;
        let force = (dir * this.body.mass);
        Body.applyForce(this.body, this.body.position, {
            x: force,
            y: 0
        });
    }
    gameOver() {
        return (this.pos.y <= 0 || this.pos.y >= 500);
    }
}
