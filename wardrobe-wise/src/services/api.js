import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ganti dengan URL backend Anda
});

export const getProducts = () => {
  return api.get('/produk');  // Endpoint untuk mendapatkan produk
};

export const addProduct = (produkData) => {
  return api.post('/produk', produkData);  // Endpoint untuk menambah produk
};
