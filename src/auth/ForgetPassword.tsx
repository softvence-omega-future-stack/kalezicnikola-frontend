
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
const navigate = useNavigate()

  const handleSubmit = () => {
    navigate('/otp')
  };

  return (
    <div className=" flex relative ">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://i.ibb.co.com/v6CxNtR7/loginImg.png"
          alt="Person smiling"
          className="w-full h-[930px] object-cover"
        />

        {/* Fixed Border Box (DocLine + Login Btn) */}
        <div className="fixed top-8 left-0 right-0 z-20 w-[95%] border border-gray-100 bg-white/10 rounded-full px-9 py-4 flex items-center justify-between mx-auto  ">
          <div className="flex items-center gap-2">
           <img src="https://i.ibb.co.com/0yzBCxRm/logo.png" alt="" />
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
         

          {/* Login Button Top Right (for mobile) */}
          <div className="absolute top-8 right-8 lg:hidden">
            <button className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium">
              Login
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-semibold text-[#171C35] mb-2">Forget Password</h1>
              <p className="text-[#111A2D] text-base">
                Enter your registered email or phone number. We’ll send you a verification code to reset your password.
            
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
                  className="w-full px-4 py-3 rounded-lg text-[#111A2D] border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

    

              {/* Sign In Button */}
              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-[#526FFF] text-white rounded-lg font-medium  transition-colors cursor-pointer"
              >
                Send Verification Code
              </button>        
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
