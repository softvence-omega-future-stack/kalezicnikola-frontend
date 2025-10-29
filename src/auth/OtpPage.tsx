

// import { useNavigate } from "react-router-dom";

import  { useState, useRef, type KeyboardEvent, type ClipboardEvent,  } from 'react';
import { useNavigate } from 'react-router-dom';


export default function OtpPage() {
//   const [email, setEmail] = useState("");
// const navigate = useNavigate()

//   const handleSubmit = () => {
//     navigate('/otp')
//   };

 const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate()

  const handleChange = (index: number, value: string): void => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);

    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      pastedData.split('').forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
      
      const lastIndex = Math.min(pastedData.length - 1, 5);
      inputRefs.current[lastIndex]?.focus();
    }
  };

  const handleSubmit = (): void => {
    const otpValue = otp.join('');
    console.log('OTP Submitted:', otpValue);
    
    setShowSuccess(true);
    setShowError(false);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
    navigate('/createnew_pass')
  };

  const handleResend = (): void => {
    setOtp(new Array(6).fill(''));
    setShowSuccess(false);
    setShowError(false);
    inputRefs.current[0]?.focus();
    alert('OTP has been resent to your email!');
  };

//   const isComplete = otp.every(digit => digit !== '');
  return (
    <div className=" flex relative bg-[#F3F6F6]">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://i.ibb.co.com/v6CxNtR7/loginImg.png"
          alt="Person smiling"
          className="w-full h-[930px] rounded-[16px] p-[10px] object-cover"
        />

          {/* Fixed Border Box (DocLine + Login Btn) */}
        <div className="fixed top-8 left-0 right-0 z-20 w-[95%] border border-gray-100 bg-white/10 backdrop-blur-sm rounded-full px-9 py-4 flex items-center justify-between mx-auto">
          <div className="flex items-center gap-2">
            <img src="https://i.ibb.co.com/0yzBCxRm/logo.png" alt="" />
            <span className="text-2xl font-semibold text-[#171C35]">Docline</span>
          </div>
          <button className="px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition">
            Login
          </button>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50 relative">
        <div className="w-full max-w-md">
         

          {/* Login Button Top Right (for mobile) */}
          <div className="absolute top-8 right-8 lg:hidden">
            <button className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium">
              Login
            </button>
          </div>

               <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50 relative">
        <div className="w-full max-w-md"></div>
           <div className=" rounded-3xl  p-10  ">
        <h1 className="text-4xl font-bold text-[#171C35] mb-5">OTP</h1>
        
        <p className="text-[#111A2D] text-base mb-8 leading-relaxed">
          Please enter the Six digit One time password we sent to your email to confirm its you
        </p>

        {showSuccess && (
          <div className="bg-emerald-500 text-white px-4 py-3 rounded-[8px] mb-5 text-center font-medium">
            OTP Verified Successfully!
          </div>
        )}

        {showError && (
          <div className="bg-red-500 text-white px-4 py-3 rounded-[8px] mb-5 text-center font-medium">
            Invalid OTP. Please try again.
          </div>
        )}

        <label className="block text-[#171C35] font-medium text-base mb-3">OTP</label>
        
<div className="flex justify-between gap-4 mb-8">
  {otp.map((digit, index) => (
    <div key={index} className="w-14 h-14 text-[#111A2D] border-2 rounded-xl flex items-center justify-center">
      <input
        ref={el => {
    inputRefs.current[index] = el;
  }}
        type="text"
        inputMode="numeric"
        maxLength={1}
        value={digit}
        onChange={(e) => handleChange(index, e.target.value)}
        onKeyDown={(e) => handleKeyDown(index, e)}
        onPaste={handlePaste}
        className="w-full h-full text-center text-2xl font-semibold outline-none text-[#111A2D] bg-transparent"
        placeholder="-"  // Dash centered inside box
      />
    </div>
  ))}
</div>



       <div className='flex flex-col gap-6'>
         <button
                onClick={handleSubmit}
                className="w-full py-3 bg-[#526FFF] text-white rounded-[8px] font-medium  transition-colors cursor-pointer"
              >
                Submit OTP
              </button> 

        <p className="text-center text-[#171C35]  text-sm mb-2">
          Did not receive OTP?
        </p>
        
        <button
          onClick={handleResend}
          className="block w-full text-center text-[#526FFF] font-semibold text-base  hover:underline transition-colors"
        >
          Send OTP Again
        </button>
       </div>
      </div>
      </div>
      </div>
        </div>
      </div>
   
  );
}


