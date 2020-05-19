export default class Solid {
  constructor(entity) {
    this.entity = entity;
  }

  update(gameContext) {
    gameContext.world.entities.forEach((entity) => {
      const collides = this.collides(this.entity, entity);
      if (collides !== null) console.log(collides);
      if (collides == 'left' || collides == 'right') this.entity.vel.x = this.entity.vel.x * -1 - entity.vel.x;
      if (collides == 'top' || collides == 'bottom') this.entity.vel.y = this.entity.vel.y * -1 - entity.vel.y;
    });
  }

  collides(us, them) {
    if (us !== them && us && them) {
      const top = us.pos.y + us.height > them.pos.y &&
                  us.pos.y < them.pos.y &&
                  us.pos.x + us.width > them.pos.x &&
                  us.pos.x < them.pos.x + them.width;
      const right = us.pos.x < them.pos.x + them.width &&
                    us.pos.x > them.pos.x + them.width &&
                    us.pos.y + us.height > them.pos.y &&
                    us.pos.y + us.height < them.pos.y + them.height;
      const bottom = us.pos.y < them.pos.y + them.height &&
                     us.pos.y > them.pos.y &&
                     us.pos.x < them.pos.x + them.width &&
                     us.pos.x > them.pos.x;
      const left = us.pos.x + us.width > them.pos.x &&
                   us.pos.x < them.pos.x &&
                   us.pos.y + us.height > them.pos.y &&
                   us.pos.y + us.height < them.pos.y + them.height;
      if (top) return 'top';
      if (right) return 'right';
      if (bottom) return 'bottom';
      if (left) return 'left';
    }
    return null;
  }
}
