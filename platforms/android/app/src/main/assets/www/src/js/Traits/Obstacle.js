export default class Obstacle {
    constructor(entity, speed) {
        this.entity = entity;
        this.speed = speed;
        this.dir = 1;
        this.spawnedNew = false;
        this.obstacleLeft = null;
        this.maxFrameCountDirChange = 150;
        this.frameCountDirChange = this.getFrameCountDirChange();
    }

    update(gameContext) {
        if (this.obstacleLeft) {
            if (this.frameCountDirChange == 0 || 
                (this.obstacleLeft.pos.x + this.obstacleLeft.width <= 0 && this.dir === -1) ||
                (this.entity.pos.x >= gameContext.canvas.width && this.dir === 1)) {
                this.frameCountDirChange = this.getFrameCountDirChange();
                this.dir *= -1;
            } else {
                this.entity.pos.x += gameContext.canvas.height * this.speed * gameContext.deltaTime * this.dir;
                this.obstacleLeft.pos.x += gameContext.canvas.height * this.speed * gameContext.deltaTime * this.dir;
                this.frameCountDirChange--;
            }
        }
        
        this.entity.pos.y += -gameContext.canvas.height * this.speed * gameContext.deltaTime;
    }

    getFrameCountDirChange() {
        return Math.floor(Math.random() * this.maxFrameCountDirChange);
    }

}
