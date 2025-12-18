import { useDeleteMyAccountMutation } from '@/store/features/doctorSettings/doctorProfileApi';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // ✅ RTK Query mutation hook
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteMyAccountMutation();
  
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleDelete = async () => {
    if (password.length === 0) {
      setErrorMessage(t('dashboard.routes.settings.settingsSidebar.deleteAccount.modal.passwordRequired') || 'Password is required');
      return;
    }

    try {
      setErrorMessage('');
      
      // ✅ Call delete API
      const response = await deleteAccount({ password }).unwrap();
      
      console.log('Delete response:', response);
      
      // ✅ Show success toast
      setShowSuccessToast(true);

      // ✅ Wait 2 seconds then logout and redirect
      setTimeout(() => {
        setShowSuccessToast(false);
        
        // Clear auth data from localStorage/redux
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        
        // Redirect to login
        navigate('/login');
        
        // Close modal
        onClose();
        setPassword('');
      }, 2000);
      
    } catch (error: unknown) {
      console.error('Delete account error:', error);

      // ✅ Handle error
      let errorMsg: string;
      if (
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof (error as { data?: { message?: string } }).data === 'object' &&
        (error as { data?: { message?: string } }).data !== null &&
        'message' in (error as { data?: { message?: string } }).data!
      ) {
        errorMsg =
          ((error as { data?: { message?: string } }).data as { message?: string }).message ||
          t('dashboard.routes.settings.settingsSidebar.deleteAccount.modal.error') ||
          'Failed to delete account. Please check your password.';
      } else {
        errorMsg =
          t('dashboard.routes.settings.settingsSidebar.deleteAccount.modal.error') ||
          'Failed to delete account. Please check your password.';
      }

      setErrorMessage(errorMsg);
    }
  };

  const handleClose = () => {
    if (!isDeleting) {
      setPassword('');
      setErrorMessage('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-4xl shadow-2xl w-full max-w-sm sm:max-w-md p-6 sm:p-10 transform transition-all duration-300 ease-out">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl sm:text-3xl font-medium leading-8 text-red-600">
              {t('dashboard.routes.settings.settingsSidebar.deleteAccount.modal.title')}
            </h2>
            <button 
              onClick={handleClose} 
              disabled={isDeleting}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <p className="text-[#667085] font-medium mb-10 text-sm sm:text-base md:text-xl leading-7">
            {t('dashboard.routes.settings.settingsSidebar.deleteAccount.modal.message')}
          </p>

          <div className="mb-6">
            <label htmlFor="password-confirm" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              {t('dashboard.routes.settings.settingsSidebar.deleteAccount.modal.passwordLabel')}
            </label>
            <div className="relative">
              <input
                id="password-confirm"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage(''); // Clear error on input
                }}
                className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pr-12 text-base text-[#667085] disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="************"
                disabled={isDeleting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isDeleting}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 disabled:opacity-50"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {/* ✅ Error message display */}
            {errorMessage && (
              <p className="mt-2 text-sm text-red-600 font-medium">
                {errorMessage}
              </p>
            )}
          </div>

          <button
            onClick={handleDelete}
            disabled={isDeleting || password.length === 0}
            className={`w-full py-3 rounded-lg text-white font-semibold transition duration-150 ease-in-out cursor-pointer ${
              isDeleting || password.length === 0
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-[#526FFF] hover:bg-blue-700 shadow-lg'
            }`}
          >
            {isDeleting
              ? t('dashboard.routes.settings.settingsSidebar.deleteAccount.modal.deleting')
              : t('dashboard.routes.settings.settingsSidebar.deleteAccount.modal.confirm')}
          </button>
        </div>
      </div>

      {/* ✅ Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 z-[9999] animate-slide-in">
          <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <p className="font-semibold">{t('dashboard.routes.settings.settingsSidebar.deleteAccount.modal.success')}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAccountModal;