import { Droplet, CloudRain, CheckCircle2 } from "lucide-react";
import type { DecisionState, WeatherData } from "../types/sensor";

interface DecisionCardProps {
  decision: DecisionState;
  weather: WeatherData;
}

const statusConfig = {
  irrigating: {
    label: "Irrigating Now",
    bg: "bg-blue-600",
    icon: Droplet,
  },
  "skipped-rain": {
    label: "Irrigation Skipped",
    bg: "bg-amber-500",
    icon: CloudRain,
  },
  idle: {
    label: "System Idle — Soil Sufficient",
    bg: "bg-green-600",
    icon: CheckCircle2,
  },
};

function DecisionCard({ decision, weather }: DecisionCardProps) {
  const config = statusConfig[decision.status];
  const Icon = config.icon;

  return (
    <div className={`${config.bg} rounded-2xl p-6 shadow-md text-white`}>
      <div className="flex items-center gap-3 mb-3">
        <Icon size={32} />
        <h2 className="text-2xl font-bold">{config.label}</h2>
      </div>
      <p className="text-white/90 mb-4">{decision.reason}</p>
      <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 w-fit">
        <CloudRain size={18} />
        <span className="font-medium">
          {weather.rainProbability}% rain chance — {weather.condition}
        </span>
      </div>
    </div>
  );
}

export default DecisionCard;