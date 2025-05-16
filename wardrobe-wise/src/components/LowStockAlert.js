import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';

const lowStockItems = [
  { name: 'Formal Shirt', quantity: 12 },
  { name: 'Summer Dress', quantity: 8 },
  { name: 'Winter Jacket', quantity: 5 },
  { name: 'Casual Sneakers', quantity: 3 },
];

const LowStockAlert = () => {
  return (
    <Paper sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Low Stock Alert</Typography>
        <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
          View All
        </Typography>
      </Box>
      {lowStockItems.map(({ name, quantity }) => (
        <Box
          key={name}
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
              Only {quantity} items left
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
