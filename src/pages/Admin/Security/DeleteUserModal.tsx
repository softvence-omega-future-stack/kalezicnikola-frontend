import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  userName 
}) => {
  const { t } = useTranslation("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Warning Icon */}
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold mb-2 text-gray-900">
            {t("adminDashboard.routes.securityAudit.userManagement.deleteModal.title")}
          </h2>

          {/* Message */}
          <p className="text-sm text-gray-600 mb-1">
            {t("adminDashboard.routes.securityAudit.userManagement.deleteModal.message")}
          </p>

          {/* User Name */}
          <p className="text-sm font-medium text-gray-900 mb-1">
            {userName}
          </p>

          {/* Warning Text */}
          <p className="text-xs text-red-600 mb-6">
            {t("adminDashboard.routes.securityAudit.userManagement.deleteModal.warning")}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full">
            {/* Cancel Button */}
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              {t("adminDashboard.routes.securityAudit.userManagement.deleteModal.cancelButton")}
            </button>
            
            {/* Delete Button */}
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              {t("adminDashboard.routes.securityAudit.userManagement.deleteModal.confirmButton")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;