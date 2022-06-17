const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
})
    .then(db => console.log('Conexión Exitosa a MongoDB Atlas'))
    .catch(err => console.log(err));
