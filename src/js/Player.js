import Entity from './Entity.js';
import InputController from './InputController.js';
import Physics from './Traits/Physics.js';
import Solid from './Traits/Solid.js';

export default class Player extends Entity {
  constructor(width, height, image) {
    super();
    this.image = image;
    this.width = width;
    this.height = height;
    this.addTrait(new Solid(this));
    this.addTrait(new Physics(this));
    this.inputController = new InputController();
  }
}
