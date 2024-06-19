import styles from './CourierFormMods.module.css';
import { TbDrone, TbSteeringWheel } from 'react-icons/tb';
import { IoMdBicycle } from 'react-icons/io';
import { RiEBike2Line, RiCarLine, RiFootprintLine, RiTruckLine } from 'react-icons/ri';
import React, { useRef, useState } from 'react';

interface Props {
	// eslint-disable-next-line no-unused-vars
	setShowCourierMods: (value: boolean) => void;
	// eslint-disable-next-line no-unused-vars
	addMods: (value: string) => void;
}

export const CourierFormMods: React.FC<Props> = ({ setShowCourierMods, addMods }) => {
	const [foot, setFoot] = useState<boolean>(false);
	const [drone, setDrone] = useState<boolean>(false);
	const [bicycle, setBicycle] = useState<boolean>(false);
	const [motorbike, setMotorbike] = useState<boolean>(false);
	const [car, setCar] = useState<boolean>(false);
	const [tricycle, setTricycle] = useState<boolean>(false);
	const [truck, setTruck] = useState<boolean>(false);
	// const [modCount, setModCount] = useState<number>(0);
	const footRef = useRef<HTMLInputElement>(null);
	const bicycleRef = useRef<HTMLInputElement>(null);
	const motorbikeRef = useRef<HTMLInputElement>(null);
	const carRef = useRef<HTMLInputElement>(null);
	const tricycleRef = useRef<HTMLInputElement>(null);
	const truckRef = useRef<HTMLInputElement>(null);

	return (
		<div className={styles.container}>
			<div className={styles.modal}>
				<label htmlFor="Foot" className={`${styles.label} ${foot && styles.active__label}`}>
					<input
						type="checkbox"
						name="Foot"
						ref={footRef}
						className={styles.input}
						onClick={() => {
							setFoot(true);
							addMods('Foot');
						}}
					/>
					<RiFootprintLine />
					<p>Foot</p>
				</label>
				<label htmlFor="Drone" className={`${styles.label} ${drone && styles.active__label}`}>
					<input
						type="checkbox"
						name="Foot"
						ref={footRef}
						className={styles.input}
						onClick={() => {
							setDrone(true);
							addMods('Drone');
						}}
					/>
					<TbDrone />
					<p>Drone</p>
				</label>
				<label htmlFor="Bicycle" className={`${styles.label} ${bicycle && styles.active__label}`}>
					<input
						type="checkbox"
						name="Bicycle"
						ref={bicycleRef}
						className={styles.input}
						onClick={() => {
							setBicycle(true);
							addMods('Bicycle');
						}}
					/>
					<IoMdBicycle />
					<p>Bicycle</p>
				</label>
				<label
					htmlFor="Motorbike"
					className={`${styles.label} ${motorbike && styles.active__label}`}
				>
					<input
						type="checkbox"
						name="Motorbike"
						ref={motorbikeRef}
						className={styles.input}
						onClick={() => {
							setMotorbike(true);
							addMods('Motorbike');
						}}
					/>
					<RiEBike2Line />
					<p>Motorbike</p>
				</label>
				<label htmlFor="Car" className={`${styles.label} ${car && styles.active__label}`}>
					<input
						type="checkbox"
						name="Car"
						ref={carRef}
						className={styles.input}
						onClick={() => {
							setCar(true);
							addMods('Car');
						}}
					/>
					<RiCarLine />
					<p>Car</p>
				</label>
				<label htmlFor="Tricycle" className={`${styles.label} ${tricycle && styles.active__label}`}>
					<input
						type="checkbox"
						name="Tricycle"
						ref={tricycleRef}
						className={styles.input}
						onClick={() => {
							setTricycle(true);
							addMods('Tricycle');
						}}
					/>
					<TbSteeringWheel />
					<p>Tricycle</p>
				</label>
				<label htmlFor="Truck" className={`${styles.label} ${truck && styles.active__label}`}>
					<input
						type="checkbox"
						name="Truck"
						ref={truckRef}
						checked={truck}
						className={styles.input}
						onClick={() => {
							setTruck(true);
							addMods('Truck');
						}}
					/>
					<RiTruckLine />
					<p>Truck</p>
				</label>
			</div>
			<div className={styles.backdrop} onClick={() => setShowCourierMods(false)}></div>
		</div>
	);
};
