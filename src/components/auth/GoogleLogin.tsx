// client\src\components\GoogleLogin.tsx
import { useEffect, useRef } from 'react';

interface GoogleLoginProps {
  onSuccess: (credential: string) => void;
  onError: () => void;
}

declare global {
  interface Window {
    google: any;
  }
}

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleLogin = ({ onSuccess, onError }: GoogleLoginProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  // On mount Render Google Sign-In button
  useEffect(() => {
    if (window.google && buttonRef.current) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        buttonRef.current,
        { theme: "outline", size: "large", width: "400px", borderRadius: "10px" }
      );
    }
  }, []);

  const handleCredentialResponse = (response: any) => {
    if (response.credential) {
      onSuccess(response.credential);
    } else {
      onError();
    }
  };

  return <div ref={buttonRef}></div>;
};

export default GoogleLogin;