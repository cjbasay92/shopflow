ShopFlow

A React-based inventory and order management dashboard built to practice real-world frontend development.

ShopFlow allows users to manage products, track inventory, create and edit orders, update order statuses, and configure store settings.

Features
Product management
Add products
Edit products
Delete products
Search products
Filter products by category
Track stock levels
Order management
Create orders
Edit orders
Delete orders
Update order status
Filter orders by status
Automatically update inventory when orders are created, edited, or deleted
Dashboard
Total products
In-stock products
Low-stock products
Total orders
Pending orders
Completed orders
Recent orders
Low-stock product overview
Store settings
Store name
Store email
Store phone
Currency selection
Default order status
Data persistence
Settings stored with localStorage
Product and order state managed with React
Technologies
React
JavaScript
Vite
CSS
HTML
localStorage
Git & GitHub
React Concepts Practiced

This project was built to strengthen practical React fundamentals, including:

useState
useEffect
Props
Component communication
Controlled forms
Event handling
Conditional rendering
Array methods such as map, filter, find, and reduce
State updates with the spread operator
Derived data
Form validation
Local storage
Managing shared state between components
Inventory Logic

ShopFlow connects orders with product inventory.

When an order is created, the ordered quantity is deducted from the corresponding product's stock.

When an order is deleted, the quantity is returned to inventory.

When an order is edited, ShopFlow calculates the difference between the old and new order quantities and updates inventory accordingly.

Changing the product on an existing order also restores the previous product's stock and deducts stock from the new product.

Getting Started

Clone the repository:

git clone https://github.com/cjbasay92/shopflow.git

Navigate into the project:

cd shopflow

Install dependencies:

npm install

Start the development server:

npm run dev

Then open the local URL provided by Vite.

Project Purpose

ShopFlow is a practice project created as part of my frontend development journey.

The goal was to move beyond small isolated React exercises and build a more complete application where multiple parts of the interface share and modify the same data.

The project focuses on understanding React and application logic rather than relying on external UI libraries.

Future Improvements

Possible future improvements include:

Improved form validation
Better error handling
Confirmation and feedback messages
More advanced dashboard analytics
Persistent product and order data
Authentication
Backend API integration
Author

CJ Basay

Frontend Developer in Progress