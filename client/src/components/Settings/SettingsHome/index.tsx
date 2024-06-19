import React from 'react';
// import { useNavigate } from 'react-router-dom';
import {
	BackgroundIcon,
	CameraIcon,
	EditIcon,
	PiIcon,
	PlusIcon,
	ProfileAvatarIcon,
	ProfileIcon,
	RiCalendarTodoLine,
	UserIcon,
	WalletIcon,
	pailotSettings,
} from '../../../assets/icons';
import {
	RiSettings5Line,
	RiLock2Line,
	RiArrowDownSLine,
	RiFacebookLine,
	RiInstagramLine,
	RiDiscordLine,
	RiTwitterLine,
	RiTelegramLine,
	RiYoutubeLine,
} from 'react-icons/ri';
import { FiBell } from 'react-icons/fi';
import { GrFormSchedule } from 'react-icons/gr';
import { motion } from 'framer-motion';
import { logo } from '../../../assets/images';
import styles from './SettingsHome.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

export const SettingsHome = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
	const userDetails = useSelector((state: RootState) => state.userDetails);
	return (
		<div className={styles.container}>
			<div className={styles.profile}>
				<img src={userDetails.user.profileImg ? userDetails.user.profileImg : logo} alt="Profile Photo" className={styles.profile__photo} />
				<div className={styles.profile__content}>
					<p className={styles.full__name}>@{userDetails.user.username}</p>
					<div className={styles.other__details}>
						<div className={styles.username__and__date}>
							<span className={styles.username}>@{userDetails.user.username}</span>
							<span className={styles.date}>
								<RiCalendarTodoLine /> <span>Joined 2023</span>
							</span>
						</div>
						<div className={styles.cta__container}>
							<motion.button
								initial={{ scale: 1 }}
								animate={{ scale: [1, 1.1, 1] }}
								className={styles.cta}
								type="button"
                onClick={() => {
                  // dispatch(userDetailsActions.setIsCourier());
                  navigate('/home')
                }}
							>
								{userDetails.isCourier ? 'Switch to Sender' : 'Switch to Courier'}
							</motion.button>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.body}>
				<div className={styles.profile__details}>
					<header className={styles.header}>
						<h4>Profile Details</h4>
						<img src={ProfileIcon} alt="Profile Icon" className={styles.profile__icon} />
					</header>
					<div>
						<img src={UserIcon} alt="Profile Icon" className={styles.profile__icon} />
						<div className={styles.text}>
							<span className={styles.username__title}>Pi username</span>
							<span className={styles.username}>@{userDetails.user.username}</span>
						</div>
					</div>
				</div>
				<div className={styles.display__pictures}>
					<header className={styles.header}>
						<h4>Display Pictures</h4>
						<img src={CameraIcon} alt="Camera Icon" className={styles.profile__icon} />
					</header>
					<div className={styles.section}>
						<img src={BackgroundIcon} alt="Background Icon" />
						<span>Background</span>
						<img src={PlusIcon} alt="" />
					</div>
					<div className={styles.section}>
						<img src={ProfileAvatarIcon} alt="Background Icon" />
						<span>Profile Avatar</span>
						<img src={PlusIcon} alt="" />
					</div>
				</div>
				<div className={styles.wallet}>
					<header className={styles.header}>
						<h4>Wallet</h4>
						<img src={WalletIcon} alt="Wallet Icon" className={styles.profile__icon} />
					</header>
					<div className={styles.wallet__section}>
						<img src={PiIcon} alt="Pi Icon" />
						<div>
							<span>Pi Wallet Address</span>
							<p>Copy and paste your Pi Wallet address here</p>
						</div>
						<img src={EditIcon} alt="" />
					</div>
				</div>

				<div className={styles.settings}>
					<header className={styles.header}>
						<h4>Settings</h4>
						<RiSettings5Line />
					</header>
					<div className={styles.section}>
						<FiBell />
						<span>Notifications</span>
						<RiArrowDownSLine />
					</div>
					<div className={styles.section}>
						<RiLock2Line />
						<span>Securities and Privacy</span>
						<RiArrowDownSLine />
					</div>
					<div className={styles.section}>
						<GrFormSchedule />
						<span>Schedule an order</span>
						<RiArrowDownSLine />
					</div>
					<div className={styles.section}>
						<img src={pailotSettings} alt="Pi Icon" />
						<span>System Settings</span>
						<RiArrowDownSLine />
					</div>
				</div>
			</div>

			<motion.div initial={{ y: '100%' }} animate={{ y: 0 }} className={styles.footer__container}>
				<motion.footer className={styles.footer}>
					<h6 className={styles.footer__header}>Pailot 2023</h6>
					<div className={styles.icons__container}>
						<RiFacebookLine className={styles.social__icon} />
						<RiInstagramLine className={styles.social__icon} />
						<RiDiscordLine className={styles.social__icon} />
						<RiTwitterLine className={styles.social__icon} />
						<RiTelegramLine className={styles.social__icon} />
						<RiYoutubeLine className={styles.social__icon} />
					</div>
					<span className={styles.app__version}>App Version 1.0</span>
				</motion.footer>
			</motion.div>
		</div>
	);
};
