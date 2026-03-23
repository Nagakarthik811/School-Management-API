// Validate school input data
const validateSchoolInput = (name, address, latitude, longitude) => {
  const errors = [];

  // Validate name
  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('Name is required and must be a non-empty string');
  } else if (name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (name.trim().length > 255) {
    errors.push('Name cannot exceed 255 characters');
  }

  // Validate address
  if (!address || typeof address !== 'string' || address.trim() === '') {
    errors.push('Address is required and must be a non-empty string');
  } else if (address.trim().length < 5) {
    errors.push('Address must be at least 5 characters long');
  } else if (address.trim().length > 255) {
    errors.push('Address cannot exceed 255 characters');
  }

  // Validate latitude
  const lat = parseFloat(latitude);
  if (isNaN(lat) || lat < -90 || lat > 90) {
    errors.push('Latitude must be a valid number between -90 and 90');
  }

  // Validate longitude
  const lon = parseFloat(longitude);
  if (isNaN(lon) || lon < -180 || lon > 180) {
    errors.push('Longitude must be a valid number between -180 and 180');
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
    data: {
      name: name?.trim(),
      address: address?.trim(),
      latitude: lat,
      longitude: lon
    }
  };
};

// Validate location coordinates
const validateLocation = (latitude, longitude) => {
  const errors = [];

  const lat = parseFloat(latitude);
  if (isNaN(lat) || lat < -90 || lat > 90) {
    errors.push('User latitude must be a valid number between -90 and 90');
  }

  const lon = parseFloat(longitude);
  if (isNaN(lon) || lon < -180 || lon > 180) {
    errors.push('User longitude must be a valid number between -180 and 180');
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
    data: {
      latitude: lat,
      longitude: lon
    }
  };
};

module.exports = {
  validateSchoolInput,
  validateLocation
};
