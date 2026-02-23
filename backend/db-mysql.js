const mysql = require('mysql2/promise');

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

async function initDb() {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL database');
    connection.release();
  } catch (err) {
    console.error('Failed to connect to MySQL:', err);
    throw err;
  }
}

async function getAllStations() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT id, name, lat, lng FROM base_stations');
    connection.release();
    return rows || [];
  } catch (err) {
    console.error('Failed to read base stations:', err);
    throw err;
  }
}

async function getStationById(id) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT id, name, lat, lng FROM base_stations WHERE id = ?', [id]);
    connection.release();
    return rows[0] || null;
  } catch (err) {
    console.error('Failed to read station:', err);
    throw err;
  }
}

async function addStation({ name, lat, lng }) {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO base_stations (name, lat, lng) VALUES (?, ?, ?)',
      [name, lat, lng]
    );
    connection.release();
    return { id: result.insertId, name, lat, lng };
  } catch (err) {
    console.error('Failed to add station:', err);
    throw err;
  }
}

async function updateStation(id, { name, lat, lng }) {
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE base_stations SET name = ?, lat = ?, lng = ? WHERE id = ?',
      [name, lat, lng, id]
    );
    connection.release();
    return { id: Number(id), name, lat, lng };
  } catch (err) {
    console.error('Failed to update station:', err);
    throw err;
  }
}

async function deleteStation(id) {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query('DELETE FROM base_stations WHERE id = ?', [id]);
    connection.release();
    return { deleted: result.affectedRows };
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
