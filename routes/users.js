var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond a resource");
});

router.get("/viktiginfo", function (req, res, next) {
  console.log("Request type:", req.method);
  res.send("Pål e en kuk");
});

module.exports = router;
