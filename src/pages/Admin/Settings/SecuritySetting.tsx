import React, { useState } from 'react';
import Eye from '../../../assets/svgIcon/Eye.svg';
import EyeOf from '../../../assets/svgIcon/EyeOff.svg';

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

  const [twoFAEnabled, setTwoFAEnabled] = useState(false); // Changed to false (initially disabled)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdatePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    alert('Password updated successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <div>
      {/* Change Password Section */}
      <div className="bg-[#FAFAFA] rounded-xl md:rounded-3xl p-4 md:p-6 md:mx-0">
        <div className="space-y-6">
          <div className="">
            <div className="mb-6">
              <h1 className="text-lg md:text-xl font-semibold text-headingBlack mb-1">
                Change Password
              </h1>
              <p className="text-sm md:text-base text-subHeadingBlack">
                Update your password to keep your account secure
              </p>
            </div>

            <div className="space-y-5">
              {/* Current Password */}
              <div>
                <label className="block text-base font-medium text-headingBlack mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handleChange}
                    placeholder="Enter current password"
                    className="w-full px-4 py-3 md:py-4 bg-white border border-[#D0D5DD] rounded-lg text-sm text-[#171c35] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
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
                <label className="block text-base font-medium text-headingBlack mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password..."
                    className="w-full px-4 py-3 md:py-4 bg-white border border-[#D0D5DD] rounded-lg text-sm text-[#171c35] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showNewPassword ? (
                      <img src={Eye} alt="" />
                    ) : (
                      <img src={EyeOf} alt="" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-base font-medium text-headingBlack mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handleChange}
                    placeholder="confirm new password..."
                    className="w-full px-4 py-3 md:py-4 bg-white border border-[#D0D5DD] rounded-lg text-sm text-[#171c35] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <img src={Eye} alt="" />
                    ) : (
                      <img src={EyeOf} alt="" />
                    )}
                  </button>
                </div>
              </div>

              {/* Update Button */}
              <div>
                <button
                  onClick={handleUpdatePassword}
                  className="px-6 py-3 bg-[#526FFF] rounded-lg text-sm font-medium text-white transition-colors w-full sm:w-auto"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-[#FAFAFA] rounded-xl md:rounded-3xl p-4 md:p-6 md:mx-0 mt-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-headingBlack mb-4 sm:mb-6">
          Two-Factor Authentication
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          {/* Text Section */}
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-semibold text-headingBlack">
              Enable 2FA for Your Account
            </h3>
            <p className="text-sm sm:text-base font-medium text-subHeadingBlack">
              Add an extra layer of security to your admin account
            </p>
          </div>

          {/* Toggle button */}
          <button
            onClick={() => setTwoFAEnabled(!twoFAEnabled)}
            className={`relative inline-flex w-12 h-6.5 duration-200 cursor-pointer shrink-0 items-center rounded-full transition-colors ${
              twoFAEnabled ? 'bg-[#526FFF]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                twoFAEnabled ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySetting;