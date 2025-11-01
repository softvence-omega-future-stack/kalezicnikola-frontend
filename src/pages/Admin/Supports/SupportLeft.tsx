import React, { useState } from 'react';

import call from '../../../assets/svgIcon/callLogs.svg';
import vediocal from '../../../assets/svgIcon/videoCall.svg';
import kurmisadia from '../../../assets/svgIcon/kurmisadia.svg';
import searchIcon from '../../../assets/svgIcon/search.svg';
import home from '../../../assets/svgIcon/homeIcon.svg';
import chevron from '../../../assets/svgIcon/chevronnRight.svg';
import keren from '../../../assets/svgIcon/karen.svg';

import dr1 from '../../../assets/svgIcon/drChat1.svg';
import dr2 from '../../../assets/svgIcon/drChat3.svg';
import dr3 from '../../../assets/svgIcon/drChat4.svg';
import dr4 from '../../../assets/svgIcon/drChat2.svg';
import SupportRight from './SupportRight';

interface Message {
  id: number;
  name: string;
  avatar: string;
  message: string;
  time: string;
  unread?: boolean;
  online?: boolean;
}

const SupportLeft: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const messages: Message[] = [
    { id: 1, name: 'Dr. Keren nix', avatar: keren, message: "I'll check the patient's records", time: '2 minutes ago', unread: true, online: true },
    { id: 2, name: 'Dr. Floyd Miles', avatar:dr1, message: "I'll check the patient's records", time: 'Yesterday', online: true },
    { id: 3, name: 'Dr. Jane Cooper', avatar: dr2, message: "I'll check the patient's records", time: 'Monday', unread: true, online: true },
    { id: 4, name: 'Dr. Robert Fox', avatar: dr3, message: "I'll check the patient's records", time: 'Last week', online: true },
    { id: 5, name: 'Dr. Arlene McCoy', avatar: dr1, message: "I'll check the patient's records", time: 'Last week', online: true },
    { id: 6, name: 'Dr. Darlene Robertson', avatar: dr4, message: "I'll check the patient's records", time: 'Last week', online: true },
    { id: 7, name: 'Dr. Ralph Edwards', avatar: dr2, message: "I'll check the patient's records", time: '02-12-2025', online: true },
  ];

  const filteredMessages = messages.filter(msg =>
    msg.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" w-full  bg-[#F3F6F6] font-sans">
      {/* Header */}
      <div className="py-12">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <img src={home} alt="Home" />
          <img src={chevron} alt="Chevron" />
          <span className="text-gray-600">Dashboard</span>
          <img src={chevron} alt="Chevron" />
          <span className="text-[#171c35] font-medium">Supports</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#171C35]">Supports</h1>
      </div>

      {/* Main Content */}
      <div className="">
        <div className="flex flex-col md:flex-row mt-20 md:mt-0 items-center gap-[10px]">
          {/* Left Sidebar - Contacts */}
          <div className=" lg:w-1/3 w-full -mt-36">
            <div className="bg-white rounded-2xl -mt-20  overflow-hidden">
              {/* Doctor Profile Header */}
              <div className="p-5 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={kurmisadia}
                        alt="Kurmisadia"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base text-[#171C35]">Kurmisadia</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <img src={vediocal} alt="Video Call" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <img src={call} alt="Call" />
                    </button>
                  </div>
                </div>

                {/* Search */}
                <div className="relative bg-[#F3F6F6] rounded-[12px] p-2 flex items-center">
                  <img src={searchIcon} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" alt="Search Icon" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-3 pl-10 py-2.5 bg-white rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="ml-2 px-3 py-2 text-sm font-medium transition-colors">
                    Search
                  </button>
                </div>
              </div>

              {/* Contacts List */}
              <div className=" max-h-[600px]">
                {filteredMessages.map((msg, index) => (
                  <div
                    key={msg.id}
                    className={`flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      index !== filteredMessages.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-2xl">
                        <img src={msg.avatar} alt={msg.name} className="w-full h-full rounded-full object-cover" />
                      </div>
                      {msg.online && (
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-[#171C35] mb-0.5">{msg.name}</h3>
                      <p className="text-xs text-[#111A2D] truncate">{msg.message}</p>
                    </div>

                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-xs text-[#111A2D]">{msg.time}</span>
                      {msg.unread && (
                        <span className="w-5 h-5 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center font-medium">
                          1
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='lg:w-2/3 w-full'>
            <SupportRight/>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SupportLeft;
