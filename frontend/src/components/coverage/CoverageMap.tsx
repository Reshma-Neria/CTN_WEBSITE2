/**
 * Coverage Map Component
 * Single Responsibility: Render the coverage map
 */

import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import type { BaseStation, Coordinates, RelevantStations, CombinedCoverage } from '../../types/coverage';
import { CoverageMapMarkers } from './CoverageMapMarkers';
import { CoverageMapCircles } from './CoverageMapCircles';
import { FitBounds } from './FitBounds';
import { initializeLeafletIcons } from '../../utils/leafletConfig';

// Initialize Leaflet icons once
initializeLeafletIcons();

interface CoverageMapProps {
  baseStations: BaseStation[];
  clientPosition: Coordinates | null;
  relevantStations: RelevantStations;
  isInCoverage: boolean | null;
  combinedCoverage: CombinedCoverage | null;
  onMapCreated: (map: any) => void;
}

const DEFAULT_CENTER: [number, number] = [-13.9626, 33.7741]; // Lilongwe, Malawi
const DEFAULT_ZOOM = 11;

export function CoverageMap({
  baseStations,
  clientPosition,
  relevantStations,
  isInCoverage,
  combinedCoverage,
  onMapCreated,
}: CoverageMapProps) {
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%', minHeight: 200, touchAction: 'pan-y' }}
      whenCreated={onMapCreated}
      eventHandlers={{
        mouseover: () => {
          // Keep scroll wheel disabled
        },
        mouseout: () => {
          // Keep scroll wheel disabled
        },
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        eventHandlers={{
          tileerror: (e) => console.error('Tile load error', e),
        }}
      />

      <CoverageMapMarkers
        baseStations={baseStations}
        clientPosition={clientPosition}
        relevantStations={relevantStations}
        isInCoverage={isInCoverage}
      />

      <CoverageMapCircles
        baseStations={baseStations}
        clientPosition={clientPosition}
        relevantStations={relevantStations}
        isInCoverage={isInCoverage}
        combinedCoverage={combinedCoverage}
      />

      <FitBounds
        baseStations={baseStations}
        clientPosition={clientPosition}
        relevantStations={relevantStations}
      />
    </MapContainer>
  );
}
