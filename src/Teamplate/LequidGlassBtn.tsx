

// const LequidGlassBtn = () => {
//   return (
//     <div className=" ">
//       <div className="">

//         {/* Version 1 */}
//         <div className="w-full ">
//           <button className="group relative w-full py-2 px-6 rounded-[8px] overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]">
            
//             <div className="absolute inset-0 bg-white/10 backdrop-blur-[10px]"></div>

//             <div className="absolute inset-0 opacity-40">
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
//             </div>

//             <div className="absolute inset-0 rounded-[40px] border-[1.5px] border-white/80 group-hover:border-white group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-500"></div>

//             <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-[40px] transition-all duration-500"></div>

//             <span className="relative text-white font-medium text-base py-2 z-10 flex items-center justify-center h-full group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] transition-all duration-300">
//               Jetzt starten
//             </span>
//           </button>
//         </div>

       

//       </div>
//     </div>
//   );
// };

// export default LequidGlassBtn;
import borderImg from '../assets/svgIcon/borderImg.svg';

const LequidGlassBtn = () => {
  return (
    <button
      className="relative cursor-pointer transition-none"
      style={{
        width: "218px",
        height: "66px",
        padding: 0,
        border: "none",
        background: "transparent",
        
      }}
    >

      {/* Border Image as FULL Button */}
      <img
        src={borderImg}
        className="absolute top-0 left-0 w-full h-full z-[3] pointer-events-none"
        alt=""
      />

      {/* Inner Glass BG (fills the border inner area) */}
      <div
        className="
          absolute
          top-[5px] left-[5px] 
          right-[5px] bottom-[5px]
          bg-white/10 backdrop-blur-md
          rounded-[8px]
          z-[1]
        "
      ></div>

      {/* Text */}
      <span
        className="
          absolute inset-0 flex items-center justify-center
          text-white font-medium text-base
          z-[4]
        "
      >
        Jetzt starten
      </span>

    </button>
  );
};

export default LequidGlassBtn;

