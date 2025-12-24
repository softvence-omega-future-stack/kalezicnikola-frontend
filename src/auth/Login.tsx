import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import eye from '../assets/svgIcon/Eye.svg';
import eyeof from '../assets/svgIcon/EyeOff.svg';
import logiImg from '../assets/svgIcon/authImg.svg';
import icon from '../assets/svgIcon/logo.svg';
import logo from '../assets/svgIcon/textLogo.svg';
import { useAdminLoginMutation, useLoginMutation } from "@/store/features/auth/auth.api";
import { useAppDispatch } from "@/store/hook";
import { setUser } from "@/store/features/auth/auth.slice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [adminLogin] = useAdminLoginMutation();
  const dispatch = useAppDispatch();

 const onSubmit = async (data: LoginFormInputs) => {
  setIsLoading(true);
  
  try {
    // First try admin login
    try {
      const adminRes = await adminLogin({ 
        email: data.email, 
        password: data.password 
      }).unwrap();
      
      if (adminRes?.data?.accessToken) {
        dispatch(
          setUser({
            accessToken: adminRes.data.accessToken,
            user: adminRes.data.user,
          })
        );
        toast.success(adminRes.message || "Admin login successful");
        // Use setTimeout to avoid immediate navigation
        setTimeout(() => {
          navigate("/admin", { replace: true });
        }, 0);
        return;
      }
    } catch (adminError: any) {
      // If admin login fails, try doctor login
      console.log("Admin login failed, trying doctor login...", adminError);
    }

    // Try doctor login
    const doctorRes = await login({ 
      email: data.email, 
      password: data.password 
    }).unwrap();
    
    if (doctorRes?.data?.accessToken) {
      dispatch(
        setUser({
          accessToken: doctorRes.data.accessToken,
          user: doctorRes.data.user,
        })
      );
      toast.success(doctorRes.message || "Login successful");
      // Use setTimeout to avoid immediate navigation
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 0);
      return;
    }
    
  } catch (err: any) {
    console.error("Login error:", err);
    toast.error(err?.data?.message || "Invalid email or password");
  } finally {
    setIsLoading(false);
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
                disabled={isLoading}
                className="w-full py-3 bg-[#526FFF] text-white rounded-[8px] font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import eye from '../assets/svgIcon/Eye.svg';
// import eyeof from '../assets/svgIcon/EyeOff.svg';
// import logiImg from '../assets/svgIcon/authImg.svg';
// import icon from '../assets/svgIcon/logo.svg';
// import logo from '../assets/svgIcon/textLogo.svg';
// import { useLoginMutation } from "@/store/features/auth/auth.api";
// import { useAppDispatch } from "@/store/hook";
// import { setUser } from "@/store/features/auth/auth.slice";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-toastify";

// // -------------------- Zod Schema --------------------
// const loginSchema = z.object({
//   email: z.string().nonempty("Email is required").email("Invalid email format"),
//   password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters"),
// });

// type LoginFormInputs = z.infer<typeof loginSchema>;

// export default function LoginPage() {
//   const { t } = useTranslation();
//   const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
//     resolver: zodResolver(loginSchema),
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const navigate = useNavigate();
//   const [login, { isLoading }] = useLoginMutation();
//   // const [getMeTrigger] = useLazyGetMeQuery();
//   const dispatch = useAppDispatch();

//   // Fixed admin credentials
//   // const adminEmail = "admin@gmail.com";
//   // const adminPassword = "admin123";

//   // const handleSubmit = () => {
//   //   if (email === adminEmail && password === adminPassword) {
//   //     navigate("/admin");
//   //     return;
//   //   }

//   //   const storedUser = localStorage.getItem("user");
//   //   if (storedUser) {
//   //     const user = JSON.parse(storedUser);
//   //     if (user.email === email && user.password === password) {
//   //       navigate("/user/dashboard");
//   //       return;
//   //     }
//   //   }

//   //   alert("Invalid email or password");
//   // };

//     const onSubmit = async (data: LoginFormInputs) => {
//   try {
//     const res = await login({ email: data.email, password: data.password }).unwrap();
//     console.log(res)
//     if (res?.data.accessToken) {
//         dispatch(
//           setUser({
//             accessToken: res?.data.accessToken,
//             user: res?.data.user,
//           }));
//         toast.success(res.message);
//         if (res?.data.user?.role === "doctor") {
//           navigate("/dashboard");
//         // } else if (res?.user?.role === "normal_user") {
//         //   navigate("/user-dashboard");
//         // } else if (res?.user?.role === "provider") {
//         //   navigate("/provider-dashboard");
//         // }
//       }

//       if (res) {
//         console.log(res);
//       }
//     }

//   } catch (err: any) {
//     console.error("Login error:", err);
//     toast.error(err?.data?.message || "Something went wrong. Please try again.");
//   }
// };
//   return (
//     <div className="flex min-h-screen relative bg-[#F3F6F6]">
//       {/* Left Side - Image */}
//       <div className="hidden lg:block lg:w-1/2 p-[10px] rounded-[16px] relative">
//         <img src={logiImg} alt="Person smiling" className="w-full h-[930px] rounded-[16px] object-cover" />
//         <div style={{
//             boxShadow: `1px 1px 4px 0 rgba(0, 0, 0, 0.05) inset, 
//                         -6px -11px 18px 0 rgba(255, 255, 255, 0.16) inset, 
//                         1px 1px 0 -0.4px #FFF inset, 
//                         -1px -1px 0 -0.5px #FFF inset`,
//             padding: "10px 10px 10px 30px",
//             backdropFilter: "blur(5px)"
//           }}
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

//       {/* Right Side - Login Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
//         <div className="w-full max-w-md">
//           <div className="absolute top-8 right-8 lg:hidden">
//             <button className="px-6 py-2 bg-[#171c35] text-white rounded-full text-sm font-medium">
//               {t('auth.loginPage.signIn')}
//             </button>
//           </div>

//           <div className="space-y-6">
//             <div>
//               <h1 className="text-4xl font-bold text-[#171C35] mb-2">{t('auth.loginPage.title')}</h1>
//               <p className="text-[#111A2D] text-base">{t('auth.loginPage.welcomeMessage')}</p>
//             </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//               {/* Email Input */}
//             <div>
//               <label className="block text-sm font-medium text-[#171C35] mb-2">Email</label>
//               <input
//                 type="text"
//                 placeholder="Enter your email"
//                 {...register("email")}
//                 className="w-full px-4 py-3 rounded-[8px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//               />
//               {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
//             </div>

//               {/* Password Input */}
//               <div>
//               <label className="block text-sm font-medium text-[#171C35] mb-2">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   {...register("password")}
//                   className="w-full px-4 py-3 rounded-[8px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-12"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2"
//                 >
//                   <img src={showPassword ? eye : eyeof} alt="Toggle Password" />
//                 </button>
//               </div>
//               {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
//             </div>

//               {/* Remember Me & Forgot Password */}
//               <div className="flex items-center justify-between">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   />
//                   <span className="text-sm text-[#171C35]">{t('auth.loginPage.rememberMe')}</span>
//                 </label>
//                 <Link to="/forget_password" className="text-sm text-[#526FFF] font-medium">
//                   {t('auth.loginPage.forgotPassword')}
//                 </Link>
//               </div>

//               {/* Sign In Button */}
//               <button
//                 type="submit"
//                 className="w-full py-3 bg-[#526FFF] text-white rounded-[8px] font-medium transition-colors cursor-pointer"
//               >
//                 {isLoading ? "Logging in..." : t('auth.loginPage.signIn')}
                
//               </button>

//               {/* 2FA Notice */}
//               <p className="text-center text-xs text-[#111A2D]">{t('auth.loginPage.twoFA')}</p>

//               {/* Sign Up Link */}
//               <p className="text-center text-sm text-[#111A2D]">
//                 {t('auth.loginPage.signupMessage')}{" "}
//                 <Link to="/signup" className="text-[#526FFF] font-medium">{t('auth.loginPage.signup')}</Link>
//               </p>
//             {/* </div> */}
//           </form>
//         </div>
//         </div>
//       </div>
//     </div>
//   );
// }
