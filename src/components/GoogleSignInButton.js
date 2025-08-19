import React from 'react';
import googleDriveService from '../utils/googleDriveService';

const GoogleSignInButton = ({ onSuccess, onError }) => {
  const handleGoogleSignIn = async () => {
    try {
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
      
      // Initialize the Drive service if not already done
      await googleDriveService.initialize(apiKey, clientId);
      
      // Sign in using OAuth2 flow for Drive API access
      const success = await googleDriveService.signIn();
      
      if (success) {
        onSuccess?.();
      } else {
        onError?.('Failed to sign in');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      onError?.(error.message);
    }
  };
  
  return (
    <button
      className="btn-primary"
      onClick={handleGoogleSignIn}
      style={{ 
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
        <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
        <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.039l3.007-2.332z"/>
        <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
      </svg>
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;