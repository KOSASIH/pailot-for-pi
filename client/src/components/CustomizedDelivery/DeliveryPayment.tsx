import styles from './DeliveryPayment.module.css';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { motion } from 'framer-motion';
import { fetchWithCredentials } from '../../hooks/useApi';
import { APPROVE_PAYMENT_URL, CREATE_TRANSACTION_URL } from '../../constants/url.constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deliveryDetailsActions, RootState } from '../../store/store';
import axios from 'axios';
import { convertStringToNumber } from '../../utils/utils';
import { onCancel, onError, onReadyForServerCompletion } from '../../utils/paymentsCallback';

interface Props {
	setProgress: Dispatch<SetStateAction<number>>;
	uploadedImage: File | undefined;
}

const PLATFORM_FEE = 0.001;

export const DeliveryPayment: React.FC<Props> = ({ setProgress, uploadedImage }) => {
	const [transactionAmount, setTransactionAmount] = useState<number>();
  const amountRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		courierDetails,
		receiverDetails,
		modeOfDelivery,
		pickupLocation,
		dropLocation,
		deliveryRegion,
		productName,
		description,
		weight,
		size,
		category,
	} = useSelector((state: RootState) => state.deliveryDetails.deliveryDetails);
	const userDetails = useSelector((state: RootState) => state.userDetails);

	const handlePayment = async () => {
		try {
			const transaction = await handleSubmitTransaction();

			const onReadyForServerApproval = async (paymentId: string) => {
				console.log('onReadyForServerApproval', paymentId);
				return await fetchWithCredentials(APPROVE_PAYMENT_URL, {
					method: 'POST',
					data: {
						paymentId,
						deliveryId: transaction.data.id,
						amount: transaction.data.transactionAmount,
					},
				});
			};

			const paymentData = {
				amount: transaction.data.transactionAmount,
				memo: transaction.data.itemName,
				metadata: {
					deliveryId: transaction.data.id,
				},
			};

			const callbacks = {
				onReadyForServerApproval,
				onReadyForServerCompletion,
				onCancel,
				onError,
			};
			const payment = await window.Pi.createPayment(paymentData, callbacks);
      if (payment) {
        setProgress(8);
      }
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmitTransaction = async () => {
		const formData = new FormData();
		formData.append('senderUserId', userDetails.user.userUid);
		formData.append('courierUserId', courierDetails.courier?.courierUserId ?? '');
		formData.append('receiverUserId', receiverDetails.userUid);
		formData.append('preferredModeOfDelivery', modeOfDelivery.join(','));
		formData.append('fromAddress', pickupLocation);
		formData.append('toAddress', dropLocation);
		formData.append('image', uploadedImage ? uploadedImage : '');
		formData.append('itemName', productName);
		formData.append('itemDescription', description);
		formData.append('itemWeight', `${convertStringToNumber(weight)}`);
		formData.append('itemSize', `${convertStringToNumber(size)}`);
		formData.append('transactionAmount', `${transactionAmount}`);
		formData.append('itemCategory', category);
		formData.append('deliveryRange', deliveryRegion);
		try {
			const transaction = await fetchWithCredentials(CREATE_TRANSACTION_URL, {
				method: 'POST',
				data: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			console.log(transaction);
			return transaction.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.status === 401) {
					navigate('/welcome');
				}
				throw error;
			}
			throw error;
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.top__bar}>
				<div>
					<IoMdArrowRoundBack
						className={styles.back}
						onClick={() => {
							setProgress(6);
						}}
					/>
				</div>
				<span>Payment</span>
			</div>
			<div className={styles.body}>
				<p className={styles.description}>
					Final stop! Tell Pailot how much Pi you are willing to pay
				</p>
				<h4 className={styles.header}>Pay with Pi</h4>

				<label htmlFor="Amount" className={styles.label}>
					<p>Amount</p>
					<div>
						<motion.div
							initial={{ x: '-100vw', opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.1,
								duration: 0.5,
								type: 'tween',
							}}
							className={styles.input__container}
						>
							<input
								type="number"
                ref={amountRef}
								name="Amount"
								placeholder="0.0000"
								pattern="[0-9]*"
                min="0.001"
								inputMode="numeric"
								onChange={(e) => {
									setTransactionAmount(Number(e.target.value));
									dispatch(deliveryDetailsActions.setTransactionAmount(Number(e.target.value)));
								}}
							/>
						</motion.div>
					</div>
					{/* <span>Amount should not be less than 0.006</span> */}
				</label>
				<div className={styles.charges}>
					<div className={styles.fees}>
						<div>
							<p>Platform fee:</p>
							<span>{PLATFORM_FEE}</span>
						</div>
					</div>
					<div className={styles.total}>
						<p>Total</p>
						<span>{((transactionAmount ?? 0) + PLATFORM_FEE).toFixed(4)}</span>
					</div>
				</div>
			</div>
			<motion.div
				initial={{ y: 100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{
					delay: 0.5,
					duration: 0.3,
				}}
				className={styles.cta__container}
			>
				<button
					type="button"
					className={(!transactionAmount) ? styles.cta__disabled : styles.cta}
					onClick={handlePayment}
					disabled={!transactionAmount}
				>
					Pay with Pi
				</button>
			</motion.div>
		</div>
	);
};
