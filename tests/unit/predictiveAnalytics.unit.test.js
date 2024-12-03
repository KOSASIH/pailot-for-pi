import { calculatePredictions } from '../src/services/predictiveAnalytics'; // Adjust the import path as necessary

describe('Predictive Analytics Service', () => {
  it('should calculate predictions correctly', () => {
    const inputData = [100, 200, 300];
    const expectedOutput = [110, 220, 330]; // Example expected output
    const result = calculatePredictions(inputData);
    expect(result).toEqual(expectedOutput);
  });

  it('should return an empty array for empty input', () => {
    const result = calculatePredictions([]);
    expect(result).toEqual([]);
  });
});
