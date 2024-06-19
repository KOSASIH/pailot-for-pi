import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from './Transaction';

@Entity({ name: 'couriers' })
export class Courier {
	@PrimaryColumn('uuid', { name: 'courier_user_id' })
	courierUserId: string;

	@OneToMany(() => Transaction, (transaction) => transaction.courierUserId)
	deliveries: Transaction[];

	@Column({ type: 'bigint', name: 'number_of_likes', default: 0 })
	numberOfLikes: number;

	@Column({ type: 'float4', name: 'rating', default: 0.0 })
	rating: number;

	@Column({ type: 'varchar', length: 255, name: 'is_active', default: true })
	isActive: boolean;

	@Column({ type: 'varchar', length: 255, name: 'mode_of_transportation' })
	modeOfTransportation: string;

	@Column({ type: 'varchar', length: 255, name: 'region_of_operation' })
	regionOfOperation: string;

	@Column({ type: 'float', name: 'preferred_delivery_amount', default: 0 })
	preferredDeliveryAmount: number;

	@Column({ type: 'varchar', name: 'start_time', nullable: true })
	startTime: string;

	@Column({ type: 'varchar', name: 'end_time', nullable: true })
	endTime: string;

	@Column({ type: 'float', name: 'earnings', default: 0 })
	earnings: number;
}
