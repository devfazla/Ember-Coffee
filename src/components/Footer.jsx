import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { directionsUrl, navItems, site } from '../data/site.js';
import { Check, socialIcons } from './icons.jsx';

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default function Footer() {
  const emailId = useId();
  const nameId = useId();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isEmail(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Link to="/" className="brand" aria-label="Ember home">
            Ember
          </Link>
          <div>{site.tagline}</div>
          <div className="socials">
            {site.social.map((item) => {
              const Icon = socialIcons[item.label];
              return (
                <a
                  key={item.label}
                  className="social"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Ember on ${item.label}`}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <div className="footer-title">Explore</div>
          <div className="footer-links">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
            <Link to="/reserve">Reserve</Link>
          </div>
        </div>

        <div>
          <div className="footer-title">Visit</div>
          <div>{site.hours}</div>
          <div>
            <a href={directionsUrl} target="_blank" rel="noreferrer">
              {site.address.line1}
              <br />
              {site.address.line2}
            </a>
          </div>
          <div>@ember</div>
        </div>

        <div>
          {subscribed ? (
            <div className="newsletter">
              <div className="newsletter-title">You’re on the list.</div>
              <p className="newsletter-status">
                <Check />
                <span>
                  Look for us on Fridays: new roasts, bakes, and the occasional early close.
                </span>
              </p>
            </div>
          ) : (
            <form className="newsletter" onSubmit={handleSubmit} noValidate>
              <div className="newsletter-title">Stay in the loop.</div>
              <div className="form-field form-field--dark">
                <label htmlFor={nameId}>Name (optional)</label>
                <input
                  id={nameId}
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className={`form-field form-field--dark ${error ? 'form-field--error' : ''}`}>
                <label htmlFor={emailId}>Email *</label>
                <input
                  id={emailId}
                  type="email"
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (error) setError('');
                  }}
                  aria-invalid={error ? 'true' : undefined}
                  aria-describedby={error ? `${emailId}-error` : undefined}
                  autoComplete="email"
                />
                {error && (
                  <span className="form-error" id={`${emailId}-error`} role="alert">
                    {error}
                  </span>
                )}
              </div>
              <button type="submit" className="btn btn--light">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Ember</span>
        <span>
          Site by{' '}
          <a href="https://devfazla.com" target="_blank" rel="noreferrer">
            Fazla Rabbi
          </a>
        </span>
      </div>
    </footer>
  );
}
