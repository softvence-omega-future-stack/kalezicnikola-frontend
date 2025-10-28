import React from 'react';
import { X } from 'lucide-react';

interface Notification {
  id: string;
  name: string;
  phone: string;
  timeAgo: string;
  date: string;
  avatarUrl: string;
}

interface NotificationsModalProps {
  onClose: () => void;
}









const notifications: Notification[] = [
  { id: 'n1', name: 'Zaynab Azzahara', phone: '+88012345678', timeAgo: '1 minutes ago', date: '09-12-2025', avatarUrl: 'https://i.ibb.co.com/mCnzBFVS/Notification1.png' },
  { id: 'n2', name: 'Zaynab Azzahara', phone: '+88012345678', timeAgo: '1 minutes ago', date: '09-12-2025', avatarUrl: 'https://i.ibb.co.com/pBtSKPS2/Notification2.png' },
  { id: 'n3', name: 'Zaynab Azzahara', phone: '+88012345678', timeAgo: '1 minutes ago', date: '09-12-2025', avatarUrl: 'https://i.ibb.co.com/4gNkyJWV/otification3.png' },
  { id: 'n4', name: 'Zaynab Azzahara', phone: '+88012345678', timeAgo: '1 minutes ago', date: '09-12-2025', avatarUrl: 'https://i.ibb.co.com/wh1WjZnW/Notification4.png' },
  { id: 'n5', name: 'Zaynab Azzahara', phone: '+88012345678', timeAgo: '1 minutes ago', date: '09-12-2025', avatarUrl: 'https://i.ibb.co.com/9mY4JyPm/Notification5.png' },
  { id: 'n6', name: 'Zaynab Azzahara', phone: '+88012345678', timeAgo: '1 minutes ago', date: '09-12-2025', avatarUrl: 'https://i.ibb.co.com/DPSYSDwG/Notification6.png' },
  { id: 'n7', name: 'Zaynab Azzahara', phone: '+88012345678', timeAgo: '1 minutes ago', date: '09-12-2025', avatarUrl: 'https://i.ibb.co.com/mCnzBFVS/Notification1.png' },
  { id: 'n8', name: 'Zaynab Azzahara', phone: '+88012345678', timeAgo: '1 minutes ago', date: '09-12-2025', avatarUrl: 'https://i.ibb.co.com/DPSYSDwG/Notification6.png' },
];

const NotificationsModal: React.FC<NotificationsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-start mt-20 right-44 justify-end z-[9999] px-4">
      <div className="bg-white rounded-xl  w-full max-w-md overflow-hidden relative animate-fadeIn">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 ">
          <h2 className="text-2xl font-semibold text-[#171C35]">Notifications</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notification List */}
        <div className="max-h-[70vh] overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="flex items-center justify-between px-6 py-3  border-b border-[#E8E8E8] last:border-none transition"
            >
              {/* Left */}
              <div className="flex items-center space-x-4">
                <img
                  src={n.avatarUrl}
                  alt={n.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm  text-[#171C35]">{n.name}</p>
                  <p className="text-sm font-medium text-[#111A2D]">{n.phone}</p>
                </div>
              </div>

              {/* Right */}
              <div className="text-right">
                <p className="text-sm font-medium text-[#171C35]">{n.timeAgo}</p>
                <p className="text-sm font-medium text-[#111A2D]">{n.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
