export default class Solid {
  constructor(entity) {
    this.entity = entity;
  }

  update(gameContext) {
    gameContext.world.entities.forEach((entity) => {
      if (this.collides(this.entity, entity)) {
        console.log('collided!');
        this.entity.vel.y = 0;
      }
    });
  }

  collides(we, them) {
    if (we !== them && we && them) {
      const top = we.pos.y + we.height >= them.pos.y;
      const right = we.pos.x <= them.pos.x + them.width;
      const bottom = we.pos.y <= them.pos.y + them.height;
      const left = we.pos.x + we.width >= them.pos.x;
      if (top && right && bottom && left) {
        return true;
      }
      return false;
    }
    return false;
  }
}
