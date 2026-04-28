import multer from 'multer';
import path from 'path';
import fs from 'fs';
import asyncHandler from '../utils/asyncHandler.js';
import { v2 as cloudinary } from 'cloudinary';

const uploadsDir = path.join(process.cwd(), 'uploads', 'projects');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(uploadsDir, { recursive: true });
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeBase = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9-_]/g, '-')
      .slice(0, 50);
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${safeBase || 'project'}-${unique}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadProjectImage = upload.single('image');

const isCloudinaryEnabled = Boolean(process.env.CLOUDINARY_URL);

if (isCloudinaryEnabled) {
  cloudinary.config({
    secure: true,
  });
}

// @desc    Upload project image
// @route   POST /api/v1/admin/uploads/project-image
// @access  Private
export const handleProjectImageUpload = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No image file uploaded');
  }

  let imageUrl = `${req.protocol}://${req.get('host')}/uploads/projects/${req.file.filename}`;
  let storageProvider = 'local';

  if (isCloudinaryEnabled) {
    try {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'gnanastack/projects',
        resource_type: 'image',
      });
      imageUrl = uploadResult.secure_url;
      storageProvider = 'cloudinary';
    } finally {
      // Clean temporary local file after cloud upload attempt
      if (req.file.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    }
  }

  res.status(201).json({
    success: true,
    message: 'Project image uploaded successfully',
    data: {
      imageUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimeType: req.file.mimetype,
      storageProvider,
    },
  });
});
