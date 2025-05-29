import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, CircularProgress, Alert } from '@mui/material';
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
    <Paper sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Low Stock Alert</Typography>
        <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
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
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: '#ffeaea',
            borderRadius: 1,
            p: 1,
            mb: 1,
          }}
        >
          <Box>
            <Typography fontWeight="bold">{name}</Typography>
            <Typography variant="body2" color="textSecondary">
              Only {stock} items left
            </Typography>
          </Box>
          <Button variant="contained" color="error" size="small">
            Restock
          </Button>
        </Box>
      ))}
    </Paper>
  );
};

export default LowStockAlert;
