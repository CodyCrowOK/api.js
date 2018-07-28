class Collection {
    /**
     * Create a collection of models
     *
     * @param {Model[]} models
     */
    constructor(models = []) {
        this.models = models;
    }

    first() {
        return this.models[0];
    }

    toJSON() {
        return this.models.map(model => model.toJSON());
    }
}

export default Collection;
