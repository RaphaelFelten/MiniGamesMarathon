import InputController from './InputController.js';
import Physics from './Traits/Physics.js';
import Solid from './Traits/Solid.js';
import Rotater from './Traits/Rotater.js';
import Circle from './Circle.js';

export default class Player extends Circle {
  constructor(r, image) {
    super(r);
    this.image = image;
    this.addTrait(new Solid(this));
    this.inputController = new InputController();
  }

  draw(gameContext) {
    if (!this.hasTrait(Rotater)) {
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
}
