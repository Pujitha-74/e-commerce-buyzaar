import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here later
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Product API
export const productAPI = {
  // Get all products with filtering
  getAll: (params = {}) => api.get('/products', { params }),
  
  // Get single product
  getById: (id) => api.get(`/products/${id}`),
  
  // Create product
  create: (productData) => api.post('/products', productData),
  
  // Update product
  update: (id, productData) => api.put(`/products/${id}`, productData),
  
  // Delete product
  delete: (id) => api.delete(`/products/${id}`),
  
  // Search products
  search: (query) => api.get(`/products/search/${query}`),
  
  // Get products by category
  getByCategory: (categoryId) => api.get(`/products/category/${categoryId}`),
};

// Category API
export const categoryAPI = {
  // Get all categories
  getAll: () => api.get('/categories'),
  
  // Get single category
  getById: (id) => api.get(`/categories/${id}`),
  
  // Create category
  create: (categoryData) => api.post('/categories', categoryData),
  
  // Update category
  update: (id, categoryData) => api.put(`/categories/${id}`, categoryData),
  
  // Delete category
  delete: (id) => api.delete(`/categories/${id}`),
  
  // Get subcategories
  getSubcategories: (id) => api.get(`/categories/${id}/subcategories`),
};

// Order API
export const orderAPI = {
  // Get all orders
  getAll: (params = {}) => api.get('/orders', { params }),
  
  // Get single order
  getById: (id) => api.get(`/orders/${id}`),
  
  // Create order
  create: (orderData) => api.post('/orders', orderData),
  
  // Update order status
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  
  // Update payment status
  updatePayment: (id, paymentStatus, paymentMethod) => 
    api.patch(`/orders/${id}/payment`, { paymentStatus, paymentMethod }),
  
  // Add tracking number
  addTracking: (id, trackingNumber) => 
    api.patch(`/orders/${id}/tracking`, { trackingNumber }),
  
  // Get order statistics
  getStats: () => api.get('/orders/stats/overview'),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;
