import { Router } from 'express';
import { deleteTransaction } from './handlers/deleteTransaction';
import { getAllTransactions } from './handlers/getAllTransactions';
import { getTransaction } from './handlers/getTransaction';
import { profileImageUpload } from '../../middlewares/multer';
import { createTransaction } from './handlers/createTransaction';
import { updateTransactionStatus } from './handlers/updateTransactionStatus';
import { acceptPendingTransaction } from './handlers/acceptPendingTransaction';
import { updateTransaction } from './handlers/updateTransaction';
import { getAllPendingTransactions } from './handlers/getAllPendingTransaction';
import { getAllTransactionsForSender } from './handlers/getAllTransactionsForSender';
import { getAllTransactionsForCourier } from './handlers/getAllTransactionsForCourier';
import { getAllTransactionsForReceiver } from './handlers/getAllTransactionsForReceiver';
import { getAllTransactionsForReceiverByUsername } from './handlers/getAllTransactionsForReceiver';
import { auth } from '../../middlewares/auth';

const transactionRouter = Router();

transactionRouter.get('/', auth, getAllTransactions);
transactionRouter.post('/', auth, profileImageUpload, createTransaction);
transactionRouter.get('/:id', auth, getTransaction);
transactionRouter.patch('/:id', auth, profileImageUpload, updateTransaction);
transactionRouter.get('/pending', auth, getAllPendingTransactions);
transactionRouter.delete('/:id', auth, deleteTransaction);
transactionRouter.patch('/status/:id', auth, updateTransactionStatus);
transactionRouter.patch('/requests/accept-pending', auth, acceptPendingTransaction);
transactionRouter.get('/sender/:id', auth, getAllTransactionsForSender);
transactionRouter.get('/courier/:id', auth, getAllTransactionsForCourier);
transactionRouter.get('/receiver/:id', auth, getAllTransactionsForReceiver);
transactionRouter.get('/username', auth, getAllTransactionsForReceiverByUsername);

export const TransactionController = { router: transactionRouter };
