/**
 * Custom Hook for Coverage Checking
 * Single Responsibility: Manage coverage check logic
 * Dependency Inversion: Depends on abstractions (IApiService, CoverageService)
 */

import { useState, useCallback } from 'react';
import type { Coordinates, BaseStation, RelevantStations } from '../types/coverage';
import { ApiService, type IApiService } from '../services/apiService';
import { CoverageService } from '../services/coverageService';
import { DistanceService } from '../services/distanceService';
import { parseCoordinates, validateCoordinates } from '../utils/coordinateParser';

interface CoverageCheckState {
  isInCoverage: boolean | null;
  nearestStation: { name: string; distance: number } | null;
  clientPosition: Coordinates | null;
  relevantStations: RelevantStations;
  error: string;
  isLoading: boolean;
}

export function useCoverageCheck(apiService?: IApiService) {
  const service = apiService || new ApiService();
  
  const [state, setState] = useState<CoverageCheckState>({
    isInCoverage: null,
    nearestStation: null,
    clientPosition: null,
    relevantStations: { withinCoverage: [], nearest: null },
    error: '',
    isLoading: false,
  });

  const checkCoverage = useCallback(
    async (coordinates: Coordinates, baseStations: BaseStation[]) => {
      setState((prev) => ({ ...prev, error: '', isLoading: true }));

      try {
        // Validate coordinates
        const validCoords = validateCoordinates(coordinates);
        
        // Check coverage via API
        const result = await service.checkCoverage(validCoords);
        
        // Calculate relevant stations
        const relevantStations = CoverageService.calculateRelevantStations(
          validCoords,
          baseStations,
          result.inCoverage
        );

        // Calculate distances for display
        let nearestStationInfo: { name: string; distance: number } | null = null;
        if (result.nearest) {
          nearestStationInfo = {
            name: result.nearest.name,
            distance: result.nearest.distanceKm,
          };
        } else if (relevantStations.nearest) {
          const distance = DistanceService.calculateDistance(
            validCoords,
            relevantStations.nearest
          );
          nearestStationInfo = {
            name: relevantStations.nearest.name,
            distance,
          };
        }

        setState({
          isInCoverage: result.inCoverage,
          nearestStation: nearestStationInfo,
          clientPosition: validCoords,
          relevantStations,
          error: '',
          isLoading: false,
        });

        return { validCoords, result, relevantStations };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to evaluate coverage.';
        setState((prev) => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
          isInCoverage: null,
        }));
        throw error;
      }
    },
    [service]
  );

  const parseAndCheckCoverage = useCallback(
    async (coordString: string, baseStations: BaseStation[]) => {
      const parsed = parseCoordinates(coordString);
      
      if (!parsed) {
        const error = 'Invalid coordinate format. Supported formats:\n' +
          '• Decimal: "-13.9626, 33.7741" or "-13.9626 33.7741"\n' +
          '• DMS: "14°01\'12.3"S 33°48\'05.0"E" or "14° 01\' 12.3" S, 33° 48\' 05.0" E"';
        setState((prev) => ({ ...prev, error }));
        return null;
      }

      // Validate ranges
      if (isNaN(parsed.lat) || isNaN(parsed.lng)) {
        setState((prev) => ({ ...prev, error: 'Coordinates must be valid numbers.' }));
        return null;
      }

      if (parsed.lat < -90 || parsed.lat > 90 || parsed.lng < -180 || parsed.lng > 180) {
        setState((prev) => ({
          ...prev,
          error: 'Invalid coordinates. Latitude must be -90 to 90, longitude -180 to 180.',
        }));
        return null;
      }

      return checkCoverage(parsed, baseStations);
    },
    [checkCoverage]
  );

  const reset = useCallback(() => {
    setState({
      isInCoverage: null,
      nearestStation: null,
      clientPosition: null,
      relevantStations: { withinCoverage: [], nearest: null },
      error: '',
      isLoading: false,
    });
  }, []);

  return {
    ...state,
    checkCoverage,
    parseAndCheckCoverage,
    reset,
  };
}
