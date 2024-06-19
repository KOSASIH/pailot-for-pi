import { Request, Response } from 'express';
import { Result } from '../../../constants/result';
import { createTransactionEntry } from '../services/transaction.services';

export async function createTransaction(req: Request, res: Response) {
	const transactionData = req.body;
	console.log(req.file);
	if (req.file) {
		transactionData.itemImage = req.file.path;
	}
	const response = await createTransactionEntry(transactionData);

	if (response.type === Result.ERROR) {
		return res.status(500).json(response);
	}
	if (response.type === Result.NOT_FOUND) {
		return res.status(404).json(response);
	}

	return res.status(201).json(response);
}
