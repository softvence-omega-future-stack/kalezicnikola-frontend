import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

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
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className='flex items-center justify-between cursor-pointer mb-6'>
          <h1 className="text-2xl font-semibold text-[#171C35]">Transcript</h1>
          <img src="https://i.ibb.co/C5fw58ZT/Copyicon.png" alt="Copy All" />
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
                      <span className="text-2xl h-12 w-12 ">
                        <FaUserCircle size={40}/>
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
                        className="p-1.5 rounded transition-opacity opacity-0 group-hover:opacity-100 hover:bg-gray-100 mr-2"
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
                        className="p-1.5 rounded transition-opacity opacity-0 group-hover:opacity-100 hover:bg-gray-100 ml-2"
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
