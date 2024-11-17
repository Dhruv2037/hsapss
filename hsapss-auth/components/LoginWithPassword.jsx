import { useState } from 'react';
import axios from 'axios';
//import Cookies from 'js-cookie';

export default function LoginWithPassword() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await axios.post('/api/login/with-password', { phone, password });
      // Redirect to dashboard or home page
      // After login success
//Cookies.set('session_token', response.data.token, { expires: 1 }); // Expires in 1 day

    } catch (err) {
      console.error('Login failed:', err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login with Password</h2>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
