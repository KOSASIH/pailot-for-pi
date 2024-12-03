import { connectToDevice, sendData } from '../src/services/iot'; // Adjust the import path as necessary

describe('IoT Service', () => {
  it('should connect to an IoT device', async () => {
    const deviceId = 'device-123';
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
      })
    );

    const result = await connectToDevice(deviceId);
    expect(result).toBe(true);
    global.fetch.mockRestore();
  });

  it('should send data to the IoT device', async () => {
    const deviceId = 'device-123';
    const data = { temperature: 22 };
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
      })
    );

    const result = await sendData(deviceId, data);
    expect(result).toBe(true);
    global.fetch.mockRestore();
  });
});
