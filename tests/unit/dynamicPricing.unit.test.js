import { calculateDynamicPrice } from '../src/services/dynamicPricing'; // Adjust the import path as necessary

describe('Dynamic Pricing Service', () => {
  it('should calculate the correct dynamic price based on demand', () => {
    const basePrice = 100;
    const demandFactor = 1.5; // Example demand factor
    const expectedPrice = 150; // Expected price after applying demand factor
    const result = calculateDynamicPrice(basePrice, demandFactor);
    expect(result).toBe(expectedPrice);
  });

  it('should return the base price when demand factor is 1', () => {
    const basePrice = 100;
    const demandFactor = 1;
    const result = calculateDynamicPrice(basePrice, demandFactor);
    expect(result).toBe(basePrice);
  });
});
