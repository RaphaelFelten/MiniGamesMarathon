import Entity from './Entity.js';
import * as layers from './layers.js';

export default class Rectangle extends Entity {
  constructor(spriteSheet, nSpriteSheetDivisions, w, h) {
    super();
    this.width = w;
    this.height = h;
    this.spriteSheet = spriteSheet;
    this.nSpriteSheetDivisions = nSpriteSheetDivisions;
    this.sides = {};
    if (this.spriteSheet) {
      this.tiles = [...this.setRandomTiles()];
    }
  }

  update(gameContext) {
    this.sides.left = this.pos.x;
    this.sides.right = this.pos.x + this.width;
    this.sides.top = this.pos.y;
    this.sides.bottom = this.pos.y + this.height;
    this.traits.forEach((trait) => trait.update(gameContext));
  }

  draw(gameContext) {
    if (this.image) {
        gameContext.context.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height);
    } else if (this.spriteSheet) {
        layers.drawRandomRectFromSpriteSheet(gameContext, this.spriteSheet, this.tiles, this.nSpriteSheetDivisions, this.pos.x, this.pos.y, this.width, this.height);
    } else {
        gameContext.context.fillStyle = this.color;
        gameContext.context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
  }

  *setRandomTiles() {
    const tileSizeInRect = Math.min(this.width, this.height);
    const nTilesX = this.width < this.height ? 1 : Math.floor(this.width / tileSizeInRect);

    for (let i = 0; i < nTilesX; i++) {
      yield [Math.floor(Math.random() * this.nSpriteSheetDivisions), Math.floor(Math.random() * this.nSpriteSheetDivisions)];
    }
  }
}
