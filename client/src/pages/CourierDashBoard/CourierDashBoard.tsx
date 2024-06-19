import styles from './CourierDashBoard.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FooterNavBar } from '../../components';
import { defaultUser } from '../../assets/images';
import { FaStar } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
// eslint-disable-next-line no-unused-vars
import { TbDrone, TbSteeringWheel } from 'react-icons/tb';
import { IoMdBicycle } from 'react-icons/io';
// eslint-disable-next-line no-unused-vars
import { RiEBike2Line, RiCarLine, RiFootprintLine, RiTruckLine } from 'react-icons/ri';
import { piSymbol } from '../../assets/icons';
import { PricingPopup } from '../../components/DashBoardPopups/PricingPopup';
import { ModPopup } from '../../components/DashBoardPopups/ModPopup';
import { RootState } from '../../store/store';

export const CourierDashBoard = () => {
	const [showPricingPopup, setShowPricingPopup] = useState<boolean>(false);
	const [showModPopup, setShowModPopup] = useState<boolean>(false);
	const navigate = useNavigate();
	//From userDetails
	const isCourier = useSelector((state: RootState) => state.userDetails.isCourier);
	const username = useSelector((state: RootState) => state.userDetails.user.username);
	//From userCourierDetails
	const userCourierDetails = useSelector(
		(state: RootState) => state.userDetails.courier
	);
	const isActive = useSelector((state: RootState) => state.userDetails.courier?.isActive);
	const profileImg = useSelector((state: RootState) => state.userDetails.user.profileImg);
	const rating = useSelector((state: RootState) => state.userDetails.courier?.rating);
	const earnings = useSelector((state: RootState) => state.userDetails.courier?.earnings);
	const successfulDeliveries = '25%';
	const positiveFeedback = '18%';
	const negativeFeedback = '9%';

	useEffect(() => {
		if (!isCourier) navigate('/home');
	}, [isCourier]);

	const endTimeHandler = () => {
		if (!userCourierDetails?.endTime) return '00:00';
		const endTime = userCourierDetails.endTime;
		const time = endTime.split(':');
		time[0] = `${+time[0] - 12}`;
		const finalTime = time.join(':');
		return finalTime;
	};

	const modsGenerator = () => {
		const mods = userCourierDetails?.modeOfTransportation.split(',').map((mod: any, i: number) => {
			if (mod === 'Foot') {
				return (
					<div className={`${styles.mod} ${styles.foot}`} key={i}>
						<RiFootprintLine className={styles.mod__icon} />
					</div>
				);
			}
			if (mod === 'Drone') {
				return (
					<div className={`${styles.mod} ${styles.foot}`} key={i}>
						<TbDrone className={styles.mod__icon} />
					</div>
				);
			}
			if (mod === 'Bicycle') {
				return (
					<div className={`${styles.mod} ${styles.foot}`} key={i}>
						<IoMdBicycle className={styles.mod__icon} />
					</div>
				);
			}
			if (mod === 'Motorbike') {
				return (
					<div className={`${styles.mod} ${styles.foot}`} key={i}>
						<RiEBike2Line className={styles.mod__icon} />
					</div>
				);
			}
			if (mod === 'Car') {
				return (
					<div className={`${styles.mod} ${styles.foot}`} key={i}>
						<RiCarLine className={styles.mod__icon} />
					</div>
				);
			}
			if (mod === 'Tricycle') {
				return (
					<div className={`${styles.mod} ${styles.foot}`} key={i}>
						<TbSteeringWheel className={styles.mod__icon} />
					</div>
				);
			}
			if (mod === 'Truck') {
				return (
					<div className={`${styles.mod} ${styles.foot}`} key={i}>
						<RiTruckLine className={styles.mod__icon} />
					</div>
				);
			}
		});
		return mods;
	};

	return (
		<div className={styles.container}>
			<AnimatePresence>
				{showPricingPopup && <PricingPopup setShowPricingPopup={setShowPricingPopup} />}
				{showModPopup && <ModPopup setShowModPopup={setShowModPopup} />}
			</AnimatePresence>
			<div className={styles.top__bar}>
				<motion.div initial={{ x: 26 }} animate={{ x: 0 }} onClick={() => navigate('/settings')}>
					<span>Dashboard</span>
				</motion.div>
			</div>
			<div className={styles.body}>
				<motion.section
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					className={styles.profile__and__rating}
				>
					<div className={styles.profile}>
						<p>{`Hi, @${username}`}</p>
						<div className={styles.image__and__status}>
							<img src={profileImg ? profileImg : defaultUser} alt="Profile Picture" />
							{isActive ? (
								<div className={styles.online}>
									<span className={styles.text}>Online</span>
									<span></span>
								</div>
							) : (
								<div className={styles.offline}>
									<span></span>
									<span className={styles.text}>Offline</span>
								</div>
							)}
						</div>
					</div>
					<div className={styles.rating}>
						{Array(rating)
							.fill(true)
							.map((_, i) => {
								return <FaStar className={styles.bright__star} key={i} />;
							})}
						{Array(5 - (rating ?? 0))
							.fill(true)
							.map((_, i) => {
								return <FaStar className={styles.dark__star} key={i} />;
							})}
					</div>
				</motion.section>
				<section className={styles.delivery__status}>
					<motion.h5
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							delay: 0.2,
						}}
					>
						Delivery Status
					</motion.h5>
					<div className={styles.carousel__container}>
						<div className={styles.carousel}>
							<motion.div
								initial={{ x: 50, opacity: 0 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{
									delay: 0.3,
									type: 'tween',
								}}
								className={styles.item}
								onClick={() => {
									setShowPricingPopup(true);
								}}
							>
								<p className={styles.header}>
									<span>Your Pricing</span> <AiOutlineEdit className={styles.edit__icons} />
								</p>
								<div className={styles.value}>
									<p>{`${userCourierDetails?.preferredDeliveryAmount}pi`}</p>
									<span className={styles.sub__value}>per trip</span>
								</div>
								<span className={styles.description}>
									What you charge for a single trip delivery
								</span>
							</motion.div>

							<motion.div
								initial={{ x: 50, opacity: 0 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{
									delay: 0.4,
									type: 'tween',
								}}
								onClick={() => {
									setShowModPopup(true);
								}}
								className={styles.item}
							>
								<p className={styles.header}>
									<span>Mode Of Delivery</span> <AiOutlineEdit className={styles.edit__icons} />
								</p>
								<div className={styles.mod__value}>
									{modsGenerator()?.map((mod: any) => {
										return mod;
									})}
								</div>
								<span className={styles.description}>
									What you charge for a single trip delivery
								</span>
							</motion.div>
							<motion.div
								initial={{ x: 50, opacity: 0 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{
									delay: 0.5,
									type: 'tween',
								}}
								className={`${styles.item} ${styles.delivery__areas}`}
							>
								<p className={styles.header}>
									Delivery Areas <AiOutlineEdit className={styles.edit__icons} />
								</p>
								<div className={styles.value}>
									<p>{userCourierDetails?.regionOfOperation.trim().split(',')[1]}</p>
									<span className={styles.sub__value}>
										{userCourierDetails?.regionOfOperation.trim().split(',')[0]}
									</span>
								</div>
								<span className={styles.description}>Delivery Routes</span>
							</motion.div>
							<motion.div
								initial={{ x: 50, opacity: 0 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{
									delay: 0.6,
									type: 'tween',
								}}
								className={`${styles.item} ${styles.working__hours}`}
							>
								<p className={styles.header}>
									Working Hours <AiOutlineEdit className={styles.edit__icons} />
								</p>
								<div className={styles.value}>
									{' '}
									<p>{`${userCourierDetails?.startTime}am - ${endTimeHandler()}pm`}</p>
									<span className={styles.sub__value}>Time Zone: GMT</span>
								</div>
								<span className={styles.description}>Most active time when delivery</span>
							</motion.div>
						</div>
					</div>
				</section>
				<section className={styles.analytics__container}>
					<div className={styles.analytics__header}>
						<h5>Analytics</h5>
						<h6>
							Monthly
							<div></div>
						</h6>
					</div>
					<div className={styles.analytics}>
						<motion.div
							initial={{ scale: 0, opacity: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								delay: 0.7,
							}}
							className={styles.data}
						>
							<p className={styles.count}>0</p>
							<div>
								<div className={styles.progress__bar}>
									<div className={styles.progress__thumb}></div>
								</div>
								<span className={styles.percentage}>{successfulDeliveries}</span>
							</div>
							<span className={styles.description}>Successful Deliveries </span>
						</motion.div>
						<motion.div
							initial={{ scale: 0, opacity: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								delay: 0.8,
							}}
							className={styles.data}
						>
							<p className={styles.count}>0</p>
							<div>
								<div className={styles.progress__bar}>
									<div className={styles.progress__thumb}></div>
								</div>
								<span className={styles.percentage}>{positiveFeedback}</span>
							</div>
							<span className={styles.description}>Positive Feedback</span>
						</motion.div>
						<motion.div
							initial={{ scale: 0, opacity: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								delay: 0.9,
							}}
							className={styles.data}
						>
							<p className={styles.count}>0</p>
							<div>
								<div className={styles.progress__bar}>
									<div className={styles.progress__thumb}></div>
								</div>
								<span className={styles.percentage}>{negativeFeedback}</span>
							</div>
							<span className={styles.description}>Negative Feedback</span>
						</motion.div>
					</div>
				</section>
				<section className={styles.earnings}>
					<h5 className={styles.earnings__header}>Earnings</h5>
					<div className={styles.total__earning}>
						<div className={styles.total__earnings__header}>
							<h6>Total Pi Earning</h6>
							<span className={styles.pi__earning}>
								<img src={piSymbol} alt="Pi" />
								<span>{earnings}</span>
							</span>
						</div>
						<motion.div
							initial={{ y: 50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{
								delay: 1,
							}}
							className={styles.total__earnings__body}
						>
							<div className={styles.month__and__value}>
								<label htmlFor="month" className={styles.label}>
									Earnings in{' '}
									<select name="month">
										<option value="January">January</option>
										<option value="February">February</option>
										<option value="March">March</option>
										<option value="April">April</option>
										<option value="May">May</option>
										<option value="June">June</option>
										<option value="July">July</option>
										<option value="August">August</option>
										<option value="September">September</option>
										<option value="October">October</option>
										<option value="November">November</option>
										<option value="December">December</option>
									</select>
								</label>
								<p>
									<img src={piSymbol} alt="Pi" />0
								</p>
							</div>
							<div className={styles.chart}>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<span>+0%</span>
							</div>
						</motion.div>
					</div>
					<div className={styles.history}>
						<div>
							<label htmlFor="month" className={styles.label}>
								History{' '}
								<select name="month">
									<option value="January">January</option>
									<option value="February">February</option>
									<option value="March">March</option>
									<option value="April">April</option>
									<option value="May">May</option>
									<option value="June">June</option>
									<option value="July">July</option>
									<option value="August">August</option>
									<option value="September">September</option>
									<option value="October">October</option>
									<option value="November">November</option>
									<option value="December">December</option>
								</select>
							</label>
							<span className={styles.view__all}>View All</span>
						</div>
						<motion.div
							initial={{ y: 50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{
								delay: 1.1,
							}}
							className={styles.history__body}
						>
							<div className={styles.top}>
								<img src={piSymbol} alt="Pi" />
								<span>0</span>
							</div>

							<div className={styles.bottom}>
								<div className={styles.location}>
									<span>Location</span>
									<span>{userCourierDetails?.regionOfOperation}</span>
								</div>

								<div className={styles.date__and__time}>
									<span>Date/Time</span>
									<span>03 Feb {`${userCourierDetails?.startTime}am - ${endTimeHandler()}pm`}</span>
								</div>
							</div>
						</motion.div>
					</div>
				</section>
			</div>
			<FooterNavBar active="dashboard" />
		</div>
	);
};
