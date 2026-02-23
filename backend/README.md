# CTN Backend

Simple Express backend for CTN frontend coverage checks.

Run:

```bash
cd backend
npm install
npm start
```

APIs:

- `GET /api/base-stations` - list seeded base stations
- `POST /api/base-stations` - add station { name, lat, lng }
- `GET /api/coverage?lat=<lat>&lng=<lng>` - check coverage and nearest station
- `POST /api/coverage` - body { lat:number, lng:number }
