import styles from './OrderSucessful.module.css';
import React from 'react';
import { HiOutlineThumbUp } from 'react-icons/hi';
import { defaultUser } from '../../assets/images';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';

export const OrderSucessful = () => {
	// get the deliveryType state from the store
	const deliveryType = useSelector((state: RootState) => state.deliveryType.deliveryType);
	const deliveryDetails = useSelector((state: RootState) => state.deliveryDetails.deliveryDetails);

	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h3>{deliveryType === 'active' ? 'Order Successful' : 'Delivery Request Successful'}</h3>
			</header>
			<AnimatePresence>
				<motion.div
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: [0, 1.2, 1], opacity: 1 }}
					exit={{
						scale: 0,
						opacity: 0,
					}}
					transition={{
						duration: 0.5,
					}}
					className={styles.icon__container}
				>
					<HiOutlineThumbUp />
				</motion.div>
			</AnimatePresence>
			<p className={styles.description}>
				Token of your order is available on “My Deliveries”. Be on the look for your courier to
				accept this delivery order
			</p>
			{deliveryType === 'active' && deliveryDetails.courierDetails.courier && (
				<div className={styles.courier__details}>
					<img src={defaultUser} alt="Couriers Profile picture" />
					<span className={styles.courier__username}>
						{deliveryDetails.courierDetails.user.username}
					</span>
					{deliveryDetails.courierDetails.newUser && (
						<span className={styles.new__user}>New user</span>
					)}
					<span className={styles.courier__status__pending}>Pending</span>
				</div>
			)}
			<div className={styles.cta__container}>
				<motion.button
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{
						delay: 0,
					}}
					type="button"
					className={styles.cta__top}
				>
					Transaction Details
				</motion.button>
				<motion.button
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{
						delay: 0.1,
					}}
					type="button"
					className={styles.cta__mid}
				>
					Make Another Delivery
				</motion.button>
				<motion.button
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{
						delay: 0.2,
					}}
					type="button"
					className={styles.cta__bottom}
					onClick={() => {
						navigate('/home');
					}}
				>
					Back to Home
				</motion.button>
			</div>
		</div>
	);
};
