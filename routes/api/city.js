const express = require("express");
const auth = require("../../middlewares/auth");
const City = require("../../models/city");
const Movie = require("../../models/movie");
const Cinema = require("../../models/cinema");
const router = new express.Router();

router.post("/addcity", auth.enhance, async (req, res) => {
  const city = new City(req.body);
  try {
    await city.save();
    res.status(201).send(city);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get all cities
router.get("/getcities", async (req, res) => {
  try {
    const cities = await City.find({});
    res.send(cities);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get city by id & show movies
router.get("/showmovies/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const city = await City.findById(_id);
    const movies = await Movie.find({ cityId: _id });
    if (!city) return res.sendStatus(404);
    return res.send(movies);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Get city by id & show cinemas
router.get("/showcinemas/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const city = await City.findById(_id);
    const cinemas = await Cinema.find({ cinemaId: _id });
    if (!city) return res.sendStatus(404);
    return res.send(cinemas);
  } catch (e) {
    return res.status(400).send(e);
  }
});

module.exports = router;
