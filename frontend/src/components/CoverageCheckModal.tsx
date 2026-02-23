import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { X, MapPin, CheckCircle, XCircle, Navigation, Search } from 'lucide-react';
import { MapContainer, TileLayer, Circle, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';

// Custom marker icons for the 7 sites
const customIcons = [
  L.divIcon({
    html: `<div style="background: #ef4444; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">1</div>`,
    iconSize: [40, 40],
    className: 'custom-marker',
  }),
  L.divIcon({
    html: `<div style="background: #3b82f6; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">2</div>`,
    iconSize: [40, 40],
    className: 'custom-marker',
  }),
  L.divIcon({
    html: `<div style="background: #8b5cf6; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">3</div>`,
    iconSize: [40, 40],
    className: 'custom-marker',
  }),
  L.divIcon({
    html: `<div style="background: #f59e0b; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">4</div>`,
    iconSize: [40, 40],
    className: 'custom-marker',
  }),
  L.divIcon({
    html: `<div style="background: #06b6d4; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">5</div>`,
    iconSize: [40, 40],
    className: 'custom-marker',
  }),
  L.divIcon({
    html: `<div style="background: #10b981; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">6</div>`,
    iconSize: [40, 40],
    className: 'custom-marker',
  }),
  L.divIcon({
    html: `<div style="background: #ec4899; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">7</div>`,
    iconSize: [40, 40],
    className: 'custom-marker',
  }),
];

// User location marker icon (blue with person symbol)
const userLocationIcon = L.divIcon({
  html: `<div style="background: #0066ff; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 24px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,102,255,0.5);">📍</div>`,
  iconSize: [40, 40],
  className: 'user-marker',
});

interface BaseStation {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

interface CoverageCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  packageName: string;
}

// Fix Leaflet's default icon paths for Vite bundling
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

(L.Icon.Default as any).mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

function FitBounds({ stations }: { stations: BaseStation[] }) {
  const map = useMap();
  useEffect(() => {
    if (!map || !stations || stations.length === 0) return;
    const latlngs = stations.map((s) => [s.lat, s.lng] as [number, number]);
    const bounds = L.latLngBounds(latlngs);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, stations]);
  return null;
}

export function CoverageCheckModal({ isOpen, onClose, onConfirm, packageName }: CoverageCheckModalProps) {
  const [clientLat, setClientLat] = useState<string>('');
  const [clientLng, setClientLng] = useState<string>('');
  const [clientCoords, setClientCoords] = useState<string>('');
  const [isInCoverage, setIsInCoverage] = useState<boolean | null>(null);
  const [nearestStation, setNearestStation] = useState<{ name: string; distance: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [mapLoading, setMapLoading] = useState(true);

  const mapRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);

  const [baseStations, setBaseStations] = useState<BaseStation[]>([]);

  // Fetch base stations from backend when modal opens
  useEffect(() => {
    if (isOpen) {
      const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:4000';
      console.log('Fetching base stations from:', API_URL);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      fetch(`${API_URL}/api/base-stations`, { signal: controller.signal })
        .then((res) => {
          console.log('Base stations response:', res.status);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => {
          console.log('Base stations fetched:', data);
          const normalized = (data || []).map((s: any) => ({
            id: s.id,
            name: s.name,
            lat: Number(s.lat),
            lng: Number(s.lng),
          }));
          setBaseStations(normalized);
          // Ensure map recalculates size when data arrives
          // Invalidate size a few times (modal transition can cause sizing issues)
          const tryInvalidate = () => {
            try {
              if (mapInstanceRef.current && typeof mapInstanceRef.current.invalidateSize === 'function') {
                mapInstanceRef.current.invalidateSize();
              }
              if (mapInstanceRef.current && mapInstanceRef.current.scrollWheelZoom) {
                mapInstanceRef.current.scrollWheelZoom.disable();
              }
            } catch (e) {
              /* ignore */
            }
          };
          setTimeout(tryInvalidate, 150);
          setTimeout(tryInvalidate, 350);
          setTimeout(tryInvalidate, 800);
        })
        .catch((err) => {
          console.error('Failed to fetch base stations:', err);
          setError('Failed to fetch coverage information. Ensure backend is running.');
          setBaseStations([]);
        })
        .finally(() => clearTimeout(timeoutId));
    }
  }, [isOpen]);

  const coverageRadius = 10; // km

  // client marker state
  const [clientPos, setClientPos] = useState<[number, number] | null>(null);

  // Check coverage via backend
  const checkCoverage = (lat: number, lng: number) => {
    const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:4000';
    setError('');
    setIsLoading(true);

    fetch(`${API_URL}/api/coverage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lng }),
    })
      .then((res) => res.json())
      .then((data) => {
        const inCoverage = !!data.inCoverage;
        const nearest = data.nearest ? { name: data.nearest.name, distance: data.nearest.distanceKm } : null;
        setIsInCoverage(inCoverage);
        setNearestStation(nearest);
        setClientPos([lat, lng]);
        // Ensure the Leaflet map has rendered, then center on user location.
        try {
          if (mapInstanceRef.current) {
            // Force a size recalculation (helps when map is inside a modal)
            mapInstanceRef.current.invalidateSize();
            // Wait until the map is ready, then set view. Use flyTo as a smooth fallback.
            mapInstanceRef.current.whenReady(() => {
              try {
                mapInstanceRef.current.setView([lat, lng], 13);
              } catch (e) {
                try {
                  mapInstanceRef.current.flyTo([lat, lng], 13);
                } catch (_err) {
                  /* ignore */
                }
              }
            });
          }
        } catch (e) {
          // If anything fails, attempt a best-effort center after a short delay
          setTimeout(() => {
            if (mapInstanceRef.current) {
              try {
                mapInstanceRef.current.setView([lat, lng], 13);
              } catch (err) {
                try {
                  mapInstanceRef.current.flyTo([lat, lng], 13);
                } catch (_err) {}
              }
            }
          }, 300);
        }

        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Coverage check failed:', err);
        setError('Failed to evaluate coverage.');
        setIsInCoverage(null);
        setIsLoading(false);
      });
  };

  const handleGetLocation = () => {
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setClientLat(lat.toString());
        setClientLng(lng.toString());
        setClientCoords(`${lat}, ${lng}`);
        checkCoverage(lat, lng);
      },
      () => {
        setError('Unable to retrieve your location. Please enter coordinates manually.');
      }
    );
  };

  const handleCheckCoverage = () => {
    setError('');
    if (!clientCoords.trim()) {
      setError('Please enter coordinates (latitude, longitude).');
      return;
    }
    
    // Parse coordinates - handle multiple formats (comma-separated, space-separated, or mixed)
    let parts = clientCoords
      .replace(/[,\s]+/g, ',') // Replace any comma or space sequence with single comma
      .split(',')
      .map(p => p.trim())
      .filter(p => p.length > 0); // Remove empty parts
    
    if (parts.length !== 2) {
      setError('Please enter two coordinates in any of these formats: "-13.9626, 33.7741" or "-13.9626 33.7741"');
      return;
    }
    
    const lat = parseFloat(parts[0]);
    const lng = parseFloat(parts[1]);
    
    if (isNaN(lat) || isNaN(lng)) {
      setError('Coordinates must be numbers. Example: -13.9626, 33.7741');
      return;
    }
    
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      setError('Invalid coordinates. Latitude must be -90 to 90, longitude -180 to 180.');
      return;
    }
    
    setClientLat(lat.toString());
    setClientLng(lng.toString());
    checkCoverage(lat, lng);
  };

  useEffect(() => {
    if (!isOpen) {
      setClientLat('');
      setClientLng('');
      setClientCoords('');
      setIsInCoverage(null);
      setNearestStation(null);
      setError('');
      setMapLoading(true);
      setClientPos(null);
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1e3a5f] rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Check Coverage for <span className="text-[#a4d65e]">{packageName}</span>
            </h2>
            <p className="text-white/70 mt-1">Verify if your location is within our network coverage</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth" style={{ overscrollBehavior: 'contain' }}>
          {/* Input Section */}
          <div className="mb-6 bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#a4d65e]" />
              Enter Your Location
            </h3>
            
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">Your Coordinates</label>
              <input
                type="text"
                value={clientCoords}
                onChange={(e) => setClientCoords(e.target.value)}
                placeholder="e.g., -13.9626 33.7741 or -13.9626, 33.7741"
                className="w-full bg-white/10 text-white placeholder-white/40 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a4d65e] border border-white/10"
              />
              <p className="text-white/50 text-xs mt-2">Enter lat and lng separated by space or comma</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGetLocation}
                disabled={isLoading}
                className="flex-1 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Navigation className="w-5 h-5" />
                {isLoading ? 'Getting Location...' : 'Use My Location'}
              </button>
              <button
                onClick={handleCheckCoverage}
                className="flex-1 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Check Coverage
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Coverage Result */}
          {isInCoverage !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-6 rounded-xl border ${
                isInCoverage
                  ? 'bg-[#a4d65e]/20 border-[#a4d65e]/50'
                  : 'bg-red-500/20 border-red-500/50'
              }`}
            >
              <div className="flex items-start gap-4">
                {isInCoverage ? (
                  <>
                    <CheckCircle className="w-12 h-12 text-[#a4d65e] flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">✅ You are within our network coverage!</h3>
                      <p className="text-white mb-2">
                        Great news! Your location is within 10km of one of our base stations. You can proceed with your package selection.
                      </p>
                      {nearestStation && (
                        <p className="text-white/80 text-sm">
                          Nearest base station: <span className="font-semibold">{nearestStation.name}</span> ({nearestStation.distance} km away)
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-12 h-12 text-red-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">❌ You are currently outside our coverage area</h3>
                      <p className="text-white mb-2">
                        Unfortunately, your location is not within 10km of any of our base stations.
                      </p>
                      {nearestStation && (
                        <p className="text-white/80 text-sm">
                          Nearest base station: <span className="font-semibold">{nearestStation.name}</span> ({nearestStation.distance} km away)
                        </p>
                      )}
                      <p className="text-white/80 text-sm mt-2">
                        Please contact us to discuss expansion plans or alternative solutions.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* Map Section */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">Coverage Map</h3>
            <div className="bg-white/10 rounded-lg h-[300px] overflow-hidden relative w-full" style={{ pointerEvents: 'auto' }}>
              {mapLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#a4d65e] border-t-white mx-auto mb-2"></div>
                    <p className="text-white text-sm">Loading map...</p>
                  </div>
                </div>
              )}
              <div className="w-full h-full rounded-lg">
                  <MapContainer
                    center={[-13.9626, 33.7741]}
                    zoom={12}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%', touchAction: 'pan-y' }}
                    whenCreated={(map) => {
                      mapInstanceRef.current = map;
                      // Explicitly disable interactive handlers that can block page scroll
                      try {
                        if (map && map.scrollWheelZoom) map.scrollWheelZoom.disable();
                        if (map && map.doubleClickZoom) map.doubleClickZoom.disable();
                        if (map && map.boxZoom) map.boxZoom.disable();
                        if (map && map.keyboard) map.keyboard.disable && map.keyboard.disable();
                      } catch (e) {
                        // ignore
                      }
                      setMapLoading(false);
                    }}
                    eventHandlers={{
                      mouseover: () => {
                        try { if (mapInstanceRef.current && mapInstanceRef.current.scrollWheelZoom) mapInstanceRef.current.scrollWheelZoom.disable(); } catch(e){}
                      },
                      mouseout: () => {
                        try { if (mapInstanceRef.current && mapInstanceRef.current.scrollWheelZoom) mapInstanceRef.current.scrollWheelZoom.disable(); } catch(e){}
                      }
                    }}
                  >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    eventHandlers={{
                      tileerror: (e) => console.error('Tile load error', e),
                    }}
                  />

                  {baseStations.map((s, idx) => (
                    <Marker 
                      key={`m-${s.id}`} 
                      position={[s.lat, s.lng]}
                      icon={idx < 7 ? customIcons[idx] : L.divIcon({
                        html: `<div style="background: #6b7280; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 16px; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">•</div>`,
                        iconSize: [40, 40],
                      })}
                    >
                      <Popup>
                        <div className="text-sm">
                          <strong>{s.name}</strong>
                          <div className="text-xs text-gray-500">10 km coverage</div>
                        </div>
                      </Popup>
                      <Tooltip permanent direction="top" offset={[0, -12]}>
                        <div className="text-xs">
                          {s.lat.toFixed(6)}, {s.lng.toFixed(6)}
                        </div>
                      </Tooltip>
                    </Marker>
                  ))}

                  {baseStations.map((s) => (
                    <Circle
                      key={`c-${s.id}`}
                      center={[s.lat, s.lng]}
                      radius={coverageRadius * 1000}
                      pathOptions={{ color: '#7fb83d', fillColor: '#a4d65e', fillOpacity: 0.10, weight: 1, opacity: 0.9 }}
                    />
                  ))}

                  {clientPos && (
                    <>
                      <Marker position={clientPos} icon={userLocationIcon}>
                        <Popup>
                          <div className="text-sm">
                            <strong>Your Location</strong>
                            <div className="text-xs text-gray-500">{clientPos[0].toFixed(6)}, {clientPos[1].toFixed(6)}</div>
                            <div className="text-xs text-gray-500 font-semibold">{isInCoverage ? '✓ In Coverage' : '✗ Out of Coverage'}</div>
                          </div>
                        </Popup>
                        <Tooltip permanent direction="top" offset={[0, -12]}>
                          <div className="text-xs font-semibold text-white">Your Location</div>
                        </Tooltip>
                      </Marker>
                      <Circle
                        center={clientPos}
                        radius={50}
                        pathOptions={{
                          color: isInCoverage ? '#7fb83d' : '#ef4444',
                          fillColor: isInCoverage ? '#7fb83d' : '#ef4444',
                          fillOpacity: 0.06,
                          weight: 2,
                          opacity: 0.9,
                          dashArray: '4',
                        }}
                      />
                    </>
                  )}

                  <FitBounds stations={baseStations} />
                </MapContainer>
              </div>
              
              {/* Legend */}
              <div className="absolute top-4 right-4 bg-[#1e3a5f]/95 backdrop-blur-sm rounded-lg p-4 border border-white/20 shadow-lg z-10">
                <p className="text-white font-semibold mb-3 text-sm">Legend</p>
                <div className="space-y-2 text-xs text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#7fb83d] border-2 border-white"></div>
                    <span>Base Station</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#a4d65e] border-2 border-white"></div>
                    <span>Coverage Area (10km)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#a4d65e] border-2 border-white"></div>
                    <span>Your Location (In Coverage)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#ef4444] border-2 border-white"></div>
                    <span>Your Location (Out of Coverage)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-white/10 bg-white/5">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (isInCoverage) {
                onConfirm();
              } else {
                setError('Please ensure you are within coverage before proceeding.');
              }
            }}
            disabled={isInCoverage !== true}
            className="px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isInCoverage ? 'Proceed to Contact Form' : 'Check Coverage First'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
