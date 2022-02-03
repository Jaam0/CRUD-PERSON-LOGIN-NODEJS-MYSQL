require('dotenv').config();
const person = require('../routes/person.routes');
const morgan = require('morgan');
const express = require('express');



class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.personPath = '/person';
        //Conectar a la base de datos
        // this.connectarDB();
        //middlewares
        this.middlewares();       
        //App routes
        this.routes();
    };

    // async connectarDB(){
    //     await dbConnection();
    // };

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.set('view engine','ejs');
        
        //Reed and body parse
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        //public directories
        this.app.use(express.static('public'));
    };

    routes() {
       this.app.use(this.personPath,person);
    };
    
    listen() {
            this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    };
}

module.exports = Server;