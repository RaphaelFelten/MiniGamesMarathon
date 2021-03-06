import * as loader from '../../loader.js';
import * as utils from '../../utils.js';
import * as entitySetup from './entitySetup.js';
import Obstacle from '../../Traits/Obstacle.js';
import Player from '../../Player.js';

let OBSTACLE_SPEED = 0.1;

export const setup = async (gameContext) => {
  const titleScreenJson = await loader.loadJson('src\\js\\games\\GoDownUnder\\titleScreen.json');
  const backgroundImage = await loader.loadImage(
    './assets/GoDownUnder/background.png'
  );
  const playerImage = await loader.loadImage('./assets/GoDownUnder/mrpoopybutthole.png');
  const obstacleImage = await loader.loadImage(
    './assets/GoDownUnder/obstacle.jpg'
  );

  entitySetup.createPlayer(playerImage, gameContext);
  entitySetup.createObstacles(obstacleImage, OBSTACLE_SPEED, gameContext);
  utils.createBorders(gameContext, true, false, true, false);

  return { backgroundImage, obstacleImage, titleScreenJson };
};

export const run = async (gameContext, setupData) => {
  gameContext.world.entities.forEach((entity) => {
    entity.update(gameContext);
    entity.draw(gameContext);
    if (entity.hasTrait(Obstacle)) {
      if (entity.pos.y < 0 && !entity.getTrait(Obstacle).spawnedNew) {
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
          OBSTACLE_SPEED *= 1.05;
          gameContext.world.entities.forEach((ent) =>
            ent.hasTrait(Obstacle)
              ? (ent.getTrait(Obstacle).speed = OBSTACLE_SPEED)
              : null
          );
        }
      }
      if (entity.sides.bottom < 0) {
        gameContext.world.removeEntity(entity);
      }
    }

    if (entity instanceof Player) {
      if (
        entity.pos.y - entity.height < 0 ||
        entity.pos.y + entity.height > gameContext.canvas.height
      ) {
        gameContext.gameRunner.runNext();
      }
    }
  });
};
