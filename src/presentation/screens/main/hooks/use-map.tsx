import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { City } from '../../../../domain/models/city';
import leaflet from 'leaflet';

export function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City,
) {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current === null) {
      return;
    }

    if (!isRenderedRef.current) {

      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        zoom: city.location.zoom,
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
      map?.setView(
        {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        city.location.zoom
      );
    }
  }, [mapRef, city, map]);

  return map;
}
