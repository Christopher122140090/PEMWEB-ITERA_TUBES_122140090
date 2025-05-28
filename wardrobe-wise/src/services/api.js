import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6543', // Adjust the base URL to your backend
  withCredentials: true, // Add this line to include cookies
});

export const getInventory = () => api.get('/inventory');
export const getProducts = () => api.get('/products');
export const createProduct = (product) => api.post('/products', product);
export const updateProduct = (id, product) => api.put('/products/' + id, product);
export const deleteProduct = (id) => api.delete('/products/' + id);
export const login = (username, password) =>
  api.post('/login', { username, password });

export const logout = () => api.post('/logout');
