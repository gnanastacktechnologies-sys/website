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
import { getLegalData } from '../controllers/legalController.js';

const router = express.Router();

router.get('/home', getHomeData);
router.get('/site', getSiteData);
router.get('/products', getActiveProducts);
router.get('/services', getActiveServices);
router.get('/projects', getActiveProjects);
router.get('/projects/:id', getActiveProjectById);
router.post('/enquiries', submitEnquiry);
router.get('/storage-check', getStorageCheck);
router.get('/legal', getLegalData);

export default router;
