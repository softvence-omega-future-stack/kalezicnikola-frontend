import  { useState } from 'react';
import { X, Calendar, ChevronDown } from 'lucide-react';

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
            <h2 className="text-lg font-semibold text-gray-900">Add Task</h2>
            <p className="text-xs text-gray-600 mt-0.5">
              Add a new task to your list, fill in the details below
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-300 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Title</label>
            <input
              type="text"
              placeholder="Task title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
            <textarea
              placeholder="Details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Status</label>
              <div className="relative">
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none cursor-pointer"
                >
                  <option>To do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Priority</label>
              <div className="relative">
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value as 'High' | 'Medium' | 'Low' })
                  }
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none cursor-pointer"
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
            <label className="block text-sm font-medium text-gray-900 mb-2">Due Date</label>
            <div className="relative">
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-color cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
