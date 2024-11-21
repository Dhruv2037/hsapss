import { useState } from 'react';
import axios from 'axios';

export default function PhoneNumberInput({ onOtpSent }) {
  const [phone, setPhone] = useState('');
  const isLogin = false; // check for login or register

  const handleSendOtp = async () => {
    try {
      const res = await axios.post('/api/register/send-otp', { phone,isLogin });
      if(res.status === 200 )
        onOtpSent(phone);
      else
        console.log(res.data.message);
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
