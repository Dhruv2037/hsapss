import { useState , useEffect } from 'react';
import { useRouter } from 'next/router';
import PhoneNumberInput from '../components/PhoneNumber';
import OtpVerification from '../components/OtpVerification';
import SetPassword from '../components/SetPassword';

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [isExistingUser,setIsExistingUser] = useState(false);


  // useEffect(()=>{

  //   const token = document.cookie.split('; ').find(row => row.startsWith('token='));
  //   console.log("Token:", token);
  //   if (!token) {
  //     // If no token, redirect to sign-in page
  //     router.push('/signin');
  //   } else {
  //     // Simulate token verification (e.g., make an API request to verify the token)
  //     router.push('/Dashboard');
  //   }
  // }, [router]);

  const onOtpSent = (phone,isExistingUser) => {
    setPhone(phone);
    setIsExistingUser(isExistingUser);
    const data ={phoneNo:phone,isExistingUser}
    //console.log(data);
    if(isExistingUser){ 
      router.push({pathname:'/signin',query:data});
    }
    setStep(2);
  };

  const onVerified = () => setStep(3);
  const onPasswordSet = () =>{
    (window.location.href = '/Dashboard')
    
};

  return (
    <>
      {step === 1 && <PhoneNumberInput onOtpSent={onOtpSent} />}
      {step === 2 && <OtpVerification phone={phone} onVerified={onVerified} />}
      {step === 3 && <SetPassword phone={phone} onPasswordSet={onPasswordSet} />}
    </>
  );
}
