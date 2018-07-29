import Model from './Model';
import Entities from './Entities';
const {pool} = require('../db');

/**
 * Represents an entity in the database
 *
 * @extends Model
 */
class Entity extends Model {
    /**
     * Create an entity
     *
     * @param {string} name       the name of the entity
     * @param {object} properties the properties of the model
     * @param {array}  internalProperties properties that shouldn't be sent to clients
     */
    constructor(name, properties, internalProperties = []) {
        super(name, properties, internalProperties);
    }

    /**
     * Create a new Entity from the database
     *
     * @param  {string} name the name of the table/entity
     * @param  {object} keys the keys to use to query the entity
     * @param  {array}  internalProperties properties that shouldn't be sent to clients
     * @return {Entity}      the entity corresponding to a record
     */
    static async fromDB(name, keys = {}, internalProperties = []) {
        const entities = await Entities.fromDB(name, keys, internalProperties);
        return entities.first();
    }
}

export default Entity;
