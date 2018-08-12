export const getEntitiesForRelationship = relationship => Object
.keys(relationship.columns)
.map(columnName => relationship.columns[columnName].entity);
