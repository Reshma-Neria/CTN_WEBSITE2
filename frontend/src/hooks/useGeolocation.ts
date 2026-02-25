/**
 * Custom Hook for Geolocation
 * Single Responsibility: Handle browser geolocation
 */

import { useState, useCallback } from 'react';
import type { Coordinates } from '../types/coverage';

export function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const resetError = useCallback(() => {
    setError('');
  }, []);

  const getCurrentLocation = useCallback((): Promise<Coordinates> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const error = 'Geolocation is not supported by your browser.';
        setError(error);
        reject(new Error(error));
        return;
      }

      setIsLoading(true);
      setError('');

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLoading(false);
          setError(''); // Clear any previous errors
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          const errorMessage = 'Unable to retrieve your location. Please enter coordinates manually.';
          setIsLoading(false);
          setError(errorMessage);
          reject(new Error(errorMessage));
        }
      );
    });
  }, []);

  return {
    getCurrentLocation,
    isLoading,
    error,
    resetError,
  };
}
