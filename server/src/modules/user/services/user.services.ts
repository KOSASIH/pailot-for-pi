import { IsNull, Not } from 'typeorm';
import { Result } from '../../../constants/result';
import { AppDataSource } from '../../../db/dataSource';
import { Courier } from '../../../db/entity/Courier';
import { User } from '../../../db/entity/User';
import { UserCourier } from '../../../db/entity/UserCourier';
import { ErrorResult, NotFoundResult, SuccessResult } from '../../../interfaces/result';
import {
	CreateUserDTO,
	ICourier,
	IUserCourier,
	UpdateCourierDTO,
	UpdateUserDTO,
} from '../../../interfaces/user';
import { uploadeImageToCloudinary } from '../../../middlewares/cloudinary';

export type UpdateUserResult = SuccessResult<User> | ErrorResult;
export type CreateOrUpdateCourierResult = SuccessResult<Courier> | ErrorResult;
export type DeleteUserResult = SuccessResult<null> | ErrorResult;
export type UsersResult = SuccessResult<User[]> | ErrorResult;
export type UserResult = SuccessResult<IUserCourier> | NotFoundResult | ErrorResult;

export const UserRepository = AppDataSource.getRepository(User);
export const CourierRepository = AppDataSource.getRepository(Courier);
export const UserCourierRepository = AppDataSource.getRepository(UserCourier);

export async function createUserEntry(
	user: CreateUserDTO
): Promise<SuccessResult<IUserCourier> | ErrorResult> {
	try {
		let userData: IUserCourier;
		let currentUser = await UserRepository.findOne({ where: { userUid: user.user.uid } });
		if (currentUser) {
			currentUser.accessToken = user.accessToken;
			currentUser = await UserRepository.save(currentUser);

			userData = await UserCourierRepository.findOne({
				where: { user: { userUid: user.user.uid } },
			});
		} else {
			const createdUser = UserRepository.create({
				userUid: user.user.uid,
				username: user.user.username,
				accessToken: user.accessToken,
			});
			currentUser = await UserRepository.save(createdUser);

			const courierUser = UserCourierRepository.create({
				user: currentUser,
			});
			userData = await UserCourierRepository.save(courierUser);
		}
		console.log(userData);
		return {
			type: Result.SUCCESS,
			data: userData,
		};
	} catch (error) {
		console.error(error);
		return {
			type: Result.ERROR,
			message: `An unexpected error occurred while creating user`,
			error,
		};
	}
}

export async function updateUserEntry(
	userUid: string,
	userData: UpdateUserDTO
): Promise<UpdateUserResult> {
	try {
		const user = await UserRepository.findOne({
			where: {
				userUid,
			},
		});
		if (userData.profileImg) {
			const option = user.imagePublicId
				? {
						public_id: user.imagePublicId,
				  }
				: {};
			const { secureURL, publicId } = await uploadeImageToCloudinary(userData.profileImg, option);
			user.profileImg = secureURL;
			user.imagePublicId = publicId;
		}
		user.accessToken = userData?.accessToken || user.accessToken;
		user.walletAddress = userData?.walletAddress || user.walletAddress;
		const updatedUser = await UserRepository.save(user);
		return {
			type: Result.SUCCESS,
			data: updatedUser,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: `An unexpected error occurred during updating user with id ${userUid}`,
			error,
		};
	}
}

export async function updateCourierInfo(
	courierUserId: string,
	courierData: UpdateCourierDTO
): Promise<CreateOrUpdateCourierResult> {
	try {
		await CourierRepository.update(courierUserId, courierData);
		const updatedCourier = await CourierRepository.findOne({
			where: {
				courierUserId: courierUserId,
			},
		});
		return {
			type: Result.SUCCESS,
			data: updatedCourier,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: `An unexpected error occurred during updating user with id ${courierUserId}`,
			error,
		};
	}
}

export async function findUser(userUid: string): Promise<UserResult> {
	try {
		const currentUser = await UserCourierRepository.findOne({
			where: { user: { userUid } },
		});
		if (!currentUser) {
			return {
				type: Result.NOT_FOUND,
				message: `Could not find user with id: ${userUid}`,
			};
		}
		return {
			type: Result.SUCCESS,
			data: currentUser,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: `An unexpected error occurred during finding user with id ${userUid}`,
			error,
		};
	}
}

export async function findUserByUsername(
	username: string
): Promise<SuccessResult<User> | NotFoundResult | ErrorResult> {
	try {
		if (!username) {
			return {
				type: Result.NOT_FOUND,
				message: `Could not find user because no username was passed`,
			};
		}
		const currentUser = await UserRepository.findOne({
			where: { username },
		});
		if (!currentUser) {
			return {
				type: Result.NOT_FOUND,
				message: `Could not find user with username: ${username}`,
			};
		}
		return {
			type: Result.SUCCESS,
			data: currentUser,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: `An unexpected error occurred during finding user with username ${username}`,
			error,
		};
	}
}

export async function deleteUserEntry(userUid: string): Promise<DeleteUserResult> {
	try {
		const userCourier = await UserCourierRepository.findOne({
			where: { user: { userUid } },
		});
		await UserCourierRepository.delete(userCourier.id);
		await UserRepository.delete(userUid);
		return {
			type: Result.SUCCESS,
			data: null,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: `An unexpected error occurred while deleting user with id ${userUid}`,
			error: error,
		};
	}
}

export async function deleteCourierEntry(courierUid: string): Promise<DeleteUserResult> {
	try {
		const userCourier = await UserCourierRepository.findOne({
			where: { user: { userUid: courierUid } },
		});
		userCourier.courier = null;
		await UserCourierRepository.save(userCourier);
		await CourierRepository.delete(courierUid);
		return {
			type: Result.SUCCESS,
			data: null,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: `An unexpected error occurred while deleting user with id ${courierUid}`,
			error: error,
		};
	}
}

export async function getUsersEntry(): Promise<UsersResult> {
	try {
		const results = await UserRepository.find();
		return {
			type: Result.SUCCESS,
			data: results,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: error.message,
			error,
		};
	}
}

export async function getCourierUsersEntry(): Promise<SuccessResult<IUserCourier[]> | ErrorResult> {
	try {
		const results = await UserCourierRepository.find({ where: { courier: Not(IsNull()) } });
		return {
			type: Result.SUCCESS,
			data: results,
		};
	} catch (error) {
		return {
			type: Result.ERROR,
			message: error.message,
			error,
		};
	}
}

export async function createCourierEntry(
	courier: ICourier
): Promise<SuccessResult<IUserCourier> | ErrorResult> {
	try {
		const currentCourierUser = await UserCourierRepository.findOne({
			where: { user: { userUid: courier.courierUserId } },
		});
		const createdUser = CourierRepository.create({
			courierUserId: courier.courierUserId,
			modeOfTransportation: courier.modeOfTransportation,
			regionOfOperation: courier.regionOfOperation,
			preferredDeliveryAmount: courier.preferredDeliveryAmount,
			startTime: courier.startTime,
			endTime: courier.endTime,
		});
		const currentCourier = await CourierRepository.save(createdUser);
		currentCourierUser.courier = currentCourier;
		const courierUser = await UserCourierRepository.save(currentCourierUser);
		return {
			type: Result.SUCCESS,
			data: courierUser,
		};
	} catch (error) {
		console.log(error);
		return {
			type: Result.ERROR,
			message: `An unexpected error occurred while creating courier`,
			error,
		};
	}
}
