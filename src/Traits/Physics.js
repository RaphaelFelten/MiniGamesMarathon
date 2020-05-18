export default class Physics {
    constructor(entity) {
        this.gravity = 500;
        this.entity = entity;
    }

    update(gameContext) {
        this.entity.pos.x += this.entity.vel.x * gameContext.deltaTime;
        this.entity.pos.y += this.entity.vel.y * gameContext.deltaTime;
        this.entity.vel.y += this.gravity * gameContext.deltaTime;
    }

}
