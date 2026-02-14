import { motion } from 'motion/react';
import { MapPin, CheckCircle, XCircle, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface Tower {
  id: number;
  lat: number;
  lng: number;
  name: string;
}

declare global {
  interface Window {
    google: any;
  }
}

export function Coverage() {
  const [searchLocation, setSearchLocation] = useState('');
  const [isInCoverage, setIsInCoverage] = useState<boolean | null>(null);
  const [searchedCoords, setSearchedCoords] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const circlesRef = useRef<any[]>([]);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);
  const boundaryPolygonRef = useRef<any>(null);

  // Tower coordinates (converted from DMS to decimal degrees)
  const towers: Tower[] = [
    { id: 1, lat: -13.980917, lng: 33.761472, name: 'Tower 1' },
    { id: 2, lat: -13.996306, lng: 33.754611, name: 'Tower 2' },
    { id: 3, lat: -13.957806, lng: 33.758861, name: 'Tower 3' },
    { id: 4, lat: -13.934500, lng: 33.750111, name: 'Tower 4' },
    { id: 5, lat: -13.956528, lng: 33.703778, name: 'Tower 5' },
    { id: 6, lat: -13.892167, lng: 33.807306, name: 'Tower 6' },
    { id: 7, lat: -13.945833, lng: 33.790250, name: 'Tower 7' },
  ];

  // Coverage radius in kilometers
  const coverageRadius = 10;

  // Initialize Google Map
  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    // Calculate center point of all towers
    const centerLat = towers.reduce((sum, t) => sum + t.lat, 0) / towers.length;
    const centerLng = towers.reduce((sum, t) => sum + t.lng, 0) / towers.length;

    // Initialize map
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: centerLat, lng: centerLng },
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

    // Create coverage circles for each tower with prominent underlined boundaries
    towers.forEach((tower) => {
      // Outer boundary circle (thick, dark border for visibility)
      const outerCircle = new window.google.maps.Circle({
        strokeColor: '#1e3a5f',
        strokeOpacity: 1,
        strokeWeight: 6, // Thick outer boundary
        fillColor: 'transparent',
        fillOpacity: 0,
        map: map,
        center: { lat: tower.lat, lng: tower.lng },
        radius: coverageRadius * 1000, // Convert km to meters
        zIndex: 1,
      });

      // Main coverage circle with visible boundary
      const circle = new window.google.maps.Circle({
        strokeColor: '#a4d65e',
        strokeOpacity: 1,
        strokeWeight: 5, // Thick, prominent boundary
        fillColor: '#a4d65e',
        fillOpacity: 0.2,
        map: map,
        center: { lat: tower.lat, lng: tower.lng },
        radius: coverageRadius * 1000, // Convert km to meters
        zIndex: 2,
      });

      // Inner highlight circle for extra boundary visibility
      const innerCircle = new window.google.maps.Circle({
        strokeColor: '#7fb83d',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: 'transparent',
        fillOpacity: 0,
        map: map,
        center: { lat: tower.lat, lng: tower.lng },
        radius: (coverageRadius * 1000) - 50, // Slightly smaller for layered effect
        zIndex: 3,
      });

      // Create marker for tower
      const marker = new window.google.maps.Marker({
        position: { lat: tower.lat, lng: tower.lng },
        map: map,
        title: `${tower.name} - 10km Coverage`,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#7fb83d',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });

      // Info window for tower
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; text-align: center;">
            <strong style="font-size: 16px;">${tower.name}</strong><br/>
            <span style="color: #a4d65e; font-size: 14px;">10km Coverage Radius</span><br/>
            <span style="color: #666; font-size: 12px;">${tower.lat.toFixed(6)}, ${tower.lng.toFixed(6)}</span>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      circlesRef.current.push(outerCircle);
      circlesRef.current.push(circle);
      circlesRef.current.push(innerCircle);
      markersRef.current.push(marker);
    });

    // Create combined boundary outline - draw thick boundary lines around each circle
    // This creates a visible underlined boundary for each coverage area
    towers.forEach((tower) => {
      // Create additional boundary circles with different styles for layered effect
      // This creates an "underlined" appearance with multiple stroke layers
      
      // Outermost dark boundary (underline effect)
      const underlineCircle = new window.google.maps.Circle({
        strokeColor: '#1e3a5f',
        strokeOpacity: 1,
        strokeWeight: 8, // Very thick for underline effect
        fillColor: 'transparent',
        fillOpacity: 0,
        map: map,
        center: { lat: tower.lat, lng: tower.lng },
        radius: coverageRadius * 1000,
        zIndex: 0,
      });

      circlesRef.current.push(underlineCircle);
    });

    // Fit map to show all coverage areas
    const bounds = new window.google.maps.LatLngBounds();
    towers.forEach((tower) => {
      // Add points around the circle to ensure full coverage is visible
      const circle = new window.google.maps.Circle({
        center: { lat: tower.lat, lng: tower.lng },
        radius: coverageRadius * 1000,
      });
      const circleBounds = circle.getBounds();
      if (circleBounds) {
        bounds.union(circleBounds);
      }
    });
    map.fitBounds(bounds);

    return () => {
      // Cleanup
      circlesRef.current.forEach((circle) => circle.setMap(null));
      markersRef.current.forEach((marker) => marker.setMap(null));
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
      }
      if (boundaryPolygonRef.current) {
        boundaryPolygonRef.current.setMap(null);
      }
    };
  }, []);

  // Update map when user searches
  useEffect(() => {
    if (!mapInstanceRef.current || !searchedCoords || !window.google) return;

    // Remove previous user marker
    if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null);
    }

    // Create new marker for user location
    const markerColor = isInCoverage ? '#a4d65e' : '#ef4444';
    const markerIcon = {
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 12,
      fillColor: markerColor,
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: 3,
    };

    userMarkerRef.current = new window.google.maps.Marker({
      position: { lat: searchedCoords.lat, lng: searchedCoords.lng },
      map: mapInstanceRef.current,
      title: isInCoverage ? 'Your Location - In Coverage' : 'Your Location - Out of Coverage',
      icon: markerIcon,
      zIndex: 1000,
    });

    // Create info window for user location
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding: 8px; text-align: center;">
          <strong style="font-size: 16px;">Your Location</strong><br/>
          <span style="color: ${isInCoverage ? '#a4d65e' : '#ef4444'}; font-size: 14px; font-weight: bold;">
            ${isInCoverage ? '✓ In Coverage' : '✗ Out of Coverage'}
          </span><br/>
          <span style="color: #666; font-size: 12px;">${searchedCoords.lat.toFixed(6)}, ${searchedCoords.lng.toFixed(6)}</span>
        </div>
      `,
    });

    infoWindow.open(mapInstanceRef.current, userMarkerRef.current);

    // Pan to user location
    mapInstanceRef.current.panTo({ lat: searchedCoords.lat, lng: searchedCoords.lng });
  }, [searchedCoords, isInCoverage]);

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Check if coordinates are within coverage
  const checkCoverage = (lat: number, lng: number): boolean => {
    for (const tower of towers) {
      const distance = calculateDistance(lat, lng, tower.lat, tower.lng);
      if (distance <= coverageRadius) {
        return true;
      }
    }
    return false;
  };

  // Handle location search
  const handleSearch = () => {
    if (!searchLocation.trim()) {
      setIsInCoverage(null);
      setSearchedCoords(null);
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
        userMarkerRef.current = null;
      }
      return;
    }

    // Try to parse coordinates if user enters them directly
    const coordMatch = searchLocation.match(/(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)/);
    if (coordMatch) {
      const lat = parseFloat(coordMatch[1]);
      const lng = parseFloat(coordMatch[2]);
      if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        const inCoverage = checkCoverage(lat, lng);
        setIsInCoverage(inCoverage);
        setSearchedCoords({ lat, lng });
        return;
      }
    }

    // If parsing fails, show error
    alert('Please enter coordinates in decimal format: latitude, longitude (e.g., -13.967194, 33.749222)\n\nYou can find your coordinates using Google Maps by right-clicking on your location.');
    setIsInCoverage(null);
    setSearchedCoords(null);
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Check <span className="text-[#a4d65e]">Coverage</span>
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto mb-8">
            Before signing up, check if your location is within our coverage area. 
            Our towers cover a 10km radius each, ensuring reliable internet access.
          </p>
        </motion.div>

        {/* Coverage Checker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Check Your Location</h2>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Enter coordinates (e.g., -13.967194, 33.749222)"
                className="w-full bg-white/10 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a4d65e] border border-white/10"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center justify-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Check Coverage</span>
            </button>
          </div>

          {/* Coverage Result */}
          {isInCoverage !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-6 rounded-xl ${
                isInCoverage
                  ? 'bg-[#a4d65e]/20 border border-[#a4d65e]/50'
                  : 'bg-red-500/20 border border-red-500/50'
              }`}
            >
              <div className="flex items-center space-x-4">
                {isInCoverage ? (
                  <>
                    <CheckCircle className="w-12 h-12 text-[#a4d65e]" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">You're in Coverage!</h3>
                      <p className="text-white mb-2">
                        Great news! Your location is within our coverage area. You can proceed with signing up.
                      </p>
                      {searchedCoords && (
                        <p className="text-white text-base md:text-lg">
                          Location: {searchedCoords.lat.toFixed(6)}, {searchedCoords.lng.toFixed(6)}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-12 h-12 text-red-400" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">Out of Coverage Area</h3>
                      <p className="text-white mb-2">
                        Unfortunately, your location is not currently within our coverage area. 
                        Contact us to discuss expansion plans or alternative solutions.
                      </p>
                      {searchedCoords && (
                        <p className="text-white text-base md:text-lg">
                          Location: {searchedCoords.lat.toFixed(6)}, {searchedCoords.lng.toFixed(6)}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}

          <div className="mt-6 p-4 bg-white/5 rounded-xl">
            <p className="text-white text-base md:text-lg">
              <strong className="text-white">Tip:</strong> Enter coordinates in decimal format (latitude, longitude). 
              Your location will appear on the map below with a green marker if in coverage, or red if outside.
            </p>
          </div>
        </motion.div>

        {/* Coverage Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Coverage Map</h2>
          <p className="text-white text-center mb-6">
            Our 7 towers provide coverage across Lilongwe. Each tower covers a 10km radius with clearly underlined boundaries. 
            Green circles show coverage areas - overlapping areas are combined for seamless coverage. 
            The dark underlined boundaries mark the exact 10km coverage radius for each tower.
          </p>
          
          <div className="bg-white/10 rounded-xl h-[600px] overflow-hidden relative">
            <div ref={mapRef} className="w-full h-full rounded-xl" />
            
            {/* Coverage Info Overlay */}
            <div className="absolute top-4 right-4 bg-[#1e3a5f]/95 backdrop-blur-sm rounded-lg p-4 border border-white/20 shadow-lg z-10">
              <p className="text-white text-base md:text-lg font-semibold mb-3">Coverage Information</p>
              <div className="space-y-2 text-sm md:text-base text-white">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-[#a4d65e] border-2 border-white"></div>
                  <span>10km radius per tower</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-[#7fb83d] border-2 border-white"></div>
                  <span>7 active towers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-[#a4d65e] border-2 border-white"></div>
                  <span>Your location (if checked)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-[#ef4444] border-2 border-white"></div>
                  <span>Out of coverage</span>
                </div>
                <div className="pt-2 border-t border-white/20 mt-2">
                  <p className="text-white text-sm md:text-base">
                    Green circles show combined coverage areas with underlined dark boundaries marking the exact 10km radius. 
                    Click tower markers for details.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tower Information */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {towers.map((tower, index) => (
              <div
                key={tower.id}
                className="bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{tower.name}</h3>
                    <p className="text-white text-base md:text-lg">
                      {Math.abs(tower.lat).toFixed(4)}°{tower.lat < 0 ? 'S' : 'N'}, {Math.abs(tower.lng).toFixed(4)}°{tower.lng < 0 ? 'W' : 'E'}
                    </p>
                    <p className="text-[#a4d65e] text-sm md:text-base mt-1">10km Coverage</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
        >
          <h2 className="text-2xl font-bold text-white mb-6">How to Check Coverage</h2>
          <div className="space-y-4 text-white">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Enter Your Location</h3>
                <p>Enter your coordinates in decimal format (latitude, longitude). You can find your coordinates using Google Maps by right-clicking on your location.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Check Coverage</h3>
                <p>Click "Check Coverage" to see if your location is within 10km of any of our towers. Your location will appear on the map with a green marker if in coverage, or red if outside.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">View Coverage Map</h3>
                <p>The map shows all our tower locations with 10km coverage circles. Overlapping coverage areas are combined for seamless service. Click on tower markers to see details.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
