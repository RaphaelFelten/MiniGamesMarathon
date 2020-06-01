import Entity from './Entity.js';

export default class Rectangle extends Entity {
  constructor() {
    super();
    this.sides = {};
  }

  update(gameContext) {
    this.sides.left = this.pos.x;
    this.sides.right = this.pos.x + this.width;
    this.sides.top = this.pos.y;
    this.sides.bottom = this.pos.y + this.height;
    this.traits.forEach((trait) => trait.update(gameContext));
  }

  draw(gameContext) {
    if (this.image) {
        gameContext.context.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height);
    } else {
        gameContext.context.fillStyle = this.color;
        gameContext.context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
  }
}
