import { Request, Response } from 'express';
import { Result } from '../../../constants/result';
import { CustomRequest } from '../../../middlewares/auth';
import { findUser } from '../services/user.services';

export async function getUser(req: Request, res: Response) {
	const userUid = (req as CustomRequest).token.userUid;
	const userResult = await findUser(userUid);

	if (userResult.type === Result.ERROR) {
		return res.status(500).json(userResult);
	}
	if (userResult.type === Result.NOT_FOUND) {
		return res.status(404).json(userResult);
	}

	return res.status(200).json(userResult);
}
