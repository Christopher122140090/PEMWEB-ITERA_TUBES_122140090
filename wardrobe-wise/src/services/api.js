import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust the base URL to your backend
});

export const getInventory = () => api.get('/inventory');
export const getProducts = () => api.get('/products');
