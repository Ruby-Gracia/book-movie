const mongoose = require("mongoose");

const { Schema } = mongoose;
const reservationSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  startAt: {
    type: Schema.Types.ObjectId,
    ref: "Showtime",
    required: true,
    trim: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  ticketPrice: {
    type: Schema.Types.ObjectId,
    ref: "Cinema",
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  cinemaId: {
    type: Schema.Types.ObjectId,
    ref: "Cinema",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  checkin: {
    type: Boolean,
    default: false,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
