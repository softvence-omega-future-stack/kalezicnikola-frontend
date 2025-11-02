import React from "react";
import DocICon from '../../../assets/svgIcon/logoutDocIcon.svg'

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <img src={DocICon} alt="" />
            <h1 className="text-3xl font-extrabold text-[#526FFF]"> Doc<span className="text-[#171C35]">line</span></h1>
          </div>
        </div>

        {/* Logout Text */}
        <div className="text-center mb-2">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#171C35] mb-2">
            Logout
          </h2>
          <p className="text-sm text-[#667085]">
            Are you sure you want to logout from Docline
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            className="flex-1 py-3 px-6 bg-white border-2 border-gray-300 text-gray-700 cursor-pointer rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200"
            onClick={onCancel}
          >
            No
          </button>
          <button
            className="flex-1 py-3 px-6 bg-[#526FFF] text-white rounded-xl font-medium cursor-pointer  transition-colors duration-200 "
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
