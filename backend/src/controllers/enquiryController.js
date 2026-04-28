import asyncHandler from '../utils/asyncHandler.js';
import Enquiry from '../models/Enquiry.js';
import Product from '../models/Product.js';
import Service from '../models/Service.js';
import Project from '../models/Project.js';

// @desc    Get all enquiries (Admin)
// @route   GET /api/v1/admin/enquiries
// @access  Private
export const getEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find().sort('-createdAt');
  res.json({ success: true, data: enquiries });
});

// @desc    Get single enquiry
// @route   GET /api/v1/admin/enquiries/:id
// @access  Private
export const getEnquiryById = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) {
    res.status(404);
    throw new Error('Enquiry not found');
  }
  res.json({ success: true, data: enquiry });
});

// @desc    Update enquiry status
// @route   PATCH /api/v1/admin/enquiries/:id/status
// @access  Private
export const updateEnquiryStatus = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );
  if (!enquiry) {
    res.status(404);
    throw new Error('Enquiry not found');
  }
  res.json({
    success: true,
    message: 'Enquiry status updated successfully',
    data: enquiry,
  });
});

// @desc    Delete enquiry
// @route   DELETE /api/v1/admin/enquiries/:id
// @access  Private
export const deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
  if (!enquiry) {
    res.status(404);
    throw new Error('Enquiry not found');
  }
  res.json({ success: true, message: 'Enquiry deleted successfully' });
});

// @desc    Get Dashboard stats
// @route   GET /api/v1/admin/dashboard/stats
// @access  Private
export const getDashboardStats = asyncHandler(async (req, res) => {
  const totalProducts = await Product.countDocuments();
  const activeProducts = await Product.countDocuments({ isActive: true });
  const totalServices = await Service.countDocuments();
  const totalProjects = await Project.countDocuments();
  const totalEnquiries = await Enquiry.countDocuments();
  const newEnquiries = await Enquiry.countDocuments({ status: 'new' });

  res.json({
    success: true,
    data: {
      totalProducts,
      activeProducts,
      totalServices,
      totalProjects,
      totalEnquiries,
      newEnquiries,
    },
  });
});
