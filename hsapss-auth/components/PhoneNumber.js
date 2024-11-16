import { useState } from 'react';
import axios from 'axios';

export default function PhoneNumberInput({ onOtpSent }) {
  const [phone, setPhone] = useState('');

  const handleSendOtp = async () => {
    try {
      await axios.post('/api/register/send-otp', { phone });
      onOtpSent(phone);
    } catch (err) {
      console.error('Error sending OTP:', err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Enter Phone Number</h2>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
      />
      <button onClick={handleSendOtp}>Send OTP</button>
    </div>
  );
}
