import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  color: "green" | "blue" | "orange" | "yellow";
}

const colorStyles = {
  green: {
    border: "border-emerald-500/40",
    iconBg: "bg-emerald-500",
    text: "text-emerald-400",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.25)]",
  },
  blue: {
    border: "border-cyan-500/40",
    iconBg: "bg-cyan-500",
    text: "text-cyan-400",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.25)]",
  },
  orange: {
    border: "border-orange-500/40",
    iconBg: "bg-orange-500",
    text: "text-orange-400",
    glow: "shadow-[0_0_20px_rgba(249,115,22,0.25)]",
  },
  yellow: {
    border: "border-yellow-500/40",
    iconBg: "bg-yellow-500",
    text: "text-yellow-400",
    glow: "shadow-[0_0_20px_rgba(234,179,8,0.25)]",
  },
};

function MetricCard({ label, value, unit, icon: Icon, color }: MetricCardProps) {
  const styles = colorStyles[color];

  return (
    <div
      className={`bg-[#131826] ${styles.border} border rounded-2xl p-5 ${styles.glow} flex items-center gap-4`}
    >
      <div className={`${styles.iconBg} rounded-xl p-3 flex items-center justify-center shadow-lg`}>
        <Icon className="text-white" size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-400">{label}</p>
        <p className={`text-2xl font-bold ${styles.text}`}>
          {value}
          <span className="text-base font-medium ml-1 text-slate-300">{unit}</span>
        </p>
      </div>
    </div>
  );
}

export default MetricCard;