import { useState, useMemo, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import AddTaskModal from './AddToTskModal';
import homeIcon from '../../../assets/svgIcon/homeIcon.svg';
import chevronIcon from '../../../assets/svgIcon/chevronnRight.svg';
import timeIon from '../../../assets/svgIcon/taskTimeIcon.svg';
import StatusDropdown from './Status';
import PriorityDropdown from './Prioritys';
import { useNavigate } from 'react-router-dom';
import { PatientRecordsModal } from './PatientRecordModal';
import { DeleteConfirmModal, DeleteSuccessMessage } from './DeleteModal';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store/hook';
import axios from 'axios';

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


interface Column {
  id: string;
  title: string;
  count: number;
  tasks: Task[];
}


export default function TaskList() {
  const { t } = useTranslation();
  const { accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  
  // Interface for translated task
  interface TranslatedTask {
    title: string;
    description: string;
    priority: string;
    time: string;
    dueDate: string;
    completed: boolean;
  }

  // Get translated static tasks from i18n
  const getInitialTasks = useMemo(() => {
    const todoTasks = t("dashboard.routes.taskList.staticTasks.todo", { returnObjects: true }) as TranslatedTask[];
    const inprogressTasks = t("dashboard.routes.taskList.staticTasks.inprogress", { returnObjects: true }) as TranslatedTask[];
    const doneTasks = t("dashboard.routes.taskList.staticTasks.done", { returnObjects: true }) as TranslatedTask[];

    return {
      todo: todoTasks.map((task, index) => ({
        id: index + 1,
        title: task.title,
        description: task.description,
        priority: task.priority as 'High' | 'Medium' | 'Low',
        time: task.time,
        dueDate: task.dueDate,
        completed: task.completed
      })),
      inprogress: inprogressTasks.map((task, index) => ({
        id: index + 6,
        title: task.title,
        description: task.description,
        priority: task.priority as 'High' | 'Medium' | 'Low',
        time: task.time,
        dueDate: task.dueDate,
        completed: task.completed
      })),
      done: doneTasks.map((task, index) => ({
        id: index + 11,
        title: task.title,
        description: task.description,
        priority: task.priority as 'High' | 'Medium' | 'Low',
        time: task.time,
        dueDate: task.dueDate,
        completed: task.completed
      }))
    };
  }, [t]);
    const [columns, setColumns] = useState<Column[]>([
  { id: 'todo', title: 'To Do', count: 0, tasks: [] },
  { id: 'inprogress', title: 'In Progress', count: 0, tasks: [] },
  { id: 'done', title: 'Done', count: 0, tasks: [] },
]);
useEffect(() => {
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
      'https://1x5kkm9k-5000.asse.devtunnels.ms/api/v1/doctor/task/all?page=1&limit=100',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      console.log(response)

      const tasks: Task[] = response.data.data.tasks; 
      console.log(tasks)
      setColumns(prevCols =>
        prevCols.map(col => ({
          ...col,
          tasks: tasks.filter(task => {
            if (col.id === 'todo') return task.status === 'TODO';
            if (col.id === 'inprogress') return task.status === 'IN_PROGRESS';
            if (col.id === 'done') return task.status === 'DONE';
            return false;
          }),
          count: tasks.filter(task => {
            if (col.id === 'todo') return task.status === 'TODO';
            if (col.id === 'inprogress') return task.status === 'IN_PROGRESS';
            if (col.id === 'done') return task.status === 'DONE';
            return false;
          }).length
        }))
      );
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }finally{
      setLoading(false);
    }
  };

  fetchTasks();
}, []);
console.log(columns)
  const getPriorityColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'HIGH': return 'bg-[#FF3D3D] text-white';
    case 'MEDIUM': return 'bg-[#FF883D] text-white';
    case 'LOW': return 'bg-[#88BFFF] text-white';
    default: return 'bg-gray-400 text-white';
  }
};



  // Update columns when language changes
  useEffect(() => {
    setColumns(prev => prev.map(col => ({
      ...col,
      title: t(`dashboard.routes.taskList.columns.${col.id}`),
      tasks: col.tasks.map(task => {
        // Find the corresponding translated task
        const initialTasks = getInitialTasks[col.id as keyof typeof getInitialTasks];
        const translatedTask = initialTasks?.find(t => t.id === task.id);
        
        // If found in initial tasks, use translated version, otherwise keep user-added task as is
        if (translatedTask) {
          return {
            ...task,
            title: translatedTask.title,
            description: translatedTask.description
          };
        }
        return task;
      })
    })));
  }, [t, getInitialTasks]);


  // Translate priority
  const translatePriority = (priority: Task['priority']) => {
    const priorityMap: Record<string, string> = {
      'HIGH': t("dashboard.routes.taskList.priority.high"),
      'MEDIUM': t("dashboard.routes.taskList.priority.medium"),
      'LOW': t("dashboard.routes.taskList.priority.low"),
    };
    return priorityMap[priority] || priority;
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [currentColumnId, setCurrentColumnId] = useState<string>('todo');
const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [modalTask, setModalTask] = useState<{ task: Task, columnId: string } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

    const getStatusFromColumnId = (columnId: string): Task['status'] => {
  switch (columnId) {
    case 'todo':
      return 'TODO';
    case 'inprogress':
      return 'IN_PROGRESS';
    case 'done':
      return 'DONE';
    default:
      throw new Error('Invalid column id');
  }
};

  const handleAddTask = (task: Omit<Task, 'id' | 'completed' | 'time'> & { status: string }) => {
  const columnId = task.status.toLowerCase().replace(/\s/g, '');
  const targetColumn = columns.find(col => col.id === columnId);
  if (!targetColumn) return;

  if (editingTask) {
    // Editing existing task
    setColumns(prev =>
      prev.map(col => {
        const isTarget = col.id === targetColumn.id;
        let updatedTasks = col.tasks.filter(t => t.id !== editingTask.id);
        if (isTarget) updatedTasks = [{ ...editingTask, ...task, priority: task.priority, status: getStatusFromColumnId(columnId) }, ...updatedTasks];
        return { ...col, tasks: updatedTasks, count: updatedTasks.length };
      })
    );
  } else {
    // Adding new task
    const newTask: Task = {
      id: Date.now().toString(), // better: uuid
      completed: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: task.title,
      description: task.description,
      status: getStatusFromColumnId(columnId), // ✅ correct
      priority: task.priority as Task['priority'],
      dueDate: task.dueDate,
    };

    setColumns(prev =>
      prev.map(col =>
        col.id === targetColumn.id
          ? { ...col, tasks: [newTask, ...col.tasks], count: [newTask, ...col.tasks].length }
          : col
      )
    );
  }

  setEditingTask(null);
  setShowAddModal(false);
  setSelectedTaskIds([]);
};

  const openAddModal = (columnId: string) => {
    setEditingTask(null);
    setCurrentColumnId(columnId);
    setShowAddModal(true);
    setSelectedTaskIds([]);
  };

  const openEditModal = () => {
    if (selectedTaskIds.length !== 1) return;
    
    const taskId = selectedTaskIds[0];
    let foundTask: Task | null = null;
    let foundColumnId = '';

    for (const col of columns) {
      const task = col.tasks.find(t => t.id === taskId);
      if (task) {
        foundTask = task;
        foundColumnId = col.id;
        break;
      }
    }

    if (foundTask) {
      setEditingTask(foundTask);
      setCurrentColumnId(foundColumnId);
      setShowAddModal(true);
    }
  };

  const triggerDeleteTasks = () => {
    if (selectedTaskIds.length === 0) return;
    setShowDeleteConfirm(true);
  };

  const confirmDeleteTasks = async () => {
  if (selectedTaskIds.length === 0) return;

  try {
    setLoading(true);

    // Send delete requests for each selected task
    await Promise.all(
      selectedTaskIds.map(taskId =>
        axios.delete(
          `${import.meta.env.VITE_API_URL}/doctor/task/delete/${taskId}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )
      )
    );

    // Update frontend after successful delete
    setColumns(prevColumns =>
      prevColumns.map(col => {
        const updatedTasks = col.tasks.filter(task => !selectedTaskIds.includes(task.id));
        return { ...col, tasks: updatedTasks, count: updatedTasks.length };
      })
    );

    setShowDeleteConfirm(false);
    setShowDeleteSuccess(true);
    setTimeout(() => setShowDeleteSuccess(false), 2000);
    setSelectedTaskIds([]);
  } catch (error) {
    console.error('Failed to delete tasks', error);
    alert('Failed to delete task(s). Please try again.');
  } finally {
    setLoading(false);
  }
};

  const cancelDeleteTask = () => {
    setShowDeleteConfirm(false);
  };

  const toggleTaskSelection = (taskId: string) => {
  setSelectedTaskIds(prev =>
    prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
  );
};

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string, sourceColumnId: string) => {
  const taskIdsToDrag = selectedTaskIds.includes(taskId) ? selectedTaskIds : [taskId];
  e.dataTransfer.setData('taskIds', JSON.stringify(taskIdsToDrag));
  e.dataTransfer.setData('sourceColumnId', sourceColumnId);
};

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

const onDrop = async (e: React.DragEvent<HTMLDivElement>, targetColumnId: string) => {
  e.preventDefault();
  const taskIdsStr = e.dataTransfer.getData('taskIds');
  const sourceColumnId = e.dataTransfer.getData('sourceColumnId');
  if (!taskIdsStr || !sourceColumnId) return;

  const taskIds: string[] = JSON.parse(taskIdsStr);
  let movedTasks: Task[] = [];

  // Show loader
  setLoading(true);

  // Prepare tasks to move
  const sourceColumn = columns.find(col => col.id === sourceColumnId);
  if (!sourceColumn) return;
  movedTasks = sourceColumn.tasks.filter(task => taskIds.includes(task.id));

  // API call first
  try {
    await Promise.all(
      movedTasks.map(task =>
        axios.patch(
          `${import.meta.env.VITE_API_URL}/doctor/task/update/${task.id}`,
          { status: getStatusFromColumnId(targetColumnId) },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )
      )
    );

    // Only update frontend after successful backend update
    setColumns(prevColumns => prevColumns.map(col => {
      if (col.id === sourceColumnId) {
        const remainingTasks = col.tasks.filter(task => !taskIds.includes(task.id));
        return { ...col, tasks: remainingTasks, count: remainingTasks.length };
      }
      if (col.id === targetColumnId) {
        return { ...col, tasks: [...movedTasks, ...col.tasks], count: col.tasks.length + movedTasks.length };
      }
      return col;
    }));

    setSelectedTaskIds([]);
  } catch (err) {
    console.error('Failed to update tasks', err);
    alert('Failed to move task. Please try again.');
  } finally {
    setLoading(false);
  }
};
  const hasSelectedTasks = selectedTaskIds.length > 0;
  const hasMultipleSelected = selectedTaskIds.length > 1;

  return (
    <div className="mt-2.5 md:mt-[30px]" onClick={() => setSelectedTaskIds([])}>
      {loading && (
          <div className="fixed inset-0 bg-black opacity-60 flex items-center justify-center z-[9999]">
            <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
          </div>
      )}

      {/* Header */}
      <div className="pb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <img src={homeIcon} alt="Home" className="w-4 h-4" />
            <img src={chevronIcon} alt=">" />
            <span onClick={() => navigate('/dashboard')} className="text-gray-600 font-medium cursor-pointer">
              {t("dashboard.routes.taskList.breadcrumb.dashboard")}
            </span>
            <img src={chevronIcon} alt=">" />
            <span className="text-[#042435] text-sm font-semibold">
              {t("dashboard.routes.taskList.breadcrumb.task")}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-[#171c35]">
              {t("dashboard.routes.taskList.header.title")}
            </h1>
            <p className="text-base font-medium text-[#111A2D] mt-1">
              {columns.reduce((acc, col) => acc + col.tasks.length, 0)} {t("dashboard.routes.taskList.header.totalTask")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-3 relative z-10">
            <div className="w-full sm:w-auto relative z-20">
              <StatusDropdown />
            </div>
            <div className="w-full sm:w-auto relative z-30" style={{ zIndex: 11 }}>
              <PriorityDropdown />
            </div>
            <button
              onClick={() => openAddModal(columns[0]?.id || 'todo')}
              className="w-full sm:w-auto px-4 py-2 bg-[#DCE2FF] text-black rounded-[8px] text-sm font-medium flex items-center justify-center cursor-pointer gap-2"
            >
              <Plus className="w-4 h-4" /> {t("dashboard.routes.taskList.header.addTask")}
            </button>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div style={{ zIndex: 16 }} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {columns.map(column => (
          <div key={column.id} className="bg-white rounded-2xl" onDragOver={onDragOver} onDrop={(e) => onDrop(e, column.id)}>
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-xl font-medium sm:font-semibold text-[#171c35]">
                  {t(`dashboard.routes.taskList.columns.${column.id}`)}
                </h2>
                <span className="text-sm text-gray-500">({column.count})</span>
              </div>
              
              <div className="flex items-center gap-1">
                {!hasSelectedTasks && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); openAddModal(column.id); }} 
                    className="p-1 hover:bg-gray-100 rounded cursor-pointer" 
                    title={`${t("dashboard.routes.taskList.actions.addTaskTo")} ${column.title}`}
                  >
                    <Plus className="w-4 h-4 text-[#111A2D]" />
                  </button>
                )}
                
                {hasSelectedTasks && !hasMultipleSelected && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); openEditModal(); }} 
                    className="p-1 hover:bg-gray-100 rounded cursor-pointer" 
                    title={t("dashboard.routes.taskList.actions.editTask")}
                  >
                    <Edit className="w-4 h-4 text-[#111A2D]" />
                  </button>
                )}
                
                {hasSelectedTasks && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); triggerDeleteTasks(); }} 
                    className="p-1 hover:bg-gray-100 rounded cursor-pointer" 
                    title={hasMultipleSelected ? t("dashboard.routes.taskList.actions.deleteSelected") : t("dashboard.routes.taskList.actions.deleteTask")}
                  >
                    <Trash2 className="w-4 h-4 text-[#111A2D]" />
                  </button>
                )}
              </div>
            </div>

            <div className="p-3 space-y-3 overflow-y-auto">
              {column.tasks.map(task => {
                const isSelected = selectedTaskIds.includes(task.id);

                return (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, task.id, column.id)}
                    className={`rounded-2xl p-3 ${isSelected ? "bg-[#DDE2FF]" : "bg-[#F3F6F6] hover:bg-[#E8ECFF]"}`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 mt-1 cursor-pointer accent-[#526fff]"
                        checked={isSelected}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => { e.stopPropagation(); toggleTaskSelection(task.id); }}
                      />

                      <div className="flex-1 min-w-0 cursor-pointer" onClick={(e) => { e.stopPropagation(); setModalTask({ task, columnId: column.id }); setShowRecordModal(true); }}>
                        <div className="flex items-start gap-3 mb-2">
                          <div className="flex-1">
                            <h3 className="text-sm sm:text-xl font-semibold text-[#171C35]">{task.title}</h3>
                            <p className="text-xs sm:text-base text-[#111A2D] mb-2 leading-relaxed">{task.description}</p>
                          </div>

                          <div className="flex items-center gap-2 pr-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${getPriorityColor(task.priority)}`}>
                              {translatePriority(task.priority)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm font-medium text-[#171C35]">
                          <div className="flex items-center gap-1 mt-2">
                            <img src={timeIon} alt="" />
                            <span>{task.time}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-2">
                            <span>{t("dashboard.routes.taskList.taskCard.due")}: {task.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div 
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] p-2 sm:p-4 overflow-auto"
          onClick={() => { setShowAddModal(false); setEditingTask(null); setSelectedTaskIds([]); }}
        >
          <div className="w-full max-w-[95%] sm:max-w-[672px] bg-gray-200 rounded-2xl shadow-2xl overflow-auto max-h-[95vh]" onClick={(e) => e.stopPropagation()}>
            <AddTaskModal
              onClose={() => { setShowAddModal(false); setEditingTask(null); setSelectedTaskIds([]); }}
              onAddTask={handleAddTask}
              initialTask={editingTask ? { ...editingTask, status: columns.find(c => c.id === currentColumnId)?.title || t("dashboard.routes.taskList.columns.todo") } : { status: columns.find(c => c.id === currentColumnId)?.title || t("dashboard.routes.taskList.columns.todo") }}
            />
          </div>
        </div>
      )}

      {/* Patient Records Modal */}
      {showRecordModal && modalTask && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] p-4 overflow-y-auto" onClick={() => setShowRecordModal(false)}>
          <div className="my-auto max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <PatientRecordsModal task={modalTask.task} onClose={() => setShowRecordModal(false)} />
          </div>
        </div>
      )}

      {/* Delete Modals */}
      <DeleteConfirmModal 
        isOpen={showDeleteConfirm}
        onClose={cancelDeleteTask}
        onConfirm={confirmDeleteTasks}
        taskCount={selectedTaskIds.length}
        isMultiple={hasMultipleSelected}
      />

      <DeleteSuccessMessage 
        isOpen={showDeleteSuccess}
        taskCount={selectedTaskIds.length}
        isMultiple={hasMultipleSelected}
      />
    </div>
  );
}