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
     * @return {Entity}      the entity corresponding to a record
     */
    static async fromDB(name, keys = {}) {
        /*
         * "SELECT * FROM table_name WHERE key1 = $1 AND key2 = $2"
         */
        //
        // const whereClauseParts = [];
        // const parameters = [];
        //
        // Object.keys(keys).forEach((column, index) => {
        //     const key = keys[column];
        //     parameters.push(key);
        //
        //     whereClauseParts.push(`"${column}" = $${index + 1}`)
        // });
        //
        // const whereClause = whereClauseParts.length
        //     ? 'WHERE ' + whereClauseParts.join(' AND ')
        //     : '';
        //
        // const query = `SELECT * FROM ${name} ${whereClause}`;
        //
        // const result = await pool.query(query, parameters);
        //
        // if (!(result.rows && result.rows.length)) {
        //     return null;
        // }
        //
        // const firstResult = result.rows[0];
        //
        // return new Entity(name, firstResult);

        Entities.fromDB(name, keys).then(entities => entities.first());
    }
}

export default Entity;
