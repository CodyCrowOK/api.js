import test from 'tape';

import {getInternalProperties} from '../../db';

/**
 * @return {boolean} true if passing
 */
test('test db/getInternalProperties', t => {
    t.plan(2);

    const types = {
        string: Symbol('varchar'),
        number: Symbol('decimal or integer'),
        time: Symbol('timestamp'),
        bytea: Symbol('bytea'),
        bool: Symbol('boolean')
    };

    const schema = {
        entities: {
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
            }
        }
    };

    t.deepEqual(getInternalProperties(schema), {
        users: [
            'password',
            'stripe_customer_id'
        ]
    }, 'getInternalProperties works without optional table parameter');

    t.deepEqual(getInternalProperties(schema, 'users'), [
        'password',
        'stripe_customer_id'
    ], 'getInternalProperties works with optional table parameter');

    t.end();
});
