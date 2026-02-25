/**
 * Coverage Map Circles Component
 * Single Responsibility: Render coverage circles
 */

import React from 'react';
import { Circle } from 'react-leaflet';
import type { BaseStation, Coordinates, RelevantStations, CombinedCoverage } from '../../types/coverage';

interface CoverageMapCirclesProps {
  baseStations: BaseStation[];
  clientPosition: Coordinates | null;
  relevantStations: RelevantStations;
  isInCoverage: boolean | null;
  combinedCoverage: CombinedCoverage | null;
}

export function CoverageMapCircles({
  baseStations,
  clientPosition,
  relevantStations,
  isInCoverage,
  combinedCoverage,
}: CoverageMapCirclesProps) {
  return (
    <>
      {/* Combined coverage boundary */}
      {combinedCoverage && (
        <Circle
          key={`combined-${clientPosition ? 'active' : 'inactive'}`}
          center={combinedCoverage.center}
          radius={combinedCoverage.radius * 1000}
          pathOptions={{
            color: clientPosition && isInCoverage ? '#10b981' : '#7fb83d',
            fillColor: clientPosition && isInCoverage ? '#10b981' : '#a4d65e',
            fillOpacity: clientPosition && isInCoverage ? 0.2 : 0.1,
            weight: clientPosition && isInCoverage ? 3 : 2,
            opacity: clientPosition && isInCoverage ? 0.9 : 0.7,
          }}
        />
      )}

      {/* Client location indicator circle */}
      {clientPosition && (
        <Circle
          center={[clientPosition.lat, clientPosition.lng]}
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
      )}
    </>
  );
}
