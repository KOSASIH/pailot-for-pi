import { useState } from 'react';
import { ScreenOne, ScreenTwo } from '../../components';
import {SplashScreenState} from '../../types/SplashScreenState'
export const SplashScreen = () => {
	const [next_screen, setNext_screen] = useState<SplashScreenState>('first_screen');

	return (
		<>
			{next_screen == 'first_screen' && <ScreenOne setNext_screen={setNext_screen} />}
			{next_screen == 'progress_bar' && <ScreenTwo />}
		</>
	);
};
