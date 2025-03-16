# Environment Variables Setup

## Overview

This project uses environment variables to safely store and access sensitive API keys and configuration values. This approach enhances security by keeping your Firebase configuration details out of version control.

## Environment Files

- `.env`: Contains the actual environment variables with real values (not committed to Git)
- `.env.example`: A template showing the required environment variables without real values (safe to commit)

## Required Environment Variables

The following environment variables are required for Firebase functionality:

```
REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID
REACT_APP_FIREBASE_MEASUREMENT_ID
```

## Setup Instructions

1. Create a `.env` file in the project root directory
2. Copy the contents from `.env.example` into `.env`
3. Replace the placeholder values with your actual Firebase configuration values

## Accessing Environment Variables

In the React application, environment variables are accessed using `process.env.VARIABLE_NAME`.

For example:
```javascript
const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
```

## Important Notes

- Environment variables in Create React App must be prefixed with `REACT_APP_` to be accessible
- The `.env` file should never be committed to version control (it's added to `.gitignore`)
- If you change environment variables while the app is running, you need to restart the development server
- Environment variables are embedded during the build process, so they are part of your production build

## Deployment Considerations

When deploying the application, you need to set the environment variables in your hosting environment:

- **Vercel**: Add environment variables in the project settings
- **Netlify**: Add environment variables in the site settings
- **Firebase Hosting**: Use Firebase Functions environment configuration

## Troubleshooting

If your environment variables aren't working:

1. Make sure they are prefixed with `REACT_APP_`
2. Verify your `.env` file is in the project root (same directory as `package.json`)
3. Restart your development server after making changes to the `.env` file 