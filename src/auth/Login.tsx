
// import { z } from 'zod';
// import { zodResolver } from "@hookform/resolvers/zod";

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import eye from '../assets/svgIcon/Eye.svg'
// import eyeof from '../assets/svgIcon/EyeOff.svg'
// import logiImg from '../assets/svgIcon/authImg.svg'
// import icon from '../assets/svgIcon/logo.svg'
// import logo from '../assets/svgIcon/textLogo.svg'
// import { useForm } from 'react-hook-form';
// import { useAppDispatch } from '@/store/hook';
// import { useLazyGetMeQuery, useLoginMutation } from '@/store/features/auth/auth.api';
// import { toast } from 'react-toastify';
// import { setUser } from '@/store/features/auth/auth.slice';
// import Cookies from "js-cookie";

// const loginSchema = z.object({
//   email: z.string().nonempty("Email is required").email("Invalid email format"),
//   password: z
//     .string()
//     .nonempty("Password is required")
//     .min(6, "Password must be at least 6 characters"),
// });

// type LoginFormInputs = z.infer<typeof loginSchema>;

// export default function LoginPage() {
//   const {
//     register,
//     handleSubmit,
//     formState: { isSubmitting, errors },
//   } = useForm<LoginFormInputs>({
//     resolver: zodResolver(loginSchema),
//   });

//   const [login, { isLoading }] = useLoginMutation();
//   const [getMeTrigger] = useLazyGetMeQuery(); // lazy query trigger
//   const dispatch = useAppDispatch();

//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const navigate = useNavigate();

//   // Fixed admin credentials
//   const adminEmail = "admin@gmail.com";
//   const adminPassword = "admin123";

//   // const handleSubmit = () => {
//   //   // Admin login
//   //   if (email === adminEmail && password === adminPassword) {
//   //     navigate("/admin"); // Admin dashboard
//   //     return;
//   //   }
//  const onSubmit = async (loginFormData: LoginFormInputs) => {
//   try {
//     const res = await login({
//       email: loginFormData.email,
//       password: loginFormData.password,
//     }).unwrap();

//     if (res?.success) {
//       const { accessToken, role } = res.data;
//       Cookies.set("accessToken", accessToken);

//       const meData = await getMeTrigger(undefined, false).unwrap();
//       dispatch(setUser({
//         accessToken,
//         user: {
//           user: meData.data.user, // transform as needed
//           profile: meData.data.profile,
//         },
//       }));

//       if (role === "doctor") navigate("/dashboard");
//       else if (role === "admin") navigate("/admin");
//     } else {
//       toast.error(res?.error?.data?.message || "Login failed");
//     }
//   } catch (err: any) {
//     console.error("Login error:", err);
//     toast.error(err?.data?.message || "Something went wrong. Please try again.");
//   }
// };


//     // Check user login (we can check localStorage or just simulate)
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       if (user.email === email && user.password === password) {
//         navigate("/user/dashboard"); // User dashboard
//         return;
//       }
//     }
//     alert("Invalid email or password");
//   };

//   return (
//     <div className="flex min-h-screen relative bg-[#F3F6F6] ">
//       {/* Left Side - Image */}
//       <div className="hidden lg:block lg:w-1/2 p-[10px] rounded-[16px] relative">
//         <img
//           src={logiImg}
//           alt="Person smiling"
//           className="w-full h-[930px] rounded-[16px] object-cover"
//         />

//         <div           style={{
//     boxShadow: `1px 1px 4px 0 rgba(0, 0, 0, 0.05) inset, 
//                 -6px -11px 18px 0 rgba(255, 255, 255, 0.16) inset, 
//                 1px 1px 0 -0.4px #FFF inset, 
//                 -1px -1px 0 -0.5px #FFF inset`,
//                    padding: "10px 10px 10px 30px",
//     backdropFilter: "blur(5px)",
//   }}
//    className="fixed top-8 left-0 right-0 z-20 w-[95%]  bg-white/10 backdrop-blur-sm rounded-full px-9 py-4 flex items-center justify-between mx-auto">
//           <div className="flex items-center gap-2">
//             <img src={icon} alt="Logo" />
//             <img src={logo} alt="" />
//           </div>
//           <button className="px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition">
//             Login
//           </button>
//         </div>
//       </div>

//       {/* Right Side - Login Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8  relative">
//         <div className="w-full max-w-md">
//           <div className="absolute top-8 right-8 lg:hidden">
//             <button className="px-6 py-2 bg-[#171c35] text-white rounded-full text-sm font-medium">
//               Login
//             </button>
//           </div>

//           <div className="space-y-6">
//             <div>
//               <h1 className="text-4xl font-bold text-[#171C35] mb-2">Log In</h1>
//               <p className="text-[#111A2D] text-base">
//                 Welcome! Login to access your dashboard
//               </p>
//             </div>

//             <div className="space-y-5">
//               {/* Email Input */}
//               <div>
//                 <label className="block text-sm font-medium text-[#171C35] mb-2">
//                   Email
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter your email or phone"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-4 py-3 rounded-[8px] text-[#111A2D] border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                 />
//               </div>

//               {/* Password Input */}
//               <div>
//                 <label className="block text-sm font-medium text-[#171C35] mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="············"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full px-4 py-3 text-[#111A2D] rounded-[8px] border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-12"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showPassword ? (
//                       <img src={eye} alt="" />
//                     ) : (
//                       <img
//                         src={eyeof}
//                         alt="visible"
//                       />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Remember Me & Forgot Password */}
//               <div className="flex items-center justify-between">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   />
//                   <span className="text-sm text-[#171C35]">Remember Me</span>
//                 </label>
//                 <Link
//                   to="/forget_password"
//                   className="text-sm text-[#526FFF] font-medium"
//                 >
//                   Forgot Password?
//                 </Link>
//               </div>

//               {/* Sign In Button */}
//               <button
//                 onClick={handleSubmit}
//                 className="w-full py-3 bg-[#526FFF] text-white rounded-[8px] font-medium transition-colors cursor-pointer"
//               >
//                 Sign In
//               </button>

//               {/* 2FA Notice */}
//               <p className="text-center text-xs text-[#111A2D]">
//                 Protected by 2-Factor Authentication (2FA) for your data security
//               </p>

//               {/* Sign Up Link */}
//               <p className="text-center text-sm text-[#111A2D]">
//                 Don't have an account?{" "}
//                 <Link to="/signup" className="text-[#526FFF] font-medium">
//                   Sign Up!
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import eye from '../assets/svgIcon/Eye.svg';
import eyeof from '../assets/svgIcon/EyeOff.svg';
import logiImg from '../assets/svgIcon/authImg.svg';
import icon from '../assets/svgIcon/logo.svg';
import logo from '../assets/svgIcon/textLogo.svg';
import { useLoginMutation } from "@/store/features/auth/auth.api";
import { useAppDispatch } from "@/store/hook";
import { setUser } from "@/store/features/auth/auth.slice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

// -------------------- Zod Schema --------------------
const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  // const [getMeTrigger] = useLazyGetMeQuery();
  const dispatch = useAppDispatch();

  // Fixed admin credentials
  // const adminEmail = "admin@gmail.com";
  // const adminPassword = "admin123";

  // const handleSubmit = () => {
  //   if (email === adminEmail && password === adminPassword) {
  //     navigate("/admin");
  //     return;
  //   }

  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     const user = JSON.parse(storedUser);
  //     if (user.email === email && user.password === password) {
  //       navigate("/user/dashboard");
  //       return;
  //     }
  //   }

  //   alert("Invalid email or password");
  // };

    const onSubmit = async (data: LoginFormInputs) => {
  try {
    const res = await login({ email: data.email, password: data.password }).unwrap();
    console.log(res)
    if (res?.data.accessToken) {
        dispatch(
          setUser({
            accessToken: res?.data.accessToken,
            user: res?.data.user,
          }));
        toast.success(res.message);
        if (res?.data.user?.role === "doctor") {
          navigate("/dashboard");
        // } else if (res?.user?.role === "normal_user") {
        //   navigate("/user-dashboard");
        // } else if (res?.user?.role === "provider") {
        //   navigate("/provider-dashboard");
        // }
      }

      if (res) {
        console.log(res);
      }
    }

  } catch (err: any) {
    console.error("Login error:", err);
    toast.error(err?.data?.message || "Something went wrong. Please try again.");
  }
};
  return (
    <div className="flex min-h-screen relative bg-[#F3F6F6]">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 p-[10px] rounded-[16px] relative">
        <img src={logiImg} alt="Person smiling" className="w-full h-[930px] rounded-[16px] object-cover" />
        <div style={{
            boxShadow: `1px 1px 4px 0 rgba(0, 0, 0, 0.05) inset, 
                        -6px -11px 18px 0 rgba(255, 255, 255, 0.16) inset, 
                        1px 1px 0 -0.4px #FFF inset, 
                        -1px -1px 0 -0.5px #FFF inset`,
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

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="w-full max-w-md">
          <div className="absolute top-8 right-8 lg:hidden">
            <button className="px-6 py-2 bg-[#171c35] text-white rounded-full text-sm font-medium">
              {t('auth.loginPage.signIn')}
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-[#171C35] mb-2">{t('auth.loginPage.title')}</h1>
              <p className="text-[#111A2D] text-base">{t('auth.loginPage.welcomeMessage')}</p>
            </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-[#171C35] mb-2">Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                {...register("email")}
                className="w-full px-4 py-3 rounded-[8px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

              {/* Password Input */}
              <div>
              <label className="block text-sm font-medium text-[#171C35] mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full px-4 py-3 rounded-[8px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <img src={showPassword ? eye : eyeof} alt="Toggle Password" />
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-[#171C35]">{t('auth.loginPage.rememberMe')}</span>
                </label>
                <Link to="/forget_password" className="text-sm text-[#526FFF] font-medium">
                  {t('auth.loginPage.forgotPassword')}
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#526FFF] text-white rounded-[8px] font-medium transition-colors cursor-pointer"
              >
                {isLoading ? "Logging in..." : t('auth.loginPage.signIn')}
                
              </button>

              {/* 2FA Notice */}
              <p className="text-center text-xs text-[#111A2D]">{t('auth.loginPage.twoFA')}</p>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-[#111A2D]">
                {t('auth.loginPage.signupMessage')}{" "}
                <Link to="/signup" className="text-[#526FFF] font-medium">{t('auth.loginPage.signup')}</Link>
              </p>
            {/* </div> */}
          </form>
        </div>
        </div>
      </div>
    </div>
  );
}