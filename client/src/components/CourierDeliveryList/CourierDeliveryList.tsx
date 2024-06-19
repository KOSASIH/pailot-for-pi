import { useState } from 'react';
import { nigerianFlag } from '../../assets/icons';
import styles from './CourierDeliveryList.module.css';
import { motion } from 'framer-motion';
import { DeliveryCard } from '../Common/DeliveryCard/DeliveryCard';

export const CourierDeliveryList = () => {
	const [showAllDeliveries, setShowAllDeliveries] = useState<boolean>(false);
	const [deliveries, setDeliveries] = useState([
		{
			username: '@piusername',
			newUser: true,
			amount: 0.00034,
			category: 'Groceries',
			modeOfDelivery: ['Motorbike', 'Truck'],
			accepted: false,
			key: 1,
		},
		{
			username: '@piusername',
			newUser: true,
			amount: 0.00034,
			category: 'Groceries',
			modeOfDelivery: ['Motorbike', 'Truck', 'Foot'],
			accepted: false,
			key: 2,
		},
		{
			username: '@piusername',
			newUser: true,
			amount: 0.00034,
			category: 'Groceries',
			modeOfDelivery: ['Motorbike', 'Truck', 'Foot', 'Bicycle'],
			accepted: false,
			key: 3,
		},
		{
			username: '@piusername',
			newUser: true,
			amount: 0.00034,
			category: 'Groceries',
			modeOfDelivery: ['Motorbike', 'Truck', 'Foot'],
			accepted: false,
			key: 2,
		},
		{
			username: '@piusername',
			newUser: true,
			amount: 0.00034,
			category: 'Groceries',
			modeOfDelivery: ['Motorbike', 'Truck', 'Foot', 'Bicycle'],
			accepted: false,
			key: 3,
		},
	]);

	// eslint-disable-next-line no-unused-vars
	const moveToFront = (itemToMove: any) => {
		let index = deliveries.indexOf(itemToMove);
		deliveries[index].accepted = true;
		deliveries.splice(index, 1);
		deliveries.unshift(itemToMove);
		setDeliveries([...deliveries]); // update the state with the new array
	};

	const customizedDeliveryCount = deliveries.length;
	return (
		<motion.div
			initial={{ y: 100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{
				delay: 0.1,
				duration: 0.5,
			}}
			className={styles.container}
		>
			<div className={styles.location}>
				<img src={nigerianFlag} alt="Country Flag" />
				<span>Yaba, LAG</span>
			</div>
			<div className={styles.delivery__top__bar}>
				<span className={styles.customized__delivery}>
					Customized Delivery
					<span className={styles.customized__delivery__count}>{customizedDeliveryCount}</span>
				</span>
				<span className={styles.delivery__preference}>My Delivery Preference</span>
			</div>
			<div className={styles.body}>
				{!showAllDeliveries &&
					deliveries.slice(0, 3).map((delivery: any, index) => {
						return (
							<DeliveryCard
								username={delivery.username}
								newUser={delivery.newUser}
								amount={delivery.amount}
								category={delivery.category}
								modeOfDelivery={delivery.modeOfDelivery}
								accepted={delivery.accepted}
								key={index}
								delivery={delivery}
								moveToFront={moveToFront}
							/>
						);
					})}
				{showAllDeliveries &&
					deliveries.map((delivery: any, index) => {
						return (
							<DeliveryCard
								username={delivery.username}
								newUser={delivery.newUser}
								amount={delivery.amount}
								category={delivery.category}
								modeOfDelivery={delivery.modeOfDelivery}
								accepted={delivery.accepted}
								key={index}
								delivery={delivery}
								moveToFront={moveToFront}
							/>
						);
					})}
				<span className={styles.see__all} onClick={() => setShowAllDeliveries(!showAllDeliveries)}>
					{showAllDeliveries && `Hide orders`}
					{!showAllDeliveries && `See all ${deliveries.length} orders`}
				</span>
			</div>
			<div className={styles.interstate__orders}>
				<p>
					Outside your state <span>2</span>
				</p>
				<div className={styles.location}>
					<img src={nigerianFlag} alt="Country Flag" />
					<span>Nigeria</span>
				</div>
			</div>
			<div className={styles.body}>
				{deliveries.slice(0, 2).map((delivery: any, index) => {
					return (
						<DeliveryCard
							username={delivery.username}
							newUser={delivery.newUser}
							amount={delivery.amount}
							category={delivery.category}
							modeOfDelivery={delivery.modeOfDelivery}
							accepted={delivery.accepted}
							key={index}
							delivery={delivery}
							moveToFront={moveToFront}
						/>
					);
				})}
			</div>
		</motion.div>
	);
};
