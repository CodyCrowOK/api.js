const {Pool} = require('pg');

const pool = new Pool({
    user: 'cody',
    host: 'localhost',
    database: 'cody',
    password: 'password'
});

module.exports = {
    /**
     * Query the database using an available client from the pool
     *
     * @param  {string}  query  the query, with $1, $2, ... for placeholders
     * @param  {array}   params the parameters to replace the placeholders
     * @return {Promise}        resolves with the result of the query
     */
    query: async (query, params) => {
        return await pool.query(query, params);
    }
}
