const express = require('express');
const app = express();
const Movie = require('../models/Movie');

// Displaying ALL the movies from the database
app.get('/movies', (req, res) => {
  Movie.find({}).then(moviesData => {
    res.render('movies', { moviesHbs: moviesData });
  });
});

// Displaying the details for a single movie from the database
app.get('/movie/details/:movieId', (req, res) => {
  Movie.findById(req.params.movieId).then(movieData => {
    res.render('/movie', { movieHbs: movieData });
  });
});

module.exports = app;
