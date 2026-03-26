const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const FALLBACK_SITES_FILE = path.join(__dirname, 'sites.json');
let storageMode = 'mysql';

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ctn',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

function normalizeStation(station) {
  return {
    id: Number(station.id),
    name: String(station.name),
    lat: Number(station.lat),
    lng: Number(station.lng),
  };
}

function readFallbackStations() {
  if (!fs.existsSync(FALLBACK_SITES_FILE)) {
    return [];
  }

  const raw = fs.readFileSync(FALLBACK_SITES_FILE, 'utf8');
  const stations = JSON.parse(raw || '[]');

  if (!Array.isArray(stations)) {
    throw new Error('sites.json must contain an array of base stations');
  }

  return stations.map(normalizeStation);
}

function writeFallbackStations(stations) {
  fs.writeFileSync(FALLBACK_SITES_FILE, `${JSON.stringify(stations, null, 2)}\n`, 'utf8');
}

async function withConnection(work) {
  const connection = await pool.getConnection();

  try {
    return await work(connection);
  } finally {
    connection.release();
  }
}

async function initDb() {
  try {
    await withConnection(async () => {
      console.log('Connected to MySQL database');
    });
    storageMode = 'mysql';
  } catch (err) {
    storageMode = 'file';

    if (!fs.existsSync(FALLBACK_SITES_FILE)) {
      writeFallbackStations([]);
    } else {
      readFallbackStations();
    }

    console.warn('MySQL unavailable. Falling back to local station data in sites.json.');
    if (err instanceof Error) {
      console.warn(err.message);
    } else {
      console.warn(err);
    }
  }
}

async function getAllStations() {
  if (storageMode === 'file') {
    return readFallbackStations();
  }

  try {
    return await withConnection(async (connection) => {
      const [rows] = await connection.query('SELECT id, name, lat, lng FROM base_stations');
      return rows || [];
    });
  } catch (err) {
    console.error('Failed to read base stations:', err);
    throw err;
  }
}

async function getStationById(id) {
  if (storageMode === 'file') {
    const stationId = Number(id);
    return readFallbackStations().find((station) => station.id === stationId) || null;
  }

  try {
    return await withConnection(async (connection) => {
      const [rows] = await connection.query(
        'SELECT id, name, lat, lng FROM base_stations WHERE id = ?',
        [id]
      );
      return rows[0] || null;
    });
  } catch (err) {
    console.error('Failed to read station:', err);
    throw err;
  }
}

async function addStation({ name, lat, lng }) {
  if (storageMode === 'file') {
    const stations = readFallbackStations();
    const nextId = stations.reduce((maxId, station) => Math.max(maxId, station.id), 0) + 1;
    const nextStation = normalizeStation({ id: nextId, name, lat, lng });
    stations.push(nextStation);
    writeFallbackStations(stations);
    return nextStation;
  }

  try {
    return await withConnection(async (connection) => {
      const [result] = await connection.query(
        'INSERT INTO base_stations (name, lat, lng) VALUES (?, ?, ?)',
        [name, lat, lng]
      );
      return { id: result.insertId, name, lat, lng };
    });
  } catch (err) {
    console.error('Failed to add station:', err);
    throw err;
  }
}

async function updateStation(id, { name, lat, lng }) {
  if (storageMode === 'file') {
    const stationId = Number(id);
    const stations = readFallbackStations();
    const stationIndex = stations.findIndex((station) => station.id === stationId);

    if (stationIndex === -1) {
      return null;
    }

    const updatedStation = normalizeStation({ id: stationId, name, lat, lng });
    stations[stationIndex] = updatedStation;
    writeFallbackStations(stations);
    return updatedStation;
  }

  try {
    return await withConnection(async (connection) => {
      const [result] = await connection.query(
        'UPDATE base_stations SET name = ?, lat = ?, lng = ? WHERE id = ?',
        [name, lat, lng, id]
      );

      if (result.affectedRows === 0) {
        return null;
      }

      return { id: Number(id), name, lat, lng };
    });
  } catch (err) {
    console.error('Failed to update station:', err);
    throw err;
  }
}

async function deleteStation(id) {
  if (storageMode === 'file') {
    const stationId = Number(id);
    const stations = readFallbackStations();
    const nextStations = stations.filter((station) => station.id !== stationId);
    const deleted = stations.length - nextStations.length;

    if (deleted > 0) {
      writeFallbackStations(nextStations);
    }

    return { deleted };
  }

  try {
    return await withConnection(async (connection) => {
      const [result] = await connection.query('DELETE FROM base_stations WHERE id = ?', [id]);
      return { deleted: result.affectedRows };
    });
  } catch (err) {
    console.error('Failed to delete station:', err);
    throw err;
  }
}

module.exports = {
  initDb,
  getAllStations,
  getStationById,
  addStation,
  updateStation,
  deleteStation,
};
