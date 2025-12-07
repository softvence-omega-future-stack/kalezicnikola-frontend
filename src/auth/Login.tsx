import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import eye from '../assets/svgIcon/Eye.svg';
import eyeof from '../assets/svgIcon/EyeOff.svg';
import logiImg from '../assets/svgIcon/authImg.svg';
import icon from '../assets/svgIcon/logo.svg';
import logo from '../assets/svgIcon/textLogo.svg';

export default function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Fixed admin credentials
  const adminEmail = "admin@gmail.com";
  const adminPassword = "admin123";

  const handleSubmit = () => {
    if (email === adminEmail && password === adminPassword) {
      navigate("/admin");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === email && user.password === password) {
        navigate("/user/dashboard");
        return;
      }
    }

    alert("Invalid email or password");
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

            <div className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-[#171C35] mb-2">{t('auth.loginPage.email')}</label>
                <input
                  type="text"
                  placeholder={t('auth.loginPage.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-[8px] text-[#111A2D] border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-[#171C35] mb-2">{t('auth.loginPage.password')}</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t('auth.loginPage.passwordPlaceholder')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 text-[#111A2D] rounded-[8px] border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <img src={eye} alt="" /> : <img src={eyeof} alt="visible" />}
                  </button>
                </div>
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
                onClick={handleSubmit}
                className="w-full py-3 bg-[#526FFF] text-white rounded-[8px] font-medium transition-colors cursor-pointer"
              >
                {t('auth.loginPage.signIn')}
              </button>

              {/* 2FA Notice */}
              <p className="text-center text-xs text-[#111A2D]">{t('auth.loginPage.twoFA')}</p>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-[#111A2D]">
                {t('auth.loginPage.signupMessage')}{" "}
                <Link to="/signup" className="text-[#526FFF] font-medium">{t('auth.loginPage.signup')}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
