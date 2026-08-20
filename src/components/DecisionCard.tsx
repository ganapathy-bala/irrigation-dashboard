import { Droplet, CloudRain, CheckCircle2, Battery, Gauge } from "lucide-react";
import type { AdvancedDecisionState, WeatherData } from "../types/sensor";

interface DecisionCardProps {
  decision: AdvancedDecisionState;
  weather: WeatherData;
}

const statusConfig = {
  "irrigate-now": {
    label: "Irrigating Now",
    bg: "bg-gradient-to-br from-cyan-600 to-blue-700",
    glow: "shadow-[0_0_30px_rgba(6,182,212,0.35)]",
    icon: Droplet,
  },
  "irrigate-partial": {
    label: "Partial Irrigation",
    bg: "bg-gradient-to-br from-purple-600 to-indigo-700",
    glow: "shadow-[0_0_30px_rgba(147,51,234,0.35)]",
    icon: Droplet,
  },
  delay: {
    label: "Irrigation Delayed",
    bg: "bg-gradient-to-br from-amber-500 to-orange-600",
    glow: "shadow-[0_0_30px_rgba(245,158,11,0.35)]",
    icon: CloudRain,
  },
  idle: {
    label: "System Idle — Soil Sufficient",
    bg: "bg-gradient-to-br from-emerald-500 to-green-700",
    glow: "shadow-[0_0_30px_rgba(16,185,129,0.35)]",
    icon: CheckCircle2,
  },
};

function DecisionCard({ decision, weather }: DecisionCardProps) {
  const config = statusConfig[decision.decision];
  const Icon = config.icon;

  return (
    <div className={`${config.bg} ${config.glow} rounded-2xl p-6 text-white`}>
      <div className="flex items-center gap-3 mb-3">
        <Icon size={32} />
        <h2 className="text-2xl font-bold">{config.label}</h2>
        {decision.recommendedDurationMin > 0 && (
          <span className="bg-black/25 text-sm px-3 py-1 rounded-full ml-auto">
            {decision.recommendedDurationMin} min
          </span>
        )}
      </div>
      <p className="text-white/90 mb-4">{decision.reason}</p>

      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2 bg-black/25 rounded-full px-4 py-2 backdrop-blur-sm">
          <CloudRain size={16} />
          <span className="text-sm font-medium">{weather.rainProbability}% rain — {weather.condition}</span>
        </div>
        <div className="flex items-center gap-2 bg-black/25 rounded-full px-4 py-2 backdrop-blur-sm">
          <Gauge size={16} />
          <span className="text-sm font-medium">Water need: {Math.round(decision.waterNeedScore)}/100</span>
        </div>
        <div className="flex items-center gap-2 bg-black/25 rounded-full px-4 py-2 backdrop-blur-sm">
          <Battery size={16} />
          <span className="text-sm font-medium">Energy: {Math.round(decision.energyScore)}/100</span>
        </div>
      </div>
    </div>
  );
}

export default DecisionCard;