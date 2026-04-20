import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Customer API
export const customerAPI = {
  getAll: (page = 1) => api.get('/customers/', { params: { page } }),
  search: (params) => api.get('/customers/search/', { params }),
  getStatistics: () => api.get('/customers/statistics/'),
  getPivotByCountry: () => api.get('/customers/pivot_by_country/'),
};

// Order API
export const orderAPI = {
  getAll: (page = 1) => api.get('/orders/', { params: { page } }),
  search: (params) => api.get('/orders/search/', { params }),
  getStatisticsByDate: () => api.get('/orders/statistics_by_date/'),
  getStatisticsByCustomer: () => api.get('/orders/statistics_by_customer/'),
  getStatisticsByStatus: () => api.get('/orders/statistics_by_status/'),
  getPivotByMonth: () => api.get('/orders/pivot_by_month/'),
};

// Product API
export const productAPI = {
  getAll: (page = 1) => api.get('/products/', { params: { page } }),
  getByLine: (lineCode) => api.get('/products/by_line/', { params: { line_code: lineCode } }),
  getStatistics: () => api.get('/products/statistics/'),
};

// Payment API
export const paymentAPI = {
  getAll: (page = 1) => api.get('/payments/', { params: { page } }),
  getStatistics: () => api.get('/payments/statistics/'),
  getByCustomer: (customerId) => api.get('/payments/by_customer/', { params: { customer_id: customerId } }),
};

// Product Line API
export const productLineAPI = {
  getAll: () => api.get('/product-lines/'),
};

export default api;
