import { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store/hook';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Task {
  id: string;
  title: string;
  description: string;
  patient: {
    id: string;
    insuranceId: string;
    firstName: string;
    lastName: string;
    photo?: string | null;
  } | null;
  priority: 'High' | 'Medium' | 'Low';
  time: string;
  dueDate: string;
  completed: boolean;
}

type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';
type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

interface FormData {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: string;
  patientId: string;
}

interface TaskFormErrors {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: string;
  patientId?: string;
}

type TaskOutput = FormData;

interface AddTaskModalProps {
  onClose: () => void;
  onAddTask: (task: TaskOutput) => void; 
  initialTask?: (Task & { status: string }) | { status: string }; 
}


export default function AddTaskModal({ onClose, onAddTask, initialTask }: AddTaskModalProps) {
  const { t } = useTranslation();
  const { accessToken } = useAppSelector((state) => state.auth);
  const [patient, setPatient] = useState<any[]>([]);
  const [loading,setLoading] = useState<boolean>(false)
  const isEditing = initialTask && 'id' in initialTask;

  const initialData: FormData = {
    title: isEditing ? (initialTask as Task).title : '',
    description: isEditing ? (initialTask as Task).description : '',
    patientId: isEditing ? initialTask.patient?.id || "" : "",
    status: (initialTask?.status?.toUpperCase() as Status) || 'TODO',
    priority: isEditing
      ? ((initialTask as Task).priority.toUpperCase() as Priority)
      : 'LOW',
    dueDate: isEditing
    ? new Date((initialTask as Task).dueDate).toISOString().split('T')[0]
    : '',  };

  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<TaskFormErrors>({});

  useEffect(() => {
    setFormData(initialData);
  }, [initialTask]);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/doctor/patient/all`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials:true
          }
        );

        setPatient(response.data.data.patients);
        // console.log(response.data.data.patients)
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false)
      }
    };

    fetchPatients();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  
const validateTask = (): boolean => {
  const newErrors: TaskFormErrors = {};

  // Title
  if (!formData.title.trim()) newErrors.title = "Title is required";

  // Description
  if (!formData.description.trim()) newErrors.description = "Description is required";

  // Status
  if (!formData.status) newErrors.status = "Status is required";

  // Priority
  if (!formData.priority) newErrors.priority = "Priority is required";

  // Due Date
  if (!formData.dueDate) newErrors.dueDate = "Due date is required";

  // Patient
  // if (!formData.patientId) newErrors.patientId = "Patient ID is required";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateTask()) return;

  const payload = {
    title: formData.title,
    description: formData.description,
    status: formData.status,
    priority: formData.priority,
    dueDate: formData.dueDate,
    patientId: formData.patientId,
  };

  try {
    setLoading(true)
    let response;

    if (isEditing && initialTask?.id) {
      // PATCH = Update Task
      response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/doctor/task/update/${initialTask.id}`,
        payload,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
    } else {
      // 🔥 POST = Create Task
      response = await axios.post(
        `${import.meta.env.VITE_API_URL}/doctor/task/create`,
        payload,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
    }
    
    toast.success(response.data.message || "Task saved successfully");
    
    // Update parent list
    onAddTask(response.data.data.task);
    onClose();
    setLoading(true)
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.message || "Server error");
    } else {
      alert("An unexpected error occurred");
    }
  }finally{
    setLoading(false)
  }
};


  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999] p-2 sm:p-4 overflow-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-[95%] sm:max-w-[672px] bg-gray-200 rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] sm:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gray-200 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-gray-300 flex-shrink-0">
          <div className="flex-1 min-w-0 pr-2 sm:pr-4">
            <h2 className="text-base sm:text-lg font-semibold text-[#171C35] truncate">
              {isEditing 
                ? t('dashboard.routes.taskList.addTaskModal.titleEdit') 
                : t('dashboard.routes.taskList.addTaskModal.titleAdd')}
            </h2>
            <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
              {isEditing 
                ? t('dashboard.routes.taskList.addTaskModal.subtitleEdit') 
                : t('dashboard.routes.taskList.addTaskModal.subtitleAdd')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-300 rounded-xl transition-colors cursor-pointer flex-shrink-0"
          >
            <X className="w-5 h-5 text-[#111a2d]" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-3 sm:p-6 space-y-4 overflow-y-auto flex-1 min-h-[200px]">
          {/* Title */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-[#171C35] mb-1 sm:mb-2">
              {t('dashboard.routes.taskList.addTaskModal.labels.title')}
            </label>
            <input
              type="text"
              name="title"
              placeholder={t('dashboard.routes.taskList.addTaskModal.placeholders.title')}
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-300 rounded-xl text-sm sm:text-sm text-[#171c35] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#526fff] focus:border-transparent"
            />
            {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title}
                </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-[#171C35] mb-1 sm:mb-2">
              {t('dashboard.routes.taskList.addTaskModal.labels.description')}
            </label>
            <textarea
              name="description"
              placeholder={t('dashboard.routes.taskList.addTaskModal.placeholders.description')}
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-300 rounded-xl text-sm sm:text-sm text-[#171c35] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#526fff] focus:border-transparent resize-none"
            />
            {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
            )}
          </div>

          {/* Patient Id */}

          <div>
            <label className="block text-sm sm:text-base font-medium text-[#171c35] mb-1 sm:mb-2">Patient ID</label>
            <div className="relative">
              <select
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-300 rounded-xl text-sm sm:text-sm text-[#171c35] focus:outline-none focus:ring-2 focus:ring-[#526fff] focus:border-transparent appearance-none cursor-pointer"
              >
                <option value="">Select Patient ID</option>

                {patient.map((p: any) => (
                  <option key={p.id} value={p.id}>  
                    {p.insuranceId} — {p.firstName} {p.lastName}
                  </option>
                ))}

              </select>
              
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>


          {/* Status and Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm sm:text-base font-medium text-[#171c35] mb-1 sm:mb-2">
                {t('dashboard.routes.taskList.addTaskModal.labels.status')}
              </label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value as Status })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-300 rounded-xl text-sm sm:text-sm text-[#171c35] focus:outline-none focus:ring-2 focus:ring-[#526fff] focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value="TODO">{t('dashboard.routes.taskList.addTaskModal.statusOptions.todo')}</option>
                  <option value="IN_PROGRESS">{t('dashboard.routes.taskList.addTaskModal.statusOptions.inProgress')}</option>
                  <option value="DONE">{t('dashboard.routes.taskList.addTaskModal.statusOptions.done')}</option>
                </select>
                {errors.status && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.status}
                </p>
            )}
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm sm:text-base font-medium text-[#171c35] mb-1 sm:mb-2">
                {t('dashboard.routes.taskList.addTaskModal.labels.priority')}
              </label>
              <div className="relative">
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={e => setFormData({ ...formData, priority: e.target.value as Priority })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-300 rounded-xl text-sm sm:text-sm text-[#171c35] focus:outline-none focus:ring-2 focus:ring-[#526fff] focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value="LOW">{t('dashboard.routes.taskList.addTaskModal.priorityOptions.low')}</option>
                  <option value="MEDIUM">{t('dashboard.routes.taskList.addTaskModal.priorityOptions.medium')}</option>
                  <option value="HIGH">{t('dashboard.routes.taskList.addTaskModal.priorityOptions.high')}</option>
                </select>
                {errors.priority && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.priority}
                </p>
            )}
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-[#171c35] mb-1 sm:mb-2">
              {t('dashboard.routes.taskList.addTaskModal.labels.dueDate')}
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-300 rounded-xl text-sm sm:text-sm text-[#171c35] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#526fff] focus:border-transparent"
            />
            {errors.dueDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dueDate}
                </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:flex-1 px-4 py-2.5 bg-white border border-gray-300 text-[#111a2d] rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {t('dashboard.routes.taskList.addTaskModal.buttons.cancel')}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full sm:flex-1 px-4 py-2.5 bg-[#526FFF] text-white rounded-xl text-sm font-medium hover:bg-[#4159CC] transition-colors cursor-pointer"
            >
              {loading ? 'Submitting...' :
                isEditing 
                  ? t('dashboard.routes.taskList.addTaskModal.buttons.saveChanges') 
                  : t('dashboard.routes.taskList.addTaskModal.buttons.submit')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}







// import { useState, useEffect } from 'react';
// import { X, ChevronDown } from 'lucide-react';
// //import calender from '../../../assets/svgIcon/calender.svg'

// // Define the Task structure expected when editing from the parent component (TaskList)
// interface Task {
//   id: number;
//   title: string;
//   description: string;
//   priority: 'High' | 'Medium' | 'Low';
//   time: string;
//   dueDate: string;
//   completed: boolean;
// }

// // Define the data structure that the form will manage
// interface FormData {
//   title: string;
//   description: string;
//   status: string;
//   priority: 'High' | 'Medium' | 'Low';
//   dueDate: string;
// }

// // Define the Task structure passed back to the parent after submission
// type TaskOutput = FormData & {
//   // Omit the time, id, and completed fields for submission if adding a new task
//   // Since you are using the parent's structure, we'll keep the output clean (FormData)
// };

// // ✅ FIX: Updated AddTaskModalProps to include initialTask
// interface AddTaskModalProps {
//   onClose: () => void;
//   onAddTask: (task: TaskOutput) => void; 
//   // initialTask can be a full Task object + status, or just the status when adding.
//   initialTask?: (Task & { status: string }) | { status: string }; 
// }


// export default function AddTaskModal({ onClose, onAddTask, initialTask }: AddTaskModalProps) {
  
//   // Determine if we are editing
//   const isEditing = initialTask && 'id' in initialTask;
//   const initialData: FormData = {
//     title: isEditing ? (initialTask as Task).title : '',
//     description: isEditing ? (initialTask as Task).description : '',
//     status: initialTask?.status || 'To do', // Use passed status, or default to 'To do'
//     priority: isEditing ? (initialTask as Task).priority : 'Medium',
//     dueDate: isEditing ? (initialTask as Task).dueDate : '',
//   };

//   const [formData, setFormData] = useState<FormData>(initialData);

//   // Note: Using useEffect here might be necessary if the modal is reused without remounting,
//   // but for a simple modal, useState with the initialData calculated once is usually sufficient.
//   // We include it here for robustness if the parent changes initialTask prop.
//   useEffect(() => {
//     setFormData(initialData);
//   }, [initialTask]); 


//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };


//   const handleSubmit = () => {
//     // We send back the formData which matches the TaskOutput type
//     onAddTask(formData); 
//     onClose(); 
//   };

//   return (
//     <div className="fixed inset-0 flex bg-black/50 items-center justify-center z-[9999] px-4">
//       <div className="w-[672px] h-[646px] bg-gray-200 rounded-2xl shadow-2xl overflow-hidden">
//         {/* Header */}
//         <div className="bg-gray-200 px-6 py-4 flex items-center justify-between border-b border-gray-300">
//           <div>
//             <h2 className="text-2xl font-semibold text-[#171C35]">{isEditing ? 'Edit Task' : 'Add Task'}</h2>
//             <p className="text-sm text-[#667085] mt-0.5">
//               {isEditing ? 'Modify the task details below' : 'Add a new task to your list, fill in the details below'}
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 flex items-center justify-center hover:bg-gray-300 rounded-xl transition-colors cursor-pointer"
//           >
//             <X className="w-5 h-5 text-[#111a2d]" />
//           </button>
//         </div>

//         {/* Form Content */}
//         <div className="p-6 space-y-4">
//           {/* Title */}
//           <div>
//             <label className="block text-base font-medium text-[#171C35] mb-2">Title</label>
//             <input
//               type="text"
//               name="title"
//               placeholder="Task title"
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-[#171c35] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#526fff] focus:border-transparent"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-base font-medium text-[#171C35] mb-2">Description</label>
//             <textarea
//               name="description"
//               placeholder="Details..."
//               value={formData.description}
//               onChange={handleChange}
//               rows={4}
//               className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-[#171c35] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#526fff] focus:border-transparent resize-none"
//             />
//           </div>

//           {/* Status and Priority */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-base font-medium text-[#171c35] mb-2">Status</label>
//               <div className="relative">
//                 <select
//                   name="status"
//                   value={formData.status}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-[#171c35] focus:outline-none focus:ring-2 focus:ring-[#526fff] focus:border-transparent appearance-none cursor-pointer"
//                 >
//                   <option>To Do</option>
//                   <option>In Progress</option>
//                   <option>Done</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//               </div>
//             </div>

//             <div>
//               <label className="block text-base font-medium text-[#171c35] mb-2">Priority</label>
//               <div className="relative">
//                 <select
//                   name="priority"
//                   value={formData.priority}
//                   onChange={(e) =>
//                     setFormData({ ...formData, priority: e.target.value as 'High' | 'Medium' | 'Low' })
//                   }
//                   className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-[#171c35] focus:outline-none focus:ring-2 focus:ring-[#526fff] focus:border-transparent appearance-none cursor-pointer"
//                 >
//                   <option value="Low">Low</option>
//                   <option value="Medium">Medium</option>
//                   <option value="High">High</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//               </div>
//             </div>
//           </div>

//           {/* Due Date */}
//           <div>
//             <label className="block text-base font-medium text-[#171c35] mb-2">Due Date</label>
//             <div className="relative">
//               <input
//                 type="date"
//                 name="dueDate"
//                 value={formData.dueDate}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-[#171c35] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#526fff] focus:border-transparent"
//               />
//                 {/* <img src={calender} className='absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none' alt="Calendar icon" /> */}
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-[#111a2d] rounded-xl text-sm font-medium hover:bg-gray-50 transition-color cursor-pointer"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={handleSubmit}
//               className="flex-1 px-4 py-2.5 bg-[#526FFF] text-white rounded-xl text-sm font-medium transition-colors cursor-pointer"
//             >
//               {isEditing ? 'Save Changes' : 'Submit'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


