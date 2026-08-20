export interface SensorReading {
  soilMoisture: number;
  temperature: number;
  humidity: number;
  batteryLevel: number;
  timestamp: number;
}

export interface WeatherData {
  rainProbability: number;
  condition: string;
}

export type IrrigationStatus = "irrigating" | "skipped-rain" | "idle";

export interface DecisionState {
  status: IrrigationStatus;
  reason: string;
}

export interface AlertLogEntry {
  id: string;
  timestamp: number;
  message: string;
}

export type CropType = "wheat" | "rice" | "groundnut";
export type GrowthStage = "seedling" | "vegetative" | "flowering" | "maturity";

export interface EnergyState {
  batterySOC: number;        // state of charge, 0-100%
  solarIrradiance: number;   // current, in W/m² (0-1000 typical range)
  predictedSunlightHours: number; // remaining sunlight hours today
}

export interface ExtendedSensorReading {
  soilTemperature: number;   // Celsius
}

export type IrrigationDecisionType = "irrigate-now" | "irrigate-partial" | "delay" | "idle";

export interface AdvancedDecisionState {
  decision: IrrigationDecisionType;
  waterNeedScore: number;    // 0-100
  energyScore: number;       // 0-100
  recommendedDurationMin: number; // 0 if not irrigating
  reason: string;
}