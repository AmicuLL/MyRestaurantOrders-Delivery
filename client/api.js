var API = { 
    api: axios.create({ baseURL: "http://localhost:8080/api" }), //main api
    addRestaurant: function(name, schedule, description, min_order, std_max_delivery_distance, std_delivery_price, extra_delivery_fee){
        return this.api.post(`/restaurant/create?name=${name}`, 
        new URLSearchParams({schedule, description, min_order, std_max_delivery_distance, std_delivery_price, extra_delivery_fee})) //url encoded
        .then(response => response.data)
    },
    createOrder: function (name, address, distance, mentions, total) {
        return this.api.post(`/order/create?name=${name}&distance=${distance}`, new URLSearchParams({address, mentions, total, cart})).then(response => response.data) //cart is not given as parameter bcs is global variable
    },
    viewOrder: function (id) {
        return this.api.get(`/order/${id}`).then(response => response.data)
    },
    viewAllOrders: function () {
        return this.api.get(`/order/`).then(response => response.data)
    },
    viewRestaurants: function(id) {
        if(id) {
            return this.api.get(`/restaurant/${id}`).then(response => response.data)
        } else if (!id) {
            return this.api.get(`/restaurant/`).then(response => response.data)
        } 
    },
    viewMenus: function(id) {
        return this.api.get(`/restaurant/menu/${id}`).then(response => response.data)
    }

}