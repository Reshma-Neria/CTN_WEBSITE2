-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 25, 2026 at 12:37 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ctn`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_coverage` (IN `p_lat` DOUBLE, IN `p_lng` DOUBLE)   BEGIN
  DECLARE radius_km DOUBLE DEFAULT 10;
  -- read configured radius if present
  SELECT CAST(value AS DECIMAL(6,2)) INTO radius_km FROM config WHERE `key`='coverage_radius_km' LIMIT 1;

  -- nearest station + distance and in_coverage flag
  SELECT
    s.id,
    s.name,
    s.lat,
    s.lng,
    ROUND(haversine_km(p_lat, p_lng, s.lat, s.lng), 2) AS distance_km,
    CASE WHEN haversine_km(p_lat, p_lng, s.lat, s.lng) <= radius_km THEN 1 ELSE 0 END AS in_coverage
  FROM base_stations s
  ORDER BY distance_km
  LIMIT 1;
END$$

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `haversine_km` (`lat1` DOUBLE, `lon1` DOUBLE, `lat2` DOUBLE, `lon2` DOUBLE) RETURNS DOUBLE DETERMINISTIC BEGIN
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

-- --------------------------------------------------------

--
-- Table structure for table `base_stations`
--

CREATE TABLE `base_stations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lat` decimal(9,6) NOT NULL,
  `lng` decimal(9,6) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `base_stations`
--

INSERT INTO `base_stations` (`id`, `name`, `lat`, `lng`, `created_at`) VALUES
(1, 'EMBASSY_AREA9', -13.980400, 33.754300, '2026-02-23 11:16:20'),
(2, 'AREA10 PTC', -13.939600, 33.803900, '2026-02-23 11:16:20'),
(3, 'AREA36', -14.018000, 33.785700, '2026-02-23 11:16:20'),
(4, 'AIRWING', -13.956700, 33.704200, '2026-02-23 11:16:20'),
(5, 'AREA47SECTOR3', -13.954700, 33.762700, '2026-02-23 11:16:20'),
(6, 'KABWABWA', -13.878600, 33.759400, '2026-02-23 11:16:20'),
(7, 'CHITIPI TURNOFF', -13.993800, 33.684100, '2026-02-23 11:16:20'),
(8, 'Madzi', -13.996300, 33.754600, '2026-02-23 11:16:20'),
(9, 'Area 47', -13.957800, 33.758900, '2026-02-23 11:16:20'),
(10, 'Area 49', -13.934500, 33.750100, '2026-02-23 11:16:20'),
(11, 'Airwing', -13.956500, 33.703800, '2026-02-23 11:16:20'),
(12, 'Capital Hill', -13.945800, 33.790300, '2026-02-23 11:16:20'),
(13, 'Silos', -13.892200, 33.807300, '2026-02-23 11:16:20'),
(14, 'Civo', -13.980900, 33.761500, '2026-02-23 11:16:20');

-- --------------------------------------------------------

--
-- Table structure for table `config`
--

CREATE TABLE `config` (
  `key` varchar(100) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `config`
--

INSERT INTO `config` (`key`, `value`) VALUES
('coverage_radius_km', '10');

-- --------------------------------------------------------

--
-- Table structure for table `coverage_checks`
--

CREATE TABLE `coverage_checks` (
  `id` int(11) NOT NULL,
  `lat` decimal(9,6) NOT NULL,
  `lng` decimal(9,6) NOT NULL,
  `in_coverage` tinyint(1) NOT NULL,
  `nearest_station_id` int(11) DEFAULT NULL,
  `nearest_distance_km` decimal(6,2) DEFAULT NULL,
  `checked_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `key` varchar(100) NOT NULL,
  `value` text NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `base_stations`
--
ALTER TABLE `base_stations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `coverage_checks`
--
ALTER TABLE `coverage_checks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nearest_station_id` (`nearest_station_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`key`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `base_stations`
--
ALTER TABLE `base_stations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `coverage_checks`
--
ALTER TABLE `coverage_checks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `coverage_checks`
--
ALTER TABLE `coverage_checks`
  ADD CONSTRAINT `coverage_checks_ibfk_1` FOREIGN KEY (`nearest_station_id`) REFERENCES `base_stations` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
