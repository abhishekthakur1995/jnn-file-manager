import apiRouter from './api';
import express from 'express';
require('dotenv').config()

const server = express();

server.get('/', (req, res) => {
	res.send('Hello Express');
});

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(process.env.PORT, () => {
	console.info('Express listening on port', process.env.PORT);
});
