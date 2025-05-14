import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/ProdukList.css'; // Perbaikan jalur impor CSS

const ProdukList = () => {
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/produk')
      .then((response) => {
        setProduk(response.data);
      })
      .catch((error) => {
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
          {produk.map((item) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProdukList;
