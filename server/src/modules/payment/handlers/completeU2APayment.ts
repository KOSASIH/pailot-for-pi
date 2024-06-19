import { Request, Response } from 'express';
import { Result } from '../../../constants/result';
import { completeUserToAppPayment } from '../services/payment.services';

export async function completeU2APayment(req: Request, res: Response) {
	const paymentId = req.body.paymentId;
	const txid = req.body.txid;

	const completePaymentResult = await completeUserToAppPayment(paymentId, txid);
	if (completePaymentResult.type === Result.ERROR) {
		res.status(500).json(completePaymentResult);
	}
	res.status(200).json(completePaymentResult);
}
