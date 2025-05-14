import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';  // Pastikan file ini ada di folder pages
import Products from './pages/Products';    // Pastikan file ini ada di folder pages
import AddProduct from './pages/AddProduct'; // Pastikan file ini ada di folder pages
import Header from './components/Header';   // Pastikan file ini ada di folder components

const App = () => {
  return (
    <Router>
      <Header /> {/* Header untuk navigasi */}
      <Routes>
        {/* Menentukan route untuk halaman dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Menentukan route untuk halaman daftar produk */}
        <Route path="/products" element={<Products />} />

        {/* Menentukan route untuk halaman tambah produk */}
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
