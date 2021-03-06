const router = require("express").Router();

router.use("/api/auth", require("./api/auth"));
router.use("/api/users", require("./api/users"));
router.use("/api/movies", require("./api/movie"));
router.use("/api/cinemas", require("./api/cinema"));
router.use("/api/showtime", require("./api/showtime"));
router.use("/api/city", require("./api/city"));

module.exports = router;
