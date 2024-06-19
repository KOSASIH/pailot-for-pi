import React, { useState, useRef, Dispatch, SetStateAction } from 'react';
import styles from './DeliveryWeightSize.module.css';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IoMdArrowRoundForward } from 'react-icons/io';
import { AiOutlineEdit } from 'react-icons/ai';
import { GiCancel } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { deliveryDetailsActions, RootState } from '../../store/store';

interface Props {
	setProgress: Dispatch<SetStateAction<number>>;
}

export const DeliveryWeightSize: React.FC<Props> = ({ setProgress }) => {
	const [weight, setWeight] = useState<string>();
	const [size, setSize] = useState<string>();

	const weightRef = useRef<HTMLInputElement>(null);
	const sizeRef = useRef<HTMLInputElement>(null);
	const weightMeasurementRef = useRef<HTMLSelectElement>(null);
	const sizeMeasurementRef = useRef<HTMLSelectElement>(null);

	const dispatch = useDispatch();
	const deliveryType = useSelector((state: RootState) => state.deliveryType.deliveryType);

	const deliveryDetailsSubmitHandler = () => {
		if (!weight || !size || !sizeRef.current?.value || !weightRef.current?.value) {
			return;
		}

		dispatch(
			deliveryDetailsActions.setWeight(
				`${weight} ${weightMeasurementRef.current?.value === '1' ? 'kg' : ''}${
					weightMeasurementRef.current?.value === '2' ? 'lbs' : ''
				}`
			)
		);
		dispatch(
			deliveryDetailsActions.setSize(
				`${size} ${sizeMeasurementRef.current?.value === '1' ? 'inches' : ''}${
					sizeMeasurementRef.current?.value === '2' ? 'cm' : ''
				}${sizeMeasurementRef.current?.value === '3' ? 'mm' : ''}`
			)
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.top__bar}>
				<div>
					<IoMdArrowRoundBack
						className={styles.back}
						onClick={() => {
							if (deliveryType === 'active') {
								setProgress(3);
							} else {
								setProgress(2);
							}
						}}
					/>
				</div>
				<span>{deliveryType === 'active' ? 'Active Request' : 'Customized Delivery'}</span>

				<IoMdArrowRoundForward
					onClick={() => {
						if (deliveryType === 'active') {
							setProgress(5);
						} else {
							setProgress(4);
						}
						deliveryDetailsSubmitHandler();
					}}
				/>
			</div>
			<div className={styles.progress}>
				<div className={styles.inactive__progress}></div>
				<div className={styles.inactive__progress}></div>
				<div className={styles.active__progress}></div>
				<div className={styles.inactive__progress}></div>
				<div className={styles.inactive__progress}></div>
				<div className={styles.inactive__progress}></div>
			</div>
			<div className={styles.body}>
				<p className={styles.description}>
					Scaling your delivery for better delivery service experience{' '}
				</p>

				<h4 className={styles.header}>Weight and Size</h4>

				<label htmlFor="Weight" className={styles.label}>
					<p>Weight</p>
					<div>
						<motion.div
							initial={{ x: '-100vw', opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.1,
								duration: 0.5,
								type: 'tween',
							}}
							className={styles.input__container}
						>
							<input
								type="number"
								ref={weightRef}
								name="Weight"
								id=""
								placeholder="Example: 2"
                inputMode="numeric"
								onChange={(e) => {
									setWeight(e.target.value);
								}}
							/>
							<GiCancel
								onClick={() => {
									if (weightRef.current) {
										weightRef.current.value = '0';
									}
								}}
							/>
						</motion.div>
						<motion.select
							initial={{ x: '100vw', opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.1,
								duration: 0.5,
								type: 'tween',
							}}
							ref={weightMeasurementRef}
							name="Weight"
							id=""
							className={styles.select}
						>
							<option value={1}>kilogram (Kg)</option>
							<option value={2}>Pounds (Lb)</option>
						</motion.select>
						<AiOutlineEdit className={styles.edit__icon} />
					</div>
					<span>Weight should be entered in digits</span>
				</label>
				<label htmlFor="Size" className={styles.label}>
					<p>Size</p>
					<div>
						<motion.div
							initial={{ x: '-100vw', opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.2,
								duration: 0.5,
								type: 'tween',
							}}
							className={styles.input__container}
						>
							<input
								type="number"
								ref={sizeRef}
								name="Size"
								id=""
								placeholder="Example: 2"
                inputMode="numeric"
								onChange={(e) => {
									setSize(e.target.value);
								}}
							/>
							<GiCancel
								onClick={() => {
									if (weightRef.current) {
										weightRef.current.value = '0';
									}
								}}
							/>
						</motion.div>
						<motion.select
							initial={{ x: '100vw', opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.2,
								duration: 0.5,
								type: 'tween',
							}}
							name="Size"
							id=""
							ref={sizeMeasurementRef}
							className={styles.select}
						>
							<option value={1}>inches</option>
							<option value={2}>cm</option>
							<option value={3}>mm</option>
						</motion.select>
						<AiOutlineEdit className={styles.edit__icon} />
					</div>
					<span>Size should be entered in digits</span>
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
					className={(!weight || !size) ? styles.cta__disabled : styles.cta}
					onClick={() => {
						if (deliveryType === 'active') {
							setProgress(5);
						} else {
							setProgress(4);
						}
						deliveryDetailsSubmitHandler();
					}}
          disabled={(!weight || !size)}
				>
					Next
				</button>
			</motion.div>
		</div>
	);
};
