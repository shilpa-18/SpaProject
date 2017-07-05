require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const userController = require('./controllers/user_controller');
const spaController = require('./controllers/spa_controller');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mustacheExpress = require('mustache-express')
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json())

const auth = require('./services/auth.js');
app.use(auth.passportInstance);
app.use(auth.passportSession);

app.use('/user', userController);
app.use('/spa', spaController);

app.listen(PORT, () => console.log('Server listening on port', PORT));

app.get('/', (req,res) =>{
	res.render('user/login');

});	


