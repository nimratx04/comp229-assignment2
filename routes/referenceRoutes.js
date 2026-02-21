const express = require('express');
const router = express.Router();
const {
    getAllReferences,
    getReferenceById,
    createReference,
    updateReference,
    deleteReference
} = require('../controllers/referenceController');

router.route('/')
    .get(getAllReferences)
    .post(createReference);

router.route('/:id')
    .get(getReferenceById)
    .put(updateReference)
    .delete(deleteReference);

module.exports = router;