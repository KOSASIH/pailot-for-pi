import { addItem, getItem } from '../src/services/arWarehouse'; // Adjust the import path as necessary

describe('AR Warehouse Service', () => {
  it('should add an item to the warehouse', async () => {
    const item = { id: 'item-1', name: 'Test Item' };
    const result= await addItem(item);
    expect(result).toBe(true);
  });

  it('should retrieve an item from the warehouse', async () => {
    const itemId = 'item-1';
    const item = await getItem(itemId);
    expect(item).toBeDefined();
    expect(item.name).toBe('Test Item');
  });

  it('should return undefined for a non-existent item', async () => {
    const itemId = 'non-existent-item';
    const item = await getItem(itemId);
    expect(item).toBeUndefined();
  });
});
