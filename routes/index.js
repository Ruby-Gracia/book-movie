const router = require("express").Router();

router.use("/api/auth", require("./api/auth"));
router.use("/api/user", require("./api/users"));
router.use("/api/city", require("./api/city"));
router.use("/api/movie", require("./api/movie"));
router.use("/api/cinema", require("./api/cinema"));
router.use("/api/showtime", require("./api/showtime"));
router.use("/api/reservation", require("./api/reservation"));
router.use("/api/payment", require("./api/payment"));

module.exports = router;
