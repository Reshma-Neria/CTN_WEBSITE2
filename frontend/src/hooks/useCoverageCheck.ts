/**
 * Custom Hook for Coverage Checking
 * Single Responsibility: Manage coverage check logic
 * Dependency Inversion: Depends on abstractions (IApiService, CoverageService)
 */

import { useCallback, useMemo, useState } from 'react';
import type { Coordinates, BaseStation, RelevantStations } from '../types/coverage';
import { ApiService, type IApiService } from '../services/apiService';
import { CoverageService } from '../services/coverageService';
import { DistanceService } from '../services/distanceService';
import { GeocodingService } from '../services/geocodingService';
import { parseCoordinates, validateCoordinates } from '../utils/coordinateParser';

interface CoverageCheckState {
  isInCoverage: boolean | null;
  nearestStation: { name: string; distance: number } | null;
  clientPosition: Coordinates | null;
  relevantStations: RelevantStations;
  error: string;
  isLoading: boolean;
  geocodedLocationName: string | null;
}

export function useCoverageCheck(apiService?: IApiService) {
  const service = useMemo(() => apiService || new ApiService(), [apiService]);

  const [state, setState] = useState<CoverageCheckState>({
    isInCoverage: null,
    nearestStation: null,
    clientPosition: null,
    relevantStations: { withinCoverage: [], nearest: null },
    error: '',
    isLoading: false,
    geocodedLocationName: null,
  });

  const checkCoverage = useCallback(
    async (coordinates: Coordinates, baseStations: BaseStation[]) => {
      setState((prev) => ({ ...prev, error: '', isLoading: true }));

      try {
        const validCoords = validateCoordinates(coordinates);
        const result = await service.checkCoverage(validCoords);

        const relevantStations = CoverageService.calculateRelevantStations(
          validCoords,
          baseStations,
          result.inCoverage
        );

        let nearestStationInfo: { name: string; distance: number } | null = null;
        if (result.nearest) {
          nearestStationInfo = {
            name: result.nearest.name,
            distance: result.nearest.distanceKm,
          };
        } else if (relevantStations.nearest) {
          const distance = DistanceService.calculateDistance(validCoords, relevantStations.nearest);
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
          geocodedLocationName: null,
        });

        return { validCoords, result, relevantStations };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to evaluate coverage.';
        setState((prev) => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
          isInCoverage: null,
          geocodedLocationName: null,
        }));
        throw error;
      }
    },
    [service]
  );

  const parseAndCheckCoverage = useCallback(
    async (coordString: string, baseStations: BaseStation[]) => {
      setState((prev) => ({ ...prev, error: '', isLoading: true }));

      let coordinates: Coordinates;

      try {
        const trimmedInput = coordString.trim();
        if (!trimmedInput) {
          setState((prev) => ({
            ...prev,
            error: 'Enter a location, landmark, address, or coordinates before checking coverage.',
            isLoading: false,
            geocodedLocationName: null,
          }));
          return null;
        }

        if (GeocodingService.isCoordinateInput(trimmedInput)) {
          const parsed = parseCoordinates(trimmedInput);

          if (!parsed) {
            const error = 'Invalid coordinate format. Supported formats:\n' +
              '- Decimal: "-13.9626, 33.7741" or "-13.9626 33.7741"\n' +
              '- DMS: "14 01\'12.3\\"S 33 48\'05.0\\"E"';
            setState((prev) => ({ ...prev, error, isLoading: false }));
            return null;
          }

          if (isNaN(parsed.lat) || isNaN(parsed.lng)) {
            setState((prev) => ({ ...prev, error: 'Coordinates must be valid numbers.', isLoading: false }));
            return null;
          }

          if (parsed.lat < -90 || parsed.lat > 90 || parsed.lng < -180 || parsed.lng > 180) {
            setState((prev) => ({
              ...prev,
              error: 'Invalid coordinates. Latitude must be -90 to 90, longitude -180 to 180.',
              isLoading: false,
            }));
            return null;
          }

          coordinates = parsed;
        } else {
          try {
            const geocodingResult = await GeocodingService.geocode(trimmedInput, 'MW');
            coordinates = geocodingResult.coordinates;

            setState((prev) => ({ ...prev, geocodedLocationName: geocodingResult.displayName }));
          } catch (geocodeError) {
            const errorMessage = geocodeError instanceof Error
              ? geocodeError.message
              : `Location "${trimmedInput}" not found. This location may not exist on the map.\n\nPlease try:\n` +
                '- A more specific location name (e.g., "Lilongwe Area 47 Sector 1, Malawi")\n' +
                '- Include city or area name (e.g., "Blantyre, Malawi")\n' +
                '- Or use coordinates instead (e.g., "-13.9626, 33.7741")';
            setState((prev) => ({ ...prev, error: errorMessage, isLoading: false, geocodedLocationName: null }));
            return null;
          }
        }

        return checkCoverage(coordinates, baseStations);
      } catch (error) {
        const errorMessage = error instanceof Error
          ? error.message
          : 'Failed to process location. Please try again.';
        setState((prev) => ({ ...prev, error: errorMessage, isLoading: false }));
        return null;
      }
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
      geocodedLocationName: null,
    });
  }, []);

  return {
    ...state,
    checkCoverage,
    parseAndCheckCoverage,
    reset,
  };
}
