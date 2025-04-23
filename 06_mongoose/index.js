const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/moviesApp")
  .then(() => {
    console.log("connection open");
  })
  .catch((err) => {
    console.log(err);
  });

// define schema for movie
const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: Number,
});

// define model for movie
const Movie = mongoose.model("Movie", movieSchema);

// saving a single instance
// const newMovie = new Movie({
//   title: 'Jaat',
//   year: 2025,
//   rating: 10
// })

// newMovie.save()

//saving multiple instances at once
// Movie.insertMany([
//   { title: "Gadar", year: 2015, rating: 8.5 },
//   { title: "Prem Ratan Dhan payo", year: 2018, rating: 8.2 },
//   { title: "Sikandar", year: 2025, rating: 5.5 },
//   { title: "Kesari", year: 2025, rating: 8.5 },
// ]).then((data) => {
//   console.log("inserted successfully");
//   console.log("data:",data);
// }).catch((err)=> console.error(`Error occurred: ${err}`));
