import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ id: null, name: '', price: '', stock: '' });

  // Dummy data for now
  useEffect(() => {
    setProducts([
      { id: 1, name: 'Product A', price: '10000', stock: '50' },
      { id: 2, name: 'Product B', price: '15000', stock: '30' },
    ]);
  }, []);

  const handleOpenDialog = (product = { id: null, name: '', price: '', stock: '' }) => {
    setCurrentProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentProduct({ id: null, name: '', price: '', stock: '' });
  };

  const handleSaveProduct = () => {
    // Logic to save product (add or update)
    console.log('Saving product:', currentProduct);
    handleCloseDialog();
  };

  const handleDeleteProduct = (id) => {
    // Logic to delete product
    console.log('Deleting product with id:', id);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>
      <Button variant="contained" onClick={() => handleOpenDialog()} sx={{ mb: 2 }}>
        Add Product
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" size="small" onClick={() => handleOpenDialog(product)} sx={{ mr: 1 }}>Edit</Button>
                  <Button variant="outlined" color="error" size="small" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentProduct.id ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={currentProduct.name}
            onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Price"
            type="text"
            fullWidth
            variant="standard"
            value={currentProduct.price}
            onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Stock"
            type="text"
            fullWidth
            variant="standard"
            value={currentProduct.stock}
            onChange={(e) => setCurrentProduct({ ...currentProduct, stock: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveProduct}>{currentProduct.id ? 'Save Changes' : 'Add Product'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductManagement;
