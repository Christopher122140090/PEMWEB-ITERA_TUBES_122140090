const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000; // Port for the backend server

app.use(cors());
app.use(express.json());

// Dummy product data (replace with your database logic)
const products = [
  { id: 1, name: 'Kemeja Pria', barcode: '1234567890128', price: 150000 },
  { id: 2, name: 'Celana Jeans Wanita', barcode: '9876543210987', price: 250000 },
  // Add more dummy products as needed
];

// Endpoint to get product by barcode
app.get('/api/products/barcode/:barcode', (req, res) => {
  const barcode = req.params.barcode;
  const product = products.find(p => p.barcode === barcode);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Basic endpoint for testing
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
