const Service = require('../models/Service');
const createError = require('http-errors');

// @desc    Get all services
// @route   GET /api/services
exports.getAllServices = async (req, res, next) => {
    try {
        const services = await Service.find();
        
        res.status(200).json({
            success: true,
            message: 'Services list retrieved successfully.',
            data: services
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single service
// @route   GET /api/services/:id
exports.getServiceById = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);
        
        if (!service) {
            throw createError(404, 'Service not found');
        }
        
        res.status(200).json({
            success: true,
            message: 'Service retrieved successfully.',
            data: service
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create service
// @route   POST /api/services
exports.createService = async (req, res, next) => {
    try {
        const service = await Service.create(req.body);
        
        res.status(201).json({
            success: true,
            message: 'Service added successfully.',
            data: service
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update service
// @route   PUT /api/services/:id
exports.updateService = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!service) {
            throw createError(404, 'Service not found');
        }
        
        res.status(200).json({
            success: true,
            message: 'Service updated successfully.'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
exports.deleteService = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        
        if (!service) {
            throw createError(404, 'Service not found');
        }
        
        res.status(200).json({
            success: true,
            message: 'Service deleted successfully.'
        });
    } catch (error) {
        next(error);
    }
};