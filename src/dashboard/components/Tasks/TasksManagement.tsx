import { useState } from 'react';
import { Home, ChevronDown, Plus,  ChevronRight } from 'lucide-react';
import AddTaskModal from './AddToTskModal';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  time: string;
  dueDate: string;
  completed: boolean;
}


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


  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-[#FF3D3D] text-white';
      case 'Medium':
        return 'bg-[#FF883D] text-white';
      case 'Low':
        return 'bg-[#88BFFF] text-white';
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
            <ChevronRight size={12}/>
          <span className="text-[#042435]  text-xs font-semibold">Task</span>
        </div>

        {/* Title and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[#171c35]">Task</h1>
            <p className="text-base font-medium text-[#111A2D] mt-1">
              {columns.reduce((acc, col) => acc + col.tasks.length, 0)} Total task
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-[#F3F6F6] border border-gray-300 rounded-[8px] text-sm font-semibold text-[#111a2d]  flex items-center gap-2">
              All Status
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-[#F3F6F6] border border-gray-300 rounded-[8px] text-sm font-semibold text-[#111a2d] hover:bg-gray-50 flex items-center gap-2">
              All Priorities
              <ChevronDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-[#DCE2FF] text-black rounded-[8px] text-sm font-medium cursor-pointer flex items-center gap-2"
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
                  <h2 className="text-xl font-semibold text-[#171c35]">{column.title}</h2>
                  <span className="text-sm text-gray-500">({column.count})</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1 hover:bg-gray-100 rounded">
             

                 <img src="https://i.ibb.co.com/WNWLMm0k/plusIcon.png" alt="" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                   <img src="https://i.ibb.co.com/HD1hfW1s/editIcon.png" alt="" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                   <img src="       https://i.ibb.co.com/DfLzMBzg/delete-Icon.png" alt="" />
                  </button>
                </div>
              </div>

              {/* Tasks */}
              <div className="p-3 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white border border-gray-200 rounded-lg p-3  "
                  >
                    <div className="flex items-center gap-3">
          
                     

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                         <input
                        type="checkbox"
                        className="w-4 h-4  rounded border-gray-300 text-indigo-600 focus:ring-[#526fff] cursor-pointer flex-shrink-0"
                      />
                          <h3 className="text-xl font-semibold text-[#171c35] flex-1">{task.title}</h3>
                          <span
                            className={`px-2 py-0.5 rounded-full text-sm font-medium whitespace-nowrap ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-base text-[#111A2D] mb-2 leading-relaxed pl-6">{task.description}</p>
                        <div className="flex items-center gap-4 text-sm font-medium text-[#171C35]">
                          <div className="flex items-center gap-1 pl-6">
                                <img src="https://i.ibb.co.com/TxG7Rk1Q/clock.png" className='h-3 w-3' alt="" />
                            <span>{task.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                           <img src="https://i.ibb.co.com/gbYTtKHC/Date-Birth-Icon.png" className='h-3 w-3' alt="" />
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
