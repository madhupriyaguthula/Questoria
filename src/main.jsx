// src/main.jsx
// This is the ENTRY POINT — Vite runs this file first.
// It mounts your React app into the <div id="root"> in index.html.

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Global styles — loaded once, apply everywhere
import './index.css';

import App from './App.jsx';

// Find the <div id="root"> in index.html and render <App /> inside it
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);