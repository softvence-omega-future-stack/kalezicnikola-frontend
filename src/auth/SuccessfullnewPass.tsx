import { useNavigate } from "react-router-dom";

import logiImg from '../assets/svgIcon/authImg.svg'

export default function SuccessfullNewPassword() {
 
const navigate = useNavigate()
  
  return (
    <div className=" flex relative bg-[#F3F6F6] ">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src={logiImg}
          alt="Person smiling"
          className="w-full h-[930px] rounded-[16px] p-[10px] object-cover"
        />

         {/* Fixed Border Box (DocLine + Login Btn) */}
        <div className="fixed top-8 left-0 right-0 z-20 w-[95%] border border-gray-100 bg-white/10 backdrop-blur-sm rounded-full px-9 py-4 flex items-center justify-between mx-auto">
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
              <h1 className="text-4xl font-bold text-[#171C35] mb-2">Password Reset Successful</h1>
              <p className="text-[#111A2D] text-base">
             Your password has been changed successfully. You can no log in with your new credentials.
              </p>
            </div>

           <button 
                 onClick={()=>navigate('/login')}
                className="w-full py-3 bg-[#526FFF] text-white rounded-[8px] font-medium  transition-colors"
              >
                Back To Login
              </button>

            
            
          </div>
        </div>
      </div>
    </div>
  );
}
