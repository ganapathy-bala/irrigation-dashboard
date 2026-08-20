import { useState } from "react";
import { Droplets, Thermometer, Wind } from "lucide-react";
import MetricCard from "./components/MetricCard";
import DecisionCard from "./components/DecisionCard";
import TrendGraph from "./components/TrendGraph";
import WaterSavedCard from "./components/WaterSavedCard";
import CropSelector from "./components/CropSelector";
import AlertLog from "./components/AlertLog";
import { useLiveSensorData } from "./hooks/useLiveSensorData";
import { useLiveWeather } from "./hooks/useLiveWeather";
import { computeCoOptimizedDecision } from "./logic/coOptimizationEngine";
import { mockEnergyState, mockGrowthStage } from "./data/mockData";
import {
  mockDecision,
  mockWeather,
  mockMoistureHistory,
  mockWaterSaved,
  mockAlertLog,
} from "./data/mockData";

function App() {
  const [selectedCrop, setSelectedCrop] = useState<"wheat" | "rice" | "groundnut">("wheat");
  const { sensorData, isLive } = useLiveSensorData();
  const weather = useLiveWeather();
  const decision = computeCoOptimizedDecision(
  sensorData.soilMoisture,
  selectedCrop,
  mockGrowthStage,
  sensorData.temperature,
  sensorData.humidity,
  weather.rainProbability,
  mockEnergyState
);

  return (
    <div className="min-h-screen bg-[#0a0e14] p-6">
      <h1 className="text-3xl font-bold text-emerald-400 mb-1 drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]">
  🌱 Smart Irrigation Dashboard
</h1>

      <p className="text-sm text-slate-400 mb-6">
        {isLive ? "🟢 Live sensor data" : "⚪ Showing demo data — waiting for sensor"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <MetricCard label="Soil Moisture" value={sensorData.soilMoisture} unit="%" icon={Droplets} color="green" />
        <MetricCard label="Temperature" value={sensorData.temperature} unit="°C" icon={Thermometer} color="orange" />
        <MetricCard label="Humidity" value={sensorData.humidity} unit="%" icon={Wind} color="blue" />
      </div>

      <div className="mb-6">
     <DecisionCard decision={decision} weather={weather} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <WaterSavedCard liters={mockWaterSaved} />
        <CropSelector selectedCrop={selectedCrop} onSelectCrop={setSelectedCrop} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <TrendGraph data={mockMoistureHistory} />
        </div>
        <AlertLog entries={mockAlertLog} />
      </div>
    </div>
  );
}

export default App;