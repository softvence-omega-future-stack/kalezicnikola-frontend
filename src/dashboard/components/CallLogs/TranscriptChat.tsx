import React from 'react';
import { Copy } from 'lucide-react';

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
      avatar: 'https://i.ibb.co/XZV3J9Gd/tabler-list.png'
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
      text: 'Here is the latest update on the project timeline.',
      avatar: 'https://i.ibb.co/XZV3J9Gd/tabler-list.png'
    },
    {
      id: 4,
      sender: 'Floyd Miles',
      userId: '000032',
      text: 'Do you have any questions?',
      avatar: 'https://i.ibb.co/XZV3J9Gd/tabler-list.png'
    },
    {
      id: 5,
      sender: 'user',
      userId: '',
      text: 'Yes, I have checked everything.'
    }
  ];

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-[#171C35] mb-6">Transcript</h1>

        <div className="space-y-4">
          {messages.map((msg, idx) => {
            const isFloyd = msg.sender === 'Floyd Miles';
            const isFirstOrLast = idx === 0 || idx === messages.length - 1;

            return (
              <div
                key={msg.id}
                className={`flex ${isFloyd ? 'justify-start' : 'justify-end'} gap-3`}
              >
                {isFloyd && (
                  <div className="w-12 h-12 rounded-full bg-indigo-200 flex items-center justify-center flex-shrink-0">
                    {msg.avatar ? (
                      <img
                        src={msg.avatar}
                        alt="avatar"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl">👤</span>
                    )}
                  </div>
                )}

                <div className={`flex-1 max-w-2xl`}>
                  <div
                    className={`bg-white p-4 shadow-sm ${
                      isFirstOrLast
                        ? 'rounded-2xl' // first and last messages
                        : 'rounded-2xl rounded-tl-none rounded-tr-none' // middle messages
                    } relative`}
                  >
                    {isFirstOrLast ? (
                      <p className={`text-[#171C35] ${isFloyd ? '' : 'text-right'}`}>{msg.text}</p>
                    ) : (
                      <>
                        {isFloyd && (
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-medium text-[#171C35]">{msg.sender}</div>
                              <div className="text-sm text-gray-500">{msg.userId}</div>
                            </div>
                            <button
                              onClick={() => copyMessage(msg.text)}
                              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                              aria-label="Copy message"
                            >
                              <Copy size={18} className="text-gray-500" />
                            </button>
                          </div>
                        )}
                        <p className={`text-[#171C35] ${isFloyd ? '' : 'text-right'}`}>{msg.text}</p>
                      </>
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
