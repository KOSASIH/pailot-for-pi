import { Request, Response } from 'express';
import { Result } from '../../../constants/result';
import { findUserByUsername } from '../services/user.services';

export async function getUserByUsername(req: Request, res: Response) {
	const username = req.params.username;
	console.log(username);
	const userResult = await findUserByUsername(username);

	if (userResult.type === Result.ERROR) {
		return res.status(500).json(userResult);
	}
	if (userResult.type === Result.NOT_FOUND) {
		return res.status(404).json(userResult);
	}

	return res.status(200).json(userResult);
}
