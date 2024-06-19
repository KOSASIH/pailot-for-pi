import { useState, useRef } from 'react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import styles from './CourierForm.module.css';
import { useNavigate } from 'react-router-dom';
import { GiCancel } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { CourierFormMods } from '../../components/Common/CourierFormMods/CourierFormMods';
import { createCourierDetailsActions, RootState, userDetailsActions } from '../../store/store';
import { CREATE_COURIER_URL } from '../../constants/url.constants';
import { fetchWithCredentials } from '../../hooks/useApi';

export const CourierForm = () => {
	const [validated, setValidated] = useState<boolean>(false);
	const [showCourierMods, setShowCourierMods] = useState<boolean>(false);
	const [selectedMods, setSelectedMods] = useState<string[]>([]);

	const courierUserId = useSelector((state: RootState) => state.userDetails.user.userUid);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const startTimeRef = useRef<HTMLInputElement>(null);
	const endTimeRef = useRef<HTMLInputElement>(null);
	const regionRef = useRef<HTMLInputElement>(null);
	const amountRef = useRef<HTMLInputElement>(null);
	const validityChecker = () => {
		if (
			selectedMods.length === 0 ||
			regionRef.current?.value === '' ||
			amountRef.current?.value === '0' ||
			amountRef.current?.value === '' ||
			startTimeRef.current?.value === '' ||
			endTimeRef.current?.value === ''
		) {
			setValidated(false);
		}
		if (
			selectedMods.length > 0 &&
			regionRef.current?.value !== '' &&
			amountRef.current?.value !== '0' &&
			amountRef.current?.value !== '' &&
			startTimeRef.current?.value !== '' &&
			endTimeRef.current?.value !== ''
		) {
			setValidated(true);
		}
	};

	const addMods = (value: string) => {
		setSelectedMods([...selectedMods, value]);
		const array = selectedMods;
		const newArray = array.filter((item, index) => array.indexOf(item) === index);
		// setSelectedMods(newArray);
		if (newArray.length >= 4) {
			setShowCourierMods(false);
			setSelectedMods(newArray);
			console.log(newArray);
		}
	};

	const MODhandler = () => {
		return selectedMods;
	};

	const handleCreateCourier = async (courierData: any) => {
		return await fetchWithCredentials(CREATE_COURIER_URL, {
			method: 'POST',
			data: {
				...courierData,
			},
		});
	};

	const onSubmitHandler = async () => {
		if (
			!selectedMods ||
			!regionRef.current ||
			!startTimeRef.current ||
			!endTimeRef.current ||
			!amountRef.current
		)
			return;

		const courierData = {
			modeOfTransportation: selectedMods.join(','),
			regionOfOperation: regionRef.current.value,
			startTime: startTimeRef.current.value,
			endTime: endTimeRef.current.value,
			preferredDeliveryAmount: Number(amountRef.current.value),
			courierUserId,
		};
		dispatch(
			createCourierDetailsActions.setCreateCourierDetails({
				...courierData,
			})
		);
		const courier = await handleCreateCourier(courierData);
    
		sessionStorage.setItem('user', JSON.stringify(courier.data.data));
		dispatch(userDetailsActions.setUserDetails({ user: courier?.data?.data?.user }));
		dispatch(userDetailsActions.setCourierDetails({ courier: courier?.data?.data?.courier }));
		dispatch(userDetailsActions.setIsCourier());
		navigate('/home');
	};
	return (
		<div className={styles.container}>
			{showCourierMods && (
				<CourierFormMods setShowCourierMods={setShowCourierMods} addMods={addMods} />
			)}
			<div className={styles.top__bar}>
				<HiOutlineArrowLeft onClick={() => [navigate('/home')]} />
				<span>BECOME A COURIER</span>
			</div>
			<form className={styles.form}>
				<p>Fill in your Courier data</p>
				<div
					className={styles.mod}
					onClick={() => {
						setShowCourierMods(true);
					}}
				>
					<p>Mode of Transportation</p>
					<span>{MODhandler().join(', ')}</span>
					<GiCancel onClick={() => setSelectedMods([])} className={styles.cancel__icon} />
				</div>

				<label htmlFor="Region Of Operation" className={styles.label}>
					<p>Region Of Operation</p>
					<div>
						<input
							type="text"
							className={styles.input}
							ref={regionRef}
							placeholder="Yaba, Lagos"
							onChange={() => {
								validityChecker();
							}}
						/>
						<GiCancel
							onClick={() => {
								if (regionRef.current) {
									regionRef.current.value = '';
								}
							}}
						/>
					</div>
				</label>

				<div className={styles.time__of__service}>
					<label htmlFor="Start Time" className={styles.label}>
						<p>Start Time</p>
						<input
							type="time"
							name="Start Time"
							className={styles.input}
							ref={startTimeRef}
							onChange={validityChecker}
						/>
					</label>
					<label htmlFor="End Time" className={styles.label}>
						<p>End Time</p>
						<input
							type="time"
							name="End Time"
							className={styles.input}
							ref={endTimeRef}
							onChange={validityChecker}
						/>
					</label>
				</div>
				<label htmlFor="Amount In Pi" className={styles.label}>
					<p>Amount In Pi</p>
					<div>
						<input
							type="number"
							className={styles.input}
							ref={amountRef}
							placeholder="Example: 8"
							onChange={() => {
								validityChecker();
							}}
						/>
						<GiCancel
							onClick={() => {
								if (amountRef.current) {
									amountRef.current.value = '0';
								}
							}}
						/>
					</div>
				</label>
				{!validated && <button className={styles.disabled__cta}>CONFIRM</button>}
				{validated && (
					<button
						type="button"
						className={styles.cta}
						onClick={() => {
							onSubmitHandler();
						}}
					>
						CONFIRM
					</button>
				)}
			</form>
		</div>
	);
};
