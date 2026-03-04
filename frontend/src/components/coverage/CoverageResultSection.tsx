/**
 * Coverage Result Section Component
 * Single Responsibility: Display coverage check results
 */

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, XCircle } from 'lucide-react';

interface CoverageResultSectionProps {
  isInCoverage: boolean | null;
  nearestStation: { name: string; distance: number } | null;
}

export function CoverageResultSection({
  isInCoverage,
  nearestStation,
}: CoverageResultSectionProps) {
  if (isInCoverage === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 md:p-6 rounded-xl border ${
        isInCoverage
          ? 'bg-[#a4d65e]/20 border-[#a4d65e]/50'
          : 'bg-red-500/20 border-red-500/50'
      }`}
    >
      <div className="flex items-start gap-3 md:gap-4">
        {isInCoverage ? (
          <>
            <CheckCircle className="w-8 h-8 md:w-12 md:h-12 text-[#a4d65e] flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg md:text-2xl font-bold text-white mb-2">
                ✅ You are within our network coverage!
              </h3>
              <p className="text-white mb-2 text-sm md:text-base">
                Great news! Your location is within 10km of one of our base stations. You can
                proceed with your package selection.
              </p>
              {nearestStation && (
                <p className="text-white/80 text-xs md:text-sm">
                  Nearest base station: <span className="font-semibold">{nearestStation.name}</span>{' '}
                  ({nearestStation.distance.toFixed(2)} km away)
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <XCircle className="w-10 h-10 md:w-14 md:h-14 text-red-400 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-xl md:text-3xl font-extrabold text-white mb-3 leading-snug">
                Sorry you're outside our coverage.
              </h3>
              <p className="text-white text-base md:text-xl font-semibold">
                Please contact our customer care for any information.
              </p>
              {nearestStation && (
                <p className="text-white/80 text-xs md:text-sm mt-3">
                  Nearest base station:{' '}
                  <span className="font-semibold">{nearestStation.name}</span>{' '}
                  ({nearestStation.distance.toFixed(2)} km away)
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
