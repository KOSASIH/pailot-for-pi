import fs from 'fs';
import path from 'path';
import express from 'express';
import logger from 'morgan';
import { corsMiddleware } from './middlewares/cors';
import { apiRouter } from './modules/router';
import { AppDataSource } from './db/dataSource';

const PORT = process.env.PORT || 3333;
const app = express();

app.use(express.json());

// Log requests to the console in a compact format:
app.use(logger('dev'));

// Full log of all requests to /log/access.log:
app.use(
	logger('common', {
		stream: fs.createWriteStream(path.join(__dirname, '..', 'log', 'access.log'), { flags: 'a' }),
	})
);

app.options('*', corsMiddleware);
app.use(corsMiddleware);

app.get('/', (req, res) => {
	res.status(200).json({
		message: 'Hello World',
	});
});

app.use('/', apiRouter);

AppDataSource.initialize()
	.then(() => {
		console.log('DataSource is initialized');
		app.listen(PORT, () => {
			console.log(`App listening on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error('Error during DataSource initialization:', err);
	});
