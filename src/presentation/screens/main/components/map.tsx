import {memo, useEffect, useMemo, useRef} from 'react';
import { useMap } from '../hooks/use-map';
import { Offer } from '../../../../domain/models/offer';
import { City } from '../../../../domain/models/city';
import leaflet from 'leaflet';

export type MapProps = {
  city: City;
  offers: Offer[];
  activeOfferId: string | null;
  className: string;
}

function Map({ city, offers, activeOfferId, className }: MapProps) {
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

  const markers = useMemo(() => offers.map((offer) => leaflet.marker({
    lat: offer.location.latitude,
    lng: offer.location.longitude
  }, {
    icon: offer.id === activeOfferId ? currentCustomIcon : defaultCustomIcon,
  })), [offers, activeOfferId, currentCustomIcon, defaultCustomIcon]);

  useEffect(() => {
    if (map) {
      markers.forEach((marker) => marker.addTo(map));
    }
  }, [map, markers]);

  return (
    <div
      className={className}
      ref={mapRef}
    />
  );
}

const MemoizedMap = memo(Map);
export default MemoizedMap;
