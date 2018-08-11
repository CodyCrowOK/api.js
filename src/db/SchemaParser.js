import Entities from '../models/Entities';
import {types} from './';

export class SchemaParser {
    constructor(schema) {
        this.schema = schema;
    }

    buildRoute = (tableName, table) => {
        const [primaryKey] = table.indexes;
        const parameters = primaryKey.length
            ? primaryKey.map(key => `:${key}?`).join('/')
            : '';
        const route = `/${tableName}/${parameters}`;

        return route;
    };

    /**
     * Given a schema, generate a routing scheme
     *
     * @param  {express} app
     * @return {express}
     */
    generateRoutes(app) {
        const entityRoutes = Object.keys(this.schema.entities).map(entityName => {
            const table = this.schema.entities[entityName];
            const route = this.buildRoute(entityName, table);
            return route;
        });

        const relationshipRoutes = Object.keys(this.schema.relationships).map(name => {
            const table = this.schema.relationships[name];
            const route = this.buildRoute(name, table);
            return route;
        });

        entityRoutes.forEach(route => {
            app.get(route, async (req, res) => {
                const params = req.params;

                const name = route.split('/')[1];

                res.send(await Entities.fromDB(name, params /* TODO */));
            });
        });
    }
}
