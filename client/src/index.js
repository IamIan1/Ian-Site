import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(rootElement);

// Render the app inside the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
