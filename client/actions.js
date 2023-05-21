let cart = [];
var actions = {
    submitOrder: function (value) {
        let name = document.getElementById("orderName").value; //required parameter
        let address = document.getElementById("orderAddress").value; //required parameter
        let distance = document.getElementById("orderDistance").value; //required parameter
        let mentions = document.getElementById("orderMentions").value; //optional parameter
        if (name && address && distance && cart) { //validating values
            cart = JSON.stringify(cart, null, 2); //parsing object into string for post method
            API.createOrder(name, address, distance, mentions, value).then(response => {
                alert(`Created order successfully! Your order-key is: ${response.id}`); //After post is done, the key that was created in server/Orders/create.js is returned and shown
                location.reload();
                //document.getElementById("orderKey").innerHTML = response.id; //?Implementing a input with readonly attribute?
            }).catch(alert)
        } else {
            alert("Please enter the fields correctly\nThe required fields, as the cart should be populated.")
        }
    },
    viewOrder: function (id) {
        if (id) {
            API.viewOrder(id).then(response => {
                alert(utils.objToString(response)); //this function transforms from object elements into string to display
            }).catch(alert);
        } else {
            alert("Please enter the field correctly.");
        }
    },
    getRestaurants: function () { //unused at this moment
        API.viewRestaurants().then(response => {
            //alert(`Name: ${response[1].name}\nDescription: ${response[1].description}`);
            response.forEach(element => {

            });
        });

    },
    cart: function (RestId, id, qty, mentions) { //function to add the content from cart into a array that will be pushed into database as json string through post method
        let food;
        API.viewMenus(RestId).then(response => {
            food = response[id] //this is the food object. food: { id: "", name: "", description: ""...}
            let content = { //the content is the order products.
                food,   //the food type
                qty,  //quantity
                mentions  //individual mentions for the food
            }
            cart.push(content);  //pushing into cart array
        });
    },
    filterWorkingHours: function (schedule) { //if the time isn't in schedule, then restaurant isn't selectable. An specific error is thrown
        const currentTime = new Date(); //current time
        const [startTime, endTime] = schedule.split(' - '); //[xx:xx , xx:xx]
        const [startHour, startMinute] = startTime.split(':').map(Number); //[xx , xx]
        const [endHour, endMinute] = endTime.split(':').map(Number);

        const crossesMidnight = startHour > endHour; //checking if is crossing 24:00
        if (crossesMidnight) { //if yes,
            if (currentTime.getHours() >= startHour || currentTime.getHours() < endHour) { //just one has to be valid bcs 20 < 08 if crosses midnight
                return true;
            }
        } else { //if not
            if (currentTime.getHours() === startHour && currentTime.getMinutes() >= startMinute) { //if the hour is equal, checking minutes.
                return true;
            }
            if (currentTime.getHours() > startHour && currentTime.getHours() < endHour) { //current hour bigger than schedule => return true |schedule: 07:00, curr time = 09:00 => true
                return true;
            }
            if (currentTime.getHours() === endHour && currentTime.getMinutes() <= endMinute) { //current hour smaller than schedule => return true |schedule: 16:00, curr time = 15:00 => true
                return true;
            }
        }
        return false; //otherwise is not between schedule
    }
};
var utils = { //function to transform from objects into strings
    objToString: (o) => {
        let final = ''
        for (const [key, value] of Object.entries(o)) {
            final += `${key}: ${value}\n`
        }
        return final
    },
};