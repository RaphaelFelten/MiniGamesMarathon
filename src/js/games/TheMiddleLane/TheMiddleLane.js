import * as loader from '../../loader.js';
import * as entitySetup from './entitySetup.js';
import Obstacle from '../../Traits/Obstacle.js';
import Collider from "../../Traits/Collider.js";
import Player from '../../Player.js';

let OBSTACLE_SPEED = 0.1;

export const setup = async (gameContext) => {
  const backgroundImage = await loader.loadImage(
    './assets/TheMiddleLane/background.png'
  );
  const playerImage = await loader.loadImage('./assets/TheMiddleLane/rocket.png');
  const obstacleImage = await loader.loadImage(
    './assets/shared/asteroid_01.png'
  );

  entitySetup.createPlayer(playerImage, gameContext);
  entitySetup.createObstacles(obstacleImage, OBSTACLE_SPEED, gameContext);

  return { backgroundImage, obstacleImage };
};

export const run = async (gameContext, setupData) => {
  gameContext.world.entities.forEach((entity) => {
    entity.update(gameContext);
    entity.draw(gameContext);
    if (entity.hasTrait(Obstacle)) {
      if (entity.pos.y > gameContext.canvas.height && !entity.getTrait(Obstacle).spawnedNew) {
        entitySetup.spawnObstacle(
          setupData.obstacleImage,
          OBSTACLE_SPEED,
          -entity.height,
          gameContext
        );
        entity.getTrait(Obstacle).spawnedNew = true;
        gameContext.dashboard.addScore(10);
        if (
          gameContext.dashboard.score > 0 &&
          gameContext.dashboard.score % 50 == 0
        ) {
          OBSTACLE_SPEED *= 1.05;
          gameContext.world.entities.forEach((ent) =>
            ent.hasTrait(Obstacle)
              ? (ent.getTrait(Obstacle).speed = -OBSTACLE_SPEED)
              : null
          );
        }
      }
      if (entity.sides.top > gameContext.canvas.height) {
        gameContext.world.removeEntity(entity);
      }
    }
    if (entity instanceof Player) {
      if (entity.pos.x < 0 || entity.pos.x > gameContext.canvas.width) {
        gameContext.gameRunner.runNext();
      }
      if (entity.getTrait(Collider).collide(gameContext).length > 0) {
        gameContext.gameRunner.runNext();
      }
    }
  });
};
