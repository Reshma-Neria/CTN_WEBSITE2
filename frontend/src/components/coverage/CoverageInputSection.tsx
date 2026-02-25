/**
 * Coverage Input Section Component
 * Single Responsibility: Handle coordinate input
 */

import React from 'react';
import { MapPin, Navigation, Search } from 'lucide-react';

interface CoverageInputSectionProps {
  clientCoords: string;
  onCoordsChange: (coords: string) => void;
  onGetLocation: () => void;
  onCheckCoverage: () => void;
  isLoading: boolean; // For geolocation loading
  isCheckingCoverage?: boolean; // For coverage check loading
  error: string;
}

export function CoverageInputSection({
  clientCoords,
  onCoordsChange,
  onGetLocation,
  onCheckCoverage,
  isLoading,
  isCheckingCoverage = false,
  error,
}: CoverageInputSectionProps) {
  return (
    <div className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/10">
      <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-[#a4d65e]" />
        Enter Your Location
      </h3>

      <div className="mb-4">
        <label className="block text-white text-sm mb-2">Your Coordinates</label>
        <input
          type="text"
          value={clientCoords}
          onChange={(e) => onCoordsChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isCheckingCoverage && clientCoords.trim()) {
              e.preventDefault();
              onCheckCoverage();
            }
          }}
          placeholder="e.g., -13.9626, 33.7741 or 14°01'12.3&quot;S 33°48'05.0&quot;E"
          className="w-full bg-white/10 text-white placeholder-white/40 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a4d65e] border border-white/10 text-sm md:text-base"
        />
        <p className="text-white/50 text-xs mt-2">
          Supports decimal (-13.9626, 33.7741) or DMS (14°01'12.3"S 33°48'05.0"E) format
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onGetLocation}
          disabled={isLoading}
          className="flex-1 bg-white/10 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
        >
          <Navigation className="w-4 h-4 md:w-5 md:h-5" />
          {isLoading ? 'Getting Location...' : 'Use My Location'}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Check Coverage button clicked');
            onCheckCoverage();
          }}
          disabled={isCheckingCoverage}
          className="flex-1 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm md:text-base"
        >
          <Search className="w-4 h-4 md:w-5 md:h-5" />
          {isCheckingCoverage ? 'Checking...' : 'Check Coverage'}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-xs md:text-sm whitespace-pre-line">
          {error}
        </div>
      )}
    </div>
  );
}
