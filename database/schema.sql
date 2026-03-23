/**
 * Database Schema
 * Run these SQL commands to set up the database
 */

-- Create database
CREATE DATABASE IF NOT EXISTS school_management;

-- Use database
USE school_management;

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name (name),
  INDEX idx_coordinates (latitude, longitude)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data (optional)
INSERT INTO schools (name, address, latitude, longitude) VALUES
('Lincoln High School', '123 Main Street, Springfield', 39.7817, -89.6501),
('Jefferson Elementary', '456 Oak Avenue, Springfield', 39.7849, -89.6484),
('Washington Middle School', '789 Elm Road, Springfield', 39.7884, -89.6552),
('Franklin School', '321 Maple Drive, Springfield', 39.7734, -89.6447);
