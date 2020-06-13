import Player from "../../Player.js";
import MiddlePhysics from "../../Traits/MiddlePhysics.js";
import Collider from "../../Traits/Collider.js";
import Obstacle from '../../Traits/Obstacle.js';
import Rectangle from "../../Rectangle.js";

const nDivisions = 8;

export function createPlayer(playerImage, gameContext) {
    const player = new Player(gameContext.canvas.width / 20, playerImage);
    player.addTrait(new MiddlePhysics(player));
    player.addTrait(new Collider(player));
    player.acc = gameContext.canvas.width / 4;
    player.friction = 250;
    player.pos.x = gameContext.canvas.width / 2 - player.width / 2;
    player.pos.y = gameContext.canvas.height - player.height * 3;
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
        spawnObstacle(obstacleImage, speed, - (i + 1) * gameContext.canvas.height / nDivisions * 2, gameContext);
    }

}

export function spawnObstacle(obstacleImage, speed, y, gameContext) {
    const spaceWidth = gameContext.canvas.width / 3;
    const w = gameContext.canvas.width;
    const oHeight = Math.floor(gameContext.canvas.height / nDivisions / 2);
    let startingPoint = (Math.random() * w) + spaceWidth;

    let oWidth = 0;
    let x = 0;
    if (startingPoint > w - spaceWidth) {
        startingPoint = w - spaceWidth;
    }

    if (startingPoint > w / 2) {
        x = 0;
        oWidth = startingPoint;
    } else {
        x = startingPoint;
        oWidth = w;
    }
    
    const obstacle = new Rectangle(obstacleImage, 8, oWidth, oHeight);
    obstacle.pos.x = x;
    obstacle.pos.y = y;
    obstacle.addTrait(new Obstacle(obstacle, -speed));
    obstacle.getTrait(Obstacle).spawnedNew = false;
    gameContext.world.addEntity(obstacle);

}