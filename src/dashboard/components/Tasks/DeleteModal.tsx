import { useTranslation } from 'react-i18next';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskCount: number;
  isMultiple: boolean;
}

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, taskCount, isMultiple }: DeleteModalProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white p-6 rounded-2xl w-[320px] sm:w-[400px] text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-[#171C35] mb-4">
          {t('dashboard.routes.taskList.deleteModal.title')}
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          {isMultiple 
            ? t('dashboard.routes.taskList.deleteModal.messageMultiple', { count: taskCount })
            : t('dashboard.routes.taskList.deleteModal.messageSingle')}
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            {t('dashboard.routes.taskList.deleteModal.no')}
          </button>
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 rounded-lg bg-[#FF3D3D] text-white hover:bg-red-600 cursor-pointer"
          >
            {t('dashboard.routes.taskList.deleteModal.yes')}
          </button>
        </div>
      </div>
    </div>
  );
};

interface DeleteSuccessProps {
  isOpen: boolean;
  taskCount: number;
  isMultiple: boolean;
}

export const DeleteSuccessMessage = ({ isOpen, taskCount, isMultiple }: DeleteSuccessProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-[9999]">
      {isMultiple 
        ? t('dashboard.routes.taskList.deleteSuccess.multiple', { count: taskCount })
        : t('dashboard.routes.taskList.deleteSuccess.single')}
    </div>
  );
};
