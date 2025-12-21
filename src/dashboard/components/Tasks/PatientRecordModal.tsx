import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import timeIon from '../../../assets/svgIcon/taskTimeIcon.svg';
import { useTranslation } from 'react-i18next';

interface Task {
  id: string | any;
  title: string;
  description: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  time: string | null;
  dueDate: string;
  completed?: boolean; 
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  patient?: {
    id: string;
    firstName: string;
    lastName: string;
    photo: string | null;
  } | null;
}

interface ModalProps {
  task: Task;
  onClose: () => void;
}

export const PatientRecordsModal: React.FC<ModalProps> = ({ task, onClose }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!task) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 bg-opacity-40">
      <div className="bg-[#F3F6F6] p-10 rounded-[32px] w-full max-w-2xl max-h-[646px] overflow-hidden">
        {/* Header */}
        <div className="pb-4 relative">
          <button
            onClick={onClose}
            className="absolute top-1 right-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
            aria-label={t('dashboard.routes.taskList.patientRecordsModal.close')}
          >
            <X size={24} />
          </button>

          <h2 className="text-2xl font-semibold leading-6 text-[#171C35] mb-2">
            {t('dashboard.routes.taskList.patientRecordsModal.title')}
          </h2>
          <p className="text-sm text-[#667085] leading-3 mb-8">
            {t('dashboard.routes.taskList.patientRecordsModal.subtitle')}
          </p>
        </div>

        {/* Content */}
        <div className="overflow-auto max-h-[calc(90vh-120px)]">

          {/* Patient Name & Photo */}
          {task.patient && (
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                {task.patient.photo && (
                  <img 
                    src={task.patient.photo} 
                    alt={`${task.patient.firstName} ${task.patient.lastName}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <h3 className="font-semibold text-lg text-subHeadingBlack">
                  {t('dashboard.routes.taskList.patientRecordsModal.name')}: {task.patient.firstName} {task.patient.lastName}
                </h3>
              </div>
            </div>
          )}

          {/* Date and Time */}
          <div className="flex items-center gap-3 mb-8 text-gray-700">
            <img src={timeIon} alt="" />
            <span className="text-base sm:text-lg md:text-xl text-[#171C35] font-medium leading-4">
              {task.time || '9:00 AM'} <span className="ml-4">{t('dashboard.routes.taskList.patientRecordsModal.labels.dueDate')}: {task.dueDate ? task.dueDate.split('T')[0] : 'Sep 30, 2025'}</span>
            </span>
          </div>

          {/* Description */}
          <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
            <p className="font-semibold text-lg">{task.title}</p>
            <p>{task.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};