import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

// For debugging purposes
console.log('React app initializing...');

const root = createRoot(document.getElementById('root'))

root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </ErrorBoundary>
)
