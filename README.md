# School Management API

A Node.js Express-based REST API for managing schools with location-based proximity sorting.

## Features

- **Add School**: Create new school records with location coordinates
- **List Schools**: Retrieve all schools sorted by proximity to user location
- **Input Validation**: Comprehensive validation for all inputs
- **Distance Calculation**: Haversine formula for accurate geographical distance calculation
- **Error Handling**: Robust error handling and meaningful error messages
- **CORS Support**: Cross-origin resource sharing enabled
- **Environment Configuration**: Flexible configuration via .env file

## Project Structure

```
school-management-api/
├── config/
│   └── database.js           # MySQL connection pool
├── controllers/
│   └── schoolController.js   # Business logic for school operations
├── routes/
│   └── schoolRoutes.js       # API route definitions
├── utils/
│   ├── validation.js         # Input validation utilities
│   └── distance.js           # Distance calculation utilities
├── database/
│   └── schema.sql            # Database schema
├── server.js                 # Main application entry point
├── package.json              # Dependencies
├── .env                      # Environment variables
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation


1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up the database**
   - Create a MySQL database or use an existing one
   - Run the SQL commands from `database/schema.sql`:
     ```bash
     mysql -u root -p < database/schema.sql
     ```
   - Or execute the SQL commands manually in MySQL Workbench/CLI

3. **Configure environment variables**
   - Update `.env` file with your database credentials:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_password
     DB_NAME=school_management
     DB_PORT=3306
     PORT=5000
     HOST=localhost
     NODE_ENV=development
     ```

4. **Start the server**
   ```bash
   npm start              # Production mode
   npm run dev           # Development mode with hot reload (nodemon)
   ```

School Management API - Testing Guide

Live API URL:
https://api-school-management.up.railway.app/

---

1. Add School API

Endpoint:
POST https://api-school-management.up.railway.app/api/schools/addSchool

Request Body (JSON):
{
"name": "Test School",
"address": "Hyderabad",
"latitude": 17.385,
"longitude": 78.4867
}

---

2. List Schools API

Endpoint:
GET https://api-school-management.up.railway.app/api/schools/listSchools?lat=17.4&lon=78.5

---

3. Health Check (Optional)

Endpoint:
GET https://api-school-management.up.railway.app/api/health

---

Important Notes:

* Use Postman to test APIs
* POST request cannot be tested in browser
* Add school first before listing
* Ensure database table exists

---

Status: Deployment Successful


## API Documentation

### Health Check

**Endpoint**: `GET /api/health`

**Response**:
```json
{
  "status": "OK",
  "message": "School Management API is running",
  "timestamp": "2024-03-23T10:30:00.000Z"
}
```

### Add School

**Endpoint**: `POST /api/schools/addSchool`

**Request Body**:
```json
{
  "name": "Lincoln High School",
  "address": "123 Main Street, Springfield",
  "latitude": 39.7817,
  "longitude": -89.6501
}
```

**Validation Rules**:
- `name`: Required, string, 2-255 characters
- `address`: Required, string, 5-255 characters
- `latitude`: Required, number between -90 and 90
- `longitude`: Required, number between -180 and 180

**Success Response (201)**:
```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Lincoln High School",
    "address": "123 Main Street, Springfield",
    "latitude": 39.7817,
    "longitude": -89.6501
  }
}
```

**Error Response (400)**:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Name must be at least 2 characters long"
  ]
}
```

### List Schools

**Endpoint**: `GET /api/schools/listSchools?lat=<latitude>&lon=<longitude>`

**Query Parameters**:
- `lat`: User's latitude (required, -90 to 90)
- `lon`: User's longitude (required, -180 to 180)

**Request Example**:
```
GET /api/schools/listSchools?lat=39.7817&lon=-89.6501
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Schools retrieved successfully",
  "userLocation": {
    "latitude": 39.7817,
    "longitude": -89.6501
  },
  "totalSchools": 4,
  "data": [
    {
      "id": 1,
      "name": "Lincoln High School",
      "address": "123 Main Street, Springfield",
      "latitude": 39.7817,
      "longitude": -89.6501,
      "distance": 0.0
    },
    {
      "id": 2,
      "name": "Jefferson Elementary",
      "address": "456 Oak Avenue, Springfield",
      "latitude": 39.7849,
      "longitude": -89.6484,
      "distance": 0.52
    }
  ]
}
```

**Error Response (400)**:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "User latitude must be a valid number between -90 and 90"
  ]
}
```

### Get School by ID

**Endpoint**: `GET /api/schools/:id`

**Request Example**:
```
GET /api/schools/1
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "School retrieved successfully",
  "data": {
    "id": 1,
    "name": "Lincoln High School",
    "address": "123 Main Street, Springfield",
    "latitude": 39.7817,
    "longitude": -89.6501,
    "created_at": "2024-03-23 10:30:00",
    "updated_at": "2024-03-23 10:30:00"
  }
}
```

## Distance Calculation

Schools are sorted using the **Haversine formula**, which calculates the great-circle distance between two points on a sphere given their latitudes and longitudes. The distance is returned in **kilometers**.

## Error Handling

The API provides meaningful error responses with appropriate HTTP status codes:

- `200 OK`: Successful GET/HEAD request
- `201 Created`: Successful POST request creating a resource
- `400 Bad Request`: Invalid input or validation error
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error

All error responses include:
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Specific error details if applicable"],
  "error": "Error message (development mode only)"
}


