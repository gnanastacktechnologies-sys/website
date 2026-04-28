import asyncHandler from '../utils/asyncHandler.js';
import SiteSetting from '../models/SiteSetting.js';

// @desc    Get site settings
// @route   GET /api/v1/admin/site-settings
// @access  Private
export const getSettings = asyncHandler(async (req, res) => {
  let settings = await SiteSetting.findOne();
  if (!settings) {
    settings = await SiteSetting.create({});
  }
  res.json({ success: true, data: settings });
});

// @desc    Update site settings
// @route   PATCH /api/v1/admin/site-settings
// @access  Private
export const updateSettings = asyncHandler(async (req, res) => {
  let settings = await SiteSetting.findOne();
  
  if (settings) {
    settings = await SiteSetting.findByIdAndUpdate(settings._id, req.body, {
      new: true,
      runValidators: true,
    });
  } else {
    settings = await SiteSetting.create(req.body);
  }

  res.json({
    success: true,
    message: 'Site settings updated successfully',
    data: settings,
  });
});
