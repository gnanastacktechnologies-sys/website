import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { getSettings, updateSettings } from '../controllers/siteSettingController.js';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import {
  uploadProjectImage,
  handleProjectImageUpload,
} from '../controllers/uploadController.js';
import {
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
  getDashboardStats,
} from '../controllers/enquiryController.js';

const router = express.Router();

// Protect all routes
router.use(protect);

// Dashboard
router.get('/dashboard/stats', getDashboardStats);

// Site Settings
router.route('/site-settings')
  .get(getSettings)
  .patch(updateSettings);

// Products
router.route('/products')
  .get(getProducts)
  .post(createProduct);
router.route('/products/:id')
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);

// Services
router.route('/services')
  .get(getServices)
  .post(createService);
router.route('/services/:id')
  .get(getServiceById)
  .patch(updateService)
  .delete(deleteService);

// Projects
router.route('/projects')
  .get(getProjects)
  .post(createProject);
router.route('/projects/:id')
  .get(getProjectById)
  .patch(updateProject)
  .delete(deleteProject);
router.post('/uploads/project-image', uploadProjectImage, handleProjectImageUpload);

// Enquiries
router.route('/enquiries')
  .get(getEnquiries);
router.route('/enquiries/:id')
  .get(getEnquiryById)
  .delete(deleteEnquiry);
router.patch('/enquiries/:id/status', updateEnquiryStatus);

export default router;
