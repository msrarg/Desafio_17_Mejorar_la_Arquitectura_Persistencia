// import dotenv from 'dotenv';
// import Server from './models/server.js';

// Variable administrador definida temporamente
// global.ADMINISTRADOR = true;

const dotenv = require('dotenv');
dotenv.config();

// const Server = require('./models/server.js');
const { Server } = require('./src/models/server.js');

const server = new Server();
server.start();