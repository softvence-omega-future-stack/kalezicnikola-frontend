import React from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface User {
  id: number;
  name: string;
  avatar: string;
  role: string;
  status: 'Active' | 'Inactive';
  twoFA: 'Enable' | 'Disable';
  lastLogin: string;
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  user: User | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  user,
  onInputChange 
}) => {
  const { t } = useTranslation("");

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          {t("adminDashboard.routes.securityAudit.userManagement.editModal.title")}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("adminDashboard.routes.securityAudit.userManagement.editModal.name")}
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={onInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("adminDashboard.routes.securityAudit.userManagement.editModal.role")}
            </label>
            <input
              type="text"
              name="role"
              value={user.role}
              onChange={onInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("adminDashboard.routes.securityAudit.userManagement.editModal.status")}
            </label>
            <select
              name="status"
              value={user.status}
              onChange={onInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Active">
                {t("adminDashboard.routes.securityAudit.userManagement.status.active")}
              </option>
              <option value="Inactive">
                {t("adminDashboard.routes.securityAudit.userManagement.status.inactive")}
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("adminDashboard.routes.securityAudit.userManagement.editModal.twoFA")}
            </label>
            <select
              name="twoFA"
              value={user.twoFA}
              onChange={onInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Enable">
                {t("adminDashboard.routes.securityAudit.userManagement.twoFA.enable")}
              </option>
              <option value="Disable">
                {t("adminDashboard.routes.securityAudit.userManagement.twoFA.disable")}
              </option>
            </select>
          </div>
        </div>

        <button
          onClick={onSave}
          className="mt-6 w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          {t("adminDashboard.routes.securityAudit.userManagement.editModal.saveButton")}
        </button>
      </div>
    </div>
  );
};

export default EditUserModal;