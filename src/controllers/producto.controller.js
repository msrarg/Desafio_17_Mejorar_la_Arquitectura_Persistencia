const ProductService = require('../services/producto.service');
const productService = new ProductService();

const getProducts = async (req, res) => {
    try {
        const id = req.params?.id ?? null;
        // console.log(id);
        let productos = [];
        if(id == null) {
            productos = await productService.getAll();
        }
        else {
            productos = await productService.getById(id);
            if(productos === null) {
                throw new Error('producto no encontrado');
            }
        }
        res.send(productos);        
    } catch (error) {
        res.send({error: error.message})
    }
}

const postProduct = async (req, res) => {
    const idNuevoProducto = await productService.save(req.body);
    res.status(200).json({id: idNuevoProducto});
}

const editProduct = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    // console.log(data);
    const resProducto = await productService.updateById(id, data);

    res.send("Producto actualizado: " + JSON.stringify(resProducto));
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    await productService.deleteById(id);
    res.send("Producto eliminado");
}

module.exports = {
    getProducts, postProduct, editProduct, deleteProduct
}