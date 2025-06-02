// Test script to verify admin login flow
const fetch = require('node-fetch');

async function testLogin() {
  try {
    console.log('🔍 Testing admin login flow...\n');
    
    // Test 1: Login API
    console.log('1. Testing login API...');
    const loginResponse = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@piyushlifespaces.com',
        password: 'admin123'
      }),
    });

    const loginData = await loginResponse.json();
    console.log('   Status:', loginResponse.status);
    console.log('   Success:', loginData.success);
    console.log('   Message:', loginData.message);
    
    if (!loginData.success) {
      console.log('❌ Login failed:', loginData.error);
      return;
    }
    
    // Extract cookies from response
    const cookies = loginResponse.headers.get('set-cookie');
    console.log('   Cookies set:', cookies ? 'Yes' : 'No');
    
    if (cookies) {
      // Test 2: Auth verification API
      console.log('\n2. Testing auth verification...');
      const authResponse = await fetch('http://localhost:3001/api/auth/me', {
        headers: {
          'Cookie': cookies
        }
      });
      
      const authData = await authResponse.json();
      console.log('   Status:', authResponse.status);
      console.log('   Authenticated:', authData.authenticated);
      
      if (authData.authenticated) {
        console.log('   User:', authData.user.email);
        console.log('   Role:', authData.user.role);
      }
    }
    
    console.log('\n✅ Login flow test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testLogin();
