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