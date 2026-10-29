import { useState } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../assets/images.js';
import { featuredItems } from '../data/menu.js';
import { gallery } from '../data/gallery.js';
import { directionsUrl, fullAddress, reviews, site } from '../data/site.js';
import Gallery from '../components/Gallery.jsx';
import MapCard from '../components/MapCard.jsx';
import MenuCard from '../components/MenuCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { Star } from '../components/icons.jsx';

const INITIAL_REVIEWS = 3;

export default function Home() {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, INITIAL_REVIEWS);
  const hasMoreReviews = reviews.length > INITIAL_REVIEWS;

  return (
    <>
      <section className="home-hero">
        <Reveal className="home-hero-copy">
          <p className="eyebrow">Coffee · Bakery</p>
          <h1 className="display-xl">
            Good coffee,
            <br />
            slowly.
          </h1>
          <div className="hero-actions">
            <Link to="/reserve" className="btn btn--primary">
              Reserve a table
            </Link>
            <Link to="/menu" className="text-link">
              See menu
            </Link>
          </div>
        </Reveal>
        <Reveal className="hero-media" delay={120}>
          <img
            className="home-hero-image"
            src={images['hero-latte']}
            alt="Overhead flat white with rosetta latte art on a linen table"
            fetchpriority="high"
          />
        </Reveal>
      </section>

      <section className="home-section">
        <Reveal>
          <div className="section-head">
            <h2 className="section-title">Menu</h2>
            <Link to="/menu" className="text-link text-link--accent">
              See all
            </Link>
          </div>
          <div className="grid-4">
            {featuredItems.map((item) => (
              <MenuCard key={item.name} item={item} />
            ))}
          </div>
        </Reveal>
      </section>

      <section className="home-gallery">
        <Reveal className="section-head">
          <h2 className="section-title">Gallery</h2>
        </Reveal>
        <Reveal>
          <Gallery items={gallery} />
        </Reveal>
      </section>

      <section className="band">
        <img src={images['interior-wide']} alt="" aria-hidden="true" loading="lazy" />
        <h2 className="band-text">Slow mornings.</h2>
      </section>

      <section className="reviews reviews-section">
        <Reveal>
          <div className="section-head">
            <h2 className="section-title">Reviews</h2>
          </div>
          <div
            className={`review-grid ${showAllReviews ? 'is-expanded' : ''}`}
            id="home-reviews"
          >
            {visibleReviews.map((review) => (
              <figure className="review-card" key={review.name}>
                <div className="stars" role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} />
                  ))}
                </div>
                <blockquote className="review-quote">
                  <p>{review.quote}</p>
                </blockquote>
                <figcaption className="review-name">{review.name}</figcaption>
              </figure>
            ))}
          </div>
          {hasMoreReviews && (
            <div className="reviews-actions">
              <button
                type="button"
                className="btn btn--outline"
                aria-expanded={showAllReviews}
                aria-controls="home-reviews"
                onClick={() => setShowAllReviews((current) => !current)}
              >
                {showAllReviews ? 'Show less' : 'View all'}
              </button>
            </div>
          )}
        </Reveal>
      </section>

      <section className="findus-section">
        <MapCard />
        <Reveal className="findus-copy">
          <h2 className="display-md">Find us</h2>
          <p className="findus-address">
            <a href={directionsUrl} target="_blank" rel="noreferrer">
              {site.address.line1}
              <br />
              {site.address.line2}
            </a>
          </p>
          <p className="findus-hours">{site.hours}</p>
          <a
            className="btn btn--primary"
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Get directions to Ember at ${fullAddress}`}
          >
            Get directions
          </a>
        </Reveal>
      </section>
    </>
  );
}
