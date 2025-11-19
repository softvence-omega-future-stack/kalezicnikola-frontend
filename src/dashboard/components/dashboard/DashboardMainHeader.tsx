import { useState } from 'react';
import NotificationsDrawer from './Notifications';
import UserDropdown from './DoctorProfile/DoctorProfileDropdown';
import karennix from '../../../assets/svgIcon/karen.svg';
import search from '../../../assets/svgIcon/search.svg';
import notification from '../../../assets/svgIcon/notification.svg';
import { Menu } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

const userData = {
    name: 'Keren nix',
    role: 'Anaesthesia',
    avatarUrl: karennix,
};

interface MainHeaderProps {
    onMobileMenuOpen: () => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({ onMobileMenuOpen }) => {
    const [showNotification, setShowNotification] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    return (
        <div className="flex flex-col w-full">
            <header className="w-full h-16 sm:h-20 flex justify-between items-center gap-2 px-3 sm:px-6 md:px-8 lg:px-10
                bg-[#F3F6F6] top-0 left-0 border-b border-[#D0D5DD]">

                {/* Mobile Menu */}
                <button
                    onClick={onMobileMenuOpen}
                    className="md:hidden p-1.5 rounded-md border border-gray-300 mr-2"
                >
                    <Menu className="w-6 h-6" />
                </button>

                {/* Search Bar */}
                <div className="flex items-center flex-1 min-w-0 max-w-xs sm:max-w-md md:max-w-lg">
                    <div className="flex items-center gap-2 sm:gap-3 w-full rounded-lg py-2 sm:py-3 px-2 sm:px-4 border border-gray-200 focus-within:border-indigo-300 transition-colors">
                        <img src={search} alt="Search" className="w-4 h-4 shrink-0" />
                        <input
                            type="text"
                            placeholder="Search something..."
                            className="w-full min-w-0 text-gray-700 placeholder-[#111A2D] focus:outline-none text-sm sm:text-base"
                        />
                    </div>
                </div>

                {/* Notification + User */}
                <div className="flex items-center gap-2 sm:gap-4 md:gap-6 shrink-0">

                    {/* Language */}
                    <div className="relative hidden md:block">
                        <LanguageSelector />
                    </div>

                    {/* Notification Desktop */}
                    <div className="hidden sm:flex items-center border-r border-gray-200 pr-3 h-10">
                        <button
                            onClick={() => setShowNotification(true)}
                            className="relative p-2 text-[#111A2D] focus:outline-none"
                        >
                            <img src={notification} alt="Notification" className="w-5 h-5 sm:w-6 sm:h-6" />
                            {/* Notification Badge */}
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                3
                            </span>
                        </button>
                    </div>

                    {/* Notification Mobile */}
                    <div className="sm:hidden">
                        <button
                            onClick={() => setShowNotification(true)}
                            className="relative p-1.5 text-[#111A2D] focus:outline-none"
                        >
                            <img src={notification} alt="Notification" className="w-5 h-5" />
                            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                3
                            </span>
                        </button>
                    </div>

                    {/* User Profile */}
                    <div className="relative shrink-0">
                        <div
                            className="flex items-center cursor-pointer rounded-full"
                            onClick={() => setShowUserDropdown(!showUserDropdown)}
                        >
                            <img
                                src={userData.avatarUrl}
                                alt={userData.name}
                                className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl object-cover"
                            />
                            <div className="hidden md:block ml-2">
                                <p className="text-lg font-semibold text-[#171C35] leading-none">{userData.name}</p>
                                <p className="text-sm text-[#171C35] leading-none mt-1">{userData.role}</p>
                            </div>
                        </div>
                        {showUserDropdown && (
                            <UserDropdown onClose={() => setShowUserDropdown(false)} />
                        )}
                    </div>

                </div>
            </header>

            {/* Notifications Drawer */}
            {showNotification && (
                <NotificationsDrawer onClose={() => setShowNotification(false)} />
            )}
        </div>
    );
};

export default MainHeader;













// import { useState } from 'react';
// import NotificationsDrawer from './Notifications';
// import UserDropdown from './DoctorProfile/DoctorProfileDropdown';
// import karennix from '../../../assets/svgIcon/karen.svg';
// import search from '../../../assets/svgIcon/search.svg';
// import notification from '../../../assets/svgIcon/notification.svg';
// import { Menu } from 'lucide-react';
// import LanguageSelector from './LanguageSelector';

// interface MainHeaderProps {
//   toggleMenu: () => void; 
// }

// const userData = {
//     name: 'Keren nix',
//     role: 'Anaesthesia',
//     avatarUrl: karennix,
// };


// const MainHeader: React.FC<MainHeaderProps> = ({ toggleMenu }) => {
//   const [showNotification, setShowNotification] = useState(false);
//   const [showUserDropdown, setShowUserDropdown] = useState(false);

//   return (
//     <div className="flex flex-col w-full border-b border-gray-200">
//       <header className="w-full h-20 mb-2 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 sticky top-0 z-30 ">
//         {/* Mobile Menu Button */}
//         <button
//           onClick={toggleMenu}
//           className="md:hidden p-2 rounded-md border border-gray-300 mr-3"
//         >
//           <svg width="20" height="20" viewBox="0 0 24 24">
//             <path
//               d="M3 6h18M3 12h18M3 18h18"
//               stroke="#111A2D"
//               strokeWidth="2"
//               strokeLinecap="round"
//             />
//           </svg>
//         </button>

//         {/* Left: Search */}
//         <div className="flex items-center w-full max-w-full sm:max-w-lg flex-1">
//           <div className="flex items-center gap-3 flex-1 rounded-lg py-2 px-4 border border-transparent focus-within:border-indigo-300 transition-colors min-w-0">
//             <img src={search} alt="Search" />
//             <input
//               type="text"
//               placeholder="Search something."
//               className="w-full min-w-0 text-gray-700 placeholder-[#111A2D] focus:outline-none text-base"
//             />
//           </div>
//         </div>

//         {/* Right Icons */}
//         <div className="flex items-center space-x-3 sm:space-x-4 ml-4 flex-shrink-0">
//           <div className="relative flex-shrink-0">
//             <LanguageSelector />
//           </div>

//           <div className="flex items-center border-r border-gray-200 pr-3 h-10 flex-shrink-0">
//             <button
//               onClick={() => setShowNotification(true)}
//               className="relative p-2 text-[#111A2D] transition-colors focus:outline-none flex-shrink-0"
//             >
//               <img src={notification} alt="Notification" />
//             </button>
//           </div>

//           <div className="relative flex-shrink-0">
//             <div
//               className="flex items-center p-1 cursor-pointer rounded-full transition-colors"
//               onClick={() => setShowUserDropdown(!showUserDropdown)}
//             >
//               <div className="flex items-center">
//                 <img
//                   src={userData.avatarUrl}
//                   alt={userData.name}
//                   className="h-10 w-10 rounded-xl object-cover mr-2 sm:mr-3"
//                 />
//                 <div className="hidden sm:block">
//                   <p className="text-lg font-semibold text-[#171C35] leading-none">
//                     {userData.name}
//                   </p>
//                   <p className="text-sm text-[#171C35] leading-none mt-1">
//                     {userData.role}
//                   </p>

interface MainHeaderProps {
    onMobileMenuOpen: () => void;
}

// const MainHeader: React.FC<MainHeaderProps> = ({ onMobileMenuOpen }) => {
//     const [showNotification, setShowNotification] = useState(false);
//     const [showUserDropdown, setShowUserDropdown] = useState(false);

  //   return (
  //       <div className="flex flex-col w-full">
  //           <header className="w-full h-16 sm:h-20 flex justify-between items-center gap-2 px-3 sm:px-6 md:px-8 lg:px-10
  //               bg-[#F3F6F6] top-0 left-0 border-b border-[#D0D5DD]">

  //               {/* Mobile Menu */}
  //               <button
  //                   onClick={onMobileMenuOpen}
  //                   className="md:hidden p-1.5 rounded-md border border-gray-300 mr-2"
  //               >
  //                   <Menu className="w-6 h-6" />
  //               </button>

  //               {/* Search Bar */}
  //               <div className="flex items-center flex-1 min-w-0 max-w-xs sm:max-w-md md:max-w-lg">
  //                   <div className="flex items-center gap-2 sm:gap-3 w-full rounded-lg py-2 sm:py-3 px-2 sm:px-4 border border-gray-200 focus-within:border-indigo-300 transition-colors">
  //                       <img src={search} alt="Search" className="w-4 h-4 shrink-0" />
  //                       <input
  //                           type="text"
  //                           placeholder="Search something..."
  //                           className="w-full min-w-0 text-gray-700 placeholder-[#111A2D] focus:outline-none text-sm sm:text-base"
  //                       />
  //                   </div>

  //               </div>


  //       {showNotification && (
  //         <NotificationsDrawer onClose={() => setShowNotification(false)} />
  //       )}
  //     </header>
  //   </div>
  // );

                {/* Notification + User */}
            //     <div className="flex items-center gap-2 sm:gap-4 md:gap-6 shrink-0">

            
            //         <div className="relative hidden md:block">
            //             <LanguageSelector />
            //         </div>

               
            //         <div className="hidden sm:flex items-center border-r border-gray-200 pr-3 h-10">
            //             <button
            //                 onClick={() => setShowNotification(true)}
            //                 className="relative p-2 text-[#111A2D] focus:outline-none"
            //             >
            //                 <img src={notification} alt="Notification" className="w-5 h-5 sm:w-6 sm:h-6" />
                      
            //                 <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            //                     3
            //                 </span>
            //             </button>
            //         </div>

               
            //         <div className="sm:hidden">
            //             <button
            //                 onClick={() => setShowNotification(true)}
            //                 className="relative p-1.5 text-[#111A2D] focus:outline-none"
            //             >
            //                 <img src={notification} alt="Notification" className="w-5 h-5" />
            //                 <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            //                     3
            //                 </span>
            //             </button>
            //         </div>

             
            //         <div className="relative shrink-0">
            //             <div
            //                 className="flex items-center cursor-pointer rounded-full"
            //                 onClick={() => setShowUserDropdown(!showUserDropdown)}
            //             >
            //                 <img
            //                     src={userData.avatarUrl}
            //                     alt={userData.name}
            //                     className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl object-cover"
            //                 />
            //                 <div className="hidden md:block ml-2">
            //                     <p className="text-lg font-semibold text-[#171C35] leading-none">{userData.name}</p>
            //                     <p className="text-sm text-[#171C35] leading-none mt-1">{userData.role}</p>
            //                 </div>
            //             </div>
            //             {showUserDropdown && (
            //                 <UserDropdown onClose={() => setShowUserDropdown(false)} />
            //             )}
            //         </div>

            //     </div>
            // </header>

        
//             {showNotification && (
//                 <NotificationsDrawer onClose={() => setShowNotification(false)} />
//             )}
//         </div>
//     );

// };

// export default MainHeader;






// import { useState } from "react";
// import NotificationsDrawer from "./Notifications";
// import UserDropdown from "./DoctorProfile/DoctorProfileDropdown";
// import karennix from "../../../assets/svgIcon/karen.svg";
// import search from "../../../assets/svgIcon/search.svg";
// import notification from "../../../assets/svgIcon/notification.svg";
// import LanguageSelector from "./LanguageSelector";
// import { Menu } from "lucide-react";

// const userData = {
//   name: "Keren nix",
//   role: "Anaesthesia",
//   avatarUrl: karennix,
// };

// const MainHeader: React.FC<{ toggleMenu: () => void }> = ({ toggleMenu }) => {





// import { useState } from 'react';
// import NotificationsDrawer from './Notifications';
// import UserDropdown from './DoctorProfile/DoctorProfileDropdown';
// import karennix from '../../../assets/svgIcon/karen.svg';
// import search from '../../../assets/svgIcon/search.svg';
// import notification from '../../../assets/svgIcon/notification.svg';
// import LanguageSelector from './LanguageSelector';

// const userData = {
//   name: 'Keren nix',
//   role: 'Anaesthesia',
//   avatarUrl: karennix,
// };

// const MainHeader: React.FC = () => {

//   const [showNotification, setShowNotification] = useState(false);
//   const [showUserDropdown, setShowUserDropdown] = useState(false);

//   return (
//     <div className="flex flex-col w-full border-b border-gray-200">

//       <header className="w-full h-20 mb-2 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 sticky top-0 z-30 bg-[#F3F6F6]">

//         {/* 📱 Mobile Menu Button */}
//              <button onClick={onMobileMenuOpen} className="md:hidden p-1.5 rounded-md border border-gray-300 mr-2">
//           <Menu className="w-6 h-6" />
//         </button>

//         {/* 🔍 Search */}

//       <header className="w-full h-20 mb-2 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 sticky top-0 z-30 ">
//         {/* Left: Search */}

//         <div className="flex items-center w-full max-w-full sm:max-w-lg flex-1">
//           <div className="flex items-center gap-3 flex-1 rounded-lg py-2 px-4 border border-transparent focus-within:border-indigo-300 transition-colors min-w-0">
//             <img src={search} alt="Search" />
//             <input
//               type="text"
//               placeholder="Search something."
//               className="w-full min-w-0 text-gray-700 placeholder-[#111A2D] focus:outline-none text-base"
//             />
//           </div>
//         </div>


//         {/* Right Icons */}
//         <div className="flex items-center space-x-3 sm:space-x-4 ml-4 flex-shrink-0">
//           {/* Language */}
//           <div className="relative flex-shrink-0">

//         {/* Right: Icons */}
//         <div className="flex items-center space-x-3 sm:space-x-4 ml-4 shrink-0">
//           {/* Language */}
//           <div className="relative shrink-0">

//             <LanguageSelector />
//           </div>

//           {/* Notification */}

//           <div className="flex items-center border-r border-gray-200 pr-3 h-10 flex-shrink-0">
//             <button
//               onClick={() => setShowNotification(true)}
//               className="relative p-2 text-[#111A2D] transition-colors focus:outline-none flex-shrink-0"

//           <div className="flex items-center border-r border-gray-200 pr-3 h-10 shrink-0">
//             <button
//               onClick={() => setShowNotification(true)}
//               className="relative p-2 text-[#111A2D] transition-colors focus:outline-none shrink-0"

//             >
//               <img src={notification} alt="Notification" />
//             </button>
//           </div>

//           {/* User Profile */}

//           <div className="relative flex-shrink-0">

//           <div className="relative shrink-0">

//             <div
//               className="flex items-center p-1 cursor-pointer rounded-full transition-colors"
//               onClick={() => setShowUserDropdown(!showUserDropdown)}
//             >
//               <div className="flex items-center">
//                 <img
//                   src={userData.avatarUrl}
//                   alt={userData.name}
//                   className="h-10 w-10 rounded-xl object-cover mr-2 sm:mr-3"
//                 />
//                 <div className="hidden sm:block">
//                   <p className="text-lg font-semibold text-[#171C35] leading-none">
//                     {userData.name}
//                   </p>
//                   <p className="text-sm text-[#171C35] leading-none mt-1">
//                     {userData.role}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             {showUserDropdown && (
//               <UserDropdown onClose={() => setShowUserDropdown(false)} />
//             )}
//           </div>
//         </div>


//         {/* Notification Drawer */}

//         {/* Notifications Drawer */}

//         {showNotification && (
//           <NotificationsDrawer onClose={() => setShowNotification(false)} />
//         )}
//       </header>
//     </div>
//   );
// };

// export default MainHeader;



