export default class Solid {
  constructor(entity) {
    this.entity = entity;
  }

  update(gameContext) {
    if (gameContext.world.entities.length < 2) {
      return;
    }
    const overlapsWith = gameContext.world.entities.filter(entity => this.overlap(entity));
    if (overlapsWith.length > 0) {
      //console.log(this.entity, overlapsWith);
      overlapsWith.forEach((entity) => {
          const collides = this.collides(entity);
      });
    }
  }

  overlap(entity) {
    return this.entity.sides.bottom > entity.sides.top &&
           this.entity.sides.top < entity.sides.bottom &&
           this.entity.sides.right > entity.sides.left &&
           this.entity.sides.left < entity.sides.right;
  }

  collides(entity) {
    //console.log(us, entity);
    if (this.entity && entity) {
      if (this.entity.vel.x > 0) {
        if (this.entity.sides.right >= entity.sides.left) {
          this.entity.pos.x = entity.sides.left;
        }
      } else if (this.entity.vel.x < 0) {
        if (this.entity.sides.left <= entity.sides.right) {
          console.log('collision left', this.entity);
        }
      }
    }
    return null;
  }
}
