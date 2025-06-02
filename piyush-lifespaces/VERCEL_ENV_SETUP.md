# Vercel Environment Variables Setup Guide

## 🔧 Environment Variables to Add in Vercel Dashboard

### Required Variables:

1. **MONGODB_URI**
   - Value: Your MongoDB Atlas connection string
   - Example: mongodb+srv://username:password@cluster.mongodb.net/piyush-lifespaces?retryWrites=true&w=majority

2. **JWT_SECRET** 
   - Value: A secure random string (minimum 32 characters)
   - Example: your-super-secure-jwt-secret-key-for-production-32chars-minimum

3. **NODE_ENV**
   - Value: production

### Optional Variables (for additional features):

4. **SMTP_HOST**
   - Value: smtp.gmail.com (if using Gmail)

5. **SMTP_PORT**
   - Value: 587

6. **SMTP_USER**
   - Value: your-email@gmail.com

7. **SMTP_PASS**
   - Value: your-app-password

8. **ADMIN_EMAIL**
   - Value: admin@piyushlifespaces.com

9. **ADMIN_PASSWORD**
   - Value: admin123 (change for production)

## 📋 Steps to Add in Vercel:

1. Go to your project dashboard on Vercel
2. Click "Settings" tab
3. Click "Environment Variables" from sidebar
4. Add each variable with Name and Value
5. Select Environment: Production, Preview, Development (as needed)
6. Click "Save"

## 🔄 After Adding Variables:

1. Go to "Deployments" tab
2. Click "..." on latest deployment
3. Click "Redeploy" to apply new environment variables
