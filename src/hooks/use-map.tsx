import { useEffect, useState, useRef, MutableRefObject } from 'react';
import leaflet from 'leaflet';
import { City } from '../types/city';

export function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City,
) {
  const { latitude, longitude, zoom } = city.location;
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current === null) {
      return;
    }

    if (!isRenderedRef.current) {

      const instance = leaflet.map(mapRef.current, {
        center: {lat: latitude, lng: longitude},
        zoom: zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    } else {
      map?.setView({lat: latitude, lng: longitude}, zoom);
    }
  }, [mapRef, city, map, latitude, longitude, zoom]);

  return map;
}
