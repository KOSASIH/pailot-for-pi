import PiNetwork from 'pi-backend';
import { Result } from '../../../constants/result';
import env from '../../../constants/environments';
import { AppDataSource } from '../../../db/dataSource';
import { Earning } from '../../../db/entity/Earning';
import { Payout } from '../../../db/entity/Payout';
import { ErrorResult, NotFoundResult, SuccessResult } from '../../../interfaces/result';
import { CourierRepository } from '../../user/services/user.services';
import { Transaction } from '../../../db/entity/Transaction';
import { platformAPIClient } from '../../../utils/platformAPIClient';
import { ApprovePaymentData, PaymentDTO, PaymentStatus } from '../../../interfaces/payment';
import axios from 'axios';

export const PayoutRepository = AppDataSource.getRepository(Payout);
export const EarningRepository = AppDataSource.getRepository(Earning);
export const TransactionRepository = AppDataSource.getRepository(Transaction);

const Pi = new PiNetwork(env.PI_API_KEY, env.WALLET_PRIVATE_SEED);

export interface PaymentData {
	amount: number;
	memo: string;
	metadata: {
		[x: string]: string;
	};
	uid: string;
}

export async function accountToUserPayment(
	paymentData: PaymentData
): Promise<SuccessResult<Payout> | NotFoundResult | ErrorResult> {
	try {
		const courier = await CourierRepository.findOne({ where: { courierUserId: paymentData.uid } });

		if (!courier) {
			return {
				type: Result.NOT_FOUND,
				message: `Could not find user with id: ${paymentData.uid}`,
			};
		}
		if (courier.earnings < paymentData.amount) {
			return {
				type: Result.ERROR,
				message: `Courier's earning is lower than withdrawal amount`,
			};
		}
		const paymentId = await Pi.createPayment(paymentData);
		const txid = await Pi.submitPayment(paymentId);
		const completedPayment = await Pi.completePayment(paymentId, txid);

		if (
			completedPayment.status.transaction_verified &&
			!completedPayment.status.cancelled &&
			!completedPayment.status.user_cancelled
		) {
			const balance = courier.earnings - paymentData.amount;
			await CourierRepository.update(courier.courierUserId, { earnings: balance });
			const updatedCourier = await CourierRepository.findOne({
				where: { courierUserId: courier.courierUserId },
			});
			const payout = PayoutRepository.create({
				courierUserId: updatedCourier,
				PaymentId: paymentId as unknown as string,
				transactionId: txid,
				paymentStatus: PaymentStatus.COMPLETED,
				amount: paymentData.amount,
			});
			const currentPayout = await PayoutRepository.save(payout);
			return {
				type: Result.SUCCESS,
				data: currentPayout,
			};
		}
	} catch (error) {
		return {
			type: Result.ERROR,
			message: `An unexpected error occurred while making payment to courier with id ${paymentData.uid}`,
			error,
		};
	}
}

export async function cancelledUserToAppPayment(
	paymentId: string
): Promise<SuccessResult<string> | NotFoundResult | ErrorResult> {
	try {
		const transaction = await TransactionRepository.findOne({
			where: { paymentId: { paymentId } },
		});
		if (!transaction) {
			return {
				type: Result.NOT_FOUND,
				message: `Trabsaction for paymentId ${paymentId} not found`,
			};
		}
		transaction.paymentId = null;
		await TransactionRepository.save(transaction);
		await EarningRepository.update({ paymentId }, { paymentStatus: PaymentStatus.CANCELLED });
		return {
			type: Result.SUCCESS,
			data: `Cancelled the payment ${paymentId}`,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: `An unexpected error occurred while cancelling payment with id ${paymentId}`,
			error,
		};
	}
}

export async function approveUserToAppPayment(
	paymentData: ApprovePaymentData
): Promise<SuccessResult<string> | ErrorResult> {
	try {
		const transaction = await TransactionRepository.findOne({
			where: { id: paymentData.deliveryId },
		});
		console.log(transaction);

		const createEarning = EarningRepository.create({
			paymentId: paymentData.paymentId,
			amount: paymentData.amount,
		});
		console.log(createEarning);
		await EarningRepository.save(createEarning);
		transaction.paymentId = createEarning;
		await TransactionRepository.save(transaction);
		try {
			await platformAPIClient.post(`/v2/payments/${paymentData.paymentId}/approve`);
		} catch (error) {
			console.log('approval error', error);
			return {
				type: Result.ERROR,
				message: `An error occured while approving payment with id ${paymentData.paymentId}`,
				error,
			};
		}
		return {
			type: Result.SUCCESS,
			data: `Approved the payment ${paymentData.paymentId}`,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: `An unexpected error occurred while cancelling payment with id ${paymentData.paymentId}`,
			error,
		};
	}
}

export async function incompleteUserToAppPayment(
	payment: PaymentDTO
): Promise<SuccessResult<string> | NotFoundResult | ErrorResult> {
	try {
		const paymentId = payment.identifier;
		const txid = payment.transaction && payment.transaction.txid;
		const txURL = payment.transaction && payment.transaction._link;

		const earning = await EarningRepository.findOne({ where: { paymentId } });

		if (!earning) {
			return {
				type: Result.NOT_FOUND,
				message: `Payment not found`,
			};
		}
		/* check the transaction on the Pi blockchain */
		const horizonResponse = await axios.create({ timeout: 20000 }).get(txURL);
		const paymentIdOnBlock = horizonResponse.data.memo;

		if (paymentIdOnBlock !== earning.paymentId) {
			return {
				type: Result.ERROR,
				message: `PaymentId doesn't match`,
			};
		}
		await EarningRepository.update(earning.id, { paymentStatus: PaymentStatus.COMPLETED });
		try {
			await platformAPIClient.post(`/v2/payments/${paymentId}/complete`, { txid });
		} catch (error) {
			console.log('incomplete payment error', error);
			return {
				type: Result.ERROR,
				message: `An error occured while completing payment with id ${paymentId} and txId ${txid}`,
				error,
			};
		}
		return {
			type: Result.SUCCESS,
			data: `completed payment ${paymentId} successfully`,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: `An unexpected error occurred while completing the incomplete payment with id ${payment.identifier}`,
			error,
		};
	}
}

export async function completeUserToAppPayment(
	paymentId: string,
	transactionId: string
): Promise<SuccessResult<string> | ErrorResult> {
	try {
		await EarningRepository.update(
			{ paymentId },
			{ transactionId, paymentStatus: PaymentStatus.COMPLETED }
		);
		/* let Pi server know that the payment is completed */
		try {
			await platformAPIClient.post(`/v2/payments/${paymentId}/complete`, { txid: transactionId });
		} catch (error) {
			console.log('complete payment error', error);
			return {
				type: Result.ERROR,
				message: `An error occured while completing payment with id ${paymentId} and txId ${transactionId}`,
				error,
			};
		}
		return {
			type: Result.SUCCESS,
			data: `Completed the payment ${paymentId}`,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: `An unexpected error occured while trying to complete transaction with txid ${transactionId} and paymentId ${paymentId}`,
			error,
		};
	}
}
