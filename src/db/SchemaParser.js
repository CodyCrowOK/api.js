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
        app.get('/users/:userId/books/:bookId?', function (req, res) {
            res.send(req.params);
        });



        const routes = [
            ...Object.keys(this.schema.entities).map(entityName => {
                const table = this.schema.entities[entityName];
                const route = this.buildRoute(entityName, table);
                return route;
            }),
            ...Object.keys(this.schema.relationships).map(name => {
                const table = this.schema.relationships[name];
                const route = this.buildRoute(name, table);
                return route;
            })
        ];

        console.log(routes);
    }
}
