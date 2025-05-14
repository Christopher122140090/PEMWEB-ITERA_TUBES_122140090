import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/ProdukList.css';  // Pastikan CSS diimpor dengan benar

const Products = () => {
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    // Mengambil data produk dari backend
    axios.get('http://localhost:5000/api/produk')  // Ganti dengan endpoint API Anda
      .then(response => {
        setProduk(response.data);  // Set data produk yang diterima
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="produk-list-container">
      <header className="produk-list-header">
        <h2>Daftar Produk</h2>
      </header>
      <table className="produk-table">
        <thead>
          <tr>
            <th>Nama Produk</th>
            <th>Kategori</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {produk.length > 0 ? (
            produk.map((item) => (
              <tr key={item.id}>
                <td>{item.nama}</td>
                <td>{item.kategori}</td>
                <td>{item.harga}</td>
                <td>{item.stok}</td>
                <td>
                  <button className="edit-button">Edit</button>
                  <button className="delete-button">Hapus</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Tidak ada produk yang ditemukan</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
