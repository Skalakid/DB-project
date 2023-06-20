import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import usersRoutes from './routes/user';
import vehiclesRoutes from './routes/vehicles';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/vehicles', vehiclesRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
