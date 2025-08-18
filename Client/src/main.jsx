import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeProvider.jsx';
import { PatientProvider } from './context/PatientProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <PatientProvider>
          <App />
        </PatientProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
