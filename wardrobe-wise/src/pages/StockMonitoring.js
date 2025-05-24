import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const StockMonitoring = () => {
  // Dummy data for now
  const lowStockProducts = [
    { id: 1, name: 'Product C', stock: '5' },
    { id: 2, name: 'Product D', stock: '10' },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Stock Monitoring
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>Low Stock Products</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Current Stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lowStockProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* Add more stock monitoring features here */}
    </Box>
  );
};

export default StockMonitoring;
