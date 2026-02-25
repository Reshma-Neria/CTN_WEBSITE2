/**
 * Type definitions for coverage-related functionality
 * Following Interface Segregation Principle (ISP)
 */

export interface BaseStation {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface CoverageResult {
  inCoverage: boolean;
  nearest?: {
    name: string;
    distanceKm: number;
  };
}

export interface RelevantStations {
  withinCoverage: BaseStation[];
  nearest: BaseStation | null;
}

export interface CombinedCoverage {
  center: [number, number];
  radius: number;
}

export interface CoverageCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  packageName: string;
}
