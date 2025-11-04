
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import eye from '../assets/svgIcon/Eye.svg'
import eyeof from '../assets/svgIcon/EyeOff.svg'
import logiImg from '../assets/svgIcon/authImg.svg'
import icon from '../assets/svgIcon/logo.svg'
import logo from '../assets/svgIcon/textLogo.svg'


export default function CreateNewPassword() {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  
  return (
    <div className=" flex relative bg-[#F3F6F6]">
      {/* Left Side - Image */}
      <div className="hidden rounded-[16px]  p-[10px] lg:block lg:w-1/2 relative">
        <img
          src={logiImg}
          alt="Person smiling"
          className="w-full h-[930px] rounded-[16px] object-cover"
        />

          {/* Fixed Border Box (DocLine + Login Btn) */}
        <div className="fixed top-8 left-0 right-0 z-20 w-[95%] border border-gray-100 bg-white/10 backdrop-blur-sm rounded-full px-9 py-4 flex items-center justify-between mx-auto">
          <div className="flex items-center gap-2">
              <img src={icon} alt="Logo" />
            <img src={logo} alt="" />
          </div>
          <button className="px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition">
            Login
          </button>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50 relative">
        <div className="w-full max-w-md">
         

          {/* Login Button Top Right (for mobile) */}
          <div className="absolute top-8 right-8 lg:hidden">
            <button className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium">
              Login
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-[#171C35] mb-2">Create New Password</h1>
              <p className="text-[#111A2D] text-base">
             Please enter the Six digit One time password we sent to <br />
your email to confirm its you
              </p>
            </div>

            <div className="space-y-5">
            {/* Password */}
              <div>
                <label className="block text-base font-medium text-[#111A2D] mb-2">Create New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-[8px] border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pr-12"
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

              {/* Confirm Password */}
              <div>
                <label className="block text-base font-medium text-[#111A2D] mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-[8px] border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                      {showConfirmPassword? (
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

             

              {/* Sign In Button */}
              <button
                onClick={()=>navigate('/successfull_pass')}
                className="w-full py-3 bg-[#526FFF] text-white rounded-[8px] font-medium  transition-colors cursor-pointer"
              >
                Save New password
              </button>

            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
