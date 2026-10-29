import { images } from '../assets/images.js';

export default function MenuCard({ item }) {
  return (
    <article className="product-card">
      <div className="product-media">
        <img src={images[item.image]} alt={item.alt} loading="lazy" decoding="async" />
      </div>
      <div className="product-row">
        <span className="product-name">{item.name}</span>
        <span className="product-price">{item.price}</span>
      </div>
    </article>
  );
}
