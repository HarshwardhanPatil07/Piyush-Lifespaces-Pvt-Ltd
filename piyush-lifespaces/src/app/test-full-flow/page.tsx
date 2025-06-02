'use client';

import React, { useState } from 'react';

export default function FullLoginTest() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addLog = (message: string) => {
    console.log(message);
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testFullFlow = async () => {
    setLogs([]);
    addLog('Starting full login flow test...');
    
    try {
      // Step 1: Login
      addLog('Step 1: Attempting login...');
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: 'admin@piyushlifespaces.com',
          password: 'admin123'
        }),
      });

      const loginData = await loginResponse.json();
      addLog(`Login response: ${loginResponse.status} - ${loginData.success ? 'SUCCESS' : 'FAILED'}`);
      
      if (!loginData.success) {
        addLog(`Login error: ${loginData.error}`);
        return;
      }

      // Step 2: Wait and check auth
      addLog('Step 2: Waiting 1 second then checking auth...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const authResponse = await fetch('/api/auth/me', {
        credentials: 'include'
      });
      const authData = await authResponse.json();
      addLog(`Auth check: ${authResponse.status} - ${authData.authenticated ? 'AUTHENTICATED' : 'NOT AUTHENTICATED'}`);
      
      if (authData.authenticated) {
        addLog(`Authenticated as: ${authData.user.email} (${authData.user.role})`);
        setIsLoggedIn(true);
        
        // Step 3: Try to access admin page
        addLog('Step 3: Testing admin page access...');
        try {
          const adminResponse = await fetch('/admin', {
            credentials: 'include'
          });
          addLog(`Admin page response: ${adminResponse.status}`);
          
          if (adminResponse.status === 200) {
            addLog('✅ SUCCESS: Can access admin page!');
          } else {
            addLog('❌ FAILED: Cannot access admin page');
          }
        } catch (error) {
          addLog(`Admin page test error: ${error}`);
        }
      }
      
    } catch (error) {
      addLog(`Test error: ${error}`);
    }
  };

  const directRedirect = () => {
    addLog('Attempting direct redirect to admin...');
    window.location.href = '/admin';
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Complete Login Flow Test</h1>
      
      <div className="space-y-4 mb-6">
        <button 
          onClick={testFullFlow}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 mr-4"
        >
          Test Full Login Flow
        </button>
        
        {isLoggedIn && (
          <button 
            onClick={directRedirect}
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
          >
            Go to Admin Dashboard
          </button>
        )}
      </div>

      <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-96 overflow-y-auto font-mono text-sm">
        <h3 className="text-white mb-2">Test Logs:</h3>
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
        {logs.length === 0 && (
          <div className="text-gray-500">Click "Test Full Login Flow" to start...</div>
        )}
      </div>
    </div>
  );
}
