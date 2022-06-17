const {Router} = require('express');
const router = Router();

const Estudiante = require('../models/Estudiante');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const fs = require('fs-extra');

router.get('/', async (req,res) => {
    const estd = await Estudiante.find().lean();
    //console.log(photos);
    res.render('images', {estd});
});

router.get('/estudiantes/add', async(req,res) => {
    const estd = await Estudiante.find().lean();
    res.render('estudiante_form', {estd});
});

router.post('/estudiantes/add', async (req,res) => {
    const {nombre,apellido,carrera,edad} = req.body;
    console.log(req.file);
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const newEstudiante = new Estudiante({
        nombre,
        apellido,
        carrera,
        edad,
        imageURL: result.url,
        public_id: result.public_id

    });
    await newEstudiante.save(); // guaradar el objeto en la base de datos mongo db
    await fs.unlink(req.file.path);
    console.log(result);
    //res.send('Imagen Agregada Correctamente!');
    res.redirect('/')
});

router.get('/estudiantes/delete/:estd_id', async (req, res) => {
    const {estd_id} = req.params;
    const estd = await Estudiante.findByIdAndDelete(estd_id);
    const result = await cloudinary.v2.uploader.destroy(estd.public_id);
    console.log(result);
    res.redirect('/estudiantes/add');
});
module.exports=router;