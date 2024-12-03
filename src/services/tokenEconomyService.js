import { v4 as uuidv4 } from 'uuid';
import { MongoClient } from 'mongodb';
import { Logger } from './logger'; // Assume you have a logger utility

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'token_economy_db';

class TokenEconomyService {
  constructor() {
    this.tokens = new Map(); // Store token information
    this.initMongoDB();
  }

  async initMongoDB() {
    this.mongoClient = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    await this.mongoClient.connect();
    this.db = this.mongoClient.db(dbName);
    this.logger = new Logger();
    this.logger.info('Connected to MongoDB');
  }

  async createToken(name, symbol, totalSupply) {
    const tokenId = uuidv4();
    const token = {
      id: tokenId,
      name,
      symbol,
      totalSupply,
      balance: new Map(), // Store balances for each address
      createdAt: new Date(),
    };

    this.tokens.set(tokenId, token);
    await this.db.collection('tokens').insertOne(token);
    this.logger.info(`Token created: ${name} (${symbol}) with total supply: ${totalSupply}`);
    return token;
  }

  async mintToken(tokenId, address, amount) {
    const token = this.tokens.get(tokenId);
    if (!token) {
      throw new Error('Token not found');
    }

    token.totalSupply += amount;
    token.balance.set(address, (token.balance.get(address) || 0) + amount);
    await this.db.collection('tokens').updateOne({ id: tokenId }, { $set: { totalSupply: token.totalSupply } });
    this.logger.info(`Minted ${amount} of token ${token.symbol} to address ${address}`);
    return token;
  }

  async transferToken(tokenId, fromAddress, toAddress, amount) {
    const token = this.tokens.get(tokenId);
    if (!token) {
      throw new Error('Token not found');
    }

    const fromBalance = token.balance.get(fromAddress) || 0;
    if (fromBalance < amount) {
      throw new Error('Insufficient balance');
    }

    token.balance.set(fromAddress, fromBalance - amount);
    token.balance.set(toAddress, (token.balance.get(toAddress) || 0) + amount);
    await this.db.collection('tokens').updateOne({ id: tokenId }, { $set: { balance: token.balance } });
    this.logger.info(`Transferred ${amount} of token ${token.symbol} from ${fromAddress} to ${toAddress}`);
    return token;
  }

  async burnToken(tokenId, address, amount) {
    const token = this.tokens.get(tokenId);
    if (!token) {
      throw new Error('Token not found');
    }

    const balance = token.balance.get(address) || 0;
    if (balance < amount) {
      throw new Error('Insufficient balance to burn');
    }

    token.balance.set(address, balance - amount);
    token.totalSupply -= amount;
    await this.db.collection('tokens').updateOne({ id: tokenId }, { $set: { totalSupply: token.totalSupply, balance: token.balance } });
    this.logger.info(`Burned ${amount} of token ${token.symbol} from address ${address}`);
    return token;
  }

  async getToken(tokenId) {
    const token = this.tokens.get(tokenId);
    if (!token) {
      throw new Error('Token not found');
    }
    return token;
  }

  async getBalance(tokenId, address) {
    const token = this.tokens.get(tokenId);
    if (!token) {
      throw new Error('Token not found');
    }
    return token.balance.get(address) || 0;
  }

  async close() {
    await this.mongoClient.close();
    this.logger.info('MongoDB connection closed');
  }
}

export default new TokenEconomyService();
