const create = require("../Orders/create");
//const edit = require("./orders/edit");
const view = require("../Orders/view");
const router = require("express").Router();

router.post("/create", create) // localhost:8080/api/order/create
//router.put("/:id", edit) // /message/:id
//router.delete("/:id", edit) // /message/:id
router.get("/:id", view) // /order/:id
router.get("/", view) // /order/

module.exports = router