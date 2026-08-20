import { Droplets } from "lucide-react";

interface WaterSavedCardProps {
  liters: number;
}

function WaterSavedCard({ liters }: WaterSavedCardProps) {
  return (
    <div className="bg-gradient-to-br from-cyan-600 to-blue-800 rounded-2xl p-6 shadow-[0_0_25px_rgba(6,182,212,0.3)] text-white flex items-center gap-4">
      <div className="bg-white/20 rounded-xl p-3">
        <Droplets size={32} />
      </div>
      <div>
        <p className="text-cyan-100 text-sm font-medium">Water Saved This Week</p>
        <p className="text-3xl font-bold">
          {liters.toLocaleString()} <span className="text-lg font-medium">liters</span>
        </p>
      </div>
    </div>
  );
}

export default WaterSavedCard;