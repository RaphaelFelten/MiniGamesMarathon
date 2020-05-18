import * as layers from '../../layers.js';
import * as loader from '../../loader.js';
import Entity from '../../Entity.js';
import Player from '../../Player.js';
import Solid from '../../Solid.js';
import Physics from '../../Physics.js';

export const setup = async (gameContext) => {
    const backgroundImage = await loader.loadImage('./assets/GoDownUnder/background.png');
    const playerImage = await loader.loadImage('./assets/mrpoopybutthole.png');
    const player = new Player(playerImage);
    const rect = new Entity('#555');
    rect.addTrait(new Solid());
    rect.width = 250;
    rect.height = 50;
    rect.pos.x = 20;
    rect.pos.y = 500;
    const rect2 = new Entity('#777');
    rect2.addTrait(new Physics(rect2));
    rect2.addTrait(new Solid());
    rect2.width = 150;
    rect2.height = 30;
    rect2.pos.x = 0;
    rect2.pos.y = 250;
    gameContext.world.addEntity(player);
    gameContext.world.addEntity(rect);
    gameContext.world.addEntity(rect2);
    return { backgroundImage, playerImage, player };
}

export const run = async (gameContext, setupData) => {
    layers.drawBackground(setupData.backgroundImage, gameContext);
    gameContext.world.entities.forEach((entity) => entity.update(gameContext));
}


