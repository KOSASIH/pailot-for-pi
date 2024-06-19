import React, { Dispatch, SetStateAction } from 'react';
import styles from './LocationModal.module.css';
import { MdOutlineClose } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
	closeModal: () => void;
	setProgress: Dispatch<SetStateAction<number>>;
	deliveryDetailsSubmitHandler: () => void;
}

export const LocationModal: React.FC<Props> = ({
	setProgress,
	closeModal,
	deliveryDetailsSubmitHandler,
}) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	return (
		<div className={styles.container}>
			<AnimatePresence>
				<motion.div
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0, opacity: 0 }}
					key="modal"
					className={styles.modal}
				>
					<div className={styles.top__bar}>
						<MdOutlineClose
							onClick={() => {
								navigate(pathname, { replace: true });
								closeModal();
							}}
						/>
					</div>
					<h4 className={styles.header}>Location Agreement</h4>
					<p className={styles.description}>
						Pailot do not have information of location you are about to provide for this delivery.
						<br />
						Location is only shared within the transaction parties.
					</p>
					<p className={styles.terms__and__conditions}>
						Read about our{' '}
						<span>
							<a
								onClick={() =>
									navigate('/terms-and-conditions', {
										state: { path: '/customized-delivery', progress: 5, showModal: true },
									})
								}
							>
								Terms and Conditions
							</a>
							, Policies
						</span>{' '}
						and{' '}
						<span>
							<a
								onClick={() =>
									navigate('/privacy-policy', {
										state: { path: '/customized-delivery', progress: 5, showModal: true },
									})
								}
							>
								Privacy
							</a>
						</span>{' '}
						in your profile settings
					</p>
					<div className={styles.cta__container}>
						<button
							type="button"
							className={styles.cta}
							onClick={() => {
								deliveryDetailsSubmitHandler();
								navigate(pathname, { replace: true });
								setProgress(6);
							}}
						>
							Ok
						</button>
					</div>
				</motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					key="backdrop"
					className={styles.backdrop}
					onClick={() => {
						closeModal();
					}}
				></motion.div>
			</AnimatePresence>
		</div>
	);
};
