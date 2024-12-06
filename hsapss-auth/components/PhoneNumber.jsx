// import { useState } from 'react';
// import axios from 'axios';
// import {useRouter} from 'next/router';

// export default function PhoneNumberInput({ onOtpSent }) {
//   const router = useRouter();
//   const [phone, setPhone] = useState('');
//   const [isExistingUser,setIsExistingUser] = useState(false);
//   const isLogin = false; // check for login or register

//   // const handleSendOtp = async () => {
//   //   try {

//   //     const res = await axios.post('/api/register/send-otp', { phone,isLogin });
//   //     if(res.status === 200 )
//   //       onOtpSent(phone);
//   //     else if (res.status === 409) { // Handle "already registered" case
//   //       console.log(res.data.message);
//   //       router.push("/signin");
//   //   }
//   //     else
//   //       console.log(res.data.message);
//   //   } catch (err) {
//   //     console.error('Error sending OTP:', err.response.data.message);
//   //   }
//   // };

//   const handleSendOtp = async () => {
//     try {
//         const res = await axios.post('/api/register/send-otp', 
//             { phone, isLogin }, 
//             {
//                 validateStatus: (status) => {
//                     // Treat 200 and 409 as successful responses
//                     return status === 200 || status === 409;
//                 },
//             }
//         );

//         if (res.status === 200) {
//             onOtpSent(phone,isExistingUser);
//         } else if (res.status === 409) {
//             console.log(res.data.message);
//             const updatedExistingUser = true; // Directly use the updated value
//             setIsExistingUser(updatedExistingUser);
//             console.log(isExistingUser);
//             onOtpSent(phone,updatedExistingUser);
//             router.push("/signin");
//         }
//     } catch (err) {
//         console.error('Error sending OTP:', err.response?.data?.message || err.message);
//     }
// };


//   return (
//     <div>
//       <h2>Enter Phone Number</h2>
//       <input
//         type="text"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//         placeholder="Phone Number"
//       />
//       <button onClick={handleSendOtp}>Send OTP</button>
//     </div>
//   );
// }

import { useState } from 'react';
import axios from 'axios';

export default function PhoneNumberInput({onOtpSent}) {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleCheckRegistration = async () => {
    try {
      const response = await axios.post('/api/register/check-registration', { phone });
      const { isExistingUser } = response.data;

      if (isExistingUser) {
        setMessage('User exists. Redirecting to sign-in...');
        window.location.href = '/signin';
      } else {
        setMessage('User does not exist. Redirecting to registration...');
        //window.location.href = '/register';
        await handleSendOtp();
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage(error.response?.data?.error || 'An error occurred.');
    }
  };

  const handleSendOtp = async () => {
    try {
      console.log("sending otp......");
      const res = await axios.post('/api/register/send-otp', { phone });
      console.log("res:",res);
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
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleCheckRegistration}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
}
