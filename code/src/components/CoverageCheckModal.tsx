import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { X, MapPin, CheckCircle, XCircle, Navigation, Search } from 'lucide-react';

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

declare global {
  interface Window {
    google: any;
  }
}

export function CoverageCheckModal({ isOpen, onClose, onConfirm, packageName }: CoverageCheckModalProps) {
  const [clientLat, setClientLat] = useState<string>('');
  const [clientLng, setClientLng] = useState<string>('');
  const [isInCoverage, setIsInCoverage] = useState<boolean | null>(null);
  const [nearestStation, setNearestStation] = useState<{ name: string; distance: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const circlesRef = useRef<any[]>([]);
  const markersRef = useRef<any[]>([]);
  const clientMarkerRef = useRef<any>(null);
  
  // Base stations - will be populated from backend later
  // TODO: Fetch base stations from backend API
  // Example API call:
  // useEffect(() => {
  //   fetch('/api/base-stations')
  //     .then(res => res.json())
  //     .then(data => setBaseStations(data));
  // }, []);
  const [baseStations, setBaseStations] = useState<BaseStation[]>([]);
  
  // TODO: Fetch base stations from backend when modal opens
  useEffect(() => {
    if (isOpen) {
      // Replace this with actual API call
      // fetch('/api/base-stations')
      //   .then(res => res.json())
      //   .then(data => setBaseStations(data));
      
      // For now, using empty array - will be populated from backend
      setBaseStations([]);
    }
  }, [isOpen]);
  
  const coverageRadius = 7; // 7 km radius

  // Initialize map
  useEffect(() => {
    if (!isOpen || !mapRef.current || !window.google) return;

    // Default center (Lilongwe, Malawi)
    const defaultCenter = { lat: -13.9626, lng: 33.7741 };

    // Initialize map
    const map = new window.google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 12,
      mapTypeId: 'roadmap',
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
      ],
    });

    mapInstanceRef.current = map;

    // Draw base stations and coverage circles
    baseStations.forEach((station) => {
      // Coverage circle
      const circle = new window.google.maps.Circle({
        strokeColor: '#a4d65e',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#a4d65e',
        fillOpacity: 0.2,
        map: map,
        center: { lat: station.lat, lng: station.lng },
        radius: coverageRadius * 1000, // Convert km to meters
      });

      // Base station marker
      const marker = new window.google.maps.Marker({
        position: { lat: station.lat, lng: station.lng },
        map: map,
        title: station.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#7fb83d',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });

      // Info window for base station
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; text-align: center;">
            <strong style="font-size: 16px;">${station.name}</strong><br/>
            <span style="color: #a4d65e; font-size: 14px;">7km Coverage Radius</span>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      circlesRef.current.push(circle);
      markersRef.current.push(marker);
    });

    // Fit map to show all coverage areas if stations exist
    if (baseStations.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      baseStations.forEach((station) => {
        const circle = new window.google.maps.Circle({
          center: { lat: station.lat, lng: station.lng },
          radius: coverageRadius * 1000,
        });
        const circleBounds = circle.getBounds();
        if (circleBounds) {
          bounds.union(circleBounds);
        }
      });
      map.fitBounds(bounds);
    }

    return () => {
      // Cleanup
      circlesRef.current.forEach((circle) => circle.setMap(null));
      markersRef.current.forEach((marker) => marker.setMap(null));
      if (clientMarkerRef.current) {
        clientMarkerRef.current.setMap(null);
      }
    };
  }, [isOpen, baseStations, coverageRadius]);

  // Calculate distance using Haversine formula
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Check coverage
  const checkCoverage = (lat: number, lng: number) => {
    if (baseStations.length === 0) {
      setError('No base stations available. Please contact us for coverage information.');
      setIsInCoverage(null);
      return;
    }

    let minDistance = Infinity;
    let nearest: { name: string; distance: number } | null = null;
    let inCoverage = false;

    baseStations.forEach((station) => {
      const distance = calculateDistance(lat, lng, station.lat, station.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = { name: station.name, distance: Math.round(distance * 10) / 10 };
      }
      if (distance <= coverageRadius) {
        inCoverage = true;
      }
    });

    setIsInCoverage(inCoverage);
    setNearestStation(nearest);

    // Update map with client location
    if (mapInstanceRef.current) {
      // Remove previous client marker
      if (clientMarkerRef.current) {
        clientMarkerRef.current.setMap(null);
      }

      // Create client marker
      const markerColor = inCoverage ? '#a4d65e' : '#ef4444';
      clientMarkerRef.current = new window.google.maps.Marker({
        position: { lat, lng },
        map: mapInstanceRef.current,
        title: inCoverage ? 'Your Location - In Coverage' : 'Your Location - Out of Coverage',
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: markerColor,
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3,
        },
        zIndex: 1000,
      });

      // Highlight relevant coverage circle if in coverage
      if (inCoverage) {
        baseStations.forEach((station, index) => {
          const distance = calculateDistance(lat, lng, station.lat, station.lng);
          if (distance <= coverageRadius) {
            // Highlight this circle
            if (circlesRef.current[index]) {
              circlesRef.current[index].setOptions({
                fillOpacity: 0.4,
                strokeWeight: 5,
              });
            }
          }
        });
      }

      // Pan and zoom to client location
      mapInstanceRef.current.panTo({ lat, lng });
      mapInstanceRef.current.setZoom(14);

      // Info window for client location
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; text-align: center;">
            <strong style="font-size: 16px;">Your Location</strong><br/>
            <span style="color: ${inCoverage ? '#a4d65e' : '#ef4444'}; font-size: 14px; font-weight: bold;">
              ${inCoverage ? '✓ In Coverage' : '✗ Out of Coverage'}
            </span><br/>
            <span style="color: #666; font-size: 12px;">${lat.toFixed(6)}, ${lng.toFixed(6)}</span>
          </div>
        `,
      });

      infoWindow.open(mapInstanceRef.current, clientMarkerRef.current);
    }
  };

  // Handle geolocation
  const handleGetLocation = () => {
    setIsLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setClientLat(lat.toString());
        setClientLng(lng.toString());
        checkCoverage(lat, lng);
        setIsLoading(false);
      },
      (error) => {
        setError('Unable to retrieve your location. Please enter coordinates manually.');
        setIsLoading(false);
      }
    );
  };

  // Handle manual coordinate input
  const handleCheckCoverage = () => {
    setError('');
    
    if (!clientLat.trim() || !clientLng.trim()) {
      setError('Please enter both latitude and longitude.');
      return;
    }

    const lat = parseFloat(clientLat);
    const lng = parseFloat(clientLng);

    if (isNaN(lat) || isNaN(lng)) {
      setError('Please enter valid numeric coordinates.');
      return;
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      setError('Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180.');
      return;
    }

    checkCoverage(lat, lng);
  };

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setClientLat('');
      setClientLng('');
      setIsInCoverage(null);
      setNearestStation(null);
      setError('');
      if (clientMarkerRef.current) {
        clientMarkerRef.current.setMap(null);
        clientMarkerRef.current = null;
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
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
        <div className="flex-1 overflow-y-auto p-6">
          {/* Input Section */}
          <div className="mb-6 bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#a4d65e]" />
              Enter Your Location
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white text-sm mb-2">Latitude</label>
                <input
                  type="text"
                  value={clientLat}
                  onChange={(e) => setClientLat(e.target.value)}
                  placeholder="e.g., -13.9626"
                  className="w-full bg-white/10 text-white placeholder-white/40 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a4d65e] border border-white/10"
                />
              </div>
              <div>
                <label className="block text-white text-sm mb-2">Longitude</label>
                <input
                  type="text"
                  value={clientLng}
                  onChange={(e) => setClientLng(e.target.value)}
                  placeholder="e.g., 33.7741"
                  className="w-full bg-white/10 text-white placeholder-white/40 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a4d65e] border border-white/10"
                />
              </div>
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
                        Great news! Your location is within 7km of one of our base stations. You can proceed with your package selection.
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
                        Unfortunately, your location is not within 7km of any of our base stations.
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
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Coverage Map</h3>
            <div className="bg-white/10 rounded-lg h-[400px] overflow-hidden relative">
              <div ref={mapRef} className="w-full h-full rounded-lg" />
              
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
                    <span>Coverage Area (7km)</span>
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
