import React, { useState } from 'react';
import styles from './ShareLocation.module.css';
import { logo } from '../../assets/images/index';
import { logo__noBg } from '../../assets/images/index';
import { GrFormClose } from '../../assets/icons';
import { WorldIcon } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export const ShareLocation = () => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const navigate = useNavigate();
	const shareLocationHandler = () => {
		setShowModal(true);
	};
	return (
		<div className={styles.container}>
			<div className={styles.profile}>
				<motion.div initial={{ x: 32 }} animate={{ x: 0 }}>
					<img src={logo} alt="Profile Photo" className={styles.profile__photo} />
					<span>Pailot</span>
				</motion.div>
			</div>
			<p className={styles.intro}>Explore local stores, couriers, warehouse and logistics</p>
			<div className={styles.mid}>
				<img src={WorldIcon} alt="World Icon" className={styles.world__logo} />
				<p className={styles.description}>
					Help <span>Pailot</span> display your local delivery options by granting location
					permission
				</p>
			</div>
			<div className={styles.cta__container}>
				<button className={styles.share__location} onClick={shareLocationHandler}>
					Share Location
				</button>
				<button className={styles.not__now}>Not now</button>
			</div>
			{showModal && (
				<div className={styles.modal__container}>
					<motion.div
						initial={{ scale: 0, opacity: 0 }}
						animate={{
							scale: 1,
							opacity: 1,
						}}
						exit={{ scale: 0, opacity: 0 }}
						className={styles.modal}
					>
						<div className={styles.close__container}>
							<GrFormClose onClick={() => setShowModal(false)} />
						</div>
						<div className={styles.content}>
							<img src={logo__noBg} alt="Profile Photo" className={styles.modal__profile__photo} />
							<p>
								Your location helps us better the delivery process from our end to you end as well
								provide you the quickest delivery options for you
							</p>
						</div>
						<div className={styles.modal__cta__container}>
							<button
								className={styles.cta}
								type="button"
								onClick={() => navigate('/onboarding-completed')}
							>
								Grant access
							</button>
						</div>
					</motion.div>
					<AnimatePresence>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.5 }}
							exit={{ opacity: 0 }}
							className={styles.modal__backdrop}
						></motion.div>{' '}
					</AnimatePresence>
				</div>
			)}
		</div>
	);
};
