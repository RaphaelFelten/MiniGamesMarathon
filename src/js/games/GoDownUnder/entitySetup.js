import Player from "../../Player.js";
import Entity from "../../Entity.js";
import Solid from "../../Traits/Solid.js";
import Obstacle from '../../Traits/Obstacle.js';
import Rotater from "../../Traits/Rotater.js";

const nDivisions = 12;

export function createPlayer(playerImage, gameContext) {
    const player = new Player(gameContext.canvas.width / 10, gameContext.canvas.width / 10, playerImage);
    player.acc = gameContext.canvas.width / 3;
    player.friction = player.acc / 30;
    player.pos.x = gameContext.canvas.width / 2 - player.width / 2;
    player.pos.y = 0;
    player.addTrait(new Rotater(player));
    player.inputController.on('ArrowLeft', () => {
        player.vel.x -= player.acc;
    });
    player.inputController.on('ArrowRight', () => {
        player.vel.x += player.acc;
    });
    gameContext.world.addEntity(player);
}

export function createObstacles(obstacleImage, speed, gameContext) {  
    for (let i = 0; i < nDivisions / 2; i++) {
        spawnObstacle(obstacleImage, speed, (i + 1) * gameContext.canvas.height / nDivisions * 2, gameContext);
    }
}

export function spawnObstacle(obstacleImage, speed, y, gameContext) {
    const spaceWidth = gameContext.canvas.width / 6;
    const w = gameContext.canvas.width;
    const h = Math.floor(gameContext.canvas.height / nDivisions / 1.5);

    const obstacleLeft = new Entity('#000');
    obstacleLeft.pos.y = y;
    obstacleLeft.width = Math.floor(Math.random() * w - spaceWidth);
    obstacleLeft.height = h;
    obstacleLeft.image = obstacleImage;
    obstacleLeft.addTrait(new Solid(obstacleLeft));
    obstacleLeft.addTrait(new Obstacle(obstacleLeft, speed));
    obstacleLeft.getTrait(Obstacle).spawnedNew = true;
    gameContext.world.addEntity(obstacleLeft);

    const obstacleRight = new Entity('#000');
    obstacleRight.pos.y = y;
    obstacleRight.pos.x = obstacleLeft.width > 0 ? obstacleLeft.width + spaceWidth : spaceWidth;
    obstacleRight.width = w;
    obstacleRight.height = h;
    obstacleRight.image = obstacleImage;
    obstacleRight.addTrait(new Solid(obstacleRight));
    obstacleRight.addTrait(new Obstacle(obstacleRight, speed));
    gameContext.world.addEntity(obstacleRight);
}