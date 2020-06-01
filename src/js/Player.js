import InputController from './InputController.js';
import Physics from './Traits/Physics.js';
import Solid from './Traits/Solid.js';
import Circle from './Circle.js';
import Rotater from './Traits/Rotater.js';

export default class Player extends Circle {
  constructor(r, image) {
    super(r);
    this.image = image;
    this.addTrait(new Solid(this));
    this.addTrait(new Physics(this));
    this.addTrait(new Rotater(this));
    this.inputController = new InputController();
  }

  draw() {}
}
