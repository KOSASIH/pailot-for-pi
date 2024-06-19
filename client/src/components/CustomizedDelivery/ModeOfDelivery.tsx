import styles from './ModeOfDelivery.module.css';
import React, { useState, useRef, Dispatch, SetStateAction } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IoMdArrowRoundForward } from 'react-icons/io';
import { RiEBike2Line } from 'react-icons/ri';
import { IoMdBicycle } from 'react-icons/io';
import { GiCancel } from 'react-icons/gi';
import { BiCar } from 'react-icons/bi';
import { SlPlane } from 'react-icons/sl';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { deliveryDetailsActions } from '../../store/store';

interface Props {
	setProgress: Dispatch<SetStateAction<number>>;
}

export const ModeOfDelivery: React.FC<Props> = ({ setProgress }) => {
	const [currentValue, setCurrentValue] = useState<string>();
	const [mods, setMods] = useState<any>([]);
	const regionRef = useRef<HTMLSelectElement>(null);
	const selectRef = useRef<HTMLSelectElement>(null);
	const dispatch = useDispatch();
	const deliveryDetailsSubmitHandler = () => {
		const fullMods = mods.map((mod: string) => {
			if (mod === '1') return 'Motorbike';
			if (mod === '2') return 'Car';
			if (mod === '3') return 'Bicycle';
			if (mod === '4') return 'Plane';
		});
		console.log(fullMods);
		dispatch(deliveryDetailsActions.setModeOfDelivery(fullMods));
		if (regionRef.current && regionRef.current.value) {
      dispatch(deliveryDetailsActions.setDeliveryRegion(regionRef.current.value));
    }
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
						<BiCar />
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
						<SlPlane />
						<p>Plane</p>
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
		});
		return newMod;
	};
	return (
		<div className={styles.container}>
			<div className={styles.top__bar}>
				<div>
					<IoMdArrowRoundBack
						className={styles.back}
						onClick={() => {
							setProgress(3);
						}}
					/>
				</div>
				<span>Customized Delivery</span>
				<IoMdArrowRoundForward
					onClick={() => {
						setProgress(5);
						deliveryDetailsSubmitHandler();
					}}
				/>
			</div>
			<div className={styles.progress}>
				<div className={styles.inactive__progress}></div>
				<div className={styles.inactive__progress}></div>
				<div className={styles.inactive__progress}></div>
				<div className={styles.active__progress}></div>
				<div className={styles.inactive__progress}></div>
				<div className={styles.inactive__progress}></div>
			</div>
			<div className={styles.body}>
				<p className={styles.description}>
					Tell us your preferred mode(s) of delivery and your location
				</p>
				<h4 className={styles.header}>Mode of Delivery</h4>
				<label htmlFor="Mode Of Delivery" className={styles.label}>
					<p>Choose your delivery carrier</p>
					<div className={styles.select__container}>
						{currentValue === '1' && <RiEBike2Line />}
						{currentValue === '2' && <BiCar />}
						{currentValue === '3' && <IoMdBicycle />}
						{currentValue === '4' && <SlPlane />}
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
							<option value="4">Plane</option>
						</select>
					</div>
					<span>Choose only four modes of delivery</span>
					<div className={styles.mods__container}>
						<AnimatePresence>
							{modsGenerator().map((mod: any) => {
								return mod;
							})}
						</AnimatePresence>
					</div>
				</label>

				<h4 className={styles.header}>Choose Region</h4>
				<label htmlFor="Region" className={styles.label}>
					<div className={styles.select__container}>
						<select name="Region" title="Region" ref={regionRef} className={styles.select}>
							<option value="Local Delivery">Local Delivery</option>
							<option value="Inter State">Inter State</option>
						</select>
					</div>
					<span>Choosing a region shows Pailots within that area</span>
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
					className={(!mods.length || !regionRef?.current?.value) ? styles.cta__disabled : styles.cta}
					onClick={() => {
						setProgress(5);
						deliveryDetailsSubmitHandler();
					}}
          disabled={!mods.length || !regionRef?.current?.value}
				>
					Next
				</button>
			</motion.div>
		</div>
	);
};
