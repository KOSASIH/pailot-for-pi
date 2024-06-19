import { logo } from '../../assets/images';
import styles from './LoadingSpinner.module.css';

export const LoadingSpinner = () => {
	return (
		<div className={styles.container}>
			<div className={styles.logo__container}>
				<img src={logo} alt="Pailot Logo" className={styles.logo} />
			</div>
		</div>
	);
};
