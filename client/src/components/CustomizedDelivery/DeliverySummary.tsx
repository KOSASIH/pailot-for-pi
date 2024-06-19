import styles from './DeliverySummary.module.css';
import React, { Dispatch, SetStateAction } from 'react';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiEBike2Fill } from 'react-icons/ri';
import { IoMdBicycle } from 'react-icons/io';
import { BiCar } from 'react-icons/bi';
import { SlPlane } from 'react-icons/sl';

import { motion } from 'framer-motion';
// import { GiCancel } from 'react-icons/gi';
import { defaultUser, logo } from '../../assets/images';
import { summaryImage } from '../../assets/images';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
interface Props {
	setProgress: Dispatch<SetStateAction<number>>;
}

export const DeliverySummary: React.FC<Props> = ({ setProgress }) => {
	const deliveryType = useSelector((state: RootState) => state.deliveryType);
	const deliveryDetails = useSelector((state: RootState) => state.deliveryDetails.deliveryDetails);

	console.log(deliveryType.deliveryType);

	return (
		<div className={styles.container}>
			<div className={styles.top__bar}>
				<div>
					<IoMdArrowRoundBack
						className={styles.back}
						onClick={() => {
							setProgress(5);
						}}
					/>
				</div>
				<span>Summary</span>
				<IoMdArrowRoundForward
					onClick={() => {
						setProgress(7);
					}}
				/>
			</div>
			<div className={styles.body}>
				<div className={styles.delivery__image}>
					<div>
						<div className={styles.delivery__img__container}>
							<img
								src={
									deliveryDetails.imageURL
										? deliveryDetails.imageURL
										: summaryImage
								}
								alt="Delivery Image"
							/>
						</div>
						<div className={styles.icon__container}>
							<AiOutlineEdit className={styles.icon} />
						</div>
					</div>
					<span>{deliveryDetails.imageName} </span>
				</div>
				<div className={styles.delivery__details}>
					<p className={styles.title}>Product name:</p>
					<p className={styles.value}>{deliveryDetails.productName}</p>
					<div className={styles.icon__container}>
						<AiOutlineEdit className={styles.icon} />
					</div>
				</div>
				<div className={styles.delivery__details}>
					<p className={styles.title}>Description:</p>
					<p className={styles.value}>
						{`${deliveryDetails.description.slice(0, 19)}...`}{' '}
					</p>
					<div className={styles.icon__container}>
						<AiOutlineEdit className={styles.icon} />
					</div>
				</div>
				<div className={styles.delivery__details}>
					<p className={styles.title}>Weight:</p>
					<p className={styles.value}>{deliveryDetails.weight} </p>
					<div className={styles.icon__container}>
						<AiOutlineEdit className={styles.icon} />
					</div>
				</div>
				<div className={styles.delivery__details}>
					<p className={styles.title}>Size:</p>
					<p className={styles.value}>{deliveryDetails.size} </p>
					<div className={styles.icon__container}>
						<AiOutlineEdit className={styles.icon} />
					</div>
				</div>
				<div className={styles.delivery__details}>
					<p className={styles.title}>
						{deliveryType.deliveryType === 'customized' ? 'Mode of Delivery:' : 'Your Courier:'}
					</p>
					{deliveryType.deliveryType === 'customized' && (
						<div className={styles.modes__of__delivery}>
							{deliveryDetails.modeOfDelivery.map((mod: string) => {
								if (mod === 'Bicycle') {
									return (
										<div className={styles.bicycle__mod} key={mod}>
											<IoMdBicycle />
											{/* <span>Bicycle</span> */}
											{/* <GiCancel /> */}
										</div>
									);
								}
								if (mod === 'Motorbike') {
									return (
										<div className={styles.motorbike__mod} key={mod}>
											<RiEBike2Fill />
											{/* <span>Motorbike</span> */}
											{/* <GiCancel /> */}
										</div>
									);
								}
								if (mod === 'Car') {
									return (
										<div className={styles.car__mod} key={mod}>
											<BiCar />
											{/* <span>Car</span> */}
											{/* <GiCancel /> */}
										</div>
									);
								}
								if (mod === 'Plane') {
									return (
										<div className={styles.plane__mod} key={mod}>
											<SlPlane />
											{/* <span>Plane</span> */}
											{/* <GiCancel /> */}
										</div>
									);
								}
							})}
						</div>
					)}
					{deliveryType.deliveryType === 'active' && (
						<div className={styles.courier__details}>
							<img
								src={
									deliveryDetails.courierDetails.user.profileImg ?? defaultUser
								}
								alt="Couriers Profile picture"
							/>
							<span className={styles.courier__username}>
								{deliveryDetails.courierDetails.user.username}{' '}
							</span>
							{deliveryDetails.courierDetails.newUser && (
								<span className={styles.new__user}>New user</span>
							)}
							{deliveryDetails.courierDetails.status === 'pending' && (
								<span className={styles.courier__status__pending}>Pending</span>
							)}
							{deliveryDetails.courierDetails.status === 'pick' && (
								<span className={styles.courier__status__picked}>Picked</span>
							)}
						</div>
					)}
				</div>
				<div className={styles.delivery__details}>
					<p className={styles.title}>Delivery Region:</p>
					<p className={styles.value}>{deliveryDetails.deliveryRegion} </p>
					<div className={styles.icon__container}>
						<AiOutlineEdit className={styles.icon} />
					</div>
				</div>
				<div className={styles.delivery__details}>
					<p className={styles.title}>Receiver Username:</p>
					<div className={styles.receivers__username}>
						<img
							src={
								deliveryDetails.receiverDetails.profileImg
									? deliveryDetails.receiverDetails.profileImg
									: logo
							}
							alt="User's Profile Photo"
						/>
						<p>{deliveryDetails.receiverDetails.username}</p>
					</div>
					<div className={styles.icon__container}>
						<AiOutlineEdit className={styles.icon} />
					</div>
				</div>
				<div className={styles.delivery__details}>
					<p className={styles.title}>Pickup Location:</p>
					<p className={styles.value}>{deliveryDetails.pickupLocation}</p>
					<div className={styles.icon__container}>
						<AiOutlineEdit className={styles.icon} />
					</div>
				</div>
				<div className={styles.delivery__details}>
					<p className={styles.title}>Drop Location:</p>
					<p className={styles.value}>{deliveryDetails.dropLocation}</p>
					<div className={styles.icon__container}>
						<AiOutlineEdit className={styles.icon} />
					</div>
				</div>
			</div>
			<motion.div
				initial={{ y: 100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{
					delay: 0.5,
					duration: 0.3,
				}}
				className={styles.cta__container}
			>
				<button
					type="button"
					className={styles.cta}
					onClick={() => {
						setProgress(7);
					}}
				>
					Confirm
				</button>
			</motion.div>
		</div>
	);
};
