import express from 'express';
import {
  getSiteData,
  getActiveProducts,
  getActiveServices,
  getActiveProjects,
  getActiveProjectById,
  submitEnquiry,
  getStorageCheck,
  getHomeData,
} from '../controllers/publicController.js';

const router = express.Router();

router.get('/home', getHomeData);
router.get('/site', getSiteData);
router.get('/products', getActiveProducts);
router.get('/services', getActiveServices);
router.get('/projects', getActiveProjects);
router.get('/projects/:id', getActiveProjectById);
router.post('/enquiries', submitEnquiry);
router.get('/storage-check', getStorageCheck);

export default router;
