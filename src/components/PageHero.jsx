import { images } from '../assets/images.js';

export default function PageHero({ image, alt, title }) {
  return (
    <section className="page-hero">
      <img src={images[image]} alt={alt} fetchpriority="high" />
      <h1 className="page-hero-title">{title}</h1>
    </section>
  );
}
