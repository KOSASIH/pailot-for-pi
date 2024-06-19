import styles from './FooterNavBar.module.css';
import { pailotPurpleLogo } from '../../../assets/images';
import { RiShoppingCart2Line } from 'react-icons/ri';
import { RiWallet2Line } from 'react-icons/ri';
import { RiQrScan2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { pailotSettings } from '../../../assets/icons';

interface Props {
	active: string;
}

export const FooterNavBar: React.FC<Props> = ({ active }) => {
	const navigate = useNavigate();
	return (
		<nav className={styles.footer__nav}>
			<ul className={styles.list}>
				<li
					className={`${active === 'home' ? styles.active__item : styles.list__item}`}
					onClick={() => {
						navigate('/home');
					}}
				>
					<img src={active === 'home' ? pailotPurpleLogo : pailotSettings} alt="Pailot Logo" />
					<span className={styles.link__text}>Pailot</span>
				</li>
				<li
					className={`${active === 'dashboard' ? styles.active__item : styles.list__item}`}
					onClick={() => {
						navigate('/dashboard');
					}}
				>
					<RiShoppingCart2Line />
					<span className={styles.link__text}>Dashboard</span>
				</li>
				<li className={`${active === 'wallet' ? styles.active__item : styles.list__item}`}>
					<RiWallet2Line />
					<span className={styles.link__text}>Wallet</span>
				</li>
				<li className={`${active === 'code' ? styles.active__item : styles.list__item}`}>
					<RiQrScan2Line />
					<span className={styles.link__text}>Code Verify</span>
				</li>
			</ul>
		</nav>
	);
};
