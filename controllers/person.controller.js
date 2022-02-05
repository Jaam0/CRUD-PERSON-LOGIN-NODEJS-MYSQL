const { request, response, json } = require('express');
const conexion = require('../database/db');

exports.showAll = async(req = request, res = response) => {
    const queryMain = `SELECT ID,FIRST_NAME,LAST_NAME,GENDER,AGE,NATIONALITY,STATUS FROM TBL_PERSON`;
    
    const [person] = await Promise.all([
        conexion.query(queryMain)
    ])
    .catch((error) => {
        console.log(`There was an error trying to consult on the database - tbl_person:${error}`);
        return res.status(500).json({msg: 'Internal error on the server - Contact to administrator'});
    });

    // if(person.length === 0) return  res.status(200).json({msg: 'There is not person - Contact to administrator'});
    res.status(200).render('person/index',{rows:person});
};

exports.showById = async(req, res) =>{
    
    const id = req.params.id;
    const queryMain = `SELECT ID,FIRST_NAME,LAST_NAME,GENDER,AGE,NATIONALITY,STATUS FROM TBL_PERSON WHERE ID = ${Number(id)}`;
    
    if ( !Number(id)) return res.status(406).json({msg: 'Invalid identifier - Person'});

    const [person] = await Promise.all([
        conexion.query(queryMain)
    ])
    .catch((error) =>{
        console.log(`There was an error trying to consult on the database - tbl_person:${error}`);
        return res.status(500).json({msg: 'Internal error on the server - Contact to administrator'});
    });

    if(person.length === 0) return  res.status(200).json({msg: 'Product not found'});
    
    res.json({rows:person[0]});
};

exports.save = async(req,res) =>{
    const p_type_procedure = process.env.TYPE_PROCEDURE_I;
    const id = 0;
    const {first_name,last_name,gender,age,nationality,status} = req.body;

    if ( !first_name || !last_name || !gender || !Number(age) || !status ) return res.status(400).json({msg: `It's mandatory to fill in the fields (First name,last name,gender,age,nationality and status)`});

    const [] = await Promise.all([
        conexion.query(`CALL prc_iud_person(
                                            '${p_type_procedure}',${Number(id)},
                                            '${first_name}','${last_name}',
                                            '${gender}',${Number(age)},
                                            '${nationality}','${status}')`)
    ])
    .catch((error) =>{
        console.log(`There was an error trying to insert on the database - tbl_person:${error}`);
        return res.status(500).json({msg: 'Internal error on the server - Contact to administrator'});
    });;

    res.status(201).redirect('/person');
};

exports.update = async(req,res) =>{
    const p_type_procedure = process.env.TYPE_PROCEDURE_U;
    // const id = req.params.id;
    const {id,first_name,last_name,gender,age,nationality,status} = req.body;

    if ( !Number(id) || !first_name || !last_name || !gender || !Number(age) || !status ) return res.status(400).json({msg: `It's mandatory to fill in the fields (First name,last name,gender,age,nationality and status)`});
    
    const [] = await Promise.all([
        conexion.query(`CALL prc_iud_person(
                                            '${p_type_procedure}',${Number(id)},
                                            '${first_name}','${last_name}',
                                            '${gender}',${Number(age)},
                                            '${nationality}','${status}')`)
    ])
    .catch((error) =>{
        console.log(`There was an error trying to update on the database - tbl_person:${error}`);
        return res.status(500).json({msg: 'Internal error on the server - Contact to administrator'});
    });
    res.status(201).redirect('/person');
};

exports.drop = async(req,res) =>{
    const p_type_procedure = process.env.TYPE_PROCEDURE_D;
    const id = req.params.id; 
 
    if ( !Number(id) )  return res.status(400).json({msg:'Invalid identifier - Person'})
    
    const [] = await Promise.all([
        conexion.query(`CALL prc_iud_person(
            '${p_type_procedure}',${Number(id)},'','','',0,'','')`)
    ])
    .catch((error) =>{
        console.log(`There was an error trying to delete on the database - tbl_person:${error}`);
        return res.status(500).json({msg: 'Internal error on the server - Contact to administrator'});
    });
    res.status(200).redirect('/person');
};