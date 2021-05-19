require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

require('./config/db.config')

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// MIDDLEWARE SESSION
require('./config/session.config')(app)

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

//register partials
hbs.registerPartials(__dirname + '/views/partials/notes')
hbs.registerPartials(__dirname + '/views/partials/subjects')

hbs.registerHelper('ifEqual', (arg1, arg2, options) => {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this)
})

hbs.registerHelper('regexDate', (aString) => {
  const expresion = /[A-Za-z]+\s\d+\s\d+/i
  const found = aString.toString().match(expresion)
  return found[0]
})

hbs.registerHelper('regexTime', (aString) => {
  const expresion = /\d+:\d+:\d+/i
  const found = aString.toString().match(expresion)
  return found[0]
})

// default value for title local
app.locals.title = 'Note CRUD Project';

const index = require('./routes/index');
app.use('/', index);

const auth = require('./routes/auth.routes')
app.use('/', auth)

const notes = require('./routes/notes.routes')
app.use('/', notes)

const schedule = require('./routes/schedule.routes')
app.use('/', schedule)

module.exports = app;
