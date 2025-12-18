import { useState, useRef } from 'react';
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
  const email = (location.state as any)?.email || '';

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useForgotPasswordMutation();

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
    if (error) setError('');
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleSubmit = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter 6-digit OTP');
      return;
    }

    try {
      const response = await verifyOtp({ email, otp: otpValue }).unwrap();

      // ✅ Debug log
      console.log('OTP verify response:', response);
      console.log('Token:', response.data?.token);

      // ✅ Save token in localStorage for reference (development only)
      localStorage.setItem('resetToken', response.data?.token || '');

      setSuccess('OTP verified!');
      setTimeout(() => {
        navigate('/createnew_pass', { state: { email } });
      }, 1000);

    } catch (err: any) {
      setError(err?.data?.message || 'Invalid OTP');
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp({ email }).unwrap();
      setOtp(new Array(6).fill(''));
      inputRefs.current[0]?.focus();
      setSuccess('OTP resent!');
      setTimeout(() => setSuccess(''), 2000);
    } catch (err: any) {
      setError(err?.data?.message || 'Failed to resend OTP');
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F6F6]">
        <div className="bg-white p-8 rounded-2xl max-w-md w-full text-center">
          <h2 className="text-xl font-semibold mb-4">Email Not Found</h2>
          <button 
            onClick={() => navigate('/forget_password')} 
            className="px-6 py-3 bg-[#526FFF] text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F3F6F6]">
      {/* Left */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img src={logiImg} alt="Auth" className="w-full h-[930px] object-cover rounded-[16px]"/>
        <div style={{ boxShadow: `1px 1px 4px 0 rgba(0,0,0,0.05) inset`, padding: "10px 10px 10px 30px", backdropFilter: "blur(5px)" }}
          className="fixed top-8 left-0 right-0 z-20 w-[95%] bg-white/10 rounded-full px-9 py-4 flex items-center gap-2 mx-auto">
          <img src={icon} alt="Logo"/><img src={logo} alt="Logo"/>
        </div>
      </div>

      {/* Right */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-[#171C35] mb-4">{t('auth.otpPage.title')}</h1>
          <p className="text-[#111A2D] mb-6">
            {t('auth.otpPage.subtitle')} <span className="font-semibold">{email}</span>
          </p>

          {success && <div className="bg-green-500 text-white px-4 py-3 rounded-lg mb-5 text-center">{success}</div>}
          {error && <div className="bg-red-500 text-white px-4 py-3 rounded-lg mb-5 text-center">{error}</div>}

          <label className="block text-[#171C35] font-medium mb-3">{t('auth.otpPage.otpLabel')}</label>
          <div className="flex justify-between gap-4 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 border-2 rounded-xl text-center text-2xl font-semibold outline-none"
                placeholder="-"
              />
            ))}
          </div>

          <button 
            onClick={handleSubmit} 
            disabled={isVerifying}
            className="w-full py-3 bg-[#526FFF] text-white rounded-lg font-medium hover:bg-[#4158D9] disabled:opacity-50 mb-3"
          >
            {isVerifying ? 'Verifying...' : t('auth.otpPage.submitButton')}
          </button>

          <button 
            onClick={handleResend} 
            disabled={isResending}
            className="w-full text-[#526FFF] font-semibold hover:underline"
          >
            {isResending ? 'Resending...' : t('auth.otpPage.resendButton')}
          </button>

          {/* 🔹 Development token display */}
          {process.env.NODE_ENV === 'development' && (
            <p className="mt-4 text-sm text-gray-500">Token: {localStorage.getItem('resetToken')}</p>
          )}
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
