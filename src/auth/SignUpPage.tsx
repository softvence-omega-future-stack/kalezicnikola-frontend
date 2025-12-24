import { useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";

import eye from '../assets/svgIcon/Eye.svg';
import eyeof from '../assets/svgIcon/EyeOff.svg';
import logiImg from '../assets/svgIcon/authImg.svg';
import icon from '../assets/svgIcon/logo.svg';
import logo from '../assets/svgIcon/textLogo.svg';
import { useRegisterUserMutation } from "@/store/features/auth/auth.api";
import { toast } from "react-toastify";

const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeTerms: z.boolean().refine(val => val === true, { message: "You must agree to terms" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

type SignupFormInputs = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      setLoading(true);
      const result = await registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName
      }).unwrap();

      if (result.success) {
        toast.success(result.message);
        navigate("/login");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F6F6] lg:flex-row">
      {/* Left Side */}
      <div className="hidden lg:block lg:w-1/2 rounded-[16px] p-[10px] relative">
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
          <button className="px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition">
            {t('auth.loginPage.signIn')}
          </button>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#171C35] mb-2">{t('auth.signupPage.title')}</h1>
              <p className="text-[#111A2D] text-base">{t('auth.signupPage.subtitle')}</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#111A2D] mb-2">{t('auth.signupPage.firstName')}</label>
                  <input
                    type="text"
                    placeholder={t('auth.signupPage.firstNamePlaceholder')}
                    {...register("firstName")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111A2D] mb-2">{t('auth.signupPage.lastName')}</label>
                  <input
                    type="text"
                    placeholder={t('auth.signupPage.lastNamePlaceholder')}
                    {...register("lastName")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111A2D] mb-2">{t('auth.signupPage.email')}</label>
                <input
                  type="email"
                  placeholder={t('auth.signupPage.emailPlaceholder')}
                  {...register("email")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-[#111A2D] mb-2">{t('auth.signupPage.choosePassword')}</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t('auth.signupPage.passwordPlaceholder')}
                    {...register("password")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <img src={eye} alt="" /> : <img src={eyeof} alt="visible" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-[#111A2D] mb-2">{t('auth.signupPage.confirmPassword')}</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t('auth.signupPage.passwordPlaceholder')}
                    {...register("confirmPassword")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <img src={eye} alt="" /> : <img src={eyeof} alt="visible" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  {...register("agreeTerms")}
                  className="w-4 h-4 mt-0.5 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label className="text-sm text-gray-600">{t('auth.signupPage.agreeTerms')}</label>
              </div>
              {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms.message}</p>}

              {/* Button */}
              <button
                type='submit'
                disabled={loading}
                className="w-full py-3 bg-[#526FFF] text-white rounded-xl font-medium transition-colors shadow-sm hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing Up..." : t('auth.signupPage.signUpButton')}
              </button>

              {/* Sign In */}
              <p className="text-center text-sm text-[#111A2D]">
                {t('auth.signupPage.alreadyAccount')}{" "}
                <Link to="/login" className="text-[#526FFF] font-medium">{t('auth.signupPage.signIn')}</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}



// import { useState } from 'react';
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Link, useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { useForm } from "react-hook-form";

// import eye from '../assets/svgIcon/Eye.svg';
// import eyeof from '../assets/svgIcon/EyeOff.svg';
// import logiImg from '../assets/svgIcon/authImg.svg';
// import icon from '../assets/svgIcon/logo.svg';
// import logo from '../assets/svgIcon/textLogo.svg';
// import { useRegisterUserMutation } from "@/store/features/auth/auth.api";
// import { toast } from "react-toastify";

// const signupSchema = z
// .object({
//   firstName: z.string().min(2,"First name is required"),
//   lastName: z.string().min(2,"Last name is required"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6,"Password must be at least 6 characters"),
//   confirmPassword: z.string().min(1,"Please confirm your password"),
//   agreeTerms : z.boolean().refine(val => val === true,{ message:"You must agree to terms" }),
// })
// .refine((data)=> data.password === data.confirmPassword,{
//   message:"Passwords do not match",
//   path:["confirmPassword"]
// })

// type SignupFormInputs = z.infer<typeof signupSchema>;

// export default function SignupPage() {
//   const { t } = useTranslation();
//   const [loading,setLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [registerUser] = useRegisterUserMutation();
//   const navigate = useNavigate();

//   const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>({
//     resolver: zodResolver(signupSchema)
//   });

//   // const handleSubmit = () => {
//   //   if (password !== confirmPassword) {
//   //     alert("Passwords do not match!");
//   //     return;
//   //   }
//   //   if (email && password) {
//   //     navigate("/dashboard");
//   //   } else {
//   //     alert("Please enter valid credentials");
//   //   }
//   // };
//    const onSubmit = async (data: SignupFormInputs) => {
//     try {
//       setLoading(true)
//       const result = await registerUser({
//         email: data.email,
//         password: data.password,
//         firstName: data.firstName,
//         lastName: data.lastName
//       }).unwrap();

//       if (result.success) {
//         toast.success(result.message);
//         // localStorage.setItem("setVerificationEmail", data.email);
//         navigate("/login");
//       }
//     } catch (err: any) {
//       toast.error(err?.data?.message || err?.message || "Something went wrong");
//       console.error(err);
//     }finally{
//       setLoading(false)
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-[#F3F6F6] lg:flex-row">
//       {/* Left Side */}
//       <div className="hidden lg:block lg:w-1/2 rounded-[16px] p-[10px] relative">
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
//             {t('auth.loginPage.signIn')}
//           </button>
//         </div>
//       </div>

//       {/* Right Side - Signup Form */}
//       <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-8">
//         <div className="w-full max-w-md">
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-3xl lg:text-4xl font-bold text-[#171C35] mb-2">{t('auth.signupPage.title')}</h1>
//               <p className="text-[#111A2D] text-base">{t('auth.signupPage.subtitle')}</p>
//             </div>

//           <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
//               <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-[#111A2D] mb-2">{t('auth.signupPage.firstName')}</label>
//                   <input
//                     type="text"
//                     placeholder={t('auth.signupPage.firstNamePlaceholder')}
//                     {...register("firstName")}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                   />
//                   {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}

//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-[#111A2D] mb-2">{t('auth.signupPage.lastName')}</label>
//                   <input
//                     type="text"
//                     placeholder={t('auth.signupPage.lastNamePlaceholder')}
//                     {...register("lastName")}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                   />
//                   {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-[#111A2D] mb-2">{t('auth.signupPage.email')}</label>
//                 <input
//                   type="email"
//                   placeholder={t('auth.signupPage.emailPlaceholder')}
//                   {...register("email")}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                 />
//                 {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-sm font-medium text-[#111A2D] mb-2">{t('auth.signupPage.choosePassword')}</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder={t('auth.signupPage.passwordPlaceholder')}
//                     {...register("password")}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pr-12"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showPassword ? <img src={eye} alt="" /> : <img src={eyeof} alt="visible" />}
//                   </button>
//                 </div>
//                 {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}

//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <label className="block text-sm font-medium text-[#111A2D] mb-2">{t('auth.signupPage.confirmPassword')}</label>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder={t('auth.signupPage.passwordPlaceholder')}
//                     {...register("confirmPassword")}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pr-12"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showConfirmPassword ? <img src={eye} alt="" /> : <img src={eyeof} alt="visible" />}
//                   </button>
//                 </div>
//               </div>

//               {/* Terms */}
//               <div className="flex items-start gap-2">
//                 <input
//                   type="checkbox"
//                   {...register("agreeTerms")}
//                   className="w-4 h-4 mt-0.5 text-blue-600 focus:ring-blue-500 cursor-pointer"
//                 />
//                 <label className="text-sm text-gray-600">{t('auth.signupPage.agreeTerms')}</label>

//               </div>
//                 {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms.message}</p>}

//               {/* Button */}
//               <button
//                 type='submit'
//                 className="w-full py-3 bg-[#526FFF] text-white rounded-xl font-medium transition-colors shadow-sm hover:bg-blue-700 cursor-pointer"
//               >
//                 {loading? "Signing Up...":t('auth.signupPage.signUpButton')}
//               </button>

//               {/* Sign In */}
//               <p className="text-center text-sm text-[#111A2D]">
//                 {t('auth.signupPage.alreadyAccount')}{" "}
//                 <Link to="/login" className="text-[#526FFF] font-medium">{t('auth.signupPage.signIn')}</Link>
//               </p>
//             {/* </div> */}
//           </form>
//         </div>
//       </div>
//       </div>
//     </div>
//   );
// }
