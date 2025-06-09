import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

// For debugging purposes
console.log('React app initializing...');

// Function to add debug info to the page
function addDebugInfo(message, isError = false) {
  const debugOutput = document.getElementById('debug-output');
  if (debugOutput) {
    const p = document.createElement('p');
    if (isError) p.className = 'error';
    p.textContent = message;
    debugOutput.appendChild(p);
  }
  console.log(isError ? `ERROR: ${message}` : message);
}

// Wrap the entire initialization in a try-catch
try {
  addDebugInfo('Starting React initialization');
  
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  addDebugInfo('Creating React root');
  const root = createRoot(rootElement);
  
  addDebugInfo('Rendering React app');
  root.render(
    <ErrorBoundary>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ErrorBoundary>
  );
  
  addDebugInfo('React render completed');
} catch (error) {
  console.error('Error initializing React app:', error);
  addDebugInfo(`Failed to initialize React: ${error.message}`, true);
  
  // Display error on the page
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="color: red; padding: 20px; border: 1px solid red;">
        <h2>Error Loading Application</h2>
        <p>${error.message}</p>
        <pre>${error.stack}</pre>
      </div>
    `;
  }
}
