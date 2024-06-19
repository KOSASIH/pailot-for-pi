import styles from './ModPopup.module.css';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { TbDrone, TbSteeringWheel } from 'react-icons/tb';
import { IoMdBicycle } from 'react-icons/io';
// eslint-disable-next-line no-unused-vars
import { RiEBike2Line, RiCarLine, RiFootprintLine, RiTruckLine } from 'react-icons/ri';
import { GiCancel } from 'react-icons/gi';
import { RootState, createCourierDetailsActions } from '../../store/store';

interface Props {
	// eslint-disable-next-line no-unused-vars
	setShowModPopup: (value: boolean) => void;
}

// eslint-disable-next-line no-unused-vars
export const ModPopup: React.FC<Props> = ({ setShowModPopup }) => {
	const [currentValue, setCurrentValue] = useState<string>();
	const [mods, setMods] = useState<any>([]);
	const dispatch = useDispatch();
	const selectRef = useRef<HTMLSelectElement>(null);
	const userCourierDetails = useSelector(
		(state: RootState) => state.userDetails.courier
	);

	const onSubmit = () => {
		const fullMods = mods.map((mod: string) => {
			if (mod === '1') return 'Motorbike';
			if (mod === '2') return 'Car';
			if (mod === '3') return 'Bicycle';
			if (mod === '4') return 'Truck';
			if (mod === '5') return 'Drone';
			if (mod === '6') return 'Foot';
			if (mod === '7') return 'Tricycle';
		});
		if (!userCourierDetails) {
      setShowModPopup(false);
      return;
    }
		dispatch(
			createCourierDetailsActions.setCreateCourierDetails({
				...userCourierDetails,
				modeOfTransportation: fullMods.join(''),
			})
		);
		setShowModPopup(false);
	};

	const modsGenerator = () => {
		const newMod = mods.map((mod: any) => {
			//Creates divs for the selected methods of delivery
			if (mod === '1') {
				return (
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{
							opacity: 0,
							x: -20,
						}}
						className={styles.mod}
						key={mod}
					>
						<RiEBike2Line />
						<p>Motorbike</p>
						<GiCancel
							onClick={() => {
								//Finds and deletes the selected mod
								const modIndex = mods.findIndex((mod: string) => mod === '1');
								mods.splice(modIndex, 1);
								setMods([...mods]);
								if (selectRef.current && mods.length === 0) {
									//resets the select tag
									selectRef.current.value = '0';
									setCurrentValue('0');
								}
							}}
						/>
					</motion.div>
				);
			}
			if (mod === '2') {
				return (
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{
							opacity: 0,
							x: -20,
						}}
						className={styles.mod}
						key={mod}
					>
						<RiCarLine />
						<p>Car</p>
						<GiCancel
							onClick={() => {
								//Finds and deletes the selected mod
								const modIndex = mods.findIndex((mod: string) => mod === '2');
								mods.splice(modIndex, 1);
								setMods([...mods]);
								if (selectRef.current && mods.length === 0) {
									//resets the select tag
									selectRef.current.value = '0';
									setCurrentValue('0');
								}
							}}
						/>
					</motion.div>
				);
			}
			if (mod === '3') {
				return (
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{
							opacity: 0,
							x: -20,
						}}
						className={styles.mod}
						key={mod}
					>
						<IoMdBicycle />
						<p>Bicycle</p>
						<GiCancel
							onClick={() => {
								//Finds and deletes the selected mod
								const modIndex = mods.findIndex((mod: string) => mod === '3');
								mods.splice(modIndex, 1);
								setMods([...mods]);
								if (selectRef.current && mods.length === 0) {
									//resets the select tag
									selectRef.current.value = '0';
									setCurrentValue('0');
								}
							}}
						/>
					</motion.div>
				);
			}
			if (mod === '4') {
				return (
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{
							opacity: 0,
							x: -20,
						}}
						className={styles.mod}
						key={mod}
					>
						<RiTruckLine />
						<p>Truck</p>
						<GiCancel
							onClick={() => {
								//Finds and deletes the selected mod
								const modIndex = mods.findIndex((mod: string) => mod === '4');
								mods.splice(modIndex, 1);
								setMods([...mods]);
								if (selectRef.current && mods.length === 0) {
									//resets the select tag
									selectRef.current.value = '0';
									setCurrentValue('0');
								}
							}}
						/>
					</motion.div>
				);
			}
			if (mod === '5') {
				return (
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{
							opacity: 0,
							x: -20,
						}}
						className={styles.mod}
						key={mod}
					>
						<TbDrone />
						<p>Drone</p>
						<GiCancel
							onClick={() => {
								//Finds and deletes the selected mod
								const modIndex = mods.findIndex((mod: string) => mod === '5');
								mods.splice(modIndex, 1);
								setMods([...mods]);
								if (selectRef.current && mods.length === 0) {
									//resets the select tag
									selectRef.current.value = '0';
									setCurrentValue('0');
								}
							}}
						/>
					</motion.div>
				);
			}
			if (mod === '6') {
				return (
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{
							opacity: 0,
							x: -20,
						}}
						className={styles.mod}
						key={mod}
					>
						<RiFootprintLine />
						<p>Foot</p>
						<GiCancel
							onClick={() => {
								//Finds and deletes the selected mod
								const modIndex = mods.findIndex((mod: string) => mod === '6');
								mods.splice(modIndex, 1);
								setMods([...mods]);
								if (selectRef.current && mods.length === 0) {
									//resets the select tag
									selectRef.current.value = '0';
									setCurrentValue('0');
								}
							}}
						/>
					</motion.div>
				);
			}
			if (mod === '7') {
				return (
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{
							opacity: 0,
							x: -20,
						}}
						className={styles.mod}
						key={mod}
					>
						<TbSteeringWheel />
						<p>Tricycle</p>
						<GiCancel
							onClick={() => {
								//Finds and deletes the selected mod
								const modIndex = mods.findIndex((mod: string) => mod === '7');
								mods.splice(modIndex, 1);
								setMods([...mods]);
								if (selectRef.current && mods.length === 0) {
									//resets the select tag
									selectRef.current.value = '0';
									setCurrentValue('0');
								}
							}}
						/>
					</motion.div>
				);
			}
		});
		return newMod;
	};
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={styles.container}
		>
			<motion.div
				initial={{
					y: '100%',
				}}
				animate={{ y: 0 }}
				transition={{
					duration: 0.5,
					type: 'tween',
				}}
				className={styles.modal}
			>
				<div className={styles.top__section}>
					<div
						className={styles.close__container}
						onClick={() => {
							setShowModPopup(false);
						}}
					>
						<IoMdClose />
					</div>
					<span className={styles.header}>Mode of Delivery</span>
				</div>
				<p className={styles.description}>
					Choose what automobile and carbon foot prints you have to use for deliveries
				</p>
				<label htmlFor="Mode Of Delivery" className={styles.label}>
					<span>Choose Delivery Mode</span>
					<div className={styles.select__container}>
						{currentValue === '1' && <RiEBike2Line />}
						{currentValue === '2' && <RiCarLine />}
						{currentValue === '3' && <IoMdBicycle />}
						{currentValue === '4' && <RiTruckLine />}
						{currentValue === '5' && <TbDrone />}
						{currentValue === '6' && <RiFootprintLine />}
						{currentValue === '7' && <TbSteeringWheel />}
						<select
							name="Mode Of Delivery"
							className={styles.select}
							ref={selectRef}
							disabled={mods.length >= 4}
							onChange={() => {
								if (selectRef.current?.value === '0') return;
								if (mods.length >= 4) return;
								// eslint-disable-next-line no-unused-vars
								let modPresent;
								mods.map((item: any) => {
									if (item === selectRef.current?.value) modPresent = true;
								});
								if (modPresent) return;
								// eslint-disable-next-line no-unused-vars
								setCurrentValue(selectRef.current?.value);

								setMods([...mods, selectRef.current?.value]);
								// modsGenerator();
							}}
						>
							<option value={'0'}>Select </option>
							<option value={'1'}>Motorbike</option>
							<option value="2">Car</option>
							<option value="3">Bicycle</option>
							<option value="4">Truck</option>
							<option value="5">Drone</option>
							<option value="6">Foot</option>
							<option value="7">Tricycle</option>
						</select>
					</div>
					<div className={styles.mods__container}>
						<AnimatePresence>
							{modsGenerator().map((mod: any) => {
								return mod;
							})}
						</AnimatePresence>
					</div>
				</label>
				<button type="button" className={styles.cta} onClick={() => onSubmit()}>
					Save
				</button>
			</motion.div>
		</motion.div>
	);
};
