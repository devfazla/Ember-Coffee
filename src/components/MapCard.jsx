import { directionsUrl } from '../data/site.js';

export default function MapCard() {
  return (
    <div className="map-card">
      <svg viewBox="0 0 760 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="760" height="480" fill="#A9B5A0" />
        <rect x="470" y="40" width="250" height="120" fill="rgba(47,74,58,0.12)" />
        <rect x="70" y="300" width="160" height="120" fill="rgba(245,242,237,0.28)" />
        <g stroke="rgba(245,242,237,0.85)" strokeLinecap="round">
          <path d="M0 120H760" strokeWidth="16" />
          <path d="M0 380H760" strokeWidth="12" />
          <path d="M180 0V480" strokeWidth="14" />
          <path d="M560 0V480" strokeWidth="10" />
          <path d="M0 480L760 30" strokeWidth="9" />
        </g>
        <g stroke="rgba(31,26,23,0.12)" strokeWidth="2" strokeDasharray="6 8">
          <path d="M0 250H760" />
          <path d="M360 0V480" />
          <path d="M680 0V480" />
        </g>
        <g fill="rgba(31,26,23,0.4)" fontFamily="DM Sans, sans-serif" fontSize="11" letterSpacing="2">
          <text x="250" y="114">ASH ST</text>
          <text x="572" y="300" transform="rotate(90 572 300)">SW 2ND AVE</text>
          <text x="64" y="368">OLD TOWN</text>
        </g>
      </svg>
      <span className="map-pin" aria-hidden="true" />
      <span className="map-label">Ember · 214 Ash Street</span>
      <a
        className="map-hit"
        href={directionsUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Open Ember’s location in Google Maps"
      />
    </div>
  );
}
