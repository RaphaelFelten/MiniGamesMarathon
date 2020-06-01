export default class Obstacle {
    constructor(entity, speed) {
        this.entity = entity;
        this.speed = speed;
        this.spawnedNew = false;
        this.frameCountDirChange = this.getFrameCountDirChange();
    }

    update(gameContext) {
        console.log(this.frameCountDirChange);
        this.entity.pos.y += -gameContext.canvas.height * this.speed * gameContext.deltaTime;
        this.frameCountDirChange--;
    }

    getFrameCountDirChange() {
        return Math.floor(Math.random() * 250);
    }

}
