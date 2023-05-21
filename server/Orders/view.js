const db = require("../database.js");

module.exports = async (req, res) => {
  try {
    let data = await db.getData("/orders"); // Use the asynchronous method
    if (!req.params.id) return res.status(200).json(data);

    const Order = data.find(order => order.id == req.params.id);

    if (!Order) return res.status(404).json({ error: "order with that key was not found" });

    res.status(200).json(Order);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "An error occurred while retrieving data" });
  }
};
