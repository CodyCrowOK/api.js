/**
 * Given a schema, get all of the internal properties for a table (optional)
 *
 * @param  {object}   schema
 * @param  {string?}   table
 * @return {string[]} all of the internal properties for table
 */
export const getInternalProperties = (schema, table) => {
    const tables = {
        ...schema.entities,
        ...schema.relationships
    };

    const internalProperties = {};

    Object.keys(tables).forEach(tableName => {
        const {columns} = tables[tableName];

        Object.keys(columns).forEach(columnName => {
            const column = columns[columnName];

            if (column.internal) {
                internalProperties[tableName] = internalProperties[tableName]
                    ? [
                        ...internalProperties[tableName],
                        columnName
                    ]
                    : [columnName];
            }
        });
    });

    return table
        ? internalProperties[table]
        : internalProperties;
};
