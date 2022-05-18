const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
})
    .then(db => console.log('Conexión Exitosa a MongoDB'))
    .catch(err => console.log(err));
