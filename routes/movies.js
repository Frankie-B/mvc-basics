const express = require('express');
const app = express();
const Movie = require('../models/movie');

// Displaying ALL the movies from the database
app.get('/movie', (req, res) => {
  Movie.find({}).then(moviesData => {
    res.render('movies', { moviesHbs: moviesData });
  });
});

// Displaying the details for a single movie from the database
app.get('/movie/detail/:movieId', (req, res) => {
  Movie.findById(req.params.movieId)
    .then(movieData => {
      res.render('movie', { movieHbs: movieData });
    })
    .catch(error => {
      console.log('Could not get movie information: ', error);
    });
});

// search movies in the database and returning the results.
app.get('/movie/search/', (req, res) => {
  res.render('searchMovie');
});

app.get('/movie/search/results', (req, res) => {
  Movie.find({ title: req.query.title })
    .then(moviesData => {
      res.render('searchMovie', { moviesHbs: moviesData });
    })
    .catch(error => {
      console.log('Unable to find movie', error);
    });
});

// creating ne movie entries.
app.get('/movie/create', (req, res) => {
  res.render('createMovie');
});

app.post('/movie/create', (req, res) => {
  Movie.create({
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    duration: req.body.duration,
  })
    .then(movie => {
      res.redirect(`/movie/detail/${movie._id}`);
    })
    .catch(error => {
      console.log('Unable to create movie', error);
    });
});

// Deleting a an entry from the movie database.
// app.get('/movie/delet');

module.exports = app;
