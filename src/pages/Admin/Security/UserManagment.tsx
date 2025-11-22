import React, { useState } from 'react';
import { X, User, SquarePen, UserRoundX } from 'lucide-react';
import profile from "../../../assets/svgIcon/userProfile.svg";

interface User {
  id: number;
  name: string;
  avatar: string;
  role: string;
  status: 'Active' | 'Inactive';
  twoFA: 'Enable' | 'Disable';
  lastLogin: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Alex', avatar: profile, role: 'Super Admin', status: 'Active', twoFA: 'Enable', lastLogin: '01-09-2025' },
    { id: 2, name: 'Sarah', avatar: profile, role: 'Support', status: 'Active', twoFA: 'Disable', lastLogin: '01-09-2025' },
    { id: 3, name: 'John', avatar: profile, role: 'Developer', status: 'Active', twoFA: 'Enable', lastLogin: '01-09-2025' },
    { id: 4, name: 'Robert Fox', avatar: profile, role: 'Doctor', status: 'Active', twoFA: 'Enable', lastLogin: '01-09-2025' },
    { id: 5, name: 'Jerome Bell', avatar: profile, role: 'Doctor', status: 'Active', twoFA: 'Enable', lastLogin: '01-09-2025' },
    { id: 6, name: 'Cody Fisher', avatar: profile, role: 'Doctor', status: 'Active', twoFA: 'Enable', lastLogin: '01-09-2025' },
  ]);

  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Check if all users are selected
  const allSelected = selectedUsers.length === users.length && users.length > 0;
  
  // Check if some (but not all) users are selected
  const someSelected = selectedUsers.length > 0 && selectedUsers.length < users.length;

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(u => u.id));
    }
  };

  // Handle individual checkbox
  const handleSelectUser = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (selectedUser) {
      setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
    }
  };

  const handleSave = () => {
    if (selectedUser) {
      setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
      setIsModalOpen(false);
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-3xl mt-4">
      <div className="">
        <div className="mb-4">
          <h1 className="text-xl md:text-2xl font-semibold text-headingBlack pb-1 md:pb-3">User Management</h1>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className='text-sm md:text-base font-semibold text-headingBlack whitespace-nowrap'>
                <th className="px-4 py-4 text-left w-12">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={input => {
                      if (input) {
                        input.indeterminate = someSelected;
                      }
                    }}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded-[6px] border border-[#D0D5DD] text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </th>
                <th className="px-4 py-4 text-left">User</th>
                <th className="px-4 py-4 text-left">Role</th>
                <th className="px-4 py-4 text-left">Status</th>
                <th className="px-4 py-4 text-left">2FA</th>
                <th className="px-4 py-4 text-left">Last Login</th>
                <th className="px-4 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(user => (
                <tr 
                  key={user.id} 
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="w-4 h-4 rounded-[6px] border border-[#D0D5DD] text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </td>
                  
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img 
                          src={profile} 
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium text-[#45464E] whitespace-nowrap">{user.name}</span>
                    </div>
                  </td>
                  
                  <td className="px-4 py-4">
                    <span className="text-sm text-subHeadingBlack font-medium whitespace-nowrap">{user.role}</span>
                  </td>
                  
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap ${
                      user.status === 'Active' 
                        ? 'bg-[rgba(0,137,51,0.10)] text-[#008933]' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        user.status === 'Active' ? 'bg-[#008933]' : 'bg-gray-600'
                      }`}></span>
                      {user.status}
                    </span>
                  </td>
                  
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-3 sm:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap ${
                      user.twoFA === 'Enable' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {user.twoFA}
                    </span>
                  </td>
                  
                  <td className="px-4 py-4">
                    <span className="text-xs md:text-sm font-medium text-subHeadingBlack whitespace-nowrap">{user.lastLogin}</span>
                  </td>
                  
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <button 
                        onClick={() => handleEditClick(user)} 
                        className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                        title="Edit user"
                      >
                        <SquarePen className="text-black h-4 w-4 sm:h-5 sm:w-5 " />
                      </button>
                      <button 
                        className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                        title="View user"
                      >
                        <UserRoundX size={20} className="text-black h-4 w-4 sm:h-5 sm:w-5 " />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Edit User</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={selectedUser.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  type="text"
                  name="role"
                  value={selectedUser.role}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={selectedUser.status}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">2FA</label>
                <select
                  name="twoFA"
                  value={selectedUser.twoFA}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Enable">Enable</option>
                  <option value="Disable">Disable</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="mt-6 w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;









// import React, { useState } from 'react';
// import edit from '../../../assets/svgIcon/editIcon.svg';
// import userIcon from '../../../assets/svgIcon/user.svg';
// import profile from '../../../assets/svgIcon/recentDoctor.svg';
// import { X } from 'lucide-react';

// interface User {
//   id: number;
//   name: string;
//   avatar: string;
//   role: string;
//   status: 'Active' | 'Inactive';
//   twoFA: 'Enable' | 'Disable';
//   lastLogin: string;
// }

// const UserManagement: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([
//     { id: 1, name: 'Alex', avatar: '', role: 'Super Admin', status: 'Active', twoFA: 'Enable', lastLogin: '01-09-2025' },
//     { id: 2, name: 'Sarah', avatar: '', role: 'Support', status: 'Active', twoFA: 'Disable', lastLogin: '01-09-2025' },
//     { id: 3, name: 'John', avatar: '', role: 'Developer', status: 'Active', twoFA: 'Enable', lastLogin: '01-09-2025' },
//     { id: 4, name: 'Robert Fox', avatar: '', role: 'Doctor', status: 'Active', twoFA: 'Enable', lastLogin: '01-09-2025' },
//     { id: 5, name: 'Jerome Bell', avatar: '', role: 'Doctor', status: 'Active', twoFA: 'Enable', lastLogin: '01-09-2025' },
//     { id: 6, name: 'Cody Fisher', avatar: '', role: 'Doctor', status: 'Active', twoFA: 'Enable', lastLogin: '01-09-2025' },
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);

//   const handleEditClick = (user: User) => {
//     setSelectedUser(user);
//     setIsModalOpen(true);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     if (selectedUser) {
//       setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSave = () => {
//     if (selectedUser) {
//       setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
//       setIsModalOpen(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl p-5">
//       <div className="p-6">
//         <h1 className="text-2xl font-semibold text-headingBlack">User Management</h1>
//       </div>

// <div className="overflow-x-auto">
//   <table className="w-full min-w-[600px]">
//     <thead className="bg-gray-50 border-b border-gray-200">
//       <tr>
//         {/* All th padding kept at px-1 for minimum spacing on mobile */}
//         <th className="px-1 sm:px-3 py-2 text-left text-xs sm:text-base font-semibold text-gray-600 w-[30%]">User</th>
//         <th className="px-1 sm:px-3 py-2 text-left text-xs sm:text-base font-semibold text-gray-600 w-[20%]">Role</th>
//         <th className="px-1 sm:px-3 py-2 text-left text-xs sm:text-base font-semibold text-gray-600 w-[15%]">Status</th>
//         <th className="px-1 sm:px-3 py-2 text-left text-xs sm:text-base font-semibold text-gray-600 w-[10%]">2FA</th>
//         <th className="px-1 sm:px-3 py-2 text-left text-xs sm:text-base font-semibold text-gray-600 w-[15%]">Last Login</th>
//         <th className="px-1 sm:px-3 py-2 text-left text-xs sm:text-base font-semibold text-gray-600 w-[10%]">Actions</th>
//       </tr>
//     </thead>
//     <tbody className="divide-y divide-gray-100">
//       {users.map(user => (
//         <tr key={user.id} className="text-xs text-gray-700 sm:text-base hover:bg-gray-50 transition-colors">
          
//           {/* USER CELL: px-1 retained, vertical stack on mobile */}
//           <td className="px-1 sm:px-3 py-2">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
//               <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
//                 <img src={profile} alt="" className="w-5 h-5 sm:w-8 sm:h-8"/>
//               </div>
//               <span className="text-sm font-medium truncate max-w-[80px] sm:max-w-full leading-tight">{user.name}</span>
//             </div>
//           </td>
          
//           {/* Role Cell: px-1 retained */}
//           <td className="px-1 sm:px-3 py-2 font-medium">{user.role}</td>
          
//           {/* Status Cell: px-1 retained, badge padding reduced to px-1 py-0*/}
//           <td className="px-1 sm:px-3 py-2">
//             <span className={`inline-flex items-center gap-1 px-1 py-0 rounded-full text-[10px] sm:text-xs font-medium ${
//               user.status === 'Active' ? 'bg-[#0089331A] text-[#008933]' : 'bg-red-100 text-red-500'
//             }`}>
//               <span className={`w-1 h-1 rounded-full ${user.status === 'Active' ? 'bg-[#008933]' : 'bg-red-500'}`}></span>
//               {user.status}
//             </span>
//           </td>
          
//           {/* 2FA Cell: px-1 retained, badge padding reduced to px-1 py-0*/}
//           <td className="px-1 sm:px-3 py-2">
//             <span className={`inline-flex px-1 py-0 rounded-full text-[10px] sm:text-xs font-medium ${
//               user.twoFA === 'Enable' ? 'bg-[#526FFF1A] text-[#526FFF]' : 'bg-[#FF1C331A] text-[#FF1C33]'
//             }`}>
//               {user.twoFA}
//             </span>
//           </td>
          
//           {/* Last Login Cell: px-1 retained */}
//           <td className="px-1 sm:px-3 py-2 text-xs">{user.lastLogin}</td>
          
//           {/* Actions Cell: px-1 retained, gap reduced to zero */}
//           <td className="px-1 sm:px-3 py-2 flex items-center gap-0">
//             {/* Reduced button padding to p-0.5 (2px) for minimum space */}
//             <button onClick={() => handleEditClick(user)} className="p-0.5 rounded hover:bg-gray-100">
//               <img src={edit} alt="Edit" className="w-4 h-4"/>
//             </button>
//             <button className="p-0.5 rounded hover:bg-gray-100">
//               <img src={userIcon} alt="View" className="w-4 h-4"/>
//             </button>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>


//       {/* Edit Modal */}
//       {isModalOpen && selectedUser && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <X size={20} />
//             </button>
//             <h2 className="text-xl font-semibold mb-4">Edit User</h2>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={selectedUser.name}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Role</label>
//                 <input
//                   type="text"
//                   name="role"
//                   value={selectedUser.role}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Status</label>
//                 <select
//                   name="status"
//                   value={selectedUser.status}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">2FA</label>
//                 <select
//                   name="twoFA"
//                   value={selectedUser.twoFA}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
//                 >
//                   <option value="Enable">Enable</option>
//                   <option value="Disable">Disable</option>
//                 </select>
//               </div>
//             </div>

//             <button
//               onClick={handleSave}
//               className="mt-6 w-full bg-blue-600 text-white py-2 rounded-full font-medium hover:bg-blue-700 transition-colors"
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserManagement;
