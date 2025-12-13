import { useState, useRef, type KeyboardEvent, type ClipboardEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logiImg from '../assets/svgIcon/authImg.svg';
import icon from '../assets/svgIcon/logo.svg';
import logo from '../assets/svgIcon/textLogo.svg';
import { useVerifyOtpMutation, useForgotPasswordMutation } from '@/store/features/auth/forgetPasswordApi';

export default function OtpPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || '';

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useForgotPasswordMutation();

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // input handlers
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
    if (showError) setShowError(false);
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
    else if (e.key === 'ArrowLeft' && index > 0) inputRefs.current[index - 1]?.focus();
    else if (e.key === 'ArrowRight' && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      pastedData.split('').forEach((char, i) => { if (i < 6) newOtp[i] = char; });
      setOtp(newOtp);
      const lastIndex = Math.min(pastedData.length - 1, 5);
      inputRefs.current[lastIndex]?.focus();
    }
  };

  // ✅ OTP Submit
  const handleSubmit = async () => {
    if (!email) {
      setShowError(true);
      setErrorMessage('Email not found!');
      return;
    }

    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setShowError(true);
      setErrorMessage('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      const response = await verifyOtp({ email, otp: otpValue }).unwrap();
      console.log('OTP verified:', response);

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/createnew_pass', { state: { token: response.data?.token, email } });
      }, 1000);
    } catch (error: any) {
      console.error('OTP verify error:', error);
      setShowError(true);
      setErrorMessage(error?.data?.message || 'Invalid OTP, please try again');
    }
  };

  // ✅ Resend OTP
  const handleResend = async () => {
    if (!email) return;
    try {
      await resendOtp({ email }).unwrap();
      setOtp(new Array(6).fill(''));
      inputRefs.current[0]?.focus();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error: any) {
      console.error('Resend OTP error:', error);
      setShowError(true);
      setErrorMessage(error?.data?.message || 'Failed to resend OTP');
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F6F6]">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <h2 className="text-xl font-semibold text-[#171C35] mb-2">Email Not Found</h2>
          <p className="text-[#111A2D] mb-6">Please start from the forgot password page.</p>
          <button onClick={() => navigate('/forget_password')} className="px-6 py-3 bg-[#526FFF] text-white rounded-lg font-medium hover:bg-[#4158D9] transition">
            Go to Forgot Password
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex relative bg-[#F3F6F6]">
      {/* Left Side */}
      <div className="hidden rounded-[16px] p-[10px] lg:block lg:w-1/2 relative">
        <img src={logiImg} alt="Person smiling" className="w-full h-[930px] rounded-[16px] object-cover"/>
        <div style={{ boxShadow: `1px 1px 4px 0 rgba(0,0,0,0.05) inset, -6px -11px 18px 0 rgba(255,255,255,0.16) inset`, padding: "10px 10px 10px 30px", backdropFilter: "blur(5px)" }}
          className="fixed top-8 left-0 right-0 z-20 w-[95%]  bg-white/10 backdrop-blur-sm rounded-full px-9 py-4 flex items-center justify-between mx-auto">
          <div className="flex items-center gap-2"><img src={icon} alt="Logo"/><img src={logo} alt=""/></div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative">
        <div className="w-full max-w-md p-2 md:p-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#171C35] mb-4 sm:mb-5">{t('auth.otpPage.title')}</h1>
          <p className="text-[#111A2D] text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">{t('auth.otpPage.subtitle')} <span className="font-semibold">{email}</span></p>

          {showSuccess && <div className="bg-emerald-500 text-white px-4 py-3 rounded-[8px] mb-5 text-center font-medium">{t('auth.otpPage.successMessage')}</div>}
          {showError && <div className="bg-red-500 text-white px-4 py-3 rounded-[8px] mb-5 text-center font-medium">{errorMessage}</div>}

          <label className="block text-[#171C35] font-medium text-base mb-3">{t('auth.otpPage.otpLabel')}</label>
          <div className="flex justify-between gap-2 sm:gap-4 mb-6 sm:mb-8 flex-wrap">
            {otp.map((digit, index) => (
              <div key={index} className="w-10 sm:w-14 h-10 sm:h-14 text-[#111A2D] border-2 rounded-xl flex items-center justify-center">
                <input
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-full h-full text-center text-xl sm:text-2xl font-semibold outline-none text-[#111A2D] bg-transparent"
                  placeholder="-"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 sm:gap-6">
            <button onClick={handleSubmit} disabled={isVerifying} className="w-full py-3 bg-[#526FFF] text-white rounded-[8px] font-medium text-sm sm:text-base hover:bg-[#4255E0] transition">
              {isVerifying ? 'Verifying...' : t('auth.otpPage.submitButton')}
            </button>

            <p className="text-center text-[#171C35] text-sm mb-1 sm:mb-2">{t('auth.otpPage.didNotReceive')}</p>
            <button onClick={handleResend} disabled={isResending} className="w-full text-center text-[#526FFF] font-semibold text-sm sm:text-base hover:underline transition">
              {isResending ? 'Resending...' : t('auth.otpPage.resendButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




// import { useState, useRef, type KeyboardEvent, type ClipboardEvent } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

// import logiImg from '../assets/svgIcon/authImg.svg'
// import icon from '../assets/svgIcon/logo.svg'
// import logo from '../assets/svgIcon/textLogo.svg'

// export default function OtpPage() {
//   const { t } = useTranslation();
//   const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [showError, setShowError] = useState(false);
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
//   const navigate = useNavigate();

//   const handleChange = (index: number, value: string) => {
//     if (!/^\d*$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value.slice(-1);
//     setOtp(newOtp);
//     if (value && index < 5) inputRefs.current[index + 1]?.focus();
//   };

//   const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
//     else if (e.key === 'ArrowLeft' && index > 0) inputRefs.current[index - 1]?.focus();
//     else if (e.key === 'ArrowRight' && index < 5) inputRefs.current[index + 1]?.focus();
//   };

//   const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData('text').slice(0, 6);
//     if (/^\d+$/.test(pastedData)) {
//       const newOtp = [...otp];
//       pastedData.split('').forEach((char, i) => { if (i < 6) newOtp[i] = char; });
//       setOtp(newOtp);
//       const lastIndex = Math.min(pastedData.length - 1, 5);
//       inputRefs.current[lastIndex]?.focus();
//     }
//   };

//   const handleSubmit = () => {
//     const otpValue = otp.join('');
//     console.log('OTP Submitted:', otpValue);
//     setShowSuccess(true);
//     setShowError(false);
//     setTimeout(() => setShowSuccess(false), 3000);
//     navigate('/createnew_pass');
//   };

//   const handleResend = () => {
//     setOtp(new Array(6).fill(''));
//     setShowSuccess(false);
//     setShowError(false);
//     inputRefs.current[0]?.focus();
//     alert('OTP wurde erneut an Ihre E-Mail gesendet!');
//   };

//   return (
//     <div className="min-h-screen flex relative bg-[#F3F6F6]">
//       {/* Left Side */}
//       <div className="hidden rounded-[16px] p-[10px] lg:block lg:w-1/2 relative">
//         <img src={logiImg} alt="Person smiling" className="w-full h-[930px] rounded-[16px] object-cover"/>
//         <div style={{
//           boxShadow: `1px 1px 4px 0 rgba(0,0,0,0.05) inset, -6px -11px 18px 0 rgba(255,255,255,0.16) inset, 1px 1px 0 -0.4px #FFF inset, -1px -1px 0 -0.5px #FFF inset`,
//           padding: "10px 10px 10px 30px",
//           backdropFilter: "blur(5px)"
//         }}
//           className="fixed top-8 left-0 right-0 z-20 w-[95%]  bg-white/10 backdrop-blur-sm rounded-full px-9 py-4 flex items-center justify-between mx-auto">
//           <div className="flex items-center gap-2">
//             <img src={icon} alt="Logo"/>
//             <img src={logo} alt=""/>
//           </div>
//           <button className="px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition">
//             {t('auth.otpPage.login')}
//           </button>
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative">
//         <div className="absolute top-4 right-4 lg:hidden">
//           <button className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium">
//             {t('auth.otpPage.login')}
//           </button>
//         </div>

//         <div className="w-full max-w-md p-2 md:p-4">
//           <h1 className="text-3xl sm:text-4xl font-bold text-[#171C35] mb-4 sm:mb-5">
//             {t('auth.otpPage.title')}
//           </h1>

//           <p className="text-[#111A2D] text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
//             {t('auth.otpPage.subtitle')}
//           </p>

//           {showSuccess && (
//             <div className="bg-emerald-500 text-white px-4 py-3 rounded-[8px] mb-5 text-center font-medium">
//               {t('auth.otpPage.successMessage')}
//             </div>
//           )}
//           {showError && (
//             <div className="bg-red-500 text-white px-4 py-3 rounded-[8px] mb-5 text-center font-medium">
//               {t('auth.otpPage.errorMessage')}
//             </div>
//           )}

//           <label className="block text-[#171C35] font-medium text-base mb-3">{t('auth.otpPage.otpLabel')}</label>
//           <div className="flex justify-between gap-2 sm:gap-4 mb-6 sm:mb-8 flex-wrap">
//             {otp.map((digit, index) => (
//               <div key={index} className="w-10 sm:w-14 h-10 sm:h-14 text-[#111A2D] border-2 rounded-xl flex items-center justify-center">
//                 <input
//                   ref={(el) => { inputRefs.current[index] = el; }}
//                   type="text"
//                   inputMode="numeric"
//                   maxLength={1}
//                   value={digit}
//                   onChange={(e) => handleChange(index, e.target.value)}
//                   onKeyDown={(e) => handleKeyDown(index, e)}
//                   onPaste={handlePaste}
//                   className="w-full h-full text-center text-xl sm:text-2xl font-semibold outline-none text-[#111A2D] bg-transparent"
//                   placeholder="-"
//                 />
//               </div>
//             ))}
//           </div>

//           <div className="flex flex-col gap-4 sm:gap-6">
//             <button
//               onClick={handleSubmit}
//               className="w-full py-3 bg-[#526FFF] text-white rounded-[8px] font-medium text-sm sm:text-base hover:bg-[#4255E0] transition"
//             >
//               {t('auth.otpPage.submitButton')}
//             </button>

//             <p className="text-center text-[#171C35] text-sm mb-1 sm:mb-2">
//               {t('auth.otpPage.didNotReceive')}
//             </p>
//             <button
//               onClick={handleResend}
//               className="w-full text-center text-[#526FFF] font-semibold text-sm sm:text-base hover:underline transition"
//             >
//               {t('auth.otpPage.resendButton')}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
