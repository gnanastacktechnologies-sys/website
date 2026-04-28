import asyncHandler from '../utils/asyncHandler.js';
import Product from '../models/Product.js';

// @desc    Get all products (Admin)
// @route   GET /api/v1/admin/products
// @access  Private
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort('order');
  res.json({ success: true, data: products });
});

// @desc    Get single product
// @route   GET /api/v1/admin/products/:id
// @access  Private
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ success: true, data: product });
});

// @desc    Create product
// @route   POST /api/v1/admin/products
// @access  Private
export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: product,
  });
});

// @desc    Update product
// @route   PATCH /api/v1/admin/products/:id
// @access  Private
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({
    success: true,
    message: 'Product updated successfully',
    data: product,
  });
});

// @desc    Delete product
// @route   DELETE /api/v1/admin/products/:id
// @access  Private
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ success: true, message: 'Product deleted successfully' });
});
