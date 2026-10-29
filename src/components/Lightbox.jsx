import { useEffect, useRef } from 'react';
import { images } from '../assets/images.js';
import { ChevronLeft, ChevronRight, Close } from './icons.jsx';

export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const closeRef = useRef(null);
  const containerRef = useRef(null);
  const item = items[index];

  useEffect(() => {
    const previousFocus = document.activeElement;
    document.body.classList.add('is-locked');
    closeRef.current?.focus();

    return () => {
      document.body.classList.remove('is-locked');
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key === 'ArrowLeft') {
        onPrev();
        return;
      }
      if (event.key === 'ArrowRight') {
        onNext();
        return;
      }
      if (event.key === 'Tab') {
        const focusable = containerRef.current?.querySelectorAll('button');
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [index, onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      ref={containerRef}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button ref={closeRef} type="button" className="lightbox-close" onClick={onClose} aria-label="Close photo viewer">
        <Close />
      </button>

      {items.length > 1 && (
        <>
          <button type="button" className="lightbox-nav lightbox-nav--prev" onClick={onPrev} aria-label="Previous photo">
            <ChevronLeft />
          </button>
          <button type="button" className="lightbox-nav lightbox-nav--next" onClick={onNext} aria-label="Next photo">
            <ChevronRight />
          </button>
        </>
      )}

      <figure className="lightbox-figure">
        <img src={images[item.image]} alt={item.alt} />
        <figcaption>
          <span>{item.caption}</span>
          <span>
            {index + 1} / {items.length}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
