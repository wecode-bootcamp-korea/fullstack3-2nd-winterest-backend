import http from 'http';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import routes from './routes';

const PORT = process.env.PORT;

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routing
app.use(routes);

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
  }
};

serverStart();

export default app;
