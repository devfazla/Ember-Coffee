import { useEffect, useRef, useState } from 'react';
import { images } from '../assets/images.js';
import { FormField, Input, Select, Textarea } from '../components/FormField.jsx';
import Reveal from '../components/Reveal.jsx';

const times = ['7:00 am', '9:00 am', '11:00 am', '1:00 pm', '3:00 pm', '5:00 pm'];
const guestCounts = Array.from({ length: 8 }, (_, index) =>
  index === 0 ? '1 guest' : `${index + 1} guests`,
);

const initialValues = {
  name: '',
  email: '',
  date: '',
  time: '9:00 am',
  guests: '2 guests',
  phone: '',
  note: '',
};

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const today = () => {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

const formatDate = (value) =>
  new Date(`${value}T12:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

export default function Reserve() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState(null);
  const headingRef = useRef(null);

  useEffect(() => {
    if (confirmation) headingRef.current?.focus();
  }, [confirmation]);

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = 'Enter your name.';
    if (!isEmail(values.email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (!values.date) nextErrors.date = 'Choose a date.';
    else if (values.date < today()) nextErrors.date = 'Choose today or a later date.';

    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document.getElementById(`r-${firstError}`)?.focus();
      return;
    }

    setConfirmation({
      name: values.name.trim(),
      email: values.email.trim(),
      date: values.date,
      time: values.time,
      guests: values.guests,
    });
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setConfirmation(null);
  };

  return (
    <section className="reserve-section">
      <div className="reserve-media">
        <img
          src={images['table-window']}
          alt="A table for two by the window at Ember, set with two cups of coffee"
          fetchpriority="high"
        />
      </div>

      <Reveal className="reserve-copy">
        <h1 className="display-lg">Reserve</h1>

        {confirmation ? (
          <div className="reservation-confirmation">
            <h2 className="display-sm" tabIndex={-1} ref={headingRef}>
              You’re booked.
            </h2>
            <p className="muted small">
              We’ve held your table and sent a note to {confirmation.email}.
            </p>
            <dl className="confirmation-details">
              <div>
                <dt>Date</dt>
                <dd>{formatDate(confirmation.date)}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{confirmation.time}</dd>
              </div>
              <div>
                <dt>Guests</dt>
                <dd>{confirmation.guests}</dd>
              </div>
              <div>
                <dt>Name</dt>
                <dd>{confirmation.name}</dd>
              </div>
            </dl>
            <button type="button" className="btn btn--outline" onClick={reset}>
              Make another reservation
            </button>
          </div>
        ) : (
          <form className="reserve-form" onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <FormField id="r-name" label="Name" required error={errors.name}>
                <Input
                  id="r-name"
                  type="text"
                  value={values.name}
                  onChange={update('name')}
                  error={errors.name}
                  autoComplete="name"
                />
              </FormField>
              <FormField id="r-email" label="Email" required error={errors.email}>
                <Input
                  id="r-email"
                  type="email"
                  value={values.email}
                  onChange={update('email')}
                  error={errors.email}
                  autoComplete="email"
                />
              </FormField>
              <FormField id="r-date" label="Date" required error={errors.date}>
                <Input
                  id="r-date"
                  type="date"
                  min={today()}
                  value={values.date}
                  onChange={update('date')}
                  error={errors.date}
                />
              </FormField>
              <FormField id="r-time" label="Time" required>
                <Select id="r-time" value={values.time} onChange={update('time')}>
                  {times.map((time) => (
                    <option key={time}>{time}</option>
                  ))}
                </Select>
              </FormField>
              <FormField id="r-guests" label="Guests" required>
                <Select id="r-guests" value={values.guests} onChange={update('guests')}>
                  {guestCounts.map((guests) => (
                    <option key={guests}>{guests}</option>
                  ))}
                </Select>
              </FormField>
              <FormField id="r-phone" label="Phone (optional)">
                <Input
                  id="r-phone"
                  type="tel"
                  value={values.phone}
                  onChange={update('phone')}
                  autoComplete="tel"
                />
              </FormField>
              <FormField id="r-note" label="Note (optional)" className="form-span-2">
                <Textarea
                  id="r-note"
                  value={values.note}
                  onChange={update('note')}
                  style={{ minHeight: 100 }}
                />
              </FormField>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn--primary">
                Confirm reservation
              </button>
            </div>
          </form>
        )}
      </Reveal>
    </section>
  );
}
