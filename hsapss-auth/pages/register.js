import { useState , useEffect } from 'react';
import { useRouter } from 'next/router';
import PhoneNumberInput from '../components/PhoneNumber';
import OtpVerification from '../components/OtpVerification';
import SetPassword from '../components/SetPassword';
import ProfileForm from "../components/ProfileForm";

export default function Register({stepNo=1,phoneNo=''}) {
  const router = useRouter();
  const [step, setStep] = useState(stepNo);
  const [phone, setPhone] = useState(phoneNo);
  const [isExistingUser,setIsExistingUser] = useState(false);


  // useEffect(()=>{

  //   const token = document.cookie.split('; ').find(row => row.startsWith('token='));
  //   console.log("Token:", token);
  //   if (!token) {
  //     // If no token, redirect to sign-in page
  //     router.push('/register');
  //   } else {
  //     // Simulate token verification (e.g., make an API request to verify the token)
  //     router.push('/Dashboard');
  //   }
  // }, [router]);

  useEffect(()=>{
    if(step == 5)
      onProfileSet();
  },[step]);

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
    setStep(4);
    
};

const onProfileSet = () =>{
  (window.location.href = '/Dashboard')
  
};

  return (
    <>
      {step === 1 && <PhoneNumberInput onOtpSent={onOtpSent} />}
      {step === 2 && <OtpVerification phone={phone} onVerified={onVerified} />}
      {step === 3 && <SetPassword phone={phone} onPasswordSet={onPasswordSet} />}
      {step === 4 && <ProfileForm phone={phone} onProfileSet={onProfileSet} />}
    </>
  );
}
