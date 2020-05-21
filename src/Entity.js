export default class Entity {
    constructor(color) {
        this.pos = { x: 0, y: 0 };
        this.vel = { x: 0, y: 0 };
        this.width = 0;
        this.height = 0;
        this.acc = 0;
        this.friction = 0;
        this.image = null;
        this.traits = [];
        this.color = color;
        this.sides = {};
    }

    update(gameContext) {
        this.sides.left = this.pos.x;
        this.sides.right = this.pos.x + this.width;
        this.sides.top = this.pos.y;
        this.sides.bottom = this.pos.y + this.height;
        this.traits.forEach((trait) => trait.update(gameContext));
        if (this.image) {
            gameContext.context.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height);
        } else {
            gameContext.context.fillStyle = this.color;
            gameContext.context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        }

    }

    addTrait(trait) {
        this.traits.push(trait);
    }

}
