/**
 * Postgres types converted into useful form for JS
 *
 * @type {Object}
 */
export const types = {
    string: Symbol('varchar'),
    number: Symbol('decimal or integer'),
    time: Symbol('timestamp'),
    bytea: Symbol('bytea'),
    bool: Symbol('boolean')
};
