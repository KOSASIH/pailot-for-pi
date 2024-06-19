import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from '../../../constants/environments';
import { Result } from '../../../constants/result';
import { platformAPIClient } from '../../../utils/platformAPIClient';
import { createUserEntry } from '../services/user.services';

export async function signInUser(req: Request, res: Response) {
	const auth = req.body.authResult;
	console.log(auth);
	try {
		await platformAPIClient.get(`/v2/me`, {
			headers: { Authorization: `Bearer ${auth.accessToken}` },
		});
	} catch (error) {
		return res.status(401).json({ error: 'Invalid access token' });
	}

	const result = await createUserEntry(auth);

	if (result.type === Result.SUCCESS) {
		const token = jwt.sign(
			{ userUid: result.data.user.userUid, username: result.data.user.username },
			env.SESSION_SECRET,
			{
				expiresIn: '7 days',
			}
		);
		return res.status(200).json({ message: 'User signed in', data: result.data, token: token });
	} else {
		return res.status(500).json({ message: result.message, error: result.error });
	}
}
