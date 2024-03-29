const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

// create express server and set the port
const app = express();
const PORT = process.env.PORT || 3001;

// configure the session store with the config session object
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'secret',
  cookie: {
    maxAge: 3600000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// add the express-session middleware
app.use(session(sess));

//setup custom handlebars helpers
const hbs = exphbs.create({ helpers });

// configure handlebars to be used as the templating engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// handle different types of incoming data payloads
// and parse them into javascript objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// connect all the routes in the controllers folder
app.use(routes);

// sync the sequelize models to the database and start the web server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
