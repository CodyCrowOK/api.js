import test from 'tape';

import {types, getEntitiesForRelationship} from '../../db';

test('test db/getEntitiesForRelationship', t => {
    t.plan(1);

    const relationship = {
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
    };

    t.deepEqual(getEntitiesForRelationship(relationship), [
        'users',
        'events'
    ], 'getEntitiesForRelationship correctly gets entities from relationship');

    t.end();
});
