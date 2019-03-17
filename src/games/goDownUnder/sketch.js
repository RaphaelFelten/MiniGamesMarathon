const Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    canvasWidth = 400,
    canvasHeight = 500,
    scoreDOM = document.getElementById('score');

let engine,
    score = 0,
    vertSpeed = 3,
    vertOff = 1,
    player,
    playerSpeed = 0.002,
    obstacles = [],
    obstacleColor,
    obstacleDistanceMin = 80,
    obstacleDistanceMax = 200,
    boundLeft,
    boundRight,
    imgBackground,
    imgPlayer,
    imgObstacle;

// continue to game from start screen
document.getElementById('continue').addEventListener('click', (e) => {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
});

// start game
document.getElementById('start_game').addEventListener('click', (e) => {
    loop();
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
});

// preloading some assets
function preload() {
    imgBackground = loadImage('src/games/goDownUnder/background.png');
    imgPlayer = loadImage('src/games/goDownUnder/mrpoopybutthole.png');
    imgObstacle = loadImage('src/games/goDownUnder/obstacle.jpg');
}

// set up the game environment
function setup() {
    noLoop();
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.elt.style.left = ((window.innerWidth - canvasWidth) / 2) + 'px';
    engine = Engine.create();
    obstacleColor = [random(1, 255), random(1, 255), random(1, 255), 70];
    const boundOptions = {};
    boundOptions.isStatic = true;
    boundLeft = Bodies.rectangle(-50, height / 2, 100, height, boundOptions);
    boundRight = Bodies.rectangle(width + 50, height / 2, 100, height, boundOptions);
    World.add(engine.world, [boundLeft, boundRight]);
    player = new Player();
    for (let i = 0; i < 5; i++) {
        spawnObstacle();
    }
}

// game loop
function draw() {
    background(0);
    image(imgBackground, -100, 0);
    translate(0, -vertOff);
    Engine.update(engine);
    // game over
    if (player.body.position.y + player.r <= vertOff || player.body.position.y - player.r >= vertOff + canvasHeight) {
        noLoop();
    }
    player.render();
    obstacles.forEach(o => {
        if (o.bodies[0].position.y <= vertOff && o.spawnedNew === false) {
            o.spawnedNew = true;
            spawnObstacle();
            setTimeout(() => {
                World.remove(engine.world, o.bodies);
                obstacles = obstacles.filter(obs => obs !== o);
            }, 1000);
            score++;
            if (score % 10 == 0) obstacleDistanceMax -= 3;
            if (score % 50 == 0) {
                vertSpeed += 1;
                obstacleColor = [random(1, 255), random(1, 255), random(1, 255), 70];
            }
            scoreDOM.textContent = score;
        }
        o.render();
    });
    if (frameCount % 2 == 0) {
        Body.translate(boundLeft, {
            x: 0,
            y: vertSpeed
        });
        Body.translate(boundRight, {
            x: 0,
            y: vertSpeed
        });
        vertOff += vertSpeed;
    }
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
