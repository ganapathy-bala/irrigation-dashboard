import type { CropType, GrowthStage, AdvancedDecisionState, EnergyState } from "../types/sensor";
import { cropThresholds } from "../data/mockData";

// -----------------------------------------------
// Growth-stage water sensitivity multipliers
// Flowering/reproductive stages need more reliable water than seedling/maturity
// -----------------------------------------------
const growthStageMultiplier: Record<GrowthStage, number> = {
  seedling: 0.8,
  vegetative: 1.0,
  flowering: 1.3,   // most water-sensitive stage
  maturity: 0.6,
};

// -----------------------------------------------
// Simplified evapotranspiration (ET) estimate
// Higher temp + lower humidity + more sun = more water lost from soil = higher ET
// This is a simplified heuristic, not the full Penman-Monteith equation,
// but captures the same directional relationship for decision-making purposes.
// -----------------------------------------------
function estimateET(temperature: number, humidity: number, solarIrradiance: number): number {
  const tempFactor = Math.max(0, temperature - 20) * 0.15;
  const humidityFactor = Math.max(0, 60 - humidity) * 0.1;
  const sunFactor = (solarIrradiance / 1000) * 2;
  return tempFactor + humidityFactor + sunFactor; // returns a 0-10ish "ET stress" number
}

// -----------------------------------------------
// WATER NEED SCORE (0-100)
// Combines: how far below threshold the soil is, ET stress, and growth-stage sensitivity
// -----------------------------------------------
function computeWaterNeedScore(
  soilMoisture: number,
  crop: CropType,
  growthStage: GrowthStage,
  temperature: number,
  humidity: number,
  solarIrradiance: number
): number {
  const threshold = cropThresholds[crop];
  const deficit = Math.max(0, threshold - soilMoisture); // how far below threshold
  const deficitScore = (deficit / threshold) * 100;

  const et = estimateET(temperature, humidity, solarIrradiance);
  const etScore = et * 5; // scale ET stress into the 0-100 range

  const stageMultiplier = growthStageMultiplier[growthStage];

  const rawScore = (deficitScore * 0.7 + etScore * 0.3) * stageMultiplier;
  return Math.min(100, Math.max(0, rawScore));
}

// -----------------------------------------------
// ENERGY AVAILABILITY SCORE (0-100)
// Combines: battery charge level and current/predicted solar generation
// -----------------------------------------------
function computeEnergyScore(energy: EnergyState): number {
  const socScore = energy.batterySOC; // already 0-100
  const solarScore = Math.min(100, (energy.solarIrradiance / 800) * 100);
  const forecastScore = Math.min(100, (energy.predictedSunlightHours / 8) * 100);

  return socScore * 0.5 + solarScore * 0.3 + forecastScore * 0.2;
}

// -----------------------------------------------
// MAIN CO-OPTIMIZATION DECISION FUNCTION
// -----------------------------------------------
export function computeCoOptimizedDecision(
  soilMoisture: number,
  crop: CropType,
  growthStage: GrowthStage,
  temperature: number,
  humidity: number,
  rainProbability: number,
  energy: EnergyState
): AdvancedDecisionState {
  const waterNeedScore = computeWaterNeedScore(
    soilMoisture, crop, growthStage, temperature, humidity, energy.solarIrradiance
  );
  const energyScore = computeEnergyScore(energy);

  const threshold = cropThresholds[crop];
  const criticalThreshold = threshold - 15; // "must water regardless of energy" line

  // Rain override — never irrigate if heavy rain is likely, regardless of other scores
  if (rainProbability >= 60 && soilMoisture < threshold) {
    return {
      decision: "delay",
      waterNeedScore,
      energyScore,
      recommendedDurationMin: 0,
      reason: `Water need is elevated (${Math.round(waterNeedScore)}/100), but ${rainProbability}% rain probability makes irrigation wasteful right now — delaying.`,
    };
  }

  // Soil already sufficient
  if (soilMoisture >= threshold) {
    return {
      decision: "idle",
      waterNeedScore,
      energyScore,
      recommendedDurationMin: 0,
      reason: `Soil moisture (${soilMoisture}%) meets the ${threshold}% threshold for ${crop} at ${growthStage} stage — no irrigation needed.`,
    };
  }

  // Critical — crop health overrides energy conservation
  if (soilMoisture < criticalThreshold) {
    return {
      decision: "irrigate-now",
      waterNeedScore,
      energyScore,
      recommendedDurationMin: 5,
      reason: `Soil moisture (${soilMoisture}%) is critically low for ${crop} — irrigating at full duration regardless of energy availability to protect crop health.`,
    };
  }

  // Water is needed, but not critical — weigh against energy availability
  if (energyScore >= 50) {
    const duration = Math.round(3 + (waterNeedScore / 100) * 4); // 3-7 min range
    return {
      decision: "irrigate-now",
      waterNeedScore,
      energyScore,
      recommendedDurationMin: duration,
      reason: `Water need (${Math.round(waterNeedScore)}/100) and energy availability (${Math.round(energyScore)}/100) both favor irrigating now — running for ${duration} min.`,
    };
  }

  // Water needed but energy is constrained — irrigate partially instead of skipping entirely
  if (energyScore >= 25) {
    const duration = Math.max(1, Math.round((waterNeedScore / 100) * 3));
    return {
      decision: "irrigate-partial",
      waterNeedScore,
      energyScore,
      recommendedDurationMin: duration,
      reason: `Energy is limited (${Math.round(energyScore)}/100 battery+solar) — irrigating a reduced ${duration} min instead of full cycle to conserve power while still helping the crop.`,
    };
  }

  // Energy too low even for partial irrigation, and not yet critical — delay
  return {
    decision: "delay",
    waterNeedScore,
    energyScore,
    recommendedDurationMin: 0,
    reason: `Energy availability is too low (${Math.round(energyScore)}/100) to irrigate efficiently right now, and soil moisture isn't yet critical — delaying until battery/solar recovers.`,
  };
}