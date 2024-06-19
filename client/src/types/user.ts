/* eslint-disable no-unused-vars */
export interface IUser {
	userUid: string;
	username: string;
	walletAddress: string | null;
	profileImg: string | null;
	accessToken: string;
	imagePublicId: string | null;
	userRole?: UserRole;
}

export interface ICourier {
	courierUserId: string;
	numberOfLikes: number;
	rating: number;
	modeOfTransportation: string;
	regionOfOperation: string;
	preferredDeliveryAmount: number;
	isActive: boolean;
	earnings: number;
	startTime?: string;
	endTime?: string;
}

export enum UserRole {
	USER = 1,
	COURIER = 2,
}

export interface UpdateCourierDTO {
	modeOfTransportation?: string;
	regionOfOperation?: string;
	preferredDeliveryAmount?: number;
	numberOfLikes?: number;
	rating?: number;
	country?: string;
	earnings?: number;
}

export interface UpdateUserDTO {
	walletAddress?: string;
	profileImg?: string;
	accessToken?: string;
}

export type CreateUserDTO = {
	user: {
		uid: string;
		username: string;
	};
	accessToken: string;
};

export interface IUserCourier {
	id: string;
	user: IUser;
	courier: ICourier | null;
}
