import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Mengimpor BrowserRouter
import './index.css';
import App from './App';

// Menggunakan createRoot untuk React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Membungkus dengan BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
