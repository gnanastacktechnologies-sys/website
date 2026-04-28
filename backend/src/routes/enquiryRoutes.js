import express from 'express';
import {
  createEnquiry,
  getAllEnquiries,
  getSingleEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/enquiryController.js';

const router = express.Router();

router.route('/')
  .post(createEnquiry)
  .get(getAllEnquiries);

router.route('/:id')
  .get(getSingleEnquiry)
  .delete(deleteEnquiry);

router.patch('/:id/status', updateEnquiryStatus);

export default router;
