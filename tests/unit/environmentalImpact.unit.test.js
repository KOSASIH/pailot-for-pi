import { calculateEnvironmentalImpact } from '../src/services/environmentalImpact'; // Adjust the import path as necessary

describe('Environmental Impact Service', () => {
  it('should calculate the environmental impact based on input data', () => {
    const inputData = { carbonFootprint: 100, wasteProduced: 50 };
    const expectedImpact = { totalImpact: 150 }; // Example expected output
    const result = calculateEnvironmentalImpact(inputData);
    expect(result).toEqual(expectedImpact);
  });

  it('should return zero impact for zero input data', () => {
    const inputData = { carbonFootprint: 0, wasteProduced: 0 };
    const expectedImpact = { totalImpact: 0 };
    const result = calculateEnvironmentalImpact(inputData);
    expect(result).toEqual(expectedImpact);
  });
});
