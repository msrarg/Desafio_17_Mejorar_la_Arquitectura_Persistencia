const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

let store_memoria;
let store_file;

const dbConnection = () => {
    switch (process.env.PERSISTENCE) {
        case 'MEMORIA':
            store_memoria = {
                productos_memoria:[],
                carritos_memoria:[],
                usuarios_memoria:[]
            }
          break;
        case 'FILE':
            store_file = {
                productos_file : process.env.FILENAME_PRODUCTOS || 'productos.json',
                carritos_file  : process.env.FILENAME_CARRITOS  || 'carritos.json'
            };
          break;
        case 'MONGO':
            console.log('MONGO');
            const mongoConnection = async() =>{
                try{
                    await mongoose.connect(process.env.MONGO_URI,{
                        useNewUrlParser:true,
                        useUnifiedTopology:true,
                    });
                } catch(e){
                    throw new Error(`Error en DB ${e.message}`);
                }
            }
          break;
        default:
          break;
      }
};

module.exports = {
    dbConnection
};
