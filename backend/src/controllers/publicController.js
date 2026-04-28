import asyncHandler from '../utils/asyncHandler.js';
import SiteSetting from '../models/SiteSetting.js';
import Product from '../models/Product.js';
import Service from '../models/Service.js';
import Project from '../models/Project.js';
import Enquiry from '../models/Enquiry.js';
import fs from 'fs';
import path from 'path';

// @desc    Get all public site data
// @route   GET /api/v1/public/site
// @access  Public
export const getSiteData = asyncHandler(async (req, res) => {
  const settings = await SiteSetting.findOne();
  res.json({ success: true, data: settings });
});

// @desc    Get active products
// @route   GET /api/v1/public/products
// @access  Public
export const getActiveProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isActive: true }).sort('order');
  res.json({ success: true, data: products });
});

// @desc    Get active services
// @route   GET /api/v1/public/services
// @access  Public
export const getActiveServices = asyncHandler(async (req, res) => {
  const services = await Service.find({ isActive: true }).sort('order');
  res.json({ success: true, data: services });
});

// @desc    Get active projects
// @route   GET /api/v1/public/projects
// @access  Public
export const getActiveProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ isActive: true }).sort('order');
  res.json({ success: true, data: projects });
});

// @desc    Get single active project
// @route   GET /api/v1/public/projects/:id
// @access  Public
export const getActiveProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id, isActive: true });
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  res.json({ success: true, data: project });
});

// @desc    Create new enquiry (Contact Form)
// @route   POST /api/v1/public/enquiries
// @access  Public
export const submitEnquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, projectType, message } = req.body;
  
  if (!name || !email || !phone || !projectType || !message) {
    res.status(400);
    throw new Error('Please fill all required fields');
  }

  const enquiry = await Enquiry.create({
    name,
    email,
    phone,
    projectType,
    message
  });

  res.status(201).json({
    success: true,
    message: 'Enquiry submitted successfully',
    data: enquiry
  });
});

// @desc    Check upload storage persistence readiness
// @route   GET /api/v1/public/storage-check
// @access  Public
export const getStorageCheck = asyncHandler(async (req, res) => {
  const uploadsDir = path.join(process.cwd(), 'uploads', 'projects');
  const markerPath = path.join(uploadsDir, '.storage-marker.json');
  const probePath = path.join(uploadsDir, '.write-probe.tmp');

  let writable = false;
  let markerExists = false;
  let markerData = null;

  fs.mkdirSync(uploadsDir, { recursive: true });

  // Write/delete probe to confirm runtime write capability
  try {
    fs.writeFileSync(probePath, String(Date.now()), 'utf8');
    fs.unlinkSync(probePath);
    writable = true;
  } catch {
    writable = false;
  }

  // Marker file is created once and should survive restart/deploy on persistent disks
  if (fs.existsSync(markerPath)) {
    markerExists = true;
    try {
      markerData = JSON.parse(fs.readFileSync(markerPath, 'utf8'));
    } catch {
      markerData = null;
    }
  } else {
    const marker = {
      createdAt: new Date().toISOString(),
      createdBy: 'storage-check',
      hint: 'If this file disappears after restart/redeploy, storage is ephemeral.',
    };
    fs.writeFileSync(markerPath, JSON.stringify(marker, null, 2), 'utf8');
    markerData = marker;
  }

  res.json({
    success: true,
    data: {
      uploadsDir,
      writable,
      markerExistsBeforeCheck: markerExists,
      marker: markerData,
      interpretation: writable
        ? markerExists
          ? 'Writable and marker already existed. Likely persistent across restarts.'
          : 'Writable. Marker created now; restart/redeploy and check again to confirm persistence.'
        : 'Not writable. Uploads will fail in this environment.',
    },
  });
});
