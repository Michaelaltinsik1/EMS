import express, { NextFunction, Request, Response } from 'express';
import addressRouter from './router/address';
import departmentRouter from './router/department';
import leaveRouter from './router/leave';
import noticeRouter from './router/notice';
import projectRouter from './router/project';
import roleRouter from './router/role';
import timereportRouter from './router/timereport';
import userRouter from './router/user';
import cookie from 'cookie';
import cors from 'cors';

import cookieParser from 'cookie-parser';
import { comparePassword, createJWT } from './utils/auth';
import prisma from './db';
import { body, validationResult } from 'express-validator';

enum ErrorTypes {
  AUTH = 'Auth',
  INPUT = 'Input',
  SERVER = 'Server',
}
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,
// };

const corsOptions = {
  origin: 'https://ems-f5ro.vercel.app',
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json()); //enables a client send the server json
app.use(express.urlencoded({ extended: true })); // url query to object

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
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('JWT_ACCESS_TOKEN', token, {
            httpOnly: true,
            maxAge: 8 * 60 * 60,
            path: '/',
            sameSite: 'lax',
          })
        );

        res.json({ data: user });
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

app.use('/addresses', addressRouter);
app.use('/departments', departmentRouter);
app.use('/leaves', leaveRouter);
app.use('/notices', noticeRouter);
app.use('/projects', projectRouter);
app.use('/roles', roleRouter);
app.use('/timereports', timereportRouter);
app.use('/users', userRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.type === ErrorTypes.AUTH) {
    res.status(401);
    res.json({ errors: [{ error: 'Unauthorized' }] });
  } else if ((err.type = ErrorTypes.INPUT)) {
    res.status(400);
    res.json({ errors: [{ error: 'Invalid input' }] });
  } else {
    res.status(500);
    res.json({ errors: [{ error: 'Server issue!' }] });
  }
});

export default app;
