import http from 'http';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();

import routes from './routes';

const PORT = process.env.PORT;

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routing
app.use(routes);

app.use('/ping', (req, res) => {
	return res.status(200).json({ message: 'pong' });
});

// Create a server
const server = http.createServer(app);

// Run my server
const serverStart = async () => {
	try {
		server.listen(PORT, () => {
			console.log(`server is listening on PORT ${PORT}`);
		});
	} catch (err) {
		console.log(err);
		await prisma.$disconnect();
	}
};

serverStart();
