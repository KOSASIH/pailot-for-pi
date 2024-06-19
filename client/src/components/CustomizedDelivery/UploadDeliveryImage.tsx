import React, { Dispatch, SetStateAction } from 'react';
import styles from './UploadDeliveryImage.module.css';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { RiUploadCloud2Line } from 'react-icons/ri';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { deliveryDetailsActions, RootState } from '../../store/store';

interface Props {
	setProgress: Dispatch<SetStateAction<number>>;
	setUploadedImage: Dispatch<SetStateAction<File | undefined>>;
	uploadedImage: File | undefined;
}

export const UploadDeliveryImage: React.FC<Props> = ({
	setProgress,
	setUploadedImage,
	uploadedImage,
}) => {
	const deliveryType = useSelector((state: RootState) => state.deliveryType.deliveryType);
	const deliveryDetails = useSelector((state: RootState) => state.deliveryDetails.deliveryDetails);

	const [uploadedImageName, setUploadedImageName] = useState<string>(deliveryDetails.imageName);
	const [uploadedImageURL, setUploadedImageURL] = useState<string>(deliveryDetails.imageURL);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const inputRef = useRef<any>();
	const onChangeHandler = () => {
		if (inputRef.current.files && inputRef.current.files.length > 0) {
			const url = URL.createObjectURL(inputRef.current.files[0]);
			setUploadedImage(inputRef.current.files[0]);
			setUploadedImageName(inputRef.current.files[0].name);
			setUploadedImageURL(url);
			console.log(uploadedImageURL);
		}
	};
	const deliveryDetailsSubmitHandler = () => {
		if (
			!inputRef.current.files ||
			inputRef.current.files.length === 0 ||
			!uploadedImageURL ||
			!uploadedImage
		)
			return;

		dispatch(deliveryDetailsActions.setImageName(uploadedImageName));
		dispatch(deliveryDetailsActions.setImageURL(uploadedImageURL));
	};
	return (
		<div className={styles.container}>
			<div className={styles.top__bar}>
				<div>
					<IoMdArrowRoundBack
						className={styles.back}
						onClick={() => {
							if (deliveryType === 'active') {
								setProgress(1);
							} else {
								navigate('/home');
							}
						}}
					/>
				</div>
				<span>{deliveryType === 'active' ? 'Active Request' : 'Customized Delivery'}</span>
				<div className={styles.progress}>
					<div className={styles.active__progress}></div>
					<div className={styles.inactive__progress}></div>
					<div className={styles.inactive__progress}></div>
					<div className={styles.inactive__progress}></div>
					<div className={styles.inactive__progress}></div>
					<div className={styles.inactive__progress}></div>
				</div>
			</div>

			<div className={styles.body}>
				<p className={styles.description}>
					What item will you want <br /> to deliver?
				</p>
				<label htmlFor="avatar" className={styles.label}>
					Upload an Image
				</label>

				<motion.label
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{
						delay: 0.1,
						duration: 0.4,
					}}
					htmlFor="image"
					className={styles.input__container}
				>
					{inputRef?.current?.files[0] ? (
						<div className={styles.delivery__img__container}>
							<img src={uploadedImageURL} alt="Delivery Image" />
						</div>
					) : (
						<RiUploadCloud2Line className={styles.upload__icon} />
					)}
					<span>Tap the Icon to Upload</span>
					<input
						type="file"
						name="image"
						accept="image/png, image/jpeg, image/jpg"
						onChange={onChangeHandler}
						ref={inputRef}
					/>
				</motion.label>
				<span className={styles.file__name}>{uploadedImageName}</span>
			</div>
			<motion.div
				initial={{ y: 100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{
					delay: 0.3,
					duration: 0.3,
				}}
				className={styles.cta__container}
			>
				<button
					type="button"
					className={!inputRef?.current?.files[0] ? styles.cta__disabled : styles.cta}
					onClick={() => {
						if (deliveryType === 'active') {
							setProgress(3);
						} else {
							setProgress(2);
						}
						deliveryDetailsSubmitHandler();
					}}
          disabled={!inputRef?.current?.files[0]}
				>
					Next
				</button>
			</motion.div>
		</div>
	);
};
