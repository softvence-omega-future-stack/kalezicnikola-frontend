import React from "react";

const Avatar: React.FC = () => {
  const avatars = [
    "https://i.pravatar.cc/100?img=1",
    "https://i.pravatar.cc/100?img=2",
    "https://i.pravatar.cc/100?img=3",
  ];

  return (
    <div className="flex -space-x-2">
      {avatars.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Avatar ${index + 1}`}
          className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
        />
      ))}

      {/* Extra Avatar Count */}
      <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-sm font-semibold border-2 border-white">
        6+
      </div>
    </div>
  );
};

export default Avatar;
