import {useRef, useEffect, useMemo, memo} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '@hooks/use-map';
import { City } from '@typings/city';
import { Offer, Offers } from '@typings/offer';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '@const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
    city: City;
    offers: Offers;
    selectedOffer: Offer | undefined;
    className: string;
  };

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map(props: MapProps): JSX.Element {
  const { city, offers, selectedOffer, className } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const markerLayer = useMemo(() => layerGroup(), []);


  useEffect(() => {
    if (map) {
      markerLayer.clearLayers();

      offers.forEach((offer) => {
        if (offer && offer.location) {
          const marker = new Marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude
          });

          marker
            .setIcon(
              selectedOffer !== undefined && offer.id === selectedOffer.id
                ? currentCustomIcon
                : defaultCustomIcon
            )
            .addTo(markerLayer);
        }
      });

      markerLayer.addTo(map);

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer, markerLayer]);

  return <section className={className} style={{height: '500px'}} ref={mapRef}></section>;
}

const MemoizedMap = memo(Map, (prevProps, nextProps) =>
  prevProps.selectedOffer?.id === nextProps.selectedOffer?.id &&
  prevProps.offers.map((offer) => offer.id).join() === nextProps.offers.map((offer) => offer.id).join()
);

export default MemoizedMap;
