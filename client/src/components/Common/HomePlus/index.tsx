import styles from './HomePlus.module.css';
import { BsPlusLg } from 'react-icons/bs';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deliveryTypeActions } from '../../../store/store';

export const HomePlus = () => {
	const [active, setActive] = useState<boolean>(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	return (
		<motion.div
			animate={{ scale: [0, 1.3, 1] }}
			transition={{
				delay: 0.5,
			}}
			className={styles.container}
		>
			<div
				className={`${active ? styles.active : styles.icon__container}`}
				onClick={() => {
					setActive(!active);
				}}
			>
				{active && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							delay: 0.25,
						}}
						className={styles.cta__container}
					>
						<motion.button
							initial={{ y: 50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{
								y: 50,
								opacity: 0,
							}}
							transition={{
								delay: 0.25,
							}}
							type="button"
							className={styles.cta}
							// onClick={() => {
							// 	navigate('/active-delivery');
							// 	sessionStorage.setItem('hasMadeFirstDelivery', 'true');
							// 	dispatch(deliveryTypeActions.setDeliveryType('active'));
							// }}
						>
							<span>
								<HiOutlinePlusCircle />
							</span>
							<span>Online Couriers</span>
						</motion.button>
						<motion.button
							initial={{ y: 50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{
								y: 50,
								opacity: 0,
							}}
							transition={{
								delay: 0.35,
							}}
							type="button"
							className={styles.cta}
							onClick={() => {
								navigate('/customized-delivery');
								sessionStorage.setItem('hasMadeFirstDelivery', 'true');
								dispatch(deliveryTypeActions.setDeliveryType('customized'));
							}}
						>
							<span>
								<HiOutlinePlusCircle />
							</span>
							<span>Customized Delivery</span>
						</motion.button>
					</motion.div>
				)}
				<BsPlusLg />
			</div>
			<AnimatePresence>
				{active && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.68 }}
						exit={{ opacity: 0 }}
						className={styles.backdrop}
						onClick={() => {
							setActive(!active);
						}}
					></motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};
