import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6543', // Adjust the base URL to your backend
  withCredentials: true, // Add this line to include cookies
});

// Add response interceptor to handle 401 Unauthorized globally
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error: e.g., redirect to login or clear auth state
      window.location.href = '/'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export const getInventory = () => api.get('/inventory');
export const getProducts = () => api.get('/products_list');
export const createProduct = (product) => api.post('/products_list', product);
export const updateProduct = (id, product) => api.put('/products/' + id, product);
export const deleteProduct = (id) => api.delete('/products/' + id);
export const login = (username, password) =>
  api.post('/login', { username, password });

export const logout = () => api.post('/logout');
