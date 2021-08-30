const express = require("express");
const auth = require("../../middlewares/auth");
const upload = require("../../utils/multer");
const Cinema = require("../../models/cinema");

const router = new express.Router();

// Create a cinema
router.post("/addcinema", auth.enhance, async (req, res) => {
  const cinema = new Cinema(req.body);
  try {
    await cinema.save();
    res.status(201).send(cinema);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post(
  "/cinemas/photo/:id",
  upload("cinemas").single("file"),
  async (req, res, next) => {
    const url = `${req.protocol}://${req.get("host")}`;
    const { file } = req;
    const movieId = req.params.id;
    try {
      if (!file) {
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
      }
      const cinema = await Cinema.findById(movieId);
      if (!cinema) return res.sendStatus(404);
      cinema.image = `${url}/${file.path}`;
      await cinema.save();
      res.send({ cinema, file });
    } catch (e) {
      console.log(e);
      res.sendStatus(400).send(e);
    }
  }
);

// Get all cinemas
router.get("/getcinemas", async (req, res) => {
  try {
    const cinemas = await Cinema.find({});
    res.send(cinemas);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get cinema by id
router.get("/cinemas/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const cinema = await Cinema.findById(_id);
    if (!cinema) return res.sendStatus(404);
    return res.send(cinema);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Update cinema by id
router.patch("/updatecinema/:id", auth.enhance, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "ticketPrice",
    "city",
    "seats",
    "seatsAvailable",
    "cityId",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates!" });

  try {
    const cinema = await Cinema.findById(_id);
    updates.forEach((update) => (cinema[update] = req.body[update]));
    await cinema.save();
    if (!cinema) return res.sendStatus(404);
    return res.send(cinema);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Delete cinema by id
router.delete("/cinemas/:id", auth.enhance, async (req, res) => {
  const _id = req.params.id;
  try {
    const cinema = await Cinema.findByIdAndDelete(_id);
    if (!cinema) return res.sendStatus(404);
    return res.send(cinema);
  } catch (e) {
    return res.sendStatus(400);
  }
});

module.exports = router;
