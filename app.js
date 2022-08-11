const dotenv = require('dotenv');
dotenv.config();

const { Server } = require('./src/models/server.js');

const server = new Server();
server.start();