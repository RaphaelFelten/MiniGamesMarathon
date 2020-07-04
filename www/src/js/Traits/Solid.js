import Obstacle from './Obstacle.js';
import Circle from '../Circle.js';
import Rectangle from '../Rectangle.js';

export default class Solid {
  constructor(entity) {
    this.entity = entity;
    this.restitution = 0.5;
  }

  update(gameContext) {
    if (this.entity.hasTrait(Obstacle)) {
      return;
    }

    if (gameContext.world.entities.length < 2) {
      return;
    }

    const overlapsWith = gameContext.world.entities.filter(
      (entity) => this.overlap(entity) && entity.hasTrait(Solid)
    );
    
    if (overlapsWith.length < 1) {
      return;
    }

    overlapsWith.forEach((entity) => {
      if (this.entity instanceof Circle && entity instanceof Rectangle) {
        this.circleWithRectHandleX(this.entity, entity);
        this.circleWithRectHandleY(this.entity, entity);
      }
    });
      
  }

  overlap(entity) {
    if (this.entity instanceof Circle && entity instanceof Rectangle) {
      return (this.entity.pos.x + this.entity.width > entity.sides.left &&
          this.entity.pos.y + this.entity.height > entity.sides.top &&
          this.entity.pos.x - this.entity.width < entity.sides.right &&
          this.entity.pos.y - this.entity.height < entity.sides.bottom)
    }
  }

  circleWithRectHandleX(c, r) {
    if (c.pos.x + c.width > r.sides.left &&
        c.pos.x < r.sides.right &&
        c.pos.y + c.height > r.sides.top &&
        c.pos.y - c.height < r.sides.bottom &&
        c.pos.x < r.sides.left) {
      if (c.vel.x > 0) {
        c.vel.x *= - this.restitution;
      }
      
    } else if (c.pos.x - c.width < r.sides.right &&
      c.pos.x > r.sides.left &&
      c.pos.y + c.height > r.sides.top &&
      c.pos.y - c.height < r.sides.bottom &&
      c.pos.x > r.sides.right) {
      if (c.vel.x < 0) {
        c.vel.x *= - this.restitution;
      }
    }
  }

  circleWithRectHandleY(c, r) {
    if (c.pos.y + c.height > r.sides.top &&
        c.pos.y < r.sides.bottom &&
        c.pos.x > r.sides.left &&
        c.pos.x < r.sides.right) {
      c.vel.y *= - this.restitution;
      c.pos.y = r.sides.top - c.height;
    } else if (c.pos.y - c.height < r.sides.bottom &&
      c.pos.y > r.sides.bottom &&
      c.pos.x > r.sides.left &&
      c.pos.x < r.sides.right) {
      if (c.vel.y < 0) {
        c.vel.y *= - this.restitution;
      }
    }
  }

  rectWithCirclehandleX(r, c) {

  }

  rectWithCircleHandleY(r, c) {

  }
}
