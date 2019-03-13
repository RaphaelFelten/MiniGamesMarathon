const Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    canvasWidth = 400,
    canvasHeight = 500,
    scoreDOM = document.getElementById('score');

let engine,
    score = 0,
    vertSpeed = 2,
    vertOff = 1,
    backgroundColor,
    player,
    playerSpeed = 0.002,
    obstacles = [],
    obstacleDistanceMin = 80,
    obstacleDistanceMax = 200,
    boundLeft,
    boundRight,
    imgBackground,
    imgPlayer,
    imgObstacle;

function preload() {
    imgBackground = loadImage('src/games/goDownUnder/background.jpg');
    imgPlayer = loadImage('src/games/goDownUnder/spongebob.png');
    imgObstacle = loadImage('src/games/goDownUnder/wall.jpg');
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    engine = Engine.create();
    backgroundColor = [random(1, 255), random(1, 255), random(1, 255), 50];
    const boundOptions = {};
    boundOptions.isStatic = true;
    boundLeft = Bodies.rectangle(-15, height / 2, 30, height, boundOptions);
    boundRight = Bodies.rectangle(width + 15, height / 2, 30, height, boundOptions);
    World.add(engine.world, [boundLeft, boundRight]);
    player = new Player();
    for (let i = 0; i < 5; i++) {
        spawnObstacle();
    }
}

function draw() {
    image(imgBackground, 0, 0, canvasWidth, canvasHeight);
    background(backgroundColor);
    translate(0, -vertOff);
    Engine.update(engine);
    Body.translate(boundLeft, {
        x: 0,
        y: vertSpeed
    });
    Body.translate(boundRight, {
        x: 0,
        y: vertSpeed
    });
    player.render();
    obstacles.forEach(o => {
        if (o.bodies[0].position.y <= vertOff && o.spawnedNew === false) {
            o.spawnedNew = true;
            spawnObstacle();
            score++;
            if (score % 10 == 0) obstacleDistanceMax -= 5;
            if (score % 50 == 0) {
                vertSpeed += 0.5;
                backgroundColor = [random(1, 255), random(1, 255), random(1, 255), 50];
            }
            scoreDOM.textContent = score;
        }
        o.render();
    });
    vertOff += vertSpeed;
    if (keyIsDown(LEFT_ARROW)) {
        player.move(-playerSpeed);
    } else if (keyIsDown(RIGHT_ARROW)) {
        player.move(playerSpeed);
    }
}

// spawn new obstacle
function spawnObstacle() {
    let h = obstacles.length < 1 ? 0 : obstacles[obstacles.length - 1].bodies[0].position.y + random(obstacleDistanceMin, obstacleDistanceMax);
    obstacles.push(new Obstacle(h));
}
