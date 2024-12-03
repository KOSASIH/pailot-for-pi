import { MongoClient } from 'mongodb';
import { Logger } from './logger'; // Assume you have a logger utility

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'environmental_impact_db';

class EnvironmentalImpactService {
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

  async calculateCarbonFootprint(data) {
    // Example calculation based on transportation, energy usage, etc.
    const { milesDriven, energyUsed, wasteProduced } = data;

    // Simple carbon footprint calculations (these factors can be adjusted)
    const carEmissionFactor = 0.404; // kg CO2 per mile
    const energyEmissionFactor = 0.92; // kg CO2 per kWh
    const wasteEmissionFactor = 0.1; // kg CO2 per kg of waste

    const carEmissions = milesDriven * carEmissionFactor;
    const energyEmissions = energyUsed * energyEmissionFactor;
    const wasteEmissions = wasteProduced * wasteEmissionFactor;

    const totalEmissions = carEmissions + energyEmissions + wasteEmissions;

    this.logger.info(`Calculated carbon footprint: ${totalEmissions} kg CO2`);
    return { totalEmissions };
  }

  async logImpact(data) {
    const impactRecord = {
      ...data,
      createdAt: new Date(),
    };

    await this.db.collection('impacts').insertOne(impactRecord);
    this.logger.info('Logged environmental impact:', impactRecord);
    return impactRecord;
  }

  async generateReport(userId) {
    const impacts = await this.db.collection('impacts').find({ userId }).toArray();
    const totalEmissions = impacts.reduce((sum, impact) => sum + impact.totalEmissions, 0);

    const report = {
      userId,
      totalImpacts: impacts.length,
      totalEmissions,
      createdAt: new Date(),
    };

    this.logger.info('Generated report for user:', userId);
    return report;
  }

  async close() {
    await this.mongoClient.close();
    this.logger.info('MongoDB connection closed');
  }
}

export default new EnvironmentalImpactService();
