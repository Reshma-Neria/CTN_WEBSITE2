/**
 * Coverage Check Modal Component (Refactored)
 * Single Responsibility: Compose coverage check UI
 * Dependency Inversion: Uses hooks and services (abstractions)
 * Open/Closed: Can be extended with new features without modifying core logic
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import type { CoverageCheckModalProps } from '../types/coverage';
import { useCoverageCheck } from '../hooks/useCoverageCheck';
import { useBaseStations } from '../hooks/useBaseStations';
import { useGeolocation } from '../hooks/useGeolocation';
import { useMapControl } from '../hooks/useMapControl';
import { CoverageService } from '../services/coverageService';
import { GeocodingService } from '../services/geocodingService';
import { CoverageMap } from './coverage/CoverageMap';
import { CoverageInputSection } from './coverage/CoverageInputSection';
import { CoverageResultSection } from './coverage/CoverageResultSection';
import { CoverageMapLegend } from './coverage/CoverageMapLegend';

export function CoverageCheckModal({
  isOpen,
  onClose,
  onConfirm,
  packageName,
}: CoverageCheckModalProps) {
  const [clientCoords, setClientCoords] = useState<string>('');
  const [mapLoading, setMapLoading] = useState(true);

  const {
    baseStations,
    isLoading: stationsLoading,
    error: stationsError,
    fetchBaseStations,
  } = useBaseStations();

  const {
    isInCoverage,
    nearestStation,
    clientPosition,
    relevantStations,
    error: coverageError,
    isLoading: coverageLoading,
    checkCoverage,
    parseAndCheckCoverage,
    reset: resetCoverage,
  } = useCoverageCheck();

  const { getCurrentLocation, isLoading: geoLoading, error: geoError, resetError: resetGeoError } = useGeolocation();
  const { setMapInstance, centerOnLocation, invalidateSize } = useMapControl();

  // Fetch base stations when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchBaseStations();
    }
  }, [isOpen, fetchBaseStations]);

  // Center map on client location when it changes
  useEffect(() => {
    if (clientPosition) {
      centerOnLocation(clientPosition);
    }
  }, [clientPosition, centerOnLocation]);

  // Invalidate map size when base stations are loaded
  useEffect(() => {
    if (baseStations.length > 0) {
      invalidateSize();
    }
  }, [baseStations, invalidateSize]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setClientCoords('');
      resetCoverage();
      resetGeoError();
      setMapLoading(true);
    } else {
      // Clear errors when modal opens
      setClientCoords('');
      resetGeoError();
    }
  }, [isOpen, resetCoverage, resetGeoError]);

  const handleGetLocation = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Clear any previous errors
    resetGeoError();
    setClientCoords('');
    
    try {
      const location = await getCurrentLocation();
      const stationsToUse = baseStations.length > 0 ? baseStations : await fetchBaseStations();

      setClientCoords(`${location.lat}, ${location.lng}`);

      await checkCoverage(location, stationsToUse);
    } catch {
      // Hooks already surface user-facing errors.
    }
  };

  const handleCheckCoverage = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Clear geolocation errors when manually checking
    resetGeoError();

    const stationsToUse = baseStations.length > 0 ? baseStations : await fetchBaseStations();

    try {
      const result = await parseAndCheckCoverage(clientCoords, stationsToUse);

      if (result?.validCoords && !GeocodingService.isCoordinateInput(clientCoords)) {
        setClientCoords(`${result.validCoords.lat}, ${result.validCoords.lng}`);
      }
    } catch {
      // The hook already owns the error state shown to the user.
    }
  };

  const handleMapCreated = (map: any) => {
    setMapInstance(map);
    setMapLoading(false);
  };

  const handleConfirm = () => {
    if (isInCoverage) {
      onConfirm();
    }
  };

  if (!isOpen) return null;

  const combinedCoverage = CoverageService.calculateCombinedCoverage(baseStations);
  // Separate loading states - geolocation button should only be disabled when getting location
  const isGettingLocation = geoLoading;
  const isLoading = coverageLoading || stationsLoading;
  // Prioritize geolocation errors, then coverage errors, then station errors
  const error = geoError || coverageError || stationsError;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1e3a5f] rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col"
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
        <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth" style={{ overscrollBehavior: 'contain' }}>
          <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
            {/* Left Column - Input Section */}
            <div className="space-y-4 md:space-y-6">
              <CoverageInputSection
                clientCoords={clientCoords}
                onCoordsChange={setClientCoords}
                onGetLocation={handleGetLocation}
                onCheckCoverage={handleCheckCoverage}
                isLoading={isGettingLocation}
                isCheckingCoverage={coverageLoading}
                error={error}
              />

              <CoverageResultSection isInCoverage={isInCoverage} nearestStation={nearestStation} />
            </div>
            
            {/* Right Column - Map Section */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 relative">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Coverage Map</h3>
              <div
                className="bg-white/10 rounded-lg h-[400px] md:h-[500px] lg:h-[600px] xl:h-[650px] overflow-hidden relative w-full"
                style={{ pointerEvents: 'auto' }}
              >
              {mapLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#a4d65e] border-t-white mx-auto mb-2"></div>
                    <p className="text-white text-sm">Loading map...</p>
                  </div>
                </div>
              )}
              <div className="w-full h-full rounded-lg">
                  <CoverageMap
                    baseStations={baseStations}
                    clientPosition={clientPosition}
                    relevantStations={relevantStations}
                    isInCoverage={isInCoverage}
                    combinedCoverage={combinedCoverage}
                    onMapCreated={handleMapCreated}
                  />
                </div>

                <CoverageMapLegend clientPosition={clientPosition} isInCoverage={isInCoverage} />
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
            onClick={handleConfirm}
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
