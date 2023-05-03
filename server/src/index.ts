import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

const users: User[] = [];

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

app.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

app.post('/users/register', async (req: Request, res: Response) => {
  try {
    if (
      !(
        req.body.firstName &&
        req.body.lastName &&
        req.body.phoneNumber &&
        req.body.email &&
        req.body.password
      )
    )
      throw new Error('Empty values');

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: hashedPassword,
    };

    users.push(user);
    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
});

app.post('/users/login', async (req: Request, res: Response) => {
  const user = users.find(user => user.email === req.body.email);
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password))
      res.send('Success');
    else res.send('Not Allowed');
  } catch (error) {
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
