const Project = require('../models/Project');
const createError = require('http-errors');

// @desc    Get all projects
// @route   GET /api/projects
exports.getAllProjects = async (req, res, next) => {
    try {
        const projects = await Project.find();
        
        res.status(200).json({
            success: true,
            message: 'Projects list retrieved successfully.',
            data: projects
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single project
// @route   GET /api/projects/:id
exports.getProjectById = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            throw createError(404, 'Project not found');
        }
        
        res.status(200).json({
            success: true,
            message: 'Project retrieved successfully.',
            data: project
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create project
// @route   POST /api/projects
exports.createProject = async (req, res, next) => {
    try {
        const project = await Project.create(req.body);
        
        res.status(201).json({
            success: true,
            message: 'Project added successfully.',
            data: project
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update project
// @route   PUT /api/projects/:id
exports.updateProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!project) {
            throw createError(404, 'Project not found');
        }
        
        res.status(200).json({
            success: true,
            message: 'Project updated successfully.'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
exports.deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        
        if (!project) {
            throw createError(404, 'Project not found');
        }
        
        res.status(200).json({
            success: true,
            message: 'Project deleted successfully.'
        });
    } catch (error) {
        next(error);
    }
};