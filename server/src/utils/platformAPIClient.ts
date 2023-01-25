import axios from 'axios';
import env from '../constants/environments';

export const platformAPIClient = axios.create({
	baseURL: env.platform_api_url,
	timeout: 20000,
	headers: { Authorization: `Key ${env.pi_api_key}` },
});
