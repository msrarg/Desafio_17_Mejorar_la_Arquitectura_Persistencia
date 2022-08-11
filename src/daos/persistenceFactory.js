const config = require('../config/globals');

class PersistenceFactory {
    static getPersistence = async () => {
        let ProductDao;
        let CartDao;
        switch (config.app.persistence) {
            case 'mongo':
                const { ProductDaoMongo } = require('./productos/ProductoDaoMongo');
                const { CarritoDaoMongo } = require('./carritos/CarritoDaoMongo');
                ProductDao = ProductDaoMongo.getInstance();
                // ProductDao = new ProductDaoMongo();
                CartDao = CarritoDaoMongo.getInstance();
                return { ProductDao, CartDao };
            case 'firestore':
                const { ProductDaoFirestore } = require('./productos/ProductoDaoFirestore');
                const { CarritoDaoFirestore } = require('./carritos/CarritoDaoFirestore');
                ProductDao = ProductDaoFirestore.getInstance();
                CartDao = CarritoDaoFirestore.getInstance();

                // ProductDao = new ProductDaoFirestore();
                // CartDao = new CarritoDaoFirestore();
                return { ProductDao, CartDao };
        }
    }
}
module.exports = PersistenceFactory;