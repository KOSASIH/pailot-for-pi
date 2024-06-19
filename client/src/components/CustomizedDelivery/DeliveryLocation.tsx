import styles from './DeliveryLocation.module.css';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
// import { RiEBike2Line } from 'react-icons/ri';
import { GiCancel } from 'react-icons/gi';
import { MdOutlineClose } from 'react-icons/md';
import { BsCheckLg } from 'react-icons/bs';
// import { TbSpeedboat } from 'react-icons/tb';
// import { SlPlane } from 'react-icons/sl';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import { LocationModal } from './LocationModal';
// import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deliveryDetailsActions, RootState } from '../../store/store';
import { GET_USER_BY_USERNAME_URL } from '../../constants/url.constants';
import { fetchWithCredentials } from '../../hooks/useApi';
import { IUser } from '../../types/user';
import { useLocation } from 'react-router-dom';

interface Props {
	setProgress: Dispatch<SetStateAction<number>>;
}

export const DeliveryLocation: React.FC<Props> = ({ setProgress }) => {
	const deliveryType = useSelector((state: RootState) => state.deliveryType.deliveryType);
	const deliveryDetails = useSelector((state: RootState) => state.deliveryDetails.deliveryDetails);
  const { state } = useLocation();

	const [loadingState, setLoadingState] = useState<'error' | 'loading' | 'success'>('error');
	const [showModal, setShowModal] = useState<boolean>(state ? state.showModal : false);
	const [pickupLocation, setPickupLocation] = useState<string>(deliveryDetails.pickupLocation);
	const [dropLocation, setDropLocation] = useState<string>(deliveryDetails.dropLocation);
	const [receiverUserName, setReceiverUserName] = useState<string>(
		deliveryDetails.receiverDetails.username
	);
	const [receiverUser, setReceiverUser] = useState<IUser>(deliveryDetails.receiverDetails);
	const dispatch = useDispatch();
	const closeModal = () => {
		setShowModal(false);
	};
	const deliveryDetailsSubmitHandler = () => {
		dispatch(deliveryDetailsActions.setPickupLocation(pickupLocation));
		dispatch(deliveryDetailsActions.setDropLocation(dropLocation));
		dispatch(deliveryDetailsActions.setReceiverDetails(receiverUser));

		closeModal();
	};

	// Store the debounced function across renders
	const debouncedSearch = React.useRef(
		debounce((criteria: string) => {
      handleGetReceiverByUsername(criteria);
		}, 500)
    ).current;

    // Cancel the debouncing function on unmount
	React.useEffect(() => {
    return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiverUserName(e.target.value);
		debouncedSearch(e.target.value);
	};

	const handleGetReceiverByUsername = async (receiverUserName: string) => {
    setLoadingState('loading');
    try {
      const user = await fetchWithCredentials(GET_USER_BY_USERNAME_URL(receiverUserName), {
        method: 'GET',
      });
      if (user?.data?.data.username === receiverUserName) {
        setReceiverUser(user.data.data);
        setLoadingState('success');
      } else {
        setLoadingState('error');
      }
    } catch (error) {
      setLoadingState('error');
    }
	};

	return (
		<div className={styles.container}>
			<div className={styles.top__bar}>
				<div>
					<IoMdArrowRoundBack
						className={styles.back}
						onClick={() => {
							setProgress(4);
						}}
					/>
				</div>
				<span>{deliveryType === 'active' ? 'Active Request' : 'Customized Delivery'}</span>

				<IoMdArrowRoundForward
					onClick={() => {
						setShowModal(true);
					}}
				/>
			</div>
			<div className={styles.progress}>
				<div className={styles.inactive__progress}></div>
				<div className={styles.inactive__progress}></div>
				<div className={styles.inactive__progress}></div>
				<div className={styles.inactive__progress}></div>
				<div className={styles.active__progress}></div>
				<div className={styles.inactive__progress}></div>
			</div>
			<div className={styles.body}>
				<p className={styles.description}>
					Scaling your delivery for better delivery service experience{' '}
				</p>
				<h4 className={styles.header}>Give a Location</h4>

				<label htmlFor="Pickup Location" className={styles.label}>
					<p>Pickup Location</p>
					<div className={styles.input__container}>
						<input
							type="text"
							name="Pickup Location"
							value={pickupLocation}
							placeholder="Your Location"
							onChange={(e) => {
								setPickupLocation(e.target.value);
							}}
						/>
					</div>
					<span>Sender or Merchant Location</span>
				</label>
				<label htmlFor="Receiver Location" className={styles.label}>
					<p>Drop Location</p>
					<div className={styles.input__container}>
						<input
							type="text"
							name="Receiver Location"
							placeholder="Receiver Location"
							value={dropLocation}
							onChange={(e) => {
								setDropLocation(e.target.value);
							}}
						/>
					</div>
					<span>Person(s) to receive delivery</span>
				</label>

				<h4 className={styles.header}>Confirm Reciever</h4>

				<label htmlFor="Receiver Pi Username" className={styles.label}>
					<p>Receiver Pi Username</p>
					<div className={styles.div}>
						<div className={styles.input__container}>
							<input
								type="text"
								name="Receiver Pi Username"
								placeholder="Receiver Pi Username"
								value={receiverUserName}
								onChange={(e) => {
									handleChange(e);
								}}
							/>
							<GiCancel
								onClick={() => {
									setReceiverUserName('');
								}}
							/>
						</div>
						<div className={styles.loading__state__container}>
							{loadingState === 'loading' && <div className={styles.loading__spinner}></div>}
							{loadingState === 'error' && <MdOutlineClose color="rgba(255, 5, 5, 1)" />}
							{loadingState === 'success' && <BsCheckLg color="rgba(2, 205, 22, 1)" />}
						</div>
					</div>
					<span>Person to receive delivery</span>
				</label>
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
					className={
						!receiverUser.username || !pickupLocation || !dropLocation
							? styles.cta__disabled
							: styles.cta
					}
					onClick={() => {
						setShowModal(true);
					}}
					disabled={!receiverUser.username || !pickupLocation || !dropLocation}
				>
					Next
				</button>
			</motion.div>
			{showModal && (
				<LocationModal
					setProgress={setProgress}
					closeModal={closeModal}
					deliveryDetailsSubmitHandler={deliveryDetailsSubmitHandler}
				/>
			)}
		</div>
	);
};
