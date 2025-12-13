import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import eye from '../assets/svgIcon/Eye.svg'
import eyeof from '../assets/svgIcon/EyeOff.svg'
import logiImg from '../assets/svgIcon/authImg.svg'
import icon from '../assets/svgIcon/logo.svg'
import logo from '../assets/svgIcon/textLogo.svg'

export default function CreateNewPassword() {
  const { t } = useTranslation();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen relative bg-[#F3F6F6]">
      {/* Left Side */}
      <div className="hidden rounded-[16px] p-[10px] lg:block lg:w-1/2 relative">
        <img src={logiImg} alt="Person smiling" className="w-full h-[930px] rounded-[16px] object-cover"/>
        <div style={{
          boxShadow: `1px 1px 4px 0 rgba(0,0,0,0.05) inset, -6px -11px 18px 0 rgba(255,255,255,0.16) inset, 1px 1px 0 -0.4px #FFF inset, -1px -1px 0 -0.5px #FFF inset`,
          padding: "10px 10px 10px 30px",
          backdropFilter: "blur(5px)"
        }} className="fixed top-8 left-0 right-0 z-20 w-[95%] bg-white/10 backdrop-blur-sm rounded-full px-9 py-4 flex items-center justify-between mx-auto">
          <div className="flex items-center gap-2">
            <img src={icon} alt="Logo"/>
            <img src={logo} alt=""/>
          </div>
          <button className="px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition">
            {t('auth.createNewPasswordPage.login')}
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="w-full max-w-md">
          <div className="absolute top-8 right-8 lg:hidden">
            <button className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium">
              {t('auth.createNewPasswordPage.login')}
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-[#171C35] mb-2">
                {t('auth.createNewPasswordPage.title')}
              </h1>
              <p className="text-[#111A2D] text-base">
                {t('auth.createNewPasswordPage.subtitle')}
              </p>
            </div>

            <div className="space-y-5">
              {/* Password */}
              <div>
                <label className="block text-base font-medium text-[#111A2D] mb-2">
                  {t('auth.createNewPasswordPage.passwordLabel')}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t('auth.createNewPasswordPage.placeholder')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-[8px] border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <img src={showPassword ? eye : eyeof} alt="toggle" />
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-base font-medium text-[#111A2D] mb-2">
                  {t('auth.createNewPasswordPage.confirmPasswordLabel')}
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t('auth.createNewPasswordPage.placeholder')}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-[8px] border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <img src={showConfirmPassword ? eye : eyeof} alt="toggle" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => navigate('/successfull_pass')}
                className="w-full py-3 bg-[#526FFF] text-white rounded-[8px] font-medium transition-colors cursor-pointer"
              >
                {t('auth.createNewPasswordPage.saveButton')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import { useState, FormEvent } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import eye from '../assets/svgIcon/Eye.svg'
// import eyeof from '../assets/svgIcon/EyeOff.svg'
// import logiImg from '../assets/svgIcon/authImg.svg'
// import icon from '../assets/svgIcon/logo.svg'
// import logo from '../assets/svgIcon/textLogo.svg'
// import { useResetPasswordMutation } from "@/store/features/auth/forgetPasswordApi";

// export default function CreateNewPassword() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ✅ Get email + otp from navigation state
//   const email = location.state?.email || '';
//   const otp = location.state?.otp || '';

//   // ✅ RTK Query mutation
//   const [resetPassword, { isLoading }] = useResetPasswordMutation();

//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');

//   // ✅ Debug logs
//   console.log('Email received:', email);
//   console.log('OTP received:', otp);

//   // ✅ Handle form submission
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setError('');

//     // Validation
//     if (!password || !confirmPassword) {
//       setError(t('auth.createNewPasswordPage.allFieldsRequired') || 'All fields are required');
//       return;
//     }

//     if (password.length < 8) {
//       setError(t('auth.createNewPasswordPage.passwordTooShort') || 'Password must be at least 8 characters');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError(t('auth.createNewPasswordPage.passwordMismatch') || 'Passwords do not match');
//       return;
//     }

//     if (!email || !otp) {
//       setError('Invalid session. Please restart the password reset process.');
//       setTimeout(() => navigate('/forget_password'), 2000);
//       return;
//     }

//     try {
//       console.log('Sending reset password request:', { email, otp, newPassword: '***' });
      
//       // ✅ Call API with email + otp + newPassword
//       const response = await resetPassword({ 
//         email,
//         otp,
//         newPassword: password 
//       }).unwrap();

//       console.log('✅ Password reset successful:', response);

//       // ✅ Navigate to success page
//       navigate('/successfull_pass');
      
//     } catch (err: any) {
//       console.error('❌ Password reset error:', err);
//       console.error('Error details:', {
//         status: err?.status,
//         data: err?.data,
//         message: err?.data?.message
//       });
      
//       const errorMsg = err?.data?.message || 
//                       t('auth.createNewPasswordPage.errorMessage') || 
//                       'Failed to reset password. Please try again.';
      
//       setError(errorMsg);

//       // If OTP is invalid/expired, redirect to forgot password
//       if (err?.status === 401 || err?.status === 400) {
//         setTimeout(() => navigate('/forget_password'), 3000);
//       }
//     }
//   };

//   // ✅ Redirect if no email/otp
//   if (!email || !otp) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#F3F6F6]">
//         <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
//           <h2 className="text-xl font-semibold text-[#171C35] mb-2">Invalid Session</h2>
//           <p className="text-[#111A2D] mb-6">Please start from the forgot password page.</p>
//           <button 
//             onClick={() => navigate('/forget_password')} 
//             className="px-6 py-3 bg-[#526FFF] text-white rounded-lg font-medium hover:bg-[#4158D9] transition cursor-pointer"
//           >
//             Go to Forgot Password
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen relative bg-[#F3F6F6]">
//       {/* Left Side */}
//       <div className="hidden rounded-[16px] p-[10px] lg:block lg:w-1/2 relative">
//         <img src={logiImg} alt="Person smiling" className="w-full h-[930px] rounded-[16px] object-cover"/>
//         <div style={{
//           boxShadow: `1px 1px 4px 0 rgba(0,0,0,0.05) inset, -6px -11px 18px 0 rgba(255,255,255,0.16) inset, 1px 1px 0 -0.4px #FFF inset, -1px -1px 0 -0.5px #FFF inset`,
//           padding: "10px 10px 10px 30px",
//           backdropFilter: "blur(5px)"
//         }} className="fixed top-8 left-0 right-0 z-20 w-[95%] bg-white/10 backdrop-blur-sm rounded-full px-9 py-4 flex items-center justify-between mx-auto">
//           <div className="flex items-center gap-2">
//             <img src={icon} alt="Logo"/>
//             <img src={logo} alt=""/>
//           </div>
//           <button 
//             onClick={() => navigate('/login')}
//             className="px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition cursor-pointer"
//           >
//             {t('auth.createNewPasswordPage.login')}
//           </button>
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
//         <div className="w-full max-w-md">
//           <div className="absolute top-8 right-8 lg:hidden">
//             <button 
//               onClick={() => navigate('/login')}
//               className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium cursor-pointer"
//             >
//               {t('auth.createNewPasswordPage.login')}
//             </button>
//           </div>

//           <div className="space-y-6">
//             <div>
//               <h1 className="text-4xl font-bold text-[#171C35] mb-2">
//                 {t('auth.createNewPasswordPage.title')}
//               </h1>
//               <p className="text-[#111A2D] text-base">
//                 {t('auth.createNewPasswordPage.subtitle')}
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-5">
//               {/* ✅ Error Message */}
//               {error && (
//                 <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
//                   <p className="text-sm text-red-600">{error}</p>
//                 </div>
//               )}

//               {/* Password */}
//               <div>
//                 <label className="block text-base font-medium text-[#111A2D] mb-2">
//                   {t('auth.createNewPasswordPage.passwordLabel')}
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder={t('auth.createNewPasswordPage.placeholder')}
//                     value={password}
//                     onChange={(e) => {
//                       setPassword(e.target.value);
//                       setError('');
//                     }}
//                     className="w-full px-4 py-3 rounded-[8px] border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pr-12 disabled:opacity-50"
//                     disabled={isLoading}
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     disabled={isLoading}
//                   >
//                     <img src={showPassword ? eye : eyeof} alt="toggle" />
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <label className="block text-base font-medium text-[#111A2D] mb-2">
//                   {t('auth.createNewPasswordPage.confirmPasswordLabel')}
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder={t('auth.createNewPasswordPage.placeholder')}
//                     value={confirmPassword}
//                     onChange={(e) => {
//                       setConfirmPassword(e.target.value);
//                       setError('');
//                     }}
//                     className="w-full px-4 py-3 rounded-[8px] border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pr-12 disabled:opacity-50"
//                     disabled={isLoading}
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     disabled={isLoading}
//                   >
//                     <img src={showConfirmPassword ? eye : eyeof} alt="toggle" />
//                   </button>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full py-3 bg-[#526FFF] text-white rounded-[8px] font-medium transition-colors cursor-pointer hover:bg-[#4158D9] disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading 
//                   ? t('auth.createNewPasswordPage.saving') || 'Saving...'
//                   : t('auth.createNewPasswordPage.saveButton')
//                 }
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }