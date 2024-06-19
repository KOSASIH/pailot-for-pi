import React from 'react';
import {
	Home,
	Settings,
	SplashScreen,
	WelcomeScreen,
	// ShareLocation,
	OnboardingCompleted,
	CustomizedDelivery,
	ActiveDelivery,
	CourierForm,
	CourierDashBoard,
  PrivacyPolicy,
  TermsAndConditions,
} from './pages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInFast } from './animations';

function App() {
	return (
		<Router>
			<AnimatePresence>
				<motion.div animate={fadeInFast}>
					<AnimatePresence>
						<Routes>
							<Route path="/" element={<SplashScreen />} />
							<Route path="/welcome" element={<WelcomeScreen />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
							{/* <Route path="/share-location" element={<ShareLocation />} /> */}
							<Route path="/onboarding-completed" element={<OnboardingCompleted />} />
							<Route path="/home" element={<Home />} />
							<Route path="/settings/*" element={<Settings />} />
							<Route path="/courier-form" element={<CourierForm />} />
							<Route path="/dashboard" element={<CourierDashBoard />} />
							<Route path="/customized-delivery" element={<CustomizedDelivery />} />
							<Route path="/active-delivery" element={<ActiveDelivery />} />
						</Routes>
					</AnimatePresence>
				</motion.div>
			</AnimatePresence>
		</Router>
	);
}

export default App;
