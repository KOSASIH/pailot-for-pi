import { fetchData, saveData } from '../src/services/dao'; // Adjust the import path as necessary

describe('Data Access Object (DAO)', () => {
  it('should fetch data correctly', async () => {
    const mockData = [{ id: 1, name: 'Test' }];
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    const data = await fetchData('testCollection');
    expect(data).toEqual(mockData);
    global.fetch.mockRestore();
  });

  it('should save data correctly', async () => {
    const newData = { name: 'Test', value: 42 };
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
      })
    );

    const result = await saveData('testCollection', newData);
    expect(result).toBe(true);
    global.fetch.mockRestore();
  });
});
