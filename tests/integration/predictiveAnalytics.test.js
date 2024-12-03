import { calculatePredictions } from '../src/services/predictiveAnalytics'; // Adjust the import path as necessary

describe('Predictive Analytics Service', () => {
  it('should calculate predictions based on input data', () => {
    const inputData = [100, 200, 300];
    const expectedOutput = [110, 220, 330]; // Example expected output
    const result = calculatePredictions(inputData);
    expect(result).toEqual(expectedOutput);
  });
});
