/**
 * Coverage Map Legend Component
 * Single Responsibility: Display map legend
 */

import React from 'react';
import type { Coordinates } from '../../types/coverage';

interface CoverageMapLegendProps {
  clientPosition: Coordinates | null;
  isInCoverage: boolean | null;
}

export function CoverageMapLegend({ clientPosition, isInCoverage }: CoverageMapLegendProps) {
  return (
    <div className="absolute top-4 right-4 bg-[#1e3a5f]/95 backdrop-blur-sm rounded-lg p-4 border border-white/20 shadow-lg z-10">
      <p className="text-white font-semibold mb-3 text-sm">Legend</p>
      <div className="space-y-2 text-xs text-white">
        {!clientPosition && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#6b7280] border-2 border-white"></div>
              <span>Base Station</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#a4d65e] opacity-50"></div>
              <span>Coverage Area (10km)</span>
            </div>
          </>
        )}
        {clientPosition && isInCoverage && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#10b981] border-2 border-white"></div>
              <span>Available Base Station</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#10b981] opacity-20"></div>
              <span>Coverage Area (10km)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#0066ff] border-2 border-white">📍</div>
              <span>Your Location</span>
            </div>
          </>
        )}
        {clientPosition && !isInCoverage && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#f59e0b] border-2 border-white">N</div>
              <span>Nearest Station</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#f59e0b] opacity-15 border-dashed"></div>
              <span>Coverage Area (10km)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#ef4444] border-2 border-white">📍</div>
              <span>Your Location</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
