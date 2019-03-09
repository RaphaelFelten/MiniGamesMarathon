const Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    canvasWidth = 400,
    canvasHeight = 500,
    scoreDOM = document.getElementById('score');

let engine,
    score = 0,
    vertSpeed = 1,
    boundOff = {
        x: 0,
        y: vertSpeed
    },
    vertOff = 1,
    player,
    obstacles = [],
    boundLeft,
    boundRight;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    engine = Engine.create();
    const boundOptions = {};
    boundOptions.isStatic = true;
    boundLeft = Bodies.rectangle(-15, height / 2, 30, height, boundOptions);
    boundRight = Bodies.rectangle(width + 15, height / 2, 30, height, boundOptions);
    World.add(engine.world, [boundLeft, boundRight]);
    player = new Player();
    for (let i = 0; i < 5; i++) {
        obstacles.push(new Obstacle(height + i * random(90, 140)));
    }
}

function draw() {
    background(30);
    translate(0, -vertOff);
    Engine.update(engine);
    Body.translate(boundLeft, boundOff);
    Body.translate(boundRight, boundOff);
    player.render();
    obstacles.forEach(o => o.render());
    vertOff += vertSpeed;
    if (keyIsDown(LEFT_ARROW)) {
        player.move(-0.001);
    } else if (keyIsDown(RIGHT_ARROW)) {
        player.move(0.001);
    }
}
