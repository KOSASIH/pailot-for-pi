import { Pool, PoolClient } from 'pg';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from './logger'; // Assume you have a logger utility

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

class DaoService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  private async getClient(): Promise<PoolClient> {
    const client = await pool.connect();
    return client;
  }

  public async query(query: string, values: any[] = []): Promise<any[]> {
    const client = await this.getClient();
    try {
      const result = await client.query(query, values);
      return result.rows;
    } catch (error) {
      this.logger.error('Error executing query:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  public async create(table: string, data: Record<string, any>): Promise<any> {
    const client = await this.getClient();
    const id = uuidv4(); // Generate a unique ID
    const query = `INSERT INTO ${table} (id, ${Object.keys(data).join(', ')}) VALUES ($1, ${Object.keys(data).map((_, index) => `$${index + 2}`).join(', ')}) RETURNING *`;
    const values = [id, ...Object.values(data)];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      this.logger.error('Error creating record:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  public async read(table: string, id: string): Promise<any> {
    const client = await this.getClient();
    const query = `SELECT * FROM ${table} WHERE id = $1 AND deleted_at IS NULL`;
    
    try {
      const result = await client.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      this.logger.error('Error reading record:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  public async update(table: string, id: string, data: Record<string, any>): Promise<any> {
    const client = await this.getClient();
    const query = `UPDATE ${table} SET ${Object.keys(data).map((key, index) => `${key} = $${index + 1}`).join(', ')} WHERE id = $${Object.keys(data).length + 1} RETURNING *`;
    const values = [...Object.values(data), id];

    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      this.logger.error('Error updating record:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  public async delete(table: string, id: string): Promise<void> {
    const client = await this.getClient();
    const query = `UPDATE ${table} SET deleted_at = NOW() WHERE id = $1`;

    try {
      await client.query(query, [id]);
    } catch (error) {
      this.logger.error('Error deleting record:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  public async findAll(table: string, conditions: Record<string, any> = {}): Promise<any[]> {
    const client = await this.getClient();
    const whereClauses = Object.keys(conditions).map((key, index) => `${key} = $${index + 1}`).join(' AND ');
    const query = `SELECT * FROM ${table} WHERE ${whereClauses} AND deleted_at IS NULL`;
    const values = Object.values(conditions);

    try {
      const result = await client.query(query, values);
      return result.rows;
    } catch (error) {
      this.logger.error('Error finding records:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  public async transaction(operations: (client: PoolClient) => Promise<void>): Promise<void> {
    const client = await this.getClient();
    try {
      await client.query('BEGIN');
      await operations(client);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      this.logger.error('Transaction error:', error);
      throw error;
    } finally {
      client.release();
    }
  }
}

export default new DaoService();
