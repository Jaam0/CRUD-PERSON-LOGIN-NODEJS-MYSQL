require('dotenv').config();
const person = require('../routes/person.routes');
const login = require('../routes/login.routes');
const morgan = require('morgan');
const express = require('express');



class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.personPath = '/person';
        this.loginPath ='/';
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
       this.app.use(this.loginPath,login);
    };
    
    listen() {
            this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    };
}

module.exports = Server;