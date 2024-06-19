import { Request, Response } from 'express';
import { Result } from '../../../constants/result';
import { approveUserToAppPayment } from '../services/payment.services';

export async function approveU2APayment(req: Request, res: Response) {
	const paymentData = req.body;

	const result = await approveUserToAppPayment(paymentData);
	if (result.type === Result.ERROR) {
		return res.status(500).json(result);
	}
	return res.status(200).json(result);
}
