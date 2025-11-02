
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import eye from '../assets/svgIcon/Eye.svg'
import eyeof from '../assets/svgIcon/EyeOff.svg'
import logiImg from '../assets/svgIcon/authImg.svg'


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Fixed admin credentials
  const adminEmail = "admin@gmail.com";
  const adminPassword = "admin123";

  const handleSubmit = () => {
    // Admin login
    if (email === adminEmail && password === adminPassword) {
      navigate("/admin"); // Admin dashboard
      return;
    }

    // Check user login (we can check localStorage or just simulate)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === email && user.password === password) {
        navigate("/user/dashboard"); // User dashboard
        return;
      }
    }

    alert("Invalid email or password");
  };

  return (
    <div className="flex relative bg-[#F3F6F6] min-h-screen">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 p-[10px] rounded-[16px] relative">
        <img
          src={logiImg}
          alt="Person smiling"
          className="w-full h-[930px] rounded-[16px] object-cover"
        />

        <div className="fixed top-8 left-0 right-0 z-20 w-[95%] border border-gray-100 bg-white/10 backdrop-blur-sm rounded-full px-9 py-4 flex items-center justify-between mx-auto">
          <div className="flex items-center gap-2">
            <img src="https://i.ibb.co/0yzBCxRm/logo.png" alt="Logo" />
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
          <div className="absolute top-8 right-8 lg:hidden">
            <button className="px-6 py-2 bg-[#171c35] text-white rounded-full text-sm font-medium">
              Login
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-[#171C35] mb-2">Log In</h1>
              <p className="text-[#111A2D] text-base">
                Welcome! Login to access your dashboard
              </p>
            </div>

            <div className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-[#171C35] mb-2">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Enter your email or phone"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-[8px] text-[#111A2D] border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-[#171C35] mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="············"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 text-[#111A2D] rounded-[8px] border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <img src={eye} alt="" />
                    ) : (
                      <img
                        src={eyeof}
                        alt="visible"
                      />
                    )}
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
                  <span className="text-sm text-[#171C35]">Remember Me</span>
                </label>
                <Link
                  to="/forget_password"
                  className="text-sm text-[#526FFF] font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-[#526FFF] text-white rounded-[8px] font-medium transition-colors cursor-pointer"
              >
                Sign In
              </button>

              {/* 2FA Notice */}
              <p className="text-center text-xs text-[#111A2D]">
                Protected by 2-Factor Authentication (2FA) for your data security
              </p>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-[#111A2D]">
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#526FFF] font-medium">
                  Sign Up!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
