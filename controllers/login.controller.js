const { response } = require("express");
const bcryptjs = require('bcryptjs');
const conexion = require('../database/db');
const {generarJWT} = require('../helpers/generar-jwt');


const login = async(req, res = response) => {
    
    // const {username, password} = req.body;
    const {email, password} = req.body;
    console.log(email,password);
    try {

        //Verificar si el usuario existe
        const [user] = await Promise.all([
          conexion.query(`SELECT * FROM tbl_login WHERE email = '${email}'`)
        ])
        .catch((error) =>{
          console.log(`There was an error trying to consult on the database - tbl_login:${error}`);
          return res.status(500).json({msg: 'Internal error on the server - Contact to administrator'});
       });
  
        if (user.length === 0) {
            return res.status(400).json({
                msg:'User does not exist - Contact to administrator'
            });
        }
        //Si el usuario esta activo
        if ( user[0].status != "A" ) {
            return res.status(400).json({
                msg:'User is not active - Contact to administrator'
            });
        }
        //Verificar la contrasena
        const validPassword = bcryptjs.compareSync(password, user[0].password);

        if (!validPassword) {
            return res.status(400).json({
                msg:'User or password is not right - Password'
            });
        }
        //Generar el JWT
        const token = await generarJWT(user[0].id);

        res.render('person/index',{user, token});
        // res.json({user, token});
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Contact to administrator"
        });
    } 
};

module.exports = {
    login
};