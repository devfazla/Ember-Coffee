/**
 * Ember Coffee Telegram proxy.
 *
 * Deploy as a web app with "Execute as: Me" and "Who has access: Anyone".
 * Script properties:
 *   TELEGRAM_BOT_TOKEN  from @BotFather
 *   TELEGRAM_CHAT_ID    target chat or group
 *   PROXY_KEY           shared key sent by the site
 */

const RATE_LIMIT = 30;
const RATE_WINDOW_SECONDS = 3600;
const MAX_MESSAGE_LENGTH = 4096;

function doPost(event) {
  try {
    const props = PropertiesService.getScriptProperties();
    const token = props.getProperty('TELEGRAM_BOT_TOKEN');
    const chatId = props.getProperty('TELEGRAM_CHAT_ID');
    const sharedKey = props.getProperty('PROXY_KEY');

    if (!token || !chatId) {
      return json({ ok: false, error: 'Proxy is not configured' });
    }

    const payload = JSON.parse((event.postData && event.postData.contents) || '{}');

    if (sharedKey && payload.key !== sharedKey) {
      return json({ ok: false, error: 'Unauthorized' });
    }

    const text = String(payload.text || '').trim();
    if (!text) {
      return json({ ok: false, error: 'Missing text' });
    }
    if (text.length > MAX_MESSAGE_LENGTH) {
      return json({ ok: false, error: 'Message too long' });
    }
    if (!allowRequest()) {
      return json({ ok: false, error: 'Rate limit reached' });
    }

    const response = UrlFetchApp.fetch(
      'https://api.telegram.org/bot' + token + '/sendMessage',
      {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
        muteHttpExceptions: true,
      },
    );

    const status = response.getResponseCode();
    if (status !== 200) {
      console.error('Telegram responded ' + status + ': ' + response.getContentText());
      return json({ ok: false, error: 'Telegram responded ' + status });
    }

    return json({ ok: true });
  } catch (error) {
    console.error(error);
    return json({ ok: false, error: 'Proxy error' });
  }
}

// Lets you open the deployed URL in a browser to confirm it is live.
function doGet() {
  return json({ ok: true, service: 'ember-telegram-proxy' });
}

function allowRequest() {
  const cache = CacheService.getScriptCache();
  const windowKey = 'rate:' + Math.floor(Date.now() / (RATE_WINDOW_SECONDS * 1000));
  const count = Number(cache.get(windowKey) || 0);

  if (count >= RATE_LIMIT) return false;

  cache.put(windowKey, String(count + 1), RATE_WINDOW_SECONDS);
  return true;
}

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
