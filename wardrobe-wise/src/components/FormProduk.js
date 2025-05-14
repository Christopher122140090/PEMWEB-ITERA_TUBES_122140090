import React, { useState } from 'react';
import axios from 'axios';
import '../pages/FormProduk.css';  // Perbaikan jalur impor CSS

const FormProduk = ({ onSubmit }) => {
  const [nama, setNama] = useState('');
  const [kategori, setKategori] = useState('');
  const [harga, setHarga] = useState('');
  const [stok, setStok] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const produkData = { nama, kategori, harga, stok };

    axios.post('http://localhost:5000/api/produk', produkData)
      .then((response) => {
        console.log('Produk berhasil ditambahkan:', response);
        onSubmit(produkData);  // Mengirim data ke parent component
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <div className="form-produk-container">
      <h2>Tambah Produk Baru</h2>
      <form onSubmit={handleSubmit} className="form-produk">
        <label>Nama Produk:</label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
        <label>Kategori:</label>
        <input
          type="text"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          required
        />
        <label>Harga:</label>
        <input
          type="number"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          required
        />
        <label>Stok:</label>
        <input
          type="number"
          value={stok}
          onChange={(e) => setStok(e.target.value)}
          required
        />
        <button type="submit">Simpan Produk</button>
      </form>
    </div>
  );
};

export default FormProduk;
