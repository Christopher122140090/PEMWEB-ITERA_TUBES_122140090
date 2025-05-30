import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { getProducts } from '../services/api';

const LowStockAlert = () => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(response => {
        // Produk dengan stok <= 5 dianggap low stock
        setLowStockItems(response.data.filter(p => Number(p.stock) <= 5));
        setError(null);
      })
      .catch(() => setError('Gagal memuat data stok'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Paper style={{ padding: 16 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" style={{ marginBottom: 16 }}>
        <Typography variant="h6">Low Stock Alert</Typography>
        <Typography variant="body2" color="primary" style={{ cursor: 'pointer' }}>
          View All
        </Typography>
      </Box>
      {loading && <CircularProgress size={20} />}
      {error && <Alert severity="error">{error}</Alert>}
      {lowStockItems.length === 0 && !loading && !error && (
        <Typography variant="body2" color="textSecondary">Semua stok aman</Typography>
      )}
      {lowStockItems.map(({ id, name, stock }) => (
        <Box
          key={id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#ffeaea',
            borderRadius: 4,
            padding: 8,
            marginBottom: 8,
          }}
        >
          <Box>
            <Typography style={{ fontWeight: 'bold' }}>{name}</Typography>
            <Typography variant="body2" color="textSecondary">
              Only {stock} items left
            </Typography>
          </Box>
          <Button variant="contained" color="secondary" size="small">
            Restock
          </Button>
        </Box>
      ))}
    </Paper>
  );
};

export default LowStockAlert;
