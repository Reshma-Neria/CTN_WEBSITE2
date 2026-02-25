/**
 * FitBounds Component
 * Single Responsibility: Fit map bounds to show stations
 */

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import type { BaseStation, Coordinates, RelevantStations } from '../../types/coverage';

interface FitBoundsProps {
  baseStations: BaseStation[];
  clientPosition: Coordinates | null;
  relevantStations: RelevantStations;
}

export function FitBounds({ baseStations, clientPosition, relevantStations }: FitBoundsProps) {
  const map = useMap();
  
  useEffect(() => {
    if (!map) return;

    let stationsToFit: Array<{ lat: number; lng: number }> = [];

    if (clientPosition) {
      if (relevantStations.withinCoverage.length > 0) {
        stationsToFit = [
          ...relevantStations.withinCoverage,
          { lat: clientPosition.lat, lng: clientPosition.lng },
        ];
      } else if (relevantStations.nearest) {
        stationsToFit = [
          relevantStations.nearest,
          { lat: clientPosition.lat, lng: clientPosition.lng },
        ];
      }
    } else {
      stationsToFit = baseStations;
    }

    if (stationsToFit.length === 0) return;

    const latlngs = stationsToFit.map((s) => [s.lat, s.lng] as [number, number]);
    const bounds = L.latLngBounds(latlngs);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, baseStations, clientPosition, relevantStations]);
  
  return null;
}
