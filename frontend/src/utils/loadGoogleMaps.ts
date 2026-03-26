export function loadGoogleMaps(key?: string): Promise<void> {
  const k =
    key ||
    (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) ||
    (import.meta.env.VITE_GOOGLE_MAPS_KEY as string) ||
    '';
  
  if (!k || k.includes('YOUR_GOOGLE_MAPS_API_KEY')) {
    const error = 'Google Maps API key is missing or not configured. Please set VITE_GOOGLE_MAPS_API_KEY or VITE_GOOGLE_MAPS_KEY in .env.local';
    console.error(error);
    return Promise.reject(new Error(error));
  }

  if (typeof window === 'undefined') return Promise.reject(new Error('Window is undefined'));

  if ((window as any).google && (window as any).google.maps) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-google-maps]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', (e) => {
        console.error('Google Maps script load error:', e);
        reject(new Error('Failed to load Google Maps script'));
      });
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(k)}&libraries=geometry,drawing`;
    script.async = true;
    script.defer = true;
    script.setAttribute('data-google-maps', '1');
    script.onload = () => {
      console.log('Google Maps loaded successfully');
      resolve();
    };
    script.onerror = (e) => {
      console.error('Failed to load Google Maps script:', e);
      reject(new Error('Failed to load Google Maps script'));
    };
    document.head.appendChild(script);
  });
}
