import { MongoClient } from 'mongodb';
import axios from 'axios';
import { Logger } from './logger'; // Assume you have a logger utility

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'identity_verification_db';
const EXTERNAL_VERIFICATION_API_URL = process.env.EXTERNAL_VERIFICATION_API_URL; // URL for external verification service
const EXTERNAL_API_KEY = process.env.EXTERNAL_API_KEY; // API key for external service

class IdentityVerificationService {
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

  async verifyUser Identity(userId, documentData) {
    const user = await this.db.collection('users').findOne({ id: userId });
    if (!user) {
      throw new Error('User  not found');
    }

    // Step 1: Verify document data
    const documentVerificationResult = await this.verifyDocument(documentData);
    if (!documentVerificationResult.isValid) {
      throw new Error('Document verification failed');
    }

    // Step 2: Optionally, verify against an external service
    const externalVerificationResult = await this.verifyWithExternalService(user);
    if (!externalVerificationResult.isVerified) {
      throw new Error('External verification failed');
    }

    this.logger.info(`User  identity verified: ${userId}`);
    return { userId, status: 'verified' };
  }

  async verifyDocument(documentData) {
    // Simulate document verification logic
    // In a real application, this could involve checking document formats, signatures, etc.
    const isValid = documentData.type && documentData.number && documentData.expiryDate; // Basic validation
    return { isValid };
  }

  async verifyWithExternalService(user) {
    try {
      const response = await axios.post(EXTERNAL_VERIFICATION_API_URL, {
        userId: user.id,
        name: user.name,
        email: user.email,
      }, {
        headers: {
          'Authorization': `Bearer ${EXTERNAL_API_KEY}`,
        },
      });

      return response.data; // Assuming the external service returns an object with an isVerified property
    } catch (error) {
      this.logger.error('Error verifying with external service:', error);
      return { isVerified: false };
    }
  }

  async close() {
    await this.mongoClient.close();
    this.logger.info('MongoDB connection closed');
  }
}

export default new IdentityVerificationService();
