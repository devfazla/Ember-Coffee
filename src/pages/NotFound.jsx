import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="notfound">
      <p className="eyebrow">404</p>
      <h1 className="display-lg">This page isn’t on the menu.</h1>
      <p>It may have moved, or it was never here. The coffee still is.</p>
      <Link to="/" className="btn btn--primary">
        Back to home
      </Link>
    </section>
  );
}
