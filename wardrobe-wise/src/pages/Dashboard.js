import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>WardrobeWise - Dashboard</h1>
      </header>
      <div className="dashboard-content">
        <div className="summary-cards">
          <div className="summary-card">
            <h3>Total Produk</h3>
            <p>120</p>
          </div>
          <div className="summary-card">
            <h3>Kategori Produk</h3>
            <p>5 Kategori</p>
          </div>
          <div className="summary-card">
            <h3>Stok Tersedia</h3>
            <p>85%</p>
          </div>
        </div>
        <div className="links">
          <Link to="/products" className="link-button">Lihat Daftar Produk</Link>
          <Link to="/add-product" className="link-button">Tambah Produk</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
