import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { logo } from '../../assets/images/index';
import { deliveryLady } from '../../assets/images/index';
import { deliveryMan } from '../../assets/images/index';
import { deliveryBikeMan } from '../../assets/images/index';
import { FooterNavBar, HomePlus } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
// import { userDetailsActions } from '../../store/store';
import { CourierDeliveryList } from '../../components/CourierDeliveryList/CourierDeliveryList';
// import { DispatchersList } from '../../components/DispatchersList/DispatchersList';
import { userDetailsActions, RootState, deliveryTypeActions } from '../../store/store';
// import { useApi } from '../../hooks/useApi';
// import {
// 	GET_ALL_COURIER_USER_URL,
// 	GET_PENDING_TRANSACTIONS_URL,
// } from '../../constants/url.constants';

export const Home = () => {
	const [carouselCount, setCarouselCount] = useState<number>(1);
	const { isCourier } = useSelector((state: RootState) => state.userDetails);
	// const hasMadeFirstDelivery = useSelector(
	// 	(state: RootState) => state.userDetails.hasMadeFirstDelivery
	// );

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const {  data } = useApi<any>(
	// 	isCourier ? GET_PENDING_TRANSACTIONS_URL : GET_ALL_COURIER_USER_URL,
	// 	{
	// 		method: 'GET',
	// 	},
	// 	[isCourier]
	// );

	// console.log(data);

	setTimeout(() => {
		if (carouselCount === 3) {
			setCarouselCount(1);
		}
		if (carouselCount < 3) {
			setCarouselCount(carouselCount + 1);
		}
	}, 3000);

	return (
		<div className={styles.container}>
			<div className={styles.profile}>
				<motion.div initial={{ x: 32 }} animate={{ x: 0 }} onClick={() => navigate('/settings')}>
					<img src={logo} alt="Profile Photo" className={styles.profile__photo} />
					<span>Pailot</span>
				</motion.div>
			</div>
			<div className={styles.carousel__container}>
				<div
					className={`${styles.carousel} ${carouselCount === 1 && styles.slide__one} ${
						carouselCount === 2 && styles.slide__two
					} ${carouselCount === 3 && styles.slide__three}`}
				>
					<div>
						<div className={styles.content}>
							<h3>Welcome to Pailot</h3>
							<p>
								Hub for <span>decentralized</span> delivery for all works of pioneers around the
								everyday ecosystem
							</p>

							<span>FAST. DECENTRALIZED. SAFE & SECURE</span>

							<button className={styles.cta}>Read More</button>
						</div>
						<img src={deliveryLady} alt="Delivery Lady" />
					</div>
					<div>
						<div className={styles.content}>
							<h3>Welcome to Pailot</h3>
							<p>
								Hub for <span>decentralized</span> delivery for all works of pioneers around the
								everyday ecosystem
							</p>

							<span>FAST. DECENTRALIZED. SAFE & SECURE</span>

							<button className={styles.cta}>Read More</button>
						</div>
						<img src={deliveryLady} alt="Delivery Lady" />
					</div>
					<div>
						<div className={styles.content}>
							<h3>Welcome to Pailot</h3>
							<p>
								Hub for <span>decentralized</span> delivery for all works of pioneers around the
								everyday ecosystem
							</p>

							<span>FAST. DECENTRALIZED. SAFE & SECURE</span>

							<button className={styles.cta}>Read More</button>
						</div>
						<img src={deliveryLady} alt="Delivery Lady" />
					</div>
				</div>
				<div className={styles.navigate}>
					<div className={`${carouselCount === 1 && styles.active__div}`}></div>
					<div className={`${carouselCount === 2 && styles.active__div}`}></div>
					<div className={`${carouselCount === 3 && styles.active__div}`}></div>
				</div>
			</div>
			<div className={styles.delivery__and__courier}>
				<motion.div
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{
						duration: 0.5,
					}}
					className={styles.modal__container}
				>
					<h5 className={styles.header}>Create your first delivery</h5>
					<div className={styles.modal}>
						<div>
							<div className={styles.modal__content}>
								<p>Be in charge by creating</p>
								<span>Delivery</span>
								<p>that is safe, fast & conveniently pay with Pi coin</p>
							</div>
							<img src={deliveryMan} alt="Delivery Man" />
						</div>
						<div className={styles.cta__container}>
							<button
								type="button"
								className={styles.big__cta}
								onClick={() => {
									dispatch(deliveryTypeActions.setDeliveryType('customized'));
									sessionStorage.setItem('hasMadeFirstDelivery', 'true');
									dispatch(userDetailsActions.setHasMadeFirstDelivery());
									navigate('/customized-delivery');
								}}
							>
								Make a delivery
							</button>
							<button type="button" className={styles.text__cta}>
								Learn more
							</button>
						</div>
					</div>
				</motion.div>
				{!isCourier && (
					<motion.div
						initial={{ y: 50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{
							delay: 0.1,
							duration: 0.5,
						}}
						className={styles.modal__container}
					>
						<h5 className={styles.header}>Become a Courier</h5>
						<div className={styles.modal}>
							<div>
								<div className={styles.modal__content}>
									<p>Be a one time</p>
									<span>Courier</span>
									<p>and earn Pi for every delivery</p>
								</div>
								<img src={deliveryBikeMan} alt="Delivery Bike Man" />
							</div>
							<div className={styles.cta__container}>
								<button
									className={styles.big__cta}
									type="button"
									onClick={() => {
										navigate('/courier-form');
										// dispatch(userDetailsActions.setIsCourier());
									}}
								>
									Become a courier
								</button>
								<button type="button" className={styles.text__cta}>
									Learn more
								</button>
							</div>
						</div>
					</motion.div>
				)}
				{!isCourier && (
					<div className={styles.homeplus__container}>
						<HomePlus />
					</div>
				)}
				{/* {hasMadeFirstDelivery && <DispatchersList />} */}
				{isCourier && <CourierDeliveryList />}
			</div>
			<FooterNavBar active="home" />
		</div>
	);
};
