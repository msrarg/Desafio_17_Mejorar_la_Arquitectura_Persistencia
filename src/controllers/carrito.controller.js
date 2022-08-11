const CartService = require('../services/carrito.service');
const cartService = new CartService();

const newCart = async (req, res) => {
    const idNuevoCarrito = await cartService.save(req.body);
    res.status(200).json({id: idNuevoCarrito});
};
const deleteCart = async (req, res) => {
    const id = req.params.id;
    await cartService.deleteById(id);
    res.send("Carrito eliminado");
}

const getCarts = async (req, res) => {
    try {
        const id = req.params?.id ?? null;
        // console.log(id);
        let productos = [];
        if(id == null) {
            productos = await cartService.getAll();
        }
        else {
            productos = await cartService.getById(id);
            // console.log(productos);
            if(productos === null) {
                throw new Error('carrito no encontrado');
            }
        }
        res.send(productos);        
    } catch (error) {
        res.send({error: error.message})
    }
}

const getProducts = async (req, res) => {
    try {
        const id = req.params.id;
        const carritoC = await cartService.getById(id);
        if(carritoC === null) {
            throw new Error('carrito no encontrado');
        }
        res.send(carritoC.productos ?? carritoC.data.productos);        
    } catch (error) {
        res.status(200).json({error: error.message})
    }
}

const addProduct = async (req, res) => {
    const idCarrito = req.params.id;
    const productos = req.body;
    try {
        const carritoC = await cartService.getById(idCarrito);
        // console.log("Init",carritoC);

        if(carritoC === null) {
            throw new Error('carrito no encontrado');
        }
        await cartService.addProduct(idCarrito, productos);

        res.send({message: "Productos agregados"});

    } catch (error) {
        res.send({error: error.message})
    }
}

const deleteProduct = async (req, res) => {
    const idCarrito = req.params.id;
    const idProd = req.params.idProd;
    try {
        const carritoC = await cartService.getById(idCarrito);
        if(carritoC === null) {
            throw new Error('carrito no encontrado');
        }

        await cartService.deleteProduct(idCarrito, idProd);

        res.send({message: "Producto eliminado del carrito"});
    } catch (error) {
        res.send({error: error.message})
    }
}
module.exports = {
    newCart, deleteCart, getProducts, getCarts, addProduct, deleteProduct
}