export default class Obstacle {
    constructor(entity, speed) {
        this.entity = entity;
        this.speed = speed;
        this.spawnedNew = false;
    }

    update(gameContext) {
        this.entity.pos.y += -gameContext.canvas.height * this.speed * gameContext.deltaTime;
    }

}
