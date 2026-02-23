const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const DB_FILE = path.join(__dirname, 'ctn.db');
const SITES_FILE = path.join(__dirname, 'sites.json');

function openDb() {
  return new sqlite3.Database(DB_FILE);
}

function initDb() {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS base_stations (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        )`
      );

      // Migrate sites.json into DB if DB empty
      db.get('SELECT COUNT(1) as cnt FROM base_stations', (err, row) => {
        if (err) {
          db.close();
          return reject(err);
        }

        const count = row?.cnt || 0;
        if (count === 0) {
          try {
            if (fs.existsSync(SITES_FILE)) {
              const raw = fs.readFileSync(SITES_FILE, 'utf8');
              const sites = JSON.parse(raw || '[]');
              const stmt = db.prepare('INSERT INTO base_stations (id, name, lat, lng) VALUES (?, ?, ?, ?)');
              sites.forEach((s) => {
                stmt.run(s.id, s.name, s.lat, s.lng);
              });
              stmt.finalize(() => {
                db.close();
                resolve();
              });
              return;
            }
          } catch (e) {
            db.close();
            return reject(e);
          }
        }

        db.close();
        resolve();
      });
    });
  });
}

function getAllStations() {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.all('SELECT id, name, lat, lng FROM base_stations', (err, rows) => {
      db.close();
      if (err) return reject(err);
      resolve(rows || []);
    });
  });
}

function getStationById(id) {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.get('SELECT id, name, lat, lng FROM base_stations WHERE id = ?', [id], (err, row) => {
      db.close();
      if (err) return reject(err);
      resolve(row || null);
    });
  });
}

function addStation({ name, lat, lng }) {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO base_stations (name, lat, lng) VALUES (?, ?, ?)', [name, lat, lng], function (err) {
      const id = this?.lastID;
      db.close();
      if (err) return reject(err);
      resolve({ id, name, lat, lng });
    });
  });
}

function updateStation(id, { name, lat, lng }) {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.run('UPDATE base_stations SET name = ?, lat = ?, lng = ? WHERE id = ?', [name, lat, lng, id], function (err) {
      db.close();
      if (err) return reject(err);
      resolve({ id: Number(id), name, lat, lng });
    });
  });
}

function deleteStation(id) {
  const db = openDb();
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM base_stations WHERE id = ?', [id], function (err) {
      db.close();
      if (err) return reject(err);
      resolve({ deleted: this.changes });
    });
  });
}

module.exports = {
  initDb,
  getAllStations,
  getStationById,
  addStation,
  updateStation,
  deleteStation,
};
