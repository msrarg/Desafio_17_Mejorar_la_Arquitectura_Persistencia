const PersistenceFactory = require('../daos/PersistenceFactory');

class CartService {
    constructor() {
        this.cartDao;
        this.init();
    }
    init = async () => {
        const cartDao = await PersistenceFactory.getPersistence();
        this.cartDao = cartDao.CartDao;
    }
    getAll = async () => {
        return await this.cartDao.getAll();
    }
    save = async (product) => {
        return await this.cartDao.save(product);
    }
    getById = async (id) => {
        return await this.cartDao.getById(id);
    }
    updateById = async (id, product) => {
        return await this.cartDao.updateById(id, product);
    }
    deleteById = async (id) => {
        return await this.cartDao.deleteById(id);
    }
    addProduct = async (idCarrito, productos) => {
        return await this.cartDao.addProduct(idCarrito, productos);
    }
    deleteProduct = async (idCarrito, idProd) => {
        return await this.cartDao.deleteProduct(idCarrito, idProd);
    }
}

module.exports = CartService;
