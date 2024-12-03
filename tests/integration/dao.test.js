import { fetchData, saveData } from '../src/services/dao'; // Adjust the import path as necessary
import { mockDatabase } from '../src/utils/mockDatabase'; // Mock database for testing

describe('Data Access Object (DAO)', () => {
  beforeAll(() => {
    mockDatabase.connect(); // Connect to the mock database
  });

  afterAll(() => {
    mockDatabase.disconnect(); // Disconnect from the mock database
  });

  it('should fetch data from the database', async () => {
    const data = await fetchData('testCollection');
    expect(data).toBeDefined();
    expect(data.length).toBeGreaterThan(0);
  });

  it('should save data to the database', async () => {
    const newData = { name: 'Test', value: 42 };
    const result = await saveData('testCollection', newData);
    expect(result).toBeTruthy();
  });
});
