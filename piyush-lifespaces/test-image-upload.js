// Test script for image upload functionality
const FormData = require('form-data');
const fs = require('fs');
const fetch = require('node-fetch');

async function testImageUpload() {
  try {
    console.log('Testing image upload API...');
    
    // Create a simple test image data (1x1 pixel PNG)
    const testImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    const testImageBuffer = Buffer.from(testImageBase64, 'base64');
    
    // Create form data
    const formData = new FormData();
    formData.append('images', testImageBuffer, {
      filename: 'test-image.png',
      contentType: 'image/png'
    });
    
    // Test the upload endpoint
    const response = await fetch('http://localhost:3000/api/upload/images', {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders()
    });
    
    const result = await response.json();
    console.log('Upload API Response:', result);
    
    if (result.success) {
      console.log('✅ Image upload API is working correctly!');
      console.log(`✅ Uploaded ${result.data.count} image(s)`);
    } else {
      console.log('❌ Image upload failed:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test if node-fetch is available
try {
  testImageUpload();
} catch (error) {
  console.log('⚠️  To run this test, install node-fetch: npm install node-fetch form-data');
}
