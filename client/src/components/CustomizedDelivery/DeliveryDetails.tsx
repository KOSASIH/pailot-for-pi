import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './DeliveryDetails.module.css';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IoMdArrowRoundForward } from 'react-icons/io';
import { GiCancel } from 'react-icons/gi';
import { AiOutlineEdit } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { deliveryDetailsActions, RootState } from '../../store/store';

interface Props {
	setProgress: Dispatch<SetStateAction<number>>;
}

export const DeliveryDetails: React.FC<Props> = ({ setProgress }) => {
	const deliveryType = useSelector((state: RootState) => state.deliveryType.deliveryType);
	const deliveryDetails = useSelector((state: RootState) => state.deliveryDetails.deliveryDetails);

	const [productName, setProductName] = useState<string>(deliveryDetails.productName);
	const [description, setDescription] = useState<string>(deliveryDetails.description);
	const [category, setCategory] = useState<string>('');

	const dispatch = useDispatch();

	const deliveryDetailsSubmitHandler = () => {
		dispatch(deliveryDetailsActions.setProductName(productName));
		dispatch(deliveryDetailsActions.setDescription(description));
		dispatch(deliveryDetailsActions.setCategory(category));
	};
	return (
		<div className={styles.container}>
			<div className={styles.top__bar}>
				<div>
					<IoMdArrowRoundBack
						className={styles.back}
						onClick={() => {
							if (deliveryType === 'active') {
								setProgress(2);
							} else {
								setProgress(1);
							}
						}}
					/>
				</div>
				<span>{deliveryType === 'active' ? 'Active Request' : 'Customized Delivery'}</span>
				<IoMdArrowRoundForward
					onClick={() => {
						if (deliveryType === 'active') {
							setProgress(4);
						} else {
							setProgress(3);
						}
						deliveryDetailsSubmitHandler();
					}}
				/>
			</div>
			<div className={styles.progress}>
				<div className={styles.inactive__progress}></div>
				<div className={styles.active__progress}></div>
				<div className={styles.inactive__progress}></div>
				<div className={styles.inactive__progress}></div>
				<div className={styles.inactive__progress}></div>
				<div className={styles.inactive__progress}></div>
			</div>
			<div className={styles.body}>
				<p className={styles.description}>
					Tell Pailot how well to manage your delivery with just few details
				</p>
				<h4 className={styles.header}>Product or Item Details</h4>
				<label htmlFor="Product Name" className={styles.label}>
					<p>Product or Service Name</p>
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
								type="text"
								name="Product Name"
								placeholder="Example: Tesla Model Pi 3"
								onChange={(e) => {
									setProductName(e.target.value);
								}}
							/>
							<GiCancel />
						</motion.div>
						<AiOutlineEdit />
					</div>
					<span>Be very accurate about your product or service </span>
				</label>

				<label htmlFor="Description" className={styles.label}>
					<p>Description</p>
					<div>
						<motion.textarea
							initial={{ x: '-100vw', opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.2,
								duration: 0.5,
								type: 'tween',
							}}
							name="Description"
							className={styles.textarea}
							// cols={30}
							rows={10}
							placeholder="Example: Samsung Ultra 23 Gold"
							onChange={(e) => {
								setDescription(e.target.value);
							}}
						/>
						<AiOutlineEdit />
					</div>
				</label>

				<h4 className={styles.header}>Product Type</h4>
				<label className={styles.label} htmlFor="Category">
					<p>Category</p>
					<div>
						<motion.select
							initial={{ x: '-100vw', opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.3,
								duration: 0.5,
								type: 'tween',
							}}
							name="Category"
							value={category}
							className={styles.select}
							onChange={(e) => setCategory(e.target.value)}
						>
              <option value="">--Select category--</option>
							<option value="Phone and Computers">Phones and Computers</option>
							<option value="Food delivery">Food delivery</option>
							<option value="Electronics">Electronics</option>
							<option value="Groceries">Groceries</option>
							<option value="Furnitures">Furnitures</option>
							<option value="Fashion">Fashion</option>
							<option value="Baby products">Baby products</option>
							<option value="Automobile">Automobile</option>
							<option value="Others">Others</option>
						</motion.select>
						<AiOutlineEdit />
					</div>
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
					className={(!productName || !description || !category) ? styles.cta__disabled : styles.cta}
					disabled={(!productName || !description || !category)}
					onClick={() => {
						if (deliveryType === 'active') {
							setProgress(4);
						} else {
							setProgress(3);
						}
						deliveryDetailsSubmitHandler();
					}}
				>
					Next
				</button>
			</motion.div>
		</div>
	);
};
