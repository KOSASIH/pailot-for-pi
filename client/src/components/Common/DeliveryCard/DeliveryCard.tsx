import styles from './DeliveryCard.module.css';
import React, { useState, useEffect } from 'react';
import { defaultUser2 } from '../../../assets/images';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { HiOutlineClock } from 'react-icons/hi';
import { IoMdBicycle } from 'react-icons/io';
import { RiShoppingBasketLine, RiEBikeLine, RiTruckLine, RiFootprintLine } from 'react-icons/ri';

interface Props {
	username: string;
	newUser: boolean;
	amount: number;
	category: string;
	modeOfDelivery: string[];
	accepted: boolean;
	delivery: object;
	// eslint-disable-next-line no-unused-vars
	moveToFront: (value: any) => void;
}

export const DeliveryCard: React.FC<Props> = ({
	username,
	newUser,
	amount,
	category,
	modeOfDelivery,
	accepted,
	delivery,
	moveToFront,
}) => {
	// eslint-disable-next-line no-unused-vars
	const [deliveryAccepted, setDeliveryAccepted] = useState<boolean>(false);
	const [modesOfDelivery, setModesOfDelivery] = useState<any>([]);
	useEffect(() => {
		setDeliveryAccepted(accepted);
		const modes = modeOfDelivery.map((mod: string, index: number) => {
			if (mod === 'Motorbike') {
				return (
					<span className={styles.mod} key={index}>
						<RiEBikeLine className={styles.mod__icon} />
						<span>Motorbike</span>
					</span>
				);
			}
			if (mod === 'Truck') {
				return (
					<span className={styles.mod} key={index}>
						<RiTruckLine className={styles.mod__icon} />
						<span>Truck</span>
					</span>
				);
			}
			if (mod === 'Foot') {
				return (
					<span className={styles.mod} key={index}>
						<RiFootprintLine className={styles.mod__icon} />
						<span>Foot</span>
					</span>
				);
			}
			if (mod === 'Bicycle') {
				return (
					<span className={styles.mod} key={index}>
						<IoMdBicycle className={styles.mod__icon} />
						<span>Bicycle</span>
					</span>
				);
			}
		});
		setModesOfDelivery(modes);
	}, [modeOfDelivery, accepted]);

	return (
		<div className={`${styles.container} ${deliveryAccepted && styles.accepted}`}>
			<div className={styles.img__and__details}>
				<div className={styles.img__container}>
					<img src={defaultUser2} alt="Sender Image" />
					<span></span>
				</div>
				<div className={styles.delivery__details}>
					<div className={styles.top__line}>
						<div className={styles.sender__details}>
							<span className={styles.username}>{username}</span>
							{newUser && <span className={styles.new__user}>New user</span>}
						</div>
						<span className={styles.amount}>
							<span>{`${amount}pi`}</span> <MdKeyboardArrowRight />
						</span>
					</div>
					<div className={styles.bottom__line}>
						<div className={styles.time__and__category}>
							<span className={styles.time}>
								<HiOutlineClock className={styles.time__icon} />
								<span>24hrs Delivery</span>
							</span>
							<span className={styles.category}>
								<RiShoppingBasketLine className={styles.basket__icon} />
								<span>{category}</span>
							</span>
						</div>
						{deliveryAccepted ? (
							<button type="button" className={styles.cta__accepted}>
								Accepted
							</button>
						) : (
							<button
								type="button"
								className={styles.cta__accept}
								onClick={() => {
									moveToFront(delivery);
								}}
							>
								Accept
							</button>
						)}
					</div>
				</div>
			</div>
			<div className={styles.modes__of__delivery}>{modesOfDelivery.map((mod: any) => mod)}</div>
		</div>
	);
};
