// import { useState,useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';

// export default function LoginWithOtp({phoneNo,isExistingUser}) {
//   const router = useRouter();
//   const [phone, setPhone] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isOtpSent,setOtpSent] = useState(false);
//   const isLogin = true;
  
// //   const handleLogin = async () => {
// //     try {
// //       await axios.post('/api/login/with-otp', { phone, otp });
// //       // Redirect to dashboard or home page
// //     } catch (err) {
// //       console.error('Login failed:', err.response.data.message);
// //     }
// //   };

// useEffect(()=>{
//   if(phoneNo)
//     setPhone(phoneNo);
// },[phoneNo]);
// console.log(phone); // This should now log the correct value
// console.log(isExistingUser); // This should log the correct value 
//   const handleSendOtp = async() =>{
//     try {
//         await axios.post('/api/register/send-otp', { phone,isLogin });
//         setOtpSent(true);
//       } catch (err) {
//         console.error('Error sending OTP:', err.response.data.message);
//       }
//   }

//   const handleVerifyOtp = async () => {
//     try {
//       const res = await axios.post('/api/register/verify-otp', { phone, otp, isLogin });
//       if(res.status === 200)
//         router.push('/Dashboard');
//     } catch (err) {
//       console.error('OTP Verification Failed:', err);
//     }
//   };
//   return (
//     <div>
//       <h2>Login with OTP</h2>
//       { !isOtpSent ? (
//         <div>
//         <input
//         type="text"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//         placeholder="Phone Number"
//       />
//       <button onClick={handleSendOtp}>Send OTP</button></div>
//     )  : (
//         <div>
//       <input
//         type="text"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         placeholder="Enter OTP"
//       />
//       <button onClick={handleVerifyOtp}>Login</button>
//     </div>)
// }
// </div>
//   );
// }


import { useState,useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function LoginWithOtp() {
    const router = useRouter();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent,setOtpSent] = useState(false);
  const isLogin = true;

//   const handleLogin = async () => {
//     try {
//       await axios.post('/api/login/with-otp', { phone, otp });
//       // Redirect to dashboard or home page
//     } catch (err) {
//       console.error('Login failed:', err.response.data.message);
//     }
//   };

useEffect(()=>{
  const fetchPhoneFromCookie = async () => {
    try {
      const response = await axios.get('/api/get-phone');
      setPhone(response.data.phone); // Store phone number in state
    } catch (error) {
      console.error('Error fetching phone:', error);
      setMessage('Unable to retrieve phone. Please log in again.');
    }
  };

  fetchPhoneFromCookie();
},[]);
  const handleSendOtp = async() =>{
    try {
        await axios.post('/api/register/send-otp', { phone,isLogin });
        setOtpSent(true);
      } catch (err) {
        console.error('Error sending OTP:', err.response.data.message);
      }
  }

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post('/api/register/verify-otp', { phone, otp, isLogin });
      if(res.status === 200)
        router.push('/Dashboard');
    } catch (err) {
      console.error('OTP Verification Failed:', err);
    }
  };
  return (
    <div>
      <h2>Login with OTP</h2>
      { !isOtpSent ? (
        <div>
        <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
      />
      <button onClick={handleSendOtp}>Send OTP</button></div>
    )  : (
        <div>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={handleVerifyOtp}>Login</button>
    </div>)
}
</div>
  );
}