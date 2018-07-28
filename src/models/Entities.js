import Entity from './Entity';
import Collection from './Collection';
const {pool} = require('../db');

class Entities extends Collection {
    constructor(entities) {
        super(entities);
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

        const whereClauseParts = [];
        const parameters = [];

        Object.keys(keys).forEach((column, index) => {
            const key = keys[column];
            parameters.push(key);

            whereClauseParts.push(`"${column}" = $${index + 1}`)
        });

        const whereClause = whereClauseParts.length
            ? 'WHERE ' + whereClauseParts.join(' AND ')
            : '';

        const query = `SELECT * FROM ${name} ${whereClause}`;

        const result = await pool.query(query, parameters);

        if (!(result.rows && result.rows.length)) {
            return new Entities();
        }

        const entities = result.rows.map(record => new Entity(name, record));

        return new Entities(entities);
    }
}

export default Entities;
