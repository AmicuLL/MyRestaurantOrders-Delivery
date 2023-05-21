let container;
let content;
function init() {
    container = document.getElementById("container");
    //Creation of header
    let header = document.createElement("div");
    header.setAttribute("id", "header");
    header.setAttribute("class", "left");
    container.appendChild(header);


    //Creation of header elements
    let headerLogo = document.createElement("img");
    headerLogo.setAttribute("src", "./media/logo.png");
    headerLogo.setAttribute("style", "width: 60px; padding-left: 2%; margin-right: 20px;");
    header.appendChild(headerLogo);

    let headerButtonHome = document.createElement("input");
    headerButtonHome.setAttribute("type", "button");
    headerButtonHome.setAttribute("onclick", "HOME()");
    headerButtonHome.setAttribute("class", "buttonStyle");
    headerButtonHome.value = "HOME";
    header.appendChild(headerButtonHome);

    let headerButtonOrder = document.createElement("input");
    headerButtonOrder.setAttribute("type", "button");
    headerButtonOrder.setAttribute("onclick", "ORDER()");
    headerButtonOrder.setAttribute("class", "buttonStyle");
    headerButtonOrder.value = "RESTAURANTS";
    header.appendChild(headerButtonOrder);

    let headerButtonCart = document.createElement("input");
    headerButtonCart.setAttribute("type", "button");
    headerButtonCart.setAttribute("onclick", "Cart()");
    headerButtonCart.setAttribute("class", "buttonStyle");
    headerButtonCart.value = "CART";
    header.appendChild(headerButtonCart);

    let headerButtonAdmin = document.createElement("input");
    headerButtonAdmin.setAttribute("type", "button");
    headerButtonAdmin.setAttribute("onclick", "ADMIN()");
    headerButtonAdmin.setAttribute("class", "buttonStyle");
    headerButtonAdmin.value = "ADMIN";
    header.appendChild(headerButtonAdmin);

    content = document.createElement("div");
    content.setAttribute("id", "content");
    container.appendChild(content);
    content.setAttribute("class", "left");

    let footer = document.createElement("div");
    footer.setAttribute("id", "footer");
    footer.style.zIndex = "1";
    container.appendChild(footer);
    HOME();
}


let Restaurant;
API.viewRestaurants().then(function (result) {
    Restaurant = result;
});
let Menu;

function HOME() {
    // Removing all elements
    document.getElementById("content").remove();
    content = document.createElement("div");
    content.setAttribute("id", "content");
    content.setAttribute("class", "left");
    container.appendChild(content);

    var idLabel = document.createElement("h2");
    idLabel.setAttribute("id", "idLabel");
    idLabel.innerHTML = "Insert the Order Key to track your order";
    content.appendChild(idLabel);

    var inputId = document.createElement("input");
    inputId.setAttribute("id", "inputId");
    content.appendChild(inputId);

    var button = document.createElement("input");
    button.setAttribute("type", "submit");
    button.value = "Track";
    button.setAttribute("onclick", `actions.viewOrder(document.getElementById("inputId").value)`);
    content.appendChild(button);

}

function ORDER() {
    //Removing all elements
    document.getElementById("content").remove();
    content = document.createElement("div");
    content.setAttribute("id", "content");
    content.setAttribute("class", "left");
    container.appendChild(content);

    var label = document.createElement("label")
    label.innerHTML = "Choose the restaurant:";
    label.setAttribute("class", "left");
    label.style.fontSize = "130%";
    label.style.fontWeight = "bold";
    var dropDown = document.createElement("select");
    dropDown.setAttribute("id", "dropDown");
    dropDown.setAttribute("onchange", "Display()");
    dropDown.setAttribute("onclick", "saveSelected()");
    dropDown.setAttribute("style", "margin-left: 30px; font-size: 130%;");

    var option = document.createElement("option");
    option.setAttribute("class", "options");
    option.setAttribute("value", "Undefined");
    var textNode = document.createTextNode("Select a restaurant");
    option.appendChild(textNode);
    dropDown.appendChild(option);

    content.appendChild(label);
    content.appendChild(dropDown);
    for (let i = 0; i < Restaurant.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("class", "options");
        option.setAttribute("value", Restaurant[i]._id);
        var textNode = document.createTextNode(Restaurant[i].name);
        option.appendChild(textNode);
        dropDown.appendChild(option);
    }
    content.appendChild(document.createElement("br"));
}
let selected;
function saveSelected(){
    selected = document.getElementById("dropDown").value;
}

function Display() {
    if(Array.isArray(cart) && cart.length > 0) {
        if(confirm("You cannot select another restaurant without wiping the cart. Are you sure that you want to continue?")) {
            alert(`The cart was wiped and the desired restaurant was selected.`)
            cart = [];
        } else {
            document.getElementById('dropDown').value = selected;
        }
    }
    let nameR = document.getElementById("restaurantTitle");
    let descriptionR = document.getElementById("restaurantDescription");
    let min_order = document.getElementById("min-order");
    let std_max_delivery_distance = document.getElementById("stdMaxDelDist");
    let std_delivery_price = document.getElementById("stdDelPrice");
    let schedule = document.getElementById("schedule");
    let extraDelFee = document.getElementById("extraDelFee");

    if (!nameR && !descriptionR && !std_max_delivery_distance && !std_delivery_price && !schedule && !extraDelFee && !min_order) {
        nameR = document.createElement("h2")
        nameR.setAttribute("id", "restaurantTitle");
        content.appendChild(nameR);

        descriptionR = document.createElement("h4");
        descriptionR.setAttribute("id", "restaurantDescription");
        content.appendChild(descriptionR);

        schedule = document.createElement("h5");
        schedule.setAttribute("id", "schedule");
        content.appendChild(schedule);

        min_order = document.createElement("h5");
        min_order.setAttribute("id", "min-order");
        content.appendChild(min_order);

        std_max_delivery_distance = document.createElement("h5");
        std_max_delivery_distance.setAttribute("id", "stdMaxDelDist");
        content.appendChild(std_max_delivery_distance);

        std_delivery_price = document.createElement("h5");
        std_delivery_price.setAttribute("id", "stdDelPrice");
        content.appendChild(std_delivery_price);

        extraDelFee = document.createElement("h5");
        extraDelFee.setAttribute("id", "extraDelFee");
        content.appendChild(extraDelFee);
    }

    var x = document.getElementById("dropDown").value;
    if (x === "Undefined") {
        nameR.innerHTML = "To display the menu for a restaurant, plese select one";
        descriptionR.innerHTML = "";
        document.querySelectorAll('.divC').forEach(menuDisp => {
            menuDisp.remove();
        });
    } else if((x > 0) && (actions.filterWorkingHours(Restaurant[x-1].schedule) === false)) {
        alert(`The restaurant: ${Restaurant[x-1].name} is closed. You can't select this restaurant until they open. Their schedule is: ${Restaurant[x-1].schedule}`);
        document.getElementById('dropDown').value = selected;   
    } else {
        nameR.innerHTML = `Restaurant name: ${Restaurant[x - 1].name}`;
        descriptionR.innerHTML = `Restaurant description: ${Restaurant[x - 1].description}`;
        schedule.innerHTML = `Working program: ${Restaurant[x-1].schedule}`;
        min_order.innerHTML = `The minimum order that can be placed: ${Restaurant[x-1].min_order}`;
        std_max_delivery_distance.innerHTML = `Standard max delivery distance: ${Restaurant[x-1].std_max_delivery_distance} km`;
        std_delivery_price.innerHTML = `Standard delivery price: ${Restaurant[x-1].std_delivery_price}/km`;
        extraDelFee.innerHTML = `If the distance exceeded the standard maxim distance, you'll be taxed with extra: ${Restaurant[x-1].extra_delivery_fee}/km`;

        API.viewMenus(x).then(function (result) {
            Menu = result;
            document.querySelectorAll('.divC').forEach(menuDisp => {
                menuDisp.remove();
            });
            for (let i = 0; i < Menu.length; i++) {
                let CreateDiv = document.createElement("div");
                CreateDiv.setAttribute("class", "divC");
                CreateDiv.setAttribute("style", "width:48.12%; height:auto; padding: 15px; border:1px solid black; display: inline-block;");
                content.appendChild(CreateDiv);

                let img = document.createElement("img");
                img.setAttribute("src", `media/menu photos/${Menu[i].image}`); //name of the image source file. the path is not hardcoded, just the name
                img.setAttribute("id", "imgid" + Menu[i]._id);
                img.setAttribute("style", "width: 80%; display: block; margin-left: auto; margin-right: auto;")

                let name = document.createElement("h4");
                name.innerHTML = Menu[i].name;

                let description = document.createElement("p");
                description.innerHTML = Menu[i].description;

                let price = document.createElement("h6");
                price.innerHTML = Menu[i].price;

                let addToCart = document.createElement("input");
                addToCart.setAttribute("type", "submit");
                addToCart.setAttribute("onclick", `AddToCart(${x},${i})`);
                addToCart.value = "Add to cart";


                CreateDiv.appendChild(img);
                CreateDiv.appendChild(name);
                CreateDiv.appendChild(description);
                CreateDiv.appendChild(price);
                CreateDiv.appendChild(addToCart);
                CreateDiv.appendChild(document.createElement("br"));
            }
        })
    }
    for (let k = 0; k < Restaurant.length; k++) {
        //for(let i = 0; i<Restaurant[i].food.length; i++) {

        //}
    }
}
function Cart() {
    document.getElementById("content").remove(); //removing all elements (the worst way possible)
    content = document.createElement("div");
    content.setAttribute("id", "content");
    content.setAttribute("class", "left");
    container.appendChild(content);

    let labelCart = document.createElement("h3");
    labelCart.innerHTML = "Cart"
    content.appendChild(labelCart);

    let variable = 0;

    if (!cart.length) { //cart variable is global. cart: [qty: X, mentions: "X", food:{ name: "X"...}]
        let aux = document.createElement("h4");
        aux.innerHTML = "No products yet in the cart.";
        content.appendChild(aux);
    } else {
        cart.forEach((element, i) => { //creating fields for cart information for n elements in the cart
            let cDiv = document.createElement("div");
            cDiv.style.border = "2px solid #00308F"
            cDiv.style.padding = "10px";
            cDiv.style.display = "inline-block";
            let product = document.createElement("h2");
            let nameL = document.createElement("h4");
            let descriptionL = document.createElement("p");
            let price = document.createElement("p");
            let qtyL = document.createElement("p");
            let mentions = document.createElement("p");

            product.innerHTML = `Product ${i+1}`;
            nameL.innerHTML = `Food name:${element.food.name}`;
            descriptionL.innerHTML = `Description: ${element.food.description}`;
            price.innerHTML = `Price: ${element.food.price}`;
            qtyL.innerHTML = `Quantity: ${element.qty}`;
            mentions.innerHTML = `Your mentions: ${element.mentions}`;

            content.appendChild(cDiv);
            cDiv.appendChild(product);
            cDiv.appendChild(nameL);
            cDiv.appendChild(descriptionL);
            cDiv.appendChild(price);
            cDiv.appendChild(qtyL);
            cDiv.appendChild(mentions);
            
            variable += parseFloat(element.qty * element.food.price.replace('$', ''));
        });
        let total = document.createElement("h2");
        total.setAttribute("id", "total");
        total.innerHTML = `Total: $${variable}`;
        content.appendChild(total);
    
        let submit = document.createElement("input");
        submit.setAttribute("type", "submit");
        submit.value = "Submit Order";
        submit.setAttribute("onclick", "submitOrderRedirect()");
        content.appendChild(submit);
    }
}
function AddToCart(restaurantId, id) {
    qty = prompt("Quantity:", "1");
    mentions = prompt("Mentions:", "No mentions");
    actions.cart(restaurantId, id, qty, mentions);
}

function submitOrderRedirect(){
    if(parseFloat(document.getElementById("total").innerHTML.slice(8)) < parseFloat(Restaurant[selected-1].min_order.replace('$', ''))) { //last selected restaurant -1 (Restaurant array starts from 0)
        alert(`The minimul order threshold wasn't fulfilled! Please add products until ${Restaurant[selected-1].min_order} threshold is passed.\nYou must add products worth: $${parseFloat(Restaurant[selected-1].min_order.replace('$', '')) - parseFloat(document.getElementById("total").innerHTML.slice(8))} `);
    } else {
        submitOrder();
    }
}

function sendOrder(distance){
    //calculating total price with delivery ? extra delivery
    let extraDistance = parseFloat(Restaurant[selected-1].std_max_delivery_distance) - parseFloat(distance);
    extraDistance = (extraDistance < 0) ? ((parseFloat(Restaurant[selected-1].std_max_delivery_distance) * parseFloat(Restaurant[selected-1].std_delivery_price.replace('$',''))) + ((-1 * parseFloat(extraDistance)) * parseFloat(Restaurant[selected-1].extra_delivery_fee.replace('$','')))) : (parseFloat(Restaurant[selected-1].std_max_delivery_distance) * parseFloat(Restaurant[selected-1].std_delivery_price.replace('$','')));
    actions.submitOrder(parseFloat(document.getElementById("total").innerHTML.slice(8)) + parseFloat(extraDistance));
}

function submitOrder() {
    document.getElementById("content").remove();
    content = document.createElement("div");
    content.setAttribute("id", "content");
    content.setAttribute("class", "left");
    container.appendChild(content);

    let content2 = document.createElement("div");
    content2.setAttribute("style", "width:40%; float: left; display: inline-block;");
    content.appendChild(content2);

    let basket = document.createElement("div");
    basket.setAttribute("style", "width:60%; float: right; display: inline-block;");
    content.appendChild(basket);

    let Complete = document.createElement("h2");
    Complete.innerHTML = "Complete order form";
    content2.appendChild(Complete);
    content2.appendChild(document.createElement("br"));

    let name = document.createElement("input");
    name.style.display = "inline-block";
    let nameL = document.createElement("p");
    nameL.style.display = "inline-block";

    let address = document.createElement("input");
    address.style.display = "inline-block";
    let addressL = document.createElement("p");
    addressL.style.display = "inline-block";

    let distance = document.createElement("input");
    distance.style.display = "inline-block";
    distance.setAttribute("id", "orderDistance");
    let distanceL = document.createElement("p");
    distanceL.style.display = "inline-block";

    let mentions = document.createElement("input");
    mentions.style.display = "inline-block";
    let mentionsL = document.createElement("p");
    mentionsL.style.display = "inline-block";

    let submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.value = "Complete Order!";
    submit.setAttribute("onclick", `sendOrder(document.getElementById("orderDistance").value)`);

    name.setAttribute("id", "orderName");
    nameL.innerHTML = "[Required]Name:";

    address.setAttribute("id", "orderAddress");
    addressL.innerHTML = "[Required]Address:";

    distance.setAttribute("id", "orderDistance");
    distanceL.innerHTML = "[Required]Distance:";

    mentions.setAttribute("id", "orderMentions");
    mentionsL.innerHTML = "Mentions:";

    content2.appendChild(nameL);
    content2.appendChild(name);
    content2.appendChild(document.createElement("br"));

    content2.appendChild(addressL);
    content2.appendChild(address);
    content2.appendChild(document.createElement("br"));

    content2.appendChild(distanceL);
    content2.appendChild(distance);
    content2.appendChild(document.createElement("br"));

    content2.appendChild(mentionsL);
    content2.appendChild(mentions);
    content2.appendChild(document.createElement("br"));

    content2.appendChild(submit);


    let variable = 0;
    cart.forEach((element, i) => { //creating fields for cart information for n elements in the cart
        let cDiv = document.createElement("div");
        cDiv.style.borderBottom = "2px solid #00308F";
        let product = document.createElement("h2");
        let nameL = document.createElement("h4");
        let descriptionL = document.createElement("p");
        let price = document.createElement("p");
        let qtyL = document.createElement("p");
        let mentions = document.createElement("p");

        product.innerHTML = `Product ${i+1}`;
        nameL.innerHTML = `Food name:${element.food.name}`;
        descriptionL.innerHTML = `Description: ${element.food.description}`;
        price.innerHTML = `Price: ${element.food.price}`;
        qtyL.innerHTML = `Quantity: ${element.qty}`;
        mentions.innerHTML = `Your mentions: ${element.mentions}`;

        basket.appendChild(cDiv);
        cDiv.appendChild(product);
        cDiv.appendChild(nameL);
        cDiv.appendChild(price);
        cDiv.appendChild(qtyL);
        
        variable += parseFloat(element.qty * element.food.price.replace('$', ''));
    });
    let total = document.createElement("h2");
    total.setAttribute("id", "total");
    total.innerHTML = `Total: $${variable}`;
    basket.appendChild(total);

}