const express = require('express');
var router = express.Router();
const moment = require('moment');
const Usuario = require('../models/employee.model');

const { getAnio } = require('../utilities/utilities');


router.get('/',(req,res)=>{

    res.render('employee/addOrEdit',{
        viewTitle:"Ingrese Asesor"
    })
});

router.post('/',(req,res)=>{
    if (req.body._id == '') 
        insertRecord(req,res);    
    else updateRecord(req,res);
    
});

function updateRecord(req,res) {
    console.log(req.body);
    Usuario.findByIdAndUpdate({_id: req.body._id},req.body,{new: true},(err,doc)=>{
        if(!err) {
            res.redirect('employee/list');
        }else{
            if (err.name == 'ValidationError') {
                handleValidationError(err,req.body);
                res.render('employee/addOrEdit',{
                    viewTitle:"Actualizar Asesor",
                    usuario: req.body
                });
            }
            else
            console.log('Error during record update : ' +err );
        }

    })

}

function insertRecord(req,res){

    let body= req.body;

    let usuario = new Usuario({
        nombreCompleto: body.nombreCompleto,
        cedula: body.cedula,
        telefono: body.telefono,
        direccion: body.direccion,
        fechaNacimiento: moment(body.fechaNacimiento).format('l'),
        edad: getAnio(body.fechaNacimiento),
        genero: body.genero,
        cliente: body.cliente,
        sede: body.sede 
    });
    
    usuario.save((err,doc)=>{
        if(!err)
            res.redirect('employee/list');// si no hay error la respuesta la redirige a router get('/list)
        else{
            if(err.name == 'ValidationError' ){
                handleValidationError(err,req.body);
                res.render('employee/addOrEdit',{
                    viewTitle:"Ingrese Asesor",
                    usuario: req.body
                });
            }
            if (err.name == 'MongoError') {
                console.log(err.errmsg);
                res.render('employee/addOrEdit',{
                    viewTitle:"Ingrese Asesor",
                    cedulaMongoError: `La cedula ${err.keyValue.cedula} ya esta registrada en la DB`
                });
            }
            else
                console.log('Error during record update: '+err);
        }    
    })
    
    
}

router.get('/list',(req,res)=>{

    // res.json('from list')

    Usuario.find((err,docs)=>{
        if (!err) {
            res.render("employee/list",{
                list: docs
            });
        }
        else{
            console.log('Error in retrieving employee list:' + err);
        }
    })
})

function handleValidationError(err,body){

    for (field in err.errors){
        switch (err.errors[field].path) {
            case 'nombreCompleto' :
                body['nombreCompletoError'] =err.errors[field].message;
                break;
            case 'cedula' :
                body['cedulaError'] =err.errors[field].message;
                break;
            case 'telefono' :
                body['telefonoError'] =err.errors[field].message;
                break;
            case 'direccion' :
                body['direccionError'] =err.errors[field].message;
                break;
            case 'fechaNacimiento' :
                body['fechaNacimientoError'] =err.errors[field].message;
                break;
            case 'genero' :
                body['generoError'] =err.errors[field].message;
                break;
            case 'cliente' :
                body['clienteError'] =err.errors[field].message;
                break;
            case 'sede' :
                body['sedeError'] =err.errors[field].message;
                break;
            default:
                break;
        }
    }

}

router.get('/:id',(req,res)=>{

    Usuario.findById(req.params.id,(err,doc)=>{

        if(!err){
            res.render('employee/addOrEdit',{
                viewTitle:"Actualizar Asesor",
                usuario: doc
            });
        }
    });

});

router.get('/delete/:id',(req,res)=>{

    Usuario.findByIdAndRemove(req.params.id,(err,doc)=>{
        if (!err) {

            res.redirect('/employee/list');
            
        }else{
            console.log('Error in employee delete' + err);
        }

    });

})

module.exports = router;