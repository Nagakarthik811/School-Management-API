const express = require('express');
const router = express.Router();
const { addSchool, listSchools, getSchoolById } = require('../controllers/schoolController');

// Add School API
router.post('/addSchool', addSchool);

// List Schools API
router.get('/listSchools', listSchools);

// Get School by ID
router.get('/:id', getSchoolById);

module.exports = router;
