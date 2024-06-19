import { Request, Response } from 'express';
import { Result } from '../../../constants/result';
import { getCourierUsersEntry } from '../services/user.services';

export async function getAllCourierUsers(req: Request, res: Response) {
	const usersResult = await getCourierUsersEntry();

	if (usersResult.type === Result.ERROR) {
		return res.status(500).json(usersResult);
	}

	return res.status(200).json(usersResult);
}
