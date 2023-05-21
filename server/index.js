const express = require('express');
const path = require("path");
const bodyParser = require('body-parser')
const routing = require("./Routing")

const app = express();

app.use(express.static(path.join(__dirname, "../client"))); //server will run the index from client server :)

app.use(bodyParser.urlencoded({  // to support URL-encoded bodies
    extended: true
}));

app.use('/api', routing); //using rotuing for easier api configuration

app.listen(8080, () => console.log('Server listening on port 8080'));