import api from './api';

export const adminService = {
  // Stats
  getStats: async () => {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  },
  // Backward-compatible alias used by AdminNavbar
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  },

  // Site Settings
  getSettings: async () => {
    const response = await api.get('/admin/site-settings');
    return response.data;
  },
  updateSettings: async (data) => {
    const response = await api.patch('/admin/site-settings', data);
    return response.data;
  },

  // Products
  getProducts: async () => {
    const response = await api.get('/admin/products');
    return response.data;
  },
  getProductById: async (id) => {
    const response = await api.get(`/admin/products/${id}`);
    return response.data;
  },
  createProduct: async (data) => {
    const response = await api.post('/admin/products', data);
    return response.data;
  },
  updateProduct: async (id, data) => {
    const response = await api.patch(`/admin/products/${id}`, data);
    return response.data;
  },
  deleteProduct: async (id) => {
    const response = await api.delete(`/admin/products/${id}`);
    return response.data;
  },

  // Services
  getServices: async () => {
    const response = await api.get('/admin/services');
    return response.data;
  },
  getServiceById: async (id) => {
    const response = await api.get(`/admin/services/${id}`);
    return response.data;
  },
  createService: async (data) => {
    const response = await api.post('/admin/services', data);
    return response.data;
  },
  updateService: async (id, data) => {
    const response = await api.patch(`/admin/services/${id}`, data);
    return response.data;
  },
  deleteService: async (id) => {
    const response = await api.delete(`/admin/services/${id}`);
    return response.data;
  },

  // Projects
  getProjects: async () => {
    const response = await api.get('/admin/projects');
    return response.data;
  },
  getProjectById: async (id) => {
    const response = await api.get(`/admin/projects/${id}`);
    return response.data;
  },
  createProject: async (data) => {
    const response = await api.post('/admin/projects', data);
    return response.data;
  },
  uploadProjectImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/admin/uploads/project-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  updateProject: async (id, data) => {
    const response = await api.patch(`/admin/projects/${id}`, data);
    return response.data;
  },
  deleteProject: async (id) => {
    const response = await api.delete(`/admin/projects/${id}`);
    return response.data;
  },

  // Enquiries
  getEnquiries: async () => {
    const response = await api.get('/admin/enquiries');
    return response.data;
  },
  updateEnquiryStatus: async (id, status) => {
    const response = await api.patch(`/admin/enquiries/${id}/status`, { status });
    return response.data;
  },
  deleteEnquiry: async (id) => {
    const response = await api.delete(`/admin/enquiries/${id}`);
    return response.data;
  }
};
