const db = require('../config/database');
const { validateSchoolInput, validateLocation } = require('../utils/validation');
const { calculateDistance } = require('../utils/distance');

/**
 * Add a new school to the database
 * POST /api/schools/addSchool
 */
const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    // Validate input data
    const validation = validateSchoolInput(name, address, latitude, longitude);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }

    const { name: validName, address: validAddress, latitude: validLat, longitude: validLon } = validation.data;

    // Insert school into database
    const connection = await db.getConnection();
    try {
      const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
      const [result] = await connection.execute(query, [validName, validAddress, validLat, validLon]);

      res.status(201).json({
        success: true,
        message: 'School added successfully',
        data: {
          id: result.insertId,
          name: validName,
          address: validAddress,
          latitude: validLat,
          longitude: validLon
        }
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding school',
      error: error.message
    });
  }
};

/**
 * Get all schools sorted by distance from user's location
 * GET /api/schools/listSchools?lat=<latitude>&lon=<longitude>
 */
const listSchools = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    // Validate location parameters
    const validation = validateLocation(lat, lon);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }

    const { latitude: userLat, longitude: userLon } = validation.data;

    const connection = await db.getConnection();
    try {
      // Fetch all schools from database
      const query = 'SELECT id, name, address, latitude, longitude FROM schools';
      const [schools] = await connection.execute(query);

      // Calculate distance for each school
      const schoolsWithDistance = schools.map(school => ({
        ...school,
        distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
      }));

      // Sort schools by distance (ascending)
      schoolsWithDistance.sort((a, b) => a.distance - b.distance);

      res.status(200).json({
        success: true,
        message: 'Schools retrieved successfully',
        userLocation: {
          latitude: userLat,
          longitude: userLon
        },
        totalSchools: schoolsWithDistance.length,
        data: schoolsWithDistance
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching schools',
      error: error.message
    });
  }
};

/**
 * Get a single school by ID
 * GET /api/schools/:id
 */
const getSchoolById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid school ID'
      });
    }

    const connection = await db.getConnection();
    try {
      const query = 'SELECT * FROM schools WHERE id = ?';
      const [schools] = await connection.execute(query, [id]);

      if (schools.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'School not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'School retrieved successfully',
        data: schools[0]
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching school:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching school',
      error: error.message
    });
  }
};

module.exports = {
  addSchool,
  listSchools,
  getSchoolById
};
