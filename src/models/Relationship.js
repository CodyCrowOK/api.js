import Model from './Model';

/**
 * Represents a relationship between multiple entities in the database
 *
 * @extends Model
 */
class Relationship extends Model {
    /**
     * Create a relationship
     *
     * @param {string}   name the name of the relationship
     * @param {Entity[]} entities An array of Entity models
     * @param {object}   properties the properties of the relationship
     */
    constructor(name, properties, entities) {
        super(name, properties);
        this.entities = entities;
    }

    toJSON() {
        // TODO
    }
}
