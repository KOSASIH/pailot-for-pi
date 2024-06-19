import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IErrorBase<T> {
	error: AxiosError<T> | Error;
	type: 'axios-error' | 'error';
}

export interface IAxiosError<T> extends IErrorBase<T> {
	error: AxiosError<T>;
	type: 'axios-error';
}

export interface IError<T> extends IErrorBase<T> {
	error: Error;
	type: 'error';
}
interface Response<T, E> {
	data: T | null;
	loading: boolean;
	error?: IAxiosError<E> | IError<E>;
}

const headerConfig = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

export const fetchWithCredentials = async (
	url: string,
	{ headers: headerProps, params: paramProps, ...rest }: AxiosRequestConfig
) => {
	const headers = {
    Authorization: "Bearer " + sessionStorage.getItem('token'),
		...headerProps,
	};
	return axios({
		url,
		headers: {
			...headerConfig,
			...headers,
		},
		params: {
			...paramProps,
		},
		...rest,
	}).catch((e) => {
		throw e;
	});
};

export const useApi = <T, E = never>(
	endpoint: string,
	params: AxiosRequestConfig<T> = {
		method: 'GET',
	},
	dependencies: unknown[] = []
): Response<T, E> => {
	const api = fetchWithCredentials;
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<IAxiosError<E> | IError<E>>();

	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		setError(undefined);

		api(endpoint, params)
			.then((res) => res.data)
			.then(setData)
			.catch((err) => {
				if (axios.isAxiosError(err)) {
					if (err.response?.status === 401) {
						navigate('/welcome');
					}
					setError({
						type: 'axios-error',
						error: err,
					} as IAxiosError<E>);
				} else {
					setError({
						type: 'error',
						error: err,
					});
					throw err;
				}
			})
			.finally(() => setLoading(false));

		// eslint-disable-next-line
	}, [endpoint, ...dependencies]);

	return {
		data,
		loading,
		error,
	};
}
