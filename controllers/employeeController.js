const express = require('express');
var router = express.Router();
const moment = require('moment');
const Usuario = require('../models/employee.model');

const { getAnio } = require('../utilities/utilities');

// Render del formulario/index
router.get('/',(req,res)=>{

    res.render('employee/addOrEdit',{
        viewTitle:"Ingrese Asesor"
    })
});

// post para realizar insercion o actualizacion en la DB===> si no tiene id va a insertar el registro de lo contrario realizara una actualizacion

router.post('/',(req,res)=>{
    if (req.body._id == '') 
        insertRecord(req,res);    
    else updateRecord(req,res);
    
});

// la funcion con la cual se realiza la actualizacion por ID 

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

// funcion para insertar nuevos registros

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
                handleValidationError(err,req.body);// aqui se realiza la validacion de campos 
                res.render('employee/addOrEdit',{
                    viewTitle:"Ingrese Asesor",
                    usuario: req.body
                });
            }
            if (err.name == 'MongoError') { // Esta es la validacion especifica para el campo unico el cual es la cedula (Prymarykey)
                console.log(err.errmsg);
                res.render('employee/addOrEdit',{ // aqui se envia para que renderice en ese campo en especifico 
                    viewTitle:"Ingrese Asesor",
                    cedulaMongoError: `La cedula ${err.keyValue.cedula} ya esta registrada en la DB`
                });
            }
            else
                console.log('Error during record update: '+err);
        }    
    })
    
    
}
// renderiza los registros para mostrarlos en la tabla

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
// validacion del required  del modelo  ==> renderiza de acuerdo al campo que falte

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

// Peticion que se realiza al darle al boton editar para que se actualice la informacion, la informacion persiste en los campos

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

// peticion que se realiza al darle boton eliminar, primero realizara la pregunta y despues actualiza y envia para que se renderice en la lista 

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