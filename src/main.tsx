import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { isLocale } from './utils/preferences';
const locale = document.documentElement.lang;
const app = (
  <StrictMode>
    <App initialLocale={isLocale(locale) ? locale : 'en'} />
  </StrictMode>
);
const root = document.getElementById('root')!;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
