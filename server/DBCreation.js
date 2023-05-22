const fs = require('fs');

module.exports = function check(database) { //checking if the database exists to avoid wiping data
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
      schedule: '08:00 - 15:00',
      min_order: '$20.00',
      std_delivery_price: '$3.99',
      std_max_delivery_distance: '4.00',
      extra_delivery_fee: '$2'
    },{
      name: 'RoStaurant',
      _id: 2,
      description: 'Romanian food',
      schedule: '14:00 - 20:00',
      min_order: '$16.99',
      std_delivery_price: '$1.99',
      std_max_delivery_distance: '3.00',
      extra_delivery_fee: '$2.39'
    },{
      name: 'German Essen',
      _id: 3,
      description: 'Restaurant mit deutschen Besonderheiten',
      schedule: '19:00 - 02:00',
      min_order: '$25.39',
      std_delivery_price: '$3.49',
      std_max_delivery_distance: '5.00',
      extra_delivery_fee: '$1.19'
    },{
      name: 'Magyar étel. A legjobb!',
      _id: 4,
      description: 'Étterem hagyományos magyar ételekkel',
      schedule: '01:00 - 08:00',
      min_order: '$35.79',
      std_delivery_price: '$2.89',
      std_max_delivery_distance: '4.50',
      extra_delivery_fee: '$0.87'
    },
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
        },{
          _id: 2,
          name: "Pizza Square",
          description: "A pizza in the shape of a square.",
          price: "$15.99",
          image: "squarepizza.jpg"
        },{
          _id: 3,
          name: "Pizza Triangle",
          description: "A pizza in the shape of a triangle.",
          price: "$10.99",
          image: "trianglepizza.jpg"
        },
      ]
    },{
      _idRest: 2,
      food: [
        {
          _id: 1,
          name: "Polenta with cheese",
          description: "Mămăligă cu brânză",
          price: "$8.99",
          image: "mamaliga.jpg"
        },{
          _id: 2,
          name: "Sarmale with soup cream",
          description: "Sarmale are made of meat and rice, wrapped with pickled cabbage.",
          price: "$7.99",
          image: "sarmale.jpg"
        },{
          _id: 3,
          name: "Mititei with bread",
          description: "Grilled minced meat rolls.",
          price: "$2.99",
          image: "mititei.jpg"
        },{
          _id: 4,
          name: "Traditional Beef Soup",
          description: "A soup made of beef with love from our grandmas.",
          price: "$4.99",
          image: "beefsoup.jpg"
        }
      ]
    },{
      _idRest: 3,
      food: [
        {
          _id: 1,
          name: "Wurst and Sauerkraut",
          description: "Nestle the browned bratwurst down into the sauerkraut.",
          price: "$6.53",
          image: "wurstsauerkraut.jpg"
        },{
          _id: 2,
          name: "Pretzel",
          description: "Bagel. Pretzel. With Salt.",
          price: "$1.42",
          image: "pretzel.jpg"
        },{
          _id: 3,
          name: "Sauerbraten",
          description: "A slice of horse meat, beef, or venison is marinated in vinegar, spices, and wine mixture and left to rest for several days before its roasted.",
          price: "$18.49",
          image: "sauerbraten.jpg"
        },{
          _id: 4,
          name: "Rinderroulade",
          description: "Prepared by rolling quality thin slices of beef around bacon, pickles, onions, and mustard. Then, it’s roasted with red wine to create a deep rich flavor.",
          price: "$8.46",
          image: "rinderroulade.jpg"
        },{
          _id: 5,
          name: "Rinderroulade",
          description: "Prepared by rolling quality thin slices of beef around bacon, pickles, onions, and mustard. Then, it’s roasted with red wine to create a deep rich flavor.",
          price: "$8.46",
          image: "rinderroulade.jpg"
        }
      ]
    },{
      _idRest: 4,
      food: [
        {
          _id: 1,
          name: "Goulash (Gulyás)",
          description: "Hungarian Goulash is a delicious beef stew (or soup) with a rich paprika seasoned broth.",
          price: "$7.29",
          image: "goulash.jpg"
        },{
          _id: 2,
          name: "Fisherman's Soup (Halászlé)",
          description: "Soup prepared with fish, bell peppers, tomatoes and spicy paprika.",
          price: "$5.79",
          image: "fisherman.jpg"
        },{
          _id: 3,
          name: "Chicken Paprikash (Csirke Paprikás)",
          description: "Is made with browned chicken that is braised in a velvety rich and creamy paprika sauce.",
          price: "$6.69",
          image: "chickenpaprikas.jpg"
        },{
          _id: 4,
          name: "Stuffed Cabbage Leaves (Töltött Káposzta)",
          description: "A dish of Eastern European origin, little bundles of cabbage leaves that have been stuffed and cooked with a mixture of ground meat (beef /pork), onions, paprika, rice, garlic and egg.",
          price: "$4.99",
          image: "stuffedcabbage.jpg"
        },{
          _id: 5,
          name: "Schweinshaxe",
          description: "It involves roasting pork at low temperatures for two to three hours or until the skin falls off the bone. The meat becomes juicy and tender, and the skin brittle and crispy.",
          price: "$12.77",
          image: "schweinshaxe.jpg"
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