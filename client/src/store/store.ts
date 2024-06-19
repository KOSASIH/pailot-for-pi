/* eslint-disable no-unused-vars */
import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { IUser, UserRole } from '../types/user';

interface UserDetailsState extends IUser {
	isCourier?: boolean;
	isDelivery?: boolean;
}

interface DeliveryTypeState {
	deliveryType: string;
}

export type RootState = ReturnType<typeof store.getState>;

type DeliveryDetailsType = {
	imageName: string;
	imageURL: string;
	productName: string;
	description: string;
	weight: string;
	size: string;
	category: string;
	modeOfDelivery: string[];
	courierDetails: CourierDeliveryDetails;
	receiverDetails: UserDetailsState;
	deliveryRegion: string;
	pickupLocation: string;
	dropLocation: string;
	transactionAmount?: number;
};

interface CourierDeliveryDetails extends Pick<UserCourierDetails, 'courier' | 'user'> {
	newUser: boolean;
	status: string;
}

interface CourierDetails {
	courierUserId: string;
	numberOfLikes?: number;
	rating?: number;
	isActive?: boolean;
	earnings?: number;
	modeOfTransportation: string;
	regionOfOperation: string;
	preferredDeliveryAmount: number;
	startTime: string;
	endTime: string;
}

export interface DeliveryDetailsTypeState {
	deliveryDetails: DeliveryDetailsType;
}

interface UserCourierDetailstypeState {
	userCourierDetails: UserCourierDetails;
}

type UserCourierDetails = {
	user: UserDetailsState;
	courier: CourierDetails | null;
};

interface UserAuthDetails extends UserCourierDetails {
	isCourier: boolean;
	isDelivery: boolean;
  hasMadeFirstDelivery: boolean;
}

interface CreateCourierDetails {
	createCourierDetails: CourierDetails;
}

const userData = JSON.parse(sessionStorage.getItem('user') as string);

const createCourierDetailsSlice = createSlice({
	name: 'createCourierDetails',
	initialState: {
		createCourierDetails: {
			modeOfTransportation: userData?.courier?.modeOfTransportation || '',
			regionOfOperation: userData?.courier?.regionOfOperation || '',
			startTime: userData?.courier?.startTime || '',
			endTime: userData?.courier?.endTime || '',
			preferredDeliveryAmount: userData?.courier?.preferredDeliveryAmount || 0,
			numberOfLikes: userData?.courier?.numberOfLikes || 0,
			rating: userData?.courier?.rating || 0,
			isActive: userData?.courier?.isActive || true,
			earnings: userData?.courier?.earnings || 0,
		},
	} as CreateCourierDetails,
	reducers: {
		setCreateCourierDetails: (state, action: PayloadAction<CourierDetails>) => {
			state.createCourierDetails = action.payload;
		},
		setIsActive: (state, action: PayloadAction<boolean>) => {
			state.createCourierDetails.isActive = action.payload;
		},
		setNumberOfLikes: (state, action: PayloadAction<number>) => {
			state.createCourierDetails.numberOfLikes = action.payload;
		},
		setRating: (state, action: PayloadAction<number>) => {
			state.createCourierDetails.rating = action.payload;
		},
		setEarnings: (state, action: PayloadAction<number>) => {
			state.createCourierDetails.earnings = action.payload;
		},
		setUserId: (state, action: PayloadAction<string>) => {
			state.createCourierDetails.courierUserId = action.payload;
		},
	},
});

const userDetailsSlice = createSlice({
	name: 'userDetails',
	initialState: {
		user: {
			accessToken: userData?.user.accessToken || '',
			imagePublicId:  userData?.user.imagePublicId || '',
			profileImg:  userData?.user.profileImg || '',
			userRole:  userData?.user.userRole || UserRole.USER,
			userUid:  userData?.user.userUid || '',
			username: userData?.user.username || '',
			walletAddress:  userData?.user.walletAddress || '',
		},
		courier: {
      modeOfTransportation: userData?.courier?.modeOfTransportation || '',
			regionOfOperation: userData?.courier?.regionOfOperation || '',
			startTime: userData?.courier?.startTime || '',
			endTime: userData?.courier?.endTime || '',
			preferredDeliveryAmount: userData?.courier?.preferredDeliveryAmount || 0.0,
			numberOfLikes: userData?.courier?.numberOfLikes || 0,
			rating: userData?.courier?.rating || 0.0,
			isActive: userData?.courier?.isActive || true,
			earnings: userData?.courier?.earnings || 0.0,
			courierUserId: userData?.courier?.courierUserId || '',
		},
		isCourier: userData?.courier ? true : false,
    hasMadeFirstDelivery: sessionStorage.getItem('hasMadeFirstDelivery') ? true : false,
		isDelivery: false,
	} as UserAuthDetails,
	reducers: {
		setIsCourier: (state) => {
			state.isCourier = !state.isCourier;
		},
		setHasMadeFirstDelivery: (state) => {
			state.hasMadeFirstDelivery = !state.hasMadeFirstDelivery;
		},
		setUsername: (state, action: PayloadAction<string>) => {
			state.user.username = action.payload;
		},
		setWalletAddress: (state, action: PayloadAction<string>) => {
			state.user.walletAddress = action.payload;
		},
		setProfileImg: (state, action: PayloadAction<string>) => {
			state.user.profileImg = action.payload;
		},
		setAccessToken: (state, action: PayloadAction<string>) => {
			state.user.accessToken = action.payload;
		},
		setImagePublicId: (state, action: PayloadAction<string>) => {
			state.user.imagePublicId = action.payload;
		},
		setUserId: (state, action: PayloadAction<string>) => {
			state.user.userUid = action.payload;
		},
    setUserDetails: (state, action: PayloadAction<Pick<UserCourierDetails, 'user'>>) => {
      state.user = action.payload.user;
    },
    setCourierDetails: (state, action:PayloadAction<Pick<UserCourierDetails, 'courier'>>) => {
      state.courier = action.payload.courier;
    }
	},
});

const deliveryTypeSlice = createSlice({
	name: 'deliveryType',
	initialState: {
		deliveryType: 'customized',
	} as DeliveryTypeState,
	reducers: {
		setDeliveryType: (state, action: PayloadAction<string>) => {
			state.deliveryType = action.payload;
		},
	},
});

const deliveryDetailsSlice = createSlice({
	name: 'deliveryDetails',
	initialState: {
		deliveryDetails: {
			imageName: 'file name',
			imageURL: '',
			productName: '',
			description: '',
			weight: '',
			size: '',
			category: '',
			modeOfDelivery: [''],
			courierDetails: {
				user: {
					accessToken: '',
					imagePublicId: '',
					profileImg: '',
					userRole: UserRole.USER,
					userUid: '',
					username: '',
					walletAddress: '',
				},
				courier: {
					numberOfLikes: 0,
					rating: 0.0,
					modeOfTransportation: '',
					regionOfOperation: '',
					preferredDeliveryAmount: 0.0,
					isActive: true,
					earnings: 0.0,
					courierUserId: '',
					startTime: '',
					endTime: '',
				},
				newUser: true,
				status: 'pending',
			},
			receiverDetails: {
				accessToken: '',
				imagePublicId: '',
				profileImg: '',
				userRole: UserRole.USER,
				userUid: '',
				username: '',
				walletAddress: '',
			},
			deliveryRegion: '',
			pickupLocation: '',
			dropLocation: '',
			transactionAmount: 0,
		},
	} as DeliveryDetailsTypeState,

	reducers: {
		setImageName: (state, action: PayloadAction<string>) => {
			state.deliveryDetails = { ...state.deliveryDetails, imageName: action.payload };
		},
		setImageURL: (state, action: PayloadAction<string>) => {
			state.deliveryDetails = { ...state.deliveryDetails, imageURL: action.payload };
		},
		setProductName: (state, action: PayloadAction<string>) => {
			state.deliveryDetails = { ...state.deliveryDetails, productName: action.payload };
		},
		setDescription: (state, action: PayloadAction<string>) => {
			state.deliveryDetails = { ...state.deliveryDetails, description: action.payload };
		},
		setWeight: (state, action: PayloadAction<string>) => {
			state.deliveryDetails = { ...state.deliveryDetails, weight: action.payload };
		},
		setSize: (state, action: PayloadAction<string>) => {
			state.deliveryDetails = { ...state.deliveryDetails, size: action.payload };
		},
		setCategory: (state, action: PayloadAction<string>) => {
			state.deliveryDetails = { ...state.deliveryDetails, category: action.payload };
		},
		setModeOfDelivery: (state, action: PayloadAction<string[]>) => {
			state.deliveryDetails = { ...state.deliveryDetails, modeOfDelivery: action.payload };
		},
		setCourierDetails: (state, action: PayloadAction<any>) => {
			state.deliveryDetails = { ...state.deliveryDetails, courierDetails: action.payload };
		},
		setDeliveryRegion: (state, action: PayloadAction<string>) => {
			state.deliveryDetails = { ...state.deliveryDetails, deliveryRegion: action.payload };
		},
		setReceiverDetails: (state, action: PayloadAction<UserDetailsState>) => {
			state.deliveryDetails = { ...state.deliveryDetails, receiverDetails: action.payload };
		},
		setPickupLocation: (state, action: PayloadAction<string>) => {
			state.deliveryDetails = { ...state.deliveryDetails, pickupLocation: action.payload };
		},
		setDropLocation: (state, action: PayloadAction<string>) => {
			state.deliveryDetails = { ...state.deliveryDetails, dropLocation: action.payload };
		},
		setTransactionAmount: (state, action: PayloadAction<number>) => {
			state.deliveryDetails = { ...state.deliveryDetails, transactionAmount: action.payload };
		},
	},
});

const store = configureStore({
	reducer: {
		userDetails: userDetailsSlice.reducer,
		createCourierDetails: createCourierDetailsSlice.reducer,
		deliveryType: deliveryTypeSlice.reducer,
		deliveryDetails: deliveryDetailsSlice.reducer,
	},
});

export const userDetailsActions = userDetailsSlice.actions;
export const createCourierDetailsActions = createCourierDetailsSlice.actions;
export const deliveryTypeActions = deliveryTypeSlice.actions;
export const deliveryDetailsActions = deliveryDetailsSlice.actions;

export default store;
