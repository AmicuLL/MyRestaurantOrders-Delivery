# Food Delivery App - MyRestaurantOrders

The application allows users to order food from a variety of restaurants.

Each restaurant has the following information:
- Name
- Schedule
- Minimum order (total food price without transportation fee)
- Standard delivery maximum distance (km)
- Standard delivery price
- Extra delivery fee (price/km)

The user cannot place an order for multiple restaurants at one time.
If the current time is out of the restaurant schedule, the user is not able to select the restaurant.

Once a restaurant is selected the menu items are displayed, each item having the following information:
- Name
- Description
- Price
- Representative image

When an item is added to the cart in addition to the desired quantity, the user can also write mentions.
Once the user has selected all the desired items, he can place the order by reaching the “Complete
order” form having the following fields:
- Name (required)
- Address (required)
- Distance in km (required)
- Order mentions (optional)

After the user submits, the order is confirmed by giving the user a unique code that can be entered on
the homepage to check the order details and status.

If the entered distance exceeds the standard delivery distance, the user will be charged each extra km
with the “Extra delivery fee”.
If the “Minimum order” is not reached the user will be alerted when trying to complete the form.

Modules required: express, node-json-db, multer (npm install express node-json-db multer)

Steps to use the application:
- Click RESTAURANTS button located in the Header.
- There are a dropdown menu that let you select one of the saved restaurants with the condition that the current time is within the working hours. Once the restaurant is selected, the details of the restaurant and its menu are displayed.
- Adding products to cart is done by pressing "Add to cart" button on desired product.
- After adding the products, press the "CART" button located in the Header to to proceed with the order.
- The cart will list all the products added with all the information submitted by you (The product, Quantity, Mentions). The total price is only for the products, without transportation fee.
- To access the completion form, press the "Submit Order" button and enter the required details (Required input: Name, Address, Distance and the cart must contain at least 1 item)
- After pressing the "Complete order!" button, the page will send you a popup containing the order key for tracking. With that key, go to the home page by pressing the "HOME" button in the Header section and paste the code in the input form and click "Track". On home page new elements are created and contains the information about your order with "total" being the total price with transport fees and also, if the maximum distance has been exceeded, with the additional delivery fee.
