import React from 'react';
import { useState } from 'react';
import styles from './AllowPi.module.css';
import { logo } from '../../../assets/images';
import { CreateUserDTO } from '../../../types/user';
import { PaymentDTO } from '../../../types/payment';
import { fetchWithCredentials } from '../../../hooks/useApi';
import { INCOMPLETE_PAYMENT_URL, SIGN_IN_URL } from '../../../constants/url.constants';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoadingSpinner } from '../../LoadingSpinner/LoadingSpinner';
import { userDetailsActions } from '../../../store/store';
import { useDispatch } from 'react-redux';

export const AllowPi = () => {
	const [toggleActive, setToggleActive] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleCheckbox = (e: any) => {
		setToggleActive(e.target.checked);
	};

	const onIncompletePaymentFound = async (payment: PaymentDTO) => {
		console.log('onIncompletePaymentFound', payment);
		return await fetchWithCredentials(INCOMPLETE_PAYMENT_URL, {
			method: 'POST',
			data: { payment },
		});
	};

	const signInUser = async (authResult: CreateUserDTO) => {
		return await fetchWithCredentials(SIGN_IN_URL, {
			method: 'POST',
			data: { authResult },
		});
	};

	const scopes = ['username', 'payments', 'wallet_address'];
	const signIn = async () => {
		try {
			if (toggleActive == true) {
				setIsLoading(true);
				setIsError(false);
				const authResult: CreateUserDTO = await window.Pi.authenticate(
					scopes,
					onIncompletePaymentFound
				);
				const user = await signInUser(authResult);
				sessionStorage.setItem('user', JSON.stringify(user.data.data));
				sessionStorage.setItem('token', user.data.token);
				dispatch(userDetailsActions.setUserDetails({ user: user?.data?.data?.user }));
				dispatch(userDetailsActions.setCourierDetails({ courier: user?.data?.data?.courier }));
				setIsLoading(false);
				navigate('/onboarding-completed');
			}
		} catch (error) {
			setIsLoading(false);
			if (axios.isAxiosError(error)) {
				if (error.response?.status === 401) {
					console.error('Error:', error);
					navigate('/welcome');
				}
				setIsError(true);
				console.error('Error:', error);
				throw error;
			}
			setIsError(true);
			console.error('Error:', error);
			throw error;
		}
	};

	return (
		<div className={styles.allowPi}>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<>
					<div className={styles.img__and__header}>
						<img src={logo} alt="Pailot Logo" />
						<h3>Welcome to Pailot!</h3>
					</div>
					<p>
						Pailot connect your Pi Network account to experience the best web 3 delivery service
					</p>
					<div className={styles.cta__container}>
						<label className={styles.tick}>
							<input type="checkbox" onChange={(e) => handleCheckbox(e)} checked={toggleActive} />
							<p>I agree to allow Pailot connect to my Pi account </p>
						</label>
						<button
							onClick={signIn}
							className={`${styles.allowBtn} ${
								toggleActive ? styles.allowBtnActive : styles.allowBtnInactive
							}`}
							disabled={!toggleActive}
						>
							Allow Pi Network
						</button>
						<p className={styles.terms}>
							Learn more about Pailot <a href="#terms">terms and conditions</a>
						</p>
					</div>
				</>
			)}
			{isError && <div className={styles.error}>Error connecting to Pi. Please try Again</div>}
		</div>
	);
};
