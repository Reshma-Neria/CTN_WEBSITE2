/**
 * Custom Hook for Base Stations Management
 * Single Responsibility: Fetch and manage base stations
 */

import { useCallback, useMemo, useState } from 'react';
import type { BaseStation } from '../types/coverage';
import { ApiService, type IApiService } from '../services/apiService';

export function useBaseStations(apiService?: IApiService) {
  const service = useMemo(() => apiService || new ApiService(), [apiService]);
  const [baseStations, setBaseStations] = useState<BaseStation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchBaseStations = useCallback(async (): Promise<BaseStation[]> => {
    setIsLoading(true);
    setError('');
    
    try {
      const stations = await service.fetchBaseStations();
      setBaseStations(stations);
      return stations;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch base stations.';
      setError(errorMessage);
      setBaseStations([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  return {
    baseStations,
    isLoading,
    error,
    fetchBaseStations,
  };
}
