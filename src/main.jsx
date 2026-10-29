import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { reportError } from './lib/telegram.js';
import './styles/base.css';
import './styles/components.css';
import './styles/pages.css';

const basename = import.meta.env.BASE_URL.replace(/\/+$/, '') || '/';

window.addEventListener('error', (event) => {
  if (!event.message) return;
  const source = event.filename ? `${event.filename}:${event.lineno}` : '';
  reportError(event.message, source);
});

window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  reportError(reason instanceof Error ? reason.message : String(reason));
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
