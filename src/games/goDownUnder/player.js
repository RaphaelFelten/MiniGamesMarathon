class Player {
    constructor() {
        this.r = 20;
        const options = {};
        options.restitution = 0.3;
        options.friction = 0.3;
        this.body = Bodies.circle(width / 2, this.r * 2, this.r, options);
        World.add(engine.world, this.body);
    }
    render() {
        //fill(150, 200, 255);
        //noStroke();
        //ellipse(this.body.position.x, this.body.position.y, this.r * 2);
        push();
        imageMode(CENTER);
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        image(imgPlayer, 0, 0, this.r * 2 - 5, this.r * 2 - 5);
        pop();
    }
    move(dir) {
        let force = dir * this.body.mass;
        Body.applyForce(this.body, this.body.position, {
            x: force,
            y: 0
        });
    }
}
