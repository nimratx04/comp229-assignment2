const Reference = require('../models/Reference');
const createError = require('http-errors');

// @desc    Get all references
// @route   GET /api/references
exports.getAllReferences = async (req, res, next) => {
    try {
        const references = await Reference.find();
        
        const formattedReferences = references.map(ref => ({
            firstname: ref.firstname,
            lastname: ref.lastname,
            email: ref.email,
            id: ref._id
        }));
        
        res.status(200).json({
            success: true,
            message: 'References list retrieved successfully.',
            data: formattedReferences
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single reference
// @route   GET /api/references/:id
exports.getReferenceById = async (req, res, next) => {
    try {
        const reference = await Reference.findById(req.params.id);
        
        if (!reference) {
            throw createError(404, 'Reference not found');
        }
        
        res.status(200).json({
            success: true,
            message: 'Reference retrieved successfully.',
            data: {
                firstname: reference.firstname,
                lastname: reference.lastname,
                email: reference.email,
                id: reference._id
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create reference
// @route   POST /api/references
exports.createReference = async (req, res, next) => {
    try {
        const reference = await Reference.create(req.body);
        
        res.status(201).json({
            success: true,
            message: 'Reference added successfully.',
            data: {
                firstname: reference.firstname,
                lastname: reference.lastname,
                email: reference.email,
                id: reference._id
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update reference
// @route   PUT /api/references/:id
exports.updateReference = async (req, res, next) => {
    try {
        const reference = await Reference.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!reference) {
            throw createError(404, 'Reference not found');
        }
        
        res.status(200).json({
            success: true,
            message: 'Reference updated successfully.'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete reference
// @route   DELETE /api/references/:id
exports.deleteReference = async (req, res, next) => {
    try {
        const reference = await Reference.findByIdAndDelete(req.params.id);
        
        if (!reference) {
            throw createError(404, 'Reference not found');
        }
        
        res.status(200).json({
            success: true,
            message: 'Reference deleted successfully.'
        });
    } catch (error) {
        next(error);
    }
};