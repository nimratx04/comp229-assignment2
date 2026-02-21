const User = require('../models/User');
const createError = require('http-errors');

// @desc    Get all users
// @route   GET /api/users
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        
        res.status(200).json({
            success: true,
            message: 'Users list retrieved successfully.',
            data: users
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single user
// @route   GET /api/users/:id
exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        
        if (!user) {
            throw createError(404, 'User not found');
        }
        
        res.status(200).json({
            success: true,
            message: 'User retrieved successfully.',
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create user
// @route   POST /api/users
exports.createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        
        // Remove password from response
        const userResponse = user.toJSON();
        
        res.status(201).json({
            success: true,
            message: 'User added successfully.',
            data: userResponse
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update user
// @route   PUT /api/users/:id
exports.updateUser = async (req, res, next) => {
    try {
        // If password is being updated, hash it (you should add bcrypt later)
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).select('-password');
        
        if (!user) {
            throw createError(404, 'User not found');
        }
        
        res.status(200).json({
            success: true,
            message: 'User updated successfully.'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            throw createError(404, 'User not found');
        }
        
        res.status(200).json({
            success: true,
            message: 'User deleted successfully.'
        });
    } catch (error) {
        next(error);
    }
};