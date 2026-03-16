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
  } catch (err) {
    console.error('Failed to connect to MySQL:', err);
    throw err;
  }
}

async function getAllStations() {
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
