const { ContainerFirestore } = require('../../containers/ContainerFirestore')

let app = null;
class ProductDaoFirestore extends ContainerFirestore {
    constructor() {
        super('producto');
    }
    static getInstance() {
        if (!app) {
            app = new ProductDaoFirestore();
        }
        return app;
    }
}

module.exports = { ProductDaoFirestore };