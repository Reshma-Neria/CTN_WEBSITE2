-- Update CTN base stations table with all 14 tower sites
USE ctn;

-- Delete existing stations
DELETE FROM base_stations;

-- Insert all 14 new stations
INSERT INTO base_stations (id, name, lat, lng) VALUES
(1, 'EMBASSY_AREA9', -13.9804, 33.7543),
(2, 'AREA10 PTC', -13.9396, 33.8039),
(3, 'AREA36', -14.018, 33.7857),
(4, 'AIRWING', -13.9567, 33.7042),
(5, 'AREA47SECTOR3', -13.9547, 33.7627),
(6, 'KABWABWA', -13.8786, 33.7594),
(7, 'CHITIPI TURNOFF', -13.9938, 33.6841),
(8, 'Madzi', -13.9963, 33.7546),
(9, 'Area 47', -13.9578, 33.7589),
(10, 'Area 49', -13.9345, 33.7501),
(11, 'Airwing', -13.9565, 33.7038),
(12, 'Capital Hill', -13.9458, 33.7903),
(13, 'Silos', -13.8922, 33.8073),
(14, 'Civo', -13.9809, 33.7615);

-- Verify all stations inserted
SELECT COUNT(*) as total_stations FROM base_stations;
SELECT * FROM base_stations;
