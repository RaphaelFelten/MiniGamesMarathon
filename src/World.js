export default class World {
    constructor() {
        this.entities = [];
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    removeEntity(entity) {
        this.entities = this.entities.filter(ent => ent !== entity)
    }

}
