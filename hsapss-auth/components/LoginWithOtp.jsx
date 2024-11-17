import { useState } from 'react';
import axios from 'axios';

export default function LoginWithOtp() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleLogin = async () => {
    try {
      await axios.post('/api/login/with-otp', { phone, otp });
      // Redirect to dashboard or home page
    } catch (err) {
      console.error('Login failed:', err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login with OTP</h2>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
      />
      <button onClick={handleLogin}>Send OTP</button>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
