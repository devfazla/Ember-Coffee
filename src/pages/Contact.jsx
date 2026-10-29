import { useState } from 'react';
import { images } from '../assets/images.js';
import { directionsUrl, fullAddress, site } from '../data/site.js';
import { FormField, Input, Textarea } from '../components/FormField.jsx';
import Reveal from '../components/Reveal.jsx';
import { Check } from '../components/icons.jsx';

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = 'Enter your name.';
    if (!isEmail(values.email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (values.message.trim().length < 10) {
      nextErrors.message = 'Tell us a little more — at least 10 characters.';
    }

    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document.getElementById(`c-${firstError === 'message' ? 'msg' : firstError}`)?.focus();
      return;
    }

    setSent({ firstName: values.name.trim().split(' ')[0] });
  };

  const reset = () => {
    setValues({ name: '', email: '', message: '' });
    setSent(null);
  };

  return (
    <>
      <section className="visit-section">
        <div className="visit-media">
          <img
            src={images['window-seat']}
            alt="A linen-draped window seat and a coffee cup at Ember"
            fetchpriority="high"
          />
        </div>
        <Reveal className="visit-copy">
          <h1 className="display-lg">Visit</h1>
          <div className="visit-details">
            <div>
              <div className="visit-label">Address</div>
              <div className="visit-value">
                <a href={directionsUrl} target="_blank" rel="noreferrer">
                  {fullAddress}
                </a>
              </div>
            </div>
            <div>
              <div className="visit-label">Hours</div>
              <div className="visit-value">{site.hours}</div>
            </div>
            <div>
              <div className="visit-label">Phone</div>
              <div className="visit-value">
                <a href={site.phoneHref}>{site.phone}</a>
              </div>
            </div>
            <div>
              <div className="visit-label">Email</div>
              <div className="visit-value">
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="contact-section">
        <Reveal>
          <h2 className="display-md">Say hello.</h2>
        </Reveal>
        <Reveal delay={80}>
          {sent ? (
            <div className="form-status" role="status">
              <Check />
              <div>
                <p>Thanks, {sent.firstName}. We’ll write back within a day.</p>
                <p style={{ marginTop: '8px' }}>
                  <button type="button" className="text-link text-link--accent" onClick={reset}>
                    Send another message
                  </button>
                </p>
              </div>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <FormField id="c-name" label="Name" required error={errors.name}>
                  <Input
                    id="c-name"
                    type="text"
                    value={values.name}
                    onChange={update('name')}
                    error={errors.name}
                    autoComplete="name"
                  />
                </FormField>
                <FormField id="c-email" label="Email" required error={errors.email}>
                  <Input
                    id="c-email"
                    type="email"
                    value={values.email}
                    onChange={update('email')}
                    error={errors.email}
                    autoComplete="email"
                  />
                </FormField>
              </div>
              <FormField id="c-msg" label="Message" required error={errors.message}>
                <Textarea
                  id="c-msg"
                  value={values.message}
                  onChange={update('message')}
                  error={errors.message}
                />
              </FormField>
              <div className="form-actions">
                <button type="submit" className="btn btn--primary">
                  Send message
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </section>

      <section className="storefront-band" aria-label="Ember storefront">
        <img
          src={images.storefront}
          alt="The corner storefront on Ash Street in the late afternoon sun"
          loading="lazy"
        />
        <p className="storefront-label">214 Ash Street · Portland</p>
      </section>
    </>
  );
}
