const {Schema, model} = require('mongoose');

const Estudiante = new Schema({
    nombre:String,
    apellido:String,
    carrera:String,
    edad:String,
    imageURL:String,
    public_id:String

});

module.exports = model('Estudiante', Estudiante);