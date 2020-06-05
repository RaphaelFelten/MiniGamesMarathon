import * as loader from '../../loader.js';
import * as utils from '../../utils.js';
import * as entitySetup from './entitySetup.js';
import Obstacle from '../../Traits/Obstacle.js';
import Player from '../../Player.js';

let OBSTACLE_SPEED = 0.05;

export const setup = async (gameContext) => {
  const backgroundImage = await loader.loadImage(
    './assets/TheMiddleLane/background.jpg'
  );
  const playerImage = await loader.loadImage('./assets/TheMiddleLane/rocket.png');
  const obstacleImage = await loader.loadImage(
    './assets/TheMiddleLane/obstacle.jpg'
  );

  entitySetup.createPlayer(playerImage, gameContext);
  entitySetup.createObstacles(obstacleImage, OBSTACLE_SPEED, gameContext);
  utils.createBorders(gameContext);

  return { backgroundImage };
};

export const run = async (gameContext, setupData) => {
  gameContext.world.entities.forEach((entity) => {
    entity.update(gameContext);
    entity.draw(gameContext);
    if (entity.hasTrait(Obstacle)) {
      //console.log(entity.pos.y);
      if (entity.pos.y > gameContext.canvas.height && !entity.getTrait(Obstacle).spawnedNew) {
        console.log('spawn new');
        entitySetup.spawnObstacle(
          setupData.obstacleImage,
          OBSTACLE_SPEED,
          gameContext.canvas.height,
          gameContext
        );
        entity.getTrait(Obstacle).spawnedNew = true;
        gameContext.dashboard.addScore(10);
        if (
          gameContext.dashboard.score > 0 &&
          gameContext.dashboard.score % 50 == 0
        ) {
          OBSTACLE_SPEED *= 1.25;
          gameContext.world.entities.forEach((ent) =>
            ent.hasTrait(Obstacle)
              ? (ent.getTrait(Obstacle).speed = OBSTACLE_SPEED)
              : null
          );
        }
      }
      if (entity.sides.top > gameContext.canvas.height + entity.height ) {
        gameContext.world.removeEntity(entity);
      }
    }
  });
};
