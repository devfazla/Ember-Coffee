import { mapUrl } from '../data/site.js';

export default function MapCard() {
  return (
    <div className="map-card">
      <iframe
        className="map-frame"
        title="Map showing Ember Cafe (Kuching)"
        src="https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1sEmber+Cafe+Kuching!6i16"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a
        className="map-open"
        href={mapUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Open Ember Cafe (Kuching) in Google Maps"
      >
        Open in Google Maps
      </a>
    </div>
  );
}
