let cart = [];
var actions = {
    submitOrder: function (value) {
        let name = document.getElementById("orderName").value; //required parameter
        let address = document.getElementById("orderAddress").value; //required parameter
        let distance = document.getElementById("orderDistance").value.replace("km", ""); //required parameter
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
                HOMEDisplay(response);
                //alert(utils.objToString(response)); //this function transforms from object elements into string to display
            }).catch(err => {
                alert(`Error: ${err.message}\n${err.response.data.error}`);
            });
        } else {
            alert("Please enter the field correctly.");
        }
    },
    getRestaurants: function () {
        API.viewRestaurants().then((data) => { Restaurant = data })
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
    },
    addMenu: function (id) {
        let name = document.getElementById("foodName").value;
        let description = document.getElementById("foodDescription").value;
        let price = document.getElementById("foodPrice").value;
        let src_img = (document.getElementById("foodImage").value) ? document.getElementById("foodImage").value.split('\\').pop() : ""; //extracting just the name
        if (document.getElementById("foodImage").value) {
            var imageFile = document.getElementById("foodImage").files[0];
            if (imageFile) {
                var formData = new FormData();
                formData.append('image', imageFile);
                formData.headers = { 'Content-Type': 'multipart/form-data' };
                actions.upload(formData, document.getElementById("foodImage").value.split('\\').pop());
            }
        }
        API.addMenu(id, name, description, price, src_img).then(response => {
            alert(utils.objToString(response.data.food)); //After post is done, the key that was created in server/Orders/create.js is returned and shown
        }).catch(alert)
    },
    upload: function (data, name) {
        API.uploadFiles(data, name).then(response => {
            console.log('The upload was successful');
            document.getElementById("foodName").value = ""; //after the menu was added, the fields are reinitialized (the previous information is deleted)
            document.getElementById("foodDescription").value = "";
            document.getElementById("foodPrice").value = "";
            document.getElementById("foodImage").value = "";
        }).catch(err => {
            console.log('Error occurred during upload:', err);
        });
    },
    addRestaurant: function () {
        let name = document.getElementById("restName").value;
        let description = document.getElementById("restDescription").value;
        let schedule = `${document.getElementById("restSSchedule").value} - ${document.getElementById("restESchedule").value}`;
        let min_order = (document.getElementById("restMinOrder").value == 'No limit') ? '' : document.getElementById("restMinOrder").value;
        let std_delivery_price = document.getElementById("restStdDelPrc").value;
        let std_max_delivery_distance = (document.getElementById("restStdMaxDelDist").value == 'No limit') ? '' : document.getElementById("restStdMaxDelDist").value;
        let extra_delivery_fee = (document.getElementById("restExtraDelFee").value == 'No limit') ? '' : document.getElementById("restExtraDelFee").value;
        //optional: extra,stdmaxdel, minorder
        API.addRestaurant(name, schedule, description, min_order, std_max_delivery_distance, std_delivery_price, extra_delivery_fee).then(response => {
            alert(utils.objToString(response));
            adminOptions("addRestaurant")
        }).catch(alert)
    },
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