const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
const proxyUrl = import.meta.env.VITE_TELEGRAM_PROXY_URL;
const proxyKey = import.meta.env.VITE_TELEGRAM_PROXY_KEY;

const LOCATION_ENDPOINT =
  'https://ipwho.is/?fields=success,city,region,country,country_code';
const LOCATION_TIMEOUT = 2500;
const LOCATION_CACHE_KEY = 'ember:visitor-location';
const MAX_MESSAGE_LENGTH = 3900;
const MAX_BODY_LENGTH = 2500;
const MAX_FIELD_LENGTH = 500;

const configured = Boolean(proxyUrl || (botToken && chatId));

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const clip = (value, max) => {
  const text = String(value).trim();
  return text.length > max ? `${text.slice(0, max).trimEnd()}...` : text;
};

const formatTime = () =>
  new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });

const formatFields = (fields) =>
  fields
    .map(([label, value]) => [label, value == null ? '' : String(value).trim()])
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<b>${escapeHtml(label)}:</b> ${escapeHtml(clip(value, MAX_FIELD_LENGTH))}`,
    )
    .join('\n');

const readCachedLocation = () => {
  try {
    const cached = JSON.parse(sessionStorage.getItem(LOCATION_CACHE_KEY));
    return cached && typeof cached === 'object' ? cached : null;
  } catch {
    return null;
  }
};

const cacheLocation = (value) => {
  try {
    sessionStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(value));
  } catch {
    // Private mode or storage limits: the lookup simply runs again next time.
  }
};

const lookupLocation = async () => {
  const cached = readCachedLocation();
  if (cached) return cached;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), LOCATION_TIMEOUT);

  try {
    const response = await fetch(LOCATION_ENDPOINT, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    if (!data.success) throw new Error('Lookup rejected the request');

    const location = {
      city: data.city || '',
      region: data.region || '',
      country: data.country || data.country_code || '',
    };
    cacheLocation(location);
    return location;
  } catch (error) {
    console.warn('Could not detect visitor location.', error);
    return null;
  } finally {
    clearTimeout(timer);
  }
};

let locationLookup;

const getLocation = () => {
  if (!locationLookup) locationLookup = lookupLocation();
  return locationLookup;
};

const formatLocation = (location) => {
  if (!location) return 'Unavailable';
  const parts = [location.city, location.region, location.country].filter(Boolean);
  const unique = [...new Set(parts)];
  return unique.length ? unique.join(', ') : 'Unavailable';
};

export const notify = async ({ title, fields = [], body }) => {
  if (!configured) {
    console.warn('Telegram is not configured; skipping notification.');
    return true;
  }

  const location = await getLocation();
  const blocks = [`<b>${escapeHtml(title)}</b>`];

  const fieldBlock = formatFields(fields);
  if (fieldBlock) blocks.push(fieldBlock);

  const trimmedBody = body == null ? '' : String(body).trim();
  if (trimmedBody) {
    blocks.push(`<blockquote>${escapeHtml(clip(trimmedBody, MAX_BODY_LENGTH))}</blockquote>`);
  }

  const page = `${window.location.origin}${window.location.pathname}`;
  blocks.push(
    [
      `<b>Page:</b> ${escapeHtml(page)}`,
      `<b>Location:</b> ${escapeHtml(formatLocation(location))}`,
      `<b>Time:</b> ${escapeHtml(formatTime())} (Portland)`,
    ].join('\n'),
  );

  const text = blocks.join('\n\n').slice(0, MAX_MESSAGE_LENGTH);
  const endpoint = proxyUrl || `https://api.telegram.org/bot${botToken}/sendMessage`;
  const payload = proxyUrl
    ? { text, key: proxyKey || '' }
    : {
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      // Apps Script cannot answer a CORS preflight, so the proxy takes a simple
      // text/plain request and parses the JSON body itself.
      headers: {
        'Content-Type': proxyUrl ? 'text/plain;charset=utf-8' : 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`Telegram notification failed with HTTP ${response.status}.`);
      return false;
    }

    if (proxyUrl) {
      const result = await response.json().catch(() => null);
      if (!result?.ok) {
        console.error('Telegram proxy rejected the message.', result);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Telegram notification failed.', error);
    return false;
  }
};

let lastErrorKey = '';
let lastErrorAt = 0;

export const reportError = (message, source) => {
  const key = `${message}|${source || ''}`;
  const now = Date.now();
  if (key === lastErrorKey && now - lastErrorAt < 5000) return;
  lastErrorKey = key;
  lastErrorAt = now;

  notify({
    title: 'Client error',
    fields: [
      ['Message', message],
      ['Source', source || 'Unknown'],
      ['Browser', navigator.userAgent],
    ],
  }).catch(() => {});
};
