import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TrendGraphProps {
  data: { time: string; moisture: number }[];
}

function TrendGraph({ data }: TrendGraphProps) {
  return (
    <div className="bg-[#131826] border border-emerald-500/20 rounded-2xl p-5 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
      <h3 className="text-lg font-semibold text-slate-200 mb-4">
        Soil Moisture Trend (Today)
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} unit="%" />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #10b981",
              backgroundColor: "#131826",
              color: "#e2e8f0",
            }}
          />
          <Line
            type="monotone"
            dataKey="moisture"
            stroke="#34d399"
            strokeWidth={3}
            dot={{ fill: "#34d399", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrendGraph;