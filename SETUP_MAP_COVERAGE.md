# CTN Map Coverage Feature - Setup Guide

## Prerequisites
- Node.js (v14+)
- MySQL (XAMPP or standalone)
- Google Maps API Key

## Step 1: Set Up MySQL Database

1. Open **phpMyAdmin** (http://localhost/phpmyadmin) or use MySQL CLI
2. Run the SQL script below to create database, tables, and the haversine function:

```sql
-- CTN MySQL schema + haversine function + check procedure
CREATE DATABASE IF NOT EXISTS ctn CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE ctn;

-- Drop existing tables if present
DROP TABLE IF EXISTS coverage_checks;
DROP TABLE IF EXISTS base_stations;
DROP TABLE IF EXISTS config;

-- Base stations table
CREATE TABLE base_stations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  lat DECIMAL(9,6) NOT NULL,
  lng DECIMAL(9,6) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Coverage checks log
CREATE TABLE coverage_checks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lat DECIMAL(9,6) NOT NULL,
  lng DECIMAL(9,6) NOT NULL,
  in_coverage TINYINT(1) NOT NULL,
  nearest_station_id INT NULL,
  nearest_distance_km DECIMAL(6,2) NULL,
  checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (nearest_station_id) REFERENCES base_stations(id)
);

-- Config table
CREATE TABLE config (
  `key` VARCHAR(100) PRIMARY KEY,
  `value` VARCHAR(255) NOT NULL
);

INSERT INTO config (`key`,`value`) VALUES ('coverage_radius_km','10')
  ON DUPLICATE KEY UPDATE `value`=VALUES(`value`);

-- Haversine function
DROP FUNCTION IF EXISTS haversine_km;
DELIMITER $$
CREATE FUNCTION haversine_km(lat1 DOUBLE, lon1 DOUBLE, lat2 DOUBLE, lon2 DOUBLE)
RETURNS DOUBLE DETERMINISTIC
BEGIN
  DECLARE R DOUBLE DEFAULT 6371.0;
  DECLARE dLat DOUBLE;
  DECLARE dLon DOUBLE;
  DECLARE a DOUBLE;
  DECLARE c DOUBLE;
  SET dLat = RADIANS(lat2 - lat1);
  SET dLon = RADIANS(lon2 - lon1);
  SET a = SIN(dLat/2)*SIN(dLat/2) + COS(RADIANS(lat1))*COS(RADIANS(lat2))*SIN(dLon/2)*SIN(dLon/2);
  SET c = 2 * ATAN2(SQRT(a), SQRT(1 - a));
  RETURN R * c;
END$$
DELIMITER ;

-- Insert base stations from your sites.json
INSERT INTO base_stations (id,name,lat,lng) VALUES
 (1,'CTN Office - Lilongwe Area 47', -13.9671945, 33.7492222),
 (2,'Base Station A - Lilongwe', -13.9626, 33.7741),
 (3,'Base Station B - Lilongwe', -13.955, 33.78)
ON DUPLICATE KEY UPDATE name=VALUES(name), lat=VALUES(lat), lng=VALUES(lng);
```

## Step 2: Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Copy `.env.example` to `.env` and update MySQL credentials:
```bash
cp .env.example .env
```

3. Edit `.env` with your MySQL details:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ctn
PORT=4000
```

4. Install dependencies:
```bash
npm install
```

5. Start the backend server:
```bash
npm run start
```

Expected output:
```
DB initialized
CTN backend listening on http://localhost:4000
```

## Step 3: Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Get a **Google Maps API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable Maps API
   - Create API key (Restrict to Browser key with Maps JavaScript API)

3. Update `.env.local` with your Google Maps API key:
```
VITE_API_URL=http://localhost:4000
VITE_GOOGLE_MAPS_KEY=your_actual_google_maps_api_key_here
```

4. Install dependencies:
```bash
npm install
```

5. Start development server:
```bash
npm run dev
```

## Step 4: Test Coverage Feature

1. Open frontend in browser (usually http://localhost:5173)
2. Navigate to a package and click "Check Coverage"
3. The map should load showing:
   - **Green circles**: 10km coverage areas around base stations
   - **Green dots**: Base station locations
4. Enter coordinates or use "Use My Location" button
5. Map updates with your location marker (green if in coverage, red if not)

## API Endpoints

### GET /api/base-stations
Returns all base stations with coordinates

**Response:**
```json
[
  {
    "id": 1,
    "name": "CTN Office - Lilongwe Area 47",
    "lat": -13.9671945,
    "lng": 33.7492222
  }
]
```

### POST /api/coverage
Check if coordinates are within coverage area

**Request:**
```json
{
  "lat": -13.966,
  "lng": 33.760
}
```

**Response:**
```json
{
  "inCoverage": true,
  "nearest": {
    "id": 1,
    "name": "CTN Office - Lilongwe Area 47",
    "lat": -13.9671945,
    "lng": 33.7492222,
    "distanceKm": 2.5
  }
}
```

## Troubleshooting

### Map not showing
- Check browser console for errors
- Verify Google Maps API key is valid
- Check `VITE_GOOGLE_MAPS_KEY` in `.env.local`

### Backend connection fails
- Ensure MySQL is running
- Check MySQL credentials in `.env`
- Verify database `ctn` exists and tables are created

### Coverage radius incorrect
- Frontend: `CoverageCheckModal.tsx` line 64 (should be 10)
- Backend: `index.js` line 12 (should be 10)

## Architecture

- **Frontend**: React + TypeScript with Google Maps integration
- **Backend**: Node.js/Express with MySQL
- **Coverage Check**: Haversine formula calculates distance between user and base stations
- **Coverage Radius**: 10 km per tower

## Files Modified
- `backend/index.js` - API endpoints, coverage logic
- `backend/db-mysql.js` - MySQL connection & queries
- `backend/.env.example` - Configuration template
- `frontend/src/components/CoverageCheckModal.tsx` - Map interface
- `frontend/.env.local` - Frontend configuration
- `frontend/src/utils/loadGoogleMaps.ts` - Google Maps loader
