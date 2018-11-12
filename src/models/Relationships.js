import Entity from './Entity';
import Relationship from './Relationship';
import Collection from './Collection';
import {pool, QueryBuilder} from '../db';

export default class Relationships extends Collection {
    constructor(relationships) {
        super(relationships);
    }

    /**
     * Create a new Relationships from the database
     *
     * @param  {string}  name                          name of the relationship table
     * @param  {Array}   [entityNames=[]]              name of the corresponding entity tables
     * @param  {Object}  [keys={}]                     query parameters for the relationship query
     * @return {Promise<Relationships>}
     */
    static async fromDB(
        name,
        keys = {},
        internalProperties = [],
    ) {
        const [query, parameters] = QueryBuilder.select(name, keys);

        const result = await pool.query(query, parameters);

        if (!result.rowCount) {
            return new Relationships();
        }

        const relationships = await Promise.all(result.rows.map(async record => {
            return new Relationship(name, record, internalProperties);
        }));

        return new Relationships(relationships);
    }
}
