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
    bg: "bg-green-50",
    border: "border-green-200",
    iconBg: "bg-green-600",
    text: "text-green-700",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconBg: "bg-blue-600",
    text: "text-blue-700",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    iconBg: "bg-orange-600",
    text: "text-orange-700",
  },
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    iconBg: "bg-yellow-600",
    text: "text-yellow-700",
  },
};

function MetricCard({ label, value, unit, icon: Icon, color }: MetricCardProps) {
  const styles = colorStyles[color];

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-2xl p-5 shadow-sm flex items-center gap-4`}>
      <div className={`${styles.iconBg} rounded-xl p-3 flex items-center justify-center`}>
        <Icon className="text-white" size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className={`text-2xl font-bold ${styles.text}`}>
          {value}
          <span className="text-base font-medium ml-1">{unit}</span>
        </p>
      </div>
    </div>
  );
}

export default MetricCard;