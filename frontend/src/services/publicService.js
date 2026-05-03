import api from './api';

export const publicService = {
  getHomeData: async () => {
    const response = await api.get('/public/home');
    return response.data;
  },
  getSiteData: async () => {
    const response = await api.get('/public/site');
    return response.data;
  },
  getProducts: async () => {
    const response = await api.get('/public/products');
    return response.data;
  },
  getServices: async () => {
    const response = await api.get('/public/services');
    return response.data;
  },
  getProjects: async () => {
    const response = await api.get('/public/projects');
    return response.data;
  },
  getProjectById: async (id) => {
    const response = await api.get(`/public/projects/${id}`);
    return response.data;
  },
  submitEnquiry: async (data) => {
    const response = await api.post('/public/enquiries', data);
    return response.data;
  }
};
