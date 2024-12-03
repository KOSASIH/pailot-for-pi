import { v4 as uuidv4 } from 'uuid';
import { MongoClient } from 'mongodb';
import { Logger } from './logger'; // Assume you have a logger utility

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'ar_warehouse_db';

class ARWarehouseService {
  constructor() {
    this.initMongoDB();
  }

  async initMongoDB() {
    this.mongoClient = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    await this.mongoClient.connect();
    this.db = this.mongoClient.db(dbName);
    this.logger = new Logger();
    this.logger.info('Connected to MongoDB');
  }

  async addItem(name, description, quantity, location, arModelUrl) {
    const itemId = uuidv4();
    const item = {
      id: itemId,
      name,
      description,
      quantity,
      location,
      arModelUrl,
      createdAt: new Date(),
    };

    await this.db.collection('items').insertOne(item);
    this.logger.info(`Item added: ${name} with ID: ${itemId}`);
    return item;
  }

  async updateItem(itemId, updates) {
    const result = await this.db.collection('items').updateOne({ id: itemId }, { $set: updates });
    if (result.matchedCount === 0) {
      throw new Error('Item not found');
    }
    this.logger.info(`Item updated: ${itemId}`);
    return this.getItem(itemId);
  }

  async getItem(itemId) {
    const item = await this.db.collection('items').findOne({ id: itemId });
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  }

  async getAllItems() {
    const items = await this.db.collection('items').find().toArray();
    return items;
  }

  async deleteItem(itemId) {
    const result = await this.db.collection('items').deleteOne({ id: itemId });
    if (result.deletedCount === 0) {
      throw new Error('Item not found');
    }
    this.logger.info(`Item deleted: ${itemId}`);
  }

  async updateInventory(itemId, quantity) {
    const item = await this.getItem(itemId);
    if (item) {
      item.quantity += quantity;
      await this.updateItem(itemId, { quantity: item.quantity });
      this.logger.info(`Inventory updated for item ${itemId}: new quantity is ${item.quantity}`);
    }
  }

  async close() {
    await this.mongoClient.close();
    this.logger.info('MongoDB connection closed');
  }
}

export default new ARWarehouseService();
