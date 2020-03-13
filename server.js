require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser =require('body-parser');

const employeeController = require('./controllers/employeeController');

const app = express();

//=============================
// Middlewars
//=============================
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(bodyParser.json());
app.use('/employee',employeeController);

//=============================
// Confguracion de render y Path
//=============================
app.set('views',path.join(__dirname,'/views'));
app.engine('hbs',exphbs({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');

//=============================
// Configuracion de puerto tanto local como en produccion
//=============================
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
  });

  


