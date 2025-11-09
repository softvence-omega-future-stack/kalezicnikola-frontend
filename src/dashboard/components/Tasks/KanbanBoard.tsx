// import React, { useState } from 'react';
// import { Plus, Edit2, Trash2, Calendar, Clock } from 'lucide-react';

// export default function KanbanBoard() {
//   const [columns] = useState([
//     {
//       id: 'todo',
//       title: 'To Do',
//       count: 5,
//       tasks: [
//         { id: 1, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'High', time: '9:00 AM', dueDate: 'Sep 30, 2025' },
//         { id: 2, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'Medium', time: '9:00 AM', dueDate: 'Sep 30, 2025' },
//         { id: 3, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'Low', time: '9:00 AM', dueDate: 'Sep 30, 2025' },
//         { id: 4, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'High', time: '9:00 AM', dueDate: 'Sep 30, 2025' },
//         { id: 5, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'Low', time: '9:00 AM', dueDate: 'Sep 30, 2025' }
//       ]
//     },
//     {
//       id: 'inprogress',
//       title: 'In Progress',
//       count: 5,
//       tasks: [
//         { id: 6, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'High', time: '9:00 AM', dueDate: 'Sep 30, 2025' },
//         { id: 7, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'Medium', time: '9:00 AM', dueDate: 'Sep 30, 2025' },
//         { id: 8, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'Low', time: '9:00 AM', dueDate: 'Sep 30, 2025' },
//         { id: 9, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'High', time: '9:00 AM', dueDate: 'Sep 30, 2025' },
//         { id: 10, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'Low', time: '9:00 AM', dueDate: 'Sep 30, 2025' }
//       ]
//     },
//     {
//       id: 'done',
//       title: 'Done',
//       count: 5,
//       tasks: [
//         { id: 11, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'High', time: '9:00 AM', dueDate: 'Sep 30, 2025' },
//         { id: 12, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'Medium', time: '9:00 AM', dueDate: 'Sep 30, 2025' },
//         { id: 13, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'High', time: '9:00 AM', dueDate: 'Sep 30, 2025' },
//         { id: 14, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'Low', time: '9:00 AM', dueDate: 'Sep 30, 2025' },
//         { id: 15, title: 'Review patient records', description: 'Go through the latest patient records and update the system', priority: 'Medium', time: '9:00 AM', dueDate: 'Sep 30, 2025' }
//       ]
//     }
//   ]);

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'High':
//         return 'bg-red-500 text-white';
//       case 'Medium':
//         return 'bg-orange-500 text-white';
//       case 'Low':
//         return 'bg-blue-400 text-white';
//       default:
//         return 'bg-gray-400 text-white';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//           {columns.map((column) => (
//             <div key={column.id} className="bg-white rounded-lg">
//               {/* Column Header */}
//               <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
//                 <div className="flex items-center gap-2">
//                   <h2 className="text-base font-semibold text-gray-900">{column.title}</h2>
//                   <span className="text-sm text-gray-500">({column.count})</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <button className="p-1 hover:bg-gray-100 rounded">
//                     <Plus className="w-4 h-4 text-gray-600" />
//                   </button>
//                   <button className="p-1 hover:bg-gray-100 rounded">
//                     <Edit2 className="w-4 h-4 text-gray-600" />
//                   </button>
//                   <button className="p-1 hover:bg-gray-100 rounded">
//                     <Trash2 className="w-4 h-4 text-gray-600" />
//                   </button>
//                 </div>
//               </div>

//               {/* Tasks */}
//               <div className="p-3 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
//                 {column.tasks.map((task) => (
//                   <div
//                     key={task.id}
//                     className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
//                   >
//                     <div className="flex items-start gap-3">
//                       {/* Checkbox */}
//                       <input
//                         type="checkbox"
//                         className="w-4 h-4 mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer flex-shrink-0"
//                       />

//                       {/* Content */}
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-start gap-2 mb-1.5">
//                           <h3 className="text-sm font-semibold text-gray-900 flex-1">
//                             {task.title}
//                           </h3>
//                           <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${getPriorityColor(task.priority)}`}>
//                             {task.priority}
//                           </span>
//                         </div>
//                         <p className="text-xs text-gray-600 mb-2 leading-relaxed">
//                           {task.description}
//                         </p>
//                         <div className="flex items-center gap-4 text-xs text-gray-600">
//                           <div className="flex items-center gap-1">
//                             <Clock className="w-3.5 h-3.5" />
//                             <span>{task.time}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Calendar className="w-3.5 h-3.5" />
//                             <span>Due: {task.dueDate}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }