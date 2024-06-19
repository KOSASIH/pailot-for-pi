import { Router } from 'express';
import { createUser } from './handlers/createUser';
import { deleteUser } from './handlers/deleteUser';
import { getAllUsers } from './handlers/getAllUser';
import { getUser } from './handlers/getUser';
import { getUserByUsername } from './handlers/getUserByUsername';
import { updateUser } from './handlers/updateUser';
import { signInUser } from './handlers/signInUser';
import { createCourier } from './handlers/createCourier';
import { updateCourier } from './handlers/updateCourier';
import { deleteCourier } from './handlers/deleteCourier';
import { getAllCourierUsers } from './handlers/getAllCourierUsers';
import { profileImageUpload } from '../../middlewares/multer';
import { auth } from '../../middlewares/auth';

const userRouter = Router();

userRouter.get('/', auth, getAllUsers);
userRouter.get('/couriers', auth, getAllCourierUsers);
userRouter.post('/', auth, createUser);
userRouter.get('/profile', auth, getUser);
userRouter.get('/:username', auth, getUserByUsername);
userRouter.delete('/:id', auth, deleteUser);
userRouter.patch('/:id', auth, profileImageUpload, updateUser);
userRouter.post('/courier', auth, createCourier);
userRouter.delete('/courier/:id', auth, deleteCourier);
userRouter.patch('/courier/:id', auth, updateCourier);
userRouter.post('/sign-in', signInUser);

export const UserController = { router: userRouter };
