# Map Not Showing - Debug Checklist

## Step 1: Verify Google Maps API Key
1. Open `frontend/.env.local`
2. Check `VITE_GOOGLE_MAPS_KEY=` (should NOT contain "YOUR_GOOGLE_MAPS_API_KEY_HERE")
3. If missing/placeholder, get a real key:
   - Go to https://console.cloud.google.com/
   - Create & enable "Maps JavaScript API"
   - Create API Key (Credentials → Create Credentials)
   - Add to `.env.local`
4. **Restart frontend** (Ctrl+C, then `npm run dev`)

## Step 2: Check Browser Console Errors
1. Open browser (usually http://localhost:5173)
2. Press **F12** to open DevTools → **Console** tab
3. Look for red error messages
4. Expected logs should include:
   - `Fetching base stations from: http://localhost:4000`
   - `Base stations fetched: [...]` (array of stations)
   - `Initializing map with X stations`
   - `Google Maps loaded successfully`

## Step 3: Verify Backend is Running
1. Check if port 4000 is listening:
   ```bash
   netstat -ano | findstr :4000
   ```

2. If nothing shows, start backend:
   ```bash
   cd backend
   npm run start
   ```

3. Test backend endpoint:
   ```bash
   node backend/test-api.js
   ```
   
   Should show:
   ```
   ✓ GET / : CTN backend running
   ✓ GET /api/base-stations : [...]
   ✓ POST /api/coverage : {"inCoverage": ...}
   ```

## Step 4: Verify MySQL is Running
1. Open XAMPP control panel
2. Check MySQL is **Started** (green indicator)
3. Connect to MySQL:
   ```bash
   mysql -u root
   ```
4. Check database exists:
   ```sql
   SHOW DATABASES;
   USE ctn;
   SELECT * FROM base_stations LIMIT 1;
   ```

## Step 5: Check Network Tab (Browser DevTools)
1. Open DevTools → **Network** tab
2. Click "Check Coverage" button on map modal
3. Look for requests:
   - `base-stations` request (should be 200)
   - `coverage` request (should be 200)
   - `maps.googleapis.com/maps/api/js?key=...` (should be 200)
4. If any show red (failed), click and check the error

## Step 6: Verify VITE_API_URL
1. Open `frontend/.env.local`
2. Check `VITE_API_URL=http://localhost:4000`
3. Make sure it matches where backend is running

## Common Issues

| Issue | Fix |
|-------|-----|
| **"Google Maps API key not provided"** | Set real key in `.env.local` & restart |
| **"Cannot fetch base stations"** | Backend not running - run `npm run start` in backend folder |
| **Map shows but no circles** | Base stations not in MySQL - run SQL schema |
| **Zone.js error** | Check browser console for full error - usually CORS or API key issue |

## Quick Full Reset
```bash
# Kill backend
lsof -ti:4000 | xargs kill -9

# Backend fresh start
cd backend
npm run start

# In another terminal - Frontend fresh start
cd frontend
npm run dev

# Browser - Hard refresh (Ctrl+Shift+R)
```

## Check Specific Error Messages
After reopening the modal with DevTools console open, look for:
- `"Google Maps loaded successfully"` → API key is valid
- `"Failed to fetch base stations"` → Backend not running or MySQL down
- `"ECONNREFUSED"` → Backend not listening on 4000
- API key error → Check .env.local and restart frontend

## Final Debug: Direct API Test
From `backend` folder, run:
```bash
node test-api.js
```

This tests all three endpoints without the UI layer.
