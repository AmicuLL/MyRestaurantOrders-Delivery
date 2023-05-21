const router = require("express").Router();
const order = require("./order")
const restaurant = require("./restaurant");

router.use("/order", order); //http:localhost:8080/api/order
router.use("/restaurant", restaurant); //{url}/api/restaurant?s

module.exports = router