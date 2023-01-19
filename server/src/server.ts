import express, { NextFunction, Request, Response } from 'express';
import addressRouter from './router/address';
import departmentRouter from './router/department';
import leaveRouter from './router/leave';
import noticeRouter from './router/notice';
import projectRouter from './router/project';
import roleRouter from './router/role';
import timereportRouter from './router/timereport';
import userRouter from './router/user';
import cors from 'cors';
import {
  hashPassword,
  protectRoutes,
  comparePassword,
  createJWT,
} from './utils/auth';
import prisma from './db';
import { body, validationResult } from 'express-validator';

import { PermissionType } from './enums/enums';

enum ErrorTypes {
  AUTH = 'Auth',
  INPUT = 'Input',
  SERVER = 'Server',
}

const app = express();
app.use(cors());
app.use(express.json()); //enables a client send the server json
app.use(express.urlencoded({ extended: true })); // url query to object
// app.get('/', (req: Request, res: Response) => {
//   console.log('logg in');
//   res.status(200);
//   res.json({ message: 'Sign in please' });
// });
//app.use('/users/:userId/addresses', protectRoutes, addressRouter); //not needed
//add middleware here to check if logged in

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
        include: {
          projects: true,
          time_reports: true,
          leaves: true,
          addresses: true,
        },
      });
      if (user) {
        const isValid = await comparePassword(req.body.password, user.password);
        if (!isValid) {
          res.status(401);
          res.json({ error: 'Invalid password' });
          return;
        }
        const token = createJWT(user);
        res.json({ token });
      } else {
        res.status(401);
        res.json({ error: 'Invalid email address' });
        return;
      }
    } catch (e) {
      e.type = ErrorTypes.SERVER;
      next(e);
    }
  }
};

app.post(
  '/',
  body('email').isEmail().isLength({ max: 255 }).withMessage('Invalid email'),
  body('password')
    .isStrongPassword()
    .isLength({ max: 255 })
    .withMessage(
      'Invalid password. Requires minimum of 8 characters, minimum 1 lowercase, minimum 1 uppercase, minimum 1 special character '
    ),
  signIn
);

app.use('/users/:userId/addresses', addressRouter);
app.use('/users/:userId/departments', departmentRouter);
app.use('/users/:userId/leaves', leaveRouter);
// app.use('/users/:userId/users/:userId/notices', noticeRouter);
app.use('/users/:userId/notices', noticeRouter);
app.use('/users/:userId/projects', projectRouter);
app.use('/users/:userId/roles', roleRouter);
app.use('/users/:userId/timereports', timereportRouter);
app.use('/users', userRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.type === ErrorTypes.AUTH) {
    res.status(401);
    res.json({ errors: [{ msg: 'Unauthorized' }] });
  } else if ((err.type = ErrorTypes.INPUT)) {
    res.status(400);
    res.json({ errors: [{ msg: 'Invalid input' }] });
  } else {
    res.status(500);
    res.json({ errors: [{ msg: 'Server issue!' }] });
  }
});

export default app;
