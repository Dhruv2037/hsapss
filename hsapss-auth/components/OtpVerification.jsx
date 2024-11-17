import { useState } from 'react';
import axios from 'axios';

export default function OtpVerification({ phone, onVerified }) {
  const [otp, setOtp] = useState('');

  const handleVerifyOtp = async () => {
    try {
      const isLogin = false;
      await axios.post('/api/register/verify-otp', { phone, otp ,isLogin});
      onVerified();
    } catch (err) {
      console.error('OTP Verification Failed:', err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
    </div>
  );
}
