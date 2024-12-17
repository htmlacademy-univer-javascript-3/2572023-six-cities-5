import { useEffect, useRef } from 'react';
import { useMap } from '../../../hooks/use-map';
import leaflet from 'leaflet';
import { City } from '../../../types/city';
import { Offer } from '../../../types/offer';

export type MapProps = {
  city: City;
  offers: Offer[];
  activeOfferId: string | null;
  className: string;
}

export function Map({ city, offers, activeOfferId, className }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: '/img/pin-active.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude
          }, {
            icon: offer.id === activeOfferId ? currentCustomIcon : defaultCustomIcon,
          }).addTo(map);

      });

    }
  }, [map, offers, city, activeOfferId, currentCustomIcon, defaultCustomIcon]);

  return (
    <div
      className={className}
      ref={mapRef}
    />
  );
}
