import { MongoClient } from 'mongodb';
import { Logger } from './logger'; // Assume you have a logger utility

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'dynamic_pricing_db';

class DynamicPricingService {
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

  async setBasePrice(productId, basePrice) {
    const product = await this.db.collection('products').findOne({ id: productId });
    if (!product) {
      throw new Error('Product not found');
    }

    await this.db.collection('products').updateOne({ id: productId }, { $set: { basePrice } });
    this.logger.info(`Base price set for product ${productId}: ${basePrice}`);
    return { productId, basePrice };
  }

  async applyDiscount(productId, discountPercentage) {
    const product = await this.db.collection('products').findOne({ id: productId });
    if (!product) {
      throw new Error('Product not found');
    }

    const discountAmount = (product.basePrice * discountPercentage) / 100;
    const newPrice = product.basePrice - discountAmount;

    await this.db.collection('products').updateOne({ id: productId }, { $set: { currentPrice: newPrice } });
    this.logger.info(`Discount applied to product ${productId}: new price is ${newPrice}`);
    return { productId, newPrice };
  }

  async adjustPriceBasedOnDemand(productId, demandLevel) {
    const product = await this.db.collection('products').findOne({ id: productId });
    if (!product) {
      throw new Error('Product not found');
    }

    let adjustmentFactor = 1;
    if (demandLevel === 'high') {
      adjustmentFactor = 1.2; // Increase price by 20%
    } else if (demandLevel === 'low') {
      adjustmentFactor = 0.8; // Decrease price by 20%
    }

    const newPrice = product.basePrice * adjustmentFactor;
    await this.db.collection('products').updateOne({ id: productId }, { $set: { currentPrice: newPrice } });
    this.logger.info(`Price adjusted for product ${productId} based on demand level ${demandLevel}: new price is ${newPrice}`);
    return { productId, newPrice };
  }

  async getCurrentPrice(productId) {
    const product = await this.db.collection('products').findOne({ id: productId });
    if (!product) {
      throw new Error('Product not found');
    }
    return product.currentPrice || product.basePrice; // Return current price or base price if no current price is set
  }

  async close() {
    await this.mongoClient.close();
    this.logger.info('MongoDB connection closed');
  }
}

export default new DynamicPricingService();
