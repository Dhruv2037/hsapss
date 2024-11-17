// pages/signin.js
import { useState } from 'react';
import OtpForm from '../components/LoginWithOtp';
import PasswordForm from '../components/LoginWithPassword';

export default function SignIn() {
  const [authMethod, setAuthMethod] = useState(null); // 'otp' or 'password'
 // const [isOtpVerified, setIsOtpVerified] = useState(false);


 useEffect(() => {
    // Check if the token exists in the cookies
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    console.log("Token:", token);
    if (!token) {
      // If no token, redirect to sign-in page
      router.push('/signin');
    } else {
      // Simulate token verification (e.g., make an API request to verify the token)
      setLoading(false);
    }
  }, [router]);
  
  const handleOtpVerified = () => {
    setIsOtpVerified(true);
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>

      {/* Buttons to choose authentication method */}
      {!authMethod ? (
        <div>
          <button onClick={() => setAuthMethod('otp')}>Sign in with OTP</button>
          <button onClick={() => setAuthMethod('password')}>Sign in with Password</button>
        </div>
      ) : (
        // Show corresponding form based on the selected authentication method
        authMethod === 'otp' ? (
          <OtpForm onOtpVerified={handleOtpVerified} />
        ) : (
          <PasswordForm />
        )
      )}
    </div>
  );
}
