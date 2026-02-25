/**
 * Leaflet Configuration
 * Single Responsibility: Configure Leaflet library
 */

import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

/**
 * Initialize Leaflet default icon paths for Vite bundling
 */
export function initializeLeafletIcons(): void {
  (L.Icon.Default as any).mergeOptions({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
  });
}
