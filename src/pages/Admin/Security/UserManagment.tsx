import React, { useState } from 'react';
import edit from '../../../assets/svgIcon/editIcon.svg';
import userIcon from '../../../assets/svgIcon/user.svg';
import profile from '../../../assets/svgIcon/recentDoctor.svg';
import { X } from 'lucide-react';

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
    { id: 1, name: 'Alex', avatar: '', role: 'Super Admin', status: 'Active', twoFA: 'Enable', lastLogin: '01-09-2025' },
    { id: 2, name: 'Sarah', avatar: '', role: 'Support', status: 'Active', twoFA: 'Disable', lastLogin: '01-09-2025' },
    { id: 3, name: 'John', avatar: '', role: 'Developer', status: 'Active', twoFA: 'Enable', lastLogin: '01-09-2025' },
    { id: 4, name: 'Robert Fox', avatar: '', role: 'Doctor', status: 'Active', twoFA: 'Enable', lastLogin: '01-09-2025' },
    { id: 5, name: 'Jerome Bell', avatar: '', role: 'Doctor', status: 'Active', twoFA: 'Enable', lastLogin: '01-09-2025' },
    { id: 6, name: 'Cody Fisher', avatar: '', role: 'Doctor', status: 'Active', twoFA: 'Enable', lastLogin: '01-09-2025' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
    <div className="bg-white rounded-2xl p-5">
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-[#171C35]">User Management</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">2FA</th>
              <th className="px-6 py-3 text-left">Last Login</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                    <img src={profile} alt="" />
                  </div>
                  <span className="text-sm text-[#45464E]">{user.name}</span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#111A2D]">{user.role}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium ${
                    user.status === 'Active' ? 'bg-[#0089331A] text-[#008933]' : 'bg-red-100 text-red-500'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-[#008933]' : 'bg-red-500'}`}></span>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-6 py-2 rounded-full text-sm font-medium ${
                    user.twoFA === 'Enable' ? 'bg-[#526FFF1A] text-[#526FFF]' : 'bg-[#FF1C331A] text-[#FF1C33]'
                  }`}>
                    {user.twoFA}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#111A2D]">{user.lastLogin}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <button onClick={() => handleEditClick(user)} className="p-1.5 rounded transition-colors">
                    <img src={edit} alt="Edit" />
                  </button>
                  <button className="p-1.5 rounded transition-colors">
                    <img src={userIcon} alt="View" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={selectedUser.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  name="role"
                  value={selectedUser.role}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={selectedUser.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">2FA</label>
                <select
                  name="twoFA"
                  value={selectedUser.twoFA}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                >
                  <option value="Enable">Enable</option>
                  <option value="Disable">Disable</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-full font-medium hover:bg-blue-700 transition-colors"
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
