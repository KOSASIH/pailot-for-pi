import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from './logger'; // Assume you have a logger utility

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'security_db';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Change this to a secure secret
const JWT_EXPIRATION = '1h'; // Token expiration time

class SecurityService {
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

  async registerUser (username, password, role = 'user') {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const user = {
      id: userId,
      username,
      password: hashedPassword,
      role,
      createdAt: new Date(),
    };

    await this.db.collection('users').insertOne(user);
    this.logger.info(`User  registered: ${username}`);
    return { id: userId, username, role };
  }

  async authenticateUser (username, password) {
    const user = await this.db.collection('users').findOne({ username });
    if (!user) {
      throw new Error('User  not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = this.generateToken(user);
    this.logger.info(`User  authenticated: ${username}`);
    return { token, user: { id: user.id, username: user.username, role: user.role } };
  }

  generateToken(user) {
    const payload = { id: user.id, username: user.username, role: user.role };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  }

  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async authorizeUser (token, requiredRole) {
    const decoded = this.verifyToken(token);
    const user = await this.db.collection('users').findOne({ id: decoded.id });
    if (!user) {
      throw new Error('User  not found');
    }

    if (user.role !== requiredRole) {
      throw new Error('Access denied');
    }

    return user;
  }

  async close() {
    await this.mongoClient.close();
    this.logger.info('MongoDB connection closed');
  }
}

export default new SecurityService();
