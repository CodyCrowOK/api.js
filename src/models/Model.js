class Model {
    /**
     * Construct a model
     *
     * Properties should contain an object where the keys correspond to columns
     * in the database and values are the values for a record
     *
     * @param {string} name
     * @param {object} properties
     * @param {array}  internalProperties properties that shouldn't be sent to clients
     */
    constructor(name, properties, internalProperties) {
        this.columns = Object.keys(properties);
        this.name = name;
        this.properties = properties;
        this.internalProperties = internalProperties;
    }

    toJSON() {
        return Object.keys(this.properties).reduce((acc, property) => {
            if (this.internalProperties.includes(property)) return acc;

            return {
                ...acc,
                property
            };
        });
    }

    toString = () => this.toJSON();
}

export default Model;
