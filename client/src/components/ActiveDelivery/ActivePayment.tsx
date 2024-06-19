import styles from './ActivePayment.module.css';
import React from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { motion } from 'framer-motion';
import { defaultUser } from '../../assets/images';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface Props {
	// eslint-disable-next-line no-unused-vars
	setProgress: (value: number) => void;
  uploadedImage: File | undefined;
}

export const ActivePayment: React.FC<Props> = ({ setProgress }) => {
	const deliveryDetails = useSelector((state: RootState) => state.deliveryDetails.deliveryDetails);
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
				<div className={styles.courier__details}>
					<img src={defaultUser} alt="Couriers Profile picture" />
					<span className={styles.courier__username}>
						{deliveryDetails.courierDetails.user.username}{' '}
					</span>
					{deliveryDetails.courierDetails.newUser && (
						<span className={styles.new__user}>New user</span>
					)}
					{deliveryDetails.courierDetails.status === 'pending' && (
						<span className={styles.courier__status__pending}>Pending</span>
					)}
					{deliveryDetails.courierDetails.status === 'pick' && (
						<span className={styles.courier__status__picked}>Picked</span>
					)}
				</div>
				<div className={styles.amount__container}>
					<motion.div
						initial={{ x: '-100vw', opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{
							delay: 0.1,
							duration: 0.5,
							type: 'tween',
						}}
					>
						<p>Amount</p>
						<span className={styles.amount}>0.021</span>
					</motion.div>
					<span>Free fees on Pailot *TBD</span>
				</div>
				<div className={styles.charges}>
					<div className={styles.fees}>
						<div>
							<p>Platform fee:</p>
							<span>0.001</span>
						</div>
					</div>
					<div className={styles.total}>
						<p>Total</p>
						<span>0.004</span>
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
					className={styles.cta}
					onClick={() => {
						setProgress(8);
					}}
				>
					Pay with Pi
				</button>
			</motion.div>
		</div>
	);
};
