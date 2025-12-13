import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


import icon from '../assets/svgIcon/logo.svg';
import logo from '../assets/svgIcon/textLogo.svg';
import logiImg from '../assets/svgIcon/authImg.svg';
import { useForgotPasswordMutation } from "@/store/features/auth/forgetPasswordApi";

export default function ForgetPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // ✅ RTK Query mutation
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ✅ Validation
    if (!email) {
      setError(t('auth.forgetPasswordPage.emailRequired') || 'Email is required');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t('auth.forgetPasswordPage.invalidEmail') || 'Invalid email format');
      return;
    }

    try {
      setError("");
      setSuccessMessage("");
      
      // ✅ Call API
      const response = await forgotPassword({ email }).unwrap();
      
      console.log('Forgot password response:', response);
      
      // ✅ Show success message
      setSuccessMessage(response.message || 'OTP sent successfully!');
      
      // ✅ Navigate to OTP page after 1 second
      setTimeout(() => {
        navigate('/otp', { state: { email } }); // Pass email to OTP page
      }, 1000);
      
    } catch (error: any) {
      console.error('Forgot password error:', error);
      
      const errorMsg = error?.data?.message || 
                      t('auth.forgetPasswordPage.errorMessage') || 
                      'Failed to send OTP. Please try again.';
      
      setError(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex relative bg-[#F3F6F6]">
      {/* Left Side */}
      <div className="hidden p-[10px] rounded-[16px] lg:block lg:w-1/2 relative">
        <img src={logiImg} alt="Person smiling" className="w-full h-[930px] rounded-[16px] object-cover" />
        <div style={{
          boxShadow: `1px 1px 4px 0 rgba(0,0,0,0.05) inset, -6px -11px 18px 0 rgba(255,255,255,0.16) inset, 1px 1px 0 -0.4px #FFF inset, -1px -1px 0 -0.5px #FFF inset`,
          padding: "10px 10px 10px 30px",
          backdropFilter: "blur(5px)"
        }}
          className="fixed top-8 left-0 right-0 z-20 w-[95%] bg-white/10 backdrop-blur-sm rounded-full px-9 py-4 flex items-center justify-between mx-auto"
        >
          <div className="flex items-center gap-2">
            <img src={icon} alt="Logo" />
            <img src={logo} alt="" />
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition cursor-pointer"
          >
            {t('auth.forgetPasswordPage.login')}
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="w-full max-w-md">
          <div className="absolute top-8 right-8 lg:hidden">
            <button 
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium cursor-pointer"
            >
              {t('auth.forgetPasswordPage.login')}
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-semibold text-[#171C35] mb-2">
                {t('auth.forgetPasswordPage.title')}
              </h1>
              <p className="text-[#111A2D] text-base">
                {t('auth.forgetPasswordPage.subtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* ✅ Success Message */}
              {successMessage && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-600">{successMessage}</p>
                </div>
              )}

              {/* ✅ Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#171C35] mb-2">
                  {t('auth.forgetPasswordPage.email')}
                </label>
                <input
                  type="email"
                  placeholder={t('auth.forgetPasswordPage.emailPlaceholder')}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(""); // Clear error on input
                  }}
                  className="w-full px-4 py-3 rounded-[8px] text-[#111A2D] border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:opacity-50"
                  disabled={isLoading}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#526FFF] text-white rounded-[8px] font-medium transition-colors cursor-pointer hover:bg-[#4158D9] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading 
                  ? t('auth.forgetPasswordPage.sending') || 'Sending...'
                  : t('auth.forgetPasswordPage.sendVerification')
                }
              </button>
            </form>

            {/* ✅ Back to login link */}
            <div className="text-center">
              <button
                onClick={() => navigate('/login')}
                className="text-sm text-[#526FFF] hover:underline cursor-pointer"
              >
                {t('auth.forgetPasswordPage.backToLogin') || 'Back to Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// import icon from '../assets/svgIcon/logo.svg';
// import logo from '../assets/svgIcon/textLogo.svg';
// import logiImg from '../assets/svgIcon/authImg.svg';

// export default function ForgetPasswordPage() {
//   const { t } = useTranslation();
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = () => {
//     navigate('/otp');
//   };

//   return (
//     <div className="min-h-screen flex relative bg-[#F3F6F6]">
//       {/* Left Side */}
//       <div className="hidden p-[10px] rounded-[16px] lg:block lg:w-1/2 relative">
//         <img src={logiImg} alt="Person smiling" className="w-full h-[930px] rounded-[16px] object-cover" />
//         <div style={{
//           boxShadow: `1px 1px 4px 0 rgba(0,0,0,0.05) inset, -6px -11px 18px 0 rgba(255,255,255,0.16) inset, 1px 1px 0 -0.4px #FFF inset, -1px -1px 0 -0.5px #FFF inset`,
//           padding: "10px 10px 10px 30px",
//           backdropFilter: "blur(5px)"
//         }}
//           className="fixed top-8 left-0 right-0 z-20 w-[95%] bg-white/10 backdrop-blur-sm rounded-full px-9 py-4 flex items-center justify-between mx-auto"
//         >
//           <div className="flex items-center gap-2">
//             <img src={icon} alt="Logo" />
//             <img src={logo} alt="" />
//           </div>
//           <button className="px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition">
//             {t('auth.forgetPasswordPage.login')}
//           </button>
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
//         <div className="w-full max-w-md">
//           <div className="absolute top-8 right-8 lg:hidden">
//             <button className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium">
//               {t('auth.forgetPasswordPage.login')}
//             </button>
//           </div>

//           <div className="space-y-6">
//             <div>
//               <h1 className="text-4xl font-semibold text-[#171C35] mb-2">{t('auth.forgetPasswordPage.title')}</h1>
//               <p className="text-[#111A2D] text-base">{t('auth.forgetPasswordPage.subtitle')}</p>
//             </div>

//             <div className="space-y-5">
//               <div>
//                 <label className="block text-sm font-medium text-[#171C35] mb-2">{t('auth.forgetPasswordPage.email')}</label>
//                 <input
//                   type="text"
//                   placeholder={t('auth.forgetPasswordPage.emailPlaceholder')}
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-4 py-3 rounded-[8px] text-[#111A2D] border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                 />
//               </div>

//               <button
//                 onClick={handleSubmit}
//                 className="w-full py-3 bg-[#526FFF] text-white rounded-[8px] font-medium transition-colors cursor-pointer"
//               >
//                 {t('auth.forgetPasswordPage.sendVerification')}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
