import { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import calender from '../../../assets/svgIcon/calender.svg'

// Define the Task structure expected when editing from the parent component (TaskList)
interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  time: string;
  dueDate: string;
  completed: boolean;
}

// Define the data structure that the form will manage
interface FormData {
  title: string;
  description: string;
  status: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
}

// Define the Task structure passed back to the parent after submission
type TaskOutput = FormData & {
  // Omit the time, id, and completed fields for submission if adding a new task
  // Since you are using the parent's structure, we'll keep the output clean (FormData)
};

// ✅ FIX: Updated AddTaskModalProps to include initialTask
interface AddTaskModalProps {
  onClose: () => void;
  onAddTask: (task: TaskOutput) => void; 
  // initialTask can be a full Task object + status, or just the status when adding.
  initialTask?: (Task & { status: string }) | { status: string }; 
}


export default function AddTaskModal({ onClose, onAddTask, initialTask }: AddTaskModalProps) {
  
  // Determine if we are editing
  const isEditing = initialTask && 'id' in initialTask;
  const initialData: FormData = {
    title: isEditing ? (initialTask as Task).title : '',
    description: isEditing ? (initialTask as Task).description : '',
    status: initialTask?.status || 'To do', // Use passed status, or default to 'To do'
    priority: isEditing ? (initialTask as Task).priority : 'Medium',
    dueDate: isEditing ? (initialTask as Task).dueDate : '',
  };

  const [formData, setFormData] = useState<FormData>(initialData);

  // Note: Using useEffect here might be necessary if the modal is reused without remounting,
  // but for a simple modal, useState with the initialData calculated once is usually sufficient.
  // We include it here for robustness if the parent changes initialTask prop.
  useEffect(() => {
    setFormData(initialData);
  }, [initialTask]); 


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = () => {
    // We send back the formData which matches the TaskOutput type
    onAddTask(formData); 
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex bg-black/50 items-center justify-center z-[9999] px-4">
      <div className="w-[672px] h-[646px] bg-gray-200 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gray-200 px-6 py-4 flex items-center justify-between border-b border-gray-300">
          <div>
            <h2 className="text-2xl font-semibold text-[#171C35]">{isEditing ? 'Edit Task' : 'Add Task'}</h2>
            <p className="text-sm text-[#667085] mt-0.5">
              {isEditing ? 'Modify the task details below' : 'Add a new task to your list, fill in the details below'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-300 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-[#111a2d]" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-base font-medium text-[#171C35] mb-2">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Task title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-[#171c35] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#526fff] focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-base font-medium text-[#171C35] mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Details..."
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-[#171c35] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#526fff] focus:border-transparent resize-none"
            />
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-base font-medium text-[#171c35] mb-2">Status</label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-[#171c35] focus:outline-none focus:ring-2 focus:ring-[#526fff] focus:border-transparent appearance-none cursor-pointer"
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-[#171c35] mb-2">Priority</label>
              <div className="relative">
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value as 'High' | 'Medium' | 'Low' })
                  }
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-[#171c35] focus:outline-none focus:ring-2 focus:ring-[#526fff] focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-base font-medium text-[#171c35] mb-2">Due Date</label>
            <div className="relative">
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-[#171c35] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#526fff] focus:border-transparent"
              />
                <img src={calender} className='absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none' alt="Calendar icon" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-[#111a2d] rounded-xl text-sm font-medium hover:bg-gray-50 transition-color cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-4 py-2.5 bg-[#526FFF] text-white rounded-xl text-sm font-medium transition-colors cursor-pointer"
            >
              {isEditing ? 'Save Changes' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}