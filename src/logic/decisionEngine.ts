import type { DecisionState, CropType } from "../types/sensor";
import { cropThresholds } from "../data/mockData";

export function computeDecision(
  soilMoisture: number,
  rainProbability: number,
  crop: CropType
): DecisionState {
  const threshold = cropThresholds[crop];

  if (soilMoisture >= threshold) {
    return {
      status: "idle",
      reason: `Soil moisture (${soilMoisture}%) is above the ${threshold}% threshold for ${crop} — no irrigation needed.`,
    };
  }

  if (rainProbability >= 60) {
    return {
      status: "skipped-rain",
      reason: `Soil moisture is below threshold, but rain probability is ${rainProbability}% in the next few hours — irrigation delayed to conserve water.`,
    };
  }

  return {
    status: "irrigating",
    reason: `Soil moisture (${soilMoisture}%) is below the ${threshold}% threshold for ${crop}, and rain is unlikely — irrigating now.`,
  };
}