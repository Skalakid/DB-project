import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

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

app.use('/auth', userRoutes);

// app.post('/auth/register', async (req: Request, res: Response) => {
//   try {
//     if (
//       !(
//         req.body.firstName &&
//         req.body.lastName &&
//         req.body.phoneNumber &&
//         req.body.email &&
//         req.body.password
//       )
//     )
//       throw new Error('Empty values');

//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const user = {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       phoneNumber: req.body.phoneNumber,
//       email: req.body.email,
//       password: hashedPassword,
//     };

//     users.push(user);
//     res.status(201).send(user);
//   } catch (error) {
//     res.status(500).send();
//   }
// });

// app.post('/auth/login', async (req: Request, res: Response) => {
//   const email = req.body.email;
//   const user: { email: string } = { email: email };
//   if (ACCESS_TOKEN_SECRET) {
//     const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET);
//     res.json({ accessToken: accessToken });
//   }
// });

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
