import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App.jsx';

console.log('React app initializing - simplified version');

// Simple direct DOM check
const rootElement = document.getElementById('root');
if (rootElement) {
  console.log('Root element found, rendering app');
  
  // Add a text node to confirm DOM manipulation is working
  const testDiv = document.createElement('div');
  testDiv.textContent = 'DOM manipulation is working';
  testDiv.style.padding = '10px';
  testDiv.style.background = '#f0f0f0';
  testDiv.style.marginBottom = '10px';
  rootElement.appendChild(testDiv);
  
  // Render the React app
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
  
  console.log('React render completed');
} else {
  console.error('Root element not found');
}
