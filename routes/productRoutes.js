const express = require('express');
const router = express.Router();

// In-memory product database (would be replaced by actual database in production)
let products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'Noise-cancelling bluetooth headphones',
    price: 199.99,
    category: 'Electronics',
    stock: 50
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Fitness tracking smartwatch',
    price: 249.99,
    category: 'Wearables',
    stock: 30
  },
  {
    id: 3,
    name: 'Portable Charger',
    description: '10000mAh power bank',
    price: 49.99,
    category: 'Accessories',
    stock: 100
  }
];

// Get all products
router.get('/', (req, res) => {
  const { category, minPrice, maxPrice } = req.query;
  
  let filteredProducts = products;
  
  if (category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
  }
  
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
  }
  
  res.json(filteredProducts);
});

// Get single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

// Create new product
router.post('/', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body,
    stock: req.body.stock || 0
  };
  
  // Basic validation
  if (!newProduct.name || !newProduct.price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update product
router.put('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  products[index] = {
    ...products[index],
    ...req.body
  };
  
  res.json(products[index]);
});

// Delete product
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const deletedProduct = products.splice(index, 1);
  res.json(deletedProduct[0]);
});

module.exports = router;