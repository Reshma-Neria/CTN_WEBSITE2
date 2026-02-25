/**
 * Custom Hook for Base Stations Management
 * Single Responsibility: Fetch and manage base stations
 */

import { useState, useEffect } from 'react';
import type { BaseStation } from '../types/coverage';
import { ApiService, type IApiService } from '../services/apiService';

export function useBaseStations(apiService?: IApiService) {
  const service = apiService || new ApiService();
  const [baseStations, setBaseStations] = useState<BaseStation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchBaseStations = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const stations = await service.fetchBaseStations();
      setBaseStations(stations);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch base stations.';
      setError(errorMessage);
      setBaseStations([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    baseStations,
    isLoading,
    error,
    fetchBaseStations,
  };
}
