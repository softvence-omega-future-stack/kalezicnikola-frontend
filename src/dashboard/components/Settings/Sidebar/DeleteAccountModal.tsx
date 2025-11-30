import React, { useState } from 'react';

// Define the component props
interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: (password: string) => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose, onConfirmDelete }) => {
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  // Function to handle the delete button click
  const handleDelete = () => {
    // Basic validation
    if (password.length > 0) {
      setIsDeleting(true);
      // Simulate an async operation
      setTimeout(() => {
        onConfirmDelete(password);
        setIsDeleting(false);
        setShowSuccessToast(true);
        
        // Auto close modal after success
        setTimeout(() => {
          setShowSuccessToast(false);
          onClose();
          setPassword(''); // Reset password field
        }, 2000);
      }, 1000);
    } else {
      alert('Please enter your password to confirm.');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop for the modal (fixed position for full screen) */}
      <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
        {/* Modal container (centered and responsive) */}
        <div className="bg-white rounded-4xl shadow-2xl w-full max-w-sm sm:max-w-md p-6 sm:p-10 transform transition-all duration-300 ease-out">
          
          {/* Header section with title and close button */}
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl sm:text-3xl font-medium leading-8 text-red-600">
              Delete Account
            </h2>
            {/* Close button (X icon) */}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition duration-150 p-1 rounded-full cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          {/* Content section */}
          <p className="text-[#667085] font-medium mb-10 text-sm sm:text-base md:text-xl leading-7">
            Deleting your account will remove all of your information from our database. This cannot be undone.
          </p>
          
          {/* Password input section */}
          <div className="mb-8">
            <label htmlFor="password-confirm" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              To confirm this, enter your "password"
            </label>
            <div className="relative">
              <input
                id="password-confirm"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pr-12 text-base text-[#667085]"
                placeholder="************"
                disabled={isDeleting}
              />
              {/* Show/Hide password toggle icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-150"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {showPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.874 5.874A3 3 0 1112 10.05v.001m.002-.001a4.994 4.994 0 01-1.353 3.327L20.8 20.8M4.2 4.2L20.8 20.8"/>
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-11 0c.878 3.55 4.39 6 8 6s7.122-2.45 8-6c-.878-3.55-4.39-6-8-6s-7.122 2.45-8 6z"/>
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* Delete button (prominent and distinct) */}
          <button
            onClick={handleDelete}
            disabled={isDeleting || password.length === 0}
            className={`w-full py-3 rounded-lg text-white font-semibold transition duration-150 ease-in-out cursor-pointer ${
              isDeleting || password.length === 0
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-[#526FFF] hover:bg-blue-700 shadow-lg'
            }`}
          >
            {isDeleting ? 'Deleting...' : 'Delete Account'}
          </button>
        </div>
      </div>

      {/* Success Toast Notification */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 z-[9999] animate-slide-in">
          <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <div>
              <p className="font-semibold">Success!</p>
              <p className="text-sm">Account deleted successfully</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAccountModal;