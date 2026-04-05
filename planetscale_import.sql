-- Database Export for Almabridge Project
-- Ready for PlanetScale import

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student data table
CREATE TABLE IF NOT EXISTS stu_data (
    stu_id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(20),
    Year VARCHAR(50),
    passOutYear INT,
    miniProjects1 TEXT,
    miniProjects2 TEXT,
    bigProjects1 TEXT,
    bigProjects2 TEXT,
    academicAchievements1 TEXT,
    academicAchievements2 TEXT,
    certifications1 TEXT,
    certifications2 TEXT,
    working ENUM('Yes', 'No') DEFAULT 'No',
    companyName VARCHAR(255),
    image VARCHAR(255),
    qrimage VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stu_id INT NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    year VARCHAR(50),
    passOutYear INT,
    companyName VARCHAR(255),
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_stu_id (stu_id)
);

-- Sample data
INSERT INTO users (username, email, password) VALUES 
('test', 'test@gmail.com', 'Asdf1234');

INSERT INTO stu_data (firstName, lastName, email, mobile, Year, passOutYear, working) VALUES 
('John', 'Doe', 'john.doe@example.com', '1234567890', '3rd Year', 2025, 'No'),
('Jane', 'Smith', 'jane.smith@example.com', '9876543210', 'passout', 2024, 'Yes'),
('Alice', 'Johnson', 'alice.j@example.com', '5555555555', '2nd Year', 2026, 'No');
