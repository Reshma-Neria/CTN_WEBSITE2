/**
 * Map Icon Factory
 * Open/Closed Principle: Can extend with new icon types without modifying existing code
 * Single Responsibility: Create map marker icons
 */

import L from 'leaflet';

export class MapIconFactory {
  private static readonly COLORS = [
    '#ef4444', // red
    '#3b82f6', // blue
    '#8b5cf6', // purple
    '#f59e0b', // orange
    '#06b6d4', // cyan
    '#10b981', // green
    '#ec4899', // pink
  ];

  /**
   * Create a custom numbered marker icon
   */
  static createNumberedIcon(number: number, color?: string): L.DivIcon {
    const bgColor = color || this.COLORS[number - 1] || '#6b7280';
    return L.divIcon({
      html: `<div style="background: ${bgColor}; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-center; font-weight: bold; font-size: 20px; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">${number}</div>`,
      iconSize: [40, 40],
      className: 'custom-marker',
    });
  }

  /**
   * Create a user location marker icon
   */
  static createUserLocationIcon(): L.DivIcon {
    return L.divIcon({
      html: `<div style="background: #0066ff; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-center; font-weight: bold; font-size: 24px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,102,255,0.5);">📍</div>`,
      iconSize: [40, 40],
      className: 'user-marker',
    });
  }

  /**
   * Create a pulsing marker icon for stations within coverage
   */
  static createCoverageMarkerIcon(number: number): L.DivIcon {
    return L.divIcon({
      html: `<div style="background: #10b981; color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-center; font-weight: bold; font-size: 18px; border: 4px solid white; box-shadow: 0 4px 12px rgba(16,185,129,0.6); animation: pulse 2s infinite;">${number}</div><style>@keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.9; } }</style>`,
      iconSize: [50, 50],
      className: 'pulsing-marker',
    });
  }

  /**
   * Create a nearest station marker icon
   */
  static createNearestStationIcon(): L.DivIcon {
    return L.divIcon({
      html: `<div style="background: #f59e0b; color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-center; font-weight: bold; font-size: 18px; border: 4px solid white; box-shadow: 0 4px 12px rgba(245,158,11,0.6);">N</div>`,
      iconSize: [50, 50],
    });
  }

  /**
   * Create a default marker icon
   */
  static createDefaultIcon(): L.DivIcon {
    return L.divIcon({
      html: `<div style="background: #6b7280; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-center; font-weight: bold; font-size: 16px; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">•</div>`,
      iconSize: [40, 40],
    });
  }
}
