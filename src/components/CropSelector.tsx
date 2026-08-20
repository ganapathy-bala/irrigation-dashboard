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
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Wheat className="text-green-700" size={20} />
        <h3 className="text-lg font-semibold text-slate-700">Crop Type</h3>
      </div>
      <div className="flex gap-2">
        {crops.map((crop) => (
          <button
            key={crop.value}
            onClick={() => onSelectCrop(crop.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCrop === crop.value
                ? "bg-green-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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