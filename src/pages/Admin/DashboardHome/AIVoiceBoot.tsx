// import React from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   ReferenceLine,
// } from 'recharts';
// import type { TooltipProps, ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

// // Sample data for the chart
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

// // Recent doctors data


// // Custom tooltip
// const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload }) => {
//   if (active && payload && payload[0]) {
//     const data = payload[0].payload as CallData;
//     if (data.highlighted) {
//       return (
//         <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200">
//           <p className="text-xs text-gray-500 mb-1">{data.date}</p>
//           <p className="text-sm font-semibold text-blue-600">Calls - {data.calls}</p>
//         </div>
//       );
//     }
//   }
//   return null;
// };

// const VoicebotDashboard: React.FC = () => {
//   return (
//     <div className="p-6 w-full">
//       <div className="flex gap-6">
//         {/* Left Section - Chart */}
//         <div className="flex-1 bg-white p-4 rounded-3xl">
//           <div className="mb-4">
//             <h2 className="text-xl font-bold text-[#171c35] mb-0">AI Voicebot Call Volume</h2>
//             <p className="text-xs text-gray-500">Daily call volume trend (last 7 days)</p>
//           </div>

//           <div className="relative" style={{ height: '280px' }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={callVolumeData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
//                 <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} />

//                 {/* Reference lines */}
//                 <ReferenceLine y={20} stroke="#f0f0f0" strokeDasharray="0" />
//                 <ReferenceLine y={40} stroke="#f0f0f0" strokeDasharray="0" />
//                 <ReferenceLine y={60} stroke="#f0f0f0" strokeDasharray="0" />
//                 <ReferenceLine y={80} stroke="#f0f0f0" strokeDasharray="0" />
//                 <ReferenceLine y={100} stroke="#f0f0f0" strokeDasharray="0" />

//                 {/* Vertical line at TUE */}
//                 <ReferenceLine x="TUE" stroke="#d1d5db" strokeDasharray="3 3" />

//                 <XAxis
//                   dataKey="day"
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 500 }}
//                   dy={10}
//                 />
//                 <YAxis
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: '#6b7280', fontSize: 11 }}
//                   ticks={[0, 20, 40, 60, 80, 100]}
//                   domain={[0, 100]}
//                   tickFormatter={(value) => `${value}%`}
//                 />

//                 <Tooltip content={<CustomTooltip />} cursor={false} />

//                 <Line
//                   type="monotone"
//                   dataKey="calls"
//                   stroke="#8b9cf6"
//                   strokeWidth={2.5}
//                   dot={(props) => {
//                     const { cx, cy, payload } = props;
//                     const data = payload as CallData;
//                     if (data.highlighted) {
//                       return <circle cx={cx} cy={cy} r={6} fill="#6366f1" stroke="white" strokeWidth={2} />;
//                     }
//                     return <circle cx={cx} cy={cy} r={0} />;
//                   }}
//                   activeDot={false}
//                 />

//                 {/* Shaded area under curve */}
//                 <defs>
//                   <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#c7d2fe" stopOpacity={0.4} />
//                     <stop offset="95%" stopColor="#c7d2fe" stopOpacity={0.05} />
//                   </linearGradient>
//                 </defs>
//                 <Line type="monotone" dataKey="calls" stroke="url(#colorCalls)" strokeWidth={0} fill="url(#colorCalls)" dot={false} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Right Section - Recent Doctors */}
        
//       </div>
//     </div>
//   );
// };

// export default VoicebotDashboard;
