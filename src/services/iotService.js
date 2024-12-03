import { v4 as uuidv4 } from 'uuid';
import { WebSocketServer } from 'ws';
import { MongoClient } from 'mongodb';
import { PubSub } from '@google-cloud/pubsub';
import { Logger } from './logger'; // Assume you have a logger utility

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'iot_db';
const pubSubClient = new PubSub();
const logger = new Logger();

class IoTService {
  constructor() {
    this.devices = new Map(); // Store device information
    this.initMongoDB();
    this.initWebSocketServer();
  }

  async initMongoDB() {
    this.mongoClient = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    await this.mongoClient.connect();
    this.db = this.mongoClient.db(dbName);
    logger.info('Connected to MongoDB');
  }

  initWebSocketServer() {
    this.wss = new WebSocketServer({ port: 8080 });
    this.wss.on('connection', (ws) => {
      ws.on('message', (message) => this.handleWebSocketMessage(ws, message));
      logger.info('New WebSocket connection established');
    });
  }

  handleWebSocketMessage(ws, message) {
    const data = JSON.parse(message);
    switch (data.type) {
      case 'register':
        this.registerDevice(data.deviceId, ws);
        break;
      case 'data':
        this.handleDeviceData(data.deviceId, data.payload);
        break;
      default:
        logger.warn('Unknown message type:', data.type);
    }
  }

  registerDevice(deviceId, ws) {
    if (this.devices.has(deviceId)) {
      logger.warn(`Device ${deviceId} is already registered`);
      return;
    }
    this.devices.set(deviceId, ws);
    logger.info(`Device ${deviceId} registered`);
  }

  async handleDeviceData(deviceId, payload) {
    try {
      const deviceData = {
        deviceId,
        payload,
        timestamp: new Date(),
      };
      await this.db.collection('device_data').insertOne(deviceData);
      logger.info(`Data from device ${deviceId} saved to database`);

      // Publish to Pub/Sub for further processing
      const topic = pubSubClient.topic('device-data');
      await topic.publish(Buffer.from(JSON.stringify(deviceData)));
      logger.info(`Data from device ${deviceId} published to Pub/Sub`);

      // Send acknowledgment back to the device
      const ws = this.devices.get(deviceId);
      if (ws) {
        ws.send(JSON.stringify({ type: 'ack', deviceId }));
      }
    } catch (error) {
      logger.error('Error handling device data:', error);
    }
  }

  async getDeviceData(deviceId) {
    try {
      const data = await this.db.collection('device_data').find({ deviceId }).toArray();
      return data;
    } catch (error) {
      logger.error('Error fetching device data:', error);
      throw error;
    }
  }

  async removeDevice(deviceId) {
    if (this.devices.has(deviceId)) {
      this.devices.delete(deviceId);
      logger.info(`Device ${deviceId} removed`);
    } else {
      logger.warn(`Device ${deviceId} not found`);
    }
  }

  async close() {
    await this.mongoClient.close();
    logger.info('MongoDB connection closed');
    this.wss.close();
    logger.info('WebSocket server closed');
  }
}

export default new IoTService();
