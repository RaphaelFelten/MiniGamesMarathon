
export default class Entity {
    constructor(color) {
        this.pos = { x: 0, y: 0 };
        this.vel = { x: 0, y: 0 };
        this.type = undefined;
        this.width = 0;
        this.height = 0;
        this.acc = 0;
        this.friction = 0;
        this.image = null;
        this.nSpriteSheetDivisions = null;
        this.traits = [];
        this.color = color;
    }

    update(gameContext) {
        this.traits.forEach((trait) => trait.update(gameContext));
    }

    draw() {}

    addTrait(trait) {
        this.traits.push(trait);
    }

    hasTrait(trait) {
        return this.traits.filter(item => item instanceof trait).length > 0;
    }

    getTrait(trait) {
        return this.traits.filter(item => item instanceof trait)[0];
    }

}
