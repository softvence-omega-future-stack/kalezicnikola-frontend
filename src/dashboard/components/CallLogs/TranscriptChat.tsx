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
      text: 'Hello this is Floyd from USA. How are you doing?',
      avatar: 'https://i.ibb.co/XZV3J9Gd/tabler-list.png'
    },
    {
      id: 4,
      sender: 'Floyd Miles',
      userId: '000032',
      text: 'Hello this is Floyd from USA. How are you doing?',
      avatar: 'https://i.ibb.co/XZV3J9Gd/tabler-list.png'
    },
    {
      id: 5,
      sender: 'user',
      userId: '',
      text: 'I am good. How can i help you?'
    }
  ];

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
 <div className='flex items-center justify-between cursor-pointer'>
         <h1 className="text-2xl font-semibold text-[#171C35] mb-6">Transcript</h1>
        
              <img src="https://i.ibb.co.com/C5fw58ZT/Copyicon.png" alt="" />
 </div>
       

        <div className="flex flex-col gap-0">
          {messages.map((msg) => {
            const isFloyd = msg.sender === 'Floyd Miles';
            // const isUser = msg.sender === 'user';
            const isTransparentFloyd = isFloyd && msg.id === 3; // id:3 only

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
                      <span className="text-2xl">👤</span>
                    )}
                  </div>
                )}

                {!isFloyd && <div className="w-12"></div>}

                {/* Message Box */}
                <div className="flex-1">
                  <div
                    className={`border border-gray-50 p-4 relative rounded-2xl ${
                      isTransparentFloyd ? 'bg-transparent' : 'bg-white'
                    }`}
                  >
                    {isFloyd ? (
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-7">
                          <div className="flex-shrink-0">
                            <div className="font-medium text-[#171C35]">{msg.sender}</div>
                            <div className="text-sm text-gray-500">{msg.userId}</div>
                          </div>
                          <p className="text-[#171C35] pt-1">{msg.text}</p>
                        </div>
                        {isTransparentFloyd && (
                          <button
                            onClick={() => copyMessage(msg.text)}
                            className="p-1.5 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                            aria-label="Copy message"
                          >
                               <img src="https://i.ibb.co.com/C5fw58ZT/Copyicon.png" alt="" />
                          </button>
                        )}
                      </div>
                    ) : (
                      <p className="text-[#171C35] text-right">{msg.text}</p>
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
