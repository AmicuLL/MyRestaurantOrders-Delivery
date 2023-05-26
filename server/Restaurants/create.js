const db = require("../database.js");

module.exports = async (req, res) => {
    const name = req.query.name;
    const schedule = req.body.schedule;
    const description = req.body.description ? req.body.description : 'No description';
    const min_order = req.body.min_order ? req.body.min_order : 'No minimum order';
    const std_max_delivery_distance = req.body.std_max_delivery_distance ? req.body.std_max_delivery_distance : 'No limit';
    const std_delivery_price = req.body.std_delivery_price;
    const extra_delivery_fee = req.body.extra_delivery_fee ? req.body.extra_delivery_fee : 'No extra fee';


    if (!name || !schedule || !std_delivery_price) {
        res.status(400).json({ error: "Please provide necessary data (Required: Name, Schedule, Standard delivery price)" }) // 400 - Bad request
        return
    }
    let index = await db.getData("/restaurants");
    let restaurant = {
        name,
        _id: index.length + 1,
        description,
        schedule,
        min_order,
        std_delivery_price,
        std_max_delivery_distance,
        extra_delivery_fee
    }
    console.log(`The restaurant: "${name}" was added.`);
    db.push("/restaurants[]", restaurant, true);
    db.push("/menus[]", { _idRest: index.length + 1, food: [] }, true);
    res.status(200).json(restaurant)
}