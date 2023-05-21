const db = require("../database.js");

const crypto = require("crypto"); //to generate encrypted order key

module.exports = (req, res) => {
    const name = req.query.name;
    const mentions = req.body.mentions ? req.body.mentions: 'No mentions'; //optional param
    const address = req.body.address;
    const distance = req.query.distance;
    const cart = req.body.cart;
    const total = req.body.total;

    if (!name || !address || !distance || !cart) return res.status(400).json({ error: "Please provide necessary data (Required: Name, Adress, Distance, Cart)" }); // 400 - Bad request
    const hash = crypto.createHash("sha256").update(Date.now().toString()+name+address).digest('hex'); //kinda unique (two strings to be the same is almost impossible)
    let order = {
        timestamp: new Date().toLocaleString(),
        id: hash,
        name,
        address,
        distance,
        mentions,
        total,
        content: JSON.parse(cart),
        status: 'Unknown',
    }
    console.log(`${name} has created a post.`)
    db.push("/orders[]",order,true) //pushing into database array
    res.status(200).json(order) //returning the status and the data that was saved
}