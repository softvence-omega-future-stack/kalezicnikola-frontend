import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface CallData {
  day: string;
  calls: number;
  date?: string;
  highlighted?: boolean;
}

const callVolumeData: CallData[] = [
  { day: 'SUN', calls: 60 },
  { day: 'MON', calls: 75 },
  { day: 'TUE', calls: 80, date: '12-Jan-2025 • Friday', highlighted: true },
  { day: 'WED', calls: 40 },
  { day: 'THU', calls: 45 },
  { day: 'FRI', calls: 50 },
  { day: 'SAT', calls: 65 },
];

const CallvolumeChart = () => {
  return (
    <div className="rounded-[24px] p-4 mt-4 bg-white w-full">
      {/* Header */}
      <h3 className="text-xl font-semibold text-[#171C35]">
        AI Voicebot Call Volume
      </h3>
      <p className="text-[#667085] font-medium text-sm mb-4">
        Daily call volume trend (last 7 days)
      </p>

      {/* Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={callVolumeData}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#526FFF" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#526FFF" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Only horizontal border */}
            <CartesianGrid vertical={false} stroke="#E6EDEE" />

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

            {/* এখানে dataKey পরিবর্তন হলো 'calls' */}
            <Area
              type="monotone"
              dataKey="calls"
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

export default CallvolumeChart;
