import Solid from "./Traits/Solid.js";
import Entity from "./Entity.js";

export function createBorders(gameContext, left=true, top=true, right=true, bottom=true) {
    if (left) {
        const borderLeft = new Entity('#000');
        borderLeft.addTrait(new Solid(borderLeft));
        borderLeft.width = 50;
        borderLeft.height = gameContext.canvas.height;
        borderLeft.pos.x = -50;
        borderLeft.pos.y = 0;
        gameContext.world.addEntity(borderLeft);
    }

    if (top) {
        const borderTop = new Entity('#000');
        borderTop.addTrait(new Solid(borderTop));
        borderTop.width = gameContext.canvas.width;
        borderTop.height = 50;
        borderTop.pos.x = 0;
        borderTop.pos.y = -50;
        gameContext.world.addEntity(borderTop);
    }

    if (right) {
        const borderRight = new Entity('#000');
        borderRight.addTrait(new Solid(borderRight));
        borderRight.width = 50;
        borderRight.height = gameContext.canvas.height;
        borderRight.pos.x = gameContext.canvas.width;
        borderRight.pos.y = 0;
        gameContext.world.addEntity(borderRight);
    }

    if (bottom) {
        const borderBottom = new Entity('#fff');
        borderBottom.addTrait(new Solid(borderBottom));
        borderBottom.width = gameContext.canvas.width;
        borderBottom.height = 50;
        borderBottom.pos.x = 0;
        borderBottom.pos.y = gameContext.canvas.height;
        gameContext.world.addEntity(borderBottom);
    }
    
}