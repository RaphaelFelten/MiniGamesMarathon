const canvasWidth = 400;
const canvasHeight = 500;
const scoreDOM = document.getElementById('score');

let obstacleSpeed = -1;

let score = 0;

let player;
let obstacles = [];

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    player = new Player();
    for (let i = 0; i < 5; i++) {
        obstacles.push(new Obstacle(500 - i * 100));
    }
}

function draw() {
    background(30);
    if (player.gameOver()) {
        resetGame();
    }
    obstacles.forEach(o => {
        o.render();
        o.update();
        // if obstacle has reached the top, spawn a new one
        // and when it's offscreen, delete it from the array
        if (o.pos.y <= 0 && !o.spawnedNew) {
            score++;
            scoreDOM.textContent = score;
            obstacles.push(new Obstacle());
            o.spawnedNew = true;
            obstacles = obstacles.filter(oo => !oo.offScreen());
            obstacleSpeed += -0.05;
            obstacles.forEach(oo => oo.vel.y = obstacleSpeed);
        }
        player.collidesWith(o);
    });
    player.update();
    player.render();
    if (keyIsDown(LEFT_ARROW)) {
        player.move(-1);
    } else if (keyIsDown(RIGHT_ARROW)) {
        player.move(1);
    }
}

function resetGame() {
    obstacleSpeed = -1;
    player.y = 20;
    score = 0;
    scoreDOM.textContent = score;
}
