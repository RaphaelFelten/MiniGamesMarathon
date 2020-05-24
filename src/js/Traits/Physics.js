import Solid from "./Solid.js";

export default class Physics {
    constructor(entity) {
        this.gravity = 1000;
        this.entity = entity;
    }

    update(gameContext) {
        this.entity.pos.x += this.entity.vel.x * gameContext.deltaTime;   
        this.entity.pos.y += this.entity.vel.y * gameContext.deltaTime;
        this.entity.vel.y += this.gravity * gameContext.deltaTime;

        if (this.entity.vel.x > 0) {
            this.entity.vel.x -= this.entity.friction;
        } else if (this.entity.vel.x < 0) {
            this.entity.vel.x += this.entity.friction;
        }
    }

}
