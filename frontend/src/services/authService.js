import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
      localStorage.setItem('adminToken', response.data.data.token);
      localStorage.setItem('adminUser', JSON.stringify(response.data.data));
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  },
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    if (response.data.success) {
      localStorage.setItem('adminUser', JSON.stringify(response.data.data));
      // Update token if it was changed
      if (response.data.data.token) {
        localStorage.setItem('adminToken', response.data.data.token);
      }
    }
    return response.data;
  }
};
