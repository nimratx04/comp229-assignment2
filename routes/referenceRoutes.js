const express = require('express');
const router = express.Router();
const {
    getAllReferences,
    getReferenceById,
    createReference,
    updateReference,
    deleteReference
} = require('../controllers/referenceController');

// Check if all controllers are imported correctly
console.log('Controllers imported:', {
    getAllReferences: typeof getAllReferences,
    getReferenceById: typeof getReferenceById,
    createReference: typeof createReference,
    updateReference: typeof updateReference,
    deleteReference: typeof deleteReference
});

// Define routes
router.route('/')
    .get(getAllReferences)
    .post(createReference);

router.route('/:id')
    .get(getReferenceById)
    .put(updateReference)
    .delete(deleteReference);

module.exports = router;