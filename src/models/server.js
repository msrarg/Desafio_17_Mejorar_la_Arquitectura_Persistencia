/*
import cluster from 'cluster';
import cookieParser from 'cookie-parser';
import core from 'os';
import express from 'express';
import fileUpload from 'express-fileupload';
import handlebars from 'express-handlebars';
import http from "http";
const { engine } = handlebars;
import path from'path';
import { fileURLToPath } from 'url';
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
import logger from '../utils/logger.js'
import { dbConnection } from '../config/db.js';
*/

const logger = require('../utils/logger.js');
const { dbConnection } = require('../config/db.js');

// const __filename = fileURLToPath(import.meta.url);
// const __dirname  = path.dirname(__filename);

class Server {

    constructor() {
        this.app  = express();
        this.server = http.Server(this.app);
        this.port = process.env.PORT ? process.env.PORT : argv.port ? argv.port : 8080;
        this.mode = process.env.MODE || 'cluster';
        this.logger = logger;

        this.paths = {
            productos: '/api/productos',
            carrito:   '/api/carrito'
            // users:     '/api/usuarios',
            // shop:      '/',
        }

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {
        this.app.use( express.json() );
        this.app.use( express.static('public') );
        /*
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
        */

        this.app.use(cookieParser());
        
        /*
        this.app.use(baseSession);
        initializePassport();
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        */
        
        /*
        this.app.engine(
            "hbs",
            engine({
                extname: ".hbs",
                defaultLayout: "layout.hbs",
                layoutsDir:  path.join(__dirname,'../views/layouts/'),
                partialsDir: path.join(__dirname,'../views/partials/'),
                runtimeOptions: {
                    allowProtoPropertiesByDefault: true,
                    allowProtoMethodsByDefault: true,
                }
            })
          );
          
        this.app.set("views", "./views");
        this.app.set("view engine", "hbs");
        */

        this.app.set("logger", this.logger);
    }

    routes() {
        this.app.use(this.paths.productos, productosRouter);
        this.app.use(this.paths.carrito,   carritoRouter);

        // this.app.use( this.paths.users,     routerUsers );
        // this.app.use( this.paths.productos, routerProductos);
        // this.app.use( this.paths.carrito,   routerCarrito );
        // this.app.use( this.paths.shop,      routerShop );


        this.app.use('*', (req, res) => {
            const path   = req.originalUrl;
            const method = req.method;
            const descripcion = `ruta ${path} y/o método ${method} no implementada`
            this.logger.warn(descripcion); // Ver si lo saco o no
            res.status(401).json({
                error: -2,
                descripcion
            });
        });
    }

    start() {
        if (this.mode !== 'fork'){
            if (cluster.isPrimary) {
                this.logger.info(`Proceso principal ID:(${process.pid})`)
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
            this.logger.info(`Server Up on port: ${this.port}`)
        });
        this.server.on('error', error => console.log(`Error en el servidor: ${error}`));
    }
}

module.exports = { Server };
//export default Server;
