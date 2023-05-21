const fs = require('fs');

let db = './Database/database.json';

module.exports = function check(database) { //checking if the database exists to avoid wipping data
    fs.access(database, fs.F_OK, (err) => { //Tryin' to acces the "database" json file
        if (err) { //if error occured, creating file + populating it with predefined values
            fs.writeFile(database, '',function (err) {  //creating file
                if (err) throw err; //if the file cannot be created, then error is thrown
                console.log(database +' database created.');
                writingDatabase(database); //populating the json file with predefined values
              });
          return
        }
      })
}

function writingDatabase(database) {
  const Restaurants = [
    {
      name: 'Italy Belly goodies',
      _id: 1,
      description: 'Italian food',
      schedule: '08:00 - 16:00',
      min_order: '$20.00',
      std_delivery_price: '$3.99',
      std_max_delivery_distance: '4.00',
      extra_delivery_fee: '$2'
    },
    {
      name: 'RoStaurant',
      _id: 2,
      description: 'Romanian food',
      schedule: '10:00 - 18:00',
      min_order: '$16.99',
      std_delivery_price: '$1.99',
      std_max_delivery_distance: '3.00',
      extra_delivery_fee: '$2.39'
    }
  ];

  const Menus = [
    {
      _idRest: 1,
      food: [
        {
          _id: 1,
          name: "Pizza Circle",
          description: "A pizza in the shape of a circle.",
          price: "$12.99",
          image: "circlepizza.jpg"
        },
        {
          _id: 2,
          name: "Pizza Square",
          description: "A pizza in the shape of a square.",
          price: "$15.99",
          image: "squarepizza.jpg"
        },
        {
          _id: 3,
          name: "Pizza Triangle",
          description: "A pizza in the shape of a triangle.",
          price: "$10.99",
          image: "trianglepizza.jpg"
        }
      ]
    },
    {
      _idRest: 2,
      food: [
        {
          _id: 1,
          name: "Polenta with cheese",
          description: "Mămăligă cu brânză",
          price: "$8.99",
          image: "mamaliga.jpg"
        },
        {
          _id: 2,
          name: "Sarmale with soup cream",
          description: "Sarmale are made of meat and rice, wrapped with pickled cabbage.",
          price: "$7.99",
          image: "sarmale.jpg"
        },
        {
          _id: 3,
          name: "Mititei with bread",
          description: "Grilled minced meat rolls.",
          price: "$2.99",
          image: "mititei.jpg"
        },
        {
          _id: 4,
          name: "Traditional Beef Soup",
          description: "A soup made of beef with love from our grandmas.",
          price: "$4.99",
          image: "beefsoup.jpg"
        }
      ]
    }
  ];

  const databaseObject = {
    restaurants: Restaurants,
    menus: Menus,
    orders: []
  };

  fs.writeFile(database, JSON.stringify({restaurants: Restaurants, menus: Menus, orders: []}, null, 2), function (err) {
    if (err) throw err;
    console.log('Database was initialized!');
  });
}
//check(db);