import { Wheat } from "lucide-react";
import type { CropType } from "../types/sensor";

interface CropSelectorProps {
  selectedCrop: CropType;
  onSelectCrop: (crop: CropType) => void;
}

const crops: { value: CropType; label: string }[] = [
  { value: "wheat", label: "Wheat" },
  { value: "rice", label: "Rice" },
  { value: "groundnut", label: "Groundnut" },
];

function CropSelector({ selectedCrop, onSelectCrop }: CropSelectorProps) {
  return (
    <div className="bg-[#131826] border border-emerald-500/20 rounded-2xl p-5 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
      <div className="flex items-center gap-2 mb-3">
        <Wheat className="text-emerald-400" size={20} />
        <h3 className="text-lg font-semibold text-slate-200">Crop Type</h3>
      </div>
      <div className="flex gap-2">
        {crops.map((crop) => (
          <button
            key={crop.value}
            onClick={() => onSelectCrop(crop.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCrop === crop.value
                ? "bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.6)]"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {crop.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CropSelector;