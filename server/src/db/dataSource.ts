import 'reflect-metadata';
import { DataSource } from 'typeorm';
import env from '../constants/environments';
import { Courier } from './entity/Courier';
import { Transaction } from './entity/Transaction';
import { Earning } from './entity/Earning';
import { Payout } from './entity/Payout';
import { User } from './entity/User';
import { UserCourier } from './entity/UserCourier';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: env.DATABASE_HOST,
	port: env.DATABASE_PORT,
	username: env.DATABASE_USERNAME,
	password: env.DATABASE_PASSWORD,
	database: env.DATABASE_NAME,
	synchronize: false,
	logging: true,
	entities: [User, Courier, Transaction, Payout, Earning, UserCourier],
	migrations: [],
	subscribers: [],
});
