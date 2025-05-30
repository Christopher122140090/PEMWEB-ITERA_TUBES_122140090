import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import * as api from '../services/api';

const StockMonitoring = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({}); // State untuk menyimpan quantity per produk

  useEffect(() => {
    setLoading(true);
    api.getInventory()
      .then(response => {
        setLowStockProducts(response.data);
        setError(null);
        // Reset quantity ke 1 untuk semua produk
        const initialQuantities = {};
        response.data.forEach(p => { initialQuantities[p.id] = 1; });
        setQuantities(initialQuantities);
      })
      .catch(() => {
        setError('Gagal memuat data stok');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleQuantityChange = (productId, value) => {
    setQuantities(q => ({ ...q, [productId]: value }));
  };

  const handleSell = (product) => {
    const qty = parseInt(quantities[product.id] || 1, 10);
    const confirmMsg = `Apakah Anda yakin ingin menjual ${qty} unit produk '${product.name}'?`;
    if (!window.confirm(confirmMsg)) return;
    setLoading(true);
    api.createSale({
      product_id: product.product_id || product.id,
      quantity: qty,
      price: product.price
    })
      .then(() => api.getInventory())
      .then(response => {
        setLowStockProducts(response.data);
        setError(null);
        // Reset quantity ke 1 untuk produk yang baru dijual
        setQuantities(q => ({ ...q, [product.id]: 1 }));
      })
      .catch(() => {
        setError('Gagal menjual produk');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box style={{ padding: 24 }}>
      <Typography variant="h4" gutterBottom>
        Stock Monitoring
      </Typography>
      {loading && <Typography>Loading...</Typography>}
      {error && <Alert severity="error">{error}</Alert>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Current Stock</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lowStockProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <input
                    type="number"
                    min={1}
                    max={product.stock}
                    value={quantities[product.id] || 1}
                    onChange={e => handleQuantityChange(product.id, Math.max(1, Math.min(product.stock, Number(e.target.value))))}
                    style={{ width: 60 }}
                    disabled={loading || product.stock <= 0}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleSell(product)}
                    disabled={loading || product.stock <= 0}
                  >
                    Dijual
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StockMonitoring;
