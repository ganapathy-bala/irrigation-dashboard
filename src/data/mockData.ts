import type { SensorReading, WeatherData, AlertLogEntry, DecisionState, CropType, GrowthStage } from "../types/sensor";export const mockSensorReading: SensorReading = {
  soilMoisture: 38,
  temperature: 29,
  humidity: 62,
  batteryLevel: 84,
  timestamp: Date.now(),
};

export const mockWeather: WeatherData = {
  rainProbability: 22,
  condition: "Partly Cloudy",
};

export const mockAlertLog: AlertLogEntry[] = [
  { id: "1", timestamp: Date.now() - 1000 * 60 * 5, message: "Irrigation started — soil moisture below threshold" },
  { id: "2", timestamp: Date.now() - 1000 * 60 * 45, message: "Skipped irrigation — 72% rain probability forecast" },
  { id: "3", timestamp: Date.now() - 1000 * 60 * 120, message: "Soil moisture check — 45%, within range" },
];

export const mockMoistureHistory = [
  { time: "06:00", moisture: 55 },
  { time: "08:00", moisture: 50 },
  { time: "10:00", moisture: 44 },
  { time: "12:00", moisture: 38 },
  { time: "14:00", moisture: 33 },
  { time: "16:00", moisture: 41 },
  { time: "18:00", moisture: 47 },
];
export const mockDecision: DecisionState = {
  status: "skipped-rain",
  reason: "Soil moisture is below threshold, but rain probability is high in the next 24h — irrigation delayed to conserve water.",
};
export const mockWaterSaved = 340; // liters saved this week, vs flat-schedule baseline

export const cropThresholds: Record<CropType, number> = {
  wheat: 35,
  rice: 55,
  groundnut: 30,
};
export const mockEnergyState = {
  batterySOC: 72,
  solarIrradiance: 480,
  predictedSunlightHours: 4.5,
};

export const mockGrowthStage: GrowthStage = "vegetative";
export const mockSoilTemperature = 26;