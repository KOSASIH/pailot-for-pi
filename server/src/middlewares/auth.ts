import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import env from '../constants/environments';

export const SECRET_KEY: Secret = env.SESSION_SECRET;

interface JWTToken extends JwtPayload {
	userUid: string;
	username: string;
}

export interface CustomRequest extends Request {
	token: JWTToken;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization.split(' ')[1];

		const decoded = jwt.verify(token, SECRET_KEY) as JWTToken;
		(req as CustomRequest).token = decoded;

		console.log('decoded', decoded);

		return next();
	} catch (err) {
		console.log(err);
		return res.status(401).json({ message: 'Please authenticate' });
	}
};
