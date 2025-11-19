import { useState } from 'react';
import {  Plus, Edit, Trash2 } from 'lucide-react';
import AddTaskModal from './AddToTskModal';
import homeIcon from '../../../assets/svgIcon/homeIcon.svg'
import chevronIcon from '../../../assets/svgIcon/chevronnRight.svg'
import StatusDropdown from './Status';
import PriorityDropdown from './Prioritys';
import { useNavigate } from 'react-router-dom';

// --- Interface Definitions (No Change) ---
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
// ----------------------------------------

export default function TaskList() {

  const navigate = useNavigate()
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      count: 5,
      tasks: [
        { id: 1, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'High', time: '9:00 AM', dueDate: 'Sep 30, 2025', completed: false },
        { id: 2, title: 'Schedule follow-ups', description: 'Contact patients for their next appointments.', priority: 'Medium', time: '10:00 AM', dueDate: 'Oct 01, 2025', completed: false },
        { id: 3, title: 'Prepare discharge summaries', description: 'Draft summaries for patients leaving today.', priority: 'Low', time: '11:00 AM', dueDate: 'Sep 30, 2025', completed: false },
        { id: 4, title: 'Order supplies', description: 'Check inventory and order necessary medical supplies.', priority: 'High', time: '1:00 PM', dueDate: 'Sep 29, 2025', completed: false },
        { id: 5, title: 'Update internal wiki', description: 'Document new procedures for patient admission.', priority: 'Low', time: '2:00 PM', dueDate: 'Oct 05, 2025', completed: false },
      ],
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      count: 5,
      tasks: [
        { id: 6, title: 'Conduct Q.A. check', description: 'Verify data entry accuracy in the new EHR system.', priority: 'High', time: '9:00 AM', dueDate: 'Sep 30, 2025', completed: false },
        { id: 7, title: 'System maintenance', description: 'Applying the latest security patches to all servers.', priority: 'Medium', time: '10:00 AM', dueDate: 'Oct 02, 2025', completed: false },
        { id: 8, title: 'Staff training module', description: 'Developing a new module on patient confidentiality.', priority: 'Low', time: '11:00 AM', dueDate: 'Oct 07, 2025', completed: false },
        { id: 9, title: 'Financial audit preparation', description: 'Gathering quarterly financial reports and invoices.', priority: 'High', time: '1:00 PM', dueDate: 'Sep 28, 2025', completed: false },
        { id: 10, title: 'Design marketing flyers', description: 'Creating promotional material for the new clinic service.', priority: 'Low', time: '2:00 PM', dueDate: 'Oct 10, 2025', completed: false },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      count: 5,
      tasks: [
        { id: 11, title: 'Completed server backup', description: 'Full backup of all critical systems performed.', priority: 'High', time: '9:00 AM', dueDate: 'Sep 27, 2025', completed: true },
        { id: 12, title: 'Handled emergency calls', description: 'Resolved 5 high-priority support tickets.', priority: 'Medium', time: '10:00 AM', dueDate: 'Sep 26, 2025', completed: true },
        { id: 13, title: 'Monthly report finalized', description: 'Sent the performance report to the management team.', priority: 'High', time: '11:00 AM', dueDate: 'Sep 25, 2025', completed: true },
        { id: 14, title: 'Office cleanup schedule', description: 'Updated and distributed the cleaning rotation schedule.', priority: 'Low', time: '1:00 PM', dueDate: 'Sep 24, 2025', completed: true },
        { id: 15, title: 'New policy draft', description: 'Drafted the new remote work policy.', priority: 'Medium', time: '2:00 PM', dueDate: 'Sep 23, 2025', completed: true },
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


  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [currentColumnId, setCurrentColumnId] = useState<string>('todo'); 




  const handleRenameColumn = (columnId: string, currentTitle: string) => {
    const newTitle = window.prompt(`Enter new title for column "${currentTitle}":`, currentTitle);
    
    if (newTitle && newTitle.trim() !== '' && newTitle.trim() !== currentTitle) {
      setColumns(prevColumns =>
        prevColumns.map(col =>
          col.id === columnId ? { ...col, title: newTitle.trim() } : col
        )
      );
    }
  };

  const handleDeleteColumn = (columnId: string, columnTitle: string) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the column "${columnTitle}" and ALL its tasks? This action cannot be undone.`);
    
    if (isConfirmed) {
      setColumns(prevColumns => prevColumns.filter(col => col.id !== columnId));
    }
  };

  // --- TASK MANAGEMENT FUNCTIONS ---


  const handleAddTask = (task: Omit<Task, 'id' | 'completed' | 'time'> & { status: string }) => {
   
    const columnId = task.status.toLowerCase().replace(/\s/g, '');

    if (editingTask) {
    
      setColumns(prevColumns =>
        prevColumns.map(col => {
          const isTargetColumn = col.id === columnId;
          
          let updatedTasks = col.tasks.filter(t => t.id !== editingTask.id); 

          if (isTargetColumn) {
            
            updatedTasks = [
              ...updatedTasks,
              { 
                ...editingTask, 
                ...task, 
                priority: task.priority as Task['priority'] 
              } as Task
            ].sort((a, b) => a.id - b.id); 
          }

          return {
            ...col,
            tasks: updatedTasks,
            count: updatedTasks.length,
          };
        })
      );
    } else {
      // 2. ADDING new task
      const newTask: Task = {
        id: Date.now(), 
        completed: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        title: task.title,
        description: task.description,
        priority: task.priority as Task['priority'],
        dueDate: task.dueDate,
      };

      setColumns(prevColumns =>
        prevColumns.map(col =>
          col.id === columnId
            ? { ...col, tasks: [newTask, ...col.tasks], count: col.tasks.length + 1 }
            : col
        )
      );
    }
    setEditingTask(null);
    setShowAddModal(false);
  };
  

  const handleRemoveTask = (taskId: number, columnId: string) => {
    setColumns(prevColumns =>
      prevColumns.map(col => {
        if (col.id === columnId) {
          const updatedTasks = col.tasks.filter(task => task.id !== taskId);
          return {
            ...col,
            tasks: updatedTasks,
            count: updatedTasks.length,
          };
        }
        return col;
      })
    );
  };

  const openAddModal = (columnId: string) => {
    setEditingTask(null); 
    setCurrentColumnId(columnId);
    setShowAddModal(true);
  };

 
  const openEditModal = (task: Task, columnId: string) => {
    setEditingTask(task);
    setCurrentColumnId(columnId);
    setShowAddModal(true);
  };
  

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="  py-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <img src={homeIcon} alt="Home" />
          <span onClick={()=> navigate('/dashboard')} className="text-gray-600 font-medium cursor-pointer">Dashboard</span>
           <img src={chevronIcon} alt=">" />
          <span className="text-[#042435]  text-xs font-semibold">Task</span>
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
            
            {/* 1. All Status Button (Ensuring text and icon are flexed) */}
            <button className="">
              <StatusDropdown/>
            </button>
            
            {/* 2. All Priorities Button (Ensuring text and icon are flexed) */}
            <button className="">
              <PriorityDropdown/>
            </button>
            
            {/* Main Add Task button */}
            <button
              onClick={() => openAddModal(columns[0]?.id || 'todo')} 
              className="px-4 py-2 bg-[#DCE2FF] text-black rounded-[8px] text-sm font-medium cursor-pointer flex items-center gap-2 "
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className=" ">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {columns.map((column) => (
            <div key={column.id} className="bg-white rounded-2xl">
              {/* Column Header */}
              <div className="flex items-center justify-between px-4 py-3 ">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm sm:text-xl font-medium sm:font-semibold text-[#171c35]">{column.title}</h2>
                  <span className="text-sm text-gray-500">({column.count})</span>
                </div>
                <div className="flex items-center gap-1">
                  {/* 1. Add Task Button (Plus Icon) */}
                  <button 
                    onClick={() => openAddModal(column.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                    title={`Add Task to ${column.title}`}
                  >
                    <Plus className='w-4 h-4 text-[#111A2D] cursor-pointer' />
                  </button>
                  
                  {/* 2. Edit Column Name Icon */}
                  <button 
                    onClick={() => handleRenameColumn(column.id, column.title)}
                    className="p-1 hover:bg-gray-100 rounded cursor-pointer "
                    title="Rename Column"
                  >
                    <Edit className='w-4 h-4 text-[#111A2D]' />
                  </button>
                  
                  {/* 3. Delete Column Icon */}
                  <button 
                    onClick={() => handleDeleteColumn(column.id, column.title)}
                    className="p-1 hover:bg-gray-100 rounded cursor-pointer "
                    title="Delete Column"
                  >
                    <Trash2 className='w-4 h-4 text-[#111A2D]' />
                  </button>
                </div>
              </div>

              {/* Tasks */}
              <div className="p-3 space-y-3  overflow-y-auto">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-[#F3F6F6]  rounded-2xl p-3"
                  >
                    <div className="flex items-start gap-3">
                      
                      {/* Checkbox and Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-3 mb-2">
                           <input
                            type="checkbox"
                            checked={task.completed}
                            // Toggle complete logic can be added here if needed
                            className="w-4 h-4 mt-1 rounded border-gray-300 text-indigo-600 focus:ring-[#526fff] cursor-pointer flex-shrink-0"
                          />
                          <h3 className="text-sm sm:text-xl font-semibold text-[#171c35] flex-1">{task.title}</h3>
                          <div className='flex  items-center gap-2 pr-2'>
                            {/* Priority Tag */}
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${getPriorityColor(
                                task.priority
                              )}`}
                            >
                              {task.priority}
                            </span>
                             {/* Task Action Icons (Edit and Remove for individual task) */}
                            <button 
                              onClick={() => openEditModal(task, column.id)}
                              className="p-1 text-gray-500 hover:text-[#526fff] cursor-pointer rounded"
                              title="Edit Task"
                            >
                              <Edit className='w-4 h-4' />
                            </button>
                            <button 
                              onClick={() => handleRemoveTask(task.id, column.id)}
                              className="p-1 text-gray-500 hover:text-[#FF3D3D] cursor-pointer rounded"
                              title="Remove Task"
                            >
                              <Trash2 className='w-4 h-4' />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs sm:text-base text-[#111A2D] mb-2 leading-relaxed pl-7 pr-7">{task.description}</p>
                        <div className="flex items-center gap-4 text-sm font-medium text-[#171C35]">
                          <div className="flex items-center gap-1 pl-7 mt-2">
                           <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
  <path d="M4.9636 4.5108L3.95 3.95V2.5636M7.15 3.95C7.15 4.79869 6.81286 5.61262 6.21274 6.21274C5.61262 6.81286 4.79869 7.15 3.95 7.15C3.10131 7.15 2.28737 6.81286 1.68726 6.21274C1.08714 5.61262 0.75 4.79869 0.75 3.95C0.75 3.10131 1.08714 2.28737 1.68726 1.68726C2.28737 1.08714 3.10131 0.75 3.95 0.75C4.79869 0.75 5.61262 1.08714 6.21274 1.68726C6.81286 2.28737 7.15 3.10131 7.15 3.95Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                            <span>{task.time}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-2">
                            <span className='text-xs'></span>
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
      {showAddModal && (
        <AddTaskModal 
          onClose={() => {
            setShowAddModal(false); 
            setEditingTask(null); 
          }} 
          onAddTask={handleAddTask} 
          // Assuming AddTaskModalProps has been updated in the external file to accept this structure
          initialTask={editingTask 
            ? { 
                ...editingTask, 
                status: columns.find(c => c.id === currentColumnId)?.title || 'To Do' 
              } 
            : { 
                status: columns.find(c => c.id === currentColumnId)?.title || 'To Do' 
              }
          }
        />
      )}
    </div>
  );
}