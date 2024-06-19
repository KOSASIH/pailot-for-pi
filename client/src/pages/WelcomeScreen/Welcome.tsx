import React from 'react';
import styles from './Welcome.module.css';
import { AllowPi } from '../../components';
import { motion } from 'framer-motion';

export const WelcomeScreen = () => {
	return (
		<motion.div
			id={styles.wrapper}
			initial={{ x: '100%', opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: '-100%', opacity: 0 }}
		>
			<AllowPi />
		</motion.div>
	);
};
