import asyncHandler from '../utils/asyncHandler.js';
import Service from '../models/Service.js';

// @desc    Get all services (Admin)
// @route   GET /api/v1/admin/services
// @access  Private
export const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort('order');
  res.json({ success: true, data: services });
});

// @desc    Get single service
// @route   GET /api/v1/admin/services/:id
// @access  Private
export const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }
  res.json({ success: true, data: service });
});

// @desc    Create service
// @route   POST /api/v1/admin/services
// @access  Private
export const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json({
    success: true,
    message: 'Service created successfully',
    data: service,
  });
});

// @desc    Update service
// @route   PATCH /api/v1/admin/services/:id
// @access  Private
export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }
  res.json({
    success: true,
    message: 'Service updated successfully',
    data: service,
  });
});

// @desc    Delete service
// @route   DELETE /api/v1/admin/services/:id
// @access  Private
export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }
  res.json({ success: true, message: 'Service deleted successfully' });
});
