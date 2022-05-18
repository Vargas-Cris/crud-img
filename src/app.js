const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const exphbs = require('express-handlebars');

//Inicializar 
const app = express();
require('./database');
//settings 
app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout:'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine','.hbs');

//midelware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req,file,cb) =>{
      cb(null, new Date().getTime()+ path.extname(file.originalname));
  }
});
app.use(multer({storage}).single('image'));

//routes
app.use(require('./routes'));

module.exports = app;
