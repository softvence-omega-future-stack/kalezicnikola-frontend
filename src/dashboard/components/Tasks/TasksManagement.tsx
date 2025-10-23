import { useState } from 'react';
import { Home, ChevronDown, Plus, Clock, Calendar, Trash2, Edit2 } from 'lucide-react';
import AddTaskModal from './AddToTskModal';

// ✅ Task interface
interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  time: string;
  dueDate: string;
  completed: boolean;
}

// ✅ Column interface
interface Column {
  id: string;
  title: string;
  count: number;
  tasks: Task[];
}

export default function TaskList() {
  // ✅ Columns state
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      count: 5,
      tasks: [
        { id: 1, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'High', time: '9:00 AM', dueDate: 'Sep 30, 2025', completed: false },
        { id: 2, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'Medium', time: '9:00 AM', dueDate: 'Sep 30, 2025', completed: false },
        { id: 3, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'Low', time: '9:00 AM', dueDate: 'Sep 30, 2025', completed: false },
        { id: 4, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'High', time: '9:00 AM', dueDate: 'Sep 30, 2025', completed: false },
        { id: 5, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'Low', time: '9:00 AM', dueDate: 'Sep 30, 2025', completed: false },
      ],
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      count: 5,
      tasks: [
        { id: 6, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'High', time: '9:00 AM', dueDate: 'Sep 30, 2025', completed: false },
        { id: 7, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'Medium', time: '9:00 AM', dueDate: 'Sep 30, 2025', completed: false },
        { id: 8, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'Low', time: '9:00 AM', dueDate: 'Sep 30, 2025', completed: false },
        { id: 9, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'High', time: '9:00 AM', dueDate: 'Sep 30, 2025', completed: false },
        { id: 10, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'Low', time: '9:00 AM', dueDate: 'Sep 30, 2025', completed: false },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      count: 5,
      tasks: [
        { id: 11, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'High', time: '9:00 AM', dueDate: 'Sep 30, 2025', completed: false },
        { id: 12, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'Medium', time: '9:00 AM', dueDate: 'Sep 30, 2025', completed: false },
        { id: 13, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'High', time: '9:00 AM', dueDate: 'Sep 30, 2025', completed: false },
        { id: 14, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'Low', time: '9:00 AM', dueDate: 'Sep 30, 2025', completed: false },
        { id: 15, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'Medium', time: '9:00 AM', dueDate: 'Sep 30, 2025', completed: false },
      ],
    },
  ]);

  // ✅ Priority color helper
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500 text-white';
      case 'Medium':
        return 'bg-orange-500 text-white';
      case 'Low':
        return 'bg-blue-400 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  // ✅ Add Task Modal state
  const [showAddModal, setShowAddModal] = useState(false);

  // ✅ Add task handler
  const handleAddTask = (task: Omit<Task, 'id' | 'completed' | 'time'> & { status: string }) => {
    const newTask: Task = {
      id: Math.floor(Math.random() * 10000),
      completed: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: task.title,
      description: task.description,
      priority: task.priority as Task['priority'],
      dueDate: task.dueDate,
    };

    // Column অনুযায়ী add করা
    setColumns(prevColumns =>
      prevColumns.map(col =>
        col.id === task.status.toLowerCase().replace(' ', '')
          ? { ...col, tasks: [newTask, ...col.tasks], count: col.tasks.length + 1 }
          : col
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Home className="w-4 h-4" />
          <span className="text-gray-600 font-medium">Dashboard</span>
          <span>›</span>
          <span className="text-black font-bold">Task</span>
        </div>

        {/* Title and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Task</h1>
            <p className="text-sm text-gray-600 mt-1">
              {columns.reduce((acc, col) => acc + col.tasks.length, 0)} Total task
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              All Status
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              All Priorities
              <ChevronDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-indigo-100 text-black rounded-lg text-sm font-medium cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {columns.map((column) => (
            <div key={column.id} className="bg-white rounded-lg">
              {/* Column Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-gray-900">{column.title}</h2>
                  <span className="text-sm text-gray-500">({column.count})</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Trash2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Tasks */}
              <div className="p-3 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        className="w-4 h-4 mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer flex-shrink-0"
                      />

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 mb-1.5">
                          <h3 className="text-sm font-semibold text-gray-900 flex-1">{task.title}</h3>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2 leading-relaxed">{task.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{task.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Due: {task.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && <AddTaskModal onClose={() => setShowAddModal(false)} onAddTask={handleAddTask} />}
    </div>
  );
}
