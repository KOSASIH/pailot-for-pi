import { useState } from 'react';
import styles from './DispatchersList.module.css';
import { motion } from 'framer-motion';
import { nigerianFlag } from '../../assets/icons';
import { defaultUser } from '../../assets/images';
import { CourierCard } from '../Common/CourierCard/CourierCard';

export const DispatchersList = () => {
	const [showAllDispathers, setShowAllDispathers] = useState<boolean>();
	const [dispatchers, setDispatchers] = useState([
		{
			status: 'pick',
			courierImage: defaultUser,
			courierCharge: 0.00034,
			courierUserName: '@piusername',
			newUser: true,
			startTime: '7am',
			endTime: '8pm',
			modeOfTransportation: 'Motorbike',
			online: true,
		},
		{
			status: 'pick',
			courierImage: defaultUser,
			courierCharge: 0.00034,
			courierUserName: '@piusername',
			newUser: true,
			startTime: '7am',
			endTime: '8pm',
			modeOfTransportation: 'Bicycle',
			online: true,
		},
		{
			status: 'pick',
			courierImage: defaultUser,
			courierCharge: 0.00034,
			courierUserName: '@piusername',
			newUser: true,
			startTime: '7am',
			endTime: '8pm',
			modeOfTransportation: 'Drone',
			online: true,
		},
		{
			status: 'pick',
			courierImage: defaultUser,
			courierCharge: 0.00034,
			courierUserName: '@piusername',
			newUser: true,
			startTime: '7am',
			endTime: '8pm',
			modeOfTransportation: 'Foot',
			online: true,
		},
		{
			status: 'pick',
			courierImage: defaultUser,
			courierCharge: 0.00034,
			courierUserName: '@piusername',
			newUser: true,
			startTime: '7am',
			endTime: '8pm',
			modeOfTransportation: 'Truck',
			online: true,
		},
	]);
	const dispatherCount = dispatchers.length;

	// eslint-disable-next-line no-unused-vars
	const moveToFront = (itemToMove: any) => {
		let index = dispatchers.indexOf(itemToMove);
		dispatchers[index].status = 'picked';
		dispatchers.splice(index, 1);
		dispatchers.unshift(itemToMove);
		setDispatchers([...dispatchers]); // update the state with the new array
	};
	return (
		<div className={styles.container}>
			<motion.div
				initial={{ y: 100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{
					delay: 0.1,
					duration: 0.5,
				}}
				className={styles.container}
			>
				<div className={styles.dispatcher__top__bar}>
					<span className={styles.dispatchers__near__you}>
						Dispatchers near you
						<span className={styles.dispatchers__near__you__count}>{dispatherCount}</span>
					</span>
					<div className={styles.location}>
						<img src={nigerianFlag} alt="Country Flag" />
						<span>Yaba, LAG</span>
					</div>
				</div>
				<div className={styles.body}>
					{!showAllDispathers &&
						dispatchers.slice(0, 3).map((dispatcher: any, index) => {
							return (
								<CourierCard
									status={dispatcher.status}
									courierImage={dispatcher.courierImage}
									courierUserName={dispatcher.courierUserName}
									newUser={dispatcher.newUser}
									courierCharge={dispatcher.courierCharge}
									startTime={dispatcher.startTime}
									endTime={dispatcher.endTime}
									modeOfTransportation={dispatcher.modeOfTransportation}
									online={dispatcher.online}
									key={index}
									propFunction={moveToFront}
									dispatcher={dispatcher}
								/>
							);
						})}
					{showAllDispathers &&
						dispatchers.map((dispatcher: any, index) => {
							return (
								<CourierCard
									status={dispatcher.status}
									courierImage={dispatcher.courierImage}
									courierUserName={dispatcher.courierUserName}
									newUser={dispatcher.newUser}
									courierCharge={dispatcher.courierCharge}
									startTime={dispatcher.startTime}
									endTime={dispatcher.endTime}
									modeOfTransportation={dispatcher.modeOfTransportation}
									online={dispatcher.online}
									key={index}
									propFunction={moveToFront}
									dispatcher={dispatcher}
								/>
							);
						})}
					<span
						className={styles.see__all}
						onClick={() => setShowAllDispathers(!showAllDispathers)}
					>
						{showAllDispathers && `Hide orders`}
						{!showAllDispathers && `See all ${dispatchers.length} orders`}
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
					{dispatchers.slice(0, 2).map((dispatcher: any, index) => {
						return (
							<CourierCard
								status={dispatcher.status}
								courierImage={dispatcher.courierImage}
								courierUserName={dispatcher.courierUserName}
								newUser={dispatcher.newUser}
								courierCharge={dispatcher.courierCharge}
								startTime={dispatcher.startTime}
								endTime={dispatcher.endTime}
								modeOfTransportation={dispatcher.modeOfTransportation}
								online={dispatcher.online}
								key={index}
								propFunction={moveToFront}
								dispatcher={dispatcher}
							/>
						);
					})}
				</div>
			</motion.div>
		</div>
	);
};
