const mongoose = require("mongoose");

const { Schema } = mongoose;
const movieSchema = new Schema({
  cityId: {
    type: mongoose.Schema.Types.Mixed,
    ref: "City",
  },
  title: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  image: {
    type: String,
  },
  language: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  director: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  cast: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  duration: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
