import asyncHandler from '../utils/asyncHandler.js';
import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth admin & get token
// @route   POST /api/v1/auth/login
// @access  Public
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      success: true,
      message: 'Logged in successfully',
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id),
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get admin profile
// @route   GET /api/v1/auth/me
// @access  Private
export const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    res.json({
      success: true,
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});

// @desc    Update admin profile
// @route   PUT /api/v1/auth/profile
// @access  Private
export const updateAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;
    
    if (req.body.password) {
      admin.password = req.body.password;
    }

    const updatedAdmin = await admin.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        token: generateToken(updatedAdmin._id),
      },
    });
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});
