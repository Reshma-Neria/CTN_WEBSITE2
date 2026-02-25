/**
 * Coverage Map Markers Component
 * Single Responsibility: Render map markers
 */

import React from 'react';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import type { BaseStation, Coordinates, RelevantStations } from '../../types/coverage';
import { MapIconFactory } from '../../utils/mapIcons';
import { DistanceService } from '../../services/distanceService';

interface CoverageMapMarkersProps {
  baseStations: BaseStation[];
  clientPosition: Coordinates | null;
  relevantStations: RelevantStations;
  isInCoverage: boolean | null;
}

export function CoverageMapMarkers({
  baseStations,
  clientPosition,
  relevantStations,
  isInCoverage,
}: CoverageMapMarkersProps) {
  return (
    <>
      {/* Show all base stations initially */}
      {!clientPosition &&
        baseStations.map((station, idx) => (
          <Marker
            key={`station-${station.id}`}
            position={[station.lat, station.lng]}
            icon={
              idx < 7
                ? MapIconFactory.createNumberedIcon(idx + 1)
                : MapIconFactory.createDefaultIcon()
            }
          >
            <Popup>
              <div className="text-sm">
                <strong>{station.name}</strong>
                <div className="text-xs text-gray-500">10 km coverage</div>
              </div>
            </Popup>
          </Marker>
        ))}

      {/* Show stations within coverage */}
      {clientPosition &&
        relevantStations.withinCoverage.map((station, idx) => {
          const distance = DistanceService.calculateDistance(clientPosition, station);
          return (
            <Marker
              key={`coverage-${station.id}`}
              position={[station.lat, station.lng]}
              icon={MapIconFactory.createCoverageMarkerIcon(idx + 1)}
            >
              <Popup>
                <div className="text-sm">
                  <strong className="text-green-600">{station.name}</strong>
                  <div className="text-xs text-gray-500">✓ Within Coverage</div>
                  <div className="text-xs text-gray-500">{distance.toFixed(2)} km away</div>
                </div>
              </Popup>
            </Marker>
          );
        })}

      {/* Show nearest station if out of coverage */}
      {clientPosition && !isInCoverage && relevantStations.nearest && (
        <Marker
          position={[relevantStations.nearest.lat, relevantStations.nearest.lng]}
          icon={MapIconFactory.createNearestStationIcon()}
        >
          <Popup>
            <div className="text-sm">
              <strong className="text-orange-600">{relevantStations.nearest.name}</strong>
              <div className="text-xs text-gray-500">⚠ Nearest Station</div>
            </div>
          </Popup>
        </Marker>
      )}

      {/* Show client location */}
      {clientPosition && (
        <Marker
          position={[clientPosition.lat, clientPosition.lng]}
          icon={MapIconFactory.createUserLocationIcon()}
        >
          <Popup>
            <div className="text-sm">
              <strong>Your Location</strong>
              <div className="text-xs text-gray-500">
                {clientPosition.lat.toFixed(6)}, {clientPosition.lng.toFixed(6)}
              </div>
              <div className="text-xs text-gray-500 font-semibold">
                {isInCoverage ? '✓ In Coverage' : '✗ Out of Coverage'}
              </div>
            </div>
          </Popup>
          <Tooltip permanent direction="top" offset={[0, -12]}>
            <div className="text-xs font-semibold text-white">Your Location</div>
          </Tooltip>
        </Marker>
      )}
    </>
  );
}
