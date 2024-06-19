import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Header.module.css';
interface Props {
	left_icon: string;
	right_icon: string;
	left_route_location: string;
	right_route_location: string;
	title: string;
}

export const Header = ({
	left_icon,
	right_icon,
	left_route_location,
	right_route_location,
	title,
}: Props) => {
	const navigate = useNavigate();

  const handleNavigation = () => {
    if (title === 'Settings') {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      navigate('/welcome');
    } else {
      navigate(right_route_location);
    }
  }
	return (
		<div id={styles.wrapper}>
			<div>
				<div className={styles.image_wrapper} onClick={() => navigate(left_route_location)}>
					<img src={left_icon} className={styles.image_size} alt="left icon" />
				</div>
				<span className={styles.title}>{title}</span>
			</div>
			<div>
				<img
					src={right_icon}
					alt="right icon"
					className={styles.right__icon}
					onClick={handleNavigation}
				/>
			</div>
		</div>
	);
};
