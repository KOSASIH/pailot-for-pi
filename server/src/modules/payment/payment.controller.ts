import { Router } from 'express';
import { approveU2APayment } from './handlers/approveU2APayment';
import { completeU2APayment } from './handlers/completeU2APayment';
import { incompleteU2APayment } from './handlers/incompleteU2APayment';
import { withdrawPI } from './handlers/AccountToUserPayment';
import { cancelledU2APayment } from './handlers/cancelledU2APayment';
import { auth } from '../../middlewares/auth';

const paymentRouter = Router();

paymentRouter.post('/approve', auth, approveU2APayment);
paymentRouter.post('/incomplete', incompleteU2APayment);
paymentRouter.post('/complete', auth, completeU2APayment);
paymentRouter.post('/cancel', auth, cancelledU2APayment);
paymentRouter.get('/courier/withdraw', auth, withdrawPI);

export const PaymentController = { router: paymentRouter };
