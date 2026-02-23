const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dbMySQL = require('./db-mysql');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const coverageRadiusKm = 10; // 10 km coverage per tower

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Initialize DB (MySQL)
dbMySQL.initDb()
  .then(() => console.log('DB initialized'))
  .catch((err) => {
    console.error('DB init failed:', err);
    console.error('Make sure MySQL is running and the ctn database is created.');
    process.exit(1);
  });

// GET /api/base-stations
app.get('/api/base-stations', async (req, res) => {
  try {
    const sites = await dbMySQL.getAllStations();
    res.json(sites);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read base stations' });
  }
});

// POST /api/base-stations - add new station
app.post('/api/base-stations', async (req, res) => {
  const { name, lat, lng } = req.body || {};
  if (!name || typeof lat !== 'number' || typeof lng !== 'number') {
    return res.status(400).json({ error: 'Invalid payload. Require name:string, lat:number, lng:number' });
  }
  try {
    const station = await dbMySQL.addStation({ name, lat, lng });
    res.status(201).json(station);
  } catch (err) {
    console.error('Failed to add station', err);
    res.status(500).json({ error: 'Failed to persist station' });
  }
});

// GET /api/base-stations/:id
app.get('/api/base-stations/:id', async (req, res) => {
  try {
    const station = await dbMySQL.getStationById(req.params.id);
    if (!station) return res.status(404).json({ error: 'Not found' });
    res.json(station);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read station' });
  }
});

// PUT /api/base-stations/:id
app.put('/api/base-stations/:id', async (req, res) => {
  const { name, lat, lng } = req.body || {};
  if (!name || typeof lat !== 'number' || typeof lng !== 'number') {
    return res.status(400).json({ error: 'Invalid payload. Require name:string, lat:number, lng:number' });
  }
  try {
    const updated = await dbMySQL.updateStation(req.params.id, { name, lat, lng });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update station' });
  }
});

// DELETE /api/base-stations/:id
app.delete('/api/base-stations/:id', async (req, res) => {
  try {
    const result = await dbMySQL.deleteStation(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete station' });
  }
});

// POST /api/coverage - body { lat, lng }
app.post('/api/coverage', async (req, res) => {
  const { lat, lng } = req.body || {};
  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return res.status(400).json({ error: 'Missing or invalid lat/lng in body' });
  }

  try {
    const sites = await dbMySQL.getAllStations();
    if (!sites || sites.length === 0) return res.json({ inCoverage: false, nearest: null });

    let minDist = Infinity;
    let nearest = null;
    sites.forEach((s) => {
      const d = haversineKm(lat, lng, s.lat, s.lng);
      if (d < minDist) {
        minDist = d;
        nearest = { id: s.id, name: s.name, lat: s.lat, lng: s.lng, distanceKm: Math.round(d * 10) / 10 };
      }
    });

    res.json({ inCoverage: minDist <= coverageRadiusKm, nearest });
  } catch (err) {
    res.status(500).json({ error: 'Coverage evaluation failed' });
  }
});

app.get('/', (req, res) => res.send('CTN backend running'));

app.listen(PORT, () => {
  console.log(`CTN backend listening on http://localhost:${PORT}`);
});
