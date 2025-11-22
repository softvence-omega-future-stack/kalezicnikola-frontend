const TopSection = () => {
  return (
    <div className="w-full">

      {/* Wrapper: column on mobile, row on md+ */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-12">

        {/* Left Side */}
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-headingBlack">
            Hello,
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-headingBlack mb-1">
            Keren nix
          </h2>
        </div>

        {/* Right Side */}
        <div className="flex flex-col">
          <p className="text-sm sm:text-base text-subHeadingBlack">
            Welcome back,
          </p>
          <p className="text-sm sm:text-base text-subHeadingBlack">
            Here's what's happening today
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopSection;









// const TopSection = () => {
//   return (
//     <div>
//  {/* Header */}
//       <div className=" flex items-center mt-5 gap-12 w-[420px]">
//         <div className="flex flex-col">
//             <h1 className="text-[32px] md:text-3xl font-semibold text-[#171C35]">
//           Hello,
//         </h1>
//         <h2 className="text-[32px] md:text-3xl font-semibold text-[#171C35] mb-2">
//           Keren nix
//         </h2>
//         </div>
//         <div className="flex flex-col">
//             <p className="text-base font-medium text-[#111A2D]">Welcome back,</p>
//         <p className="text-base font-medium text-[#111A2D]">Here's what's happening today</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default TopSection;