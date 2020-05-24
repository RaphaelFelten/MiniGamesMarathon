import Obstacle from "./Obstacle.js";

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

    const overlapsWith = gameContext.world.entities.filter(entity => this.overlap(entity) && entity.hasTrait(Solid));
    if (overlapsWith.length < 1) {
      return;
    }

    if (this.entity.vel.x > 0) {
      overlapsWith.forEach(entity => {
        if (this.entity.sides.right > entity.sides.left &&
            this.entity.sides.right < entity.sides.left + entity.width / 2 &&
            this.entity.sides.left < entity.sides.left &&
            this.entity.sides.bottom > entity.sides.top &&
            this.entity.sides.top < entity.sides.bottom) {
          this.entity.pos.x = entity.sides.left - this.entity.width;
          this.entity.vel.x *= -this.restitution;
        }
      });
    } else if (this.entity.vel.x < 0) {
      overlapsWith.forEach(entity => {
        if (this.entity.sides.left < entity.sides.right &&
            this.entity.sides.left > entity.sides.right - entity.width / 2 &&
            this.entity.sides.right > entity.sides.right &&
            this.entity.sides.bottom > entity.sides.top &&
            this.entity.sides.top < entity.sides.bottom) {
          this.entity.pos.x = entity.sides.right;
          this.entity.vel.x *= -this.restitution;
        }
      });
    }

    if (this.entity.vel.y > 0) {
      overlapsWith.forEach(entity => {
        if (this.entity.sides.bottom > entity.sides.top &&
            this.entity.sides.bottom < entity.sides.top + entity.height / 2 &&
            this.entity.sides.top < entity.sides.top &&
            this.entity.sides.right > entity.sides.left &&
            this.entity.sides.left < entity.sides.right) {
          this.entity.pos.y = entity.sides.top - this.entity.height;
          this.entity.vel.y *= -this.restitution;
        }
      });
    } else if (this.entity.vel.y < 0) {
      overlapsWith.forEach(entity => {
        if (this.entity.sides.top < entity.sides.bottom &&
            this.entity.sides.top > entity.sides.bottom - entity.height / 2 &&
            this.entity.sides.bottom > entity.sides.bottom &&
            this.entity.sides.right > entity.sides.left &&
            this.entity.sides.left < entity.sides.right) {
          this.entity.pos.y = entity.sides.bottom;
          this.entity.vel.y *= -this.restitution;
        }
      });
    }

  }

  overlap(entity) {
    return this.entity !== entity &&
           this.entity.sides.bottom > entity.sides.top &&
           this.entity.sides.top < entity.sides.bottom &&
           this.entity.sides.right > entity.sides.left &&
           this.entity.sides.left < entity.sides.right;
  }

}
