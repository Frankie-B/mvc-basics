const express = require('express');
const app = express();
const Movie = require('../models/Movie');

// Displaying all the recipes
app.get('/movies', (req, res) => {
  Movie.find({}).then(moviesData => {
    res.render('movies', { moviesHbs: moviesData });
  });
});

module.exports = app;
