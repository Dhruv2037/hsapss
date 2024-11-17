import { useState } from 'react';
import axios from 'axios';

export default function SetPassword({ phone, onPasswordSet }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSetPassword = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await axios.post('/api/register/set-password', { phone, password });
      onPasswordSet();
    } catch (err) {
      console.error('Error setting password:', err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Set Password</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Re-enter Password"
      />
      <button onClick={handleSetPassword}>Set Password</button>
    </div>
  );
}
