import express, { Request, Response } from 'express';
import addressRouter from './router/address';
import departmentRouter from './router/department';
import leaveRouter from './router/leave';
import noticeRouter from './router/notice';
import projectRouter from './router/project';
import roleRouter from './router/role';
import timereportRouter from './router/timereport';
import userRouter from './router/user';
import cors from 'cors';
import { hashPassword, protectRoutes } from './utils/auth';
import prisma from './db';

const app = express();
app.use(cors());
app.use(express.json()); //enables a client send the server json
app.use(express.urlencoded({ extended: true })); // url query to object
app.get('/', (req: Request, res: Response) => {
  console.log('logg in');
  res.status(200);
  res.json({ message: 'Sign in please' });
});

//add middleware here to check if logged in
app.use('/users/:userId/addresses', protectRoutes, addressRouter); //not needed
app.use('/users/:userId/departments', departmentRouter);
app.use('/users/:userId/leaves', leaveRouter);
// app.use('/users/:userId/users/:userId/notices', noticeRouter);
app.use('/users/:userId/notices', noticeRouter);
app.use('/users/:userId/projects', projectRouter);
app.use('/users/:userId/roles', roleRouter);
app.use('/users/:userId/timereports', timereportRouter);
app.use('/users', userRouter);

app.put('/change-password', async (req: Request, res: Response) => {
  await prisma.user.update({
    where: {
      id: req.body.id,
    },
    data: {
      password: await hashPassword(req.body.password),
    },
  });
  res.json({ message: 'Change password' });
});

export default app;
