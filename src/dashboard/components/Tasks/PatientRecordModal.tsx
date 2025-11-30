import React from 'react';
import { X, } from 'lucide-react';
import timeIon from '../../../assets/svgIcon/taskTimeIcon.svg';

interface Task {
  id: number;
  title: string;
  description?: string;
}

interface ModalProps {
   task: Task | null; 
  onClose: () => void;
}

export const PatientRecordsModal: React.FC<ModalProps> = ({ task , onClose}) => {
  if (!task) return null;

  return (
    <div   onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 bg-opacity-40">
      <div className="bg-[#F3F6F6] p-10 rounded-[32px]  w-full  max-w-2xl max-h-[646px] overflow-hidden">
        {/* Header */}
        <div className=" pb-4 relative">
          <button
            onClick={onClose}
            className="absolute top-1 right-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
          
          <h2 className="text-2xl font-semibold leading-6 text-[#171C35] mb-2">
            Review patient records
          </h2>
          <p className="text-sm  text-[#667085] leading-3 mb-8">
            Add a new task to your list. Fill in the details below
          </p>
        </div>

        {/* Content */}
        <div className=" overflow-auto max-h-[calc(90vh-120px)]">
          {/* Date and Time */}
          <div className="flex items-center gap-3 mb-8 text-gray-700">
             <img src={timeIon} alt="" />
            <span className="text-base sm:text-lg md:text-xl text-[#171C35] font-medium leading-4 ">
              9:00 AM <span className="ml-4">Due: Sep 30, 2025</span>
            </span>
          </div>

          {/* Description Text */}
          <div className="space-y-8 text-gray-700 text-sm sm:text-base leading-relaxed">
            <p>
              Ihre Patienten werden den Unterschied kaum bemerken. Passen Sie die 
              Stimme des KI-Assistenten nahtlos an den Stil Ihrer Praxis an. Wählen Sie 
              ein souveränes männliches oder weibliches Sprachprofil. So sichern Sie 
              einen gleichbleibend angenehmen und professionellen Empfang für jeden 
              Anruf.
            </p>

            <p>
              Ihre Patienten werden den Unterschied kaum bemerken. Passen Sie die 
              Stimme des KI-Assistenten nahtlos an den Stil Ihrer Praxis an. Wählen Sie 
              ein souveränes männliches oder weibliches Sprachprofil. So sichern Sie 
              einen gleichbleibend angenehmen und professionellen Empfang für
            </p>

            <p>
              Ihre Patienten werden den Unterschied kaum bemerken. Passen Sie die 
              Stimme des KI-Assistenten nahtlos an den Stil Ihrer Praxis an. Wählen Sie 
              ein souveränes männliches oder weibliches Sprachprofil.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


