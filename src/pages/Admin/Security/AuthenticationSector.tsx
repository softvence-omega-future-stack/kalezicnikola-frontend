import { useState } from "react";


const AuthenticationSector = () => {
      const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  return (
    <div>
         {/* Two-Factor Authentication Section */}
        <div className="bg-white rounded-2xl mt-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#171C35] mb-1">Two-Factor Authentication</h2>
              <p className="text-base font-semibold text-[#171C35]">Enable 2FA for Your Account</p>
              <p className="text-base font-medium text-[#111A2D]">Add an extra layer of security to your admin account</p>
            </div>
            <button
              onClick={() => setTwoFAEnabled(!twoFAEnabled)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                twoFAEnabled ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  twoFAEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      
      
    </div>
  )
}

export default AuthenticationSector
