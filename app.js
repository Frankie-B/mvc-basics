const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const hbs = require('hbs');
// const session = require('session');
// const MongoStore = require('connect-mongo')(session);

app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect('mongodb://localhost/imdb', {
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

// Setting up Handlebars
app.set('PORT', 3000);
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static('public'));

app.use('/', require('./routes/index'));
app.use('/', require('./routes/movies'));

// listening on port 3000
app.listen(app.get('PORT'), () => {
  console.log('app listening on', app.get('PORT'));
});
