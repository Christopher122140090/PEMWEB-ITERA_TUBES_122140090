import React from 'react';
import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const SalesReports = () => {
  // Dummy data for detailed transactions
  const transactions = [
    { id: 1, date: '2025-05-23', product: 'Product A', quantity: 2, price: '20000' },
    { id: 2, date: '2025-05-23', product: 'Product B', quantity: 1, price: '15000' },
    { id: 3, date: '2025-05-22', product: 'Product A', quantity: 1, price: '10000' },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sales Reports
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Summary</Typography>
            {/* Add summary cards or data here */}
            <Typography>Total Sales: Rp 45.000</Typography>
            <Typography>Number of Transactions: 3</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Sales Over Time</Typography>
            {/* Add sales over time chart here */}
            <Typography>Chart will be implemented here.</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Detailed Transactions</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.product}</TableCell>
                      <TableCell>{transaction.quantity}</TableCell>
                      <TableCell align="right">{transaction.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesReports;
