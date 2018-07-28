/**
 * Postgres types converted into useful form for JS
 *
 * @type {Object}
 */
const types = {
    string: Symbol('varchar'),
    number: Symbol('decimal or integer'),
    time: Symbol('timestamp'),
    bytea: Symbol('bytea'),
    bool: Symbol('boolean')
};

/**
 * The entities in the database
 *
 * The first index should be the primary key
 *
 * Columns can be marked as internal, which means they should never be sent
 * over the wire. Example: password hashes
 *
 * @type {Object}
 */
const entities = {
    sessions: {
        indexes: [['id']],
        columns: {
            user_id: {type: types.number},
            time: {type: types.time},
            ip: {type: types.string},
            id: {type: types.string}
        }
    },
    tracking_events: {
        indexes: [['name', 'user', 'time']],
        columns: {
            name: {type: types.string},
            user: {type: types.number},
            time: {type: types.time},
            data: {type: types.string},
        }
    },
    users: {
        indexes: [['id'], ['email']],
        columns: {
            id: {type: types.number},
            name: {type: types.string},
            email: {type: types.string},
            password: {
                type: types.bytea,
                internal: true
            },
            stripe_customer_id: {
                type: types.string,
                internal: true
            },
            phone: {type: types.string},
            address: {type: types.string}
        }
    },
    events: {
        indexes: [['id']],
        columns: {
            id: {type: types.number},
            name: {type: types.string},
            time: {type: types.time}
        }
    },
    cdn_assets: {
        indexes: [['id'], ['id', 'key']],
        columns: {
            id: {type: types.number},
            user_id: {type: types.number},
            key: {type: types.string},
            name: {type: types.string}
        }
    }
};

/**
 * The relationships between entities
 *
 * The first index should be the primary key
 *
 * @type {Object}
 */
const relationships = {
    user_owns_event: {
        indexes: [['owner', 'event']],
        columns: {
            owner: {
                type: types.number,
                entity: 'users'
            },
            event: {
                type: types.number,
                entity: 'events'
            }
        }
    },
    user_guest_at_event: {
        indexes: [['guest', 'event']],
        columns: {
            guest: {
                type: types.number,
                entity: 'users'
            },
            event: {
                type: types.number,
                entity: 'events'
            },
            attending: {type: types.bool}
        }
    }
}

/**
 * The schema of our database
 *
 * @type {Object}
 */
const schema = {
    entities,
    relationships
};

module.exports = {
    schema,
    types
};
