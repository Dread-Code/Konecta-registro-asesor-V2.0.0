const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let usuarioSchema = new Schema({

    nombreCompleto:{
        type: String,
        required: 'Ingrese el nombre completo por favor'
    },
    cedula:{
        type: Number,
        required: ' La cedula es necesaria',
        unique:true
    },  
    telefono: {
        type: Number,
        required: ' El telefono es requerido'
    },
    direccion:{
        type: String,
        required: 'La direccion es requerida'
    },
    fechaNacimiento:{
        type: String,
        required: 'La fecha es requerida'
    },
    genero:{
        type:String,
        required: 'Se requiere el genero'
    },
    edad:{
        type: Number
    },
    cliente:{
        type: String,
        required: 'Ingrese la empresa a la cual le presta el servicio'
    },
    sede:{
        type: String,
        // required: 'Se requiere la sede donde trabaja'
    },
    estado:{
        type: Boolean,
        default:true
    }
});


module.exports = mongoose.model('Usuario',usuarioSchema);