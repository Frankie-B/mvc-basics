require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const hbs = require('hbs');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: false }));

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//Starting cookie session for user
app.use(
  session({
    secret: 'basic-auth-secret',
    cookie: { maxAge: 60000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60, // (1 day) time to live = how long the cookie will be valid
    }),
  })
);

// Connection to the database
mongoose
  .connect(process.env.db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(x => {
    console.log(`Connected to MongoDB name: "${x.connections[0].name}"`);
  })
  .catch(error => {
    console.log('Unexpected error, connection failed!', error);
  });

// Protection function for routes if user is not logged in
// Protection
function protect(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/user/login');
  }
}

// Setting up Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static('public'));
// Protection of routes
app.use('/movies', protect);
app.use('/movie', protect);

app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/', require('./routes/movies'));
app.use('/', require('./routes/movies'));

// listening on port 3000
app.listen(process.env.PORT, () => {
  console.log('app listening on', process.env.PORT);
});
