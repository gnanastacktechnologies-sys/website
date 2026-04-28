import asyncHandler from '../utils/asyncHandler.js';
import Project from '../models/Project.js';

// @desc    Get all projects (Admin)
// @route   GET /api/v1/admin/projects
// @access  Private
export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort('order');
  res.json({ success: true, data: projects });
});

// @desc    Get single project
// @route   GET /api/v1/admin/projects/:id
// @access  Private
export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  res.json({ success: true, data: project });
});

// @desc    Create project
// @route   POST /api/v1/admin/projects
// @access  Private
export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: project,
  });
});

// @desc    Update project
// @route   PATCH /api/v1/admin/projects/:id
// @access  Private
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  res.json({
    success: true,
    message: 'Project updated successfully',
    data: project,
  });
});

// @desc    Delete project
// @route   DELETE /api/v1/admin/projects/:id
// @access  Private
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  res.json({ success: true, message: 'Project deleted successfully' });
});
