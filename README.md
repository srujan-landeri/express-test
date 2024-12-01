# E-Commerce Platform

## Overview
This is a simple Express.js based e-commerce platform with product and user management features.

## Setup

### Prerequisites
- Node.js (v14+ recommended)
- npm (Node Package Manager)

### Installation
1. Clone the repository
2. Install dependencies:
   
   npm install
   

### Running the Application
- Development mode:
  
  npm run dev
  
- Production mode:
  
  npm start
  

## API Endpoints

### Products
- GET /api/products - List all products
- GET /api/products/:id - Get specific product
- POST /api/products - Create new product
- PUT /api/products/:id - Update product
- DELETE /api/products/:id - Delete product

### Users
- GET /api/users - List users
- GET /api/users/:id - Get user profile
- POST /api/users/register - Register new user
- POST /api/users/:id/cart - Add item to cart
- POST /api/users/:id/checkout - Checkout cart

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License.