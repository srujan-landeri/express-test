const express = require('express');
const router = express.Router();

// In-memory user database (would be replaced by actual database in production)
let users = [
  {
    id: 1,
    username: 'shopper1',
    email: 'shopper1@example.com',
    orders: [],
    cart: []
  },
  {
    id: 2,
    username: 'buyer2',
    email: 'buyer2@example.com',
    orders: [],
    cart: []
  }
];

// Get all users (minimal info for security)
router.get('/', (req, res) => {
  const safeUsers = users.map(({ id, username, email }) => ({ 
    id, 
    username, 
    email 
  }));
  res.json(safeUsers);
});

// Get user profile
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Remove sensitive information
  const { password, ...safeUser } = user;
  res.json(safeUser);
});

// Register new user
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  
  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password, // In a real app, this would be hashed
    orders: [],
    cart: []
  };
  
  users.push(newUser);
  
  // Remove password before sending response
  const { password: pwd, ...safeUser } = newUser;
  res.status(201).json(safeUser);
});

// Add item to cart
router.post('/:id/cart', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const { productId, quantity = 1 } = req.body;
  
  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }
  
  user.cart.push({ productId, quantity });
  res.status(201).json(user.cart);
});

// Checkout (create order)
router.post('/:id/checkout', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  if (user.cart.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }
  
  const newOrder = {
    id: (user.orders.length + 1),
    items: user.cart,
    date: new Date(),
    total: 0 // In a real app, this would calculate total from product prices
  };
  
  user.orders.push(newOrder);
  user.cart = []; // Clear the cart after checkout
  
  res.status(201).json(newOrder);
});

module.exports = router;