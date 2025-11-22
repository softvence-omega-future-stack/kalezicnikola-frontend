
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import eye from '../assets/svgIcon/Eye.svg'
import eyeof from '../assets/svgIcon/EyeOff.svg'
import logiImg from '../assets/svgIcon/authImg.svg'
import icon from '../assets/svgIcon/logo.svg'
import logo from '../assets/svgIcon/textLogo.svg'

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = () => {
    // if (!agreeTerms) {
    //   alert("Please agree to the terms before signing up.");
    //   return;
    // }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log('Signup submitted:', { firstName, lastName, email, password });

           if (email && password) { 
      navigate("/dashboard"); 
    } else {
      alert("Please enter valid credentials");
    }
  
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F6F6] lg:flex-row">
      {/* Left Side - Image with Header */}
      <div className="hidden lg:block lg:w-1/2 rounded-[16px] p-[10px] relative">
        <img
          src={logiImg}
          alt="Person smiling"
          className="w-full h-[930px] rounded-[16px]   object-cover"
        />

        {/* Fixed Border Box (DocLine + Login Btn) */}
        <div className="fixed top-8 left-0 right-0 z-20 w-[95%] border border-white bg-white/10 backdrop-blur-sm rounded-full px-9 py-4 flex items-center justify-between mx-auto">
          <div className="flex items-center gap-2">
              <img src={icon} alt="Logo" />
            <img src={logo} alt="" />
          </div>
          <button className="px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition">
            Login
          </button>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-8 ">
        <div className="w-full max-w-md">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#171C35] mb-2">Sign Up</h1>
              <p className="text-[#111A2D] text-base">Sign Up to get started</p>
            </div>

            <div className="space-y-5">
              {/* First & Last Name */}
              <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#111A2D] mb-2">First Name</label>
                  <input
                    type="text"
                    placeholder="eg. John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111A2D] mb-2">Last Name</label>
                  <input
                    type="text"
                    placeholder="eg. Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#111A2D] mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              {/* Password */}
          
<div>
  <label className="block text-sm font-medium text-[#111A2D] mb-2">Choose Password</label>
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="••••••••••••"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
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
</div>

{/* Confirm Password */}
<div>
  <label className="block text-sm font-medium text-[#111A2D] mb-2">Confirm Password</label>
  <div className="relative">
    <input
      type={showConfirmPassword ? "text" : "password"}
      placeholder="••••••••••••"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
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
</div>


              {/* Terms */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label className="text-sm text-gray-600">
                  By creating an account, you agree to{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Docline's</a>{" "}
                  Terms of Service and Privacy Policy.
                </label>
              </div>

              {/* Button */}
              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-[#526FFF] text-white rounded-xl font-medium transition-colors shadow-sm hover:bg-blue-700 cursor-pointer"
              >
                Sign Up
              </button>

              {/* Sign In */}
              <p className="text-center text-sm text-[#111A2D]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#526FFF] font-medium"
                >
                  Sign In!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
