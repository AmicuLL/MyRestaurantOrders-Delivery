function adminOptions(option) {
    if (document.getElementById("content")) {
        document.getElementById("content").remove();
        content = document.createElement("div");
        content.setAttribute("id", "content");
        content.setAttribute("class", "left");
        container.appendChild(content);
    }

    let ButtonAddRestaurant = document.createElement("button");
    let ButtonAddMenu = document.createElement("button");

    ButtonAddRestaurant.setAttribute("onclick", `adminOptions("addRestaurant")`);
    ButtonAddRestaurant.innerHTML = "Add Restaurant";
    ButtonAddMenu.setAttribute("onclick", `adminOptions("addMenu")`);
    ButtonAddMenu.innerHTML = "Add Menu";

    content.appendChild(ButtonAddRestaurant);
    content.appendChild(ButtonAddMenu);

    if (!option) {
        let info = document.createElement("h1");
        info.innerHTML = "Press one of the buttons.";
        content.appendChild(info);
    } else if (option == "addRestaurant") {
        if (document.getElementById("content") && (document.getElementById("restaurantName"))) {
            content.appendChild(ButtonAddRestaurant);
            content.appendChild(ButtonAddMenu);
        } else {
            content.appendChild(document.createElement("br"));
            let name = document.createElement("h4"); //Label for restaurant name
            name.innerHTML = "Restaurant name*:";
            name.style.display = "inline-block";
            name.style.margin = "3% 2% 0.5% 0%";
            content.appendChild(name);
            let nameInput = document.createElement("input");
            nameInput.id = "restName"; //document.getElemebtById to extract the info when calling the api
            content.appendChild(nameInput);
            content.appendChild(document.createElement("br"));

            let description = document.createElement("h4");
            description.innerHTML = "Restaurant description:";
            description.style.display = "inline-block";
            description.style.margin = "0.5% 2% 0.5% 0%";
            content.appendChild(description);
            let descriptionInput = document.createElement("textarea");
            descriptionInput.id = "restDescription";
            descriptionInput.rows = "3";
            descriptionInput.style.resize = "none";
            descriptionInput.style.width = "50%";
            content.appendChild(descriptionInput);
            content.appendChild(document.createElement("br"));

            let schedule = document.createElement("h4");
            schedule.innerHTML = "Schedule*:"; //start hour scroll + min scroll - end hour scroll + min scroll??
            schedule.style.display = "inline-block";
            schedule.style.margin = "0.5% 2% 0.5% 0%";
            content.appendChild(schedule);
            content.appendChild(document.createElement("span")).textContent = "Start time:";
            let scheduleStartInput = document.createElement("input");
            scheduleStartInput.id = "restSSchedule";
            scheduleStartInput.type = "time";
            content.appendChild(scheduleStartInput);
            content.appendChild(document.createElement("span")).innerHTML = `&emsp;&emsp;End time`;
            let scheduleEndInput = document.createElement("input");
            scheduleEndInput.id = "restESchedule";
            scheduleEndInput.type = "time";
            content.appendChild(scheduleEndInput);
            content.appendChild(document.createElement("br"));

            let min_order = document.createElement("h4");
            min_order.innerHTML = "Minimum order:";
            min_order.style.display = "inline-block";
            min_order.style.margin = "0.5% 2% 0.5% 0%";
            content.appendChild(min_order);
            let min_orderInput = document.createElement("input");
            min_orderInput.id = "restMinOrder";
            min_orderInput.value = inputValue(min_orderInput);
            min_orderInput.onfocus = () => inputValue(min_orderInput);
            min_orderInput.onblur = () => inputValue(min_orderInput);
            content.appendChild(min_orderInput);
            content.appendChild(document.createElement("br"));

            let std_delivery_price = document.createElement("h4");
            std_delivery_price.innerHTML = "Standard delivery price*:";
            std_delivery_price.style.display = "inline-block";
            std_delivery_price.style.margin = "0.5% 2% 0.5% 0%";
            content.appendChild(std_delivery_price);
            let std_delivery_priceInput = document.createElement("input");
            std_delivery_priceInput.id = "restStdDelPrc";
            content.appendChild(std_delivery_priceInput);
            content.appendChild(document.createElement("br"));

            let std_max_delivery_distance = document.createElement("h4");
            std_max_delivery_distance.innerHTML = "Standard maximum delivery distance:";
            std_max_delivery_distance.style.display = "inline-block";
            std_max_delivery_distance.style.margin = "0.5% 2% 0.5% 0%";
            content.appendChild(std_max_delivery_distance);
            let std_max_delivery_distanceInput = document.createElement("input");
            std_max_delivery_distanceInput.id = "restStdMaxDelDist";
            std_max_delivery_distanceInput.value = inputValue(std_max_delivery_distanceInput);
            std_max_delivery_distanceInput.onfocus = () => inputValue(std_max_delivery_distanceInput);
            std_max_delivery_distanceInput.onblur = () => { if (!std_max_delivery_distanceInput.value) std_max_delivery_distanceInput.value = "No limit" }; //example what does inputValue(param)
            content.appendChild(std_max_delivery_distanceInput);
            content.appendChild(document.createElement("br"));

            let extra_delivery_fee = document.createElement("h4");
            extra_delivery_fee.innerHTML = "Extra delivery fee:";
            extra_delivery_fee.style.display = "inline-block";
            extra_delivery_fee.style.margin = "0.5% 2% 0.5% 0%";
            content.appendChild(extra_delivery_fee);
            let extra_delivery_feeInput = document.createElement("input");
            extra_delivery_feeInput.id = "restExtraDelFee";
            extra_delivery_feeInput.value = inputValue(extra_delivery_feeInput);
            extra_delivery_feeInput.onfocus = () => inputValue(extra_delivery_feeInput);
            extra_delivery_feeInput.onblur = () => inputValue(extra_delivery_feeInput);
            content.appendChild(extra_delivery_feeInput);
            content.appendChild(document.createElement("br"));

            let info = document.createElement("h5");
            info.innerHTML = `Elements tagged with "<span style="color: red;">*</span>" are required!`;
            content.appendChild(document.createElement("br"))
            content.appendChild(info);
            content.appendChild(document.createElement("br"))

            let upload = document.createElement("button");
            upload.innerHTML = "Add restaurant";
            upload.onclick = () => { //Validating data before sending to api
                if (nameInput.value && scheduleEndInput.value && scheduleStartInput.value && (std_delivery_priceInput.value && validateNum(std_delivery_priceInput.value))) {
                    if (extra_delivery_feeInput.value != 'No limit' && std_max_delivery_distanceInput.value == 'No limit') {
                        alert(`The restaurant has been added, but the "Extra delivery fee" value (${extra_delivery_feeInput.value}) was changed into "No limit" because the "Standard Maximum Delivery Distance" has no limit.`);
                        extra_delivery_feeInput.value = 'No limit';
                    }
                    if (extra_delivery_feeInput.value == 'No limit' && std_max_delivery_distanceInput.value != 'No limit') return alert(`The restaurant was not added because you limited the "Standard Maximum Delivery Distance" value to: ${std_max_delivery_distanceInput.value}. So you have to add a price to the extra delivery (Extra delivery fee).`);
                    if (extra_delivery_feeInput.value != 'No limit' && !validateNum(extra_delivery_feeInput.value.replace("$", "")) && extra_delivery_feeInput.value.replace("$", "") > 0) return alert("The extra delivery fee must be a number!");
                    if (min_orderInput.value != 'No limit' && !validateNum(min_orderInput.value.replace('$', '')) && min_orderInput.value.replace("$", "") > 0) return alert("The minimum order value must be a number!");
                    if (std_delivery_priceInput.value && !validateNum(std_delivery_priceInput.value) && std_delivery_priceInput.value > 0) return alert("The standard delivery fee must be a number!");
                    if (std_max_delivery_distanceInput.value != 'No limit' && !validateNum(std_max_delivery_distanceInput.value) && std_max_delivery_distanceInput.value > 0) return alert("The standard maximum distance value must be a number!");
                    if (nameInput.value.length < 3) return alert("The name cannot be shorter than 3 characters!");
                    actions.addRestaurant();
                } else {
                    alert("Please enter the fields correctly\nThe required fields should be valid!");
                }
            }
            content.appendChild(upload);
        }

    } else if (option == "addMenu") {
        ORDER();
        content.insertBefore(ButtonAddRestaurant, document.getElementById("RestaurantSelection"));
        content.insertBefore(ButtonAddMenu, document.getElementById("RestaurantSelection"));
        content.insertBefore(document.createElement("br"), document.getElementById("RestaurantSelection"));
        if (document.getElementById("content") && (document.getElementById("foodName"))) {
            ORDER();
            content.appendChild(ButtonAddRestaurant);
            content.appendChild(ButtonAddMenu);
        }
        let dropDown = document.getElementById("dropDown");
        dropDown.removeAttribute("onclick");
        dropDown.removeAttribute("onchange");
        dropDown.addEventListener('change', function (event) { //using addEventListener by passing event 'click' and function to be executed, as in parameters 
            var selectedValue = event.target.value;
            if (selectedValue == "Undefined") {
                adminOptions("addMenu");
            } else if (!document.getElementById("foodName")) {
                let name = document.createElement("h4"); //Label for food name
                name.innerHTML = "Food name*";
                name.style.display = "inline-block";
                name.style.margin = "3% 2% 0.5% 0%"; //top-right-bottom-left
                content.appendChild(name);
                let nameInput = document.createElement("input");
                nameInput.id = "foodName"; //document.getElemebtById to extract the info
                content.appendChild(nameInput);
                content.appendChild(document.createElement("br"));

                let description = document.createElement("h4");
                description.innerHTML = "Food description";
                description.style.display = "inline-block";
                description.style.margin = "0.5% 2% 0.5% 0%";
                content.appendChild(description);
                let descriptionInput = document.createElement("textarea");
                descriptionInput.id = "foodDescription";
                descriptionInput.rows = "3";
                descriptionInput.style.resize = "none";
                descriptionInput.style.width = "50%";
                content.appendChild(descriptionInput);
                content.appendChild(document.createElement("br"));

                let price = document.createElement("h4");
                price.innerHTML = "Food price*";
                price.style.display = "inline-block";
                price.style.margin = "0.5% 2% 0.5% 0%";
                content.appendChild(price);
                let priceInput = document.createElement("input");
                priceInput.id = "foodPrice";
                content.appendChild(priceInput);
                content.appendChild(document.createElement("br"));

                let image = document.createElement("h4");
                image.innerHTML = "Image file:";
                image.style.display = "inline-block";
                image.style.margin = "0.5% 2% 0.5% 0%";
                content.appendChild(image);
                let imageInput = document.createElement("input");
                imageInput.id = "foodImage";
                imageInput.type = "file";
                imageInput.accept = "image/png, image/jpeg, image/bmp, image/gif"
                content.appendChild(imageInput);
                content.appendChild(document.createElement("br"));

                let info = document.createElement("h5");
                info.innerHTML = `Elements tagged with "<span style="color: red;">*</span>" are required!`;
                content.appendChild(document.createElement("br"))
                content.appendChild(info);
                content.appendChild(document.createElement("br"))

                let upload = document.createElement("button");
                upload.innerHTML = "Add food to the menu";
                upload.onclick = () => {
                    if (validateNum(!priceInput.value) && priceInput.value > 0) return alert("Food price should be an integer and positive!");
                    if (nameInput.value.length < 3) return alert("The food name should be longer than 3 chars!");
                    actions.addMenu("parseInt(document.getElementById(\"dropDown\").value)");
                }
                //upload.setAttribute("onclick", "actions.addMenu(parseInt(document.getElementById(\"dropDown\").value))");
                content.appendChild(upload);
            }
        });
    }
}

function inputValue(element) { //function for optional input. Removing "No limit" on click and adding it again if the user "unclick" it just if the input is blank
    if (element.value == "No limit") return element.value = "";
    if (!element.value) return element.value = "No limit"
}
function validateNum(value) { //checking the input for number
    if (!isNaN(value)) return true;
    return false;
}
