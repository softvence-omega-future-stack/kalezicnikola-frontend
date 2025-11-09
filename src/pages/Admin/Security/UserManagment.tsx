import React from 'react';
import edit from '../../../assets/svgIcon/editIcon.svg'
import userIcon from '../../../assets/svgIcon/user.svg'
import profile from '../../../assets/svgIcon/recentDoctor.svg'

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


  const users: User[] = [
    { id: 1, name: 'Alex', avatar: '', role: 'Super Admin', status: 'Active', twoFA: 'Enable', lastLogin: '01-09-2025' },
    { id: 2, name: 'Sarah', avatar: '', role: 'Support', status: 'Active', twoFA: 'Disable', lastLogin: '01-09-2025' },
    { id: 3, name: 'John', avatar: '', role: 'Developer', status: 'Active', twoFA: 'Enable', lastLogin: '01-09-2025' },
    { id: 4, name: 'Robert Fox', avatar: '', role: 'Doctor', status: 'Active', twoFA: 'Enable', lastLogin: '01-09-2025' },
    { id: 5, name: 'Jerome Bell', avatar: '', role: 'Doctor', status: 'Active', twoFA: 'Enable', lastLogin: '01-09-2025' },
    { id: 6, name: 'Cody Fisher', avatar: '', role: 'Doctor', status: 'Active', twoFA: 'Enable', lastLogin: '01-09-2025' },
  ];



  return (
    <div className=" bg-white rounded-2xl p-5">
      <div className=" ">
        
        {/* User Management Section */}
        <div className="">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-[#171C35]">User Management</h1>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
           <thead>
  <tr>
    {/* Checkbox + User */}
    <th className="px-6 py-3 text-left">
      <div className="flex items-center gap-3">
        <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
        <span className="text-base font-semibold text-[#171c35]">User</span>
      </div>
    </th>

    <th className="px-6 py-3 text-left text-base font-semibold text-[#171c35]">Role</th>
    <th className="px-6 py-3 text-left text-base font-semibold text-[#171c35]">  Status</th>
    <th className="px-6 py-3 text-left text-base font-semibold text-[#171c35]">2FA</th>
    <th className="px-6 py-3 text-left text-base font-semibold text-[#171c35]">Last Login</th>
    <th className="px-6 py-3 text-left text-base font-semibold text-[#171c35]">Actions</th>
  </tr>
</thead>

            <tbody className="divide-y divide-gray-100">
  {users.map((user) => (
    <tr key={user.id} className=" transition-colors">
      {/* Checkbox + User together */}
      <td className="px-6 py-4" colSpan={1}>
        <div className="flex items-center gap-3">
          <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
              <img src={profile} alt="" />
            </div>
            <span className="text-sm  text-[#45464E]">{user.name}</span>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="px-6 py-4 text-sm font-medium text-[#111A2D]">{user.role}</td>

      {/* Status */}
  <td className="px-6 py-4">
  <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium bg-[#0089331A] text-[#008933]">
    {/* Dot */}
    <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-[#008933]' : 'bg-red-500'}`}></span>
    {user.status}
  </span>
</td>


      {/* 2FA */}
      <td className="px-6 py-4">
        <span className={`inline-flex px-6 py-2 rounded-full text-sm font-medium ${
          user.twoFA === 'Enable' 
            ? 'bg-[#526FFF1A] text-[#526FFF]' 
            : 'bg-[#FF1C331A] text-[#FF1C33]'
        }`}>
          {user.twoFA}
        </span>
      </td>

      {/* Last Login */}
      <td className="px-6 py-4 text-sm font-medium text-[#111A2D]">{user.lastLogin}</td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button className="p-1.5  rounded transition-colors">
            <img src={edit} alt="" />
          </button>
          <button className="p-1.5  rounded transition-colors">
            {/* View Icon */}
            <img src={userIcon} alt="" />
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

            </table>
          </div>
        </div>

     

       

      </div>
    </div>
  );
};

export default UserManagement;