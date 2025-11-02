import React from 'react';

// Define the type for the User data
interface User {
  id: number;
  imageSrc: string; // URL for the user's profile image
  // Potentially other data
}

// Dummy data to represent the users in the image
const users: User[] = [
  { id: 1, imageSrc: 'user-male-1.png' },
  { id: 2, imageSrc: 'user-female-1.png' },
  { id: 3, imageSrc: 'user-female-2.png' },
  { id: 4, imageSrc: 'user-male-2.png' },
  { id: 5, imageSrc: 'user-female-3.png' },
  // ... (You'd need more for 20)
];

// Reusable component for the user profile
const UserProfile: React.FC<{ imageSrc: string }> = ({ imageSrc }) => (
  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg bg-gray-200">
    {/* In a real app, this would be an actual <img /> tag */}
    <div className="w-full h-full bg-cover" style={{ backgroundImage: `url(${imageSrc})` }}>
        {/* Placeholder for the user's image */}
    </div>
  </div>
);

// Main component for the design
const DoclineConversationGrid: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-8 max-w-5xl mx-auto shadow-2xl">
      {/* 1. Header Text */}
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Docline führt 20 Gespräche gleichzeitig</h2>
      <p className="text-lg text-gray-600 mb-10">
        Nie wieder Besetztzeichen oder Warteschleifen. Die KI beantwortet alle eingehenden Anrufe parallel, sodass jeder Patient sofort gehört wird.
      </p>

      {/* 2. Conversation Diagram Container */}
      <div className="relative flex justify-center items-start pt-16 h-80">
        
        {/* Central AI Hub Icon */}
        <div className="absolute top-0 w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center shadow-xl z-10">
            {/* The actual Docline icon would go here (e.g., an SVG or a rounded D letter) */}
            <span className="text-white text-3xl font-bold">{'>'}</span> 
        </div>

        {/* The Connection Lines (The most complex part) */}
        {/* This would require SVG or deeply nested absolutely positioned div elements with border-styles. 
           For a simple representation, we'll use a placeholder for the curved layout. */}
        <div className="absolute w-full h-full">
            {/* Placeholder for complex line drawing using CSS or SVG */}
            {/* The main vertical line is drawn by a pseudo-element or a div */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-0.5 h-32 bg-blue-300"></div>

            {/* This area is where you'd use absolute positioning (or a CSS grid/flex for users)
                and then draw the specific curved lines, likely with SVG <path> elements 
                or complex CSS transforms/borders to match the image's aesthetic. */}
            
            <div className="absolute bottom-0 w-full flex justify-around">
                {users.slice(0, 5).map(user => (
                    <UserProfile key={user.id} imageSrc={user.imageSrc} />
                ))}
                {/* Note: The *actual* image uses non-uniform spacing, which requires absolute/manual positioning */}
            </div>
        </div>

      </div>
    </div>
  );
};

export default DoclineConversationGrid;