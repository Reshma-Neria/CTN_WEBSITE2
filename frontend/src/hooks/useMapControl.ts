/**
 * Custom Hook for Map Control
 * Single Responsibility: Manage map instance and view control
 */

import { useRef, useCallback, useState } from 'react';
import type { Map } from 'leaflet';
import type { Coordinates } from '../types/coverage';

const DEFAULT_ZOOM = 13;
const DEFAULT_CENTER: Coordinates = { lat: -13.9626, lng: 33.7741 }; // Lilongwe, Malawi

export function useMapControl() {
  const mapInstanceRef = useRef<Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const setMapInstance = useCallback((map: Map | null) => {
    mapInstanceRef.current = map;
    if (map) {
      setIsMapReady(true);
      // Disable unwanted interactions
      try {
        if (map.scrollWheelZoom) map.scrollWheelZoom.disable();
        if (map.doubleClickZoom) map.doubleClickZoom.disable();
        if (map.boxZoom) map.boxZoom.disable();
        if (map.keyboard) map.keyboard.disable?.();
      } catch (e) {
        // Ignore errors
      }
      
      // Invalidate size after modal animation
      setTimeout(() => {
        try {
          map.invalidateSize();
        } catch (e) {
          // Ignore
        }
      }, 200);
      
      setTimeout(() => {
        try {
          map.invalidateSize();
        } catch (e) {
          // Ignore
        }
      }, 600);
    }
  }, []);

  const centerOnLocation = useCallback(
    (coordinates: Coordinates, zoom: number = DEFAULT_ZOOM) => {
      if (!mapInstanceRef.current) return;

      const validLat = Math.max(-90, Math.min(90, coordinates.lat));
      const validLng = Math.max(-180, Math.min(180, coordinates.lng));

      try {
        mapInstanceRef.current.invalidateSize();
        mapInstanceRef.current.whenReady(() => {
          try {
            mapInstanceRef.current?.setView([validLat, validLng], zoom, {
              animate: true,
              duration: 0.5,
            });
          } catch (e) {
            try {
              mapInstanceRef.current?.flyTo([validLat, validLng], zoom, {
                duration: 0.5,
              });
            } catch (_err) {
              // Ignore
            }
          }
        });
      } catch (e) {
        setTimeout(() => {
          if (mapInstanceRef.current) {
            try {
              mapInstanceRef.current.setView([validLat, validLng], zoom, {
                animate: true,
                duration: 0.5,
              });
            } catch (err) {
              try {
                mapInstanceRef.current.flyTo([validLat, validLng], zoom, {
                  duration: 0.5,
                });
              } catch (_err) {
                // Ignore
              }
            }
          }
        }, 300);
      }
    },
    []
  );

  const invalidateSize = useCallback(() => {
    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.invalidateSize();
      } catch (e) {
        // Ignore
      }
    }
  }, []);

  return {
    mapInstance: mapInstanceRef.current,
    setMapInstance,
    centerOnLocation,
    invalidateSize,
    isMapReady,
  };
}
