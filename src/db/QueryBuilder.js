export class QueryBuilder {
    /**
     * SELECT * FROM name WHERE key = value
     *
     * @param  {string} name table name
     * @param  {object} keys key value pairs for column values
     * @return {array}      the query and parameters
     */
    static select(name, keys) {
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

        return [query, parameters];
    }
}
