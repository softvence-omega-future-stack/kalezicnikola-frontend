// import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// interface CallData {
//   day: string;
//   calls: number;
//   date?: string;
//   highlighted?: boolean;
// }

// const callVolumeData: CallData[] = [
//   { day: 'SUN', calls: 60 },
//   { day: 'MON', calls: 75 },
//   { day: 'TUE', calls: 80, date: '12-Jan-2025 • Friday', highlighted: true },
//   { day: 'WED', calls: 40 },
//   { day: 'THU', calls: 45 },
//   { day: 'FRI', calls: 50 },
//   { day: 'SAT', calls: 65 },
// ];

// const AIVoiceCall = () => {
//   return (
//     <div className="rounded-[24px] p-4 mt-4 mb- bg-white w-full">
//       {/* Header */}
//       <h3 className="text-xl font-semibold text-[#171C35]">
//         AI Voicebot Call Volume
//       </h3>
//       <p className="text-[#667085] font-medium text-sm mb-4">
//         Daily call volume trend (last 7 days)
//       </p>

//       {/* Chart */}
//       <div className="w-full h-64"> {/* fixed height container */}
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart
//             data={callVolumeData}
//             margin={{ top: 10, right: 0, bottom: 0, left: 0 }} // bottom 0
//           >
//             <defs>
//               <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3} />
//                 <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
//               </linearGradient>
//             </defs>

//             <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

//             <XAxis
//               dataKey="day"
//               axisLine={false}
//               tickLine={false}
//               dy={10} // move labels closer to axis
//             />
//             <YAxis
//               dataKey="calls"
//               axisLine={false}
//               tickLine={false}
//               width={40}
//             />
//             <Tooltip formatter={(value: number) => [`${value}`, "Calls"]} />

//             <Area
//               type="monotone"
//               dataKey="calls"
//               stroke="#2dd4bf"
//               fillOpacity={1}
//               fill="url(#colorValue)"
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default AIVoiceCall;




import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Sun", value: 80 },
  { day: "Mon", value: 90 },
  { day: "Tue", value: 85 },
  { day: "Wed", value: 60 },
  { day: "Thu", value: 65 },
  { day: "Fri", value: 90 },
  { day: "Sat", value: 85 },

];

const AIVoiceCall = () => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl  md:rounded-3xl mt-4">
      <div className="mb-4">
        <h1 className="text-xl md:text-2xl font-semibold text-headingBlack pb-1 md:pb-3">
          AI Voicebot Call Volume
        </h1>
        <p className='text-[#667085] text-sm md:text-base '>
          Daily call volume trend (last 7 days)
        </p>
      </div>

      <div className="relative w-full" style={{ height: "370px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#526FFF" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#526FFF" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* শুধুমাত্র horizontal dashed border */}
            <CartesianGrid

              vertical={false}
              stroke="#E6EDEE"
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#111A2D", fontSize: 13 }}
              dy={15}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[30, 100]}
              ticks={[30, 60, 80, 100]}
              tickFormatter={(tick) => `${tick}%`}
              tick={{ fill: "#667085", fontSize: 13 }}
              dx={-15}
            />

            <Tooltip
              cursor={{ stroke: "#526FFF", strokeWidth: 1 }}
              formatter={(value) => `${value}%`}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#526FFF"
              strokeWidth={2}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AIVoiceCall;
