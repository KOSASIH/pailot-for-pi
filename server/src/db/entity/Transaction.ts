import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { DeliveryRange, DeliveryStatus, ItemCategory } from '../../interfaces/transaction';
import { Courier } from './Courier';
import { Earning } from './Earning';
import { User } from './User';

@Entity({ name: 'transactions' })
export class Transaction {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'bigint', name: 'tracking_number', nullable: true })
	trackingNumber: number; // Generate a tracking number when the delivery is accepted.

	@ManyToOne(() => User, (user) => user.userUid)
	@JoinColumn({ name: 'sender_user_id' })
	senderUserId: User;

	@ManyToOne(() => Courier, (courierData) => courierData.deliveries, {
		nullable: true,
	})
	@JoinColumn({ name: 'courier_user_id' })
	courierUserId: Courier;

	@ManyToOne(() => User, (user) => user.userUid)
	@JoinColumn({ name: 'receiver_user_id' })
	receiverUserId: User;

	@Column({ type: 'varchar', length: 255, name: 'preferred_mode_of_delivery' })
	preferredModeOfDelivery: string;

	@Column({ type: 'float', name: 'transaction_amount', default: 0 })
	transactionAmount: number;

	@Column({ type: 'varchar', name: 'from_address' })
	fromAddress: string;

	@Column({ type: 'varchar', name: 'to_address' })
	toAddress: string;

	@Column({ name: 'item_image', type: 'varchar' })
	itemImage: string;

	@Column({ name: 'image_public_id', type: 'varchar' })
	imagePublicId: string;

	@Column({ type: 'varchar', name: 'item_name' })
	itemName: string;

	@Column({ type: 'varchar', name: 'item_description' })
	itemDescription: string;

	@Column({ type: 'float', name: 'item_weight' })
	itemWeight: number;

	@Column({ type: 'float', name: 'item_size' })
	itemSize: number;

	@Column({
		type: 'enum',
		enum: DeliveryStatus,
		name: 'delivery_status',
		default: DeliveryStatus.CREATED,
	})
	deliveryStatus: DeliveryStatus;

	@Column({
		type: 'enum',
		enum: ItemCategory,
		name: 'item_category',
	})
	itemCategory: ItemCategory;

	@Column({
		type: 'enum',
		enum: DeliveryRange,
		name: 'delivery_range',
		nullable: true,
	})
	deliveryRange: DeliveryRange;

	@Column({ type: 'date', nullable: true, name: 'estimated_delivery_time' })
	estimatedDeliveryTime: Date;

	@Column({ type: 'date', nullable: true, name: 'pickup_date' })
	pickupDate: Date;

	@Column({ type: 'date', name: 'delivery_date', nullable: true })
	deliveryDate: Date;

	@Column({ type: 'varchar', length: 50, name: 'deleted_date', nullable: true })
	deletedDate: string;

	@Column({ type: 'int', name: 'delivery_code', unique: true, nullable: true })
	deliveryCode: number;

	@OneToOne(() => Earning, (earning) => earning.delivery, {
		nullable: true,
	})
	@JoinColumn({ name: 'payment_id' })
	paymentId: Earning;
}
