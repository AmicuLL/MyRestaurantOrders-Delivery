const db = require("../../database.js");

module.exports = async (req, res) => {
    const id = req.body.id; //restaurant id
    const name = req.body.name; //food name
    const description = req.body.description ? req.body.description : 'No description'; //food description
    const price = req.body.price.replace('$', '').replace(',', '.'); //food price
    const src_img = req.body.src_img ? req.body.src_img : 'Image_not_available.png'; //food image

    if (!id || !name || !price) return res.status(400).json({ error: "Please provide necessary data (Required: Restaurant ID, Name, Price)." }); // 400 - Bad request

    let data;
    let restaurant;
    try {
        data = await db.getData(`/menus[${id - 1}]/food`);
        restaurant = await db.getData(`/restaurants`);
    } catch (err) {
        console.log('Error: ', err);
    }
    let food = {
        _id: data.length + 1,
        name,
        description,
        price: `$${price}`,
        image: src_img
    };

    data.push(food);
    let Name = restaurant.find(restaurant => restaurant._id == id).name;
    console.log(`The menu was added for ${Name}.`);
    db.push(`/menus[${id - 1}]/food`, data, true);
    res.status(200).json(food);
}