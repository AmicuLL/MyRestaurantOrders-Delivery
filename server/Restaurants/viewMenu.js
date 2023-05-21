const db = require("../database.js");

module.exports = async (req, res) => {
  try {
    let data = await db.getData("/menus"); // Use the asynchronous method

    const Menu = data.find(menu => menu._idRest == req.params.id);  //Same as restaurants (server/Restaurants/view.js). Individual menu isn't requested.
    if (!Menu) return res.status(404).json({ error: "The menu for given id doesn't exist." });

    res.status(200).json(Menu.food);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "An error occurred while retrieving data" });
  }
};
