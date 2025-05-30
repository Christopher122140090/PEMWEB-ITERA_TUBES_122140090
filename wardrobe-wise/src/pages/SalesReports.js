import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { getSales, getProducts } from '../services/api';

const SalesReports = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([getSales(), getProducts()])
      .then(([salesRes, productsRes]) => {
        setSales(salesRes.data);
        setProducts(productsRes.data);
        setError(null);
      })
      .catch(() => setError('Gagal memuat data penjualan'))
      .finally(() => setLoading(false));
  }, []);

  // Helper: get product name by id
  const getProductName = (id) => {
    const p = products.find(p => p.id === id);
    return p ? p.name : id;
  };

  // Summary
  const totalSales = sales.reduce((sum, s) => sum + (s.price * s.quantity), 0);
  const totalTransactions = sales.length;

  return (
    <Box style={{ padding: 24 }}>
      <Typography variant="h4" gutterBottom>
        Sales Reports
      </Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>Summary</Typography>
            <Typography>Total Sales: Rp {totalSales.toLocaleString()}</Typography>
            <Typography>Number of Transactions: {totalTransactions}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>Sales Over Time</Typography>
            <Typography>Chart will be implemented here.</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
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
                  {sales.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date?.slice(0, 10)}</TableCell>
                      <TableCell>{getProductName(transaction.product_id)}</TableCell>
                      <TableCell>{transaction.quantity}</TableCell>
                      <TableCell align="right">{transaction.price.toLocaleString()}</TableCell>
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
