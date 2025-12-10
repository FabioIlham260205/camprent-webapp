import React, { useEffect, useRef, useState } from 'react';
import { Tent, AlertCircle } from 'lucide-react';
import { User } from '../types';
import { GOOGLE_CLIENT_ID } from '../constants';

interface LoginProps {
  onLoginSuccess: (user: User) => void;
}

// Simple JWT decoder helper
const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to parse JWT", e);
    return null;
  }
};

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const buttonDiv = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Basic validation
    if (!GOOGLE_CLIENT_ID) {
      setError("Konfigurasi Error: GOOGLE_CLIENT_ID kosong di constants.ts");
      return;
    }

    const initializeGoogleSignIn = () => {
      if (!(window as any).google) return;
      
      try {
        (window as any).google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response: any) => {
            if (response.credential) {
              const payload = parseJwt(response.credential);
              if (payload) {
                const user: User = {
                  id: payload.sub,
                  name: payload.name,
                  email: payload.email,
                  avatarUrl: payload.picture,
                };
                onLoginSuccess(user);
              } else {
                setError("Gagal membaca data login.");
              }
            }
          },
        });

        if (buttonDiv.current) {
          (window as any).google.accounts.id.renderButton(
            buttonDiv.current,
            { theme: 'outline', size: 'large', width: '250', text: 'signin_with' }
          );
        }
      } catch (err) {
        console.error("Google Sign-in Error:", err);
        setError("Gagal inisialisasi Google Sign-In.");
      }
    };

    // Check if script is loaded, if not wait for it
    if ((window as any).google) {
      initializeGoogleSignIn();
    } else {
       // Retry mechanism
       const interval = setInterval(() => {
         if ((window as any).google) {
           clearInterval(interval);
           initializeGoogleSignIn();
         }
       }, 500);

       // Cleanup after 10 seconds to avoid infinite checking
       const timeout = setTimeout(() => {
          clearInterval(interval);
          if (!(window as any).google) {
             setError("Script Google Sign-In tidak terdeteksi. Periksa koneksi internet.");
          }
       }, 10000);

       return () => {
         clearInterval(interval);
         clearTimeout(timeout);
       };
    }
  }, [onLoginSuccess]);

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-emerald-900/60 backdrop-blur-sm"></div>
      
      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">
        <div className="p-8 text-center">
          <div className="mx-auto bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Tent className="h-8 w-8 text-emerald-600" />
          </div>
          
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">CampRent</h1>
          <p className="text-gray-500 mb-8">Sewa Alat Camping Terbaik</p>

          <div className="flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in-95 min-h-[60px]">
             <div ref={buttonDiv}></div>
          </div>
          
          {error && (
            <div className="flex items-center text-red-600 text-sm mt-6 bg-red-50 p-3 rounded-lg w-full text-left border border-red-100">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 p-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">&copy; 2024 CampRent</p>
        </div>
      </div>
    </div>
  );
};

export default Login;