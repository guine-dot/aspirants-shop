import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const authAPI = {
  register: (data) => axios.post(`${API_URL}/auth/register`, data),
  verifyEmail: (data) => axios.post(`${API_URL}/auth/verify-email`, data),
  login: (data) => axios.post(`${API_URL}/auth/login`, data),
  forgotPassword: (data) => axios.post(`${API_URL}/auth/forgot-password`, data),
  resetPassword: (data) => axios.post(`${API_URL}/auth/reset-password`, data)
};

const userAPI = {
  getProfile: (token) => axios.get(`${API_URL}/user/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  updateProfile: (data, token) => axios.put(`${API_URL}/user/profile`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  updateTheme: (theme, token) => axios.put(`${API_URL}/user/theme`, { theme }, {
    headers: { Authorization: `Bearer ${token}` }
  })
};

const gameAPI = {
  getAllGames: () => axios.get(`${API_URL}/games`),
  getGameById: (id) => axios.get(`${API_URL}/games/${id}`),
  getPackagesByGame: (gameId) => axios.get(`${API_URL}/games/${gameId}/packages`)
};

const orderAPI = {
  createOrder: (data, token) => axios.post(`${API_URL}/orders`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  getOrders: (token) => axios.get(`${API_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  getOrderById: (id, token) => axios.get(`${API_URL}/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
};

const adminAPI = {
  getConfig: () => axios.get(`${API_URL}/admin/config`),
  updateConfig: (data, token) => axios.put(`${API_URL}/admin/config`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  getAnalytics: (token) => axios.get(`${API_URL}/admin/analytics/overview`, {
    headers: { Authorization: `Bearer ${token}` }
  })
};

export { authAPI, userAPI, gameAPI, orderAPI, adminAPI };
