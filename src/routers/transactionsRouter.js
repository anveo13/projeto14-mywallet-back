import { Router } from 'express';

import { validateAuthToken } from '../middlewares/tokenValidationMiddleware.js';
import { validateTransactionSchema } from '../middlewares/transactionSchemaValidationMiddleware.js';
import { createTransaction, readTransactions, deleteTransaction } from '../controllers/transactionsControllers.js';

const transactionsRouter = Router();

transactionsRouter.use(validateAuthToken);
transactionsRouter.post('/transactions', validateTransactionSchema, createTransaction);
transactionsRouter.get('/transactions', readTransactions);
transactionsRouter.delete('/transactions/:id', deleteTransaction);

export { transactionsRouter };