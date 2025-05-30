import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Link, Paper } from '@material-ui/core';

const recentProducts = [
  { id: 'PRD-1234', name: 'Premium Cotton T-Shirt', category: 'T-Shirts', stock: 45, price: 'Rp 149,000', status: 'In Stock' },
  { id: 'PRD-5678', name: 'Slim Fit Jeans', category: 'Jeans', stock: 28, price: 'Rp 299,000', status: 'In Stock' },
  { id: 'PRD-9012', name: 'Formal Shirt', category: 'Shirts', stock: 12, price: 'Rp 249,000', status: 'Low Stock' },
  { id: 'PRD-3456', name: 'Summer Dress', category: 'Dresses', stock: 8, price: 'Rp 349,000', status: 'Low Stock' },
];

const statusColors = {
  'In Stock': 'green',
  'Low Stock': 'orange',
};

const RecentProducts = () => {
  return (
    <Paper style={{ padding: 16 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" style={{ marginBottom: 16 }}>
        <Typography variant="h6">Recent Products</Typography>
        <Link href="#" underline="none" color="primary" style={{ cursor: 'pointer' }}>
          View All
        </Link>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentProducts.map(({ id, name, category, stock, price, status }) => (
            <TableRow key={id}>
              <TableCell>
                <Typography style={{ fontWeight: 'bold' }}>{name}</Typography>
                <Typography variant="caption" color="textSecondary">
                  #{id}
                </Typography>
              </TableCell>
              <TableCell>{category}</TableCell>
              <TableCell>{stock}</TableCell>
              <TableCell>{price}</TableCell>
              <TableCell>
                <Box
                  component="span"
                  style={{
                    backgroundColor: statusColors[status],
                    color: 'white',
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 2,
                    paddingBottom: 2,
                    borderRadius: 4,
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                  }}
                >
                  {status}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default RecentProducts;
