import styles from './PricingPopup.module.css';
import { IoMdClose } from 'react-icons/io';
import { PiIcon } from '../../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import { createCourierDetailsActions, RootState } from '../../store/store';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface Props {
	// eslint-disable-next-line no-unused-vars
	setShowPricingPopup: (value: boolean) => void;
}

export const PricingPopup: React.FC<Props> = ({ setShowPricingPopup }) => {
	const dispatch = useDispatch();
	const userCourierDetails = useSelector(
		(state: RootState) => state.userDetails.courier
	);
	const inputRef = useRef<HTMLInputElement>(null);
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={styles.container}
		>
			<motion.div
				initial={{
					y: '100%',
				}}
				animate={{ y: 0 }}
				transition={{
					duration: 0.5,
					type: 'tween',
				}}
				className={styles.modal}
			>
				<div className={styles.top__section}>
					<div
						className={styles.close__container}
						onClick={() => {
							setShowPricingPopup(false);
						}}
					>
						<IoMdClose />
					</div>
					<span className={styles.header}>Set Your Pricing</span>
				</div>
				<p className={styles.description}>
					Setting up your price create an avenue for you to earn more Pi while delivery goods and
					services around and within Pailot. we advice for you to not be too greedy as Pailot is not
					concerned with whatever price you choose.
				</p>
				<label htmlFor="Amount" className={styles.label}>
					<span>Amount in Pi</span>
					<div className={styles.input__container}>
						<img src={PiIcon} alt="Pi Icon" />
						<input type="number" placeholder="0.00000" className={styles.input} ref={inputRef} />
					</div>
				</label>
				<button
					type="button"
					className={styles.cta}
					onClick={() => {
            if (!userCourierDetails) return;
						dispatch(
							createCourierDetailsActions.setCreateCourierDetails({
								...userCourierDetails,
								preferredDeliveryAmount: Number(inputRef.current?.value),
							})
						);
					}}
				>
					Save
				</button>
			</motion.div>
		</motion.div>
	);
};
