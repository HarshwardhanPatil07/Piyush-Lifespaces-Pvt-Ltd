# Test Image Upload Functionality
Write-Host "Testing Property Image Upload Functionality..." -ForegroundColor Green

# Test if the application is running
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/admin" -Method GET -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Admin page is accessible" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Admin page not accessible. Is the app running on port 3000?" -ForegroundColor Red
    exit 1
}

# Test the image upload API endpoint
try {
    # Create a simple test using a small text file as an image placeholder
    $testData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
    
    Write-Host "Testing image upload API..." -ForegroundColor Yellow
    
    # Note: For a full test, you would need to create a proper multipart form data request
    # This is a simplified test to check if the endpoint exists
    $apiResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/upload/images" -Method POST -UseBasicParsing -ErrorAction Stop
    
} catch {
    if ($_.Exception.Response.StatusCode -eq 400) {
        Write-Host "✅ Image upload API is responding (expects files)" -ForegroundColor Green
    } else {
        Write-Host "❌ Image upload API error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n📋 To test image upload fully:" -ForegroundColor Cyan
Write-Host "1. Open http://localhost:3000/admin/login" -ForegroundColor White
Write-Host "2. Login with: admin@piyushlifespaces.com / admin123" -ForegroundColor White
Write-Host "3. Click 'Add Property'" -ForegroundColor White
Write-Host "4. Try uploading an image in the Property Images section" -ForegroundColor White
Write-Host "5. Check browser console for debug logs" -ForegroundColor White

Write-Host "`n🔍 Check browser console for these debug messages:" -ForegroundColor Cyan
Write-Host "- 'Submitting property data:'" -ForegroundColor White
Write-Host "- 'Images being submitted:'" -ForegroundColor White
Write-Host "- 'Response from server:'" -ForegroundColor White
