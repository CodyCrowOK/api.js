import Entity from './Entity';
import Collection from './Collection';
import {pool, QueryBuilder} from '../db';

class Entities extends Collection {
    constructor(entities) {
        super(entities);
    }

    /**
     * Create a new Entities from the database
     *
     * @param  {string} name the name of the table/entity
     * @param  {object} keys the keys to use to query the entity
     * @param  {array}  internalProperties properties that shouldn't be sent to clients
     * @return {Entity}      the entity corresponding to a record
     */
    static async fromDB(name, keys = {}, internalProperties = []) {
        const [query, parameters] = QueryBuilder.select(name, keys);

        const result = await pool.query(query, parameters);

        if (!result.rowCount) {
            return new Entities();
        }

        const entities = result.rows.map(record => new Entity(name, record, internalProperties));

        return new Entities(entities);
    }
}

export default Entities;
