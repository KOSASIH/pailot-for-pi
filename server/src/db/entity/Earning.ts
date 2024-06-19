import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { PaymentStatus } from '../../interfaces/payment';
import { Transaction } from './Transaction';

@Entity({ name: 'earnings' })
export class Earning {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToOne(() => Transaction)
	delivery: Transaction;

	@Column({ type: 'varchar', length: 255, name: 'payment_id', nullable: true })
	paymentId: string;

	@Column({ type: 'float' })
	amount: number;

	@Column({
		type: 'enum',
		name: 'payment_status',
		enum: PaymentStatus,
		default: PaymentStatus.CREATED,
	})
	paymentStatus: PaymentStatus;

	@Column({ type: 'varchar', name: 'transaction_id', nullable: true })
	transactionId: string;
}
