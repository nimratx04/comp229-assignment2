// @desc    Create reference
// @route   POST /api/references
exports.createReference = async (req, res, next) => {
    try {
        const reference = await Reference.create(req.body);
        
        // Make sure the response has the EXACT structure Postman expects
        res.status(201).json({
            success: true,
            message: 'Reference added successfully.',
            data: {
                firstname: reference.firstname,
                lastname: reference.lastname,
                email: reference.email,
                id: reference._id  // This MUST be called "id" not "_id"
            }
        });
    } catch (error) {
        next(error);
    }
};