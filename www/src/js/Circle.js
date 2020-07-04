import Entity from './Entity.js';

export default class Circle extends Entity {
  constructor(r) {
    super();
    this.width = r;
    this.height = r;
  }

  draw(gameContext) {
    if (this.image) {
      gameContext.context.drawImage(this.image, this.pos.x - this.width, this.pos.y - this.height, this.width * 2, this.height * 2);
    } else {
      gameContext.context.beginPath();
      gameContext.context.arc(this.pos.x, this.pos.y, this.width, 0, 2 * Math.PI);
      gameContext.context.fill();
      gameContext.context.fillStyle = '#e5a';
      gameContext.context.fillRect(this.pos.x - 5, this.pos.y - 5, 10, 10);
    }
  }
}
