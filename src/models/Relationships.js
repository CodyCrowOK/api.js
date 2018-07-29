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
     * @param  {Object}  [entityKeys={}]               query parameters for the entity queries, where the key is the name of the entity
     * @param  {Array}   [internalProperties=[]]       relationship properties that shouldn't be sent to clients
     * @param  {Object}  [entityInternalProperties={}] entity properties that shouldn't be sent to clients, where the key is the name of the entity
     * @return {Promise<Relationships>}
     */
    static async fromDB(
        name,
        entityNames = [],
        keys = {},
        entityKeys = {},
        internalProperties = [],
        entityInternalProperties = {}
    ) {
        const [query, parameters] = QueryBuilder.select(name, keys);

        const result = await pool.query(query, parameters);

        if (!result.rowCount) {
            return new Relationships();
        }

        const relationships = await Promise.all(result.rows.map(async record => {
            const entities = await Promise.all(entityNames.map(async entityName => {
                return Entity.fromDB(entityName, entityKeys[entityName], entityInternalProperties[entityName]);
            }));

            return new Relationship(name, record, internalProperties, entities);
        }));

        return new Relationships(relationships);
    }
}
