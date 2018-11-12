import Model from './Model';

/**
 * Represents a relationship between multiple entities in the database
 *
 * @extends Model
 */
export default class Relationship extends Model {
    /**
     * Create a relationship
     *
     * @param {string}   name the name of the relationship
     * @param {Entity[]} entities An array of Entity models
     * @param {array}    internalProperties properties that shouldn't be sent to clients
     * @param {object}   properties the properties of the relationship
     */
    constructor(name, properties, internalProperties, entities) {
        super(name, properties);
        this.entities = entities;
    }

    static async fromDB(
        name,
        entityNames = [],
        keys = {}
    ) {
        const relationships = await Relationships.fromDB(name, entityNames, keys);
        return relationships.first();
    }
}
