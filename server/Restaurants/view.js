const db = require("../database.js");

module.exports = async (req, res) => {
  try {
    let data = await db.getData("/restaurants"); // Use asynchronous method for reading database files

    if (!req.params.id) return res.status(200).json(data); //checking that api/restaurant/:id isn't present and showing all the restaurants !!!Didn't use individual request. Edit restaurants?

    const Restaurant = data.find(restaurant => restaurant._id == req.params.id); //finding the restaurant with given id as param ??? IS NOT USED

    if (!Restaurant) return res.status(404).json({ error: "Order with that key was not found" });

    res.status(200).json(Restaurant);
  }
  catch (error) {
    console.error("[Restaurants view]Error retrieving data:", error);
    res.status(500).json({ error: "An error occurred while retrieving data" });
  }
};
