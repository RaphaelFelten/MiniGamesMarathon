import * as layers from '../../layers.js';
import * as loader from '../../loader.js';
import Entity from '../../Entity.js';
import Player from '../../Player.js';
import Solid from '../../Traits/Solid.js';
import Physics from '../../Traits/Physics.js';

export const setup = async (gameContext) => {
  const backgroundImage = await loader.loadImage(
    './assets/GoDownUnder/background.png'
  );
  const playerImage = await loader.loadImage('./assets/mrpoopybutthole.png');
  const player = new Player(playerImage);

  const borderLeft = new Entity('#000');
  borderLeft.addTrait(new Solid(borderLeft));
  borderLeft.width = 50;
  borderLeft.height = gameContext.canvas.height;
  borderLeft.pos.x = -50;
  borderLeft.pos.y = 0;

  const borderTop = new Entity('#000');
  borderTop.addTrait(new Solid(borderTop));
  borderTop.width = gameContext.canvas.width;
  borderTop.height = 50;
  borderTop.pos.x = 0;
  borderTop.pos.y = -50;

  const borderRight = new Entity('#000');
  borderRight.addTrait(new Solid(borderRight));
  borderRight.width = 50;
  borderRight.height = gameContext.canvas.height;
  borderRight.pos.x = gameContext.canvas.width;
  borderRight.pos.y = 0;

  const borderBottom = new Entity('#000');
  borderBottom.addTrait(new Solid(borderBottom));
  borderBottom.width = gameContext.canvas.width;
  borderBottom.height = 50;
  borderBottom.pos.x = 0;
  borderBottom.pos.y = gameContext.canvas.height;

  const rect2 = new Entity('#000');
  rect2.addTrait(new Solid(rect2));
  rect2.addTrait(new Physics(rect2));
  rect2.width = 100;
  rect2.height = 50;
  rect2.pos.x = 200;
  rect2.pos.y = 400;

  gameContext.world.addEntity(player);
  gameContext.world.addEntity(borderLeft);
  gameContext.world.addEntity(borderTop);
  gameContext.world.addEntity(borderRight);
  gameContext.world.addEntity(borderBottom);
  gameContext.world.addEntity(rect2);
  return { backgroundImage, playerImage, player };
};

export const run = async (gameContext, setupData) => {
  layers.drawBackground(setupData.backgroundImage, gameContext);
  gameContext.world.entities.forEach((entity) => entity.update(gameContext));
};
