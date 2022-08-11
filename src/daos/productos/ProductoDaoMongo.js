const { ContainerMongo } = require('../../containers/containerMongo');
const producto = require('../../models/producto');

let app = null;
class ProductDaoMongo extends ContainerMongo {
    constructor(){
        super(producto);
    }
    static getInstance(){
        if(!app){
            app = new ProductDaoMongo();
        }
        return app;
    }
}

module.exports = { ProductDaoMongo };