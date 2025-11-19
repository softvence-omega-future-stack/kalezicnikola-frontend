import React from 'react';


interface Message {
  id: number;
  sender: 'Floyd Miles' | 'user';
  userId: string;
  text: string;
  avatar?: string;
}

const TranscriptChat: React.FC = () => {
  const messages: Message[] = [
    {
      id: 1,
      sender: 'Floyd Miles',
      userId: '000032',
      text: 'Hello this is Floyd from USA. How are you doing?',
      // avatar: 'https://i.ibb.co/XZV3J9Gd/tabler-list.png' // Uncomment if avatar exists
    },
    {
      id: 2,
      sender: 'user',
      userId: '',
      text: 'I am good. How can I help you?'
    },
    {
      id: 3,
      sender: 'Floyd Miles',
      userId: '000032',
      text: 'Hello this is Floyd from USA. How are you doing?',
      avatar: 'https://i.ibb.co/XZV3J9Gd/tabler-list.png'
    },
    {
      id: 4,
      sender: 'Floyd Miles',
      userId: '000032',
      text: 'Hello this is Floyd from USA. How are you doing?'
    },
    {
      id: 5,
      sender: 'user',
      userId: '',
      text: 'I am good. How can I help you?'
    }
  ];

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-2 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className='flex items-center justify-between cursor-pointer mb-6'>
          <h1 className="text-2xl font-semibold text-[#171C35]">Transcript</h1>
          <img src="https://i.ibb.co/C5fw58ZT/Copyicon.png" className='shrink-0' alt="Copy All" />
        </div>

        <div className="flex flex-col gap-0">
          {messages.map((msg) => {
            const isFloyd = msg.sender === 'Floyd Miles';

            return (
              <div
                key={msg.id}
                className={`flex ${isFloyd ? 'justify-start' : 'justify-end'} gap-3`}
              >
                {/* Avatar */}
                {isFloyd && (
                  <div className="w-12 h-12 border border-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {msg.avatar ? (
                      <img
                        src={msg.avatar}
                        alt="avatar"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
         <span className="flex items-center justify-center h-12 w-12 bg-[#E8E8E8] rounded-full">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 12 13"
    fill="none"
    className="h-6 w-6"
  >
    <g clipPath="url(#clip0_2500_15819)">
      <path
        d="M7.71546 9.00737C7.68184 8.55228 7.67237 8.09575 7.68709 7.63967L7.68655 7.65971C8.0969 7.2371 8.35287 6.69017 8.41364 6.10621L8.41473 6.09483C8.59964 6.07967 8.89146 5.90092 8.97655 5.19242C9.00203 5.0704 8.99225 4.94371 8.94833 4.82697C8.90442 4.71024 8.82816 4.60821 8.72836 4.53267L8.72673 4.53158C9.02782 3.63242 9.65291 0.850417 7.56982 0.563333C7.35545 0.189583 6.80673 0 6.09327 0C3.23891 0.052 2.89473 2.14013 3.51873 4.53158C3.41787 4.6076 3.34094 4.71062 3.29698 4.82854C3.25302 4.94645 3.24385 5.07438 3.27055 5.19729L3.27 5.19296C3.35727 5.90038 3.64691 6.08021 3.83182 6.09538C3.89676 6.68585 4.16089 7.23716 4.58127 7.65971C4.59476 8.12379 4.5842 8.58825 4.54964 9.05125L4.55236 9.00737C3.98618 10.5154 0.174545 10.0918 0 13H12.2498C12.0742 10.0918 8.28 10.5154 7.71491 9.00737H7.71546Z"
        fill="#9EA3AB"
      />
    </g>
    <defs>
      <clipPath id="clip0_2500_15819">
        <rect width="12" height="13" fill="white" />
      </clipPath>
    </defs>
  </svg>
</span>

                    )}
                  </div>
                )}

                {!isFloyd && <div className="w-12"></div>}

                {/* Message Box */}
                <div className="flex-1 relative group">
                  <div
                    className={`border border-gray-50 p-4 rounded-2xl bg-white flex items-center ${
                      isFloyd ? 'justify-between' : 'justify-end'
                    }`}
                  >
                    {/* User message: icon left */}
                    {!isFloyd && (
                      <button
                        onClick={() => copyMessage(msg.text)}
                        className="p-1.5 rounded transition-opacity opacity-0 group-hover:opacity-100 shrink-0 cursor-pointer hover:bg-gray-100 mr-2"
                        aria-label="Copy message"
                      >
                        <img
                          src="https://i.ibb.co/C5fw58ZT/Copyicon.png"
                          alt="Copy"
                          className="w-5 h-5"
                        />
                      </button>
                    )}

                    <p className={`text-[#171C35] ${isFloyd ? '' : 'text-right'}`}>
                      {msg.text}
                    </p>

                    {/* Floyd message: icon right */}
                    {isFloyd && (
                      <button
                        onClick={() => copyMessage(msg.text)}
                        className="p-1.5 rounded transition-opacity opacity-0 group-hover:opacity-100 shrink-0 cursor-pointer hover:bg-gray-100 ml-2"
                        aria-label="Copy message"
                      >
                        <img
                          src="https://i.ibb.co/C5fw58ZT/Copyicon.png"
                          alt="Copy"
                          className="w-5 h-5"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TranscriptChat;
