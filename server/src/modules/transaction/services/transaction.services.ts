import { Transaction } from '../../../db/entity/Transaction';
import { AppDataSource } from '../../../db/dataSource';
import { ErrorResult, NotFoundResult, SuccessResult } from '../../../interfaces/result';
import { Result } from '../../../constants/result';
import {
	CreateTransactionDTO,
	DeliveryRange,
	DeliveryStatus,
	ItemCategory,
	ITransaction,
	UpdateTransaction,
} from '../../../interfaces/transaction';
import { User } from '../../../db/entity/User';
import { Courier } from '../../../db/entity/Courier';
import { ICourier, IUser } from '../../../interfaces/user';
import { uploadeImageToCloudinary } from '../../../middlewares/cloudinary';

export type TransactionsResult = SuccessResult<ITransaction[]> | ErrorResult;
export type TransactionResult = SuccessResult<ITransaction> | NotFoundResult | ErrorResult;
export type DeleteTransactionResult = SuccessResult<null> | ErrorResult;
export type CreateTransactionResult = SuccessResult<ITransaction> | NotFoundResult | ErrorResult;

const TransactionRepository = AppDataSource.getRepository(Transaction);
const UserRepository = AppDataSource.getRepository(User);
const CourierRepository = AppDataSource.getRepository(Courier);

export interface CreateTransaction {
	senderUserId?: IUser;
	courierUserId?: ICourier;
	receiverUserId?: IUser;
	preferredModeOfDelivery?: string;
	fromAddress: string;
	toAddress: string;
	imagePublicId: string;
	itemImage: string;
	itemName: string;
	itemDescription: string;
	itemWeight: number;
	itemSize: number;
	transactionAmount?: number;
	deliveryStatus?: DeliveryStatus;
	itemCategory: ItemCategory;
	deliveryRange: DeliveryRange;
	estimatedDeliveryTime?: Date;
}

export async function createTransactionEntry(
	transactionData: CreateTransactionDTO
): Promise<CreateTransactionResult> {
	try {
		const transactionObject: CreateTransaction = {
			fromAddress: transactionData.fromAddress,
			toAddress: transactionData.toAddress,
			imagePublicId: '',
			itemImage: '',
			itemName: transactionData.itemName,
			itemDescription: transactionData.itemDescription,
			itemWeight: Number(transactionData.itemWeight),
			itemSize: Number(transactionData.itemSize),
			deliveryRange: transactionData.deliveryRange,
			itemCategory: transactionData.itemCategory,
			estimatedDeliveryTime: transactionData.estimatedDeliveryTime || null,
		};

		const sender = await UserRepository.findOne({
			where: { userUid: transactionData.senderUserId },
		});
		if (!sender) {
			return {
				type: Result.NOT_FOUND,
				message: `The sender with id ${transactionData.senderUserId} does not exist`,
			};
		}
		transactionObject.senderUserId = sender;

		const receiver = await UserRepository.findOne({
			where: { username: transactionData.receiverUsername },
		});

		if (!receiver) {
			return {
				type: Result.NOT_FOUND,
				message: `The receiver with username ${transactionData.receiverUsername} is not registered with Pailot`,
			};
		}
		transactionObject.receiverUserId = receiver;

		if (transactionData.courierUserId) {
			const courier = await CourierRepository.findOne({
				where: { courierUserId: transactionData.courierUserId },
			});
			if (!courier) {
				return {
					type: Result.NOT_FOUND,
					message: `The courier with id ${transactionData.courierUserId} is not found`,
				};
			}
			transactionObject.courierUserId = courier;
			transactionObject.preferredModeOfDelivery = courier.modeOfTransportation;
			transactionObject.transactionAmount = courier.preferredDeliveryAmount;
		} else {
			transactionObject.preferredModeOfDelivery = transactionData.preferredModeOfDelivery;
			transactionObject.transactionAmount = transactionData.transactionAmount;
			transactionObject.deliveryStatus = DeliveryStatus.PENDING;
		}

		const { secureURL, publicId } = await uploadeImageToCloudinary(transactionData.itemImage);
		transactionObject.imagePublicId = publicId;
		transactionObject.itemImage = secureURL;

		const transaction = TransactionRepository.create(transactionObject);
		const createdTransaction = await TransactionRepository.save(transaction);
		console.log(createdTransaction);

		return {
			type: Result.SUCCESS,
			data: createdTransaction,
		};
	} catch (error) {
		console.log(error);
		return {
			type: Result.ERROR,
			message: `An error occurred while trying to create user transaction`,
			error,
		};
	}
}

export async function getTransactionsEntry(): Promise<TransactionsResult> {
	try {
		const results = await TransactionRepository.find({ where: { deletedDate: null } });
		return {
			type: Result.SUCCESS,
			data: results,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: error.message,
			error,
		};
	}
}

export async function getTransactionEntry(trxUid: string): Promise<TransactionResult> {
	try {
		const existingTrx = await TransactionRepository.findOne({
			where: { id: trxUid, deletedDate: null },
		});
		if (!existingTrx) {
			return {
				type: Result.NOT_FOUND,
				message: `Could not find transaction with id: ${trxUid}`,
			};
		}
		return {
			type: Result.SUCCESS,
			data: existingTrx,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: `An unexpected error occurred during getting transaction with id ${trxUid}`,
			error,
		};
	}
}

// soft deletes a transaction
export async function deleteTransactionEntry(trxUid: string): Promise<DeleteTransactionResult> {
	try {
		const existingTrx = await TransactionRepository.findOne({
			where: { id: trxUid, deletedDate: null },
		});
		existingTrx.deletedDate = new Date().toISOString();
		await TransactionRepository.save(existingTrx);
		return {
			type: Result.SUCCESS,
			data: null,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: `An unexpected error occurred while deleting transaction with id ${trxUid}`,
			error: error,
		};
	}
}

type CodeType = {
	trackingNumber: number; // figure out if we want this as a number;
	deliveryCode: number;
};

export async function updateDeliverystatus(
	id: string,
	status: { deliveryStatus: DeliveryStatus }
): Promise<TransactionResult> {
	const transactionCodes = {} as CodeType;
	try {
		const transaction = await TransactionRepository.findOne({ where: { id, deletedDate: null } });
		if (!transaction) {
			return {
				type: Result.NOT_FOUND,
				message: `Could not find transaction with id: ${id}`,
			};
		}
		if (status.deliveryStatus === DeliveryStatus.ACCEPTED) {
			// Generate tracking Id and add to the object
			// transactionCodes.trackingNumber = generated trackingNumber
		}
		if (status.deliveryStatus === DeliveryStatus.IN_TRANSIT) {
			// Generate a delivery code and add to the object
			// transactionCodes.deliveryCode = generated Code
		}
		await TransactionRepository.update(id, { ...status, ...transactionCodes });
		const updatedTransaction = await TransactionRepository.findOne({ where: { id } });

		return {
			type: Result.SUCCESS,
			data: updatedTransaction,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: `An unexpected error occurred while updating transaction status with id ${id}`,
			error: error,
		};
	}
}

export async function acceptPendingTransactionRequest(
	id: string,
	courierId: string
): Promise<TransactionResult> {
	try {
		const transaction = await TransactionRepository.findOne({ where: { id, deletedDate: null } });
		if (!transaction) {
			return {
				type: Result.NOT_FOUND,
				message: `Could not find transaction with id: ${id}`,
			};
		}
		const courier = await CourierRepository.findOne({ where: { courierUserId: courierId } });
		if (!courier) {
			return {
				type: Result.NOT_FOUND,
				message: `The courier with id ${courierId} is not found`,
			};
		}
		const modeOfTransports = transaction.preferredModeOfDelivery.split(',');
		if (!modeOfTransports.includes(courier.modeOfTransportation)) {
			return {
				type: Result.ERROR,
				message: `Your mode of transportation is not compatible with that of the request.`,
			};
		}
		transaction.courierUserId = courier;
		transaction.deliveryStatus = DeliveryStatus.ACCEPTED;
		const updatedTransaction = await TransactionRepository.save(transaction);
		return {
			type: Result.SUCCESS,
			data: updatedTransaction,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: `An unexpected error occurred while updating transaction status with id ${id}`,
			error: error,
		};
	}
}

export async function updateTransactionEntry(
	id: string,
	updateData: UpdateTransaction
): Promise<TransactionResult> {
	try {
		let transaction = await TransactionRepository.findOne({ where: { id, deletedDate: null } });
		if (!transaction) {
			return {
				type: Result.NOT_FOUND,
				message: `Could not find transaction with id: ${id}`,
			};
		}
		if (updateData.courierId) {
			const courier = await CourierRepository.findOne({
				where: { courierUserId: updateData.courierId },
			});
			if (!courier) {
				return {
					type: Result.NOT_FOUND,
					message: `The courier with id ${updateData.courierId} is not found`,
				};
			}
			transaction.courierUserId = courier;
			transaction.deliveryStatus = DeliveryStatus.CREATED;
		} else {
			transaction.deliveryStatus = DeliveryStatus.PENDING;
		}
		if (updateData.itemImage) {
			const { secureURL, publicId } = await uploadeImageToCloudinary(updateData.itemImage, {
				public_id: transaction.imagePublicId,
			});
			transaction.imagePublicId = publicId;
			updateData.itemImage = secureURL;
		}
		// delete the courierId because we only needed it to fetch the courier and map to the transaction.
		delete updateData.courierId;

		transaction = { ...updateData, ...transaction };

		const updatedTransaction = await TransactionRepository.save(transaction);
		return {
			type: Result.SUCCESS,
			data: updatedTransaction,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: `An unexpected error occurred while updating transaction with id ${id}`,
			error: error,
		};
	}
}

export async function getAllPendingTransaction(): Promise<TransactionsResult> {
	try {
		const pendingTransactions = await TransactionRepository.find({
			where: { deliveryStatus: DeliveryStatus.PENDING, deletedDate: null },
		});
		// const pendingTransactions = await TransactionRepository.createQueryBuilder('transaction')
		// 	.where('transaction.deliveryStatus = :deliveryStatus', {
		// 		deliveryStatus: DeliveryStatus.PENDING,
		// 	})
		// 	.andWhere('transaction.deletedDate IS NULL')
		// 	.getMany();
		return {
			type: Result.SUCCESS,
			data: pendingTransactions,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: `An unexpected error occurred while retreiving pending transactions`,
			error: error,
		};
	}
}

export async function getTransactionsEntryForSenderById(
	userUid: string
): Promise<TransactionsResult> {
	try {
		const results = await TransactionRepository.find({
			where: {
				senderUserId: { userUid },
				deletedDate: null,
			},
		});
		return {
			type: Result.SUCCESS,
			data: results,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: error.message,
			error,
		};
	}
}

export async function getTransactionsEntryForReceiverById(
	userUid: string
): Promise<TransactionsResult> {
	try {
		const results = await TransactionRepository.find({
			where: {
				receiverUserId: { userUid },
				deletedDate: null,
			},
		});
		return {
			type: Result.SUCCESS,
			data: results,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: error.message,
			error,
		};
	}
}

export async function getTransactionsEntryForReceiverByUsername(
	username: string
): Promise<TransactionsResult> {
	try {
		const results = await TransactionRepository.find({
			where: {
				receiverUserId: { username },
				deletedDate: null,
			},
		});
		return {
			type: Result.SUCCESS,
			data: results,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: error.message,
			error,
		};
	}
}

export async function getTransactionsEntryForCourierId(
	userUid: string
): Promise<TransactionsResult> {
	try {
		const results = await TransactionRepository.find({
			where: {
				courierUserId: { courierUserId: userUid },
				deletedDate: null,
			},
		});
		return {
			type: Result.SUCCESS,
			data: results,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: error.message,
			error,
		};
	}
}
