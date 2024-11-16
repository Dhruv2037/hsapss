import { useState } from 'react';
import PhoneNumberInput from '../components/PhoneNumber';
import OtpVerification from '../components/OtpVerification';
import SetPassword from '../components/SetPassword';

export default function Register() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');

  const onOtpSent = (phone) => {
    setPhone(phone);
    setStep(2);
  };

  const onVerified = () => setStep(3);
  const onPasswordSet = () => (window.location.href = '/sign-in');

  return (
    <>
      {step === 1 && <PhoneNumberInput onOtpSent={onOtpSent} />}
      {step === 2 && <OtpVerification phone={phone} onVerified={onVerified} />}
      {step === 3 && <SetPassword phone={phone} onPasswordSet={onPasswordSet} />}
    </>
  );
}
