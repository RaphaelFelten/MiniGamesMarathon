export default class Rotater {
    constructor(entity) {
        this.entity = entity;
    }

    update(gameContext) {
        gameContext.context.save();
        gameContext.context.translate(this.entity.pos.x, this.entity.pos.y);
        gameContext.context.rotate(this.entity.pos.x * 1.75 * Math.PI / 180);
        gameContext.context.drawImage(this.entity.image,
                                      - this.entity.width,
                                      - this.entity.height,
                                      this.entity.width * 2,
                                      this.entity.height * 2);
        gameContext.context.restore();
    }

}