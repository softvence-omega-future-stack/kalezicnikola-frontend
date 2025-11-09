import React, { useState } from 'react';
import Eye from '../../../assets/svgIcon/Eye.svg'
import EyeOf from '../../../assets/svgIcon/EyeOff.svg'

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const SecuritySetting: React.FC = () => {
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdatePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    console.log('Updating password:', passwordData);
    alert('Password updated successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <div>
    <div className=" bg-[#FAFAFA] rounded-2xl -mt-4 p-4 sm:p-6 lg:p-8">
      <div className="space-y-6">
        
        {/* Change Password Section */}
        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-[#171C35] mb-1">Change Password</h1>
            <p className="text-base text-[#111A2D]">Update your password to keep your account secure</p>
          </div>

          <div className="space-y-5">
            
            {/* Current Password */}
            <div>
              <label className="block text-base font-medium text-[#171C35] mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                  className="w-full px-4 py-4 pr-12 bg-white border border-[#D0D5DD] rounded-lg text-sm text-[#171c35]  placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#667085] hover:text-gray-600"
                >
                  {showCurrentPassword ? (
                   <img src={Eye} alt="" />
                  ) : (
                   <img src={EyeOf} alt="" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-base font-medium text-[#171c35] mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password..."
                  className="w-full px-4 py-4 pr-12 bg-white border border-[#D0D5DD] rounded-lg text-sm text-[#171c35] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#667085] hover:text-gray-600"
                >
                  {showNewPassword ? (
                     <img src={Eye} alt="" />
                  ) : (
                     <img src={EyeOf} alt="" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-base font-medium text-[#171c35] mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleChange}
                  placeholder="confirm new password..."
                  className="w-full px-4 py-4 pr-12 bg-white border border-[#D0D5DD] rounded-lg text-sm text-[#171c35] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#667085] hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                     <img src={Eye} alt="" />
                  ) : (
                     <img src={EyeOf} alt="" />
                  )}
                </button>
              </div>
            </div>

            {/* Update Password Button */}
            <div>
              <button
                onClick={handleUpdatePassword}
                className="px-6 py-3 bg-[#526FFF] rounded-[8px] text-sm font-medium text-white cursor-pointer transition-colors"
              >
                Update Password
              </button>
            </div>

          </div>
        </div>

        

      </div>
    </div>
    {/* Two-Factor Authentication Section */}
        <div className="bg-[#FAFAFA] rounded-2xl mt-4 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-[#171c35] mb-6">Two-Factor Authentication</h2>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-[#171C35] mb-1">Enable 2FA for Your Account</h3>
              <p className="text-base font-medium text-[#111A2D]">Add an extra layer of security to your admin account</p>
            </div>
            <button
              onClick={() => setTwoFAEnabled(!twoFAEnabled)}
              className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors ${
                twoFAEnabled ? 'bg-[#526FFF]' : 'bg-gray-300'
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
  );
};

export default SecuritySetting;