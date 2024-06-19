/* eslint-disable react/no-unescaped-entities */
import styles from './TermsAndConditions.module.css';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { useNavigate, useLocation } from 'react-router-dom';

export const TermsAndConditions = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.top__bar}>
					<HiOutlineArrowLeft
						onClick={() => [navigate(state ? state.path : '/', { state: state })]}
					/>
					<span>Pailot T&C</span>
				</div>
				<div className={styles.page_header}>
					<h1 className={styles.page_topic}>TERMS AND CONDITIONS</h1>
					<p className={styles.update_time}>Updated March, 2023</p>
				</div>
			</div>

			<div className={styles.article_container}>
				<div className={styles.intro}>
					<h2>1.0 Terms and Conditions of Service for Pailot users</h2>
					<p>
						Welcome to Pailot! This is a decentralized delivery service that enables global
						logistics to be decentralized, fueled by Pi cryptocurrency. These terms and conditions
						(“Terms”) govern your use of the Pailot platform, including the Pailot website, mobile
						applications, and other related services (collectively, the “Service”). By using Pailot,
						you agree to abide by these terms of service. Please read these Terms carefully before
						using the Service.
					</p>
					<h3>1.0.1 Definitions</h3>
					<p>
						In this agreement, "we", "us", and "our" refer to Pailot. "You" refers to the user of
						our decentralized delivery services. "Service" refers to the Pailot platform, including
						our mobile application, website, and any other related services.
					</p>
					<h3>1.0.2 Acceptance of Terms </h3>
					<p>
						By clicking/checking the “I AGREE TO ALLOW PAILOT CONNECT TO MY PI ACCOUNT” button/box,
						accessing the Pailot website or by utilizing the Pailot services you agree to be bound
						by these terms of service and all exhibits, order forms, and incorporated policies (the
						“agreement” or “terms of service”) or using the Service, you agree to be bound by these
						Terms. If you do not agree to these Terms, you should not access or use the Service.
						Pailot reserves the right to modify these Terms at any time without notice. Your
						continued use of the Service following any such modification constitutes your agreement
						to be bound by the modified Terms.
					</p>
					<h3>1.0.3 Eligibility</h3>
					<p>
						You must be at least 18 years of age unless otherwise authorized by the Pi Network(less
						than 18 years of age) to use the Service. By accessing or using the Service, you
						represent and warrant that you are at least 18 years old.
					</p>
					<h3>1.0.4 User Account</h3>
					<p>
						To use certain features of Pailot, you must authenticate your Pi Network account. You
						are solely responsible for maintaining the confidentiality of your Pailot account and
						for any activity that occurs under your account.
					</p>
					<h3>1.0.5 Use of the Service</h3>
					<p>
						You may only use the Service for lawful purposes and in accordance with these Terms. You
						agree not to use the Service:
					</p>
					<ol type="i" className={styles.list}>
						<li>
							In any way that violates any applicable federal, state, local, or international law or
							regulation;
						</li>
						<li>
							To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the
							Service, or which, as determined by Pailot, may harm Pailot or users of the Service,
							or expose them to liability;
						</li>
						<li>
							To impersonate or attempt to impersonate Pailot, a Pailot employee, another user, or
							any other person or entity;
						</li>
						<li>
							To engage in any activity that disrupts or interferes with the Service (or the servers
							and networks which are connected to the Service);
						</li>
						<li>
							To use any robot, spider, or other automatic device, process, or means to access the
							Service for any purpose, including monitoring or copying any of the material on the
							Service;
						</li>
						<li>
							To attempt to gain unauthorized access to, interfere with, damage, or disrupt any
							parts of the Service, the server on which the Service is stored, or any server,
							computer, or database connected to the Service.
						</li>
					</ol>
					<h3>1.0.6 User Conduct</h3>
					<p>
						You agree to use the Service in compliance with all applicable laws and regulations, and
						in a manner that does not infringe on the rights of third parties or interfere with
						their use of the Service. In particular, you agree not to:
					</p>
					<ol type="a" className={styles.list}>
						<li>
							Upload or post any material that is defamatory, obscene, pornographic, indecent,
							abusive, or otherwise objectionable;
						</li>
						<li>Use the Service to engage in any fraudulent or illegal activity;</li>
						<li>
							Upload or post any material that infringes on any patent, trademark, tradesecret,
							copyright, or other proprietary rights of any party;
						</li>
						<li>
							Upload or post any material that contains viruses, Trojan horses, worms, time- bombs,
							keystroke loggers, spyware, adware, or any other harmful programs or similar computer
							code designed to adversely affect the operation of any computer software or hardware.
						</li>
					</ol>
					<h3>1.0.7 Intellectual Property</h3>
					<p>
						The Service and its entire contents, features, and functionality (including but not
						limited to all information, software, text, displays, images, video, and audio, and the
						design, selection, and arrangement thereof) are owned by Pailot or its licensors and are
						protected by and construed in accordance with the laws of the Jurisdiction in which
						Pailot operates. You agree not to reproduce, distribute, modify, alter, create nor sell
						derivative works of our services or any content or materials contained in our services
						without our prior written permission.
					</p>
					<h3>1.0.8 Payment</h3>
					<p>
						All payments on Pailot will be made using Pi (the cryptocurrency). You are responsible
						for ensuring that you have sufficient Pi to pay for the services you require; all
						payments are non-refundable. By using our services, you agree to pay all fees and
						charges associated with your use of our services. We reserve the right to change our
						fees and charges at any time.
					</p>
					<h3>1.0.9 Delivery Services</h3>
					<p>
						Pailot is not liable for any damages or losses that may occur during the delivery
						process. We will use reasonable efforts to ensure that your package is delivered on time
						and in good condition. However, we do not guarantee delivery times or the condition of
						the package upon delivery.
					</p>
					<h3>1.1.0 Liability</h3>
					<p>
						Pailot is not responsible for any damages or losses that may occur as a result of your
						use of Pailot. We will not be liable for any direct, indirect, incidental, special, or
						consequential damages arising out of or in connection with the use or inability to use
						Pailot Services.
					</p>
					<h3>1.1.1 Indemnification</h3>
					<p>
						You agree to indemnify and hold harmless Pailot and its directors, officers, employees,
						and agents from and against any and all claims, damages, liabilities, costs, and
						expenses (including reasonable attorney's fees) arising out of or in connection with
						your use of Pailot.
					</p>
					<h3>1.1.2 Termination</h3>
					<p>
						Pailot reserves the right to terminate your account at any time without notice or
						liability. You may also terminate your account at any time by contacting us.
					</p>
					<h3>1.1.3 Modification of Terms</h3>
					<p>
						Pailot reserves the right to modify these terms and conditions of service policy at
						anytime without prior notice. Your continued use of Pailot after any modifications to
						the terms and conditions of service policy constitutes your acceptance of the modified
						terms.
					</p>
					<h3>1.1.4 Governing Law and Dispute Resolution</h3>
					<p>
						These terms and conditions of service policy shall be governed by and construed in
						accordance with the laws of the country in which Pailot operates. Any dispute arising
						out of or in connection with these terms and conditions will be resolved by arbitration
						inaccordance with the rules of the Arbitration and Conciliation act of the country in
						which Pailot operates.
					</p>
					<h3>1.1.5 Entire Agreement</h3>
					<p>
						These terms and conditions of service policy constitute the entire agreement between you
						and Pailot with respect to the use of Pailot.
					</p>
				</div>
				<div>
					<h2>2.0 TERMS OF SERVICE FOR PAILOT SENDERS</h2>
					<h3>2.0.1 Introduction</h3>
					<p>
						These Terms of Service (“Agreement”) are a legally binding agreement between
						you(“Sender”) and Pailot, a decentralized delivery service provider. By using the Pailot
						service as a Sender, you agree to be bound by this Agreement. If you do not agree to
						these terms, do not use Pailot.
					</p>
					<h3>2.0.2 Definition of each roles and associated terms</h3>
					<ul className={styles.list}>
						<li>“Pailot” means the decentralized delivery service provided by Pailot.</li>
						<li>“Sender” means any individual or entity that uses Pailot to send items</li>
						<li>
							“Recipient” means any individual or entity that receives items sent through Pailot.
						</li>
						<li>
							“Delivery” means the transportation of items by Pailot from the Sender to the
							Recipient.
						</li>
					</ul>
					<h3>2.0.3 Using Pailot</h3>
					<p>
						By using Pailot, you agree to comply with all applicable laws and regulations( you
						represent and warrant that you have the legal authority to enter into and comply with
						these terms and conditions). You also agree to comply with Pailot’s policies, as set
						forth in this Agreement and any other policies that may be posted on the Pailot website
						from time to time.
					</p>
					<h3>2.0.4 Sender’s responsibilities</h3>
					<h4>
						2.0.4.1 Sender’s Representations and Warranties. Sender represents and warrants that:
					</h4>
					<ol type="i" className={styles.list}>
						<li>Sender has the legal right to send the items through Pailot;</li>
						<li>The items do not violate any law or regulation;</li>
						<li>The items are packaged securely and appropriately for transportation;</li>
						<li>The items are not dangerous, hazardous or illegal;</li>
						<li>The items are not subject to any export control or embargo restrictions;</li>
						<li>
							Sender has provided accurate and complete information about the items, including the
							recipient's address;
						</li>
						<li>
							The items do not require any special handling or delivery instructions, unless agreed
							to in writing by Pailot.
						</li>
					</ol>
					<h4>2.0.4.2 Prohibited Items. Sender is prohibited from sending items that are:</h4>
					<ol type="i" className={styles.list}>
						<li>Illegal or prohibited by law;</li>
						<li>Dangerous or hazardous;</li>
						<li>Perishable or fragile items, unless agreed to in writing by Pailot;</li>
						<li>
							Items requiring special handling or delivery instructions, unless agreed to in writing
							by Pailot.
						</li>
					</ol>
					<h4>2.0.4.3 Packaging</h4>
					<p>
						Sender is responsible for packaging the items securely and appropriately for
						transportation. Pailot is not responsible for any damage to the items that may occur
						during transportation due to inadequate packaging.
					</p>
					<h4>2.0.4.4 Delivery</h4>
					<p>
						Pailot will attempt to deliver the items to the recipient at the address provided by the
						sender. Pailot is not responsible for any delay or failure to deliver the items due to
						circumstances beyond its control, including but not limited to natural disasters,
						weather, traffic, or other unforeseen events.
					</p>
					<h4>2.0.4.5 Liability</h4>
					<p>
						Sender agrees to indemnify, defend and hold harmless Pailot from any claims, damages,
						losses, liabilities, costs or expenses arising out of or related to Sender's use of
						Pailot, including but not limited to any claims or damages related to the items sent
						through Pailot.
					</p>
					<h3>2.0.5 Payment</h3>
					<p>
						Sender agrees to pay Pailot the applicable fee for each delivery. The fee is determined
						based on the weight and dimensions of the items, the distance traveled, and any
						additional services requested by the sender.
					</p>
					<h3>2.0.6 Disclaimer of warranties</h3>
					<p>
						Pailot makes no warranties, express or implied, regarding the Pailot service, including
						but not limited to any warranties of merchantability or fitness for a particular
						purpose.
					</p>
					<h3>2.0.7 Limitation of liability</h3>
					<p>
						Pailot shall not be liable for any indirect, incidental, special or consequential
						damages, or damages for loss of profits, revenue, data or use, incurred by Sender or any
						third party, whether in an action in contract or tort, arising from or related to
						Sender's use of the Pailot service.
					</p>
					<h3>2.0.8 Intellectual property</h3>
					<p>
						All intellectual property rights in the Pailot service (including but not limited to all
						information, software, text, displays, images, video, and audio, and the design,
						selection, and arrangement thereof) are owned by Pailot or its licensors and are
						protected, governed by and construed in accordance with the laws of the jurisdiction in
						which Pailot operates and international copyright, trademark, patent.
					</p>
					<h3>2.0.9 Governing law and Dispute Resolution</h3>
					<p>
						These terms and conditions will be governed by and construed in accordance with the laws
						of the country in which Pailot operates. Any dispute arising out of or in connection
						with these terms and conditions will be resolved by arbitration in accordance with the
						rules of the Arbitration and Conciliation act of the country in which Pailot operates.
					</p>
				</div>
				<div>
					<h2>3.0 TERMS OF SERVICE FOR COURIERS</h2>
					<h3>3.0.1 Definitions</h3>
					<ul className={styles.list}>
						<li>
							“Pailot” refers to the decentralized logistics platform built on the Pi Network.
						</li>
						<li>
							“Courier” refers to the individual or organization using Pailot to provide logistics
							services to customers.
						</li>
						<li>
							“Customer” refers to the individual or organization using Pailot to receive logistics
							services.
						</li>
						<li>
							“Service” refers to the logistics services provided by the Courier through Pailot.
						</li>
						<li>“Platform” refers to the Pailot platform.</li>
					</ul>
					<h3>3.0.2 Eligibility</h3>
					<p>
						You must be at least 18 years old and or legally authorized to provide logistics
						services in your jurisdiction in order to use Pailot as a Courier.
					</p>
					<h3>3.0.3 Independent contractor</h3>
					<p>
						As a Courier using Pailot, you are an independent contractor and not an employee or
						agent of Pailot. You are solely responsible for complying with all applicable laws and
						regulations, including tax laws and regulations, relating to your provision of logistics
						services.
					</p>
					<h3>3.0.4 Use of the platform</h3>
					<p>
						You may use the Platform to provide logistics services to Customers. You must not use
						the Platform for any other purpose.
					</p>
					<h3>3.0.5 Acceptance of orders</h3>
					<p>
						As a Courier using Pailot, you have the right to accept or reject orders for logistics
						services. You must only accept orders for logistics services that you are able to
						provide.
					</p>
					<h3>3.0.6 Service standards</h3>
					<p>
						You must provide logistics services to Customers in a professional, careful and timely
						manner.
					</p>
					<h3>3.0.7 Fees</h3>
					<p>
						You will be paid a fee for the logistics services you provide through Pailot. The fee
						will be calculated based on the price agreed upon with the Customer and a percentage
						commission payable to Pailot.
					</p>
					<h3>3.0.8 Customer service</h3>
					<p>
						As a Courier using Pailot, you are solely responsible for providing customer service to
						Customers in relation to the logistics services you provide. Pailot will not provide
						customer service on your behalf.
					</p>
					<h3>3.0.9 Ratings and Reviews</h3>
					<p>
						Customers may rate and review the logistics services provided by Couriers through
						Pailot. You acknowledge that your rating and review may be publicly visible on the
						Platform.
					</p>
					<h3>3.1.0 Confidentiality</h3>
					<p>
						You must keep all Customer information confidential and must not disclose it to any
						third party, except as required by law.
					</p>
					<h3>3.1.1 Termination</h3>
					<p>
						Pailot may terminate your access to the Platform at any time, with or without cause. You
						may terminate your use of the Platform at any time by providing written notice to Pailot
					</p>
					<h3>3.1.2 Intellectual property</h3>
					<p>
						Pailot retains all rights, title, and interest in and to the Platform and all related
						intellectual property rights.
					</p>
					<h3>3.1.3 Disclaimer of warranties</h3>
					<p>
						Pailot provides the Platform “as is” and without warranty of any kind, whether expressed
						or implied.
					</p>
					<h3>3.1.4 Limitation of liability</h3>
					<p>
						Pailot will not be liable for any damages arising from your use of the Platform or your
						provision of logistics services through the Platform.
					</p>
					<h3>3.1.5 Indemnification</h3>
					<p>
						You agree to indemnify and hold Pailot and its affiliates, directors, officers,
						employees, and agents harmless from any and all claims, damages, expenses, and
						liabilities arising from your use of the Platform or your provision of logistics
						services through the Platform.
					</p>
					<h3>3.1.6 Governing law and Dispute Resolution</h3>
					<p>
						These terms and conditions will be governed by and construed in accordance with the laws
						of the country in which Pailot operates. Any dispute arising out of or in connection
						with these terms and conditions will be resolved by arbitration in accordance with the
						rules of the Arbitration and Conciliation act of the country in which Pailot operates.
					</p>
				</div>
				<div>
					<h3>Contact Us</h3>
					<p>
						If you have any questions or concerns about these terms and conditions, contact usviaour
						email address: <a href="mailto:pailot.pr@gmail.com">pailot.pr@gmail.com</a>
					</p>
				</div>
			</div>
		</div>
	);
};
