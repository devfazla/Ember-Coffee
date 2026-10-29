import { useState } from 'react';
import { images } from '../assets/images.js';
import Lightbox from './Lightbox.jsx';

const INITIAL_COUNT = 5;

export default function Gallery({ items }) {
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const visible = expanded ? items : items.slice(0, INITIAL_COUNT);
  const hasMore = items.length > INITIAL_COUNT;

  const close = () => setOpenIndex(null);
  const prev = () => setOpenIndex((current) => (current + visible.length - 1) % visible.length);
  const next = () => setOpenIndex((current) => (current + 1) % visible.length);

  return (
    <div>
      <div className="gallery-grid">
        {visible.map((item, index) => (
          <button
            key={item.image + item.caption}
            type="button"
            className={`gallery-tile ${index === 0 ? 'gallery-tile--tall' : ''}`}
            onClick={() => setOpenIndex(index)}
            aria-label={`View photo: ${item.caption}`}
          >
            <img src={images[item.image]} alt={item.alt} loading="lazy" decoding="async" />
            <span className="gallery-caption" aria-hidden="true">
              {item.caption}
            </span>
          </button>
        ))}
      </div>

      {hasMore && (
        <div className="gallery-actions">
          <button
            type="button"
            className="btn btn--outline"
            onClick={() => {
              if (expanded) setOpenIndex(null);
              setExpanded((current) => !current);
            }}
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        </div>
      )}

      {openIndex !== null && (
        <Lightbox items={visible} index={openIndex} onClose={close} onPrev={prev} onNext={next} />
      )}
    </div>
  );
}
