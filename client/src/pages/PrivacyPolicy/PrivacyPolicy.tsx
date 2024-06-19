import styles from './PrivacyPolicy.module.css';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { useNavigate, useLocation } from 'react-router-dom';

export const PrivacyPolicy = () => {
	const navigate = useNavigate();
  const { state } = useLocation();
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.top__bar}>
					<HiOutlineArrowLeft onClick={() => [navigate(state ? state.path : '/', { state: state })]} />
					<span>Privacy and Policy</span>
				</div>
				<div className={styles.page_header}>
					<h1 className={styles.page_topic}>PAILOT PRIVACY NOTICE</h1>
					<p className={styles.update_time}>Updated March, 2023</p>
				</div>
			</div>

			<div className={styles.article_container}>
				<div className={styles.intro}>
					<p>We at Pailot respect your concerns about privacy.</p>
					<p>
						This Privacy Notice describes the types of information we collect about users, how we
						make use of the information and with whom we may share it. It also describes measures we
						take to protect these information. We also tell you how you can ask us to:
					</p>
					<ul className={styles.list}>
						<li>Access/Change the user information we preserve about you.</li>
						<li>Withdraw the consent you previously provided to us.</li>
						<li>Cease sending you certain communications and</li>
						<li>Answer questions you may have about our privacy practices.</li>
					</ul>
					<p className={styles.last_paragraph}>
						Our privacy practices may vary among the countries in which we operate to comply with
						local practices and legal requirements.
					</p>
				</div>
				<div>
					<h2>INFORMATION PAILOT COLLECTS</h2>
					<p>“User information” hereinafter refers to information gotten from the Pi SDK.</p>
					<p>
						We may collect user information such as name, contact, and payment information in
						connection with various user options such as
					</p>
					<ul className={styles.list}>
						<li>Use of Pailot Services websites and applications</li>
						<li>Shipping activities including delivery and collection of shipments</li>
						<li>Requests to track shipments</li>
						<li>Promotions and other offers</li>
					</ul>
					<p className={styles.last_paragraph}>The types of information we collect include:</p>
					<ul className={styles.list}>
						<li>
							Shipping information such as (i) Transactional information (pick-up/drop-off location,
							delivery preferences, transaction cost, item description) and data from the Pi SDK
							(ii) Signature for proof of delivery and receipt, (iii) Pailot Service’s account
							details, and (iv) information given to us to enable us access locations to which we
							provide service, as well as information given to us regarding the content of certain
							shipments
						</li>
						<li>User information used to access Pailot products and services</li>

						<li>
							The geographic location of your mobile device if you use certain features of our apps
						</li>
						<li>Payment information gotten from the Pi SDK</li>
					</ul>
					<p className={styles.last_paragraph}>
						We also receive collect information from our customers in order to perform services.
						When we pick up or deliver a shipment or provide other services, we may obtain physical
						location data. This may include data identifying the actual location using information
						such as GPS data and landmark.
					</p>
				</div>
				<div>
					<h2>HOW PAILOT USES THE INFORMATION COLLECTED</h2>
					<p>Pailot may use the information to:</p>
					<ul className={styles.list}>
						<li>Pick up, deliver, and track shipments</li>

						<li>Process and collect payments</li>
						<li>
							Provide customer support and respond to and communicate with you about your requests,
							questions, and comments
						</li>
						<li>Send you tracking updates and help you select convenient delivery options</li>
						<li>Establish and manage your Pailot account</li>
						<li>Offer you products and services that we believe may be of interest to you</li>
						<li>
							Communicate about and administer your participation in surveys, programs, special
							events, contests, prize draws, and other offers or promotions.
						</li>
						<li>Enable you interact with Pailot through its social media accounts</li>
						<li>Process claims we receive in connection with our service</li>
						<li>
							Operate, evaluate, and improve our business (including developing new products and
							services; managing our communications; determining the effectiveness of our sales,
							marketing, and advertising; analyzing and enhancing our products, services websites,
							and apps; ensuring the security of our networks and information systems; performing
							accounting, auditing, invoicing, reconciliation, and collection activities; and
							reviewing, improving and maintaining the quality of our customer services)
						</li>
						<li>
							Perform data analysis (including market and customer search and analytics, trends
							analysis and profiling, financial analysis, and anonymization of user information)
						</li>
						<li>
							Protect against, identify, and prevent fraud and other prohibited or illegal activity,
							claims, and other liabilities
						</li>
						<li>Comply with applicable legal requirements and our policies</li>
						<li>Establish, exercise, and defend legal claims</li>
						<li>Monitor and report compliance issues</li>
					</ul>
				</div>
				<div>
					<h2>INFORMATION WE SHARE</h2>
					<p>
						We do not sell or share user information, except as described in this Privacy Notice. To
						perform our collection and delivery services, we share shipping information with
						pioneers (couriers).
					</p>
					<p>We also may disclose user information about you if;</p>
					<ul className={styles.list}>
						<li>
							We are required to do so by law, regulation or legal process (such as a court order or
							subpoena)
						</li>
						<li>
							In response to requests by government agencies, such as law enforcement authorities,
							or
						</li>
						<li>
							When we believe disclosure is necessary or appropriate to prevent physical harm or
							financial loss or in connection with an investigation of suspected or actual illegal
							activity.
						</li>
						<li>
							We reserve the right to transfer any information we have about you in the event that
							we sell all or a portion of our business or assets (including the event of a
							reorganization, dissolution or liquidation).
						</li>
					</ul>
				</div>
				<div>
					<h2>YOUR OPTIONS</h2>
					<p>
						We offer you certain choices about how we communicate with you and what information we
						collect from you. In line with the choices available in “Information We Share” section,
						you may withdraw your consent or object to certain information sharing by contacting us.
						You may decide to disconnect your Pi Network account at will. Additionally, as required
						by the law you may object at any time on legitimate grounds and free of charge to the
						processing of your user information, and we will apply your preferences going forward.
					</p>
				</div>
				<div>
					<h2>ACCESS AND CORRECTIONS</h2>
					<p>Subject to applicable law you may;</p>
					<ul className={styles.list}>
						<li>
							Obtain a copy of certain user information we maintain about you or update or correct
							inaccuracies in that information through your pailot.app account or
						</li>
						<li>
							Obtain access to user information we maintain about you by contacting us. To help
							protect your privacy and maintain security, we will employ security measures (such as
							ask you to provide certain details) before granting you access to the information. In
							addition, if you believe that the user information we maintain about you is
							inaccurate, subject to applicable law you may have the right to request that we amend
							the information by contacting us.
						</li>
					</ul>
				</div>
				<div>
					<h2>DATA RETENTION</h2>
					<p>
						Your information will not be stored for longer than necessary for the purposes for which
						they were collected or as required under applicable retention policies and/or in
						accordance with applicable law. Our retention policies reflect local statute of
						limitation periods and national statutory obligations of Pailot.
					</p>
				</div>
				<div>
					<h2>DATA TRANSFERS</h2>
					<p>
						We may transfer user information we collect about you to countries other than the
						country in which the information originally was collected. Those countries may not have
						the same data protection laws as the country in which you initially provided the
						information.
					</p>
					<p>
						When we transfer your information to other countries, we will protect that information
						as described in this Privacy Notice and in accordance with applicable law. We use
						contractual protections for the transfer of user information among various jurisdictions
						(including, for instance, the European Commission’s Standard contractual clauses).
					</p>
				</div>
				<div>
					<h2>HOW WE PROTECT USER INFORMATION</h2>
					<p>
						We maintain administrative, technical and physical security designed to protect the user
						information you provide against accidental, unlawful and unauthorized destruction, loss,
						alteration, access, disclosure or use. Although we take steps to limit access to our
						facilities, information that is located on the outside of a parcel or letter may be
						visible to others.
					</p>
				</div>
				<div>
					<h2>HOW TO CONTACT US</h2>
					<p>
						If you have any questions and comments about this Privacy notice, or if you would like
						us to update information we have about you or your preferences, please contact us via
						email.
					</p>
					<p>Email us: pailot.pr@gmail.com</p>
					<p>
						You may also write us via social media;{' '}
						<a href="https://twitter.com/PailotServices" target="_blank" rel="noreferrer">
							Twitter
						</a>
						,{' '}
						<a href="https://youtube.com/@PailotServices" target="_blank" rel="noreferrer">
							YouTube
						</a>
						,{' '}
						<a href="https://facebook.com/PailotServices" target="_blank" rel="noreferrer">
							Facebook
						</a>
						,{' '}
						<a href="https://instagram.com/pailotservices" target="_blank" rel="noreferrer">
							Instagram
						</a>
						,{' '}
						<a href="https://t.me/PailotServices" target="_blank" rel="noreferrer">
							Telegram
						</a>
						,{' '}
						<a href="https://www.tiktok.com/@pailotservices" target="_blank" rel="noreferrer">
							TikTok
						</a>{' '}
						@PailotServices
					</p>
				</div>
				<div>
					<h2>UPDATES TO OUR PRIVACY NOTICE</h2>
					<p>
						This Privacy Notice may be updated periodically and without prior notice to you to
						reflect changes in our user information practices. We will post a prominent notice on
						our websites to notify you of any significant changes to our Privacy Notice and indicate
						at the top of the notice when it was most recently updated.
					</p>
				</div>
			</div>
		</div>
	);
};
