const DEFAULT_THRESHOLD_STEPS = 20;

export const buildThresholdList = (steps = DEFAULT_THRESHOLD_STEPS) => {
  const thresholds = [0];

  for (let i = 1.0; i <= steps; i++) {
    const ratio = i / steps;
    thresholds.push(ratio);
  }

  return thresholds;
};
