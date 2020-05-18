export default class Solid {
    constructor(entity) {
        this.entity = entity;
    }

    update(gameContext) {
        gameContext.world.entities.forEach((entity) => {
            if (this.collides(this.entity, entity)) {
                console.log('collided!');
                this.entity.vel.y *= -0.6;
            }
        });
    }

    collides(we, them) {
        if (we !== them && we && them) {
            if (we.pos.x + we.width >= them.pos.x &&
                we.pos.x <= them.pos.x + them.width &&
                we.pos.y + we.height >= them.pos.y &&
                we.pos.y + we.height <= them.pos.y + them.height) {
                return true;
            }
            return false;
        }
        return false;
    }

}
