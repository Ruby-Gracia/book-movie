const cors = require("cors");
const express = require("express");
const logger = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/mongoose");
const routes = require("./routes");
var util = require("util");
var encoder = new util.TextEncoder("utf-8");

// Make all variables from our .env file available in our process
dotenv.config({ path: ".env" });

// Init express server
const app = express();

// Connect to MongoDB.
connectDB();

// Middlewares & configs setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.set("views", "views");
app.set("view engine", "ejs");

const allowedOrigins = ["http://localhost:3000/", "http://localhost:3001/"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
    "x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

// Here we define the api routes
app.use(routes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
