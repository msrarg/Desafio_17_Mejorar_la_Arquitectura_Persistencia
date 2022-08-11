/*
import passport from 'passport';
*/

const path = require('path');
const http = require('http');
const express = require('express');
const cluster = require('cluster');
const core = require('os');
const cookieParser = require('cookie-parser');

// import routerCarrito   from "../routes/carrito.js"
// import routerProductos from "../routes/productos.js"
// import routerShop      from "../routes/shop.js"
// import routerUsers     from "../routes/users.js"

const productosRouter = require('../routes/producto');
const carritoRouter   = require('../routes/carrito');

/*
import { baseSession } from '../config/session.js';
import { initializePassport } from '../config/passport.js';
import { dbConnection } from '../config/db.js';
*/

const { dbConnection } = require('../config/db.js');
const { Console } = require('console');

class Server {

    constructor() {
        this.app  = express();
        this.server = http.Server(this.app);
        this.port = process.env.PORT ? process.env.PORT : argv.port ? argv.port : 8080;
        this.mode = process.env.MODE || 'cluster';
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

        /*
        this.app.use(baseSession);
        initializePassport();
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        */
    }

    routes() {
        // this.app.use(this.paths.productos, productosRouter);
        // this.app.use(this.paths.carrito,   carritoRouter);

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

    start() {
        if (this.mode !== 'fork'){
            if (cluster.isPrimary) {
                console.log(`Proceso principal ID:(${process.pid})`)
                for(let i = 0; i <  core.cpus().length; i++) {
                    cluster.fork();
                }
                cluster.on('exit', (worker) => {
                    cluster.fork();
                });
            
            } else {
                this.listen();
            }
        } else {
            this.listen();
        }
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log(`Server Up on port: ${this.port}`);
        });
        this.server.on('error', error => console.log(`Error en el servidor: ${error}`));
    }
}

module.exports = { Server };
