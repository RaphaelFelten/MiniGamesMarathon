import Player from "../Player.js";

export default class Physics {
    constructor(entity) {
        this.gravity = 500;
        this.entity = entity;
    }

    update(gameContext) {
        const center = gameContext.canvas.width / 2;

        this.entity.pos.x += this.entity.vel.x * gameContext.deltaTime;   
        this.entity.pos.y += this.entity.vel.y * gameContext.deltaTime;

        if (this.entity.pos.x < center) {
            this.entity.vel.x += this.gravity * gameContext.deltaTime;
        } else {
            this.entity.vel.x -= this.gravity * gameContext.deltaTime;
        }
        
        if (!gameContext.world.entities.filter(ent => ent instanceof Player)[0].inputController.isActive()) {
            if (Math.floor(this.entity.vel.x) > 0 && this.entity.pos.x < center) {
                this.entity.vel.x -= this.entity.friction * gameContext.deltaTime;
            } else if (Math.ceil(this.entity.vel.x) < 0  && this.entity.pos.x > center) {
                this.entity.vel.x += this.entity.friction * gameContext.deltaTime;
            }
        }

    }

}
