import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import AddTaskModal from './AddToTskModal';
import homeIcon from '../../../assets/svgIcon/homeIcon.svg';
import chevronIcon from '../../../assets/svgIcon/chevronnRight.svg';
import timeIon from '../../../assets/svgIcon/taskTimeIcon.svg';
import StatusDropdown from './Status';
import PriorityDropdown from './Prioritys';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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
      case 'High': return 'bg-[#FF3D3D] text-white';
      case 'Medium': return 'bg-[#FF883D] text-white';
      case 'Low': return 'bg-[#88BFFF] text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [currentColumnId, setCurrentColumnId] = useState<string>('todo');
  const [selectedTask, setSelectedTask] = useState<{ task: Task, columnId: string } | null>(null);

  // Delete confirmation and success
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<{ taskId: number, columnId: string } | null>(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const handleAddTask = (task: Omit<Task, 'id' | 'completed' | 'time'> & { status: string }) => {
    const columnId = task.status.toLowerCase().replace(/\s/g, '');
    const targetColumn = columns.find(col => col.id === columnId);
    if (!targetColumn) return;

    if (editingTask) {
      setColumns(prev =>
        prev.map(col => {
          const isTarget = col.id === targetColumn.id;
          let updatedTasks = col.tasks.filter(t => t.id !== editingTask.id);
          if (isTarget) updatedTasks = [{ ...editingTask, ...task, priority: task.priority }, ...updatedTasks];
          return { ...col, tasks: updatedTasks, count: updatedTasks.length };
        })
      );
    } else {
      const newTask: Task = {
        id: Date.now(),
        completed: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        title: task.title,
        description: task.description,
        priority: task.priority as Task['priority'],
        dueDate: task.dueDate,
      };
      setColumns(prev =>
        prev.map(col => col.id === targetColumn.id ? { ...col, tasks: [newTask, ...col.tasks], count: col.tasks.length + 1 } : col)
      );
    }

    setEditingTask(null);
    setShowAddModal(false);
    setSelectedTask(null);
  };

  const openAddModal = (columnId: string) => {
    setEditingTask(null);
    setCurrentColumnId(columnId);
    setShowAddModal(true);
    setSelectedTask(null);
  };

  const openEditModal = (task: Task, columnId: string) => {
    setEditingTask(task);
    setCurrentColumnId(columnId);
    setShowAddModal(true);
    setSelectedTask(null);
  };

  const triggerDeleteTask = (taskId: number, columnId: string) => {
    setTaskToDelete({ taskId, columnId });
    setShowDeleteConfirm(true);
  };

  const confirmDeleteTask = () => {
    if (!taskToDelete) return;

    setColumns(prevColumns =>
      prevColumns.map(col => {
        if (col.id === taskToDelete.columnId) {
          const updatedTasks = col.tasks.filter(task => task.id !== taskToDelete.taskId);
          return { ...col, tasks: updatedTasks, count: updatedTasks.length };
        }
        return col;
      })
    );

    setShowDeleteConfirm(false);
    setShowDeleteSuccess(true);

    setTimeout(() => setShowDeleteSuccess(false), 2000);

    setSelectedTask(null);
    setTaskToDelete(null);
  };

  const cancelDeleteTask = () => {
    setTaskToDelete(null);
    setShowDeleteConfirm(false);
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: number, sourceColumnId: string) => {
    e.dataTransfer.setData('taskId', taskId.toString());
    e.dataTransfer.setData('sourceColumnId', sourceColumnId);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  const onDrop = (e: React.DragEvent<HTMLDivElement>, targetColumnId: string) => {
    const taskId = Number(e.dataTransfer.getData('taskId'));
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId');
    if (!taskId || !sourceColumnId) return;

    setColumns(prevColumns => {
      let movedTask: Task | null = null;
      const newColumns = prevColumns.map(col => {
        if (col.id === sourceColumnId) {
          const remainingTasks = col.tasks.filter(task => {
            if (task.id === taskId) {
              movedTask = task;
              return false;
            }
            return true;
          });
          return { ...col, tasks: remainingTasks, count: remainingTasks.length };
        }
        return col;
      });

      return newColumns.map(col => {
        if (col.id === targetColumnId && movedTask) {
          return { ...col, tasks: [movedTask, ...col.tasks], count: col.tasks.length + 1 };
        }
        return col;
      });
    });
    setSelectedTask(null);
  };

  return (
    <div className="mt-[30px]" onClick={() => setSelectedTask(null)}>
      {/* Header */}
    <div className="pb-4">
  {/* Breadcrumb */}
  <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-600 mb-4">
    <div className="flex items-center gap-2">
      <img src={homeIcon} alt="Home" className="w-4 h-4" />
      <img src={chevronIcon} alt=">" />
      <span
        onClick={() => navigate('/dashboard')}
        className="text-gray-600 font-medium cursor-pointer"
      >
        Dashboard
      </span>
      <img src={chevronIcon} alt=">" />
      <span className="text-[#042435] text-sm font-semibold">Task</span>
    </div>
  </div>

  {/* Header + Buttons */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    {/* Title */}
    <div>
      <h1 className="text-xl md:text-2xl font-semibold text-[#171c35]">Task</h1>
      <p className="text-base font-medium text-[#111A2D] mt-1">
        {columns.reduce((acc, col) => acc + col.tasks.length, 0)} Total task
      </p>
    </div>

    {/* Buttons / Dropdowns */}
    <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-3">
      {/* Status Dropdown */}
      <div className="w-full sm:w-auto">
        <StatusDropdown  />
      </div>

      {/* Priority Dropdown */}
      <div className="w-full sm:w-auto">
        <PriorityDropdown  />
      </div>

      {/* Add Task Button */}
      <button
        onClick={() => openAddModal(columns[0]?.id || 'todo')}
        className="w-full sm:w-auto px-4 py-2 bg-[#DCE2FF] text-black rounded-[8px] text-sm font-medium flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add Task
      </button>
    </div>
  </div>
</div>


      {/* Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {columns.map(column => (
          <div key={column.id} className="bg-white rounded-2xl" onDragOver={onDragOver} onDrop={(e) => onDrop(e, column.id)}>
            <div className="flex items-center justify-between px-4 py-3 ">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-xl font-medium sm:font-semibold text-[#171c35]">{column.title}</h2>
                <span className="text-sm text-gray-500">({column.count})</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openAddModal(column.id)} className="p-1 hover:bg-gray-100 rounded" title={`Add Task to ${column.title}`}><Plus className='w-4 h-4 text-[#111A2D]' /></button>
                <button
                  onClick={() => selectedTask && openEditModal(selectedTask.task, selectedTask.columnId)}
                  className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                  title="Edit Task"
                  disabled={!selectedTask}
                >
                  <Edit className='w-4 h-4 text-[#111A2D]' />
                </button>
                <button
                  onClick={() => selectedTask && triggerDeleteTask(selectedTask.task.id, selectedTask.columnId)}
                  className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                  title="Delete Task"
                  disabled={!selectedTask}
                >
                  <Trash2 className='w-4 h-4 text-[#111A2D]' />
                </button>
              </div>
            </div>

            {/* Tasks */}
            <div className="p-3 space-y-3 overflow-y-auto">
              {column.tasks.map(task => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, task.id, column.id)}
                  onClick={(e) => { e.stopPropagation(); setSelectedTask({ task, columnId: column.id }) }}
                  className={`bg-[#F3F6F6] cursor-pointer rounded-2xl p-3`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-2">
                        <input
                          type="checkbox"
                          className="w-4 h-4 mt-1 text-indigo-600 cursor-pointer accent-[#526fff]"
                          onChange={(e) => {
                            setColumns(prev => prev.map(col => {
                              if (col.id === column.id) {
                                return { ...col, tasks: col.tasks.map(t => t.id === task.id ? { ...t, completed: e.target.checked } : t) }
                              }
                              return col;
                            }))
                          }}
                        />
                        <h3 className="text-sm sm:text-xl font-semibold text-[#171c35] flex-1">{task.title}</h3>
                        <div className='flex items-center gap-2 pr-2'>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-base text-[#111A2D] mb-2 leading-relaxed pl-7 pr-7">{task.description}</p>
                      <div className="flex items-center gap-4 text-sm font-medium text-[#171C35]">
                        <div className="flex items-center gap-1 pl-7 mt-2">
                          <img src={timeIon} alt="" />
                          <span>{task.time}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
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

      {/* Add Task Modal */}
      {showAddModal && (
        <AddTaskModal
          onClose={() => { setShowAddModal(false); setEditingTask(null); setSelectedTask(null); }}
          onAddTask={handleAddTask}
          initialTask={editingTask
            ? { ...editingTask, status: columns.find(c => c.id === currentColumnId)?.title || 'To Do' }
            : { status: columns.find(c => c.id === currentColumnId)?.title || 'To Do' }
          }
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[320px] sm:w-[400px] text-center">
            <h3 className="text-lg font-semibold text-[#171C35] mb-4">Are you sure?</h3>
            <p className="text-sm text-gray-600 mb-6">Do you really want to delete this task? This action cannot be undone.</p>
            <div className="flex justify-center gap-4">
              <button onClick={cancelDeleteTask} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer ">No</button>
              <button onClick={confirmDeleteTask} className="px-4 py-2 rounded-lg bg-[#FF3D3D] text-white hover:bg-red-600 cursor-pointer">Yes</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Success Message */}
      {showDeleteSuccess && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50">
          Task deleted successfully!
        </div>
      )}
    </div>
  );
}
