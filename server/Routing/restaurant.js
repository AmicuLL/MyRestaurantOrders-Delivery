const create = require("../Restaurants/create");
//const edit = require("./orders/edit");
const view = require("../Restaurants/view");
const menu = require("../Restaurants/viewMenu");
const router = require("express").Router();

router.post("/create", create) // localhost:8080/api/restaurant/create
//router.put("/:id", edit) // /message/:id
//router.delete("/:id", edit) // /message/:id
router.get("/:id", view) // /order/:id
router.get("/", view) // /order/
router.get("/menu/:id", menu); // {url}/api/restaurant/menu/:id

module.exports = router