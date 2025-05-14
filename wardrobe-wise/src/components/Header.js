import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={styles.header}>
      <nav>
        <ul style={styles.navList}>
          <li><Link to="/" style={styles.link}>Home</Link></li>
          <li><Link to="/products" style={styles.link}>Produk</Link></li>
          <li><Link to="/add-product" style={styles.link}>Tambah Produk</Link></li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#333',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    margin: '0 15px',
  },
};

export default Header;
