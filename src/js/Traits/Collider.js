import Obstacle from './Obstacle.js';
import Circle from '../Circle.js';
import Rectangle from '../Rectangle.js';

export default class Solid {
  constructor(entity) {
    this.entity = entity;
    this.restitution = 0.5;
  }

  collide(gameContext) {
    if (this.entity.hasTrait(Obstacle)) {
      return;
    }

    if (gameContext.world.entities.length < 2) {
      return;
    }

    const overlapsWith = gameContext.world.entities.filter(
    (entity) => this.overlap(entity));
    
    return overlapsWith;
  }

  update(gameContext) {      
  }

  overlap(entity) {
    if (this.entity instanceof Circle && entity instanceof Rectangle) {
      return (this.entity.pos.x + this.entity.width > entity.sides.left &&
          this.entity.pos.y + this.entity.height > entity.sides.top &&
          this.entity.pos.x - this.entity.width < entity.sides.right &&
          this.entity.pos.y - this.entity.height < entity.sides.bottom)
    }
  }

}
