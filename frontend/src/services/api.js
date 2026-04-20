import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Adjust base URL as needed for backend
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const projectAPI = {
  getAll: () => api.get('/projects'),
  create: (data) => api.post('/projects', data),
  updateStatus: (id, status) => api.put(`/projects/${id}/status`, null, { params: { status } }),
};

export const userAPI = {
  getAll: () => api.get('/users'),
  create: (data) => api.post('/users', data),
  getByRole: (role) => api.get(`/users/role/${role}`),
};

export const transactionAPI = {
  getAll: () => api.get('/transactions'),
  purchase: (data) => api.post('/transactions', data),
};

export const listingAPI = {
  getAll: () => api.get('/listings'),
  create: (data) => api.post('/listings', data),
};

export const creditAPI = {
  getAll: () => api.get('/credits'),
  getByProject: (id) => api.get(`/credits/${id}`),
};

export const ledgerAPI = {
  getAll: () => api.get('/ledger'),
  getByCredit: (id) => api.get(`/ledger/credit/${id}`),
};

export const verificationAPI = {
  getAll: () => api.get('/verifications'),
  verify: (data) => api.post('/verifications', data),
};

export default api;
