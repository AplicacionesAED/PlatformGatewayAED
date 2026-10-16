import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Inter alojada en el proyecto (sin Google Fonts), igual que las apps.
import '@fontsource-variable/inter';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
