const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const productosRouter = require('../routes/producto');
const carritoRouter   = require('../routes/carrito');

const { dbConnection } = require('../config/db.js');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT ? process.env.PORT : argv.port ? argv.port : 8080;
        this.paths = {
            productos: '/api/productos',
            carrito:   '/api/carrito'
        }

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {
        // Lectura y parseo del body
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        // this.app.use(express.urlencoded({ extendedparser : true })); Deprecado
        
        // Equivalentes en bodyparser
        // this.app.use(bodyParser.json())
        // this.app.use(bodyParser.urlencoded({ extended: true }));    
        
        // Cookie middlewares
        this.app.use(cookieParser());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.productos, productosRouter);
        this.app.use(this.paths.carrito,   carritoRouter);

        this.app.use('*', (req, res) => {
            const path   = req.originalUrl;
            const method = req.method;
            const descripcion = `ruta ${path} y/o método ${method} no implementada`;
            res.status(401).json({
                error: -2,
                descripcion
            });
        });
    }


    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server Up on port: ${this.port}`);
        });
        this.app.on('error', error => console.log(`Error en el servidor: ${error}`));
    }
}

module.exports = { Server };
