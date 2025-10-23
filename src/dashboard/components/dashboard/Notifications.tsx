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
  { id: 'n1', name: 'Zaynab Azzahara', phone: '+88012345678', timeAgo: '1 minutes ago', date: '09-12-2025', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
  { id: 'n2', name: 'Zaynab Azzahara', phone: '+88012345678', timeAgo: '1 minutes ago', date: '09-12-2025', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
  { id: 'n3', name: 'Zaynab Azzahara', phone: '+88012345678', timeAgo: '1 minutes ago', date: '09-12-2025', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
  { id: 'n4', name: 'Zaynab Azzahara', phone: '+88012345678', timeAgo: '1 minutes ago', date: '09-12-2025', avatarUrl: 'https://i.pravatar.cc/150?img=4' },
  { id: 'n5', name: 'Zaynab Azzahara', phone: '+88012345678', timeAgo: '1 minutes ago', date: '09-12-2025', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
  { id: 'n6', name: 'Zaynab Azzahara', phone: '+88012345678', timeAgo: '1 minutes ago', date: '09-12-2025', avatarUrl: 'https://i.pravatar.cc/150?img=6' },
  { id: 'n7', name: 'Zaynab Azzahara', phone: '+88012345678', timeAgo: '1 minutes ago', date: '09-12-2025', avatarUrl: 'https://i.pravatar.cc/150?img=7' },
  { id: 'n8', name: 'Zaynab Azzahara', phone: '+88012345678', timeAgo: '1 minutes ago', date: '09-12-2025', avatarUrl: 'https://i.pravatar.cc/150?img=8' },
];

const NotificationsModal: React.FC<NotificationsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-start mt-20 right-44 justify-end z-[9999] px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative animate-fadeIn">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notification List */}
        <div className="max-h-[70vh] overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 border-b last:border-none transition"
            >
              {/* Left */}
              <div className="flex items-center space-x-4">
                <img
                  src={n.avatarUrl}
                  alt={n.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{n.name}</p>
                  <p className="text-xs text-gray-500">{n.phone}</p>
                </div>
              </div>

              {/* Right */}
              <div className="text-right">
                <p className="text-xs text-gray-700">{n.timeAgo}</p>
                <p className="text-xs text-gray-500">{n.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
