import  { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import calender from '../../../assets/svgIcon/calender.svg'

interface AddTaskModalProps {
  onClose: () => void;
  onAddTask: (task: {
    title: string;
    description: string;
    status: string;
    priority: 'High' | 'Medium' | 'Low';
    dueDate: string;
  }) => void;
}

interface FormData {
  title: string;
  description: string;
  status: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
}

export default function AddTaskModal({ onClose, onAddTask }: AddTaskModalProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    status: 'To do',
    priority: 'Medium',
    dueDate: ''
  });

  const handleSubmit = () => {
    onAddTask(formData); // send data to parent
    onClose();           // close modal after submit
  };

  return (
    <div className="fixed inset-0 flex bg-black/50 items-center justify-center z-[9999] px-4">
      <div className="w-[672px] h-[646px] bg-gray-200 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gray-200 px-6 py-4 flex items-center justify-between border-b border-gray-300">
          <div>
            <h2 className="text-2xl font-semibold text-[#171C35]">Add Task</h2>
            <p className="text-sm text-[#667085] mt-0.5">
              Add a new task to your list, fill in the details below
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-300 rounded-[8px] transition-colors cursor-pointer"
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
              placeholder="Task title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-[8px] text-sm text-[#171c35]placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#526fff] focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-base font-medium text-[#171C35] mb-2">Description</label>
            <textarea
              placeholder="Details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-[8px] text-sm text-[#171c35]placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#526fff] focus:border-transparent resize-none"
            />
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-base font-medium text-[#171c35]mb-2">Status</label>
              <div className="relative">
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-[8px] text-sm text-[#171c35]focus:outline-none focus:ring-2 focus:ring-[#526fff] focus:border-transparent appearance-none cursor-pointer"
                >
                  <option>To do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-[#171c35]mb-2">Priority</label>
              <div className="relative">
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value as 'High' | 'Medium' | 'Low' })
                  }
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-[8px] text-sm text-[#171c35]focus:outline-none focus:ring-2 focus:ring-[#526fff] focus:border-transparent appearance-none cursor-pointer"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-base font-medium text-[#171c35]mb-2">Due Date</label>
            <div className="relative">
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-[8px] text-sm text-[#171c35]placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#526fff] focus:border-transparent"
              />
                <img src={calender} className='absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none' alt="" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-[#111a2d] rounded-[8px] text-sm font-medium hover:bg-gray-50 transition-color cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-4 py-2.5 bg-[#526FFF] text-white rounded-[8px] text-sm font-medium transition-colors cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


  // Hello there, 
  // I hope you are doing well. 
  // Today I'm giving you the update for the web. Currently, I am fully focused on the front-end work of the web. I have completed the full structure and worked on some tasks. The work is running smoothly, and I am hopeful that the front-end will be completed soon so Don't worry.
  // Live link: https://coruscating-sunflower-7e3cb2.netlify.app/ 
  // It's just a progress update.
  // Thank you.