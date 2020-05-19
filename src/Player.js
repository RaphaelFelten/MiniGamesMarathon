import Entity from './Entity.js';
import InputController from './InputController.js';
import Physics from './Traits/Physics.js';
import Solid from './Traits/Solid.js';

export default class Player extends Entity {
  constructor(image) {
    super();
    this.image = image;
    this.width = 30;
    this.height = 30;
    this.pos = { x: 50, y: 300 };
    this.vel.y = 0;
    this.acc = 50;
    this.addTrait(new Physics(this));
    this.addTrait(new Solid(this));
    this.inputController = new InputController();
    this.inputController.on('ArrowLeft', () => {
      this.move(-this.acc);
    });
    this.inputController.on('ArrowRight', () => {
      this.move(this.acc);
    });
  }

  move(dir) {
    this.vel.x += dir;
  }
}
