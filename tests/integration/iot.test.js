import { connectToDevice, sendData } from '../src/services/iot'; // Adjust the import path as necessary

describe('IoT Service', () => {
  it('should connect to an IoT device', async () => {
    const deviceId = 'device-123';
    const result = await connectToDevice(deviceId);
    expect(result).toBe(true);
  });

  it('should send data to the IoT device', async () => {
    const deviceId = 'device-123';
    const data = { temperature: 22 };
    const result = await sendData(deviceId, data);
    expect(result).toBe(true);
  });
});
