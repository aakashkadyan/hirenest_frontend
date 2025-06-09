import { useState, useEffect } from 'react';

function Debug() {
  const [envVars, setEnvVars] = useState({});
  
  useEffect(() => {
    // Collect environment variables
    const viteVars = {};
    for (const key in import.meta.env) {
      if (key.startsWith('VITE_')) {
        // Mask sensitive values
        const value = import.meta.env[key];
        viteVars[key] = key.includes('API') || key.includes('KEY') || key.includes('SECRET') 
          ? `${value.substring(0, 4)}...${value.slice(-4)}` 
          : value;
      }
    }
    setEnvVars(viteVars);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Information</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Browser Information</h2>
        <ul className="list-disc pl-5">
          <li>User Agent: {navigator.userAgent}</li>
          <li>URL: {window.location.href}</li>
          <li>Path: {window.location.pathname}</li>
        </ul>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Environment Variables</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-40">
          {JSON.stringify(envVars, null, 2)}
        </pre>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Local Storage</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-40">
          {JSON.stringify(Object.fromEntries(
            Object.keys(localStorage).map(key => [
              key,
              key.toLowerCase().includes('token') || key.toLowerCase().includes('password')
                ? '******'
                : localStorage.getItem(key)
            ])
          ), null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default Debug; 