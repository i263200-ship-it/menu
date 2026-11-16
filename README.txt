# Raja Daba — Restaurant Website

A responsive multi-page restaurant website built with plain HTML, CSS and JavaScript.

## Run it
1. Extract `raja-daba-website.zip`.
2. Open the extracted `raja-daba-website` folder.
3. Double-click `index.html` to open the website in a browser.
4. Keep all HTML files, `style.css`, and `script.js` together in the same folder.

An internet connection is required for the food photographs, which are loaded from Unsplash.

## Included pages
- `index.html` — Home, restaurant story and featured dishes
- `menu.html` — Searchable/filterable menu and add-to-cart buttons
- `gallery.html` — Food gallery
- `contact.html` — Validated contact form demo
- `cart.html` — Cart quantities, remove buttons and totals
- `checkout.html` — Customer details form and demo order confirmation

## How ordering works
The cart is saved in browser `localStorage`, so it stays available while navigating between pages in the same browser. Checkout validates the customer's name, email, phone and address, then shows a confirmation and clears the cart.

## Important demo note
This is a frontend-only demonstration. It does not send orders to a restaurant, store contact messages on a server, or process real payments. The address, phone number, email, menu and prices are sample content and should be replaced with the restaurant's real details before publishing.
