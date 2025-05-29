import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Alert } from '@mui/material';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ id: null, name: '', price: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addStockDialog, setAddStockDialog] = useState({ open: false, product: null, value: '' });

  const fetchProducts = () => {
    setLoading(true);
    getProducts()
      .then(response => {
        console.log('fetchProducts response:', response);
        setProducts(response.data);
        setError(null);
      })
      .catch(() => {
        setError('Gagal memuat data produk');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenDialog = (product = { id: null, name: '', price: '' }) => {
    setCurrentProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentProduct({ id: null, name: '', price: '' });
  };

  const handleSaveProduct = () => {
    // Add basic validation
    if (!currentProduct.name || !currentProduct.price || currentProduct.stock === '' || currentProduct.stock === null || currentProduct.stock === undefined) {
      setError('Nama, Harga, dan Stok produk tidak boleh kosong.');
      return;
    }

    // Add confirmation for save/edit
    const action = currentProduct.id ? 'mengubah' : 'menambah';
    if (!window.confirm(`Apakah Anda yakin ingin ${action} produk ini?`)) {
      return; // Stop if user cancels
    }

    setLoading(true);
    const productData = {
      name: currentProduct.name,
      price: Number(currentProduct.price), // Ensure price is a number
      stock: Number(currentProduct.stock), // Ensure stock is a number
    };

    const apiCall = currentProduct.id
      ? updateProduct(currentProduct.id, productData)
      : createProduct(productData);

    apiCall
      .then(response => {
        console.log('handleSaveProduct response:', response);
        fetchProducts();
        setError(null);
        handleCloseDialog();
      })
      .catch((err) => {
        console.error('Error saving product:', err.response?.data || err.message);
        setError(`Gagal menyimpan produk: ${err.response?.data?.message || err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteProduct = (id) => {
    // Add confirmation for delete
    if (!window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      return; // Stop if user cancels
    }

    setLoading(true);
    deleteProduct(id)
      .then(response => {
        console.log('handleDeleteProduct response:', response);
        fetchProducts();
        setError(null);
      })
      .catch(() => {
        setError('Gagal menghapus produk');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAddStock = () => {
    if (!addStockDialog.product || !addStockDialog.value) return;

    // Add confirmation for add stock
    if (!window.confirm(`Apakah Anda yakin ingin menambah stok sebanyak ${addStockDialog.value} untuk produk ${addStockDialog.product.name}?`)) {
      return; // Stop if user cancels
    }

    setLoading(true);
    const newStock = Number(addStockDialog.product.stock) + Number(addStockDialog.value);
    updateProduct(addStockDialog.product.id, { ...addStockDialog.product, stock: newStock })
      .then(() => {
        fetchProducts();
        setError(null);
        setAddStockDialog({ open: false, product: null, value: '' });
      })
      .catch(() => setError('Gagal menambah stok'))
      .finally(() => setLoading(false));
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Cari Produk"
        variant="outlined"
        size="small"
        sx={{ mb: 2, mr: 2 }}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
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
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <span style={{cursor:'pointer',color:'#6A5CFF'}} onClick={() => setSelectedProduct(product)}>
                    {product.name}
                  </span>
                </TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" size="small" onClick={() => handleOpenDialog(product)} sx={{ mr: 1 }}>Edit</Button>
                  <Button variant="outlined" color="success" size="small" sx={{ mr: 1 }} onClick={() => setAddStockDialog({ open: true, product, value: '' })}>Tambah Stok</Button>
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
            type="number"
            fullWidth
            variant="standard"
            value={currentProduct.stock || ''}
            onChange={(e) => setCurrentProduct({ ...currentProduct, stock: Number(e.target.value) })}
            inputProps={{ min: 0 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveProduct}>{currentProduct.id ? 'Save Changes' : 'Add Product'}</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Tambah Stok */}
      <Dialog open={addStockDialog.open} onClose={() => setAddStockDialog({ open: false, product: null, value: '' })}>
        <DialogTitle>Tambah Stok Produk</DialogTitle>
        <DialogContent>
          <Typography>Produk: <b>{addStockDialog.product?.name}</b></Typography>
          <Typography>Stok Saat Ini: <b>{addStockDialog.product?.stock}</b></Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Jumlah Stok Ditambahkan"
            type="number"
            fullWidth
            variant="standard"
            value={addStockDialog.value}
            onChange={e => setAddStockDialog({ ...addStockDialog, value: e.target.value })}
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddStockDialog({ open: false, product: null, value: '' })}>Cancel</Button>
          <Button onClick={handleAddStock} disabled={!addStockDialog.value || Number(addStockDialog.value) < 1}>Tambah</Button>
        </DialogActions>
      </Dialog>

      {/* Detail Product Dialog */}
      <Dialog open={!!selectedProduct} onClose={() => setSelectedProduct(null)}>
        <DialogTitle>Detail Produk</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <>
              <Typography><b>Nama:</b> {selectedProduct.name}</Typography>
              <Typography><b>Harga:</b> {selectedProduct.price}</Typography>
              <Typography><b>Stok:</b> {selectedProduct.stock}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedProduct(null)}>Tutup</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductManagement;
