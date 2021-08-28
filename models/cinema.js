const mongoose = require("mongoose");

const { Schema } = mongoose;

const cinemaSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "City",
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
});

const Cinema = mongoose.model("Cinema", cinemaSchema);

module.exports = Cinema;
