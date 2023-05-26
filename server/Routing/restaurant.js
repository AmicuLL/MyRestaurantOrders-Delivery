const create = require("../Restaurants/create");
const view = require("../Restaurants/view");

const createMenu = require("../Restaurants/Menu/createMenu");
const menu = require("../Restaurants/Menu/viewMenu");
//const edit = require("./orders/edit");

const imgUpload = require("../Restaurants/Menu/ImageUpload/upload");

const router = require("express").Router();

router.post("/create", create) // localhost:8080/api/restaurant/create
router.post("/createMenu", createMenu); //localhost:8080/api/restaurant/createMenu
router.post("/upload", imgUpload);
//router.put("/:id", edit) // /message/:id
//router.delete("/:id", edit) // /message/:id
router.get("/:id", view) // /restaurant/:id
router.get("/", view) // /restaurants/
router.get("/menu/:id", menu); // {url}/api/restaurant/menu/:id

module.exports = router