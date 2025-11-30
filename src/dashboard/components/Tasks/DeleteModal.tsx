

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskCount: number;
}

export default function DeleteConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  taskCount 
}: DeleteConfirmationModalProps) {
  
  if (!isOpen) return null;

  const isMultiple = taskCount > 1;

  return (
    <div 
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-[99999] p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white p-6 rounded-2xl w-full max-w-[320px] sm:max-w-[400px] text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg sm:text-xl font-semibold text-[#171C35] mb-4">
          Are you sure?
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          {isMultiple 
            ? `Do you really want to delete ${taskCount} tasks? This action cannot be undone.`
            : 'Do you really want to delete this task? This action cannot be undone.'}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <button 
            onClick={onClose} 
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer font-medium"
          >
            No
          </button>
          <button 
            onClick={onConfirm} 
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#FF3D3D] text-white hover:bg-red-600 transition-colors cursor-pointer font-medium"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}