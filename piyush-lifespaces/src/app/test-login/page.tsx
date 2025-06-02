'use client';

import React from 'react';

export default function TestLogin() {  const testLogin = async () => {
    try {
      console.log('Testing login...');
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important: Include cookies in requests
        body: JSON.stringify({
          email: 'admin@piyushlifespaces.com',
          password: 'admin123'
        }),
      });

      const data = await response.json();
      console.log('Response status:', response.status);
      console.log('Response data:', data);
      
      if (data.success) {
        console.log('Login successful! Waiting 500ms then redirecting...');
        // Wait a bit longer to ensure cookie is properly set
        setTimeout(() => {
          console.log('Redirecting to /admin now...');
          window.location.href = '/admin';
        }, 500);
      } else {
        console.log('Login failed:', data.error);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const testAuth = async () => {
    try {
      console.log('Testing auth check...');
      const response = await fetch('/api/auth/me', {
        credentials: 'include' // Important: Include cookies in requests
      });
      const data = await response.json();
      console.log('Auth check response:', data);
    } catch (error) {
      console.error('Auth check error:', error);
    }
  };
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Login Test</h1>
      <div className="space-y-4">
        <button 
          onClick={testLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
        >
          Test Admin Login
        </button>
        <button 
          onClick={testAuth}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Test Auth Status
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Check the browser console for detailed logs.
      </p>
    </div>
  );
}
